import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';

const root = '/tmp/cqc-pass19-survive-generation';
const specs = JSON.parse(fs.readFileSync(path.join(root, 'approved-identities-v1.json'), 'utf8'));
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const sources = {
  pass19__wanderer_survive: [{url:'https://eu-support.konami.com/hc/en-gb/articles/9649446866327-Creatures',scope:'Official screenshot of standard Wanderer.'},{url:'https://gecco.co.jp/en/product/wanderer/',scope:'Licensed Gecco full body sculpture, including original trousers/boots; not an extracted game model.'}],
  pass19__tracker_survive: [{url:'https://eu-support.konami.com/hc/en-gb/articles/9649446866327-Creatures',scope:'Official Tracker screenshot with human-derived torso, red crystal head and black mutated legs.'}],
  pass19__mortar_survive: [{url:'https://gameranx.com/features/id/140946/article/metal-gear-survive-walkthrough-chapter-18-find-sahelanthropus/',scope:'Original released-game front-body capture of Mortar; enlarged cannon arm on viewer-left. Anatomical side interpretation differs from community text.'}],
  pass19__crawler_survive: [{url:'https://gameranx.com/features/id/140479/article/metal-gear-survive-walkthrough-chapter-11-exploring-ruins-02/',scope:'Released-game capture of cave Crawlers; tiny dark limbs and occluded surfaces remain qualified.'},{url:'https://metalgear.fandom.com/wiki/Dread_Dust',scope:'Indexed community anatomy description: two oblong parts connected by cord, six legs. This is a textual crosscheck, not primary art.'}]
};
sources.pass19__big_mouth_survive=[{url:'https://gameranx.com/features/id/141534/article/metal-gear-survive-how-to-fight-two-legendary-end-game-bosses/',scope:'Close original front-quarter released-game captures of Big Mouth with crystal plating, large jaws, pale throat and yellow stripes. Unseen surfaces remain qualified.'}];
sources.pass19__frostbite_survive=[{url:'https://steamcommunity.com/sharedfiles/filedetails/?id=1312645473',scope:'Close original released-game Frostbite screenshot from community guide, directly viewed; visible dome, shuttered iris recesses and pale ribbed ribbon tentacles. Hidden surfaces and folded tip counts remain qualified.'}];
const entries = {}, proofs = [];
for (const [uid, spec] of Object.entries(specs)) {
  if (!spec.selectedSources?.right || !spec.selectedSources?.left) continue;
  const frames = {}, layouts = {}, files = {};
  for (const side of ['right','left']) {
    const layout = JSON.parse(fs.readFileSync(path.join(root,'generation',uid,side+'-native-layout-v1.json'),'utf8'));
    const source = path.join(root,'generation',uid,spec.selectedSources[side]);
    const native = fs.readFileSync(source);
    if (path.resolve(layout.source) !== path.resolve(source) || hash(native) !== layout.sha256 || native.length !== layout.bytes || layout.physicalPoseCount !== 16 || layout.warnings.length) throw Error('Native geometry/pin mismatch: '+uid+'/'+side);
    const file = `assets/combat-sprites-pass19-survive/${uid}/${spec.assetNames?.[side] || side+'-v1.png'}`;
    const destination = path.join(root,'candidates',file);
    fs.mkdirSync(path.dirname(destination),{recursive:true});
    if (!fs.existsSync(destination)) fs.linkSync(source,destination);
    if (hash(fs.readFileSync(destination)) !== layout.sha256) throw Error('Unchanged native asset mismatch');
    files[side] = file; layouts[side] = layout;
    frames[side] = layout.poses.map(p => ({file,sha256:layout.sha256,rect:p.rect,pivot:p.pivot,...p.clipPolygon?{clipPolygon:p.clipPolygon}:{}}));
  }
  const tracker = uid === 'pass19__tracker_survive';
  const mortar = uid === 'pass19__mortar_survive';
  const crawler = uid === 'pass19__crawler_survive';
  const frostbite = uid === 'pass19__frostbite_survive';
  const actions = f => {
    const group = (poses,fps=0,loop=false) => ({fps:poses.length>1&&fps===0?8:fps,loop,frames:poses.map(i=>f[i])});
    return {
      idle:group([0]), guard:group([1]), walk:group([2,3],7,true), crouch:group([4]),
      jump:group(tracker||crawler?[6,9,10]:[0]),
      attack:group([5,6,1],9), punch:group([5,6,1],9), blade:group([5,6,1],9),
      heavy:group([5,9,10],9), low:group([4,7,1],9), throw:group([1,8,1],9),
      shoot:group(mortar||frostbite?[5,11,10]:[5,6,1],9),
      charge:group(mortar||frostbite?[5,12,10]:[11]),
      deploy:group([10]), reload:group([12]), optic:group([10]), recover:group([12]),
      roll:group([15]), parry:group([1]), hit:group(frostbite?[12]:[13]), ko:group(frostbite?[13]:[14])
    };
  };
  const entry = {
    uid,name:spec.name,game:'METAL GEAR SURVIVE',incarnation:'Released2018 creature, source-led native 2.5D CQC adaptation',
    coverage:'action-frames',displayHeight:spec.displayHeight,baseFrameHeight:layouts.right.sourceFrameHeight,
    sourceFrameHeights:Object.fromEntries(['right','left'].map(side=>[files[side],layouts[side].sourceFrameHeight])),
    facing:1,mirror:false,fallbackMissingActions:false,renderStyle:'painted',visualFirearmPresent:false,
    actions:actions(frames.right),oppositeActions:actions(frames.left),
    actionMap:{light:'punch',heavy:'heavy',low:'low',throw:'throw',special:mortar||frostbite?'shoot':'punch',specialDown:mortar||frostbite?'charge':'deploy',specialForward:mortar||frostbite?'shoot':'heavy',specialBack:'guard',super:mortar?'shoot':'heavy',utility:'recover'},
    phaseMap:Object.fromEntries(['attack','punch','heavy','low','throw','shoot','blade',...(mortar||frostbite?['charge']:[])].map(k=>[k,{startup:[0],active:[1],recovery:[2]}])),
    absolute1to1Certified:false,
    review:{status:'approved',reviewer:'pass19-survive-source-and-independent-facing-native-geometry-review',reviewedAt:'2026-10-07T23:20:00Z',sourceKind:uid==='pass19__wanderer_survive'||tracker?'official-game-reference':'original-game-capture',checks:{identity:true,costume:true,equipment:true,anatomicalSides:true,singleFigure:true,transparentBackground:true},sources:sources[uid],limits:[
      'Source-backed visible appearance is adapted to native ink2.5D sprites. Exact unseen surfaces and literal pixel-perfect 1:1 topology are not certified.',
      spec.sourceScope,
      ...(spec.nativeGeometryAlphaThreshold?[`Rendering uses read-only alpha${spec.nativeGeometryAlphaThreshold} vector contours on every pose to isolate the actual physical body from generated translucent coloured aura. All source PNG bytes and rejected edit attempts are preserved unchanged. This is standard Canvas sprite contour clipping, not a transformed replacement image.`]:[]),
      'Exactly16 independently authored physical keyposes in each direction,32 per identity. Multiple action groups share keyposes explicitly; no claim of72 independently drawn frames.',
      'Both facing atlases are independently generated. Native PNG bytes are retained unchanged; alpha geometry and optional Canvas vector clipping isolate connected physical poses without rewriting raster pixels.',
      'CQC move timing, reach, hitboxes, projectiles, costume and scale rules remain authored gameplay adaptations; displayHeight is presentation only, not an officially certified world measurement.'
    ]}
  };
  entries[uid] = entry;
  proofs.push({uid,physicalPoses:32,files:Object.values(files),sourcePins:Object.fromEntries(Object.entries(layouts).map(([side,l])=>[side,{source:l.source,sha256:l.sha256,bytes:l.bytes,dimensions:l.dimensions}])),absolute1to1Certified:false});
}
const catalog = {schema:'cqc.combat-sprites/1',entries};
const directory = path.join(root,'candidates'); fs.mkdirSync(directory,{recursive:true});
const code = `/* PASS19 Survive creatures, additive and gated by native decoded readiness. */\n(function(root){'use strict';const addition=${JSON.stringify(catalog)};const base=root.CQC_COMBAT_SPRITE_CATALOG||{schema:'cqc.combat-sprites/1',entries:{}};for(const uid of Object.keys(addition.entries))if(Object.hasOwn(base.entries,uid))throw Error('Duplicate native identity: '+uid);root.CQC_COMBAT_SPRITE_CATALOG={...base,entries:{...base.entries,...addition.entries}};root.CQC_PASS19_SURVIVE_SPRITE_UIDS=Object.freeze(Object.keys(addition.entries));})(globalThis);\n`;
fs.writeFileSync(path.join(directory,'cqc-pass19-survive-sprite-catalog-working.js'),code);
fs.writeFileSync(path.join(directory,'combat-sprite-catalog-pass19-survive-working.json'),JSON.stringify(catalog,null,2));
const context = vm.createContext({URL,document:{currentScript:{src:'http://localhost/src/cqc-sprite-renderer.js'}}});
vm.runInContext(fs.readFileSync('/tmp/cqc-pass18-runtime/src/cqc-sprite-renderer.js','utf8'),context);
const configured = context.CQC_COMBAT_SPRITES.configure(catalog);
if (configured.accepted !== Object.keys(entries).length || configured.rejected.length) throw Error(JSON.stringify(configured));
const report = {schema:'cqc.pass19.survive-native-handoff/1',approvedUIDs:Object.keys(entries),approvedPhysicalPoses:proofs.length*32,candidateCatalog:{path:path.join(directory,'cqc-pass19-survive-sprite-catalog-working.js'),sha256:hash(code),bytes:Buffer.byteLength(code)},rendererSchemaCheck:configured,originalsAndRejectionsPreserved:true,sourcePixelsTransformed:false,browserDecodedQA:'pending-parent-integration',items:proofs};
fs.writeFileSync(path.join(root,'NATIVE_SURVIVE_HANDOFF_WORKING.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({approvedUIDs:report.approvedUIDs,approvedPhysicalPoses:report.approvedPhysicalPoses,rendererSchemaCheck:configured,catalog:report.candidateCatalog}));
