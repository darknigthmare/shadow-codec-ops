import { describe, expect, it } from 'vitest';
import conversationsJson from '../data/conversations.json';
import contextsJson from '../data/codecContexts.json';
import contactsJson from '../data/contacts.json';
import type { ConversationDefinition, CodecContextDefinition, ContactDefinition } from '../types/codec.types';
import { getMgs1ConversationCoverage, getMgs1IncomingSchedule, getMgs1ScheduledIncomingForContext } from './mgs1ContentEngine';

const conversations = conversationsJson as ConversationDefinition[];
const contexts = contextsJson as CodecContextDefinition[];
const contacts = contactsJson as ContactDefinition[];

describe('MGS1-B content expansion', () => {
  it('provides a scheduled incoming call for every MGS1 chapter context', () => {
    const schedule = getMgs1IncomingSchedule();
    const mgs1Contexts = contexts.filter((context) => context.era === 'mgs1');
    expect(new Set(schedule.map((entry) => entry.contextId))).toEqual(new Set(mgs1Contexts.map((context) => context.id)));
    schedule.forEach((entry) => {
      expect(contacts.some((contact) => contact.id === entry.contactId)).toBe(true);
      expect(conversations.some((conversation) => conversation.id === entry.conversationId)).toBe(true);
    });
  });

  it('does not return completed one-shot chapter calls', () => {
    const first = getMgs1ScheduledIncomingForContext('mgs1_insertion', []);
    expect(first).toHaveLength(1);
    expect(getMgs1ScheduledIncomingForContext('mgs1_insertion', [first[0].id])).toHaveLength(0);
  });

  it('contains broad MGS1 conversation coverage', () => {
    const coverage = getMgs1ConversationCoverage(conversations);
    expect(coverage.total).toBeGreaterThanOrEqual(130);
    expect(coverage.proverbCount).toBeGreaterThanOrEqual(20);
    expect(coverage.weaponCount).toBeGreaterThanOrEqual(10);
    expect(coverage.bossIntelCount).toBeGreaterThanOrEqual(9);
    expect(coverage.chapterIncomingCount).toBe(14);
    expect(Object.keys(coverage.byContact)).toHaveLength(10);
  });
});
