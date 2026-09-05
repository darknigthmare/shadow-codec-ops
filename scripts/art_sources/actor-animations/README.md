# Side Ops — planches d’animation OpenAI

Cette vague remplace les poses dérivées d’images fixes des trois rôles humains génériques par des phases dessinées dans de vraies planches OpenAI. Elle vise les douze packs du registre partagé, sans prétendre remplacer toutes les animations de tous les personnages de la franchise.

## Contrat et décompte

| Unité | Par pack | Total du registre |
| --- | ---: | ---: |
| Packs visuels | 1 | 12 |
| Rôles : `player`, `guard`, `reinforcement` | 3 | 36 combinaisons pack/rôle |
| Sources OpenAI : mobilité + combat | 2 | 24 planches sources |
| Planches runtime : 2 par rôle | 6 | 72 PNG |
| Actions : 8 par rôle | 24 | 288 clips |
| Phases dessinées : 4 par action | 96 | 1 152 poses |

Ces chiffres décrivent le contrat de `src/game/core/sideOpsActorAnimationRegistry.ts`. Au 5 septembre 2026, les 72 fichiers sont présents : les tests de contenu/provenance passent et le moteur charge les 72 planches. La suite globale compte 492 tests réussis, avec build/PWA valides ; six tests Python couvrent l’importeur. Cela ne signifie pas que chaque clip est déclenché par tous les types d’acteurs ni que tous les personnages de la franchise sont animés.

Packs : `mg1`, `mg2`, `mgs1`, `mgs2_tanker`, `mgs2_plant`, `mgs3`, `mgs4`, `peace_walker`, `mgsv_ground_zeroes`, `mgsv_phantom_pain`, `vr_simulation`, `patriots_ai`.

## Planche source et découpage

Chaque source contient exactement **8 colonnes × 6 lignes**, soit 48 cellules. Les lignes 1–2 appartiennent au joueur, 3–4 au garde et 5–6 au renfort. Dans chaque paire de lignes :

| Source | Première ligne de l’acteur, colonnes 1–4 / 5–8 | Deuxième ligne de l’acteur, colonnes 1–4 / 5–8 |
| --- | --- | --- |
| `mobility` | `idle` / `move` | `crouch` / `jump` |
| `combat` | `attack` / `melee` | `hit` / `death` |

La cible de génération est 1 536 × 1 152 pixels. Le dessin doit présenter une vue latérale cohérente, un personnage entier par cellule, un fond magenta `#FF00FF`, des guides cyan `#00FFFF` et une marge confortable autour des armes et des membres. Les dimensions et espacements réels peuvent varier : l’importeur détecte les guides au lieu de supposer des cases parfaitement uniformes. Les sources sans grille exploitable ou avec des poses coupées doivent être corrigées ou régénérées.

Après import, chaque acteur possède deux PNG RGBA de **512 × 512 pixels**, chacun organisé en 4 × 4 cellules de 128 × 128 pixels. Chaque ligne runtime est un clip de quatre phases dans l’ordre indiqué ci-dessus. Une marge transparente de huit pixels sépare le dessin du bord de chaque cellule.

## Import reproductible

Prérequis : Python avec Pillow. Depuis la racine du dépôt, par exemple pour MG1 :

```powershell
python scripts/importSideOpsActorBoards.py --pack mg1 --mobility scripts/art_sources/actor-animations/mg1-mobility-openai.png --combat scripts/art_sources/actor-animations/mg1-combat-openai.png --background magenta --inset 3
```

Le paramètre `--inset` est exprimé en pixels source. La valeur 3 convient notamment aux packs MG1, MG2, Tanker et Plant validés de cette vague ; ce n’est pas une correction universelle. Certains autres imports utilisent 0 : le retrait ciblé des franges cyan/bleues au bord des guides conserve alors les silhouettes. L’augmenter pour masquer un membre coupé serait une mauvaise validation : conserver une marge correcte dans la source et la régénérer si nécessaire. Les modes `transparent` et `white` existent également, mais cette série utilise le chroma magenta.

L’importeur valide le pack entier avant d’écrire :

- Détection stricte de neuf guides verticaux et sept horizontaux sur les sources à guides cyan.
- Extraction des cellules, suppression explicite du fond et contrôle des silhouettes aux bords.
- Alignement bas/centre sur un canevas commun aux deux planches ; aucune pose n’est agrandie indépendamment pour remplir sa case.
- Une seule échelle nearest-neighbor par acteur, calculée sur l’ensemble de ses poses mobilité/combat.
- Contrôle de quatre empreintes de phases distinctes par action et comparaison de silhouettes recadrées pour refuser les doublons exacts.
- Suppression des valeurs RGB cachées dans les pixels transparents.

Ce traitement normalise des bitmaps ; il ne fabrique ni mouvement par rotation d’un personnage fixe, ni phase intermédiaire par transformation. Des empreintes distinctes ne prouvent toutefois pas à elles seules une bonne animation : le contrôle visuel des articulations, accessoires, silhouettes et enchaînements reste nécessaire.

Les six sorties du pack et son rapport sont écrits dans :

```text
public/sideops/actor-animations/<pack>/
  player-mobility.png
  player-combat.png
  guard-mobility.png
  guard-combat.png
  reinforcement-mobility.png
  reinforcement-combat.png
  provenance.json
```

## Provenance et runtime

Les sources conservées ici sont nommées `<pack>-<board>-openai.png`. `prompts.json` conserve le contrat de composition et les identités/costumes demandés ; les régénérations peuvent préciser des contraintes de marge, d’arme ou de continuité. Les références sont des supports d’identification : les images officielles ne sont pas redistribuées comme sprites.

Chaque `provenance.json` contient le marqueur `openai-authored-poses`, les noms et SHA-256 des deux sources retenues, les dimensions et rectangles effectivement extraits, le traitement appliqué, les empreintes des PNG runtime et celles de chaque phase. Le rapport trace les fichiers retenus ; ce n’est pas un certificat de fidélité canonique ni une preuve cryptographique externe de génération.

`getSideOpsActorAnimation(pack, role, state)` impose l’époque et le rôle dans la clé de texture/animation. Le préchargement et `sideOpsActorAnimationRuntime.ts` enregistrent les clips et conservent des hitboxes de jeu indépendantes du transparent des planches. Les actions en boucle sont `idle`, `move`, `crouch` ; `jump`, `attack`, `melee`, `hit`, `death` sont des séquences ponctuelles. Le helper ne crée pas de nouvelles poses de pose d’explosif : les alias d’interaction existants peuvent utiliser `crouch`.

Le runtime Side Ops partagé utilise ces rôles. Les scènes dédiées MG1 et MGS1 ne remplacent que leurs acteurs équivalents ; leurs boss, personnages de rencontre et machines conservent leurs traitements spécialisés. La présence d’un clip de saut pour un garde ne signifie pas que son IA acquiert automatiquement la capacité de sauter.

## Références et fidélité

L’objectif est de respecter l’identité, la silhouette, le costume, l’équipement et l’époque, en produisant une **adaptation fan-made originale** pour une lecture latérale. La fidélité 1:1 n’est pas garantie : ni les originaux 3D, ni les illustrations officielles, ni les anciens jeux vus du dessus ne fournissent exactement cette animation 2D.

Références officielles Konami utilisées pour cadrer les époques :

- [Metal Gear — archive du 25e anniversaire](https://www.konami.com/mg/archive/mg25th/truth/mg.html) et [Metal Gear 2 — personnages](https://www.konami.com/mg/archive/mg2/chara.html).
- [Metal Gear Solid — archive The Legacy Collection](https://www.konami.com/mg/archive/mgs_tlc/).
- [MGS2 — Tanker](https://www.konami.com/mg/archive/mgs2/english/story/story_tanker.html) et [MGS2 — Plant](https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html).
- [MGS3 — archive](https://www.konami.com/mg/archive/mg25th/truth/mgs3.html) et [MGS4 — archive](https://www.konami.com/mg/archive/mg25th/truth/mgs4.html).
- [Peace Walker — personnages](https://www.konami.com/mg/archive/mgs_pw/en/character/index.html).
- [Ground Zeroes — présentation](https://www.konami.com/mg/mgs5/gz/jp/introduction/index.php) et [The Phantom Pain — histoire](https://www.konami.com/mg/mgs5/tpp/jp/story/).

Les packs `vr_simulation` et `patriots_ai` sont des déclinaisons de simulation du projet. Ils ne doivent pas être présentés comme de nouveaux costumes ou personnages canoniques attestés.

Limite visuelle repérée sur la source MGS1 combat actuellement retenue : la quatrième phase `melee` du garde (ligne 3, colonne 8 de la source) éclaircit son casque en blanc/camouflé, contrairement au casque sombre des phases voisines. Cette variation de continuité reste à corriger ; elle n’est pas dissimulée par l’importeur. Une régénération et sa retouche ont corrigé la couleur du casque, mais leur candidat a été refusé au contrôle des silhouettes en bord de cellule. `mgs1-combat-helmet-candidate-openai.png` est conservé localement pour comparaison, non publié et pas consommé par le runtime ; les contraintes et prompts sont consignés dans `mgs1-combat-correction-prompts.md`. La source précédente reste en place tant qu’une correction n’a pas passé les contrôles visuels et techniques.

## Périmètre restant et vérification

Cette vague couvre trois archétypes par pack, pas le roster intégral. Les portraits Codec, PNJ uniques, boss, Metal Gear, véhicules, projectiles et VFX ne sont pas compris dans les 1 152 poses. Certains existent déjà avec des assets ou rigs legacy ; leur existence ne vaut pas couverture multi-actions au même standard. Les variantes d’armes, rechargements animés dédiés, escalade, transport de corps, interactions particulières et toutes les transitions ne sont pas promises par les huit actions de ce contrat.

Contrôles ciblés disponibles :

```powershell
npm run test -- src/game/core/sideOpsActorAnimationRegistry.test.ts
python scripts/test_importSideOpsActorBoards.py
```

Le test de registre contrôle le contrat, les fichiers, les dimensions, les cellules transparentes, les marges, les phases distinctes et la correspondance des empreintes avec la provenance. Il doit être complété par une lecture visuelle en jeu à la taille runtime, notamment aux transitions mobilité/combat et avec les collisions actives. Les statuts de tests globaux, build, exécutable et publication doivent être rapportés séparément avec leurs résultats effectifs.
