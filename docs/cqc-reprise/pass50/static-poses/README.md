# CQC — suite des tenues officielles — P50

Cette livraison poursuit les tenues officielles encore sans dessin après P49 : **une pose statique vers la droite par tenue**, avant les animations. Les 381 incarnations de base restent séparées ; le XOF de l’hôpital en 1984 est ajouté comme incarnation distincte du XOF de Ground Zeroes 1975. Les costumes créés, les versions précédentes et les sources brutes restent conservés.

**127 nouveaux dessins depuis P49**, dont 3 Originals corrigés, une tenue médicale de Delta et le nouvel Original XOF de 1984 identifiés pendant les recherches. Parmi les 177 lignes officielles initialement ouvertes, **125 ont un nouveau dessin**, **24 réutilisent une apparence existante de la même incarnation**, **23 nécessitent encore une référence suffisamment sûre** et **4 restent protégées sans PNG**. Une autre ligne historique comporte une erreur de période : son sprite existe sous le nouvel Original XOF 1984, et la ligne 1975 reste marquée comme erreur à réexaminer plutôt que comme alias de costume. Un équipement dont le jeu conserve le même corps n’est pas compté comme un nouveau dessin.

## Consulter

- [Excel complet](CQC_SUIVI_P50_POSES_UNIQUES_20261113_PUBLIC_V1.xlsx) : les 58 feuilles précédentes restent exactes ; trois nouvelles feuilles P50 donnent l’état courant. Les feuilles P49 conservent leur rôle de snapshots historiques.
- [Catalogue autonome](catalogue/) et son [mode d’emploi](catalogue/LIRE_MOI.txt).
- [Bilan chiffré](P50_LIVRAISON_POSES_UNIQUES_PUBLIC_V1.json), [contrôles finaux](P50_FINAL_VERIFICATION_PUBLIC_V1.json) et CSV correspondants.
- Les rapprochements des 416 lignes officielles et leurs références se trouvent dans `inventaires/`. Les PNG bruts exacts sont dans `artists/` ; les images choisies par le lecteur sont dans `catalogue/assets/`. Les versions remplacées restent présentes.

Le catalogue complet inclut les dessins de P49 et les ajouts P50. Pour récupérer uniquement ce lecteur :

```sh
git clone --filter=blob:none --sparse --branch codex/cqc-p50-official-costumes-20261113 https://github.com/darknigthmare/shadow-codec-ops.git cqc-poses
cd cqc-poses
git sparse-checkout set docs/cqc-reprise/pass50/static-poses/catalogue
cd docs/cqc-reprise/pass50/static-poses/catalogue
python -m http.server 8160 --bind 127.0.0.1
```

Ouvrir ensuite http://127.0.0.1:8160/ . Le lecteur autonome représente environ 2 Go avec les sources antérieures réutilisées.

## Fidélité et limites

Les recherches ont utilisé les captures des jeux, leurs textures, modèles et planches officielles effectivement inspectés. Les tenues de remakes, les différentes périodes et les formes distinctes gardent leurs identités. Une référence de tête ou d’accessoire peut compléter le corps déjà attesté de cette même incarnation ; elle n’autorise pas une tenue inventée à partir d’un simple nom.

Certains libellés du suivi historique restent non attestés ; leur présence dans l’inventaire ne confirme pas une tenue officielle. Les dessins gardent leurs limites de reconstruction. Les détails interprétés et les sources seulement conceptuelles restent signalés ; aucun résultat n’est certifié identique pixel pour pixel au jeu d’origine. Les états «À vérifier» du lecteur ne valent pas admission aux combats.

Le dossier de sources conserve les empreintes et les locateurs des références. Les livres complets, vidéos et paquets tiers ne sont pas exportés ; les pages de guides restent identifiées par leur URL/page et leur empreinte. Les quatre gardes P50 distinguent deux refus effectifs du service de génération et deux cas sans tentative de génération. Les sept gardes déjà présents avant P50 restent inchangés.

Les cadrages, points d’appui et éventuels polygones du lecteur sélectionnent une pose sans modifier les pixels des PNG. Les métadonnées de sources sont adressées par leur empreinte. Les essais du lecteur couvrent le grand écran, le mobile, la pagination, les filtres et les chargements répétés.

Cette passe ne crée aucune animation et ne modifie aucun combat, stage ou menu du jeu. Le travail est isolé sous `docs/cqc-reprise/pass50/static-poses/`.
