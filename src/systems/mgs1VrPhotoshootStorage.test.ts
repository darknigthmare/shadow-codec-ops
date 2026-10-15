import { beforeEach, describe, expect, it } from 'vitest';
import {
  MGS1_VR_PHOTOSHOOT_METADATA_KEY,
  Mgs1VrPhotoshootStorageError,
  createMgs1VrPhotoshootStorage,
  type Mgs1VrPhotoshootPersistenceAdapter,
  type Mgs1VrPhotoshootRecord,
  type Mgs1VrPhotoshootSaveInput
} from './mgs1VrPhotoshootStorage';

const WEBP_THUMBNAIL = 'data:image/webp;base64,UklGRgAAAAA=';

const photo = (
  subject: Mgs1VrPhotoshootSaveInput['subject'],
  capturedAt: string,
  score = 100
): Mgs1VrPhotoshootSaveInput => ({
  subject,
  score,
  capturedAt,
  thumbnail: WEBP_THUMBNAIL,
  framing: { centerX: 320, centerY: 180, width: 180, height: 320 },
  zoom: 1.25
});

class FakeIndexedDbAdapter implements Mgs1VrPhotoshootPersistenceAdapter {
  readonly kind = 'indexeddb' as const;
  readonly records = new Map<string, Mgs1VrPhotoshootRecord>();
  failPutWith?: Error;

  async list(): Promise<Mgs1VrPhotoshootRecord[]> {
    return [...this.records.values()].map((record) => ({ ...record, framing: { ...record.framing } }));
  }

  async put(record: Mgs1VrPhotoshootRecord): Promise<void> {
    if (this.failPutWith) throw this.failPutWith;
    this.records.set(record.id, { ...record, framing: { ...record.framing } });
  }

  async delete(id: string): Promise<void> {
    this.records.delete(id);
  }

  async clear(): Promise<void> {
    this.records.clear();
  }
}

beforeEach(() => window.localStorage.clear());

describe('MGS1 VR Photoshoot album storage', () => {
  it('supports ordered fallback CRUD when IndexedDB is unavailable', async () => {
    let sequence = 0;
    const album = createMgs1VrPhotoshootStorage({
      primaryAdapter: null,
      metadataStorage: window.localStorage,
      idFactory: () => `photo-${++sequence}`
    });

    const first = await album.save(photo('naomi', '2026-07-16T10:00:00.000Z', 900));
    const second = await album.save(photo('mei_ling', '2026-07-16T11:00:00.000Z', 1200));
    expect(first.backend).toBe('fallback');
    expect(first.issues.map((issue) => issue.code)).toContain('indexeddb_unavailable');
    expect(second.value.id).toBe('photo-2');

    const listed = await album.list();
    expect(listed.value.map((record) => record.id)).toEqual(['photo-2', 'photo-1']);
    expect(listed.value[0]).toMatchObject({ subject: 'mei_ling', score: 1200, zoom: 1.25 });

    expect((await album.delete('photo-1')).value).toBe(true);
    expect((await album.delete('missing')).value).toBe(false);
    await album.clear();
    expect((await album.list()).value).toEqual([]);
  });

  it('evicts the oldest photo and restores local metadata without storing large thumbnails', async () => {
    let sequence = 0;
    const album = createMgs1VrPhotoshootStorage({
      primaryAdapter: null,
      metadataStorage: window.localStorage,
      albumLimit: 2,
      idFactory: () => `limited-${++sequence}`
    });

    await album.save(photo('naomi', '2026-07-16T08:00:00.000Z'));
    await album.save(photo('naomi', '2026-07-16T09:00:00.000Z'));
    await album.save(photo('mei_ling', '2026-07-16T10:00:00.000Z'));
    expect((await album.list()).value.map((record) => record.id)).toEqual(['limited-3', 'limited-2']);

    const metadataRaw = window.localStorage.getItem(MGS1_VR_PHOTOSHOOT_METADATA_KEY) ?? '';
    expect(metadataRaw).not.toContain(WEBP_THUMBNAIL);
    const restored = createMgs1VrPhotoshootStorage({
      primaryAdapter: null,
      metadataStorage: window.localStorage,
      albumLimit: 2
    });
    const restoredList = await restored.list();
    expect(restoredList.value.map((record) => record.id)).toEqual(['limited-3', 'limited-2']);
    expect(restoredList.value.every((record) => record.thumbnail === '')).toBe(true);
    expect(restoredList.issues.map((issue) => issue.code)).toContain('thumbnail_unavailable');
  });

  it('uses the primary IndexedDB adapter and mirrors records into the fallback', async () => {
    const primary = new FakeIndexedDbAdapter();
    const album = createMgs1VrPhotoshootStorage({
      primaryAdapter: primary,
      metadataStorage: window.localStorage,
      idFactory: () => 'primary-photo'
    });

    const saved = await album.save(photo('naomi', '2026-07-16T12:00:00.000Z'));
    expect(saved.backend).toBe('indexeddb');
    expect(primary.records.has('primary-photo')).toBe(true);
    expect((await album.list()).value).toHaveLength(1);
    expect((await album.delete('primary-photo')).value).toBe(true);
    expect(primary.records.size).toBe(0);
  });

  it('falls back for the rest of the session when IndexedDB quota is exceeded', async () => {
    const primary = new FakeIndexedDbAdapter();
    const quotaError = new Error('No space left');
    quotaError.name = 'QuotaExceededError';
    primary.failPutWith = quotaError;
    const album = createMgs1VrPhotoshootStorage({
      primaryAdapter: primary,
      metadataStorage: window.localStorage,
      idFactory: () => 'quota-photo'
    });

    const saved = await album.save(photo('mei_ling', '2026-07-16T13:00:00.000Z'));
    expect(saved.backend).toBe('fallback');
    expect(saved.issues.map((issue) => issue.code)).toContain('quota_exceeded');
    const listed = await album.list();
    expect(listed.backend).toBe('fallback');
    expect(listed.value.map((record) => record.id)).toEqual(['quota-photo']);
  });

  it('rejects invalid records and oversized WebP thumbnails with typed errors', async () => {
    const album = createMgs1VrPhotoshootStorage({
      primaryAdapter: null,
      metadataStorage: null,
      maxThumbnailBytes: 8,
      idFactory: () => 'validation-photo'
    });
    const invalidSubject = { ...photo('naomi', '2026-07-16T14:00:00.000Z'), subject: 'snake' } as unknown as Mgs1VrPhotoshootSaveInput;
    await expect(album.save(invalidSubject)).rejects.toMatchObject({
      code: 'invalid_record',
      operation: 'save'
    } satisfies Partial<Mgs1VrPhotoshootStorageError>);

    const oversized = {
      ...photo('naomi', '2026-07-16T14:00:00.000Z'),
      thumbnail: `data:image/webp;base64,${'A'.repeat(32)}`
    };
    await expect(album.save(oversized)).rejects.toMatchObject({
      code: 'thumbnail_too_large',
      operation: 'save'
    } satisfies Partial<Mgs1VrPhotoshootStorageError>);
  });
});
