import campaignsJson from '../data/campaigns.json';
import type { CallHistoryEntry } from '../types/codec.types';
import type { MissionCompletePayload } from '../game/core/GameEvents';
import type { DirectorRuntimeEvent } from '../types/director.types';
import type { LoreDatabaseState } from '../types/lore.types';
import type { TapeArchiveState } from '../types/tape.types';
import type { VrMissionProgress, VrMissionRecord } from '../types/vr.types';
import type {
  CampaignDefinition,
  CampaignEvidence,
  CampaignEventRecord,
  CampaignLaunchDirective,
  CampaignNodeDefinition,
  CampaignProgress,
  CampaignRank,
  CampaignResourceWallet,
  CampaignSlotId,
  CampaignSlotSummary,
  CampaignUpgradeDefinition,
  CampaignPresentationQueueItem,
  CampaignVariableValue
} from '../types/campaign.types';
import { loadJson, saveJson } from './saveEngine';
import { getBuilderCampaignDefinitions } from './campaignBuilderStorage';
import { acknowledgeCampaignPresentation, applyCampaignVariableMutations, mergeInitialCampaignVariables } from './campaignNarrative';

export const CAMPAIGN_PROGRESS_KEY = 'campaign-progress';
export const CAMPAIGN_ACTIVE_SLOT_KEY = 'campaign-active-slot';
export const CAMPAIGN_LAUNCH_DIRECTIVE_KEY = 'campaign-launch-directive';
const CAMPAIGN_SCHEMA_VERSION = 3;
const CAMPAIGN_SLOTS: CampaignSlotId[] = ['slot_1', 'slot_2', 'slot_3'];

function campaignSlotKey(slotId: CampaignSlotId): string {
  return `${CAMPAIGN_PROGRESS_KEY}-${slotId}`;
}

export function loadActiveCampaignSlot(): CampaignSlotId {
  const slot = loadJson<CampaignSlotId>(CAMPAIGN_ACTIVE_SLOT_KEY, 'slot_1');
  return CAMPAIGN_SLOTS.includes(slot) ? slot : 'slot_1';
}

export function setActiveCampaignSlot(slotId: CampaignSlotId): void {
  saveJson(CAMPAIGN_ACTIVE_SLOT_KEY, CAMPAIGN_SLOTS.includes(slotId) ? slotId : 'slot_1');
}


const builtInCampaigns = (campaignsJson as CampaignDefinition[]).map((campaign) => ({ ...campaign, source: 'built_in' as const, published: true }));

const EMPTY_WALLET: CampaignResourceWallet = {
  commandPoints: 0,
  intel: 0,
  supplies: 0,
  credits: 0
};

const EMPTY_EVIDENCE: CampaignEvidence = {
  sideOps: [],
  vr: [],
  codecContactIds: [],
  codecConversationIds: [],
  listenedTapeIds: [],
  viewedLoreIds: []
};

export const campaignUpgrades: CampaignUpgradeDefinition[] = [
  {
    id: 'campaign_socom_reserve',
    title: 'SOCOM Reserve Magazine',
    description: 'Adds 6 starting rounds to every Side Ops deployment.',
    costs: { credits: 300, supplies: 25 },
    bonuses: { ammo: 6 }
  },
  {
    id: 'campaign_medical_cache',
    title: 'Forward Medical Cache',
    description: 'Adds 1 starting ration to every Side Ops deployment.',
    costs: { credits: 500, supplies: 45 },
    bonuses: { rations: 1 }
  },
  {
    id: 'campaign_signal_scrambler',
    title: 'Portable Signal Scrambler',
    description: 'Adds 1 starting chaff grenade to every Side Ops deployment.',
    costs: { credits: 400, intel: 55 },
    bonuses: { chaff: 1 }
  }
];

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

function now(): string {
  return new Date().toISOString();
}

function makeEvent(type: CampaignEventRecord['type'], label: string, detail: string): CampaignEventRecord {
  return {
    id: `campaign_event_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: now(),
    type,
    label,
    detail
  };
}

function allNodes(definitions: CampaignDefinition[] = getCampaignDefinitions()): CampaignNodeDefinition[] {
  return definitions.flatMap((campaign) => campaign.chapters.flatMap((chapter) => chapter.nodes));
}

function initialUnlocks(definitions: CampaignDefinition[]): CampaignProgress['unlockedMissionIds'] {
  return unique(definitions.flatMap((campaign) => campaign.initialUnlocks.missionIds));
}

export function calculateCampaignLevel(xp: number): number {
  return Math.max(1, Math.min(50, Math.floor(Math.max(0, xp) / 500) + 1));
}

export function getCampaignLevelProgress(xp: number): { level: number; current: number; required: number; percent: number } {
  const level = calculateCampaignLevel(xp);
  const base = (level - 1) * 500;
  const current = Math.max(0, xp - base);
  const required = 500;
  return { level, current, required, percent: Math.min(100, Math.round((current / required) * 100)) };
}

export function createDefaultCampaignProgress(definitions: CampaignDefinition[] = getCampaignDefinitions()): CampaignProgress {
  const activeCampaign = definitions[0];
  const activeDefinitions = activeCampaign ? [activeCampaign] : [];
  return {
    schemaVersion: CAMPAIGN_SCHEMA_VERSION,
    activeCampaignId: activeCampaign?.id ?? 'legacy_signal_campaign',
    xp: 0,
    level: 1,
    resources: { ...EMPTY_WALLET },
    completedNodeIds: [],
    claimedRewardIds: [],
    unlockedMissionIds: initialUnlocks(activeDefinitions),
    unlockedVrMissionIds: unique(activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.vrMissionIds)),
    unlockedTapeIds: unique(activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.tapeIds)),
    unlockedContactIds: unique(activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.contactIds)),
    unlockedLoreIds: unique(activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.loreIds)),
    badges: [],
    purchasedUpgradeIds: [],
    branchChoices: {},
    achievedEndingIds: [],
    newGamePlusCycle: 0,
    variables: { ...(activeCampaign?.initialVariables ?? {}) },
    seenPresentationIds: [],
    presentationHistory: [],
    evidence: { ...EMPTY_EVIDENCE, sideOps: [], vr: [], codecContactIds: [], codecConversationIds: [], listenedTapeIds: [], viewedLoreIds: [] },
    events: [],
    lastUpdatedAt: now()
  };
}

function normalizeRank(value: string): CampaignRank {
  const normalized = String(value || 'ROOKIE').toUpperCase() as CampaignRank;
  return Object.prototype.hasOwnProperty.call(rankOrder, normalized) ? normalized : 'ROOKIE';
}

function betterSideOpsRecord(current: CampaignEvidence['sideOps'][number] | undefined, candidate: CampaignEvidence['sideOps'][number]) {
  if (!current) return candidate;
  const currentRank = rankOrder[current.rank];
  const candidateRank = rankOrder[candidate.rank];
  if (candidateRank !== currentRank) return candidateRank > currentRank ? candidate : current;
  if (candidate.score !== current.score) return candidate.score > current.score ? candidate : current;
  return candidate.timeSeconds < current.timeSeconds ? candidate : current;
}

function betterVrRecord(current: CampaignEvidence['vr'][number] | undefined, candidate: CampaignEvidence['vr'][number]) {
  if (!current) return candidate;
  const currentRank = rankOrder[current.rank];
  const candidateRank = rankOrder[candidate.rank];
  if (candidateRank !== currentRank) return candidateRank > currentRank ? candidate : current;
  if (candidate.score !== current.score) return candidate.score > current.score ? candidate : current;
  return candidate.timeSeconds < current.timeSeconds ? candidate : current;
}

function mergeEvidence(base: CampaignEvidence, incoming: CampaignEvidence): CampaignEvidence {
  const sideOpsMap = new Map<string, CampaignEvidence['sideOps'][number]>();
  [...base.sideOps, ...incoming.sideOps].forEach((record) => {
    sideOpsMap.set(record.missionId, betterSideOpsRecord(sideOpsMap.get(record.missionId), record));
  });
  const vrMap = new Map<string, CampaignEvidence['vr'][number]>();
  [...base.vr, ...incoming.vr].forEach((record) => {
    vrMap.set(record.missionId, betterVrRecord(vrMap.get(record.missionId), record));
  });
  return {
    sideOps: Array.from(sideOpsMap.values()),
    vr: Array.from(vrMap.values()),
    codecContactIds: unique([...base.codecContactIds, ...incoming.codecContactIds]),
    codecConversationIds: unique([...base.codecConversationIds, ...incoming.codecConversationIds]),
    listenedTapeIds: unique([...base.listenedTapeIds, ...incoming.listenedTapeIds]),
    viewedLoreIds: unique([...base.viewedLoreIds, ...incoming.viewedLoreIds])
  };
}

function hydrateEvidenceFromExistingSaves(definitions: CampaignDefinition[]): CampaignEvidence {
  const missionIds = unique(allNodes(definitions)
    .filter((node) => node.condition.type === 'sideops_clear')
    .map((node) => node.condition.type === 'sideops_clear' ? node.condition.missionId : ''));
  const sideOps = missionIds.flatMap((missionId) => {
    const result = loadJson<MissionCompletePayload | null>(`sideops-${missionId}-best`, null);
    if (!result?.success) return [];
    return [{
      missionId,
      rank: normalizeRank(result.rankPreview),
      score: result.stealthScore,
      timeSeconds: result.timeSeconds,
      completedAt: now()
    }];
  });

  const vrState = loadJson<VrMissionProgress>('vr-mission-progress', { records: [], unlockedTapeIds: [], unlockedBadges: [] });
  const vrMap = new Map<string, CampaignEvidence['vr'][number]>();
  (Array.isArray(vrState.records) ? vrState.records : []).filter((record) => record.success).forEach((record) => {
    const candidate = {
      missionId: record.missionId,
      rank: normalizeRank(record.rank),
      score: record.score,
      timeSeconds: record.timeSeconds,
      completedAt: record.completedAt
    };
    vrMap.set(record.missionId, betterVrRecord(vrMap.get(record.missionId), candidate));
  });

  const callHistory = loadJson<CallHistoryEntry[]>('call-history', []);
  const tapeState = loadJson<TapeArchiveState>('tape-archive-state', { favorites: [], progress: [], history: [] });
  const loreState = loadJson<LoreDatabaseState>('lore-database-state', { favorites: [], history: [], notes: [] });

  return {
    sideOps,
    vr: Array.from(vrMap.values()),
    codecContactIds: unique(Array.isArray(callHistory) ? callHistory.filter((entry) => entry.completed).map((entry) => entry.contactId ?? '') : []),
    codecConversationIds: unique(Array.isArray(callHistory) ? callHistory.filter((entry) => entry.completed).map((entry) => entry.conversationId ?? '') : []),
    listenedTapeIds: unique(Array.isArray(tapeState.progress) ? tapeState.progress.filter((record) => record.listened).map((record) => record.tapeId) : []),
    viewedLoreIds: unique(Array.isArray(loreState.history) ? loreState.history : [])
  };
}

function meetsRank(actual: CampaignRank, required?: CampaignRank): boolean {
  return !required || rankOrder[actual] >= rankOrder[required];
}

function isSingleCampaignConditionMet(condition: CampaignNodeDefinition['condition'], node: CampaignNodeDefinition, progress: CampaignProgress): boolean {
  if (condition.type === 'all_prerequisites') return node.prerequisites.every((id) => progress.completedNodeIds.includes(id));
  if (condition.type === 'codec_call') {
    const contactMet = progress.evidence.codecContactIds.includes(condition.contactId);
    const conversationMet = !condition.conversationId || progress.evidence.codecConversationIds.includes(condition.conversationId);
    return contactMet && conversationMet;
  }
  if (condition.type === 'sideops_clear') {
    const record = progress.evidence.sideOps.find((item) => item.missionId === condition.missionId);
    return Boolean(record && meetsRank(record.rank, condition.minimumRank));
  }
  if (condition.type === 'vr_clear') {
    const record = progress.evidence.vr.find((item) => item.missionId === condition.missionId);
    return Boolean(record && meetsRank(record.rank, condition.minimumRank));
  }
  if (condition.type === 'tape_listened') return progress.evidence.listenedTapeIds.includes(condition.tapeId);
  if (condition.type === 'lore_viewed') return progress.evidence.viewedLoreIds.includes(condition.loreId);
  if (condition.type === 'resource_minimum') return progress.resources[condition.resource] >= condition.amount;
  if (condition.type === 'badge_owned') return progress.badges.includes(condition.badge);
  if (condition.type === 'variable_compare') {
    const actual = progress.variables[condition.variable];
    if (condition.operator === 'eq') return actual === condition.value;
    if (condition.operator === 'neq') return actual !== condition.value;
    const actualNumber = Number(actual);
    const expectedNumber = Number(condition.value);
    if (!Number.isFinite(actualNumber) || !Number.isFinite(expectedNumber)) return false;
    if (condition.operator === 'gt') return actualNumber > expectedNumber;
    if (condition.operator === 'gte') return actualNumber >= expectedNumber;
    if (condition.operator === 'lt') return actualNumber < expectedNumber;
    if (condition.operator === 'lte') return actualNumber <= expectedNumber;
  }
  return false;
}

export function isCampaignNodeConditionMet(node: CampaignNodeDefinition, progress: CampaignProgress): boolean {
  const conditions = [node.condition, ...(node.additionalConditions ?? [])];
  const results = conditions.map((condition) => isSingleCampaignConditionMet(condition, node, progress));
  return node.conditionLogic === 'any' ? results.some(Boolean) : results.every(Boolean);
}

function branchSelectionAllowsNode(node: CampaignNodeDefinition, progress: CampaignProgress): boolean {
  if (!node.branch) return true;
  const selected = progress.branchChoices[node.branch.groupId];
  return !selected || selected === node.branch.optionId;
}

export function getCampaignNodeStatus(node: CampaignNodeDefinition, progress: CampaignProgress): import('../types/campaign.types').CampaignNodeStatus {
  if (progress.completedNodeIds.includes(node.id)) return 'complete';
  if (node.branch) {
    const selected = progress.branchChoices[node.branch.groupId];
    if (selected && selected !== node.branch.optionId) return 'blocked';
  }
  if (!node.prerequisites.every((id) => progress.completedNodeIds.includes(id))) return 'locked';
  if (node.branch && !progress.branchChoices[node.branch.groupId]) return 'choice';
  return 'active';
}

function addWallet(wallet: CampaignResourceWallet, patch: Partial<CampaignResourceWallet> = {}): CampaignResourceWallet {
  return {
    commandPoints: Math.max(0, wallet.commandPoints + (patch.commandPoints ?? 0)),
    intel: Math.max(0, wallet.intel + (patch.intel ?? 0)),
    supplies: Math.max(0, wallet.supplies + (patch.supplies ?? 0)),
    credits: Math.max(0, wallet.credits + (patch.credits ?? 0))
  };
}

function applyNodeReward(progress: CampaignProgress, node: CampaignNodeDefinition): CampaignProgress {
  if (progress.claimedRewardIds.includes(node.id)) return progress;
  const reward = node.reward;
  const xp = progress.xp + (reward.xp ?? 0);
  const rewardSummary = [
    reward.xp ? `${reward.xp} XP` : '',
    reward.resources?.credits ? `${reward.resources.credits} credits` : '',
    reward.resources?.intel ? `${reward.resources.intel} intel` : '',
    reward.resources?.supplies ? `${reward.resources.supplies} supplies` : '',
    reward.resources?.commandPoints ? `${reward.resources.commandPoints} CP` : ''
  ].filter(Boolean).join(' / ') || 'Progression unlocks';

  const endingWasNew = Boolean(node.ending && !progress.achievedEndingIds.includes(node.ending.id));
  const endingEvents = endingWasNew && node.ending
    ? [makeEvent('ending', node.ending.title, node.ending.summary)]
    : [];
  return {
    ...progress,
    xp,
    level: calculateCampaignLevel(xp),
    resources: addWallet(progress.resources, reward.resources),
    claimedRewardIds: [...progress.claimedRewardIds, node.id],
    unlockedMissionIds: unique([...progress.unlockedMissionIds, ...(reward.unlockMissionIds ?? [])]),
    unlockedVrMissionIds: unique([...progress.unlockedVrMissionIds, ...(reward.unlockVrMissionIds ?? [])]),
    unlockedTapeIds: unique([...progress.unlockedTapeIds, ...(reward.unlockTapeIds ?? [])]),
    unlockedContactIds: unique([...progress.unlockedContactIds, ...(reward.unlockContactIds ?? [])]),
    unlockedLoreIds: unique([...progress.unlockedLoreIds, ...(reward.unlockLoreIds ?? [])]),
    badges: unique([...progress.badges, ...(reward.badges ?? [])]),
    achievedEndingIds: unique([...progress.achievedEndingIds, ...(node.ending ? [node.ending.id] : [])]),
    variables: applyCampaignVariableMutations({
      ...progress.variables,
      ...(node.ending ? { 'ending.last': node.ending.id, [`ending.${node.ending.id}`]: true } : {})
    }, node.variableEffects),
    events: [...endingEvents, ...(node.variableEffects?.length ? [makeEvent('variable', node.title, `${node.variableEffects.length} campaign variable mutation(s) applied.`)] : []), makeEvent('reward', node.title, rewardSummary), ...progress.events].slice(0, 60)
  };
}

export function reconcileCampaignProgress(input: CampaignProgress, definitions: CampaignDefinition[] = getCampaignDefinitions()): CampaignProgress {
  const activeCampaign = definitions.find((campaign) => campaign.id === input.activeCampaignId) ?? definitions[0];
  const activeDefinitions = activeCampaign ? [activeCampaign] : [];
  let progress: CampaignProgress = {
    ...createDefaultCampaignProgress(activeDefinitions.length ? activeDefinitions : definitions),
    ...input,
    activeCampaignId: activeCampaign?.id ?? input.activeCampaignId,
    schemaVersion: CAMPAIGN_SCHEMA_VERSION,
    resources: { ...EMPTY_WALLET, ...(input.resources ?? {}) },
    evidence: mergeEvidence(EMPTY_EVIDENCE, input.evidence ?? EMPTY_EVIDENCE),
    completedNodeIds: unique(input.completedNodeIds ?? []),
    claimedRewardIds: unique(input.claimedRewardIds ?? []),
    unlockedMissionIds: unique([...(input.unlockedMissionIds ?? []), ...initialUnlocks(activeDefinitions)]),
    unlockedVrMissionIds: unique([...(input.unlockedVrMissionIds ?? []), ...activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.vrMissionIds)]),
    unlockedTapeIds: unique([...(input.unlockedTapeIds ?? []), ...activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.tapeIds)]),
    unlockedContactIds: unique([...(input.unlockedContactIds ?? []), ...activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.contactIds)]),
    unlockedLoreIds: unique([...(input.unlockedLoreIds ?? []), ...activeDefinitions.flatMap((campaign) => campaign.initialUnlocks.loreIds)]),
    badges: unique(input.badges ?? []),
    purchasedUpgradeIds: unique(input.purchasedUpgradeIds ?? []),
    branchChoices: input.branchChoices && typeof input.branchChoices === 'object' ? { ...input.branchChoices } : {},
    achievedEndingIds: unique(input.achievedEndingIds ?? []),
    newGamePlusCycle: Math.max(0, Number(input.newGamePlusCycle ?? 0) || 0),
    variables: mergeInitialCampaignVariables(activeCampaign, input.variables),
    seenPresentationIds: unique(input.seenPresentationIds ?? []),
    presentationHistory: Array.isArray(input.presentationHistory) ? input.presentationHistory.slice(0, 120) : [],
    events: Array.isArray(input.events) ? input.events.slice(0, 60) : []
  };

  let changed = true;
  while (changed) {
    changed = false;
    for (const node of allNodes(activeDefinitions)) {
      if (progress.completedNodeIds.includes(node.id)) continue;
      const prerequisitesMet = node.prerequisites.every((id) => progress.completedNodeIds.includes(id));
      if (!prerequisitesMet || !branchSelectionAllowsNode(node, progress) || (node.branch && !progress.branchChoices[node.branch.groupId]) || !isCampaignNodeConditionMet(node, progress)) continue;
      progress = {
        ...progress,
        completedNodeIds: [...progress.completedNodeIds, node.id],
        events: [makeEvent('node_complete', node.title, `Campaign node completed via ${node.module.toUpperCase()}.`), ...progress.events].slice(0, 60)
      };
      progress = applyNodeReward(progress, node);
      changed = true;
    }
  }

  return { ...progress, level: calculateCampaignLevel(progress.xp), lastUpdatedAt: now() };
}

export function chooseCampaignBranch(node: CampaignNodeDefinition, slotId: CampaignSlotId = loadActiveCampaignSlot()): { success: boolean; message: string; progress: CampaignProgress } {
  const progress = loadCampaignProgress(slotId);
  if (!node.branch) return { success: false, message: 'Node has no branch choice.', progress };
  if (!node.prerequisites.every((id) => progress.completedNodeIds.includes(id))) {
    return { success: false, message: 'Complete branch prerequisites first.', progress };
  }
  const existing = progress.branchChoices[node.branch.groupId];
  if (existing && existing !== node.branch.optionId) {
    return { success: false, message: `Branch already committed to ${existing}.`, progress };
  }
  if (existing === node.branch.optionId) return { success: true, message: `${node.branch.label} already selected.`, progress };
  const next = saveCampaignProgress({
    ...progress,
    branchChoices: { ...progress.branchChoices, [node.branch.groupId]: node.branch.optionId },
    variables: { ...progress.variables, [`branch.${node.branch.groupId}`]: node.branch.optionId },
    events: [makeEvent('branch_choice', node.branch.label, node.branch.description ?? `Committed to branch ${node.branch.optionId}.`), ...progress.events].slice(0, 60)
  }, slotId);
  return { success: true, message: `${node.branch.label} selected.`, progress: next };
}

function materializeCampaignUnlocks(progress: CampaignProgress): void {
  const codecMemory = loadJson<string[]>('codec-memory', []);
  saveJson('codec-memory', unique([...codecMemory, ...progress.unlockedContactIds]));
  const vrUnlockedTapes = loadJson<string[]>('vr-unlocked-tapes', []);
  saveJson('vr-unlocked-tapes', unique([...vrUnlockedTapes, ...progress.unlockedTapeIds]));
}

export function saveCampaignProgress(progress: CampaignProgress, slotId: CampaignSlotId = loadActiveCampaignSlot()): CampaignProgress {
  const definitions = getCampaignDefinitions();
  const reconciled = reconcileCampaignProgress(progress, definitions);
  saveJson(campaignSlotKey(slotId), reconciled);
  if (slotId === 'slot_1') saveJson(CAMPAIGN_PROGRESS_KEY, reconciled);
  materializeCampaignUnlocks(reconciled);
  return reconciled;
}

export function loadCampaignProgress(slotId: CampaignSlotId = loadActiveCampaignSlot()): CampaignProgress {
  const definitions = getCampaignDefinitions();
  const fallback = createDefaultCampaignProgress(definitions);
  const legacy = slotId === 'slot_1' ? loadJson<CampaignProgress | null>(CAMPAIGN_PROGRESS_KEY, null) : null;
  const existing = loadJson<CampaignProgress | null>(campaignSlotKey(slotId), null);
  const shouldBootstrapLegacyEvidence = slotId === 'slot_1' && !existing && !legacy;
  const stored = existing ?? legacy ?? fallback;
  const candidate = shouldBootstrapLegacyEvidence
    ? { ...stored, evidence: mergeEvidence(stored.evidence ?? EMPTY_EVIDENCE, hydrateEvidenceFromExistingSaves(definitions)) }
    : stored;
  const reconciled = reconcileCampaignProgress(candidate, definitions);
  saveJson(campaignSlotKey(slotId), reconciled);
  if (slotId === 'slot_1') saveJson(CAMPAIGN_PROGRESS_KEY, reconciled);
  materializeCampaignUnlocks(reconciled);
  return reconciled;
}

export function synchronizeCampaignProgress(slotId: CampaignSlotId = loadActiveCampaignSlot()): CampaignProgress {
  const progress = loadCampaignProgress(slotId);
  return saveCampaignProgress({
    ...progress,
    evidence: mergeEvidence(progress.evidence, hydrateEvidenceFromExistingSaves(getCampaignDefinitions())),
    events: [makeEvent('sync', 'Cross-module synchronization', 'Imported current Codec, Side Ops, VR, Tape and Lore progress.'), ...progress.events].slice(0, 60)
  }, slotId);
}

export function getCampaignSlotSummaries(): CampaignSlotSummary[] {
  return CAMPAIGN_SLOTS.map((slotId) => {
    const stored = loadJson<CampaignProgress | null>(campaignSlotKey(slotId), slotId === 'slot_1' ? loadJson<CampaignProgress | null>(CAMPAIGN_PROGRESS_KEY, null) : null);
    if (!stored) return { slotId, level: 1, xp: 0, campaignId: getCampaignDefinitions()[0]?.id ?? '', completedNodes: 0, badges: 0, endings: 0, newGamePlusCycle: 0, empty: true };
    return {
      slotId,
      level: calculateCampaignLevel(stored.xp ?? 0),
      xp: stored.xp ?? 0,
      campaignId: stored.activeCampaignId ?? getCampaignDefinitions()[0]?.id ?? '',
      completedNodes: Array.isArray(stored.completedNodeIds) ? stored.completedNodeIds.length : 0,
      badges: Array.isArray(stored.badges) ? stored.badges.length : 0,
      endings: Array.isArray(stored.achievedEndingIds) ? stored.achievedEndingIds.length : 0,
      newGamePlusCycle: Math.max(0, Number(stored.newGamePlusCycle ?? 0) || 0),
      lastUpdatedAt: stored.lastUpdatedAt,
      empty: false
    };
  });
}

export function exportCampaignSlot(slotId: CampaignSlotId = loadActiveCampaignSlot()): string {
  const progress = loadCampaignProgress(slotId);
  return JSON.stringify({
    schema: 'shadow-codec-ops-campaign-save',
    version: CAMPAIGN_SCHEMA_VERSION,
    exportedAt: now(),
    slotId,
    progress
  }, null, 2);
}

export function importCampaignSlot(payload: string, slotId: CampaignSlotId = loadActiveCampaignSlot()): CampaignProgress {
  const parsed = JSON.parse(payload) as { progress?: CampaignProgress } | CampaignProgress;
  const candidate = 'progress' in parsed && parsed.progress ? parsed.progress : parsed as CampaignProgress;
  if (!candidate || typeof candidate !== 'object' || !Array.isArray(candidate.completedNodeIds)) {
    throw new Error('Invalid campaign save payload.');
  }
  return saveCampaignProgress(candidate, slotId);
}

function updateEvidence(patch: Partial<CampaignEvidence>): CampaignProgress {
  const progress = loadCampaignProgress();
  return saveCampaignProgress({
    ...progress,
    evidence: mergeEvidence(progress.evidence, {
      sideOps: patch.sideOps ?? [],
      vr: patch.vr ?? [],
      codecContactIds: patch.codecContactIds ?? [],
      codecConversationIds: patch.codecConversationIds ?? [],
      listenedTapeIds: patch.listenedTapeIds ?? [],
      viewedLoreIds: patch.viewedLoreIds ?? []
    })
  });
}

export function recordCampaignSideOpsResult(payload: MissionCompletePayload): CampaignProgress {
  if (!payload.success) return loadCampaignProgress();
  return updateEvidence({
    sideOps: [{
      missionId: payload.missionId,
      rank: normalizeRank(payload.rankPreview),
      score: payload.stealthScore,
      timeSeconds: payload.timeSeconds,
      completedAt: now()
    }]
  });
}

export function recordCampaignVrResult(record: VrMissionRecord): CampaignProgress {
  if (!record.success) return loadCampaignProgress();
  return updateEvidence({
    vr: [{
      missionId: record.missionId,
      rank: normalizeRank(record.rank),
      score: record.score,
      timeSeconds: record.timeSeconds,
      completedAt: record.completedAt
    }]
  });
}

export function recordCampaignCodecCall(contactId: string, conversationId?: string): CampaignProgress {
  return updateEvidence({
    codecContactIds: [contactId],
    codecConversationIds: conversationId ? [conversationId] : []
  });
}

export function recordCampaignTapeListened(tapeId: string): CampaignProgress {
  return updateEvidence({ listenedTapeIds: [tapeId] });
}

export function recordCampaignLoreViewed(loreId: string): CampaignProgress {
  return updateEvidence({ viewedLoreIds: [loreId] });
}

export function getCampaignTapeUnlocks(): string[] {
  return loadCampaignProgress().unlockedTapeIds;
}

export function getCampaignLoadoutBonuses(): { ammo: number; rations: number; chaff: number } {
  const progress = loadCampaignProgress();
  return campaignUpgrades
    .filter((upgrade) => progress.purchasedUpgradeIds.includes(upgrade.id))
    .reduce((acc, upgrade) => ({
      ammo: acc.ammo + (upgrade.bonuses.ammo ?? 0),
      rations: acc.rations + (upgrade.bonuses.rations ?? 0),
      chaff: acc.chaff + (upgrade.bonuses.chaff ?? 0)
    }), { ammo: 0, rations: 0, chaff: 0 });
}

function canAfford(wallet: CampaignResourceWallet, costs: Partial<CampaignResourceWallet>): boolean {
  return (costs.commandPoints ?? 0) <= wallet.commandPoints
    && (costs.intel ?? 0) <= wallet.intel
    && (costs.supplies ?? 0) <= wallet.supplies
    && (costs.credits ?? 0) <= wallet.credits;
}

export function purchaseCampaignUpgrade(upgradeId: string): { success: boolean; message: string; progress: CampaignProgress } {
  const progress = loadCampaignProgress();
  const upgrade = campaignUpgrades.find((item) => item.id === upgradeId);
  if (!upgrade) return { success: false, message: 'Unknown requisition.', progress };
  if (progress.purchasedUpgradeIds.includes(upgradeId)) return { success: false, message: 'Upgrade already acquired.', progress };
  if (!canAfford(progress.resources, upgrade.costs)) return { success: false, message: 'Insufficient campaign resources.', progress };

  const nextResources: CampaignResourceWallet = {
    commandPoints: progress.resources.commandPoints - (upgrade.costs.commandPoints ?? 0),
    intel: progress.resources.intel - (upgrade.costs.intel ?? 0),
    supplies: progress.resources.supplies - (upgrade.costs.supplies ?? 0),
    credits: progress.resources.credits - (upgrade.costs.credits ?? 0)
  };
  const next = saveCampaignProgress({
    ...progress,
    resources: nextResources,
    purchasedUpgradeIds: [...progress.purchasedUpgradeIds, upgrade.id],
    events: [makeEvent('upgrade', upgrade.title, upgrade.description), ...progress.events].slice(0, 60)
  });
  return { success: true, message: `${upgrade.title} requisitioned.`, progress: next };
}

export function setCampaignLaunchDirective(directive: Omit<CampaignLaunchDirective, 'createdAt'>): void {
  saveJson(CAMPAIGN_LAUNCH_DIRECTIVE_KEY, { ...directive, createdAt: now() });
}

export function consumeCampaignLaunchDirective(module: CampaignLaunchDirective['module']): CampaignLaunchDirective | null {
  const directive = loadJson<CampaignLaunchDirective | null>(CAMPAIGN_LAUNCH_DIRECTIVE_KEY, null);
  if (!directive || directive.module !== module) return null;
  saveJson(CAMPAIGN_LAUNCH_DIRECTIVE_KEY, null);
  return directive;
}

export function getCampaignDefinitions(): CampaignDefinition[] {
  const merged = new Map<string, CampaignDefinition>();
  builtInCampaigns.forEach((campaign) => merged.set(campaign.id, campaign));
  getBuilderCampaignDefinitions(true).forEach((campaign) => {
    if (!merged.has(campaign.id)) merged.set(campaign.id, campaign);
  });
  return Array.from(merged.values());
}

export function getCampaignCompletion(progress: CampaignProgress, campaign: CampaignDefinition): { completed: number; total: number; percent: number } {
  const nodes = campaign.chapters.flatMap((chapter) => chapter.nodes).filter((node) => {
    if (node.optional) return false;
    if (!node.branch) return true;
    const selected = progress.branchChoices[node.branch.groupId];
    return !selected || selected === node.branch.optionId;
  });
  const completed = nodes.filter((node) => progress.completedNodeIds.includes(node.id)).length;
  return { completed, total: nodes.length, percent: nodes.length ? Math.round((completed / nodes.length) * 100) : 0 };
}

export function startCampaignNewGamePlus(slotId: CampaignSlotId = loadActiveCampaignSlot()): { success: boolean; message: string; progress: CampaignProgress } {
  const current = loadCampaignProgress(slotId);
  if (!current.achievedEndingIds.length) return { success: false, message: 'Complete at least one campaign ending first.', progress: current };
  const definitions = getCampaignDefinitions();
  const activeCampaign = definitions.find((campaign) => campaign.id === current.activeCampaignId) ?? definitions[0];
  const initial = createDefaultCampaignProgress(activeCampaign ? [activeCampaign] : definitions);
  const cycle = current.newGamePlusCycle + 1;
  const next = saveCampaignProgress({
    ...initial,
    activeCampaignId: current.activeCampaignId,
    xp: current.xp,
    level: current.level,
    resources: current.resources,
    badges: unique([...current.badges, `NEW GAME+ CYCLE ${cycle}`]),
    purchasedUpgradeIds: current.purchasedUpgradeIds,
    achievedEndingIds: current.achievedEndingIds,
    variables: { ...(activeCampaign?.initialVariables ?? {}), 'system.newGamePlusCycle': cycle },
    seenPresentationIds: [],
    presentationHistory: current.presentationHistory,
    newGamePlusCycle: cycle,
    events: [makeEvent('sync', `New Game+ Cycle ${cycle}`, 'Campaign graph reset while upgrades, resources, XP, badges and discovered endings were preserved.')]
  }, slotId);
  return { success: true, message: `New Game+ cycle ${cycle} started.`, progress: next };
}


export function acknowledgeCampaignPresentationItem(
  item: CampaignPresentationQueueItem,
  slotId: CampaignSlotId = loadActiveCampaignSlot()
): CampaignProgress {
  const progress = loadCampaignProgress(slotId);
  return saveCampaignProgress(acknowledgeCampaignPresentation(progress, item), slotId);
}

export function registerCampaignOpen(slotId: CampaignSlotId = loadActiveCampaignSlot()): CampaignProgress {
  const progress = loadCampaignProgress(slotId);
  const count = Number(progress.variables['system.campaignOpenCount'] ?? 0);
  return saveCampaignProgress({
    ...progress,
    variables: { ...progress.variables, 'system.campaignOpenCount': count + 1 },
    lastUpdatedAt: now()
  }, slotId);
}

export function setCampaignVariable(
  variable: string,
  value: CampaignVariableValue,
  slotId: CampaignSlotId = loadActiveCampaignSlot()
): CampaignProgress {
  const progress = loadCampaignProgress(slotId);
  return saveCampaignProgress({
    ...progress,
    variables: { ...progress.variables, [variable]: value },
    events: [makeEvent('variable', variable, `Variable set to ${String(value)}.`), ...progress.events].slice(0, 60)
  }, slotId);
}

export function resetCampaignProgress(slotId: CampaignSlotId = loadActiveCampaignSlot()): CampaignProgress {
  const fresh = createDefaultCampaignProgress(getCampaignDefinitions());
  return saveCampaignProgress({
    ...fresh,
    events: [makeEvent('sync', 'Campaign reset', 'Campaign progression was reset. Existing module records can be synchronized again.')]
  }, slotId);
}


export function recordCampaignDirectorEvent(
  event: DirectorRuntimeEvent,
  slotId: CampaignSlotId = loadActiveCampaignSlot()
): CampaignProgress {
  if (!event.eventName.startsWith('campaign:')) return loadCampaignProgress(slotId);
  const progress = loadCampaignProgress(slotId);
  const variables: Record<string, CampaignVariableValue> = { ...progress.variables, 'director.lastEvent': event.eventName, 'director.lastSequence': event.sequenceId };
  for (const [key, value] of Object.entries(event.payload ?? {})) {
    variables[`director.${key}`] = value;
  }
  return saveCampaignProgress({
    ...progress,
    variables,
    events: [makeEvent('narrative', 'Codec Director event', `${event.eventName} from ${event.sequenceId}.`), ...progress.events].slice(0, 60)
  }, slotId);
}
