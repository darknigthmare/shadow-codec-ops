#!/usr/bin/env python3
"""Verify an exact supplemental JSON bundle, optionally restore into a new empty directory."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,os,stat

def load(path):
    raw=path.read_bytes()
    if path.suffix=='.gz':raw=gzip.decompress(raw)
    doc=json.loads(raw);assert doc['schema']=='cqc.p43.exact-supplementary-files/1'
    assert 1<=len(doc['files'])<=128
    result=[];names=set()
    for row in doc['files']:
        name=row['projectRelativePath'];parts=name.split('/')
        assert name and not name.startswith('/')and '\\'not in name and all(x not in ['','.','..']and not x.startswith('.')for x in parts)
        assert name not in names and name.endswith(('.json','.json.gz'));names.add(name)
        raw=row['data'].encode('utf8')if row['encoding']=='utf8'else base64.b64decode(row['data'],validate=True)
        assert len(raw)==row['bytes']and hashlib.sha256(raw).hexdigest()==row['sha256']
        json.loads(gzip.decompress(raw)if name.endswith('.gz')else raw)
        result.append((name,raw))
    assert sum(len(raw)for _,raw in result)<=32*1024*1024
    return result
def main():
    parser=argparse.ArgumentParser();parser.add_argument('bundle',type=Path);parser.add_argument('--output-root',type=Path);args=parser.parse_args();rows=load(args.bundle)
    if args.output_root:
        target=args.output_root;assert target.is_absolute()and target.resolve(strict=True)==target
        info=target.lstat();assert stat.S_ISDIR(info.st_mode)and not target.is_symlink()and info.st_uid==os.getuid()and not any(target.iterdir())
        for name,raw in rows:
            path=target/name;path.parent.mkdir(parents=True,exist_ok=True)
            with os.fdopen(os.open(path,os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW,0o600),'wb')as stream:
                stream.write(raw);stream.flush();os.fsync(stream.fileno())
            assert path.read_bytes()==raw
    print(json.dumps({'status':'PASS','files':len(rows),'bytes':sum(len(raw)for _,raw in rows),'restored':bool(args.output_root),'sourceImageFiles':0}))
if __name__=='__main__':main()
