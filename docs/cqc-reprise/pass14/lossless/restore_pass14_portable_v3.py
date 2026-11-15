#!/usr/bin/env python3
"""Reconstruct archived objects and logical paths using repository ZIPs only.
Absolute producer/priorIndex paths are provenance, never dependencies of restore.
"""
import argparse,hashlib,json,zipfile,zlib
from pathlib import Path

def sha(data):return hashlib.sha256(data).hexdigest()
def bounded(root,relative):
 p=root/relative
 if Path(relative).is_absolute() or not p.resolve().is_relative_to(root.resolve()):raise ValueError('unbounded archive path')
 return p

def verify(index_path,repository_root,new_volume_root=None,output=None):
 index=json.loads(Path(index_path).read_text());assert index['actualRun'] and index['closed']
 repo=Path(repository_root);local=Path(new_volume_root) if new_volume_root else Path(index_path).parent
 archive_map={a['file']:a for a in index['archives']}
 archives={};archivepins=[]
 for a in index['archives']:
  p=bounded(repo,a['repositoryPath']) if a.get('repositoryPath') and bounded(repo,a['repositoryPath']).exists() else bounded(local,a['file'])
  b=p.read_bytes();assert len(b)==a['bytes'] and sha(b)==a['sha256']
  assert len(b)<=8*1024*1024
  archives[a['file']]=p;archivepins.append({'file':a['file'],'bytes':len(b),'SHA256Verified':True})
 objects={};members_verified=0
 for obj in index['objects']:
  if obj['storageKind']=='pass14-new-chunks':
   members=[{**m,'portableArchive':archives[m['archiveFile']]} for m in obj['chunks']]
  elif obj['storageKind']=='existing-closed-member':
   members=[]
   for m in obj['location']['members']:
    assert m.get('archiveRepositoryPath'),'external member missing published repository path'
    members.append({**m,'portableArchive':bounded(repo,m['archiveRepositoryPath'])})
  else:raise ValueError('unsupported portable storage kind')
  pieces=[];offset=0
  for m in members:
   if 'offset' in m:assert m['offset']==offset
   with zipfile.ZipFile(m['portableArchive']) as z:
    info=z.getinfo(m['archiveMember']);b=z.read(info)
   crc=zlib.crc32(b)&0xffffffff
   assert info.CRC==crc and info.file_size==len(b)==m['bytes'] and sha(b)==m['sha256']
   if 'crc32' in m:assert m['crc32']==f'{crc:08x}'
   pieces.append(b);offset+=len(b);members_verified+=1
  b=b''.join(pieces);assert len(b)==obj['bytes'] and sha(b)==obj['sha256'];objects[obj['sha256']]=b
 def logical_target(source):
  # Mirrors absolute provenance under output without writing into original /tmp/workspace.
  return bounded(Path(output),'logical/'+source.lstrip('/'))
 if output:
  dest=Path(output)
  if dest.exists():raise ValueError('reconstruction destination must be new')
  dest.mkdir(parents=True)
  for row in index['logicalSources']:
   p=logical_target(row['sourcePath']);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(objects[row['sha256']])
  for row in index.get('logicalSymlinkAliases',[]):
   # Materialized alias is portable and byte-identical even when original target is outside the producer root.
   p=logical_target(row['sourcePath']);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(objects[row['sha256']])
  for row in index.get('externalNativeToolAliases',[]):
   p=logical_target(row['path']);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(objects[row['sha256']])
 for kind,key in [('symlink','logicalSymlinkAliases'),('native-tool','externalNativeToolAliases')]:
  for row in index.get(key,[]):assert len(objects[row['sha256']])==row['bytes']
 return {'actualRun':True,'objectsVerified':len(objects),'memberCRCBytesSHA256Verified':members_verified,'newArchivesVerified':archivepins,'logicalFileCount':len(index['logicalSources']),'absolutePriorOrProducerPathsUsedAsDependencies':False,'reconstructionWritten':bool(output),'logicalSymlinkAliasBytesVerified':len(index.get('logicalSymlinkAliases',[])),'externalToolAliasBytesVerified':len(index.get('externalNativeToolAliases',[])),'logicalSymlinkAliasesMaterializedAsEqualBytes':len(index.get('logicalSymlinkAliases',[])) if output else 0,'externalToolAliasesMaterializedAsEqualBytes':len(index.get('externalNativeToolAliases',[])) if output else 0}

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--index',required=True,type=Path);p.add_argument('--repository-root',required=True,type=Path);p.add_argument('--new-volume-root',type=Path);p.add_argument('--output',type=Path)
 a=p.parse_args();print(json.dumps(verify(a.index,a.repository_root,a.new_volume_root,a.output),indent=2))
if __name__=='__main__':main()
