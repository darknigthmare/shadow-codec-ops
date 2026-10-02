#!/usr/bin/env python3
"""Source technical checks only; independent runtime/art review belongs to root."""
from pathlib import Path
import json,hashlib,sys,copy
import numpy as np
from scipy import ndimage
from PIL import Image

B=Path(__file__).resolve().parent
sys.path.insert(0,'/workspace/cqc-game-working/cqc-versus-v056/tools')
from prepare_combat_sprite import validate_entry
D=json.loads((B/'FINAL_DELIVERY.json').read_text())
checks=[]
def check(name,ok,details=None):
    checks.append({'name':name,'passed':bool(ok),'details':details})
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
sources=[];tables={};row_details=[]
for row in D['sourceFiles']:
    key=row['key'];p=Path(row['source']);raw=p.read_bytes();im=Image.open(p);a=np.asarray(im.getchannel('A'));doc=json.loads(Path(row['layout']).read_text());labels,n=ndimage.label(a>80)
    check(key+' native original unchanged',sha(p)==row['sha256']==sha(row['nativeOriginal']))
    check(key+' true native transparent RGBA1536x1024',im.mode=='RGBA' and im.size==(1536,1024) and int(a.min())==0 and float((a==0).mean())>.60)
    counts=np.bincount(labels.ravel());major=np.flatnonzero(counts[1:]>3000)+1
    check(key+' twelve separate complete major body components',len(major)==12)
    check(key+' declaration matches native twelve independent poses',row['poseCount']==12 and row['columns']==4 and row['rows']==3 and row['mirror'] is False and row['facing']==(1 if key.endswith('right') else -1))
    check(key+' geometry preserves source SHA',doc['unchanged_source_sha256']==sha(p) and len(doc['cells'])==12)
    foreign=[]
    for cell in doc['cells']:
        box=cell['bbox'];x,y,w,h=cell['frame']['rect'];comp=cell['component']
        check(key+f' pose{cell["index"]} body inside canvas',0<box[0]<box[2]<im.width and 0<box[1]<box[3]<im.height)
        check(key+f' pose{cell["index"]} complete body retained in rectangle',x<=box[0] and y<=box[1] and x+w>=box[2] and y+h>=box[3])
        check(key+f' pose{cell["index"]} crop no source export/flip',cell['frame']['sha256']==sha(p) and 'mirror' not in cell['frame'])
        if cell['foreign_body_opaque_pixels_in_rect']:
            check(key+f' pose{cell["index"]} close-row Canvas contour available',len(cell['frame'].get('clipPolygon',[]))>=3)
            foreign.append(cell['index'])
    check(key+' positive fixed observed source height',row['standingSourceHeight']>0)
    file='assets/combat-sprites/'+D['uid']+'/'+key+'-v1.png';sources.append({'file':file,'source':str(p)});tables[key]=doc['cells']
    row_details.append({'key':key,'sha256':sha(p),'nativeOriginal':row['nativeOriginal'],'zeroAlphaFraction':float((a==0).mean()),'majorBodyComponents':len(major),'foreignBodyFrames':foreign,'standingSourceHeight':row['standingSourceHeight']})
check('six native SHA values distinct',len({r['sha256'] for r in D['sourceFiles']})==6)
entry={'uid':D['uid'],'name':D['name'],'game':D['game'],'incarnation':D['incarnation'],'review':D['review'],'coverage':D['coverage'],'displayHeight':D['displayHeight'],'facing':1,'mirror':False,'actionMap':D['actionMap'],'phaseMap':D['phaseMap'],'actions':{},'oppositeActions':{},'sourceFrameHeights':{s['file']:r['standingSourceHeight'] for s,r in zip(sources,D['sourceFiles'])}}
for side,target in [('right','actions'),('left','oppositeActions')]:
    for name,spec in D['actionLayout'].items():
        entry[target][name]={'frames':[copy.deepcopy(tables[spec['sheet']+'-'+side][i]['frame']) for i in spec['indices']],'fps':spec['fps'],'loop':spec['loop']}
try:
    validate_entry(entry,sources,{D['uid']});check('unchanged generic importer validates source-only delivery',True)
except Exception as e:check('unchanged generic importer validates source-only delivery',False,str(e))
unique={(f['file'],tuple(f['rect'])) for target in ['actions','oppositeActions'] for group in entry[target].values() for f in group['frames']}
check('all72 unique source poses used exactly by action groups',len(unique)==72)
origins=json.loads((B/'SOURCE_COMBAT_ORIGINS.json').read_text())
for side,marks in origins['marks'].items():
    row=next(r for r in D['sourceFiles'] if r['key']=='c-'+side);im=Image.open(row['source']);a=np.asarray(im.getchannel('A'));labels,n=ndimage.label(a>80)
    for name,mark in marks.items():
        pt=mark['point'];cell=tables['c-'+side][mark['sourcePoseIndex']]
        check(side+' '+name+' native point unchanged visible RGBA',mark['sha256']==sha(row['source']) and mark['pointRGBA']==list(im.getpixel(tuple(pt))) and mark['pointRGBA'][3]>80)
        check(side+' '+name+' origin belongs to intended body component',int(labels[pt[1],pt[0]])==cell['component'])
        spec=D['actionLayout'][mark['action']]
        check(side+' '+name+' source active frame mapping agrees',spec['sheet']=='c' and spec['indices'][mark['frame']]==mark['sourcePoseIndex'])
for r in D['review']['sources']:check('reference unchanged '+Path(r['file']).name,sha(r['file'])==r['sha256'])
index=json.loads((B/'NATIVE_PNG_INDEX.json').read_text())
check('rejected original retained and never approved',index['nativeImages']==7 and index['rejectedNativeImages']==1 and next(r for r in index['attempts'] if r['key']=='A_RIGHT_01')['status']=='rejected-anatomical-optic-side-risk')
check('closest supported only no false1to1 certification',D['review']['fidelityStatus']=='closest_supported' and D['review']['absolute1to1Certified'] is False)
check('original source contract unchanged',sha(B/'references/source-contract.json')==sha('/workspace/cqc-pass7-reference-selection/core__old_snake/source-contract.json'))
check('selected reference images below15MB',sum(r['bytes'] for r in D['review']['sources'])<15000000)
failed=[x for x in checks if not x['passed']]
report={'schema':'cqc.pass7.producer-source-qa/1','uid':D['uid'],'status':'passed' if not failed else 'failed','checks':len(checks),'failures':len(failed),'results':checks,'sources':row_details,'poses':72,'bodyNativePNG':6,'retainedRejectedPNG':1,'imagePixelEdits':0,'runtimeTestsCertified':False,'absolute1to1Certified':False,'FINAL_DELIVERY_sha256':sha(B/'FINAL_DELIVERY.json'),'SOURCE_COMBAT_ORIGINS_sha256':sha(B/'SOURCE_COMBAT_ORIGINS.json'),'scope':'Source preservation/transparency/action coverage/native physical anchors only. Canonical art is producer closest-supported; root independently reviews rendered contours/facing/scale and gameplay.'}
(B/'PRODUCER_SOURCE_DELIVERY_QA.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['status','checks','failures','poses','bodyNativePNG','retainedRejectedPNG','FINAL_DELIVERY_sha256']}))
if failed:print(json.dumps(failed,indent=2));raise SystemExit(1)
