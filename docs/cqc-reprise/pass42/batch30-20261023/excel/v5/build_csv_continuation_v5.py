#!/usr/bin/env python3
"""Append explicitly qualified UID links without changing historical CSV cells."""
from pathlib import Path
from collections import defaultdict
from datetime import datetime
from zoneinfo import ZoneInfo
import argparse, csv, hashlib, io, json

NAMES = {
    "CQC_FILE_GENERATION_V3.csv": 61,
    "CQC_INVENTAIRE_COSTUMES_V3.csv": 416,
    "CQC_PROFILS_MANQUANTS_V3.csv": 45,
    "SCENES_1692_A_PEINDRE_v0.56.csv": 1692,
    "RECITS_282_A_PEINDRE_v0.56.csv": 282,
}
ADDED = ["SuiviUIDLie", "SuiviStatutActuel", "SuiviLiensP41ParUID", "SuiviLiensP42ParUID", "SuiviQualificationLiens", "SuiviFideliteCible", "SuiviSourceSHA256", "SuiviManifesteP42SHA256"]

def digest(raw):
    return hashlib.sha256(raw).hexdigest()

def read_csv(path):
    text = path.read_text(encoding="utf-8-sig")
    dialect = csv.Sniffer().sniff(text[:12000], delimiters=",;\t")
    reader = csv.DictReader(io.StringIO(text), dialect=dialect)
    return list(reader.fieldnames), list(reader)

def write_csv(path, fields, rows):
    assert not path.exists(), "Preserve existing versions"
    with path.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields, delimiter=";", lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--sources", required=True, type=Path)
    parser.add_argument("--p41", required=True, type=Path)
    parser.add_argument("--p42", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    p41 = json.loads(args.p41.read_text())
    p42 = json.loads(args.p42.read_text())
    assert p42["schema"] == "cqc.pass42.fixed-batch30/1"
    assert len(p41["entries"]) == len(p42["entries"]) == 30
    assert p41["production"]["state"] == "READY"
    assert not any(entry.get("playableInP42") for entry in p42["entries"])
    assert digest(args.p42.read_bytes()) == "bee97de007bb1fc7bd9f7dadcec8f3e33d494480af57d7f3427f5d2cbf22fb8d"
    by41, by42 = defaultdict(list), defaultdict(list)
    for entry in p41["entries"]:
        by41[entry["uid"]].append(entry["entryID"])
    for entry in p42["entries"]:
        by42[entry["uid"]].append(entry["entryID"])
    args.output.mkdir(parents=True, exist_ok=True)
    differences = []
    for name, expected_count in NAMES.items():
        source = args.sources / name
        original = source.read_bytes()
        fields, rows = read_csv(source)
        assert len(rows) == expected_count
        assert not set(fields).intersection(ADDED)
        assert all(not str(value).startswith(("=", "+", "-", "@")) for row in rows for value in row.values()), "Unsafe imported formula prefix needs separate non-destructive handling"
        output = []
        linked41 = linked42 = 0
        for row in rows:
            # Equality only: no name, era or costume-label fuzzy matching.
            uid = row.get("uid", row.get("Identifiant", "")).split("__alt__", 1)[0]
            a41, a42 = by41.get(uid, []), by42.get(uid, [])
            linked41 += bool(a41)
            linked42 += bool(a42)
            output.append(dict(row, **{
                "SuiviUIDLie": uid,
                "SuiviStatutActuel": "Non réaudité actuellement",
                "SuiviLiensP41ParUID": " | ".join(a41),
                "SuiviLiensP42ParUID": " | ".join(a42),
                "SuiviQualificationLiens": "UID identique seulement ; aucune équivalence de costume, de scène ou de récit inférée. P41 READY vérifie des sources ; P42 contient des objectifs, sans achèvement inféré.",
                "SuiviFideliteCible": "1:1 à viser ; non certifié par cette ligne de suivi",
                "SuiviSourceSHA256": digest(original),
                "SuiviManifesteP42SHA256": digest(args.p42.read_bytes()),
            }))
        destination = args.output / (source.stem + "__SUIVI_P42_V5.csv")
        write_csv(destination, fields + ADDED, output)
        after_fields, after = read_csv(destination)
        assert after_fields == fields + ADDED
        assert len(after) == len(rows)
        assert all({key: actual[key] for key in fields} == before for before, actual in zip(rows, after))
        assert source.read_bytes() == original
        differences.append({
            "source": name, "sourceBytes": len(original), "sourceSHA256": digest(original),
            "derived": destination.name, "derivedBytes": destination.stat().st_size,
            "derivedSHA256": digest(destination.read_bytes()), "rowsBefore": len(rows), "rowsAfter": len(after),
            "sourceColumns": fields, "trackingColumnsAdded": ADDED, "originalCellChanges": 0,
            "originalRowsDeleted": 0, "historicalStatusChanges": 0,
            "rowsWithP41UIDLinks": linked41, "rowsWithP42UIDLinks": linked42,
            "uidLinksDoNotImplySameCostumeOrCompletion": True,
        })
    assert sum(item["rowsBefore"] for item in differences) == 2496
    report = {
        "schema": "cqc.pass42.csv-continuation-preservation/1",
        "createdAtParis": datetime.now(ZoneInfo("Europe/Paris")).isoformat(timespec="seconds"),
        "status": "PASS", "originalSourceFilesModified": False, "originalRows": 2496,
        "originalCellChanges": 0, "historicalStatusChanges": 0,
        "p41Source": args.p41.name, "p41SourceSHA256": digest(args.p41.read_bytes()),
        "p42Source": args.p42.name, "p42SourceSHA256": digest(args.p42.read_bytes()),
        "qualification": "Copied historical values remain historical. Only qualified UID links and evidence pins are appended; no current completion or missing-art status is inferred.",
        "files": differences,
    }
    path = args.output / "DIFF_CINQ_TABLEAUX_SOURCES_P42_V5.json"
    assert not path.exists()
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    summary = [{"Source": item["source"], "ExportDerive": item["derived"], "LignesConservees": item["rowsBefore"], "CellulesHistoriquesModifiees": 0, "StatutsHistoriquesModifies": 0, "ColonnesSuiviAjoutees": len(ADDED), "LignesLieesUIDP41": item["rowsWithP41UIDLinks"], "LignesLieesUIDP42": item["rowsWithP42UIDLinks"], "SourceSHA256": item["sourceSHA256"], "ExportSHA256": item["derivedSHA256"]} for item in differences]
    write_csv(args.output / "DIFF_CINQ_TABLEAUX_SOURCES_P42_V5.csv", list(summary[0]), summary)
    print(json.dumps({"status": "PASS", "files": len(differences), "historicalRowsPreserved": 2496, "changedHistoricalCells": 0, "report": str(path)}, ensure_ascii=False))

if __name__ == "__main__":
    main()
