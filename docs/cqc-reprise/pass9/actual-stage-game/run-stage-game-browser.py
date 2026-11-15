#!/usr/bin/env python3
"""Run only after root READY. Reads frozen sources; owns an isolated browser session."""
import argparse
import datetime
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil
import sys

sys.dont_write_bytecode=True
HERE=Path('/workspace/cqc-pass9-stage-game-proof')
R=Path('/workspace/cqc-game-working/cqc-versus-v056')
STAGES=['outer_heaven','zanzibar','arsenal_corridor']
def sha(path):
    h=hashlib.sha256()
    with Path(path).open('rb') as stream:
        while chunk:=stream.read(1024*1024):h.update(chunk)
    return h.hexdigest()
def save(path,value):
    path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def root_contract(args):
    fp=Path(args.source_freeze);mp=Path(args.manifest)
    assert sha(fp)==args.source_freeze_sha256 and sha(mp)==args.manifest_sha256,'Root inputs differ'
    freeze=json.loads(fp.read_text());manifest=json.loads(mp.read_text())
    assert freeze['status']=='frozen' and freeze['confirmedByRoot'] is True and freeze['entryCount']==43
    for pin in freeze['files']:
        assert sha(pin['path'])==pin['sha256'] and Path(pin['path']).stat().st_size==pin['bytes'],'Frozen source differs: '+pin['path']
    sources={row['path']:row for row in manifest['files']}
    frozen_runtime={row.get('runtimePath',str(Path(row['path']).relative_to(R)) if Path(row['path']).is_relative_to(R) else None):row for row in freeze['files']}
    cat=json.loads((R/'data/stage-layer-catalog-reprise.json').read_text())
    selected={s['id']:s for s in cat['stages'] if s['id'] in STAGES}
    assert len(selected)==3 and len(cat['stages'])==30
    pins={}
    paths=['modules/unified-versus-v055.html','src/cqc-stage-layer-data.js','src/cqc-stage-layers.js']+[l['file'] for s in selected.values() for l in s['layers']]
    for p in paths:
        row=sources[p];assert sha(R/p)==row['sha256'] and (R/p).stat().st_size==row['bytes']
        if p.endswith(('.js','.html')):assert frozen_runtime[p]['sha256']==row['sha256'],'Root freeze must include installed stage sources'
        pins[p]={'sha256':row['sha256'],'bytes':row['bytes']}
    for id,stage in selected.items():
        stage['maximumDimmingFraction']=0 if id=='zanzibar' else .02 if id=='outer_heaven' else .03
        ambient=[l for l in stage['layers'] if l.get('localLuminance')]
        assert len(ambient)==(0 if id=='zanzibar' else 1),'Root integrated stage overlay absent'
    return {'stages':selected,'sourcePins':pins},freeze
def run(args):
    assert re.fullmatch(r'[a-zA-Z0-9_-]+',args.label)
    if args.scope=='production':assert re.fullmatch('[0-9a-f]{40}',args.commit or ''),'Published commit required'
    else:assert args.commit is None,'Local evidence cannot claim commit publication'
    contract,freeze=root_contract(args)
    out=HERE/args.label;out.mkdir(exist_ok=False)
    observer=HERE/'stage-game-observer.js'
    (out/observer.name).write_bytes(observer.read_bytes())
    common=Path('/workspace/cqc-pass6-browser-common.py')
    spec=importlib.util.spec_from_file_location('stage_game_browser_common',common);C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)
    browser=C.Browser(out,'stage9game');browser.env['AGENT_BROWSER_CA_CERT']='/etc/ssl/certs/ca-certificates.crt'
    checks=[];screens=[];failure=None;console=None
    def module_access(embedded):
        return 'document.querySelector(".cqc-game-frame")?.contentDocument?.querySelector("#moduleFrame")' if embedded else 'document.querySelector("#moduleFrame")'
    def front_access(embedded):return 'document.querySelector(".cqc-game-frame")?.contentDocument' if embedded else 'document'
    def ev(js,embedded):return browser.evaluate('(()=>{const w='+module_access(embedded)+'?.contentWindow;if(!w)throw Error("Real module absent");return w.eval('+json.dumps(js)+')})()')
    def record(context,name,js,embedded):
        result=ev(js,embedded);checks.append({'context':context,'name':name,'result':result});return result
    def set_profile(key,want,embedded):
        return browser.evaluate('(()=>{const d='+front_access(embedded)+',w=d.defaultView,b=d.querySelector("[data-setting='+key+']");if(!b)throw Error("Actual front setting absent");const old=w.CQCProfileV044.load().settings['+json.dumps(key)+'];if(old!=='+str(want).lower()+')b.click();const value=w.CQCProfileV044.load().settings['+json.dumps(key)+'];if(value!=='+str(want).lower()+')throw Error("Real setting button did not persist");return{key:'+json.dumps(key)+',value,usedActualFrontButton:true}})()')
    try:
        for width,height in [(1280,800),(390,844)]:
            for embedded in [False,True]:
                context=str(width)+'-'+('Shadow-tab' if embedded else 'direct-CQC')
                browser.call('set','viewport',str(width),str(height))
                browser.call('set','media','dark')
                browser.call('open',args.base.rstrip('/')+('/?module=cqc' if embedded else '/cqc/index.html'))
                browser.call('wait','--load','networkidle')
                top=browser.evaluate('(()=>{if(document.querySelector("vite-error-overlay,[data-nextjs-dialog]"))throw Error("Error overlay");return{title:document.title,characters:document.body.innerText.trim().length}})()');assert top['characters']>100
                browser.evaluate('(async()=>{for(let i=0;i<150;i++){const d='+front_access(embedded)+';if(d?.readyState==="complete"&&d.querySelector("[data-mode=versus]")){const t=d.querySelector("[data-mode=versus]");t.dispatchEvent(new d.defaultView.MouseEvent("mouseenter"));t.click();return true}await new Promise(r=>setTimeout(r,100))}throw Error("Real CQC front missing")})()')
                ready=ev('(async()=>{for(let i=0;i<150;i++){if(window.__CQC055Versus?.engine)return{path:location.pathname,fighters:window.__CQC055Versus.fighters.length};await new Promise(r=>setTimeout(r,100))}throw Error("Real game missing")})()',embedded)
                assert ready['path']=='/cqc/modules/unified-versus-v055.html' and ready['fighters']==354
                checks.append({'context':context,'name':'real-game-route-ready','result':{'top':top,'module':ready}})
                ev('window.__stage9Expected='+json.dumps(contract,separators=(',',':')),embedded)
                ev(observer.read_text(),embedded)
                record(context,'actual15-runtime-byte-SHAs-and-stage-native-preload','window.PASS9_STAGE_GAME.ready()',embedded)
                set_profile('reducedMotion',False,embedded);set_profile('motion',True,embedded)
                assert ev('matchMedia("(prefers-reduced-motion: reduce)").matches',embedded) is False,'Browser media preference reset failed'
                for stage in STAGES:
                    record(context,stage+'-real-input-walk-and-recorded-replay','window.PASS9_STAGE_GAME.walkAndReplay('+json.dumps(stage)+')',embedded)
                    record(context,stage+'-motion-enabled','window.PASS9_STAGE_GAME.motionProbe('+json.dumps(stage)+',true,"motion-on")',embedded)
                set_profile('motion',False,embedded)
                for stage in STAGES:record(context,stage+'-actual-Motion-OFF-control','window.PASS9_STAGE_GAME.motionProbe('+json.dumps(stage)+',false,"actual-front-motion-off")',embedded)
                set_profile('motion',True,embedded);set_profile('reducedMotion',True,embedded)
                for stage in STAGES:record(context,stage+'-actual-reduced-motion-control','window.PASS9_STAGE_GAME.motionProbe('+json.dumps(stage)+',false,"actual-front-reduced-motion")',embedded)
                set_profile('reducedMotion',False,embedded);browser.call('set','media','dark','reduced-motion')
                assert ev('matchMedia("(prefers-reduced-motion: reduce)").matches',embedded) is True,'Browser failed to emulate actual media reduced-motion'
                for stage in STAGES:record(context,stage+'-media-reduced-motion','window.PASS9_STAGE_GAME.motionProbe('+json.dumps(stage)+',false,"actual-browser-prefers-reduced-motion")',embedded)
                browser.call('set','media','dark')
                assert ev('matchMedia("(prefers-reduced-motion: reduce)").matches',embedded) is False
                picture_stage='arsenal_corridor' if width==390 else ('zanzibar' if embedded else 'outer_heaven')
                record(context,'actual-screenshot-stage-state','window.PASS9_STAGE_GAME.motionProbe('+json.dumps(picture_stage)+',true,"actual-screenshot")',embedded)
                browser.screenshot(context+'-'+picture_stage)
                path=out/(context+'-'+picture_stage+'.png');screens.append({'file':path.name,'bytes':path.stat().st_size,'sha256':sha(path)})
                assert sum(row['bytes'] for row in screens)<3*1024*1024,'Four screenshot budget exceeded'
                errors=browser.call('errors');assert not errors.get('errors'),errors
                checks.append({'context':context,'name':'actual-page-errors-empty','result':errors})
                print(context+' : three real stages, keyboard walks, saved deterministic replay, true scene controls and media motion suppression verified.',flush=True)
        console=browser.call('console')
        assert sha(args.source_freeze)==args.source_freeze_sha256 and sha(args.manifest)==args.manifest_sha256
        for pin in freeze['files']:assert sha(pin['path'])==pin['sha256'] and Path(pin['path']).stat().st_size==pin['bytes'],'Frozen source drift during browser checks'
        checks.append({'context':'all','name':'root-source-freeze-and-runtime-manifest-rehashed','result':{'sourceFreezeSHA256':args.source_freeze_sha256,'manifestSHA256':args.manifest_sha256,'allPinsUnchanged':True}})
    except Exception as exc:
        failure=repr(exc)
    finally:
        browser.close()
        commands=[]
        for item in browser.commands:
            row=dict(item)
            if row.get('command',[None])[0]=='eval':
                script=row['command'][1];row['command']=['eval',{'bytes':len(script.encode()),'sha256':hashlib.sha256(script.encode()).hexdigest()}]
                if row.get('result',{}).get('success'):row.pop('result',None)
            commands.append(row)
        save(out/'BROWSER_COMMANDS.json',commands)
        save(out/'verification.json',{'status':'failed' if failure else 'passed','failure':failure,'scope':args.scope,'base':args.base,'expectedCommit':args.commit,
          'createdAt':datetime.datetime.now(datetime.UTC).isoformat(),'sourceFreeze':{'path':args.source_freeze,'sha256':args.source_freeze_sha256},
          'runtimeManifest':{'path':args.manifest,'sha256':args.manifest_sha256},'observerSHA256':sha(observer),'runnerSHA256':sha(__file__),'checks':checks,
          'summary':{'checks':len(checks),'contexts':4 if not failure else len({x['context'] for x in checks if x['context']!='all'}),
            'stageWalkReplayCases':sum('real-input-walk-and-recorded-replay' in x['name'] for x in checks),
            'motionCases':sum(any(token in x['name'] for token in ['motion-enabled','actual-Motion-OFF-control','actual-reduced-motion-control','media-reduced-motion']) for x in checks)},
          'screenshots':screens,'console':console,'qualification':{'ambientStages':29,'totalStageLayers':30,'zanzibar':'static, ochre light function unsupported',
            'arsenalSource':'MGS2 Substance PC 2003; original PlayStation2 hardware not certified','cycles':'authored Versus adaptation; canonical timing not certified'},
          'nativePixelsRewritten':False,'applicationSourceMutated':False,'browserSession':browser.session,'browserClosed':True})
        owned=Path('/tmp')/browser.session
        if owned.name.startswith('stage9game-') and owned.is_dir():shutil.rmtree(owned)
    print(json.dumps({'status':'failed' if failure else 'passed','failure':failure,'proofDirectory':str(out),'checks':len(checks),'screenshots':len(screens)}))
    if failure:raise SystemExit(1)
def main():
    p=argparse.ArgumentParser();p.add_argument('--run-after-root-ready',action='store_true');p.add_argument('--scope',choices=['local-root-ready','production'],default='local-root-ready');p.add_argument('--base');p.add_argument('--label');p.add_argument('--commit');p.add_argument('--source-freeze');p.add_argument('--source-freeze-sha256');p.add_argument('--manifest');p.add_argument('--manifest-sha256');args=p.parse_args()
    if not args.run_after_root_ready:
        print(json.dumps({'status':'prepared-not-run','networkRequests':0,'appSourceMutations':0,'plannedContexts':4,'stages':STAGES,'plannedStageReplayCases':12,'plannedMotionCases':48,'maximumScreenshots':4,'maximumScreenshotBytes':3*1024*1024}));return
    for key in ['base','label','source_freeze','source_freeze_sha256','manifest','manifest_sha256']:assert getattr(args,key),'Root must supply '+key
    run(args)
if __name__=='__main__':main()
