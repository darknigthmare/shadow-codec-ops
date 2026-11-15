#!/usr/bin/env python3
"""Run isolated browser rendering; no production server or source is changed."""
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import shutil
import threading
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

HERE=Path(__file__).resolve().parent
PROOFS=Path('/workspace/cqc-pass9-stage-browser-proof/run-final04')
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def run():
    PROOFS.mkdir(exist_ok=False)
    spec=importlib.util.spec_from_file_location('browser_common','/workspace/cqc-pass6-browser-common.py')
    C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
    server=ThreadingHTTPServer(('127.0.0.1',8642),partial(QuietHandler,directory='/workspace'))
    worker=threading.Thread(target=server.serve_forever,daemon=True);worker.start()
    b=C.Browser(PROOFS,'stage9isolated')
    failure=None;receipts=[]
    try:
        b.call('set','viewport','1280','1000')
        b.initial('http://127.0.0.1:8642/cqc-pass9-stage-preparation/preview.html','préparation isolée')
        state=b.evaluate('(async()=>{for(let i=0;i<100&&!window.__stageReviewReady;i++)await new Promise(r=>setTimeout(r,100));if(!window.__stageReviewReady)throw Error(JSON.stringify(window.__consoleErrors));return{ready:true,consoleErrors:window.__consoleErrors}})()')
        assert not state['consoleErrors']
        raster=b.evaluate('window.PASS9_STAGE_REVIEW.rasterChecks()')
        masks=b.evaluate('window.PASS9_STAGE_REVIEW.actualMaskChecks()')
        cache=b.evaluate('window.PASS9_STAGE_REVIEW.coldAndEvictionChecks()')
        b.save('ACTUAL_BROWSER_RASTER_COMPARISONS.json',raster)
        b.save('ACTUAL_BROWSER_CACHE_AND_MOTION_GUARDS.json',cache)
        b.save('ACTUAL_NATIVE_COLOR_MASKS.json',masks)
        for id in ['outer_heaven','arsenal_corridor','zanzibar']:
            b.evaluate('window.PASS9_STAGE_REVIEW.display('+json.dumps(id)+',4,0,.78)')
            b.screenshot(id+'-wide-view-actual')
        b.call('set','viewport','390','844')
        mobile=b.evaluate('window.PASS9_STAGE_REVIEW.rasterChecks()')
        b.save('ACTUAL_MOBILE_BROWSER_RASTER_COMPARISONS.json',mobile)
        b.evaluate('window.PASS9_STAGE_REVIEW.display("arsenal_corridor",4,220,.78)')
        b.screenshot('arsenal-mobile-actual')
        errors=b.call('errors');assert not errors.get('errors')
    except Exception as error:
        failure=repr(error)
        raise
    finally:
        b.close();server.shutdown();server.server_close()
        for path in PROOFS.glob('*.png'):
            receipts.append({'file':path.name,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
        b.save('BROWSER_COMMANDS.json',b.commands)
        b.save('DELIVERY.json',{'status':'failed' if failure else 'passed','failure':failure,'scope':'isolated renderer, not production runtime',
            'nativeImagesRewritten':False,'sourceTreesMutated':False,'screenshots':receipts,'browserSession':b.session,
            'proofDirectory':str(PROOFS),'serverStopped':True})
        # Remove only this task's disposable browser socket/state directories.
        session_root=Path('/tmp')/b.session
        if session_root.name.startswith('stage9isolated-') and session_root.is_dir():
            shutil.rmtree(session_root)
    print(json.dumps({'status':'passed','proofDirectory':str(PROOFS),'screenshots':len(receipts)}))

if __name__=='__main__':run()
