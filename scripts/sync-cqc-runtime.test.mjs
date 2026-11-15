// @vitest-environment node
import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { buildRuntimeManifest, syncRuntime, verifyRuntime } from './sync-cqc-runtime.mjs';

const fixtures = [];

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'cqc-runtime-test-'));
  fixtures.push(root);
  const source = path.join(root, 'source');
  const destination = path.join(root, 'public/cqc');
  const files = {
    'index.html': `<script>const modules={stories:'modules/story.html',atelier:'modules/atelier-v056.html'}</script>`,
    'modules/story.html': `<script src="../src/art.js"></script><script>const fight='fight.html'</script>`,
    'modules/fight.html': '<canvas></canvas>',
    'history/old/modules/fight.html': '<p>Duplicate unused historical copy</p>',
    'src/art.js': `const catalogue={viper:{file:'assets/illustrations-v056/originals/viper.png'},atlas:'atlas-00.webp'};`,
    'assets/illustrations-v056/originals/viper.png': Buffer.from([137, 80, 78, 71, 0, 1, 2]),
    'assets/portraits-v056/atlas-00.webp': Buffer.from('runtime atlas'),
    'assets/unused.png': Buffer.from('unused reference'),
    'modules/atelier-v056.html': '<a href="../docs/private-reference.json">Original production reference</a>',
    'src/chronicles-data-v056.js': 'window.CQC55_DATA={counts:{stories:354}}',
    'modules/chronicles-v056.html': '<canvas id="story"></canvas>',
    'modules/unified-versus-v055.html': '<canvas id="fight"></canvas>',
    'modules/arcade-chronicles-v055.html': '<canvas id="arcade"></canvas>',
    'docs/private-reference.json': '{"private":"excluded"}',
    'preparation/private.html': '<p>Work files</p>'
  };
  for (const [relative, contents] of Object.entries(files)) {
    const filename = path.join(source, relative);
    await mkdir(path.dirname(filename), { recursive: true });
    await writeFile(filename, contents);
  }
  return { source, destination };
}

afterEach(async () => {
  await Promise.all(fixtures.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe('local CQC runtime distribution', () => {
  it('preserves reachable PNG originals, dynamic atlas filenames and nested game routes, excluding work archives', async () => {
    const { source, destination } = await fixture();
    const manifest = await syncRuntime(source, destination);
    const names = manifest.files.map((entry) => entry.path);
    expect(names).toContain('assets/illustrations-v056/originals/viper.png');
    expect(names).toContain('assets/portraits-v056/atlas-00.webp');
    expect(names).toContain('modules/fight.html');
    expect(names).not.toContain('assets/unused.png');
    expect(names.some((name) => /^(?:history|preparation|docs)\//.test(name))).toBe(false);
    expect(await readFile(path.join(destination, 'assets/illustrations-v056/originals/viper.png')))
      .toEqual(await readFile(path.join(source, 'assets/illustrations-v056/originals/viper.png')));
    expect(await verifyRuntime(destination)).toEqual(manifest);
  });

  it('keeps the manifest deterministic and reports only the documented web workshop transformation', async () => {
    const { source } = await fixture();
    const first = await buildRuntimeManifest(source);
    const second = await buildRuntimeManifest(source);
    expect(first.manifest).toEqual(second.manifest);
    const transformations = first.manifest.files.filter((entry) => entry.transformation);
    expect(transformations.map((entry) => entry.path)).toEqual(['modules/atelier-v056.html']);
    expect(transformations[0].sourceSha256).not.toEqual(transformations[0].sha256);
    expect((await readFile(path.join(source, 'modules/atelier-v056.html'), 'utf8'))).toContain('private-reference.json');
  });

  it('refuses missing gameplay dependencies before replacing the previously verified runtime', async () => {
    const { source, destination } = await fixture();
    await syncRuntime(source, destination);
    const originalManifest = await readFile(path.join(destination, 'runtime-manifest.json'), 'utf8');
    await writeFile(path.join(source, 'index.html'), '<script src="src/missing.js"></script>');
    await expect(syncRuntime(source, destination)).rejects.toThrow('Unresolved runtime references');
    expect(await readFile(path.join(destination, 'runtime-manifest.json'), 'utf8')).toBe(originalManifest);
  });

  it('detects altered copied assets during verification', async () => {
    const { source, destination } = await fixture();
    await syncRuntime(source, destination);
    await writeFile(path.join(destination, 'assets/portraits-v056/atlas-00.webp'), 'changed');
    await expect(verifyRuntime(destination)).rejects.toThrow('CQC runtime changed');
  });

  it('rejects a missing bare asset filename while allowing a name used only for a save download', async () => {
    const { source } = await fixture();
    await writeFile(path.join(source, 'src/art.js'), `const save={download:'new-save.json'};const portrait={file:'missing-sprite.png'};`);
    await expect(buildRuntimeManifest(source)).rejects.toThrow('missing-sprite.png');
    await writeFile(path.join(source, 'src/art.js'), `const save={download:'new-save.json'};`);
    await expect(buildRuntimeManifest(source)).resolves.toBeTruthy();
  });

  it('keeps production-reference metadata out of the web payload without treating it as missing gameplay art', async () => {
    const { source } = await fixture();
    await writeFile(path.join(source, 'src/art.js'), `const stage={references:[{file:'preparation/canonical-stage-references/ref.jpg'}],layers:[{file:'assets/illustrations-v056/originals/viper.png'}]};`);
    const { manifest } = await buildRuntimeManifest(source);
    expect(manifest.omittedReferences).toContainEqual({from:'src/art.js',to:'preparation/canonical-stage-references/ref.jpg'});
    expect(manifest.files.some((entry) => entry.path.startsWith('preparation/'))).toBe(false);
    expect(manifest.files.some((entry) => entry.path === 'assets/illustrations-v056/originals/viper.png')).toBe(true);
  });
});
