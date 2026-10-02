"""Fresh, read-only camera-limit inspection of the three existing AC!D scenes."""
import functools,hashlib,http.server,json,os,subprocess,threading,time
from pathlib import Path
R=Path('/workspace/cqc-game-working/cqc-versus-v056')
D=Path('/workspace/cqc-pass6-acid-stage-inspection-corrected')
B='/tmp/cqc-browser-npm-cache/_npx/6de2aa2fded2970c/node_modules/agent-browser/bin/agent-browser-linux-x64'
def main():
 D.mkdir(exist_ok=False)
 class Handler(http.server.SimpleHTTPRequestHandler):
  def log_message(self,*_):pass
  def do_GET(self):
   if self.path=='/favicon.ico':self.send_response(204);self.end_headers();return
   super().do_GET()
 server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(R)))
 threading.Thread(target=server.serve_forever,daemon=True).start()
 session='p6ac-'+str(os.getpid());env=dict(os.environ,AGENT_BROWSER_SOCKET_DIR='/tmp/'+session+'/s',AGENT_BROWSER_STATE_DIR='/tmp/'+session+'/d')
 prefix=[B,'--session',session,'--executable-path','/usr/bin/chromium','--args','--no-sandbox','--json'];commands=[];captures=[];failure=None
 def call(*args):
  p=subprocess.run(prefix+list(args),env=env,text=True,capture_output=True,timeout=50)
  result=json.loads(p.stdout);commands.append({'command':list(args),'exitCode':p.returncode,'result':result})
  if p.returncode or not result.get('success'):raise RuntimeError(str(result))
  return result.get('data',{})
 def evaluate(js):return call('eval',js).get('result')
 try:
  call('open',f'http://127.0.0.1:{server.server_port}/modules/unified-versus-v055.html');call('wait','--load','networkidle')
  call('screenshot',str(D/'initial-roster.png'));call('snapshot','-i');assert not call('errors').get('errors')
  evaluate("(()=>{if(window.__CQC055Versus.fighters.length!==354||document.body.innerText.trim().length<1000||document.querySelector('.vite-error-overlay'))throw Error('Blank or error page');return{visibleRoster:true,fighters:354}})()")
  print('Fresh stage inspection: visible roster, no browser errors.',flush=True)
  call('set','viewport','1280','800')
  for uid in ['lobito','saintlogic','saintlogic_security']:
   ready=evaluate(f"(async()=>{{const ok=await window.CQC_STAGE_LAYERS.preload({json.dumps(uid)});const status=window.CQC_STAGE_LAYERS.status({json.dumps(uid)});if(status.state!=='ready')throw Error(JSON.stringify(status));return status}})()")
   for camera in [-220,0,220]:
    for zoom in [.78,1.08]:
     result=evaluate("(()=>{let canvas=document.getElementById('pass6-stage');if(!canvas){canvas=document.createElement('canvas');canvas.id='pass6-stage';canvas.width=1280;canvas.height=720;canvas.style='position:fixed;top:0;left:0;width:100vw;z-index:99999';document.body.append(canvas)}const c=canvas.getContext('2d'),stage=window.__CQC055Versus.stages.find(x=>x.id==="+json.dumps(uid)+");if(!stage)throw Error('Unknown stage');const options={time:3,camera:"+str(camera)+",zoom:"+str(zoom)+",motion:true,preview:true};if(!window.CQC_STAGE_LAYERS.drawBackground(c,stage,options)||!window.CQC_STAGE_LAYERS.drawForeground(c,stage,options))throw Error('Native stage draw failed');return{stage:stage.id,camera:options.camera,zoom:options.zoom,status:window.CQC_STAGE_LAYERS.status(stage)}})()")
     file=D/f'{uid}-camera{camera}-zoom{zoom}.png';call('screenshot',str(file))
     captures.append({**result,'file':str(file),'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
  assert not call('errors').get('errors');print('18 native AC!D stage camera/zoom captures completed.',flush=True)
 except Exception as exc:failure=repr(exc);raise
 finally:
  try:call('close')
  finally:server.shutdown();server.server_close()
  report={'schema':'cqc.pass6.acid-stage-inspection/1','status':'failed' if failure else 'captured-awaiting-physical-review','failure':failure,'captures':captures,'commands':commands,'nativeStageAssetsChanged':False,'scope':'Fresh original three approved AC!D stage native draws at supported camera and zoom limits. Physical reference comparison is required before declaring a fidelity defect or altering source images.'}
  (D/'inspection.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
if __name__=='__main__':main()
