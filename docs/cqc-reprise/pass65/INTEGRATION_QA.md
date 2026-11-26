# P65 — contrat d’intégration et vérification incrémentale

**26 novembre 2026 — intégration vérifiée sur le commit P64 publié `3ab150e29deae21ee9f4451a08826b138669ec68`.** Les six sources sélectionnées P65 sont ajoutées au catalogue Atlas et au manifeste runtime. Le contrôle final conserve les 205 sources sélectionnées antérieures et les 28 objets Atlas à l’identique. Le cumul atteint **211 sources sélectionnées**, dont **34 entrées Atlas**. [Vérification complète](p65-local-verification.json).

## Résultat du lot final

Le lot comprend **un décor AC!D 2 et cinq accessoires** : deux Survive et trois Revengeance. Sept appels ont produit sept PNG : six sources retenues et une archive. La première version du coffre verrouillé reste hors Atlas et hors runtime ; sa seconde version est retenue. Aucune requête P65 n’est enregistrée comme refusée sans sortie.

| Source retenue | Dimensions natives | Format | Alpha vérifié |
| --- | ---: | --- | --- |
| AC!D 2 — Research Block, fragment de baie technique | 1672 × 941 | RGB | Opaque |
| Survive — Normal Fence | 1189 × 1323 | RGBA | 0–255 |
| Survive — Survival Bow | 1024 × 1536 | RGBA | 0–254 |
| Revengeance — coffre d’objets normal | 1254 × 1254 | RGBA | 0–255 |
| Revengeance — coffre d’objets verrouillé, v2 | 1254 × 1254 | RGBA | 0–255 |
| Revengeance — terminal de données VR | 1254 × 1254 | RGBA | 0–255 |

Les PNG sélectionnés représentent **10 018 687 octets** et l’archive **1 666 588 octets**. Le runtime final contient **3047 fichiers**, **4983 références**, **3047 nœuds atteignables** et **3 513 621 613 octets**. L’augmentation de 10 038 597 octets correspond aux six PNG et aux 19 910 octets ajoutés au catalogue. Les 740 omissions et 499 routes externes sont préservées.

La comparaison delivery ↔ Atlas ↔ bible, le scanner réel, le graphe, les empreintes, les CRC et les décompressions PNG ont tous réussi. Les [30 tests ciblés Atlas/P64/P65](p65-node-tests.txt) ont réussi : **30 réussites, aucun échec, aucun test ignoré**. Le contrôle final est horodaté `2026-11-26T08:32:13.826Z` dans sa preuve JSON.

## Socle réellement vérifié

- Le [vérificateur P64](../../../scripts/check-cqc-p64.mjs) a été exécuté avant l’ajout de P65 : **réussi**. [Résultat](p64-baseline-verification.json).
- Le contrôle historique P65 confirme **205 associations et identités de blobs Git inchangées** dans les trois registres : 177 historiques, 17 P63 et 11 P64. **28 PNG présents localement sont rehashés** ; les 177 autres ne sont pas téléchargés. [Résultat](historical-sources-verification.json).
- Le socle runtime contient **3041 fichiers, 4977 références et 3 503 583 016 octets**. Les **740 omissions** et **499 routes externes** font partie de ce socle préservé.
- Les **7 tests du contrat P65 ont réussi**. Ils couvrent la conservation des trois registres, l’ajout réel de ressources RGB/RGBA avec le scanner, l’immuabilité des 28 fiches et du graphe historique, les chemins et indicateurs refusés, les références non résolues et les filtres existants. [Sortie Node](p65-helper-tests.txt).

Les copies RGB/RGBA créées par les tests sont des fixtures temporaires provenant de PNG déjà publiés. Elles sont supprimées en fin de test et ne sont pas comptées comme des assets P65.

## Invariants du patch runtime

Seuls le catalogue `data/cqc-p63-source-atlas.json` et les nouveaux PNG sous `assets/p65/` entrent dans l’extension runtime. Le menu, le module HTML, le contrôleur JavaScript, le CSS, les entrées historiques et le ledger externe restent inchangés. Pour `N` nouvelles sources retenues, les comptes attendus sont **3041 + N fichiers**, **4977 + N références** et **28 + N entrées Atlas**.

Les 28 objets P63/P64 doivent rester identiques et dans le même ordre au début du catalogue. Les 3040 anciennes lignes du manifeste autres que le catalogue doivent rester identiques. Toutes les références antérieures sont conservées. Chaque nouvelle référence doit aller du catalogue à un PNG P65, et chaque nouveau fichier doit être atteignable depuis l’entrée.

Les sources retenues gardent `sourceGenerated:true`, `selected:true`, `atlasIntegrated:true`, `combatReady:false`, `combatRuntimeIntegrated:false` et `absolute1to1Certified:false`. Les archives sont sous `docs/cqc-reprise/pass65/rejected/`, avec `selected:false` et `atlasIntegrated:false`. Elles restent hors du catalogue et du runtime. Le tableau des requêtes refusées sans sortie est vide pour P65 ; son contrat interdit tout chemin, poids ou empreinte de PNG pour un refus.

## Documents vérifiés

Le manifeste `docs/cqc-reprise/pass65/delivery-manifest.json` utilise `schema:"cqc.p65.delivery.v1"`, `previousSelected:205` et `parentCommit:"3ab150e29deae21ee9f4451a08826b138669ec68"`. Il contient trois tableaux : `assets`, `archives`, `blockedRequests`.

Les compteurs distinguent sources retenues, archives PNG, sorties PNG et appels refusés. Les répartitions par jeu et catégorie, les octets, le cumul des sources et les identités sont recalculés par le contrôleur. Chaque PNG sélectionné possède un `assetId` nouveau, un `workIds` non vide et des réserves QA. Le registre `docs/cqc-bible/asset-associations-p65.json`, schema `cqc.bible.asset-associations-p65.v1`, conserve les mêmes compteurs, archives et refus.

Le catalogue et la bible doivent correspondre au manifeste pour l’identité, le titre, le jeu, la catégorie, le fichier, les dimensions, les empreintes, les références, les réserves, le périmètre et le lien de bible. Les associations gardent `runtimeIntegrated:false` et `runtimeBinding.status:"atlas_only"`, avec `admittedByThisPass:false`.

## Commandes exécutées sur le lot final

Après stabilisation des images et des trois documents associés, ces commandes ont terminé avec un code de sortie nul :

```bash
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p64-runtime.mjs scripts/test-cqc-p65-runtime.mjs
node scripts/check-cqc-p65.mjs
```

Le contrôleur P65 réutilise le décodeur PNG testé de P64. Il vérifie signature, chunks, CRC, décompression, filtres de lignes, dimensions, SHA-256, SHA de blob Git et extrema alpha. Les tests historiques du décodeur restent dans `test-cqc-p64-runtime.mjs` ; ils ne sont pas copiés dans le nouveau test.

Le helper retourne une proposition, sans écrire le manifeste :

```javascript
import {execFileSync} from 'node:child_process';
import {P64_COMMIT, extendP65RuntimeManifest} from './scripts/extend-cqc-p65-runtime.mjs';

const pinned = name => JSON.parse(execFileSync('git', ['show', P64_COMMIT + ':' + name], {maxBuffer: 4 * 1024 * 1024}));
const proposed = await extendP65RuntimeManifest(
  pinned('public/cqc/runtime-manifest.json'),
  'public/cqc',
  pinned('public/cqc/data/cqc-p63-source-atlas.json')
);
```

Le vérificateur complet doit être exécuté après l’écriture explicite de cette proposition. Le contrôle P64 complet décrit le socle antérieur ; une fois le catalogue étendu, le contrôle applicable au nouvel ensemble est celui de P65.

## Limites de preuve

Les contrôles du socle, les 30 tests ciblés et le contrôle complet du lot P65 sont exécutés. Les 205 sources historiques sont vérifiées par registres et identités de blobs Git ; les 28 fichiers historiques présents localement sont également rehashés. Les autres images historiques ne sont pas téléchargées. Une vérification structurelle ou de graphe ne certifie pas une fidélité visuelle 1:1, un fonctionnement de combat ou un parcours navigateur. Les réserves visuelles finales de chaque source sont reprises sans modification dans le catalogue.

La passe P64 a documenté une limite de déploiement Vercel et l’absence du moteur Chromium local. Cette intégration ne lance ni nouveau déploiement ni installation de navigateur. Les preuves P64 restent historiques ; aucune réussite navigateur P65 n’est déduite de leur existence. Aucun commit ni push n’est effectué par cette étape d’intégration.
