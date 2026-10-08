import { beforeEach, describe, expect, it } from 'vitest';
import { createCodecSaveSnapshot, deleteCodecSaveSlot, getCodecSaveSlots, writeCodecSaveSlot } from './codecSaveStorage';

describe('Codec save slots', () => {
  beforeEach(() => window.localStorage.clear());

  it('writes, loads and deletes independent Codec slots', () => {
    const snapshot = createCodecSaveSnapshot('codec_slot_1', {
      label: 'Shadow Moses — Insertion',
      era: 'mgs1',
      contextId: 'mgs1_insertion',
      playerId: 'solid_snake_mgs1',
      frequency: 140.85,
      selectedTheme: 'classic_mgs1',
      memoryContactIds: ['campbell_mgs1'],
      callHistory: []
    });
    writeCodecSaveSlot(snapshot);
    expect(getCodecSaveSlots().codec_slot_1?.contextId).toBe('mgs1_insertion');
    expect(getCodecSaveSlots().codec_slot_2).toBeNull();
    deleteCodecSaveSlot('codec_slot_1');
    expect(getCodecSaveSlots().codec_slot_1).toBeNull();
  });
});
