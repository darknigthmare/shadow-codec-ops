import type Phaser from 'phaser';
import { describe, expect, it, vi } from 'vitest';

interface SpriteSurface { x: number; y: number; scaleX: number; scaleY: number; frameSize: number }

const { StaticBody } = vi.hoisted(() => ({
  StaticBody: class {
    width = 96;
    height = 128;
    center = { x: 100, y: 200 };
    calls: string[] = [];
    sprite: SpriteSurface | null = null;
    setOffset() { this.calls.push('offset'); return this; }
    updateFromGameObject() {
      this.calls.push('update');
      this.width = this.sprite!.frameSize * this.sprite!.scaleX;
      this.height = this.sprite!.frameSize * this.sprite!.scaleY;
      this.center = { x: this.sprite!.x, y: this.sprite!.y };
      return this;
    }
    setSize(width: number, height: number) {
      this.calls.push('size');
      this.width = width;
      this.height = height;
      return this;
    }
  }
}));

vi.mock('phaser', () => ({ default: { Physics: { Arcade: { StaticBody } } } }));

import {
  configureAuthoredSideOpsSpecialActor,
  getAuthoredSideOpsSpecialActorClip,
  registerAuthoredSideOpsSpecialActorAnimations
} from './sideOpsSpecialActorAnimationRuntime';

class DynamicBody {
  width = 96;
  height = 128;
  sourceWidth = 48;
  sourceHeight = 64;
  center = { x: 100, y: 200 };
  calls: string[] = [];
  sprite: SpriteSurface | null = null;
  setOffset() { this.calls.push('offset'); return this; }
  setSize(width: number, height: number) {
    this.calls.push('size');
    this.sourceWidth = width;
    this.sourceHeight = height;
    return this;
  }
  updateFromGameObject() {
    this.calls.push('update');
    this.width = this.sourceWidth * this.sprite!.scaleX;
    this.height = this.sourceHeight * this.sprite!.scaleY;
    this.center = { x: this.sprite!.x, y: this.sprite!.y };
    return this;
  }
}

class Sprite implements SpriteSurface {
  x = 100;
  y = 200;
  scaleX = 2;
  scaleY = 2;
  frameSize = 64;
  data = new Map<string, unknown>();
  constructor(public body: DynamicBody | InstanceType<typeof StaticBody> | null = null) {
    if (body) body.sprite = this;
  }
  getData(key: string) { return this.data.get(key); }
  setData(key: string, value: unknown) { this.data.set(key, value); return this; }
  setTexture(key: string) { this.frameSize = key.includes('metal-gear-rex') ? 256 : 128; return this; }
  setOrigin() { return this; }
  setScale(scale: number) { this.scaleX = scale; this.scaleY = scale; return this; }
  setPosition(x: number, y: number) { this.x = x; this.y = y; return this; }
}

const asSprite = (sprite: Sprite) => sprite as unknown as Phaser.GameObjects.Sprite;
const loadedScene = { textures: { exists: () => true } } as unknown as Phaser.Scene;

describe('special actor runtime geometry and fallback', () => {
  it('does not mutate a sprite until both authored source boards are available', () => {
    const sprite = new Sprite(new DynamicBody());
    const scene = { textures: { exists: (key: string) => key.endsWith(':core') } } as unknown as Phaser.Scene;
    expect(configureAuthoredSideOpsSpecialActor(scene, asSprite(sprite), 'mgs1RevolverOcelot')).toBe(false);
    expect(sprite.data.size).toBe(0);
    expect(sprite.frameSize).toBe(64);
    expect(sprite.body!.calls).toEqual([]);
  });

  it('retains the world dimensions of a dynamically scaled boss before changing texture', () => {
    const body = new DynamicBody();
    const sprite = new Sprite(body);
    expect(configureAuthoredSideOpsSpecialActor(loadedScene, asSprite(sprite), 'mgs1RevolverOcelot')).toBe(true);
    expect(body.width).toBeCloseTo(96);
    expect(body.height).toBeCloseTo(128);
    expect(body.center).toEqual({ x: 100, y: 200 });
    expect(sprite.scaleY).toBeCloseTo(128 / 112);
    expect(sprite.data.get('sideopsSpecialSourceFacingRight')).toBe(true);
  });

  it('restores static world-pixel dimensions after the visual bounds refresh, never before it', () => {
    const body = new StaticBody();
    const sprite = new Sprite(body);
    expect(configureAuthoredSideOpsSpecialActor(loadedScene, asSprite(sprite), 'mgs1RevolverOcelot')).toBe(true);
    expect(body.width).toBe(96);
    expect(body.height).toBe(128);
    expect(body.calls).toEqual(['offset', 'update', 'size']);
  });

  it('supports non-physical NPCs without creating a weapon animation or guessing orientation', () => {
    const npc = new Sprite();
    npc.scaleX = npc.scaleY = 1;
    expect(configureAuthoredSideOpsSpecialActor(loadedScene, asSprite(npc), 'mgs1Otacon')).toBe(true);
    expect(npc.scaleY).toBeCloseTo(48 / 112);
    expect(getAuthoredSideOpsSpecialActorClip(asSprite(npc), 'radio')?.state).toBe('radio');
    expect(getAuthoredSideOpsSpecialActorClip(asSprite(npc), 'attack')).toBeUndefined();
    const rex = new Sprite();
    expect(configureAuthoredSideOpsSpecialActor(loadedScene, asSprite(rex), 'mgs1MetalGearRex')).toBe(true);
    expect(rex.data.get('sideopsSpecialSourceFacingRight')).toBe(false);
    expect(getAuthoredSideOpsSpecialActorClip(asSprite(rex), 'reload')).toBeUndefined();
  });

  it('registers only loaded, not-yet-created clips', () => {
    const create = vi.fn();
    const scene = {
      textures: { exists: (key: string) => key === 'sideops-special:mgs1-revolver-ocelot:core' },
      anims: {
        exists: (key: string) => key.endsWith(':idle'), create,
        generateFrameNumbers: (textureKey: string, range: unknown) => ({ textureKey, range })
      }
    } as unknown as Phaser.Scene;
    registerAuthoredSideOpsSpecialActorAnimations(scene);
    expect(create).toHaveBeenCalledTimes(3);
    expect(create.mock.calls.map(([clip]) => clip.key)).toEqual([
      'sideops-special:mgs1-revolver-ocelot:move',
      'sideops-special:mgs1-revolver-ocelot:attack',
      'sideops-special:mgs1-revolver-ocelot:reload'
    ]);
  });
});
