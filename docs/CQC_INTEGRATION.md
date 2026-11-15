# CQC Versus Legacy dans Shadow Codec Ops

L’onglet **CQC VERSUS** lance le même runtime que le jeu CQC indépendant. Il est disponible dans la navigation principale, depuis l’accueil et directement à `/?module=cqc`. Le bouton **Ouvrir le jeu séparément** ouvre `/cqc/index.html` sur le même site ; **Plein écran** réserve toute la surface au jeu. Le module React et son iframe sont créés seulement lorsque l’onglet est ouvert.

## Sources et synchronisation

La source complète reste le répertoire CQC autonome. `public/cqc/` est une distribution des fichiers nécessaires aux parcours de jeu accessibles depuis son menu : duels, entraînement, chroniques, arcade, opérations, répertoires et fronts historiques jouables. Le script lit leurs références sans exécuter les anciens scripts de packaging.

```sh
npm run cqc:sync -- --source /path/to/cqc-versus-v056
npm run cqc:check
npm run qa
```

La synchronisation prépare une copie temporaire, vérifie tous les SHA-256 et remplace la distribution après validation. Une dépendance de jeu manquante bloque le remplacement. `public/cqc/runtime-manifest.json` contient les chemins, octets, SHA-256 et références de chaque fichier distribué. Ses comptes sont calculés sur la copie effective, sans date ni chemin privé dans le manifeste.

Les illustrations WebP utilisées restent identiques aux sources. Un PNG utilisé directement, notamment les six nouvelles scènes de Viper, est conservé au même chemin avec exactement les mêmes octets. Les images originales inutilisées, références de génération, conversations, historique de fichiers, tests, scripts et rapports de production restent dans le paquet CQC autonome complet. Les modes **Archive** et **Recovery Files** du jeu sont bien conservés : leurs noms désignent des parcours jouables.

Deux adaptations de la copie web sont documentées par le manifeste :

- L’atelier web affiche les comptes de la version chargée et propose les liens de jeu. Les outils, références et rapports de production restent accessibles dans le paquet autonome complet.
- Le gestionnaire de sauvegardes limite export, import et réinitialisation aux clés commençant par `cqc`, au lieu de rechercher cette chaîne n’importe où dans une clé. Le jeu CQC source reste inchangé.

## Sauvegardes et fonctionnement hors ligne

CQC conserve ses clés existantes `cqc-*` et `cqc_*`. Shadow conserve `shadow-codec-ops:*`. Un export CQC ne contient pas les sauvegardes Shadow ; son import et sa réinitialisation ne les modifient pas. Les vues CQC embarquée et indépendante sur le même site retrouvent la même progression. Pour passer d’un ZIP ouvert localement à un site web, ou changer de site, utilise l’export/import des options CQC : les navigateurs séparent les données selon l’origine.

La PWA Shadow n’ajoute pas toutes les illustrations CQC au téléchargement initial. `/cqc/**` est exclu du préchargement et du renvoi automatique vers la page React ; le service worker conserve les fichiers CQC consultés dans un cache distinct, à la demande. Une scène jamais ouverte demande donc encore une connexion. Ce cache limite son contenu à 300 requêtes pendant 30 jours et n’équivaut pas à une installation hors ligne complète du paquet CQC.

## Vérification du 1er octobre 2026

TypeScript, six tests de distribution, build Vite et contrôle PWA réussis. Chromium a chargé l’accueil Shadow, ouvert CQC depuis sa navigation, lancé un duel CPU et ouvert le jeu indépendant. Les vues 1280 × 800 et 390 × 844 sont rendues sans débordement horizontal. Export, import et réinitialisation CQC ont également été vérifiés avec une clé témoin Shadow contenant le mot `cqc` : cette clé est préservée.

Ces contrôles valident l’intégration et le lancement du duel ; ils ne couvrent pas tous les combats, toutes les routes narratives ou les appareils physiques. L’intégration ne transforme pas les sprites et décors procéduraux existants en assets définitifs : leur remplacement suit les lots CQC validés puis une nouvelle synchronisation.

## Lot final CQC vérifié

La copie web contient 713 fichiers / 443 465 475 octets (422,9 Mio), dont les 123 plans des 30 stages et 36 PNG / 432 poses pour Naked Snake MGS3, Viper GBC, The Boss MGS3, Raiden MGS2, Solid Snake MGS1 et l’OC PARALLAXE. Les fichiers copiés sont vérifiés par SHA. La source complète conserve toutes les générations et leurs limites ; 349 combattants canoniques restent au rendu procédural.

Validation finale : 705 tests sur 104 fichiers, TypeScript, build Vite et contrôle PWA passent. Le navigateur a exécuté 39 commandes sur desktop et 390 × 844 : onglet, duel CPU, HUD mobile 14 px, les six sprites prêts et six nouveaux stages prêts, sauvegardes isolées et ouverture indépendante. Aucun échec ni erreur JavaScript. Preuves dans `docs/reprise-qa-cqc/`.

Après une synchronisation qui ajoute des fichiers, redémarrer un serveur Vite déjà ouvert pour reconstruire son inventaire public. La vérification finale utilise un nouveau serveur local sur un port libre.

Cette livraison locale ne prétend pas un déploiement GitHub/Vercel. Fidélité réelle `accepted_closest`, objectif 1:1 et limites de sources déclarées.
