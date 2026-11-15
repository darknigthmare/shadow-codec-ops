"""Read-only art/provenance checks and a producer-only importer validation fixture."""
from pathlib import Path
from PIL import Image
from scipy import ndimage
import numpy as np
import copy
import hashlib
import json
import math
import os
import sys

BASE = Path(__file__).resolve().parents[1]
assert BASE == Path('/workspace/cqc-pass9-generation/running-man')
sys.path.insert(0, '/workspace/cqc-game-working/cqc-versus-v056/tools')
from prepare_combat_sprite import validate_entry, ACTIONS

def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def write(name, value):
    path = BASE / name
    assert path.resolve().is_relative_to(BASE)
    raw = (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()
    if path.exists() and path.read_bytes() != raw:
        preserved = path.with_name(path.stem + '.previous-' + sha(path)[:12] + path.suffix)
        if not preserved.exists():
            with preserved.open('xb') as f:
                f.write(path.read_bytes())
    path.write_bytes(raw)

checks = []
def check(name, passed):
    checks.append({'name': name, 'passed': bool(passed)})
    if not passed:
        write('PRODUCER_QA_FAILED.json', {'status': 'failed', 'checks': checks})
        raise AssertionError(name)

delivery_path = BASE / 'FINAL_DELIVERY.json'
delivery = json.loads(delivery_path.read_text())
contract = json.loads((BASE / 'SOURCE_AND_ACTION_CONTRACT.json').read_text())
physical = json.loads((BASE / 'PRODUCER_PHYSICAL_REVIEW.json').read_text())
uid = delivery['uid']
check('exact canonical UID', uid == 'core__runner_mg2')
check('producer review explicitly qualified', delivery['review']['status'] == 'approved' and delivery['review']['fidelityStatus'] == 'closest_supported' and delivery['review']['absolute1to1Certified'] is False)
check('no integration or browser claim', delivery['runtimeImported'] is False and delivery['browserCanvasReviewPerformed'] is False and physical['runtimeImported'] is False)
check('six distinct native original sources', len(delivery['sourceFiles']) == 6 and len({r['sha256'] for r in delivery['sourceFiles']}) == 6 and len({r['nativeOriginal'] for r in delivery['sourceFiles']}) == 6)
check('standard complete A/B and four C triplets', {k: v['indices'] for k, v in delivery['actionLayout'].items()} == {
    'idle': [0,1], 'walk': [2,3,4,5], 'guard': [6,7], 'crouch': [8,9], 'jump': [10,11],
    'punch': [0,1,2], 'heavy': [3,4,5], 'low': [6,7,8], 'hit': [9], 'ko': [10,11],
    'shoot': [0,1,2], 'throw': [3,4,5], 'charge': [6,7,8], 'recover': [9,10,11]})
check('recognized legacy action aliases only', set(delivery['actionLayout']) <= ACTIONS and not {'deploy','optic'} & set(delivery['actionLayout']))
check('unarmed and no ballistic marks', delivery['nonBallistic'] is True and delivery['canonicalWeapon'] is None and json.loads(Path(delivery['nativeSourceCombatOrigins']).read_text())['marks'] == {'right': {}, 'left': {}})

known_uids = {f['uid'] for f in json.loads(Path('/workspace/cqc-game-working/cqc-versus-v056/data/chronicles-v056.json').read_text())['fighters']}
check('UID exists in unchanged recovered roster', uid in known_uids)
fixture = {'uid': uid, 'name': delivery['name'], 'game': delivery['game'], 'incarnation': delivery['incarnation'],
           'coverage': 'action-frames', 'displayHeight': delivery['displayHeight'], 'baseFrameHeight': 350,
           'sourceFrameHeights': {r['file']: r['standingSourceHeight'] for r in delivery['sourceFiles']},
           'facing': 1, 'mirror': False, 'fallbackMissingActions': True,
           'actionMap': copy.deepcopy(delivery['actionMap']), 'phaseMap': copy.deepcopy(delivery['phaseMap']),
           'actions': {}, 'oppositeActions': {}, 'review': copy.deepcopy(delivery['review'])}
files = []
used = set()
tables = {}
source_pixel_hashes = {}
for row in delivery['sourceFiles']:
    key = row['key']
    path = Path(row['source'])
    doc = json.loads(Path(row['layout']).read_text())
    metadata = json.loads((BASE / 'metadata' / (path.stem + '.result-summary.json')).read_text())
    check(key + ' immutable native source, metadata and original SHA', sha(path) == sha(row['nativeOriginal']) == row['sha256'] == metadata['sha256'] == doc['unchanged_source_sha256'])
    check(key + ' immutable layout pin', sha(row['layout']) == row['layoutSHA256'])
    check(key + ' independent facing and no mirror', row['facing'] == (1 if key.endswith('right') else -1) and row['mirror'] is False and metadata['independentNewImage'] is True and metadata['mirrored'] is False)
    check(key + ' native tool arguments pin', sha(metadata['argsFile']) == metadata['argsSHA256'])
    args = json.loads(Path(metadata['argsFile']).read_text())
    check(key + ' independent brand-new generation and transparency requested', args.get('transparent_background') is True and 'referenced_image_paths' not in args and 'num_last_images_to_include' not in args)
    check(key + ' source contract pin preserved', metadata['sourceContractSHA256'] == sha(BASE / 'SOURCE_AND_ACTION_CONTRACT.json'))
    with Image.open(path) as image:
        image.verify()
    with Image.open(path) as image:
        alpha = np.array(image.getchannel('A'))
        pixels = np.array(image)
        check(key + ' native PNG RGBA1536x1024 and real transparent pixels', image.format == 'PNG' and image.mode == 'RGBA' and image.size == (1536,1024) and alpha.min() == 0 and np.count_nonzero(alpha == 0) > 1000000)
    labels8, _ = ndimage.label(alpha >= 8)
    counts8 = np.bincount(labels8.ravel())
    large8 = set(int(i) for i in np.where(counts8[1:] >= 1000)[0] + 1)
    check(key + ' exact twelve complete alpha8 body groups', len(large8) == len(doc['cells']) == 12)
    labels80, _ = ndimage.label(alpha > 80)
    seen = set()
    source_pixel_hashes[key] = []
    for cell in doc['cells']:
        i = cell['index']
        x,y,w,h = cell['frame']['rect']
        b0,b1,b2,b3 = cell['bboxAlpha8']
        component = cell['component8']
        yy,xx = np.where(labels8 == component)
        check(key + f' pose{i} complete native group bounded with margin', 0 <= x < b0 <= int(xx.min()) < int(xx.max())+1 <= b2 < x+w <= 1536 and 0 <= y < b1 <= int(yy.min()) < int(yy.max())+1 <= b3 < y+h <= 1024)
        check(key + f' pose{i} exact observed alpha8 body bounds', [int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)] == cell['bboxAlpha8'] and int(counts8[component]) == cell['pixelsAlpha8'])
        foreign = sum(int(np.count_nonzero(labels8[y:y+h,x:x+w] == other)) for other in large8 if other != component)
        check(key + f' pose{i} no neighboring major body alpha8 in crop', foreign == 0 and cell['foreign_body_alpha8_pixels_in_rect'] == 0)
        check(key + f' pose{i} normalized finite native pivot', all(math.isfinite(v) and 0 <= v <= 1 for v in cell['frame']['pivot']))
        px,py = cell['frame']['pivot']
        pivot = [x+px*w, y+py*h]
        expected = cell['observedBodyPivotFullSheet']
        check(key + f' pose{i} pivot measured from true body lower extent', all(abs(a-b)<1e-9 for a,b in zip(pivot,expected)) and abs(pivot[1]-cell['bbox'][3]) < 1e-9)
        component80 = cell['component']
        cy,cx = np.where(labels80 == component80)
        check(key + f' pose{i} exact alpha80 body support bounds', [int(cx.min()),int(cy.min()),int(cx.max()+1),int(cy.max()+1)] == cell['bbox'] and len(cx) == cell['pixels'])
        check(key + f' pose{i} approved observed pose meaning', bool(cell['poseMeaning']) and cell['artistic_review'].startswith('producer-physically-observed-'))
        seen.add(component)
        source_pixel_hashes[key].append(hashlib.sha256(pixels[y:y+h,x:x+w].tobytes()).hexdigest())
    check(key + ' unique complete grouping uses all bodies', seen == large8)
    indices = row['standingReferencePoseIndices']
    heights = [doc['cells'][i]['bbox'][3]-doc['cells'][i]['bbox'][1] for i in indices]
    check(key + ' exact fixed upright source scale per file', heights == row['standingReferenceSourceHeights'] and sum(heights)/len(heights) == row['standingSourceHeight'])
    tables[key] = doc['cells']
    files.append({'file': row['file'], 'source': row['source']})

for side,target in [('right','actions'),('left','oppositeActions')]:
    for action,spec in delivery['actionLayout'].items():
        cells = tables[spec['sheet']+'-'+side]
        frames = [copy.deepcopy(cells[i]['frame']) for i in spec['indices']]
        fixture[target][action] = {'fps': spec['fps'], 'loop': spec['loop'], 'frames': frames}
        used.update((f['file'],tuple(f['rect'])) for f in frames)
    fixture[target]['attack'] = copy.deepcopy(fixture[target]['punch'])
fixture['phaseMap']['attack'] = copy.deepcopy(fixture['phaseMap']['punch'])
check('72 unique native poses counted without alias inflation', len(used) == 72)
check('opposite sources not exact mirrored substitutes', all(source_pixel_hashes[s+'-right'] != source_pixel_hashes[s+'-left'] for s in ['a','b','c']))
validated = validate_entry(fixture, files, known_uids)
check('existing importer validator accepts producer-only exact physical fixture', len(validated) == 6)
for mutation in ['frame-sha', 'phase-index', 'source-height']:
    broken = copy.deepcopy(fixture)
    if mutation == 'frame-sha': broken['actions']['idle']['frames'][0]['sha256'] = '0'*64
    elif mutation == 'phase-index': broken['phaseMap']['punch']['active'] = [99]
    else: broken['sourceFrameHeights']['assets/combat-sprites/nonexistent.png'] = 1
    rejected = False
    try:
        validate_entry(broken,files,known_uids)
    except ValueError:
        rejected = True
    check('validator rejects meaningful malformed '+mutation, rejected)
write('PRODUCER_VALIDATION_FIXTURE.json', {'schema': 'cqc.pass9.producer-validation-fixture/1',
                                         'scope': 'Read-only validate_entry fixture. Not an integrator approval, import, catalog change or browser review.',
                                         'runtimeImported': False, 'entry': fixture, 'sourceFiles': files,
                                         'providedGeneratorDelivery': str(delivery_path), 'deliverySHA256': sha(delivery_path)})

for reference in delivery['review']['sources']:
    path = Path(reference['file'])
    check(path.name+' observed reference source bytes exact', sha(path) == reference['sha256'] == sha(reference['source']) and path.stat().st_size == reference['bytes'] and reference['viewed'] is True)
    check(path.name+' reference preserved via same immutable inode', os.stat(path).st_ino == os.stat(reference['source']).st_ino)
check('four selected refs bounded and no manual/video copy', sum(r['bytes'] for r in delivery['review']['sources']) == 700432 < 15000000 and not list(BASE.rglob('*.pdf')) and not list(BASE.rglob('*.mkv')) and contract['fullManualOrVideoCopied'] is False)
index = json.loads((BASE/'NATIVE_PNG_INDEX.json').read_text())
check('all seven native attempts with exactly one preserved reject', len(index['attempts']) == 7 and sum(r['status']=='approved-final' for r in index['attempts']) == 6 and sum(r['status']=='rejected-recovery-still-running-retained' for r in index['attempts']) == 1)
for attempt in index['attempts']:
    check(attempt['key']+' immutable attempt, original and prompt preserved', sha(attempt['source']) == sha(attempt['nativeOriginal']) == attempt['sha256'] and sha(attempt['argsFile']) == attempt['argsSHA256'] and attempt['repurposedAsOC'] is False)
for source_prompt in sorted((BASE/'prepared-prompts-original').glob('*.args.json')):
    original = Path('/workspace/cqc-pass8-reference-selection/core__runner_mg2/reviewable-prompts')/source_prompt.name
    check(source_prompt.name+' original prepared prompt unmodified', sha(source_prompt) == sha(original) and os.stat(source_prompt).st_ino == os.stat(original).st_ino)

contacts = json.loads(Path(delivery['nativeSourceContactMarks']).read_text())
for side,marks in contacts['marks'].items():
    for action,mark in marks.items():
        spec = delivery['actionLayout'][action]
        source_index = spec['indices'][delivery['phaseMap'][action]['active'][0]]
        with Image.open(mark['source']) as image:
            rgba = list(image.getpixel(tuple(mark['point'])))
        check(side+' '+action+' actual first-active visible hand/boot contact', source_index == mark['sourcePoseIndex'] and rgba == mark['pointRGBA'] and rgba[3] > 80 and sha(mark['source']) == mark['sha256'] and mark['canLaunchProjectile'] is False and mark['canonicalAttackCertified'] is False)

prompt_index = []
for path in sorted((BASE/'prompts').glob('*.args.json')):
    name = path.name.removesuffix('.args.json')
    prompt_index.append({'file': str(path), 'sha256': sha(path),
                         'status': 'submitted-native-retained' if (BASE/'metadata'/(name+'.result-summary.json')).exists() else 'prepared-not-submitted'})
write('PROMPT_ATTEMPT_INDEX.json', {'uid': uid, 'prompts': prompt_index,
                                  'toolFailuresObserved': 0, 'physicalSemanticRejections': 1,
                                  'allOriginalPreparedVariantsRetained': True})
seen_inodes = set()
payload = 0
excluded = {'references','prepared-prompts-original','original-reference-preparation'}
for path in BASE.rglob('*'):
    if path.is_file() and path.relative_to(BASE).parts[0] not in excluded:
        stat = path.stat()
        key = (stat.st_dev,stat.st_ino)
        if key not in seen_inodes:
            seen_inodes.add(key)
            payload += stat.st_size
check('unique new payload within initial25MiB and max45MiB', payload < 25*1024*1024 < 45*1024*1024)
report = {'schema': 'cqc.pass9.running-man-producer-qa/1', 'status': 'passed', 'uid': uid,
          'assertions': len(checks), 'checks': checks, 'nativeSheetsSelected': 6, 'uniqueSourcePoses': 72,
          'allNativeAttemptsRetained': 7, 'rejectedNativeAttemptsRetained': 1,
          'pixelsEdited': 0, 'projectileMuzzles': 0, 'sourceHandBootContactPoints': 8,
          'selectedReferenceBytes': 700432, 'newUniquePayloadBytesBeforeThisReport': payload,
          'runtimeImported': False, 'browserCanvasReviewPerformed': False,
          'existingReadOnlyValidatorPassed': True,
          'validationFixture': str(BASE/'PRODUCER_VALIDATION_FIXTURE.json'),
          'validationFixtureSHA256': sha(BASE/'PRODUCER_VALIDATION_FIXTURE.json'),
          'delivery': str(delivery_path), 'deliverySHA256': sha(delivery_path)}
write('PRODUCER_QA.json', report)
print(json.dumps({k:v for k,v in report.items() if k != 'checks'},indent=2))
