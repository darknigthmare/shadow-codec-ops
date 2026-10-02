const fs=require('fs'),assert=require('assert');
const api=require('/workspace/cqc-pass6-finisher-proposal.js');const fidelity=require('/workspace/cqc-pass6-combat-fidelity.draft.js');
const before=JSON.parse(fs.readFileSync('/workspace/cqc-pass6-finisher-review-input.json'));const catalog=structuredClone(before);
const fighters=JSON.parse(fs.readFileSync('/workspace/cqc-game-working/cqc-versus-v056/data/unified-roster-v053.json')).fighters;fidelity.apply(fighters);
const changed=api.applyFinishers(catalog,fighters);let assertions=0;function ok(v,msg){assert(v,msg);assertions++}
ok(changed.length===6);ok(Object.keys(catalog.profiles).length===354);ok(Object.values(catalog.familyCounts).reduce((a,b)=>a+b,0)===354);
let untouched=0;for(const uid of Object.keys(before.profiles))if(!changed.includes(uid)){ok(JSON.stringify(before.profiles[uid])===JSON.stringify(catalog.profiles[uid]),uid+' unaffected');untouched++}
for(const uid of changed){const orig=before.profiles[uid],now=catalog.profiles[uid];ok(now.finishers.length===4);for(let i=0;i<4;i++){const a=orig.finishers[i],b=now.finishers[i];for(const k of ['id','index','slot','commandP1','commandP2','duration','camera','tone','victimRule','rating','gore','canonical','evidence'])ok(a[k]===b[k],uid+' '+k+' retained');ok(b.canonical===false);ok(b.evidence==='adaptation')}}
for(const uid of ['core__pain','core__redblaster_mg2'])for(const fin of catalog.profiles[uid].finishers){ok(!fin.phases.some(p=>['lift','orbit','psychic','plant'].includes(p)));for(let i=0;i<4;i++){let pose=api.finisherPose(uid,fin,fin.phases[i],{},(i+.5)/4);ok(pose.animationActive===true);ok(['startup','active','recovery'].includes(pose.attackPhase));ok(pose.phaseProgress>=0&&pose.phaseProgress<=1)}}
ok(catalog.profiles.core__pain.family==='ballistic');ok(catalog.profiles.core__redblaster_mg2.finishers[1].family==='trap');
ok(!/Bullet Bee/.test(catalog.profiles.core__pain.finishers.map(f=>f.name+' '+f.sourceMoves).join(' ')),'no masked phase2 move label');
ok(!/force mentale, soulev|soulevée puis|immobilisée par une force mentale/.test(catalog.profiles.core__pain.finishers.map(f=>f.description).join(' ')),'no inherited mental-lift description');
const after1=JSON.stringify(catalog);api.applyFinishers(catalog,fighters);ok(JSON.stringify(catalog)===after1,'idempotent');
const pose={attack:true};ok(api.finisherPose('core__fear',{},'volley',pose,.5)===pose,'non-target pose untouched');
const result={status:'passed',assertions,unchangedProfiles:untouched,changedProfiles:changed,profileCount:354,finisherCount:1416,familyCountsAfter:catalog.familyCounts,scope:'Proposal metadata/pose routing only; no browser visual proof claimed',earlierFixtureCorrection:'Initial inline negative fixture wrongly rejected explicit exclusion sentence mentioning Bullet Bee; corrected to reject actual move names/sourceMoves and positive inherited mental-lift description.'};
fs.writeFileSync('/workspace/cqc-pass6-finisher-proposal-qa.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
