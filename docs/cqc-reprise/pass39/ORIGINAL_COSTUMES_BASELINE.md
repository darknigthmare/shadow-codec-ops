# Costumes développés — état de reprise, Pass 39

Audit en lecture seule. Les PNG privés, les 67 fichiers non suivis, les sources rejetées, les admissions antérieures et Git sont conservés. Aucun costume décrit ici n'est admis par ce rapport. Priorité demandée : costumes officiels de la même incarnation, puis créations du projet.

## Quatre reprises réellement ouvertes

La source de travail est `docs/cqc-reprise/pass28/NEXT_LOT.md` et `NEXT_NATIVE_ART_LOT.json`, et non le vieux total de couverture Pass 20.

| UID et famille | Travail restant réel | Décision |
| --- | --- | --- |
| `core__solid` / `tuxedo` | Coup bas droit frappant à gauche ; source droite V3 et gauche V1 conservées. Pas de descriptor final compilé dans `compiled-next-four-v1`. | HOLD ; complément natif ciblé puis revue complète. |
| `core__fatman` / `tuxedo` | Figure gauche tronquée ; vrais saut, jab, lourd, détonateur et bombe. | HOLD ; garder les patins cinq roues et les nombres de frames/FPS existants. |
| `core__eva_mgs3` / `cyborg` | Quatre figures actuelles = neutre et garde dans les deux directions ; pas d'actions. | HOLD ; produire les vraies actions, garder EVA PS2 adulte et une reconstruction mécanique MGR personnalisée. |
| `core__liquid` / `nextgen` | Actions incomplètes, sept corps débordant des cellules, stature/bassin/sol. | HOLD artistique ; la famille Next Gen existe déjà et ne constitue pas une nouvelle admission. |

Ocelot MGS3 Gala a été fermé au Pass 28. Sunny MGS4 Rétro, Teliko Rétro et Screaming Mantis Gala ont été fermés au Pass 27. Leur réouverture ne fait pas partie du lot.

Les 67 fichiers privés ne représentent pas 67 nouveaux costumes : plusieurs sont des générations et métadonnées anciennes déjà remplacées par des versions admises. Toute réutilisation nécessite une revue de la source exacte. Les épaules organiques rejetées de Mantis TTS Cyborg restent rejetées ; un nom de fichier ou un schéma correct ne suffit pas.

## Originalité et identité

`oc__parallaxe` existe déjà comme combattant original optionnel de Station Méridien, issu du design Viper rejeté. Ne pas ajouter un deuxième Viper ou un nouveau doublon. Ses cinq familles de garde-robe demeurent un chantier distinct ; son module ne modifie pas les 354 Chroniques officielles.

Rétro signifie un dessin indépendant complet ; pas de diminution de résolution ou d'alias du costume de base. Les âges et jeux ne se remplacent pas : Meryl MGS1 ne devient pas Meryl MGS4 par un costume. L'étiquette visible est « Rétro », même si l'ancien identifiant sauvegardé `retro-msx` est gardé.

Le trench-coat MGS4 du Dwarf Gekko et le Double Tripod MGR sont deux incarnations déjà distinctes. Le manteau MGS4 ne doit pas être attaché comme costume canonique 1:1 du Double Tripod MGR sans qualification ; un costume original inspiré de ce manteau exige son propre art et contrat.

## Admission et preuves indispensables

1. Revue visuelle de tous les corps, des deux directions, des silhouettes, membres, armes et sens effectif du coup. Le coup droit de Solid doit frapper à droite ; aucun simple miroir, changement d'étiquette ou déplacement de hitbox ne le répare.
2. Préserver les UID, comptes, FPS et phases. Une même figure peut être partagée explicitement par plusieurs frames, mais il faut déclarer le nombre de corps natifs réel. Aucune garde ne devient un lancer et aucun jab ne devient un coup bas.
3. Mesurer dans chaque nouvelle source la stature debout de référence, le bassin et le sol ; conserver `displayHeight` Solid 220 et EVA 226. Une hauteur de boîte de pose accroupie ne doit jamais être utilisée comme stature humaine. Fournir `sourceFrameHeights` par PNG, pivots et alignement horizontal de preview (`previewDatumX`/pelvis), ainsi que les limites de stature. Transformation uniforme uniquement.
4. Les metadata `cqc.native-wardrobe-option/1`, descriptors `cqc.native-wardrobe-index/1`, audit art approuvé, dimensions/octet/SHA des PNG, provenance et preview doivent tous correspondre. La preview doit être une vraie frame. Le décodeur doit préparer les images avant publication afin d'éviter les flashes de fallback.
5. Deux faces indépendantes : `mirror !== true`. Une page commune est possible seulement avec preuve `cqc.native-direction-regions/1` sur les rectangles disjoints exacts. Les sockets de bouche/canon doivent référencer fichier, SHA, rectangle, pivot et action exacts, et être mesurés dans la caméra du corps.
6. Cyborg MGR : `artDirection: metal-gear-rising-revengeance`, `anatomy: full-body-cybernetic-reconstruction`, `cyberneticBody: true`, au moins deux `identityCodes`, et revue `MGRDesignReviewed`, `fullCyberneticBodyReviewed`, `personalizedDesignReviewed`. Les créations restent `originalDesign: true`, `canonicalAppearanceAttested: false`.
7. EVA n'a pas d'ancienne option Cyborg à remplacer : passer par l'admission normale `registerBatch` avec validation Cyborg, pas `replaceReviewedCyborg`. Solid Gala ne dispose pas de descriptor compilé final oublié : il faut le compiler après reprise et revue.
8. Vérifier ensuite contrat positif/négatif, surfaces réellement décodées, pixels, UI sélection/costumes et vrai match de la source finale. Les profils de collision demeurent cohérents avec la pose ; la source privée seule n'est pas une preuve de production.

Fichiers d'implémentation audités : `cqc-pass19-costumes.js`, `cqc-pass19-native-wardrobe-library.js`, `cqc-pass21-native-wardrobe-index.js`, `cqc-pass21-wardrobe-policy.js`, `cqc-pass19-versus-spatial.js`, `cqc-pass21-native-costume-origins.js`, sous `public/cqc/src`.

## Lot original recommandé après les canoniques

Commencer par Solid Gala : un complément indépendant de quatre phases de coup bas droit et un neutre de calibration préserve les quinze autres figures déjà travaillées. Puis EVA Cyborg, qui demande un véritable lot d'actions et non la seule admission de quatre dessins de design. Fatman Gala et Liquid Next Gen restent HOLD jusqu'à leurs propres reprises détaillées. Voir les deux briefs voisins pour les PNG exacts et les prompts préparés.
