import type { CallHistoryEntry, EraId } from '../types/codec.types';
import { loadJson, saveJson } from './saveEngine';

export type CodecSaveSlotId = 'codec_slot_1' | 'codec_slot_2' | 'codec_slot_3';

export interface CodecSaveSnapshot {
  schemaVersion: 1;
  slotId: CodecSaveSlotId;
  savedAt: string;
  label: string;
  era: EraId;
  contextId: string;
  playerId: string;
  frequency: number;
  selectedTheme: string;
  memoryContactIds: string[];
  callHistory: CallHistoryEntry[];
}

const SLOT_IDS: CodecSaveSlotId[] = ['codec_slot_1', 'codec_slot_2', 'codec_slot_3'];
const STORAGE_KEY = 'codec-save-slots';

export function getCodecSaveSlots(): Record<CodecSaveSlotId, CodecSaveSnapshot | null> {
  const stored = loadJson<Partial<Record<CodecSaveSlotId, CodecSaveSnapshot | null>>>(STORAGE_KEY, {});
  return {
    codec_slot_1: stored.codec_slot_1 ?? null,
    codec_slot_2: stored.codec_slot_2 ?? null,
    codec_slot_3: stored.codec_slot_3 ?? null
  };
}

export function writeCodecSaveSlot(snapshot: CodecSaveSnapshot): Record<CodecSaveSlotId, CodecSaveSnapshot | null> {
  const slots = getCodecSaveSlots();
  slots[snapshot.slotId] = snapshot;
  saveJson(STORAGE_KEY, slots);
  return slots;
}

export function deleteCodecSaveSlot(slotId: CodecSaveSlotId): Record<CodecSaveSlotId, CodecSaveSnapshot | null> {
  const slots = getCodecSaveSlots();
  slots[slotId] = null;
  saveJson(STORAGE_KEY, slots);
  return slots;
}

export function createCodecSaveSnapshot(
  slotId: CodecSaveSlotId,
  input: Omit<CodecSaveSnapshot, 'schemaVersion' | 'slotId' | 'savedAt'>
): CodecSaveSnapshot {
  return {
    schemaVersion: 1,
    slotId,
    savedAt: new Date().toISOString(),
    ...input,
    memoryContactIds: [...new Set(input.memoryContactIds)],
    callHistory: input.callHistory.slice(0, 50)
  };
}

export function getCodecSaveSlotIds(): CodecSaveSlotId[] {
  return [...SLOT_IDS];
}
