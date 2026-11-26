# Continuation P63 — Survive, AC!D, AC!D 2 et Revengeance

**26 novembre 2026 — extension additive du socle P62.** Les 17 sources nouvelles portent le total sélectionné de 177 à **194** : **124 décors, 17 personnages, 7 costumes, 45 machines et 1 VFX**. Les trois essais P63 archivés portent le total des essais écartés à **12**. Le guide utilisateur original, les 90 exigences, les huit pilotes, les 64 rencontres, les 36 séquences et les 108 plans restent ceux de la fondation P62.

Les images entrent dans un **Atlas consultable depuis le menu du jeu**, avec leurs références et la présente fiche. **17 sources accessibles dans l’Atlas ; 0 nouvelle admission au combat ; 0 certification absolue 1:1 ; 0 nouvelle image narrative.**

## Association au guide

| Rubrique | Usage concret en P63 |
|---|---|
| 02 — Fidélité et sources | Références par scène, erreurs écartées, incertitudes géométriques explicites. |
| 13 — Composition des arènes | Une vue latérale dégagée par lieu ; plans indépendants restant à produire. |
| 14 — Arènes vivantes et statiques | Sources fixes, sans animation ou comportement de danger ajouté. |
| 15 — Connexions et interactions | Les sous-secteurs sont distingués ; portes/transitions ne sont pas activées par l’image. |
| 17 — Production des assets | PNG individuel, identifiant stable, prompt, empreintes et archive des essais remplacés. |
| 19 — Interface et expérience | Accès réel via Chroniques/Extras, recherche et filtres de l’Atlas. |
| 25 — Inventaires et statistiques | Compteurs de fichiers distincts des groupes et des admissions. |
| 26 — Validation | Contrôles de structure et tests décrits séparément de la revue visuelle native et du navigateur. |

Le registre [asset-associations-p63.json](asset-associations-p63.json) ajoute les associations P63 sans remplacer [asset-associations.json](asset-associations.json), photographie des 177 sources P60/P61/P62. Le premier conserve `runtimeIntegrated:false` au sens historique d’admission au combat et ajoute `atlasIntegrated:true` pour la consultation. Ces indicateurs décrivent deux usages différents.

## Accès dans CQC

Route : `/cqc/?module=atlas63`. Module : [source-atlas-v063.html](../../public/cqc/modules/source-atlas-v063.html). Catalogue : [cqc-p63-source-atlas.json](../../public/cqc/data/cqc-p63-source-atlas.json).

L’Atlas donne accès aux sources, à leurs fiches et aux fronts déjà existants : Survive vers les archives de mission, AC!D/AC!D 2 vers le dossier AC!D, Rising vers le dossier Revengeance. Il n’ouvre pas une nouvelle arène ou un nouveau combat. Les images sont chargées individuellement et les erreurs offrent une relance du catalogue.

[Contrat et vérification du module](../cqc-reprise/pass63/ATLAS_INTEGRATION.md) · [Vérification détaillée](../cqc-reprise/pass63/verification.json).

## Limites de fidélité et admission suivante

Les images sont des **propositions de sources latérales**, à revoir contre les captures natives. Le hall World Marshal n’a pas ses Hammerheads suspendus, la salle GRAD n’a pas ses canisters destructibles, et le secteur des serveurs n’est pas reconstruit dans son volume complet. La localisation Deserted Mine est africaine ; l’équivalence précise à Kungenga n’est pas certifiée. Le niveau FAR exact de chaque sous-sol et les autres missions AC!D 2 restent distincts.

Le contrat existant de [plans de stage](../../public/cqc/src/cqc-stage-layers.js) et les [fiches de validation](FICHES_ET_VALIDATION.md) restent à satisfaire : plans avec profondeur, premier plan transparent lorsque requis, sol lisible, références et revue, collisions et interactions, tests de combat. Le PNG d’ensemble ne remplace pas ces éléments.

L’absence de téléchargement possible de certaines références et la panne de l’environnement de travail sont déclarées dans les rapports. Elles ne sont pas présentées comme une validation visuelle complète ou une réussite navigateur.

## Périmètres conservés

Cinq groupes historiques déjà partiels reçoivent de nouvelles vues : `stage:acid_ruins`, `stage:acid_far`, `stage:mgr_guadalajara`, `stage:mgr_wm_interior`, `stage:mgr_pakistan_base`. Sept secteurs nouveaux décrivent trois zones AC!D 2 et quatre cartes coopératives Survive. Les **277 lignes historiques et leurs 97 lignes sans correspondance démontrée restent inchangées**.

La liste des 33 périmètres des quatre jeux et les motifs documentaires/non résolus restent dans [l’audit préalable](../cqc-reprise/pass63/AUDIT_QUATRE_JEUX.md). Forsaken Ruins, Wormhole Digger, DL-VR 005, les variantes, corps de projectiles et identités sans apparence établie ne sont pas déclarés réalisés. Les refus antérieurs sont conservés.

## Fiches des 17 sources

<a id="acid-lobito-forest"></a>

### AC!D — Lobito / forêt

[Source PNG](../../public/cqc/assets/p63/acid-lobito-forest.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid-lobito-forest)

**Périmètre :** Forêt d’approche de Lobito, distincte de Ruins Lower P61 et Ruins Upper P62.

**Association :** `stage:acid_ruins`. Extension d’un groupe historique déjà partiellement couvert.

- Végétation, sentier et clôture d’accès ; projection latérale du secteur forestier.
- Une vue candidate ne valide pas la géométrie complète des secteurs PSP.

**Références :** [1](https://www.konami.com/mg/archive/mga/english/introduction.html) · [2](https://www.gamespot.com/articles/metal-gear-acid-walkthrough/1100-6122267/) · [3](https://forums.somethingawful.com/showthread.php?threadid=3841082).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="acid-far-exterior"></a>

### AC!D — FAR / extérieur

[Source PNG](../../public/cqc/assets/p63/acid-far-exterior.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid-far-exterior)

**Périmètre :** Approche extérieure de FAR, distincte du hangar KODOQUE déjà présent.

**Association :** `stage:acid_far`. Extension d’un groupe historique déjà partiellement couvert.

- Petits bâtiments de service, tour de garde, clôture et accès technique.
- Proportions et position des éléments recomposées pour une vue latérale ; captures natives à comparer.

**Références :** [1](https://www.gamespot.com/articles/metal-gear-acid-walkthrough/1100-6122267/) · [2](https://as.com/meristation/2005/08/15/guia_pagina/1124085635_026378.html).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="acid-far-interior"></a>

### AC!D — FAR / accès intérieur

[Source PNG](../../public/cqc/assets/p63/acid-far-interior.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid-far-interior)

**Périmètre :** Salle d’accès et infrastructure intérieure de FAR avant les sous-sols.

**Association :** `stage:acid_far`. Extension d’un groupe historique déjà partiellement couvert.

- Bloc central, passages, porte, escalier, panneau et grille de service.
- Ne représente pas la cinématique d’introduction de Teliko ni l’ensemble B3F/B4F/B5F ; volumes à valider sur PSP.

**Références :** [1](https://www.gamespot.com/articles/metal-gear-acid-walkthrough/1100-6122267/) · [2](https://as.com/meristation/2005/08/15/guia_pagina/1124085635_026378.html).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="acid2-harbor-area"></a>

### AC!D 2 — Harbor Area

[Source PNG](../../public/cqc/assets/p63/acid2-harbor-area.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid2-harbor-area)

**Périmètre :** Port de SaintLogic, Stage 01, source fixe d’approche.

**Association :** `stage:acid2_harbor_area`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Palette vive, conteneurs verts, structure de levage jaune et mer.
- Composition de quai adaptée ; position exacte des conteneurs et du crochet à revoir sur le niveau natif.

**Références :** [1](https://www.youtube.com/watch?v=vt0S_DG7c9U&t=1410s) · [2](https://metalgearspeedrunners.com/wiki/doku.php?id=acid2ng).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="acid2-cargo-train"></a>

### AC!D 2 — Cargo Train

[Source PNG](../../public/cqc/assets/p63/acid2-cargo-train.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid2-cargo-train)

**Périmètre :** Wagon de fret de Stage 07 ; vue latérale unique.

**Association :** `stage:acid2_cargo_train`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Wagon plat, conteneurs et garde-corps industriels.
- Mouvement du train, transitions entre wagons et découpage des plans non produits.

**Références :** [1](https://www.youtube.com/watch?v=vt0S_DG7c9U&t=19478s) · [2](https://metalgearspeedrunners.com/wiki/doku.php?id=acid2ng).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="acid2-security-monitor-room"></a>

### AC!D 2 — Security Section / Monitor Room

[Source PNG](../../public/cqc/assets/p63/acid2-security-monitor-room.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid2-security-monitor-room)

**Périmètre :** Salle de surveillance du deuxième étage de Security Section, Stage 05.

**Association :** `stage:acid2_security_monitor`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Postes de surveillance et terminaux dans un rendu cel-shading.
- Le bleu/jaune du schéma réseau n’est pas pris comme plan architectural ; nombre et implantation des moniteurs à vérifier.

**Références :** [1](https://www.youtube.com/watch?v=vt0S_DG7c9U&t=9895s) · [2](https://www.neoseeker.com/metal-gear-acid-2/faqs/139598-script.html) · [3](https://metalgearspeedrunners.com/wiki/doku.php?id=acid2ng).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-wm-lobby"></a>

### Revengeance — World Marshal / hall

[Source PNG](../../public/cqc/assets/p63/mgr-wm-lobby.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-wm-lobby)

**Périmètre :** Hall d’entrée World Marshal, distinct des bureaux du vingtième étage.

**Association :** `stage:mgr_wm_interior`. Extension d’un groupe historique déjà partiellement couvert.

- Béton, acier, verre, mezzanine et escalier ; architecture contemporaine.
- Les deux Hammerheads décoratifs ne sont pas peints dans le fond : source d’environnement incomplète pour une reconstruction 1:1.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://www.neoseeker.com/metal-gear-rising/walkthrough/FILE_R-04%3A_Hostile_Takeover) · [3](https://metalgear.fandom.com/wiki/World_Marshal_Headquarters).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-wm-freight-elevator"></a>

### Revengeance — World Marshal / ascenseur de fret

[Source PNG](../../public/cqc/assets/p63/mgr-wm-freight-elevator.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-wm-freight-elevator)

**Périmètre :** Plateforme et cage de l’ascenseur de fret, vue de travail latérale.

**Association :** `stage:mgr_wm_interior`. Extension d’un groupe historique déjà partiellement couvert.

- Guidages, rails, dalle métallique et infrastructure de béton.
- Le concept officiel documente le langage architectural ; le palier exact et le modèle final restent à comparer.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://www.neoseeker.com/metal-gear-rising/walkthrough/FILE_R-04%3A_Hostile_Takeover) · [3](https://www.platinumgames.com/official-blog/wp-content/uploads/sites/2/2013/02/7e382a8e383ace38399e383bce382bfe383bce5898d.jpg?w=500).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-wm-japanese-garden"></a>

### Revengeance — World Marshal / jardin japonais

[Source PNG](../../public/cqc/assets/p63/mgr-wm-japanese-garden.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-wm-japanese-garden)

**Périmètre :** Jardin japonais intérieur de World Marshal, composition latérale.

**Association :** `stage:mgr_wm_interior`. Extension d’un groupe historique déjà partiellement couvert.

- Pavillon, végétation et eau dans un atrium d’entreprise.
- Architecture et plantation recomposées ; aucune revendication de reconstruction métrique.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://www.neoseeker.com/metal-gear-rising/walkthrough/FILE_R-04%3A_Hostile_Takeover) · [3](https://metalgear.fandom.com/wiki/World_Marshal_Headquarters).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-wm-server-room"></a>

### Revengeance — World Marshal / serveurs

[Source PNG](../../public/cqc/assets/p63/mgr-wm-server-room.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-wm-server-room)

**Périmètre :** Vue technique candidate de World Marshal, associée au secteur des serveurs de R-04.

**Association :** `stage:mgr_wm_interior`. Extension d’un groupe historique déjà partiellement couvert.

- Baies, câblage supérieur, béton et éclairage utilitaire.
- Les passerelles et le volume complet de la salle R-04 ne sont pas reconstruits ; localisation et agencement doivent être revus sur captures finales.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://www.neoseeker.com/metal-gear-rising/walkthrough/FILE_R-04%3A_Hostile_Takeover).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-guadalajara-brain-chamber"></a>

### Revengeance — R-02 / chambre biologique

[Source PNG](../../public/cqc/assets/p63/mgr-guadalajara-brain-chamber.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-guadalajara-brain-chamber)

**Périmètre :** Chambre de conservation biologique, distincte de l’atelier et des égouts P61.

**Association :** `stage:mgr_guadalajara`. Extension d’un groupe historique déjà partiellement couvert.

- Enceinte vitrée et dispositifs de conservation ; aucun personnage intégré.
- Agencement des contenants et détail des unités biologiques à comparer aux captures finales.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/Research-Facility.htm).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-guadalajara-grad-arena"></a>

### Revengeance — R-02 / salle du GRAD

[Source PNG](../../public/cqc/assets/p63/mgr-guadalajara-grad-arena.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-guadalajara-grad-arena)

**Périmètre :** Salle arrière de l’affrontement GRAD, distincte du couloir d’approche.

**Association :** `stage:mgr_guadalajara`. Extension d’un groupe historique déjà partiellement couvert.

- Infrastructure industrielle du laboratoire ; machine GRAD séparée du fond.
- Aucune collision, destruction ou phase de boss n’est admise par cette source fixe.
- Les grands canisters destructibles de l’affrontement restent à produire séparément ; la salle vide n’est pas une restitution complète de l’arène.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/Research-Facility.htm) · [3](https://www.youtube.com/watch?v=nJEM28iHx30) · [4](https://www.supercheats.com/metal-gear-rising-revengeance/walkthrough/file-r-02-research-facility).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="mgr-pakistan-exterior"></a>

### Revengeance — R-07 / base pakistanaise extérieure

[Source PNG](../../public/cqc/assets/p63/mgr-pakistan-exterior.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-pakistan-exterior)

**Périmètre :** Entrée et approche extérieure avant le hangar et l’affrontement EXCELSUS.

**Association :** `stage:mgr_pakistan_base`. Extension d’un groupe historique déjà partiellement couvert.

- Portail, bâtiments et infrastructures militaires de l’approche.
- Distinct du hangar P61 et de pakistan_wreck ; cette vue ne ferme pas le périmètre EXCELSUS.
- Correction de l’essai initial : les réservoirs ajoutés par erreur ont été retirés ; blindés et tourelle restent des assets séparés.

**Références :** [1](https://www.platinumgames.com/official-blog/article/4749) · [2](https://portforward.com/games/walkthroughs/Metal-Gear-Solid-Rising-Revengeance/R-07-Assassination-Attempt.htm) · [3](https://www.supercheats.com/metal-gear-rising-revengeance/walkthrough/file-r-07) · [4](https://www.bazicenter.com/features/ign_guides/metal-gear-rising-revengeance.pdf).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="survive-wrecked-base"></a>

### Survive — Wrecked Base

[Source PNG](../../public/cqc/assets/p63/survive-wrecked-base.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-wrecked-base)

**Périmètre :** Da Shago Kallai transformé dans Dite ; première singularité.

**Association :** `stage:survive_wrecked_base`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Maçonnerie afghane et passerelle métallique rapportée ; remplace l’essai dominé par une épave de Mother Base.
- Correspondance du lieu documentée ; l’implantation précise de la passerelle reste à valider visuellement.

**Références :** [1](https://steamcommunity.com/app/543900/discussions/0/2860219962101972571/) · [2](https://www.fandom.com/articles/metal-gear-survive-beta-haunted-phantom-pain) · [3](https://steamcommunity.com/sharedfiles/filedetails/?id=3250045585) · [4](https://www.trueachievements.com/a248337/common-struggle-achievement).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="survive-fallen-village"></a>

### Survive — Fallen Village

[Source PNG](../../public/cqc/assets/p63/survive-fallen-village.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-fallen-village)

**Périmètre :** Village afghan associé à Da Wialo Kallai par recoupement des guides de la seconde singularité.

**Association :** `stage:survive_fallen_village`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Maisons basses, ruelles et terrain plat ; correspondance issue du rapprochement des missions.
- Position des maisons et détails des accès restent une adaptation à revoir.

**Références :** [1](https://steamcommunity.com/app/543900/discussions/0/2860219962101972571/) · [2](https://steamcommunity.com/sharedfiles/filedetails/?id=1312645473) · [3](https://www.truetrophies.com/game/Metal-Gear-Survive/walkthrough/2) · [4](https://steamcommunity.com/sharedfiles/filedetails/?id=3250045585).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="survive-deserted-mine"></a>

### Survive — Deserted Mine

[Source PNG](../../public/cqc/assets/p63/survive-deserted-mine.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-deserted-mine)

**Périmètre :** Mine de la carte Afrique/FOB, troisième singularité.

**Association :** `stage:survive_deserted_mine`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Jungle, dénivelé, zones humides et navire ; remplace la carrière désertique écartée.
- Kungenga n’est pas une correspondance certifiée ; implantation des ateliers et du navire à vérifier sur captures.

**Références :** [1](https://steamcommunity.com/app/543900/discussions/0/2860219962101972571/) · [2](https://steamcommunity.com/sharedfiles/filedetails/?id=3250045585) · [3](https://www.trueachievements.com/a248337/common-struggle-achievement) · [4](https://d.namu.moe/w/%EB%A9%94%ED%83%88%EA%B8%B0%EC%96%B4%20%EC%84%9C%EB%B0%94%EC%9D%B4%EB%B8%8C) · [5](https://www.youtube.com/watch?v=pKWQDVffd-c&t=4267s).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

<a id="survive-abandoned-airport"></a>

### Survive — Abandoned Airport

[Source PNG](../../public/cqc/assets/p63/survive-abandoned-airport.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-abandoned-airport)

**Périmètre :** Aéroport africain associé à Nova Braga, candidat du secteur coopératif.

**Association :** `stage:survive_abandoned_airport`. Identifiant de secteur ajouté en P63, hors inventaire historique des 277 lignes.

- Bâtiments à toits accessibles, escaliers et aire bétonnée.
- Correspondance du lieu étayée ; silhouette du terminal et parcours sur les toits à valider dans Survive.

**Références :** [1](https://steamcommunity.com/app/543900/discussions/0/2860219962101972571/) · [2](https://mgsvmodding.wiki/Things_Codes/) · [3](https://mgsvmodding.wiki/Locations/) · [4](https://ameblo.jp/epicpine99/entry-12463189445.html) · [5](https://d.namu.moe/w/%EB%A9%94%ED%83%88%EA%B8%B0%EC%96%B4%20%EC%84%9C%EB%B0%94%EC%9D%B4%EB%B8%8C).

Statut : source fixe candidate ; Atlas intégré ; combat non admis ; fidélité externe en revue.

