# CQC P55 — variantes et décors séparés

Hi-Tech MGS2 et Pequod TPP disposent chacun de sept nouveaux costumes : rétro redessiné, tuxedo, châssis cybernétique, machine Metal Gear, Dité, zombie décomposé et animal anthropomorphe. Chaque tenue possède un seul sprite. Le rendu détaillé de leur Original couvre la famille nextgen de la même incarnation, sans nouveau dessin.

La galerie de l’Atelier affiche les quatorze poses avec des appuis centrés et conserve ses pixels après filtres et redimensionnements. La première machine de Pequod reste archivée ; la version retenue remplace sa poche textile par une trappe mécanique rigide.

Canyon, tour de communication B et avenue africaine R-00 utilisent chacun un fond nettoyé et deux PNG séparés. Les identifiants des scènes restent ceux de P54. Versus/Core libres, Academy IA libre, Chronicles personnalisées et les trois rencontres Arsenal associées chargent les plans avant le lancement. Le déplacement du joueur ne modifie ni la caméra de ces boss ni leur ancrage.

Le hangar Blackfoot réemploie exactement l’atlas, le contrôleur et le contrat P41. Démarrer/pause, visée et assiette sont accessibles depuis l’Atelier. Son admission au combat reste en attente des sources et pièces manquantes.

## Vérification

735 tests du projet et 55 contrôles ciblés passent. Le contrôle canonique vérifie 2 990 fichiers et conserve les 499 routes externes. Le build TypeScript/Vite/PWA et la lecture des 3 016 fichiers CQC servis passent ; les 25 fichiers historiques hors graphe restent présents. Les quatre HTML d’entrée sont les seuls fichiers historiques du graphe modifiés.

Les 37 cas navigateur liés au manifeste et à l’inventaire couvrent galerie, Core, Academy, Chronicles et trois combats réels, avec chargement interrompu puis nouvelle tentative. Les deux entrées compilées, autonome et Shadow Ops, passent également. Les poses préparent une animation ultérieure ; aucune admission artificielle de combattant n’est déclarée.

## Sources et suivi

[Excel 73 onglets](CQC_SUIVI_P55_VARIANTES_ET_PARALLAXE_20261120_PUBLIC_V1.xlsx) · [Bilan vérifié](P55_FINAL_VERIFICATION_PUBLIC_V1.json)

Les 70 anciens XML de feuilles et 59 autres membres protégés du classeur restent identiques. Les 24 PNG produits sont conservés : 23 sélectionnés et une première version écartée. Les quatorze gardes de génération héritées restent inchangées. Les anciennes feuilles conservent le reste du backlog.

Les surfaces nouvellement dessinées et les parties auparavant masquées sont des reconstructions contrôlées sur références. La projection du rotor Hind et l’échelle relative du RAY héritées restent consignées à reprendre ; cette passe qualifie les nouveaux décors, pas ces corps de machines.

Les sources PNG exactes ont été vérifiées à l’objet Git dans le commit `645c058381265a6c885195ab063ad7820b8d4841`. Un transport par fragments a permis de conserver tous les octets malgré le blocage des gros appels du connecteur. La sauvegarde locale de livraison conserve les rapports internes et métadonnées détaillées.

Vercel a signalé un quota de déploiement avec attente de 24 heures sur P54. Cette livraison n’est pas annoncée en production.
