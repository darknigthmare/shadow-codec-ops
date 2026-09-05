/// <reference types="node" />
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SIDEOPS_BOSS_PROJECTILE_VISUALS, SIDEOPS_BOSS_PROJECTILE_CLIPS, resolveSideOpsBossProjectileVisual, resolveSideOpsBossProjectileMuzzle, resolveSideOpsBossProjectileVelocity } from './sideOpsBossProjectileRegistry';

describe('authored mecha projectile visuals', () => {
  it('separates the four source machines and their actual weapon signatures', () => {
    expect(SIDEOPS_BOSS_PROJECTILE_VISUALS.map((item) => [item.sourceTextureKey, item.weaponKind])).toEqual([
      ['mgsvTppSahelanthropus', 'railgun'], ['mgs2PlantMetalGearRay', 'water-cutter'],
      ['mg2MetalGearD', 'autocannon'], ['peaceWalkerPupa', 'electric-shock']
    ]);
    expect(new Set(SIDEOPS_BOSS_PROJECTILE_VISUALS.map((item) => item.textureKey)).size).toBe(4);
    expect(resolveSideOpsBossProjectileVisual('guard')).toBeUndefined();
    expect(resolveSideOpsBossProjectileVisual('sideops-special:mgs2-metal-gear-ray:core')).toBeUndefined();
  });

  it('exposes four authored flight phases per machine without fabricating beam or water physics', () => {
    expect(SIDEOPS_BOSS_PROJECTILE_CLIPS).toHaveLength(4);
    for (const visual of SIDEOPS_BOSS_PROJECTILE_VISUALS) {
      const routed = resolveSideOpsBossProjectileVisual(visual.sourceTextureKey)!;
      expect(routed.clip).toMatchObject({ textureKey: visual.textureKey, start: 0, end: 3, frameRate: 12, repeat: -1 });
      expect(visual.provenance).toBe('openai-authored-phases');
      expect(visual.gameplayAdaptation).toContain('existing moving-ballistic collision model');
      expect(visual.hitbox).toEqual({ width: 24, height: 8 });
      expect(visual.sourceFacing).toBe('right');
    }
  });

  it('anchors each muzzle to the live world body center and mirrors only its horizontal offset', () => {
    const body = { center: { x: 1000, y: 420 }, width: 160, height: 100 };
    for (const visual of SIDEOPS_BOSS_PROJECTILE_VISUALS) {
      const right = resolveSideOpsBossProjectileMuzzle(visual.sourceTextureKey, body, 1)!;
      const left = resolveSideOpsBossProjectileMuzzle(visual.sourceTextureKey, body, -1)!;
      expect(right.x).toBe(1080);
      expect(left.x).toBe(920);
      expect(right.y).toBe(420 + 100 * visual.muzzle.y);
      expect(left.y).toBe(right.y);
      const larger = resolveSideOpsBossProjectileMuzzle(visual.sourceTextureKey, { ...body, width: 320 }, 1)!;
      expect(larger.x).toBe(1160);
    }
  });

  it('declines invalid bodies and unrelated actors instead of inventing a muzzle', () => {
    expect(resolveSideOpsBossProjectileMuzzle('guard', { center: { x: 0, y: 0 }, width: 48, height: 64 }, 1)).toBeUndefined();
    for (const width of [0, -1, NaN, Infinity]) {
      expect(resolveSideOpsBossProjectileMuzzle('mg2MetalGearD', { center: { x: 0, y: 0 }, width, height: 112 }, 1)).toBeUndefined();
    }
  });

  it('aims the central shot at its locked target from the visible muzzle', () => {
    const original = { x: 1000, y: 388 };
    const muzzle = { x: 1080, y: 367 };
    const target = { x: 1440, y: 388 };
    const shot = { velocityX: 420, velocityY: 0, damage: 15 };
    const velocity = resolveSideOpsBossProjectileVelocity(shot, original, muzzle, target);
    expect(Math.atan2(velocity.velocityY, velocity.velocityX)).toBeCloseTo(Math.atan2(21, 360), 12);
    expect(Math.hypot(velocity.velocityX, velocity.velocityY)).toBeCloseTo(420, 12);
    expect(velocity.damage).toBe(15);
    expect(shot).toEqual({ velocityX: 420, velocityY: 0, damage: 15 });
  });

  it('preserves both signs of spread and speed, including left-facing angle wraparound', () => {
    const wrapped = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));
    const original = { x: 1000, y: 388 };
    for (const target of [{ x: 1440, y: 476 }, { x: 400, y: 387 }]) {
      const muzzle = { x: target.x > original.x ? 1080 : 920, y: 367 };
      const oldAim = Math.atan2(target.y - original.y, target.x - original.x);
      const newAim = Math.atan2(target.y - muzzle.y, target.x - muzzle.x);
      for (const spread of [-0.16, 0, 0.16]) {
        const shot = { velocityX: Math.cos(oldAim + spread) * 390, velocityY: Math.sin(oldAim + spread) * 390 };
        const velocity = resolveSideOpsBossProjectileVelocity(shot, original, muzzle, target);
        expect(wrapped(Math.atan2(velocity.velocityY, velocity.velocityX) - newAim)).toBeCloseTo(spread, 12);
        expect(Math.hypot(velocity.velocityX, velocity.velocityY)).toBeCloseTo(390, 12);
      }
    }
  });

  it('returns the original shot unchanged for invalid or degenerate aim geometry', () => {
    const shot = { velocityX: 390, velocityY: 20 };
    const original = { x: 100, y: 100 };
    const muzzle = { x: 140, y: 80 };
    const target = { x: 600, y: 180 };
    for (const invalid of [NaN, Infinity, -Infinity]) {
      const invalidShot = { ...shot, velocityX: invalid };
      expect(resolveSideOpsBossProjectileVelocity(invalidShot, original, muzzle, target)).toBe(invalidShot);
      expect(resolveSideOpsBossProjectileVelocity(shot, { ...original, x: invalid }, muzzle, target)).toBe(shot);
      expect(resolveSideOpsBossProjectileVelocity(shot, original, { ...muzzle, y: invalid }, target)).toBe(shot);
      expect(resolveSideOpsBossProjectileVelocity(shot, original, muzzle, { ...target, x: invalid })).toBe(shot);
    }
    expect(resolveSideOpsBossProjectileVelocity(shot, original, muzzle, original)).toBe(shot);
    expect(resolveSideOpsBossProjectileVelocity(shot, original, muzzle, muzzle)).toBe(shot);
    expect(resolveSideOpsBossProjectileVelocity(shot, { x: -Number.MAX_VALUE, y: 0 }, muzzle, { x: Number.MAX_VALUE, y: 1 })).toBe(shot);
    const stopped = { velocityX: 0, velocityY: 0 };
    expect(resolveSideOpsBossProjectileVelocity(stopped, original, muzzle, target)).toBe(stopped);
  });

  it('ships the exact RGBA sheet geometry and source/output provenance hashes', () => {
    const manifestPath = resolve(process.cwd(), 'scripts/art_sources/mecha-projectiles/manifest.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      source: string; sourceSha256: string; authoredPhases: number; synthesizedPhases: number;
      outputs: Array<{ id: string; sha256: string; frameRgbaSha256: string[]; frameAlphaBounds: number[][] }>;
    };
    expect(manifest.authoredPhases).toBe(16);
    expect(manifest.synthesizedPhases).toBe(0);
    expect(createHash('sha256').update(readFileSync(resolve(process.cwd(), manifest.source))).digest('hex')).toBe(manifest.sourceSha256);
    for (const asset of SIDEOPS_BOSS_PROJECTILE_VISUALS) {
      const png = readFileSync(resolve(process.cwd(), 'public', asset.path.replace(/^\//, '')));
      expect(png.subarray(1, 4).toString('ascii')).toBe('PNG');
      expect(png.readUInt32BE(16)).toBe(asset.frameWidth * asset.frameCount);
      expect(png.readUInt32BE(20)).toBe(asset.frameHeight);
      expect(png[25]).toBe(6);
      const output = manifest.outputs.find((item) => item.id === asset.id)!;
      expect(createHash('sha256').update(png).digest('hex')).toBe(output.sha256);
      expect(new Set(output.frameRgbaSha256).size).toBe(4);
      for (const bounds of output.frameAlphaBounds) {
        expect(bounds[0]).toBeGreaterThan(0);
        expect(bounds[1]).toBeGreaterThan(0);
        expect(bounds[2]).toBeLessThan(asset.frameWidth);
        expect(bounds[3]).toBeLessThan(asset.frameHeight);
      }
    }
  });
});
