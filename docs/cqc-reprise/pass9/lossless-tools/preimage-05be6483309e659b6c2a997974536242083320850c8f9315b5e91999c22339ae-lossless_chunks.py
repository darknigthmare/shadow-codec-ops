#!/usr/bin/env python3
"""Bounded-memory, exact-byte snapshot chunks; no network or repository writes."""
from __future__ import annotations

import gzip
import hashlib
import json
import math
import os
from pathlib import Path
import re
import stat
import uuid
import zlib

SCHEMA = "cqc.lossless-snapshot-chunks/1"
FREEZE_SCHEMA = "cqc.pass9.current-source-freeze/1"
FREEZE_SCHEMAS = {FREEZE_SCHEMA, "cqc.pass8.current-source-freeze/1"}
FROZEN_ENTRY_COUNT = 43
CHUNK_BYTES = 16 * 1024 * 1024
READ_BYTES = 1024 * 1024
MAX_COMPRESSED_BYTES = 90 * 1024 * 1024
MAX_MANIFEST_BYTES = 2 * 1024 * 1024
TOOL_ROOT = Path(__file__).absolute().parent
FIXTURE_ROOT = TOOL_ROOT / "fixture-runs"
SHA256 = re.compile(r"[0-9a-f]{64}\Z")
SHA1 = re.compile(r"[0-9a-f]{40}\Z")


class SnapshotError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise SnapshotError(message)


def integer(value, minimum=0, maximum=None):
    require(type(value) is int and value >= minimum and
            (maximum is None or value <= maximum), "Invalid integer or size")
    return value


def digest(value, pattern=SHA256):
    require(isinstance(value, str) and pattern.fullmatch(value), "Invalid digest")
    return value


def relative(value):
    require(isinstance(value, str) and value and "\\" not in value and "\0" not in value,
            "Invalid relative path")
    parts = value.split("/")
    require(all(p and p not in (".", "..") for p in parts), "Unsafe path component")
    require(not value.startswith("/") and not re.match(r"^[A-Za-z]:", value),
            "Absolute or drive path forbidden")
    return parts


def absolute(value):
    value = os.fspath(value)
    require(value.startswith("/") and "\\" not in value and "\0" not in value,
            "An absolute POSIX path is required")
    if value == "/":
        return []
    return relative(value[1:])


def open_directory(path, create=False):
    """Walk each component through directory descriptors, rejecting symlinks."""
    parts = absolute(path)
    fd = os.open("/", os.O_RDONLY | os.O_DIRECTORY)
    try:
        for component in parts:
            if create:
                try:
                    os.mkdir(component, 0o700, dir_fd=fd)
                    os.fsync(fd)
                except FileExistsError:
                    pass
            new = os.open(component, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                          dir_fd=fd)
            os.close(fd)
            fd = new
        return fd
    except BaseException:
        os.close(fd)
        raise


def open_file(path):
    parts = absolute(path)
    require(parts, "A regular file is required")
    parent = open_directory("/" + "/".join(parts[:-1]))
    try:
        fd = os.open(parts[-1], os.O_RDONLY | os.O_NOFOLLOW, dir_fd=parent)
        require(stat.S_ISREG(os.fstat(fd).st_mode), "Non-regular file forbidden")
        return fd
    except BaseException:
        if "fd" in locals():
            os.close(fd)
        raise
    finally:
        os.close(parent)


def seal(info):
    return (info.st_dev, info.st_ino, info.st_mode, info.st_uid, info.st_gid,
            info.st_size, info.st_mtime_ns, info.st_ctime_ns, info.st_nlink)


def stable_file(fd, path, before):
    require(seal(os.fstat(fd)) == before, "File metadata changed while reading")
    check = open_file(path)
    try:
        require(seal(os.fstat(check)) == before, "File path changed while reading")
    finally:
        os.close(check)


def duplicate_keys(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, "Duplicate JSON key")
        result[key] = value
    return result


def read_json(path, expected_sha=None):
    if expected_sha is not None:
        digest(expected_sha)
    fd = open_file(path)
    try:
        before = seal(os.fstat(fd))
        require(before[5] <= MAX_MANIFEST_BYTES, "Manifest exceeds 2 MiB limit")
        with os.fdopen(os.dup(fd), "rb") as handle:
            raw = handle.read(MAX_MANIFEST_BYTES + 1)
        require(len(raw) <= MAX_MANIFEST_BYTES, "Manifest exceeds 2 MiB limit")
        actual = hashlib.sha256(raw).hexdigest()
        require(expected_sha is None or actual == expected_sha, "Manifest SHA256 mismatch")
        stable_file(fd, path, before)
        value = json.loads(raw.decode("utf-8"), object_pairs_hook=duplicate_keys,
                           parse_constant=lambda _: (_ for _ in ()).throw(
                               SnapshotError("Non-finite JSON value")))
        return value, actual
    finally:
        os.close(fd)


def exact_keys(value, expected):
    require(type(value) is dict and set(value) == set(expected), "Unexpected manifest fields")


def root_authorization(source, expected_sha, expected_bytes, freeze_path, freeze_sha):
    """Must finish before opening the production source descriptor."""
    absolute(source)
    digest(expected_sha)
    integer(expected_bytes)
    freeze, actual = read_json(freeze_path, freeze_sha)
    require(type(freeze) is dict and freeze.get("schema") in FREEZE_SCHEMAS,
            "Unsupported root-frozen source manifest")
    require(freeze.get("confirmedByRoot") is True and freeze.get("status") == "frozen",
            "Root confirmation and frozen status are required")
    require(type(freeze.get("entryCount")) is int and
            freeze["entryCount"] == FROZEN_ENTRY_COUNT,
            "The final 43-entry root freeze is required")
    rows = freeze.get("files")
    require(type(rows) is list and rows, "Frozen manifest has no source files")
    seen = set()
    for row in rows:
        require(type(row) is dict and {"path", "bytes", "sha256"} <= set(row),
                "Invalid frozen source row")
        absolute(row["path"])
        integer(row["bytes"])
        digest(row["sha256"])
        require(row["path"] not in seen, "Duplicate frozen source path")
        seen.add(row["path"])
    selected = [row for row in rows if row["path"] == os.fspath(source)]
    require(len(selected) == 1 and selected[0]["bytes"] == expected_bytes and
            selected[0]["sha256"] == expected_sha,
            "Explicit source pins differ from root-frozen source")
    return {"kind": "root-frozen-source", "manifestPath": os.fspath(freeze_path),
            "manifestSha256": actual, "manifestSchema": freeze["schema"],
            "confirmedByRoot": True, "sourceState": "frozen", "entryCount": FROZEN_ENTRY_COUNT}


class Journal:
    """Exclusive, append-only journal. Errors and partial artifacts remain on disk."""
    def __init__(self, path):
        parts = absolute(path)
        require(parts, "Journal path is required")
        parent = open_directory("/" + "/".join(parts[:-1]))
        try:
            self.fd = os.open(parts[-1], os.O_WRONLY | os.O_CREAT | os.O_EXCL |
                              os.O_NOFOLLOW, 0o600, dir_fd=parent)
            os.fsync(parent)
        finally:
            os.close(parent)
        self.path = os.fspath(path)

    def add(self, event, **facts):
        raw = (json.dumps({"event": event, **facts}, sort_keys=True,
                          ensure_ascii=True) + "\n").encode("utf-8")
        view = memoryview(raw)
        while view:
            written = os.write(self.fd, view)
            require(written > 0, "Journal write stalled")
            view = view[written:]
        os.fsync(self.fd)

    def close(self):
        os.close(self.fd)


class HashedWriter:
    def __init__(self, handle):
        self.handle = handle
        self.hash = hashlib.sha256()
        self.bytes = 0

    def write(self, data):
        require(self.bytes + len(data) < MAX_COMPRESSED_BYTES,
                "Compressed part exceeds the GitHub blob safety bound")
        written = self.handle.write(data)
        require(written == len(data), "Short compressed write")
        self.hash.update(data)
        self.bytes += written
        return written

    def flush(self):
        self.handle.flush()


def new_output_directory(path):
    parts = absolute(path)
    require(parts, "Output must be an absent directory")
    parent = open_directory("/" + "/".join(parts[:-1]))
    try:
        os.mkdir(parts[-1], 0o700, dir_fd=parent)
        os.fsync(parent)
        return os.open(parts[-1], os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                       dir_fd=parent)
    finally:
        os.close(parent)


def publish_json(dir_fd, name, data):
    raw = (json.dumps(data, indent=2, sort_keys=True) + "\n").encode("utf-8")
    require(len(raw) <= MAX_MANIFEST_BYTES, "Generated manifest exceeds limit")
    temporary = "." + name + ".pending"
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                 0o600, dir_fd=dir_fd)
    with os.fdopen(fd, "wb") as handle:
        handle.write(raw)
        handle.flush()
        os.fsync(handle.fileno())
    os.link(temporary, name, src_dir_fd=dir_fd, dst_dir_fd=dir_fd,
            follow_symlinks=False)
    os.fsync(dir_fd)
    os.unlink(temporary, dir_fd=dir_fd)  # Only this newly created successful temporary.
    os.fsync(dir_fd)
    return hashlib.sha256(raw).hexdigest()


def _chunk_source(source, logical_path, output, expected_sha, expected_bytes,
                  authorization, chunk_bytes):
    relative(logical_path)
    digest(expected_sha)
    integer(expected_bytes)
    integer(chunk_bytes, 1, CHUNK_BYTES)
    require(math.ceil(expected_bytes / chunk_bytes) <= 10000, "Too many chunks")
    source_fd = open_file(source)
    output_fd = None
    parts_fd = None
    journal = None
    try:
        before = seal(os.fstat(source_fd))
        require(before[5] == expected_bytes, "Source size differs from frozen size")
        if authorization["kind"] == "test-fixture":
            require(before[-1] == 1, "Fixture sources must not share a hard-linked inode")
        output_fd = new_output_directory(output)
        journal = Journal(str(Path(output) / "journal.ndjson"))
        journal.add("started", operation="chunk", source=os.fspath(source),
                    expectedBytes=expected_bytes, expectedSha256=expected_sha,
                    authorization=authorization)
        os.mkdir("parts", 0o700, dir_fd=output_fd)
        os.fsync(output_fd)
        parts_fd = os.open("parts", os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                           dir_fd=output_fd)
        full = hashlib.sha256()
        git_blob = hashlib.sha1(b"blob " + str(expected_bytes).encode("ascii") + b"\0")
        total = 0
        parts = []
        with os.fdopen(os.dup(source_fd), "rb", buffering=0) as source_handle:
            for index in range(1, max(1, math.ceil(expected_bytes / chunk_bytes)) + 1):
                expected_part = min(chunk_bytes, expected_bytes - total)
                name = f"part-{index:06d}.gz"
                fd = os.open(name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                             0o600, dir_fd=parts_fd)
                part_sha = hashlib.sha256()
                count = 0
                with os.fdopen(fd, "wb") as part_handle:
                    writer = HashedWriter(part_handle)
                    with gzip.GzipFile(filename="", mode="wb", fileobj=writer,
                                       compresslevel=9, mtime=0) as compressor:
                        while count < expected_part:
                            data = source_handle.read(min(READ_BYTES, expected_part - count))
                            require(data, "Source ended before frozen size")
                            compressor.write(data)
                            part_sha.update(data)
                            full.update(data)
                            git_blob.update(data)
                            count += len(data)
                            total += len(data)
                    part_handle.flush()
                    os.fsync(part_handle.fileno())
                os.fsync(parts_fd)
                row = {"index": index, "offset": total - count, "path": "parts/" + name,
                       "bytes": writer.bytes, "sha256": writer.hash.hexdigest(),
                       "uncompressedBytes": count, "uncompressedSha256": part_sha.hexdigest()}
                parts.append(row)
                journal.add("part-completed", part=row)
            require(not source_handle.read(1), "Source grew beyond frozen size")
        require(total == expected_bytes and full.hexdigest() == expected_sha,
                "Complete source SHA256 differs from root-frozen bytes")
        stable_file(source_fd, source, before)
        manifest = {"schema": SCHEMA,
                    "compression": {"format": "gzip", "level": 9, "mtime": 0,
                                    "chunkBytes": chunk_bytes, "readBytes": READ_BYTES,
                                    "maxCompressedPartBytes": MAX_COMPRESSED_BYTES},
                    "source": {"logicalPath": logical_path, "originalBytes": total,
                               "originalSha256": full.hexdigest(),
                               "originalGitBlobSha1": git_blob.hexdigest()},
                    "authorization": authorization, "parts": parts}
        validate_manifest(manifest)
        manifest_sha = publish_json(output_fd, "SNAPSHOT_CHUNKS.json", manifest)
        result = {"status": "passed", "manifestPath": str(Path(output) / "SNAPSHOT_CHUNKS.json"),
                  "manifestSha256": manifest_sha, "source": manifest["source"],
                  "parts": len(parts), "compressedBytes": sum(p["bytes"] for p in parts),
                  "uncompressedArchiveCopies": 0, "sourceWrites": 0,
                  "journalPath": journal.path}
        journal.add("completed", result=result)
        return result
    except BaseException as error:
        if journal:
            journal.add("failed", errorType=type(error).__name__, reason=str(error),
                        partialArtifactsPreserved=True)
        raise
    finally:
        if journal:
            journal.close()
        if parts_fd is not None:
            os.close(parts_fd)
        if output_fd is not None:
            os.close(output_fd)
        os.close(source_fd)


def chunk_frozen(source, logical_path, output, expected_sha, expected_bytes,
                 freeze_path, freeze_sha):
    auth = root_authorization(source, expected_sha, expected_bytes, freeze_path, freeze_sha)
    return _chunk_source(source, logical_path, output, expected_sha, expected_bytes,
                         auth, CHUNK_BYTES)


def chunk_fixture(source, logical_path, output, expected_sha, expected_bytes,
                  chunk_bytes=4096):
    """Test API only: cannot read R/S or sources outside this tool's fixture directory."""
    source_parts = absolute(source)
    fixture_parts = absolute(FIXTURE_ROOT)
    require(source_parts[:len(fixture_parts)] == fixture_parts and
            len(source_parts) > len(fixture_parts), "Fixture source outside dedicated fixture root")
    output_parts = absolute(output)
    require(output_parts[:len(fixture_parts)] == fixture_parts and
            len(output_parts) > len(fixture_parts), "Fixture output outside dedicated fixture root")
    auth = {"kind": "test-fixture", "fixtureSource": os.fspath(source)}
    return _chunk_source(source, logical_path, output, expected_sha, expected_bytes,
                         auth, chunk_bytes)


def validate_manifest(manifest):
    exact_keys(manifest, ["schema", "compression", "source", "authorization", "parts"])
    require(manifest["schema"] == SCHEMA, "Unsupported snapshot schema")
    compression = manifest["compression"]
    exact_keys(compression, ["format", "level", "mtime", "chunkBytes", "readBytes",
                             "maxCompressedPartBytes"])
    require(compression["format"] == "gzip" and type(compression["level"]) is int and
            compression["level"] == 9 and type(compression["mtime"]) is int and
            compression["mtime"] == 0 and compression["readBytes"] == READ_BYTES and
            type(compression["readBytes"]) is int and
            compression["maxCompressedPartBytes"] == MAX_COMPRESSED_BYTES and
            type(compression["maxCompressedPartBytes"]) is int,
            "Unsupported compression settings")
    chunk_bytes = integer(compression["chunkBytes"], 1, CHUNK_BYTES)
    source = manifest["source"]
    exact_keys(source, ["logicalPath", "originalBytes", "originalSha256", "originalGitBlobSha1"])
    relative(source["logicalPath"])
    size = integer(source["originalBytes"])
    digest(source["originalSha256"])
    digest(source["originalGitBlobSha1"], SHA1)
    auth = manifest["authorization"]
    require(type(auth) is dict, "Invalid snapshot authorization")
    if auth.get("kind") == "root-frozen-source":
        exact_keys(auth, ["kind", "manifestPath", "manifestSha256", "manifestSchema",
                          "confirmedByRoot", "sourceState", "entryCount"])
        absolute(auth["manifestPath"])
        digest(auth["manifestSha256"])
        require(auth["manifestSchema"] in FREEZE_SCHEMAS and auth["confirmedByRoot"] is True and
                type(auth["entryCount"]) is int and auth["entryCount"] == FROZEN_ENTRY_COUNT and
                auth["sourceState"] == "frozen" and chunk_bytes == CHUNK_BYTES,
                "Production snapshot lacks root-frozen authorization")
    elif auth.get("kind") == "test-fixture":
        exact_keys(auth, ["kind", "fixtureSource"])
        absolute(auth["fixtureSource"])
    else:
        raise SnapshotError("Unknown snapshot authorization kind")
    parts = manifest["parts"]
    require(type(parts) is list and len(parts) == max(1, math.ceil(size / chunk_bytes)) and
            len(parts) <= 10000, "Invalid part count")
    offset = 0
    for index, row in enumerate(parts, 1):
        exact_keys(row, ["index", "offset", "path", "bytes", "sha256", "uncompressedBytes",
                         "uncompressedSha256"])
        require(integer(row["index"], 1) == index and integer(row["offset"]) == offset and
                row["path"] == f"parts/part-{index:06d}.gz", "Parts are unsafe or out of order")
        relative(row["path"])
        integer(row["bytes"], 20, MAX_COMPRESSED_BYTES - 1)
        require(integer(row["uncompressedBytes"]) == min(chunk_bytes, size - offset),
                "Invalid raw part size")
        digest(row["sha256"])
        digest(row["uncompressedSha256"])
        offset += row["uncompressedBytes"]
    require(offset == size, "Part sizes differ from original size")
    return manifest


def target_parent(destination, logical_path):
    """Create only missing directories beneath an already existing destination."""
    parts = relative(logical_path)
    fd = open_directory(destination)
    try:
        for component in parts[:-1]:
            try:
                os.mkdir(component, 0o700, dir_fd=fd)
                os.fsync(fd)
            except FileExistsError:
                pass
            new = os.open(component, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                          dir_fd=fd)
            os.close(fd)
            fd = new
        try:
            os.stat(parts[-1], dir_fd=fd, follow_symlinks=False)
        except FileNotFoundError:
            pass
        else:
            raise SnapshotError("Destination already exists; no overwrite is allowed")
        return fd, parts[-1]
    except BaseException:
        os.close(fd)
        raise


def stream_part(path, row, consume):
    fd = open_file(path)
    compressed = hashlib.sha256()
    raw_sha = hashlib.sha256()
    compressed_count = 0
    raw_count = 0
    decoder = zlib.decompressobj(wbits=31)
    try:
        before = seal(os.fstat(fd))
        require(before[5] == row["bytes"], "Compressed part size mismatch")
        with os.fdopen(os.dup(fd), "rb", buffering=0) as handle:
            while True:
                block = handle.read(READ_BYTES)
                if not block:
                    break
                if compressed_count == 0:
                    require(block[:10] == b"\x1f\x8b\x08\x00\x00\x00\x00\x00\x02\xff",
                            "Non-deterministic or unsupported gzip header")
                compressed.update(block)
                compressed_count += len(block)
                require(compressed_count <= row["bytes"], "Compressed part grew while reading")
                require(not decoder.eof, "Trailing bytes or concatenated gzip members forbidden")
                pending = block
                while True:
                    bound = min(READ_BYTES, row["uncompressedBytes"] - raw_count + 1)
                    data = decoder.decompress(pending, bound)
                    raw_count += len(data)
                    require(raw_count <= row["uncompressedBytes"], "Decompression exceeded frozen size")
                    raw_sha.update(data)
                    consume(data)
                    require(not decoder.unused_data, "Trailing bytes or concatenated gzip members forbidden")
                    pending = decoder.unconsumed_tail
                    if decoder.eof or (not pending and len(data) < bound):
                        break
        require(decoder.eof, "Truncated gzip member")
        require(compressed_count == row["bytes"] and compressed.hexdigest() == row["sha256"],
                "Compressed part SHA256 mismatch")
        require(raw_count == row["uncompressedBytes"] and
                raw_sha.hexdigest() == row["uncompressedSha256"], "Raw part SHA256 mismatch")
        stable_file(fd, path, before)
    finally:
        os.close(fd)
    return {"index": row["index"], "bytes": compressed_count, "uncompressedBytes": raw_count,
            "sha256": compressed.hexdigest(), "uncompressedSha256": raw_sha.hexdigest()}


def restore(manifest_path, expected_manifest_sha, journal_path,
            verify_only=True, destination=None):
    digest(expected_manifest_sha)
    absolute(manifest_path)
    absolute(journal_path)
    require(type(verify_only) is bool, "Verification mode must be boolean")
    require(verify_only or destination is not None, "Restore destination is required")
    if destination is not None:
        absolute(destination)
    journal = Journal(journal_path)
    output = None
    parent_fd = None
    temporary = None
    published = False
    try:
        journal.add("started", operation="verify" if verify_only else "restore",
                    manifestPath=os.fspath(manifest_path), expectedManifestSha256=expected_manifest_sha)
        manifest, manifest_sha = read_json(manifest_path, expected_manifest_sha)
        validate_manifest(manifest)
        source = manifest["source"]
        if not verify_only:
            parent_fd, name = target_parent(destination, source["logicalPath"])
            temporary = ".cqc-restore-" + uuid.uuid4().hex + ".partial"
            fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                         0o600, dir_fd=parent_fd)
            output = os.fdopen(fd, "wb")
            journal.add("temporary-created", path=str(Path(destination) /
                        Path(source["logicalPath"]).parent / temporary))
        full = hashlib.sha256()
        git_blob = hashlib.sha1(b"blob " + str(source["originalBytes"]).encode("ascii") + b"\0")
        total = 0

        def consume(data):
            nonlocal total
            total += len(data)
            require(total <= source["originalBytes"], "Full decompression exceeded frozen size")
            full.update(data)
            git_blob.update(data)
            if output:
                require(output.write(data) == len(data), "Short restored write")

        root = Path(manifest_path).parent
        for row in manifest["parts"]:
            proof = stream_part(str(root / row["path"]), row, consume)
            journal.add("part-verified", part=proof)
        require(total == source["originalBytes"] and full.hexdigest() == source["originalSha256"] and
                git_blob.hexdigest() == source["originalGitBlobSha1"],
                "Reassembled source differs from full SHA256 or Git blob SHA1")
        if output:
            output.flush()
            os.fsync(output.fileno())
            output.close()
            output = None
            os.link(temporary, name, src_dir_fd=parent_fd, dst_dir_fd=parent_fd,
                    follow_symlinks=False)  # Atomic publication fails if any target appeared.
            os.fsync(parent_fd)
            published = True
            journal.add("published", logicalPath=source["logicalPath"], sourceSha256=full.hexdigest())
            os.unlink(temporary, dir_fd=parent_fd)  # Only newly created successful temporary.
            os.fsync(parent_fd)
            temporary = None
        result = {"status": "passed", "manifestSha256": manifest_sha,
                  "mode": "verify-only" if verify_only else "restore", "parts": len(manifest["parts"]),
                  "source": source, "wroteRestoredFile": published,
                  "existingFilesOverwritten": 0, "currentRuntimeSourcesRead": 0,
                  "journalPath": journal.path}
        journal.add("completed", result=result)
        return result
    except BaseException as error:
        if output:
            output.flush()
            os.fsync(output.fileno())
        journal.add("failed", errorType=type(error).__name__, reason=str(error),
                    partialArtifactsPreserved=True, publishedBeforeFailure=published,
                    temporaryName=temporary)
        raise
    finally:
        if output:
            output.close()
        if parent_fd is not None:
            os.close(parent_fd)
        journal.close()
