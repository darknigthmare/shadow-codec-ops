import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import contactsJson from '../data/contacts.json';
import portraitSetsJson from '../data/mgs4PortraitSets.json';

function expectPhysicalWebp(publicPath: string): void {
  const physicalPath = resolve(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  expect(existsSync(physicalPath), publicPath).toBe(true);
  if (!existsSync(physicalPath)) return;
  const signature = readFileSync(physicalPath).subarray(0, 12);
  expect(signature.subarray(0, 4).toString('ascii'), `${publicPath} RIFF signature`).toBe('RIFF');
  expect(signature.subarray(8, 12).toString('ascii'), `${publicPath} WEBP signature`).toBe('WEBP');
}

describe('MGS4 physical Codec portrait assets', () => {
  it('contains every routed identity and expression as a valid WebP', () => {
    expect(portraitSetsJson).toHaveLength(8);
    for (const { directory, expressions } of portraitSetsJson) {
      expect(expressions).toEqual(['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch']);
      for (const expression of expressions) {
        expectPhysicalWebp(`/portraits/mgs4/${directory}/${expression}.webp`);
      }
    }
  });

  it('replaces every MGS4 contact placeholder with its local neutral portrait', () => {
    const contacts = contactsJson as Array<{ id: string; portrait: string }>;
    for (const { contactId, directory } of portraitSetsJson.filter(({ contactId }) => contactId !== 'old_snake_mgs4')) {
      expect(contacts.find(({ id }) => id === contactId)?.portrait)
        .toBe(`/portraits/mgs4/${directory}/neutral.webp`);
    }
  });
});
