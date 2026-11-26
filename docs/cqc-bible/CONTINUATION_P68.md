# Continuation P68 — ennemis MSX2/NES et Balloon Trap Survive

**26 novembre 2026.** **5 nouvelles sources sélectionnées, 1 essai archivé et 6 appels imagegen.** Le cumul atteint **259 sources sélectionnées**, **82 dossiers Atlas** et **20 archives**.

[Galerie](../cqc-reprise/pass68/README.md) · [Associations](asset-associations-p68.json) · [Manifeste](../cqc-reprise/pass68/delivery-manifest.json) · [Manquants](../cqc-reprise/pass68/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass68/INTEGRATION_QA.md)

Les deux chiens, le garde au jetpack NES et le garde rouge MSX2 suivent des frames natives de leurs éditions. Le Balloon Trap Survive suit une capture native attribuée par son libellé. Les reconstructions conservent des limites explicites : les pixels agrandis ne sont pas une extraction exacte et un support du piège est partiellement occulté. Les 77 dossiers Atlas P67 restent identiques et dans le même ordre.

Les plans d’animation et d’interaction ci-dessous décrivent le travail à réaliser dans le contexte du duel CQC. **Une seule image fixe est livrée par sujet ; aucune des séquences proposées n’est générée ou implémentée.** Les durées, volumes, règles et capacités demandent leurs preuves natives et leur validation de jeu.

## Fiches individuelles

<a id="classic-mg1-msx-guard-dog-side"></a>

### Metal Gear MSX2 — chien de garde, profil natif

Une seule pose complète de la variante native indiquée ; ni animation, ni ensemble de la famille, ni admission au combat.

| Champ | Valeur |
|---|---|
| Identité | `asset:p68:classic-mg1-msx-guard-dog-side` |
| Type / édition | `machine` / `mg_msx` — Jeu original MSX2 |
| Fichier | [classic-mg1-msx-guard-dog-side.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p68/classic-mg1-msx-guard-dog-side.png) |
| Dimensions de sortie | 1536 × 1024, RGBA, 707,615 octets |
| SHA-256 | `552b164d66e387ef8ecf7dd499f317a1dea4fc2645e90ccec1e0132bffca702a` |
| WorkIds | `character:R-MG1-03` ; `machine:mg1_msx_guard_dog_side` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [rubriques et exigences](guide-map.json) |
| État réel | Source consultable dans l’Atlas ; combat et certification 1:1 non validés |

**Références et constats.**

- [Référence 1](https://www.spriters-resource.com/msx2/metalgear/asset/22528/)
- [Référence 2](https://www.spriters-resource.com/media/assets/21/22528.png?updated=1755472545)

Les captures/frames utilisées sont archivées dans [mg1-msx-enemies-native.png](../cqc-reprise/pass68/research/classic/references/mg1-msx-enemies-native.png).

- Chien MSX2 de profil gauche, silhouette noire et rehauts cuivre conservés dans un rendu pixel art agrandi.
- Une pose quadrupède complète ; tête, queue et pattes visibles, sans cadre, autres animaux, sol ou ombre.
- Le placement exact des pixels et des pattes n’est pas une extraction déterministe de la frame native ; les microvariations de palette et surface générées restent à revoir.
- Sortie PNG brute conservée sans retouche, découpe, recoloration ou agrandissement des pixels. Les deux planches JPEG de contrôle sont des dérivés de visualisation seulement.
- Inspection sur fond clair et sombre : silhouette lisible, pas de fond opaque ou de coupe du sujet. Quelques pixels alpha très faibles périphériques sont conservés dans les fichiers bruts.
- La plupart des pixels intérieurs atteignent alpha 254 ; l’absence de pixel alpha 255 dans certaines sorties n’implique pas que le personnage soit invisible.
- Source statique candidate ; fidélité absolue 1:1 et UHD native non certifiées, aucun groupe clôturé.

**Rôle et animation à produire.** Ennemi quadrupède de référence MSX2 ; aucun combattant humain ou compagnon ajouté au roster.

| État prévu | Description et vérification requise |
|---|---|
| Attente et observation | Stabiliser les quatre appuis, conserver le dos et la queue de la variante ; tout mouvement de tête exige une frame native ou une adaptation clairement identifiée. |
| Déplacement | Décomposer appui, poussée, passage des membres et retour à la pose initiale. Les pattes proches et éloignées doivent rester identifiables ; ne pas dupliquer le PNG fixe pour prétendre livrer un cycle. |
| Alerte et approche | Préparer une transition lisible entre locomotion et orientation vers la cible. La portée de détection, le temps de réaction et le changement de direction sont des paramètres CQC encore non implémentés. |
| Contact, récupération et sortie | Si une attaque de contact est retenue après qualification native, séparer préparation, contact et récupération. Prévoir réaction à impact, interruption et sortie de scène ; aucune nouvelle morsure ou neutralisation produite ici. |

**Interactions à valider.**

- Mesurer séparément le volume bas de la créature et les collisions du terrain ; ne pas appliquer une capsule humaine par défaut.
- Établir le contre-jeu et la compatibilité des projections/neutralisations avec une petite cible avant de l’utiliser dans un duel.
- Conserver les deux éditions et leurs palettes, sans échange automatique de cycles entre MSX2 et NES.

**Assets encore nécessaires :** Frames natives complémentaires ; Vues latérales CQC si retenues ; Cycle de déplacement ; Réactions et états de sortie ; Sons et effets éventuels séparés.

À mesurer sur les références puis équilibrer dans CQC ; aucun nombre de frames canonique inventé. La source conserve sa vue native. Une éventuelle vue latérale CQC demande des références et des sprites séparés.

<a id="classic-mg1-nes-guard-dog-side"></a>

### Metal Gear NES — chien de garde, profil natif

Une seule pose complète de la variante native indiquée ; ni animation, ni ensemble de la famille, ni admission au combat.

| Champ | Valeur |
|---|---|
| Identité | `asset:p68:classic-mg1-nes-guard-dog-side` |
| Type / édition | `machine` / `mg_nes` — Portage NES |
| Fichier | [classic-mg1-nes-guard-dog-side.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p68/classic-mg1-nes-guard-dog-side.png) |
| Dimensions de sortie | 1774 × 887, RGBA, 363,154 octets |
| SHA-256 | `f55c32c07df48be89468fc1edea07a7292203868edd17af3722043584a9504bd` |
| WorkIds | `character:R-MG1-03` ; `machine:mg1_nes_guard_dog_side` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [rubriques et exigences](guide-map.json) |
| État réel | Source consultable dans l’Atlas ; combat et certification 1:1 non validés |

**Références et constats.**

- [Référence 1](https://www.spriters-resource.com/nes/mg/asset/19406/page-1/)
- [Référence 2](https://www.spriters-resource.com/media/assets/18/19406.png?updated=1755472532)

Les captures/frames utilisées sont archivées dans [mg1-nes-enemies-native.png](../cqc-reprise/pass68/research/classic/references/mg1-nes-enemies-native.png).

- Chien NES distinct du candidat MSX2 : profil gauche, silhouette noire, rehauts beige clair et gris, pose de course étirée.
- Une seule créature complète ; l’édition est attribuée à la planche NES et n’est pas transférée aux autres jeux.
- Les blocs de pixels, leurs dimensions et leur espacement sont reconstruits par le générateur ; une fidélité au pixel près n’est pas certifiée.
- Sortie PNG brute conservée sans retouche, découpe, recoloration ou agrandissement des pixels. Les deux planches JPEG de contrôle sont des dérivés de visualisation seulement.
- Inspection sur fond clair et sombre : silhouette lisible, pas de fond opaque ou de coupe du sujet. Quelques pixels alpha très faibles périphériques sont conservés dans les fichiers bruts.
- La plupart des pixels intérieurs atteignent alpha 254 ; l’absence de pixel alpha 255 dans certaines sorties n’implique pas que le personnage soit invisible.
- Source statique candidate ; fidélité absolue 1:1 et UHD native non certifiées, aucun groupe clôturé.

**Rôle et animation à produire.** Ennemi quadrupède de référence NES ; aucun combattant humain ou compagnon ajouté au roster.

| État prévu | Description et vérification requise |
|---|---|
| Attente et observation | Stabiliser les quatre appuis, conserver le dos et la queue de la variante ; tout mouvement de tête exige une frame native ou une adaptation clairement identifiée. |
| Déplacement | Décomposer appui, poussée, passage des membres et retour à la pose initiale. Les pattes proches et éloignées doivent rester identifiables ; ne pas dupliquer le PNG fixe pour prétendre livrer un cycle. |
| Alerte et approche | Préparer une transition lisible entre locomotion et orientation vers la cible. La portée de détection, le temps de réaction et le changement de direction sont des paramètres CQC encore non implémentés. |
| Contact, récupération et sortie | Si une attaque de contact est retenue après qualification native, séparer préparation, contact et récupération. Prévoir réaction à impact, interruption et sortie de scène ; aucune nouvelle morsure ou neutralisation produite ici. |

**Interactions à valider.**

- Mesurer séparément le volume bas de la créature et les collisions du terrain ; ne pas appliquer une capsule humaine par défaut.
- Établir le contre-jeu et la compatibilité des projections/neutralisations avec une petite cible avant de l’utiliser dans un duel.
- Conserver les deux éditions et leurs palettes, sans échange automatique de cycles entre MSX2 et NES.

**Assets encore nécessaires :** Frames natives complémentaires ; Vues latérales CQC si retenues ; Cycle de déplacement ; Réactions et états de sortie ; Sons et effets éventuels séparés.

À mesurer sur les références puis équilibrer dans CQC ; aucun nombre de frames canonique inventé. La source conserve sa vue native. Une éventuelle vue latérale CQC demande des références et des sprites séparés.

<a id="classic-mg1-nes-jetpack-guard"></a>

### Metal Gear NES — garde au jetpack, pose native

Une seule pose complète de la variante native indiquée ; ni animation, ni ensemble de la famille, ni admission au combat.

| Champ | Valeur |
|---|---|
| Identité | `asset:p68:classic-mg1-nes-jetpack-guard` |
| Type / édition | `character` / `mg_nes` — Portage NES |
| Fichier | [classic-mg1-nes-jetpack-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p68/classic-mg1-nes-jetpack-guard.png) |
| Dimensions de sortie | 1024 × 1536, RGBA, 794,200 octets |
| SHA-256 | `a66b15d776dae733d6ce3ddaa33e3ac5977a4ebfa8b6f7cef09f2955c4aecffe` |
| WorkIds | `character:R-MG1-03` ; `character:mg1_nes_jetpack_guard` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [rubriques et exigences](guide-map.json) |
| État réel | Source consultable dans l’Atlas ; combat et certification 1:1 non validés |

**Références et constats.**

- [Référence 1](https://www.spriters-resource.com/nes/mg/asset/19406/page-1/)
- [Référence 2](https://www.spriters-resource.com/media/assets/18/19406.png?updated=1755472532)

Les captures/frames utilisées sont archivées dans [mg1-nes-enemies-native.png](../cqc-reprise/pass68/research/classic/references/mg1-nes-enemies-native.png).

- Garde NES du bloc JETPACK GUARD, pose verticale native, noir, crème et beige, deux grandes formes supérieures de l’équipement visibles.
- Le corps complet est cadré avec une marge ; aucune flamme, animation de vol ou mécanique nouvelle n’est ajoutée.
- La petite frame ne fournit pas une géométrie 3D complète de l’équipement ; le dessin agrandi ne prouve ni le nombre de composants cachés ni une copie exacte des texels.
- Sortie PNG brute conservée sans retouche, découpe, recoloration ou agrandissement des pixels. Les deux planches JPEG de contrôle sont des dérivés de visualisation seulement.
- Inspection sur fond clair et sombre : silhouette lisible, pas de fond opaque ou de coupe du sujet. Quelques pixels alpha très faibles périphériques sont conservés dans les fichiers bruts.
- La plupart des pixels intérieurs atteignent alpha 254 ; l’absence de pixel alpha 255 dans certaines sorties n’implique pas que le personnage soit invisible.
- Source statique candidate ; fidélité absolue 1:1 et UHD native non certifiées, aucun groupe clôturé.

**Rôle et animation à produire.** Variante ennemie NES à appareil dorsal ; la frame fixe ne prouve pas un kit aérien complet.

| État prévu | Description et vérification requise |
|---|---|
| Pose de référence | Conserver l’axe du corps, les pieds et les deux grandes formes supérieures de l’équipement ; fixer l’ancrage du personnage et celui du dispositif séparément. |
| Déplacement au sol | Décomposer départ, appuis et arrêt uniquement après observation de frames du même ennemi. Éviter la copie des animations du garde standard. |
| Transition aérienne à qualifier | Rechercher une séquence native pour départ, déplacement aérien et retour au sol. Les variations d’altitude, flammes et fumées restent des besoins conditionnels, pas des capacités déclarées par ce PNG. |
| Réaction et interruption | Documenter séparément réaction au sol, interruption d’une transition et reprise stable. Les poses intermédiaires et éventuels morceaux détachés ne sont pas fournis. |

**Interactions à valider.**

- Définir limites d’altitude et interaction avec plateformes uniquement après validation de la séquence source.
- Séparer masse du corps, accessoire dorsal et éventuels effets ; aucune hitbox ni invulnérabilité déduite de l’appareil.
- Qualifier les armes visibles avant d’ajouter tir, projectile ou rechargement.

**Assets encore nécessaires :** Vues natives complémentaires ; Frames de déplacement ; États aériens si attestés ; Réactions ; VFX et projectiles qualifiés séparément.

À mesurer sur les références puis équilibrer dans CQC ; aucun nombre de frames canonique inventé. La source conserve sa vue native. Une éventuelle vue latérale CQC demande des références et des sprites séparés.

<a id="classic-mg1-msx-red-guard"></a>

### Metal Gear MSX2 — garde rouge d’Outer Heaven

Une seule pose complète de la variante native indiquée ; ni animation, ni ensemble de la famille, ni admission au combat.

| Champ | Valeur |
|---|---|
| Identité | `asset:p68:classic-mg1-msx-red-guard` |
| Type / édition | `character` / `mg_msx` — Jeu original MSX2 |
| Fichier | [classic-mg1-msx-red-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p68/classic-mg1-msx-red-guard.png) |
| Dimensions de sortie | 1024 × 1536, RGBA, 659,309 octets |
| SHA-256 | `5a977ced18f3b43233ab6e310127e9530a84a216d90edfe849bb736da5015a5f` |
| WorkIds | `character:R-MG1-03` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [rubriques et exigences](guide-map.json) |
| État réel | Source consultable dans l’Atlas ; combat et certification 1:1 non validés |

**Références et constats.**

- [Référence 1](https://www.spriters-resource.com/msx2/metalgear/asset/22528/)
- [Référence 2](https://www.spriters-resource.com/media/assets/21/22528.png?updated=1755472545)

Les captures/frames utilisées sont archivées dans [mg1-msx-enemies-native.png](../cqc-reprise/pass68/research/classic/references/mg1-msx-enemies-native.png).

- Garde rouge MSX2, silhouette compacte, uniforme rouge/noir et visage/mains clairs, pose native légèrement élevée.
- Le cadrage contient tête, équipement visible et deux pieds. Le motif de pixels et les détails gris sont reconstruits, sans certification pixel exacte.
- Génération depuis les cinq dernières images de conversation après disparition du chemin local : seule la première image, planche MSX2 inspectée, a été désignée comme référence de design.
- Sortie PNG brute conservée sans retouche, découpe, recoloration ou agrandissement des pixels. Les deux planches JPEG de contrôle sont des dérivés de visualisation seulement.
- Inspection sur fond clair et sombre : silhouette lisible, pas de fond opaque ou de coupe du sujet. Quelques pixels alpha très faibles périphériques sont conservés dans les fichiers bruts.
- La plupart des pixels intérieurs atteignent alpha 254 ; l’absence de pixel alpha 255 dans certaines sorties n’implique pas que le personnage soit invisible.
- Source statique candidate ; fidélité absolue 1:1 et UHD native non certifiées, aucun groupe clôturé.

**Rôle et animation à produire.** Une variante de garde MSX2 ; la couleur ne crée pas une classe ou un équipement universel.

| État prévu | Description et vérification requise |
|---|---|
| Garde de référence | Relever l’orientation, la position des mains et la silhouette sombre de l’équipement. Conserver l’asymétrie et la palette rouge propre à la frame. |
| Patrouille et arrêt | Décomposer appui gauche, passage, appui droit et retour sans glissement des pieds ; la chronologie doit venir des frames natives de cette variante. |
| Détection et action | Séparer pivot, préparation et récupération. La nature de l’arme et du tir doit être qualifiée avant de produire recul, flash ou projectile. |
| Impact et sortie | Prévoir réaction courte, interruption et état final adaptés à CQC ; les poses de neutralisation et de fin de manche sont à produire et à valider, sans être attribuées automatiquement au jeu MSX2. |

**Interactions à valider.**

- Mesurer le volume corporel et la portée de contact indépendamment de l’image agrandie.
- Vérifier la garde, les projections et la lisibilité de la préparation contre petite et grande cible avant admission.
- Ne pas transformer une variation de palette en bonus de dégâts, rang ou IA sans preuve ou décision de conception explicite.

**Assets encore nécessaires :** Patrouille et pivots ; Actions avec arme qualifiée ; Réactions et neutralisations ; Vues opposées vérifiées ; Projectiles et VFX séparés.

À mesurer sur les références puis équilibrer dans CQC ; aucun nombre de frames canonique inventé. La source conserve sa vue native. Une éventuelle vue latérale CQC demande des références et des sprites séparés.

<a id="survive-balloon-trap"></a>

### Survive — Balloon Trap, déployé inactif

Un gadget Balloon Trap déployé sans ballon gonflé, vue trois quarts plongeante ; source statique individuelle.

| Champ | Valeur |
|---|---|
| Identité | `asset:p68:survive-balloon-trap` |
| Type / édition | `prop` / `survive` — Metal Gear Survive — capture native PC/console, plateforme de capture non certifiée |
| Fichier | [survive-balloon-trap.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p68/survive-balloon-trap.png) |
| Dimensions de sortie | 1536 × 1024, RGBA, 1,703,307 octets |
| SHA-256 | `665ea5e6f9b46ac7985943738ba6b184d9fde13181b4fb711d27e86c723b17da` |
| WorkIds | `prop:survive_balloon_trap` |
| Guide | 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29 — [rubriques et exigences](guide-map.json) |
| État réel | Source consultable dans l’Atlas ; combat et certification 1:1 non validés |

**Références et constats.**

- [Référence 1](https://w.atwiki.jp/mgsurvive/pages/111.html)
- [Référence 2](https://img.atwiki.jp/mgsurvive/attach/111/98/220401_12.jpg)
- [Référence 3](https://w.atwiki.jp/mgsurvive/pages/81.html)

Les captures/frames utilisées sont archivées dans [native-balloon-trap-220401_12.jpg](../cqc-reprise/pass68/research/survive/references/native-balloon-trap-220401_12.jpg).

- Capture native portant explicitement le libellé バルーントラップ, hébergée sur un wiki communautaire ; aucune provenance d’illustration officielle Konami revendiquée.
- Corps olive facetté, sommet étroit, détails circulaires frontaux, creux ovale inférieur, collerette ronde et supports noirs très bas repris de la capture.
- Portion du support gauche masquée par l’avatar complétée par continuité ; vue arrière, implantation et nombre réel des supports restent à vérifier sur une seconde vue.
- Hauteur du corps et proportions interprétées ; rivets, découpes, plaque supérieure et usure interpolés, sans validation métrique ni certification absolue 1:1.
- Le root a signalé un large halo dans l’aperçu. La lecture des pixels échantillonnés dans ces plages donne alpha=0 : leurs couleurs RGB sont invisibles avec une composition alpha correcte. Une faible frange native demeure ; à plus de 8 px du masque alpha>128, 1 521 pixels ont alpha=1, dont 498 à plus de 32 px. Aucun nettoyage de pixels effectué.
- PNG brut RGBA 1536×1024, alpha maximal 254/255 préservé ; aucune valeur alpha>16 sur les bords. Pas de validation de rendu navigateur revendiquée.
- Un seul objet inactif ; aucun gonflage, câble, capture, élévation, retour, effet, collision ou comportement jouable fourni.

**Rôle et animation à produire.** Accessoire Survive déployé inactif ; aucun ballon gonflé, câble ou ennemi capturé livré.

| État prévu | Description et vérification requise |
|---|---|
| Pose et armement | Définir une pose au sol avec toutes les extrémités dans une zone de support valide. Séparer apparition/installation et état armé ; la séquence et sa durée restent à documenter. |
| Attente déployée | Utiliser la source fixe comme référence du boîtier et des supports. Toute animation de témoin, vibration ou signal sonore doit être sourcée ou marquée comme adaptation CQC. |
| Déclenchement et capture à confirmer | Obtenir les vues natives du mécanisme avant de produire ouverture, ballon, câble, attache et éventuelle élévation. Chaque élément doit être un asset distinct, avec ancrage et occlusion propres. |
| Interruption, expiration et retrait | Prévoir libération de la cible, retour à un état contrôlable et retrait du piège aux transitions de manche. Les règles d’immunité, destruction et récupération restent des choix non implémentés. |

**Interactions à valider.**

- Définir placement, espace requis et compatibilité avec les plateformes ; aucune pose flottante ou support traversant le terrain.
- Établir une matrice de cibles compatibles par taille, morphologie et état ; ne pas supposer qu’une machine géante peut être capturée.
- Prévoir anticipation et contre-jeu lisibles, pause, KO simultané et fin de manche sans cible suspendue hors état.
- Conserver le piège distinct du Mortar ennemi, de son projectile et de l’Air Shock Cannon.

**Assets encore nécessaires :** Vue dégagée des supports ; Vue arrière ; Ballon et câble natifs ; Déclenchement et retour ; VFX/SFX et collisions.

À mesurer sur les références puis équilibrer dans CQC ; aucun nombre de frames canonique inventé. La source conserve sa vue native. Une éventuelle vue latérale CQC demande des références et des sprites séparés.

## Choix de version et conservation

Le Balloon Trap **V1** est retenu. Une correction alpha a produit V2, archivée : les grandes plages suspectées de halo dans V1 ont été mesurées à alpha nul, alors que V2 modifiait aussi les microtextures. Les faibles franges périphériques restent décrites dans le [diagnostic Survive](../cqc-reprise/pass68/research/survive/pixel-qa.json). Aucun nettoyage de pixels n’a été appliqué aux sorties brutes.

Les [53 fichiers locaux récupérés](../cqc-reprise/local-recovery-20261126/README.md) sont conservés dans une archive additive, publiée au commit `97b19718581154374ecb8bbb299540fd4c8b0322`. Cette récupération documentaire est distincte des cinq images P68. La base de comparaison des assets reste P67 (`0a92d18aa7bb4068f0be0265bf01d884e3404e95`).

Une réinitialisation de l’exécuteur a supprimé le premier dossier temporaire. Les sorties d’image brutes, les blobs déjà créés et les copies exactes des références publiées ont permis la reprise. Les chemins d’origine sont conservés comme provenance ; ils ne sont pas présentés comme des chemins encore accessibles.

Les familles restent ouvertes : R-MG1-03 avait déjà des candidats P67. Les quatre nouveaux classiques ajoutent des variantes à ce groupe ; le piège crée un périmètre d’extension. Le nombre de lignes historiques non résolues sans candidat reste **76**. Aucun décor, projectile, VFX, intro, épilogue ou nouveau kit complet n’est produit dans cette passe.
