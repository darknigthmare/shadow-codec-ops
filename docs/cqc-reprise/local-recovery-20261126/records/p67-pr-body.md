## Pourquoi

Plusieurs familles de personnages et variantes d’édition ne disposaient d’aucune source sélectionnée dans la bible CQC. P67 poursuit cet inventaire avec **29 fichiers individuels sur 17 éditions**, des références archivées et des réserves explicites. Le cumul passe de **225 à 254 sources sélectionnées** et de **48 à 77 dossiers Atlas**.

Les 29 ajouts sont des candidats statiques consultables. Leur présence n’admet aucun personnage au combat et ne certifie pas une fidélité absolue 1:1. Les sources, archives et travaux P60–P66 restent conservés.

## P67 — fichiers livrés

| Édition | Ajouts | Contenu |
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


**22 corps de personnages, 6 portraits et 1 machine complète.** Les six portraits concernent Delta GRU, les trois presets officiels MGO3, le garde GZ en poncho et l’infirmière TPP. Ils ne fournissent aucun bas du corps.

- **31 requêtes imagegen**, **30 PNG produits**, **29 sélectionnés**, **1 archive** et **1 refus sans sortie**.
- **31 957 432 octets sélectionnés**, 1 399 176 octets archivés ; PNG RGBA bruts, sans retouche des pixels après génération.
- Scout portrait v1 archivé pour son casque au bord supérieur ; v2 avec **70 px de marge haute** au seuil alpha >128.
- **Sentinel Vest Peace Walker refusé par l’outil** lors d’une tentative unique ; aucun fichier, réessai ou alias.
- Prompts exacts, références, dimensions, SHA-256, SHA Git, édition, workIds et portée conservés pour chaque sortie.

## Résultat dans l’application et la bible

L’Atlas `/cqc/?module=atlas63` reçoit 29 dossiers. Les **48 dossiers précédents sont conservés**, y compris leur résultat de normalisation. Le contrôleur et le module de filtres prennent désormais en charge **32 éditions explicites** ; les alias AC!D et Rising historiques restent compatibles. Le shell et les styles ne changent pas.

La bible ajoute 29 fiches, un registre d’associations, une galerie, l’index des prompts et le delta des périmètres. Le suivi des manquants couvre les 32 éditions. **19 lignes historiques sont enrichies**, dont **18 reçoivent leur premier candidat sélectionné**. Les associations exactes passent de 166 à 184 lignes ; parmi les 97 lignes historiquement non résolues, celles sans candidat passent de 94 à 76. Ce sont des liens de sources, pas des groupes terminés.

Le suivi par édition évite de transférer une source MPO+ à MPO, un GRU Delta au PS2 ou un Gekko Touch aux autres jeux mobiles. Les 277 lignes P61, les 30 rubriques et les 90 exigences du guide sont conservées. Les six portraits, familles ouvertes, identités sans corps établi et blocages historiques restent explicitement suivis.

## Vérification exécutée

- **22 tests Node réussis**, aucun échec ni test ignoré.
- **Gate P67 complet PASS** : structure, CRC, décompression, dimensions, alpha et hashes des 30 PNG ; bijections livraison / bible / Atlas ; recherche par édition et catégorie ; unicité ; archives et refus exclus du runtime.
- **225 sources et 18 archives historiques** vérifiées contre les identités du véritable arbre Git P66 ; cinq registres historiques identiques octet pour octet. **48 anciens PNG sélectionnés et 3 archives présents localement** également rehashés.
- **29 ancres de bible** et références locales vérifiées ; revue visuelle des 29 candidats, indépendante de leur génération pour les lots modernes, V/Online/Mobile et Touch.
- Scanner runtime réel : **3 090 fichiers**, **5 026 références**, **3 574 818 671 octets** ; delta **+32 047 798 octets**.
- **3 058 lignes anciennes** hors catalogue/contrôleur/module conservées, **4 997 références antérieures**, **740 omissions** et **499 routes externes** inchangées.

Ces contrôles établissent l’intégrité et la cohérence de l’intégration statique ; ils ne valent pas validation du combat ou du rendu navigateur.

## Limites visuelles

**0 admission au combat, 0 certification absolue 1:1, aucun PNG natif UHD, aucune clôture de périmètre, aucune nouvelle image narrative.**

Les Genome MGS1 suivent le manuel officiel, pas les textures PS1. Les sprites MSX/NES/MG2 sont des reconstructions en pixel art, pas des extractions pixel exactes. L’otage Shell 1 est fondé sur MGS2 HD. Les modèles PSP sont des previews communautaires ; les poses T ne sont pas des animations de repos. La build exacte de la capture MGS4 n’est pas établie. Les presets Online ne sont pas des uniformes universels.

Les visages, mains, armes, insignes, microtextures et parties occultées restent reconstruits. Le médecin TPP adopte une pose recomposée ; l’infirmière n’est pas nommée sans preuve. Le poncho GZ est partiellement caché dans la source. Le Gekko Touch conserve des réserves sur son pied fléchi et ses petits modules depuis une image distribuée en 500×375.

## Navigateur et déploiement

**Le navigateur P67 est bloqué avant navigation** : binaire Chromium Headless Shell absent, 0 requête de page et aucune capture d’interface validée. Le téléchargement officiel échoué précédemment n’est pas contourné.

Le dernier statut de déploiement P66 était « Deployment rate limited — retry in 24 hours. » le 26 novembre 2026 à 15:45:30 (Paris). Aucun déploiement manuel n’est lancé pour contourner la limite. La PR demeure **ouverte en brouillon, sans fusion** ; son statut de déploiement courant est distinct des contrôles locaux.

## Documents de revue

- [Galerie P67 — 29 fichiers individuels](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/README.md)
- [Continuation et fiches de bible](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/CONTINUATION_P67.md)
- [Livraison et hashes](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/delivery-manifest.json)
- [Associations P67](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/asset-associations-p67.json)
- [Audit des opus](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/AUDIT_OPUS.md)
- [Manquants et limites des 32 éditions](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/MANQUANTS.md)
- [Couverture après P67](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/coverage-after.json)
- [Contrôles et commandes](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/INTEGRATION_QA.md)
- [Vérification locale](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/p67-local-verification.json)
- [Prompts et archives](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/prompt-index.json)
- [Delta des périmètres](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass67/scope-delta.json)
- [Bible centrale](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/README.md)
- [Historique P66 conservé](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/CONTINUATION_P66.md)

## Publication et conservation

Parent P66 : **`5d7c6c5187f3906ad1ead53706e83674750f1c34`**. La branche de base reste `codex/cqc-p51-remaining-costumes-20261113` au commit `67b61f0b536b34921b3d604631409e2b9d384ce4`.

Commit P67 : **`0a92d18aa7bb4068f0be0265bf01d884e3404e95`**. Comparaison exhaustive des arbres : **23 339 → 23 621 entrées**, **282 nouveaux fichiers**, **8 fichiers modifiés**, **aucune suppression**. Les **23 331 autres entrées historiques** sont identiques ; **290 SHA publiés** correspondent aux fichiers locaux figés. Le parent et la pointe réelle de la branche ont été revérifiés.
