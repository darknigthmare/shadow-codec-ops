import type { CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import { getMgs1IncomingSchedule } from './mgs1ContentEngine';
import { getMgs1Items, getMgs1PortraitSets, getMgs1Timeline, getMgs1Zones } from './mgs1Encyclopedia';
import { getMgs1Profiles } from './mgs1ContentEngine';

export interface Mgs1AuditResult {
  passed: boolean;
  issues: string[];
  metrics: Record<string, number>;
}

export function auditMgs1Codec(
  contacts: ContactDefinition[],
  conversations: ConversationDefinition[],
  contexts: CodecContextDefinition[]
): Mgs1AuditResult {
  const issues: string[] = [];
  const profiles = getMgs1Profiles();
  const mgs1Contacts = contacts.filter((entry) => entry.era === 'mgs1');
  const mgs1Conversations = conversations.filter((entry) => entry.era === 'mgs1');
  const mgs1Contexts = contexts.filter((entry) => entry.era === 'mgs1');
  const schedules = getMgs1IncomingSchedule();

  profiles.forEach((profile) => {
    const contact = mgs1Contacts.find((entry) => entry.id === profile.id);
    const contactConversations = mgs1Conversations.filter((entry) => entry.contactId === profile.id);
    if (!contact) issues.push(`Missing contact: ${profile.id}`);
    const minimumConversationCount = contact?.manualCallAllowed === false ? 1 : 4;
    if (contactConversations.length < minimumConversationCount) issues.push(`Insufficient conversations: ${profile.id}`);
    if (!profile.topics.length) issues.push(`Missing topics: ${profile.id}`);
    if (!profile.chapterAvailability.length) issues.push(`Missing chapters: ${profile.id}`);
  });

  mgs1Contexts.forEach((context) => {
    if (!schedules.some((entry) => entry.contextId === context.id)) issues.push(`Missing chapter call: ${context.id}`);
  });

  return {
    passed: issues.length === 0,
    issues,
    metrics: {
      contacts: mgs1Contacts.length,
      profiles: profiles.length,
      conversations: mgs1Conversations.length,
      contexts: mgs1Contexts.length,
      scheduledCalls: schedules.length,
      zones: getMgs1Zones().length,
      items: getMgs1Items().length,
      timelineEvents: getMgs1Timeline().length,
      portraitSets: getMgs1PortraitSets().length
    }
  };
}
