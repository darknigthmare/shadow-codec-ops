PASS9 browser and HTTP preparation
=================================

This folder contains isolated verification tools. Preparation has not opened a browser, contacted a deployment, published, or edited either app. The PASS8 runner, reports, source snapshot and PNGs remain unchanged. No full catalog or native PNG was copied here.

The four selected original Metal Gear 2 MSX2 incarnations are `core__runner_mg2`, `core__ninja_mg2`, `core__redblaster_mg2` and `core__jungle_evil`. The compact contracts pin 24 actor PNGs and 288 authored poses, eight documented source marks with six active typed points, and fourteen action/facing launch fixtures. The Black Color star adds one unchanged PNG with eight measured source poses. Artwork, timing and numerical combat are qualified Versus adaptations; absolute original-game fidelity is not certified.

`verify-pass9-browser.py` defaults to a plan. Future execution requires an explicit root READY message and these final inputs:

```text
python verify-pass9-browser.py --run-after-root-ready \
  --scope local-root-ready --base http://ROOT-READY-LOCALHOST \
  --label FRESH_LABEL \
  --manifest /ROOT/final-runtime-manifest.json --manifest-sha256 ROOT_SHA256 \
  --source-freeze /ROOT/actual43-freeze.json --source-freeze-sha256 ROOT_SHA256 \
  --catalog /ROOT/actual43-canonical.json --catalog-sha256 ROOT_SHA256
```

Production uses `--scope production --commit ROOT_APPROVED_40HEX` and the promoted production origin. A local run rejects `--commit` and records `expectedCommit: null`.

The source freeze must contain `confirmedByRoot: true`, `status: "frozen"`, `entryCount: 43`, and `files` records with absolute `path`, `bytes` and `sha256`. Optional `runtimePath` binds a source to the deployed graph; R-relative paths are inferred. It must pin the actual43 canonical JSON separately from the generated runtime JS, and all installed code and native star sources. The generated catalog JS is the actual published source; the large canonical JSON is not required as a published asset.

The final manifest must include these actual runtime paths:

```text
modules/unified-versus-v055.html
src/cqc-sprite-catalog.js
src/cqc-sprite-renderer.js
src/cqc-pass9-combat-fidelity.js
src/cqc-pass8-combat-engine.js
src/cqc-pass9-native-origins.js
src/cqc-pass8-layout.css
src/cqc-pass9-projectile-catalog.js
src/cqc-pass9-projectile-art.js
assets/combat-props/core__ninja_mg2/star-native-pass9.png
```

Before launching, the browser tool verifies the frozen source bytes, exact43 UID set, literal bytes of all39 old entries against the closed P8 guard, and the geometry/action/phase contract of the four new entries. It streams hashes without a catalog copy. It hashes the actual loaded code and 37 actor/prop PNGs per context, using the real Shadow nested iframe and direct CQC route at 1280×800 and390×844. It advances the genuine engine through 960 technique phases, 224 input/contact states, 56 typed source launches, eight native star spin fixtures and eight preserved Old Snake body/boot layout cases. KO fixtures explicitly use match rules and initial life1, followed by a real enemy contact; no synthetic KO or attack frame is assigned.

The native star observer captures the real `CQC_PASS9_PROJECTILE_ART.drawProjectile(c,q,zoom,owner)` dispatch and decoded `drawImage`. One projectile advances through real ages1,3,6,9,12,15,18,21 and all eight source rectangles, with fixed source-pixel scale18/219×zoom and measured pivots. It rejects Canvas fallback, local rotate calls and a parent velocity rotation: the native draw matrix must retain an identity linear part on both faces. Red Down must draw A source crouch8/9 without damage, travel, wire, trap or projectile. Red grenade events must produce fresh finite blast FX drawn by the real Canvas path; Black and Jungle must stay opaque, and Running Man must emit no gun or device.

Every run uses a fresh exclusive directory and owned browser session, rehashes all source pins after review, preserves failed attempts, and closes only its own browser. At most six screenshots are planned: four actual Red crouch states and two desktop real grenade explosions. All run evidence is bounded to8MiB. Reports distinguish source claims, gameplay adaptations and actual browser observations.

The independent future HTTP tool is under `http/`; its README defines the root READY/PROMOTED receipt, exact28 root-selected core pins and source-freeze requirements. It streams 258 combat sprite PNGs, the native star, 28 core sources and the manifest as288 exact GET checks, with HEAD for the rest of the graph. It stores no response payload.

Preparation validation is syntax parsing, plan-only execution and immutable source-pin checks. These are not deployed PASS9 test results. Run tools only after root supplies the final freeze, manifest, readiness target and, for production, the published commit.
