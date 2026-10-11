import type { CodecCanonStatus } from './codec.types';
export interface Mgs3LocalizedText { en: string; fr: string }
export interface Mgs3ContactProfile { id:string; personId:string; displayName:string; codename:string; affiliations:string[]; role:string; canonStatus:CodecCanonStatus; summary:Mgs3LocalizedText; biography:Mgs3LocalizedText; relations:Array<{personId:string;label:string;detail:string}>; chapterAvailability:string[]; topics:string[]; incomingTriggers:string[]; identityVariants?:Array<{id:string;label:string;requiredFlags:string[]}>; loreNotes:string[] }
export interface Mgs3IncomingScheduleEntry { id:string; contextId:string; contactId:string; conversationId:string; priority:'routine'|'priority'|'urgent'; required:boolean; delayMs:number; once:boolean; sourceLabel:string }
export interface Mgs3ZoneEntry { id:string; name:string; nameFr:string; contextId:string; summary:Mgs3LocalizedText; tags:string[] }
export interface Mgs3ItemEntry { id:string; name:string; nameFr:string; category:'weapon'|'equipment'|'food'|'medical'|'mission'; summary:Mgs3LocalizedText; expertContactIds:string[] }
export interface Mgs3TimelineEntry { id:string; title:string; titleFr:string; contextId:string; requiredFlags:string[]; summary:Mgs3LocalizedText }
export interface Mgs3PortraitSet { contactId:string; label:string; expressions:string[]; storyVariants:string[] }
