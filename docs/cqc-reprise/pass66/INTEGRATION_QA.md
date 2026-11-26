# Intégration et QA — P66

**Lot final vérifié : 14 PNG sélectionnés, 3 essais archivés, 17 sorties pour 17 appels de génération.** Les 14 sources rejoignent l’Atlas existant. Le cumul est de **225 sources sélectionnées**, **48 fiches Atlas** et **18 essais archivés** hors runtime. Il n’y a aucun nouvel accès au combat et aucune certification absolue de fidélité 1:1.

Le contrôle complet a terminé avec succès dans [p66-local-verification.json](p66-local-verification.json). Il vérifie les 17 PNG du lot, les quatre registres historiques, le catalogue, les associations de bible et le manifeste runtime. Les [14 tests du contrôleur Atlas](p66-node-tests.txt) ont également réussi, sans échec ni test ignoré. La [preuve structurée Node](p66-node-tests.json) conserve la commande et le bilan.

## Sources réellement contrôlées

| Source sélectionnée | Dimensions natives | Format / alpha |
|---|---:|---|
| AC!D — FAR B3F, baie des conteneurs | 1672 × 941 | Opaque (RGB) |
| AC!D — FAR B4F, passerelles grillagées | 1672 × 941 | Opaque (RGB) |
| AC!D — FAR B5F, chambre de La Clown | 1672 × 941 | Opaque (RGB) |
| AC!D 2 — Control Section, hall à escalier | 1672 × 941 | Opaque (RGB) |
| AC!D 2 — Communications Tower, passerelle technique | 1672 × 941 | Opaque (RGB) |
| AC!D 2 — Terminal, quai de chargement | 1672 × 941 | Opaque (RGB) |
| AC!D 2 — Residential Area, vestibule intérieur | 1672 × 941 | Opaque (RGB) |
| Survive — Forsaken Ruins, terrasse et passage | 1672 × 941 | Opaque (RGB) |
| Survive — Machine Gun Turret | 1314 × 1197 | RGBA, [0, 255] |
| Survive — Oil Trap | 1774 × 887 | RGBA, [0, 255] |
| Survive — Flame Trap, inactif | 1448 × 1086 | RGBA, [0, 255] |
| Revengeance — Cardboard Box, déguisement normal | 1536 × 1024 | RGBA, [0, 254] |
| Revengeance — Drum Can, fût de camouflage | 972 × 1618 | RGBA, [0, 255] |
| Revengeance — Cardboard Box, variante Mariachi | 1536 × 1024 | RGBA, [0, 254] |

Les 14 sources sélectionnées représentent **29 110 996 octets**. Les trois archives représentent **7 031 850 octets** : boîte MGR v1, fût MGR v1 et Flame Trap v1. Les archives sont vérifiées comme fichiers distincts mais exclues du catalogue, des sources sélectionnées et du runtime. La correction Flame Trap v2 remplace la matrice initiale à huit panneaux par une matrice à douze panneaux ; sa revue visuelle et ses limites sont consignées dans les références Survive et dans la bible.

Le décodeur réutilisé depuis P64 contrôle la signature PNG, les chunks, leurs CRC, les dimensions, la décompression complète, les filtres de lignes et les extrema alpha réellement reconstruits. Les SHA-256 et SHA de blobs Git correspondent aux octets livrés. Les 17 sorties ont des empreintes distinctes et aucune source P66 ne réutilise le contenu d’une des 211 sources historiques.

La présence d’un canal alpha et l’absence d’erreur de décodage ne constituent pas une validation visuelle 1:1. Les sources gardent leurs dimensions natives ; aucun agrandissement n’est compté comme un PNG UHD.

## Conservation du socle P65

Le socle est le commit **`101b15617f8766353800ffc1be592ec1aef6b66c`**. Les snapshots du catalogue et du manifeste sont contrôlés contre les SHA de blobs Git exacts de ce commit. Le vérificateur peut lire ces snapshots hors du checkout ; il refuse toute autre identité de contenu.

- Les quatre registres historiques restent identiques octet par octet : **177 + 17 + 11 + 6 = 211 sources**.
- Les 211 identités des PNG historiques correspondent à la véritable arborescence Git P65, lue avec `git ls-tree`, sans index artificiel.
- **34 PNG historiques présents localement sont rehashés**. Les 177 autres PNG ne sont pas téléchargés ni décodés pour ce contrôle.
- Les 34 objets Atlas antérieurs sont conservés avec leurs propriétés et dans le même ordre.
- Le HTML d’entrée, le module Atlas, son contrôleur et sa feuille de style correspondent exactement aux octets du socle.

Le [contrôle initial de socle](p65-baseline-verification.json) précède la restauration des 34 images et ne comptait qu’un PNG présent localement. Le contrôle final est la preuve applicable au lot : il en rehashe 34. Ces deux preuves ont des instants et des périmètres locaux distincts.

## Extension du runtime

| Indicateur | P65 | P66 final | Variation |
|---|---:|---:|---:|
| Fichiers runtime | 3 047 | 3 061 | +14 PNG |
| Références internes | 4 983 | 4 997 | +14 |
| Nœuds atteignables | 3 047 | 3 061 | +14 |
| Octets runtime | 3 513 621 613 | 3 542 770 873 | +29 149 260 |
| Fiches Atlas | 34 | 48 | +14 |

Les **3 046 anciennes lignes** autres que le catalogue sont identiques. Les **4 983 anciennes références**, **740 omissions** et **499 routes externes** sont conservées. L’augmentation de taille se décompose en **29 110 996 octets de PNG** et **38 264 octets ajoutés au catalogue**.

Le helper [extend-cqc-p66-runtime.mjs](../../../scripts/extend-cqc-p66-runtime.mjs) réutilise le véritable scanner du projet. Le catalogue et les nouveaux PNG sont les seuls fichiers runtime relus ou ajoutés par cette extension. Le manifeste final doit correspondre exactement à la proposition reconstruite ; chacun des 14 nouveaux PNG est atteignable depuis l’entrée via le catalogue.

Le [contrôle préparatoire du scanner](p66-scanner-smoke.json) utilisait une copie temporaire d’un PNG réel, supprimée après exécution. Il a confirmé le rattachement du nouveau fichier et le refus d’une modification d’une fiche historique ou d’une référence vers un PNG non produit. Cette fixture n’est pas une source de production et n’entre dans aucun compteur livré.

## Bijections et statuts

Le [vérificateur P66](../../../scripts/check-cqc-p66.mjs) compare livraison, Atlas et bible pour l’identité, le titre, le jeu, la catégorie, le chemin, les dimensions, les octets, les empreintes, les références, les réserves et les liens vers la bible. Il exige le lot final complet de 14 sources sélectionnées et de trois archives, et recalcule ses comptes et répartitions.

Les nouvelles sources ont `sourceGenerated:true`, `selected:true` et `atlasIntegrated:true`. Les champs `runtimeIntegrated`, `combatRuntimeIntegrated`, `combatReady` et `absolute1to1Certified` restent faux. Le binding de la bible est `atlas_only`, avec `admittedByThisPass:false`. Les archives ont `selected:false` et `atlasIntegrated:false`. Aucun refus sans fichier n’est enregistré pendant P66.

Les liens vers la bible et les fichiers sources sont contrôlés statiquement. Cela ne crée pas une animation, une interaction, une collision, une arène jouable ou un nouveau personnage.

## Commandes exécutées

```bash
node --test scripts/test-cqc-p63-source-atlas.mjs
node scripts/check-cqc-p66.mjs \
  --baseline-dir /mnt/data/cqc-p66/p65-integration-baseline \
  --git-repository /workspace/scratch/7d4d5e1f4fd4/shadow-codec-git
```

Le premier script n’a pas été modifié. Le second a été exécuté sur les fichiers finaux P66 ; il lit les objets d’arbre du clone réel et les snapshots épinglés, sans téléchargement implicite de blobs. Dans un checkout complet contenant les objets P65, `node scripts/check-cqc-p66.mjs` peut lire directement le commit de référence.

## Navigateur : blocage réel

**Aucun parcours navigateur P66 n’est validé.** Le lanceur `/usr/bin/chromium` est présent, mais le binaire `/usr/lib/chromium/chromium` manque. Le lancement réel s’arrête avant l’ouverture d’une page. Une installation isolée du Chrome Headless Shell officiel de Playwright a ensuite reçu un HTTP 403 « Site Unavailable ». Le CLI a fait ses réessais automatiques ; aucune autre route de téléchargement n’a été tentée.

La [preuve du blocage](p66-browser-verification.json) conserve ces résultats. Le script [qa-cqc-p66-browser.mjs](../../../scripts/qa-cqc-p66-browser.mjs) est préparé et sa syntaxe a été vérifiée ; son parcours final n’a pas été exécuté. Il n’existe donc aucune capture navigateur P66 ni validation locale de mise en page ou de navigation tactile.

## Limites de cette vérification

La vérification établit l’intégrité des nouveaux fichiers et la cohérence de leur intégration statique dans l’Atlas. Elle ne certifie ni la fidélité absolue des silhouettes et scènes, ni les proportions reconstruites, ni le fonctionnement du combat ou de la totalité de l’application.

Les fichiers historiques absents du checkout sont vérifiés par leurs registres inchangés et leurs identités dans l’arbre P65. La conservation de l’arbre distant après publication doit également être contrôlée sur le commit publié ; aucun commit ou push n’est effectué par cette étape d’intégration. Les contrôles de déploiement Vercel, du host Shadow Ops intégré et du jeu entier restent distincts.
