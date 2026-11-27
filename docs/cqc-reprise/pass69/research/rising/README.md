# P69 — recherche et sources Rising / Revengeance

Ce dossier transmet **deux PNG individuels sélectionnés**, leurs références, leurs prompts exacts et leur vérification. Les trois requêtes imagegen ont produit deux fichiers ; la troisième a été refusée. Aucun PNG refusé, aucune animation et aucun corps complet ne sont comptés.

| Source | Portée livrée | Réserve principale |
|---|---|---|
| `mgr-mistral-collar-concept` | Collier mécanique isolé, 1371 × 1147, RGBA | Reconstitution d’un détail de concept PlatinumGames ; géométrie du modèle final non validée. |
| `mgr-r00-maverick-cap-portrait` | Portrait R-00 à casquette, 1434 × 1097, RGBA | Visage/microtexture reconstruits depuis une capture ; aucune vue en pied. |

Les deux PNG bruts se trouvent dans `public/cqc/assets/p69/`. Le [handoff](handoff.json) contient les SHA-256, empreintes Git, dimensions, statistiques alpha, références, paramètres exacts et tâches suivantes. [png-verification.json](png-verification.json) conserve le résultat PASS du vérificateur existant `verifyStaticPng` : structure, CRC, décompression, filtres, dimensions, empreintes et extrêmes alpha.

## Références réellement inspectées

Le [billet primaire de PlatinumGames](https://www.platinumgames.com/official-blog/article/4694) documente la conception de Mistral. Sa [planche008](https://www.platinumgames.com/official-blog/wp-content/uploads/sites/2/2013/01/008.jpg?w=600), conservée en octets d’origine, montre le collier isolé en partie supérieure. Le PNG reprend cette vue et son vocabulaire mécanique ; ses proportions fines, reliefs et attaches demeurent interpolés. Le résultat ne prouve pas que le collier dispose d’un état démontable dans le jeu.

La [capture R-00 hébergée par IMFDB](https://www.imfdb.org/images/8/8b/Rising-F2000-1.jpg) distingue un agent au premier plan avec casquette d’un second personnage casqué. Seul le premier reçoit un portrait. Les épaules sont intentionnellement cadrées. Les faibles pixels de bord (alpha3 au sommet,7 en bas,6 à gauche,4 à droite) ne constituent pas une partie opaque tronquée ; la boîte alpha≥16 conserve des marges. Les jambes, chaussures, augmentation et capacités de combat ne sont pas déduites de ce portrait. La ligne historique R-MGR-soldier reste ouverte pour les corps complets.

Les autres images conservées sont **des documents de recherche**, sans sélection implicite : vues de Mistral, rendu P40 récupéré à son commit publié, vignette vidéo et huit feuilles de storyboard de [R-02](https://www.youtube.com/watch?v=nJEM28iHx30). Leurs URL, dates relatives de vidéo et empreintes sont enregistrées. La vignette n’est pas une vue de canister ; les vues de gameplay trouvées sont trop petites ou masquées pour une extraction fidèle de ce dernier. Les échecs HTTP de récupération Gematsu/CreativeUncut/Portforward sont consignés séparément.

## Refus enregistré et limites

La requête `mgr-mistral-knife-concept` a été refusée par le service : HTTP400, `moderation_blocked`, étape `output`, catégorie `illicit`, identifiant `535a656f-2f2d-4b00-b1f3-b3ea38ec4e10`. Le [prompt exact](prompts/mgr-mistral-knife-concept.txt) et le [résultat de refus](mgr-mistral-knife-refusal.json) sont conservés. **Aucun PNG produit, aucun nouvel essai sous alias.** Les anciens refus de cyborg blindé, grenades et lance-roquettes n’ont pas été relancés.

Les corps de machines déjà attestés depuis P52 et les corps Mistral existants n’ont pas été régénérés. La recherche de doublons porte sur les registres et les chemins de l’arbre publié ; elle ne prétend pas décoder toutes les anciennes images à noms hachés. L’Étranger, Dystopia, les canisters GRAD, les soldats R-00 en pied et les arènes VR DLC restent sans nouvelle livraison dans ce lot.

Les images ont été générées avec l’outil intégré puis copiées sans modification. Pillow a seulement lu leurs dimensions et alpha. Toutes les caractéristiques de rig, d’animation, de points d’attache ou d’interactions citées dans le handoff sont du travail futur. Aucun statut combat, exact1:1 ou UHD natif n’est accordé ici.
