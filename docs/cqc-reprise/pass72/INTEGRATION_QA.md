# P72 — contrôle d’intégration et de fidélité documentaire

**Résultat : contrôle final réussi sur le manifeste runtime enregistré.** La base de comparaison est le commit P71 `b9051108080855cfcad8a322d34dbfb66e8c131e`. Le [rapport machine](integration-qa.json) conserve les empreintes, les compteurs, les PNG décodés et les limites du contrôle.

## Livraison contrôlée

| Élément | Résultat P72 |
|---|---:|
| Appels de génération réellement effectués | 15 |
| PNG originaux produits | 13 |
| Sources retenues dans l’Atlas | 11 |
| PNG archivés hors Atlas et hors runtime | 2 |
| Refus sans fichier | 2 |
| Prompts et arguments exacts vérifiés | 15 |
| Références locales vérifiées | 15 |
| Sources sélectionnées cumulées | 283 |
| Fiches Atlas cumulées | 106 |
| Archives cumulées | 22 |
| Nouvelles admissions au combat, animations ou certifications absolues 1:1 | 0 |

Les onze sources retenues représentent 12 570 807 octets ; les deux archives, 1 382 284 octets. Chaque PNG a été contrôlé par signature, CRC, décompression, dimensions, mode couleur, alpha lorsqu’il est présent, SHA-256 et SHA Git. Les copies sont identiques aux sorties originales ; aucun agrandissement, détourage ou nettoyage programmatique n’est intégré.

Les références comprennent les captures éditeur, les captures natives hébergées par des tiers, les icônes du guide et la première sortie KGB utilisée pour son édition ciblée. Cette dernière est stockée une seule fois dans les archives. Le PDF complet du guide Piggyback n’est pas republié : son URL, ses empreintes, sa taille et les commandes d’extraction des deux icônes sont conservées dans leur provenance.

## Préservation de l’existant

| Contrat | Résultat |
|---|---|
| Neuf registres d’associations antérieurs | Identiques octet pour octet à P71 |
| 95 anciens dossiers Atlas | Contenu et ordre inchangés, y compris après normalisation |
| Inventaire P61 de 277 lignes | Identique ; 97 statuts `unresolved` conservés |
| Guide général et deux extensions | Trois fichiers identiques ; tailles et SHA-256 contrôlés |
| Matrices des guides | 90 + 114 exigences conservées, soit 204 exigences dans 68 rubriques |
| Code et tests antérieurs | Aucun ancien gate, module de combat ou module d’Archives modifié |
| P70 | Réservé au lot non récupéré ; aucune sortie absente ajoutée aux comptes |

Les deux groupes `character:R-MPO-GUEST` et `stage:mgr_vr_dlc` reçoivent leurs premiers candidats partiels. Le nombre de lignes historiques sans candidat passe de 75 à 73. Les 24 lignes historiquement non résolues qui possèdent désormais un candidat restent ouvertes. Les six extensions P72 sont comptées séparément ; voir [MANQUANTS.md](MANQUANTS.md) et le [delta de couverture](coverage-delta.json).

## Runtime et tests

La nouvelle extension est limitée au catalogue de l’Atlas et aux onze PNG sélectionnés. Elle utilise le scanner existant et vérifie sa proposition contre la base P71 épinglée. Les deux archives ne sont pas admises dans le graphe du runtime.

| Mesure | Avant P72 | Après P72 |
|---|---:|---:|
| Ressources runtime | 3 113 | 3 124 |
| Liens internes | 5 055 | 5 066 |
| Références omises conservées | 740 | 740 |
| Routes externes conservées | 499 | 499 |
| Octets déclarés dans le runtime | 3 590 795 700 | 3 603 406 096 |

Les 3 112 lignes historiques hors catalogue sont inchangées ; les 5 055 anciens liens sont conservés. Les 3 124 ressources du graphe sont atteignables. Les 532 fichiers runtime historiques présents localement ont également été hachés. Les anciens binaires absents du checkout partiel n’ont pas été téléchargés ; leur préservation est contrôlée par leurs lignes de manifeste et par la comparaison des objets Git lors de la publication.

**22 tests Atlas réussis, aucun échec** : les suites existantes P63 et P67 vérifient la normalisation, les filtres, les liens, les qualifications de source et la séparation des éditions. Leur [journal TAP](atlas-tests.tap) est conservé. Le gate P72 contrôle en plus chaque nouvelle fiche dans le catalogue réel, ses références, sa fiche de bible et son absence d’admission au combat.

Les [neuf cas négatifs du contrat runtime](runtime-negative-cases.json) ont tous été rejetés comme attendu : fichier manquant, modification historique, suppression de lien, propriétaire non autorisé, changement d’omission ou de route externe, ressource imprévue, total d’octets erroné et mauvaise base épinglée. Ils ont été exécutés sur des copies en mémoire, sans modifier le runtime enregistré.

Commandes de vérification et de reconstruction :

```bash
node scripts/check-cqc-p72.mjs
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p67-source-atlas.mjs
python3 scripts/build-cqc-p72.py --apply
```

La dernière commande reconstruit les documents et le catalogue depuis les preuves conservées ; elle n’écrit pas le runtime. La reconstruction hors ligne a été vérifiée identique sur les onze fichiers générés contrôlés. Les 80 liens Markdown locaux des documents P72 générés ont été vérifiés.

## Revue visuelle et corrections

La [revue finale de sélection](reviewed-batch.json) identifie les onze PNG retenus par leurs empreintes. La [revue indépendante AC!D et Survive](review-acid-survive.json) compare six candidats à leurs références ; la [revue d’intégration](review-integration.json) documente les corrections de provenance et de rattachement.

- **KGB v1 archivé, v2 retenu :** retrait ciblé d’un lien pendant ajouté au bas du pantalon côté droit de l’image. La première sortie reste une preuve de correction.
- **Gun-camera AC!D archivée :** la référence coupe le support au bord gauche ; le rendu complète une plaque murale non établie. Aucune fiche Atlas ni liaison de combat conservée pour cet essai.
- **Trois originaux Rising :** les métadonnées désignent les véritables fichiers de génération, comparés octet pour octet, et distinguent les copies de recherche.
- **Tengu et Sai :** deux refus du service de génération au stade de sortie, sans PNG. Les requêtes et identifiants d’erreur sont conservés ; aucune relance sous un alias.

## Limites de la validation

La présence d’un candidat ne certifie pas sa fidélité absolue. Les détails mécaniques AC!D proviennent de petites captures ; le centre de la barricade est partiellement masqué ; les établis restent qualifiés comme sources de la bêta de janvier 2018 ; les soldats MPO+ reposent sur des prévisualisations communautaires de modèles attribués au jeu. Les deux décors VR restent des fragments à vue fixe, et Pincer Blades une icône d’inventaire. Les vues opposées, géométries, franges alpha, états, timings, collisions et interactions demandent les preuves décrites dans les [fiches P72](../../cqc-bible/CONTINUATION_P72.md).

Les drapeaux `runtimeIntegrated`, `combatReady`, `combatRuntimeIntegrated`, `absolute1to1Certified`, `referenceGeometryValidated`, `nativePixelExact`, `nativeUhd` et `scopeClosed` restent tous à `false` pour les nouveaux assets. `atlasIntegrated` indique seulement leur consultation documentaire.

**Aucun rendu navigateur, parcours de combat ou nouveau test du module Archives n’est exécuté par P72.** Les tests P71 de ce module restent des preuves historiques séparées. L’intégrité des sources et la réussite des tests Atlas ne constituent pas une validation visuelle du navigateur ou une certification du jeu complet.
