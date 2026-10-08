#!/usr/bin/env python3
"""Package only existing approved native options. Never copies or deletes source PNGs."""
import argparse, hashlib, json, os, re, struct
from pathlib import Path

def sha(data):
    return hashlib.sha256(data).hexdigest()

def read_json(path):
    data=Path(path).read_bytes()
    return json.loads(data),data

def frame_sources(option):
    result={}
    for action in list(option['sprite']['actions'].values())+list(option['sprite']['oppositeActions'].values()):
        for frame in action['frames']:
            file=frame['file']
            if file in result and result[file]!=frame['sha256']:
                raise ValueError('Contradictory PNG source')
            result[file]=frame['sha256']
    for source in option['sprite'].get('costumeParts',{}).get('sources',{}).values():
        if source['file'] in result and result[source['file']]!=source['sha256']:
            raise ValueError('Contradictory part source')
        result[source['file']]=source['sha256']
    return result

def package(metadata_path,asset_root,audit_path,asset_base_url,metadata_path_in_source):
    metadata,metadata_bytes=read_json(metadata_path)
    audit,audit_bytes=read_json(audit_path)
    if metadata.get('schema')!='cqc.native-wardrobe-option/1' or audit.get('status')!='passed':
        raise ValueError('Reviewed metadata and passed audit required')
    if metadata.get('artAuditSHA256')!=sha(audit_bytes):
        raise ValueError('Audit pin mismatch')
    uid,id=metadata['uid'],metadata['id'];option=metadata['option']
    if option.get('id')!=id or option['sprite'].get('uid')!=uid or option.get('family') not in {'canonical','retro','nextgen','cyborg','survive','metalgear','tuxedo'}:
        raise ValueError('Stable option identity mismatch')
    if option.get('assetReview',{}).get('status')!='verified' or option['sprite'].get('review',{}).get('status')!='approved' or option['sprite'].get('mirror') is True:
        raise ValueError('Unapproved or mirrored art')
    provenance=option['provenance']
    if provenance.get('sourceUID')!=uid:
        raise ValueError('Source identity mismatch')
    if not re.fullmatch(r'https://raw\.githubusercontent\.com/[^/]+/[^/]+/[a-f0-9]{40}/',asset_base_url):
        raise ValueError('Immutable public GitHub source root required for this publisher')
    asset_root=Path(asset_root).resolve();assets=[];dimensions={}
    for file,expected in frame_sources(option).items():
        if not re.fullmatch(r'assets/[A-Za-z0-9_./-]+\.png',file) or any(part in {'.','..'} for part in file.split('/')):
            raise ValueError('Unsafe PNG source path')
        path=(asset_root/file).resolve()
        if not path.is_relative_to(asset_root) or not path.is_file():
            raise ValueError('Physical source missing or escaped root')
        data=path.read_bytes()
        if sha(data)!=expected or data[:8]!=b'\x89PNG\r\n\x1a\n' or data[12:16]!=b'IHDR':
            raise ValueError('PNG physical hash/type mismatch')
        width,height=struct.unpack('>II',data[16:24])
        if width<=0 or height<=0 or width>8192 or height>8192:
            raise ValueError('PNG dimensions out of bounds')
        dimensions[file]=(width,height)
        assets.append({'file':file,'bytes':len(data),'sha256':expected,'width':width,'height':height})
    for action in list(option['sprite']['actions'].values())+list(option['sprite']['oppositeActions'].values()):
        for frame in action['frames']:
            x,y,w,h=frame['rect'];width,height=dimensions[frame['file']]
            if min(x,y)<0 or min(w,h)<=0 or x+w>width or y+h>height or len(frame['pivot'])!=2 or any(value<0 or value>1 for value in frame['pivot']):
                raise ValueError('Frame outside reviewed PNG')
    preview=option['sprite']['actions']['idle']['frames'][0]
    entry={'uid':uid,'id':id,'label':option['label'],'family':option['family'],
        'provenance':{k:provenance[k] for k in ['kind','sourceUID','originalDesign','canonicalAppearanceAttested','sourceSpriteUID'] if k in provenance},
        'review':{'status':'approved','reviewer':option['assetReview']['reviewer'],'reviewedAt':option['assetReview']['reviewedAt'],'artAuditSHA256':sha(audit_bytes)},
        'metadata':{'path':metadata_path_in_source,'bytes':len(metadata_bytes),'sha256':sha(metadata_bytes)},
        'assets':assets,'preview':{k:preview[k] for k in ['file','rect','pivot']}}
    return {'schema':'cqc.native-wardrobe-index/1','assetBaseURL':asset_base_url,'metadataBaseURL':asset_base_url,'entries':[entry]},metadata_bytes

def exclusive(path,data):
    with open(path,'xb') as stream:
        stream.write(data);stream.flush();os.fsync(stream.fileno())
    os.chmod(path,0o400)

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--metadata',required=True);parser.add_argument('--asset-root',required=True)
    parser.add_argument('--audit',required=True);parser.add_argument('--asset-base-url',required=True)
    parser.add_argument('--metadata-source-path',required=True);parser.add_argument('--output',required=True)
    args=parser.parse_args()
    index,_=package(args.metadata,args.asset_root,args.audit,args.asset_base_url,args.metadata_source_path)
    out=Path(args.output);out.mkdir(parents=True,exist_ok=False)
    data=(json.dumps(index,ensure_ascii=False,separators=(',',':'))+'\n').encode()
    exclusive(out/'NATIVE_WARDROBE_INDEX_V1.json',data)
    js=b"/* Only physically produced and reviewed native options; source commit fixed. */\n(function(root){'use strict';root.CQC_NATIVE_WARDROBE_INDEX="+data.rstrip()+b";root.CQC_NATIVE_WARDROBE?.configureIndex(root.CQC_NATIVE_WARDROBE_INDEX);})(globalThis);\n"
    exclusive(out/'cqc-pass19-native-wardrobe-index.js',js)
    report={'schema':'cqc.native-wardrobe-index-physical-build/1','status':'passed','entries':len(index['entries']),'sourcePNGCount':sum(len(e['assets']) for e in index['entries']),'sourceBytes':sum(a['bytes'] for e in index['entries'] for a in e['assets']),
        'indexBytes':len(data),'indexSHA256':sha(data),'moduleBytes':len(js),'moduleSHA256':sha(js),'newSourcePNGs':0,'sourceEvictions':0,'sourcePixelsChanged':False,
        'scope':'Physical source bytes, dimensions, frame bounds, review/audit pins and lightweight index. Passed source browser audit remains geometry evidence, not canon fidelity certification.'}
    exclusive(out/'INDEX_PHYSICAL_PACKAGING_ACTUAL_V1.json',(json.dumps(report,indent=2)+'\n').encode())
    print(json.dumps(report))

if __name__=='__main__':
    main()
