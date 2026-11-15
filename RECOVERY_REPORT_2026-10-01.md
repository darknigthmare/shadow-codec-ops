# Reprise de Shadow Codec Ops — 1er octobre 2026

## Sources retrouvées

- Dépôt : https://github.com/darknigthmare/shadow-codec-ops.
- Branche contenant la livraison la plus récente : `codex/add-missing-character-art`.
- Commit de départ : `eb8a791f1c559da92fd940a36ffb06f8e01bd70e`, du 8 septembre 2026.
- `main` : `9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c`, quatre commits en arrière, sans divergence.
- Production Vercel : https://shadow-codec-ops.vercel.app ; déploiement READY du 8 septembre 2026, lié au commit de départ.
- Aucun ticket ni pull request retrouvé dans les collections GitHub consultées.

Les 1 954 fichiers du commit déployé ont été récupérés. Les empreintes Git des 1 951 fichiers hors README, feuille de route et version applicative ont été comparées au manifeste distant avant les corrections supplémentaires : aucune différence. Les deux branches et leur historique ont été conservés dans une sauvegarde Git complète ; `git bundle verify` la valide sans prérequis.

La reprise travaille sur une nouvelle branche issue du commit déployé. Elle ne remplace pas les branches d'origine ni le site en production.

## État reconstitué

| Élément | État vérifié dans les sources | Suite |
| --- | --- | --- |
| Codec multi-époques | Dossiers, conversations originales, portraits et outils présents | Affiner le contenu selon les décisions historiques récupérées |
| Side Ops | 28 opérations de campagne, 12 packs, scènes dédiées MG1/MGS1 et modes VR | Corps et rencontres MG2/MGS2/MGS3/MGS4 encore partiels |
| Machines Peace Walker | ZEKE, Basilisk, Chrysalis et Cocoon intégrés | Variantes, armements et attaques secondaires non exhaustifs |
| Archives PW/TPP | 40 dossiers, 16 PW et 24 TPP ; visuels et inspection 2D | Distinguer ce contenu visuel des futures IA, collisions et missions |
| Props communs | Six objets acceptés | Porte 34 × 92 et ascenseur 42 × 68 encore `deferred` |
| Animations MG1/MGS1 | Nouvelles planches et anciens rigs coexistent | Remplacer les rigs/effets historiques restant procéduraux |
| Windows | Configurations natives 3.10 ; rapports d'installateurs 3.9 | Binaires et recette Windows locaux non récupérés ici |

L'audit `ASSET_COVERAGE_AUDIT_2026-09-08.md` précède les livraisons `ASSET_WAVE_3.9.0.md` et `ASSET_WAVE_3.10.0.md`. Ses manques ZEKE/Basilisk et son risque de remplacement de Snake par Raiden dans le Builder sont déjà corrigés. Les corps PW/TPP livrés en 3.10 ne doivent pas être regénérés comme s'ils étaient absents ; leur inspection reste dépourvue d'IA de combat, d'objectifs et de récompenses.

## Corrections de reprise

- Version affichée et métadonnées de sauvegarde : `APP_VERSION` lit désormais la version du paquet, 3.10.0, au lieu de conserver une valeur 3.9.0 séparée. Aucun changement du schéma de sauvegarde.
- Installation reproductible : les 485 URL `resolved` du verrou npm pointent vers `registry.npmjs.org`. Le registre interne précédent retournait HTTP 403. Versions, empreintes d'intégrité et graphe des dépendances sont conservés ; installation validée avec `npm ci`.
- README et feuille de route : état 3.10, sources, périmètre réel et priorités restantes ajoutés. Les passes et rapports historiques sont conservés.
- Tests de géométrie des acteurs spéciaux : réinitialisation du cache de modules et suppression du mock Phaser après la suite. Le mode `--no-isolate` réutilisait un module chargé avec un mock limité à `Scene`, provoquant quatre échecs `Physics.Arcade` selon l'ordre des fichiers. Les doubles et assertions de collision sont conservés ; aucun changement des comportements de jeu.

## Validation de la reprise

- `npm ci` réussi après normalisation des seules URL du verrou.
- `npm run qa` réussi : TypeScript, **699 tests / 103 fichiers**, compilation de production et contrôle PWA.
- Importeurs Python : **37 + 11 tests réussis**.
- Audit autonome des portraits : les **42 WebP** correspondent aux dimensions et empreintes des sources conservées.
- Isolation Phaser : la paire reproduisant les quatre échecs passe **16/16** ; coexistence avec les scènes/runtime **72/72**.
- `git diff --check` réussi ; aucune modification des images et contenus de jeu.

La première exécution des portraits sous le profil réseau restreint a échoué sur `spawnSync EPERM`. Le même test, avec les permissions d'exécution nécessaires, passe sans modification du contrôle de provenance. Aucune nouvelle recette navigateur, construction native Windows ni publication Vercel n'est annoncée pour cette reprise.

## Informations encore nécessaires

Le lien du projet ChatGPT fourni mène à un écran de connexion dans l'environnement de reprise. Les outils exposés donnent accès aux Pages/Spaces, et aucune correspondance n'y a été trouvée ; ils ne donnent pas accès à l'ensemble de l'historique des conversations. Un lien de conversation partagée transmis ensuite a pu être lu : il concerne le jeu annexe **CQC Versus Legacy v0.56**, distribué en ZIP, et non une nouvelle version de Side Ops. Ses données et artefacts sont suivis séparément de ce dépôt. Les autres conversations et leurs pièces jointes restent à récupérer pour réconcilier les décisions et travaux non committés.

Aucun fichier CSV ni terme exact `CSV`, `éther` ou `ether` n'a été retrouvé dans les chemins et contenus de ce dépôt recherchés. La conversation annexe CQC mentionne les exports `SCENES_1692_A_PEINDRE_v0.56.csv` et `RECITS_282_A_PEINDRE_v0.56.csv` ; elle fournit donc une piste concrète pour la mention « CSV ». Le sens de « l'éther » reste à préciser.

Les répertoires Windows locaux mentionnés dans les anciens rapports, leurs captures de recette, sources rejetées et installateurs ne font pas tous partie du dépôt. Leur présence dans un rapport ne prouve pas leur récupération. La sauvegarde couvre le Git retrouvé ; elle ne couvre pas les conversations privées, les modifications restées sur une autre machine ou les sauvegardes locales du navigateur utilisateur.

L'ordre de continuation vérifié est : réconcilier les conversations, produire les deux structures différées, puis compléter les animations et rosters par lots avec leurs références, provenance, chargement, usages en jeu et validation. Les nouveaux comportements PW/TPP doivent être définis séparément de la livraison des visuels.

## Fidélité des prochaines productions

L’utilisateur a confirmé que la cible 1:1 concerne personnages, stages, armes, équipements, lore et tout élément associé à leur univers. La [règle de fidélité](UNIVERSE_FIDELITY_REQUIREMENTS.md) exige des sources externes vérifiables de l’incarnation exacte, une comparaison réelle et des limites explicites lorsque la correspondance reste approximative. Les portraits générés conservés dans le dépôt ne valent pas seuls preuve du design original ; les OC restent identifiés comme créations originales. Cette précision documentaire ne modifie aucun asset ni comportement du jeu.
