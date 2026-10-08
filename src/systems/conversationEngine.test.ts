import { describe, expect, it } from 'vitest';
import type { CallHistoryEntry, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import { getConversationForContact, getConversationTopics } from './conversationEngine';

const contact: ContactDefinition = {
  id: 'support',
  name: 'Support',
  era: 'mgs1',
  frequency: 140.85,
  role: 'mission_commander',
  availability: 'available',
  portrait: 'placeholder',
  defaultConversation: 'mission_a',
  specialties: [],
  unlockedByDefault: true,
  isSecret: false,
  description: 'Support'
};

const conversations: ConversationDefinition[] = [
  { id: 'mission_a', era: 'mgs1', title: 'Mission A', contactId: 'support', frequency: 140.85, trigger: 'manual_call', canReplay: true, subjectId: 'mission', lines: [] },
  { id: 'mission_b', era: 'mgs1', title: 'Mission B', contactId: 'support', frequency: 140.85, trigger: 'manual_call', canReplay: true, subjectId: 'mission', lines: [] },
  { id: 'alert', era: 'mgs1', title: 'Alert', contactId: 'support', frequency: 140.85, trigger: 'manual_call', canReplay: true, subjectId: 'alert', lines: [] }
];

describe('conversation topics', () => {
  it('builds a topic menu from subject metadata', () => {
    expect(getConversationTopics(contact, conversations).map((topic) => topic.id)).toEqual(['mission', 'alert']);
  });

  it('rotates toward the least-heard conversation in the selected subject', () => {
    const history: CallHistoryEntry[] = [{
      callId: 'call', contactId: 'support', contactName: 'Support', frequency: 140.85, era: 'mgs1', conversationId: 'mission_a', title: 'Mission A', timestamp: '', source: 'manual_call', completed: true, disposition: 'completed'
    }];
    expect(getConversationForContact(contact, conversations, 'manual_call', 'mission', undefined, history)?.id).toBe('mission_b');
  });
});
