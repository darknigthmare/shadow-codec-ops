import { beforeEach, describe, expect, it } from 'vitest';
import { loadVoicePackState, resolvePortraitAsset, resolveVoiceAsset, sanitizeVoicePack, saveVoicePackState } from './voicePackStorage';

describe('voice pack pipeline', () => {
  beforeEach(() => window.localStorage.clear());

  it('sanitizes supported local asset paths and rejects remote ones', () => {
    const pack = sanitizeVoicePack({
      id: 'pack one', name: 'Pack One', version: '1', assets: [
        { id: 'ok', conversationId: 'intro', lineIndex: 0, source: '/audio/custom/intro.ogg' },
        { id: 'bad', conversationId: 'intro', lineIndex: 1, source: 'https://example.com/voice.ogg' }
      ]
    });
    expect(pack?.id).toBe('pack_one');
    expect(pack?.assets).toHaveLength(1);
  });

  it('resolves enabled voice and portrait replacements', () => {
    const pack = sanitizeVoicePack({
      id: 'local', name: 'Local', version: '1', era: 'mgs1',
      assets: [{ id: 'a', conversationId: 'intro', lineIndex: 0, source: '/audio/custom/a.ogg' }],
      portraits: [{ characterId: 'campbell_mgs1', expression: 'serious', image: '/portraits/custom/campbell.png' }]
    });
    expect(pack).not.toBeNull();
    saveVoicePackState({ packs: [pack!], enabledPackIds: ['local'] });
    const state = loadVoicePackState();
    expect(resolveVoiceAsset('intro', 0, 'mgs1', state)?.source).toContain('a.ogg');
    expect(resolvePortraitAsset('campbell_mgs1', 'serious', 'mgs1', state)).toContain('campbell.png');
  });
});
