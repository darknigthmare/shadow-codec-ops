import type {
  CampaignCondition,
  CampaignEventRecord,
  CampaignDefinition,
  CampaignNodeDefinition,
  CampaignPresentationQueueItem,
  CampaignProgress,
  CampaignRank,
  CampaignStatistics,
  CampaignVariableMutation,
  CampaignVariableValue
} from '../types/campaign.types';

const rankOrder: Record<CampaignRank, number> = {
  ROOKIE: 0,
  RAT: 1,
  DOBERMAN: 2,
  HOUND: 3,
  FOX: 4,
  FOXHOUND: 5,
  'BIG BOSS': 6
};

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function compareValues(actual: CampaignVariableValue | undefined, operator: string, expected: CampaignVariableValue): boolean {
  if (operator === 'eq') return actual === expected;
  if (operator === 'neq') return actual !== expected;
  const actualNumber = Number(actual);
  const expectedNumber = Number(expected);
  if (!Number.isFinite(actualNumber) || !Number.isFinite(expectedNumber)) return false;
  if (operator === 'gt') return actualNumber > expectedNumber;
  if (operator === 'gte') return actualNumber >= expectedNumber;
  if (operator === 'lt') return actualNumber < expectedNumber;
  if (operator === 'lte') return actualNumber <= expectedNumber;
  return false;
}

export function isNarrativeConditionMet(condition: CampaignCondition, node: CampaignNodeDefinition | undefined, progress: CampaignProgress): boolean {
  if (condition.type === 'all_prerequisites') return node ? node.prerequisites.every((id) => progress.completedNodeIds.includes(id)) : true;
  if (condition.type === 'codec_call') {
    return progress.evidence.codecContactIds.includes(condition.contactId)
      && (!condition.conversationId || progress.evidence.codecConversationIds.includes(condition.conversationId));
  }
  if (condition.type === 'sideops_clear') {
    const record = progress.evidence.sideOps.find((item) => item.missionId === condition.missionId);
    return Boolean(record && (!condition.minimumRank || rankOrder[record.rank] >= rankOrder[condition.minimumRank]));
  }
  if (condition.type === 'vr_clear') {
    const record = progress.evidence.vr.find((item) => item.missionId === condition.missionId);
    return Boolean(record && (!condition.minimumRank || rankOrder[record.rank] >= rankOrder[condition.minimumRank]));
  }
  if (condition.type === 'tape_listened') return progress.evidence.listenedTapeIds.includes(condition.tapeId);
  if (condition.type === 'lore_viewed') return progress.evidence.viewedLoreIds.includes(condition.loreId);
  if (condition.type === 'resource_minimum') return progress.resources[condition.resource] >= condition.amount;
  if (condition.type === 'badge_owned') return progress.badges.includes(condition.badge);
  if (condition.type === 'variable_compare') return compareValues(progress.variables[condition.variable], condition.operator, condition.value);
  return false;
}

export function applyCampaignVariableMutations(
  variables: Record<string, CampaignVariableValue>,
  mutations: CampaignVariableMutation[] = []
): Record<string, CampaignVariableValue> {
  const next = { ...variables };
  for (const mutation of mutations) {
    const key = mutation.variable.trim();
    if (!key) continue;
    if (mutation.operation === 'set') {
      next[key] = mutation.value ?? true;
      continue;
    }
    if (mutation.operation === 'toggle') {
      next[key] = !Boolean(next[key]);
      continue;
    }
    const current = Number(next[key] ?? 0);
    const amount = Number(mutation.value ?? 1);
    if (!Number.isFinite(current) || !Number.isFinite(amount)) continue;
    next[key] = mutation.operation === 'decrement' ? current - amount : current + amount;
  }
  return next;
}

function chapterRequiredNodes(chapter: CampaignDefinition['chapters'][number], progress: CampaignProgress): CampaignNodeDefinition[] {
  return chapter.nodes.filter((node) => {
    if (node.optional) return false;
    if (!node.branch) return true;
    const selected = progress.branchChoices[node.branch.groupId];
    return !selected || selected === node.branch.optionId;
  });
}

function chapterStarted(chapter: CampaignDefinition['chapters'][number], progress: CampaignProgress): boolean {
  return chapter.nodes.some((node) => node.prerequisites.every((id) => progress.completedNodeIds.includes(id)));
}

function chapterComplete(chapter: CampaignDefinition['chapters'][number], progress: CampaignProgress): boolean {
  const required = chapterRequiredNodes(chapter, progress);
  return required.length > 0 && required.every((node) => progress.completedNodeIds.includes(node.id));
}

function campaignComplete(campaign: CampaignDefinition, progress: CampaignProgress): boolean {
  const required = campaign.chapters.flatMap((chapter) => chapterRequiredNodes(chapter, progress));
  return required.length > 0 && required.every((node) => progress.completedNodeIds.includes(node.id));
}

function queueItem(
  campaign: CampaignDefinition,
  sourceType: CampaignPresentationQueueItem['sourceType'],
  sourceId: string,
  presentation: CampaignPresentationQueueItem['presentation'],
  variableEffects?: CampaignVariableMutation[]
): CampaignPresentationQueueItem {
  return {
    queueId: `${campaign.id}:${sourceType}:${sourceId}:${presentation.id}`,
    campaignId: campaign.id,
    sourceType,
    sourceId,
    presentation,
    variableEffects
  };
}

function eventTriggered(
  event: NonNullable<CampaignDefinition['narrativeEvents']>[number],
  campaign: CampaignDefinition,
  progress: CampaignProgress
): boolean {
  if (event.condition && !isNarrativeConditionMet(event.condition, undefined, progress)) return false;
  if (event.trigger === 'campaign_start') return true;
  if (event.trigger === 'campaign_complete') return campaignComplete(campaign, progress);
  if (event.trigger === 'chapter_start') {
    const chapter = campaign.chapters.find((entry) => entry.id === event.targetId);
    return Boolean(chapter && chapterStarted(chapter, progress));
  }
  if (event.trigger === 'chapter_complete') {
    const chapter = campaign.chapters.find((entry) => entry.id === event.targetId);
    return Boolean(chapter && chapterComplete(chapter, progress));
  }
  if (event.trigger === 'node_complete') return Boolean(event.targetId && progress.completedNodeIds.includes(event.targetId));
  if (event.trigger === 'branch_choice') {
    if (!event.targetId) return Object.keys(progress.branchChoices).length > 0;
    const [groupId, optionId] = event.targetId.split(':');
    return optionId ? progress.branchChoices[groupId] === optionId : Boolean(progress.branchChoices[groupId]);
  }
  if (event.trigger === 'ending_achieved') return Boolean(event.targetId && progress.achievedEndingIds.includes(event.targetId));
  if (event.trigger === 'variable_condition') return Boolean(event.condition && isNarrativeConditionMet(event.condition, undefined, progress));
  return false;
}

export function collectPendingCampaignPresentations(
  campaign: CampaignDefinition,
  progress: CampaignProgress
): CampaignPresentationQueueItem[] {
  const items: CampaignPresentationQueueItem[] = [];
  const push = (item: CampaignPresentationQueueItem) => {
    if (!progress.seenPresentationIds.includes(item.queueId) && !items.some((entry) => entry.queueId === item.queueId)) items.push(item);
  };

  if (campaign.briefing) push(queueItem(campaign, 'campaign', campaign.id, campaign.briefing));

  for (const chapter of campaign.chapters) {
    if (chapter.briefing && chapterStarted(chapter, progress)) push(queueItem(campaign, 'chapter', `${chapter.id}:briefing`, chapter.briefing));
    for (const node of chapter.nodes) {
      if (node.completionPresentation && progress.completedNodeIds.includes(node.id)) {
        // Node variable mutations are applied when the node reward is claimed.
        // The presentation only reports the consequence and must not apply them a second time.
        push(queueItem(campaign, 'node', node.id, node.completionPresentation));
      }
      if (node.ending?.epilogue && progress.achievedEndingIds.includes(node.ending.id)) {
        push(queueItem(campaign, 'ending', node.ending.id, node.ending.epilogue));
      }
    }
    if (chapter.debriefing && chapterComplete(chapter, progress)) push(queueItem(campaign, 'chapter', `${chapter.id}:debriefing`, chapter.debriefing));
  }

  for (const event of campaign.narrativeEvents ?? []) {
    if (eventTriggered(event, campaign, progress)) push(queueItem(campaign, 'event', event.id, event.presentation, event.variableEffects));
  }

  if (campaign.debriefing && campaignComplete(campaign, progress)) push(queueItem(campaign, 'campaign', `${campaign.id}:debriefing`, campaign.debriefing));
  return items;
}

export function acknowledgeCampaignPresentation(
  progress: CampaignProgress,
  item: CampaignPresentationQueueItem
): CampaignProgress {
  const viewedAt = new Date().toISOString();
  const nextVariables = applyCampaignVariableMutations(progress.variables, item.variableEffects);
  const narrativeEvent: CampaignEventRecord = {
    id: `campaign_event_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: viewedAt,
    type: 'narrative',
    label: item.presentation.title,
    detail: `${item.sourceType.toUpperCase()} presentation reviewed.`
  };
  return {
    ...progress,
    variables: nextVariables,
    seenPresentationIds: unique([...progress.seenPresentationIds, item.queueId]),
    presentationHistory: [{
      id: `presentation_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      presentationId: item.presentation.id,
      campaignId: item.campaignId,
      sourceType: item.sourceType,
      sourceId: item.sourceId,
      title: item.presentation.title,
      tone: item.presentation.tone ?? 'neutral',
      viewedAt
    }, ...progress.presentationHistory].slice(0, 120),
    events: [narrativeEvent, ...progress.events].slice(0, 60),
    lastUpdatedAt: viewedAt
  };
}

function bestRank(records: Array<{ rank: CampaignRank }>): CampaignRank {
  return records.reduce<CampaignRank>((best, record) => rankOrder[record.rank] > rankOrder[best] ? record.rank : best, 'ROOKIE');
}

export function calculateCampaignStatistics(
  campaign: CampaignDefinition,
  progress: CampaignProgress
): CampaignStatistics {
  const nodes = campaign.chapters.flatMap((chapter) => chapter.nodes);
  const completed = nodes.filter((node) => progress.completedNodeIds.includes(node.id));
  const firstEvent = [...progress.events].sort((a, b) => a.timestamp.localeCompare(b.timestamp))[0];
  return {
    startedAt: firstEvent?.timestamp ?? progress.lastUpdatedAt,
    lastActivityAt: progress.lastUpdatedAt,
    campaignOpenCount: Number(progress.variables['system.campaignOpenCount'] ?? 0),
    nodesCompleted: completed.length,
    optionalNodesCompleted: completed.filter((node) => node.optional).length,
    branchesCommitted: Object.keys(progress.branchChoices).length,
    endingsUnlocked: progress.achievedEndingIds.length,
    rewardsClaimed: progress.claimedRewardIds.length,
    upgradesPurchased: progress.purchasedUpgradeIds.length,
    sideOpsClears: progress.evidence.sideOps.length,
    vrClears: progress.evidence.vr.length,
    codecCalls: progress.evidence.codecContactIds.length,
    tapesListened: progress.evidence.listenedTapeIds.length,
    loreViewed: progress.evidence.viewedLoreIds.length,
    sideOpsScoreTotal: progress.evidence.sideOps.reduce((sum, record) => sum + record.score, 0),
    vrScoreTotal: progress.evidence.vr.reduce((sum, record) => sum + record.score, 0),
    sideOpsTimeSeconds: progress.evidence.sideOps.reduce((sum, record) => sum + record.timeSeconds, 0),
    vrTimeSeconds: progress.evidence.vr.reduce((sum, record) => sum + record.timeSeconds, 0),
    bestSideOpsRank: bestRank(progress.evidence.sideOps),
    bestVrRank: bestRank(progress.evidence.vr),
    newGamePlusCycles: progress.newGamePlusCycle
  };
}

export function mergeInitialCampaignVariables(
  campaign: CampaignDefinition | undefined,
  current: Record<string, CampaignVariableValue> | undefined
): Record<string, CampaignVariableValue> {
  return { ...(campaign?.initialVariables ?? {}), ...(current ?? {}) };
}
