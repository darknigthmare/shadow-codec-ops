"""Compile only new P43 Core mode metadata from exact reviewed native drawings.
The additional Core art review binds each explicit spec. Existing218 descriptors are untouched.
"""
from pathlib import Path
import os,json,hashlib,copy,sys,math,subprocess,io
from PIL import Image
B=Path('/workspace/cqc-p43-resume-20261025');I=B/'integration';sha=lambda b:hashlib.sha256(b).hexdigest();clone=copy.deepcopy
MANIFEST_SHA='6edcd1f735da0d0fd4d525c8dbead45a714f295fc64e1165d64585623ea0a574'
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb') as f:return f.read()
def pin(x):
 b=read(x['path']);assert sha(b)==x['sha256'] and len(b)==x['bytes'];return b
preservedMetadata={};preservedUsed=set()
def emit(p,data):
 raw=(json.dumps(data,separators=(',',':'))+'\n').encode() if p.name=='metadata-core-v1.json' else (json.dumps(data,indent=2)+'\n').encode()
 if p.name=='metadata-core-v1.json':
  review=data.get('option',{}).get('sprite',{}).get('review',{});large=data.get('uid')=='core__venom' and data.get('id')=='mgsv-raiden' and data.get('coreModeVariant',{}).get('schema')=='cqc.p43.core-mode-metadata/1' and review.get('status')=='approved' and str(review.get('reviewer','')).startswith('Root') and review.get('artAuditSHA256')=='a4b13cd2d96d66bf84080f0eb2eb4c3afc7d2323dff8bc63dd6a36186c361a79'
  assert len(raw)<=(8 if large else 4)*1024*1024,'Core alias exceeds its exact reviewed metadata bound'
 if p.name=='metadata-core-v1.json':
  logical='assets/combat-costumes-pass43/'+data['uid']+'/'+data['id']+'/metadata-core-v1.json';previous=preservedMetadata.get(logical)
  if previous:
   assert previous['bytes']==len(raw) and previous['sha256']==sha(raw) and pin(previous)==raw,'Preserved partial Core metadata differs from fresh exact regeneration';preservedUsed.add(logical);return {k:previous[k] for k in ['path','bytes','sha256']}
 p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw);return {'path':str(p),'bytes':len(raw),'sha256':sha(raw)}
def inside(frame,xy):
 x,y,w,h=frame['rect'];px,py=xy;assert x<=px<=x+w and y<=py<=y+h
 poly=frame.get('clipPolygon');assert poly and len(poly)>=3
 # Native clips use unit coordinates; boundary sockets must lie within the owned contour.
 qx=(px-x)/w;qy=(py-y)/h;flag=False
 for a,b in zip(poly,poly[1:]+poly[:1]):
  ax,ay=a;bx,by=b
  cross=(qx-ax)*(by-ay)-(qy-ay)*(bx-ax)
  if abs(cross)<1e-10 and min(ax,bx)-1e-10<=qx<=max(ax,bx)+1e-10 and min(ay,by)-1e-10<=qy<=max(ay,by)+1e-10:return True
  if (ay>qy)!=(by>qy) and qx<(bx-ax)*(qy-ay)/(by-ay)+ax:flag=not flag
 return flag
cfg=json.loads(read(sys.argv[1]));assert cfg['schema']=='cqc.p43.core-mode-variants-compile/1';stage=Path(cfg['stage']);out=Path(cfg['output']);assert stage.is_relative_to(I) and out.is_relative_to(I) and not out.exists();assert cfg.get('archiveCommit') is None or len(cfg['archiveCommit'])==40 and all(c in 'abcdef0123456789' for c in cfg['archiveCommit'])
for oldRecord in cfg.get('preservedMetadata',[]):
 assert oldRecord['logicalPath'].endswith('/metadata-core-v1.json') and oldRecord['logicalPath'] not in preservedMetadata;pin(oldRecord);preservedMetadata[oldRecord['logicalPath']]=oldRecord
manifest=json.loads(read('/workspace/cqc-p43-resume-20261025/sources-recovery/restored-p43/excel/P43_MANIFEST_30_CANONICAL_FIXED_V1.json'));assert sha(read('/workspace/cqc-p43-resume-20261025/sources-recovery/restored-p43/excel/P43_MANIFEST_30_CANONICAL_FIXED_V1.json'))==MANIFEST_SHA;fixed={(e['uid'],e['id']) for e in manifest['entries']}
archive=json.loads(pin(cfg['archive']));assert Path(cfg['archive']['path'])==stage/'ARCHIVE_FILES.json'
pngRecords={r['logicalPath']:r for r in archive['files'] if r['logicalPath'].endswith('.png')}
def body_opaque(frame,xy):
 record=pngRecords[frame['file']];raw=pin(record);assert sha(raw)==frame['sha256']
 with Image.open(io.BytesIO(raw)) as image:
  rgba=image.convert('RGBA');x,y=xy;assert 0<=x<rgba.width and 0<=y<rgba.height
  return rgba.getpixel((math.floor(x),math.floor(y)))[3]>16
metadata={};bindings=[]
for r in archive['files']:
 if not r['logicalPath'].endswith('/metadata-v2.json'):continue
 d=json.loads(pin(r));key=(d['uid'],d['id']);assert key in fixed and key not in metadata;metadata[key]=(r,d)
assert metadata
out.mkdir();variants=[];files=[];coremaps={};reviews=[]
for proposal in cfg['variants']:
 specRaw=pin(proposal['spec']);spec=json.loads(specRaw);reviewRaw=pin(proposal['review']);review=json.loads(reviewRaw)
 assert spec['schema']=='cqc.p43.core-mode-variant-spec/1';assert review['schema']=='cqc.p43.root-core-mode-art-review/1' and review['status']=='approved' and review['reviewer'].startswith('Root') and review['reviewedAt'] and review['inputSHA256']==sha(specRaw)
 for k in ['identity','equipment','sourceFrameSelection','sourceWeaponPoints','sameSourcePixels']:assert review['checks'].get(k) is True,k
 key=(spec['uid'],spec['id']);assert key in metadata and key not in coremaps;baseRecord,baseData=metadata[key];assert spec['baseMetadataSHA256']==baseRecord['sha256'] and spec['baseArtAuditSHA256']==baseData['artAuditSHA256'];d=clone(baseData);sprite=d['option']['sprite'];assert sprite['review']['status']=='approved' and sprite['review']['reviewer'].startswith('Root') and sprite['mirror'] is False
 kind=spec['kind'];assert kind in ['pw-mk22-and-reload','mantis-palm-debris','venom-bionic-contact','raiden-mgs2-gun-reload']
 roleFrames={}
 for side,groups in [('right',sprite['actions']),('left',sprite['oppositeActions'])]:
  allFrames=[f for g in groups.values() for f in g['frames']]
  for role in range(16):
   a=[f for f in allFrames if f['physicalPoseIndex']==role];assert a and all(x==a[0] for x in a);roleFrames[(side,role)]=a[0]
 if kind=='pw-mk22-and-reload':
  assert key[0]=='core__snake_pw' and key[1] in ['pw-battle-dress-helmet','pw-jungle-fatigues-pink','pw-ut-n425g-white']
  assert spec['coreShootRole']==10 and spec['coreReloadRole']==9
  assert spec['coreDormantM16Role']==11 and spec['coreDormantM16Action']=='optic'
  assert spec['coreDormantM16ReloadRole']==12 and spec['coreDormantM16ReloadAction']=='parry' and spec['coreUnarmedUtilityRole']==1 and spec['coreNonlethalCommandGrabRole']==8
  for side,name in [('right','actions'),('left','oppositeActions')]:
   for action,oldrole,newrole in [('shoot',11,10),('reload',12,9)]:
    group=sprite[name][action];assert any(f['physicalPoseIndex']==oldrole for f in group['frames']);group['frames']=[clone(roleFrames[(side,newrole)]) if f['physicalPoseIndex']==oldrole else f for f in group['frames']]
  # Keep all16 physical sources accessible: dormant M16 table has no Core move mapping.
  assert not({'optic','parry'} & set(sprite['actionMap'].values())),'PW Core dormant source group unexpectedly selectable'
  for side,name in [('right','actions'),('left','oppositeActions')]:
   sprite[name]['optic']={'fps':0,'loop':False,'frames':[clone(roleFrames[(side,11)])]}
   sprite[name]['parry']={'fps':0,'loop':False,'frames':[clone(roleFrames[(side,12)])]}
   sprite[name]['recover']={'fps':0,'loop':False,'frames':[clone(roleFrames[(side,1)])]}
  sprite['phaseMap']['optic']={'startup':[0],'active':[0],'recovery':[0]}
  sprite['phaseMap']['parry']={'startup':[0],'active':[0],'recovery':[0]}
  sprite['phaseMap']['recover']={'startup':[0],'active':[0],'recovery':[0]}
  for anchor in sprite['pass40Attachments']:
   if anchor['slot']=='special' and anchor['tag']=='ballistic':anchor['action']='optic'
  additions=[]
  assert len(spec['coreAnchors'])==2
  for a in spec['coreAnchors']:
   side=a['side'];assert side in ['right','left'] and a['roleIndex']==10 and a['slot']=='special' and a['tag']=='tranq' and a['socket']=='mk22-suppressor-muzzle';frame=roleFrames[(side,10)];xy=a['nativeXY'];rear=a['rearNativeXY'];assert len(xy)==len(rear)==2 and all(math.isfinite(x) for x in xy+rear) and inside(frame,xy) and inside(frame,rear) and body_opaque(frame,xy) and body_opaque(frame,rear)
   assert (xy[0]-rear[0])*(1 if side=='right' else -1)>0 and abs(math.degrees(math.atan2(xy[1]-rear[1],abs(xy[0]-rear[0]))))<=12
   additions.append({'side':side,'slot':'special','tag':'tranq','action':'shoot','file':frame['file'],'sourceSHA256':frame['sha256'],'rect':frame['rect'],'pivot':frame['pivot'],'nativeXY':xy,'rearNativeXY':rear,'socket':a['socket']})
  assert {a['side'] for a in additions}=={'right','left'};sprite['pass40Attachments']=[a for a in sprite['pass40Attachments'] if not(a['slot']=='special' and a['tag']=='tranq')]+additions
 elif kind=='mantis-palm-debris':
  assert key==('core__mantis','mgs1-unmasked') and spec['coreSlots']==['special','super'] and spec['sourceTag']=='psychic' and spec['coreTag']=='debris'
  assert spec['coreThrowRole']==8; sprite['actionMap']['throw']='throw'
  for side,name in [('right','actions'),('left','oppositeActions')]:
   sprite[name]['throw']={'fps':9,'loop':False,'frames':[clone(roleFrames[(side,1)]),clone(roleFrames[(side,8)]),clone(roleFrames[(side,1)])]}
  sprite['phaseMap']['throw']={'startup':[0],'active':[1],'recovery':[2]}
  additions=[]
  for side in ['right','left']:
   for slot in spec['coreSlots']:
    a=[a for a in sprite['pass40Attachments'] if (a['side'],a['slot'],a['tag'])==(side,slot,'psychic')];assert len(a)==1 and a[0]['action']=='shoot';a=clone(a[0]);assert 'palm' in a['socket'].lower() or 'hand' in a['socket'].lower();assert body_opaque({'file':a['file'],'sha256':a['sourceSHA256']},a['nativeXY']);a['tag']='debris';additions.append(a)
  sprite['pass40Attachments']+=additions
 elif kind=='raiden-mgs2-gun-reload':
  assert key==('core__raiden_mgs2','mgs2-sunglasses-bonus') and spec['coreReloadRole']==12 and spec['coreRecoverRole']==1
  assert sprite['actionMap']['utility']=='recover' and any(f['physicalPoseIndex']==12 for f in sprite['actions']['reload']['frames'])
  sprite['actionMap']['specialBack']='reload'
 else:
  assert key[0]=='core__venom' and spec['coreContactRole']==10
  assert review['checks'].get('leftBionicArmAttached') is True
  for side,name in [('right','actions'),('left','oppositeActions')]:
   neutral=roleFrames[(side,1)];contact=roleFrames[(side,10)]
   sprite[name]['charge']={'fps':9,'loop':False,'frames':[clone(neutral),clone(contact),clone(neutral)]}
  sprite['phaseMap']['charge']={'startup':[0],'active':[1],'recovery':[2]}
  sprite['actionMap']['special']='charge';sprite['actionMap']['specialDown']='charge'
 # Every physical role remains accessible, including mode-dormant weapon frames.
 for name in ['actions','oppositeActions']:
  assert {f['physicalPoseIndex'] for g in sprite[name].values() for f in g['frames']}==set(range(16)),'Core variant lost a physical native role'
 # Drawings, calibration, preview and all source bytes remain identical; only new mode metadata differs.
 for k in ['sourceFrameHeights','baseFrameHeight','nativeDirectionRegions','displayHeight','review']:assert sprite[k]==baseData['option']['sprite'][k]
 d['coreModeVariant']={'schema':'cqc.p43.core-mode-metadata/1','kind':kind,'baseVSMetadataSHA256':baseRecord['sha256'],'coreReviewSHA256':sha(reviewRaw),'sameSourcePNGBytes':True,'sourcePointBodyAlphaThreshold':16,'fixedManifestSHA256':MANIFEST_SHA}
 logical='assets/combat-costumes-pass43/'+key[0]+'/'+key[1]+'/metadata-core-v1.json';record=emit(out/logical,d);record['logicalPath']=logical;files.append(record);coremaps[key]=d
 url='https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/'+cfg['archiveCommit']+'/rootassets/'+logical if cfg.get('archiveCommit') else None
 variants.append({'uid':key[0],'id':key[1],'baseVSMetadataSHA256':baseRecord['sha256'],'baseArtAuditSHA256':baseData['artAuditSHA256'],'coreReviewSHA256':sha(reviewRaw),'metadata':{'path':logical,'bytes':record['bytes'],'sha256':record['sha256'],**({'url':url} if url else {})}});reviews.append({'key':':'.join(key),'spec':proposal['spec'],'review':proposal['review']})
assert preservedUsed==set(preservedMetadata),'Unused preserved metadata was supplied'
for key,(r,d) in metadata.items():
 selected=coremaps.get(key,d);s=selected['option']['sprite'];bindings.append({'uid':key[0],'id':key[1],'revision':s['pass40Revision'],'artAuditSHA256':s['review']['artAuditSHA256'],'anchors':s['pass40Attachments']})
templatePath=B/'runtime/compiler-p43-candidate-v1/native-origins.template.js';template=read(templatePath).decode();assert sha(read(templatePath))=='098a22bff2b49c112e8843eb252f011b366caa90fe46799e20d0dd86b0688b4e';assert template.count('/* REVIEWED_BINDINGS */null')==1
sdk=template.replace('/* REVIEWED_BINDINGS */null',json.dumps(bindings,separators=(',',':')))
module='''/* New P43 Core-only descriptors; original sources and prior218 descriptors remain exact. */
(function(root){'use strict';
 if(!/(^|\\/)modules\\/core-v032\\.html$/.test(root.location?.pathname||''))return;
 if(root.CQC_NATIVE_WARDROBE)throw Error('P43 Core variants must precede native wardrobe creation');
 const variants=VARIANTS;
 const previous=root.CQC_NATIVE_WARDROBE_INDEX;if(previous?.schema!=='cqc.native-wardrobe-index/1')throw Error('P43 Core variant base index absent');
 const replacements=new Map(variants.map(v=>[v.uid+':'+v.id,v]));
 for(const v of variants){const matches=previous.entries.filter(e=>e.uid===v.uid&&e.id===v.id);if(matches.length!==1||matches[0].metadata.sha256!==v.baseVSMetadataSHA256||matches[0].review.artAuditSHA256!==v.baseArtAuditSHA256)throw Error('P43 Core variant lost exact reviewed VS base');}
 root.CQC_NATIVE_WARDROBE_INDEX={...previous,entries:previous.entries.map(entry=>{const v=replacements.get(entry.uid+':'+entry.id);return v?{...entry,metadata:{...v.metadata,url:v.metadata.url||new URL(v.metadata.path,entry.assetBaseURL).href},coreModeVariant:{schema:'cqc.p43.core-mode-descriptor/1',baseVSMetadataSHA256:v.baseVSMetadataSHA256,coreReviewSHA256:v.coreReviewSHA256,sameNativeSourcePNGs:true}}:entry;})};
 root.CQC_PASS43_CORE_METADATA_VARIANTS={version:'pass43-core-metadata-variants/1',installed:variants.map(v=>({uid:v.uid,id:v.id,metadataSHA256:v.metadata.sha256,baseVSMetadataSHA256:v.baseVSMetadataSHA256}))};
SDK
})(globalThis);
'''.replace('VARIANTS',json.dumps(variants,separators=(',',':')),1).replace('\nSDK\n','\n'+sdk+'\n')
validationInput=out/'CORE_OPTIONS_VALIDATOR_INPUT_V1.json';validationInput.write_text(json.dumps([r['path'] for r in files]));validation=subprocess.run(['node','/workspace/cqc-p43-resume-20261025/runtime/mode-tools-candidate-v12/validate-core-native-options-v1.mjs',str(validationInput)],capture_output=True,text=True);assert validation.returncode==0,validation.stderr
p=out/'cqc-pass43-core-metadata-variants-v1.js';p.write_text(module);check=subprocess.run(['node','--check',str(p)],capture_output=True,text=True);assert check.returncode==0,check.stderr
moduleRecord={'path':str(p),'bytes':len(read(p)),'sha256':sha(read(p)),'logicalPath':'src/'+p.name};report={'schema':'cqc.p43.core-mode-variants-candidate/1','approved':False,'runtimeAdmitted':False,'productMutations':False,'sourceArchive':cfg['archive'],'variants':variants,'metadataFiles':files,'module':moduleRecord,'reviews':reviews,'preservedMetadataByteIdentical':len(preservedUsed),'preservationQualification':'Previously emitted7 files were never a completed pass alone; all are freshly regenerated and byte/SHA compared, then the final10actual validators run. Prior failure and paths preserved.','actualMetadataValidators':json.loads(validation.stdout),'sourcePointBodyAlphaThreshold':16,'qualification':'Body-point checks read pinned original PNGs without mutation, alpha>16; alpha>0 diagnostics are separate. Additional current Root art review required for mode-specific equipment/poses; old descriptors and original PNG bytes are not changed. New metadata aliases are not counted as additional costumes.'};reportRecord=emit(out/'CORE_MODE_VARIANTS_CANDIDATE_REPORT_V1.json',report);print(json.dumps(reportRecord))
