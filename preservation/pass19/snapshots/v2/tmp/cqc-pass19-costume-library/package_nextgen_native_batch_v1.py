#!/usr/bin/env python3
"""Read-only source packaging. This plan contains an unpublished commit placeholder."""
import hashlib, importlib.util, json, os
from pathlib import Path

ROOT=Path('/tmp/cqc-pass19-costume-library')
SOURCE=Path('/tmp/cqc-pass19-nextgen-generation')
OUT=ROOT/'packaged-nextgen-native-prepublication-v1'
APP=Path('/tmp/cqc-pass19-application/public/cqc')
PLACEHOLDER='0'*40
def digest(data): return hashlib.sha256(data).hexdigest()
def write(path,data):
    path.parent.mkdir(parents=True,exist_ok=True)
    with path.open('xb') as f: f.write(data);f.flush();os.fsync(f.fileno())
    path.chmod(0o400)
def jsonbytes(value): return (json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode()
spec=importlib.util.spec_from_file_location('native_packager',ROOT/'build_native_wardrobe_index_v1.py')
package=importlib.util.module_from_spec(spec);spec.loader.exec_module(package)
delivery=json.loads((SOURCE/'NEXTGEN_COMPLETE_DELIVERY_V1.json').read_text())
audit=Path(delivery['browserProof']['path']);audit_bytes=audit.read_bytes()
assert digest(audit_bytes)==delivery['browserProof']['sha256']
assert json.loads(audit_bytes)['status']=='passed'
assert delivery['nativePNGs']==8 and delivery['actualPhysicalPoses']==128
OUT.mkdir(exist_ok=False)
index={'schema':'cqc.native-wardrobe-index/1','assetBaseURL':f'https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/{PLACEHOLDER}/','metadataBaseURL':f'https://raw.githubusercontent.com/darknigthmare/shadow-codec-ops/{PLACEHOLDER}/','entries':[]}
metadata=[]
for path in sorted((SOURCE/'options').glob('*-nextgen-native-v1.json')):
    option_bytes=path.read_bytes();option=json.loads(option_bytes);uid=option['sprite']['uid']
    assert option['id']=='nextgen' and option['family']=='nextgen'
    wrapper={'schema':'cqc.native-wardrobe-option/1','uid':uid,'id':option['id'],'artAuditSHA256':digest(audit_bytes),'option':option}
    relative=f'metadata/{uid}/nextgen-v1.json';target=OUT/relative
    write(target,jsonbytes(wrapper))
    single,_=package.package(target,APP,audit,index['assetBaseURL'],relative)
    index['entries'].extend(single['entries'])
    metadata.append({'uid':uid,'sourceOptionPath':str(path),'sourceOptionSHA256':digest(option_bytes),'path':relative,'bytes':target.stat().st_size,'sha256':digest(target.read_bytes())})
assert len(index['entries'])==4
data=jsonbytes(index);write(OUT/'NATIVE_WARDROBE_INDEX_UNPUBLISHED_V1.json',data)
write(OUT/'cqc-pass19-native-wardrobe-index-UNPUBLISHED.js',b'/* PREPUBLICATION ONLY: replace zero commit with actual byte-verified published commit before loading. */\n(function(root){\'use strict\';root.CQC_NATIVE_WARDROBE_INDEX='+data.rstrip()+b';root.CQC_NATIVE_WARDROBE?.configureIndex(root.CQC_NATIVE_WARDROBE_INDEX);})(globalThis);\n')
report={'schema':'cqc.native-wardrobe-prepublication-batch/1','status':'physical-packaging-passed-awaiting-publication','metadata':metadata,'sourceAudit':{'path':str(audit),'sha256':digest(audit_bytes),'publicationPath':'reviews/nextgen/four-native-actual-browser-v1.json'},'sourceGameAndAppearanceNotesPreserved':True,'sourceOptionsMutated':False,'sourcePixelsChanged':False,'nativePNGCount':sum(len(e['assets'])for e in index['entries']),'nativePNGBytes':sum(a['bytes']for e in index['entries']for a in e['assets']),'indexSHA256':digest(data),'placeholderCommit':PLACEHOLDER,'scope':'Only four independently generated, physically reviewed native NextGen presentations. No pending wardrobe, no Snake duplicate, no remote-publication claim. Canonical game references and conservative reconstruction qualifications preserved byte-for-value.'}
write(OUT/'NEXTGEN_NATIVE_PREPUBLICATION_PACKAGING_ACTUAL_V1.json',jsonbytes(report))
print(json.dumps({'path':str(OUT),'status':report['status'],'metadataCount':len(metadata),'PNGCount':report['nativePNGCount'],'PNGBytes':report['nativePNGBytes']}))
