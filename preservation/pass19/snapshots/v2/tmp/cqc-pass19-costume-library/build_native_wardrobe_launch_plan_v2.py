#!/usr/bin/env python3
"""Writes a reviewable exact source plan and candidates, never changes APP."""
import hashlib,json,datetime
from pathlib import Path
ROOT=Path('/tmp/cqc-pass19-costume-library');APP=Path('/tmp/cqc-pass19-application/public/cqc')
def sha(data):return hashlib.sha256(data).hexdigest()
plans=[]
def build(path,operations,output):
    source=(APP/path).read_bytes();text=source.decode()
    for op in operations:
        assert text.count(op['before'])==op.get('count',1),(op['id'],text.count(op['before']))
        text=text.replace(op['before'],op['after'])
    data=text.encode();f=ROOT/output
    with f.open('xb')as h:h.write(data)
    f.chmod(0o400)
    plans.append({'path':path,'expectedSHA256':sha(source),'resultSHA256':sha(data),'candidate':str(f),'replacements':operations})
def op(id,before,after):return{'id':id,'before':before,'after':after,'count':1}
vs=[op('preserve-explicit-known-selection','return window.CQC_COSTUMES_PASS17?.fighterFor(source,slot,costume)||source;','return window.CQC_NATIVE_WARDROBE_LAUNCH?.fighterFor(source,slot,costume)||window.CQC_COSTUMES_PASS17?.fighterFor(source,slot,costume)||source;'),
op('cancel-in-flight-native-metadata','request.cancelled=true;clearTimeout(request.timer);hideMatchLoadingPass10();','request.cancelled=true;window.CQC_NATIVE_WARDROBE?.cancelPreparation(\'versus-native-wardrobe-launch\');clearTimeout(request.timer);hideMatchLoadingPass10();'),
op('await-native-metadata-and-sheets-before-other-jobs','function matchAssetsPass10(request,retry){\n const sprites=',"async function matchAssetsPass10(request,retry){\n const native=window.CQC_NATIVE_WARDROBE;\n if(native){const prepared=await native.prepareSlots(request.fighters,{owner:'versus-native-wardrobe-launch',retry});if(!prepared.ready||request.cancelled||matchRequestPass10!==request)return false;request.fighters=prepared.fighters;}\n const sprites="),
op('cancel-native-on-loading-timeout-or-error',"clearTimeout(request.timer);request.status='failed';", "clearTimeout(request.timer);window.CQC_NATIVE_WARDROBE?.cancelPreparation('versus-native-wardrobe-launch');request.status='failed';"),
op('pin-actual-started-versus-actors','state.stage=STAGES[stageIndex];state.options.eraHud55=', 'window.CQC_NATIVE_WARDROBE?.setActiveFighters([state.a.f,state.b.f]);state.stage=STAGES[stageIndex];state.options.eraHud55='),
op('preserve-external-private-lazy-ids','fighters:[window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[a],0,cfg.costumes?.[0]),window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[b],1,cfg.costumes?.[1])]',"fighters:[window.CQC_NATIVE_WARDROBE_LAUNCH?.fighterFor(FIGHTERS[a],0,cfg.costumes?.[0])||window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[a],0,cfg.costumes?.[0]),window.CQC_NATIVE_WARDROBE_LAUNCH?.fighterFor(FIGHTERS[b],1,cfg.costumes?.[1])||window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[b],1,cfg.costumes?.[1])]"),
op('preserve-replay-private-lazy-ids',"fighters:[window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[a],0,rep.meta.costumes?.[0]||'original'),window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[b],1,rep.meta.costumes?.[1]||'original')]", "fighters:[window.CQC_NATIVE_WARDROBE_LAUNCH?.fighterFor(FIGHTERS[a],0,rep.meta.costumes?.[0]||'original')||window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[a],0,rep.meta.costumes?.[0]||'original'),window.CQC_NATIVE_WARDROBE_LAUNCH?.fighterFor(FIGHTERS[b],1,rep.meta.costumes?.[1]||'original')||window.CQC_COSTUMES_PASS17.fighterFor(FIGHTERS[b],1,rep.meta.costumes?.[1]||'original')]")]
core=[op('allow-only-produced-known-replay-native-id',"costume!=='original'&&!window.CQC_PASS19_COSTUMES?.selectable('core__'+(slot?o.opponent:o.player),costume)","costume!=='original'&&!window.CQC_PASS19_COSTUMES?.selectable('core__'+(slot?o.opponent:o.player),costume)&&!window.CQC_NATIVE_WARDROBE?.known('core__'+(slot?o.opponent:o.player),costume)"),
op('await-lazy-before-legacy-normalization','function launchMatch(options){\n if(window.CQC_PASS17_CORE_COSTUMES?', 'function launchMatch(options){\n if(window.CQC_NATIVE_WARDROBE_LAUNCH?.deferCoreLaunch(options,launchMatch))return;\n if(window.CQC_PASS17_CORE_COSTUMES?'),
op('pin-actual-started-core-actors','match=createMatch({...options,seed:options.seed??((Date.now()^1964)>>>0)});playing=true;',"match=createMatch({...options,seed:options.seed??((Date.now()^1964)>>>0)});window.CQC_NATIVE_WARDROBE?.setActiveFighters(match.fighters.map(actor=>({uid:'core__'+actor.id,costume:actor.costume||'original'})));playing=true;")]
build('modules/unified-versus-v055.html',vs,'unified-versus-native-wardrobe-candidate-v2.html')
build('modules/core-v032.html',core,'core-native-wardrobe-candidate-v2.html')
plan={'schema':'cqc.source-preconditioned-plan/1','status':'reviewable-plan-no-APP-mutation','createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'files':plans,'externalLoadOrder':['existing costume catalogs and approved original/static variants','cqc-pass19-native-wardrobe-index.js','cqc-pass19-native-wardrobe-library.js','cqc-pass19-native-wardrobe-static-compat.js','cqc-pass19-native-wardrobe-ui.js','cqc-pass19-native-wardrobe-binding.js','cqc-pass19-native-wardrobe-launch.js'],'scope':'Explicit known produced lazy IDs preserved through replay/external preparation. Slot preferences stay separate. Native metadata+all sheets awaited before legacy normalization or engine launch. Existing Core cancellation API wrapped by external module; unknown/unproduced IDs still rejected. HTML loading tags are Root integration work.'}
f=ROOT/'NATIVE_WARDROBE_LAUNCH_PRECONDITION_PLAN_V2.json'
with f.open('xb')as h:h.write((json.dumps(plan,ensure_ascii=False,indent=2)+'\n').encode())
f.chmod(0o400);print(json.dumps({'path':str(f),'files':[{k:p[k]for k in ['path','expectedSHA256','resultSHA256']}for p in plans]}))
