# Fiches, production et validation — CQC

Ce contrat adapte les rubriques 17, 18 et 25–27 du [guide général](sources/Combat_Games_Guide_General_v1.0.txt). Les fiches renseignées et les exigences restent reliées au même [index de bible](README.md).

## 1. Emplacement des dix fiches du guide

| Fiche | Objet CQC et données | Preuve attendue |
|---|---|---|
| A — Projet | [README](README.md), [exigences](guide-map.json), [état du jeu](runtime-evidence.json). | Périmètre, priorités, continuités, modes, plateformes et refs auditées. |
| B — Personnage | [Roster](roster-coverage.json), [pilotes](combat-pilots.json), [narration](narrative-registry.json). | UID, incarnation, rôle, source, kit, rivalité, tenue/loadout et limites. |
| C — Action/projectile | `baseCompiledProfile.moves` des pilotes ; contrats des sources natives et revue P61 des projectiles. | Origine, durées, coût, trajectoire, résultat touche/garde/échec, zones et cas de test. |
| D — Neutralisation | [COMBAT](COMBAT.md), identifiants `p62:neutralisation:<uid>`. | Nom créé, intention, conditions, morphologies compatibles, remplacement, caméra et sortie. |
| E — Route individuelle | [NARRATION](NARRATION.md), `narrative-registry.json`. | Motivation, combats, rival, conséquence, intro/outro distinctes et statut alternatif. |
| F — Chapitre/scène | Campagne et plans du registre narratif. | Acteurs/version, lieu, enjeu, découpage, dialogue, continuité et besoins visuels. |
| G — Arène | [ARENES_ET_BOSS](ARENES_ET_BOSS.md), scopes `stage:*`, lots P61/P62. | Secteur réel, plan jouable, couches, quatre axes, scène sonore et limites de référence. |
| H — Événement/transition | Fiches `CQC-ARE-*` et liaisons proposées dans le document arènes. | Origine/destination, déclencheur, défense, durée, chrono, combo, arrivée et cas simultanés. |
| I — Boss | Fiches `CQC-BOS-*`, catalogues machine et identifiants Arsenal associés. | Échelle, phases, signaux, vulnérabilités, familles de combattants, victoire et reprise. |
| J — Asset/suivi | [asset-associations.json](asset-associations.json), manifests P60/P61/P62. | Chemin, source, empreintes, dimensions, workIds, statut par étape et prochaine preuve. |

Les identifiants historiques restent stables. Un `workId` de lacune n’est pas un UID de combattant et un ID de machine du catalogue n’est pas automatiquement un ID de rencontre Arsenal. Une association doit annoncer son type ; une correspondance non résolue reste explicitement à vérifier.

## 2. Les six axes de suivi

| Axe | États utiles | Condition de passage |
|---|---|---|
| Lore | À identifier → référencé → vérifié pour une incarnation ; ou incertain/contradictoire. | Référence de l’œuvre, édition et scène exploitables ; les éléments cachés restent qualifiés. |
| Conception | À définir → documenté → validé pour un périmètre. | Rôle, règles, limites, dépendances et critères établis ; revue distincte de l’existence d’un fichier. |
| Assets | Manquant → en production → produit → contrôlé. | Fichier non vide, bon sujet, format, cadrage, alpha si requis et revue visuelle enregistrée. |
| Intégration | Absente → associée aux données → branchée → jouable dans un mode nommé. | Binding exact, lecture de l’asset, ancrage/échelle et parcours de sélection fonctionnels. |
| Validation | Non testée → test ciblé réussi/échoué → validée pour version et conditions. | Commande ou scénario, résultat, commit/version, limites et preuve consignés. |
| Publication | Local → commit/PR → fusion → version déployée. | Lien et ref vérifiables à chaque étape ; une PR ne vaut ni fusion ni déploiement. |

Les états combinés des sources P60/P61/P62 sont conservateurs : source statique produite, identité de fichier enregistrée, fidélité visuelle à revoir, aucune admission runtime par ces passes. Les fonctionnalités héritées sont décrites séparément dans l’état du code.

## 3. Définition de « terminé » par unité

**Sprite de base :** incarnation et référence résolues ; un sujet autonome dans l’image ; silhouette entière et accessoires indispensables visibles ; transparence réelle si détourage ; marges, orientation, échelle et ancrage décrits ; réserves de fidélité revues. La validation d’un sprite ne clôt pas ses actions animées.

**Combattant :** UID et loadout résolus ; toutes les actions retenues et leurs réactions existent ; coûts, garde, projections, zones de collision, changements de côté et commandes testés ; portraits, sélection, résultat et sauvegarde compatibles. Une pose assise ou une figure documentaire demande une décision de rôle avant cette étape.

**Arène :** terrain et limites lisibles ; secteurs annoncés présents ; couches correctement ancrées ; profils statique/réduit/vivant documentés ; dangers, interactions et liaisons validés séparément. Une image de couloir ne clôt pas un complexe entier.

**Boss :** toutes les phases disposent de signaux et de réponses ; chaque famille de combattants prévue peut gagner ; défaite, reprise, victoire et Boss Rush sont testés. Une source de module avant détaché ne vaut pas véhicule complet.

**Route ou campagne :** début, progression, rivalité/revers et conclusion accessibles ; scènes distinctes et sous-titres lisibles ; sauvegarde/reprise et conséquences cohérentes ; aucune rencontre anachronique présentée comme fait officiel.

## 4. Production des sources fixes

1. Partir d’un scope inventorié, vérifier les sources déjà publiées et définir précisément la portion à compléter.
2. Rassembler une référence de la bonne œuvre/édition et inspecter les éléments visibles avant génération.
3. Produire un PNG individuel. Les décors P62 suivent la série 1672 × 941 ; les détourages doivent posséder un canal alpha avec de vrais pixels transparents.
4. Ouvrir le résultat : vérifier le sujet, les proportions, l’architecture, les objets déterminants et les défauts de cadrage. Conserver les réserves et les essais remplacés séparément.
5. Enregistrer le PNG original, ses empreintes et la fiche de lot. La sélection vient du manifeste, pas de la simple présence du fichier dans un dossier.
6. Relier la source au `workId`, aux chapitres du guide et aux dépendances de la bible. Une intégration jouable fait l’objet d’une étape et de preuves distinctes.

Les illustrations narratives peuvent contenir plusieurs acteurs lorsqu’elles représentent un plan de scène. Elles ne remplacent pas les sprites autonomes. Les textes destinés au joueur restent séparés des pixels pour la localisation.

## 5. Besoins d’animation, son et caméra — phase suivante

Pour un pilote humain : attente, marche avant/arrière, accroupissement, saut si retenu, garde haute/basse, impact, chute, relève, projection et réception, dix emplacements d’action retenus, utilitaire, victoire et défaite. Chaque animation comporte entrée, contact, sortie, durée, origine des effets, zone vulnérable et interruption autorisée.

Pour une machine : repos, déplacement propre, acquisition, préparation/attaque/récupération, réaction du point faible, changement de phase et neutralisation. Les pièces séparées suivent la cinématique réellement choisie ; le découpage d’un PNG ne prouve pas une articulation correcte.

VFX à traiter séparément : départ, trajet, impact, garde/parade, ressource, statut, dissipation et environnement. SFX : mécanique de l’arme, départ, impact, déplacement, interface et ambiance ; les signaux doivent rester distincts. Musique, voix, effets et ambiance ont des volumes séparés à valider. Les nouveaux fichiers audio ne sont pas déclarés produits dans P62.

Caméra : conserver les deux combattants et leurs points d’appui ; définir le cadrage des géants ; limiter les secousses ; garantir le retour au duel après une transition ou une neutralisation. Les effets de confort restent indépendants de la simulation.

## 6. Scénarios prioritaires d’admission

Ces scénarios sont des critères à exécuter lors de l’intégration ; cette liste n’est pas un rapport de réussite.

| ID | Situation | Résultat exigé |
|---|---|---|
| QA-CQC-01 | Changement de côté pendant une commande spéciale. | Action relative correcte, arme et asymétrie conservées. |
| QA-CQC-02 | Recharge interrompue par un impact. | Munitions et état cohérents ; pas de tir gratuit ni de blocage. |
| QA-CQC-03 | Projection contre humain, quadrupède et machine. | Compatibilité appliquée ; remplacement ou refus explicite selon la cible. |
| QA-CQC-04 | Deux attaques actives au même pas. | Résolution simultanée définie ; aucun avantage lié à l’ordre des joueurs. |
| QA-CQC-05 | Garde basse, haute, dos et parade d’explosif. | Résultat conforme aux niveaux et familles de projectile. |
| QA-CQC-06 | Répétition de combo/projection au coin. | Retour au contrôle possible ; pas de boucle non bornée. |
| QA-CQC-07 | Fumée BOX-T. | Nuage non dommageable ; corps, impact et effet correctement séparés. |
| QA-CQC-08 | Raiden MGS2 avant/après équipement de lame. | Loadout et animations cohérents avec la route. |
| QA-CQC-09 | Venom avec trois prothèses alternatives. | Aucune combinaison de capacités non annoncée par la variante. |
| QA-CQC-10 | Boss géant contre portée courte et petite cible. | Points faibles accessibles et attaques évitables dans les règles prévues. |
| QA-CQC-11 | Fond vivant/statique/réduit avec danger conservé. | Terrain et annonce du danger identiques sur les trois présentations. |
| QA-CQC-12 | Transition simultanée avec KO ou timeout. | Une destination/résolution, contrôle rendu, pas de double récompense. |
| QA-CQC-13 | Neutralisation sur cible incompatible. | Séquence de remplacement et retour au résultat garantis. |
| QA-CQC-14 | Reprise après fermeture au milieu d’une route. | Checkpoint, scènes et récompenses cohérents, sans duplication. |
| QA-CQC-15 | Export/import CQC avec données Shadow présentes. | Espace de sauvegarde respecté et progression étrangère préservée. |
| QA-CQC-16 | Perte de contrôleur, pause et reconnexion. | État sûr, touches remises à zéro et reprise explicite. |
| QA-CQC-17 | Asset ou son absent. | Erreur lisible/repli prévu ; parcours de résultat toujours accessible. |
| QA-CQC-18 | Replay avec mêmes commandes et graine. | Même résultat sur version compatible, ou incompatibilité annoncée. |
| QA-CQC-19 | Taille mobile et faible contraste. | Commandes, HUD, sous-titres et adversaires lisibles sans débordement. |
| QA-CQC-20 | Passage intro/rival/outro. | Images distinctes, texte indépendant et retour au bon combat/chapitre. |

## 7. Vérifications propres à cette livraison

`python3 docs/cqc-bible/build_registry.py` reconstruit la matrice des exigences et les associations. L’option `--verify-images`, avec Pillow, décode les nouveaux PNG P62 et vérifie leurs dimensions et empreintes. Les sources P60/P61 restent rattachées à leur manifeste publié et à leur commit de référence.

`node scripts/check-cqc-bible.mjs` vérifie les identifiants, liens de registres, compteurs, guide conservé et séparation des statuts. Ces contrôles protègent l’intégrité documentaire et les associations. Ils ne certifient pas le lore, la fidélité visuelle ou le fonctionnement de tous les modes du jeu.

Le rapport effectivement exécuté est conservé dans le [bilan P62](../cqc-reprise/pass62/README.md). Les contrôles historiques ne sont pas présentés comme réexécutés sur ce lot de documentation et de sources fixes.

## Extension P66 — 26 novembre 2026

Les 14 fiches P66 disposent d’une identité, de dimensions mesurées, d’un SHA-256, de références, d’un périmètre borné et de réserves. La revue indépendante accepte des candidats de travail ; elle ne certifie pas le 1:1. L’intégrité PNG et les bijections de catalogue sont vérifiées séparément de la fidélité visuelle. Le parcours navigateur reste non validé dans cette passe.

[Continuation et fiches P66](CONTINUATION_P66.md) · [Associations P66](asset-associations-p66.json) · [Delta](../cqc-reprise/pass66/scope-delta.json) · [QA](../cqc-reprise/pass66/INTEGRATION_QA.md)
