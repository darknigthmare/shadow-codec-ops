import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import codecContextsJson from '../data/codecContexts.json';
import contactsJson from '../data/contacts.json';
import { getCharacterPortrait } from './codecAssetEngine';

function expectPhysicalPortrait(publicPath: string, id: string): void {
  expect(publicPath, id).toMatch(/^\/portraits\/.+\.webp$/);
  const physicalPath = resolve(process.cwd(), 'public', publicPath.replace(/^\//, ''));
  expect(existsSync(physicalPath), `${id}: ${publicPath}`).toBe(true);
  if (!existsSync(physicalPath)) return;
  const signature = readFileSync(physicalPath).subarray(0, 12);
  expect(signature.subarray(0, 4).toString('ascii'), id).toBe('RIFF');
  expect(signature.subarray(8, 12).toString('ascii'), id).toBe('WEBP');
}

describe('all-era Codec portrait coverage', () => {
  it('ships a physical local portrait for every contact and playable identity', () => {
    expect(contactsJson.some(({ portrait }) => portrait.startsWith('placeholder'))).toBe(false);
    for (const contact of contactsJson) {
      const routedPortrait = getCharacterPortrait(contact.id, 'neutral');
      expect(routedPortrait, contact.id).toBeDefined();
      expectPhysicalPortrait(contact.portrait, contact.id);
      expectPhysicalPortrait(routedPortrait!, contact.id);
    }

    const playerIds = new Set(codecContextsJson.flatMap(({ players }) => players.map(({ id }) => id)));
    for (const playerId of playerIds) {
      const routedPortrait = getCharacterPortrait(playerId, 'neutral');
      expect(routedPortrait, playerId).toBeDefined();
      expectPhysicalPortrait(routedPortrait!, playerId);
    }
  });
});
