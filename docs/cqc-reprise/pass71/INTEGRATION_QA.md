# P71 — Vérification d’intégration

Vérification du **27 novembre 2026**, après la livraison P69 publiée dans la PR n°25, commit `f2b7c526a3a6a763767afcd8ae91f60bc7012d7c`.

## Résultat vérifié

- **272 sources sélectionnées**, dont cinq nouveaux PNG P71 ; **95 fiches Atlas**, dont 90 anciennes fiches strictement conservées ; **20 essais archivés**, inchangés.
- **52 tests réussis** : 22 tests historiques Atlas et 30 tests des nouvelles archives (20 logique/liaison, 10 DOM). Les huit empreintes du rapport d’accès correspondent aux fichiers finaux.
- Guide général déjà intégré et inchangé ; deux extensions ajoutées en copies exactes. **38 sections et 114 exigences supplémentaires** sont reliées à la bible, soit 68 sections et 204 exigences documentées au total.
- Runtime : **3 113 fichiers et 5 055 références**, tous accessibles dans le graphe depuis l’entrée. Les 3 100 lignes de fichiers historiques hors des trois propriétaires autorisés, les 5 039 références anciennes et les 499 routes externes sont conservées.
- Les cinq nouvelles sources sont consultables dans l’Atlas. Leurs états de combat, leurs animations et leur fidélité géométrique restent à produire ou à valider.

La [preuve structurée](verification-incremental.json) donne les tailles, dimensions, hashes et compteurs. Le [manifeste de livraison](delivery-manifest.json) décrit la portée de chaque image.

## Trois guides et traçabilité

Les fichiers originaux sont contrôlés par taille et SHA-256 : guide général **55 172 octets**, extension 01 **60 589 octets**, extension 02 **47 334 octets**. Les trois correspondances sont exactes. Les 90 anciennes exigences et les huit registres d’associations P61–P69 restent identiques au commit de base.

La [vérification de bible indépendante](../../cqc-bible/guide-integration-verification-p71.json) contrôle 114 nouvelles exigences uniques, 20 UID existants, les chemins de matrice et les liens des documents. Les spécifications de tag, taunts, supers d’équipe, bonus, slots et abonnements ne sont pas présentées comme des systèmes tous opérationnels.

## Cinq images originales

Les cinq PNG RGBA totalisent **3 768 837 octets**. La vérification indépendante du générateur contrôle signature PNG, CRC de chaque chunk, décompression complète, dimensions, filtres, transparence reconstruite, SHA-256 et SHA Git. Les copies originales restent brutes : aucune conversion, retouche, multiplication de frames ou mise à l’échelle n’est utilisée pour augmenter les compteurs.

Les cinq prompts exacts et les trois références effectivement utilisées sont archivés. Les identités Rising et Survive restent séparées. BOXMAN est un accessoire isolé ; la tête de Monsoon est un composant mécanique ; aucun de ces deux fichiers n’est un nouveau corps complet.

Les réserves de [CONTINUATION_P71.md](../../cqc-bible/CONTINUATION_P71.md) restent contraignantes : détails fins extrapolés depuis les petites références, inscriptions secondaires de BOXMAN non établies, sous-attache de Monsoon et prise centrale de L’Étranger à confirmer, franges alpha faibles conservées. **Aucune certification absolue 1:1, UHD native ou admission au combat n’est accordée.**

## Archives classifiées : tranche réellement implémentée

Trois rapports originaux de CQC se débloquent avec les sauvegardes existantes : parcours Chroniques terminé, série de trois victoires en Survie, relais 3v3 ou 5v5 remporté. Les quatre axes d’accès sont distincts. Une récompense n’est déclarée acquise qu’après écriture et relecture de sa sauvegarde ; son attribution permanente reste idempotente.

Le [rapport d’accès](ACCESS_RUNTIME_QA.md) détaille les 30 tests, les clés de progression et leurs limites. La revue indépendante a entraîné deux corrections concrètes : maintien du focus après un chargement tardif et retrait d’une consigne de restauration qui ne correspondait à aucun parcours visible dans le menu actuel. Les acquisitions se sauvegardent automatiquement dans ce navigateur.

Le registre est local. Il ne constitue pas un service d’abonnement ou une autorité anti-triche. Les anciens personnages, costumes et modes ne reçoivent aucune nouvelle restriction.

## Portée de la vérification runtime

Le contrôle est **incrémental**, adossé aux objets Git du commit P69. Il lit les treize chemins autorisés : trois fichiers existants mis à jour, cinq PNG et cinq fichiers pour les archives. Il reconstruit leurs dépendances avec le scanner du projet et compare le résultat au manifeste enregistré.

Les anciens fichiers binaires n’ont pas tous été téléchargés ou redécodés. Leur identité est préservée par les entrées Git et les lignes du manifeste de référence. La passe ne revendique donc ni reconstruction complète de l’application React ni réexécution de tous les contrôles historiques du dépôt.

Le [rapport de relecture du générateur](runtime-gate-independent-review.json) conserve huit mutations rejetées. Cette relecture utilisait une proposition en mémoire pendant la construction de l’Atlas ; la preuve `verification-incremental.json` a ensuite été produite avec le catalogue et les fichiers réels.

Commandes de contrôle :

```sh
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p67-source-atlas.mjs
node --test scripts/test-cqc-p71-access.mjs scripts/test-cqc-p71-archives-dom.mjs
node scripts/check-cqc-p71.mjs
```

La seconde commande nécessite la dépendance jsdom déjà déclarée par le projet. Les résultats des 22 tests historiques sont conservés dans [verification-existing-tests.txt](verification-existing-tests.txt).

## Limites et reprise P70

**Aucun rendu Chromium exécuté** : le binaire manque et le téléchargement officiel de Playwright a été refusé par le réseau. Les tests DOM ne remplacent pas une vérification de la mise en page, de la manette physique ni de la concurrence entre onglets dans un navigateur réel. Le scénario est conservé, avec zéro scénario et zéro capture déclarés dans la preuve de blocage.

Les onze sorties annoncées lors de P70 n’ont pas été retrouvées dans les emplacements recherchés. Le [constat de récupération](RECOVERY_STATUS.json) conserve ce résultat et ses limites. Le numéro P70 reste réservé ; les cinq nouvelles images appartiennent à P71. Les **75 lignes historiques sans candidat restent ouvertes**, car les nouveaux accessoires étendent le périmètre sans fermer ces lignes.

La publication cible la branche existante de la **PR n°25**, qui reste en brouillon. Le rapport de publication distante ajoute les identités Git effectivement reçues ; cette passe n’effectue aucune fusion.
