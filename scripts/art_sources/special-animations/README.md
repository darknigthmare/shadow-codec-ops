# Acteurs spéciaux Side Ops — planches OpenAI

Le registre couvre désormais quatorze acteurs (28 planches, 448 poses, 112 clips). La [vague 3.9](../../../ASSET_WAVE_3.9.0.md) ajoute Peace Walker/Basilisk, ZEKE, Chrysalis et Cocoon, avec opérations jouables, projectiles dédiés et limites de couverture. La [vague 3.8 du 5 septembre 2026](../../../ASSET_WAVE_2026-09-05.md) documente Sahelanthropus, RAY, Metal Gear D, Shagohod, Pupa, Gekko et Olga Tanker. Les prompts sont conservés par acteur dans `<id>-prompts.json` et les calibrations exactes dans les fichiers runtime `provenance.json`.

Les sections suivantes documentent la vague initiale 3.7 (Ocelot, Otacon et REX) et restent un historique de ses contrôles, pas le décompte des vagues ultérieures.

## Vague initiale 3.7

Cette vague ajoute trois sujets avec de vraies phases OpenAI, distinctes des rigs dérivés d’une image fixe. Contrat : **6 planches runtime, 96 poses, 24 clips**, soit deux planches de 16 poses et huit actions de quatre phases par acteur. Ce n’est pas la couverture exhaustive des boss, PNJ ou véhicules de Metal Gear.

Le manifeste commun au runtime et à l’importeur est `src/data/sideopsSpecialActorAnimations.json`. Chaque source `<id>-<core|special>-openai.png` contient une grille de quatre colonnes et quatre lignes, une action par ligne. Le fond magenta et les guides cyan sont retirés mécaniquement ; les cellules vides, silhouettes au bord et phases dupliquées sont refusées.

| Sujet / identifiant | Lignes core | Lignes special | Cellule runtime / orientation source |
| --- | --- | --- | --- |
| Ocelot — `mgs1-revolver-ocelot` | idle, move, attack, reload | melee, hit, death, interact | 128 px / droite |
| Otacon — `mgs1-otacon` | idle, move, crouch, interact | radio, fear, hit, death | 128 px / droite |
| REX — `mgs1-metal-gear-rex` | idle, move, missile, laser | railgun, hit, death, scan | 256 px / gauche |

Les planches humaines mesurent 512×512, celles de REX 1024×1024. Les marges transparentes sont respectivement de 8 et 16 pixels par cellule. REX reste explicitement orienté à gauche : son runtime doit en tenir compte, sans prétendre que la source regarde à droite.

## Import et calibration

Python avec Pillow, depuis la racine du dépôt :

```powershell
python scripts/importSideOpsSpecialActorBoards.py --actor mgs1-revolver-ocelot --core scripts/art_sources/special-animations/mgs1-revolver-ocelot-core-openai.png --special scripts/art_sources/special-animations/mgs1-revolver-ocelot-special-openai.png
```

La même commande s’applique aux autres acteurs avec leur identifiant et leurs fichiers. `--dry-run` valide sans écrire. `--output-root` permet un export de préparation sur un autre disque, à recopier et vérifier avant toute intégration runtime. `--inset` vaut 3 par défaut ; `--core-inset` et `--special-inset` permettent de déclarer les marges propres aux deux sources. On ne doit jamais rogner de vrais pixels pour contourner un rejet.

Les deux sources REX retenues avaient une magnification différente. Après extraction, l’ancre debout `core[0]` mesurait 244 pixels de hauteur et `special[12]` 154. La calibration retenue est donc :

```powershell
python scripts/importSideOpsSpecialActorBoards.py --actor mgs1-metal-gear-rex --core scripts/art_sources/special-animations/mgs1-metal-gear-rex-core-openai.png --special scripts/art_sources/special-animations/mgs1-metal-gear-rex-special-openai.png --special-scale 1.5844155844155845 --core-anchor 0 --special-anchor 12
```

Cette option applique **une seule échelle à toute la planche special**, puis une seule translation fondée sur la ligne de sol des deux ancres. Elle n’agrandit pas individuellement les phases de chute, d’impact ou de balayage. Les deux planches partagent ensuite un canevas et une échelle finale d’acteur. Le ratio, les ancres, leurs bounding boxes et la ligne de sol sont inscrits dans `provenance.json`.

Chaque acteur est exporté dans `public/sideops/special-animations/<id>/` avec `core.png`, `special.png` et `provenance.json`. Ce rapport contient les empreintes SHA-256 des sources et des sorties, les rectangles d’extraction, les actions dans leur ordre, les empreintes des 32 phases et les opérations de normalisation. Il trace les fichiers réellement utilisés, pas une certification externe de fidélité canonique.

## Intégration

`PreloadScene` charge `SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS` ; les scènes partagée et Shadow Moses appellent `registerAuthoredSideOpsSpecialActorAnimations(scene)`. Le helper `configureAuthoredSideOpsSpecialActor(scene, sprite, sourceTextureKey)` ne modifie rien tant que les deux planches ne sont pas disponibles.

Appliquer **d’abord l’ancienne hitbox et l’échelle intentionnelles** de l’acteur, puis le helper : il capture la taille et le centre world du body avant le changement de texture. Sans body, les dimensions visuelles sont déduites du manifeste et de l’échelle précédente. Les corps statiques sont traités en pixels world, les corps dynamiques en pixels source ; un rafraîchissement statique après `setSize` écraserait la taille de collision et doit être évité.

Le helper renseigne `sideopsSpecialSourceFacingRight`. L’orientation par rapport à la cible doit consommer cette information : Ocelot/Otacon sont dessinés à droite, REX à gauche. Les priorités d’action, le verrouillage de mort et les temporisations restent à la charge des scènes.

`getSideOpsSpecialActorAnimation(sourceTextureKey, state)` et `getAuthoredSideOpsSpecialActorClip(sprite, state)` renvoient `undefined` pour toute action absente. Otacon n’a pas d’attaque armée ; REX n’a pas de rechargement humain. Aucun alias silencieux ne substitue une autre action.

## Fidélité et limites de consommation

Ces sprites sont des adaptations fan-made de MGS1, pas des extractions officielles ni une promesse de reproduction 1:1. Les costumes, identités et équipements sont contrôlés par rapport aux références du projet. Le flourish `interact` d’Ocelot comporte un petit lancer/rattrapage de revolver ; ce choix illustratif n’est pas présenté comme la reproduction exacte d’un geste canonique.

La disponibilité des huit actions ne signifie pas que toutes sont déjà jouées par chaque scène. Otacon joue désormais `interact` et `radio` à proximité du joueur, puis `fear` face à une menace proche ; ces trois réactions ont été observées sans forcer de clip dans Chromium. Ocelot recharge après ses rafales et conserve les priorités hit/death. REX emploie ses attaques missile/laser/railgun, mais reste stationnaire : `move` et `scan` sont disponibles sans être consommés dans cette rencontre. Le flourish `interact` d’Ocelot reste également disponible sans événement de gameplay associé.

Les PNJ MG1, les autres membres de FOXHOUND, les autres Metal Gear, véhicules et boss des douze époques conservent leurs assets ou rigs antérieurs tant qu’une vague dédiée ne les remplace pas. La présence d’un PNG ou d’un rig ne vaut pas une nouvelle planche multi-actions OpenAI.

## Contrôles

```powershell
python scripts/test_importSideOpsSpecialActorBoards.py
npm.cmd test -- src/game/core/sideOpsSpecialActorAnimationRegistry.test.ts src/game/core/sideOpsSpecialActorAnimationRuntime.test.ts
npm.cmd run lint
```

Lors de l’import de cette vague : 6 tests Python et 9 tests TypeScript réussis, ainsi que le contrôle TypeScript global. Les tests vérifient le contrat, la provenance physique, les phases distinctes, les marges et la conservation des bodies scaled/statiques. Une revue bitmap des transitions a confirmé l’alignement core/special de REX et la conservation des costumes humains. La recette locale a aussi vérifié les réactions d’Otacon, la mort d’Ocelot, les collisions réelles et REX stable au sol. Les prompts exacts sont archivés dans `prompts.json` ; génération par l’outil OpenAI intégré, sans API externe de remplacement.
