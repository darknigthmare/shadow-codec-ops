import contacts from '../../data/contacts.json';
import { createPeaceWalkerHeavyOperations } from './peaceWalkerHeavyOperations';
import type { CampaignDefinition } from '../../types/campaign.types';
import type { ConversationDefinition, ConversationTrigger, EraId } from '../../types/codec.types';
import type { MissionDefinition } from '../../types/mission.types';
import type { BuilderEnvironment, RuntimeCodecCall, SideOpsMissionProfile, SideOpsVisualPackId } from '../../types/missionBuilder.types';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from './sideOpsVisualPackRuntime';

export type SideOpsCampaignChallengeKind = 'no_alerts' | 'no_kills' | 'all_intel' | 'speed' | 'no_damage';

export interface SideOpsCampaignChallenge {
  id: string;
  label: string;
  kind: SideOpsCampaignChallengeKind;
  target: number;
}

export interface SideOpsCampaignRunSnapshot {
  hasKeycard: boolean;
  bossDefeated: boolean;
  secretsFound: number;
  alerts: number;
  kills: number;
  damageTaken: number;
  timeSeconds: number;
}

export interface SideOpsCampaignSector {
  id: string;
  label: string;
  fromX: number;
  toX: number;
  routeHint: string;
}

export interface SideOpsCampaignMission {
  id: string;
  chapterId: string;
  order: 1 | 2;
  briefing: string;
  designNotes: string;
  profile: SideOpsMissionProfile & { boss: SideOpsMissionProfile['boss'] & { baseFacingRight: boolean } };
  definition: MissionDefinition;
  rules: { bossRequired: boolean; minimumSecrets: number };
  sectors: readonly SideOpsCampaignSector[];
  challenges: readonly SideOpsCampaignChallenge[];
  prerequisites: readonly string[];
  /** Additive trials never revoke the historical main route's access. */
  optional?: boolean;
}

interface ChapterDesign {
  pack: SideOpsVisualPackId;
  era: EraId;
  name: string;
  location: string;
  operative: string;
  environment: BuilderEnvironment;
  contact: string;
  conversation: string;
  boss: string;
  bossFacingRight?: boolean;
  titles: readonly [string, string];
  intel: readonly [string, string, string];
  route: string;
  sectors: readonly [string, string, string, string, string];
  /** Authored section lengths: approach, access, surveillance, encounter, extraction. */
  lengths: readonly [number, number, number, number, number];
  /** Local raised-route position in each of the five sectors. */
  ledges: readonly [number, number, number, number, number];
  colors: readonly [number, number, number];
}

/**
 * These are original tactical simulations inspired by the stated games, not a
 * replacement for their canonical story missions. Each era keeps its own cast,
 * operation language, geometry rhythm and enemy art. Source notes accompany
 * the existing OpenAI source assets in scripts/art_sources/.
 */
const CHAPTERS: readonly ChapterDesign[] = [
  { pack: 'mg1', era: 'msx', name: 'Outer Heaven', location: 'Outer Heaven / supply perimeter', operative: 'solid_snake_msx', environment: 'facility', contact: 'schneider_mg1', conversation: 'mg1_schneider_facility', boss: 'Shotmaker',
    titles: ['Resistance Supply Line', 'Mercenary Lockdown'], intel: ['RESISTANCE ROUTE', 'PRISON ROSTER', 'SUPPLY FREQUENCIES'], route: 'Climb the storehouse shelving to pass above the road patrol, then descend behind the checkpoint.', sectors: ['Perimeter wall', 'Supply storehouse', 'Prison approach', 'Mercenary checkpoint', 'Resistance rendezvous'], lengths: [720, 880, 900, 960, 680], ledges: [300, 350, 470, 300, 280], colors: [0x172016, 0x09100b, 0x344135] },
  { pack: 'mg2', era: 'msx', name: 'Zanzibar Land', location: 'Zanzibar Land / OILIX laboratory perimeter', operative: 'solid_snake_mg2', environment: 'facility', contact: 'holly_msx', conversation: 'msx_holly_default', boss: 'Metal Gear D',
    titles: ['OILIX Evidence Trail', 'Zanzibar Heavy Intercept'], intel: ['OILIX RESEARCH', 'LAB ACCESS LOG', 'TRANSPORT MANIFEST'], route: 'Use the staggered service platforms to separate the laboratory patrols before crossing the armored yard.', sectors: ['Jungle perimeter', 'Laboratory service wing', 'Research archive', 'Armored testing yard', 'Northern withdrawal'], lengths: [840, 1020, 720, 1140, 600], ledges: [410, 430, 290, 560, 240], colors: [0x1d2313, 0x0c1008, 0x485034] },
  { pack: 'mgs1', era: 'mgs1', name: 'Shadow Moses', location: 'Shadow Moses / storage and maintenance route', operative: 'solid_snake', environment: 'dock', contact: 'otacon_mgs1', conversation: 'mgs1_otacon_tech', boss: 'Revolver Ocelot',
    titles: ['Cold Storage Signal', 'Armory Crossfire'], intel: ['MAINTENANCE DISK', 'CARGO REGISTER', 'SECURITY FREQUENCIES'], route: 'Container tops offer a fast exposed route; ground-level crate pockets break the Genome patrol sightlines.', sectors: ['Cargo access', 'Cold storage', 'Maintenance bridge', 'Armory approach', 'Cargo elevator'], lengths: [780, 840, 1140, 900, 540], ledges: [270, 430, 580, 330, 200], colors: [0x13222b, 0x060d14, 0x344852] },
  { pack: 'mgs2_tanker', era: 'mgs2', name: 'Tanker', location: 'USS Discovery / rain deck and service passage', operative: 'solid_snake', environment: 'tanker', contact: 'otacon_mgs2', conversation: 'mgs2_otacon_support', boss: 'Olga Gurlukovich', bossFacingRight: false,
    titles: ['Rain Deck Reconnaissance', 'Bridge Wing Encounter'], intel: ['DECK PHOTOGRAPHS', 'CARGO INVENTORY', 'WATCH ROTATION'], route: 'Deck machinery provides short concealment pockets; the upper gantry bypasses the paired sentries but crosses a searchlight.', sectors: ['Aft deck', 'Service gantry', 'Cargo watch', 'Bridge wing', 'Companionway'], lengths: [660, 1080, 960, 840, 720], ledges: [250, 540, 360, 410, 330], colors: [0x122530, 0x030d17, 0x254251] },
  { pack: 'mgs2_plant', era: 'mgs2', name: 'Big Shell', location: 'Big Shell / strut service network', operative: 'raiden_mgs2', environment: 'facility', contact: 'colonel_mgs2', conversation: 'mgs2_colonel_support', boss: 'Metal Gear RAY',
    titles: ['Strut Communications Trace', 'Shell Defense Exercise'], intel: ['NODE ACCESS DATA', 'STRUT MAINTENANCE', 'EVACUATION MAP'], route: 'Alternating strut walkways support a high-speed upper route and a protected lower service route.', sectors: ['Strut landing', 'Pump service route', 'Connecting bridge', 'Defense platform', 'Emergency lift'], lengths: [900, 780, 1200, 1020, 660], ledges: [510, 280, 590, 430, 220], colors: [0x1a282c, 0x081216, 0x415960] },
  { pack: 'mgs3', era: 'mgs3', name: 'Snake Eater', location: 'Groznyj Grad / depot and runway perimeter', operative: 'naked_snake_mgs3', environment: 'jungle', contact: 'major_mgs3', conversation: 'mgs3_major_support', boss: 'Shagohod',
    titles: ['Fortress Supply Survey', 'Runway Breakthrough'], intel: ['DEPOT LOGBOOK', 'FORTRESS ROUTES', 'FUEL DELIVERY PLAN'], route: 'Low earthworks conceal the approach; wooden service walks give sight over the depot and drop behind the runway patrol.', sectors: ['Forest edge', 'Depot earthworks', 'Fortress stores', 'Runway approach', 'Forest withdrawal'], lengths: [1020, 840, 900, 1200, 720], ledges: [530, 360, 390, 630, 260], colors: [0x182215, 0x0b1008, 0x3d4930] },
  { pack: 'mgs4', era: 'mgs4', name: 'Guns of the Patriots', location: 'Middle East / PMC-controlled city block', operative: 'old_snake', environment: 'facility', contact: 'otacon_mgs4', conversation: 'mgs4_otacon_modern', boss: 'Gekko',
    titles: ['Silent City Passage', 'Gekko Street Intercept'], intel: ['PMC PATROL DATA', 'CIVILIAN EVACUATION', 'SOP RELAY LOCATION'], route: 'Rubble terraces form a roof route while barricades shield the street; resupply is placed before the Gekko intersection.', sectors: ['Ruined side street', 'Rooftop access', 'PMC roadblock', 'Gekko intersection', 'Safe passage'], lengths: [840, 960, 780, 1140, 780], ledges: [340, 510, 260, 520, 390], colors: [0x29271f, 0x11100d, 0x5a5542] },
  { pack: 'peace_walker', era: 'peace_walker', name: 'Peace Walker', location: 'Costa Rica / Peace Sentinel supply network', operative: 'big_boss_pw', environment: 'jungle', contact: 'miller_pw', conversation: 'pw_miller_briefing', boss: 'Pupa',
    titles: ['Supply Network Survey', 'Pupa Combat Exercise'], intel: ['SUPPLY CHAIN', 'AI TRANSPORT LOG', 'RADIO INTERCEPT'], route: 'Supply stacks lead onto the jungle gantry; a low route behind the stores preserves ammunition for the AI encounter.', sectors: ['Jungle approach', 'Supply encampment', 'Transport gantry', 'AI testing area', 'MSF extraction'], lengths: [960, 1140, 840, 1260, 660], ledges: [410, 650, 290, 580, 240], colors: [0x162617, 0x07110a, 0x344e31] },
  { pack: 'mgsv_ground_zeroes', era: 'mgsv', name: 'Ground Zeroes', location: 'Camp Omega / auxiliary service perimeter', operative: 'big_boss_gz', environment: 'facility', contact: 'miller_gz', conversation: 'mgsv_assetpass_area_report', boss: 'STOUT IFV-SC',
    titles: ['Omega Blackout Recon', 'Armored Exit Route'], intel: ['PRISON TRANSFER LOG', 'WATCHTOWER SCHEDULE', 'LANDING ZONE MAP'], route: 'Drainage cover keeps the first approach concealed; watchtower platforms offer a shorter but illuminated escape route.', sectors: ['Drainage access', 'Service compound', 'Watchtower lane', 'Armored checkpoint', 'Coastal rendezvous'], lengths: [1080, 900, 1260, 960, 600], ledges: [620, 340, 590, 420, 230], colors: [0x162724, 0x050e0c, 0x354b43] },
  { pack: 'mgsv_phantom_pain', era: 'mgsv', name: 'The Phantom Pain', location: 'Afghanistan / Soviet communications perimeter', operative: 'venom_snake', environment: 'jungle', contact: 'ocelot_mgsv', conversation: 'mgsv_ocelot_training', boss: 'Sahelanthropus',
    titles: ['Mountain Relay Survey', 'Sahelanthropus Combat Trial'], intel: ['RELAY FREQUENCIES', 'CONVOY ROUTE', 'WEAPONS TELEMETRY'], route: 'Rock shelves bypass the checkpoint in stages; ground-level supply pockets allow recovery before the heavy-weapon trial.', sectors: ['Mountain approach', 'Relay outpost', 'Supply road', 'Heavy-weapon range', 'Helicopter rendezvous'], lengths: [1200, 840, 1020, 1380, 660], ledges: [680, 380, 490, 760, 260], colors: [0x31271c, 0x130e08, 0x675237] },
  { pack: 'vr_simulation', era: 'vr_simulation', name: 'VR Training', location: 'VR / layered infiltration course', operative: 'vr_operative', environment: 'vr', contact: 'vr_instructor', conversation: 'vr_instructor_default', boss: 'VR Combat Target',
    titles: ['Stealth Certification', 'Advanced Combat Certification'], intel: ['TRAINING NODE A', 'TRAINING NODE B', 'TRAINING NODE C'], route: 'Read the searchlight cycle and alternate between the three training elevations. All data nodes are required for certification.', sectors: ['Movement module', 'Vertical route module', 'Surveillance module', 'Combat module', 'Certification terminal'], lengths: [600, 780, 960, 1080, 540], ledges: [220, 310, 470, 510, 190], colors: [0x0c2430, 0x02080e, 0x1b4b62] },
  { pack: 'patriots_ai', era: 'patriots_ai', name: 'Patriots AI', location: 'GW / reconstructed Arsenal memory', operative: 'raiden_corrupted', environment: 'vr', contact: 'patriots_colonel_ai', conversation: 'patriots_ai_default', boss: 'GW Control Core',
    titles: ['Memory Integrity Check', 'Control Core Isolation'], intel: ['MEMORY FRAGMENT 01', 'MEMORY FRAGMENT 02', 'MEMORY FRAGMENT 03'], route: 'Reconstructed walkways create alternating safe routes. Recover the evidence before entering the isolated core sector.', sectors: ['Memory ingress', 'Arsenal reconstruction', 'Signal filter', 'Control core', 'Clean signal exit'], lengths: [780, 1200, 900, 1080, 720], ledges: [330, 710, 360, 570, 270], colors: [0x18122a, 0x090510, 0x41304f] }
];

const STAGES = ['recover_keycard', 'open_security_door', 'cross_security_yard', 'defeat_captain', 'extract'] as const;

function codecCalls(design: ChapterDesign, title: string): SideOpsMissionProfile['codec'] {
  const call = (trigger: ConversationTrigger, message: string): RuntimeCodecCall => ({ trigger, contactId: design.contact, conversationId: design.conversation, message, pauseGame: false });
  return {
    missionStart: call('mission_start', `${title}: ${design.route}`),
    keycardFound: call('keycard_found', 'Access credentials secured. Continue to the checkpoint.'),
    lowHealth: call('low_health', 'Health critical. Find cover and use a ration.'),
    missionFailed: call('low_health', 'Operation failed. Review the patrol routes before retrying.'),
    missionComplete: call('mission_complete', 'Extraction confirmed. Tactical record saved.'),
    manual: call('manual_call', design.route),
    chaff: call('manual_call', 'Electronic surveillance temporarily disrupted.'),
    cameraDown: call('camera_detected', 'Surveillance camera disabled.'),
    cqc: call('manual_call', 'Patrol neutralized. Move the route forward.'),
    firstAlert: call('first_alert', 'Contact confirmed. Break line of sight and change route.'),
    suspicion: call('suspicion', 'A patrol is investigating. Stay behind cover.'),
    evasion: call('evasion', 'Search teams lost direct contact. Keep moving under cover.'),
    caution: call('caution', 'Patrols remain cautious.'),
    reinforcement: call('reinforcement', 'A response team entered the sector.'),
    cameraDetected: call('camera_detected', 'Surveillance contact. Move below the camera cone.'),
    searchlight: call('searchlight_detected', 'Searchlight contact. Find a covered route.'),
    bossIntro: call('boss_intro', `${design.boss} encountered. Check your ammunition and cover.`),
    bossMidfight: call('boss_midfight', `${design.boss} changed its attack pattern.`),
    bossDefeated: call('boss_defeated', 'The extraction route is now clear.'),
    secret: call('secret_frequency', 'Intelligence recovered. Check the remaining caches.')
  };
}

function createMission(design: ChapterDesign, order: 1 | 2): SideOpsCampaignMission {
  const assault = order === 2;
  const id = `sideops_${design.pack}_${assault ? 'assault' : 'recon'}`;
  const chapterId = `sideops_chapter_${design.pack}`;
  const title = design.titles[order - 1];
  // The second operation extends and rearranges sections instead of merely
  // raising enemy HP on the reconnaissance layout.
  const lengths = design.lengths.map((length, index) => length + (assault && index % 2 === 0 ? 180 : 0));
  const boundaries = [0];
  lengths.forEach((length) => boundaries.push(boundaries[boundaries.length - 1] + length));
  const worldWidth = boundaries[5];
  const sectors = design.sectors.map((label, index) => ({ id: `${id}_sector_${index + 1}`, label, fromX: boundaries[index], toX: boundaries[index + 1], routeHint: design.route }));
  const routeX = design.ledges.map((offset, index) => Math.min(worldWidth - 380, boundaries[index] + (assault ? lengths[index] - offset : offset)));
  const platforms: SideOpsMissionProfile['platforms'] = [{ x: worldWidth / 2, y: 520, scaleX: worldWidth / 64 }];
  routeX.forEach((x, index) => {
    // 85px steps remain within the 430px/s jump at 900px/s² gravity.
    platforms.push({ x: x - 110, y: 435, scaleX: 2.5 }, { x: x + 80, y: 350, scaleX: index === 2 ? 5 : 3.5 });
    if (index === 1 || index === 3) platforms.push({ x: x + 250, y: 435, scaleX: 2.5 });
  });
  const doorX = boundaries[2] - 75;
  const searchlightX = boundaries[2] + lengths[2] * (assault ? 0.67 : 0.43);
  const bossArenaX = boundaries[3] + 100;
  const bossX = boundaries[3] + lengths[3] * 0.62;
  const keyX = routeX[1] + 65;
  const minimumSecrets = design.pack === 'vr_simulation' ? 3 : assault ? 1 : 2;
  const stageLabels: SideOpsMissionProfile['stageLabels'] = {
    recover_keycard: 'Recover the sector access credentials',
    open_security_door: `Unlock ${design.sectors[1].toLowerCase()} exit`,
    cross_security_yard: `Recover ${minimumSecrets} intelligence cache${minimumSecrets === 1 ? '' : 's'} and cross ${design.sectors[2].toLowerCase()}`,
    defeat_captain: assault ? `Neutralize ${design.boss}` : 'Reach the extraction sector with the intelligence',
    extract: `Extract at ${design.sectors[4].toLowerCase()}`
  };
  const textures = SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES[design.pack];
  const guards: SideOpsMissionProfile['guards'] = [];
  for (let index = 0; index < 5; index++) {
    const from = boundaries[index];
    guards.push({ x: from + 300, y: 472, patrolMin: from + 210, patrolMax: Math.min(boundaries[index + 1] - 130, routeX[index] + 225), role: 'patrol', hp: assault ? 2 : 1 });
    if (assault && (index === 1 || index === 2 || index === 4)) {
      guards.push({ x: routeX[index] + 60, y: 310, patrolMin: routeX[index] + 5, patrolMax: routeX[index] + 145, role: 'reinforcement', hp: 2 });
    }
  }
  const profile: SideOpsCampaignMission['profile'] = {
    id, title, era: design.era, visualPackId: design.pack, environment: design.environment,
    location: design.location, header: `${title.toUpperCase()} // ${design.name.toUpperCase()}`,
    worldWidth, groundColor: design.colors[0], backdropColor: design.colors[1], structureColor: design.colors[2],
    start: { x: 95, y: 472 }, playerTexture: textures.playerTexture,
    startAmmo: assault ? 44 : 18, startRations: assault ? 2 : 1, startChaff: assault ? 2 : 1,
    initialObjectives: ['infiltrate_sector'], totalObjectives: assault ? 6 : 5,
    door: { x: doorX, y: 462, label: 'sector access gate' },
    camera: { x: boundaries[1] + lengths[1] * 0.68, y: 245 },
    searchlight: { x: searchlightX, y: 130, sweep: Math.min(420, lengths[2] * 0.42) },
    elevator: { x: worldWidth - 100, y: 470, label: design.sectors[4].toLowerCase() },
    keycard: { x: keyX, y: 310, label: 'Sector Access Credentials' },
    boss: { name: design.boss, x: bossX, y: 456, hp: assault ? 18 : 10, texture: textures.bossTexture, baseFacingRight: design.bossFacingRight ?? true, tintPhaseOne: 0xffffff, tintPhaseTwo: 0xff8470 },
    guardTexture: textures.guardTexture, reinforcementTexture: textures.reinforcementTexture,
    platforms,
    crates: routeX.flatMap((x, index) => [{ x: boundaries[index] + 155, y: 486 }, { x: Math.min(worldWidth - 220, x + 290), y: 486 }]),
    guards,
    pickups: [
      { x: routeX[0] + 50, y: 310, kind: 'ration' },
      { x: boundaries[2] - 170, y: 480, kind: 'chaff' },
      { x: boundaries[3] + 40, y: 480, kind: 'ammo' },
      { x: routeX[3] + 80, y: 310, kind: 'ammo' },
      { x: boundaries[4] + 110, y: 480, kind: 'ration' }
    ],
    secrets: [0, 2, 4].map((sectorIndex, intelIndex) => ({ x: routeX[sectorIndex] + 85, y: 310, id: `${id}_intel_${intelIndex + 1}`, label: design.intel[intelIndex] })),
    stageLabels,
    completionX: { openDoor: doorX + 45, crossYard: boundaries[3] - 80, bossArena: bossArenaX },
    codec: Object.fromEntries(Object.entries(codecCalls(design, title)).map(([slot, call]) => [slot, { ...call, conversationId: `${id}_codec_${slot}` }])) as SideOpsMissionProfile['codec']
  };
  const objectives = [{ id: 'infiltrate_sector', label: 'Enter the operation area', completedByDefault: true }, ...STAGES.filter((stage) => assault || stage !== 'defeat_captain').map((stage) => ({ id: stage, label: stageLabels[stage], completedByDefault: false }))];
  const definition: MissionDefinition = {
    id, title, era: design.era, mode: 'side_scroller', location: design.location, mainCharacter: design.operative,
    difficulty: assault ? 5 : 3, mapKey: `sideops_campaign_${design.pack}_${order}`, briefingConversation: profile.codec.missionStart.conversationId, debriefingConversation: profile.codec.missionComplete.conversationId,
    objectives, availableItems: ['ration', 'chaff_grenade', 'ammo_box', 'keycard_lv1', 'hidden_archive_fragment'],
    enemies: [textures.guardTexture, textures.reinforcementTexture, ...(assault ? [textures.bossTexture] : [])],
    ...(assault ? { boss: design.boss } : {}),
    codecTriggers: Object.values(profile.codec).filter((call, index, calls) => calls.findIndex((other) => other.trigger === call.trigger) === index).map((call) => ({ trigger: call.trigger, contactId: call.contactId, conversationId: call.conversationId, priority: 'normal', pauseGame: false }))
  };
  return {
    id, chapterId, order, definition, profile, sectors,
    briefing: `${assault ? `Clear the route through ${design.boss} and recover one intelligence cache.` : `Recover ${minimumSecrets} intelligence caches and extract without requiring a boss engagement.`} ${design.route}`,
    designNotes: `Original ${design.name} tactical simulation. Five connected sectors, two traversable elevations, three intelligence caches and protected pre-encounter resupply.`,
    rules: { bossRequired: assault, minimumSecrets },
    prerequisites: assault ? [`sideops_${design.pack}_recon`] : [],
    challenges: [
      { id: `${id}_ghost`, label: 'Ghost: trigger no alerts', kind: 'no_alerts', target: 0 },
      { id: `${id}_intel`, label: 'Archivist: recover all three caches', kind: 'all_intel', target: 3 },
      assault
        ? { id: `${id}_undamaged`, label: 'Untouchable: take no damage', kind: 'no_damage', target: 0 }
        : { id: `${id}_nonlethal`, label: 'No casualties: avoid lethal takedowns', kind: 'no_kills', target: 0 },
      { id: `${id}_speed`, label: `Rapid extraction: under ${assault ? 360 : 300} seconds`, kind: 'speed', target: assault ? 360 : 300 }
    ]
  };
}

const coreOperations = CHAPTERS.flatMap((chapter) => [createMission(chapter, 1), createMission(chapter, 2)]);
export const SIDEOPS_CAMPAIGN_OPERATIONS: readonly SideOpsCampaignMission[] = [
  ...coreOperations,
  ...createPeaceWalkerHeavyOperations(coreOperations.find((operation) => operation.id === 'sideops_peace_walker_assault')!)
];
export const SIDEOPS_CAMPAIGN_MISSIONS: readonly MissionDefinition[] = SIDEOPS_CAMPAIGN_OPERATIONS.map((operation) => operation.definition);

/** Mission-specific, original support text prevents cross-era narrative leaks
 * (notably 1984 Phantom Pain dialogue appearing in a 1975 Ground Zeroes op). */
export const SIDEOPS_CAMPAIGN_CONVERSATIONS: readonly ConversationDefinition[] = SIDEOPS_CAMPAIGN_OPERATIONS.flatMap((operation) => Object.entries(operation.profile.codec).map(([slot, call]) => ({
  id: call.conversationId, era: operation.profile.era, title: `${operation.definition.title} / ${slot.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
  contactId: call.contactId, frequency: contacts.find((contact) => contact.id === call.contactId)?.frequency ?? 140.85,
  trigger: call.trigger, canReplay: true, canonStatus: 'simulation' as const, loreBasis: 'original_lore_grounded' as const,
  subjectId: operation.id, topicLabel: operation.definition.title,
  lines: [{ speaker: contacts.find((contact) => contact.id === call.contactId)?.name ?? call.contactId, text: slot === 'missionStart' ? operation.briefing : call.message, emotion: slot === 'firstAlert' || slot === 'lowHealth' ? 'warning' as const : 'serious' as const, speed: 'normal' as const }]
})));

export function getSideOpsCampaignMission(missionId: string | null | undefined): SideOpsCampaignMission | undefined {
  return SIDEOPS_CAMPAIGN_OPERATIONS.find((mission) => mission.id === missionId);
}

export function resolveSideOpsCampaignProfile(missionId: string): SideOpsCampaignMission['profile'] | null {
  return getSideOpsCampaignMission(missionId)?.profile ?? null;
}

export function getSideOpsCampaignSector(missionId: string, playerX: number): SideOpsCampaignSector | undefined {
  const sectors = getSideOpsCampaignMission(missionId)?.sectors;
  return sectors?.find((sector, index) => playerX >= sector.fromX && (playerX < sector.toX || index === sectors.length - 1));
}

/** Mandatory rules only; optional mastery challenges never soft-lock a run. */
export function getSideOpsCampaignExtractionBlocker(missionId: string, snapshot: Pick<SideOpsCampaignRunSnapshot, 'hasKeycard' | 'bossDefeated' | 'secretsFound'>): string | null {
  const mission = getSideOpsCampaignMission(missionId);
  if (!mission) return null;
  if (!snapshot.hasKeycard) return 'Recover the sector access credentials before extraction.';
  if (snapshot.secretsFound < mission.rules.minimumSecrets) return `Recover ${mission.rules.minimumSecrets - snapshot.secretsFound} more intelligence cache(s) before extraction.`;
  if (mission.rules.bossRequired && !snapshot.bossDefeated) return `Neutralize ${mission.profile.boss.name} before extraction.`;
  return null;
}

export function evaluateSideOpsCampaignChallenges(missionId: string, snapshot: SideOpsCampaignRunSnapshot): Array<SideOpsCampaignChallenge & { completed: boolean }> {
  const mission = getSideOpsCampaignMission(missionId);
  if (!mission) return [];
  return mission.challenges.map((challenge) => {
    const completed = challenge.kind === 'no_alerts' ? snapshot.alerts <= challenge.target
      : challenge.kind === 'no_kills' ? snapshot.kills <= challenge.target
        : challenge.kind === 'all_intel' ? snapshot.secretsFound >= challenge.target
          : challenge.kind === 'no_damage' ? snapshot.damageTaken <= challenge.target
            : snapshot.timeSeconds <= challenge.target;
    return { ...challenge, completed };
  });
}

export const SIDEOPS_CAMPAIGN_DEFINITION: CampaignDefinition = {
  id: 'sideops_tactical_anthology', title: 'Tactical Anthology', subtitle: '28 operations / 12 theaters',
  description: 'Original tactical simulations across Metal Gear eras. Infiltrate, recover intelligence, master alternate routes and clear a heavy encounter in each theater.',
  era: 'multi', author: 'Shadow Codec Ops', version: '1.2.0', source: 'built_in', published: true,
  briefing: { id: 'anthology_briefing', title: 'Tactical Anthology', body: 'Each theater begins with reconnaissance. Recover intelligence and extract to unlock its combat operation. Ghost, no-casualty, complete-intelligence and speed challenges reward mastery.', tone: 'briefing', confirmLabel: 'Choose an operation' },
  initialUnlocks: { missionIds: SIDEOPS_CAMPAIGN_OPERATIONS.filter((operation) => operation.order === 1).map((operation) => operation.id), vrMissionIds: [], tapeIds: [], contactIds: [], loreIds: [] },
  chapters: CHAPTERS.map((design) => {
    const operations = SIDEOPS_CAMPAIGN_OPERATIONS.filter((operation) => operation.profile.visualPackId === design.pack);
    return {
      id: `sideops_chapter_${design.pack}`, title: design.name, subtitle: design.location, description: design.route,
      briefing: { id: `anthology_${design.pack}_briefing`, title: design.name, body: design.route, tone: 'briefing' as const },
      nodes: operations.map((operation, operationIndex) => ({
        id: `node_${operation.id}`, title: operation.definition.title, description: operation.briefing,
        module: 'sideops' as const, targetId: operation.id, era: design.era,
        prerequisites: operation.prerequisites.map((id) => `node_${id}`),
        ...(operation.optional ? { optional: true } : {}),
        condition: { type: 'sideops_clear' as const, missionId: operation.id },
        reward: { xp: operation.order === 1 ? 240 : 420, resources: { commandPoints: operation.order === 1 ? 2 : 4, intel: operation.order === 1 ? 3 : 2, supplies: operation.order === 1 ? 2 : 4 }, unlockMissionIds: operations.filter((candidate) => candidate.prerequisites.includes(operation.id)).map((candidate) => candidate.id), ...(operation.order === 2 ? { badges: [`${design.name.toUpperCase()} FIELD CERTIFIED`] } : {}) },
        layout: { x: operationIndex * 350, y: operation.optional ? 140 : 0 },
        completionPresentation: { id: `${operation.id}_debrief`, title: operation.order === 1 ? 'Reconnaissance complete' : 'Theater certified', body: operation.order === 1 ? `Intelligence secured. ${operations[1].definition.title} is now available.` : `${design.name} combat operation cleared. ${operations.filter((candidate) => candidate.prerequisites.includes(operation.id)).map((candidate) => `${candidate.definition.title} is now available. `).join('')}Replay cleared operations to master the optional challenges.`, tone: 'debriefing' as const }
      }))
    };
  })
};
