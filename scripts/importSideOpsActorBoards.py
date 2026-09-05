#!/usr/bin/env python3
"""Extract authored OpenAI poses; never synthesize animation from still images.

Each source board has 8 columns x 6 rows. Two rows per actor, in this
order: player, guard, reinforcement. Each source row contains two 4-frame
actions. Mobility actions: idle/move/crouch/jump. Combat: attack/melee/hit/death.
Outputs: six 512x512 RGBA sheets, each a 4x4 grid of 128px frames, plus provenance.
"""

from __future__ import annotations

import argparse
from collections import deque
from hashlib import sha256
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PACKS = (
    "mg1", "mg2", "mgs1", "mgs2_tanker", "mgs2_plant", "mgs3", "mgs4",
    "peace_walker", "mgsv_ground_zeroes", "mgsv_phantom_pain", "vr_simulation", "patriots_ai",
)
ROLES = ("player", "guard", "reinforcement")
STATES = {
    "mobility": ("idle", "move", "crouch", "jump"),
    "combat": ("attack", "melee", "hit", "death"),
}
FRAME_SIZE = 128
PADDING = 8


def extract_foreground(cell: Image.Image, background: str, cyan_guides: bool = False) -> Image.Image:
    """Preserve generated transparency or explicitly remove a plain key color."""
    result = cell.convert("RGBA")
    pixels = result.load()
    if cyan_guides:
        # Detected guide bands exclude the cyan core. Their antialiased
        # blue/violet fringe can extend three pixels into a magenta cell.
        # Key only that distinctive guide color, never whole edge strips:
        # dark boots, weapons and muted blue-gray suits remain untouched.
        for y in range(result.height):
            for x in range(result.width):
                if min(x, y, result.width - 1 - x, result.height - 1 - y) < 3:
                    r, g, b, a = pixels[x, y]
                    if b > 150 and b - r > 45:
                        pixels[x, y] = (0, 0, 0, 0)
    if background != "transparent":
        key = (255, 0, 255) if background == "magenta" else (255, 255, 255)
        def matches_key(color: tuple[int, int, int, int]) -> bool:
            if background == "magenta":
                r, g, b, _ = color
                return r > 35 and b > 35 and g <= min(r, b) * 0.55 and abs(r - b) < max(r, b) * 0.4
            return max(abs(color[i] - key[i]) for i in range(3)) <= 52
        pending = deque()
        for x in range(result.width):
            pending.extend(((x, 0), (x, result.height - 1)))
        for y in range(result.height):
            pending.extend(((0, y), (result.width - 1, y)))
        visited = set()
        while pending:
            x, y = pending.popleft()
            if (x, y) in visited:
                continue
            visited.add((x, y))
            color = pixels[x, y]
            if color[3] == 0 or matches_key(color):
                pixels[x, y] = (0, 0, 0, 0)
                if x > 0:
                    pending.append((x - 1, y))
                if x + 1 < result.width:
                    pending.append((x + 1, y))
                if y > 0:
                    pending.append((x, y - 1))
                if y + 1 < result.height:
                    pending.append((x, y + 1))
        # The deliberate key color also appears in enclosed spaces between an
        # arm and torso. Removing it is background extraction, not pose editing.
        if background == "magenta":
            for y in range(result.height):
                for x in range(result.width):
                    if matches_key(pixels[x, y]):
                        pixels[x, y] = (0, 0, 0, 0)
    for y in range(result.height):
        for x in range(result.width):
            red, green, blue, alpha = pixels[x, y]
            pixels[x, y] = (red, green, blue, alpha) if alpha >= 24 else (0, 0, 0, 0)
    return result


def detect_grid_bands(board: Image.Image, axis: str, count: int) -> list[tuple[int, int]] | None:
    """Find long cyan guides; never infer a missing pose from painted content."""
    width, height = board.size
    length, cross_length = (width, height) if axis == "x" else (height, width)
    pixels = board.load()
    hits = []
    for coordinate in range(length):
        cyan = 0
        for cross in range(cross_length):
            r, g, b, a = pixels[coordinate, cross] if axis == "x" else pixels[cross, coordinate]
            cyan += int(a > 200 and g > 145 and b > 160 and g - r > 60 and b - r > 60)
        if cyan / cross_length >= 0.55:
            hits.append(coordinate)
    if not hits:
        return None
    bands: list[tuple[int, int]] = []
    for coordinate in hits:
        if bands and coordinate <= bands[-1][1] + 2:
            bands[-1] = (bands[-1][0], coordinate)
        else:
            bands.append((coordinate, coordinate))
    internal = [band for band in bands if band[0] > 8 and band[1] < length - 9]
    if len(internal) != count - 1:
        raise ValueError(f"Grid {axis}: expected {count - 1} internal cyan guides, found {len(internal)}; regenerate a complete grid")
    first = next((band for band in bands if band[0] <= 8), (-1, -1))
    last = next((band for band in bands if band[1] >= length - 9), (length, length))
    result = [first, *internal, last]
    widths = [right[0] - left[1] - 1 for left, right in zip(result, result[1:])]
    if min(widths) < length / count * 0.5 or max(widths) > length / count * 1.5:
        raise ValueError(f"Grid {axis}: irregular or merged cells: {widths}")
    return result


def extract_board(path: Path, background: str, inset: int = 5, grid_report: dict | None = None) -> dict[str, list[Image.Image]]:
    board = Image.open(path).convert("RGBA")
    if board.width < 768 or board.height < 576:
        raise ValueError(f"{path}: source is too small for 48 authored poses: {board.size}")
    x_guides = detect_grid_bands(board, "x", 8)
    y_guides = detect_grid_bands(board, "y", 6)
    if bool(x_guides) != bool(y_guides):
        raise ValueError(f"{path}: incomplete cyan grid; both axes are required")
    rects = []
    for row in range(6):
        for column in range(8):
            if x_guides and y_guides:
                left, right = x_guides[column], x_guides[column + 1]
                top, bottom = y_guides[row], y_guides[row + 1]
                # Insets are measured from guide centers, not from a guessed
                # equidistant grid. Cyan pixels themselves are always excluded.
                rect = (max(left[1] + 1, round(sum(left) / 2) + inset),
                        max(top[1] + 1, round(sum(top) / 2) + inset),
                        min(right[0], round(sum(right) / 2) - inset),
                        min(bottom[0], round(sum(bottom) / 2) - inset))
            else:
                rect = (round(column * board.width / 8) + inset,
                        round(row * board.height / 6) + inset,
                        round((column + 1) * board.width / 8) - inset,
                        round((row + 1) * board.height / 6) - inset)
            rects.append(rect)
    max_cell_width = max(rect[2] - rect[0] for rect in rects)
    max_cell_height = max(rect[3] - rect[1] for rect in rects)
    if grid_report is not None:
        grid_report.update({"width": board.width, "height": board.height,
                            "mode": "detected-cyan-guides" if x_guides else "uniform-grid",
                            "xGuides": x_guides, "yGuides": y_guides,
                            "cellRects": rects, "inset": inset,
                            "alignment": "cell-bottom-center; no per-pose scaling",
                            "commonCellSize": [max_cell_width, max_cell_height],
                            "guideFringeKey": "blue/cyan within 3 source edge pixels only" if x_guides else None})
    output: dict[str, list[Image.Image]] = {}
    for role_index, role in enumerate(ROLES):
        frames = []
        for state_index in range(4):
            source_row = role_index * 2 + state_index // 2
            for phase in range(4):
                source_column = (state_index % 2) * 4 + phase
                rect = rects[source_row * 8 + source_column]
                cell = extract_foreground(board.crop(rect), background, bool(x_guides))
                bbox = cell.getchannel("A").getbbox()
                label = f"{path.name}/{role}/action{state_index}/phase{phase}"
                if bbox is None:
                    raise ValueError(f"{label}: empty cell; regenerate the source")
                if bbox[0] == 0 or bbox[1] == 0 or bbox[2] == cell.width or bbox[3] == cell.height:
                    raise ValueError(f"{label}: foreground reaches cell edge; grid or transparency needs correction")
                # Retain cell coordinates so knees and weapon offsets are not
                # independently recentered between animation phases.
                aligned = Image.new("RGBA", (max_cell_width, max_cell_height), (0, 0, 0, 0))
                aligned.alpha_composite(cell, ((max_cell_width - cell.width) // 2, max_cell_height - cell.height))
                frames.append(aligned)
        output[role] = frames
    return output


def normalize_actor(boards: dict[str, list[Image.Image]]) -> tuple[dict[str, Image.Image], dict]:
    frames = [frame for board in boards.values() for frame in board]
    cell_width = max(frame.width for frame in frames)
    cell_height = max(frame.height for frame in frames)
    aligned_boards = {}
    for name, source_frames in boards.items():
        aligned_frames = []
        for source in source_frames:
            aligned = Image.new("RGBA", (cell_width, cell_height), (0, 0, 0, 0))
            aligned.alpha_composite(source, ((cell_width - source.width) // 2, cell_height - source.height))
            aligned_frames.append(aligned)
        aligned_boards[name] = aligned_frames
    boards = aligned_boards
    frames = [frame for board in boards.values() for frame in board]
    bounds = [frame.getchannel("A").getbbox() for frame in frames]
    actor_bounds = (min(box[0] for box in bounds), min(box[1] for box in bounds),
                    max(box[2] for box in bounds), max(box[3] for box in bounds))
    actor_width, actor_height = actor_bounds[2] - actor_bounds[0], actor_bounds[3] - actor_bounds[1]
    scale = min((FRAME_SIZE - 2 * PADDING) / actor_width,
                (FRAME_SIZE - 2 * PADDING) / actor_height)
    output: dict[str, Image.Image] = {}
    details = {}
    for board, source_frames in boards.items():
        sheet = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
        hashes = []
        cropped_hashes = []
        for index, source in enumerate(source_frames):
            width, height = max(1, round(actor_width * scale)), max(1, round(actor_height * scale))
            sprite = source.crop(actor_bounds).resize((width, height), Image.Resampling.NEAREST)
            frame = Image.new("RGBA", (FRAME_SIZE, FRAME_SIZE), (0, 0, 0, 0))
            frame.alpha_composite(sprite, ((FRAME_SIZE - width) // 2, FRAME_SIZE - PADDING - height))
            # Clear hidden RGB after alpha composition for safe texture filtering.
            frame.putdata([(r, g, b, a) if a else (0, 0, 0, 0) for r, g, b, a in frame.getdata()])
            sheet.alpha_composite(frame, ((index % 4) * FRAME_SIZE, (index // 4) * FRAME_SIZE))
            hashes.append(sha256(frame.tobytes()).hexdigest())
            # A translated/scaled clone cannot pass as a newly authored phase.
            canonical = source.crop(source.getchannel("A").getbbox()).resize((64, 64), Image.Resampling.NEAREST)
            cropped_hashes.append(sha256(canonical.tobytes()).hexdigest())
        for action_index, state in enumerate(STATES[board]):
            indexes = slice(action_index * 4, (action_index + 1) * 4)
            if len(set(hashes[indexes])) != 4 or len(set(cropped_hashes[indexes])) != 4:
                raise ValueError(f"{board}/{state}: duplicated pose; regenerate distinct authored phases")
        output[board] = sheet
        details[board] = {"frameHashes": hashes, "croppedPoseHashes": cropped_hashes}
    return output, details


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pack", choices=PACKS, required=True)
    parser.add_argument("--mobility", type=Path, required=True)
    parser.add_argument("--combat", type=Path, required=True)
    parser.add_argument("--background", choices=("transparent", "magenta", "white"), default="transparent")
    parser.add_argument("--inset", type=int, default=5, help="Discard thin source grid guides at cell edges")
    args = parser.parse_args()
    sources = {"mobility": args.mobility, "combat": args.combat}
    if args.inset < 0 or args.inset > 16:
        raise ValueError("Cell inset must be between 0 and 16 source pixels")
    source_grids: dict[str, dict] = {}
    extracted = {board: extract_board(path, args.background, args.inset, source_grids.setdefault(board, {})) for board, path in sources.items()}
    destination = ROOT / "public" / "sideops" / "actor-animations" / args.pack
    # Validate the complete pack before writing any output.
    normalized = {role: normalize_actor({board: extracted[board][role] for board in STATES}) for role in ROLES}
    source_hashes = {board: sha256(path.read_bytes()).hexdigest() for board, path in sources.items()}
    if len(set(source_hashes.values())) != 2:
        raise ValueError("Mobility and combat must be independently authored boards")
    destination.mkdir(parents=True, exist_ok=True)
    report = {
        "schemaVersion": 1,
        "packId": args.pack,
        "provenance": "openai-authored-poses",
        "sourceGrid": {"columns": 8, "rows": 6},
        "runtimeGrid": {"columns": 4, "rows": 4, "frameWidth": 128, "frameHeight": 128},
        "processing": "crop, explicit background extraction, uniform per-actor nearest-neighbor scale, grounded padding; no pose synthesis",
        "sources": {board: {"file": path.name, "sha256": source_hashes[board], "grid": source_grids[board]} for board, path in sources.items()},
        "actors": {},
    }
    for role, (sheets, details) in normalized.items():
        report["actors"][role] = details
        for board, sheet in sheets.items():
            target = destination / f"{role}-{board}.png"
            sheet.save(target, "PNG", optimize=True)
            details[board]["file"] = target.name
            details[board]["sha256"] = sha256(target.read_bytes()).hexdigest()
            print(f"Saved {target} (512x512; 16 authored frames)")
    (destination / "provenance.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"Validated {args.pack}: 6 sheets, 96 authored poses, 8 actions per actor")


if __name__ == "__main__":
    main()
