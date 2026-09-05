import type Phaser from 'phaser';
import { describe, expect, it, vi } from 'vitest';

interface SpriteSurface { x: number; y: number; scaleX: number; scaleY: number; frameSize: number; originX: number; originY: number }

const { StaticBody } = vi.hoisted(() => ({
  StaticBody: class {
    width = 96;
    height = 128;
    center = { x: 100, y: 200 };
    calls: string[] = [];
    sprite: SpriteSurface | null = null;
    position = { x: 52, y: 136 };
    offset = { x: 0, y: 0 };
    updateCenter() { this.center = { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 }; }
    setOffset(x: number, y: number) {
      this.calls.push('offset');
      this.position.x += x - this.offset.x;
      this.position.y += y - this.offset.y;
      this.offset = { x, y };
      this.updateCenter();
      return this;
    }
    updateFromGameObject() {
      this.calls.push('update');
      this.width = this.sprite!.frameSize * this.sprite!.scaleX;
      this.height = this.sprite!.frameSize * this.sprite!.scaleY;
      this.position = { x: this.sprite!.x - this.width * this.sprite!.originX, y: this.sprite!.y - this.height * this.sprite!.originY };
      this.updateCenter();
      return this;
    }
    setSize(width: number, height: number, center = true) {
      this.calls.push('size');
      this.width = width;
      this.height = height;
      if (center) {
        const x = this.sprite!.frameSize * this.sprite!.scaleX / 2 - width / 2;
        const y = this.sprite!.frameSize * this.sprite!.scaleY / 2 - height / 2;
        this.position.x += x - this.offset.x;
        this.position.y += y - this.offset.y;
        this.offset = { x, y };
      }
      this.updateCenter();
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
import * as registry from './sideOpsSpecialActorAnimationRegistry';

class DynamicBody {
  width = 96;
  height = 128;
  sourceWidth = 48;
  sourceHeight = 64;
  center = { x: 100, y: 200 };
  calls: string[] = [];
  sprite: SpriteSurface | null = null;
  offsetX = 8;
  offsetY = 0;
  setOffset(x: number, y: number) { this.calls.push('offset'); this.offsetX = x; this.offsetY = y; return this; }
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
    this.center = {
      x: this.sprite!.x + (this.offsetX + this.sourceWidth / 2 - this.sprite!.frameSize * this.sprite!.originX) * this.sprite!.scaleX,
      y: this.sprite!.y + (this.offsetY + this.sourceHeight / 2 - this.sprite!.frameSize * this.sprite!.originY) * this.sprite!.scaleY
    };
    return this;
  }
}

class Sprite implements SpriteSurface {
  x = 100;
  y = 200;
  scaleX = 2;
  scaleY = 2;
  frameSize = 64;
  originX = 0.5;
  originY = 0.5;
  data = new Map<string, unknown>();
  constructor(public body: DynamicBody | InstanceType<typeof StaticBody> | null = null) {
    if (body) body.sprite = this;
  }
  getData(key: string) { return this.data.get(key); }
  setData(key: string, value: unknown) { this.data.set(key, value); return this; }
  setTexture(key: string) { this.frameSize = key.includes('metal-gear-rex') ? 256 : 128; return this; }
  setOrigin(x: number, y: number) { this.originX = x; this.originY = y; return this; }
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

  it('keeps dynamic and static world centers/feet unchanged with upright and wide idle anchors', () => {
    const definition = registry.getSideOpsSpecialActorDefinition('mgs1MetalGearRex')!;
    for (const wide of [false, true]) {
      const bounds = wide ? { x: 20, y: 70, width: 216, height: 108 } : { x: 60, y: 40, width: 119, height: 200 };
      const width = wide ? 160 : 96, height = wide ? 96 : 128;
      for (const body of [new DynamicBody(), new StaticBody()]) {
        if (body instanceof DynamicBody) {
          body.sourceWidth = width / 2;
          body.sourceHeight = height / 2;
          body.offsetX = (64 - body.sourceWidth) / 2;
          body.offsetY = (64 - body.sourceHeight) / 2;
        } else {
          body.width = width;
          body.height = height;
        }
        const sprite = new Sprite(body);
        const spy = vi.spyOn(registry, 'getSideOpsSpecialActorDefinition').mockReturnValueOnce({ ...definition, idleBounds: bounds });
        expect(configureAuthoredSideOpsSpecialActor(loadedScene, asSprite(sprite), 'mgs1MetalGearRex')).toBe(true);
        spy.mockRestore();
        expect(body.width).toBeCloseTo(width);
        expect(body.height).toBeCloseTo(height);
        expect(body.center.x).toBeCloseTo(100);
        expect(body.center.y).toBeCloseTo(200);
        const visualFeetY = sprite.y + (bounds.y + bounds.height - sprite.frameSize * sprite.originY) * sprite.scaleY;
        expect(visualFeetY).toBeCloseTo(200 + height / 2);
        expect(sprite.scaleY).toBeCloseTo(wide ? width / bounds.width : height / bounds.height);
      }
    }
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
