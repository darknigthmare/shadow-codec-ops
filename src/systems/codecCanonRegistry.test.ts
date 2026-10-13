import { describe, expect, it } from 'vitest';
import type { CodecCanonSourceDefinition, ContactDefinition } from '../types/codec.types';
import { getCanonStatusLabel, getContactChannelDisplay, getContactSources } from './codecCanonRegistry';

const source: CodecCanonSourceDefinition = {
  id: 'official',
  title: 'Official Manual',
  publisher: 'Konami',
  quality: 'official_manual',
  notes: 'Test source'
};

const contact: ContactDefinition = {
  id: 'otacon',
  name: 'Otacon',
  era: 'mgs2',
  frequency: 141.12,
  role: 'technical_support',
  availability: 'available',
  portrait: 'placeholder',
  defaultConversation: 'default',
  specialties: [],
  unlockedByDefault: true,
  isSecret: false,
  description: 'Test contact',
  canonStatus: 'canon',
  sourceIds: ['official'],
  frequencyKind: 'canonical_frequency',
  frequencyVariants: [
    { frequency: 141.12, label: 'Support', kind: 'canonical_frequency', canonical: true, subjectId: 'technology' },
    { frequency: 140.96, label: 'Save line', kind: 'save_frequency', canonical: true, subjectId: 'save' }
  ]
};

describe('Codec canon registry', () => {
  it('resolves registered sources', () => {
    expect(getContactSources(contact, [source]).map((entry) => entry.id)).toEqual(['official']);
  });

  it('formats the subject-specific canonical channel', () => {
    expect(getContactChannelDisplay(contact, undefined, 'save')).toContain('140.96');
  });

  it('labels canonical and simulation contacts honestly', () => {
    expect(getCanonStatusLabel(contact)).toBe('CANON CONTACT');
    expect(getCanonStatusLabel({ ...contact, canonStatus: 'simulation' })).toBe('SIMULATION DATA');
  });
});
