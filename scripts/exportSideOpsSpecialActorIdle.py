#!/usr/bin/env python3
"""Export an existing special actor's authored core frame 0 as its static bitmap."""

from __future__ import annotations

import argparse
from hashlib import sha256
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import tempfile

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src" / "data" / "sideopsSpecialActorAnimations.json"
SPECIAL_RUNTIME_ROOT = Path("public/sideops/special-animations")
SPECIAL_SOURCE_ROOT = Path("scripts/art_sources/special-animations")


def actor_definitions(manifest: Path = MANIFEST) -> dict[str, dict]:
    actors = json.loads(manifest.read_text(encoding="utf-8"))
    return {actor["id"]: actor for actor in actors}


def file_sha256(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def verified_root(root: Path) -> Path:
    resolved = root.resolve(strict=True)
    if not resolved.is_dir():
        raise ValueError(f"Output root must be an existing directory: {root}")
    return resolved


def within_root(path: Path, root: Path, label: str, *, strict: bool) -> Path:
    resolved = path.resolve(strict=strict)
    try:
        resolved.relative_to(root)
    except ValueError as error:
        raise ValueError(f"{label} escapes verified root {root}: {resolved}") from error
    return resolved


def static_relative_path(source_path: str) -> Path:
    posix = PurePosixPath(source_path)
    if not source_path.startswith("/") or posix.is_absolute() is False:
        raise ValueError("sourcePath must be an absolute public URL path")
    if any(part in ("", ".", "..") for part in posix.parts[1:]):
        raise ValueError(f"Unsafe sourcePath: {source_path}")
    if posix.suffix.lower() != ".png" or ":" in source_path or "\\" in source_path:
        raise ValueError(f"sourcePath must identify a PNG below public: {source_path}")
    return Path(*posix.parts[1:])


def resolve_actor_files(actor: dict, project_root: Path) -> dict[str, Path]:
    root = verified_root(project_root)
    actor_id = actor.get("id", "")
    if not re.fullmatch(r"[a-z0-9-]+", actor_id):
        raise ValueError(f"Unsafe actor id: {actor_id!r}")

    runtime_root = within_root(root / SPECIAL_RUNTIME_ROOT, root, "special runtime root", strict=False)
    runtime_dir = within_root(runtime_root / actor_id, root, "actor runtime directory", strict=True)
    core = within_root(runtime_dir / "core.png", root, "runtime core", strict=True)
    runtime_provenance = within_root(runtime_dir / "provenance.json", root, "runtime provenance", strict=True)

    relative_static = static_relative_path(actor["sourcePath"])
    public_root = within_root(root / "public", root, "public root", strict=False)
    static = within_root(public_root / relative_static, root, "static output", strict=False)
    static_provenance = within_root(
        static.with_suffix(".provenance.json"), root, "static provenance output", strict=False
    )

    runtime_report = json.loads(runtime_provenance.read_text(encoding="utf-8"))
    if runtime_report.get("actorId") != actor_id:
        raise ValueError("Runtime provenance actorId does not match the requested actor")
    source_record = runtime_report.get("sources", {}).get("core", {})
    source_name = source_record.get("file", "")
    if not source_name or Path(source_name).name != source_name:
        raise ValueError("Runtime provenance must name one local core source board")
    source_root = within_root(root / SPECIAL_SOURCE_ROOT, root, "special source root", strict=True)
    source_board = within_root(source_root / source_name, root, "authored core source", strict=True)
    declared_source_hash = source_record.get("sha256", "").lower()
    if not re.fullmatch(r"[0-9a-f]{64}", declared_source_hash):
        raise ValueError("Runtime provenance has no valid core source SHA-256")
    if file_sha256(source_board) != declared_source_hash:
        raise ValueError("Authored core source hash differs from runtime provenance")

    return {
        "root": root,
        "core": core,
        "runtimeProvenance": runtime_provenance,
        "sourceBoard": source_board,
        "static": static,
        "staticProvenance": static_provenance,
    }


def isolate_core_frame_zero(core_path: Path, frame_size: int) -> tuple[Image.Image, tuple[int, int, int, int]]:
    if not isinstance(frame_size, int) or frame_size <= 0:
        raise ValueError("frameSize must be a positive integer")
    sheet = Image.open(core_path).convert("RGBA")
    expected = (frame_size * 4, frame_size * 4)
    if sheet.size != expected:
        raise ValueError(f"Runtime core sheet must be exactly {expected}, got {sheet.size}")
    frame = sheet.crop((0, 0, frame_size, frame_size))
    bbox = frame.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError("Core frame 0 has no authored pixels")
    return frame.crop(bbox), bbox


def fit_bottom_center(source: Image.Image, width: int, height: int) -> tuple[Image.Image, dict]:
    if not all(isinstance(value, int) and value > 0 for value in (width, height)):
        raise ValueError("bodyWidth and bodyHeight must be positive integers")
    rgba = source.convert("RGBA")
    bbox = rgba.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError("Cannot fit an empty source image")
    isolated = rgba.crop(bbox)
    scale = min(width / isolated.width, height / isolated.height)
    fitted_size = (
        min(width, max(1, round(isolated.width * scale))),
        min(height, max(1, round(isolated.height * scale))),
    )
    fitted = isolated.resize(fitted_size, Image.Resampling.NEAREST)
    fitted.putdata([
        (red, green, blue, alpha) if alpha else (0, 0, 0, 0)
        for red, green, blue, alpha in fitted.get_flattened_data()
    ])
    offset = ((width - fitted.width) // 2, height - fitted.height)
    output = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    output.alpha_composite(fitted, offset)
    output.putdata([
        (red, green, blue, alpha) if alpha else (0, 0, 0, 0)
        for red, green, blue, alpha in output.get_flattened_data()
    ])
    output_bbox = output.getchannel("A").getbbox()
    return output, {
        "uniformScale": scale,
        "fittedSize": list(fitted_size),
        "offset": list(offset),
        "outputAlphaBounds": list(output_bbox) if output_bbox else None,
        "resampling": "nearest-neighbor",
        "alignment": "horizontal-center; bottom-anchor",
    }


def png_bytes(image: Image.Image) -> bytes:
    buffer = io.BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    return buffer.getvalue()


def atomic_write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, "wb") as stream:
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if temporary.exists():
            temporary.unlink()


def export_actor_idle(actor: dict, project_root: Path = ROOT, *, overwrite: bool = False) -> dict:
    files = resolve_actor_files(actor, project_root)
    destinations = (files["static"], files["staticProvenance"])
    existing = [path for path in destinations if path.exists()]
    if existing and not overwrite:
        names = ", ".join(str(path) for path in existing)
        raise FileExistsError(f"Refusing to overwrite existing output without --overwrite: {names}")

    isolated, source_bbox = isolate_core_frame_zero(files["core"], actor["frameSize"])
    static, fitting = fit_bottom_center(isolated, actor["bodyWidth"], actor["bodyHeight"])
    static_data = png_bytes(static)
    static_hash = sha256(static_data).hexdigest()
    report = {
        "schemaVersion": 1,
        "actorId": actor["id"],
        "sourceTextureKey": actor["sourceTextureKey"],
        "sourcePath": actor["sourcePath"],
        "provenance": "mechanical-core-frame-zero-export",
        "authoredSourceBoard": {
            "path": files["sourceBoard"].relative_to(files["root"]).as_posix(),
            "sha256": file_sha256(files["sourceBoard"]),
        },
        "runtimeCore": {
            "path": files["core"].relative_to(files["root"]).as_posix(),
            "sha256": file_sha256(files["core"]),
            "frameSize": actor["frameSize"],
            "frameIndex": 0,
            "frameAlphaBounds": list(source_bbox),
        },
        "runtimeProvenance": {
            "path": files["runtimeProvenance"].relative_to(files["root"]).as_posix(),
            "sha256": file_sha256(files["runtimeProvenance"]),
        },
        "staticOutput": {
            "path": files["static"].relative_to(files["root"]).as_posix(),
            "sha256": static_hash,
            "width": static.width,
            "height": static.height,
            "mode": static.mode,
            **fitting,
        },
        "operations": [
            "isolate authored core frame 0",
            "tight alpha bounding box",
            "one uniform nearest-neighbor resize",
            "horizontal center and bottom anchor",
            "transparent RGBA PNG encoding",
        ],
        "drawnPixels": 0,
        "synthesizedPhases": 0,
    }
    provenance_data = (json.dumps(report, indent=2, ensure_ascii=False) + "\n").encode("utf-8")

    atomic_write(files["static"], static_data)
    atomic_write(files["staticProvenance"], provenance_data)
    return report


def main() -> None:
    actors = actor_definitions()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--actor", required=True, choices=actors)
    parser.add_argument(
        "--output-root",
        type=Path,
        default=ROOT,
        help="Existing project-like root containing the actor runtime/source files and receiving public output",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Explicitly replace both the static PNG and its distinct provenance file",
    )
    args = parser.parse_args()
    report = export_actor_idle(actors[args.actor], args.output_root, overwrite=args.overwrite)
    print(json.dumps({
        "actorId": report["actorId"],
        "output": report["staticOutput"]["path"],
        "sha256": report["staticOutput"]["sha256"],
        "size": [report["staticOutput"]["width"], report["staticOutput"]["height"]],
        "alphaBounds": report["staticOutput"]["outputAlphaBounds"],
        "provenance": str(Path(report["staticOutput"]["path"]).with_suffix(".provenance.json")),
    }, indent=2))


if __name__ == "__main__":
    main()
