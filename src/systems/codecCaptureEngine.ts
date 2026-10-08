function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getStylesheetText(): string {
  const chunks: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = Array.from(sheet.cssRules ?? []);
      chunks.push(rules.map((rule) => rule.cssText).join('\n'));
    } catch {
      // Cross-origin stylesheets are intentionally skipped.
    }
  }
  return chunks.join('\n');
}

async function renderElementToCanvas(element: HTMLElement, scale = 1): Promise<HTMLCanvasElement> {
  const rect = element.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width));
  const height = Math.max(1, Math.ceil(rect.height));
  const clone = element.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('[data-capture-exclude="true"]').forEach((node) => node.remove());
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${getStylesheetText()}</style>${serialized}</div></foreignObject></svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Unable to render Codec DOM snapshot.'));
    image.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D context unavailable.');
  context.scale(scale, scale);
  context.drawImage(image, 0, 0, width, height);
  URL.revokeObjectURL(url);
  return canvas;
}

export async function exportCodecPng(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await renderElementToCanvas(element, Math.min(window.devicePixelRatio || 1, 2));
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => result ? resolve(result) : reject(new Error('PNG export failed.')), 'image/png'));
  downloadBlob(blob, filename);
}

export function exportCodecJson(value: unknown, filename: string): void {
  downloadBlob(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }), filename);
}

export interface DomWebmRecorder {
  stop: () => Promise<Blob>;
  mimeType: string;
}

export async function startDomWebmRecording(element: HTMLElement, fps = 12): Promise<DomWebmRecorder> {
  if (typeof MediaRecorder === 'undefined') throw new Error('MediaRecorder is not supported by this browser.');
  const rect = element.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(rect.width));
  canvas.height = Math.max(1, Math.ceil(rect.height));
  const context = canvas.getContext('2d');
  if (!context || typeof canvas.captureStream !== 'function') throw new Error('Canvas captureStream is not supported.');

  const mimeCandidates = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
  const mimeType = mimeCandidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? '';
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
  recorder.start(500);

  let stopped = false;
  let rendering = false;
  const timer = window.setInterval(async () => {
    if (stopped || rendering) return;
    rendering = true;
    try {
      const frame = await renderElementToCanvas(element, 1);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    } catch {
      // Keep the previous frame if a DOM snapshot temporarily fails.
    } finally {
      rendering = false;
    }
  }, Math.max(80, Math.round(1000 / fps)));

  return {
    mimeType: recorder.mimeType || mimeType || 'video/webm',
    stop: async () => {
      stopped = true;
      window.clearInterval(timer);
      return await new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          resolve(new Blob(chunks, { type: recorder.mimeType || mimeType || 'video/webm' }));
        };
        recorder.stop();
      });
    }
  };
}

export function downloadCodecWebm(blob: Blob, filename: string): void {
  downloadBlob(blob, filename);
}
