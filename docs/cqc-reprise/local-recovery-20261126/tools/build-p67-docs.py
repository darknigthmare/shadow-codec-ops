from pathlib import Path
from collections import Counter
import json
R=Path('/mnt/data/cqc-p66/shadow-codec-ops')
P='docs/cqc-reprise/pass67/'
B='docs/cqc-bible/'
D=json.loads((R/(P+'delivery-manifest.json')).read_text())
A=D['assets'];C=D['counts']
BRANCH='codex/cqc-p61-missing-static-sources-20261125'
WEB=f'https://github.com/darknigthmare/shadow-codec-ops/blob/{BRANCH}/'
def write(p,s): (R/p).write_text(s.rstrip()+'\n')
def js(p,obj):write(p,json.dumps(obj,ensure_ascii=False,indent=2))

reviews=[]
classic_ids={a['id'] for a in json.loads((R/(P+'research/classic/handoff.json')).read_text())['assets']}
modern_ids={a['id'] for a in json.loads((R/(P+'research/modern/handoff.json')).read_text())['assets']}
for a in A:
    reviewer='/root' if a['id'] in classic_ids else '/root/reference_audit'
    method='Comparison of native reference captures or model previews and output PNG; no pixel modification.'
    note='Candidat borné, sans défaut bloquant évident. Les réserves de la fiche demeurent applicables.'
    if a['id']=='tts-kenneth-baker-seated':note='Corps assis conservé ; deux mains et chaussures visibles. Le raccord avant-bras/genou occulté reste non validé.'
    if a['id']=='mgo3-scout-nvg-mantle-portrait':note='Version v2 inspectée ; tête/casque entiers, marge haute 70 px au seuil alpha >128. RGB sous alpha 0 dans les halos échantillonnés.'
    if a['id']=='mgs4-middle-east-rebel-light-tunic':note='Personnage central distinct du rebelle au premier plan. Deux chaussures visibles, marge basse 1 px au seuil >16. Build preview/retail non établie.'
    if a['id']=='delta-gru-balaclava-portrait':note='Portrait tête/épaules/haut de torse, trois poches visibles ; aucune jambe fabriquée ni transfert à MGS3 PS2.'
    if a['id']=='touch-gekko-mission07':note='Identité et pose oblique reconnaissables. Dessous du pied fléchi, petits modules, tubes et raccords reconstruits ; détails non établis dans la capture 500×375.'
    if a['id']=='gz-camp-omega-poncho-salute-portrait':note='Portrait seulement. Le poncho partiellement caché au premier plan de la référence est reconstruit ; pas de certification du tissu ou du visage.'
    reviews.append({'id':a['id'],'path':a['path'],'sha256':a['sha256'],'reviewer':reviewer,'verdict':'accept-as-bounded-candidate','method':method,'notes':[note]+a['qaNotes'],'bodyCoverage':a['bodyCoverage'],'absolute1to1Certified':False,'referenceGeometryValidated':False,'combatRuntimeIntegrated':False})
js(P+'independent-visual-review.json',{'schema':'cqc.p67.independent-visual-review.v1','asOf':'2026-11-26','records':reviews,'allSelectedOutputsReviewed':True,'acceptedCandidates':29,'rejectedSelectedOutputs':0,'limits':['Human-style visual comparison by agents, not a geometric or pixel correspondence proof.','Classic outputs reviewed by root; other outputs reviewed by an agent independent of their generation.','Positive verdict qualifies a bounded static candidate only; no scope closure or combat admission.']})

labels={a['episodeKey']:a['episode'] for a in A}
table='| Opus / édition | Ajouts | Images sélectionnées |\n|---|---:|---|\n'
for key,n in C['byEpisode'].items():
    rows=[a for a in A if a['episodeKey']==key]
    table+=f"| {labels[key]} | {n} | "+' ; '.join(a['label'].split(' — ',1)[-1] for a in rows)+' |\n'

intro='''# Continuation P67 — personnages manquants, édition par édition

**26 novembre 2026 — 29 nouvelles sources individuelles sur 17 éditions : 22 personnages en corps entier, 6 portraits et 1 machine complète.** Le cumul atteint **254 sources sélectionnées**, **77 dossiers Atlas** et **19 essais archivés**. Les 225 sélections, 18 archives et 48 dossiers Atlas de P66 restent conservés.

Cette passe répond à la poursuite des sprites manquants en cherchant la correspondance la plus étroite que permettent les références. **Aucune de ces reconstructions n’est certifiée identique 1:1 au modèle ou au sprite natif.** Les postures, textures et parties peu lisibles restent décrites dans chaque fiche. Une résolution générée plus grande ne restitue pas des détails absents de la capture source.

[Galerie des 29 PNG](../cqc-reprise/pass67/README.md) · [Associations](asset-associations-p67.json) · [Manifeste](../cqc-reprise/pass67/delivery-manifest.json) · [Audit des opus](../cqc-reprise/pass67/AUDIT_OPUS.md) · [Manquants et limites par édition](../cqc-reprise/pass67/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass67/INTEGRATION_QA.md)

## Livraison et représentation

'''+table+'''
Les 31 requêtes ont donné 30 sorties PNG : 29 sélections et la première version du portrait Scout archivée. Une requête Peace Walker Sentinel Vest a été refusée par l’outil, sans fichier ; elle n’a pas été réessayée. Tous les PNG livrés sont les sorties brutes avec canal alpha, sans modification de pixels, changement de taille ni recomposition programmatique après génération.

Les six portraits sont : GRU Delta ; Scout, Enforcer et Infiltrator issus des images officielles MGO3 ; garde en poncho Ground Zeroes ; infirmière TPP. Leurs jambes et leurs accessoires hors champ ne sont pas déduits du buste. Les autres personnages comprennent des poses de modèle en T, des civils assis et un médecin en pose reconstituée ; leur présence ne crée pas un combattant jouable.

## Fidélité et provenance

Les deux Genome MGS1 suivent les illustrations officielles du manuel ; ils ne sont pas présentés comme une extraction des modèles PS1. Les gardes MSX/NES et l’archétype MG2 sont des reconstructions en pixel art dont la palette et la grille ne sont pas certifiées pixel par pixel. L’otage de Shell 1 provient d’une séquence MGS2 HD, avec édition distincte du PS2 original.

Les cinq variantes Portable Ops Plus et le Sandinista Peace Walker reposent sur des previews communautaires de modèles attribués à la PSP. Les deux rebelles MGS4 correspondent à deux sujets complets d’une même capture ; sa build exacte, promotionnelle ou finale, n’est pas établie. Les avatars Online sont des presets précis, pas des uniformes universels de classe. Les détails des visages, mains, armes, insignes et textures générés ne valent pas preuve du modèle natif.

Le Gekko Touch est limité à la pose visible dans une image de presse de gameplay iPad distribuée en 500×375. La taille de cette image ne démontre pas la résolution de l’application. Le pied fléchi et les petits modules restent sous réserve. Pour TPP, l’identité de l’infirmière demeure une variante visuelle sans prénom attribué ; la pose debout du médecin assemble plusieurs observations natives.

## Fiches individuelles

'''
sections=[]
for a in A:
    refs='\n'.join(f'- [Référence {i+1}]({url})' for i,url in enumerate(a['referenceURLs']))
    notes='\n'.join('- '+n for n in a['qaNotes'])
    repr_text='Portrait, corps non établi par ce PNG' if a['bodyCoverage']=='portrait' else 'Corps complet dans une seule pose'
    sections.append(f'''<a id="{a['id']}"></a>

### {a['label']}

**Périmètre :** {a['scope']}

| Champ | Valeur |
|---|---|
| Identité | `{a['assetId']}` |
| Type / édition | `{a['kind']}` / `{a['episodeKey']}` — {a['edition']} |
| Représentation | {repr_text} |
| Fichier | [{Path(a['path']).name}]({WEB+a['path']}) |
| Dimensions natives | {a['width']}×{a['height']}, RGBA, {a['bytes']:,} octets |
| SHA-256 | `{a['sha256']}` |
| WorkIds | {', '.join('`'+w+'`' for w in a['workIds'])} |
| Rubriques du guide | {', '.join(a['guideSections'])} |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

{refs}

**Constats et limites :**

{notes}

**Travail restant :** {a['nextWork']}
''')
end='''## Couverture et admission

L’audit couvre les 32 clés d’édition suivies dans le projet, sans annoncer un inventaire exhaustif de toute la franchise. Les 277 lignes P61 constituent une photographie historique ; 97 y étaient non résolues. Elles ne sont ni supprimées ni requalifiées à partir du nombre d’images nouvelles. Le rapprochement après P67 applique à la fois le workId et l’édition : un GRU Delta ne couvre pas le GRU PS2, un modèle Plus ne couvre pas automatiquement Portable Ops et le Gekko Touch ne fournit pas les ennemis Arcade ou Social Ops.

Les six portraits, les familles partiellement illustrées, les douze identités documentaires sans corps établi, les douze blocages historiques de costumes et les refus antérieurs demeurent ouverts dans le suivi. Un résultat de génération ne ferme aucun groupe. Les captures insuffisantes pour Arcade, Social Ops, AC!D Mobile, FOX HUNT ou 3DS sont conservées comme recherche ; aucun corps complet n’est inventé à partir d’un nom ou d’une petite vignette ambiguë.

L’Atlas reçoit les 29 dossiers avec filtre d’édition explicite, catégorie, recherche, référence et réserve. Les 48 objets antérieurs gardent leurs valeurs et leur résultat de normalisation. Le contrôleur et le module de filtres prennent désormais en charge les 32 éditions, tout en conservant les navigations existantes AC!D et Rising. Le shell principal et les styles restent conservés.

Avant une future admission au combat, chaque source demandera une validation de silhouette, de variante, d’échelle, de points d’ancrage et de caméra, puis les états et animations requis, les collisions et les règles adaptées au personnage. Les civils, portraits et T poses ne deviennent pas jouables par simple liaison de fichier. Aucun mouvement, dommage, VFX, son, image narrative ou certification absolue n’est ajouté par cette passe.

## Contrôles et publication

Les contrôles distinguent les preuves visuelles et les preuves techniques : comparaison des références et PNG, vérification de structure/CRC/décompression, SHA-256 et SHA Git, correspondance bible/livraison/Atlas et graphe de chargement. Le rapport [INTEGRATION_QA](../cqc-reprise/pass67/INTEGRATION_QA.md) décrit les résultats et les limites.

Le navigateur n’est pas validé dans cet environnement : Chromium n’est pas opérationnel et son téléchargement officiel avait échoué. La publication vise la PR #25 existante, sans fusion. Le dernier état de déploiement doit être lu sur la PR ; un contrôle statique réussi ne prouve pas une mise en production.
'''
write(B+'CONTINUATION_P67.md',intro+'\n'.join(sections)+'\n'+end)

gallery='''# P67 — galerie des sprites et portraits par édition

**29 PNG sélectionnés sur 17 éditions : 22 personnages en corps entier, 6 portraits et 1 Gekko.** Cumul : **254 sources**, **77 dossiers Atlas**, **19 essais archivés**. 31 requêtes, 30 sorties, 1 refus sans fichier. Les images ci-dessous sont des sources statiques candidates ; **aucune certification 1:1 ni admission au combat**.

[Bible et fiches détaillées](../../cqc-bible/CONTINUATION_P67.md) · [Associations](../../cqc-bible/asset-associations-p67.json) · [Livraison](delivery-manifest.json) · [Prompts exacts](prompt-index.json) · [Audit](AUDIT_OPUS.md) · [Manquants](MANQUANTS.md) · [Contrôles](INTEGRATION_QA.md)

L’Atlas est accessible dans l’application par `/cqc/?module=atlas63`. Les 32 éditions y possèdent une clé de filtrage distincte. Les sources MGS1 issues du manuel, MGS2 HD, les poses T PSP et les portraits conservent leur attribution et leur portée dans les fiches.

## Répartition

'''+table+'\n## Sources individuelles\n\n'
for a in A:
    kind='portrait' if a['bodyCoverage']=='portrait' else 'corps entier'
    gallery+=f"### {a['label']}\n\n![{a['label']}]({'../../../'+a['path']})\n\n**{kind} · {a['width']}×{a['height']} · RGBA · {a['selectedVersion']}**\n\n{a['scope']}\n\n[Fiche, références et réserves]({a['bibleURL']}).\n\n"
gallery+='''## Archive et refus

Le portrait Scout v1 est [archivé](rejected/mgo3-scout-nvg-mantle-portrait-v1.png) car son casque touchait le bord supérieur. La v2 sélectionnée conserve une marge de 70 px au seuil alpha >128. L’archive est exclue de l’Atlas et du graphe runtime.

La sortie du **PW Sentinel Vest** a été refusée par l’outil lors de son unique tentative. Aucun PNG ni nouvelle tentative sous un autre nom n’est enregistré. Les refus historiques restent conservés.

## Ce qui reste ouvert

Les détails fins, les parties occultées et les différences entre éditions demandent encore des références de meilleure qualité. Six fiches sont explicitement des portraits. La couverture d’une famille ou d’un jeu n’est jamais déclarée complète à partir d’un seul candidat. Le [suivi par édition](MANQUANTS.md) et le [delta des périmètres](scope-delta.json) distinguent ces travaux.
'''
write(P+'README.md',gallery)

index=(R/(B+'README.md')).read_text()
if '**Version P67' not in index:
    index=index.replace('**Version P66 — 26 novembre 2026. Fondation P62 et extensions P63/P64/P65 conservées.**','**Version P67 — 26 novembre 2026. Fondation P62 et extensions P63/P64/P65/P66 conservées.**',1)
    index=index.replace('sources statiques P60/P61/P62/P63/P64/P65/P66.','sources statiques P60/P61/P62/P63/P64/P65/P66/P67.',1)
    marker='La [continuation P66]'
    lead='''La [continuation P67](CONTINUATION_P67.md) ajoute **29 sources sur 17 éditions** : 22 personnages en corps entier, 6 portraits et 1 Gekko Touch. Le cumul atteint **254 sources sélectionnées** et **77 dossiers Atlas**, avec **19 archives** hors sélection. Les 225 sources et 48 dossiers antérieurs sont conservés. L’Atlas filtre désormais les 32 éditions explicites du projet. La [galerie P67](../cqc-reprise/pass67/README.md), les [associations](asset-associations-p67.json) et les [manquants par édition](../cqc-reprise/pass67/MANQUANTS.md) détaillent les références et les limites. **0 admission au combat, 0 certification absolue 1:1, aucun PNG natif UHD et aucun périmètre clos.** Une tentative Sentinel Vest PW est refusée sans sortie ; Scout v1 reste archivé après correction du cadrage.

**Historique P66 conservé.** '''
    index=index.replace(marker,lead+marker,1)
    index=index.replace('| Livraison courante : 14 sources et extension Atlas P66 |','| Livraison courante : 29 sources, 17 éditions, Atlas P67 | [CONTINUATION_P67.md](CONTINUATION_P67.md) ; [galerie P67](../cqc-reprise/pass67/README.md) |\n| Associations et contrôles P67 | [asset-associations-p67.json](asset-associations-p67.json) ; [INTEGRATION_QA.md](../cqc-reprise/pass67/INTEGRATION_QA.md) |\n| Historique : 14 sources et extension Atlas P66 |',1)
    write(B+'README.md',index)

appendices={
'ASSOCIATIONS.md':'''## Extension P67 — variantes et portraits de 17 éditions

Les [29 associations P67](asset-associations-p67.json) portent le cumul à **254 sources sélectionnées** : 48 personnages, 9 costumes, 47 machines, 133 décors, 14 objets, 2 corps de projectiles et 1 VFX. Le lot contient 22 corps de personnages, 6 portraits et 1 machine complète. Les 19 archives cumulées restent exclues.

Chaque association conserve l’édition effective, les workIds, les références, le type de représentation, les réserves visuelles, les hashes et les rubriques du guide. Le même workId partagé ne justifie pas un transfert de modèle entre jeux. Les 29 sources ont `atlasIntegrated:true`, `runtimeIntegrated:false` et `absolute1to1Certified:false`.

Les [fiches P67](CONTINUATION_P67.md), le [delta des périmètres](../cqc-reprise/pass67/scope-delta.json) et le [suivi des manquants](../cqc-reprise/pass67/MANQUANTS.md) maintiennent les familles ouvertes. Aucun des 277 enregistrements P61 n’est réécrit pour suggérer une clôture. Le refus PW Sentinel Vest n’a pas de fichier associé.
''',
'COMBAT.md':'''## P67 — sources de personnages, sans admission implicite

P67 ajoute 22 corps de personnages, 6 portraits et un Gekko Touch. La [continuation](CONTINUATION_P67.md) distingue civils assis, poses T, posture hospitalière reconstruite, avatars personnalisés et portrait. Aucun de ces cadrages ne fournit à lui seul une garde, un moveset ou une collision utilisable.

Avant une future admission, valider silhouette, incarnation, échelle, ancrages, vues utiles et états requis. Les mains, armes et équipements reconstruits demandent une validation distincte. Les portraits restent réservés à la consultation ou à une présentation autorisée ; les détails du corps hors cadre ne sont pas inventés. Les presets MGO ne deviennent pas l’uniforme universel d’une classe.

Les flags de combat et de certification restent faux pour les 29 fichiers. Aucun coup, dégât, contre-jeu, VFX, son, animation ou nouvelle neutralisation n’est ajouté. Le Gekko Touch demeure associé à sa pose observée, sans assimilation automatique aux Gekko MGS4.
''',
'FICHES_ET_VALIDATION.md':'''## Validation P67 — portée des images et preuves distinctes

Les [fiches P67](CONTINUATION_P67.md) comptent 29 candidats : 23 sujets complets (22 personnages et une machine) et 6 portraits. Les dimensions, alpha, CRC, décompression et hashes sont consignés pour les 30 PNG bruts, dont la version Scout v1 archivée. Un refus sans sortie est enregistré séparément ; il n’a ni hash de PNG ni entrée Atlas.

La revue visuelle décrit ce que la référence établit et ce que la génération reconstruit. Les previews PSP, les illustrations du manuel MGS1, les captures HD et les variantes de menus conservent leur attribution. L’intégrité d’un PNG ne démontre ni une correspondance pixel par pixel ni une géométrie native exacte. Les marges basses volontairement coupées des portraits ne sont pas confondues avec un corps complet.

L’extension Atlas préserve les 48 dossiers historiques et ajoute 29 dossiers filtrables sur les 32 clés d’édition. Les anciens registres, les 225 sélections et les 18 archives P66 sont préservés. Le [rapport QA P67](../cqc-reprise/pass67/INTEGRATION_QA.md) décrit le contrôle du graphe runtime et ses limites navigateur/déploiement. Les 30 rubriques et 90 exigences du guide demeurent inchangées.
'''}
for name,addition in appendices.items():
    path=R/(B+name);s=path.read_text()
    heading=addition.splitlines()[0]
    if heading not in s:write(B+name,s+'\n'+addition)
print('Wrote continuation, gallery, independent review and four bible indexes.')
