from pathlib import Path
import hashlib,http.server,threading,functools,json,importlib.util
B=Path(__file__).parent
s=importlib.util.spec_from_file_location('bb_wolf_browser_common','/workspace/cqc-pass6-browser-common.py');C=importlib.util.module_from_spec(s);s.loader.exec_module(C)
out=B/'canvas-proof';out.mkdir(exist_ok=True)
class QuietHandler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(QuietHandler,directory=str(B)));t=threading.Thread(target=srv.serve_forever,daemon=True);t.start()
b=C.Browser(out,'pass8-wolf-canvas');err=None
try:
 b.call('set','viewport','1456','1200');b.initial('http://127.0.0.1:'+str(srv.server_port)+'/preview.html','Crying Wolf')
 ready=b.evaluate("(()=>{if(!window.ready||window.__consoleErrors.length)throw Error('Notready/error');return{ready:window.ready,errors:window.__consoleErrors}})()");assert ready['ready']
 for row in json.loads((B/'preview-data.json').read_text()):
  key=row['key']
  for color,hexcolor in [('green','#3c493e'),('black','#060606')]:
   state=b.evaluate('drawSet('+json.dumps(key)+','+json.dumps(hexcolor)+')');assert state['cells']==12 and not state['errors'];b.screenshot(key+'-'+color)
 b.evaluate("window.zoomSet=async(key,index)=>{const ds=await fetch('preview-data.json').then(r=>r.json()),d=ds.find(x=>x.key===key),f=d.layout.cells[index].frame,im=new Image();im.src=d.source;await im.decode();const [x,y,w,h]=f.rect;ctx.fillStyle='#3c493e';ctx.fillRect(0,0,1440,980);ctx.drawImage(im,x,y,w,h,12,70,w*3,h*3);ctx.fillStyle='#fff';ctx.font='20px monospace';ctx.fillText(key+' pose'+index+' native crop '+[x,y,w,h].join(',')+' at3x',12,26);return{key,index,rect:f.rect,scale:3,canvasOrigin:[12,70],source:d.source}}")
 for side in ['right','left']:
  for action,index in [('shoot',3),('deploy',6),('charge',11)]:
   state=b.evaluate('zoomSet('+json.dumps('armor-c-'+side)+','+str(index)+')');b.screenshot('armor-c-'+side+'-muzzle-'+action);b.checks.append({'name':'native-muzzle-observer-'+side+'-'+action,'result':state})
 for args in [('errors',),('console',)]:
  state=b.call(*args);assert not state.get('errors');b.checks.append({'name':'final-'+args[0],'result':state})
except Exception as e:err=repr(e);raise
finally:
 b.close();srv.shutdown();srv.server_close();t.join(timeout=4)
 report={'status':'passed' if err is None else 'failed','error':err,'commands':b.commands,'checks':b.checks,'captures':len(list(out.glob('*.png'))),'nativePNGsModified':False,'nativePixelsRewritten':False,'bodyRasterCanvasCropOnly':True,'expectedNativeSheets':12,'expectedUniqueBodyPoses':144,'ownedServerStopped':not t.is_alive(),'browserClosed':True}
 b.save('CANVAS_BROWSER_REVIEW.json',report)
 print(json.dumps({k:v for k,v in report.items() if k not in ['commands','checks']}))
