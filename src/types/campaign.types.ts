import type { EraId } from './codec.types';

export type CampaignSlotId = 'slot_1' | 'slot_2' | 'slot_3';

export type CampaignModule = 'campaign' | 'codec' | 'sideops' | 'vr' | 'tapes' | 'lore';
export type CampaignRank = 'ROOKIE' | 'RAT' | 'DOBERMAN' | 'HOUND' | 'FOX' | 'FOXHOUND' | 'BIG BOSS';
export type CampaignResourceId = keyof CampaignResourceWallet;
export type CampaignNodeStatus = 'locked' | 'active' | 'choice' | 'blocked' | 'complete';
export type CampaignVariableValue = string | number | boolean;
export type CampaignPresentationTone = 'briefing' | 'debriefing' | 'warning' | 'choice' | 'heroic' | 'neutral' | 'dark' | 'secret' | 'system';

export interface CampaignResourceWallet {
  commandPoints: number;
  intel: number;
  supplies: number;
  credits: number;
}

export type CampaignVariableOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';

export type CampaignCondition =
  | { type: 'codec_call'; contactId: string; conversationId?: string }
  | { type: 'sideops_clear'; missionId: string; minimumRank?: CampaignRank }
  | { type: 'vr_clear'; missionId: string; minimumRank?: CampaignRank }
  | { type: 'tape_listened'; tapeId: string }
  | { type: 'lore_viewed'; loreId: string }
  | { type: 'resource_minimum'; resource: CampaignResourceId; amount: number }
  | { type: 'badge_owned'; badge: string }
  | { type: 'variable_compare'; variable: string; operator: CampaignVariableOperator; value: CampaignVariableValue }
  | { type: 'all_prerequisites' };

export interface CampaignReward {
  xp?: number;
  resources?: Partial<CampaignResourceWallet>;
  unlockMissionIds?: string[];
  unlockVrMissionIds?: string[];
  unlockTapeIds?: string[];
  unlockContactIds?: string[];
  unlockLoreIds?: string[];
  badges?: string[];
}

export interface CampaignNodeLayout {
  x: number;
  y: number;
}

export interface CampaignPresentationBeat {
  speaker?: string;
  text: string;
  emphasis?: 'normal' | 'quiet' | 'urgent' | 'classified';
}

export interface CampaignPresentationDefinition {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string;
  speaker?: string;
  tone?: CampaignPresentationTone;
  beats?: CampaignPresentationBeat[];
  confirmLabel?: string;
  skippable?: boolean;
}

export interface CampaignVariableMutation {
  variable: string;
  operation: 'set' | 'increment' | 'decrement' | 'toggle';
  value?: CampaignVariableValue;
}

export type CampaignNarrativeTrigger =
  | 'campaign_start'
  | 'campaign_complete'
  | 'chapter_start'
  | 'chapter_complete'
  | 'node_complete'
  | 'branch_choice'
  | 'ending_achieved'
  | 'variable_condition';

export interface CampaignNarrativeEventDefinition {
  id: string;
  trigger: CampaignNarrativeTrigger;
  targetId?: string;
  condition?: CampaignCondition;
  once?: boolean;
  presentation: CampaignPresentationDefinition;
  variableEffects?: CampaignVariableMutation[];
}

export interface CampaignBranchGate {
  groupId: string;
  optionId: string;
  label: string;
  description?: string;
  choicePresentation?: CampaignPresentationDefinition;
  consequenceText?: string;
}

export interface CampaignEndingDefinition {
  id: string;
  title: string;
  summary: string;
  tone: 'heroic' | 'neutral' | 'dark' | 'secret';
  epilogue?: CampaignPresentationDefinition;
}

export interface CampaignNodeDefinition {
  id: string;
  title: string;
  description: string;
  module: CampaignModule;
  targetId?: string;
  era?: EraId | 'multi';
  optional?: boolean;
  prerequisites: string[];
  condition: CampaignCondition;
  additionalConditions?: CampaignCondition[];
  conditionLogic?: 'all' | 'any';
  reward: CampaignReward;
  layout?: CampaignNodeLayout;
  branch?: CampaignBranchGate;
  ending?: CampaignEndingDefinition;
  completionPresentation?: CampaignPresentationDefinition;
  variableEffects?: CampaignVariableMutation[];
}

export interface CampaignChapterDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  briefing?: CampaignPresentationDefinition;
  debriefing?: CampaignPresentationDefinition;
  nodes: CampaignNodeDefinition[];
}

export interface CampaignDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  era: EraId | 'multi';
  author?: string;
  version?: string;
  source?: 'built_in' | 'builder';
  published?: boolean;
  briefing?: CampaignPresentationDefinition;
  debriefing?: CampaignPresentationDefinition;
  initialVariables?: Record<string, CampaignVariableValue>;
  narrativeEvents?: CampaignNarrativeEventDefinition[];
  initialUnlocks: {
    missionIds: string[];
    vrMissionIds: string[];
    tapeIds: string[];
    contactIds: string[];
    loreIds: string[];
  };
  chapters: CampaignChapterDefinition[];
}

export interface CampaignSideOpsEvidence {
  missionId: string;
  rank: CampaignRank;
  score: number;
  timeSeconds: number;
  completedAt: string;
}

export interface CampaignVrEvidence {
  missionId: string;
  rank: CampaignRank;
  score: number;
  timeSeconds: number;
  completedAt: string;
}

export interface CampaignEvidence {
  sideOps: CampaignSideOpsEvidence[];
  vr: CampaignVrEvidence[];
  codecContactIds: string[];
  codecConversationIds: string[];
  listenedTapeIds: string[];
  viewedLoreIds: string[];
}

export interface CampaignEventRecord {
  id: string;
  timestamp: string;
  type: 'node_complete' | 'reward' | 'upgrade' | 'sync' | 'branch_choice' | 'ending' | 'narrative' | 'variable';
  label: string;
  detail: string;
}

export interface CampaignPresentationRecord {
  id: string;
  presentationId: string;
  campaignId: string;
  sourceType: 'campaign' | 'chapter' | 'node' | 'branch' | 'ending' | 'event';
  sourceId: string;
  title: string;
  tone: CampaignPresentationTone;
  viewedAt: string;
}

export interface CampaignStatistics {
  startedAt: string;
  lastActivityAt: string;
  campaignOpenCount: number;
  nodesCompleted: number;
  optionalNodesCompleted: number;
  branchesCommitted: number;
  endingsUnlocked: number;
  rewardsClaimed: number;
  upgradesPurchased: number;
  sideOpsClears: number;
  vrClears: number;
  codecCalls: number;
  tapesListened: number;
  loreViewed: number;
  sideOpsScoreTotal: number;
  vrScoreTotal: number;
  sideOpsTimeSeconds: number;
  vrTimeSeconds: number;
  bestSideOpsRank: CampaignRank;
  bestVrRank: CampaignRank;
  newGamePlusCycles: number;
}

export interface CampaignProgress {
  schemaVersion: 3;
  activeCampaignId: string;
  xp: number;
  level: number;
  resources: CampaignResourceWallet;
  completedNodeIds: string[];
  claimedRewardIds: string[];
  unlockedMissionIds: string[];
  unlockedVrMissionIds: string[];
  unlockedTapeIds: string[];
  unlockedContactIds: string[];
  unlockedLoreIds: string[];
  badges: string[];
  purchasedUpgradeIds: string[];
  branchChoices: Record<string, string>;
  achievedEndingIds: string[];
  newGamePlusCycle: number;
  variables: Record<string, CampaignVariableValue>;
  seenPresentationIds: string[];
  presentationHistory: CampaignPresentationRecord[];
  evidence: CampaignEvidence;
  events: CampaignEventRecord[];
  lastUpdatedAt: string;
}

export interface CampaignUpgradeDefinition {
  id: string;
  title: string;
  description: string;
  costs: Partial<CampaignResourceWallet>;
  bonuses: {
    ammo?: number;
    rations?: number;
    chaff?: number;
  };
}

export interface CampaignLaunchDirective {
  module: Exclude<CampaignModule, 'campaign'>;
  targetId?: string;
  era?: EraId | 'multi';
  nodeId?: string;
  createdAt: string;
}

export interface CampaignSlotSummary {
  slotId: CampaignSlotId;
  level: number;
  xp: number;
  campaignId: string;
  completedNodes: number;
  badges: number;
  endings: number;
  newGamePlusCycle: number;
  lastUpdatedAt?: string;
  empty: boolean;
}

export interface CampaignPresentationQueueItem {
  queueId: string;
  campaignId: string;
  sourceType: CampaignPresentationRecord['sourceType'];
  sourceId: string;
  presentation: CampaignPresentationDefinition;
  variableEffects?: CampaignVariableMutation[];
}
