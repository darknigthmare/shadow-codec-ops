import type { ConversationTrigger } from '../../types/codec.types';
import type { VrRunStats } from '../../types/vr.types';

export const GAME_EVENT = {
  REQUEST_CODEC_CALL: 'sideops:request-codec-call',
  MISSION_COMPLETE: 'sideops:mission-complete',
  OBJECTIVE: 'sideops:objective',
  ALERT: 'sideops:alert',
  HUD_UPDATE: 'sideops:hud-update',
  MISSION_RESTART: 'sideops:mission-restart',
  CODEC_RESUME: 'sideops:codec-resume',
  VR_HUD_UPDATE: 'vr:run-hud-update',
  VR_RUN_COMPLETE: 'vr:run-complete',
  DIRECTOR_DIRECTIVE: 'sideops:director-directive'
} as const;


export interface DirectorDirectivePayload {
  sequenceId: string;
  eventName: string;
  support?: string;
}

export interface CodecRequestPayload {
  trigger: ConversationTrigger;
  contactId: string;
  conversationId: string;
  message: string;
  pauseGame?: boolean;
}

export interface MissionHudPayload {
  missionId: string;
  missionTitle: string;
  bossName: string;
  health: number;
  maxHealth: number;
  ammo: number;
  maxAmmo: number;
  rations: number;
  chaff: number;
  hasKeycard: boolean;
  alertState: string;
  suspicion: number;
  stealthScore: number;
  reinforcementCount: number;
  activeEnemies: number;
  lastAlertSource: string;
  alerts: number;
  shotsFired: number;
  kills: number;
  neutralizations: number;
  camerasDisabled: number;
  objective: string;
  objectiveStage: string;
  objectivesCompleted: number;
  totalObjectives: number;
  secretsFound: number;
  totalSecrets: number;
  bossActive: boolean;
  bossDefeated: boolean;
  bossHealth: number;
  bossMaxHealth: number;
  chaffActive: boolean;
}

export interface MissionCompletePayload {
  missionId: string;
  missionTitle: string;
  bossName: string;
  success: boolean;
  outcome: string;
  rankPreview: string;
  alerts: number;
  timeSeconds: number;
  shotsFired: number;
  kills: number;
  neutralizations: number;
  rationsUsed: number;
  damageTaken: number;
  camerasDisabled: number;
  objectivesCompleted: number;
  totalObjectives: number;
  secretsFound: number;
  totalSecrets: number;
  bossDefeated: boolean;
  noAlert: boolean;
  noKill: boolean;
  stealthScore: number;
  reinforcementCount: number;
}



export interface VrRunGamePayload {
  missionId: string;
  missionTitle: string;
  stats: VrRunStats;
  status: 'standby' | 'running' | 'clear' | 'failed' | 'aborted';
  message: string;
}

export interface AlertEventPayload {
  missionId: string;
  missionTitle: string;
  level: string;
  alerts: number;
  source: string;
  message: string;
  timeSeconds: number;
  suspicion: number;
  stealthScore: number;
}

export const gameEvents = new EventTarget();

export function emitGameEvent<T>(name: string, detail: T): void {
  gameEvents.dispatchEvent(new CustomEvent<T>(name, { detail }));
}

export function onGameEvent<T>(name: string, handler: (detail: T) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<T>).detail);
  gameEvents.addEventListener(name, listener);
  return () => gameEvents.removeEventListener(name, listener);
}
