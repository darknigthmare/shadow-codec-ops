import packsJson from '../data/codecAssetPacks.json';
import type { EraId } from '../types/codec.types';
import type { CodecAssetPackDefinition, CodecUiCue } from '../types/codecAssets.types';

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

export function playCodecUiCue(era: EraId, cue: CodecUiCue, volume = 0.35): void {
  const ctx = getContext(); if (!ctx || volume <= 0) return;
  const [frequency, duration, type] = cueMap[getCodecAssetPack(era).uiProfile][cue];
  const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
  oscillator.type = type; oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.09), ctx.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);
  oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(); oscillator.stop(ctx.currentTime + duration / 1000 + 0.01);
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
