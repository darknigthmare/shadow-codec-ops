#!/usr/bin/env python3
"""Valide les données de l'audit P41 sans exécuter le jeu ni charger ses images.

Usage, depuis n'importe quel répertoire :
    python docs/audit-cqc-2026-10-23/scripts/validate-audit.py
    python docs/audit-cqc-2026-10-23/scripts/validate-audit.py --no-write
    python docs/audit-cqc-2026-10-23/scripts/validate-audit.py --require-deliverables

Seule écriture possible : data/validation_audit.json dans le dossier de cet audit.
--no-write affiche le résultat et ne crée ni ne modifie aucun fichier.
Les arbres Git sont lus avec ls-tree, sans -l et sans récupération automatique
d'objets. Les sources historiques hors SHA audité sont signalées séparément.
Ce contrôle ne valide ni les pixels, ni les animations jouées, ni la fidélité 1:1.
Bibliothèque standard Python uniquement ; aucun accès réseau.
"""

import argparse
import ast
import collections
import csv
import datetime
import html
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import urllib.parse
import xml.etree.ElementTree as ET
import zipfile


SOURCE_COMMIT = "ba4e30a09e9e95727b75a665e7b6ab07d9941aea"
REPO_SLUG = "darknigthmare/shadow-codec-ops"
AUDIT_RELATIVE = "docs/audit-cqc-2026-10-23"
WORKBOOK_RELATIVE = "outputs/CQC_AUDIT_COMPLET_2026-10-23.xlsx"
MOVE_SLOTS = {
    "light", "heavy", "low", "throw", "special", "specialForward",
    "specialBack", "specialDown", "utility", "super",
}
EXPECTED_COUNTS = {
    "roster": 380, "animation_fighters": 380, "narration_profiles": 380,
    "moves": 3800, "finishers": 1520, "variants": 597,
    "alternative_costumes": 217, "stages": 124, "stage_batches": 113,
    "rigs": 64, "bosses": 33, "machine_batches": 54, "modules": 5,
    "roster_tasks": 87, "costume_references": 315, "original_concepts": 20,
    "priority_batches": 42,
}


class Audit:
    def __init__(self, audit_dir, require_deliverables=False):
        self.root = audit_dir.resolve()
        self.repo = self.root.parents[1]
        self.require_deliverables = require_deliverables
        self.json_cache = {}
        self.csv_cache = {}
        self.checks = []
        self.counts = {}
        self.optional = []

    def check(self, name, ok, **details):
        self.checks.append({"check": name, "status": "passed" if ok else "failed", **details})

    def note(self, name, status="skipped", **details):
        self.checks.append({"check": name, "status": status, **details})

    def run(self, name, function):
        try:
            function()
        except (OSError, ValueError, KeyError, TypeError, ET.ParseError, zipfile.BadZipFile) as exc:
            self.check(name, False, error=f"{type(exc).__name__}: {exc}")

    def js(self, relative):
        if relative not in self.json_cache:
            self.json_cache[relative] = json.loads((self.root / relative).read_text(encoding="utf-8-sig"))
        return self.json_cache[relative]

    def cs(self, relative):
        if relative not in self.csv_cache:
            with (self.root / relative).open(encoding="utf-8-sig", newline="") as stream:
                reader = csv.DictReader(stream)
                rows = list(reader)
                if not reader.fieldnames or len(set(reader.fieldnames)) != len(reader.fieldnames):
                    raise ValueError(f"En-têtes CSV absents ou dupliqués : {relative}")
                if any(None in row or any(v is None for v in row.values()) for row in rows):
                    raise ValueError(f"Nombre de cellules CSV incohérent : {relative}")
                self.csv_cache[relative] = (reader.fieldnames, rows)
        return self.csv_cache[relative][1]

    def count(self, name, rows):
        actual = len(rows)
        expected = EXPECTED_COUNTS[name]
        self.counts[name] = actual
        self.check(f"count:{name}", actual == expected, expected=expected, actual=actual)

    def unique(self, name, rows, keys):
        if isinstance(keys, str):
            keys = (keys,)
        values = [tuple(row.get(key) for key in keys) for row in rows]
        duplicates = [list(value) for value, n in collections.Counter(values).items() if n > 1]
        empty = [i + 1 for i, value in enumerate(values) if any(x in (None, "") for x in value)]
        self.check(f"unique:{name}", not duplicates and not empty,
                   keys=list(keys), duplicates=duplicates[:20], empty_rows=empty[:20])
        return set(values)

    def same_set(self, name, left, right):
        left, right = set(left), set(right)
        self.check(name, left == right, left_count=len(left), right_count=len(right),
                   only_left=sorted(left - right)[:30], only_right=sorted(right - left)[:30])

    def compare_csv(self, relative, expected_rows, keys):
        """Compare toutes les colonnes exportées, indépendamment de l'ordre des lignes."""
        actual_rows = self.cs(relative)
        headers = self.csv_cache[relative][0]
        if isinstance(keys, str):
            keys = (keys,)
        self.unique(relative + ":csv", actual_rows, keys)
        self.unique(relative + ":json", expected_rows, keys)
        key = lambda row: tuple(str(row.get(k, "")) for k in keys)
        actual = {key(row): row for row in actual_rows}
        expected = {key(row): row for row in expected_rows}
        self.same_set(f"csv_json_keys:{relative}", actual, expected)
        known_fields = {field for row in expected_rows for field in row}
        mismatches = []
        compared = 0
        for identifier in sorted(actual.keys() & expected.keys()):
            for field in headers:
                compared += 1
                # A field may legitimately be absent from an individual JSON row
                # and exported as an empty CSV cell. Entirely unknown columns
                # still fail the comparison.
                if field not in known_fields or not cell_equal(actual[identifier][field], expected[identifier].get(field)):
                    mismatches.append({"key": list(identifier), "field": field,
                                       "csv": str(actual[identifier].get(field))[:180],
                                       "json": str(expected[identifier].get(field))[:180]})
        self.check(f"csv_json_values:{relative}", not mismatches,
                   compared_cells=compared, mismatch_count=len(mismatches), examples=mismatches[:20])

    def git(self, *arguments):
        # Git 2.51 supports GIT_NO_LAZY_FETCH. Disabling the promisor remote also
        # prevents an unavailable historical tree from causing a network fetch.
        environment = {**os.environ, "GIT_NO_LAZY_FETCH": "1", "GIT_OPTIONAL_LOCKS": "0",
                       "GIT_TERMINAL_PROMPT": "0"}
        return subprocess.run(["git", "-c", "remote.origin.promisor=false", *arguments],
                              cwd=self.repo, env=environment, capture_output=True, check=False)


def cell_equal(cell, expected):
    """Normalise uniquement les types connus de la cellule JSON correspondante."""
    if expected is None:
        return cell == ""
    if isinstance(expected, bool):
        return cell.strip().lower() == str(expected).lower()
    if isinstance(expected, (list, dict)):
        try:
            value = json.loads(cell)
        except (ValueError, TypeError):
            try:
                value = ast.literal_eval(cell)
            except (ValueError, SyntaxError):
                return False
        return value == expected
    if isinstance(expected, int):
        try:
            return int(cell) == expected
        except ValueError:
            return False
    if isinstance(expected, float):
        try:
            return float(cell) == expected
        except ValueError:
            return False
    return cell == str(expected)


def inventories(a):
    roster = a.js("02_roster_costumes.json")
    actors = a.js("data/animation_fighters.json")["fighters"]
    narration = a.js("data/narration_profils.json")
    lists = {
        "roster": roster["roster_present"], "animation_fighters": actors,
        "narration_profiles": narration, "moves": a.cs("data/animation_moves.csv"),
        "finishers": a.cs("data/animation_finishers.csv"),
        "variants": a.cs("data/animation_variants.csv"),
        "alternative_costumes": roster["costumes_presents"],
        "stages": a.js("03_stages_existants.json"),
        "stage_batches": a.js("03_stages_a_completer.json"),
        "rigs": a.js("03_rigs_existants.json"), "bosses": a.js("03_boss_fiches.json"),
        "machine_batches": a.js("03_machines_a_completer.json"),
        "modules": a.js("03_modules_separes.json"), "roster_tasks": roster["roster_lacunes"],
        "costume_references": roster["costumes_cibles"],
        "original_concepts": roster["propositions_originales"],
        "priority_batches": a.js("data/priorites.json"),
    }
    for name, rows in lists.items():
        a.count(name, rows)
    ids = {row["uid"] for row in lists["roster"]}
    for name in ("roster", "animation_fighters", "narration_profiles"):
        a.unique(name, lists[name], "uid")
        a.same_set(f"uid_roster:{name}", ids, (row["uid"] for row in lists[name]))
    for name in ("stages", "stage_batches", "rigs", "bosses", "machine_batches", "modules",
                 "roster_tasks", "costume_references", "original_concepts", "priority_batches"):
        a.unique(name, lists[name], "id")
    contract_anomalies = [{"uid": row["uid"], "moves": len(row["techniques"]),
                           "finishers": len(row["finishers_ids"]), "costumes": len(row["costumes_ids"])}
                          for row in actors if len(row["techniques"]) != 10
                          or {move["slot"] for move in row["techniques"]} != MOVE_SLOTS
                          or len(row["finishers_ids"]) != 4
                          or len(set(row["finishers_ids"])) != 4
                          or len(row["costumes_ids"]) != len(set(row["costumes_ids"]))]
    a.check("json_actor_contract_cardinality", not contract_anomalies, anomalies=contract_anomalies)

    move_rows = lists["moves"]
    a.unique("moves", move_rows, ("uid", "slot"))
    a.same_set("move_uids", ids, (row["uid"] for row in move_rows))
    per_uid = collections.defaultdict(set)
    for row in move_rows:
        per_uid[row["uid"]].add(row["slot"])
    bad_slots = {uid: sorted(slots) for uid, slots in per_uid.items() if slots != MOVE_SLOTS}
    a.check("ten_moves_per_uid", not bad_slots, expected_slots=sorted(MOVE_SLOTS), anomalies=bad_slots)
    a.same_set("move_ids_csv_json", ((row["uid"], row["slot"]) for row in move_rows),
               ((row["uid"], move["slot"]) for row in actors for move in row["techniques"]))
    empty_move_descriptions = [{"uid": row["uid"], "slot": row["slot"], "field": field}
                               for row in move_rows for field in
                               ("preparation_proposee", "action_proposee", "retour_propose", "critere_acceptation")
                               if not row[field].strip()]
    a.check("move_descriptions_present", not empty_move_descriptions,
            missing_count=len(empty_move_descriptions), examples=empty_move_descriptions[:20])

    finisher_rows = lists["finishers"]
    a.unique("finishers", finisher_rows, "finisher_id")
    a.same_set("finisher_uids", ids, (row["uid"] for row in finisher_rows))
    finisher_counts = collections.Counter(row["uid"] for row in finisher_rows)
    bad_finishers = {uid: count for uid, count in finisher_counts.items() if count != 4}
    a.check("four_finishers_per_uid", not bad_finishers, anomalies=bad_finishers)
    expected_finisher_pairs = {(row["uid"], finisher) for row in actors for finisher in row["finishers_ids"]}
    a.same_set("finisher_ids_csv_json", expected_finisher_pairs,
               ((row["uid"], row["finisher_id"]) for row in finisher_rows))
    a.check("finisher_storyboards_present", all(row["storyboard_propose"].strip() for row in finisher_rows))

    variants = lists["variants"]
    a.unique("variants", variants, ("uid", "costume_id"))
    variant_pairs = {(row["uid"], row["costume_id"]) for row in variants}
    original_pairs = {pair for pair in variant_pairs if pair[1] == "original"}
    alternative_pairs = variant_pairs - original_pairs
    a.same_set("variant_originals", {(uid, "original") for uid in ids}, original_pairs)
    a.check("variant_alternatives_count", len(alternative_pairs) == 217,
            expected=217, actual=len(alternative_pairs))
    a.same_set("variant_alternatives_roster", alternative_pairs,
               ((row["uid"], row["id"]) for row in roster["costumes_presents"]))
    a.same_set("variant_ids_csv_json", variant_pairs,
               ((row["uid"], costume) for row in actors for costume in row["costumes_ids"]))

    rig_ids = {row["id"] for row in lists["rigs"]}
    absent_rigs = sorted({row["rig_id"] for row in lists["bosses"] if row.get("rig_id")} - rig_ids)
    a.check("boss_rig_references", not absent_rigs, missing=absent_rigs)
    machine_uids = {row["uid"] for row in actors if row["route_machine"]}
    native = a.js("data/animation_native_catalog.json")
    native_ids = {row["uid"] for row in native["entries"]}
    a.check("native_catalog_count", len(native["entries"]) == 357, actual=len(native["entries"]), expected=357)
    a.check("runtime_route_counts", len(ids & native_ids) == 356 and len(machine_uids) == 24,
            native_body_routes=len(ids & native_ids), machine_routes=len(machine_uids))
    a.same_set("machine_routes_body_complement", ids - native_ids, machine_uids)
    optional_ids = {row["uid"] for row in native["originalFighters"]}
    a.same_set("optional_catalog_actor", native_ids - ids, optional_ids)
    optional_moves = a.cs("data/animation_optional_moves.csv")
    a.check("optional_original_separate", optional_ids == {"oc__parallaxe"} and len(optional_moves) == 10
            and {row["uid"] for row in optional_moves} == optional_ids,
            actor_ids=sorted(optional_ids), move_count=len(optional_moves))


def csv_json_consistency(a):
    roster = a.js("02_roster_costumes.json")
    for stem, section, key in (
        ("02_roster_present", "roster_present", "uid"),
        ("02_roster_lacunes", "roster_lacunes", "id"),
        ("02_costumes_presents", "costumes_presents", ("uid", "id")),
        ("02_costumes_cibles", "costumes_cibles", "id"),
        ("02_costumes_originaux_proposes", "propositions_originales", "id"),
    ):
        a.compare_csv(stem + ".csv", roster[section], key)
    a.check("roster_source_catalog_copy", roster["sources"] == a.js("02_sources_roster_costumes.json"))
    for stem in ("03_stages_existants", "03_stages_a_completer", "03_rigs_existants",
                 "03_boss_fiches", "03_machines_a_completer", "03_modules_separes", "03_sources"):
        a.compare_csv(stem + ".csv", a.js(stem + ".json"), "id")
    for stem, key in (("narration_profils", "uid"), ("narration_scenes", "scene_id"), ("priorites", "id")):
        a.compare_csv("data/" + stem + ".csv", a.js("data/" + stem + ".json"), key)

    actors = a.js("data/animation_fighters.json")["fighters"]
    projected_actors = []
    for row in actors:
        projection = dict(row)
        projection["groupes_partages"] = " ; ".join(k + " = " + ", ".join(v) for k, v in row["groupes_partages"].items())
        for field in ("techniques_une_region_principale", "costumes_ids"):
            projection[field] = " ; ".join(map(str, row[field]))
        projected_actors.append(projection)
    a.compare_csv("data/animation_fighters.csv", projected_actors, "uid")

    moves = {(row["uid"], row["slot"]): row for row in a.cs("data/animation_moves.csv")}
    mismatches = []
    for actor in actors:
        for move in actor["techniques"]:
            actual = moves.get((actor["uid"], move["slot"]), {})
            expected = {**move, "personnage": actor["personnage"], "opus": actor["opus"]}
            for field, value in expected.items():
                if field not in actual or not cell_equal(actual[field], value):
                    mismatches.append({"uid": actor["uid"], "slot": move["slot"], "field": field})
    a.check("move_compact_json_values", not mismatches, compared_moves=sum(len(x["techniques"]) for x in actors),
            mismatch_count=len(mismatches), examples=mismatches[:20])

    native_projection = []
    for row in a.js("data/animation_native_catalog.json")["entries"]:
        native_projection.append({
            "uid": row["uid"], "name": row["name"], "game": row["game"], "incarnation": row["incarnation"],
            "regions_distinctes": row["distinctRegions"], "directions_independantes": row["hasOpposite"],
            "miroir": row["mirror"], "groupes": ", ".join(row["actions"]),
            "groupes_une_region": ", ".join(name for name, action in row["actions"].items() if action["distinctRegions"] == 1),
            "reference_status": row["referenceStatus"],
        })
    a.compare_csv("data/animation_native_catalog.csv", native_projection, "uid")


def narration_consistency(a):
    profiles = a.js("data/narration_profils.json")
    scenes = a.js("data/narration_scenes.json")
    ids = {row["uid"] for row in profiles}
    a.unique("narration_scenes", scenes, "scene_id")
    unknown = sorted({row["uid"] for row in scenes} - ids)
    a.check("narration_scene_uids", not unknown, unknown=unknown)
    counts = collections.Counter(row["uid"] for row in scenes)
    wrong = [{"uid": row["uid"], "profile": row["intro_scenes"] + row["outro_scenes"], "scenes": counts[row["uid"]]}
             for row in profiles if counts[row["uid"]] != row["intro_scenes"] + row["outro_scenes"]]
    a.check("narration_scene_profile_counts", not wrong, anomalies=wrong[:20])
    a.check("narration_existing_story_counts", len(scenes) == 2124 and len(counts) == 354,
            scenes=len(scenes), profiles_with_scenes=len(counts), profiles_without_scenes=len(ids - counts.keys()))
    measured = a.js("data/etat_mesure.json")["comptages"]
    mapping = {"profils_versus": "roster", "techniques": "moves", "fiches_finishers": "finishers",
               "stages_registre_versus": "stages", "rigs_machines": "rigs"}
    differences = {key: {"measured": measured[key], "recounted": a.counts[name]}
                   for key, name in mapping.items() if measured[key] != a.counts[name]}
    a.check("measured_counts_reconciliation", not differences, differences=differences)
    commits = {"roster": a.js("02_roster_costumes.json")["commit"],
               "animations": a.js("data/animation_fighters.json")["commit"],
               "measured": a.js("data/etat_mesure.json")["source_commit"],
               "receipt": a.js("data/capture_receipt.json")["sourceCommit"]}
    a.check("source_commit_consistency", set(commits.values()) == {SOURCE_COMMIT}, commits=commits)
    receipt = a.js("data/capture_receipt.json")
    a.check("capture_scope_not_visual_or_gameplay", receipt["visualValidation"] is False
            and receipt["combatValidation"] is False)


def source_ids(a):
    groups = [
        ("roster_costumes", a.js("02_sources_roster_costumes.json"),
         a.js("02_roster_costumes.json")["roster_lacunes"] + a.js("02_roster_costumes.json")["costumes_cibles"]),
        ("stages_machines", a.js("03_sources.json"),
         a.js("03_stages_a_completer.json") + a.js("03_boss_fiches.json") + a.js("03_machines_a_completer.json")),
    ]
    for name, sources, rows in groups:
        a.unique("sources:" + name, sources, "id")
        ids = {row["id"] for row in sources}
        unknown = []
        for row in rows:
            references = row.get("source_ids", [])
            if isinstance(references, str):
                references = [references] if references else []
            unknown.extend({"id": row["id"], "source_id": value} for value in references if value not in ids)
        a.check("source_id_references:" + name, not unknown, unknown_count=len(unknown), examples=unknown[:20])


def without_fences(text):
    result = []
    fence = None
    for line in text.splitlines(keepends=True):
        match = re.match(r"^\s{0,3}(`{3,}|~{3,})", line)
        if match:
            token = match.group(1)
            if fence is None:
                fence = (token[0], len(token))
            elif token[0] == fence[0] and len(token) >= fence[1]:
                fence = None
            result.append("\n" if line.endswith("\n") else "")
        else:
            result.append(("\n" if line.endswith("\n") else "") if fence else line)
    return "".join(result)


def markdown_anchors(text):
    text = without_fences(text)
    explicit = re.findall(r"<[^>]+\b(?:id|name)\s*=\s*[\"']([^\"']+)[\"']", text, flags=re.I)
    anchors = set(html.unescape(value) for value in explicit)
    duplicates = [value for value, count in collections.Counter(explicit).items() if count > 1]
    seen = collections.Counter()
    headings = []
    lines = text.splitlines()
    for index, line in enumerate(lines):
        match = re.match(r"^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$", line)
        if match:
            headings.append(match.group(1))
        elif index and re.match(r"^ {0,3}(?:=+|-+)\s*$", line) and lines[index - 1].strip():
            headings.append(lines[index - 1].strip())
    for heading in headings:
        heading = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", heading)
        heading = html.unescape(re.sub(r"<[^>]*>", "", heading)).lower()
        slug = "".join(c for c in heading if c.isalnum() or c in " _-")
        slug = re.sub(r"\s", "-", slug)
        suffix = "" if not seen[slug] else "-" + str(seen[slug])
        seen[slug] += 1
        anchors.add(slug + suffix)
    return anchors, duplicates, len(explicit)


def markdown_links(text):
    """Destinations inline, définitions de référence et attributs HTML href/src.

    Les parenthèses imbriquées dans une destination inline sont conservées.
    Ce lecteur ciblé ne prétend pas remplacer le rendu intégral de CommonMark.
    """
    text = without_fences(text)
    result = []
    for match in re.finditer(r"\]\(\s*", text):
        index = match.end()
        if index >= len(text):
            continue
        if text[index] == "<":
            end = text.find(">", index + 1)
            if end != -1:
                result.append((text[index + 1:end], text.count("\n", 0, match.start()) + 1))
            continue
        start, depth = index, 0
        while index < len(text):
            char = text[index]
            if char == "\\":
                index += 2
                continue
            if char == "(":
                depth += 1
            elif char == ")":
                if depth == 0:
                    break
                depth -= 1
            elif char.isspace() and depth == 0:
                break
            index += 1
        if index > start:
            result.append((text[start:index], text.count("\n", 0, match.start()) + 1))
    for pattern in (r"(?m)^ {0,3}\[[^\]\n]+\]:\s*<?([^\s>]+)>?",
                    r"<(?:a|img)\b[^>]*?\b(?:href|src)\s*=\s*[\"']([^\"']+)[\"']"):
        result.extend((m.group(1), text.count("\n", 0, m.start()) + 1)
                      for m in re.finditer(pattern, text, flags=re.I))
    return result


def local_links(a):
    markdown = {path.resolve(): path.read_text(encoding="utf-8-sig") for path in a.root.rglob("*.md")}
    anchor_cache = {path: markdown_anchors(text) for path, text in markdown.items()}
    broken = []
    pending = []
    unknown_fragments = []
    checked_links = 0
    checked_anchors = 0
    for path, text in markdown.items():
        for destination, line in markdown_links(text):
            destination = html.unescape(re.sub(r"\\([()\[\] ])", r"\1", destination))
            parsed = urllib.parse.urlsplit(destination)
            if parsed.scheme or parsed.netloc or destination.startswith("//"):
                continue
            target_name = urllib.parse.unquote(parsed.path)
            if target_name.startswith("/"):
                target = (a.repo / target_name.lstrip("/")).resolve()
            else:
                target = (path.parent / target_name).resolve() if target_name else path
            checked_links += 1
            context = {"file": str(path.relative_to(a.root)), "line": line, "destination": destination}
            if not target.exists():
                optional_target = target in {(a.root / "README.md"), (a.root / WORKBOOK_RELATIVE)}
                if optional_target and not a.require_deliverables:
                    pending.append(context)
                else:
                    broken.append(context)
                continue
            if parsed.fragment:
                if target.suffix.lower() == ".md":
                    if target not in anchor_cache:
                        anchor_cache[target] = markdown_anchors(target.read_text(encoding="utf-8-sig"))
                    fragment = urllib.parse.unquote(parsed.fragment)
                    checked_anchors += 1
                    if fragment not in anchor_cache[target][0]:
                        broken.append({**context, "reason": "ancre absente"})
                else:
                    unknown_fragments.append(context)
    duplicate_explicit = [{"file": str(path.relative_to(a.root)), "anchors": value[1]}
                          for path, value in anchor_cache.items() if value[1] and path.is_relative_to(a.root)]
    a.check("local_markdown_links", not broken, markdown_files=len(markdown), checked_links=checked_links,
            checked_fragments=checked_anchors, broken_count=len(broken), broken=broken[:50])
    a.check("explicit_anchor_uniqueness", not duplicate_explicit,
            explicit_anchors=sum(value[2] for value in anchor_cache.values()), duplicates=duplicate_explicit)
    if pending:
        a.note("optional_deliverable_links", destinations=pending)
    if unknown_fragments:
        a.note("non_markdown_fragments", reason="Fragment non Markdown non interprété ; existence du fichier contrôlée.",
               destinations=unknown_fragments[:20])


def pinned_git_paths(a):
    current_refs = collections.defaultdict(set)
    historical = collections.defaultdict(set)
    code_paths = collections.defaultdict(set)
    git_url_pattern = re.compile(
        r"https://github\.com/" + re.escape(REPO_SLUG) +
        r"/(blob|tree)/([0-9a-fA-F]{40})/([^\s<>\"'`\]\\)]+)")
    raw_pattern = re.compile(
        r"https://raw\.githubusercontent\.com/" + re.escape(REPO_SLUG) +
        r"/([0-9a-fA-F]{40})/([^\s<>\"'`\]\\)]+)")
    for path in a.root.rglob("*"):
        if path.suffix.lower() not in (".md", ".json", ".csv") or path.name == "validation_audit.json":
            continue
        relative = str(path.relative_to(a.root))
        if path.suffix.lower() == ".csv":
            # Scan decoded cells, not CSV delimiters appended to an unquoted URL.
            text = "\n".join(value for row in a.cs(relative) for value in row.values())
        else:
            text = path.read_text(encoding="utf-8-sig")
        refs = [(kind, sha, value) for kind, sha, value in git_url_pattern.findall(text)]
        refs.extend(("blob", sha, value) for sha, value in raw_pattern.findall(text))
        for kind, sha, value in refs:
            value = urllib.parse.unquote(urllib.parse.urlsplit(value.rstrip(".,;:")).path)
            key = (kind, value)
            if sha.lower() == SOURCE_COMMIT:
                current_refs[key].add(relative)
            else:
                historical[(sha.lower(), kind, value)].add(relative)
        for value in re.findall(r"public/cqc/[A-Za-z0-9_./-]+\.(?:js|json|html|cjs|mjs|md)\b", text):
            code_paths[value].add(relative)

    tree = a.git("ls-tree", "-r", "--name-only", "-z", SOURCE_COMMIT)
    if tree.returncode:
        a.check("audited_git_tree_available", False, commit=SOURCE_COMMIT,
                error=tree.stderr.decode("utf-8", "replace")[:1000])
        return
    paths = {value.decode("utf-8", "surrogateescape") for value in tree.stdout.split(b"\0") if value}
    absent = []
    for (kind, value), owners in current_refs.items():
        exists = value in paths if kind == "blob" else any(p.startswith(value.rstrip("/") + "/") for p in paths)
        if not exists:
            absent.append({"kind": kind, "path": value, "referenced_by": sorted(owners)[:10]})
    absent_code = [{"path": value, "referenced_by": sorted(owners)[:10]}
                   for value, owners in code_paths.items() if value not in paths]
    a.check("pinned_source_git_paths", not absent and not absent_code,
            commit=SOURCE_COMMIT, git_tree_paths=len(paths), unique_pinned_links=len(current_refs),
            unique_plain_code_paths=len(code_paths), missing_links=absent, missing_plain_code_paths=absent_code,
            method="git ls-tree -r --name-only -z ; aucun blob ni image téléchargé")
    if historical:
        a.note("historical_git_references", status="warning",
               reason="Provenance héritée hors SHA audité : existence non contrôlée, aucun fetch effectué.",
               references=[{"commit": sha, "kind": kind, "path": path, "referenced_by": sorted(owners)}
                           for (sha, kind, path), owners in sorted(historical.items())])


def change_scope(a):
    # --no-renames includes both paths of a move as deletion/addition: moving a
    # tracked file from outside the audit cannot hide its original path.
    diff_options = ("--no-ext-diff", "--no-textconv", "--no-renames", "--name-only", "-z")
    commands = {
        "committed_since_source": ("diff", *diff_options, SOURCE_COMMIT, "HEAD", "--"),
        "staged": ("diff", *diff_options, "--cached", "--"),
        "tracked_worktree": ("diff", *diff_options, "--"),
        "untracked_within_audit": ("ls-files", "--others", "--exclude-standard", "-z", "--", AUDIT_RELATIVE + "/"),
    }
    origins = collections.defaultdict(set)
    partition_counts = {}
    for origin, command in commands.items():
        result = a.git(*command)
        if result.returncode:
            raise ValueError(f"{origin}: {result.stderr.decode('utf-8', 'replace')}")
        paths = {value.decode("utf-8", "surrogateescape") for value in result.stdout.split(b"\0") if value}
        partition_counts[origin] = len(paths)
        for path in paths:
            origins[path].add(origin)
    outside = [{"path": path, "origins": sorted(origin)} for path, origin in sorted(origins.items())
               if not path.startswith(AUDIT_RELATIVE + "/")]
    inside = [path for path in origins if path.startswith(AUDIT_RELATIVE + "/")]
    head = a.git("rev-parse", "--verify", "HEAD")
    if head.returncode:
        raise ValueError(head.stderr.decode("utf-8", "replace"))
    a.check("changed_files_documentation_scope", not outside, audit_prefix=AUDIT_RELATIVE + "/",
            source_commit=SOURCE_COMMIT, head_commit=head.stdout.decode("ascii").strip(),
            within_scope_count=len(inside), partitions=partition_counts, outside_scope=outside,
            scope="Diff SOURCE–HEAD, index, modifications des fichiers suivis et nouveaux fichiers du seul dossier audit.")


def deliverables(a):
    readme = a.root / "README.md"
    workbook = a.root / WORKBOOK_RELATIVE
    for name, path in (("readme", readme), ("workbook", workbook)):
        if path.is_file():
            a.check("deliverable_exists:" + name, True, path=str(path.relative_to(a.root)))
        elif a.require_deliverables:
            a.check("deliverable_exists:" + name, False, path=str(path.relative_to(a.root)))
        else:
            a.note("deliverable_exists:" + name, reason="Livrable optionnel pendant sa préparation ; activer --require-deliverables à la clôture.",
                   path=str(path.relative_to(a.root)))
    if not workbook.is_file():
        return
    ns = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    try:
        with zipfile.ZipFile(workbook) as package:
            required = {"[Content_Types].xml", "xl/workbook.xml", "xl/_rels/workbook.xml.rels"}
            absent = sorted(required - set(package.namelist()))
            a.check("workbook_package", not absent, missing=absent)
            if absent:
                return
            book = ET.fromstring(package.read("xl/workbook.xml"))
            names = [sheet.attrib["name"] for sheet in book.findall("s:sheets/s:sheet", ns)]
            a.check("workbook_sheet_count", len(names) == 21 and len(set(names)) == 21,
                    expected=21, actual=len(names), sheets=names)
            error_cells = []
            sheets_read = 0
            for filename in package.namelist():
                if re.fullmatch(r"xl/worksheets/sheet\d+\.xml", filename):
                    worksheet = ET.fromstring(package.read(filename))
                    sheets_read += 1
                    for cell in worksheet.findall(".//s:c[@t='e']", ns):
                        error_cells.append({"sheet_xml": filename, "cell": cell.attrib.get("r"),
                                            "value": cell.findtext("s:v", default="", namespaces=ns)})
            a.check("workbook_xml_and_excel_errors", sheets_read == len(names) and not error_cells,
                    parsed_worksheets=sheets_read, error_cells=error_cells[:30],
                    scope="XML et cellules d'erreur enregistrées ; aucune certification du rendu ni recalcul de formules.")
    except (OSError, ValueError, ET.ParseError, zipfile.BadZipFile, KeyError) as exc:
        if a.require_deliverables:
            raise
        a.note("workbook_in_preparation", status="warning", error=str(exc),
               reason="Rejouer avec --require-deliverables lorsque la génération est terminée.")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--no-write", action="store_true", help="Ne pas écrire data/validation_audit.json.")
    parser.add_argument("--require-deliverables", action="store_true", help="Exiger le README principal et le classeur XLSX final.")
    args = parser.parse_args()
    csv.field_size_limit(16 * 1024 * 1024)
    a = Audit(Path(__file__).resolve().parents[1], require_deliverables=args.require_deliverables)
    for name, function in (("inventories", inventories), ("csv_json_consistency", csv_json_consistency),
                           ("narration_consistency", narration_consistency), ("source_ids", source_ids),
                           ("local_links", local_links), ("pinned_git_paths", pinned_git_paths),
                           ("change_scope", change_scope), ("deliverables", deliverables)):
        a.run(name, lambda function=function: function(a))
    statuses = collections.Counter(check["status"] for check in a.checks)
    status = "failed" if statuses["failed"] else ("passed_with_warnings" if statuses["warning"] or statuses["skipped"] else "passed")
    report = {
        "schema": "cqc.audit.validation/1", "generated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "source_commit": SOURCE_COMMIT, "audit_directory": AUDIT_RELATIVE,
        "status": status, "require_deliverables": args.require_deliverables,
        "scope": "Rapprochement des données, cardinalités, références, liens locaux, arbre Git P41 et portée des fichiers modifiés.",
        "not_certified": ["Inspection des PNG", "Rendu visuel ou sonore", "Animations exécutées", "Gameplay",
                          "Fidélité 1:1", "Validité de toutes les sources web externes", "Arbres Git historiques hors P41"],
        "network_access": False, "image_blobs_read": False,
        "counts": a.counts, "check_totals": dict(statuses), "checks": a.checks,
    }
    if not args.no_write:
        (a.root / "data" / "validation_audit.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"status": status, "checks": dict(statuses), "counts": a.counts,
                      "failed_checks": [check for check in a.checks if check["status"] == "failed"],
                      "report_written": not args.no_write}, ensure_ascii=False, indent=2))
    return 1 if statuses["failed"] else 0


if __name__ == "__main__":
    sys.exit(main())
