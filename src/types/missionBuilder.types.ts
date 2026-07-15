import type { ConversationTrigger, EraId } from './codec.types';
import type { MissionCodecTrigger, MissionDefinition, MissionObjective } from './mission.types';

export type BuilderEnvironment = 'dock' | 'tanker' | 'jungle' | 'facility' | 'vr';

export type MissionEntityKind =
  | 'player_start'
  | 'platform'
  | 'crate'
  | 'guard'
  | 'reinforcement'
  | 'keycard'
  | 'door'
  | 'camera'
  | 'searchlight'
  | 'elevator'
  | 'pickup_ration'
  | 'pickup_chaff'
  | 'pickup_ammo'
  | 'secret'
  | 'boss';

export interface MissionBuilderEntity {
  id: string;
  kind: MissionEntityKind;
  x: number;
  y: number;
  label?: string;
  scaleX?: number;
  patrolMin?: number;
  patrolMax?: number;
  hp?: number;
}

export interface MissionBuilderDocument {
  schemaVersion: 1;
  id: string;
  title: string;
  description: string;
  author: string;
  era: EraId;
  environment: BuilderEnvironment;
  location: string;
  mainCharacter: string;
  difficulty: number;
  worldWidth: number;
  startAmmo: number;
  startRations: number;
  startChaff: number;
  published: boolean;
  objectives: MissionObjective[];
  codecTriggers: MissionCodecTrigger[];
  entities: MissionBuilderEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface MissionContentPackManifest {
  schemaVersion: 1;
  packId: string;
  name: string;
  version: string;
  author: string;
  description: string;
  exportedAt: string;
  missions: MissionBuilderDocument[];
  dependencies: {
    contacts: string[];
    conversations: string[];
    items: string[];
    enemies: string[];
    bosses: string[];
  };
}

export type MissionBuilderIssueSeverity = 'error' | 'warning' | 'info';

export interface MissionBuilderValidationIssue {
  id: string;
  severity: MissionBuilderIssueSeverity;
  message: string;
  entityId?: string;
}

export interface RuntimeCodecCall {
  trigger: ConversationTrigger;
  contactId: string;
  conversationId: string;
  message: string;
  pauseGame: boolean;
}

export type RuntimeObjectiveStage = 'recover_keycard' | 'open_security_door' | 'cross_security_yard' | 'defeat_captain' | 'extract';
export type RuntimePickupKind = 'ration' | 'chaff' | 'ammo';
export type RuntimeGuardRole = 'patrol' | 'reinforcement';

export interface SideOpsMissionProfile {
  id: string;
  title: string;
  location: string;
  header: string;
  environment: BuilderEnvironment;
  worldWidth: number;
  groundColor: number;
  backdropColor: number;
  structureColor: number;
  start: { x: number; y: number };
  playerTexture: string;
  startAmmo: number;
  startRations: number;
  startChaff: number;
  initialObjectives: string[];
  totalObjectives: number;
  door: { x: number; y: number; label: string };
  camera: { x: number; y: number };
  searchlight: { x: number; y: number; sweep: number };
  elevator: { x: number; y: number; label: string };
  keycard: { x: number; y: number; label: string };
  boss: {
    name: string;
    x: number;
    y: number;
    hp: number;
    texture: string;
    tintPhaseOne: number;
    tintPhaseTwo: number;
  };
  guardTexture: string;
  reinforcementTexture: string;
  platforms: Array<{ x: number; y: number; scaleX: number }>;
  crates: Array<{ x: number; y: number }>;
  guards: Array<{ x: number; y: number; patrolMin: number; patrolMax: number; role: RuntimeGuardRole; hp?: number }>;
  pickups: Array<{ x: number; y: number; kind: RuntimePickupKind }>;
  secrets: Array<{ x: number; y: number; id: string; label: string }>;
  stageLabels: Record<RuntimeObjectiveStage, string>;
  completionX: { openDoor: number; crossYard: number; bossArena: number };
  codec: {
    missionStart: RuntimeCodecCall;
    keycardFound: RuntimeCodecCall;
    lowHealth: RuntimeCodecCall;
    missionFailed: RuntimeCodecCall;
    missionComplete: RuntimeCodecCall;
    manual: RuntimeCodecCall;
    chaff: RuntimeCodecCall;
    cameraDown: RuntimeCodecCall;
    cqc: RuntimeCodecCall;
    firstAlert: RuntimeCodecCall;
    suspicion: RuntimeCodecCall;
    evasion: RuntimeCodecCall;
    caution: RuntimeCodecCall;
    reinforcement: RuntimeCodecCall;
    cameraDetected: RuntimeCodecCall;
    searchlight: RuntimeCodecCall;
    bossIntro: RuntimeCodecCall;
    bossMidfight: RuntimeCodecCall;
    bossDefeated: RuntimeCodecCall;
    secret: RuntimeCodecCall;
  };
}

export interface MissionBuilderLibrary {
  schemaVersion: 1;
  activeDocumentId?: string;
  documents: MissionBuilderDocument[];
}

export interface MissionBuilderExportResult {
  fileName: string;
  payload: MissionContentPackManifest;
}

export type MissionDefinitionWithSource = MissionDefinition & {
  source: 'built_in' | 'builder';
  published?: boolean;
};
