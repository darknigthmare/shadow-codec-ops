import { describe, expect, it } from 'vitest';
import conversationsJson from '../data/conversations.json';
import contextsJson from '../data/codecContexts.json';
import contactsJson from '../data/contacts.json';
import type { CallHistoryEntry, CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import { getMgs1DiscoverySummary, getMgs1Profile, getMgs1Profiles, getMgs1ContactStatusLabel, resolveMgs1IdentityLabel } from './mgs1ContentEngine';

const conversations = conversationsJson as ConversationDefinition[];
const contexts = contextsJson as CodecContextDefinition[];
const contacts = contactsJson as ContactDefinition[];

describe('MGS1 content engine', () => {
  it('contains the eight principal MGS1 Codec profiles', () => {
    expect(getMgs1Profiles()).toHaveLength(8);
    expect(getMgs1Profiles().map((profile) => profile.id)).toEqual(expect.arrayContaining([
      'campbell_mgs1', 'mei_ling_mgs1', 'naomi_mgs1', 'otacon_mgs1',
      'nastasha_mgs1', 'miller_mgs1', 'meryl_mgs1', 'deepthroat_mgs1'
    ]));
  });

  it('resolves Miller identity after the reveal flag', () => {
    const profile = getMgs1Profile('miller_mgs1');
    expect(profile).toBeDefined();
    expect(resolveMgs1IdentityLabel(profile!, [])).toBe('Master Miller');
    expect(resolveMgs1IdentityLabel(profile!, ['miller_identity_revealed'])).toBe('Liquid Snake');
  });

  it('computes conversation discovery independently from the live source file', () => {
    const profile = getMgs1Profile('campbell_mgs1')!;
    const first = conversations.find((conversation) => conversation.contactId === profile.id)!;
    const history: CallHistoryEntry[] = [{
      callId: 'test', contactId: profile.id, contactName: 'Campbell', frequency: 140.85,
      era: 'mgs1', conversationId: first.id, title: first.title, timestamp: 'now', source: 'manual_call', completed: true,
      disposition: 'completed'
    }];
    const summary = getMgs1DiscoverySummary(profile, conversations, history, 'mgs1_insertion');
    expect(summary.heardConversations).toBe(1);
    expect(summary.totalConversations).toBeGreaterThan(3);
  });

  it('marks Miller compromised in late contexts', () => {
    const contact = contacts.find((entry) => entry.id === 'miller_mgs1')!;
    const profile = getMgs1Profile(contact.id)!;
    const context = contexts.find((entry) => entry.id === 'mgs1_rex_hangar')!;
    expect(getMgs1ContactStatusLabel(contact, profile, context, [contact.id])).toContain('LIQUID SNAKE');
  });
});
