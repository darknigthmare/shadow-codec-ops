import type {
  DirectorCondition,
  DirectorEffect,
  DirectorHistoryEntry,
  DirectorNode,
  DirectorRuntimeEvent,
  DirectorRuntimeState,
  DirectorSequenceDefinition,
  DirectorValidationIssue,
  DirectorValue
} from '../types/director.types';

function makeHistory(sequenceId: string, node: DirectorNode, kind: DirectorHistoryEntry['kind'] = node.kind, label?: string): DirectorHistoryEntry {
  return {
    id: `${sequenceId}:${node.id}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
    sequenceId,
    nodeId: node.id,
    kind,
    label: label ?? node.label ?? node.id,
    timestamp: new Date().toISOString()
  };
}

function asNumber(value: DirectorValue | undefined): number {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

export function evaluateDirectorCondition(condition: DirectorCondition, variables: Record<string, DirectorValue>): boolean {
  const current = variables[condition.variable];
  switch (condition.operator) {
    case 'eq': return current === condition.value;
    case 'neq': return current !== condition.value;
    case 'gt': return asNumber(current) > asNumber(condition.value);
    case 'gte': return asNumber(current) >= asNumber(condition.value);
    case 'lt': return asNumber(current) < asNumber(condition.value);
    case 'lte': return asNumber(current) <= asNumber(condition.value);
    case 'truthy': return Boolean(current);
    case 'falsy': return !current;
    default: return false;
  }
}

export function evaluateDirectorConditions(conditions: DirectorCondition[] | undefined, variables: Record<string, DirectorValue>): boolean {
  return !conditions?.length || conditions.every((condition) => evaluateDirectorCondition(condition, variables));
}

export interface DirectorEffectResult {
  variables: Record<string, DirectorValue>;
  events: Array<{ eventName: string; payload?: Record<string, DirectorValue> }>;
}

export function applyDirectorEffects(effects: DirectorEffect[] | undefined, current: Record<string, DirectorValue>): DirectorEffectResult {
  const variables = { ...current };
  const events: DirectorEffectResult['events'] = [];
  for (const effect of effects ?? []) {
    if (effect.operation === 'emit') {
      if (effect.eventName) events.push({ eventName: effect.eventName, payload: effect.payload });
      continue;
    }
    if (!effect.variable) continue;
    if (effect.operation === 'set') variables[effect.variable] = effect.value ?? true;
    if (effect.operation === 'increment') variables[effect.variable] = asNumber(variables[effect.variable]) + asNumber(effect.value ?? 1);
    if (effect.operation === 'decrement') variables[effect.variable] = asNumber(variables[effect.variable]) - asNumber(effect.value ?? 1);
    if (effect.operation === 'toggle') variables[effect.variable] = !Boolean(variables[effect.variable]);
  }
  return { variables, events };
}

export function createDirectorRuntime(sequence: DirectorSequenceDefinition, inheritedVariables: Record<string, DirectorValue> = {}): DirectorRuntimeState {
  return {
    sequenceId: sequence.id,
    currentNodeId: sequence.entryNodeId,
    variables: { ...(sequence.initialVariables ?? {}), ...inheritedVariables },
    choiceHistory: {},
    history: [],
    status: 'running',
    startedAt: new Date().toISOString()
  };
}

export function getDirectorNode(sequence: DirectorSequenceDefinition, nodeId: string): DirectorNode | undefined {
  return sequence.nodes.find((node) => node.id === nodeId);
}

export interface DirectorAdvanceResult {
  state: DirectorRuntimeState;
  emittedEvents: Array<{ eventName: string; payload?: Record<string, DirectorValue> }>;
  interruptSequenceId?: string;
  interruptResumeMode?: 'resume' | 'replace';
}

function completeState(state: DirectorRuntimeState, node: DirectorNode, outcomeId?: string): DirectorRuntimeState {
  return {
    ...state,
    status: 'complete',
    outcomeId,
    completedAt: new Date().toISOString(),
    history: [...state.history, makeHistory(state.sequenceId, node, 'sequence_complete', outcomeId ?? 'complete')]
  };
}

function advanceTo(state: DirectorRuntimeState, sequence: DirectorSequenceDefinition, currentNode: DirectorNode, nextId?: string, variables = state.variables): DirectorRuntimeState {
  if (!nextId) return completeState({ ...state, variables }, currentNode);
  const nextNode = getDirectorNode(sequence, nextId);
  if (!nextNode) return { ...completeState({ ...state, variables }, currentNode, 'broken_reference'), status: 'aborted' };
  return {
    ...state,
    currentNodeId: nextId,
    variables,
    status: nextNode.kind === 'choice' ? 'waiting_choice' : 'running',
    history: [...state.history, makeHistory(state.sequenceId, currentNode)]
  };
}

export function advanceDirectorRuntime(state: DirectorRuntimeState, sequence: DirectorSequenceDefinition): DirectorAdvanceResult {
  if (state.status === 'complete' || state.status === 'aborted') return { state, emittedEvents: [] };
  const node = getDirectorNode(sequence, state.currentNodeId);
  if (!node) {
    return {
      state: { ...state, status: 'aborted', completedAt: new Date().toISOString() },
      emittedEvents: []
    };
  }
  if (!evaluateDirectorConditions(node.conditions, state.variables)) {
    return {
      state: advanceTo(state, sequence, node, node.nextId),
      emittedEvents: []
    };
  }
  if (node.kind === 'choice') return { state: { ...state, status: 'waiting_choice' }, emittedEvents: [] };
  if (node.kind === 'end') return { state: completeState(state, node, node.outcomeId), emittedEvents: [] };

  const effectResult = applyDirectorEffects(node.effects, state.variables);
  if (node.kind === 'event') {
    effectResult.events.push({ eventName: node.eventName, payload: node.payload });
  }
  if (node.kind === 'jump') {
    return {
      state: advanceTo(state, sequence, node, node.targetId, effectResult.variables),
      emittedEvents: effectResult.events
    };
  }
  if (node.kind === 'interrupt') {
    const nextState = node.resumeMode === 'replace'
      ? completeState({ ...state, variables: effectResult.variables }, node, 'replaced_by_interrupt')
      : advanceTo(state, sequence, node, node.nextId, effectResult.variables);
    return {
      state: { ...nextState, status: node.resumeMode === 'replace' ? nextState.status : 'interrupted' },
      emittedEvents: effectResult.events,
      interruptSequenceId: node.sequenceId,
      interruptResumeMode: node.resumeMode ?? 'resume'
    };
  }
  return {
    state: advanceTo(state, sequence, node, node.nextId, effectResult.variables),
    emittedEvents: effectResult.events
  };
}

export function chooseDirectorOption(
  state: DirectorRuntimeState,
  sequence: DirectorSequenceDefinition,
  optionId: string
): DirectorAdvanceResult {
  const node = getDirectorNode(sequence, state.currentNodeId);
  if (!node || node.kind !== 'choice') return { state, emittedEvents: [] };
  const option = node.options.find((entry) => entry.id === optionId);
  if (!option || !evaluateDirectorConditions(option.conditions, state.variables)) return { state, emittedEvents: [] };
  const effectResult = applyDirectorEffects([...(node.effects ?? []), ...(option.effects ?? [])], state.variables);
  const nextState = advanceTo(
    {
      ...state,
      choiceHistory: { ...state.choiceHistory, [node.id]: option.id },
      history: [...state.history, makeHistory(state.sequenceId, node, 'choice_selected', option.id)]
    },
    sequence,
    node,
    option.nextId,
    effectResult.variables
  );
  return { state: nextState, emittedEvents: effectResult.events };
}

export function makeDirectorRuntimeEvent(
  eventName: string,
  sequenceId: string,
  nodeId: string,
  context: DirectorRuntimeEvent['context'],
  payload?: Record<string, DirectorValue>
): DirectorRuntimeEvent {
  return {
    id: `${sequenceId}:${eventName}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`,
    eventName,
    sequenceId,
    nodeId,
    context,
    payload,
    timestamp: new Date().toISOString()
  };
}

export function validateDirectorSequence(sequence: DirectorSequenceDefinition, library: DirectorSequenceDefinition[] = []): DirectorValidationIssue[] {
  const issues: DirectorValidationIssue[] = [];
  const ids = new Set<string>();
  for (const node of sequence.nodes) {
    if (!node.id.trim()) issues.push({ level: 'error', code: 'empty_node_id', message: 'A node has an empty ID.' });
    if (ids.has(node.id)) issues.push({ level: 'error', code: 'duplicate_node_id', message: `Duplicate node ID: ${node.id}`, nodeId: node.id });
    ids.add(node.id);
  }
  if (!ids.has(sequence.entryNodeId)) issues.push({ level: 'error', code: 'missing_entry', message: `Entry node does not exist: ${sequence.entryNodeId}` });
  const checkRef = (fromId: string, target: string | undefined, label: string) => {
    if (target && !ids.has(target)) issues.push({ level: 'error', code: 'broken_reference', message: `${label} points to missing node: ${target}`, nodeId: fromId });
  };
  for (const node of sequence.nodes) {
    checkRef(node.id, node.nextId, 'nextId');
    if (node.kind === 'jump') checkRef(node.id, node.targetId, 'jump target');
    if (node.kind === 'choice') {
      if (!node.options.length) issues.push({ level: 'error', code: 'empty_choice', message: 'Choice node has no options.', nodeId: node.id });
      for (const option of node.options) checkRef(node.id, option.nextId, `choice ${option.id}`);
    }
    if (node.kind === 'interrupt' && !library.some((item) => item.id === node.sequenceId) && node.sequenceId !== sequence.id) {
      issues.push({ level: 'error', code: 'missing_interrupt_sequence', message: `Interrupt sequence not found: ${node.sequenceId}`, nodeId: node.id });
    }
    if (node.kind === 'delay' && node.durationMs < 0) issues.push({ level: 'error', code: 'invalid_delay', message: 'Delay cannot be negative.', nodeId: node.id });
  }
  if (!sequence.nodes.some((node) => node.kind === 'end')) issues.push({ level: 'warning', code: 'no_end_node', message: 'Sequence has no explicit end node.' });

  const visited = new Set<string>();
  const queue = [sequence.entryNodeId];
  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const node = getDirectorNode(sequence, id);
    if (!node) continue;
    if (node.nextId) queue.push(node.nextId);
    if (node.kind === 'jump') queue.push(node.targetId);
    if (node.kind === 'choice') node.options.forEach((option) => queue.push(option.nextId));
  }
  for (const node of sequence.nodes) {
    if (!visited.has(node.id)) issues.push({ level: 'warning', code: 'unreachable_node', message: `Node is unreachable from entry: ${node.id}`, nodeId: node.id });
  }
  return issues;
}
