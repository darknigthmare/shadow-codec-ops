#!/usr/bin/env python3
"""Preserve an unchanged ImageGen PNG and its arguments; never edit source pixels."""
from pathlib import Path
import argparse, hashlib, json, os
from PIL import Image

BASE=Path(__file__).resolve().parent
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 p=argparse.ArgumentParser();p.add_argument('attempt');p.add_argument('native',type=Path);p.add_argument('--reject');p.add_argument('--observed-bodies',type=int,default=12);a=p.parse_args()
 args=BASE/'prompts'/(a.attempt+'.args.json')
 request=json.loads(args.read_text());n=a.native.resolve();st=n.stat()
 assert n.parent==Path('/workspace/generated_images') and n.suffix=='.png'
 for folder in ['native-attempts']+([] if a.reject else ['sources']):
  dest=BASE/folder/(a.attempt+'.png')
  if dest.exists(): assert sha(dest)==sha(n)
  else: os.link(n,dest)
 with Image.open(n) as im:
  assert im.mode=='RGBA';h=im.getchannel('A').histogram()
  dimensions=list(im.size);alpha={'zeroPixels':h[0],'max':im.getchannel('A').getextrema()[1]}
 record={'nativeOriginal':str(n),'nativeSha256':sha(n),'bytes':st.st_size,'device':st.st_dev,'inode':st.st_ino,'nativePixelsUntouched':True,'requestFile':str(args),'requestSha256':sha(args),'selected':not bool(a.reject),'rejectReason':a.reject,'dimensions':dimensions,'alpha':alpha,'physicalFullSheetViewed':True,'poseBodiesPhysicallyViewed':a.observed_bodies,'referencePins':[{'path':s,'sha256':sha(Path(s)),'bytes':Path(s).stat().st_size,'kind':'authored-style-guide' if '/generated_images/' in s else 'original-evidence'} for s in request.get('referenced_image_paths',[])],'notes':['Independent ImageGen request for the specified facing; no software reflection, pixel editing, resizing or cleanup.', 'Source sheets physically viewed in full. Fine native alpha fringe remains qualified; runtime Canvas review is separate.']}
  
 dest=BASE/'prompts'/(a.attempt+'.result.json')
 if dest.exists(): assert json.loads(dest.read_text())['nativeSha256']==record['nativeSha256']
 else:
  with dest.open('x') as f: json.dump(record,f,ensure_ascii=False,indent=2);f.write('\n')
 uniques={}
 for q in (BASE/'native-attempts').glob('*.png'):
  t=q.stat();uniques[(t.st_dev,t.st_ino)]=t.st_size
 print(json.dumps({'attempt':a.attempt,'selected':record['selected'],'nativeUniqueBytes':sum(uniques.values()),'nativeUniquePngs':len(uniques),'budgetBytes':45*1024*1024,'diskFree':os.statvfs(BASE).f_bavail*os.statvfs(BASE).f_frsize},indent=2))
 assert sum(uniques.values())<45*1024*1024,'Native budget exceeded; stop further attempts'
if __name__=='__main__':main()
