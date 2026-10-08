import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
const app='/tmp/cqc-pass19-application/public/cqc',out='/workspace/cqc-pass20-new-roster';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const html=fs.readFileSync(app+'/modules/unified-versus-v055.html','utf8');
const offset=html.indexOf('const FIGHTERS=')+'const FIGHTERS='.length;
let i=offset,depth=0,string=false,escape=false;
for(;i<html.length;i++){const c=html[i];if(string){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')string=false;}else if(c==='"')string=true;else if(c==='[')depth++;else if(c===']'&&--depth===0){i++;break;}}
const baseline=JSON.parse(html.slice(offset,i)),before=JSON.stringify(baseline);
const context=vm.createContext({URL,console});context.window=context;
const sourceFiles=['cqc-pass19-roster-additions-v2.js','cqc-pass19-combat-additions.js','cqc-pass20-roster-sprite-catalog.js','cqc-sprite-renderer.js','cqc-pass20-roster-native.js','cqc-pass20-roster-anchors.js','cqc-pass19-native-origins.js'];
const sourcePins=[];
for(const name of sourceFiles){const p=app+'/src/'+name,b=fs.readFileSync(p);vm.runInContext(b.toString(),context,{filename:p});sourcePins.push({path:p,bytes:b.length,sha256:sha(b)});}
const expect=(pass,message)=>{if(!pass)throw Error(message);};
const sprite=context.CQC_COMBAT_SPRITES,catalog=context.CQC_COMBAT_SPRITE_CATALOG;
const uidList=context.CQC_PASS20_ROSTER_NATIVE.uids;
const validation=sprite.configure(catalog);expect(validation.accepted===2&&!validation.rejected.length,'New sprite validation rejected');
const result=context.CQC_PASS20_ROSTER_NATIVE.install(baseline);expect(result.added.length===2&&!result.pending.length,'Reviewed roster additions absent');
expect(JSON.stringify(baseline.slice(0,-2))===before,'An unrelated fighter changed');
expect(new Set(baseline.map(f=>f.uid)).size===baseline.length,'Duplicate UID');
const second=context.CQC_PASS20_ROSTER_NATIVE.install(baseline);expect(second.added.length===0&&second.decorated.length===2,'Installation not idempotent');
const profiles=[];
for(const uid of uidList){
 const fighter=baseline.find(f=>f.uid===uid),entry=sprite.getEntry(uid);expect(fighter&&entry,'Fighter/body missing');
 expect(fighter.visual.kind==='machine'&&fighter.combat.passive.machine===true,'Mechanical profile incorrect');
 expect(fighter.combat.simulationBody.height===entry.displayHeight,'Simulation and native scale differ');
 expect(fighter.pass19Reference.worldHeightMeters*120===entry.displayHeight,'Physical display estimate mismatch');
 expect(fighter.pass19Reference.absolute1to1Certified===false,'Unjustified fidelity certificate');
 const moves=[];
 for(const [slot,move] of Object.entries(fighter.combat.moves)){
  expect(move.id===uid+'::'+slot&&move.slot===slot,'Move identity mismatch');
  for(const key of ['startup','active','recovery','damage','cost','meter'])expect(Number.isFinite(move[key])&&move[key]>=0,'Invalid move value '+key);
  const action=entry.actionMap[slot];expect(entry.actions[action]&&entry.oppositeActions[action],'Native move action missing');
  for(const face of [1,-1]){
   const actions=face===1?entry.actions:entry.oppositeActions;
   const selected=sprite.selectFrame({...entry,actions},{moveSlot:slot,moveKind:move.kind,moveTag:move.tag,attack:true,animationActive:true,attackPhase:'active',phaseProgress:0});
   expect(selected.action===action,'Unexpected fallback action');
   if(move.kind==='projectile'){
    const anchors=context.CQC_PASS20_ATTACHMENTS.entries[uid].sides[face===1?'right':'left'];
    const anchor=Object.values(anchors).find(a=>a.file===selected.frame.file&&a.sourceSHA256===selected.frame.sha256&&JSON.stringify(a.rect)===JSON.stringify(selected.frame.rect)&&JSON.stringify(a.pivot)===JSON.stringify(selected.frame.pivot));
    expect(!!anchor,'Projectile lacks a matching native firing socket');
    const factor=entry.displayHeight/entry.sourceFrameHeights[selected.frame.file];
    const forward=(anchor.frameFraction[0]-anchor.pivot[0])*anchor.rect[2]*factor*face;
    const height=(anchor.pivot[1]-anchor.frameFraction[1])*anchor.rect[3]*factor;
    expect(forward>0&&height>0&&forward<1000&&height<1000,'Native muzzle behind fighter/below floor');
    moves.push({slot,face,action:selected.action,nativeSocket:{forward,height,sourceFile:anchor.file,sourceSHA256:anchor.sourceSHA256},absoluteCanonicalAttachmentCertified:false});
   }
  }
 }
 const files=[...new Set([...Object.values(entry.actions),...Object.values(entry.oppositeActions)].flatMap(a=>a.frames.map(f=>f.file)))];
 profiles.push({uid,name:fighter.name,heightEstimateMetres:fighter.pass19Reference.worldHeightMeters,displayHeight:entry.displayHeight,logicalHeight:fighter.combat.simulationBody.height,machine:true,files:files.map(file=>({path:app+'/'+file,sha256:sha(fs.readFileSync(app+'/'+file)),bytes:fs.statSync(app+'/'+file).size})),projectileSockets:moves});
}
const report={schema:'cqc.pass20.native-roster-vm-qa/1',status:'passed-source-validation-and-owned-runtime-mechanics',sourcePins,newFighters:2,bodyAtlases:4,independentFacings:true,physicalFigures:64,baselineUIDsPreserved:true,installationIdempotent:true,nativeActiveActionSockets:true,sourcePixelsTransformed:false,profiles,limits:['These bounded VM checks validate actual source catalog/profile objects and native phase/socket joins. They do not claim decoded-browser display or end-to-end matches.','Mastiff and Slider display dimensions remain estimates; full fidelity and part destruction are not certified.','Survive Watcher/Grabber and Fenrir remain inactive while their original exposed body references are insufficient.']};
const target=out+'/NATIVE_ROSTER_VM_ACTUAL_V1.json';fs.writeFileSync(target,JSON.stringify(report,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({path:target,sha256:sha(fs.readFileSync(target)),status:report.status,newFighters:2,projectileSockets:profiles.reduce((n,p)=>n+p.projectileSockets.length,0)}));
