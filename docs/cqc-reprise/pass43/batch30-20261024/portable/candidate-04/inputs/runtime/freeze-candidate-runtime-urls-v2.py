"""Freeze JS routes only after the exact immutable metadata archive exists. No metadata edits."""
from pathlib import Path
import json,hashlib,os,re,sys,subprocess
R=Path('/workspace/cqc-p43-resume-20261025');I=R/'integration'
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb')as f:return f.read()
def pin(p):
 b=read(p);return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
def verified(x):
 b=read(x['path']);assert len(b)==x['bytes'] and hashlib.sha256(b).hexdigest()==x['sha256'];return b
cfg=json.loads(read(sys.argv[1]));assert cfg['schema']=='cqc.p43.freeze-candidate-urls/1';commit=cfg['archiveCommit'];assert re.fullmatch('[a-f0-9]{40}',commit);assert cfg['archiveTag']=='cqc-pass43-native-002';verified(cfg['actualMetadataArchiveReceipt']);out=Path(cfg['output']);assert out.is_relative_to(I) and not out.exists();archive=json.loads(verified(cfg['archive']));assert archive['schema']=='cqc.p43.artifact-source-files/2';mode=json.loads(verified(cfg['modeReport']));assert mode['schema']=='cqc.p43.mode-adapters-candidate/1';out.mkdir()
index=verified(cfg['index']).decode();assert index.count('archiveCommit=null;')==1;frozen=index.replace('archiveCommit=null;','archiveCommit='+json.dumps(commit)+';');p=out/'cqc-pass43-native-batch-index-v1.js';p.write_text(frozen);indexPin=pin(p);records=[];coreRoutes=[]
for r in mode['files']:
 raw=verified(r);s=raw.decode()
 if r['logicalPath']=='src/cqc-pass43-core-native-origins-v1.js':
  marker=' const variants=';assert s.count(marker)==1;i=s.index(marker)+len(marker);variants,n=json.JSONDecoder().raw_decode(s[i:]);assert isinstance(variants,list) and 0<len(variants)<=10
  for v in variants:
   m=v['metadata'];assert m.get('url') is None;m['url']='https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/'+commit+'/rootassets/'+m['path'];assert re.fullmatch(r'assets/combat-costumes-pass43/[a-z0-9_-]+/[a-z0-9_-]+/metadata-core-v1\.json',m['path']);coreRoutes.append({'uid':v['uid'],'id':v['id'],'sha256':m['sha256'],'bytes':m['bytes'],'url':m['url']})
  s=s[:i]+json.dumps(variants,separators=(',',':'))+s[i+n:]
 p=out/Path(r['logicalPath']).name;p.write_text(s);check=subprocess.run(['node','--check',str(p)],capture_output=True,text=True);assert check.returncode==0,check.stderr;records.append({**r,**pin(p),'sourceBeforeFreeze':r})
check=subprocess.run(['node','--check',indexPin['path']],capture_output=True,text=True);assert check.returncode==0,check.stderr
# Recheck every exact metadata and source pin; no source or metadata output is rewritten.
for r in archive['files']:verified(r)
for r in mode.get('additionalCoreMetadataRoutes',[]):verified(r)
mode2={**mode,'files':records,'frozenArchiveCommit':commit,'frozenArchiveTag':cfg['archiveTag'],'freezeQualification':'Only descriptor URLs in JS changed; all metadata and PNG pins byte-identical to actual immutable archive plan. Prior218 immutable source routes unchanged.'};p=out/'MODE_ADAPTER_FROZEN_REPORT_V1.json';p.write_text(json.dumps(mode2,indent=2)+'\n');modePin=pin(p)
result={'schema':'cqc.p43.frozen-candidate-runtime/1','approved':False,'runtimeAdmitted':False,'productMutations':False,'index':indexPin,'modeReport':modePin,'archiveCommit':commit,'archiveTag':cfg['archiveTag'],'coreMetadataURLs':coreRoutes,'inputs':cfg,'metadataOrSourcePNGModified':False,'qualification':'Pinned JS URL freeze only; the supplied actual archive receipt must independently prove metadata publication/readbacks. No GUI or production deployment PASS implied.'};p=out/'FROZEN_RUNTIME_HANDOFF_V1.json';p.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(pin(p)))
