# Continuation P69 — AC!D 2, Survive et Revengeance

**8 nouvelles sources sélectionnées, 0 essais archivés et 1 refus conservés.** Cumul : **267 sources sélectionnées**, **90 dossiers Atlas**, **20 essais archivés**.

[Galerie](../cqc-reprise/pass69/README.md) · [Associations](asset-associations-p69.json) · [Manifeste](../cqc-reprise/pass69/delivery-manifest.json) · [Manquants](../cqc-reprise/pass69/MANQUANTS.md) · [Contrôles](../cqc-reprise/pass69/INTEGRATION_QA.md)

Chaque fiche précise la nature de sa référence, la partie visible et les réserves de reconstruction. Les 82 dossiers existants et les sept registres antérieurs sont conservés.

**Les états ci-dessous décrivent le travail futur. Une image fixe est livrée par sujet ; les cycles, effets et comportements ne sont pas implémentés par cette passe.**

<a id="acid2-flamethrower-soldier"></a>

## AC!D 2 — soldat lance-flammes, vue de face oblique

Un soldat lance-flammes AC!D 2, corps complet en vue frontale oblique, avec équipement porté. Une seule variante et une seule pose.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:acid2-flamethrower-soldier` |
| Édition et couverture | PSP — vues du jeu publiées par un tiers — `full_body` |
| Fichier | [acid2-flamethrower-soldier.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/acid2-flamethrower-soldier.png) |
| Sortie | 1312 × 1199, RGBA, 700,911 octets |
| SHA-256 | `d5bdc7f85fd0e8727f4b18238aee9a1a3ff9a6a268ea3263a037a7fc9cb0f659` |
| WorkIds | `character:R-ACID-GUARDS` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://www.imfdb.org/wiki/Metal_Gear_Ac%21d_2)
- [Référence 2](https://www.imfdb.org/images/f/fd/MgAc%21d2enemyflamethrower.jpg)

Copies utilisées : [acid2-native-flamethrower-soldier.jpg](../cqc-reprise/pass69/research/acid/references/acid2-native-flamethrower-soldier.jpg).

- La capture native de référence mesure seulement 360×461 pixels et comporte deux vues du même type ennemi ; seule la vue frontale oblique est produite.
- Silhouette entière, tenue rouge/noire, masque pâle, deux bonbonnes, tuyau et lance repris. Les petits raccords, le harnais, le masque et la forme fine de la buse sont reconstruits ; aucune dimension métrique ni vue cachée n’est validée.
- Pose et cadrage obliques conservés dans un rendu polygonal propre ; ce n’est pas un sprite latéral prêt au combat.
- Un seul soldat, pieds et équipement complets ; aucune flamme, attaque ou séquence animée.
- PNG RGBA brut ; alpha réel 0–255, corps majoritairement alpha 253, faible frange alpha 1–8 documentée. Aucune retouche de pixels ou mise à l’échelle.

### États et interactions à produire

Variante ennemie AC!D 2 en combinaison rouge, équipée du dispositif dorsal visible. Cette source montre une pose entière oblique ; elle ne fournit ni cycle de déplacement ni attaque. La petite capture native permet de qualifier la silhouette générale, mais pas chaque attache et détail du costume.

| État prévu | Travail et vérification |
|---|---|
| Pose de référence et attente | Fixer l’appui des deux bottes et l’axe du buste sans transformer la perspective plongeante en profil latéral. Une animation d’attente devra conserver le masque, les bonbonnes et la continuité du tuyau ; les déplacements secondaires ne sont pas fournis par ce PNG. |
| Patrouille et orientation | Rechercher une séquence du même ennemi pour départ, marche, arrêt et pivot. Distinguer les positions des mains, du dispositif tenu et de la charge dorsale ; un simple miroir peut inverser les liaisons et ne constitue pas une nouvelle vue validée. |
| Action et récupération à documenter | Isoler préparation, émission éventuelle de l’effet visuel et retour à la garde depuis une séquence native. Les effets doivent être séparés du personnage, avec origine et durée vérifiées ; le PNG ne fixe ni portée, ni dégâts, ni consommation. |
| Réaction et sortie de scène | Prévoir réaction courte, interruption, déséquilibre et état de sortie compatibles avec la silhouette équipée. Les pièces dorsales et le tuyau doivent rester cohérents avec le corps ; aucun détachement ni comportement explosif n’est déduit de leur apparence. |

Interactions à valider :

- Établir des volumes distincts pour le corps et l’encombrement visible de l’équipement ; les zones de contact se définissent dans le moteur.
- Vérifier garde, projection, passage derrière une cible et changements d’orientation sans traversée du tuyau ou du dispositif dorsal.
- Séparer effets, son et réactions de cible de la source du personnage afin de pouvoir interrompre l’action proprement.
- Conserver la famille AC!D 2 ; cette tenue ne couvre aucune variante AC!D 1 ni une animation héritée d’un autre opus.

Éléments manquants : Vues latérales et arrière natives ; Cycle de patrouille ; Pivots et actions sourcés ; Effets séparés ; Réactions et état de sortie.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="acid2-shield-guard"></a>

## AC!D 2 — garde au bouclier et béret rouge

Un garde SaintLogic AC!D 2 équipé du bouclier et du pistolet, corps complet en posture oblique issue du jeu.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:acid2-shield-guard` |
| Édition et couverture | PSP — vues du jeu publiées par un tiers — `full_body` |
| Fichier | [acid2-shield-guard.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/acid2-shield-guard.png) |
| Sortie | 1229 × 1280, RGBA, 1,179,145 octets |
| SHA-256 | `fbfb047ebcc5bcd0df5bae920f3887887b9cb81a85704a75440ea3bc998d429b` |
| WorkIds | `character:R-ACID-GUARDS` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://www.imfdb.org/wiki/Metal_Gear_Ac%21d_2)
- [Référence 2](https://www.imfdb.org/images/7/75/MetalGearAc%21d2USPShield.jpg)
- [Référence 3](https://www.creativeuncut.com/gallery-11/mga2-soldier-concept2.html)
- [Référence 4](https://www.creativeuncut.com/gallery-11/art/mga2-soldier-concept2.jpg)

Copies utilisées : [acid2-native-shield-guard.jpg](../cqc-reprise/pass69/research/acid/references/acid2-native-shield-guard.jpg), [mga2-soldier-concept2.jpg](../cqc-reprise/pass69/research/acid/references/mga2-soldier-concept2.jpg).

- Le garde porteur du bouclier dans la capture native est le sujet principal. CONCEPT2 précise l’uniforme ; la variante CONCEPT2 sans équipement existait déjà en P50 et n’est pas remplacée.
- Pose accroupie/oblique, béret rouge, gilet brun-orangé, uniforme anthracite, pistolet et bouclier distincts du garde historique sans bouclier.
- Le flash de la capture masquait une partie du bouclier. Cette surface, le visage, certaines poches et l’arme sont reconstruits ; largeur/épaisseur du bouclier, poignée arrière et exactitude mécanique non certifiées.
- Une seule pose fixe sans tir, flash, HUD ni autre personnage. Le pied inférieur possède une marge très faible ; prévoir un cadrage moteur distinct avant admission.
- PNG RGBA brut ; alpha réel 0–255, corps majoritairement alpha 253, faible frange alpha 1–8 documentée. Aucune retouche de pixels ou mise à l’échelle.

### États et interactions à produire

Variante de garde AC!D 2 au béret rouge, équipée d’un bouclier et d’un objet tenu. La nouvelle source représente cet équipement dans une pose native oblique. Le bouclier, le visage et le bras partiellement couverts par les éléments d’interface restent des reconstructions à comparer à d’autres vues.

| État prévu | Travail et vérification |
|---|---|
| Garde équipée | Définir un ancrage au sol et conserver l’angle du bouclier par rapport au torse. L’objet protecteur doit rester une couche ou un élément identifié séparément pour les futures animations ; sa taille affichée ne suffit pas à fixer une zone de protection. |
| Avancée, recul et pivot | Documenter des pas compatibles avec l’équipement, sans faire glisser la botte avancée. Prévoir les changements de direction en conservant la latéralité des mains ; les faces interne et arrière du bouclier demandent d’autres références. |
| Protection et réaction | Si un comportement de garde est retenu dans CQC, produire anticipation, contact, recul et reprise. La possibilité de contourner, interrompre ou briser cette garde est une décision à valider ; aucune invulnérabilité ou résistance chiffrée n’est attestée ici. |
| Action puis retour à la garde | Qualifier le mouvement du bras et le dégagement du bouclier à partir d’une séquence du jeu. Les éclats, effets et projectiles éventuels doivent être des assets distincts ; le flash de la capture n’est pas intégré au PNG de référence. |

Interactions à valider :

- Tester l’occlusion du bras et du visage derrière le bouclier dans les deux orientations, avec caméra CQC définitive.
- Définir séparément volumes corporels, protection et éventuels contacts du bouclier ; éviter une collision unique sur toute l’image.
- Valider interruption, chute et fin de manche pour éviter un bouclier orphelin ou une protection persistante.
- Conserver l’association au loadout observé, sans compter cette image comme un nouveau personnage nommé ou une famille entièrement terminée.

Éléments manquants : Face interne du bouclier ; Vues opposées sourcées ; Déplacement équipé ; Réactions à la garde ; Actions et effets séparés.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="acid2-high-tech-soldier"></a>

## AC!D 2 — soldat Hi-Tech, uniforme complet

Soldat Hi-Tech AC!D 2, corps complet de CONCEPT3 en pose frontale, identité visuelle supérieure corroborée par une capture native.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:acid2-high-tech-soldier` |
| Édition et couverture | PSP — concept officiel CONCEPT3 ; partie supérieure corroborée en jeu — `full_body` |
| Fichier | [acid2-high-tech-soldier.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/acid2-high-tech-soldier.png) |
| Sortie | 887 × 1774, RGBA, 1,323,895 octets |
| SHA-256 | `50978a94fd98fae0df9b39c1430d057f102ed1ab33dd83ec3a9baf8049e39336` |
| WorkIds | `character:R-ACID-GUARDS` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://www.creativeuncut.com/gallery-11/mga2-soldier-concept3.html)
- [Référence 2](https://www.creativeuncut.com/gallery-11/art/mga2-soldier-concept3.jpg)
- [Référence 3](https://www.imfdb.org/wiki/Metal_Gear_Ac%21d_2)
- [Référence 4](https://www.imfdb.org/images/0/03/MetalGearAc%21d2P90Guard.jpg)

Copies utilisées : [mga2-soldier-concept3.jpg](../cqc-reprise/pass69/research/acid/references/mga2-soldier-concept3.jpg), [acid2-native-high-tech-p90.jpg](../cqc-reprise/pass69/research/acid/references/acid2-native-high-tech-p90.jpg).

- Source principale : planche officielle Hi-Tech CONCEPT3 hébergée par Creative Uncut ; pose frontale avec les mains baissées.
- La capture du soldat P90 corrobore casque clair, visière rouge, col vert, armure et poches ; elle coupe le bas des jambes. Les jambes du PNG viennent du concept complet, pas d’une capture PSP intégrale.
- Silhouette, couleurs et grandes pièces du concept conservées. Motif exact du camouflage, coutures, visage sous la visière et épaisseurs reconstruits ; équivalence complète avec le modèle commercial non certifiée.
- Aucune arme tenue n’a été ajoutée. Ce PNG ne livre ni la pose P90, ni une animation, ni une nouvelle admission au combat.
- PNG RGBA brut ; alpha réel 0–255, corps majoritairement alpha 253, faible frange alpha 1–8 documentée. Aucune retouche de pixels ou mise à l’échelle.

### États et interactions à produire

Soldat Hi-Tech AC!D 2 en pose frontale issue du dessin CONCEPT3. La capture native P90 corrobore casque, visière, col et palette du haut du corps ; les jambes de cette source viennent du concept complet. Cette distinction doit rester visible dans l’Atlas et dans toute future qualification.

| État prévu | Travail et vérification |
|---|---|
| Pose conceptuelle | Conserver casque clair, visière rouge, col montant, protections et poches propres à ce dessin. Cette pose neutre sert à comparer les proportions et la palette ; elle ne constitue pas une frame extraite du modèle PSP. |
| Qualification du modèle natif | Rassembler des captures en pied de face, de dos et de profil pour mesurer les différences entre concept et modèle final. Documenter les écarts avant de transformer cette source en sprite de combat ; les détails du dessin ne doivent pas devenir automatiquement des propriétés du modèle. |
| Locomotion après qualification | Produire les appuis et pivots à partir d’une silhouette native approuvée, en contrôlant les protections d’épaules et le col. La position neutre des bras ne documente aucune garde, course ou manipulation d’équipement. |
| Actions et réactions à produire | Choisir les équipements réellement attestés pour cette variante, puis produire les poses correspondantes et leur récupération. Les réactions aux contacts, interruptions et sortie de scène doivent être compatibles avec les volumes validés ; aucun kit d’action n’est livré ici. |

Interactions à valider :

- Maintenir la traçabilité concept versus capture native pour chaque futur élément réutilisé.
- Ne pas attribuer bonus de défense, résistance, capteur ou capacité spéciale à partir d’une plaque ou d’un voyant dessiné.
- Valider amplitudes des bras et rotations de tête avec les protections avant d’utiliser les animations d’un garde standard.
- Garder séparés la pose neutre, le port d’équipement natif et les variantes de personnel SaintLogic encore non qualifiées.

Éléments manquants : Captures natives en pied ; Comparaison concept/modèle ; Dos et profils ; Déplacements du modèle qualifié ; Équipements et actions séparés.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="survive-air-shock-cannon"></a>

## Survive — Air Shock Cannon, déployé inactif

Un canon à choc d’air déployé, vue trois quarts frontale, statique ; nouveau candidat pour le périmètre auparavant sans vue dégagée.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:survive-air-shock-cannon` |
| Édition et couverture | Metal Gear Survive — équipement de défense, plateforme non certifiée — `full_object` |
| Fichier | [survive-air-shock-cannon.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/survive-air-shock-cannon.png) |
| Sortie | 1086 × 1448, RGBA, 824,547 octets |
| SHA-256 | `27a2d4aa98da3bb28e675281e4f3eb2df004aaae1f5be51e8c2e576421a02a17` |
| WorkIds | `prop:survive_air_shock_cannon` |
| Guide | 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://w.atwiki.jp/mgsurvive/pages/111.html)
- [Référence 2](https://img.atwiki.jp/mgsurvive/attach/111/100/220401_10.jpg)
- [Référence 3](https://img.atwiki.jp/mgsurvive/attach/111/98/220401_12.jpg)

Copies utilisées : [native-air-side-220401_10.jpg](../cqc-reprise/pass69/research/survive/references/native-air-side-220401_10.jpg), [native-air-support-220401_12.jpg](../cqc-reprise/pass69/research/survive/references/native-air-support-220401_12.jpg).

- La nouvelle capture 220401_10 dégage la face ronde olive que P68 ne pouvait pas lire sous le HUD de 220401_12. Les deux vues native-gameplay ont été inspectées avant génération.
- Disque court et large, boîtier sombre, collerette blanche, monture, câble latéral, antenne et quatre appuis bas sont repris ; aucun long tube de canon ou effet lumineux ajouté.
- Le rendu conserve la grande silhouette. Les vis, grilles, arêtes et textures sont interpolées à partir de petits détails, sans mesure ni validation géométrique absolue. Le boîtier opposé et le dos ne sont pas documentés.
- Un seul objet, entier, sans avatar, clôture ou HUD. Quatre appuis détachés et pointes présentes. Aucun cycle actif, déplacement d’air, impact, collision ou comportement de défense livré.
- Les boutons PlayStation des captures n’établissent pas à eux seuls la plateforme d’exécution. L’édition est donc enregistrée avec plateforme non certifiée.
- Diagnostic demandé par le root : les taches blanches d’aperçu aux pixels (430,386) et (360,440) valent chacune RGBA(255,255,255,1), pas alpha0. Dans les rectangles [420,370,440,410] et [340,430,390,447], tous les pixels RGB clairs ont un alpha de1 ou2, aucun supérieur à16. Faible frange conservée, aucune retouche ; détails dans alpha-preview-diagnostic.json.

### États et interactions à produire

Gadget Survive déployé, documenté par deux captures natives complémentaires. La nouvelle vue dégage davantage le disque frontal et la seconde montre les appuis ; quelques zones restent masquées par l’avatar ou le HUD. La source est une reconstruction de la vue visible, avec géométrie et microdétails à confirmer.

| État prévu | Travail et vérification |
|---|---|
| Placement et ancrage | Fixer une position au sol compatible avec tous les appuis et conserver la hauteur relative du mât et du bloc supérieur. Produire l’installation comme séquence séparée si elle est nécessaire ; le PNG déployé ne documente pas un dépliage. |
| Attente déployée | Conserver l’orientation du disque et les relations entre bloc, monture et pied. Les variations de voyant ou de mouvement demandent une séquence native ; aucune rotation automatique n’est déduite de la présence d’un support. |
| Déclenchement à qualifier | Observer une activation native pour séparer préparation, impulsion visuelle et récupération. L’effet doit être un asset distinct de l’objet ; sa portée, les cibles compatibles et la direction de réaction restent des paramètres à établir dans le jeu. |
| Interruption et retrait | Prévoir retrait, désactivation et restauration après pause, fin de manche ou destruction si celle-ci est retenue. Les pieds, l’objet et l’éventuel effet doivent quitter la scène de façon cohérente, sans volume de collision résiduel. |

Interactions à valider :

- Valider implantation sur sol plat, bord de plateforme et proximité d’autres objets avant d’autoriser le placement.
- Distinguer collision de l’appareil, zone d’activation et effet de déplacement éventuel ; une seule silhouette PNG ne suffit pas à les définir.
- Obtenir les vues arrière et les zones cachées pour confirmer le nombre, la longueur et la position des appuis.
- Conserver une association propre à l’Air Shock Cannon ; le Balloon Trap, le Mortar déployé et le Mortar ennemi restent des sources distinctes.

Éléments manquants : Vue arrière dégagée ; Vérification des supports et proportions ; Installation si attestée ; Activation et récupération natives ; Effet et son séparés.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="survive-sledgehammer-gold"></a>

## Survive — Sledgehammer [Gold], Survival Pack

Masse dorée complète, une vue trois quarts diagonale du modèle d’inventaire ; accessoire séparé de tout avatar.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:survive-sledgehammer-gold` |
| Édition et couverture | Metal Gear Survive — Survival Pack / variante Gold — `full_object` |
| Fichier | [survive-sledgehammer-gold.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/survive-sledgehammer-gold.png) |
| Sortie | 1555 × 1012, RGBA, 590,712 octets |
| SHA-256 | `15822b3e2bf7601f9f8b5928d03015f3d37e52b493978b9e4e047b3e328e29d4` |
| WorkIds | `prop:survive_sledgehammer_gold` |
| Guide | 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://w.atwiki.jp/mgsurvive/pages/25.html)
- [Référence 2](https://img.atwiki.jp/mgsurvive/attach/25/71/20180815182912_1.jpg)
- [Référence 3](https://www.konami.com/games/us/en/topics/917/)
- [Référence 4](https://www.konami.com/kde_cms/na_publish/uploads/mgv_preorder_beauty_shot.png)

Copies utilisées : [native-heavy-weapon-20180815182912_1.jpg](../cqc-reprise/pass69/research/survive/references/native-heavy-weapon-20180815182912_1.jpg), [official-mgv-preorder-beauty-shot.png](../cqc-reprise/pass69/research/survive/references/official-mgv-preorder-beauty-shot.png).

- Capture native de l’exemple Heavy Weapons sur atwiki, corroborée par la vignette de masse nommée dans la planche officielle Survival Pack et par l’annonce KONAMI des quatre armes dorées.
- Attribution Gold fondée sur la comparaison visuelle et la source officielle ; la page communautaire ne légende pas individuellement cette image. Revue externe du modèle exact encore requise.
- Tête massive à encoches, faces d’impact polygonales sombres, plaque latérale dorée, cou évasé et long manche enveloppé conservés ; tête et extrémité du manche entièrement cadrées.
- Détails de surface et micro-rayures réinterprétés. La vue opposée, l’attache à la main et les collisions n’ont pas été établies. Aucun swing, coup chargé ou effet d’impact fourni.

### États et interactions à produire

Masse Survive isolée dans la variante dorée rapprochée du Survival Pack. La capture de classe Heavy Weapons donne une vue entière et la planche officielle confirme une masse Gold comparable. Le nom exact du modèle de la capture reste à confirmer ; la source conserve cette réserve et ses détails de surface interpolés.

| État prévu | Travail et vérification |
|---|---|
| Objet de référence | Conserver la silhouette de la tête à encoches, le cou et la longueur du manche dans leur orientation oblique. Définir un cadrage documentaire puis une échelle de jeu séparée ; les dimensions du fichier et ses marges ne donnent aucune mesure physique. |
| Prise en main à documenter | Obtenir une capture native avec porteur pour déterminer prise, orientation et occlusion des mains. Les points d’attache et la position au repos ne doivent pas être inventés depuis cette vue isolée ; le porteur et ses membres restent des sources distinctes. |
| Action et récupération futures | Rechercher une séquence pour décomposer préparation, déplacement, contact éventuel et retour. Les timings, trajectoires et contraintes de déplacement seront des paramètres CQC à valider ; aucune frappe, charge ou propriété spéciale n’est livrée par ce PNG. |
| Interruption et rangement | Prévoir abandon d’une action, retour au repos et retrait de scène en conservant les points d’attache. Les états de chute, usure ou rupture demandent une preuve ou une décision explicite d’adaptation ; ils ne se déduisent pas de la texture rayée. |

Interactions à valider :

- Vérifier les deux mains et les masques d’occlusion avec le porteur retenu avant d’utiliser un sprite d’action.
- Séparer volume visuel de l’objet, contact de jeu et effet d’impact ; le contour complet de l’image ne devient pas une zone de dégâts.
- Contrôler proximité des murs, plateformes et autres personnages pendant les transitions futures, sans ajouter de comportement automatique.
- Conserver la qualification Gold comme attribution recoupée et ouverte à vérification du modèle ; les autres variantes de masse restent séparées.

Éléments manquants : Identifiant du modèle natif ; Vue opposée ; Prise en main native ; Poses du porteur et récupération ; Effets et sons séparés.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="survive-survival-spear-gold"></a>

## Survive — Survival Spear [Gold], Survival Pack

Lance dorée complète, profil trois quarts de l’inventaire, lame vers la gauche ; un PNG indépendant sans porteur.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:survive-survival-spear-gold` |
| Édition et couverture | Metal Gear Survive — Survival Pack / variante Gold — `full_object` |
| Fichier | [survive-survival-spear-gold.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/survive-survival-spear-gold.png) |
| Sortie | 2172 × 724, RGBA, 316,046 octets |
| SHA-256 | `64ec8211084eec1816569a275f2a40336cb614b796988ace4d81e23237862b58` |
| WorkIds | `prop:survive_survival_spear_gold` |
| Guide | 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://w.atwiki.jp/mgsurvive/pages/24.html)
- [Référence 2](https://img.atwiki.jp/mgsurvive/attach/24/64/20180815182903_1.jpg)
- [Référence 3](https://www.konami.com/games/us/en/topics/917/)
- [Référence 4](https://www.konami.com/kde_cms/na_publish/uploads/mgv_preorder_beauty_shot.png)

Copies utilisées : [native-survival-spear-gold.jpg](../cqc-reprise/pass69/research/survive/references/native-survival-spear-gold.jpg), [official-mgv-preorder-beauty-shot.png](../cqc-reprise/pass69/research/survive/references/official-mgv-preorder-beauty-shot.png).

- Capture native de l’exemple Thrust Weapons sur atwiki ; comparaison avec la Survival Spear dorée explicitement présente dans le Survival Pack officiel.
- Lame courte asymétrique, petite garde circulaire, douille évasée, hampe fine très longue, bagues et pommeau arrondi sont conservés. La pointe, le pommeau et les marges sont présents.
- Le nom précis de variante est corroboré par la planche officielle et la teinte du modèle ; la page communautaire ne fournit pas de légende individuelle Gold. Une confirmation de modèle reste ouverte.
- L’échelle du relief, de l’usure et des bagues est interprétée, sans extraction 1:1 du modèle. Aucun porteur, estoc, projectile, collision ni comportement de combat n’est livré.

### États et interactions à produire

Lance Survive isolée dans la variante dorée rapprochée du Survival Pack. La vue de classe Thrust Weapons montre la silhouette entière, de la lame au pommeau. La planche officielle corrobore la famille Gold ; le raccord exact entre cette capture communautaire et l’identifiant de modèle reste à confirmer.

| État prévu | Travail et vérification |
|---|---|
| Vue entière de référence | Conserver la longueur relative de la hampe, la lame asymétrique, la petite garde, les bagues et le pommeau. La vue livrée est oblique et presque horizontale ; produire d’autres orientations seulement à partir de références correspondantes, avec pointe et extrémité toujours lisibles. |
| Port et garde à qualifier | Obtenir des vues natives avec porteur pour observer les positions des mains et les points d’appui. Un objet isolé ne permet pas de choisir la latéralité ou la distance au corps ; ces éléments conditionnent les futures couches et collisions. |
| Mouvement et retour futurs | Documenter la préparation, l’avancée visuelle et le retour de la pose native retenue. La longueur apparente ne détermine ni portée ni vitesse de jeu ; les règles de contact, déplacement et interruption doivent être définies puis testées dans CQC. |
| Réaction et sortie | Prévoir réaction au contact, retour au repos et rangement en gardant la continuité entre la hampe et les mains. Aucun lancer, projectile ou état cassé n’est livré ou déduit de la forme de la lance ; ces possibilités exigeraient des preuves et assets propres. |

Interactions à valider :

- Valider l’ancrage de la hampe et l’occultation par chacune des mains, avec caméra et échelle définitives.
- Distinguer collision de décor, contact de jeu et rendu de la pointe pour éviter une zone d’impact fondée sur toute la longueur du PNG.
- Vérifier le retour au contrôle après arrêt ou interruption, ainsi que les croisements avec une petite cible et les bords de plateforme.
- Conserver les données de variante et les réserves d’identification ; aucune capacité ou bonus particulier n’est attribué à la teinte dorée.

Éléments manquants : Confirmation du modèle Gold ; Vue opposée et détails natifs ; Port et garde du personnage ; Actions et récupérations sourcées ; Réactions et effets séparés.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="mgr-mistral-collar-concept"></a>

## Revengeance — collier mécanique de Mistral, étude de concept

Un collier mécanique isolé, même vue trois-quarts supérieure que la planche de détail PlatinumGames008. Source de concept finale, sans bras ni corps.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:mgr-mistral-collar-concept` |
| Édition et couverture | Metal Gear Rising: Revengeance — étude de concept PlatinumGames, planche de détails Mistral (2013) — `full_object` |
| Fichier | [mgr-mistral-collar-concept.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/mgr-mistral-collar-concept.png) |
| Sortie | 1371 × 1147, RGBA, 1,514,646 octets |
| SHA-256 | `0471a9b406fb701c1803b797484501863cae5d618ddec48117d02fbcb4de1e6f` |
| WorkIds | `prop:mgr_mistral_collar_concept` |
| Guide | 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://www.platinumgames.com/official-blog/article/4694)
- [Référence 2](https://www.platinumgames.com/official-blog/wp-content/uploads/sites/2/2013/01/008.jpg?w=600)

Copies utilisées : [mistral-equipment-platinum.jpg](../cqc-reprise/pass69/research/rising/references/mistral-equipment-platinum.jpg).

- Un seul collier ; silhouette générale, cavité rouge, anneau mécanique interne et logements frontaux repris du dessin primaire.
- Les proportions exactes, rainures, attaches et microdétails sont interpolés ; aucune comparaison géométrique au modèle de jeu ne valide une identité 1:1.
- Fond réellement transparent. Les pixels du bord gauche culminent à alpha1 ; le corps visible dispose de marges.
- Le dessin d’origine appartient au travail de conception de Mistral ; ce PNG n’est ni un export de modèle ni la preuve d’un état détachable en jeu.

### États et interactions à produire

Accessoire mécanique de Mistral isolé depuis une planche de conception PlatinumGames. Cette source documente le volume apparent, les ports et le revêtement intérieur visibles. Elle ne représente pas un objet déjà assemblé au personnage dans le runtime ni une preuve de toutes les connexions du modèle final.

| État prévu | Travail et vérification |
|---|---|
| Vue de référence isolée | Fixer l’orientation et une échelle documentaire cohérente avec la planche. Les surfaces internes, disques et détails périphériques peuvent servir de repères visuels, mais pas de plan technique ni de mesure d’assemblage. |
| Association au porteur | Obtenir une vue native du collier porté et vérifier position relative au cou et aux épaules. Définir les points d’attache et les couches d’occlusion à partir de ces vues, sans déduire de la perspective du concept une géométrie arrière complète. |
| Transitions visibles à qualifier | Rechercher les séquences où l’accessoire change d’état ou accompagne un mouvement. Chaque variation réelle de port, rotation ou connexion demande ses frames ; aucun mécanisme mobile ou effet lumineux n’est animé par la source fixe. |
| Réaction et fin de séquence | Prévoir les transitions d’apparition, masquage et retrait nécessaires à la scène CQC choisie. Les états de dommage ou détachement, s’ils sont retenus et sourcés, restent des objets et animations séparés ; ne pas les inventer depuis la présence de raccords. |

Interactions à valider :

- Vérifier les masques d’occlusion avec le corps, les bras et la caméra avant de superposer l’accessoire au personnage.
- Conserver la provenance conceptuelle dans chaque association ; la fidélité au modèle natif final demande une comparaison dédiée.
- Ne pas ajouter de portée, dégâts, cible ou état actif au collier sur la seule base de son apparence mécanique.
- Maintenir un retour propre à la scène initiale après pause, interruption ou changement de dossier ; aucun élément ne doit rester accroché à un autre porteur.

Éléments manquants : Vues natives porté et arrière ; Échelle et points d’attache ; Masques d’occlusion ; États mobiles attestés ; Version finale native si distincte.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

<a id="mgr-r00-maverick-cap-portrait"></a>

## Revengeance — agent Maverick R-00 à casquette, portrait

Portrait du personnage au premier plan de la capture R-00, de la casquette au haut du torse. Ne représente aucun corps complet et ne détermine pas son augmentation.

| Champ | Valeur |
|---|---|
| Identité | `asset:p69:mgr-r00-maverick-cap-portrait` |
| Édition et couverture | Metal Gear Rising: Revengeance — capture cinématique R-00, plateforme non certifiée — `portrait` |
| Fichier | [mgr-r00-maverick-cap-portrait.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p69/mgr-r00-maverick-cap-portrait.png) |
| Sortie | 1434 × 1097, RGBA, 1,430,921 octets |
| SHA-256 | `6e5d37e9305d7564d1efd2166ebb0eed98562e8f3e6d9489cf33a35a64e7307a` |
| WorkIds | `character:R-MGR-soldier` |
| Guide | 02, 03, 04, 16, 17, 18, 25, 26, 27, 29 — [exigences](guide-map.json) |
| État | Source Atlas ; fidélité et admission au combat à valider |

### Références et limites

- [Référence 1](https://www.imfdb.org/wiki/Metal_Gear_Rising:_Revengeance)
- [Référence 2](https://www.imfdb.org/images/8/8b/Rising-F2000-1.jpg)

Copies utilisées : [r00-maverick-f2000.jpg](../cqc-reprise/pass69/research/rising/references/r00-maverick-f2000.jpg).

- Un seul portrait, variante à casquette distincte de l’individu casqué placé derrière lui dans la référence. Polo sombre, harnais, barbe et inclinaison de tête conservés dans les grandes lignes.
- Le visage et les textures sont largement reconstruits depuis une petite zone de la capture : aucun détail facial interpolé ne vaut certification.
- Cadrage volontaire aux épaules/haut du torse ; aucun pantalon, pied, arme ou mouvement n’est livré.
- Aux bords, maximum alpha3 en haut,7 en bas,6 à gauche,4 à droite ; la boîte alpha≥16 conserve une marge de3px ou plus. Le sommet n’est donc pas tronqué par une partie opaque.
- Le groupe historique R-MGR-soldier reste à séparer et à documenter en pied ; ce portrait ne résout pas la ligne de corps manquants.

### États et interactions à produire

Portrait d’un soldat Maverick à casquette visible dans R-00. La source s’arrête aux épaules et sert à documenter la tête, la casquette et une partie du vêtement. Le visage, les textures et les coutures sont reconstruits depuis une capture limitée ; aucun corps complet ni identité personnelle supplémentaire n’est fourni.

| État prévu | Travail et vérification |
|---|---|
| Portrait statique | Conserver le cadrage documentaire, la casquette abaissée et les épaules coupées volontairement. Définir une zone de cadrage pour la fiche sans interpréter les limites de l’image comme des limites anatomiques ou un volume de collision. |
| Autres angles et expressions | Rechercher des gros plans natifs avant de produire profil, regard ou expression. La visière masque les yeux dans la référence ; les faire apparaître ou inventer une expression lisible demanderait une autre source. |
| Présentation dans l’interface | Si la fiche reçoit une transition, définir apparition, disparition et recadrage comme comportements d’interface CQC. Un fondu ou un léger mouvement de présentation ne devient pas une animation native du personnage et doit être décrit comme tel. |
| Qualification ultérieure du corps | Conserver l’exigence de vues natives en pied pour tenue, équipements et morphologie complète. Toute intégration combattant attend ces références et les cycles correspondants ; le portrait ne réduit pas à lui seul ce travail restant. |

Interactions à valider :

- Séparer sélection de dossier et sélection de combattant ; la fiche doit rester consultable sans ouvrir une admission de jeu.
- Vérifier lisibilité sur fonds clairs et sombres, avec respect du cadrage des épaules et des réserves d’alpha.
- Ne pas associer armes, rang, nom ou capacités supplémentaires à partir du visage et de la casquette seuls.
- Conserver R-00 comme contexte de cette source ; aucune couverture des autres soldats humains de Revengeance n’est transférée.

Éléments manquants : Autres gros plans natifs ; Vues intégrales de la tenue ; Dos et profils ; Équipements qualifiés séparément ; Cycles si future admission.

Les durées, fenêtres et vitesses restent à mesurer sur des séquences natives puis à équilibrer dans CQC. Aucun nombre de frames canonique n’est déduit du PNG. La vue livrée reste celle de sa référence. Une vue de profil, une orientation opposée ou une rotation demande une référence et une source distinctes.

## Historique et conservation

Les refus sont conservés dans le [registre des prompts](../cqc-reprise/pass69/prompt-index.json), sans nouvelle tentative sur leur cible. Les [six journaux locaux complémentaires](../cqc-reprise/pass69/local-addendum/README.md) sont archivés octet pour octet. Les précédentes tentatives et limites restent accessibles.

Les 277 lignes historiques et les 97 statuts P61 non résolus restent distincts du nombre de PNG. Après P69, 75 lignes historiques restent sans candidat sélectionné. Un portrait peut apporter un premier candidat documentaire sans fournir un corps complet ; les groupes restent ouverts. [Calcul détaillé](../cqc-reprise/pass69/coverage-delta.json).
