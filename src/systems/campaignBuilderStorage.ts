import contactsJson from '../data/contacts.json';
import loreJson from '../data/loreEntries.json';
import missionsJson from '../data/missions.json';
import tapesJson from '../data/tapes.json';
import vrMissionsJson from '../data/vrMissions.json';
import type {
  CampaignBuilderDocument,
  CampaignBuilderExportResult,
  CampaignBuilderLibrary,
  CampaignBuilderValidationIssue,
  CampaignContentPackManifest
} from '../types/campaignBuilder.types';
import type {
  CampaignChapterDefinition,
  CampaignCondition,
  CampaignDefinition,
  CampaignModule,
  CampaignNodeDefinition,
  CampaignRank,
  CampaignReward,
  CampaignNarrativeEventDefinition,
  CampaignNarrativeTrigger,
  CampaignPresentationDefinition,
  CampaignVariableMutation,
  CampaignVariableValue
} from '../types/campaign.types';
import type { EraId } from '../types/codec.types';
import { loadJson, saveJson } from './saveEngine';
import { loadPlayableBuilderDocuments } from './missionBuilderStorage';

export const CAMPAIGN_BUILDER_LIBRARY_KEY = 'campaign-builder-library';
export const CAMPAIGN_BUILDER_PREVIEW_KEY = 'campaign-builder-preview-id';

const VALID_ERAS: Array<EraId | 'multi'> = ['msx', 'mgs1', 'mgs2', 'mgs3', 'mgs4', 'peace_walker', 'mgsv', 'vr_simulation', 'patriots_ai', 'multi'];
const VALID_MODULES: CampaignModule[] = ['campaign', 'codec', 'sideops', 'vr', 'tapes', 'lore'];
const VALID_RANKS: CampaignRank[] = ['ROOKIE', 'RAT', 'DOBERMAN', 'HOUND', 'FOX', 'FOXHOUND', 'BIG BOSS'];
const missionIds = new Set((missionsJson as Array<{ id: string }>).map((entry) => entry.id));
const vrMissionIds = new Set((vrMissionsJson as Array<{ id: string }>).map((entry) => entry.id));
const tapeIds = new Set((tapesJson as Array<{ id: string }>).map((entry) => entry.id));
const contactIds = new Set((contactsJson as Array<{ id: string }>).map((entry) => entry.id));
const loreIds = new Set((loreJson as Array<{ id: string }>).map((entry) => entry.id));

function nowIso(): string {
  return new Date().toISOString();
}

function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function safeId(value: string, fallback: string): string {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 72);
  return normalized || fallback;
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map((entry) => String(entry ?? '').trim()).filter(Boolean)));
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? unique(value.map(String)) : [];
}

function toNumber(value: unknown, fallback = 0, minimum = 0, maximum = 999999): number {
  const parsed = Number(value);
  return Math.min(maximum, Math.max(minimum, Number.isFinite(parsed) ? parsed : fallback));
}


function normalizeVariableValue(value: unknown): CampaignVariableValue {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  return String(value ?? '').slice(0, 400);
}

function normalizePresentation(value: unknown, fallbackId: string): CampaignPresentationDefinition | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const presentation = value as Record<string, unknown>;
  const title = String(presentation.title ?? '').trim();
  if (!title) return undefined;
  const beats = Array.isArray(presentation.beats)
    ? presentation.beats.slice(0, 24).flatMap((beat) => {
      if (!beat || typeof beat !== 'object') return [];
      const raw = beat as Record<string, unknown>;
      const text = String(raw.text ?? '').trim();
      if (!text) return [];
      return [{
        speaker: raw.speaker ? String(raw.speaker).slice(0, 80) : undefined,
        text: text.slice(0, 1200),
        emphasis: ['normal', 'quiet', 'urgent', 'classified'].includes(String(raw.emphasis))
          ? raw.emphasis as 'normal' | 'quiet' | 'urgent' | 'classified'
          : 'normal'
      }];
    })
    : undefined;
  return {
    id: safeId(String(presentation.id ?? ''), fallbackId),
    eyebrow: presentation.eyebrow ? String(presentation.eyebrow).slice(0, 100) : undefined,
    title: title.slice(0, 140),
    subtitle: presentation.subtitle ? String(presentation.subtitle).slice(0, 220) : undefined,
    body: presentation.body ? String(presentation.body).slice(0, 2400) : undefined,
    speaker: presentation.speaker ? String(presentation.speaker).slice(0, 100) : undefined,
    tone: ['briefing', 'debriefing', 'warning', 'choice', 'heroic', 'neutral', 'dark', 'secret', 'system'].includes(String(presentation.tone))
      ? presentation.tone as CampaignPresentationDefinition['tone']
      : 'neutral',
    beats,
    confirmLabel: presentation.confirmLabel ? String(presentation.confirmLabel).slice(0, 80) : undefined,
    skippable: presentation.skippable === undefined ? true : Boolean(presentation.skippable)
  };
}

function normalizeVariableMutations(value: unknown): CampaignVariableMutation[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 32).flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return [];
    const raw = entry as Record<string, unknown>;
    const variable = String(raw.variable ?? '').trim().slice(0, 120);
    if (!variable) return [];
    const operation = ['set', 'increment', 'decrement', 'toggle'].includes(String(raw.operation))
      ? raw.operation as CampaignVariableMutation['operation']
      : 'set';
    return [{ variable, operation, value: raw.value === undefined ? undefined : normalizeVariableValue(raw.value) }];
  });
}

function normalizeInitialVariables(value: unknown): Record<string, CampaignVariableValue> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value as Record<string, unknown>)
    .slice(0, 80)
    .map(([key, variableValue]) => [key.trim().slice(0, 120), normalizeVariableValue(variableValue)])
    .filter(([key]) => Boolean(key)));
}

function normalizeNarrativeEvent(value: unknown, index: number): CampaignNarrativeEventDefinition | null {
  if (!value || typeof value !== 'object') return null;
  const event = value as Record<string, unknown>;
  const presentation = normalizePresentation(event.presentation, `narrative_presentation_${index + 1}`);
  if (!presentation) return null;
  const validTriggers: CampaignNarrativeTrigger[] = ['campaign_start', 'campaign_complete', 'chapter_start', 'chapter_complete', 'node_complete', 'branch_choice', 'ending_achieved', 'variable_condition'];
  return {
    id: safeId(String(event.id ?? ''), `narrative_event_${index + 1}`),
    trigger: validTriggers.includes(event.trigger as CampaignNarrativeTrigger) ? event.trigger as CampaignNarrativeTrigger : 'campaign_start',
    targetId: event.targetId ? String(event.targetId).slice(0, 160) : undefined,
    condition: event.condition ? normalizeCondition(event.condition) : undefined,
    once: event.once === undefined ? true : Boolean(event.once),
    presentation,
    variableEffects: normalizeVariableMutations(event.variableEffects)
  };
}

function normalizeReward(value: unknown): CampaignReward {
  const reward = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const resources = reward.resources && typeof reward.resources === 'object' ? reward.resources as Record<string, unknown> : {};
  return {
    xp: toNumber(reward.xp, 0, 0, 100000),
    resources: {
      commandPoints: toNumber(resources.commandPoints, 0),
      intel: toNumber(resources.intel, 0),
      supplies: toNumber(resources.supplies, 0),
      credits: toNumber(resources.credits, 0)
    },
    unlockMissionIds: toStringArray(reward.unlockMissionIds),
    unlockVrMissionIds: toStringArray(reward.unlockVrMissionIds),
    unlockTapeIds: toStringArray(reward.unlockTapeIds),
    unlockContactIds: toStringArray(reward.unlockContactIds),
    unlockLoreIds: toStringArray(reward.unlockLoreIds),
    badges: toStringArray(reward.badges)
  };
}

function normalizeCondition(value: unknown): CampaignCondition {
  const condition = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const type = String(condition.type ?? 'all_prerequisites');
  if (type === 'codec_call') return { type, contactId: String(condition.contactId ?? ''), conversationId: condition.conversationId ? String(condition.conversationId) : undefined };
  if (type === 'sideops_clear') return { type, missionId: String(condition.missionId ?? ''), minimumRank: VALID_RANKS.includes(condition.minimumRank as CampaignRank) ? condition.minimumRank as CampaignRank : undefined };
  if (type === 'vr_clear') return { type, missionId: String(condition.missionId ?? ''), minimumRank: VALID_RANKS.includes(condition.minimumRank as CampaignRank) ? condition.minimumRank as CampaignRank : undefined };
  if (type === 'tape_listened') return { type, tapeId: String(condition.tapeId ?? '') };
  if (type === 'lore_viewed') return { type, loreId: String(condition.loreId ?? '') };
  if (type === 'resource_minimum') {
    const resource = ['commandPoints', 'intel', 'supplies', 'credits'].includes(String(condition.resource))
      ? String(condition.resource) as 'commandPoints' | 'intel' | 'supplies' | 'credits'
      : 'intel';
    return { type, resource, amount: toNumber(condition.amount, 1, 1, 999999) };
  }
  if (type === 'badge_owned') return { type, badge: String(condition.badge ?? '') };
  if (type === 'variable_compare') {
    const operator = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'].includes(String(condition.operator))
      ? condition.operator as 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
      : 'eq';
    return { type, variable: String(condition.variable ?? '').slice(0, 120), operator, value: normalizeVariableValue(condition.value) };
  }
  return { type: 'all_prerequisites' };
}

function normalizeNode(value: unknown, index: number): CampaignNodeDefinition {
  const node = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const module = VALID_MODULES.includes(node.module as CampaignModule) ? node.module as CampaignModule : 'campaign';
  const era = VALID_ERAS.includes(node.era as EraId | 'multi') ? node.era as EraId | 'multi' : 'multi';
  const branch = node.branch && typeof node.branch === 'object' ? node.branch as Record<string, unknown> : null;
  const ending = node.ending && typeof node.ending === 'object' ? node.ending as Record<string, unknown> : null;
  const layout = node.layout && typeof node.layout === 'object' ? node.layout as Record<string, unknown> : {};
  return {
    id: safeId(String(node.id ?? ''), `campaign_node_${index + 1}`),
    title: String(node.title ?? `Campaign Node ${index + 1}`).slice(0, 120),
    description: String(node.description ?? 'Campaign operation node.').slice(0, 800),
    module,
    targetId: node.targetId ? String(node.targetId).slice(0, 120) : undefined,
    era,
    optional: Boolean(node.optional),
    prerequisites: toStringArray(node.prerequisites),
    condition: normalizeCondition(node.condition),
    additionalConditions: Array.isArray(node.additionalConditions) ? node.additionalConditions.map(normalizeCondition) : [],
    conditionLogic: node.conditionLogic === 'any' ? 'any' : 'all',
    reward: normalizeReward(node.reward),
    layout: {
      x: toNumber(layout.x, 80 + (index % 4) * 250, 0, 4000),
      y: toNumber(layout.y, 80 + Math.floor(index / 4) * 180, 0, 3000)
    },
    branch: branch && String(branch.groupId ?? '').trim() && String(branch.optionId ?? '').trim() ? {
      groupId: safeId(String(branch.groupId), 'branch_group'),
      optionId: safeId(String(branch.optionId), 'option'),
      label: String(branch.label ?? branch.optionId ?? 'Branch Option').slice(0, 100),
      description: branch.description ? String(branch.description).slice(0, 400) : undefined,
      choicePresentation: normalizePresentation(branch.choicePresentation, `branch_choice_${index + 1}`),
      consequenceText: branch.consequenceText ? String(branch.consequenceText).slice(0, 600) : undefined
    } : undefined,
    ending: ending && String(ending.id ?? '').trim() ? {
      id: safeId(String(ending.id), `ending_${index + 1}`),
      title: String(ending.title ?? 'Campaign Ending').slice(0, 120),
      summary: String(ending.summary ?? 'Alternative campaign ending.').slice(0, 800),
      tone: ['heroic', 'neutral', 'dark', 'secret'].includes(String(ending.tone)) ? ending.tone as 'heroic' | 'neutral' | 'dark' | 'secret' : 'neutral',
      epilogue: normalizePresentation(ending.epilogue, `ending_epilogue_${index + 1}`)
    } : undefined,
    completionPresentation: normalizePresentation(node.completionPresentation, `node_completion_${index + 1}`),
    variableEffects: normalizeVariableMutations(node.variableEffects)
  };
}

function normalizeChapter(value: unknown, index: number): CampaignChapterDefinition {
  const chapter = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const nodes = Array.isArray(chapter.nodes) ? chapter.nodes.map(normalizeNode) : [];
  return {
    id: safeId(String(chapter.id ?? ''), `chapter_${index + 1}`),
    title: String(chapter.title ?? `Chapter ${index + 1}`).slice(0, 120),
    subtitle: String(chapter.subtitle ?? 'Campaign operations branch').slice(0, 180),
    description: String(chapter.description ?? 'Editable campaign chapter.').slice(0, 800),
    briefing: normalizePresentation(chapter.briefing, `chapter_briefing_${index + 1}`),
    debriefing: normalizePresentation(chapter.debriefing, `chapter_debriefing_${index + 1}`),
    nodes
  };
}

export function sanitizeCampaignBuilderDocument(value: unknown, fallbackSequence = 1): CampaignBuilderDocument {
  const document = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const timestamp = nowIso();
  const initialUnlocks = document.initialUnlocks && typeof document.initialUnlocks === 'object' ? document.initialUnlocks as Record<string, unknown> : {};
  const chapters = Array.isArray(document.chapters) ? document.chapters.map(normalizeChapter) : [];
  return {
    schemaVersion: 2,
    id: safeId(String(document.id ?? ''), `custom_campaign_${String(fallbackSequence).padStart(3, '0')}`),
    title: String(document.title ?? `Custom Campaign ${String(fallbackSequence).padStart(3, '0')}`).slice(0, 120),
    subtitle: String(document.subtitle ?? 'Branching tactical operations').slice(0, 180),
    description: String(document.description ?? 'Campaign created in the Campaign Builder.').slice(0, 1000),
    era: VALID_ERAS.includes(document.era as EraId | 'multi') ? document.era as EraId | 'multi' : 'multi',
    author: String(document.author ?? 'Darknigthmare').slice(0, 100),
    version: String(document.version ?? '1.0.0').slice(0, 40),
    published: Boolean(document.published),
    briefing: normalizePresentation(document.briefing, `campaign_briefing_${fallbackSequence}`),
    debriefing: normalizePresentation(document.debriefing, `campaign_debriefing_${fallbackSequence}`),
    initialVariables: normalizeInitialVariables(document.initialVariables),
    narrativeEvents: Array.isArray(document.narrativeEvents) ? document.narrativeEvents.map(normalizeNarrativeEvent).filter((entry): entry is CampaignNarrativeEventDefinition => Boolean(entry)) : [],
    initialUnlocks: {
      missionIds: toStringArray(initialUnlocks.missionIds),
      vrMissionIds: toStringArray(initialUnlocks.vrMissionIds),
      tapeIds: toStringArray(initialUnlocks.tapeIds),
      contactIds: toStringArray(initialUnlocks.contactIds),
      loreIds: toStringArray(initialUnlocks.loreIds)
    },
    chapters: chapters.length ? chapters : [createStarterChapter()],
    createdAt: String(document.createdAt ?? timestamp),
    updatedAt: timestamp
  };
}

function createStarterChapter(): CampaignChapterDefinition {
  return {
    id: 'chapter_signal_entry',
    title: 'Chapter I — Signal Entry',
    subtitle: 'Choose an operational doctrine',
    description: 'A starter branching chapter generated by the Campaign Builder.',
    briefing: { id: 'chapter_signal_entry_briefing', title: 'Signal Entry Briefing', tone: 'briefing', speaker: 'CAMPAIGN CONTROL', body: 'Establish the network, then choose an operational doctrine.' },
    debriefing: { id: 'chapter_signal_entry_debriefing', title: 'Signal Entry Debriefing', tone: 'debriefing', speaker: 'CAMPAIGN CONTROL', body: 'The selected route and ending have been recorded.' },
    nodes: [
      {
        id: 'signal_briefing',
        title: 'Signal Briefing',
        description: 'Establish the operation network through a Codec call.',
        module: 'codec',
        targetId: 'campbell_mgs1',
        era: 'mgs1',
        prerequisites: [],
        condition: { type: 'codec_call', contactId: 'campbell_mgs1' },
        reward: { xp: 50, resources: { intel: 20 } },
        layout: { x: 80, y: 180 }
      },
      {
        id: 'doctrine_ghost',
        title: 'Ghost Doctrine',
        description: 'Commit the campaign to a stealth-focused route.',
        module: 'campaign',
        era: 'multi',
        prerequisites: ['signal_briefing'],
        condition: { type: 'all_prerequisites' },
        reward: { xp: 75, badges: ['GHOST DOCTRINE'] },
        branch: { groupId: 'operational_doctrine', optionId: 'ghost', label: 'Ghost Route', description: 'Favor stealth validation and intelligence recovery.', consequenceText: 'The assault route will be blocked.', choicePresentation: { id: 'ghost_route_choice', title: 'Ghost Route', tone: 'choice', body: 'Commit to stealth validation and intelligence recovery.' } },
        layout: { x: 380, y: 80 }
      },
      {
        id: 'doctrine_assault',
        title: 'Assault Doctrine',
        description: 'Commit the campaign to a direct action route.',
        module: 'campaign',
        era: 'multi',
        prerequisites: ['signal_briefing'],
        condition: { type: 'all_prerequisites' },
        reward: { xp: 75, badges: ['ASSAULT DOCTRINE'] },
        branch: { groupId: 'operational_doctrine', optionId: 'assault', label: 'Assault Route', description: 'Favor direct Side Ops execution and resource acquisition.', consequenceText: 'The ghost route will be blocked.', choicePresentation: { id: 'assault_route_choice', title: 'Assault Route', tone: 'choice', body: 'Commit to direct action and resource acquisition.' } },
        layout: { x: 380, y: 300 }
      },
      {
        id: 'ending_ghost_signal',
        title: 'Ending — Silent Signal',
        description: 'Achieve a FOX rank in Ghost Dock to complete the stealth ending.',
        module: 'vr',
        targetId: 'vr_ghost_dock_002',
        era: 'vr_simulation',
        prerequisites: ['doctrine_ghost'],
        condition: { type: 'vr_clear', missionId: 'vr_ghost_dock_002', minimumRank: 'FOX' },
        reward: { xp: 300, resources: { commandPoints: 2, intel: 100 }, badges: ['SILENT SIGNAL'] },
        branch: { groupId: 'operational_doctrine', optionId: 'ghost', label: 'Ghost Route' },
        ending: { id: 'silent_signal', title: 'Silent Signal', summary: 'The operation disappears from every hostile channel without a trace.', tone: 'secret', epilogue: { id: 'silent_signal_epilogue', title: 'Silent Signal', tone: 'secret', body: 'The final transmission survives only as noise between frequencies.' } },
        layout: { x: 720, y: 80 }
      },
      {
        id: 'ending_open_signal',
        title: 'Ending — Open Signal',
        description: 'Clear Tanker Hold Sabotage at HOUND rank to complete the direct action ending.',
        module: 'sideops',
        targetId: 'tanker_hold_002',
        era: 'mgs2',
        prerequisites: ['doctrine_assault'],
        condition: { type: 'sideops_clear', missionId: 'tanker_hold_002', minimumRank: 'HOUND' },
        reward: { xp: 300, resources: { commandPoints: 2, supplies: 100 }, badges: ['OPEN SIGNAL'] },
        branch: { groupId: 'operational_doctrine', optionId: 'assault', label: 'Assault Route' },
        ending: { id: 'open_signal', title: 'Open Signal', summary: 'The campaign ends with a decisive breach and an exposed enemy network.', tone: 'heroic', epilogue: { id: 'open_signal_epilogue', title: 'Open Signal', tone: 'heroic', body: 'The hostile network collapses under full tactical observation.' } },
        layout: { x: 720, y: 300 }
      }
    ]
  };
}

export function createBlankCampaignBuilderDocument(sequence = 1): CampaignBuilderDocument {
  return sanitizeCampaignBuilderDocument({
    id: `custom_campaign_${String(sequence).padStart(3, '0')}`,
    title: `Custom Campaign ${String(sequence).padStart(3, '0')}`,
    subtitle: 'Branching tactical operations',
    description: 'Editable campaign generated by the Campaign Builder.',
    author: 'Darknigthmare',
    version: '1.0.0',
    era: 'multi',
    published: false,
    briefing: { id: `custom_campaign_${String(sequence).padStart(3, '0')}_briefing`, title: 'Campaign Briefing', tone: 'briefing', speaker: 'CAMPAIGN CONTROL', body: 'A new branching operation is ready for deployment.' },
    debriefing: { id: `custom_campaign_${String(sequence).padStart(3, '0')}_debriefing`, title: 'Campaign Debriefing', tone: 'debriefing', speaker: 'CAMPAIGN CONTROL', body: 'The selected route has been archived.' },
    initialVariables: { 'story.flag': false, 'network.integrity': 100 },
    narrativeEvents: [],
    chapters: [createStarterChapter()]
  }, sequence);
}

export function loadCampaignBuilderLibrary(): CampaignBuilderLibrary {
  const fallback: CampaignBuilderLibrary = { schemaVersion: 2, documents: [createBlankCampaignBuilderDocument(1)] };
  const stored = loadJson<CampaignBuilderLibrary>(CAMPAIGN_BUILDER_LIBRARY_KEY, fallback);
  const documents = Array.isArray(stored.documents)
    ? stored.documents.map((document, index) => sanitizeCampaignBuilderDocument(document, index + 1))
    : fallback.documents;
  const activeDocumentId = documents.some((document) => document.id === stored.activeDocumentId)
    ? stored.activeDocumentId
    : documents[0]?.id;
  return { schemaVersion: 2, activeDocumentId, documents };
}

export function saveCampaignBuilderLibrary(library: CampaignBuilderLibrary): CampaignBuilderLibrary {
  const documents = library.documents.map((document, index) => sanitizeCampaignBuilderDocument(document, index + 1));
  const normalized: CampaignBuilderLibrary = {
    schemaVersion: 2,
    activeDocumentId: documents.some((document) => document.id === library.activeDocumentId) ? library.activeDocumentId : documents[0]?.id,
    documents
  };
  saveJson(CAMPAIGN_BUILDER_LIBRARY_KEY, normalized);
  return normalized;
}

export function convertCampaignBuilderDocument(document: CampaignBuilderDocument): CampaignDefinition {
  const clean = sanitizeCampaignBuilderDocument(document);
  return {
    id: clean.id,
    title: clean.title,
    subtitle: clean.subtitle,
    description: clean.description,
    era: clean.era,
    author: clean.author,
    version: clean.version,
    source: 'builder',
    published: clean.published,
    briefing: clean.briefing,
    debriefing: clean.debriefing,
    initialVariables: clean.initialVariables,
    narrativeEvents: clean.narrativeEvents,
    initialUnlocks: clean.initialUnlocks,
    chapters: clean.chapters
  };
}

export function consumeCampaignBuilderPreviewId(): string | null {
  const previewId = loadJson<string | null>(CAMPAIGN_BUILDER_PREVIEW_KEY, null);
  if (previewId) saveJson(CAMPAIGN_BUILDER_PREVIEW_KEY, null);
  return previewId;
}

export function getBuilderCampaignDefinitions(includePreview = true): CampaignDefinition[] {
  const library = loadCampaignBuilderLibrary();
  const previewId = includePreview ? loadJson<string | null>(CAMPAIGN_BUILDER_PREVIEW_KEY, null) : null;
  return library.documents
    .filter((document) => document.published || document.id === previewId)
    .map(convertCampaignBuilderDocument);
}

function knownSideOpsMissionIds(): Set<string> {
  return new Set([...missionIds, ...loadPlayableBuilderDocuments().map((document) => document.id)]);
}

function targetExists(node: CampaignNodeDefinition): boolean {
  if (!node.targetId) return node.module === 'campaign';
  if (node.module === 'sideops') return knownSideOpsMissionIds().has(node.targetId);
  if (node.module === 'vr') return vrMissionIds.has(node.targetId);
  if (node.module === 'tapes') return tapeIds.has(node.targetId);
  if (node.module === 'codec') return contactIds.has(node.targetId);
  if (node.module === 'lore') return loreIds.has(node.targetId);
  return true;
}

function conditionReferenceValid(condition: CampaignCondition): boolean {
  if (condition.type === 'sideops_clear') return knownSideOpsMissionIds().has(condition.missionId);
  if (condition.type === 'vr_clear') return vrMissionIds.has(condition.missionId);
  if (condition.type === 'tape_listened') return tapeIds.has(condition.tapeId);
  if (condition.type === 'codec_call') return contactIds.has(condition.contactId);
  if (condition.type === 'lore_viewed') return loreIds.has(condition.loreId);
  if (condition.type === 'badge_owned') return Boolean(condition.badge.trim());
  if (condition.type === 'variable_compare') return Boolean(condition.variable.trim());
  return true;
}

function graphHasCycle(nodes: CampaignNodeDefinition[]): boolean {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (id: string): boolean => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    const node = byId.get(id);
    if (node?.prerequisites.some((prerequisite) => visit(prerequisite))) return true;
    visiting.delete(id);
    visited.add(id);
    return false;
  };
  return nodes.some((node) => visit(node.id));
}

export function validateCampaignBuilderDocument(document: CampaignBuilderDocument): CampaignBuilderValidationIssue[] {
  const issues: CampaignBuilderValidationIssue[] = [];
  const chapters = document.chapters;
  const nodes = chapters.flatMap((chapter) => chapter.nodes);
  const nodeIds = new Set<string>();
  const chapterIds = new Set<string>();
  const endingIds = new Set<string>();
  const branchOptions = new Map<string, Set<string>>();
  const narrativeEventIds = new Set<string>();
  const presentationIds = new Set<string>();
  const registerPresentation = (presentation: CampaignPresentationDefinition | undefined, source: string, nodeId?: string, chapterId?: string) => {
    if (!presentation) return;
    if (presentationIds.has(presentation.id)) {
      issues.push({ id: `duplicate-presentation-${presentation.id}-${source}`, severity: 'warning', message: `Presentation ID is reused: ${presentation.id}`, nodeId, chapterId });
    }
    presentationIds.add(presentation.id);
  };

  if (!document.id.trim()) issues.push({ id: 'campaign-id', severity: 'error', message: 'Campaign ID is required.' });
  if (!document.title.trim()) issues.push({ id: 'campaign-title', severity: 'error', message: 'Campaign title is required.' });
  if (!chapters.length) issues.push({ id: 'campaign-chapters', severity: 'error', message: 'At least one chapter is required.' });
  registerPresentation(document.briefing, 'campaign-briefing');
  registerPresentation(document.debriefing, 'campaign-debriefing');

  chapters.forEach((chapter) => {
    if (chapterIds.has(chapter.id)) issues.push({ id: `duplicate-chapter-${chapter.id}`, severity: 'error', message: `Duplicate chapter ID: ${chapter.id}`, chapterId: chapter.id });
    chapterIds.add(chapter.id);
    registerPresentation(chapter.briefing, `${chapter.id}-briefing`, undefined, chapter.id);
    registerPresentation(chapter.debriefing, `${chapter.id}-debriefing`, undefined, chapter.id);
    if (!chapter.nodes.length) issues.push({ id: `empty-chapter-${chapter.id}`, severity: 'warning', message: `${chapter.title} contains no nodes.`, chapterId: chapter.id });
    chapter.nodes.forEach((node) => {
      if (nodeIds.has(node.id)) issues.push({ id: `duplicate-node-${node.id}`, severity: 'error', message: `Duplicate node ID: ${node.id}`, nodeId: node.id });
      nodeIds.add(node.id);
      if (!targetExists(node)) issues.push({ id: `target-${node.id}`, severity: 'warning', message: `${node.title} targets an unavailable module entry: ${node.targetId}`, nodeId: node.id });
      if (!conditionReferenceValid(node.condition)) issues.push({ id: `condition-${node.id}`, severity: 'warning', message: `${node.title} uses an unavailable condition reference.`, nodeId: node.id });
      (node.additionalConditions ?? []).forEach((condition, conditionIndex) => {
        if (!conditionReferenceValid(condition)) issues.push({ id: `condition-${node.id}-${conditionIndex}`, severity: 'warning', message: `${node.title} uses an unavailable additional condition reference.`, nodeId: node.id });
      });
      registerPresentation(node.completionPresentation, `${node.id}-completion`, node.id, chapter.id);
      for (const mutation of node.variableEffects ?? []) {
        if (!mutation.variable.trim()) issues.push({ id: `variable-effect-${node.id}`, severity: 'error', message: `${node.title} contains a variable mutation without a variable name.`, nodeId: node.id, chapterId: chapter.id });
      }
      if (node.branch) {
        const options = branchOptions.get(node.branch.groupId) ?? new Set<string>();
        options.add(node.branch.optionId);
        branchOptions.set(node.branch.groupId, options);
        registerPresentation(node.branch.choicePresentation, `${node.id}-branch-choice`, node.id, chapter.id);
      }
      if (node.ending) {
        if (endingIds.has(node.ending.id)) issues.push({ id: `ending-${node.ending.id}`, severity: 'error', message: `Duplicate ending ID: ${node.ending.id}`, nodeId: node.id });
        endingIds.add(node.ending.id);
        registerPresentation(node.ending.epilogue, `${node.id}-ending`, node.id, chapter.id);
      }
    });
  });

  for (const event of document.narrativeEvents ?? []) {
    if (narrativeEventIds.has(event.id)) issues.push({ id: `duplicate-narrative-event-${event.id}`, severity: 'error', message: `Duplicate narrative event ID: ${event.id}` });
    narrativeEventIds.add(event.id);
    registerPresentation(event.presentation, `narrative-event-${event.id}`);
    if (event.condition && !conditionReferenceValid(event.condition)) issues.push({ id: `narrative-condition-${event.id}`, severity: 'warning', message: `${event.id} uses an unavailable narrative condition reference.` });
    for (const mutation of event.variableEffects ?? []) {
      if (!mutation.variable.trim()) issues.push({ id: `narrative-variable-${event.id}`, severity: 'error', message: `${event.id} contains a variable mutation without a variable name.` });
    }
    if ((event.trigger === 'chapter_start' || event.trigger === 'chapter_complete') && event.targetId && !chapterIds.has(event.targetId)) {
      issues.push({ id: `narrative-target-${event.id}`, severity: 'error', message: `${event.id} references missing chapter ${event.targetId}.` });
    }
    if (event.trigger === 'node_complete' && event.targetId && !nodeIds.has(event.targetId)) {
      issues.push({ id: `narrative-target-${event.id}`, severity: 'error', message: `${event.id} references missing node ${event.targetId}.` });
    }
    if (event.trigger === 'ending_achieved' && event.targetId && !endingIds.has(event.targetId)) {
      issues.push({ id: `narrative-target-${event.id}`, severity: 'error', message: `${event.id} references missing ending ${event.targetId}.` });
    }
    if (event.trigger === 'variable_condition' && (!event.condition || event.condition.type !== 'variable_compare')) {
      issues.push({ id: `narrative-variable-condition-${event.id}`, severity: 'error', message: `${event.id} requires a variable_compare condition.` });
    }
  }

  nodes.forEach((node) => node.prerequisites.forEach((prerequisite) => {
    if (!nodeIds.has(prerequisite)) issues.push({ id: `prerequisite-${node.id}-${prerequisite}`, severity: 'error', message: `${node.title} references missing prerequisite ${prerequisite}.`, nodeId: node.id });
    if (prerequisite === node.id) issues.push({ id: `self-${node.id}`, severity: 'error', message: `${node.title} cannot depend on itself.`, nodeId: node.id });
  }));

  if (graphHasCycle(nodes)) issues.push({ id: 'campaign-cycle', severity: 'error', message: 'The campaign graph contains a prerequisite cycle.' });
  branchOptions.forEach((options, groupId) => {
    if (options.size < 2) issues.push({ id: `branch-${groupId}`, severity: 'warning', message: `Branch group ${groupId} has only one option.` });
  });
  if (!endingIds.size) issues.push({ id: 'campaign-ending', severity: 'info', message: 'No alternative ending is defined.' });
  if (!nodes.some((node) => node.prerequisites.length === 0)) issues.push({ id: 'campaign-entry', severity: 'error', message: 'At least one root node without prerequisites is required.' });
  return issues;
}

function collectDependencies(documents: CampaignBuilderDocument[]): CampaignContentPackManifest['dependencies'] {
  const nodes = documents.flatMap((document) => document.chapters.flatMap((chapter) => chapter.nodes));
  const conditions = documents.flatMap((document) => [
    ...document.chapters.flatMap((chapter) => chapter.nodes.flatMap((node) => [node.condition, ...(node.additionalConditions ?? [])])),
    ...(document.narrativeEvents ?? []).flatMap((event) => event.condition ? [event.condition] : [])
  ]);
  return {
    missions: unique([
      ...nodes.flatMap((node) => [node.module === 'sideops' ? node.targetId ?? '' : '', ...(node.reward.unlockMissionIds ?? [])]),
      ...conditions.flatMap((condition) => condition.type === 'sideops_clear' ? [condition.missionId] : [])
    ]),
    vrMissions: unique([
      ...nodes.flatMap((node) => [node.module === 'vr' ? node.targetId ?? '' : '', ...(node.reward.unlockVrMissionIds ?? [])]),
      ...conditions.flatMap((condition) => condition.type === 'vr_clear' ? [condition.missionId] : [])
    ]),
    tapes: unique([
      ...nodes.flatMap((node) => [node.module === 'tapes' ? node.targetId ?? '' : '', ...(node.reward.unlockTapeIds ?? [])]),
      ...conditions.flatMap((condition) => condition.type === 'tape_listened' ? [condition.tapeId] : [])
    ]),
    contacts: unique([
      ...nodes.flatMap((node) => [node.module === 'codec' ? node.targetId ?? '' : '', ...(node.reward.unlockContactIds ?? [])]),
      ...conditions.flatMap((condition) => condition.type === 'codec_call' ? [condition.contactId] : [])
    ]),
    lore: unique([
      ...nodes.flatMap((node) => [node.module === 'lore' ? node.targetId ?? '' : '', ...(node.reward.unlockLoreIds ?? [])]),
      ...conditions.flatMap((condition) => condition.type === 'lore_viewed' ? [condition.loreId] : [])
    ])
  };
}

export function exportCampaignBuilderPack(documents: CampaignBuilderDocument[], metadata?: Partial<Pick<CampaignContentPackManifest, 'packId' | 'name' | 'version' | 'author' | 'description'>>): CampaignBuilderExportResult {
  const cleanDocuments = documents.map((document, index) => sanitizeCampaignBuilderDocument(document, index + 1));
  const payload: CampaignContentPackManifest = {
    schemaVersion: 2,
    packId: safeId(metadata?.packId ?? `campaign_pack_${Date.now().toString(36)}`, 'campaign_pack'),
    name: metadata?.name ?? (cleanDocuments.length === 1 ? cleanDocuments[0].title : 'Shadow Codec Ops Campaign Pack'),
    version: metadata?.version ?? '1.0.0',
    author: metadata?.author ?? cleanDocuments[0]?.author ?? 'Darknigthmare',
    description: metadata?.description ?? 'Campaign Builder export pack.',
    exportedAt: nowIso(),
    campaigns: cleanDocuments,
    dependencies: collectDependencies(cleanDocuments)
  };
  return { fileName: `${payload.packId}-${payload.version}.json`, payload };
}

export function importCampaignBuilderPack(payload: string): CampaignBuilderDocument[] {
  const parsed = JSON.parse(payload) as CampaignContentPackManifest | CampaignBuilderDocument | CampaignBuilderDocument[];
  const rawDocuments = Array.isArray(parsed)
    ? parsed
    : 'campaigns' in parsed && Array.isArray(parsed.campaigns)
      ? parsed.campaigns
      : [parsed as CampaignBuilderDocument];
  if (!rawDocuments.length) throw new Error('Campaign pack contains no campaigns.');
  return rawDocuments.map((document, index) => sanitizeCampaignBuilderDocument(document, index + 1));
}

export function createCampaignBuilderNode(sequence: number, x = 100, y = 100): CampaignNodeDefinition {
  return normalizeNode({
    id: `operation_${String(sequence).padStart(3, '0')}`,
    title: `Operation ${String(sequence).padStart(3, '0')}`,
    description: 'New campaign operation.',
    module: 'campaign',
    era: 'multi',
    prerequisites: [],
    condition: { type: 'all_prerequisites' },
    reward: { xp: 50, resources: {} },
    layout: { x, y }
  }, sequence - 1);
}

export function createCampaignBuilderChapter(sequence: number): CampaignChapterDefinition {
  return {
    id: `chapter_${String(sequence).padStart(2, '0')}_${uid('branch')}`,
    title: `Chapter ${String(sequence).padStart(2, '0')}`,
    subtitle: 'New operations chapter',
    description: 'Editable campaign chapter.',
    nodes: []
  };
}
