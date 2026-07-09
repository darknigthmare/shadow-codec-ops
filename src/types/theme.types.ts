export type ThemeId =
  | 'classic_mgs1'
  | 'msx_terminal'
  | 'mgs2_digital'
  | 'mgs3_radio'
  | 'mgs4_modern'
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
  pixelPerfect: true
};
