# Continuation P67 — personnages manquants, édition par édition

**26 novembre 2026 — 29 nouvelles sources individuelles sur 17 éditions : 22 personnages en corps entier, 6 portraits et 1 machine complète.** Le cumul atteint **254 sources sélectionnées**, **77 dossiers Atlas** et **19 essais archivés**. Les 225 sélections, 18 archives et 48 dossiers Atlas de P66 restent conservés.

Cette passe répond à la poursuite des sprites manquants en cherchant la correspondance la plus étroite que permettent les références. **Aucune de ces reconstructions n’est certifiée identique 1:1 au modèle ou au sprite natif.** Les postures, textures et parties peu lisibles restent décrites dans chaque fiche. Une résolution générée plus grande ne restitue pas des détails absents de la capture source.

[Galerie des 29 PNG](../cqc-reprise/pass67/README.md) · [Associations](asset-associations-p67.json) · [Manifeste](../cqc-reprise/pass67/delivery-manifest.json) · [Audit des opus](../cqc-reprise/pass67/AUDIT_OPUS.md) · [Manquants et limites par édition](../cqc-reprise/pass67/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass67/INTEGRATION_QA.md)

## Livraison et représentation

| Opus / édition | Ajouts | Images sélectionnées |
|---|---:|---|
| Metal Gear — version MSX2 | 1 | garde gris d’Outer Heaven |
| Metal Gear — version NES | 1 | garde d’Outer Heaven |
| Metal Gear 2: Solid Snake — version MSX2 | 1 | Four Horsemen / Ultrabox, archétype visuel partagé |
| Metal Gear Solid — design PlayStation, illustration du manuel d’origine | 2 | Genome léger, illustration officielle du manuel ; Genome lourd, illustration officielle du manuel |
| Metal Gear Solid 2 / capture HD Edition | 1 | otage anonyme grisonnant de Shell 1, assis |
| Metal Gear Solid: The Twin Snakes | 1 | Kenneth Baker assis après sa libération |
| Metal Gear Solid: Portable Ops Plus | 5 | USSR Female Soldier (A) ; Ocelot Unit Female Soldier (A) ; Male Scientist (A) ; USSR Male Soldier (A) ; Female Officer (A) |
| Metal Gear Solid: Peace Walker | 1 | guérillero Sandinista, modèle PSP |
| Metal Gear Solid Delta: Snake Eater | 1 | GRU à cagoule, portrait du haut du torse |
| Metal Gear Solid 4: Guns of the Patriots | 2 | rebelle du Moyen-Orient, manches courtes ; rebelle du Moyen-Orient, tunique claire |
| Metal Gear Online 3 | 6 | portrait du preset Scout au masque optique ; portrait du preset Enforcer au casque à visière ; portrait du preset Infiltrator à cagoule ; preset Scout à casquette, tenue kaki ; preset Infiltrator au masque respirateur ; preset Enforcer à motif crâne |
| Metal Gear Solid Mobile | 1 | garde olive, variante N-Gage |
| Metal Gear Online 1 | 1 | Rowdy Reiko, tenue et pose de Subsistence |
| Metal Gear Solid V: The Phantom Pain | 2 | Dr Evangelos Constantinou, tenue de l’hôpital ; infirmière du prologue, portrait en tenue blanche |
| Metal Gear Online 2 | 1 | preset à béret blanc, uniforme noir et bandoulière |
| Metal Gear Solid V: Ground Zeroes | 1 | garde de Camp Omega en poncho, salut |
| Metal Gear Solid Touch | 1 | Gekko, pose aérienne de la mission 07 |

Les 31 requêtes ont donné 30 sorties PNG : 29 sélections et la première version du portrait Scout archivée. Une requête Peace Walker Sentinel Vest a été refusée par l’outil, sans fichier ; elle n’a pas été réessayée. Tous les PNG livrés sont les sorties brutes avec canal alpha, sans modification de pixels, changement de taille ni recomposition programmatique après génération.

Les six portraits sont : GRU Delta ; Scout, Enforcer et Infiltrator issus des images officielles MGO3 ; garde en poncho Ground Zeroes ; infirmière TPP. Leurs jambes et leurs accessoires hors champ ne sont pas déduits du buste. Les autres personnages comprennent des poses de modèle en T, des civils assis et un médecin en pose reconstituée ; leur présence ne crée pas un combattant jouable.

## Fidélité et provenance

Les deux Genome MGS1 suivent les illustrations officielles du manuel ; ils ne sont pas présentés comme une extraction des modèles PS1. Les gardes MSX/NES et l’archétype MG2 sont des reconstructions en pixel art dont la palette et la grille ne sont pas certifiées pixel par pixel. L’otage de Shell 1 provient d’une séquence MGS2 HD, avec édition distincte du PS2 original.

Les cinq variantes Portable Ops Plus et le Sandinista Peace Walker reposent sur des previews communautaires de modèles attribués à la PSP. Les deux rebelles MGS4 correspondent à deux sujets complets d’une même capture ; sa build exacte, promotionnelle ou finale, n’est pas établie. Les avatars Online sont des presets précis, pas des uniformes universels de classe. Les détails des visages, mains, armes, insignes et textures générés ne valent pas preuve du modèle natif.

Le Gekko Touch est limité à la pose visible dans une image de presse de gameplay iPad distribuée en 500×375. La taille de cette image ne démontre pas la résolution de l’application. Le pied fléchi et les petits modules restent sous réserve. Pour TPP, l’identité de l’infirmière demeure une variante visuelle sans prénom attribué ; la pose debout du médecin assemble plusieurs observations natives.

## Fiches individuelles

<a id="mg1-msx-outer-heaven-gray-guard"></a>

### MG MSX2 — garde gris d’Outer Heaven

**Périmètre :** Une pose du garde gris natif MSX2, reconstruite en pixel art agrandi ; le groupe gardes/chiens et ses autres palettes reste ouvert.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mg1-msx-outer-heaven-gray-guard` |
| Type / édition | `character` / `mg_msx` — Jeu original MSX2 |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mg1-msx-outer-heaven-gray-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mg1-msx-outer-heaven-gray-guard.png) |
| Dimensions natives | 1024×1536, RGBA, 666,009 octets |
| SHA-256 | `a53623fc5ab704b9b83e9474bc66014e63620d7e1a90e2be08c71e8e5d7c89d3` |
| WorkIds | `character:R-MG1-03` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.spriters-resource.com/msx2/metalgear/asset/22528/)
- [Référence 2](https://www.spriters-resource.com/media/assets/21/22528.png?updated=1755472545)

**Constats et limites :**

- Planche native de sprites inspectée avant génération ; première silhouette grise du groupe GUARDS prise pour ancrage.
- La silhouette complète, la famille de palette grise et la vue native sont conservées sans réinterprétation réaliste.
- Les pixels, couleurs exactes et textures de l’agrandissement généré ne sont pas une extraction ni un agrandissement entier déterministe de l’original.
- Une pose seulement ; animations, autres gardes, variantes d’alerte et chiens non produits.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="mg1-nes-outer-heaven-guard"></a>

### MG NES — garde d’Outer Heaven

**Périmètre :** Une pose du garde NES à palette beige/noir, distincte du garde MSX2 ; le groupe global reste ouvert.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mg1-nes-outer-heaven-guard` |
| Type / édition | `character` / `mg_nes` — Jeu original NES |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mg1-nes-outer-heaven-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mg1-nes-outer-heaven-guard.png) |
| Dimensions natives | 1024×1536, RGBA, 644,378 octets |
| SHA-256 | `c9c957329de249ba78846d0e679c5baa120980baa4d7b37d3449f17132f3e451` |
| WorkIds | `character:R-MG1-03` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.spriters-resource.com/nes/mg/asset/19406/page-1/)
- [Référence 2](https://www.spriters-resource.com/media/assets/18/19406.png?updated=1755472532)

**Constats et limites :**

- Planche native NES inspectée ; première silhouette du groupe GUARD prise pour ancrage.
- Palette beige/noir et proportions compactes spécifiques à cette version conservées comme familles visuelles.
- Le résultat est une reconstruction pixel art générée, pas une copie pixel à pixel ; blocs, nuances et pose exigent une revue précise.
- Aucune fusion avec la version MSX2, aucun jetpack ou chien ajouté. Une seule pose statique.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="mg2-four-horsemen-shared-guard"></a>

### MG2 — Four Horsemen / Ultrabox, archétype visuel partagé

**Périmètre :** Une pose normale de l’archétype partagé Four Horsemen/Ultrabox ; ne compte pas comme quatre identités visuellement distinctes.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mg2-four-horsemen-shared-guard` |
| Type / édition | `character` / `mg2` — Jeu original MSX2 |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mg2-four-horsemen-shared-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mg2-four-horsemen-shared-guard.png) |
| Dimensions natives | 887×1774, RGBA, 340,980 octets |
| SHA-256 | `df8407bf2b1db921017a1bd66eaea97c824931c13cf22f9ddc5788be4d33d3e9` |
| WorkIds | `character:R-MG2-02` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.spriters-resource.com/msx2/mg2solidsnake/asset/22532/)
- [Référence 2](https://www.spriters-resource.com/media/assets/21/22532.png?updated=1755472545)

**Constats et limites :**

- La planche native porte le groupe Ultrabox/4 Horsemen ; seule sa première pose à palette normale est utilisée.
- Silhouette claire, pantalon sombre et proportions compactes suivis ; flashs blancs/rouges et poses voisines exclus.
- Reconstruction pixel art avec nuances générées : aucune correspondance pixel à pixel certifiée.
- Le nombre de membres du groupe ne devient pas quatre nouvelles identités ; permutations, positions et animations restent à documenter.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="mgs1-genome-light-infantry"></a>

### MGS1 — Genome léger, illustration officielle du manuel

**Périmètre :** Corps complet du Genome Light Infantry d’après l’illustration officielle, dans sa pose radio ; correspondance au modèle PS1 et animations non validées.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgs1-genome-light-infantry` |
| Type / édition | `character` / `mgs1` — Illustration officielle du manuel PS1 |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgs1-genome-light-infantry.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgs1-genome-light-infantry.png) |
| Dimensions natives | 1024×1536, RGBA, 1,790,713 octets |
| SHA-256 | `b753ef43e919e2baa2253f1ab236386061ce2f615bcf1b62a51845c5268ea920` |
| WorkIds | `character:R-MGS1-light` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://metalgear.konami.net/manual/mc1/mgs1_integral/pc/en/page19.html)
- [Référence 2](https://metalgear.konami.net/manual/mc1/mgs1_integral/pc/en/img/19_illust13.png)
- [Référence 3](https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/manual/Formated/Metal_Gear_Solid_-_1998_-_Konami.pdf)

**Constats et limites :**

- Corps entier vérifié sur la page imprimée 39 du manuel Konami d’époque (page PDF40) ; l’image web seule est recadrée aux cuisses.
- Capuche, masque en tissu, radio levée, antenne, ceinture, pantalon et bottes correspondent à la deuxième illustration de cette page.
- L’image reprend une illustration officielle ; elle n’est pas un rendu extrait du modèle du jeu. Teintes d’impression, détails internes de l’arme, plis et proportions restent à revoir.
- La pose frontale trois quarts est conservée afin de ne pas inventer un costume vu de profil ou de dos.
- L’aperçu présente du RGB coloré sous alpha0 autour du corps : échantillons numériques transparents vérifiés, pas de fond réellement peint.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="mgs1-genome-heavily-armed-troop"></a>

### MGS1 — Genome lourd, illustration officielle du manuel

**Périmètre :** Corps complet du Heavily Armed Troop d’après l’illustration officielle, pose armée trois quarts ; modèle PS1, équipements secondaires et animations non validés.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgs1-genome-heavily-armed-troop` |
| Type / édition | `character` / `mgs1` — Illustration officielle du manuel PS1 |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgs1-genome-heavily-armed-troop.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgs1-genome-heavily-armed-troop.png) |
| Dimensions natives | 1024×1536, RGBA, 1,994,245 octets |
| SHA-256 | `46eb9e2633f2018c467c813f1577c32e7ba636ede9ae9c2e161826fe08e3d1c6` |
| WorkIds | `character:R-MGS1-heavy` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://metalgear.konami.net/manual/mc1/mgs1_integral/pc/en/page19.html)
- [Référence 2](https://metalgear.konami.net/manual/mc1/mgs1_integral/pc/en/img/19_illust15.png)
- [Référence 3](https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/manual/Formated/Metal_Gear_Solid_-_1998_-_Konami.pdf)

**Constats et limites :**

- Corps entier vérifié sur la quatrième illustration de la page imprimée39 du manuel Konami d’époque (page PDF40).
- Casque fermé arrondi, masque inférieur, armure sombre segmentée, protections des avant-bras, vêtement olive, étui de cuisse et bottes repris de l’illustration.
- Teintes violettes et traits rouges suivent le dessin officiel ; ils ne doivent pas être présentés comme textures exactes du modèle PS1.
- Arme, attaches, proportions et détails des zones peu définies restent des reconstructions graphiques à contrôler.
- Alpha natif vérifié : les halos RGB visibles dans l’aperçu se trouvent dans des zones alpha0, pas un arrière-plan opaque.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="mgs2-shell1-gray-haired-hostage"></a>

### MGS2 — otage anonyme grisonnant de Shell 1, assis

**Périmètre :** Une variante civile anonyme assise, observée à 132–134 s ; le groupe des otages reste ouvert.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgs2-shell1-gray-haired-hostage` |
| Type / édition | `character` / `mgs2` — MGS2 HD — séquence IGN |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgs2-shell1-gray-haired-hostage.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgs2-shell1-gray-haired-hostage.png) |
| Dimensions natives | 1312×1199, RGBA, 526,549 octets |
| SHA-256 | `279b85addeb4580176b2c39c921746a1506be39a581feb872e18ea01a5c11e44` |
| WorkIds | `character:R-MGS2-03` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=KMNUNMh0jTo)
- [Référence 2](https://www.konami.com/mg/archive/mgs2/english/mr/secret_en.html)

**Constats et limites :**

- Capture native de MGS2 HD présentée par IGN, non certifiée comme capture PS2 originale.
- Sujet ciblé : homme anonyme grisonnant en costume sombre, assis au sol contre le grillage, visible dans la deuxième rangée, première et deuxième vignettes de la feuille 7 (132–134 s).
- Ames n’est pas ciblé ; ce personnage anonyme ne reçoit aucun nom ou rôle inventé.
- La pose civile assise est conservée ; aucun costume de combat ni équipement n’est ajouté.
- Les vignettes natives limitent la précision des petits détails du visage, de la cravate et des chaussures ; aucune certification 1:1.
- Sortie : corps et deux chaussures complets, palette sombre et pose assise conservées. Visage plus lissé et mèches grises sombres reconstitués : ne pas assimiler au mesh ni aux textures extraits du jeu.
- Résidus d’alpha très faible au bord : 21 pixels ont alpha > 0 sur le cadre, mais aucun n’a alpha > 16 ou > 128. La silhouette à alpha > 16 conserve 74 px de marge basse. PNG brut non nettoyé.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="tts-kenneth-baker-seated"></a>

### The Twin Snakes — Kenneth Baker assis après sa libération

**Périmètre :** Kenneth Baker, pose civile assise après libération, d’après la cinématique native ; une pose observée, pas un corps de combattant.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:tts-kenneth-baker-seated` |
| Type / édition | `character` / `twin_snakes` — The Twin Snakes — GameCube |
| Représentation | Corps complet dans une seule pose |
| Fichier | [tts-kenneth-baker-seated.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/tts-kenneth-baker-seated.png) |
| Dimensions natives | 1672×941, RGBA, 682,340 octets |
| SHA-256 | `a98830e08ea6059741134181473e5d0d10f45f58e65f8d00f0cdf88afaba5420` |
| WorkIds | `character:R-TTS-kenneth-baker` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=gAIjhFH79EY)
- [Référence 2](https://www.youtube.com/watch?v=wsmM77JaCPw)

**Constats et limites :**

- Références natives de la version GameCube The Twin Snakes, corps assis visible après la libération de Baker ; ne pas réattribuer à son modèle PS1.
- Pose principale : première feuille, première rangée deuxième vignette, recoupée par feuille HD 12 deuxième rangée première vignette.
- Corps entier observé dans des vignettes de faible définition : disposition générale et vêtements justifiés, microdétails du visage et tissu non certifiés.
- Rester assis, fatigué, jambes étendues/pliées comme dans la scène ; aucune posture de combat ni accessoire ajouté.
- La génération peut interpoler les détails du modèle et n’est ni une extraction native ni une copie certifiée 1:1.
- Sortie : corps complet, deux chaussures et deux mains visibles. Le raccord de l’avant-bras passant derrière le genou est partiellement occulté et reste soumis à la revue visuelle indépendante ; géométrie non validée.
- Le visage est plus détaillé que les petites captures sources ; aucune certification des microdétails.
- Résidus d’alpha très faible au bord : 11 pixels ont alpha > 0 sur le cadre, mais aucun n’a alpha > 16 ou > 128. La silhouette à alpha > 16 conserve 24 px de marge basse. PNG brut non nettoyé.
- Revue du root : candidat assis conservé ; le raccord avant-bras/genou occulté reste une réserve explicite, pas une preuve d’anatomie exacte.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

<a id="mpop-ussr-female-a"></a>

### Portable Ops Plus — USSR Female Soldier (A)

**Périmètre :** Une recrue féminine soviétique A en pose frontale T, tenue ocre et bretelles noires. Aucun autre visage, équipement, palette, dos ou animation du groupe.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mpop-ussr-female-a` |
| Type / édition | `character` / `mpo_plus` — Metal Gear Solid: Portable Ops Plus — PSP, preview communautaire d’un modèle attribué au jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mpop-ussr-female-a.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mpop-ussr-female-a.png) |
| Dimensions natives | 1347×1167, RGBA, 529,932 octets |
| SHA-256 | `7d2f5587a779db22afc3ff70068a3cdd9115f0188eedcdd0d551013a708ad7eb` |
| WorkIds | `character:R-MPO-soviet` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323917/)
- [Référence 2](https://models.spriters-resource.com/media/preview_icons/321/323917.png)

**Constats et limites :**

- Cheveux courts bruns, manches courtes à revers gris, sous-vêtement rayé, deux bretelles, étui côté image-gauche et poche côté image-droite concordent avec le preview PSP.
- Pose source frontale conservée ; visage, plis et microtextures sont reconstruits à plus grande définition.
- Référence 750×650 issue d’un preview communautaire du modèle PSP ; origine de jeu attribuée par la fiche, pas un rendu promotionnel officiel. La taille de sortie ne restitue pas des détails absents de la source.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mpop-ocelot-female-a"></a>

### Portable Ops Plus — Ocelot Unit Female Soldier (A)

**Périmètre :** Une recrue féminine A de l’unité Ocelot, béret rouge-brun et uniforme noir, vue frontale T. Ne couvre ni les variantes B/C ni la recrue masculine.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mpop-ocelot-female-a` |
| Type / édition | `character` / `mpo_plus` — Metal Gear Solid: Portable Ops Plus — PSP, preview communautaire d’un modèle attribué au jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mpop-ocelot-female-a.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mpop-ocelot-female-a.png) |
| Dimensions natives | 1347×1167, RGBA, 518,944 octets |
| SHA-256 | `15e9ce8ffe5681aca09ac855611052db85a204c0c95fccaae20f6270871103cd` |
| WorkIds | `character:R-MPO-ocelot` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323902/)
- [Référence 2](https://models.spriters-resource.com/media/preview_icons/321/323902.png)

**Constats et limites :**

- Béret incliné, cheveux blonds, pattes de col rouges, sangle diagonale, poches aux hanches et gants noirs sont repris du preview.
- Visage, boucles et pattes de col sont reconstruits ; aucune validation des insignes à l’échelle du texel.
- Référence 750×650 issue d’un preview communautaire du modèle PSP ; origine de jeu attribuée par la fiche, pas un rendu promotionnel officiel. La taille de sortie ne restitue pas des détails absents de la source.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mpop-male-scientist-a"></a>

### Portable Ops Plus — Male Scientist (A)

**Périmètre :** Un scientifique masculin A recrutable en blouse blanche et pose T. Ni déguisement de Snake dans MGS3, ni ensemble des médecins/scientifiques/officiers MPO.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mpop-male-scientist-a` |
| Type / édition | `character` / `mpo_plus` — Metal Gear Solid: Portable Ops Plus — PSP, preview communautaire d’un modèle attribué au jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mpop-male-scientist-a.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mpop-male-scientist-a.png) |
| Dimensions natives | 1244×1264, RGBA, 584,414 octets |
| SHA-256 | `b7dbdffa63eddde9470e931b96a9a29db176b05b49415a398feaac7a06745269` |
| WorkIds | `character:R-MPO-medical` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323074/)
- [Référence 2](https://models.spriters-resource.com/media/preview_icons/320/323074.png)

**Constats et limites :**

- Blouse longue, cravate bordeaux, pantalon olive-brun et emplacement des patchs/du badge suivent le modèle PSP.
- Lettrage des patchs et microcontenu du badge reconstruits et non validés ; aucune inscription produite ne vaut preuve canonique.
- Référence 750×650 issue d’un preview communautaire du modèle PSP ; origine de jeu attribuée par la fiche, pas un rendu promotionnel officiel. La taille de sortie ne restitue pas des détails absents de la source.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="pw-sandinista"></a>

### Peace Walker — guérillero Sandinista, modèle PSP

**Périmètre :** Un modèle Sandinista PSP, casquette olive et foulard jaune, vue frontale T. Aucun ensemble complet des FSLN ni posture blessée/transportée.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:pw-sandinista` |
| Type / édition | `character` / `pw` — Metal Gear Solid: Peace Walker — PSP, preview communautaire d’un modèle attribué au jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [pw-sandinista.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/pw-sandinista.png) |
| Dimensions natives | 1347×1167, RGBA, 523,771 octets |
| SHA-256 | `899a543a7ed4e51fcce8808b4316167bb30d848e5d2212b7f2893d8813167205` |
| WorkIds | `character:R-PW-FSLN` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://models.spriters-resource.com/psp/metalgearsolidpeacewalker/asset/331654/)
- [Référence 2](https://models.spriters-resource.com/media/preview_icons/328/331654.png)

**Constats et limites :**

- Casquette olive, visage barbu/moustachu, foulard jaune, chemise à poches, ceinturon, étui et chaussures sombres concordent avec le preview natif.
- Texture faciale, plis et détails des poches sont reconstruits. La pose T n’est pas une animation de repos du gameplay.
- Référence 750×650 issue d’un preview communautaire du modèle PSP ; origine de jeu attribuée par la fiche, pas un rendu promotionnel officiel. La taille de sortie ne restitue pas des détails absents de la source.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mpop-ussr-male-a"></a>

### Portable Ops Plus — USSR Male Soldier (A)

**Périmètre :** Une recrue masculine soviétique A, cagoule sombre, tunique ocre à manches longues, vue frontale T. Ne couvre pas les autres types ni leurs palettes.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mpop-ussr-male-a` |
| Type / édition | `character` / `mpo_plus` — Metal Gear Solid: Portable Ops Plus — PSP, preview communautaire d’un modèle attribué au jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mpop-ussr-male-a.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mpop-ussr-male-a.png) |
| Dimensions natives | 1347×1167, RGBA, 543,440 octets |
| SHA-256 | `3b0fd44c659bc74adf7f54ea967cabbb549947b4728f2225c345513f30f6e524` |
| WorkIds | `character:R-MPO-soviet` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323923/)
- [Référence 2](https://models.spriters-resource.com/media/preview_icons/321/323923.png?updated=1755506373)

**Constats et limites :**

- Cagoule à ouverture étroite, quatre poches de tunique, bretelles doubles, étui image-gauche, poche et attache pendante image-droite, bottes brunes repris du preview.
- Détails du visage autour des yeux, boucles, coutures et plis sont reconstruits.
- Référence 750×650 issue d’un preview communautaire du modèle PSP ; origine de jeu attribuée par la fiche, pas un rendu promotionnel officiel. La taille de sortie ne restitue pas des détails absents de la source.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mpop-female-officer-a"></a>

### Portable Ops Plus — Female Officer (A)

**Périmètre :** Une officière recrutable A, coiffe olive, tunique à boutons et sangle diagonale, vue frontale T. Rattachement au groupe P61 « médecins, scientifiques et officiers recrutables » ; pas de région promotionnelle inventée.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mpop-female-officer-a` |
| Type / édition | `character` / `mpo_plus` — Metal Gear Solid: Portable Ops Plus — PSP, preview communautaire d’un modèle attribué au jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mpop-female-officer-a.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mpop-female-officer-a.png) |
| Dimensions natives | 1239×1270, RGBA, 501,626 octets |
| SHA-256 | `894d9f01444dba1962e7b61b25386c62285563e3ddd0af8fea6a006235a9a5a3` |
| WorkIds | `character:R-MPO-medical` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323051/)
- [Référence 2](https://models.spriters-resource.com/media/preview_icons/320/323051.png?updated=1755506115)

**Constats et limites :**

- Cheveux blonds, coiffe olive à panneau brun, col brun/rouge, poches de poitrine, sangle noire diagonale, petit étui et pochette de ceinture concordent avec le preview.
- Cadre serré mais mains, coiffe et semelles restent visibles ; le contour significatif garde au moins 6 px de marge. Insigne et visage restent reconstruits.
- Référence 750×650 issue d’un preview communautaire du modèle PSP ; origine de jeu attribuée par la fiche, pas un rendu promotionnel officiel. La taille de sortie ne restitue pas des détails absents de la source.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="delta-gru-balaclava-portrait"></a>

### Delta — GRU à cagoule, portrait du haut du torse

**Périmètre :** Portrait tête, épaules et haut du torse uniquement, d’après une capture native PC. Le bord inférieur au niveau des poches est volontaire ; aucun bras complet, taille, dos, jambe ou pied n’est produit.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:delta-gru-balaclava-portrait` |
| Type / édition | `character` / `delta` — Delta — capture PC (Esc Pause visible), publication IMFDB le 31 août 2025 |
| Représentation | Portrait, corps non établi par ce PNG |
| Fichier | [delta-gru-balaclava-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/delta-gru-balaclava-portrait.png) |
| Dimensions natives | 1492×1054, RGBA, 1,501,583 octets |
| SHA-256 | `155052e3f1288eb9278af25d2e1062149fd27381ac1c4ce4977158ff8668068e` |
| WorkIds | `character:R-MGS3-gru` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.imfdb.org/wiki/File:Metal_Gear_Solid_3_Delta_GRU_Soldier_cutscene_AK.jpg)
- [Référence 2](https://www.imfdb.org/images/6/63/Metal_Gear_Solid_3_Delta_GRU_Soldier_cutscene_AK.jpg)
- [Référence 3](https://www.imfdb.org/wiki/Metal_Gear_Solid_%CE%94:_Snake_Eater)

**Constats et limites :**

- Cagoule olive, ouverture des yeux, regard vers image-gauche, coutures de tête, col sombre, camouflage et trois poches frontales respectent les détails observés.
- Texture des tissus et peau reconstruite à plus grande définition ; petits écarts d’éclairage et de plis. Ce portrait ne remplace pas un corps GRU complet.
- Édition Delta explicite : pas d’association automatique à la tenue PS2 de MGS3 ni au mode FOX HUNT.
- Une seule capture de cutscene native archivée par Samz. Son cadrage ne montre pas le bas du corps ; l’image générée reste un portrait limité au haut du torse.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mgs4-middle-east-rebel-short-sleeve"></a>

### MGS4 — rebelle du Moyen-Orient, manches courtes

**Périmètre :** Un rebelle au premier plan de la capture PS3 archivée, manches courtes olive et tissu autour de la tête/du cou, corps entier dans la pose observée. Ni groupe régional complet, ni variante sud-américaine.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgs4-middle-east-rebel-short-sleeve` |
| Type / édition | `character` / `mgs4` — MGS4 — capture attribuée au jeu PS3 par IGDB/Backloggd ; date et build de capture non établis |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgs4-middle-east-rebel-short-sleeve.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgs4-middle-east-rebel-short-sleeve.png) |
| Dimensions natives | 1094×1438, RGBA, 1,023,813 octets |
| SHA-256 | `7f4e487096e5886c02becb30e60b908eb894569a057c199259eca94e79713c40` |
| WorkIds | `character:R-MGS4-rebelme` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://backloggd.com/games/metal-gear-solid-4-guns-of-the-patriots/)
- [Référence 2](https://images.igdb.com/igdb/image/upload/t_1080p_2x/xvxsun2a7aoiexmuvftz.webp)

**Constats et limites :**

- Tissu de tête à plis diagonaux, ouverture du visage, chemisette olive, bras nus, sangles, pantalon ample et bottes concordent avec le sujet choisi.
- L’autre rebelle situé derrière est exclu ; la silhouette entière et l’arme tenue dans la pose source sont visibles.
- Pose, proportions fines, mains et géométrie de l’arme demeurent reconstruites ; aucun rôle combat ou mouvement validé.
- Capture PS3 de jeu ou promotionnelle, archivée en présentation agrandie et douce. La build exacte (preview ou retail) n’est pas établie. Le PNG reproduit le sujet observé ; aucune équivalence certifiée au modèle retail.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mgs4-middle-east-rebel-light-tunic"></a>

### MGS4 — rebelle du Moyen-Orient, tunique claire

**Périmètre :** Un second rebelle distinct de la même capture PS3, tunique claire longue et manches longues, corps entier dans la pose observée. Variante indépendante du rebelle à manches courtes.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgs4-middle-east-rebel-light-tunic` |
| Type / édition | `character` / `mgs4` — MGS4 — capture attribuée au jeu PS3 par IGDB/Backloggd ; date et build de capture non établis |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgs4-middle-east-rebel-light-tunic.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgs4-middle-east-rebel-light-tunic.png) |
| Dimensions natives | 1079×1458, RGBA, 1,125,975 octets |
| SHA-256 | `127ef723240004424831289d81bd9754985a59ea5a8767e9ed6c4c7e6390deae` |
| WorkIds | `character:R-MGS4-rebelme` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://backloggd.com/games/metal-gear-solid-4-guns-of-the-patriots/)
- [Référence 2](https://images.igdb.com/igdb/image/upload/t_1080p_2x/xvxsun2a7aoiexmuvftz.webp)

**Constats et limites :**

- Tissu olive sur la tête, tunique claire évasée au niveau des genoux, harnais noir à poches, pantalon clair et chaussures basses sombres suivent le personnage central visible.
- Les deux semelles existent dans la référence ; aucun pied documentaire n’a été complété à partir d’un buste.
- Marge inférieure très serrée (1 px au seuil alpha >16), sans semelle manquante constatée sur les composites. Mains, poches, arme et motifs du pantalon restent reconstruits.
- Capture PS3 de jeu ou promotionnelle, archivée en présentation agrandie et douce. La build exacte (preview ou retail) n’est pas établie. Le PNG reproduit le sujet observé ; aucune équivalence certifiée au modèle retail.
- Composites clair et sombre inspectés : silhouette lisible, sans fond opaque ni halo coloré visible. Quelques valeurs alpha très faibles subsistent loin du contour ; fichier brut conservé.
- PNG individuel brut du générateur, aucune retouche des pixels ni agrandissement. Les composites JPEG et les crops de références sont uniquement des outils de QA.
- Source statique candidate : aucune certification absolue 1:1, aucune validation de géométrie native, aucune admission au combat, aucun groupe clôturé.

**Travail restant :** Revue indépendante contre les références, puis inventaire séparé des autres variantes, des vues de dos et des postures utiles. Aucun changement de statut de combat.

<a id="mgo3-scout-nvg-mantle-portrait"></a>

### MGO3 — portrait du preset Scout au masque optique

**Périmètre :** Portrait du preset Scout au masque optique et à la pèlerine camouflage, dans sa gestuelle visible. Pas de corps complet ni de tenue universelle de classe.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo3-scout-nvg-mantle-portrait` |
| Type / édition | `character` / `mgo3` — MGO3 — capture officielle Konami, classe Scout, preset précis |
| Représentation | Portrait, corps non établi par ce PNG |
| Fichier | [mgo3-scout-nvg-mantle-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo3-scout-nvg-mantle-portrait.png) |
| Dimensions natives | 1536×1024, RGBA, 1,831,810 octets |
| SHA-256 | `0e3db3cd0b1e0412cdeb862a6f04cd1c81672d3e295dc7ef18c61ad99ccf8b14` |
| WorkIds | `character:R-MGO3` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.konami.com/mg/mgs5/tpp/jp/online/class.php)

**Constats et limites :**

- Source officielle 420×237 : masque optique vert, casque audio, cagoule et cape camouflage reconnaissables. Les lentilles, raccords, motifs de tissu et microtextures sont reconstruits, pas mesurés sur le modèle natif.
- La v1 touchait le bord supérieur. La v2 redonne une marge transparente au-dessus de toute la tête ; l’original est archivé hors Atlas et runtime.
- Le bas du torse constitue la limite volontaire du portrait ; aucun pantalon ni équipement caché n’est inventé.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.
- Revue indépendante v2 : marge haute 70 px au seuil alpha >128 ; casque et tête entièrement dans le cadre. Les halos colorés échantillonnés sont du RGB sous alpha nul.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo3-enforcer-visor-portrait"></a>

### MGO3 — portrait du preset Enforcer au casque à visière

**Périmètre :** Portrait du preset Enforcer au casque à visière, dans la pose officielle observée.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo3-enforcer-visor-portrait` |
| Type / édition | `character` / `mgo3` — MGO3 — capture officielle Konami, classe Enforcer, preset précis |
| Représentation | Portrait, corps non établi par ce PNG |
| Fichier | [mgo3-enforcer-visor-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo3-enforcer-visor-portrait.png) |
| Dimensions natives | 1448×1086, RGBA, 1,762,162 octets |
| SHA-256 | `a91a040fe185bd9c6e3e783e49247f64c61bb19059c7542e3e29513301bde14d` |
| WorkIds | `character:R-MGO3` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.konami.com/mg/mgs5/tpp/jp/online/class.php)

**Constats et limites :**

- Casque, visière sombre et protection du haut du corps fondés sur la capture officielle 420×237. Petits éléments, attaches et textures reconstruits.
- Un portrait de preset ne recense pas toutes les tenues Enforcer, toutes les faces ni les animations. Aucun bas du corps ajouté.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo3-infiltrator-balaclava-portrait"></a>

### MGO3 — portrait du preset Infiltrator à cagoule

**Périmètre :** Portrait du preset Infiltrator à cagoule, limité au cadre officiel.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo3-infiltrator-balaclava-portrait` |
| Type / édition | `character` / `mgo3` — MGO3 — capture officielle Konami, classe Infiltrator, preset précis |
| Représentation | Portrait, corps non établi par ce PNG |
| Fichier | [mgo3-infiltrator-balaclava-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo3-infiltrator-balaclava-portrait.png) |
| Dimensions natives | 1670×942, RGBA, 1,235,370 octets |
| SHA-256 | `6c1a187e299057a92458a8afab047e775af119077380839daa0adc532cf49f7f` |
| WorkIds | `character:R-MGO3` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.konami.com/mg/mgs5/tpp/jp/online/class.php)

**Constats et limites :**

- Cagoule, regard, protection du cou et équipement visibles suivis dans l’image officielle 420×237. Les détails fins ne sont pas attestés à l’échelle du pixel.
- Le bas du buste atteint volontairement le bord du portrait. Ce cadrage ne constitue pas un corps complet.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mobile-ngage-olive-guard"></a>

### Metal Gear Solid Mobile — garde olive, variante N-Gage

**Périmètre :** Un garde olive au gilet sombre, sujet gauche de la capture N-Gage, isolé dans sa pose et son esthétique polygonale.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mobile-ngage-olive-guard` |
| Type / édition | `character` / `mobile` — Metal Gear Solid Mobile — version N-Gage attribuée à la capture de gameplay |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mobile-ngage-olive-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mobile-ngage-olive-guard.png) |
| Dimensions natives | 1199×1312, RGBA, 498,129 octets |
| SHA-256 | `28efd7fde3f25dfe73136748c11ae1ee297cf429a36166b4b3f86a5f54107700` |
| WorkIds | `character:R-SIDE-CATALOG` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://vgsmproject.com/2018/04/23/metal-gear-solid-mobile/)
- [Référence 2](https://sites.google.com/site/jamesblackham/metal-gear-solid--mobile--n-gage)

**Constats et limites :**

- Le corps complet et l’arme du garde gauche sont visibles dans metalgear2.jpg. Le garde droit ne fournit qu’un recoupement de silhouette ; la première image de la salle vide n’est pas utilisée comme preuve de personnage.
- Proportions polygonales compactes et palette olive conservées. Les contours et couleurs restent une reconstruction générée, pas une extraction déterministe.
- L’édition mobile est séparée des modèles PSP, PS1 et MGO. R-SIDE-CATALOG demeure partagé et ouvert pour les autres jeux.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo1-rowdy-reiko-idle"></a>

### MGO1 — Rowdy Reiko, tenue et pose de Subsistence

**Périmètre :** Rowdy Reiko en tenue noire, cheveux blonds courts et lunettes, une pose de repos observée dans MGO1.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo1-rowdy-reiko-idle` |
| Type / édition | `character` / `mgo1` — MGO1 / Subsistence PS2 — séquence native du personnage Rowdy Reiko |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgo1-rowdy-reiko-idle.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo1-rowdy-reiko-idle.png) |
| Dimensions natives | 1024×1536, RGBA, 1,255,005 octets |
| SHA-256 | `0dc5965bef7a602e0d2a9d367c0527e3dc27bf8428d21aa5c801837b7560ea7c` |
| WorkIds | `character:R-MGO1` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=76rnHWqqP88)

**Constats et limites :**

- Veste noire à liserés clairs, cravate, bas court, cuisses découvertes et bottes hautes repris du personnage de Subsistence, pas du costume Rumble Roses.
- Les vignettes 320×180 limitent le détail du visage, du tatouage et des coutures. Le motif de cuisse est simplifié ; aucune certification de texture.
- La variante Reiko normale en camouflage est distincte et n’est pas couverte par ce PNG.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="tpp-evangelos-constantinou-hospital"></a>

### TPP — Dr Evangelos Constantinou, tenue de l’hôpital

**Périmètre :** Dr Evangelos Constantinou en blouse blanche, une pose debout neutre reconstituée à partir de plusieurs vues de l’hôpital.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:tpp-evangelos-constantinou-hospital` |
| Type / édition | `character` / `tpp` — TPP — prologue hospitalier, cutscene du jeu publié |
| Représentation | Corps complet dans une seule pose |
| Fichier | [tpp-evangelos-constantinou-hospital.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/tpp-evangelos-constantinou-hospital.png) |
| Dimensions natives | 1024×1536, RGBA, 1,486,601 octets |
| SHA-256 | `f182520237178ed40ee14bb04dc4cdceadbec094b9c82e0b68d8cfea22dcf1cf` |
| WorkIds | `character:R-TPP-doctor` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=zDegziz58-A)
- [Référence 2](https://www.youtube.com/watch?v=ZS5BLbD4vWU)

**Constats et limites :**

- Visage, lunettes rondes, blouse et chemise verte établis par les vues rapprochées ; pantalon gris sombre et chaussures noirs corroborés par une autre vue du corps.
- La pose debout isolée est une recomposition : elle n’est pas identique à une image native unique. Visage, badge, poches et microtextures restent reconstruits.
- Aucune posture ou fonction de combat déduite du statut de médecin.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo2-white-beret-black-uniform-preset"></a>

### MGO2 — preset à béret blanc, uniforme noir et bandoulière

**Périmètre :** Un avatar MGO2 au béret blanc, cagoule et uniforme noirs, avec bandoulière claire.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo2-white-beret-black-uniform-preset` |
| Type / édition | `character` / `mgo2` — MGO2 — preset personnalisé observé dans le menu du jeu |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgo2-white-beret-black-uniform-preset.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo2-white-beret-black-uniform-preset.png) |
| Dimensions natives | 1024×1536, RGBA, 1,393,238 octets |
| SHA-256 | `b73c9c089f79860ce39e74fa802b356a4b2d787331d18bfb37bfb9e02e01655d` |
| WorkIds | `character:R-MGO2` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=Sw7yp3t0zx8)

**Constats et limites :**

- Béret, cagoule à motif clair, tenue et bandoulière observés dans les vues complètes 240×180. Aucun équipement d’un autre preset ajouté.
- Motif exact du masque, nombre et épaisseur des éléments de bandoulière, mains et matière textile sont reconstruits.
- Ce preset enrichit R-MGO2 ; il ne couvre ni le catalogue d’avatars ni toutes les tenues.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo3-scout-patrol-cap-preset"></a>

### MGO3 — preset Scout à casquette, tenue kaki

**Périmètre :** Un preset Scout complet à casquette olive, veste camouflage et arme en bandoulière.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo3-scout-patrol-cap-preset` |
| Type / édition | `character` / `mgo3` — MGO3 — preset Scout à casquette, menu natif |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgo3-scout-patrol-cap-preset.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo3-scout-patrol-cap-preset.png) |
| Dimensions natives | 1024×1536, RGBA, 1,600,104 octets |
| SHA-256 | `ed6ab7d0f77ee4283d7fc8c84c8ffdb76c10b4e39cd9e68a5cb2cbfa8e9b9758` |
| WorkIds | `character:R-MGO3` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=Ep8Mr3CQiEY)

**Constats et limites :**

- Seule la première feuille de la vidéo est utilisée pour ce preset ; les variantes de coiffure suivantes sont exclues afin de ne pas mélanger les équipements.
- Corps, casquette, gilet, pantalon et bottes sont visibles dans la référence. Visage, mains, configuration des poches et texture restent reconstruits.
- La catégorie Scout ne fixe pas un uniforme unique ; ce fichier représente seulement l’avatar observé.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo3-infiltrator-respirator-preset"></a>

### MGO3 — preset Infiltrator au masque respirateur

**Périmètre :** Un preset Infiltrator complet avec masque gris, torse clair, poches olive et protections de genoux.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo3-infiltrator-respirator-preset` |
| Type / édition | `character` / `mgo3` — MGO3 — preset Infiltrator au masque respirateur, menu natif |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgo3-infiltrator-respirator-preset.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo3-infiltrator-respirator-preset.png) |
| Dimensions natives | 1024×1536, RGBA, 1,693,930 octets |
| SHA-256 | `fe40b45b3fae4e934dc1a6e37a88613651449222d7f256970e61d022d05ca146` |
| WorkIds | `character:R-MGO3` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=0whcXk5SnHU)

**Constats et limites :**

- Deux feuilles de menu établissent le masque fermé, les lentilles sombres, le torse crème, les poches et les protections de jambes.
- Formes des conduits du masque, raccords des plaques, poches et plis reconstruits. Pas de géométrie native certifiée.
- Une pose de menu sans arme tenue ; pas une animation de garde ou de déplacement.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="gz-camp-omega-poncho-salute-portrait"></a>

### Ground Zeroes — garde de Camp Omega en poncho, salut

**Périmètre :** Portrait du garde de Camp Omega en poncho olive qui salue dans l’introduction.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:gz-camp-omega-poncho-salute-portrait` |
| Type / édition | `character` / `gz` — Ground Zeroes — introduction Camp Omega, capture native PC |
| Représentation | Portrait, corps non établi par ce PNG |
| Fichier | [gz-camp-omega-poncho-salute-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/gz-camp-omega-poncho-salute-portrait.png) |
| Dimensions natives | 1342×1172, RGBA, 1,497,200 octets |
| SHA-256 | `e14971b125d6d8eef6cb9a8450e9b5f1b5b82bd0f7b3ebc64436cf11935d63c1` |
| WorkIds | `character:R-GZ-camp` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=G80bgC6koq8)

**Constats et limites :**

- Seul le garde au centre de la deuxième rangée de la feuille 3 est ciblé : casquette, main nue levée et poncho humide. Aucun casque XOF ni partie de Skull Face des plans voisins.
- Le portrait garde le cadrage de référence ; pas de jambes, de chaussures ou d’équipement hors champ inventés. Visage, boutons et plis fins sont reconstruits.
- Le garde en casquette déjà sélectionné en P61 est conservé ; cette tenue à poncho est une nouvelle variante bornée.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.
- Revue indépendante : une partie du poncho était occultée par un obstacle au premier plan de la capture ; cette zone est reconstruite, non vérifiable 1:1.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="tpp-hospital-nurse-white-uniform-portrait"></a>

### TPP — infirmière du prologue, portrait en tenue blanche

**Périmètre :** Portrait de l’infirmière observée dans le prologue, coiffe blanche, cheveux attachés et uniforme clair.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:tpp-hospital-nurse-white-uniform-portrait` |
| Type / édition | `character` / `tpp` — TPP — infirmière visible dans le prologue hospitalier |
| Représentation | Portrait, corps non établi par ce PNG |
| Fichier | [tpp-hospital-nurse-white-uniform-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/tpp-hospital-nurse-white-uniform-portrait.png) |
| Dimensions natives | 1179×1334, RGBA, 1,423,596 octets |
| SHA-256 | `5907c26ba9b8cbb96506943a1bd8a2885b8a53413bd089a5842b99355f0535ee` |
| WorkIds | `character:R-TPP-nurse` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=zDegziz58-A)

**Constats et limites :**

- Vues rapprochées des feuilles 1 et 2 : coupe du col, boutons, badge et coiffure visibles. Le cadrage reste limité au haut du corps.
- Aucun prénom attribué sans preuve d’identité ; la variante visuelle ne reçoit pas le nom d’une autre infirmière. Ni jambes ni bas ni chaussures inventés.
- Traits fins du visage, contenu du badge et textures reconstruits. Les franges alpha aux contours demeurent à contrôler selon le fond d’affichage.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="mgo3-enforcer-skull-face-preset"></a>

### MGO3 — preset Enforcer à motif crâne

**Périmètre :** Un preset Enforcer complet au visage marqué de blanc et noir, armure olive et rangée diagonale de poches.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:mgo3-enforcer-skull-face-preset` |
| Type / édition | `character` / `mgo3` — MGO3 — preset Enforcer au motif crâne, menu natif |
| Représentation | Corps complet dans une seule pose |
| Fichier | [mgo3-enforcer-skull-face-preset.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/mgo3-enforcer-skull-face-preset.png) |
| Dimensions natives | 1024×1536, RGBA, 1,738,243 octets |
| SHA-256 | `101f021b253337f5aea0f8dcce1adaa63038ea6a7f06353a60af54d22ba10bf4` |
| WorkIds | `character:R-MGO3` |
| Rubriques du guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.youtube.com/watch?v=rC7BUPjjdOc)

**Constats et limites :**

- La vue complète et les gros plans de la première feuille concernent le même avatar. Cheveux courts, visage, col épais, poches diagonales, genouillères et bottes sont observés.
- La nature exacte du motif de visage (peinture ou accessoire), ses contours et les petits objets de ceinture ne sont pas certifiés. Le PNG les interprète comme une peinture faciale.
- Configuration des sangles, mains et raccords de protection reconstruits ; aucune substitution par une tenue universelle Enforcer.
- PNG individuel brut avec alpha, sans agrandissement ni retouche de pixels après génération. Source fixe candidate, pas d’animation ni d’admission au combat.

**Travail restant :** Valider les proportions, les raccords et les détails avec des captures natives plus grandes ; documenter séparément les autres variantes, les vues opposées et les postures utiles avant toute animation ou admission.

<a id="touch-gekko-mission07"></a>

### MGS Touch — Gekko, pose aérienne de la mission 07

**Périmètre :** Une machine ennemie Touch dans une vue de gameplay observée. Ajout partiel au groupe transversal des versions dérivées ; aucun personnage narratif nouveau et aucune fermeture de ce groupe.

| Champ | Valeur |
|---|---|
| Identité | `asset:p67:touch-gekko-mission07` |
| Type / édition | `machine` / `touch` — iOS / iPad — vue de presse de mai 2010 |
| Représentation | Corps complet dans une seule pose |
| Fichier | [touch-gekko-mission07.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p67/touch-gekko-mission07.png) |
| Dimensions natives | 1230×1278, RGBA, 1,043,332 octets |
| SHA-256 | `c42528ccaff5996d3b0a7989b0e61349d2fcb8289cc76b0c50f007b56f6a54d3` |
| WorkIds | `character:R-SIDE-CATALOG`, `machine:touch_gekko_mission07` |
| Rubriques du guide | 02, 11, 16, 17, 18, 25, 26, 27, 29 |
| État | Source candidate dans l’Atlas ; combat, géométrie native et fidélité 1:1 non validés |

**Références :**

- [Référence 1](https://www.4gamer.net/games/080/G008090/20100528080/)
- [Référence 2](https://www.4gamer.net/games/080/G008090/20100528080/TN/002.jpg)

**Constats et limites :**

- Une seule machine et la pose aérienne visible de la mission 07 Touch ; jambe fléchie à droite de l’image et doigts allongés à gauche. Aucun changement des Gekko MGS4 existants.
- La référence est une image de presse de gameplay iPad publiée par 4Gamer avec attribution Konami, distribuée ici en 500 × 375 pixels ; cette taille ne prouve pas la résolution native de l’application.
- Châssis olive, dôme sombre, modules supérieurs, joints noirs et jambes organiques bleu sombre reconnaissables. Les panneaux, tubes, nervures, petits fixateurs et reliefs sont reconstruits ; leur quantité et leur géométrie exacte ne sont pas certifiées.
- Le marqueur circulaire blanc recouvrait une petite zone du châssis ; sa suppression reconstruit le panneau sous-jacent. Le dessous du pied fléchi et certains raccords ne sont pas suffisamment définis dans la petite référence pour une preuve anatomique 1:1.
- Vue unique oblique, sans symétrisation ni vue arrière inventée. Une source d’Atlas candidate ; aucun rig, animation, calque de pièces détachées, collision ou admission au combat.
- PNG généré conservé octet pour octet sans post-traitement. Fond alpha natif, sujet non coupé aux bords, quelques franges semi-transparentes restent à inspecter sur plusieurs couleurs de fond. Ni UHD native ni extraction pixel exacte.

**Travail restant :** Obtenir des vues natives complémentaires et valider les détails et proportions ; conserver les autres membres, variantes, poses et animations comme travaux distincts. Aucune admission au combat déduite de ce PNG.

## Couverture et admission

L’audit couvre les 32 clés d’édition suivies dans le projet, sans annoncer un inventaire exhaustif de toute la franchise. Les 277 lignes P61 constituent une photographie historique ; 97 y étaient non résolues. Elles ne sont ni supprimées ni requalifiées à partir du nombre d’images nouvelles. Le rapprochement après P67 applique à la fois le workId et l’édition : un GRU Delta ne couvre pas le GRU PS2, un modèle Plus ne couvre pas automatiquement Portable Ops et le Gekko Touch ne fournit pas les ennemis Arcade ou Social Ops.

Les six portraits, les familles partiellement illustrées, les douze identités documentaires sans corps établi, les douze blocages historiques de costumes et les refus antérieurs demeurent ouverts dans le suivi. Un résultat de génération ne ferme aucun groupe. Les captures insuffisantes pour Arcade, Social Ops, AC!D Mobile, FOX HUNT ou 3DS sont conservées comme recherche ; aucun corps complet n’est inventé à partir d’un nom ou d’une petite vignette ambiguë.

L’Atlas reçoit les 29 dossiers avec filtre d’édition explicite, catégorie, recherche, référence et réserve. Les 48 objets antérieurs gardent leurs valeurs et leur résultat de normalisation. Le contrôleur et le module de filtres prennent désormais en charge les 32 éditions, tout en conservant les navigations existantes AC!D et Rising. Le shell principal et les styles restent conservés.

Avant une future admission au combat, chaque source demandera une validation de silhouette, de variante, d’échelle, de points d’ancrage et de caméra, puis les états et animations requis, les collisions et les règles adaptées au personnage. Les civils, portraits et T poses ne deviennent pas jouables par simple liaison de fichier. Aucun mouvement, dommage, VFX, son, image narrative ou certification absolue n’est ajouté par cette passe.

## Contrôles et publication

Les contrôles distinguent les preuves visuelles et les preuves techniques : comparaison des références et PNG, vérification de structure/CRC/décompression, SHA-256 et SHA Git, correspondance bible/livraison/Atlas et graphe de chargement. Le rapport [INTEGRATION_QA](../cqc-reprise/pass67/INTEGRATION_QA.md) décrit les résultats et les limites.

Le navigateur n’est pas validé dans cet environnement : Chromium n’est pas opérationnel et son téléchargement officiel avait échoué. La publication vise la PR #25 existante, sans fusion. Le dernier état de déploiement doit être lu sur la PR ; un contrôle statique réussi ne prouve pas une mise en production.
