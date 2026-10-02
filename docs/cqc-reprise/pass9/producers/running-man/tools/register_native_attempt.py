#!/usr/bin/env python3
"""Preserve an imagegen native attempt via immutable hardlink; read pixels only."""
from pathlib import Path
from datetime import datetime,timezone
import argparse,json,hashlib,os
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def register(name,native):
    native=native.resolve();assert native.parent==Path('/workspace/generated_images') and native.is_file()
    target=ROOT/'native-attempts'/f'{name}.png'
    if target.exists():raise FileExistsError('Do not overwrite native attempt: '+str(target))
    os.link(native,target)
    with Image.open(native)as image:
        alpha=image.getchannel('A');meta={'schema':'cqc.pass9.native-generation-attempt/1','name':name,'registeredAt':datetime.now(timezone.utc).isoformat(),
          'nativeOriginal':str(native),'source':str(target),'sha256':sha(native),'bytes':native.stat().st_size,'mode':image.mode,'nativeDimensions':list(image.size),
          'alphaExtrema':list(alpha.getextrema()),'nativePngPixelEdited':False,'independentNewImage':True,'mirrored':False,
          'argsFile':str(ROOT/'prompts'/f'{name}.args.json'),'argsSHA256':sha(ROOT/'prompts'/f'{name}.args.json'),
          'sourceContractSHA256':sha(ROOT/'SOURCE_AND_ACTION_CONTRACT.json'),'sourceReferencePins':json.loads((ROOT/'SOURCE_AND_ACTION_CONTRACT.json').read_text())['references'],
          'registrationScope':'Native image preserved unchanged; technical and physical acceptance remains pending.'}
    p=ROOT/'metadata'/f'{name}.result-summary.json'
    with p.open('x')as f:json.dump(meta,f,ensure_ascii=False,indent=2);f.write('\n')
    unique={}
    for p in ROOT.rglob('*'):
        if p.is_file()and 'references'not in p.parts and 'prepared-prompts-original'not in p.parts and 'original-reference-preparation'not in p.parts:
            st=p.stat();unique[(st.st_dev,st.st_ino)]=st.st_size
    cost=sum(unique.values());print(json.dumps({'name':name,'source':str(target),'sha256':meta['sha256'],'bytes':meta['bytes'],'mode':meta['mode'],'alphaExtrema':meta['alphaExtrema'],'nativeDimensions':meta['nativeDimensions'],'newUniquePayloadBytes':cost,'withinInitial25MiB':cost<=25*1024*1024,'withinMaximum45MiB':cost<=45*1024*1024}))
    if cost>45*1024*1024:raise RuntimeError('Budget exceeded: stop generation and notify root; never delete history.')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--name',required=True);p.add_argument('--native',required=True,type=Path);a=p.parse_args();register(a.name,a.native)
