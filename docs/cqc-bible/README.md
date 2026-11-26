# Bible CQC Versus Legacy — guide associé au projet

**Version P64 — 26 novembre 2026. Fondation documentaire P62 et extension P63 conservées.** Le guide général fourni par Darknigthmare est intégré comme référence commune, puis traduit en décisions, fiches et exigences propres au jeu de combat Metal Gear. Cet index relie le contenu existant du dépôt et les sources statiques P60/P61/P62/P63/P64.

La [continuation P64](CONTINUATION_P64.md) ajoute **11 sources individuelles transparentes** : 3 personnages AC!D, 2 costumes de démonstration Survive, 1 machine Survive, 3 accessoires et 2 corps de projectiles MGR. Le total passe à **205 sources sélectionnées** et l’Atlas à **28 entrées**. Les 194 identités historiques et les 17 objets P63 restent inchangés. Les [associations P64](asset-associations-p64.json) et la [galerie P64](../cqc-reprise/pass64/README.md) détaillent provenance, limites et refus. **0 nouvelle admission au combat, 0 certification 1:1, aucun PNG natif UHD et aucun périmètre déclaré clos.**

**Historique P63 conservé.** La [continuation P63](CONTINUATION_P63.md) ajoute **17 décors individuels** pour Survive, AC!D, AC!D 2 et Revengeance, portant le total à **194 sources sélectionnées**. Ils sont consultables dans l’**Atlas des sources**, accessible depuis Chroniques/Extras et par `/cqc/?module=atlas63`. Les [associations P63](asset-associations-p63.json) complètent le registre historique ; les trois essais écartés restent hors de l’Atlas. **0 nouvelle admission au combat, 0 certification absolue 1:1.**

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
| Livraison courante : 11 sources et extension Atlas P64 | [CONTINUATION_P64.md](CONTINUATION_P64.md) ; [galerie et bilan P64](../cqc-reprise/pass64/README.md) |
| Registre des nouvelles associations P64 | [asset-associations-p64.json](asset-associations-p64.json) |
| Preuves et contrôles P64 | [INTEGRATION_QA.md](../cqc-reprise/pass64/INTEGRATION_QA.md) |
| Historique : 17 sources et Atlas P63 | [CONTINUATION_P63.md](CONTINUATION_P63.md) ; [galerie et bilan P63](../cqc-reprise/pass63/README.md) |
| Registre des nouvelles associations P63 | [asset-associations-p63.json](asset-associations-p63.json) |
| Historique : cinq décors P62 | [Bilan et galerie P62](../cqc-reprise/pass62/README.md) |

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

La fondation P62 ajoute une matrice de **90 exigences pour 30 rubriques** : **87 retenues et 3 différées**. Une exigence retenue peut encore être manquante dans le jeu. Les éléments différés regroupent les extensions à décider, la production d’animations pendant la phase de sprites fixes et les services réseau. Les modes déjà présents sont conservés.

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
| Sources sélectionnées P63 | **17 décors : 3 AC!D, 3 AC!D 2, 7 Revengeance, 4 Survive**. |
| Total P60/P61/P62/P63 | **194 PNG : 124 décors, 17 personnages, 7 costumes, 45 machines et 1 VFX**. |
| Essais archivés P60/P61/P62/P63 | **12**, exclus des sources sélectionnées : 2 P60, 6 P61, 1 P62, 3 P63. |
| Inventaire historique P61 | **277 lignes**, dont **97 sans correspondance démontrée** ; plusieurs lignes sont des groupes à détailler. |
| Périmètres auxiliaires | 2 costumes P60 déjà produits, conservés hors du dénominateur des 277 lacunes. |
| Garde-robe historique | 3 399 lignes / 384 incarnations dans l’audit P61 ; unité distincte des profils compilés. |
| Consultation ajoutée par P63 | **17 sources dans l’Atlas**, reliées au menu et au manifeste runtime. |
| Admission au combat des sources P63 | **0 nouvelle arène admise, 0 nouvelle certification 1:1**. |
| Sources sélectionnées P64 | **11 PNG : 3 personnages, 2 costumes, 1 machine, 3 accessoires et 2 corps de projectiles**. |
| Total P60/P61/P62/P63/P64 | **205 PNG : 124 décors, 20 personnages, 9 costumes, 46 machines, 3 accessoires, 2 projectiles et 1 VFX**. |
| Atlas après ajout P64 | **28 sources** : les 17 objets P63 conservés et 11 objets P64. |
| Essais uniques écartés P64 et cumul | **2 P64 ; 14 cumulés**. La copie redondante Leone v1 supprimée ne compte pas comme essai. |
| Appels P64 | **16 : 13 sorties PNG et 3 refus sans fichier**, sans seconde tentative des cibles refusées. |
| Admission et fidélité P64 | **0 admission au combat, 0 certification 1:1, 0 clôture de périmètre** ; fidélité externe en revue. |

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

Pour le socle P62, `python3 docs/cqc-bible/build_registry.py --verify-images` et `node scripts/check-cqc-bible.mjs` conservent leur périmètre historique de 177 sources. **P63 est une extension additive** : son manifeste, ses prompts, ses associations et son catalogue sont dans les liens ci-dessus. `node scripts/check-cqc-p63.mjs` contrôle les nouveaux PNG et leurs associations ; `node scripts/test-cqc-p63-source-atlas.mjs` contrôle le module. Les commandes disponibles et celles effectivement exécutées sont distinguées dans le [rapport P63](../cqc-reprise/pass63/verification.json). Toute admission au combat doit ensuite compléter les plans, bindings, interactions et preuves de validation fonctionnelle.

Les dix types de fiches et les scénarios de validation sont centralisés dans [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md). Les incertitudes sont conservées jusqu’à obtention d’une référence ou d’un test suffisant ; les comptes de production continuent d’être calculés depuis les fichiers sélectionnés.


## 8. Continuation P64 et preuves bornées

P64 poursuit la phase de sources fixes. Les deux costumes de Captain proviennent de la démonstration TGS2017 et restent reliés à `archive__captain` ; ils ne définissent pas un visage canonique ni toutes les combinaisons du jeu final. Le faux Flemming reste distinct du personnage réel ; les deux gardes représentent des tenues précises, avec des défauts de contour documentés. Le Digger et les objets MGR restent séparés de leurs effets et comportements.

Les trois demandes `mgr-fragmentation-grenade`, `mgr-em-grenade` et `mgr-rocket-launcher` ont reçu un refus imagegen sans fichier et sans nouvelle tentative. Aucun nouveau décor AC!D 2 n’a été produit faute de captures exactes ; la fiche des huit secteurs conserve les pistes de recherche. Les sources, archives uniques, refus et périmètres ouverts sont détaillés dans la [galerie P64](../cqc-reprise/pass64/README.md).

Les **23 tests Node sur 23 sont passés** : 14 tests du module Atlas et 9 tests du helper et du contrat P64, avec la [sortie finale conservée](../cqc-reprise/pass64/p64-node-tests.txt). Le [checker final P64 et le manifeste runtime sont passés](../cqc-reprise/pass64/p64-local-verification.json) : 13 PNG contrôlés, dont 11 retenus et 2 archives, 28 entrées Atlas et 205 sources cumulées. Le scanner réel vérifie 3 041 fichiers et 4 977 références ; 3 029 lignes historiques sont inchangées, le catalogue est le seul ancien fichier modifié, et les 4 966 références historiques, 740 omissions et 499 routes externes sont préservées.

Le socle P63 a désormais été réellement revérifié par Node, reconstruction PNG/IDAT et inspection navigateur, avec ses nouvelles preuves sous [pass64](../cqc-reprise/pass64/INTEGRATION_QA.md). Le **parcours navigateur P64 reste en attente du déploiement P64** ; il est distinct du résultat déjà obtenu sur P63. Les contrôles de fichiers et de graphe ne valent pas validation de combat ou certification visuelle absolue.
