/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  MGS1_SIDEOPS_ALL_ASSETS,
  MGS1_SIDEOPS_BOSS_ASSETS,
  MGS1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MGS1_SIDEOPS_ENEMY_ASSETS,
  MGS1_SIDEOPS_MACHINE_ASSETS,
  MGS1_SIDEOPS_NPC_ASSETS,
  MGS1_SIDEOPS_PROJECTILE_ASSETS,
  MGS1_SIDEOPS_VFX_ASSETS
} from './mgs1SideOpsAssetRegistry';

const expectedPhysicalActors = [
  ['meryl-silverburgh.png', 32, 48],
  ['otacon.png', 32, 48],
  ['donald-anderson.png', 32, 48],
  ['kenneth-baker.png', 32, 48],
  ['johnny-sasaki.png', 32, 48],
  ['genome-light-infantry.png', 32, 48],
  ['genome-arctic-trooper.png', 32, 48],
  ['genome-nbc-trooper.png', 32, 48],
  ['genome-heavy-trooper.png', 40, 56],
  ['wolf-dog.png', 40, 24],
  ['gun-camera.png', 30, 20],
  ['revolver-ocelot.png', 48, 64],
  ['decoy-octopus.png', 48, 64],
  ['cyborg-ninja.png', 48, 64],
  ['psycho-mantis.png', 48, 64],
  ['sniper-wolf.png', 48, 64],
  ['vulcan-raven.png', 56, 72],
  ['liquid-snake.png', 48, 64],
  ['m1-tank.png', 112, 64],
  ['hind-d.png', 144, 72],
  ['metal-gear-rex.png', 128, 144],
  ['escape-jeep.png', 112, 56],
  ['snowmobile.png', 96, 48]
] as const;

const expectedProjectileFiles = [
  'socom-bullet.png',
  'famas-tracer.png',
  'psg1-round.png',
  'ocelot-round.png',
  'vulcan-tracer.png',
  'tank-shell.png',
  'grenade.png',
  'chaff-grenade.png',
  'stun-grenade.png',
  'c4-charge.png',
  'claymore.png',
  'nikita-missile.png',
  'stinger-missile.png',
  'hind-rocket.png',
  'rex-missile.png',
  'rex-laser.png',
  'rex-railgun-slug.png',
  'mantis-psychic-orb.png',
  'ninja-slash.png',
  'wolf-round.png'
] as const;

const expectedVfxFiles = [
  'muzzle-flash.png',
  'bullet-impact.png',
  'metal-ricochet.png',
  'blood-hit.png',
  'grenade-explosion.png',
  'c4-explosion.png',
  'missile-explosion.png',
  'rex-explosion.png',
  'smoke-plume.png',
  'fire-plume.png',
  'chaff-burst.png',
  'stun-flash.png',
  'snow-puff.png',
  'rotor-wash.png',
  'ninja-electric.png',
  'mantis-psychic-wave.png',
  'rex-laser-impact.png',
  'missile-trail.png'
] as const;

describe('MGS1 Side Ops asset registry', () => {
  it('covers the exact requested MGS1 asset families', () => {
    expect(MGS1_SIDEOPS_NPC_ASSETS).toHaveLength(5);
    expect(MGS1_SIDEOPS_ENEMY_ASSETS).toHaveLength(6);
    expect(MGS1_SIDEOPS_BOSS_ASSETS).toHaveLength(7);
    expect(MGS1_SIDEOPS_MACHINE_ASSETS).toHaveLength(5);
    expect(MGS1_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(20);
    expect(MGS1_SIDEOPS_VFX_ASSETS).toHaveLength(18);
    expect(MGS1_SIDEOPS_ALL_ASSETS).toHaveLength(61);
  });

  it('keeps every id, texture key and source path unique', () => {
    expect(new Set(MGS1_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(MGS1_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MGS1_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(MGS1_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MGS1_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(MGS1_SIDEOPS_ALL_ASSETS.length);
  });

  it('locks the requested physical roster and source dimensions', () => {
    const actual = [
      ...MGS1_SIDEOPS_NPC_ASSETS,
      ...MGS1_SIDEOPS_ENEMY_ASSETS,
      ...MGS1_SIDEOPS_BOSS_ASSETS,
      ...MGS1_SIDEOPS_MACHINE_ASSETS
    ].map((asset) => [basename(asset.path), asset.width, asset.height]);
    expect(actual).toEqual(expectedPhysicalActors);
  });

  it('locks the complete projectile and VFX file rosters', () => {
    expect(MGS1_SIDEOPS_PROJECTILE_ASSETS.map((asset) => basename(asset.path))).toEqual(expectedProjectileFiles);
    expect(MGS1_SIDEOPS_VFX_ASSETS.map((asset) => basename(asset.path))).toEqual(expectedVfxFiles);
  });

  it('uses only local MGS1 paths, positive dimensions and valid fallback colors', () => {
    for (const asset of MGS1_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(/^\/sideops\/mgs1\/(npcs|enemies|bosses|vehicles|projectiles|vfx)\/[a-z0-9-]+\.png$/);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('describes each VFX sheet as one horizontal row of exact frames', () => {
    for (const asset of MGS1_SIDEOPS_VFX_ASSETS) {
      expect(asset.loader).toBe('spritesheet');
      expect(asset.width).toBe(asset.frameWidth * asset.frameCount);
      expect(asset.height).toBe(asset.frameHeight);
      expect(asset.frameCount).toBeGreaterThan(1);
    }
  });

  it('ships every registered asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MGS1_SIDEOPS_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });

  it('exposes stable defaults for a generic Shadow Moses encounter', () => {
    expect(MGS1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mgs1GenomeLightInfantry',
      reinforcementTexture: 'mgs1GenomeArcticTrooper',
      bossTexture: 'mgs1RevolverOcelot'
    });
    const textureKeys = new Set(MGS1_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    expect(textureKeys.has(MGS1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES.guardTexture)).toBe(true);
    expect(textureKeys.has(MGS1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES.reinforcementTexture)).toBe(true);
    expect(textureKeys.has(MGS1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES.bossTexture)).toBe(true);
  });
});
