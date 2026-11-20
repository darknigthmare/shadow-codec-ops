# Null · Portable Ops · poses défensives

Deux nouveaux sprites individuels vers la droite : **garde basse** et **reprise d’appui arrière**. Chaque PNG contient une seule figure entière sur fond transparent. Les images générées sont conservées exactement, sans recadrage, redimensionnement, miroir ni recoloration.

[Ouvrir la comparaison](index.html) · [Manifeste](manifest.json) · [Prompts exacts](generation-prompts.json) · [Contrôles](verification.json)

## Pourquoi ces poses ?

Au commit `192c473bf5c64f9babd0d2e3c45419ffe5fac0f4`, le catalogue P16 de `core__null_mpo` possède une garde debout, un accroupissement et des groupes `deploy`, `optic`, `recover` et `parry` qui réemploient la même pose. Il ne définit pas de groupe dédié à la garde basse ni à la reprise d’appui arrière. Le [relevé du catalogue](catalogue-gap.json) conserve les actions et rectangles lus dans cette version. Les 169 fichiers de la PR #15 à cette révision ne contiennent aucun nouveau lot de défense Null.

La source immédiate est le [sprite Null déjà publié en P53](reference/null-p53-source.png), issu de l’incarnation *Portable Ops*. Le masque haut, les cheveux blonds, la combinaison sombre, le harnais olive, l’épaule rouge et les protections des jambes ont guidé les deux dessins. Les volumes et petits détails sont reconstruits à plus grande résolution : le lot ne certifie pas une identité pixel par pixel au jeu de KONAMI.

| Pose | PNG | Dimensions | Statut |
| --- | --- | --- | --- |
| Garde basse, droite | `null-low-guard-right.png` | 1 227 × 1 281 | Dessin individuel à examiner |
| Reprise d’appui arrière, droite | `null-backstep-recovery-right.png` | 1 062 × 1 481 | Dessin individuel à examiner |

## Préparer l’animation

Les deux dessins restent indépendants : ils ne forment pas une boucle. Les phases d’entrée et de sortie, les durées, la hauteur du personnage dans le moteur, les contacts et la vue gauche restent à établir. Le manifeste porte `runtimeAdmitted: false`. La reprise d’appui suggère un déplacement arrière, dont la lecture complète dépendra des poses voisines et de la translation du personnage.

Les rectangles `alphaBounds32` sont mesurés avec alpha ≥ 32. `solePivotPixels` est un repère visuel calculé sur les quatre dernières rangées de pixels visibles ; il ne définit ni collision ni racine de squelette. Les PNG utilisent des canevas différents, à calibrer avant intégration. Le lecteur les affiche séparément et conserve leurs proportions.

## Validation effectuée

Les deux PNG ont été entièrement décodés, leurs canaux RGBA et transparences contrôlés, leurs silhouettes vérifiées dans les marges, leurs SHA-256 calculés, puis les deux poses ont été inspectées visuellement. La référence du projet est conservée sans retouche. Aucun essai de combat, cycle fluide, changement du roster ou nouveau costume n’est déclaré par ce lot.
