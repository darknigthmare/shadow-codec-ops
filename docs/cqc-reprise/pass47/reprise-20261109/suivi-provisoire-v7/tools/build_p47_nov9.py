#!/usr/bin/env python3
"""Receipt-driven P47 export; append three sheets without rewriting V6 records."""
from pathlib import Path
from datetime import datetime, timezone
from collections import Counter
from xml.etree import ElementTree as ET
import argparse, copy, csv, gzip, hashlib, io, json, struct, sys, zipfile
sys.dont_write_bytecode = True
from workbook_zip import NS, Q, col, raw_zip_records, scalar, worksheet

SHA = lambda b: hashlib.sha256(b).hexdigest()
GIT_SHA = lambda b: hashlib.sha1(f'blob {len(b)}\0'.encode() + b).hexdigest()
META = {'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', '[Content_Types].xml'}
REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
PKGREL = 'http://schemas.openxmlformats.org/package/2006/relationships'
CT = 'http://schemas.openxmlformats.org/package/2006/content-types'
SHEETS = [('P47 V7 Synthèse', 'xl/worksheets/sheetP47Nov9_1.xml'),
          ('P47 V7 Lot20', 'xl/worksheets/sheetP47Nov9_2.xml'),
          ('P47 V7 Étapes', 'xl/worksheets/sheetP47Nov9_3.xml')]
MARKERS = (b'/tmp/', b'/workspace/', b'file://', b'_vercel_share=',
           b'127.0.0.1', b'localhost:', b'Bearer ', b'api_key', b'access_token')
FEAR = ('core__fear', 'cyborg')
EVA = ('core__eva_mgs3', 'cyborg')
STAGES = [('source', 'Source approuvée'), ('compilation', 'Compilation source'),
          ('localUI', 'QA locale'), ('installation', 'Installation VS'),
          ('runtimeGit', 'Git runtime'), ('production', 'Production canonique')]


def require(condition, message):
    if not condition:
        raise ValueError(message)


def pin(path):
    path = Path(path)
    data = path.read_bytes()
    return {'file': path.name, 'bytes': len(data), 'sha256': SHA(data)}


def encoded(value):
    data = (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()
    require(not any(marker in data for marker in MARKERS), 'Private marker in public artifact')
    return data


def write_json(path, value):
    require(not path.exists(), 'Output already exists')
    path.write_bytes(encoded(value))


def write_csv(path, rows, fields):
    stream = io.StringIO(newline='')
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows({key: scalar(row.get(key, '')) for key in fields} for row in rows)
    data = b'\xef\xbb\xbf' + stream.getvalue().encode()
    require(not any(marker in data for marker in MARKERS), 'Private marker in CSV')
    path.write_bytes(data)


class Inputs:
    def __init__(self, config):
        self.config = config
        self.records = {}

    def raw(self, spec):
        path = Path(spec['path'])
        data = path.read_bytes()
        require(SHA(data) == spec['sha256'], f'Input SHA256 mismatch: {path.name}')
        if 'bytes' in spec:
            require(len(data) == spec['bytes'], f'Input byte count mismatch: {path.name}')
        self.records[str(path.resolve())] = {'path': str(path.resolve()), **pin(path)}
        return data

    def load(self, name):
        return json.loads(self.raw(self.config['inputs'][name]))

    def evidence(self, spec):
        self.raw(spec)
        return {'file': Path(spec['path']).name, **{key: value for key, value in spec.items() if key in ('bytes', 'sha256', 'gitBlobSHA1')}}


def append_raw(original, tables):
    """Keep original compressed local records; only three structure parts change."""
    with zipfile.ZipFile(io.BytesIO(original)) as source:
        workbook = ET.fromstring(source.read('xl/workbook.xml'))
        sheets = workbook.find(Q('sheets'))
        require(len(sheets) == 50, 'Expected the exact 50-sheet V6 baseline')
        previous_sheets = [dict(sheet.attrib) for sheet in sheets]
        rels = ET.fromstring(source.read('xl/_rels/workbook.xml.rels'))
        types = ET.fromstring(source.read('[Content_Types].xml'))
        for index, (name, member) in enumerate(SHEETS, 1):
            require(member not in source.namelist(), 'Output sheet already present')
            rid = f'rIdP47Nov9{index}'
            ET.SubElement(sheets, Q('sheet'), {'name': name, 'sheetId': str(50 + index), '{' + REL + '}id': rid})
            ET.SubElement(rels, '{' + PKGREL + '}Relationship', {'Id': rid, 'Type': REL + '/worksheet', 'Target': member.removeprefix('xl/')})
            ET.SubElement(types, '{' + CT + '}Override', {'PartName': '/' + member, 'ContentType': 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'})
        for view in workbook.findall(Q('bookViews') + '/' + Q('workbookView')):
            view.set('activeTab', '50')
        changes = {'xl/workbook.xml': ET.tostring(workbook, encoding='utf-8', xml_declaration=True),
                   'xl/_rels/workbook.xml.rels': ET.tostring(rels, encoding='utf-8', xml_declaration=True),
                   '[Content_Types].xml': ET.tostring(types, encoding='utf-8', xml_declaration=True)}
    additions = {}
    for number, ((_, member), table) in enumerate(zip(SHEETS, tables)):
        sheet = ET.fromstring(worksheet(table))
        data = sheet.find(Q('sheetData'))
        columns = ET.Element(Q('cols'))
        for index, heading in enumerate(table[0], 1):
            width = (40 if index == 1 else 140) if number == 0 else (30 if index <= 5 else 52)
            ET.SubElement(columns, Q('col'), min=str(index), max=str(index), width=str(width), customWidth='1')
        sheet.insert(list(sheet).index(data), columns)
        for index, row in enumerate(data):
            row.set('ht', '34' if index == 0 else '76')
            row.set('customHeight', '1')
            for cell in row:
                cell.set('s', '17' if index == 0 else '9')
        additions[member] = ET.tostring(sheet, encoding='utf-8', xml_declaration=True)
    infos, oldlocal, oldcentral, comment = raw_zip_records(original)
    require(len(infos) == 112, 'Expected 112 original V6 ZIP records')
    output, central = bytearray(), []

    def emit(record, directory):
        directory = bytearray(directory)
        struct.pack_into('<I', directory, 42, len(output))
        output.extend(record)
        central.append(directory)

    for info in infos:
        if info.filename in changes:
            stream = io.BytesIO()
            with zipfile.ZipFile(stream, 'w', compression=zipfile.ZIP_DEFLATED) as one:
                one.writestr(copy.copy(info), changes[info.filename])
            _, local, directory, _ = raw_zip_records(stream.getvalue())
            emit(local[info.filename], directory[info.filename])
        else:
            emit(oldlocal[info.filename], oldcentral[info.filename])
    for member, data in additions.items():
        stream = io.BytesIO()
        info = zipfile.ZipInfo(member, date_time=(2026, 11, 9, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o600 << 16
        with zipfile.ZipFile(stream, 'w', compression=zipfile.ZIP_DEFLATED) as one:
            one.writestr(info, data)
        _, local, directory, _ = raw_zip_records(stream.getvalue())
        emit(local[member], directory[member])
    start = len(output)
    for record in central:
        output.extend(record)
    output.extend(struct.pack('<IHHHHIIH', 0x06054b50, 0, 0, len(central), len(central), len(output) - start, start, len(comment)))
    output.extend(comment)
    result = bytes(output)
    _, newlocal, _, _ = raw_zip_records(result)
    preserved = [name for name in oldlocal if name not in META]
    require(len(preserved) == 109 and all(oldlocal[name] == newlocal[name] for name in preserved), 'Historical compressed ZIP record changed')
    with zipfile.ZipFile(io.BytesIO(original)) as before, zipfile.ZipFile(io.BytesIO(result)) as after:
        require(after.testzip() is None and len(after.namelist()) == 115, 'Invalid resulting ZIP')
        oldworksheets = [name for name in before.namelist() if name.startswith('xl/worksheets/') and name.endswith('.xml') and name.count('/') == 2]
        require(len(oldworksheets) == 50 and all(before.read(name) == after.read(name) for name in oldworksheets), 'Historical worksheet payload changed')
        now_sheets = ET.fromstring(after.read('xl/workbook.xml')).find(Q('sheets'))
        require(len(now_sheets) == 53 and [dict(sheet.attrib) for sheet in list(now_sheets)[:50]] == previous_sheets, 'Historical sheet identity changed')
        require(all(not any(marker in after.read(name) for marker in MARKERS) for name in after.namelist() if name.endswith('.xml')), 'Private marker in workbook')
    import openpyxl
    reader = openpyxl.load_workbook(io.BytesIO(result), read_only=True, data_only=False)
    require(len(reader.sheetnames) == 53 and reader.sheetnames[-3:] == [name for name, _ in SHEETS], 'OOXML read-only load mismatch')
    reader.close()
    return result, [{'part': name, 'rawSHA256': SHA(oldlocal[name]), 'exact': True} for name in preserved]


def collect(config, inputs):
    base = inputs.load('base_json')
    require(len(base['rows']) == 1905 and base['scopeUID'] == 381, 'Unexpected V6 inventory')
    indexed = {(row['uid'], row['famille']): row for row in base['rows']}
    require(len(indexed) == 1905, 'Duplicate baseline UID/family')
    queue = inputs.load('work_queue')['items']
    require(len(queue) == 20 and len({(row['uid'], row['family']) for row in queue}) == 20, 'Invalid lot20 queue')
    reconciliation = inputs.load('source_reconciliation')
    native = inputs.load('native_readback')
    archive = inputs.load('source_archives')
    archive_files = {record['sha256']: record for record in archive['files']}
    require(len(archive_files) == archive['rawPNGCount'] and sum(record['bytes'] for record in archive_files.values()) == archive['rawBytes'], 'Source raw archive index count mismatch')
    require(len(archive['receipts']) == archive['archiveReceiptCount'], 'Source receipt index mismatch')
    native_commit = native['ref']
    require(native['metadata'] == 19 and native['sourceArtReviews'] == 19 and native['all39ArtifactPinsAcrossNativeNotesExact'], 'Incomplete Native19 documentary readback')
    source_rows = reconciliation['rows']
    require(len(source_rows) == 19 and len({(row['uid'], row['id']) for row in source_rows}) == 19, 'Invalid source19 keys')
    source = {}
    for item in source_rows:
        key = (item['uid'], item['id'])
        require(key in indexed and key != FEAR, 'Unrelated or protected source in Native19')
        metadata_spec = dict(item['metadata'], path=item['metadata']['localPath'])
        metadata_raw = inputs.raw(metadata_spec)
        require(GIT_SHA(metadata_raw) == item['metadata']['gitBlobSHA1'], 'Metadata Git blob mismatch')
        metadata = json.loads(metadata_raw)
        review_spec = dict(item['rootReview'], path=item['rootReview']['localPath'])
        review_raw = inputs.raw(review_spec)
        review = json.loads(review_raw)
        require(GIT_SHA(review_raw) == item['rootReview']['gitBlobSHA1'], 'Root review Git blob mismatch')
        require((metadata['uid'], metadata['id']) == key and metadata['artAuditSHA256'] == SHA(review_raw), 'Metadata/review identity mismatch')
        require(review['status'] == 'approved' and review['sourceOnly'] and not review['runtimeAdmitted'], 'Source approval must be separate from runtime')
        regions = metadata['option']['sprite']['nativeDirectionRegions']['regions']
        roles = {(region['face'], region['file'], tuple(region['rect'])) for region in regions}
        require(len(roles) == 34 and Counter(region['face'] for region in regions) == {1: 17, -1: 17}, 'Expected 34 distinct independent-facing roles')
        selected_png = {region['sha256'] for region in regions}
        input_pins = {}
        for label, evidence in item['inputPins'].items():
            require(review[label] == evidence['sha256'], 'Source job/review pin mismatch')
            candidates = evidence['recoveredExactPaths']
            require(candidates, 'Exact source input missing')
            path = Path(candidates[0])
            raw = path.read_bytes()
            require(SHA(raw) == evidence['sha256'], 'Recovered source input file hash mismatch')
            if path.suffix == '.gz':
                json.loads(gzip.decompress(raw))
            inputs.raw({'path': str(path), 'sha256': SHA(raw)})
            input_pins[label] = {'file': path.name, 'sha256': evidence['sha256'], 'hashScope': 'EXACT_FILE_BYTES_GZIP_COMPRESSED' if path.suffix == '.gz' else 'EXACT_FILE_BYTES'}
        source[key] = {'metadataSHA256': SHA(metadata_raw), 'metadataBytes': len(metadata_raw),
                       'metadataGitBlobSHA1': GIT_SHA(metadata_raw), 'sourceNativeArchiveCommit': native_commit,
                       'sourceMetadataURI': f'https://raw.githubusercontent.com/{config["repository"]}/{native_commit}/{item["metadata"]["path"]}',
                       'sourceRootReview': {'file': Path(item['rootReview']['path']).name, 'bytes': len(review_raw), 'sha256': SHA(review_raw)},
                       'sourceInputPins': input_pins, 'mappedBodies': len(roles),
                       'activeSelectedSourcePNGCount': len(selected_png),
                       'activeSelectedSourcePNGArchivedCount': len(selected_png & set(archive_files)),
                       'activeSelectedSourceArchivePins': [archive_files[digest] for digest in sorted(selected_png & set(archive_files))],
                       'activeSelectedOutsideP47RawIndex': sorted(selected_png - set(archive_files)),
                       'outsideP47RawIndexQualification': 'Anciennes pages P46 réutilisées par Snake/furry et Olga/cyborg : leurs SHA exacts restent dans le sourcePinIndex approuvé. Absence de cet index P47 ne signifie ni perte ni archive P47 prouvée.',
                       'sourceApprovedAtUTC': review['reviewedAt'],
                       'sourceQualification': 'Approbation du job source exact et compilation Native34. Les anciennes corrections et réserves restent historiques ; aucune admission en jeu déduite.'}
    installed = {}
    for pair in config['historical_admissions']:
        approval_raw = inputs.raw(pair['approval'])
        approval = json.loads(approval_raw)
        browser_raw = inputs.raw(pair['browser'])
        metadata_pins = [record for record in approval['candidatePins'] if record['file'] == 'metadata-v1.json']
        require(approval['approvedModes'] == ['versus'] and approval['CoreSupportAdmission'] is False, 'Unexpected mode admission')
        require(len(approval['pairs']) == len(metadata_pins), 'Admission metadata mismatch')
        for item, metadata_pin in zip(approval['pairs'], metadata_pins):
            key = (item['uid'], item['id'])
            require(key in source and key not in installed, 'Admission key not in recovered sources')
            require(metadata_pin['sha256'] == source[key]['metadataSHA256'], 'Admission/source metadata SHA mismatch')
            installed[key] = {'approval': {'file': Path(pair['approval']['path']).name, 'bytes': len(approval_raw), 'sha256': SHA(approval_raw)},
                              'browser': {'file': Path(pair['browser']['path']).name, 'bytes': len(browser_raw), 'sha256': SHA(browser_raw)},
                              'reviewedAtUTC': approval.get('observedAtUTC', approval.get('atUTC'))}
    git_commit = inputs.load('runtime_git_commit')
    git_tree = inputs.load('runtime_git_tree')
    require(not git_tree.get('truncated') and git_commit['commit']['tree']['sha'] == git_tree['sha'], 'Git commit/tree mismatch')
    tree_index = {record['path']: record for record in git_tree['tree']}
    for key in installed:
        path = f'public/cqc/assets/combat-costumes-pass47/{key[0]}/{key[1]}/metadata-v1.json'
        require(path in tree_index and tree_index[path]['sha'] == source[key]['metadataGitBlobSHA1'], 'Installed source metadata missing/different in current runtime Git')
    local_validation = inputs.load('local_runtime_validation')
    baseline = inputs.load('current_local_baseline')
    require(baseline['protected67ContentBytesSHAExact'] and len(baseline['protected67']) == 67 and baseline['runtime17Count'] == len(baseline['runtime17Pins']), 'Current protected/local readback incomplete')
    require(local_validation['localMetadataTotal'] == len(installed), 'Historical installed receipt count mismatch')
    require(local_validation['counts']['versus'] == base['currentModeAdmission']['versusTotalOptions'] + len(installed), 'Local count mismatch')
    fear = inputs.load('fear_hold')
    require((fear['uid'], fear['id']) == FEAR and not fear['sourceArtApproved'] and not fear['runtimeAdmitted'], 'Fear hold missing')
    refusal = fear['correctiveAttempt']
    require(refusal['result'] == 'EXPLICIT_TOOL_SAFETY_REFUSAL_INPUT' and refusal['producedPNGs'] == 0 and refusal['retries'] == 0 and not refusal['rephrasing'] and not refusal['delegatedRetry'], 'Explicit Fear no-retry hold must remain exact')
    production = inputs.load('current_production')
    require(production['canonicalProductionCommit'] == base['productionCurrentCommit'] and production['canonicalDeploymentID'] == base['productionDeploymentID'], 'Current production changed: recollect exact production cohort before export')
    require(production['canonicalRuntimeCohortCount'] == base['newProductionOptions'] and production['newDeploymentAttemptsThisResume'] == 0, 'Current production cohort/attempt count mismatch')
    require(production['ready'] is True, 'Canonical READY not established')
    current_git = {'commit': git_commit['sha'], 'tree': git_tree['sha'], 'parents': [row['sha'] for row in git_commit['parents']],
                   'repository': config['repository'], 'branch': config['runtime_branch'],
                   'runtimeP47MetadataCount': len(installed), 'readback': inputs.evidence(config['inputs']['runtime_git_commit'])}
    entries = []
    for queued in queue:
        key = (queued['uid'], queued['family'])
        old = indexed[key]
        require(old['varianteResteAAchever'], 'Queue entry already closed in V6')
        entry = {'uid': key[0], 'famille': key[1], 'personnage': old['personnage'], 'epoque': old['epoque'], 'groupe': queued['group'],
                 'source': 'HOLD_REFUS_EXPLICITE_D12_NE_PAS_RELANCER' if key == FEAR else 'APPROUVEE_ROOT_SOURCE_SEULEMENT',
                 'compilation': 'NON_ADMISE_HOLD' if key == FEAR else 'COMPILEE_NATIVE34_SOURCE_SEULEMENT',
                 'localUI': 'HOLD_SANS_RELANCE' if key == FEAR else ('PASS_HISTORIQUE_LOCAL_VS_PREUVES_RECUPEREES' if key in installed else 'EN_ATTENTE_QA_ACTUELLE_NON_ADMISE'),
                 'installation': 'INSTALLE_VS_HISTORIQUE_BYTES_ACTUELS_IDENTIQUES' if key in installed else 'NON_INSTALLE',
                 'runtimeGit': 'PRESENT_GIT_RUNTIME_COURANT' if key in installed else 'NON_INTEGRE_GIT_RUNTIME',
                 'production': 'NON_PUBLIE_P47_PRODUCTION_CANONIQUE10',
                 'sourceApproved': key in source, 'compiled': key in source, 'localUIQualified': key in installed,
                 'runtimeAdmitted': key in installed, 'runtimeGitIntegrated': key in installed, 'productionAdmitted': False,
                 'currentHold': key == FEAR, 'holds': 'Refus explicite D12 : aucune relance, reformulation, délégation ou autre pipeline.' if key == FEAR else '',
                 'productionCriterionStillOpen': True, 'sourceNativeArchiveIsNotRuntimeGit': True,
                 'currentRuntimeGitCommit': git_commit['sha'] if key in installed else '', 'freshUIAdmissionClaimed': False}
        if key in source:
            entry.update(source[key])
        if key in installed:
            entry['historicalLocalAdmissionEvidence'] = installed[key]
        entries.append(entry)
    require(set(source) == {(entry['uid'], entry['famille']) for entry in entries if entry['sourceApproved']}, 'Source19/lot20 mismatch')
    baseline_native = {key for key, row in indexed.items() if row['statutInventaire'].startswith('NATIF_')}
    baseline_covered = {key for key, row in indexed.items() if not row['varianteResteAAchever']}
    open_keys = set(indexed) - baseline_covered
    historical_holds = {key for key, row in indexed.items() if row['statutInventaire'] == 'HOLD_HISTORIQUE'}
    current_holds = historical_holds | {FEAR}
    require(EVA in current_holds and current_holds <= open_keys, 'Hold lost or incorrectly closed')
    outside_p47 = {digest for entry in source.values() for digest in entry['activeSelectedOutsideP47RawIndex']}
    costumes_with_prior_pages = sum(bool(entry['activeSelectedOutsideP47RawIndex']) for entry in source.values())
    totals = {'identities': len({key[0] for key in indexed}), 'fiveFamilyRows': len(indexed), 'lot20': len(entries),
              'sourceApprovedP47': len(source), 'compiledSourceP47': len(source), 'mappedP47SourceBodies': sum(entry.get('mappedBodies', 0) for entry in entries),
              'localUIQualifiedHistoricalP47': len(installed), 'installedP47': len(installed), 'gitRuntimeP47': len(installed),
              'pendingLocalUIAndInstallation': len(set(source) - set(installed)), 'newP47ProductionOptions': 0,
              'publishedP46ProductionOptions': production['canonicalRuntimeCohortCount'],
              'totalRuntimeCohort': base['newProductionOptions'] + len(installed),
              'nativeSourceAvailableTargeted': len(baseline_native | set(source)),
              'nativeInstalledTargeted': len(baseline_native | set(installed)), 'nativeProductionTargeted': len(baseline_native),
              'coveredProductionTargeted': len(baseline_covered), 'openAtPublicationCriterion': len(open_keys),
              'currentCreatableAtPublicationCriterion': len(open_keys - current_holds), 'currentFiveFamilyHolds': len(current_holds),
              'historicalV6Creatable': base['creatableVariantsRemaining'], 'historicalV6Hold': len(historical_holds),
              'newCurrentUIAdmissions': 0, 'newDeploymentAttemptsThisResume': production['newDeploymentAttemptsThisResume'],
              'historicalArchivedRawPNG': archive['rawPNGCount'], 'historicalArchivedRawBytes': archive['rawBytes'],
              'historicalSourceArchiveReceipts': archive['archiveReceiptCount'],
              'preExistingSourcePNGOutsideP47RawIndex': len(outside_p47), 'costumesReusingPreExistingP46Pages': costumes_with_prior_pages}
    facts = {'schema': 'cqc.p47.nov9.receipt-derived-stage-facts/1', 'atUTC': config['observed_at_utc'],
             'exportState': 'PROVISIONAL_REFRESHABLE_SNAPSHOT_INDEPENDENT_AUDIT_PENDING',
             'counts': totals, 'entries': entries, 'currentRuntimeGit': current_git,
             'currentProduction': production, 'currentProductionEvidence': inputs.evidence(config['inputs']['current_production']),
             'currentLocalBaselineEvidence': inputs.evidence(config['inputs']['current_local_baseline']),
             'currentLocalBaselineQualification': baseline['qualification'],
             'historicalLocalValidation': inputs.evidence(config['inputs']['local_runtime_validation']),
             'historicalLocalModeCounts': local_validation['counts'],
             'sourceReconciliationEvidence': inputs.evidence(config['inputs']['source_reconciliation']),
             'nativeSourceReadbackEvidence': inputs.evidence(config['inputs']['native_readback']),
             'rawSourceArchiveEvidence': inputs.evidence(config['inputs']['source_archives']),
             'rawSourceArchiveSnapshotAtUTC': archive['atUTC'],
             'rawSourceArchiveQualification': f'Index P47 immuable récupéré du 2 novembre, avec sources held et remplacées. Jointure des SHA actifs explicite ; {len(outside_p47)} anciennes pages P46 sur {costumes_with_prior_pages} costumes, hors index P47, restent distinguées. Aucun nouveau contrôle pixel/HTTPS des PNG ni génération par cet export.',
             'sourceNativeArchiveCommit': native_commit,
             'historicalQuotaQualification': 'La tentative HTTP402 du 2 novembre reste historique. Aucun blocage quota actuel certain ni nouvelle tentative au 9 novembre ne sont déduits.',
             'uiQualification': 'Les sept admissions sont les reçus locaux archivés du 2 novembre, rapprochés des octets présents ; aucune nouvelle QA navigateur n’est revendiquée par cet export. Les douze autres sources attendent la QA actuelle.',
             'scopeQualification': 'Les identités, incarnations et époques restent celles du V6. Aucun changement de bible. Sources Native archivées, Git runtime et production canonique sont distincts.',
             'holds': [{'uid': key[0], 'famille': key[1]} for key in sorted(current_holds)],
             'fearHoldEvidence': {'file': Path(config['inputs']['fear_hold']['path']).name, 'sha256': config['inputs']['fear_hold']['sha256'],
                                  'code': refusal['code'], 'producedPNG': 0, 'retries': 0, 'rephrasing': False, 'delegatedRetry': False}}
    return base, facts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    config = json.loads(args.config.read_bytes())
    require(config['schema'] == 'cqc.p47.nov9.export-config-private/1', 'Unknown config schema')
    require(not args.output.exists(), 'Use a new versioned output directory')
    inputs = Inputs(config)
    before = {name: pin(spec['path']) for name, spec in config['inputs'].items()}
    base, facts = collect(config, inputs)
    original = inputs.raw(config['inputs']['base_book'])
    raw8 = inputs.raw(config['inputs']['base_eight_csv'])
    rows8 = list(csv.DictReader(io.StringIO(raw8.decode('utf-8-sig'))))
    require(len(rows8) == 3048 and len({(row['uid'], row['famille']) for row in rows8}) == 3048, 'Invalid eight-family baseline')
    staged = {(entry['uid'], entry['famille']): entry for entry in facts['entries']}
    overlay_fields = ['P47_' + field for field, _ in STAGES] + ['P47_currentHold', 'P47_holds', 'P47_metadataSHA256', 'P47_runtimeGitCommit', 'P47_publicationStillOpen']

    def overlay(row):
        result = copy.deepcopy(row)
        key = (row['uid'], row['famille'])
        entry = staged.get(key)
        result.update({'P47_' + field: entry[field] if entry else '' for field, _ in STAGES})
        result['P47_currentHold'] = row['statutInventaire'] == 'HOLD_HISTORIQUE' or key == FEAR
        result['P47_holds'] = entry['holds'] if entry and key == FEAR else (row.get('holds', '') if result['P47_currentHold'] else '')
        result['P47_metadataSHA256'] = entry.get('metadataSHA256', '') if entry else ''
        result['P47_runtimeGitCommit'] = entry['currentRuntimeGitCommit'] if entry else ''
        result['P47_publicationStillOpen'] = row.get('varianteResteAAchever') if not entry else True
        return result

    full5 = [overlay(row) for row in base['rows']]
    full8 = [overlay(row) for row in rows8]
    require(sum(row['P47_currentHold'] for row in full5) == facts['counts']['currentFiveFamilyHolds'], 'Five-family hold count mismatch')
    facts['counts']['eightFamilyRows'] = len(full8)
    facts['counts']['historicalEightFamilyHolds'] = sum(row['statutInventaire'] == 'HOLD_HISTORIQUE' for row in rows8)
    facts['counts']['currentEightFamilyHolds'] = sum(row['P47_currentHold'] for row in full8)
    matrix = [{'uid': entry['uid'], 'personnage': entry['personnage'], 'famille': entry['famille'], 'etape': label,
               'statut': entry[field], 'qualification': facts['uiQualification'] if field == 'localUI' else ('Archive Native ≠ Git runtime ≠ publication READY.'),
               'preuve': entry.get('historicalLocalAdmissionEvidence', '') if field in ('localUI', 'installation') else entry.get('sourceRootReview', '') if field in ('source', 'compilation') else facts['currentRuntimeGit'] if field == 'runtimeGit' else facts['currentProductionEvidence'],
               'hold': entry['holds']} for entry in facts['entries'] for field, label in STAGES]
    lot_headers = ['uid', 'personnage', 'epoque', 'famille', 'groupe'] + [field for field, _ in STAGES] + ['mappedBodies', 'metadataSHA256', 'sourceNativeArchiveCommit', 'currentRuntimeGitCommit', 'currentHold', 'holds']
    summary = [['Champ', 'État / preuve / limite'], ['Date du relevé UTC', facts['atUTC']],
               ['État', facts['exportState']], ['Périmètre', '381 UID ; 1905 combinaisons sur cinq familles ; 3048 sur huit familles.'],
               ['Conservation historique', '50 feuilles V6 exactes ; 109/112 enregistrements ZIP locaux V6 exacts. Seules trois métadonnées de structure changent pour trois nouvelles feuilles. V6 original intégralement intact.']]
    summary += [[name, value] for name, value in facts['counts'].items()]
    summary += [['Production actuelle', facts['currentProduction']], ['Git runtime actuel', facts['currentRuntimeGit']],
                ['QA locale', facts['uiQualification']], ['Quota', facts['historicalQuotaQualification']],
                ['Holds', 'Fear/cyborg D12 sans relance ; EVA/cyborg historique ; les cinq anciens holds huit familles restent conservés.'],
                ['Compteurs de natives', 'Union de clés UID/famille : source disponible, installée et publiée comptées séparément.'],
                ['Audit indépendant', 'Les auto-contrôles de construction ne constituent pas un audit indépendant. Le manifeste doit être accompagné du reçu indépendant portant ces SHA exacts.']]
    book, preserved = append_raw(original, [summary, [lot_headers] + [[entry.get(field, '') for field in lot_headers] for entry in facts['entries']], [list(matrix[0])] + [[row[field] for field in matrix[0]] for row in matrix]])
    output = args.output.resolve()
    output.mkdir(parents=True, mode=0o700)
    book_path = output / 'CQC_SUIVI_P47_NOV9_ETAT_REEL_PUBLIC_V7.xlsx'
    book_path.write_bytes(book)
    write_json(output / 'P47_NOV9_STAGE_FACTS_PUBLIC_V1.json', facts)
    snapshot = {'schema': 'cqc.p47.nov9.exhaustive-tracking/7', 'atUTC': facts['atUTC'], 'freezeStatus': facts['exportState'],
                'previousWorkbook': pin(config['inputs']['base_book']['path']), 'previousSnapshot': pin(config['inputs']['base_json']['path']),
                'historicalV6Rows': base['rows'], 'rows': full5, 'stageFacts': facts,
                'countCriterion': 'Publication canonique READY actuelle. Une source compilée ou une admission locale/Git ne ferme pas le reste publication.',
                'allRosterCompleted': False, 'sourcePNGOrProductMutationByThisExport': False}
    write_json(output / 'P47_CINQ_FAMILLES_ETAT_REEL_NOV9_PUBLIC_V7.json', snapshot)
    write_csv(output / 'P47_CINQ_FAMILLES_ETAPES_NOV9_PUBLIC_V7.csv', full5, list(base['rows'][0]) + overlay_fields)
    write_csv(output / 'P47_HUIT_FAMILLES_ETAPES_NOV9_PUBLIC_V7.csv', full8, list(rows8[0]) + overlay_fields)
    write_csv(output / 'P47_LOT20_ETAPES_NOV9_PUBLIC_V7.csv', facts['entries'], lot_headers)
    write_csv(output / 'P47_LOT20_MATRICE_ETAPES_NOV9_PUBLIC_V7.csv', matrix, list(matrix[0]))
    write_json(output / 'P47_NOV9_WORKBOOK_PRESERVATION_PUBLIC_V1.json', {'schema': 'cqc.p47.nov9.workbook-preservation/1',
               'status': 'PASS_BUILDER_CHECKS_INDEPENDENT_AUDIT_PENDING', 'previousWorkbook': pin(config['inputs']['base_book']['path']),
               'workbook': pin(book_path), 'old50SheetsExact': True, 'totalSheets': 53,
               'unchangedExistingV6LocalRecords': 109, 'totalExistingV6LocalRecords': 112,
               'modifiedStructureParts': sorted(META), 'addedParts': [part for _, part in SHEETS],
               'oldV6OriginalUnchanged': True, 'stylesTablesDrawingsValidationsFormulaPayloadsExact': True,
               'preservedRecords': preserved, 'openpyxlReadOnlyLoaded': True, 'sourceArtworkModified': False})
    write_json(output / 'P47_NOV9_INPUT_PROVENANCE_PUBLIC_V1.json', {'schema': 'cqc.p47.nov9.input-provenance/1',
               'publicPinsOnly': [{key: value for key, value in record.items() if key != 'path'} for record in inputs.records.values()],
               'builder': pin(__file__), 'zipHelper': pin(Path(__file__).with_name('workbook_zip.py')),
               'previousV3Builder': config.get('previous_v3_builder_pin'), 'qualification': 'Nouveau fork paramétré. Les anciens hardcodes et les instantanés historiques ne sont pas exécutés.'})
    require(before == {name: pin(spec['path']) for name, spec in config['inputs'].items()}, 'An input changed during export: recollect')
    for record in inputs.records.values():
        require(pin(record['path'])['sha256'] == record['sha256'], 'Input changed during export')
    private = {'schema': 'cqc.p47.nov9.export-execution-private/1', 'config': str(args.config.resolve()),
               'inputs': list(inputs.records.values()), 'publicExport': str(output), 'allInputsUnchanged': True}
    private_path = output.parent / (output.name + '--execution-private.json')
    require(not private_path.exists(), 'Private execution receipt exists')
    private_path.write_text(json.dumps(private, ensure_ascii=False, indent=2) + '\n')
    write_json(output / 'P47_NOV9_DELIVERY_MANIFEST_PUBLIC_V1.json', {'schema': 'cqc.p47.nov9.delivery-manifest/1',
               'status': 'PROVISIONAL_FROZEN_INPUTS_PENDING_INDEPENDENT_AUDIT', 'atUTC': facts['atUTC'],
               'files': [pin(path) for path in sorted(output.iterdir()) if path.is_file()], 'counts': facts['counts'],
               'previousV6Unchanged': True, 'independentAuditRequired': True, 'externalPublicationPerformed': False,
               'qualification': 'Instantané provisoire des preuves exactes avant la nouvelle QA. Actualiser par un nouveau dossier et de nouveaux reçus ; aucun résultat futur présumé.'})
    print(json.dumps({'output': str(output), 'workbook': pin(book_path), 'counts': facts['counts'], 'independentAuditPending': True}, ensure_ascii=False))


if __name__ == '__main__':
    main()
