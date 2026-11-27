from pathlib import Path
from PIL import Image
import hashlib, json, struct, datetime

ROOT = Path(__file__).resolve().parents[5]
HERE = Path(__file__).resolve().parent
plans = json.loads((HERE / 'generation-plan.json').read_text())['plans']
raw_names = ['exec-bdbe7c28-325e-4343-88b4-c96bafeab2ea.png', 'exec-ace90fb0-5bd5-4023-b517-bf5ac2d94218.png', 'exec-937f4bae-224e-4fcc-82cf-ae3a7bb3e1f4.png']
urls = {
 'acid2-native-flamethrower-soldier.jpg': 'https://www.imfdb.org/images/f/fd/MgAc%21d2enemyflamethrower.jpg',
 'acid2-native-shield-guard.jpg': 'https://www.imfdb.org/images/7/75/MetalGearAc%21d2USPShield.jpg',
 'acid2-native-high-tech-p90.jpg': 'https://www.imfdb.org/images/0/03/MetalGearAc%21d2P90Guard.jpg',
 'acid2-native-oicw-guard.jpg': 'https://www.imfdb.org/images/4/46/OICWMetalGearAc%21d2.jpg',
 **{f'mga2-soldier-concept{i}.jpg': f'https://www.creativeuncut.com/gallery-11/art/mga2-soldier-concept{i}.jpg' for i in (1,2,3)}
}
notes = [
 ['La capture native de référence mesure seulement 360×461 pixels et comporte deux vues du même type ennemi ; seule la vue frontale oblique est produite.',
  'Silhouette entière, tenue rouge/noire, masque pâle, deux bonbonnes, tuyau et lance repris. Les petits raccords, le harnais, le masque et la forme fine de la buse sont reconstruits ; aucune dimension métrique ni vue cachée n’est validée.',
  'Pose et cadrage obliques conservés dans un rendu polygonal propre ; ce n’est pas un sprite latéral prêt au combat.',
  'Un seul soldat, pieds et équipement complets ; aucune flamme, attaque ou séquence animée.'],
 ['Le garde porteur du bouclier dans la capture native est le sujet principal. CONCEPT2 précise l’uniforme ; la variante CONCEPT2 sans équipement existait déjà en P50 et n’est pas remplacée.',
  'Pose accroupie/oblique, béret rouge, gilet brun-orangé, uniforme anthracite, pistolet et bouclier distincts du garde historique sans bouclier.',
  'Le flash de la capture masquait une partie du bouclier. Cette surface, le visage, certaines poches et l’arme sont reconstruits ; largeur/épaisseur du bouclier, poignée arrière et exactitude mécanique non certifiées.',
  'Une seule pose fixe sans tir, flash, HUD ni autre personnage. Le pied inférieur possède une marge très faible ; prévoir un cadrage moteur distinct avant admission.'],
 ['Source principale : planche officielle Hi-Tech CONCEPT3 hébergée par Creative Uncut ; pose frontale avec les mains baissées.',
  'La capture du soldat P90 corrobore casque clair, visière rouge, col vert, armure et poches ; elle coupe le bas des jambes. Les jambes du PNG viennent du concept complet, pas d’une capture PSP intégrale.',
  'Silhouette, couleurs et grandes pièces du concept conservées. Motif exact du camouflage, coutures, visage sous la visière et épaisseurs reconstruits ; équivalence complète avec le modèle commercial non certifiée.',
  'Aucune arme tenue n’a été ajoutée. Ce PNG ne livre ni la pose P90, ni une animation, ni une nouvelle admission au combat.']
]
scopes = [
 'Un soldat lance-flammes AC!D 2, corps complet en vue frontale oblique, avec équipement porté. Une seule variante et une seule pose.',
 'Un garde SaintLogic AC!D 2 équipé du bouclier et du pistolet, corps complet en posture oblique issue du jeu.',
 'Soldat Hi-Tech AC!D 2, corps complet de CONCEPT3 en pose frontale, identité visuelle supérieure corroborée par une capture native.'
]
nexts = [
 ['Obtenir des captures plus grandes face/dos/profil pour vérifier masque, bonbonnes, raccords et proportions.', 'Produire les poses latérales et états d’action/attente/marche seulement à partir de nouvelles preuves.', 'Définir pivots, cadrage, collisions et interactions avant toute admission au combat.'],
 ['Obtenir une vue du bouclier sans flash et de son dos/sa poignée.', 'Vérifier les états garde, déplacement, abaissement et impact séparément ; aucune animation livrée.', 'Distinguer le personnage, son bouclier détachable et les effets éventuels dans un futur contrat moteur.'],
 ['Rapprocher le concept de vues complètes du modèle PSP et confirmer les variantes de camouflage/équipement.', 'Documenter séparément la pose équipée P90 et les états de déplacement.', 'Définir cadrage, pivots et interaction moteur sans transformer le concept en certification 1:1.']
]

def identity(path):
 b = path.read_bytes()
 with Image.open(path) as im:
  im.load()
  out = {'path':str(path.relative_to(ROOT)), 'bytes':len(b), 'sha256':hashlib.sha256(b).hexdigest(), 'gitBlobSha':hashlib.sha1(b'blob '+str(len(b)).encode()+bytes([0])+b).hexdigest(), 'width':im.width,'height':im.height,'colorMode':im.mode}
  if b[:8] == bytes([137,80,78,71,13,10,26,10]):
   out.update(bitDepth=b[24], colorType=b[25])
  if 'A' in im.getbands():
   alpha=im.getchannel('A');hist=alpha.histogram()
   out.update(alphaExtrema=list(alpha.getextrema()), alphaBounds=list(alpha.getbbox()), visibleAlphaBounds=list(alpha.point(lambda v:255 if v>8 else 0).getbbox()), transparentPixels=hist[0], opaquePixels=hist[255], nearOpaquePixels240to255=sum(hist[240:]), weakFringePixels1to8=sum(hist[1:9]), modalPositiveAlpha=max(range(1,256), key=lambda x:hist[x]))
 return out

sources=[]
for path in sorted((HERE/'references').glob('*.jpg')):
 entry=identity(path)
 entry.update(url=urls[path.name], viewedBeforeGeneration=True, sourceType='native_game_screenshot_third_party_host' if 'native-' in path.name else 'official_concept_art_third_party_host', usedForGeneration=any(str(path.relative_to(ROOT)) in p['refs'] for p in plans))
 if path.name=='mga2-soldier-concept1.jpg':entry['disposition']='Non régénéré : garde masqué historique P49 déjà présent.'
 if path.name=='acid2-native-oicw-guard.jpg':entry['disposition']='Non généré : garde allongé et partiellement masqué par interface ; le modèle entier n’est pas établi.'
 sources.append(entry)
assets=[]
for i, plan in enumerate(plans):
 out=identity(ROOT/'public/cqc/assets/p69'/f"{plan['id']}.png")
 raw=ROOT.parent/'generated_images'/raw_names[i]
 assert raw.read_bytes()==(ROOT/out['path']).read_bytes()
 generation={
  'tool':'image_gen.imagegen','mode':'reference_generation','attempts':1,'promptId':plan['id'],
  'exactPrompt':plan['prompt'],'promptFile':plan['promptFile'],
  'referenceFiles':plan['refs'],'referenced_image_paths':[str(ROOT/p) for p in plan['refs']],
  'transparent_background':True,'num_last_images_to_include':None,
  'outputSourcePath':str(raw), 'postprocessing':'none; exact original PNG copied byte-for-byte'
 }
 out.update(id=plan['id'], label=plan['label'],episode='Metal Gear AC!D 2',episodeKey='acid2',kind='character', bodyCoverage='full_body',
  edition='PSP — vues du jeu publiées par un tiers' if i<2 else 'PSP — concept officiel CONCEPT3 ; partie supérieure corroborée en jeu',
  passId='p69', workIds=['character:R-ACID-GUARDS'], scope=scopes[i], scopeClosed=False,
  referenceURLs=plan['urls'],referenceFiles=plan['refs'],referenceMetadata=[s for s in sources if s['path'] in plan['refs']],
  qaNotes=notes[i]+['PNG RGBA brut ; alpha réel 0–255, corps majoritairement alpha 253, faible frange alpha 1–8 documentée. Aucune retouche de pixels ou mise à l’échelle.'],
  transparentBackground=True,sourceGenerated=str(raw),selected=True,selectedVersion='v1',
  runtimeIntegrated=False,combatReady=False,combatRuntimeIntegrated=False,absolute1to1Certified=False,
  referenceGeometryValidated=False,nativePixelExact=False,nativeUhd=False, fidelityStatus='pending_external_review',
  generation=generation,nextWork=nexts[i],visualReviewedBy='/root/p69_acid')
 assets.append(out)
handoff={
 'schema':'cqc.p69.acid-handoff.v1','parentCommit':'764ba74e7650b3f744899636cfabc2683c960bfe',
 'reviewedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
 'requests':3,'generationCalls':3,'generationRequests':3,'successfulOutputs':3,'selectedCount':3,'archives':[],'blockedRequests':[],
 'assets':assets,'references':sources,'selectedBytes':sum(a['bytes'] for a in assets),
 'historicalAudit':'docs/cqc-reprise/pass69/research/acid/historical-duplicate-audit.json',
 'scopeNote':'Trois variantes AC!D 2 seulement. AC!D 1, FAR/Ruins, Test Subjects et étages Prototype non produits dans cette sous-série. Aucun groupe clôturé.',
 'validation':{'rawBytesPreserved':True,'decodedAllPNGs':True,'transparentBackgroundActual':True,'nativeUhd':False,'animationsDelivered':0,'combatAdmissions':0}
}
(HERE/'handoff.json').write_text(json.dumps(handoff,ensure_ascii=False,indent=2)+'\n')
(HERE/'reference-index.json').write_text(json.dumps({'schema':'cqc.p69.acid-references.v1','references':sources},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'selected':len(assets),'bytes':sum(a['bytes'] for a in assets),'references':len(sources),'assets':[{k:a[k] for k in ['id','width','height','bytes','sha256','gitBlobSha']} for a in assets]},ensure_ascii=False))

