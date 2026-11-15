"""Isolated PASS9 HTTP verifier. Default: local preparation, no network.

Future execution requires the ROOT READY receipt and exact frozen input pins.
Never copies response bodies, starts browsers, publishes, or writes app sources.
"""
import argparse
import concurrent.futures
import datetime
import hashlib
import json
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
SCHEMA = "cqc-pass9-http-verification/v1"
BUDGET = 1024 * 1024
WORKERS = 10
TIMEOUT = 45
STAR = "assets/combat-props/core__ninja_mg2/star-native-pass9.png"
P8_PINS = {
    "/workspace/vercel-pass8-publication/verify-deployed-http.py":
        "ce9496e549d470cfff86fd43819a66cf58e10c4c473ae8d8f759cfd8437daf04",
    "/workspace/vercel-pass8-publication/expected-runtime-manifest.json":
        "7dd2b1b338459f88781897903d32449378aff38e55283099df1f8b0cdb68bd8a",
}
SHA = re.compile(r"[0-9a-f]{64}\Z")
COMMIT = re.compile(r"[0-9a-f]{40}\Z")
LABEL = re.compile(r"[a-z0-9][a-z0-9_-]{0,79}\Z")


def require(condition, message):
    if not condition:
        raise ValueError(message)


def digest_file(path):
    digest, count = hashlib.sha256(), 0
    with path.open("rb") as stream:
        while chunk := stream.read(1024 * 1024):
            digest.update(chunk)
            count += len(chunk)
    return {"path": str(path.resolve()), "bytes": count, "sha256": digest.hexdigest()}


def small_json(path, expected_sha, maximum):
    require(path.is_file(), "Missing input: " + str(path))
    require(path.stat().st_size <= maximum, "Input JSON exceeds its preparation budget")
    pin = digest_file(path)
    require(SHA.fullmatch(expected_sha or ""), "A concrete lowercase SHA256 pin is required")
    require(pin["sha256"] == expected_sha, "Input SHA256 differs: " + str(path))
    return json.loads(path.read_text(encoding="utf-8")), pin


def runtime_path(value):
    require(isinstance(value, str) and value, "Runtime path must be a nonempty string")
    require(not any(c in value for c in "\\%?#\x00\r\n"), "Unsafe runtime path")
    parts = value.split("/")
    require(not any(part in ("", ".", "..") for part in parts), "Runtime path must be normalized and relative")
    return value


def file_records(document, expected_count=None):
    require(isinstance(document, dict) and isinstance(document.get("files"), list), "Expected a files list")
    if expected_count is not None:
        require(len(document["files"]) == expected_count, "ROOT core-pins must contain exactly 28 paths")
    records = {}
    for item in document["files"]:
        require(isinstance(item, dict), "Invalid file record")
        path = runtime_path(item.get("path"))
        size, sha = item.get("bytes"), item.get("sha256")
        require(isinstance(size, int) and not isinstance(size, bool) and size >= 0, "Invalid file byte count")
        require(isinstance(sha, str) and SHA.fullmatch(sha), "Invalid file SHA256")
        require(path not in records, "Duplicate runtime path: " + path)
        records[path] = {"path": path, "bytes": size, "sha256": sha}
    return records


def source_tool_pins():
    tool = digest_file(pathlib.Path(__file__).resolve())
    closed = []
    for name, expected in P8_PINS.items():
        pin = digest_file(pathlib.Path(name))
        require(pin["sha256"] == expected, "Closed PASS8 pin changed: " + name)
        closed.append(pin)
    return {"tool": tool, "closedPASS8": closed}


def validate_base(base):
    parsed = urllib.parse.urlsplit(base)
    require(parsed.scheme == "https" and parsed.hostname and not parsed.username and not parsed.password,
            "Future production base requires HTTPS without credentials")
    require(not parsed.query and not parsed.fragment and parsed.path in ("", "/"),
            "Base must be an origin without a path, query or fragment")
    return base.rstrip("/")


def preparation(tool_pins):
    return {
        "schema": "cqc-pass9-http-preparation/v1",
        "status": "prepared_not_executed",
        "networkRequests": 0,
        "browserStarted": False,
        "writesAppSources": False,
        "requiresFutureRootREADYAnd43SourceFreeze": True,
        "futureExactGET": {"combatSpritePNGs": 258, "nativeStar": STAR,
                           "rootProvidedCorePaths": 28, "runtimeManifest": 1, "total": 288},
        "futureHEAD": "All remaining manifest edges; Content-Length checked when present and explicitly qualified when absent.",
        "workers": WORKERS,
        "timeoutSeconds": TIMEOUT,
        "responseBodiesStored": False,
        "sourceToolPins": tool_pins,
        "scopeBudgetBytes": BUDGET,
        "canonical53MPublicationClaimMade": False,
        "limits": ["No READY, freeze, final manifest, core list, commit or deployed result is created by preparation.",
                   "Exact43 semantics come from the ROOT freeze; this tool checks runtime bytes, not browser behavior."],
    }


def validate_run(opts, tool_pins):
    names = ("base", "commit40", "manifest", "manifest_sha256", "core_pins", "core_pins_sha256",
             "source_freeze", "source_freeze_sha256", "root_ready", "root_ready_sha256", "label")
    require(all(getattr(opts, name) is not None for name in names), "Run requires every pinned input and a fresh label")
    require(COMMIT.fullmatch(opts.commit40), "--commit40 must be a concrete lowercase 40-hex source commit")
    require(LABEL.fullmatch(opts.label), "Label must be a fresh lowercase simple name, maximum 80 characters")
    base = validate_base(opts.base)
    output = ROOT / (opts.label + ".json")
    require(not output.exists(), "Fresh report already exists: " + str(output))
    require(sum(p.stat().st_size for p in ROOT.rglob("*") if p.is_file()) < BUDGET,
            "Isolated HTTP scope already exceeds its 1 MiB budget")
    manifest, manifest_pin = small_json(opts.manifest, opts.manifest_sha256, 512 * 1024)
    core, core_pin = small_json(opts.core_pins, opts.core_pins_sha256, 64 * 1024)
    freeze, freeze_pin = small_json(opts.source_freeze, opts.source_freeze_sha256, 256 * 1024)
    ready, ready_pin = small_json(opts.root_ready, opts.root_ready_sha256, 16 * 1024)
    files = file_records(manifest)
    require(len(files) <= 2000, "Runtime graph exceeds the compact-report scope")
    require("runtime-manifest.json" not in files, "Manifest cannot include itself as a duplicate graph edge")
    require(manifest.get("totalBytes") == sum(item["bytes"] for item in files.values()), "Manifest totalBytes differs")
    sprites = {path for path in files if path.startswith("assets/combat-sprites/") and path.endswith(".png")}
    require(len(sprites) == 258, "Future actual43 runtime must contain exactly 258 combat-sprites PNG paths")
    require(STAR in files, "Future native PASS9 star PNG is absent")
    cores = file_records(core, 28)
    for path, item in cores.items():
        require(path in files and files[path] == item, "ROOT core pin differs from the final manifest: " + path)
        require(path not in sprites and path != STAR and path != "runtime-manifest.json", "Core paths must be disjoint from native PNG/manifest GETs")
        require(not (path.endswith(".json") and item["bytes"] >= 50_000_000),
                "A large local canonical source JSON is outside the required runtime GET scope")
    require(ready.get("schema") == "cqc-pass9-http-root-ready/v1" and ready.get("status") == "READY"
            and ready.get("confirmedByRoot") is True and ready.get("entryCount") == 43,
            "ROOT must supply a completed explicit actual43 READY receipt")
    require(ready.get("baseUrl") == base and ready.get("commit40") == opts.commit40,
            "ROOT READY base or source commit differs")
    require(ready.get("canonical53MPublicationClaimMade") is False,
            "READY must preserve the no-canonical53M-publication-claim qualification")
    for name, pin in (("tool", tool_pins["tool"]), ("manifest", manifest_pin),
                      ("corePins", core_pin), ("sourceFreeze", freeze_pin)):
        supplied = ready.get(name, {})
        require(supplied.get("sha256") == pin["sha256"] and supplied.get("bytes") == pin["bytes"],
                "ROOT READY does not bind the exact " + name + " pin")
    deployment = ready.get("deployment", {})
    require(deployment.get("readyState") == "READY" and deployment.get("readySubstate") == "PROMOTED"
            and deployment.get("target") == "production" and deployment.get("gitSha") == opts.commit40
            and isinstance(deployment.get("id"), str) and deployment["id"].startswith("dpl_"),
            "Future run requires ROOT-confirmed real production READY/PROMOTED identity")
    require(freeze.get("confirmedByRoot") is True and freeze.get("status") == "frozen"
            and freeze.get("entryCount") == 43 and isinstance(freeze.get("files"), list) and freeze["files"],
            "ROOT actual43 source freeze is absent or unfinished")
    frozen_files, seen = [], set()
    runtime_catalog_bound = False
    for expected in freeze["files"]:
        require(isinstance(expected, dict) and isinstance(expected.get("path"), str), "Invalid frozen source pin")
        source = pathlib.Path(expected["path"])
        require(source.is_absolute() and source.is_file(), "Frozen source must be an existing absolute local file")
        resolved = str(source.resolve())
        require(resolved not in seen, "Duplicate frozen source path")
        seen.add(resolved)
        actual = digest_file(source)
        require(actual["bytes"] == expected.get("bytes") and actual["sha256"] == expected.get("sha256"),
                "ROOT frozen source differs: " + resolved)
        relative = expected.get("runtimePath")
        if relative is None:
            try:
                relative = str(source.relative_to("/workspace/cqc-game-working/cqc-versus-v056"))
            except ValueError:
                relative = None
        if relative is not None:
            runtime_path(relative)
            if relative in files:
                require(actual["bytes"] == files[relative]["bytes"] and actual["sha256"] == files[relative]["sha256"],
                        "Frozen source differs from runtime manifest: " + relative)
                runtime_catalog_bound |= relative == "src/cqc-sprite-catalog.js"
        actual["runtimePath"] = relative
        frozen_files.append(actual)
    require(runtime_catalog_bound, "Freeze must bind the actual43 generated runtime sprite catalog JS")
    full_paths = sprites | {STAR} | set(cores)
    items = [{"path": "runtime-manifest.json", "bytes": manifest_pin["bytes"], "sha256": manifest_pin["sha256"], "method": "GET"}]
    items.extend(dict(item, method="GET" if path in full_paths else "HEAD") for path, item in files.items())
    require(sum(item["method"] == "GET" for item in items) == 288, "Exact GET plan must contain 288 distinct edges")
    return {"base": base, "output": output, "items": items, "manifest": manifest,
            "inputPins": {"manifest": manifest_pin, "corePins": core_pin, "sourceFreeze": freeze_pin, "rootREADY": ready_pin},
            "frozenFiles": frozen_files, "deployment": deployment}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, response, code, message, headers, url):
        return None


def check(item, base):
    row = {"path": item["path"], "method": item["method"], "expectedBytes": item["bytes"], "expectedSha256": item["sha256"]}
    try:
        request = urllib.request.Request(base + "/cqc/" + urllib.parse.quote(item["path"], safe="/-._~"),
                                         method=item["method"], headers={"User-Agent": "CQC-PASS9-root-ready-http-verification"})
        # Default proxy and CA/TLS verification are inherited; redirects fail explicitly.
        with urllib.request.build_opener(NoRedirect()).open(request, timeout=TIMEOUT) as response:
            row["status"] = response.status
            raw_length = response.headers.get("Content-Length")
            length = int(raw_length) if raw_length is not None else None
            require(length is None or length >= 0, "Invalid Content-Length")
            row["contentLength"] = length
            row["lengthQualification"] = "matched" if length == item["bytes"] else "absent" if length is None else "mismatch"
            if item["method"] == "GET":
                digest, size = hashlib.sha256(), 0
                while chunk := response.read(1024 * 1024):
                    size += len(chunk)
                    digest.update(chunk)
                row.update(bytes=size, sha256=digest.hexdigest())
                row["exactSourceBytes"] = size == item["bytes"] and row["sha256"] == item["sha256"]
            row["passed"] = response.status == 200 and length in (None, item["bytes"]) and (row.get("exactSourceBytes") is True if item["method"] == "GET" else True)
    except urllib.error.HTTPError as exc:
        row.update(status=exc.code, error="HTTP " + str(exc.code), passed=False)
    except Exception as exc:
        row.update(error=str(exc)[:500], passed=False)
    return row


def run(opts, tool_pins, validated):
    started = datetime.datetime.now(datetime.timezone.utc).isoformat()
    # Exclusive creation reserves a genuinely fresh label; prior evidence is never opened for writing.
    with validated["output"].open("x", encoding="utf-8") as report_stream:
        with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as executor:
            rows = list(executor.map(lambda item: check(item, validated["base"]), validated["items"]))
        drift = []
        for pin in list(validated["inputPins"].values()) + validated["frozenFiles"] + [tool_pins["tool"]] + tool_pins["closedPASS8"]:
            try:
                current = digest_file(pathlib.Path(pin["path"]))
                if current["sha256"] != pin["sha256"] or current["bytes"] != pin["bytes"]:
                    drift.append(pin["path"])
            except Exception:
                drift.append(pin["path"])
        failures = [row["path"] for row in rows if not row["passed"]]
        gets = [row for row in rows if row["method"] == "GET"]
        heads = [row for row in rows if row["method"] == "HEAD"]
        report = {"schema": SCHEMA, "startedAt": started, "checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  "status": "passed" if not failures and not drift else "failed", "baseUrl": validated["base"],
                  "expectedCommit40": opts.commit40, "rootConfirmedDeployment": validated["deployment"],
                  "inputPins": validated["inputPins"], "sourceToolPins": tool_pins,
                  "sourceFreezeEntryCount": 43, "frozenSourceFilesVerified": len(validated["frozenFiles"]),
                  "checkCount": len(rows), "exactGetCount": len(gets), "headCount": len(heads),
                  "combatSpritePNGGetCount": 258, "nativeStarGetCount": 1, "coreGetCount": 28,
                  "getBytesStreamed": sum(row.get("bytes", 0) for row in gets), "responseBodiesStored": False,
                  "headWithoutContentLengthCount": sum(row.get("contentLength") is None for row in heads),
                  "failures": failures, "sourceDrift": drift, "checks": rows,
                  "canonical53MPublicationClaimMade": False,
                  "limits": ["HEAD proves HTTP status and declared length when present; no payload hash is checked for HEAD.",
                             "ROOT READY/freeze establish build provenance and actual43 source semantics; HTTP bytes do not prove browser behavior or artistic fidelity.",
                             "No publication claim is made for the large local canonical source JSON."]}
        encoded = json.dumps(report, ensure_ascii=False, separators=(",", ":")) + "\n"
        existing_bytes = sum(p.stat().st_size for p in ROOT.rglob("*") if p.is_file())
        require(existing_bytes + len(encoded.encode("utf-8")) <= BUDGET, "Report would exceed the isolated 1 MiB scope budget")
        report_stream.write(encoded)
    report_pin = digest_file(validated["output"])
    print(json.dumps({"status": report["status"], "report": report_pin, "checks": len(rows),
                      "exactGET": len(gets), "HEAD": len(heads), "failures": failures, "sourceDrift": drift}, indent=2))
    return 0 if report["status"] == "passed" else 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--run-after-root-ready", action="store_true")
    modes.add_argument("--plan-only", action="store_true", help="Explicit preparation mode; never opens an HTTP request")
    parser.add_argument("--base")
    parser.add_argument("--commit40")
    parser.add_argument("--label")
    for name in ("manifest", "core-pins", "source-freeze", "root-ready"):
        parser.add_argument("--" + name, type=pathlib.Path)
        parser.add_argument("--" + name + "-sha256")
    opts = parser.parse_args()
    pins = source_tool_pins()
    if not opts.run_after_root_ready:
        print(json.dumps(preparation(pins), indent=2))
        return 0
    validated = validate_run(opts, pins)
    return run(opts, pins, validated)


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        print(json.dumps({"status": "blocked_or_failed", "error": str(exc)}, ensure_ascii=False), file=sys.stderr)
        sys.exit(2)
