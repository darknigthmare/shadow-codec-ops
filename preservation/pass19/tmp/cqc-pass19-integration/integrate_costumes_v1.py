import hashlib,json,os,pathlib,tempfile

APP=pathlib.Path('/tmp/cqc-pass19-application')
OUT=pathlib.Path('/tmp/cqc-pass19-integration')
SRC=APP/'public/cqc/src'
receipts=[]
def sha(b): return hashlib.sha256(b).hexdigest()
def write(path,b):
    path=pathlib.Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    old=path.read_bytes() if path.exists() else None
    fd,tmp=tempfile.mkstemp(prefix=path.name+'.pass19-',dir=path.parent)
    try:
        with os.fdopen(fd,'wb') as f:f.write(b)
        os.replace(tmp,path)
    finally:
        if os.path.exists(tmp):os.unlink(tmp)
    receipts.append({'path':str(path.relative_to(APP)),'sourceSHA256':sha(old) if old is not None else None,'outputSHA256':sha(b),'bytes':len(b)})
def replace(text,old,new,count=1):
    actual=text.count(old)
    if actual!=count:raise RuntimeError('Replacement count '+str(actual)+' != '+str(count)+': '+old[:130])
    return text.replace(old,new)

bundle=pathlib.Path('/tmp/cqc-pass19-costume-system')
pins=json.loads((bundle/'DELIVERY_MODULE_HASHES_V1.json').read_text())
for row in pins['files']:
    if not row['name'].endswith('.js'):continue
    b=(bundle/row['name']).read_bytes()
    assert sha(b)==row['sha256'] and len(b)==row['bytes']
    write(SRC/row['name'],b)
for source,expected in [
    ('/tmp/cqc-pass19-scale-menu/cqc-pass19-world-scale.js','280694aed8f72ef58e036e1e7a7979e8c102d3193847dc8e22737d79c3d7bc8e'),
    ('/tmp/cqc-pass19-canonical-costumes/cqc-pass19-canonical-appearances.js','19f610711215c4a9825c9870f6a83633ce55359373206344854eef7592392401')]:
    p=pathlib.Path(source);b=p.read_bytes();assert sha(b)==expected;write(SRC/p.name,b)

# All original atlas pixels stay exact. New paths share only newly produced immutable sources.
opt=json.loads(pathlib.Path('/tmp/cqc-pass19-authored-wardrobe/SOLID_CYBORG_NATIVE_OPTION_V1.json').read_text())
opt['family']='cyborg'
frames=[fr for acts in [opt['sprite']['actions'],opt['sprite']['oppositeActions']] for act in acts.values() for fr in act['frames']]
paths={fr['file']:fr['sha256'] for fr in frames}
for rel,pin in paths.items():
    source=pathlib.Path('/tmp/cqc-pass19-authored-wardrobe/generation/core__solid/cyborg')/pathlib.Path(rel).name
    b=source.read_bytes();assert sha(b)==pin
    target=APP/'public/cqc'/rel;target.parent.mkdir(parents=True,exist_ok=True)
    if target.exists():assert sha(target.read_bytes())==pin
    else:os.link(source,target)
    receipts.append({'path':str(target.relative_to(APP)),'sourceSHA256':pin,'outputSHA256':pin,'bytes':len(b),'operation':'new-art-immutable-link'})
code='/* Reviewed bespoke Snake costume. Independent original adaptation. */\n(function(root){\nconst additions='+json.dumps([{'uid':opt['sprite']['uid'],'option':opt}],ensure_ascii=False,separators=(',',':'))+';\nroot.CQC_PASS19_ORIGINAL_COSTUMES={additions,result:root.CQC_PASS19_COSTUMES.registerBatch(additions)};\n})(globalThis);\n'
write(SRC/'cqc-pass19-original-costumes.js',code.encode())

before='\n'.join('<script src="../src/'+name+'"></script>' for name in ['cqc-pass19-costume-parts.js','cqc-pass19-pixel-style.js'])+'\n'
after='\n'+'\n'.join('<script src="../src/'+name+'"></script>' for name in [
    'cqc-pass19-costume-request-data.js','cqc-pass19-costumes.js','cqc-pass19-world-scale.js',
    'cqc-pass19-machine-costume-routing.js','cqc-pass19-machine-pixel-style.js','cqc-pass19-retro-presentations.js'])
after+='\n<script>CQC_PASS19_MACHINE_PIXEL_STYLE.registerAll()</script>\n'
after+='\n'.join('<script src="../src/'+name+'"></script>' for name in ['cqc-pass19-canonical-appearances.js','cqc-pass19-original-costumes.js'])
for name in ['unified-versus-v055.html','core-v032.html']:
    p=APP/'public/cqc/modules'/name;text=p.read_text()
    text=replace(text,'<script src="../src/cqc-sprite-renderer.js"></script>',before+'<script src="../src/cqc-sprite-renderer.js"></script>')
    text=replace(text,'<script src="../src/cqc-pass17-costumes.js"></script>','<script src="../src/cqc-pass17-costumes.js"></script>'+after)
    if name.startswith('unified'):
        text=replace(text,"function hasNativePortraitPass10(uid){const api=window.CQC_COMBAT_SPRITES;return api?.has?api.has(uid):api?.status(uid)?.renderer==='png';}","function hasNativePortraitPass10(uid,costume){const api=window.CQC_COMBAT_SPRITES,options={costume};return api?.has?api.has(uid,options):api?.status(uid,options)?.renderer==='png';}")
        count=text.count('hasNativePortraitPass10(f.uid)');assert count==4
        text=replace(text,'hasNativePortraitPass10(f.uid)','hasNativePortraitPass10(f.uid,f.costume)',count)
        for old,new,count in [
            ('CQC_PASS18_MACHINES?.hasComposite(f.uid)','CQC_PASS18_MACHINES?.hasComposite(f)',3),
            ('CQC_PASS18_MACHINES.drawPortrait(canvas,f.uid,','CQC_PASS18_MACHINES.drawPortrait(canvas,f,',1),
            ('CQC_PASS18_MACHINES.ready(f.uid)','CQC_PASS18_MACHINES.ready(f)',1),
            ('CQC_PASS18_MACHINES.whenReadyComposite(f.uid,','CQC_PASS18_MACHINES.whenReadyComposite(f,',2),
            ("state.a.f.costume==='nextgen'||state.b.f.costume==='nextgen'","(state.a.f.costume&&state.a.f.costume!=='original')||(state.b.f.costume&&state.b.f.costume!=='original')",1),
            ('`${page+1} / ${pages} · ${list.length} COMBATTANTS`','`${page+1} / ${pages}`',1)]:
            text=replace(text,old,new,count)
    else:
        text=replace(text,"!['original','nextgen'].includes(costume)||costume==='nextgen'&&!['snake','viper','runner_mg2','ninja_mg2','redblaster_mg2','jungle_evil'].includes(slot?o.opponent:o.player)","costume!=='original'&&!window.CQC_PASS19_COSTUMES?.selectable('core__'+(slot?o.opponent:o.player),costume)")
        old="    if(!artBank.status().some(row=>row.id===id)&&window.CQC_PASS18_MACHINES?.hasComposite('core__'+id)&&window.CQC_PASS18_MACHINES.drawPortrait(target,'core__'+id,()=>portrait(target,id)))return;\n    if(window.CQC_PASS17_CORE_COSTUMES?.drawPortrait(target,id,0,id===selection.player&&(target.closest('[data-player]')||!target.isConnected)?undefined:'original'))return;"
        new="    const portraitCostume=id===selection.player&&(target.closest('[data-player]')||!target.isConnected)?window.CQC_COSTUMES_PASS17?.chosen(0,'core__'+id)||'original':'original';\n    const portraitFighter={uid:'core__'+id,costume:portraitCostume};\n    if(!artBank.status().some(row=>row.id===id)&&window.CQC_PASS18_MACHINES?.hasComposite(portraitFighter)&&window.CQC_PASS18_MACHINES.drawPortrait(target,portraitFighter,()=>portrait(target,id)))return;\n    if(window.CQC_PASS17_CORE_COSTUMES?.drawPortrait(target,id,0,portraitCostume))return;"
        text=replace(text,old,new)
    write(p,text.encode())
p=SRC/'cqc-pass16-core-sprites.js';text=p.read_text()
old="function machineJobs(options,hooks={}){const ids=hooks.actorIDs?.(options)||[options.player,options.opponent];return [...new Set(ids.filter(id=>!imported(id,hooks)).map(id=>'core__'+id).filter(uid=>root.CQC_PASS18_MACHINES?.hasComposite(uid)))];}"
new="function machineJobs(options,hooks={}){const ids=hooks.actorIDs?.(options)||[options.player,options.opponent];return [...new Set(ids.map((id,slot)=>({id,uid:'core__'+id,costume:options.costumes?.[slot]||'original'})).filter(f=>!imported(f.id,hooks)&&root.CQC_PASS18_MACHINES?.hasComposite(f)).map(f=>f.uid))];}"
text=replace(text,old,new);write(p,text.encode())

plan=json.loads(pathlib.Path('/tmp/cqc-pass19-scale-menu/DIEGETIC_MENU_INCREMENTAL_GUARDED_PATCH_PLAN_V2.json').read_text())
for file in plan['files']:
    p=APP/file['path'];b=p.read_bytes();assert sha(b)==file['sourceSHA256'];text=b.decode()
    for op in file['operations']:text=replace(text,op['old'],op['new'],op['expectedCount'])
    assert sha(text.encode())==file['outputSHA256'];write(p,text.encode())

receipt={'schema':'cqc.pass19.integrated-native-costumes/1','status':'applied-awaiting-combined-browser-qa','baselineCommit':'5642ae495aa68eaf940e10724de8f3986f808cd0','files':receipts,'originalPixelsChanged':False,'canonicalOptionsReusingExistingArt':362,'pixelPresentations':279,'newOriginalNativeOptions':1,'qualification':'Initial delivered native batch only. Requested corpus is still being generated; pending requests are not selectable.'}
dest=OUT/'COSTUMES_ACTUAL_ATOMIC_INTEGRATION_V1.json'
with dest.open('x') as f:json.dump(receipt,f,indent=2,ensure_ascii=False)
print(json.dumps({'status':receipt['status'],'files':len(receipts),'receipt':str(dest),'sha256':sha(dest.read_bytes())}))
