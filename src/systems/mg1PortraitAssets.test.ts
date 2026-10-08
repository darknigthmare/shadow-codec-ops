/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import portraitSetsJson from '../data/mg1PortraitSets.json';

interface Mg1PortraitSet {
  characterId: string;
  directory: string;
  expressions: string[];
}

function readLosslessWebpSize(path: string): { width: number; height: number } {
  const webp = readFileSync(path);
  expect(webp.toString('ascii', 0, 4), path).toBe('RIFF');
  expect(webp.toString('ascii', 8, 12), path).toBe('WEBP');
  expect(webp.toString('ascii', 12, 16), path).toBe('VP8L');
  expect(webp[20], path).toBe(0x2f);
  const sizeBits = webp.readUInt32LE(21);
  return {
    width: (sizeBits & 0x3fff) + 1,
    height: ((sizeBits >> 14) & 0x3fff) + 1
  };
}

describe('MG1 generated Codec portraits', () => {
  it('ships five complete six-expression packs as 512px lossless WebP files', () => {
    const portraitSets = portraitSetsJson as Mg1PortraitSet[];
    expect(portraitSets).toHaveLength(5);

    const paths = portraitSets.flatMap((portraitSet) => {
      expect(portraitSet.expressions).toEqual(['neutral', 'serious', 'warning', 'calm', 'glitch', 'humor']);
      return portraitSet.expressions.map((expression) => resolve(
        process.cwd(),
        'public',
        'portraits',
        'msx',
        'mg1',
        portraitSet.directory,
        `${expression}.webp`
      ));
    });

    expect(new Set(paths).size).toBe(30);
    for (const path of paths) expect(readLosslessWebpSize(path), path).toEqual({ width: 512, height: 512 });
  });
});
