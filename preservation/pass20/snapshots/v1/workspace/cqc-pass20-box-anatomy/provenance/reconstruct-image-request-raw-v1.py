"""Read-only reconstruction of the original image-generation response JSON.

The compact JSON and every pinned native PNG are input-only. Output, when given,
is created exclusively; existing files are never overwritten.
"""
from pathlib import Path
import argparse,base64,hashlib,json,copy
p=argparse.ArgumentParser();p.add_argument('--output');a=p.parse_args()
source=Path(__file__).with_name('IMAGE_GENERATION_REQUESTS_ACTUAL_V1.json')
data=json.loads(source.read_bytes());original=copy.deepcopy(data)
dedup=original.pop('rawResultContentDeduplication')
for request in original['requests']:
 record=request.pop('imageResultContentDeduplication');raw=Path(record['nativeImagePath']).read_bytes()
 assert len(raw)==record['bytes']
 assert hashlib.sha256(raw).hexdigest()==record['sha256']
 values=request['result'];values['image_url']=record['uriPrefix']+base64.b64encode(raw).decode()
 request['result']={key:values[key]for key in record['originalResultKeyOrder']}
raw=(json.dumps(original,indent=2)+'\n').encode()
assert len(raw)==dedup['priorRawJSONBytes']
assert hashlib.sha256(raw).hexdigest()==dedup['priorRawJSONSHA256']
if a.output:
 with open(a.output,'xb')as output:output.write(raw)
print(json.dumps({'status':'exact-original-raw-JSON-reconstruction-verified',
 'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'nativePNGsRead':len(original['requests']),
 'inputSourcesChanged':False,'output':a.output}))
