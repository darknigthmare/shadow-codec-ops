# Bible CQC Versus Legacy — guide associé au projet

**Version P62 — 25 novembre 2026.** Le guide général fourni par Darknigthmare est intégré comme référence commune, puis traduit en décisions, fiches et exigences propres au jeu de combat Metal Gear. Cet index relie le contenu existant du dépôt, les nouveaux documents et les sources statiques P60/P61/P62.

## Lire la bible

| Besoin | Document |
|---|---|
| Guide utilisateur conservé intégralement | [Combat_Games_Guide_General_v1.0.txt](sources/Combat_Games_Guide_General_v1.0.txt) |
| Correspondance des 30 rubriques avec CQC | [EXIGENCES.md](EXIGENCES.md) — 90 exigences ; [guide-map.json](guide-map.json) |
| Fonctionnalités réellement observées dans le code | [ETAT_DU_JEU.md](ETAT_DU_JEU.md) ; [runtime-evidence.json](runtime-evidence.json) |
| Règles, movesets et neutralisations | [COMBAT.md](COMBAT.md) ; [combat-pilots.json](combat-pilots.json) |
| Profils du roster compilé | [ROSTER.md](ROSTER.md) ; [roster-coverage.json](roster-coverage.json) |
| Routes, rivaux, campagne et plans narratifs | [NARRATION.md](NARRATION.md) ; [narrative-registry.json](narrative-registry.json) |
| Arènes, quatre axes, connexions et boss | [ARENES_ET_BOSS.md](ARENES_ET_BOSS.md) |
| Sources reliées aux besoins de la bible | [ASSOCIATIONS.md](ASSOCIATIONS.md) ; [asset-associations.json](asset-associations.json) |
| Fiches, phase de production et critères d’admission | [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md) |
| Nouvelles images et vérifications de cette passe | [Bilan et galerie P62](../cqc-reprise/pass62/README.md) |

Le guide source fait **55 172 octets**, SHA-256 `4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7`. Sa copie est identique à la pièce jointe. Les adaptations sont écrites dans les documents CQC, sans modifier cette référence.

## 1. Identité et périmètre retenus

**Promesse :** un vrai jeu de combat latéral permettant de reconnaître l’incarnation Metal Gear par sa silhouette, son équipement, ses décisions de combat et son récit. Le duel, les rencontres de boss et les parcours narratifs partagent des données cohérentes tout en gardant leurs règles propres.

Le runtime CQC autonome, distribué dans `public/cqc`, reste intégré à Shadow Codec Ops par son routeur et son iframe. Le navigateur est la cible inspectée. Les commandes de packaging Tauri du dépôt ne constituent pas une preuve de validation sur chaque plateforme ; APK, consoles et crossplay ne sont pas ajoutés implicitement à ce périmètre.

Les quatre piliers de décision sont :

1. **Incarnation identifiable :** version, période, costume, arme et capacités se répondent.
2. **Duel lisible :** placement, attaque, défense et récupération restent compréhensibles, même avec de grands sprites.
3. **Personnalité et conséquence :** les routes et conclusions expriment les motivations des personnages.
4. **Production vérifiable :** chaque source et fonctionnalité a un statut, un identifiant et une preuve adaptés à son unité.

### Œuvres et éditions

Le registre des circuits existants contient 31 identifiants d’épisode dans `cqc-campaign-routes-v1.js`. La bible conserve cette organisation ; les reprises d’édition et les prototypes gardent leurs réserves de continuité.

| Ensemble | Identifiants de circuit existants |
|---|---|
| Origines | `mg_msx`, `mg_nes`, `mg2`, `snakes_revenge` |
| Shadow Moses et VR | `mgs1`, `twin_snakes`, `vr_missions` |
| Sons of Liberty | `mgs2` |
| Snake Eater et déclinaisons | `mgs3`, `delta`, `mpo`, `mpo_plus` |
| MSF et Diamond Dogs | `pw`, `gz`, `tpp` |
| Guns of the Patriots | `mgs4` |
| Rising | `mgr`, `rising_proto` |
| Continuités parallèles | `ghost_babel`, `acid`, `acid2`, `acid_mobile`, `acid2_mobile` |
| Survie | `survive` |
| Mobile | `mobile`, `touch`, `social_ops` |
| Online et Arcade | `mgo1`, `mgo2`, `mgo3`, `arcade` |

FOX HUNT, les modes Monkey/Bomberman et les comparaisons Master Collection restent suivis dans les inventaires de sources et d’éditions. Leur absence de cette table de circuits n’est ni une exclusion du projet ni une nouvelle preuve d’intégration. Les créations CQC et crossovers restent identifiés comme originaux/alternatifs, avec leurs propres compatibilités.

## 2. Ce qui est repris, ce qui est ajouté

Les [audits détaillés d’octobre](../audit-cqc-2026-10-23/README.md), les données de Chroniques et les contrats de fidélité constituent l’héritage du projet. La bible centrale les associe au guide et les complète ; elle ne réinitialise ni leurs UID ni leurs compteurs historiques.

Cette passe ajoute une matrice de **90 exigences pour 30 rubriques** : **87 retenues et 3 différées**. Une exigence retenue peut encore être manquante dans le jeu. Les éléments différés regroupent les extensions à décider, la production d’animations pendant la phase de sprites fixes et les services réseau. Les modes déjà présents sont conservés.

Les huit pilotes détaillés sont Naked Snake MGS3, The Boss, Solid Snake MGS1, Revolver Ocelot MGS1, Raiden MGS2, Raiden MGR, Sniper Wolf et Venom Snake. Leurs **80 emplacements d’action compilés** sont reliés aux routes narratives et à huit propositions de neutralisation. Les paramètres de base restent distincts des adaptateurs exécutés ensuite et des valeurs des jeux d’origine.

La campagne commune **« La ligne effacée »** est une proposition de récit CQC distincte des histoires individuelles et des tours de duels existants. Le dispositif d’archives reste annoncé comme fiction du projet. Il permet de relier les enjeux des périodes sans présenter un dialogue anachronique comme une scène officielle.

Le registre narratif enrichit **8 parcours et 64 rencontres**, puis décrit les **10 chapitres** de cette campagne. Il prépare **36 séquences et 108 plans distincts** : 72 pour les parcours, 36 pour la campagne. Ces plans sont écrits, avec **0 nouvelle image narrative générée**. Les 24 sources P60/P61 utilisées comme références sont reliées réciproquement aux fiches ; une référence de lieu ou de costume ne remplace pas le cadrage d’un nouveau plan.

## 3. Décisions de modes et ordre de travail

| Niveau | Décision CQC | Critère de sortie |
|---|---|---|
| P0 — fondations | Conserver et vérifier versus local/CPU, défense, ressources, Dojo/Academy, choix des versions, résultat, sauvegarde et accessibilité de base. | Un parcours complet testé sur les profils et dispositifs annoncés ; aucune simple présence de bouton comptée comme validation. |
| P1 — cible commune | Approfondir histoires individuelles, campagne globale, Arsenal/Boss Rush, neutralisations, arènes vivantes/statiques et liaisons documentées. | Fiches et assets associés, puis tests de chaque mode, scène, phase et transition intégrés. |
| P2 — extensions | Décider séparément tag, coopération, exploration/hub, classement et crossplay ; conserver les extensions locales déjà accessibles. | Périmètre, coût de production, architecture et tests explicitement validés pour chaque extension. |

L’ordre courant est : documenter et rapprocher l’existant ; compléter les sprites de base manquants ou partiels ; revoir leurs références ; préparer les bindings ; intégrer un ensemble cohérent ; tester son parcours. Les animations restent prévues par état et action, avec leur production différée pendant cette phase.

Le passage à une campagne ou à un mode en ligne ne sera pas obtenu par simple renommage d’un circuit ou d’un historique de résultats. Les dépendances de simulation, sauvegarde et réseau sont identifiées dès la conception.

## 4. Arènes : quatre axes séparés

Chaque fiche distingue **présentation**, **interactions**, **dangers** et **transitions**. Une version statique peut conserver des interactions ; un fond animé peut rester neutre pour le gameplay. Les profils de confort changent la présentation, tandis que les règles de danger et de connexion sont partagées entre les participants.

L’audit observe une présentation animée/réduite/statique dans le code. Les interactions de décor et les transitions entre zones jouables ne sont pas établies par les fichiers inspectés. Les effets de boss Arsenal constituent des mécanismes propres aux rencontres, sans valider un système général de dangers de stage versus. Les fiches d’arènes et de boss exposent les tâches nécessaires pour compléter ces axes.

Les nouvelles vues P62 complètent Crescent Meridian, Cove Valley Village, Zaozyorje East, l’intérieur du WIG et Ruins Upper. Elles améliorent **quatre périmètres historiques partiels**. Les secteurs qui restent absents, les proportions recomposées en vue latérale et les détails insuffisamment lisibles demeurent consignés dans les manifests.

## 5. Compteurs et unités

| Périmètre nommé | Quantité et interprétation |
|---|---|
| Guide associé | 30 rubriques, 90 exigences documentées ; ce compte mesure la conception. |
| Base `FIGHTERS` inspectée | 354 profils, 3 540 emplacements d’action avant installateurs et adaptateurs. |
| Pilotes P62 | 8 enrichissements combat/narration, sur des personnages déjà présents ; aucun nouveau combattant admis. |
| Sources sélectionnées P60/P61/P62 | **177 PNG : 40 P60 + 132 P61 + 5 P62**. |
| Répartition des 177 sources | **107 stages, 17 personnages, 7 costumes, 45 machines et 1 VFX**. |
| Essais archivés | **9**, exclus des sources sélectionnées : 2 P60, 6 P61, 1 P62. |
| Inventaire historique P61 | **277 lignes**, dont **97 sans correspondance démontrée** ; plusieurs lignes sont des groupes à détailler. |
| Périmètres auxiliaires | 2 costumes P60 déjà produits, conservés hors du dénominateur des 277 lacunes. |
| Garde-robe historique | 3 399 lignes / 384 incarnations dans l’audit P61 ; unité distincte des profils compilés. |
| Admission par cette passe | **0 nouvelle admission runtime, 0 nouvelle certification 1:1**. |

Les fiches narratives publient leur propre compte de routes, scènes et plans. Un plan écrit n’est pas une image produite. Les associations JSON permettent de suivre un fichier vers ses périmètres, les rubriques du guide et les documents de conception sans additionner ces unités.

### Manques conservés

Les 97 lignes historiques ouvertes se répartissent en **69 personnages/groupes/profils d’identité, 13 costumes/concepts, 8 groupes de stages, 4 machines et 3 corps de projectiles**. P62 complète des portions déjà dotées d’une source candidate ; ces cinq images ne réduisent donc pas mécaniquement ce nombre de 97.

Les corps BOX-T (SMK), BOX-T (STN) et le projectile du Mortar de Survive restent distincts du VFX fumée. Les refus antérieurs et les ambiguïtés d’identité ne sont pas réessayés sous un autre nom. Le détail nominatif reste dans l’[inventaire P61](../cqc-reprise/pass61/INVENTAIRE.md), complété par les associations P62.

## 6. Références auditées et publication

| Référence | Commit | Rôle |
|---|---|---|
| `main` inspecté | `02cce7c56c97d0c0008b1dfe805c7d003c9f63e1` | Comparaison avec la branche principale. |
| Base réelle de PR25 | `67b61f0b536b34921b3d604631409e2b9d384ce4` | Socle de `codex/cqc-p51-remaining-costumes-20261113`. |
| Livraison P61 inspectée | `5c2cbed73f15c4583f5ffd2cee0c2344180b5d68` | Sources et documentation déjà publiées avant P62. |

Le runtime de cette base et celui du head P61 sont identiques pour les scripts, modules, données, métadonnées, menu et manifeste runtime inspectés. Les différences de gameplay entre main et cette branche sont **héritées du socle**, et ne sont pas des fonctionnalités introduites par les PNG P60/P61. P62 ajoute la bible et les sources fixes décrites ici.

Publication suivie dans la [PR #25](https://github.com/darknigthmare/shadow-codec-ops/pull/25). La présence en PR reste distincte de la fusion, du déploiement et de l’admission au combat.

## 7. Maintenance et prochaine admission

Pour ajouter une source, compléter son lot, ses références et son `workId`, puis reconstruire les associations avec `python3 docs/cqc-bible/build_registry.py --verify-images` dans un Python disposant de Pillow. Exécuter `node scripts/check-cqc-bible.mjs` pour vérifier la cohérence documentaire. L’étape d’intégration doit ensuite mettre à jour le binding réel, les modes concernés et les preuves de validation fonctionnelle.

Les dix types de fiches et les scénarios de validation sont centralisés dans [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md). Les incertitudes sont conservées jusqu’à obtention d’une référence ou d’un test suffisant ; les comptes de production continuent d’être calculés depuis les fichiers sélectionnés.
