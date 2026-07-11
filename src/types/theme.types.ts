import type { KeyboardBindings } from './accessibility.types';
import { defaultKeyboardBindings } from './accessibility.types';
import type { AppLocale } from './narrative.types';
export type ThemeId =
  | 'classic_mgs1'
  | 'msx_terminal'
  | 'mgs2_digital'
  | 'mgs3_radio'
  | 'mgs4_modern'
  | 'peace_walker_msf'
  | 'mgsv_idroid'
  | 'vr_training'
  | 'patriots_glitch';

export interface UserSettings {
  selectedEra: string;
  selectedTheme: string;
  scanlines: boolean;
  crtGlow: boolean;
  noise: boolean;
  fastText: boolean;
  autoAdvance: boolean;
  radioNoiseVolume: number;
  uiBeepVolume: number;
  classicCodecPausesGame: boolean;
  pixelPerfect: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  reduceFlashes: boolean;
  screenReaderAnnouncements: boolean;
  gamepadEnabled: boolean;
  gamepadVibration: boolean;
  keyboardBindings: KeyboardBindings;
  touchControlsMode: 'auto' | 'always' | 'off';
  touchControlScale: number;
  touchControlOpacity: number;
  touchHaptics: boolean;
  locale: AppLocale;
  subtitlesEnabled: boolean;
  narrativeAudioEnabled: boolean;
  narrativeAudioVolume: number;
  portraitExpressions: boolean;
  portraitAnimationEnabled: boolean;
  voicePackEnabled: boolean;
  builtInPortraitsEnabled: boolean;
  eraUiAudioEnabled: boolean;
  codecAmbienceEnabled: boolean;
  codecAmbienceVolume: number;
}

export interface ThemePackDefinition {
  id: ThemeId;
  name: string;
  era: string;
  codecType: string;
  primary: string;
  background: string;
  accent: string;
  mood: string;
  layout: string;
  effects: string[];
  description: string;
}

export const defaultSettings: UserSettings = {
  selectedEra: 'mgs1',
  selectedTheme: 'classic_mgs1',
  scanlines: true,
  crtGlow: true,
  noise: true,
  fastText: false,
  autoAdvance: false,
  radioNoiseVolume: 0.35,
  uiBeepVolume: 0.45,
  classicCodecPausesGame: true,
  pixelPerfect: true,
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  reduceFlashes: false,
  screenReaderAnnouncements: true,
  gamepadEnabled: true,
  gamepadVibration: true,
  keyboardBindings: { ...defaultKeyboardBindings },
  touchControlsMode: 'auto',
  touchControlScale: 1,
  touchControlOpacity: 0.82,
  touchHaptics: true,
  locale: 'en',
  subtitlesEnabled: true,
  narrativeAudioEnabled: true,
  narrativeAudioVolume: 0.65,
  portraitExpressions: true,
  portraitAnimationEnabled: true,
  voicePackEnabled: true,
  builtInPortraitsEnabled: true,
  eraUiAudioEnabled: true,
  codecAmbienceEnabled: true,
  codecAmbienceVolume: 0.28
};
