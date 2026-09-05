import { afterAll, describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({ default: { Scene: class {}, Math: { Between: (minimum: number) => minimum } } }));

import { SideOpsScene } from './SideOpsScene';
import { getSideOpsCampaignMission, type SideOpsCampaignMission } from '../core/sideOpsCampaign';
import type { MissionCompletePayload } from '../core/GameEvents';

interface SceneHarness {
  profile: SideOpsCampaignMission['profile'];
  campaignMission: SideOpsCampaignMission;
  player: { x: number };
  time: { now: number; delayedCall?: (duration: number, callback: () => void) => void };
  missionElapsedMs: number;
  hasKeycard: boolean;
  secretsFound: Set<string>;
  completedObjectives: Set<string>;
  objectiveStage: string;
  boss: { active: boolean; defeated: boolean } | null;
  objectiveText: { setText: ReturnType<typeof vi.fn> };
  scene: { start: ReturnType<typeof vi.fn> };
  emitProfileCodec: ReturnType<typeof vi.fn>;
  anims: { exists: () => boolean };
  textures: { exists: () => boolean };
  add: { tileSprite: ReturnType<typeof vi.fn>; image: ReturnType<typeof vi.fn> };
  createPlatform(group: unknown, x: number, y: number, scaleX: number): void;
  addCrate(x: number, y: number, group: unknown, special?: boolean): void;
  updateObjectiveState(): void;
  completeMission(): void;
  getObjectiveLabel(): string;
  playMg1ActorLoop(sprite: unknown, state: string): void;
  playMg1ActorAction(sprite: unknown, state: string): void;
}

function createHarness(id: string, intel = 2): SceneHarness {
  const campaignMission = getSideOpsCampaignMission(id)!;
  const scene = new SideOpsScene() as unknown as SceneHarness;
  scene.profile = campaignMission.profile;
  scene.campaignMission = campaignMission;
  scene.player = { x: campaignMission.profile.worldWidth - 100 };
  scene.time = { now: 45000 };
  scene.missionElapsedMs = 45000;
  scene.hasKeycard = true;
  scene.secretsFound = new Set(Array.from({ length: intel }, (_, index) => `intel-${index}`));
  scene.completedObjectives = new Set([...campaignMission.profile.initialObjectives, 'recover_keycard']);
  scene.boss = null;
  scene.objectiveText = { setText: vi.fn() };
  scene.scene = { start: vi.fn() };
  scene.emitProfileCodec = vi.fn();
  return scene;
}

afterAll(() => {
  vi.doUnmock('phaser');
  vi.resetModules();
});

describe('Side Ops campaign scene integration', () => {
  it('extracts reconnaissance without a boss and completes the five real objectives', () => {
    const scene = createHarness('sideops_mgs3_recon');
    scene.updateObjectiveState();
    expect(scene.objectiveStage).toBe('extract');
    scene.completeMission();
    expect(scene.scene.start).toHaveBeenCalledOnce();
    const result = scene.scene.start.mock.calls[0][1] as MissionCompletePayload & { bossRequired: boolean; campaignChallenges: unknown[] };
    expect(result.success).toBe(true);
    expect(result.bossRequired).toBe(false);
    expect(result.bossName).toBe('');
    expect(result.bossDefeated).toBe(false);
    expect(result.objectivesCompleted).toBe(5);
    expect(result.totalObjectives).toBe(5);
    expect(result.campaignChallenges).toHaveLength(4);
  });

  it('requires intelligence and access credentials for recon, including three VR nodes', () => {
    const missingIntel = createHarness('sideops_mgs3_recon', 1);
    missingIntel.updateObjectiveState();
    expect(missingIntel.objectiveStage).toBe('cross_security_yard');
    missingIntel.completeMission();
    expect(missingIntel.scene.start).not.toHaveBeenCalled();
    expect(missingIntel.objectiveText.setText.mock.calls[0][0]).toContain('1 more intelligence');
    const missingCard = createHarness('sideops_mgs3_recon', 3);
    missingCard.hasKeycard = false;
    missingCard.completeMission();
    expect(missingCard.objectiveText.setText.mock.calls[0][0]).toContain('access credentials');
    const vr = createHarness('sideops_vr_simulation_recon', 2);
    vr.completeMission();
    expect(vr.scene.start).not.toHaveBeenCalled();
  });

  it('ranks active gameplay time rather than the age of the browser page or paused wall time', () => {
    const scene = createHarness('sideops_mgs1_recon', 3);
    scene.time.now = 900000;
    scene.missionElapsedMs = 12500;
    scene.completeMission();
    const result = scene.scene.start.mock.calls[0][1] as MissionCompletePayload;
    expect(result.timeSeconds).toBe(13);
  });

  it('retains the heavy encounter requirement for assault missions', () => {
    const scene = createHarness('sideops_mg2_assault', 1);
    scene.boss = { active: true, defeated: false };
    scene.completeMission();
    expect(scene.scene.start).not.toHaveBeenCalled();
    expect(scene.objectiveText.setText.mock.calls[0][0]).toContain('Metal Gear D');
  });

  it('uses the authored gate coordinate and includes remaining intel in objective text', () => {
    const scene = createHarness('sideops_mgsv_phantom_pain_recon', 1);
    scene.player.x = 1700;
    expect(scene.profile.completionX.openDoor).toBeGreaterThan(1700);
    scene.updateObjectiveState();
    expect(scene.objectiveStage).toBe('open_security_door');
    expect(scene.getObjectiveLabel()).toContain('INTEL 1/2');
  });
});

describe('Side Ops authored animation scene integration', () => {
  function spriteHarness() {
    const data = new Map<string, unknown>([
      ['sideopsAuthoredPack', 'mgs3'], ['sideopsAuthoredRole', 'player'], ['mg1AnimationPriority', 0]
    ]);
    const sprite = {
      active: true,
      anims: { currentAnim: { key: '' }, isPlaying: false },
      getData: (key: string) => data.get(key),
      setData(key: string, value: unknown) { data.set(key, value); return this; },
      play: vi.fn((key: string) => { sprite.anims.currentAnim.key = key; sprite.anims.isPlaying = true; })
    };
    return sprite;
  }

  it('changes mobility clips while letting a completed jump hold its final pose', () => {
    const scene = createHarness('sideops_mgs3_recon');
    scene.anims = { exists: () => true };
    const sprite = spriteHarness();
    scene.playMg1ActorLoop(sprite, 'crouch');
    expect(sprite.play).toHaveBeenLastCalledWith('sideops-actor:mgs3:player:crouch');
    scene.playMg1ActorLoop(sprite, 'jump');
    sprite.anims.isPlaying = false;
    scene.playMg1ActorLoop(sprite, 'jump');
    expect(sprite.play).toHaveBeenCalledTimes(2);
    scene.playMg1ActorLoop(sprite, 'idle');
    expect(sprite.play).toHaveBeenLastCalledWith('sideops-actor:mgs3:player:idle');
  });

  it('uses distinct melee/hit/death clips and prevents lower-priority actions interrupting death', () => {
    const scene = createHarness('sideops_mgs3_recon');
    const timers: Array<() => void> = [];
    scene.time.delayedCall = (_duration, callback) => { timers.push(callback); };
    scene.anims = { exists: () => true };
    const sprite = spriteHarness();
    scene.playMg1ActorAction(sprite, 'melee');
    expect(sprite.play).toHaveBeenLastCalledWith('sideops-actor:mgs3:player:melee');
    scene.playMg1ActorLoop(sprite, 'move');
    expect(sprite.play).toHaveBeenCalledTimes(1);
    scene.playMg1ActorAction(sprite, 'hit');
    expect(sprite.play).toHaveBeenLastCalledWith('sideops-actor:mgs3:player:hit');
    scene.playMg1ActorAction(sprite, 'death');
    expect(sprite.play).toHaveBeenLastCalledWith('sideops-actor:mgs3:player:death');
    timers.forEach((callback) => callback());
    scene.playMg1ActorAction(sprite, 'attack');
    scene.playMg1ActorLoop(sprite, 'idle');
    expect(sprite.play).toHaveBeenCalledTimes(3);
    expect(sprite.getData('mg1AnimationPriority')).toBe(4);
  });
});

describe('Side Ops terrain rendering integration', () => {
  it('repeats material pixels while preserving the original scaled platform collider', () => {
    const scene = createHarness('sideops_mgs3_recon');
    const body = { width: 64, height: 16, left: 100, top: 427 };
    const collider = {
      body,
      setScale(scale: number) { body.width = 64 * scale; return this; },
      setTint() { return this; }, refreshBody() { return this; }, setVisible: vi.fn()
    };
    const tile = { tilePositionX: 0, setOrigin() { return this; }, setDepth() { return this; }, setData() { return this; } };
    const group = { create: vi.fn(() => collider) };
    scene.textures = { exists: () => true };
    scene.add = { tileSprite: vi.fn(() => tile), image: vi.fn() };
    scene.createPlatform(group, 200, 435, 3.5);
    expect(group.create).toHaveBeenCalledWith(200, 435, 'platform');
    expect(body.width).toBe(224);
    expect(body.height).toBe(16);
    expect(collider.setVisible).toHaveBeenCalledWith(false);
    expect(scene.add.tileSprite).toHaveBeenCalledWith(100, 427, 224, 32, 'sideops-terrain:mgs3:structure');
    expect(tile.tilePositionX).toBe(100);
  });

  it('replaces procedural crate rendering without changing the collision shape', () => {
    const scene = createHarness('sideops_mgs3_recon');
    const body = { width: 28, height: 40, center: { x: 200 }, bottom: 500 };
    const collider = { body, refreshBody: vi.fn(), setVisible: vi.fn() };
    const prop = { height: 40, setOrigin() { return this; }, setDepth() { return this; }, setData() { return this; }, setScale: vi.fn() };
    const group = { create: vi.fn(() => collider) };
    scene.textures = { exists: () => true };
    scene.add = { tileSprite: vi.fn(), image: vi.fn(() => prop) };
    scene.addCrate(200, 480, group);
    expect(group.create).toHaveBeenCalledWith(200, 480, 'crate');
    expect(body).toEqual({ width: 28, height: 40, center: { x: 200 }, bottom: 500 });
    expect(scene.add.image).toHaveBeenCalledWith(200, 500, 'mg1OuterHeavenSupplyCrate');
    expect(prop.setScale).toHaveBeenCalledWith(1);
    expect(collider.setVisible).toHaveBeenCalledWith(false);
  });
});
