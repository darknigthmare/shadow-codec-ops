# Continuation P64 — AC!D, Survive et Revengeance

**26 novembre 2026 — 11 sources individuelles supplémentaires.** Cette passe porte le total sélectionné de **194 à 205** et le catalogue de l’Atlas de **17 à 28 entrées**. Les 194 sources antérieures et les 17 entrées P63 sont conservées. Les nouvelles images sont des candidats visuels fixes, chacun dans son propre PNG transparent, avec une identité, des références et des limites documentées.

| Catégorie ajoutée | Jeu | PNG sélectionnés P64 |
|---|---|---:|
| Personnage | AC!D : faux Flemming, garde Genetics Army, mercenaire de Leone | 3 |
| Costume | Survive : deux apparences de Captain de la démonstration TGS2017 | 2 |
| Machine | Survive : Wormhole Digger | 1 |
| Objet (`prop`) | Revengeance : Repair Nanopaste, Electrolyte Pack, 3D Photo Frame | 3 |
| Corps de projectile | Revengeance : RP Grenade, Jamming Grenade | 2 |
| **Total** | **11 fichiers sélectionnés** | **11** |

**Production P64 : 13 PNG générés, dont 11 retenus et 2 essais uniques archivés ; 3 requêtes refusées sans fichier, soit 16 appels au total.** Les deux archives P64 portent le cumul des essais écartés de 12 à **14**. Une copie de Leone v1 identique au fichier sélectionné a été supprimée après comparaison octet pour octet ; elle ne compte ni comme essai nouveau, ni comme rejet.

## Portée et accès

Les 11 sources alimentent le catalogue de [l’Atlas](../../public/cqc/modules/source-atlas-v063.html), accessible par `/cqc/?module=atlas63`. Le [catalogue](../../public/cqc/data/cqc-p63-source-atlas.json) compte 28 entrées. L’intégration déclarée concerne cette consultation : **aucune admission nouvelle au combat, aucune animation, aucun comportement de projectile et aucune séquence narrative ne sont livrés par ces PNG**.

Les résolutions natives de ces sources sont inférieures à l’UHD : 1024 × 1536, environ 1190 × 1320 ou 1254 × 1254 selon l’actif. Aucun agrandissement n’est présenté comme une génération UHD. Les indicateurs communs restent `combatReady:false`, `combatRuntimeIntegrated:false`, `absolute1to1Certified:false` et `referenceGeometryValidated:false`. Le statut de fidélité reste `pending_external_review` ; la revue indépendante MGR qualifie les cinq objets de candidats avec limites documentées.

Les associations à des groupes historiques expriment une couverture partielle. Les deux gardes ne clôturent pas les variantes Genetics/Leone/SaintLogic ; les deux apparences TGS2017 ne clôturent pas l’avatar modulaire du Captain. Aucun périmètre n’est déclaré épuisé ou clos.

## Associations au guide et aux inventaires

Les identifiants `guideSections` ci-dessous sont repris des deux fiches de transmission, sans renuméroter le guide. Chaque fiche individuelle donne son association complète. Un même `workId` peut recevoir plusieurs fichiers : le nombre de PNG ne constitue donc pas un nombre de groupes clos.

| Source P64 | Type | `workId` | Résolution native |
|---|---|---|---|
| [acid-flemming-decoy](#acid-flemming-decoy) | personnage | `character:R-ACID-DECOY` | 1024 × 1536 |
| [acid-genetics-guard](#acid-genetics-guard) | personnage | `character:R-ACID-GUARDS` | 1191 × 1321 |
| [acid-leone-guard](#acid-leone-guard) | personnage | `character:R-ACID-GUARDS` | 1199 × 1312 |
| [survive-wormhole-digger](#survive-wormhole-digger) | machine | `machine:survive_wormhole_digger` | 1024 × 1536 |
| [survive-captain-tgs2017-female](#survive-captain-tgs2017-female) | costume | `character:R-SURVIVE-AVATAR` | 1024 × 1536 |
| [survive-captain-tgs2017-male](#survive-captain-tgs2017-male) | costume | `character:R-SURVIVE-AVATAR` | 1024 × 1536 |
| [mgr-repair-nanopaste](#mgr-repair-nanopaste) | objet | `prop:mgr_repair_nanopaste` | 1254 × 1254 |
| [mgr-electrolyte-pack](#mgr-electrolyte-pack) | objet | `prop:mgr_electrolyte_pack` | 1254 × 1254 |
| [mgr-3d-photo-frame](#mgr-3d-photo-frame) | objet | `prop:mgr_3d_photo_frame` | 1254 × 1254 |
| [mgr-rp-grenade](#mgr-rp-grenade) | corps de projectile | `projectile:mgr_rp_grenade` | 1254 × 1254 |
| [mgr-jamming-grenade](#mgr-jamming-grenade) | corps de projectile | `projectile:mgr_jamming_grenade` | 1254 × 1254 |

Trois associations historiques reçoivent ces compléments : `character:R-ACID-DECOY`, `character:R-ACID-GUARDS` et `character:R-SURVIVE-AVATAR`. Le Digger et les cinq objets MGR utilisent six périmètres descriptifs supplémentaires. Cette extension ne remplace pas les inventaires historiques et ne transforme pas leur couverture partielle en validation complète.

## Vérification et niveau de preuve

| Contrôle | État documenté | Preuve |
|---|---|---|
| Tests Node | **23/23 réussis : 14 Atlas + 9 P64** | [p64-node-tests.txt](../cqc-reprise/pass64/p64-node-tests.txt) |
| Vérificateur final P64 | **Réussi** : 13 PNG contrôlés, 11 retenus et 2 archives ; Atlas 28 et total 205 | [p64-local-verification.json](../cqc-reprise/pass64/p64-local-verification.json) |
| Manifest runtime | **3 041 fichiers et 4 977 références** ; **3 029 anciennes lignes inchangées ; seul le catalogue change parmi les 3 030 anciens fichiers** ; 4 966 références antérieures, 740 omissions et 499 routes préservées | [p64-local-verification.json](../cqc-reprise/pass64/p64-local-verification.json) ; le manifeste ne constitue pas une admission au combat. |
| P63 repris localement | Vérifications Node, PNG/IDAT et navigateur réalisées | [Vérification locale P63](../cqc-reprise/pass64/p63-local-verification.json), [tests P63](../cqc-reprise/pass64/p63-node-tests.txt), [navigateur P63](../cqc-reprise/pass64/p63-browser-verification.json) |
| Revue visuelle des personnages et de la machine | Comparaisons et limites consignées | [QA des six sources](../cqc-reprise/pass64/research/selected-characters-machines-qa.json) |
| Revue visuelle indépendante MGR | Cinq candidats reconnus, silhouettes entières ; limites géométriques, matériaux et détourage explicites | [visual-qa.json](../cqc-reprise/pass64/research/mgr/visual-qa.json) |
| Navigateur P64 | **En attente du déploiement** ; aucune réussite P64 annoncée à ce point de contrôle | À distinguer de la réussite navigateur P63. |

Les cinq objets MGR ont des empreintes identiques à celles de leur fiche de transmission. Leurs PNG contiennent de 48,5 % à 72,3 % de pixels entièrement transparents ; au seuil alpha 16, les objets disposent d’au moins 87 pixels de marge et aucun ne touche le bord de toile. De faibles résidus alpha 1–15 et quelques traces colorées fines subsistent : transparence réelle ne signifie pas détourage parfait.

Les sources documentaires n’ont pas toutes la même portée. Les gardes AC!D reposent sur une planche de design front/dos ; le faux Flemming associe art du costume et capture de sa scène ; les deux Captain reprennent des apparences de démonstration ; le Digger combine deux vues visibles. Les objets MGR reposent sur **les icônes du guide officiel Piggyback**, page 3 du PDF, pages imprimées 32–33. Ces icônes ne sont pas des exports de modèles natifs et ne certifient ni les faces cachées, ni les matériaux, ni l’échelle physique.

## Fiches des 11 sources

<a id="acid-flemming-decoy"></a>

### AC!D — faux Flemming / leurre de la zone résidentielle

[PNG individuel](../../public/cqc/assets/p64/acid-flemming-decoy.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid-flemming-decoy)

**Fichier retenu :** `public/cqc/assets/p64/acid-flemming-decoy.png` — 1024 × 1536, RGBA, v1. **Association :** `character:R-ACID-DECOY`. **Guide :** `02`, `03`, `05`, `09`, `10`, `16`, `17`, `26`, `29`.

Le leurre de la zone résidentielle porte le long manteau gris brun sombre du design final de Flemming, avec revers larges, pantalon et chaussures noirs. Le sac brun opaque couvre entièrement la tête, sans ouverture ; le personnage, les deux mains et les deux chaussures restent visibles. Il demeure distinct du vrai Flemming/Gary Murray et du costume de laboratoire inutilisé.

La posture défensive CQC est une adaptation. Les plis du manteau, la matière et la géométrie du sac sont reconstruits depuis une petite capture PSP. La QA ne relève pas de frange saturée ou d’objet parasite manifeste, mais de faibles résidus alpha diffus persistent. Le rapprochement avec `completion__flemming_acid` reste documentaire ; il n’assimile pas le leurre au personnage réel.

**Références :** [Source 1](https://creativeuncut.com/gallery-17/mga-william-flemming.html) · [Source 2](https://cucdn.creativeuncut.com/gallery-17/art/mga-william-flemming.jpg) · [Source 3](https://forums.somethingawful.com/showthread.php?pagenumber=5&perpage=40&threadid=3841082&userid=0#post481883519) · [Source 4](https://lpix.org/3044592/MGA_01962.jpg) · [Source 5](https://metalgear.fandom.com/wiki/William_L._Flemming).

**Périmètre déclaré :** Une apparence statique du leurre portant le sac ; ne remplace pas le personnage Flemming réel, ses animations, son arme, ni ses séquences narratives.

<a id="acid-genetics-guard"></a>

### AC!D — garde standard de Genetics Army

[PNG individuel](../../public/cqc/assets/p64/acid-genetics-guard.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid-genetics-guard)

**Fichier retenu :** `public/cqc/assets/p64/acid-genetics-guard.png` — 1191 × 1321, RGBA, v2. **Association :** `character:R-ACID-GUARDS`. **Guide :** `02`, `03`, `05`, `16`, `17`, `18`, `25`, `26`, `29`.

Le garde standard correspond à la paire gauche de la planche : camouflage gris, casque beige avec détail rouge, pochettes et sangles ochre, cagoule noire et protections claires. Un seul humain entier est montré, avec deux poings et deux bottes, de trois-quarts vers la droite. Ce design n’est pas le boss Genetics inutilisé.

La garde CQC est créée à partir des vues neutres front/dos. La v2 supprime la pointe blanche parasite au-dessus du casque et réduit les franges les plus visibles. De fines traces rouges ou jaunes restent toutefois sur certains contours du casque, des bras et des jambes ; le voyant rouge intentionnel est conservé. Les microdétails et volumes restent interprétés. La v1 remplacée est archivée.

**Références :** [Source 1](https://www.creativeuncut.com/gallery-17/mga-soldier-concepts2.html) · [Source 2](https://cucdn.creativeuncut.com/gallery-17/art/mga-soldier-concepts2.jpg) · [Source 3](https://www.tumgik.com/tag/masao%20tsubasa) · [Planche locale](../cqc-reprise/pass64/research/acid-guards-reference.jpg).

**Périmètre déclaré :** Une tenue de garde standard de Genetics Army, issue de la paire gauche de la planche et adaptée en garde CQC. Ne représente pas le boss Genetics inutilisé ni toutes les variantes/armes du groupe historique.

<a id="acid-leone-guard"></a>

### AC!D — mercenaire de l’unité de Leone

[PNG individuel](../../public/cqc/assets/p64/acid-leone-guard.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=acid-leone-guard)

**Fichier retenu :** `public/cqc/assets/p64/acid-leone-guard.png` — 1199 × 1312, RGBA, v1. **Association :** `character:R-ACID-GUARDS`. **Guide :** `02`, `03`, `05`, `16`, `17`, `18`, `25`, `26`, `29`.

Le mercenaire correspond à la paire droite de la planche : tenue désert beige, gilet woodland, bonnet et cagoule noirs, foulard et grands gants verts. Le corps entier, les deux poings et les deux bottes sont visibles. Il s’agit d’un membre standard de l’unité de Leone, distinct de Leone lui-même.

La pose de combat, les plis et la précision des poches sont des adaptations. Des franges rouges ou jaunes restent visibles, surtout à l’épaule gauche de l’image et sur les jambes. La v2 de correction ne montrait pas d’amélioration suffisante et a été écartée ; **la v1 reste sélectionnée**. La copie d’archive redondante de cette v1 a été retirée sans modifier la sélection ou les compteurs.

**Références :** [Source 1](https://www.creativeuncut.com/gallery-17/mga-soldier-concepts2.html) · [Source 2](https://cucdn.creativeuncut.com/gallery-17/art/mga-soldier-concepts2.jpg) · [Source 3](https://www.tumgik.com/tag/masao%20tsubasa) · [Planche locale](../cqc-reprise/pass64/research/acid-guards-reference.jpg).

**Périmètre déclaré :** Une tenue de mercenaire de Leone, issue de la paire droite de la planche et adaptée en garde CQC. Ne clôt pas le groupe Genetics/Leone/SaintLogic ni ses variantes et armes.

<a id="survive-wormhole-digger"></a>

### Survive — Wormhole Digger / machine matérielle

[PNG individuel](../../public/cqc/assets/p64/survive-wormhole-digger.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-wormhole-digger)

**Fichier retenu :** `public/cqc/assets/p64/survive-wormhole-digger.png` — 1024 × 1536, RGBA, v1. **Association :** `machine:survive_wormhole_digger`. **Guide :** `02`, `13`, `14`, `15`, `17`, `18`, `25`, `26`, `29`.

La vue isole la machine matérielle de Salvage : axe vertical, couronne de panneaux inclinés, chambre centrale maillée, disques, double tambour segmenté à fentes obliques et appuis radiaux avec surfaces grillagées. La couronne et les pieds sont inclus dans une seule silhouette complète. Le cercle au sol, l’aura, les étincelles, l’interface et les joueurs des captures n’appartiennent pas au PNG.

La reconstruction réunit les pièces visibles sur deux références. Le nombre exact d’appuis, les éléments arrière et les portions masquées ne sont pas validés. Une estimation d’environ deux hauteurs adultes dépend de la perspective et ne fournit pas une échelle canonique. Faible alpha résiduel diffus ; aucune frange saturée manifeste dans la revue. Aucun comportement de défense, animation ou VFX du Digger n’est implémenté.

**Références :** [Source 1](https://blog.ja.playstation.com/2018/02/21/20180221-mgsurvive/) · [Source 2](https://blog.ja.playstation.com/uploads/sites/7/2018/02/20180221-mgsurvive-20.jpg) · [Source 3](https://eu-support.konami.com/hc/en-gb/articles/9649642757399-Game-Modes) · [Source 4](https://kyupiru.com/metalgearsurvive_top.html) · [Source 5](https://kyupiru.com/20180725214554_1.jpg).

**Périmètre déclaré :** Une vue matérielle complète de la machine de Salvage, détachée de l’aura, du cercle au sol, des étincelles et de l’interface. Ne valide pas sa géométrie arrière, ses animations, ses VFX ou ses interactions. Nouveau périmètre descriptif, hors des 33 lignes historiques auditées P63.

<a id="survive-captain-tgs2017-female"></a>

### Survive — Captain / avatar féminin de démonstration TGS2017

[PNG individuel](../../public/cqc/assets/p64/survive-captain-tgs2017-female.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-captain-tgs2017-female)

**Fichier retenu :** `public/cqc/assets/p64/survive-captain-tgs2017-female.png` — 1024 × 1536, RGBA, v1. **Association :** `character:R-SURVIVE-AVATAR`. **Guide :** `01`, `02`, `03`, `17`, `18`, `25`, `26`, `29`.

Cette apparence féminine reprend la démonstration TGS2017 : cheveux blonds très courts, haut tactique noir, poches de hanche, pantalon woodland vert et protection claire au genou. La pose de salutation, main droite levée, suit la capture publiée ; l’accessoire de la main gauche et les deux bottes sont visibles.

Le visage, les doigts, les poches et la petite arme sont détaillés à partir d’une silhouette de faible résolution. Aucun modèle précis d’arme ni rôle Shooter/Fighter n’est établi. La marge supérieure est courte, mais les cheveux restent entiers ; de faibles résidus alpha subsistent. Cette tenue de démonstration n’établit pas un visage canonique fixe, une vue arrière ou l’ensemble des combinaisons du jeu final. Association à `archive__captain`, périmètre avatar toujours ouvert.

**Références :** [Source 1](https://www.4gamer.net/games/353/G035307/20170923011/) · [Source 2](https://www.4gamer.net/games/353/G035307/20170923011/screenshot.html?num=005) · [Source 3](https://www.4gamer.net/games/353/G035307/20170923011/SS/005.jpg) · [Source 4](https://blog.ja.playstation.com/2018/02/21/20180221-mgsurvive/) · [Source 5](https://blog.ja.playstation.com/tachyon/sites/7/2018/02/20180221-mgsurvive-19.jpg).

**Périmètre déclaré :** Apparence féminine de la démonstration TGS2017 : cheveux blonds courts, haut tactique noir et pantalon woodland vert. Une vue de la pose publiée ; aucun visage canonique fixe, aucune attribution Shooter/Fighter, aucun dos validé. Le périmètre modulaire du Captain du jeu final reste ouvert.

<a id="survive-captain-tgs2017-male"></a>

### Survive — Captain / avatar masculin de démonstration TGS2017

[PNG individuel](../../public/cqc/assets/p64/survive-captain-tgs2017-male.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=survive-captain-tgs2017-male)

**Fichier retenu :** `public/cqc/assets/p64/survive-captain-tgs2017-male.png` — 1024 × 1536, RGBA, v1. **Association :** `character:R-SURVIVE-AVATAR`. **Guide :** `01`, `02`, `03`, `17`, `18`, `25`, `26`, `29`.

Cette apparence masculine reprend la démonstration TGS2017 : cheveux blonds courts, chemise à manches courtes gris kaki, gilet et col olive, pantalon camouflé gris et protections noires. La pose publiée est globalement conservée, avec fusil porté bas, sangle, deux mains et deux bottes visibles.

Les traits du visage, les petites pièces de l’équipement et le fusil sont reconstruits depuis la référence. Le modèle précis de l’arme, le dos et un rôle Shooter/Fighter ne sont pas établis. Les marges verticales sont courtes, avec extrémités complètes ; faibles résidus alpha diffus, sans frange saturée manifeste dans la revue. Association à `archive__captain` uniquement pour cette apparence TGS2017 ; aucune clôture du Captain modulaire.

**Références :** [Source 1](https://www.4gamer.net/games/353/G035307/20170923011/) · [Source 2](https://www.4gamer.net/games/353/G035307/20170923011/screenshot.html?num=005) · [Source 3](https://www.4gamer.net/games/353/G035307/20170923011/SS/005.jpg) · [Source 4](https://blog.ja.playstation.com/2018/02/21/20180221-mgsurvive/) · [Source 5](https://blog.ja.playstation.com/tachyon/sites/7/2018/02/20180221-mgsurvive-19.jpg).

**Périmètre déclaré :** Apparence masculine de la démonstration TGS2017 : cheveux blonds courts, gilet olive, manches courtes gris kaki et pantalon camouflé gris. Une vue de la pose publiée ; aucun visage canonique fixe, aucune attribution Shooter/Fighter, aucun dos validé. Le périmètre modulaire du Captain du jeu final reste ouvert.

<a id="mgr-repair-nanopaste"></a>

### Revengeance — Repair Nanopaste

[PNG individuel](../../public/cqc/assets/p64/mgr-repair-nanopaste.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-repair-nanopaste)

**Fichier retenu :** `public/cqc/assets/p64/mgr-repair-nanopaste.png` — 1254 × 1254, RGBA, v1. **Association :** `prop:mgr_repair_nanopaste`. **Guide :** `02`, `07`, `16`, `17`, `18`, `19`, `25`, `26`, `29`.

L’objet reprend la silhouette basse et circulaire de l’icône, son corps gris à nervures radiales, les anneaux superposés et le disque supérieur jaune portant une grande croix rouge. L’objet est entier et isolé, sans bord de page ni autre élément copié du guide.

Le métal sombre et réfléchissant, les rayures, les chanfreins, l’épaisseur des nervures et la profondeur des anneaux sont interprétés à partir de l’icône plate. Quelques traces cyan ou bleues très fines sont visibles sur le contour à taille native. Verdict indépendant : candidat reconnaissable avec limites documentées ; ni modèle natif complet ni logique de récupération validés.

**Références :** [Source 1](https://www.piggyback.com/en/wp-content/uploads/sites/7/2020/04/MGR_U_SamplePages.pdf) · [Icône locale](../cqc-reprise/pass64/research/mgr/mgr-repair-nanopaste-reference.png).

**Périmètre déclaré :** Objet physique isolé pour Repair Nanopaste de Rising ; extension de production distincte des 277 lignes historiques. Aucun effet ni binding de combat ajouté.

<a id="mgr-electrolyte-pack"></a>

### Revengeance — Electrolyte Pack

[PNG individuel](../../public/cqc/assets/p64/mgr-electrolyte-pack.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-electrolyte-pack)

**Fichier retenu :** `public/cqc/assets/p64/mgr-electrolyte-pack.png` — 1254 × 1254, RGBA, v1. **Association :** `prop:mgr_electrolyte_pack`. **Guide :** `02`, `07`, `16`, `17`, `18`, `19`, `25`, `26`, `29`.

Le boîtier reprend la même famille de formes que Repair Nanopaste : corps circulaire gris nervuré, anneaux et face avant anguleuse. Le disque cyan et le pictogramme de batterie sombre, bordé de blanc avec son terminal latéral, maintiennent l’identité distincte de l’Electrolyte Pack.

La surface métallique usée, les volumes et les chanfreins sont reconstruits. Le cyan est plus lumineux et texturé que dans l’icône ; quelques traces fines de détourage subsistent. La comparaison établit les signes visibles de l’objet, pas sa géométrie arrière, son échelle ou son fonctionnement. Verdict indépendant : candidat avec limites documentées.

**Références :** [Source 1](https://www.piggyback.com/en/wp-content/uploads/sites/7/2020/04/MGR_U_SamplePages.pdf) · [Icône locale](../cqc-reprise/pass64/research/mgr/mgr-electrolyte-pack-reference.png).

**Périmètre déclaré :** Objet physique isolé pour Electrolyte Pack de Rising ; extension de production distincte des 277 lignes historiques. Aucun effet ni binding de combat ajouté.

<a id="mgr-3d-photo-frame"></a>

### Revengeance — 3D Photo Frame

[PNG individuel](../../public/cqc/assets/p64/mgr-3d-photo-frame.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-3d-photo-frame)

**Fichier retenu :** `public/cqc/assets/p64/mgr-3d-photo-frame.png` — 1254 × 1254, RGBA, v1. **Association :** `prop:mgr_3d_photo_frame`. **Guide :** `02`, `07`, `16`, `17`, `18`, `19`, `25`, `26`, `29`.

Le cadre frontal conserve le contour à décrochements, les encoches centrales haute et basse, l’écran orange, le contrôle circulaire inférieur et les rainures latérales. Un seul objet autonome est représenté ; ses extrémités sont entièrement visibles.

Le bord lumineux de l’écran orange, les reflets, la profondeur des rainures et l’épaisseur du boîtier sont des interprétations. Quelques traces bleues ou cyan ponctuelles restent sur les arêtes extérieures. Aucun hologramme n’est produit et aucune diversion n’est implémentée. Verdict indépendant : candidat lisible, sans certification des faces cachées ou d’un modèle natif.

**Références :** [Source 1](https://www.piggyback.com/en/wp-content/uploads/sites/7/2020/04/MGR_U_SamplePages.pdf) · [Icône locale](../cqc-reprise/pass64/research/mgr/mgr-photo-frame-reference.png).

**Périmètre déclaré :** Objet physique isolé pour 3D Photo Frame de Rising ; extension de production distincte des 277 lignes historiques. Aucun effet ni binding de combat ajouté.

<a id="mgr-rp-grenade"></a>

### Revengeance — RP Grenade

[PNG individuel](../../public/cqc/assets/p64/mgr-rp-grenade.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-rp-grenade)

**Fichier retenu :** `public/cqc/assets/p64/mgr-rp-grenade.png` — 1254 × 1254, RGBA, v1. **Association :** `projectile:mgr_rp_grenade`. **Guide :** `02`, `07`, `16`, `17`, `18`, `19`, `25`, `26`, `29`.

Le corps gris élancé, les deux bandes basses, la jonction supérieure, l’anneau ovale incliné vers l’avant et l’élément latéral droit reprennent l’icône du guide. L’objet entier est isolé, sans inscription, effet de fumée ou accessoire supplémentaire.

La silhouette paraît légèrement plus allongée que l’icône. La profondeur, l’épaisseur des éléments supérieurs et la texture métallique usée sont reconstruites ; de très fines traces colorées restent par endroits. Verdict indépendant : candidat reconnaissable, avec proportions exactes et faces cachées non validées. La présence du PNG ne réalise ni fumée, ni trajectoire, ni collision de projectile.

**Références :** [Source 1](https://www.piggyback.com/en/wp-content/uploads/sites/7/2020/04/MGR_U_SamplePages.pdf) · [Icône locale](../cqc-reprise/pass64/research/mgr/mgr-rp-grenade-reference.png).

**Périmètre déclaré :** Objet physique isolé pour RP Grenade de Rising ; extension de production distincte des 277 lignes historiques. Aucun effet ni binding de combat ajouté.

<a id="mgr-jamming-grenade"></a>

### Revengeance — Jamming Grenade

[PNG individuel](../../public/cqc/assets/p64/mgr-jamming-grenade.png) · [Fiche Atlas](../../public/cqc/modules/source-atlas-v063.html?asset=mgr-jamming-grenade)

**Fichier retenu :** `public/cqc/assets/p64/mgr-jamming-grenade.png` — 1254 × 1254, RGBA, v1. **Association :** `projectile:mgr_jamming_grenade`. **Guide :** `02`, `07`, `16`, `17`, `18`, `19`, `25`, `26`, `29`.

La silhouette haute à côtés relativement droits et coins inférieurs arrondis conserve son grand motif hexagonal sombre, son col étroit, l’anneau ovale supérieur et l’élément latéral droit. Le motif distingue clairement ce corps de celui de la RP Grenade.

Le réseau hexagonal est plus lourd graphiquement que sur la petite icône. La profondeur du boîtier, les éléments supérieurs et le métal rayé sont interprétés ; de faibles traces colorées subsistent sur certaines arêtes. Verdict indépendant : candidat avec limites documentées. Les faces masquées, la continuité exacte du motif et un champ de brouillage ne sont pas validés ou implémentés.

**Références :** [Source 1](https://www.piggyback.com/en/wp-content/uploads/sites/7/2020/04/MGR_U_SamplePages.pdf) · [Icône locale](../cqc-reprise/pass64/research/mgr/mgr-jamming-grenade-reference.png).

**Périmètre déclaré :** Objet physique isolé pour Jamming Grenade de Rising ; extension de production distincte des 277 lignes historiques. Aucun effet ni binding de combat ajouté.

## Essais écartés et refus conservés

| Identifiant | Sort de la tentative | Compteur |
|---|---|---|
| `acid-genetics-guard-v1` | [PNG archivé](../cqc-reprise/pass64/rejected/acid-genetics-guard-v1.png) : pointe blanche au casque et franges plus marquées ; v2 sélectionnée. | 1 archive P64 unique |
| `acid-leone-guard-v2` | [PNG archivé](../cqc-reprise/pass64/rejected/acid-leone-guard-v2.png) : correction sans amélioration visible ; v1 sélectionnée. | 1 archive P64 unique |
| `mgr-fragmentation-grenade` | Requête refusée par le service d’image ; aucun fichier produit, aucun second essai. | 1 refus, 0 PNG |
| `mgr-em-grenade` | Requête refusée par le service d’image ; aucun fichier produit, aucun second essai. | 1 refus, 0 PNG |
| `mgr-rocket-launcher` | Requête refusée par le service d’image ; aucun fichier produit, aucun second essai. | 1 refus, 0 PNG |

Les trois refus sont enregistrés avec leurs identifiants de requête dans la [fiche MGR](../cqc-reprise/pass64/research/mgr/five-assets-handoff.json). Aucun alias, nouvelle formulation ou rendu alternatif n’a été utilisé pour obtenir ces sorties refusées. Les icônes de référence restent des pièces documentaires ; elles ne sont pas comptées comme des PNG générés ou sélectionnés.

## AC!D 2 et secteurs restant documentaires

Aucun décor AC!D 2 nouveau n’est généré en P64. La [fiche de huit secteurs](../cqc-reprise/pass64/research/acid-stage-candidates.json) conserve les identités, contraintes textuelles et repères temporels de FAR B3F/B4F/B5F, Control Section, Communications Tower, Research Block, Terminal et Residential Area. Les chapitres de vidéo établissent où chercher ; ils ne prouvent pas les palettes, volumes ou détails de scènes dont les pixels n’ont pas été inspectés.

Harbor Area, Cargo Train et Security Section / Monitor Room sont déjà présents en P63 et n’ont pas été regénérés. Les autres lieux, apparences, armes, effets, machines et variantes des quatre jeux restent soumis à leurs preuves propres. Cette passe ne constitue pas un inventaire exhaustif du canon.

## Dossier de provenance

- [Six personnages, costumes et machine : fiches de transmission](../cqc-reprise/pass64/research/six-assets-handoff.json).
- [Cinq objets MGR et trois refus : fiches de transmission](../cqc-reprise/pass64/research/mgr/five-assets-handoff.json).
- [Gardes AC!D : prompts, références, versions et mesures](../cqc-reprise/pass64/research/acid-guards.json).
- [Corrections ciblées des gardes : prompts et verdicts](../cqc-reprise/pass64/research/acid-guards-edits.json).
- [Revue visuelle indépendante des cinq MGR](../cqc-reprise/pass64/research/mgr/visual-qa.json).
- [État documentaire des huit secteurs AC!D/AC!D 2](../cqc-reprise/pass64/research/acid-stage-candidates.json).

L’admission ultérieure au combat demande toujours des références suffisantes, des découpes et animations appropriées, une échelle validée, les collisions ou interactions nécessaires et leurs contrôles dans le jeu. Les sources P64 apportent les fichiers fixes décrits ici ; les périmètres restent ouverts.
