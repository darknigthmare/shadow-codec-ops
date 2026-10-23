# Boss Animations

[Retour à la synthèse](03_STAGES_MACHINES.md). Référence P41 `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`. 33 dossiers Arsenal : anatomie, locomotion, attaque, phases, cibles et écart à la source.

## 5. Les33 dossiers Arsenal : anatomie, animations, phases et écarts

Le module traite des boss historiques, des adversaires ordinaires, des alliés et des essais imaginés. Les règles et valeurs du fichier sont exposées pour que l’audit distingue bien ce qui est implémenté de la rencontre source. Les animations ci-dessous sont des spécifications à compléter/valider : elles ne sont pas présentées comme déjà toutes implémentées.

### TX-55 METAL GEAR — `tx55`

**METAL GEAR · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `tx55_mg1_msx1987` (17 pièces), scène actuelle `outer_heaven`.

**Contrat CQC actuel :** Neutraliser les deux jambes avec les tirs ciblés avant d’atteindre le contrôle nucléaire. Détruire les protections avant la pièce centrale. HP=10000, temps=180 : unités CQC.

Cibles existantes : JAMBE G (2400HP), JAMBE D (2400HP), CONTRÔLE (5200HP).

**Silhouette / découpe :** Châssis MSX2 stationnaire, deux jambes lourdes, bassin et module supérieur ; garder silhouette et implantation de la salle, sans armement imaginé.

**Locomotion / appuis :** Le combat source ne nécessite pas une marche de géant. Repos mécanique fixe ; vibrations de mise sous tension et destruction uniquement si attestées.

**Animations d’attaque :** Animer les caméras et leurs projectiles séparément du TX-55 ; pose, clignotement et explosion des charges aux pieds. La petite animation du joueur doit respecter le contact au pied visé.

**Phases / destruction :** Séquence d’explosifs et ordre des pieds, échec d’une mauvaise séquence, explosion puis évacuation. Éviter une transformation humanoïde ou un cockpit final inventé.

**Écart précis :** Le dossier actuel demande tirs aux deux jambes puis CONTRÔLE. Cela constitue une règle CQC adaptée ; la fidélité au combat original demande un mode explosifs/caméras distinct.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-TX55](https://metalgear.fandom.com/wiki/TX-55_Metal_Gear) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### METAL GEAR D — `metalgeard`

**METAL GEAR 2 · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `mgd_mg2_msx2` (23 pièces), scène actuelle `p18_mg2_zanzibar_land_forteresse`.

**Contrat CQC actuel :** Neutraliser les trains de roulement puis ouvrir le cockpit blindé. Détruire les protections avant la pièce centrale. HP=10400, temps=180 : unités CQC.

Cibles existantes : ARTICULATION G (2600HP), ARTICULATION D (2600HP), COCKPIT (5200HP).

**Silhouette / découpe :** Bipède MG2 MSX2 : corps blindé compact, cockpit/face et jambes articulées. Les membres sont des jambes, pas des trains de roulement.

**Locomotion / appuis :** Lever un pied après transfert de poids au pied porteur ; cuisse, genou et cheville gardent leur longueur. Conserver une trajectoire et un rythme issus de captures MG2.

**Animations d’attaque :** Fenêtre de vulnérabilité des jambes aux grenades, recul léger du châssis lors des armes réellement visibles. Dessiner chaque projectile depuis la pièce émettrice, puis impact distinct.

**Phases / destruction :** Affaissement, fumée et état détruit qui prépare la scène Gray Fox ; ne pas remplacer la destruction de D par un duel cockpit si non sourcé.

**Écart précis :** Résumé du dossier « trains de roulement » et cockpit comme verrou final ne décrivent pas exactement la rencontre MSX2. Le stage zanzibar montre déjà un hangar après destruction, tandis que le pont Arsenal emploie une forteresse générique.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-D](https://metalgear.fandom.com/wiki/Metal_Gear_D) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### METAL GEAR REX — `rex`

**MGS1 · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `rex_mgs1_ps1` (16 pièces), scène actuelle `mgs1_rex_hangar`.

**Contrat CQC actuel :** Détruire le radôme, survivre au réveil de REX, puis viser le cockpit. Radôme → cockpit cyclique. HP=11200, temps=185 : unités CQC.

Cibles existantes : RADÔME (4600HP), COCKPIT (6600HP).

**Silhouette / découpe :** REX MGS1 intact : radôme latéral et railgun asymétriques, tête/cockpit, bassin, cuisses, jambes et pieds mécaniques. Ne jamais inverser les équipements par simple miroir.

**Locomotion / appuis :** Repos lourd par corrections de vérins ; marche avec au moins un pied planté, transfert du bassin et pose du talon/semelle. Rotation de tête bornée par la mécanique visible.

**Animations d’attaque :** Distinguer canon, missiles et laser de leur télégraphe au recul ; les points de sortie suivent la pièce. Radôme reçoit impact, fissure puis casse ; cockpit reste protégé avant sa vraie ouverture.

**Phases / destruction :** Phase radôme, intervention Gray Fox, changement de visibilité/cockpit, phase Liquid puis destruction. L’épave et la scène de combat humain au sommet nécessitent états séparés.

**Écart précis :** Rig et hangar dédiés existent. Les minutages, silhouettes extrêmes, scènes Gray Fox et la transition vers le duel humain doivent être comparés à une capture PS1 ; les pools HP CQC ne certifient pas l’ordre narratif.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS1](https://metalgear.fandom.com/wiki/Shadow_Moses_Island) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### HARRIER II — `harrier`

**MGS2 · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `harrier_mgs2_ps2_2001` (12 pièces), scène actuelle `p18_mgs2_passerelle_harrier`.

**Contrat CQC actuel :** Maintenir le verrou de visée et frapper entre les passes aériennes. Maintenir K : acquisition de cible. HP=8200, temps=180 : unités CQC.

Cibles existantes : CELLULE (8200HP).

**Silhouette / découpe :** AV-8B Harrier II de MGS2 : fuselage, ailes, cockpit, dérive, empennage, buses et armements distincts selon visibilité native.

**Locomotion / appuis :** Passage rapide puis vol stationnaire : roulis/tangage limités à la caméra admise ; poussée et panache alignés avec les buses. Ne pas faire onduler la cellule comme un être vivant.

**Animations d’attaque :** Séparer passe de mitraillage, lancement de missiles et évènements de bombardement attestés ; télégraphier l’entrée hors champ et suivre la trajectoire. Jets et tirs ne changent pas de côté avec une rotation arbitraire du sprite.

**Phases / destruction :** Impacts localisés, fumée persistante puis chute/cinématique et reprise de contrôle ; combat assisté par Snake et ravitaillement distincts du décor.

**Écart précis :** Stage passerelle propre présent et raccordé. Les buses/empennages ont un traitement dédié, mais les pièces cachées et profils opposés doivent être référencés ; un verrou de visée CQC reste une règle adaptée.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D articulation; original game animations and 3D models are not extracted. Absolute 1:1 is not certified.
- Hind and M1 historical source rectangles selected armor/engine panels as rocket pods or machine gun; corrected regions now use the actual visible equipment from the same untouched atlases.
- Hind and Hammerhead horizontal rotors use their admitted native perspective phases. No horizontal rotor is rotated in the screen plane; the Hind tail rotor alone rotates in its visible vertical plane.
- M1 cannon and Hammerhead barrels recoil along their actual projected source axes beneath fixed/aiming receivers. Turret azimuth and hidden breech volumes are not fabricated from flat textures.
- Harrier native nozzles and complete movable tailplanes use visible sockets. No unseparated wing flap or hidden fan is manufactured.
- M1 and bulldozer complete track silhouettes remain rigid. Independently authored tread/wheel phases are still required for authentic track circulation.
- Bulldozer blade modules remain rigid projected hydraulic assemblies; hidden linkage is not certified. Its historical roof ID selected a misplaced actuator; the ID now owns the complementary visible upper casing pixels of the original hull. This rigid source partition is not a newly invented independent canonical moving roof; the original actuator remains in the untouched atlas and historical catalogs.
- Virgil casing, pedestal and lamp remain a rigid terminal; an unsupported flat swing of its cylindrical doors is not used.
- Cunningham remains the admitted frontal platform. Its opposite/rear projection and unverified propulsion are not invented.
- New separation pieces retain existing damage groups through attached snapshots; no additional HP pool, attack clock or projectile is introduced.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS2](https://metalgear.fandom.com/wiki/Big_Shell_Incident) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### MASS-PRODUCED METAL GEAR RAY — `raymass`

**MGS2 · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `ray_mgs2_arsenal` (14 pièces), scène actuelle `p18_mgs2_arsenal_gear_plateforme_ray`.

**Contrat CQC actuel :** Repousser trois RAY successifs en brisant genou et masque. Genou → masque, trois vagues. HP=5500, temps=210 : unités CQC.

Cibles existantes : GENOU (2200HP), MASQUE (3300HP).

**Silhouette / découpe :** RAY de série MGS2 sans fusion avec le prototype piloté ou RAY Rising : ailes-bras, tête à masque ouvrant, jambes et emplacements de missiles propres à la série.

**Locomotion / appuis :** Bassin abaissé avant saut, poussée, arc aérien, réception avec amorti ; marche et rotation de groupe gardent l’appui visible. Chaque RAY a sa position et son ordre.

**Animations d’attaque :** Réaction d’un genou touché, ouverture de bouche/masque puis tir hydraulique ; missiles et mitraillage restent attachés aux bons ports. Avertissement avant passage hors champ.

**Phases / destruction :** Cycle genou→tête et remplacement d’une unité. Relever le nombre d’adversaires selon difficulté ; trois vagues du dossier CQC ne sont pas la preuve du nombre source dans toutes versions.

**Écart précis :** Le combat Arsenal est disponible ; différencier les unités simultanées et les difficultés, et ne pas utiliser le squelette MGS2 pour le RAY MGS4 privé ou le RAY Rising.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-RAY2](https://metalgear.fandom.com/wiki/Metal_Gear_RAY_(unmanned)) ; [W-MGS2](https://metalgear.fandom.com/wiki/Big_Shell_Incident).

### SHAGOHOD — `shagohod`

**MGS3 · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `shagohod_mgs3_ps2_2004` (23 pièces), scène actuelle `p18_mgs3_pont_shagohod`.

**Contrat CQC actuel :** Détruire les deux chenilles, puis la propulsion et le poste de Volgin. Détruire les protections avant la pièce centrale. HP=13100, temps=190 : unités CQC.

Cibles existantes : VIS G (2600HP), VIS D (2600HP), PROPULSION (3000HP), CABINE (4900HP).

**Silhouette / découpe :** Shagohod MGS3 : module avant, deux vis de propulsion, assemblage arrière chenillé, cabine et Volgin. Les vis ne sont pas des chenilles.

**Locomotion / appuis :** Rotation hélicoïdale des vis liée à la translation ; arrière maintenu rigide tant qu’attaché. Décrire poursuite, arrêt et patinage séparément avec poussée et fumée.

**Animations d’attaque :** Acquisition, armement, tir puis recul ; impulsion d’arrêt par impact sur vis, reprise de motricité. En phase Volgin, décharge et éclairage suivent son contact avec la machine.

**Phases / destruction :** Poursuite piste, pont, séparation de module puis Volgin exposé : événements distincts. L’arrière translucide actuel est une présentation CQC, pas une destruction démontrée à l’identique.

**Écart précis :** La fiche dit encore « deux chenilles » bien que les cibles soient VIS G/D. Les pièces sont articulées mais les séquences piste→pont et la destruction réelle nécessitent une spécification continue.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Right-facing master V1 is retained as a documentary orientation reject; only newly generated left-facing component atlas is used.
- Phase2 Volgin, existing electric protection, blocked-screw message and damage effects must remain drawn by the original encounter overlay code.
- Rear opacity exactly follows the existing .42 presentation in phase2; no engine vulnerability, rocket behavior or vehicle speed changes.
- Authored source-led 2D sealing skirt projection, not extracted original model or animation. Absolute1:1 not certified.
- Near and far underside modules independently painted in one left-facing camera, not opposing facing sprites.
- Legacy part IDs retained to avoid new HP pools, while their native textures now depict air-cushion underside rather than wheels.
- Native damage states authored for existing defeat/phase flags; no new destruction event or combat rule.
- Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.
- Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.
- Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.
- Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.
- Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.
- Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.
- Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.
- Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS3](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_3_Walkthrough) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### METAL GEAR RAXA — `raxa`

**PORTABLE OPS · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `raxa_mpo_psp2006` (17 pièces), scène actuelle `mpo_raxa_test_hangar`.

**Contrat CQC actuel :** Briser quatre jambes de test avant de toucher le noyau RAXA. Détruire les protections avant la pièce centrale. HP=10800, temps=180 : unités CQC.

Cibles existantes : APPUI 1 (1500HP), APPUI 2 (1500HP), APPUI 3 (1500HP), APPUI 4 (1500HP), NOYAU (4800HP).

**Silhouette / découpe :** Prototype RAXA de Portable Ops : centre compact, quatre appuis articulés, panneaux/ports d’armes et propulsion. Conserver orientation des jambes vues de la caméra choisie.

**Locomotion / appuis :** Appui quadrupède, flexion coordonnée puis sustentation ; durant le vol, ombre au sol séparée et jambes repliées selon référence, pas téléportation au-dessus du sol.

**Animations d’attaque :** Ouverture des compartiments missile, éjection et fermeture forment une séquence ; protéger les surfaces fermées et rendre lisible la fenêtre ouverte. Tirs/propulseurs à leurs ancrages.

**Phases / destruction :** Dommages aux jambes puis séquence aérienne et attaques par ouvertures ; chute/atterrissage final doit réutiliser les vrais points d’appui.

**Écart précis :** Le dossier actuel simplifie quatre appuis puis noyau ; il ne clôture pas les phases aériennes et les ports de missiles. Le hangar spécifique existe et doit être gardé.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-RAXA](https://metalgear.fandom.com/wiki/Metal_Gear_RAXA) ; [W-MPO](https://www.speedrun.com/mpo/levels).

### ICBMG / METAL GEAR BIC — `bic`

**PORTABLE OPS · P2 · MACHINE_OFFICIELLE_RENCONTRE_CQC_INVENTEE**. Rig `icbmg_mpo_psp2006` (9 pièces), scène actuelle `p18_mpo_silo_lancement_icbmg`.

**Contrat CQC actuel :** Couper trois pinces de lancement avant la fin du compte à rebours. Compte à rebours indépendant. HP=11000, temps=180 : unités CQC.

Cibles existantes : PINCE G (1900HP), PINCE C (1900HP), PINCE D (1900HP), GUIDAGE (5300HP).

**Silhouette / découpe :** ICBMG de Portable Ops : véhicule de lancement et structure déployée de fin, silhouette distincte de RAXA malgré la parenté du projet.

**Locomotion / appuis :** Rester attaché à la mise en scène du silo : déplacement sur rails/élévation et ouverture de dispositifs uniquement s’ils sont visibles dans la séquence source.

**Animations d’attaque :** Compte à rebours, armement du lancement, tirs extérieurs et réaction structurelle selon la cinématique. Toute cible « pince » proposée au joueur est explicitement une mécanique originale.

**Phases / destruction :** Activation, lancement contrarié et résolution de Gene/FOX : séquences cinématiques à distinguer d’un duel jouable imaginaire contre l’ICBMG.

**Écart précis :** Les quatre cibles et le compte à rebours Arsenal forment une simulation CQC. Ne pas la présenter comme le combat de boss original de Portable Ops.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MPO](https://www.speedrun.com/mpo/levels) ; [W-WEAPONS](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)).

### PUPA — `pupa`

**PEACE WALKER · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `pupa_pw_psp2010` (19 pièces), scène actuelle `p18_pw_pupa_operation`.

**Contrat CQC actuel :** Détruire les deux bras électriques puis l’unité mémoire. Détruire les protections avant la pièce centrale. HP=10400, temps=180 : unités CQC.

Cibles existantes : ÉLECTRODE G (2800HP), ÉLECTRODE D (2800HP), MÉMOIRE (4800HP).

**Silhouette / découpe :** Pupa : coque basse blindée sur chenilles, équipements électriques, tourelle/armes et pod IA identifiable.

**Locomotion / appuis :** Déplacement sur bandes de roulement, pivot différentiel puis charge ; suspendre le châssis avec une amplitude sobre et animer les chenilles selon la distance parcourue.

**Animations d’attaque :** Charge électrique, déploiement des éléments et propagation du courant : préparer des sprites de charge, émission, maintien et extinction. Les trajectoires suivent les points au sol du vrai combat.

**Phases / destruction :** Endommager mobilité/équipements, ouvrir accès au pod, destruction puis extraction des cartes IA ; normal, Type II et Custom sont des variantes séparées.

**Écart précis :** Deux électrodes puis mémoire est un contrat de cibles CQC. Comparer aux différents états de Pupa, y compris charge et phase de récupération IA, avant de valider la fidélité.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough).

### CHRYSALIS — `chrysalis`

**PEACE WALKER · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `chrysalis_pw_psp2010` (14 pièces), scène actuelle `p18_pw_chrysalis_operation`.

**Contrat CQC actuel :** Utiliser le radar pour révéler puis abattre les trois rotors et le radar. I : impulsion radar pendant quatre secondes. HP=11300, temps=180 : unités CQC.

Cibles existantes : ROTOR 1 (1800HP), ROTOR 2 (1800HP), ROTOR 3 (1800HP), RADAR (1800HP), POD AI (4100HP).

**Silhouette / découpe :** Chrysalis : appareil volant à trois rotors carénés, corps central, radar, armement et pod IA ; drones Kidnapper comme unités séparées.

**Locomotion / appuis :** Rotor dans son plan de perspective, maintien d’altitude avec petites corrections, déplacement latéral puis inclinaison avant accélération. Ombre et distance au sol cohérentes.

**Animations d’attaque :** Visée, railgun/missiles et lancement/récupération des drones selon mission ; suivre le radar réel plutôt qu’inventer une invisibilité totale. Pales ne pivotent pas à plat dans le plan écran.

**Phases / destruction :** Changer d’état offensif/défensif selon la variante, gérer rotor endommagé et chute sans glissement ; pod et collecte IA après défaite.

**Écart précis :** Le bouton radar de quatre secondes appartient au CQC actuel. Rester explicite sur cette adaptation et vérifier les points faibles réels ainsi que les drones.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough).

### COCOON — `cocoon`

**PEACE WALKER · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `cocoon_pw_psp2010` (24 pièces), scène actuelle `p18_pw_cocoon_operation`.

**Contrat CQC actuel :** Démonter quatre plaques de blindage avant de toucher le pod AI. Détruire les protections avant la pièce centrale. HP=14400, temps=225 : unités CQC.

Cibles existantes : PLAQUE 1 (2100HP), PLAQUE 2 (2100HP), PLAQUE 3 (2100HP), PLAQUE 4 (2100HP), POD AI (6000HP).

**Silhouette / découpe :** Cocoon : forteresse terrestre, volumineuse coque blindée, trains chenillés, niveaux accessibles, armements et pod supérieur.

**Locomotion / appuis :** Translation très lourde avec bandes de chenilles animées ; coque demeure rigide, vibrations d’armes isolées. Échelle suffisamment grande pour différencier pied de joueur, accès et plateforme.

**Animations d’attaque :** Artillerie, mitraillage et attaques de proximité à relever séparément ; ouvrir/fermer équipements seulement d’après référence. L’escalade du joueur et ses contacts ne doivent pas se fondre dans un tir abstrait sur quatre plaques.

**Phases / destruction :** Dommages aux systèmes, accès à la structure, phase de pod et collecte IA. Distinguer normal, Type II, Custom et les phases de fumée/incapacitation.

**Écart précis :** La vue de mine à ciel ouvert existe ; le combat actuel à quatre plaques ne représente pas à lui seul la circulation/verticalité du boss.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough).

### PEACE WALKER / BASILISK — `peacewalker`

**PEACE WALKER · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `peacewalker_pw_psp2010` (17 pièces), scène actuelle `p18_pw_peace_walker_operation`.

**Contrat CQC actuel :** Briser les jambes, interrompre le lancement nucléaire et atteindre le pod mammal. I maintenu au terminal : arrêt du lancement. HP=14800, temps=240 : unités CQC.

Cibles existantes : JAMBE G (3800HP), JAMBE D (3800HP), POD MAMMAL (7200HP).

**Silhouette / découpe :** Peace Walker/Basilisk final : quadrupède, pod/capteurs et groupe d’armes de cette phase ; ne pas renommer le premier bipède.

**Locomotion / appuis :** Marche quadrupède avec séquence d’appui lisible, changement d’axe et pose de lancement ; les quatre pieds gardent leur rôle même si CQC n’expose que deux pools de jambes.

**Animations d’attaque :** Préparation des armes, attaques et interruption du lancement nucléaire ; charge sonore/visuelle avant mouvement, projectile à son tube. Enregistrer séparément coups sur pod et jambes.

**Phases / destruction :** Combat final, compte à rebours, interruption, fausse transmission puis résolution finale du récit ; l’immersion finale n’est pas une animation idle.

**Écart précis :** L’action I au terminal est une règle CQC adaptée. Le nombre de membres visuels, les groupes HP et la chronologie doivent être documentés indépendamment.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough).

### METAL GEAR ZEKE — `zeke`

**PEACE WALKER · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `zeke_pw_psp2010` (22 pièces), scène actuelle `mother_base`.

**Contrat CQC actuel :** Neutraliser le railgun et les missiles dans l’ordre choisi, puis attaquer le cœur AI. Chaque arme détruite retire ses attaques. HP=13400, temps=200 : unités CQC.

Cibles existantes : RAILGUN (3800HP), MISSILES (3200HP), CŒUR AI (6400HP).

**Silhouette / découpe :** ZEKE standard : bipède personnalisable, tête/pod, railgun dorsal, banque de missiles, équipements récupérés. Le duel de Paz utilise son propre assemblage.

**Locomotion / appuis :** Appuis articulés, pas latéral, impulsion propulsée et réception sur le pont ; tenir compte de la hauteur des obstacles et du bord réel de Mother Base.

**Animations d’attaque :** Charge railgun, alignement du tube, tir/recul ; ouverture des trappes missile puis salve et fermeture. Chaque module retiré modifie ce que l’on dessine et les attaques autorisées.

**Phases / destruction :** Duel piloté par Paz, dommages et chute/épilogue ; essais de machine personnalisée séparés. Ne pas décrire le boss de Paz comme une IA autonome générique.

**Écart précis :** Le pont mother_base existe et représente déjà le duel ZEKE. Railgun et missiles ont des travaux de pièces dédiés ; valider la séquence complète et toutes configurations revendiquées, sans déclarer ce stage absent.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Railgun barrel/receiver share one native connected component; runtime rectangles segment the natural joint without pixel editing.
- Source-generated geometry was not perfectly grid aligned; measured native bounds replace assumed cells.
- Disable visibility reads actual existing module HP; there are no invented detached fragments.
- New source-led 2D reconstruction of the standard dorsal power-unit missile bank; original extracted geometry or absolute 1:1 is not certified.
- Six launch caps follow the visible original pose-sheet count. Closed-source art has no separately admitted open-cap interior, hinge, missile-ejection phase or axial reversed camera.
- The bank is rigidly attached to the existing torso support. No independent cap opening, weapon recoil, new HP pool, detached wreckage or nuclear launcher is invented.
- The two-tube nuclear launcher of the separate design study is an alternate configuration replacing the railgun bay; it is not installed on the PSP standard boss.
- The sprite palette follows the standard machine. Hidden underside mounting projection is interpreted; launch-point descriptors identify admitted surface pixels, not an extracted missile animation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough).

### METAL GEAR GANDER — `gander`

**GHOST BABEL · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `gander_ghost_gbc2000` (27 pièces), scène actuelle `p18_ghost_galuade_cellule_gander`.

**Contrat CQC actuel :** Neutraliser les jambes, le canon rail puis le compartiment nucléaire. Détruire les protections avant la pièce centrale. HP=14500, temps=195 : unités CQC.

Cibles existantes : JAMBE G (2700HP), JAMBE D (2700HP), RAILGUN (3300HP), NUCLÉAIRE (5800HP).

**Silhouette / découpe :** GANDER Ghost Babel : jambes, centre, canons jumeaux et modules latéraux. Identifier l’émetteur de flammes sur le corps ; ne pas déplacer ce jet dans la bouche.

**Locomotion / appuis :** Masse stable dans la salle, déplacement et retrait des appuis conformes au combat GBC ; lors d’une posture basse, ne pas allonger artificiellement les segments.

**Animations d’attaque :** Ouverture/fermeture des modules, railguns et projectiles suivent leur rythme source ; flammes et déplacements des drones sont des sprites autonomes. Préparer angles visibles des tourelles.

**Phases / destruction :** Les trois phases originales sont à décomposer avec leurs changements de silhouette et cibles. Maintenir débris/dégâts d’une phase à la suivante.

**Écart précis :** Qualification interne explicite : la présentation ne met pas en œuvre les trois phases canoniques ; deux phases et les pools HP existants demeurent. Le marqueur latéral de feu actuel est une adaptation, pas un placement GBC certifié.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Original canonical three phases are not implemented by this presentation patch. Existing two phases and HP pools remain unchanged.
- Central mouth remains central; the existing right-hand fire target marker is an adaptation, not original GBC target placement.
- Front turrets are original visual structure, not newly destructible HP targets.
- Stomp and adapted fold use presentation-only two-link articulation from native source vectors. Hip lowers by the existing procedural77px fold, foot retracts toward existing28px phase-two support, and actual engine stompLift raises only the existing support target. No independent animation/combat clock or detachable limb is added.
- New art is a faithful best-effort redraw of the official Konami three-quarter concept. It is not an original extracted frame; absolute 1:1 is not certified.
- One admitted source camera is available. Opposite-camera art is not manufactured by mirroring or by renaming another edition.
- Visible native regions are cut along mechanical boundaries. Hidden joint surfaces and movements remain authored 2D adaptations; no 3D volumetric certification is claimed.
- The open faceplate uses an independently generated local appearance. Its small source variation is not an extracted original animation.
- The visible cylindrical leg pods retain encounter flags, but no unsupported new open-door pixels or original third battle phase are invented.
- All original atlases, part IDs, engine HP pools, phase rules, saves and clocks are retained. Canonical metric dimensions for Gander remain unknown.
- Canvas clips can antialias shared seams. Native pixel-center coverage is exact; exact assembled RGBA is measured separately rather than asserted.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-GHOST](https://www.konami.com/mg/archive/ghostbabel/english/prologue.html) ; [W-GANDER](https://metalgear.fandom.com/wiki/Metal_Gear_GANDER).

### METAL GEAR SAHELANTHROPUS — `sahel`

**MGSV · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `sahelanthropus_mgsv2015` (21 pièces), scène actuelle `p18_tpp_afghanistan_sahelanthropus_canyon`.

**Contrat CQC actuel :** Briser les appuis, survivre aux Metallic Archaea et atteindre la tête. Détruire les protections avant la pièce centrale. HP=16300, temps=250 : unités CQC.

Cibles existantes : JAMBE G (3600HP), JAMBE D (3600HP), BOUCLIER (2900HP), TÊTE (6200HP).

**Silhouette / découpe :** Sahelanthropus TPP : grand bipède, tête/capteurs, bras, jambes, coque, armements et dispositif de fouet/lame propre à l’incarnation.

**Locomotion / appuis :** Marche lourde, course/ruée et saut selon séquence ; pied planté sert d’origine de poids, bassin et bras compensent sans tordre les panneaux. Caméra et ombre adaptées à sa taille réelle relative au joueur.

**Animations d’attaque :** Chaque famille d’attaque réclame télégraphe propre : missiles/recherche, railgun et attaque par arme flexible, archaea. Séparer effets de particules, géométrie de collision et sprite de la machine.

**Phases / destruction :** Traque et final doivent rester distincts ; vulnérabilités et effets de destruction persistent. Apparition du Third Child dans la fenêtre narrative n’est pas un point faible permanent inventé.

**Écart précis :** Le rig et canyon existent ; les quatre cibles Arsenal et les animations procédurales ne prouvent ni chaque arme ni la chronologie mission31/50. Mesurer chaque difficulté revendiquée.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Torso source includes an adjacent head contour; runtime torso rect omits that face to avoid a doubled head.
- Original top-mounted railgun is preserved. The existing adapted logical emitter target at low forearm height remains marked by encounter UI; no original placement is claimed.
- Existing whip damaging-volume artwork/telegraphs, phase-red effects and defeat flames must remain separately painted by encounter overlays.
- Unseen joint sockets, damaged module details and 2.5D projection are reconstructions.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-TPP](https://www.konami.com/mg/mgs5/tpp/en/manual/) ; [W-TPP](https://www.trueachievements.com/game/Metal-Gear-Solid-V-The-Phantom-Pain/walkthrough/11).

### RAY — UNMANNED — `ray_mgR`

**REVENGEANCE · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `ray_unmanned_mgr2013` (12 pièces), scène actuelle `p18_mgr_abkhazie_cour_desperado`.

**Contrat CQC actuel :** Deux lames à sectionner, puis une ouverture obtenue par la riposte. I au dernier instant : ouvrir la tête. HP=11000, temps=250 : unités CQC.

Cibles existantes : JAMBE G (2400HP), JAMBE D (2400HP), TÊTE (6200HP).

**Silhouette / découpe :** RAY non piloté Rising : silhouette et armes finales 2013, équipement de plasma/lames propre à Rising ; aucun jet hydraulique MGS2 substitué.

**Locomotion / appuis :** Pose, déplacement par jambes et bond du prologue, interaction avec route/train. Animation sur plusieurs plans et destruction des appuis doivent garder des arcs lisibles.

**Animations d’attaque :** Lames aux bras, plasma, piétinement et missiles selon séquence ; distinguer attaque libre, parade et séquence de découpe où caméra/collisions changent.

**Phases / destruction :** Démembrement et franchissement du train en plusieurs événements, pas un seul écran genoux→tête. Le prompt de riposte CQC est une adaptation contrôlée.

**Écart précis :** Le modèle existe ; le stage Arsenal branché est Abkhazie R01, alors que la rencontre iconique R00 se déroule en Afrique. Créer ce site et ses phases avant déclaration 1:1.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-MGR](https://www.konami.com/mg/archive/mgr/jp/movie/) ; [W-MGR](https://metalgear.fandom.com/wiki/World_Marshal_Incident).

### GRAD — `grad`

**REVENGEANCE · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `grad_mgr2013` (12 pièces), scène actuelle `p18_mgr_world_marshal_esplanade`.

**Contrat CQC actuel :** EMP, plaques de défense et salves de contre-attaque. I : impulsion EMP ; disponible à nouveau après 6,5 secondes. HP=9400, temps=250 : unités CQC.

Cibles existantes : BOUCLIER G (2000HP), BOUCLIER D (2000HP), CENTRE (5400HP).

**Silhouette / découpe :** GRAD : configuration repliée/tourelle puis robot blindé mobile, plaques/boucliers latéraux, canon et articulations.

**Locomotion / appuis :** Déploiement des membres depuis la configuration défensive ; pas pesants, ancrage des pieds et protection frontale. Conserver variante et nombre d’unités selon la rencontre.

**Animations d’attaque :** Canon et missiles depuis les armes, plaques en défense, charge/coup de proximité ; électrocution EMP et durée d’étourdissement doivent être séparées du moteur de sprites.

**Phases / destruction :** Bouclier endommagé, centre exposé puis effondrement et découpe. Séparer rencontre de Guadalajara et réemplois ultérieurs.

**Écart précis :** Rig présent. La scène Arsenal World Marshal est une simulation réutilisée ; manque un rattachement exact Guadalajara pour la rencontre d’origine. Le délai EMP6,5s est une valeur CQC.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-MGR](https://www.konami.com/mg/archive/mgr/jp/movie/) ; [W-MGR](https://metalgear.fandom.com/wiki/World_Marshal_Incident).

### METAL GEAR EXCELSUS — `excelsus`

**REVENGEANCE · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `excelsus_mgr2013` (24 pièces), scène actuelle `pakistan_wreck`.

**Contrat CQC actuel :** Démontage des appuis, deux lames géantes et cœur protégé. Appuis et lames neutralisent les attaques associées. HP=18800, temps=250 : unités CQC.

Cibles existantes : APPUI 1 (1700HP), APPUI 2 (1700HP), APPUI 3 (1700HP), APPUI 4 (1700HP), LAME G (2100HP), LAME D (2100HP), CŒUR (7800HP).

**Silhouette / découpe :** EXCELSUS : plateforme à six membres de support visibles, coque gigantesque et deux lames. Ne pas réduire l’anatomie à quatre jambes car le jeu CQC possède quatre groupes HP.

**Locomotion / appuis :** Déplacement par transfert sur plusieurs appuis ; pied solidaire du tibia, coque lourde et course des lames indépendante. Définir emprise hors écran sans changer l’échelle pendant le contact.

**Animations d’attaque :** Lame préparée en hauteur, descente, balayage/contact puis retrait ; jambes frappant au sol et vagues de Gekkos séparées. Découpe contrôlée en séquences distinctes.

**Phases / destruction :** État complet, appuis/lames neutralisés, coque détruite puis épave servant au duel Armstrong. L’épave existante n’est pas le décor initial de toutes les phases.

**Écart précis :** Le code documente six pieds dessinés pour quatre pools de support : c’est une simplification de gameplay connue, pas une absence de deux sprites. Vérifier transition base intacte→cratère→épave.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.
- Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.
- Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.
- Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.
- Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.
- Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.
- Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.
- Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-MGR](https://www.konami.com/mg/archive/mgr/jp/movie/) ; [W-MGR](https://metalgear.fandom.com/wiki/World_Marshal_Incident).

### KODOQUE — `kodoque`

**AC!D · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `kodoque_acid_psp2004` (23 pièces), scène actuelle `lobito`.

**Contrat CQC actuel :** Gérer le COST et couper les deux émetteurs avant le noyau. COST maximal : attendre sa dissipation. HP=10200, temps=250 : unités CQC.

Cibles existantes : ÉMETTEUR G (2300HP), ÉMETTEUR D (2300HP), NOYAU (5600HP).

**Silhouette / découpe :** KODOQUE AC!D : coque, bras/plastrons protecteurs et émetteurs ; l’intérieur jouable avec Teliko constitue un espace distinct de la silhouette externe.

**Locomotion / appuis :** Pivot et déplacement issus des cases source à traduire en poses ; ce passage en temps réel est une adaptation explicite. Les éléments rigides gardent leurs proportions.

**Animations d’attaque :** Ouverture de protections, charge des émetteurs et tir ; animation de coût/énergie séparée de l’armement. Aucun tir à travers une plaque fermée sans règle annoncée.

**Phases / destruction :** Alterner actions extérieur/intérieur et états endommagés. Version prototype récupérée d’AC!D2 fait une autre fiche, pas une recoloration arbitraire.

**Écart précis :** Deux émetteurs+noyau et COST présents ; le lieu lobito général ne clôture pas la salle FAR ni le rôle intérieur de Teliko. Compléter la vraie structure du combat à deux protagonistes.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Native original dark armor/orange exposed framework replaces current green box study, without changing action-simulation HP or COST mechanics.
- The source upper torso includes a shoulder cap; independent caps overlap matching sockets, not duplicated full shields.
- Original PSP tactical/card encounter is not certified reproduced by the current action simulation.
- Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.
- Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.
- Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.
- Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.
- Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.
- Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.
- Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.
- Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-KODOQUE](https://metalgear.fandom.com/wiki/Metal_Gear_KODOQUE) ; [W-ACID](https://www.supercheats.com/psp/walkthroughs/metalgearacid-walkthrough02.txt).

### CHAIOTH HA QADESH — `chaioth`

**AC!D 2 · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `chaioth_acid2_psp2005` (23 pièces), scène actuelle `saintlogic`.

**Contrat CQC actuel :** Articulations, railgun et noyau. Le COST ralentit la cadence. Articulations, canon, COST. HP=13500, temps=250 : unités CQC.

Cibles existantes : JOINT G (2200HP), JOINT D (2200HP), RAILGUN (2600HP), NOYAU (6500HP).

**Silhouette / découpe :** Chaioth Ha Qadesh AC!D2 : corps, bras/mains et appendices/articulations, arme centrale ; préserver la silhouette singulière, pas un simple REX remaquillé.

**Locomotion / appuis :** Positions et déplacements à référencer par phase ; ouvrir/fermer les doigts avec leur véritable pivot et gérer masques sans trou visible dans les poses extrêmes.

**Animations d’attaque :** Préparation des articulations/armes, charge, tir et retour, effets de cartes hors squelette. Projeter les attaques de la grille avec une convention CQC documentée.

**Phases / destruction :** Découper destruction des parties puis affrontement du corps complet, avec transition de scène si la source en comporte. Les couleurs/énergie suivent le même état entre phases.

**Écart précis :** Le rig possède déjà des articulations et masques de doigts ; le résumé joints/railgun/noyau reste un abrégé. Faire relever les phases d’AC!D2 et le nom réel de chaque organe.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.
- Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.
- Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.
- Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.
- Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.
- Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.
- Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.
- Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-CHAIOTH](https://metalgear.fandom.com/wiki/Metal_Gear_Chaioth_Ha_Qadesh) ; [W-ACID2](https://wikiwiki.jp/mga/MGA2/%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AA%E3%83%BC%E6%94%BB%E7%95%A5).

### ARSENAL GEAR — GW CORE — `arsenal_gear`

**MGS2 · P2 · MACHINE_OFFICIELLE_RENCONTRE_CQC_INVENTEE**. Rig `arsenal_gear_mgs2_ps2_2001` (10 pièces), scène actuelle `arsenal_corridor`.

**Contrat CQC actuel :** Détruire les trois relais GW avant le noyau Patriot. Couper les trois relais avant le cœur de GW. HP=15000, temps=190 : unités CQC.

Cibles existantes : RELAIS GW A (3000HP), RELAIS GW B (3000HP), RELAIS GW C (3000HP), GW CORE (6000HP).

**Silhouette / découpe :** Arsenal Gear : coque immense de forteresse sous-marine ; sections et superstructure rigides. GW est un système informatique, pas un organe de monstre humanoïde.

**Locomotion / appuis :** Déplacement du navire et roulis de l’ensemble uniquement à l’échelle du plan ; aucune flexion de coque. Intérieur jouable dans un autre référentiel.

**Animations d’attaque :** Événements externes, collisions et déplacements de navire documentés séparément ; trois relais à détruire et noyau ne sont pas un boss original à reproduire.

**Phases / destruction :** Intérieurs, rencontre RAY, progression narrative et apparition à Manhattan ont des géographies différentes ; la destruction de relais ne doit pas remplacer le récit source.

**Écart précis :** La machine existe mais le dossier « GW CORE » est une rencontre de simulation créée pour CQC, affichée dans le corridor. Le labelliser et compléter lieux réels si objectif canonique.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.
- Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.
- Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.
- Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.
- Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.
- Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.
- Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.
- Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS2](https://metalgear.fandom.com/wiki/Big_Shell_Incident) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### OUTER HAVEN — SOP CORE — `outer_haven`

**MGS4 · P2 · MACHINE_OFFICIELLE_RENCONTRE_CQC_INVENTEE**. Rig `outer_haven_mgs4_ps3_2008` (11 pièces), scène actuelle `outer_haven`.

**Contrat CQC actuel :** Rompre les relais SOP avant le cœur du système. Désactiver le réseau SOP avant le cœur. HP=15500, temps=195 : unités CQC.

Cibles existantes : SOP RELAY A (3200HP), SOP RELAY B (3200HP), SOP RELAY C (3200HP), SYSTEM CORE (5900HP).

**Silhouette / découpe :** Outer Haven : sous-marin/forteresse MGS4, coque et structures rigides. Le système SOP/GW n’est pas un robot à articulations.

**Locomotion / appuis :** Mouvement d’ensemble limité et parallaxe cohérente ; relier ombre/eau à la coque sans déformation. Les scènes intérieures n’utilisent pas la même échelle.

**Animations d’attaque :** Pour une simulation, annoncer clairement relais et cœur comme règles originales. Pour une reproduction, animer événements attestés, systèmes d’accès et séquence narrative du navire.

**Phases / destruction :** Débarquement, couloir micro-ondes, serveurs et duel au sommet sont quatre étapes distinctes. Des relais détruits dans une vue externe ne prouvent aucune de ces scènes.

**Écart précis :** Le dossier « SOP CORE » est inventé et raccordé au sommet Liquid. Conserver son statut simulation ; produire micro-ondes/serveurs avec leur vrai contexte.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D joint motion; original 3D animations are not extracted and absolute 1:1 is not certified.
- Excelsus six independently drawn feet retain the four existing support HP groups; a foot follows its detached tibia and has no additional HP pool.
- Orthogonal native crop cuts preserve the admitted neutral source geometry. Complementary Chaioth finger masks can have a subpixel antialiasing seam; measured raster tolerance is documented by QA.
- Arsenal Gear and Outer Haven rigid pressure hulls remain rigid. Existing incomplete Arsenal exterior geometry is not filled with invented sections.
- Shagohod screws retain their real long axial projection. True rotating helical phases require independently authored native source images and are not simulated as spinning flat wheels.
- Chaioth gripper finger separation follows the visible admitted source rails; concealed knuckle interiors are not manufactured.
- Weapon aiming is limited to the admitted 2D mount projection; rotations and weight transfers are authored, not extracted original animations.
- Opposite cameras absent from an admitted rig remain absent; no source is mirrored into another incarnation.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS4](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/game-guide/z38c6b).

### BATTLE GEAR — FIELD TRIAL — `battle_gear`

**MGSV · P2 · MACHINE_OFFICIELLE_RENCONTRE_CQC_INVENTEE**. Rig `battle_gear_mgsv2015` (16 pièces), scène actuelle `mother_base_platform`.

**Contrat CQC actuel :** Simulation du prototype lourd de Diamond Dogs. Neutraliser la mobilité et le railgun avant le cockpit. HP=13200, temps=175 : unités CQC.

Cibles existantes : JAMBE G (2600HP), JAMBE D (2600HP), RAILGUN (3000HP), COCKPIT (5000HP).

**Silhouette / découpe :** Battle Gear TPP : prototype lourd développé par Diamond Dogs, châssis et canon distincts des Metal Gear bipèdes.

**Locomotion / appuis :** Animations d’atelier documentées puis démonstrations de terrain marquées originales. Ne pas affirmer une locomotion jouable canonique absente du produit final.

**Animations d’attaque :** Le tir de railgun et les cibles techniques peuvent servir de concept CQC ; chaque cycle préparation→tir→recul doit porter son statut de proposition.

**Phases / destruction :** Inspection atelier, mise en service narrative/dispatch et simulation d’essai séparées ; destruction du cockpit n’est pas un combat officiel livré.

**Écart précis :** Le nom FIELD TRIAL est déjà honnête. Compléter sources d’atelier et silhouette, conserver cette rencontre dans les créations CQC et pas la liste de boss originaux.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-TPP](https://www.konami.com/mg/mgs5/tpp/en/manual/) ; [W-WEAPONS](https://metalgear.fandom.com/wiki/Metal_Gear_(weapon)).

### D-WALKER — COMBAT TEST — `dwalker`

**MGSV · P2 · MACHINE_OFFICIELLE_RENCONTRE_CQC_INVENTEE**. Rig `dwalker_mgsv2015` (12 pièces), scène actuelle `mother_base_platform`.

**Contrat CQC actuel :** Désactiver ses jambes, son arme puis l’unité AI. Démanteler le châssis avant le noyau. HP=9800, temps=145 : unités CQC.

Cibles existantes : JAMBE G (2200HP), JAMBE D (2200HP), ARME (2200HP), AI CORE (3200HP).

**Silhouette / découpe :** D-Walker TPP : petit walker pilotable, selle/poste de pilotage, jambes, roues/roulettes et modules sélectionnables.

**Locomotion / appuis :** Marche, passage rapide sur roues, arrêt, montée/descente du pilote ; ancrer mains/pieds du pilote sur le même rig. Pas d’échelle de Metal Gear géant.

**Animations d’attaque :** Chaque équipement possède posture et origine de tir propres ; bras de mêlée/manipulation selon configuration. Déploiement des éléments sans étirement de sprite.

**Phases / destruction :** Équipement et pilote déterminent la silhouette ; destruction/immobilisation et sortie du pilote séparées. Essai technique CQC à garder identifié.

**Écart précis :** Deux directions admises et dossier d’essai présents. Les modules complets, transitions de mobilité et pilote nécessitent une matrice d’animations ; le noyau IA n’est pas un boss canonique.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-TPP](https://www.konami.com/mg/mgs5/tpp/en/manual/).

### WALKER GEAR COLUMN — `walker_column`

**MGSV · P2 · ENNEMI_OFFICIEL_VAGUES_CQC_ADAPTEES**. Rig `walker_gear_mgsv2015` (13 pièces), scène actuelle `afghan_ruins`.

**Contrat CQC actuel :** Trois Walker Gears arrivent successivement. Neutraliser trois unités successives. HP=9000, temps=175 : unités CQC.

Cibles existantes : JAMBE G (1800HP), JAMBE D (1800HP), CORE (5400HP).

**Silhouette / découpe :** Walker Gear TPP : unité bipède légère à poste ouvert, pilote visible et armement frontal. Trois unités d’une colonne ne sont pas trois espèces de boss.

**Locomotion / appuis :** Pas courts, bassin suspendu, pivot et arrêt ; les pieds prennent le sol avant transfert. Le pilote garde ses prises et réagit aux impacts.

**Animations d’attaque :** Mitraillage de l’armement monté, tir de variante et réaction à l’éjection/extraction du pilote ; laisser la machine vide si le pilote est sorti.

**Phases / destruction :** Unités successives en mode CQC, châssis intact/endommagé/vide puis détruit. Vérifier variantes XOF, armements et patrouilles séparément.

**Écart précis :** Rigs deux faces présents ; trois vagues constituent une composition CQC. Fidélité à vérifier sur pilote, extraction, changement d’arme et posture d’une unité.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-TPP](https://www.konami.com/mg/mgs5/tpp/en/manual/).

### METAL GEAR Mk.II — `mk2`

**MGS4 · P2 · ALLIE_OFFICIEL_ESSAI_CQC_INVENTE**. Rig `mk2_mgs4_ps3_2008` (15 pièces), scène actuelle `outer_haven`.

**Contrat CQC actuel :** Simulation d’entraînement du petit éclaireur. Test technique des modules Mk.II. HP=7200, temps=125 : unités CQC.

Cibles existantes : SHOCK CABLE (1800HP), MANIPULATEUR (1800HP), CORE (3600HP).

**Silhouette / découpe :** Metal Gear Mk.II MGS4 : petit robot d’Otacon, écran/optique, deux jambes/roues, manipulateur et câble électrique.

**Locomotion / appuis :** Marche/roulage, transition d’appuis et arrêt ; échelle près de la cheville d’un humain à mesurer sur image source, pas géant de duel.

**Animations d’attaque :** Déployer câble, contact, arc d’étourdissement puis rétraction ; caméra et manipulateur orientés vers cible. Camouflage comme couche dédiée sans effacer collision.

**Phases / destruction :** Reconnaissance, objet ramassé, contrôle distant interrompu et panne ; aucune phase de boss hostile officielle à inventer sous label canonique.

**Écart précis :** Essai technique disponible, deux faces chargées. Le stage réel Nomad n’est pas fourni par le sommet Outer Haven choisi dans le pont actuel.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Mk.II/Mk.III have one documented multifunction manipulator, not four new weapons. These are native cable poses, gripper components and a service-hull appearance already present in the admitted art.
- The arm endpoints, finger hinges and body sockets are authored on opaque native source pixels. Concealed 3D mount interiors and exact extracted MGS4 animation are unavailable; absolute 1:1 is not certified.
- Native cable appearances switch between two authored projections; their flexible geometry is not falsely represented as extracted continuous deformation.
- The admitted opposite-camera atlases contain the gripper but no cable or open-hull art. Missing opposite-camera service poses remain absent, without mirroring another camera.
- Mk.III retains its separately authored red atlas and the pre-existing colour qualification. No Mk.II source is recoloured into Mk.III.
- Complementary source polygons conserve opaque pixel centres; native Canvas edges can have a measured antialias seam.
- The service hull is available only through an explicit service/repair/inspect pose; this presentation addition does not add an undocumented gameplay action.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS4](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/game-guide/z38c6b).

### METAL GEAR Mk.III — `mk3`

**MGS4 · P2 · ALLIE_OFFICIEL_ESSAI_CQC_INVENTE**. Rig `mk3_mgs4_ps3_2008` (15 pièces), scène actuelle `outer_haven`.

**Contrat CQC actuel :** Simulation de traversée et de défense système. Désactiver le Mk.III module par module. HP=7600, temps=130 : unités CQC.

Cibles existantes : JAMMER (1900HP), MANIPULATEUR (1900HP), CORE (3800HP).

**Silhouette / découpe :** Metal Gear Mk.III MGS4 : modèle distinct du Mk.II, couleur/équipement/antennes selon source ; conserver tailles et pièces qui diffèrent.

**Locomotion / appuis :** Déplacement et bras comme un robot léger, avec les proportions exactes du Mk.III. Les animations partagées peuvent être une base seulement si les ancrages correspondent.

**Animations d’attaque :** Interactions techniques, caméra et équipement attesté ; toute fonction « jammer » du dossier exige confirmation par la source, pas assimilation automatique à une arme de boss.

**Phases / destruction :** Reconnaissance et vulnérabilité narrative propres à Mk.III ; simuler défaite technique sans inventer un affrontement canonique Snake contre Otacon.

**Écart précis :** Deux faces et dossier existants. Contrôler les labels JAMMER/AI ainsi que le contexte de scène choisi ; statut d’exercice à garder visible.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Mk.II/Mk.III have one documented multifunction manipulator, not four new weapons. These are native cable poses, gripper components and a service-hull appearance already present in the admitted art.
- The arm endpoints, finger hinges and body sockets are authored on opaque native source pixels. Concealed 3D mount interiors and exact extracted MGS4 animation are unavailable; absolute 1:1 is not certified.
- Native cable appearances switch between two authored projections; their flexible geometry is not falsely represented as extracted continuous deformation.
- The admitted opposite-camera atlases contain the gripper but no cable or open-hull art. Missing opposite-camera service poses remain absent, without mirroring another camera.
- Mk.III retains its separately authored red atlas and the pre-existing colour qualification. No Mk.II source is recoloured into Mk.III.
- Complementary source polygons conserve opaque pixel centres; native Canvas edges can have a measured antialias seam.
- The service hull is available only through an explicit service/repair/inspect pose; this presentation addition does not add an undocumented gameplay action.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS4](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/game-guide/z38c6b).

### GEKKO ASSAULT — `gekko`

**MGS4 · P2 · ENNEMI_OFFICIEL_VAGUES_CQC_ADAPTEES**. Rig `gekko_mgs4_ps3_2008` (10 pièces), scène actuelle `middle_east`.

**Contrat CQC actuel :** Briser les jambes organiques avant la tête. Couper la mobilité avant le module de tête. HP=10500, temps=150 : unités CQC.

Cibles existantes : JAMBE G (2600HP), JAMBE D (2600HP), TÊTE (5300HP).

**Silhouette / découpe :** Gekko MGS4 : tête/coque mécanique et longues jambes organiques à musculature visible ; ne pas recouvrir les membres de charnières métalliques inventées.

**Locomotion / appuis :** Charge du poids sur jambe, flexion biologique, balancement de coque puis pose ; saut et atterrissage avec amorti. Les cris sont des événements audio associés à poses.

**Animations d’attaque :** Coup de pied, mitraillage et arme de variante selon source. Traînée de jambe/sang organique séparée des étincelles de coque ; préparer attaques de suicide uniquement pour ce modèle.

**Phases / destruction :** Dommage organique, chute, redressement éventuel, neutralisation/découpe. Versions suicide, missile et MGR demeurent trois identités propres.

**Écart précis :** Gekko de base et variantes deux faces existent ; certaines vieilles notes left-only sont périmées. Vérifier plutôt la séparation organique/mécanique et les armes de chaque variante.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS4](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/game-guide/z38c6b) ; [K-MGR](https://www.konami.com/mg/archive/mgr/jp/movie/).

### DWARF GEKKO SWARM — `dwarf_swarm`

**MGS4 · P2 · ENNEMI_OFFICIEL_VAGUES_CQC_ADAPTEES**. Rig `dwarf_gekko_mgs4_ps3_2008` (11 pièces), scène actuelle `outer_haven`.

**Contrat CQC actuel :** Quatre groupes de Dwarf Gekkos verrouillent le conduit. Nettoyer quatre vagues de petites unités. HP=6400, temps=145 : unités CQC.

Cibles existantes : NŒUD G (1200HP), NŒUD D (1200HP), CONTROL UNIT (4000HP).

**Silhouette / découpe :** Dwarf Gekko : sphère centrale et trois bras préhensiles par unité ; groupe distinct des assemblages trenchcoat et humanoïde.

**Locomotion / appuis :** Roulement puis pose sur mains, grimpe et saut ; rotation de la sphère ne doit pas détacher arbitrairement les bras. Garder le nombre d’unités réel de chaque composition.

**Animations d’attaque :** Saisie, tir/impulsion et rassemblement selon source ; les bras se plient autour de leurs pivots, pas comme jambes humaines. Chaque robot a sa collision.

**Phases / destruction :** Destruction unitaire puis renouvellement de vague. Trenchcoat = trois robots et humanoïde MGR = deux ; ces ensembles ne possèdent pas un corps humain caché.

**Écart précis :** Le dossier à quatre groupes est CQC ; formes composites et faces sont déjà dans les 64 rigs. Compléter le déplacement autonome par unité et leur désassemblage.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS4](https://www.gamepressure.com/metalgearsolid4gunsofthepatriots/game-guide/z38c6b) ; [K-MGR](https://www.konami.com/mg/archive/mgr/jp/movie/).

### HIND D — `hind_d`

**MGS1 · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `hind_d_mgs1_ps1_1998` (11 pièces), scène actuelle `shadow_heliport`.

**Contrat CQC actuel :** Abattre le rotor, le moteur puis le cockpit. Détruire la propulsion avant le cockpit. HP=11800, temps=165 : unités CQC.

Cibles existantes : ROTOR (3000HP), MOTEUR (3500HP), COCKPIT (5300HP).

**Silhouette / découpe :** Hind D de Liquid MGS1 : cockpit double, fuselage, ailes courtes, pods, rotor principal et rotor anticouple.

**Locomotion / appuis :** Stationnaire, translation et passe latérale avec pivot de la cellule limité par les vues disponibles. Rotor principal en perspective, rotor arrière dans son plan vertical ; air/snowwash distinct.

**Animations d’attaque :** Passes, mitraillage et roquettes depuis les vrais équipements ; annonce de l’arrivée par position/son. Feux de bouche, fumée et réactions d’impact ne masquent pas la cible au mauvais moment.

**Phases / destruction :** Baisse d’altitude, fumée, retrait temporaire et chute finale ; phase de destruction doit conserver rotor/cellule et sens de gravité.

**Écart précis :** Rig présent, mais pont scénique actuel sur héliport au lieu du toit Communications Tower. Les phases de rotor admises sont limitées et la visée doit être vérifiée sur cette perspective.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D articulation; original game animations and 3D models are not extracted. Absolute 1:1 is not certified.
- Hind and M1 historical source rectangles selected armor/engine panels as rocket pods or machine gun; corrected regions now use the actual visible equipment from the same untouched atlases.
- Hind and Hammerhead horizontal rotors use their admitted native perspective phases. No horizontal rotor is rotated in the screen plane; the Hind tail rotor alone rotates in its visible vertical plane.
- M1 cannon and Hammerhead barrels recoil along their actual projected source axes beneath fixed/aiming receivers. Turret azimuth and hidden breech volumes are not fabricated from flat textures.
- Harrier native nozzles and complete movable tailplanes use visible sockets. No unseparated wing flap or hidden fan is manufactured.
- M1 and bulldozer complete track silhouettes remain rigid. Independently authored tread/wheel phases are still required for authentic track circulation.
- Bulldozer blade modules remain rigid projected hydraulic assemblies; hidden linkage is not certified. Its historical roof ID selected a misplaced actuator; the ID now owns the complementary visible upper casing pixels of the original hull. This rigid source partition is not a newly invented independent canonical moving roof; the original actuator remains in the untouched atlas and historical catalogs.
- Virgil casing, pedestal and lamp remain a rigid terminal; an unsupported flat swing of its cylindrical doors is not used.
- Cunningham remains the admitted frontal platform. Its opposite/rear projection and unverified propulsion are not invented.
- New separation pieces retain existing damage groups through attached snapshots; no additional HP pool, attack clock or projectile is introduced.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS1](https://metalgear.fandom.com/wiki/Shadow_Moses_Island) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### M1 TANK — `m1tank`

**MGS1 · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `m1_mgs1_ps1_1998` (8 pièces), scène actuelle `shadow_heliport`.

**Contrat CQC actuel :** Immobiliser les chenilles puis détruire la tourelle. Immobiliser le char avant la tourelle. HP=10200, temps=145 : unités CQC.

Cibles existantes : CHENILLE G (2400HP), CHENILLE D (2400HP), TOURELLE (5400HP).

**Silhouette / découpe :** M1 de Vulcan Raven MGS1 : coque, deux chenilles, tourelle, canon et trappe avec opérateur ; distinguer blindé de MG1 et chars PW.

**Locomotion / appuis :** Rotation des bandes et roues liée à vitesse, braquage différentiel, suspension de caisse et rotation de tourelle autour de son axe vertical réel.

**Animations d’attaque :** Alignement canon, recul axial, retour et fumée ; mitrailleur/trappe, grenade introduite et réaction équipage sont des animations propres.

**Phases / destruction :** La rencontre source cible l’équipage/grenades et ses dispositifs ; la destruction chenilles→tourelle est une simplification CQC. Gérer trappe ouverte/fermée et fumée persistante.

**Écart précis :** Les chenilles du rig sont actuellement rigides selon qualification. Stage actuel héliport à remplacer par canyon pour le mode fidèle ; ne pas annoncer que le char entier est absent.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D articulation; original game animations and 3D models are not extracted. Absolute 1:1 is not certified.
- Hind and M1 historical source rectangles selected armor/engine panels as rocket pods or machine gun; corrected regions now use the actual visible equipment from the same untouched atlases.
- Hind and Hammerhead horizontal rotors use their admitted native perspective phases. No horizontal rotor is rotated in the screen plane; the Hind tail rotor alone rotates in its visible vertical plane.
- M1 cannon and Hammerhead barrels recoil along their actual projected source axes beneath fixed/aiming receivers. Turret azimuth and hidden breech volumes are not fabricated from flat textures.
- Harrier native nozzles and complete movable tailplanes use visible sockets. No unseparated wing flap or hidden fan is manufactured.
- M1 and bulldozer complete track silhouettes remain rigid. Independently authored tread/wheel phases are still required for authentic track circulation.
- Bulldozer blade modules remain rigid projected hydraulic assemblies; hidden linkage is not certified. Its historical roof ID selected a misplaced actuator; the ID now owns the complementary visible upper casing pixels of the original hull. This rigid source partition is not a newly invented independent canonical moving roof; the original actuator remains in the untouched atlas and historical catalogs.
- Virgil casing, pedestal and lamp remain a rigid terminal; an unsupported flat swing of its cylindrical doors is not used.
- Cunningham remains the admitted frontal platform. Its opposite/rear projection and unverified propulsion are not invented.
- New separation pieces retain existing damage groups through attached snapshots; no additional HP pool, attack clock or projectile is introduced.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-MGS1](https://metalgear.fandom.com/wiki/Shadow_Moses_Island) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### ARMORED BULLDOZER — `bulldozer`

**METAL GEAR · P2 · BOSS_OFFICIEL_ADAPTE**. Rig `bulldozer_mg1_msx1987` (7 pièces), scène actuelle `outer_heaven`.

**Contrat CQC actuel :** Détruire les vérins, la lame puis le moteur. Neutraliser l’hydraulique avant le moteur. HP=9400, temps=135 : unités CQC.

Cibles existantes : CHENILLE PROCHE (1900HP), CHENILLE LOINTAINE (1900HP), LAME (2200HP), CHÂSSIS (3400HP).

**Silhouette / découpe :** Bulldozer blindé MSX : caisse, bandes chenillées et lame frontale avec vérins. Pas de pilote/fonction d’arme non visible inventés.

**Locomotion / appuis :** Avance dans le couloir et pression de la lame, chenilles cyclées avec vitesse. Si la lame se lève, vérins et charnières gardent longueur et axe.

**Animations d’attaque :** Attaque par progression/écrasement, réaction aux armes source et blocage ; impact au contact de lame, pas explosion de bouche de canon.

**Phases / destruction :** Arrêt, destruction et dégagement du passage ; préserver largeur/longueur de salle dans l’adaptation 2D.

**Écart précis :** Chenilles encore rigides. Ancien texte SHADOW MOSES—BLAST FURNACE du DATA est obsolète ; pont runtime le remplace déjà par SIMULATION—OUTER HEAVEN. Nettoyage de métadonnée, pas nouveau bug visuel prouvé.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- Source-led projected 2D articulation; original game animations and 3D models are not extracted. Absolute 1:1 is not certified.
- Hind and M1 historical source rectangles selected armor/engine panels as rocket pods or machine gun; corrected regions now use the actual visible equipment from the same untouched atlases.
- Hind and Hammerhead horizontal rotors use their admitted native perspective phases. No horizontal rotor is rotated in the screen plane; the Hind tail rotor alone rotates in its visible vertical plane.
- M1 cannon and Hammerhead barrels recoil along their actual projected source axes beneath fixed/aiming receivers. Turret azimuth and hidden breech volumes are not fabricated from flat textures.
- Harrier native nozzles and complete movable tailplanes use visible sockets. No unseparated wing flap or hidden fan is manufactured.
- M1 and bulldozer complete track silhouettes remain rigid. Independently authored tread/wheel phases are still required for authentic track circulation.
- Bulldozer blade modules remain rigid projected hydraulic assemblies; hidden linkage is not certified. Its historical roof ID selected a misplaced actuator; the ID now owns the complementary visible upper casing pixels of the original hull. This rigid source partition is not a newly invented independent canonical moving roof; the original actuator remains in the untouched atlas and historical catalogs.
- Virgil casing, pedestal and lamp remain a rigid terminal; an unsupported flat swing of its cylindrical doors is not used.
- Cunningham remains the admitted frontal platform. Its opposite/rear projection and unverified propulsion are not invented.
- New separation pieces retain existing damage groups through attached snapshots; no additional HP pool, attack clock or projectile is introduced.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [W-TX55](https://metalgear.fandom.com/wiki/TX-55_Metal_Gear) ; [K-MANUELS](https://metalgear.konami.net/manual/mc1/en/index.html).

### PEACE WALKER — PREMIÈRE BATAILLE — `peacewalker_biped`

**PEACE WALKER · P1 · BOSS_OFFICIEL_ADAPTE**. Rig `peacewalker_biped_pw_psp2010` (25 pièces), scène actuelle `p18_pw_cocoon_operation`.

**Contrat CQC actuel :** Faire plier les appuis du Basilisk et atteindre le module IA. Éviter le pied annoncé et sortir du jet du lance-flammes arrière. Piétinement annoncé · lance-flammes arrière. HP=12800, temps=210 : unités CQC.

Cibles existantes : GENOU PROCHE (3200HP), GENOU LOINTAIN (3200HP), POD IA (6400HP).

**Silhouette / découpe :** Premier Peace Walker bipède : deux appuis porteurs, membres avant repliés, capteur sphérique et pod cylindrique. Ne pas attribuer arbitrairement un nom Mammal/Reptile au cylindre visible.

**Locomotion / appuis :** Transfert de poids entre deux jambes, pied levé annoncé, pose lourde et amorti ; appui planté conservé lors de l’orientation du châssis.

**Animations d’attaque :** Lance-flammes arrière : préparation, ignition à la buse, jet continu, extinction ; stomp : compression, levée, descente, impact et récupération. Mines S, missiles et hurlement à relever avant ajout.

**Phases / destruction :** Première bataille autonome puis fuite/transition et présence de l’hélicoptère de Coldman à documenter. Ne pas la convertir en transformation de la bataille finale.

**Écart précis :** Le rig 25 pièces et deux attaques existent. Qualification du code : caméra inverse, mines S, missiles, hurlement, poursuite, hélicoptère et géographie complète restent non admis. Pont de scène réutilise la mine Cocoon.

**Collision / échelle :** Mesurer taille relative machine/joueur/sol dans une capture de cette édition. Les HP, rayons, secondes et groupes de pièces ci-dessus sont des paramètres CQC, pas des mesures canoniques. Donner une hurtbox par cible visible, une collision de corps distincte, et désactiver la hitbox d’une arme détruite uniquement si sa règle l’exige.

**Réserves techniques du rig :**
- The upright biped is a separate first-battle dossier, not a transformation during the final quadrupedal nuclear launch.
- Reference-led generated RGBA reconstruction from original concept/CG and licensed model views; no extracted model or absolute1:1 certification.
- Visible sphere is labelled CAPTEUR and visible cylinder POD IA. Exact Reptile/Mammal allocation of the visible cylinder is not asserted from this camera.
- One coherent three-quarter source camera; rear placement and hidden joint seams are interpreted. Independent reverse camera remains absent.
- The 25m bipedal height is a secondary citation. Source perspective, tiny details and human-scale projection remain best-effort adaptations.
- Native source pixel centers are partitioned without loss/duplication. Canvas anti-aliasing on animated clipping boundaries is measured independently.
- Only native aft flamethrower and planted support stomp are admitted to this encounter. Precise S-mine/missile launch ports and howl remain to implement with source references.
- First-battle pursuit into quadrupedal form, Coldman helicopter and the full original mission geography/cinematic remain pending. No fabricated transition is triggered.
- Folded front limbs remain rigid source-visible assemblies; their concealed linkage surfaces are not separately reconstructed.
- Near white knee actuator belongs to the mobile thigh; its former static hull fragment is reassigned with complementary native clips. Hidden joint surfaces remain interpreted.
- Knee disable and supported crouch are authored CQC presentation responses. No unsupported limb dismemberment or new biological AI claim is introduced.

**Preuves :** [public/cqc/modules/arsenal-files-v044.html](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/arsenal-files-v044.html) ; [public/cqc/src/cqc-pass27-arsenal-native-scenes.js](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass27-arsenal-native-scenes.js) ; [K-PW](https://www.konami.com/mg/archive/mgs_pw/jp/lineup/item.html) ; [W-PW](https://strategywiki.org/wiki/Metal_Gear_Solid%3A_Peace_Walker/Walkthrough).
