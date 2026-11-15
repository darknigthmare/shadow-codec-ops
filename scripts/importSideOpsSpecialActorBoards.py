#!/usr/bin/env python3
"""Import two real OpenAI 4x4 actor boards. No rigs or synthesized poses."""

from __future__ import annotations

import argparse
from hashlib import sha256
import json
import math
from pathlib import Path

from PIL import Image

from importSideOpsActorBoards import detect_grid_bands, extract_foreground


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'src' / 'data' / 'sideopsSpecialActorAnimations.json'
BOARDS = ('core', 'special')


def actor_definitions() -> dict[str, dict]:
    return {actor['id']: actor for actor in json.loads(MANIFEST.read_text(encoding='utf-8'))}


def extract_special_board(path: Path, background: str, inset: int, report: dict | None = None) -> list[Image.Image]:
    if not 0 <= inset <= 16:
        raise ValueError('Inset must be between 0 and 16 source pixels')
    board = Image.open(path).convert('RGBA')
    if min(board.size) < 512:
        raise ValueError(f'{path.name}: source too small for 16 authored poses: {board.size}')
    xs = detect_grid_bands(board, 'x', 4)
    ys = detect_grid_bands(board, 'y', 4)
    if bool(xs) != bool(ys):
        raise ValueError(f'{path.name}: incomplete cyan grid; both axes are required')
    if not xs and (board.width % 4 or board.height % 4):
        raise ValueError(f'{path.name}: no guides and dimensions not divisible by four')
    rects = []
    for row in range(4):
        for column in range(4):
            if xs and ys:
                left, right, top, bottom = xs[column], xs[column + 1], ys[row], ys[row + 1]
                rect = (max(left[1] + 1, round(sum(left) / 2) + inset),
                        max(top[1] + 1, round(sum(top) / 2) + inset),
                        min(right[0], round(sum(right) / 2) - inset),
                        min(bottom[0], round(sum(bottom) / 2) - inset))
            else:
                rect = (column * board.width // 4 + inset, row * board.height // 4 + inset,
                        (column + 1) * board.width // 4 - inset, (row + 1) * board.height // 4 - inset)
            if rect[2] <= rect[0] or rect[3] <= rect[1]:
                raise ValueError(f'{path.name}: invalid cell rectangle {rect}')
            rects.append(rect)
    width = max(rect[2] - rect[0] for rect in rects)
    height = max(rect[3] - rect[1] for rect in rects)
    frames = []
    for index, rect in enumerate(rects):
        cell = extract_foreground(board.crop(rect), background, cyan_guides=bool(xs))
        bbox = cell.getchannel('A').getbbox()
        label = f'{path.name}/row{index // 4 + 1}/phase{index % 4 + 1}'
        if not bbox:
            raise ValueError(f'{label}: empty cell; regenerate the source')
        if bbox[0] == 0 or bbox[1] == 0 or bbox[2] == cell.width or bbox[3] == cell.height:
            raise ValueError(f'{label}: foreground reaches cell edge; regenerate instead of clipping art')
        aligned = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        aligned.alpha_composite(cell, ((width - cell.width) // 2, height - cell.height))
        frames.append(aligned)
    if report is not None:
        report.update({'width': board.width, 'height': board.height,
                       'mode': 'detected-cyan-guides' if xs else 'uniform-grid',
                       'xGuides': xs, 'yGuides': ys, 'cellRects': rects, 'inset': inset,
                       'commonCellSize': [width, height],
                       'alignment': 'cell-bottom-center; no per-pose scaling',
                       'guideFringeKey': 'blue/cyan within 3 source edge pixels only' if xs else None})
    return frames


def calibrate_special_board(boards: dict[str, list[Image.Image]], special_scale: float,
                            core_anchor: int, special_anchor: int) -> tuple[dict[str, list[Image.Image]], dict]:
    """One scale for an entire source board, never a different scale per pose."""
    if not math.isfinite(special_scale) or not 0.25 <= special_scale <= 4:
        raise ValueError('Special board scale must be finite and between 0.25 and 4')
    if not 0 <= core_anchor < 16 or not 0 <= special_anchor < 16:
        raise ValueError('Anchor frame indices must be between 0 and 15')
    if special_scale == 1:
        return boards, {'mode': 'source-cell-bottom-center', 'specialScale': 1}
    scaled = {'core': boards['core'], 'special': [
        frame.resize((max(1, round(frame.width * special_scale)), max(1, round(frame.height * special_scale))), Image.Resampling.NEAREST)
        for frame in boards['special']
    ]}
    indices = {'core': core_anchor, 'special': special_anchor}
    boxes = {board: frames[indices[board]].getchannel('A').getbbox() for board, frames in scaled.items()}
    if not all(boxes.values()):
        raise ValueError('Calibration anchor must have a visible silhouette')
    # A single ground line from each selected upright anchor aligns the entire
    # board. Falling/kneeling poses retain their authored relative displacement.
    baseline = max(box[3] for box in boxes.values())
    below = max(frame.height - boxes[board][3] for board, frames in scaled.items() for frame in frames)
    width = max(frame.width for frames in scaled.values() for frame in frames)
    height = baseline + below
    output = {}
    for board, frames in scaled.items():
        output[board] = []
        for frame in frames:
            aligned = Image.new('RGBA', (width, height), (0, 0, 0, 0))
            aligned.alpha_composite(frame, ((width - frame.width) // 2, baseline - boxes[board][3]))
            output[board].append(aligned)
    return output, {
        'mode': 'explicit-uniform-special-board-scale-with-upright-anchor-baseline',
        'specialScale': special_scale, 'coreAnchor': core_anchor, 'specialAnchor': special_anchor,
        'originalAnchorBounds': {board: boards[board][indices[board]].getchannel('A').getbbox() for board in BOARDS},
        'scaledAnchorBounds': boxes, 'alignedBaseline': baseline,
        'canvas': [width, height], 'perPoseScaling': False
    }


def normalize_special_actor(boards: dict[str, list[Image.Image]], actor: dict,
                            special_scale: float = 1, core_anchor: int = 0,
                            special_anchor: int = 12) -> tuple[dict[str, Image.Image], dict]:
    if set(boards) != set(BOARDS) or any(len(boards[board]) != 16 for board in BOARDS):
        raise ValueError('Exactly core and special boards with 16 poses each are required')
    boards, calibration = calibrate_special_board(boards, special_scale, core_anchor, special_anchor)
    frame_size, padding = actor['frameSize'], actor['padding']
    if frame_size not in (128, 256) or padding != frame_size // 16:
        raise ValueError('Runtime cells must be 128/8 or 256/16 frame/padding pixels')
    frames = [frame for board in BOARDS for frame in boards[board]]
    width, height = max(frame.width for frame in frames), max(frame.height for frame in frames)
    aligned_boards = {}
    for board, source_frames in boards.items():
        aligned = []
        for source in source_frames:
            frame = Image.new('RGBA', (width, height), (0, 0, 0, 0))
            frame.alpha_composite(source, ((width - source.width) // 2, height - source.height))
            if not frame.getchannel('A').getbbox():
                raise ValueError(f'{board}: empty pose')
            aligned.append(frame)
        aligned_boards[board] = aligned
    bounds = [frame.getchannel('A').getbbox() for frames in aligned_boards.values() for frame in frames]
    common = (min(box[0] for box in bounds), min(box[1] for box in bounds),
              max(box[2] for box in bounds), max(box[3] for box in bounds))
    actor_width, actor_height = common[2] - common[0], common[3] - common[1]
    scale = min((frame_size - 2 * padding) / actor_width, (frame_size - 2 * padding) / actor_height)
    output, details = {}, {}
    for board, source_frames in aligned_boards.items():
        if len(actor['states'][board]) != 4:
            raise ValueError(f'{board}: the manifest must name exactly four actions')
        sheet = Image.new('RGBA', (frame_size * 4, frame_size * 4), (0, 0, 0, 0))
        hashes, pose_hashes = [], []
        for index, source in enumerate(source_frames):
            resized = source.crop(common).resize((max(1, round(actor_width * scale)), max(1, round(actor_height * scale))), Image.Resampling.NEAREST)
            frame = Image.new('RGBA', (frame_size, frame_size), (0, 0, 0, 0))
            frame.alpha_composite(resized, ((frame_size - resized.width) // 2, frame_size - padding - resized.height))
            frame.putdata([(r, g, b, a) if a else (0, 0, 0, 0) for r, g, b, a in frame.getdata()])
            sheet.alpha_composite(frame, ((index % 4) * frame_size, (index // 4) * frame_size))
            hashes.append(sha256(frame.tobytes()).hexdigest())
            canonical = source.crop(source.getchannel('A').getbbox()).resize((64, 64), Image.Resampling.NEAREST)
            pose_hashes.append(sha256(canonical.tobytes()).hexdigest())
        for row, state in enumerate(actor['states'][board]):
            phases = slice(row * 4, row * 4 + 4)
            if len(set(hashes[phases])) != 4 or len(set(pose_hashes[phases])) != 4:
                raise ValueError(f'{actor["id"]}/{state}: duplicate pose; regenerate distinct authored phases')
        output[board] = sheet
        details[board] = {'states': actor['states'][board], 'frameHashes': hashes, 'croppedPoseHashes': pose_hashes}
    return output, {'boardCalibration': calibration, 'commonSourceCanvas': [width, height], 'commonActorBounds': common,
                    'uniformScale': scale, 'sheets': details}


def main() -> None:
    actors = actor_definitions()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--actor', required=True, choices=actors)
    parser.add_argument('--core', type=Path, required=True)
    parser.add_argument('--special', type=Path, required=True)
    parser.add_argument('--background', choices=('transparent', 'magenta', 'white'), default='magenta')
    parser.add_argument('--inset', type=int, default=3)
    parser.add_argument('--core-inset', type=int)
    parser.add_argument('--special-inset', type=int)
    parser.add_argument('--special-scale', type=float, default=1, help='Explicit uniform scale for all 16 special poses, calibrated from upright source anchors')
    parser.add_argument('--core-anchor', type=int, default=0)
    parser.add_argument('--special-anchor', type=int, default=12)
    parser.add_argument('--output-root', type=Path, default=ROOT / 'public' / 'sideops' / 'special-animations',
                        help='Runtime actor directory root; allows verified staging on another disk before integration')
    parser.add_argument('--dry-run', action='store_true', help='Validate both boards without writing runtime files')
    args = parser.parse_args()
    actor = actors[args.actor]
    sources = {'core': args.core, 'special': args.special}
    source_grids = {board: {} for board in BOARDS}
    insets = {board: getattr(args, f'{board}_inset') if getattr(args, f'{board}_inset') is not None else args.inset for board in BOARDS}
    extracted = {board: extract_special_board(path, args.background, insets[board], source_grids[board]) for board, path in sources.items()}
    normalized, details = normalize_special_actor(extracted, actor, args.special_scale, args.core_anchor, args.special_anchor)
    hashes = {board: sha256(path.read_bytes()).hexdigest() for board, path in sources.items()}
    if len(set(hashes.values())) != 2:
        raise ValueError('Core and special must be independently authored source boards')
    if args.dry_run:
        print(f'Validated {actor["id"]}: 2 sheets, 32 authored poses, 8 actions; dry-run, no files changed')
        return
    destination = args.output_root.resolve() / actor['id']
    report = {
        'schemaVersion': 1, 'actorId': actor['id'], 'sourceTextureKey': actor['sourceTextureKey'],
        'provenance': 'openai-authored-poses', 'sourceFacing': actor['sourceFacing'],
        'sourceGrid': {'columns': 4, 'rows': 4},
        'runtimeGrid': {'columns': 4, 'rows': 4, 'frameWidth': actor['frameSize'], 'frameHeight': actor['frameSize'], 'padding': actor['padding']},
        'processing': 'crop, explicit background extraction, optional recorded whole-board anchor calibration, common core/special canvas, uniform per-actor nearest-neighbor scale, grounded padding; no pose synthesis',
        'sources': {board: {'file': path.name, 'sha256': hashes[board], 'grid': source_grids[board]} for board, path in sources.items()},
        **details
    }
    destination.mkdir(parents=True, exist_ok=True)
    for board, sheet in normalized.items():
        path = destination / f'{board}.png'
        sheet.save(path, 'PNG', optimize=True)
        report['sheets'][board].update({'file': path.name, 'sha256': sha256(path.read_bytes()).hexdigest()})
        print(f'Saved {path} ({sheet.width}x{sheet.height}; 16 authored phases)')
    (destination / 'provenance.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(f'Validated {actor["id"]}: 2 sheets, 32 authored poses, 8 actions')


if __name__ == '__main__':
    main()
