import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const expressions = ['neutral', 'serious', 'warning', 'calm', 'glitch', 'humor'];

const baseDirectories = [
  'solid_snake',
  'campbell',
  'mei_ling',
  'naomi',
  'otacon',
  'nastasha',
  'miller',
  'meryl',
  'deepthroat',
  'houseman',
  'sniper_wolf'
];

const storyVariants: Record<string, string[]> = {
  naomi: ['restricted'],
  miller: ['liquid_revealed'],
  meryl: ['injured', 'escape'],
  deepthroat: ['unknown_signal', 'deepthroat', 'gray_fox']
};

function expectPhysicalWebp(publicPath: string): void {
  const physicalPath = resolve(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  expect(existsSync(physicalPath), publicPath).toBe(true);
  if (!existsSync(physicalPath)) return;
  const signature = readFileSync(physicalPath).subarray(0, 12);
  expect(signature.subarray(0, 4).toString('ascii'), `${publicPath} RIFF signature`).toBe('RIFF');
  expect(signature.subarray(8, 12).toString('ascii'), `${publicPath} WEBP signature`).toBe('WEBP');
}

describe('MGS1 physical Codec portrait assets', () => {
  it('contains every base contact expression as a valid WebP', () => {
    for (const directory of baseDirectories) {
      for (const expression of expressions) {
        expectPhysicalWebp(`/portraits/mgs1/${directory}/${expression}.webp`);
      }
    }
  });

  it('contains every routed story variant expression as a valid WebP', () => {
    for (const [directory, variants] of Object.entries(storyVariants)) {
      for (const variant of variants) {
        for (const expression of expressions) {
          expectPhysicalWebp(`/portraits/mgs1/variants/${directory}/${variant}/${expression}.webp`);
        }
      }
    }
  });
});
