#!/usr/bin/env python3
"""Append exactly three P54 sheets; preserve all 67 P52 sheet XML bytes."""
from pathlib import Path
import argparse
import copy
import csv
import datetime
import hashlib
import io
import json
import zipfile
import xml.etree.ElementTree as ET
from collect_p54_sources import BASE, ROOT, collect, digest, load, save

S = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
P = 'http://schemas.openxmlformats.org/package/2006/relationships'
C = 'http://schemas.openxmlformats.org/package/2006/content-types'


def column(number):
    result = ''
    while number:
        number, digit = divmod(number - 1, 26)
        result = chr(65 + digit) + result
    return result


def cell_text(value):
    if value is None:
        return ''
    if isinstance(value, (list, dict)):
        return json.dumps(value, ensure_ascii=False)
    return str(value)


def worksheet(rows):
    root = ET.Element('{' + S + '}worksheet')
    limit = f'A1:{column(max(map(len, rows)))}{len(rows)}'
    ET.SubElement(root, '{' + S + '}dimension', {'ref': limit})
    views = ET.SubElement(root, '{' + S + '}sheetViews')
    view = ET.SubElement(views, '{' + S + '}sheetView', {'workbookViewId': '0'})
    ET.SubElement(view, '{' + S + '}pane', {'ySplit': '1', 'topLeftCell': 'A2', 'activePane': 'bottomLeft', 'state': 'frozen'})
    data = ET.SubElement(root, '{' + S + '}sheetData')
    for number, values in enumerate(rows, 1):
        row = ET.SubElement(data, '{' + S + '}row', {'r': str(number)})
        for index, value in enumerate(values, 1):
            cell = ET.SubElement(row, '{' + S + '}c', {'r': f'{column(index)}{number}', 't': 'inlineStr'})
            text = ET.SubElement(ET.SubElement(cell, '{' + S + '}is'), '{' + S + '}t')
            text.text = cell_text(value)[:32767]
    ET.SubElement(root, '{' + S + '}autoFilter', {'ref': limit})
    return ET.tostring(root, encoding='utf-8', xml_declaration=True)


def rows_for(freeze, inventory):
    static = [['ID', 'UID', 'Personnage', 'Tenue', 'Nature', 'Famille', 'Incarnation / édition', 'État',
               'Source PNG', 'SHA256 PNG', 'Dimensions', 'Cadre XYWH', 'Appui X', 'Sol Y', 'État appui',
               'Corps XYWH', 'Références', 'Proposition / prompt', 'Nouvelle animation', 'Admission au jeu', 'Réserves']]
    for row in inventory['rows'] + inventory['heldRows']:
        static.append([row['id'], row['uid'], row['character'], row['label'], row['kind'], row['family'],
                       row['edition'], 'Version antérieure — écartée de la sélection' if row['status'] == 'held' else 'Dessin statique — revue à consulter',
                       row.get('immutableURL', row['path']), row['SHA256'], [row['width'], row['height']], row['sourceRect'], row['anchorX'], row['footY'],
                       row['anchorStatus'], row.get('bodyBounds'), row['referenceURLs'], row['proposalPath'],
                       'Non', 'Non — suivi des admissions séparé', row['notes']])
    integrations = [['ID', 'Domaine', 'Nom', 'Édition', 'État source', 'Sources / preuves', 'Nouveaux PNG',
                     'PNG réutilisés', 'Mode / parcours', 'État raccord', 'Test / preuve', 'Réserves']]
    for row in freeze.get('integrationRows', []):
        integrations.append([row.get(key, '') for key in ['id', 'domain', 'label', 'edition', 'sourceStatus', 'sources',
                                                         'newPNGs', 'reusedPNGs', 'modes', 'integrationStatus', 'verification', 'notes']])
    pending = [['ID', 'UID / rencontre', 'Catégorie', 'Nom', 'État', 'Preuve manquante / limite', 'Source du suivi', 'Action suivante']]
    for row in freeze.get('pendingRows', []):
        pending.append([row.get(key, '') for key in ['id', 'uid', 'domain', 'label', 'status', 'reason', 'evidence', 'nextAction']])
    pending.append(['P54-SCOPE', '', 'Portée du suivi', 'Sources et intégration sont distinctes', 'Information',
                    '43 PNG de Gander proviennent de P53 : zéro nouveau dessin. Les gardes demeurent distinctes des références manquantes. Une fiche ou un prompt ne clôt pas un manque.',
                    freeze.get('scopeQualification', ''), 'Conserver les sources et les incarnations séparées.'])
    return [('P54_sources', static), ('P54_lieux_machines_modes', integrations), ('P54_reste', pending)]


def build(base, target, sheets):
    original = base.read_bytes()
    before = zipfile.ZipFile(io.BytesIO(original))
    book = ET.fromstring(before.read('xl/workbook.xml'))
    rels = ET.fromstring(before.read('xl/_rels/workbook.xml.rels'))
    types = ET.fromstring(before.read('[Content_Types].xml'))
    old_sheets = book.find('{' + S + '}sheets')
    names = [sheet.attrib['name'] for sheet in old_sheets]
    assert len(names) == 67, 'Expected published 67-sheet P52 workbook'
    assert len(sheets) == 3 and not set(names).intersection(name for name, _ in sheets)
    maximum = max(int(sheet.attrib['sheetId']) for sheet in old_sheets)
    ids = {relationship.attrib['Id'] for relationship in rels}
    additions = {}
    for index, (name, rows) in enumerate(sheets, 1):
        sheet_id = maximum + index
        rel_id = f'rId{sheet_id}'
        while rel_id in ids:
            rel_id += 'P54'
        ids.add(rel_id)
        xml_path = f'xl/worksheets/sheet{sheet_id}.xml'
        assert xml_path not in before.namelist()
        ET.SubElement(old_sheets, '{' + S + '}sheet', {'name': name, 'sheetId': str(sheet_id), 'state': 'visible', '{' + R + '}id': rel_id})
        ET.SubElement(rels, '{' + P + '}Relationship', {'Type': R + '/worksheet', 'Target': '/' + xml_path, 'Id': rel_id})
        ET.SubElement(types, '{' + C + '}Override', {'PartName': '/' + xml_path, 'ContentType': 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'})
        additions[xml_path] = worksheet(rows)
    changed = {'xl/workbook.xml': ET.tostring(book, encoding='utf-8', xml_declaration=True),
               'xl/_rels/workbook.xml.rels': ET.tostring(rels, encoding='utf-8', xml_declaration=True),
               '[Content_Types].xml': ET.tostring(types, encoding='utf-8', xml_declaration=True)}
    temporary = target.with_suffix('.xlsx.tmp')
    with zipfile.ZipFile(temporary, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for entry in before.infolist():
            archive.writestr(copy.copy(entry), changed.get(entry.filename, before.read(entry.filename)))
        for name, raw in additions.items():
            archive.writestr(name, raw)
    kept = [entry.filename for entry in before.infolist() if entry.filename not in changed]
    with zipfile.ZipFile(temporary) as after:
        assert all(after.read(name) == before.read(name) for name in kept)
        assert len(ET.fromstring(after.read('xl/workbook.xml')).find('{' + S + '}sheets')) == 70
        assert after.testzip() is None
    import openpyxl
    workbook = openpyxl.load_workbook(io.BytesIO(temporary.read_bytes()), read_only=True, data_only=False)
    try:
        assert workbook.sheetnames[:67] == names
        assert workbook.sheetnames[67:] == [name for name, _ in sheets]
        assert all(workbook[name].max_row == len(rows) for name, rows in sheets)
    finally:
        workbook.close()
    temporary.replace(target)
    return {'sourceWorkbook': str(base), 'sourceWorkbookSHA256': hashlib.sha256(original).hexdigest(),
            'output': str(target), 'sha256': digest(target), 'bytes': target.stat().st_size,
            'oldSheets': 67, 'newSheets': 3, 'totalSheets': 70, 'oldSheetXMLAndUnchangedZIPMembersPreservedExact': True,
            'unchangedOriginalZIPMembers': len(kept), 'changedOriginalParts': list(changed)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--freeze', type=Path, required=True, help='Root-owned frozen tracking contract')
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--base', type=Path, default=BASE)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    freeze = load(args.freeze)
    assert freeze.get('state') == 'ROOT_APPROVED_FROZEN_COUNTS', 'Final workbook waits for explicit Root freeze'
    inventory = collect(args.root, args.base, freeze['approvedSourceSHA256'])
    for key, expected in freeze.get('expectedCounts', {}).items():
        assert inventory['counts'].get(key) == expected, f'Frozen count differs: {key}'
    sheets = rows_for(freeze, inventory)
    if args.dry_run:
        print(json.dumps({'dryRun': True, 'sourceCounts': inventory['counts'], 'sheets': [(name, len(rows) - 1) for name, rows in sheets]}))
        return
    out = args.root / 'reporting'
    out.mkdir(parents=True, exist_ok=True)
    target = out / 'CQC_SUIVI_P54_SOURCES_ET_RACCORDS_20261120_PUBLIC_V1.xlsx'
    report = build(args.base, target, sheets)
    for name, rows in sheets:
        with (out / (name.upper() + '_PUBLIC_V1.csv')).open('w', newline='', encoding='utf-8-sig') as stream:
            csv.writer(stream).writerows([[cell_text(value) for value in row] for row in rows])
    report.update(schema='cqc.p54.workbook-readback/1', atUTC=datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  frozenContractSHA256=digest(args.freeze), sourceCounts=inventory['counts'],
                  sheets=[{'name': name, 'rows': len(rows) - 1} for name, rows in sheets], newAnimations=0)
    save(out / 'P54_NORMALIZED_SOURCE_INVENTORY_PRIVATE_V1.json', inventory)
    save(out / 'P54_EXCEL_READBACK_PRIVATE_V1.json', report)
    print(json.dumps(report, ensure_ascii=False))


if __name__ == '__main__':
    main()
