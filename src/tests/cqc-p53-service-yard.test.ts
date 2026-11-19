// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';

const modulePath = fileURLToPath(new URL('../../public/cqc/src/cqc-p53-service-yard.js', import.meta.url));
const source = readFileSync(modulePath, 'utf8');
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const stageIds = [
  'p53_null_power_yard',
  'p53_null_switchgear_hall',
  'p53_null_signals_room',
  'p53_big_shell_strut_c_dining',
  'p53_big_shell_strut_f_warehouse'
];

type Stage = { id: string; props: string[] };
type ImageRecord = { file: string; naturalWidth: number; naturalHeight: number };
type DrawCall = { image: ImageRecord; args: number[] };
type DrawOptions = { camera?: number; zoom?: number; motion?: boolean };
type StageAPI = {
  stages: Stage[];
  owns(stage: Pick<Stage, 'id'>): boolean;
  status(stage: Pick<Stage, 'id'>): { state: string; authored?: boolean; approved?: boolean };
  preload(stage: Pick<Stage, 'id'>, options?: { retry?: boolean }): Promise<boolean>;
  drawBackground(ctx: ReturnType<typeof canvas>, stage: Pick<Stage, 'id'>, options?: DrawOptions): boolean;
  drawForeground(ctx: ReturnType<typeof canvas>, stage: Pick<Stage, 'id'>, options?: DrawOptions): boolean;
};

function canvas() {
  return {
    calls: [] as DrawCall[],
    depth: 0,
    imageSmoothingEnabled: true,
    save() { this.depth++; },
    restore() { this.depth--; },
    drawImage(image: ImageRecord, ...args: number[]) { this.calls.push({ image, args }); }
  };
}

function harness() {
  const failures = new Set<string>();
  const emptyImages = new Set<string>();
  const requests: string[] = [];
  class TestImage {
    naturalWidth = 0;
    naturalHeight = 0;
    file = '';
    onload = () => {};
    onerror = () => {};
    set src(value: string) {
      const filename = fileURLToPath(value);
      this.file = filename.slice(filename.lastIndexOf('/') + 1);
      requests.push(this.file);
      queueMicrotask(() => {
        if (failures.has(this.file)) { this.onerror(); return; }
        let bytes: Buffer;
        try { bytes = readFileSync(filename); } catch { this.onerror(); return; }
        if (!bytes.subarray(0, 8).equals(pngSignature) || bytes.length < 24) { this.onerror(); return; }
        if (!emptyImages.has(this.file)) {
          this.naturalWidth = bytes.readUInt32BE(16);
          this.naturalHeight = bytes.readUInt32BE(20);
        }
        this.onload();
      });
    }
  }
  const context = {
    window: {} as { CQC_SERVICE_YARD: StageAPI },
    document: { currentScript: { src: pathToFileURL(modulePath).href } },
    Image: TestImage,
    URL
  };
  runInNewContext(source, context, { filename: modulePath });
  return { api: context.window.CQC_SERVICE_YARD, failures, emptyImages, requests };
}

describe('P53 authored Versus arenas', () => {
  it('loads all five scenes from their real PNG files, sharing repeated scenery requests', async () => {
    const { api, requests } = harness();
    expect(Array.from(api.stages, stage => stage.id)).toEqual(stageIds);
    for (const stage of api.stages) {
      expect(api.owns(stage)).toBe(true);
      expect(api.status(stage)).toMatchObject({ authored: true, approved: false });
      const loading = api.preload(stage);
      expect(api.preload(stage)).toBe(loading);
      expect(api.preload(stage, { retry: true })).toBe(loading);
      await expect(loading).resolves.toBe(true);
      expect(api.status(stage).state).toBe('ready');
    }
    expect(requests.length).toBe(new Set(requests).size);
    const requestedCount = requests.length;
    for (const stage of api.stages) await expect(api.preload(stage)).resolves.toBe(true);
    expect(requests).toHaveLength(requestedCount);
  });

  it('retries only failed files and keeps a scene unavailable until its last image is ready', async () => {
    const { api, failures, requests } = harness();
    const stage = api.stages[4];
    failures.add('strut-f-storage-crate.png');
    const ctx = canvas();
    expect(api.status(stage).state).toBe('unloaded');
    expect(api.drawBackground(ctx, stage)).toBe(false);
    const loading = api.preload(stage);
    expect(api.status(stage).state).toBe('loading');
    await expect(loading).resolves.toBe(false);
    expect(api.status(stage).state).toBe('error');
    expect(api.drawBackground(ctx, stage)).toBe(false);
    expect(api.drawForeground(ctx, stage)).toBe(false);
    expect(ctx.calls).toHaveLength(0);
    failures.delete('strut-f-storage-crate.png');
    const beforeRetry = requests.length;
    await expect(api.preload(stage)).resolves.toBe(false);
    expect(requests).toHaveLength(beforeRetry);
    await expect(api.preload(stage, { retry: true })).resolves.toBe(true);
    expect(requests.slice(beforeRetry)).toEqual(['strut-f-storage-crate.png']);
    expect(api.status(stage).state).toBe('ready');
  });

  it('does not retain a failed preload after a shared prop recovers in another room', async () => {
    const { api, failures } = harness();
    const yard = api.stages[0], hall = api.stages[1];
    failures.add('touret.png');
    await expect(api.preload(yard)).resolves.toBe(false);
    expect(api.status(yard).state).toBe('error');
    failures.delete('touret.png');
    await expect(api.preload(hall, { retry: true })).resolves.toBe(true);
    expect(api.status(yard).state).toBe('ready');
    await expect(api.preload(yard)).resolves.toBe(true);
  });

  it('rejects a load event with zero image dimensions and can recover it', async () => {
    const { api, emptyImages } = harness();
    const stage = api.stages[4];
    emptyImages.add('strut-f-warehouse.png');
    await expect(api.preload(stage)).resolves.toBe(false);
    expect(api.status(stage).state).toBe('error');
    emptyImages.clear();
    await expect(api.preload(stage, { retry: true })).resolves.toBe(true);
  });

  it.each(stageIds)('renders %s with valid crops and full viewport coverage at every camera extreme', async id => {
    const { api } = harness();
    const stage = api.stages.find(item => item.id === id)!;
    await expect(api.preload(stage)).resolves.toBe(true);
    for (const camera of [-220, 0, 220]) for (const zoom of [0.76, 1, 1.15]) {
      const ctx = canvas();
      expect(api.drawBackground(ctx, stage, { camera, zoom })).toBe(true);
      expect(api.drawForeground(ctx, stage, { camera, zoom })).toBe(true);
      expect(ctx.calls).toHaveLength(1 + stage.props.length);
      expect(ctx.depth).toBe(0);
      const [x, y, width, height] = ctx.calls[0].args;
      expect(x).toBeLessThanOrEqual(0);
      expect(x + width).toBeGreaterThanOrEqual(1280);
      expect(y).toBeLessThanOrEqual(0);
      expect(y + height).toBeGreaterThanOrEqual(720);
      const drawnProps = ctx.calls.slice(1).map(call => call.image.file.replace(/\.png$/, '')).sort();
      expect(drawnProps).toEqual(Array.from(stage.props).sort());
      for (const { image, args } of ctx.calls) {
        expect(args.every(Number.isFinite)).toBe(true);
        const [destinationWidth, destinationHeight] = args.slice(-2);
        expect(destinationWidth).toBeGreaterThan(0);
        expect(destinationHeight).toBeGreaterThan(0);
        let sourceWidth = image.naturalWidth, sourceHeight = image.naturalHeight;
        if (args.length === 8) {
          const [left, top, width, height] = args;
          expect(left).toBeGreaterThanOrEqual(0);
          expect(top).toBeGreaterThanOrEqual(0);
          expect(left + width).toBeLessThanOrEqual(image.naturalWidth);
          expect(top + height).toBeLessThanOrEqual(image.naturalHeight);
          sourceWidth = width; sourceHeight = height;
        }
        expect(destinationWidth / destinationHeight).toBeCloseTo(sourceWidth / sourceHeight, 10);
      }
    }
  });

  it('keeps both scenery planes still when reduced motion is selected', async () => {
    const { api } = harness();
    for (const stage of api.stages) {
      await api.preload(stage);
      const center = canvas(), moved = canvas();
      for (const render of [api.drawBackground, api.drawForeground]) {
        render(center, stage, { camera: 0, zoom: 1.15, motion: false });
        render(moved, stage, { camera: 220, zoom: 1.15, motion: false });
      }
      expect(moved.calls).toEqual(center.calls);
    }
  });

  it('places the new Strut F equipment behind the fighters with the central lane clear', async () => {
    const { api } = harness();
    const stage = api.stages[4], rear = canvas(), front = canvas();
    await expect(api.preload(stage)).resolves.toBe(true);
    api.drawBackground(rear, stage);
    api.drawForeground(front, stage);
    const jack = rear.calls.find(call => call.image.file === 'strut-f-pallet-jack.png')!;
    const lamp = rear.calls.find(call => call.image.file === 'strut-f-service-lamp.png')!;
    expect(jack).toBeDefined();
    expect(lamp).toBeDefined();
    const [jackX, jackY, jackW, jackH] = jack.args.slice(-4);
    const [lampX, lampY, lampW, lampH] = lamp.args.slice(-4);
    expect(jackX).toBeGreaterThanOrEqual(0);
    expect(jackX + jackW).toBeLessThan(360);
    expect(lampX).toBeGreaterThan(920);
    expect(lampX + lampW).toBeLessThanOrEqual(1280);
    expect(jackY + jackH).toBeLessThan(568);
    expect(lampY + lampH).toBeLessThan(568);
    expect(jackH).toBeGreaterThanOrEqual(75);
    expect(jackH).toBeLessThanOrEqual(95);
    expect(lampH).toBeGreaterThanOrEqual(105);
    expect(lampH).toBeLessThanOrEqual(120);
    expect(front.calls.every(call => call.image.file === 'strut-f-railing.png')).toBe(true);
  });

  it('rejects an unknown stage without loading or drawing anything', async () => {
    const { api, requests } = harness();
    const unknown = { id: 'not-a-p53-stage' }, ctx = canvas();
    expect(api.owns(unknown)).toBe(false);
    expect(api.status(unknown).state).toBe('unknown');
    await expect(api.preload(unknown)).resolves.toBe(false);
    expect(api.drawBackground(ctx, unknown)).toBe(false);
    expect(api.drawForeground(ctx, unknown)).toBe(false);
    expect(requests).toHaveLength(0);
    expect(ctx.calls).toHaveLength(0);
  });
});
