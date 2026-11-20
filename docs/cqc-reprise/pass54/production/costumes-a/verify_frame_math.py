from pathlib import Path
from PIL import Image
import json,hashlib,zlib,struct
p=Path(__file__).parent;rows=[]
for f in sorted(p.glob('oc-*-ARTIFACT_PROPOSAL_PRIVATE_V1.json')):
 d=json.loads(f.read_text());raw=Path(d['rawPNG']['path']).read_bytes();assert hashlib.sha256(raw).hexdigest()==d['rawPNG']['sha256'];assert raw[:8]==b'\x89PNG\r\n\x1a\n';offset=8;chunks=0
 while offset<len(raw):
  size=struct.unpack('>I',raw[offset:offset+4])[0];part=raw[offset+4:offset+8+size];crc=struct.unpack('>I',raw[offset+8+size:offset+12+size])[0];assert (zlib.crc32(part)&0xffffffff)==crc;offset+=size+12;chunks+=1
 assert offset==len(raw)
 with Image.open(d['rawPNG']['path'])as im:im.verify()
 b=d['frame']['bodyBounds'];scale=300/b[3];anchor=d['frame']['bodyDatumX'];floor=d['frame']['footDatumY'];bb=d['alphaQA']['strongAlphaBBoxXYXY'];projected=[160+(bb[0]-anchor)*scale,340+(bb[1]-floor)*scale,160+(bb[2]-anchor)*scale,340+(bb[3]-floor)*scale];assert 0<=projected[0]<projected[2]<=320 and 0<=projected[1]<projected[3]<=360
 rows.append({'id':d['id'],'sourceSHA256':d['rawPNG']['sha256'],'pngBytes':len(raw),'pngCRCsVerified':chunks,'PILDecodedAndVerified':True,'canvas':[320,360],'nominalBodyHeight':300,'scale':scale,'projectedStrongBoundsXYXY':projected,'supportCentreX':160,'lowestSoleY':340,'noStrongAlphaClipping':True,'pixelsEdited':False})
report={'schema':'cqc.p54.costumes-a.read-only-source-geometry-check/1','rows':rows,'status':'PASS_READ_ONLY_GEOMETRY_AND_PNG','newStaticPoses':len(rows),'newAnimations':0,'sourcePixelsModified':False,'note':'Mathematical placement and source integrity only; does not claim browser or combat runtime validation.'};(p/'CURRENT_FRAME_MATH_QA_PRIVATE_V1.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'poses':len(rows),'status':report['status']}))
