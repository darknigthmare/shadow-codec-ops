/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import bossesJson from '../../data/bosses.json';
import enemiesJson from '../../data/enemies.json';
import {
  MG1_SIDEOPS_ALL_ASSETS,
  MG1_SIDEOPS_BOSS_ASSETS,
  MG1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES,
  MG1_SIDEOPS_ENEMY_ASSETS,
  MG1_SIDEOPS_MACHINE_ASSETS,
  MG1_SIDEOPS_NPC_ASSETS,
  MG1_SIDEOPS_PROJECTILE_ASSETS,
  MG1_SIDEOPS_VFX_ASSETS
} from './mg1SideOpsAssetRegistry';

interface Mg1CombatMetadata {
  id: string;
  era: string;
  aliases?: string[];
  projectiles?: string[];
  weakness?: string;
  assetTextureKey?: string;
}

describe('MG1 Side Ops asset registry', () => {
  it('covers the exact scoped MG1 asset families', () => {
    expect(MG1_SIDEOPS_NPC_ASSETS).toHaveLength(7);
    expect(MG1_SIDEOPS_ENEMY_ASSETS).toHaveLength(5);
    expect(MG1_SIDEOPS_BOSS_ASSETS).toHaveLength(6);
    expect(MG1_SIDEOPS_MACHINE_ASSETS).toHaveLength(5);
    expect(MG1_SIDEOPS_PROJECTILE_ASSETS).toHaveLength(12);
    expect(MG1_SIDEOPS_VFX_ASSETS).toHaveLength(9);
    expect(MG1_SIDEOPS_ALL_ASSETS).toHaveLength(44);
  });

  it('keeps every id, texture key and source path unique', () => {
    expect(new Set(MG1_SIDEOPS_ALL_ASSETS.map((asset) => asset.id)).size).toBe(MG1_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MG1_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey)).size).toBe(MG1_SIDEOPS_ALL_ASSETS.length);
    expect(new Set(MG1_SIDEOPS_ALL_ASSETS.map((asset) => asset.path)).size).toBe(MG1_SIDEOPS_ALL_ASSETS.length);
  });

  it('registers the generic Outer Heaven POW as a physical 32x48 NPC', () => {
    expect(MG1_SIDEOPS_NPC_ASSETS).toContainEqual(expect.objectContaining({
      id: 'mg1_outer_heaven_pow',
      textureKey: 'mg1OuterHeavenPow',
      path: '/sideops/mg1/npcs/outer-heaven-pow.png',
      width: 32,
      height: 48,
      loader: 'image',
      fallbackShape: 'humanoid'
    }));
  });

  it('uses local MG1 paths, positive dimensions and valid fallback colors', () => {
    for (const asset of MG1_SIDEOPS_ALL_ASSETS) {
      expect(asset.path).toMatch(/^\/sideops\/mg1\/(npcs|enemies|bosses|vehicles|projectiles|vfx)\/[a-z0-9-]+\.png$/);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.fallbackPrimaryColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackPrimaryColor).toBeLessThanOrEqual(0xffffff);
      expect(asset.fallbackAccentColor).toBeGreaterThanOrEqual(0);
      expect(asset.fallbackAccentColor).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('ships every registered asset as an exact-size 8-bit RGBA PNG', () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const asset of MG1_SIDEOPS_ALL_ASSETS) {
      const absolutePath = resolve(process.cwd(), 'public', asset.path.replace(/^\//, ''));
      const png = readFileSync(absolutePath);
      expect(png.subarray(0, 8), absolutePath).toEqual(pngSignature);
      expect(png.readUInt32BE(16), absolutePath).toBe(asset.width);
      expect(png.readUInt32BE(20), absolutePath).toBe(asset.height);
      expect(png[24], absolutePath).toBe(8);
      expect(png[25], absolutePath).toBe(6);
    }
  });

  it('describes each VFX sheet as one horizontal row of exact frames', () => {
    for (const asset of MG1_SIDEOPS_VFX_ASSETS) {
      expect(asset.loader).toBe('spritesheet');
      expect(asset.width).toBe(asset.frameWidth * asset.frameCount);
      expect(asset.height).toBe(asset.frameHeight);
      expect(asset.frameCount).toBeGreaterThan(1);
    }
  });

  it('pairs the MG1 gun camera with its dedicated laser projectile and impact VFX', () => {
    expect(MG1_SIDEOPS_PROJECTILE_ASSETS).toContainEqual(expect.objectContaining({
      id: 'mg1_gun_camera_laser',
      textureKey: 'mg1GunCameraLaser',
      path: '/sideops/mg1/projectiles/gun-camera-laser.png',
      width: 24,
      height: 5
    }));
    expect(MG1_SIDEOPS_VFX_ASSETS).toContainEqual(expect.objectContaining({
      id: 'mg1_laser_impact_vfx',
      textureKey: 'mg1LaserImpactVfx',
      path: '/sideops/mg1/vfx/laser-impact.png',
      frameWidth: 16,
      frameHeight: 16,
      frameCount: 4
    }));
  });

  it('reserves Shotmaker as the safe generic Builder boss', () => {
    expect(MG1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES).toEqual({
      guardTexture: 'mg1Guard',
      reinforcementTexture: 'mg1Guard',
      bossTexture: 'mg1Shotmaker'
    });
    expect(MG1_SIDEOPS_BOSS_ASSETS.some((asset) => asset.textureKey === MG1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES.bossTexture)).toBe(true);
  });

  it('keeps canonical enemy and boss metadata aligned with registry keys and projectile ids', () => {
    const enemies = (enemiesJson as Mg1CombatMetadata[]).filter((enemy) => enemy.era === 'msx');
    const bosses = (bossesJson as Mg1CombatMetadata[]).filter((boss) => boss.era === 'msx');
    const textureKeys = new Set<string>(MG1_SIDEOPS_ALL_ASSETS.map((asset) => asset.textureKey));
    const projectileIds = new Set<string>(MG1_SIDEOPS_PROJECTILE_ASSETS.map((asset) => asset.id));

    expect(enemies).toHaveLength(5);
    expect(bosses).toHaveLength(10);
    for (const entry of [...enemies, ...bosses]) {
      expect(entry.aliases?.length).toBeGreaterThan(0);
      expect(entry.weakness).toBeTruthy();
      expect(textureKeys.has(entry.assetTextureKey ?? '')).toBe(true);
      for (const projectileId of entry.projectiles ?? []) expect(projectileIds.has(projectileId)).toBe(true);
    }

    const tx55 = bosses.find((boss) => boss.id === 'tx55_metal_gear_mg1');
    expect(tx55?.projectiles).toEqual([]);
    expect(tx55?.weakness).toBe('ordered_plastic_explosive_leg_sequence');
  });
});
