# MSF · gestes et équipement

[Ouvrir les sprites et les calques](index.html) · [Données d’intégration](assets.json)

Le soldat MSF de *Peace Walker* dispose ici de deux gestes dessinés pour chaque tenue Versus. La garde basse et la reprise d’appui se lisent chacune dans un PNG RGBA individuel orienté vers la droite. Les quatre poses ont été produites avec ImageGen à partir des références de costume du projet. Les poses sont des interprétations de production. Leur admission dans le moteur et leur comparaison avec les animations du jeu d’origine restent à faire.

Le Guard possède quatre pièces séparées issues du premier pas de sa marche P53. Le Scout en possède cinq. Chaque pièce conserve ses pixels visibles et sa position exacte dans cette image. La surface occultée sous chaque pièce reste vide sur le calque du corps. Ces découpes servent donc à isoler le dessin, à le référencer et à le recomposer à sa position d’origine.

## Affichage

Pour les accessoires, dessiner le calque du corps, puis les autres couches à leurs coordonnées `x` et `y` dans le canevas de la marche. La position est comptée depuis le coin supérieur gauche. Pour les nouvelles poses, `solePivot` situe le centre des pixels d’appui visibles dans les quatre rangées les plus basses du dessin. `alphaBounds` fournit le rectangle visible au seuil de 32 sur 255. L’aire transparente d’origine reste dans le PNG. La hauteur d’affichage en combat et les durées s’ajustent lors de l’admission.

## Vérification

Depuis ce dossier, `python verify.py` utilise Pillow pour recomposer chaque frame et comparer chaque octet RGBA à la source, puis vérifie les dimensions et le rectangle visible de chaque dessin.
