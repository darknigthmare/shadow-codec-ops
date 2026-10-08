import type { CodecCanonStatus } from './codec.types';

export interface Mgs1LocalizedText {
  en: string;
  fr: string;
}

export interface Mgs1ContactRelation {
  personId: string;
  label: string;
  detail: string;
  requiredFlags?: string[];
}

export interface Mgs1IdentityVariant {
  id: string;
  label: string;
  requiredFlags: string[];
}

export interface Mgs1ContactProfile {
  id: string;
  personId: string;
  displayName: string;
  codename: string;
  birthYear?: number | null;
  affiliations: string[];
  role: string;
  canonStatus: CodecCanonStatus;
  summary: Mgs1LocalizedText;
  biography: Mgs1LocalizedText;
  relations: Mgs1ContactRelation[];
  chapterAvailability: string[];
  topics: string[];
  incomingTriggers: string[];
  revealState: 'public' | 'progressive' | 'discovered' | 'discoverable' | 'masked_identity' | 'unknown_then_revealed';
  identityVariants?: Mgs1IdentityVariant[];
  loreNotes: string[];
}

export interface Mgs1ContactDiscoverySummary {
  availableChapters: number;
  totalTopics: number;
  discoveredTopics: number;
  totalConversations: number;
  heardConversations: number;
  completionPercent: number;
}

export interface Mgs1IncomingScheduleEntry {
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

export interface Mgs1ConversationCoverageSummary {
  total: number;
  byContact: Record<string, number>;
  bySubject: Record<string, number>;
  proverbCount: number;
  weaponCount: number;
  bossIntelCount: number;
  chapterIncomingCount: number;
}

export interface Mgs1ZoneEntry { id: string; name: string; nameFr: string; contextId: string; summary: Mgs1LocalizedText; tags: string[]; }
export interface Mgs1ItemEntry { id: string; name: string; nameFr: string; category: 'weapon' | 'equipment' | 'consumable' | 'mission'; summary: Mgs1LocalizedText; expertContactIds: string[]; }
export interface Mgs1TimelineEntry { id: string; title: string; titleFr: string; contextId: string; requiredFlags: string[]; summary: Mgs1LocalizedText; }
export interface Mgs1PortraitSet { contactId: string; label: string; expressions: string[]; storyVariants: string[]; }
