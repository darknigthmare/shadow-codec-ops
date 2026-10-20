# Raiden — Inferno Armor, candidats Pass 39

Deux atlas indépendants générés depuis les faces natives de `core__raiden` et la carte officielle Konami. MGR: Revengeance est sorti en 2013 ; le corps correspond au Raiden post-prologue de l'histoire située en 2018. Ce n'est ni son incarnation MGS4 ni le corps R-00.

- `right-v1.png`, `left-v1.png` : RGBA 1254×1254, 16 poses chacun, copies intactes des sorties image_gen.
- `METADATA.json` : références, SHA-256 des deux sorties, boîtes mesurées α≥8/32 pour chaque figure, comparaison aux bases, réserves d'admission.
- `measure.py` : analyse en lecture seule des PNG ; aucune image recomposée, redimensionnée ou corrigée par script.

Les plaques rouge-cuivre, le torse mécanique noir et les insertions claires suivent la référence officielle visible. Les faces/poses/silhouettes restent très proches des atlas de base. La petite référence officielle ne permet pas d'attester chaque détail arrière : aucune prétention à un 1:1 absolu.

Attention : la planche conserve les placements natifs, avec armes et KO dépassant les quarts nominaux. Un découpage uniforme 4×4 tronquerait des poses. Les 16 composantes principales restent distinctes ; utiliser les boîtes mesurées et faire une admission visuelle en jeu. Les gouttières demandées de 36 px ne sont pas respectées. Il subsiste aussi du bruit d'alpha très faible (1–7) ; aucune opacité α≥8 ne touche le bord du canevas. Aucun fichier de production n'a été modifié.
