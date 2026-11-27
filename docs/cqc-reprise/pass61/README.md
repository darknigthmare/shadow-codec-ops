# P61 — sources manquantes, production et inventaire complet

**132 nouvelles images sélectionnées ont été produites : 84 décors, 17 personnages, 5 costumes, 25 machines et 1 effet de fumée.** Elles rejoignent les **40 sources sélectionnées P60** conservées dans cette PR, soit **172 sources statiques sélectionnées**.

**La fidélité 1:1 n’est certifiée pour aucune de ces images.** Les identités, silhouettes, couleurs et éléments visibles ont été rapprochés des références documentées. Les cadrages de combat latéral, les volumes cachés et les détails peu résolus restent des adaptations à examiner. Une source produite ne clôt pas automatiquement tous les lieux ou variantes regroupés sous un même identifiant.

Date du rapprochement : **25 novembre 2026**. Dépôt : `darknigthmare/shadow-codec-ops`. [PR #25](https://github.com/darknigthmare/shadow-codec-ops/pull/25).

## Consulter les résultats

- **[Galerie des 172 sources sélectionnées](GALERIE.md)** : une image par source, classement par catégorie et épisode.
- **[Galerie HTML avec filtres et recherche](galerie.html)** : à ouvrir dans un checkout complet ; les liens GitHub restent disponibles pour chaque fichier.
- **[Inventaire intégral des 277 lignes auditées](INVENTAIRE.md)** : source antérieure, nouveau candidat, portée partielle ou motif du manque.
- **[Manifeste de livraison](delivery-manifest.json)** : chemins, références, dimensions, SHA-256, SHA Git et remarques de contrôle pour chaque source.
- **[Inventaire structuré](inventory.json)** : rapprochement des périmètres historiques et des sources candidates.
- **[Qualification détaillée des personnages](audit/roster-qualification.md)** et **[revue des corps de projectiles](batches/projectiles-reference-review.json)**.

Les PNG P61 sélectionnés se trouvent dans `public/cqc/assets/p61/`. Chaque PNG représente un seul décor, sujet ou effet. Les prompts et preuves propres à chaque fichier sont conservés dans les manifests sous `batches/`. Les références tierces sont citées par leurs URL ; elles ne sont pas republiées comme assets du projet.

## Comptage des fichiers

| Catégorie | Nouveaux P61 | P60 conservés | Sélectionnés dans la PR |
|---|---:|---:|---:|
| Décors statiques | 84 | 18 | 102 |
| Personnages | 17 | 0 | 17 |
| Costumes | 5 | 2 | 7 |
| Machines, véhicules et créatures | 25 | 20 | 45 |
| Effets visuels | 1 | 0 | 1 |
| **Total** | **132** | **40** | **172** |

Huit essais remplacés sont archivés séparément, dont six P61 et deux P60. Ils sont exclus des 172 images sélectionnées et de la galerie. Les versions finales corrigées sont celles pointées par le manifeste de livraison.

## Décors P61

| Épisode / mode | Nombre | Sources produites |
|---|---:|---|
| MGS1 | 6 | Cargo Dock ; Blast Furnace ; Cargo Elevator ; premier duel Sniper Wolf ; fuite en jeep ; grotte des loups. |
| MGS2 | 2 | Shell 1 — otages ; Arsenal Gear — Stomach. |
| MGS3 | 4 | Bolshaya Past Base ; Svyatogornyj East ; Lazorevo ; Zaozyorje West. |
| Portable Ops | 6 | Silo Entrance / Null I ; Airport cargo ; Rail Bridge ; Guest House extérieur ; Hospital ; Research Lab. |
| MGS4 | 9 | Militia Safe House ; Millennium Park ; Power Station ; Marketplace ; Nomad ; Ship Bow ; couloir micro-ondes ; GW Server ; hangar REX 2014. |
| Peace Walker | 2 | Playa del Alba ; approche du hangar Peace Walker. |
| Ground Zeroes | 2 | Camp Omega de jour ; attaque de Mother Base 1975. |
| The Phantom Pain | 6 | Wialo ; Ngumba ; FOB ; Lamar ; quarantaine ; route forestière de la mission 00. |
| Rising | 5 | Égouts de Guadalajara ; atelier du laboratoire ; bureaux World Marshal ; hangar de la base pakistanaise ; héliport Sam / Armstrong. |
| AC!D | 2 | Ruins Lower 3A ; chambre de KODOQUE. |
| AC!D2 | 4 | Un étage du prototype KODOQUE ; salles Harab Serap, Golab et Chaigidiel. |
| Survive | 3 | Big Mouth ; avant-poste Frostbite ; périmètre de défense finale. |
| MGO1 | 12 | Les douze cartes ciblées, nommées individuellement dans la galerie et le manifeste. |
| MGO2 | 15 | Les quinze cartes ciblées, éditions et extensions précisées dans le manifeste. |
| FOX HUNT | 3 | Cradle Forest ; Ghost Garrison ; Sacred Garden. |
| Arcade | 2 | Desert Duel ; Lethal Leviathan. |
| Mobile | 1 | Finale du Commander sur le REX virtuel. |

Ces **84 fichiers donnent au moins une source candidate à 80 périmètres auparavant sans correspondance**. Hospital / Research Lab, les trois salles Test Subjects et les deux parties de Guadalajara expliquent la différence entre nombre de fichiers et nombre d’identifiants.

Les 113 lignes de stages se répartissent maintenant en **25 avec sources antérieures, 80 avec candidats P61 et 8 lots encore à décomposer**. Les huit lots sont : VR/Alternative de Substance ; DLC VR Rising ; fonds MGS Touch ; scènes The Twin Snakes ; campagne Delta ; Snake vs Monkey ; Snake vs Bomberman ; contrôle d’édition Master Collection 2.

### Portées encore partielles

L’[inventaire](INVENTAIRE.md) conserve les limites pour chaque ligne. Les principales sont Zaozyorje sans WIG ; hangar Peace Walker sans baie centrale établie ; Ruins Lower sans forêt ni ruines hautes ; chambre KODOQUE sans tout FAR ; prototype AC!D2 sans ses quatre étages ; Airport sans piste ; Guest House sans intérieur ; Millennium Park sans Crescent Meridian ; centrale MGS4 sans Cove Valley Village ; marché sans toute la poursuite Stryker. Les vues de Lamar, FOB, quarantaine et défense finale représentent des secteurs ou configurations précis.

**GW Server demande une revue prioritaire : sa source repose sur des descriptions sourcées sans capture visuelle complète récupérée.** Les références de Nomad, de certaines cartes MGO1, des statues de Desert Duel et de la finale Mobile présentent également des limites indiquées dans leurs manifests.

## Personnages et costumes

Les **17 personnages** comprennent Desperado standard, Berserker, scientifique Desperado, police cyborg de Denver, Marine du Tanker, garde de Camp Omega, agent JCS, prisonnier GZ, Hideo GZ, Hideo TPP, Trenya, directeur de la CIA MGS3 et Delta, président Johnson MGS3 et Delta, Pipo PS2 et Pipo Delta.

Les archétypes et poses restent précis : le prisonnier est agenouillé ; le Pipo PS2 utilise une pose assise avec tasse ; les variantes MGS3 et Delta sont séparées. Ces images ne représentent pas toutes les variantes de leurs groupes et ne sont pas des animations de combat.

Les **5 costumes P61** sont Old Snake Digital Red, Volgin Delta en combinaison rouge de combat à manches courtes, Diamond Dogs Scout équipé, Snake AC!D2 bandé à l’épilogue et Virgil AT-9 déployé. Snake bandé est assis. Le libellé historique Volgin « torse nu » est corrigé dans la qualification.

**Amanda en convalescence reste sans référence complète permettant de définir sa tenue et ses accessoires avec précision.** Les onze retenues historiques internes aux catalogues, plus le concept Raven polaire extérieur au catalogue sélectionné, restent documentées. Le cas XOF 1975 / hôpital 1984 est résolu par une incarnation 1984 déjà existante.

Sur les **87 lignes d’extension de personnages**, 4 avaient déjà une correspondance et 14 disposent maintenant de candidats P61. Les **69 lignes encore sans correspondance démontrée ne sont pas 69 personnes individuelles** : elles comprennent 9 lignes prioritaires non produites, 35 autres groupes, 10 autres identités documentaires et 15 profils d’édition ou d’identité.

Les neuf lignes prioritaires ouvertes sont le frère de Jennifer, le faux Madnar, Khrouchtchev, les avatars FOX HUNT, Hideo PW, l’agent DoD attribué à GZ, Queequeg, les cyborgs blindés MGR et les groupes humains R-00. Le [rapport détaillé](audit/roster-qualification.md) précise les références examinées et le motif de chaque cas.

L’audit de garde-robe initial porte sur **3 399 lignes et 384 incarnations** ; aucune ligne de corps Original n’était sans source. Ce constat de présence de fichier ne certifie pas la fidélité de ces corps existants.

## Machines et projectiles

Les **25 machines P61** comprennent : Supercomputer NES ; Metal Gear 2 de Snake’s Revenge ; Hind D MG2 ; RAY prototype Tanker ; LAV-G normal ; Mi-24A Custom ; LAV-G, LAV-C, BTR-60PA et BTR-60PB Custom ; Pupa, Chrysalis, Cocoon et Peace Walker en Type II et Custom ; Gear REX, Rathalos et Tigrex ; module avant détaché du Shagohod Delta ; Lord of Dust, Mech Genola et Devastator.

Les **54 périmètres machines** se répartissent en 25 avec sources antérieures, 25 avec candidats P61 et 4 ouverts : **REX TTS**, **configurations ZEKE**, **Gustav concept** et **projet Rising annulé**. Le Shagohod Delta produit ne représente pas le véhicule complet.

La génération de **REX TTS** et du **cyborg blindé MGR** a été effectivement refusée par le contrôle automatique du générateur, catégorie `other`. Aucun PNG n’a été retourné pour ces deux demandes et aucun nouvel essai sous alias n’a suivi. Les refus et leurs identifiants sont conservés dans les manifests concernés.

Le **nuage de fumée** est une nouvelle image VFX avec transparence, sans animation. Les trois corps de projectiles encore manquants sont les obus **BOX-T (SMK)** et **BOX-T (STN)** de Peace Walker, et l’explosif du **Mortar de Survive**. Leur identité est documentée, mais les références consultées n’établissent pas assez nettement leur géométrie. Le projectile du Mortar n’a pas été remplacé par l’appât Kuban.

## Contrôles et reproduction de l’inventaire

Les **132 PNG P61 sélectionnés et les 6 essais P61 archivés** ont été décodés et leurs SHA-256 et SHA Git vérifiés. Les 84 décors font **1672 × 941**. Les personnages, costumes, machines et la fumée disposent d’un canal alpha. Les octets originaux des images sélectionnées sont conservés ; les corrections graphiques ont été réalisées avec imagegen puis contrôlées.

Les 40 sources sélectionnées et 2 essais archivés P60 sont conservés avec les SHA du commit figé `2e2864e3cba653c10727113f574ec1107c274e41`. P61 ne leur attribue aucune nouvelle certification visuelle.

`reconcile.py` reconstruit le manifeste de livraison à partir des lots, vérifie les PNG P61 et les SHA du tableau Git P60. `build_inventory.py` rapproche les 277 lignes de la baseline et produit `inventory.json` et `INVENTAIRE.md`. Ces scripts nécessitent Python et Pillow et ne modifient pas les images.

**Cette livraison ne modifie ni les manifests centraux du jeu, ni les rigs, animations, collisions, hitboxes, effets animés ou comportements.** Aucun nouveau candidat P61 n’est admis au combat par cette PR. Les fichiers constituent un lot concret pour la revue visuelle et la suite de l’intégration.
