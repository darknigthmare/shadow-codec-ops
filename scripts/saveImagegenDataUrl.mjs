import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const outputPath = process.argv[2];
const inputPath = process.argv[3];

if (!outputPath) {
  throw new Error('Usage: node scripts/saveImagegenDataUrl.mjs <output-path>');
}

let input = inputPath ? await readFile(resolve(inputPath), 'utf8') : '';
process.stdin.setEncoding('utf8');

if (!inputPath && process.stdin.isTTY) {
  if (typeof process.stdin.setRawMode !== 'function') {
    throw new Error('Raw terminal input is not supported by this stdin stream.');
  }

  process.stdin.setRawMode(true);
  process.stdin.resume();

  input = await new Promise((resolveInput, rejectInput) => {
    let ttyInput = '';

    const cleanup = () => {
      process.stdin.off('data', onData);
      process.stdin.off('error', onError);
      process.stdin.setRawMode(false);
      process.stdin.pause();
    };
    const onError = (error) => {
      cleanup();
      rejectInput(error);
    };
    const onData = (chunk) => {
      const sentinel = '__END_IMAGE_DATA__';
      const endOfTransmissionIndex = chunk.indexOf('\u0004');
      const sentinelIndex = chunk.indexOf(sentinel);
      const endIndex = endOfTransmissionIndex === -1
        ? sentinelIndex
        : sentinelIndex === -1
          ? endOfTransmissionIndex
          : Math.min(endOfTransmissionIndex, sentinelIndex);
      if (endIndex === -1) {
        ttyInput += chunk;
        const bufferedSentinelIndex = ttyInput.indexOf(sentinel);
        if (bufferedSentinelIndex === -1) return;
        ttyInput = ttyInput.slice(0, bufferedSentinelIndex);
      } else {
        ttyInput += chunk.slice(0, endIndex);
      }
      cleanup();
      resolveInput(ttyInput);
    };

    process.stdin.on('data', onData);
    process.stdin.on('error', onError);
  });
} else if (!inputPath) {
  for await (const chunk of process.stdin) {
    input += chunk;
  }
}

const payload = input.trim().replace(/^data:image\/[^;]+;base64,/, '');
if (!payload) {
  throw new Error('No image data received on stdin.');
}

const resolvedPath = resolve(outputPath);
await mkdir(dirname(resolvedPath), { recursive: true });
await writeFile(resolvedPath, Buffer.from(payload, 'base64'));
console.log(`Saved ${resolvedPath}`);
