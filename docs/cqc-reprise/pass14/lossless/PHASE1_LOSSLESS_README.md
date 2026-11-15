# PASS14 phase-one closed lossless delivery

This phase preserves only the explicitly closed D native, D rig V2 (including rejected observed V1), REX stage V2, TX55 native and three individually closed synthetic browser roots, the prior quality audit, and narrowly selected earlier D/REX native/provenance members. It does not preserve any still-open Root, actual browser, or TX rig root.

Root approved the exact source spec SHA256 `b920cb04acabbe6d1bd4d01ee44bf054c4397d2f06e90c36051ff2eb0cf9f897` in `/tmp/cqc-pass14-root-integration/ROOT_ARCHIVE_GO_PHASE1_V3.json`; every 258 source pin was also checked independently by Root. The actual output is `/tmp/cqc-pass14-production-preservation-v1/phase1-actual-01`.

The six ZIP_STORED volumes contain 42,595,107 bytes; each is at most 8,388,608 bytes. Six equals the aggregate size lower bound. There are 237 unique objects (42,735,342 native/source bytes) for 258 regular source paths (43,207,577 logical bytes). Five objects (196,975 bytes) are read by exact member from the existing published PASS13 ZIPs. Fourteen original rig symlink paths and 26 native ImageGen output paths are logical aliases to identical archived objects, with the original link text and exact provenance preserved in the index. PNGs were not edited, compressed, cropped, or resampled.

Actual verification read every object from its ZIP, checked CRC/bytes/SHA, and compared reconstructed bytes with every closed source. A second independent portable verifier recovered all 237 objects using only published `docs/cqc-reprise/pass13/lossless` ZIPs and the six new volumes. The portable verification repeated successfully with original source, prior-index, and absolute old-archive paths set to unavailable values. An additional four-case synthetic verification really materialized source and alias bytes, and rejected a changed symlink, changed native tool original, and fragment offset gap. Fixtures were removed afterwards.

The prior D/REX future archives remain untouched. Needed historical members that are absent from published PASS13 are new object entries in the new six volumes. No whole older ZIP or older producer root was copied or recompressed. Four historical presentation base files were recovered directly from published Git commit `1556221aeb9c1b6e3c4ccbbdb4d4339c351dbd12` into a separate new preparation directory and matched the producer's old SHA pins; no current runtime equality is asserted for those historical files.

`PHASE1_CLOSED_PORTABLE_DELIVERY_V1.json` provides an explicit distribution list. Root can copy each listed file once to its `repositoryTarget`. The archive repository targets are encoded in each archive pin and must remain unchanged for portable reconstruction. The index's filename may change to the unique suggested phase-one name; the portable tool does not depend on its original filename.

Run portable verification after Root copies the artifacts:

```sh
python docs/cqc-reprise/pass14/lossless/restore_pass14_portable_v3.py \
  --index docs/cqc-reprise/pass14/lossless/LOSSLESS_RECONSTRUCTION_INDEX_PHASE1_V3.json \
  --repository-root .
```

To materialize all preserved logical files and equal-byte symlink/native-tool aliases under a new directory, add `--output /tmp/cqc-pass14-restored-new`. It never writes into original absolute producer paths. Without `--output`, all objects are actually reconstructed in memory and checked without another source-byte copy on disk.

Phase two must use a new exact source spec and a new Root GO after TX55 V1 rejection, corrected V2, final local browser evidence and Root posttests are closed. Phase-one ZIPs are reused by SHA/member without another copy. Phase-two names must use a different `archivePrefix`, and total logical phase-one plus phase-two inputs must remain within 128 MiB. Public checks belong to a subsequent closed extension after publication. The 16 MiB Root proof budget amendment is historical evidence to include once Root closes the corresponding metadata; it does not change the 8 MiB archive-volume limit.

Synthetic evidence is not actual combat certification. Canonical edition, source uncertainty, closest-candidate reservations, rejected camera/topology outputs and earlier failed collapse are preserved without a fabricated 1:1 certification.
