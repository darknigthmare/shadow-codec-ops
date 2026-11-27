#!/usr/bin/env python3
"""Targeted P74 canonical Atlas verification; no network, rendering or corpus mutation."""
import hashlib
import json
import re
import shutil
import subprocess
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[4]
LOT = ROOT / "docs/cqc-reprise/pass74/canonical"
ATLAS = ROOT / "public/cqc/data/cqc-p63-source-atlas.json"
checks = []

def read(path):
    return json.loads(path.read_text())

def check(value, label):
    if not value:
        raise AssertionError(label)
    checks.append(label)

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()

atlas = read(ATLAS)
baseline = read(LOT / "atlas-integration-baseline.json")
sources = read(LOT / "source-records.json")["assets"]
manifest = read(LOT / "manifest.json")
delta = read(LOT / "coverage-delta.json")
old_delta = read(ROOT / "docs/cqc-reprise/pass72/coverage-delta.json")
old_delivery = read(ROOT / "docs/cqc-reprise/pass72/delivery-manifest.json")

check(len(atlas["assets"]) == 109, "Atlas contains 109 records")
check(len(sources) == 3 == manifest["counts"]["selected"], "Exactly three selected P74 canonical records")
check(len({a["id"] for a in atlas["assets"]}) == len(atlas["assets"]), "Atlas identities are unique")
check(hashlib.sha256(canonical(atlas["assets"][:106])).hexdigest() == baseline["previousAtlasAssetsSha256"], "All 106 previous records retain their exact semantic data and order")
check([a["id"] for a in atlas["assets"][-3:]] == baseline["selectedNewIds"], "The three appended records retain the reviewed identities and order")
check(atlas["sourcePass"].endswith("+P74"), "Atlas pass metadata includes P74")

new_ids = {a["id"] for a in sources}
new_rows = [a for a in atlas["assets"] if a["id"] in new_ids]
by_id = {a["id"]: a for a in new_rows}
for source in sources:
    item = by_id[source["id"]]
    image = (ATLAS.parent / item["path"]).resolve()
    check(image.is_relative_to(ROOT) and image == (ROOT / source["path"]).resolve(), source["id"] + ": Atlas image resolves to its reviewed file")
    check(image.is_file() and sha(image) == source["sha256"], source["id"] + ": PNG SHA256 matches")
    check(image.stat().st_size == source["bytes"], source["id"] + ": PNG byte count matches")
    check(item["atlasIntegrated"] is True and source["atlasIntegrated"] is True, source["id"] + ": documentary Atlas integration is explicit")
    for flag in ["runtimeIntegrated", "combatReady", "combatRuntimeIntegrated", "absolute1to1Certified", "referenceGeometryValidated", "nativePixelExact", "nativeUhd", "scopeClosed"]:
        check(item[flag] is False and source[flag] is False, source["id"] + ": " + flag + " stays false")
    check(item["fidelityStatus"] == "pending_external_review", source["id"] + ": candidate status is preserved")
    check(item["workIds"] == source["workIds"], source["id"] + ": workId association is unchanged")
    prompt = ROOT / source["generation"]["promptFile"]
    check(prompt.read_text().rstrip("\n") == source["generation"]["exactPrompt"].rstrip("\n"), source["id"] + ": exact prompt matches file")
    for ref in source["referenceMetadata"]:
        path = ROOT / ref["path"]
        check(path.is_file() and sha(path) == ref["sha256"], source["id"] + ": reference verified " + path.name)
    for field in ["bibleURL", "blobURL"]:
        url = urlsplit(item[field])
        prefix = "/darknigthmare/shadow-codec-ops/blob/" + manifest["branch"] + "/"
        check(url.scheme == "https" and url.netloc == "github.com" and url.path.startswith(prefix), source["id"] + ": " + field + " uses the target repository branch")
        target = ROOT / url.path.removeprefix(prefix)
        check(target.is_file(), source["id"] + ": " + field + " local target exists")
        if url.fragment:
            check('id="' + url.fragment + '"' in target.read_text(), source["id"] + ": documentation anchor exists")

check(by_id["mgs3-kgb-aiming-portrait"]["workIds"] == ["character:R-MGS3-kgb"], "Original KGB model is associated only with its MGS3 historical group")
check(by_id["mgs3-kgb-aiming-portrait"]["bodyCoverage"] == "portrait", "KGB source does not claim a full body")
check(by_id["mgr-khamsin-cockpit-portrait"]["bodyCoverage"] == "portrait", "Khamsin source does not claim a full body or machine")
check(by_id["mgr-khamsin-cockpit-portrait"]["rosterUids"] == ["core__khamsin"], "Khamsin view retains its existing roster UID")
check(by_id["mgr-hebidamashii"]["kind"] == "prop", "Hebidamashii remains an accessory")
check(not any("mgs4-misidentified-johnny" in a["id"] or "quarantine/" in a["path"] for a in atlas["assets"]), "Quarantined identity contributes no Atlas record")

uncovered = set(old_delta["historicalRowsStillWithoutSelectedCandidate"])
new_work = {w for a in sources for w in a["workIds"]}
covered = sorted(uncovered & new_work)
check(covered == ["character:R-MGS3-kgb"] == delta["newlyCoveredHistoricalRows"], "Exactly one historical row receives its first partial candidate")
check(delta["beforeWithoutSelectedCandidate"] == len(uncovered) == 73 and delta["afterWithoutSelectedCandidate"] == len(uncovered - new_work) == 72, "Historical no-candidate count changes from 73 to 72")
check(delta["selectedSourcesBefore"] == old_delivery["counts"]["totalSelected"] == 283 and delta["selectedSourcesAfter"] == 283 + len(sources) == 286, "Selected canonical sources change from 283 to 286")
check(delta["historicalRows"] == old_delta["historicalRows"] == 277 and delta["historicalUnmatchedRows"] == old_delta["historicalUnmatchedRows"] == 97, "Historical inventory sizes remain 277 rows and 97 unresolved statuses")
check(delta["p61StatusesChanged"] is False and delta["closedScopes"] == 0, "No historical status is changed and no scope is closed")
check(manifest["counts"]["fullBodySelected"] == 0 and manifest["counts"]["combatAdmissions"] == 0 and manifest["counts"]["oneToOneCertifications"] == 0, "No full-body, combat or 1:1 completion is claimed")

readme = LOT / "README.md"
for link in re.findall(r"\]\(([^)]+)\)", readme.read_text()):
    if link.startswith(("https://", "http://", "#")):
        continue
    check((readme.parent / link.split("#", 1)[0]).resolve().is_file(), "README local link exists: " + link)

node = shutil.which("node")
check(bool(node), "Node is available for the actual Atlas normalizer")
js = """
const fs = require('node:fs');
const vm = require('node:vm');
const context = {module:{exports:{}}, URL, URLSearchParams};
vm.runInNewContext(fs.readFileSync(process.argv[1], 'utf8'), context, {filename:process.argv[1]});
const api = context.module.exports;
const catalog = require(process.argv[2]);
const rows = api.normalizeCatalog(catalog);
const ids = new Set(JSON.parse(process.argv[3]));
const selected = rows.filter(a => ids.has(a.id));
const kgb = api.filterAssets(rows, {episode:'mgs3',kind:'character',query:'character:R-MGS3-kgb'});
console.log(JSON.stringify({count:rows.length, selected:selected.map(a=>a.id), kgb:kgb.map(a=>a.id)}));
"""
runtime = json.loads(subprocess.check_output([node, "-e", js, str(ROOT / "public/cqc/src/cqc-p63-source-atlas.js"), str(ATLAS), json.dumps(sorted(new_ids))], text=True))
check(runtime["count"] == 109 and set(runtime["selected"]) == new_ids, "Actual runtime normalizer accepts all three new records in the 109-entry Atlas")
check(runtime["kgb"] == ["mgs3-kgb-aiming-portrait"], "Actual episode/kind/workId filter retrieves the intended original KGB dossier")

report = {
    "schema": "cqc.p74.canonical-atlas-verification.v1",
    "result": "passed",
    "assertionCount": len(checks),
    "assertions": checks,
    "atlasBefore": 106,
    "atlasAfter": 109,
    "selectedCanonicalSourcesBefore": 283,
    "selectedCanonicalSourcesAfter": 286,
    "historicalWithoutCandidateBefore": 73,
    "historicalWithoutCandidateAfter": 72,
    "historicalStatusesChanged": False,
    "closedScopes": 0,
    "combatAdmissions": 0,
    "oneToOneCertifications": 0,
    "browserVisualVerification": "not_performed_by_this_script",
}
print(json.dumps(report, ensure_ascii=False, indent=2))
