from pathlib import Path
import json,hashlib,shutil,re
T=Path('/tmp/cqc-p54-20261120');root=T/'project';data=json.loads((T/'reporting/P54_NORMALIZED_SOURCE_INVENTORY_PRIVATE_V1.json').read_text());rows=[]
for row in data['rows']:
 assert row['anchorX'] is not None and row['footY'] is not None
 src=Path(row['path']);b=src.read_bytes();assert hashlib.sha256(b).hexdigest()==row['SHA256']
 name=re.sub('[^a-z0-9_-]','-',row['id'].lower())+'--'+row['SHA256'][:12]+'.png';out=root/'public/cqc/assets/p54-poses'/name
 if not out.exists():shutil.copyfile(src,out)
 assert out.read_bytes()==b
 episode=row['edition']
 if row['kind']=='character':label='Tenue de service'
 else:label=row['label']
 item={k:row[k]for k in ['id','uid','character','kind','family','sourceRect','anchorX','footY','SHA256','referenceURLs']}
 item.update(label=label,episode=episode,src='../../assets/p54-poses/'+name)
 if row.get('bodyBounds'):item['bodyBounds']=row['bodyBounds']
 rows.append(item)
assert len(rows)==21
out=root/'public/cqc/atelier/p54-dossiers/catalog.json';out.write_text(json.dumps({'schema':'cqc.p54.field-archive/1','entries':rows},ensure_ascii=False,indent=2)+'\n')
p=root/'public/cqc/modules/atelier-v056.html';s=p.read_text();s=s.replace('<nav><a href="../atelier/marches-p53/index.html">','<nav><a href="../atelier/p54-dossiers/index.html">Dossiers des renforts et équipements</a><a href="../atelier/marches-p53/index.html">');p.write_text(s)
print('gallery',len(rows),'poses,21exactPNGcopies')
