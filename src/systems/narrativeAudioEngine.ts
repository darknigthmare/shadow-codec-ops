import type { CodecAudioProfile } from '../types/narrative.types';
import type { EraId } from '../types/codec.types';

let context: AudioContext | null = null;
let activeNoise: { source: AudioBufferSourceNode; gain: GainNode } | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Constructor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Constructor) return null;
  if (!context) context = new Constructor();
  return context;
}

export function getAudioProfileForEra(era: EraId): CodecAudioProfile {
  const map: Record<EraId, CodecAudioProfile> = {
    msx: 'msx', mgs1: 'mgs1', mgs2: 'mgs2', mgs3: 'mgs3', mgs4: 'mgs4',
    peace_walker: 'mgsv', mgsv: 'mgsv', vr_simulation: 'vr', patriots_ai: 'patriots'
  };
  return map[era];
}

function profileSettings(profile: CodecAudioProfile): { lowpass: number; highpass: number; noise: number } {
  const profiles: Record<CodecAudioProfile, { lowpass: number; highpass: number; noise: number }> = {
    msx: { lowpass: 2500, highpass: 450, noise: 0.018 },
    mgs1: { lowpass: 3200, highpass: 280, noise: 0.014 },
    mgs2: { lowpass: 4300, highpass: 180, noise: 0.008 },
    mgs3: { lowpass: 3000, highpass: 500, noise: 0.02 },
    mgs4: { lowpass: 5200, highpass: 120, noise: 0.005 },
    mgsv: { lowpass: 4600, highpass: 160, noise: 0.01 },
    vr: { lowpass: 6200, highpass: 80, noise: 0.003 },
    patriots: { lowpass: 2100, highpass: 650, noise: 0.03 }
  };
  return profiles[profile];
}

export function stopNarrativeNoise(): void {
  try { activeNoise?.source.stop(); } catch { /* already stopped */ }
  activeNoise?.source.disconnect();
  activeNoise?.gain.disconnect();
  activeNoise = null;
}

export function startNarrativeNoise(profile: CodecAudioProfile, volume = 0.2): void {
  stopNarrativeNoise();
  const ctx = getContext();
  if (!ctx || volume <= 0) return;
  const settings = profileSettings(profile);
  const frameCount = Math.max(1, Math.floor(ctx.sampleRate * 2));
  const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) data[index] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = settings.lowpass;
  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = settings.highpass;
  const gain = ctx.createGain();
  gain.gain.value = settings.noise * volume;
  source.connect(lowpass);
  lowpass.connect(highpass);
  highpass.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  activeNoise = { source, gain };
}

export function playNarrativeVoiceCue(profile: CodecAudioProfile, emotion: string, volume = 0.25): void {
  const ctx = getContext();
  if (!ctx || volume <= 0) return;
  const settings = profileSettings(profile);
  const oscillator = ctx.createOscillator();
  const lowpass = ctx.createBiquadFilter();
  const highpass = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  oscillator.type = profile === 'patriots' ? 'sawtooth' : 'square';
  oscillator.frequency.value = emotion === 'warning' ? 230 : emotion === 'calm' ? 145 : emotion === 'glitch' ? 310 : 180;
  lowpass.type = 'lowpass'; lowpass.frequency.value = settings.lowpass;
  highpass.type = 'highpass'; highpass.frequency.value = settings.highpass;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.08), ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
  oscillator.connect(lowpass); lowpass.connect(highpass); highpass.connect(gain); gain.connect(ctx.destination);
  oscillator.start(); oscillator.stop(ctx.currentTime + 0.1);
}

export async function playNarrativeAudioSource(source: string | undefined, volume = 0.7): Promise<HTMLAudioElement | null> {
  if (!source || typeof Audio === 'undefined') return null;
  const audio = new Audio(source);
  audio.volume = Math.max(0, Math.min(1, volume));
  try {
    await audio.play();
    return audio;
  } catch {
    return null;
  }
}
