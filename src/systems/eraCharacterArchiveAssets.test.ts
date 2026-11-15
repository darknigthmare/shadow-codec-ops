import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ERA_CHARACTER_ARCHIVE, getArchiveAnimationClips, getArchivePortraitAsset, getArchivePortraitExpressions } from './eraCharacterArchive';

const diskPath = (url: string) => resolve('public', url.replace(/^\//, ''));
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('PW / TPP release asset gate (physical files, not planned coverage)', () => {
  it('ships every expression and every animation board for all 40 agreed identities', () => {
    for (const entry of ERA_CHARACTER_ARCHIVE) {
      const assets = [
        ...getArchivePortraitExpressions(entry).map(expression => getArchivePortraitAsset(entry, expression)?.path),
        ...getArchiveAnimationClips(entry).map(clip => clip.path)
      ];
      for (const path of new Set(assets)) {
        expect(path, entry.id).toBeTruthy();
        expect(existsSync(diskPath(path!)), `${entry.id}: ${path}`).toBe(true);
        const bytes = readFileSync(diskPath(path!));
        if (path!.endsWith('.webp')) {
          expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
          expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
        } else expect(bytes.subarray(0, 8)).toEqual(Buffer.from([137,80,78,71,13,10,26,10]));
      }
      for (const clip of getArchiveAnimationClips(entry)) {
        const bytes = readFileSync(diskPath(clip.path));
        expect(bytes.readUInt32BE(16), entry.id).toBe(clip.frameSize * 4);
        expect(bytes.readUInt32BE(20), entry.id).toBe(clip.frameSize * 4);
      }
    }
  });
  it('verifies the 30 new authored core sheets, source SHA and row order against provenance', () => {
    const entries = ERA_CHARACTER_ARCHIVE.filter(entry => entry.animation.kind === 'roster');
    expect(entries).toHaveLength(30);
    for (const entry of entries) {
      if (entry.animation.kind !== 'roster') throw new Error('expected roster animation');
      const sheet = diskPath(entry.animation.path);
      const provenancePath = sheet.replace(/\.png$/, '.provenance.json');
      expect(existsSync(provenancePath), entry.id).toBe(true);
      const report = JSON.parse(readFileSync(provenancePath, 'utf8'));
      expect(report.provenance).toBe('openai-authored-poses');
      expect(report.runtime.states.map((state: { id: string }) => state.id), entry.id).toEqual(entry.animation.states);
      expect(report.runtime.frameCount).toBe(16);
      expect(report.outputs.sheet.sha256, entry.id).toBe(digest(readFileSync(sheet)));
      expect(report.outputs.idle.sha256, entry.id).toBe(digest(readFileSync(diskPath(entry.sourcePath))));
      const source = resolve(report.source.file);
      expect(existsSync(source), `${entry.id} source`).toBe(true);
      expect(report.source.sha256, entry.id).toBe(digest(readFileSync(source)));
      for (let row = 0; row < 4; row += 1) {
        expect(new Set(report.runtime.frameRgbaSha256.slice(row * 4, row * 4 + 4)).size, entry.id).toBe(4);
        expect(new Set(report.runtime.croppedPoseSha256.slice(row * 4, row * 4 + 4)).size, entry.id).toBe(4);
      }
    }
  });
});
