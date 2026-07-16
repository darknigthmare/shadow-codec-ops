import profilesJson from '../data/mgs1ContactProfiles.json';
import type { CallHistoryEntry, CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import type { Mgs1ContactDiscoverySummary, Mgs1ContactProfile } from '../types/mgs1Profile.types';

const profiles = profilesJson as Mgs1ContactProfile[];

export function getMgs1Profiles(): Mgs1ContactProfile[] {
  return profiles;
}

export function getMgs1Profile(contactId: string | undefined): Mgs1ContactProfile | undefined {
  return contactId ? profiles.find((profile) => profile.id === contactId) : undefined;
}

export function resolveMgs1IdentityLabel(profile: Mgs1ContactProfile, flags: string[]): string {
  const variants = profile.identityVariants ?? [];
  const matching = [...variants]
    .reverse()
    .find((variant) => variant.requiredFlags.every((flag) => flags.includes(flag)));
  return matching?.label ?? profile.codename;
}

export function resolveMgs1StoryVariant(
  contactId: string | undefined,
  contextId: string,
  flags: readonly string[]
): string | undefined {
  if (!contactId) return undefined;
  if (contactId === 'naomi_mgs1') {
    return flags.includes('late_operation') || flags.includes('naomi_restricted') ? 'restricted' : 'medical_support';
  }
  if (contactId === 'miller_mgs1') {
    return flags.includes('miller_identity_revealed') ? 'liquid_revealed' : 'master_miller';
  }
  if (contactId === 'meryl_mgs1') {
    if (flags.includes('escape_sequence') || contextId === 'mgs1_escape') return 'escape';
    return flags.includes('meryl_injured') ? 'injured' : 'field_contact';
  }
  if (contactId === 'deepthroat_mgs1') {
    if (flags.includes('gray_fox_identity_revealed')) return 'gray_fox';
    if (contextId === 'mgs1_nuclear_storage' || !flags.includes('deepthroat_signal_detected')) return 'unknown_signal';
    return 'deepthroat';
  }
  return undefined;
}

export function getMgs1VisibleStoryVariants(
  profile: Mgs1ContactProfile,
  contextId: string,
  flags: readonly string[]
): string[] {
  const activeVariant = resolveMgs1StoryVariant(profile.id, contextId, flags);
  switch (profile.id) {
    case 'naomi_mgs1':
      return activeVariant === 'restricted' ? ['medical_support', 'restricted'] : ['medical_support'];
    case 'miller_mgs1':
      return activeVariant === 'liquid_revealed' ? ['master_miller', 'liquid_revealed'] : ['master_miller'];
    case 'meryl_mgs1':
      if (activeVariant === 'escape') return ['field_contact', 'injured', 'escape'];
      return activeVariant === 'injured' ? ['field_contact', 'injured'] : ['field_contact'];
    case 'deepthroat_mgs1':
      if (activeVariant === 'gray_fox') return ['unknown_signal', 'deepthroat', 'gray_fox'];
      return activeVariant === 'deepthroat' ? ['unknown_signal', 'deepthroat'] : ['unknown_signal'];
    default:
      return ['default'];
  }
}

export function isMgs1ProfileAvailableInContext(profile: Mgs1ContactProfile, contextId: string): boolean {
  return profile.chapterAvailability.includes(contextId);
}

export function getMgs1ProfileTopics(
  profile: Mgs1ContactProfile,
  conversations: ConversationDefinition[],
  contextId: string
): string[] {
  const conversationTopics = conversations
    .filter((conversation) => conversation.contactId === profile.id)
    .filter((conversation) => !conversation.contextIds?.length || conversation.contextIds.includes(contextId))
    .map((conversation) => conversation.subjectId)
    .filter((topic): topic is string => Boolean(topic));
  return [...new Set([...profile.topics, ...conversationTopics])];
}

export function getMgs1DiscoverySummary(
  profile: Mgs1ContactProfile,
  conversations: ConversationDefinition[],
  history: CallHistoryEntry[],
  contextId: string
): Mgs1ContactDiscoverySummary {
  const relevant = conversations.filter((conversation) => conversation.contactId === profile.id);
  const heardIds = new Set(history.filter((entry) => entry.contactId === profile.id && entry.completed).map((entry) => entry.conversationId));
  const topics = getMgs1ProfileTopics(profile, conversations, contextId);
  const heardTopics = new Set(
    relevant
      .filter((conversation) => heardIds.has(conversation.id))
      .map((conversation) => conversation.subjectId)
      .filter((topic): topic is string => Boolean(topic))
  );
  const completionPercent = relevant.length ? Math.round((heardIds.size / relevant.length) * 100) : 0;
  return {
    availableChapters: profile.chapterAvailability.length,
    totalTopics: topics.length,
    discoveredTopics: heardTopics.size,
    totalConversations: relevant.length,
    heardConversations: relevant.filter((conversation) => heardIds.has(conversation.id)).length,
    completionPercent
  };
}

export function getMgs1ContactStatusLabel(
  contact: ContactDefinition,
  profile: Mgs1ContactProfile,
  context: CodecContextDefinition,
  memoryContactIds: string[]
): string {
  if (!profile.chapterAvailability.includes(context.id)) return 'UNAVAILABLE IN THIS CHAPTER';
  if (contact.id === 'deepthroat_mgs1' && !memoryContactIds.includes(contact.id)) return 'UNKNOWN INCOMING SIGNAL';
  if (contact.id === 'miller_mgs1' && context.flags.includes('miller_identity_revealed')) return 'CHANNEL COMPROMISED — LIQUID SNAKE';
  return memoryContactIds.includes(contact.id) || contact.unlockedByDefault ? 'AVAILABLE / KNOWN' : 'DISCOVERABLE';
}

import incomingScheduleJson from '../data/mgs1IncomingSchedule.json';
import type { Mgs1ConversationCoverageSummary, Mgs1IncomingScheduleEntry } from '../types/mgs1Profile.types';

const incomingSchedule = incomingScheduleJson as Mgs1IncomingScheduleEntry[];

export function getMgs1IncomingSchedule(): Mgs1IncomingScheduleEntry[] {
  return incomingSchedule;
}

export function getMgs1ScheduledIncomingForContext(
  contextId: string,
  completedIds: string[]
): Mgs1IncomingScheduleEntry[] {
  const completed = new Set(completedIds);
  return incomingSchedule
    .filter((entry) => entry.contextId === contextId)
    .filter((entry) => !entry.once || !completed.has(entry.id))
    .sort((a, b) => a.delayMs - b.delayMs);
}

export function getMgs1ConversationCoverage(conversations: ConversationDefinition[]): Mgs1ConversationCoverageSummary {
  const relevant = conversations.filter((conversation) => conversation.era === 'mgs1');
  const byContact: Record<string, number> = {};
  const bySubject: Record<string, number> = {};
  relevant.forEach((conversation) => {
    byContact[conversation.contactId] = (byContact[conversation.contactId] ?? 0) + 1;
    const subject = conversation.subjectId ?? 'unspecified';
    bySubject[subject] = (bySubject[subject] ?? 0) + 1;
  });
  return {
    total: relevant.length,
    byContact,
    bySubject,
    proverbCount: relevant.filter((conversation) => conversation.contactId === 'mei_ling_mgs1' && conversation.subjectId === 'proverb').length,
    weaponCount: relevant.filter((conversation) => conversation.contactId === 'nastasha_mgs1' && !['area_report', 'equipment_check', 'nuclear', 'weapons'].includes(conversation.subjectId ?? '')).length,
    bossIntelCount: relevant.filter((conversation) => conversation.id.startsWith('mgs1_boss_intel_')).length,
    chapterIncomingCount: incomingSchedule.length
  };
}
