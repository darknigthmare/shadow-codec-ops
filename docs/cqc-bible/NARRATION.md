# CQC Versus Legacy — Bible narrative

**Version de travail : 25 novembre 2026. Texte et préproduction uniquement.** Cette bible applique le guide fourni par Darknigthmare aux données lues au commit `5c2cbed73f15c4583f5ffd2cee0c2344180b5d68`. Elle enrichit huit routes alternatives existantes et définit une campagne commune de dix chapitres. Tous les dialogues, objectifs, transitions et nouveaux plans décrits ici sont des **créations du projet CQC**, jamais des répliques officielles ou une nouvelle continuité canonique.

Le registre exploitable est [narrative-registry.json](narrative-registry.json) ; les sources et leurs périmètres figurent dans [sources-narrative.json](sources-narrative.json). Les fiches de combat et les noms de neutralisation restent dans [COMBAT.md](COMBAT.md). Une neutralisation conclut un combat ; une outro développe les conséquences d’une route.

## 1. État observé et portée de cette passe

| Couche | Constat et limite |
| --- | --- |
| Chroniques actuelles lues | 354 histoires et 354 profils dans le blob de contenu v0.56 ; chacune possède 3 panneaux d’introduction, 8 duels et 3 panneaux de conclusion. |
| Images héritées déclarées | 81 histoires déclarées entièrement peintes, soit 486 usages de scènes ; 1 638 compositions fond + portrait. Ces nombres décrivent les métadonnées, pas une inspection visuelle complète. |
| Audit historique nominatif | 380 UID documentés, dont 26 sans histoire. Leur admission actuelle dépend d’installateurs et de sources visuelles ; aucun compteur de roster actif n’est certifié ici. |
| Enrichissement présent | 8 routes pilotes, 64 rencontres motivées et 8 rivalités prioritaires. Les récits existants restent inchangés. |
| Campagne proposée | 10 chapitres avec progression et preuves propres, plus prologue et épilogue. |
| Plans à produire | 72 plans pour les routes + 36 pour la campagne = 108 briefs distincts. Zéro nouvelle image narrative générée dans cette passe. |
| Reste nominatif | 372 UID non réécrits ici : 346 récits hérités et 26 profils historiquement sans histoire. Tous sont inscrits dans le registre. |
| Sources P60/P61 | 172 images sélectionnées dans la livraison existante. 24 sont reliées ici comme références de lieux. Aucune n’est assimilée à une cinématique complète, à une admission runtime ou à une certification 1:1. |



Ces lectures ne permettent pas de conclure que tout le roster, toutes les animations ou tous les dialogues sont terminés. Les 108 plans de cette proposition doivent être dédupliqués avec les besoins hérités avant de fixer un lot de production ; ils ne constituent pas une commande d’images déjà exécutée. Sources : [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-NARRATIVE-AUDIT](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/05_NARRATION_AUDIO_SYSTEMES.md), [R-PROFILES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/data/narration_profils.csv), [R-P61](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/cqc-reprise/pass61/delivery-manifest.json).

## 2. Règles de continuité et de fidélité

La fidélité **1:1** concerne l’identité du modèle, la version, les armes, les proportions, le lieu et les capacités. Elle ne signifie pas « format carré ». Un récit inventé peut rechercher cette fidélité visuelle tout en restant une fiction CQC : les deux statuts sont renseignés séparément. Le guide demande aussi de respecter la phase de travail ; ici, toutes les fonctionnalités narratives, la génération des scènes et leur intégration sont différées. Source : [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt).

| Statut de lore | Application |
| --- | --- |
| CANON_ATTESTE | Fait effectivement attesté par une source primaire consultée. Une donnée de projet ou un détail hérité non vérifié relève d’une autre classe ; aucun dialogue nouveau ne devient officiel. |
| ADAPTATION_JOUABLE | Transformation de la représentation ou de l’objectif pour le jeu de combat ; issue et capacités à contrôler. |
| ORIGINAL_COMPATIBLE | Création de projet proposée dans un espace non documenté ou cadre hors diégèse ; compatibilité à relire. |
| ALTERNATIF_CROSSOVER | Simulation, projection, divergence ou rencontre impossible déclarée avant l’entrée en jeu. |
| A_CONFIRMER | Détail dont la preuve ou la correspondance de version manque ; ne pas le certifier par défaut. |



| Séparation obligatoire | Conséquence d’écriture |
| --- | --- |
| mgs3-original | MGS3 original et ses incarnations ; Δ reste une autre version, montrée seulement comme comparaison explicite. |
| mgs1-original | MGS1 original ; The Twin Snakes, Old Snake, MG1 et MG2 ont des UID distincts. |
| mgs2-plant | Raiden Plant 2009 séparé de Snake Tanker 2007, de Raiden VR et de tous ses corps cyborgs. |
| tpp | MGSV 1984 ; Ground Zeroes 1975 et Venom ne sont pas un échange de costumes. Révélation identitaire sous spoiler, état de connaissance explicite. |
| mgr | MGR après MGS4 ; corps amélioré core__raiden séparé de pass40__raiden_r00 et du prototype Rising. |
| parallel-unwritten | Ghost Babel, AC!D, AC!D2, Snake’s Revenge, Mobile, Survive, Online et autres variantes conservent leurs propres fiches de continuité. Leur présence comparative ne les fusionne pas dans la campagne principale. Aucun statut canonique global nouveau n’est arbitré ici. |



La provenance **DONNEE_PROJET**, utilisée pour les UID et les structures lues dans le dépôt, reste distincte de ces classes de lore : un identifiant observé ne prouve aucun événement canonique.

Les huit routes héritées mêlent déjà des époques par des projections. Cet enrichissement annonce ces projections au joueur et borne le savoir de l’acteur : un Naked Snake de 1964 ne raconte pas son futur, Raiden MGS2 ne reconnaît pas Armstrong comme une rencontre à venir, et Wolf n’hérite pas des capacités de Crying Wolf. Les rencontres de la même édition restent elles aussi fictives quand la route le demande. Une alliance ou un exercice entre alliés ne devient pas une bataille historique par la seule présence des bons costumes.

Les issues alternatives de The Boss, Ocelot et Sniper Wolf doivent être indiquées **avant** la route et dans la galerie. La séparation sans exécution de The Boss, les deux mains d’Ocelot dans la simulation et la sortie du convoi protégé par Wolf ne réécrivent pas leurs événements canoniques. Les jeunes personnages, civils, animaux et opérateurs d’équipement conservent un point de vue adapté ; la présence d’un UID dans le Versus ne leur confère pas automatiquement une vocation de combattant.

### Exigences du guide appliquées

| Exigence | Décision de bible | Statut de livraison |
| --- | --- | --- |
| 07 — présentation et relations | Huit rivalités motivées ; limites de connaissance par incarnation ; repli générique fidèle pour les autres paires. | Texte proposé ; matrice complète différée. |
| 08 — routes individuelles | Situation, déclencheur, enjeu personnel, huit rencontres, retournement, rivalité, conséquence, échec et reprise pour chaque pilote. | Huit enrichissements écrits ; 372 UID non réécrits. |
| 09 — campagne globale | Une enquête documentaire propre, dix chapitres, trois actes, preuves persistantes et résolution. | Conception ; aucun mode installé. |
| 10 — scènes multiplans | Trois plans distincts pour chaque intro, rivalité et outro ; 12 séquences propres à la campagne. | 108 briefs ; images à produire. |
| 24 — sauvegarde | Checkpoints, résumé, version du contenu, état de costume et preuves distincts. | Contrat proposé, migration différée. |
| 25–26 — inventaire et contrôle | Registre nominatif, sources, limites de portée, images non certifiées, vérifications structurelles. | Registre livré ; QA visuelle future. |



## 3. Campagne globale — La ligne effacée

**Statut : création CQC hors diégèse, compatibilité à relire.** Un lecteur de dossiers reçoit une synthèse qui attribue à un seul nom des actes incompatibles. Le joueur doit reconstruire la provenance de dix pièces : qui a agi, à quelle date, avec quel savoir, et qui a choisi ce qui serait conservé. Ce lecteur est l’interface du fan-game ; ce n’est ni une nouvelle IA des Patriotes ni une organisation secrète ajoutée au canon.

L’ouverture présente le problème d’attribution. Le premier acte sépare ordre, savoir et incarnation. Le deuxième montre comment le cadrage, l’omission et le point de vue modifient un dossier. Le troisième examine la règle qui juge les actes puis permet une conclusion responsable. L’épilogue conserve aussi les blancs. Les factions ne traversent pas le temps : seul le lecteur CQC rapproche leurs dossiers.

Le changement de personnage apporte une information située. Chaque chapitre possède une preuve persistante, une fonction et des images propres ; il ne lance pas les huit duels ni les scènes d’une route individuelle. Les faits d’époque constituent des ancrages documentés ; les preuves d’enquête, scènes, répliques et raccords sont inventés pour ce mode. L’année MGR 2018 est déduite de MGS4 situé en 2014 et des quatre années indiquées par Konami, plutôt que présentée comme une date directement citée par la page MGR. Sources : [K-MGS3-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs3), [K-MGS1-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs), [K-MGS2-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs2), [K-TPP](https://eu-support.konami.com/hc/en-gb/articles/9666546497047-Metal-Gear-Solid-V-The-Phantom-Pain), [K-MGS4-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs4), [K-MGR-STORY](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series).

| Chapitre | Personnage et période | Question / pièce conservée |
| --- | --- | --- |
| ch01 — L’ordre et son destinataire | core__boss / 1964 / MGS3 | Une action visible et le motif réel ne sont pas équivalents. La vérité donnée après la mission doit être datée séparément du savoir des acteurs. Pièce : order_context_1964 |
| ch02 — Le rapport de l’élève | core__snake / 1964 / MGS3 | La connaissance finale du joueur ne doit pas être réinjectée dans les répliques de Snake au début de mission. Pièce : knowledge_boundary_1964 |
| ch03 — Le nom porté | core__venom / 1984 / MGSV | Une signature célèbre ne prouve ni un corps, ni une incarnation, ni l’auteur de chaque action. Pièce : actor_identity_1984 |
| ch04 — La preuve choisie | core__ocelot_mgs1 / 2005 / MGS1, fragment fictif déclaré | Le dossier n’a pas seulement des trous : son cadrage peut être délibéré. La preuve du manque est elle-même utile. Pièce : custody_gap_2005 |
| ch05 — Ce que la visée exclut | core__wolf / 2005 / MGS1, fragment fictif déclaré | Un point de vue exact reste partiel. La vue de Wolf sera complétée par celle de Snake, pas déclarée omnisciente. Pièce : line_of_sight_2005 |
| ch06 — L’autre côté du passage | core__solid / 2005 / MGS1, fragment fictif déclaré | Une preuve matérielle et une parole ne sont ni interchangeables ni automatiquement contradictoires. L’inventaire d’Ocelot ne suffisait pas. Pièce : witness_context_2005 |
| ch07 — Le résultat attendu | core__raiden_mgs2 / 2009 / MGS2 Plant | Le document qui juge un acte peut aussi en avoir fixé à l’avance les possibilités. Une note parfaite ne certifie pas une décision libre. Pièce : evaluation_rule_2009 |
| ch08 — Le droit de conclure | core__raiden_mgs2 / 2009 / fin de l’arc MGS2, adaptation | Distinguer preuve et interprétation n’efface pas le passé. Cela empêche la conclusion d’un autre de devenir l’unique futur possible. Pièce : authored_response_2009 |
| ch09 — Ce qui sort du laboratoire | core__raiden / 2018 / Revengeance | Le numéro d’un produit ne remplace ni une personne, ni la responsabilité de ceux qui ont construit le système. Pièce : persons_not_units_2018 |
| ch10 — La ligne conservée | core__raiden / 2018 / Revengeance, résolution CQC séparée | Les documents contradictoires n’étaient pas une seule vérité à déverrouiller. Les erreurs de date, d’acteur, de point de vue et d’attribution demandaient des corrections différentes. Pièce : resolved_dossier |



### CH01 — L’ordre et son destinataire

**Jouable proposé :** `core__boss`. **Lieu :** Reconstitution du terrain de MGS3 avant l’issue finale. **Opposants documentés :** `core__snake`.

Le dossier initial confond la teneur d’un ordre avec l’intention de la personne qui l’exécute. Le point de vue de The Boss rend visible ce qui doit rester tu dans la mission.

**Objectif et résultat.** Tenir une séquence de CQC adaptée jusqu’au déclencheur de retrait ; préserver le support du rapport. La victoire ludique mesure la tenue de la séquence et ne remplace pas l’issue de MGS3. Une action visible et le motif réel ne sont pas équivalents. La vérité donnée après la mission doit être datée séparément du savoir des acteurs.

**Raccord.** Le dossier passe à l’élève, qui doit agir avec moins d’informations que le joueur. **Échec et reprise.** Reprendre l’épreuve de posture ; aucune branche ne transforme la mort canonique de The Boss en survie.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch01-sequence-shot01 | Plan moyen latéral sous abri — The Boss range une instruction hors du regard des soldats. |
| campaign-ch01-sequence-shot02 | Plan large traversant une ligne d’arbres — Snake et The Boss restent à deux profondeurs ; l’espace rend leur séparation concrète. |
| campaign-ch01-sequence-shot03 | Insert sur le support refermé — Le dossier externe CQC annote la différence entre ce qui fut vu et ce qui fut su ; aucune annotation n’est peinte. |



Références de lieu : [mgs3-rassvet](../../public/cqc/assets/p60/mgs3-rassvet.png), [mgs3-dolinovodno](../../public/cqc/assets/p60/mgs3-dolinovodno.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGS3-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs3), [K-MGS3-STORY](https://eu-support.konami.com/hc/en-gb/articles/9731056113303-Backstory-What-is-the-story-of-Metal-Gear-Solid-3-Snake-Eater).

### CH02 — Le rapport de l’élève

**Jouable proposé :** `core__snake`. **Lieu :** Groznyj Grad puis salle de rapport séparée. **Opposants documentés :** `core__volgin`, `core__boss`.

La reconstitution montre un objectif exécuté sans livrer simultanément toutes ses raisons. Un second document révèle le coût que le bilan militaire masque.

**Objectif et résultat.** Franchir deux confrontations adaptées de MGS3, puis classer séparément ordre reçu, action accomplie et révélation postérieure. Le classement est une mécanique future de bible. La connaissance finale du joueur ne doit pas être réinjectée dans les répliques de Snake au début de mission.

**Raccord.** Le système de classement a indexé tous les « Snake » comme une seule personne. La comparaison suivante change explicitement d’incarnation. **Échec et reprise.** Reprise au dernier affrontement ; une mauvaise attribution demande une correction expliquée, sans effacer les preuves déjà acquises.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch02-sequence-shot01 | Vue haute depuis un angle de structure — Naked Snake franchit le dernier accès sans équipement d’aucune autre époque. |
| campaign-ch02-sequence-shot02 | Plan rapproché sur la main arrêtée au-dessus du rapport — Une révélation de l’après-mission interrompt la signature ; les mots seront rendus séparément. |
| campaign-ch02-sequence-shot03 | Plan fixe de table avec deux chemises séparées — Deux documents sont posés à distance : le rapport d’action et le contexte révélé. |



Références de lieu : [mgs3-graniny-lab](../../public/cqc/assets/p60/mgs3-graniny-lab.png), [mgs3-runway](../../public/cqc/assets/p60/mgs3-runway.png), [mgs3-svyatogornyj-east](../../public/cqc/assets/p61/mgs3-svyatogornyj-east.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGS3-STORY](https://eu-support.konami.com/hc/en-gb/articles/9731056113303-Backstory-What-is-the-story-of-Metal-Gear-Solid-3-Snake-Eater).

### CH03 — Le nom porté

**Jouable proposé :** `core__venom`. **Lieu :** Wialo et Mother Base MGSV, mission composite CQC. **Opposants documentés :** `core__skull_mist`.

Une feuille de mission attribue automatiquement au nom de Big Boss le travail de tout un groupe. Venom sécurise une extraction inventée, puis fait apparaître les équipiers derrière cette signature.

**Objectif et résultat.** Survivre à une interception adaptée et maintenir un point d’extraction jusqu’au départ de l’équipe ; conserver le journal des présents. Une signature célèbre ne prouve ni un corps, ni une incarnation, ni l’auteur de chaque action.

**Raccord.** L’erreur n’est plus seulement une date : quelqu’un peut choisir ce que le dossier laisse voir. Le chapitre suivant passe au point de vue d’Ocelot MGS1. **Échec et reprise.** Si le point d’extraction est perdu, reprise locale ; aucun soldat ajouté n’est déclaré mort dans le canon.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch03-sequence-shot01 | Plan large depuis le bord d’un toit bas — Venom regarde le point d’extraction avec la bonne silhouette MGSV ; l’équipe reste distincte de sa pose. |
| campaign-ch03-sequence-shot02 | Vue au niveau d’une sangle de transport — Deux équipiers fixent le matériel pendant que la main bionique gauche tient l’appui. |
| campaign-ch03-sequence-shot03 | Plan moyen d’un rapport posé à côté de l’équipement — Le registre CQC sépare incarnation, équipage et ordre ; pas de miroir ni de salut repris de la route individuelle. |



Références de lieu : [tpp-wialo](../../public/cqc/assets/p61/tpp-wialo.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-TPP](https://eu-support.konami.com/hc/en-gb/articles/9666546497047-Metal-Gear-Solid-V-The-Phantom-Pain), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### CH04 — La preuve choisie

**Jouable proposé :** `core__ocelot_mgs1`. **Lieu :** Quai et réserve de matériel de Shadow Moses. **Opposants documentés :** `archive__johnny_mgs1`, `completion44__genome_soldier_44`.

Ocelot supervise un inventaire inventé d’armes et de pièces à conviction. Le joueur constate comment un objet conservé et un objet écarté produisent deux récits possibles du même poste.

**Objectif et résultat.** Passer deux vérifications tactiques simulées et choisir l’ordre de présentation des pièces ; l’histoire conserve la trace des objets omis. Le dossier n’a pas seulement des trous : son cadrage peut être délibéré. La preuve du manque est elle-même utile.

**Raccord.** Wolf observera une ligne de tir dont le rapport simplifié supprime l’obstacle. Aucun paquet ne voyage depuis 1964 ; c’est le lecteur CQC qui rapproche les dossiers. **Échec et reprise.** Reprendre la vérification ; omission choisie = drapeau narratif visible, jamais suppression définitive de la preuve pour le joueur.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch04-sequence-shot01 | Plongée générale sur une caisse ouverte — Ocelot fait aligner les objets par un soldat Genome ; sa silhouette MGS1 n’est pas celle du jeune Ocelot. |
| campaign-ch04-sequence-shot02 | Plan de détail sur une case vide de mousse — Une empreinte d’objet demeure alors que la pièce a été retirée. |
| campaign-ch04-sequence-shot03 | Vue de biais sur la fermeture de la caisse — Ocelot referme la caisse ; l’empreinte vide reste visible dans un relevé séparé du dossier CQC. |



Références de lieu : [mgs1-cargo-dock](../../public/cqc/assets/p61/mgs1-cargo-dock.png), [mgs1-cargo-elevator](../../public/cqc/assets/p61/mgs1-cargo-elevator.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-OCELOT](https://www.konami.com/mg/archive/mgs/character/ch08.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### CH05 — Ce que la visée exclut

**Jouable proposé :** `core__wolf`. **Lieu :** Passage enneigé de Shadow Moses, étude d’angle CQC. **Opposants documentés :** `core__solid`.

Une reconstitution prétend décrire un tir sans montrer le volume de la passerelle. Wolf doit changer de position pour établir ce que la lunette voit et ce qu’elle ne peut pas voir.

**Objectif et résultat.** Remporter une épreuve de positionnement contre une projection de Snake en conservant une zone interdite au tir. La scène n’est pas un remplacement du duel officiel. Un point de vue exact reste partiel. La vue de Wolf sera complétée par celle de Snake, pas déclarée omnisciente.

**Raccord.** La caméra change de côté et le personnage jouable devient Solid Snake ; l’obstacle doit rester physiquement au même endroit. **Échec et reprise.** Un tir dans la zone interdite réinitialise l’épreuve locale avec rappel du motif ; aucun civil n’est utilisé comme compteur de dégâts.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch05-sequence-shot01 | Plan d’ensemble latéral sans lunette — Wolf découvre un obstacle qu’un cadrage serré aurait supprimé. |
| campaign-ch05-sequence-shot02 | Vue depuis le niveau de la passerelle — Snake traverse une profondeur différente de celle attribuée par le faux rapport. |
| campaign-ch05-sequence-shot03 | Insert sur une carte graphique de l’angle — Le dossier externe conserve le cône visible et la zone masquée, sans texte peint dans l’illustration. |



Références de lieu : [mgs1-first-wolf](../../public/cqc/assets/p61/mgs1-first-wolf.png), [mgs1-wolf-cave](../../public/cqc/assets/p61/mgs1-wolf-cave.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-WOLF](https://www.konami.com/mg/archive/mgs/character/ch10.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### CH06 — L’autre côté du passage

**Jouable proposé :** `core__solid`. **Lieu :** Coursive de maintenance proche du fret. **Opposants documentés :** `completion44__genome_soldier_44`, `core__ocelot_mgs1`.

Le passage vu à distance est parcouru au sol. Snake trouve une voie de maintenance absente du plan et confronte un récit administratif à une action simple : faire franchir le seuil à un témoin.

**Objectif et résultat.** Ouvrir la coursive dans deux confrontations adaptées puis déclencher le passage du témoin non combattant ; conserver son témoignage comme information située. Une preuve matérielle et une parole ne sont ni interchangeables ni automatiquement contradictoires. L’inventaire d’Ocelot ne suffisait pas.

**Raccord.** Le dossier peut maintenant distinguer omission et limite de perception. À Big Shell, la difficulté devient la consigne qui fabrique elle-même le comportement mesuré. **Échec et reprise.** Reprendre au verrou de la coursive ; le témoin reste hors de l’arène et ne devient pas un adversaire.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch06-sequence-shot01 | Plan très bas derrière un seuil — Snake mesure la marche que le témoin devra franchir ; la géométrie raccorde avec le chapitre précédent sans reprendre son image. |
| campaign-ch06-sequence-shot02 | Plan rapproché à deux personnages, armes abaissées — Le témoin indique la voie réellement empruntée ; son visage ne remplace aucun PNJ officiel nommé. |
| campaign-ch06-sequence-shot03 | Plan arrière du seuil maintenant franchi — Une marque sur la porte relie les deux points de vue ; le dossier CQC conserve la limite de chacun. |



Références de lieu : [mgs1-cargo-elevator](../../public/cqc/assets/p61/mgs1-cargo-elevator.png), [mgs1-blast-furnace](../../public/cqc/assets/p61/mgs1-blast-furnace.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGS1-STORY](https://www.konami.com/mg/archive/mgs/story/index.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### CH07 — Le résultat attendu

**Jouable proposé :** `core__raiden_mgs2`. **Lieu :** Big Shell, espace de consignes et secteur des otages. **Opposants documentés :** `completion44__gurlukovich_merc_44`, `core__fatman`.

La consigne réduit la réussite à une séquence attendue. Raiden confronte cette définition au besoin de vérifier les accès et les personnes qui restent hors de son écran.

**Objectif et résultat.** Terminer deux segments adaptés puis vérifier un objectif secondaire décrit en journal ; aucune mécanique de bombe complète n’est déclarée implémentée. Le document qui juge un acte peut aussi en avoir fixé à l’avance les possibilités. Une note parfaite ne certifie pas une décision libre.

**Raccord.** Le joueur conserve la règle du test et le relevé des actes séparément. Le chapitre suivant traite le droit d’en écrire la conclusion. **Échec et reprise.** Checkpoint avant le segment ; rappel de la consigne et de son contexte sans punition narrative irréversible.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch07-sequence-shot01 | Plan moyen depuis une porte technique — Raiden écoute le codec avant de franchir l’accès ; aucun équipement de Tanker Snake ou de MGR. |
| campaign-ch07-sequence-shot02 | Vue en profondeur d’un couloir de la Shell 1 — L’itinéraire recommandé passe à côté d’une porte à vérifier ; les deux directions restent visibles. |
| campaign-ch07-sequence-shot03 | Plan rapproché sur la main qui note une exception — Raiden garde une trace sans prétendre avoir déjà compris tout le système. |



Références de lieu : [mgs2-strut-b](../../public/cqc/assets/p60/mgs2-strut-b.png), [mgs2-shell1-hostages](../../public/cqc/assets/p61/mgs2-shell1-hostages.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGS2-PLANT](https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html), [K-MGS2-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs2).

### CH08 — Le droit de conclure

**Jouable proposé :** `core__raiden_mgs2`. **Lieu :** Arsenal Gear puis espace de conclusion séparé. **Opposants documentés :** `completion44__tengu_soldier_44`, `core__solidus`.

La fin du dossier propose une identité fermée. Raiden peut reconnaître les faits et le passé sans signer toutes les conclusions qu’une autorité veut en tirer.

**Objectif et résultat.** Passer deux confrontations de fin d’arc avec version d’équipement tardive vérifiée ; choisir une formulation personnelle dans le journal. L’issue historique et les dates ne changent pas selon ce choix. Distinguer preuve et interprétation n’efface pas le passé. Cela empêche la conclusion d’un autre de devenir l’unique futur possible.

**Raccord.** Le dossier saute explicitement à l’ère MGR ; le même nom ne dispense pas de changer le corps, l’expérience et les capacités. **Échec et reprise.** Reprendre le duel final ; le texte choisi peut être relu et corrigé, sans remettre à zéro les chapitres précédents.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch08-sequence-shot01 | Plan large de corridor sans écrans géants inventés — Raiden avance dans l’architecture d’Arsenal ; l’absence de source d’un lieu ne sera pas masquée par un autre décor. |
| campaign-ch08-sequence-shot02 | Plan de face asymétrique entre Raiden et Solidus — L’adversaire ferme le cadre sans transformer le Raiden humain en cyborg. |
| campaign-ch08-sequence-shot03 | Plan calme de l’équipement posé après l’épreuve — Le journal CQC conserve faits et interprétation dans deux champs séparés. |



Références de lieu : [mgs2-arsenal-stomach](../../public/cqc/assets/p61/mgs2-arsenal-stomach.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGS2-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs2), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### CH09 — Ce qui sort du laboratoire

**Jouable proposé :** `core__raiden`. **Lieu :** Guadalajara — laboratoire et sortie technique. **Opposants documentés :** `pass19__mastiff_mgr`, `core__monsoon`.

Le registre industriel réduit des personnes à des unités utilisables. La mission composite CQC demande de préserver la preuve de cette réduction tout en ouvrant une sortie ; Monsoon n’apparaît que dans une comparaison CQC séparée, jamais déplacé physiquement dans le laboratoire.

**Objectif et résultat.** Séquence de protection d’une preuve et dégagement de passage ; duel comparatif clairement titré après la scène du laboratoire. Les personnes protégées restent hors du combat. Le numéro d’un produit ne remplace ni une personne, ni la responsabilité de ceux qui ont construit le système.

**Raccord.** Les pièces d’archives suffisent à contester la légende automatique ; il reste à répondre à la force qui voudrait les rendre inutiles. **Échec et reprise.** Reprise avant la sortie technique ; objectif explicite de préservation, pas d’effacement de victimes pour améliorer le score.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch09-sequence-shot01 | Plan fixe au ras d’un câble de laboratoire — Raiden bloque l’accès pendant qu’un support de données est mis à l’abri ; aucun enfant au premier plan du combat. |
| campaign-ch09-sequence-shot02 | Plan général d’un espace comparatif CQC distinct — Le modèle Monsoon apparaît dans une autre séquence et un autre cadre, séparés par un carton de mode. |
| campaign-ch09-sequence-shot03 | Plan arrière sur une sortie ouverte — Le support de preuve quitte les lieux avec l’équipe ; le personnage ne pose pas devant une explosion. |



Références de lieu : [mgr-guadalajara-lab](../../public/cqc/assets/p61/mgr-guadalajara-lab.png), [mgr-guadalajara-sewers](../../public/cqc/assets/p61/mgr-guadalajara-sewers.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGR-STORY](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series), [K-MGR-DEVELOPER](https://www.platinumgames.com/works/metal-gear-rising-revengeance), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### CH10 — La ligne conservée

**Jouable proposé :** `core__raiden`. **Lieu :** Espace de confrontation final de l’ère MGR, puis table d’archives hors diégèse. **Opposants documentés :** `core__armstrong`.

La dernière confrontation oppose la puissance d’un individu à la possibilité de garder une histoire vérifiable. Elle clôt l’enquête du lecteur CQC, sans créer une organisation secrète supplémentaire dans le canon.

**Objectif et résultat.** Terminer le duel adapté puis publier seulement dans le journal local fictif le dossier corrigé : incarnation, période, fait, interprétation, manque. Il ne s’agit d’aucune publication externe réelle. Les documents contradictoires n’étaient pas une seule vérité à déverrouiller. Les erreurs de date, d’acteur, de point de vue et d’attribution demandaient des corrections différentes.

**Raccord.** Épilogue : les routes individuelles restent consultables dans leur continuité alternative ; les dossiers incomplets restent marqués incomplets. **Échec et reprise.** Reprise du combat avec récapitulatif des preuves ; aucune solution ne remplace les sources manquantes par une invention certifiée.

| Plan propre à la campagne | Cadrage et action |
| --- | --- |
| campaign-ch10-sequence-shot01 | Plan large au niveau du terrain — Raiden et Armstrong sont identifiables dans leurs versions MGR ; le hangar P61 n’est pas présenté comme l’épave finale. |
| campaign-ch10-sequence-shot02 | Plan rapproché sur un pas qui quitte l’arène — La confrontation se termine sans ramener les anciens personnages physiquement dans la scène. |
| campaign-ch10-sequence-shot03 | Plongée sur la table d’archives hors histoire — Dix pièces restent séparées par des espaces et des onglets sans texte peint. |



Références de lieu : [mgr-pakistan-hangar](../../public/cqc/assets/p61/mgr-pakistan-hangar.png). Les sources de décor ne sont pas les plans ci-dessus. Sources d’ancrage : [K-MGR-STORY](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js).

### Ouverture, résolution et progression

**La ligne impossible** — Ouvrir ou clore l’enquête globale en montrant l’état du dossier.

| Plan réservé | Action |
| --- | --- |
| campaign-prologue-shot01 | Des chemises de périodes différentes ont été liées par une même bande. |
| campaign-prologue-shot02 | Naked Snake et Solid Snake sont deux images de dossier, jamais deux personnages réunis physiquement. |
| campaign-prologue-shot03 | Les espaces de classement restent à remplir ; le joueur commence en 1964. |



**Les blancs conservés** — Ouvrir ou clore l’enquête globale en montrant l’état du dossier.

| Plan réservé | Action |
| --- | --- |
| campaign-epilogue-shot01 | Les pièces corrigées ne sont plus empilées ; chaque période garde son espace. |
| campaign-epilogue-shot02 | Une zone non résolue n’est ni barrée ni remplie par un portrait de remplacement. |
| campaign-epilogue-shot03 | Le dossier est rangé, mais une table de consultation reste disponible pour les récits alternatifs. |



Le parcours reste linéaire et convergent. Un choix modifie la formulation du journal ou l’ordre de lecture, sans déplacer les dates ni modifier la filiation des personnages. Une preuve déjà conservée reste accessible après un échec. La sélection des chapitres et le résumé de reprise sont prévus ; les fins multiples, l’exploration, les hubs jouables et la coopération restent différés. Le journal mentionné au chapitre 10 est un état local fictif du jeu, sans publication externe réelle.

## 4. Huit routes individuelles prioritaires

Les titres suivants existent déjà dans les Chroniques. Les fiches les développent sans écraser leur texte ni réutiliser leurs images comme si de nouveaux plans étaient livrés. Les clés héritées sont conservées dans le registre pour la traçabilité. Toutes les répliques citées ci-dessous sont des **créations du projet** ; les actions d’escorte, d’objectifs secondaires ou de maintien de zone sont des spécifications futures, pas des capacités déjà testées dans le runtime.

### Le poids de la radio — NAKED SNAKE

**UID :** `core__snake` · **Route :** `route-01-naked-snake` · **Période :** 1964 — incarnation MGS3 · **Continuité : alternative / projections CQC déclarées.**

Sous la pluie, une liaison de mission tronquée pousse Snake à choisir entre une extraction rapide et le transport d’un blessé ennemi. Le trajet doit rester praticable pour deux hommes ; les adversaires comparatifs sont des projections CQC.

**But personnel.** Ramener le blessé jusqu’à la berge, puis écrire un rapport qui le décrive comme une personne secourue. **Conflit intérieur.** Confondre la bonne exécution d’un ordre avec la responsabilité de ce qu’il laisse derrière lui.

**Retournement.** La route la plus rapide n’est pas franchissable avec le blessé ; les voix promettant un futur glorieux ne connaissent pas le poids qu’il porte. **Conséquence.** Deux passagers embarquent. Snake signe un rapport bref qui refuse de transformer un sauvetage en capture. Ce départ imaginé ne remplace pas la fin de MGS3.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Connaissances de Naked Snake en 1964 seulement. Les intitulés de ses autres incarnations appartiennent au menu CQC. Il ne connaît ni ses armées futures, ni Solid Snake, ni les programmes de l’ère MGS2. |
| Costume | Tenue de terrain MGS3, équipement de jungle, bandana et visage d’origine. Séquence imaginaire avant les blessures finales : ne pas ajouter automatiquement un cache-œil. |
| Armes et accessoires | Couteau CQC et pistolet de l’incarnation MGS3 ; sangles et deux sacs de ration restent visibles. Aucun bras mécanique ni équipement Diamond Dogs. |
| Blessures et état | Fatigue et boue progressives ; le blessé conserve le même pansement. Aucune blessure historique nouvelle n’est présentée comme canon. |
| Ambiance | Verts détrempés, lumière de pluie puis gris clair de l’aube ; pas de halo numérique intégré aux personnages. Pluie sur la toile, respiration du blessé, parasites radio ; silence au moment du nombre de passagers. |



Ancres limitées : Naked Snake reçoit une mission en URSS en 1964 ; The Boss est son mentor. Sources : [K-MGS3-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs3), [K-MGS3-STORY](https://eu-support.konami.com/hc/en-gb/articles/9731056113303-Backstory-What-is-the-story-of-Metal-Gear-Solid-3-Snake-Eater), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — NAKED SNAKE — DELTA (`archive__naked_delta`) | NAKED SNAKE — DELTA reproduit ses gestes avec une netteté étrangère à ce bivouac boueux. Conserver deux sacs et rejoindre le premier abri | La route sera jugée sur l’évacuation, pas sur le style du double. « J’ai encore une charge à ramener. » |
| 2 — NICK MYER (`core__nick_sr`) | NICK MYER garde le premier ravin entre le bivouac et la berge. Ouvrir un passage assez large pour le blessé | Le blessé peut franchir le ravin après le duel. « Laisse de la place derrière moi. » |
| 3 — FATMAN (`core__fatman`) | FATMAN impose un détour dangereux sous prétexte de gagner quelques minutes. Éloigner la menace du détour sûr | Le deuxième sac reste avec Snake. « Ce détour doit tenir jusqu’au retour. » |
| 4 — NAKED SNAKE — PORTABLE OPS (`core__snake_mpo`) | NAKED SNAKE — PORTABLE OPS parle d'une armée que le jeune soldat n'a jamais fondée. Refuser une trajectoire réservée au combattant seul | Le futur supposé cesse de guider la carte. « Ton histoire peut attendre. » |
| 5 — RUNNING MAN (`core__runner_mg2`) | RUNNING MAN veut faire de l'extraction une épreuve de vitesse individuelle. Tenir un espace de repos sans abandonner le blessé | La vitesse cesse d’être la seule mesure du succès. « Je n’avance pas seul. » |
| 6 — GENE (`core__gene`) | GENE transforme chaque hésitation en promesse d'appartenir à une force plus grande. Dégager l’accès sans accepter une nouvelle allégeance | La décision revient à celui qui transportera l’homme. « Donner un ordre ne porte personne. » |
| 7 — NULL (`core__null_mpo`) | NULL exécute une consigne sans paraître voir le blessé derrière lui. Garantir la liaison jusqu’à la jetée | Le nombre de passagers est transmis. « La sortie est derrière toi. » |
| 8 — THE BOSS (`core__boss`) | THE BOSS lui demande ce qui reste d'un ordre lorsque personne ne surveille. Terminer l’épreuve de The Boss puis annoncer deux passagers | Le rapport clôt l’arc, sans convertir la projection en rencontre historique. « J’en répondrai quand nous serons arrivés. » |



**Rivalité prioritaire.** `core__snake` / `core__boss` — mentor / élève. The Boss éprouve la décision que Snake assumera hors du regard du commandement ; la victoire n’est pas l’exécution du duel canonique final.

**Introduction : Le poids porté.** Bivouac, ravin, départ sous la pluie. Pluie diurne, bivouac humide ; horaire créé pour cette route.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-01-naked-snake-intro-shot01 | Plan rapproché, hauteur de poitrine — Snake protège la radio sous le pan de son poncho ; le blessé reste flou derrière son épaule. Regard vers le voyant radio ; tiers droit libre. | NAKED SNAKE : Je vous reçois. Répétez l’extraction. |
| route-01-naked-snake-intro-shot02 | Plongée sur une souche, mains et sacs — Il retire des munitions d’un sac pour y placer une ration destinée au second homme. Mains au centre ; espace supérieur pour sous-titres. | Silence ; son d’ambiance prévu. |
| route-01-naked-snake-intro-shot03 | Plan large latéral au ras du ravin — Snake teste l’appui avant de charger le blessé ; les deux sacs rendent le coût matériel lisible. Regard vers le passage ; aucun adversaire en pose promotionnelle. | NAKED SNAKE : Nous passerons à deux. |



**Scène de rivalité : Ce que tu signes.** Lisière isolée du champ de fleurs, reconstruction CQC. Fin de journée sous ciel couvert ; même humidité sur les vêtements.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-01-naked-snake-rival-shot01 | Deux personnages de profil, distance ouverte — The Boss attend sans viser le blessé ; Snake pose sa charge dans un abri avant d’avancer. Regards croisés, blessé hors de l’axe des armes. | THE BOSS : Quand l’ordre se tait, qui décide ? |
| route-01-naked-snake-rival-shot02 | Insert sur les appuis et le sac resté au sol — Le pied de Snake glisse, puis se replace du côté qui protège le passage. La ligne de fuite mène vers l’extraction, non vers le sac comme trophée. | Silence ; son d’ambiance prévu. |
| route-01-naked-snake-rival-shot03 | Champ rapproché sur Snake, contrechamp réservé séparément — Il se relève sans abandonner l’accès derrière lui ; la radio reste ouverte. Visage trois quarts, tiers gauche libre. | NAKED SNAKE : Celui qui portera la décision. |



**Conclusion : Le rapport de deux hommes.** Jetée improvisée puis cabine de transport au matin. Aube grise après l’épreuve ; pluie devenue faible.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-01-naked-snake-outro-shot01 | Vue depuis l’intérieur du bateau — Le blessé franchit le seuil avant Snake ; une main de soignant prend le relais. Le cadre est fermé par la porte, à l’inverse de l’ouverture dans le ravin. | NAKED SNAKE : Deux passagers. Un blessé. |
| route-01-naked-snake-outro-shot02 | Très gros plan sur une feuille et un crayon — Snake rature une qualification de prise de guerre ; aucun mot n’est peint dans le bitmap. Gant sale à droite ; texte du rapport dans l’interface séparée. | Silence ; son d’ambiance prévu. |
| route-01-naked-snake-outro-shot03 | Plan général depuis la rive quittée — Le bateau s’éloigne ; une caisse vide et la trace des deux sacs restent au premier plan. Aucun recyclage du plan du bivouac ou de sa silhouette. | NAKED SNAKE : Demandez-moi encore de ses nouvelles quand il sera réveillé. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgs3-rassvet](../../public/cqc/assets/p60/mgs3-rassvet.png), [mgs3-dolinovodno](../../public/cqc/assets/p60/mgs3-dolinovodno.png), [mgs3-bolshaya-base](../../public/cqc/assets/p61/mgs3-bolshaya-base.png), [mgs3-ponizovje-warehouse](../../public/cqc/assets/p60/mgs3-ponizovje-warehouse.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### La leçon rendue — THE BOSS

**UID :** `core__boss` · **Route :** `route-02-the-boss` · **Période :** 1964 — incarnation MGS3 · **Continuité : alternative / projections CQC déclarées.**

Une nuit entièrement alternative laisse The Boss examiner les héritages que des projections CQC prétendent écrire à sa place. Elle transforme leurs revendications en exercices concrets, jusqu’à demander à Jack de choisir son propre appui.

**But personnel.** Transmettre une capacité de jugement sans devenir le sceau qui légitime toutes les armées futures. **Conflit intérieur.** L’élève et les héritiers cherchent dans son autorité une réponse à leur propre responsabilité.

**Retournement.** Le dernier exercice ne demande plus l’obéissance parfaite : The Boss relâche sa prise avant la fin attendue. **Conséquence.** Les insignes sont rendus, Jack quitte le champ par un autre chemin. Cette séparation sans exécution est une issue alternative CQC ; elle ne corrige pas la mort de The Boss dans MGS3.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Elle peut interroger une proposition, pas raconter l’avenir de Solidus ou de Big Boss. Les noms et dates des projections ne deviennent pas des souvenirs de 1964. |
| Costume | Sneaking Suit de The Boss MGS3, coiffure et cicatrice de la version de référence ; ne pas emprunter le modèle Δ sans variante explicite. |
| Armes et accessoires | The Patriot et couteau propres à The Boss ; l’ouverture de la main et le rangement de l’arme sont des actes, pas des accessoires interchangeables. |
| Blessures et état | Aucune survie canonique ajoutée. Les marques légères de l’exercice restent identiques entre rivalité et épilogue alternatif. |
| Ambiance | Blanc des fleurs, verts sourds et lueur précédant l’aube ; aucun montage d’insignes d’autres jeux traité comme décor historique. Frottement de tissu, souffle dans les fleurs, bruit sec des appuis ; musique suspendue lors de la prise relâchée. |



Ancres limitées : The Boss a formé Naked Snake ; son sacrifice est masqué par une accusation de trahison. Sources : [K-MGS3-STORY](https://eu-support.konami.com/hc/en-gb/articles/9731056113303-Backstory-What-is-the-story-of-Metal-Gear-Solid-3-Snake-Eater), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — IVAN RAIDENOVITCH RAIKOV (`core__raikov_mgs3`) | IVAN RAIDENOVITCH RAIKOV exige que la leçon commence par reconnaître son grade et son uniforme. Faire céder une garde fondée sur le grade | Le costume ne tient pas lieu de maîtrise. « Ton grade ne place pas tes pieds. » |
| 2 — VOLGIN (`core__volgin`) | VOLGIN veut employer le nom de The Boss comme garantie de puissance. Désarmer une prétention à posséder son nom | L’insigne cesse de garantir le discours. « Mon nom n’est pas une garantie. » |
| 3 — BIG BOSS — MG1 (`core__bigboss_mg1`) | BIG BOSS — MG1 projette une forteresse future et l'appelle accomplissement de sa volonté. Contester l’autorité d’un héritier projeté | La forteresse future reste une hypothèse du dispositif. « Montre ceux qui vivront derrière ce mur. » |
| 4 — BIG BOSS — MG2 (`core__bigboss_mg2`) | BIG BOSS — MG2 demande à d'autres soldats de recommencer éternellement leur propre guerre. Ouvrir un passage hors d’un combat sans fin | Le droit de quitter l’épreuve devient visible. « Où est la sortie pour tes soldats ? » |
| 5 — NIGHT FRIGHT (`core__night_fright`) | NIGHT FRIGHT confond la force d'une image avec la justesse d'une transmission. Dissocier image spectaculaire et maîtrise | Le geste reprend le dessus sur l’emblème. « Recommence sans le spectacle. » |
| 6 — SOLIDUS SNAKE (`core__solidus`) | SOLIDUS SNAKE porte une généalogie projetée que cette nuit ne peut encore connaître. Forcer la projection à parler pour elle-même | La généalogie ne résout pas le devoir individuel. « Je te demande ce que tu choisis. » |
| 7 — BIG BOSS — PEACE WALKER (`core__snake_pw`) | BIG BOSS — PEACE WALKER explique comment bâtir une armée pour protéger le souvenir du maître. Faire nommer le coût payé par les soldats | La mémoire du maître ne vaut pas consentement. « Ne me fais pas donner cet ordre à ta place. » |
| 8 — NAKED SNAKE (`core__snake`) | NAKED SNAKE attend encore l'ordre capable de transformer son dernier geste en mission. Amener Jack à reprendre l’échange par son propre choix | The Boss rend la décision à Jack. « Je relâche. À toi de reprendre. » |



**Rivalité prioritaire.** `core__boss` / `core__snake` — mentor / élève. Le conflit porte sur l’autonomie de Jack. Le joueur réussit une leçon imaginée, sans rejouer la mise à mort canonique depuis le point de vue inverse.

**Introduction : Les noms cousus.** Champ fictif avant la leçon. Nuit alternative avant l’aube ; rosée, vent faible.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-02-the-boss-intro-shot01 | Macro textile en lumière rasante — Un couteau coupe les points qui superposent des emblèmes sur un tissu roulé. Main identifiable de The Boss ; aucun texte lisible incorporé. | THE BOSS : On peut coudre beaucoup de choses sur un drapeau. |
| route-02-the-boss-intro-shot02 | Plongée courte sur les objets déposés — Médailles et insignes de projections reposent dans les fleurs ; ses bottes ne les écrasent pas. Objets isolés des uniformes portés ; cette table d’essai est hors histoire. | Silence ; son d’ambiance prévu. |
| route-02-the-boss-intro-shot03 | Plan américain de dos — The Boss replie le tissu et regarde Jack à l’autre bord du cercle. Vide central conservé pour l’arrivée dans le combat. | THE BOSS : Cela ne dit pas qui devra le porter. |



**Scène de rivalité : L’appui de Jack.** Cercle de fleurs de la leçon alternative. Première lumière, mêmes fleurs et traces au sol.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-02-the-boss-rival-shot01 | Plan large asymétrique — Jack avance ; The Boss ne lève pas immédiatement son arme et lui laisse l’initiative. The Boss à droite, Jack à gauche ; aucun miroir du plan d’introduction. | THE BOSS : Montre-moi le mouvement que tu as choisi. |
| route-02-the-boss-rival-shot02 | Très gros plan sur deux poignets — La prise bloque le geste puis commence à s’ouvrir ; les mains gardent leurs côtés anatomiques. Le visage reste hors champ pour lire la décision dans le geste. | Silence ; son d’ambiance prévu. |
| route-02-the-boss-rival-shot03 | Contre-plongée basse à travers les fleurs — Jack replace son pied ; The Boss s’écarte d’un demi-pas sans lui indiquer la sortie. Regards sur les appuis puis sur l’autre personne. | THE BOSS : Je peux te corriger. Je ne peux pas choisir pour toi. |



**Conclusion : Deux chemins.** Bord du chemin après l’exercice. Aube, deux sentiers humides ; issue alternative.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-02-the-boss-outro-shot01 | Plan rapproché de profil — The Boss rend un insigne sans le fixer à l’uniforme de son interlocuteur. La main ouverte est un geste de restitution, distinct du blocage rival. | THE BOSS : Garde-le. Réponds-en toi-même. |
| route-02-the-boss-outro-shot02 | Plan fixe sur une branche basse — Le tissu décousu repose sur la branche ; des fleurs froissées témoignent du passage. Personne au centre ; aucun retour au macro du premier plan. | Silence ; son d’ambiance prévu. |
| route-02-the-boss-outro-shot03 | Très grand ensemble depuis un point haut — Deux traces de pas se séparent en forêt ; aucun corps ne pose en vainqueur. Les personnages deviennent petits à deux profondeurs différentes. | THE BOSS : Cette route t’appartient. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgs3-svyatogornyj-east](../../public/cqc/assets/p61/mgs3-svyatogornyj-east.png), [mgs3-zaozyorje](../../public/cqc/assets/p61/mgs3-zaozyorje.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### La fréquence des vivants — SOLID SNAKE

**UID :** `core__solid` · **Route :** `route-03-solid-snake-mgs1` · **Période :** 2005 — MGS1 original · **Continuité : alternative / projections CQC déclarées.**

Dans une reconstruction alternative de Shadow Moses, une radio de service révèle des employés coincés derrière le plan officiel. Snake doit conserver leur liaison et une sortie praticable malgré les confrontations importées par le dispositif CQC.

**But personnel.** Faire sortir des personnes que les objectifs résumés ne comptent pas. **Conflit intérieur.** L’efficacité militaire peut réduire la mission à la cible principale et oublier ceux qui utilisent réellement les lieux.

**Retournement.** Le plan d’évacuation officiel ne correspond plus aux portes, à la chaleur et aux débris rencontrés ; Meryl apporte une information située. **Conséquence.** Un transport part avec les employés et Meryl dans cette issue alternative. Le bilan commence par les survivants, sans annoncer une nouvelle fin officielle de MGS1.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Solid Snake de Shadow Moses uniquement : pas d’OctoCamo, de SOP ni de connaissance des opérations de Raiden. Les invités étrangers sont des modèles, non des personnes qu’il aurait déjà rencontrées. |
| Costume | Sneaking Suit et bandana MGS1 original ; ne pas remplacer par The Twin Snakes, Old Snake ou le héros MSX. |
| Armes et accessoires | Armement portable de MGS1 selon la fiche combat ; radio d’employé distincte du codec. Arme abaissée quand les civils traversent l’axe. |
| Blessures et état | Poussière et fatigue s’accumulent ; aucune blessure sur les employés ne change de côté. Meryl de cette branche reste compatible avec l’action montrée. |
| Ambiance | Acier froid, ambre des éclairages de secours, neige bleu sombre ; l’aube finale doit changer la composition et l’ambiance. Ventilation, portes lourdes, porteuse radio ; moteur du transport seulement après l’ouverture réelle du garage. |



Ancres limitées : Shadow Moses est occupée par FOXHOUND en 2005 ; Solid Snake est envoyé pour infiltrer le site. Sources : [K-MGS1-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs), [K-MGS1-STORY](https://www.konami.com/mg/archive/mgs/story/index.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — REVOLVER OCELOT (`core__ocelot_mgs1`) | Ocelot coupe la liaison des employés pour attirer Snake vers lui. Rétablir l’émetteur après la confrontation | Une voix humaine reprend le canal. « Je rétablis ce canal avant de partir. » |
| 2 — MERYL — MGS1 (`core__meryl_mgs1`) | Meryl connaît une sortie que le plan officiel ne montre plus. Valider un passage avec Meryl sans la traiter en ennemie | Le détour est partagé et marqué pour les employés. « Montre-moi par où ils pourront passer. » |
| 3 — OLGA — NINJA (`core__olga_ninja`) | Olga ninja apparaît parmi les modèles importés et protège un relais. Identifier le relais protégé par un modèle étranger | L’objectif de protection est compris sans biographie inventée. « Je vois ce que tu protèges. » |
| 4 — CUNNINGHAM (`core__cunningham`) | Cunningham teste les explosions qui condamneraient l’atelier occupé des employés. Éloigner les explosions du générateur | La ventilation continue. « Pas à côté du générateur. » |
| 5 — BLACK ARTS VIPER (`core__viper`) | Viper a piégé le trajet court entre l’abri et le garage. Conserver un trajet sans piège vers le garage | Le passage est rendu vérifiable. « Cette sortie doit encore servir. » |
| 6 — SLASHER HAWK (`core__hawk`) | Hawk force Snake à quitter la couverture près du camion. Ouvrir la cour en restant à couvert | La sortie peut être ouverte depuis la cour. « Je n’ai besoin que d’une ouverture. » |
| 7 — MARIONETTE OWL (`core__owl`) | Owl plonge l’atelier dans une obscurité favorable à ses marionnettes. Maintenir le guidage radio dans le noir | Les passagers ne sont pas transformés en cibles éclairées. « Restez sur la fréquence. Je vous guide. » |
| 8 — LIQUID SNAKE (`core__liquid`) | Liquid veut réduire le combat à l’héritage de leur père. Gagner l’accès au transport et revenir aux survivants | Le duel familial cède la place à l’évacuation. « J’ai du monde à ramener. » |



**Rivalité prioritaire.** `core__solid` / `core__liquid` — ennemis / conflit d’héritage. Liquid tente de réduire Snake à la filiation ; Snake garde un objectif concret extérieur au duel. Les civils restent hors de la zone jouable.

**Introduction : Le canal de service.** Conduit, poste puis cloison condamnée. Nuit à Shadow Moses ; intérieur sous éclairage de secours, neige dehors.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-03-solid-snake-mgs1-intro-shot01 | Plan serré dans le conduit — Snake s’arrête à l’appel d’un employé ; une grille sépare son visage du couloir. Regard de côté, pas face au spectateur. | SOLID SNAKE : Votre collègue est encore dans le bâtiment ? |
| route-03-solid-snake-mgs1-intro-shot02 | Plan oblique sur la carte et la porte — Un repère du plan ne correspond pas à la porte déformée ; Snake pose la main à distance du métal chaud. Carte sans texte peint ; espace inférieur dégagé. | Silence ; son d’ambiance prévu. |
| route-03-solid-snake-mgs1-intro-shot03 | Plan d’ensemble depuis l’abri des employés — Snake donne un point de repli en passant une radio de main en main. Personnes ordinaires de tailles variées, non alignées comme un roster. | SOLID SNAKE : Gardez ce canal. Je chercherai une autre sortie. |



**Scène de rivalité : Le nom et la sortie.** Accès fictif du garage de Shadow Moses. Même nuit, garage froid et éclairage de maintenance.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-03-solid-snake-mgs1-rival-shot01 | Champ de trois quarts derrière Liquid — Liquid occupe l’axe du portail ; la radio d’employé reste dans la main basse de Snake. Le véhicule est hors de la ligne de tir. | LIQUID SNAKE : Tu peux encore choisir de quoi portera ton nom. |
| route-03-solid-snake-mgs1-rival-shot02 | Insert sur le poste radio au sol, protégé — Snake pose l’appareil à couvert avant de reprendre sa garde. Ne pas transformer cet objet en arme ou en relique officielle. | Silence ; son d’ambiance prévu. |
| route-03-solid-snake-mgs1-rival-shot03 | Plan rapproché latéral de Snake — Il regarde une dernière fois la porte, puis Liquid ; le choix précède le premier coup. Cadre ouvert vers la sortie, à l’opposé du conduit initial. | SOLID SNAKE : Ce n’est pas mon nom qu’ils attendent. |



**Conclusion : La place des passagers.** Garage éventré puis route enneigée. Début de matinée imaginé ; garage puis route neigeuse.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-03-solid-snake-mgs1-outro-shot01 | Plan large depuis l’arrière du transport — Des employés chargent eau et couverture tandis que Meryl vérifie le départ. L’activité prime sur la pose héroïque. | SOLID SNAKE : Tout le monde est là ? |
| route-03-solid-snake-mgs1-outro-shot02 | Gros plan intérieur sur la radio posée entre deux sièges — Deux mains ordinaires gardent le canal ouvert ; Snake est un reflet partiel dans la vitre. Nouvel accessoire de cadrage, sans répétition du plan du conduit. | Silence ; son d’ambiance prévu. |
| route-03-solid-snake-mgs1-outro-shot03 | Plan latéral du véhicule en mouvement lent — Snake regarde les passagers puis la route ; les lumières de la base restent loin derrière. Réserve de sous-titres dans le ciel, sans texte dans l’image. | SOLID SNAKE : Je commence par les survivants. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgs1-cargo-dock](../../public/cqc/assets/p61/mgs1-cargo-dock.png), [mgs1-blast-furnace](../../public/cqc/assets/p61/mgs1-blast-furnace.png), [mgs1-cargo-elevator](../../public/cqc/assets/p61/mgs1-cargo-elevator.png), [mgs1-jeep-escape](../../public/cqc/assets/p61/mgs1-jeep-escape.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### Six coups, trois versions — REVOLVER OCELOT

**UID :** `core__ocelot_mgs1` · **Route :** `route-04-ocelot-mgs1` · **Période :** 2005 — incarnation MGS1, simulation hors chronologie · **Continuité : alternative / projections CQC déclarées.**

Une reconstruction CQC remet à Ocelot des films incompatibles d’une exécution. Une cartouche marquée lui permet de remonter au montage. Il distribue des informations partielles et affronte les modèles chargés de les faire circuler.

**But personnel.** Garder la preuve du montage et contrôler qui reçoit chacune de ses versions. **Conflit intérieur.** Sa maîtrise de la mise en scène se heurte à un témoin qui refuse le rôle prévu.

**Retournement.** La cartouche présentée comme tirée est encore intacte ; le film est une fabrication. Le lecteur détruit et le négatif conservé n’ont pas la même valeur. **Conséquence.** Trois copies quittent le quai par des voies séparées. Ocelot laisse une caméra intacte. La réussite rend le mensonge exploitable, elle ne le transforme pas en héros sincère.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Version MGS1, pas Ocelot de MGS3 ni Liquid Ocelot. Une projection future est reconnue comme un rôle fabriqué, sans exposé anticipé de MGS4. Toute la route est hors chronologie : ses deux mains ne prouvent aucune survie ou réparation après Gray Fox. |
| Costume | Manteau, bottes et gants du modèle MGS1 ; moustache, coiffure et revolver de cette version. Garder les deux mains dans cet état de simulation défini. |
| Armes et accessoires | Revolver à six coups comme outil de mise en scène ; cartouche témoin marquée par une rayure, sans marquage lisible peint. |
| Blessures et état | Aucune amputation ou greffe ne survient dans ce scénario inventé. La rencontre avec Gray Fox est un modèle, pas une réécriture du duel historique. |
| Ambiance | Ambre d’armurerie, vert des moniteurs, gris salin du quai ; aucune interface d’époque ultérieure intégrée aux murs. Rotation du barillet, déclic de lecteur, ronflement électrique ; arrêt net des appareils après récupération du négatif. |



Ancres limitées : Revolver Ocelot est un membre de FOXHOUND et un tireur de revolver issu des Spetsnaz. Sources : [K-OCELOT](https://www.konami.com/mg/archive/mgs/character/ch08.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — MERYL — MGS1 (`core__meryl_mgs1`) | Meryl oblige Ocelot à tirer devant une caméra mal orientée. Laisser une information contrôlée au premier témoin | Le premier fragment circule. « Regardez bien ce que je vous laisse voir. » |
| 2 — LIQUID OCELOT (`core__liquid_ocelot`) | Liquid Ocelot joue une identité dont le tireur reconnaît les coutures. Identifier le rôle attendu par un double projeté | L’identité future demeure une fabrication du dispositif. « Qui t’a demandé de jouer cette version ? » |
| 3 — SKULLS — SNIPER (`core__skull_sniper`) | Les Skulls sniper attaquent depuis une ligne invisible aux caméras. Repérer les impacts invisibles aux caméras | Le vrai axe d’observation est localisé. « L’objectif est ailleurs. » |
| 4 — GRAY FOX (`core__fox`) | Gray Fox menace une main que le montage annonce déjà perdue. Obtenir un plan large qui résiste au montage | La séquence complète devient une preuve utile. « Un peu de place : je veux que tout soit visible. » |
| 5 — JOHNNY SASAKI — MGS1 (`archive__johnny_mgs1`) | Johnny a reçu deux versions incompatibles du même ordre d’escorte. Faire apparaître la contradiction entre deux ordres | Le destinataire de l’ordre contradictoire apparaît. « Lequel des deux ordres avez-vous reçu d’abord ? » |
| 6 — GENOME SOLDIER (`completion44__genome_soldier_44`) | Un Genome Soldier récite un témoignage appris avant le combat. Conserver l’hésitation du témoignage préparé | Le récit appris cesse de sembler spontané. « Vous avez appris la réponse avant la question. » |
| 7 — LIQUID SNAKE (`core__liquid`) | Liquid réclame les films avant que le tireur ait terminé l’opération. Gagner du temps pour séparer les copies | Les copies restent sous le contrôle d’Ocelot. « Le montage n’est pas encore prêt. » |
| 8 — SOLID SNAKE (`core__solid`) | Snake refuse de jouer le rôle prévu dans l’enregistrement final. Obtenir un témoin indépendant de la mise en scène | Le négatif conserve une valeur que la scène prévue n’avait pas. « Enfin un témoin qui ne répète pas son texte. » |



**Rivalité prioritaire.** `core__ocelot_mgs1` / `core__solid` — ennemis / témoin indépendant. Snake ne valide pas l’histoire truquée. Ocelot gagne l’accès à une preuve sans obtenir l’adhésion de Snake.

**Introduction : L’amorce intacte.** Armurerie et contrôle de la reconstruction. Intérieur nocturne éclairé artificiellement ; simulation hors chronologie.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-04-ocelot-mgs1-intro-shot01 | Macro sur six cartouches rangées en arc — Ocelot en isole une rayée, doigt ganté arrêté avant de l’insérer. La rayure reste sur la même cartouche dans tous les plans. | REVOLVER OCELOT : Une prise manquante suffit parfois. |
| route-04-ocelot-mgs1-intro-shot02 | Vue plongeante derrière l’épaule, trois écrans physiques — Les écrans montrent des états différents de la pièce sans texte incrusté ; sa silhouette ne les recouvre pas. Les versions sont présentées par la future interface, pas écrites par le modèle image. | Silence ; son d’ambiance prévu. |
| route-04-ocelot-mgs1-intro-shot03 | Plan bas le long d’un faisceau de câbles — Ocelot suit le câble jusqu’à une caméra oubliée au plafond. Son regard monte ; garder une vraie perspective de pièce. | REVOLVER OCELOT : Voyons qui choisit l’angle. |



**Scène de rivalité : Le témoin qui résiste.** Passerelle vide du dispositif CQC. Même session, passerelle sombre à éclairage fixe.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-04-ocelot-mgs1-rival-shot01 | Plan large avec caméra de surveillance au premier plan — Snake franchit l’axe prévu sans regarder l’objectif ; Ocelot ajuste sa position. Trois profondeurs lisibles, sans vignette de portraits. | REVOLVER OCELOT : Restez dans le cadre. |
| route-04-ocelot-mgs1-rival-shot02 | Contrechamp depuis l’angle mort — Snake déplace le support de la caméra sans tirer sur Ocelot pendant le dialogue. La preuve de l’angle mort vient de la composition. | SOLID SNAKE : Je ne joue pas pour votre rapport. |
| route-04-ocelot-mgs1-rival-shot03 | Gros plan oblique sur le revolver abaissé — Ocelot sourit légèrement, puis referme le barillet pour commencer le duel. Deux mains MGS1, aucun bras greffé. | REVOLVER OCELOT : C’est ce qui vous rend intéressant. |



**Conclusion : Les copies séparées.** Cabine de montage, quai et coursive. Fin de session, quai froid puis coursive ; pas de météo nouvelle sans raccord.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-04-ocelot-mgs1-outro-shot01 | Insert sur une boîte ouverte et une bande rangée — La cartouche intacte est posée à côté de la preuve récupérée ; le lecteur est hors service. La bande ne porte aucun texte peint. | REVOLVER OCELOT : La preuve n’a pas besoin du lecteur. |
| route-04-ocelot-mgs1-outro-shot02 | Plan d’ensemble à travers une grue du quai — Trois petits colis sont orientés vers trois chargements distincts ; Ocelot n’est pas au centre. Éviter de réutiliser le cadrage large de la passerelle rivale. | Silence ; son d’ambiance prévu. |
| route-04-ocelot-mgs1-outro-shot03 | Plan de dos dans une coursive déserte — Ocelot lève une main vers la seule caméra laissée active et s’éloigne. Le barillet est rangé ; le voyant ne devient pas une interface moderne. | REVOLVER OCELOT : Celle-ci peut rester. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgs1-cargo-dock](../../public/cqc/assets/p61/mgs1-cargo-dock.png), [mgs1-cargo-elevator](../../public/cqc/assets/p61/mgs1-cargo-elevator.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### Ce que j’ai fait autrement — RAIDEN — MGS2

**UID :** `core__raiden_mgs2` · **Route :** `route-05-raiden-mgs2` · **Période :** 2009 — MGS2 Plant, exercice alternatif après les doutes · **Continuité : alternative / projections CQC déclarées.**

Une simulation félicite Raiden alors qu’un appel derrière une porte n’a jamais compté dans ses objectifs. Il recommence en tenant un carnet des décisions que le score ignore. Les modèles futurs restent inconnus de l’acteur.

**But personnel.** Évaluer ses actes au-delà du résultat recommandé, puis pouvoir en parler hors du cadre militaire. **Conflit intérieur.** La réussite parfaite lui sert d’identité tant qu’il n’a pas à raconter les choix qu’elle a supprimés.

**Retournement.** La porte était factice et l’appel préenregistré : ce constat ne dispense pas Raiden d’examiner pourquoi il l’a ignoré. **Conséquence.** Il garde les pages raturées et parle à Rose sans réciter son score. Cet après-exercice est une création CQC, pas un épisode officiel ajouté à sa biographie.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Raiden humain de Big Shell. Il ignore sa future conversion cyborg et ne reconnaît ni Armstrong ni Sam comme des rencontres de son avenir. Les modèles affichés au joueur ne lui transmettent pas ce savoir. |
| Costume | Sneaking Suit MGS2 Plant, visage et cheveux de cette incarnation ; jamais corps MGS4, MGR amélioré ou R-00. |
| Armes et accessoires | Arsenal de MGS2 limité à l’étape choisie. Dans cet exercice tardif, toute utilisation du sabre exige une fiche de version explicite ; pas de découpe surhumaine MGR. |
| Blessures et état | Fatigue humaine cohérente, aucune pièce cybernétique ni régénération empruntée à MGR. |
| Ambiance | Blanc froid du centre, gris de la mer puis lumière extérieure douce ; le livre reste un objet analogique sans textes fondus dans l’image. Son de validation trop bref, froissement des pages, appel étouffé derrière la porte, silence de conversation. |



Ancres limitées : Le chapitre Plant place Raiden à Big Shell en 2009 pour une mission d’infiltration. Sources : [K-MGS2-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs2), [K-MGS2-PLANT](https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — RAIDEN — VR (`archive__raiden_vr`) | Raiden VR reproduit la victoire parfaite qui avait laissé l’appel sans réponse. Revenir vérifier l’appel malgré la réussite affichée | Le carnet commence par un écart au score. « Le résultat oublie une porte. » |
| 2 — OLGA — NINJA (`core__olga_ninja`) | Le ninja d’Olga interrompt le duel pour lui indiquer un accès secondaire. Suivre une aide sans lui inventer une identité complète | L’aide reçue est notée sans omniscience. « Je peux suivre le passage sans tout savoir de toi. » |
| 3 — BLOODY BRAD (`core__bloody_brad`) | Bloody Brad impose la force comme réponse unique au problème présenté. Trouver un détour plutôt qu’une seule réponse de force | L’action utile est conservée même si elle est moins spectaculaire. « Il y a peut-être une autre entrée. » |
| 4 — STEVEN ARMSTRONG (`core__armstrong`) | Armstrong promet une liberté qui exige d’abord d’adopter entièrement ses règles. Formuler une objection à une consigne totalisante | Une objection personnelle remplace la récitation. « Ce n’est pas parce que tu me le proposes que je le choisis. » |
| 5 — JETSTREAM SAM (`core__sam`) | Sam transforme chaque hésitation en erreur que le programme veut corriger. Choisir un risque utile au lieu d’un geste parfait | La maladresse peut accompagner un choix assumé. « Laisse-moi décider ce que vaut ce risque. » |
| 6 — TENGU SOLDIER (`completion44__tengu_soldier_44`) | Le Tengu contrôle une porte qui ne figure toujours dans aucun objectif. Contrôler la porte négligée avant de fermer l’étape | La porte est contrôlée sans effacer le temps perdu. « Je vérifie d’abord qui appelle. » |
| 7 — RAIDEN (`core__raiden`) | Le modèle cyborg de Raiden tente de donner un visage définitif à sa force. Distinguer un modèle projeté de son avenir certain | Raiden ne reçoit aucun souvenir du futur. « Tu es un modèle. Pas une promesse. » |
| 8 — SOLIDUS SNAKE (`core__solidus`) | Solidus veut fixer ce que Raiden doit devenir à partir de son passé. Garder la dernière décision hors du rôle imposé | La dernière page reste ouverte après l’exercice. « Je répondrai de la suite. » |



**Rivalité prioritaire.** `core__raiden_mgs2` / `core__solidus` — autorité imposée / identité contestée. La confrontation éprouve le droit de Raiden à décrire ses choix. Le Solidus du module est une projection du conflit MGS2 ; il ne révèle pas de faits de l’ère MGR.

**Introduction : La porte non comptée.** Vestiaire et couloir de simulation. Centre VR sous lumière blanche constante ; aucun jour canonique revendiqué.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-05-raiden-mgs2-intro-shot01 | Plan moyen depuis le casier ouvert — Raiden s’arrête devant son équipement tandis qu’une lumière de succès s’allume hors champ. Les plaques restent à la bonne hauteur ; aucun classement peint. | RAIDEN — MGS2 : J’ai entendu quelqu’un derrière la porte. |
| route-05-raiden-mgs2-intro-shot02 | Plan fixe à hauteur de serrure — Sa main touche une porte sans fonction ; le couloir blanc se prolonge derrière lui. La serrure factice est lisible sans gros plan d’interface. | Silence ; son d’ambiance prévu. |
| route-05-raiden-mgs2-intro-shot03 | Plongée sur un carnet vierge posé sur le banc — Raiden trace une première ligne et garde la clé dans la paume. La future typographie sera une couche de texte séparée. | RAIDEN — MGS2 : Je veux aussi garder ce que le score n’a pas compté. |



**Scène de rivalité : La page imposée.** Salle finale du centre CQC. Même session sous éclairage artificiel.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-05-raiden-mgs2-rival-shot01 | Plan d’ensemble avec deux axes de fuite — Solidus projeté ferme la sortie prévue ; une seconde porte reste visible mais éloignée. Les deux personnages sont MGS2 ; pas de silhouettes cyborg invitées. | SOLIDUS SNAKE : Tu peux encore remplir le rôle qu’on t’a donné. |
| route-05-raiden-mgs2-rival-shot02 | Insert sur le carnet au bord d’une marche — Raiden ferme le carnet sans arracher les pages mal écrites. La clé reste à côté ; continuité matérielle avec l’introduction. | Silence ; son d’ambiance prévu. |
| route-05-raiden-mgs2-rival-shot03 | Plan serré sur le visage humain de Raiden — Il cesse de regarder le signal d’ordre et regarde son adversaire. Cadre horizontal, regard net, marge de sous-titres basse. | RAIDEN — MGS2 : Alors ce rôle devra attendre ma réponse. |



**Conclusion : Le récit sans classement.** Salle de repos, sortie puis rive fictive. Après-session en journée dans la fiction ; mer calme et lumière douce.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-05-raiden-mgs2-outro-shot01 | Vue rapprochée par-dessus l’épaule — Raiden relit des pages raturées ; il referme le carnet sans les remplacer. Les ratures sont graphiques, le texte reste hors bitmap. | RAIDEN — MGS2 : Je ne vais pas réécrire les moments où j’ai hésité. |
| route-05-raiden-mgs2-outro-shot02 | Plan latéral à travers la porte extérieure — Il reste en communication avec Rose alors que la lumière du centre s’éteint derrière lui. Rose est une interlocutrice distante, pas un modèle MGS4 importé. | Silence ; son d’ambiance prévu. |
| route-05-raiden-mgs2-outro-shot03 | Plan large depuis l’autre rive d’un banc — Le carnet repose à côté de lui ; il relève la tête à l’arrivée d’une personne hors champ. Composition ouverte, différente du couloir fermé. | RAIDEN — MGS2 : Je vais te raconter autre chose que mon score. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgs2-strut-b](../../public/cqc/assets/p60/mgs2-strut-b.png), [mgs2-shell1-hostages](../../public/cqc/assets/p61/mgs2-shell1-hostages.png), [mgs2-arsenal-stomach](../../public/cqc/assets/p61/mgs2-arsenal-stomach.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### Après le dernier coup — RAIDEN

**UID :** `core__raiden` · **Route :** `route-06-raiden-mgr` · **Période :** 2018 — ère Revengeance, corps amélioré après le prologue · **Continuité : alternative / projections CQC déclarées.**

Après une opération imaginée dans un laboratoire, les personnes secourues ont encore besoin d’un transfert médical. Raiden doit conserver une route accessible à des roues ordinaires malgré huit modèles de combat qui promettent chacun une fin spectaculaire.

**But personnel.** Rendre le sauvetage utile après le dernier coup, puis rester disponible pour une aide qui ne demande pas de lame. **Conflit intérieur.** Son corps franchit des obstacles que les techniciens et les personnes transportées ne peuvent pas franchir.

**Retournement.** La route la plus rapide pour lui condamne le transfert ; il redescend au sol et rend les passages praticables. **Conséquence.** Le transfert atteint un centre de soins. Raiden revient plus tard pour une tâche ordinaire ; aucun duel ne promet une réparation instantanée de toutes les victimes.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Raiden de Revengeance avec son vécu antérieur. Ses incarnations passées sont des comparaisons mémorielles du module, jamais des partenaires temporels. Le corps du prologue R-00 reste un autre UID. |
| Costume | Corps cyborg amélioré de MGR, matériaux, visière, talons et proportions contrôlés par la fiche de référence ; exclure R-00 et MGS4. |
| Armes et accessoires | Lame HF du chargement choisi ; garder le même fourreau et la même main entre plans. Aucun passage automatique à Murasama sans étape et source explicites. |
| Blessures et état | Usure du corps après l’opération ; état technique à verrouiller avant image. Ne pas donner de membres cyborg aux patients ou aux techniciens anonymes. |
| Ambiance | Éclairage technique du laboratoire, rouges d’alarme mesurés puis lumière neutre des soins ; ne pas réutiliser le coucher de soleil du duel pour l’attente. Bip médical, roulement des chariots, pas métalliques ; absence de triomphe musical pendant le transfert. |



Ancres limitées : Revengeance se situe quatre ans après MGS4 ; Raiden est un cyborg soutenu par Maverick et Doktor. 2018 résulte de 2014 pour MGS4 et de l’intervalle de quatre ans indiqué par Konami. Sources : [K-MGR-STORY](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series), [K-MGS4-HISTORY](https://www.konami.com/mg/history/jp/ja/mgs4), [K-MGR-DEVELOPER](https://www.platinumgames.com/works/metal-gear-rising-revengeance), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — JETSTREAM SAM (`core__sam`) | Sam propose un duel assez net pour sembler terminer toute l’affaire. Conserver le transfert comme objectif après le duel | La victoire ne ferme pas la mission. « Leur route ne s’arrête pas avec notre duel. » |
| 2 — MISTRAL (`core__mistral`) | Mistral bloque un passage que les techniciens ne peuvent franchir en courant. Libérer un passage accessible aux techniciens | Les roues peuvent franchir le passage. « Ils ne peuvent pas sauter par-dessus. » |
| 3 — RED BLASTER (`core__redblaster_mg2`) | Red Blaster menace de détruire les dalles sur le trajet du transport. Empêcher la destruction des dalles utiles | Une voie stable demeure. « Il me faut encore ce sol. » |
| 4 — VENUS (`core__venus`) | Venus interroge une condition de victoire limitée au nombre d’adversaires vaincus. Comparer la règle affichée au besoin réel | Le score cesse d’être la seule mesure du sauvetage. « Ajoute ceux qu’on laisse derrière au résultat. » |
| 5 — SOLIDUS SNAKE (`core__solidus`) | Solidus veut définir Raiden par le soldat qu’il a contribué à produire. Refuser d’être défini par un ancien rôle militaire | L’origine militaire ne confisque pas l’action suivante. « Tu ne décides pas de ce que j’en ferai. » |
| 6 — RAIDEN — MGS4 (`core__raiden_mgs4`) | Raiden MGS4 rappelle une survie souvent dépensée au service d’un autre héros. Garder des moyens pour la tâche qui suit | Le corps peut encore escorter le transport. « Il faut aussi durer après. » |
| 7 — RAIDEN — MGS2 (`core__raiden_mgs2`) | Raiden MGS2 cherche une conclusion qui donnerait enfin une identité stable. Ne pas transformer son ancien corps en identité unique | Les incarnations restent distinctes. « Aucun de nous n’est une réponse complète. » |
| 8 — STEVEN ARMSTRONG (`core__armstrong`) | Armstrong affirme que la puissance suffit à décider qui mérite de vivre. Terminer l’affrontement sans abandonner la route médicale | Le récit rejoint le transfert au lieu de finir sur la pose de combat. « Ils auront un après. » |



**Rivalité prioritaire.** `core__raiden` / `core__armstrong` — ennemis / doctrines incompatibles. Armstrong sert de modèle adverse à une liberté réduite à la force. La confrontation est une simulation de la route, pas une seconde victoire historique ni une réanimation.

**Introduction : L’alarme encore active.** Laboratoire et trajet technique. Laboratoire à éclairage technique ; météo extérieure non visible.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-06-raiden-mgr-intro-shot01 | Plan large à travers des équipements fixes — Raiden écoute une alarme encore allumée dans une salle où les écrans de combat sont éteints. Aucun patient exposé comme objet de spectacle. | RAIDEN : Doktor, le transfert n’est pas terminé. |
| route-06-raiden-mgr-intro-shot02 | Contre-plongée depuis une roue de chariot — Une rupture de niveau barre le trajet ; Raiden, déjà sur la passerelle, regarde vers les techniciens restés au sol. L’écart d’accessibilité se lit dans la profondeur. | Silence ; son d’ambiance prévu. |
| route-06-raiden-mgr-intro-shot03 | Plan latéral bas — Il redescend et marque une trajectoire au sol avant de dégager un obstacle. Marque sans texte peint ; lame orientée loin des personnes. | RAIDEN : Nous passons par ici, tous au même niveau. |



**Scène de rivalité : Ceux qui auront un après.** Espace comparatif CQC inspiré de l’ère MGR. Espace comparatif, lumière latérale de test sans prétention météo historique.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-06-raiden-mgr-rival-shot01 | Plan large triangulaire — Armstrong projeté occupe la ligne directe ; derrière Raiden, le passage utile est matérialisé au sol. Aucun patient dans l’arène ; le décor n’est pas un centre médical historique. | STEVEN ARMSTRONG : Tu mesures encore ta force à leur lenteur. |
| route-06-raiden-mgr-rival-shot02 | Insert sur le pied cyborg au bord d’une dalle — Raiden teste la dalle avant de prendre appui, montrant qu’elle doit rester utilisable. Garder la morphologie exacte du pied MGR. | Silence ; son d’ambiance prévu. |
| route-06-raiden-mgr-rival-shot03 | Plan américain de trois quarts — Sa lame se lève sans quitter la ligne de circulation du regard. Espace libre au-dessus du passage pour les sous-titres. | RAIDEN : Elle devra encore les porter après nous. |



**Conclusion : La garde sans duel.** Cour de transfert et centre de soins inventés. Transfert en journée ; dernier plan quelques jours plus tard, temps calme.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-06-raiden-mgr-outro-shot01 | Plan d’ensemble au niveau des chariots — Les techniciens roulent sans saut ; Raiden vérifie une dalle puis recule pour laisser passer. Ni explosion de victoire, ni posture de finisher. | RAIDEN : Le passage tient. Continuez. |
| route-06-raiden-mgr-outro-shot02 | Plan rapproché d’un écran de communication posé sur une table — Raiden écoute Doktor ; les mains restent éloignées de la lame rangée. Informations médicales génériques dans la couche de texte future. | Silence ; son d’ambiance prévu. |
| route-06-raiden-mgr-outro-shot03 | Plan fixe de salle d’attente, à distance humaine — Quelques jours plus tard dans cette fiction, Raiden attend avec du matériel ordinaire à côté d’autres accompagnants. Nouvel espace, nouvelle tenue d’accessoires, corps MGR inchangé. | RAIDEN : Dites-moi ce qui sera utile la prochaine fois. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgr-guadalajara-lab](../../public/cqc/assets/p61/mgr-guadalajara-lab.png), [mgr-guadalajara-sewers](../../public/cqc/assets/p61/mgr-guadalajara-sewers.png), [mgr-wm-office](../../public/cqc/assets/p61/mgr-wm-office.png), [mgr-pakistan-hangar](../../public/cqc/assets/p61/mgr-pakistan-hangar.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### La cible sous la neige — SNIPER WOLF

**UID :** `core__wolf` · **Route :** `route-07-sniper-wolf` · **Période :** 2005 — nuit alternative dans Shadow Moses · **Continuité : alternative / projections CQC déclarées.**

Wolf repère un employé retourné auprès d’un animal blessé alors que la fermeture d’une annexe est ordonnée. Sans changer de camp, elle modifie ses positions pour que la sortie ne devienne pas une ligne de tir. Les adversaires étrangers sont des modèles CQC.

**But personnel.** Préserver un passage vers le chenil sans confondre précision et indifférence. **Conflit intérieur.** Observer longtemps peut aussi enfermer autrui dans le seul rôle d’une cible.

**Retournement.** La bonne position de tireuse doit être abandonnée pour maintenir une couverture utile à l’employé et à l’animal. **Conséquence.** Wolf couvre le départ et reprend son poste. Cette issue alternative ne sauve pas rétroactivement la Wolf du récit officiel et n’efface pas son rôle dans FOXHOUND.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Sniper Wolf MGS1, pas Crying Wolf, Quiet ou une Sniper Skulls. Les comparaisons du dispositif n’établissent pas des liens de parenté, de rencontre ou d’entraînement. |
| Costume | Tenue MGS1 de Sniper Wolf, cheveux et silhouette de référence ; garder l’état du gant rouge comme accessoire de projet distinct. |
| Armes et accessoires | Fusil de précision de la version MGS1. Aucun railgun de Crying Wolf ni pouvoir des Skulls transféré au personnage. |
| Blessures et état | Fatigue d’attente ; blessure de l’animal toujours hors de l’axe de combat. L’animal ne devient jamais une cible ou un projectile. |
| Ambiance | Neige bleu gris, laine et métal froid, point rouge du gant ; préserver une couleur unique qui ne devient pas un marqueur de danger. Vent, réglage du fusil, pas feutrés ; son des roues ou du convoi au loin, jamais cri d’animal comme récompense. |



Ancres limitées : Sniper Wolf appartient à FOXHOUND ; les documents officiels lui attribuent le soin des wolfdogs de la base. Sources : [K-WOLF](https://www.konami.com/mg/archive/mgs/character/ch10.html), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — PSYCHO MANTIS (`core__mantis`) | Mantis veut expliquer pourquoi Wolf garde si longtemps le chenil. Garder l’intention à distance d’une intrusion mentale projetée | La décision demeure privée. « Ce que je regarde ne te regarde pas. » |
| 2 — REVOLVER OCELOT (`core__ocelot_mgs1`) | Ocelot exige la fermeture du secteur avant l’évacuation des animaux. Maintenir l’ouverture du secteur malgré l’ordre | Le verrou ne condamne pas le passage. « Le couloir n’est pas fermé. » |
| 3 — SKULLS — SNIPER (`core__skull_sniper`) | Les Skulls sniper copient une précision débarrassée de toute hésitation. Prendre une position qui voit réellement le passage | La précision sert un trajet humain. « La trace que tu suis n’est pas une cible. » |
| 4 — ED — RAT PATROL (`core__ed_mgs4`) | Ed vérifie un angle qu’aucun tireur solitaire ne pourrait protéger. Vérifier l’angle mort grâce à un modèle comparatif | L’angle mort est reconnu, pas magiquement supprimé. « Cet angle reste à couvrir. » |
| 5 — CRYING WOLF (`core__crying_wolf`) | Crying Wolf transforme le terrain en chasse contre des silhouettes perdues. Éloigner une machine projetée des traces au sol | Les traces cessent de guider une chasse. « Change de piste. » |
| 6 — BLADE WOLF / LQ-84I (`core__blade_wolf`) | Blade Wolf calcule un trajet plus sûr pour rejoindre la lisière. Tester un itinéraire sans assimilations entre loups | Une sortie est découverte par l’exercice. « Montre le passage, pas ton nom. » |
| 7 — VULCAN RAVEN (`core__raven`) | Raven reconnaît le détour sans accepter de lui céder sa position. Obtenir la ligne de couverture sans livrer les protégés | Le vent et la couverture sont obtenus. « Il me faut cette ligne. » |
| 8 — SOLID SNAKE (`core__solid`) | Snake traverse la cour où elle doit attirer l’ultime confrontation. Attirer la confrontation hors du chenil et ouvrir le départ | Le convoyage peut partir pendant que Wolf reste à distance. « Plus loin. Le combat sera plus loin. » |



**Rivalité prioritaire.** `core__wolf` / `core__solid` — ennemis / duel déplacé. Le duel doit préserver une zone interdite au tir. La victoire CQC ne prétend pas rejouer le résultat historique de leur affrontement.

**Introduction : La silhouette qui revient.** Tour, grillage puis galerie des loups. Nuit neigeuse avec faible vent, visibilité limitée.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-07-sniper-wolf-intro-shot01 | Vue longue depuis le poste de Wolf sans réticule peint — Un employé revient vers un gant rouge accroché au grillage et un animal qui ne le suit pas. La lunette éventuelle sera un overlay futur ; le bitmap reste plein cadre. | SNIPER WOLF : Il revient encore. |
| route-07-sniper-wolf-intro-shot02 | Plan de détail à hauteur du verrou — Une main retire la pile du verrou puis glisse une couverture près d’une issue. Conserver la même couverture jusqu’au dernier trajet. | Silence ; son d’ambiance prévu. |
| route-07-sniper-wolf-intro-shot03 | Plan large du poste quitté — Wolf descend de sa position, fusil près du corps, laissant un angle vide derrière elle. La décision se lit par la place abandonnée. | SNIPER WOLF : Alors je change d’angle. |



**Scène de rivalité : Hors du chenil.** Cour secondaire de la nuit alternative. Même nuit et même vent ; traces maintenues entre les plans.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-07-sniper-wolf-rival-shot01 | Plan large de profil avec deux issues séparées — Snake arrive ; Wolf garde son arme dans un axe qui exclut la sortie des protégés. Le chenil n’est jamais dans le prolongement du canon. | SNIPER WOLF : Pas dans ce couloir. |
| route-07-sniper-wolf-rival-shot02 | Insert sur deux séries de traces dans la neige — Les pas de l’employé et les marques de la couverture quittent la cour dans une autre direction. Les personnages restent hors champ, aucun sang gratuit. | Silence ; son d’ambiance prévu. |
| route-07-sniper-wolf-rival-shot03 | Plan rapproché sur Snake, Wolf au second plan — Snake déplace sa garde pour suivre le duel plus loin de l’issue. Axes anatomiques et orientation du fusil vérifiés. | SOLID SNAKE : Tu as donc une autre raison de rester ici. |



**Conclusion : La ligne gardée.** Poste secondaire, local vide et lisière. Fin de nuit vers l’aube ; couverture et traces encore humides.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-07-sniper-wolf-outro-shot01 | Vue depuis une fenêtre latérale ouverte — L’employé porte l’animal dans la couverture ; Wolf observe depuis un poste différent. Ni cadrage de lunette ni copie du plan du grillage. | SNIPER WOLF : Le passage est encore libre. |
| route-07-sniper-wolf-outro-shot02 | Gros plan sur une gamelle remplie et le gant rendu — Wolf prend le gant dans un local désormais vide ; le fusil est rangé contre elle. Objet d’origine conservé, composition et action nouvelles. | Silence ; son d’ambiance prévu. |
| route-07-sniper-wolf-outro-shot03 | Très grand ensemble de lisière — Les dernières lumières du convoi disparaissent ; la silhouette de Wolf reste petite dans la neige. L’horizon remplace les barreaux de l’introduction. | SNIPER WOLF : J’attendrai qu’ils aient quitté la ligne. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [mgs1-wolf-cave](../../public/cqc/assets/p61/mgs1-wolf-cave.png), [mgs1-first-wolf](../../public/cqc/assets/p61/mgs1-first-wolf.png), [mgs1-cargo-elevator](../../public/cqc/assets/p61/mgs1-cargo-elevator.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### L’homme derrière le salut — VENOM SNAKE

**UID :** `core__venom` · **Route :** `route-08-venom-snake` · **Période :** 1984 — incarnation MGSV, variation après révélation de son identité · **Continuité : alternative / projections CQC déclarées.**

Dans un théâtre intérieur explicitement alternatif, Venom remet un visage et un coût humain derrière le salut adressé à Big Boss. Des incarnations impossibles interrogent sa légende ; ses actes de soin ne leur appartiennent pas.

**But personnel.** Décider ce qu’il doit aux hommes qui le saluent, même lorsqu’un autre nom désigne son rôle. **Conflit intérieur.** La reconnaissance militaire peut remplacer la personne par une silhouette attendue.

**Retournement.** Le dernier modèle réclame la propriété du nom, mais ne peut pas reprendre les gestes accomplis par Venom. **Conséquence.** Il consulte les blessés avant les résultats, vérifie les moyens du prochain départ et accepte de répondre au salut sans prétendre retrouver une identité intacte.

| Continuité de production | Prescription |
| --- | --- |
| Savoir du personnage | Variation située après la révélation déjà indiquée par la Chronique héritée. Les modèles de Zanzibar et Ghost Babel restent des constructions CQC, sans prescience du Venom historique. Ce module doit être masqué par un avertissement de spoilers MGSV. |
| Costume | Venom MGSV : cache-œil du bon côté, éclat frontal et bras bionique gauche, tenue choisie dans la fiche combat. Ni visage de Ground Zeroes substitué ni manche symétrique. |
| Armes et accessoires | Armement MGSV conforme au chargement verrouillé ; la main mécanique manipule le gant dans le premier mouvement, la main humaine dans le second. |
| Blessures et état | Lésions caractéristiques de Venom stables ; fatigue sans guérison magique du miroir ou du visage. |
| Ambiance | Cabine sombre, blancs médicaux mesurés, acier humide et horizon océanique ; miroir fendu constant, sans effet surnaturel ajouté. Rotor lointain, pages de registre, pas sur la plateforme ; cassette arrêtée, jamais voix canonique imitée. |



Ancres limitées : The Phantom Pain se déroule en 1984 ; Venom est un UID distinct des autres Snake dans le projet. Le placement après la révélation et le motif du médecin proviennent du récit alternatif déjà présent ; contrôle primaire de ce détail requis avant prétention canonique indépendante. Sources : [K-TPP](https://eu-support.konami.com/hc/en-gb/articles/9666546497047-Metal-Gear-Solid-V-The-Phantom-Pain), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-CHRONICLES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js), [R-ROSTER](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json), [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt). Les capacités de combat sont à croiser avec [COMBAT.md](COMBAT.md).

**Huit rencontres motivées.** Les invités d’autres époques sont affichés comme projections comparatives ; leurs UID permettent de choisir une version, pas de certifier qu’ils se sont rencontrés.

| Étape / adversaire | Motif et objectif proposé | Conséquence / réplique créée |
| --- | --- | --- |
| 1 — BIG BOSS — GROUND ZEROES (`core__snake_gz`) | Big Boss de Ground Zeroes porte le visage avant la substitution. Distinguer le visage modèle de l’acte accompli | La ressemblance ne remplace pas la personne. « Le visage ne répondra pas pour moi. » |
| 2 — QUIET (`core__quiet`) | Quiet observe sa main avant d’épauler son fusil dans cet écho. Reconnaître une entente gestuelle sans lui ajouter de discours | Quiet ne reçoit pas de réplique parlée inventée. « Je te suis. » |
| 3 — SOLID SNAKE — GHOST BABEL (`core__snake_gb`) | Snake de Ghost Babel refuse une légende qu’il n’a pas choisie. Comparer deux noms sans fusionner leurs continuités | Ghost Babel demeure une continuité séparée. « Nous n’avons pas vécu la même mission. » |
| 4 — NAKED SNAKE — PORTABLE OPS (`core__snake_mpo`) | Le Snake de Portable Ops rassemble déjà des soldats autour de lui. Remettre les visages de l’équipe derrière le recrutement | Le groupe existe au-delà du chef. « Qui rentre avec ton équipe ? » |
| 5 — MARIONETTE OWL (`core__owl`) | Night Owl cherche la faille sous l’apparence de commandant. Protéger une vulnérabilité au lieu de la nier | La mémoire du soin reste visible. « Je sais ce qu’il reste à protéger. » |
| 6 — JUNGLE EVIL (`core__jungle_evil`) | Jungle Evil transforme le décor en piège pour une silhouette attendue. Changer un trajet prévu pour une silhouette attendue | La copie cesse de dicter la route. « Le parcours peut encore changer. » |
| 7 — OCELOT — MGSV (`core__ocelot_mgsv`) | Ocelot reconnaît les gestes appris pendant les années volées. Distinguer les gestes appris des décisions prises | L’instruction ne devient pas propriété de toutes ses actions. « J’ai appris le geste. La décision vient après. » |
| 8 — BIG BOSS — MG2 (`core__bigboss_mg2`) | Big Boss de Zanzibar réclame la force de sa propre légende. Refuser que le nom absorbe la responsabilité de ses actes | Les blessés, puis le prochain départ, reprennent la priorité. « Ils se souviennent de qui était là. » |



**Rivalité prioritaire.** `core__venom` / `core__bigboss_mg2` — comparaison impossible / identité revendiquée. Le Big Boss MG2 est une projection du dossier CQC. Le conflit ne constitue ni rencontre chronologique, ni message envoyé par le Big Boss historique à Venom.

**Introduction : Le salut et la personne.** Cabine, infirmerie et pont de Mother Base imaginés. Cabine et infirmerie de nuit ; extérieur humide, rotor lointain.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-08-venom-snake-intro-shot01 | Plan serré oblique sur un miroir — Venom retire une photo dont le bord cachait une fente ; le reflet ne se transforme pas en un autre acteur. Bras bionique gauche respecté malgré le reflet ; ne jamais inverser gratuitement. | VENOM SNAKE : Ce visage ne suffit pas à répondre. |
| route-08-venom-snake-intro-shot02 | Plan moyen à hauteur de lit — Il prend un gant oublié avec la main mécanique, puis recommence avec l’autre main. Les deux gestes exigent deux moments, pas une main surnuméraire. | Silence ; son d’ambiance prévu. |
| route-08-venom-snake-intro-shot03 | Plan large latéral du pont — Une recrue salue ; Venom regarde vers l’infirmerie avant de rendre le salut. La recrue n’est pas un combat obligatoire. | VENOM SNAKE : Le blessé a-t-il été vu ? |



**Scène de rivalité : Le propriétaire du nom.** Espace mental CQC, sans date historique commune. Théâtre intérieur sans météo réelle ; état physique inchangé.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-08-venom-snake-rival-shot01 | Deux profils séparés par une ligne de lumière — Le modèle MG2 occupe un côté ; Venom reste dans sa tenue MGSV de l’autre. Aucun fondu des visages, aucun costume hybride. | BIG BOSS — MG2 : Ce nom avait déjà une histoire. |
| route-08-venom-snake-rival-shot02 | Insert sur une plaque tenue dans la main humaine — Le métal est marqué par l’usage ; l’avant-bras mécanique reste visible plus bas. Le texte éventuel appartient à la couche typographique. | Silence ; son d’ambiance prévu. |
| route-08-venom-snake-rival-shot03 | Plan rapproché à hauteur d’homme — Venom referme la main et reprend sa garde sans saluer le modèle. Le regard ne cherche plus le miroir. | VENOM SNAKE : Mes hommes étaient là pour la suite. |



**Conclusion : Le prochain départ.** Coursive, infirmerie au matin, pont inférieur. Aube maritime dans cette variation ; pont inférieur humide.

| Plan neuf réservé | Cadrage, action et regard | Dialogue créé / silence |
| --- | --- | --- |
| route-08-venom-snake-outro-shot01 | Plan rapproché sur une décoration laissée sur son support — Venom passe sans la prendre ; son épaule reste lourde après l’épreuve. Objet placé au bord du cadre, non au centre comme une récompense. | VENOM SNAKE : Le compte des blessés d’abord. |
| route-08-venom-snake-outro-shot02 | Plongée sur un registre et un brancard contrôlé — Il corrige une ration oubliée puis vérifie une sangle ; aucun nom médical lisible peint. Différent du plan sur le lit et le gant en introduction. | Silence ; son d’ambiance prévu. |
| route-08-venom-snake-outro-shot03 | Plan très large depuis le pont inférieur — Le départ se prépare loin au-dessus ; Venom reste un instant auprès du matériel. L’horizon ouvert remplace le miroir ; aucune simple reprise du salut initial. | VENOM SNAKE : Vérifiez les brancards avant le départ. |



**Reprise.** Échec local de l’épreuve, sans mort canonique ajoutée. Réessai au dernier duel avec objectif et contrainte rappelés. Rappel du but humain, de l’étape, du lieu, de la nature des projections et de l’état du costume.

**Références de lieu disponibles.** [tpp-wialo](../../public/cqc/assets/p61/tpp-wialo.png), [tpp-fob](../../public/cqc/assets/p61/tpp-fob.png), [tpp-quarantine](../../public/cqc/assets/p61/tpp-quarantine.png). Leur présence ne couvre pas automatiquement les espaces fictifs ni les cadrages du récit. Chaque scène conserve un nouvel identifiant et un chemin d’image vide.

### Liens avec les fiches de combat

| Pilote | Lien de neutralisation documenté, distinct de l’outro |
| --- | --- |
| core__snake | Prise de silence — `p62:neutralisation:core__snake` |
| core__boss | Dernière leçon — `p62:neutralisation:core__boss` |
| core__solid | Objectif sécurisé — `p62:neutralisation:core__solid` |
| core__ocelot_mgs1 | Dernière chambre — `p62:neutralisation:core__ocelot_mgs1` |
| core__raiden_mgs2 | Lame libérée — `p62:neutralisation:core__raiden_mgs2` |
| core__raiden | Circuit interrompu — `p62:neutralisation:core__raiden` |
| core__wolf | Ligne de mire — `p62:neutralisation:core__wolf` |
| core__venom | Extraction silencieuse — `p62:neutralisation:core__venom` |

Les huit objets `combatPilotReference` du registre pointent vers [combat-pilots.json](combat-pilots.json). Les noms sont créés pour le projet ; aucune animation ou intégration de ces neutralisations n’est déduite de ce lien.

## 5. Production des scènes et emploi des sources P60/P61

Les 36 séquences possèdent chacune trois plans, soit 108 identifiants de production uniques. Les 24 séquences de routes et les 12 séquences de campagne sont disjointes. Chaque plan a un cadrage, une action, une réserve de texte, une prescription de lumière, une référence de lieu et un statut d’image non générée. Les données distinguent costume, arme, blessure, période et locuteur. Une suite de trois images fixes ne constitue pas une animation ; aucune couche de parallaxe ni aucune voix officielle imitée n’est incluse.

Le registre distingue les **24 références de contexte** des références proposées pour un **plan précis** : 19 plans disposent d’un candidat de lieu P60/P61 à confronter au cadrage, et 89 conservent un besoin de référence spécifique ou de conception de décor original. Aucun candidat ne constitue une correspondance géométrique ou une fidélité certifiée. Les listes vides sont intentionnelles : un décor voisin ou d’une autre fonction n’est pas utilisé pour masquer ce manque.

Le contrôle des identifiants empêche un partage accidentel dans le registre ; il ne remplace pas la comparaison visuelle après génération. L’introduction montre un besoin, la rivalité rend le conflit visible, l’outro en montre les conséquences. Un recadrage du même portrait, un retour au même fond sans nouvelle action ou un finisher placé après l’intro ne satisfont pas cette distinction.

| Source sélectionnée | Travail associé | Limite de portée |
| --- | --- | --- |
| mgs3-rassvet | stage:mgs3_rassvet | Référence de lieu ; image de scène non produite. Contrôle visuel effectué avant la panne et statut reviewed_adaptation transmis dans le compte rendu de l'agent. |
| mgs3-dolinovodno | stage:mgs3_dolinovodno | Référence de lieu ; image de scène non produite. Contrôle visuel effectué avant la panne et statut reviewed_adaptation transmis dans le compte rendu de l'agent. |
| mgs3-bolshaya-base | stage:mgs3_bolshaya_base | Référence de lieu ; image de scène non produite. Identity, original edition, palette and defining structures checked against the listed game screenshots. |
| mgs3-ponizovje-warehouse | stage:mgs3_ponizovje_warehouse | Référence de lieu ; image de scène non produite. Contrôle visuel effectué avant la panne et statut reviewed_adaptation transmis dans le compte rendu de l'agent. |
| mgs3-svyatogornyj-east | stage:mgs3_svyatogornyj | Référence de lieu ; image de scène non produite. Identity, original edition, palette and defining structures checked against the listed game screenshots. |
| mgs3-zaozyorje | stage:mgs3_zaozyorje_wig | Référence de lieu ; image de scène non produite. Location and episode checked against the listed screenshot references. |
| mgs1-cargo-dock | stage:mgs1_cargo_dock | Référence de lieu ; image de scène non produite. Architecture and palette checked against the cited original MGS1 capture/map. |
| mgs1-blast-furnace | stage:mgs1_blast_furnace | Référence de lieu ; image de scène non produite. Architecture and palette checked against the cited original MGS1 capture/map. |
| mgs1-cargo-elevator | stage:mgs1_cargo_elevator | Référence de lieu ; image de scène non produite. Architecture and palette checked against the cited original MGS1 capture/map. |
| mgs1-jeep-escape | stage:mgs1_jeep_escape | Référence de lieu ; image de scène non produite. Identity, original edition, palette and defining structures checked against the listed game screenshots. |
| mgs2-strut-b | stage:mgs2_strut_b | Référence de lieu ; image de scène non produite. Contrôle visuel effectué avant la panne et statut reviewed_adaptation transmis dans le compte rendu de l'agent. |
| mgs2-shell1-hostages | stage:mgs2_shell1_hostages | Référence de lieu ; image de scène non produite. Location and episode checked against the listed screenshot references. |
| mgs2-arsenal-stomach | stage:mgs2_arsenal_torture | Référence de lieu ; image de scène non produite. Salle Stomach contrôlée : consoles CRT, armoires serveur, appareil central vide et câbles ; aucun personnage. |
| mgr-guadalajara-lab | stage:mgr_guadalajara | Référence de lieu ; image de scène non produite. Atelier de service R-02 contrôlé : poteaux jaunes contreventés, passerelle, fosse, appareils bleus et conduites. |
| mgr-guadalajara-sewers | stage:mgr_guadalajara | Référence de lieu ; image de scène non produite. Voûte, conduites et passerelles métalliques comparées aux captures R-02 du guide IGN. |
| mgr-wm-office | stage:mgr_wm_interior | Référence de lieu ; image de scène non produite. Bureaux du 20e étage contrôlés : panneaux sombres, cloisons vitrées cyan, postes de travail et carrelage gris. |
| mgr-pakistan-hangar | stage:mgr_pakistan_base | Référence de lieu ; image de scène non produite. Hangar R-07 contrôlé : grande charpente triangulée, verrières, passerelles et caisses ; piste frontale dégagée. |
| mgs1-wolf-cave | stage:mgs1_wolf_cave | Référence de lieu ; image de scène non produite. Location and episode checked against the listed screenshot references. |
| mgs1-first-wolf | stage:mgs1_first_wolf | Référence de lieu ; image de scène non produite. Identity, original edition, palette and defining structures checked against the listed game screenshots. |
| tpp-wialo | stage:tpp_wialo | Référence de lieu ; image de scène non produite. Bâtiment central à deux niveaux, sacs de sable, parabole, auvent et arche repris de la capture. |
| tpp-fob | stage:tpp_fob | Référence de lieu ; image de scène non produite. Tours orange, passerelles, grues et océan repris de la capture FOB. |
| tpp-quarantine | stage:tpp_quarantine | Référence de lieu ; image de scène non produite. Source de salle industrielle contrôlée : double tuyauterie claire, cloison grillagée, porte étanche et deux bandes bleues au sol, éclairage orange. |
| mgs3-graniny-lab | stage:mgs3_graniny_lab | Référence de lieu ; image de scène non produite. Contrôle visuel effectué avant la panne et statut reviewed_adaptation transmis dans le compte rendu de l'agent. |
| mgs3-runway | stage:mgs3_runway | Référence de lieu ; image de scène non produite. Contrôle visuel effectué avant la panne et statut reviewed_adaptation transmis dans le compte rendu de l'agent. |



**Raccords à surveiller.** Zaozyorje West ne constitue pas une source du quai WIG ; le document ne l’emploie pas comme preuve de cet embarquement. La source FOB MGSV n’est pas automatiquement Mother Base principale. Le laboratoire de Guadalajara et les égouts sont deux lieux distincts. Le hangar pakistanais n’est pas l’épave de Metal Gear EXCELSUS. Le décor Arsenal Stomach porte un workId historique mentionnant la torture : son nom de travail ne le transforme pas en Rectum. Pour les espaces inventés de soin, de rapport ou de montage, la source spécifique reste à définir avant génération. Sources : [R-P61](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/cqc-reprise/pass61/delivery-manifest.json).

## 6. Reprise, accessibilité et textes

Le futur état de sauvegarde doit conserver le mode, l’UID, la continuité, le chapitre ou duel, le dernier plan terminé, le costume, l’état de connaissance, les preuves, la difficulté et la version du contenu. Le résumé de reprise rappelle le but concret et précise si la scène est une adaptation ou une simulation. Une scène passée reste lisible dans le journal ; elle ne fait pas disparaître l’objectif. Ces champs sont une proposition de conception, sans migration des sauvegardes existantes.

Les sous-titres restent séparés des images et les répliques marquées comme créations CQC dans les métadonnées. Prévoir taille réglable, avance manuelle, vitesse réglable, réduction des mouvements, absence de flash imposé et volumes séparés. Musiques, bruitages et silences sont des intentions de mise en scène ; aucun enregistrement ni doublage n’est livré avec ce document. Les options et le moteur existants doivent être étudiés avant adaptation. Sources : [R-GUIDE](sources/Combat_Games_Guide_General_v1.0.txt), [R-CORE](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-core-v056.js), [R-UI](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-v056.js), [R-NARRATIVE-AUDIT](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/05_NARRATION_AUDIO_SYSTEMES.md).

## 7. Tout ce qui reste à traiter

Le registre énumère **les 380 UID de l’audit historique**, leur présence ou absence dans les 354 histoires observées, leur titre hérité, leur nombre de peintures déclaré et leur traitement dans cette passe. Il ne déclare pas ces 380 UID actifs. Les 372 non réécrits sont une liste nominative exploitable ; les sources de personnages P61 non intégrées ne sont pas inventées comme nouveaux UID actifs.

### 26 profils historiquement sans histoire

| UID | Profil | Travail prioritaire |
| --- | --- | --- |
| pass19__wanderer_survive | WANDERER | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__tracker_survive | TRACKER | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__mortar_survive | MORTAR | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__crawler_survive | CRAWLER | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__big_mouth_survive | BIG MOUTH | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__frostbite_survive | FROSTBITE | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__gekko_suicide_mgs4 | GEKKO — UNITÉ SUICIDE | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__gekko_missile_mgs4 | GEKKO — LANCE-MISSILES | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__gekko_mgr | GEKKO — DESPERADO | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__dwarf_gekko_trenchcoat_mgs4 | TRIPODS — INFILTRATION | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__dwarf_gekko_humanoid_mgr | DOUBLE TRIPOD | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__love_box_pw | LOVE BOX | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__box_tank_pw | BOX-TANK | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__box_tank_stun_pw | BOX-TANK — STUN | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__box_tank_smoke_pw | BOX-TANK — SMOKE | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__bomb_box_pw | BOX BOMB | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__stun_box_pw | BOX STUN | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__smoke_box_pw | BOX SMOKE | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__assassin_box_pw | ASSN. BOX | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__rescue_box_pw | RESCUE BOX | Équipement PW : raconter l’opérateur ; ne pas inventer une boîte consciente. |
| pass19__fenrir_mgr | LQ-84 FENRIR | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__raptor_mgr | RAPTOR | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__mastiff_mgr | MASTIFF | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__slider_mgr | SLIDER | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass19__hammerhead_mgr | HAMMERHEAD | Entité non humaine : pas de parole ni de psychologie humaine déclarée sans source. |
| pass40__raiden_r00 | RAIDEN · R-00 | Corps du prologue MGR ; ne pas remplacer par core__raiden et ne pas nier l’issue du prologue. |



L’audit historique proposait 156 scènes pour conserver son format de trois ouvertures et trois conclusions sur ces 26 profils. Ce nombre n’inclut pas automatiquement une nouvelle scène de rivalité pour chacun et ne décrit pas une production réalisée. Les boîtes PW se racontent par leurs opérateurs ; les créatures et unités automatisées par observation, journal ou opérateur si une source le permet. Le Raiden R-00 garde son corps, sa place dans le prologue et son issue propres. Source : [R-NARRATIVE-AUDIT](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/05_NARRATION_AUDIO_SYSTEMES.md), [R-PROFILES](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/data/narration_profils.csv).

### 346 récits hérités non enrichis dans cette passe

Leur statut reste « à relire et compléter selon le besoin ». Il faut conserver les textes déjà écrits, vérifier les versions et les fictions annoncées, désigner la rivalité utile, inspecter les scènes existantes et remplacer les compositions seulement si la cible de production l’exige. Ni une peinture déclarée ni un sprite P61 ne suffisent à déclarer une route entièrement fidèle. Le registre garde tous les UID ; il ne remplace pas cette liste par une estimation globale.

### Vérifications encore nécessaires

- Contrôler les huit incarnations contre COMBAT.md, avant toute image.
- Relire les limites de savoir et les dialogues des invités.
- Réconcilier les 380 UID historiques avec l’admission actuelle, conditionnée aux sources visuelles.
- Traiter les 26 profils historiquement sans histoire ; un sprite ne remplace pas leur route.
- Compléter ensuite les 346 récits hérités non enrichis dans cette passe, selon besoin réel.
- Dédupliquer les nouveaux plans proposés avec les besoins hérités avant d’autoriser un lot d’images.
- Écrire les routes non combattantes, équipements et créatures depuis un point de vue adapté.
- Vérifier les sources de lieux partiels : Zaozyorje West n’est pas le site WIG ; FOB n’est pas automatiquement Mother Base principale ; hangar pakistanais n’est pas l’épave finale ; Stomach n’est pas Rectum.

Les détails marqués à confirmer restent ouverts : source primaire autonome de la révélation de Venom avant toute affirmation canonique nouvelle, état exact de l’armement tardif de Raiden MGS2, références des lieux fictifs, admission actuelle des ajouts au roster, vérification des costumes et examen visuel des futurs plans. La revue de fidélité ne doit jamais être déduite du seul succès d’une génération.

## 8. Contrôles de cette livraison

Vérifications structurelles effectuées : huit pilotes présents dans les données actuelles ; 64 UID d’opposants résolus ; dix chapitres ; 36 séquences ; 108 identifiants de plans et d’assets uniques ; aucune image annoncée produite ; chemins des références P60/P61 résolus au manifeste sélectionné ; couverture de 380 UID sans doublon. Les vérifications éditoriales, historiques fines, visuelles et runtime restent des étapes distinctes.

Aucun fichier runtime n’est modifié par ce travail. La campagne, les objectifs contextuels, les nouveaux raccords de stage, les écrans de preuve et les sauvegardes restent à adapter dans une future phase. Le contrôle structurel du registre n’est ni un test jouable ni un certificat de fidélité 1:1.

## 9. Sources étudiées

| ID | Source | Portée |
| --- | --- | --- |
| R-GUIDE | [Combat Games Guide General v1.0 — fourni par Darknigthmare](sources/Combat_Games_Guide_General_v1.0.txt) | Sections 03, 07–10, 24–27 : taxonomie, relations, routes, campagne distincte, scènes, reprise et validation. |
| R-CHRONICLES | [Données Chroniques v0.56 observées au head](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-data-v056.js) | 354 histoires, UID, titres, arcs, huit adversaires, clés des scènes et statut alternatif. Aucune certification des pixels par lecture des données. |
| R-ROSTER | [Roster Command v0.53](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/data/roster-audit-v053.json) | Correspondances des huit UID pilotes et des éditions ; source déclarative à distinguer de l’admission runtime. |
| R-PROFILES | [Audit des profils narratifs — état historique](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/data/narration_profils.csv) | 380 UID documentés, dont 26 signalés sans histoire ; ce CSV ne mesure pas le roster actif de la session actuelle. |
| R-NARRATIVE-AUDIT | [Narration, audio et finition des systèmes](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/audit-cqc-2026-10-23/05_NARRATION_AUDIO_SYSTEMES.md) | Limites de preuve, peintures déclarées, compositions, besoins des profils sans histoire ; audit daté. |
| R-CIRCUITS | [Routes et circuits locaux existants](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/cqc-campaign-routes-v1.js) | Tours de circuits et formulation générique des matches ; aucune campagne de dix chapitres décrite ici n’est déjà installée. |
| R-P61 | [Livraison des sources P60/P61 sélectionnées](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/docs/cqc-reprise/pass61/delivery-manifest.json) | 172 sources sélectionnées ; présence, chemin et empreintes. Zéro certification 1:1 et aucune intégration par ces passes. |
| R-CORE | [Cœur des Chroniques](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-core-v056.js) | Architecture existante consultable pour reprise et sauvegarde ; le schéma proposé de la bible n’est pas une migration déjà livrée. |
| R-UI | [Interface des Chroniques](https://github.com/darknigthmare/shadow-codec-ops/blob/5c2cbed73f15c4583f5ffd2cee0c2344180b5d68/public/cqc/src/chronicles-v056.js) | Séparation des textes, du rendu et des options à conserver lors d’une future intégration. |
| K-MGS3-HISTORY | [Konami — histoire de MGS3](https://www.konami.com/mg/history/jp/ja/mgs3) | 1964, mission de Naked Snake et rôle de mentor de The Boss. |
| K-MGS3-STORY | [Konami — récit de Snake Eater](https://eu-support.konami.com/hc/en-gb/articles/9731056113303-Backstory-What-is-the-story-of-Metal-Gear-Solid-3-Snake-Eater) | Ordres successifs, sacrifice de The Boss, écart entre savoir de mission et révélation finale. Les dialogues de cette bible ne sont pas tirés de cette page. |
| K-MGS1-HISTORY | [Konami — histoire de MGS1](https://www.konami.com/mg/history/jp/ja/mgs) | Shadow Moses, 2005, FOXHOUND et mission de Solid Snake. |
| K-MGS1-STORY | [Konami — mission de MGS1](https://www.konami.com/mg/archive/mgs/story/index.html) | Infiltration, otages et crise de Shadow Moses ; ne prouve pas les employés et le garage fictifs des routes CQC. |
| K-OCELOT | [Konami — Revolver Ocelot MGS1](https://www.konami.com/mg/archive/mgs/character/ch08.html) | Affiliation FOXHOUND, antécédent Spetsnaz, revolver ; ne prouve pas l’opération de fausses images inventée pour CQC. |
| K-WOLF | [Konami — Sniper Wolf MGS1](https://www.konami.com/mg/archive/mgs/character/ch10.html) | FOXHOUND, identité de tireuse et rapport aux wolfdogs ; ne prouve pas le convoi ou le gant rouge CQC. |
| K-MGS2-HISTORY | [Konami — histoire et personnages MGS2](https://www.konami.com/mg/history/jp/ja/mgs2) | 2007–2009, séparation Tanker/Plant, Raiden et les personnages MGS2 ; pas de connaissance anticipée de MGR. |
| K-MGS2-PLANT | [Konami — chapitre Plant](https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html) | Mission d’infiltration de Raiden à Big Shell et prise d’otages. |
| K-TPP | [Konami — The Phantom Pain](https://eu-support.konami.com/hc/en-gb/articles/9666546497047-Metal-Gear-Solid-V-The-Phantom-Pain) | 1984, contexte après Ground Zeroes et retour sur le terrain. Ne sert pas à sourcer indépendamment le détail de la révélation identitaire. |
| K-MGS4-HISTORY | [Konami — histoire de MGS4](https://www.konami.com/mg/history/jp/ja/mgs4) | 2014 comme ancrage de la datation MGR par l’intervalle indiqué dans K-MGR-STORY ; aucune route Old Snake écrite dans cette passe. |
| K-MGR-STORY | [Konami — place de Revengeance dans la série](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series) | Quatre ans après MGS4, Raiden cyborg, Maverick et Doktor ; la datation 2018 est explicitement déduite avec K-MGS4-HISTORY. |
| K-MGR-DEVELOPER | [PlatinumGames — Metal Gear Rising: Revengeance](https://www.platinumgames.com/works/metal-gear-rising-revengeance) | Corps cyborg, lame HF et déplacement du projet vers l’après-MGS4 ; distinction du prototype Rising. |


