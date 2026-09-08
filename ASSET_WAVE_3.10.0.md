# Version 3.10.0 — Archives Peace Walker / The Phantom Pain

Date de production : 8 septembre 2026. Lot de visuels original fan-made produit avec l’outil OpenAI imagegen intégré, après consultation de références en ligne. Aucun asset officiel extrait n’est distribué et aucune fidélité littérale 1:1 n’est revendiquée.

## Livraison réelle

Le registre contient **40 identités : 16 Peace Walker et 24 The Phantom Pain**. Chaque identité dispose d’un dossier portrait/carte source et d’animations consultables. Ce nombre décrit ce registre précis, pas la totalité des PNJ, costumes, équipements et variantes de ces jeux.

| Surface | Ajout de cette version | Réutilisation vérifiée | Total du registre |
| --- | ---: | ---: | ---: |
| Planches 2D | 30 × 16 poses | 20 × 16 poses | 50 planches / 800 poses |
| Clips 2D | 120 clips de quatre poses | 80 clips de quatre poses | 200 clips |
| Portraits humains | 7 séries × 6 WebP | 17 séries × 6 WebP | 24 séries / 144 WebP |
| Cartes animaux, machines et ennemis | Cartes tirées des vrais sprites | Sources existantes conservées | 16 cartes, sans fausses émotions |

Les 30 nouvelles planches RGBA sont en 512 × 512, cellules 128 × 128, détourage transparent, marge minimale 8 pixels. Elles contiennent **480 dessins distincts**, non des poses fabriquées par translation d’une image unique. Un nouveau personnage a quatre clips / seize poses ; il ne doit pas être présenté comme possédant le contrat huit clips / trente-deux poses des dix acteurs réutilisés.

### Nouveaux corps Peace Walker — 10

Miller, Paz, Huey, Amanda, Chico, Cécile, Strangelove, Gálvez, Coldman et Mammal Pod. Big Boss, Pupa, Chrysalis, Cocoon, Peace Walker Basilisk et ZEKE réutilisent leurs animations existantes.

### Nouveaux corps The Phantom Pain — 20

Miller, Ocelot, Huey, Code Talker, Quiet, Pequod, Skull Face, Eli, Tretij Rebenok, Man on Fire, Ishmael, Paz 1984, Mosquito, D-Dog, D-Horse, D-Walker, Walker Gear, Skulls Mist, Skulls Sniper et soldat PF. Venom Snake, Sahelanthropus, Skulls Armor et le soldat soviétique réutilisent leurs animations existantes.

### Sept nouvelles séries de portraits — 42 WebP

Coldman, Eli, Tretij Rebenok, Man on Fire, Ishmael, Paz 1984 et Mosquito. Chaque série comporte `neutral`, `serious`, `warning`, `calm`, `humor`, `glitch`, en 512 × 512. Les portraits existants ne sont pas écrasés. Mosquito est le commandant de la **mission principale 22, Retake the Platform**, pas la Side Op 22 ni Mosquite de Ground Zeroes.

## Intégration visible

Dans le mode Side Ops, ouvrir **Archives PW / TPP**. Le dossier propose filtre d’époque, recherche, expressions, choix d’action, lecture/pause et examen de chaque pose. Les compteurs passent à chargé uniquement après décodage d’images réelles ; une réponse HTML de repli n’est pas un visuel valide.

**Inspecter en 2D** installe le personnage sélectionné dans la scène de reconnaissance correspondante. Le spécimen est un sprite Phaser à échelle uniforme, sans corps physique, dégâts, collision, objectif ou récompense. Ses poses se sélectionnent dans un panneau placé sous le HUD, sans masquer le personnage. Le déplacement est une patrouille d’inspection limitée ; il ne constitue pas une nouvelle IA de compagnon ou de boss. Recommencer réinitialise l’inspection ; Quitter l’inspection la supprime.

Le résolveur des portraits Codec reconnaît les sept nouvelles identités, mais aucune fréquence, réplique ou conversation canonique n’est inventée pour rendre un antagoniste artificiellement joignable. Le dossier est une archive, non une nouvelle conversation radio.

## Fidélité et reprises

- PW Huey conserve son fauteuil de 1974 ; TPP Huey utilise ses orthèses de jambes de 1984.
- TPP Miller conserve ses amputations du bras droit et de la jambe gauche, sa manche vide et sa béquille.
- Gálvez conserve sa prothèse de main droite rouge et ne reçoit pas de lunettes inventées.
- Code Talker conserve son fauteuil et son pendentif turquoise ; Tretij ses proportions enfantines, son masque et sa lévitation.
- D-Dog a été régénéré après détection d’un cadrage rogné. Plusieurs marches PW/TPP et les bandages d’Ishmael ont également été repris.
- Le portrait Man on Fire v3, trop androïde, a été rejeté. La version v4 revient à une silhouette humaine massive, une tenue militaire nervurée, des sangles et des flammes enveloppantes ; ombres et flammes remplacent volontairement les détails graphiques de blessures. Ce choix reste une adaptation, non une identité faciale exacte.
- Pequod est une interprétation du pilote anonyme cohérente avec le portrait existant. Mosquito s’appuie sur sa capture de dossier de personnel à faible définition. Le soldat PF représente une tenue d’infanterie légère Rogue Coyote, pas toutes les forces privées.
- Certains cycles compacts restent légèrement décalés verticalement (environ 2 à 3,5 pixels affichés) entre dessins. Les transformations uniformes et les dessins originaux sont conservés ; l’unicité des fichiers ne prouve pas une interpolation parfaitement fluide.

## Références et traçabilité

Les prompts détaillés, sources OpenAI approuvées et empreintes SHA256 sont conservés dans `scripts/art_sources/pw-tpp-roster`. Les rapports publics utilisent des chemins relatifs portables. `importRosterActorBoard.py` refuse les cellules rognées ou vides, vérifie la grille et conserve une échelle commune. Le découpage des portraits utilise `scripts/splitCodecPortraitSheet.py`. Aucune retouche artistique n’est effectuée par script.

- [Personnages et histoire Konami Peace Walker](https://www.konami.com/mg/history/jp/ja/mgspw).
- [Personnages Konami The Phantom Pain](https://www.konami.com/mg/mgs5/tpp/jp/story/).
- [Compagnons tactiques — Konami](https://eu-support.konami.com/hc/en-gb/articles/9668972984727-The-Phantom-Pain-Tactical-Buddies).
- [Man on Fire — figurine sous licence présentée par Konami](https://www.konami.com/mg/mgs5/tpp/jp/goods/item_playartskai_manonfire.html).
- [Walker Gear — concept officiel reproduit par Creative Uncut](https://www.creativeuncut.com/gallery-27/mgs5-walker-gear.html).
- [AI Pod — concept officiel reproduit par Creative Uncut](https://www.creativeuncut.com/gallery-12/mgspw-ai-pod.html).
- [Mosquito — capture de jeu publiée par Automaton](https://automaton-media.com/articles/newsjp/20180302-63858/).

Les rendus de modèles de fans et captures secondaires utilisés pour certaines variantes sont identifiés comme tels dans leurs prompts ; ils ne sont pas présentés comme des publications officielles.

## Vérification de livraison

- Suite complète finale `npm run qa` : **699 tests dans 103 fichiers**, lint, build et contrôle PWA réussis après gel des sources. Journal : `G:/CodexBuild/shadowcodecops/qa/pw-tpp-310-final-qa.log`.
- Importeurs Python : **37 tests existants + 11 nouveaux, tous réussis**.
- Audit physique indépendant des 30 planches : **90 hashes source/feuille/idle**, 480 poses distinctes, dimensions, transparence, marges et chemins portables validés.
- Archives navigateur : **40/40 dossiers décodés**, **200 clips** vérifiés aux bornes de frames, **160 états portrait/carte**, **202 fichiers HTTP 200 comparés aux hashes locaux**, clavier et mobile sans débordement horizontal. Pas d’erreur page ou console.
- Inspection réelle Huey/Miller/Gálvez : déplacements, absence de collision, origine idle au sol, redémarrage et suppression validés. Clips Quiet frames 12–15 vérifiés ; HUD corrigé puis recontrôlé visuellement.

Les preuves navigateur restent dans `G:/CodexBuild/shadowcodecops/qa/character-archive-final` et les fichiers temporaires de QA ne sont pas publiés. Cette version livre les visuels et leur inspection, pas trente nouvelles missions de combat. Les installateurs natifs de la version précédente ne sont pas présentés comme des binaires 3.10.0 ; ce lot est livré sur le web/Vercel.
