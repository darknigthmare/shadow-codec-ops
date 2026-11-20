from pathlib import Path
from PIL import Image
import json,hashlib,datetime
p=Path(__file__).parent;briefs={r['id']:r for r in json.loads((p/'assigned-briefs.json').read_text())};refs=json.loads((p/'reference-index.json').read_text());prompts={r['id']:r for r in json.loads((p/'generation-prompts.json').read_text())};out=[]
for f in sorted(p.glob('oc-*-generation-receipt.json')):
 r=json.loads(f.read_text());ident=r['id'];b=briefs[ident];raw=Path(r['rawPNG']);im=Image.open(raw);a=im.getchannel('A');bbox=a.point(lambda x:255 if x>16 else 0).getbbox();y0=bbox[1]+int((bbox[3]-bbox[1])*.92);ys=range(y0,bbox[3]);xs=[x for x in range(im.width) if sum(a.getpixel((x,y))>16 for y in ys)>3];runs=[]
 for x in xs:
  if not runs or x>runs[-1][-1]+1:runs.append([x])
  else:runs[-1].append(x)
 feet=[{'xmin':q[0],'xmax':q[-1],'soleY':max(y for y in ys if any(a.getpixel((x,y))>16 for x in q))}for q in runs if len(q)>5]
 datum=sum((q['xmin']+q['xmax'])/2 for q in feet)/len(feet);floor=max(q['soleY']for q in feet)+1
 body=[bbox[0],bbox[1],bbox[2]-bbox[0],bbox[3]-bbox[1]]
 if ident=='OC-001':body=[118,21,612,1489]
 d={'schema':'cqc.p54.original-costume-static-artifact/1','id':ident,'uid':b['uid'],'character':b['character'],'name':b['name'],'family':b['family'],'isOfficial':False,'status':'new_static_right_pose_visual_review_pending','historicalBrief':b['concept'],'historicalMissingPath':b['historicalExpectedArtPath'],'historicalMissingSHA256':b['historicalExpectedArtSHA256'],'newVersionNotRecoveredBytes':True,'rawPNG':{'path':str(raw),'bytes':len(raw.read_bytes()),'sha256':hashlib.sha256(raw.read_bytes()).hexdigest(),'width':im.width,'height':im.height},'frame':{'rect':[0,0,im.width,im.height],'pivot':[datum/im.width,floor/im.height],'bodyBounds':body,'bodyDatumX':datum,'footDatumY':floor},'alphaQA':{'strongAlphaThreshold':16,'strongAlphaBBoxXYXY':list(bbox),'cornerAlpha':r['cornerAlpha'],'alphaRange':r['alphaExtrema'],'sourcePixelsModified':False},'supportPointQA':{'method':'Read-only alpha segmentation of lowest8percent silhouette, equal weighting of separated boot intervals; lowest sole determines floor; retain far-foot perspective height difference.','lowerBandY0':y0,'footIntervals':feet},'references':[q for q in refs if q['id']==ident],'prompt':prompts[ident]['prompt'],'newDrawings':1,'newAnimations':0,'runtimeAdmission':False,'limits':['New authored interpretation of the pre-established ORIGINAL CQC costume brief; not an official alternative costume.','Faithfulness of identity is based on physically viewed preserved CQC incarnation references; no pixel-perfect Konami model certification.','No left-facing draw, animation continuity, hitboxes or playable admission delivered by this source.']}
 if ident=='OC-009':d.update(userAuthorizedInterpretation='Historical pilot-seat phrase conflicts with latest user machine-only rule; new version is completely nonhuman autonomous Cunningham-inspired machine. Historical brief retained unchanged above.')
 target=p/(ident.lower()+'-ARTIFACT_PROPOSAL_PRIVATE_V1.json');target.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');out.append({'id':ident,'proposal':str(target),'sourceSHA256':d['rawPNG']['sha256'],'bodyDatumX':datum,'floorY':floor})
(p/'CURRENT_SUCCESSFUL_PROPOSALS_PRIVATE_V1.json').write_text(json.dumps({'rows':out,'newPoses':len(out)},ensure_ascii=False,indent=2)+'\n');print(json.dumps(out))
