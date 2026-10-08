import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root='/tmp/cqc-pass19-pw-box-generation';
const version=process.argv[2]||'batch-0001';
const out=path.join(root,'candidates',version);
fs.mkdirSync(out,{recursive:false});
const identities=JSON.parse(fs.readFileSync(path.join(root,'approved-identities-v1.json')));
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const entries={},items=[];
for(const [uid,identity] of Object.entries(identities)){
  const layouts={},files={},frames={};
  for(const side of ['right','left']){
    const source=path.join(root,'generation',uid,identity.selectedSources[side]);
    const layout=JSON.parse(fs.readFileSync(path.join(root,'generation',uid,side+'-native-layout-v1.json')));
    const bytes=fs.readFileSync(source);
    assert.equal(layout.sha256,sha(bytes));
    assert.equal(layout.source,source);
    assert.equal(layout.physicalPoseCount,16);
    assert.equal(layout.warnings.length,0);
    layouts[side]=layout;
    files[side]=`assets/combat-sprites-pass19-boxes/${uid}/${side}-v1.png`;
    const assetDir=path.join(out,'assets/combat-sprites-pass19-boxes',uid);
    fs.mkdirSync(assetDir,{recursive:true});
    fs.linkSync(source,path.join(out,files[side]));
    frames[side]=layout.poses.map(p=>({file:files[side],sha256:layout.sha256,rect:p.rect,pivot:p.pivot,...p.clipPolygon?{clipPolygon:p.clipPolygon}:{}}));
  }
  const actions=f=>{
    const group=(ids,fps=0,loop=false)=>({fps,loop,frames:ids.map(i=>f[i])});
    return {idle:group([0]),guard:group([1]),walk:group([2,3],7,true),crouch:group([4]),jump:group([11]),attack:group([5,6,1],9),punch:group([5,6,1],9),heavy:group(identity.actionStyle==='cannon'?[5,11,1]:[5,6,1],9),low:group([4,7,1],9),throw:group([1,8,9],9),deploy:group([10]),shoot:group([5,11,1],9),reload:group([12]),optic:group([10]),recover:group([12]),blade:group([5,6,1],9),roll:group([15]),charge:group([10]),parry:group([1]),hit:group([13]),ko:group([14])};
  };
  const cannon=identity.actionStyle==='cannon';
  entries[uid]={uid,name:identity.name,game:'Metal Gear Solid: Peace Walker',incarnation:'Peace Walker equipment with hidden MSF human operator — CQC playable adaptation',coverage:'action-frames',displayHeight:identity.displayHeight,baseFrameHeight:layouts.right.sourceFrameHeight,sourceFrameHeights:Object.fromEntries(['right','left'].map(side=>[files[side],layouts[side].sourceFrameHeight])),facing:1,mirror:false,fallbackMissingActions:true,renderStyle:'painted',visualFirearmPresent:cannon,visualWeaponPresent:cannon,visualWeaponKind:cannon?'cardboard-box-cannon':null,visualBallisticMuzzlePresent:cannon,operatorCount:identity.operatorCount,actions:actions(frames.right),oppositeActions:actions(frames.left),actionMap:{light:'punch',heavy:'heavy',low:'low',throw:'throw',special:cannon?'shoot':identity.actionStyle==='ambush'?'throw':'punch',specialDown:'deploy',specialForward:cannon?'shoot':'punch',specialBack:'guard',super:cannon?'shoot':'heavy',utility:'recover'},phaseMap:Object.fromEntries(['attack','punch','heavy','low','throw','shoot','blade'].map(key=>[key,{startup:[0],active:[1],recovery:[2]}])),equipmentAdaptation:{canonicalObject:true,originalPlayableAdaptation:true,unnamedHumanOperator:true,operatorCount:identity.operatorCount,objectAppearanceReference:'physically-inspected-original-game-or-official-trailer-capture',canonicalFamilyAppearanceAttested:identity.canonicalFamilyAppearanceAttested??true,separateLoadoutModelCaptureInspected:identity.separateLoadoutModelCaptureInspected??true,sourceScope:identity.sourceScope,physicalObjectHeightStatus:'estimated-not-official',originalCanonClaimsForCombatMoves:false},review:{status:'approved',reviewer:'pass19-pw-box-original-equipment-and-native-alpha-review',reviewedAt:identity.reviewedAt,sourceKind:'original-game-capture',checks:{identity:true,costume:true,equipment:true,anatomicalSides:true,singleFigure:true,transparentBackground:true},sources:identity.referenceURLs.map(url=>({url,scope:identity.sourceScope,referenceClassification:url.includes('store.kadokawa')?'licensed-2010-physical-equipment-replica':url.includes('mgcvt')||url.includes('fandom')||url.includes('wikiwiki')?'equipment-text-reference':url.includes('4gamer')?'official-original-trailer-frame-hosted-in-2010-press-report':'original-game-capture'})),limits:['Canonical Peace Walker object appearance reproduced as a painted adaptation; exact original-game pixel-perfect fidelity is not certified.','Sixteen actual authored physical keyposes per native direction, thirty-two per equipment fighter; animation action groups deliberately reuse these keyposes.','Unnamed human operator and CQC combat animations are an original playable adaptation; no new canonical story, named identity or official combat-move claim.','Box Tank has two hidden human operators and four human boots; illustrated tank wheels are printed cardboard texture, not moving metal tracks.','Native generated PNG bytes remain unchanged. Read-only alpha bounds and optional Canvas vector clipping isolate silhouettes; no raster resampling, trimming, mirroring or alpha rewriting.','Visual reference size estimates are not official published metric dimensions.',...(identity.separateLoadoutModelCaptureInspected===false?['A family exterior is physically reference-inspected, and the loadout is equipment-text-attested. A separate loadout-specific texture capture has not been inspected; no different official texture, markings, colours or cosmetic identity is claimed.']:[])]}};
  items.push({uid,name:identity.name,operatorCount:identity.operatorCount,physicalPoses:32,files:Object.values(files),sourcePins:Object.entries(layouts).map(([side,d])=>({side,source:d.source,bytes:d.bytes,sha256:d.sha256,dimensions:d.dimensions,physicalPoseCount:d.physicalPoseCount,sourceFrameHeight:d.sourceFrameHeight,pngPixelsChanged:false})),vectorClipFrameCount:Object.values(layouts).reduce((n,d)=>n+d.poses.filter(p=>p.clipPolygon).length,0)});
}
const catalog={schema:'cqc.combat-sprites/1',entries};
const js=`/* Canonical PW equipment with explicitly original CQC playable adaptation. Native PNGs preserved. */\n(function(root){'use strict';const addition=${JSON.stringify(catalog)};const base=root.CQC_COMBAT_SPRITE_CATALOG||{schema:'cqc.combat-sprites/1',entries:{}};for(const uid of Object.keys(addition.entries))if(Object.hasOwn(base.entries,uid))throw Error('Native box identity already registered: '+uid);root.CQC_COMBAT_SPRITE_CATALOG={...base,entries:{...base.entries,...addition.entries}};root.CQC_PASS19_BOX_SPRITE_UIDS=Object.freeze(Object.keys(addition.entries));})(globalThis);\n`;
const jsPath=path.join(out,'cqc-pass19-pw-box-sprite-catalog.js');
fs.writeFileSync(jsPath,js,{flag:'wx'});
fs.writeFileSync(path.join(out,'combat-sprite-catalog-pass19-boxes.json'),JSON.stringify(catalog,null,2)+'\n',{flag:'wx'});
const context=vm.createContext({document:{currentScript:{src:'http://localhost/src/cqc-sprite-renderer.js'}},URL});
vm.runInContext(fs.readFileSync('/tmp/cqc-pass19-costume-system/cqc-sprite-renderer.js','utf8'),context);
vm.runInContext(js,context);
const configured=context.CQC_COMBAT_SPRITES.configure(context.CQC_COMBAT_SPRITE_CATALOG);
assert.equal(configured.accepted,Object.keys(entries).length);
assert.equal(configured.rejected.length,0);
const report={schema:'cqc.pass19.native-pw-box-progress/1',createdAt:new Date().toISOString(),status:'partial-generation-ongoing',approvedNativeUIDs:Object.keys(entries),approvedPhysicalPoses:items.reduce((n,e)=>n+e.physicalPoses,0),candidateCatalog:{path:jsPath,bytes:Buffer.byteLength(js),sha256:sha(js)},rendererSchemaCheck:configured,generatedNativeDirections:items.length*2,items,qualification:'Actual native PNG alpha layout plus actual renderer schema validation. Browser decode/draw and completed gameplay deployment are handled by root integration; no such claim is made here.'};
const reportPath=path.join(out,'APPROVED_NATIVE_PW_BOX_PROGRESS_V1.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n',{flag:'wx',mode:0o400});
console.log(JSON.stringify({path:reportPath,sha256:sha(fs.readFileSync(reportPath)),approvedNativeUIDs:report.approvedNativeUIDs,approvedPhysicalPoses:report.approvedPhysicalPoses,rendererSchemaCheck:configured,catalogSHA256:sha(js)}));
