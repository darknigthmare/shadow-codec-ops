# P53 — mise à jour ciblée du manifeste CQC

Contrôle du 19 novembre 2026, à partir du commit `192c473bf5c64f9babd0d2e3c45419ffe5fac0f4`.

## Écart trouvé

Le manifeste antérieur déclarait **2 836 fichiers, 4 709 références et 3 337 490 043 octets**. Aucun fichier P53 n’y figurait, alors que le module Versus chargeait déjà `src/cqc-p53-service-yard.js` et que l’atelier proposait un lien vers les études P53.

L’audit local a relu 303 fichiers déclarés, représentant 96 598 090 octets. Parmi eux, 301 correspondaient à leur SHA-256 enregistré. Deux pages HTML avaient évolué sans mise à jour du manifeste :

| Chemin relatif à `public/cqc/` | Taille déclarée avant | Taille avant correction du lien |
| --- | ---: | ---: |
| `modules/atelier-v056.html` | 1 282 | 1 353 |
| `modules/unified-versus-v055.html` | 3 487 241 | 3 487 632 |

Les 2 533 autres fichiers déclarés n’étaient pas matérialisés dans ce checkout partiel. Aucun contrôle de leurs octets n’est revendiqué.

## Corrections

1. Le lien de l’atelier emploie maintenant `../atelier/marches-p53/index.html`. Le chemin précédent se terminait par `/` et ne pouvait pas être découvert par l’analyseur de références statiques.
2. Le lien de retour initial de la galerie emploie maintenant `../../modules/atelier-v056.html`. Le JavaScript sélectionnait déjà ce chemin dans la version publique, mais le `href` HTML initial pointait vers un `atelier/index.html` absent.
3. Les 19 fichiers de la galerie présents dans l’arbre Git ont été matérialisés à partir de leurs copies dans `docs/cqc-reprise/pass53/animation-studies/`. Les 19 blobs ont été comparés à leur identifiant Git avant copie. Seul le lien HTML décrit ci-dessus a ensuite changé.
4. Le manifeste ajoute les fichiers P53 réellement accessibles et leurs dépendances, puis recalcule les deux entrées HTML modifiées et le total déclaré.

| Ajout au manifeste | Fichiers | Composition |
| --- | ---: | --- |
| Arènes P53 | 20 | 19 PNG et le module `cqc-p53-service-yard.js` |
| Galerie P53 | 19 | 16 poses de marche, 1 tenue, 1 HTML et 1 JSON |
| **Total ajouté** | **39** | **40 références supplémentaires** |

Le manifeste final déclare **2 875 fichiers, 4 749 références et 3 362 967 261 octets**. Les images de revue Null et les pièces de costume situées uniquement dans les dossiers de production ne sont pas ajoutées au moteur par cette opération.

## Conservation de l’existant

[`manifest-baseline.json`](manifest-baseline.json) enregistre les empreintes du manifeste initial et des ensembles conservés. Le contrôle ciblé vérifie que :

- les **2 834 entrées anciennes** hors des deux HTML modifiés restent strictement identiques, avec leurs tailles, SHA-256 et autres champs ;
- les **4 709 références anciennes** sont conservées ;
- les métadonnées, omissions et **499 routes externes** restent identiques ;
- `scripts/sync-cqc-runtime.mjs` est inchangé, y compris ses politiques et contrôles historiques ;
- aucun fichier ni aucune référence n’est dupliqué, le total des tailles concorde et les 2 875 entrées déclarées restent accessibles depuis `index.html` dans le graphe déclaré.

## Vérification exécutée

```sh
node scripts/check-cqc-p53.mjs --json
```

Résultat : **PASS**. Le contrôle a relu **41 fichiers** concernés, soit **28 965 741 octets**, vérifié leurs tailles et SHA-256, puis comparé les références réelles des **5 propriétaires texte** au manifeste. Aucune référence de ce périmètre n’est manquante ou retirée.

Le résultat détaillé, incluant les 41 chemins et leurs empreintes, est conservé dans [`manifest-targeted-check.json`](manifest-targeted-check.json).

**Ce contrôle est ciblé.** `npm run cqc:check` n’a pas été exécuté intégralement sur les 2 875 fichiers, car les images historiques absentes du checkout n’ont pas été téléchargées. La conservation de leurs entrées par empreinte ne constitue pas une nouvelle vérification de leurs octets. Le script ajouté n’assouplit ni ne remplace le vérificateur complet.

Cette vérification porte sur l’intégrité des fichiers et de leurs dépendances. Elle ne certifie ni la fidélité graphique 1:1, ni la qualité des animations, ni une validation de jeu complète.
