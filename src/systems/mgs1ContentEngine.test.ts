import { describe, expect, it } from 'vitest';
import conversationsJson from '../data/conversations.json';
import contextsJson from '../data/codecContexts.json';
import contactsJson from '../data/contacts.json';
import type { CallHistoryEntry, CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import { getMgs1DiscoverySummary, getMgs1Profile, getMgs1Profiles, getMgs1ContactStatusLabel, getMgs1VisibleStoryVariants, resolveMgs1IdentityLabel, resolveMgs1StoryVariant } from './mgs1ContentEngine';

const conversations = conversationsJson as ConversationDefinition[];
const contexts = contextsJson as CodecContextDefinition[];
const contacts = contactsJson as ContactDefinition[];

describe('MGS1 content engine', () => {
  it('contains the principal support and event MGS1 Codec profiles', () => {
    expect(getMgs1Profiles()).toHaveLength(10);
    expect(getMgs1Profiles().map((profile) => profile.id)).toEqual(expect.arrayContaining([
      'campbell_mgs1', 'mei_ling_mgs1', 'naomi_mgs1', 'otacon_mgs1',
      'nastasha_mgs1', 'miller_mgs1', 'meryl_mgs1', 'deepthroat_mgs1',
      'houseman_mgs1', 'sniper_wolf_mgs1'
    ]));
  });

  it('uses real local portraits and non-canonical incoming routes for event contacts', () => {
    const mgs1Contacts = contacts.filter((contact) => contact.era === 'mgs1');
    expect(mgs1Contacts.every((contact) => contact.portrait.startsWith('/portraits/mgs1/'))).toBe(true);
    expect(mgs1Contacts.every((contact) => !contact.portrait.includes('placeholder_'))).toBe(true);

    for (const contactId of ['houseman_mgs1', 'sniper_wolf_mgs1']) {
      const contact = mgs1Contacts.find((entry) => entry.id === contactId)!;
      expect(contact.manualCallAllowed).toBe(false);
      expect(contact.incomingCallAllowed).toBe(true);
      expect(contact.frequencyKind).toBe('incoming_only');
      expect(contact.frequencyVariants?.every((variant) => variant.canonical === false)).toBe(true);
    }
  });

  it('keeps every principal support profile synchronized with underground_base', () => {
    const eventContactIds = new Set(['houseman_mgs1', 'sniper_wolf_mgs1']);
    const supportProfiles = getMgs1Profiles().filter((profile) => !eventContactIds.has(profile.id));
    expect(supportProfiles.every((profile) => profile.chapterAvailability.includes('mgs1_underground_base'))).toBe(true);
  });

  it('routes story portrait variants from chapter flags without revealing Gray Fox early', () => {
    const underground = contexts.find((entry) => entry.id === 'mgs1_underground_base')!;
    const snowfield = contexts.find((entry) => entry.id === 'mgs1_snowfield')!;
    const escape = contexts.find((entry) => entry.id === 'mgs1_escape')!;
    const nuclearStorage = contexts.find((entry) => entry.id === 'mgs1_nuclear_storage')!;
    const commTower = contexts.find((entry) => entry.id === 'mgs1_comm_tower')!;
    const rexHangar = contexts.find((entry) => entry.id === 'mgs1_rex_hangar')!;

    expect(resolveMgs1StoryVariant('naomi_mgs1', underground.id, underground.flags)).toBe('restricted');
    expect(resolveMgs1StoryVariant('miller_mgs1', rexHangar.id, rexHangar.flags)).toBe('liquid_revealed');
    expect(resolveMgs1StoryVariant('meryl_mgs1', snowfield.id, snowfield.flags)).toBe('injured');
    expect(resolveMgs1StoryVariant('meryl_mgs1', escape.id, escape.flags)).toBe('escape');
    expect(resolveMgs1StoryVariant('deepthroat_mgs1', nuclearStorage.id, nuclearStorage.flags)).toBe('unknown_signal');
    expect(resolveMgs1StoryVariant('deepthroat_mgs1', commTower.id, commTower.flags)).toBe('deepthroat');
    expect(resolveMgs1StoryVariant('deepthroat_mgs1', rexHangar.id, rexHangar.flags)).toBe('gray_fox');

    const deepthroat = getMgs1Profile('deepthroat_mgs1')!;
    expect(getMgs1VisibleStoryVariants(deepthroat, nuclearStorage.id, nuclearStorage.flags)).toEqual(['unknown_signal']);
    expect(getMgs1VisibleStoryVariants(deepthroat, commTower.id, commTower.flags)).not.toContain('gray_fox');
    expect(getMgs1VisibleStoryVariants(deepthroat, rexHangar.id, rexHangar.flags)).toContain('gray_fox');
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
