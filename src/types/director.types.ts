import type { EraId } from './codec.types';
import type { LocalizedText, NarrativeEmotion } from './narrative.types';

export type DirectorContext = 'standalone' | 'codec' | 'campaign' | 'sideops' | 'vr';
export type DirectorNodeKind = 'line' | 'choice' | 'interrupt' | 'event' | 'delay' | 'jump' | 'end';
export type DirectorValue = string | number | boolean;
export type DirectorConditionOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'truthy' | 'falsy';
export type DirectorEffectOperation = 'set' | 'increment' | 'decrement' | 'toggle' | 'emit';

export interface DirectorCondition {
  variable: string;
  operator: DirectorConditionOperator;
  value?: DirectorValue;
}

export interface DirectorEffect {
  operation: DirectorEffectOperation;
  variable?: string;
  value?: DirectorValue;
  eventName?: string;
  payload?: Record<string, DirectorValue>;
}

export interface DirectorChoiceOption {
  id: string;
  label: LocalizedText;
  description?: LocalizedText;
  nextId: string;
  conditions?: DirectorCondition[];
  effects?: DirectorEffect[];
}

export interface DirectorNodeBase {
  id: string;
  kind: DirectorNodeKind;
  label?: string;
  nextId?: string;
  conditions?: DirectorCondition[];
  effects?: DirectorEffect[];
}

export interface DirectorLineNode extends DirectorNodeBase {
  kind: 'line';
  speaker: string;
  speakerId?: string;
  text: LocalizedText;
  emotion?: NarrativeEmotion;
  portraitExpression?: string;
  audioSource?: string;
  durationMs?: number;
  interruptible?: boolean;
  cameraCue?: 'static' | 'push_in' | 'pull_back' | 'shake' | 'focus_left' | 'focus_right' | 'glitch_cut';
}

export interface DirectorChoiceNode extends DirectorNodeBase {
  kind: 'choice';
  prompt: LocalizedText;
  options: DirectorChoiceOption[];
}

export interface DirectorInterruptNode extends DirectorNodeBase {
  kind: 'interrupt';
  sequenceId: string;
  resumeMode?: 'resume' | 'replace';
  banner?: LocalizedText;
}

export interface DirectorEventNode extends DirectorNodeBase {
  kind: 'event';
  eventName: string;
  payload?: Record<string, DirectorValue>;
}

export interface DirectorDelayNode extends DirectorNodeBase {
  kind: 'delay';
  durationMs: number;
  message?: LocalizedText;
}

export interface DirectorJumpNode extends DirectorNodeBase {
  kind: 'jump';
  targetId: string;
}

export interface DirectorEndNode extends DirectorNodeBase {
  kind: 'end';
  outcomeId?: string;
  title?: LocalizedText;
  summary?: LocalizedText;
}

export type DirectorNode =
  | DirectorLineNode
  | DirectorChoiceNode
  | DirectorInterruptNode
  | DirectorEventNode
  | DirectorDelayNode
  | DirectorJumpNode
  | DirectorEndNode;

export interface DirectorSequenceDefinition {
  schemaVersion: 1;
  id: string;
  title: string;
  description: string;
  era: EraId;
  entryNodeId: string;
  contexts: DirectorContext[];
  tags: string[];
  initialVariables?: Record<string, DirectorValue>;
  nodes: DirectorNode[];
  published?: boolean;
  updatedAt?: string;
  source?: 'built_in' | 'custom';
}

export interface DirectorHistoryEntry {
  id: string;
  sequenceId: string;
  nodeId: string;
  kind: DirectorNodeKind | 'choice_selected' | 'sequence_complete';
  label: string;
  timestamp: string;
}

export interface DirectorRuntimeState {
  sequenceId: string;
  currentNodeId: string;
  variables: Record<string, DirectorValue>;
  choiceHistory: Record<string, string>;
  history: DirectorHistoryEntry[];
  status: 'running' | 'waiting_choice' | 'interrupted' | 'complete' | 'aborted';
  outcomeId?: string;
  startedAt: string;
  completedAt?: string;
}

export interface DirectorValidationIssue {
  level: 'error' | 'warning';
  code: string;
  message: string;
  nodeId?: string;
}

export interface DirectorRuntimeEvent {
  id: string;
  eventName: string;
  sequenceId: string;
  nodeId: string;
  context: DirectorContext;
  payload?: Record<string, DirectorValue>;
  timestamp: string;
}

export interface DirectorLaunchRequest {
  sequenceId: string;
  context: DirectorContext;
  sourceLabel?: string;
  inheritedVariables?: Record<string, DirectorValue>;
}

export interface DirectorOutcomeRecord {
  id: string;
  sequenceId: string;
  context: DirectorContext;
  outcomeId?: string;
  choiceHistory: Record<string, string>;
  variables: Record<string, DirectorValue>;
  startedAt: string;
  completedAt: string;
}
