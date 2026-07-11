import type {
  ContactDefinition,
  ContactFrequencyDefinition,
  EraId,
  SignalScanResult
} from '../types/codec.types';

export const MIN_FREQUENCY = 100.0;
export const MAX_FREQUENCY = 200.0;
export const FREQ_STEP = 0.01;
export const FAST_FREQ_STEP = 0.1;
export const FREQ_TOLERANCE = 0.0049;

export interface ContactFrequencyMatch {
  contact: ContactDefinition;
  variant: ContactFrequencyDefinition;
}

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

export function getContactFrequencyVariants(
  contact: ContactDefinition,
  contextId?: string
): ContactFrequencyDefinition[] {
  const variants = contact.frequencyVariants?.length
    ? contact.frequencyVariants
    : [{
        frequency: contact.frequency,
        label: contact.frequencyLabel ?? formatFrequency(contact.frequency),
        kind: contact.frequencyKind ?? 'canonical_frequency',
        canonical: !['network_channel', 'briefing_channel', 'idroid_channel', 'simulation_channel', 'incoming_only'].includes(contact.frequencyKind ?? '')
      } satisfies ContactFrequencyDefinition];

  const contextMatches = variants.filter((variant) => !variant.contextIds?.length || Boolean(contextId && variant.contextIds.includes(contextId)));
  return contextMatches.length > 0 ? contextMatches : variants;
}

export function getPreferredContactFrequency(
  contact: ContactDefinition,
  contextId?: string,
  subjectId?: string
): ContactFrequencyDefinition {
  const variants = getContactFrequencyVariants(contact, contextId);
  return variants.find((variant) => subjectId && variant.subjectId === subjectId)
    ?? variants.find((variant) => variant.kind !== 'save_frequency')
    ?? variants[0];
}

export function findContactFrequencyMatches(
  era: EraId,
  frequency: number,
  contacts: ContactDefinition[]
): ContactFrequencyMatch[] {
  const normalized = normalizeFrequency(frequency);
  const matches: ContactFrequencyMatch[] = [];
  for (const contact of contacts) {
    if (contact.era !== era) continue;
    const variant = getContactFrequencyVariants(contact).find((entry) => areFrequenciesEqual(entry.frequency, normalized));
    if (variant) matches.push({ contact, variant });
  }
  return matches;
}

export function findContactsByFrequency(
  era: EraId,
  frequency: number,
  contacts: ContactDefinition[]
): ContactDefinition[] {
  const seen = new Set<string>();
  return findContactFrequencyMatches(era, frequency, contacts)
    .map((match) => match.contact)
    .filter((contact) => {
      if (seen.has(contact.id)) return false;
      seen.add(contact.id);
      return true;
    });
}

export function findContactByFrequency(
  era: EraId,
  frequency: number,
  contacts: ContactDefinition[]
): ContactDefinition | undefined {
  return findContactsByFrequency(era, frequency, contacts)[0];
}

export function scanFrequency(
  era: EraId,
  frequency: number,
  contacts: ContactDefinition[]
): SignalScanResult {
  const matches = findContactFrequencyMatches(era, frequency, contacts);
  const exact = findContactsByFrequency(era, frequency, contacts);
  if (exact.length > 0) {
    const matchedVariant = exact.length === 1 ? matches.find((match) => match.contact.id === exact[0].id)?.variant : undefined;
    if (era === 'patriots_ai') {
      return {
        status: 'patriots_corrupt',
        label: exact.length > 1 ? `AI SIGNAL COLLISION: ${exact.length} ROUTES` : `AI SIGNAL CORRUPTION: ${exact[0].name}`,
        contact: exact.length === 1 ? exact[0] : undefined,
        contacts: exact,
        ambiguous: exact.length > 1,
        distance: 0,
        matchedVariant
      };
    }

    const jammed = exact.every((contact) => contact.availability === 'jammed');
    if (jammed) {
      return { status: 'jammed', label: 'SIGNAL JAMMED', contact: exact[0], contacts: exact, ambiguous: exact.length > 1, distance: 0, matchedVariant };
    }

    if (exact.length > 1) {
      return {
        status: 'stable',
        label: `SHARED FREQUENCY: ${exact.length} ROUTES`,
        contacts: exact,
        ambiguous: true,
        distance: 0
      };
    }

    const contact = exact[0];
    if (contact.availability === 'unknown') {
      return { status: 'unknown', label: 'UNKNOWN SIGNAL', contact, contacts: exact, distance: 0, matchedVariant };
    }
    return {
      status: 'stable',
      label: matchedVariant?.canonical === false ? `SIMULATED ROUTE: ${contact.name}` : `SIGNAL STABLE: ${contact.name}`,
      contact,
      contacts: exact,
      distance: 0,
      matchedVariant
    };
  }

  const candidates = contacts
    .filter((contact) => contact.era === era)
    .flatMap((contact) => getContactFrequencyVariants(contact).map((variant) => ({
      contact,
      variant,
      distance: Math.abs(variant.frequency - frequency)
    })))
    .sort((a, b) => a.distance - b.distance);
  const nearest = candidates[0];

  if (nearest && nearest.distance <= 0.08) {
    return {
      status: 'weak',
      label: nearest.variant.canonical ? 'WEAK SIGNAL DETECTED' : 'WEAK SIMULATION ROUTE',
      contact: nearest.contact,
      contacts: [nearest.contact],
      distance: nearest.distance,
      matchedVariant: nearest.variant
    };
  }

  if (era === 'patriots_ai') {
    return { status: 'patriots_corrupt', label: 'DATA LOOP // AI SIGNAL CORRUPTION' };
  }

  return { status: 'none', label: 'NO RESPONSE' };
}
