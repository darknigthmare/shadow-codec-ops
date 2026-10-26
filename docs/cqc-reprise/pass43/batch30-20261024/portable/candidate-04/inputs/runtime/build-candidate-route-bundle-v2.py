"""Compose exact isolated P43 routes and host copies for actual GUI QA. Never write A/S."""
from pathlib import Path
import os,json,hashlib,subprocess
R=Path('/workspace/cqc-p43-resume-20261025');A=Path('/workspace/cqc-pass21-application/public/cqc');I=R/'integration'
def read(p):
 with os.fdopen(os.open(p,os.O_RDONLY|os.O_NOATIME),'rb')as f:return f.read()
def pin(p):
 b=read(p);return {'path':str(p),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
def verified(x):
 b=read(x['path']);assert len(b)==x['bytes'] and hashlib.sha256(b).hexdigest()==x['sha256'];return b
def once(s,a,b):
 assert s.count(a)==1,(a,s.count(a));return s.replace(a,b)
import sys
cfg=json.loads(read(sys.argv[1]));assert cfg['schema']=='cqc.p43.candidate-route-bundle-build/1';out=Path(cfg['output']);assert out.is_relative_to(I) and out.resolve()==out and not out.exists();index=cfg['index'];verified(index);archive=json.loads(verified(cfg['archive']));assert archive['schema']=='cqc.p43.artifact-source-files/2';modes=json.loads(verified(cfg['modeReport']));assert modes['schema']=='cqc.p43.mode-adapters-candidate/1' and modes['productMutations'] is False
sources={}
def add(record):
 r={k:record[k] for k in ['logicalPath','path','bytes','sha256']};assert r['logicalPath'] and not r['logicalPath'].startswith('/') and '..' not in r['logicalPath'].split('/');verified(r)
 old=sources.get(r['logicalPath']);assert old is None or old==r;sources[r['logicalPath']]=r
for r in archive['files']:add(r)
for r in modes['files']+modes.get('additionalCoreMetadataRoutes',[]):add(r)
add({**index,'logicalPath':'src/cqc-pass43-native-batch-index-v1.js'})
contact=None
if cfg.get('contactReport'):
 contact=json.loads(verified(cfg['contactReport']));assert contact['schema']=='cqc.p43.venom-native-contact-candidate/1';add(contact['module'])
machine=cfg.get('supportMachineModule')
if machine:add({**machine,'logicalPath':'src/cqc-pass43-support-machine-motion-v1.js'})
loader=cfg.get('loaderCandidate');css=cfg.get('versusCSSFragment')
if loader:verified(loader)
if css:verified(css)
paths={'versus':'modules/unified-versus-v055.html','core':'modules/core-v032.html','support':'modules/support-network-v053.html'};overrides=[];baselines=[];out.mkdir()
if loader:
 overrides.append({'logicalPath':'src/cqc-pass19-native-wardrobe-library.js',**loader});baselines.append({'logicalPath':'src/cqc-pass19-native-wardrobe-library.js',**pin(A/'src/cqc-pass19-native-wardrobe-library.js')})
for name,logical in paths.items():
 original=read(A/logical);baselines.append({'logicalPath':logical,**pin(A/logical)})
 if name=='core' and contact:
  assert hashlib.sha256(original).hexdigest()==contact['originalHTMLSHA256'];html=verified(contact['candidateHTML']).decode()
 else:html=original.decode()
 if name=='versus' and css:
  fragment=verified(css).decode();assert 'id="pass43-wide-character-selection"' in fragment and 'min-width: 1400px' in fragment and 'pass43-wide-character-selection' not in html
  html=once(html,'</head>',fragment+'\n</head>')
 needle='<script src="../src/cqc-pass42-native-batch-index-v1.js"></script>';html=once(html,needle,needle+'\n<script src="../src/cqc-pass43-native-batch-index-v1.js"></script>')
 names={'versus':['vs-delayed-bursts'],'core':['core-native-origins'],'support':['support-native-guns','support-native-cqc']}[name]
 for part in names:
  logicalModule='src/cqc-pass43-'+part+'-v1.js'
  if logicalModule not in sources:continue
  needle='<script src="../src/cqc-pass42-'+part+'-v1.js"></script>';html=once(html,needle,needle+'\n<script src="../'+logicalModule+'"></script>')
 if name=='support' and machine:
  html=once(html,'hit:state.hero.inv>18','hit:state.hero.inv>18,supportActor:state.hero,supportFrame:state.frame')
  needle='<script src="../src/cqc-pass43-support-native-cqc-v1.js"></script>';html=once(html,needle,needle+'\n<script src="../src/cqc-pass43-support-machine-motion-v1.js"></script>')
 p=out/Path(logical).name;p.write_text(html);overrides.append({'logicalPath':logical,**pin(p)})
result={'schema':'cqc.p43.candidate-route-bundle/1','productMutations':False,'runtimeAdmitted':False,'sources':list(sources.values()),'overrides':overrides,'baselineHostFiles':baselines,'inputs':{k:v for k,v in cfg.items() if k!='schema'},'qualifications':['Exact candidate host copies and routes for isolated real GUI QA; no product install or browser PASS implied.','Native metadata and original PNG bytes stay pinned; frozen asset URLs resolve to inherited raw/<SHA>.png immutable Git paths, through the existing wardrobe source router.','All original script tags preserved; P43 hooks appended at finite P42 anchors.']};p=out/'CANDIDATE_ROUTES_PINNED_V1.json';p.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(pin(p)))
