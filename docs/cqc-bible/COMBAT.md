# CQC Versus Legacy — règles, identités et neutralisations

Version P62, 25 novembre 2026. Ce document adapte les chapitres 02–07, 16, 18 et 20–23 du [guide général](sources/Combat_Games_Guide_General_v1.0.txt). Il complète les contrats de fidélité existants ; les données historiques et les modules exécutés restent conservés.

## 1. Contrat du jeu

Le cœur retenu est le duel latéral à deux combattants : placement, lecture de l’adversaire, garde, projection, gestion de l’armement et engagements punissables. Le CQC, les armes à feu, les lames, les pièges et les grands adversaires gardent des contraintes différentes. Une technique universelle ne donne pas à tous les personnages la maîtrise narrative de The Boss.

Les quatre piliers sont l’identité de l’incarnation, la lisibilité du duel, une réponse adverse compréhensible et la continuité entre combat et récit. Une apparition dans le catalogue n’accorde pas automatiquement un statut jouable : prisonniers, figures documentaires, soutiens et personnages sans corps attesté reçoivent un rôle explicite dans leur fiche.

L’existence d’un mécanisme dans le code constitue une preuve d’implémentation, à compléter par un test du parcours qui l’utilise. L’[état du jeu](ETAT_DU_JEU.md) décrit ce qui est observé ; les valeurs compilées sont archivées dans [les profils pilotes](combat-pilots.json). Ces profils sont extraits **avant les adaptateurs de fidélité chargés ensuite** : ils ne doivent pas être recopiés comme configuration finale du runtime.

## 2. Règles déjà observées et contrat à vérifier

Source directe : [`cqc-pass8-combat-engine.js`](../../public/cqc/src/cqc-pass8-combat-engine.js), export `CQCCombat048Pass8`. Le choix effectif de moteur et les adaptateurs sont documentés par l’audit P62.

| Sujet | Observation dans ce moteur | Critère de validation |
|---|---|---|
| Simulation | `FPS: 60`, `step`, temps exprimés en pas, compteur de match initialisé à `seconds × 60`. | Vérifier que le module appelant garde 60 pas par seconde lors des variations du rendu ; mesurer séparément les images affichées. |
| Vie et manches | Vie initiale à 10 000 ; état de manche et remise à zéro des projectiles/pièges. | Tester KO, double KO, timeout, égalité, victoire de match, revanche et retour à la sélection. |
| Actions | Dix emplacements stables : `light`, `heavy`, `low`, `throw`, quatre spéciaux directionnels, `super`, `utility`. | Les commandes affichées doivent correspondre à l’orientation et au profil réellement chargé. |
| Défense | Garde frontale, condition accroupie sur les attaques basses, parade propre à certaines actions, déchoppe. | Tester garde haute/basse, dos, changement de côté, saisie refusée en l’air et fenêtre de déchoppe. |
| Projections | Conditions de sol, protections de projection et exclusion pendant certaines immobilisations. | Empêcher les répétitions de projection sans retour au contrôle ; vérifier les familles de cibles. |
| Combos | Compteurs, réduction de dégâts, remise au neutre et échappement conditionnel. | Vérifier coins, tailles extrêmes, attaques simultanées et boucles avec pièges ou transitions. |
| Ressources | Munitions, endurance, énergie, chaleur/coût selon le profil. | L’épuisement, le coût et la récupération doivent être visibles et produire la même décision des deux côtés. |
| Projectiles | Propriétaire, origine, vitesse, durée de vie, collision, réflexion/destruction conditionnelles. | Vérifier émission depuis l’arme, cible unique, bouclier/parade, disparition à la fin de manche et limites de suivi. |

Ces nombres sont des paramètres du jeu CQC, pas des mesures des épisodes d’origine. Le moteur contient des règles de garde et de parade qui demandent une revue spécifique pour les armes explosives, les grands boss et les corps non humanoïdes.

## 3. Commandes et règles de saisie

Les identifiants d’action existants sont conservés. Dans la table de commandes du moteur étudié, le côté joueur 1 utilise J pour l’attaque légère, K pour la lourde, bas + J pour la basse, U pour la projection, I et ses directions relatives pour les spéciaux, O pour l’ultime, L pour l’utilitaire. Les profils clavier/manette du module appelant restent la source effective des touches physiques ; la bible ne remplace pas leur configuration.

La prochaine validation doit couvrir : changement de côté pendant une saisie, priorité projection/spécial, maintien d’une direction, pression simultanée, reprise après pause et déconnexion de contrôleur. Les commandes simplifiées doivent produire des actions identiques, avec les mêmes coûts et récupérations. Les déplacements aérien, double saut, téléportation et invulnérabilité sont des capacités par incarnation, jamais des compléments automatiques pour remplir une fiche.

## 4. Huit kits pilotes associés aux routes narratives

Les UID ci-dessous existent dans `FIGHTERS` de `unified-versus-v055.html` et dans les données de narration historiques. Le registre conserve leurs dix actions compilées avec démarrage, phase active, récupération, dégâts, portée, coût, ressources, liens, limites et réponses adverses déjà renseignés. La table suivante fixe les contrôles de conception à appliquer avant d’étendre ces kits.

| UID / incarnation | Identité tactique retenue | Réponse adverse à préserver | Contrôle de fidélité prioritaire |
|---|---|---|---|
| `core__snake` — Naked Snake, MGS3 | Approche mesurée, MK22 et prises CQC ; préparation de l’engagement. | Punir la visée et le rechargement, rester hors de portée d’une saisie annoncée. | Une fonction appelée camouflage ne doit pas devenir une invisibilité optique surnaturelle. Armes et mains doivent correspondre à la source sélectionnée. |
| `core__boss` — The Boss, MGS3 | Interception, désarmement, renversement et pression du Patriot selon l’équipement retenu. | Faire rater le contre, varier les timings et punir sa récupération. | Une présentation de maîtrise ne supprime ni les fenêtres de défense ni les limites de portée ; le nom des actions CQC est créé pour ce jeu. |
| `core__solid` — Solid Snake, MGS1 | SOCOM, grenade et contacts rapprochés ; alternance distance/approche. | Lire le lancer, franchir l’espace pendant le rechargement, éviter la pression répétitive gratuite. | Garder la version Shadow Moses, ses armes et sa gestuelle ; aucun équipement de Venom ou de Raiden ajouté au kit. |
| `core__ocelot_mgs1` — Revolver Ocelot, MGS1 | Six cartouches, rythme de tir, placement et fenêtre de recharge. | Compter les tirs, approcher pendant la recharge, défendre les trajectoires annoncées. | Aucun ricochet à travers un décor sans règle de trajectoire et surface définies ; conserver la période FOXHOUND. |
| `core__raiden_mgs2` — Raiden humain, MGS2 | Mobilité humaine, équipement de mission et variante tardive avec lame HF. | Punir la roulade mal placée et les engagements de lame. | La disponibilité de la lame dépend de la phase narrative/loadout ; ne pas mélanger corps humain et pouvoirs du cyborg MGR. |
| `core__raiden` — Raiden, MGR | Pression à la lame HF, parade, déplacement Ninja Run, dépense de Fuel Cell. | Retarder une attaque, provoquer une parade ratée, exploiter une réserve faible. | La récupération Zandatsu dépend de la cible et de ses unités compatibles ; pas de gain anatomique automatique sur tout adversaire. |
| `core__wolf` — Sniper Wolf, MGS1 | Visée longue, tir puissant, déplacement entre positions et gestion du chargeur. | Lire la visée, changer de hauteur/position selon le terrain, approcher entre deux tirs. | La compétence de tir ne justifie pas une téléportation ni une invulnérabilité pendant la visée. |
| `core__venom` — Venom Snake, TPP | CQC, arme retenue et prothèse correspondant au loadout. | Punir la préparation d’une prothèse spéciale et exploiter son coût. | Rocket Punch, Stun Arm et bras médical sont des équipements distincts ; leur union dans une base compilée ne valide pas une incarnation composite. |

### Ressources et données des actions

Chaque mouvement doit conserver les champs du guide : commande relative, conditions, démarrage/activité/récupération, zones, dégâts, ressource, résultat en touche/garde/contre/échec, immobilisation, annulations, invulnérabilités, réactions, VFX/SFX et état de test. Le [registre pilote](combat-pilots.json) expose les valeurs historiques disponibles et une liste des champs qu’il reste à établir par action. Un champ absent reste inconnu ; il ne reçoit pas de valeur inventée pour donner une impression de complétude.

Pour étendre le roster, réutiliser les UID de [roster-coverage.json](roster-coverage.json). Ce registre porte sur les **354 fiches de la base compilée** ; il ne constitue pas le total de toutes les incarnations et surcharges du dépôt. Les personnages supplémentaires P61 sont reliés par leurs `workIds` dans [asset-associations.json](asset-associations.json), avec une résolution de binding explicite avant toute admission.

## 5. Neutralisations — famille de finishers du projet

**« Neutralisations » est le nom de famille conçu pour CQC Versus Legacy.** Il n’est pas présenté comme une appellation officielle commune aux jeux Metal Gear. Les sous-types sont capture, désarmement, mise hors combat, neutralisation mécanique et conclusion narrative. Une ultime pendant le match, une neutralisation finale, une pose de victoire et une outro restent quatre objets distincts.

Contrat commun proposé : résultat du match déjà acquis ; utilisation dans les modes compatibles ; activation explicite et fenêtre bornée ; aucune altération rétroactive du vainqueur ; séquence abrégée disponible ; retour garanti au résultat même si une illustration ou un son manque. Les versions de campagne peuvent imposer une capture ou une fuite au lieu de la conclusion du versus.

| Pilote | Nom créé pour le projet | Déroulement proposé et intention | Remplacement selon la cible |
|---|---|---|---|
| Naked Snake | **Prise de silence** | Interception d’un bras, déséquilibre, contrôle au sol ; fin sur une immobilisation lisible. | Machine : rupture de ligne de tir puis pose de charge sur un point attesté uniquement si ce loadout possède cet outil ; sinon conclusion de victoire sans prise. |
| The Boss | **Dernière leçon** | Écarter l’arme, briser la posture, immobiliser sans chorégraphie copiée plan pour plan. | Cible sans bras : esquive et arrêt à distance ; aucun bras humain fictif créé sur un quadrupède. |
| Solid Snake | **Objectif sécurisé** | Désarmement, contrôle, confirmation Codec. | Machine : cadrage sur l’arrêt effectif du point faible défini par la rencontre. |
| Ocelot MGS1 | **Dernière chambre** | Vérification du barillet, tir de désarmement scénarisé, abaissement du revolver. | Grande machine : viser un composant déjà exposé, sans faire passer un revolver pour une arme antichar universelle. |
| Raiden MGS2 | **Lame libérée** | Parade et coupe de l’arme adverse dans le loadout Arsenal ; séparation et retour au contrôle narratif. | Variante sans lame : roulade, immobilisation et victoire humaine ; ne pas faire apparaître une arme absente. |
| Raiden MGR | **Circuit interrompu** | Ouvrir un point mécanique compatible, neutraliser le dispositif ; variante Zandatsu seulement sur cible qualifiée. | Humain/animal sans unité de réparation : conclusion de lame ou désarmement sans extraction fictive ni récupération automatique. |
| Sniper Wolf | **Ligne de mire** | Cadrage de visée, confirmation d’une cible désarmée, dernier plan sur Wolf qui quitte sa position. | Boss géant : résolution sur un point faible de la rencontre, sans imposer une taille humaine. |
| Venom Snake | **Extraction silencieuse** | Contrôle CQC, signal d’extraction et sortie, seulement si le mode et la zone autorisent ce dispositif. | Intérieur fermé, boss non extractible ou dispositif absent : « Mission sécurisée », maintien au sol ou victoire à distance. |

Ces huit fiches sont des conceptions nouvelles, pas des animations produites. Leurs noms sont enregistrés dans [combat-pilots.json](combat-pilots.json). Les durées, ancrages, distances exactes et raccords caméra restent à valider par famille de cibles et décor avant implémentation.

Matrice minimale de cibles : humain adulte debout, humain assis/agenouillé, cyborg humanoïde, quadrupède, petite machine, véhicule lourd, machine géante et entité documentaire. Une cible assise, un portrait historique ou un PNJ sans kit ne devient pas un adversaire de duel par la présence d’une image.

## 6. Projectiles, fumée et objets

Une attaque distante comporte au moins quatre objets suivis séparément : corps, émission/traînée, impact et comportement. La fumée P61 est un visuel statique ; ses règles restent celles du contrat non dommageable `CQC_PASS19_SMOKE`. Elle n’est pas le corps d’un obus BOX-T.

Pour chaque corps, enregistrer propriétaire/loadout, point de sortie gauche et droit, silhouette, trajectoire, vitesse, durée de vie, collision, effet sur garde, destruction/reflet autorisé, son et état à la fin de manche. Les balles, fusées, grenades et rayons utilisent leurs familles propres. Un effet d’énergie décoratif n’accorde pas un pouvoir canonique.

Restent explicitement sans source géométrique sélectionnée dans P61 : `projectile:smoke-shell`, `projectile:stun-shell` et `projectile:crystal-grenade` (projectile du Mortar de Survive). Leur suivi reste visible dans [les associations](asset-associations.json) et dans la [revue P61](../cqc-reprise/pass61/batches/projectiles-reference-review.json).

## 7. Entraînement, IA, réseau et accessibilité

Le parcours d’entraînement cible doit permettre le reset de position, vie et ressource ; la garde/saut/attaque du partenaire ; les tests au coin ; l’affichage des commandes et des collisions ; puis l’enregistrement d’une situation. Chaque fonction garde le statut réel relevé dans l’audit. Le tutoriel commence par approche, garde, punition, projection et recharge, avant la mécanique propre au pilote.

La difficulté CPU doit varier la prise de décision et les erreurs observables. Toute exception de boss est annoncée dans sa fiche. Les modes compétitifs utilisent les mêmes coûts, délais et limites que le joueur ; les bonus de campagne restent séparés. Tester les huit pilotes contre courte portée, zoner, projectile rapide, parade, petite cible et grande machine avant d’étendre une règle commune.

Le jeu local reste prioritaire. Le rollback, le matchmaking, le classement et le crossplay sont différés ; la reproductibilité de la simulation et l’identification de la version des données restent des exigences d’architecture dès maintenant. Un enregistrement de résultats ne doit pas être nommé replay de combat reproductible.

Les réglages de confort portent séparément sur secousses, flashs, volume, taille de texte et animation du fond. Les dangers, interactions et transitions sont des règles partagées entre les joueurs. Un fond statique conserve toute information nécessaire à la défense. Le menu indique le profil retenu avant le duel.

## 8. Références et statut des adaptations

- [Konami — MGS3, commandes de base et CQC](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page05.html), consulté le 25 novembre 2026 : actions de contact et conditions d’équipement. Les fenêtres et dégâts du versus restent des adaptations.
- [Konami — TPP, tactique](https://mgstpp-app.konamionline.com/manual/pc/eu/fr/pc_12.html), consulté le 25 novembre 2026 : armes incapacitantes, CQC et interrogation. Les règles de capture du duel sont conçues pour CQC.
- [Konami — MGR, techniques](https://www.konami.com/mg/archive/mgr/jp/webmanual/technique.html), consulté le 25 novembre 2026 : Blade Mode, Zandatsu, Ninja Run et parade. La compatibilité des cibles et les ressources du versus doivent être documentées séparément.
- [`cqc-pass10-source-contracts.js`](../../public/cqc/src/cqc-pass10-source-contracts.js) et [`cqc-pass10-combat-fidelity.js`](../../public/cqc/src/cqc-pass10-combat-fidelity.js) : exemples de restrictions par incarnation et de source native qualifiée.
- [`cqc-pass19-smoke-mechanics.js`](../../public/cqc/src/cqc-pass19-smoke-mechanics.js) : contrat de fumée non dommageable.
- [`unified-versus-v055.html`](../../public/cqc/modules/unified-versus-v055.html) : base compilée des profils, suivie d’adaptateurs. L’extraction P62 conserve cette limite.

La chaîne de validation suit [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md). La phase actuelle produit des sprites fixes et des documents ; les nouveaux movesets, neutralisations et séquences narratives ci-dessus n’ont pas été déclarés jouables par cette passe.

## Extension P66 — 26 novembre 2026

P66 prépare six sources d’objet : Machine Gun Turret, Oil Trap, Flame Trap, Cardboard Box, Drum Can et variante Mariachi. Leurs états, délais, ciblage, dommages, collisions, neutralisations et contre-jeu sont consignés comme travaux nécessaires. Aucun comportement ni moveset n’est admis par l’ajout des PNG. La variante Mariachi partage l’objet de base et ne crée pas un combattant.

[Continuation et fiches P66](CONTINUATION_P66.md) · [Associations P66](asset-associations-p66.json) · [Delta](../cqc-reprise/pass66/scope-delta.json) · [QA](../cqc-reprise/pass66/INTEGRATION_QA.md)
