# Guide général → exigences CQC

**30 rubriques et 90 exigences identifiées.** Les décisions portent sur la conception ; elles ne déclarent pas les fonctionnalités terminées.

[Guide original](sources/Combat_Games_Guide_General_v1.0.txt) · [État réel du code](ETAT_DU_JEU.md) · [Données structurées](guide-map.json)

Empreinte SHA-256 du guide conservé : `4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7`.

## 00. Utilisation et priorités

Document CQC : [README.md](README.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G00-01` — Conserver le guide original | P0 / retenue | Copie exacte, version et SHA-256 disponibles ; aucune modification du texte utilisateur. |
| `CQC-G00-02` — Relier le guide à CQC | P0 / retenue | Chaque rubrique 00–29 possède une décision, un document, une exigence et un critère vérifiable. |
| `CQC-G00-03` — Respecter la phase sprites fixes | P0 / retenue | Les nouveaux PNG restent individuels ; animations et actions nouvelles conservent leur statut futur. |

## 01. Identité et périmètre

Document CQC : [README.md](README.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G01-01` — Conserver le duel latéral CQC | P0 / retenue | Le périmètre décrit navigateur, runtime autonome et intégration Shadow sans changement de moteur implicite. |
| `CQC-G01-02` — Délimiter les continuités | P0 / retenue | Chaque édition, spin-off, prototype et création originale conserve son identité et sa période. |
| `CQC-G01-03` — Définir les modes et piliers | P0 / retenue | Les objectifs P0/P1/P2 sont motivés et séparés des modes effectivement accessibles. |

## 02. Fidélité et sources

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G02-01` — Classifier la provenance | P0 / retenue | Chaque fiche distingue canon attesté, adaptation jouable, original compatible, alternatif et à confirmer. |
| `CQC-G02-02` — Contrôler incarnation et équipement | P0 / retenue | UID, période, costume, arme, anatomie et asymétries sont comparés aux références du bon opus. |
| `CQC-G02-03` — Garder les limites visibles | P0 / retenue | Aucun fichier généré ou nom de technique créé ne reçoit automatiquement le statut canonique ou certifié 1:1. |

## 03. Roster et costumes

Document CQC : [ROSTER.md](ROSTER.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G03-01` — Conserver les identifiants existants | P0 / retenue | Les 354 UID de base sont référencés ; les 384 incarnations de garde-robe restent un périmètre distinct. |
| `CQC-G03-02` — Qualifier le rôle et la variante | P0 / retenue | Jouable, boss, ennemi, soutien, PNJ et présence documentaire sont distingués avant admission. |
| `CQC-G03-03` — Séparer costume et kit | P0 / retenue | Une arme, une morphologie ou un pouvoir différent déclenche une revue de variante et de collisions. |

## 04. Fondations du combat

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G04-01` — Vérifier le pas de simulation | P0 / retenue | Les 60 pas annoncés par le moteur restent indépendants du rendu et des ralentissements visuels. |
| `CQC-G04-02` — Fermer un match complet | P0 / retenue | KO, double KO, timeout, manches, pause, revanche et sortie ont un résultat déterministe et testable. |
| `CQC-G04-03` — Valider saisie et défense | P0 / retenue | Garde, projection, déchoppe, priorités de touches et changement de côté sont testés avec les profils réels. |

## 05. Movesets et ressources

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G05-01` — Documenter les actions par UID | P0 / retenue | Chaque action relie commande, durées, collision, coût, résultat, annulations et preuve de version. |
| `CQC-G05-02` — Distinguer base et adaptateurs | P0 / retenue | Les 80 emplacements pilotes compilés ne sont pas présentés comme état final après hooks de fidélité. |
| `CQC-G05-03` — Garantir des réponses adverses | P0 / retenue | Chaque kit décrit approche, punition, anti-pression, ressource et vulnérabilité reproductible. |

## 06. Neutralisations et ultimes

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G06-01` — Distinguer les conclusions | P1 / retenue | Ultime, neutralisation, victoire et outro possèdent des objets et conditions distincts. |
| `CQC-G06-02` — Qualifier chaque famille de cible | P1 / retenue | Humain, cyborg, quadrupède, machine et géant possèdent une séquence compatible ou un remplacement. |
| `CQC-G06-03` — Garantir retour au résultat | P1 / retenue | Séquence abrégée, asset absent et interruption ne changent pas le vainqueur ni ne bloquent la sortie. |

## 07. Présentation et relations

Document CQC : [NARRATION.md](NARRATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G07-01` — Écrire des relations situées | P1 / retenue | Chaque rivalité précise époque, connaissances des acteurs et statut canonique ou hypothétique. |
| `CQC-G07-02` — Donner une attitude propre | P1 / retenue | Arrivée, provocation, victoire et défaite respectent le langage corporel de l’incarnation. |
| `CQC-G07-03` — Borner les dialogues spécifiques | P1 / retenue | Les relations prioritaires ont leurs répliques ; les autres utilisent un générique qualifié sans faux dialogue officiel. |

## 08. Routes individuelles

Document CQC : [NARRATION.md](NARRATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G08-01` — Conserver les routes héritées | P1 / retenue | Les Chroniques existantes restent liées aux UID ; les enrichissements ne sont pas comptés comme nouveaux personnages. |
| `CQC-G08-02` — Motiver les rencontres pilotes | P1 / retenue | Chaque combat des huit routes précise adversaire, lieu, enjeu, conséquence et condition de progression. |
| `CQC-G08-03` — Distinguer intro rival outro | P1 / retenue | Plans et objectifs émotionnels diffèrent ; une image commune ne clôt pas plusieurs scènes requises. |

## 09. Campagne globale

Document CQC : [NARRATION.md](NARRATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G09-01` — Créer un conflit commun distinct | P1 / retenue | La campagne possède incident, menace, revers et résolution ; un circuit de duels n’est pas compté comme ce récit. |
| `CQC-G09-02` — Ficher les chapitres | P1 / retenue | Chaque chapitre relie acteur, époque, objectif, scènes, lieux, combats, checkpoint et assets. |
| `CQC-G09-03` — Séparer fiction du projet et canon | P1 / retenue | Les rencontres entre époques et reconstructions d’archives sont annoncées comme dispositif CQC. |

## 10. Illustrations narratives

Document CQC : [NARRATION.md](NARRATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G10-01` — Préparer les plans avant génération | P1 / retenue | Chaque plan précise fonction narrative, acteurs/version, cadrage, expression, lumière et raccord. |
| `CQC-G10-02` — Conserver texte et continuité | P1 / retenue | Dialogue séparé des images ; tenue, blessures, armes et état du décor suivent la scène précédente. |
| `CQC-G10-03` — Suivre les images par unité | P1 / retenue | Un plan décrit reste à produire tant que son fichier et sa revue visuelle ne sont pas présents. |

## 11. Boss et Boss Rush

Document CQC : [ARENES_ET_BOSS.md](ARENES_ET_BOSS.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G11-01` — Décrire phases et fenêtres | P1 / retenue | Chaque boss relie signaux, attaques, points faibles, réponses, échec, victoire et reprise. |
| `CQC-G11-02` — Respecter échelle et morphologie | P1 / retenue | Tester courte portée, zoner, petite cible et grande machine ; aucune prise humanoïde imposée à un véhicule. |
| `CQC-G11-03` — Borner les règles du Boss Rush | P1 / retenue | Ordre, vie conservée, ressources, récupération, essais, score et récompenses sont explicités. |

## 12. Modes de jeu

Document CQC : [README.md](README.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G12-01` — Conserver les modes accessibles | P0 / retenue | Inventorier les routes réelles du menu et leur module ; préserver les extensions existantes. |
| `CQC-G12-02` — Décrire un parcours complet | P0 / retenue | Entrée, sélection, combat, résultat, revanche, sortie et reprise sont contrôlés pour chaque mode retenu. |
| `CQC-G12-03` — Décider les extensions | P2 / differee | Tag, coopération, exploration, classement et crossplay restent différés ou à décider avec justification. |

## 13. Composition des arènes

Document CQC : [ARENES_ET_BOSS.md](ARENES_ET_BOSS.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G13-01` — Délimiter chaque vue | P0 / retenue | Lieu, époque, secteur représenté et parties encore absentes restent explicitement décrits. |
| `CQC-G13-02` — Garantir la lisibilité latérale | P0 / retenue | Sol, ancrage des pieds, échelle, contraste et avant-plan sont contrôlés à la taille de jeu. |
| `CQC-G13-03` — Définir les couches utiles | P0 / retenue | Les PNG opaques P61/P62 restent sources ; parallaxe, sol et props séparés sont suivis comme tâches distinctes. |

## 14. Arènes vivantes et statiques

Document CQC : [ARENES_ET_BOSS.md](ARENES_ET_BOSS.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G14-01` — Séparer quatre axes | P1 / retenue | Présentation, interactions, dangers et transitions possèdent quatre réglages indépendants. |
| `CQC-G14-02` — Préserver les signaux en statique | P1 / retenue | Le mode réduit/statique conserve terrain et informations nécessaires aux événements actifs. |
| `CQC-G14-03` — Décrire les activités de fond | P1 / retenue | Chaque boucle possède rôle, acteurs, fréquence, durée et priorité ; son impact gameplay est explicite. |

## 15. Connexions et interactions

Document CQC : [ARENES_ET_BOSS.md](ARENES_ET_BOSS.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G15-01` — Relier des zones jouables | P1 / retenue | Chaque liaison possède IDs origine/destination et preuve de disponibilité avant activation. |
| `CQC-G15-02` — Définir état et contre-jeu | P1 / retenue | Déclencheur, défense, dégâts, chrono, combo, positions, retour et cas KO/simultanés sont spécifiés. |
| `CQC-G15-03` — Qualifier les props interactifs | P1 / retenue | Dessin de fond, destructible, obstacle et interaction ont des statuts séparés avec coûts et reset. |

## 16. Ennemis et projectiles

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G16-01` — Conserver des inventaires par rôle | P0 / retenue | Ennemi, soutien, véhicule, projectile et VFX ont chacun leur unité et leur propriétaire. |
| `CQC-G16-02` — Séparer corps et effet | P0 / retenue | Corps, émission, trajet et impact sont liés sans confondre fumée VFX et obus BOX-T. |
| `CQC-G16-03` — Spécifier le comportement distant | P0 / retenue | Origine, vitesse, durée, collision, garde, destruction, réflexion et fin de manche sont vérifiables. |

## 17. Production des assets

Document CQC : [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G17-01` — Conserver une source par image | P0 / retenue | Un sujet exploitable par PNG ; cadrage complet et véritable transparence pour les détourages. |
| `CQC-G17-02` — Contrôler référence et asymétrie | P0 / retenue | La revue compare silhouette, proportions, matériaux, accessoires et côtés anatomiques. |
| `CQC-G17-03` — Préserver provenance et octets | P0 / retenue | Chemin, dimensions, SHA-256, SHA Git, références et réserves sont conservés par source. |

## 18. Animation VFX son caméra

Document CQC : [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G18-01` — Produire les animations après la phase de sprites fixes | P1 / differee | La planification des entrées/sorties, contacts, gardes, chutes et actions est conservée ; les fichiers animés sont produits dans un lot ultérieur. |
| `CQC-G18-02` — Définir les signaux audiovisuels | P1 / retenue | Émission, impact, garde, ressource, ambiance et annonces restent lisibles et réglables. |
| `CQC-G18-03` — Préserver le temps du combat | P1 / retenue | Caméra et hitstop ne modifient pas silencieusement simulation, collisions et résultats. |

## 19. Interface et expérience

Document CQC : [ETAT_DU_JEU.md](ETAT_DU_JEU.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G19-01` — Vérifier tous les écrans du parcours | P0 / retenue | Mode, sélection, HUD, pause, résultat et reprise affichent les règles et le contenu disponibles. |
| `CQC-G19-02` — Garder la navigation cohérente | P0 / retenue | Clavier/manette, retour, focus, confirmation et erreur permettent de sortir de chaque écran. |
| `CQC-G19-03` — Distinguer disponible et candidat | P0 / retenue | Un PNG en PR ou une fiche de conception n’est pas présenté comme combattant ou stage prêt. |

## 20. Tutoriels et entraînement

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G20-01` — Enseigner les règles réellement actives | P0 / retenue | Approche, garde, projection, punition et ressource ont des exercices reproductibles. |
| `CQC-G20-02` — Configurer une situation | P0 / retenue | Position, vie, jauge et partenaire peuvent être réinitialisés pour isoler un problème. |
| `CQC-G20-03` — Diagnostiquer les actions | P0 / retenue | Commandes, dégâts, durées et collisions sont observables ; enregistrement de mannequin reste qualifié selon le code. |

## 21. IA et difficulté

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G21-01` — Respecter le kit de l’incarnation | P0 / retenue | L’IA utilise coûts, délais et actions réellement autorisés par son profil. |
| `CQC-G21-02` — Rendre la difficulté explicable | P0 / retenue | Réaction, choix, erreurs et ressources changent selon le niveau ; exceptions de boss annoncées. |
| `CQC-G21-03` — Tester les familles de situations | P0 / retenue | Coins, projectiles, pièges, petites cibles, géants et objectifs de campagne ont des scénarios dédiés. |

## 22. Équilibrage et accessibilité

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G22-01` — Éviter les boucles sans réponse | P0 / retenue | Combos, garde, projection et transitions sont testés avec retour au contrôle du défenseur. |
| `CQC-G22-02` — Offrir les réglages de confort | P0 / retenue | Texte, contraste, sous-titres, volumes, secousses, flashs et fond statique conservent les informations utiles. |
| `CQC-G22-03` — Séparer campagne et duel normalisé | P0 / retenue | Bonus d’équipement/progression ne modifient pas silencieusement les règles compétitives. |

## 23. Multijoueur et replays

Document CQC : [COMBAT.md](COMBAT.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G23-01` — Fermer le parcours local | P0 / retenue | Attribution des côtés, profils de commandes, reconnexion, pause et revanche sont testés. |
| `CQC-G23-02` — Préparer le réseau sans le déclarer livré | P2 / differee | Rollback, matchmaking, classement et crossplay sont différés ; dépendances de simulation documentées. |
| `CQC-G23-03` — Versionner les replays | P0 / retenue | Commandes, RNG et version de règles sont nécessaires ; un historique de résultats n’est pas un replay reproductible. |

## 24. Progression et sauvegardes

Document CQC : [ETAT_DU_JEU.md](ETAT_DU_JEU.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G24-01` — Isoler les espaces de sauvegarde | P0 / retenue | Les clés CQC et Shadow restent distinctes dans export, import et réinitialisation. |
| `CQC-G24-02` — Reprendre les parcours | P0 / retenue | Chapitre, route, déblocages et options survivent à une fermeture et à une mise à jour compatible. |
| `CQC-G24-03` — Rendre les récompenses lisibles | P0 / retenue | Conditions de scène, costume, défi et mode sont annoncées sans confondre fichier présent et contenu débloqué. |

## 25. Inventaires et statistiques

Document CQC : [README.md](README.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G25-01` — Suivre six étapes séparées | P0 / retenue | Lore, conception, assets, intégration, validation et publication possèdent leurs états propres. |
| `CQC-G25-02` — Relier les sources aux périmètres | P0 / retenue | Chaque asset sélectionné a ses workIds, documents, empreintes et références ; les archives restent exclues. |
| `CQC-G25-03` — Publier des comptes comparables | P0 / retenue | Images, périmètres, profils, plans narratifs et tests ont des dénominateurs distincts et datés. |

## 26. Validation et ordre de production

Document CQC : [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G26-01` — Définir terminé par livrable | P0 / retenue | Source fixe, combattant, arène, boss, route et campagne ont chacun leurs portes de validation. |
| `CQC-G26-02` — Vérifier les dépendances avant admission | P0 / retenue | Un asset n’est admis qu’après identité, bindings, mode d’usage et test du parcours annoncés. |
| `CQC-G26-03` — Produire par lots cohérents | P0 / retenue | Le lot P62 complète les secteurs partiels existants avant d’inventer de nouvelles cartes ou variantes. |

## 27. Fiches types

Document CQC : [FICHES_ET_VALIDATION.md](FICHES_ET_VALIDATION.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G27-01` — Associer les dix types de fiches | P0 / retenue | Projet, personnage, action, finisher, route, scène, arène, transition, boss et asset ont un emplacement CQC. |
| `CQC-G27-02` — Conserver les champs inconnus | P0 / retenue | Un champ non établi garde un motif et une prochaine preuve ; aucune valeur de remplissage présentée comme validée. |
| `CQC-G27-03` — Fournir des fiches concrètes | P0 / retenue | Les huit pilotes, leurs récits, les arènes et les boss détaillés servent de références contextualisées. |

## 28. Instruction du projet

Document CQC : [README.md](README.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G28-01` — Relier cette bible au dépôt | P0 / retenue | README racine, guide d’intégration et audit historique pointent vers le même index central. |
| `CQC-G28-02` — Préserver les autorisations existantes | P0 / retenue | Les ajouts nécessaires sont publiés dans PR25 ; aucune fusion ou certification n’est déduite de la publication. |
| `CQC-G28-03` — Conserver la reprise vérifiable | P0 / retenue | Le bilan indique refs auditées, fichiers produits, validations exécutées, restants et blocages. |

## 29. Références et vocabulaire

Document CQC : [README.md](README.md).

| Exigence | Priorité / décision | Critère de validation |
|---|---|---|
| `CQC-G29-01` — Séparer inspirations et règles | P0 / retenue | Les jeux du guide inspirent des choix ; leurs fonctionnalités ne sont pas attribuées automatiquement à CQC. |
| `CQC-G29-02` — Utiliser des sources identifiables | P0 / retenue | Les faits techniques citent le code épinglé ; les faits de lore citent les références de l’incarnation. |
| `CQC-G29-03` — Garder un vocabulaire commun | P0 / retenue | Roster, moveset, hitbox, hurtbox, rollback et placeholder sont employés avec les sens du guide. |
