#!/usr/bin/env node
/** Classeur de consultation construit avec @oai/artifact-tool. Aucun runtime du jeu modifié. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const auditRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputPath = process.argv[2] || '/tmp/cqc-workbook-input.json';
const outputPath = process.argv[3] || path.join(auditRoot, 'outputs', 'CQC_AUDIT_COMPLET_2026-10-23.xlsx');
const previewDir = process.argv[4] || '/tmp/cqc-workbook-previews';
let moduleName = process.env.CQC_ARTIFACT_MODULE || '@oai/artifact-tool';
if (!process.env.CQC_ARTIFACT_MODULE && process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) {
  const require = createRequire(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, '_audit_resolve.cjs'));
  moduleName = pathToFileURL(require.resolve('@oai/artifact-tool')).href;
}
const { Workbook, SpreadsheetFile } = await import(moduleName);
const payload = JSON.parse(await fs.readFile(inputPath, 'utf8'));
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.mkdir(previewDir, { recursive: true });
const wb = Workbook.create();
const summary = wb.worksheets.add('Synthèse');
const sheets = new Map(payload.tabs.map(t => [t.name, wb.worksheets.add(t.name)]));
const colors = { ink: '#24342D', header: '#243E33', rule: '#ABB8B0', warning: '#FFF0C2', muted: '#67736C' };

function col(n) {
  let result = '';
  for (let x = n + 1; x > 0; x = Math.floor((x - 1) / 26)) result = String.fromCharCode(65 + (x - 1) % 26) + result;
  return result;
}
function formatHeader(range) {
  range.format = { fill: colors.header, font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' },
    wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'center', rowHeight: 44,
    borders: { insideVertical: { color: '#FFFFFF', style: 'thin' } } };
}
function lines(text, width) {
  if (typeof text !== 'string' || !text) return 1;
  const chars = Math.max(8, Math.floor(width * 1.13));
  return text.split('\n').reduce((n, part) => n + Math.max(1, Math.ceil(part.length / chars)), 0);
}

const receipts = [];
for (const [index, t] of payload.tabs.entries()) {
  const sh = sheets.get(t.name);
  const lastRow = t.rows.length + 5;
  const lastCol = col(t.headers.length - 1);
  sh.showGridLines = false;
  sh.getRange(`A1:${lastCol}${lastRow}`).format = {
    font: { name: 'Arial', size: 10, color: colors.ink }, verticalAlignment: 'top', wrapText: true,
  };
  for (let c = 0; c < t.headers.length; c++) sh.getRange(`${col(c)}1:${col(c)}${lastRow}`).format.columnWidth = t.widths[c];
  sh.getRange('A1').format.rowHeight = 9;
  sh.getRange('A2').values = [[t.title]];
  sh.getRange(`A2:${lastCol}2`).format = { font: { name: 'Arial', size: 16, bold: true, color: colors.ink }, wrapText: false,
    rowHeight: 28, borders: { bottom: { color: colors.rule, style: 'thin' } } };
  sh.getRange('A3').values = [[t.subtitle]];
  sh.getRange(`A3:${lastCol}3`).format = { font: { name: 'Arial', size: 10, italic: true, color: colors.muted }, wrapText: false, rowHeight: 22 };
  sh.getRange('A4').values = [[`Détail : ${t.source} | Référence P41, 23/10/2026`]];
  sh.getRange(`A4:${lastCol}4`).format = { wrapText: false, rowHeight: 21, font: { name: 'Arial', size: 10, color: colors.muted } };
  sh.getRange(`A5:${lastCol}5`).values = [t.headers];
  sh.getRange(`A6:${lastCol}${lastRow}`).values = t.rows;
  const table = sh.tables.add(`A5:${lastCol}${lastRow}`, true, `CQC_Table_${index + 1}`);
  table.style = 'TableStyleLight8';
  table.showFilterButton = true;
  formatHeader(sh.getRange(`A5:${lastCol}5`));
  sh.freezePanes.freezeRows(5);
  sh.freezePanes.freezeColumns(2);
  for (const c of t.numeric) {
    sh.getRange(`${col(c)}6:${col(c)}${lastRow}`).format.numberFormat = '#,##0';
    sh.getRange(`${col(c)}6:${col(c)}${lastRow}`).format.horizontalAlignment = 'right';
  }
  // Hauteurs par longueur des descriptions ; les données techniques exhaustives restent dans les JSON.
  let groupStart = 6, groupHeight = null, maxLines = 0, oversized = 0;
  const heights = t.rows.map(row => {
    const n = Math.max(...row.map((v, c) => lines(v, t.widths[c])));
    maxLines = Math.max(maxLines, n);
    if (n > 26) oversized++;
    return Math.min(408, Math.max(31, n * 14 + 10));
  });
  for (let i = 0; i <= heights.length; i++) {
    const h = heights[i] ?? null;
    if (h !== groupHeight) {
      if (groupHeight !== null) sh.getRange(`A${groupStart}:${lastCol}${i + 5}`).format.rowHeight = groupHeight;
      groupStart = i + 6;
      groupHeight = h;
    }
  }
  for (let c = 0; c < t.headers.length; c++) {
    const header = t.headers[c].toLowerCase();
    const range = sh.getRange(`${col(c)}6:${col(c)}${lastRow}`);
    if (header.includes('priorité')) {
      range.conditionalFormats.add('cellIs', { operator: 'equal', formula: '"P1"', format: { fill: colors.warning, font: { bold: true } } });
      range.conditionalFormats.add('cellIs', { operator: 'equal', formula: '"OPTION"', format: { fill: '#EAEDEB', font: { italic: true } } });
    }
    if (header.includes('état') && !header.includes('groupe')) {
      for (const text of ['ABSENT', 'NON_REPERTORIE', 'A_COMPLETER', 'NON_LIVRE', 'PAS_DE_']) {
        range.conditionalFormats.add('containsText', { text, format: { fill: colors.warning } });
      }
    }
  }
  receipts.push({ sheet: t.name, rows: t.rows.length, columns: t.headers.length, maxEstimatedLines: maxLines, rowsOverHeightEstimate: oversized });
  console.log(JSON.stringify({ built: t.name, rows: t.rows.length }));
}

summary.showGridLines = false;
summary.tabColor = colors.header;
sheets.get('Priorités').tabColor = '#63755F';
summary.getRange('A1:D38').format = { font: { name: 'Arial', size: 10, color: colors.ink }, verticalAlignment: 'center', wrapText: true };
summary.getRange('A1:A38').format.columnWidth = 43;
summary.getRange('B1:B38').format.columnWidth = 16;
summary.getRange('C1:C38').format.columnWidth = 3;
summary.getRange('D1:D38').format.columnWidth = 95;
summary.getRange('A1').format.rowHeight = 9;
summary.getRange('A2').values = [['CQC — Audit complet de production']];
summary.getRange('A2:D2').format = { font: { name: 'Arial', size: 16, bold: true, color: colors.ink }, wrapText: false, rowHeight: 29,
  borders: { bottom: { color: colors.rule, style: 'thin' } } };
summary.getRange('A3').values = [['Référence P41 · 23 octobre 2026 · registres et code, cahier de fidélité 1:1']];
summary.getRange('A4').values = [[`Commit source : ${payload.source_commit}`]];
summary.getRange('A3:D4').format = { wrapText: false, rowHeight: 22, font: { name: 'Arial', size: 10, color: colors.muted } };
summary.getRange('A6:D6').values = [['Inventaire', 'Quantité', null, 'Interprétation']];
formatHeader(summary.getRange('A6:B6'));
formatHeader(summary.getRange('D6'));
const rangeOf = (sheet, column = 'A') => {
  const n = payload.tabs.find(t => t.name === sheet).rows.length;
  return `'${sheet}'!${column}6:${column}${n + 5}`;
};
const metric = (label, tab, meaning) => [label, `=COUNTA(${rangeOf(tab)})`, meaning, payload.tabs.find(t => t.name === tab).rows.length];
const metrics = [
  metric('Profils actifs', 'Roster', 'Incarnations, équipements, objets et machines compris ; pas 380 personnes uniques.'),
  metric('Alternatives de costumes', 'Costumes présents', 'Union UID + costume ; les accès entre identités ne sont pas tous des corps neufs.'),
  metric('Stages partagés', 'Stages', 'Définitions admises au registre ; Port Area dédié est traité séparément.'),
  metric('Rigs techniques', 'Rigs', 'Variantes et directions comprises ; pas un compte de boss uniques.'),
  metric('Dossiers Arsenal', 'Boss et rencontres', 'Rencontres et simulations ; règles actuelles et écarts de fidélité distingués.'),
  metric('Techniques décrites', 'Techniques', '10 fiches par profil ; anticipation, action, retour et réception spécifiés.'),
  metric('Storyboards de finishers', 'Finishers', '4 fiches par profil ; pas 1 520 chorégraphies déjà dessinées et certifiées.'),
  metric('Couples acteur / tenue', 'Variantes', '380 originaux + 217 alternatives ; chaque couple doit préserver accessoires et asymétries.'),
  ['Histoires existantes', `=COUNTIF(${rangeOf('Histoires', 'D')},"<>HISTOIRE_ABSENTE")`, '81 histoires avec six peintures déclarées ; 273 encore en composition.', 354],
  ['Profils sans histoire', `=COUNTIF(${rangeOf('Histoires', 'D')},"HISTOIRE_ABSENTE")`, '26 parcours à écrire et intégrer ; 156 scènes nouvelles à prévoir.', 26],
  ['Scènes peintes déclarées', `=SUM(${rangeOf('Histoires', 'H')})`, 'Déclaration du mapping existant ; inspection visuelle individuelle à effectuer.', 486],
  ['Scènes en composition', `=SUM(${rangeOf('Histoires', 'I')})`, '1 638 scènes à illustrer si chaque scène doit devenir une peinture complète.', 1638],
  metric('Tâches de roster', 'Roster à compléter', 'Absences, variantes, archétypes, PNJ et dossiers ; pas 87 nouveaux personnages.'),
  metric('Références de costumes', 'Références costumes', 'Présents, non ventilés, accessoires et lots ; pas 315 costumes tous absents.'),
  metric('Lots de stages complémentaires', 'Stages à compléter', 'Lieux, variantes d’édition et ensembles à référencer ou produire.'),
  metric('Lots de machines complémentaires', 'Machines à compléter', 'Rigs, dossiers, variantes, adaptations et concepts avec statuts distincts.'),
  metric('Créations CQC proposées', 'Créations CQC', '20 concepts avec design et changements d’animation ; originaux explicitement étiquetés.'),
  metric('Lots globaux de production', 'Priorités', 'Ordre global P1 à P4 ; les priorités des catalogues s’appliquent dans leur domaine.'),
];
for (let i = 0; i < metrics.length; i++) {
  const row = i + 7;
  summary.getRange(`A${row}:D${row}`).values = [[metrics[i][0], null, null, metrics[i][2]]];
  summary.getRange(`B${row}`).formulas = [[metrics[i][1]]];
  summary.getRange(`A${row}:D${row}`).format.rowHeight = 39;
  if (i % 2 === 1) {
    summary.getRange(`A${row}:B${row}`).format.fill = '#F1F4F1';
    summary.getRange(`D${row}`).format.fill = '#F1F4F1';
  }
}
summary.getRange(`B7:B${metrics.length + 6}`).format = { numberFormat: '#,##0', font: { name: 'Arial', size: 14, bold: true, color: colors.ink }, horizontalAlignment: 'right' };
summary.getRange('A26').values = [['Portée : les références et les travaux à livrer sont détaillés ; aucune certification visuelle de toutes les images n’est revendiquée.']];
summary.getRange('A27').values = [['Sonde locale : scripts réels, images remplacées, zéro exception de page ; ce n’est pas une recette de combat ou de performance.']];
summary.getRange('A26:D27').format = { wrapText: false, rowHeight: 22, font: { name: 'Arial', size: 10, italic: true, color: colors.muted } };
summary.getRange('A29:D29').values = [['Ordre global', 'Lots', null, 'Objectif de la vague']];
formatHeader(summary.getRange('A29:B29'));
formatHeader(summary.getRange('D29'));
summary.getRange('A30:D34').values = [
  ['P1 · cohérence et gestes', '01–14, 42', null, 'Réconcilier les compteurs, terminer les six attentes P41, préciser contacts, transitions et mécanique des grandes machines.'],
  ['P2 · parcours complets', '15–24, 34–37', null, 'Histoires et illustrations, introductions et conclusions de duel, arènes exactes, audio et recette sur appareils.'],
  ['P3 · couverture officielle', '25–30, 38–39', null, 'Vérifier puis compléter les personnages, variantes, tenues et lieux ; garder les éditions et bonus distincts.'],
  ['P4 · familles originales', '31–33', null, 'Développer les concepts CQC, Rétro et Gala, avec une silhouette et des mouvements propres à chaque profil.'],
  ['OPTION · hors cœur', '40–41', null, 'Décider séparément du combat réseau et des apparitions dans des jeux extérieurs.'],
];
summary.getRange('A30:D34').format.rowHeight = 43;
summary.getRange('A36').values = [['Lecture : filtres dans chaque onglet ; deux colonnes d’identité et les en-têtes restent visibles au défilement.']];
summary.getRange('A37').values = [[payload.audit_url + 'README.md']];
summary.getRange('A36:D37').format = { wrapText: false, rowHeight: 23, font: { name: 'Arial', size: 10, color: colors.muted } };

wb.recalculate();
const actual = summary.getRange(`B7:B${metrics.length + 6}`).values.map(r => r[0]);
const formulaChecks = metrics.map((m, i) => ({ label: m[0], expected: m[3], actual: actual[i], ok: actual[i] === m[3] }));
if (formulaChecks.some(r => !r.ok)) throw new Error(`Formula validation failed: ${JSON.stringify(formulaChecks)}`);
console.log((await wb.inspect({ kind: 'region', sheetId: 'Synthèse', range: 'A6:D12', maxChars: 2500, tableMaxCellChars: 100 })).ndjson);

// Un aperçu borné par onglet, plus la synthèse et quelques descriptions longues.
const previews = [{ name: 'Synthèse', range: 'A1:D37', slug: '00-synthese' },
  ...payload.tabs.map((t, i) => ({ name: t.name, range: `A1:${col(Math.min(5, t.headers.length - 1))}8`, slug: String(i + 1).padStart(2, '0') }))];
previews.push({ name: 'Techniques', range: 'N5:Q8', slug: '22-techniques-descriptions' });
previews.push({ name: 'Finishers', range: 'I5:M8', slug: '23-finishers-storyboards' });
previews.push({ name: 'Stages', range: 'H5:L7', slug: '24-stages-descriptions' });
for (const p of previews) {
  const png = await wb.render({ sheetName: p.name, range: p.range, format: 'png', scale: 1 });
  await fs.writeFile(path.join(previewDir, `${p.slug}.png`), new Uint8Array(await png.arrayBuffer()));
  console.log(JSON.stringify({ rendered: p.name, range: p.range, file: `${p.slug}.png` }));
}
const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(outputPath);
await fs.rm(`${outputPath}.inspect.ndjson`, { force: true });
await fs.writeFile(path.join(auditRoot, 'data', 'workbook_validation.json'), JSON.stringify({
  engine: '@oai/artifact-tool', sourceCommit: payload.source_commit, sheetCount: payload.tabs.length + 1,
  dataRows: payload.tabs.reduce((n, t) => n + t.rows.length, 0), formulaChecks, sheets: receipts,
  renderedPreviewCount: previews.length, visualReview: 'Aperçus générés ; revue visuelle finale documentée dans VERIFICATIONS.md.',
  output: path.relative(auditRoot, outputPath), scope: 'Classeur d’audit ; aucun rendu de sprite du jeu n’est certifié par ces aperçus.'
}, null, 2) + '\n');
console.log(JSON.stringify({ exported: outputPath, sheets: payload.tabs.length + 1, bytes: (await fs.stat(outputPath)).size }));
