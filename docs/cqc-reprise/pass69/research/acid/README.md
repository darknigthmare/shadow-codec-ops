# P69 — AC!D 2 : trois variantes individuelles

Cette sous-série livre trois PNG bruts, chacun avec un seul corps complet. Elle ajoute le soldat lance-flammes, le garde équipé d’un bouclier et le soldat Hi-Tech de CONCEPT3. Les sept références téléchargées, les trois prompts exacts et les paramètres sont conservés ici. Les détails et empreintes se trouvent dans [handoff.json](handoff.json).

| Source | Dimensions réelles | Octets | Fondement |
|---|---:|---:|---|
| acid2-flamethrower-soldier | 1312 × 1199 | 700 911 | Deux vues natives du même ennemi, capture 360 × 461 ; vue frontale oblique retenue |
| acid2-shield-guard | 1229 × 1280 | 1 179 145 | Garde au bouclier dans une capture PSP ; CONCEPT2 précise l’uniforme |
| acid2-high-tech-soldier | 887 × 1774 | 1 323 895 | CONCEPT3 complet, casque/col/couleurs corroborés par une capture P90 |

Total : **3 203 951 octets**, trois appels imagegen, trois sorties, trois sélections, aucune archive ni demande refusée. Aucun agrandissement ou changement de pixels après génération.

## Références et distinction des variantes

Les captures de jeu proviennent de la [page AC!D 2 d’IMFDB](https://www.imfdb.org/wiki/Metal_Gear_Ac%21d_2) ; la page les identifie respectivement comme Enemy Flamethrower Soldier, SaintLogic Guard et High-Tech Soldier. Ce sont des images du jeu hébergées par un site communautaire, pas des captures réalisées par cette passe ni des fichiers hébergés par Konami.

La [galerie Creative Uncut AC!D 2](https://www.creativeuncut.com/art_metal-gear-acid-2_a.html) présente ces planches comme art officiel et attribue les dessins à Masao Tsubasa. [CONCEPT2](https://www.creativeuncut.com/gallery-11/mga2-soldier-concept2.html) est la référence de l’uniforme sans masque ; [CONCEPT3](https://www.creativeuncut.com/gallery-11/mga2-soldier-concept3.html) représente le Hi-Tech. Le concept complet est distinct d’une preuve complète du modèle PSP.

Le [contrôle historique](historical-duplicate-audit.json) a retrouvé le garde masqué CONCEPT1 dans le catalogue P49 et le garde sans masque CONCEPT2 dans l’index P50. Aucun des deux n’est régénéré seul. Le garde au bouclier P69 est une variante d’équipement et de posture fondée sur le jeu. Les sources précédentes restent intactes.

La capture OICW et CONCEPT1 ont été inspectés mais non utilisés pour générer : OICW présente un garde allongé masqué par l’interface ; CONCEPT1 était déjà couvert. Ces références restent documentées dans [reference-index.json](reference-index.json).

## Revue visuelle et alpha

Les trois sorties ont été vues après génération et comparées à leurs références. Les grandes silhouettes, couleurs et équipements sont cohérents avec le sujet borné. Le lance-flammes conserve une vue oblique polygonale ; le bouclier conserve la pose native ; le Hi-Tech conserve la pose frontale de la planche.

Les surfaces masquées, petits raccords, visage, coutures et motifs ne sont pas certifiés. La zone du bouclier qui était couverte par un flash a été reconstruite en surface unie. Les jambes Hi-Tech viennent de la planche, car le screenshot P90 ne les montre pas en entier. La capture lance-flammes est de petite taille ; elle ne permet pas une qualification métrique.

Les fichiers sont RGBA avec alpha réel **0–255**. Le corps est majoritairement alpha **253**, avec une faible frange alpha 1–8 et quelques pixels périphériques presque invisibles. Ils ne sont donc pas présentés comme un masque binaire ou un détourage parfait. Le garde au bouclier possède une faible marge sous le pied inférieur. Les bytes originaux ont été conservés ; aucun nettoyage local des pixels n’a été appliqué.

## Suite de production

Chaque sujet demande encore des vues plus grandes et complémentaires, des poses moteur et une validation des proportions. Attente, marche, garde, attaque, impacts et rechargement sont des états à produire ultérieurement. Aucun cycle, VFX, projectile, son, collision, pivot, nouvelle arène ou admission au combat n’est livré ici.

La ligne historique `character:R-ACID-GUARDS` reçoit trois candidats propres à AC!D 2 ; elle demeure un groupe incomplet. Les secteurs FAR/Ruins d’AC!D 1, les étages Prototype et les combats Test Subjects ne sont pas complétés par cette série.

[build-handoff.py](build-handoff.py) reconstruit les identités et vérifie que les trois fichiers sélectionnés sont des copies exactes des sorties imagegen. Il utilise le runtime Python avec Pillow ; il ne modifie aucune image.

