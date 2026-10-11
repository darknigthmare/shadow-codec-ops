import type { EraId } from './codec.types';

export type TapeCategory = 'mission' | 'intel' | 'character' | 'mother_base' | 'weapon' | 'anomaly';
export type TapeUnlockState = 'unlocked' | 'locked' | 'conditional';

export interface TapeTranscriptLine {
  time: number;
  speaker: string;
  text: string;
  tag?: 'briefing' | 'warning' | 'analysis' | 'memory' | 'glitch';
}

export interface TapeDefinition {
  id: string;
  title: string;
  subtitle: string;
  era: EraId;
  visualPack: string;
  category: TapeCategory;
  duration: number;
  speakers: string[];
  location: string;
  relatedMission?: string;
  relatedConversation?: string;
  unlockState: TapeUnlockState;
  importance: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  tags: string[];
  transcript: TapeTranscriptLine[];
}

export interface TapeProgressRecord {
  tapeId: string;
  currentTime: number;
  listened: boolean;
  listenCount: number;
  lastPlayedAt?: string;
  note?: string;
}

export interface TapePlaybackSnapshot {
  activeTapeId: string;
  currentTime: number;
  isPlaying: boolean;
}

export interface TapeArchiveState {
  favorites: string[];
  progress: TapeProgressRecord[];
  history: string[];
}
