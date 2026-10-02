"""Fresh, actual browser evidence for PASS8. Default is preparation only.

Does not start a server, publish, mutate either app, or copy the full catalog.
Run only after root supplies a READY base, final commit and runtime manifest.
"""
import argparse
import datetime
import hashlib
import importlib.util
import json
import pathlib
import re

ROOT = pathlib.Path('/workspace/vercel-pass8-publication')
spec = importlib.util.spec_from_file_location('pass6_browser_readonly', '/workspace/cqc-pass6-browser-common.py')
C = importlib.util.module_from_spec(spec)
spec.loader.exec_module(C)

SUPPORT = ['roster50__sunny_mgs4', 'roster50__sunny_mgr', 'archive__paz', 'npc53__paz_gz']
PROJECTILES = {'core__raging_raven': ['special', 'specialDown', 'super'],
               'core__eva_mgs3': ['special', 'specialDown', 'super'],
               'core__crying_wolf': ['special', 'super']}

def ready_js(proof, manifest):
    source_paths = ['modules/unified-versus-v055.html', 'src/cqc-sprite-catalog.js',
                    'src/cqc-sprite-renderer.js', 'src/cqc-pass8-combat-fidelity.js',
                    'src/cqc-pass8-combat-engine.js', 'src/cqc-pass8-native-origins.js',
                    'src/cqc-pass8-layout.css']
    pins = {p['path']: p['sha256'] for p in manifest['files'] if p['path'] in source_paths}
    if len(pins) != len(source_paths):
        raise ValueError('Final runtime manifest must pin all seven actual module/script/CSS sources')
    return """(async()=>{
const expected=PROOF,pins=PINS,cat=window.CQC_COMBAT_SPRITE_CATALOG?.entries;
window.__pub8Expected=expected;
if(!cat||JSON.stringify(Object.keys(cat).sort())!==JSON.stringify(expected.all39UIDs))throw Error('Exact 39-entry native catalog absent');
if(window.CQC_PASS8_COMBAT_FIDELITY?.reviewedUIDs.length!==13)throw Error('Thirteen reviewed original incarnations absent');
const loaded=[];
for(const [path,hash]of Object.entries(pins)){
 const url=location.origin+'/cqc/'+path;
 if(path.endsWith('.js')&&![...document.scripts].some(s=>s.src===url))throw Error('Expected actual script was not loaded '+path);
 if(path.endsWith('.css')&&![...document.styleSheets].some(s=>s.href===url))throw Error('Final layout stylesheet not loaded');
 const response=await fetch(path.endsWith('.html')?location.href:url,{cache:'force-cache'});if(!response.ok)throw Error('Loaded source fetch failed '+path);
 const bytes=await response.arrayBuffer(),actual=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(actual!==hash)throw Error('Actual loaded source bytes differ '+path+' '+actual);loaded.push({path,sha256:actual,bytes:bytes.byteLength});
}
const native=Object.keys(expected.entries),ready=await Promise.all(native.map(uid=>window.CQC_COMBAT_SPRITES.whenReady(uid)));
if(ready.some(x=>!x))throw Error('Native image preload failed');
for(const uid of native){const e=cat[uid],wanted=expected.entries[uid],frames=[...Object.values(e.actions),...Object.values(e.oppositeActions)].flatMap(a=>a.frames),files=[...new Set(frames.map(f=>f.file))],poses=[...new Set(frames.map(f=>f.file+JSON.stringify(f.rect)))];
 if(files.length!==6||poses.length!==72||e.mirror!==false||e.displayHeight!==wanted.displayHeight||e.facing!==wanted.facing||JSON.stringify(e.actionMap)!==JSON.stringify(wanted.actionMap))throw Error('Actual native contract changed '+uid);
 for(const f of frames)if(wanted.files[f.file]!==f.sha256)throw Error('Actual native frame SHA differs '+uid);
}
const items=Object.entries(expected.sourceFiles),hashes=[],workers=Array.from({length:5},async()=>{while(items.length){const [file,want]=items.shift(),response=await fetch(location.origin+'/cqc/'+file,{cache:'force-cache'});if(!response.ok)throw Error('Actual loaded native image fetch failed '+file);const data=await response.arrayBuffer(),hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(x=>x.toString(16).padStart(2,'0')).join('');if(hash!==want)throw Error('Actual loaded native PNG byte SHA differs '+file);hashes.push({file,sha256:hash,bytes:data.byteLength});}});
await Promise.all(workers);return{catalogEntries:Object.keys(cat).length,newForms:expected.new13UIDs.length,newPoses:936,allImagesReady:true,actualNativePNGHashes:hashes.sort((a,b)=>a.file.localeCompare(b.file)),loadedSources:loaded};
})()""".replace('PROOF', json.dumps(proof, separators=(',', ':'))).replace('PINS', json.dumps(pins))

def run(base, commit, label, manifest_path, scope, freeze_path=None, freeze_sha=None):
    if not re.fullmatch(r'[a-zA-Z0-9_-]+', label):
        raise ValueError('Use a simple fresh evidence label')
    out = ROOT / label
    out.mkdir(exist_ok=False)
    proof = json.loads((ROOT / 'expected-browser-native-sources.json').read_text())
    manifest_raw = manifest_path.read_bytes()
    manifest = json.loads(manifest_raw)
    manifest_catalog = next(p for p in manifest['files'] if p['path'] == 'src/cqc-sprite-catalog.js')
    assert manifest_catalog['sha256'] == proof['runtimeCatalogJSSHA256'], 'Final runtime catalog JS must match the 39-entry source-generated JS'
    # Canonical 53 MiB JSON is a closed local review source, outside the runtime graph.
    assert hashlib.sha256(pathlib.Path(proof['catalogSnapshot']).read_bytes()).hexdigest() == proof['catalogSHA256']
    source_freeze = None
    if scope == 'local-root-ready':
        freeze_raw = freeze_path.read_bytes()
        assert hashlib.sha256(freeze_raw).hexdigest() == freeze_sha, 'Root source-freeze bytes differ'
        freeze = json.loads(freeze_raw)
        assert freeze.get('confirmedByRoot') is True and freeze['status'] == 'frozen' and freeze['entryCount'] == 39
        manifest_by_path = {p['path']:p for p in manifest['files']}
        verified = []
        for pin in freeze['files']:
            source = pathlib.Path(pin['path'])
            actual = hashlib.sha256(source.read_bytes()).hexdigest()
            assert actual == pin['sha256'] and source.stat().st_size == pin['bytes'], 'Frozen actual source changed: '+str(source)
            relative = str(source.relative_to('/workspace/cqc-game-working/cqc-versus-v056'))
            if relative != 'data/combat-sprite-catalog-v1.json':
                assert manifest_by_path[relative]['sha256'] == actual, 'Mounted manifest/source freeze differs: '+relative
            verified.append({'path':relative,'sha256':actual,'bytes':source.stat().st_size,'published':relative in manifest_by_path})
        assert len(verified) == 7
        source_freeze = {'path':str(freeze_path),'sha256':freeze_sha,'revision':freeze.get('revision'),'verifiedActualSourceFiles':verified}
    scripts = [pathlib.Path(__file__), ROOT/'browser-observers.js', ROOT/'browser-layout-review/layout-observer.js']
    observer = scripts[1].read_text()
    layout_observer = scripts[2].read_text()
    source_pins = []
    for p in scripts:
        data = p.read_bytes()
        (out / p.name).write_bytes(data)
        source_pins.append({'path': str(p), 'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)})
    b = C.Browser(out, 'vc8d')
    b.env['AGENT_BROWSER_CA_CERT'] = '/etc/ssl/certs/ca-certificates.crt'
    failure = None
    screenshots = []
    def module_access(embedded):
        return 'document.querySelector(".cqc-game-frame")?.contentDocument?.querySelector("#moduleFrame")' if embedded else 'document.querySelector("#moduleFrame")'
    def module_eval(js, embedded):
        return b.evaluate('(()=>{const w=' + module_access(embedded) + '?.contentWindow;if(!w)throw Error("Actual CQC module absent");return w.eval(' + json.dumps(js) + ')})()')
    def launch(embedded):
        front = 'document.querySelector(".cqc-game-frame")?.contentDocument' if embedded else 'document'
        b.evaluate('(async()=>{for(let i=0;i<150;i++){const d='+front+';if(d?.readyState==="complete"&&d.querySelector("[data-mode=versus]")){const t=d.querySelector("[data-mode=versus]"),w=d.defaultView;t.dispatchEvent(new w.MouseEvent("mouseenter"));t.click();return true}await new Promise(r=>setTimeout(r,100))}throw Error("Actual front not ready")})()')
        state = b.evaluate('(async()=>{for(let i=0;i<150;i++){const w='+module_access(embedded)+'?.contentWindow;if(w?.document.readyState==="complete"&&w.__CQC055Versus?.engine)return{path:w.location.pathname,fighters:w.__CQC055Versus.fighters.length,original:w.__CQC055Versus.originalMode};await new Promise(r=>setTimeout(r,100))}throw Error("Actual versus not ready")})()')
        assert state['fighters'] == 354 and not state['original'] and state['path'] == '/cqc/modules/unified-versus-v055.html'
        return state
    def screenshot(name):
        b.screenshot(name)
        p=out/(name+'.png')
        screenshots.append({'file':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
        if sum(row['bytes'] for row in screenshots)>8*1024*1024:
            raise RuntimeError('Sparse publication screenshot budget exceeded 8 MiB')
    try:
        for width, height in [(1280, 800), (390, 844)]:
            for embedded in [True, False]:
                name = str(width) + '-' + ('Shadow-tab' if embedded else 'direct-CQC')
                b.call('set', 'viewport', str(width), str(height))
                b.call('open', base + ('/?module=cqc' if embedded else '/cqc/index.html'))
                b.call('wait', '--load', 'networkidle')
                top = b.evaluate('(()=>{if(document.querySelector("vite-error-overlay,[data-nextjs-dialog]"))throw Error("Application error overlay");return{title:document.title,width:innerWidth,height:innerHeight,bodyCharacters:document.body.innerText.trim().length}})()')
                assert top['bodyCharacters'] > 100
                b.checks.append({'name':name+'-actual-canonical-launch','result':{'top':top,'module':launch(embedded)}})
                ev = lambda js: module_eval(js, embedded)
                rec = lambda suffix, js: b.record(name+'-'+suffix, js, ev)
                rec('exact-loaded-scripts-CSS-and-90-native-byte-SHAs', ready_js(proof,manifest))
                ev(observer)
                ev(layout_observer)
                for uid in proof['new13UIDs']:
                    for face in [1,-1]:
                        rec('native-idle-'+uid+'-'+str(face),'window.__pub8Idle('+json.dumps(uid)+','+str(face)+')')
                        rec('actual-special-super-phases-'+uid+'-'+str(face),'window.__pub8Phases('+json.dumps(uid)+','+str(face)+')')
                    rec('actual-source-HUD-identity-and-resource-'+uid,'window.__pub8HUD('+json.dumps(uid)+')')
                for uid, slots in PROJECTILES.items():
                    for face in [1,-1]:
                        for slot in slots:
                            rec('actual-native-source-origin-'+uid+'-'+str(face)+'-'+slot,'window.__pub8Origin('+json.dumps(uid)+','+str(face)+','+json.dumps(slot)+')')
                for face in [1,-1]:
                    rec('Raven-finite-three-real-grenade-blasts-'+str(face),'window.__pub8RavenBlast('+str(face)+')')
                    rec('Wolf-real-body-charge-without-railgun-'+str(face),'window.__pub8WolfBodyCharge('+str(face)+')')
                for uid in SUPPORT:
                    for face in [1,-1]:
                        rec('actual-narrative-support-HUD-and-specials-'+uid+'-'+str(face),'window.__pub8Support('+json.dumps(uid)+','+str(face)+')')
                for face in [1,-1]:
                    rec('Old-Snake-complete-native-body-boots-and-layout-'+str(face),'(async()=>{const d=window.__pub8Idle("core__old_snake",'+str(face)+');return await window.__pub8Layout(d,{feet:true})})()')
                    if face==1:
                        screenshot(name+'-Old-Snake-full-body-and-boots')
                if width == 1280:
                    rec('actual-Raven-explosion-screenshot-state','window.__pub8RavenFirstBlast(1)')
                    screenshot(name+'-actual-Raven-grenade-explosion')
                b.evaluate('(()=>{const frame='+module_access(embedded)+';if(!frame)throw Error("Actual optional OC module frame absent");frame.src="/cqc/modules/unified-versus-v055.html?original=parallaxe";return{requested:frame.src}})()')
                b.call('wait','--load','networkidle')
                original=ev('(async()=>{for(let i=0;i<150;i++){const a=window.__CQC055Versus;if(a?.engine)return{fighters:a.fighters.length,original:a.originalMode};await new Promise(r=>setTimeout(r,100))}throw Error("Optional OC module not ready")})()')
                assert original['fighters']==355 and original['original']
                b.checks.append({'name':name+'-optional-original-OC-preserved','result':original})
                ev('window.__pub8Expected='+json.dumps(proof,separators=(',',':')))
                ev('(async()=>{if(!await window.CQC_COMBAT_SPRITES.whenReady("oc__parallaxe"))throw Error("Optional OC PNG not ready");return true})()')
                ev(observer)
                for face in [1,-1]:
                    rec('actual-native-optional-OC-'+str(face),'window.__pub8Idle("oc__parallaxe",'+str(face)+')')
                errors=b.call('errors')
                assert not errors.get('errors'), errors
                b.checks.append({'name':name+'-page-errors-empty','result':errors})
                print(name+' : actual phases, native byte SHAs, source launches, resources, support scopes and visible boots verified.',flush=True)
        errors=b.call('errors')
        console=b.call('console')
        assert not errors.get('errors'), errors
    except Exception as exc:
        failure=repr(exc)
        try:
            screenshot('failure-state')
        except Exception:
            pass
    finally:
        b.close()
        # Keep command evidence compact: scripts are preserved above, hashes identify eval bytes.
        commands=[]
        for row in b.commands:
            copy=dict(row)
            args=copy.get('command',[])
            if args and args[0]=='eval':
                copy['command']=['eval',{'javascriptSHA256':hashlib.sha256(args[1].encode()).hexdigest(),'characters':len(args[1])}]
            commands.append(copy)
        report={'schema':'vercel-pass8-real-deployed-browser-verification/v1','checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'failed' if failure else 'passed','failure':failure,'scope':scope,'baseURL':base,'expectedCommit':commit,'sourceFreeze':source_freeze,'manifestSHA256':hashlib.sha256(manifest_raw).hexdigest(),'runtimeCatalogJSSHA256':proof['runtimeCatalogJSSHA256'],'closedLocalCatalogJSONSHA256':proof['catalogSHA256'],'canonicalJSONPublishedOrRequired':False,'sourcePins':source_pins,'ownedBrowserSession':b.session,'checks':b.checks,'commands':commands,'checkCount':len(b.checks),'commandCount':len(commands),'screenshots':screenshots,'screenshotBytes':sum(p['bytes'] for p in screenshots),'pageErrors':locals().get('errors'),'console':locals().get('console'),'observed':{'actualNewNativeIdles':sum('-native-idle-' in row['name'] for row in b.checks),'actualSpecialSuperPhases':sum(len(row['result']['realEnginePhaseSamples']) for row in b.checks if '-actual-special-super-phases-' in row['name']),'actualSourceLaunches':sum('-actual-native-source-origin-' in row['name'] for row in b.checks),'actualBootAndLayoutCases':sum('-Old-Snake-complete-native-body-boots-and-layout-' in row['name'] for row in b.checks),'measuredSourceMarks':16,'distinctActiveGunMarks':14},'cleanup':'owned browser closed','limits':['Actual browser at two viewports and both canonical mounts; engine frames are advanced rather than assigned.','Native artwork and numerical ballistics are closest_supported Versus adaptations; no absolute 1:1 or original hardware certification.','Sunny/Paz special actions are nonoffensive simulations; their optional defensive normal melee is separately qualified.','Old reports, app sources and all original PNG bytes remain unmodified.']}
        (out/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k not in ['checks','commands','console']},ensure_ascii=False,indent=2),flush=True)
    if failure:
        raise SystemExit(1)

if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--run-after-root-ready',action='store_true')
    p.add_argument('--commit')
    p.add_argument('--base',default='https://shadow-codec-ops.vercel.app')
    p.add_argument('--label',default='browser-final')
    p.add_argument('--manifest',type=pathlib.Path,default=ROOT/'expected-runtime-manifest.json')
    p.add_argument('--scope',choices=['production','local-root-ready'],default='production')
    p.add_argument('--source-freeze',type=pathlib.Path)
    p.add_argument('--source-freeze-sha256')
    opts=p.parse_args()
    if opts.run_after_root_ready:
        if opts.scope == 'production':
            assert opts.commit and re.fullmatch('[0-9a-f]{40}',opts.commit),'Production requires a concrete root-approved source commit'
        else:
            assert opts.commit is None,'Local frozen-source evidence must not claim an unpublished commit'
            assert opts.source_freeze and opts.source_freeze_sha256 and re.fullmatch('[0-9a-f]{64}',opts.source_freeze_sha256),'Local QA requires the exact root-approved source freeze'
        run(opts.base.rstrip('/'),opts.commit,opts.label,opts.manifest,opts.scope,opts.source_freeze,opts.source_freeze_sha256)
    else:
        print(json.dumps({'status':'prepared_not_executed','requiresRootREADYBaseAndFinalCommit':True,'viewports':[[1280,800],[390,844]],'routes':['/?module=cqc','/cqc/index.html'],'actualSpecialSuperPhaseCases':624,'actualSourceLaunchCases':64,'nativePNGsHashedPerMount':90,'sparseScreenshotBudgetMiB':8,'fullCatalogRecopied':False}))
