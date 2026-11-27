# P67 — qualification des versions dérivées

Base de déduplication : P66 5d7c6c5187f3906ad1ead53706e83674750f1c34. Résultat : **une source candidate Touch**, une vue de Gekko, et trois portées conservées ouvertes faute de référence suffisamment définie. Le [handoff](handoff.json) contient les métadonnées exactes, le prompt et les réserves. La sélection finale dépend de la revue indépendante du parent.

## Touch

La [capture de presse Konami publiée par 4Gamer](https://www.4gamer.net/games/080/G008090/20100528080/) montre une mission 07 de la version iPad : le Gekko central est visible dans sa pose aérienne. Le [fichier servi](https://www.4gamer.net/games/080/G008090/20100528080/TN/002.jpg) mesure 500 × 375 ; cette taille ne prouve pas la résolution native de l’application. Le châssis olive et les jambes organiques sombres permettent un candidat limité à cette vue. Les petits détails mécaniques et le dessous du pied fléchi restent reconstruits.

Source produite : [touch-gekko-mission07.png](../../../../../public/cqc/assets/p67/touch-gekko-mission07.png), un seul PNG transparent, sans retouche des pixels après imagegen. Aucun corps n’a été dérivé d’une carte ou d’un portrait. Le cercle de visée qui couvrait une partie du châssis a nécessité une petite reconstruction locale par génération.

Le groupe character:R-SIDE-CATALOG et le lot séparé stage:touch_acts restent ouverts. Old Snake Touch et les Gekko MGS4 du dépôt sont conservés.

## Arcade

La [galerie de gameplay 2010](https://www.metalgearsolid.fr/metal-gear-arcade-en-test-au-japon-176.html) a été consultée ; six images originales sont conservées dans references/. L’image 03 montre une cible blindée frontale en entier, mais d’environ 50 × 100 pixels, sans nom de variante certain. Les autres vues montrent des opérateurs de dos ou partiellement masqués par le HUD. L’Arcade Operator historique a été relu et identifié comme un opérateur olive générique distinct ; son SHA256 P66 est conservé dans le handoff. La présence d’une silhouette blindée de petite taille ne suffit pas à certifier son inventaire d’armure. Aucun nouvel appel imagegen n’est effectué pour Arcade. Les décors Desert Duel et Lethal Leviathan restent ceux déjà présents.

## Social Ops

[Gameplay de mission public YqR-cg0eGtg](https://www.youtube.com/watch?v=YqR-cg0eGtg), trois feuilles de storyboard inspectées. Les vignettes font 160 × 90, avec une zone téléphone encore plus étroite. Des soldats et Pupa apparaissent réellement en gameplay ; l’équipement des acteurs n’est pas assez lisible pour qualifier une nouvelle variante corporelle. Les cartes et dialogues ne remplacent pas un corps 3D documenté. Aucune génération ; prochaine preuve requise : frame gameplay de meilleure définition, unité et équipement identifiés.

## AC!D Mobile

[Speedrun 2D public SGEMAhZxkZg](https://www.youtube.com/watch?v=SGEMAhZxkZg), deux feuilles inspectées. Les vignettes font 320 × 180 et montrent le jeu Java 2D dans un écran vertical entouré de marges. Les sprites ennemis restent trop petits pour déterminer la palette et la frame exacte sans invention. La version 3D doit être qualifiée séparément. Snake AC!D Mobile et Venus AC!D 2 Mobile existent déjà dans le dépôt ; aucun garde PSP n’est réétiqueté Mobile.

## Preuve d’absence bornée

[absence-qualification.json](absence-qualification.json) croise les 225 sélections et les chemins du véritable arbre P66. Aucun candidat Touch ni chemin Gekko Touch dédié n’est identifié. Cette vérification ne prouve pas l’absence visuelle dans chaque image historique nommée uniquement par hash. Les sources existantes correspondantes sont conservées ; le nouveau Gekko reste un candidat d’édition et de pose précisément borné.

Les [résultats de téléchargement](reference-downloads.json) distinguent les images obtenues des erreurs HTTP. Les premiers liens WIRED sont morts (404), MobyGames est inaccessible (403) et la galerie AC!D Mobile MPERIALS n’a pas livré d’images. Ces échecs ne sont pas présentés comme des références visuellement inspectées.
