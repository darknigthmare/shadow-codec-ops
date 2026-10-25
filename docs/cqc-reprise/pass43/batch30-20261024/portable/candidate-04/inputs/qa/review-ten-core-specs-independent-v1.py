"""Independent readable ten-spec/source-point check against the final pinned bundle."""
from pathlib import Path
import json,gzip,hashlib,os,sys,io,math,collections,datetime
import numpy as np
from PIL import Image
from scipy.ndimage import label
R=Path('/workspace/cqc-p43-resume-20261025')
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb')as f:return f.read()
def pin(p):
 b=read(p);return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
def checked(p):
 a=pin(p['path']);assert a['sha256']==p['sha256']and a['bytes']==p['bytes'];b=read(p['path']);return json.loads(b)if str(p['path']).endswith('.json')else b
def inside(p,xy):
 x,y,w,h=p['rect'];px=(xy[0]-x)/w;py=(xy[1]-y)/h;v=False;pp=p['clipPolygon']
 for a,b in zip(pp,pp[1:]+pp[:1]):
  if(a[1]>py)!=(b[1]>py)and px<(b[0]-a[0])*(py-a[1])/(b[1]-a[1])+a[0]:v=not v
 return v
bundlePath,compilePath,outputPath=sys.argv[1:];provided=json.loads(read(bundlePath));comp=json.loads(read(compilePath));bundle=None;mode=None
if provided['schema']=='cqc.p43.core-mode-variants-candidate/1':
 variants=provided;archive=checked(variants['sourceArchive']);routes={r['logicalPath']:r for r in archive['files']+variants['metadataFiles']};coreReportPin=pin(bundlePath)
else:
 bundle=provided;mode=checked(bundle['inputs']['modeReport']);variants=checked(mode['coreVariantsReport']);routes={r['logicalPath']:r for r in bundle['sources']};coreReportPin=mode['coreVariantsReport']
assert len(variants['variants'])==len(variants['reviews'])==10
jobs={}
for row in comp['jobs']:
 j=checked(row['input']);rev=checked(row['review']);assert rev['status']=='approved'and rev['reviewer'].startswith('Root')and rev['inputSHA256']==row['input']['sha256'];jobs[(j['uid'],j['id'])]={'job':j,'pin':row['input'],'review':row['review']}
cache={};rows=[];points=[]
def native_point(z,side,role,xy,kind):
 j=z['job'];m=j['roles'][side][role];a=next(a for a in j['assets']if a['key']==m['asset']);gpath=j['geometry']['path']
 if gpath not in cache:
  assert pin(gpath)==j['geometry'];g=json.loads(gzip.decompress(read(gpath)));assert pin(j['ownershipBook']['path'])==j['ownershipBook']and g['ownershipBookSHA256']==j['ownershipBook']['sha256'];cache[gpath]=g
 g=cache[gpath];s=next(s for s in g['sources']if s['path']==a['path']);p=next(p for p in s['poses']if p['name']==m['pose']);assert p['side']==side and p['semanticPoseIndex']==role and p['candidateUsage']=='mapped-semantic-role'
 if a['path']not in cache:
  raw=read(a['path']);assert len(raw)==a['bytes']and hashlib.sha256(raw).hexdigest()==a['sha256'];im=Image.open(io.BytesIO(raw));alpha=np.array(im.getchannel('A'));lab,_=label(alpha>16,np.ones((3,3),dtype=np.int8));cache[a['path']]=(alpha,lab)
 alpha,lab=cache[a['path']];x,y=map(math.floor,xy);assert alpha[y,x]>16 and int(lab[y,x])in p['componentIDs']and inside(p,xy)
 r={'uid':j['uid'],'id':j['id'],'side':side,'role':role,'kind':kind,'nativeXY':xy,'sourceSHA256':a['sha256'],'sourceOriginalPath':a['path'],'alpha':int(alpha[y,x]),'ownedComponentID':int(lab[y,x]),'ownedClip':True};points.append(r);return r
def all_active(sprite,side,action):
 groups=sprite['actions'if side=='right'else'oppositeActions'];g=groups[action];active=sprite['phaseMap'].get(action,{}).get('active',[0]);return {g['frames'][i]['physicalPoseIndex']for i in active}
for rp in variants['reviews']:
 spec=checked(rp['spec']);review=checked(rp['review']);assert review['status']=='approved'and review['reviewer'].startswith('Root')and review['inputSHA256']==rp['spec']['sha256'];assert all(v is not False for v in review['checks'].values());key=(spec['uid'],spec['id']);z=jobs[key];baseRoute=routes['assets/combat-costumes-pass43/'+key[0]+'/'+key[1]+'/metadata-v2.json'];coreRoute=routes['assets/combat-costumes-pass43/'+key[0]+'/'+key[1]+'/metadata-core-v1.json'];base=checked(baseRoute);core=checked(coreRoute);bs,cs=base['option']['sprite'],core['option']['sprite'];assert spec['baseMetadataSHA256']==baseRoute['sha256']and spec['baseArtAuditSHA256']==base['artAuditSHA256'];assert core['coreModeVariant']['baseVSMetadataSHA256']==baseRoute['sha256']and core['coreModeVariant']['coreReviewSHA256']==rp['review']['sha256'];assert spec['sameSourcePNGBytes']is True and spec['sourcePointBodyAlphaThreshold']==16
 for field in ['sourceFrameHeights','baseFrameHeight','nativeDirectionRegions','displayHeight','review']:assert cs[field]==bs[field]
 baseSHA={f['sha256']for name in ['actions','oppositeActions']for g in bs[name].values()for f in g['frames']};coreSHA={f['sha256']for name in ['actions','oppositeActions']for g in cs[name].values()for f in g['frames']};assert coreSHA==baseSHA
 before=len(points);kind=spec['kind'];description=''
 if kind=='pw-mk22-and-reload':
  assert spec['coreShootRole']==10 and spec['coreReloadRole']==9 and len(spec['coreAnchors'])==2;checked(spec['proposalEvidence'])
  for a in spec['coreAnchors']:
   assert a['roleIndex']==10 and a['slot']=='special'and a['tag']=='tranq';side=a['side'];native_point(z,side,10,a['nativeXY'],'Mk22-muzzle');native_point(z,side,10,a['rearNativeXY'],'Mk22-suppressor-rear');assert(a['nativeXY'][0]-a['rearNativeXY'][0])*(1 if side=='right'else-1)>0;assert all_active(cs,side,'shoot')=={10}and all_active(cs,side,'reload')=={9};assert all_active(bs,side,'shoot')=={11}and all_active(bs,side,'reload')=={12}
  description='PW1974 : Core spécial=Mk22tranq10/recharge9, VS et Soutien conservent M16tir11/recharge12. Les deux museaux/silencieux sont natifs et séparés par direction.'
 elif kind=='venom-bionic-contact':
  assert spec['coreContactRole']==10 and len(spec['contactPoints'])==2;checked(spec['proposalEvidence'])
  for a in spec['contactPoints']:
   assert a['roleIndex']==10;checked(a['sourcePNG']);assert a['geometryPin']==z['job']['geometry']and a['ownershipBookPin']==z['job']['ownershipBook'];side=a['side']
   for k in ['nativeXY','palmNativeXY','wristNativeXY']:
    pp=native_point(z,side,10,a[k],k);assert pp['sourceSHA256']==a['sourcePNG']['sha256']
   assert all_active(cs,side,'charge')=={10}
  assert cs['actionMap']['special']==cs['actionMap']['specialDown']=='charge';description='Venom1984 : bras GAUCHE attaché, contact/paume/poignet10 réels sur deux vues ; animationcharge1→10→1, portée corporelle bornée. Aucun projectile780, bras détaché ou effet électrique ajouté.'
 elif kind=='mantis-palm-debris':
  assert spec['coreSlots']==['special','super']and spec['sourceTag']=='psychic'and spec['coreTag']=='debris'and spec['coreThrowRole']==8
  for side in ['right','left']:
   a=next(a for a in z['job']['anchors']if a['side']==side and a['slot']=='special');assert a['roleIndex']==11;native_point(z,side,11,a['nativeXY'],'psychic-palm-to-Core-debris');assert all_active(cs,side,'shoot')=={11}and all_active(cs,side,'recover')=={1}and all_active(cs,side,'throw')=={8}
  assert cs['actionMap']['throw']=='throw'and bs['actionMap']['throw']=='shoot'
  description='MantisMGS1 : débris Core depuis la même paume psychique11, aucune arme à feu ; récupérationneutre1 pour téléportation. La vraie projection Core utilise mainsvides8, tandis que la correspondance Original VS/Soutien throw→shoot11 demeure intacte.'
 else:
  assert kind=='raiden-mgs2-gun-reload'and key==('core__raiden_mgs2','mgs2-sunglasses-bonus')and spec['coreReloadRole']==12 and spec['coreRecoverRole']==1
  for side in ['right','left']:
   a=next(a for a in z['job']['anchors']if a['side']==side and a['slot']=='special');assert a['roleIndex']==11;native_point(z,side,11,a['nativeXY'],'SOCOM-muzzle');native_point(z,side,11,a['rearNativeXY'],'SOCOM-rear');assert all_active(cs,side,'shoot')=={11}and all_active(cs,side,'reload')=={12}and all_active(cs,side,'recover')=={1}
  assert cs['actionMap']['specialBack']=='reload';description='RaidenMGS2humain : SOCOM11/recharge12 en modepistolet, transition1 et lameHF10 conservées. Aucun remplacement par RaidenMGR.'
 rows.append({'uid':key[0],'id':key[1],'kind':kind,'spec':rp['spec'],'rootSpecificReview':rp['review'],'sourceJob':z['pin'],'baseVSMetadata':baseRoute,'coreMetadata':coreRoute,'sourceRasterSHASetExact':True,'sourceHeightsDirectionRegionsDisplayReviewExact':True,'independentNativePointChecks':len(points)-before,'readableReview':description})
counts=dict(collections.Counter(r['kind']for r in rows));assert counts=={'raiden-mgs2-gun-reload':1,'venom-bionic-contact':5,'pw-mk22-and-reload':3,'mantis-palm-debris':1}
generated=None;branch=None
if mode:
 generated=next(r for r in mode['files']if r['logicalPath']=='src/cqc-pass43-core-native-origins-v1.js');graw=read(generated['path']);assert hashlib.sha256(graw).hexdigest()==generated['sha256'];branch=any(v in graw for v in [b"if(move?.pass43BionicContact&&root.CQC_PASS43_VENOM_NATIVE_CONTACT?.owns?.(actor))return 'charge';",b"if(move?.pass43BionicContact===true&&root.CQC_PASS43_VENOM_NATIVE_CONTACT?.owns?.(actor))return 'charge';"]);assert branch
out={'schema':'cqc.p43.ten-core-mode-specs-independent-source-review/1','status':'PASS_SOURCE_AND_SPEC_CONSISTENCY_ONLY','atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'bundle':pin(bundlePath)if bundle else None,'rootApprovedCompileConfig':pin(compilePath),'modeReport':bundle['inputs']['modeReport']if bundle else None,'coreVariantsReport':coreReportPin,'specCounts':counts,'specCount':len(rows),'independentNativeSourcePointsChecked':len(points),'rows':rows,'points':points,'generatedCoreAdapter':generated,'generatedVenomChargeBranchPresent':branch,'newCostumesCreatedByAliases':0,'sourcePNGJobGeometryOrProductMutations':0,'rootApprovalCreated':False,'actualBrowserGameplayPassClaimed':False,'limits':['This check pins exact source points and metadata equipment/pose adaptation. It does not replace the actual25CoreGUI run or claim an independent successful draw callback.','The five Captain costumes remain non-applicable to the actual95fighter Core roster.','When run from the concrete Core metadata report before final bundle generation, generated adapter/branch fields remain null; actual charge10 selection must still be observed in GUI. A raw template alone is not an executed-adapter certificate.']};op=Path(outputPath);assert op.is_relative_to(R)and not op.exists();op.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print(json.dumps(pin(op)));print(json.dumps({'specs':len(rows),'points':len(points),'kinds':counts}))
