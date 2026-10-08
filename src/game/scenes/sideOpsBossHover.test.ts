import { afterAll, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

vi.mock('phaser', () => ({ default: { Scene: class {}, Math: { Between: (minimum: number) => minimum } } }));
import { SideOpsScene } from './SideOpsScene';

function applyHover(texture = 'peaceWalkerChrysalis', y = 374) {
  const body = {
    setAllowGravity: vi.fn(), updateFromGameObject: vi.fn(),
    position: { x: 4200, y: 318 }, prev: { copy: vi.fn() }, prevFrame: { copy: vi.fn() }
  };
  const sprite = { y, body, setVelocityY: vi.fn(), setY(value: number) { this.y = value; } };
  const subject = { profile: { boss: { texture, y: 374 } } };
  (SideOpsScene.prototype as unknown as { maintainBossHover(sprite: unknown): void }).maintainBossHover.call(subject, sprite);
  return { sprite, body };
}

afterAll(() => { vi.doUnmock('phaser'); vi.resetModules(); });

describe('Chrysalis live Arcade hover synchronization', () => {
  it('turns off gravity and vertical velocity without resetting a stable body every frame', () => {
    const { sprite, body } = applyHover();
    expect(body.setAllowGravity).toHaveBeenCalledWith(false);
    expect(sprite.setVelocityY).toHaveBeenCalledWith(0);
    expect(sprite.y).toBe(374);
    expect(body.updateFromGameObject).not.toHaveBeenCalled();
  });

  it('corrects collision drift and synchronizes both Arcade position histories', () => {
    const { sprite, body } = applyHover('peaceWalkerChrysalis', 379);
    expect(sprite.y).toBe(374);
    expect(body.updateFromGameObject).toHaveBeenCalledOnce();
    expect(body.prev.copy).toHaveBeenCalledWith(body.position);
    expect(body.prevFrame.copy).toHaveBeenCalledWith(body.position);
  });

  it.each(['peaceWalkerPupa', 'peaceWalkerCocoon', 'peaceWalkerBasilisk', 'peaceWalkerZeke', 'mgs3Shagohod', 'mgsvTppSahelanthropus'])(
    'does not modify the existing physics of %s', texture => {
      const { sprite, body } = applyHover(texture, 456);
      expect(sprite.y).toBe(456);
      expect(body.setAllowGravity).not.toHaveBeenCalled();
      expect(sprite.setVelocityY).not.toHaveBeenCalled();
      expect(body.updateFromGameObject).not.toHaveBeenCalled();
    }
  );

  it('applies the contract at spawn and before the dormant boss early return', () => {
    const source = readFileSync(resolve('src/game/scenes/SideOpsScene.ts'), 'utf8');
    const create = source.slice(source.indexOf('private createBoss()'), source.indexOf('private createPickups('));
    expect(create).toContain('this.maintainBossHover(sprite);');
    const update = source.slice(source.indexOf('private handleBoss()'));
    expect(update.indexOf('this.maintainBossHover(this.boss.sprite);')).toBeLessThan(update.indexOf('if (!this.boss.active)'));
  });
});
