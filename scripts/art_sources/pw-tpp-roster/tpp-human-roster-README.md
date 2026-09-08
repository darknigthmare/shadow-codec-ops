# TPP — douze silhouettes humaines et deux séries Codec

Lot original fan-made produit avec l’outil OpenAI intégré le 8 septembre2026. Les fichiers officiels servent uniquement de références visuelles : aucun pixel officiel n’est intégré aux assets.

## Sorties

Douze feuilles RGBA512×512, seize poses dessinées par personnage (192 poses), cellules128×128 et marge minimale8px : Miller, Ocelot, Huey, Code Talker, Quiet, Pequod, Skull Face, Eli, Tretij Rebenok, Man on Fire, Ishmael et Paz1984. Chaque feuille a une image idle et une provenance avec empreintes SHA256.

États : `idle,move,interact,react` sauf Quiet (`idle,move,interact,attack`) et Man on Fire (`idle,move,charge,attack`). Ces actions sont des clips d’archive visuelle, pas la déclaration d’un nouveau boss jouable. Venom et Sahelanthropus existants sont préservés.

Les feuilles Codec Paz1984 et Man on Fire donnent chacune six WebP512×512. Man on Fire utilise la version v4 approuvée par revue indépendante, après rejet de la tentative v3 trop métallique. Les trois autres portraits Eli/Tretij/Ishmael sont documentés séparément dans `portraits/archive-portraits.provenance.json`. Le total élargi du lot, avec Coldman et Mosquito, est suivi dans `portraits/all-archive-portraits.provenance.json`.

## Fidélité et limites

- Miller : bras droit et jambe gauche absents, manche vide, un seul pied, béquille tenue par le bras restant. Pas de marche normale à deux jambes ni de prothèse inventée.
- Huey1984 : orthèses externes articulées aux deux jambes, lunettes et chemise rayée. Pas de fauteuil Peace Walker.
- Code Talker : fauteuil manuel, cheveux blancs, couverture et pierre turquoise du bolo. Le clip move correspond à la propulsion du fauteuil.
- Tretij : proportions enfantines, cheveux auburn, masque à gaz, camisole à sangles et longues manches, déplacement flottant.
- Ishmael : blouse hospitalière teal, tête/poignets bandés et chaussons. Une première feuille avec jambes entièrement bandées a été rejetée.
- Paz1984 : apparition/souvenir hospitalier adulte, non survivante déclarée et non combattante. Sa tenue diffère de Peace Walker.
- Pequod : interprétation originale d’un pilote anonyme cohérente avec le portrait déjà présent ; aucun visage canonique unique n’est revendiqué.
- Portrait Man on Fire : le rendu détaillé initial a été refusé par l’outil, puis le visage humain générique v2 et le visage métallique stylisé v3 ont été rejetés. La version v4 rétablit la silhouette humaine, la tenue nervurée et les flammes ; les ombres remplacent volontairement les détails de blessures. Le fichier de handoff conserve l’historique du rejet v3. Aucune ressemblance1:1 n’est revendiquée.

Les poses sont des dessins distincts, non des transformations synthétiques d’un seul sprite. L’unicité des bitmaps ne prouve toutefois ni une marche parfaitement fluide ni une correspondance1:1 ; plusieurs cycles restent des adaptations compactes en quatre dessins. Ce lot ne clôt pas l’ensemble des costumes, PNJ, ennemis, véhicules ou époques de la franchise.

## Références inspectées

- Konami TPP story : `https://www.konami.com/mg/mgs5/tpp/jp/story/` — portraits officiels.
- Konami Play Arts Kai : pages `item_playartskai_ocelot.html`, `quiet.html`, `skullface.html`, `tretijrebenok.html`, `manonfire.html` sous `https://www.konami.com/mg/mgs5/tpp/jp/goods/` — silhouettes de figurines sous licence.
- Concepts attribués à Konami/Shinkawa, reproduits par un miroir secondaire explicitement identifié : `https://www.creativeuncut.com/gallery-27/mgs5-<sujet>.html`. Liens complets et contraintes dans chaque `tpp-*.prompt.json`.

## Vérification

`auditTppHumanRoster.py` vérifie dimensions,192 frames non vides, marge8px, unicité, correspondance idle, empreintes source/runtime et douze WebP. Résultat enregistré dans `tpp-runtime-qa.json`. Les quatre pixels turquoise internes du pendentif de Code Talker sont identifiés explicitement, sans être confondus avec la clé cyan. Aucun résidu de clé détecté et RGB nul pour les pixels transparents.

Les sources, prompts et rejets sont sauvegardés sur `G:/CodexBuild/shadowcodecops/asset-staging/tpp-human-roster`. Les tentatives rejetées et échecs de lecture d’édition sont décrits avec leurs prompts exacts dans `tpp-generation-history.json`. Aucune retouche artistique via script : uniquement détourage mécanique, grille, échelle commune et découpage.
