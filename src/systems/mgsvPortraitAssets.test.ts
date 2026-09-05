import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import contactsJson from '../data/contacts.json';
import portraitSetsJson from '../data/mgsvPortraitSets.json';

function expectPhysicalWebp(publicPath: string): void {
  const physicalPath = resolve(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  expect(existsSync(physicalPath), publicPath).toBe(true);
  if (!existsSync(physicalPath)) return;
  const signature = readFileSync(physicalPath).subarray(0, 12);
  expect(signature.subarray(0, 4).toString('ascii'), `${publicPath} RIFF signature`).toBe('RIFF');
  expect(signature.subarray(8, 12).toString('ascii'), `${publicPath} WEBP signature`).toBe('WEBP');
}

describe('MGSV physical Codec portrait assets', () => {
  it('contains every routed identity and expression as a valid WebP', () => {
    expect(new Set(portraitSetsJson.map(({ characterId }) => characterId)).size).toBe(portraitSetsJson.length);
    for (const { directory, expressions } of portraitSetsJson) {
      expect(expressions).toEqual(['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch']);
      for (const expression of expressions) {
        expectPhysicalWebp(`/portraits/mgsv/${directory}/${expression}.webp`);
      }
    }
  });

  it('replaces every MGSV contact placeholder with its local neutral portrait', () => {
    const contacts = contactsJson as Array<{ id: string; portrait: string }>;
    for (const { characterId, directory } of portraitSetsJson.filter(({ characterId }) => !['big_boss_gz', 'venom_snake_mgsv'].includes(characterId))) {
      expect(contacts.find(({ id }) => id === characterId)?.portrait)
        .toBe(`/portraits/mgsv/${directory}/neutral.webp`);
    }
  });
});
