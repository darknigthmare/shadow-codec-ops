import type { ContactDefinition, ConversationDefinition, ConversationTrigger, EraId } from '../types/codec.types';
import type { StudioConversationRecord, StudioTriggerOverride } from '../types/studio.types';
import { loadJson, saveJson } from './saveEngine';

export const STUDIO_CUSTOM_CONVERSATIONS_KEY = 'studio-custom-conversations';
export const STUDIO_TRIGGER_OVERRIDES_KEY = 'studio-trigger-overrides';

const DEFAULT_LINE: Record<string, unknown> = {
  speaker: 'snake',
  text: '...',
  emotion: 'neutral',
  speed: 'normal',
  glitchLevel: 0
};

export function loadCustomConversations(): StudioConversationRecord[] {
  return loadJson<StudioConversationRecord[]>(STUDIO_CUSTOM_CONVERSATIONS_KEY, []);
}

export function saveCustomConversations(conversations: StudioConversationRecord[]): void {
  saveJson(STUDIO_CUSTOM_CONVERSATIONS_KEY, conversations);
}

export function loadTriggerOverrides(): StudioTriggerOverride[] {
  return loadJson<StudioTriggerOverride[]>(STUDIO_TRIGGER_OVERRIDES_KEY, []);
}

export function saveTriggerOverrides(overrides: StudioTriggerOverride[]): void {
  saveJson(STUDIO_TRIGGER_OVERRIDES_KEY, overrides);
}

export function createStudioConversationId(prefix = 'custom_codec'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function makeBlankConversation(
  era: EraId,
  contact: ContactDefinition,
  trigger: ConversationTrigger = 'manual_call'
): StudioConversationRecord {
  return {
    id: createStudioConversationId(),
    source: 'custom',
    updatedAt: new Date().toISOString(),
    era,
    title: 'New Codec Transmission',
    contactId: contact.id,
    frequency: contact.frequency,
    trigger,
    canReplay: true,
    lines: [
      {
        speaker: contact.codename?.toLowerCase().replace(/\s+/g, '_') ?? contact.id.split('_')[0],
        text: 'Snake, this is a custom Codec transmission.',
        emotion: 'neutral',
        speed: 'normal',
        glitchLevel: 0
      },
      {
        speaker: 'snake',
        text: 'Copy. Add the next instruction in the Studio.',
        emotion: 'neutral',
        speed: 'normal',
        glitchLevel: 0
      }
    ]
  };
}

export function cloneBuiltInConversation(conversation: ConversationDefinition): StudioConversationRecord {
  return {
    ...conversation,
    id: createStudioConversationId(`${conversation.id}_edit`),
    title: `${conversation.title} / Studio Edit`,
    source: 'custom',
    updatedAt: new Date().toISOString(),
    lines: conversation.lines.map((line) => ({ ...line }))
  };
}

export function mergeStudioConversations(
  builtInConversations: ConversationDefinition[],
  customConversations: StudioConversationRecord[] = loadCustomConversations()
): StudioConversationRecord[] {
  const builtIns: StudioConversationRecord[] = builtInConversations.map((conversation) => ({
    ...conversation,
    source: 'built_in'
  }));
  return [...customConversations, ...builtIns];
}

export function findOverrideForTrigger(
  missionId: string,
  trigger: ConversationTrigger,
  overrides: StudioTriggerOverride[] = loadTriggerOverrides()
): StudioTriggerOverride | undefined {
  return overrides.find((override) => override.enabled && override.missionId === missionId && override.trigger === trigger);
}

export function applyStudioTriggerOverride<T extends { trigger: ConversationTrigger; contactId: string; conversationId: string }>(
  missionId: string,
  payload: T,
  overrides: StudioTriggerOverride[] = loadTriggerOverrides()
): T {
  const override = findOverrideForTrigger(missionId, payload.trigger, overrides);
  if (!override) return payload;
  return {
    ...payload,
    contactId: override.contactId,
    conversationId: override.conversationId
  };
}

export function sanitizeImportedConversation(value: unknown, fallbackContact: ContactDefinition): StudioConversationRecord | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<StudioConversationRecord>;
  if (!candidate.title || !Array.isArray(candidate.lines)) return null;
  return {
    id: typeof candidate.id === 'string' && candidate.id.length > 0 ? candidate.id : createStudioConversationId(),
    source: 'custom',
    updatedAt: new Date().toISOString(),
    era: (candidate.era as EraId) ?? fallbackContact.era,
    title: String(candidate.title),
    contactId: typeof candidate.contactId === 'string' ? candidate.contactId : fallbackContact.id,
    frequency: typeof candidate.frequency === 'number' ? candidate.frequency : fallbackContact.frequency,
    trigger: (candidate.trigger as ConversationTrigger) ?? 'manual_call',
    canReplay: candidate.canReplay ?? true,
    lines: candidate.lines.length > 0
      ? candidate.lines.map((line) => {
        const safeLine = line && typeof line === 'object' ? line as unknown as Record<string, unknown> : DEFAULT_LINE;
        return {
          speaker: typeof safeLine.speaker === 'string' ? safeLine.speaker : 'snake',
          text: typeof safeLine.text === 'string' ? safeLine.text : '...',
          emotion: typeof safeLine.emotion === 'string' ? safeLine.emotion as StudioConversationRecord['lines'][number]['emotion'] : 'neutral',
          speed: typeof safeLine.speed === 'string' ? safeLine.speed as StudioConversationRecord['lines'][number]['speed'] : 'normal',
          glitchLevel: typeof safeLine.glitchLevel === 'number' ? safeLine.glitchLevel : 0
        };
      })
      : [{ speaker: 'snake', text: '...', emotion: 'neutral', speed: 'normal', glitchLevel: 0 }]
  };
}
