#!/usr/bin/env python3
"""Normalize and publish the reviewed P72 handoffs without changing prior sources.

Preview (including an incomplete working batch) writes nothing:
  python scripts/build-cqc-p72.py --handoff-root /path/to/p72_research --allow-partial

Import and apply a completed batch after the root agent's recorded visual review:
  python scripts/build-cqc-p72.py --handoff-root /path/to/p72_research \
    --review /path/to/root-review.json --apply

Offline, idempotent rebuild from the preserved records:
  python scripts/build-cqc-p72.py --apply

Only P72 provenance, P72 assets, its association registry/continuation and the
Atlas append are written. Runtime, QA, publication and prior registries are not.
"""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import shutil
import struct
import subprocess
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

PARENT = "b9051108080855cfcad8a322d34dbfb66e8c131e"
PASS = "docs/cqc-reprise/pass72/"
BIBLE = "docs/cqc-bible/"
ATLAS = "public/cqc/data/cqc-p63-source-atlas.json"
WEB = "https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/"
BATCHES = ("acid", "survive", "rising", "roster")
FALSE_FLAGS = ("runtimeIntegrated", "combatReady", "combatRuntimeIntegrated", "absolute1to1Certified", "referenceGeometryValidated", "nativePixelExact", "nativeUhd", "scopeClosed")
RASTER_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".webp"}


def sha256(raw):
    return hashlib.sha256(raw).hexdigest()


def blob(raw):
    return hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def write_json(root, path, value):
    write_text(root, path, json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def write_text(root, path, value):
    dest = root / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(value, encoding="utf-8")


def file_record(path, recorded_path=None):
    path = Path(path)
    raw = path.read_bytes()
    return {"path": str(recorded_path or path), "bytes": len(raw), "sha256": sha256(raw), "gitBlobSha": blob(raw)}


def verify_file(root, record):
    actual = file_record(root / record["path"], record["path"])
    for key in ("bytes", "sha256", "gitBlobSha"):
        assert record[key] == actual[key], f"File changed: {record['path']} ({key})"


def git_bytes(root, path):
    return subprocess.check_output(["git", "show", f"{PARENT}:{path}"], cwd=root)


def baseline(root):
    previous = json.loads(git_bytes(root, BIBLE + "asset-associations-p71.json"))
    catalogue = json.loads(git_bytes(root, ATLAS))
    paths = previous["inherits"] + [BIBLE + "asset-associations-p71.json"]
    assert len(paths) == 9 and len(set(paths)) == 9
    records = []
    inherited_assets = []
    for path in paths:
        native = git_bytes(root, path)
        current = (root / path).read_bytes()
        assert native == current, f"Historical registry changed: {path}"
        records.append(file_record(root / path, path))
        inherited_assets.extend(json.loads(native)["assets"])
    assert len(inherited_assets) == previous["counts"]["totalSelected"] == 272
    assert len(catalogue["assets"]) == previous["counts"]["atlasSources"] == 95
    assert previous["counts"]["totalArchivedAttempts"] == 20
    inventory_path = "docs/cqc-reprise/pass61/inventory.json"
    inventory_raw = git_bytes(root, inventory_path)
    assert (root / inventory_path).read_bytes() == inventory_raw, "P61 inventory changed"
    inventory = json.loads(inventory_raw)["rows"]
    unresolved = {r["id"] for r in inventory if r["presenceClass"] == "unresolved"}
    old_work = {w for a in inherited_assets for w in a.get("workIds", [])}
    assert len(inventory) == 277 and len(unresolved) == 97 and len(unresolved - old_work) == 75
    return {
        "parentCommit": PARENT,
        "previousSelected": 272,
        "previousArchivedAttempts": 20,
        "atlasRecordCount": 95,
        "atlasSourcePass": catalogue["sourcePass"],
        "atlasRecordsCanonicalSha256": sha256(canonical(catalogue["assets"])),
        "historicalAssociationFiles": records,
        "historicalInventory": file_record(root / inventory_path, inventory_path),
        "historicalRowsWithoutSelectedCandidate": 75,
    }, previous, catalogue, inherited_assets, inventory


def existing_local(value, root, batch_root):
    if not value or not isinstance(value, (str, Path)):
        return None
    p = Path(value)
    candidates = [p] if p.is_absolute() else [batch_root / p, root / p]
    for candidate in candidates:
        if candidate.is_file():
            return candidate.resolve()
    return None


def image_info(path, dest):
    result = file_record(path, dest)
    raw = Path(path).read_bytes()
    assert raw.startswith(b"\x89PNG\r\n\x1a\n"), f"Not a PNG: {path}"
    width, height, depth, color = struct.unpack(">IIBB", raw[16:26])
    assert depth == 8 and color in (2, 6), f"Unexpected PNG type: {path}"
    result.update(width=width, height=height, bitDepth=depth, colorType=color, colorMode="RGBA" if color == 6 else "RGB")
    return result


def recorded_reference_metadata(asset):
    rows = []
    for key in ("referenceMetadata", "references"):
        value = asset.get(key, [])
        if isinstance(value, list):
            rows.extend(r for r in value if isinstance(r, dict))
    return rows


def reference_label(source_type):
    if "community" in source_type or "third_party" in source_type or "mirror" in source_type:
        return "Référence hébergée par un tiers"
    if "primary_publisher" in source_type or "official_publisher" in source_type:
        return "Référence de l’éditeur"
    if "primary_official_licensed" in source_type:
        return "Guide officiel sous licence"
    if "generated" in source_type:
        return "Sortie générée utilisée pour correction"
    return "Référence utilisée"


def normalize_handoffs(root, handoff_root, allow_partial, base):
    copies = {}
    texts = {}
    references = {}
    ref_by_original = {}
    assets, archives, blocked, batch_records, deferred = [], [], [], [], []
    missing = []

    def add_reference(value, asset, batch, batch_root):
        original = existing_local(value, root, batch_root)
        assert original is not None, f"Missing generation reference: {value}"
        assert original.suffix.lower() in RASTER_SUFFIXES, f"Non-raster generation input: {value}"
        original_key = str(original)
        if original_key in ref_by_original:
            return copy.deepcopy(references[ref_by_original[original_key]])
        candidates = recorded_reference_metadata(asset)
        meta = next((r for r in candidates if str(r.get("path", r.get("localPath", ""))) == str(value)), None)
        if meta is None:
            meta = next((r for r in candidates if Path(str(r.get("path", r.get("localPath", "")))).name == original.name), {})
        meta = copy.deepcopy(meta)
        dest = PASS + f"research/{batch}/references/" + original.name
        native = file_record(original, dest)
        if dest in copies and copies[dest] != original:
            dest = PASS + f"research/{batch}/references/" + original.stem + "-" + native["sha256"][:10] + original.suffix
            native["path"] = dest
        source_url = meta.get("sourceURL", meta.get("url", meta.get("sourceUrl", "")))
        context_url = meta.get("contextURL", meta.get("pageURL", ""))
        if not source_url:
            source_url = next((u for u in asset.get("referenceURLs", []) if Path(urlparse(u).path).name == original.name), "")
        if not context_url:
            context_url = next(iter(asset.get("referenceURLs", [])), "")
        source_type = meta.get("sourceType", asset.get("sourceType", "reference_provenance_to_review"))
        host = (urlparse(source_url).hostname or "").lower()
        community_host = any(host == h or host.endswith("." + h) for h in ("fandom.com", "wikia.nocookie.net", "metalgear.fandom.com", "imfdb.org", "atwiki.jp", "spriters-resource.com"))
        if community_host and ("primary_publisher" in source_type or "official_publisher" in source_type):
            source_type = "source_from_original_game_or_art_community_mirror"
        if not source_url and ("generated_images" in str(original) or original.name in {Path(str(a.get("localPath", ""))).name for a in assets + archives}):
            source_type = "generated_intermediate_reference_not_primary"
        record = {**meta, **native, "id": f"{batch}:{original.stem}", "originalInputPath": str(value), "sourceURL": source_url, "contextURL": context_url, "sourceType": source_type, "hostClassification": "community_mirror" if community_host else ("publisher" if host == "konami.com" or host.endswith(".konami.com") else "other_or_local"), "usedForGeneration": True}
        copies[dest] = original
        references[dest] = record
        ref_by_original[original_key] = dest
        # Preserve the source PDF's identity and render command without
        # publishing the complete document, which was not an imagegen input.
        derived = existing_local(meta.get("derivedFrom"), root, batch_root)
        if derived is not None and derived.suffix.lower() == ".pdf":
            pdf_meta = next((r for r in candidates if Path(str(r.get("path", ""))).name == derived.name), {})
            record["derivedFromProvenance"] = {**file_record(derived), "originalPath": str(derived), "sourceURL": pdf_meta.get("sourceURL", source_url), "sourceType": pdf_meta.get("sourceType", "source_document_for_raster_reference"), "renderCommand": meta.get("renderCommand"), "pdfPageIndex": meta.get("pdfPageIndex"), "printedPages": meta.get("printedPages"), "usedAsDirectGenerationInput": False, "archivedLocally": False, "interpretation": "Le PDF reste une source bibliographique ; seules les images effectivement utilisées par imagegen sont copiées."}
        return copy.deepcopy(record)

    def normalize_record(incoming, batch, batch_root, status, index):
        a = copy.deepcopy(incoming)
        ident = a.get("id", a.get("assetId", a.get("targetId", a.get("promptId", ""))))
        assert ident and "/" not in ident, f"Invalid identity in {batch} {status}"
        a["id"] = ident
        generation = copy.deepcopy(a.get("generation", {}))
        prompt = generation.get("exactPrompt", a.get("exactPrompt", a.get("prompt", "")))
        tool_args = copy.deepcopy(generation.get("toolArgs", a.get("toolArgs", {})))
        if not prompt:
            prompt = tool_args.get("prompt", "")
        assert isinstance(prompt, str) and prompt.strip(), f"Missing exact prompt: {ident}"
        if not tool_args:
            tool_args = {"prompt": prompt}
            for key in ("referenced_image_paths", "transparent_background", "num_last_images_to_include"):
                if key in generation:
                    tool_args[key] = copy.deepcopy(generation[key])
            generation["toolArgsReconstructedFromRecordedFields"] = True
        assert tool_args.get("prompt", prompt) == prompt, f"Prompt/tool args mismatch: {ident}"
        tool_args.setdefault("prompt", prompt)
        assert not (tool_args.get("referenced_image_paths") and tool_args.get("num_last_images_to_include")), f"Conflicting image references: {ident}"
        input_paths = tool_args.get("referenced_image_paths") or []
        refs = [add_reference(value, a, batch, batch_root) for value in input_paths]
        suffix = "" if status == "selected" else f"--{status}-{index + 1}"
        prompt_path = PASS + f"research/{batch}/prompts/{ident}{suffix}.txt"
        assert prompt_path not in texts or texts[prompt_path] == prompt, f"Prompt path collision: {ident}"
        texts[prompt_path] = prompt
        generation.update(tool="image_gen.imagegen", mode=generation.get("mode", "reference_generation"), promptId=ident, exactPrompt=prompt, promptFile=prompt_path, toolArgs=tool_args, referenced_image_paths=copy.deepcopy(input_paths), copiedReferenceFiles=[r["path"] for r in refs], omittedArguments=[key for key in ("num_last_images_to_include", "referenced_image_paths", "transparent_background") if key not in tool_args])
        if "transparent_background" in tool_args:
            generation["transparent_background"] = tool_args["transparent_background"]
        a.update(generation=generation, handoffBatch=batch, referenceIds=[r["id"] for r in refs], referenceFiles=[r["path"] for r in refs], references=refs, referenceMetadata=copy.deepcopy(refs), reviewRecords=[PASS + "reviewed-batch.json"])
        page_meta = a.pop("referencePageMetadata", None)
        if page_meta:
            a["referenceContext"] = {key: page_meta[key] for key in ("url", "sourceURL", "sourceType") if key in page_meta}
        if status == "blocked":
            a.update(selected=False, outputCreated=False, outputPath=None, noRetryUnderAlias=True)
            a.setdefault("reason", a.get("error", a.get("response", a.get("result", "Refus consigné dans le handoff source."))))
            return a
        local = next((p for p in [existing_local(a.get(key), root, batch_root) for key in ("localPath", "path", "originalOutputPath", "sourceGenerated", "sourcePath")] if p is not None), None)
        if local is None:
            local = existing_local(generation.get("outputSourcePath", generation.get("outputPath")), root, batch_root)
        assert local is not None, f"Missing PNG: {ident}"
        original_output = next((value for value in (a.get("originalOutputPath"), generation.get("outputSourcePath"), a.get("generationOutput"), generation.get("outputPath")) if isinstance(value, str) and value), str(local))
        original_file = existing_local(original_output, root, batch_root)
        assert original_file is not None, f"Missing original imagegen output: {ident}"
        assert original_file.read_bytes() == local.read_bytes(), f"Research copy differs from imagegen output: {ident}"
        dest = "public/cqc/assets/p72/" + ("rejected/" if status == "archived" else "") + ident + suffix + ".png"
        info = image_info(local, dest)
        for key in ("bytes", "sha256", "gitBlobSha", "width", "height", "bitDepth", "colorType", "colorMode"):
            if key in a:
                assert a[key] == info[key], f"Handoff metadata mismatch: {ident} ({key})"
        for flag in FALSE_FLAGS:
            assert not a.get(flag, False), f"Unsupported claimed certification/admission: {ident} ({flag})"
        a.update(info)
        a.update({flag: False for flag in FALSE_FLAGS})
        a.update(passId="P72", selected=status == "selected", sourceGenerated=True, originalLocalPath=str(local), originalOutputPath=original_output, originalOutputVerifiedByteForByte=True, atlasIntegrated=status == "selected", fidelityStatus="pending_external_review", assetId="asset:p72:" + ident, selectedVersion=a.get("selectedVersion", "v1"))
        a["pass"] = "P72"
        a["transparentBackground"] = bool(tool_args.get("transparent_background", False))
        generation.update(outputSourcePath=a["originalOutputPath"], rawBytesPreserved=True, postprocessing="none; exact original PNG copied byte-for-byte")
        copies[dest] = local
        if status == "selected":
            for required in ("label", "episodeKey", "kind", "bodyCoverage", "workIds", "scope", "qaNotes", "observed", "productionPlan", "nextWork"):
                assert a.get(required), f"Missing selected-source field: {ident}.{required}"
            assert a["workIds"] and isinstance(a["workIds"], list)
            a.setdefault("episode", a["episodeKey"])
            a.setdefault("edition", "Édition précisée par les références du dossier")
            a.setdefault("referenceURLs", list(dict.fromkeys(u for r in refs for u in (r["contextURL"], r["sourceURL"]) if u)))
            a["guideSections"] = a.get("guideSections", ["02", "04", "05", "15", "16", "17", "18", "22", "25", "26", "27", "29"])
            a["extensionGuideSections"] = a.get("extensionGuideSections", ["40", "44", "45", "46", "47", "54", "64", "65", "67"])
            a["extensionGuideMap"] = BIBLE + "extension-guide-map-p71.json"
            a["runtimeBinding"] = {"status": "atlas_only", "moduleKey": "atlas63", "catalogPath": ATLAS, "admittedByThisPass": False}
            a["bibleURL"] = WEB + BIBLE + "CONTINUATION_P72.md#" + ident
            a["blobURL"] = WEB + dest
            a["manifest"] = PASS + "delivery-manifest.json"
            a["bibleDocuments"] = [BIBLE + name for name in ("CONTINUATION_P72.md", "EXTENSIONS_GUIDE_P71.md", "ASSOCIATIONS.md", "COMBAT.md", "FICHES_ET_VALIDATION.md")]
            a["promptRecord"] = PASS + "prompt-index.json#" + ident
        else:
            a.setdefault("reason", a.get("archiveReason", a.get("rejectionReason", "Sortie non retenue ; voir le handoff source.")))
            a["archivalStatus"] = "archived_not_selected"
            a.pop("runtimeBinding", None)
            a.pop("bibleURL", None)
        return a

    for batch in BATCHES:
        batch_root = handoff_root / batch
        path = batch_root / "handoff.json"
        if not path.is_file():
            missing.append(batch)
            continue
        data = read_json(path)
        source_path = PASS + f"research/{batch}/handoff-source.json"
        copies[source_path] = path
        batch_assets = [a for a in data.get("assets", []) if a.get("selected", True)]
        batch_archives = list(data.get("archives", [])) + [a for a in data.get("assets", []) if not a.get("selected", True)]
        batch_blocked = [a for a in data.get("blockedRequests", []) if a.get("generationAttempted") is not False]
        deferred.extend(dict(a, handoffBatch=batch) for a in data.get("blockedRequests", []) if a.get("generationAttempted") is False)
        assets.extend(normalize_record(a, batch, batch_root, "selected", i) for i, a in enumerate(batch_assets))
        archives.extend(normalize_record(a, batch, batch_root, "archived", i) for i, a in enumerate(batch_archives))
        blocked.extend(normalize_record(a, batch, batch_root, "blocked", i) for i, a in enumerate(batch_blocked))
        actual_calls = len(batch_assets) + len(batch_archives) + len(batch_blocked)
        declared_calls = data.get("generationCalls", data.get("generationRequests", data.get("counts", {}).get("generationRequests", data.get("requests", actual_calls))))
        assert declared_calls == actual_calls, f"Unreconciled generation count: {batch}: declared {declared_calls}, recorded outputs/refusals {actual_calls}"
        batch_records.append({"batch": batch, "handoff": file_record(path, source_path), "selectedCandidates": len(batch_assets), "archivedPNGs": len(batch_archives), "blockedRequests": len(batch_blocked), "generationRequests": actual_calls, "reviewedAt": data.get("reviewedAt", data.get("asOf")), "status": "handoff_received_pending_root_review"})
    assert allow_partial or not missing, "Missing handoffs: " + ", ".join(missing)
    # A rejected output can also be an edit input (KGB v1). Preserve one raw
    # file and map the original tool argument to that archive, not a duplicate.
    archive_by_sha = {a["sha256"]: a for a in archives}
    ref_remaps = {}
    for old_path, ref in list(references.items()):
        archived = archive_by_sha.get(ref["sha256"])
        if archived is None:
            continue
        new_path = archived["path"]
        ref_remaps[old_path] = new_path
        ref.update(path=new_path, sourceType="generated_intermediate_reference_not_primary", hostClassification="local_generated", sourceURL="", contextURL="", sourceOutputId=archived["id"], note="La sortie archivée sert d’entrée à une correction ; un seul fichier brut est conservé.")
        if old_path != new_path:
            copies.pop(old_path, None)
            references.pop(old_path)
        references[new_path] = ref
    for a in assets + archives + blocked:
        paths = [ref_remaps.get(p, p) for p in a["referenceFiles"]]
        a["referenceFiles"] = paths
        a["references"] = [copy.deepcopy(references[p]) for p in paths]
        a["referenceMetadata"] = copy.deepcopy(a["references"])
        a["generation"]["copiedReferenceFiles"] = paths
        a["generation"]["referenceInputMap"] = [{"originalPath": original, "archivedPath": r["path"], "sha256": r["sha256"], "sourceType": r["sourceType"]} for original, r in zip(a["generation"]["referenced_image_paths"], a["references"], strict=True)]
    ids = [a["id"] for a in assets]
    assert len(ids) == len(set(ids)), "Duplicate selected identity"
    assert len({a["path"] for a in assets + archives}) == len(assets) + len(archives), "Duplicate output destination"
    source = {"schema": "cqc.p72.source-records.v1", "parentCommit": PARENT, "asOf": datetime.now(timezone.utc).date().isoformat(), "baseline": base, "partial": bool(missing), "missingHandoffs": missing, "batchRecords": batch_records, "generationRequests": sum(r["generationRequests"] for r in batch_records), "assets": assets, "archives": archives, "blockedRequests": blocked, "researchDeferredWithoutGeneration": deferred, "references": list(references.values()), "textFiles": texts, "preservedHandoffFiles": [r["handoff"] for r in batch_records], "rootReview": None}
    return source, copies


def apply_root_review(source, review, copies=None):
    assert review.get("reviewComplete") is True, "Root review is incomplete"
    assert review.get("reviewer", "/root") == "/root", "Expected the root agent's review"
    requested = review.get("selected", [])
    assert requested and all(isinstance(x, dict) and x.get("id") and x.get("sha256") for x in requested), "Review requires selected id/SHA-256 records"
    index = {a["id"]: a for a in source["assets"]}
    selected = {x["id"]: x for x in requested}
    assert len(selected) == len(requested) and set(selected) <= set(index), "Review includes unknown or duplicate IDs"
    for ident, record in selected.items():
        assert record["sha256"] == index[ident]["sha256"], f"Reviewed file changed: {ident}"
    excluded = {r["id"]: r for r in review.get("excluded", [])}
    assert set(index) - set(selected) == set(excluded), "Every unselected candidate requires a recorded exclusion"
    for ident, reason in excluded.items():
        assert reason.get("reason"), f"Missing exclusion reason: {ident}"
        a = copy.deepcopy(index[ident])
        a.update(selected=False, atlasIntegrated=False, reason=reason["reason"], excludedByRootReview=True)
        a["archivalStatus"] = "archived_not_selected"
        a.pop("runtimeBinding", None)
        a.pop("bibleURL", None)
        if copies is not None:
            old_path = a["path"]
            new_path = "public/cqc/assets/p72/rejected/" + ident + "--root-excluded.png"
            copies[new_path] = copies.pop(old_path)
            a["path"] = new_path
            a["blobURL"] = WEB + new_path
        source["archives"].append(a)
    source["assets"] = [a for a in source["assets"] if a["id"] in selected]
    source["rootReview"] = copy.deepcopy(review)
    source["partial"] = False
    for batch in source["batchRecords"]:
        batch["status"] = "root_review_applied"
        batch["selectedAfterRootReview"] = sum(a["handoffBatch"] == batch["batch"] for a in source["assets"])
        batch["archivedAfterRootReview"] = sum(a["handoffBatch"] == batch["batch"] for a in source["archives"])


def coverage(source, inherited_assets, inventory):
    old_work = {w for a in inherited_assets for w in a.get("workIds", [])}
    new_work = {w for a in source["assets"] for w in a["workIds"]}
    historical = {r["id"]: r for r in inventory}
    unresolved = {r["id"] for r in inventory if r["presenceClass"] == "unresolved"}
    before = unresolved - old_work
    after = unresolved - old_work - new_work
    updates = []
    for ident in sorted(new_work & set(historical)):
        row = historical[ident]
        updates.append({"workId": ident, "label": row["label"], "baselineStatus": row["baselineStatus"], "presenceClass": row["presenceClass"], "candidateIds": [a["id"] for a in source["assets"] if ident in a["workIds"]], "newlyReceivesSelectedCandidate": ident in before, "historicalStatusUnchanged": True, "scopeClosed": False, "interpretation": "Un ou plusieurs candidats fixes couvrent une partie documentée de cette ligne ; ni le groupe, ni ses variantes, ni son périmètre ne sont fermés."})
    return {"schema": "cqc.p72.coverage-delta.v1", "parentCommit": PARENT, "historicalRows": len(inventory), "historicalUnmatchedRows": len(unresolved), "beforeWithoutSelectedCandidate": len(before), "afterWithoutSelectedCandidate": len(after), "newlyCoveredHistoricalRows": sorted(before - after), "newlyCoveredHistoricalRowCount": len(before - after), "historicalRowsStillWithoutSelectedCandidate": sorted(after), "historicalScopeUpdates": updates, "extensionScopes": sorted(new_work - set(historical) - old_work), "reusedExistingWorkIds": sorted(new_work & old_work), "closedScopes": 0, "p61StatusesChanged": False, "meaning": "La couverture mesure la présence d’au moins un candidat sélectionné associé au workId. Une couverture nouvelle ne vaut pas clôture du groupe, certification 1:1, admission au combat ou modification du statut P61."}


def counts_for(source, previous, delta):
    assets, archives, blocked = source["assets"], source["archives"], source["blockedRequests"]
    assert source["generationRequests"] == len(assets) + len(archives) + len(blocked), "Every generation request must have an output or a recorded no-output refusal"
    return {"selectedSources": len(assets), "archivedAttempts": len(archives), "generatedPNGs": len(assets) + len(archives), "generationRequests": source["generationRequests"], "blockedRequests": len(blocked), "previousSelected": 272, "totalSelected": 272 + len(assets), "previousArchivedAttempts": 20, "totalArchivedAttempts": 20 + len(archives), "atlasSources": 95 + len(assets), "editionCount": len({a["episodeKey"] for a in assets}), "byEpisode": dict(Counter(a["episodeKey"] for a in assets)), "byKind": dict(Counter(a["kind"] for a in assets)), "byBodyCoverage": dict(Counter(a["bodyCoverage"] for a in assets)), "allPassesByKind": dict(Counter(previous["counts"]["allPassesByKind"]) + Counter(a["kind"] for a in assets)), "selectedBytes": sum(a["bytes"] for a in assets), "archivedBytes": sum(a["bytes"] for a in archives), "referenceFiles": len(source["references"]), "combatAdmissions": 0, "absolute1to1Certifications": 0, "newNarrativeImages": 0, "closedScopes": 0, "historicalRowsNewlyCoveredByCandidate": delta["newlyCoveredHistoricalRowCount"]}


def check_current_atlas(root, baseline_catalogue, assets):
    catalogue = read_json(root / ATLAS)
    assert catalogue["assets"][:95] == baseline_catalogue["assets"], "The 95 previous Atlas entries changed"
    ids = [a["id"] for a in assets]
    assert not ({a["id"] for a in baseline_catalogue["assets"]} & set(ids)), "Existing Atlas ID reused"
    tail = catalogue["assets"][95:]
    assert not tail or [a["id"] for a in tail] == ids, "Unowned or differently selected later Atlas entries exist"
    return catalogue


def md(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def observation_text(value):
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        parts = []
        for key, label in (("visualState", "État visible"), ("identityEvidence", "Identification"), ("loreBoundary", "Périmètre")):
            if value.get(key):
                parts.append(label + " : " + str(value[key]).rstrip(".") + ".")
        return " ".join(parts) or json.dumps(value, ensure_ascii=False)
    return str(value)


def state_text(row):
    labels = {"placed_intact": "Installation intacte", "placement_preview": "Aperçu de placement", "contact_impalement": "Contact avec les pointes", "damaged": "Dégâts", "destroyed": "Destruction", "idle_beta": "Poste fixe de la bêta", "craft_interaction": "Interaction de fabrication", "menu_open": "Ouverture du menu", "damaged_or_removed": "Dégâts ou retrait", "damage_or_removal": "Dégâts ou retrait", "customize_repair_menu": "Menu de personnalisation/réparation", "enemy_collision": "Collision ennemie", "placement_repair_removal": "Placement, réparation et retrait", "medical_crafting": "Fabrication médicale", "player_contact": "Contact du personnage", "weapon_crafting": "Fabrication d’armes", "player_hands_and_tools": "Mains et outils du personnage"}
    statuses = {"static_candidate_only": "Une source fixe candidate est livrée ; aucun état animé ou fonctionnel.", "needs_native_sequence": "Recueillir une séquence native avant production et adaptation.", "needs_native_reference": "Obtenir les références natives de cet état avant production.", "needs_native_ui_reference": "Documenter l’interface native et ses transitions.", "not_documented_do_not_invent": "État non documenté ; aucune forme ni réaction à inventer.", "documented_role_not_implemented": "Rôle documenté, sans implémentation.", "contextual_role_not_implemented": "Rôle identifié par le contexte, sans implémentation.", "planned_requires_native_validation": "Travail proposé, soumis à validation native.", "planned_needs_alignment_and_animation": "Alignement et animation à documenter puis produire.", "planned_requires_native_action_reference": "Recueillir une référence native de l’action avant production."}
    ident = row.get("id", "")
    name = row.get("name", labels.get(ident, ident or "État"))
    description = row.get("description", row.get("nextWork", statuses.get(row.get("status"), row.get("status", "À documenter"))))
    if row.get("evidence"):
        description += " " + str(row["evidence"])
    return name, description


def render_documents(source, counts, delta):
    assets = source["assets"]
    summary = f"**{counts['selectedSources']} nouvelles sources sélectionnées, {counts['archivedAttempts']} sortie(s) archivée(s), {counts['blockedRequests']} refus sans PNG.** Cumul : **{counts['totalSelected']} sources sélectionnées**, **{counts['atlasSources']} dossiers Atlas**, **{counts['totalArchivedAttempts']} essais archivés**."
    meaning = f"Les 95 fiches Atlas précédentes et les 9 registres antérieurs sont conservés. Le nombre de lignes historiques sans candidat passe de **75 à {delta['afterWithoutSelectedCandidate']}** : {delta['newlyCoveredHistoricalRowCount']} ligne(s) reçoivent un premier candidat partiel. Les groupes restent ouverts et les statuts P61 restent inchangés."
    continuation = ["# Continuation P72 — sources fixes documentées", "", summary, "", "[Galerie](../cqc-reprise/pass72/README.md) · [Associations](asset-associations-p72.json) · [Manifeste](../cqc-reprise/pass72/delivery-manifest.json) · [Prompts exacts](../cqc-reprise/pass72/prompt-index.json) · [Delta de couverture](../cqc-reprise/pass72/coverage-delta.json)", "", meaning, "", "P70 reste réservé au lot ancien non récupéré. Les fichiers absents n’entrent dans aucun compteur. Une image fixe ou un fragment documenté est livré par sujet ; les états et interactions ci-dessous restent du travail futur. Aucune animation, nouvelle admission au combat, certification 1:1 absolue ou validation UHD native ne découle de ces PNG.", "", "Le [guide général](guide-map.json) et l’[annexe des extensions P71](EXTENSIONS_GUIDE_P71.md) restent les référentiels. Les indications de chaque dossier précisent ce qui est observé, reconstruit et encore à produire.", "", "## Couverture historique", "", "| WorkId | Candidats P72 | Première couverture | Statut du groupe |", "|---|---|---|---|"]
    for row in delta["historicalScopeUpdates"]:
        continuation.append(f"| `{row['workId']}` | {', '.join(row['candidateIds'])} | {'Oui' if row['newlyReceivesSelectedCandidate'] else 'Non, compléments'} | Ouvert ; statut P61 conservé |")
    if not delta["historicalScopeUpdates"]:
        continuation.append("| Aucun | Extensions nouvelles uniquement | — | Aucune clôture |")
    continuation.append("")
    gallery = ["# P72 — sources fixes et provenance", "", summary, "", "[Fiches détaillées](../../cqc-bible/CONTINUATION_P72.md) · [Manifeste](delivery-manifest.json) · [Prompts exacts](prompt-index.json) · [Références](references.json) · [Revue](reviewed-batch.json) · [Couverture](coverage-delta.json)", "", meaning, "", "Les sorties originales sont conservées sans retouche, conversion ni mise à l’échelle. Les références raster réellement utilisées sont archivées brutes ; les pages web entières et recherches inutilisées ne sont pas copiées. La provenance d’un miroir communautaire reste distincte d’un hébergement éditeur.", ""]
    for a in assets:
        ident = a["id"]
        continuation += [f'<a id="{ident}"></a>', "", "## " + a["label"], "", a["scope"], "", "| Champ | Valeur |", "|---|---|", f"| Identité | `{a['assetId']}` |", f"| Édition / couverture | {md(a['edition'])} — `{a['bodyCoverage']}` |", f"| Fichier | [{ident}.png]({a['blobURL']}) |", f"| Sortie | {a['width']} × {a['height']}, {a['colorMode']}, {a['bytes']:,} octets |".replace(",", " "), f"| SHA-256 | `{a['sha256']}` |", "| WorkIds | `" + "`, `".join(a["workIds"]) + "` |", "| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |", "", "### Référence et limites", "", observation_text(a["observed"]), ""]
        for r in a["references"]:
            label = reference_label(r["sourceType"])
            links = [f"[Copie brute](../../{r['path']})"]
            if r.get("sourceURL"):
                links.insert(0, f"[{label}]({r['sourceURL']})")
            if r.get("contextURL") and r["contextURL"] != r.get("sourceURL"):
                links.insert(0, f"[Contexte]({r['contextURL']})")
            continuation.append("- " + " · ".join(links) + " — `" + r["sourceType"] + "`.")
        continuation += ["", f"[Prompt exact](../cqc-reprise/pass72/{a['generation']['promptFile'][len(PASS):]}).", "", *["- " + str(n) for n in a["qaNotes"]], "", "### États et interactions à produire", ""]
        plan = a["productionPlan"]
        continuation += [plan.get("role", "Travail futur documenté, sans implémentation runtime par cette passe."), "", "| État prévu | Travail restant |", "|---|---|"]
        for state in plan.get("states", []):
            if isinstance(state, dict):
                name, description = state_text(state)
                continuation.append("| " + md(name) + " | " + md(description) + " |")
            else:
                continuation.append("| " + md(state) + " | À sourcer et produire séparément |")
        continuation += ["", *["- " + (" : ".join(state_text(v)) if isinstance(v, dict) else str(v)) for v in plan.get("interactions", [])], "", "### Prochaine validation", "", *["- " + str(n) for n in a["nextWork"]], "", "Guide général : " + ", ".join(a["guideSections"]) + ". Extensions : " + ", ".join(a["extensionGuideSections"]) + ". Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.", ""]
        gallery += ["## " + a["label"], "", f"![{a['label']}](../../../{a['path']})", "", f"**{a['width']} × {a['height']} · {a['colorMode']} · `{a['bodyCoverage']}`**", "", f"[Référence, réserves et états prévus](../../cqc-bible/CONTINUATION_P72.md#{ident}).", ""]
    continuation += ["## Sorties écartées et refus", "", "Les sorties écartées restent brutes et traçables. Un refus sans PNG est journalisé sans fichier inventé et sans relance sous alias.", ""]
    for a in source["archives"]:
        continuation.append(f"- **{a['id']}** — {a.get('reason', 'Sortie non retenue')}. [Sortie brute]({WEB + a['path']}).")
    for a in source["blockedRequests"]:
        reason = a.get("reason", "Refus sans sortie")
        continuation.append(f"- **{a['id']}** — refus sans PNG. Motif et réponse exacte : [registre](../cqc-reprise/pass72/prompt-index.json).")
    gallery += ["## Traçabilité et reconstruction", "", f"{len(source['references'])} références raster utilisées, {counts['generationRequests']} appels, {counts['generatedPNGs']} PNG produits, {counts['blockedRequests']} refus sans PNG. Les [sources normalisées](source-records.json) conservent les paramètres exacts et les chemins d’entrée originaux ; les fichiers livrés possèdent leurs empreintes SHA-256 et Git.", "", "Reconstruction hors ligne : `python scripts/build-cqc-p72.py --apply`. Le script préserve les 95 fiches et les 9 registres antérieurs, et ne modifie aucun code, manifeste runtime, rapport QA ou enregistrement de publication.", ""]
    return "\n".join(continuation), "\n".join(gallery)


def render_missing(source, counts, delta, inventory, inherited_assets):
    by_id = {row["id"]: row for row in inventory}
    unresolved = {row["id"] for row in inventory if row["presenceClass"] == "unresolved"}
    remaining = set(delta["historicalRowsStillWithoutSelectedCandidate"])
    candidate_rows = unresolved - remaining
    combined = inherited_assets + source["assets"]
    assert len(remaining) == delta["afterWithoutSelectedCandidate"]
    assert len(candidate_rows) + len(remaining) == 97
    text = ["# P72 — manquants et preuves encore nécessaires", "", f"**{len(remaining)} lignes historiques restent sans candidat sélectionné.** Parmi les **97 lignes classées `unresolved` par P61**, {len(candidate_rows)} disposent maintenant d’au moins une source fixe candidate ; leur statut historique demeure inchangé. L’inventaire complet contient **277 lignes** et n’est pas réécrit par P72.", "", "[Inventaire P61 conservé](../pass61/inventory.json) · [Delta calculé](coverage-delta.json) · [Fiches P72](../../cqc-bible/CONTINUATION_P72.md) · [Manifeste](delivery-manifest.json) · [Revue](reviewed-batch.json)", "", "| Mesure | Avant P72 | Après P72 | Sens |", "|---|---:|---:|---|", "| Lignes de l’inventaire P61 | 277 | 277 | Identités et statuts conservés |", "| Lignes historiquement `unresolved` | 97 | 97 | Aucune réécriture de statut |", f"| Parmi elles, sans candidat sélectionné | 75 | {len(remaining)} | Présence d’une source candidate seulement |", f"| Parmi elles, avec au moins un candidat | 22 | {len(candidate_rows)} | Groupes et variantes encore ouverts |", f"| Nouvelles lignes partiellement couvertes | — | {delta['newlyCoveredHistoricalRowCount']} | Invités MPO+ et décors VR DLC |", f"| Nouveaux périmètres hors inventaire | — | {len(delta['extensionScopes'])} | Extensions explicites, sans fermeture d’une ligne historique |", "| Clôtures, admissions combat, certifications 1:1 | 0 | 0 | Aucune revendication de complétude |", "", "Les 180 autres lignes conservent également leur classification P61. La présence d’une image, d’un corps complet dans une seule pose ou d’un fragment de décor ne prouve ni toutes les variantes ni les états, animations, collisions, interactions ou dimensions natives.", "", "## Deux groupes reçoivent leurs premiers candidats partiels", ""]
    for update in delta["historicalScopeUpdates"]:
        if not update["newlyReceivesSelectedCandidate"]:
            continue
        row = by_id[update["workId"]]
        relevant = [a for a in source["assets"] if update["workId"] in a["workIds"]]
        text += ["### " + row["label"], "", "WorkId : `" + row["id"] + "`. Statut P61 conservé : **" + row["status"] + "** (`" + row["baselineStatus"] + "`).", "", "| Candidat partiel | Couverture livrée | Première preuve suivante |", "|---|---|---|"]
        for a in relevant:
            text.append(f"| [{md(a['label'])}](../../cqc-bible/CONTINUATION_P72.md#{a['id']}) | `{a['bodyCoverage']}` ; une vue fixe | {md(a['nextWork'][0])} |")
        text += ["", "**Périmètre restant :** " + row["nextEvidenceOrWork"], "", "Les autres membres, variantes, angles et états restent à inventorier. Ce groupe ne passe pas au statut clos.", ""]
    text += ["## Extensions hors des 277 lignes historiques", "", f"Ces {len(delta['extensionScopes'])} identités ne diminuent pas le compteur historique. Elles restent des périmètres nouveaux avec leurs propres limites.", "", "| WorkId nouveau | Source | Preuves et production suivantes |", "|---|---|---|"]
    for work_id in delta["extensionScopes"]:
        a = next(a for a in source["assets"] if work_id in a["workIds"])
        text.append(f"| `{work_id}` | [{md(a['label'])}](../../cqc-bible/CONTINUATION_P72.md#{a['id']}) — `{a['bodyCoverage']}` | {md(a['nextWork'][0])} |")
    text += ["", "## Les lignes encore sans candidat sélectionné", "", "Le tableau ci-dessous est calculé à partir des IDs historiques `unresolved` qui n’apparaissent dans aucun `workIds` sélectionné des registres P61–P69, P71 et P72. Les archives et refus n’apportent aucune couverture. Chaque demande de preuve est reprise de l’inventaire P61 conservé.", ""]
    categories = sorted({by_id[ident]["category"] for ident in remaining})
    category_labels = {"characters": "Personnages et groupes", "machines": "Machines et créatures", "stages": "Décors et scènes", "costumes": "Costumes et variantes", "effects": "Effets", "vfx": "Effets visuels"}
    for category in categories:
        rows = sorted((by_id[ident] for ident in remaining if by_id[ident]["category"] == category), key=lambda r: r["id"])
        text += [f"### {category_labels.get(category, category)} — {len(rows)} ligne(s)", "", "| ID historique | Sujet | Statut P61 conservé | Référence ou travail demandé |", "|---|---|---|---|"]
        for row in rows:
            text.append("| `" + row["id"] + "` | " + md(row["label"]) + " | " + md(row["status"]) + " | " + md(row.get("nextEvidenceOrWork", "Référence d’édition et périmètre visuel à documenter.")) + " |")
        text.append("")
    text += ["## Lignes historiques avec candidat, toujours à compléter", "", f"Ces {len(candidate_rows)} lignes conservent leur statut `unresolved`. Le nombre de sources ci-dessous mesure des associations documentaires, sans valider tous les membres d’un groupe, les vues cachées, les scènes ou les états jouables.", "", "| ID historique | Sujet | Sources associées | Statut P61 conservé |", "|---|---|---:|---|"]
    for ident in sorted(candidate_rows):
        row = by_id[ident]
        ids = {a["id"] for a in combined if ident in a.get("workIds", [])}
        text.append(f"| `{ident}` | {md(row['label'])} | {len(ids)} | {md(row['status'])} |")
    text += ["", "## Sorties archivées et refus de génération", "", f"P72 conserve **{counts['archivedAttempts']} PNG archivés** et **{counts['blockedRequests']} refus sans fichier**. Ils ne figurent pas parmi les {counts['selectedSources']} sources retenues ou dans les nouvelles fiches Atlas.", "", "| ID | Résultat | Motif / suite autorisée |", "|---|---|---|"]
    for a in source["archives"]:
        text.append(f"| `{a['id']}` | PNG brut archivé | {md(a.get('reason', 'Sortie non retenue'))} |")
    for a in source["blockedRequests"]:
        text.append(f"| `{a['id']}` | Refus sans PNG | Prompt et réponse conservés dans le registre ; aucune relance sous un autre nom. |")
    text += ["", "[Prompts, paramètres, réponses exactes et chemins des archives](prompt-index.json). Les pistes sans référence exploitable n’ayant fait l’objet d’aucun appel restent des recherches différées, sans être comptées comme sorties ou refus image.", "", "## Ordre des preuves pour poursuivre", "", "1. Identifier l’édition, la classe, la variante et le périmètre exact ; obtenir des références réellement visibles et assez complètes. Un nom, un texte de guide ou une silhouette partiellement masquée ne suffit pas à reconstruire les parties cachées.", "2. Pour un personnage ou une machine : documenter le corps, ses accessoires, les profils et le dos ; pour un décor : délimiter le fragment, la géométrie, les raccords et les objets intégrés ; pour un accessoire : vérifier toutes les parties prétendues complètes.", "3. Recueillir les séquences natives des états et interactions envisagés. Une pose en T, une icône d’inventaire ou un screenshot fixe n’établit ni chronologie, ni comportement, ni mouvement.", "4. Produire les vues et états manquants individuellement avec provenance, puis valider ancrages, collisions, transitions et adaptation CQC. L’admission au combat et la fidélité sont des validations séparées de la présence dans l’Atlas.", "", "Les réserves et prochaines vérifications propres aux onze candidats P72 figurent dans les [fiches détaillées](../../cqc-bible/CONTINUATION_P72.md).", ""]
    return "\n".join(text)


def build_outputs(root, source, base, previous, baseline_catalogue, delta, counts, inventory, inherited_assets):
    assert source.get("rootReview", {}).get("reviewComplete") is True
    catalogue = check_current_atlas(root, baseline_catalogue, source["assets"])
    for record in base["historicalAssociationFiles"] + [base["historicalInventory"]]:
        verify_file(root, record)
    for record in source["assets"] + source["archives"] + source["references"] + source["preservedHandoffFiles"] + source.get("reviewEvidenceFiles", []):
        verify_file(root, record)
    for path, prompt in source["textFiles"].items():
        assert (root / path).read_text(encoding="utf-8") == prompt, "Exact prompt copy changed"
    continuation, gallery = render_documents(source, counts, delta)
    missing_document = render_missing(source, counts, delta, inventory, inherited_assets)
    inherited = [r["path"] for r in base["historicalAssociationFiles"]]
    meaning = f"Les lignes historiques sans candidat passent de 75 à {delta['afterWithoutSelectedCandidate']} par {delta['newlyCoveredHistoricalRowCount']} première(s) association(s) partielle(s). Les groupes, variantes et scènes restent ouverts ; aucun statut P61 n’est modifié."
    manifest = {"schema": "cqc.p72.delivery.v1", "asOf": source["asOf"], "parentCommit": PARENT, "previousSelected": 272, "sourcePass": previous["sourcePass"] + "+P72", "reservedPasses": ["P70"], "counts": counts, "historicalRows": 277, "historicalUnmatchedRows": 97, "historicalRowsWithoutSelectedCandidate": delta["afterWithoutSelectedCandidate"], "historicalCountsMeaning": meaning, "extensionScopes": delta["extensionScopes"], "historicalScopeUpdates": delta["historicalScopeUpdates"], "coverageDelta": PASS + "coverage-delta.json", "inherits": inherited, "interpretation": "Sources PNG fixes candidates et fragments documentés. États et interactions sont du travail futur ; aucune admission au combat, certification 1:1, UHD natif ou clôture de scope.", "requirementsGuide": BIBLE + "guide-map.json", "requirementsExtensions": [BIBLE + "EXTENSIONS_GUIDE_P71.md", BIBLE + "extension-guide-map-p71.json"], "recoveryStatus": "docs/cqc-reprise/pass71/RECOVERY_STATUS.json", "recoveryInterpretation": "P70 reste réservé au lot ancien non récupéré. Aucun original absent n’est compté dans P72.", "assets": source["assets"], "archives": source["archives"], "blockedRequests": source["blockedRequests"]}
    prompts = [{"id": a["id"], "selected": a.get("selected", False), "path": a.get("path"), **a["generation"]} for a in source["assets"]]
    archive_prompts = [{"id": a["id"], "selected": False, "path": a["path"], "reason": a.get("reason"), **a["generation"]} for a in source["archives"]]
    blocked_prompts = [{"id": a["id"], "selected": False, "path": None, "outputCreated": False, "reason": a.get("reason"), "recordedResult": {k: v for k, v in a.items() if k not in ("generation", "references", "referenceMetadata", "referenceFiles")}, **a["generation"]} for a in source["blockedRequests"]]
    review = {"schema": "cqc.p72.reviewed-batch.v1", "parentCommit": PARENT, "asOf": source["asOf"], "reviewer": "/root", "reviewComplete": True, "selected": [{k: a[k] for k in ("id", "sha256", "gitBlobSha")} for a in source["assets"]], "archives": [{k: a[k] for k in ("id", "sha256", "gitBlobSha")} for a in source["archives"]], "blockedIds": [a["id"] for a in source["blockedRequests"]], "references": [{k: r[k] for k in ("path", "bytes", "sha256", "gitBlobSha")} for r in source["references"]], "prompts": [file_record(root / p, p) for p in source["textFiles"]], "evidence": source["rootReview"], "reviewScope": "Sélection documentaire de sources fixes ; aucune certification géométrique 1:1 ni admission au combat.", "historicalPreservation": base}
    write_json(root, PASS + "source-records.json", source)
    write_json(root, PASS + "references.json", {"schema": "cqc.p72.references.v1", "references": source["references"], "interpretation": "Copies brutes des seuls fichiers raster réellement utilisés comme entrées. Le contexte web est cité par URL sans archivage HTML intégral."})
    write_json(root, PASS + "reviewed-batch.json", review)
    write_json(root, PASS + "coverage-delta.json", delta)
    write_json(root, PASS + "delivery-manifest.json", manifest)
    write_json(root, BIBLE + "asset-associations-p72.json", dict(manifest, schema="cqc.bible.asset-associations-p72.v1"))
    write_json(root, PASS + "prompt-index.json", {"schema": "cqc.p72.prompt-index.v1", "generationRequests": counts["generationRequests"], "generatedOutputs": counts["generatedPNGs"], "selectedOutputs": counts["selectedSources"], "archiveOutputs": counts["archivedAttempts"], "blockedRequests": counts["blockedRequests"], "records": prompts, "archiveRecords": archive_prompts, "blockedRecords": blocked_prompts, "interpretation": "Un enregistrement par sortie ou refus. Les paramètres exacts préservent les arguments omis, références originales et corrections. Aucun refus sans sortie n’est compté comme PNG."})
    fields = ["id", "label", "episodeKey", "workIds", "referenceURLs", "scope", "qaNotes", "episode", "edition", "bodyCoverage", "kind", "width", "height", "bitDepth", "colorType", "bytes", "sha256", "pass", "gitBlobSha", "colorMode", "sourceGenerated", "selected", "atlasIntegrated", *FALSE_FLAGS, "fidelityStatus", "assetId", "bibleURL", "blobURL", "alphaExtrema", "transparentBackground", "selectedVersion"]
    appended = []
    for a in source["assets"]:
        row = {key: copy.deepcopy(a[key]) for key in fields if key in a}
        row["path"] = "../" + a["path"][len("public/cqc/"):]
        row["generation"] = {"tool": a["generation"]["tool"], "mode": a["generation"]["mode"], "promptId": a["id"]}
        appended.append(row)
    catalogue.update(asOf=source["asOf"], sourcePass=base["atlasSourcePass"] + "+P72", description=f"{counts['atlasSources']} dossiers de sources fixes P63–P69, P71 et P72 ; les 95 dossiers précédents restent inchangés, dans leur ordre initial. P70 reste réservé.", assets=copy.deepcopy(baseline_catalogue["assets"]) + appended)
    assert sha256(canonical(catalogue["assets"][:95])) == base["atlasRecordsCanonicalSha256"]
    write_json(root, ATLAS, catalogue)
    write_text(root, BIBLE + "CONTINUATION_P72.md", continuation)
    write_text(root, PASS + "README.md", gallery)
    write_text(root, PASS + "MANQUANTS.md", missing_document)
    for record in base["historicalAssociationFiles"] + [base["historicalInventory"]]:
        verify_file(root, record)
    assert read_json(root / ATLAS)["assets"][:95] == baseline_catalogue["assets"]


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--handoff-root", type=Path)
    parser.add_argument("--review", type=Path)
    parser.add_argument("--allow-partial", action="store_true", help="Preview only; never permits a partial delivery")
    parser.add_argument("--apply", action="store_true", help="Write only after an explicit completed root review")
    args = parser.parse_args()
    root = args.root.resolve()
    assert not (args.apply and args.allow_partial), "Partial handoffs may only be previewed"
    base, previous, baseline_catalogue, inherited_assets, inventory = baseline(root)
    copies = {}
    if args.handoff_root:
        source, copies = normalize_handoffs(root, args.handoff_root.resolve(), args.allow_partial, base)
        if args.review:
            apply_root_review(source, read_json(args.review), copies)
            evidence_inputs = [args.review.resolve()]
            independent = args.review.resolve().parent / "review-acid-survive.json"
            if independent.is_file():
                evidence_inputs.append(independent)
            source["reviewEvidenceFiles"] = []
            for evidence in evidence_inputs:
                dest = PASS + ("root-visual-review.json" if evidence == args.review.resolve() else evidence.name)
                copies[dest] = evidence
                source["reviewEvidenceFiles"].append(file_record(evidence, dest))
                for asset in source["assets"] + source["archives"]:
                    if evidence == args.review.resolve() or asset.get("handoffBatch") in ("acid", "survive"):
                        asset["reviewRecords"].append(dest)
        if args.apply:
            assert args.review and not source["missingHandoffs"], "Apply requires all handoffs and their final root review"
    else:
        source = read_json(root / PASS / "source-records.json")
        assert source["baseline"] == base, "Stored baseline changed"
        assert source["parentCommit"] == PARENT and not source["partial"]
        if args.review:
            apply_root_review(source, read_json(args.review))
    delta = coverage(source, inherited_assets, inventory)
    counts = counts_for(source, previous, delta)
    check_current_atlas(root, baseline_catalogue, source["assets"])
    summary = {"mode": "apply" if args.apply else "preview_no_files_written", "partial": source["partial"], "missingHandoffs": source["missingHandoffs"], "rootReviewComplete": bool((source.get("rootReview") or {}).get("reviewComplete")), "counts": counts, "selectedIds": [a["id"] for a in source["assets"]], "archivedIds": [a["id"] for a in source["archives"]], "blockedIds": [a["id"] for a in source["blockedRequests"]], "coverage": {key: delta[key] for key in ("beforeWithoutSelectedCandidate", "afterWithoutSelectedCandidate", "newlyCoveredHistoricalRows", "extensionScopes")}, "preservedAtlasRecords": 95, "preservedAssociationFiles": 9, "referenceFiles": len(source["references"])}
    if args.apply:
        assert (source.get("rootReview") or {}).get("reviewComplete") is True
        for dest, original in copies.items():
            target = root / dest
            target.parent.mkdir(parents=True, exist_ok=True)
            if original.resolve() != target.resolve():
                shutil.copyfile(original, target)
            assert target.read_bytes() == original.read_bytes(), f"Copy is not raw: {dest}"
        for dest, text in source["textFiles"].items():
            write_text(root, dest, text)
        build_outputs(root, source, base, previous, baseline_catalogue, delta, counts, inventory, inherited_assets)
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
