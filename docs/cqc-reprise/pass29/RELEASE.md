# Articulations natives des Metal Gear — Pass29

Les machines utilisent maintenant leurs morceaux dessinés comme des pièces articulées : hanches fixes, genoux et chevilles reliés, pieds compensés, armes avec recul, pinces et gouvernes mobiles. Les découpes utilisent les images natives existantes et des masques propres à chaque morceau, y compris les variantes endommagées.

## Changements

20 ensembles de machines sont concernés : REX MGS1, RAY MGS2, RAY Revengeance, Sahelanthropus, Metal Gear D, TX-55, Gander, RAXA, ZEKE, BIC, Pupa, Chrysalis, Cocoon, Peace Walker quadrupède, Excelsus, Shagohod, Kodoque, Chaioth, Outer Haven et Arsenal Gear.

- 26 composants deviennent indépendants : 24 nouveaux nœuds et les deux pieds de RAY Revengeance restaurés dans leurs identifiants existants. Le catalogue conserve 62 rigs et passe de 728 à 752 parties.
- Les longueurs des membres et les articulations suivent les points mesurés dans les sprites. Les chaînes à deux segments maintiennent le pied à plat ; une jambe déjà tendue réduit sa foulée au lieu de tirer le pied hors du sol.
- Les canons de Gander, Shagohod et Kodoque utilisent leurs véritables bouches dessinées pour les sorties d'armes. Le recul du tube conserve la culasse attachée.
- Les six pieds d'Excelsus, trois petits canons de Cocoon, deux pinces de Chaioth et deux gouvernes d'Outer Haven sont séparés de leur support.
- Les ruptures héritent de la transformation du parent au premier instant. Les morceaux détachés gardent leur mouvement dans le monde.
- Les huit modules consommateurs chargent les quatre helpers communs. CQC autonome et Shadow Ops utilisent les mêmes octets, sur les 2 638 fichiers du graphe normal.

Le cache conserve les machines actives pendant les transitions. Une machine dont le chargement dépasse sa protection initiale reçoit une nouvelle protection à la fin du décodage. L'annulation termine les promesses en file et nettoie les images arrivées tardivement. Les plafonds restent huit rigs, 96 Mio estimés et deux chargements simultanés.

## Vérification

Les 84 PNG concernés ont été physiquement décodés et leurs empreintes conservées. Aucune image source n'a été modifiée. Les partitions mesurées n'omettent ni ne dupliquent les centres des pixels opaques ; les anciens identifiants, dégâts et sauvegardes restent conservés. Le cadrage historique des 62 rigs est inchangé.

Les contrôles comprennent les équations d'articulation, les masques de variantes, les matrices au repos, des rendus Canvas dans Chromium et les ruptures au premier instant. Le banc partagé couvre 13 familles et 52 poses. Six matchs ont été lancés depuis les vrais menus : Hammerhead en Versus depuis les deux applications, REX et Peace Walker dans Arsenal, puis RAY et Excelsus dans le mode Revengeance. La séquence Arsenal Excelsus → Shagohod → Kodoque vérifie également les chargements, les tirs, plus de 13 secondes de jeu naturel par machine et la pause.

Les huit cas contrôlés du cache passent, notamment le chargement de plus de 12 secondes et la réutilisation après annulation. Les 18 tests existants de navigation passent. Les preuves de build, de publication et les captures finales sont conservées avec la livraison Pass29 ; ces contrôles de source ne constituent pas, à eux seuls, une preuve du déploiement distant.

## Fidélité et limites

La cible reste la fidélité maximale aux incarnations d'origine. Ces mouvements sont une adaptation à partir des dessins disponibles, pas des animations extraites des jeux. Les articulations cachées restent une reconstruction mécanique en 2D. La séparation conserve les PNG, mais quelques limites de masques produisent de petites différences d'anticrénelage : RAY Revengeance 42 pixels, Cocoon 65 pixels, ensembles lourds 44 à 163 pixels dans les captures neutres mesurées. Cela ne certifie pas un assemblage RGBA identique ni une fidélité absolue 1:1.

Les sources absentes restent explicitement absentes : pièces extérieures d'Arsenal, REX MGS4 distinct, Peace Walker bipède, outils de Mk.II/III, pinces du BIC et pod de ZEKE. Les vis de Shagohod et les chenilles ne tournent pas artificiellement comme des roues plates lorsqu'il manque leurs phases natives. Les proportions et perspectives dessinées de Gander restent à reprendre.

REX et RAY restent accessibles dans leurs modes boss existants. Le Raiden schématique du module Revengeance et le chevauchement de très grandes machines en Versus restent des chantiers séparés. Les captures utilisent des profils QA neufs ; aucune migration de sauvegarde privée n'est certifiée.

Voir [les travaux suivants](NEXT_LOT.md) et [le relevé structuré](NATIVE_ARTICULATION.json).
