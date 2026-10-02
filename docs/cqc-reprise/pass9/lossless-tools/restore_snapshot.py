#!/usr/bin/env python3
"""Verify or exclusively restore a lossless snapshot without reading the current runtime."""
import argparse
import json
import sys
import zlib
from lossless_chunks import restore


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--expected-manifest-sha256", required=True)
    parser.add_argument("--journal", required=True, help="Absent journal file; parent must exist")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--verify-only", action="store_true")
    mode.add_argument("--destination", help="Existing destination directory; restored target must be absent")
    args = parser.parse_args()
    try:
        result = restore(args.manifest, args.expected_manifest_sha256, args.journal,
                         verify_only=args.verify_only, destination=args.destination)
    except (ValueError, OSError, EOFError, zlib.error) as error:
        print(json.dumps({"status": "failed", "reason": str(error),
                          "partialArtifactsPreserved": True}), file=sys.stderr)
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
