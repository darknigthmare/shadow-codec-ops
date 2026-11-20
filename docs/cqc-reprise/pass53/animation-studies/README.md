# Marches de quatre tenues P52 — études de studio

**Trois essais de boucle de quatre images et une séquence de deux images** : le Scout et le Guard de MSF (*Peace Walker*), Snake et Venus en Color B de Link Battle (*AC!D 2*). Chacun part du dessin debout spécifique publié dans [P52](../../pass52/static-poses/README.md). Quatre nouvelles planches RGBA contiennent seize figures découpables. Quatorze sont sélectionnées pour les essais ; deux croquis de Snake restent archivés. Il s’agit des mêmes trois incarnations et quatre tenues qu’en P52, sans changement de leur statut de revue ni ajout au jeu.

[Lire les études animées](index.html) · [Données d’intégration](walk-cycles.json) · [Consignes initiales de dessin](generation-prompts.json) · [Garde de correction P53](generation-guard.json)

**Tenue originale additionnelle : [Quart de pluie — passerelle](costume-study/README.md).** Une nouvelle pose de quart sur le pont pour le Diamond Dogs Scout, documentée séparément ; elle ne ferme pas la ligne officielle « gilet et casque ».

**OctoCamo :** [contrôle des trois liens de la table DLC](OCTOCAMO_REFERENCES.md). Aucun nuancier n’a été produit à partir d’un nom sans motif visuel vérifié.

| Profil et tenue | Ce que montre le dessin | Décision de revue |
|---|---|---|
| Soldat MSF · Scout Versus | Le chapeau, le filet devant le visage, le treillis tacheté et les bandes aux genoux restent reconnaissables. Le torse accompagne le pas ; le bras porteur se déplace en restant abaissé. | 4 cadres pour essayer la répétition ; contrôler en combat l’alternance des genoux derrière le pan de veste. |
| Soldat MSF · Guard Versus | Le micro-casque, la moustache, le tee-shirt beige et la sangle oblique sont conservés. Le premier et le troisième contact ont une silhouette voisine ; les passages de pied et la position des avant-bras les distinguent. | 4 cadres pour essayer la répétition. Risque de glissement du pied à la vitesse du jeu ; régler sur la capture de déplacement. |
| Snake · Link Battle Color B | Le bandeau rouge, l’armure sombre, le foulard, la besace olive et les jambières claires restent visibles. La sangle brune du tibia trahit la répétition du même contact aux images 1 et 3. | Sélection **1 puis 2, sans boucle**. Les images 3 et 4 restent dans `archivedFrames`. Une demande de correction a été refusée ; aucun dessin de remplacement. |
| Venus · Link Battle Color B | Les cheveux orange, la plaque d’épaule, les bracelets rouges et les poches gardent leur place. Le bras proche passe en avant, puis revient en arrière ; la chevelure change très peu de forme. | 4 cadres pour essayer la répétition ; contrôler la phase des chevilles et le mouvement des mèches avant admission. |

### Lire et intégrer

Les quatre images sources intactes sont dans `atlases/`. Les coupes dans `frames/` conservent les valeurs RGBA de leurs rectangles d’origine, sans redimensionnement, miroir ni recoloration. Chaque frame publiée précise `[x, y, largeur, hauteur]`, empreinte du PNG, empreinte des pixels et point d’affichage `[x, y]` dans le rectangle. Ce dernier ancre la colonne du torse et la semelle sur un repère commun ; il ne représente pas un point de collision. Pour un aperçu à l’échelle `s` : placer le coin supérieur gauche à `(racineX − pivotX × s, solY − pivotY × s)`.

Lire `cycles[].frames` dans l’ordre ; appliquer `loop` et `previewFps`. `archivedFrames` conserve l’historique sans participer au lecteur. Les 6 images/s sont une vitesse de démonstration de studio, pas une mesure dans un jeu Konami. Les poses sont de nouvelles interprétations à partir des tenues sélectionnées, aucun mouvement n’a été extrait du jeu. Ces études ne représentent que la droite. Aucun côté gauche implicite, aucune certification pixel pour pixel, aucune modification du moteur.

Pour recalculer les rectangles et vérifier l’égalité **de chaque canal** entre atlas et découpes, depuis ce dossier : `python pack_walks.py --verify` (Pillow). Pour lire le lecteur local avec le JSON : `python -m http.server 8130 --bind 127.0.0.1`, puis ouvrir `http://127.0.0.1:8130/`. La consultation n’écrit aucun fichier du jeu.

### Provenance et limite des preuves

Le SHA du PNG statique P52, son rectangle et son chemin au commit `3df6d0dd30b5a929495b01783a3594a29fa64a24` sont épinglés par tenue dans le JSON. Le statut de la pose source est `P52_NEW_STATIC_SOURCE_POSE_DRAWN_REVIEW_PENDING` : « approved » dans la consigne de dessin signifie seulement *référence sélectionnée pour l’artiste*, sans valoir approbation du jeu. Les nouvelles planches ont été faites avec `image_gen`, puis contrôlées visuellement et découpées sans retouche. Les douze gardes héritées de P52 sont préservées. La garde nouvelle porte précisément sur la correction du contre-pas de Snake Color B détaillée dans le registre ; aucune relance, substitution ou tentative par un autre agent.
