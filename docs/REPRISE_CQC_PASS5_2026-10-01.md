# CQC Versus Legacy 0.56 — reprise PASS5 du 1er octobre 2026

Cette passe ajoute **Fortune, Fatman, Vamp et Solidus dans leur incarnation MGS2 originale** : 24 PNG natifs et 288 poses, avec les deux directions dessinées séparément. Douze nouveaux tableaux complètent Jungle Evil et Night Fright de Metal Gear 2 MSX2. CQC reste un jeu autonome et le même jeu dans l’onglet **CQC VERSUS** de Shadow Codec Ops.

## Jouer

Extraire tout le ZIP CQC. Depuis `cqc-versus-v056`, lancer `python -m http.server 8000 --bind 127.0.0.1` puis ouvrir http://127.0.0.1:8000/index.html. Les anciens fichiers `JOUER` conservent les anciennes versions.

Pour Shadow, extraire le ZIP, lancer `npm ci` puis `npm run dev`. Ouvrir CQC VERSUS ou `/?module=cqc`. `/cqc/index.html` ouvre CQC séparément avec la même progression CQC. Les sauvegardes CQC restent isolées de celles de Shadow.

## Contenu mesuré

| Personnage | PNG natifs | Poses |
| --- | ---: | ---: |
| PARALLAXE | 6 | 72 |
| NAKED SNAKE | 6 | 72 |
| BLACK ARTS VIPER | 6 | 72 |
| THE BOSS | 6 | 72 |
| RAIDEN — MGS2 | 6 | 72 |
| SOLID SNAKE — MGS1 | 6 | 72 |
| Meryl Silverburgh — original MGS1 | 6 | 72 |
| LIQUID SNAKE | 6 | 72 |
| GRAY FOX | 6 | 72 |
| OCELOT — MGS3 FIRST SAA DUEL | 6 | 72 |
| FIRE TROOPER | 6 | 72 |
| PSYCHO MANTIS | 6 | 72 |
| BLOODY BRAD | 6 | 72 |
| SNIPER WOLF | 6 | 72 |
| FORTUNE | 6 | 72 |
| SOLIDUS SNAKE | 6 | 72 |
| FATMAN | 6 | 72 |
| VAMP | 6 | 72 |

Total : **18 ensembles, 108 PNG, 1296 poses**, soit 17 personnages canoniques et l’OC PARALLAXE. Les 14 ensembles précédents et leurs 84 PNG restent identiques. Les PNG natifs ne sont ni retournés, ni redimensionnés, ni retouchés ; cadres, pivots et contours sont appliqués au rendu.

Fortune conserve son railgun et sa tenue de l’original. Fatman conserve sa combinaison EOD olive/grise, ses rollers, son pistolet et son C4. Vamp reprend l’incarnation de son combat de piscine MGS2, distincte de MGS4. Solidus conserve son cache sur l’œil anatomique gauche, les deux lames et les deux bras arrière de son exosquelette de première phase. Les poses et commandes de duel restent des adaptations au versus.

Les tirs et lancers sont alignés sur les poses actives natives dans les deux directions, avec vérification des SHA et des échelles. Les couteaux de Vamp et les C4 posés/lancés de Fatman utilisent des PNG séparés. Leur aspect suit l’identifiant du mouvement source ; le couteau renvoyé conserve l’aspect MGS2. Le C4 posé garde l’indicateur d’armement et reste destructible, deux charges au maximum. Le super qui lance trois C4 est explicitement une adaptation du versus. Les timings, dégâts, coûts, règles de collision, paramètres de trajectoire et limites restent ceux de la version précédente ; seuls les points de départ suivent désormais les armes et mains natives.

Les **354 récits, 2 832 routes et 4 248 paragraphes** restent conservés. La couverture atteint **474 tableaux et 79 récits entièrement illustrés**. Jungle Evil/Predator et Night Fright/Night Sight gardent leurs identités MG2 et leurs textes existants. Les détails de visage ou d’équipement non établis par les sprites originaux sont masqués ou explicitement limités ; aucune identité moderne inventée n’est présentée comme canonique. Seuls les douze champs visuels concernés changent.

Les **30 stages, 123 chemins de plans et 119 contenus PNG distincts** sont conservés : parallaxe, zoom et premiers plans. Les 27 animations d’ambiance justifiées et les trois stages animés uniquement par la caméra restent inchangés.

La cible demeure **1:1 au mieux**. Les références originales sont inspectées et leurs URL/empreintes conservées. Le verdict est **closest_supported**, sans certification pixel pour pixel : contours, poses de versus et microdétails reconstruits ont leurs limites documentées. Références, prompts, rejets, revues et générations natives restent dans `preparation/reprise-pass5-provenance/` et `preparation/combat-sprites-pass5/`.

## Préservation et suite

Les cinq inventaires figés — **1 322 / 4 576 / 4 617 / 5 972 / 7 850 fichiers** — sont obligatoires pour le paquet complet. Aucun chemin antérieur n’est retiré ; chaque contenu ancien modifié a une copie SHA exacte dans `recovery/`. Les archives antérieures restent séparées. Les nouveaux ZIP sont relus intégralement en SHA et CRC, puis comparés aux fichiers source.

Il reste **337 personnages canoniques au rendu procédural**, **1650 scènes dans 275 récits**, et **45 profils historiquement manquants**. Utiliser les CSV courants `docs/SCENES_1650_A_PEINDRE_reprise.csv`, `docs/RECITS_275_A_PEINDRE_reprise.csv` et le backlog HTML. Les CSV et queues historiques restent conservés.

Les 436 pointeurs vers des PNG narratifs déjà absents restent distingués des images réellement récupérées. Les conversations privées ChatGPT et les volumes multipart `.z01/.z02` restent manquants. Aucun de ces manques historiques n’est déclaré récupéré.

**Aucun push GitHub ni déploiement Vercel effectué.** La tentative GitHub antérieure avait reçu HTTP 403 `Resource not accessible by integration`. La présente livraison contient les sources locales complètes.

## Validation PASS5

Les 14 suites CQC ont été exécutées sur les sources finales : **1 195 contrôles passent**, dont 21 nouveaux pour les origines et les armes. Les sept rapports historiques sont restaurés octet pour octet. Les douze nouvelles scènes passent **743 contrôles indépendants**. Les quatre sprites ajoutés disposent de **39 contrôles d’outils**, de 480 phases réelles, 112 états et 24 planches Canvas physiquement inspectées.

Un navigateur CQC autonome neuf passe **63 contrôles /100 commandes** sur ordinateur et viewport mobile : origines des tirs, contacts haut/bas, C4 posé et vraie parade du couteau. Shadow passe **705 tests /104 fichiers**, TypeScript, build et PWA ; un navigateur neuf passe **151 contrôles /219 commandes**, avec 72 dessins natifs, 52 origines, les nouvelles cartes, 30 stages et les sauvegardes. Aucun appareil physique ni équilibrage compétitif exhaustif n’est certifié.

Les preuves et les logs complets se trouvent dans `docs/reprise-qa/pass5/` et `preparation/combat-sprites-pass5/` du ZIP CQC complet. Le ZIP Shadow contient le runtime web de **834 fichiers /649 761 049 octets** et les résumés de QA ; les références artistiques, rejets et preuves détaillées sont dans le ZIP CQC compagnon. Les passages précédents à cette passe sont conservés et distingués des résultats finaux.
