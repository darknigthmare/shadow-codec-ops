import { afterAll, describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({ default: { Scene: class {}, Math: { Between: (minimum: number) => minimum } } }));
import { SideOpsScene } from './SideOpsScene';
import { SIDEOPS_BOSS_PROJECTILE_VISUALS, resolveSideOpsBossProjectileMuzzle } from '../core/sideOpsBossProjectileRegistry';

const methods = SideOpsScene.prototype as unknown as Record<string, (...args: unknown[]) => unknown>;
function vector(x = 0, y = 0) {
  return { x, y, copy(v: { x: number; y: number }) { this.x = v.x; this.y = v.y; return this; } };
}

function harness() {
  const data = new Map<string, unknown>();
  const item = {
    x: 0, y: 0, width: 24, height: 8, scaleX: 1, scaleY: 1, rotation: 0, flipX: false, flipY: false,
    active: false, texture: { key: 'guard' }, anims: { isPlaying: false, stop() { this.isPlaying = false; } },
    setTexture(key: string) { this.texture.key = key; this.width = key === 'guard' ? 24 : 192; this.height = key === 'guard' ? 8 : 64; return this; },
    setOrigin() { return this; }, clearTint() { return this; },
    setScale(value: number) { this.scaleX = value; this.scaleY = value; return this; },
    setDisplaySize(width: number, height: number) { this.scaleX = width / this.width; this.scaleY = height / this.height; return this; },
    setRotation(value: number) { this.rotation = value; return this; },
    setFlip(x: boolean, y: boolean) { this.flipX = x; this.flipY = y; return this; },
    setFlipX(value: boolean) { this.flipX = value; return this; },
    setData(key: string, value: unknown) { data.set(key, value); return this; }, getData(key: string) { return data.get(key); },
    play() { this.anims.isPlaying = true; return this; },
    setVelocity(x: number, y: number) { body.velocity.x = x; body.velocity.y = y; return this; },
    setVelocityX(x: number) { body.velocity.x = x; return this; }, setVelocityY(y: number) { body.velocity.y = y; return this; },
    enableBody(_reset: boolean, x: number, y: number) { this.active = true; body.reset(x, y); return this; },
    destroy() { this.active = false; },
    get body() { return body; }
  };
  // Mirrors Arcade Body.reset/updateFromGameObject/setSize/postUpdate geometry.
  // In particular reset snapshots prevFrame before later scale/offset changes.
  const body = {
    position: vector(), prev: vector(), prevFrame: vector(), velocity: vector(),
    sourceWidth: 24, sourceHeight: 8, width: 24, height: 8, offsetX: 0, offsetY: 0,
    reset(x: number, y: number) {
      item.x = x; item.y = y; this.velocity.x = 0; this.velocity.y = 0;
      this.position.x = x - item.width * item.scaleX / 2; this.position.y = y - item.height * item.scaleY / 2;
      this.prev.copy(this.position); this.prevFrame.copy(this.position);
    },
    updateFromGameObject() {
      this.width = this.sourceWidth * item.scaleX; this.height = this.sourceHeight * item.scaleY;
      this.position.x = item.x + item.scaleX * (this.offsetX - item.width / 2);
      this.position.y = item.y + item.scaleY * (this.offsetY - item.height / 2);
    },
    setSize(width: number, height: number) {
      this.sourceWidth = width; this.sourceHeight = height; this.width = width * item.scaleX; this.height = height * item.scaleY;
      this.offsetX = (item.width - width) / 2; this.offsetY = (item.height - height) / 2; return this;
    },
    setAllowGravity() { return this; },
    postUpdate() { item.x += this.position.x - this.prevFrame.x; item.y += this.position.y - this.prevFrame.y; }
  };
  const subject = {
    profile: { boss: { name: 'Test boss' } }, textures: { exists: () => true }, anims: { exists: () => true },
    enemyBullets: { get: () => item }, time: { delayedCall: vi.fn() },
    getEnemyProjectileTexture: () => 'guard', playMg1ActorAction: vi.fn(),
    resetEnemyProjectile(...args: unknown[]) { return methods.resetEnemyProjectile.apply(this, args); },
    expireEnemyProjectileAfter(...args: unknown[]) { return methods.expireEnemyProjectileAfter.apply(this, args); },
    health: 100, alertState: 'ALERT',
    guards: [{ disabled: false, direction: 1, role: 'patrol', sprite: { x: 900, y: 480 }, decision: { fire: true, projectileSpeed: 400 } }]
  };
  return { item, body, subject };
}

afterAll(() => { vi.doUnmock('phaser'); vi.resetModules(); });

describe('authored projectile first postupdate regression', () => {
  for (const visual of SIDEOPS_BOSS_PROJECTILE_VISUALS) {
    it.each([-1, 1] as const)(`${visual.id} keeps its actual muzzle on first postUpdate facing %i`, direction => {
      const { item, body, subject } = harness();
      const boss = { sprite: { x: 1000, y: 440, body: { center: { x: 1000, y: 440 }, width: 144, height: 144 }, getData: () => visual.sourceTextureKey }, brain: { targetX: 1000 + direction * 250, targetY: 474 } };
      methods.fireBossShot.call(subject, boss, { velocityX: direction * 400, velocityY: 0, damage: 10 });
      const muzzle = resolveSideOpsBossProjectileMuzzle(visual.sourceTextureKey, boss.sprite.body, direction)!;
      body.postUpdate();
      expect(item.x).toBeCloseTo(muzzle.x, 8); expect(item.y).toBeCloseTo(muzzle.y, 8);
      expect(body.position.x + body.width / 2).toBeCloseTo(muzzle.x, 8);
      expect(body.position.y + body.height / 2).toBeCloseTo(muzzle.y, 8);
      expect([body.width, body.height]).toEqual([24, 8]);
      body.prevFrame.copy(body.position); body.position.x += body.velocity.x / 60; body.position.y += body.velocity.y / 60;
      body.postUpdate();
      expect(item.x).toBeCloseTo(muzzle.x + body.velocity.x / 60, 8);
      expect(item.y).toBeCloseTo(muzzle.y + body.velocity.y / 60, 8);
    });
  }

  it('restores a pooled boss round for guards without replaying its old offset as motion', () => {
    const { item, body, subject } = harness();
    const visual = SIDEOPS_BOSS_PROJECTILE_VISUALS[0];
    const boss = { sprite: { x: 1000, y: 440, body: { center: { x: 1000, y: 440 }, width: 144, height: 144 }, getData: () => visual.sourceTextureKey }, brain: { targetX: 750, targetY: 474 } };
    methods.fireBossShot.call(subject, boss, { velocityX: -400, velocityY: 0, damage: 10 });
    item.active = false;
    methods.handleGuardCombat.call(subject);
    body.postUpdate();
    expect([item.x, item.y]).toEqual([918, 474]);
    expect(item.texture.key).toBe('guard'); expect(item.getData('sideopsBossProjectileVisual')).toBeNull();
    expect([item.scaleX, item.scaleY, item.rotation]).toEqual([1, 1, 0]);
    expect([body.width, body.height, body.offsetX, body.offsetY]).toEqual([24, 8, 0, 0]);
    expect([body.velocity.x, body.velocity.y]).toEqual([400, 0]);
  });
});
