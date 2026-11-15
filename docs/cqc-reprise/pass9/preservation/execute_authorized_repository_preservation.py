#!/usr/bin/env python3
"""Exact root-authorized PASS9 producer archive and append-only native index."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, os, stat, subprocess, sys
sys.dont_write_bytecode = True
W=Path('/workspace'); T=W/'cqc-pass9-publication-preparation'
R=W/'cqc-game-working/cqc-versus-v056'; S=W/'shadow-codec-recovered'
PLAN=T/'PRODUCER_ARCHIVE_PLAN.json'; PLAN_SHA='68f7933b7e03a22538e1481f17ee2b4c7e8434d3e95ea591dee088bd57fd99bc'
PARENT='db5fd672af5e5da7e2908321452e14fbbed8edef'
INDEX=R/'preparation/ALL_NATIVE_GENERATION_PRESERVATION.json'
OLD_SHA='68e10281e8316705192866506401e3f3cf06d6c8d841c0f51a39173ac058c087'
ADDITIONS=T/'NATIVE_INDEX_ADDITION_MAP.json'
OLD_COPY=T/'CLOSED_PREVIOUS_641_NATIVE_GENERATION_PRESERVATION.json'
OUT=T/'authorized-repository-preservation-execution'
PREFIX='docs/cqc-reprise/pass9/'
spec=importlib.util.spec_from_file_location('preservation_source',T/'preservation.py'); helper=importlib.util.module_from_spec(spec); spec.loader.exec_module(helper)
require=helper.require; seal=helper.seal; sha=helper.sha

def valid_path(p, exists=True):
    p=Path(p)
    require(p.is_absolute() and p.is_relative_to(W) and p.resolve()==p and not any(x.is_symlink() for x in [p,*p.parents]), 'Unsafe path: '+str(p))
    if exists: require(p.is_file() and stat.S_ISREG(p.stat().st_mode), 'Regular file required: '+str(p))
    return p

def pin(p):
    p=valid_path(p); st=p.stat(); h=hashlib.sha256(); g=hashlib.sha1(b'blob '+str(st.st_size).encode()+b'\0')
    with p.open('rb') as f:
        for b in iter(lambda:f.read(1024*1024),b''): h.update(b);g.update(b)
    require(seal(st)==seal(p.stat()),'File changed while reading '+str(p))
    return {'source':str(p),'bytes':st.st_size,'sha256':h.hexdigest(),'gitBlobSHA1':g.hexdigest(),'statSeal':seal(st)}

def fresh_json(p,d):
    valid_path(p,False);p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('x',encoding='utf-8') as f: json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n');f.flush();os.fsync(f.fileno())

def check_plan():
    require(sha(PLAN.read_bytes())==PLAN_SHA,'Approved producer plan changed')
    p=json.loads(PLAN.read_text());require(p['expectedParent']==PARENT and len(p['files'])==430 and len(p['nativeAttempts'])==30,'Plan shape changed')
    require(subprocess.check_output(['git','-C',str(S),'rev-parse','HEAD'],text=True).strip()==PARENT,'Repository HEAD changed')
    for row in p['files']:
        n=row['targetPath']; require(n.startswith(PREFIX) and '..' not in Path(n).parts and not Path(n).is_absolute() and '\\' not in n,'Path not authorized')
        got=helper.pin(row['source']);require(all(got[k]==row[k] for k in ('bytes','sha256','gitBlobSHA1','statSeal')),'Planned source drift: '+row['source'])
        dst=valid_path(S/n,False);require(not dst.exists(),'Archive target already exists: '+str(dst))
        if row['storagePolicy']=='frozen-raster-hardlink':require(row.get('rootAuthorizedImmutableImageScope') is True and helper.frozen_raster(row['source']),'Image policy not authorized')
        else:require(row['storagePolicy']=='independent-byte-copy','Unknown policy')
    require(len({r['targetPath'] for r in p['files']})==430,'Repeated target')
    return p

def old_index():
    original=pin(INDEX);require(original['sha256']==OLD_SHA and INDEX.stat().st_nlink==1,'Previous641 index must match closed SHA and remain independently mutable')
    d=json.loads(INDEX.read_text());require(d['schema']=='cqc.native-generation-preservation/1' and len(d['files'])==641,'Previous641 schema/count changed')
    names=[r['nativeFilename'] for r in d['files']];require(len(set(names))==641,'Historical duplicate filename')
    pins=[]
    for row in d['files']:
        name=row['preservedFile'];require(not Path(name).is_absolute() and '..' not in Path(name).parts,'Unsafe historical preservation path')
        got=pin(R/name);require((got['bytes'],got['sha256'])==(row['bytes'],row['sha256']),'Historical bytes missing/changed: '+name);pins.append(got)
    return d,original,pins

def selected_map(p):
    out={}
    for producer in p['deliveries']:
        dp=producer['deliveryPin']; d=json.loads(Path(dp['source']).read_text())
        for i,r in enumerate(d.get('sourceFiles',[d])):
            out[r['sha256']]={'uid':d['uid'],'deliveryPath':dp['source'],'deliverySHA256':dp['sha256'],'jsonPointer':'/sourceFiles/'+str(i) if 'sourceFiles' in d else '', 'slot':r.get('slot'), 'source':r['source']}
    require(len(out)==25,'Selected delivery coverage changed');return out

def prepare():
    require(not ADDITIONS.exists() and not OLD_COPY.exists() and not OUT.exists(),'Preparation outputs already exist')
    p=check_plan();d,old,historical=old_index();selected=selected_map(p)
    original_rows={r['sha256']:r for r in p['files'] if r['role']=='native-imagegen-original'}
    require(len(original_rows)==30,'Native originals not unique')
    producer_uids={r['producer']:r['uid'] for r in p['deliveries']}
    additions=[]
    for attempt in sorted(p['nativeAttempts'],key=lambda a:Path(original_rows[a['sha256']]['source']).name):
        native=original_rows[attempt['sha256']];filename=Path(native['source']).name
        require(filename not in {r['nativeFilename'] for r in d['files']} and native['sha256'] not in {r['sha256'] for r in d['files']},'Attempt already preserved historically')
        target='preparation/reprise-pass9-provenance/all-native-originals/'+filename
        require(not valid_path(R/target,False).exists(),'New original target exists')
        require(helper.frozen_raster(native['source']) and Path(native['source']).suffix.lower()=='.png','Native original must be actual PNG')
        additions.append({'nativeFilename':filename,'bytes':native['bytes'],'sha256':native['sha256'],'preservedFile':target,'pixelsEdited':False,'uid':producer_uids[attempt['producer']], 'classification':'selected_native_projectile' if attempt['producer']=='black-star' else ('selected_current_delivery' if attempt['selected'] else 'nonfinal_preserved_as_recorded'), 'attempt':Path(attempt['source']).stem,'original':{'path':native['source'],'bytes':native['bytes'],'sha256':native['sha256'],'device':native['statSeal']['device'],'inode':native['statSeal']['inode']},'producerAttempt':{'path':attempt['source'],'bytes':attempt['bytes'],'sha256':attempt['sha256']},'selectedDelivery':selected.get(native['sha256']),'producerArchivePath':native['targetPath'],'approvedPreservationPlanSHA256':PLAN_SHA,'repurposedAsOC':False,'actualImageCreationOrPixelEditPerformedByPreserver':False})
    require(len(additions)==30,'Addition count')
    # Independent immutable preimage; never hardlink the mutable JSON index.
    with OLD_COPY.open('xb') as f:f.write(INDEX.read_bytes());f.flush();os.fsync(f.fileno())
    require(pin(OLD_COPY)['sha256']==OLD_SHA and OLD_COPY.stat().st_ino!=INDEX.stat().st_ino,'Previous641 closed copy differs or aliases mutable index')
    fresh_json(ADDITIONS,{'schema':'cqc.pass9.native-preservation-addition-map/1','status':'ready-after-root-exact-plan-authorization','expectedParent':PARENT,'approvedProducerPlanSHA256':PLAN_SHA,'oldIndex':old,'closedPreviousIndex':pin(OLD_COPY),'oldCount':641,'newCount':671,'oldPrefixCanonicalSHA256':sha(json.dumps(d['files'],ensure_ascii=False,separators=(',',':')).encode()),'historicalFilePins':historical,'additions':additions,'rootAuthorizedFilesOnly':True,'runtimeCatalogHTMLWrites':0})
    print(json.dumps({'status':'ready','additionMap':str(ADDITIONS),'additionMapSHA256':sha(ADDITIONS.read_bytes()),'old641FullSHAPathsVerified':641,'archivePaths':430,'appendCount':30,'independentTextCopyBytes':p['newIndependentCopyBytes'],'actualRepositoryWrites':0},indent=2))

def journal(d):
    with (OUT/'JOURNAL.jsonl').open('a') as f:f.write(json.dumps(d)+'\n');f.flush();os.fsync(f.fileno())

def create_path(source,dest,row,policy):
    source=valid_path(source);dest=valid_path(dest,False);require(not dest.exists(),'Exclusive target already exists')
    current=pin(source);require((current['sha256'],current['bytes'],current['statSeal'])==(row['sha256'],row['bytes'],row['statSeal']),'Source changed immediately before preserving')
    dest.parent.mkdir(parents=True,exist_ok=True);valid_path(dest.parent,False)
    if policy=='frozen-raster-hardlink':
        require(helper.frozen_raster(source) and source.stat().st_dev==dest.parent.stat().st_dev,'Image signature/device guard');os.link(source,dest,follow_symlinks=False)
        require(source.stat().st_ino==dest.stat().st_ino,'Image link not shared')
    else:
        with source.open('rb') as src,dest.open('xb') as dst:
            for b in iter(lambda:src.read(1024*1024),b''):dst.write(b)
            dst.flush();os.fsync(dst.fileno())
        os.chmod(dest,row['statSeal']['mode']);require(dest.stat().st_ino!=source.stat().st_ino and dest.stat().st_nlink==1,'Text must be independent')
    observed=pin(dest);require((observed['bytes'],observed['sha256'])==(row['bytes'],row['sha256']),'Destination bytes differ')
    require((dest.stat().st_uid,dest.stat().st_gid,stat.S_IMODE(dest.stat().st_mode))==(row['statSeal']['uid'],row['statSeal']['gid'],row['statSeal']['mode']),'Destination permissions changed')
    journal({'source':str(source),'target':str(dest),'sha256':row['sha256'],'policy':policy,'completed':True});return observed

def execute(addition_sha):
    require(sha(ADDITIONS.read_bytes())==addition_sha,'Addition-map SHA changed')
    m=json.loads(ADDITIONS.read_text());require(m['approvedProducerPlanSHA256']==PLAN_SHA and m['expectedParent']==PARENT and m['oldCount']==641 and m['newCount']==671,'Wrong append map')
    p=check_plan();d,old,historical=old_index();require(old==m['oldIndex'] and historical==m['historicalFilePins'],'Historical paths/identities drifted')
    require(sha(json.dumps(d['files'],ensure_ascii=False,separators=(',',':')).encode())==m['oldPrefixCanonicalSHA256'],'Historical prefix changed')
    require(pin(OLD_COPY)['sha256']==OLD_SHA and OLD_COPY.stat().st_ino!=INDEX.stat().st_ino,'Closed previous index guard')
    require(not OUT.exists(),'Fresh execution output required');OUT.mkdir()
    archived=[];linked=[]
    try:
        for row in p['files']:archived.append(create_path(row['source'],S/row['targetPath'],row,row['storagePolicy']))
        originals={r['sha256']:r for r in p['files'] if r['role']=='native-imagegen-original'}
        for row in m['additions']:
            native=originals[row['sha256']];require(native['source']==row['original']['path'],'Original mapping changed')
            linked.append(create_path(native['source'],R/row['preservedFile'],native,'frozen-raster-hardlink'))
        for row in p['files']:
            got=helper.pin(row['source']);require(all(got[k]==row[k] for k in ('bytes','sha256','gitBlobSHA1','statSeal')),'Source changed during archive')
        for planned in historical:
            got=pin(planned['source']);require(got==planned,'Historical bytes/identity changed')
        before_swap=pin(INDEX);require(before_swap==old and INDEX.stat().st_nlink==1,'Mutable index changed before atomic append')
        new=dict(d);new['files']=d['files']+m['additions'];require(new['files'][:641]==d['files'] and len(new['files'])==671,'Append altered previous prefix')
        tmp=INDEX.with_name(INDEX.name+'.pass9-authorized-new');require(not tmp.exists(),'Temporary index collision')
        fresh_json(tmp,new);os.chmod(tmp,old['statSeal']['mode'])
        require(pin(INDEX)==old,'Index changed during new serialization')
        os.replace(tmp,INDEX)
        fd=os.open(str(INDEX.parent),os.O_RDONLY|os.O_DIRECTORY);os.fsync(fd);os.close(fd)
        result=json.loads(INDEX.read_text());require(result['files'][:641]==d['files'] and len(result['files'])==671 and all(result[k]==d[k] for k in d if k!='files'),'Historical index content changed')
        require(INDEX.stat().st_nlink==1,'New index must remain independently mutable')
        receipt={'schema':'cqc.pass9.authorized-repository-preservation-receipt/1','status':'completed','expectedParent':PARENT,'approvedProducerPlanSHA256':PLAN_SHA,'additionMapSHA256':addition_sha,'archivePaths':430,'nativeOriginals':30,'oldIndexRows':641,'newIndexRows':671,'first641ValuesAndOrderPreserved':True,'all641HistoricalByteSHAPathsRevalidated':True,'closedPreviousIndex':pin(OLD_COPY),'finalIndex':pin(INDEX),'archiveFiles':archived,'newRNativeOriginalAliases':linked,'newIndependentCopyBytes':p['newIndependentCopyBytes'],'sourcePixelsEdited':False,'runtimeCatalogHTMLWrites':0,'historicalDeletedPaths':0,'freeBytes':os.statvfs(W).f_bavail*os.statvfs(W).f_frsize}
        fresh_json(OUT/'EXECUTION_RECEIPT.json',receipt)
        print(json.dumps({k:receipt[k] for k in ('status','archivePaths','nativeOriginals','oldIndexRows','newIndexRows','first641ValuesAndOrderPreserved','newIndependentCopyBytes','runtimeCatalogHTMLWrites','freeBytes')},indent=2))
        print(json.dumps({'receipt':str(OUT/'EXECUTION_RECEIPT.json'),'sha256':sha((OUT/'EXECUTION_RECEIPT.json').read_bytes()),'finalIndexSHA256':receipt['finalIndex']['sha256']}))
    except BaseException as e:
        fresh_json(OUT/'EXECUTION_FAILURE.json',{'status':'failed','error':repr(e),'archiveCompletedPaths':len(archived),'RNativeOriginalAliases':len(linked),'allPartialAndHistoricalPathsRetained':True});raise

def main():
    a=argparse.ArgumentParser(description=__doc__);a.add_argument('action',choices=('prepare','execute'));a.add_argument('--addition-map-sha256');args=a.parse_args()
    if args.action=='prepare':prepare()
    else:require(args.addition_map_sha256 is not None,'Explicit reviewed addition-map SHA required');execute(args.addition_map_sha256)
if __name__=='__main__':main()
