import type { CodecCanonStatus } from './codec.types';

export interface Mgs2LocalizedText { en: string; fr: string }
export interface Mgs2Relation { personId: string; label: string; detail: string }
export interface Mgs2IdentityVariant { id: string; label: string; requiredFlags: string[] }

export interface Mgs2ContactProfile {
  id: string;
  personId: string;
  displayName: string;
  codename: string;
  affiliations: string[];
  role: string;
  canonStatus: CodecCanonStatus;
  summary: Mgs2LocalizedText;
  biography: Mgs2LocalizedText;
  relations: Mgs2Relation[];
  chapterAvailability: string[];
  topics: string[];
  incomingTriggers: string[];
  identityVariants?: Mgs2IdentityVariant[];
  loreNotes: string[];
}

export interface Mgs2IncomingScheduleEntry {
  id: string;
  contextId: string;
  contactId: string;
  conversationId: string;
  priority: 'routine' | 'priority' | 'urgent';
  required: boolean;
  delayMs: number;
  once: boolean;
  sourceLabel: string;
}

export interface Mgs2ZoneEntry { id: string; name: string; nameFr: string; contextId: string; summary: Mgs2LocalizedText; tags: string[] }
export interface Mgs2ItemEntry { id: string; name: string; nameFr: string; category: 'weapon' | 'equipment' | 'mission'; summary: Mgs2LocalizedText; expertContactIds: string[] }
export interface Mgs2TimelineEntry { id: string; title: string; titleFr: string; contextId: string; requiredFlags: string[]; summary: Mgs2LocalizedText }
export interface Mgs2PortraitSet { contactId: string; label: string; expressions: string[]; storyVariants: string[] }
