import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import contacts from '../data/contacts.json';
import archivePortraitSets from '../data/archivePortraitSets.json';
import { getCharacterPortrait } from './codecAssetEngine';
import {
  ERA_CHARACTER_ARCHIVE, getEraCharacterArchiveEntry, getArchiveAnimationClips,
  getArchivePortraitAsset, getArchivePortraitExpressions, getArchiveRequiredAssets,
  getArchiveCoverage, getArchiveFrameRect, validateArchiveImageDimensions,
  type ArchiveAssetState
} from './eraCharacterArchive';

describe('Peace Walker / Phantom Pain visual archive identity contract', () => {
  it('declares exactly the agreed 16 PW and 24 TPP identities, not whole-franchise completion', () => {
    expect(ERA_CHARACTER_ARCHIVE).toHaveLength(40);
    expect(ERA_CHARACTER_ARCHIVE.filter(entry => entry.era === 'peace_walker').map(entry => entry.id)).toEqual([
      'big_boss_pw','miller_pw','paz_pw','huey_pw','amanda_pw','chico_pw','cecile_pw','strangelove_pw','galvez_pw','coldman_pw',
      'pupa_pw','chrysalis_pw','cocoon_pw','basilisk_pw','zeke_pw','mammal_pod_pw'
    ]);
    expect(ERA_CHARACTER_ARCHIVE.filter(entry => entry.era === 'mgsv').map(entry => entry.id).sort()).toEqual([
      'venom_snake_mgsv','miller_mgsv','ocelot_mgsv','huey_mgsv','code_talker_mgsv','quiet_mgsv','pequod_mgsv','skull_face_mgsv',
      'eli_mgsv','tretij_rebenok_mgsv','man_on_fire_mgsv','ishmael_mgsv','paz_1984_mgsv',
      'd_dog_mgsv','d_horse_mgsv','d_walker_mgsv','walker_gear_mgsv','skulls_mist_mgsv','skulls_armor_mgsv','skulls_sniper_mgsv',
      'sahelanthropus_mgsv','soviet_soldier_mgsv','pf_soldier_mgsv','mosquito_mgsv'
    ].sort());
    expect(new Set(ERA_CHARACTER_ARCHIVE.map(entry => entry.id)).size).toBe(40);
    expect(new Set(ERA_CHARACTER_ARCHIVE.map(entry => entry.sourceTextureKey)).size).toBe(40);
  });
  it('adds seven portrait identities without adding callable contacts, frequencies or scripts', () => {
    expect(archivePortraitSets).toHaveLength(7);
    for (const set of archivePortraitSets) {
      expect(contacts.some(contact => contact.id === set.characterId)).toBe(false);
      expect(set.expressions).toEqual(['neutral','serious','warning','calm','humor','glitch']);
      for (const expression of set.expressions) {
        expect(getCharacterPortrait(set.characterId, expression)).toBe(`${set.basePath}/${expression}.webp`);
        for (const alias of set.aliases) expect(getCharacterPortrait(alias, expression)).toBe(`${set.basePath}/${expression}.webp`);
      }
      expect(getCharacterPortrait(set.characterId, 'nonexistent')).toBe(`${set.basePath}/neutral.webp`);
    }
    expect(getCharacterPortrait('mammal_pod_pw')).toBe('/portraits/peace_walker/mammal_pod/neutral.webp');
    expect(getCharacterPortrait('miller_pw')).toBe('/portraits/peace_walker/miller/neutral.webp');
    expect(getCharacterPortrait('miller_mgsv')).toBe('/portraits/mgsv/miller/neutral.webp');
  });
  it('uses machine/companion/enemy PNG source cards rather than fake emotional portrait sets', () => {
    for (const entry of ERA_CHARACTER_ARCHIVE.filter(candidate => candidate.category !== 'human')) {
      expect(entry.portrait.kind, entry.id).toBe('sprite');
      const asset = getArchivePortraitAsset(entry);
      expect(asset?.path, entry.id).toMatch(/^\/sideops\/.+\.png$/);
      expect(getArchivePortraitExpressions(entry)).toEqual(['source']);
      if (!('path' in entry.portrait)) expect(asset?.frame?.index).toBe(0);
    }
  });
  it('resolves exact IDs only and keeps PW, GZ and TPP identities separate', () => {
    expect(getEraCharacterArchiveEntry('miller_pw')?.sourceTextureKey).not.toBe(getEraCharacterArchiveEntry('miller_mgsv')?.sourceTextureKey);
    for (const id of [undefined, null, '', 'miller', 'miller_gz', '__proto__', 'peaceWalkerMiller']) expect(getEraCharacterArchiveEntry(id)).toBeUndefined();
  });
  it('exposes four actions x four phases for the 30 new core boards and 32 existing poses for ten reused actors', () => {
    const newEntries = ERA_CHARACTER_ARCHIVE.filter(entry => entry.animation.kind === 'roster');
    expect(newEntries).toHaveLength(30);
    for (const entry of ERA_CHARACTER_ARCHIVE) {
      const clips = getArchiveAnimationClips(entry);
      expect(clips.length, entry.id).toBe(entry.animation.kind === 'roster' ? 4 : 8);
      expect(new Set(clips.map(clip => clip.state)).size, entry.id).toBe(clips.length);
      for (const clip of clips) {
        expect(clip.columns).toBe(4); expect(clip.rows).toBe(4);
        expect(clip.end - clip.start).toBe(3);
        expect(clip.start).toBeGreaterThanOrEqual(0); expect(clip.end).toBeLessThan(16);
      }
      expect(new Set(clips.map(clip => clip.path)).size).toBe(entry.animation.kind === 'roster' ? 1 : 2);
    }
  });
  it('keeps new sources inside the agreed roster directories and does not route missing humans to guards', () => {
    for (const entry of ERA_CHARACTER_ARCHIVE.filter(candidate => candidate.animation.kind === 'roster')) {
      const animation = entry.animation;
      if (animation.kind !== 'roster') throw new Error('expected roster');
      expect(animation.path).toMatch(/^\/sideops\/roster\/(peace-walker|phantom-pain)\/[a-z0-9-]+\.png$/);
      expect(entry.sourcePath).toBe(animation.path.replace(/\.png$/, '-idle.png'));
      if (entry.category === 'human' && !['quiet_mgsv','man_on_fire_mgsv'].includes(entry.id)) expect(animation.states).not.toContain('attack');
    }
  });
  it('does not report declared or partly loaded files as completed coverage', () => {
    const entry = getEraCharacterArchiveEntry('big_boss_pw')!;
    expect(getArchiveCoverage(entry, {}).animationReady).toBe(false);
    const clips = getArchiveAnimationClips(entry);
    const states: Record<string, ArchiveAssetState> = { [clips[0].path]: { status: 'ready' } };
    expect(getArchiveCoverage(entry, states)).toMatchObject({ loadedBoards: 1, expectedBoards: 2, loadedPoses: 16, expectedPoses: 32, animationReady: false, portraitReady: false });
    states[clips[4].path] = { status: 'missing' };
    expect(getArchiveCoverage(entry, states).missingPaths).toContain(clips[4].path);
    states[clips[4].path] = { status: 'ready' };
    expect(getArchiveCoverage(entry, states).animationReady).toBe(true);
    states[getArchivePortraitAsset(entry)!.path] = { status: 'ready' };
    expect(getArchiveCoverage(entry, states).portraitReady).toBe(true);
  });
  it('validates decoded dimensions and rejects HTML fallback, empty or malformed sheets', () => {
    const asset = { path: '/sideops/roster/peace-walker/coldman.png', width: 512, height: 512 };
    expect(validateArchiveImageDimensions(asset, 512, 512).status).toBe('ready');
    for (const [width, height] of [[0,0],[128,128],[512,256],[NaN,512],[Infinity,512]]) expect(validateArchiveImageDimensions(asset,width,height).status).toBe('invalid');
  });
  it('resolves all 16 phase cells exactly and clamps invalid scrubber values', () => {
    const clips = getArchiveAnimationClips(getEraCharacterArchiveEntry('coldman_pw')!);
    expect(clips.flatMap(clip => [0,1,2,3].map(phase => getArchiveFrameRect(clip, phase).index))).toEqual(Array.from({ length:16 },(_,index)=>index));
    expect(getArchiveFrameRect(clips[3], 3)).toEqual({index:15,x:384,y:384,width:128,height:128});
    expect(getArchiveFrameRect(clips[0], -10).index).toBe(0);
    expect(getArchiveFrameRect(clips[0], 100).index).toBe(3);
    expect(getArchiveFrameRect(clips[0], NaN).index).toBe(0);
  });
  it('checks existing physical animation files without pretending pending files have been delivered', () => {
    for (const entry of ERA_CHARACTER_ARCHIVE) for (const asset of getArchiveRequiredAssets(entry)) {
      const path = resolve('public', asset.path.replace(/^\//,''));
      if (!existsSync(path)) {
        expect(getArchiveCoverage(entry, { [asset.path]:{ status:'missing' } }).missingPaths).toContain(asset.path);
        continue;
      }
      const bytes = readFileSync(path);
      if (asset.path.endsWith('.png')) {
        expect(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])), asset.path).toBe(true);
        expect(validateArchiveImageDimensions(asset,bytes.readUInt32BE(16),bytes.readUInt32BE(20)).status, asset.path).toBe('ready');
      } else {
        expect(bytes.subarray(0,4).toString('ascii'),asset.path).toBe('RIFF');
        expect(bytes.subarray(8,12).toString('ascii'),asset.path).toBe('WEBP');
      }
    }
  });
});
