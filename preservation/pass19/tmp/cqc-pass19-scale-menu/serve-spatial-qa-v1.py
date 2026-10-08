from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
ROOT='/tmp/cqc-pass19-application/public'
HERE=Path('/tmp/cqc-pass19-scale-menu')
OVERRIDES={
 '/cqc/modules/unified-versus-v055.html':HERE/'spatial-staged-unified-versus-v055.html',
 '/cqc/src/cqc-pass8-combat-engine.js':HERE/'spatial-staged-cqc-pass8-combat-engine.js',
 '/cqc/src/cqc-pass7-combat-fidelity.js':HERE/'spatial-staged-cqc-pass7-combat-fidelity.js',
 '/cqc/src/cqc-pass19-versus-spatial.js':HERE/'cqc-pass19-versus-spatial.js',
}
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=ROOT,**kwargs)
 def translate_path(self,path):return str(OVERRIDES.get(path.split('?')[0],super().translate_path(path)))
 def end_headers(self):self.send_header('Cache-Control','no-store');super().end_headers()
 def log_message(self,*args):pass
print('Private spatial QA serving on http://127.0.0.1:8028',flush=True)
ThreadingHTTPServer(('127.0.0.1',8028),Handler).serve_forever()
