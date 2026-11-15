#!/usr/bin/env python3
"""Read-only structural/contract preflight, without an art approval or admission.

This deliberately does not fabricate the approved/verified fields required by the
real renderer and wardrobe validators. The approved compiler remains mandatory.
It reports all independent incompatible sectors instead of stopping at the first.
"""
import argparse
import ast
import gzip
import hashlib
import json
import math
import re
from pathlib import Path
from PIL import Image

ROOT = Path('@PROJECT_ROOT@')
APP = Path('@APP_ROOT@/public/cqc/src')


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def pin(path):
    path = Path(path)
    raw = path.read_bytes()
    return {'path': str(path), 'bytes': len(raw), 'sha256': digest(raw)}


def load(path):
    raw = Path(path).read_bytes()
    return json.loads(gzip.decompress(raw) if str(path).endswith('.gz') else raw)


def finite(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def inspect(path, contracts, allowed_actions):
    job = load(path)
    errors, pending = [], []

    def check(condition, sector, detail):
        if not condition:
            errors.append({'sector': sector, 'detail': detail})

    def pinned_source(source, sector):
        try:
            p = Path(source['path'])
            check(not p.is_symlink() and p.is_file(), sector, 'source must be a regular file')
            raw = p.read_bytes()
            check(len(raw) == source['bytes'] and digest(raw) == source['sha256'], sector, str(p) + ': pinned bytes changed')
            return raw
        except Exception as exc:
            errors.append({'sector': sector, 'detail': str(exc)})
            return None

    uid, identifier = job.get('uid'), job.get('id')
    contract = contracts['entries'].get(uid)
    check(job.get('schema') == 'cqc.p41.native-costume-job/2', 'identity', 'job schema')
    check(bool(contract), 'identity', 'UID absent from actual contracts')
    if not contract:
        return {'input': pin(path), 'uid': uid, 'id': identifier, 'errors': errors, 'pendingApprovalOrCalibration': pending}
    check(not contract['existingOptions'].get(identifier), 'identity', 'existing option must not be overwritten')
    provenance = job.get('provenance', {})
    check(provenance.get('sourceUID') == uid == provenance.get('sourceSpriteUID'), 'provenance', 'source UID/incarnation must stay exact')
    check(provenance.get('kind') in ['canonical-game-costume', 'original-character-costume', 'style-reinterpretation', 'historical-incarnation', 'body-transformation', 'official-remake-appearance'], 'provenance', 'unsupported provenance kind')
    sources = provenance.get('sources')
    check(isinstance(sources, list) and bool(sources), 'provenance', 'non-empty HTTPS sources required')
    for index, source in enumerate(sources or []):
        check(isinstance(source, dict) and isinstance(source.get('url'), str) and source['url'].startswith('https://'), 'provenance', f'sources[{index}] must have a real HTTPS URL; local/generated source records belong in a separate qualified field')
    if job.get('family') != 'canonical':
        check(provenance.get('originalDesign') is True and provenance.get('canonicalAppearanceAttested') is False, 'provenance', 'original costume must not claim official appearance')
    check(isinstance(job.get('label'), str) and bool(job['label'].strip()), 'identity', 'empty label')
    check(job.get('family') in ['canonical', 'retro', 'nextgen', 'cyborg', 'survive', 'metalgear', 'tuxedo'], 'identity', 'unsupported family')
    plan = job.get('plan', {})
    check(plan.get('actionMap') == contract['sprite'].get('actionMap'), 'dispatch', 'original actionMap must be unchanged')
    groups = plan.get('actions', {})
    for action in contract['sprite'].get('actions', {}):
        check(bool(groups.get(action, {}).get('roles')), 'dispatch', 'original action group absent: ' + action)
    for action, group in groups.items():
        roles = group.get('roles')
        check(action in allowed_actions, 'renderer-format', 'unsupported action: ' + action)
        check(isinstance(roles, list) and bool(roles) and all(isinstance(r, int) and 0 <= r <= 15 for r in roles), 'renderer-format', 'invalid roles: ' + action)
        check(finite(group.get('fps')) and group['fps'] >= 0 and (len(roles or []) <= 1 or group['fps'] > 0), 'renderer-format', 'invalid fps: ' + action)
        check(isinstance(group.get('loop'), bool), 'renderer-format', 'invalid loop: ' + action)
    for action, phases in plan.get('phaseMap', {}).items():
        for phase, indices in phases.items():
            check(action in allowed_actions and phase in ['startup', 'active', 'recovery'] and isinstance(indices, list) and bool(indices) and all(isinstance(i, int) and 0 <= i < len(groups.get(action, {}).get('roles', [])) for i in indices), 'renderer-format', 'invalid phase indices: ' + action + '/' + phase)
    expected = {}
    for slot, move in contract['fighter']['combat']['moves'].items():
        kind, tag = move['kind'], move.get('tag')
        action = contract['sprite']['actionMap'].get(slot)
        if kind == 'projectile':
            action = 'shoot' if tag in ['ballistic', 'precision', 'tranq', 'fire'] else 'blade' if tag in ['blade', 'knife', 'boomerang'] else 'deploy'
        elif kind == 'melee':
            action = 'throw' if tag == 'grapple' or slot == 'throw' else 'blade' if tag in ['blade', 'knife', 'machete', 'spear', 'tentacle'] else 'low' if slot == 'low' else 'heavy' if slot == 'heavy' else 'punch'
        elif kind in ['reload', 'recover', 'parry']:
            action = kind
        expected[slot] = action
        check(plan.get('selectedActionBySlot', plan.get('actionMap', {})).get(slot) == action, 'dispatch', f'{slot}: actual native dispatcher expects {action}')
    geometry_raw = pinned_source(job.get('geometry', {}), 'geometry-pin')
    book_raw = pinned_source(job.get('ownershipBook', {}), 'ownership-pin')
    if not geometry_raw:
        return {'input': pin(path), 'uid': uid, 'id': identifier, 'errors': errors, 'pendingApprovalOrCalibration': pending}
    geometry = json.loads(gzip.decompress(geometry_raw) if job['geometry']['path'].endswith('.gz') else geometry_raw)
    check(book_raw and geometry.get('ownershipBookSHA256') == digest(book_raw), 'ownership-pin', 'geometry/book binding differs')
    check(geometry.get('approved') is False and geometry.get('sourcePNGMutations') is False and geometry.get('canvasNonzeroPixelCentreCoverageChecked') is True, 'geometry', 'candidate geometry/ownership qualification missing')
    by_path = {source['path']: source for source in geometry['sources']}
    assets = {asset['key']: asset for asset in job.get('assets', [])}
    check(len(assets) == len(job.get('assets', [])) <= 48, 'assets', 'duplicate keys or >48aliases')
    check(len({a.get('file') for a in assets.values()}) == len(assets), 'assets', 'duplicate logical paths')
    for key, asset in assets.items():
        raw = pinned_source(asset, 'asset-pin')
        source = by_path.get(asset['path'])
        check(bool(source) and source['sha256'] == asset.get('sha256') and source['dimensions'] == [asset.get('width'), asset.get('height')], 'geometry', key + ': source geometry does not bind PNG')
        check(str(asset.get('file', '')).startswith('assets/combat-costumes-pass41/' + uid + '/' + identifier + '/') and '..' not in str(asset.get('file', '')).split('/'), 'assets', key + ': unsafe/wrong namespace')
        height = asset.get('standingHeight')
        check(finite(height) and 0 < height <= max(asset.get('width', 0), asset.get('height', 0)), 'calibration-format', key + ': invalid numeric standing height')
        calibration = asset.get('calibration', {})
        method = calibration.get('method')
        if method == 'same-page-neutral':
            neutral = next((pose for pose in (source or {}).get('poses', []) if pose['name'] == calibration.get('pose')), None)
            check(bool(neutral) and abs(height - neutral['nativeAlphaBounds'][3]) <= .05, 'calibration-format', key + ': neutral alpha height differs')
        elif method == 'reviewed-anatomical-transfer':
            check(len(calibration.get('landmarkPairs', [])) >= 2 and finite(calibration.get('tolerance')) and calibration['tolerance'] > 0 and bool(str(calibration.get('scope', '')).strip()), 'calibration-format', key + ': transfer requires two real pairs, positive tolerance and qualified scope')
            pending.append({'sector': 'physical-calibration-review', 'asset': key, 'detail': 'actual landmark choice and source-density transfer need exact Root counter-review'})
        else:
            pending.append({'sector': 'calibration-unresolved', 'asset': key, 'method': method, 'detail': 'not an admitted source calibration; compiler must continue to hold it'})
        if raw:
            check(raw[:8] == b'\x89PNG\r\n\x1a\n' and int.from_bytes(raw[16:20], 'big') == asset.get('width') and int.from_bytes(raw[20:24], 'big') == asset.get('height'), 'asset-pin', key + ': PNG header/dimensions differ')
    physical = set()
    for side in ['right', 'left']:
        roles = job.get('roles', {}).get(side, [])
        check(len(roles) == 16, 'roles', side + ': exactly16roles required')
        for index, mapping in enumerate(roles):
            asset = assets.get(mapping.get('asset'))
            source = by_path.get(asset['path']) if asset else None
            pose = next((q for q in (source or {}).get('poses', []) if q['name'] == mapping.get('pose') and q['side'] == side), None)
            check(bool(pose), 'roles', f'{side}/{index}: named physical source absent')
            if not pose:
                continue
            check(not pose.get('holdReasons') and pose.get('candidateUsage') not in ['held', 'held-unmapped'] and pose.get('ownPixelsLost') == 0 and pose.get('foreignPixelsKept') == 0 and pose.get('opaqueCanvasEdgePixels') == 0, 'roles', f'{side}/{index}: held/cropped/foreign/lost source')
            identity = (source['sha256'], tuple(sorted(pose['componentIDs'])))
            check(identity not in physical, 'roles', f'{side}/{index}: reused physical drawing')
            physical.add(identity)
            pivot = mapping.get('pivot')
            check(isinstance(pivot, list) and len(pivot) == 2 and all(finite(v) and 0 <= v <= 1 for v in pivot), 'framing-format', f'{side}/{index}: bad reviewed axis/ground format')
            if index == 0:
                preview = mapping.get('preview', {})
                bounds = preview.get('bodyBounds', [])
                check(finite(preview.get('datumX')) and 0 <= preview['datumX'] <= pose['rect'][2] and len(bounds) == 4 and all(finite(v) for v in bounds) and bounds[0] >= 0 and bounds[1] >= 0 and bounds[2] > 0 and bounds[3] > 0 and bounds[0] + bounds[2] <= pose['rect'][2] and bounds[1] + bounds[3] <= pose['rect'][3], 'framing-format', side + ': bad independent preview bounds/datum')
    check(len(physical) == 32, 'roles', '32independent physical source drawings required')
    projectiles = [slot for slot, move in contract['fighter']['combat']['moves'].items() if move['kind'] == 'projectile']
    anchors = job.get('anchors', [])
    for slot in projectiles:
        for side in ['right', 'left']:
            matches = [a for a in anchors if a.get('slot') == slot and a.get('side') == side]
            check(len(matches) == 1, 'native-points', f'{side}/{slot}: exactly one reviewed source socket required')
    for anchor in anchors:
        check(anchor.get('slot') in projectiles and anchor.get('action') == expected.get(anchor.get('slot')), 'native-points', 'point/action not owned by an actual projectile slot')
        check(anchor.get('side') in ['right', 'left'] and isinstance(anchor.get('roleIndex'), int) and 0 <= anchor['roleIndex'] <= 15, 'native-points', 'point side/role invalid')
        point, rear = anchor.get('nativeXY'), anchor.get('rearNativeXY')
        check(isinstance(point, list) and len(point) == 2 and all(finite(v) for v in point) and bool(str(anchor.get('socket', '')).strip()), 'native-points', 'point coordinates/socket invalid')
        if point and rear:
            check(len(rear) == 2 and all(finite(v) for v in rear) and (point[0] - rear[0]) * (1 if anchor['side'] == 'right' else -1) > 0 and abs(math.degrees(math.atan2(point[1] - rear[1], abs(point[0] - rear[0])))) <= 12, 'native-points', 'gun source axis differs from horizontal actual shot')
        if anchor.get('side') in ['right', 'left'] and isinstance(anchor.get('roleIndex'), int) and 0 <= anchor['roleIndex'] <= 15:
            mapping = job['roles'][anchor['side']][anchor['roleIndex']]
            asset = assets[mapping['asset']]
            source = by_path[asset['path']]
            pose = next(q for q in source['poses'] if q['name'] == mapping['pose'] and q['side'] == anchor['side'])
            for name, xy in [('nativeXY', point), ('rearNativeXY', rear)]:
                if xy is None:
                    continue
                rx, ry, width, height = pose['rect']
                inside_rect = rx <= xy[0] <= rx + width and ry <= xy[1] <= ry + height
                check(inside_rect, 'native-points', f"{anchor['side']}/{anchor['slot']}/{name}: point outside selected source rectangle")
                if inside_rect:
                    x, y = (xy[0] - rx) / width, (xy[1] - ry) / height
                    polygon = pose['clipPolygon']
                    winding = 0
                    for index, first in enumerate(polygon):
                        second = polygon[(index + 1) % len(polygon)]
                        cross = (second[0] - first[0]) * (y - first[1]) - (x - first[0]) * (second[1] - first[1])
                        if first[1] <= y < second[1] and cross > 0:
                            winding += 1
                        elif first[1] > y >= second[1] and cross < 0:
                            winding -= 1
                    check(winding != 0, 'native-points', f"{anchor['side']}/{anchor['slot']}/{name}: point outside selected owned contour")
                    with Image.open(asset['path']) as image:
                        px, py = math.floor(xy[0]), math.floor(xy[1])
                        alpha = image.convert('RGBA').getpixel((px, py))[3]
                    check(alpha >= 200, 'native-points-opacity', f"{anchor['side']}/{anchor['slot']}/{name}: alpha{alpha} below Root's explicit200 source-point requirement")
    return {'input': pin(path), 'uid': uid, 'id': identifier, 'errors': errors, 'pendingApprovalOrCalibration': pending, 'expectedReviewSelectedWeaponPoints': True if projectiles else 'not-applicable-no-projectiles', 'expectedSelectedActionBySlot': expected, 'physicalRoles': len(physical), 'candidateOnly': True, 'notAdmitted': True, 'realValidatorGateBypassed': False, 'actualCompilerStillRequired': True}


parser = argparse.ArgumentParser()
parser.add_argument('jobs', nargs='+')
parser.add_argument('--output', required=True)
args = parser.parse_args()
renderer = (APP / 'cqc-sprite-renderer.js').read_text()
literal = re.search(r'const actions = (\[[^;]+\]);', renderer)
assert literal, 'Read current actual renderer action vocabulary before inspecting candidates'
allowed = ast.literal_eval(literal[1])
contracts = load(ROOT / 'integration/ACTUAL_FIGHTER_CONTRACTS_P41_V1.json.gz')
rows = []
for name in args.jobs:
    try:
        rows.append(inspect(name, contracts, allowed))
    except Exception as exc:
        rows.append({'input': pin(name), 'errors': [{'sector': 'input-or-independent-sector', 'detail': str(exc)}], 'notAdmitted': True})
report = {'schema': 'cqc.p41.read-only-candidate-compatibility-sectors/1', 'status': 'analysis-only-no-art-approval-or-runtime-admission', 'productMutations': False, 'sourcePNGMutations': False, 'fabricatedRootReviews': False, 'actualValidatorsRelaxed': False, 'actualValidatorCoverageClaimed': False, 'limits': ['Structural sectors mirror current pinned runtime requirements without creating approved/verified review records.', 'Pixel ownership is read from pinned existing geometry; final compiler recomputes it independently.', 'Source-point rectangle/owned contour/PNG alpha are read without pixel modification. Anatomical landmarks, fidelity and physical pose selection still need actual inspection and final compiler checks.', 'This report cannot admit a costume or replace exact Root approval and the real unchanged renderer/wardrobe validators.'], 'runtimeSourcePins': [pin(APP / 'cqc-sprite-renderer.js'), pin(APP / 'cqc-pass19-costumes.js')], 'entries': rows}
out = Path(args.output)
assert str(out).startswith(str(ROOT / 'integration/')) and not out.exists()
out.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'output': str(out), 'jobs': len(rows), 'structuralErrors': sum(len(r['errors']) for r in rows), 'approvalOrCalibrationPending': sum(len(r.get('pendingApprovalOrCalibration', [])) for r in rows), 'notAdmitted': True}))
