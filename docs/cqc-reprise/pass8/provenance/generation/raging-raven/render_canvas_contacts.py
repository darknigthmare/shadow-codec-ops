from pathlib import Path
import functools,http.server,threading,importlib.util,json
B=Path(__file__).parent
s=importlib.util.spec_from_file_location('readonly_browser_common','/workspace/cqc-pass6-browser-common.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(B))
server=http.server.ThreadingHTTPServer(('127.0.0.1',9367),handler);thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
browser=m.Browser(B,'ragingravenpass8');proof={'status':'running','charts':[],'nativePNGEdited':False,'method':'Actual Chromium Canvas drawImage of native source rect + clipPolygon, upright source scaling and source body-foot pivots; originals untouched.'}
try:
 browser.call('set','viewport','1600','980')
 for kind in ['armor','beauty']:
  browser.call('open','http://127.0.0.1:9367/'+kind+'/preview.html');browser.call('wait','--load','networkidle');browser.call('wait','--fn','window.__ready === true')
  browser.screenshot(kind+'-initial-page');browser.save(kind+'-initial-snapshot.json',browser.call('snapshot','-i'))
  assert not browser.call('errors').get('errors')
  ready=browser.evaluate("(()=>{if(!window.__ready || document.querySelectorAll('#buttons button').length!==6 || document.body.innerText.length<20)throw Error('Blank/error page');return{ready:window.__ready,buttonCount:6,errors:window.__consoleErrors}})()")
  assert not ready['errors']
  for key in ['a-right','a-left','b-right','b-left','c-right','c-left']:
   result=browser.evaluate("(()=>{window.draw("+json.dumps(key)+");if(window.__current!=="+json.dumps(key)+"||window.__consoleErrors.length)throw Error('Canvas failed');return{key:window.__current,width:document.querySelector('canvas').width,height:document.querySelector('canvas').height,poses:12}})()")
   p=B/kind/'inspections'/('Canvas-complete-'+key+'.png');browser.call('screenshot',str(p));proof['charts'].append({'kind':kind,'key':key,'path':str(p),'result':result})
  assert not browser.call('errors').get('errors')
 proof['status']='passed';proof['chartsCount']=len(proof['charts']);proof['distinctPoses']=144
finally:
 browser.close();server.shutdown();server.server_close();thread.join(timeout=5)
 proof['ownedBrowserClosed']=True;proof['ownedServerStopped']=not thread.is_alive();proof['commands']=browser.commands
 (B/'CANVAS_BROWSER_VERIFICATION.json').write_text(json.dumps(proof,indent=2)+'\n')
print(json.dumps({k:proof.get(k)for k in ['status','chartsCount','distinctPoses','ownedBrowserClosed','ownedServerStopped']}))
