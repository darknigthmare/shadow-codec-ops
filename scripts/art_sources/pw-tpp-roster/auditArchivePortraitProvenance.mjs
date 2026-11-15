import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const expressions = ['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch'];
const rootDefault = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const outputPath = 'scripts/art_sources/pw-tpp-roster/portraits/all-archive-portraits.provenance.json';
const sources = {
  coldman_pw: ['scripts/art_sources/pw-tpp-roster/peace-walker/coldman-portraits-openai.png', 'scripts/art_sources/pw-tpp-roster/peace-walker/coldman-portraits-prompts.json'],
  eli_mgsv: ['scripts/art_sources/pw-tpp-roster/portraits/eli-openai.png', 'scripts/art_sources/pw-tpp-roster/portraits/archive-portraits-prompts.json'],
  tretij_rebenok_mgsv: ['scripts/art_sources/pw-tpp-roster/portraits/tretij-rebenok-openai.png', 'scripts/art_sources/pw-tpp-roster/portraits/archive-portraits-prompts.json'],
  man_on_fire_mgsv: ['scripts/art_sources/pw-tpp-roster/tpp-man-on-fire-portraits.png', 'scripts/art_sources/pw-tpp-roster/tpp-man-on-fire-portraits.prompt.json'],
  ishmael_mgsv: ['scripts/art_sources/pw-tpp-roster/portraits/ishmael-openai.png', 'scripts/art_sources/pw-tpp-roster/portraits/archive-portraits-prompts.json'],
  mosquito_mgsv: ['scripts/art_sources/pw-tpp-roster/phantom-pain/mosquito-portraits-openai.png', 'scripts/art_sources/pw-tpp-roster/phantom-pain/mosquito-portraits.prompt.json'],
  paz_1984_mgsv: ['scripts/art_sources/pw-tpp-roster/tpp-paz-1984-portraits.png', 'scripts/art_sources/pw-tpp-roster/tpp-paz-1984-portraits.prompt.json']
};

function readProjectFile(root, relative) {
  const absolute = path.resolve(root, relative);
  const boundary = path.relative(root, absolute);
  if (path.isAbsolute(boundary) || boundary.startsWith('..') || relative.includes('\\')) throw new Error('Expected a portable repository-relative file: ' + relative);
  return fs.readFileSync(absolute);
}
function proof(root, relative, canonicalText = false) {
  const raw = readProjectFile(root, relative);
  const bytes = canonicalText ? Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'), 'utf8') : raw;
  return { path: relative, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length, ...(canonicalText ? { canonicalization: 'utf8-lf' } : {}) };
}
export function readWebpDimensions(buffer) {
  if (buffer.subarray(0, 4).toString('ascii') !== 'RIFF' || buffer.subarray(8, 12).toString('ascii') !== 'WEBP') throw new Error('Not a physical WebP image');
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const kind = buffer.subarray(offset, offset + 4).toString('ascii');
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (start + size > buffer.length) throw new Error('Truncated WebP chunk');
    if (kind === 'VP8X') return [1 + buffer.readUIntLE(start + 4, 3), 1 + buffer.readUIntLE(start + 7, 3)];
    if (kind === 'VP8 ') {
      if (!buffer.subarray(start + 3, start + 6).equals(Buffer.from([0x9d, 0x01, 0x2a]))) throw new Error('Invalid WebP keyframe');
      return [buffer.readUInt16LE(start + 6) & 0x3fff, buffer.readUInt16LE(start + 8) & 0x3fff];
    }
    if (kind === 'VP8L') { const bits = buffer.readUInt32LE(start + 1); return [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1]; }
    offset = start + size + (size % 2);
  }
  throw new Error('WebP image chunk missing');
}
export function buildArchivePortraitProvenance(root = rootDefault) {
  const sets = JSON.parse(readProjectFile(root, 'src/data/archivePortraitSets.json'));
  const ids = sets.map(set => set.characterId).sort();
  if (JSON.stringify(ids) !== JSON.stringify(Object.keys(sources).sort())) throw new Error('Expected the exact seven delivered archive portrait sets');
  const subjects = sets.map(set => {
    if (JSON.stringify(set.expressions) !== JSON.stringify(expressions)) throw new Error('Expression contract changed: ' + set.characterId);
    const [sourcePath, promptPath] = sources[set.characterId];
    const sourceBytes = readProjectFile(root, sourcePath);
    if (!sourceBytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw new Error('Expected PNG source: ' + sourcePath);
    const width = sourceBytes.readUInt32BE(16), height = sourceBytes.readUInt32BE(20);
    if (width !== 1536 || height !== 1024) throw new Error('Expected six512 source atlas: ' + sourcePath);
    const outputs = expressions.map(expression => {
      const relative = 'public' + set.basePath + '/' + expression + '.webp';
      const [width, height] = readWebpDimensions(readProjectFile(root, relative));
      if (width !== 512 || height !== 512) throw new Error('Expected 512 square WebP: ' + relative);
      return { ...proof(root, relative), width, height };
    });
    if (new Set(outputs.map(output => output.sha256)).size !== 6) throw new Error('Duplicate portrait expression: ' + set.characterId);
    return { characterId: set.characterId, source: { ...proof(root, sourcePath), width, height }, prompt: proof(root, promptPath, true), outputs };
  });
  return {
    version: 1,
    generator: 'OpenAI built-in imagegen; individual generation prompts and detailed review records accompany the source atlases',
    scope: 'Seven new PW/TPP archive portrait sets; archive dossiers, not seven new callable contacts',
    fidelity: 'Original reference-informed fan-made adaptation, not an assertion of exact 1:1 reproduction',
    expressions,
    importer: 'scripts/splitCodecPortraitSheet.py',
    command: 'node scripts/art_sources/pw-tpp-roster/auditArchivePortraitProvenance.mjs --check',
    subjects
  };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const serialized = JSON.stringify(buildArchivePortraitProvenance(), null, 2) + '\n';
  const physical = path.join(rootDefault, outputPath);
  if (process.argv.includes('--write')) {
    fs.writeFileSync(physical, serialized);
    console.log('Wrote seven portrait source/prompt proofs and 42 WebP proofs: ' + outputPath);
  } else {
    if (fs.readFileSync(physical, 'utf8').replace(/\r\n/g, '\n') !== serialized) throw new Error('Portrait proof is stale; inspect the source change before running --write');
    console.log('PASS: seven archive portrait sets / 42 WebP hashes and dimensions match reproducibly');
  }
}
