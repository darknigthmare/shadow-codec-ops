import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { parseArgs, overlaps, assertRealAncestors, inventory, regularPath, fingerprint, assertRasterSignature, rasterFormat, digest, writeExclusiveJson } from './common.mjs';

// This command records an explicit owner assertion. It does not infer that an
// image is immutable merely because a .png file exists or its hash is readable.
const args = parseArgs(process.argv.slice(2));
if (!args.source || !args.output || !['runtime', 'public'].includes(args.scope)
  || args['source-state'] !== 'frozen' || args['confirm-owner'] !== 'root') {
  throw new Error('Required: --source --output --scope runtime|public --source-state frozen --confirm-owner root; runtime also requires --sync-module. Freeze these PNG source bytes before invoking.');
}
const sourceRoot = path.resolve(args.source), output = path.resolve(args.output);
const formats = args.formats ?? 'png';
if (!['png', 'png,webp'].includes(formats)) throw new Error('Supported explicit formats: --formats png or --formats png,webp.');
const rasterV2 = formats === 'png,webp';
if (overlaps(sourceRoot, output)) throw new Error('PNG pin output must be outside its source tree.');
await assertRealAncestors(sourceRoot); await assertRealAncestors(path.dirname(output));
let entries, graphModuleSha256 = null;
if (args.scope === 'runtime') {
  if (!args['sync-module']) throw new Error('Runtime scope requires --sync-module from the existing Shadow script.');
  const moduleFile = path.resolve(args['sync-module']);
  graphModuleSha256 = digest(await readFile(moduleFile));
  const { buildRuntimeManifest } = await import(pathToFileURL(moduleFile).href);
  entries = (await buildRuntimeManifest(sourceRoot)).manifest.files;
} else {
  entries = await inventory(sourceRoot);
  if (!entries) throw new Error('Public source directory missing.');
}
const files = [];
for (const row of entries.filter((row) => ['.png', ...(rasterV2 ? ['.webp'] : [])].includes(path.extname(row.path).toLowerCase()))) {
  if (row.transformation) throw new Error('Transformed raster bytes cannot be frozen as a source link.');
  const file = await regularPath(sourceRoot, row.path), current = await fingerprint(file);
  if (current.bytes !== row.bytes || current.sha256 !== row.sha256) throw new Error(`Raster source changed: ${row.path}`);
  const format = rasterFormat(row.path); assertRasterSignature(await readFile(file), format, row.path);
  files.push({ path: row.path, ...(rasterV2 ? { format } : {}), bytes: current.bytes, sha256: current.sha256, immutable: true });
}
const pins = { schema: rasterV2 ? 'cqc.pass8.immutable-raster-pins/2' : 'cqc.pass8.immutable-png-pins/1', sourceRoot, sourceState: 'frozen', confirmedByRoot: true, scope: args.scope, graphModuleSha256, freezeAssertion: 'The invoking root confirmed all listed source raster bytes stay immutable throughout link staging, validation and every linked destination lifetime. Future replacements must use new files/renames, never in-place pixel writes or chmod on shared inodes.', files };
await writeExclusiveJson(output, pins);
console.log(JSON.stringify({ status: 'pins-recorded-source-not-written', schema: pins.schema, output, sha256: digest(await readFile(output)), rasterFiles: files.length, pngFiles: files.filter((row) => row.path.toLowerCase().endsWith('.png')).length, webpFiles: files.filter((row) => row.path.toLowerCase().endsWith('.webp')).length, linkedBytes: files.reduce((sum, row) => sum + row.bytes, 0) }));
