"""Native independent painting registration with unchanged generated PNG bytes."""
import pathlib,json,copy,hashlib,datetime,os
from PIL import Image
ROOT=pathlib.Path('/tmp/cqc-pass19-nextgen-generation'); BASE=pathlib.Path('/tmp/cqc-pass18-application/public/cqc')
UIDS=['core__snake_gb','core__chris_jenner','core__campbell_mpo','core__cunningham']
meta=json.loads((ROOT/'approved-identities-v1.json').read_text());now=datetime.datetime.now(datetime.timezone.utc).isoformat()
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def new(path,data):
 path.parent.mkdir(parents=True,exist_ok=True)
 with path.open('x') as f:json.dump(data,f,ensure_ascii=False,indent=2);f.write('\n')
 path.chmod(0o400)
additions=[];allItems=[]
for uid in UIDS:
 original=json.loads((ROOT/'source-entries'/f'{uid}.json').read_text());sprite=copy.deepcopy(original);pins=[];heights={};used=set()
 for side,key in [('right','actions'),('left','oppositeActions')]:
  source=ROOT/'generation'/uid/meta[uid]['selectedSources'][side];layout=json.loads((source.parent/(side+'-native-layout-v1.json')).read_text());assert layout['source']==str(source) and layout['sha256']==digest(source);assert not layout['warnings'];assert layout['physicalPoseCount']==16
  runtime=f'assets/combat-costumes-pass19/{uid}/nextgen/{source.name}';target=ROOT/runtime;target.parent.mkdir(parents=True,exist_ok=True);os.link(source,target);heights[runtime]=layout['sourceFrameHeight']
  pins.append({'side':side,'nativeSource':str(source),'runtimeFile':runtime,'bytes':source.stat().st_size,'sha256':digest(source),'dimensions':layout['dimensions'],'physicalPoseCount':16,'layoutPath':str(source.parent/(side+'-native-layout-v1.json')),'layoutSHA256':digest(source.parent/(side+'-native-layout-v1.json')),'originalPixelsChanged':False})
  dims={}
  for definition in sprite[key].values():
   new_frames=[]
   for f in definition['frames']:
    oldfile=f['file']
    if oldfile not in dims:
     with Image.open(BASE/oldfile) as im:dims[oldfile]=im.size
    x,y,w,h=f['rect'];ow,oh=dims[oldfile];index=min(3,int((y+h/2)/(oh/4)))*4+min(3,int((x+w/2)/(ow/4)));p=layout['poses'][index];used.add((side,index))
    new_frames.append({'file':runtime,'sha256':layout['sha256'],'rect':p['rect'],'pivot':p['pivot'],**({'clipPolygon':p['clipPolygon']} if p.get('clipPolygon') else {})})
   definition['frames']=new_frames
 sprite['baseFrameHeight']=heights[pins[0]['runtimeFile']];sprite['sourceFrameHeights']=heights;sprite['renderStyle']='painted';sprite['incarnation']=original['incarnation']+' — independently painted contemporary presentation of the same original outfit'
 sprite['costumeConcept']={'schema':'cqc.costume-design/1','sourceUID':uid,'family':'nextgen','originalDesign':True,'canonicalAppearanceAttested':False,'designScope':'painted presentation reconstruction of the same attested outfit; no invented canonical costume'}
 urls=['https://metalgear.konami.net/manual/mc2/mggb/ps5/en/img/02_02.png','https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2008/5-solidsnake.png'] if uid=='core__snake_gb' else ['https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2008/4-chris.png','https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2012/18-jennerjerk24.png'] if uid=='core__chris_jenner' else ['https://archive.org/download/the-mgs-po-artbook/page/n18.jpg'] if uid=='core__campbell_mpo' else ['https://archive.org/download/the-mgs-po-artbook/page/n32.jpg']
 source_scope='Physically inspected original GBC portrait/gameplay colour and shape context. New detailed side-view seams, materials and face modelling are authored conservative interpretations; no detailed original GBC model or official newly released costume is claimed.' if uid in UIDS[:2] else 'Physically inspected original Portable Ops-era published model render from scanned character page; hosted archive compilation publisher/authenticity independently unconfirmed. Provides visible costume, palette and anatomy; newly detailed fabric/material painting is an authored presentation, not a different canonical costume.'
 sources=[{'url':url,'scope':source_scope} for url in urls]
 limitations=['Exactly16 actual painted physical poses per independent direction,32 per option; action groups explicitly reuse poses and do not claim full extracted motion cycles.','Detailed contemporary presentation preserves source outfit, age and palette; unreadable small original details are qualified painted interpretations. No certified absolute1:1 or new official costume attestation.','Original base/source catalogues and PNG bytes remain unchanged; new native PNGs are independent imagegen outputs. Alpha geometry and optional Canvas vector contours only, no raster editing/resampling/mirroring.','Same UID, actionMap, phaseMap, timings and numerical character stats inherited. Match gameplay validation belongs to root integration.']
 if uid=='core__chris_jenner':limitations+=['Existing R5 carbine loadout is an explicit CQC gameplay adaptation supported by original inventory, not an original cutscene-specific possession attestation.','All source31 used physical keys preserved. One additional physical LEFT grenade-windup keypose remains intentionally unused, matching the source layout without assigning grenade art to empty-handed throws.']
 if uid=='core__cunningham':limitations+=['AnatomicalRIGHT lower-leg prosthesis, organicLEFT boot and organic arms/head retained in both independent camera views. No handheld pistol added. Mounted hover-platform boss rig remains outside this human costume source.']
 if uid in ['core__campbell_mpo','core__cunningham']:limitations+=['Base atlas was already a painted presentation despite queue basePresentation retro era label. This is a new finer painted rendering, not a claim the prior PNG was pixel art.']
 sprite['review']={'status':'approved','reviewer':'pass19-nextgen-native-physical32pose-and-original-source-review','reviewedAt':now,'sourceKind':'original-character','sources':sources,'checks':{k:True for k in ['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground']},'limits':limitations+original.get('review',{}).get('limits',[])}
 option={'id':'nextgen','family':'nextgen','label':'Nouvelle génération','sprite':sprite,'presentation':{'kind':'authored-nextgen-presentation','originalPresentation':True,'sourceAppearancePreserved':True},'provenance':{'kind':'style-reinterpretation','sourceUID':uid,'originalDesign':True,'canonicalAppearanceAttested':False,'designScope':'Contemporary painted presentation of the same original incarnation/outfit; new fine detail reconstruction only.','sources':sources},'assetReview':{'status':'verified','independentArt':True,'reviewer':'pass19-nextgen-native-physical32pose-and-source-review','reviewedAt':now,'physicalPoseCount':32,'allDirectionsReviewed':True}}
 new(ROOT/'options'/f'{uid}-nextgen-native-v1.json',option);additions.append({'uid':uid,'option':option});allItems.append({'uid':uid,'sourceEntry':str(ROOT/'source-entries'/f'{uid}.json'),'sourceEntrySHA256':digest(ROOT/'source-entries'/f'{uid}.json'),'optionPath':str(ROOT/'options'/f'{uid}-nextgen-native-v1.json'),'optionSHA256':digest(ROOT/'options'/f'{uid}-nextgen-native-v1.json'),'physicallyGeneratedPoses':32,'sourceUsedKeysPreserved':len(used),'nativeUnusedPoseIndices':[{'side':side,'index':i}for side in ['right','left']for i in range(16)if(side,i)not in used],'pins':pins,'sameActionMap':sprite.get('actionMap')==original.get('actionMap'),'samePhaseMap':sprite.get('phaseMap')==original.get('phaseMap'),'sameDisplayHeight':sprite['displayHeight']==original['displayHeight']})
new(ROOT/'NEXTGEN_NATIVE_ADDITIONS_V1.json',additions)
new(ROOT/'NEXTGEN_NATIVE_ASSET_MAP_V1.json',{'schema':'cqc.pass19.nextgen-native-delivery/1','createdAt':now,'status':'ready-native-awaiting-browser-proof','items':allItems,'nativePNGs':8,'actualPhysicalPoses':128,'usedSourceMappedPhysicalPoses':sum(i['sourceUsedKeysPreserved']for i in allItems),'PNGBytes':sum(p['bytes']for i in allItems for p in i['pins']),'canonicalNewOfficialCostumeClaimed':False})
js='/* Independently painted faithful source presentations; new fine detail is authored. */\n(function(root){\'use strict\';const additions='+json.dumps(additions,separators=(',',':'),ensure_ascii=False)+';if(!root.CQC_PASS19_COSTUMES)throw Error(\'Native costume registry absent\');root.CQC_PASS19_NEXTGEN_REGISTRATION=root.CQC_PASS19_COSTUMES.registerBatch(additions);root.CQC_PASS19_NEXTGEN_UIDS=Object.freeze(additions.map(item=>item.uid));})(globalThis);\n'
p=ROOT/'cqc-pass19-nextgen-native-costumes.js'
with p.open('x')as f:f.write(js)
p.chmod(0o400);print(json.dumps({'catalogPath':str(p),'catalogSHA256':digest(p),'nativePNGs':8,'physicalPoses':128,'sourceMappedPoseKeys':sum(i['sourceUsedKeysPreserved']for i in allItems)}))
