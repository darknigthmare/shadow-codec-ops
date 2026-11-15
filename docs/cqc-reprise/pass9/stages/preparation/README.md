# Préparation des trois stages

Le correctif est prêt dans ce dossier isolé. Il n’a été intégré ni à CQC ni à Shadow. Le runtime publié conserve donc son état précédent : **27 stages avec ambiance autonome sur 30**.

Le candidat ajoute une modulation très faible des seuls centres rouges déjà présents dans Outer Heaven et des petites lampes cyan déjà présentes dans Arsenal Corridor. Il conserve les quatre PNG, leurs placements, les profondeurs de parallaxe, le sol logique y=568, la caméra ±220 et le zoom existants. Zanzibar reste **strictement statique**, car la fonction lumineuse des marques ocre n’est pas établie.

Les quatre plans natifs de chaque stage et les quatre captures originales ont été réellement examinés, puis les captures navigateur des trois stages et de l’affichage mobile ont été vues. Aucune image native n’a été éditée, générée, recadrée ou déplacée. Les centres rouges Outer Heaven restent sur les coffrets latéraux : visibles à zoom 0,78, hors champ à caméra centrale et zoom 1.

Arsenal est qualifié **Substance PC2003** : l’ancienne première phrase « Capture originale PS2 » est harmonisée dans l’overlay proposé. Les manifestes historiques restent inchangés. Les images fixes établissent des objets et couleurs, pas les rythmes de variation. Les cycles proposés sont des adaptations d’auteur, jamais des cadences canoniques certifiées 1:1.

## Fichiers réutilisables

- `cqc-stage-layers.candidate.js` : renderer complet candidat, seul fichier de code de jeu à substituer après revue root.
- `THREE_STAGE_OVERLAY.json` : exactement trois enregistrements, avec empreinte du stage avant correction. Les seuls changements permis sont les notes de revue et les nouvelles métadonnées locales.
- `apply_overlay_to_catalog.py` : helper **en mémoire et en lecture seule**. `patched_catalog()` valide les empreintes d’entrée ; `catalog_bytes()` et `runtime_bytes()` produisent les futurs octets du JSON et du script runtime. Son exécution CLI vérifie les 19 fichiers source et écrit zéro fichier.
- `prepare_stage_patch.py` : générateur reproductible des petites propositions. Il refuse de remplacer un livrable déjà présent.
- `SOURCE_PINS.json` : 19 fichiers source, dont les 12 PNG et les quatre captures originales.
- `PHYSICAL_REVIEW.json`, `IMPLEMENTATION_PLAN.json` : positions natives mesurées et limites.

Les contrôles du renderer rejettent une référence SHA incorrecte, un stage ou une couleur non autorisés, les rectangles hors image, les valeurs invalides, les amplitudes excessives et les régions qui se chevauchent. Les masques sont créés seulement au premier dessin animé et libérés avec les images lors de l’éviction LRU. Les options `motion:false`, `animate:false`, `allowAmbientLuminance:false`, `ambient:false` et le mouvement réduit désactivent leur dessin ; le chemin désactivé à froid n’alloue aucun masque.

## Portée de l’atténuation

Le masque noir transparent utilise les seuls pixels source sélectionnés par couleur et conserve leur alpha natif. Il est dessiné immédiatement après le PNG architecture, sous la même transformation caméra/zoom, avant le premier plan. La commande d’opacité reste limitée à **2% rouge** et **3% cyan**. Le rééchantillonnage du masque est au plus proche voisin.

Il s’agit d’une faible atténuation **du pixel composé**, qui inclut la très petite contribution sous-jacente aux alphas natifs 249–254. Le RGB du PNG n’est pas transformé. Le résultat Canvas 8 bits subit une quantification d’alpha et des arrondis de canal ; une baisse observée de canal n’est donc pas une preuve de baisse RGB exactement égale au pourcentage de commande. Les comparaisons raster bornent cette quantification à la commande +1/255 d’alpha et un point de canal. Le premier test utilisait une borne continue trop stricte ; son échec est conservé, tout comme la mesure du pixel 98→94 à opacité 3%. Aucun code de jeu n’a été modifié pour masquer cet écart.

## Vérifications closes

- Revue indépendante : **28 tests historiques et 19 gardes** passent, renderer candidat `bae53a408c68837a8995f0154a54dc05cdd0c2ad3648b49671bbfa8aefee71cb`.
- Rendu réel Chromium : **56 comparaisons desktop +56 mobile**, temps 0/2/4/9 et milieux de cycles, caméra −220/0/+220, zoom 0,78/1/1,08. Les commandes de dessin des quatre plans restent identiques ; aucun nouveau pixel lumineux ni changement d’alpha composé ; Zanzibar et tous les modes désactivés sont identiques à l’ancien renderer.
- Huit masques réellement lus : **1 266 pixels colorés** sélectionnés ; les pixels de structure exclus ont un alpha nul, les alphas natifs sélectionnés restent identiques.
- Cinq chemins désactivés à froid : zéro allocation et zéro dessin de masque. Quatre buffers libérés à l’éviction, quatre reconstruits au rechargement, cache inchangé.
- Les 12 PNG effectivement chargés par le navigateur gardent leurs tailles et SHA complets.

Preuves réelles : `/workspace/cqc-pass9-stage-browser-proof/run-final04`. Revue indépendante : `/workspace/cqc-pass9-stage-review/INDEPENDENT_STAGE_REVIEW_FINAL.json`. Les tentatives précédentes et leurs captures restent disponibles. Le serveur et le navigateur isolés ont été arrêtés ; seuls leurs répertoires temporaires propres ont été nettoyés.

Une intégration future doit encore vérifier le jeu complet, notamment la marche réelle des personnages et les replays, les deux routes CQC/Shadow et les réglages de mouvement. Ces tests isolés comparent le renderer et les plans ; ils ne certifient pas déjà ces parcours de production. Après intégration, le comptage correct sera **29 ambiances autonomes sur 30**, avec Zanzibar statique, et non une prétendue validation canonique des 30 stages.
