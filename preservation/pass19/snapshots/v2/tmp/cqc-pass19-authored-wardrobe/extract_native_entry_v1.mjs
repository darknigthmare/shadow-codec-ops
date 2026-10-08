import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
const args=process.argv.slice(2);
if(args.length!==2||!/^([a-z0-9]+__)[a-z0-9_]+$/.test(args[0]))throw Error('Usage: node extract_native_entry_v1.mjs UID /absolute/output.json');
const [uid,out]=args,root='/tmp/cqc-pass18-runtime';
if(!path.isAbsolute(out)||!(out.startsWith('/tmp/')||out.startsWith('/workspace/')))throw Error('Use an explicit writable output path');
if(fs.existsSync(out))throw Error('Output already exists');
const html=fs.readFileSync(root+'/modules/core-v032.html','utf8');
const scripts=[...html.matchAll(/<script src="\.\.\/src\/([^"]*sprite-catalog\.js)"/g)].map(m=>m[1]);
const context={};vm.createContext(context);
for(const file of scripts)vm.runInContext(fs.readFileSync(root+'/src/'+file,'utf8'),context,{filename:file});
const entry=context.CQC_COMBAT_SPRITE_CATALOG.entries[uid];if(!entry)throw Error('No native source entry for '+uid);
if(!entry.oppositeActions||entry.mirror===true)throw Error('Two independently authored source directions required');
const bytes=Buffer.from(JSON.stringify(entry,null,2)+'\n'),sha=crypto.createHash('sha256').update(bytes).digest('hex');
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,bytes,{flag:'wx',mode:0o400});
console.log(JSON.stringify({uid,path:out,bytes:bytes.length,sha256:sha,originalSourceScripts:scripts,sourcePixelsTransformed:false,qualification:'An exact source-entry data snapshot; no alternate artwork is created or accepted.'}));

