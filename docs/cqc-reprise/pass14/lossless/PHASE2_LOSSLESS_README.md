# PASS14 phase-two closed portable delivery

Root supplied an explicitly closed446-file list SHA256 `ecd22c6df03c995bc2978bddb9a8e3482749574664b3003b7bfc780510b264cc` and independently rechecked every pin. Effective preparation produced spec SHA256 `187c1566c2bd38dddd49cc7a68e316f6dea895800ce669037beabd73984d6fc2` and selected portable prior-index SHA256 `e3807572bc56a335ad02dc953c1108460d251c231b18b0b1dc67d00f5f9263f7`. Root then approved that exact spec/index in `ROOT_ARCHIVE_GO_PHASE2_V1.json`; its SHA256 is `cee712ac8ec2c1cca09dcb33de799d765aea84cc8722b77a8767f0e5af0ad303`.

The two newly created volumes are immutable under `/tmp/cqc-pass14-production-preservation-v1/phase2-actual-01`:

| Volume | Bytes | SHA256 |
| --- | ---: | --- |
| pass14-phase2-lossless-001.zip | 8,388,597 | a31062d0623950824598f3f70fd8179652d327dd00dc221939d3a1e27ae892cd |
| pass14-phase2-lossless-002.zip | 4,258,665 | a2448eeaad617737337438085cafd2e3379b93e40afcb3a6a954da7505d84c63 |

Both are ZIP_STORED and at most8,388,608bytes. Together they store12,647,262bytes including directory overhead. Two equals the size lower bound. No PNG pixels were altered, cropped, resampled or recompressed. None of the existing phase-one or older archives was copied or modified.

Phase two preserves446 regular closed source paths /29,317,403logical bytes as407 unique objects /24,196,234bytes. Twenty-eight objects are reused by exact member from immutable phase one or published PASS13. The archive tool actually reconstructed every object, checked ZIP CRC, SHA and byte counts, then compared reconstructed data against all446 original closed sources. Six TX55 symlink paths are preserved as aliases to exact native objects already present in phase one.

Independent portable verification recovered all407 phase-two objects from only `S/docs/cqc-reprise/pass13/lossless`, the already-copied phase-one `S/docs/cqc-reprise/pass14/lossless` archives and the two new volumes. It repeated the reconstruction with all original producer, prior-index and absolute old-member archive paths changed to unavailable values, with identical results. All phase-one archive copies in S were also reverified against their pins.

The union of both phases contains617 unique objects /56,812,341bytes. The eight new ZIPs total55,242,369bytes. Cumulative logical source input is72,524,980bytes, below the128MiB global ceiling. The delivered manifest lists only phase-two artifacts: it does not ask Root to copy any phase-one ZIP again.

`PHASE2_CLOSED_PORTABLE_DELIVERY_V1.json` has explicit `{path,bytes,sha256,repositoryTarget}` rows. Root can copy them once to the indicated `docs/cqc-reprise/pass14/lossless` targets. The source index is renamed `LOSSLESS_RECONSTRUCTION_INDEX_PHASE2_V1.json` in Git to avoid colliding with phase one. Its portable archive repository paths remain exact. The manifest itself must also be copied as `docs/cqc-reprise/pass14/lossless/PHASE2_CLOSED_PORTABLE_DELIVERY_V1.json`; its own SHA is provided to Root separately, without a recursive self-pin.

After copying, verify without reading original producers:

```sh
python docs/cqc-reprise/pass14/lossless/restore_pass14_portable_v3.py \
  --index docs/cqc-reprise/pass14/lossless/LOSSLESS_RECONSTRUCTION_INDEX_PHASE2_V1.json \
  --repository-root .
```

To materialize equal-byte logical source and symlink-alias paths under a new folder, add `--output /tmp/cqc-pass14-phase2-restored-new`. The tool never writes into original absolute producer paths. Ordinary verification reconstructs all objects in memory and creates no additional source-byte tree on disk.

Preserved evidence includes the camera-occluded TX55 rig V1 refusal, corrected synthetic V2 approval, historical failed browser harnesses and actual HUD limitation, the later final HUD desktop/mobile proofs with their failed intermediate harness, immutable browser preparation scripts, Root's closed test/audit/runtime metadata and the phase-two quality/tool preparations. Qualifications and original editions are preserved; no absolute1:1 canon certificate is introduced. Public postpublication QA is excluded here and must enter a separate later closed extension.
