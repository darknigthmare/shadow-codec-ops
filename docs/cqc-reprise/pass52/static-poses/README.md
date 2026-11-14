# CQC — poses uniques restantes — P52

Cette livraison poursuit les tenues officielles encore ouvertes après P51 : **une pose statique vers la droite par tenue qualifiée**, avant les animations. Les **382 incarnations déjà présentes dans P51** restent la base de cette passe. Le XOF de l’hôpital de 1984 en faisait déjà partie depuis P50 ; il n’est pas compté comme un nouveau personnage P52. La matrice historique de 381 incarnations et de ses 3429 lignes reste distincte de cette incarnation ajoutée antérieurement. Les costumes créés, les sources brutes et toutes leurs versions précédentes restent conservés.

Le catalogue sélectionne **4 nouvelles poses physiques depuis P51**, correspondant à 4 entrées personnage/tenue et 3 PNG distincts. Parmi ces entrées, 4 concernent des tenues officielles et 0 des Originals corrigés. Un PNG peut contenir plusieurs tenues statiques ; les versions remplacées ne multiplient pas le total des dessins. Les sources et cadrages sélectionnés avant P52 restent identiques à la base P51.

Nouvelles poses sélectionnées : MSF SOLDIER — Scout — Versus; MSF SOLDIER — Guard — Versus; SNAKE — AC!D 2 — Link Battle — Color B; VENUS — Link Battle — Color B.

Sur les **14 lignes réellement manquantes au départ de P52**, **4 ont une nouvelle source**, **2 réutilisent une apparence vérifiée de la même incarnation**, **0 ont un refus ou une garde sans nouvelle production**, et **8 nécessitent encore une preuve visuelle précise**. La ligne historique qui mélangeait XOF 1975 et hôpital 1984 reste signalée séparément ; son Original de 1984 existait déjà dans P50. Les **26 réemplois P50/P51 déjà établis** (24 P50 et 2 P51) ne sont pas comptés comme des résolutions nouvelles de P52. Réemplois qualifiés P52 : Lunettes infrarouges; Arrivée à Mother Base — tenue Naked d’origine attestée.

Le libellé historique « Arrivée à Mother Base — manteau drapé » est corrigé en « Arrivée à Mother Base — tenue Naked d’origine attestée ». L’ancien intitulé «manteau drapé» n’est pas attesté ; capture de la séquence réelle en tenue d’origine, aucune cape inventée.

## Consulter

- [Excel complet](CQC_SUIVI_P52_POSES_UNIQUES_20261114_PUBLIC_V1.xlsx). Le classeur contient **67 feuilles**, dont les **64 feuilles antérieures conservées exactement** et 3 nouvelles feuilles P52. Les onglets P50 et P51 restent des snapshots historiques.
- [Catalogue autonome](catalogue/) et [mode d’emploi](catalogue/LIRE_MOI.txt). Le lecteur contient 1287 PNG distincts, soit 1.94 Gio de sources sélectionnées.
- [Bilan chiffré](P52_LIVRAISON_POSES_UNIQUES_PUBLIC_V1.json), [contrôles finaux](P52_FINAL_VERIFICATION_PUBLIC_V1.json) et CSV correspondants.
- Dans `inventaires/`, les 416 rapprochements officiels et leurs références conservent les recherches P49/P50/P51 et ajoutent les preuves P52. Les anciennes recherches n’ont pas été réécrites.

Le catalogue compte 3344 entrées pourvues d’une pose sélectionnée. Types de sources : existing-archived-frame : 179, existing-private-frame : 1, generated-atlas : 2615, native-composite : 23, native-frame : 526. Ces totaux cumulent les sources anciennes et nouvelles ; ils ne sont pas le nombre de dessins produits pendant P52.

Les PNG exacts produits pendant cette passe sont conservés dans `artists/`. Le lecteur utilise les fichiers sélectionnés sous `catalogue/assets/`. Les PNG bruts antérieurs restent conservés dans les livraisons précédentes ; une correction de pose ou de cadrage ne supprime pas sa source précédente.

Pour récupérer uniquement le lecteur :

```sh
git clone --filter=blob:none --sparse --branch codex/cqc-p52-remaining-costumes-20261114 https://github.com/darknigthmare/shadow-codec-ops.git cqc-poses
cd cqc-poses
git sparse-checkout set docs/cqc-reprise/pass52/static-poses/catalogue
cd docs/cqc-reprise/pass52/static-poses/catalogue
python -m http.server 8160 --bind 127.0.0.1
```

Ouvrir ensuite http://127.0.0.1:8160/ .

## Fidélité et limites

Les dessins reposent sur les captures, modèles, textures et accessoires effectivement inspectés. Une référence précise d’accessoire peut compléter le corps connu de la même incarnation ; un simple nom de tenue ne suffit pas. Les époques, remakes et formes distinctes gardent leurs identités.

Le bilan conserve **12 périmètres de garde cumulés**, dont 0 nouveau(x) depuis P51 et 5 lignes officielles dans le registre courant. Les refus effectifs du service sont distingués des gardes sans tentative. Une source ancienne déjà conservée sous garde reste une archive ; elle n’autorise aucune nouvelle tentative, substitution ou relance par un autre agent.

Les détails reconstruits, preuves techniques et références seulement conceptuelles gardent leurs limites. Aucun dessin n’est certifié identique pixel pour pixel au jeu d’origine. Les réemplois techniques, les dessins et l’admission dans les combats sont des états distincts. Un état « À vérifier » ne vaut pas admission au jeu.

Les cadrages et points d’appui sélectionnent une pose sans modifier les pixels des PNG. Les empreintes et locateurs des références sont conservés ; les livres complets, vidéos, paquets tiers et images exclues des preuves publiables ne font pas partie de cette livraison.

Cette passe ne crée aucune animation et ne modifie aucun combat, stage, menu du jeu ou déploiement Vercel. Son dossier est isolé sous `docs/cqc-reprise/pass52/static-poses/`.
