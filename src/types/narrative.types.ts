import type { EraId } from './codec.types';

export type AppLocale = 'en' | 'fr';
export type NarrativeEmotion = 'neutral' | 'serious' | 'warning' | 'calm' | 'glitch' | 'humor';
export type CodecAudioProfile = 'msx' | 'mgs1' | 'mgs2' | 'mgs3' | 'mgs4' | 'mgsv' | 'vr' | 'patriots';

export interface LocalizedText {
  en: string;
  fr?: string;
  ja?: string;
}

export interface SubtitleCue {
  startMs: number;
  endMs: number;
  speaker: string;
  text: LocalizedText;
}

export interface NarrativeAudioDefinition {
  source?: string;
  profile?: CodecAudioProfile;
  gain?: number;
  loop?: boolean;
}

export interface PortraitExpressionDefinition {
  characterId: string;
  emotion: NarrativeEmotion;
  label: string;
  image?: string;
}

export interface NarrativeRuntimeContext {
  era: EraId;
  locale: AppLocale;
  audioProfile: CodecAudioProfile;
  subtitlesEnabled: boolean;
}
