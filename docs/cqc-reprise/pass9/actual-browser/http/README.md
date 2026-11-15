PASS9 HTTP preparation only
===========================

`verify-pass9-http.py` defaults to preparation and prints its plan to stdout. `--plan-only` does the same. These modes perform no HTTP request, browser action, publication, build, payload copy or R/S write. The closed PASS8 verifier and manifest are read-only guarded by their existing SHA256 pins. No final core-path list is invented here.

Future execution is ROOT-owned. It requires a real production READY/PROMOTED deployment for the exact source commit, a completed ROOT actual43 source freeze, and all inputs pinned before any request. The only explicit run switch is `--run-after-root-ready`. Preserve the normal proxy/CA environment and verified TLS; request network access through the normal tool permission mechanism. The script refuses redirects.

```text
python verify-pass9-http.py --run-after-root-ready \
  --base https://ROOT-READY-ORIGIN \
  --commit40 ROOT_APPROVED_40HEX --label FRESH_LOWERCASE_LABEL \
  --manifest /ROOT/final-runtime-manifest.json --manifest-sha256 ROOT_SHA256 \
  --core-pins /ROOT/core-pins.json --core-pins-sha256 ROOT_SHA256 \
  --source-freeze /ROOT/actual43-freeze.json --source-freeze-sha256 ROOT_SHA256 \
  --root-ready /ROOT/http-root-ready.json --root-ready-sha256 ROOT_SHA256
```

The future manifest has a `files` list of unique normalized relative `{path,bytes,sha256}` records and `totalBytes` equal to their sum. It must have exactly 258 `.png` paths under `assets/combat-sprites/`, plus `assets/combat-props/core__ninja_mg2/star-native-pass9.png`. `runtime-manifest.json` is an additional exact GET and must not be listed as its own graph edge.

The future small `--core-pins` JSON has a `files` list of exactly 28 ROOT-selected `{path,bytes,sha256}` records. They must match the final manifest and be distinct from the sprite PNGs, native star and manifest. No 50MB-or-larger local canonical JSON can be selected as a core GET.

The future source freeze must have `confirmedByRoot: true`, `status: "frozen"`, `entryCount: 43`, and a nonempty `files` list of absolute local `{path,bytes,sha256}` records. Optional `runtimePath` binds a local file to the manifest; paths under `/workspace/cqc-game-working/cqc-versus-v056` can be inferred. Every frozen source file is streamed locally and verified without copying it. The actual43 generated `src/cqc-sprite-catalog.js` must be linked to the manifest. The local canonical JSON can be source-frozen without any assertion that it is published.

The future READY JSON schema is `cqc-pass9-http-root-ready/v1`. Required fields are `status: "READY"`, `confirmedByRoot: true`, `entryCount: 43`, `baseUrl`, `commit40`, and `canonical53MPublicationClaimMade: false`. `tool`, `manifest`, `corePins` and `sourceFreeze` each contain the final `bytes` and `sha256` of that input. `deployment` contains `id: "dpl_…"`, `readyState: "READY"`, `readySubstate: "PROMOTED"`, `target: "production"` and `gitSha` equal to `commit40`. Preparation creates none of these production facts.

The future plan has exactly 288 streamed GET checks: 258 native sprite PNGs, one native star, 28 ROOT core paths and one manifest. The rest of the manifest graph uses HEAD. GET checks verify HTTP 200, exact byte count and SHA256, with declared Content-Length checked when present. HEAD checks verify HTTP 200 and Content-Length when present; missing length is explicitly qualified and never treated as a payload hash. Maximum concurrency is 10 and each request timeout is 45 seconds. Response bodies are never saved. All input/tool/frozen-source pins are checked again afterward.

Reports are compact JSON written exclusively to a fresh strict label in this directory; existing labels cannot be overwritten. Total isolated HTTP tool/preparation/report scope is bounded to 1 MiB. Report status, edge byte/SHA results and pin drift remain distinct from browser behavior, exact43 semantic review and fidelity. No claim is made that the large local canonical source JSON is published.

This preparation is validated only by AST parsing and plan-only execution. It has made no request and has no deployed PASS9 result.
