/// <reference types="node" />
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({ default: { Scene: class {} } }));
import { Mg1OuterHeavenScene, MG1_DEDICATED_INTERIOR_ASSETS, MG1_OUTER_HEAVEN_ART_SECTORS, getMg1OuterHeavenArtSector } from './Mg1OuterHeavenScene';
import { Mgs1ShadowMosesScene, MGS1_DEDICATED_INTERIOR_ASSETS, MGS1_SHADOW_MOSES_ART_SECTORS, getMgs1ShadowMosesArtSector } from './Mgs1ShadowMosesScene';

function artNode() {
  const node = { data: new Map<string, unknown>(), texture: '', visible: true } as Record<string, any>;
  for (const name of ['setOrigin', 'setScrollFactor', 'setDepth', 'setName', 'setDisplaySize', 'setAlpha']) {
    node[name] = vi.fn(() => node);
  }
  node.setData = vi.fn((key: string, value: unknown) => { node.data.set(key, value); return node; });
  node.setTexture = vi.fn((key: string) => { node.texture = key; return node; });
  node.setVisible = vi.fn((visible: boolean) => { node.visible = visible; return node; });
  return node;
}

class StaticSurface {
  scaleX = 1;
  scaleY = 1;
  visible = true;
  data = new Map<string, unknown>();
  body = { x: 0, y: 0, width: 0, height: 0, center: { x: 0, y: 0 }, enable: true };
  constructor(readonly x: number, readonly y: number, readonly texture: string) { this.refreshBody(); }
  setScale(x: number, y: number) { this.scaleX = x; this.scaleY = y; return this; }
  setTint() { return this; }
  setData(key: string, value: unknown) { this.data.set(key, value); return this; }
  setVisible(value: boolean) { this.visible = value; return this; }
  refreshBody() {
    const width = (this.texture === 'crate' ? 28 : 64) * this.scaleX;
    const height = (this.texture === 'crate' ? 40 : 16) * this.scaleY;
    this.body = { x: this.x - width / 2, y: this.y - height / 2, width, height, center: { x: this.x, y: this.y }, enable: true };
    return this;
  }
}

function mockScene(Constructor: typeof Mg1OuterHeavenScene | typeof Mgs1ShadowMosesScene, assetsAvailable = true) {
  const surfaces: StaticSurface[] = [];
  const tileSprite = vi.fn(() => artNode());
  const image = vi.fn(() => artNode());
  const scene = new Constructor() as unknown as Record<string, any>;
  scene.textures = { exists: vi.fn(() => assetsAvailable) };
  scene.add = { tileSprite, image };
  scene.physics = { add: { staticGroup: () => ({
    create: (x: number, y: number, texture: string) => {
      const surface = new StaticSurface(x, y, texture);
      surfaces.push(surface);
      return surface;
    }
  }) } };
  scene.load = { image: vi.fn() };
  return { scene, surfaces, tileSprite, image };
}

function assertContinuous(sectors: readonly { startX: number; endX: number }[], worldWidth: number) {
  expect(sectors[0].startX).toBe(0);
  for (let index = 0; index < sectors.length; index++) {
    expect(sectors[index].endX).toBeGreaterThan(sectors[index].startX);
    if (index) expect(sectors[index].startX).toBe(sectors[index - 1].endX);
  }
  expect(sectors[sectors.length - 1].endX).toBe(worldWidth);
}

describe('Dedicated MG1/MGS1 environment artwork', () => {
  it('covers the exact route with visual sectors and keeps enclosed arenas indoors', () => {
    assertContinuous(MG1_OUTER_HEAVEN_ART_SECTORS, 12350);
    assertContinuous(MGS1_SHADOW_MOSES_ART_SECTORS, 13200);
    expect(getMg1OuterHeavenArtSector(1850).art).toBe('prison');
    expect(getMg1OuterHeavenArtSector(3850).art).toBe('outside');
    expect(getMg1OuterHeavenArtSector(10000).art).toBe('tx55-hangar');
    expect(getMg1OuterHeavenArtSector(11200).art).toBe('command');
    expect(getMgs1ShadowMosesArtSector(90).art).toBe('dock');
    expect(getMgs1ShadowMosesArtSector(1450).art).toBe('armory');
    expect(getMgs1ShadowMosesArtSector(4050).art).toBe('laboratory');
    expect(getMgs1ShadowMosesArtSector(10200).art).toBe('rex-hangar');
    expect([3480, 5150, 5700, 8850].map((x) => getMgs1ShadowMosesArtSector(x).art))
      .toEqual(['holding-cells', 'mantis-study', 'wolfdog-cave', 'cold-storage']);
  });

  it('loads each scene-local panorama only when its key is absent', () => {
    for (const Constructor of [Mg1OuterHeavenScene, Mgs1ShadowMosesScene]) {
      const missing = mockScene(Constructor, false);
      missing.scene.preload();
      expect(missing.scene.load.image).toHaveBeenCalledTimes(Constructor === Mg1OuterHeavenScene ? 4 : 8);
      const cached = mockScene(Constructor);
      cached.scene.preload();
      expect(cached.scene.load.image).not.toHaveBeenCalled();
    }
  });

  it('keeps every MG1 static collider coordinate, scale, count and enabled state', () => {
    const { scene, surfaces } = mockScene(Mg1OuterHeavenScene);
    scene.createWorldGeometry();
    const expected: Array<[number, number, string, number, number]> = [];
    for (let x = 256; x < 12350; x += 512) expected.push([x, 520, 'platform', 16, 1]);
    for (let x = 620; x < 11850; x += 920) {
      expected.push([x, x % 1840 === 620 ? 350 : 405, 'platform', 4, 1], [x + 120, 480, 'crate', 1, 1]);
    }
    expect(surfaces.map((s) => [s.x, s.y, s.texture, s.scaleX, s.scaleY])).toEqual(expected);
    expect(surfaces.every((s) => s.body.enable && !s.visible)).toBe(true);
  });

  it('keeps legacy MGS1 geometry and adds only the three authorized pickup approaches', () => {
    const { scene, surfaces } = mockScene(Mgs1ShadowMosesScene);
    scene.createWorldGeometry();
    const expected: Array<[number, number, string, number, number]> = [];
    for (let x = 256; x < 13200; x += 512) expected.push([x, 516, 'platform', 8, 1]);
    for (let x = 850; x < 12800; x += 1100) expected.push([x, 390 - (x % 3) * 28, 'platform', 3, 1]);
    const legacy = surfaces.filter((s) => !s.data.get('pickupApproach'));
    expect(legacy.map((s) => [s.x, s.y, s.texture, s.scaleX, s.scaleY])).toEqual(expected);
    expect(surfaces.filter((s) => s.data.get('pickupApproach')).map((s) => [s.x, s.body.y, s.body.width, s.body.height]))
      .toEqual([[740, 430, 128, 16], [9460, 438, 128, 16], [9530, 366, 128, 16]]);
    expect(surfaces.every((s) => s.body.enable)).toBe(true);
  });

  it('coats body bounds exactly and never uses snow on an indoor floor', () => {
    const { scene, tileSprite } = mockScene(Mgs1ShadowMosesScene);
    const indoor = new StaticSurface(256, 516, 'platform').setScale(8, 1).refreshBody();
    const before = structuredClone(indoor.body);
    scene.applyTerrainArtwork(indoor, 'ground');
    expect(indoor.body).toEqual(before);
    expect(tileSprite).toHaveBeenLastCalledWith(0, 508, 512, 16, 'sideops-terrain:mgs1:structure');
    const outdoor = new StaticSurface(2560, 516, 'platform').setScale(8, 1).refreshBody();
    scene.applyTerrainArtwork(outdoor, 'ground');
    expect(tileSprite).toHaveBeenLastCalledWith(2304, 508, 512, 16, 'sideops-terrain:mgs1:ground');
  });

  it('leaves original physical art visible when a generated material is missing', () => {
    for (const Constructor of [Mg1OuterHeavenScene, Mgs1ShadowMosesScene]) {
      const { scene, surfaces, tileSprite } = mockScene(Constructor, false);
      scene.createWorldGeometry();
      expect(tileSprite).not.toHaveBeenCalled();
      expect(surfaces.every((s) => s.visible && s.body.enable)).toBe(true);
    }
  });

  it('switches only the artwork at a sector transition and hides it when that asset is unavailable', () => {
    const { scene } = mockScene(Mgs1ShadowMosesScene);
    const art = artNode();
    scene.environmentArtwork = art;
    scene.updateEnvironmentArtwork(90);
    expect(art.texture).toBe('dedicatedBackdrop:mgs1:dock');
    scene.updateEnvironmentArtwork(2550);
    expect(art.texture).toBe('sideOpsBackdropMgs1ShadowMoses');
    scene.updateEnvironmentArtwork(5150);
    expect(art.texture).toBe('dedicatedBackdrop:mgs1:mantis-study');
    scene.textures.exists.mockReturnValue(false);
    scene.currentArtSectorId = '';
    scene.updateEnvironmentArtwork(5150);
    expect(art.visible).toBe(false);
    expect(art.data.get('artMode')).toBe('mantis-study');
    scene.textures.exists.mockReturnValue(true);
    scene.updateEnvironmentArtwork(10200);
    expect(art.texture).toBe('dedicatedBackdrop:mgs1:rex-hangar');
    expect(art.visible).toBe(true);
  });

  it('clips only terrain artwork at an indoor boundary, keeping snow outside', () => {
    const { scene, tileSprite } = mockScene(Mgs1ShadowMosesScene);
    const surface = new StaticSurface(1792, 516, 'platform').setScale(8, 1).refreshBody();
    const before = structuredClone(surface.body);
    scene.applyTerrainArtwork(surface, 'ground');
    expect(tileSprite).toHaveBeenNthCalledWith(1, 1536, 508, 314, 16, 'sideops-terrain:mgs1:structure');
    expect(tileSprite).toHaveBeenNthCalledWith(2, 1850, 508, 198, 16, 'sideops-terrain:mgs1:ground');
    expect(surface.body).toEqual(before);
  });

  it('uses the authored earth/wood floor in cave and study without laying steel over it', () => {
    const { scene, tileSprite } = mockScene(Mgs1ShadowMosesScene);
    for (const x of [5300, 5700]) {
      const surface = new StaticSurface(x, 516, 'platform');
      scene.applyTerrainArtwork(surface, 'ground');
      expect(surface.visible).toBe(false);
      expect(surface.body.enable).toBe(true);
    }
    expect(tileSprite).not.toHaveBeenCalled();
  });

  it('ships twelve separate generated panoramas matching their source manifests', () => {
    const assets = [...MG1_DEDICATED_INTERIOR_ASSETS, ...MGS1_DEDICATED_INTERIOR_ASSETS];
    expect(assets).toHaveLength(12);
    expect(new Set(assets.map((a) => a.textureKey)).size).toBe(12);
    for (const pack of ['mg1', 'mgs1', 'mgs1-extra']) {
      const manifest = JSON.parse(readFileSync(resolve('scripts/art_sources/dedicated-interiors', pack + '-manifest.json'), 'utf8'));
      expect(manifest.grid).toEqual([2, 2]);
      expect(manifest.panels).toHaveLength(4);
      const source = readFileSync(resolve(manifest.source));
      expect(createHash('sha256').update(source).digest('hex')).toBe(manifest.sourceSha256);
      for (const panel of manifest.panels) {
        const bytes = readFileSync(resolve('public', panel.path.slice(1)));
        expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
        expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
        expect([panel.width, panel.height]).toEqual([960, 540]);
        expect(createHash('sha256').update(bytes).digest('hex')).toBe(panel.sha256);
        expect(assets.some((asset) => asset.path === panel.path)).toBe(true);
      }
    }
  });
});
