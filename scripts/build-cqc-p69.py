#!/usr/bin/env python3
"""Integrate the root-reviewed P69 PNGs, prompts and bible plans onto pinned P68.

Usage: python scripts/build-cqc-p69.py --baseline-dir /path/to/p68-baseline
Requires reviewed-batch.json and production-plans.json after visual review.
Preserves original PNG bytes and all previous registries and Atlas objects.
"""
from __future__ import annotations
import argparse
import copy
import hashlib
import json
from collections import Counter
from pathlib import Path
import subprocess

PARENT = '764ba74e7650b3f744899636cfabc2683c960bfe'
PASS = 'docs/cqc-reprise/pass69/'
BIBLE = 'docs/cqc-bible/'
ATLAS = 'public/cqc/data/cqc-p63-source-atlas.json'
RUNTIME = 'public/cqc/runtime-manifest.json'
BRANCH = 'codex/cqc-p61-missing-static-sources-20261125'
WEB = 'https://github.com/darknigthmare/shadow-codec-ops/blob/' + BRANCH + '/'
FALSE_FLAGS = ['runtimeIntegrated', 'combatReady', 'combatRuntimeIntegrated', 'absolute1to1Certified', 'referenceGeometryValidated', 'nativePixelExact', 'nativeUhd', 'scopeClosed']

def blob(raw):
    return hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()

def load(root, name):
    return json.loads((root / name).read_text())

def write(root, name, value):
    p = root / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def append(root, baseline, name, text):
    old = (baseline / BIBLE / name).read_text()
    assert '<!-- BEGIN:P69 -->' not in old
    write(root, BIBLE + name, old + '\n\n<!-- BEGIN:P69 -->\n' + text.strip() + '\n<!-- END:P69 -->\n')

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    ap.add_argument('--baseline-dir', type=Path, required=True)
    args = ap.parse_args()
    root, baseline = args.root.resolve(), args.baseline_dir.resolve()
    pin = load(root, PASS + 'baseline-pins.json')
    assert pin['parentCommit'] == PARENT
    pins = pin['files']
    for name, expected in pins.items():
        if (baseline / name).exists():
            assert blob((baseline / name).read_bytes()) == expected, 'Untrusted baseline: ' + name
        if name.startswith(BIBLE + 'asset-associations'):
            assert blob((root / name).read_bytes()) == expected, 'Historical registry changed: ' + name
    previous = load(baseline, BIBLE + 'asset-associations-p68.json')
    base_atlas = load(baseline, ATLAS)
    assert len(base_atlas['assets']) == 82
    review = load(root, PASS + 'reviewed-batch.json')
    assert review['parentCommit'] == PARENT and review['reviewComplete'] is True and review['reviewer'] == '/root'
    plan = load(root, PASS + 'production-plans.json')
    plans = {x['id']: x for x in plan['assets']}
    reviewed = {x['id']: x for x in review['selected'] + review['archives']}
    refs = {x['path']: x for x in review['references']}
    handoffs = [load(root, PASS + 'research/' + domain + '/handoff.json') for domain in ['acid', 'survive', 'rising']]
    assets = copy.deepcopy([a for h in handoffs for a in h['assets']])
    archives = copy.deepcopy([a for h in handoffs for a in h.get('archives', [])])
    blocked = copy.deepcopy([a for h in handoffs for a in h.get('blockedRequests', h.get('refusals', []))])
    index = {a['id']: a for a in assets + archives}
    assert len(index) == len(assets) + len(archives) == len(reviewed)
    assets = [index[x['id']] for x in review['selected']]
    archives = [index[x['id']] for x in review['archives']]
    assert review['blockedIds'] == [x['id'] for x in blocked]
    for is_selected, rows in [(True, assets), (False, archives)]:
        for item in rows:
            raw = (root / item['path']).read_bytes()
            assert hashlib.sha256(raw).hexdigest() == item['sha256'] == reviewed[item['id']]['sha256']
            assert blob(raw) == item['gitBlobSha'] == reviewed[item['id']]['gitBlobSha'] and len(raw) == item['bytes']
            generation = item['generation']
            assert (root / generation['promptFile']).read_text().rstrip() == generation['exactPrompt'].rstrip()
            generation.setdefault('mode', 'reference_generation')
            item.update({flag: False for flag in FALSE_FLAGS})
            item.update(passId='P69', sourceGenerated=True, selected=is_selected, atlasIntegrated=is_selected, fidelityStatus='pending_external_review')
            item['pass'] = 'P69'
            item['assetId'] = ('asset:p69:' if is_selected else 'archive:p69:') + item['id']
            item.setdefault('selectedVersion', 'v1')
            assert item.get('edition') and item.get('bodyCoverage') and item.get('scope') and item.get('qaNotes')
            item['referenceMetadata'] = [refs[name] for name in item['referenceFiles']]
            item['reviewRecords'] = [PASS + 'reviewed-batch.json']
            if is_selected:
                item['guideSections'] = ['02', '03', '04', '16', '17', '18', '25', '26', '27', '29'] if item['kind'] in ['character', 'costume', 'machine'] else ['02', '04', '05', '15', '16', '17', '18', '22', '25', '26', '27', '29']
                item['runtimeBinding'] = {'status': 'atlas_only', 'moduleKey': 'atlas63', 'catalogPath': ATLAS, 'admittedByThisPass': False}
                item['bibleURL'] = WEB + BIBLE + 'CONTINUATION_P69.md#' + item['id']
                item['blobURL'] = WEB + item['path']
                item['manifest'] = PASS + 'delivery-manifest.json'
                item['bibleDocuments'] = [BIBLE + n for n in ['CONTINUATION_P69.md', 'ASSOCIATIONS.md', 'COMBAT.md', 'FICHES_ET_VALIDATION.md']]
                item['promptRecord'] = PASS + 'prompt-index.json#' + item['id']
                item['productionPlan'] = {k: v for k, v in plans[item['id']].items() if k != 'id'}
                item.setdefault('nextWork', 'Produire les vues et états manquants depuis des références qualifiées, puis valider les interactions CQC.')
    for item in blocked:
        item.setdefault('toolStatus', item.get('status'))
        item.update(status='blocked_by_image_tool', hasOutputFile=False, selected=False, atlasIntegrated=False, retried=False, attempts=1)
        item.update({flag: False for flag in FALSE_FLAGS})
        assert not any(k in item for k in ['path', 'bytes', 'sha256', 'gitBlobSha'])
    counts = dict(selectedSources=len(assets), archivedAttempts=len(archives), generatedPNGs=len(assets)+len(archives), generationRequests=len(assets)+len(archives)+len(blocked), blockedRequests=len(blocked), previousSelected=259, totalSelected=259+len(assets), previousArchivedAttempts=20, totalArchivedAttempts=20+len(archives), atlasSources=82+len(assets), editionCount=len({a['episodeKey'] for a in assets}), byEpisode=dict(Counter(a['episodeKey'] for a in assets)), byKind=dict(Counter(a['kind'] for a in assets)), byBodyCoverage=dict(Counter(a['bodyCoverage'] for a in assets)), allPassesByKind=dict(Counter(previous['counts']['allPassesByKind'])+Counter(a['kind'] for a in assets)), selectedBytes=sum(a['bytes'] for a in assets), archivedBytes=sum(a['bytes'] for a in archives), combatAdmissions=0, absolute1to1Certifications=0, newNarrativeImages=0, closedScopes=0)
    for h in handoffs:
        actual = h.get('generationCalls', h.get('generationRequests'))
        assert actual == len(h['assets'])+len(h.get('archives', []))+len(h.get('blockedRequests', h.get('refusals', []))), 'Unaccounted image request: ' + h.get('domain', '?')
    old_work = {w for name in previous['inherits']+[BIBLE+'asset-associations-p68.json'] for a in load(baseline,name)['assets'] for w in a.get('workIds',[])}
    new_work = {w for a in assets for w in a['workIds']}
    inventory = load(root, 'docs/cqc-reprise/pass61/inventory.json')['rows']
    historical_ids = {r['id'] for r in inventory}
    unresolved = {r['id'] for r in inventory if r['presenceClass'] == 'unresolved'}
    assert len(inventory) == 277 and len(unresolved) == 97 and len(unresolved-old_work) == 76
    remaining = len(unresolved-(old_work|new_work))
    first_candidates = sorted((new_work-old_work)&historical_ids)
    coverage = dict(schema='cqc.p69.coverage-delta.v1', parentCommit=PARENT, historicalRows=277, historicalUnresolvedStatuses=97, beforeRowsWithoutCandidate=76, afterRowsWithoutCandidate=remaining, beforeRowsWithCandidate=len(old_work&historical_ids), afterRowsWithCandidate=len((old_work|new_work)&historical_ids), firstCandidateRows=[{'id':w,'p69AssetIds':[a['assetId'] for a in assets if w in a['workIds']],'bodyCoverage':[a['bodyCoverage'] for a in assets if w in a['workIds']],'scopeClosed':False} for w in first_candidates], extensionScopes=sorted(new_work-historical_ids), interpretation='La présence d’un portrait est comptée comme candidat documentaire, sans validation de corps complet ni clôture du groupe. Les statuts P61 sont inchangés.')
    write(root, PASS+'coverage-delta.json', coverage)
    delivery = dict(schema='cqc.p69.delivery.v1', asOf=review['asOf'], parentCommit=PARENT, previousSelected=259, counts=counts, historicalRows=277, historicalUnmatchedRows=97, historicalRowsWithoutSelectedCandidate=remaining, historicalCountsMeaning=f'Les statuts P61 sont conservés. Après P69, {remaining} lignes historiques restent sans candidat sélectionné ; un portrait peut être un premier candidat documentaire sans fournir de corps complet. Aucun groupe fermé.', extensionScopes=sorted(new_work-historical_ids), historicalScopeUpdates=sorted(new_work&historical_ids), inherits=previous['inherits']+[BIBLE+'asset-associations-p68.json'], interpretation='Sources PNG fixes consultables dans l’Atlas, avec limites natives/concepts/portraits explicites. Les animations et interactions décrites sont du travail prévu ; aucune nouvelle admission au combat ou certification 1:1.', requirementsGuide=BIBLE+'guide-map.json', assets=assets, archives=archives, blockedRequests=blocked)
    write(root,PASS+'delivery-manifest.json',delivery)
    write(root,BIBLE+'asset-associations-p69.json',dict(delivery,schema='cqc.bible.asset-associations-p69.v1'))
    prompts = lambda rows: [dict(id=a['id'], selected=a['selected'], path=a['path'], **a['generation']) for a in rows]
    write(root,PASS+'prompt-index.json',dict(schema='cqc.p69.prompt-index.v1',generationRequests=counts['generationRequests'],generatedOutputs=counts['generatedPNGs'],selectedOutputs=len(assets),archiveOutputs=len(archives),blockedRequests=len(blocked),records=prompts(assets),archiveRecords=prompts(archives),blockedRecords=blocked,interpretation='Tous les appels et leurs résultats sont conservés. Chaque sortie est individuelle ; les refus ne sont pas relancés.'))
    catalogue=copy.deepcopy(base_atlas)
    catalogue.update(asOf=review['asOf'],sourcePass=base_atlas['sourcePass']+'+P69',description=f"{counts['atlasSources']} dossiers de sources fixes P63–P69 ; les 82 dossiers antérieurs sont conservés sans modification, dans leur ordre initial.")
    fields=['id','label','episodeKey','workIds','referenceURLs','scope','qaNotes','episode','edition','bodyCoverage','kind','width','height','bitDepth','colorType','bytes','sha256','pass','gitBlobSha','colorMode','sourceGenerated','selected','atlasIntegrated',*FALSE_FLAGS,'fidelityStatus','assetId','bibleURL','blobURL','alphaExtrema','transparentBackground','selectedVersion']
    for a in assets:
        row={k:copy.deepcopy(a[k]) for k in fields}
        row['path']='../'+a['path'][len('public/cqc/'):]
        row['generation']={k:a['generation'][k] for k in ['tool','mode']}
        row['generation']['promptId']=a['id']
        catalogue['assets'].append(row)
    assert catalogue['assets'][:82]==base_atlas['assets']
    write(root,ATLAS,catalogue)
    javascript="""import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';
const [root,baseline]=process.argv.slice(1);const {extendP63RuntimeManifest}=await import(pathToFileURL(path.join(root,'scripts/extend-cqc-p63-runtime.mjs')));
const base=JSON.parse(fs.readFileSync(path.join(baseline,'public/cqc/runtime-manifest.json'))),delivery=JSON.parse(fs.readFileSync(path.join(root,'docs/cqc-reprise/pass69/delivery-manifest.json')));
const proposed=await extendP63RuntimeManifest(base,path.join(root,'public/cqc'),['data/cqc-p63-source-atlas.json',...delivery.assets.map(a=>a.path.slice('public/cqc/'.length))]);
fs.writeFileSync(path.join(root,'public/cqc/runtime-manifest.json'),JSON.stringify(proposed,null,2)+'\\n');
console.log(JSON.stringify({files:proposed.files.length,references:proposed.references.length,totalBytes:proposed.totalBytes,byteDelta:proposed.totalBytes-base.totalBytes,omittedReferences:proposed.omittedReferences.length,externalRoutes:proposed.externalReferences.entries.length}));"""
    result=subprocess.run(['node','--input-type=module','-e',javascript,str(root),str(baseline)],capture_output=True,text=True,check=True)
    runtime=json.loads(result.stdout)
    write(root,PASS+'integration-delta.json',dict(schema='cqc.p69.integration-delta.v1',parentCommit=PARENT,previousAtlas=82,atlasSources=counts['atlasSources'],selected=len(assets),selectedBytes=counts['selectedBytes'],changedRuntimeOwners=['data/cqc-p63-source-atlas.json'],runtime=runtime,scanner='extendP63RuntimeManifest with real discoverReferences scanner',shellChanged=False,controllerChanged=False,combatAdmission=False))
    documents(root,baseline,assets,archives,blocked,counts,runtime,coverage)
    for name,expected in pins.items():
        if name.startswith(BIBLE+'asset-associations'):assert blob((root/name).read_bytes())==expected
    print(json.dumps({'counts':counts,'runtime':runtime},ensure_ascii=False,indent=2))

def documents(root,baseline,assets,archives,blocked,c,runtime,coverage):
    summary=f"**{len(assets)} nouvelles sources sélectionnées, {len(archives)} essais archivés et {len(blocked)} refus conservés.** Cumul : **{c['totalSelected']} sources sélectionnées**, **{c['atlasSources']} dossiers Atlas**, **{c['totalArchivedAttempts']} essais archivés**."
    links='[Galerie](../cqc-reprise/pass69/README.md) · [Associations](asset-associations-p69.json) · [Manifeste](../cqc-reprise/pass69/delivery-manifest.json) · [Manquants](../cqc-reprise/pass69/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass69/INTEGRATION_QA.md)'
    doc=['# Continuation P69 — AC!D 2, Survive et Revengeance','',summary,'',links,'','Chaque fiche précise la nature de sa référence, la partie visible et les réserves de reconstruction. Les 82 dossiers existants et les sept registres antérieurs sont conservés.','', '**Les états ci-dessous décrivent le travail futur. Une image fixe est livrée par sujet ; les cycles, effets et comportements ne sont pas implémentés par cette passe.**','']
    gallery=['# P69 — nouvelles sources et fichiers locaux','',summary,'','[Fiches et états à produire](../../cqc-bible/CONTINUATION_P69.md) · [Manifeste](delivery-manifest.json) · [Prompts exacts](prompt-index.json) · [Manquants](MANQUANTS.md) · [QA](INTEGRATION_QA.md)','','PNG individuels bruts, accompagnés des références réellement utilisées. Les références conceptuelles restent identifiées ; un portrait reste un portrait.','']
    for a in assets:
        p=a['productionPlan']
        doc+=['<a id="'+a['id']+'"></a>','','## '+a['label'],'',a['scope'],'','| Champ | Valeur |','|---|---|','| Identité | `'+a['assetId']+'` |','| Édition et couverture | '+a['edition']+' — `'+a['bodyCoverage']+'` |','| Fichier | ['+Path(a['path']).name+']('+a['blobURL']+') |',f"| Sortie | {a['width']} × {a['height']}, {a['colorMode']}, {a['bytes']:,} octets |",'| SHA-256 | `'+a['sha256']+'` |','| WorkIds | '+' ; '.join('`'+w+'`' for w in a['workIds'])+' |','| Guide | '+', '.join(a['guideSections'])+' — [exigences](guide-map.json) |','| État | Source Atlas ; fidélité et admission au combat à valider |','','### Références et limites','']
        doc+=['- [Référence '+str(i+1)+']('+u+')' for i,u in enumerate(a['referenceURLs'])]
        doc+=['','Copies utilisées : '+', '.join('['+Path(f).name+'](../cqc-reprise/'+f.split('docs/cqc-reprise/',1)[1]+')' for f in a['referenceFiles'])+'.','']
        doc+=['- '+q for q in a['qaNotes']]
        doc+=['','### États et interactions à produire','',p['role'],'','| État prévu | Travail et vérification |','|---|---|']
        doc+=['| '+s['name']+' | '+s['description']+' |' for s in p['states']]
        doc+=['','Interactions à valider :','']+['- '+s for s in p['interactions']]
        doc+=['','Éléments manquants : '+' ; '.join(p['separateAssetsNeeded'])+'.','',p['frameTimings']+' '+p['camera'],'']
        gallery+=['## '+a['label'],'','!['+a['label']+'](../../../'+a['path']+')','',f"**{a['width']} × {a['height']} · {a['colorMode']} · {a['bytes']:,} octets · `{a['bodyCoverage']}`**",'','[Référence, limites et états prévus](../../cqc-bible/CONTINUATION_P69.md#'+a['id']+').','']
    doc+=['## Historique et conservation','','Les refus sont conservés dans le [registre des prompts](../cqc-reprise/pass69/prompt-index.json), sans nouvelle tentative sur leur cible. Les [six journaux locaux complémentaires](../cqc-reprise/pass69/local-addendum/README.md) sont archivés octet pour octet. Les précédentes tentatives et limites restent accessibles.','',f"Les 277 lignes historiques et les 97 statuts P61 non résolus restent distincts du nombre de PNG. Après P69, {coverage['afterRowsWithoutCandidate']} lignes historiques restent sans candidat sélectionné. Un portrait peut apporter un premier candidat documentaire sans fournir un corps complet ; les groupes restent ouverts. [Calcul détaillé](../cqc-reprise/pass69/coverage-delta.json).",'']
    gallery+=['## Tentatives et fichiers locaux','',f"{c['generationRequests']} appels imagegen sont documentés : {c['generatedPNGs']} sorties PNG et {len(blocked)} refus. Tous les essais non sélectionnés figurent dans les archives de recherche.",'','Les [six journaux locaux antérieurs](local-addendum/README.md) complètent les sauvegardes déjà publiées. [Preuve de la base P68](p68-baseline-proof.json) · [Inventaire initial du dossier](initial-local-audit.json).','']
    write(root,BIBLE+'CONTINUATION_P69.md','\n'.join(doc))
    write(root,PASS+'README.md','\n'.join(gallery))
    table='| Source | Type / édition | Fiche |\n|---|---|---|\n'+'\n'.join('| '+a['label']+' | `'+a['kind']+'` / `'+a['episodeKey']+'` | [Fiche](CONTINUATION_P69.md#'+a['id']+') |' for a in assets)
    append(root,baseline,'README.md','## P69 — extension des sources\n\n'+summary+'\n\n'+links+'\n\n'+table)
    append(root,baseline,'ASSOCIATIONS.md','## P69 — associations individuelles\n\n'+summary+'\n\n'+table+'\n\nLes associations détaillées, prompts, références et limites sont dans [asset-associations-p69.json](asset-associations-p69.json). Les sept registres précédents restent identiques.')
    append(root,baseline,'COMBAT.md','## P69 — états proposés, aucune nouvelle admission\n\nLes [fiches P69](CONTINUATION_P69.md) décrivent les poses, ancrages, interactions, réactions et éléments séparés à produire. Chaque sujet dispose d’un PNG fixe. Il faut qualifier les vues natives, produire les cycles et valider collisions, interruptions et fin de manche avant activation en combat. Les références conceptuelles et portraits conservent leur portée documentaire.')
    append(root,baseline,'FICHES_ET_VALIDATION.md','## P69 — contrôle des nouvelles sources\n\n'+summary+'\n\nLe [rapport P69](../cqc-reprise/pass69/p69-local-verification.json) contrôle les PNG (CRC, décompression, dimensions, alpha, empreintes), les références, prompts et liens, la conservation des 82 fiches et du graphe runtime antérieur. Les détails du navigateur et de la publication sont explicités dans [INTEGRATION_QA](../cqc-reprise/pass69/INTEGRATION_QA.md).')
    append(root,baseline,'ARENES_ET_BOSS.md','## P69 — accessoires et interactions documentés\n\nLes [sources P69](CONTINUATION_P69.md) ajoutent des variantes et équipements individuels. Les accessoires de boss sont qualifiés séparément de leur porteur. Les poses des objets ne déterminent pas les points d’attache, portées, volumes ou phases d’une rencontre ; ces éléments restent à mesurer et produire. Aucun nouveau stage jouable n’est admis par cette passe.')
    scope=dict(schema='cqc.p69.scope-delta.v1',parentCommit=PARENT,historicalRows=277,historicalUnmatchedRows=97,rowsWithoutSelectedCandidateBefore=76,rowsWithoutSelectedCandidateAfter=coverage['afterRowsWithoutCandidate'],firstCandidateRows=coverage['firstCandidateRows'],selectedBefore=259,selectedAfter=c['totalSelected'],atlasBefore=82,atlasAfter=c['atlasSources'],closedScopes=0,byEpisode=c['byEpisode'],byKind=c['byKind'],newNativeAnimationClips=0,interpretation='Un nouveau PNG peut compléter une variante ou un accessoire ; un premier candidat documentaire ne ferme pas une ligne historique ou un groupe.')
    write(root,PASS+'scope-delta.json',scope)

if __name__=='__main__':
    main()
