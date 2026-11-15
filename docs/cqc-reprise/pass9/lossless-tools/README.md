# Lossless PASS9 catalog snapshots

These Linux/Python 3 tools use only the standard library and require procfs
(`/proc/self/fd`) for publication from an open descriptor. They preserve the original
bytes without parsing or rewriting the catalog. The producer writes gzip parts
directly from a root-frozen source; it never creates an uncompressed archive copy.
Production raw parts are 16 MiB, source reads and decompressed output blocks are
at most 1 MiB, and every compressed part must remain strictly below 90 MiB.
Gzip uses level 9, an empty filename and `mtime=0`.

`SNAPSHOT_CHUNKS.json` has schema `cqc.lossless-snapshot-chunks/1`. It records the
original byte count, SHA256 and Git blob SHA1; ordered offsets and raw/compressed
sizes and SHA256 for each part; and the exact root-freeze manifest SHA256. The
Git digest covers `blob <originalBytes>\0` followed by all original bytes.
The top-level `status` is `byte-exact-lossless`; `files` contains exactly one row
with `logicalPath`, `originalBytes`, `originalSha256`, `originalGitBlob` and
`parts`. Production publication uses the logical path
`source-code/data/combat-sprite-catalog-v1.json`. The full SHA256 covers the
original bytes alone. Source inode, mode, owner, size,
mtime, ctime and link count are checked before and after reading.

The producer CLI requires an externally supplied source SHA256 and byte count,
an explicitly pinned freeze manifest, `status: "frozen"`,
`confirmedByRoot: true` and `entryCount: 43`. Accepted freeze schemas are
`cqc.pass9.current-source-freeze/1` and `cqc.pass8.current-source-freeze/1`, with
`files: [{path, bytes, sha256}, ...]`. Reusing a 39-entry freeze is rejected before
opening the source. The selected source row must exactly match both explicit pins.
The caller must obtain those values from the final root-confirmed freeze;
this tool does not confirm the freeze or inspect the other source rows' content.

After that confirmation, the producer invocation is:

```sh
python /ABS/TOOLS/chunk_snapshot.py \
  --source /ABS/FROZEN/data/combat-sprite-catalog-v1.json \
  --logical-path source-code/data/combat-sprite-catalog-v1.json \
  --output /ABS/ABSENT-SNAPSHOT-DIRECTORY \
  --expected-source-sha256 ROOT_FROZEN_SOURCE_SHA256 \
  --expected-source-bytes ROOT_FROZEN_SOURCE_BYTES \
  --frozen-manifest /ABS/FINAL_ROOT_FREEZE.json \
  --expected-frozen-manifest-sha256 ROOT_CONFIRMED_FREEZE_SHA256
```

The output directory must be absent and its parent must exist. The producer
reports the exact snapshot manifest SHA256 for the following steps.
Keep all three files `chunk_snapshot.py`, `restore_snapshot.py` and
`lossless_chunks.py` together if distributing these tools.

Verification reads only the pinned manifest and its compressed parts. It does
not read the current catalog or the historical root-freeze source paths:

```sh
python /ABS/TOOLS/restore_snapshot.py \
  --manifest /ABS/SNAPSHOT/SNAPSHOT_CHUNKS.json \
  --expected-manifest-sha256 PINNED_SNAPSHOT_MANIFEST_SHA256 \
  --journal /ABS/EXISTING-DIRECTORY/ABSENT-VERIFY-JOURNAL.ndjson \
  --verify-only
```

To restore, replace `--verify-only` with `--destination /ABS/EXISTING-DIRECTORY`.
The final logical target must be absent, even if an existing file has identical
bytes. The tool verifies all compressed/raw digests and the complete SHA256 and
Git blob SHA1 before publishing the output using an exclusive hard link from
the still-open written descriptor. Temporary-name substitution cannot publish
different bytes. The descriptor and named inodes are checked before and after
publication; a detected post-link race retains the correct published inode and
substituted temporary, records `publishedBeforeFailure: true`, and fails. A
target created concurrently is preserved; it is never overwritten. All path
components reject symlinks, `..`, empty components, backslashes and drive paths.
Parts must have the precise order and canonical `parts/part-000001.gz` names.
Extra manifest fields, duplicate JSON keys, concatenated gzip members, trailing
gzip bytes and decompression beyond the declared size are rejected.

Every restoration requires a fresh journal path. Producer journals live in the
fresh output directory. Journals are append-only and fsynced. Failed or interrupted
runs retain their journals, compressed parts, pending manifests and restoration
partials; choose a new output/journal for a retry. The tools never resume a failed
run silently or delete historical files. Successful runs remove only their own
newly created publication temporary after exclusive publication.

Tests run with `python /ABS/TOOLS/test_lossless_chunks.py`. Their internal-only
fixture API accepts sources and outputs below this tool's `fixture-runs`
directory, rejects hard-linked sources, and allows tiny raw parts to exercise
multi-part behavior. There is no fixture bypass in the production CLI. The
test evidence identifies all fixtures and code digests. `--tests NAME ...`
selects explicit targeted cases and records their scope. These tests certify
local byte preservation and guards, not actual PASS9 catalog QA, a deployment,
a Git commit or exact artistic fidelity. The PASS8 restore recipe was inspected
as a read-only origin reference; this version accepts only the generic schema
above and does not rewrite the PASS8 recipe or snapshots.
