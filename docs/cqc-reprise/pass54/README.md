# CQC P54 — renforts, tenues, lieux et pièces articulées

Cette suite part du code de la PR #15 (`04221faf7933b4a33cf63e3859533639f010723e`). Les images prévues dans les anciens catalogues ne sont plus comptées comme livrées sur la seule présence d’un nom ou d’un prompt.

19 des 20 fiches de costumes originaux disposent d’une nouvelle pose droite. Raven « Expédition polaire » reste sans image après un refus effectif du générateur ; aucune nouvelle tentative n’a été faite. Hi-Tech Soldier de MGS2 et Pequod TPP ont chacun un nouveau corps statique, avec leurs références d’édition distinctes. Ces 21 poses sont accessibles dans **Atelier → Dossiers des renforts et équipements**. Elles préparent les animations : elles ne sont pas ajoutées artificiellement à la liste des combattants jouables.

OC009 et OC010 respectent la demande de vrais costumes Metal Gear entièrement mécaniques. L’ancienne interprétation humaine d’OC010 est conservée sous réserve ; la version v2 est sélectionnée. OC020 « Carapace segmentée » est une création CQC explicitement définie, sans prétendre qu’une Turtle Armor canonique a été retrouvée. Les 28 PNG bruts comprennent 27 candidats actuels et cette version historique écartée ; aucun pixel n’a été modifié après génération.

## Scènes et machines raccordées

- **Oil Fence — MGS2 HD** : mer opaque, ponton et pylône indépendants, parallaxe distincte et reflet animé optionnel. La bouée non attestée de l’ancien relevé n’a pas été inventée.
- **M1 — Canyon de Shadow Moses**, **Hind — toit de la tour B**, **RAY — avenue africaine de R-00** : nouveaux fonds sourcés et rencontres Arsenal associées. Les décors, la caméra et les ancrages des boss restent fixes lorsque le joueur traverse le terrain.
- **Core libre, Academy IA libre et Chronicles personnalisées explicites** utilisent les neuf scènes P53/P54 disponibles. Les règles des leçons et routes canoniques sont conservées. Un décor importé localement reste prioritaire dans le combat et l’aperçu.
- **Gander** utilise les 43 exports PNG existants de P53, dont 24 apparences chargées pour la caméra actuelle. Les coordonnées du rig, parents, pivots et origines de tir restent ceux du modèle admis. Les 162 comparaisons d’origine native passent. Aucun nouveau dessin ou joint n’est inventé ; le profil existant n’avait aucune pièce détachable.

Le lecteur de Gander évite les trois anciens atlas pendant le combat : 24 petits PNG représentent environ 1,28 Mo, contre 5,14 Mo pour les atlas. Les différences de bord dues au découpage et à l’anticrénelage restent décrites dans les preuves ; un rendu RGBA strictement identique n’est pas affirmé.

## Vérifications

735 tests du projet et 36 contrôles Node ciblés passent. Le vérificateur intégral CQC contrôle **2 954 fichiers**, dont 79 nouveaux, et conserve les 499 routes externes exactes. Les anciennes images et les règles du vérificateur canonique restent inchangées. Treize HTML existants reçoivent les raccordements ; le paquet conserve tous les chemins antérieurs.

Les 39 cas de navigateur sont regroupés dans 22 objets de preuve : galerie après filtres et trois tailles d’écran, chargement/annulation/nouvelle tentative, matchs Core/Academy/Chronicles, trois rencontres de boss lancées à froid, Gander en entraînement, puis entrées CQC autonome et Shadow Ops sur le build. Les échecs de test volontairement injectés et le favicon facultatif en404 restent distingués des erreurs d’assets. Les captures sont fournies.

TypeScript, Vite et PWA passent. Le build contient les anciennes ressources CQC complètes. Pour économiser le stockage local, les fichiers publics ont été copiés par liens physiques avant la compilation, sans modifier leurs octets.

Le contrôle final est **PASS_FINAL**, avec empreintes de l’inventaire, du manifeste, des sources et du classeur. La comparaison des fichiers suivis utilise les OID Git de la base et les empreintes des fichiers réellement présents ; les traces des deux premières hypothèses du vérificateur corrigées et de l’échec de lecture du cache Git partiel sont conservées.

## Suivi et reprise

Le classeur **CQC_SUIVI_P54_SOURCES_ET_RACCORDS_20261120_PUBLIC_V1.xlsx** contient 70 feuilles : les 67 anciennes feuilles et leurs membres ZIP inchangés sont préservés exactement. Les trois nouveaux onglets distinguent sources, raccordements et reste à traiter.

Les huit lignes officielles encore sans preuve suffisante, les 14 périmètres de garde, les animations et admissions futures, les familles des deux nouvelles incarnations et les compléments des machines/stages restent visibles. Les 90 chemins historiques P53 et les trois Oil Fence manquants ne sont pas déclarés récupérés : les nouvelles images sont de nouvelles versions. Les remakes, âges et incarnations restent séparés.

Les silhouettes reposent sur des références réellement inspectées. Les compositions latérales et détails reconstruits gardent leurs limites ; une certification 1:1 de chaque pixel, timing ou taille de tout le jeu n’est pas annoncée.

Pour consulter la galerie et le jeu après clonage de cette branche :

```sh
git clone --filter=blob:none --sparse --depth 1 --branch codex/cqc-p54-completion-20261120 https://github.com/darknigthmare/shadow-codec-ops.git cqc-p54
cd cqc-p54
git sparse-checkout set public/cqc
python -m http.server 8154 --directory public
```

Ouvrir `http://localhost:8154/cqc/`. Les sources et références sélectionnées, contrats, scripts, captures, inventaires et points de reprise sont conservés dans ce dossier. Le suivi technique détaille les admissions sans les déduire de la seule présence d’un dessin.
