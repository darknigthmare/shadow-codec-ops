"""Five new Venom options only: reviewed attached LEFT prosthetic contact, no projectile upgrade."""
from pathlib import Path
import hashlib,json,sys,os,math,subprocess,io
from PIL import Image
B=Path('/workspace/cqc-p43-resume-20261025');I=B/'integration';A=Path('/workspace/cqc-pass21-application/public/cqc');sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb') as f:return f.read()
def pin(x):
 b=read(x['path']);assert len(b)==x['bytes'] and sha(b)==x['sha256'];return b
cfg=json.loads(read(sys.argv[1]));assert cfg['schema']=='cqc.p43.venom-native-contact-compile/1';out=Path(cfg['output']);assert out.is_relative_to(I) and not out.exists();archive=json.loads(pin(cfg['archive']));metadata={}
for r in archive['files']:
 if r['logicalPath'].endswith('/metadata-v2.json'):
  d=json.loads(pin(r));metadata[(d['uid'],d['id'])]=(r,d)
variantReport=json.loads(pin(cfg['coreVariantsReport']));assert variantReport['schema']=='cqc.p43.core-mode-variants-candidate/1';variantByKey={(v['uid'],v['id']):v for v in variantReport['variants']}
for r in variantReport['metadataFiles']:
 d=json.loads(pin(r));metadata[(d['uid'],d['id'])]=(r,d)
pngRecords={r['logicalPath']:r for r in archive['files'] if r['logicalPath'].endswith('.png')}
def owned_body_point(frame,xy):
 x,y,w,h=frame['rect'];px,py=xy;assert x<=px<=x+w and y<=py<=y+h;poly=frame.get('clipPolygon');assert poly and len(poly)>=3
 qx=(px-x)/w;qy=(py-y)/h;inside=False
 for a,b in zip(poly,poly[1:]+poly[:1]):
  ax,ay=a;bx,by=b;cross=(qx-ax)*(by-ay)-(qy-ay)*(bx-ax)
  if abs(cross)<1e-10 and min(ax,bx)-1e-10<=qx<=max(ax,bx)+1e-10 and min(ay,by)-1e-10<=qy<=max(ay,by)+1e-10:inside=True;break
  if (ay>qy)!=(by>qy) and qx<(bx-ax)*(qy-ay)/(by-ay)+ax:inside=not inside
 assert inside,'Contact point lies outside its owned native clip'
 record=pngRecords[frame['file']];raw=pin(record);assert sha(raw)==frame['sha256']
 with Image.open(io.BytesIO(raw)) as image:
  rgba=image.convert('RGBA');assert 0<=px<rgba.width and 0<=py<rgba.height
  assert rgba.getpixel((math.floor(px),math.floor(py)))[3]>16,'Contact point is not on source body alpha>16'
manifestRaw=read('/workspace/cqc-p43-resume-20261025/sources-recovery/restored-p43/excel/P43_MANIFEST_30_CANONICAL_FIXED_V1.json');assert sha(manifestRaw)=='6edcd1f735da0d0fd4d525c8dbead45a714f295fc64e1165d64585623ea0a574';fixed={(e['uid'],e['id']) for e in json.loads(manifestRaw)['entries'] if e['uid']=='core__venom'};assert len(fixed)==5
contracts=json.loads(read('/workspace/cqc-p43-resume-20261025/qa/actual-current-contracts-v1/P43_CORE_MOVES_STATIC_DERIVATION_CURRENT_V2.json'));assert sha(read('/workspace/cqc-p43-resume-20261025/qa/actual-current-contracts-v1/P43_CORE_MOVES_STATIC_DERIVATION_CURRENT_V2.json'))=='a76061f18d617ecec00eeaf1c5a7f22c855d8ebc9b6e92ed696f885f2519d02f';moves={s['moveName']:s['move'] for k,s in contracts['entries']['core__venom']['slots'].items() if k in ['special','specialDown']}
scope=[];inputs=[]
for proposed in cfg['contacts']:
 raw=pin(proposed['spec']);spec=json.loads(raw);reviewRaw=pin(proposed['review']);review=json.loads(reviewRaw);assert spec['schema']=='cqc.p43.core-mode-variant-spec/1' and spec['kind']=='venom-bionic-contact' and review['schema']=='cqc.p43.root-core-mode-art-review/1' and review['status']=='approved' and review['reviewer'].startswith('Root') and review['inputSHA256']==sha(raw)
 for k in ['identity','equipment','sourceFrameSelection','sourceWeaponPoints','sameSourcePixels','leftBionicArmAttached']:assert review['checks'].get(k) is True,k
 key=(spec['uid'],spec['id']);assert key in fixed and key in metadata;r,d=metadata[key];s=d['option']['sprite'];assert spec['baseMetadataSHA256']==variantByKey[key]['baseVSMetadataSHA256'] and spec['baseArtAuditSHA256']==s['review']['artAuditSHA256'];assert len(spec['contactPoints'])==2
 sources={}
 for a in spec['contactPoints']:
  side=a['side'];assert side in ['right','left'] and side not in sources and a['roleIndex']==10 and a['socket']=='left-bionic-palm-contact';groups=s['actions'] if side=='right' else s['oppositeActions'];frames=[f for f in groups['charge']['frames'] if f['physicalPoseIndex']==10];assert frames and all(f==frames[0] for f in frames);f=frames[0];x,y,w,h=f['rect'];xy=a['nativeXY'];assert len(xy)==2 and all(math.isfinite(n) for n in xy) and x<=xy[0]<=x+w and y<=xy[1]<=y+h
  # Contact spec additionally pins the forearm/wrist, proving an attached source arm was reviewed.
  palm=a['palmNativeXY'];assert len(palm)==2 and all(math.isfinite(n) for n in palm);owned_body_point(f,palm)
  wrist=a['wristNativeXY'];assert len(wrist)==2 and all(math.isfinite(n) for n in wrist) and x<=wrist[0]<=x+w and y<=wrist[1]<=y+h and math.dist(xy,wrist)>0;owned_body_point(f,xy);owned_body_point(f,wrist)
  sources[side]={'file':f['file'],'sha256':f['sha256'],'rect':f['rect'],'pivot':f['pivot'],'nativeXY':xy,'wristNativeXY':wrist,'palmNativeXY':palm,'socket':a['socket'],'physicalPoseIndex':10,'nativeHeight':s['sourceFrameHeights'][f['file']]}
 assert set(sources)=={'right','left'};scope.append([key[0]+':'+key[1],{'metadataSHA256':r['sha256'],'artAuditSHA256':s['review']['artAuditSHA256'],'sources':sources,'coreReviewSHA256':sha(reviewRaw)}]);inputs.append(proposed)
assert len(scope)==len(set(k for k,v in scope)) and len(scope)>0
module=r'''/* New P43 Venom costumes only. Authored close-contact balance; no Rocket/Stun Arm upgrade claim. */
(function(root){'use strict';
 const scope=new Map(SCOPE),baseMoves=BASE_MOVES,same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),finite=Number.isFinite;
 let requests=0,contacts=0,lastContact=null;
 function owned(actor){if(actor?.id!=='venom'||!actor.costume)return null;const key='core__venom:'+actor.costume,spec=scope.get(key);if(!spec)return null;const fighter={uid:'core__venom',costume:actor.costume},entry=root.CQC_COMBAT_SPRITES?.getEntry?.(fighter.uid,fighter),descriptor=root.CQC_NATIVE_WARDROBE_INDEX?.entries?.find(d=>d.uid===fighter.uid&&d.id===fighter.costume);if(!entry||descriptor?.metadata?.sha256!==spec.metadataSHA256||entry.review?.artAuditSHA256!==spec.artAuditSHA256||entry.review.status!=='approved'||!entry.review.reviewer?.startsWith('Root')||entry.mirror!==false||entry.fallbackMissingActions!==false)throw Error('P43 bionic contact lost its reviewed exact source');return{fighter,entry,spec};}
 function point(actor){const r=owned(actor);if(!r)return null;const side=actor.facing===-1?'left':'right',a=r.spec.sources[side],groups=side==='left'?r.entry.oppositeActions:r.entry.actions,frame=groups.charge.frames.find(f=>f.physicalPoseIndex===10);if(!frame||frame.file!==a.file||frame.sha256!==a.sha256||!same(frame.rect,a.rect)||!same(frame.pivot,a.pivot)||r.entry.sourceFrameHeights[a.file]!==a.nativeHeight)throw Error('P43 bionic contact source frame changed');const height=root.CQC_PASS19_WORLD_SCALE?.displayHeightFor?.('core__venom',actor.costume,'core',r.entry),scale=height/a.nativeHeight;if(!finite(scale)||scale<=0)throw Error('P43 bionic contact Core scale unavailable');const x=actor.x+(a.nativeXY[0]-a.rect[0]-a.pivot[0]*a.rect[2])*scale,y=actor.y+(a.rect[1]+a.pivot[1]*a.rect[3]-a.nativeXY[1])*scale,forward=(x-actor.x)*(actor.facing===-1?-1:1),radius=Math.min(22,Math.max(12,height*.08));if(!finite(x)||!finite(y)||forward<=0||forward>145)throw Error('Reviewed P43 prosthetic contact exceeds close-body physical extent');return{x,y,forward,radius,scale,sourceFile:a.file,sourceSHA256:a.sha256,sourceRect:[...a.rect],sourcePivot:[...a.pivot],sourceNativeXY:[...a.nativeXY],sourceWristNativeXY:[...a.wristNativeXY],sourcePalmNativeXY:[...a.palmNativeXY],sourceSocket:a.socket,physicalPoseIndex:10,sourceScaleAppliedOnce:true,coordinateSpace:'core-world-positive-up'};}
 function moveFor(actor,name,base){if(!scope.has('core__'+actor?.id+':'+actor?.costume)||!baseMoves[name])return null;if(!same(base,baseMoves[name]))throw Error('P43 contact override lost original exact Core move');const source=point(actor),move={...base,reach:Math.min(145,Math.max(1,source.forward+source.radius-15)),pass43BionicContact:true};delete move.projectile;delete move.electric;requests++;return move;}
 function hitbox(actor,move){if(!move?.pass43BionicContact||!owned(actor))return null;const source=point(actor);contacts++;lastContact={...source,frame:root.CQC?.match?.frame,uid:'core__venom',costume:actor.costume,move:actor.attack?.name};return{x:source.x-source.radius,y:source.y-source.radius,w:source.radius*2,h:source.radius*2};}
 function labelFor(actor,name){if(!scope.has('core__'+actor?.id+':'+actor?.costume))return null;return name==='rocketArm'?'Frappe du bras bionique':name==='bionicStun'?'Contact de neutralisation':name==='armCharge'?'Reprise de garde':null;}
 function bookActorFor(id,context,original){if(context)return scope.has('core__'+context.id+':'+context.costume)?context:null;if(id!=='venom')return null;const costume=root.CQC_COSTUMES_PASS17?.chosen?.(0,'core__venom');return scope.has('core__venom:'+costume)?{...original,costume,x:0,y:0,facing:1}:null;}
 root.CQC_PASS43_VENOM_NATIVE_CONTACT=Object.freeze({bookActorFor,owns:actor=>scope.has('core__'+actor?.id+':'+actor?.costume),moveFor,hitbox,point,labelFor,statusLabel:actor=>scope.has('core__'+actor?.id+':'+actor?.costume)?'BRAS BIONIQUE / CONTACT RAPPROCHÉ':null,diagnostics:()=>({schema:'cqc.p43.venom-native-contact/1',scope:[...scope.keys()],requests,contacts,lastContact:lastContact?{...lastContact}:null,originalProfilesPreservedOutsideScope:true,projectileUpgrade:false,flameOrElectricalEffect:false,qualification:'New costume-only gameplay correction: original startup/active/recovery, resource costs and damage retained, maximum range reduced from780 to an attached native knuckle contact volume; normal impact. Nonlethal vigilance is authored CQC balance.'})});
})(globalThis);
'''.replace('SCOPE',json.dumps(scope,separators=(',',':')),1).replace('BASE_MOVES',json.dumps(moves,separators=(',',':')),1)
out.mkdir();p=out/'cqc-pass43-venom-native-contact-v1.js';p.write_text(module);check=subprocess.run(['node','--check',str(p)],capture_output=True,text=True);assert check.returncode==0,check.stderr
htmlRaw=read(A/'modules/core-v032.html');assert sha(htmlRaw)=='a9c20d4a93e558d3f8262b7376115a9e35aaa9cc482f968a06d6d9ccef074aef';html=htmlRaw.decode()
def once(a,b):
 global html
 assert html.count(a)==1,a;html=html.replace(a,b)
once(' return base;\n}\nconst clamp'," return window.CQC_PASS43_VENOM_NATIVE_CONTACT?.moveFor?.(f,name,base)||base;\n}\nconst clamp")
once('function moveBookData(id){','function moveBookData(id,actorContext=null){')
once('const f=live||ROSTER[id];if(!f)return [];',"const f=window.CQC_PASS43_VENOM_NATIVE_CONTACT?.bookActorFor?.(id,actorContext,ROSTER[id])||live||ROSTER[id];if(!f)return [];")
once('const list=moveBookData(actor.id),rows=', 'const list=moveBookData(actor.id,actor),rows=')
once("  const bottom = f.y + (m.level === 'low' ? 5 : m.level === 'throw' ? 18 : f.y > 0 ? 12 : 66);","  const nativeContact=window.CQC_PASS43_VENOM_NATIVE_CONTACT?.hitbox?.(f,m);if(nativeContact)return nativeContact;\n  const bottom = f.y + (m.level === 'low' ? 5 : m.level === 'throw' ? 18 : f.y > 0 ? 12 : 66);")
assert html.count('label:MOVEBOOK_LABELS[name]||name')==3;html=html.replace('label:MOVEBOOK_LABELS[name]||name','label:window.CQC_PASS43_VENOM_NATIVE_CONTACT?.labelFor?.(f,name)||MOVEBOOK_LABELS[name]||name')
once("if(f.id==='venom')label(c,s.projectiles.some(p=>p.kind==='rocketArm'&&p.owner===f.slot)?'BRAS EN VOL / D ET SUPER INDISPONIBLES':'BRAS DISPONIBLE / D : NON LÉTAL'", "if(f.id==='venom')label(c,window.CQC_PASS43_VENOM_NATIVE_CONTACT?.statusLabel?.(f)||(s.projectiles.some(p=>p.kind==='rocketArm'&&p.owner===f.slot)?'BRAS EN VOL / D ET SUPER INDISPONIBLES':'BRAS DISPONIBLE / D : NON LÉTAL')")
needle='<script src="../src/cqc-pass42-core-native-origins-v1.js"></script>';once(needle,needle+'\n<script src="../src/cqc-pass43-venom-native-contact-v1.js"></script>')
hp=out/'core-v032.p43-venom-contact.candidate.html';hp.write_text(html)
report={'schema':'cqc.p43.venom-native-contact-candidate/1','approved':False,'runtimeAdmitted':False,'productMutations':False,'contacts':scope,'inputs':inputs,'module':{'path':str(p),'bytes':len(read(p)),'sha256':sha(read(p)),'logicalPath':'src/'+p.name},'candidateHTML':{'path':str(hp),'bytes':len(read(hp)),'sha256':sha(read(hp))},'sourcePointBodyAlphaThreshold':16,'sourcePointQualification':'Poing and wrist both inside reviewed clip and pinned original PNG body alpha>16; alpha>0 diagnostics remain separate. No pixel mutation.','originalHTMLSHA256':sha(htmlRaw),'changes':{'rocketArm':'projectile removed, same29/1/34F,1060damage,40resource; max780 remote range replaced by native knuckle contact <=145','bionicStun':'same18/5/34F,0life,2200vigilance,20resource; native knuckle contact, electric upgrade removed'},'requiredActualUI':'Both natural facings, supported new costumes vs original, contact+miss at distance, frame windows/costs, no projectile, normal impacts, pause/reselection; legacy rocketCycle objective is not claimed for these corrected contact-only options.'};rp=out/'VENOM_NATIVE_CONTACT_CANDIDATE_REPORT_V1.json';rp.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'path':str(rp),'bytes':len(read(rp)),'sha256':sha(read(rp))}))
