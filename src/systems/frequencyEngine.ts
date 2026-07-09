import type { ContactDefinition, EraId, SignalScanResult } from '../types/codec.types';

export const MIN_FREQUENCY = 100.0;
export const MAX_FREQUENCY = 200.0;
export const FREQ_STEP = 0.01;
export const FAST_FREQ_STEP = 0.1;
export const FREQ_TOLERANCE = 0.0049;

export function clampFrequency(value: number): number {
  if (Number.isNaN(value)) return MIN_FREQUENCY;
  return Math.min(MAX_FREQUENCY, Math.max(MIN_FREQUENCY, value));
}

export function normalizeFrequency(value: number): number {
  return Number(clampFrequency(value).toFixed(2));
}

export function formatFrequency(value: number): string {
  return normalizeFrequency(value).toFixed(2).padStart(6, '0');
}

export function areFrequenciesEqual(a: number, b: number): boolean {
  return Math.abs(normalizeFrequency(a) - normalizeFrequency(b)) <= FREQ_TOLERANCE;
}

export function findContactByFrequency(
  era: EraId,
  frequency: number,
  contacts: ContactDefinition[]
): ContactDefinition | undefined {
  const normalized = normalizeFrequency(frequency);
  return contacts.find(
    (contact) => contact.era === era && areFrequenciesEqual(contact.frequency, normalized)
  );
}

export function scanFrequency(
  era: EraId,
  frequency: number,
  contacts: ContactDefinition[]
): SignalScanResult {
  const exact = findContactByFrequency(era, frequency, contacts);
  if (exact) {
    if (era === 'patriots_ai') {
      return { status: 'patriots_corrupt', label: `AI SIGNAL CORRUPTION: ${exact.name}`, contact: exact, distance: 0 };
    }
    if (exact.availability === 'jammed') {
      return { status: 'jammed', label: 'SIGNAL JAMMED', contact: exact, distance: 0 };
    }
    if (exact.availability === 'unknown') {
      return { status: 'unknown', label: 'UNKNOWN SIGNAL', contact: exact, distance: 0 };
    }
    return { status: 'stable', label: `SIGNAL STABLE: ${exact.name}`, contact: exact, distance: 0 };
  }

  const sameEraContacts = contacts.filter((contact) => contact.era === era);
  const nearest = sameEraContacts
    .map((contact) => ({ contact, distance: Math.abs(contact.frequency - frequency) }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (nearest && nearest.distance <= 0.08) {
    return { status: 'weak', label: 'WEAK SIGNAL DETECTED', contact: nearest.contact, distance: nearest.distance };
  }

  if (era === 'patriots_ai') {
    return { status: 'patriots_corrupt', label: 'DATA LOOP // AI SIGNAL CORRUPTION' };
  }

  return { status: 'none', label: 'NO RESPONSE' };
}
