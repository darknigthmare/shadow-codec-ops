# P66 — manquants et suites vérifiables

La passe ajoute 14 sources candidates. Elle ne ferme aucun périmètre. Le fichier P61 de 277 lignes, dont 97 alors sans correspondance démontrée, reste une photographie historique, pas un compteur courant de pourcentage d’achèvement. Les nouveaux sous-périmètres descriptifs sont suivis séparément dans [scope-delta.json](scope-delta.json).

## Priorités après cette livraison

| Ensemble | Avancée P66 | Suite nécessaire |
|---|---|---|
| FAR, AC!D | B3F, B4F et B5F possèdent chacun un fragment | Captures plus nettes, géométrie et connexions ; B4F à revoir en priorité. Aucun étage déclaré complet. |
| AC!D 2 | Quatre intérieurs/secteurs distincts ajoutés | Plans de niveau, cadrages latéraux, volumes et raccords ; détails de Residential Area encore approximatifs. |
| Forsaken Ruins | Terrasse et passage ajoutés | Reste de la carte, entrées, distances, profondeurs et calques séparés. |
| Défenses Survive | Tourelle autonome, Oil Trap et Flame Trap inactifs | Parties masquées, autres angles, états actifs/détruits, VFX séparés, interactions et règles de neutralisation. |
| Wormhole Transporter | Référence d’ensemble conservée | Vue rapprochée non masquée indispensable avant source isolée. |
| Air Shock Cannon | Deux vues supplémentaires inspectées | Face avant encore masquée par le HUD ; pas de reconstruction déclarée exacte. |
| Mortar de Survive | Identités séparées | Projectile de l’ennemi Mortar sans géométrie démontrée ; mortier déployable distinct avec appui arrière masqué. |
| Captain de Survive | Deux démonstrations de costumes antérieures conservées | Couverture du corps, variantes et personnalisation complète restent ouvertes. |
| Déguisements MGR | Boîte normale, variante Mariachi et fût ajoutés | Autres faces de boîte, détails du sombrero, modèle final du fût, états et comportements. |
| Combat / narration | Liens de bible enrichis | Aucun nouveau moveset, état, plan narratif illustré ou combattant admis par P66. |

## Travaux par source

- **AC!D — FAR B3F, baie des conteneurs** : Obtenir des captures natives plus grandes, relever la circulation et les raccords de B3F, puis définir une adaptation latérale, les limites de combat et les calques de profondeur.
- **AC!D — FAR B4F, passerelles grillagées** : Priorité à une revue géométrique avec des captures plus grandes. Valider les machines, les escaliers, les hauteurs et les raccords avant tout découpage ou admission.
- **AC!D — FAR B5F, chambre de La Clown** : Confronter au parcours natif et aux vues de dessus ; séparer fond, plans de circulation et volumes interactifs. Les phases et comportements de La Clown relèvent d’un chantier combat distinct.
- **AC!D 2 — Control Section, hall à escalier** : Relever les accès, les dimensions et les limites du hall ; définir la caméra CQC et la navigation sans confondre l’escalier du décor avec une transition jouable.
- **AC!D 2 — Communications Tower, passerelle technique** : Valider la disposition de la passerelle et ses accès dans la mission ; produire les vues latérales et les plans séparés utiles au stage CQC.
- **AC!D 2 — Terminal, quai de chargement** : Vérifier les accès, l’emplacement exact des plateformes et les dimensions du quai. Séparer la présentation des rails de toute règle de danger ou de transition.
- **AC!D 2 — Residential Area, vestibule intérieur** : Contrôler les matériaux et les proportions sur une capture plus nette, relever les couloirs adjacents et déterminer le cadrage de combat avant de compléter ce secteur.
- **Survive — Forsaken Ruins, terrasse et passage** : Cartographier le reste des ruines, les entrées et les profondeurs ; produire les calques et relever les distances avant collisions et admission de stage.
- **Survive — Machine Gun Turret** : Valider les parties masquées, le pivot et les appuis ; prévoir états de visée, tir, dégâts et destruction, règles de ciblage, limites et contre-jeu. Aucun de ces comportements n’est créé ici.
- **Survive — Oil Trap** : Documenter et produire les états de pose, activation et destruction ; définir la surface affectée, l’effet de glissade, les délais et les règles de neutralisation.
- **Survive — Flame Trap, inactif** : Valider la matrice de panneaux et les buses ; préparer les états actif/inactif, le VFX séparé, la zone de dommage, le délai et les possibilités de destruction.
- **Revengeance — Cardboard Box, déguisement normal** : Documenter les autres faces et l’étiquette ; produire entrée/sortie et déplacement si retenus dans CQC, puis définir la détection, les limites et le contre-jeu.
- **Revengeance — Drum Can, fût de camouflage** : Vérifier le modèle retail, le couvercle et les proportions sur de nouvelles vues ; préparer les états dressé, renversé et déplacement avant règles de collision et furtivité.
- **Revengeance — Cardboard Box, variante Mariachi** : Valider position, taille et motifs du sombrero ; relier cette variante au même objet de base sans créer artificiellement un combattant ou une animation.

## Contraintes conservées

Les grenades à fragmentation et EM de Rising, le lance-roquettes, le cyborg blindé et REX The Twin Snakes ont fait l’objet de refus antérieurs. Ils ne sont pas relancés sous un nom différent. Les corps BOX-T (SMK), BOX-T (STN) et le projectile du Mortar ne sont pas remplacés par un effet de fumée générique.

La séparation reste stricte entre une source générée, sa présence dans l’Atlas, une animation produite, une fonctionnalité testée, une admission combat et une certification de fidélité. Le [manifeste P66](delivery-manifest.json) porte ces statuts explicitement.

## Périmètres hérités toujours suivis

Le [delta P65](../pass65/scope-delta.json) reste la référence des recherches précédentes. Ses huit groupes ouverts sont repris dans `inheritedOpenScopes` du [delta P66](scope-delta.json), avec l’avancée de cette passe et sans clôture implicite.

| Périmètre hérité | État après P66 |
|---|---|
| AC!D 2 — Research Block complet et étages Prototype | La baie P65 et les quatre nouveaux fragments ne couvrent pas ces ensembles ; captures et découpage encore nécessaires. |
| MGR — DL-VR005 et aire EXCELSUS | Aucun nouveau décor retenu P66 ; références natives supplémentaires nécessaires. |
| MGR — canisters GRAD et soldats humains | Aucun nouveau corps isolé retenu ; vues de silhouette et détails restent nécessaires. |
| Harold Burton, Harley Warren, Joel Marton | Identités documentaires conservées ; aucune apparence entière inventée. |
| Sources P65 : coffres, terminal VR, clôture et arc | Sources antérieures préservées ; états, autres angles et admission gameplay restent distincts de leur présence dans l’Atlas. |

Tous les manquants ne sont donc pas terminés. P66 en enrichit plusieurs avec des sources contrôlables ; le reste demeure traçable et priorisé sans renommer une absence en réalisation.
