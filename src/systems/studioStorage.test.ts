import { describe, expect, it } from 'vitest';
import type { ContactDefinition } from '../types/codec.types';
import { sanitizeImportedConversation } from './studioStorage';

const fallbackContact: ContactDefinition = {
  id: 'campbell_mgs1',
  name: 'Colonel Campbell',
  era: 'mgs1',
  frequency: 140.85,
  role: 'mission_commander',
  availability: 'available',
  portrait: 'placeholder',
  defaultConversation: 'default',
  specialties: [],
  unlockedByDefault: true,
  isSecret: false,
  description: 'Command'
};

describe('Conversation Studio Core Fidelity fields', () => {
  it('preserves call subjects, context restrictions and narrative line metadata during import', () => {
    const imported = sanitizeImportedConversation({
      id: 'custom',
      title: 'Context call',
      subjectId: 'objective',
      topicLabel: 'Objective Review',
      topicDescription: 'Review the route.',
      contextIds: ['mgs1_insertion'],
      lines: [{
        speaker: 'campbell',
        text: 'Test',
        localizedText: { en: 'Test', fr: 'Essai' },
        startMs: 100,
        endMs: 900,
        audioSource: '/audio/custom/test.ogg',
        portraitExpression: 'serious'
      }]
    }, fallbackContact);

    expect(imported?.subjectId).toBe('objective');
    expect(imported?.contextIds).toEqual(['mgs1_insertion']);
    expect(imported?.lines[0].localizedText?.fr).toBe('Essai');
    expect(imported?.lines[0].audioSource).toBe('/audio/custom/test.ogg');
  });

  it('assigns a role-based default subject to old imported conversations', () => {
    const imported = sanitizeImportedConversation({ title: 'Legacy', lines: [{ speaker: 'campbell', text: 'Legacy' }] }, fallbackContact);
    expect(imported?.subjectId).toBe('mission');
  });
});
