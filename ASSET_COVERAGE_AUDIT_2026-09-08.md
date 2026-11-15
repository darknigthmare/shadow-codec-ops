# Audit de couverture Metal Gear — 8 septembre 2026

## Conclusion

**Non : tous les héros, boss, ennemis et props de Metal Gear ne sont pas terminés.**

Le roster Codec actuellement déclaré a ses portraits physiques. Les principaux protagonistes des douze packs 2D ont une représentation. Mais les personnages secondaires, les boss des épisodes après MGS1, les variantes d'ennemis et les bibliothèques de props restent partiels. La vague ZEKE/Peace Walker est interrompue en cours d'intégration.

Périmètre vérifié : projet local `C:\Users\chuck\OneDrive\Documents\Codex MGS`, branche `codex/add-missing-character-art`, dernier commit `efea8a3`. Le numéro local 3.9.0 est déjà inscrit, mais ses modifications ne sont pas commitées. Aucun asset ni code de jeu modifié pendant cet audit ; seul ce bilan est ajouté. Aucun commit, déploiement ni nouvelle génération. L'état publié distant n'a pas été réaudité.

Les nombres ci-dessous mesurent les registres et fichiers du projet, **pas un pourcentage de complétion de la franchise**. Il n'existe pas ici de catalogue exhaustif de référence couvrant chaque tenue, arme, ennemi, objet et décor de tous les jeux. Une présence sur disque ne garantit ni une utilisation en jeu, ni des animations complètes, ni une fidélité 1:1.

## 1. Validation réellement exécutée

| Vérification | Résultat |
| --- | --- |
| TypeScript, `npm run lint` | PASS |
| Suite complète, `npm test` | **618/619 tests passent**, 93/94 fichiers |
| Échec TypeScript/Vitest | `peaceWalkerSideOpsAssetRegistry.test.ts:86` : fichier `peace-walker.png` absent |
| Importeurs/exporteur Python, depuis `scripts` | **26/27 tests passent** |
| Échec Python | Liste exacte des acteurs dans `test_importSideOpsSpecialActorBoards.py:26` non actualisée pour ZEKE/Basilisk |
| Codec déclaré | Tous les portraits locaux et leur routage neutre passent |
| Planches standard | 72 fichiers présents ; test des poses, pixels et provenance réussi |
| Planches spéciales | 24 fichiers, 12 acteurs, 384 poses ; test des pixels et provenance réussi |
| Projectiles spéciaux | 6 sorties, 24 phases ; hashes sources/sorties conformes |
| VR environnement/gameplay | 116 entrées physiques sans fichier manquant |

La première invocation Python depuis la racine a échoué sur le chemin d'import des modules. La commande relancée depuis `scripts` donne le résultat 26/27 ci-dessus : ne pas compter ces premières erreurs d'invocation comme des défauts de contenu.

Pas de nouvelle recette navigateur des combats ni de build/installateur 3.9 pendant cet audit. Les preuves 3.8 restent historiques, dans `ASSET_WAVE_2026-09-05.md`, et ne valident pas automatiquement les changements 3.9.

## 2. Codec et héros

### Portraits physiques

| Jeu / époque | Contacts déclarés | Identités joueur distinctes | WebP |
| --- | ---: | ---: | ---: |
| MG1 | 4 | 1 | 30 |
| MG2 | 5 | 1 | 36 |
| MGS1 | 10 | 1 | 108 |
| MGS2 | 7 | 2 | 55 |
| MGS3 | 6 canaux / 5 personnages | 1 | 39 |
| MGS4 | 7 | 1 | 48 |
| Peace Walker | 9 | 1 | 60 |
| MGSV GZ + TPP | 9 : 2 GZ + 7 TPP | 2 | 66 |
| VR | 1 | 1 | 12 |
| Patriots AI | 1 | 1 | 12 |
| **Total** | **59 contacts** | **12 identités** | **466** |

Les 15 IDs joueur des contextes deviennent 12 identités après résolution des alias. Para-Medic possède normalement deux fonctions de contact, médicale et sauvegarde. Les 108 fichiers MGS1 comprennent 42 expressions de variantes narratives.

Les 466 WebP ont les signatures attendues. Aucun doublon binaire parmi les 77 images `neutral.webp`. Cela contrôle l'existence et les identités techniques, pas la ressemblance exacte de tous les visages. Morpho reste une interprétation anonyme en équipement de vol, sans visage canonique certifié.

`AnimatedCodecPortrait.tsx` présente une image d'expression avec effets CSS : **ce n'est pas une animation faciale complète avec synchronisation labiale**.

### Protagonistes 2D représentés

- MG1, MG2, MGS1 et MGS2 Tanker : variantes de Solid Snake.
- MGS2 Plant : Raiden.
- MGS3 : Naked Snake.
- MGS4 : Old Snake.
- Peace Walker : Big Boss 1974.
- Ground Zeroes : Big Boss 1975.
- The Phantom Pain : Venom Snake 1984.
- VR et Patriots AI : opérateur VR et variante Raiden corrompue, explicitement simulations.

Il y a dix sprites fixes de héros associés aux jeux, plus les deux représentations de simulation. Les **72 planches standard** correspondent à **12 packs × 3 rôles (joueur/garde/renfort) × 2 planches**, pas à 72 personnages différents. Elles contiennent 1 152 cellules, huit états par rôle : idle, move, crouch, jump, attack, melee, hit, death.

### Personnages encore absents ou incomplets en 2D

| Époque | Manques constatés |
| --- | --- |
| MG2 | Holly : portrait seulement. Gustava et Kio Marv : pas de portrait déclaré ni de sprite dédié. Pas de version MG2 de Madnar. |
| MGS2 | Emma, Stillman, Rose et Otacon MGS2 : portraits sans corps 2D dédiés. Pliskin utilise Snake Tanker, sans tenue distincte. |
| MGS3 | EVA et The Boss : portraits sans corps 2D dédiés. Sokolov et Granin absents du roster visuel. |
| MGS4 | Raiden cyborg, Meryl, Drebin et Otacon : portraits sans corps 2D dédiés. Sunny, Mei Ling MGS4, Big Mama, Johnny/Akiba, Jonathan et Ed absents du roster visuel propre à cette époque. |
| Peace Walker | Miller, Paz, Amanda, Chico, Huey, Cécile et Strangelove : portraits, pas de PNJ corporels dédiés. |
| MGSV | Quiet, Miller, Ocelot, Huey et Code Talker : portraits sans corps 2D dédiés. Eli absent des portraits déclarés et des sprites. |

Les PNJ physiques sont principalement concentrés dans MG1 (prisonnier, Grey Fox, Pettrovich, Elen, Schneider, Diane, Jennifer : **7**) et MGS1 (Otacon, Meryl, Kenneth Baker, Donald Anderson, Johnny : **5**).

Références canoniques utilisées pour distinguer ces omissions d'un simple souhait d'extension : [personnages MG2, Konami](https://www.konami.com/mg/archive/mg2/chara.html), [histoire MGS3, Konami](https://eu-support.konami.com/hc/fr/articles/9731056113303-Histoire-Quelle-est-l-histoire-de-Metal-Gear-Solid-3-Snake-Eater), [personnages MGS4, Konami](https://www.konami.com/mg/history/jp/ja/mgs4), [personnages TPP, Konami](https://www.konami.com/mg/mgs5/tpp/jp/story/).

## 3. Boss, ennemis et machines

Hors VR : **63 entrées déclarées, 61 PNG statiques présents** : 29 ennemis, 22 boss et 10 véhicules/machines. Les deux fichiers manquants sont les bases statiques ZEKE/Basilisk.

| Époque | Ennemis présents | Boss / machines présents | Couverture manquante ou limitée |
| --- | --- | --- | --- |
| MG1 | Soldat, Air Trooper, chien, scorpion, caméra armée | Shotmaker, Machinegun Kid, Fire Trooper, Bloody Brad, Dirty Duck, Big Boss ; Hind D, char, bulldozer, camion, TX-55 | Identités du parcours déclaré couvertes ; nombreuses animations historiques encore dérivées d'images fixes. |
| MG2 | Soldat Zanzibar, renfort élite | Metal Gear D | Gray Fox, Big Boss MG2, Madnar en rencontre 2D ; roster des mercenaires incomplet. |
| MGS1 | Quatre classes Genome, chien-loup, caméra | Ocelot, Decoy Octopus, Ninja, Mantis, Wolf, Raven, Liquid ; M1, Hind D, REX, jeep, motoneige | Principales identités présentes ; plusieurs boss n'ont pas les nouvelles poses dessinées indépendamment. |
| MGS2 Tanker | Gurlukovich standard/lourd | Olga | Pas de RAY prototype Tanker distinct du RAY autonome Plant. |
| MGS2 Plant | Gurlukovich, Tengu | RAY autonome | Fortune, Fatman, Vamp, Solidus. |
| MGS3 | Ocelot Unit, GRU lourd | Shagohod | The Boss, unité Cobra, Volgin, Ocelot MGS3. |
| MGS4 | PMC standard/lourd | Gekko | Laughing Octopus, Raging Raven, Crying Wolf, Screaming Mantis, Vamp, Liquid Ocelot ; Mk. II absent. |
| Peace Walker | Peace Sentinel standard/lourd | Pupa | Chrysalis, Cocoon ; ZEKE et Basilisk à finaliser. |
| Ground Zeroes | XOF standard/lourd | STOUT IFV-SC | Seulement ces identités, pas un catalogue exhaustif des véhicules/unités. |
| Phantom Pain | Soldat soviétique, renfort Skull | Sahelanthropus | Quiet, Man on Fire, Walker Gear et D-Walker sans assets corporels dédiés. |
| Patriots AI | Arsenal corrompu, Tengu corrompu | GW Colonel AI Core | Simulation originale, pas une époque canonique supplémentaire. |

MG1 a **10 rencontres dédiées**, dont deux Bloody Brad et le sabotage immobile de TX-55. MGS1 a **9 combats dédiés** ; Decoy Octopus est une révélation narrative, pas un dixième combat. Camion, jeep et motoneige visibles ne constituent pas à eux seuls un système de conduite jouable.

Les autres packs utilisent des opérations et tactiques SideOps : leurs cycles sont des adaptations de jeu 2D, **pas des reproductions intégrales des combats et movesets canoniques**.

Les omissions sont corroborées par [Konami MG2](https://www.konami.com/mg/history/jp/ja/mg2), [Konami MGS2](https://www.konami.com/mg/history/jp/ja/mgs2), [manuel officiel MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html), [Konami MGS4](https://www.konami.com/mg/history/jp/ja/mgs4) et [catalogue officiel des machines Peace Walker](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html).

### Statut exact de ZEKE / Basilisk

Déjà présents : deux missions distinctes, progression Pupa → Basilisk → ZEKE, sélection de tactique par identité, quatre planches de 16 poses, provenance, deux projectiles de quatre phases. Les tests de campagne et de migration des déblocages passent.

Manquent encore :

1. `public/sideops/peace_walker/bosses/metal-gear-zeke.png` — attendu 128×144.
2. `public/sideops/peace_walker/bosses/peace-walker.png` — attendu 176×128.
3. Calibration `idleBounds` Basilisk non inscrite : mesure réelle `x65, y105, width148, height132`.
4. Actualisation du test Python qui attend encore les dix anciens acteurs.
5. Recette complète de la vague 3.9, puis compilation et livraison.

L'exporteur `scripts/exportSideOpsSpecialActorIdle.py` existe et ses tests passent, mais ses fichiers finaux n'ont pas encore été exportés. La présence d'un fallback au préchargement ne remplace pas ces assets attendus.

## 4. Animations et provenance

- **24 planches spéciales / 12 acteurs / 384 poses / 96 clips déclarés** : Ocelot, Otacon, REX, Sahelanthropus, RAY, D, Shagohod, Pupa, Olga, Gekko, ZEKE et Basilisk. Les deux derniers sont encore en intégration.
- Les deux registres historiques MG1 et MGS1 ont chacun 24 feuilles. Leurs générateurs découpent et transforment les images fixes ; cela ne vaut pas des phases OpenAI indépendamment dessinées.
- TX-55, Ninja, Mantis, Wolf, Raven, Liquid, chars et Hind D conservent donc un niveau d'animation différent du nouveau contrat spécial. STOUT et GW Core n'ont pas ce contrat spécial.
- Les figures VR Snake déguisé et Mystery Soldier restent statiques.
- Les anciens packs de projectiles/VFX MG1 et MGS1 sont dessinés de manière déterministe par scripts Pillow. **Ils ne doivent pas être présentés comme tous générés par OpenAI.**
- Les six nouveaux projectiles de boss disposent en revanche de **24 phases OpenAI réelles**, avec SHA-256 sources/sorties conformes. Leurs trajectoires restent balistiques : pas de simulation complète de rayon continu, fluide ou zone électrique persistante.
- Aucun contrôle technique de cet audit ne certifie une fidélité visuelle 1:1 pour tout le contenu.

Preuves : `scripts/generate_mg1_actor_animations.py:1`, `scripts/generate_mgs1_actor_animations.py:1`, `scripts/generate_mg1_projectiles_vfx.py:1`, `scripts/generate_mgs1_projectiles_vfx.py:1`, registres `sideOpsActorAnimationRegistry.ts` et `sideOpsSpecialActorAnimationRegistry.ts`.

## 5. Props, textures, décors et effets

Les nombres « props propres » ci-dessous sont les entrées prop des registres par époque, **pas un décompte de tous les objets dessinés dans les panoramas, atlases ou scènes**.

| Pack | Props propres au registre | Projectiles | VFX | Décors |
| --- | ---: | --- | ---: | --- |
| MG1 | 1 | 12 | 9 | 1 panorama + 4 intérieurs |
| MGS1 | 1 | 20 | 18 | 1 panorama + 8 intérieurs |
| MG2 | 1 | 1 + 1 spécial boss | 1 | 1 panorama |
| MGS2 Tanker | 1 | 1 | 1 | 1 panorama |
| MGS2 Plant | 1 | 1 + 1 spécial boss | 1 | 1 panorama |
| MGS3 | 1 | 1 | 1 | 1 panorama |
| MGS4 | 1 | 1 | 1 | 1 panorama |
| Peace Walker | 1 | 1 + 3 spéciaux boss | 1 | 2 panoramas |
| MGSV GZ | 1 | 1 | 1 | 1 panorama |
| MGSV TPP | 1 | 1 + 1 spécial boss | 1 | 1 panorama |
| Patriots AI | 1 | 1 | 1 | 1 panorama |

Chaque pack, VR compris, possède aussi deux textures terrain : sol et structure. MG2/MGS3/PW/TPP réutilisent la caisse MG1 ; Tanker/Plant/GZ réutilisent le conteneur MGS1. Voir `src/game/core/sideOpsTerrainRegistry.ts:31`.

Portes, ascenseur, caméra, cartes, rations, munitions, chaff et secrets emploient encore des textures génériques dessinées au chargement. Voir `src/game/scenes/PreloadScene.ts:375` et les objets correspondants de `SideOpsScene.ts`.

VR MGS1 possède un ensemble plus développé : **48 assets environnement** (8 tiles, 12 props, 12 structures, 8 cibles, 8 dangers), plus **68 assets gameplay** (4 acteurs animés, 5 figures statiques, 8 armes, 8 projectiles, 27 props spéciaux, 16 VFX). Les 116 fichiers existent.

Contrôle physique des registres inspectés : 291 références explicites, dont 277 PNG présents aux dimensions attendues, 12 WebP présents et les deux PNG manquants ZEKE/Basilisk ; 24 PNG terrain supplémentaires vérifiés. Ce périmètre ne représente pas tous les fichiers publics du projet.

## 6. Limites de périmètre et de routage

Portable Ops, Ghost Babel, AC!D et Revengeance ne sont pas des packs jouables déclarés dans le contrat actuel. On ne peut donc pas annoncer « tous les Metal Gear » sur la base des douze packs. RAXA et les machines d'autres épisodes ne sont pas couverts par cet inventaire local. [Konami, histoire de Portable Ops](https://eu-support.konami.com/hc/fr/articles/9822256083863-Lore-Quelle-est-l-histoire-de-Metal-Gear-Solid-Portable-Ops).

Risque d'identité détecté par analyse statique, **pas reproduit en navigateur dans cet audit** : le Builder peut sélectionner une identité différente du protagoniste du pack. Le résolveur conserve son sprite fixe, puis `SideOpsScene.ts:681` donne priorité aux animations pack+rôle. Exemple : pack Plant et Solid Snake MGS2 risquent d'afficher les poses Raiden. Les missions standard cohérentes ne sont pas concernées par cet exemple.

## 7. Ordre de reprise recommandé

1. Terminer ZEKE/Basilisk : deux PNG statiques, calibration Basilisk, test de roster, vérification en jeu et build.
2. Remplacer les animations historiques des boss/PNJ MG1/MGS1 qui n'ont pas de poses indépendantes, en conservant leurs comportements canoniques.
3. Combler les grandes lacunes : MG2, Dead Cell/Solidus, MGS3/Cobra/Volgin/The Boss, MGS4/B&B, Chrysalis/Cocoon, Quiet/Man on Fire/Walker Gear.
4. Ajouter les corps 2D des personnages de soutien selon leur présence réelle dans les niveaux ; ne pas inventer de contact Codec pour les machines.
5. Remplacer les props procéduraux et enrichir les bibliothèques propres à chaque époque.
6. Définir un roster exhaustif par jeu, séparant canon, variantes et simulations, avant toute annonce de « 100 % ».

Chaque entrée doit être suivie séparément : référence canonique → source/provenance → portrait si pertinent → sprite/poses → chargement → usage gameplay → tests → recette visuelle. Rien de cette liste n'a été marqué terminé sans vérification.
