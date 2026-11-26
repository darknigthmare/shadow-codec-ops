# P69 — notes de fiche pour Survive

Ces notes distinguent les éléments visibles, les limites du PNG et les travaux futurs. Les séquences et interactions ci-dessous sont des **propositions de production CQC**, pas des animations livrées ou des comportements déjà intégrés. Aucun périmètre historique n’est fermé par ces trois candidats.

## survive-air-shock-cannon

### Identité et invariants visibles

Objet de défense de Metal Gear Survive, déployé sans action. La capture native220401_10 est déterminante : elle montre le petit émetteur circulaire olive à gauche du personnage, le carter sombre, la boîte arrière, le câble courbe et l’antenne. La capture220401_12 précise le pivot clair, la monture horizontale, le fût vertical et les quatre appuis étalés. La [page communautaire de placement](https://w.atwiki.jp/mgsurvive/pages/111.html) et la [fiche Interceptor Units](https://w.atwiki.jp/mgsurvive/pages/84.html) donnent le contexte d’emploi ; l’image reste une référence géométrique locale, pas une preuve des mesures de combat.

Le disque doit rester court et large. Sa forme ne doit pas évoluer vers un long tube, une bouche de canon creuse ou une émission lumineuse permanente. La monture blanche et les appuis très bas sont des repères d’identité plus fiables que les micro-rayures interpolées. Le PNG retient le trois quarts de la référence principale, avec une face lisible, quatre pieds entiers et un fond transparent.

### Livraison et réserve

Une seule image statique1086×1448, sans effet de souffle, sol, clôture ou interface. Le nombre d’appuis et la grande silhouette sont lisibles dans les captures ; les vis et grilles ne sont pas une extraction pixel exacte. Les zones masquées par le HUD ont été recoupées entre les deux vues, mais le revers complet du dispositif n’est toujours pas connu. La publication de ce candidat ne vaut pas admission de combat et ne ferme pas le besoin de vues.

### Production suivante proposée

Obtenir les profils, le dos et une séquence de déclenchement. Définir ensuite le point de pivot au sommet du fût, la direction de sortie et la ligne de sol des pieds. Produire les états inactif, armé, déclenchement, récupération et désactivation séparément. Les effets visuels d’air, leurs durées et les réactions d’un adversaire devront former des assets indépendants. Une future zone d’effet CQC devra être justifiée et testée ; aucune portée, invulnérabilité, puissance ou cadence n’est déduite de cette image. Préserver le PNG actuel comme source de comparaison.

## survive-sledgehammer-gold

### Identité et invariants visibles

Masse Sledgehammer [Gold] du Survival Pack. La [page Heavy Weapons](https://w.atwiki.jp/mgsurvive/pages/25.html) fournit le modèle d’inventaire entier ; sa silhouette et sa couleur sont corroborées par la [planche officielle Konami](https://www.konami.com/games/us/en/topics/917/) qui distingue le Sledgehammer dans le pack. Le nom exact du fichier de modèle reste à confirmer : la page communautaire donne la classe et ne légende pas cette image Gold individuellement.

La tête est un bloc épais à faces polygonales, avec plusieurs encoches sur ses côtés et une plaque latérale dorée marquée de fixations rondes. Les faces d’impact sont sombres. Le cou métallique se resserre vers un long manche rectiligne enveloppé d’une matière dorée/brune, avec une extrémité simple. L’orientation de la capture, tête en haut à gauche et manche en bas à droite, est conservée. Ne pas transformer ces encoches en pointes de hache ou y ajouter un mécanisme de moteur.

### Livraison et réserve

Un PNG1555×1012, objet entier, fond transparent. La tête, le manche et le pommeau sont dans le cadre. Il n’y a ni main, ni avatar, ni montage d’animation. La texture et certains petits reliefs ont été réinterprétés ; le revers et les dimensions métriques restent ouverts. Le Gold est une variante distincte : cette livraison ne crée pas automatiquement une masse standard et n’applique aucune recoloration aux anciennes sources.

### Production suivante proposée

Confirmer le modèle et obtenir l’autre flanc puis le dessus. Fixer l’axe longitudinal et deux zones possibles de prise à partir de captures de l’avatar. Dans CQC, conserver le prop autonome jusqu’à ce que les poses de bras et de mains soient validées. Documenter des phases de préparation, frappe verticale, frappe latérale et récupération ; seule cette documentation pourra guider les poses clés puis les intervalles. Prévoir séparément un impact de sol, un choc sur obstacle et les sons correspondants. Les valeurs de dégâts, la résistance, le poids de gameplay et les fenêtres de collision demandent un travail distinct et ne sont pas fournies par le PNG.

## survive-survival-spear-gold

### Identité et invariants visibles

Lance Survival Spear [Gold] du Survival Pack, documentée par la [page de classe Thrust Weapons](https://w.atwiki.jp/mgsurvive/pages/24.html), la capture d’inventaire et le [pack officiel](https://www.konami.com/games/us/en/topics/917/). Le recoupement visuel appuie cette attribution ; une confirmation de modèle demeure nécessaire parce que l’image communautaire de classe ne nomme pas individuellement sa variante.

La lame est courte, asymétrique et évoque un couteau fixé à une douille. Une petite garde ronde la sépare de la hampe. Le rapport de longueur est essentiel : la hampe mince représente presque tout l’objet. Quelques bagues, changements de section et zones usées rythment la surface, terminée par un petit pommeau cylindrique arrondi. Le profil est légèrement oblique, pointe à gauche et extrémité remontant doucement vers la droite. L’objet ne doit pas devenir un trident, une arme à feu, une lance énergétique ou un projectile.

### Livraison et réserve

Une image2172×724 à alpha réel, pointe et pommeau complets. Le choix d’un canevas large conserve la lecture de la longueur sans empiler plusieurs vues. Les surfaces ont été rendues avec plus de détail que la capture source, ce qui ne permet pas de revendiquer l’exactitude de ces détails. Les faces cachées de la lame et de la garde, ainsi que l’épaisseur des bagues, restent à documenter. Aucun avatar ni animation d’estoc n’est fourni.

### Production suivante proposée

Capturer les profils et le revers, puis localiser les deux prises de mains à partir du jeu. Préparer les poses de garde, extension, estoc et retrait, en conservant l’axe de la hampe et la proportion de lame. La transition depuis la course ou l’accroupissement devra être référencée séparément. Prévoir un point de contact à la pointe et un effet d’impact indépendant pour le futur gameplay CQC ; ne pas convertir ce prop de mêlée en projectile faute de besoin démontré. Valider ensuite la lisibilité à l’échelle d’un combattant et sur différents fonds. Aucune animation, collision ou portée jouable n’est déjà associée à la source P69.
