/// <reference types="node" />
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inflateSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import {
  getSideOpsSpecialActorAnimation,
  getSideOpsSpecialActorDefinition,
  getSideOpsSpecialActorGeometry,
  SIDEOPS_SPECIAL_ACTORS,
  SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS,
  SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS
} from './sideOpsSpecialActorAnimationRegistry';

function decode(png: Buffer, size: number): Uint8Array {
  expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect([png.readUInt32BE(16), png.readUInt32BE(20), png[24], png[25], png[28]]).toEqual([size, size, 8, 6, 0]);
  const chunks: Buffer[] = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    if (png.toString('ascii', offset + 4, offset + 8) === 'IDAT') chunks.push(png.subarray(offset + 8, offset + 8 + length));
    offset += length + 12;
  }
  const raw = inflateSync(Buffer.concat(chunks)), stride = size * 4;
  expect(raw.length).toBe((stride + 1) * size);
  const pixels = new Uint8Array(stride * size);
  for (let y = 0; y < size; y += 1) {
    const filter = raw[y * (stride + 1)];
    expect(filter).toBeLessThanOrEqual(4);
    for (let x = 0; x < stride; x += 1) {
      const index = y * stride + x;
      const left = x >= 4 ? pixels[index - 4] : 0;
      const above = y > 0 ? pixels[index - stride] : 0;
      const upperLeft = x >= 4 && y > 0 ? pixels[index - stride - 4] : 0;
      let prediction = 0;
      if (filter === 1) prediction = left;
      if (filter === 2) prediction = above;
      if (filter === 3) prediction = Math.floor((left + above) / 2);
      if (filter === 4) {
        const p = left + above - upperLeft;
        const a = Math.abs(p - left), b = Math.abs(p - above), c = Math.abs(p - upperLeft);
        prediction = a <= b && a <= c ? left : b <= c ? above : upperLeft;
      }
      pixels[index] = (raw[y * (stride + 1) + 1 + x] + prediction) & 255;
    }
  }
  return pixels;
}

describe('special authored Side Ops actors', () => {
  it('declares the exact six-sheet, 24-clip contract with independent actor identities', () => {
    expect(SIDEOPS_SPECIAL_ACTORS).toHaveLength(3);
    expect(SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS).toHaveLength(6);
    expect(SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS).toHaveLength(24);
    expect(new Set(SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS.map((clip) => clip.key)).size).toBe(24);
    expect(new Set(SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS.map((sheet) => sheet.path)).size).toBe(6);
    for (const actor of SIDEOPS_SPECIAL_ACTORS) {
      expect(actor.sourceFacing).toBe(actor.kind === 'machine' ? 'left' : 'right');
      expect(actor.era).toBe('mgs1');
      expect(new Set([...actor.states.core, ...actor.states.special]).size).toBe(8);
      for (const [board, states] of Object.entries(actor.states)) {
        expect(states).toHaveLength(4);
        states.forEach((state, row) => {
          const clip = getSideOpsSpecialActorAnimation(actor.sourceTextureKey, state)!;
          expect(clip.textureKey).toBe(`sideops-special:${actor.id}:${board}`);
          expect([clip.start, clip.end]).toEqual([row * 4, row * 4 + 3]);
        });
      }
    }
  });

  it('keeps semantic canon boundaries and never invents a fallback action', () => {
    expect(getSideOpsSpecialActorAnimation('mgs1Otacon', 'attack')).toBeUndefined();
    expect(getSideOpsSpecialActorAnimation('mgs1Otacon', 'reload')).toBeUndefined();
    expect(getSideOpsSpecialActorAnimation('mgs1MetalGearRex', 'melee')).toBeUndefined();
    expect(getSideOpsSpecialActorAnimation('mgs1RevolverOcelot', 'laser')).toBeUndefined();
    expect(getSideOpsSpecialActorAnimation('unknown', 'idle')).toBeUndefined();
    expect(getSideOpsSpecialActorAnimation('mgs1Otacon', 'typo')).toBeUndefined();
    expect(getSideOpsSpecialActorDefinition('mgs1MetalGearRex')?.frameSize).toBe(256);
    expect(getSideOpsSpecialActorDefinition('mgs1RevolverOcelot')?.sourcePath).toContain('/mgs1/bosses/revolver-ocelot.png');
    expect(getSideOpsSpecialActorAnimation('mgs1RevolverOcelot', 'reload')?.repeat).toBe(0);
    expect(getSideOpsSpecialActorAnimation('mgs1MetalGearRex', 'railgun')?.state).toBe('railgun');
  });

  it('preserves explicit world collision dimensions and centered ground baseline at different scales', () => {
    for (const actor of SIDEOPS_SPECIAL_ACTORS) {
      for (const scale of [0.5, 1, 2]) {
        const width = actor.bodyWidth * scale, height = actor.bodyHeight * scale;
        const geometry = getSideOpsSpecialActorGeometry(actor, width, height);
        expect(geometry.width * geometry.scale).toBeCloseTo(width);
        expect(geometry.height * geometry.scale).toBeCloseTo(height);
        expect((-actor.frameSize / 2 + geometry.offsetX + geometry.width / 2) * geometry.scale).toBeCloseTo(0);
        expect((-actor.frameSize / 2 + geometry.offsetY + geometry.height) * geometry.scale).toBeCloseTo(height / 2);
      }
    }
  });

  it('ships six genuine sheets with matching source provenance and distinct visible phases', () => {
    for (const actor of SIDEOPS_SPECIAL_ACTORS) {
      const provenance = JSON.parse(readFileSync(resolve('public/sideops/special-animations', actor.id, 'provenance.json'), 'utf8'));
      expect(provenance.actorId).toBe(actor.id);
      expect(provenance.provenance).toBe('openai-authored-poses');
      expect(provenance.sourceFacing).toBe(actor.sourceFacing);
      expect(provenance.sources.core.sha256).not.toBe(provenance.sources.special.sha256);
      for (const source of Object.values(provenance.sources) as Array<{ file: string; sha256: string }>) {
        const bytes = readFileSync(resolve('scripts/art_sources/special-animations', source.file));
        expect(createHash('sha256').update(bytes).digest('hex')).toBe(source.sha256);
      }
      for (const sheet of SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS.filter((item) => item.actorId === actor.id)) {
        const bytes = readFileSync(resolve('public', sheet.path.slice(1)));
        const recorded = provenance.sheets[sheet.board];
        expect(createHash('sha256').update(bytes).digest('hex')).toBe(recorded.sha256);
        expect(recorded.states).toEqual(actor.states[sheet.board]);
        const size = actor.frameSize, sheetSize = size * 4;
        const pixels = decode(bytes, sheetSize), hashes: string[] = [];
        for (let index = 0; index < 16; index += 1) {
          const frame = new Uint8Array(size * size * 4);
          let occupied = 0, border = 0, hiddenRgb = 0;
          for (let y = 0; y < size; y += 1) {
            for (let x = 0; x < size; x += 1) {
              const source = ((Math.floor(index / 4) * size + y) * sheetSize + index % 4 * size + x) * 4;
              const offset = (y * size + x) * 4;
              frame.set(pixels.subarray(source, source + 4), offset);
              if (frame[offset + 3]) {
                occupied += 1;
                if (x < actor.padding || y < actor.padding || x >= size - actor.padding || y >= size - actor.padding) border += 1;
              } else if (frame[offset] || frame[offset + 1] || frame[offset + 2]) hiddenRgb += 1;
            }
          }
          expect(occupied, `${sheet.textureKey}/${index}`).toBeGreaterThan(100);
          expect(border).toBe(0);
          expect(hiddenRgb).toBe(0);
          hashes.push(createHash('sha256').update(frame).digest('hex'));
        }
        expect(hashes).toEqual(recorded.frameHashes);
        for (let row = 0; row < 4; row += 1) {
          expect(new Set(hashes.slice(row * 4, row * 4 + 4)).size).toBe(4);
          expect(new Set(recorded.croppedPoseHashes.slice(row * 4, row * 4 + 4)).size).toBe(4);
        }
      }
    }
  }, 20_000);
});
