#!/usr/bin/env python3
"""Mechanically extract 16 genuinely authored projectile phases; never synthesize frames."""
from __future__ import annotations
import argparse
from hashlib import sha256
import json
from pathlib import Path
import shutil
from PIL import Image
from importSideOpsActorBoards import detect_grid_bands, extract_foreground

ROOT = Path(__file__).resolve().parents[1]
DEFINITIONS = ROOT / "src/data/sideopsBossProjectileVisuals.json"

def extract_rows(source: Path) -> tuple[list[list[Image.Image]], dict]:
    board = Image.open(source).convert("RGBA")
    if board.width < 512 or board.height < 256:
        raise ValueError("A complete 4x4 authored board is required")
    xs = detect_grid_bands(board, "x", 4)
    ys = detect_grid_bands(board, "y", 4)
    if xs is None or ys is None:
        raise ValueError("Both axes require four cells separated by cyan guides")
    rows, rects = [], []
    for row in range(4):
        cells = []
        for column in range(4):
            # Three source pixels isolate antialiased guide fringes. Real
            # projectiles still must remain strictly inside the cropped cell.
            rect = (xs[column][1] + 4, ys[row][1] + 4, xs[column + 1][0] - 3, ys[row + 1][0] - 3)
            cell = extract_foreground(board.crop(rect), "magenta", cyan_guides=True)
            # Remove remaining saturated pink key-spill around orange glow.
            # This only changes alpha of chroma-background pixels, never RGB,
            # geometry, interpolation or the authored animation phase.
            pixels = cell.load()
            for y in range(cell.height):
                for x in range(cell.width):
                    r, g, b, a = pixels[x, y]
                    if a and r > 80 and b > 80 and g < min(r, b) * .7 and b > r * .4 and r > b * .5:
                        pixels[x, y] = (0, 0, 0, 0)
            bbox = cell.getchannel("A").getbbox()
            if bbox is None:
                raise ValueError(f"Empty row{row}/phase{column}")
            if bbox[0] <= 0 or bbox[1] <= 0 or bbox[2] >= cell.width or bbox[3] >= cell.height:
                raise ValueError(f"Clipped foreground row{row}/phase{column}")
            cells.append(cell)
            rects.append(rect)
        width, height = max(c.width for c in cells), max(c.height for c in cells)
        aligned = []
        for cell in cells:
            frame = Image.new("RGBA", (width, height))
            frame.alpha_composite(cell, ((width - cell.width) // 2, (height - cell.height) // 2))
            aligned.append(frame)
        rows.append(aligned)
    return rows, {"sourceSize": list(board.size), "xGuides": xs, "yGuides": ys, "cellRects": rects, "guideInset": 3}

def normalize_row(frames: list[Image.Image], frame_width: int = 192, frame_height: int = 64) -> tuple[Image.Image, dict]:
    if len(frames) != 4:
        raise ValueError("Exactly four authored phases are required")
    bounds = [frame.getchannel("A").getbbox() for frame in frames]
    if any(bound is None for bound in bounds):
        raise ValueError("Empty phase")
    union = (min(b[0] for b in bounds), min(b[1] for b in bounds), max(b[2] for b in bounds), max(b[3] for b in bounds))
    width, height = union[2] - union[0], union[3] - union[1]
    scale = min((frame_width - 16) / width, (frame_height - 16) / height)
    normalized_size = (max(1, round(width * scale)), max(1, round(height * scale)))
    offset = ((frame_width - normalized_size[0]) // 2, (frame_height - normalized_size[1]) // 2)
    sheet = Image.new("RGBA", (frame_width * 4, frame_height))
    hashes, output_bounds = [], []
    for index, frame in enumerate(frames):
        output = Image.new("RGBA", (frame_width, frame_height))
        output.alpha_composite(frame.crop(union).resize(normalized_size, Image.Resampling.NEAREST), offset)
        hashes.append(sha256(output.tobytes()).hexdigest())
        output_bounds.append(output.getchannel("A").getbbox())
        sheet.alpha_composite(output, (index * frame_width, 0))
    if len(set(hashes)) != 4:
        raise ValueError("Duplicate output phases: regenerate the source, never synthesize replacements")
    return sheet, {"sourceUnion": union, "uniformScale": scale, "normalizedSize": normalized_size, "alignment": "one shared crop and scale per row; fixed center", "frameAlphaBounds": output_bounds, "frameRgbaSha256": hashes}

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--output-root", type=Path, default=ROOT)
    parser.add_argument("--prompt-file", type=Path, default=ROOT / "scripts/art_sources/mecha-projectiles/prompts.json")
    args = parser.parse_args()
    definitions = json.loads(DEFINITIONS.read_text(encoding="utf-8"))
    rows, grid = extract_rows(args.source)
    if len(definitions) != 4 or sorted(item["row"] for item in definitions) != list(range(4)):
        raise ValueError("Runtime manifest must map exactly four unique rows")
    output_root = args.output_root.resolve()
    source_relative = Path("scripts/art_sources/mecha-projectiles/mecha-projectiles-openai.png")
    source_output = output_root / source_relative
    source_output.parent.mkdir(parents=True, exist_ok=True)
    if args.source.resolve() != source_output:
        shutil.copy2(args.source, source_output)
    manifest = {
        "generator": "OpenAI built-in imagegen", "provenance": "openai-authored-phases",
        "source": source_relative.as_posix(), "sourceSha256": sha256(source_output.read_bytes()).hexdigest(),
        "promptSpec": json.loads(args.prompt_file.read_text(encoding="utf-8")),
        "grid": grid, "operations": ["cyan-grid crop", "magenta background removal", "shared row bounds", "uniform nearest-neighbor scaling", "RGBA atlas assembly"],
        "authoredPhases": 16, "synthesizedPhases": 0, "outputs": []
    }
    # Validate every row before writing any runtime asset.
    prepared = [(item, *normalize_row(rows[item["row"]], item["frameWidth"], item["frameHeight"])) for item in definitions]
    for item, sheet, metadata in prepared:
        target = output_root / "public" / item["path"].lstrip("/")
        target.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(target, format="PNG", optimize=True)
        manifest["outputs"].append({"id": item["id"], "path": item["path"], "width": sheet.width, "height": sheet.height, "sha256": sha256(target.read_bytes()).hexdigest(), **metadata})
    manifest_path = output_root / "scripts/art_sources/mecha-projectiles/manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"outputRoot": str(output_root), "source": str(source_output), "manifest": str(manifest_path), "outputs": len(prepared), "authoredPhases": 16, "synthesizedPhases": 0}))

if __name__ == "__main__":
    main()
