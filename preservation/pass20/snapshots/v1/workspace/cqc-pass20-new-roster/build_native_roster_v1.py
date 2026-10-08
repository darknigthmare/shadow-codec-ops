"""Register reviewed native atlases without rewriting any PNG bytes."""
from pathlib import Path
import json, hashlib, os, shutil, errno

WORK=Path('/workspace/cqc-pass20-new-roster')
APP=Path('/tmp/cqc-pass19-application/public/cqc')
sha=lambda b:hashlib.sha256(b).hexdigest()
specs={
 'pass19__mastiff_mgr':{'name':'MASTIFF','height':336,'sourceKind':'original-game-model','sources':[
  {'url':'https://open3dlab.com/project/478600f7-dee1-4c1b-97dc-d7e2039f55ee/','kind':'community-extracted-game-model','scope':'Final released-model full-body surfaces and artificial joints; community reproduction, not a primary publisher photograph.'},
  {'url':'https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/R-02-Research-Facility.htm','kind':'secondary-published-original-gameplay-captures','scope':'Released-game forearms, seams, harness, legs and behavior corroboration; partially occluded during combat.'}],
  'limits':['Independently painted facings from the released-model design; this is a 2.5D adaptation, not extracted game sprite pixels.','The 2.8 metre standing display height is an estimate. No official metric size or absolute 1:1 fidelity is certified.','Sixteen physical poses per facing are reused in explicit move phases. Timings, damage, grenade trajectories and combo sequences are CQC adaptations.','Native full-body action sprites are supplied; individual part destruction is not added in this module.']},
 'pass19__slider_mgr':{'name':'SLIDER','height':180,'sourceKind':'official-game-reference','sources':[
  {'url':'https://www.sggaminginfo.com/2012/12/konami-release-new-metal-gear-rising-assets/','kind':'publisher-gameplay-assets-republished-by-secondary','scope':'Konami 2012 press screenshots explicitly published by SG Gaming Info; full flying machine wing panels, red tips, pods and central airframe inspected.'},
  {'url':'https://www.sggaminginfo.com/wp-content/gallery/metal_gear_rising_bootcamp_screenshots/CyborgSlider_ready_W.jpg','kind':'publisher-original-gameplay-image','scope':'Full machine geometry; accompanying cyborg rider is explicitly not part of this fighter.'}],
  'limits':['Only the flying Unmanned Gear is playable. A mounted human cyborg is a separate subject and has not been fused into the machine.','Wings, panel colors and pods follow inspected Konami assets. The airframe behind the rider is reconstructed from the three views; occluded surfaces and absolute 1:1 fidelity are not certified.','The 1.5 metre vertical display dimension is an estimate, not a certified wingspan or official model scale.','Each facing has sixteen native paintings; left poses 10 and 11 turn toward the opposite direction and are retained but never selected.','Grenade-free machine movement, missile trajectories, catches and damage are authored CQC adaptations. Full-body sprites are supplied; independent wing part destruction is still pending.']}}
catalog={'schema':'cqc.combat-sprites/1','entries':{}}
layouts={}
changed=[]
for uid,spec in specs.items():
 sides={}; heights={}
 for side in ['right','left']:
  native=WORK/'generation'/uid/(side+'-v1.png')
  layout=json.loads(native.with_name(side+'-native-layout-v1.json').read_text())
  rel=f'assets/combat-sprites-pass20-roster/{uid}/{side}-v1.png'
  dest=APP/rel;dest.parent.mkdir(parents=True,exist_ok=True)
  if not dest.exists():
   try:os.link(native,dest)
   except OSError as error:
    if error.errno!=errno.EXDEV:raise
    shutil.copyfile(native,dest)
  assert sha(dest.read_bytes())==layout['sha256']
  changed.append({'path':str(dest),'bytes':dest.stat().st_size,'sha256':layout['sha256'],'operation':'immutable-native-byte-identical-addition'})
  heights[rel]=layout['sourceFrameHeight']
  frames=[]
  for frame in layout['poses']:
   f={k:frame[k] for k in ['rect','pivot','clipPolygon'] if k in frame}
   f.update(file=rel,sha256=layout['sha256'])
   # Flying machines use the central airframe as the horizontal movement origin,
   # never a wingtip that changes position as the wings beat or deploy missiles.
   if uid=='pass19__slider_mgr':
    centers={'right':[310,698,1086,1368,318,700,1080,1390,307,698,1122,1420,301,697,1001,1433],
             'left':[222,584,956,1316,193,570,1000,1330,172,588,1054,1346,107,515,940,1401]}
    f['pivot'][0]=round(max(0,min(1,(centers[side][frame['physicalPoseIndex']]-f['rect'][0])/f['rect'][2])),6)
   frames.append(f)
  def action(indices,loop=False):return {'fps':7 if loop else 9 if len(indices)>1 else 0,'loop':loop,'frames':[frames[i] for i in indices]}
  launch=[8,9,8] if uid.endswith('slider_mgr') else [13,13,4]
  actions={
   'idle':action([0]),'guard':action([3]),'walk':action([1,2],True),
   'crouch':action([4]),'jump':action([5]),'roll':action([6,7]),
   'attack':action([8,9,3]),'punch':action([8,9,3]),
   'heavy':action([8,11 if side=='right' or uid.endswith('mastiff_mgr') else 13,3]),
   'low':action([4,7,4]),'throw':action([12,12,3]),
   'deploy':action(launch),'shoot':action(launch),'charge':action(launch),
   'reload':action([3,4,0]),'recover':action([3,0]),'optic':action([0]),
   'parry':action([3]),'hit':action([14]),'ko':action([15])}
  sides[side]=actions
  layouts[uid+':'+side]={'path':str(native.with_name(side+'-native-layout-v1.json')),'sha256':sha(native.with_name(side+'-native-layout-v1.json').read_bytes()),'sourceSHA256':layout['sha256'],'sourceFrameHeight':layout['sourceFrameHeight'],'physicalPoseCount':16,'sourcePixelsTransformed':False,'warnings':layout['warnings']}
 entry={'uid':uid,'name':spec['name'],'game':'METAL GEAR RISING: REVENGEANCE','incarnation':'Released2013 Unmanned Gear; source-led native CQC adaptation','coverage':'action-frames','displayHeight':spec['height'],'baseFrameHeight':heights[next(iter(heights))],'sourceFrameHeights':heights,'facing':1,'mirror':False,'fallbackMissingActions':False,'renderStyle':'painted','visualFirearmPresent':False,'actions':sides['right'],'oppositeActions':sides['left'],'actionMap':{'light':'punch','heavy':'heavy','low':'low','throw':'throw','special':'deploy','specialForward':'punch' if uid.endswith('mastiff_mgr') else 'charge','specialDown':'roll','specialBack':'roll','super':'deploy','utility':'recover'},'phaseMap':{a:{'startup':[0],'active':[1],'recovery':[2]} for a in ['attack','punch','heavy','low','throw','deploy','shoot','charge']},'review':{'status':'approved','reviewer':'Codex native-roster source and anatomical review','reviewedAt':'2026-10-08','sourceKind':spec['sourceKind'],'sources':spec['sources'],'checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'limits':spec['limits']}}
 # The sixteen native designs are an explicitly phase mapped atlas, avoiding
 # generated pseudo-frame counts or falling back to a procedural human.
 catalog['entries'][uid]=entry
text='/* PASS20: two independently painted released-game UG bodies; no source pixels rewritten. */\n(function(root){\'use strict\';const addition='+json.dumps(catalog,separators=(',',':'))+';const base=root.CQC_COMBAT_SPRITE_CATALOG||{schema:\'cqc.combat-sprites/1\',entries:{}};for(const uid of Object.keys(addition.entries))if(Object.hasOwn(base.entries,uid))throw Error(\'Duplicate native identity: \'+uid);root.CQC_COMBAT_SPRITE_CATALOG={...base,entries:{...base.entries,...addition.entries}};root.CQC_PASS20_ROSTER_SPRITE_UIDS=Object.freeze(Object.keys(addition.entries));})(globalThis);\n'
target=APP/'src/cqc-pass20-roster-sprite-catalog.js';assert not target.exists();target.write_text(text);changed.append({'path':str(target),'bytes':target.stat().st_size,'sha256':sha(target.read_bytes()),'operation':'new-native-catalog'})
(WORK/'NATIVE_CATALOG_SOURCE_PINS_V1.json').write_text(json.dumps({'schema':'cqc.pass20.new-native-roster-pins/1','status':'generated-and-source-reviewed; awaiting-runtime-QA','physicalAtlases':4,'physicalFigures':64,'sourcePixelsTransformed':False,'layoutSources':layouts,'files':changed,'reservedNotActivated':['pass19__watcher_survive','pass19__grabber_survive','pass19__fenrir_mgr'],'referenceQualification':'Watcher source wings motion-blurred; Grabber remained buried in all inspected sources; Fenrir mod swap alone does not establish an unmodified released-game reference.'},indent=2))
print(json.dumps({'catalog':str(target),'sha256':sha(target.read_bytes()),'nativePNGBytes':sum(x['bytes'] for x in changed if x['path'].endswith('.png')),'physicalPoses':64}))
