# P64 — préparation et preuves d’intégration

Socle épinglé : `9725a40cb60a436126eb067d61c6c7ab4c66badc` (P63). Les preuves suivantes ont été exécutées le 26 novembre 2026 avant l’ajout du catalogue P64. Elles ne modifient pas les rapports historiques qui documentaient les limites de l’exécuteur lors de P63.

## Lot final P64 vérifié localement

Le catalogue final ajoute **11 sources P64** aux **17 objets P63 conservés à l’identique** : **28 sources dans l’Atlas**, **205 sources sélectionnées cumulées**. Les cinq réserves de QA MGR de la revue indépendante sont recopiées dans les `qaNotes` visibles de l’Atlas.

Les **14 tests Atlas et 9 tests P64 ont réussi** ensemble : **23/23**, sans échec. Le [rapport final local](p64-local-verification.json) et la [sortie Node finale](p64-node-tests.txt) correspondent au catalogue final avec ces réserves.

- **13 PNG contrôlés** : 11 sélectionnés et 2 essais rejetés uniques. Les 3 requêtes refusées n’ont aucun fichier ; elles restent dans `blockedRequests`, hors archives, Atlas et runtime. Le total est de **16 requêtes**, dont **13 sorties PNG**.
- **3041 fichiers et 4977 références runtime**. Les 3030 anciennes lignes sont préservées, avec seulement le poids/hash du catalogue mis à jour ; **3029 lignes sont strictement identiques**. Les **4966 références préexistantes**, **740 omissions** et **499 routes externes** sont inchangées.
- **3 503 583 016 octets déclarés** dans le runtime final. Chaque nouveau PNG est référencé par le catalogue et atteignable depuis l’entrée.
- **194 entrées historiques inchangées**, avec leurs identités Git ; les PNG historiques présents localement ont été rehashés. Le menu, le HTML, le JavaScript et le CSS de l’Atlas restent identiques octet pour octet au socle P63.
- **Aucune admission au combat ni certification 1:1**. La QA navigateur du nouveau déploiement P64 reste à exécuter après publication ; la preuve navigateur ci-dessous concerne P63.

## P63 réellement revérifié

| Contrôle | Résultat | Preuve |
| --- | --- | --- |
| Node v24.22.3, module Atlas | 14 tests réussis, 0 échec | [Sortie Node](p63-node-tests.txt) |
| PNG P63 | 17 sélectionnés et 3 archives : signatures, CRC, SHA-256, Git blob SHA, dimensions, décompression et filtres de lignes | [Vérification locale](p63-local-verification.json) |
| Reconstruction du manifeste P63 | Le vrai helper Node, important le scanner du projet, produit exactement le manifeste commité | [Préservation](p63-baseline-preservation.json) |
| Historique avant P63 | 3008 anciennes lignes identiques ; seul `index.html` modifié ; 4943 références, 740 omissions et 499 routes externes conservées | [Préservation](p63-baseline-preservation.json) |
| Navigateur, déploiement P63 READY | 17 images distinctes décodées ; filtres, recherche sans accents, état vide, reset, sélection, lien direct, Extras, Chroniques et ancien front Revengeance | [Preuve navigateur](p63-browser-verification.json) |

Le navigateur a contrôlé la vue bureau (largeur de contenu 1348 pixels CSS) sans débordement horizontal. La vue mobile n’a pas été exécutée : aucun réglage de viewport n’était exposé par les contrôles disponibles. Les erreurs d’extension navigateur observées ne justifient pas une affirmation de console entièrement vide. Le parcours complet de combat n’a pas été exécuté.

Captures du déploiement P63 : [Atlas](p63-atlas-desktop.jpg), [Cargo Train sélectionné](p63-atlas-cargo-train.jpg). La consultation autorisée du déploiement protégé n’a pas modifié sa protection. Aucun lien secret n’est conservé dans ces preuves.

## Extension P64

Les **194 sources historiques** correspondent aux 177 entrées de `asset-associations.json` et aux 17 entrées de `asset-associations-p63.json`. L’Atlas contient les 17 sources P63 ; les nouveaux objets P64 sont ajoutés après eux, sans modifier les 17 objets existants. La route `atlas63`, son contrôleur, son HTML et son CSS acceptent déjà un nombre variable de sources et les catégories de personnages, machines et costumes.

`check-cqc-p64.mjs --baseline-only` compare les deux registres à leurs versions du commit épinglé, les 194 SHA de blobs à l’index Git et les octets des PNG historiques effectivement présents dans le checkout léger. Il ne télécharge pas les PNG historiques absents. Résultat initial : **194 entrées et identités Git inchangées ; 17 PNG locaux rehashés**. Voir [historical-sources-verification.json](historical-sources-verification.json).

`extend-cqc-p64-runtime.mjs` retourne une proposition sans l’écrire. Il importe le helper P63 et le vrai scanner `discoverReferences`. Il accepte uniquement la modification du catalogue et de nouveaux PNG sous `assets/p64/`. Les 3030 anciennes lignes sont conservées, avec la seule mise à jour du hash et du poids du catalogue ; les 4966 références historiques, les 740 omissions et les 499 routes externes restent identiques. Chaque nouveau PNG doit être référencé par le catalogue et atteignable depuis `index.html`.

Le contrôleur final attend :

- `delivery-manifest.json`, schéma `cqc.p64.delivery.v1`, `parentCommit` égal au socle P63, `previousSelected: 194`, tableaux `assets` et `archives`, comptes exacts.
- `asset-associations-p64.json`, schéma `cqc.bible.asset-associations-p64.v1`, contenant uniquement les nouvelles sources retenues et leurs liens de bible.
- Le catalogue existant avec ses 17 objets P63 inchangés, puis les objets P64. Le champ `path` est `../assets/p64/ID.png`.
- Les identités, dimensions, poids, SHA-256 et SHA Git cohérents dans les trois documents. Les PNG statiques RGB8 et RGBA8 sont vérifiés ; les extrema alpha déclarés sont comparés aux pixels reconstruits.
- Les flags `combatReady`, `combatRuntimeIntegrated` et `absolute1to1Certified` à `false`. Les associations de bible gardent `runtimeIntegrated:false`, `runtimeBinding.status:"atlas_only"` et `admittedByThisPass:false`.
- Les générations écartées uniques sous `docs/cqc-reprise/pass64/rejected/`, hors catalogue et manifeste runtime. Une copie documentaire d’une génération encore retenue ne constitue pas une nouvelle archive.

## Commandes

À exécuter depuis la racine du dépôt après la finalisation des documents P64 :

```sh
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p64-runtime.mjs
node scripts/check-cqc-p64.mjs > docs/cqc-reprise/pass64/local-verification.json
```

La proposition de manifeste s’obtient explicitement, après mise à jour du catalogue :

```js
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {P63_COMMIT, extendP64RuntimeManifest} from './scripts/extend-cqc-p64-runtime.mjs';
const pinned = name => JSON.parse(execFileSync('git', ['show', P63_COMMIT + ':' + name], {maxBuffer: 4 * 1024 * 1024}));
const next = await extendP64RuntimeManifest(
  pinned('public/cqc/runtime-manifest.json'),
  'public/cqc',
  pinned('public/cqc/data/cqc-p63-source-atlas.json')
);
writeFileSync('public/cqc/runtime-manifest.json', JSON.stringify(next, null, 2) + '\n');
```

Les **9 tests spécifiques au helper P64 ont réussi** avec le vrai PNG RGBA Flemming déjà produit et un vrai décor RGB P63, sans image factice. Ils vérifient notamment les refus de mutation des anciens objets et du ledger, de chemin étranger, de référence non résolue, de faux flag de combat, de PNG corrompu ou tronqué. Voir [runtime-helper-tests.txt](runtime-helper-tests.txt) pour leur première exécution ; la sortie combinée finale figure dans [p64-node-tests.txt](p64-node-tests.txt).

Le contrôleur P63 reste un vérificateur de son instantané de 17 sources. Après extension du catalogue, le contrôleur P64 assure la conservation de cet instantané et vérifie l’ensemble actif. Aucune de ces preuves ne certifie une fidélité absolue 1:1 ou une admission au combat.

## Publication et limites navigateur constatées

Le lot de 69 fichiers est publié dans la PR #25 par le commit `dd73bbb99c6df3c43bd3b4fc607a4ba32c7090c9`. Son arbre Git est exactement identique au lot vérifié localement : `8211c1178c3973d481b378113e74fbeb68de894f`.

La recherche de déploiement pour ce SHA retourne zéro résultat. Le statut Vercel est `failure` et indique « Deployment rate limited — retry in 24 hours. » le 26 novembre 2026 à 08:09:40, heure de Paris. Il ne s’agit pas d’un build P64 encore en cours. [Preuve de déploiement](p64-browser-verification.json).

La tentative de navigateur local ne démarre pas : Playwright est installé, mais ses moteurs Chromium et Headless Shell sont absents ; le lanceur système ne possède pas non plus son exécutable. Aucun parcours ni capture P64 n’est déclaré validé. [Preuve locale](p64-local-browser-verification.json).

Les chemins P64 ont été rétablis dans le checkout léger après son alignement sur le commit publié : les 28 PNG du catalogue sont présents. Cette correction de matérialisation ne modifie aucun blob publié. Le [contrôle après publication](p64-post-publication-verification.json) vérifie de nouveau le lot depuis ces fichiers restaurés. La QA P63, les 23 tests Node et la validation des fichiers P64 sont des preuves séparées de la QA navigateur P64 restant à réaliser.
