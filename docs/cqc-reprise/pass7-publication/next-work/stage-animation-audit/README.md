# Audit des trois ambiances restantes

**État constaté : 27 stages sur 30 ont une animation ambiante autonome.** Les trois autres sont `outer_heaven`, `zanzibar` et `arsenal_corridor`. Leurs quatre plans de parallaxe fonctionnent déjà ; il manque seulement une variation ambiante indépendante de la caméra. Aucun stage, plan ou ancien fichier n’a été perdu dans ce constat.

Cette livraison est une préparation isolée. Elle ne change ni CQC, ni Shadow, ni les dépôts Git, ni les générations ou les archives. Aucun téléchargement ni nouvelle génération d’image n’a été effectué. Le prototype n’est pas intégré au jeu publié.

| Stage | Éléments établis par les références existantes | Proposition minimale | Limite de fidélité |
|---|---|---|---|
| Outer Heaven | Hangar TX-55 de Metal Gear MSX2 (1987), quatre centres rouges sur des coffrets striés | Moduler seulement ces pixels rouges entre 98% et 100% de leur luminance actuelle ; périodes d’auteur 7 à 9 secondes | Le clignotement source n’est pas prouvé. Les centres restent aux flancs : les quatre sont visibles à zoom 0,78, aucun à caméra centrale/zoom 1. Ne pas les déplacer pour rendre l’effet visible. |
| Arsenal Corridor | Lampes cyan déjà présentes dans le corridor Snake/Raiden/Tengu | Modulation locale de 97% à 100%, périodes d’auteur 6 à 8 secondes ; halos peints conservés | La capture conservée provient de **Substance PC2003**. Géométrie partagée avec la cible PS2, textures/effets PS2 non certifiés ; cadence source non prouvée. |
| Zanzibar | Hangar MG2 MSX2 (1990) après destruction de Metal Gear D ; marques ocre sur le mur | Le choix statique reste le plus fidèle aux preuves. Une adaptation facultative peut moduler les seules marques ocre de quatre panneaux centraux entre 99% et 100%, sur 8 à 10 secondes | La fonction lumineuse des marques reste inconnue. La source comporte quatre groupes, le mur adapté en comporte huit. Ne pas les présenter comme des voyants canoniques. |

Les captures fixes permettent de conserver les objets, les couleurs et les emplacements. Elles ne certifient aucune de ces cadences. Les propositions visent le `closest_supported` autorisé, en conservant l’objectif de fidélité 1:1 et les limites explicites. Aucun élément de lore ou effet de météo n’est ajouté : ni robot dans le décor vide, ni tirs, fumée, étincelles, ventilateur mobile ou nouvelle lumière sur le sol.

## Références conservées

- [Outer Heaven : capture MSX2](https://lparchive.org/Metal-Gear-1-2/Update%2012/23-Metal_Gear_0585.png).
- [Zanzibar : après destruction](https://lparchive.org/Metal-Gear-1-2/Update%2041/22-Metal_Gear_2_1515.png) ; [même salle avant destruction](https://lparchive.org/Metal-Gear-1-2/Update%2041/9-Metal_Gear_2_1505.png), phase distincte qui ne prouve pas une alternance lumineuse ambiante.
- [Arsenal : capture du corridor](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%2030/mgs2_106_ae8.jpg) ; [déclaration de l’édition PC2003 du playthrough](https://lparchive.org/Metal-Gear-Solid-2-(Screenshot)/Update%201/).

Les fichiers locaux, leurs SHA-256, les masters, les plans architecture et les rectangles natifs sont listés dans [la revue physique](references-review/EXISTING_STAGE_REFERENCE_ANIMATION_REVIEW.json). Douze images existantes ont été examinées. Le manifeste historique d’Arsenal affirme encore PS2 ; cette trace reste conservée. Le catalogue actuel réattribue la référence à PC2003. Sa première phrase de notes contient encore l’ancien libellé « Capture originale PS2 » : la future mise à jour devra harmoniser cette phrase avec la qualification déjà ajoutée, sans remplacer le manifeste historique.

## Implémentation minimale à poursuivre

1. Ajouter des régions de luminance locales au catalogue, ancrées au PNG architecture et à son SHA actuel. Conserver tous les PNG natifs et les quatre plans actuels. Ne pas appliquer `motion` au plan architecture : le validateur actuel interdit de déformer les murs et le sol.
2. À l’import des images d’un stage, préparer en mémoire de petits masques transparents des seuls pixels rouges, cyan ou ocre. Les rectangles ne suffisent pas : ils contiennent aussi des pixels de structure qui doivent rester fixes. Les douze masques couvrent 1 934 pixels colorés sélectionnés, sur 3 267 pixels examinés.
3. Après le dessin du plan architecture et avant le premier plan, appliquer une faible couche noire uniquement sous ces masques, avec **la même transformation caméra/zoom que l’architecture**. Elle atténue la couleur existante ; aucun changement de forme, halo ajouté ou faisceau n’est créé. Libérer les masques avec les images dans le cache LRU.
4. Respecter le réglage de mouvement du jeu et `prefers-reduced-motion`. À modulation inactive, dessiner strictement les plans actuels. Conserver collision, sol logique y=568, caméra ±220, zoom et placement des personnages.
5. Mettre à jour le catalogue JSON puis son script runtime généré, conserver les anciens fichiers dans une nouvelle provenance, puis synchroniser le runtime Shadow par le processus existant. Documenter la cadence comme adaptation d’auteur. Zanzibar peut rester statique, ou recevoir l’option faible explicitement qualifiée ci-dessus ; aucune certification de comportement source ne doit être ajoutée.
6. Vérifier les seuls pixels visés sur navigateur : temps fixes, caméra ±220, zoom 0,78/1,08, desktop/mobile, mouvement désactivé et mouvement réduit. Examiner réellement les captures avant d’annoncer l’intégration. Une éventuelle référence vidéo source devra préciser édition, scène et état du hangar ; cette recherche n’a pas été simulée ici.

Les changements de production nécessaires se limitent au renderer, au catalogue JSON et à son script runtime généré, puis aux preuves et à la synchronisation Shadow. Le [plan JSON](IMPLEMENTATION_PLAN.json) conserve les fichiers et les critères exacts.

## Prototype et vérifications effectuées

[preview.html](preview.html) utilise les fichiers actuels en lecture seule lorsqu’un serveur HTTP sert `/workspace`. La case de modulation est inactive par défaut. [luminance-study.js](luminance-study.js) contient le prototype isolé ; [PROTOTYPE_CONFIG.json](PROTOTYPE_CONFIG.json) les rectangles natifs, SHA, masques et limites. Aucun serveur n’a été lancé pendant la publication.

[138 vérifications analytiques](ANALYTICAL_VERIFICATION.final.json) passent : le validateur réel accepte les 30 stages ; les catalogues runtime R/Shadow correspondent au JSON source ; les commandes de dessin réelles des trois stages sont identiques aux temps 0, 2 et 9 à caméra fixe pour sept cadrages ; les masques JS correspondent aux pixels natifs lus ; les amplitudes restent bornées et les quatre gardes de désactivation ne dessinent rien. Les 43 entrées épinglées gardent leurs octets et SHA pendant la vérification. La première version à 135 contrôles et les drafts précédant l’ajout de la garde normalisée `animate:false` sont conservés.

**Ces contrôles comparent du code, des pixels source lus et des transformations. Le prototype n’a pas été vérifié par rendu raster navigateur.** La publication actuelle reste à 27/30 ambiances autonomes, avec quatre plans fonctionnels sur chacun des trois stages étudiés. Les SHA d’entrée et des livrables sont fournis dans les fichiers de manifeste ; une première hypothèse incorrecte sur l’emplacement du catalogue Shadow est conservée dans `INITIAL_INPUT_DISCOVERY_FAILURE.json`.
