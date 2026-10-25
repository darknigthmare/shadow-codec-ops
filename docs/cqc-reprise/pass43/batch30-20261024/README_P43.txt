P43 — 30 costumes canoniques et intégration CQC

Ce lot ajoute 30 costumes à 10 identités existantes. Les 960 dessins natifs sont mappés dans les deux orientations, avec leurs books, géométries, points d’armes et revues de référence. Chaque incarnation conserve son UID. Le dossier public/cqc du dépôt ShadowOps sert le CQC autonome et l’onglet intégré ; le standalone S est son miroir local, sans second arbre Git.

Les tenues sont reliées à 30 options Versus, 30 Support et 25 Core. Les cinq costumes du Captain ne s’appliquent pas au Core. Le chargement conserve les contrôles SHA/bytes et relève la borne à 8 MiB seulement pour six couples UID/costume épinglés. Les points natifs des armes et contacts, les menus grands formats et le mouvement des dix machines font partie du lot. Les corrections d’échelle ciblent le trenchcoat et le Gekko Original ; l’échelle du trenchcoat reste une estimation documentée. Le tir du Gekko Original en Soutien utilise encore un projectile générique ; son origine et ses VFX natifs restent à réaliser et figurent dans le suivi.

Le manifeste conserve les 132 références distantes historiques et déclare explicitement les 80 nouvelles, toutes liées à Native002. Le scanner conservateur retrouve aussi douze anciens fichiers locaux inchangés : les onze chemins absents dans Git sont ajoutés avec leurs bytes exacts. Cette fermeture de dépendances ne sélectionne pas six nouveaux costumes et ne modifie aucun ancien raster.

Validations locales effectivement obtenues :
- 30 options VS compilées, 960 rôles mappés, 5 400 phases et 204 origines contrôlées ; 218 admissions antérieures préservées.
- 10 variantes Core spécifiques pour les 25 options applicables ; 3 942 phases, 96 points, 20 contacts, 162 cas de canon Raiden MGS2 et 434 cas hérités vérifiés en VM.
- GUI réelle : 30 VS / 302 cas, 25 Core / 244 cas et 30 Support / 40 cas, avec les essais, annulations et reprises détaillés conservés dans le paquet QA compact.
- Mouvement réel des dix machines, puis contrôles ciblés des deux orientations après les corrections d’échelle.
- Installation A/S réelle et contrôlée ; Academy reste byte-identique et embarque Versus par son iframe.
- Cinq contrôles sur l’installation : cqc:check, lint, 723 tests dans 106 fichiers, build frais et vérification PWA.
- Build neuf de 4 120 fichiers : deux parcours de match natif complets, autonome et intégré, puis navigation réelle CODEC/retour CQC et Academy/retour commande.

Le parcours du build neuf ne présente aucun asset de jeu en 404, aucune exception runtime ni erreur console. Une requête automatique facultative /favicon.ico en 404 et les annulations réseau explicitement attribuées aux changements de vue restent consignées. Les reçus incomplets précédents conservent leur statut ; un audit distinct qualifie les actions réellement achevées.

Production réellement vérifiée : https://shadow-codec-ops.vercel.app, déploiement dpl_9JMLK7PMmmvKW3pXspzEC4A3AjeX, commit runtime ac90e6eadb876bd6a5f30ffe1306363ead0bd0b7. L’API confirme READY et ce SHA Git résolu ; les 24 URL publiques contrôlées répondent 200 avec les bytes/SHA attendus, en TLS strict sans redirection. Les trois smokes de production couvrent un costume par mode : 10 cas Versus, 10 Core et 1 Support, plus les deux entrées autonome et intégrée. Cette couverture finie complète les 85 options testées localement ; elle ne prétend pas rejouer ces 85 options en production.

Les audits publics de production conservent les favicon facultatifs en 404 et les annulations de previews identifiées. Les requêtes annulées ne sont pas présentées comme des chargements navigateur achevés ; les GET 200 séparés attestent seulement l’existence des assets. Les premiers reçus globaux incomplets gardent leur état. Les observations terminées sont qualifiées dans des audits distincts.

Le nouveau classeur V7 postproduction joint décrit les références, les limites fines de fidélité et les étapes réellement vérifiées ; les anciens classeurs datés restent intacts. L’approbation des sources, la compilation, le jeu réel, l’installation, le build, Git et la production gardent leurs preuves distinctes. Le commit de documentation et d’Excel conserve tous les fichiers du jeu identiques au runtime ac90 et ne déclenche aucun nouveau déploiement explicite. Les revues visent la fidélité demandée sans constituer un certificat de reproduction retail 1:1.

Archives et reproduction :
- Archive native courante : cqc-pass43-native-002, commit d810ab3387f76211b4b0d67146e7a2ca166ac80e ; 30 métadonnées VS/Support et 10 variantes Core.
- Les 158 PNG candidats et tentatives sont conservés par SHA dans les archives immuables. Les jobs revus désignent les sources actives ; les essais tenus en réserve restent identifiés. Native001 est historique et n’alimente aucune URL active.
- Le paquet portable garde les jobs, books, géométries et revues byte-exacts. Les JSON annexes sont regroupés sans perte avec un vérificateur/restaurateur. Les métadonnées et PNG natifs sont référencés plutôt que dupliqués.
- Le replay utilise les namespaces isolés enregistrés et le snapshot Git baseline épinglé. Les instructions et cartes de restauration indiquent les dépendances exactes ; aucun remappage silencieux des pins approuvés n’est effectué.
