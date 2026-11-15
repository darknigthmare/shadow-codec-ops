import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
const root='@PROJECT_ROOT@/characters';
const app='@APP_ROOT@/public/cqc';
const candidate=path.join(root,'candidate-runtime');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=logical=>fs.readFileSync(path.join(fs.existsSync(path.join(candidate,logical))?candidate:app,logical));
const source=fs.readFileSync(path.join(app,'modules/roster-command-v053.html'),'utf8');
if(source.split('</body>').length!==2)throw Error('Expected one reviewed roster host body');
const html=source.replace('</body>','<script src="../src/cqc-pass41-hideo-codex-v1.js"></script></body>');
fs.mkdirSync(path.join(candidate,'modules'),{recursive:true});
fs.mkdirSync(path.join(candidate,'src'),{recursive:true});
fs.copyFileSync(path.join(root,'cqc-pass41-hideo-codex.proposed-v1.js'),path.join(candidate,'src/cqc-pass41-hideo-codex-v1.js'));
fs.writeFileSync(path.join(candidate,'modules/roster-command-v053.html'),html);
const records=[];
for(const logical of ['modules/roster-command-v053.html','src/cqc-pass41-hideo-codex-v1.js',...['pw','gz','tpp'].map(era=>'assets/codex-pass41/pass41__hideo_'+era+'/portrait-v1.png')]){
 const b=read(logical);records.push({logicalPath:logical,path:path.join(candidate,logical),bytes:b.length,sha256:hash(b)});
}
fs.writeFileSync(path.join(root,'HIDEO_RUNTIME_CANDIDATE_PINS_V1.json'),JSON.stringify({schema:'cqc.pass41.hideo-runtime-candidate/1',sourceHostSHA256:hash(Buffer.from(source)),sourceHostBytes:Buffer.byteLength(source),productMutations:false,records},null,2)+'\n');
const requests=[];
const mime=logical=>({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.css':'text/css','.jpg':'image/jpeg'})[path.extname(logical)]||'application/octet-stream';
const server=http.createServer((request,response)=>{
 let logical='';
 try{
  logical=decodeURIComponent(new URL(request.url,'http://localhost').pathname).replace(/^\/cqc\//,'').replace(/^\//,'');
  if(logical.split('/').includes('..'))throw Error('Path rejected');
  if(logical==='favicon.ico'){response.writeHead(204);response.end();return;}
  if(logical==='__hideo_requests'){response.writeHead(200,{'Content-Type':'application/json'});response.end(JSON.stringify(requests));return;}
  const b=read(logical||'index.html');requests.push({logical,status:200,bytes:b.length,sha256:hash(b)});
  response.writeHead(200,{'Content-Type':mime(logical),'Content-Length':b.length,'Cache-Control':'no-store'});
  const delay=logical.includes('/codex-pass41/')?1200:0;
  if(delay)setTimeout(()=>response.end(b),delay);else response.end(b);
 }catch(error){requests.push({logical,status:404,error:String(error)});response.writeHead(404);response.end('Not found');}
});
server.listen(0,'127.0.0.1',()=>{
 const port=server.address().port;fs.writeFileSync(path.join(root,'qa-server-port.txt'),String(port));
 console.log(JSON.stringify({port,sourceHostUnmodified:true,pins:records.length,qaPortraitLatencyMs:1200}));
});
process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
