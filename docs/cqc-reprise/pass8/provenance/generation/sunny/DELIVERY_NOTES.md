Sunny MGS4 et Sunny MGR — sources finales gelées

Les deux livraisons comptent chacune six atlas natifs RGBA indépendants, A/B/C × RIGHT/LEFT, soit 72 poses par incarnation. Les pixels des PNG générés n’ont pas été modifiés ; les copies immuables sont des liens physiques. Les facings ne sont pas des miroirs. Le fournisseur imagegen a produit les corrections dans de nouveaux PNG ; chaque ancienne tentative reste préservée.

- `mgs4/FINAL_DELIVERY.json` : SHA256 `2230fc63bb9d256813df5713894cff293de21c58d20bdd9d8034d1aee672164f`.
- `mgr/FINAL_DELIVERY.json` : SHA256 `538cc81fb6dd9f8cce317eee7d7f72222e53072fa050352506448c4b4bdcc36e`.
- `SUNNY_DELIVERY_QA.json` : 492 assertions, 12 atlas, 144 poses distinctes, 8 points de main, aucun muzzle.

MGS4 représente Sunny enfant à bord du Nomad, après la rose donnée par Naomi : pull noir à col haut, pantalon bleu-gris, tablier blanc, rose bleue anatomiquement à gauche. Les références retenues montrent la cuisine et le récipient cylindrique blanc. Les chaussures sont des chaussures plates sombres interprétées : les détails des pieds ne sont pas établis par les plans retenus. La robe formelle de l’épilogue appartient à une autre tenue et n’a pas été mélangée.

MGR représente Sunny enfant à Solis : haut rayé blanc/gris bordé d’ocre, cargos kaki, veste claire nouée à la taille, gants de travail ocres, casque vert au cou, badge au cordon et boots sombres. Les mèches argentées basses ont été corrigées en comparant le profil original PS3, sans changer les proportions enfant. Une révision B RIGHT qui reliait deux corps voisins par l’alpha a été refusée ; la génération B_RIGHT_04 conserve douze corps séparés.

Sunny est un personnage original de soutien, sans combat attesté par ces sources. Les noms de groupes legacy `punch`, `throw`, `shoot` et `charge` sont uniquement des alias techniques pour halte ouverte, protection/esquive, console, cuisine, communication et repos. Aucun atlas ne contient de fusil, tir, blessure ou CQC offensif. `SOURCE_COMBAT_ORIGINS.json` garde volontairement des groupes vides. `SOURCE_SUPPORT_HAND_MARKS.json` contient seulement des points de main opaques pour l’animation de soutien ; ils ne lancent aucun projectile.

L’affichage recommandé est de 145 pour MGS4 et de 170 pour MGR, contre environ 230 pour un adulte. Les sources retenues, physiquement observées, viennent des longplays originaux PS3 déposés en 2014 ; captures uniques par lecture distante, aucun film entier téléchargé. Les références canoniques sélectionnées pèsent 3 558 934 octets et 4 371 860 octets, chacune sous la limite de 15 Mo. Les captures de recherche non retenues, ainsi qu’un résultat Pinterest sans rapport rejeté, sont conservées sous `research/unselected-captures/` avec la table `UNSELECTED_RESEARCH_PATH_PRESERVATION.json` pour retrouver chaque ancien chemin.

Fidélité visée : 1:1 ; état déclaré : `closest_supported`. Il reste une revue séparée des crops Canvas, de la taille enfant, des phases, des contrôles de soutien et des deux accès au jeu. Aucune modification de R/S, aucun import et aucun commit n’ont été réalisés par ce producteur.
