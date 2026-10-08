/* Actual baseline catalogs and production renderer; decoded image doubles test routing, not source artwork. */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const baseline='/tmp/cqc-pass18-application/public/cqc',own='/tmp/cqc-pass19-costume-system';
const checks=[],storage=new Map(),imageLog=[];
class DecodedImage {
 naturalWidth=2048;naturalHeight=2048;decoding='async';onload=null;onerror=null;_src='';
 set src(url){this._src=url;if(!url)return;imageLog.push(url);if(url.includes('part-')){this.naturalWidth=12;this.naturalHeight=20;}queueMicrotask(()=>url.includes('missing-part')?this.onerror?.():this.onload?.());}
 get src(){return this._src;}
 decode(){return Promise.resolve();}
}
const context={URL,Image:DecodedImage,queueMicrotask,console,localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},addEventListener(){}};
context.globalThis=context;context.window=context;vm.createContext(context);
const run=(path)=>vm.runInContext(fs.readFileSync(path,'utf8'),context,{filename:path});
const html=fs.readFileSync(baseline+'/modules/unified-versus-v055.html','utf8');
const catalogs=[...html.matchAll(/<script[^>]+src="([^" ]+)"/g)].map(match=>match[1]).filter(file=>/sprite-catalog|costume-catalog|acid-native-costumes|machine-catalog|machine-parts-catalog|incarnation-scale|roster-presentation/.test(file));
for(const file of catalogs)run(baseline+'/modules/'+file);
run(own+'/cqc-pass19-costume-parts.js');run(own+'/cqc-pass19-pixel-style.js');run(own+'/cqc-sprite-renderer.js');
const sprites=context.CQC_COMBAT_SPRITES,originalCatalogJSON=JSON.stringify(context.CQC_COMBAT_SPRITE_CATALOG);
assert.equal(sprites.configure(context.CQC_COMBAT_SPRITE_CATALOG,{baseURL:'https://fixture.invalid/'}).accepted,338);
assert.equal(sprites.configureCostumes(context.CQC_COMBAT_COSTUME_CATALOG).accepted,7);
run(baseline+'/src/cqc-pass17-costumes.js');run(own+'/cqc-pass19-costume-request-data.js');run(own+'/cqc-pass19-costumes.js');
const wardrobe=context.CQC_PASS19_COSTUMES,choices=context.CQC_COSTUMES_PASS17;
assert.equal(wardrobe.report().identities,355);assert.equal(wardrobe.report().readyNativeVariants,7);
assert.equal(choices.optionsFor('core__solid').length,1);assert.equal(choices.select(0,'core__solid','cyborg'),false);
assert.equal(sprites.getEntry('core__solid',{costume:'cyborg'}),null);assert.equal(await sprites.whenReady('core__solid',{costume:'cyborg'}),false);
assert.equal((await wardrobe.prepareSlots([{uid:'core__solid',costume:'cyborg'},{uid:'core__solid'}])).ready,false);
checks.push('Pending art is not selectable or ready, and does not resolve to the original atlas.');
assert.equal(wardrobe.requestFor('core__raiden_mgs2','cyborg').status,'pending-art');
assert.equal(wardrobe.requestFor('archive__raiden_vr','cyborg').status,'pending-art');
assert.equal(wardrobe.requestFor('archive__fox_plus','cyborg').status,'pending-art');
assert.equal(wardrobe.requestFor('core__sam','cyborg').status,'pending-art');
assert.equal(wardrobe.requestFor('core__raiden_mgs4','cyborg').status,'not-applicable');
assert.equal(wardrobe.requestFor('archive__virgil_at9','cyborg').status,'not-applicable');
assert.equal(wardrobe.requestFor('archive__captain','survive').status,'not-applicable');
checks.push('Applicability distinguishes biological incarnations, existing cyborgs, robots and Survive natives.');
function fixture(uid,id,family='cyborg'){
 const right='assets/fixture/'+uid+'/'+id+'-right.png',left='assets/fixture/'+uid+'/'+id+'-left.png';
 const frame=file=>({file,sha256:crypto.createHash('sha256').update(file).digest('hex'),rect:[0,0,40,80],pivot:[.5,1]});
 const action=file=>({fps:0,loop:false,frames:[frame(file)]});
 const source={url:'https://fixture.invalid/source-reference',scope:'Adapter test identity only; no physical artwork or canon attestation.'};
 return{uid,option:{id,family,label:id,sprite:{uid,name:uid,game:'test fixture',incarnation:'Test fixture only',coverage:'static-pose',displayHeight:220,baseFrameHeight:80,facing:1,mirror:false,renderStyle:'painted',actions:{idle:action(right),guard:action(right)},oppositeActions:{idle:action(left),guard:action(left)},review:{status:'approved',reviewer:'routing-test',reviewedAt:'2026-10-08',sourceKind:'original-character',checks:{identity:true,costume:true,equipment:true,anatomicalSides:true,singleFigure:true,transparentBackground:true},sources:[source],limits:['Synthetic geometry fixture, no physical asset or canon verification.']},costumeConcept:{schema:'cqc.costume-design/1',sourceUID:uid,family,originalDesign:true,canonicalAppearanceAttested:false}},provenance:{kind:'original-character-costume',sourceUID:uid,originalDesign:true,canonicalAppearanceAttested:false,sources:[source]},assetReview:{status:'verified',independentArt:true,reviewer:'routing-test',reviewedAt:'2026-10-08'}}};
}
const cyborg=fixture('core__solid','cyborg'),survive=fixture('core__solid','survive','survive');
assert.equal(sprites.validateEntry(cyborg.uid,cyborg.option.sprite),false);
assert.equal(sprites.validateCostumeEntry(cyborg.uid,cyborg.option.sprite),true);
assert.equal(wardrobe.registerBatch([cyborg,survive]).accepted,2);
assert.equal(choices.select(0,'core__solid','cyborg'),true);assert.equal(choices.select(1,'core__solid','survive'),true);
const originalFighter=Object.freeze({uid:'core__solid',combat:Object.freeze({health:100}),name:'Solid Snake'});
const player=choices.fighterFor(originalFighter,0),opponent=choices.fighterFor(originalFighter,1);
assert.equal(player.costume,'cyborg');assert.equal(opponent.costume,'survive');assert.equal(originalFighter.costume,undefined);assert.equal(player.combat,originalFighter.combat);
assert.equal(choices.snapshot().slots[0].core__solid,'cyborg');assert.equal(choices.snapshot().slots[1].core__solid,'survive');
checks.push('Two slots use distinct arbitrary costume IDs with shared immutable combat data and independent saved choices.');
const late=wardrobe.prepareSlots([player,opponent],{owner:'fixture-match'});wardrobe.cancel('fixture-match');assert.equal((await late).ready,false);
const prepared=await wardrobe.prepareSlots([player,opponent],{owner:'fixture-match'});assert.equal(prepared.ready,true);
assert.equal(sprites.status('core__solid',{costume:'cyborg'}).ready,true);assert.equal(sprites.status('core__solid',{costume:'survive'}).ready,true);
checks.push('Decoded readiness covers both directions; superseded or cancelled launch cannot resume.');
const draws=[],canvas={save(){},restore(){},translate(){},scale(){},rotate(){},drawImage(image,...args){draws.push({url:image.src,args});}};
for(const face of [1,-1]){assert.equal(sprites.draw(canvas,player,10,20,face,1,{time:0,entityKey:'p1'}),true);assert.equal(sprites.draw(canvas,opponent,10,20,face,1,{time:0,entityKey:'p2'}),true);}
assert.equal(new Set(draws.map(draw=>draw.url)).size,4);assert.equal(draws.length,4);
checks.push('Actual sprite renderer draws separate costume sources in both anatomical directions.');
const invalid=fixture('core__raiden_mgs4','cyborg');assert.throws(()=>wardrobe.registerBatch([invalid]),/non applicable/);assert.equal(wardrobe.report().readyNativeVariants,9);
const batchA=fixture('core__solid','tuxedo','tuxedo'),batchBad=fixture('core__solid','broken','survive');batchBad.option.assetReview.status='unverified';assert.throws(()=>wardrobe.registerBatch([batchA,batchBad]));assert.equal(wardrobe.optionFor('core__solid','tuxedo'),null);
checks.push('Rejected provenance and non-applicable variants leave the live catalog unchanged.');
const composed=fixture('core__solid','metalgear','metalgear'),partFile='assets/fixture/part-missing-part.png';
composed.option.sprite.costumeParts={schema:'cqc.costume-native-parts/1',identityUID:'core__solid',family:'metalgear',canonicalAppearanceAttested:false,reviewedBindings:true,identityDesign:{authoredPerIdentity:true,bodyPlan:'Snake-led biped concept fixture',signature:['bandana-like sensor cover','sneaking-suit chest silhouette'],palette:['#233545','#91a7b0']},sources:{plate:{file:partFile,sha256:'d'.repeat(64),width:12,height:20}},bindings:{}};
for(const action of [...Object.values(composed.option.sprite.actions),...Object.values(composed.option.sprite.oppositeActions)])for(const frame of action.frames)composed.option.sprite.costumeParts.bindings[context.CQC_PASS19_COSTUME_PARTS.key(frame)]=[{source:'plate',position:[.5,.3],pivot:[.5,.5],size:[.5,.3],angle:0}];
assert.equal(wardrobe.registerBatch([composed]).accepted,1);assert.equal(await wardrobe.whenReady({uid:'core__solid',costume:'metalgear'}),false);assert.equal(sprites.status('core__solid',{costume:'metalgear'}).ready,false);assert.equal(sprites.draw(canvas,{uid:'core__solid',costume:'metalgear'},0,0,1,1,{}),false);
checks.push('An unavailable authored part prevents readiness and costume rendering; it cannot flash an original body.');
const completeParts=fixture('core__solid','metalgear-available','metalgear');
completeParts.option.sprite.costumeParts=JSON.parse(JSON.stringify(composed.option.sprite.costumeParts));completeParts.option.sprite.costumeParts.sources.plate.file='assets/fixture/part-available.png';completeParts.option.sprite.costumeParts.bindings={};
for(const action of [...Object.values(completeParts.option.sprite.actions),...Object.values(completeParts.option.sprite.oppositeActions)])for(const frame of action.frames)completeParts.option.sprite.costumeParts.bindings[context.CQC_PASS19_COSTUME_PARTS.key(frame)]=[{source:'plate',position:[.5,.3],pivot:[.5,.5],size:[.5,.3],angle:0}];
wardrobe.registerBatch([completeParts]);const completeFighter={uid:'core__solid',costume:'metalgear-available'};sprites.retainFighters([completeFighter]);assert.equal(await wardrobe.whenReady(completeFighter),true);const drawStart=draws.length;assert.equal(sprites.draw(canvas,completeFighter,0,0,1,1,{}),true);assert.equal(draws.length-drawStart,2);assert.equal(draws.at(-1).url,'https://fixture.invalid/assets/fixture/part-available.png');
checks.push('A decoded authored part is actually drawn with its reviewed anatomical binding over the native body.');
context.CQC_PASS16_CORE_SPRITES={poseFor:()=>({time:0,actionTime:0})};context.CQC_PASS19_WORLD_SCALE={displayHeightFor:()=>242};run(own+'/cqc-pass17-core-costumes.js');
const state={fighters:[{id:'solid',slot:0},{id:'solid',slot:1}],options:{costumes:['cyborg','survive']}};context.CQC_PASS17_CORE_COSTUMES.applyActors(state);assert.equal(state.fighters[0].costume,'cyborg');assert.equal(state.fighters[1].costume,'survive');assert.equal(context.CQC_PASS17_CORE_COSTUMES.drawActor(canvas,state.fighters[0],0),true);
checks.push('Core private actors retain arbitrary variant IDs and use the world-scale hook.');
const machineCalls=[];context.CQC_PASS18_MACHINES={hasComposite:uid=>uid==='completion__gekko_mgs4',drawPlayable:(c,f)=>(machineCalls.push(f.uid),true),drawPortrait:(c,uid)=>(machineCalls.push(uid),true),whenReady:()=>Promise.resolve(true)};run(own+'/cqc-pass19-machine-costume-routing.js');
const gekko=fixture('completion__gekko_mgs4','retro','retro');wardrobe.registerBatch([gekko]);
assert.equal(context.CQC_PASS18_MACHINES.hasComposite({uid:gekko.uid}),true);assert.equal(context.CQC_PASS18_MACHINES.hasComposite({uid:gekko.uid,costume:'retro'}),false);assert.equal(context.CQC_PASS18_MACHINES.drawPlayable(canvas,{uid:gekko.uid,costume:'retro'}),false);assert.equal(machineCalls.length,0);
checks.push('Mechanical original and native costume route independently by full fighter object, including same-UID match slots.');
assert.equal(JSON.stringify(context.CQC_COMBAT_SPRITE_CATALOG),originalCatalogJSON);
assert.equal(sprites.configureCostumes(context.CQC_COMBAT_COSTUME_CATALOG).rejected.length,0);
checks.push('Original sprite catalog remains byte-identical in memory and seven historical variants remain accepted.');
const report={schema:'cqc.pass19.costume-routing-qa/1',status:'passed',checks,baselineSprites:338,baselineCostumeVariants:7,sourceArtVerified:false,testScope:'Production catalog and renderer code exercised with decoded-image doubles. Validates routing, slot isolation, cancellation, provenance boundaries and missing asset handling; no physical PNG/canon fidelity certification.',helperSHA256:crypto.createHash('sha256').update(fs.readFileSync(import.meta.filename)).digest('hex'),moduleHashes:Object.fromEntries(['cqc-sprite-renderer.js','cqc-pass19-costumes.js','cqc-pass19-costume-parts.js','cqc-pass19-pixel-style.js','cqc-pass17-core-costumes.js','cqc-pass19-machine-costume-routing.js','cqc-pass19-costume-request-data.js'].map(name=>[name,crypto.createHash('sha256').update(fs.readFileSync(own+'/'+name)).digest('hex')]))};
fs.writeFileSync(own+'/COSTUME_ROUTING_ACTUAL_CODE_QA_V2.json',JSON.stringify(report,null,2)+'\n',{flag:'wx',mode:0o400});console.log(JSON.stringify(report));
