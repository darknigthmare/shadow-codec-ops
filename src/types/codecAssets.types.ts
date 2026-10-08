import type { EraId } from './codec.types';

export type CodecUiCue = 'tune' | 'connect' | 'disconnect' | 'incoming' | 'no_response' | 'confirm' | 'error' | 'memory';
export type CodecAmbienceKind = 'digital_hum' | 'crt_static' | 'field_radio' | 'secure_network' | 'tape_hiss' | 'idroid_pulse' | 'vr_tone' | 'corrupt_noise';

export interface CodecAssetPackDefinition {
  id: string;
  era: EraId;
  name: string;
  description: string;
  portraitStyle: string;
  ambience: CodecAmbienceKind;
  uiProfile: '8bit' | 'codec' | 'digital' | 'analog' | 'secure' | 'briefing' | 'idroid' | 'vr' | 'corrupt';
  builtInPortraits: { player: string; contact: string };
  expressionSupport: string[];
  includedAssets: string[];
  missingRecommendedAssets: string[];
}
