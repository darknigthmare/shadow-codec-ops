from pathlib import Path
import json,copy,hashlib,math,shutil,os
base=Path('/workspace/cqc-pass19-gekko-right-generation');left=Path('/tmp/cqc-pass19-gekko-generation');runtime=base/'runtime';app=Path('/tmp/cqc-pass19-application/public/cqc');geos={r['file']:r for r in json.load(open(base/'qa/NATIVE_GEOMETRY_ANALYSIS_V1.json'))}
s=(app/'src/cqc-pass19-gekko-catalog.js').read_text();a=s.index('root.CQC_PASS19_GEKKO_CATALOG=')+len('root.CQC_PASS19_GEKKO_CATALOG=');b=s.index(';root.CQC_PASS19_GEKKO_DATA=');old=json.loads(s[a:b]);c=b+len(';root.CQC_PASS19_GEKKO_DATA=');data=json.loads(s[c:s.rfind(';})(globalThis);')]);catalog=copy.deepcopy(old);meta=copy.deepcopy(data)
files={'organic':'gekko-common-original-organic-calves-hooves-right-v1.png','missile':'gekko-missile-mgs4-right-parts-v1.png','missile_hull':'gekko-missile-mgs4-right-detached-hull-v2.png','mgr':'gekko-mgr-right-parts-v1.png','suicide':'gekko-suicide-mgs4-right-parts-v1.png','coat':'trenchcoat-mgs4-right-parts-v1.png','double':'double-tripod-mgr-right-parts-v1.png'}
mappings={
 'pass19__gekko_suicide_mgs4':{'hull':('suicide',1),'pelvis':('suicide',4),'optic':('suicide',2),'near_upper':('suicide',7),'far_upper':('suicide',11)},
 'pass19__gekko_missile_mgs4':{'hull':('missile_hull',1),'pelvis':('missile',4),'optic':('missile',5),'machinegun':('missile',1),'near_upper':('missile',20),'far_upper':('missile',48),'missile_mount':('missile',81),'paired_missile_pod':('missile',79)},
 'pass19__gekko_mgr':{'hull':('mgr',1),'pelvis':('mgr',7),'optic':('mgr',6),'machinegun':('mgr',5),'near_upper':('mgr',32),'far_upper':('mgr',82)},
 'pass19__dwarf_gekko_trenchcoat_mgs4':{k:('coat',v)for k,v in {'lower_unit':62,'middle_unit':61,'upper_unit':6,'coat':1,'coat_open':2,'fedora':17,'near_upper_arm':63,'near_forearm':64,'near_hand':136,'far_upper_arm':124,'far_forearm':125,'far_hand':130,'near_upper':205,'near_lower':204,'far_upper':203,'far_lower':202}.items()},
 'pass19__dwarf_gekko_humanoid_mgr':{k:('double',v)for k,v in {'upper_unit':1,'lower_unit':2,'upper_optic':12,'lower_optic':11,'near_upper_arm':37,'near_forearm':38,'near_hand':39,'far_upper_arm':34,'far_forearm':64,'far_hand':69,'upper_third_stowed':68,'vertical_connector_upper':63,'vertical_connector_forearm':96,'vertical_connector_hand':99,'near_upper':94,'near_lower':95,'near_foot':125,'far_upper':122,'far_lower':123,'far_foot':126}.items()}
}
# Fresh source joint positions are physically reviewed proposals, not canonical hidden-joint certificates.
joints={
 'coat':{'near_upper':((.17,.15),(.82,.88)),'far_upper':((.17,.15),(.82,.88)),'near_lower':((.49,.10),(.325,.83)),'far_lower':((.205,.112),(.315,.80)),'near_upper_arm':((.15,.14),(.82,.89)),'near_forearm':((.14,.13),(.88,.88)),'far_upper_arm':((.85,.14),(.15,.84)),'far_forearm':((.14,.13),(.85,.88))},
 'double':{'near_upper_arm':((.14,.17),(.85,.83)),'near_forearm':((.14,.17),(.85,.83)),'far_upper_arm':((.80,.17),(.16,.83)),'far_forearm':((.14,.17),(.85,.83)),'near_upper':((.14,.16),(.84,.85)),'near_lower':((.14,.16),(.84,.87)),'far_upper':((.16,.14),(.84,.85)),'far_lower':((.14,.16),(.85,.87)),'vertical_connector_upper':((.42,.10),(.81,.88)),'vertical_connector_forearm':((.38,.12),(.81,.87))}
}
def anchors(parts):
 out={}
 for p in parts:
  par=out.get(p.get('parent'),(0,0,0));ang=math.radians(par[2]);x,y=p['offset'];out[p['id']]=(par[0]+math.cos(ang)*x-math.sin(ang)*y,par[1]+math.sin(ang)*x+math.cos(ang)*y,par[2]+p['rotation'])
 return out
for original in old['machines']:
 uid=original['id'];rightid=uid+'_right';m=copy.deepcopy(original);m['id']=rightid;m['edition']+=' — caméra droite';m['sources']=[];m['sourceQualification']='Independent native RIGHT side-oblique imagegen source camera, never mirrored PNG. Uniform crop/rotation/translation only. Original physical references and left/rejected source generations preserved. Hidden surface details and joint geometry remain qualified; absolute 1:1 not certified.'
 map=mappings[uid]
 if uid.startswith('pass19__gekko_'):
  map.update({'near_lower':('organic',2),'far_lower':('organic',1),'near_foot':('organic',10),'far_foot':('organic',11)})
 oldA=anchors(original['parts']);newA={};oldParts={p['id']:p for p in original['parts']};childs={}
 for p in original['parts']:
  if p.get('parent'):childs.setdefault(p['parent'],[]).append(p['id'])
 nativeEnds={}
 for p in m['parts']:
  oldp=oldParts[p['id']];key,label=map[p['id']];geo=geos[files[key]];component=next(row for row in geo['parts']if row['label']==label);r=component['rect'];p['source']=key;p['rect']=r;p['sourceClipPolygonNativeXY']=component['sourceClipPolygonNativeXY'];source={'id':key,'file':'assets/machines-pass19/'+files[key],'sha256':geo['sha256'],'bytes':geo['bytes'],'width':geo['width'],'height':geo['height']}
  if not any(s['id']==key for s in m['sources']):m['sources'].append(source)
  # Uniform dimensions use height on limb rods and cloth, width on hull/sphere/optic/hand/hoof/weapon.
  heightSized=p['id']in ['near_upper','far_upper','near_lower','far_lower','near_upper_arm','far_upper_arm','near_forearm','far_forearm','vertical_connector_upper','vertical_connector_forearm','coat','coat_open']
  index=3 if heightSized else 2;p['imageScale']=oldp['imageScale']*oldp['rect'][index]/r[index]
  oldFrac=[oldp['pivot'][0]/oldp['rect'][2],oldp['pivot'][1]/oldp['rect'][3]];pivot=(1-oldFrac[0],oldFrac[1]);end=None
  if key in joints and p['id']in joints[key]:pivot,end=joints[key][p['id']]
  if key=='organic'and p['id'].endswith('_lower'):pivot,end=(.65,.035),(.38,.93)
  if uid.startswith('pass19__gekko_') and p['id'].endswith('_upper'):pivot,end=(.50,.16),(.53,.90)
  if key=='coat'and p['id']=='near_hand':pivot=(.10,.52)
  if key=='coat'and p['id']=='far_hand':pivot=(.90,.52)
  p['pivot']=[round(r[2]*pivot[0],4),round(r[3]*pivot[1],4)];p['offset']=[-oldp['offset'][0],oldp['offset'][1]];p['rotation']=-oldp['rotation']
  parent=p.get('parent');parentAng=newA.get(parent,(0,0,0))[2]
  if parent in nativeEnds:p['offset']=nativeEnds[parent]
  # Match mirrored skeleton direction using actual new native joint locations, not mirrored pixels.
  selectedChild=next((cid for cid in childs.get(p['id'],[])if cid in ['near_lower','far_lower','near_foot','far_foot','near_forearm','far_forearm','near_hand','far_hand','vertical_connector_forearm','vertical_connector_hand']),None)
  if end and selectedChild:
   vector=[(end[0]-pivot[0])*r[2]*p['imageScale'],-(end[1]-pivot[1])*r[3]*p['imageScale']];nativeEnds[p['id']]=vector
   goal=[-(oldA[selectedChild][0]-oldA[p['id']][0]),oldA[selectedChild][1]-oldA[p['id']][1]];p['rotation']=math.degrees(math.atan2(goal[1],goal[0])-math.atan2(vector[1],vector[0]))-parentAng
  elif key=='coat' and p['id'] in ['near_lower','far_lower'] and end:
   vector=[(end[0]-pivot[0])*r[2]*p['imageScale'],-(end[1]-pivot[1])*r[3]*p['imageScale']];p['rotation']=(-86 if p['id']=='near_lower' else -94)-math.degrees(math.atan2(vector[1],vector[0]))-parentAng
  elif p['id'].endswith('_foot')or p['id'].endswith('_hand'):
   p['rotation']=-oldA[p['id']][2]-parentAng
  p['rotation']=(p['rotation']+180)%360-180
  if 'channels'in p:
   for property,bindings in p['channels'].items():
    if property in ['x','rotation']:
     for binding in bindings:binding['factor']=-binding.get('factor',1)
  if 'detachment'in p:
   d=p['detachment'];d['anchor'][0]=-d['anchor'][0];d['vx']=-d['vx'];d['spin']=-d['spin']
  if key=='coat' and p['id']=='fedora':p['offset'][1]-=10
  temp=anchors([*m['parts'][:m['parts'].index(p)+1]]);newA[p['id']]=temp[p['id']]
 # Detachment anchors match revised actual opposite-camera neutral joints.
 for p in m['parts']:
  if 'detachment'in p:p['detachment']['anchor']=[round(newA[p['id']][0],3),round(newA[p['id']][1],3)]
 catalog['machines'].append(m);meta['playable'][uid]=[uid,rightid];meta['states'][rightid]={**copy.deepcopy(meta['states'][uid]),'facingQualification':'independently rendered native right-camera source'}
 meta['states'][uid]['facingQualification']='independently rendered native left-camera source'
meta['limits']=['Five new playable identities with independently rendered opposite-camera native sources and 134 articulated source parts.','No negative image scales or mirrored PNGs; semantic native joints/pivots are qualified adaptation metadata.','Original physical references attest visible equipment/anatomy but do not certify every hidden detail or absolute 1:1. Gameplay bodies/HP/colliders unchanged by registration.']
(base/'INDEPENDENT_TWO_FACE_NATIVE_RIGS_V1.json').write_text(json.dumps(catalog,indent=2)+'\n');(base/'INDEPENDENT_TWO_FACE_PRESENTATION_MAPS_V1.json').write_text(json.dumps(meta,indent=2)+'\n')
(runtime/'src/cqc-pass19-gekko-catalog.js').write_text('(function(root){"use strict";root.CQC_PASS19_GEKKO_CATALOG='+json.dumps(catalog,separators=(',',':'))+';root.CQC_PASS19_GEKKO_DATA='+json.dumps(meta,separators=(',',':'))+';})(globalThis);\n')
# Every runtime PNG is byte-identical and immutable; source names retained. Workspace original/CAS shares only immutable pixels.
for m in catalog['machines']:
 for source in m['sources']:
  dest=runtime/source['file'];dest.parent.mkdir(parents=True,exist_ok=True)
  if not dest.exists():
   if source['file'].split('/')[-1]in geos:
    proof=json.load(open(base/'provenance'/(Path(source['file']).stem+'-actual.json')));keeper=Path(proof['originalPath'])
   else:keeper=Path('/workspace/cqc-pass19-preservation-inventory/immutable-snapshot-v1/blobs')/source['sha256'][:2]/source['sha256']
   assert hashlib.sha256(keeper.read_bytes()).hexdigest()==source['sha256'];os.link(keeper,dest)
  assert hashlib.sha256(dest.read_bytes()).hexdigest()==source['sha256']
# Root-corrected actual VS flags-to-action pose resolver is retained byte-for-byte.
for name in ['cqc-pass19-gekko-poses.js','cqc-machine-parts-renderer-v1.js','cqc-machine-parts-catalog-v1.js','cqc-pass16-machine-catalog.js','cqc-pass18-machine-catalog.js']:
 shutil.copy2(app/'src'/name,runtime/'src'/name)
posep=runtime/'src/cqc-pass19-gekko-poses.js';(base/'qa/ROOT_FLAG_POSE_BASELINE_PIN_V1.json').write_text(json.dumps({'sourcePath':str(app/'src'/posep.name),'candidatePath':str(posep),'sha256':hashlib.sha256(posep.read_bytes()).hexdigest(),'rootVSFlagResolverPreserved':True},indent=2)+'\n')
print(json.dumps({'rigCount':len(catalog['machines']),'parts':sum(len(m['parts'])for m in catalog['machines']),'sources':len({s['sha256']for m in catalog['machines']for s in m['sources']}),'runtime':str(runtime)}))
