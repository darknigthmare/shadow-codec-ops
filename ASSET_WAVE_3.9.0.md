# Vague 3.9.0 — machines Peace Walker et objets Side Ops

Travail du 8 septembre 2026. Ce document actualise la livraison depuis la 3.8 ; l'[audit du 8 septembre](ASSET_COVERAGE_AUDIT_2026-09-08.md) reste un instantané antérieur aux corrections ci-dessous, et non le nouvel état des fichiers.

## Contenu intégré

| Machine | Texture source | Animation | Collision conservée |
| --- | --- | --- | --- |
| Peace Walker / Basilisk | `peaceWalkerBasilisk` | 2 planches, 32 poses, 8 actions | 176 × 128 |
| Metal Gear ZEKE | `peaceWalkerZeke` | 2 planches, 32 poses, 8 actions | 128 × 144 |
| Chrysalis | `peaceWalkerChrysalis` | 2 planches, 32 poses, 8 actions | 176 × 112 |
| Cocoon | `peaceWalkerCocoon` | 2 planches, 32 poses, 8 actions | 208 × 144 |

Les quatre machines ont chacune leur PNG neutre, leur provenance, leurs planches `core` et `special` et leurs prompts exacts. Les poses sont réellement dessinées par l'outil OpenAI intégré : aucun rig Pillow ou décalage d'une image fixe n'est compté comme nouvelle pose. L'extraction, la suppression du fond, l'échelle uniforme et l'assemblage PNG sont mécaniques et documentés. Les quatre PNG neutres sont extraits de la première pose, avec empreintes de leur source et du résultat.

Le registre des acteurs spéciaux passe de 10 à **14 identités : 28 planches, 448 poses, 112 clips**. Ce total ne représente ni tous les personnages de la franchise, ni 14 personnages supplémentaires : la présente vague en ajoute quatre. Les 72 planches standard restent comptées séparément, car leurs rôles recoupent certains de ces acteurs.

Quatre nouvelles signatures de tir (ZEKE, Basilisk, Chrysalis, Cocoon) apportent **16 phases supplémentaires**. Le registre contient désormais 8 projectiles de boss / 32 phases. Chaque identité a un fichier et une provenance distincts. Les tirs gardent la collision mobile existante : pas de promesse de rayon continu, de guidage missile, d'artillerie balistique complète ni de simulation nucléaire.

Six objets communs remplacent les anciens dessins procéduraux : carte d'accès, caméra, ration, caisse de munitions, grenade chaff et cache de données. Les clés runtime et dimensions de collision restent identiques. Ce sont des adaptations communes au mode Side Ops, **pas des objets canoniques propres à chaque époque**. Leurs formes procédurales ne servent plus qu'en secours d'un chargement d'image défaillant.

La porte et l'ascenseur restent explicitement **différés**, et conservent leur présentation stable procédurale. L'atlas source possède huit cases, mais seuls six objets sont exportés/chargés et comptés comme couverture runtime. Le premier essai laissait 35 pixels invisibles au-dessus de la porte ; trois nouvelles générations, dont une planche dédiée à deux objets, n'ont pas respecté les proportions. Aucun étirement ni changement de collision n'a été utilisé pour contourner le contrôle. Les deux PNG refusés ne sont pas distribués. Sources rejetées, prompts et diagnostics sont conservés sous `G:/CodexBuild/shadowcodecops/asset-staging/common-props-*` et `G:/CodexBuild/shadowcodecops/qa/wave39-common-props-rejected/`.

## Missions et corrections

Quatre simulations MSF 1974 disposent de tracés distincts, cinq secteurs chacune, accès par carte, trois caches de renseignements, ravitaillement et arène ouverte : Basilisk Containment Range, ZEKE Railgun Field Trial, Chrysalis Airspace Intercept et Cocoon Siege Range. Les montées des terrasses sont de 85 pixels ; au moins une cache est obligatoire avant l'extraction. Ces opérations sont des créations de gameplay, pas des reconstitutions historiques de l'histoire officielle.

Les 28 opérations de campagne incluent désormais six opérations Peace Walker. Le parcours existant Pupa → Basilisk → ZEKE est conservé. Chrysalis puis Cocoon forment une branche facultative après Pupa ; les sauvegardes existantes ne perdent donc pas leurs accès.

Chrysalis seul conserve son altitude de mission, sans gravité ni charge au sol. Son vol stationnaire est une adaptation de vue latérale, pas un modèle complet d'hélicoptère. Tous les autres boss conservent leur physique précédente. La correction synchronise l'historique Arcade lors d'un déplacement vertical nécessaire.

Le Mission Builder choisit maintenant les animations à partir de l'identité explicite du héros : Snake sélectionné dans un décor Plant reste Snake et ne reçoit plus les planches de Raiden. Un ennemi non standard n'est pas remplacé par un autre soldat simplement parce qu'il possède le même rôle.

L'overlay Codec passe au-dessus du résultat de mission pour que son bouton ACKNOWLEDGE reste accessible. Les boutons Rejouer / Choisir une opération du résultat restent interactifs ; leurs événements de pointeur ne sont pas désactivés.

## Fidélité et traçabilité

Les références officielles Konami et les vues de produits licenciés ont été consultées avant génération ; URLs et prompts effectivement utilisés sont enregistrés dans les fichiers `<acteur>-prompts.json` sous `scripts/art_sources/special-animations/`. Chrysalis conserve ses trois unités discoïdales, sa nacelle IA et son railgun ventral ; Cocoon conserve ses chenilles multiples, sa plate-forme, sa superstructure et ses armements caractéristiques. Plusieurs premiers essais ont été rejetés pour éléments absents ou poses trop proches des guides.

Les silhouettes restent des adaptations pixel-art originales. Les contours de panneaux, proportions entre planches et détails fins peuvent varier : **aucune fidélité 1:1 garantie**. Les objets communs utilisent notamment les références du manuel officiel MGS1 pour la ration ronde et la carte rectangulaire ; les autres sont des interprétations fonctionnelles originales.

- Acteurs : `src/data/sideopsSpecialActorAnimations.json` et `public/sideops/special-animations/<id>/provenance.json`.
- Projectiles : `src/data/sideopsBossProjectileVisuals.json` et `scripts/art_sources/mecha-projectiles/*manifest.json`.
- Objets : `src/data/sideopsCommonProps.json` et `scripts/art_sources/common-props/provenance.json`.
- Sources et prompts : conservés dans `scripts/art_sources/`, génération OpenAI intégrée uniquement.

## Recette

La recette navigateur instrumentée des quatre opérations réussit **88/88 contrôles**, sans erreur console : huit états par machine, quatre phases de chaque projectile, tirs dans les deux directions, facing, collisions, mort, carte, porte, trois caches, ravitaillement, extraction et récompense unique. Les 16 PNG contrôlés répondent HTTP 200 avec signature PNG. Rapport : `G:/CodexBuild/shadowcodecops/qa/pw-wave39/report-all.json` ; vingt captures de combat et de résultat dans le même dossier.

Cette recette repositionne le joueur et neutralise les gardes annexes afin d'isoler les interactions ; les boss ne sont ni déplacés ni réinitialisés, et leurs PV baissent par de vrais overlaps de projectile. **Ce n'est pas un parcours sans assistance.** Chrysalis est aussi touché par un vrai `shootSocom` depuis une position de tir à hauteur adaptée, avec consommation de munition. Le sol des trois machines terrestres reste à Y512 ; Chrysalis reste à Y374 sans gravité.

Après retrait des deux images de structure refusées, une nouvelle recette Basilisk réussit **27/27 contrôles**, sans erreur : porte Canvas 34×92, ascenseur Canvas 42×68, aucune requête vers leurs PNG, six objets Image préchargés dont les pixels RGBA et les empreintes correspondent aux fichiers source, carte/porte/caches/extraction et 420 XP non dupliqués. Rapport final : `G:/CodexBuild/shadowcodecops/qa/pw-props-final/report-basilisk.json`.

La recette du Builder réussit **6/6 contrôles**, avec déplacement clavier réel de Snake dans Plant et aucune erreur navigateur (`G:/CodexBuild/shadowcodecops/qa/sideops-identity/report.json`). Les importeurs Python et l'exporteur des sprites neutres passent **37 tests**. Les deux nouvelles régressions de migration prouvent la restauration des accès d'une ancienne sauvegarde sans répéter XP, ressources, badges ou événements et sans ouvrir une branche opposée.

`npm run qa` est terminé avec succès : contrôle TypeScript, **672 tests / 98 fichiers**, compilation de production et `pwa:check`. Le service worker précache 1 128 entrées (47 947,74 KiB). Le premier passage global avait isolé une erreur de géométrie : 671 tests réussis / 1 échec sur la porte. Le registre et la provenance distinguent maintenant explicitement les six objets acceptés des deux structures différées ; leurs tests empêchent d'activer silencieusement les images rejetées.

`npm run tauri:build -- --bundles nsis,msi` est terminé avec code 0 après reprise de la compilation inachevée. Les deux paquets Windows 3.9.0 sont construits sur G:, sans remplacer les versions 3.8. Ils n'ont pas été installés ni exécutés dans cette recette.

- [Installateur NSIS](<G:/CodexBuild/shadowcodecops/target/release/bundle/nsis/Shadow Codec Ops_3.9.0_x64-setup.exe>) : 48 299 880 octets ; SHA-256 `942f5dc446aaa92e1fa8c01b2aa62b6a8079b037cb268e55ab8cd881039f9e24`.
- [Installateur MSI](<G:/CodexBuild/shadowcodecops/target/release/bundle/msi/Shadow Codec Ops_3.9.0_x64_en-US.msi>) : 49 090 560 octets ; SHA-256 `3d5a733ea23482bd546c0d76a22d39569ee374dfe22cea3a75e5dbfc4a62e9e9`.

## Reste à produire — la franchise n'est pas terminée

Aucun nouveau portrait Codec n'est ajouté dans cette vague. Les 59 contacts déclarés restent couverts selon l'audit ; cela ne constitue pas un inventaire exhaustif de tous les personnages de Metal Gear.

- MG1 / MGS1 : remplacer les rigs historiques restants par de vraies planches multi-actions ; terminer les effets et projectiles spécifiques encore procéduraux. Decoy Octopus reste un rôle narratif, pas un combat inventé.
- MG2 : corps dédiés de Holly, Gustava, Kio Marv, Madnar ; combats et planches propres à Gray Fox et Big Boss.
- MGS2 : Emma, Stillman, Rose, Otacon en 2D, tenue Pliskin, Fortune, Fatman, Vamp, Solidus et RAY prototype du Tanker.
- MGS3 : EVA, The Boss, Sokolov, Granin, unité Cobra, Volgin et Ocelot de cette époque.
- MGS4 : unité Beauty and the Beast, Vamp, Liquid Ocelot, Raiden et alliés ; Metal Gear Mk. II / III.
- Peace Walker / MGSV : corps des soutiens et alliés manquants, Quiet, Man on Fire, Eli, Walker Gear et D-Walker ; variantes et armements complets des machines restent à traiter.
- Autres épisodes : RAXA, GANDER, EXCELSUS et les épisodes non encore représentés demandent des lots et contrats dédiés.
- Toutes époques : terminer les deux structures communes différées (porte / ascenseur), bibliothèques de props et décors propres à chaque jeu, davantage d'ennemis canoniques, animations d'interaction, attaques secondaires et VFX spécifiques.

Les installateurs locaux ne valent ni déploiement en ligne, ni test d'installation sur Windows. Aucun push ou déploiement n'est inclus dans cette vague sans autorisation correspondante.
