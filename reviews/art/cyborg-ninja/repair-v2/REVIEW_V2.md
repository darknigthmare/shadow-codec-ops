# Cyborg Ninja DLC Raiden — reprises ciblées V2

Trois pages natives indépendantes, deux faces. Les originaux V1 et les sorties imagegen restent intacts. Aucun PNG n'a été édité par script ; les fichiers de ce dossier sont des copies octet pour octet. Aucune V3 n'a été générée : sur instruction Root, les très faibles alphas des halos seront exclus par les contours alpha16 du renderer, sans modifier les rasters.

| Page | Original auto imagegen | SHA256 | Octets |
| --- | --- | --- | --- |
| `right-v2.png` | `/workspace/generated_images/exec-ef2bb954-5a02-4139-9663-0442cb47b9de.png` | `7d334788be3c5a374f3b2994dede335cf8e96ca3e09ca81313e2fddb55adc7dd` | 1 683 386 |
| `leftA-v2.png` | `/workspace/generated_images/exec-990f7a2e-64da-4307-9241-3f104e209063.png` | `45509ab6baae7f32e11af2593c27e3fee34632f4f2b69773fd178557cc0e2f41` | 1 705 971 |
| `leftB-v2.png` | `/workspace/generated_images/exec-9adaa776-9bdc-48d0-b086-86f4db29b199.png` | `ef79a46a11d17c7cdec27f3ae9df26f646e5c1b9cf31fdd0024339716afb0e79` | 1 447 810 |

Toutes les pages sont RGBA 1536×1024 et ont zéro pixel alpha>16 sur leurs quatre bords. Les 4/4/3 corps sont entiers. Tous leurs rectangles physiques alpha16 sont **sans pixels d'un autre corps majeur**, contrairement aux V1. Les marges nominales de 64px par cellule n'ont pas été respectées partout ; cela est enregistré explicitement, et les rectangles doivent être mesurés sur la source réelle, sans imposer la grille 768×512 comme crop. Aucun corps physique ne touche la bordure de page.

## Mapping exact, row-major

- Droite : neutre de calibration, crouch ancien index4, windup ancien index5, thrust ancien index6.
- Gauche A : neutre de calibration, windup ancien index5, thrust ancien index6, **vraie low-slide** remplaçant index7.
- Gauche B : neutre de calibration, reach ancien index8, side-kick ancien index9, cellule vide.

`POSE_MAPPING_V2.json` contient les identités des figures attribuées manuellement, les rectangles mesurés, leurs captures de voisins (toutes vides), la stature neutre candidate et les repères visuels approximatifs du bassin. Ces derniers restent des aides de revue ; l'intégration doit choisir et vérifier les pivots/preview exacts sur les PNG finaux. `RASTER_V2.json` fournit les pins, les alphas et les composantes.

Statures neutres source candidates : droite473px, gaucheA466px, gaucheB452px. Elles sont des mesures de stature debout de chaque nouvelle page, pas des hauteurs humaines ni les hauteurs de chaque pose. Conserver la hauteur humaine de Raiden et calibrer chaque PNG séparément par son neutre ; ne pas réutiliser la hauteur des anciennes pages.

## Revue visuelle des onze corps

- Le casque reste intégralement fermé sur toutes les poses, gris argent et œil rouge frontal unique ; aucun cheveu ou visage Raiden humain réapparaît. La direction du casque et de la visée suit le côté demandé.
- L'armure reprend les codes visibles du costume DLC officiel Konami : acier bleu-pétrole, sous-structure mécanique sombre, plaques gris argent et jaune-or. Les surfaces opposées cachées sur le petit rendu officiel sont des reconstructions ; aucune fidélité absolue 1:1 des surfaces non montrées n'est revendiquée.
- Droite crouch : deux jambes complètes et katana bas vers la droite, prise mécanique et genoux cohérents. Windup : chargement diagonal avant le coup, garde et fourreau présents. Thrust : deux mains au manche, lame continue vers la droite, pieds complets.
- Gauche windup : bras chargés au-dessus du torse, lame entière, jambes cohérentes. Thrust : lame unique continue vers la gauche, prise à deux mains et appuis complets.
- Gauche low-slide : casque/torse bas, jambe menante étendue à gauche près du sol, jambe arrière fléchie, main d'appui et lame basse dirigée vers la gauche. Ce n'est plus le kick haut du V1 ; la correction rétablit l'action basse correspondant à la glissade droite.
- Gauche reach : main vide ouverte vers la gauche, katana dans l'autre main vers l'arrière, corps entier sans bras supplémentaire. Kick : une seule jambe frappe vers la gauche, l'autre prend appui, deux poings en garde et fourreau présent.

La revue ci-dessus approuve la présence et la fonction physique des reprises pour le contrôle Root. Elle ne remplace pas l'admission : l'intégration doit encore certifier contours, stature/pelvis, socket HF, actionMap/phaseMap et preuves UI/match. Garder les anciens corps V1 uniquement pour leurs poses non remplacées avec leur source SHA originale.
