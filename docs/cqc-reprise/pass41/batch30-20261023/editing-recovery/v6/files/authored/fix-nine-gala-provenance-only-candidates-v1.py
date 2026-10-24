"""Correct URL-vs-local provenance structure only; preserve every art/game value."""
from pathlib import Path
import json,gzip,hashlib,copy
R=Path('@PROJECT_ROOT@');inputs=json.loads((R/'authored/NINE_GALA_DISPATCH_FIXED_INPUTS_CANDIDATE_V2.json').read_text());contracts=json.loads(gzip.decompress((R/'integration/ACTUAL_FIGHTER_CONTRACTS_P41_V1.json.gz').read_bytes()))['entries'];out=R/'integration/gala-provenance-fixed-v1';out.mkdir();manifest=[]
for item in inputs:
 uid=item['uid'];typ=item['type'];old=R/'integration'/('gala-'+typ+'-'+uid+'-manual-axes-v2/JOB_FOR_ROOT_REVIEW.json')
 if uid=='roster50__nastasha_mgs1':old=R/'integration/gala-pure-roster50__nastasha_mgs1-provenance-v3/JOB_FOR_ROOT_REVIEW.json'
 if uid=='roster50__campbell_mg2':old=R/'integration/gala-ballistic-roster50__campbell_mg2-calibration-transfers-v1/JOB_FOR_ROOT_REVIEW.json'
 before=json.loads(old.read_text());j=copy.deepcopy(before);local=[s for s in j['provenance']['sources']if not s.get('url')];urls=[s for s in j['provenance']['sources']if s.get('url')];assert all(s['url'].startswith('https://')for s in urls)
 if local:j['provenance']['nativeSourceReferences']=local
 if not urls:
  expected='https://www.creativeuncut.com/gallery-06/mgs4-otacon.html';inherited=contracts[uid]['sprite']['review']['sources'];assert any(s.get('url')==expected for s in inherited)
  urls=[{'url':expected,'scope':'Inherited exact original P18 reviewed identity reference for Otacon MGS4. Not independently retrieved in this Gala batch; not newly claimed physically viewed publisher evidence. The new Gala tuxedo and combat drawings are original CQC adaptations. Existing native generated source rows are separately qualified under nativeSourceReferences.'}]
 j['provenance']['sources']=urls
 # The only mutation is provenance; all pixel/height/role/axis/point/plan data stay exact.
 check=copy.deepcopy(j);check['provenance']=before['provenance'];assert check==before
 d=out/uid;d.mkdir();raw=(json.dumps(j,indent=2)+'\n').encode();p=d/'JOB_FOR_ROOT_REVIEW.json';p.write_bytes(raw);review=json.loads((old.parent/'ROOT_REVIEW_PENDING.json').read_text());review['inputSHA256']=hashlib.sha256(raw).hexdigest();review['observations'].append('Provenance-only migration: sources[] contains HTTPS URLs; generated local source records move to nativeSourceReferences. Source art, H, roles, pivots, plan and native sockets are unchanged. Inherited Otacon reference remains explicitly qualified, not newly physically reviewed.');(d/'ROOT_REVIEW_PENDING.json').write_text(json.dumps(review,indent=2)+'\n');manifest.append({'uid':uid,'type':typ,'sourceJob':str(old),'job':str(p),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'changedFields':['provenance'],'approved':False})
q=R/'authored/NINE_PROVENANCE_FIXED_JOBS_CANDIDATE_V1.json';q.write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps(manifest))
