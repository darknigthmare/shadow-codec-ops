from pathlib import Path
import csv
import hashlib
import io
import json
import re

ROOT = Path(__file__).parent
R = Path('/workspace/cqc-game-working/cqc-versus-v056')
S = Path('/workspace/shadow-codec-recovered/public/cqc')
PINS = {}

def pin(path):
    path = Path(path)
    data = path.read_bytes()
    item = {'path': str(path), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}
    PINS[str(path)] = item
    return data, item

def text(path):
    return pin(path)[0].decode()

def js_payload(path, marker):
    source = text(path)
    start = source.index('{', source.index(marker))
    return json.JSONDecoder().raw_decode(source[start:])[0]

def dump(name, data):
    (ROOT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

core = text(R / 'modules/core-v032.html')
core_bytes, core_pin = pin(S / 'modules/core-v032.html')
assert core_bytes.decode() == core
manifest = json.loads(text(S / 'runtime-manifest.json'))
paths = {entry['path']: entry for entry in manifest['files']}
assert core_pin['sha256'] == paths['modules/core-v032.html']['sha256']
catalog_start = core.index('const CATALOG=') + len('const CATALOG=')
catalog = json.JSONDecoder().raw_decode(core[catalog_start:])[0]
sprites = js_payload(R / 'src/cqc-sprite-catalog.js', 'CQC_COMBAT_SPRITE_CATALOG')
assert text(S / 'src/cqc-sprite-catalog.js') == text(R / 'src/cqc-sprite-catalog.js')
stories = json.loads(text(R / 'data/chronicles-v056.json'))
machines = js_payload(R / 'src/cqc-machine-parts-catalog-v1.js', 'CQC_MACHINE_PARTS_CATALOG')
machine_bridge = text(R / 'src/cqc-machine-parts-bridge-v1.js')
stage_base = js_payload(R / 'src/cqc-stage-layer-data.js', 'CQC_STAGE_LAYER_DATA')
stages = stage_base['stages'][:]
for filename in ['src/cqc-pass12-stage-data.js', 'src/cqc-pass14-rex-stage-data.js', 'src/cqc-pass15-mpo-stage-data.js']:
    stages.extend(js_payload(R / filename, 'const addition')['stages'])
bridge = text(R / 'src/cqc-pass12-stage-bridge.js')
menu_art = js_payload(R / 'src/cqc-menu-art-catalog-v1.js', 'CQCMenuArtCatalog')
shell = text(R / 'index.html')
oc = json.loads(text(R / 'originals/parallaxe/PROFILE.json'))
oc_origin = text(R / 'docs/REPRISE_PASS2_2026-10-01.md')
assert 'issu du design rejeté autorisé' in oc_origin

requested = [
    ('Crying Wolf — armure', 'core__crying_wolf'), ('Crying Beauty — sans armure', 'archive__crying_beauty'),
    ('Laughing Octopus — armure', 'core__laughing_octopus'), ('Laughing Beauty — sans armure', 'archive__laughing_beauty'),
    ('Raging Raven — armure', 'core__raging_raven'), ('Raging Beauty — sans armure', 'archive__raging_beauty'),
    ('Screaming Mantis — armure', 'core__screaming_mantis'), ('Screaming Beauty — sans armure', 'archive__screaming_beauty'),
    ('Sunny — MGS4', 'roster50__sunny_mgs4'), ('Sunny — Revengeance', 'roster50__sunny_mgr'),
    ('Paz — Peace Walker', 'archive__paz'), ('Paz — Ground Zeroes', 'npc53__paz_gz'),
    ('EVA — MGS3', 'core__eva_mgs3'), ('Blade Wolf — LQ-84i', 'core__blade_wolf'),
    ('Raiden — MGS4', 'core__raiden_mgs4'), ('Skulls — Brume', 'core__skull_mist'),
    ('Skulls — Armure', 'core__skull_armor'), ('Skulls — Camouflage / Sniper féminin', 'core__skull_sniper'),
    ('Naked Snake / Big Boss — MGS3 avant blessure', 'core__snake'),
    ('Big Boss — Portable Ops', 'core__snake_mpo'), ('Big Boss — Peace Walker Battle Dress', 'core__snake_pw'),
    ('Big Boss — épilogue MGS4', 'completion__big_boss_epilogue'),
    ('Venus — Ac!d 2', 'core__venus'), ('Venom Snake — MGSV TPP', 'core__venom'),
    ('OC issu du design Viper rejeté — Parallaxe', 'oc__parallaxe')
]
assert len(requested) == 25
coverage = []
all_atlases = {}
for label, uid in requested:
    entry = sprites['entries'][uid]
    assert entry['review']['status'] == 'approved'
    files = {}
    pose_rectangles = set()
    for facing in ['actions', 'oppositeActions']:
        for action in entry.get(facing, {}).values():
            for frame in action.get('frames', []):
                if 'file' not in frame:
                    continue
                files[frame['file']] = frame['sha256']
                pose_rectangles.add((frame['file'], tuple(frame.get('rect', []))))
    for file, expected_hash in files.items():
        if file not in all_atlases:
            source_bytes, source_pin = pin(R / file)
            shadow_bytes, shadow_pin = pin(S / file)
            assert source_bytes == shadow_bytes
            assert source_pin['sha256'] == expected_hash == paths[file]['sha256']
            all_atlases[file] = {'file': file, 'bytes': len(source_bytes), 'sha256': expected_hash, 'rSIdentical': True}
    references = []
    for reference in entry['review'].get('sources', []):
        file = reference.get('file')
        exists = bool(file and (R / file).is_file())
        references.append({'file': file, 'scope': reference.get('scope', ''), 'retainedLocal': exists,
                           'originalPhysicallyViewed': 'attested-in-existing-producer-and-Root-review; not-re-viewed-by-this-agent'})
    notes = []
    if uid == 'core__snake':
        notes.append('Pre-injury two-eye MGS3 Tiger Stripe costume only. Post-injury right-eye patch incarnation has no distinct native entry yet; preserve this existing variant.')
    if uid == 'npc53__paz_gz':
        notes.append('Ground Zeroes prisoner, not TPP medical-platform hallucination. The latter is separate npc53__paz_phantom_tpp and remains procedural.')
    if uid == 'core__skull_sniper':
        notes.append('The requested Camouflage variant is represented by the female Sniper encounter/runtime alias; do not fabricate a fourth Skull type or treat all three as a canonical full squad.')
    if uid == 'core__snake_pw':
        notes.append('Battle Dress costume is selected; this does not supply a separate PW sneaking-suit costume.')
    if uid.startswith('roster50__sunny'):
        notes.append('Source Sunny is a child support/noncombatant; authored protective/technical versus poses are not canon combat animation.')
    if uid == 'oc__parallaxe':
        notes.append('Separate original universe, registered only in original=parallaxe mode; unchanged base roster354. Prior rejected Viper design reuse is attested by REPRISE_PASS2, not a canon identity.')
    coverage.append({'request': label, 'uid': uid, 'status': 'native-combat-atlases-integrated-R-S',
                     'incarnation': entry['incarnation'], 'coverage': entry['coverage'],
                     'atlasCount': len(files), 'distinctSourcePoseRectangles': len(pose_rectangles),
                     'files': [all_atlases[file] for file in sorted(files)],
                     'fallbackMissingActions': entry.get('fallbackMissingActions', False),
                     'fidelity': 'closest-supported-authored-2D; no-absolute1to1-certificate',
                     'references': references, 'reviewerAttestation': entry['review'].get('reviewer'),
                     'mainLimits': entry['review'].get('limits', [])[:2], 'specificNotes': notes})

literal = re.search(r'const CORE_ALIASES = Object.freeze\(\{(.*?)\}\);', bridge, re.S).group(1)
aliases = dict(re.findall(r"'([^']+)'\s*:\s*'([^']+)'", literal))
native_stages = {stage['id']: stage for stage in stages}
for stage in stages:
    if stage.get('approved') and stage.get('review', {}).get('status') == 'accepted_closest':
        for target in stage.get('targetCoreIDs', []):
            aliases[target] = stage['id']
stage_rows = []
for stage in catalog['stages']:
    mapped = aliases.get(stage['id'])
    row = {'id': stage['id'], 'name': stage['name'], 'episode': stage['episodeId'], 'template': stage.get('template', ''),
           'nativeStageID': mapped if mapped in native_stages else '',
           'status': 'absent-playable-template' if not stage.get('template') else
                     'native-reviewed-planes' if mapped in native_stages else 'procedural-Canvas-scene'}
    stage_rows.append(row)
with (ROOT / 'CORE_STAGE_STATUS_CURRENT_V1.csv').open('w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=list(stage_rows[0])); writer.writeheader(); writer.writerows(stage_rows)
stage_counts = {status: sum(row['status'] == status for row in stage_rows) for status in sorted({row['status'] for row in stage_rows})}
native_machine_map = dict(re.findall(r"([a-z0-9_]+):'([^']+)'", re.search(r'const IDS=Object.freeze\(\{(.*?)\}\);', machine_bridge).group(1)))
assert set(native_machine_map.values()) == {machine['id'] for machine in machines['machines']}
assert len(native_machine_map) == 6
core_boss_ids = set(re.findall(r'BOSS_DEFS\.([a-z0-9_]+)\s*=', core)) | {'rex'}
core_boss_ids |= set(re.findall(r"'([^']+)'", re.search(r'const PW_AI_IDS=Object.freeze\(\[(.*?)\]\);', core).group(1)))
procedural_machines = sorted(core_boss_ids - set(native_machine_map) - {'sorrow'})

known = {fighter['uid'] for fighter in stories['fighters']}
missing = [{'uid': fighter['uid'], 'name': fighter['name'], 'episode': fighter['ep'], 'status': 'procedural-no-native-combat-entry'}
           for fighter in stories['fighters'] if fighter['uid'] not in sprites['entries']]
assert len(missing) == 302
with (ROOT / 'FIGHTERS_WITHOUT_NATIVE_CURRENT_V1.csv').open('w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=list(missing[0])); writer.writeheader(); writer.writerows(missing)

proof_files = [
    '/tmp/cqc-pass15-root-integration/ACTUAL_FINAL_CORE_REVERSE_AND_SYNTAX_V2.json',
    '/tmp/cqc-pass15-root-integration/ACTUAL_MENU_ENTRY_INTEGRATION_V2.json',
    '/tmp/cqc-pass15-browser-proofs/natural-icbmg-mobile-shadow-v2/ACTUAL_NATURAL_MACHINE_GAME_QA_V2.json',
    '/tmp/cqc-pass15-browser-proofs/natural-raxa-desktop-v1/ACTUAL_NATURAL_MACHINE_GAME_QA_V1.json',
    '/tmp/cqc-pass15-browser-proofs/natural-raxa-final-smoke-v2/ACTUAL_NATURAL_MACHINE_GAME_QA_V2.json',
    '/tmp/cqc-pass15-browser-proofs/mobile-qa-standalone-390x844-v4/ACTUAL_MOBILE_PRESENTATION_QA_V4.json',
    '/tmp/cqc-pass15-browser-proofs/stage-raxa-synthetic-composite-v3/PHYSICAL_STAGE_COMPOSITE_REVIEW_V3.json'
]
proofs = []
for file in proof_files:
    data, source_pin = pin(file); proof = json.loads(data)
    bindings = proof.get('sourceBindings', {})
    source_core = bindings.get('modules/core-v032.html', {}).get('sha256') if isinstance(bindings, dict) else None
    proofs.append({**source_pin, 'status': proof.get('status'), 'closedClaim': proof.get('closed'),
                   'actualRun': proof.get('actualRun'), 'actualCombat': proof.get('actualCombat'),
                   'synthetic': proof.get('synthetic'), 'smokeOnly': proof.get('smokeOnly'),
                   'sourceCoreSha256': source_core or proof.get('coreSha256'),
                   'currentCoreMatched': (source_core or proof.get('coreSha256')) == core_pin['sha256'],
                   'evidenceSeenHere': 'JSON document read; browser run performed by its exclusive owner'})

images_seen = []
for file, finding in [
    (R / 'assets/combat-sprites/core__snake/a-right-v1.png', 'Existing whole native atlas physically viewed; compatible with its documented pre-injury MGS3 incarnation, no new sprite generated.'),
    (R / 'originals/parallaxe/assets/portraits/parallaxe.webp', 'Existing original OC portrait physically viewed: olive armor and green removable optic on anatomical left.'),
    (Path('/tmp/cqc-pass15-browser-proofs/stage-raxa-synthetic-composite-v3/default-camera-0.jpg'), 'Existing synthetic composite JPEG physically viewed: enclosed green hangar, trusses, overhead white lamps, floor rail panels and rear containers; not an actual fight screenshot.')
]:
    _, image_pin = pin(file); images_seen.append({**image_pin, 'finding': finding, 'newCaptureCreated': False})

menu_mode_v2 = "if(requestedMenuMode==='chronicle'&&Object.hasOwn(CHRONICLES,selection.chapter))selection.player=CHRONICLES[selection.chapter].player;"
assert menu_mode_v2 in core
assert "coreChronicles:'modules/core-v032.html?mode=chronicle'" in shell
assert "coreTraining:'modules/core-v032.html?mode=training'" in shell
campaign_source = text(R / 'src/cqc-campaign-routes-v1.js')
assert all(f'function {name}(' in campaign_source for name in ['titleRoute', 'campaignMatches', 'matchStage'])

backlog = json.loads(text(R / 'data/illustration-backlog-v056.json'))
assert backlog['counts']['scenesToPaint'] == stories['counts']['composedScenes'] == 1638
csv_coverage = []
for name, field, expected in [('docs/RECITS_273_A_PEINDRE_reprise.csv', 'uid', backlog['stories']),
                              ('docs/SCENES_1638_A_PEINDRE_reprise.csv', 'sceneKey', backlog['scenes'])]:
    source = text(R / name).lstrip('\ufeff')
    dialect = csv.Sniffer().sniff(source[:7000], delimiters=';,\t')
    rows = list(csv.DictReader(io.StringIO(source), dialect=dialect))
    assert {row[field] for row in rows} == {row[field] for row in expected}
    csv_coverage.append({'path': str(R / name), 'rows': len(rows), 'backlogKeysIdentical': True})

priorities = [
    {'priority': 1, 'work': 'Separate post-injury Naked Snake / Big Boss MGS3 sprite',
     'status': 'absent-distinct-native-variant; Root explicitly authorized next generation',
     'existingKeep': 'core__snake pre-injury remains unchanged', 'candidateRoot': '/tmp/cqc-next-big-boss-mgs3-injured-v1',
     'requiredProof': 'Original2004 PS2 refs showing right-eye patch and final field costume; no Delta/PW/Venom mixing. Review refs before ImageGen.'},
    {'priority': 1, 'work': 'Gander separated machine parts + original final GBC room',
     'status': 'procedural', 'coreMachine': 'gander', 'coreStage': 'ghost-galuade-cellule-gander',
     'source': 'modules/core-v032.html drawGander / ganderMachine; MACHINE_PRIORITIES_READONLY_V1.json previous closed plan',
     'qualification': 'Existing adapted encounter2 phases vs original guide3 steps; no canon campaign completion claim.'},
    {'priority': 2, 'work': 'Snake Ghost Babel native fighter for Gander encounter', 'uid': 'core__snake_gb', 'status': 'procedural'},
    {'priority': 2, 'work': 'Other machine parts, edition-specific', 'status': 'procedural', 'coreEncounters': procedural_machines,
     'order': ['zeke', 'shagohod', 'sahelanthropus', 'pupa', 'chrysalis', 'cocoon', 'peace_walker', 'harrier'],
     'extraIndependentModules': 'Ac!d Kodoque/Chaioth and MGR RAY/GRAD/EXCELSUS have independent procedural presentation; do not substitute native Arsenal RAY.'},
    {'priority': 2, 'work': 'MGS4 dedicated Beauty-and-Beast arenas', 'status': 'procedural-Core-scenes',
     'coreStages': ['mgs4-laboratoire-naomi', 'mgs4-tour-europe-est', 'mgs4-shadow-moses-ruines', 'mgs4-outer-haven-salle-mantis'],
     'qualification': 'Eight native character forms do not provide their original arenas or original scripted armor→Beauty campaign transitions.'},
    {'priority': 3, 'work': 'Other302 native combat characters', 'status': 'procedural roster preserved',
     'list': 'FIGHTERS_WITHOUT_NATIVE_CURRENT_V1.csv',
     'examples': [uid for uid in ['core__raiden', 'core__sam', 'core__mistral', 'core__monsoon', 'core__sundowner', 'core__armstrong', 'core__bigboss_mg1', 'core__bigboss_mg2', 'npc53__paz_phantom_tpp'] if uid in known and uid not in sprites['entries']]},
    {'priority': 3, 'work': 'Remaining original stage planes / planned playable templates', 'counts': stage_counts,
     'list': 'CORE_STAGE_STATUS_CURRENT_V1.csv', 'qualification': 'Side-on adapted maps retain closest-supported limits; actual aliases matter more than stale catalogue artStatus.'},
    {'priority': 3, 'work': 'Chronicles new full-scene paintings', 'status': '273 stories /1638 scenes still composed, not fully newly painted',
     'currentCSV': csv_coverage, 'preserveOld': 'Older282/1692 CSV revisions remain historical inputs.'},
    {'priority': 4, 'work': 'Original complete campaigns beyond local routes', 'status': 'absent-complete-original-campaign; adapted playable dossiers exist',
     'source': 'src/cqc-campaign-routes-v1.js and Core CHRONICLES descriptions explicitly distinguish simulations/adaptations',
     'qualification': 'No new broken campaign handler found here. Do not invent missing menu bugs or claim canon full campaigns.'}
]
report = {
    'schema': 'cqc.next-missing-priority/1', 'producer': '/root/pass15_remaining_menus',
    'scope': 'Current synchronized local PASS15 source audit. No Git, network, browser, generation or new capture.',
    'publication': 'Not re-verified by this audit; source integration is distinct from Git/Vercel publication.',
    'currentCore': core_pin, 'runtimeManifest': PINS[str(S / 'runtime-manifest.json')], 'runtimePaths': len(paths),
    'summary': {'explicitRequestedNativeVariants': len(coverage), 'nativeCombatEntries': len(sprites['entries']),
                'nativeStoryRosterEntries': len(known & set(sprites['entries'])), 'storyRosterWithoutNative': len(missing),
                'nativeSeparatedMachines': len(native_machine_map), 'nativeMachineIDs': native_machine_map,
                'proceduralCoreMachineOrAircraft': procedural_machines,
                'nativeStageCatalogues': len(stages), 'coreStageCounts': stage_counts,
                'menuImages': len(menu_art['images'])},
    'requestedCoverage': coverage,
    'verifiedRequestedAtlasPins': list(all_atlases.values()),
    'missingVariants': [{'label': 'MGS3 post-injury right-eye patch', 'status': 'absent distinct native variant'},
                        {'label': 'Paz TPP medical-platform hallucination', 'uid': 'npc53__paz_phantom_tpp', 'status': 'procedural; distinct from the supplied GZ second version'},
                        {'label': 'PW alternate sneaking suit', 'status': 'not supplied separately; selected PW requested incarnation uses Battle Dress'}],
    'menusCampaigns': {'nativeMenuImageKeys': sorted(menu_art['images']),
                       'coreChroniclesAndLegacyLab': 'V2 integrated locally, exact URLs and fixed chapter protagonist observed in source; no automatic combat or profile write added',
                       'campaignHandlers': 'titleRoute / campaignMatches / matchStage present; adapted31-title routes retained',
                       'brokenOtherMenuEvidence': 'None established by this source audit',
                       'mobile': 'Existing actual browser receipt confirms14 touch targets≥44px, dock gap0, real pause/settings/movement/weapon/rotation/reload. That receipt binds earlier Core6db500, not final61a01; Root reverse audit and final smokes qualify reuse.'},
    'evidenceLevels': {'binaryIntegrity': 'Requested PNG assets hashed, R/S identical and official runtime manifest hashes matched.',
                       'references': 'Existing catalogue attestations of prior producer/Root physical reference review were read; they are distinct from this agent viewing every source image.',
                       'imagesActuallyViewedByThisAgent': images_seen,
                       'browserDocumentsActuallyRead': proofs,
                       'raxaQualification': 'Older ffd8 full natural run records four legs, flight, open bays and a winner0 finished victory, but its overall receipt failed an assertion. Final61a01 RAXA smoke passed; do not turn the earlier failed receipt into a passed final certification.',
                       'icbmgQualification': 'Final61a01 mobile Shadow natural run passed, including actual launch interception/victory. Internal gyro remains logically authored/qualified, not visibly source-authenticated.'},
    'priorities': priorities,
    'inputPins': list(PINS.values()),
    'preservation': 'No R/S, historical, PNG, profile, Git or publication mutation. All new output stays in this next-work root.'
}
dump('CURRENT_REQUESTED_COVERAGE_AND_PRIORITIES_V1.json', report)
print(json.dumps({'core': core_pin['sha256'], 'runtimePaths': len(paths), 'requestedVariants': len(coverage),
                  'nativeRequestedAtlases': len(all_atlases), 'nativeMachines': len(native_machine_map),
                  'nativeStageCatalogues': len(stages), 'coreStageCounts': stage_counts, 'outputBytes': (ROOT / 'CURRENT_REQUESTED_COVERAGE_AND_PRIORITIES_V1.json').stat().st_size}))
