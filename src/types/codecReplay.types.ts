import type { CodecRuntimeContext, ContactDefinition, ConversationDefinition, EraId } from './codec.types';

export interface CodecReplayRecord {
  id: string;
  createdAt: string;
  completedAt: string;
  era: EraId;
  themeId: string;
  frequency: number;
  context: CodecRuntimeContext;
  contact: Pick<ContactDefinition, 'id' | 'name' | 'codename' | 'role' | 'portrait' | 'era'>;
  conversation: ConversationDefinition;
  subjectId?: string;
  durationMs: number;
  completed: boolean;
  tags: string[];
}

export interface CodecReplayLibraryState {
  schemaVersion: 1;
  records: CodecReplayRecord[];
  autoArchive: boolean;
}

export interface CodecCaptureState {
  recording: boolean;
  startedAt?: number;
  mimeType?: string;
}
