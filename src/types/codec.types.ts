export type EraId =
  | 'msx'
  | 'mgs1'
  | 'mgs2'
  | 'mgs3'
  | 'mgs4'
  | 'peace_walker'
  | 'mgsv'
  | 'vr_simulation'
  | 'patriots_ai';

export type CodecVisualStyle =
  | 'msx_terminal'
  | 'classic_mgs1'
  | 'mgs2_digital'
  | 'mgs3_radio'
  | 'mgs4_modern'
  | 'mgsv_idroid'
  | 'vr_training'
  | 'patriots_glitch';

export type ContactRole =
  | 'mission_commander'
  | 'save_contact'
  | 'technical_support'
  | 'medical_support'
  | 'weapon_specialist'
  | 'survival_mentor'
  | 'field_contact'
  | 'secret_contact'
  | 'ai_anomaly';

export type ContactAvailability = 'available' | 'locked' | 'conditional' | 'jammed' | 'dead' | 'unknown';

export interface EraDefinition {
  id: EraId;
  name: string;
  visualStyle: CodecVisualStyle;
  codecType: 'classic_frequency' | 'radio_frequency' | 'cassette' | 'idroid' | 'simulation' | 'corrupted';
  defaultFrequency: number;
  description: string;
  availableModes: string[];
}

export interface ContactDefinition {
  id: string;
  name: string;
  codename?: string;
  era: EraId;
  frequency: number;
  role: ContactRole;
  availability: ContactAvailability;
  portrait: string;
  defaultConversation: string;
  specialties: string[];
  unlockedByDefault: boolean;
  isSecret: boolean;
  description: string;
}

export type ConversationTrigger =
  | 'manual_call'
  | 'incoming_call'
  | 'mission_start'
  | 'first_alert'
  | 'low_health'
  | 'keycard_found'
  | 'boss_intro'
  | 'boss_midfight'
  | 'boss_defeated'
  | 'mission_complete'
  | 'suspicion'
  | 'evasion'
  | 'caution'
  | 'reinforcement'
  | 'camera_detected'
  | 'searchlight_detected'
  | 'secret_frequency'
  | 'save_request';

export interface ConversationLine {
  speaker: string;
  text: string;
  localizedText?: { en: string; fr?: string; ja?: string };
  startMs?: number;
  endMs?: number;
  audioSource?: string;
  portraitExpression?: string;
  emotion?: 'neutral' | 'serious' | 'warning' | 'calm' | 'glitch' | 'humor';
  speed?: 'slow' | 'normal' | 'fast';
  glitchLevel?: number;
}

export interface ConversationDefinition {
  id: string;
  era: EraId;
  title: string;
  contactId: string;
  frequency: number;
  trigger: ConversationTrigger;
  canReplay: boolean;
  lines: ConversationLine[];
}

export type CodecState =
  | 'idle'
  | 'tuning'
  | 'calling'
  | 'connected'
  | 'no_response'
  | 'incoming_call'
  | 'memory_open'
  | 'dialogue_playing'
  | 'call_ended'
  | 'signal_jammed';

export type SignalStatus = 'stable' | 'weak' | 'jammed' | 'encrypted' | 'unknown' | 'patriots_corrupt' | 'none';

export interface SignalScanResult {
  status: SignalStatus;
  label: string;
  contact?: ContactDefinition;
  distance?: number;
}

export interface CallHistoryEntry {
  callId: string;
  contactId?: string;
  contactName?: string;
  frequency: number;
  era: EraId;
  conversationId?: string;
  title: string;
  timestamp: string;
  source: ConversationTrigger;
  completed: boolean;
}
