#!/usr/bin/env python3
"""Extract one authored 4x4 roster board without manufacturing animation poses."""
from __future__ import annotations
import argparse
from hashlib import sha256
import json
from pathlib import Path
import sys
from PIL import Image

SCRIPTS = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(SCRIPTS))
from importMechaProjectileBoard import projectile_grid_bands
from importSideOpsActorBoards import extract_foreground

DEFAULT_STATES = ("idle", "move", "interact", "react")
REPOSITORY = SCRIPTS.parent


def portable_repository_path(path: Path) -> str:
    """Public provenance is checkout-relative; local generation paths stay private."""
    try:
        return path.resolve().relative_to(REPOSITORY).as_posix()
    except ValueError as error:
        raise ValueError("Copy source and output into the repository before publishing provenance") from error


def extract(source: Path, background: str):
    board = Image.open(source).convert("RGBA")
    if min(board.size) < 512:
        raise ValueError("A complete source at least 512 pixels on each axis is required")
    xs = projectile_grid_bands(board, "x", 4)
    ys = projectile_grid_bands(board, "y", 4)
    if xs is None or ys is None:
        raise ValueError("All 5x5 cyan guides are mandatory; no guessed grid fallback")
    cells, rects, bounds = [], [], []
    for row in range(4):
        for column in range(4):
            rect = (xs[column][1] + 4, ys[row][1] + 4,
                    xs[column + 1][0] - 3, ys[row + 1][0] - 3)
            if rect[2] <= rect[0] or rect[3] <= rect[1]:
                raise ValueError(f"Invalid source cell {row}/{column}")
            cell = extract_foreground(board.crop(rect), background, cyan_guides=True)
            bound = cell.getchannel("A").getbbox()
            if bound is None:
                raise ValueError(f"Empty authored pose {row}/{column}")
            if bound[0] <= 0 or bound[1] <= 0 or bound[2] >= cell.width or bound[3] >= cell.height:
                raise ValueError(f"Clipped source pose {row}/{column}; regenerate source")
            cells.append(cell)
            rects.append(rect)
            bounds.append(bound)
    width = max(cell.width for cell in cells)
    height = max(cell.height for cell in cells)
    aligned = []
    for cell in cells:
        frame = Image.new("RGBA", (width, height))
        frame.alpha_composite(cell, ((width - cell.width) // 2, height - cell.height))
        aligned.append(frame)
    return aligned, {"sourceSize": board.size, "xGuides": xs, "yGuides": ys,
                     "cellRects": rects, "sourceAlphaBounds": bounds,
                     "commonCellSize": [width, height], "guideInset": 3,
                     "alignment": "original cell bottom-center; no per-pose recentering"}


def normalize(frames, states=DEFAULT_STATES, frame_size=128, padding=8):
    if len(frames) != 16 or len(states) != 4 or len(set(states)) != 4:
        raise ValueError("Exactly 16 poses and four unique action names are required")
    if not 32 <= frame_size <= 512 or not 0 <= padding < frame_size // 3:
        raise ValueError("Invalid frame size or padding")
    bounds = [frame.getchannel("A").getbbox() for frame in frames]
    if any(bound is None for bound in bounds):
        raise ValueError("Empty pose")
    union = (min(b[0] for b in bounds), min(b[1] for b in bounds),
             max(b[2] for b in bounds), max(b[3] for b in bounds))
    width, height = union[2] - union[0], union[3] - union[1]
    scale = min((frame_size - 2 * padding) / width, (frame_size - 2 * padding) / height)
    scaled_size = (max(1, round(width * scale)), max(1, round(height * scale)))
    offset = ((frame_size - scaled_size[0]) // 2, frame_size - padding - scaled_size[1])
    sheet = Image.new("RGBA", (frame_size * 4, frame_size * 4))
    outputs, hashes, canonical_hashes, output_bounds = [], [], [], []
    for index, source in enumerate(frames):
        frame = Image.new("RGBA", (frame_size, frame_size))
        sprite = source.crop(union).resize(scaled_size, Image.Resampling.NEAREST)
        frame.alpha_composite(sprite, offset)
        frame.putdata([(r, g, b, a) if a else (0, 0, 0, 0) for r, g, b, a in frame.getdata()])
        bound = frame.getchannel("A").getbbox()
        if bound is None or bound[0] < padding or bound[1] < padding or bound[2] > frame_size-padding or bound[3] > frame_size-padding:
            raise ValueError(f"Invalid normalized alpha bounds at frame {index}")
        outputs.append(frame)
        hashes.append(sha256(frame.tobytes()).hexdigest())
        canonical = source.crop(bounds[index]).resize((64, 64), Image.Resampling.NEAREST)
        canonical_hashes.append(sha256(canonical.tobytes()).hexdigest())
        output_bounds.append(bound)
        sheet.alpha_composite(frame, ((index % 4) * frame_size, (index // 4) * frame_size))
    for row, state in enumerate(states):
        window = slice(row * 4, row * 4 + 4)
        if len(set(hashes[window])) != 4 or len(set(canonical_hashes[window])) != 4:
            raise ValueError(f"Duplicate authored poses in {state}; regenerate, never synthesize replacements")
    idle = outputs[0]
    b = output_bounds[0]
    return sheet, idle, {
        "frameSize": frame_size, "columns": 4, "rows": 4, "frameCount": 16,
        "states": [{"id": state, "start": row*4, "end": row*4+3} for row, state in enumerate(states)],
        "sourceUnion": union, "uniformScale": scale, "normalizedSize": scaled_size,
        "padding": padding, "offset": offset, "frameAlphaBounds": output_bounds,
        "idleBounds": {"x": b[0], "y": b[1], "width": b[2]-b[0], "height": b[3]-b[1]},
        "frameRgbaSha256": hashes, "croppedPoseSha256": canonical_hashes,
        "uniqueFrameCount": len(set(hashes)), "uniqueCanonicalPoseCount": len(set(canonical_hashes))
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--states", default=",".join(DEFAULT_STATES))
    parser.add_argument("--frame-size", type=int, default=128)
    parser.add_argument("--padding", type=int, default=8)
    parser.add_argument("--background", choices=("magenta", "transparent"), default="magenta")
    parser.add_argument("--character-id")
    parser.add_argument("--pack", default="peace-walker")
    parser.add_argument("--prompt", type=Path)
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()
    states = tuple(value.strip() for value in args.states.split(","))
    if args.output.suffix.lower() != ".png":
        raise ValueError("--output must be a PNG path")
    idle_path = args.output.with_name(args.output.stem + "-idle.png")
    provenance_path = args.output.with_suffix(".provenance.json")
    targets = [args.output, idle_path, provenance_path]
    if args.source.resolve() in [p.resolve() for p in targets]:
        raise ValueError("Never overwrite the authored source")
    if not args.overwrite and any(p.exists() for p in targets):
        raise FileExistsError("Output already exists; use explicit --overwrite only for an authorized replacement")
    frames, grid = extract(args.source, args.background)
    sheet, idle, details = normalize(frames, states, args.frame_size, args.padding)
    report = {
        "schemaVersion": 1, "characterId": args.character_id or args.output.stem, "packId": args.pack,
        "provenance": "openai-authored-poses", "source": {"file": portable_repository_path(args.source), "sha256": sha256(args.source.read_bytes()).hexdigest(), "grid": grid},
        "processing": "cyan-grid extraction, explicit background key, common cell alignment, one shared union crop and uniform nearest-neighbor scale for all 16 poses; no pose synthesis",
        "background": args.background, "facing": "right", "runtime": details,
        "limitations": ["Pixel uniqueness validates distinct bitmaps, not automatically smooth gait, identity or canon fidelity; visual review is required."]
    }
    if args.prompt:
        report["promptSpec"] = json.loads(args.prompt.read_text(encoding="utf-8-sig"))
    portable_repository_path(args.output)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.output)
    idle.save(idle_path)
    report["outputs"] = {name: {"file": portable_repository_path(path), "sha256": sha256(path.read_bytes()).hexdigest()}
                         for name, path in (("sheet", args.output), ("idle", idle_path))}
    provenance_path.write_text(json.dumps(report, indent=2, ensure_ascii=False)+"\n", encoding="utf-8")
    print(json.dumps({"output": str(args.output), "idle": str(idle_path), "provenance": str(provenance_path),
                      "idleBounds": details["idleBounds"], "uniquePoses": details["uniqueCanonicalPoseCount"],
                      "states": states}, ensure_ascii=False))


if __name__ == "__main__":
    main()
