# P72 — manquants et preuves encore nécessaires

**73 lignes historiques restent sans candidat sélectionné.** Parmi les **97 lignes classées `unresolved` par P61**, 24 disposent maintenant d’au moins une source fixe candidate ; leur statut historique demeure inchangé. L’inventaire complet contient **277 lignes** et n’est pas réécrit par P72.

[Inventaire P61 conservé](../pass61/inventory.json) · [Delta calculé](coverage-delta.json) · [Fiches P72](../../cqc-bible/CONTINUATION_P72.md) · [Manifeste](delivery-manifest.json) · [Revue](reviewed-batch.json)

| Mesure | Avant P72 | Après P72 | Sens |
|---|---:|---:|---|
| Lignes de l’inventaire P61 | 277 | 277 | Identités et statuts conservés |
| Lignes historiquement `unresolved` | 97 | 97 | Aucune réécriture de statut |
| Parmi elles, sans candidat sélectionné | 75 | 73 | Présence d’une source candidate seulement |
| Parmi elles, avec au moins un candidat | 22 | 24 | Groupes et variantes encore ouverts |
| Nouvelles lignes partiellement couvertes | — | 2 | Invités MPO+ et décors VR DLC |
| Nouveaux périmètres hors inventaire | — | 6 | Extensions explicites, sans fermeture d’une ligne historique |
| Clôtures, admissions combat, certifications 1:1 | 0 | 0 | Aucune revendication de complétude |

Les 180 autres lignes conservent également leur classification P61. La présence d’une image, d’un corps complet dans une seule pose ou d’un fragment de décor ne prouve ni toutes les variantes ni les états, animations, collisions, interactions ou dimensions natives.

## Deux groupes reçoivent leurs premiers candidats partiels

### Invités de jeux antérieurs

WorkId : `character:R-MPO-GUEST`. Statut P61 conservé : **Groupe/variantes à inventorier** (`group_or_variant_inventory_incomplete`).

| Candidat partiel | Couverture livrée | Première preuve suivante |
|---|---|---|
| [Portable Ops Plus — KGB Soldier](../../cqc-bible/CONTINUATION_P72.md#mpop-kgb-soldier) | `full_body` ; une vue fixe | Comparer masque, harnais, asymétrie et proportions au modèle et à des captures natives complémentaires. |
| [Portable Ops Plus — GRU Soldier](../../cqc-bible/CONTINUATION_P72.md#mpop-gru-soldier) | `full_body` ; une vue fixe | Comparer masque, harnais, asymétrie et proportions au modèle et à des captures natives complémentaires. |
| [Portable Ops Plus — SEAL](../../cqc-bible/CONTINUATION_P72.md#mpop-seal-soldier) | `full_body` ; une vue fixe | Comparer masque, harnais, asymétrie et proportions au modèle et à des captures natives complémentaires. |

**Périmètre restant :** Vérifier Johnny, Genome arctique, SEAL, Gurlukovich, Hi-Tech et Tengu selon l’édition, puis leur modèle PSP spécifique.

Les autres membres, variantes, angles et états restent à inventorier. Ce groupe ne passe pas au statut clos.

### VR Missions — DLC

WorkId : `stage:mgr_vr_dlc`. Statut P61 conservé : **Lot de scènes ou contrôle d’édition à décomposer** (`dedicated_source_not_established`).

| Candidat partiel | Couverture livrée | Première preuve suivante |
|---|---|---|
| [Revengeance — VR Missions DLC, parcours de plateformes jaunes](../../cqc-bible/CONTINUATION_P72.md#mgr-vr-dlc-yellow-platform-course) | `environment_fragment` ; une vue fixe | Identifier la mission exacte à partir d’un parcours natif ou d’une liste officielle ; ne pas transformer le marquage D05 en numéro de mission. |
| [Revengeance — VR Missions DLC, salle jaune aux caméras](../../cqc-bible/CONTINUATION_P72.md#mgr-vr-dlc-camera-room) | `environment_fragment` ; une vue fixe | Identifier exactement la mission et documenter portes, limites, raccords et dimensions par captures natives complémentaires. |

**Périmètre restant :** Séparer géométrie de poursuite, duels humains et emprise du boss géant.

Les autres membres, variantes, angles et états restent à inventorier. Ce groupe ne passe pas au statut clos.

## Extensions hors des 277 lignes historiques

Ces 6 identités ne diminuent pas le compteur historique. Elles restent des périmètres nouveaux avec leurs propres limites.

| WorkId nouveau | Source | Preuves et production suivantes |
|---|---|---|
| `machine:acid_patrol_bot` | [AC!D — robot de patrouille de Lobito](../../cqc-bible/CONTINUATION_P72.md#acid-patrol-bot) — `full_body` | Obtenir une capture native plus grande des trois appuis, du bloc supérieur et du canon afin de corriger les détails reconstruits. |
| `prop:acid_surveillance_camera` | [AC!D — caméra de surveillance de Lobito](../../cqc-bible/CONTINUATION_P72.md#acid-surveillance-camera) — `full_object` | Capturer la caméra en gros plan afin de confirmer la face optique, l’orientation et la forme du support ; corriger ou retirer les détails extrapolés. |
| `prop:mgr_pincer_blades_inventory` | [Revengeance — Pincer Blades, icône d’inventaire du guide](../../cqc-bible/CONTINUATION_P72.md#mgr-pincer-blades-inventory) — `inventory_icon` | Préserver l’usage comme icône documentaire ; ne pas convertir cette silhouette en arme photoréaliste ou volume complet sans références supplémentaires. |
| `prop:survive_beta_medical_workbench` | [Survive — établi médical, bêta janvier2018](../../cqc-bible/CONTINUATION_P72.md#survive-beta-medical-workbench) — `full_object` | Obtenir des captures natives rapprochées avant/arrière du même poste et son nom exact dans la bêta. |
| `prop:survive_beta_weapons_workbench` | [Survive — établi d’armes, bêta janvier2018](../../cqc-bible/CONTINUATION_P72.md#survive-beta-weapons-workbench) — `full_object` | Vérifier sur vue native rapprochée le nombre exact de pieds, la jonction du long bac et la séparation avec le poste voisin. |
| `prop:survive_large_spiked_barricade` | [Survive — Large Spiked Barricade, déployée intacte](../../cqc-bible/CONTINUATION_P72.md#survive-large-spiked-barricade) — `full_object` | Obtenir une vue native dégagée du centre et des appuis, puis compter et mesurer les pieux, croisements et ligatures. |

## Les lignes encore sans candidat sélectionné

Le tableau ci-dessous est calculé à partir des IDs historiques `unresolved` qui n’apparaissent dans aucun `workIds` sélectionné des registres P61–P69, P71 et P72. Les archives et refus n’apportent aucune couverture. Chaque demande de preuve est reprise de l’inventaire P61 conservé.

### Personnages et groupes — 46 ligne(s)

| ID historique | Sujet | Statut P61 conservé | Référence ou travail demandé |
|---|---|---|---|
| `character:R-3DS-01` | Naked Snake — présentation 3DS | Profil d’édition ou d’identité à rapprocher | Collecter vues modèle 3DS, animations de déplacement accroupi, références photo-camo; même personne, édition graphique distincte. |
| `character:R-ACID-HAROLD` | Harold Burton | Identité documentaire — corps non établi | Définir rôle, mention/apparition et relation aux identités déjà présentes; pas de corps 1:1 sans image. |
| `character:R-DELTA-FOX` | Opérateurs / avatars FOX HUNT | Groupe/variantes à inventorier | Inventaire des choix d'avatar/tenues effectivement disponibles, captures de chaque variante et correspondance des identifiants. |
| `character:R-GB-brother` | Frère de Weasel | Identité documentaire — corps non établi | Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. |
| `character:R-GB-gardner` | Steve Gardner | Identité documentaire — corps non établi | Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. |
| `character:R-GB-no4` | No. 4 | Identité documentaire — corps non établi | Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. |
| `character:R-GB-parker` | John Parker | Identité documentaire — corps non établi | Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. |
| `character:R-GB-smith` | Lieutenant Smith | Identité documentaire — corps non établi | Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. |
| `character:R-GB-weah` | William Weah | Identité documentaire — corps non établi | Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. |
| `character:R-GZ-SNATCH` | Body Snatchers / Raiden bonus | Profil d’édition ou d’identité à rapprocher | Capturer distinction cible humaine/Snatcher et modèle de Raiden; ne pas présenter ce bonus comme événement canonique de 1975. |
| `character:R-GZ-dod` | Agent du Department of Defense | Conflit d’identité ou d’édition | Identité officielle, mission et capture du modèle GZ correspondant, ou correction explicite du catalogue. |
| `character:R-HIDEO-peace-walker` | Hideo — incarnation de jeu | Portrait établi — corps complet non établi | Vue corps entier réellement présente dans Peace Walker ; à défaut, conserver un portrait documenté sans inventer d'uniforme. |
| `character:R-MG1-01` | Frère de Jennifer | Référence individuelle insuffisante | Capture MSX avec dialogue et position de salle, puis correspondance du sprite et de sa palette. |
| `character:R-MG1-02` | Faux Dr Madnar | Identité et référence insuffisantes | Capture native de la rencontre du faux Madnar avec dialogue et sprite identifié, sans réutiliser automatiquement le vrai docteur. |
| `character:R-MG1-04` | Commander South / Vermon CaTaffy | Identité documentaire — corps non établi | Dossier textuel avec scan/page/édition; aucun corps officiel à inventer ni fusion avec Big Boss. |
| `character:R-MG2-01` | Enfants de Zanzibar | Groupe/variantes à inventorier | Inventorier les sprites et dialogues par emplacement; définir attente, fuite et conversation sans armes inventées. |
| `character:R-MGR-armored` | Cyborgs blindés / variantes de commandement | Génération refusée — aucun PNG | Conserver la référence et le refus effectif ; ne pas compter un PNG inexistant. |
| `character:R-MGS1-VR` | Gray Fox — missions Ninja | Profil d’édition ou d’identité à rapprocher | Rattacher le corps exact PS1 et les mouvements VR documentés; ne pas importer le kit Revengeance. |
| `character:R-MGS2-04` | Rose réelle / interface IA | Profil d’édition ou d’identité à rapprocher | Annoter les séquences et voix; conserver le visage de Rose, signaler l’instance IA sans inventer un nouveau corps. |
| `character:R-MGS2-05` | Meryl — Snake Tales | Profil d’édition ou d’identité à rapprocher | Localiser apparition/illustration dans Snake Tales avant toute réutilisation d’un corps MGS1 ou TTS. |
| `character:R-MGS3-GUY` | Guy Savage — version PS2 | Profil d’édition ou d’identité à rapprocher | Référencer héros, ennemis et mouvements du mini-jeu PS2; créer une fiche distincte du remake Delta. |
| `character:R-MGS3-kgb` | Gardes du KGB | Groupe/variantes à inventorier | Table de variantes PS2 et Delta distincte; enregistrer visage, couvre-chef, insignes, gants et arme/posture source. |
| `character:R-MGS3-khrushchev` | Nikita Khrouchtchev — interlocuteur | Identité documentaire — corps de jeu non établi | Modèle ou vue complète propre à l'édition concernée, si elle existe ; sinon conserver une fiche documentaire/voix. |
| `character:R-MGS3-scientist` | Scientifiques de Groznyj Grad | Groupe/variantes à inventorier | Table de variantes PS2 et Delta distincte; enregistrer visage, couvre-chef, insignes, gants et arme/posture source. |
| `character:R-MGS4-littlejohn` | Little John | Groupe/variantes à inventorier | Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. |
| `character:R-MGS4-pmc` | PMC — classes et équipements | Groupe/variantes à inventorier | Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. |
| `character:R-MGS4-rebelsa` | Rebelles sud-américains | Groupe/variantes à inventorier | Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. |
| `character:R-MGS4-resistance` | Résistant d’Europe de l’Est | Groupe/variantes à inventorier | Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. |
| `character:R-MPO-regional` | Soldats régionaux et promotionnels MPO+ | Groupe/variantes à inventorier | Table de modèles et équipements par version; nom de provenance, palette, accessoire et région dans les métadonnées. |
| `character:R-PW-PS` | Peace Sentinel — classes d’ennemis | Groupe/variantes à inventorier | Reconnaissance, fantassin, blindé et tireur : relever les classes réellement visibles et leur équipement dans le jeu; aucune liste de classes supposée complète. |
| `character:R-SURVIVE-harley-warren` | Harley Warren | Identité documentaire — corps non établi | Recueillir journal/enregistrement et éventuel portrait; exclure les inventions corporelles du compte officiel. |
| `character:R-SURVIVE-joel-marton` | Joel Marton | Identité documentaire — corps non établi | Recueillir journal/enregistrement et éventuel portrait; exclure les inventions corporelles du compte officiel. |
| `character:R-TPP-QUE` | Queequeg | Identité documentaire — corps de jeu non établi | Vue canonique identifiée du pilote Queequeg ; à défaut, fiche de rôle documentaire. |
| `character:R-TPP-children` | Enfants de la troupe d’Eli / Mbele | Groupe/variantes à inventorier | Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. |
| `character:R-TPP-dd` | Personnel Diamond Dogs — femmes et hommes | Groupe/variantes à inventorier | Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. |
| `character:R-TPP-interpreters` | Interprètes russophone/afrikaans/kikongo | Groupe/variantes à inventorier | Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. |
| `character:R-TPP-patients` | Patients et personnel de l’hôpital | Groupe/variantes à inventorier | Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. |
| `character:R-TPP-pf` | Soldats soviétiques et forces privées africaines | Groupe/variantes à inventorier | Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. |
| `character:R-TPP-targets` | Commandants, ingénieurs, marchands et prisonniers de missions | Groupe/variantes à inventorier | Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. |
| `character:R-TTS-campbell` | Campbell | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |
| `character:R-TTS-donald-anderson-decoy` | Donald Anderson / Decoy | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |
| `character:R-TTS-jim-houseman` | Jim Houseman | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |
| `character:R-TTS-mei-ling` | Mei Ling | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |
| `character:R-TTS-miller-liquid-d-guis` | Miller / Liquid déguisé | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |
| `character:R-TTS-naomi` | Naomi | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |
| `character:R-TTS-nastasha` | Nastasha | Profil d’édition ou d’identité à rapprocher | Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. |

### Costumes et variantes — 13 ligne(s)

| ID historique | Sujet | Statut P61 conservé | Référence ou travail demandé |
|---|---|---|---|
| `costume:archive__paz:official--swimsuit` | PAZ ORTEGA ANDRADE — Maillot — Date with Paz | Blocage historique conservé |  |
| `costume:archive__paz:official--zeke-pilot` | PAZ ORTEGA ANDRADE — Tenue du final — pilote de ZEKE | Blocage historique conservé |  |
| `costume:archive__raiden_vr:official--x-raiden-substance` | RAIDEN — VR — X Raiden, mode d’évasion | Blocage historique conservé |  |
| `costume:core__amanda_pw:official--injured-recovery` | AMANDA VALENCIANO LIBRE — Blessure et convalescence | Tenue exacte non établie par les références |  |
| `costume:core__eva_mgs3:cyborg` | EVA — MGS3 — Châssis cybernétique | Blocage historique conservé |  |
| `costume:core__fear:cyborg` | THE FEAR — Châssis cybernétique | Blocage historique conservé |  |
| `costume:core__kaz_pw:official--swimsuit` | KAZUHIRA MILLER — MSF — Maillot — Date with Kaz | Blocage historique conservé |  |
| `costume:core__mistral:official--two-arm-configuration` | MISTRAL — Configuration à deux bras — sans bras Dwarf Gekko | Blocage historique conservé |  |
| `costume:core__raven:original-concept:oc-002` | Vulcan Raven — Expédition polaire | Blocage historique conservé |  |
| `costume:npc53__tatyana_mgs3:cyborg` | TATYANA — Châssis cybernétique | Blocage historique conservé |  |
| `costume:roster51__end_delta:metalgear` | THE END — DELTA — Metal Gear | Blocage historique conservé |  |
| `costume:roster51__eva_delta:cyborg` | EVA — DELTA — Châssis cybernétique | Blocage historique conservé |  |
| `costume:roster51__fear_delta:cyborg` | THE FEAR — DELTA — Châssis cybernétique | Blocage historique conservé |  |

### Machines et créatures — 4 ligne(s)

| ID historique | Sujet | Statut P61 conservé | Référence ou travail demandé |
|---|---|---|---|
| `machine:gustav_concept` | Metal Gear G / Gustav | Concept/projet annulé — périmètre à définir |  |
| `machine:rex_tts` | REX The Twin Snakes | Génération refusée — aucun PNG |  |
| `machine:rising_cancelled` | MGS Rising — projet initial annulé | Concept/projet annulé — périmètre à définir |  |
| `machine:zeke_configurations` | ZEKE — configurations construites | Configurations ZEKE à décomposer |  |

### projectiles — 3 ligne(s)

| ID historique | Sujet | Statut P61 conservé | Référence ou travail demandé |
|---|---|---|---|
| `projectile:crystal-grenade` | Projectile explosif du Mortar — nom historique CQC crystal-grenade | Corps de projectile : référence géométrique insuffisante | Une frame non floue du cristal juste avant impact/renvoi, ou un modèle/texture canonique du projectile. |
| `projectile:smoke-shell` | Projectile fumigène du Box Tank | Corps de projectile : référence géométrique insuffisante | Capture de jeu nette du BOX-T (SMK) au tir ou modèle/texture de sa munition permettant de définir la silhouette. |
| `projectile:stun-shell` | Projectile non létal du Box Tank | Corps de projectile : référence géométrique insuffisante | Capture de tir du BOX-T (STN) présentant la munition, ou preuve que le même modèle de projectile est réellement partagé avec une autre variante. |

### Décors et scènes — 7 ligne(s)

| ID historique | Sujet | Statut P61 conservé | Référence ou travail demandé |
|---|---|---|---|
| `stage:delta_bomberman` | Lot de scènes par édition / sous-mode | Lot de scènes ou contrôle d’édition à décomposer | Décliner en fiches par lieu après inventaire de captures, sans compter ce lot comme une seule carte complète. |
| `stage:delta_edition` | Lot de scènes par édition / sous-mode | Lot de scènes ou contrôle d’édition à décomposer | Décliner en fiches par lieu après inventaire de captures, sans compter ce lot comme une seule carte complète. |
| `stage:delta_monkey` | Lot de scènes par édition / sous-mode | Lot de scènes ou contrôle d’édition à décomposer | Décliner en fiches par lieu après inventaire de captures, sans compter ce lot comme une seule carte complète. |
| `stage:mc2_edition` | Contrôle édition MGS4 / PW HD / Ghost Babel | Lot de scènes ou contrôle d’édition à décomposer | Comparer la référence d’origine choisie aux éditions2026 sans créer des cartes supplémentaires par simple changement de plateforme. |
| `stage:mgs2_substance_vr` | VR Substance — arènes distinctes | Lot de scènes ou contrôle d’édition à décomposer | Définir un cadrage latéral de la zone nommée sans fusionner les Struts. |
| `stage:touch_acts` | MGS Touch — planches par acte | Lot de scènes ou contrôle d’édition à décomposer | Établir la scène de cette édition ; l’existence d’un thème voisin n’est pas une correspondance. |
| `stage:tts_edition` | Lot de scènes par édition / sous-mode | Lot de scènes ou contrôle d’édition à décomposer | Décliner en fiches par lieu après inventaire de captures, sans compter ce lot comme une seule carte complète. |

## Lignes historiques avec candidat, toujours à compléter

Ces 24 lignes conservent leur statut `unresolved`. Le nombre de sources ci-dessous mesure des associations documentaires, sans valider tous les membres d’un groupe, les vues cachées, les scènes ou les états jouables.

| ID historique | Sujet | Sources associées | Statut P61 conservé |
|---|---|---:|---|
| `character:R-ACID-DECOY` | Faux Flemming | 1 | Profil d’édition ou d’identité à rapprocher |
| `character:R-ACID-GUARDS` | Soldats de Genetics / mercenaires de Leone / personnels SaintLogic | 5 | Groupe/variantes à inventorier |
| `character:R-MG1-03` | Gardes d’Outer Heaven et chiens de garde | 6 | Groupe/variantes à inventorier |
| `character:R-MG2-02` | Four Horsemen — quatre membres | 1 | Groupe/variantes à inventorier |
| `character:R-MGO1` | Avatars, classes et personnages uniques | 1 | Groupe/variantes à inventorier |
| `character:R-MGO2` | Avatars, classes et personnages uniques | 1 | Groupe/variantes à inventorier |
| `character:R-MGO3` | Avatars, classes et personnages uniques | 6 | Groupe/variantes à inventorier |
| `character:R-MGR-soldier` | Soldats humains de la séquence R-00 | 1 | Groupes à séparer et vues complètes requises |
| `character:R-MGS1-heavy` | Genome lourd | 1 | Groupe/variantes à inventorier |
| `character:R-MGS1-light` | Genome léger | 1 | Groupe/variantes à inventorier |
| `character:R-MGS2-03` | Otages du Shell 1 | 1 | Groupe/variantes à inventorier |
| `character:R-MGS3-gru` | GRU standard | 1 | Groupe/variantes à inventorier |
| `character:R-MGS4-rebelme` | Rebelles du Moyen-Orient | 2 | Groupe/variantes à inventorier |
| `character:R-MPO-GUEST` | Invités de jeux antérieurs | 3 | Groupe/variantes à inventorier |
| `character:R-MPO-medical` | Médecins, scientifiques et officiers recrutables | 2 | Groupe/variantes à inventorier |
| `character:R-MPO-ocelot` | Ocelot Unit — hommes/femmes | 1 | Groupe/variantes à inventorier |
| `character:R-MPO-soviet` | Soldats soviétiques — hommes/femmes | 2 | Groupe/variantes à inventorier |
| `character:R-PW-FSLN` | Guérilleros sandinistes | 1 | Groupe/variantes à inventorier |
| `character:R-SIDE-CATALOG` | Ennemis et variantes de ces versions | 2 | Groupe/variantes à inventorier |
| `character:R-SURVIVE-AVATAR` | Captain — avatar féminin/masculin et apparences personnalisées | 2 | Groupe/variantes à inventorier |
| `character:R-TPP-doctor` | Médecin de l’hôpital | 1 | Groupe/variantes à inventorier |
| `character:R-TPP-nurse` | Infirmière de l’hôpital | 1 | Groupe/variantes à inventorier |
| `character:R-TTS-kenneth-baker` | Kenneth Baker | 1 | Profil d’édition ou d’identité à rapprocher |
| `stage:mgr_vr_dlc` | VR Missions — DLC | 2 | Lot de scènes ou contrôle d’édition à décomposer |

## Sorties archivées et refus de génération

P72 conserve **2 PNG archivés** et **2 refus sans fichier**. Ils ne figurent pas parmi les 11 sources retenues ou dans les nouvelles fiches Atlas.

| ID | Résultat | Motif / suite autorisée |
|---|---|---|
| `mpop-kgb-soldier-v1` | PNG brut archivé | Lien pendant supplémentaire côté droit de l’image, absent de la référence ; remplacé par la correction ciblée v2. |
| `acid-gun-camera` | PNG brut archivé | La capture KONAMI ne montre pas le support inférieur complet : il sort du cadre gauche. Le PNG complète une plaque murale rectangulaire et ses fixations sans référence visible. Archiver cet essai hors sélection et Atlas ; obtenir une vue native complète avant une nouvelle production. |
| `mgr-sai-inventory` | Refus sans PNG | Prompt et réponse conservés dans le registre ; aucune relance sous un autre nom. |
| `mpop-tengu-soldier` | Refus sans PNG | Prompt et réponse conservés dans le registre ; aucune relance sous un autre nom. |

[Prompts, paramètres, réponses exactes et chemins des archives](prompt-index.json). Les pistes sans référence exploitable n’ayant fait l’objet d’aucun appel restent des recherches différées, sans être comptées comme sorties ou refus image.

## Ordre des preuves pour poursuivre

1. Identifier l’édition, la classe, la variante et le périmètre exact ; obtenir des références réellement visibles et assez complètes. Un nom, un texte de guide ou une silhouette partiellement masquée ne suffit pas à reconstruire les parties cachées.
2. Pour un personnage ou une machine : documenter le corps, ses accessoires, les profils et le dos ; pour un décor : délimiter le fragment, la géométrie, les raccords et les objets intégrés ; pour un accessoire : vérifier toutes les parties prétendues complètes.
3. Recueillir les séquences natives des états et interactions envisagés. Une pose en T, une icône d’inventaire ou un screenshot fixe n’établit ni chronologie, ni comportement, ni mouvement.
4. Produire les vues et états manquants individuellement avec provenance, puis valider ancrages, collisions, transitions et adaptation CQC. L’admission au combat et la fidélité sont des validations séparées de la présence dans l’Atlas.

Les réserves et prochaines vérifications propres aux onze candidats P72 figurent dans les [fiches détaillées](../../cqc-bible/CONTINUATION_P72.md).
