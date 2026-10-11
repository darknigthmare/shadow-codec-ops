import profilesJson from '../data/mgs2ContactProfiles.json';
import incomingJson from '../data/mgs2IncomingSchedule.json';
import itemsJson from '../data/mgs2Items.json';
import portraitsJson from '../data/mgs2PortraitSets.json';
import timelineJson from '../data/mgs2Timeline.json';
import zonesJson from '../data/mgs2Zones.json';
import type { CallHistoryEntry, ConversationDefinition } from '../types/codec.types';
import type { Mgs2ContactProfile, Mgs2IncomingScheduleEntry, Mgs2ItemEntry, Mgs2PortraitSet, Mgs2TimelineEntry, Mgs2ZoneEntry } from '../types/mgs2Profile.types';

const profiles = profilesJson as Mgs2ContactProfile[];
const incoming = incomingJson as Mgs2IncomingScheduleEntry[];
const items = itemsJson as Mgs2ItemEntry[];
const portraits = portraitsJson as Mgs2PortraitSet[];
const timeline = timelineJson as Mgs2TimelineEntry[];
const zones = zonesJson as Mgs2ZoneEntry[];

export function getMgs2Profiles(): Mgs2ContactProfile[] { return profiles; }
export function getMgs2Profile(contactId?: string): Mgs2ContactProfile | undefined { return profiles.find((entry) => entry.id === contactId); }
export function getMgs2Items(): Mgs2ItemEntry[] { return items; }
export function getMgs2ItemsForContact(contactId: string): Mgs2ItemEntry[] { return items.filter((entry) => entry.expertContactIds.includes(contactId)); }
export function getMgs2PortraitSets(): Mgs2PortraitSet[] { return portraits; }
export function getMgs2Timeline(): Mgs2TimelineEntry[] { return timeline; }
export function getMgs2Zones(): Mgs2ZoneEntry[] { return zones; }
export function getMgs2ZoneForContext(contextId: string): Mgs2ZoneEntry | undefined { return zones.find((entry) => entry.contextId === contextId); }

export function resolveMgs2IdentityLabel(profile: Mgs2ContactProfile, flags: string[]): string {
  return [...(profile.identityVariants ?? [])].reverse().find((entry) => entry.requiredFlags.every((flag) => flags.includes(flag)))?.label ?? profile.codename;
}

export function getMgs2ScheduledIncomingForContext(contextId: string, completedIds: string[]): Mgs2IncomingScheduleEntry[] {
  const completed = new Set(completedIds);
  return incoming.filter((entry) => entry.contextId === contextId && (!entry.once || !completed.has(entry.id))).sort((a, b) => a.delayMs - b.delayMs);
}

export function getMgs2TimelineState(contextId: string, flags: string[]): Array<Mgs2TimelineEntry & { active: boolean; complete: boolean }> {
  const activeIndex = timeline.findIndex((entry) => entry.contextId === contextId);
  return timeline.map((entry, index) => ({
    ...entry,
    active: entry.contextId === contextId,
    complete: entry.requiredFlags.every((flag) => flags.includes(flag)) || (activeIndex >= 0 && index < activeIndex)
  }));
}

export function getMgs2DiscoverySummary(profile: Mgs2ContactProfile, conversations: ConversationDefinition[], history: CallHistoryEntry[]) {
  const relevant = conversations.filter((entry) => entry.contactId === profile.id);
  const heard = new Set(history.filter((entry) => entry.contactId === profile.id && entry.disposition === 'completed').map((entry) => entry.conversationId));
  const topics = new Set(relevant.map((entry) => entry.subjectId).filter(Boolean));
  return {
    totalConversations: relevant.length,
    heardConversations: relevant.filter((entry) => heard.has(entry.id)).length,
    totalTopics: topics.size,
    completionPercent: relevant.length ? Math.round((relevant.filter((entry) => heard.has(entry.id)).length / relevant.length) * 100) : 0
  };
}

export function getMgs2Coverage(conversations: ConversationDefinition[]) {
  const relevant = conversations.filter((entry) => entry.era === 'mgs2');
  return { contacts: profiles.length, conversations: relevant.length, contexts: new Set(profiles.flatMap((entry) => entry.chapterAvailability)).size, incomingCalls: incoming.length, zones: zones.length, items: items.length, timelineEvents: timeline.length };
}
