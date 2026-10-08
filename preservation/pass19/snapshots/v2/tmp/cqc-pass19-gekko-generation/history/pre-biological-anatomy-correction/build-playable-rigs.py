"""Canvas metadata only: no source PNG pixel edits, no baseline writes."""
from pathlib import Path
import json,hashlib,math,shutil
P=Path('/tmp/cqc-pass19-gekko-generation')
R=P/'runtime';(R/'src').mkdir(parents=True,exist_ok=True)
catalog=json.loads((P/'NATIVE_SEMANTIC_SOURCE_CATALOG_V1.json').read_text())
G={r['uid']:r for r in catalog['sources']}
CLOTH='trenchcoat-garment-capped-shoulders-v3.png'
clothGeo=next(g for g in json.loads((P/'qa/NATIVE_GEOMETRY_ANALYSIS_V1.json').read_text()) if g['file']==CLOTH)
clothMap={'coat-closed-sleeveless':1,'coat-open-sleeveless':2,'near-coat-upper-sleeve':4,'near-coat-forearm-sleeve':5,'far-coat-upper-sleeve':8,'far-coat-forearm-sleeve':9,'fedora':10,'belt-flap':11}
clothParts={semantic:next(p for p in clothGeo['parts'] if p['label']==label) for semantic,label in clothMap.items()}
machines=[];states={};playable={}
def bind(channel,factor=1,cosmetic=False):
    return {'channel':channel,'factor':factor,**({'cosmetic':True} if cosmetic else {})}
def model(uid,edition,kind):
    g=G[uid];filename=Path(g['sourcePath']).name
    m={'id':uid,'edition':edition,'origin':[0,0],'scale':[1,1],'sources':[{'id':'atlas','file':'assets/machines-pass19/'+filename,'sha256':g['sourceSha256'],'bytes':g['sourceBytes'],'width':g['width'],'height':g['height']}],'parts':[],'presentationKind':kind,'sourceQualification':'Original source-led native 2D/2.5D adaptation. Transparent PNG pixels untouched. Published physical reference retained. Left-side camera only; same native artwork on reverse-facing presentation remains a qualified temporary projection, never certified as independent right-side artwork. Absolute 1:1 fidelity is not certified.'}
    machines.append(m);states[uid]={'kind':kind,'damageTargets':{},'facingQualification':'left source reused without mirroring for reverse facing until independent source exists'};playable[uid]=[uid,uid]
    d=R/'assets/machines-pass19'/filename;d.parent.mkdir(parents=True,exist_ok=True)
    if not d.exists(): shutil.copy2(g['sourcePath'],d)
    assert hashlib.sha256(d.read_bytes()).hexdigest()==g['sourceSha256']
    return m
def part(m,id,semantic,offset=(0,0),width=None,height=None,scale=None,pivot=(.5,.5),parent=None,z=30,rotation=0,target=None,channels=None,show=None,hide=None,file=None):
    g=G[m['id']];source='atlas'
    if file==CLOTH:
        source='cloth_v3';c=clothParts[semantic]
        if not any(s['id']==source for s in m['sources']):
            m['sources'].append({'id':source,'file':'assets/machines-pass19/'+CLOTH,'sha256':clothGeo['sha256'],'bytes':clothGeo['bytes'],'width':clothGeo['width'],'height':clothGeo['height']})
            dest=R/'assets/machines-pass19'/CLOTH
            if not dest.exists():shutil.copy2(P/'native-originals'/CLOTH,dest)
            assert hashlib.sha256(dest.read_bytes()).hexdigest()==clothGeo['sha256']
    else:c=next(p for p in g['parts'] if p['id']==semantic)
    r=c['rect']
    s=scale if scale is not None else width/r[2] if width is not None else height/r[3]
    p={'id':id,'source':source,'rect':r,'pivot':[round(r[2]*pivot[0],4),round(r[3]*pivot[1],4)],'offset':[round(x,4) for x in offset],'imageScale':s,'z':z,'rotation':rotation,'sourceClipPolygonNativeXY':c['sourceClipPolygonNativeXY']}
    if parent:p['parent']=parent
    if channels:p['channels']=channels
    if show:p['showWhen']=show
    if hide:p['hideWhen']=hide
    if target is not None:states[m['id']]['damageTargets'][id]=target
    m['parts'].append(p);return p
def leg(m,pfx,near,x,hipY,z):
    upper=pfx+'-upper-leg';lower=pfx+'-lower-leg';foot=pfx+'-split-hoof'
    target=0 if near else 1
    u=part(m,pfx+'_upper',upper,(x,hipY),height=145,pivot=(.86,.075),parent='pelvis',z=z,target=target,channels={'rotation':[bind(pfx+'Swing')],'y':[bind(pfx+'Lift',1,True)]})
    ur=u['rect'];knee=[(-.14)*ur[2]*u['imageScale'],-.88*ur[3]*u['imageScale']]
    l=part(m,pfx+'_lower',lower,knee,height=142,pivot=(.55,.045),parent=u['id'],z=z+1,target=target,channels={'rotation':[bind(pfx+'Knee')]})
    lr=l['rect'];ankle=[-.05*lr[2]*l['imageScale'],-.91*lr[3]*l['imageScale']]
    part(m,pfx+'_foot',foot,ankle,width=77,pivot=(.77,.03),parent=l['id'],z=z+2,target=target,channels={'rotation':[bind(pfx+'Foot')]})
    return u
for uid,edition in [('pass19__gekko_suicide_mgs4','GEKKO SUICIDE — MGS4 PS3 2008'),('pass19__gekko_missile_mgs4','GEKKO MISSILE — MGS4 PS3 2008'),('pass19__gekko_mgr','GEKKO DESPERADO — Revengeance 2013')]:
    m=model(uid,edition,'biped')
    part(m,'hull','upper-hull',(0,385),width=285,pivot=(.5,.55),z=30,target=2,channels={'y':[bind('idleBreath',1.4,True)],'rotation':[bind('collapse',22)]})
    part(m,'pelvis','pelvis',(0,-62),width=84,pivot=(.5,.36),parent='hull',z=35)
    leg(m,'far',False,48,-7,12);leg(m,'near',True,-43,-7,45)
    part(m,'optic','optic-dome',(-8,60 if uid=='pass19__gekko_suicide_mgs4' else 70),width=42,pivot=(.5,.76),parent='hull',z=55,channels={'rotation':[bind('cameraSweep',1,True)]})
    if uid!='pass19__gekko_suicide_mgs4':part(m,'machinegun','upper-machinegun',(-135,38),width=115,pivot=(.82,.74),parent='hull',z=58,target=2,channels={'x':[bind('weaponRecoil')],'rotation':[bind('weaponAim')]})
    if uid=='pass19__gekko_missile_mgs4':
        part(m,'missile_mount','missile-attachment',(101,1),width=69,pivot=(.55,.5),parent='hull',z=34,target=2)
        part(m,'paired_missile_pod','paired-missile-pod',(116,13),width=112,pivot=(.92,.5),parent='hull',z=40,target=2,channels={'x':[bind('weaponRecoil',.55)],'rotation':[bind('weaponAim')]})
        m['sourceQualification']+=' Paired large side tubes follow the original Gekko render. Exact BGM-71/TOW identification is not certified. Generated hidden projectile is preserved but not rendered as canonical ammunition.'
    if uid=='pass19__gekko_suicide_mgs4':m['sourceQualification']+=' Dark weaponless concept plus distant actual Suicide gameplay reference; demolition internals are not asserted or rendered as external bomb pods.'
    if uid=='pass19__gekko_mgr':m['sourceQualification']+=' MGR camouflage follows actual R-01 gameplay; hidden maintenance interior is preserved but not rendered.'

# Trenchcoat: three spheres; sleeves/hands are separately articulated, legs are
# robot arms with mechanical hand-feet. The closed coat occludes internal limbs.
uid='pass19__dwarf_gekko_trenchcoat_mgs4';m=model(uid,'TRIPODS SOUS TRENCHCOAT — MGS4 PS3 2008','humanoid_tripod_coat')
part(m,'lower_unit','lower-unit-sphere',(0,173),width=88,z=25,channels={'y':[bind('idleBreath',.4,True)]})
part(m,'middle_unit','middle-unit-sphere',(0,267),width=90,z=25,channels={'y':[bind('idleBreath',.8,True)]})
part(m,'upper_unit','upper-unit-sphere',(0,357),width=86,z=25,channels={'y':[bind('idleBreath',1.2,True)]})
part(m,'coat','coat-closed-sleeveless',(0,395),height=290,pivot=(.5,.025),z=50,target=2,hide=['coatOpened'],channels={'y':[bind('idleBreath',1.2,True)]},file=CLOTH)
part(m,'coat_open','coat-open-sleeveless',(0,395),height=290,pivot=(.5,.025),z=50,target=2,show=['coatOpened'],channels={'y':[bind('idleBreath',1.2,True)]},file=CLOTH)
part(m,'fedora','fedora',(0,414),width=106,pivot=(.5,.76),z=70,target=2,channels={'rotation':[bind('cameraSweep',.35,True)],'y':[bind('idleBreath',1.2,True)]})
for pfx,up,lo,hand,x,z,upPivot,loPivot,upEnd,loEnd,rotation,lowerRotation,target in [
 ('near','near-coat-upper-sleeve','near-coat-forearm-sleeve','near-mechanical-hand',53,61,(.31,.12),(.26,.12),(.78,.90),(.83,.92),-24,0,0),
 ('far','far-coat-upper-sleeve','far-coat-forearm-sleeve','far-mechanical-hand',-48,43,(.41,.12),(.27,.12),(.61,.91),(.78,.90),-10,0,1)]:
    u=part(m,pfx+'_upper_arm',up,(x,355),height=75,pivot=upPivot,z=z,rotation=rotation,target=target,channels={'rotation':[bind(pfx+'ArmSwing')]},file=CLOTH)
    vec=[(upEnd[0]-upPivot[0])*u['rect'][2]*u['imageScale'],-(upEnd[1]-upPivot[1])*u['rect'][3]*u['imageScale']]
    l=part(m,pfx+'_forearm',lo,vec,height=63,pivot=loPivot,parent=u['id'],z=z+1,rotation=lowerRotation,target=target,channels={'rotation':[bind(pfx+'ArmBend')]},file=CLOTH)
    vec=[(loEnd[0]-loPivot[0])*l['rect'][2]*l['imageScale'],-(loEnd[1]-loPivot[1])*l['rect'][3]*l['imageScale']]
    part(m,pfx+'_hand',hand,vec,width=44,pivot=(.91,.52) if pfx=='near' else (.09,.52),parent=l['id'],z=z+2,rotation=33 if pfx=='near' else -33,target=target)
for pfx,x,z,target in [('near',-24,22,0),('far',27,20,1)]:
    u=part(m,pfx+'_upper',pfx+'-arm-as-leg-upper',(x,164),height=78,pivot=(.16,.12),z=z,rotation=-38,target=target,channels={'rotation':[bind(pfx+'Swing')],'y':[bind(pfx+'Lift',1,True)]})
    vec=[.68*u['rect'][2]*u['imageScale'],-.79*u['rect'][3]*u['imageScale']]
    part(m,pfx+'_lower',pfx+'-arm-as-leg-forearm-with-hand-foot',vec,height=110,pivot=(.16,.10),parent=u['id'],z=z+1,rotation=0,target=target,channels={'rotation':[bind(pfx+'Knee')]})
m['sourceQualification']+=' Published original concept and actual MGS4 coat comparison attest THREE stacked robots with fedora, double-breasted belted coat, mechanical hands and hand-feet. Closed garment occludes internal unused arm chains. Separate open shell is an authored animation option. Not a four-limbed human body hidden inside.'

# Double Tripod: exactly two units. Lower third arm becomes the vertical link.
uid='pass19__dwarf_gekko_humanoid_mgr';m=model(uid,'DOUBLE TRIPOD — Revengeance 2013','humanoid_double_tripod')
part(m,'lower_unit','lower-unit-sphere',(0,175),width=94,z=35)
part(m,'upper_unit','upper-unit-sphere',(0,353),width=90,z=35)
part(m,'lower_optic','lower-optic',(-19,180),width=28,z=50)
part(m,'upper_optic','upper-optic',(-20,359),width=28,z=50,channels={'rotation':[bind('cameraSweep',.8,True)]})
u=part(m,'vertical_connector_upper','lower-third-connector-upper',(14,214),height=68,pivot=(.75,.89),z=25,rotation=-23)
vec=[-.42*u['rect'][2]*u['imageScale'],.73*u['rect'][3]*u['imageScale']]
l=part(m,'vertical_connector_forearm','lower-third-connector-forearm',vec,height=79,pivot=(.75,.89),parent=u['id'],z=26,rotation=0)
vec=[-.45*l['rect'][2]*l['imageScale'],.73*l['rect'][3]*l['imageScale']]
part(m,'vertical_connector_hand','lower-third-connector-hand',vec,width=40,pivot=(.85,.85),parent=l['id'],z=27,rotation=23)
part(m,'upper_third_stowed','upper-third-stowed-arm',(21,345),width=53,z=18,rotation=85)
for pfx,x,z,rot,target in [('near',-37,58,-76,0),('far',38,18,-21,1)]:
    source='upper-left' if pfx=='near' else 'upper-right'
    u=part(m,pfx+'_upper_arm',source+'-arm',(x,351),height=62,pivot=(.14,.17),z=z,rotation=rot,target=target,channels={'rotation':[bind(pfx+'ArmSwing')]})
    vec=[.71*u['rect'][2]*u['imageScale'],-.66*u['rect'][3]*u['imageScale']]
    l=part(m,pfx+'_forearm',source+'-forearm',vec,height=62,pivot=(.14,.17),parent=u['id'],z=z+1,target=target,channels={'rotation':[bind(pfx+'ArmBend')]})
    vec=[.71*l['rect'][2]*l['imageScale'],-.66*l['rect'][3]*l['imageScale']]
    part(m,pfx+'_hand',source+'-hand',vec,width=45,pivot=(.88,.63),parent=l['id'],z=z+2,rotation=-rot,target=target)
for pfx,x,z,rot,target in [('near',-29,55,-51,0),('far',27,15,-51,1)]:
    source='lower-left' if pfx=='near' else 'lower-right'
    u=part(m,pfx+'_upper',source+'-arm-as-leg-upper',(x,154),height=87,pivot=(.14,.16),z=z,rotation=rot,target=target,channels={'rotation':[bind(pfx+'Swing')],'y':[bind(pfx+'Lift',1,True)]})
    vec=[.70*u['rect'][2]*u['imageScale'],-.69*u['rect'][3]*u['imageScale']]
    l=part(m,pfx+'_lower',source+'-arm-as-leg-forearm',vec,height=79,pivot=(.14,.16),parent=u['id'],z=z+1,target=target,channels={'rotation':[bind(pfx+'Knee')]})
    vec=[.70*l['rect'][2]*l['imageScale'],-.71*l['rect'][3]*l['imageScale']]
    part(m,pfx+'_foot',source+'-hand-foot',vec,width=61,pivot=(.55,.15),parent=l['id'],z=z+2,rotation=51,target=target,channels={'rotation':[bind(pfx+'Foot')]})
m['sourceQualification']+=' Actual released MGR screenshots attest TWO vertically connected Dwarf units without fabric. All six arms are represented: two human-like upper arms, upper stowed third arm, lower vertical-link third arm, and two lower arm-as-leg chains. Tiny distant gameplay does not certify every hidden rear joint or folding angle.'

# One genuine sphere acts as each humanoid rig's root; conversion preserves
# the reviewed neutral pixels while making whole-body collapse coherent.
for m in machines:
    if not m['presentationKind'].startswith('humanoid_'):continue
    root=next(p for p in m['parts'] if p['id']=='lower_unit')
    for p in m['parts']:
        if p is root or p.get('parent'):continue
        p['parent']='lower_unit'
        p['offset']=[round(p['offset'][0]-root['offset'][0],4),round(p['offset'][1]-root['offset'][1],4)]
    root.setdefault('channels',{}).update({'rotation':[bind('collapse',72)],'x':[bind('collapse',24)],'y':[*root.get('channels',{}).get('y',[]),bind('collapse',-82)]})

def anchors(m):
    a={}
    for p in m['parts']:
        par=a.get(p.get('parent'),(0,0,0));ang=math.radians(par[2]);x,y=p['offset'];a[p['id']]=(par[0]+math.cos(ang)*x-math.sin(ang)*y,par[1]+math.sin(ang)*x+math.cos(ang)*y,par[2]+p['rotation'])
    return a
for m in machines:
    a=anchors(m)
    for p in m['parts']:
        target=states[m['id']]['damageTargets'].get(p['id'])
        if target is None or p['id'] in ['hull','lower_unit','middle_unit','upper_unit']:continue
        p['detachment']={'when':'part'+str(target)+'Destroyed','clock':'destroy'+str(target)+'Frames','anchor':[round(a[p['id']][0],3),round(a[p['id']][1],3)],'duration':90,'vx':(-1 if target%2==0 else 1)*.7,'vy':1.4,'gravity':.1,'spin':(-1 if target%2==0 else 1)*1.1,'fade':24}
meta={'schema':'cqc.pass19-gekko-presentation/1','playable':playable,'states':states,'limits':['Five independently registered native source rigs; gameplay HP, collider and attack profiles are owned by integration.','Native left artwork remains unmirrored for reverse projection; independent right art is still missing.','A canonical concept/gameplay reference does not certify every hidden assembled joint or an absolute 1:1 replica.']}
cat={'schema':'cqc.machine-parts/1','machines':machines}
(P/'NEW_PLAYABLE_NATIVE_RIGS_V1.json').write_text(json.dumps(cat,indent=2)+'\n');(P/'PLAYABLE_PRESENTATION_MAPS_V1.json').write_text(json.dumps(meta,indent=2)+'\n')
(R/'src/cqc-pass19-gekko-catalog.js').write_text('(function(root){"use strict";root.CQC_PASS19_GEKKO_CATALOG='+json.dumps(cat,separators=(',',':'))+';root.CQC_PASS19_GEKKO_DATA='+json.dumps(meta,separators=(',',':'))+';})(globalThis);\n')
print(json.dumps({'rigCount':len(machines),'parts':sum(len(m['parts']) for m in machines),'uids':list(playable),'runtime':str(R)}))
