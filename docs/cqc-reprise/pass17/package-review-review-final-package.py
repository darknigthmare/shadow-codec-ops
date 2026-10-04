#!/usr/bin/env python3
"""Independent read-only verification of real archives, roots and restoration."""
import hashlib,json,os,re,stat,subprocess,zipfile
from pathlib import Path,PurePosixPath

ROOT=Path('/tmp/cqc-pass17-final-package-review')
PACKAGE=Path('/tmp/cqc-pass17-preservation/package-final-v1')
MP=PACKAGE/'LOSSLESS_MANIFEST_V1.json'
RP=Path('/tmp/cqc-pass17-preservation/restored-final-v1-RESTORE_PROOF_V1.json')
REPOSITORY=Path('/workspace/shadow-codec-recovered')
SHA=re.compile(r'^[0-9a-f]{64}$')
ROOT.mkdir(exist_ok=True)
def reader(p):
    return os.fdopen(os.open(p,os.O_RDONLY|os.O_NOFOLLOW|os.O_NOATIME),'rb')
def digest(p):
    before=p.lstat();h=hashlib.sha256();size=0
    assert stat.S_ISREG(before.st_mode),str(p)
    with reader(p) as f:
        while True:
            data=f.read(1024*1024)
            if not data:break
            size+=len(data);h.update(data)
    after=p.lstat()
    assert (before.st_size,before.st_atime_ns,before.st_mtime_ns,before.st_ctime_ns)==(after.st_size,after.st_atime_ns,after.st_mtime_ns,after.st_ctime_ns),str(p)
    return size,h.hexdigest()
def load(p):
    with reader(p) as f:return json.load(f)
def pin(p):
    size,sha=digest(p);return {'source':str(p),'bytes':size,'sha256':sha}
def check(p,row):
    assert digest(p)==(row['bytes'],row['sha256']),('byte pin mismatch',str(p),row)
def safe(value):
    path=PurePosixPath(value)
    assert not path.is_absolute() and path.parts and not any(x in ('','..','.') for x in path.parts),value
    return path.as_posix()
def write(name,value):
    p=ROOT/name;assert not p.exists();p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def records(value):
    if isinstance(value,dict):
        yield value
        for v in value.values():yield from records(v)
    elif isinstance(value,list):
        for v in value:yield from records(v)

m=load(MP);r=load(RP);fixture=Path(r['fixture'])
assert m['closed'] is True and len(m['roots'])==24
assert r['status']=='passed' and r['verifiedArchiveCRC']==20
assert r['verifiedFiles']==1859 and r['verifiedOriginalAliases']==20
rootmap={x['id']:Path(x['source']) for x in m['roots']}
membermap={(x['rootId'],x['path']):x for x in m['members']}
files=[x for x in m['members'] if x['type']=='file']
assert len(files)==1839 and len(m['externalFiles'])==20 and len(m['originalAliases'])==20
counts=m['closedReceiptMemberPinsVerified'];zeros=sorted(k for k,v in counts.items() if v==0)
assert zeros==['codec','codec-metadata','delivery-notes','publication-addon'],zeros
assert len(counts)==24 and all(v>0 for k,v in counts.items() if k not in zeros)

root_checks=[]
for root in m['roots']:
    receipt=Path(root['receipt']['source']);check(receipt,root['receipt'])
    source_files=0;restored_files=0
    for row in (x for x in files if x['rootId']==root['id']):
        source=rootmap[row['rootId']]/safe(row['path']);restored=fixture/row['rootId']/row['path']
        check(source,row);check(restored,row)
        st=restored.lstat();assert stat.S_IMODE(st.st_mode)==row['mode'] and st.st_mtime_ns==row['mtime_ns']
        source_files+=1;restored_files+=1
    root_checks.append({'id':root['id'],'receiptPinExact':True,'sourceFilesExact':source_files,
                        'restoredFilesExact':restored_files,'restoredModeAndMtimeExact':True,
                        'helperEnforcedMemberPins':counts[root['id']]})

# Explicit additive verification for the four author schemas named "manifest".
additive=[]
for rid in zeros:
    closure=next(x for x in m['roots'] if x['id']==rid);doc=load(Path(closure['receipt']['source']))
    assert isinstance(doc.get('manifest'),list) and doc['manifest']
    wanted={}
    for row in doc['manifest']:
        assert isinstance(row,dict) and isinstance(row.get('path'),str)
        path=safe(row['path']);assert type(row.get('bytes')) is int and row['bytes']>=0 and isinstance(row.get('sha256'),str) and SHA.fullmatch(row['sha256'])
        pair=(row['bytes'],row['sha256']);assert path not in wanted or wanted[path]==pair;wanted[path]=pair
    # Absolute snapshot labels inside the root are also owned, regardless of runtime path labels.
    for row in records(doc):
        snapshot=row.get('snapshot')
        if isinstance(snapshot,str) and Path(snapshot).is_absolute() and Path(snapshot).is_relative_to(rootmap[rid]):
            assert type(row.get('bytes')) is int and row['bytes']>=0 and SHA.fullmatch(row.get('sha256',''))
            path=Path(snapshot).relative_to(rootmap[rid]).as_posix();pair=(row['bytes'],row['sha256'])
            assert path not in wanted or wanted[path]==pair;wanted[path]=pair
    checked=[]
    for path,(size,sha) in sorted(wanted.items()):
        archived=membermap[(rid,path)];assert archived['type']=='file' and (archived['bytes'],archived['sha256'])==(size,sha)
        row={'bytes':size,'sha256':sha};check(rootmap[rid]/path,row);check(fixture/rid/path,row)
        checked.append({'path':path,'bytes':size,'sha256':sha,'sourceExact':True,'packageManifestExact':True,'restoredPhysicalExact':True})
    additive.append({'id':rid,'closurePin':pin(Path(closure['receipt']['source'])),
                     'schema':doc.get('schema'),'helperCountPreserved':0,
                     'additiveOwnedMemberPinsVerified':len(checked),'status':'PASS','members':checked})
write('ACTUAL_FOUR_MANIFEST_SCHEMA_ADDITIVE_PIN_CHECKS_V1.json',{
    'schema':'cqc.pass17.independent-four-closure-supplement/1','status':'PASS','roots':additive,
    'qualification':'The final helper recorded0 for these four author manifests. This independent additive verification checks every owned manifest pin against physical source, archived manifest and physical restoration; no original pack/receipt is altered.'})

chunk_rows=[]
for chunk in m['chunks']:
    path=PACKAGE/safe(chunk['file']);assert chunk['bytes']<=8*1024*1024;check(path,chunk)
    with reader(path) as f,zipfile.ZipFile(f) as z:
        assert z.namelist()==chunk['entries'] and len(z.namelist())==len(set(z.namelist()))
        assert all(x.compress_type==zipfile.ZIP_DEFLATED and x.file_size<=4*1024*1024 for x in z.infolist())
        assert z.testzip() is None
    chunk_rows.append({'file':chunk['file'],'bytes':chunk['bytes'],'sha256':chunk['sha256'],'CRCAllEntriesPass':True,'DEFLATED':True,'under8MiB':True})
assert sum(x['bytes'] for x in chunk_rows)==74348164

references=[]
for ref in m['gitReferences']:
    check(Path(ref['source']),ref);path=safe(ref['gitPath'])
    if ref['kind']=='runtime':check(REPOSITORY/path,ref)
    else:
        assert ref['kind']=='historic' and re.fullmatch(r'[0-9a-f]{40}',ref['commit'])
        proc=subprocess.Popen(['git','-c','credential.helper=','-C',str(REPOSITORY),'cat-file','blob',ref['commit']+':'+path],stdout=subprocess.PIPE,stderr=subprocess.PIPE,
                              env={**os.environ,'GIT_NO_LAZY_FETCH':'1','GIT_TERMINAL_PROMPT':'0'})
        h=hashlib.sha256();size=0
        with proc.stdout as f:
            while True:
                data=f.read(1024*1024)
                if not data:break
                h.update(data);size+=len(data)
        error=proc.stderr.read();proc.stderr.close();assert proc.wait()==0,error
        assert (size,h.hexdigest())==(ref['bytes'],ref['sha256'])
    references.append({'gitPath':path,'kind':ref['kind'],'commit':ref.get('commit'),'bytes':ref['bytes'],'sha256':ref['sha256'],'sourceAndReferencedBytesExact':True})
assert len(references)==39

external_rows=[]
for row in m['externalFiles']:
    source=Path(row['path']);restored=fixture/'external'/row['externalId']/source.name
    check(source,row);check(restored,row);external_rows.append({'id':row['externalId'],'sourceExact':True,'restoredExact':True})
ledger_path=rootmap['tool-originals']/'ACTUAL_LOSSLESS_TOOL_ORIGINAL_RELOCATION_V1.json';ledger=load(ledger_path)
by_label={x['toolOriginal']:x for x in ledger['files']}
alias_rows=[]
for i,row in enumerate(m['originalAliases']):
    origin=by_label[row['originalPath']];check(Path(origin['preservedFile']),row)
    restored=fixture/'aliases'/('%04d'%(i+1))/Path(row['originalPath']).name
    check(restored,row);assert Path(row['originalPath']).resolve()==Path(origin['preservedFile'])
    meta=origin['originalMetadata'];assert row['originalMetadataBeforeStorageRelocation']==meta
    st=restored.lstat();assert stat.S_IMODE(st.st_mode)==stat.S_IMODE(meta['mode']) and st.st_mtime_ns==meta['mtime_ns'] and st.st_atime_ns==meta['atime_ns']
    alias_rows.append({'originalPath':row['originalPath'],'bytes':row['bytes'],'sha256':row['sha256'],
                       'storedNativeAndRestoredAliasExact':True,'originalBeforeRelocationModeAtimeMtimeExact':True})
links=[x for x in m['members'] if x['type']=='symlink'];assert len(links)==1
for row in links:
    restored=fixture/row['rootId']/row['path'];assert restored.is_symlink()
    check(restored.resolve(),row)

write('ACTUAL_FINAL_ARCHIVES_AND_REFERENCES_V1.json',{'schema':'cqc.pass17.independent-real-archive-reference-checks/1','status':'PASS','chunks':chunk_rows,'references':references,
       'archiveBytes':74348164,'archiveMaxBytes':max(x['bytes'] for x in chunk_rows),'noArchivesModified':True,'sourceReadOnly':True})
write('ACTUAL_PHYSICAL_SOURCE_RESTORE_AND_NATIVE_ORIGINALS_V1.json',{'schema':'cqc.pass17.independent-physical-source-and-restore/1','status':'PASS','manifestPin':pin(MP),'restoreReceiptPin':pin(RP),
       'roots':root_checks,'externalFiles':external_rows,'originalAliases':alias_rows,
       'sourceFilesExact':1839,'physicalRestoredFilesExact':1859,'originalNativeAliasesExact':20,
       'sourceNativePNGParsedOrEdited':False,'sourcesOrMetadataChangedByReviewer':False,
       'limits':'Byte integrity and mode/mtime restoration, with authoritative original alias dates, are verified. No claim of absolute artistic1:1 fidelity or browser/gameplay behavior.'})
write('CANDIDATE_INDEPENDENT_ACCEPTANCE_V1.json',{'schema':'cqc.pass17.independent-package-acceptance-candidate/1','status':'ACCEPT_WITH_EXPLICIT_ADDITIVE_FOUR_ROOT_CHECKS',
       'manifestPin':pin(MP),'restoreReceiptPin':pin(RP),'roots':24,'helperPositiveClosureCounts':20,'helperZeroClosureCounts':zeros,
       'additiveAllFourOwnedPinsPass':True,'additiveMemberPinCount':sum(x['additiveOwnedMemberPinsVerified'] for x in additive),
       'all1839SourceFilesAnd1859RestoredFilesExact':True,'all20ZIPCRCPinsAndLimitsPass':True,'all39GitReferencesExact':True,'all20NativeOriginalAliasesExact':True,
       'archiveOrSourceMutations':False,'publicationExecutedByReviewer':False,
       'qualification':'Preserve the original manifest zero-count facts. Four independent additive controls satisfy author closure-pin verification without changing or repacking the immutable archive. Root owns final acceptance and publication.'})
print(json.dumps({'status':'ACCEPT_WITH_ADDITIVE_FOUR_CHECKS','roots':24,'positiveHelperCounts':20,'additionalOwnedPins':sum(x['additiveOwnedMemberPinsVerified'] for x in additive),'chunks':20,'refs':39,'sourceFiles':1839,'restoredFiles':1859,'originalAliases':20}))
