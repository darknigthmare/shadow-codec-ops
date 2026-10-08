PASS21 source preservation — incremental batch4

Exact bytes and literal source statuses read during the snapshot interval; no future source versions or artwork approval is implied. The prior72 archives and3443 Git paths remain intact. Only newly unique objects are packed in delta ZIPs capped at22,000,000 bytes. Text CAS uses immutable regular files in /tmp; the one explicitly Root-sealed171MB Leone proof uses a regular workspace hardlink without duplicate storage. Oversized originals use ordered exact20,000,000-byte segments and retain a whole-file SHA256/GitSHA1 recipe; finalized PNG CAS uses regular hardlinks without changing source bytes, permissions or mtime. Restoration verifies each named source path as a regular single-link file in bounded scratch, then removes only that disposable scratch file. The complete source archive map supports repository-relative reconstruction.

Run restore_incremental_native_sources.py --repository-root REPO --delta-archive-dir REPO/preservation/pass21/batches/v4/lossless-delta-v1 --restore-to DEST (omit --verify-only to retain all restored files). Local preservation QA instead uses localArchivePath pointers and --metadata-dir plus --verify-only.

This is a separate source-preservation branch; the application release and private candidates have their own qualification. No sources, rejected art, user archives or prior versions are deleted.
