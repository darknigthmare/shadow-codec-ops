import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import path from 'node:path';
const app='/tmp/cqc-pass19-application/public/cqc',out='/workspace/cqc-pass19-backlog-final';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const html=fs.readFileSync(app+'/modules/unified-versus-v055.html','utf8');
const candidates=[...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(x=>x[1]);
const selected=candidates.filter(x=>/(?:cqc-machine-parts-catalog-v1|cqc-pass16-machine-catalog|cqc-pass18-machine-catalog|cqc-pass19-(?:survive-sprite-catalog-v6|pw-box-sprite-catalog|gekko-catalog|gekko-install|roster-additions-v2))\.js$/.test(x));
const context=vm.createContext({URL,console});context.window=context;
const pins=[];
for(const rel of selected){const p=path.resolve(app+'/modules',rel),b=fs.readFileSync(p);vm.runInContext(b.toString('utf8'),context,{filename:p});pins.push({path:p,bytes:b.length,sha256:sha(b)});}
const registry=context.CQC_PASS19_ROSTER_ADDITIONS.registry,sprites=context.CQC_COMBAT_SPRITE_CATALOG.entries,rigs=context.CQC_PASS18_MACHINE_DATA.playable;
const coverage=JSON.parse(fs.readFileSync('/workspace/cqc-pass19-reference-final/COVERAGE_AND_SCALE_SOURCE_ACTUAL_V1.json','utf8'));
const active=new Set(coverage.UIDProofs.map(x=>x.uid));
const rows=registry.candidates.map(c=>({uid:c.uid,name:c.name,approvedNativeSpriteEntry:!!sprites[c.uid],approvedNativeRigMapping:rigs[c.uid]||null,activeInFinalCoverage:active.has(c.uid)}));
const reserved=rows.filter(x=>!x.activeInFinalCoverage);
for(const r of reserved){if(r.approvedNativeSpriteEntry||r.approvedNativeRigMapping)throw Error('Reserved candidate already has native body: '+r.uid);}
for(const r of rows.filter(x=>x.activeInFinalCoverage)){if(!r.approvedNativeSpriteEntry&&!r.approvedNativeRigMapping)throw Error('Known active addition has no current body binding: '+r.uid);}
if(reserved.length!==13||rows.filter(x=>x.activeInFinalCoverage).length!==19)throw Error('Registry scope changed');
const report={schema:'cqc.pass19.read-only-reserved-roster-status/1',sourceHTMLSHA256:sha(html),scope:'Exact committed APP catalogs and registry evaluated read-only in Node VM without browser, Image, fetch or generation. Current body maps are checked directly; active UID coverage is the frozen native coverage proof whose catalog sources remain SHA-pinned.',sourcePins:pins,registryCandidateCount:rows.length,activeRegistryAdditions:rows.filter(x=>x.activeInFinalCoverage).length,reservedCandidateCount:reserved.length,spriteAdditionUIDs:Object.keys(sprites),machinePlayableUIDs:Object.keys(rigs),machineDefinitionCount:context.CQC_MACHINE_PARTS_CATALOG.machines.length,rows};
const p=out+'/ROSTER_RESERVED_SOURCE_STATUS_ACTUAL_V1.json';fs.writeFileSync(p,JSON.stringify(report,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({path:p,sha256:sha(fs.readFileSync(p)),registry:rows.length,active:report.activeRegistryAdditions,reserved:reserved.length,machineDefinitions:report.machineDefinitionCount,reservedUIDs:reserved.map(x=>x.uid)}));
