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
  | 'ai_anomaly'
  | 'bomb_specialist'
  | 'operations_officer'
  | 'intelligence_officer'
  | 'scientist'
  | 'pilot'
  | 'ai_construct';

export type ContactAvailability = 'available' | 'locked' | 'conditional' | 'jammed' | 'dead' | 'unknown';

export type CodecCanonStatus = 'canon' | 'simulation' | 'custom';
export type CodecSourceQuality = 'official_manual' | 'in_game_reference' | 'secondary_reference' | 'simulation_design';
export type ContactFrequencyKind =
  | 'canonical_frequency'
  | 'save_frequency'
  | 'shared_frequency'
  | 'incoming_only'
  | 'network_channel'
  | 'briefing_channel'
  | 'idroid_channel'
  | 'simulation_channel';


export interface CodecCanonCoverageEntry {
  era: EraId;
  status: 'foundation' | 'expanded' | 'strong' | 'simulation';
  contactCount: number;
  contextCount: number;
  conversationCount: number;
  channelPolicy: string;
  coverageFocus: string[];
  remainingGaps: string[];
}

export interface CodecCanonSourceDefinition {
  id: string;
  title: string;
  publisher: string;
  quality: CodecSourceQuality;
  url?: string;
  notes: string;
}

export interface ContactFrequencyDefinition {
  frequency: number;
  label: string;
  kind: ContactFrequencyKind;
  canonical: boolean;
  subjectId?: string;
  contextIds?: string[];
  sourceId?: string;
  notes?: string;
}


export type CodecCallDisposition = 'completed' | 'aborted' | 'ignored' | 'missed' | 'failed';
export type CodecContactAccess = 'available' | 'locked' | 'incoming_only' | 'jammed' | 'dead' | 'unknown';
export type CodecCallPriority = 'routine' | 'priority' | 'urgent';

export interface EraDefinition {
  id: EraId;
  name: string;
  visualStyle: CodecVisualStyle;
  codecType: 'classic_frequency' | 'radio_frequency' | 'secure_video' | 'briefing_files' | 'cassette' | 'idroid' | 'simulation' | 'corrupted';
  defaultFrequency: number;
  description: string;
  availableModes: string[];
  dataLayer?: string;
  channelPolicy?: string;
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
  manualCallAllowed?: boolean;
  incomingCallAllowed?: boolean;
  sharedFrequencyPriority?: number;
  gameTitle?: string;
  timelineYear?: number;
  canonStatus?: CodecCanonStatus;
  aliases?: string[];
  personId?: string;
  frequencyKind?: ContactFrequencyKind;
  frequencyLabel?: string;
  frequencyVariants?: ContactFrequencyDefinition[];
  sourceIds?: string[];
  availabilityNotes?: string;
  channelNotes?: string;
}

export interface CodecPlayerDefinition {
  id: string;
  name: string;
  initials: string;
  portraitId?: string;
}

export interface CodecContextDefinition {
  id: string;
  era: EraId;
  name: string;
  chapterId: string;
  missionId?: string;
  description: string;
  flags: string[];
  players: CodecPlayerDefinition[];
  defaultPlayerId: string;
  unlockedContactIds: string[];
  blockedContactIds?: string[];
}

export interface CodecRuntimeContext {
  contextId: string;
  era: EraId;
  chapterId: string;
  missionId?: string;
  playerId: string;
  flags: string[];
}

export interface CodecContactRuleDefinition {
  contactId: string;
  contextIds?: string[];
  excludedContextIds?: string[];
  requiredFlags?: string[];
  forbiddenFlags?: string[];
  manualCall?: 'allow' | 'deny' | 'memory';
  incomingCall?: 'allow' | 'deny';
  sharedFrequencyPriority?: number;
  subjectIds?: string[];
}

export interface CodecContactAvailabilityResult {
  access: CodecContactAccess;
  reason: string;
  manualCallable: boolean;
  incomingCallable: boolean;
  visibleInMemory: boolean;
}

export interface CodecCallTopic {
  id: string;
  label: string;
  description: string;
  trigger: ConversationTrigger;
  conversationId?: string;
  saveAction?: boolean;
  frequencyOverride?: number;
  frequencyLabel?: string;
}

export interface IncomingCallRequest {
  id: string;
  contactId: string;
  conversationId?: string;
  priority: CodecCallPriority;
  required: boolean;
  createdAt: string;
  expiresAt: string;
  sourceLabel?: string;
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
  subjectId?: string;
  topicLabel?: string;
  topicDescription?: string;
  contextIds?: string[];
  priority?: number;
  canonStatus?: CodecCanonStatus;
  loreBasis?: 'verbatim_reference' | 'paraphrased_reference' | 'original_lore_grounded' | 'custom';
  sourceIds?: string[];
}


export type RadioSignalKind =
  | 'secret_contact'
  | 'interception'
  | 'encrypted_packet'
  | 'numbers_station'
  | 'distress_beacon'
  | 'anomaly'
  | 'decoy'
  | 'network_burst';

export type RadioPuzzleType = 'codeword' | 'frequency_sequence' | 'checksum' | 'context_key';
export type RadioDiscoveryStatus = 'discovered' | 'intercepted' | 'decoded';

export interface RadioLocalizedText {
  en: string;
  fr?: string;
  ja?: string;
}

export interface RadioSignalPuzzle {
  type: RadioPuzzleType;
  prompt: RadioLocalizedText;
  hint: RadioLocalizedText;
  answer: string;
  attemptsLimit?: number;
}

export interface RadioSignalReward {
  intelPoints?: number;
  unlockContactId?: string;
  unlockConversationId?: string;
  badgeId?: string;
}

export interface RadioSignalDefinition {
  id: string;
  era: EraId;
  label: string;
  codename?: string;
  frequency: number;
  bandwidth: number;
  strength: number;
  kind: RadioSignalKind;
  canonStatus: CodecCanonStatus;
  contextIds?: string[];
  requiredFlags?: string[];
  forbiddenFlags?: string[];
  contactId?: string;
  conversationId?: string;
  intermittent?: boolean;
  frequencyDrift?: number;
  hiddenUntilDiscovered?: boolean;
  encrypted?: boolean;
  transcript?: RadioLocalizedText;
  puzzle?: RadioSignalPuzzle;
  reward?: RadioSignalReward;
  sourceIds?: string[];
  notes?: string;
}

export interface RadioCarrierDefinition {
  id: string;
  era: EraId;
  label: string;
  frequency: number;
  bandwidth: number;
  strength: number;
  kind: 'contact' | RadioSignalKind;
  canonStatus: CodecCanonStatus;
  contactId?: string;
  signalId?: string;
  conversationId?: string;
  hidden: boolean;
  encrypted: boolean;
  intermittent?: boolean;
  frequencyDrift?: number;
}

export interface RadioSignalHit {
  carrier: RadioCarrierDefinition;
  strength: number;
  offset: number;
  locked: boolean;
}

export interface RadioSpectrumPoint {
  frequency: number;
  strength: number;
  sourceIds: string[];
  classified: boolean;
}

export interface RadioIntelDiscovery {
  signalId: string;
  status: RadioDiscoveryStatus;
  discoveredAt: string;
  updatedAt: string;
  contextId: string;
  frequency: number;
  attempts: number;
  note?: string;
}

export interface RadioIntelState {
  schemaVersion: 1;
  discoveries: Record<string, RadioIntelDiscovery>;
  intelPoints: number;
  scanCount: number;
  interceptedCount: number;
  decodedCount: number;
  lastFrequencyByEra: Partial<Record<EraId, number>>;
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
  contacts?: ContactDefinition[];
  ambiguous?: boolean;
  distance?: number;
  matchedVariant?: ContactFrequencyDefinition;
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
  disposition?: CodecCallDisposition;
  subjectId?: string;
  priority?: CodecCallPriority;
}
