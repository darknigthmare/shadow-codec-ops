import type { ConversationTrigger, EraId } from './codec.types';

export type MissionMode = 'side_scroller' | 'top_down' | 'vr' | 'boss_rush' | 'hybrid';

export interface MissionObjective {
  id: string;
  label: string;
  completedByDefault: boolean;
}

export interface MissionCodecTrigger {
  trigger: ConversationTrigger;
  contactId: string;
  conversationId: string;
  priority: 'normal' | 'urgent' | 'secret';
  pauseGame: boolean;
}

export interface MissionDefinition {
  id: string;
  title: string;
  era: EraId;
  mode: MissionMode;
  location: string;
  mainCharacter: string;
  difficulty: number;
  mapKey: string;
  briefingConversation: string;
  debriefingConversation: string;
  objectives: MissionObjective[];
  availableItems: string[];
  enemies: string[];
  boss?: string;
  codecTriggers: MissionCodecTrigger[];
}
