import contactsJson from '../data/contacts.json';
import conversationsJson from '../data/conversations.json';
import type { ContactDefinition, ConversationDefinition, ConversationTrigger, EraId } from '../types/codec.types';
import type {
  BuilderEnvironment,
  MissionBuilderDocument,
  MissionBuilderEntity,
  MissionBuilderExportResult,
  MissionBuilderLibrary,
  MissionBuilderValidationIssue,
  MissionContentPackManifest,
  MissionDefinitionWithSource,
  RuntimeCodecCall,
  SideOpsMissionProfile
} from '../types/missionBuilder.types';
import type { MissionCodecTrigger, MissionDefinition, MissionObjective } from '../types/mission.types';
import { loadJson, saveJson } from './saveEngine';
import { resolveSideOpsCharacterTextures } from './sideOpsCharacterResolver';
import { loadCustomConversations } from './studioStorage';

export const MISSION_BUILDER_LIBRARY_KEY = 'mission-builder-library';
export const MISSION_BUILDER_PREVIEW_KEY = 'mission-builder-preview-id';
export const SIDEOPS_ACTIVE_MISSION_KEY = 'sideops-active-mission-id';


const VALID_ERAS: EraId[] = ['msx', 'mgs1', 'mgs2', 'mgs3', 'mgs4', 'peace_walker', 'mgsv', 'vr_simulation', 'patriots_ai'];
const VALID_ENVIRONMENTS: BuilderEnvironment[] = ['dock', 'tanker', 'jungle', 'facility', 'vr'];
const VALID_ENTITY_KINDS: MissionBuilderEntity['kind'][] = [
  'player_start', 'platform', 'crate', 'guard', 'reinforcement', 'keycard', 'door', 'camera',
  'searchlight', 'elevator', 'pickup_ration', 'pickup_chaff', 'pickup_ammo', 'secret', 'boss'
];
const VALID_TRIGGERS: ConversationTrigger[] = [
  'manual_call', 'incoming_call', 'mission_start', 'first_alert', 'low_health', 'keycard_found',
  'boss_intro', 'boss_midfight', 'boss_defeated', 'mission_complete', 'suspicion', 'evasion',
  'caution', 'reinforcement', 'camera_detected', 'searchlight_detected', 'secret_frequency', 'save_request'
];

const contacts = contactsJson as ContactDefinition[];
const conversations = conversationsJson as ConversationDefinition[];
const contactIds = new Set(contacts.map((contact) => contact.id));
function knownConversationIds(): Set<string> {
  return new Set([...conversations.map((conversation) => conversation.id), ...loadCustomConversations().map((conversation) => conversation.id)]);
}

const ENVIRONMENT_COLORS: Record<BuilderEnvironment, Pick<SideOpsMissionProfile, 'groundColor' | 'backdropColor' | 'structureColor'>> = {
  dock: { groundColor: 0x06120a, backdropColor: 0x041007, structureColor: 0x0d2a14 },
  tanker: { groundColor: 0x08131c, backdropColor: 0x030a12, structureColor: 0x10283a },
  jungle: { groundColor: 0x0c1a0b, backdropColor: 0x071005, structureColor: 0x28401c },
  facility: { groundColor: 0x101416, backdropColor: 0x06090a, structureColor: 0x263136 },
  vr: { groundColor: 0x07131b, backdropColor: 0x02080d, structureColor: 0x153c52 }
};

const ENVIRONMENT_LABELS: Record<BuilderEnvironment, string> = {
  dock: 'DOCK SIMULATION',
  tanker: 'TANKER SIMULATION',
  jungle: 'JUNGLE SIMULATION',
  facility: 'FACILITY SIMULATION',
  vr: 'VR SIDE OPS SIMULATION'
};

const ERA_DEFAULTS: Record<EraId, { contactId: string; conversationId: string }> = {
  msx: { contactId: 'campbell_msx', conversationId: 'msx_campbell_default' },
  mgs1: { contactId: 'campbell_mgs1', conversationId: 'mgs1_campbell_default' },
  mgs2: { contactId: 'otacon_mgs2', conversationId: 'mgs2_otacon_support' },
  mgs3: { contactId: 'major_mgs3', conversationId: 'mgs3_major_support' },
  mgs4: { contactId: 'otacon_mgs4', conversationId: 'mgs4_otacon_modern' },
  peace_walker: { contactId: 'miller_mgsv', conversationId: 'mgsv_miller_idroid' },
  mgsv: { contactId: 'miller_mgsv', conversationId: 'mgsv_miller_idroid' },
  vr_simulation: { contactId: 'vr_instructor', conversationId: 'vr_instructor_default' },
  patriots_ai: { contactId: 'patriots_colonel_ai', conversationId: 'patriots_ai_default' }
};

function nowIso(): string {
  return new Date().toISOString();
}

function safeId(value: string, fallback: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
  return normalized || fallback;
}

function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));
}

function makeEntity(kind: MissionBuilderEntity['kind'], x: number, y: number, extras: Partial<MissionBuilderEntity> = {}): MissionBuilderEntity {
  return {
    id: uid(kind),
    kind,
    x,
    y,
    ...extras
  };
}

export function createBlankMissionBuilderDocument(sequence = 1): MissionBuilderDocument {
  const timestamp = nowIso();
  const id = `custom_facility_${String(sequence).padStart(3, '0')}`;
  return {
    schemaVersion: 1,
    id,
    title: `Custom Facility ${String(sequence).padStart(3, '0')}`,
    description: 'Editable Side Ops mission generated by the Mission Builder.',
    author: 'Darknigthmare',
    era: 'mgs1',
    environment: 'facility',
    location: 'Underground Tactical Facility',
    mainCharacter: 'Solid Snake',
    difficulty: 2,
    worldWidth: 3600,
    startAmmo: 24,
    startRations: 1,
    startChaff: 1,
    published: false,
    objectives: [
      { id: 'enter_area', label: 'Enter the tactical facility', completedByDefault: true },
      { id: 'recover_keycard', label: 'Recover the security keycard', completedByDefault: false },
      { id: 'open_security_door', label: 'Open the security door', completedByDefault: false },
      { id: 'cross_security_yard', label: 'Cross the surveillance sector', completedByDefault: false },
      { id: 'defeat_captain', label: 'Defeat the facility commander', completedByDefault: false },
      { id: 'extract', label: 'Reach the extraction lift', completedByDefault: false }
    ],
    codecTriggers: [
      {
        trigger: 'mission_start',
        contactId: 'campbell_mgs1',
        conversationId: 'mgs1_campbell_mission_start',
        priority: 'urgent',
        pauseGame: true
      },
      {
        trigger: 'first_alert',
        contactId: 'campbell_mgs1',
        conversationId: 'mgs1_campbell_first_alert',
        priority: 'urgent',
        pauseGame: true
      },
      {
        trigger: 'mission_complete',
        contactId: 'campbell_mgs1',
        conversationId: 'mgs1_campbell_mission_complete',
        priority: 'normal',
        pauseGame: true
      }
    ],
    entities: [
      makeEntity('player_start', 100, 454, { label: 'Insertion point' }),
      makeEntity('platform', 450, 520, { label: 'Ground A', scaleX: 14 }),
      makeEntity('platform', 1380, 520, { label: 'Ground B', scaleX: 14 }),
      makeEntity('platform', 2310, 520, { label: 'Ground C', scaleX: 14 }),
      makeEntity('platform', 3200, 520, { label: 'Ground D', scaleX: 14 }),
      makeEntity('platform', 730, 380, { label: 'Upper route', scaleX: 4 }),
      makeEntity('platform', 1870, 345, { label: 'Surveillance route', scaleX: 4 }),
      makeEntity('crate', 390, 480),
      makeEntity('crate', 1420, 480),
      makeEntity('crate', 2520, 480),
      makeEntity('guard', 650, 454, { label: 'Patrol Alpha', patrolMin: 480, patrolMax: 840, hp: 1 }),
      makeEntity('guard', 1720, 454, { label: 'Patrol Bravo', patrolMin: 1550, patrolMax: 1940, hp: 1 }),
      makeEntity('guard', 2460, 454, { label: 'Patrol Charlie', patrolMin: 2290, patrolMax: 2640, hp: 1 }),
      makeEntity('keycard', 820, 338, { label: 'Facility Keycard' }),
      makeEntity('door', 1330, 462, { label: 'Security blast door' }),
      makeEntity('camera', 1110, 230, { label: 'Security camera' }),
      makeEntity('searchlight', 2020, 115, { label: 'Surveillance sweep', scaleX: 340 }),
      makeEntity('pickup_ration', 520, 350, { label: 'Ration' }),
      makeEntity('pickup_chaff', 1660, 420, { label: 'Chaff grenade' }),
      makeEntity('pickup_ammo', 2120, 305, { label: 'SOCOM ammunition' }),
      makeEntity('secret', 1900, 305, { label: 'Hidden mission tape' }),
      makeEntity('boss', 2940, 456, { label: 'Facility Commander', hp: 10 }),
      makeEntity('elevator', 3450, 470, { label: 'Extraction lift' })
    ],
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

export function defaultMissionBuilderLibrary(): MissionBuilderLibrary {
  const document = createBlankMissionBuilderDocument(1);
  return {
    schemaVersion: 1,
    activeDocumentId: document.id,
    documents: [document]
  };
}

function sanitizeObjective(value: unknown, index: number): MissionObjective {
  const candidate = value && typeof value === 'object' ? value as Partial<MissionObjective> : {};
  return {
    id: safeId(String(candidate.id ?? `objective_${index + 1}`), `objective_${index + 1}`),
    label: String(candidate.label ?? `Objective ${index + 1}`).slice(0, 140),
    completedByDefault: Boolean(candidate.completedByDefault)
  };
}

function sanitizeTrigger(value: unknown): MissionCodecTrigger | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<MissionCodecTrigger>;
  if (typeof candidate.trigger !== 'string' || !VALID_TRIGGERS.includes(candidate.trigger as ConversationTrigger) || typeof candidate.contactId !== 'string' || typeof candidate.conversationId !== 'string') return null;
  return {
    trigger: candidate.trigger as ConversationTrigger,
    contactId: candidate.contactId,
    conversationId: candidate.conversationId,
    priority: candidate.priority === 'urgent' || candidate.priority === 'secret' ? candidate.priority : 'normal',
    pauseGame: candidate.pauseGame !== false
  };
}

function sanitizeEntity(value: unknown, index: number, worldWidth: number): MissionBuilderEntity | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<MissionBuilderEntity>;
  if (typeof candidate.kind !== 'string' || !VALID_ENTITY_KINDS.includes(candidate.kind as MissionBuilderEntity['kind'])) return null;
  return {
    id: safeId(String(candidate.id ?? `${candidate.kind}_${index + 1}`), `entity_${index + 1}`),
    kind: candidate.kind as MissionBuilderEntity['kind'],
    x: clamp(Number(candidate.x ?? 100), 0, worldWidth),
    y: clamp(Number(candidate.y ?? 454), 0, 540),
    label: typeof candidate.label === 'string' ? candidate.label.slice(0, 120) : undefined,
    scaleX: typeof candidate.scaleX === 'number' ? clamp(candidate.scaleX, 0.5, 30) : undefined,
    patrolMin: typeof candidate.patrolMin === 'number' ? clamp(candidate.patrolMin, 0, worldWidth) : undefined,
    patrolMax: typeof candidate.patrolMax === 'number' ? clamp(candidate.patrolMax, 0, worldWidth) : undefined,
    hp: typeof candidate.hp === 'number' ? clamp(Math.round(candidate.hp), 1, 100) : undefined
  };
}

export function sanitizeMissionBuilderDocument(value: unknown, sequence = 1): MissionBuilderDocument | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<MissionBuilderDocument>;
  if (typeof candidate.title !== 'string' && typeof candidate.id !== 'string') return null;

  const fallback = createBlankMissionBuilderDocument(sequence);
  const worldWidth = clamp(Number(candidate.worldWidth ?? fallback.worldWidth), 1600, 12000);
  const entities = Array.isArray(candidate.entities)
    ? candidate.entities.map((entity, index) => sanitizeEntity(entity, index, worldWidth)).filter((entity): entity is MissionBuilderEntity => Boolean(entity))
    : fallback.entities;
  const objectives = Array.isArray(candidate.objectives)
    ? candidate.objectives.map(sanitizeObjective)
    : fallback.objectives;
  const codecTriggers = Array.isArray(candidate.codecTriggers)
    ? candidate.codecTriggers.map(sanitizeTrigger).filter((trigger): trigger is MissionCodecTrigger => Boolean(trigger))
    : fallback.codecTriggers;

  const createdAt = typeof candidate.createdAt === 'string' ? candidate.createdAt : nowIso();
  return {
    schemaVersion: 1,
    id: safeId(String(candidate.id ?? candidate.title ?? fallback.id), fallback.id),
    title: String(candidate.title ?? fallback.title).slice(0, 100),
    description: String(candidate.description ?? fallback.description).slice(0, 600),
    author: String(candidate.author ?? fallback.author).slice(0, 80),
    era: VALID_ERAS.includes(candidate.era as EraId) ? candidate.era as EraId : fallback.era,
    environment: VALID_ENVIRONMENTS.includes(candidate.environment as BuilderEnvironment) ? candidate.environment as BuilderEnvironment : fallback.environment,
    location: String(candidate.location ?? fallback.location).slice(0, 120),
    mainCharacter: String(candidate.mainCharacter ?? fallback.mainCharacter).slice(0, 80),
    difficulty: clamp(Math.round(Number(candidate.difficulty ?? fallback.difficulty)), 1, 5),
    worldWidth,
    startAmmo: clamp(Math.round(Number(candidate.startAmmo ?? fallback.startAmmo)), 0, 999),
    startRations: clamp(Math.round(Number(candidate.startRations ?? fallback.startRations)), 0, 9),
    startChaff: clamp(Math.round(Number(candidate.startChaff ?? fallback.startChaff)), 0, 9),
    published: Boolean(candidate.published),
    objectives,
    codecTriggers,
    entities,
    createdAt,
    updatedAt: nowIso()
  };
}

export function loadMissionBuilderLibrary(): MissionBuilderLibrary {
  const fallback = defaultMissionBuilderLibrary();
  const raw = loadJson<unknown>(MISSION_BUILDER_LIBRARY_KEY, fallback);
  if (!raw || typeof raw !== 'object') return fallback;
  const candidate = raw as Partial<MissionBuilderLibrary>;
  const documents = Array.isArray(candidate.documents)
    ? candidate.documents.map((document, index) => sanitizeMissionBuilderDocument(document, index + 1)).filter((document): document is MissionBuilderDocument => Boolean(document))
    : [];
  if (documents.length === 0) return fallback;
  const activeDocumentId = documents.some((document) => document.id === candidate.activeDocumentId)
    ? candidate.activeDocumentId
    : documents[0].id;
  return { schemaVersion: 1, activeDocumentId, documents };
}

export function saveMissionBuilderLibrary(library: MissionBuilderLibrary): void {
  saveJson(MISSION_BUILDER_LIBRARY_KEY, {
    schemaVersion: 1,
    activeDocumentId: library.activeDocumentId,
    documents: library.documents.map((document) => ({ ...document, updatedAt: nowIso() }))
  });
}

export function upsertMissionBuilderDocument(document: MissionBuilderDocument): MissionBuilderLibrary {
  const library = loadMissionBuilderLibrary();
  const safeDocument = sanitizeMissionBuilderDocument(document, library.documents.length + 1) ?? document;
  const documents = library.documents.some((entry) => entry.id === safeDocument.id)
    ? library.documents.map((entry) => entry.id === safeDocument.id ? safeDocument : entry)
    : [safeDocument, ...library.documents];
  const next = { schemaVersion: 1 as const, activeDocumentId: safeDocument.id, documents };
  saveMissionBuilderLibrary(next);
  return next;
}

export function removeMissionBuilderDocument(documentId: string): MissionBuilderLibrary {
  const library = loadMissionBuilderLibrary();
  let documents = library.documents.filter((document) => document.id !== documentId);
  if (documents.length === 0) documents = [createBlankMissionBuilderDocument(1)];
  const next = { schemaVersion: 1 as const, activeDocumentId: documents[0].id, documents };
  saveMissionBuilderLibrary(next);
  return next;
}

export function cloneMissionBuilderDocument(document: MissionBuilderDocument): MissionBuilderDocument {
  const timestamp = nowIso();
  return {
    ...structuredClone(document),
    id: safeId(`${document.id}_copy_${Date.now().toString(36)}`, uid('custom_mission')),
    title: `${document.title} Copy`,
    published: false,
    entities: document.entities.map((entity) => ({ ...entity, id: uid(entity.kind) })),
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

export function validateMissionBuilderDocument(document: MissionBuilderDocument): MissionBuilderValidationIssue[] {
  const issues: MissionBuilderValidationIssue[] = [];
  const add = (severity: MissionBuilderValidationIssue['severity'], id: string, message: string, entityId?: string) => {
    issues.push({ id, severity, message, entityId });
  };

  if (!document.id.trim()) add('error', 'mission-id', 'Mission ID is required.');
  if (!document.title.trim()) add('error', 'mission-title', 'Mission title is required.');
  if (document.worldWidth < 1600) add('error', 'world-width', 'World width must be at least 1600 pixels.');
  if (document.objectives.length < 2) add('warning', 'objectives-low', 'Add at least two objectives for a useful mission flow.');
  const requiredObjectiveIds = ['recover_keycard', 'open_security_door', 'cross_security_yard', 'defeat_captain', 'extract'];
  requiredObjectiveIds.forEach((objectiveId) => {
    if (!document.objectives.some((objective) => objective.id === objectiveId)) {
      add('error', `missing-objective-${objectiveId}`, `Runtime objective ID required: ${objectiveId}`);
    }
  });

  const objectiveIds = new Set<string>();
  document.objectives.forEach((objective) => {
    if (objectiveIds.has(objective.id)) add('error', `duplicate-objective-${objective.id}`, `Duplicate objective ID: ${objective.id}`);
    objectiveIds.add(objective.id);
  });

  const duplicateIds = new Set<string>();
  const seenIds = new Set<string>();
  document.entities.forEach((entity) => {
    if (seenIds.has(entity.id)) duplicateIds.add(entity.id);
    seenIds.add(entity.id);
    if (entity.x < 0 || entity.x > document.worldWidth || entity.y < 0 || entity.y > 540) {
      add('error', `bounds-${entity.id}`, `${entity.label ?? entity.kind} is outside the mission world.`, entity.id);
    }
    if ((entity.kind === 'guard' || entity.kind === 'reinforcement') && (entity.patrolMin ?? entity.x - 120) >= (entity.patrolMax ?? entity.x + 120)) {
      add('error', `patrol-${entity.id}`, `${entity.label ?? 'Guard'} has an invalid patrol range.`, entity.id);
    }
  });
  duplicateIds.forEach((id) => add('error', `duplicate-${id}`, `Duplicate entity ID: ${id}`, id));

  const requiredKinds: Array<{ kind: MissionBuilderEntity['kind']; label: string }> = [
    { kind: 'player_start', label: 'player insertion point' },
    { kind: 'keycard', label: 'keycard' },
    { kind: 'door', label: 'security door' },
    { kind: 'boss', label: 'boss' },
    { kind: 'elevator', label: 'extraction elevator' }
  ];
  requiredKinds.forEach(({ kind, label }) => {
    const count = document.entities.filter((entity) => entity.kind === kind).length;
    if (count === 0) add('error', `missing-${kind}`, `Add a ${label} before playtesting.`);
    if (count > 1 && ['player_start', 'keycard', 'door', 'boss', 'elevator'].includes(kind)) {
      add('warning', `multiple-${kind}`, `Only the first ${label} is used by the current runtime.`);
    }
  });

  if (!document.entities.some((entity) => entity.kind === 'platform')) add('error', 'missing-platform', 'Add at least one platform.');
  if (!document.entities.some((entity) => entity.kind === 'guard')) add('warning', 'missing-guard', 'The mission has no standard patrol guards.');
  if (!document.entities.some((entity) => entity.kind === 'camera')) add('info', 'missing-camera', 'No security camera is placed.');
  if (!document.entities.some((entity) => entity.kind === 'searchlight')) add('info', 'missing-searchlight', 'No searchlight is placed.');
  if (!document.entities.some((entity) => entity.kind === 'secret')) add('info', 'missing-secret', 'No optional secret is placed.');

  const validConversationIds = knownConversationIds();
  document.codecTriggers.forEach((trigger, index) => {
    if (!contactIds.has(trigger.contactId)) add('error', `contact-${index}`, `Unknown Codec contact: ${trigger.contactId}`);
    if (!validConversationIds.has(trigger.conversationId)) add('error', `conversation-${index}`, `Unknown Codec conversation: ${trigger.conversationId}`);
  });
  if (!document.codecTriggers.some((trigger) => trigger.trigger === 'mission_start')) add('warning', 'missing-briefing', 'No mission_start Codec trigger is configured.');
  if (!document.codecTriggers.some((trigger) => trigger.trigger === 'mission_complete')) add('warning', 'missing-debriefing', 'No mission_complete Codec trigger is configured.');
  if (!document.published) add('info', 'draft', 'Mission is a draft. Use Playtest or Publish to expose it in Side Ops.');
  return issues;
}

function firstEntity(document: MissionBuilderDocument, kind: MissionBuilderEntity['kind'], fallback: MissionBuilderEntity): MissionBuilderEntity {
  return document.entities.find((entity) => entity.kind === kind) ?? fallback;
}

function callFromTrigger(document: MissionBuilderDocument, trigger: ConversationTrigger, fallbackTrigger: ConversationTrigger = trigger): RuntimeCodecCall {
  const fallback = ERA_DEFAULTS[document.era] ?? ERA_DEFAULTS.mgs1;
  const configured = document.codecTriggers.find((entry) => entry.trigger === trigger)
    ?? document.codecTriggers.find((entry) => entry.trigger === fallbackTrigger)
    ?? document.codecTriggers[0];
  return {
    trigger,
    contactId: configured?.contactId ?? fallback.contactId,
    conversationId: configured?.conversationId ?? fallback.conversationId,
    message: `${document.title}: ${trigger.replace(/_/g, ' ')} transmission.`,
    pauseGame: configured?.pauseGame ?? (trigger === 'mission_start' || trigger === 'first_alert' || trigger === 'boss_intro' || trigger === 'boss_defeated' || trigger === 'mission_complete')
  };
}

function objectiveLabel(document: MissionBuilderDocument, id: string, fallback: string): string {
  return document.objectives.find((objective) => objective.id === id)?.label ?? fallback;
}

export function convertBuilderDocumentToMissionDefinition(document: MissionBuilderDocument): MissionDefinitionWithSource {
  const briefing = document.codecTriggers.find((trigger) => trigger.trigger === 'mission_start');
  const debriefing = document.codecTriggers.find((trigger) => trigger.trigger === 'mission_complete');
  const items = new Set<string>(['socom']);
  if (document.entities.some((entity) => entity.kind === 'pickup_ration')) items.add('ration');
  if (document.entities.some((entity) => entity.kind === 'pickup_chaff')) items.add('chaff_grenade');
  if (document.entities.some((entity) => entity.kind === 'pickup_ammo')) items.add('socom_ammo');
  if (document.entities.some((entity) => entity.kind === 'keycard')) items.add('custom_keycard');

  const enemies = new Set<string>();
  if (document.entities.some((entity) => entity.kind === 'guard')) enemies.add('custom_patrol_guard');
  if (document.entities.some((entity) => entity.kind === 'reinforcement')) enemies.add('custom_reinforcement');
  const boss = document.entities.find((entity) => entity.kind === 'boss');

  return {
    id: document.id,
    title: document.title,
    era: document.era,
    mode: 'side_scroller',
    location: document.location,
    mainCharacter: document.mainCharacter,
    difficulty: document.difficulty,
    mapKey: `builder:${document.id}`,
    briefingConversation: briefing?.conversationId ?? callFromTrigger(document, 'mission_start').conversationId,
    debriefingConversation: debriefing?.conversationId ?? callFromTrigger(document, 'mission_complete').conversationId,
    objectives: document.objectives,
    availableItems: [...items],
    enemies: [...enemies],
    boss: boss?.label ?? 'Builder Mission Commander',
    codecTriggers: document.codecTriggers,
    source: 'builder',
    published: document.published
  };
}

export function convertBuiltInMissionDefinition(mission: MissionDefinition): MissionDefinitionWithSource {
  return { ...mission, source: 'built_in' };
}

export function convertBuilderDocumentToSideOpsProfile(document: MissionBuilderDocument): SideOpsMissionProfile {
  const start = firstEntity(document, 'player_start', { id: 'start', kind: 'player_start', x: 90, y: 454 });
  const door = firstEntity(document, 'door', { id: 'door', kind: 'door', x: Math.round(document.worldWidth * 0.38), y: 462, label: 'security door' });
  const camera = firstEntity(document, 'camera', { id: 'camera', kind: 'camera', x: -500, y: -500 });
  const searchlight = firstEntity(document, 'searchlight', { id: 'searchlight', kind: 'searchlight', x: -500, y: -500, scaleX: 0 });
  const elevator = firstEntity(document, 'elevator', { id: 'elevator', kind: 'elevator', x: document.worldWidth - 170, y: 470, label: 'extraction lift' });
  const keycard = firstEntity(document, 'keycard', { id: 'keycard', kind: 'keycard', x: Math.round(document.worldWidth * 0.25), y: 300, label: 'security keycard' });
  const boss = firstEntity(document, 'boss', { id: 'boss', kind: 'boss', x: Math.round(document.worldWidth * 0.78), y: 456, label: 'Builder Mission Commander', hp: 10 });
  const colors = ENVIRONMENT_COLORS[document.environment] ?? ENVIRONMENT_COLORS.facility;
  const characterTextures = resolveSideOpsCharacterTextures({
    era: document.era,
    mainCharacter: document.mainCharacter,
    environment: document.environment
  });
  const secrets = document.entities.filter((entity) => entity.kind === 'secret');

  return {
    id: document.id,
    title: document.title,
    location: document.location,
    header: `${document.title.toUpperCase()} // ${ENVIRONMENT_LABELS[document.environment]}`,
    environment: document.environment,
    worldWidth: document.worldWidth,
    ...colors,
    start: { x: start.x, y: start.y },
    playerTexture: characterTextures.playerTexture,
    startAmmo: document.startAmmo,
    startRations: document.startRations,
    startChaff: document.startChaff,
    initialObjectives: document.objectives.filter((objective) => objective.completedByDefault).map((objective) => objective.id),
    totalObjectives: Math.max(5, document.objectives.length),
    door: { x: door.x, y: door.y, label: door.label ?? 'security door' },
    camera: { x: camera.x, y: camera.y },
    searchlight: { x: searchlight.x, y: searchlight.y, sweep: searchlight.scaleX ?? 350 },
    elevator: { x: elevator.x, y: elevator.y, label: elevator.label ?? 'extraction lift' },
    keycard: { x: keycard.x, y: keycard.y, label: keycard.label ?? 'security keycard' },
    boss: {
      name: boss.label ?? 'Builder Mission Commander',
      x: boss.x,
      y: boss.y,
      hp: boss.hp ?? 10,
      texture: characterTextures.bossTexture,
      tintPhaseOne: document.environment === 'tanker' ? 0x9fd4ff : 0xffdf85,
      tintPhaseTwo: 0xff6b6b
    },
    guardTexture: characterTextures.guardTexture,
    reinforcementTexture: characterTextures.reinforcementTexture,
    platforms: document.entities.filter((entity) => entity.kind === 'platform').map((entity) => ({ x: entity.x, y: entity.y, scaleX: entity.scaleX ?? 4 })),
    crates: document.entities.filter((entity) => entity.kind === 'crate').map((entity) => ({ x: entity.x, y: entity.y })),
    guards: document.entities
      .filter((entity) => entity.kind === 'guard' || entity.kind === 'reinforcement')
      .map((entity) => ({
        x: entity.x,
        y: entity.y,
        patrolMin: entity.patrolMin ?? Math.max(0, entity.x - 150),
        patrolMax: entity.patrolMax ?? Math.min(document.worldWidth, entity.x + 150),
        role: entity.kind === 'reinforcement' ? 'reinforcement' as const : 'patrol' as const,
        hp: entity.hp ?? (entity.kind === 'reinforcement' ? 2 : 1)
      })),
    pickups: document.entities
      .filter((entity) => entity.kind === 'pickup_ration' || entity.kind === 'pickup_chaff' || entity.kind === 'pickup_ammo')
      .map((entity) => ({
        x: entity.x,
        y: entity.y,
        kind: entity.kind === 'pickup_ration' ? 'ration' as const : entity.kind === 'pickup_chaff' ? 'chaff' as const : 'ammo' as const
      })),
    secrets: secrets.map((entity, index) => ({ x: entity.x, y: entity.y, id: entity.id, label: entity.label ?? `SECRET ${index + 1}` })),
    stageLabels: {
      recover_keycard: objectiveLabel(document, 'recover_keycard', `Recover ${keycard.label ?? 'security keycard'}`),
      open_security_door: objectiveLabel(document, 'open_security_door', `Open ${door.label ?? 'security door'}`),
      cross_security_yard: objectiveLabel(document, 'cross_security_yard', 'Cross the surveillance sector'),
      defeat_captain: objectiveLabel(document, 'defeat_captain', `Defeat ${boss.label ?? 'mission commander'}`),
      extract: objectiveLabel(document, 'extract', `Reach ${elevator.label ?? 'extraction lift'}`)
    },
    completionX: {
      openDoor: Math.min(document.worldWidth - 600, door.x + 45),
      crossYard: Math.min(document.worldWidth - 450, Math.max(door.x + 300, searchlight.x + 160)),
      bossArena: Math.max(door.x + 500, boss.x - 380)
    },
    codec: {
      missionStart: callFromTrigger(document, 'mission_start'),
      keycardFound: callFromTrigger(document, 'keycard_found', 'mission_start'),
      lowHealth: callFromTrigger(document, 'low_health', 'manual_call'),
      missionFailed: callFromTrigger(document, 'low_health', 'manual_call'),
      missionComplete: callFromTrigger(document, 'mission_complete', 'manual_call'),
      manual: callFromTrigger(document, 'manual_call'),
      chaff: callFromTrigger(document, 'manual_call'),
      cameraDown: callFromTrigger(document, 'camera_detected', 'manual_call'),
      cqc: callFromTrigger(document, 'manual_call'),
      firstAlert: callFromTrigger(document, 'first_alert', 'manual_call'),
      suspicion: callFromTrigger(document, 'suspicion', 'first_alert'),
      evasion: callFromTrigger(document, 'evasion', 'manual_call'),
      caution: callFromTrigger(document, 'caution', 'manual_call'),
      reinforcement: callFromTrigger(document, 'reinforcement', 'first_alert'),
      cameraDetected: callFromTrigger(document, 'camera_detected', 'manual_call'),
      searchlight: callFromTrigger(document, 'searchlight_detected', 'manual_call'),
      bossIntro: callFromTrigger(document, 'boss_intro', 'first_alert'),
      bossMidfight: callFromTrigger(document, 'boss_midfight', 'boss_intro'),
      bossDefeated: callFromTrigger(document, 'boss_defeated', 'mission_complete'),
      secret: callFromTrigger(document, 'secret_frequency', 'manual_call')
    }
  };
}

export function loadPlayableBuilderDocuments(): MissionBuilderDocument[] {
  const library = loadMissionBuilderLibrary();
  const previewId = loadJson<string | null>(MISSION_BUILDER_PREVIEW_KEY, null);
  return library.documents.filter((document) => document.published || document.id === previewId);
}

export function findBuilderDocument(documentId: string): MissionBuilderDocument | undefined {
  return loadMissionBuilderLibrary().documents.find((document) => document.id === documentId);
}

export function resolveBuilderSideOpsProfile(documentId: string): SideOpsMissionProfile | null {
  const document = findBuilderDocument(documentId);
  if (!document) return null;
  const isPlayable = document.published || loadJson<string | null>(MISSION_BUILDER_PREVIEW_KEY, null) === document.id;
  return isPlayable ? convertBuilderDocumentToSideOpsProfile(document) : null;
}

export function prepareMissionBuilderPreview(document: MissionBuilderDocument): void {
  upsertMissionBuilderDocument(document);
  saveJson(MISSION_BUILDER_PREVIEW_KEY, document.id);
  saveJson(SIDEOPS_ACTIVE_MISSION_KEY, document.id);
}

function collectDependencies(documents: MissionBuilderDocument[]): MissionContentPackManifest['dependencies'] {
  const contactsSet = new Set<string>();
  const conversationsSet = new Set<string>();
  const items = new Set<string>(['socom']);
  const enemies = new Set<string>();
  const bosses = new Set<string>();
  documents.forEach((document) => {
    document.codecTriggers.forEach((trigger) => {
      contactsSet.add(trigger.contactId);
      conversationsSet.add(trigger.conversationId);
    });
    document.entities.forEach((entity) => {
      if (entity.kind === 'pickup_ration') items.add('ration');
      if (entity.kind === 'pickup_chaff') items.add('chaff_grenade');
      if (entity.kind === 'pickup_ammo') items.add('socom_ammo');
      if (entity.kind === 'keycard') items.add('custom_keycard');
      if (entity.kind === 'guard') enemies.add('custom_patrol_guard');
      if (entity.kind === 'reinforcement') enemies.add('custom_reinforcement');
      if (entity.kind === 'boss') bosses.add(entity.label ?? 'builder_mission_commander');
    });
  });
  return {
    contacts: [...contactsSet],
    conversations: [...conversationsSet],
    items: [...items],
    enemies: [...enemies],
    bosses: [...bosses]
  };
}

export function createMissionContentPack(documents: MissionBuilderDocument[], metadata?: Partial<Pick<MissionContentPackManifest, 'packId' | 'name' | 'version' | 'author' | 'description'>>): MissionContentPackManifest {
  const first = documents[0] ?? createBlankMissionBuilderDocument(1);
  return {
    schemaVersion: 1,
    packId: safeId(metadata?.packId ?? `${first.author}_${first.id}_pack`, 'shadow_codec_mission_pack'),
    name: metadata?.name ?? `${first.title} Content Pack`,
    version: metadata?.version ?? '1.0.0',
    author: metadata?.author ?? first.author,
    description: metadata?.description ?? `Side Ops mission pack containing ${documents.length} mission(s).`,
    exportedAt: nowIso(),
    missions: documents,
    dependencies: collectDependencies(documents)
  };
}

export function createMissionBuilderExport(document: MissionBuilderDocument): MissionBuilderExportResult {
  const payload = createMissionContentPack([document]);
  return { fileName: `${document.id}-mission-pack.json`, payload };
}

export function downloadMissionBuilderJson(fileName: string, payload: unknown): void {
  if (typeof document === 'undefined') return;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseMissionBuilderImport(value: unknown): MissionBuilderDocument[] {
  if (!value || typeof value !== 'object') return [];
  const candidate = value as Partial<MissionContentPackManifest & MissionBuilderDocument & MissionBuilderLibrary>;
  const rawDocuments = Array.isArray(candidate.missions)
    ? candidate.missions
    : Array.isArray(candidate.documents)
      ? candidate.documents
      : candidate.schemaVersion === 1 && ('entities' in candidate || 'title' in candidate)
        ? [candidate]
        : [];
  return rawDocuments
    .map((document, index) => sanitizeMissionBuilderDocument(document, index + 1))
    .filter((document): document is MissionBuilderDocument => Boolean(document));
}
