/// <reference types="node" />

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inflateSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import {
  getSideOpsActorAnimation,
  SIDEOPS_ACTOR_ANIMATION_CLIPS,
  SIDEOPS_ACTOR_ANIMATION_PACKS,
  SIDEOPS_ACTOR_ANIMATION_ROLES,
  SIDEOPS_ACTOR_ANIMATION_SHEETS,
  type SideOpsActorAnimationState
} from './sideOpsActorAnimationRegistry';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from './sideOpsVisualPackRuntime';

function decodeSheet(png: Buffer): Uint8Array {
  expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect(png.readUInt32BE(16)).toBe(512);
  expect(png.readUInt32BE(20)).toBe(512);
  expect([png[24], png[25], png[28]]).toEqual([8, 6, 0]);
  const chunks: Buffer[] = [];
  for (let offset = 8; offset < png.length;) {
    const size = png.readUInt32BE(offset);
    if (png.toString('ascii', offset + 4, offset + 8) === 'IDAT') chunks.push(png.subarray(offset + 8, offset + 8 + size));
    offset += size + 12;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = 512 * 4;
  expect(raw.length).toBe((stride + 1) * 512);
  const pixels = new Uint8Array(stride * 512);
  for (let y = 0; y < 512; y += 1) {
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

describe('authored Side Ops actor animation boards', () => {
  it('covers every visual pack with three actors and two independent boards', () => {
    expect([...SIDEOPS_ACTOR_ANIMATION_PACKS].sort()).toEqual(Object.keys(SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES).sort());
    expect(SIDEOPS_ACTOR_ANIMATION_SHEETS).toHaveLength(72);
    expect(new Set(SIDEOPS_ACTOR_ANIMATION_SHEETS.map((sheet) => sheet.textureKey)).size).toBe(72);
    expect(new Set(SIDEOPS_ACTOR_ANIMATION_SHEETS.map((sheet) => sheet.path)).size).toBe(72);
    expect(SIDEOPS_ACTOR_ANIMATION_CLIPS).toHaveLength(288);
    expect(new Set(SIDEOPS_ACTOR_ANIMATION_CLIPS.map((clip) => clip.key)).size).toBe(288);
    const states: SideOpsActorAnimationState[] = ['idle', 'move', 'crouch', 'jump', 'attack', 'melee', 'hit', 'death'];
    for (const pack of SIDEOPS_ACTOR_ANIMATION_PACKS) {
      for (const role of SIDEOPS_ACTOR_ANIMATION_ROLES) {
        for (const [index, state] of states.entries()) {
          const clip = getSideOpsActorAnimation(pack, role, state);
          expect(clip.textureKey).toBe(`sideops-actor:${pack}:${role}:${index < 4 ? 'mobility' : 'combat'}`);
          expect([clip.start, clip.end]).toEqual([(index % 4) * 4, (index % 4) * 4 + 3]);
          expect(clip.repeat).toBe(['idle', 'move', 'crouch'].includes(state) ? -1 : 0);
        }
      }
    }
  });

  it('ships visible, separated, distinct phases and validates their recorded provenance', () => {
    for (const pack of SIDEOPS_ACTOR_ANIMATION_PACKS) {
      const base = resolve('public/sideops/actor-animations', pack);
      const provenance = JSON.parse(readFileSync(resolve(base, 'provenance.json'), 'utf8'));
      expect(provenance.packId).toBe(pack);
      expect(provenance.provenance).toBe('openai-authored-poses');
      expect(provenance.sources.mobility.sha256).not.toBe(provenance.sources.combat.sha256);
      for (const source of Object.values(provenance.sources) as Array<{ file: string; sha256: string }>) {
        const bytes = readFileSync(resolve('scripts/art_sources/actor-animations', source.file));
        expect(createHash('sha256').update(bytes).digest('hex')).toBe(source.sha256);
      }
      for (const sheet of SIDEOPS_ACTOR_ANIMATION_SHEETS.filter((item) => item.packId === pack)) {
        const png = readFileSync(resolve('public', sheet.path.slice(1)));
        expect(createHash('sha256').update(png).digest('hex')).toBe(provenance.actors[sheet.role][sheet.board].sha256);
        const pixels = decodeSheet(png);
        const hashes: string[] = [];
        for (let frame = 0; frame < 16; frame += 1) {
          const data = new Uint8Array(128 * 128 * 4);
          let occupied = 0;
          let edgePixels = 0;
          let hiddenRgb = 0;
          for (let y = 0; y < 128; y += 1) {
            for (let x = 0; x < 128; x += 1) {
              const source = (((Math.floor(frame / 4) * 128 + y) * 512) + (frame % 4) * 128 + x) * 4;
              const offset = (y * 128 + x) * 4;
              data.set(pixels.subarray(source, source + 4), offset);
              if (data[offset + 3]) {
                occupied += 1;
                if (x < 8 || x >= 120 || y < 8 || y >= 120) edgePixels += 1;
              } else if (data[offset] || data[offset + 1] || data[offset + 2]) hiddenRgb += 1;
            }
          }
          expect(occupied, `${sheet.textureKey}/${frame} empty`).toBeGreaterThan(100);
          expect(edgePixels, `${sheet.textureKey}/${frame} reaches guard border`).toBe(0);
          expect(hiddenRgb).toBe(0);
          hashes.push(createHash('sha256').update(data).digest('hex'));
        }
        expect(hashes).toEqual(provenance.actors[sheet.role][sheet.board].frameHashes);
        for (let row = 0; row < 4; row += 1) expect(new Set(hashes.slice(row * 4, row * 4 + 4)).size).toBe(4);
      }
    }
  // This physical-art audit decodes 72 RGBA sheets; allow slower CI machines.
  }, 30_000);
});
