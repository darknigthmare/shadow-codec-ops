#!/usr/bin/env python3
"""Read-only reconciliation of actual production source and preserved delivery receipts.

No browser, decoder, generator, network operation, fixture, application mutation or
publication is performed. Existing source registration was read by the separately
preserved actual-source VM audit; these joins do not infer completion from labels.
"""
import collections
import datetime
import hashlib
import json
import pathlib
import struct
import subprocess

OUT = pathlib.Path('/workspace/cqc-pass19-backlog-final')
APP = pathlib.Path('/tmp/cqc-pass19-application')
NATIVE = {'nextgen', 'cyborg', 'survive', 'metalgear', 'tuxedo'}
PATHS = {
    'actualSourceRead': OUT / 'RUNTIME_COSTUME_SOURCE_READ_ACTUAL_V3.json',
    'initialQueue': pathlib.Path('/tmp/cqc-pass19-authored-wardrobe/FULL_IDENTITY_FAMILY_GENERATION_QUEUE_V1.json'),
    'initialCensus': pathlib.Path('/tmp/cqc-pass19-costume-system/COSTUME_CENSUS_V1.json'),
    'staticMatchReceipt': pathlib.Path('/workspace/STATIC_NATIVE_COSTUMES_ACTUAL_MATCH_FINAL_DELIVERY_V1.json'),
    'lazyIndex': pathlib.Path('/tmp/cqc-pass19-costume-library/packaged-nextgen-native-published-v1/NATIVE_WARDROBE_INDEX_V1.json'),
    'lazyPublicationReceipt': pathlib.Path('/workspace/cqc-pass19-asset-preservation/NATIVE_NEXTGEN_ASSET_BATCH_PUBLISHED_ACTUAL_V2.json'),
    'lazyActualIntegratedReceipt': pathlib.Path('/tmp/cqc-pass19-costume-library/NATIVE_WARDROBE_FINAL_INTEGRATED_E2E_DELIVERY_V1.json'),
    'knownOfficialBacklog': pathlib.Path('/tmp/cqc-pass19-canonical-costumes/KNOWN_OFFICIAL_WARDROBE_BACKLOG_V2.json'),
    'productionDeliveryNotes': APP / 'docs/cqc-reprise/pass19/DELIVERY_FR.md',
    'actualSourceReadHelper': OUT / 'read_runtime_wardrobe_source_v3.mjs',
    'reconciliationHelper': pathlib.Path(__file__),
}

def pin(path):
    data = path.read_bytes()
    return {'path': str(path), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

def read(key):
    return json.loads(PATHS[key].read_text())

def count(values):
    return dict(sorted(collections.Counter(values).items()))

def slim_sources(sources):
    return [{k: x[k] for k in ('url', 'scope', 'referenceClassification', 'sha256', 'sourceType') if k in x}
            if isinstance(x, dict) else x for x in sources]

def native_pin(asset):
    path = APP / 'public/cqc' / asset['file']
    result = pin(path)
    if asset.get('sha256') and result['sha256'] != asset['sha256']:
        raise RuntimeError('Native file SHA mismatch: ' + asset['file'])
    if asset.get('bytes') and result['bytes'] != asset['bytes']:
        raise RuntimeError('Native file byte-count mismatch: ' + asset['file'])
    with path.open('rb') as f:
        header = f.read(24)
    if header[:8] != b'\x89PNG\r\n\x1a\n':
        raise RuntimeError('Not a physical PNG: ' + asset['file'])
    width, height = struct.unpack('>II', header[16:24])
    if asset.get('width') and (width != asset['width'] or height != asset['height']):
        raise RuntimeError('Native PNG dimension mismatch: ' + asset['file'])
    return {'file': asset['file'], 'bytes': result['bytes'], 'sha256': result['sha256'],
            'width': width, 'height': height, 'localExactBytesRead': True}

source = read('actualSourceRead')
initial = read('initialQueue')
census = read('initialCensus')
static_qa = read('staticMatchReceipt')
index = read('lazyIndex')
official = read('knownOfficialBacklog')
head = subprocess.check_output(['git', '-C', str(APP), 'rev-parse', 'HEAD'], text=True).strip()
audited_head = '4cf0e71d9c7486ef63745e5f270c88da2847c18e'
subsequent_files = subprocess.check_output(['git', '-C', str(APP), 'diff', '--name-only', audited_head, head], text=True).splitlines()
allowed_followup = {'docs/cqc-reprise/pass19/PWA_DIEGETIC_ATOMIC_CHANGE_ACTUAL_V1.json',
                    'docs/cqc-reprise/pass19/PWA_TERMINAL_FOLLOWUP_FR.md',
                    'src/components/common/PwaRuntimeBanner.tsx', 'src/components/settings/PwaSettingsPanel.tsx',
                    'src/systems/pwaEngine.ts'}
if set(subsequent_files) - allowed_followup:
    raise RuntimeError('Wardrobe freeze changed: ' + str(subsequent_files))
for source_pin in source['pins']:
    if pin(pathlib.Path(source_pin['path']))['sha256'] != source_pin['sha256']:
        raise RuntimeError('Actual wardrobe source pin changed: ' + source_pin['path'])
records = source['records']
initial_jobs = {(j['uid'], j['family']): j for j in initial['jobs']}
new_uids = set(source['rosterInstallResult']['added'])
baseline_fighters = json.loads((OUT / 'current-fighters-source-extracted-v1.json').read_text())
playable_uids = {f['uid'] for f in baseline_fighters} | new_uids
preserved_outside = sorted(set(records) - playable_uids)
if preserved_outside != ['oc__parallaxe']:
    raise RuntimeError('Outside-selection identity changed: ' + str(preserved_outside))
delivered = {}
preserved_legacy = []
appearances = []
pixels = []

for uid, record in records.items():
    for option in record['actualOptions']:
        family = option.get('family')
        if family in ('cyborg', 'survive', 'metalgear', 'tuxedo'):
            if option['assetReview']['status'] != 'verified':
                raise RuntimeError('Unverified delivered option: ' + uid + '--' + family)
            delivered[(uid, family)] = {
                'uid': uid, 'id': option['id'], 'family': family,
                'deliveryMode': 'static-native', 'selectionExposure': 'registered-and-prepared-before-match',
                'provenance': option['provenance'], 'concept': option.get('concept'),
                'assetReview': option['assetReview'], 'physicalExtent': option.get('physicalExtent'),
                'spriteReview': option.get('spriteReview'),
                'assets': [native_pin(a) for a in option['files']],
                'actualIntegratedEvidence': 'staticMatchReceipt',
            }
        elif family == 'canonical':
            appearances.append({'uid': uid, 'id': option['id'], 'family': family,
                'kind': option['provenance']['kind'],
                'sourceUID': option['provenance'].get('sourceUID'),
                'sourceSpriteUID': option['provenance'].get('sourceSpriteUID'),
                'identityID': option['provenance'].get('identityID'),
                'label': option['label'], 'status': 'reviewed-existing-appearance-reuse',
                'newNativePNG': False, 'newCostumeExistenceAttested': option['provenance']['kind'] == 'canonical-game-costume',
                'canonicalScope': option['provenance'].get('canonicalAttestationScope'),
                'qualification': option['provenance'].get('qualification'),
                'sourceAtlasLimits': option['provenance'].get('originalAtlasLimits', []),
                'sources': slim_sources(option['provenance'].get('sources', []))})
        elif family == 'retro':
            pixels.append({'uid': uid, 'id': option['id'], 'sourceUID': option['provenance']['sourceUID'],
                           'status': 'fulfilled-renderer-presentation', 'newNativePNG': False,
                           'presentation': option['presentation'], 'nativeBody': record['nativeBody'],
                           'originalGameSpriteExtraction': False})
        elif family is None:
            preserved_legacy.append({'uid': uid, 'id': option['id'], 'label': option['label'],
                                    'family': family, 'requestedFamilyMatched': any(a['id'] == option['id'] for a in record['requests']),
                                    'preservedExistingArt': True, 'newNativePNG': False,
                                    'qualification': option.get('provenance')})

metadata_root = pathlib.Path('/tmp/cqc-pass19-costume-library/packaged-nextgen-native-prepublication-v1')
metadata_pins = []
for item in index['entries']:
    uid, family = item['uid'], item['family']
    wrapper_path = metadata_root / item['metadata']['path']
    wrapper_pin = pin(wrapper_path)
    if wrapper_pin['bytes'] != item['metadata']['bytes'] or wrapper_pin['sha256'] != item['metadata']['sha256']:
        raise RuntimeError('Published metadata mismatch: ' + uid)
    wrapper = json.loads(wrapper_path.read_text())
    option = wrapper['option']
    if wrapper['uid'] != uid or wrapper['id'] != item['id'] or option['family'] != family:
        raise RuntimeError('Metadata identity mismatch: ' + uid)
    if option['provenance']['sourceUID'] != uid or option['assetReview']['status'] != 'verified':
        raise RuntimeError('Metadata source or review mismatch: ' + uid)
    metadata_pins.append(wrapper_pin)
    delivered[(uid, family)] = {
        'uid': uid, 'id': item['id'], 'family': family, 'deliveryMode': 'lazy-native',
        'selectionExposure': 'produced-reviewed-published; dormant-until-byteverified-metadata-and-images-prepared',
        'provenance': option['provenance'], 'concept': option.get('costumeConcept'),
        'assetReview': option['assetReview'], 'spriteReview': option['sprite'].get('review'),
        'metadata': {**item['metadata'], 'url': index['metadataBaseURL'] + item['metadata']['path']},
        'assetBaseURL': index['assetBaseURL'], 'immutableGitCommit': '9e6ebfd2e8c1c2a3b38055d55cfa83d78f276e48',
        'assets': [native_pin(a) for a in item['assets']],
        'actualIntegratedEvidence': 'lazyActualIntegratedReceipt',
        'baseSourceAlreadyPaintedRefinement': uid in ('core__campbell_mpo', 'core__cunningham'),
        'sourcePresentationQualification': 'The requested retro/nextgen classification is a presentation registry category. It does not establish that the previous source PNG was a pixel-art extraction. Campbell MPO and Cunningham refine already painted native source artwork.',
    }

statics = {(x['uid'], x['family']) for x in static_qa['caseSummaries']}
if statics != {key for key, value in delivered.items() if value['deliveryMode'] == 'static-native'}:
    raise RuntimeError('Actual match receipt does not cover all static deliveries')
if len(delivered) != 15 or len(pixels) != 298 or len(appearances) != 362 or len(preserved_legacy) != 7:
    raise RuntimeError('Final source inventory mismatch')

requests = []
identities = []
missing = []
excluded = []
canonical_work = []
for uid, record in records.items():
    actual = {a['id']: a for a in record['actualRequestStatuses']}
    identities.append({k: record[k] for k in ('uid', 'name', 'game', 'basePresentation', 'nativeBody',
                     'cyborgIncarnation', 'alreadyMechanical', 'surviveIncarnation', 'referenceStatus')} |
                     {'addedInPass19': uid in new_uids, 'inPlayableVersusRoster': uid in playable_uids,
                      'sourceBodyReview': source['sourceBodies'].get(uid, {}).get('review'),
                      'existingVariantIDs': [o['id'] for o in record['actualOptions']]})
    for raw in record['requests']:
        family = raw['id']
        key = (uid, family)
        request = {'jobID': uid + '--' + family, 'uid': uid, 'family': family, 'sourceUID': uid,
                   'identityName': record['name'], 'sourceGame': record['game'],
                   'initialJobID': initial_jobs[key]['jobID'] if key in initial_jobs else None,
                   'initialJobStatus': initial_jobs[key]['status'] if key in initial_jobs else None,
                   'rawRegistryStatus': raw['status'], 'actualCodeRequestStatus': actual[family]['status'],
                   'actualCodeCostumeID': actual[family].get('costumeID'),
                   'addedInPass19': uid in new_uids, 'identityReferenceStatus': record['referenceStatus']}
        status = actual[family]['status']
        if status == 'not-applicable':
            reason = ('already-cyborg-incarnation' if record['cyborgIncarnation'] else 'already-wholly-mechanical-body') if family == 'cyborg' else 'already-Survive-incarnation'
            request.update(status='not-applicable', reason=reason, selectable=False)
            excluded.append(request)
        elif key in delivered:
            native = delivered[key]
            request.update(status='fulfilled-produced-reviewed-lazy' if native['deliveryMode'] == 'lazy-native' else 'fulfilled-independent-native',
                           costumeID=native['id'], selectionExposure=native['selectionExposure'],
                           evidenceUID=uid, evidenceFamily=family,
                           producesNewNativeArt=True, pendingArtFromRegistryDoesNotMeanMissingProducedArt=native['deliveryMode'] == 'lazy-native')
        elif family == 'retro' and status == 'ready-native':
            request.update(status='fulfilled-renderer-presentation', costumeID='retro',
                           producesNewNativeArt=False, originalGameSpriteExtraction=False)
        elif status == 'ready-existing-native':
            request.update(status='fulfilled-existing-native', costumeID=actual[family].get('costumeID', family),
                           producesNewNativeArt=False)
        elif family == 'canonical':
            options = [o for o in record['actualOptions'] if o.get('family') == 'canonical']
            request.update(status='partial-reviewed-appearances' if options else 'needs-reference-enumeration',
                           canonicalEnumerationComplete=False, reviewedReuseCount=len(options),
                           reviewedOptionIDs=[o['id'] for o in options],
                           knownSpecificPendingRequestIDs=[o['id'] for o in official['requests'] if o['uid'] == uid])
            canonical_work.append(request)
        elif family in NATIVE and status == 'pending-art':
            request.update(status='missing-native-art', selectable=False,
                           prerequisite='reference-qualification-before-canonical-identity-claims' if record['referenceStatus'] == 'unattested-body-presentation-reconstruction' else 'identity-specific-native-art-and-review',
                           nativeSourcePreparationStatus=request['initialJobStatus'] or 'new-source-identity-available; native-costume-not-produced')
            missing.append(request)
        else:
            raise RuntimeError('Unreconciled actual request: ' + str(request))
        requests.append(request)

initial_native_missing = {key for key, job in initial_jobs.items() if key[1] in NATIVE and not job['status'].startswith('complete')}
already_done = [key for key in delivered if key in initial_jobs and initial_jobs[key]['status'].startswith('complete')]
newly_done = [key for key in delivered if key in initial_native_missing]
new_native_jobs = [r for r in requests if r['addedInPass19'] and r['family'] in NATIVE and r['status'] != 'not-applicable']
if not (len(initial_native_missing) == 1447 and len(new_native_jobs) == 65 and len(newly_done) == 14 and len(missing) == 1498):
    raise RuntimeError('Per-identity/family reconciliation does not produce expected exact counts')
if already_done != [('core__solid', 'cyborg')]:
    raise RuntimeError('Initial completed delivery changed')
if any((r['uid'], r['family']) not in initial_native_missing and not r['addedInPass19'] for r in missing):
    raise RuntimeError('Missing request lacks initial job or new UID')

native_deliveries = []
for key, value in delivered.items():
    job = initial_jobs.get(key)
    native_deliveries.append(value | {'initialJobID': job['jobID'] if job else None,
                                     'initialJobStatus': job['status'] if job else None,
                                     'newlyFulfilsInitialMissingJob': key in initial_native_missing,
                                     'alreadyFulfilledInInitialSnapshot': key in already_done})
physical_assets = {a['file']: a for value in native_deliveries for a in value['assets']}
if len(physical_assets) != 54:
    raise RuntimeError('Independent delivered PNG count changed')

new_identity_jobs = []
for uid in source['rosterInstallResult']['added']:
    record = records[uid]
    own = [r for r in requests if r['uid'] == uid]
    new_identity_jobs.append({'uid': uid, 'name': record['name'], 'nativeBody': record['nativeBody'],
        'cyborgIncarnation': record['cyborgIncarnation'], 'alreadyMechanical': record['alreadyMechanical'],
        'surviveIncarnation': record['surviveIncarnation'],
        'nativeMissingFamilies': [r['family'] for r in own if r['status'] == 'missing-native-art'],
        'excludedFamilies': [{'family': r['family'], 'reason': r['reason']} for r in own if r['status'] == 'not-applicable'],
        'derivedPresentationFamilies': [r['family'] for r in own if r['status'] == 'fulfilled-renderer-presentation'],
        'canonicalEnumerationComplete': False})

height_inventory = source['heights']
height_summary = {kind: {'entries': len(height_inventory[kind]),
                       'evidenceCounts': count(h['evidence'] for h in height_inventory[kind]),
                       'directlyObservedPrimaryEntries': sum(h['evidence'] == 'official-primary-directly-observed' for h in height_inventory[kind]),
                       'needsStrongerPrimaryPhysicalReferences': sum(h['evidence'] != 'official-primary-directly-observed' for h in height_inventory[kind])}
                  for kind in ('sprites', 'machines')}

report = {
    'schema': 'cqc.native-wardrobe-reconciled-backlog/1',
    'createdAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'status': 'source-reconciled; wardrobe-incomplete',
    'scope': 'Read-only join of actual frozen application registration/data, original queued UID/family jobs, reviewed native deliveries, immutable publication pins and previously recorded production-browser evidence. No new browser, fixture test, generation, application/Git/publication mutation, asset rewrite or TLS operation.',
    'applicationSourceCommit': audited_head,
    'currentProductionCommitRead': head,
    'subsequentUnrelatedPwaFollowupFiles': subsequent_files,
    'allActualWardrobeModulePinsStillExact': True,
    'sourceRequestsRecord': {'identityCount': len(records), 'playableVersusIdentities': 373,
        'preservedIdentityOutsideMainVersusSelection': preserved_outside[0],
        'originalModeAccessibleUID': 'oc__parallaxe', 'requests': len(requests),
        'families': count(r['family'] for r in requests), 'actualCodeStatuses': count(r['actualCodeRequestStatus'] for r in requests),
        'reconciledStatuses': count(r['status'] for r in requests)},
    'reconciliation': {
        'initialQueueJobsIncludingDerivedPresentations': len(initial_jobs),
        'initialDerivedPresentationJobs': sum(key[1] == 'retro' for key in initial_jobs),
        'initialAlreadyCompleteNativeJobs': sum(job['status'].startswith('complete') for key, job in initial_jobs.items() if key[1] in NATIVE),
        'initialNativeMissingSnapshot': len(initial_native_missing),
        'newInstalledUIDs': len(new_uids), 'newEligibleNativeJobs': len(new_native_jobs),
        'newlyDrawnDeliveredVariants': len(delivered), 'newlyFulfilsInitialMissingJobs': len(newly_done),
        'alreadyFulfilledInInitialSnapshot': ['core__solid--cyborg'],
        'deliveredOutsideInitialEligibleJobs': [],
        'newlyFulfilledJobIDs': [uid + '--' + family for uid, family in sorted(newly_done)],
        'finalNativeArtMissing': len(missing), 'finalMissingByFamily': count(r['family'] for r in missing),
        'exactEquation': '1447 initial missing + 65 eligible native jobs for 19 new UID - 14 newly fulfilled initial jobs = 1498 missing native jobs',
        'whyNotSubtract15': 'Snake cyborg was already complete-native-reviewed-geometry in the original1727 queue and was already absent from the1447 missing snapshot. All other14 deliveries join an originally missing UID/family job. Psycho Mantis Twin Snakes cyborg is eligible and joined. The two MPO NextGen paintings are genuine refinements of already painted source atlases and still fulfil their original nextgen jobs; no previous source art is relabelled as pixel extraction.',
        'lazyStatusQualification': 'Four approved, physically produced and immutable-published NextGen options retain requestFor pending-art before metadata registration. This is dormant registry state, not missing artwork. They require awaited SHA/provenance/renderer/image preparation before an independent slot can change.',
        'legacySevenQualification': 'Seven older native choices are preserved. Six fulfil baseline requested NextGen jobs. Elsie Frances Marionnette B is a preserved extra choice outside the requested NextGen family, so it does not consume an additional pending job.',
    },
    'deliveredNewNativeVariants': native_deliveries,
    'physicalAssetAudit': {'method': 'Read physical local bytes and PNG IHDR, compare source and published byte/SHA pins; no decoder or image editing.',
        'files': len(physical_assets), 'bytes': sum(a['bytes'] for a in physical_assets.values()),
        'physicalAuthoredFiguresFromPreservedDeliveryProofs': 710,
        'qualification': '710 physically authored figures across the15 delivery proofs, not710 independent action names. NextGen includes128 physical figures with127 used by production source mapping.',
        'assets': list(physical_assets.values())},
    'preservedExistingNativeChoices': preserved_legacy,
    'reviewedAppearanceReuse': {'options': len(appearances), 'targetUIDs': len({x['uid'] for x in appearances}),
        'kindCounts': count(a['kind'] for a in appearances), 'newNativePNGs': 0,
        'canonicalEnumerationComplete': False, 'optionsData': appearances},
    'derivedRetroPresentations': {'options': len(pixels), 'newNativePNGs': 0,
        'method': 'Reviewed native-frame or machine-part pixel presentation, retains authored poses/geometry; labelled original Archives style, never a claimed original-game extraction.',
        'optionsData': pixels},
    'knownSpecificOfficialWardrobeBacklog': {**official,
        'qualificationAdditional': 'All103 specific requests remain reference-and-native-art-pending; reuse of a reviewed historical appearance or an authored tuxedo does not attest or complete another specific released costume. This list is nonexhaustive and separate from374 identity-level canonical enumeration jobs.'},
    'new19UIDApplicability': new_identity_jobs,
    'exclusionPolicy': {'cyborg': 'Exclude an already cyborg incarnation or wholly mechanical body only. Partial prostheses, powered suits, nanomachines and parasites remain eligible; biological Peace Walker operators inside boxes remain eligible. Animals can receive identity-specific cybernetic augmentation.',
        'survive': 'Exclude existing Survive incarnations only. Machines remain eligible for an original weathered Dite interpretation.',
        'metalgear': 'Every preserved or newly installed identity remains eligible for an explicitly original character-inspired machine form; existing machines are not broadly excluded.',
        'tuxedo': 'Every identity remains eligible in this project registry; human formalwear or explicitly original nonhuman/formal-plating interpretation. No assertion that every source game contained an official tuxedo.',
        'canonical': 'Every identity requires exact-source enumeration and qualification; originality or an unattested body cannot certify canonical outfits.',
        'excludedRequests': excluded},
    'pendingNewBodyArtCandidatesOutsideInstalledRoster': [{**candidate,
        'actualStatus': 'base-native-body-art-missing; not-installed',
        'wardrobeCountedIn1498': False,
        'qualificationActual': 'The registry proposal is retained; await physically produced source-reviewed body or machine rig before adding active wardrobe jobs.'}
        for candidate in source['registry']['candidates'] if candidate['uid'] in source['rosterInstallResult']['pending']],
    'heightReconciliation': {'summary': height_summary, 'spriteIdentityCount': len(height_inventory['sprites']),
        'machineAssembliesNotFighterCount': len(height_inventory['machines']),
        'heightInventory': height_inventory, 'costumeScopedOriginalMachineExtents': source['scopedHeights'],
        'qualification': 'Directly read official stature is incarnation-specific.307 sprite estimates plus8 community-evidence values remain qualified;54 machine assemblies lack directly observed primary stature. The3.4m Snake and3.2m Ocelot original Metal Gear costumes are deliberate authored estimates, not canon. Existing body-sized costumes inherit their exact source UID stature/qualification. Physical rendering and collision readiness do not certify absolute visual fidelity.'},
    'identityRecords': identities,
    'requests': requests,
    'nativeMissingJobIDs': [r['jobID'] for r in missing],
    'canonicalWorkJobIDs': [r['jobID'] for r in canonical_work],
    'evidencePins': {key: pin(path) for key, path in PATHS.items()},
    'metadataPins': metadata_pins,
    'actualApplicationModulePins': source['pins'],
    'evidenceLimits': ['Source audit executes actual catalogue registration without browser, network, images or gameplay. It is an audit, not a new production replay proof.',
        'Actual production readiness/match/replay claims are limited to pinned preserved browser delivery receipts; this report does not replace them.',
        'Earlier source-read V1/V2 omitted five bridge-only rigs and are retained as partial attempts; V3 invokes the actual exported bridge factory and includes all19 additions.',
        'The preserved first reconciliation attempt incorrectly named Carter as outside selection. Literal source UID subtraction identifies oc__parallaxe, accessible via the separate original mode. Carter remains in main selection with its historical-project-design-unattested-canon qualification. No counts, assets or completion joins changed.',
        'The raw static V2 receipt retained a failed ancillary favicon policy; the final qualified delivery preserves it and records0 game failures. No historical receipt is overwritten.',
        '1:1 remains the fidelity objective. Generated native adaptation, authored original designs, retro renderer styles, source references and physical height estimates are labelled distinctly; no universal pixel-perfect or complete official wardrobe certification.'],
}
report_path = OUT / 'NATIVE_WARDROBE_RECONCILED_BACKLOG_ACTUAL_V1.json'
with report_path.open('x') as f:
    json.dump(report, f, ensure_ascii=False, indent=1)
    f.write('\n')
report_path.chmod(0o400)
print(json.dumps({'report': pin(report_path), 'missing': len(missing), 'byFamily': report['reconciliation']['finalMissingByFamily'],
                  'delivered15JoinedMissing14': len(newly_done), 'newNativeJobs': len(new_native_jobs), 'nativeFilesRead': len(physical_assets)}, ensure_ascii=False))
