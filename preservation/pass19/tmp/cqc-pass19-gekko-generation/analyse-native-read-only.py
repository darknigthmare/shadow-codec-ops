from pathlib import Path
import json,hashlib
import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.spatial import ConvexHull

base=Path('/tmp/cqc-pass19-gekko-generation')
records=[]
for f in sorted((base/'native-originals').glob('*.png')):
    im=Image.open(f)
    alpha=np.array(im.getchannel('A'))
    labels,n=ndimage.label(alpha>8)
    boxes=ndimage.find_objects(labels)
    counts=np.bincount(labels.ravel())
    parts=[]
    for label,box in enumerate(boxes,1):
        if box is None or counts[label]<300: continue
        yy,xx=np.nonzero(labels[box]==label)
        xx=xx+box[1].start; yy=yy+box[0].start
        points=np.c_[xx,yy]
        hull=ConvexHull(points)
        polygon=points[hull.vertices].tolist()
        if len(polygon)>64: polygon=polygon[::int(np.ceil(len(polygon)/64))]
        parts.append({'label':label,'area':int(counts[label]),'rect':[box[1].start,box[0].start,box[1].stop-box[1].start,box[0].stop-box[0].start],'center':[round(float(xx.mean()),2),round(float(yy.mean()),2)],'sourceClipPolygonNativeXY':polygon})
    parts.sort(key=lambda x:(x['center'][1],x['center'][0]))
    records.append({'file':f.name,'width':im.width,'height':im.height,'mode':im.mode,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'alphaExtrema':[int(alpha.min()),int(alpha.max())],'alphaZeroPercent':round(float((alpha==0).mean()*100),4),'alphaThresholdForGeometry':8,'minimumComponentArea':300,'pixelEditingPerformed':False,'parts':parts})
(base/'qa/NATIVE_GEOMETRY_ANALYSIS_V1.json').write_text(json.dumps(records,indent=2)+'\n')
for r in records:
    print(r['file'],'alpha0',r['alphaZeroPercent'],'components',[(p['label'],p['rect'],p['center']) for p in r['parts']])
