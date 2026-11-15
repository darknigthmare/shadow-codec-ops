// Parse source AST and interpret data-literal nodes only. Product JS is never executed.
import fs from 'node:fs/promises';
import {constants} from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {parse} from './parser-deps/node_modules/acorn/dist/acorn.mjs';
const B='/workspace/cqc-p43-resume-20261025/qa',P='/workspace/cqc-pass21-application/public/cqc/modules/core-v032.html';
const sha=b=>createHash('sha256').update(b).digest('hex');
async function read(p){const f=await fs.open(p,constants.O_RDONLY|constants.O_NOATIME);try{return await f.readFile();}finally{await f.close();}}
const sourceBytes=await read(P),html=sourceBytes.toString('utf8'),capturePath=B+'/actual-current-contracts-v1/core-current-contracts-v1.json',captureBytes=await read(capturePath),capture=JSON.parse(captureBytes);
assert.equal(sha(captureBytes),'9f2d6717f0929c927128d4476ba1d459c5158813af7591d13a4418536047e7d3');
const declarations=new Map(),functions=new Map(),parseRecords=[],assignmentCalls=[];
const declarationNames=['move','MOVES','FIGHTER_MOVES','ROSTER','EXPANSION022_DATA','COMPLEMENTS023_DATA','COMPLEMENTS024_DATA'];
let scriptNumber=0;
for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
 if(/\bsrc\s*=/.test(match[1])||/\btype\s*=\s*["']application\/(?:ld\+)?json/i.test(match[1]))continue;
 const text=match[2];if(!text.trim())continue;
 const ast=parse(text,{ecmaVersion:'latest',sourceType:/type\s*=\s*["']module/.test(match[1])?'module':'script',locations:true});
 parseRecords.push({scriptNumber:scriptNumber++,bytes:Buffer.byteLength(text),sha256:sha(text)});
 const stack=[ast];while(stack.length){const n=stack.pop();if(!n||typeof n!=='object')continue;
  if(n.type==='VariableDeclarator'&&declarationNames.includes(n.id?.name)&&
    (n.id.name!=='move'||n.init?.type==='ArrowFunctionExpression'&&JSON.stringify(n.init.params.map(p=>p.name||p.left?.name))===JSON.stringify(['startup','active','recovery','damage','reach','props']))){assert(!declarations.has(n.id.name),'Repeated declaration '+n.id.name);declarations.set(n.id.name,{node:n.init,text:text.slice(n.start,n.end),scriptSHA256:sha(text),loc:n.loc});}
  if(n.type==='CallExpression'&&n.callee?.type==='MemberExpression'&&!n.callee.computed&&n.callee.object?.name==='Object'&&n.callee.property?.name==='assign'&&['MOVES','FIGHTER_MOVES','ROSTER'].includes(n.arguments[0]?.name)){assignmentCalls.push({target:n.arguments[0].name,nodes:n.arguments.slice(1),scriptNumber:scriptNumber-1,start:n.start,loc:n.loc,text:text.slice(n.start,n.end)});}
  if(n.type==='FunctionDeclaration'&&['getMove','moveName'].includes(n.id?.name)){assert(!functions.has(n.id.name));functions.set(n.id.name,{text:text.slice(n.start,n.end),sha256:sha(text.slice(n.start,n.end)),loc:n.loc});}
  for(const value of Object.values(n)){if(Array.isArray(value))stack.push(...value.filter(x=>x&&typeof x==='object'&&typeof x.type==='string'));else if(value&&typeof value==='object'&&typeof value.type==='string')stack.push(value);}
 }
}
for(const name of ['move','MOVES','FIGHTER_MOVES','ROSTER'])assert(declarations.has(name));
const move=declarations.get('move').node;assert.equal(move.type,'ArrowFunctionExpression');assert.equal(move.body.type,'ObjectExpression');
assert.deepEqual(move.params.map(p=>p.name||p.left?.name),['startup','active','recovery','damage','reach','props']);
function data(node,env={}){
 assert(node&&typeof node.type==='string');
 if(node.type==='Literal'){assert(node.regex==null&&typeof node.value!=='bigint');return node.value;}
 if(node.type==='Identifier'){assert(Object.hasOwn(env,node.name),'Non-data identifier '+node.name);return env[node.name];}
 if(node.type==='MemberExpression'){assert(!node.computed&&!node.optional);const base=data(node.object,env);assert(Object.hasOwn(base,node.property.name));return base[node.property.name];}
 if(node.type==='UnaryExpression'){assert(['-','+','!'].includes(node.operator));const value=data(node.argument,env);return node.operator==='-'?-value:node.operator==='+'?+value:!value;}
 if(node.type==='ArrayExpression'){assert(node.elements.every(Boolean));return node.elements.map(x=>data(x,env));}
 if(node.type==='ObjectExpression'){const out={};for(const p of node.properties){if(p.type==='SpreadElement'){Object.assign(out,data(p.argument,env));continue;}assert.equal(p.type,'Property');assert(!p.method&&p.kind==='init'&&!p.computed);const key=p.key.type==='Identifier'?p.key.name:p.key.value;assert(typeof key==='string'&&key!=='__proto__');out[key]=data(p.value,env);}return out;}
 if(node.type==='CallExpression'){assert.equal(node.callee.type,'Identifier');assert.equal(node.callee.name,'move','Only literal move(...) data construction is allowed');const args=node.arguments.map(x=>data(x,env));const local={};for(let i=0;i<move.params.length;i++){const p=move.params[i];local[p.name||p.left.name]=i<args.length?args[i]:p.type==='AssignmentPattern'?data(p.right):undefined;}return data(move.body,local);}
 throw Error('Non-data AST node '+node.type);
}
const moves=data(declarations.get('MOVES').node),overrides=data(declarations.get('FIGHTER_MOVES').node),roster=data(declarations.get('ROSTER').node);
const env=Object.fromEntries(['EXPANSION022_DATA','COMPLEMENTS023_DATA','COMPLEMENTS024_DATA'].map(name=>{assert(declarations.has(name));return[name,data(declarations.get(name).node)];}));
const assignmentEvidence=[];
for(const assignment of assignmentCalls.sort((a,b)=>a.scriptNumber-b.scriptNumber||a.start-b.start)){const target={MOVES:moves,FIGHTER_MOVES:overrides,ROSTER:roster}[assignment.target],keys=[];for(const node of assignment.nodes){const value=data(node,env);keys.push(...Object.keys(value));Object.assign(target,value);}assignmentEvidence.push({target:assignment.target,scriptNumber:assignment.scriptNumber,loc:assignment.loc,sha256:sha(assignment.text),keys});}
const entries={};
for(const[uid,current]of Object.entries(capture.entries)){
 if(!current.fighter)continue;
 const fighter=current.fighter,id=fighter.id;assert(roster[id],id+' absent from data-derived ROSTER');for(const k of ['id','name','special','secondary','backSpecial','initialStance'])assert.equal(roster[id][k],fighter[k],uid+' runtime/static roster differs at '+k);
 const select={light:'light',medium:'medium',heavy:'heavy',low:'sweep',throw:'throw',special:fighter.special,specialDown:fighter.secondary,...fighter.backSpecial?{specialBack:fighter.backSpecial}:{},super:'super'};
 const slots={};for(const[slot,moveName]of Object.entries(select)){assert(moves[moveName],uid+':'+slot+' static move absent');slots[slot]={moveName,move:{...moves[moveName],...(overrides[id]?.[moveName]||{})}};}
 const stanceVariants=id==='raiden_mgs2'?{gun:{special:{moveName:'socom',move:{...moves.socom,...overrides[id]?.socom}},specialBack:{moveName:'reload',move:{...moves.reload,...overrides[id]?.reload}},normalOverrides:{light:{...moves.light,...overrides[id]?.light,blade:false},medium:{...moves.medium,...overrides[id]?.medium,blade:false},heavy:{...moves.heavy,...overrides[id]?.heavy,blade:false},airHeavy:{...moves.airHeavy,...overrides[id]?.airHeavy,blade:false}}}}:null;
 entries[uid]={id,fighter,slots,...stanceVariants?{stanceVariants}:{},derivation:'AST data constructor move(...), source-ordered Object.assign data appends, then MOVES[name] + FIGHTER_MOVES[id][name] merge from current source. Initial/default loadout only in slots; explicit RaidenMGS2 gun variants are separate.'};
}
assert.equal(Object.keys(entries).length,9);
const out={schema:'cqc.p43.core-moves-static-ast-derivation/1',capturedAtUTC:new Date().toISOString(),source:{path:P,bytes:sourceBytes.length,sha256:sha(sourceBytes)},runtimeRosterCapture:{path:capturePath,bytes:captureBytes.length,sha256:sha(captureBytes)},parser:{name:'acorn',version:'8.15.0',programParsingOnly:true,executableProductCodeEvaluated:false,allowedDataNodes:['Literal','Identifier bound to move parameters or inspected literal expansion data','MemberExpression of inspected literal expansion data','Unary +/-/!','ArrayExpression','ObjectExpression/SpreadElement','CallExpression to exact inspected move data constructor only']},scriptRecords:parseRecords,declarationEvidence:Object.fromEntries([...declarations].map(([k,v])=>[k,{sha256:sha(v.text),scriptSHA256:v.scriptSHA256,loc:v.loc}])),branchingFunctionEvidence:Object.fromEntries(functions),assignmentEvidence,allMoveDataCount:Object.keys(moves).length,allFighterOverrideCount:Object.keys(overrides).length,entries,exclusions:[{uid:'archive__captain',reason:'Absent from real Core roster; five Captain costume entries do not become Core playable claims.'}],qualification:'Read-only static derivation, not in-game execution or a balancing/retail-fidelity certificate. The exact getMove and moveName source is recorded so dynamic stance/loadout branches remain visible; no synthetic match or combat state was injected.'};
const raw=Buffer.from(JSON.stringify(out,null,2)+'\n'),file=B+'/actual-current-contracts-v1/P43_CORE_MOVES_STATIC_DERIVATION_CURRENT_V1.json';await fs.writeFile(file,raw,{flag:'wx'});console.log(JSON.stringify({path:file,bytes:raw.length,sha256:sha(raw),uids:Object.keys(entries),moves:Object.keys(moves).length,phase:'static-AST-derived-not-gameplay-QA'}));
