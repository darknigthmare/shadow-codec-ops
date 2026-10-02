# Références et animation minimale de trois stages

Revue en lecture seule de 12 images conservées : quatre captures inscrites au catalogue, trois masters générés, trois plans architecture et deux captures connexes écartées. Aucun téléchargement, aucune génération et aucune modification de R, S, des PNG ou de Git.

| Stage | Preuve visible | Proposition minimale | Limite |
|---|---|---|---|
| Outer Heaven, MG1987 MSX2 | Quatre centres rouges sur les coffrets striés, dans le jeu original et l’architecture générée | Modulation locale de luminance ≤2%, lente7–9s, sans déplacement ni extinction | Fonction/rythme original non prouvés par la capture fixe ; animation d’auteur `closest_supported` |
| Zanzibar, MG2 1990 MSX2 après destruction | Quatre groupes de traits ocre dans le mur original ; huit groupes dans le décor adapté | Scène statique recommandée. Si une animation ambiante est nécessaire : moduler les seuls traits ocre de quatre groupes centraux ≤1%,8–10s | Nature lumineuse indéterminée ; ne pas appeler ces marques des voyants canoniques |
| Arsenal Corridor, cible MGS2 PS2 | Lampes cyan sur les colonnes visibles dans la capture et quatre lampes dans l’architecture générée | Modulation locale des lampes ≤3%,6–8s ; aucune panne, alarme ou nouveau faisceau | Référence conservée PC2003 Substance, effets PS2 et rythme temporel non certifiés |

Les trois scènes sont intérieures. Les références ne justifient aucune météo, fumée, poussière, étincelle, végétation ou ventilation en mouvement. Les lamelles vertes de Zanzibar et les grilles des coffrets d’Outer Heaven ne prouvent pas des pales animables. Les flashes de tir d’Arsenal sont des événements de combat.

Le catalogue courant désactive déjà la météo pour ces trois stages. Les anciennes valeurs `dust`/`sparks` dans `legacyVisualDefinition` sont historiques et ne prouvent aucun effet canonique. Le manifeste historique `APPROVED_MANIFEST.json` d’Arsenal dit encore PS2 ; le catalogue corrigé attribue la capture au port PC2003. Cette limite doit rester explicite.

Les rectangles du rapport JSON sont exprimés dans les pixels natifs du plan **architecture**. Toute modulation doit utiliser son rectangle, sa caméra et sa parallaxe0.12. Les pixels sources restent immuables ; aucun mouvement des panneaux, du sol ou des bâtiments. Conserver les centres colorés, sans dessiner une nouvelle lueur autour.

La fidélité1:1 temporelle n’est certifiée pour aucun des trois. Une capture fixe établit les éléments visibles, pas leur évolution. La variation lente proposée est une adaptation au plus proche. Le choix statique reste le plus fidèle pour Zanzibar tant qu’une source temporelle manque.

Le JSON contient les chemins, SHA256, dimensions, observations visuelles, exclusions et qualifications de chaque source. Les quatre captures principales, trois masters et trois plans architecture correspondent exactement à leurs SHA256 déclarés dans le catalogue. Deux images connexes d’Arsenal ont été réellement vues puis écartées : une autre salle avec engin suspendu et un écran Codec ne constituent pas des preuves de l’animation du couloir.
