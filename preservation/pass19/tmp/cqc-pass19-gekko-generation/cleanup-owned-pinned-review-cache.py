from pathlib import Path
import os,json,hashlib,stat
base=Path('/tmp/cqc-pass19-gekko-generation');profile=base/'chrome-profile';pid=162009
assert not Path('/proc/'+str(pid)).exists(), 'Owned Chrome not closed'
for proc in Path('/proc').iterdir():
 if not proc.name.isdigit():continue
 try:c=(proc/'cmdline').read_bytes().split(b'\0')
 except (OSError,PermissionError):continue
 if c and Path(c[0].decode(errors='replace')).name in ['chromium','chrome']:
  assert (b'--user-data-dir='+str(profile).encode()) not in c,'Owned Chrome profile still live'
roots=[profile/'Default/Cache',profile/'Default/Code Cache',profile/'Default/GPUCache',profile/'ShaderCache',profile/'GrShaderCache',profile/'GraphiteDawnCache']
rows=[]
for root in roots:
 if not root.exists():continue
 for p in root.rglob('*'):
  st=p.lstat()
  if stat.S_ISREG(st.st_mode) and st.st_nlink==1:
   rows.append({'path':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':st.st_size,'blocks':st.st_blocks*512,'inode':st.st_ino,'mode':st.st_mode,'uid':st.st_uid,'gid':st.st_gid,'mtimeNs':st.st_mtime_ns,'atimeNs':st.st_atime_ns})
receipt={'schema':'cqc.pass19.owned-review-cache-cleanup/4','closedOwnedPID':pid,'closedChromeProfile':str(profile),'rows':rows,'authorizedRoots':[str(r) for r in roots],'sourceOrUserFileDeletion':False}
plan=base/'qa/OWNED_BRIDGE_REVIEW_CACHE_CLEANUP_PLAN_V4.json';plan.write_text(json.dumps(receipt,indent=2)+'\n');before=os.statvfs('/tmp').f_bavail*os.statvfs('/tmp').f_frsize
for row in rows:
 p=Path(row['path']);st=p.lstat();assert stat.S_ISREG(st.st_mode) and st.st_nlink==1 and st.st_ino==row['inode'];assert hashlib.sha256(p.read_bytes()).hexdigest()==row['sha256'];p.unlink()
for root in roots:
 if root.exists():
  for p in sorted(root.rglob('*'),key=lambda p:len(p.parts),reverse=True):
   if p.is_dir() and not p.is_symlink():
    try:p.rmdir()
    except OSError:pass
receipt['planSHA256']=hashlib.sha256(plan.read_bytes()).hexdigest();receipt['allocatedBytesRemoved']=sum(r['blocks'] for r in rows);receipt['freeBytesAfter']=os.statvfs('/tmp').f_bavail*os.statvfs('/tmp').f_frsize;receipt['actualFreeBytesChange']=receipt['freeBytesAfter']-before
(base/'qa/OWNED_BRIDGE_REVIEW_CACHE_CLEANUP_ACTUAL_V4.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps({'files':len(rows),'allocatedBytesRemoved':receipt['allocatedBytesRemoved'],'actualFreeBytesChange':receipt['actualFreeBytesChange'],'freeBytesAfter':receipt['freeBytesAfter']}))
