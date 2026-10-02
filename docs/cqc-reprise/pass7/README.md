# CQC PASS7 source and review bundle

The standalone CQC game and the CQC tab in Shadow Codec Ops share the separately verified `public/cqc/` runtime. This folder preserves PASS7 source-generation arguments, unchanged native image sheets, original-game references, rejected attempts, producer and integration reviews, native frame geometry, source-pixel combat origins, meaningful tests, QA evidence and the source changes that produced that runtime.

`source-code` contains exact standalone source bytes before the documented runtime HTML transformation. `before-source-integration` retains the preceding PASS6 bytes. `sprite-review` records frame mappings, source-bound origin marks and native sprite checks. `provenance` includes all preserved producer attempts and original references, including attempts that were rejected. Keeping an attempt does not approve it or create an OC.

`qa` includes the root-pinned final reports and any explicitly frozen browser evidence. Root report names and their SHA256 values are recorded in `QA_INPUT_FACTS.json`; final report hashes are rechecked before and after bundling. Preliminary and failed evidence remain separate from passing final reports. `previous-vercel-publication` proves the preceding PASS6 production deployment, and does not claim that PASS7 was already deployed.

The complete historical standalone source remains in the immutable archives and their pinned manifests. This evidence bundle is not a replacement for those full archives. No archive, historical source path, previous review bundle, public asset, Git branch or commit is deleted or rewritten by the bundler. PNG pixel bytes are unchanged; immutable PNG hardlinks may reduce local disk duplication while retaining all paths. Non-PNG files are copied independently.

Original incarnations and supported equipment are reviewed as `closest_supported`, with limits and Versus adaptations recorded explicitly. Absolute 1:1 fidelity is not certified by preserving files or passing technical checks. Runtime and browser validation must be assessed using the actual pinned final QA reports.
