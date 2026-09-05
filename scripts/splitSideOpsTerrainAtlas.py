"""Crop and normalize the original OpenAI 4x3 terrain boards; no generated repainting."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw

PACKS = [
    'mg1', 'mg2', 'mgs1', 'mgs2_tanker', 'mgs2_plant', 'mgs3',
    'mgs4', 'peace_walker', 'mgsv_ground_zeroes', 'mgsv_phantom_pain',
    'vr_simulation', 'patriots_ai',
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def process(root: Path) -> None:
    sources = root / 'scripts/art_sources/all-eras-terrain'
    destination = root / 'public/sideops/terrain'
    destination.mkdir(parents=True, exist_ok=True)
    provenance = {'generator': 'OpenAI ImageGen built-in', 'grid': [4, 3], 'sources': {}, 'tiles': []}
    preview = Image.new('RGB', (784, 12 * 124), '#08110d')
    draw = ImageDraw.Draw(preview)

    for board in ('ground', 'structure'):
        source_path = sources / f'{board}-atlas-openai.png'
        atlas = Image.open(source_path).convert('RGB')
        provenance['sources'][board] = {'path': str(source_path.relative_to(root)).replace('\\', '/'), 'sha256': sha256(source_path), 'width': atlas.width, 'height': atlas.height}
        height = 64 if board == 'ground' else 32
        for index, pack in enumerate(PACKS):
            column, row = index % 4, index // 4
            left, right = round(column * atlas.width / 4), round((column + 1) * atlas.width / 4)
            top, bottom = round(row * atlas.height / 3), round((row + 1) * atlas.height / 3)
            # Remove only the thin atlas boundary and empty strip above structure caps.
            top_inset = 0 if board == 'ground' else round((bottom - top) * (0.11 if row == 0 else 0.08))
            crop = [left + 2, top + top_inset, right - 2, bottom - 2]
            tile = atlas.crop(crop).resize((128, height), Image.Resampling.LANCZOS)
            path = destination / f'{pack}-{board}.png'
            tile.save(path, optimize=True)
            edge_delta = sum(abs(a - b) for y in range(height) for a, b in zip(tile.getpixel((0, y)), tile.getpixel((127, y)))) / (height * 3)
            provenance['tiles'].append({'packId': pack, 'board': board, 'path': f'/sideops/terrain/{pack}-{board}.png', 'sha256': sha256(path), 'crop': crop, 'width': 128, 'height': height, 'edgeMeanDifference': round(edge_delta, 3)})
            y = index * 124 + (24 if board == 'ground' else 90)
            if board == 'ground':
                draw.text((8, index * 124 + 6), pack, fill='#b9d6c3')
            for repeat in range(6):
                preview.paste(tile, (8 + repeat * 128, y))

    (destination / 'provenance.json').write_text(json.dumps(provenance, indent=2) + '\n', encoding='utf-8')
    preview.save(sources / 'repetition-review.png')
    print(f'Saved {len(provenance["tiles"])} terrain tiles and six-repeat review board.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path.cwd())
    process(parser.parse_args().root.resolve())
