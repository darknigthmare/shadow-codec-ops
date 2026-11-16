# CQC — poses uniques restantes — P51

Cette livraison poursuit les tenues officielles encore ouvertes après P50 : **une pose statique vers la droite par tenue qualifiée**, avant les animations. Les **382 incarnations déjà présentes dans P50** restent la base de cette passe. Le XOF de l’hôpital de 1984 en fait déjà partie ; il n’est pas compté comme un nouveau personnage P51. La matrice historique des 381 incarnations et de ses 3429 lignes reste distincte de cet ajout P50. Les costumes créés, les sources brutes et toutes leurs versions précédentes restent conservés.

Le catalogue sélectionne **6 nouvelles poses physiques depuis P50**, correspondant à 6 entrées personnage/tenue et 6 PNG distincts. Parmi ces entrées, 5 concernent des tenues officielles et 1 des Originals corrigés. Un PNG peut contenir plusieurs tenues statiques ; les versions remplacées ne multiplient pas le total des dessins.

Sur les **23 lignes réellement manquantes au départ de P51**, **6 ont une nouvelle source**, **2 réutilisent une apparence vérifiée de la même incarnation**, **1 ont un refus ou une garde sans nouvelle production**, et **14 nécessitent encore une preuve visuelle précise**. La ligne historique qui mélangeait XOF 1975 et hôpital 1984 reste signalée séparément ; son Original de 1984 existait déjà dans P50. Les 24 réemplois P50 ne sont pas comptés comme des résolutions nouvelles de P51.

## Consulter

- [Excel complet](CQC_SUIVI_P51_POSES_UNIQUES_20261113_PUBLIC_V1.xlsx). Le classeur contient **64 feuilles**, dont les **61 feuilles antérieures conservées exactement** et 3 nouvelles feuilles P51. Les onglets P50 restent des snapshots historiques.
- [Catalogue autonome](catalogue/) et [mode d’emploi](catalogue/LIRE_MOI.txt). Le lecteur contient 1284 PNG distincts, soit 1,93 Gio de sources sélectionnées,
- [Bilan chiffré](P51_LIVRAISON_POSES_UNIQUES_PUBLIC_V1.json), [contrôles finaux](P51_FINAL_VERIFICATION_PUBLIC_V1.json) et CSV correspondants.
- Dans `inventaires/`, les 416 rapprochements officiels et leurs références conservent les recherches P49/P50 et ajoutent les preuves P51. Les anciennes recherches n’ont pas été réécrites.

Les PNG exacts produits pendant cette passe sont conservés dans `artists/`. Le lecteur utilise les fichiers sélectionnés sous `catalogue/assets/`. Les PNG bruts antérieurs restent aussi conservés dans les livraisons P49 et P50 ; une correction de pose ou de cadrage ne supprime pas sa source précédente.

Pour récupérer uniquement le lecteur :

```sh
git clone --filter=blob:none --sparse --branch codex/cqc-p51-remaining-costumes-20261113 https://github.com/darknigthmare/shadow-codec-ops.git cqc-poses
cd cqc-poses
git sparse-checkout set docs/cqc-reprise/pass51/static-poses/catalogue
cd docs/cqc-reprise/pass51/static-poses/catalogue
python -m http.server 8160 --bind 127.0.0.1
```

Ouvrir ensuite http://127.0.0.1:8160/ .

## Fidélité et limites

Les dessins reposent sur les captures, modèles, textures et accessoires effectivement inspectés. Une référence précise d’accessoire peut compléter le corps connu de la même incarnation ; un simple nom de tenue ne suffit pas. Les époques, remakes et formes distinctes gardent leurs identités.

Le bilan conserve **12 périmètres de garde cumulés**, dont 1 nouveau(x) depuis P50 et 5 lignes officielles dans le registre courant. Les refus effectifs du service sont distingués des gardes sans tentative. Une source ancienne déjà conservée sous garde reste une archive ; elle n’autorise aucune nouvelle tentative, substitution ou relance par un autre agent.

Les détails reconstruits, preuves techniques et références seulement conceptuelles gardent leurs limites. Aucun dessin n’est certifié identique pixel pour pixel au jeu d’origine. Les réemplois techniques, les dessins et l’admission dans les combats sont des états distincts. Un état «À vérifier» ne vaut pas admission au jeu.

Les cadrages et points d’appui sélectionnent une pose sans modifier les pixels des PNG. Les empreintes et locateurs des références sont conservés ; les livres complets, vidéos, paquets tiers et images exclues des preuves publiables ne font pas partie de cette livraison.

Cette passe ne crée aucune animation et ne modifie aucun combat, stage, menu du jeu ou déploiement Vercel. Son dossier est isolé sous `docs/cqc-reprise/pass51/static-poses/`.
