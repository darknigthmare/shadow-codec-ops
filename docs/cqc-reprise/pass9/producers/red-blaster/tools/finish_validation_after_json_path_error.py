"""Resume metadata serialization only from the completed native measurements."""
from pathlib import Path
import sys,json,hashlib,copy,shutil
sys.dont_write_bytecode=True
BASE=Path(__file__).resolve().parents[1]
sys.path.insert(0,'/workspace/cqc-game-working/cqc-versus-v056/tools')
from prepare_combat_sprite import validate_entry
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
d=json.loads((BASE/'FINAL_DELIVERY.json').read_text());UID=d['uid'];tables={};body_hashes=[]
for row in d['sourceFiles']:
 assert sha(row['source'])==row['sha256']==sha(row['nativeOriginal'])
 assert sha(row['layout'])==row['layoutSHA256']
 doc=json.loads(Path(row['layout']).read_text());tables[row['key']]=doc['cells']
 body_hashes.extend(cell['bodyAlpha80SHA256']for cell in doc['cells'])
assert len(body_hashes)==len(set(body_hashes))==72
entry={'uid':UID,'name':d['name'],'game':d['game'],'incarnation':d['incarnation'],'coverage':'action-frames','displayHeight':d['displayHeight'],'baseFrameHeight':350,'sourceFrameHeights':{r['file']:r['standingSourceHeight']for r in d['sourceFiles']},'facing':1,'mirror':False,'fallbackMissingActions':True,'actionMap':d['actionMap'],'phaseMap':copy.deepcopy(d['phaseMap']),'actions':{},'oppositeActions':{},'review':d['review']}
for side,target in [('right','actions'),('left','oppositeActions')]:
 for action,spec in d['actionLayout'].items():
  cells=tables[spec['sheet']+'-'+side]
  entry[target][action]={'fps':spec['fps'],'loop':spec['loop'],'frames':[copy.deepcopy(cells[i]['frame'])for i in spec['indices']]}
 entry[target]['attack']=copy.deepcopy(entry[target]['punch'])
entry['phaseMap']['attack']=copy.deepcopy(entry['phaseMap']['punch'])
source_rows=[{'file':r['file'],'source':r['source']}for r in d['sourceFiles']]
physical=validate_entry(entry,source_rows,{UID})
unique={(f['file'],tuple(f['rect']))for group in [*entry['actions'].values(),*entry['oppositeActions'].values()]for f in group['frames']};assert len(unique)==72
report={'schema':'cqc.pass9.red-blaster-producer-validation/1','entry':entry,'sourceFiles':source_rows,'physical':physical,'independentAlpha80BodyHashes':body_hashes,'poseCount':72,'uniqueFrameRectSourcePairs':len(unique),'imagePixelsEdited':False,'catalogImported':False,'scope':'Pure validate_entry on completed producer metadata; browser/helper/runtime integration not performed.','resumedAfterMetadataOnlyFailure':True}
out=BASE/'PRODUCER_VALIDATION_REVIEW.json'
with out.open('x')as f:json.dump(report,f,ensure_ascii=False,indent=2,default=str);f.write('\n')
independent=BASE/'independent-review/SIX_NATIVE_SOURCES_VISUAL_ALPHA_INDEPENDENT_REVIEW.json'
d['producerTechnicalReview']={'path':str(out),'sha256':sha(out),'uniqueNativeBodyPoses':72,'uniqueFrameRectSourcePairs':72,'runtimeImported':False}
d['independentSourceReview']={'path':str(independent),'sha256':sha(independent),'status':json.loads(independent.read_text())['status'],'scope':'Six sources and six references physically viewed; authoritative layouts remain producer-measured, no browser approval.'}
d['nativeAttemptIndex']={'path':str(BASE/'NATIVE_PNG_INDEX.json'),'sha256':sha(BASE/'NATIVE_PNG_INDEX.json')}
final=BASE/'FINAL_DELIVERY.json';old=final.read_bytes();backup=final.with_name('FINAL_DELIVERY.previous-'+hashlib.sha256(old).hexdigest()[:12]+'.json');backup.write_bytes(old)
final.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'delivery':str(final),'sha256':sha(final),'sourcePNG':6,'poses':72,'uniqueAlpha80BodyHashes':72,'uniqueFrameSourceRectPairs':72,'standingSourceHeights':{r['key']:r['standingSourceHeight']for r in d['sourceFiles']},'originsFile':d['nativeSourceCombatOrigins'],'freeBytes':shutil.disk_usage('/workspace').free,'runtimeImported':False},indent=2))
