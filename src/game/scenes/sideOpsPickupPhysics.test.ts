import { afterAll, describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({ default: { Scene: class {}, Math: { Between: (minimum: number) => minimum } } }));

import { SideOpsScene } from './SideOpsScene';
import { Mg1OuterHeavenScene } from './Mg1OuterHeavenScene';
import { Mgs1ShadowMosesScene } from './Mgs1ShadowMosesScene';
import { getSideOpsCampaignMission } from '../core/sideOpsCampaign';
import { MG1_ENCOUNTER_SEQUENCE } from '../core/mg1OuterHeavenMission';
import { MGS1_BOSS_SEQUENCE, MGS1_FIELD_PICKUPS, type Mgs1BossEncounterDefinition } from '../core/mgs1ShadowMosesMission';

function sprite(x = 0, y = 0, texture = '') {
  return {
    x, y, texture, active: true,
    body: { immovable: false, allowGravity: true, setAllowGravity(value: boolean) { this.allowGravity = value; } },
    setImmovable(value: boolean) { this.body.immovable = value; return this; },
    setTint() { return this; }, setDepth() { return this; }, setScale() { return this; },
    setOrigin() { return this; }, destroy() { this.active = false; },
  };
}

type Sprite = ReturnType<typeof sprite>;
type Overlap = { item: Sprite; callback: () => void };
interface Harness {
  physics: { add: { sprite: ReturnType<typeof vi.fn>; staticSprite: ReturnType<typeof vi.fn>; collider: ReturnType<typeof vi.fn>; overlap: ReturnType<typeof vi.fn> } };
  add: { text: ReturnType<typeof vi.fn> };
  player: object;
  platforms: object;
  playerProjectiles: object;
  profile: NonNullable<ReturnType<typeof getSideOpsCampaignMission>>['profile'];
  completedObjectives: Set<string>;
  hasAccessCard: boolean;
  hasKeycard: boolean;
  ammo: number;
  maxAmmo: number;
  rations: number;
  objectiveText: { setText: ReturnType<typeof vi.fn> };
  flashStatus: ReturnType<typeof vi.fn>;
  emitCodec: ReturnType<typeof vi.fn>;
  emitProfileCodec: ReturnType<typeof vi.fn>;
  collectFieldPickup: ReturnType<typeof vi.fn>;
  resolveTexture: (texture: string) => string;
  resolveActorTexture: (texture: string) => string;
  configureActorSprite: ReturnType<typeof vi.fn>;
  playActorAction: ReturnType<typeof vi.fn>;
  fireBossAttack: ReturnType<typeof vi.fn>;
  triggerAlert: ReturnType<typeof vi.fn>;
  createPickups(platforms: object): void;
  createAccessObjective(): void;
  spawnSupplies(): void;
  spawnFieldPickups(): void;
  spawnBossEncounter(encounter: Mgs1BossEncounterDefinition): void;
}

function harness(scene: object) {
  const subject = scene as Harness;
  const items: Sprite[] = [];
  const overlaps: Overlap[] = [];
  subject.physics = { add: {
    sprite: vi.fn((x: number, y: number, texture: string) => { const item = sprite(x, y, texture); items.push(item); return item; }),
    staticSprite: vi.fn(sprite), collider: vi.fn(),
    overlap: vi.fn((_actor: object, item: Sprite, callback: () => void) => { overlaps.push({ item, callback }); }),
  } };
  subject.add = { text: vi.fn(sprite) };
  subject.player = {}; subject.platforms = {}; subject.playerProjectiles = {};
  subject.completedObjectives = new Set(); subject.hasAccessCard = false; subject.hasKeycard = false;
  subject.ammo = 0; subject.maxAmmo = 99; subject.rations = 0;
  subject.objectiveText = { setText: vi.fn() };
  subject.flashStatus = vi.fn(); subject.emitCodec = vi.fn(); subject.emitProfileCodec = vi.fn();
  subject.resolveTexture = (texture) => texture; subject.resolveActorTexture = (texture) => texture;
  subject.configureActorSprite = vi.fn(); subject.playActorAction = vi.fn();
  subject.fireBossAttack = vi.fn(); subject.triggerAlert = vi.fn();
  return { subject, items, overlaps };
}

function expectGroundedContract(subject: Harness, items: Sprite[]) {
  for (const item of items) {
    expect(item.body).toMatchObject({ immovable: false, allowGravity: true });
    expect(subject.physics.add.collider).toHaveBeenCalledWith(item, subject.platforms);
  }
}

afterAll(() => { vi.doUnmock('phaser'); vi.resetModules(); });

describe('Arcade ground collectible regression', () => {
  it('keeps the shared campaign keycard separable and awards its objective once', () => {
    const { subject, items, overlaps } = harness(new SideOpsScene());
    subject.profile = { ...getSideOpsCampaignMission('sideops_mgs1_recon')!.profile, pickups: [], secrets: [] };
    subject.createPickups(subject.platforms);
    expect(items).toHaveLength(1);
    expectGroundedContract(subject, items);
    overlaps[0].callback(); overlaps[0].callback();
    expect(subject.hasKeycard).toBe(true);
    expect(items[0].active).toBe(false);
    expect(subject.completedObjectives.has('recover_keycard')).toBe(true);
    expect(subject.emitProfileCodec).toHaveBeenCalledOnce();
  });

  it('keeps the MG1 access card on its support and unlocks access through overlap', () => {
    const { subject, items, overlaps } = harness(new Mg1OuterHeavenScene());
    subject.createAccessObjective();
    expectGroundedContract(subject, items);
    overlaps[0].callback(); overlaps[0].callback();
    expect(subject.hasAccessCard).toBe(true);
    expect(items[0].active).toBe(false);
    expect(subject.completedObjectives.has('establish_resistance_contact')).toBe(true);
    expect(subject.emitCodec).toHaveBeenCalledOnce();
  });

  it('keeps every MG1 supply above static ground and collects ammunition once', () => {
    const { subject, items, overlaps } = harness(new Mg1OuterHeavenScene());
    subject.spawnSupplies();
    expect(items).toHaveLength(MG1_ENCOUNTER_SEQUENCE.length - 1);
    expectGroundedContract(subject, items);
    overlaps[0].callback(); overlaps[0].callback();
    expect(subject.ammo).toBe(12);
    expect(items[0].active).toBe(false);
    overlaps[2].callback(); overlaps[2].callback();
    expect(subject.rations).toBe(1);
  });

  it('preserves grounded MGS1 field pickups and single collection callbacks', () => {
    const { subject, items, overlaps } = harness(new Mgs1ShadowMosesScene());
    subject.collectFieldPickup = vi.fn();
    subject.spawnFieldPickups();
    expect(items).toHaveLength(MGS1_FIELD_PICKUPS.length);
    expectGroundedContract(subject, items);
    overlaps[0].callback(); overlaps[0].callback();
    expect(subject.collectFieldPickup).toHaveBeenCalledExactlyOnceWith(MGS1_FIELD_PICKUPS[0]);
    expect(items[0].active).toBe(false);
  });
});

describe('grounded stationary boss regression', () => {
  it.each(MGS1_BOSS_SEQUENCE.filter((encounter: Mgs1BossEncounterDefinition) => encounter.stationary && !encounter.airborne))(
    '$name remains separable from static terrain while horizontal movement is AI-controlled', (encounter) => {
      const { subject, items } = harness(new Mgs1ShadowMosesScene());
      subject.spawnBossEncounter(encounter);
      expect(items).toHaveLength(1);
      expectGroundedContract(subject, items);
    },
  );
});
