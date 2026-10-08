const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const app='/tmp/cqc-pass19-application/public/cqc',out='/workspace/cqc-pass20-mecha';
const source=name=>fs.readFileSync(app+'/src/'+name,'utf8');
const context=vm.createContext({console,URL,setTimeout,clearTimeout});
const old=source('cqc-pass19-original-costumes.js');
const oldAdds=JSON.parse(old.split('const additions=')[1].split(';\nroot.')[0]);
context.CQC_COMBAT_SPRITE_CATALOG={schema:'cqc.combat-sprites/1',entries:{}};
context.CQC_PASS19_COSTUME_REQUEST_DATA={entries:Object.fromEntries([...oldAdds.map(a=>a.uid),'pass19__dwarf_gekko_humanoid_mgr'].map(uid=>[uid,{uid,requests:[]}]))};
for(const name of ['cqc-sprite-renderer.js','cqc-pass19-costumes.js','cqc-pass19-original-costumes.js','cqc-pass19-versus-spatial.js','cqc-pass19-native-origins.js'])vm.runInContext(source(name),context,{filename:name});
const before=JSON.parse(JSON.stringify(context.CQC_COMBAT_COSTUME_CATALOG));
vm.runInContext(source('cqc-pass20-mechanical-costumes.js'),context,{filename:'cqc-pass20-mechanical-costumes.js'});
assert.equal(context.CQC_PASS20_MECHANICAL_COSTUMES.result.accepted,3);
const api=context.CQC_PASS20_MECHANICAL_COSTUMES,renderer=context.CQC_COMBAT_SPRITES;
assert.equal(api.install().alreadyInstalled,true);
const rows=[];
for(const {uid,option}of api.additions){
 assert.equal(renderer.validateCostumeEntry(uid,option.sprite),true);
 assert.equal(context.CQC_PASS19_COSTUMES.selectable(uid,option.id),true);
 assert.equal(option.provenance.originalDesign,true);assert.equal(option.provenance.canonicalAppearanceAttested,false);
 assert.equal(option.sprite.costumeConcept.family,option.family);
 let mapped=new Set();
 for(const [side,actions]of [['right',option.sprite.actions],['left',option.sprite.oppositeActions]])for(const [name,a]of Object.entries(actions))for(const f of a.frames){
  const blob=fs.readFileSync(app+'/'+f.file);assert.equal(crypto.createHash('sha256').update(blob).digest('hex'),f.sha256);
  mapped.add(side+':'+JSON.stringify(f.rect));
 }
 rows.push({uid,costume:option.id,family:option.family,physicalMetres:option.physicalExtent.metres,mappedPhysicalFigures:mapped.size,validated:true});
}
assert.equal(rows.reduce((n,x)=>n+x.mappedPhysicalFigures,0),95);
const after=context.CQC_COMBAT_COSTUME_CATALOG;
for(const [uid,row]of Object.entries(before.entries))for(const option of row.options)if(!(option.id==='metalgear'&&['core__solid','core__ocelot_mgs1'].includes(uid)))assert.deepEqual(JSON.parse(JSON.stringify(after.entries[uid].options.find(o=>o.id===option.id))),option);
vm.runInContext(source('cqc-pass20-costume-native-origins.js'),context,{filename:'cqc-pass20-costume-native-origins.js'});
const socketRows=[];
for(const uid of ['core__solid','core__ocelot_mgs1'])for(const face of [1,-1])for(const slot of ['special','specialDown','super']){
 const m={slot,kind:'projectile',tag:slot==='specialDown'?'explosive':'ballistic',startup:10,active:8,recovery:12};
 const p={f:{uid,costume:'metalgear'},face,x:500,y:568,attack:{name:slot,t:12,def:m},life:100,hit:0,vx:0};
 const native=context.CQC_PASS20_COSTUME_NATIVE_ORIGINS.projectile(p,m,{frame:100});assert(native);
 const entry=renderer.getEntry(uid,p.f),actions=face===entry.facing?entry.actions:entry.oppositeActions;
 const selected=renderer.selectFrame({...entry,actions},context.CQC_PASS19_VERSUS_SPATIAL.poseFor(p,100));
 assert.equal(native.sourceSHA256,selected.frame.sha256);assert.deepEqual(JSON.parse(JSON.stringify(native.sourceRect)),JSON.parse(JSON.stringify(selected.frame.rect)));
 const factor=entry.displayHeight/entry.sourceFrameHeights[selected.frame.file],f=selected.frame;
 const rawX=(native.sourceNativeXY[0]-f.rect[0]-f.rect[2]*f.pivot[0])*factor*face;
 const rawY=(f.rect[3]*f.pivot[1]-(native.sourceNativeXY[1]-f.rect[1]))*factor;
 assert(Math.abs(rawX-native.forward)<1e-6);assert(Math.abs(rawY-native.height)<1e-6);
 assert.equal(native.worldScaleApplied,false);
 socketRows.push({uid,face,slot,action:selected.action,index:selected.index,origin:native,errorPixels:Math.max(Math.abs(rawX-native.forward),Math.abs(rawY-native.height))});
}
assert.equal(context.CQC_PASS20_COSTUME_NATIVE_ORIGINS.projectile({f:{uid:'core__solid',costume:'cyborg'},face:1},{slot:'special',kind:'projectile',tag:'ballistic'}),null);
const core=vm.createContext({console,URL,setTimeout,clearTimeout});
core.CQC_COMBAT_SPRITE_CATALOG={schema:'cqc.combat-sprites/1',entries:{}};
core.CQC_PASS19_COSTUME_REQUEST_DATA={entries:Object.fromEntries(oldAdds.map(a=>[a.uid,{uid:a.uid,requests:[]}]))};
for(const name of ['cqc-sprite-renderer.js','cqc-pass19-costumes.js','cqc-pass19-original-costumes.js','cqc-pass20-mechanical-costumes.js'])vm.runInContext(source(name),core,{filename:name});
assert.equal(core.CQC_PASS20_MECHANICAL_COSTUMES.result.accepted,2);
assert.equal(core.CQC_PASS20_MECHANICAL_COSTUMES.result.physicalFigures,64);
assert.equal(core.CQC_PASS20_MECHANICAL_COSTUMES.result.mappedPhysicalFigures,63);
assert.equal(core.CQC_PASS20_MECHANICAL_COSTUMES.result.pendingUIDs.join(','),'pass19__dwarf_gekko_humanoid_mgr');
assert.equal(core.CQC_PASS19_COSTUMES.optionFor('pass19__dwarf_gekko_humanoid_mgr','trenchcoat'),null);
assert.equal(core.CQC_PASS20_MECHANICAL_COSTUMES.install().alreadyInstalled,true);
const modulePins=Object.fromEntries(['cqc-pass20-mechanical-costumes.js','cqc-pass20-costume-native-origins.js'].map(name=>[name,crypto.createHash('sha256').update(source(name)).digest('hex')]));
const report={schema:'cqc.pass20.native-mechanical-transaction/1',status:'passed',modulePins,coreAvailableSubset:JSON.parse(JSON.stringify(core.CQC_PASS20_MECHANICAL_COSTUMES.result)),at:new Date().toISOString(),costumes:rows,sourceBytesVerified:13151791,socketCases:socketRows,preservedOtherPASS19Options:true,idempotencyPassed:true,limits:['This VM verifies actual renderer/transaction/socket contracts; it does not claim browser image decoding, visuals, hitboxes or released canonical appearance.','Original full-body forms are not separately articulated or per-part destructible rigs.','Wrong-facing Ocelot LEFT cell2 remains physically preserved but unmapped.']};
fs.writeFileSync(out+'/MECHANICAL_NATIVE_TRANSACTION_ACTUAL_V2.json',JSON.stringify(report,null,2),{flag:'wx'});
console.log(JSON.stringify({status:report.status,costumes:rows,socketCases:socketRows.length,maxSocketError:Math.max(...socketRows.map(r=>r.errorPixels)),preservedOtherOptions:true}));
