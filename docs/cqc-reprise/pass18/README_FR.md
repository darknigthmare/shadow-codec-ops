# CQC — roster, stages, machines et effets complets

Le roster courant est couvert intégralement : **355 identités**, réparties entre **338 identités en sprites natifs et 17 identités de machines**. Les UIDs, profils de combat, sauvegardes et historiques sont conservés. CQC reste accessible séparément et dans l’onglet de Shadow Codec Ops.

## Contenu intégré

- Les **113 stages de Core et 122 scènes de Versus** ont une présentation native. Le lot complète les 85 scènes initialement manquantes avec 82 nouvelles sources et trois réutilisations attestées ; les compositions utilisent plusieurs plans de parallaxe et des animations adaptées au jeu.
- Les **50 rigs de machines et véhicules** couvrent les Metal Gear et machines associés, avec parties articulées et états adaptés au combat. Les 17 identités de machines jouables sont distinctes des 338 identités en sprites.
- **64 effets natifs, 256 frames et huit atlas** couvrent les 636 routes de projectiles de 235 combattants, avec effets de contact, armes, explosions et dangers. Deux sources indépendantes supplémentaires représentent le compagnon de Hawk et les marionnettes d’Owl.
- **108 points de sortie d’armes** sont calculés depuis les poses sélectionnées ; les tirs hors pose et les flashs de récupération sont supprimés. Les origines physiques des projectiles restent celles du jeu.
- Les variantes de costumes restent propres à chaque emplacement du match. La marionnette B est enregistrée dans le renderer ; les deux formes restent nommées A/B car l’attribution individuelle à Elsie ou Frances n’est pas attestée.
- La sélection du stage suit « Commencer ». Les réglages du match sont dans la roue crantée ; le menu pause contient retour à la sélection, abandon, techniques et finishers avec affichage des deux côtés. Le lancement attend les sprites, le stage et les effets nécessaires.

## Vérification réelle

Le build Vite final passe. Le contrôle des 338 entrées de sprites réalise **12 440 sélections de frames et 24 880 dessins Canvas** dans Chromium, sans débordement alpha. Il vérifie leur géométrie et leur affichage ajusté ; il ne certifie pas une extraction originale ou la fidélité canonique.

Le parcours de match passe en CQC séparé et intégré, à 2560 × 1440 : navigation rapide des menus, image toujours visible, réglages, sélection de stage, sprites prêts au lancement, pause et techniques bilatérales. Les contrôles réels des costumes A/B passent aussi, avec 30 frames distinctes de la variante B dessinées dans deux cadres.

Le contrôle des effets dessine leurs 256 frames, vérifie 636 routes de projectiles et leur suppression pendant un délai ou après destruction, soit 2 864 dessins de sources. Les 108 points d’armes produisent 318 dessins de flashs sur les routes balistiques ; parmi les 108, deux points documentés concernent une arme dont le profil historique n’a pas de route balistique. Les compagnons et les 32 simulations Arsenal disposent de contrôles de dispatch et de simulation distincts.

Les **1 925 fichiers du runtime (2 244 288 808 octets)** sont relus et vérifiés par SHA-256. Le fichier de couches de stages de la base publiée est bien celui du commit parent : 23 680 octets, SHA-256 `d3d648f4259133bc0ad00c3d452d7986b0422450c22304f0bf7dc52a47357c37`. Un ancien garde de test utilisait par erreur une empreinte historique ; les tentatives et la correction sont conservées.

Les échecs antérieurs de vérification sont conservés et ne servent pas de certification. La saturation de mémoire d’image du navigateur local a été résolue en utilisant sa mémoire partagée dédiée ; elle n’a nécessité aucune modification des sources PNG ou du renderer.

## Sources et fidélité

L’objectif reste la fidélité 1:1 aux incarnations attestées. Les dessins générés, leurs poses, timings et adaptations 2D ne sont pas des extractions exactes des jeux originaux. Les détails ou corps non attestés sont explicitement qualifiés comme reconstitutions ; aucune certification globale de fidélité absolue n’est revendiquée. Les références, demandes de génération, sources sélectionnées, tentatives rejetées et versions précédentes sont archivées sans altération de leurs pixels.

Les archives de `source-archives/` conservent tous les contenus et les métadonnées nécessaires à leur restauration. Concaténer leurs parties dans l’ordre de `LOSSLESS_RECONSTRUCTION_V1.json`, vérifier le SHA-256 de l’ensemble, puis suivre `SOURCE_PATH_INDEX_V1.json` dans le tar.gz. Les fichiers historiques du dépôt restent présents. Les copies physiques de PNG dérivées partagées et les déplacements de workers sont documentés séparément ; les observations d’inode et de ctime ne constituent pas une promesse de restauration de la même identité physique.

Ce lot termine le périmètre CQC courant. La refonte visuelle de tous les Codec de Shadow Ops reste un chantier distinct ; les 22 présentations natives sur 59 variantes Codec ne sont pas annoncées comme 59 variantes terminées.
