# PASS8 local storage tools

These local tools preserve the existing runtime dependency graph and byte transformations. They do not change either repository, the generic sync script, `package.json`, Vite config, tests or the normal Vercel build. This delivery ran only small disposable fixtures. It has not synced or built either production project.

Root should review the source bytes, stop concurrent writes, then mark only PNG/WebP assets whose bytes will stay frozen. Schema `cqc.pass8.immutable-raster-pins/2` requires an explicit `format:'png'|'webp'` per file. Existing `cqc.pass8.immutable-png-pins/1` documents continue to work, and accept only PNGs. Raster links require an explicit pin, a regular file and ancestors, matching complete SHA-256 and length, actual format signature, and matching filesystem device. WebP validates `RIFF`/`WEBP`, the RIFF container length, a bounded first `VP8 `/`VP8L`/`VP8X` chunk and all following padded chunk boundaries. JS, JSON, HTML, other image formats and every unpinned image have independent copies. Never modify or chmod a linked raster inode in place. Replace a future image by writing a new file and renaming its pathname.

## 1. Record explicit frozen raster pins

`prepare-frozen-raster-pins.mjs` requires the invoking root's explicit freeze assertion and `--formats png,webp` for raster/2. It hashes only graph-reachable rasters for runtime scope, or all eligible public assets for public scope. It writes an exclusive new pin document outside the source tree and never edits sources. The old `prepare-frozen-png-pins.mjs` entry retains its PNG-only default and schema /1.

```sh
node /workspace/cqc-pass8-storage-tools/prepare-frozen-raster-pins.mjs \
  --source /workspace/cqc-game-working/cqc-versus-v056 \
  --scope runtime \
  --sync-module /workspace/shadow-codec-recovered/scripts/sync-cqc-runtime.mjs \
  --formats png,webp --source-state frozen --confirm-owner root \
  --output /workspace/cqc-pass8-storage-tools/runtime-pins.json
```

For build pins, run it after the reviewed runtime sync with `--source /workspace/shadow-codec-recovered/public --scope public --formats png,webp`, and a different new output filename. Partial manually reviewed raster pin sets are accepted too; assets without a pin are copied.

## 2. Plan runtime sync, review, execute

```sh
node /workspace/cqc-pass8-storage-tools/sync-frozen-runtime.mjs \
  --source /workspace/cqc-game-working/cqc-versus-v056 \
  --destination /workspace/shadow-codec-recovered/public/cqc \
  --sync-module /workspace/shadow-codec-recovered/scripts/sync-cqc-runtime.mjs \
  --pins /workspace/cqc-pass8-storage-tools/runtime-pins.json \
  --plan /workspace/cqc-pass8-storage-tools/runtime-plan.json
```

The default command writes only the exclusive plan document, which contains the exact official manifest, source module SHA, prior destination byte inventory and hardlink/copy counts. Review it and its printed SHA. Repeat the same command with `--execute --plan-sha256 THE_PRINTED_SHA` to execute that concrete plan. Existing plan, backup and evidence filenames are never overwritten.

The executor consumes the exact `buildRuntimeManifest` bytes, including both the save namespace and web workshop transforms. It guards every supplied reference/path, exact staged inventory and manifest, the old destination, frozen rasters and an unchanged source graph. It invokes the original `verifyRuntime` before and after promotion. Receipts identify every hardlink/copy inode, manifest path, previous inventory and preserved backup. PNG and WebP use distinct `immutable-png-hardlink` and `immutable-webp-hardlink` receipt modes.

## 3. Plan local build, review, execute

```sh
node /workspace/cqc-pass8-storage-tools/build-with-frozen-public.mjs \
  --project /workspace/shadow-codec-recovered \
  --destination /workspace/shadow-codec-recovered/dist \
  --pins /workspace/cqc-pass8-storage-tools/public-pins.json \
  --plan /workspace/cqc-pass8-storage-tools/build-plan.json
```

Repeat with `--execute --plan-sha256 THE_PRINTED_SHA` after review. The default executor runs the existing TypeScript `tsc -b` then the official Vite `build` API using the unchanged config with only a fresh temporary `outDir`, `emptyOutDir:true`, `copyPublicDir:false`, and an added staging plugin. `--skip-typecheck` is available when a separate, freshly recorded QA step already ran the compiler. No remote deployment is attempted.

The plugin's awaited `writeBundle` hook uses `order:'pre', sequential:true`. VitePWA generates the manifest in `generateBundle` and Workbox in `closeBundle`; the public assets are therefore already present for Workbox glob discovery. `publicDir` remains enabled, so existing `includeAssets` resolution is unchanged. Output/public collisions fail exclusive creation instead of silently overwriting generated code.

The plan hashes the complete public tree and project input tree (including src, scripts, package/lock/tsconfig files), excluding installed dependencies, `.git`, `.vercel`, public (separate full snapshot), dist/output stages, `*.tsbuildinfo`, and TypeScript's emitted root `vite.config.js/.d.ts`. Before `tsc`, existing generated files must have one link; its normal generated outputs may be updated in place. Inputs are rechecked after compiler and build. Installed dependencies and imports outside the project remain explicit root-frozen prerequisites; this does not snapshot `node_modules`.

The artifact verifier keeps every public byte/path and repeats the original PWA check's required fields/icons/shortcuts (including Builder and CQC), Workbox top-level runtime, CQC runtime caching, global precache exclusion and CQC manifest graph integrity. The unchanged `npm run pwa:check` can then run on the promoted `dist`. The small fixture also proves a JSON asset absent from `includeAssets` is discovered by Workbox, testing actual hook order.

## Promotion, recovery and disk limits

All output stages are fresh UUID directories. Only `project/dist` is accepted inside a project; other build outputs must be disjoint. Backup/evidence directories must be outside source, destination and staging trees, must be disjoint from each other, and have real directory ancestors. Defaults are sibling directories under this tools folder. Overrides use `--backup-root` and `--evidence-root`.

Promotion records a prepared immutable journal before moving anything. It renames the old directory to a retained backup, renames the verified stage into place, then validates the active destination within that transaction. Each rename is atomic, with a brief pathname gap between the two renames; this is not a single atomic exchange. A caught failure restores the old destination, preserves rejected new output or unactivated stage, and writes a separate failure record. A crash or process kill can leave the prepared journal unresolved; its `stage`, `destination`, `backup` and prior byte inventory give root concrete paths for reviewed recovery. No historical destination, failed stage or rejected new output is deleted.

Hardlinks require one filesystem. Cross-device links fail. There is no automatic copy fallback that might exhaust disk. Planning is read-only except its requested exclusive output file; it shows copy/link counts and logical byte totals. Frozen PNG/WebP save their full duplicate payload; independent text, other binaries and generated bundles still need room. Retained old assets and normal generated outputs still consume storage. These tools do not claim all builds fit any arbitrary disk budget.

At the read-only snapshot measured on October 2, S/public contains 578,524,054 PNG bytes, 210,152,426 WebP bytes, and 43,319,229 other bytes. Linking both raster formats avoids about 752 MiB of new raster payload per build; independent public copies still require about 41 MiB plus generated bundles. This is a current full-public estimate, not a promised cost for a later runtime graph. Full integrity checks hash the trees several times, causing several GiB of reads. The small ten-case fixture run took 2.60 seconds; production latency has not been measured.

Optional image generators are outside this wrapper's flow and must stay inactive while their linked source assets are frozen. Existing writers include `scripts/generate_mgs1_static_assets.py`, `normalizeSideOpsBackdrop.py`, `importDedicatedInteriorAtlas.py`, and `splitCodecPortraitSheet.py`. A future invocation must write new files and rename their pathnames. The unchanged package build does not call them.

## Fixture verification

```sh
node --test --test-isolation=none /workspace/cqc-pass8-storage-tools/storage-tools.test.mjs
```

The Node 24 fixture runner executes ten cases, including one small real Vite/PWA build using already installed official packages. All fixture writes stay in a newly created `fixture-run-*` directory here. It retains the small fixtures, receipts and `TEST_EVIDENCE.json`; it does not remove historical data. The production generic sync, Vite config and package bytes are pinned before and rechecked after the run. Independent review has separate evidence under `/workspace/cqc-pass8-storage-tools-independent-review`.

Successful complete raster/2 run: `fixture-run-dZTvdM/TEST_EVIDENCE.json` (10/10), including real WebP links and CLI plan/SHA checks. Earlier complete PNG-only run `fixture-run-6m19KV/TEST_EVIDENCE.json` passed 8/8; incomplete disposable runs remain available and are not claimed as successful.
