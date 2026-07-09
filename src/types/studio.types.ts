import type { ConversationDefinition, ConversationTrigger } from './codec.types';

export type StudioRecordSource = 'built_in' | 'custom';

export interface StudioConversationRecord extends ConversationDefinition {
  source?: StudioRecordSource;
  updatedAt?: string;
}

export type StudioTriggerPriority = 'normal' | 'urgent' | 'secret';

export interface StudioTriggerOverride {
  id: string;
  missionId: string;
  trigger: ConversationTrigger;
  contactId: string;
  conversationId: string;
  priority: StudioTriggerPriority;
  pauseGame: boolean;
  enabled: boolean;
  updatedAt: string;
  notes?: string;
}
