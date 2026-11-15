'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const api=require('../src/cqc-sprite-renderer.js');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/combat-sprite-catalog-v1.json')));
const frozen=JSON.parse(fs.readFileSync(path.join(root,'recovery/pass6-before-native-sprite-integration/FROZEN_PASS5_SPRITES.json')));
const newUIDs=['core__pain','core__fear','core__end','core__fury'];
const sets=e=>[...Object.values(e.actions),...Object.values(e.oppositeActions||{})];
const distinct=e=>new Set(sets(e).flatMap(a=>a.frames.map(f=>JSON.stringify([f.file,f.rect]))));
const digest=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');

test('eighteen prior approved sprite entries and 108 original PNGs retain exact PASS5 contents',()=>{
  assert.equal(frozen.entryCount,18);assert.equal(frozen.existingPNGFiles.length,108);
  for(const [uid,entry] of Object.entries(frozen.existingEntries)) assert.deepEqual(catalog.entries[uid],entry,uid);
  for(const row of frozen.existingPNGFiles){assert.equal(fs.statSync(path.join(root,row.path)).size,row.bytes);assert.equal(digest(row.path),row.sha256,row.path);}
});

test('four original PS2 UIDs add twenty-four independent sources and 288 authored poses to total 22/132/1584',()=>{
  assert.equal(Object.keys(catalog.entries).length,22);
  assert.deepEqual(api.configure(catalog),{accepted:22,rejected:[]});
  const allFiles=new Set();let allPoses=0;
  for(const e of Object.values(catalog.entries)){allPoses+=distinct(e).size;for(const a of sets(e))for(const f of a.frames)allFiles.add(f.file);}
  assert.equal(allFiles.size,132);assert.equal(allPoses,1584);
  for(const uid of newUIDs){
    const e=catalog.entries[uid];assert.equal(e.uid,uid);assert.equal(e.mirror,false);assert.equal(distinct(e).size,72);
    assert.match(e.game+' '+e.incarnation,/MGS3|Metal Gear Solid 3/i);assert.match(e.incarnation,/PlayStation 2|PS2/i);
    const files=new Set(sets(e).flatMap(a=>a.frames.map(f=>f.file)));assert.equal(files.size,6);
    assert.equal(new Set([...files].map(digest)).size,6,'each independent facing/sheet must retain different native PNG bytes');
    for(const a of sets(e))for(const f of a.frames){assert.ok(f.file.startsWith('assets/combat-sprites/'+uid+'/'));assert.equal(digest(f.file),f.sha256);assert.ok(e.sourceFrameHeights[f.file]>0);}
  }
});

test('all ten real move slots select their reviewed startup, active and recovery frames in both independent facings',()=>{
  const profiles=JSON.parse(fs.readFileSync(path.join(root,'data/combat-profiles-v053.json'))).profiles;
  for(const uid of newUIDs){
    const e=catalog.entries[uid];assert.deepEqual(Object.keys(e.actionMap).sort(),Object.keys(profiles[uid].moves).sort());
    for(const actions of [e.actions,e.oppositeActions]){
      for(const state of ['idle','guard','walk','crouch','hit','ko'])assert.ok(actions[state]?.frames.length,uid+' '+state);
      for(const [slot,action] of Object.entries(e.actionMap))for(const phase of ['startup','active','recovery'])for(const progress of [0,.5,.999,1]){
        assert.ok(e.phaseMap[action]?.[phase]?.length,uid+' '+slot+' '+phase);
        const chosen=api.selectFrame({...e,actions},{moveSlot:slot,animationActive:true,attackPhase:phase,phaseProgress:progress});
        assert.equal(chosen.action,action);assert.ok(e.phaseMap[action][phase].includes(chosen.index));assert.equal(chosen.frame,actions[action].frames[chosen.index]);
      }
    }
  }
});

test('reviewed canonical reference bytes remain attached to each exact original PS2 incarnation',()=>{
  for(const uid of newUIDs){
    const e=catalog.entries[uid];assert.equal(e.review.status,'approved');assert.ok(e.review.limits.length);
    assert.ok(e.review.sources.length);
    for(const source of e.review.sources){assert.match(source.url,/^https:\/\//);assert.equal(digest(source.file),source.sha256,uid+' '+source.file);}
  }
});

test('new original MGS3 combat art cannot silently replace another incarnation or a nickname alias',()=>{
  api.configure(catalog);
  for(const uid of ['roster51__pain_delta','roster51__fear_delta','roster51__end_delta','roster51__fury_delta','oc__pain']){
    assert.equal(api.status(uid).renderer,'procedural-canvas',uid);
    assert.equal(api.validateEntry(uid,catalog.entries.core__pain),false,uid);
  }
});
