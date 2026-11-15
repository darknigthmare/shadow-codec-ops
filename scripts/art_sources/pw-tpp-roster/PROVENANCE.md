# Roster art provenance

Each public roster report stores source and output files as repository-relative paths with forward slashes. This makes source-hash verification portable to Linux builds and avoids publishing local user paths. Original generation-session paths may remain in private/local generation reports, but are not needed to verify public assets.

Copy an approved generated source into `scripts/art_sources` before running `importRosterActorBoard.py`. Sources or outputs outside this checkout are rejected by the public-report writer. The importer creates real, separately authored 16-pose sheets; it does not synthesize missing poses.

For older reports, `normalizeRosterProvenancePaths.py REPORT... --apply` changes path metadata only. It checks every source/sheet/idle SHA256 before migration and again afterwards, and does not write any bitmap. Omit `--apply` for a read-only report.
