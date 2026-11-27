#!/usr/bin/env python3
"""Pinned inventory evidence before P67; reads a real Git tree, never PNG blobs.
python scripts/audit-cqc-p67-coverage.py --git-repository /path/to/real/clone
"""
import argparse
import collections
import datetime
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import unicodedata

BASE = "5d7c6c5187f3906ad1ead53706e83674750f1c34"
EPISODES = {
    "mg_msx": "Metal Gear — MSX", "mg_nes": "Metal Gear — NES",
    "mg2": "Metal Gear 2: Solid Snake", "snakes_revenge": "Snake’s Revenge",
    "mgs1": "Metal Gear Solid", "twin_snakes": "The Twin Snakes",
    "vr_missions": "MGS Integral / VR Missions", "mgs2": "Metal Gear Solid 2",
    "mgs3": "Metal Gear Solid 3", "delta": "Metal Gear Solid Δ",
    "snake_eater_3d": "Snake Eater 3D", "mpo": "Portable Ops",
    "mpo_plus": "Portable Ops Plus", "pw": "Peace Walker",
    "gz": "Ground Zeroes", "tpp": "The Phantom Pain", "mgs4": "Metal Gear Solid 4",
    "mgr": "Revengeance", "rising_proto": "MGS Rising — projet initial",
    "ghost_babel": "Ghost Babel", "acid": "AC!D", "acid2": "AC!D 2",
    "acid_mobile": "AC!D Mobile", "acid2_mobile": "AC!D 2 Mobile",
    "survive": "Survive", "mobile": "MGS Mobile", "touch": "MGS Touch",
    "social_ops": "Social Ops", "mgo1": "Metal Gear Online 1",
    "mgo2": "Metal Gear Online 2", "mgo3": "Metal Gear Online 3",
    "arcade": "Metal Gear Arcade", "shared": "Sources transversales / édition non déterminée",
}
REGISTRIES = ["docs/cqc-bible/asset-associations" + suffix + ".json"
              for suffix in ["", "-p63", "-p64", "-p65", "-p66"]]
INVENTORY = "docs/cqc-reprise/pass61/inventory.json"
QUALIFICATION = "docs/cqc-reprise/pass61/audit/roster-qualification.json"
ROSTER = "docs/cqc-bible/roster-coverage.json"
PROJECTILES = "docs/cqc-reprise/pass61/audit/projectile-vfx-source-index.json"
ATLAS = "public/cqc/data/cqc-p63-source-atlas.json"
RUNTIME = "public/cqc/runtime-manifest.json"
CATEGORIES = ["characters", "costumes", "stages", "machines", "projectiles"]


def folded(value):
    value = unicodedata.normalize("NFD", str(value)).lower().replace("!", "i").replace("’", "'")
    return "".join(c for c in value if unicodedata.category(c) != "Mn")


def unique(values):
    return list(dict.fromkeys(values))


def git_blob(data):
    return hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()


def canonical_titles(raw, identity=""):
    """Use title text / a qualified identity, never a filename-neighbour guess."""
    s = folded(raw)
    if "famille fumigene" in s:
        return ["shared"]
    if "mobile / touch / arcade / social ops" in s:
        return ["mobile", "touch", "arcade", "social_ops", "acid_mobile"]
    if "master collection vol.2" in s:
        return ["mgs4", "pw", "ghost_babel"]
    if "mg msx / nes" in s:
        return ["mg_msx", "mg_nes"]
    if "mgs3 / delta" in s:
        return ["mgs3", "delta"]
    if "mgs2 / mpo+" in s:
        return ["mgs2", "mpo_plus"]
    if "mgs vr / mgs2" in s:
        return ["vr_missions", "mgs2"]
    if "mgs1 integral / vr" in s:
        return ["mgs1", "vr_missions"]
    if "portable ops / plus" in s:
        return ["mpo", "mpo_plus"]
    patterns = [
        ("acid2_mobile", r"acid\s*2\s*mobile"), ("acid_mobile", r"acid\s*mobile"),
        ("acid2", r"acid[\s_-]*2"), ("acid", r"acid"),
        ("twin_snakes", r"twin snakes"), ("ghost_babel", r"ghost babel|^ghost /"),
        ("snake_eater_3d", r"snake eater 3d"), ("delta", r"delta|fox hunt|foxhunt"),
        ("snakes_revenge", r"snake.?s revenge"),
        ("mg_nes", r"(?:metal gear|mg)\s+nes"),
        ("mg_msx", r"mg msx|^mg1(?:\b| /)|^metal gear(?:$| /)"),
        ("mg2", r"metal gear 2|^mg2(?:\b| /)"),
        ("mgo1", r"mgo1"), ("mgo2", r"mgo2"), ("mgo3", r"mgo3"),
        ("mpo_plus", r"portable ops\+|portable ops plus|mpo\+"),
        ("mpo", r"portable ops|^mpo(?:\b| /)"),
        ("pw", r"peace walker|^pw(?:\b| /)"),
        ("gz", r"ground zeroes"),
        ("tpp", r"phantom pain|^tpp(?:\b| /)|^mgsv(?:\b| /)"),
        ("rising_proto", r"rising avant platinum|^mgs rising$"),
        ("mgr", r"revengeance|^mgr(?:\b| /)"),
        ("survive", r"survive"), ("mobile", r"mobile"), ("touch", r"touch"),
        ("social_ops", r"social ops"), ("arcade", r"arcade"),
        ("vr_missions", r"integral / vr missions|^vr missions$"),
        ("mgs4", r"mgs4|metal gear solid 4"),
        ("mgs3", r"mgs3|metal gear solid 3|^snake eater$|^the joy$|^gru / thunderbolt$"),
        ("mgs2", r"mgs2|metal gear solid 2|sons of liberty"),
        ("mgs1", r"mgs1|metal gear solid \(1998\)|metal gear solid$"),
    ]
    for key, pattern in patterns:
        if re.search(pattern, s):
            return [key]
    raise ValueError("Unqualified edition: " + repr((raw, identity)))


def row_titles(row):
    # These historical costume episode fields contain visual briefs, not titles.
    overrides = {
        "costume:core__mistral:official--two-arm-configuration": ["mgr"],
        "costume:roster51__volgin_delta:official--shirtless-battle": ["delta"],
        "costume:archive__raiden_vr:official--x-raiden-substance": ["mgs2"],
        "costume:core__kaz_pw:official--swimsuit": ["pw"],
        "costume:completion44__diamond_dogs_scout_44:official--tactical-vest": ["tpp"],
        "costume:core__amanda_pw:official--injured-recovery": ["pw"],
        "costume:archive__paz:official--swimsuit": ["pw"],
        "costume:archive__paz:official--zeke-pilot": ["pw"],
        "costume:completion44__xof_trooper_44:official--hospital-raid": ["gz", "tpp"],
        "costume:core__old_snake:official--octocamo-digital-red": ["mgs4"],
        "costume:core__raven:original-concept:oc-002": ["mgs1"],
    }
    if row["id"] in overrides:
        return overrides[row["id"]], "explicit costume UID, target label and qualification; raw episode retained"
    return canonical_titles(row["episode"], row["id"]), "explicit historical episode field"


def asset_titles(asset):
    if asset.get("episodeKey"):
        assert asset["episodeKey"] in EPISODES
        return [asset["episodeKey"]]
    return canonical_titles(asset.get("episode", ""), asset["id"])


def count_rows(rows):
    return {
        "historicalRows": len(rows),
        "byCategory": dict(collections.Counter(r["category"] for r in rows)),
        "byBaselinePresence": dict(collections.Counter(r["baselinePresence"] for r in rows)),
        "byCurrentEvidenceClass": dict(collections.Counter(r["currentEvidenceClass"] for r in rows)),
        "rowsWithSelectedCandidate": sum(bool(r["selectedAssetIds"]) for r in rows),
        "rowsWithAnyVerifiedNamedSource": sum(r["verifiedNamedSourceCount"] > 0 for r in rows),
        "unresolvedAtP61WithoutSelectedCandidate": sum(r["baselinePresence"] == "unresolved" and not r["selectedAssetIds"] for r in rows),
        "partialGroups": sum(r["partialGroup"] for r in rows),
        "documentaryIdentitiesWithoutBody": sum(r["documentaryIdentityWithoutBody"] for r in rows),
        "actualGenerationRefusals": sum(r["generationRefusalPreserved"] for r in rows),
        "historicalHolds": sum(r["historicalHoldPreserved"] for r in rows),
        "automaticClosures": 0,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--git-repository", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path)
    args = parser.parse_args()
    output = args.output_dir or args.root / "docs/cqc-reprise/pass67"
    raw_tree = subprocess.check_output(
        ["git", "-C", str(args.git_repository), "ls-tree", "-rz", BASE],
        env={**os.environ, "GIT_NO_LAZY_FETCH": "1"}
    )
    tree = {}
    for line in raw_tree.split(b"\0"):
        if line:
            metadata, path = line.split(b"\t", 1)
            mode, kind, sha = metadata.decode().split()
            tree[path.decode()] = {"mode": mode, "kind": kind, "gitBlobSha": sha}
    inputs = []

    def read_pinned(path):
        data = (args.root / path).read_bytes()
        assert tree[path]["kind"] == "blob" and git_blob(data) == tree[path]["gitBlobSha"], "Input changed since P66: " + path
        inputs.append({"path": path, "gitBlobSha": tree[path]["gitBlobSha"],
                       "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)})
        return json.loads(data)

    inventory = read_pinned(INVENTORY)
    qualifications = {r["id"]: r for r in read_pinned(QUALIFICATION)["rows"]}
    roster = read_pinned(ROSTER)
    projectile_index = read_pinned(PROJECTILES)
    registries = [(p, read_pinned(p)) for p in REGISTRIES]
    atlas, runtime = read_pinned(ATLAS), read_pinned(RUNTIME)
    assert len(inventory["rows"]) == 277 and len(atlas["assets"]) == 48
    assets, archives, blocked = [], [], []
    for registry_path, registry in registries:
        for asset in registry["assets"]:
            assert asset["selected"] is True
            assert tree[asset["path"]]["gitBlobSha"] == asset["gitBlobSha"], asset["path"]
            assets.append({**asset, "_registry": registry_path})
        for archive in registry.get("archives", []):
            assert tree[archive["path"]]["gitBlobSha"] == archive["gitBlobSha"], archive["path"]
            archives.append({k: v for k, v in archive.items() if k in ["id", "path", "gitBlobSha", "reason", "workIds", "selected"]} | {"registry": registry_path, "presentInP66Tree": True})
        for request in registry.get("blockedRequests", []):
            blocked.append({k: v for k, v in request.items() if k not in ["generation", "prompt"]} |
                           {"registry": registry_path, "episodeKeys": ["mgr"], "noRetry": True})
    assert len(assets) == 225 and len(archives) == 18
    assert len({a["assetId"] for a in assets}) == len({a["path"] for a in assets}) == 225
    by_asset_id = {a["assetId"]: a for a in assets}
    by_work = collections.defaultdict(list)
    for asset in assets:
        for work_id in asset.get("workIds", []):
            by_work[work_id].append(asset["assetId"])
    historical_ids = {r["id"] for r in inventory["rows"]}
    assert {r["id"] for r in registries[0][1]["scopeRecords"]} == historical_ids
    for scope in registries[0][1]["scopeRecords"]:
        for asset_id in scope["selectedAssetIds"]:
            assert asset_id in by_asset_id
            assert scope["id"] in by_asset_id[asset_id]["workIds"], (scope["id"], asset_id)
    fighters = {f["uid"]: f for f in roster["fighters"]}
    assert len(fighters) == 354
    rows, reference_ledger = [], {}

    def check_named_source(source):
        path = source["path"]
        actual = tree.get(path)
        expected = source.get("gitBlobSha") or source.get("gitBlobSHA")
        result = {"path": path, "presentInP66Tree": bool(actual and actual["kind"] == "blob"),
                  "recordedGitBlobSha": expected,
                  "p66GitBlobSha": actual["gitBlobSha"] if actual else None,
                  "recordedBlobMatchesP66": actual["gitBlobSha"] == expected if actual and expected else None,
                  "pngDecodedByThisAudit": False}
        assert result["presentInP66Tree"], "Named source absent from P66 tree: " + path
        assert result["recordedBlobMatchesP66"] is not False, "Named source blob changed: " + path
        reference_ledger[path] = result
        return result

    for row in inventory["rows"]:
        key = row["id"]
        qualification = qualifications.get(key, {})
        title_keys, title_evidence = row_titles(row)
        selected_ids = unique(by_work[key])
        sources = [check_named_source(s) for s in row["candidates"] + row["existingSources"]]
        sources += [check_named_source(by_asset_id[a]) for a in selected_ids]
        sources = list({s["path"]: s for s in sources}.values())
        base_status, status = row["baselineStatus"], folded(row["status"])
        p61_status = qualification.get("p61Status", "")
        reason_class = qualification.get("reasonClass") or ""
        refusal = "generation refusee" in status or reason_class == "actual_service_refusal"
        hold = base_status == "historical_generation_hold"
        documentary = base_status == "documentary_identity_visual_body_not_established" or reason_class == "documentary_body_not_shown"
        portrait_only = reason_class == "portrait_not_full_body"
        group = base_status == "group_or_variant_inventory_incomplete" or (
            "group" in reason_class or "partial_scope" in p61_status
        ) or key in ["character:R-DELTA-FOX", "machine:zeke_configurations", "machine:mgr_enemy_suite"] or (
            row["category"] == "stages" and row["presenceClass"] == "unresolved"
        )
        edition = base_status == "edition_or_identity_profile_needs_review" or reason_class == "identity_and_edition_conflict"
        concept = base_status == "concept_or_cancelled_project_scope_requires_definition" or ":original-concept:" in key
        physical_projectile = row["category"] == "projectiles" and key.startswith("projectile:")
        if refusal:
            evidence_class = "generation_refusal_preserved"
        elif hold:
            evidence_class = "historical_hold_preserved"
        elif documentary:
            evidence_class = "documentary_identity_without_body"
        elif portrait_only:
            evidence_class = "portrait_without_established_full_body"
        elif group:
            evidence_class = "partial_group_with_candidate" if selected_ids else "partial_group_without_selected_candidate"
        elif edition:
            evidence_class = "edition_or_identity_review_with_candidate" if selected_ids else "edition_or_identity_review_without_selected_candidate"
        elif concept:
            evidence_class = "concept_scope_not_a_released_game_body"
        elif selected_ids or row["candidates"]:
            evidence_class = "selected_candidate_requires_review"
        elif row["existingSources"]:
            evidence_class = "prior_source_requires_review"
        elif row["presenceClass"] == "existing_alias":
            evidence_class = "existing_alias_no_new_body_claim"
        elif physical_projectile:
            evidence_class = "physical_projectile_reference_insufficient"
        else:
            evidence_class = "dedicated_source_or_reference_unestablished"
        linked = [s.strip() for s in qualification.get("linkedHistoricalUID", "").split(";") if s.strip()]
        if row["category"] == "costumes":
            linked.append(key.split(":")[1])
        linked = unique(linked)
        rows.append({
            "id": key, "category": row["category"], "label": row["label"],
            "rawEpisode": row["episode"], "episodeKeys": title_keys,
            "episodeMappingEvidence": title_evidence, "sharedEditionScope": len(title_keys) > 1,
            "baselinePresence": row["presenceClass"], "baselineStatus": base_status,
            "baselineDisplayStatus": row["status"], "baselineReason": row["reason"],
            "currentEvidenceClass": evidence_class, "selectedAssetIds": selected_ids,
            "selectedCandidateEpisodeKeys": unique(k for a in selected_ids for k in asset_titles(by_asset_id[a])),
            "namedSources": sources, "verifiedNamedSourceCount": len(sources),
            "partialGroup": group, "documentaryIdentityWithoutBody": documentary,
            "portraitWithoutEstablishedFullBody": portrait_only,
            "generationRefusalPreserved": refusal, "historicalHoldPreserved": hold,
            "editionOrIdentityReviewRequired": edition, "conceptOrOriginalDesignScope": concept,
            "physicalProjectileSourceUnestablished": physical_projectile,
            "linkedHistoricalUIDs": linked,
            "linkedCompiledProfileUIDs": [uid for uid in linked if uid in fighters],
            "compiledProfileLinkIsBodyEvidence": False,
            "nextEvidenceOrWork": row["nextEvidenceOrWork"],
            "scopeClosedByThisAudit": False, "absolute1to1CertifiedByThisAudit": False,
            "runtimeAdmissionByThisAudit": False,
            "sources": unique([INVENTORY, QUALIFICATION if qualification else INVENTORY]),
        })
    # Aliases establish runtime fallbacks, not a distinct physical design.
    projectile_fallbacks = []
    for alias in projectile_index["aliasesWithoutDedicatedSources"]:
        source = alias.get("existingFallbackSource")
        projectile_fallbacks.append({k: v for k, v in alias.items() if k != "existingFallbackSource"} |
                                    {"fallbackTreeEvidence": check_named_source(source) if source else None})
    roster_rows = []
    for fighter in roster["fighters"]:
        keys = canonical_titles(fighter["incarnation"], fighter["uid"])
        roster_rows.append({
            "uid": fighter["uid"], "name": fighter["name"],
            "rawIncarnation": fighter["incarnation"], "episodeKeys": keys,
            "pilotP62": fighter["pilotP62"],
            "inventoryRowsWithExplicitHistoricalUIDLink": [r["id"] for r in rows if fighter["uid"] in r["linkedHistoricalUIDs"]],
            "dedicatedBodyPresenceEstablishedByRoster": False,
        })
    source_ledger = [{
        "assetId": a["assetId"], "id": a["id"], "label": a["label"],
        "episodeKeys": asset_titles(a), "rawEpisode": a.get("episode"),
        "kind": a["kind"], "path": a["path"], "gitBlobSha": a["gitBlobSha"],
        "sha256": a["sha256"], "bytes": a["bytes"], "workIds": a.get("workIds", []),
        "registry": a["_registry"], "presentInP66Tree": True,
        "pngDecodedByThisAudit": False, "scopeClosedByThisAudit": False,
    } for a in assets]
    extensions = []
    for work_id in sorted(set(by_work) - historical_ids):
        source_ids = unique(by_work[work_id])
        extensions.append({
            "id": work_id, "selectedAssetIds": source_ids,
            "episodeKeys": unique(k for a in source_ids for k in asset_titles(by_asset_id[a])),
            "historicalP61Row": False, "scopeClosedByThisAudit": False,
        })
    summaries = []
    for key, label in EPISODES.items():
        title_rows = [r for r in rows if key in r["episodeKeys"]]
        title_sources = [a for a in source_ledger if key in a["episodeKeys"]]
        title_roster = [f for f in roster_rows if key in f["episodeKeys"]]
        edition_asset_ids = {a["assetId"] for a in title_sources}
        has_edition_candidate = lambda row: bool(edition_asset_ids.intersection(row["selectedAssetIds"]))
        counts = count_rows(title_rows)
        counts.update({
            "selectedSources": len(title_sources),
            "selectedSourcesByKind": dict(collections.Counter(a["kind"] for a in title_sources)),
            "compiledProfiles": len(title_roster),
            "selectedAtlasEntries": sum(a.get("episodeKey") == key for a in atlas["assets"]),
            "rowsWithSelectedCandidateForThisEdition": sum(has_edition_candidate(r) for r in title_rows),
            "unresolvedAtP61WithoutCandidateForThisEdition": sum(r["baselinePresence"] == "unresolved" and not has_edition_candidate(r) for r in title_rows),
            "partialGroupsWithoutCandidateForThisEdition": sum(r["partialGroup"] and not has_edition_candidate(r) for r in title_rows),
        })
        summaries.append({
            "episodeKey": key, "label": label, "counts": counts,
            "historicalRowIds": [r["id"] for r in title_rows],
            "unresolvedAtP61RowIds": [r["id"] for r in title_rows if r["baselinePresence"] == "unresolved"],
            "unresolvedAtP61WithoutEditionCandidateIds": [r["id"] for r in title_rows if r["baselinePresence"] == "unresolved" and not has_edition_candidate(r)],
            "partialGroupIds": [r["id"] for r in title_rows if r["partialGroup"]],
            "documentaryIdentityIds": [r["id"] for r in title_rows if r["documentaryIdentityWithoutBody"]],
            "refusalIds": [r["id"] for r in title_rows if r["generationRefusalPreserved"]],
            "historicalHoldIds": [r["id"] for r in title_rows if r["historicalHoldPreserved"]],
            "assessment": "documented_historical_scopes_require_review" if title_rows else "roster_only_no_specific_missing_body_established",
            "completeTitleInventoryClaimed": False,
        })
    counts = count_rows(rows)
    counts.update({
        "selectedSources": len(assets), "atlasEntries": len(atlas["assets"]),
        "archivedAttempts": len(archives), "preservedExtensionRefusals": len(blocked),
        "compiledProfiles": len(roster_rows),
        "explicitHistoricalUIDLinksToCompiledProfiles": sum(bool(r["linkedCompiledProfileUIDs"]) for r in rows),
        "distinctNamedInventoryOrFallbackSourcePaths": len(reference_ledger),
        "extensionsOutsideP61": len(extensions),
        "historicalRowsWithMultipleEditions": sum(r["sharedEditionScope"] for r in rows),
        "editionMemberships": sum(len(r["episodeKeys"]) for r in rows),
        "historicalPNGsDecoded": 0, "historicalPNGDownloads": 0,
    })
    report = {
        "schema": "cqc.p67.coverage-before.v1",
        "checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "baseCommit": BASE, "sourceInputs": inputs,
        "realGitTree": {"commit": BASE, "entries": len(tree), "readMethod": "git ls-tree -rz",
                        "noLazyFetch": True, "selectedSourceBlobIdentitiesVerified": 225,
                        "archivedBlobIdentitiesVerified": 18},
        "counts": counts,
        "runtimeBaseline": {"files": len(runtime["files"]), "references": len(runtime["references"]),
                            "totalBytes": runtime["totalBytes"]},
        "registries": [{"path": p, "selected": len(d["assets"]), "archives": len(d.get("archives", []))} for p, d in registries],
        "byCategory": {c: count_rows([r for r in rows if r["category"] == c]) for c in CATEGORIES},
        "byEpisode": summaries, "rows": rows, "selectedSources": source_ledger,
        "extensionsOutsideP61": extensions, "preservedArchives": archives,
        "preservedExtensionRefusals": blocked, "projectileFallbacks": projectile_fallbacks,
        "rosterProfiles": roster_rows,
        "limitations": [
            "The 277 P61 rows are scoped evidence records, not a count of individual missing bodies or of the full Metal Gear universe.",
            "The five registries account for 225 selected static sources, not every historical sprite in the complete Git tree.",
            "Tree presence establishes pinned blob identity only; this audit does not decode or visually recertify historical PNGs.",
            "Shared episode rows occur in every explicit member title; per-title totals are not additive. Global counts are deduplicated.",
            "One candidate can cover one view, avatar, costume, room or variant of a broad scope. No historical row is automatically closed.",
            "Roster profiles and historical UID links do not prove a dedicated full-body sprite, matching edition or playable admission.",
            "Raw costume episode fields that are visual briefs are mapped by exact UID, target label and existing qualification.",
            "Existing projectile/VFX fallback aliases are distinguished from dedicated physical projectile designs.",
            "No row is not evidence of completeness or absence. AC!D 2 Mobile has a compiled profile but no qualified P61 gap row.",
            "This report is pinned before P67: later assets or research do not retroactively alter these counts.",
        ],
        "scopeClosed": False, "absolute1to1Certified": False, "combatRuntimeIntegrated": False,
    }
    output.mkdir(parents=True, exist_ok=True)
    (output / "coverage-before.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    write_markdown(report, output / "AUDIT_OPUS.md")
    print(json.dumps({"status": "passed", "baseCommit": BASE, "counts": counts}, ensure_ascii=False, indent=2))


def write_markdown(report, output):
    # Kept here so both deliverables always use the same computed counts.
    counts = report["counts"]
    names = {"characters": "Personnages", "costumes": "Costumes", "stages": "Décors",
             "machines": "Machines / créatures", "projectiles": "Projectiles / fumée"}
    lines = [
        "# P67 — audit transversal des opus avant génération", "",
        f"Base immuable : {BASE} (P66). Données : [coverage-before.json](coverage-before.json).", "",
        "**277 lignes historiques croisées avec 225 sources sélectionnées, 48 dossiers Atlas, 18 archives et 354 profils compilés.** Les chemins nommés ont été rapprochés du véritable arbre Git ; aucun PNG historique n’a été téléchargé ou décodé pour cet audit. Ces nombres décrivent le registre CQC, pas un catalogue exhaustif de tous les corps, costumes ou décors de tous les jeux.", "",
        "## Ce que les comptes permettent d’affirmer", "",
        "P61 distingue 125 lignes ayant déjà un candidat, 54 avec une source antérieure, 1 alias existant et 97 non résolues. Ces statuts historiques sont conservés. Les associations P63 à P66 ajoutent des vues et variantes sans requalifier une famille entière en « terminée ».", "",
        f"Le rapprochement exact des workIds relie **{counts['rowsWithSelectedCandidate']} lignes** à au moins une des 225 sources. **{counts['unresolvedAtP61WithoutSelectedCandidate']} des 97 lignes initialement non résolues** n’ont aucun candidat sélectionné correspondant. Ce nombre rassemble groupes, identités documentaires, réserves d’édition, concepts et refus ; ce n’est pas une liste de corps prêts à dessiner.", "",
        f"**{counts['partialGroups']} portées sont explicitement partielles**, {counts['documentaryIdentitiesWithoutBody']} identités documentaires n’ont pas de corps établi, {counts['actualGenerationRefusals']} refus effectifs figurent dans les 277 lignes et {counts['historicalHolds']} blocages historiques sont conservés. Trois autres refus P64 sont suivis hors de ces lignes. Aucune clôture et aucune admission au combat sont produites par cet audit.", "",
        "## Ventilation des lignes historiques par catégorie", "",
        "| Catégorie | Lignes | Avec candidat | Non résolues sans candidat | Groupes partiels | Identités sans corps | Refus / blocages |",
        "|---|---:|---:|---:|---:|---:|---:|",
    ]
    for category, c in report["byCategory"].items():
        lines.append(f"| {names[category]} | {c['historicalRows']} | {c['rowsWithSelectedCandidate']} | {c['unresolvedAtP61WithoutSelectedCandidate']} | {c['partialGroups']} | {c['documentaryIdentitiesWithoutBody']} | {c['actualGenerationRefusals']} / {c['historicalHolds']} |")
    lines += [
        "", "## Ventilation par opus et édition", "",
        f"Les {counts['historicalRowsWithMultipleEditions']} lignes partagées comptent pour {counts['editionMemberships']} appartenances d’édition. Le tableau est **non additif**. « Sources » désigne les 225 sélections des cinq registres, pas tous les sprites du dépôt. « Profils » n’établit aucune présence de corps. La colonne sans candidat exige un candidat de l’édition concernée : un garde AC!D PSP ne couvre pas AC!D 2.", "",
        "| Opus / édition | Lignes P61 | Sources | Profils | Non résolues sans candidat de cette édition | Groupes partiels | Identités sans corps | Refus / blocages |",
        "|---|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for title in report["byEpisode"]:
        c = title["counts"]
        lines.append(f"| {title['label']} | {c['historicalRows']} | {c['selectedSources']} | {c['compiledProfiles']} | {c['unresolvedAtP61WithoutCandidateForThisEdition']} | {c['partialGroups']} | {c['documentaryIdentitiesWithoutBody']} | {c['actualGenerationRefusals']} / {c['historicalHolds']} |")
    lines += [
        "", "## Cibles étayées à qualifier avant chaque génération", "",
        "Ces cibles viennent de lacunes explicites. Elles indiquent où chercher une référence native ; elles ne remplacent pas son examen.", "",
        "| Famille | Portées à poursuivre | Limite à préserver |",
        "|---|---|---|",
        "| Metal Gear MSX / NES | Gardes et chiens d’Outer Heaven (R-MG1-03), séparés par version | Un garde ne clôt pas la famille. Frère de Jennifer et faux Madnar : exiger sprite, salle et dialogue identifiants. |",
        "| MG2 | Four Horsemen et enfants de Zanzibar | Un archétype ne prouve pas quatre membres. Gustav reste un concept, sans assimilation au jeu publié. |",
        "| MGS1 / TTS | Genome léger/lourd ; profils et secteurs propres à TTS | NBC/arctique ont déjà des sources. Un portrait Codec ne fournit pas un corps TTS. REX TTS reste refusé. |",
        "| MGS2 / VR | Otages Shell 1 ; arènes VR Substance | Marine Tanker déjà candidat. Rose/IA et Meryl Snake Tales : identité/édition à rapprocher. Gray Fox VR ne reçoit pas de kit Revengeance. |",
        "| MGS3 / Delta / 3DS | KGB, GRU, scientifiques ; FOX HUNT ; profil 3DS et scènes de sous-modes | PS2, Delta et 3DS restent distincts. Président/CIA/Pipo déjà candidats. Khrouchtchev reste voix/documentation sans corps natif établi. |",
        "| MPO / Plus | Soldats soviétiques, Ocelot Unit, personnel médical/scientifique, recrues régionales et invités | Identifier la variante et le jeu exact ; un modèle Plus ne ferme pas le groupe partagé. |",
        "| Peace Walker | Peace Sentinel, FSLN, configurations ZEKE | Nombreux véhicules déjà présents. Hideo : portrait sans corps complet établi. Projectiles Box Tank : design physique distinct à prouver. |",
        "| GZ / TPP | Jamais Vu à qualifier ; personnel hospitalier, interprètes, troupes, cibles et Diamond Dogs | Garde/JCS/prisonnier/Hideo GZ déjà présents. Agent DoD non rapproché ; Queequeg sans corps montré. XOF 1975 et 1984 restent séparés. |",
        "| MGS4 | Rebelles, résistance, PMC et Little John | Groupes ouverts malgré décors et costumes sélectionnés ; identifier modèle et équipement exacts. |",
        "| MGO1 / MGO2 / MGO3 | Avatars, classes et personnages uniques | Les cartes ne prouvent pas les corps. Un preset est une variante, pas l’uniforme universel d’une classe. |",
        "| Mobile / Touch / Arcade / Social Ops / AC!D Mobile | Groupe transversal R-SIDE-CATALOG ; actes Touch | MGS Mobile et deux décors Arcade déjà candidats. Une ligne partagée ne fournit pas tous les ennemis de cinq éditions. |",
        "| AC!D / AC!D 2 / Survive / Revengeance | Étages, variantes, acteurs et accessoires encore ouverts | P66 ajoute des fragments. FAR, Prototype, Captain et gardes restent partiels ; un décor ne clôt pas une mission. |",
        "", "### Identités et refus conservés", "",
        "Ghost Babel conserve six identités documentaires sans corps individuel établi : No. 4, Lieutenant Smith, John Parker, Steve Gardner, William Weah et le frère de Weasel. S’y ajoutent Commander South/Vermon CaTaffy (manuel NES), Harold Burton (AC!D), Harley Warren et Joel Marton (Survive), ainsi que les qualifications de Khrouchtchev et Queequeg. Un nom ou un profil ne fournit pas une silhouette.", "",
        "Les 12 blocages historiques de costumes sont inchangés, de même que REX TTS et le cyborg blindé Revengeance refusés en P61. Fragmentation Grenade, EM Grenade et Rocket Launcher refusés en P64 ne sont pas réessayés sous alias. Les 18 archives sont présentes mais exclues des 225 sélections.", "",
        "Snake’s Revenge possède deux lignes avec sources et un roster ; aucune lacune de corps supplémentaire n’est déduite. AC!D 2 Mobile possède un profil sans ligne P61 directement qualifiée : son inventaire spécifique reste à établir. Le projet initial MGS Rising et Gustav sont suivis comme projets/concepts sans assimilation à un corps de jeu publié.", "",
        "## Sources, rapprochement et limites de preuve", "",
        f"Les {len(report['sourceInputs'])} fichiers d’entrée ont été vérifiés octet pour octet contre leurs blobs P66. Les 225 PNG sélectionnés, les 18 archives et tous les chemins nommés par l’inventaire ou les alias ont une identité correspondante dans l’arbre réel. Cette preuve ne prétend pas les avoir redécodés ou revalidés visuellement.", "",
        "Les liens utilisent les workIds exacts et les UID historiques déclarés. Les 277 scopeRecords ont été rapprochés de l’inventaire. Les briefs de costumes rangés dans le champ episode sont interprétés par UID et qualification, en conservant le texte brut. Les lignes partagées restent multivaluées.", "",
        f"Les {counts['extensionsOutsideP61']} portées supplémentaires sont conservées hors du dénominateur de 277. Les 354 profils compilés servent au rapprochement des UID déclarés ; les emplacements de coups et obligations documentaires ne prouvent pas un sprite individuel.", "",
        "| Entrée vérifiée | Rôle |",
        "|---|---|",
        "| [Inventaire P61](../pass61/inventory.json) | 277 portées historiques |",
        "| [Qualification personnages](../pass61/audit/roster-qualification.json) | Identités, éditions, groupes et réserves |",
        "| [Index projectiles / VFX](../pass61/audit/projectile-vfx-source-index.json) | Alias et designs physiques non établis |",
        "| [Roster](../../cqc-bible/roster-coverage.json) | 354 profils, sans inférence de corps |",
        "| [Associations initiales](../../cqc-bible/asset-associations.json) | 177 sélections et 277 liens de portée |",
        "| [P63](../../cqc-bible/asset-associations-p63.json), [P64](../../cqc-bible/asset-associations-p64.json), [P65](../../cqc-bible/asset-associations-p65.json), [P66](../../cqc-bible/asset-associations-p66.json) | 17 + 11 + 6 + 14 sélections, réserves et archives |",
        "| [Catalogue Atlas](../../../public/cqc/data/cqc-p63-source-atlas.json) | 48 entrées avant P67 |", "",
        "Reproduction : python scripts/audit-cqc-p67-coverage.py --git-repository /chemin/du/clone-reel. Le script exige les textes exacts de P66 et lit git ls-tree sans récupération implicite. Le rapport est une photographie avant P67 ; ne pas le régénérer depuis des entrées déjà modifiées.", "",
    ]
    output.write_text("\n".join(lines))


if __name__ == "__main__":
    main()
