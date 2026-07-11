import { describe, expect, it } from 'vitest';
import type { ContactDefinition } from '../types/codec.types';
import { findContactsByFrequency, scanFrequency } from './frequencyEngine';

const base: Omit<ContactDefinition, 'id' | 'name' | 'frequency' | 'role'> = {
  era: 'mgs1',
  availability: 'available',
  portrait: 'placeholder',
  defaultConversation: 'conversation',
  specialties: [],
  unlockedByDefault: true,
  isSecret: false,
  description: 'Test'
};

const contacts: ContactDefinition[] = [
  { ...base, id: 'campbell', name: 'Campbell', frequency: 140.85, role: 'mission_commander' },
  { ...base, id: 'naomi', name: 'Naomi', frequency: 140.85, role: 'medical_support' },
  { ...base, id: 'mei', name: 'Mei Ling', frequency: 140.96, role: 'save_contact' }
];

describe('frequency engine', () => {
  it('returns every exact contact on a shared frequency', () => {
    expect(findContactsByFrequency('mgs1', 140.85, contacts).map((contact) => contact.id)).toEqual(['campbell', 'naomi']);
  });

  it('marks a shared frequency as ambiguous instead of silently selecting the first contact', () => {
    const scan = scanFrequency('mgs1', 140.85, contacts);
    expect(scan.ambiguous).toBe(true);
    expect(scan.contacts).toHaveLength(2);
    expect(scan.contact).toBeUndefined();
  });

  it('keeps single-channel scans stable', () => {
    const scan = scanFrequency('mgs1', 140.96, contacts);
    expect(scan.ambiguous).not.toBe(true);
    expect(scan.contact?.id).toBe('mei');
  });
});

describe('frequency variants', () => {
  const tankerContact: ContactDefinition = {
    ...base,
    id: 'otacon-tanker',
    name: 'Otacon',
    frequency: 141.12,
    role: 'technical_support',
    frequencyVariants: [
      { frequency: 141.12, label: 'Support', kind: 'canonical_frequency', canonical: true, subjectId: 'technology' },
      { frequency: 140.96, label: 'Save', kind: 'save_frequency', canonical: true, subjectId: 'save' }
    ]
  };

  it('finds a contact through an alternate canonical frequency', () => {
    expect(findContactsByFrequency('mgs1', 140.96, [tankerContact]).map((contact) => contact.id)).toEqual(['otacon-tanker']);
  });

  it('reports the matched channel variant', () => {
    const scan = scanFrequency('mgs1', 140.96, [tankerContact]);
    expect(scan.matchedVariant?.subjectId).toBe('save');
    expect(scan.matchedVariant?.canonical).toBe(true);
  });
});
