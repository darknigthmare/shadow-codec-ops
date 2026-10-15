import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import contactsJson from '../data/contacts.json';
import patriotsAiPortraitSetsJson from '../data/patriotsAiPortraitSets.json';
import vrSimulationPortraitSetsJson from '../data/vrSimulationPortraitSets.json';

function expectPhysicalWebp(publicPath: string): void {
  const physicalPath = resolve(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  expect(existsSync(physicalPath), publicPath).toBe(true);
  if (!existsSync(physicalPath)) return;
  const signature = readFileSync(physicalPath).subarray(0, 12);
  expect(signature.subarray(0, 4).toString('ascii'), `${publicPath} RIFF signature`).toBe('RIFF');
  expect(signature.subarray(8, 12).toString('ascii'), `${publicPath} WEBP signature`).toBe('WEBP');
}

describe('VR Simulation and Patriots AI physical Codec portraits', () => {
  it.each([
    ['vr_simulation', vrSimulationPortraitSetsJson],
    ['patriots_ai', patriotsAiPortraitSetsJson]
  ] as const)('contains every %s identity and expression as a valid WebP', (era, portraitSets) => {
    for (const { directory, expressions } of portraitSets) {
      expect(expressions).toEqual(['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch']);
      for (const expression of expressions) {
        expectPhysicalWebp(`/portraits/${era}/${directory}/${expression}.webp`);
      }
    }
  });

  it('replaces the final synthetic contact placeholders with local neutral portraits', () => {
    const contacts = contactsJson as Array<{ id: string; portrait: string }>;
    expect(contacts.find(({ id }) => id === 'vr_instructor')?.portrait)
      .toBe('/portraits/vr_simulation/instructor/neutral.webp');
    expect(contacts.find(({ id }) => id === 'patriots_colonel_ai')?.portrait)
      .toBe('/portraits/patriots_ai/colonel/neutral.webp');
    expect(contacts.some(({ portrait }) => portrait.startsWith('placeholder'))).toBe(false);
  });
});
