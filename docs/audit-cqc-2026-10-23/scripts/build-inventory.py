"""Derive audit evidence from the captured live registries and pinned repository data."""
import argparse
import collections
import csv
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parents[1]
SOURCE = 'ba4e30a09e9e95727b75a665e7b6ab07d9941aea'
LINK = f'https://github.com/darknigthmare/shadow-codec-ops/blob/{SOURCE}/'

def write_json(name, value):
    (OUT / 'data' / name).write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')

def write_csv(name, rows):
    if not rows:
        return
    with (OUT/'data'/name).open('w', newline='', encoding='utf-8-sig') as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n')
        writer.writeheader();writer.writerows(rows)

def read_assignment(relative, marker):
    text=(ROOT/relative).read_text()
    tail=text.split(marker,1)[1].lstrip()
    return json.JSONDecoder().raw_decode(tail)[0]

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('capture',type=Path,help='Directory produced by capture-runtime.mjs')
    args=parser.parse_args()
    (OUT/'data').mkdir(parents=True,exist_ok=True)
    data=json.loads((args.capture/'runtime-detailed.json').read_text())
    routing=json.loads((args.capture/'sprite-routing.json').read_text())
    receipt=json.loads((args.capture/'capture-receipt.json').read_text())
    assert receipt['sourceCommit']==SOURCE, 'La capture ne correspond pas au commit de référence de cet audit'
    stories=read_assignment('public/cqc/src/chronicles-data-v056.js','window.CQC55_DATA=')
    manifest=json.loads((ROOT/'public/cqc/runtime-manifest.json').read_text())
    tree={line.split('\t',1)[1]:line.split()[2] for line in subprocess.check_output(['git','ls-tree','-r',SOURCE],cwd=ROOT,text=True).splitlines()}
    live={f['uid']:f for f in data['fighters']}
    assert len(live)==len(data['fighters']), 'Duplicate runtime UID'
    story_rows=[];scene_rows=[]
    for uid,fighter in live.items():
        story=stories['stories'].get(uid)
        if story:
            intro=story.get('intro',[]);outro=story.get('outro',[])
            signature=lambda c:(c.get('visual',{}).get('set'),c.get('visual',{}).get('tile'))
            shared=set(map(signature,intro))&set(map(signature,outro))
            full=sum(bool(c.get('visual',{}).get('fullScene')) for c in intro+outro)
            story_rows.append({'uid':uid,'personnage':fighter['name'],'opus':story['group'],'histoire':story['title'],'statut':'ILLUSTRATIONS_COMPLETES_DECLAREES' if full==6 else 'COMPOSITIONS_A_COMPLETER','intro_scenes':len(intro),'outro_scenes':len(outro),'scenes_peintes':full,'compositions':len(intro+outro)-full,'duels':len(story.get('route',[])),'cles_image_partagees_intro_outro':len(shared),'nature_recit':story.get('evidence',''),'action':'Revue de fidélité visuelle et du lore scène par scène.' if full==6 else 'Produire les illustrations de scène dédiées listées; conserver le texte et des clés distinctes entre ouverture et épilogue.','preuve':LINK+'public/cqc/src/chronicles-data-v056.js'})
            for phase,cards in [('intro',intro),('outro',outro)]:
                for index,card in enumerate(cards):
                    visual=card.get('visual',{})
                    scene_rows.append({'scene_id':f'{uid}:{phase}:{index}','uid':uid,'personnage':fighter['name'],'opus':story['group'],'phase':phase,'scene':index+1,'titre':card.get('title',''),'lieu':card.get('place',''),'camera':card.get('camera',''),'accessoire':card.get('prop',''),'cle_image':str(visual.get('set',''))+':'+str(visual.get('tile','')),'image_complete_declaree':bool(visual.get('fullScene')),'action':'Réviser le modèle, l’époque, la composition et les détails 1:1 sur capture source.' if visual.get('fullScene') else f"Dessiner une scène entière propre à {fighter['name']} : {card.get('place','')}, plan {card.get('camera','')}, accessoire {card.get('prop','')}, événement « {card.get('title','')} ». Les accessoires et silhouettes doivent correspondre à cette incarnation; conserver une composition distincte de l’autre phase.",'preuve':LINK+'public/cqc/src/chronicles-data-v056.js'})
        else:
            story_rows.append({'uid':uid,'personnage':fighter['name'],'opus':fighter['ep'],'histoire':'','statut':'HISTOIRE_ABSENTE','intro_scenes':0,'outro_scenes':0,'scenes_peintes':0,'compositions':0,'duels':0,'cles_image_partagees_intro_outro':0,'nature_recit':'A_ADAPTER_EXPLICITEMENT','action':'Écrire 3 scènes d’ouverture et 3 scènes de conclusion, parcours cohérent, adversaires, écrans avant/après duel, échec et reprise; voir 05_NARRATION_AUDIO_SYSTEMES.md.','preuve':LINK+'public/cqc/src/chronicles-data-v056.js'})

    counts={
        'profils_versus':len(live),'techniques':sum(len(f.get('combat',{}).get('moves',{})) for f in live.values()),
        'fiches_finishers':sum(len(p.get('finishers',[])) for p in data['finishers']['profiles'].values()),
        'stages_registre_versus':len(data['stages']),'aliases_stages':data['stageRegistry']['counts']['aliases'],
        'corps_sprite_standard':sum(bool(x['entryExists']) for x in routing),'profils_router_machine':sum(bool(x['machine']) for x in routing),
        'profils_sans_route_visuelle_identifiee':sum(not x['entryExists'] and not x['machine'] for x in routing),
        'rigs_machines':len(data['machineStatus']['machines']),'costumes_index_chargement_differe':len(data['wardrobeIndex']['entries']),
        'histoires':sum(r['statut']!='HISTOIRE_ABSENTE' for r in story_rows),'histoires_absentes_profils_actifs':sum(r['statut']=='HISTOIRE_ABSENTE' for r in story_rows),
        'scenes_narratives':len(scene_rows),'scenes_peintes_declarees':sum(r['image_complete_declaree'] for r in scene_rows),
        'scenes_compositions':sum(not r['image_complete_declaree'] for r in scene_rows),
        'histoires_six_images_completes_declarees':sum(r['scenes_peintes']==6 for r in story_rows),
        'histoires_avec_image_intro_outro_identique_dans_mapping':sum(r['cles_image_partagees_intro_outro']>0 for r in story_rows),
        'fichiers_manifeste':len(manifest['files']),'octets_manifeste':manifest['totalBytes'],
        'routes_externes_immuables':len(manifest.get('externalReferences',{}).get('entries',[])),
        'fichiers_audio_manifestes':sum(Path(f['path']).suffix.lower() in {'.mp3','.ogg','.wav','.m4a','.flac'} for f in manifest['files']),
    }
    missing=[f['path'] for f in manifest['files'] if 'public/cqc/'+f['path'] not in tree]
    anchors=['public/cqc/modules/unified-versus-v055.html','public/cqc/src/cqc-sprite-renderer.js','public/cqc/src/cqc-pass19-costume-request-data.js','public/cqc/src/cqc-pass21-wardrobe-policy.js','public/cqc/src/cqc-pass41-native-batch-index-v1.js','public/cqc/src/chronicles-data-v056.js','public/cqc/runtime-manifest.json']
    evidence={'source_commit':SOURCE,'branche_source':'codex/cqc-p40-batch30-recovery','pr_source':'https://github.com/darknigthmare/shadow-codec-ops/pull/3','date':'2026-10-23','methodologie':receipt,'comptages':counts,'politique_costumes':data['wardrobePolicy'],'fichiers_declares_absents_arbre_git':missing,'perimetres_non_equivalents':{'profils':'UID jouables, incarnations/équipements compris; pas un décompte de personnes uniques.','rigs':'Définitions de squelettes, directions/variantes/accessoires compris; pas un décompte de boss.','techniques':'10 fiches par profil; pas 3800 animations dessinées différentes.','finishers':'Descriptions et timings, pas 1520 films individuels.','costumes':'Les descriptors différés ne comprennent pas toutes les options déjà enregistrées. Voir l’union dédupliquée de 02_ROSTER_COSTUMES.md.','illustrations':'fullScene est une déclaration/mapping; aucun examen de chaque PNG durant cette capture.'},'sources':[{'path':p,'url':LINK+p,'git_blob':tree[p],'sha256_texte_local':hashlib.sha256((ROOT/p).read_bytes()).hexdigest()} for p in anchors]}
    write_json('etat_mesure.json',evidence)
    write_json('narration_profils.json',story_rows)
    write_json('narration_scenes.json',scene_rows)
    write_csv('narration_profils.csv',story_rows)
    write_csv('narration_scenes.csv',scene_rows)
    write_json('politique_costumes_375.json',data['wardrobePlan'])
    write_json('capture_receipt.json',receipt)
    assert counts['profils_sans_route_visuelle_identifiee']==0
    assert not missing
    assert all(len(f.get('combat',{}).get('moves',{}))==10 for f in live.values())
    print(json.dumps(counts,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
