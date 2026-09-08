#!/usr/bin/env python3
"""Extract eight OpenAI-authored objects mechanically; never paint substitute art."""
from __future__ import annotations

import argparse
from hashlib import sha256
import json
from pathlib import Path

from PIL import Image
from importMechaProjectileBoard import projectile_grid_bands
from importSideOpsActorBoards import extract_foreground
from exportSideOpsSpecialActorIdle import atomic_write, fit_bottom_center, png_bytes, within_root

ROOT = Path(__file__).resolve().parents[1]


def validate_definitions(definitions: list[dict]) -> None:
    if len(definitions) != 8 or {(d['row'], d['column']) for d in definitions} != {(r, c) for r in range(2) for c in range(4)}:
        raise ValueError('Exactly eight unique cells in a 4x2 grid are required')
    for key in ('id', 'textureKey', 'path'):
        if len({d[key] for d in definitions}) != len(definitions):
            raise ValueError(f'Duplicate {key}')
    for item in definitions:
        if not all(isinstance(item[k], int) and item[k] > 0 for k in ('width', 'height')):
            raise ValueError('Output dimensions must be positive integers')
        if item['path'] != f"/sideops/common-props/{item['id']}.png" or not item['id'].replace('-', '').isalnum():
            raise ValueError('Output path must match one safe common-prop identifier')


def extract_objects(board: Image.Image, definitions: list[dict], structures: Image.Image | None = None, *, include_deferred: bool = False) -> tuple[list[tuple], dict]:
    validate_definitions(definitions)
    board = board.convert('RGBA')
    xs = projectile_grid_bands(board, 'x', 4)
    ys = projectile_grid_bands(board, 'y', 2)
    if xs is None or ys is None:
        raise ValueError('All real cyan grid dividers are required')
    structural_grid = None
    if structures is not None:
        structures = structures.convert('RGBA')
        sx = projectile_grid_bands(structures, 'x', 2)
        sy = projectile_grid_bands(structures, 'y', 1)
        if sx is None or sy is None:
            raise ValueError('The structural replacement source must contain a real 2x1 cyan grid')
        structural_grid = {'sourceSize': list(structures.size), 'xGuides': sx, 'yGuides': sy}
    prepared = []
    for item in definitions:
        if item.get('runtimeStatus') == 'deferred' and not include_deferred:
            continue
        row, col = item['row'], item['column']
        rect = (xs[col][1] + 4, ys[row][1] + 4, xs[col + 1][0] - 3, ys[row + 1][0] - 3)
        source_board, source_id = board, 'main'
        if structures is not None and item['id'] in ('door', 'elevator'):
            col = 0 if item['id'] == 'door' else 1
            rect = (sx[col][1] + 4, sy[0][1] + 4, sx[col + 1][0] - 3, sy[1][0] - 3)
            source_board, source_id = structures, 'structures'
        foreground = extract_foreground(source_board.crop(rect), 'magenta', cyan_guides=True)
        bounds = foreground.getchannel('A').getbbox()
        if bounds is None or bounds[0] <= 0 or bounds[1] <= 0 or bounds[2] >= foreground.width or bounds[3] >= foreground.height:
            raise ValueError(f"Empty or clipped authored object: {item['id']}")
        image, fit = fit_bottom_center(foreground, item['width'], item['height'])
        if item['id'] in ('door', 'elevator'):
            fitted_width, fitted_height = fit['fittedSize']
            if fitted_width < item['width'] - 3 or fitted_height < item['height'] - 3:
                raise ValueError(f"Authored {item['id']} aspect ratio leaves an invisible interaction boundary; regenerate the source")
        prepared.append((item, png_bytes(image), {'sourceId': source_id, 'cellRect': list(rect), 'sourceAlphaBounds': list(bounds), **fit}))
    if len({sha256(data).hexdigest() for _, data, _ in prepared}) != len(prepared):
        raise ValueError('Duplicate outputs are not valid authored objects')
    return prepared, {'sourceSize': list(board.size), 'xGuides': xs, 'yGuides': ys, 'guideInset': 3, 'structures': structural_grid}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--output-root', type=Path, default=ROOT)
    parser.add_argument('--overwrite', action='store_true', help='Explicitly replace this eight-prop group after source validation')
    parser.add_argument('--prompt-file', type=Path, default=ROOT / 'scripts/art_sources/common-props/prompts.json')
    parser.add_argument('--structures-source', type=Path)
    parser.add_argument('--structures-prompt-file', type=Path)
    args = parser.parse_args()
    if bool(args.structures_source) != bool(args.structures_prompt_file):
        parser.error('--structures-source and --structures-prompt-file must be supplied together')
    root = args.output_root.resolve(strict=True)
    definitions = json.loads((ROOT / 'src/data/sideopsCommonProps.json').read_text(encoding='utf-8'))
    prompts = json.loads(args.prompt_file.read_text(encoding='utf-8'))
    prepared, grid = extract_objects(Image.open(args.source), definitions, Image.open(args.structures_source) if args.structures_source else None)
    source_relative = Path('scripts/art_sources/common-props/common-props-openai.png')
    source_output = within_root(root / source_relative, root, 'source output', strict=False)
    provenance_output = within_root(root / 'scripts/art_sources/common-props/provenance.json', root, 'provenance', strict=False)
    targets = [within_root(root / 'public' / item['path'].lstrip('/'), root, 'runtime prop', strict=False) for item, _, _ in prepared]
    structural_outputs = []
    if args.structures_source:
        structural_outputs = [within_root(root / 'scripts/art_sources/common-props' / filename, root, 'structural source', strict=False) for filename in ('structures-openai.png', 'structures-prompts.json')]
    if not args.overwrite and any(path.exists() for path in [source_output, provenance_output, *targets, *structural_outputs]):
        raise FileExistsError('Refusing to overwrite existing source or runtime assets')
    source_data = args.source.read_bytes()
    provenance = {
        'generator': 'OpenAI built-in imagegen', 'provenance': 'openai-authored-objects',
        'scope': 'Shared side-view adaptations; not a per-era canonical prop library',
        'source': source_relative.as_posix(), 'sourceSha256': sha256(source_data).hexdigest(),
        'promptSpec': prompts, 'grid': grid, 'authoredObjects': 8, 'runtimeObjects': len(prepared), 'synthesizedObjects': 0,
        'deferred': [{'id': d['id'], 'reason': d['reason']} for d in definitions if d.get('runtimeStatus') == 'deferred'],
        'operations': ['cyan-guide crop', 'magenta key removal', 'tight alpha bounds', 'uniform nearest-neighbor fit', 'bottom-center alignment'],
        'outputs': [dict(id=item['id'], path=item['path'], width=item['width'], height=item['height'], sha256=sha256(data).hexdigest(), **meta) for item, data, meta in prepared],
    }
    if args.structures_source:
        structural_data = args.structures_source.read_bytes()
        structural_prompt_data = args.structures_prompt_file.read_bytes()
        structural_prompts = json.loads(structural_prompt_data.decode('utf-8'))
        provenance['structuralSource'] = {
            'source': structural_outputs[0].relative_to(root).as_posix(),
            'sha256': sha256(structural_data).hexdigest(),
            'promptSpec': structural_prompts,
            'reason': 'Door/elevator generated separately to match collision proportions without stretching artwork',
        }
        atomic_write(structural_outputs[0], structural_data)
        atomic_write(structural_outputs[1], structural_prompt_data)
    atomic_write(source_output, source_data)
    for (_, data, _), target in zip(prepared, targets):
        atomic_write(target, data)
    atomic_write(provenance_output, (json.dumps(provenance, indent=2) + '\n').encode('utf-8'))
    print(json.dumps({'objects': len(prepared), 'deferred': provenance['deferred'], 'source': str(source_output), 'provenance': str(provenance_output)}))


if __name__ == '__main__':
    main()
