# CQC — état des sources avant P61

Instantané du 25 novembre 2026, dépôt `darknigthmare/shadow-codec-ops`, commit [`2e2864e`](https://github.com/darknigthmare/shadow-codec-ops/commit/2e2864e3cba653c10727113f574ec1107c274e41).

Cet audit confronte les listes historiques aux fichiers réellement inscrits dans l’arbre Git. Il distingue les images, leurs utilisations en jeu et les périmètres qui demandent encore une définition précise. Une présence dans l’arbre ne certifie pas la fidélité 1:1.

## Compteurs vérifiés

| Catégorie | Périmètre | Sources établies | Reste constaté |
|---|---:|---:|---|
| Catalogue personnages/costumes | 3399 lignes / 384 incarnations | 3381 lignes | 6 tenues officielles sans source, 11 lignes sous garde, 1 alias d’époque résolu par un Original distinct |
| Concept original hors galerie sélectionnée | 1 fiche | 0 | Raven « Expédition polaire », garde historique |
| Extension roster/dossiers | 87 périmètres | 4 rapprochements | 83 périmètres à qualifier ; plusieurs sont des groupes, éditions ou dossiers |
| Compléments de stages | 113 périmètres | 25 | 88 sans source dédiée établie |
| Compléments machines | 54 périmètres | 25 avec source pertinente | 29 sans correspondance dédiée établie |
| Projectiles et VFX | 64 effets natifs / 8 atlas / 256 frames | Sources des 64 effets présentes | 3 projectiles et 1 VFX utilisent encore un alias sans dessin dédié |

**P60 conservé : 40 images sélectionnées — 18 stages, 20 machines et 2 costumes — plus 2 versions rejetées.** Le manifeste runtime hérité contient 3 009 fichiers. Les 40 sources P60 ne constituent pas 40 admissions au gameplay.

Les 382 Originals P52 et les deux nouveaux corps P54 possèdent une source. Cela ne signifie pas que la liste des personnages de toute la franchise est complète : le registre d’extension ci-dessous reste ouvert.

Le total de 3 399 comprend P52 + les 21 poses P54 + les 14 poses P55. Les deux costumes P60 remplissent des lignes P52 déjà prévues. Le concept Raven non sélectionné reste séparé : il ne disparaît pas du suivi.

## Personnages et ennemis — tous les périmètres hérités

| ID | Opus | Identité ou groupe | État rapproché |
|---|---|---|---|
| R-MG1-01 | MG MSX | Frère de Jennifer | Source dédiée non établie |
| R-MG1-02 | MG MSX | Faux Dr Madnar | Source dédiée non établie |
| R-MG1-03 | MG MSX / NES | Gardes d’Outer Heaven et chiens de garde | Groupe/variantes à détailler |
| R-MG1-04 | MG NES — manuel localisé | Commander South / Vermon CaTaffy | Dossier, corps visuel non établi |
| R-MG2-01 | MG2 | Enfants de Zanzibar | Groupe/variantes à détailler |
| R-MG2-02 | MG2 | Four Horsemen — quatre membres | Groupe/variantes à détailler |
| R-MGS1-nbc | MGS1 | Genome NBC | Source présente, périmètre limité |
| R-MGS1-light | MGS1 | Genome léger | Groupe/variantes à détailler |
| R-MGS1-arctic | MGS1 | Genome arctique | Source présente, périmètre limité |
| R-MGS1-heavy | MGS1 | Genome lourd | Groupe/variantes à détailler |
| R-MGS1-VR | MGS1 Integral / VR Missions | Gray Fox — missions Ninja | Édition/identité à qualifier |
| R-TTS-campbell | The Twin Snakes | Campbell | Édition/identité à qualifier |
| R-TTS-naomi | The Twin Snakes | Naomi | Édition/identité à qualifier |
| R-TTS-mei-ling | The Twin Snakes | Mei Ling | Édition/identité à qualifier |
| R-TTS-nastasha | The Twin Snakes | Nastasha | Édition/identité à qualifier |
| R-TTS-miller-liquid-d-guis | The Twin Snakes | Miller / Liquid déguisé | Édition/identité à qualifier |
| R-TTS-donald-anderson-decoy | The Twin Snakes | Donald Anderson / Decoy | Édition/identité à qualifier |
| R-TTS-kenneth-baker | The Twin Snakes | Kenneth Baker | Édition/identité à qualifier |
| R-TTS-jim-houseman | The Twin Snakes | Jim Houseman | Édition/identité à qualifier |
| R-MGS2-01 | MGS2 / MPO+ | Hi-Tech Soldier | Source présente, périmètre limité |
| R-MGS2-02 | MGS2 | Marines du Tanker | Source dédiée non établie |
| R-MGS2-03 | MGS2 | Otages du Shell 1 | Groupe/variantes à détailler |
| R-MGS2-04 | MGS2 | Rose réelle / interface IA | Édition/identité à qualifier |
| R-MGS2-05 | MGS2 Substance | Meryl — Snake Tales | Édition/identité à qualifier |
| R-MGS3-kgb | MGS3 / Delta | Gardes du KGB | Groupe/variantes à détailler |
| R-MGS3-gru | MGS3 / Delta | GRU standard | Groupe/variantes à détailler |
| R-MGS3-scientist | MGS3 / Delta | Scientifiques de Groznyj Grad | Groupe/variantes à détailler |
| R-MGS3-president | MGS3 / Delta | Président des États-Unis — cérémonie | Source dédiée non établie |
| R-MGS3-cia | MGS3 / Delta | Directeur de la CIA | Source dédiée non établie |
| R-MGS3-khrushchev | MGS3 / Delta | Nikita Khrouchtchev — interlocuteur | Source dédiée non établie |
| R-MGS3-GUY | MGS3 PS2 | Guy Savage — version PS2 | Édition/identité à qualifier |
| R-MGS3-MONKEY | MGS3 / Delta — Snake vs Monkey | Pipo Monkeys | Source dédiée non établie |
| R-3DS-01 | Snake Eater 3D | Naked Snake — présentation 3DS | Édition/identité à qualifier |
| R-DELTA-FOX | Delta — FOX HUNT | Opérateurs / avatars FOX HUNT | Source dédiée non établie |
| R-MPO-soviet | Portable Ops / Plus | Soldats soviétiques — hommes/femmes | Groupe/variantes à détailler |
| R-MPO-ocelot | Portable Ops / Plus | Ocelot Unit — hommes/femmes | Groupe/variantes à détailler |
| R-MPO-medical | Portable Ops / Plus | Médecins, scientifiques et officiers recrutables | Groupe/variantes à détailler |
| R-MPO-regional | Portable Ops / Plus | Soldats régionaux et promotionnels MPO+ | Groupe/variantes à détailler |
| R-MPO-GUEST | Portable Ops Plus | Invités de jeux antérieurs | Groupe/variantes à détailler |
| R-PW-PS | Peace Walker | Peace Sentinel — classes d’ennemis | Groupe/variantes à détailler |
| R-PW-FSLN | Peace Walker | Guérilleros sandinistes | Groupe/variantes à détailler |
| R-PW-TRENYA | Peace Walker — Monster Hunter | Trenya | Source dédiée non établie |
| R-HIDEO-peace-walker | Peace Walker | Hideo — incarnation de jeu | Source dédiée non établie |
| R-HIDEO-ground-zeroes | Ground Zeroes | Hideo — incarnation de jeu | Source dédiée non établie |
| R-HIDEO-the-phantom-pain | The Phantom Pain | Hideo — incarnation de jeu | Source dédiée non établie |
| R-GZ-camp | Ground Zeroes | Gardes du camp Omega | Source dédiée non établie |
| R-GZ-jcs | Ground Zeroes | Agent du JCS | Source dédiée non établie |
| R-GZ-dod | Ground Zeroes | Agent du Department of Defense | Source dédiée non établie |
| R-GZ-prisoner | Ground Zeroes | Prisonniers des missions annexes | Source dédiée non établie |
| R-GZ-SNATCH | Ground Zeroes — Jamais Vu | Body Snatchers / Raiden bonus | Édition/identité à qualifier |
| R-TPP-PEQ | The Phantom Pain | Pequod | Source présente, périmètre limité |
| R-TPP-QUE | The Phantom Pain | Queequeg | Source dédiée non établie |
| R-TPP-doctor | The Phantom Pain | Médecin de l’hôpital | Groupe/variantes à détailler |
| R-TPP-nurse | The Phantom Pain | Infirmière de l’hôpital | Groupe/variantes à détailler |
| R-TPP-patients | The Phantom Pain | Patients et personnel de l’hôpital | Groupe/variantes à détailler |
| R-TPP-interpreters | The Phantom Pain | Interprètes russophone/afrikaans/kikongo | Groupe/variantes à détailler |
| R-TPP-targets | The Phantom Pain | Commandants, ingénieurs, marchands et prisonniers de missions | Groupe/variantes à détailler |
| R-TPP-children | The Phantom Pain | Enfants de la troupe d’Eli / Mbele | Groupe/variantes à détailler |
| R-TPP-pf | The Phantom Pain | Soldats soviétiques et forces privées africaines | Groupe/variantes à détailler |
| R-TPP-dd | The Phantom Pain | Personnel Diamond Dogs — femmes et hommes | Groupe/variantes à détailler |
| R-MGS4-rebelme | MGS4 | Rebelles du Moyen-Orient | Groupe/variantes à détailler |
| R-MGS4-rebelsa | MGS4 | Rebelles sud-américains | Groupe/variantes à détailler |
| R-MGS4-resistance | MGS4 | Résistant d’Europe de l’Est | Groupe/variantes à détailler |
| R-MGS4-pmc | MGS4 | PMC — classes et équipements | Groupe/variantes à détailler |
| R-MGS4-littlejohn | MGS4 | Little John | Groupe/variantes à détailler |
| R-MGR-standard | Revengeance | Cyborg Desperado standard | Source dédiée non établie |
| R-MGR-armored | Revengeance | Cyborgs blindés / variantes de commandement | Source dédiée non établie |
| R-MGR-berserker | Revengeance | Berserkers et utilisateurs d’armes lourdes | Source dédiée non établie |
| R-MGR-police | Revengeance | Forces de sécurité / police de Denver | Source dédiée non établie |
| R-MGR-scientist | Revengeance | Scientifique de la séquence du laboratoire | Source dédiée non établie |
| R-MGR-soldier | Revengeance | Soldats humains de la séquence R-00 | Source dédiée non établie |
| R-GB-no4 | Ghost Babel | No. 4 | Dossier, corps visuel non établi |
| R-GB-smith | Ghost Babel | Lieutenant Smith | Dossier, corps visuel non établi |
| R-GB-parker | Ghost Babel | John Parker | Dossier, corps visuel non établi |
| R-GB-gardner | Ghost Babel | Steve Gardner | Dossier, corps visuel non établi |
| R-GB-weah | Ghost Babel | William Weah | Dossier, corps visuel non établi |
| R-GB-brother | Ghost Babel | Frère de Weasel | Dossier, corps visuel non établi |
| R-ACID-HAROLD | AC!D | Harold Burton | Dossier, corps visuel non établi |
| R-ACID-DECOY | AC!D | Faux Flemming | Édition/identité à qualifier |
| R-ACID-GUARDS | AC!D / AC!D 2 | Soldats de Genetics / mercenaires de Leone / personnels SaintLogic | Groupe/variantes à détailler |
| R-SURVIVE-harley-warren | Survive | Harley Warren | Dossier, corps visuel non établi |
| R-SURVIVE-joel-marton | Survive | Joel Marton | Dossier, corps visuel non établi |
| R-SURVIVE-AVATAR | Survive | Captain — avatar féminin/masculin et apparences personnalisées | Groupe/variantes à détailler |
| R-MGO1 | MGO1 | Avatars, classes et personnages uniques | Groupe/variantes à détailler |
| R-MGO2 | MGO2 | Avatars, classes et personnages uniques | Groupe/variantes à détailler |
| R-MGO3 | MGO3 | Avatars, classes et personnages uniques | Groupe/variantes à détailler |
| R-SIDE-CATALOG | Mobile / Touch / Arcade / Social Ops / AC!D Mobile | Ennemis et variantes de ces versions | Groupe/variantes à détailler |

## Costumes restant sans source dans le catalogue

| ID | Tenue | État |
|---|---|---|
| costume:core__eva_mgs3:cyborg | EVA — MGS3 — Châssis cybernétique | Garde historique |
| costume:core__fear:cyborg | THE FEAR — Châssis cybernétique | Garde historique |
| costume:roster51__eva_delta:cyborg | EVA — DELTA — Châssis cybernétique | Garde historique |
| costume:roster51__fear_delta:cyborg | THE FEAR — DELTA — Châssis cybernétique | Garde historique |
| costume:roster51__end_delta:metalgear | THE END — DELTA — Metal Gear | Garde historique |
| costume:npc53__tatyana_mgs3:cyborg | TATYANA — Châssis cybernétique | Garde historique |
| costume:core__mistral:official--two-arm-configuration | MISTRAL — Configuration à deux bras — sans bras Dwarf Gekko | Garde historique |
| costume:roster51__volgin_delta:official--shirtless-battle | VOLGIN — DELTA — Torse nu — combat | Source absente |
| costume:archive__virgil_at9:official--deployed | VIRGIL AT-9 — Configuration déployée — pod ouvert | Source absente |
| costume:archive__raiden_vr:official--x-raiden-substance | RAIDEN — VR — X Raiden, mode d’évasion | Garde historique |
| costume:core__kaz_pw:official--swimsuit | KAZUHIRA MILLER — MSF — Maillot — Date with Kaz | Garde historique |
| costume:completion44__diamond_dogs_scout_44:official--tactical-vest | DIAMOND DOGS SCOUT — Équipement tactique — gilet et casque | Source absente |
| costume:core__amanda_pw:official--injured-recovery | AMANDA VALENCIANO LIBRE — Blessure et convalescence | Source absente |
| costume:archive__paz:official--swimsuit | PAZ ORTEGA ANDRADE — Maillot — Date with Paz | Garde historique |
| costume:archive__paz:official--zeke-pilot | PAZ ORTEGA ANDRADE — Tenue du final — pilote de ZEKE | Garde historique |
| costume:completion44__xof_trooper_44:official--hospital-raid | XOF TROOPER — Assaut de l’hôpital | Alias d’époque, Original séparé présent |
| costume:core__snake_acid2:official--epilogue-bandages | SNAKE — AC!D 2 — Épilogue — convalescence bandée | Source absente |
| costume:core__old_snake:official--octocamo-digital-red | OLD SNAKE — OctoCamo — Digital Red | Source absente |
| costume:core__raven:original-concept:oc-002 | Vulcan Raven — Expédition polaire | Garde historique |

## Stages — tous les compléments hérités

| ID | Opus | Nom | État rapproché |
|---|---|---|---|
| stage:mgs1_cargo_dock | MGS1 | Cargo Dock | Source dédiée non établie |
| stage:mgs1_canyon_m1 | MGS1 | Canyon — combat du M1 | Adaptation antérieure présente |
| stage:mgs1_tower_hind | MGS1 | Toit de Communications Tower — Hind D | Adaptation antérieure présente |
| stage:mgs1_first_wolf | MGS1 | Underground Passage — premier duel Sniper Wolf | Source dédiée non établie |
| stage:mgs1_blast_furnace | MGS1 | Blast Furnace | Source dédiée non établie |
| stage:mgs1_cargo_elevator | MGS1 | Cargo Elevator | Source dédiée non établie |
| stage:mgs1_wolf_cave | MGS1 | Cave — loups | Source dédiée non établie |
| stage:mgs1_jeep_escape | MGS1 | Supply Route — fuite en jeep | Source dédiée non établie |
| stage:mgs2_engine_room | MGS2 / Substance | Tanker — salle des machines | Source P60, revue externe en attente |
| stage:mgs2_strut_b | MGS2 / Substance | Strut B — salle transformateur | Source P60, revue externe en attente |
| stage:mgs2_strut_c | MGS2 / Substance | Strut C — salle à manger | Adaptation antérieure présente |
| stage:mgs2_strut_f | MGS2 / Substance | Strut F — entrepôt | Adaptation antérieure présente |
| stage:mgs2_shell1_hostages | MGS2 / Substance | Shell 1 Core — salle des otages | Source dédiée non établie |
| stage:mgs2_oil_fence | MGS2 / Substance | Oil Fence — escorte d’Emma | Adaptation antérieure présente |
| stage:mgs2_arsenal_torture | MGS2 / Substance | Arsenal Gear — torture/Rectum | Source dédiée non établie |
| stage:mgs2_substance_vr | MGS2 / Substance | VR Substance — arènes distinctes | Source dédiée non établie |
| stage:mgs3_dolinovodno | MGS3 PS2 | Dolinovodno — pont | Source P60, revue externe en attente |
| stage:mgs3_rassvet | MGS3 PS2 | Rassvet | Source P60, revue externe en attente |
| stage:mgs3_chyornyj_prud | MGS3 PS2 | Chyornyj Prud | Source P60, revue externe en attente |
| stage:mgs3_bolshaya_base | MGS3 PS2 | Bolshaya Past Base | Source dédiée non établie |
| stage:mgs3_ponizovje_warehouse | MGS3 PS2 | Ponizovje Warehouse | Source P60, revue externe en attente |
| stage:mgs3_graniny_lab | MGS3 PS2 | Graniny Gorki — laboratoire intérieur | Source P60, revue externe en attente |
| stage:mgs3_svyatogornyj | MGS3 PS2 | Svyatogornyj East | Source dédiée non établie |
| stage:mgs3_runway | MGS3 PS2 | Groznyj Grad — piste Shagohod | Source P60, revue externe en attente |
| stage:mgs3_lazorevo | MGS3 PS2 | Lazorevo — fuite à moto | Source dédiée non établie |
| stage:mgs3_zaozyorje_wig | MGS3 PS2 | Zaozyorje / WIG | Source dédiée non établie |
| stage:mgs4_safehouse | MGS4 | Militia Safe House | Source dédiée non établie |
| stage:mgs4_park | MGS4 | Crescent Meridian / Millennium Park | Source dédiée non établie |
| stage:mgs4_powerstation | MGS4 | Cove Valley Village / Power Station | Source dédiée non établie |
| stage:mgs4_marketplace | MGS4 | Marketplace / poursuite Stryker | Source dédiée non établie |
| stage:mgs4_nomad | MGS4 | Nomad — intérieur | Source dédiée non établie |
| stage:mgs4_ship_bow | MGS4 | Outer Haven — Ship Bow | Source dédiée non établie |
| stage:mgs4_microwave | MGS4 | Outer Haven — couloir micro-ondes | Source dédiée non établie |
| stage:mgs4_gw_server | MGS4 | Outer Haven — salle serveurs GW | Source dédiée non établie |
| stage:mgs4_rex_hangar_2014 | MGS4 | Shadow Moses — REX Hangar 2014 | Source dédiée non établie |
| stage:mpo_null_silo | Portable Ops | Silo Entrance — Null I | Source dédiée non établie |
| stage:mpo_null_substation | Portable Ops | Power Substation — Null II | Adaptation antérieure présente |
| stage:mpo_airport | Portable Ops | Airport | Source dédiée non établie |
| stage:mpo_railbridge | Portable Ops | Rail Bridge | Source dédiée non établie |
| stage:mpo_guesthouse | Portable Ops | Guest House | Source dédiée non établie |
| stage:mpo_hospital | Portable Ops | Hospital / Research Lab | Source dédiée non établie |
| stage:pw_playa | Peace Walker | Playa del Alba | Source dédiée non établie |
| stage:pw_pw_hangar | Peace Walker | Mine Base — hangar Peace Walker | Source dédiée non établie |
| stage:pw_isla_monstruo | Peace Walker | Isla del Monstruo | Source P60, revue externe en attente |
| stage:gz_camp_day | Ground Zeroes | Camp Omega — jour / Side Ops | Source dédiée non établie |
| stage:gz_motherbase_attack | Ground Zeroes | Mother Base MSF — attaque 1975 | Source dédiée non établie |
| stage:tpp_wialo | MGSV TPP | Da Wialo Kallai / village | Source dédiée non établie |
| stage:tpp_mission00_route | MGSV TPP | Chypre — Mission 00 route/cimetière | Source dédiée non établie |
| stage:tpp_lamar | MGSV TPP | Lamar Khaate Palace | Source dédiée non établie |
| stage:tpp_ngumba | MGSV TPP | Ngumba Industrial Zone | Source dédiée non établie |
| stage:tpp_quarantine | MGSV TPP | Mother Base — quarantaine | Source dédiée non établie |
| stage:tpp_fob | MGSV TPP | Plateformes FOB | Source dédiée non établie |
| stage:mgr_r00_africa | Revengeance | Afrique — R00 train et avenue | Adaptation antérieure présente |
| stage:mgr_guadalajara | Revengeance | Guadalajara — égouts / labo | Source dédiée non établie |
| stage:mgr_wm_interior | Revengeance | Denver — bureaux World Marshal | Source dédiée non établie |
| stage:mgr_pakistan_base | Revengeance | Pakistan — base avant EXCELSUS | Source dédiée non établie |
| stage:mgr_sam_armstrong | Revengeance | Jetstream DLC — toit Armstrong | Source dédiée non établie |
| stage:mgr_vr_dlc | Revengeance | VR Missions — DLC | Source dédiée non établie |
| stage:acid_ruins | AC!D | Lobito — Ruins / forêt | Source dédiée non établie |
| stage:acid_far | AC!D | Lobito — FAR / salle KODOQUE | Source dédiée non établie |
| stage:acid2_prototype | AC!D2 | SaintLogic — Prototype KODOQUE | Source dédiée non établie |
| stage:acid2_tests | AC!D2 | SaintLogic — combats Test Subjects | Source dédiée non établie |
| stage:nes_supercomputer | MG NES | Outer Heaven NES — Supercomputer | Source P60, revue externe en attente |
| stage:revenge_mg2 | Snake’s Revenge | Snake’s Revenge — chambre Metal Gear 2 | Source P60, revue externe en attente |
| stage:survive_bigmouth_arena | Survive | Dite — Ruins / Big Mouth | Source dédiée non établie |
| stage:survive_frostbite_arena | Survive | Dite — FOB / Frostbite | Source dédiée non établie |
| stage:survive_final_defense | Survive | Dite — défense finale Lord of Dust | Source dédiée non établie |
| stage:mobile_vr_final | Mobile | MGS Mobile — finale/VR | Source dédiée non établie |
| stage:touch_acts | Touch | MGS Touch — planches par acte | Source dédiée non établie |
| stage:mgo1_city_under_siege | MGO1 | City Under Siege | Source dédiée non établie |
| stage:mgo1_mountain_top | MGO1 | Mountain Top | Source dédiée non établie |
| stage:mgo1_ghost_factory | MGO1 | Ghost Factory | Source dédiée non établie |
| stage:mgo1_lost_forest | MGO1 | Lost Forest | Source dédiée non établie |
| stage:mgo1_killhouse_a | MGO1 | Killhouse A | Source dédiée non établie |
| stage:mgo1_killhouse_b | MGO1 | Killhouse B | Source dédiée non établie |
| stage:mgo1_killhouse_c | MGO1 | Killhouse C | Source dédiée non établie |
| stage:mgo1_svyatogornyj_east | MGO1 | Svyatogornyj East | Source dédiée non établie |
| stage:mgo1_graniny_gorki_lab | MGO1 | Graniny Gorki Lab | Source dédiée non établie |
| stage:mgo1_pillbox_purgatory | MGO1 | Pillbox Purgatory | Source dédiée non établie |
| stage:mgo1_high_ice | MGO1 | High Ice | Source dédiée non établie |
| stage:mgo1_brown_town | MGO1 | Brown Town | Source dédiée non établie |
| stage:mgo2_blood_bath | MGO2 | Blood Bath | Source dédiée non établie |
| stage:mgo2_groznyj_grad | MGO2 | Groznyj Grad | Source dédiée non établie |
| stage:mgo2_urban_ultimatum | MGO2 | Urban Ultimatum | Source dédiée non établie |
| stage:mgo2_midtown_maelstrom | MGO2 | Midtown Maelstrom | Source dédiée non établie |
| stage:mgo2_ambush_alley | MGO2 | Ambush Alley | Source dédiée non établie |
| stage:mgo2_coppertown_conflict | MGO2 | Coppertown Conflict | Source dédiée non établie |
| stage:mgo2_tomb_of_tubes | MGO2 | Tomb of Tubes | Source dédiée non établie |
| stage:mgo2_virtuous_vista | MGO2 | Virtuous Vista | Source dédiée non établie |
| stage:mgo2_forest_firefight | MGO2 | Forest Firefight | Source dédiée non établie |
| stage:mgo2_winter_warehouse | MGO2 | Winter Warehouse | Source dédiée non établie |
| stage:mgo2_silo_sunset | MGO2 | Silo Sunset | Source dédiée non établie |
| stage:mgo2_hazard_house | MGO2 | Hazard House | Source dédiée non établie |
| stage:mgo2_ravaged_riverfront | MGO2 | Ravaged Riverfront | Source dédiée non établie |
| stage:mgo2_outer_outlet | MGO2 | Outer Outlet | Source dédiée non établie |
| stage:mgo2_icebound_inferno | MGO2 | Icebound Inferno | Source dédiée non établie |
| stage:mgo3_red_fortress | MGO3 | Red Fortress | Source P60, revue externe en attente |
| stage:mgo3_gray_rampart | MGO3 | Gray Rampart | Source P60, revue externe en attente |
| stage:mgo3_amber_station | MGO3 | Amber Station | Source P60, revue externe en attente |
| stage:mgo3_black_site | MGO3 | Black Site | Source P60, revue externe en attente |
| stage:mgo3_coral_complex | MGO3 | Coral Complex | Source P60, revue externe en attente |
| stage:mgo3_rust_palace | MGO3 | Rust Palace | Source P60, revue externe en attente |
| stage:mgo3_azure_mountain | MGO3 | Azure Mountain | Source P60, revue externe en attente |
| stage:arcade_desert_duel | Metal Gear Arcade | Desert Duel | Source dédiée non établie |
| stage:arcade_lethal_leviathan | Metal Gear Arcade | Lethal Leviathan | Source dédiée non établie |
| stage:foxhunt_cradle_forest | Delta — FOX HUNT | Cradle Forest | Source dédiée non établie |
| stage:foxhunt_ghost_garrison | Delta — FOX HUNT | Ghost Garrison | Source dédiée non établie |
| stage:foxhunt_sacred_garden | Delta — FOX HUNT | Sacred Garden | Source dédiée non établie |
| stage:tts_edition | The Twin Snakes | Lot de scènes par édition / sous-mode | Source dédiée non établie |
| stage:delta_edition | MGS3 Delta | Lot de scènes par édition / sous-mode | Source dédiée non établie |
| stage:delta_monkey | Delta — Snake vs Monkey | Lot de scènes par édition / sous-mode | Source dédiée non établie |
| stage:delta_bomberman | Delta — Snake vs Bomberman | Lot de scènes par édition / sous-mode | Source dédiée non établie |
| stage:mc2_edition | Master Collection Vol.2 | Contrôle édition MGS4 / PW HD / Ghost Babel | Source dédiée non établie |

## Machines — tous les compléments hérités

| ID | Opus | Nom | État rapproché |
|---|---|---|---|
| machine:nes_supercomputer | Metal Gear NES | Supercomputer NES | Source dédiée non établie |
| machine:revenge_metal_gear_2 | Snake’s Revenge | Metal Gear2 de Snake’s Revenge | Source dédiée non établie |
| machine:ray_mgs2_prototype | MGS2 | RAY prototype piloté | Source dédiée non établie |
| machine:hind_mg1 | MG1 | HindD MSX | Source SideOps à examiner pour CQC |
| machine:tank_mg1 | MG1 | Tank MSX | Source SideOps à examiner pour CQC |
| machine:hind_mg2 | MG2 | HindD MSX2 | Source dédiée non établie |
| machine:rex_tts | The Twin Snakes | REX The Twin Snakes | Source dédiée non établie |
| machine:shagohod_delta | MGS Delta | Shagohod Delta | Source dédiée non établie |
| machine:pw_lav_type_g_normal | Peace Walker | LAV-Type G — normal | Source dédiée non établie |
| machine:pw_lav_type_g_custom | Peace Walker | LAV-Type G — Custom | Source dédiée non établie |
| machine:pw_lav_type_c_normal | Peace Walker | LAV-Type C — normal | Source P60, revue externe en attente |
| machine:pw_lav_type_c_custom | Peace Walker | LAV-Type C — Custom | Source dédiée non établie |
| machine:pw_btr_60_pa_normal | Peace Walker | BTR-60 PA — normal | Source P60, revue externe en attente |
| machine:pw_btr_60_pa_custom | Peace Walker | BTR-60 PA — Custom | Source dédiée non établie |
| machine:pw_btr_60_pb_normal | Peace Walker | BTR-60 PB — normal | Source P60, revue externe en attente |
| machine:pw_btr_60_pb_custom | Peace Walker | BTR-60 PB — Custom | Source dédiée non établie |
| machine:pw_t_72u_normal | Peace Walker | T-72U — normal | Source P60, revue externe en attente |
| machine:pw_t_72u_custom | Peace Walker | T-72U — Custom | Source P60, revue externe en attente |
| machine:pw_t_72a_normal | Peace Walker | T-72A — normal | Source P60, revue externe en attente |
| machine:pw_t_72a_custom | Peace Walker | T-72A — Custom | Source P60, revue externe en attente |
| machine:pw_kpz70_normal | Peace Walker | KPz70 — normal | Source P60, revue externe en attente |
| machine:pw_kpz70_custom | Peace Walker | KPz70 — Custom | Source P60, revue externe en attente |
| machine:pw_mbtk_70_normal | Peace Walker | MBTk-70 — normal | Source P60, revue externe en attente |
| machine:pw_mbtk_70_custom | Peace Walker | MBTk-70 — Custom | Source P60, revue externe en attente |
| machine:pw_mi_24a_normal | Peace Walker | Mi-24A — normal | Source P60, revue externe en attente |
| machine:pw_mi_24a_custom | Peace Walker | Mi-24A — Custom | Source dédiée non établie |
| machine:pw_mi_24d_normal | Peace Walker | Mi-24D — normal | Source P60, revue externe en attente |
| machine:pw_mi_24d_custom | Peace Walker | Mi-24D — Custom | Source P60, revue externe en attente |
| machine:pw_ah56a_bomber_normal | Peace Walker | AH56A-Bomber — normal | Source P60, revue externe en attente |
| machine:pw_ah56a_bomber_custom | Peace Walker | AH56A-Bomber — Custom | Source P60, revue externe en attente |
| machine:pw_ah56a_raider_normal | Peace Walker | AH56A-Raider — normal | Source P60, revue externe en attente |
| machine:pw_ah56a_raider_custom | Peace Walker | AH56A-Raider — Custom | Source P60, revue externe en attente |
| machine:pw_pupa_type_ii | Peace Walker | Pupa — Type II | Source dédiée non établie |
| machine:pw_pupa_custom | Peace Walker | Pupa — Custom | Source dédiée non établie |
| machine:pw_chrysalis_type_ii | Peace Walker | Chrysalis — Type II | Source dédiée non établie |
| machine:pw_chrysalis_custom | Peace Walker | Chrysalis — Custom | Source dédiée non établie |
| machine:pw_cocoon_type_ii | Peace Walker | Cocoon — Type II | Source dédiée non établie |
| machine:pw_cocoon_custom | Peace Walker | Cocoon — Custom | Source dédiée non établie |
| machine:pw_peace_walker_type_ii | Peace Walker | Peace Walker — Type II | Source dédiée non établie |
| machine:pw_peace_walker_custom | Peace Walker | Peace Walker — Custom | Source dédiée non établie |
| machine:zeke_configurations | Peace Walker | ZEKE — configurations construites | Source dédiée non établie |
| machine:pw_mh_rathalos | PW × Monster Hunter | Rathalos | Source dédiée non établie |
| machine:pw_mh_tigrex | PW × Monster Hunter | Tigrex | Source dédiée non établie |
| machine:pw_mh_gear_rex | PW × Monster Hunter | Gear REX | Source dédiée non établie |
| machine:vr_genola | MGS VR / MGS2 Substance | Genola | Source P60, revue externe en attente |
| machine:vr_gurlugon | MGS VR / MGS2 Substance | Gurlugon | Source P60, revue externe en attente |
| machine:vr_mech_genola | MGS VR / MGS2 Substance | Mech Genola | Source dédiée non établie |
| machine:big_mouth | Survive | Big Mouth | Corps existant, rig/variantes à compléter |
| machine:frostbite | Survive | Frostbite | Corps existant, rig/variantes à compléter |
| machine:lord_of_dust | Survive | Lord of Dust | Source dédiée non établie |
| machine:survive_devastator | Survive coopération | Devastator | Source dédiée non établie |
| machine:mgr_enemy_suite | Revengeance | Raptor / Mastiff / Slider / Hammerhead / Fenrir | Corps existant, rig/variantes à compléter |
| machine:gustav_concept | MG2 — concept abandonné | Metal Gear G / Gustav | Concept/projet annulé à délimiter |
| machine:rising_cancelled | Rising avant Platinum | MGS Rising — projet initial annulé | Concept/projet annulé à délimiter |

## Projectiles et VFX à doter d’une source dédiée

| ID | Nature | Alias actuellement utilisé |
|---|---|---|
| projectile:smoke-shell | Projectile fumigène du Box Tank | launcher-grenade |
| projectile:stun-shell | Projectile non létal du Box Tank | launcher-grenade |
| projectile:crystal-grenade | Projectile explosif du Mortar — nom historique CQC crystal-grenade | detached-debris |
| vfx:smoke-cloud | Nuage de fumée | chaff-cloud |

Ces quatre lignes ont déjà un rendu de secours dans le catalogue. Les trois projectiles nécessitent un dessin conforme à leur édition et à leur munition ; le nuage est un VFX distinct. Le registre de 64 effets n’est pas un inventaire exhaustif de tous les projectiles de la franchise.

## Preuves et fichiers

- [Audit structuré et limites](baseline-reconciled.json) : chaque ID, statut, correspondance de source et référence du suivi.
- [Index complet des 3 399 poses, JSON compressé](wardrobe-source-index.json.gz) : source sélectionnée, Git blob, empreinte enregistrée, frame et origine du catalogue. Décompresser ce fichier gzip pour retrouver le JSON intégral.
- [Index des projectiles/VFX](projectile-vfx-source-index.json) : 64 définitions natives et quatre alias.
- [P52](../../pass52/static-poses/catalogue/manifest.json), [galerie P54](../../../../public/cqc/atelier/p54-dossiers/catalog.json), [galerie P55](../../../../public/cqc/atelier/p55-dossiers/catalog.json), [métadonnées P60](../../pass60/batches/).

Aucune image P59 n’a été retrouvée dans cet arbre. Les références P60 mentionnant d’anciens chemins P59 ne sont pas utilisées comme preuve de présence. Les nouveaux fichiers P61 doivent être ajoutés comme une progression séparée sur cet instantané.
