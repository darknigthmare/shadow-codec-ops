#!/usr/bin/env python3
"""Read-only contract and geometry checks; never import or certify artwork automatically."""
import copy, hashlib, importlib.util, json, math, os, sys
from pathlib import Path
from PIL import Image
import numpy as np
from scipy import ndimage

sys.dont_write_bytecode=True
BASE=Path(__file__).resolve().parent
R=Path('/workspace/cqc-game-working/cqc-versus-v056')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
checks=[]
def ck(name,condition,detail=None):
 checks.append({'name':name,'passed':bool(condition),'detail':detail})
 if not condition:raise AssertionError(name)
def exclusive_json(path,value):
 raw=(json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode()
 if path.exists():assert path.read_bytes()==raw
 else:
  with path.open('xb') as f:f.write(raw)

def main():
 d=json.loads((BASE/'FINAL_DELIVERY.json').read_text());uid=d['uid'];srows=d['sourceFiles'];coverage=json.loads((BASE/'ATTEMPT_STATUS.json').read_text())
 ck('Exact MG2 Jungle Evil UID and six independent sources',uid=='core__jungle_evil' and len(srows)==6 and d['mirror'] is False)
 ck('Complete36 positions per facing',sum(len(v['indices']) for v in d['actionLayout'].values())==36 and d['counts']['totalPoseCells']==72)
 ck('Qualified source fidelity, no absolute certification',d['review']['fidelityStatus']=='closest_supported' and d['review']['absolute1to1Certified'] is False)
 hashes=[];crop_shas=[];body_pivots=0;alpha_notes=[]
 for row in srows:
  key=row['key'];p=Path(row['source']);native=Path(row['nativeOriginal']);layout=json.loads(Path(d['layouts'][key]).read_text());im=Image.open(p)
  ck(key+' exact immutable native byte/hash',sha(p)==sha(native)==row['sha256'])
  ck(key+' hardlinked preservation inode',p.stat().st_ino==native.stat().st_ino and p.stat().st_dev==native.stat().st_dev)
  ck(key+' trueRGBA with zero-alpha space',im.mode=='RGBA' and im.size==(row['width'],row['height']) and im.getchannel('A').histogram()[0]>0)
  arr=np.array(im);labels,n=ndimage.label(arr[:,:,3]>80);counts=np.bincount(labels.ravel())
  ck(key+' exactly12 significant body components',int(np.sum(counts[1:]>=1000))==12 and len(layout['cells'])==12)
  ck(key+' no large detached effect or prop',not any(50<=v<1000 for v in counts[1:]))
  ck(key+' positive native upright scale',d['sourceGeometry'][key]['recommendStandingSourceHeight']>0)
  hashes.append(row['sha256']);alpha_notes.append({'key':key,'tinyDetachedOpaqueComponents':[int(v) for v in counts[1:] if v<50],'zeroAlphaPixels':im.getchannel('A').histogram()[0]})
  for c in layout['cells']:
   index=c['index'];x,y,w,h=c['frame']['rect'];xx0,yy0,xx1,yy1=c['bbox'];pivot=c['frame']['pivot']
   ck(key+' cell'+str(index)+' complete bounded crop',x>=0 and y>=0 and w>0 and h>0 and x+w<=im.width and y+h<=im.height and x<=xx0<xx1<=x+w and y<=yy0<yy1<=y+h)
   ck(key+' cell'+str(index)+' real native body-ground pivot',all(isinstance(v,(int,float)) and math.isfinite(v) and 0<=v<=1 for v in pivot) and abs(y+pivot[1]*h-yy1)<1e-6)
   body_pivots+=1;crop_shas.append(hashlib.sha256(im.crop((x,y,x+w,y+h)).tobytes()).hexdigest())
  if key.startswith('b-'):
   heights=[c['bbox'][3]-c['bbox'][1] for c in layout['cells']]
   ck(key+' native lowered and lyingKO, no standing alias',heights[10]<d['sourceGeometry'][key]['recommendStandingSourceHeight'] and heights[11]<0.5*d['sourceGeometry'][key]['recommendStandingSourceHeight'])
  if key.startswith('c-'):
   ck(key+' first-active longgun silhouette part of one body',layout['cells'][1]['pixels']>=1000)
   point=layout['cells'][4]['observedBodyPivotFullSheet'];sample=layout['cells'][4]['observedOpaqueHipAxisSample']
   ck(key+' physically grounded prone hip pivot',sample['rgba'][3]>230 and list(im.getpixel(tuple(sample['point'])))==sample['rgba'] and abs(d['sourceGeometry'][key]['measuredBodyGroundPivots']['4'][0]-point[0])<1e-6)
 ck('Six distinct PNGs',len(set(hashes))==6)
 ck('72 distinct native body crops',len(set(crop_shas))==72)
 for sheet in 'abc':
  left=Image.open(next(r['source'] for r in srows if r['key']==sheet+'-left'));right=Image.open(next(r['source'] for r in srows if r['key']==sheet+'-right'))
  ck(sheet+' left not an exact reflected right bitmap',left.size!=right.size or not np.array_equal(np.array(left),np.array(right)[:,::-1,:]))
 marks=json.loads(Path(d['sourceCombatOrigins']).read_text())
 for side in ['right','left']:
  m=marks['marks'][side]['shoot'];im=Image.open(m['source']);q=json.loads(Path(d['layouts']['c-'+side]).read_text());c=q['cells'][1];x,y,w,h=c['frame']['rect'];px,py=m['point']
  ck(side+' actual first-active barrel tip mark',m['frame']==1 and m['sourcePoseIndex']==1 and d['phaseMap']['shoot']['active'][0]==1 and im.getpixel((px,py))[3]>80 and list(im.getpixel((px,py)))==m['pointRGBA'] and x<=px<x+w and y<=py<y+h and sha(Path(m['source']))==m['sha256'])
  ck(side+' source geometry actual conventional barrel',m['semantic']=='generic-conventional-longgun' and im.getpixel((px,py))[3]>=230 and 0<px<im.width and 0<py<im.height)
 for r in d['review']['sources']:ck('Immutable reference '+Path(r['file']).name,sha(Path(r['file']))==r['sha256'] and r['viewed'] is True)
 for rec in coverage['requests']:
  ck(rec['attempt']+' request immutable SHA',sha(Path(rec['args']))==rec['argsSHA256'])
  if rec['executed']:
   ck(rec['attempt']+' original and response retained',Path(rec['nativeOriginal']).is_file() and sha(Path(rec['nativeOriginal']))==rec['nativeSha256'] and (BASE/'metadata'/(rec['attempt']+'.tool-response-summary.json')).is_file())
  else:ck(rec['attempt']+' unexecuted proposal not a missing PNG',rec['status']=='unexecuted-proposal-no-image' and 'nativeOriginal' not in rec)
 ck('All7 originals and1 reject retained',len(list((BASE/'native-attempts').glob('*.png')))==7 and coverage['rejectedNative']==1 and coverage['nativeOriginalsProduced']==7)
 ck('No blocked request falsely assigned image',coverage['blockedRequestsWithoutPng']==0)
 ck('11 superseded/unexecuted proposals retained',coverage['unexecutedArgumentProposals']==11)
 for sheet in 'ABC':
  for face in ['RIGHT','LEFT']:ck('Original proposal '+sheet+'_'+face+' retained',(BASE/'prompts'/(sheet+'_'+face+'_01.proposal-source.json')).is_file())
 spec=importlib.util.spec_from_file_location('read_only_prepare_combat_sprite_pass9',R/'tools/prepare_combat_sprite.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
 document=json.loads((BASE/'metadata/TECHNICAL_ENTRY_FOR_VALIDATION.json').read_text());fighters=json.loads((R/'data/chronicles-v056.json').read_text())['fighters'];physical=mod.validate_entry(document['entry'],document['sourceFiles'],{f['uid'] for f in fighters})
 ck('Existing importer pure validator accepts all action/phase/source contracts',len(physical)==6)
 review=json.loads((BASE/'PRODUCER_PHYSICAL_REVIEW.json').read_text());ck('Producer actual physical72-cell review',review['completePoseBodiesViewed']==72 and review['completeSelectedNativePngViewed']==6 and review['actualCanvasRuntimeViewedForThisUID'] is False)
 unique={}
 for p in BASE.rglob('*'):
  if p.is_file():st=p.stat();unique[(st.st_dev,st.st_ino)]=st.st_size
 task_bytes=sum(unique.values());ck('Complete task unique file bytes below initial25MiB',task_bytes<25*1024*1024,task_bytes)
 report={'schema':'cqc.pass9.jungle-evil.producer-verification/1','uid':uid,'status':'passed','assertions':len(checks),'checks':checks,'selectedNativePNG':6,'selectedPoseCells':72,'bodyGroundPivotsVerified':body_pivots,'nativeUniqueBytes':coverage['nativeUniqueInodeBytes'],'taskUniqueBytesAtVerification':task_bytes,'budgetBytes':45*1024*1024,'selectedNativeCropSHAs':crop_shas,'nativeAlphaNotes':alpha_notes,'sourceOriginalBytesUntouched':True,'importPerformed':False,'RSwritesPerformed':False,'scope':'Byte/inode/source/alpha/component/crop/fixed-scale/pivot/phase/muzzle-origin and pure importer validation. Producer physical art review is separately named; root Canvas/live gameplay/integration is still required.'}
 exclusive_json(BASE/'PRODUCER_VERIFICATION.json',report)
 manifest={'schema':'cqc.pass9.producer-files/1','uid':uid,'files':[{'path':str(p.relative_to(BASE)),'sha256':sha(p),'bytes':p.stat().st_size,'device':p.stat().st_dev,'inode':p.stat().st_ino} for p in sorted(BASE.rglob('*')) if p.is_file() and p.name!='FILE_SHA256_MANIFEST.json'],'nativeSourcesNotCopied':True,'RSwrites':0,'budgetBytes':45*1024*1024}
 exclusive_json(BASE/'FILE_SHA256_MANIFEST.json',manifest)
 print(json.dumps({'status':'passed','assertions':len(checks),'deliverySHA256':sha(BASE/'FINAL_DELIVERY.json'),'verificationSHA256':sha(BASE/'PRODUCER_VERIFICATION.json'),'manifestSHA256':sha(BASE/'FILE_SHA256_MANIFEST.json'),'taskUniqueBytes':task_bytes},indent=2))
if __name__=='__main__':main()
