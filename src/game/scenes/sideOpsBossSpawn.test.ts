import { afterAll, describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({ default: { Scene: class {}, Math: { Between: (minimum: number) => minimum } } }));
import { SideOpsScene } from './SideOpsScene';

interface Surface { left: number; right: number; top: number; bottom: number; enable: boolean }
const floor: Surface = { left: 0, right: 5400, top: 512, bottom: 528, enable: true };

function spawn(width: number, height: number, y = 456, surfaces: Surface[] = [floor]) {
  const item = {
    x: 4275.6, y,
    setY(value: number) { this.y = value; return this; },
    setDragX() { return this; }, setMaxVelocity() { return this; },
    setCollideWorldBounds() { return this; }, clearTint() { return this; },
    getData() { return undefined; },
    body: {} as { width: number; height: number; center: { x: number; y: number }; left: number; right: number; bottom: number; updateFromGameObject: ReturnType<typeof vi.fn> }
  };
  item.body = {
    width, height,
    get center() { return { x: item.x, y: item.y }; },
    get left() { return item.x - width / 2; },
    get right() { return item.x + width / 2; },
    get bottom() { return item.y + height / 2; },
    updateFromGameObject: vi.fn()
  };
  const subject = {
    profile: { boss: { x: item.x, y, texture: 'testBoss', hp: 18, baseFacingRight: true } },
    physics: { add: { sprite: vi.fn(() => item), collider: vi.fn(), overlap: vi.fn() } },
    platforms: { getChildren: () => surfaces.map(body => ({ body })) },
    configureMg1ActorSprite: vi.fn(), resolveMg1ActorTexture: (key: string) => key,
    maintainBossHover: vi.fn(),
    player: {}, bullets: {}, boss: undefined as unknown
  };
  (SideOpsScene.prototype as unknown as { createBoss(): void }).createBoss.call(subject);
  return { item, subject };
}

afterAll(() => { vi.doUnmock('phaser'); vi.resetModules(); });

describe('shared boss spawn support correction', () => {
  it('lifts Sahelanthropus out of a thin floor before the first physics tick', () => {
    const { item, subject } = spawn(144, 144);
    expect(item.y).toBe(440);
    expect(item.body.bottom).toBe(512);
    expect(item.body.center.x).toBe(4275.6);
    expect([item.body.width, item.body.height]).toEqual([144, 144]);
    expect(item.body.updateFromGameObject).toHaveBeenCalledOnce();
    expect(subject.physics.add.collider).toHaveBeenCalledWith(item, subject.platforms);
  });

  it.each([[48, 64], [128, 112], [112, 112], [160, 96], [128, 80], [112, 96]])(
    'keeps a clear or already supported %i x %i body at its configured center', (width, height) => {
      const { item } = spawn(width, height);
      expect(item.y).toBe(456);
      expect(item.body.updateFromGameObject).not.toHaveBeenCalled();
      expect([item.body.width, item.body.height]).toEqual([width, height]);
    }
  );

  it('does not snap a clear airborne boss down onto distant ground', () => {
    expect(spawn(144, 144, 300).item.y).toBe(300);
  });

  it('ignores overhead platforms, disabled supports and unrelated horizontal lanes', () => {
    const surfaces = [
      { ...floor, top: 427, bottom: 443 },
      { ...floor, enable: false },
      { ...floor, left: 4500, right: 4600 }
    ];
    const { item } = spawn(144, 144, 456, surfaces);
    expect(item.y).toBe(456);
    expect(item.body.updateFromGameObject).not.toHaveBeenCalled();
  });

  it('repairs an elevated spawn entered from above using the highest overlapping support', () => {
    const { item } = spawn(112, 112, 390, [{ ...floor, top: 442, bottom: 458 }, { ...floor, top: 435, bottom: 451 }, floor]);
    expect(item.body.bottom).toBe(435);
    expect(item.body.center.x).toBe(4275.6);
    expect([item.body.width, item.body.height]).toEqual([112, 112]);
  });
});
