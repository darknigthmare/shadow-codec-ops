#!/usr/bin/env python3
"""Metadata-only migration: make public roster provenance checkout-relative."""
import argparse
from hashlib import sha256
import json
from pathlib import Path
from importRosterActorBoard import REPOSITORY, portable_repository_path


def normalize_report(path: Path, apply: bool = False):
    report = json.loads(path.read_text(encoding="utf-8-sig"))
    if report.get("provenance") != "openai-authored-poses":
        raise ValueError(f"Not a roster report: {path}")
    entries = [report["source"], *report["outputs"].values()]
    changed = False
    verified = []
    for entry in entries:
        old = entry["file"]
        candidate = Path(old.replace("\\", "/"))
        if not candidate.is_absolute():
            candidate = REPOSITORY / candidate
        relative = portable_repository_path(candidate)
        digest = sha256(candidate.read_bytes()).hexdigest()
        if digest != entry["sha256"]:
            raise ValueError(f"SHA256 mismatch, metadata untouched: {candidate}")
        entry["file"] = relative
        changed |= old != relative
        verified.append((candidate, digest))
    if apply and changed:
        path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    for candidate, digest in verified:
        if sha256(candidate.read_bytes()).hexdigest() != digest:
            raise ValueError(f"Unexpected bitmap change: {candidate}")
    return {"report": portable_repository_path(path), "changed": changed,
            "applied": apply and changed, "verifiedBitmaps": len(verified)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("reports", type=Path, nargs="+")
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    print(json.dumps([normalize_report(path, args.apply) for path in args.reports], indent=2))
