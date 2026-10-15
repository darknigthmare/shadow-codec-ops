let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) return null;
  if (!audioContext) audioContext = new AudioContextConstructor();
  return audioContext;
}

export function playBeep(frequency = 720, durationMs = 55, volume = 0.05): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + durationMs / 1000);
}

export function playCodecConnect(): void {
  playBeep(900, 40, 0.04);
  window.setTimeout(() => playBeep(520, 70, 0.04), 55);
}

export function playNoResponse(): void {
  playBeep(180, 140, 0.05);
}

export function playIncomingRing(): void {
  playBeep(860, 85, 0.05);
  window.setTimeout(() => playBeep(860, 85, 0.05), 160);
}
