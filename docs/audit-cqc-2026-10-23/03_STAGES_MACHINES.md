# 03 — Stages, Metal Gear, véhicules et gros boss

**Référence contrôlée : P41, commit `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`, branche `codex/cqc-p40-batch30-recovery`. Audit du 23 octobre 2026.**

## Conclusion opérationnelle

CQC possède déjà une couverture étendue. Le manque principal n’est pas de recréer les noms déjà présents : il faut terminer les phases, les lieux exacts des rencontres, les variantes d’édition et la preuve visuelle. Une machine officielle dans une épreuve originale reste une adaptation ; un stage peint d’après capture reste une reconstruction 2D. Cet audit conserve ces distinctions afin de rendre l’objectif de fidélité vérifiable.

| Inventaire observé | Quantité | Ce que cela prouve |
|---|---:|---|
| Stages admis au registre Core/Versus | 124 | Définitions, couches et liens enregistrés ; présence du décor, pas validation visuelle nouvelle. |
| Alias de stage | 123 | Liens de noms/route ; ne sont pas 123 décors supplémentaires. |
| Groupes de titres du registre | 21 | Couverture nominale ; pas tous les sous-lieux de ces jeux. |
| Rigs partagés de machines | 64 | Pièces techniques comprenant faces, variantes et visualisations ; pas 64 boss uniques. |
| Dossiers du module Arsenal | 33 | Rencontres ou simulations déclarées, avec cibles/HP propres à CQC. |
| RAY MGS4 privé et stage Port Area | 1+1 | Modules dédiés hors des 64 rigs/124 stages ; déjà présents. |
| Lots complémentaires de scènes/éditions | 113 | Backlog identifié ; certains lots restent à décomposer, ce n’est pas une prétention à énumérer chaque salle de toute la franchise. |
| Lots complémentaires machines/variantes | 54 | Absences de rig/dossier, adaptations incomplètes, variantes et concepts séparés. |

**Niveau de preuve.** L’inventaire final a été chargé dans Chromium avec des images 1×1 substituées. Cette sonde démontre ordre de chargement et admission des entrées. Elle ne valide ni rendu, ni cohérence alpha des PNG, ni gameplay. Les états «missing» ou erreurs de dimensions issus de ce remplacement ne sont pas retenus comme bugs du jeu. Les inventaires ne sont pas additionnés indistinctement : il y a124 stages partagés et un stage privé repéré, dont les surfaces/modes diffèrent.

Les124 revues de stage sont reprises avec leur statut exact dans les données jointes : {"accepted_closest":124}. Aucune de ces fiches n’est présentée par cet audit comme une certification absolue 1:1. Les qualifications et références préexistantes sont conservées ; une revue héritée n’est pas une nouvelle vérification faite ici.

La référence visuelle doit fixer jeu, édition, plateforme, région/build, lieu et instant narratif. Master Collection Vol.2 est sorti le 27 août 2026 avec MGS4, PW HD et Ghost Babel : son existence ajoute une colonne d’édition, pas automatiquement de nouvelles cartes. FOX HUNT est officiel depuis le 30 octobre 2025 ; les noms de ses trois cartes ci-dessous proviennent d’un aperçu secondaire et exigent encore confrontation à un client commercial. [K-MC2](https://www.konami.com/games/eu/en/topics/19257/) ; [K-FOXHUNT](https://www.konami.com/games/us/en/topics/3015/) ; [W-FOX-MAPS](https://www.gamespark.jp/article/2025/10/28/158858.html)

## 1. Priorités et écarts concrets

| Priorité | Réf. | Constat | Action et limite | Preuve |
|---|---|---|---|---|
| P1 | ST-01 | Null : mapping de prison au lieu de ses deux rencontres | core__null_mpo pointe sur mpo-san-hieronymo-prison ; distinguer entrée du silo puis sous-station, garder prison pour son contexte d’évasion. | [public/cqc/src/cqc-pass26-stage-registry.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass26-stage-registry.js) ; [W-MPO](https://www.speedrun.com/mpo/levels) |
| P1 | ST-02 | RAY Rising : contexte R01 utilisé pour le prologue R00 | Le pont utilise p18_mgr_abkhazie_cour_desperado. Produire avenue/train Afrique R00 et relier la rencontre correspondante ; conserver le label simulation tant que réemploi. | [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGR](https://metalgear.fandom.com/wiki/World_Marshal_Incident) |
| P1 | ST-03 | Hind et M1 : héliport utilisé pour tour et canyon | Deux modèles présents mais même scène shadow_heliport ; créer Communications Tower et canyon. Ce réemploi est intentionnellement labellisé SIMULATION. | [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS1](https://metalgear.fandom.com/wiki/Shadow_Moses_Island) |
| P1 | ST-04 | Peace Walker bipède : premier combat incomplet | Modèle et stomp/flammes présents ; rig documente minesS, missiles, hurlement, fuite, hélicoptère et caméra inverse non admis. Rattachement au décor Cocoon à préciser. | [public/cqc/src/cqc-pass31-peace-walker-biped.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass31-peace-walker-biped.js) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough) |
| P1 | ME-01 | TX-55 : tirs/jambes/contrôle au lieu de séquence source | Préserver simulation actuelle et ajouter contrat canonique explosifs/caméras si cible1:1. Ne pas appeler TX-55 absent. | [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [W-TX55](https://metalgear.fandom.com/wiki/TX-55_Metal_Gear) |
| P1 | ME-02 | GANDER : trois phases source non reproduites | Qualification explicite conserve deux phases/pools actuels. Compléter troisième phase et placement d’armes/cibles avec capture GBC. | [public/cqc/src/cqc-pass30-gander-fidelity.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass30-gander-fidelity.js) ; [W-GANDER](https://metalgear.fandom.com/wiki/Metal_Gear_GANDER) |
| P1 | ME-03 | RAXA : prototype présent, phase aérienne à vérifier | Quatre appuis puis noyau ne prouve pas la séquence de ports missile aériens. Documenter les ouvertures, vulnérabilités, ombre et atterrissage. | [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [W-RAXA](https://metalgear.fandom.com/wiki/Metal_Gear_RAXA) |
| P2 | ME-04 | M1 et Bulldozer : chenilles rigides déclarées | Produire phase de bande/roues liée à vitesse, garder orientation mécanique réelle ; ne pas faire tourner le char entier pour simuler les chenilles. | [public/cqc/src/cqc-pass34-vehicle-articulation.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass34-vehicle-articulation.js) ; [W-MGS1](https://metalgear.fandom.com/wiki/Shadow_Moses_Island) |
| P2 | ME-05 | Des essais CQC emploient des machines officielles | Battle Gear, Mk.II/III, relais GW/SOP, ICBMG ou D-Walker ne sont pas automatiquement des combats originaux. Statut simulation/création requis pour chaque scénario. | [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [W-WEAPONS](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)) |
| P2 | ST-05 | Mobile et Portable Ops Plus : lieux exacts non identifiés | Deux scènes présentes, noms descriptifs et source de capture limités. Retrouver identité carte/chapitre avant de cocher fidélité. | [public/cqc/src/cqc-pass27-stage-completion.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-stage-completion.js) ; [W-MOBILE](https://mgcvt.com/mgs_mobile/) |
| P2 | ST-06 | Delta/FOX HUNT et Online : couverture dédiée faible | Jade Forest est la carte MGO3 actuelle ; MGO1/2, autresMGO3, Arcade, FOX HUNT et versions remake ont des lots dédiés ci-dessous. | [public/cqc/src/cqc-pass26-stage-registry.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass26-stage-registry.js) ; [K-FOXHUNT](https://www.konami.com/games/us/en/topics/3015/) |
| P3 | ME-06 | Métadonnées anciennes à mettre en cohérence | Bulldozer porte encore Blast Furnace dans DATA, corrigé au runtime par le pont ; D parle de roulement, Shagohod de chenilles. Corriger sans annoncer une panne visuelle non observée. | [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html) |

P1 : obstacle à la fidélité de l’identité/rencontre ou trou de contenu majeur. P2 : couverture, articulation et finition à compléter après la cohérence source. P3 : métadonnée ou concept optionnel. Ces priorités ne constituent pas une déclaration de plantage.

## 2. Contrat de production et de validation 1:1

### Stage : livrable attendu pour chaque ligne

Une fiche de stage contient une capture de référence non recadrée, son timecode et la version du jeu ; un plan indiquant sol, limites gauche/droite, hauteur des structures et emplacement des repères ; les plans séparés ciel/fond/architecture/sol/premier plan ; une liste des objets masquants et objets interactifs ; la palette/éclairage du moment ; les boucles et événements ; les collisions et règles du mode. Les dimensions1280×720, sol 568 ou amplitudes de caméra présentes dans le code sont des choix CQC, pas des dimensions du monde Metal Gear.

Pour chaque élément animé, décrire pose initiale, accélération, mouvement, arrêt, boucle et transition. Un ventilateur tourne autour de son axe visible ; un drapeau reste fixé à son support ; l’eau conserve un plan cohérent ; la neige/pluie n’altère pas seule les collisions. Les explosions de boss, changements de phase, silhouettes de PNJ et dégâts persistants ont des pistes séparées. Les dangers sont optionnels en Versus et reproduisent uniquement des événements attestés en mode fidèle.

### Machine : livrable attendu pour chaque pièce/sprite

Le fichier des 64 rigs donne toutes les pièces, atlas, rectangles, parents, pivots, offsets, ordre de dessin et canaux déclarés. Il sert de liste de contrôle pour ne pas omettre une jambe, une arme ou un côté. Pour chaque clip, ajouter : nom et rôle ; source/timecodes ; poses clés ; durée observée ; premier/dernier contact au sol ; rotation de chaque joint ; déplacement du centre de masse ; ouverture/fermeture d’arme ; point et axe de tir ; FX/son ; début/fin de hitbox ; vulnérabilité ; fenêtre d’interruption ; état final persistant. Tant que les images clés ne sont pas relevées, les durées restent NON_MESUREES : aucune fausse précision en frames n’est fournie.

Un atlas neutre et ses rotations procédurales ne démontrent pas tout un répertoire d’animations. Une face opposée doit conserver les asymétries des radômes, railguns, capteurs et équipement : elle peut être issue d’une autre vue sourcée, jamais présumée correcte par simple miroir. Les chenilles se déplacent autour de leurs roues ; les pales gardent leur plan de perspective ; les coques/navires restent rigides ; les jambes organiques Gekko ne se transforment pas en vérins métalliques.

La recette exige une comparaison côte à côte à vitesse réelle puis image par image : neutre, deux extrêmes de marche, annonce et pic d’attaque, dégâts, changement de phase, défaite. Vérifier les contacts sur les deux côtés, l’arme sans projectile, puis le projectile sans FX masquant. Les mesures d’unitéCQC et le réglage d’équilibrage restent séparés des valeurs relevées dans le jeu original. Une capture source filtre/HD/émulateur n’atteste pas les texels PS1/PS2 d’origine.

## 3. Les124 stages existants : détail et travail restant

**[Ouvrir les fiches détaillées](03A_STAGES_EXISTANTS.md)** — 124 fiches de stages existants : revue, plans, animation, raccords et références. Le fichier conserve toutes les descriptions ; les versions JSON/CSV correspondantes servent au filtrage et au suivi.

## 4. Stages et éditions à compléter

**[Ouvrir les fiches détaillées](03B_STAGES_COMPLEMENTS.md)** — 113 lots de scènes ou d’éditions : plan, repères, animation, règles et clôture. Le fichier conserve toutes les descriptions ; les versions JSON/CSV correspondantes servent au filtrage et au suivi.

## 5. Les33 dossiers Arsenal : anatomie, animations, phases et écarts

**[Ouvrir les fiches détaillées](03C_BOSS_ANIMATIONS.md)** — 33 dossiers Arsenal : anatomie, locomotion, attaque, phases, cibles et écart à la source. Le fichier conserve toutes les descriptions ; les versions JSON/CSV correspondantes servent au filtrage et au suivi.

## 6. Inventaire technique des 64 rigs

Les64 entrées suivantes sont exhaustives pour le registre partagé observé. Une face gauche/droite compte comme un rig ; ce décompte ne représente ni64 adversaires uniques, ni64 rencontres terminées. Les documents de pièces JSON/CSV donnent chaque pièce et son lien hiérarchique, pas seulement le nom de machine.

| Rig | Pièces | Rencontres Arsenal | Combattants liés |
|---|---:|---|---|
| `rex_mgs1_ps1` | 16 | rex |  |
| `ray_mgs2_arsenal` | 14 | raymass |  |
| `mgd_mg2_msx2` | 23 | metalgeard |  |
| `tx55_mg1_msx1987` | 17 | tx55 |  |
| `icbmg_mpo_psp2006` | 9 | bic |  |
| `raxa_mpo_psp2006` | 17 | raxa |  |
| `gander_ghost_gbc2000` | 27 | gander |  |
| `zeke_pw_psp2010` | 22 | zeke |  |
| `shagohod_mgs3_ps2_2004` | 23 | shagohod |  |
| `sahelanthropus_mgsv2015` | 21 | sahel |  |
| `kodoque_acid_psp2004` | 23 | kodoque |  |
| `pupa_pw_psp2010` | 19 | pupa |  |
| `peacewalker_pw_psp2010` | 17 | peacewalker |  |
| `chrysalis_pw_psp2010` | 14 | chrysalis |  |
| `cocoon_pw_psp2010` | 24 | cocoon |  |
| `chaioth_acid2_psp2005` | 23 | chaioth |  |
| `gekko_mgs4_ps3_2008` | 10 | gekko | completion__gekko_mgs4 |
| `gekko_mgs4_right` | 9 |  | completion__gekko_mgs4 |
| `mk2_mgs4_ps3_2008` | 15 | mk2 | completion__mk2_mgs4 |
| `mk3_mgs4_ps3_2008` | 15 | mk3 | completion__mk3_mgs4 |
| `mk2_mgs4_right` | 14 |  | completion__mk2_mgs4 |
| `mk3_mgs4_right` | 14 |  | completion__mk3_mgs4 |
| `dwalker_mgsv2015` | 12 | dwalker | archive__dwalker |
| `walker_gear_mgsv2015` | 13 | walker_column | archive__walker_gear |
| `dwalker_mgsv_right` | 12 |  | archive__dwalker |
| `walker_gear_mgsv_right` | 13 |  | archive__walker_gear |
| `dwarf_gekko_mgs4_ps3_2008` | 11 | dwarf_swarm | completion__dwarf_gekko_mgs4 |
| `ray_unmanned_mgr2013` | 12 | ray_mgR |  |
| `grad_mgr2013` | 12 | grad |  |
| `excelsus_mgr2013` | 24 | excelsus |  |
| `battle_gear_mgsv2015` | 16 | battle_gear |  |
| `harrier_mgs2_ps2_2001` | 12 | harrier |  |
| `hind_d_mgs1_ps1_1998` | 11 | hind_d |  |
| `m1_mgs1_ps1_1998` | 8 | m1tank |  |
| `bulldozer_mg1_msx1987` | 7 | bulldozer |  |
| `arsenal_gear_mgs2_ps2_2001` | 10 | arsenal_gear |  |
| `outer_haven_mgs4_ps3_2008` | 11 | outer_haven |  |
| `virgil_at9_survive2018` | 5 |  | archive__virgil_at9 |
| `reptile_pod_pw2010` | 3 |  | npc53__reptile_pod_pw |
| `avian_pod_pw2010` | 3 |  | npc53__avian_pod_pw |
| `arthropod_pod_pw2010` | 3 |  | npc53__arthropod_pod_pw |
| `mammal_pod_pw2010` | 3 |  | npc53__mammal_pod_pw |
| `patriot_jd_authored_vr` | 1 |  | npc53__jd_ai_mgs4 |
| `patriot_gw_authored_vr` | 1 |  | npc53__gw_ai_mgs4 |
| `patriot_tj_authored_vr` | 1 |  | npc53__tj_ai_mgs4 |
| `patriot_tr_authored_vr` | 1 |  | npc53__tr_ai_mgs4 |
| `patriot_al_authored_vr` | 1 |  | npc53__al_ai_mgs4 |
| `khamsin_mgr2013_left` | 16 |  | core__khamsin |
| `khamsin_mgr2013_right` | 16 |  | core__khamsin |
| `cunningham_hover_platform_mpo2006` | 5 |  |  |
| `pass19__gekko_suicide_mgs4` | 9 |  | pass19__gekko_suicide_mgs4 |
| `pass19__gekko_missile_mgs4` | 12 |  | pass19__gekko_missile_mgs4 |
| `pass19__gekko_mgr` | 10 |  | pass19__gekko_mgr |
| `pass19__dwarf_gekko_trenchcoat_mgs4` | 16 |  | pass19__dwarf_gekko_trenchcoat_mgs4 |
| `pass19__dwarf_gekko_humanoid_mgr` | 20 |  | pass19__dwarf_gekko_humanoid_mgr |
| `pass19__gekko_suicide_mgs4_right` | 9 |  | pass19__gekko_suicide_mgs4 |
| `pass19__gekko_missile_mgs4_right` | 12 |  | pass19__gekko_missile_mgs4 |
| `pass19__gekko_mgr_right` | 10 |  | pass19__gekko_mgr |
| `pass19__dwarf_gekko_trenchcoat_mgs4_right` | 16 |  | pass19__dwarf_gekko_trenchcoat_mgs4 |
| `pass19__dwarf_gekko_humanoid_mgr_right` | 20 |  | pass19__dwarf_gekko_humanoid_mgr |
| `pass19__hammerhead_mgr` | 16 |  | pass19__hammerhead_mgr |
| `pass19__hammerhead_mgr_right` | 16 |  | pass19__hammerhead_mgr |
| `rex_mgs4_ps3_2008` | 21 |  |  |
| `peacewalker_biped_pw_psp2010` | 25 | peacewalker_biped |  |

Les cinq entrées `patriot_*_authored_vr` sont des visualisations originales de systèmes IA, pas cinq robots officiels corporels. Les quatre podsPW sont des composants/personnifications jouables ; ils ne s’additionnent pas aux quatre machines comme de nouveaux boss géants. VirgilAT-9 doit garder sa carcasse/portes rigides tant qu’une cinématique ne prouve pas le mouvement. Les formes trenchcoat et humanoïde Dwarf Gekko ont des nombres de robots différents, donc des rigs réellement distincts. Ces identités sont déjà présentes dans le catalogue et ne sont pas remises dans un backlog «absent».

### Présences à compter séparément et qualifications importantes

#### RAY Liquid Ocelot MGS4 — `ray_mgs4_ps3_2008`

**PRESENT_MODULE_PRIVE_HORS_64**. Caméra native gauche, parties segmentées par polygones, mâchoire et supports internes, articulations et contacts de pieds. Aucun raster MGS2 ou Rising substitué.

**Animation/production :** Station lourde ; transferts et pas avec appuis IK ; tête/mâchoire orientée vers cible ; jet hydraulique émis par la bouche ; contact de mêlée et récupération ; impacts et défaite du duel contre REX. Relever chaque séquence dans le combat PS3.

**Limites restantes :** Face opposée indépendante, volumes cachés/extrêmes et chronologie1:1 non certifiés. Missiles/canons ont des ancrages de surface, pas toutes les ouvertures/éjections admises. Support interne du cou reconstruit et timing CQC adapté.

**Code :** public/cqc/src/cqc-pass33-ray-mgs4.js.

#### Port Area — duel REX/RAY MGS4 — `mgs4_shadow_moses_port_area`

**PRESENT_MODULE_PRIVE_HORS_124**. Trois plans : mer/ciel(.04), quai/sol(1), architecture métallique(.2). Sol568 en unités CQC ; captures de référence aux secondes 33810/33830 du longplay PS3 cité dans le code.

**Animation/production :** Mer et atmosphère séparées du quai rigide ; poussière/impacts liés aux pieds des deux machines ; mouvement des structures uniquement attesté. Décor supportant largeur du duel sans étirer les volumes.

**Limites restantes :** Reconstruction peinte et projection 2D déclarées non certifiées ; météo désactivée par défaut, pas absence de stage. Vérifier alignement en mouvement et états endommagés avec vrais assets.

**Code :** public/cqc/src/cqc-pass33-shadow-moses-duel-stage.js.

#### REX piloté MGS4 — `rex_mgs4_ps3_2008`

**PRESENT_DANS_64_A_NE_PAS_REDUPLIQUER**. Caméra native droite ; cockpit déjà ouvert avec Old Snake, radôme déjà cassé, railgun absent. Rig21 pièces ; le duel privé l’emploie avec RAY dédié.

**Animation/production :** Activation depuis hangar, locomotion et poussée, mêlée de machine et tirs attestés, défense, impacts, écrasement et fin de duel. Ne jamais restaurer le radôme ou railgun de MGS1 par erreur.

**Limites restantes :** Caméra inverse et silhouettes extrêmes non admises ; trappes/éjection missiles à relever ; volumes hydrauliques cachés interprétés. L’échelle de présentation n’est pas une mesure canonique.

**Code :** public/cqc/src/cqc-pass31-rex-mgs4.js.

#### Khamsin — exosquelette et pilote — `khamsin_mech`

**PRESENT_COMBATTANT_ET_RIGS_DEUX_FACES**. Rigs khamsin_mgr2013_left/right, combattant core__khamsin et arène dédiée Abkhazie.

**Animation/production :** Poids du châssis et jambes mécaniques, anticipation de hache, souffle des réacteurs, balayage, impact au sol, exposition du pilote et attaque finale de Blade Wolf ; mains du pilote liées à commandes.

**Limites restantes :** Ne pas le lister absent du roster. À vérifier : mode boss reproduisant taille, déplacement, faiblesse/arrière et séquence DLC entière, au-delà de son adaptation jouable.

**Code :** public/cqc/src/cqc-machine-parts-catalog-v1.js ; public/cqc/src/cqc-pass18-machine-bridge.js.

#### Cunningham — plateforme volante — `cunningham_platform`

**PRESENT_RIG_ET_COMBATTANT**. Rig cunningham_hover_platform_mpo2006 frontal et scène ascenseur du silo.

**Animation/production :** Cunningham vise depuis plateforme, translations de hover, maintien d’altitude, tir et réaction moteur ; le déplacement du monte-charge reste indépendant du hover.

**Limites restantes :** Profil inverse/arrière et propulsion cachée non admis. Le signal source1px de la sonde documentaire n’est pas une panne asset à rapporter.

**Code :** public/cqc/src/cqc-pass34-vehicle-articulation.js ; public/cqc/src/cqc-pass18-machine-bridge.js.

## 7. Machines, variantes et gros boss complémentaires

Chaque statut limite exactement le constat : absence de rig dédié dans les 64, absence de dossier dans les 33, combattant déjà admis mais mission géante à compléter, ou concept jamais livré. Le catalogue ne transforme pas un jeu annulé en contenu canonique. Les24 versions de véhiculesPW sont douze familles × normal/Custom, pas 24 familles mécaniques inédites. Les variantes TypeII/Custom des quatre IA sont suivies séparément des familles de base.

### Metal Gear NES — Supercomputer NES (`nes_supercomputer`)

**P1 · PAS_DE_DOSSIER_MACHINE_DEDIE_DANS_LES_33**

**Silhouette :** Équipements de la salle et ordinateur final NES, aucun TX-55 déplacé de MSX.

**Animation :** État normal, indicateurs actifs, explosions de destruction, compte à rebours et fuite.

**Écart / règle de comptage :** Contenu distinct du TX-55 MSX ; salle et interaction complète à spécifier.

**Sources :** [W-TX55](https://metalgear.fandom.com/wiki/TX-55_Metal_Gear) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### Snake’s Revenge — Metal Gear2 de Snake’s Revenge (`revenge_metal_gear_2`)

**P1 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Boss NES final, silhouette et emplacement exact ; ne pas le confondre avec Metal Gear D.

**Animation :** État de lancement, missiles/interaction de salle, dégâts et destruction selon original NES.

**Écart / règle de comptage :** Quatre scènes Snake’s Revenge existent ; cela ne prouve pas ce boss final détaillé.

**Sources :** [W-SR](https://metalgear.fandom.com/wiki/Snake%27s_Revenge) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### MGS2 — RAY prototype piloté (`ray_mgs2_prototype`)

**P1 · INCARNATION_A_DISTINGUER**

**Silhouette :** Prototype Marines, cockpit, queue et détails de face spécifiques ; comparaison avec série sans queue.

**Animation :** Présentation Tanker, mouvements dans cale puis fuite plongeante et nage selon séquence attestée.

**Écart / règle de comptage :** RAY de série Arsenal est présent ; une nouvelle fiche doit préciser cinématique jouable/adaptation, pas inventer un combat Tanker.

**Sources :** [W-RAY2](https://metalgear.fandom.com/wiki/Metal_Gear_RAY_(unmanned)) ; [W-MGS2](https://metalgear.fandom.com/wiki/Big_Shell_Incident).

### MG1 — HindD MSX (`hind_mg1`)

**P2 · INCARNATION_PAS_DE_RIG_MACHINE_DEDIE**

**Silhouette :** Silhouette et palettes de l’édition MSX choisie ; armes et vue du dessus propres.

**Animation :** Translation selon grille, visée, rotor/chenilles, tirs et explosions relevés image par image dans cette édition.

**Écart / règle de comptage :** Le Hind et M1 PS1 ne valent pas validation de ces incarnations ; certains décors d’arène existent déjà.

**Sources :** [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html) ; [W-WEAPONS](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)).

### MG1 — Tank MSX (`tank_mg1`)

**P2 · INCARNATION_PAS_DE_RIG_MACHINE_DEDIE**

**Silhouette :** Silhouette et palettes de l’édition MSX choisie ; armes et vue du dessus propres.

**Animation :** Translation selon grille, visée, rotor/chenilles, tirs et explosions relevés image par image dans cette édition.

**Écart / règle de comptage :** Le Hind et M1 PS1 ne valent pas validation de ces incarnations ; certains décors d’arène existent déjà.

**Sources :** [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html) ; [W-WEAPONS](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)).

### MG2 — HindD MSX2 (`hind_mg2`)

**P2 · INCARNATION_PAS_DE_RIG_MACHINE_DEDIE**

**Silhouette :** Silhouette et palettes de l’édition MSX choisie ; armes et vue du dessus propres.

**Animation :** Translation selon grille, visée, rotor/chenilles, tirs et explosions relevés image par image dans cette édition.

**Écart / règle de comptage :** Le Hind et M1 PS1 ne valent pas validation de ces incarnations ; certains décors d’arène existent déjà.

**Sources :** [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html) ; [W-WEAPONS](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)).

### The Twin Snakes — REX The Twin Snakes (`rex_tts`)

**P1 · VARIANTE_EDITION_NON_ADMISE_DEDIEE**

**Silhouette :** Relever modèle, matières, détails de cockpit et rig de cette édition, sans relabel du PS1/PS2.

**Animation :** Reprise de chaque phase dans le rythme et la mise en scène de l’édition ; séquences propres au remake à répertorier.

**Écart / règle de comptage :** La présence du boss original ne certifie pas le remake ; caméra latérale demeure une adaptation.

**Sources :** [W-MGS1](https://metalgear.fandom.com/wiki/Shadow_Moses_Island).

### MGS Delta — Shagohod Delta (`shagohod_delta`)

**P1 · VARIANTE_EDITION_NON_ADMISE_DEDIEE**

**Silhouette :** Relever modèle, matières, détails de cockpit et rig de cette édition, sans relabel du PS1/PS2.

**Animation :** Reprise de chaque phase dans le rythme et la mise en scène de l’édition ; séquences propres au remake à répertorier.

**Écart / règle de comptage :** La présence du boss original ne certifie pas le remake ; caméra latérale demeure une adaptation.

**Sources :** [K-DELTA](https://www.konami.com/games/eu/en/topics/18800/).

### Peace Walker — LAV-Type G — normal (`pw_lav_type_g_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de LAV-Type G. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — LAV-Type G — Custom (`pw_lav_type_g_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de LAV-Type G. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — LAV-Type C — normal (`pw_lav_type_c_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de LAV-Type C. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — LAV-Type C — Custom (`pw_lav_type_c_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de LAV-Type C. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — BTR-60 PA — normal (`pw_btr_60_pa_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de BTR-60 PA. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — BTR-60 PA — Custom (`pw_btr_60_pa_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de BTR-60 PA. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — BTR-60 PB — normal (`pw_btr_60_pb_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de BTR-60 PB. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — BTR-60 PB — Custom (`pw_btr_60_pb_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de BTR-60 PB. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — T-72U — normal (`pw_t_72u_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de T-72U. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — T-72U — Custom (`pw_t_72u_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de T-72U. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — T-72A — normal (`pw_t_72a_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de T-72A. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — T-72A — Custom (`pw_t_72a_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de T-72A. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — KPz70 — normal (`pw_kpz70_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de KPz70. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — KPz70 — Custom (`pw_kpz70_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de KPz70. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — MBTk-70 — normal (`pw_mbtk_70_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de MBTk-70. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — MBTk-70 — Custom (`pw_mbtk_70_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier caisse, tourelle/canon, pneus ou chenilles, blindages et accessoires de MBTk-70. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Démarrage, patrouille, virage, arrêt, arme visée/tir/recul, débarquement de soldats, fumée, immobilisation, extraction et destruction.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Mi-24A — normal (`pw_mi_24a_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de Mi-24A. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Mi-24A — Custom (`pw_mi_24a_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de Mi-24A. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Mi-24D — normal (`pw_mi_24d_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de Mi-24D. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Mi-24D — Custom (`pw_mi_24d_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de Mi-24D. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — AH56A-Bomber — normal (`pw_ah56a_bomber_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de AH56A-Bomber. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — AH56A-Bomber — Custom (`pw_ah56a_bomber_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de AH56A-Bomber. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — AH56A-Raider — normal (`pw_ah56a_raider_normal`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de AH56A-Raider. Variante normal avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — AH56A-Raider — Custom (`pw_ah56a_raider_custom`)

**P2 · PAS_DE_RIG_DEDIE_DANS_LES_64**

**Silhouette :** Identifier fuselage, cockpit, rotor, empennage et charges de AH56A-Raider. Variante Custom avec livrée et équipement de la mission correspondante.

**Animation :** Décollage/hover, changement de passe, rotor en perspective, attaque de la version, soldats débarqués, queue/rotor endommagé, perte de contrôle ou capture.

**Écart / règle de comptage :** Ne pas fusionner une variante Custom avec normal sur la seule couleur. Les PV/escorte/difficulté peuvent varier sans nouveau squelette ; relever ce qui change réellement.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Pupa — Type II (`pw_pupa_type_ii`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Type II ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Pupa — Custom (`pw_pupa_custom`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Custom ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Chrysalis — Type II (`pw_chrysalis_type_ii`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Type II ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Chrysalis — Custom (`pw_chrysalis_custom`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Custom ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Cocoon — Type II (`pw_cocoon_type_ii`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Type II ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Cocoon — Custom (`pw_cocoon_custom`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Custom ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Peace Walker — Type II (`pw_peace_walker_type_ii`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Type II ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — Peace Walker — Custom (`pw_peace_walker_custom`)

**P2 · VARIANTE_NON_ADMISE_COMME_DOSSIER_DISTINCT**

**Silhouette :** Base machine existante ; relever livrée, protections, armes et IA de cette variante.

**Animation :** Répertoire, cadence, effets et phases observés dans mission Custom ; comparer au normal avant de mutualiser les clips.

**Écart / règle de comptage :** Aucune absence du modèle de base revendiquée ; ces variantes et leurs règles ne sont pas démontrées par la seule fiche normale.

**Sources :** [W-PW-VEHICLES](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### Peace Walker — ZEKE — configurations construites (`zeke_configurations`)

**P2 · MATRICE_MODULES_A_COMPLETER**

**Silhouette :** Têtes, jambes et équipements récupérés sur autres IA ; conserver provenance des pièces.

**Animation :** Marche et armes compatibles avec chaque module ; assembly/désassembly d’atelier et vrai duel Paz séparés.

**Écart / règle de comptage :** Ne pas compter chaque assemblage comme boss canonique supplémentaire ; matrice de compatibilité et silhouettes.

**Sources :** [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough) ; [W-PW-MISSIONS](https://www.speedrun.com/mgspw/levels).

### PW × Monster Hunter — Rathalos (`pw_mh_rathalos`)

**P2 · BONUS_OFFICIEL_PAS_DE_RIG_DEDIE**

**Silhouette :** Wyvern ailée, tête/cornes, pattes, ailes, queue.

**Animation :** Prise d’air, envol, virage, boule de feu, charge, balayage de queue, atterrissage et chute.

**Écart / règle de comptage :** Crossover officiel mais continuité bonus distincte. Difficultés/variantes de mission et île spécifique à documenter.

**Sources :** [K-MH](https://www.konami.com/mg/archive/mgs_pw/en/collabo/mh.html).

### PW × Monster Hunter — Tigrex (`pw_mh_tigrex`)

**P2 · BONUS_OFFICIEL_PAS_DE_RIG_DEDIE**

**Silhouette :** Wyvern quadrupède, ailes faisant appui, mâchoire et longue queue.

**Animation :** Charge, freinage, rotation, cri, morsure et saut, membres plantés au bon moment.

**Écart / règle de comptage :** Crossover officiel mais continuité bonus distincte. Difficultés/variantes de mission et île spécifique à documenter.

**Sources :** [K-MH](https://www.konami.com/mg/archive/mgs_pw/en/collabo/mh.html).

### PW × Monster Hunter — Gear REX (`pw_mh_gear_rex`)

**P2 · BONUS_OFFICIEL_PAS_DE_RIG_DEDIE**

**Silhouette :** Créature bonus bio-mécanique reconnaissable, anatomie propre et appendices.

**Animation :** Attaques de souffle/projectile, charge, queue et bond à relever sur le combat PW ; ne pas reprendre mécaniquement les clips REX.

**Écart / règle de comptage :** Crossover officiel mais continuité bonus distincte. Difficultés/variantes de mission et île spécifique à documenter.

**Sources :** [K-MH](https://www.konami.com/mg/archive/mgs_pw/en/collabo/mh.html).

### MGS VR / MGS2 Substance — Genola (`vr_genola`)

**P2 · BOSS_VR_PAS_DE_RIG_DEDIE**

**Silhouette :** Géant de simulation ; source précise du jeu et du protagoniste à fixer avant atlas.

**Animation :** Entrée spectaculaire, pas à grande échelle, attaques et cibles du scénario VR, réaction puis effondrement ; effets de simulation explicitement conservés.

**Écart / règle de comptage :** Ne pas transformer ce bonus VR en adversaire réel du récit. Genola original et réemploi Substance nécessitent captures distinctes.

**Sources :** [W-VR-GIANTS](https://kb.speeddemosarchive.com/Metal_Gear_Solid_2%3A_Sons_of_Liberty/Bosses) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### MGS VR / MGS2 Substance — Gurlugon (`vr_gurlugon`)

**P2 · BOSS_VR_PAS_DE_RIG_DEDIE**

**Silhouette :** Géant de simulation ; source précise du jeu et du protagoniste à fixer avant atlas.

**Animation :** Entrée spectaculaire, pas à grande échelle, attaques et cibles du scénario VR, réaction puis effondrement ; effets de simulation explicitement conservés.

**Écart / règle de comptage :** Ne pas transformer ce bonus VR en adversaire réel du récit. Genola original et réemploi Substance nécessitent captures distinctes.

**Sources :** [W-VR-GIANTS](https://kb.speeddemosarchive.com/Metal_Gear_Solid_2%3A_Sons_of_Liberty/Bosses) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### MGS VR / MGS2 Substance — Mech Genola (`vr_mech_genola`)

**P2 · BOSS_VR_PAS_DE_RIG_DEDIE**

**Silhouette :** Géant de simulation ; source précise du jeu et du protagoniste à fixer avant atlas.

**Animation :** Entrée spectaculaire, pas à grande échelle, attaques et cibles du scénario VR, réaction puis effondrement ; effets de simulation explicitement conservés.

**Écart / règle de comptage :** Ne pas transformer ce bonus VR en adversaire réel du récit. Genola original et réemploi Substance nécessitent captures distinctes.

**Sources :** [W-VR-GIANTS](https://kb.speeddemosarchive.com/Metal_Gear_Solid_2%3A_Sons_of_Liberty/Bosses) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### Survive — Big Mouth (`big_mouth`)

**P1 · COMBATTANT_ADMIS_MODE_BOSS_GEANT_A_VERIFIER**

**Silhouette :** Quadrupède massif à énorme gueule, crâne/armement et membres organiques.

**Animation :** Ouverture mâchoire, charge, recul, tirs, attaque de contact, chute et exposition de faiblesse.

**Écart / règle de comptage :** UID pass19__big_mouth_survive ; les deux premiers sont déjà jouables dans la liste finale. Pas de dossier géant Arsenal33 ne veut pas dire personnage absent. Pour Lord of Dust, la ligne en attente ne constitue pas admission.

**Sources :** [W-SURVIVE-BOSS](https://gameranx.com/features/id/141534/article/metal-gear-survive-how-to-fight-two-legendary-end-game-bosses/) ; [K-SURVIVE](https://eu-support.konami.com/hc/fr/articles/9649242319127-Metal-Gear-Survive).

### Survive — Frostbite (`frostbite`)

**P1 · COMBATTANT_ADMIS_MODE_BOSS_GEANT_A_VERIFIER**

**Silhouette :** Colosse flottant, masse principale et appendices/tentacules.

**Animation :** Flottement pesant, préparation d’attaque, frappe des appendices, effets de givre, impact sur point faible et chute.

**Écart / règle de comptage :** UID pass19__frostbite_survive ; les deux premiers sont déjà jouables dans la liste finale. Pas de dossier géant Arsenal33 ne veut pas dire personnage absent. Pour Lord of Dust, la ligne en attente ne constitue pas admission.

**Sources :** [W-SURVIVE-BOSS](https://gameranx.com/features/id/141534/article/metal-gear-survive-how-to-fight-two-legendary-end-game-bosses/) ; [K-SURVIVE](https://eu-support.konami.com/hc/fr/articles/9649242319127-Metal-Gear-Survive).

### Survive — Lord of Dust (`lord_of_dust`)

**P1 · PRESENT_PLAN_ROSTER_PENDING_NON_ADMIS**

**Silhouette :** Colosse de la fin de campagne, échelle et silhouettes de ses phases.

**Animation :** Progression, attaques contre dispositif, réactions des structures, activation du moyen de défense et résolution finale.

**Écart / règle de comptage :** UID pass19__lord_of_dust_survive ; les deux premiers sont déjà jouables dans la liste finale. Pas de dossier géant Arsenal33 ne veut pas dire personnage absent. Pour Lord of Dust, la ligne en attente ne constitue pas admission.

**Sources :** [W-SURVIVE-BOSS](https://gameranx.com/features/id/141534/article/metal-gear-survive-how-to-fight-two-legendary-end-game-bosses/) ; [K-SURVIVE](https://eu-support.konami.com/hc/fr/articles/9649242319127-Metal-Gear-Survive).

### Survive coopération — Devastator (`survive_devastator`)

**P2 · CONTENU_VERSION_EVENEMENT_A_VERIFIER**

**Silhouette :** Identifier forme, matériaux et différences par rapport aux autres colosses dans le mode livré.

**Animation :** Telegraphes, attaque, point faible, réactions et défaite à relever sur mission/version correspondante.

**Écart / règle de comptage :** Source secondaire d’évènement ; ne pas annoncer silhouette ou calendrier sans capture du build.

**Sources :** [W-SURVIVE-LATE](https://w.atwiki.jp/mgsurvive/pages/51.html).

### Revengeance — Raptor / Mastiff / Slider / Hammerhead / Fenrir (`mgr_enemy_suite`)

**P2 · ENNEMIS_DEJA_ADMIS_FIDELITE_MISSION_A_VERIFIER**

**Silhouette :** Silhouette individuelle de chaque UG ; Hammerhead possède déjà rigs gauche/droite et Fenrir vient d’être admis P41.

**Animation :** Répertoire propre : bond/grappin Mastiff ; marche et découpe Raptor ; vol/piqué Slider ; rotor/armes Hammerhead ; locomotion quadrupède et lame/griffes de la variante Fenrir.

**Écart / règle de comptage :** Ce lot porte sur comportement à taille source et missions. Ne pas remettre ces cinq noms au backlog des personnages absents.

**Sources :** [K-MGR](https://www.konami.com/mg/archive/mgr/jp/movie/).

### MG2 — concept abandonné — Metal Gear G / Gustav (`gustav_concept`)

**P3 · DOCUMENTAIRE_HORS_JEU_PUBLIE**

**Silhouette :** Reprendre exclusivement les dessins et mentions publiées.

**Animation :** Aucun cycle canonique livré connu : les mouvements proposés seraient une création CQC clairement marquée concept extrapolé.

**Écart / règle de comptage :** Ne pas compter comme boss manquant du jeu MG2 livré.

**Sources :** [W-GUSTAV](https://metalgear.fandom.com/wiki/Metal_Gear_G_(Gustav)).

### Rising avant Platinum — MGS Rising — projet initial annulé (`rising_cancelled`)

**P3 · DOCUMENTAIRE_CONTENU_NON_LIVRE**

**Silhouette :** Index des éléments effectivement visibles dans bandes-annonces/concepts ; ne pas inventer une liste de boss complète.

**Animation :** Séquences observables uniquement ; tout ajout sans source porte statut création originale inspirée du concept.

**Écart / règle de comptage :** Aucun inventaire exhaustif d’un jeu jamais livré ne peut être certifié1:1. Le Rising2013 reste sa propre édition.

**Sources :** [W-RISING-CANCEL](https://www.playstationlifestyle.net/2011/12/12/kojima-productions-producer-metal-gear-solid-rising-had-been-canceled).

## 8. Ordre de livraison recommandé

1. Stabiliser les identités et étiquettes : Null, RAY R00, tour Hind, canyon M1, phases PW ; supprimer les qualifications anciennes devenues fausses sans supprimer leurs preuves historiques.
2. Terminer les boss déjà présents mais simplifiés : TX-55, GANDER, RAXA, PW bipède, impacts/dégâts et contacts des machines ; répertorier chaque clip au format de recette.
3. Compléter les lieux de ces rencontres avec leurs limites, plans, événements et caméras ; vérifier les modes qui les consomment.
4. Produire les familles encore sans rig/dossier et les variantes officielles prioritaires : NES, Snake’sRevenge, PW véhicules/IA, grandes missions Survive, versions remake.
5. Étendre Online, Arcade, Mobile/Touch et bonus officiels ; garder les concepts annulés et créations originales dans une sélection qui annonce leur provenance.

Une ligne est terminée quand source, sprites/rig, clips, scène, règles et validation visuelle convergent sur la même incarnation. Une ligne reste «à vérifier» quand seule une capture secondaire ou un nom est disponible. Aucun lot ambigu ne doit être clos par une image ressemblante ou un simple renommage.

## 9. Fichiers et sources

| Fichier | Contenu |
|---|---|
| [03_stages_existants.json](03_stages_existants.json) / [03_stages_existants.csv](03_stages_existants.csv) | 124 lignes ; détails structurés exportables. |
| [03_stages_a_completer.json](03_stages_a_completer.json) / [03_stages_a_completer.csv](03_stages_a_completer.csv) | 113 lignes ; détails structurés exportables. |
| [03_rigs_existants.json](03_rigs_existants.json) / [03_rigs_existants.csv](03_rigs_existants.csv) | 64 lignes ; détails structurés exportables. |
| [03_boss_fiches.json](03_boss_fiches.json) / [03_boss_fiches.csv](03_boss_fiches.csv) | 33 lignes ; détails structurés exportables. |
| [03_machines_a_completer.json](03_machines_a_completer.json) / [03_machines_a_completer.csv](03_machines_a_completer.csv) | 54 lignes ; détails structurés exportables. |
| [03_modules_separes.json](03_modules_separes.json) / [03_modules_separes.csv](03_modules_separes.csv) | 5 lignes ; détails structurés exportables. |
| [03_sources.json](03_sources.json) / [03_sources.csv](03_sources.csv) | Références externes et portée de chacune. |

Les références de capture déjà inscrites dans le dépôt sont conservées dans chaque stage. Les sources primaires ci-dessous fixent existence, version, mode ou silhouette ; lorsqu’une source primaire ne documente pas la mécanique précise, une source secondaire est signalée et la recette réclame toujours une capture du jeu. Les descriptions de production et choix d’adaptation sont des propositions originales, pas des descriptions officielles citées.

- **K-MANUELS · primaire** — [Manuels officiels Master Collection, périmètre des éditions](https://metalgear.konami.net/manual/mc1/en/index.html). Périmètre/manuel ; ne valide pas à lui seul chaque décor.
- **K-GHOST · primaire** — [Ghost Babel — prologue original Konami](https://www.konami.com/mg/archive/ghostbabel/english/prologue.html). Galuade, Black Chamber et mission ; pas relevé métrique.
- **K-MGR · primaire** — [Rising — vidéos officielles de combat](https://www.konami.com/mg/archive/mgr/jp/movie/). RAY final, Mastiff, LQ-84i, boss et DLC ; vidéos à mesurer image par image.
- **K-PW · primaire** — [Peace Walker — références produits officielles Pupa, Chrysalis, Basilisk](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html). Références de silhouette ; une figurine ne certifie pas géométrie ou animation du modèle jeu.
- **K-MH · primaire** — [Collaboration officielle PW × Monster Hunter](https://www.konami.com/mg/archive/mgs_pw/en/collabo/mh.html). Statut bonus officiel ; noms et variantes à référencer dans les missions.
- **K-MGO3 · primaire** — [MGO3 — cinq cartes de lancement](https://www.konami.com/mg/mgs5/tpp/jp/online/stage.php). Nom et identité des cinq cartes, captures officielles.
- **K-MGO3-DLC · primaire** — [Cloaked in Silence — trois cartes officielles](https://www.konami.com/games/eu/en/topics/4803/). Coral Complex, Rust Palace, Azure Mountain ; communiqué du contenu.
- **K-FOXHUNT · primaire** — [FOX HUNT disponible le 30 octobre 2025](https://www.konami.com/games/us/en/topics/3015/). Mode officiel, règles et AT-CAMO ; pas les noms des cartes.
- **K-DELTA · primaire** — [Lancement Delta et bonus Monkey/Bomberman](https://www.konami.com/games/eu/en/topics/18800/). Versions et bonus officiels ; ne fusionner ni édition ni plateforme.
- **K-SURVIVE · primaire** — [Présentation officielle Survive](https://eu-support.konami.com/hc/fr/articles/9649242319127-Metal-Gear-Survive). Dite, base et Wanderers ; documentation générale.
- **W-MGO · secondaire** — [Cartes MGO1/MGO2/Arcade, séparation des cartes de fans](https://metalgear.fandom.com/wiki/Metal_Gear_Online_Maps). Index à confronter à une capture du client officiel ; ne pas importer Phantom Expansion comme officiel.
- **W-MGS1 · secondaire** — [Shadow Moses — sites et différences entre éditions](https://metalgear.fandom.com/wiki/Shadow_Moses_Island). Noms et motifs identifiants ; les spécifications de caméra/parallaxe ci-dessous sont des propositions CQC.
- **W-MGS2 · secondaire** — [Big Shell Incident](https://metalgear.fandom.com/wiki/Big_Shell_Incident). Identité des lieux de rencontre et chronologie ; contrôler plans par capture.
- **W-MGS3 · secondaire** — [Index lieux et combats Snake Eater](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_3_Walkthrough). Correspondances boss/lieux ; pas copie des textes du guide.
- **W-DOLINO · secondaire** — [Dolinovodno](https://metalgear.fandom.com/wiki/Dolinovodno). Pont, gorge et duel de The Boss ; grille artistique proposée.
- **W-FLOWER · secondaire** — [Rokovoj Bereg](https://metalgear.fandom.com/wiki/Rokovoj_Bereg). Champ final et changement de fleurs ; mesurer chronologie sur capture originale.
- **W-MGS4 · secondaire** — [MGS4 — index par acte](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/game-guide/z38c6b). Noms de sites et ordre des actes.
- **W-MPO · secondaire** — [Portable Ops — liste des missions et combats](https://www.speedrun.com/mpo/levels). Null à Silo Entrance puis Power Substation ; Cunningham et Gene au silo.
- **W-MPO-MAP · secondaire** — [San Hieronymo — index géographique](https://metalgear.fandom.com/wiki/Silo_(San_Hieronymo_Peninsula)). Vingt zones listées, carte à mesurer séparément.
- **W-PW · secondaire** — [Peace Walker — index des missions](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough). Base du cratère, forêt, mine, base missile, Mother Base ; pas mesures des arènes.
- **W-MGR · secondaire** — [World Marshal Incident — lieux](https://metalgear.fandom.com/wiki/World_Marshal_Incident). Afrique prologue, Abkhazie, Guadalajara, Denver, Pakistan.
- **W-ACID · secondaire** — [AC!D — index des niveaux](https://www.supercheats.com/psp/walkthroughs/metalgearacid-walkthrough02.txt). Toponymes seuls ; descriptions de production ci-dessous originales.
- **W-FOX-MAPS · secondaire** — [FOX HUNT — trois cartes de la préversion](https://www.gamespark.jp/article/2025/10/28/158858.html). Cradle Forest, Ghost Garrison, Sacred Garden ; contrôler build commercial avant validation finale.
- **W-MOBILE · secondaire** — [MGS Mobile — édition et présentation](https://mgcvt.com/mgs_mobile/). Distinguer version mobile et VR ; nom exact des salles non établi ici.
- **W-TOUCH · secondaire** — [Metal Gear Solid Touch](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_Touch). Adaptation MGS4 ; inventaire précis des images/chapitres à établir.
- **W-TX55 · secondaire** — [TX-55 — différence MSX/NES et combat](https://metalgear.fandom.com/wiki/TX-55_Metal_Gear). MSX stationnaire, caméras et explosives ; NES superordinateur.
- **W-D · secondaire** — [Metal Gear D](https://metalgear.fandom.com/wiki/Metal_Gear_D). Bipède, jambes vulnérables et grenades ; ne pas appeler ses jambes des chenilles.
- **W-RAXA · secondaire** — [RAXA — prototype à quatre appuis](https://metalgear.fandom.com/wiki/Metal_Gear_RAXA). Appuis et déplacement propulsé ; distinguer ICBMG.
- **W-GANDER · secondaire** — [GANDER — silhouette et armes](https://metalgear.fandom.com/wiki/Metal_Gear_GANDER). Canons jumeaux et modules ; conflit de détail numérique possible, utiliser capture et manuel.
- **W-KODOQUE · secondaire** — [KODOQUE — coque, armes, deux titres](https://metalgear.fandom.com/wiki/Metal_Gear_KODOQUE). Deux apparitions AC!D/AC!D2 à suivre indépendamment.
- **W-CHAIOTH · secondaire** — [Chaioth Ha Qadesh](https://metalgear.fandom.com/wiki/Metal_Gear_Chaioth_Ha_Qadesh). Phases/organes ; système de cartes à distinguer du CQC temps réel.
- **W-RAY2 · secondaire** — [RAY de série MGS2](https://metalgear.fandom.com/wiki/Metal_Gear_RAY_(unmanned)). Différences entre prototype piloté et modèles de série.
- **W-SR · secondaire** — [Snake’s Revenge — noms et limites des localisations](https://metalgear.fandom.com/wiki/Snake%27s_Revenge). Éviter les noms humoristiques de la jaquette US comme géographie certaine.
- **W-SURVIVE-BOSS · secondaire** — [Survive — Big Mouth et Frostbite](https://gameranx.com/features/id/141534/article/metal-gear-survive-how-to-fight-two-legendary-end-game-bosses/). Identité, silhouette et vulnérabilité générale ; timings à relever.
- **W-SURVIVE-LATE · secondaire** — [Survive — boss et ajouts coopération](https://w.atwiki.jp/mgsurvive/pages/51.html). Devastator et Gekko évènement ; version/évènement à identifier avant production.
- **K-TPP · primaire** — [Manuel officiel MGSV The Phantom Pain](https://www.konami.com/mg/mgs5/tpp/en/manual/). Systèmes et commandes ; n’établit pas un relevé géométrique.
- **K-GZ · primaire** — [Ground Zeroes — manuel officiel, sélection des missions](https://www.konami.com/mg/mgs5/gz/webmanual/ps4/en/p0020.html). Systèmes ; ne certifie pas les géométries Camp Omega ou Mother Base.
- **W-TPP · secondaire** — [TPP — missions et objectifs](https://www.trueachievements.com/game/Metal-Gear-Solid-V-The-Phantom-Pain/walkthrough/11). Mission20 Voices à Ngumba ; les plans de production restent proposés.
- **W-PW-VEHICLES · secondaire** — [Peace Walker — véhicules normaux et Custom](https://metalgear.fandom.com/wiki/Peace_Walker_vehicles). Liste des familles de missions ; comparer chaque livrée et difficulté à la mission source.
- **W-VR-GIANTS · secondaire** — [MGS2 — boss des missions VR](https://kb.speeddemosarchive.com/Metal_Gear_Solid_2%3A_Sons_of_Liberty/Bosses). Gurlugon, Genola, Mech Genola ; boss de simulation.
- **W-GUSTAV · secondaire** — [Metal Gear G (Gustav), concept abandonné](https://metalgear.fandom.com/wiki/Metal_Gear_G_(Gustav)). Concept documentaire ; pas un combat présent dans le jeu publié.
- **W-WEAPONS · secondaire** — [Index des familles Metal Gear](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)). Index de noms seulement, contient concepts/continuïtés parallèles à séparer.
- **K-MC2 · primaire** — [Master Collection Vol.2 — lancement du 27 août 2026](https://www.konami.com/games/eu/en/topics/19257/). MGS4, PW HD et Ghost Babel ; traiter portage/édition séparément des lieux nouveaux.
- **W-PW-MISSIONS · secondaire** — [Peace Walker — missions par variante](https://www.speedrun.com/mgspw/levels). Noms des variantes normal/Custom, TypeII, chasses et missions ; aucune mesure canonique issue des temps de speedrun.
- **W-RISING-CANCEL · secondaire** — [MGS Rising — déclaration d’annulation du projet initial](https://www.playstationlifestyle.net/2011/12/12/kojima-productions-producer-metal-gear-solid-rising-had-been-canceled). Compte rendu du podcast de Yuji Korekado ; ne décrit pas un jeu complet publié.
- **W-ACID2 · secondaire** — [AC!D2 — progression et combat final](https://wikiwiki.jp/mga/MGA2/%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AA%E3%83%BC%E6%94%BB%E7%95%A5). Index des niveaux et phases ; traduction des noms et géométrie à confronter aux captures PSP.

Vérifications documentaires : unicité desID ;124 fiches stages ;64 fiches rigs ;33 fiches Arsenal ; liens source résolus vers la bibliographie ; complétude des champs prescrits. Aucune modification du code du jeu ni certification graphique n’est effectuée par ce dossier.
