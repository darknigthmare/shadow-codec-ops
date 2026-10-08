import type { SideOpsCampaignMission } from './sideOpsCampaign';
import type { SideOpsMissionProfile } from '../../types/missionBuilder.types';

/**
 * Original 1974 combat simulations, not recreations of the canonical finale.
 * Peace Walker uses its quadruped Basilisk silhouette; ZEKE keeps its own
 * bipedal railgun/radome configuration. Chrysalis and Cocoon are optional
 * supplemental trials after Pupa; the original Basilisk/ZEKE unlocks remain
 * unchanged so an existing save never loses access to an unlocked operation.
 */
export function createPeaceWalkerHeavyOperations(base: SideOpsCampaignMission): SideOpsCampaignMission[] {
  const designs = [
    {
      suffix: 'chrysalis', title: 'Chrysalis Airspace Intercept', boss: 'Chrysalis',
      texture: 'peaceWalkerChrysalis', prerequisite: base.id,
      location: 'Costa Rica / reconstructed aerial weapons testing perimeter',
      boundaries: [0, 840, 1760, 2700, 4440, 5140],
      ledges: [400, 1160, 2070, 2400, 4780],
      labels: ['Riverbank service track', 'Airspace control depot', 'Radar observation line', 'Chrysalis hover range', 'MSF recovery trail'],
      intel: ['AIRSPACE TRACKING DATA', 'HOVER CONTROL TELEMETRY', 'INTERCEPT TIMING RECORD'],
      route: 'Recover the airspace records above the service track. Resupply before the open hover range. Jump or use the low firing step to reach the airborne target, then move clear of its locked firing line.',
      intro: 'Chrysalis is holding above the range. Gain height to line up your shots, read its aiming posture, and move before the airborne volley.',
      bossX: 3660, bossY: 374, bossHp: 24, ammo: 66,
      arena: 2840, speed: 450
    },
    {
      suffix: 'cocoon', title: 'Cocoon Siege Range', boss: 'Cocoon',
      texture: 'peaceWalkerCocoon', prerequisite: 'sideops_peace_walker_chrysalis',
      location: 'Costa Rica / reconstructed armored testing corridor',
      boundaries: [0, 1000, 2100, 3180, 5200, 5980],
      ledges: [430, 1470, 2490, 2800, 5570],
      labels: ['Heavy transport approach', 'Armored range depot', 'Gunnery observation line', 'Cocoon siege corridor', 'MSF recovery perimeter'],
      intel: ['HEAVY CHASSIS TELEMETRY', 'GUNNERY RANGE LOG', 'ARMORED TRIAL REPORT'],
      route: 'Use the depot terraces to recover gunnery data. Restock before the broad armored corridor. Cocoon advances slowly: evade its aimed salvo and attack during the long recovery pause.',
      intro: 'Cocoon is entering the armored corridor. Keep space from its broad chassis, move after the target lock, and use the firing recovery to return fire.',
      bossX: 4270, bossY: 440, bossHp: 34, ammo: 72,
      arena: 3320, speed: 510
    },
    {
      suffix: 'basilisk', title: 'Basilisk Containment Range', boss: 'Peace Walker',
      texture: 'peaceWalkerBasilisk', prerequisite: base.id,
      location: 'Costa Rica / reconstructed Peace Walker testing perimeter',
      boundaries: [0, 900, 1880, 2840, 4460, 5080],
      ledges: [420, 1260, 2170, 2580, 4780],
      labels: ['Jungle service track', 'Telemetry checkpoint', 'Command relay', 'Basilisk containment range', 'MSF pickup zone'],
      intel: ['AI CONTROL TELEMETRY', 'TEST RANGE ACCESS LOG', 'MISSILE TRACKING RECORD'],
      route: 'Recover the telemetry above the service track. Cross the relay gantry, resupply before the open containment range, and move between conventional missile salvos.',
      intro: 'Peace Walker is bracing its dorsal launchers. Read the charge, then move between the conventional missile salvos.',
      bossX: 3720, bossY: 448, bossHp: 26, ammo: 60,
      arena: 2970, speed: 420
    },
    {
      suffix: 'zeke', title: 'ZEKE Railgun Field Trial', boss: 'Metal Gear ZEKE',
      texture: 'peaceWalkerZeke', prerequisite: 'sideops_peace_walker_basilisk',
      location: 'Costa Rica / MSF terrain-trial simulation',
      boundaries: [0, 1120, 2120, 3320, 5020, 5800],
      ledges: [360, 1540, 2490, 2920, 5460],
      labels: ['MSF training perimeter', 'Range access depot', 'Observation terraces', 'Railgun field-trial arena', 'Trial recovery point'],
      intel: ['RAILGUN TEST TELEMETRY', 'RADOME CALIBRATION DATA', 'MSF TRIAL REPORT'],
      route: 'Use the observation terraces to recover test data. Stock ammunition at the arena entrance, read ZEKE’s railgun charge, and change elevation before its precise shots.',
      intro: 'ZEKE is charging its railgun. Watch the aiming posture and change your position before the shot.',
      bossX: 4220, bossY: 440, bossHp: 28, ammo: 64,
      arena: 3460, speed: 450
    }
  ] as const;

  return designs.map((design) => {
    const id = `sideops_peace_walker_${design.suffix}`;
    const worldWidth = design.boundaries[5];
    const platforms: SideOpsMissionProfile['platforms'] = [
      { x: worldWidth / 2, y: 520, scaleX: worldWidth / 64 }
    ];
    // Five two-step routes use 85px rises. No overhead slab or crate intersects
    // the central boss range: wide quadrupeds can turn and telegraph safely.
    design.ledges.forEach((x, index) => {
      platforms.push({ x: x - 125, y: 435, scaleX: 2.5 });
      platforms.push({ x: x + 40, y: 350, scaleX: index === 2 ? 5 : 3.5 });
      if (index === 1 || index === 3) platforms.push({ x: x + 210, y: 435, scaleX: 2.5 });
    });
    // Low refuge at the arena entrance provides a reachable dodge route while
    // leaving the machine's movement corridor and extraction lane unobstructed.
    platforms.push({ x: design.arena - 120, y: 435, scaleX: 2 });
    const doorX = design.boundaries[2] - 85;
    const keycard = { x: design.ledges[1] + 30, y: 310, label: 'Range Access Credentials' };
    const messages: Partial<Record<keyof SideOpsMissionProfile['codec'], string>> = {
      missionStart: `${design.title}. ${design.route} This is an MSF tactical simulation, not a historical mission recording.`,
      manual: design.route,
      keycardFound: 'Range credentials recovered. Open the checkpoint before entering the observation sector.',
      bossIntro: design.intro,
      bossMidfight: `${design.boss} is increasing its firing pressure. Use the recovery pause to attack and reload your route supplies.`,
      bossDefeated: `${design.boss} trial complete. Recover the remaining telemetry and reach the MSF pickup zone.`,
      secret: 'Trial telemetry recovered. One record is mandatory; recover all three for the archive challenge.',
      missionComplete: 'MSF trial complete. Tactical results saved; this simulation does not alter the historical record.'
    };
    const codec = Object.fromEntries(Object.entries(base.profile.codec).map(([slot, call]) => [
      slot, { ...call, conversationId: `${id}_codec_${slot}`, message: messages[slot as keyof typeof messages] ?? call.message }
    ])) as SideOpsMissionProfile['codec'];
    const stageLabels: SideOpsMissionProfile['stageLabels'] = {
      recover_keycard: 'Recover range access credentials',
      open_security_door: 'Unlock the range checkpoint',
      cross_security_yard: 'Recover one telemetry cache and cross the observation sector',
      defeat_captain: `Complete the ${design.boss} combat trial`,
      extract: 'Extract at the MSF recovery point'
    };
    const guards: SideOpsMissionProfile['guards'] = [
      { x: 620, y: 472, patrolMin: 540, patrolMax: 780, role: 'patrol', hp: 2 },
      { x: design.boundaries[1] + 230, y: 472, patrolMin: design.boundaries[1] + 160, patrolMax: design.boundaries[1] + 420, role: 'patrol', hp: 2 },
      { x: design.ledges[1] + 45, y: 310, patrolMin: design.ledges[1], patrolMax: design.ledges[1] + 105, role: 'reinforcement', hp: 2 },
      { x: design.boundaries[2] + 190, y: 472, patrolMin: design.boundaries[2] + 100, patrolMax: design.boundaries[2] + 420, role: 'patrol', hp: 2 },
      { x: design.ledges[2] + 30, y: 310, patrolMin: design.ledges[2] - 60, patrolMax: design.ledges[2] + 140, role: 'reinforcement', hp: 2 },
      { x: design.boundaries[4] + 260, y: 472, patrolMin: design.boundaries[4] + 160, patrolMax: design.boundaries[4] + 380, role: 'patrol', hp: 2 }
    ];
    const profile: SideOpsCampaignMission['profile'] = {
      ...base.profile, id, title: design.title, location: design.location,
      header: `${design.title.toUpperCase()} // MSF 1974 SIMULATION`,
      worldWidth, startAmmo: design.ammo, startRations: 3, startChaff: 3,
      groundColor: design.suffix === 'zeke' ? 0x263329 : 0x1b2920,
      door: { x: doorX, y: 462, label: 'range access gate' },
      keycard, camera: { x: doorX - 210, y: 245 },
      searchlight: { x: design.boundaries[2] + 620, y: 130, sweep: 360 },
      elevator: { x: worldWidth - 100, y: 470, label: 'MSF recovery point' },
      boss: { name: design.boss, texture: design.texture, x: design.bossX, y: design.bossY, hp: design.bossHp, baseFacingRight: true, tintPhaseOne: 0xffffff, tintPhaseTwo: 0xff8470 },
      platforms, guards,
      crates: [180, design.boundaries[1] + 120, design.boundaries[2] + 75, design.arena - 240, design.boundaries[4] + 90].map((x) => ({ x, y: 486 })),
      pickups: [
        { x: design.ledges[0] + 30, y: 310, kind: 'ration' },
        { x: doorX - 170, y: 480, kind: 'chaff' },
        { x: design.arena - 210, y: 480, kind: 'ammo' },
        { x: design.arena - 70, y: 480, kind: 'ration' },
        { x: design.arena + 100, y: 480, kind: 'ammo' },
        { x: design.boundaries[4] - 120, y: 480, kind: 'ammo' },
        { x: design.boundaries[4] + 160, y: 480, kind: 'ration' }
      ],
      secrets: [0, 2, 4].map((ledge, index) => ({ x: design.ledges[ledge] + 45, y: 310, id: `${id}_intel_${index + 1}`, label: design.intel[index] })),
      stageLabels, completionX: { openDoor: doorX + 45, crossYard: design.boundaries[3] - 80, bossArena: design.arena }, codec
    };
    return {
      ...base, id, order: 2, profile,
      optional: design.suffix === 'chrysalis' || design.suffix === 'cocoon',
      prerequisites: [design.prerequisite],
      briefing: codec.missionStart.message,
      designNotes: 'Original 1974 MSF simulation. Authored approaches, mandatory telemetry, reachable 85px terraces, pre-fight resupply and an unobstructed heavy-machine arena. Not a canonical story-battle reconstruction.'
        + (design.suffix === 'chrysalis' ? ' Optional supplemental trial: Chrysalis holds a fixed flight altitude; no ground charge or invented helicopter maneuver.' : design.suffix === 'cocoon' ? ' Optional supplemental trial after Chrysalis; the existing Pupa-to-Basilisk unlock remains available.' : ''),
      rules: { bossRequired: true, minimumSecrets: 1 },
      sectors: design.labels.map((label, index) => ({ id: `${id}_sector_${index + 1}`, label, fromX: design.boundaries[index], toX: design.boundaries[index + 1], routeHint: design.route })),
      challenges: [
        { id: `${id}_ghost`, label: 'Ghost: trigger no alerts', kind: 'no_alerts', target: 0 },
        { id: `${id}_intel`, label: 'Archivist: recover all three caches', kind: 'all_intel', target: 3 },
        { id: `${id}_undamaged`, label: 'Untouchable: take no damage', kind: 'no_damage', target: 0 },
        { id: `${id}_speed`, label: `Rapid extraction: under ${design.speed} seconds`, kind: 'speed', target: design.speed }
      ],
      definition: {
        ...base.definition, id, title: design.title, location: design.location,
        difficulty: 5, mapKey: `sideops_campaign_peace_walker_${design.suffix}`,
        briefingConversation: codec.missionStart.conversationId,
        debriefingConversation: codec.missionComplete.conversationId,
        boss: design.boss,
        enemies: [profile.guardTexture, profile.reinforcementTexture, design.texture],
        objectives: [{ id: 'infiltrate_sector', label: 'Enter the trial perimeter', completedByDefault: true }, ...Object.entries(stageLabels).map(([stage, label]) => ({ id: stage, label, completedByDefault: false }))],
        codecTriggers: Object.values(codec).filter((call, index, calls) => calls.findIndex((other) => other.trigger === call.trigger) === index).map((call) => ({ trigger: call.trigger, contactId: call.contactId, conversationId: call.conversationId, priority: 'normal', pauseGame: false }))
      }
    };
  });
}
