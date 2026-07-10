import builtInSequencesJson from '../data/directorSequences.json';
import type { ConversationDefinition, EraId } from '../types/codec.types';
import type {
  DirectorCondition,
  DirectorContext,
  DirectorEffect,
  DirectorOutcomeRecord,
  DirectorRuntimeEvent,
  DirectorSequenceDefinition,
  DirectorValue
} from '../types/director.types';
import { normalizeLocalizedText } from './localizationEngine';
import { loadJson, saveJson } from './saveEngine';
import { dispatchDirectorRuntimeEvent } from './directorBus';

export const DIRECTOR_CUSTOM_SEQUENCES_KEY = 'director-custom-sequences';
export const DIRECTOR_EVENT_LOG_KEY = 'director-event-log';
export const DIRECTOR_OUTCOMES_KEY = 'director-outcomes';

const builtIns = builtInSequencesJson as DirectorSequenceDefinition[];

export function loadCustomDirectorSequences(): DirectorSequenceDefinition[] {
  return loadJson<DirectorSequenceDefinition[]>(DIRECTOR_CUSTOM_SEQUENCES_KEY, []);
}

export function saveCustomDirectorSequences(sequences: DirectorSequenceDefinition[]): void {
  saveJson(DIRECTOR_CUSTOM_SEQUENCES_KEY, sequences);
  window.dispatchEvent(new CustomEvent('shadow-codec:director-library-changed'));
}

export function getDirectorSequenceLibrary(): DirectorSequenceDefinition[] {
  const custom = loadCustomDirectorSequences().map((sequence) => ({ ...sequence, source: 'custom' as const }));
  const customIds = new Set(custom.map((sequence) => sequence.id));
  const builtIn = builtIns
    .filter((sequence) => !customIds.has(sequence.id))
    .map((sequence) => ({ ...sequence, source: 'built_in' as const }));
  return [...custom, ...builtIn];
}

export function getDirectorSequence(sequenceId: string): DirectorSequenceDefinition | undefined {
  return getDirectorSequenceLibrary().find((sequence) => sequence.id === sequenceId);
}

export function recordDirectorRuntimeEvent(event: DirectorRuntimeEvent): void {
  const current = loadJson<DirectorRuntimeEvent[]>(DIRECTOR_EVENT_LOG_KEY, []);
  saveJson(DIRECTOR_EVENT_LOG_KEY, [event, ...current].slice(0, 100));
  dispatchDirectorRuntimeEvent(event);
}

export function loadDirectorEventLog(): DirectorRuntimeEvent[] {
  return loadJson<DirectorRuntimeEvent[]>(DIRECTOR_EVENT_LOG_KEY, []);
}

export function recordDirectorOutcome(record: DirectorOutcomeRecord): void {
  const current = loadJson<DirectorOutcomeRecord[]>(DIRECTOR_OUTCOMES_KEY, []);
  saveJson(DIRECTOR_OUTCOMES_KEY, [record, ...current].slice(0, 100));
}

export function loadDirectorOutcomes(): DirectorOutcomeRecord[] {
  return loadJson<DirectorOutcomeRecord[]>(DIRECTOR_OUTCOMES_KEY, []);
}

export function createBlankDirectorSequence(era: EraId = 'mgs1'): DirectorSequenceDefinition {
  const id = `director_custom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  return {
    schemaVersion: 1,
    id,
    title: 'New Director Sequence',
    description: 'Custom branching Codec sequence.',
    era,
    entryNodeId: 'line_1',
    contexts: ['standalone', 'codec'],
    tags: ['custom'],
    initialVariables: {},
    published: false,
    updatedAt: new Date().toISOString(),
    source: 'custom',
    nodes: [
      {
        id: 'line_1',
        kind: 'line',
        speaker: 'campbell',
        speakerId: 'campbell_mgs1',
        text: { en: 'New Director line.', fr: 'Nouvelle ligne Director.' },
        emotion: 'neutral',
        durationMs: 2500,
        nextId: 'end_1'
      },
      {
        id: 'end_1',
        kind: 'end',
        outcomeId: 'custom_complete',
        title: { en: 'Sequence complete', fr: 'Séquence terminée' }
      }
    ]
  };
}

export function cloneDirectorSequence(sequence: DirectorSequenceDefinition): DirectorSequenceDefinition {
  const id = `${sequence.id}_copy_${Date.now().toString(36)}`;
  return JSON.parse(JSON.stringify({
    ...sequence,
    id,
    title: `${sequence.title} / Copy`,
    source: 'custom',
    published: false,
    updatedAt: new Date().toISOString()
  })) as DirectorSequenceDefinition;
}

function safeValue(value: unknown): DirectorValue | undefined {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  return undefined;
}

function safeConditions(value: unknown): DirectorCondition[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const conditions = value
    .filter((entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === 'object'))
    .map((entry) => {
      const variable = typeof entry.variable === 'string' ? entry.variable.trim() : '';
      const operator = typeof entry.operator === 'string' && ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'truthy', 'falsy'].includes(entry.operator)
        ? entry.operator as DirectorCondition['operator']
        : null;
      const normalizedValue = safeValue(entry.value);
      if (!variable || !operator) return null;
      return { variable, operator, ...(normalizedValue !== undefined ? { value: normalizedValue } : {}) };
    })
    .filter((entry): entry is DirectorCondition => entry !== null);
  return conditions.length ? conditions : undefined;
}

function safeEffects(value: unknown): DirectorEffect[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const effects = value
    .filter((entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === 'object'))
    .map((entry) => {
      const operation = typeof entry.operation === 'string' && ['set', 'increment', 'decrement', 'toggle', 'emit'].includes(entry.operation)
        ? entry.operation as DirectorEffect['operation']
        : null;
      if (!operation) return null;
      const variable = typeof entry.variable === 'string' && entry.variable.trim() ? entry.variable.trim() : undefined;
      const normalizedValue = safeValue(entry.value);
      const eventName = typeof entry.eventName === 'string' && entry.eventName.trim() ? entry.eventName.trim() : undefined;
      const payload = entry.payload && typeof entry.payload === 'object'
        ? Object.fromEntries(
          Object.entries(entry.payload as Record<string, unknown>)
            .map(([key, payloadValue]) => [key, safeValue(payloadValue)] as const)
            .filter((payloadEntry): payloadEntry is readonly [string, DirectorValue] => payloadEntry[1] !== undefined)
        )
        : undefined;
      if (operation === 'emit' && !eventName) return null;
      if (operation !== 'emit' && !variable) return null;
      return {
        operation,
        ...(variable ? { variable } : {}),
        ...(normalizedValue !== undefined ? { value: normalizedValue } : {}),
        ...(eventName ? { eventName } : {}),
        ...(payload && Object.keys(payload).length ? { payload } : {})
      };
    })
    .filter((entry): entry is DirectorEffect => entry !== null);
  return effects.length ? effects : undefined;
}

export function sanitizeDirectorSequence(input: unknown): DirectorSequenceDefinition | null {
  if (!input || typeof input !== 'object') return null;
  const source = input as Record<string, unknown>;
  if (typeof source.id !== 'string' || typeof source.title !== 'string' || !Array.isArray(source.nodes)) return null;

  const nodes = source.nodes
    .filter((node): node is Record<string, unknown> => Boolean(node && typeof node === 'object'))
    .map((node) => {
      const common = {
        id: String(node.id ?? `node_${Math.random().toString(36).slice(2, 7)}`),
        kind: String(node.kind ?? 'line'),
        label: typeof node.label === 'string' ? node.label : undefined,
        nextId: typeof node.nextId === 'string' ? node.nextId : undefined,
        conditions: safeConditions(node.conditions),
        effects: safeEffects(node.effects)
      };

      if (common.kind === 'choice') {
        return {
          ...common,
          kind: 'choice' as const,
          prompt: normalizeLocalizedText(node.prompt, 'Select an option.'),
          options: Array.isArray(node.options)
            ? node.options
              .filter((option): option is Record<string, unknown> => Boolean(option && typeof option === 'object'))
              .map((option) => ({
                id: String(option.id ?? `option_${Math.random().toString(36).slice(2, 7)}`),
                label: normalizeLocalizedText(option.label, 'Option'),
                description: option.description ? normalizeLocalizedText(option.description) : undefined,
                nextId: String(option.nextId ?? ''),
                conditions: safeConditions(option.conditions),
                effects: safeEffects(option.effects)
              }))
            : []
        };
      }
      if (common.kind === 'interrupt') {
        return {
          ...common,
          kind: 'interrupt' as const,
          sequenceId: String(node.sequenceId ?? ''),
          resumeMode: node.resumeMode === 'replace' ? 'replace' as const : 'resume' as const,
          banner: node.banner ? normalizeLocalizedText(node.banner) : undefined
        };
      }
      if (common.kind === 'event') {
        return {
          ...common,
          kind: 'event' as const,
          eventName: String(node.eventName ?? 'director:custom-event'),
          payload: node.payload && typeof node.payload === 'object'
            ? Object.fromEntries(
              Object.entries(node.payload as Record<string, unknown>)
                .map(([key, value]) => [key, safeValue(value)] as const)
                .filter((entry): entry is readonly [string, DirectorValue] => entry[1] !== undefined)
            )
            : undefined
        };
      }
      if (common.kind === 'delay') {
        return {
          ...common,
          kind: 'delay' as const,
          durationMs: Math.max(0, Number(node.durationMs ?? 1000)),
          message: node.message ? normalizeLocalizedText(node.message) : undefined
        };
      }
      if (common.kind === 'jump') return { ...common, kind: 'jump' as const, targetId: String(node.targetId ?? '') };
      if (common.kind === 'end') {
        return {
          ...common,
          kind: 'end' as const,
          outcomeId: typeof node.outcomeId === 'string' ? node.outcomeId : undefined,
          title: node.title ? normalizeLocalizedText(node.title) : undefined,
          summary: node.summary ? normalizeLocalizedText(node.summary) : undefined
        };
      }
      return {
        ...common,
        kind: 'line' as const,
        speaker: String(node.speaker ?? 'snake'),
        speakerId: typeof node.speakerId === 'string' ? node.speakerId : undefined,
        text: normalizeLocalizedText(node.text, '...'),
        emotion: typeof node.emotion === 'string' ? node.emotion as 'neutral' : 'neutral',
        portraitExpression: typeof node.portraitExpression === 'string' ? node.portraitExpression : undefined,
        audioSource: typeof node.audioSource === 'string' ? node.audioSource : undefined,
        durationMs: Math.max(300, Number(node.durationMs ?? 2500)),
        interruptible: node.interruptible !== false,
        cameraCue: typeof node.cameraCue === 'string' ? node.cameraCue as 'static' : 'static'
      };
    });

  const initialVariables = source.initialVariables && typeof source.initialVariables === 'object'
    ? Object.fromEntries(
      Object.entries(source.initialVariables as Record<string, unknown>)
        .map(([key, value]) => [key, safeValue(value)] as const)
        .filter((entry): entry is readonly [string, DirectorValue] => entry[1] !== undefined)
    )
    : {};

  return {
    schemaVersion: 1,
    id: source.id,
    title: source.title,
    description: typeof source.description === 'string' ? source.description : '',
    era: (source.era as EraId) ?? 'mgs1',
    entryNodeId: typeof source.entryNodeId === 'string' ? source.entryNodeId : nodes[0]?.id ?? '',
    contexts: Array.isArray(source.contexts)
      ? source.contexts.filter((context): context is DirectorContext => ['standalone', 'codec', 'campaign', 'sideops', 'vr'].includes(String(context)))
      : ['standalone'],
    tags: Array.isArray(source.tags) ? source.tags.map(String) : [],
    initialVariables,
    nodes,
    published: Boolean(source.published),
    updatedAt: new Date().toISOString(),
    source: 'custom'
  };
}

export function conversationToDirectorSequence(conversation: ConversationDefinition): DirectorSequenceDefinition {
  const lineNodes = conversation.lines.map((line, index) => ({
    id: `line_${index + 1}`,
    kind: 'line' as const,
    speaker: line.speaker,
    text: line.localizedText ?? { en: line.text },
    emotion: line.emotion,
    portraitExpression: line.portraitExpression,
    audioSource: line.audioSource,
    cameraCue: 'static' as const,
    durationMs: Math.max(600, (line.endMs ?? 2500) - (line.startMs ?? 0)),
    nextId: index < conversation.lines.length - 1 ? `line_${index + 2}` : 'end_1'
  }));

  return {
    schemaVersion: 1,
    id: `director_${conversation.id}_${Date.now().toString(36)}`,
    title: `${conversation.title} / Director`,
    description: `Director sequence converted from ${conversation.id}.`,
    era: conversation.era,
    entryNodeId: lineNodes[0]?.id ?? 'end_1',
    contexts: ['standalone', 'codec'],
    tags: ['conversation-import', conversation.trigger],
    initialVariables: {},
    source: 'custom',
    published: false,
    updatedAt: new Date().toISOString(),
    nodes: [
      ...lineNodes,
      {
        id: 'end_1',
        kind: 'end',
        outcomeId: `${conversation.id}_complete`,
        title: { en: 'Transmission complete', fr: 'Transmission terminée' }
      }
    ]
  };
}
