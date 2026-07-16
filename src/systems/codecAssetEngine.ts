import packsJson from '../data/codecAssetPacks.json';
import mg1PortraitSetsJson from '../data/mg1PortraitSets.json';
import type { EraId } from '../types/codec.types';
import type { CodecAssetPackDefinition, CodecUiCue } from '../types/codecAssets.types';
import { resolveMgs1StoryVariant } from './mgs1ContentEngine';

export const codecAssetPacks = packsJson as CodecAssetPackDefinition[];
let audioContext: AudioContext | null = null;
let ambience: { nodes: AudioNode[]; stop: () => void } | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioContext) audioContext = new Ctor();
  return audioContext;
}

export function getCodecAssetPack(era: EraId): CodecAssetPackDefinition {
  return codecAssetPacks.find((pack) => pack.era === era) ?? codecAssetPacks[0];
}

export function getBuiltInPortrait(era: EraId, side: 'player' | 'contact'): string {
  return getCodecAssetPack(era).builtInPortraits[side];
}

interface CharacterPortraitSet {
  basePath: string;
  expressions: readonly string[];
}

export interface CharacterPortraitRoutingContext {
  contextId: string;
  flags: readonly string[];
}

interface Mg1PortraitSetDefinition {
  characterId: string;
  directory: string;
  aliases: string[];
  expressions: string[];
}

const standardPortraitExpressions = ['neutral', 'serious', 'warning', 'calm', 'glitch', 'humor'] as const;
const portraitSet = (basePath: string, expressions: readonly string[] = standardPortraitExpressions): CharacterPortraitSet => ({ basePath, expressions });

const mg1CharacterPortraitSets = Object.fromEntries(
  (mg1PortraitSetsJson as Mg1PortraitSetDefinition[]).flatMap(({ characterId, directory, aliases, expressions }) => {
    const set = portraitSet(`/portraits/msx/mg1/${directory}`, expressions);
    return [characterId, ...aliases].map((id) => [id, set]);
  })
) as Record<string, CharacterPortraitSet>;

const characterPortraitSets: Record<string, CharacterPortraitSet> = {
  ...mg1CharacterPortraitSets,
  solid_snake_mgs1: portraitSet('/portraits/mgs1/solid_snake'),
  campbell_mgs1: portraitSet('/portraits/mgs1/campbell'),
  mei_ling_mgs1: portraitSet('/portraits/mgs1/mei_ling'),
  naomi_mgs1: portraitSet('/portraits/mgs1/naomi'),
  otacon_mgs1: portraitSet('/portraits/mgs1/otacon'),
  nastasha_mgs1: portraitSet('/portraits/mgs1/nastasha'),
  miller_mgs1: portraitSet('/portraits/mgs1/miller'),
  meryl_mgs1: portraitSet('/portraits/mgs1/meryl'),
  deepthroat_mgs1: portraitSet('/portraits/mgs1/deepthroat'),
  houseman_mgs1: portraitSet('/portraits/mgs1/houseman'),
  sniper_wolf_mgs1: portraitSet('/portraits/mgs1/sniper_wolf'),
  solid_snake_mgs2: portraitSet('/portraits/mgs2/solid_snake'),
  raiden_mgs2: portraitSet('/portraits/mgs2/raiden'),
  otacon_mgs2: portraitSet('/portraits/mgs2/otacon', ['neutral', 'serious', 'warning', 'calm', 'humor', 'grief']),
  colonel_mgs2: portraitSet('/portraits/mgs2/colonel', ['neutral', 'serious', 'warning', 'calm', 'glitch', 'corrupt']),
  rose_mgs2: portraitSet('/portraits/mgs2/rose'),
  pliskin_mgs2: portraitSet('/portraits/mgs2/pliskin', ['neutral', 'serious', 'warning', 'calm', 'humor', 'revealed']),
  stillman_mgs2: portraitSet('/portraits/mgs2/stillman', ['neutral', 'serious', 'warning', 'calm', 'regret', 'urgent']),
  mr_x_mgs2: portraitSet('/portraits/mgs2/mr_x', ['neutral', 'serious', 'warning', 'calm', 'masked', 'revealed', 'urgent']),
  emma_mgs2: portraitSet('/portraits/mgs2/emma', ['neutral', 'serious', 'warning', 'calm', 'humor', 'grief']),
  naked_snake: portraitSet('/portraits/mgs3/naked_snake'),
  naked_snake_mgs3: portraitSet('/portraits/mgs3/naked_snake'),
  major_mgs3: portraitSet('/portraits/mgs3/major_zero', ['neutral', 'serious', 'warning', 'calm', 'humor', 'urgent']),
  para_medic_save_mgs3: portraitSet('/portraits/mgs3/para_medic', ['neutral', 'serious', 'warning', 'calm', 'humor', 'cinema']),
  para_medic_mgs3: portraitSet('/portraits/mgs3/para_medic', ['neutral', 'serious', 'warning', 'calm', 'humor', 'medical']),
  the_boss_mgs3: portraitSet('/portraits/mgs3/the_boss', ['neutral', 'serious', 'warning', 'calm', 'mentor', 'enemy']),
  sigint_mgs3: portraitSet('/portraits/mgs3/sigint', ['neutral', 'serious', 'warning', 'calm', 'humor', 'technical', 'urgent']),
  eva_mgs3: portraitSet('/portraits/mgs3/eva', ['neutral', 'serious', 'warning', 'calm', 'humor', 'injured', 'urgent'])
};

export function getCharacterPortrait(
  characterId: string | undefined,
  expression = 'neutral',
  routingContext?: CharacterPortraitRoutingContext
): string | undefined {
  if (!characterId) return undefined;
  const set = characterPortraitSets[characterId];
  if (!set) return undefined;
  const supportedExpression = set.expressions.includes(expression)
    ? expression
    : 'neutral';
  const storyVariant = routingContext
    ? resolveMgs1StoryVariant(characterId, routingContext.contextId, routingContext.flags)
    : undefined;
  const baseStoryVariants = ['medical_support', 'master_miller', 'field_contact'];
  if (storyVariant && !baseStoryVariants.includes(storyVariant)) {
    const directory = set.basePath.split('/').slice(-1)[0];
    return `/portraits/mgs1/variants/${directory}/${storyVariant}/${supportedExpression}.webp`;
  }
  return `${set.basePath}/${supportedExpression}.webp`;
}

const cueMap: Record<string, Record<CodecUiCue, [number, number, OscillatorType]>> = {
  '8bit': { tune:[520,30,'square'],connect:[880,90,'square'],disconnect:[240,90,'square'],incoming:[760,120,'square'],no_response:[120,180,'square'],confirm:[980,45,'square'],error:[150,140,'square'],memory:[660,50,'square'] },
  codec: { tune:[640,35,'square'],connect:[900,80,'square'],disconnect:[360,75,'square'],incoming:[860,100,'square'],no_response:[180,160,'square'],confirm:[1040,45,'square'],error:[170,150,'sawtooth'],memory:[720,55,'square'] },
  digital: { tune:[780,24,'sine'],connect:[1240,65,'sine'],disconnect:[520,65,'sine'],incoming:[1120,90,'sine'],no_response:[250,130,'triangle'],confirm:[1440,35,'sine'],error:[220,120,'sawtooth'],memory:[980,40,'sine'] },
  analog: { tune:[420,40,'triangle'],connect:[720,110,'triangle'],disconnect:[280,100,'triangle'],incoming:[620,140,'triangle'],no_response:[110,220,'sawtooth'],confirm:[760,60,'triangle'],error:[130,180,'sawtooth'],memory:[540,75,'triangle'] },
  secure: { tune:[700,20,'sine'],connect:[980,60,'sine'],disconnect:[440,55,'sine'],incoming:[920,80,'sine'],no_response:[260,110,'triangle'],confirm:[1180,35,'sine'],error:[210,110,'sawtooth'],memory:[820,35,'sine'] },
  briefing: { tune:[460,35,'triangle'],connect:[680,85,'triangle'],disconnect:[320,80,'triangle'],incoming:[610,110,'triangle'],no_response:[160,150,'triangle'],confirm:[760,45,'triangle'],error:[180,130,'sawtooth'],memory:[520,55,'triangle'] },
  idroid: { tune:[960,18,'sine'],connect:[1420,55,'sine'],disconnect:[680,50,'sine'],incoming:[1320,75,'sine'],no_response:[300,100,'triangle'],confirm:[1580,30,'sine'],error:[240,100,'sawtooth'],memory:[1100,30,'sine'] },
  vr: { tune:[1080,18,'square'],connect:[1560,45,'square'],disconnect:[720,45,'square'],incoming:[1480,65,'square'],no_response:[340,90,'square'],confirm:[1740,25,'square'],error:[280,90,'sawtooth'],memory:[1240,28,'square'] },
  corrupt: { tune:[330,45,'sawtooth'],connect:[770,120,'sawtooth'],disconnect:[90,160,'sawtooth'],incoming:[690,160,'sawtooth'],no_response:[70,240,'sawtooth'],confirm:[880,60,'sawtooth'],error:[55,260,'sawtooth'],memory:[430,90,'sawtooth'] }
};

const cueCadence: Record<CodecUiCue, number[]> = {
  tune: [1],
  connect: [1, 1.38],
  disconnect: [1, 0.62],
  incoming: [1, 1, 1],
  no_response: [1, 0.74],
  confirm: [1, 1.25],
  error: [1, 0.72, 0.48],
  memory: [1, 1.18]
};

export function getCodecUiCueSignature(era: EraId, cue: CodecUiCue): { profile: CodecAssetPackDefinition['uiProfile']; tones: number; waveform: OscillatorType } {
  const profile = getCodecAssetPack(era).uiProfile;
  return { profile, tones: cueCadence[cue].length, waveform: cueMap[profile][cue][2] };
}

export function playCodecUiCue(era: EraId, cue: CodecUiCue, volume = 0.35): void {
  const ctx = getContext(); if (!ctx || volume <= 0) return;
  const profile = getCodecAssetPack(era).uiProfile;
  const [frequency, duration, type] = cueMap[profile][cue];
  const spacing = Math.max(52, duration * 0.72) / 1000;
  cueCadence[cue].forEach((ratio, index) => {
    const start = ctx.currentTime + index * spacing;
    const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
    oscillator.type = type; oscillator.frequency.value = frequency * ratio;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.09), start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration / 1000);
    oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(start); oscillator.stop(start + duration / 1000 + 0.01);
  });
}

export function stopCodecAmbience(): void { ambience?.stop(); ambience = null; }

export function startCodecAmbience(era: EraId, volume = 0.2): void {
  stopCodecAmbience(); const ctx = getContext(); if (!ctx || volume <= 0) return;
  const pack = getCodecAssetPack(era); const nodes: AudioNode[] = []; const stops: Array<() => void> = [];
  const master = ctx.createGain(); master.gain.value = Math.min(0.08, volume * 0.035); master.connect(ctx.destination); nodes.push(master);
  if (pack.ambience === 'digital_hum' || pack.ambience === 'secure_network' || pack.ambience === 'idroid_pulse' || pack.ambience === 'vr_tone') {
    const osc = ctx.createOscillator(); const lfo = ctx.createOscillator(); const lfoGain = ctx.createGain();
    osc.type = pack.ambience === 'vr_tone' ? 'square' : 'sine'; osc.frequency.value = pack.ambience === 'idroid_pulse' ? 96 : 58;
    lfo.frequency.value = pack.ambience === 'secure_network' ? 0.4 : 0.8; lfoGain.gain.value = 12; lfo.connect(lfoGain); lfoGain.connect(osc.frequency); osc.connect(master);
    osc.start(); lfo.start(); stops.push(()=>{osc.stop();lfo.stop();}); nodes.push(osc,lfo,lfoGain);
  } else {
    const seconds=2, buffer=ctx.createBuffer(1,ctx.sampleRate*seconds,ctx.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*(pack.ambience==='corrupt_noise' ? (i%97<4?1:.25) : 1);
    const source=ctx.createBufferSource(); source.buffer=buffer; source.loop=true; const filter=ctx.createBiquadFilter(); filter.type='bandpass';
    filter.frequency.value=pack.ambience==='field_radio'?1100:pack.ambience==='tape_hiss'?4200:1800; filter.Q.value=.7; source.connect(filter); filter.connect(master); source.start();
    stops.push(()=>source.stop()); nodes.push(source,filter);
  }
  ambience={nodes,stop:()=>{for(const stop of stops){try{stop()}catch{}} for(const node of nodes){try{node.disconnect()}catch{}}}};
}
