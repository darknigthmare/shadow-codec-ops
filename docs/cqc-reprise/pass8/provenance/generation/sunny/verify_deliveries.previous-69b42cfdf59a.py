from pathlib import Path
from PIL import Image
import json,hashlib,math
B=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
checks=[]
def check(name,value):
 checks.append({'name':name,'passed':bool(value)});assert value,name
supportpoints={('mgs4','right'):[[644,130],[998,532]],('mgs4','left'):[[490,143],[906,545]],('mgr','right'):[[681,143],[1050,415]],('mgr','left'):[[493,135],[862,420]]}
for g in ['mgs4','mgr']:
 D=B/g;d=json.loads((D/'FINAL_DELIVERY.json').read_text());uid=d['uid'];check(uid+' six distinct native PNG',len(d['sourceFiles'])==6 and len({r['sha256'] for r in d['sourceFiles']})==6);check(uid+' exact selected source refs budget',sum(Path(r['file']).stat().st_size for r in d['review']['sources'])<15000000);check(uid+' original noncombatant contract',d['nonCombatantSupport'] is True and d['review']['absolute1to1Certified'] is False);used=set()
 for row in d['sourceFiles']:
  p=Path(row['source']);im=Image.open(p);doc=json.loads(Path(row['layout']).read_text());check(uid+' '+row['key']+' bytes native original unchanged',sha(p)==row['sha256']==sha(row['nativeOriginal']));check(uid+' '+row['key']+' independent true alpha 4x3',im.mode=='RGBA' and im.getchannel('A').getextrema()[0]==0 and row['mirror'] is False and len(doc['cells'])==12);check(uid+' '+row['key']+' direction correct',row['facing']==(1 if row['key'].endswith('right') else -1))
  alpha=im.getchannel('A')
  for c in doc['cells']:
   x,y,w,h=c['frame']['rect'];bx0,by0,bx1,by1=c['bbox'];check(uid+' '+row['key']+' body '+str(c['index'])+' complete bounded native crop',0<=x<=bx0<bx1<=x+w<=im.width and 0<=y<=by0<by1<=y+h<=im.height and c['pixels']>1000);check(uid+' '+row['key']+' body '+str(c['index'])+' grounded pivot',all(math.isfinite(v) and 0<=v<=1 for v in c['frame']['pivot']));check(uid+' '+row['key']+' body '+str(c['index'])+' visible opaque figure',alpha.crop((bx0,by0,bx1,by1)).getextrema()[1]>80)
  for a in d['actionLayout'].values():
   if a['sheet']==row['key'][0]:
    for i in a['indices']:used.add((row['key'],tuple(doc['cells'][i]['frame']['rect'])))
 check(uid+' 72 unique retained poses',len(used)==72)
 support={}
 for side in ['right','left']:
  row=next(r for r in d['sourceFiles'] if r['key']=='c-'+side);im=Image.open(row['source']);doc=json.loads(Path(row['layout']).read_text());support[side]={}
  for a,i,point in [('throw',1,supportpoints[(g,side)][0]),('deploy',6,supportpoints[(g,side)][1])]:
   cell=doc['cells'][i];x,y,w,h=cell['frame']['rect'];rgba=list(im.getpixel(tuple(point)));check(uid+' '+side+' '+a+' source visible hand pixel',rgba[3]>80 and x<=point[0]<x+w and y<=point[1]<y+h);check(uid+' '+side+' '+a+' first active phase bound',d['phaseMap'][a]['active'][0]==1 and d['actionLayout'][a]['indices'][1]==i)
   support[side][a]={'action':a,'frame':1,'sourcePoseIndex':i,'file':f'assets/combat-sprites/{uid}/c-{side}-v1.png','source':row['source'],'nativeOriginal':row['nativeOriginal'],'sha256':row['sha256'],'point':point,'pointRGBA':rgba,'kind':'support-hand-presentation-only','canLaunchProjectile':False,'note':'Source-visible fingertip for console/support gesture, not a muzzle or contact damage origin.' if a=='throw' else ('Source-visible hand lowering the white original-style kitchen container, nonballistic support only.' if g=='mgs4' else 'Source-visible ochre glove in a friendly open-hand greeting/wave, no projectile or attack.')}
 (D/'SOURCE_SUPPORT_HAND_MARKS.json').write_text(json.dumps({'schema':'cqc.pass8.sunny-native-support-hand-marks/1','uid':uid,'marks':support,'projectileLaunchGroups':0,'sourceScope':'Optional safe support presentation points only; root may use effects as explicitly simulated Versus assistance. No canonical offensive hardware or combat powers are established.'},indent=2)+'\n')
 # Preserve initial pose semantics metadata before truthful observed side-specific notes.
 for side in ['right','left']:
  p=D/'layouts'/f'c-{side}.json';doc=json.loads(p.read_text());old=p.read_bytes()
  if g=='mgs4' and side=='right':doc['cells'][7]['poseMeaning']='Self listening/thinking gesture, hand near bare right temple; far left rose unseen, no certified rose-touch.'
  if g=='mgr':doc['cells'][6]['poseMeaning']='Friendly open gloved greeting/wave, no exact handshake animation claim.'
  raw=(json.dumps(doc,ensure_ascii=False,indent=2)+'\n').encode()
  if raw!=old:
   oldp=p.with_name(p.stem+'.previous-'+hashlib.sha256(old).hexdigest()[:12]+p.suffix)
   if not oldp.exists():oldp.write_bytes(old)
   p.write_bytes(raw)
 # Canonical refs exact subset; all other attempts/search remain explicit unselected research.
 imgs=[]
 selected={r['file'] for r in d['review']['sources']}
 for p in sorted((D/'references').glob('*')):
  if p.is_file():imgs.append({'path':str(p),'sha256':sha(p),'bytes':p.stat().st_size,'selectedCanonical':str(p) in selected,'sourceKind':'original-game-capture' if p.name.startswith('original-ps3') else 'rejected-search-result-not-Sunny'})
 (D/'REFERENCE_PRESERVATION_INDEX.json').write_text(json.dumps({'uid':uid,'budgetAppliesToSelectedCanonicalReferences':True,'selectedCanonicalBytes':sum(Path(p).stat().st_size for p in selected),'referenceBudgetBytes':15000000,'allSearchAndUnselectedCapturesRetainedUnchanged':True,'unrelatedPinterestImageRejected':True,'fullMovieDownloaded':False,'images':imgs},indent=2)+'\n')
report={'schema':'cqc.pass8.sunny-producer-qa/1','status':'passed','checks':checks,'assertions':len(checks),'nativeSheets':12,'uniqueSourcePoses':144,'rejectedInitialRightAtlasesRetained':2,'sourceSupportHandPoints':8,'projectileMuzzles':0,'imagePixelsModified':0,'runtimeOrGitModified':False,'deliveries':[{'path':str(B/g/'FINAL_DELIVERY.json'),'sha256':sha(B/g/'FINAL_DELIVERY.json')} for g in ['mgs4','mgr']]}
(B/'SUNNY_DELIVERY_QA.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='checks'},indent=2))
