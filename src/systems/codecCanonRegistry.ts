import type {
  CodecCanonSourceDefinition,
  ContactDefinition,
  ContactFrequencyDefinition
} from '../types/codec.types';
import { formatFrequency, getContactFrequencyVariants, getPreferredContactFrequency } from './frequencyEngine';

export function getContactSources(
  contact: ContactDefinition | undefined,
  sources: CodecCanonSourceDefinition[]
): CodecCanonSourceDefinition[] {
  if (!contact) return [];
  const sourceIds = new Set(contact.sourceIds ?? []);
  return sources.filter((source) => sourceIds.has(source.id));
}

export function getContactChannelDisplay(
  contact: ContactDefinition,
  contextId?: string,
  subjectId?: string
): string {
  const variant = getPreferredContactFrequency(contact, contextId, subjectId);
  if (variant.canonical) return `${formatFrequency(variant.frequency)} · ${variant.label}`;
  return contact.frequencyLabel ?? variant.label ?? `SIM ${formatFrequency(variant.frequency)}`;
}

export function getContactChannelVariants(
  contact: ContactDefinition,
  contextId?: string
): ContactFrequencyDefinition[] {
  return getContactFrequencyVariants(contact, contextId);
}

export function isCanonicalNumericFrequency(variant: ContactFrequencyDefinition): boolean {
  return variant.canonical && ['canonical_frequency', 'save_frequency', 'shared_frequency'].includes(variant.kind);
}

export function getCanonStatusLabel(contact?: ContactDefinition): string {
  if (!contact) return 'NO CONTACT';
  if (contact.canonStatus === 'simulation') return 'SIMULATION DATA';
  if (contact.canonStatus === 'custom') return 'CUSTOM DATA';
  return 'CANON CONTACT';
}
