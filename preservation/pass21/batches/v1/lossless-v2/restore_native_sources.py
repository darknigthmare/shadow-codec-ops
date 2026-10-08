"""Restore exact original regular files from the verified PASS21 source archives."""
from pathlib import Path
import argparse, hashlib, json, zipfile

a=argparse.ArgumentParser(description=__doc__)
a.add_argument('--archive-dir',type=Path,default=Path(__file__).resolve().parent)
a.add_argument('--restore-to',type=Path,required=True)
args=a.parse_args();root=args.archive_dir;out=args.restore_to.resolve()
sha=lambda b:hashlib.sha256(b).hexdigest()
index=json.loads((root/'LOSSLESS_SOURCE_INDEX_ACTUAL_V1.json').read_bytes())
snapshot=root.parent/'metadata'/index['sourceSnapshotFile']
if not snapshot.exists():snapshot=root.parent/index['sourceSnapshotFile']
raw=snapshot.read_bytes();assert sha(raw)==index['sourceSnapshotSHA256'];source=json.loads(raw)
where={}
for archive in index['archives']:
    path=root/archive['file'];raw=path.read_bytes();assert len(raw)==archive['bytes']and sha(raw)==archive['sha256']
    for entry in archive['objects']:assert entry['sha256']not in where;where[entry['sha256']]=(path,entry)
files={};count=0
try:
    for row in source['rows']:
        name=row['localPath'].lstrip('/');relative=Path(name)
        assert not relative.is_absolute()and all(p not in['.','..','']for p in relative.parts)
        target=out/relative;assert target.resolve().is_relative_to(out)
        path,entry=where[row['sha256']]
        if path not in files:files[path]=zipfile.ZipFile(path)
        z=files[path]
        b=z.read(entry['entry']);assert len(b)==row['bytes']and sha(b)==row['sha256']
        assert not target.is_symlink()
        if target.exists():assert target.is_file()and target.read_bytes()==b
        else:target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(b)
        count+=1
finally:
    for z in files.values():z.close()
print(json.dumps({'status':'passed-exact-original-regular-files-restored','files':count,'output':str(out)}))
