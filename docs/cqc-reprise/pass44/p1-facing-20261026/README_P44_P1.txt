P44 — P1 fait face à son adversaire dans la sélection

Le portrait de P1 demande maintenant la face droite native ; P2 garde la face gauche. Le changement de personnage, de costume et de taille de fenêtre conserve cette orientation. Les portraits de machines transmettent explicitement la direction demandée à leurs différents rendus. Core demande aussi la face droite pour ses portraits de machines, comme pour ses portraits humains.

La correction utilise les deux faces natives disponibles, sans miroir CSS ni modification des images. Les sprites, leurs proportions et les directions du combat restent inchangés. Les sept fichiers de code corrigés sont identiques dans les deux copies locales du jeu ; chaque manifeste runtime a été régénéré avec ses propres fichiers historiques. Les 212 références externes existantes sont conservées à l’identique.

Vérifications : cqc:check, TypeScript, 723 tests dans 106 fichiers, compilation fraîche et contrôle PWA réussis. Les contrôles utilisateur réels ont vérifié sept cas du Versus (Venom, son costume bras doré et son redimensionnement, MkII, Cunningham, Double Tripod et Fenrir) et un portrait Core de Khamsin. Les reçus publics et les quatre captures accompagnent cette correction. Cette couverture ne constitue pas une inspection visuelle de tout le roster.

Limites séparées : le corps de Cunningham dans Core reste pending-art-review ; sa plateforme est prête et les deux faces du personnage sont vérifiées dans le Versus. Les costumes rétro de MkII et Dwarf Gekko gardent leurs blocages préexistants de contrat de rig. Aucun nouveau costume n’est installé par ce correctif intermédiaire. Les costumes inventés et leur suivi Excel continuent dans des lots distincts.

Cette correction de présentation ne certifie pas une fidélité graphique exacte aux jeux d’origine. Les images sources historiques sont conservées.
