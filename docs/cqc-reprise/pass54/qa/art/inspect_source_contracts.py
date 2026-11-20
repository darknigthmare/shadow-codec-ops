from pathlib import Path
from PIL import Image
import json,hashlib,datetime
T=Path('/tmp/cqc-p54-20261120');rows=[];errors=[]
for directory in ['costumes-a','costumes-b','roster']:
 for f in sorted((T/'production'/directory).glob('*ARTIFACT_PROPOSAL*.json')):
  d=json.loads(f.read_text());rp=d.get('rawPNG',{});p=Path(rp['path']);b=p.read_bytes();im=Image.open(p).convert('RGBA');a=im.getchannel('A');bbox=a.point(lambda n:255 if n>=32 else 0).getbbox()
  slots=d.get('slots')or([dict(d['frame'],sourceRect=d['frame']['rect'])]if d.get('frame')else[])
  for s in slots:
   x,y,w,h=s['sourceRect'];inside=bool(bbox is None or(x<=bbox[0]and y<=bbox[1]and x+w>=bbox[2]and y+h>=bbox[3]));valid=0<=x<x+w<=im.width and 0<=y<y+h<=im.height
   anchor=bool(x<=s['bodyDatumX']<=x+w and y<=s['footDatumY']<=y+h)
   sha=hashlib.sha256(b).hexdigest();row={'proposal':str(f),'source':str(p),'sha256':sha,'sourceSHAMatches':sha==rp['sha256'],'sourceRect':s['sourceRect'],'strongAlpha32BoundsLTRB':bbox,'strongAlphaFitsSourceRect':inside,'rectFitsImage':valid,'anchorWithinFrame':anchor,'facing':s.get('facing'),'sourcePixelsModified':False}
   rows.append(row)
   if not all([row['sourceSHAMatches'],inside,valid,anchor]):errors.append(row)
r={'schema':'cqc.p54.source-contract-read-only-qa/1','atUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'checks':len(rows),'errors':errors,'errorCount':len(errors),'rows':rows,'scope':'Byte hashes, rectangle/strong-alpha inclusion and bounded anchor only. This does not certify boot anatomical supports, scale, canonical fidelity or game admission.','pixelsModified':False}
f=T/'qa/art/P54_SOURCE_CONTRACT_BOUNDS_QA_PRIVATE_V1.json';f.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'checks':len(rows),'errors':len(errors),'path':str(f)}))
