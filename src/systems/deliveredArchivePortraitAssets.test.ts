import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getCharacterPortrait } from './codecAssetEngine';
import { getEraCharacterArchiveEntry } from './eraCharacterArchive';
import contacts from '../data/contacts.json';

interface PortraitFileProof { path: string; sha256: string; bytes: number }
interface PortraitSetProof {
  characterId: string;
  source: PortraitFileProof;
  prompt: PortraitFileProof & { canonicalization: 'utf8-lf' };
  outputs: PortraitFileProof[];
}
interface PortraitProvenance { subjects: PortraitSetProof[]; expressions: string[] }

// These production-source proofs are needed by tests, not by the browser build.
// Read them at test runtime so Vercel can omit the heavy art_sources directory.
const readProof = (name: string): PortraitProvenance => JSON.parse(readFileSync(
  resolve('scripts/art_sources/pw-tpp-roster/portraits', name), 'utf8'
));
const provenance = readProof('all-archive-portraits.provenance.json');
const detailedThree = readProof('archive-portraits.provenance.json');

function webpDimensions(buffer: Buffer): [number, number] {
  expect(buffer.subarray(0, 4).toString('ascii')).toBe('RIFF');
  expect(buffer.subarray(8, 12).toString('ascii')).toBe('WEBP');
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const kind = buffer.subarray(offset, offset + 4).toString('ascii');
    const length = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (kind === 'VP8X') return [1 + buffer.readUIntLE(start + 4, 3), 1 + buffer.readUIntLE(start + 7, 3)];
    if (kind === 'VP8 ') {
      expect(buffer.subarray(start + 3, start + 6)).toEqual(Buffer.from([0x9d, 0x01, 0x2a]));
      return [buffer.readUInt16LE(start + 6) & 0x3fff, buffer.readUInt16LE(start + 8) & 0x3fff];
    }
    if (kind === 'VP8L') {
      const bits = buffer.readUInt32LE(start + 1);
      return [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
    }
    offset = start + length + (length % 2);
  }
  throw new Error('Missing WebP image chunk');
}

describe('seven delivered PW/TPP archive portrait sets', () => {
  it('keeps an exact 42-portrait portable aggregate reproducible from the checked-in sources', () => {
    expect(provenance.subjects).toHaveLength(7);
    expect(provenance.subjects.reduce((count, subject) => count + subject.outputs.length, 0)).toBe(42);
    expect(execFileSync(process.execPath, ['scripts/art_sources/pw-tpp-roster/auditArchivePortraitProvenance.mjs', '--check'], { encoding: 'utf8' })).toContain('42 WebP hashes and dimensions match reproducibly');
    for (const detailed of detailedThree.subjects) {
      const aggregate = provenance.subjects.find(subject => subject.characterId === detailed.characterId);
      expect(aggregate?.source.sha256).toBe(detailed.source.sha256);
      expect(aggregate?.outputs.map(output => output.sha256)).toEqual(detailed.outputs.map(output => output.sha256));
    }
  });
  for (const subject of provenance.subjects) {
    it(`${subject.characterId} has six distinct 512px physical WebP expressions with verified provenance`, () => {
      expect(subject.outputs).toHaveLength(6);
      const prompt = readFileSync(resolve(process.cwd(), subject.prompt.path), 'utf8').replace(/\r\n/g, '\n');
      expect(subject.prompt.canonicalization).toBe('utf8-lf');
      expect(createHash('sha256').update(prompt).digest('hex')).toBe(subject.prompt.sha256);
      const hashes = new Set<string>();
      const source = readFileSync(resolve(process.cwd(), subject.source.path));
      expect(createHash('sha256').update(source).digest('hex')).toBe(subject.source.sha256);
      expect([source.readUInt32BE(16), source.readUInt32BE(20)]).toEqual([1536, 1024]);
      for (const [index, output] of subject.outputs.entries()) {
        expect(output.path).not.toMatch(/^[A-Z]:|\\\\/);
        const bytes = readFileSync(resolve(process.cwd(), output.path));
        const hash = createHash('sha256').update(bytes).digest('hex');
        expect(hash).toBe(output.sha256);
        expect(bytes.length).toBe(output.bytes);
        expect(webpDimensions(bytes)).toEqual([512, 512]);
        expect(getCharacterPortrait(subject.characterId, provenance.expressions[index])).toBe('/' + output.path.replace(/^public\//, ''));
        hashes.add(hash);
      }
      expect(hashes.size).toBe(6);
      expect(getEraCharacterArchiveEntry(subject.characterId)?.portrait).toEqual({ kind: 'character', characterId: subject.characterId });
      expect(contacts.some(contact => contact.id === subject.characterId)).toBe(false);
    });
  }
});
