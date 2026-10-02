#!/usr/bin/env python3
"""Tiny adversarial fixtures only; never opens the actual R/S catalog."""
import copy
import gzip
import hashlib
import json
import os
from pathlib import Path
import random
import sys
import time
import unittest
from unittest import mock
import uuid

import lossless_chunks as lc

RUN = lc.FIXTURE_ROOT / ("run-" + uuid.uuid4().hex)


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


class LosslessTests(unittest.TestCase):
    def setUp(self):
        self.root = RUN / self._testMethodName
        self.root.mkdir(parents=True)
        self.data = random.Random(4709).randbytes(12345)
        self.source = self.root / "source.bin"
        self.source.write_bytes(self.data)
        self.expected = hashlib.sha256(self.data).hexdigest()
        self.output = self.root / "snapshot"
        self.before = lc.seal(self.source.stat())

    def chunks(self, chunk_bytes=2048):
        result = lc.chunk_fixture(str(self.source), "data/catalog.json", str(self.output),
                                  self.expected, len(self.data), chunk_bytes)
        self.manifest_path = Path(result["manifestPath"])
        self.manifest = json.loads(self.manifest_path.read_text())
        self.manifest_sha = result["manifestSha256"]
        return result

    def mutate_manifest(self, mutate):
        mutate(self.manifest)
        self.manifest_path.write_text(json.dumps(self.manifest))
        self.manifest_sha = sha(self.manifest_path)

    def verify(self, name="verify.ndjson"):
        return lc.restore(str(self.manifest_path), self.manifest_sha,
                          str(self.root / name), verify_only=True)

    def destination(self):
        dest = self.root / "restored"
        dest.mkdir()
        return dest

    def assert_failed_journal(self, name):
        entries = [json.loads(line) for line in (self.root / name).read_text().splitlines()]
        self.assertEqual(entries[-1]["event"], "failed")
        self.assertTrue(entries[-1]["partialArtifactsPreserved"])

    def freeze(self, **updates):
        value = {"schema": lc.FREEZE_SCHEMA, "status": "frozen", "confirmedByRoot": True,
                 "entryCount": 43, "files": [{"path": str(self.source),
                 "bytes": len(self.data), "sha256": self.expected}]}
        value.update(updates)
        path = self.root / "synthetic-fixture-freeze.json"
        path.write_text(json.dumps(value))
        return path, sha(path)

    def test_roundtrip_multiple_parts_full_sha_and_git_blob(self):
        result = self.chunks()
        self.assertEqual(result["parts"], 7)
        self.assertEqual(result["uncompressedArchiveCopies"], 0)
        expected_git = hashlib.sha1(b"blob 12345\0" + self.data).hexdigest()
        self.assertEqual(result["source"]["originalGitBlobSha1"], expected_git)
        self.assertEqual(self.verify()["currentRuntimeSourcesRead"], 0)
        dest = self.destination()
        restored = lc.restore(str(self.manifest_path), self.manifest_sha,
                              str(self.root / "restore.ndjson"), False, str(dest))
        self.assertTrue(restored["wroteRestoredFile"])
        self.assertEqual((dest / "data/catalog.json").read_bytes(), self.data)
        self.assertEqual(lc.seal(self.source.stat()), self.before)

    def test_deterministic_compressed_parts_independent_of_output_name(self):
        self.chunks()
        second = self.root / "another-snapshot"
        lc.chunk_fixture(str(self.source), "data/catalog.json", str(second),
                         self.expected, len(self.data), 2048)
        self.assertEqual((second / "SNAPSHOT_CHUNKS.json").read_bytes(),
                         self.manifest_path.read_bytes())
        for row in self.manifest["parts"]:
            self.assertEqual((second / row["path"]).read_bytes(),
                             (self.output / row["path"]).read_bytes())

    def test_empty_source_roundtrip(self):
        self.source.write_bytes(b"")
        self.data = b""
        self.expected = hashlib.sha256(b"").hexdigest()
        result = self.chunks()
        self.assertEqual(result["parts"], 1)
        self.assertEqual(self.verify()["source"]["originalBytes"], 0)

    def test_exact_chunk_boundary_has_no_extra_empty_part(self):
        self.source.write_bytes(self.data[:4096])
        self.data = self.data[:4096]
        self.expected = hashlib.sha256(self.data).hexdigest()
        self.assertEqual(self.chunks()["parts"], 2)
        self.verify()

    def test_decoding_crosses_1mib_boundary_with_bounded_outputs(self):
        self.data = b"abcd" * ((lc.READ_BYTES + 54321) // 4)
        self.source.write_bytes(self.data)
        self.expected = hashlib.sha256(self.data).hexdigest()
        self.chunks(chunk_bytes=lc.CHUNK_BYTES)
        lengths = []
        full = hashlib.sha256()
        def consume(data):
            lengths.append(len(data))
            full.update(data)
        row = self.manifest["parts"][0]
        lc.stream_part(str(self.output / row["path"]), row, consume)
        self.assertGreaterEqual(len([size for size in lengths if size]), 2)
        self.assertLessEqual(max(lengths), lc.READ_BYTES)
        self.assertEqual(full.hexdigest(), self.expected)
        self.verify()

    def test_source_reads_are_bounded(self):
        real_fdopen = os.fdopen
        sizes = []
        inode = self.source.stat().st_ino

        class Reader:
            def __init__(inner, handle):
                inner.handle = handle
            def __enter__(inner):
                return inner
            def __exit__(inner, *args):
                inner.handle.close()
            def read(inner, size):
                sizes.append(size)
                self.assertGreater(size, 0)
                self.assertLessEqual(size, lc.READ_BYTES)
                return inner.handle.read(size)

        def wrapped(fd, *args, **kwargs):
            is_source = os.fstat(fd).st_ino == inode
            handle = real_fdopen(fd, *args, **kwargs)
            return Reader(handle) if is_source else handle

        with mock.patch.object(lc.os, "fdopen", wrapped):
            self.chunks()
        self.assertGreater(len(sizes), 1)

    def test_pending_root_freeze_rejected_before_source_open_or_output(self):
        path, pinned = self.freeze(confirmedByRoot=False)
        opened = []
        original = lc.open_file
        def track(value):
            opened.append(os.fspath(value))
            return original(value)
        with mock.patch.object(lc, "open_file", track), self.assertRaises(lc.SnapshotError):
            lc.chunk_frozen(str(self.source), "data/catalog.json", str(self.output),
                            self.expected, len(self.data), str(path), pinned)
        self.assertEqual(opened, [str(path), str(path)])
        self.assertFalse(self.output.exists())

    def test_old_39_freeze_cannot_authorize_43_source(self):
        path, pinned = self.freeze(entryCount=39, schema="cqc.pass8.current-source-freeze/1")
        with self.assertRaises(lc.SnapshotError):
            lc.chunk_frozen(str(self.source), "data/catalog.json", str(self.output),
                            self.expected, len(self.data), str(path), pinned)
        self.assertFalse(self.output.exists())

    def test_supported_freeze_schemas_and_production_fixed_16mib(self):
        for index, schema in enumerate(sorted(lc.FREEZE_SCHEMAS)):
            path, pinned = self.freeze(schema=schema)
            result = lc.chunk_frozen(str(self.source), "data/catalog.json",
                                    str(self.root / f"prod-fixture-{index}"),
                                    self.expected, len(self.data), str(path), pinned)
            manifest = json.loads(Path(result["manifestPath"]).read_text())
            self.assertEqual(manifest["compression"]["chunkBytes"], 16777216)
            self.assertEqual(manifest["authorization"]["entryCount"], 43)
            self.assertEqual(manifest["authorization"]["manifestSchema"], schema)

    def test_frozen_manifest_sha_and_source_pins_rejected(self):
        path, pinned = self.freeze()
        for freeze_sha, source_sha, size in [("0" * 64, self.expected, len(self.data)),
                                            (pinned, "0" * 64, len(self.data)),
                                            (pinned, self.expected, len(self.data) + 1)]:
            with self.assertRaises(lc.SnapshotError):
                lc.chunk_frozen(str(self.source), "data/catalog.json", str(self.output),
                                source_sha, size, str(path), freeze_sha)
        self.assertFalse(self.output.exists())

    def test_fixture_api_cannot_read_runtime_or_other_sources(self):
        with mock.patch.object(lc, "open_file", side_effect=AssertionError("must not open")):
            with self.assertRaises(lc.SnapshotError):
                lc.chunk_fixture("/workspace/cqc-game-working/cqc-versus-v056/data/combat-sprite-catalog-v1.json",
                                 "data/catalog.json", str(self.output), self.expected, len(self.data))

    def test_fixture_api_rejects_hardlinked_sources(self):
        os.link(self.source, self.root / "another-hardlink.bin")
        with self.assertRaises(lc.SnapshotError):
            self.chunks()
        self.assertFalse(self.output.exists())

    def test_existing_output_is_never_overwritten(self):
        self.output.mkdir()
        historic = self.output / "historic.txt"
        historic.write_text("preserve")
        with self.assertRaises(FileExistsError):
            self.chunks()
        self.assertEqual(historic.read_text(), "preserve")
        self.assertEqual(list(self.output.iterdir()), [historic])

    def test_complete_source_sha_failure_preserves_parts_and_journal(self):
        with self.assertRaises(lc.SnapshotError):
            lc.chunk_fixture(str(self.source), "data/catalog.json", str(self.output),
                             "0" * 64, len(self.data), 2048)
        self.assertEqual(len(list((self.output / "parts").iterdir())), 7)
        self.assertFalse((self.output / "SNAPSHOT_CHUNKS.json").exists())
        rows = [json.loads(line) for line in (self.output / "journal.ndjson").read_text().splitlines()]
        self.assertEqual(rows[-1]["event"], "failed")

    def test_source_metadata_drift_blocks_final_manifest(self):
        original = lc.HashedWriter.write
        changed = False
        def write(writer, data):
            nonlocal changed
            if not changed:
                os.chmod(self.source, 0o400)
                changed = True
            return original(writer, data)
        with mock.patch.object(lc.HashedWriter, "write", write), self.assertRaises(lc.SnapshotError):
            self.chunks()
        self.assertFalse((self.output / "SNAPSHOT_CHUNKS.json").exists())
        self.assertTrue((self.output / "journal.ndjson").exists())

    def test_source_path_replacement_blocks_final_manifest(self):
        original = lc.HashedWriter.write
        changed = False
        def write(writer, data):
            nonlocal changed
            if not changed:
                self.source.rename(self.root / "retained-original.bin")
                self.source.write_bytes(self.data)
                changed = True
            return original(writer, data)
        with mock.patch.object(lc.HashedWriter, "write", write), self.assertRaises(lc.SnapshotError):
            self.chunks()
        self.assertFalse((self.output / "SNAPSHOT_CHUNKS.json").exists())

    def test_source_symlink_and_component_symlink_rejected(self):
        alias = self.root / "source-link.bin"
        alias.symlink_to(self.source)
        alias_dir = self.root / "alias"
        alias_dir.symlink_to(self.root, target_is_directory=True)
        for source in [alias, alias_dir / self.source.name]:
            with self.assertRaises(OSError):
                lc.chunk_fixture(str(source), "data/catalog.json", str(self.output),
                                 self.expected, len(self.data), 2048)
        self.assertFalse(self.output.exists())

    def test_corrupt_compressed_part_preserves_restore_partial(self):
        self.chunks()
        part = self.output / self.manifest["parts"][-1]["path"]
        raw = bytearray(part.read_bytes())
        raw[10] ^= 0x80
        part.write_bytes(raw)
        dest = self.destination()
        with self.assertRaises((ValueError, lc.zlib.error)):
            lc.restore(str(self.manifest_path), self.manifest_sha,
                       str(self.root / "failed-restore.ndjson"), False, str(dest))
        self.assertFalse((dest / "data/catalog.json").exists())
        self.assertEqual(len(list((dest / "data").glob(".cqc-restore-*.partial"))), 1)
        self.assert_failed_journal("failed-restore.ndjson")

    def test_part_order_offset_and_raw_sizes_are_strict(self):
        self.chunks()
        for mutate in [lambda d: d["parts"].reverse(),
                       lambda d: d["parts"][0].update(offset=1),
                       lambda d: d["parts"][0].update(uncompressedBytes=2047),
                       lambda d: d["parts"][0].update(path="../escape.gz"),
                       lambda d: d["source"].update(logicalPath="data//catalog.json"),
                       lambda d: d.update(extra="unsupported"),
                       lambda d: d["source"].update(originalBytes=True)]:
            value = copy.deepcopy(self.manifest)
            mutate(value)
            with self.assertRaises(lc.SnapshotError):
                lc.validate_manifest(value)

    def test_full_source_sha_and_git_blob_are_both_checked(self):
        self.chunks()
        for index, field in enumerate(["originalSha256", "originalGitBlobSha1"]):
            base = json.loads(self.manifest_path.read_text())
            self.manifest["source"][field] = "0" * len(self.manifest["source"][field])
            self.manifest_path.write_text(json.dumps(self.manifest))
            self.manifest_sha = sha(self.manifest_path)
            with self.assertRaises(lc.SnapshotError):
                self.verify(f"bad-full-{index}.ndjson")
            self.manifest = base
            self.manifest_path.write_text(json.dumps(base))

    def test_raw_part_sha_and_compressed_sha_are_both_checked(self):
        self.chunks()
        for index, field in enumerate(["sha256", "uncompressedSha256"]):
            value = copy.deepcopy(self.manifest)
            value["parts"][0][field] = "0" * 64
            self.manifest_path.write_text(json.dumps(value))
            self.manifest_sha = sha(self.manifest_path)
            with self.assertRaises(lc.SnapshotError):
                self.verify(f"bad-part-{index}.ndjson")

    def test_gzip_trailing_data_and_concatenated_member_rejected(self):
        self.chunks()
        part = self.output / self.manifest["parts"][0]["path"]
        base = part.read_bytes()
        for index, trailing in enumerate([b"trailing", gzip.compress(b"more", mtime=0)]):
            part.write_bytes(base + trailing)
            self.manifest["parts"][0].update(bytes=part.stat().st_size, sha256=sha(part))
            self.manifest_path.write_text(json.dumps(self.manifest))
            self.manifest_sha = sha(self.manifest_path)
            with self.assertRaises(lc.SnapshotError):
                self.verify(f"trailing-{index}.ndjson")

    def test_decompression_bomb_bound_rejected_before_publication(self):
        self.chunks()
        part = self.output / self.manifest["parts"][0]["path"]
        with part.open("wb") as handle:
            with gzip.GzipFile(filename="", mode="wb", fileobj=handle, mtime=0,
                               compresslevel=9) as gz:
                gz.write(b"z" * 100000)
        self.manifest["parts"][0].update(bytes=part.stat().st_size, sha256=sha(part))
        self.manifest_path.write_text(json.dumps(self.manifest))
        self.manifest_sha = sha(self.manifest_path)
        with self.assertRaisesRegex(lc.SnapshotError, "exceeded frozen size"):
            self.verify("bomb.ndjson")
        self.assert_failed_journal("bomb.ndjson")

    def test_truncated_gzip_fails_even_with_compressed_hash_repin(self):
        self.chunks()
        part = self.output / self.manifest["parts"][0]["path"]
        part.write_bytes(part.read_bytes()[:-2])
        self.manifest["parts"][0].update(bytes=part.stat().st_size, sha256=sha(part))
        self.manifest_path.write_text(json.dumps(self.manifest))
        self.manifest_sha = sha(self.manifest_path)
        with self.assertRaisesRegex(lc.SnapshotError, "Truncated"):
            self.verify("truncated.ndjson")

    def test_manifest_pin_duplicate_keys_and_symlink_rejected(self):
        self.chunks()
        with self.assertRaises(lc.SnapshotError):
            lc.restore(str(self.manifest_path), "0" * 64,
                       str(self.root / "bad-manifest-pin.ndjson"))
        duplicate = self.root / "duplicate.json"
        duplicate.write_text('{"schema":"a","schema":"b"}')
        with self.assertRaises(lc.SnapshotError):
            lc.restore(str(duplicate), sha(duplicate), str(self.root / "duplicates.ndjson"))
        alias = self.root / "manifest-link.json"
        alias.symlink_to(self.manifest_path)
        with self.assertRaises(OSError):
            lc.restore(str(alias), self.manifest_sha, str(self.root / "manifest-symlink.ndjson"))

    def test_compressed_part_and_parts_directory_symlinks_rejected(self):
        self.chunks()
        part = self.output / self.manifest["parts"][0]["path"]
        retained = part.with_name("retained.gz")
        part.rename(retained)
        part.symlink_to(retained)
        with self.assertRaises(OSError):
            self.verify("part-symlink.ndjson")
        parts = self.output / "parts"
        parts.rename(self.output / "retained-parts")
        parts.symlink_to(self.output / "retained-parts", target_is_directory=True)
        with self.assertRaises(OSError):
            self.verify("parts-dir-symlink.ndjson")

    def test_existing_destination_and_symlink_are_never_overwritten(self):
        self.chunks()
        dest = self.destination()
        (dest / "data").mkdir()
        target = dest / "data/catalog.json"
        target.write_bytes(b"historic")
        before = lc.seal(target.stat())
        with self.assertRaises(lc.SnapshotError):
            lc.restore(str(self.manifest_path), self.manifest_sha,
                       str(self.root / "existing-target.ndjson"), False, str(dest))
        self.assertEqual(lc.seal(target.stat()), before)
        target.rename(dest / "data/historic.json")
        target.symlink_to(dest / "data/historic.json")
        with self.assertRaises(lc.SnapshotError):
            lc.restore(str(self.manifest_path), self.manifest_sha,
                       str(self.root / "target-symlink.ndjson"), False, str(dest))
        self.assertEqual((dest / "data/historic.json").read_bytes(), b"historic")

    def test_destination_component_symlink_rejected(self):
        self.chunks()
        dest = self.destination()
        other = self.root / "other"
        other.mkdir()
        (dest / "data").symlink_to(other, target_is_directory=True)
        with self.assertRaises(OSError):
            lc.restore(str(self.manifest_path), self.manifest_sha,
                       str(self.root / "destination-component.ndjson"), False, str(dest))
        self.assertEqual(list(other.iterdir()), [])

    def test_racing_destination_publication_is_exclusive(self):
        self.chunks()
        dest = self.destination()
        original_link = os.link
        def racing_link(source, target, **kwargs):
            fd = os.open(target, os.O_WRONLY | os.O_CREAT | os.O_EXCL,
                         0o600, dir_fd=kwargs["dst_dir_fd"])
            os.write(fd, b"racing historic file")
            os.close(fd)
            return original_link(source, target, **kwargs)
        with mock.patch.object(lc.os, "link", racing_link), self.assertRaises(FileExistsError):
            lc.restore(str(self.manifest_path), self.manifest_sha,
                       str(self.root / "racing-target.ndjson"), False, str(dest))
        self.assertEqual((dest / "data/catalog.json").read_bytes(), b"racing historic file")
        self.assertEqual(len(list((dest / "data").glob(".cqc-restore-*.partial"))), 1)
        self.assert_failed_journal("racing-target.ndjson")

    def test_existing_journal_is_never_reused_or_overwritten(self):
        self.chunks()
        journal = self.root / "historic.ndjson"
        journal.write_bytes(b"historic journal\n")
        with self.assertRaises(FileExistsError):
            lc.restore(str(self.manifest_path), self.manifest_sha, str(journal))
        self.assertEqual(journal.read_bytes(), b"historic journal\n")

    def test_verify_only_is_independent_of_original_source(self):
        self.chunks()
        self.source.rename(self.root / "retained-original-source.bin")
        self.source.write_bytes(b"unrelated future source")
        with mock.patch.object(lc, "target_parent", side_effect=AssertionError("no destination writes")):
            result = self.verify()
        self.assertFalse(result["wroteRestoredFile"])
        self.assertEqual(result["source"]["originalSha256"], self.expected)


def main():
    RUN.mkdir(parents=True)
    started = time.monotonic()
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(LosslessTests)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    evidence = {"schema": "cqc.lossless-snapshot-chunks.fixture-evidence/1",
                "status": "passed" if result.wasSuccessful() else "failed",
                "tests": result.testsRun, "failures": len(result.failures),
                "errors": len(result.errors), "elapsedSeconds": round(time.monotonic() - started, 3),
                "fixtureRoot": str(RUN), "allFixtureArtifactsPreserved": True,
                "realCatalogRead": False, "realCatalogCompressed": False,
                "runtimeSourceWrites": 0, "gitOperations": 0, "apiOperations": 0,
                "fixtureFileBytes": sum(p.stat().st_size for p in RUN.rglob("*")
                                        if p.is_file() and not p.is_symlink()),
                "sourceTools": [{"path": str(lc.TOOL_ROOT / name),
                                 "bytes": (lc.TOOL_ROOT / name).stat().st_size,
                                 "sha256": sha(lc.TOOL_ROOT / name)} for name in
                                ["lossless_chunks.py", "chunk_snapshot.py", "restore_snapshot.py",
                                 "test_lossless_chunks.py"]],
                "qualification": "Tiny local byte-preservation and adversarial fixtures; not production catalog QA."}
    path = RUN / "FIXTURE_EVIDENCE.json"
    path.write_text(json.dumps(evidence, indent=2) + "\n")
    print(json.dumps({"status": evidence["status"], "tests": evidence["tests"],
                      "evidencePath": str(path), "fixtureFileBytes": evidence["fixtureFileBytes"]}))
    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    raise SystemExit(main())
