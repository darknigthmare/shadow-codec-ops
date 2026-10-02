#!/usr/bin/env python3
"""Execute ONLY root-approved f6be PASS6/PASS7 closed-archive hardlinks."""
from pathlib import Path
import argparse, hashlib, json, os, stat, subprocess, time, uuid

W = Path('/workspace')
T = W / 'cqc-pass8-closed-archive-dedup'
R = W / 'cqc-game-working/cqc-versus-v056'
S = W / 'shadow-codec-recovered'
PLAN = T / 'ADDITIONAL_PASS7_ARCHIVES_PLAN.json'
APPROVED = 'f6be3061b0bb097c2369aa74c80654a0749ab127b8c4ae34a318b4d4e252dc8d'
EX = T / 'additional-pass7-execution'

def require(ok, message):
    if not ok: raise RuntimeError(message)

def encode(d): return (json.dumps(d, ensure_ascii=False, indent=2) + '\n').encode()
def digest(b): return hashlib.sha256(b).hexdigest()
def safe(p):
    p = Path(p)
    require(p.is_absolute() and p.is_relative_to(W) and '..' not in p.parts, 'Unsafe path')
    require(not any(x in {'.git','.aws','.codex','.vercel','node_modules','auth','credentials','secrets'} for x in p.parts), 'Private path forbidden')
    for a in [p,*p.parents]: require(not a.is_symlink(), 'Symlink path forbidden: '+str(a))
    return p

def info(s):
    require(stat.S_ISREG(s.st_mode), 'Regular file required')
    return {'dev':s.st_dev,'inode':s.st_ino,'bytes':s.st_size,'mode':stat.S_IMODE(s.st_mode),'uid':s.st_uid,'gid':s.st_gid,'nlink':s.st_nlink,'blocks':s.st_blocks,'mtimeNs':s.st_mtime_ns,'ctimeNs':s.st_ctime_ns}

def hash_info(p):
    p=safe(p); fd=os.open(p,os.O_RDONLY|os.O_NOFOLLOW)
    try:
        before=os.fstat(fd); h=hashlib.sha256()
        while True:
            b=os.read(fd,8*1024**2)
            if not b: break
            h.update(b)
        after=os.fstat(fd)
        require(info(before)==info(after),'File changed while hashing: '+str(p))
        require((os.lstat(p).st_dev,os.lstat(p).st_ino)==(after.st_dev,after.st_ino),'Path inode changed while hashing')
        return {'path':str(p),'sha256':h.hexdigest(),**info(after)}
    finally: os.close(fd)

def verify(row,expected_nlink=None,expected_inode=None):
    actual=hash_info(row['path'])
    for k in ('bytes','dev','mode','uid','gid','mtimeNs','sha256'):
        require(actual[k]==row[k], 'Drift '+k+': '+row['path'])
    require(actual['inode']==(row['inode'] if expected_inode is None else expected_inode),'Inode drift: '+row['path'])
    if expected_nlink is not None: require(actual['nlink']==expected_nlink,'Link-count drift: '+row['path'])
    return actual

def write(p,d):
    p=Path(p)
    with p.open('xb') as f: f.write(encode(d));f.flush();os.fsync(f.fileno())

def free():
    v=os.statvfs(W);return v.f_bavail*v.f_frsize

def git_state():
    result={}
    for name,args in [('head',['rev-parse','HEAD']),('index',['ls-files','--stage','-z']),('status',['status','--porcelain=v1','-z','--untracked-files=all']),('worktreeDiff',['diff','--binary','--no-ext-diff','HEAD','--'])]:
        raw=subprocess.check_output(['git',*args],cwd=S)
        result[name]={'sha256':digest(raw),'bytes':len(raw)}
        if name=='head':result[name]['value']=raw.decode().strip()
    return result

def sources():
    p=T/'ADDITIONAL_PASS7_SOURCE_INDEPENDENCE_PINS.json';d=json.loads(p.read_text())
    paths={safe(r['path']) for r in d['mutableSourcePins']}
    paths.add(W/'cqc-pass8-source-freeze-39-rev3.json')
    # Legacy raw source remains independent and byte-identical. No raster,
    # attachments, credentials, build caches or archive movies are scanned.
    for folder in (R/'src',R/'data',R/'modules'):
        for base,dirs,names in os.walk(folder,followlinks=False):
            dirs[:]=[n for n in dirs if not Path(base,n).is_symlink()]
            for n in names:
                p=Path(base,n)
                if p.suffix in {'.js','.json','.html','.css'}:paths.add(safe(p))
    return [hash_info(p) for p in sorted(paths)]

def archive_seals():
    p=W/'cqc-pass8-frozen-baseline-facts.json';d=json.loads(p.read_text())
    rows=[]
    for row in d['previousArchiveAndSidecars']:
        p=safe(row['path']);s=os.lstat(p)
        require(s.st_size==row['bytes'],'Historical archive size drift')
        rows.append({'path':str(p),'previousFullSha256':row['sha256'],**info(s)})
    return rows

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--approved-plan-sha256',required=True);a=parser.parse_args()
    require(a.approved_plan_sha256==APPROVED,'Wrong root approval hash')
    require(hash_info(PLAN)['sha256']==APPROVED,'Approved plan changed')
    plan=json.loads(PLAN.read_text());require(plan['groupCount']==4 and plan['replacementCount']==9,'Scope/count drift')
    roots=[safe(p) for p in plan['allowedRoots']]
    for g in plan['groups']:
        for row in [g['keeper'],*g['targets']]:
            require(any(safe(row['path']).is_relative_to(root) for root in roots),'Path outside approved archive roots')
            require(row['nlink']==1 and row['bytes']>10*1024**2,'Only approved original single-link archives')
    EX.mkdir(exist_ok=False);journal=EX/'JOURNAL.jsonl'
    def log(event,**data):
        with journal.open('ab') as f:f.write((json.dumps({'timeNs':time.time_ns(),'event':event,**data},ensure_ascii=False)+'\n').encode());f.flush();os.fsync(f.fileno())
    completed=[];start_free=free();before=None
    try:
        before={'freeBytes':start_free,'mutableAndLegacySources':sources(),'historicalArchiveStatSeals':archive_seals(),'shadowGit':git_state()}
        write(EX/'BEFORE.json',before)
        live_inodes={(r['dev'],r['inode']) for r in before['mutableAndLegacySources']}
        log('guards-before-passed',mutableSourceCount=len(before['mutableAndLegacySources']),archiveSealCount=len(before['historicalArchiveStatSeals']))
        for index,g in enumerate(plan['groups']):
            keeper=g['keeper'];verify(keeper,1)
            require((keeper['dev'],keeper['inode']) not in live_inodes,'Keeper aliases a live mutable source')
            for step,row in enumerate(g['targets']):
                ka=verify(keeper,1+step);ta=verify(row,1)
                require((ta['dev'],ta['inode']) not in live_inodes,'Target aliases a live mutable source')
                require(all(ka[k]==ta[k] for k in ('bytes','sha256','dev','mode','uid','gid')),'Keeper/target mismatch')
                log('replacement-start',group=index,target=row['path'],keeper=keeper['path'],targetBefore=ta)
                target=safe(row['path']);tmp=target.parent/('.closed-archive-dedup-'+uuid.uuid4().hex+'.tmp')
                os.link(safe(keeper['path']),tmp,follow_symlinks=False)
                tx=hash_info(tmp);require(tx['sha256']==row['sha256'] and tx['inode']==keeper['inode'],'Temporary hardlink mismatch')
                # Revalidate both descriptors/paths immediately before atomic replace.
                verify(keeper,2+step);verify(row,1)
                os.replace(tmp,target)
                fd=os.open(target.parent,os.O_RDONLY|os.O_DIRECTORY)
                try:os.fsync(fd)
                finally:os.close(fd)
                post=hash_info(target)
                require(post['sha256']==row['sha256'] and post['inode']==keeper['inode'],'Replacement post-check failed')
                completed.append({'target':row['path'],'keeper':keeper['path'],'sha256':row['sha256'],'reclaimedAllocatedBytes':row['blocks']*512,'targetAfter':post})
                log('replacement-complete',**completed[-1])
        after={'freeBytes':free(),'mutableAndLegacySources':sources(),'historicalArchiveStatSeals':archive_seals(),'shadowGit':git_state(),'archivePostPins':[]}
        for g in plan['groups']:
            for row in [g['keeper'],*g['targets']]:
                post=hash_info(row['path']);expected=g['keeper']
                require(all(post[k]==expected[k] for k in ('dev','inode','bytes','mode','uid','gid','sha256')),'Final archive pin mismatch')
                require(post['nlink']==1+len(g['targets']),'Final archive link count mismatch')
                after['archivePostPins'].append(post)
        require(before['mutableAndLegacySources']==after['mutableAndLegacySources'],'Mutable/legacy source byte or stat drift')
        require(before['historicalArchiveStatSeals']==after['historicalArchiveStatSeals'],'Frozen historical archive stat drift')
        require(before['shadowGit']==after['shadowGit'],'Git bytes/index/status drift')
        write(EX/'AFTER.json',after)
        result={'schema':'cqc.pass8.closed-archive-hardlink-execution/1','status':'completed','failures':0,'approvedPlanSha256':APPROVED,'replacementCount':len(completed),'groups':4,'archivePostPins':13,'mutableAndLegacySourcePins':len(after['mutableAndLegacySources']),'historicalArchiveStatSeals':len(after['historicalArchiveStatSeals']),'allSourcesByteAndStatIdentical':True,'allArchivePathsAndBytesPreserved':True,'shadowGitBytesIdentical':True,'sourceFreezeSha256':hash_info(W/'cqc-pass8-source-freeze-39-rev3.json')['sha256'],'freeBytesBefore':start_free,'freeBytesAfter':free(),'netFreeBytesGained':free()-start_free,'reclaimedAllocatedBytes':sum(r['reclaimedAllocatedBytes'] for r in completed),'noRuntimeOrMutableSourceHardlinks':True,'pixelWrites':0,'historicalPathDeletions':0,'replacements':completed}
        log('complete',status='completed',replacementCount=len(completed));write(EX/'EXECUTION_RESULT.json',result)
        files=[hash_info(p) for p in sorted(EX.iterdir()) if p.is_file()]
        write(EX/'FILE_SHA256_MANIFEST.json',{'schema':'cqc.pass8.closed-execution-sha256/1','files':files,'manifestSelfExcluded':True})
        print(json.dumps({'status':'completed','result':str(EX/'EXECUTION_RESULT.json'),'resultSha256':hash_info(EX/'EXECUTION_RESULT.json')['sha256'],'reclaimedAllocatedBytes':result['reclaimedAllocatedBytes'],'netFreeBytesGained':result['netFreeBytesGained'],'freeBytesAfter':free(),'mutableAndLegacyPins':result['mutableAndLegacySourcePins'],'archiveStatSeals':result['historicalArchiveStatSeals']}))
    except Exception as e:
        log('STOP',reason=str(e),completedReplacements=len(completed));write(EX/'STOP_RESULT.json',{'status':'stopped','reason':str(e),'completedReplacements':completed,'allHistoricalPathsRetained':True});raise

if __name__=='__main__':main()
