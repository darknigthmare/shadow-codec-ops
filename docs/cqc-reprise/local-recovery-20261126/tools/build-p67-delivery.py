from pathlib import Path
from collections import Counter
import copy, hashlib, json, struct, zlib
from PIL import Image
import numpy as np

ROOT=Path('/mnt/data/cqc-p66/shadow-codec-ops')
BASE='5d7c6c5187f3906ad1ead53706e83674750f1c34'
BRANCH='codex/cqc-p61-missing-static-sources-20261125'
WEB=f'https://github.com/darknigthmare/shadow-codec-ops/blob/{BRANCH}/'
RESEARCH='docs/cqc-reprise/pass67/research/vpp-online/'
PASS='docs/cqc-reprise/pass67/'
DAY='2026-11-26'

def read(p): return json.loads((ROOT/p).read_text())
def js(p,obj):
    target=ROOT/p;target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
def txt(p,s):
    target=ROOT/p;target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(s.rstrip()+'\n')
def metadata(p):
    b=(ROOT/p).read_bytes(); assert b[:8]==b'\x89PNG\r\n\x1a\n'
    at=8; chunks=[]; compressed=b''
    while at<len(b):
        n=struct.unpack('>I',b[at:at+4])[0];typ=b[at+4:at+8];data=b[at+8:at+8+n]
        crc=struct.unpack('>I',b[at+8+n:at+12+n])[0]
        assert (zlib.crc32(typ+data)&0xffffffff)==crc,(p,typ)
        chunks.append(typ.decode());at+=n+12
        if typ==b'IDAT':compressed+=data
        if typ==b'IEND':break
    assert at==len(b) and chunks[0]=='IHDR' and chunks[-1]=='IEND'
    decoded=zlib.decompress(compressed)
    with Image.open(ROOT/p) as im:
        im.load();assert im.mode=='RGBA'
        ar=np.array(im.getchannel('A'))
        hist=np.bincount(ar.reshape(-1),minlength=256)
        bounds={}
        edges={}
        for threshold in [0,16,128]:
            ys,xs=np.where(ar>threshold)
            bounds[str(threshold)]=[int(xs.min()),int(ys.min()),int(xs.max()+1),int(ys.max()+1)] if len(xs) else None
            edge=np.concatenate([ar[0,:],ar[-1,:],ar[1:-1,0],ar[1:-1,-1]])
            edges[str(threshold)]=int((edge>threshold).sum())
        d={'width':im.width,'height':im.height,'colorMode':im.mode,'alphaExtrema':[int(ar.min()),int(ar.max())],
           'alphaStats':{'fullyTransparentPixels':int(hist[0]),'nearOpaquePixels250To255':int(hist[250:].sum()),'semiTransparentPixels1To249':int(hist[1:250].sum()),'boundsByThreshold':bounds,'edgePixelsByThreshold':edges}}
        assert len(decoded)==im.height*(1+im.width*4),(p,len(decoded))
    d.update(bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),gitBlobSha=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest(),bitDepth=b[24],colorType=b[25],pngIntegrity={'crcValid':True,'allChunksParsed':True,'idatDecompressionValid':True,'decodedScanlineBytes':len(decoded),'trailingBytes':0})
    return d

episodes={'mgo3':'Metal Gear Online 3','mgo2':'Metal Gear Online 2','mgo1':'Metal Gear Online 1','mobile':'Metal Gear Solid Mobile','gz':'Metal Gear Solid V: Ground Zeroes','tpp':'Metal Gear Solid V: The Phantom Pain'}
official='https://www.konami.com/mg/mgs5/tpp/jp/online/class.php'
video=lambda x:'https://www.youtube.com/watch?v='+x
details={
 'mgo3-scout-nvg-mantle-portrait':dict(key='mgo3',work='character:R-MGO3',body='portrait',edition='MGO3 — capture officielle Konami, classe Scout, preset précis',urls=[official],scope='Portrait du preset Scout au masque optique et à la pèlerine camouflage, dans sa gestuelle visible. Pas de corps complet ni de tenue universelle de classe.',notes=['Source officielle 420×237 : masque optique vert, casque audio, cagoule et cape camouflage reconnaissables. Les lentilles, raccords, motifs de tissu et microtextures sont reconstruits, pas mesurés sur le modèle natif.','La v1 touchait le bord supérieur. La v2 redonne une marge transparente au-dessus de toute la tête ; l’original est archivé hors Atlas et runtime.','Le bas du torse constitue la limite volontaire du portrait ; aucun pantalon ni équipement caché n’est inventé.']),
 'mgo3-enforcer-visor-portrait':dict(key='mgo3',work='character:R-MGO3',body='portrait',edition='MGO3 — capture officielle Konami, classe Enforcer, preset précis',urls=[official],scope='Portrait du preset Enforcer au casque à visière, dans la pose officielle observée.',notes=['Casque, visière sombre et protection du haut du corps fondés sur la capture officielle 420×237. Petits éléments, attaches et textures reconstruits.','Un portrait de preset ne recense pas toutes les tenues Enforcer, toutes les faces ni les animations. Aucun bas du corps ajouté.']),
 'mgo3-infiltrator-balaclava-portrait':dict(key='mgo3',work='character:R-MGO3',body='portrait',edition='MGO3 — capture officielle Konami, classe Infiltrator, preset précis',urls=[official],scope='Portrait du preset Infiltrator à cagoule, limité au cadre officiel.',notes=['Cagoule, regard, protection du cou et équipement visibles suivis dans l’image officielle 420×237. Les détails fins ne sont pas attestés à l’échelle du pixel.','Le bas du buste atteint volontairement le bord du portrait. Ce cadrage ne constitue pas un corps complet.']),
 'mobile-ngage-olive-guard':dict(key='mobile',work='character:R-SIDE-CATALOG',body='full_body',edition='Metal Gear Solid Mobile — version N-Gage attribuée à la capture de gameplay',urls=['https://vgsmproject.com/2018/04/23/metal-gear-solid-mobile/','https://sites.google.com/site/jamesblackham/metal-gear-solid--mobile--n-gage'],scope='Un garde olive au gilet sombre, sujet gauche de la capture N-Gage, isolé dans sa pose et son esthétique polygonale.',notes=['Le corps complet et l’arme du garde gauche sont visibles dans metalgear2.jpg. Le garde droit ne fournit qu’un recoupement de silhouette ; la première image de la salle vide n’est pas utilisée comme preuve de personnage.','Proportions polygonales compactes et palette olive conservées. Les contours et couleurs restent une reconstruction générée, pas une extraction déterministe.','L’édition mobile est séparée des modèles PSP, PS1 et MGO. R-SIDE-CATALOG demeure partagé et ouvert pour les autres jeux.']),
 'mgo1-rowdy-reiko-idle':dict(key='mgo1',work='character:R-MGO1',body='full_body',edition='MGO1 / Subsistence PS2 — séquence native du personnage Rowdy Reiko',urls=[video('76rnHWqqP88')],scope='Rowdy Reiko en tenue noire, cheveux blonds courts et lunettes, une pose de repos observée dans MGO1.',notes=['Veste noire à liserés clairs, cravate, bas court, cuisses découvertes et bottes hautes repris du personnage de Subsistence, pas du costume Rumble Roses.','Les vignettes 320×180 limitent le détail du visage, du tatouage et des coutures. Le motif de cuisse est simplifié ; aucune certification de texture.','La variante Reiko normale en camouflage est distincte et n’est pas couverte par ce PNG.']),
 'tpp-evangelos-constantinou-hospital':dict(key='tpp',work='character:R-TPP-doctor',body='full_body',edition='TPP — prologue hospitalier, cutscene du jeu publié',urls=[video('zDegziz58-A'),video('ZS5BLbD4vWU')],scope='Dr Evangelos Constantinou en blouse blanche, une pose debout neutre reconstituée à partir de plusieurs vues de l’hôpital.',notes=['Visage, lunettes rondes, blouse et chemise verte établis par les vues rapprochées ; pantalon gris sombre et chaussures noirs corroborés par une autre vue du corps.','La pose debout isolée est une recomposition : elle n’est pas identique à une image native unique. Visage, badge, poches et microtextures restent reconstruits.','Aucune posture ou fonction de combat déduite du statut de médecin.']),
 'mgo2-white-beret-black-uniform-preset':dict(key='mgo2',work='character:R-MGO2',body='full_body',edition='MGO2 — preset personnalisé observé dans le menu du jeu',urls=[video('Sw7yp3t0zx8')],scope='Un avatar MGO2 au béret blanc, cagoule et uniforme noirs, avec bandoulière claire.',notes=['Béret, cagoule à motif clair, tenue et bandoulière observés dans les vues complètes 240×180. Aucun équipement d’un autre preset ajouté.','Motif exact du masque, nombre et épaisseur des éléments de bandoulière, mains et matière textile sont reconstruits.','Ce preset enrichit R-MGO2 ; il ne couvre ni le catalogue d’avatars ni toutes les tenues.']),
 'mgo3-scout-patrol-cap-preset':dict(key='mgo3',work='character:R-MGO3',body='full_body',edition='MGO3 — preset Scout à casquette, menu natif',urls=[video('Ep8Mr3CQiEY')],scope='Un preset Scout complet à casquette olive, veste camouflage et arme en bandoulière.',notes=['Seule la première feuille de la vidéo est utilisée pour ce preset ; les variantes de coiffure suivantes sont exclues afin de ne pas mélanger les équipements.','Corps, casquette, gilet, pantalon et bottes sont visibles dans la référence. Visage, mains, configuration des poches et texture restent reconstruits.','La catégorie Scout ne fixe pas un uniforme unique ; ce fichier représente seulement l’avatar observé.']),
 'mgo3-infiltrator-respirator-preset':dict(key='mgo3',work='character:R-MGO3',body='full_body',edition='MGO3 — preset Infiltrator au masque respirateur, menu natif',urls=[video('0whcXk5SnHU')],scope='Un preset Infiltrator complet avec masque gris, torse clair, poches olive et protections de genoux.',notes=['Deux feuilles de menu établissent le masque fermé, les lentilles sombres, le torse crème, les poches et les protections de jambes.','Formes des conduits du masque, raccords des plaques, poches et plis reconstruits. Pas de géométrie native certifiée.','Une pose de menu sans arme tenue ; pas une animation de garde ou de déplacement.']),
 'gz-camp-omega-poncho-salute-portrait':dict(key='gz',work='character:R-GZ-camp',body='portrait',edition='Ground Zeroes — introduction Camp Omega, capture native PC',urls=[video('G80bgC6koq8')],scope='Portrait du garde de Camp Omega en poncho olive qui salue dans l’introduction.',notes=['Seul le garde au centre de la deuxième rangée de la feuille 3 est ciblé : casquette, main nue levée et poncho humide. Aucun casque XOF ni partie de Skull Face des plans voisins.','Le portrait garde le cadrage de référence ; pas de jambes, de chaussures ou d’équipement hors champ inventés. Visage, boutons et plis fins sont reconstruits.','Le garde en casquette déjà sélectionné en P61 est conservé ; cette tenue à poncho est une nouvelle variante bornée.']),
 'tpp-hospital-nurse-white-uniform-portrait':dict(key='tpp',work='character:R-TPP-nurse',body='portrait',edition='TPP — infirmière visible dans le prologue hospitalier',urls=[video('zDegziz58-A')],scope='Portrait de l’infirmière observée dans le prologue, coiffe blanche, cheveux attachés et uniforme clair.',notes=['Vues rapprochées des feuilles 1 et 2 : coupe du col, boutons, badge et coiffure visibles. Le cadrage reste limité au haut du corps.','Aucun prénom attribué sans preuve d’identité ; la variante visuelle ne reçoit pas le nom d’une autre infirmière. Ni jambes ni bas ni chaussures inventés.','Traits fins du visage, contenu du badge et textures reconstruits. Les franges alpha aux contours demeurent à contrôler selon le fond d’affichage.']),
 'mgo3-enforcer-skull-face-preset':dict(key='mgo3',work='character:R-MGO3',body='full_body',edition='MGO3 — preset Enforcer au motif crâne, menu natif',urls=[video('rC7BUPjjdOc')],scope='Un preset Enforcer complet au visage marqué de blanc et noir, armure olive et rangée diagonale de poches.',notes=['La vue complète et les gros plans de la première feuille concernent le même avatar. Cheveux courts, visage, col épais, poches diagonales, genouillères et bottes sont observés.','La nature exacte du motif de visage (peinture ou accessoire), ses contours et les petits objets de ceinture ne sont pas certifiés. Le PNG les interprète comme une peinture faciale.','Configuration des sangles, mains et raccords de protection reconstruits ; aucune substitution par une tenue universelle Enforcer.'])
}

plans=[]
for file in ['generation-plan.json','generation-plan-2.json','generation-plan-3.json','generation-plan-4.json']:
    for p in read(RESEARCH+file)['jobs']:
        p=copy.deepcopy(p);p['planRecord']=RESEARCH+file;plans.append(p)
assert len(plans)==13
v2=next(p for p in plans if p['id'].endswith('-v2'))
initial=next(p for p in plans if p['id']=='mgo3-scout-nvg-mantle-portrait')
archive_path=PASS+'rejected/mgo3-scout-nvg-mantle-portrait-v1.png'
archive_meta=metadata(archive_path)

def generation(p,is_edit=False):
    refs=p.get('references',[p.get('reference')])
    refs=[x if '/' in x else RESEARCH+x for x in refs if x]
    snapshot=[]
    if is_edit:
        source='public/cqc/assets/p67/mgo3-scout-nvg-mantle-portrait.png'
        snapshot=[{'pathAtRequest':source,'immutablePath':archive_path,'sha256':archive_meta['sha256']}]
        refs=[archive_path if x==source else x for x in refs]
    promptfile=RESEARCH+'prompt-'+p['id']+'.txt';txt(promptfile,p['prompt'])
    return {'tool':'image_gen.imagegen','mode':'reference_edit' if is_edit else 'reference_generation','attempts':1,'promptId':p['id'],'exactPrompt':p['prompt'],'promptFile':promptfile,'planRecord':p['planRecord'],'referenceFiles':refs,'inputSnapshots':snapshot,'transparent_background':True,'postprocessing':'none; original data URL PNG decoded byte-for-byte'}

root_assets=[]
for p in plans:
    if p['id']==initial['id']: p=v2
    elif p['id']==v2['id']: continue
    id=p.get('selectedId',p['id']);spec=details[id];g=generation(p,p is v2)
    path='public/cqc/assets/p67/'+id+'.png'
    a={'id':id,'assetId':'asset:p67:'+id,'label':initial['label'] if p is v2 else p['label'],'episode':episodes[spec['key']],'episodeKey':spec['key'],'kind':'character','edition':spec['edition'],'bodyCoverage':spec['body'],'workIds':[spec['work']],'scope':spec['scope'],'referenceURLs':spec['urls'],'referenceFiles':[x for x in g['referenceFiles'] if x!=archive_path], 'qaNotes':spec['notes']+['PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.'],'path':path,'selectedVersion':'v2' if p is v2 else 'v1','generation':g,'nextWork':'Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.','imageVisuallyInspected':True,'referencesVisuallyInspected':True,'qaVerdict':'accept-as-bounded-candidate','nativePixelExact':False}
    a.update(metadata(path));root_assets.append(a)
archive={'id':'mgo3-scout-nvg-mantle-portrait-v1','assetId':'archive:p67:mgo3-scout-nvg-mantle-portrait-v1','label':'MGO3 — portrait Scout v1, marge supérieure insuffisante','episode':'Metal Gear Online 3','episodeKey':'mgo3','kind':'character','bodyCoverage':'portrait','path':archive_path,'reason':'Le haut du casque audio touche le cadre. Remplacé par v2 avec une marge transparente ; original brut conservé.','replacedBy':'asset:p67:mgo3-scout-nvg-mantle-portrait','generation':generation(initial),'referenceFiles':[RESEARCH+'mgo3-official-class-01.jpg'],**archive_meta}
for a in root_assets+[archive]:
    a.update(sourceGenerated=True,selected=a is not archive,atlasIntegrated=False,runtimeIntegrated=False,combatRuntimeIntegrated=False,combatReady=False,absolute1to1Certified=False,referenceGeometryValidated=False,nativeUhd=False,scopeClosed=False,fidelityStatus='pending_external_review',transparentBackground=True)
js(RESEARCH+'handoff.json',{'schema':'cqc.p67.vpp-online-handoff.v1','parentCommit':BASE,'requests':13,'successfulOutputs':13,'selectedCount':12,'archives':[archive],'blockedRequests':[],'assets':root_assets,'reviewMeaning':'Staging handoff before central Atlas integration; raw PNG bytes preserved. Portrait/full-body distinction is explicit.','openScopes':[{'workId':w,'scopeClosed':False} for w in sorted({x for a in root_assets for x in a['workIds']})]})
js(RESEARCH+'pixel-qa.json',{'schema':'cqc.p67.pixel-qa.v1','readOnlyAnalysis':True,'pixelEdits':False,'records':[{'id':a['id'],'path':a['path'],**metadata(a['path'])} for a in root_assets+[archive]]})

classic=read(PASS+'research/classic/handoff.json')
modern=read(PASS+'research/modern/handoff.json')
spinoffs=read(PASS+'research/spinoffs/handoff.json')
assets=copy.deepcopy(classic['assets']+modern['assets']+root_assets+spinoffs['assets'])
archives=[copy.deepcopy(archive)]
blocked=copy.deepcopy(modern['blockedRequests'])
for b in blocked:
    b.update(status='blocked_by_image_tool',hasOutputFile=False,selected=False,atlasIntegrated=False,retried=False,attempts=1,runtimeIntegrated=False,combatReady=False,combatRuntimeIntegrated=False,absolute1to1Certified=False)
    b.pop('outputFile',None)
    b['workIds']=['character:R-PW-PS']
    b['record']=PASS+'research/modern/pw-sentinel-vest-refusal.json'
    b['interpretation']='Refus de sortie de l’outil, aucune image livrée ; pas de nouvelle tentative ni de variante renommée.'
historical=read('docs/cqc-reprise/pass61/inventory.json');hist_ids={r['id'] for r in historical['rows']}
registries=['asset-associations.json','asset-associations-p63.json','asset-associations-p64.json','asset-associations-p65.json','asset-associations-p66.json']
old_assets=[a for f in registries for a in read('docs/cqc-bible/'+f)['assets']]
assert len(old_assets)==225
guide=read('docs/cqc-bible/guide-map.json');guide_ids={x['id'] for x in guide['sections']}
for a in assets:
    a.pop('publishedPath',None);a.update(metadata(a['path']))
    a.update(assetId='asset:p67:'+a['id'],passId='P67',**{'pass':'P67'},selected=True,sourceGenerated=True,atlasIntegrated=True,runtimeIntegrated=False,combatRuntimeIntegrated=False,combatReady=False,absolute1to1Certified=False,referenceGeometryValidated=False,fidelityStatus='pending_external_review',nativeUhd=False,nativePixelExact=False,scopeClosed=False,transparentBackground=True)
    a.setdefault('bodyCoverage','portrait' if a['id']=='delta-gru-balaclava-portrait' else 'full_body')
    if a['id']=='delta-gru-balaclava-portrait':a['bodyCoverage']='portrait'
    elif a['id'] not in details:a['bodyCoverage']='full_body'
    a.setdefault('selectedVersion','v1')
    a.setdefault('edition','Illustration officielle du manuel PS1' if a['id'].startswith('mgs1-genome') else 'MGS2 HD — séquence IGN' if a['episodeKey']=='mgs2' else 'The Twin Snakes — GameCube' if a['episodeKey']=='twin_snakes' else 'Jeu original MSX2' if a['episodeKey'] in ['mg_msx','mg2'] else 'Jeu original NES')
    a['guideSections']=['02','03','04','16','17','18','25','26','27','29'] if a['kind']=='character' else ['02','11','16','17','18','25','26','27','29']
    assert set(a['guideSections'])<=guide_ids
    a['runtimeBinding']={'status':'atlas_only','moduleKey':'atlas63','catalogPath':'public/cqc/data/cqc-p63-source-atlas.json','admittedByThisPass':False}
    a['tracking']={'scopeClosed':False,'historicalWorkIds':[w for w in a['workIds'] if w in hist_ids],'extensionWorkIds':[w for w in a['workIds'] if w not in hist_ids],'narrativePlansCreated':0}
    a['bibleURL']=WEB+'docs/cqc-bible/CONTINUATION_P67.md#'+a['id'];a['blobURL']=WEB+a['path'];a['manifest']=PASS+'delivery-manifest.json'
    a['bibleDocuments']=['docs/cqc-bible/CONTINUATION_P67.md','docs/cqc-bible/ASSOCIATIONS.md','docs/cqc-bible/FICHES_ET_VALIDATION.md','docs/cqc-bible/COMBAT.md']
    a['promptRecord']=PASS+'prompt-index.json#'+a['id']
    a.setdefault('nextWork','Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.')
    a.setdefault('reviewRecords',[PASS+'independent-visual-review.json'])
    if a['id']=='tts-kenneth-baker-seated':a['qaNotes'].append('Revue du root : candidat assis conservé ; le raccord avant-bras/genou occulté reste une réserve explicite, pas une preuve d’anatomie exacte.')
for a in archives:a.update(passId='P67',**{'pass':'P67'},selected=False,atlasIntegrated=False)
counts={'selectedSources':len(assets),'archivedAttempts':len(archives),'generatedPNGs':len(assets)+len(archives),'generationRequests':len(assets)+len(archives)+sum(b['attempts'] for b in blocked),'blockedRequests':len(blocked),'previousSelected':225,'totalSelected':225+len(assets),'previousArchivedAttempts':18,'totalArchivedAttempts':18+len(archives),'atlasSources':48+len(assets),'editionCount':len({a['episodeKey'] for a in assets}),'byEpisode':dict(Counter(a['episodeKey'] for a in assets)),'byKind':dict(Counter(a['kind'] for a in assets)),'byBodyCoverage':dict(Counter(a['bodyCoverage'] for a in assets)),'allPassesByKind':dict(Counter(a['kind'] for a in old_assets+assets)),'selectedBytes':sum(a['bytes'] for a in assets),'archivedBytes':sum(a['bytes'] for a in archives),'combatAdmissions':0,'absolute1to1Certifications':0,'newNarrativeImages':0}
assert (counts['selectedSources'],counts['editionCount'],counts['generationRequests'],counts['byBodyCoverage']['portrait'])==(29,17,31,6)
common={'asOf':DAY,'parentCommit':BASE,'previousSelected':225,'counts':counts,'historicalRows':277,'historicalUnmatchedRows':97,'historicalCountsMeaning':'Photographie historique P61 conservée. Les mises à jour P67 sont rapprochées séparément, par workId ET édition effective ; aucun groupe fermé.','extensionScopes':sorted({w for a in assets for w in a['tracking']['extensionWorkIds']}),'historicalScopeUpdates':sorted({w for a in assets for w in a['tracking']['historicalWorkIds']}),'inherits':['docs/cqc-bible/'+f for f in registries],'interpretation':'Sources statiques candidates : atlasIntegrated:true désigne leur consultation ; runtimeIntegrated:false désigne l’absence d’admission au combat. Les six portraits ne constituent pas des corps complets. Aucune fidélité absolue 1:1, géométrie native, UHD native ou clôture de périmètre certifiée.','requirementsGuide':'docs/cqc-bible/guide-map.json','assets':assets,'archives':archives,'blockedRequests':blocked}
js(PASS+'delivery-manifest.json',{'schema':'cqc.p67.delivery.v1',**common})
js('docs/cqc-bible/asset-associations-p67.json',{'schema':'cqc.bible.asset-associations-p67.v1',**common})
js(PASS+'prompt-index.json',{'schema':'cqc.p67.prompt-index.v1','generationRequests':counts['generationRequests'],'generatedOutputs':counts['generatedPNGs'],'selectedOutputs':len(assets),'archiveOutputs':len(archives),'blockedRequests':len(blocked),'records':[{'id':a['id'],'output':a['path'],'sha256':a['sha256'],'generation':a['generation']} for a in assets],'archiveRecords':[{'id':a['id'],'output':a['path'],'sha256':a['sha256'],'generation':a['generation']} for a in archives],'blockedRecords':blocked,'interpretation':'Sorties natives conservées octet pour octet. Les références du portrait Scout v2 pointent sur la v1 archivée réellement utilisée comme entrée ; aucun PNG existant n’a été retouché programmatiquement.'})
js(PASS+'p67-preintegration-png-verification.json',{'schema':'cqc.p67.raw-png-verification.v1','status':'passed','sourceCount':len(assets),'archiveCount':len(archives),'readOnlyPixelAnalysis':True,'records':[{'id':a['id'],'path':a['path'],**metadata(a['path'])} for a in assets+archives],'limits':['Intégrité et alpha vérifiés ; ceci ne certifie pas une fidélité visuelle 1:1.','Les limites inférieures des portraits peuvent toucher volontairement le cadre.']})
scopes=[]
for w in sorted({w for a in assets for w in a['workIds']}):
    linked=[a for a in assets if w in a['workIds']]
    scopes.append({'workId':w,'historicalP61Row':w in hist_ids,'previousSelectedAssets':[a['assetId'] for a in old_assets if w in a.get('workIds',[])],'newSelectedAssets':[a['assetId'] for a in linked],'editionKeys':sorted({a['episodeKey'] for a in linked}),'bodyCoverage':dict(Counter(a['bodyCoverage'] for a in linked)),'status':'partial_static_source_added','scopeClosed':False,'combatAdmission':False,'remaining':[a['nextWork'] for a in linked]})
js(PASS+'scope-delta.json',{'schema':'cqc.p67.scope-delta.v1','parentCommit':BASE,'historicalSnapshot':{'path':'docs/cqc-reprise/pass61/inventory.json','rows':277,'unmatchedRowsAtP61':97,'modified':False},'counts':counts,'inheritsOpenScopesFrom':['docs/cqc-reprise/pass66/scope-delta.json',PASS+'coverage-before.json'],'scopeUpdates':scopes,'newRefusals':blocked,'previousRefusalsNotRetried':['MGR fragmentation grenade','MGR EM grenade','MGR rocket launcher','MGR armored cyborg','REX The Twin Snakes'],'historicalCostumeHoldsPreserved':12,'scopeClosureCount':0,'interpretation':'Un même workId partagé ne transfère pas automatiquement une source à une autre édition. Un portrait et une pose T ne constituent ni corps de combat ni groupe terminé.'})

print(json.dumps(counts,ensure_ascii=False,indent=2))
