import type {
  ContactDefinition,
  EraId,
  RadioCarrierDefinition,
  RadioSignalDefinition,
  RadioSignalHit,
  RadioSpectrumPoint
} from '../types/codec.types';
import { clampFrequency, getContactFrequencyVariants, normalizeFrequency } from './frequencyEngine';

export const RADIO_DETECT_THRESHOLD = 0.18;
export const RADIO_LOCK_THRESHOLD = 0.72;

export interface RadioBand {
  min: number;
  max: number;
}

export function isRadioSignalAvailable(
  signal: RadioSignalDefinition,
  era: EraId,
  contextId: string,
  flags: string[] = []
): boolean {
  if (signal.era !== era) return false;
  if (signal.contextIds?.length && !signal.contextIds.includes(contextId)) return false;
  if (signal.requiredFlags?.some((flag) => !flags.includes(flag))) return false;
  if (signal.forbiddenFlags?.some((flag) => flags.includes(flag))) return false;
  return true;
}

export function getRadioSignalsForContext(
  signals: RadioSignalDefinition[],
  era: EraId,
  contextId: string,
  flags: string[] = []
): RadioSignalDefinition[] {
  return signals.filter((signal) => isRadioSignalAvailable(signal, era, contextId, flags));
}

export function buildRadioCarriers(
  contacts: ContactDefinition[],
  signals: RadioSignalDefinition[],
  era: EraId,
  contextId: string,
  flags: string[] = [],
  discoveredSignalIds: string[] = [],
  memoryContactIds: string[] = []
): RadioCarrierDefinition[] {
  const contactCarriers = contacts
    .filter((contact) => contact.era === era)
    .flatMap((contact) => getContactFrequencyVariants(contact, contextId).map((variant, index) => ({
      id: `contact:${contact.id}:${variant.frequency}:${index}`,
      era,
      label: contact.isSecret && !memoryContactIds.includes(contact.id) ? 'CLASSIFIED CONTACT' : contact.name,
      frequency: variant.frequency,
      bandwidth: variant.kind === 'network_channel' || variant.kind === 'idroid_channel' ? 0.065 : 0.028,
      strength: contact.availability === 'jammed' ? 0.38 : contact.isSecret ? 0.9 : 0.78,
      kind: 'contact' as const,
      canonStatus: contact.canonStatus ?? 'canon',
      contactId: contact.id,
      hidden: Boolean(contact.isSecret && !memoryContactIds.includes(contact.id)),
      encrypted: variant.kind === 'network_channel' || variant.kind === 'idroid_channel'
    })));

  const signalCarriers = getRadioSignalsForContext(signals, era, contextId, flags).map((signal) => ({
    id: `signal:${signal.id}`,
    era,
    label: signal.hiddenUntilDiscovered && !discoveredSignalIds.includes(signal.id) ? 'CLASSIFIED SIGNAL' : signal.label,
    frequency: signal.frequency,
    bandwidth: Math.max(0.01, signal.bandwidth),
    strength: Math.max(0.05, Math.min(1, signal.strength)),
    kind: signal.kind,
    canonStatus: signal.canonStatus,
    contactId: signal.contactId,
    signalId: signal.id,
    conversationId: signal.conversationId,
    hidden: Boolean(signal.hiddenUntilDiscovered && !discoveredSignalIds.includes(signal.id)),
    encrypted: Boolean(signal.encrypted || signal.puzzle),
    intermittent: signal.intermittent,
    frequencyDrift: signal.frequencyDrift
  }));

  return [...contactCarriers, ...signalCarriers];
}

export function getRadioBand(carriers: RadioCarrierDefinition[], fallbackFrequency = 140): RadioBand {
  if (carriers.length === 0) {
    const center = clampFrequency(fallbackFrequency);
    return { min: normalizeFrequency(center - 0.5), max: normalizeFrequency(center + 0.5) };
  }
  const values = carriers.map((carrier) => carrier.frequency);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const spread = Math.max(0.5, rawMax - rawMin);
  const pad = Math.max(0.25, spread * 0.06);
  return {
    min: normalizeFrequency(Math.max(100, rawMin - pad)),
    max: normalizeFrequency(Math.min(200, rawMax + pad))
  };
}

export function getEffectiveCarrierFrequency(carrier: RadioCarrierDefinition, phase = 0): number {
  const drift = Math.max(0, carrier.frequencyDrift ?? 0);
  if (!drift) return carrier.frequency;
  const seed = [...carrier.id].reduce((total, character) => total + character.charCodeAt(0), 0) * 0.017;
  return carrier.frequency + Math.sin(phase * Math.PI * 2 + seed) * drift;
}

export function calculateCarrierStrength(
  frequency: number,
  carrier: RadioCarrierDefinition,
  phase = 0
): number {
  const sigma = Math.max(0.008, carrier.bandwidth);
  const offset = Math.abs(frequency - getEffectiveCarrierFrequency(carrier, phase));
  const gaussian = Math.exp(-0.5 * Math.pow(offset / sigma, 2));
  const pulse = carrier.intermittent
    ? 0.34 + 0.66 * ((Math.sin(phase * Math.PI * 2 + carrier.frequency * 0.37) + 1) / 2)
    : 1;
  return Math.max(0, Math.min(1, carrier.strength * gaussian * pulse));
}

export function getRadioSignalHits(
  frequency: number,
  carriers: RadioCarrierDefinition[],
  phase = 0,
  threshold = RADIO_DETECT_THRESHOLD
): RadioSignalHit[] {
  return carriers
    .map((carrier) => {
      const strength = calculateCarrierStrength(frequency, carrier, phase);
      return {
        carrier,
        strength,
        offset: Math.abs(frequency - getEffectiveCarrierFrequency(carrier, phase)),
        locked: strength >= RADIO_LOCK_THRESHOLD
      };
    })
    .filter((hit) => hit.strength >= threshold)
    .sort((a, b) => b.strength - a.strength || a.offset - b.offset);
}

export function buildRadioSpectrum(
  carriers: RadioCarrierDefinition[],
  band: RadioBand,
  bins = 160,
  phase = 0
): RadioSpectrumPoint[] {
  const safeBins = Math.max(16, Math.min(512, Math.round(bins)));
  const span = Math.max(0.01, band.max - band.min);
  return Array.from({ length: safeBins }, (_, index) => {
    const frequency = band.min + (span * index) / (safeBins - 1);
    const strengths = carriers
      .map((carrier) => ({ carrier, strength: calculateCarrierStrength(frequency, carrier, phase) }))
      .filter((entry) => entry.strength >= 0.015)
      .sort((a, b) => b.strength - a.strength);
    const dominant = strengths[0];
    const combined = strengths.reduce((total, entry, entryIndex) => total + entry.strength * (entryIndex === 0 ? 1 : 0.28), 0);
    return {
      frequency: normalizeFrequency(frequency),
      strength: Math.max(0, Math.min(1, combined)),
      sourceIds: strengths.slice(0, 3).map((entry) => entry.carrier.id),
      classified: Boolean(dominant?.carrier.hidden)
    };
  });
}

export function findNextRadioPeak(
  currentFrequency: number,
  carriers: RadioCarrierDefinition[],
  direction: 1 | -1
): RadioCarrierDefinition | undefined {
  if (carriers.length === 0) return undefined;
  const sorted = [...carriers].sort((a, b) => a.frequency - b.frequency);
  if (direction > 0) {
    return sorted.find((carrier) => carrier.frequency > currentFrequency + 0.0049) ?? sorted[0];
  }
  return [...sorted].reverse().find((carrier) => carrier.frequency < currentFrequency - 0.0049) ?? sorted[sorted.length - 1];
}

export function normalizePuzzleAnswer(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[’']/g, '')
    .replace(/[^A-Z0-9.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validateRadioPuzzleAnswer(signal: RadioSignalDefinition, answer: string): boolean {
  if (!signal.puzzle) return true;
  return normalizePuzzleAnswer(answer) === normalizePuzzleAnswer(signal.puzzle.answer);
}

export function getSignalByCarrier(
  carrier: RadioCarrierDefinition | undefined,
  signals: RadioSignalDefinition[]
): RadioSignalDefinition | undefined {
  return carrier?.signalId ? signals.find((signal) => signal.id === carrier.signalId) : undefined;
}
