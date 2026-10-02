#!/usr/bin/env python3
"""Create deterministic lossless gzip chunks only from an explicitly root-frozen source."""
import argparse
import json
import sys
from lossless_chunks import chunk_frozen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True)
    parser.add_argument("--logical-path", required=True)
    parser.add_argument("--output", required=True, help="Absent output directory; parent must exist")
    parser.add_argument("--expected-source-sha256", required=True)
    parser.add_argument("--expected-source-bytes", required=True, type=int)
    parser.add_argument("--frozen-manifest", required=True)
    parser.add_argument("--expected-frozen-manifest-sha256", required=True)
    args = parser.parse_args()
    try:
        result = chunk_frozen(args.source, args.logical_path, args.output,
                              args.expected_source_sha256, args.expected_source_bytes,
                              args.frozen_manifest, args.expected_frozen_manifest_sha256)
    except (ValueError, OSError, EOFError) as error:
        print(json.dumps({"status": "failed", "reason": str(error),
                          "partialArtifactsPreserved": True}), file=sys.stderr)
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
