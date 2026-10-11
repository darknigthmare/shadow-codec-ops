import contactsJson from '../data/contacts.json';
import conversationsJson from '../data/conversations.json';
import missionsJson from '../data/missions.json';
import tapesJson from '../data/tapes.json';
import vrMissionsJson from '../data/vrMissions.json';
import itemsJson from '../data/items.json';
import enemiesJson from '../data/enemies.json';
import bossesJson from '../data/bosses.json';
import { SIDEOPS_CAMPAIGN_CONVERSATIONS, SIDEOPS_CAMPAIGN_MISSIONS } from '../game/core/sideOpsCampaign';
import type { AppRoute } from '../app/AppLayout';
import type { ContactDefinition, ConversationDefinition } from '../types/codec.types';
import type { MissionDefinition } from '../types/mission.types';
import type { LoreLink } from '../types/lore.types';
import type { TapeDefinition } from '../types/tape.types';
import type { VrMissionDefinition } from '../types/vr.types';
import { setCampaignLaunchDirective } from './campaignStorage';
import { saveJson } from './saveEngine';
import { loadVrProgress } from './vrStorage';
import { loadCustomConversations, mergeStudioConversations } from './studioStorage';
import { loadCustomTapes } from './tapeStorage';
import { convertBuilderDocumentToMissionDefinition, loadPlayableBuilderDocuments } from './missionBuilderStorage';

/** The same authored operations that SideOpsLauncher can actually launch. */
export const BUILT_IN_SIDE_OPS_MISSIONS: MissionDefinition[] = [
  ...missionsJson as MissionDefinition[], ...SIDEOPS_CAMPAIGN_MISSIONS
].filter(mission => mission.mode === 'side_scroller');

export interface ContentLinkCatalog {
  contacts: ContactDefinition[];
  conversations: ConversationDefinition[];
  missions: MissionDefinition[];
  tapes: TapeDefinition[];
  vrMissions: VrMissionDefinition[];
}

export const BUILT_IN_CONTENT_LINK_CATALOG: ContentLinkCatalog = {
  contacts: contactsJson as ContactDefinition[],
  conversations: [...conversationsJson as ConversationDefinition[], ...SIDEOPS_CAMPAIGN_CONVERSATIONS],
  missions: BUILT_IN_SIDE_OPS_MISSIONS,
  tapes: tapesJson as TapeDefinition[],
  vrMissions: vrMissionsJson as VrMissionDefinition[]
};

/** Read local authored content once on module entry, never while rendering each link. */
export function loadContentLinkCatalog(): ContentLinkCatalog {
  return {
    ...BUILT_IN_CONTENT_LINK_CATALOG,
    conversations: mergeStudioConversations(BUILT_IN_CONTENT_LINK_CATALOG.conversations, loadCustomConversations()),
    missions: [...loadPlayableBuilderDocuments().map(convertBuilderDocumentToMissionDefinition), ...BUILT_IN_SIDE_OPS_MISSIONS],
    tapes: [...BUILT_IN_CONTENT_LINK_CATALOG.tapes, ...loadCustomTapes()]
  };
}

export interface ContentLinkTarget {
  route: 'sideops' | 'vr' | 'tapes' | 'codec' | 'lore' | 'settings' | 'studio' | 'builder' | 'campaign' | 'campaignBuilder';
  targetId?: string;
  era?: MissionDefinition['era'];
  conversationId?: string;
}

/** Exact module references already authored in the Lore dossiers. Internal engines retain Settings. */
const SYSTEM_MODULE_ROUTES = new Map<string, ContentLinkTarget['route']>([
  ['lore_system_tape_archive', 'tapes'],
  ['tape_archive', 'tapes'],
  ['lore_system_conversation_studio', 'studio'],
  ['conversation_studio', 'studio'],
  ['lore_codec_system', 'codec'],
  ['codec_simulator', 'codec'],
  ['lore_campaign_ops_progression', 'campaign'],
  ['lore_mission_builder_pipeline', 'builder'],
  ['lore_campaign_builder_system', 'campaignBuilder']
]);

/** Resolve identities, never names or a fallback to the last played operation. */
export function resolveContentLink(link: LoreLink, catalog = BUILT_IN_CONTENT_LINK_CATALOG): ContentLinkTarget | undefined {
  if (link.type === 'mission') {
    const mission = catalog.missions.find(candidate => candidate.id === link.id && candidate.mode === 'side_scroller');
    if (mission) return { route: 'sideops', targetId: mission.id, era: mission.era };
    // Existing cassette metadata calls both Side Ops and VR targets relatedMission.
    const training = catalog.vrMissions.find(candidate => candidate.id === link.id);
    return training ? { route: 'vr', targetId: training.id, era: training.era } : undefined;
  }
  if (link.type === 'vr') {
    const mission = catalog.vrMissions.find(candidate => candidate.id === link.id);
    return mission ? { route: 'vr', targetId: mission.id, era: mission.era } : undefined;
  }
  if (link.type === 'tape') {
    const tape = catalog.tapes.find(candidate => candidate.id === link.id);
    return tape ? { route: 'tapes', targetId: tape.id, era: tape.era } : undefined;
  }
  if (link.type === 'contact' || link.type === 'frequency') {
    const contactId = link.type === 'frequency' && link.id.startsWith('frequency_') ? link.id.slice('frequency_'.length) : link.id;
    const contact = catalog.contacts.find(candidate => candidate.id === contactId);
    return contact ? { route: 'codec', targetId: contact.id, era: contact.era } : undefined;
  }
  if (link.type === 'conversation') {
    const conversation = catalog.conversations.find(candidate => candidate.id === link.id);
    const contact = catalog.contacts.find(candidate => candidate.id === conversation?.contactId && candidate.era === conversation?.era);
    return conversation && contact ? { route: 'codec', targetId: contact.id, era: contact.era, conversationId: conversation.id } : undefined;
  }
  if (link.type === 'item' || link.type === 'enemy' || link.type === 'boss') {
    const records = link.type === 'item' ? itemsJson : link.type === 'enemy' ? enemiesJson : bossesJson;
    return records.some(record => record.id === link.id) ? { route: 'lore', targetId: `${link.type}_${link.id}` } : undefined;
  }
  return link.type === 'system' ? { route: SYSTEM_MODULE_ROUTES.get(link.id) ?? 'settings' } : undefined;
}

/** Existing mission usage supplies the links; registry-only art is not an encounter. */
export function getSideOpsLinksForRecord(type: 'item' | 'enemy' | 'boss', id: string): LoreLink[] {
  const records = type === 'item' ? itemsJson : type === 'enemy' ? enemiesJson : bossesJson;
  const record = records.find(candidate => candidate.id === id);
  if (!record) return [];
  const runtimeStatus = 'runtimeStatus' in record ? String(record.runtimeStatus) : undefined;
  if (runtimeStatus === 'asset_registry_only') return [];
  const dedicatedMission = runtimeStatus === 'dedicated_mission_003' ? 'outer_heaven_intrude_n313'
    : runtimeStatus?.startsWith('dedicated_shadow_moses_route') || runtimeStatus === 'narrative_checkpoint_only' ? 'shadow_dock_001'
      : runtimeStatus === 'sideops_tanker_hold_002' ? 'tanker_hold_002' : undefined;
  return BUILT_IN_SIDE_OPS_MISSIONS.filter(mission => {
    if (mission.id === dedicatedMission) return true;
    if (mission.era !== record.era) return false;
    return type === 'item' ? mission.availableItems.includes(id)
      : type === 'enemy' ? mission.enemies.includes(id)
        : mission.boss === id || mission.boss === record.name;
  }).map(mission => ({ type: 'mission', id: mission.id, label: mission.title }));
}

/** Navigation changes only the selected target. Rewards, locks and results stay with their existing modules. */
export function prepareContentLinkTarget(target: ContentLinkTarget): AppRoute {
  if (target.route === 'sideops' && target.targetId) saveJson('sideops-active-mission-id', target.targetId);
  if (target.route === 'vr' && target.targetId) {
    const progress = loadVrProgress();
    // Do not invoke a result evaluator or add an unlocked reward while selecting a mission.
    saveJson('vr-mission-progress', { ...progress, activeMissionId: target.targetId });
  }
  if (target.route === 'codec' || target.route === 'tapes' || target.route === 'lore') {
    setCampaignLaunchDirective({ module: target.route, targetId: target.targetId, era: target.era, conversationId: target.conversationId });
  }
  return target.route;
}
