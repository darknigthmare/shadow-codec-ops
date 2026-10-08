# PASS21 incremental source preservation, batch3

This is source preservation only. Failed, rejected, pending, private and accepted artwork retain their literal source bytes and statuses. The snapshot does not admit candidates to the game.

The source read interval is 2026-10-08T14:14:02.028053+00:00 to 2026-10-08T14:14:19.352940+00:00. Producers were not globally paused. Every current source file had a stable size/inode/mtime read; 25 previous-only paths are retained with an explicit historical qualification. Later versions are outside this snapshot.

There are 5204 exact original paths: 5179 current reads and 25 previous-only retained paths, with 4848 unique mapped blob versions. The original batch2 snapshot and all58prior ZIPs are left unchanged. Historical bytes superseded at an identical local path remain in that previous snapshot.

Only 1004 new unique blobs (314181399 bytes) were packed. The14new archives total 226275741 bytes; each ZIP is below24MiB. No old ZIP was repacked. CAS metadata and mutable proofs were copied as read-only files;83native PNG originals were hardlinked without changing their bytes or inode permissions. Every source byte was rechecked during lossless packaging.

Original source paths are mapped by metadata/FULL_SNAPSHOT_ARCHIVE_MAP_ACTUAL_V1.json to either an existing batch2 ZIP or a new batch3 ZIP. The original3419Git paths and their object IDs are prerequisites for publication and must stay exact. Only the preservation branch is advanced, without force.

Restore from a full checkout of the source-preservation branch:

    python preservation/pass21/batches/v3/tools/restore_incremental_native_sources.py --repository-root . --delta-archive-dir preservation/pass21/batches/v3/lossless-delta-v1 --restore-to /tmp/cqc-native-source-restore

For bounded verification instead of a concurrent full checkout, append --verify-only --report /tmp/cqc-native-source-restoration-proof.json. Every original path is then materialized as a regular single-link file, read back, checked by SHA256 and GitSHA1 and its ZIP CRC, and only that generated scratch file is removed. The sequential proof validates all72archives including every old and new ZIP entry CRC. Existing unrelated files are never removed.

The full SOURCE_SNAPSHOT_ACTUAL_V1.json records read times, old/new references and literal top-level status strings as an overview. The complete frozen file bytes preserve all nested and other statuses, not just that overview. Authentication files, browser profiles, operational caches, user ZIP archives and large historical archive anchors are excluded. Their exclusions are recorded; this snapshot is not a new assertion about those unrelated archives.
