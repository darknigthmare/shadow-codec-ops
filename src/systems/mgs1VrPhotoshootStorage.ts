export const MGS1_VR_PHOTOSHOOT_ALBUM_LIMIT = 40;
export const MGS1_VR_PHOTOSHOOT_THUMBNAIL_MAX_BYTES = 768 * 1024;
export const MGS1_VR_PHOTOSHOOT_METADATA_KEY = 'mgs1_vr_photoshoot_album_v1';

const DATABASE_NAME = 'shadow-codec-ops-mgs1-vr';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'photoshoot-album';

export type Mgs1VrPhotoshootSubject = 'naomi' | 'mei_ling';

export interface Mgs1VrPhotoshootFraming {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export interface Mgs1VrPhotoshootRecord {
  id: string;
  subject: Mgs1VrPhotoshootSubject;
  score: number;
  capturedAt: string;
  /** A WebP data URL. It can be empty only when metadata was recovered after image storage was unavailable. */
  thumbnail: string;
  framing: Mgs1VrPhotoshootFraming;
  zoom: number;
}

export interface Mgs1VrPhotoshootSaveInput {
  id?: string;
  subject: Mgs1VrPhotoshootSubject;
  score: number;
  capturedAt?: string;
  thumbnail: string;
  framing: Mgs1VrPhotoshootFraming;
  zoom: number;
}

export type Mgs1VrPhotoshootStorageBackend = 'indexeddb' | 'fallback';
export type Mgs1VrPhotoshootStorageOperation = 'list' | 'save' | 'delete' | 'clear';
export type Mgs1VrPhotoshootStorageIssueCode =
  | 'indexeddb_unavailable'
  | 'quota_exceeded'
  | 'storage_failed'
  | 'metadata_failed'
  | 'thumbnail_unavailable';

export interface Mgs1VrPhotoshootStorageIssue {
  code: Mgs1VrPhotoshootStorageIssueCode;
  operation: Mgs1VrPhotoshootStorageOperation;
  message: string;
}

export interface Mgs1VrPhotoshootStorageResult<T> {
  value: T;
  backend: Mgs1VrPhotoshootStorageBackend;
  issues: Mgs1VrPhotoshootStorageIssue[];
}

export type Mgs1VrPhotoshootStorageErrorCode = 'invalid_record' | 'thumbnail_too_large';

export class Mgs1VrPhotoshootStorageError extends Error {
  readonly code: Mgs1VrPhotoshootStorageErrorCode;
  readonly operation: 'save' | 'delete';

  constructor(code: Mgs1VrPhotoshootStorageErrorCode, message: string, operation: 'save' | 'delete' = 'save') {
    super(message);
    this.name = 'Mgs1VrPhotoshootStorageError';
    this.code = code;
    this.operation = operation;
  }
}

/** Injectable persistence seam used by tests and non-browser shells. */
export interface Mgs1VrPhotoshootPersistenceAdapter {
  readonly kind: 'indexeddb';
  list(): Promise<Mgs1VrPhotoshootRecord[]>;
  put(record: Mgs1VrPhotoshootRecord): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}

type MetadataStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export interface Mgs1VrPhotoshootStorageOptions {
  /** `null` deliberately disables IndexedDB; `undefined` selects the browser default. */
  primaryAdapter?: Mgs1VrPhotoshootPersistenceAdapter | null;
  indexedDbFactory?: IDBFactory | null;
  metadataStorage?: MetadataStorage | null;
  metadataKey?: string;
  albumLimit?: number;
  maxThumbnailBytes?: number;
  now?: () => Date;
  idFactory?: () => string;
}

export interface Mgs1VrPhotoshootAlbumStorage {
  list(): Promise<Mgs1VrPhotoshootStorageResult<Mgs1VrPhotoshootRecord[]>>;
  save(input: Mgs1VrPhotoshootSaveInput): Promise<Mgs1VrPhotoshootStorageResult<Mgs1VrPhotoshootRecord>>;
  delete(id: string): Promise<Mgs1VrPhotoshootStorageResult<boolean>>;
  clear(): Promise<Mgs1VrPhotoshootStorageResult<void>>;
}

interface StoredMetadata extends Omit<Mgs1VrPhotoshootRecord, 'thumbnail'> {
  thumbnailAvailable: boolean;
}

interface MetadataEnvelope {
  schemaVersion: 1;
  records: StoredMetadata[];
}

class IndexedDbPhotoshootAdapter implements Mgs1VrPhotoshootPersistenceAdapter {
  readonly kind = 'indexeddb' as const;
  private databasePromise?: Promise<IDBDatabase>;

  constructor(private readonly factory: IDBFactory) {}

  async list(): Promise<Mgs1VrPhotoshootRecord[]> {
    return this.request('readonly', (store) => store.getAll(), (value) => value as Mgs1VrPhotoshootRecord[]);
  }

  async put(record: Mgs1VrPhotoshootRecord): Promise<void> {
    await this.request('readwrite', (store) => store.put(cloneRecord(record)), () => undefined);
  }

  async delete(id: string): Promise<void> {
    await this.request('readwrite', (store) => store.delete(id), () => undefined);
  }

  async clear(): Promise<void> {
    await this.request('readwrite', (store) => store.clear(), () => undefined);
  }

  private openDatabase(): Promise<IDBDatabase> {
    if (this.databasePromise) return this.databasePromise;
    this.databasePromise = new Promise((resolve, reject) => {
      let settled = false;
      const request = this.factory.open(DATABASE_NAME, DATABASE_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          const store = database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
          store.createIndex('capturedAt', 'capturedAt', { unique: false });
          store.createIndex('subject', 'subject', { unique: false });
        }
      };
      request.onsuccess = () => {
        if (settled) {
          request.result.close();
          return;
        }
        settled = true;
        request.result.onversionchange = () => request.result.close();
        resolve(request.result);
      };
      request.onerror = () => {
        if (settled) return;
        settled = true;
        reject(request.error ?? new Error('IndexedDB could not be opened.'));
      };
      request.onblocked = () => {
        if (settled) return;
        settled = true;
        reject(new Error('IndexedDB upgrade was blocked by another tab.'));
      };
    });
    this.databasePromise.catch(() => {
      this.databasePromise = undefined;
    });
    return this.databasePromise;
  }

  private async request<T>(
    mode: IDBTransactionMode,
    createRequest: (store: IDBObjectStore) => IDBRequest,
    mapResult: (value: unknown) => T
  ): Promise<T> {
    const database = await this.openDatabase();
    return new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(OBJECT_STORE_NAME, mode);
      const request = createRequest(transaction.objectStore(OBJECT_STORE_NAME));
      let value: unknown;
      request.onsuccess = () => {
        value = request.result;
      };
      transaction.oncomplete = () => resolve(mapResult(value));
      transaction.onerror = () => reject(transaction.error ?? request.error ?? new Error('IndexedDB transaction failed.'));
      transaction.onabort = () => reject(transaction.error ?? request.error ?? new Error('IndexedDB transaction was aborted.'));
    });
  }
}

class FallbackPhotoshootAdapter {
  private readonly records = new Map<string, Mgs1VrPhotoshootRecord>();
  private issues: Mgs1VrPhotoshootStorageIssue[] = [];

  constructor(
    private readonly storage: MetadataStorage | null,
    private readonly storageKey: string
  ) {
    this.hydrateMetadata();
  }

  async list(): Promise<Mgs1VrPhotoshootRecord[]> {
    const records = sortRecords([...this.records.values()]);
    if (records.some((record) => !record.thumbnail)) {
      this.addIssue('thumbnail_unavailable', 'list', 'One or more thumbnails could not be restored; album metadata is still available.');
    }
    return records.map(cloneRecord);
  }

  async put(record: Mgs1VrPhotoshootRecord): Promise<void> {
    this.records.set(record.id, cloneRecord(record));
    this.persistMetadata('save');
  }

  async delete(id: string): Promise<void> {
    this.records.delete(id);
    this.persistMetadata('delete');
  }

  async clear(): Promise<void> {
    this.records.clear();
    if (!this.storage) return;
    try {
      this.storage.removeItem(this.storageKey);
    } catch (error) {
      this.addMetadataIssue('clear', error);
    }
  }

  drainIssues(): Mgs1VrPhotoshootStorageIssue[] {
    const drained = this.issues;
    this.issues = [];
    return drained;
  }

  private hydrateMetadata(): void {
    if (!this.storage) return;
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return;
      const envelope = JSON.parse(raw) as Partial<MetadataEnvelope>;
      if (envelope.schemaVersion !== 1 || !Array.isArray(envelope.records)) return;
      envelope.records.forEach((candidate) => {
        if (!isStoredMetadata(candidate)) return;
        this.records.set(candidate.id, {
          id: candidate.id,
          subject: candidate.subject,
          score: candidate.score,
          capturedAt: candidate.capturedAt,
          thumbnail: '',
          framing: { ...candidate.framing },
          zoom: candidate.zoom
        });
      });
    } catch (error) {
      this.addMetadataIssue('list', error);
    }
  }

  private persistMetadata(operation: Mgs1VrPhotoshootStorageOperation): void {
    if (!this.storage) return;
    const envelope: MetadataEnvelope = {
      schemaVersion: 1,
      records: sortRecords([...this.records.values()]).map((record) => ({
        id: record.id,
        subject: record.subject,
        score: record.score,
        capturedAt: record.capturedAt,
        framing: { ...record.framing },
        zoom: record.zoom,
        thumbnailAvailable: Boolean(record.thumbnail)
      }))
    };
    try {
      this.storage.setItem(this.storageKey, JSON.stringify(envelope));
    } catch (error) {
      this.addMetadataIssue(operation, error);
    }
  }

  private addMetadataIssue(operation: Mgs1VrPhotoshootStorageOperation, error: unknown): void {
    this.addIssue(
      isQuotaError(error) ? 'quota_exceeded' : 'metadata_failed',
      operation,
      isQuotaError(error)
        ? 'Album metadata exceeded the local storage quota; the current session copy remains available.'
        : 'Album metadata could not be persisted locally; the current session copy remains available.'
    );
  }

  private addIssue(
    code: Mgs1VrPhotoshootStorageIssueCode,
    operation: Mgs1VrPhotoshootStorageOperation,
    message: string
  ): void {
    if (!this.issues.some((issue) => issue.code === code && issue.operation === operation)) {
      this.issues.push({ code, operation, message });
    }
  }
}

class PhotoshootAlbumStorage implements Mgs1VrPhotoshootAlbumStorage {
  private primary: Mgs1VrPhotoshootPersistenceAdapter | null;
  private readonly fallback: FallbackPhotoshootAdapter;
  private readonly albumLimit: number;
  private readonly maxThumbnailBytes: number;
  private readonly now: () => Date;
  private readonly idFactory: () => string;

  constructor(options: Mgs1VrPhotoshootStorageOptions) {
    this.albumLimit = normalizePositiveInteger(options.albumLimit, MGS1_VR_PHOTOSHOOT_ALBUM_LIMIT, 200);
    this.maxThumbnailBytes = normalizePositiveInteger(
      options.maxThumbnailBytes,
      MGS1_VR_PHOTOSHOOT_THUMBNAIL_MAX_BYTES,
      8 * 1024 * 1024
    );
    this.now = options.now ?? (() => new Date());
    this.idFactory = options.idFactory ?? createPhotoId;
    this.primary = resolvePrimaryAdapter(options);
    this.fallback = new FallbackPhotoshootAdapter(
      options.metadataStorage === undefined ? getDefaultMetadataStorage() : options.metadataStorage,
      options.metadataKey ?? MGS1_VR_PHOTOSHOOT_METADATA_KEY
    );
  }

  async list(): Promise<Mgs1VrPhotoshootStorageResult<Mgs1VrPhotoshootRecord[]>> {
    if (this.primary) {
      try {
        const records = await this.listWithLimit(this.primary);
        return { value: records, backend: 'indexeddb', issues: this.fallback.drainIssues() };
      } catch (error) {
        this.primary = null;
        const value = await this.listWithLimit(this.fallback);
        return {
          value,
          backend: 'fallback',
          issues: [createPrimaryIssue('list', error), ...this.fallback.drainIssues()]
        };
      }
    }
    const value = await this.listWithLimit(this.fallback);
    return { value, backend: 'fallback', issues: [createUnavailableIssue('list'), ...this.fallback.drainIssues()] };
  }

  async save(input: Mgs1VrPhotoshootSaveInput): Promise<Mgs1VrPhotoshootStorageResult<Mgs1VrPhotoshootRecord>> {
    const record = normalizeSaveInput(input, this.idFactory, this.now, this.maxThumbnailBytes);
    if (this.primary) {
      try {
        await this.upsertWithLimit(this.primary, record);
        await this.upsertWithLimit(this.fallback, record);
        return { value: cloneRecord(record), backend: 'indexeddb', issues: this.fallback.drainIssues() };
      } catch (error) {
        this.primary = null;
        await this.upsertWithLimit(this.fallback, record);
        return {
          value: cloneRecord(record),
          backend: 'fallback',
          issues: [createPrimaryIssue('save', error), ...this.fallback.drainIssues()]
        };
      }
    }
    await this.upsertWithLimit(this.fallback, record);
    return {
      value: cloneRecord(record),
      backend: 'fallback',
      issues: [createUnavailableIssue('save'), ...this.fallback.drainIssues()]
    };
  }

  async delete(id: string): Promise<Mgs1VrPhotoshootStorageResult<boolean>> {
    const normalizedId = normalizeId(id, 'delete');
    if (this.primary) {
      try {
        const existing = await this.primary.list();
        const deleted = existing.some((record) => record.id === normalizedId);
        await this.primary.delete(normalizedId);
        await this.fallback.delete(normalizedId);
        return { value: deleted, backend: 'indexeddb', issues: this.fallback.drainIssues() };
      } catch (error) {
        this.primary = null;
        const existing = await this.fallback.list();
        const deleted = existing.some((record) => record.id === normalizedId);
        await this.fallback.delete(normalizedId);
        return {
          value: deleted,
          backend: 'fallback',
          issues: [createPrimaryIssue('delete', error), ...this.fallback.drainIssues()]
        };
      }
    }
    const existing = await this.fallback.list();
    const deleted = existing.some((record) => record.id === normalizedId);
    await this.fallback.delete(normalizedId);
    return {
      value: deleted,
      backend: 'fallback',
      issues: [createUnavailableIssue('delete'), ...this.fallback.drainIssues()]
    };
  }

  async clear(): Promise<Mgs1VrPhotoshootStorageResult<void>> {
    if (this.primary) {
      try {
        await this.primary.clear();
        await this.fallback.clear();
        return { value: undefined, backend: 'indexeddb', issues: this.fallback.drainIssues() };
      } catch (error) {
        this.primary = null;
        await this.fallback.clear();
        return {
          value: undefined,
          backend: 'fallback',
          issues: [createPrimaryIssue('clear', error), ...this.fallback.drainIssues()]
        };
      }
    }
    await this.fallback.clear();
    return {
      value: undefined,
      backend: 'fallback',
      issues: [createUnavailableIssue('clear'), ...this.fallback.drainIssues()]
    };
  }

  private async listWithLimit(adapter: Pick<Mgs1VrPhotoshootPersistenceAdapter, 'list' | 'delete'>): Promise<Mgs1VrPhotoshootRecord[]> {
    const sorted = sortRecords(await adapter.list());
    const overflow = sorted.slice(this.albumLimit);
    await Promise.all(overflow.map((record) => adapter.delete(record.id)));
    return sorted.slice(0, this.albumLimit).map(cloneRecord);
  }

  private async upsertWithLimit(
    adapter: Pick<Mgs1VrPhotoshootPersistenceAdapter, 'list' | 'put' | 'delete'>,
    record: Mgs1VrPhotoshootRecord
  ): Promise<void> {
    const existing = await adapter.list();
    await adapter.put(record);
    const retained = sortRecords([record, ...existing.filter((candidate) => candidate.id !== record.id)]);
    await Promise.all(retained.slice(this.albumLimit).map((candidate) => adapter.delete(candidate.id)));
  }
}

export function createMgs1VrPhotoshootStorage(
  options: Mgs1VrPhotoshootStorageOptions = {}
): Mgs1VrPhotoshootAlbumStorage {
  return new PhotoshootAlbumStorage(options);
}

let defaultStorage: Mgs1VrPhotoshootAlbumStorage | undefined;

function getDefaultStorage(): Mgs1VrPhotoshootAlbumStorage {
  defaultStorage ??= createMgs1VrPhotoshootStorage();
  return defaultStorage;
}

export function listMgs1VrPhotoshootAlbum(): Promise<Mgs1VrPhotoshootStorageResult<Mgs1VrPhotoshootRecord[]>> {
  return getDefaultStorage().list();
}

export function saveMgs1VrPhotoshootPhoto(
  input: Mgs1VrPhotoshootSaveInput
): Promise<Mgs1VrPhotoshootStorageResult<Mgs1VrPhotoshootRecord>> {
  return getDefaultStorage().save(input);
}

export function deleteMgs1VrPhotoshootPhoto(id: string): Promise<Mgs1VrPhotoshootStorageResult<boolean>> {
  return getDefaultStorage().delete(id);
}

export function clearMgs1VrPhotoshootAlbum(): Promise<Mgs1VrPhotoshootStorageResult<void>> {
  return getDefaultStorage().clear();
}

function resolvePrimaryAdapter(options: Mgs1VrPhotoshootStorageOptions): Mgs1VrPhotoshootPersistenceAdapter | null {
  if (options.primaryAdapter !== undefined) return options.primaryAdapter;
  const factory = options.indexedDbFactory === undefined ? getDefaultIndexedDbFactory() : options.indexedDbFactory;
  return factory ? new IndexedDbPhotoshootAdapter(factory) : null;
}

function getDefaultIndexedDbFactory(): IDBFactory | null {
  try {
    return typeof globalThis.indexedDB === 'undefined' ? null : globalThis.indexedDB;
  } catch {
    return null;
  }
}

function getDefaultMetadataStorage(): MetadataStorage | null {
  try {
    return typeof globalThis.localStorage === 'undefined' ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}

function normalizeSaveInput(
  input: Mgs1VrPhotoshootSaveInput,
  idFactory: () => string,
  now: () => Date,
  maxThumbnailBytes: number
): Mgs1VrPhotoshootRecord {
  if (!input || (input.subject !== 'naomi' && input.subject !== 'mei_ling')) {
    throw new Mgs1VrPhotoshootStorageError('invalid_record', 'Photoshoot subject must be naomi or mei_ling.');
  }
  if (!Number.isFinite(input.score) || input.score < 0) {
    throw new Mgs1VrPhotoshootStorageError('invalid_record', 'Photoshoot score must be a finite non-negative number.');
  }
  if (!isValidFraming(input.framing)) {
    throw new Mgs1VrPhotoshootStorageError('invalid_record', 'Photoshoot framing must contain finite coordinates and positive dimensions.');
  }
  if (!Number.isFinite(input.zoom) || input.zoom <= 0 || input.zoom > 16) {
    throw new Mgs1VrPhotoshootStorageError('invalid_record', 'Photoshoot zoom must be greater than 0 and no greater than 16.');
  }
  if (!isWebpDataUrl(input.thumbnail)) {
    throw new Mgs1VrPhotoshootStorageError('invalid_record', 'Photoshoot thumbnail must be a WebP data URL.');
  }
  if (estimateDataUrlBytes(input.thumbnail) > maxThumbnailBytes) {
    throw new Mgs1VrPhotoshootStorageError(
      'thumbnail_too_large',
      `Photoshoot thumbnail exceeds the ${maxThumbnailBytes}-byte storage limit.`
    );
  }
  const capturedAt = input.capturedAt ?? now().toISOString();
  if (!Number.isFinite(Date.parse(capturedAt))) {
    throw new Mgs1VrPhotoshootStorageError('invalid_record', 'Photoshoot capturedAt must be a valid ISO date.');
  }
  return {
    id: normalizeId(input.id ?? idFactory(), 'save'),
    subject: input.subject,
    score: Math.round(input.score),
    capturedAt: new Date(capturedAt).toISOString(),
    thumbnail: input.thumbnail,
    framing: { ...input.framing },
    zoom: input.zoom
  };
}

function normalizeId(id: string, operation: 'save' | 'delete'): string {
  const normalized = typeof id === 'string' ? id.trim() : '';
  if (!normalized || normalized.length > 128) {
    throw new Mgs1VrPhotoshootStorageError(
      'invalid_record',
      'Photoshoot record id must contain 1 to 128 characters.',
      operation
    );
  }
  return normalized;
}

function isValidFraming(value: unknown): value is Mgs1VrPhotoshootFraming {
  if (!value || typeof value !== 'object') return false;
  const framing = value as Partial<Mgs1VrPhotoshootFraming>;
  return Number.isFinite(framing.centerX)
    && Number.isFinite(framing.centerY)
    && Number.isFinite(framing.width)
    && Number.isFinite(framing.height)
    && (framing.width ?? 0) > 0
    && (framing.height ?? 0) > 0;
}

function isStoredMetadata(value: unknown): value is StoredMetadata {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<StoredMetadata>;
  return typeof candidate.id === 'string'
    && candidate.id.length > 0
    && (candidate.subject === 'naomi' || candidate.subject === 'mei_ling')
    && typeof candidate.capturedAt === 'string'
    && Number.isFinite(Date.parse(candidate.capturedAt))
    && typeof candidate.score === 'number'
    && Number.isFinite(candidate.score)
    && isValidFraming(candidate.framing)
    && typeof candidate.zoom === 'number'
    && Number.isFinite(candidate.zoom)
    && candidate.zoom > 0;
}

function isWebpDataUrl(value: unknown): value is string {
  return typeof value === 'string' && /^data:image\/webp(?:;[^,]*)?,/i.test(value);
}

function estimateDataUrlBytes(value: string): number {
  const separator = value.indexOf(',');
  if (separator < 0) return value.length;
  const header = value.slice(0, separator);
  const payload = value.slice(separator + 1);
  if (/;base64/i.test(header)) {
    const padding = payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0;
    return Math.max(0, Math.floor(payload.length * 0.75) - padding);
  }
  try {
    return new TextEncoder().encode(decodeURIComponent(payload)).byteLength;
  } catch {
    return new TextEncoder().encode(payload).byteLength;
  }
}

function sortRecords(records: readonly Mgs1VrPhotoshootRecord[]): Mgs1VrPhotoshootRecord[] {
  return [...records].sort((a, b) => Date.parse(b.capturedAt) - Date.parse(a.capturedAt) || a.id.localeCompare(b.id));
}

function cloneRecord(record: Mgs1VrPhotoshootRecord): Mgs1VrPhotoshootRecord {
  return { ...record, framing: { ...record.framing } };
}

function normalizePositiveInteger(value: number | undefined, fallback: number, maximum: number): number {
  if (!Number.isFinite(value) || (value ?? 0) <= 0) return fallback;
  return Math.min(maximum, Math.max(1, Math.floor(value as number)));
}

function createPhotoId(): string {
  try {
    if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  } catch {
    // Fall through to the deterministic-enough browser/SSR fallback.
  }
  return `mgs1-vr-photo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function createUnavailableIssue(operation: Mgs1VrPhotoshootStorageOperation): Mgs1VrPhotoshootStorageIssue {
  return {
    code: 'indexeddb_unavailable',
    operation,
    message: 'IndexedDB is unavailable; the album is using memory with local metadata fallback.'
  };
}

function createPrimaryIssue(
  operation: Mgs1VrPhotoshootStorageOperation,
  error: unknown
): Mgs1VrPhotoshootStorageIssue {
  const quota = isQuotaError(error);
  return {
    code: quota ? 'quota_exceeded' : 'storage_failed',
    operation,
    message: quota
      ? 'IndexedDB quota was exceeded; the photo is available from the fallback for this session.'
      : 'IndexedDB failed; the album operation continued with the fallback store.'
  };
}

function isQuotaError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  return (error as { name?: unknown }).name === 'QuotaExceededError'
    || (error as { code?: unknown }).code === 22;
}
