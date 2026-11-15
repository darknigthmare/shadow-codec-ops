#!/usr/bin/env python3
"""Mechanically extract a selected group's authored projectile phases; never synthesize frames."""
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
SHEET_FILES = {
    "mecha": ("mecha-projectiles-openai.png", "manifest.json"),
    "peace-walker": ("peace-walker-projectiles-openai.png", "peace-walker-manifest.json"),
    "peace-walker-support": ("peace-walker-support-projectiles-openai.png", "peace-walker-support-manifest.json"),
}

def select_definitions(definitions: list[dict], sheet_id: str) -> list[dict]:
    if sheet_id not in SHEET_FILES:
        raise ValueError(f"Unknown projectile sheet group: {sheet_id}")
    # Historical definitions intentionally have no sheetId and remain byte-for-byte unchanged.
    selected = [item for item in definitions if item.get("sheetId", "mecha") == sheet_id]
    if len(selected) not in (2, 4) or sorted(item["row"] for item in selected) != list(range(len(selected))):
        raise ValueError("Selected group must map exactly two or four unique contiguous rows")
    for key in ("id", "path", "textureKey", "sourceTextureKey"):
        values = [item[key] for item in definitions]
        if len(values) != len(set(values)):
            raise ValueError(f"Duplicate {key} across projectile groups would overwrite or misroute an asset")
    return selected

def projectile_grid_bands(board: Image.Image, axis: str, count: int) -> list[tuple[int, int]] | None:
    try:
        return detect_grid_bands(board, axis, count)
    except ValueError as original_error:
        # A complete authored outer border can be slightly inset. Keep historical
        # detection first; fallback accepts only all count+1 real cyan bands, never
        # synthesizes an edge or a missing internal divider from projectile art.
        length, cross_length = board.size if axis == "x" else board.size[::-1]
        pixels = board.load()
        bands = []
        for coordinate in range(length):
            cyan = 0
            for cross in range(cross_length):
                r, g, b, a = pixels[coordinate, cross] if axis == "x" else pixels[cross, coordinate]
                cyan += int(a > 200 and g > 145 and b > 160 and g - r > 60 and b - r > 60)
            if cyan / cross_length >= .55:
                if bands and coordinate <= bands[-1][1] + 2:
                    bands[-1] = (bands[-1][0], coordinate)
                else:
                    bands.append((coordinate, coordinate))
        if len(bands) != count + 1 or bands[0][0] > length * .025 or bands[-1][1] < length * .975:
            raise original_error
        widths = [right[0] - left[1] - 1 for left, right in zip(bands, bands[1:])]
        if min(widths) < length / count * .5 or max(widths) > length / count * 1.5:
            raise original_error
        return bands

def extract_rows(source: Path, row_count: int = 4) -> tuple[list[list[Image.Image]], dict]:
    if row_count not in (2, 4):
        raise ValueError("Only two or four authored rows are supported")
    board = Image.open(source).convert("RGBA")
    if board.width < 512 or board.height < 256:
        raise ValueError(f"A complete 4x{row_count} authored board is required")
    xs = projectile_grid_bands(board, "x", 4)
    ys = projectile_grid_bands(board, "y", row_count)
    if xs is None or ys is None:
        raise ValueError(f"Cyan guides must separate four columns and {row_count} rows")
    rows, rects = [], []
    for row in range(row_count):
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
    parser.add_argument("--sheet-id", choices=tuple(SHEET_FILES), default="mecha")
    parser.add_argument("--prompt-file", type=Path)
    args = parser.parse_args()
    if args.prompt_file is None and args.sheet_id != "mecha":
        parser.error("--prompt-file is required for a new sheet group; never reuse another board's prompt")
    prompt_file = args.prompt_file or ROOT / "scripts/art_sources/mecha-projectiles/prompts.json"
    definitions = select_definitions(json.loads(DEFINITIONS.read_text(encoding="utf-8")), args.sheet_id)
    rows, grid = extract_rows(args.source, len(definitions))
    # Validate all phases and prompt provenance before any source/runtime asset is written.
    prepared = [(item, *normalize_row(rows[item["row"]], item["frameWidth"], item["frameHeight"])) for item in definitions]
    prompt_spec = json.loads(prompt_file.read_text(encoding="utf-8"))
    output_root = args.output_root.resolve()
    source_name, manifest_name = SHEET_FILES[args.sheet_id]
    source_relative = Path("scripts/art_sources/mecha-projectiles") / source_name
    source_output = output_root / source_relative
    source_output.parent.mkdir(parents=True, exist_ok=True)
    if args.source.resolve() != source_output:
        shutil.copy2(args.source, source_output)
    manifest = {
        "generator": "OpenAI built-in imagegen", "provenance": "openai-authored-phases",
        "source": source_relative.as_posix(), "sourceSha256": sha256(source_output.read_bytes()).hexdigest(),
        "promptSpec": prompt_spec,
        "grid": grid, "operations": ["cyan-grid crop", "magenta background removal", "shared row bounds", "uniform nearest-neighbor scaling", "RGBA atlas assembly"],
        "authoredPhases": len(definitions) * 4, "synthesizedPhases": 0, "outputs": []
    }
    if args.sheet_id != "mecha":
        manifest["sheetId"] = args.sheet_id
    for item, sheet, metadata in prepared:
        target = output_root / "public" / item["path"].lstrip("/")
        target.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(target, format="PNG", optimize=True)
        manifest["outputs"].append({"id": item["id"], "path": item["path"], "width": sheet.width, "height": sheet.height, "sha256": sha256(target.read_bytes()).hexdigest(), **metadata})
    manifest_path = output_root / "scripts/art_sources/mecha-projectiles" / manifest_name
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"outputRoot": str(output_root), "source": str(source_output), "manifest": str(manifest_path), "sheetId": args.sheet_id, "outputs": len(prepared), "authoredPhases": len(definitions) * 4, "synthesizedPhases": 0}))

if __name__ == "__main__":
    main()
