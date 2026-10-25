# 02 — Personnages, incarnations et costumes : audit détaillé CQC

**Référence auditée : P41, commit `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`, 23 octobre 2026.** Le registre effectivement chargé contient **380 entrées de roster**. Il ne manque pas les grandes distributions dans leur ensemble : les lacunes se concentrent sur les vêtements officiels, les archétypes d’ennemis, les petites apparitions, les variantes d’édition et la preuve visuelle de chacune. Les tableaux ci-dessous indiquent ce qui existe, ce qui reste à produire et ce qui doit d’abord être référencé.

Le snapshot runtime utilisé pour compter a volontairement remplacé les images par des espaces réservés. **Ce travail valide un inventaire de données et de références, pas la ressemblance des planches. Aucune fidélité 1:1 artistique ou animation n’est certifiée ici.** Les mentions `approved`/`verified` appartiennent aux métadonnées existantes du projet. Elles ne remplacent pas l’observation des PNG ni une comparaison avec les jeux. [Registre P41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html) · [Notes de livraison](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md).

## 1. Résultat et règles de comptage

| Mesure | Résultat | Ce que ce nombre signifie |
| --- | ---: | --- |
| Entrées `fighters` après extensions | 380 | Incarnations, alias, animaux, machines, objets et personnages; pas 380 personnes uniques |
| Entrées de l’index de costumes différés | 191 | 76 styles, 89 créations CQC, 26 tenues officielles déclarées |
| Union des options alternatives `(uid, id)` | 217 | Index + options déjà chargées, sans `original`, dédoublonnées |
| Tâches de roster détaillées dans ce rapport | 87 | Mélange de véritables absences, de variantes à ventiler et de dossiers documentaires |
| Lignes du catalogue de références costumes | 315 | Tenues, accessoires, états et lots modulaires; ce nombre n’est pas un total de tenues manquantes |
| Concepts originaux proposés | 20 | Propositions CQC, aucune production ni canonisation implicite |

Dans les 217 alternatives, on trouve **30 entrées canoniques déclarées** : 26 vêtements/corps indexés et quatre liaisons réciproques de présentations (Snake ↔ Pliskin, EVA ↔ Tatyana). Ces liaisons réutilisent des corps déjà présents. Les autres familles observées sont Gala 88, rétro 75, nextgen qualifié 6, cyborg 4, Survive 3, Metal Gear 3 et une alternative de manteau. Sept options héritées nommées `nextgen` n’ont pas de famille/provenance renseignée dans l’option; l’une est « Marionnette B » d’Elsie & Frances. **Elles ne doivent pas être additionnées comme sept nouveaux vêtements de mode.** Les quatre liaisons canoniques et cette exception sont exposées dans [02_costumes_presents.csv](02_costumes_presents.csv).

La politique globale couvre 375 UID : **84 rétro couverts / 291 restants**, **88 Gala couverts / 287 restants** et **375 nextgen couverts / 0 restant**. Le dernier résultat signifie principalement que le style original convient déjà à la catégorie nextgen, et non que 375 nouveaux costumes ont été dessinés. Cinq entrées actives échappent à ce périmètre : Fenrir, Raptor, Hammerhead, Rescue Box et Raiden R-00. Il faut réconcilier ce périmètre avant d’utiliser les compteurs comme une feuille de production. Les requêtes historiques pass19 comptent encore 381 identités (dont Parallaxe hors `fighters`) et plusieurs états `pending-art` décalés par rapport aux index récents. [Politique du projet](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass21-wardrobe-policy.js).

### Les six distinctions indispensables

1. **Personne / incarnation / alias.** Solid Snake MGS1, MGS2 et MGS4 sont des incarnations, Pliskin une couverture, Young Snake FaceCamo un masque sur Old Snake. Ils ne forment pas cinq personnes.
2. **Tenue narrative / bonus officiel.** Une tenue officiellement débloquable ou vendue demeure officielle même si son port n’appartient pas à la continuité de l’histoire.
3. **Vêtement / accessoire / palette / état.** Un maquillage, un masque, un bras équipé ou une blessure mérite une fiche précise, sans fabriquer artificiellement un personnage entier supplémentaire.
4. **Original CQC / source officielle.** Gala, Survive et Metal Gear inventés restent étiquetés originaux, y compris lorsqu’ils reprennent les matières ou la mécanique d’un opus.
5. **Style / vêtement.** Rétro et nextgen sont généralement des réinterprétations graphiques d’une même apparence. Les pixels ne rendent pas automatiquement un costume canonique MSX.
6. **Source de silhouette / source de mouvement.** Un portrait ou une carte atteste parfois un visage, pas la face arrière, les bottes, le dégainé ou les phases d’un coup de versus.

## 2. Identités déjà corrigées à préserver

Le tableau initial conserve des libellés historiques que les métadonnées natives récentes corrigent. Il serait incorrect de présenter ces corrections comme des bugs actuels non traités.

| Entrée | Lecture fidèle | Conséquence pour le travail restant |
| --- | --- | --- |
| `completion__ronald_lensen` | Ronard Lensenbrink, alias Weasel, lié à `archive__weasel_gb` | Conserver les anciens identifiants de sauvegarde; ne pas fabriquer un second personnage |
| `archive__carter_survive` | Design historique CQC, non attesté dans le cast canonique de Survive | Préserver comme original de projet, pas le remplacer par un journaliste réel ou le Captain |
| `archive__chris_survive` | Chris enfant, représentation en fauteuil de la fin du jeu | Ne pas lui donner le corps de Goodluck adulte; conserver la relation d’identité dans la fiche |
| `archive__genome_mgo1` | Présentation native « Opérateur — MGO1 », modèle GRU référencé | Le mot GENOME legacy n’est pas une preuve de tenue Genome MGS1 |
| Gálvez/Zadornov, Général/Eguabon, Flemming/Gary | Alias/couvertures d’identités déjà représentées | Lier les fiches; compter séparément seulement les apparences réellement différentes |
| Lucy et Lucinda Koppelthorn | Lucy est un sujet enfant avec ego propre; Lucinda est la scientifique défunte dont les souvenirs lui sont implantés | Conserver deux fiches reliées; ne pas les fusionner en simple alias ou déduire un corps adulte du modèle enfant |
| ADAM/Ocelot, Tatyana/EVA, Pliskin/Snake | Identités de couverture, avec tenues parfois distinctes | Rendre le lien explicite et conserver l’incarnation exacte |
| Raiden `pass40__raiden_r00` | Corps standard de R-00 déjà jouable dans P40/P41 | Ne pas le remettre dans une liste « personnage absent »; compléter ses transitions restantes |

Ces relations sont consignées dans [02_roster_present.csv](02_roster_present.csv), qui conserve à la fois le nom runtime et le nom éditorial de l’audit. [Ghost Babel officiel](https://metalgear.konami.net/manual/mc2/mggb/ps5/fr/page17.html) · [Lucy](https://metalgear.fandom.com/wiki/Lucy) · [Lucinda](https://metalgear.fandom.com/wiki/Lucinda_Koppelthorn) · [Registre du projet](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).

## 3. Couverture par opus

Le terme « présent » indique une entrée retrouvée. Il ne garantit ni une animation suffisante ni un modèle correct à toutes les poses. L’inventaire exhaustif des 380 UID est joint. Les personnages principaux, secondaires, tertiaires et prototypes ne sont pas tous destinés au même usage : un personnage uniquement évoqué peut être complet sous forme de dossier; un civil de scène peut être complet en PNJ.


| Opus / édition | Déjà présent dans CQC | Lacune à traiter | Référence |
| --- | --- | --- | --- |
| MG MSX / NES | Héros, boss humanoïdes, résistants et scientifiques déjà très couverts. | Frère de Jennifer, leurre Madnar, soldats/animaux, modèle NES distinct et archives de localisation. | [MG1EX](https://metalgear.fandom.com/wiki/Shotmaker) |
| Snake’s Revenge | Snake, John Turner, Nick Myer, Jennifer et Big Boss cyborg présents. | Vérifier ennemis/variantes graphiques et contenu du manuel; pas d’import des techniques MGS3 en canon. | [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| MG2 | Snake, Big Boss, Gray Fox, tous les boss nommés et contacts majeurs présents. | Enfants, collectif Four Horsemen, portraits originaux/révisés et uniformes narratifs. | [MG2EX](https://metalgear.fandom.com/wiki/Category%3AMG2_Characters) |
| MGS1 / Integral / VR | Distribution nommée très étendue, y compris supports, Decoy et Johnny. | Catégories Genome, tuxedo officiel, déguisements, bonus VR; distinguer Decoy et vrai Anderson. | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) |
| The Twin Snakes | Snake et les principaux personnages/boss ont des UID de remake. | Supports restés sous UID MGS1, tenues et états GameCube; remake ≠ simple filtre. | [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| MGS2 / Substance | Distribution principale/secondaire, Olga ninja et Pliskin déjà présents. | Hi-Tech, Marines, otages, instances IA, uniformes, VR/Snake Tales et distinction canon/bonus. | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) |
| MGS3 / Subsistence | FOX/Cobra/GRU principaux et supports présents; 22 costumes officiels indexés. | Uniformes standard et boss restants, face paints, masques, état post-torture, Guy Savage PS2 et petits rôles. | [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html) |
| Snake Eater 3D | Personnages de l’histoire couverts via autres éditions. | Profil graphique et animations 3DS, photo camouflage et différences de bonus non documentés comme édition. | [3DS](https://www.konami.com/mg/archive/mgs_se/jp/guide/index.html) |
| Delta / FOX HUNT | Cast Delta largement représenté, Guy Savage Δ présent. | 59 entrées de contrôle vêtements dont une base déclarée, accessoires, FacePaint et FOX HUNT. | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) |
| Portable Ops / Plus | Snake, FOX, Campbell, Jonathan, Elisa/Ursula, supports et invités majeurs présents. | Soldats et recrues par modèle/genre/région; invités Plus avec leur modèle PSP. | [MPOPLUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) |
| Peace Walker | Distribution centrale, pods IA et boîtes bonus déjà présents. | Wardrobe étendu, forces Peace Sentinel, guérilleros, Trenya et corps Hideo restant. | [PW](https://www.konami.com/mg/archive/mgs_pw/us/character/index.html) |
| Ground Zeroes | Snake, Chico, Paz, Skull Face, Kaz, Medic, Glaz, Palitz et Morpho présents. | Cibles annexes, uniformes des gardes/prisonniers, Déjà Vu/Jamais Vu et corps Hideo. | [GZEX](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) |
| The Phantom Pain | Principaux, soutiens, Skulls, buddies et plusieurs cibles présents. | Pequod/Queequeg, civils et personnel, nombreuses tenues, variantes d’avatar/FOB et corps Hideo. | [TPP](https://www.konami.com/mg/mgs5/tpp/jp/story/) |
| MGS4 | Principaux, Rat Patrol, B&B + Beauties, supports, PMCs et unités principales présents. | OctoCamo/FaceCamo, déguisements, rebelles, civils, classes PMC et états de fin. | [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html) |
| Revengeance / DLC | Boss et Maverick complets au niveau des noms centraux, R00 et UG ajoutés. | Ennemis cyborgs ordinaires, palettes/tenues officielles restantes et accessoires; standard R00 déjà produit. | [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/) |
| Metal Gear Solid: Rising annulé | Raiden prototype possède une entrée. | Conserver statut prototype; seules démonstrations/concepts attestés peuvent servir de référence, aucun jeu final à reproduire. | [RUNTIME](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html) |
| Ghost Babel | Cast central couvert; Weasel et Eguabon ont aussi des alias historiques. | Dossiers des personnes évoquées, pas six nouveaux corps supposés; bonus VR et skins d’édition. | [GB](https://metalgear.konami.net/manual/mc2/mggb/ps5/fr/page17.html) |
| AC!D | Héros, antagonistes et très nombreux supports déjà présents. | Harold Burton, soldats, palettes versus; cartes = objets de jeu, pas preuve de nouveaux corps narratifs. | [ACID](https://www.konami.com/mg/archive/mga/english/introduction.html) |
| AC!D 2 | Venus, Snake, boss, chercheurs et supports secondaires déjà présents. | Palettes/arena, gardes; Lucy et Lucinda ont une relation mémorielle, pas un simple alias de corps. | [ACID2EX](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_2_Characters) |
| Survive | Cast du camp, Goodluck/Chris et plusieurs créatures présents. | Avatar modulaire, archives Warren/Marton, équipement; Carter doit rester design historique CQC. | [SURVIVE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Survive_Characters) |
| MGS Mobile | Snake/Otacon/Commander/Victoria et avatar VR Otacon présents. | Références de l’édition et ennemis; mention de Raiden n’équivaut pas à son modèle. | [MOBILE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Solid_Mobile_Characters) |
| Touch / Arcade / Social Ops | Héros/opérateurs dédiés présents. | Cibles, cartes et modèles exacts de chaque version, sans supposer un casting nouveau pour chaque carte. | [RUNTIME](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html) |
| AC!D Mobile / AC!D2 Mobile | Snake et Venus dédiés présents. | Séparer versions Java/3D, formes visuelles et cartes de la version PSP. | [RUNTIME](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html) |
| MGO1 / MGO2 / MGO3 | Un opérateur par jeu et les personnages uniques dans leurs jeux narratifs. | Catalogue de corps, classes et équipement; profils uniques Online séparés des personnes. | [MGO3](https://www.konami.com/games/eu/fr/topics/2377/) |
| Master Collection Vol.2 (2026) | MGS4, Peace Walker HD et Ghost Babel publiés le 27 août 2026; personnages déjà présents. | Gold Camouflage MGS4 et Uniform GOLD PW à documenter; édition nouvelle ne crée pas de personne nouvelle. | [MC2](https://www.konami.com/games/eu/en/topics/19257/) |
| Collections / ports / DGN | Plusieurs sources historiques déjà représentées. | Port graphique n’implique pas nouvelle personne; DGN et Screenplay fournissent des références, pas des sprites de combat. | [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |


## 4. Registre détaillé des personnages et archétypes à compléter

**Lecture des statuts :** `absent_du_roster_actif` désigne une absence de nom/UID distinct après rapprochement. `couverture_non_ventilee` signifie qu’un ensemble ou une incarnation voisine existe, sans preuve de toutes les variantes. `pas_de_dossier_individualise_retrouve` est une lacune documentaire : aucune apparence complète n’est présumée. Un lot collectif ne doit pas être transformé en un nombre arbitraire de nouveaux combattants.

Les listes secondaires servent à repérer les petites apparitions. Leurs catégories mélangent parfois rôles présents, personnes citées, identités de couverture et prototypes. La première action de production consiste donc à capturer le passage du jeu ou le Master Book correspondant. Les descriptions de production qui suivent sont des exigences proposées pour CQC, pas des descriptions présentées comme des données extraites.


### MG MSX


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MG1-01 — **Frère de Jennifer** (tertiaire) | absent_du_roster_actif | Otage associé à Jennifer; ne pas lui inventer le visage de Steve. Relever sprite, dialogue et position exacte; fiche d’otage, animation attente/peur/libération, aucun kit de mercenaire par défaut. [MG1EX](https://metalgear.fandom.com/wiki/Shotmaker) |
| R-MG1-02 — **Faux Dr Madnar** (tertiaire) | absent_comme_identite_documentee | Imposture distincte de Madnar réel, pas nécessairement une silhouette nouvelle. Lier l’apparence au leurre et sa séquence source; pas de doublon corporel si le même sprite est utilisé. [MG1EX](https://metalgear.fandom.com/wiki/Shotmaker) |



### MG MSX / NES


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MG1-03 — **Gardes d’Outer Heaven et chiens de garde** (ennemi_recurrent) | couverture_generique_non_ventilee | Les incarnations des boss ne remplacent pas les soldats et animaux ordinaires. Capturer séparément silhouettes MSX/NES, couleurs fonctionnelles, patrouille/alerte; chiens quadrupèdes dans le catalogue animaux. [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html); [MG1EX](https://metalgear.fandom.com/wiki/Shotmaker) |



### MG NES — manuel localisé


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MG1-04 — **Commander South / Vermon CaTaffy** (documentaire) | dossier_documentaire_a_completer | Noms du matériel localisé; pas des preuves d’un nouveau modèle visible dans le jeu. Dossier textuel avec scan/page/édition; aucun corps officiel à inventer ni fusion avec Big Boss. [MG1EX](https://metalgear.fandom.com/wiki/Shotmaker) |



### MG2


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MG2-01 — **Enfants de Zanzibar** (tertiaire) | absent_comme_collectif_documente | Personnages civils du fort. Inventorier les sprites et dialogues par emplacement; définir attente, fuite et conversation sans armes inventées. [MG2EX](https://metalgear.fandom.com/wiki/Category%3AMG2_Characters) |
| R-MG2-02 — **Four Horsemen — quatre membres** (secondaire) | entree_collective_presente_completude_a_verifier | Une entrée de roster ne prouve pas que les quatre adversaires et leurs positions existent. Décrire le groupe, ses quatre sprites/positions et la permutation; ne pas compter quatre nouvelles identités sans distinction source. [MG2EX](https://metalgear.fandom.com/wiki/Category%3AMG2_Characters) |



### MGS1


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS1-nbc — **Genome NBC** (ennemi_recurrent) | variante_officielle_non_ventilee | Catégorie explicitement distinguée dans le manuel officiel. Identifier la variante déjà représentée par Genome Soldier, produire les autres silhouettes; masque/casque/gilet/arme et gestes doivent correspondre à cette catégorie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) |
| R-MGS1-light — **Genome léger** (ennemi_recurrent) | variante_officielle_non_ventilee | Catégorie explicitement distinguée dans le manuel officiel. Identifier la variante déjà représentée par Genome Soldier, produire les autres silhouettes; masque/casque/gilet/arme et gestes doivent correspondre à cette catégorie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) |
| R-MGS1-arctic — **Genome arctique** (ennemi_recurrent) | variante_officielle_non_ventilee | Catégorie explicitement distinguée dans le manuel officiel. Identifier la variante déjà représentée par Genome Soldier, produire les autres silhouettes; masque/casque/gilet/arme et gestes doivent correspondre à cette catégorie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) |
| R-MGS1-heavy — **Genome lourd** (ennemi_recurrent) | variante_officielle_non_ventilee | Catégorie explicitement distinguée dans le manuel officiel. Identifier la variante déjà représentée par Genome Soldier, produire les autres silhouettes; masque/casque/gilet/arme et gestes doivent correspondre à cette catégorie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) |



### MGS1 Integral / VR Missions


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS1-VR — **Gray Fox — missions Ninja** (bonus_officiel) | profil_edition_non_isole | Gray Fox existe déjà; sa disponibilité et ses missions VR sont un contexte officiel distinct. Rattacher le corps exact PS1 et les mouvements VR documentés; ne pas importer le kit Revengeance. [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |



### The Twin Snakes


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-TTS-campbell — **Campbell** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-naomi — **Naomi** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-mei-ling — **Mei Ling** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-nastasha — **Nastasha** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-miller-liquid-d-guis — **Miller / Liquid déguisé** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-donald-anderson-decoy — **Donald Anderson / Decoy** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-kenneth-baker — **Kenneth Baker** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-TTS-jim-houseman — **Jim Houseman** (secondaire) | personnage_present_sans_UID_TTS_dedie | Le personnage existe dans CQC côté MGS1; la preuve graphique GameCube doit être distincte. Comparer portrait/modèle, âge, visage et vêtements du remake; créer une incarnation seulement si une vraie différence visible le justifie. [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |



### MGS2 / MPO+


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS2-01 — **Hi-Tech Soldier** (ennemi_recurrent) | absent_du_roster_actif | Soldat blindé au casque intégral, distinct du mercenaire Gurlukovich. Référence de face/profil/dos MGS2, épaulières/col/avant-bras, arme et visière; entrée MPO+ séparée si son modèle est reproduit. [HITECH](https://metalgear.fandom.com/wiki/Hi-Tech_Soldiers) |



### MGS2


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS2-02 — **Marines du Tanker** (tertiaire) | absent_comme_archetype_dedie | Les Marines présents au discours ne sont pas le SEAL de la Big Shell. Postures au garde-à-vous, écoute, alerte; rangs/couleurs documentés, pas de tenue SEAL réutilisée sans preuve. [MGS2EX](https://metalgear.fandom.com/wiki/Category%3AMGS2_Characters) |
| R-MGS2-03 — **Otages du Shell 1** (tertiaire) | absent_comme_collectif_documente | Ames présent ne représente pas l’ensemble des otages. Cataloguer corps/visages visibles, masque et entraves éventuels, animation assise/peur/interrogation; ne pas imposer un kit de combat. [MGS2EX](https://metalgear.fandom.com/wiki/Category%3AMGS2_Characters) |
| R-MGS2-04 — **Rose réelle / interface IA** (secondaire) | distinction_identitaire_a_formaliser | Même apparence d’interface ne signifie pas même acteur narratif. Annoter les séquences et voix; conserver le visage de Rose, signaler l’instance IA sans inventer un nouveau corps. [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) |



### MGS2 Substance


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS2-05 — **Meryl — Snake Tales** (bonus_officiel) | absence_de_profil_snake_tales | Le scénario alternatif et la source de son modèle doivent être explicités. Localiser apparition/illustration dans Snake Tales avant toute réutilisation d’un corps MGS1 ou TTS. [MGS2EX](https://metalgear.fandom.com/wiki/Category%3AMGS2_Characters) |



### MGS3 / Delta


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS3-kgb — **Gardes du KGB** (ennemi_recurrent) | couverture_non_ventilee | Uniformes de surveillance distincts du GRU. Table de variantes PS2 et Delta distincte; enregistrer visage, couvre-chef, insignes, gants et arme/posture source. [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-MGS3-gru — **GRU standard** (ennemi_recurrent) | couverture_non_ventilee | Le heavy gunner existant ne prouve pas la couverture du soldat ordinaire. Table de variantes PS2 et Delta distincte; enregistrer visage, couvre-chef, insignes, gants et arme/posture source. [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-MGS3-scientist — **Scientifiques de Groznyj Grad** (tertiaire) | couverture_non_ventilee | Blouses et silhouettes non combattantes de la base. Table de variantes PS2 et Delta distincte; enregistrer visage, couvre-chef, insignes, gants et arme/posture source. [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-MGS3-president — **Président des États-Unis — cérémonie** (tertiaire) | absent_du_roster_actif | Apparition ou voix de scène à relever dans le scénario; une mention ne prouve pas un corps complet. Ajouter le timecode et l’édition; portrait/voix suffisent si le corps n’est pas montré. Aucun kit CQC canonique supposé. [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-MGS3-cia — **Directeur de la CIA** (tertiaire) | absent_du_roster_actif | Apparition ou voix de scène à relever dans le scénario; une mention ne prouve pas un corps complet. Ajouter le timecode et l’édition; portrait/voix suffisent si le corps n’est pas montré. Aucun kit CQC canonique supposé. [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |
| R-MGS3-khrushchev — **Nikita Khrouchtchev — interlocuteur** (tertiaire) | absent_du_roster_actif | Apparition ou voix de scène à relever dans le scénario; une mention ne prouve pas un corps complet. Ajouter le timecode et l’édition; portrait/voix suffisent si le corps n’est pas montré. Aucun kit CQC canonique supposé. [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |



### MGS3 PS2


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS3-GUY — **Guy Savage — version PS2** (bonus_officiel) | version_PS2_non_isolee | Le Guy Savage Δ présent est une réinterprétation différente. Référencer héros, ennemis et mouvements du mini-jeu PS2; créer une fiche distincte du remake Delta. [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |



### MGS3 / Delta — Snake vs Monkey


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS3-MONKEY — **Pipo Monkeys** (bonus_officiel) | absent_du_roster_actif | Personnages de crossover interne au bonus, pas ennemis historiques de 1964. Séparer modèle/animation PS2 et Delta; inventorier les variantes réellement visibles. [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html); [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) |



### Snake Eater 3D


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-3DS-01 — **Naked Snake — présentation 3DS** (principal) | edition_non_isolee | Le modèle PS2 et celui de Delta ne prouvent pas la fidélité à la version 3DS. Collecter vues modèle 3DS, animations de déplacement accroupi, références photo-camo; même personne, édition graphique distincte. [3DS](https://www.konami.com/mg/archive/mgs_se/jp/guide/index.html) |



### Delta — FOX HUNT


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-DELTA-FOX — **Opérateurs / avatars FOX HUNT** (bonus_officiel) | mode_non_reference_par_UID_dedie | Mode publié après le lancement Delta et disponible avant la date de cet audit. Inventaire des corps, équipements, variations et animations propres au mode; éviter une simple copie de l’avatar MGO3. [FOXHUNT](https://konami-fr.prezly.com/?category=6622) |



### Portable Ops / Plus


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MPO-soviet — **Soldats soviétiques — hommes/femmes** (tertiaire) | couverture_non_ventilee | Familles de recrues et silhouettes sexuées, pas une seule tenue FOX. Table de modèles et équipements par version; nom de provenance, palette, accessoire et région dans les métadonnées. [MPOPLUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) |
| R-MPO-ocelot — **Ocelot Unit — hommes/femmes** (tertiaire) | couverture_non_ventilee | Modèles de recrutement de MPO/+ à distinguer des soldats MGS3. Table de modèles et équipements par version; nom de provenance, palette, accessoire et région dans les métadonnées. [MPOPLUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) |
| R-MPO-medical — **Médecins, scientifiques et officiers recrutables** (tertiaire) | couverture_non_ventilee | Fonctions à illustrer sans leur inventer une nouvelle identité héroïque. Table de modèles et équipements par version; nom de provenance, palette, accessoire et région dans les métadonnées. [MPOPLUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) |
| R-MPO-regional — **Soldats régionaux et promotionnels MPO+** (tertiaire) | couverture_non_ventilee | Drapeaux et événements sont des variantes officielles; nombre exact à figer par région/édition. Table de modèles et équipements par version; nom de provenance, palette, accessoire et région dans les métadonnées. [MPOPLUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) |



### Portable Ops Plus


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MPO-GUEST — **Invités de jeux antérieurs** (bonus_officiel) | couverture_partielle | Old Snake et Raiden MPO+ présents; les autres types invités doivent être rapprochés, pas recomptés comme personnes inédites. Vérifier Johnny, Genome arctique, SEAL, Gurlukovich, Hi-Tech et Tengu selon l’édition, puis leur modèle PSP spécifique. [MPOPLUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) |



### Peace Walker


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-PW-PS — **Peace Sentinel — classes d’ennemis** (ennemi_recurrent) | couverture_non_ventilee | MSF Soldier ne remplace pas l’ennemi Peace Sentinel. Reconnaissance, fantassin, blindé et tireur : relever les classes réellement visibles et leur équipement dans le jeu; aucune liste de classes supposée complète. [PW](https://www.konami.com/mg/archive/mgs_pw/us/character/index.html); [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| R-PW-FSLN — **Guérilleros sandinistes** (tertiaire) | couverture_collective_absente | Amanda et Chico présents; les combattants du groupe restent un collectif différent. Modèles et accessoires des guérilleros, postures repos/alerte/transport blessé; même époque 1974. [PW](https://www.konami.com/mg/archive/mgs_pw/us/character/index.html) |



### Peace Walker — Monster Hunter


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-PW-TRENYA — **Trenya** (bonus_officiel) | absent_du_roster_actif | Collaboration officielle Monster Hunter, distincte de l’histoire principale. Référence de la créature, barque, tenue et gestes; pas de conversion automatique en chat humanoïde générique. [PWCOLLAB](https://www.konami.com/mg/archive/mgs_pw/en/) |



### Peace Walker


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-HIDEO-peace-walker — **Hideo — incarnation de jeu** (bonus_officiel) | portrait_produit_corps_non_livre | P41 a produit les portraits de trois incarnations, pas trois corps jouables. Conserver âge, lunettes, cheveux, uniforme et événement de sauvetage de chaque opus; produire le corps et son dossier de références séparément. [RELEASE41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md) |



### Ground Zeroes


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-HIDEO-ground-zeroes — **Hideo — incarnation de jeu** (bonus_officiel) | portrait_produit_corps_non_livre | P41 a produit les portraits de trois incarnations, pas trois corps jouables. Conserver âge, lunettes, cheveux, uniforme et événement de sauvetage de chaque opus; produire le corps et son dossier de références séparément. [RELEASE41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md) |



### The Phantom Pain


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-HIDEO-the-phantom-pain — **Hideo — incarnation de jeu** (bonus_officiel) | portrait_produit_corps_non_livre | P41 a produit les portraits de trois incarnations, pas trois corps jouables. Conserver âge, lunettes, cheveux, uniforme et événement de sauvetage de chaque opus; produire le corps et son dossier de références séparément. [RELEASE41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md) |



### Ground Zeroes


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-GZ-camp — **Gardes du camp Omega** (ennemi_recurrent) | absent_comme_entree_dediee | Les XOF, Glaz, Palitz, Chico et Paz déjà présents ne couvrent pas toutes les cibles annexes. Identifier nom/mission exacte et modèle source; type d’uniforme, entraves et attitude; préserver le rôle d’infiltration plutôt qu’inventer des attaques. [GZEX](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) |
| R-GZ-jcs — **Agent du JCS** (tertiaire) | absent_comme_entree_dediee | Les XOF, Glaz, Palitz, Chico et Paz déjà présents ne couvrent pas toutes les cibles annexes. Identifier nom/mission exacte et modèle source; type d’uniforme, entraves et attitude; préserver le rôle d’infiltration plutôt qu’inventer des attaques. [GZEX](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) |
| R-GZ-dod — **Agent du Department of Defense** (tertiaire) | absent_comme_entree_dediee | Les XOF, Glaz, Palitz, Chico et Paz déjà présents ne couvrent pas toutes les cibles annexes. Identifier nom/mission exacte et modèle source; type d’uniforme, entraves et attitude; préserver le rôle d’infiltration plutôt qu’inventer des attaques. [GZEX](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) |
| R-GZ-prisoner — **Prisonniers des missions annexes** (tertiaire) | absent_comme_entree_dediee | Les XOF, Glaz, Palitz, Chico et Paz déjà présents ne couvrent pas toutes les cibles annexes. Identifier nom/mission exacte et modèle source; type d’uniforme, entraves et attitude; préserver le rôle d’infiltration plutôt qu’inventer des attaques. [GZEX](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) |



### Ground Zeroes — Jamais Vu


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-GZ-SNATCH — **Body Snatchers / Raiden bonus** (bonus_officiel) | contexte_bonus_non_isole | Raiden existe ailleurs mais le bonus GZ a sa propre représentation et ses règles. Capturer distinction cible humaine/Snatcher et modèle de Raiden; ne pas présenter ce bonus comme événement canonique de 1975. [GZEX](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) |



### The Phantom Pain


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-TPP-PEQ — **Pequod** (secondaire) | absent_du_roster_actif | Indicatif de pilotes Diamond Dogs, distinct de Morpho et du véhicule UTH-66. Fiche pilote, tenue et gestes de cockpit documentés; rattacher explicitement l’hélicoptère. Ne pas supposer une seule biographie continue. [PEQUOD](https://metalgear.fandom.com/wiki/Pequod) |
| R-TPP-QUE — **Queequeg** (tertiaire) | absent_du_roster_actif | Pilote nommé; apparence complète non certifiée dans cet audit. Voix/mission/indicatif d’abord; produire une silhouette seulement à partir du modèle effectivement visible. [QUEEQUEG](https://metalgear.fandom.com/wiki/Queequeg) |
| R-TPP-doctor — **Médecin de l’hôpital** (tertiaire) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-nurse — **Infirmière de l’hôpital** (tertiaire) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-patients — **Patients et personnel de l’hôpital** (tertiaire) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-interpreters — **Interprètes russophone/afrikaans/kikongo** (tertiaire) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-targets — **Commandants, ingénieurs, marchands et prisonniers de missions** (tertiaire) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-children — **Enfants de la troupe d’Eli / Mbele** (tertiaire) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-pf — **Soldats soviétiques et forces privées africaines** (ennemi_recurrent) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |
| R-TPP-dd — **Personnel Diamond Dogs — femmes et hommes** (ennemi_recurrent) | couverture_non_ventilee | Des noms centraux sont présents; une entrée générique ne couvre pas tous les modèles. Relever mission, modèle, variante corporelle et vêtement; les cibles déjà présentes Malak/Viscount/Mosquito/Shabani restent liées à leurs UID. Les civils et enfants privilégient dossier/scène, sans kit de mercenaire inventé. [TPPEX](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) |



### MGS4


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGS4-rebelme — **Rebelles du Moyen-Orient** (tertiaire) | couverture_non_ventilee | Les quatre PMC et les personnages centraux existent; l’exhaustivité de leurs silhouettes n’est pas établie. Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html); [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| R-MGS4-rebelsa — **Rebelles sud-américains** (tertiaire) | couverture_non_ventilee | Les quatre PMC et les personnages centraux existent; l’exhaustivité de leurs silhouettes n’est pas établie. Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html); [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| R-MGS4-resistance — **Résistant d’Europe de l’Est** (tertiaire) | couverture_non_ventilee | Les quatre PMC et les personnages centraux existent; l’exhaustivité de leurs silhouettes n’est pas établie. Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html); [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| R-MGS4-pmc — **PMC — classes et équipements** (ennemi_recurrent) | couverture_non_ventilee | Les quatre PMC et les personnages centraux existent; l’exhaustivité de leurs silhouettes n’est pas établie. Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html); [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| R-MGS4-littlejohn — **Little John** (tertiaire) | couverture_non_ventilee | Les quatre PMC et les personnages centraux existent; l’exhaustivité de leurs silhouettes n’est pas établie. Source scène/modèle, distinction région, couvre-chef et port d’arme. Little John reste un enfant de scène, pas un corps de Raiden miniature. [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html); [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |



### Revengeance


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGR-standard — **Cyborg Desperado standard** (ennemi_recurrent) | absent_comme_archetype_dedie | Les boss et les UG ne remplacent pas les ennemis humanoïdes ordinaires. Capturer les modèles, armes et états présents; séparer humain R00, cyborg, blindage et arme équipée. La possession d’une arme n’est pas une nouvelle personne. [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/); [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) |
| R-MGR-armored — **Cyborgs blindés / variantes de commandement** (ennemi_recurrent) | absent_comme_archetype_dedie | Les boss et les UG ne remplacent pas les ennemis humanoïdes ordinaires. Capturer les modèles, armes et états présents; séparer humain R00, cyborg, blindage et arme équipée. La possession d’une arme n’est pas une nouvelle personne. [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/); [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) |
| R-MGR-berserker — **Berserkers et utilisateurs d’armes lourdes** (ennemi_recurrent) | absent_comme_archetype_dedie | Les boss et les UG ne remplacent pas les ennemis humanoïdes ordinaires. Capturer les modèles, armes et états présents; séparer humain R00, cyborg, blindage et arme équipée. La possession d’une arme n’est pas une nouvelle personne. [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/); [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) |
| R-MGR-police — **Forces de sécurité / police de Denver** (ennemi_recurrent) | absent_comme_archetype_dedie | Les boss et les UG ne remplacent pas les ennemis humanoïdes ordinaires. Capturer les modèles, armes et états présents; séparer humain R00, cyborg, blindage et arme équipée. La possession d’une arme n’est pas une nouvelle personne. [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/); [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) |
| R-MGR-scientist — **Scientifique de la séquence du laboratoire** (tertiaire) | absent_comme_archetype_dedie | Les boss et les UG ne remplacent pas les ennemis humanoïdes ordinaires. Capturer les modèles, armes et états présents; séparer humain R00, cyborg, blindage et arme équipée. La possession d’une arme n’est pas une nouvelle personne. [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/); [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) |
| R-MGR-soldier — **Soldats humains de la séquence R-00** (ennemi_recurrent) | absent_comme_archetype_dedie | Les boss et les UG ne remplacent pas les ennemis humanoïdes ordinaires. Capturer les modèles, armes et états présents; séparer humain R00, cyborg, blindage et arme équipée. La possession d’une arme n’est pas une nouvelle personne. [MGR](https://www.konami.com/mg/archive/mgr/jp/characters/); [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) |



### Ghost Babel


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-GB-no4 — **No. 4** (tertiaire) | pas_de_dossier_individualise_retrouve | Piste de l’index complémentaire; présence visuelle et rôle exact restent à relever dans le scénario. Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. [GBEX](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) |
| R-GB-smith — **Lieutenant Smith** (tertiaire) | pas_de_dossier_individualise_retrouve | Piste de l’index complémentaire; présence visuelle et rôle exact restent à relever dans le scénario. Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. [GBEX](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) |
| R-GB-parker — **John Parker** (tertiaire) | pas_de_dossier_individualise_retrouve | Piste de l’index complémentaire; présence visuelle et rôle exact restent à relever dans le scénario. Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. [GBEX](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) |
| R-GB-gardner — **Steve Gardner** (tertiaire) | pas_de_dossier_individualise_retrouve | Piste de l’index complémentaire; présence visuelle et rôle exact restent à relever dans le scénario. Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. [GBEX](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) |
| R-GB-weah — **William Weah** (tertiaire) | pas_de_dossier_individualise_retrouve | Piste de l’index complémentaire; présence visuelle et rôle exact restent à relever dans le scénario. Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. [GBEX](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) |
| R-GB-brother — **Frère de Weasel** (tertiaire) | pas_de_dossier_individualise_retrouve | Piste de l’index complémentaire; présence visuelle et rôle exact restent à relever dans le scénario. Fiche nominative avec citation de scène; aucun corps ou costume officiel inventé lorsque la source est seulement textuelle. [GBEX](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) |



### AC!D


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-ACID-HAROLD — **Harold Burton** (tertiaire) | pas_de_dossier_individualise_retrouve | Nom secondaire à recouper au script. Définir rôle, mention/apparition et relation aux identités déjà présentes; pas de corps 1:1 sans image. [ACIDEX](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_Characters) |
| R-ACID-DECOY — **Faux Flemming** (tertiaire) | apparence_du_leurre_non_isolee | Le modèle du scientifique est réemployé avec un sac sur la tête pour l’imposteur. Créer le lien d’apparence et la séquence propre au leurre; ne pas assimiler cet imposteur au véritable alias Gary Murray. [FLEMMING](https://metalgear.fandom.com/wiki/William_L._Flemming) |



### AC!D / AC!D 2


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-ACID-GUARDS — **Soldats de Genetics / mercenaires de Leone / personnels SaintLogic** (ennemi_recurrent) | couverture_partielle | SaintLogic Guard est présent; les autres ensembles doivent être ventilés. Séparer les modèles PSP des illustrations de cartes, puis palettes/armes officielles; ne pas transférer toutes les cartes au roster. [ACIDEX](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_Characters); [ACID2EX](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_2_Characters) |



### Survive


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-SURVIVE-harley-warren — **Harley Warren** (tertiaire) | pas_de_dossier_individualise_retrouve | Nom d’archives; une entrée encyclopédique ne prouve pas une tenue de combat visible. Recueillir journal/enregistrement et éventuel portrait; exclure les inventions corporelles du compte officiel. [SURVIVE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Survive_Characters) |
| R-SURVIVE-joel-marton — **Joel Marton** (tertiaire) | pas_de_dossier_individualise_retrouve | Nom d’archives; une entrée encyclopédique ne prouve pas une tenue de combat visible. Recueillir journal/enregistrement et éventuel portrait; exclure les inventions corporelles du compte officiel. [SURVIVE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Survive_Characters) |
| R-SURVIVE-AVATAR — **Captain — avatar féminin/masculin et apparences personnalisées** (principal) | avatar_generique_present_variantes_non_ventilees | Le Captain possède une entrée, mais l’avatar n’est pas une seule personne à visage canonique imposé. Cataloguer morphologies, vêtements et équipement sélectionnables; combinaisons dans un système modulaire, pas des milliers de faux personnages. [SURVIVE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Survive_Characters) |



### MGO1


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGO1 — **Avatars, classes et personnages uniques** (bonus_officiel) | operateur_unique_present_catalogue_modulaire_manquant | GRU/KGB/Ocelot Unit et personnages uniques selon le mode. Référencer les catégories de corps/équipement, les restrictions et les kits propres au mode; ne pas recompter Snake/Ocelot/Quiet comme personnes nouvelles. [MGO](https://metalgear.fandom.com/wiki/Metal_Gear_Online_equipment); [MGO3](https://www.konami.com/games/eu/fr/topics/2377/) |



### MGO2


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGO2 — **Avatars, classes et personnages uniques** (bonus_officiel) | operateur_unique_present_catalogue_modulaire_manquant | Avatars femmes/hommes; personnages uniques avec leurs règles Online. Référencer les catégories de corps/équipement, les restrictions et les kits propres au mode; ne pas recompter Snake/Ocelot/Quiet comme personnes nouvelles. [MGO](https://metalgear.fandom.com/wiki/Metal_Gear_Online_equipment); [MGO3](https://www.konami.com/games/eu/fr/topics/2377/) |



### MGO3


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-MGO3 — **Avatars, classes et personnages uniques** (bonus_officiel) | operateur_unique_present_catalogue_modulaire_manquant | Scout, Enforcer, Infiltrator; Venom/Ocelot/Quiet uniques. Référencer les catégories de corps/équipement, les restrictions et les kits propres au mode; ne pas recompter Snake/Ocelot/Quiet comme personnes nouvelles. [MGO](https://metalgear.fandom.com/wiki/Metal_Gear_Online_equipment); [MGO3](https://www.konami.com/games/eu/fr/topics/2377/) |



### Mobile / Touch / Arcade / Social Ops / AC!D Mobile


| ID · personnage · niveau | État constaté | Référence et travail demandé |
| --- | --- | --- |
| R-SIDE-CATALOG — **Ennemis et variantes de ces versions** (tertiaire) | un_operateur_ou_heros_ne_prouve_pas_lexhaustivite | Les héros/opérateurs existent dans CQC; aucun inventaire exhaustif des modèles de chaque version n’est démontré. Référencer chaque version Java/3D, résolution, captures et ennemis; cartes Social Ops et cibles Touch ne deviennent pas des personnages narratifs nouveaux. [MOBILE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Solid_Mobile_Characters); [ACID](https://www.konami.com/mg/archive/mga/english/introduction.html); [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html) |




## 5. Costumes officiels : ce qui existe réellement

Les 26 variantes officielles de l’index concernent deux incarnations : Naked Snake PS2 et Raiden Revengeance. Elles ne couvrent pas automatiquement le même motif dans Delta, la même armure dans un autre jeu ou le costume porté par une autre personne.


| Porteur | Variantes déjà indexées | Limite |
| --- | --- | --- |
| Naked Snake MGS3 PS2 | Watersnake; Urban Tiger; KLMK; Former East Germany; Former West Germany; Night Desert; Chameleon; Grenade; Flower; Santa Claus; Rock; Mummy; Festival; Swamp; Anubis; Rainbow; Animals; St. Valentine; DODODO; Banana; Fly; DPM. | 22 tenues déclarées; leurs fichiers doivent encore être comparés visuellement. Animals et Fly ne doivent pas être réintroduits comme absents sous une autre orthographe. |
| Raiden Revengeance | White Armor; Inferno Armor; Commando Armor; Cyborg Ninja. | 4 corps/armures officiels déclarés. Custom Red/Blue/Yellow ne sont pas les mêmes bonus. |
| Snake MGS2 et Pliskin | Liaison dans les deux sens. | Deux options d’accès vers des corps existants; pas deux tenues nouvellement dessinées. |
| EVA PS2 et Tatyana | Liaison dans les deux sens. | Déguisement officiel; même personne. Pas une liaison automatique avec EVA Delta. |
| Tenues Original | Tiger Stripe PS2; Battle Dress PW; OctoCamo gris MGS4; fatigues Tiger Stripe Venom; Olive Drab Delta; corps noir MGR; corps standard R00. | Déclarées par les métadonnées de base; contrôler l’image. Leur absence de menu alternatif ne constitue pas une absence graphique. |


Références : [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html); [MGRDLC](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html); [APPEARANCES](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-canonical-appearances.js).



### Lacunes prioritaires des tenues officielles

**MGS3 :** la présence de nombreuses récompenses et camouflages téléchargeables ne couvre pas encore l’ensemble des uniformes ordinaires, des déguisements de scénario, des face paints et des états de blessure. L’original PS2 déclaré utilise Tiger Stripe avant la blessure à l’œil. Réutiliser ce corps sans modifier l’état du visage dans une scène postérieure ne satisfait pas le 1:1. L’archive officielle identifie certains motifs issus d’un concours de fans; ils font partie des bonus publiés et ne doivent pas être reclassés en créations CQC.

**Delta :** une nouvelle série de références est nécessaire pour le modèle du remake. Le registre joint énumère les 59 lignes de vêtements d’un guide de collecte, dont Olive Drab est déjà déclaré comme original. Les vêtements du Sneaking DLC Pack et le White Tuxedo sont vérifiés par la communication officielle; le reste demande la capture du menu/modèle Delta. Les accessoires Glasses, Sunglasses, Kerotan Mask et GA-KO Mask sont séparés. Cette liste n’implique pas que les effets de chaque uniforme doivent être copiés dans les règles du versus.

**Peace Walker :** Battle Dress est déjà le corps original de Big Boss, mais le reste de la garde-robe n’est pas représenté comme une série distincte. Les variantes des recrues ne sont pas toujours identiques à celles de Snake : Naked, Miller, Amanda et les vêtements de baignade ont des porteurs et des coupes propres. Les collaborations et T-shirts doivent être triés par région/version. Ne jamais déduire une tenue officielle intitulée « Turtle Armor » de l’existence de Battle Dress.

**MGSV :** préserver le corps de Venom sous les costumes, son bras gauche et son œil droit. Les habits EVA et The Boss appartiennent aux recrues féminines autorisées par le DLC; ils ne deviennent pas des vêtements de Quiet par simple rapprochement. Quiet, D-Dog, D-Horse et D-Walker demandent leurs propres grilles d’équipement. Les selles Western/Parade sont des pièces de cheval, pas des costumes humanoïdes.

**MGS4 :** OctoCamo, FaceCamo et déguisements constituent trois systèmes différents. Le masque Young Snake ne rajeunit pas le corps d’Old Snake. Un motif capturé sur un mur est une configuration de camouflage, pas un personnage supplémentaire. La tenue civile finale est à relever précisément; un Gala original ne la remplace pas.

**Revengeance :** R00 est déjà présent. Il reste à distinguer le Standard Body utilisé comme costume déverrouillé, le corps MGS4 vendu en DLC, Mariachi, Suit, Desperado et les palettes Red/Blue/Yellow. Les perruques et les équipements possèdent leur fiche d’accessoire. Une couleur rouge ne suffit pas à confondre Custom Red et Inferno Armor.

Les sources et les spécifications individuelles de chacune de ces tâches figurent dans le tableau suivant et dans le CSV. Les lignes `catalogue_modulaire` désignent expressément une énumération encore ouverte : elles ne sont pas une prétention à avoir identifié toutes les récompenses Online, tous les motifs régionaux ou toutes les combinaisons d’avatar.


### Catalogue complet des références costumes de cet audit


Les statuts `present_*` sont conservés pour qu’une prochaine équipe ne refasse pas un asset déjà livré. `non_repertorie_comme_option_distincte` est une lacune de catalogue/actionnabilité : la revue visuelle doit aussi vérifier l’Original. Le CSV contient en plus les spécifications visuelles et d’animation complètes de chaque ligne.


| ID | Opus · porteur | Tenue / accessoire / état | Type · état | Sources / condition |
| --- | --- | --- | --- | --- |
| C-0001 | Revengeance · `core__raiden` | White Armor | corps_officiel · present_indexe | [MGRDLC](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0002 | Revengeance · `core__raiden` | Inferno Armor | corps_officiel · present_indexe | [MGRDLC](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0003 | Revengeance · `core__raiden` | Commando Armor | corps_officiel · present_indexe | [MGRDLC](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0004 | Revengeance · `core__raiden` | Cyborg Ninja | corps_officiel · present_indexe | [MGRDLC](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0005 | MGS3 PS2 · `core__snake` | Watersnake | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0006 | MGS3 PS2 · `core__snake` | Urban Tiger | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0007 | MGS3 PS2 · `core__snake` | KLMK | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0008 | MGS3 PS2 · `core__snake` | Former East Germany | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0009 | MGS3 PS2 · `core__snake` | Former West Germany | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0010 | MGS3 PS2 · `core__snake` | Night Desert | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0011 | MGS3 PS2 · `core__snake` | Chameleon | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0012 | MGS3 PS2 · `core__snake` | Grenade | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0013 | MGS3 PS2 · `core__snake` | Fleur | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0014 | MGS3 PS2 · `core__snake` | Santa Claus | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0015 | MGS3 PS2 · `core__snake` | Roche | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0016 | MGS3 PS2 · `core__snake` | Momie | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0017 | MGS3 PS2 · `core__snake` | Festival | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0018 | MGS3 PS2 · `core__snake` | Swamp | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0019 | MGS3 PS2 · `core__snake` | Anubis | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0020 | MGS3 PS2 · `core__snake` | Rainbow | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0021 | MGS3 PS2 · `core__snake` | Animals | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0022 | MGS3 PS2 · `core__snake` | St. Valentine | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0023 | MGS3 PS2 · `core__snake` | DODODO | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0024 | MGS3 PS2 · `core__snake` | Banana | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0025 | MGS3 PS2 · `core__snake` | Fly | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0026 | MGS3 PS2 · `core__snake` | DPM | palette_officielle · present_indexe | [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) — Entrée présente; chargement différé ≠ absence de production. |
| C-0027 | MGS1 · `core__solid` | Sneaking Suit PS1 | tenue_officielle · present_comme_original_declare | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Base déjà présente. |
| C-0028 | MGS1 · `core__solid` | Tuxedo PS1 | tenue_officielle · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Gala CQC de cet UID est original; il ne certifie pas le tuxedo déverrouillable. |
| C-0029 | MGS1 Integral · `core__solid` | Sneaking Suit — Very Easy / équipement MP5 | bonus_edition · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Référence d’édition à confirmer; modification d’équipement distincte du modèle entier. |
| C-0030 | MGS1 · `core__meryl_mgs1` | Déguisement Genome | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Même Meryl sous l’uniforme; pas un Genome anonyme. |
| C-0031 | MGS1 · `core__meryl_mgs1` | Tenue d’exercice / sous-vêtements bonus | bonus_edition · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Adulte; reproduction du bonus publié uniquement. |
| C-0032 | MGS1 · `core__liquid` | Manteau et tenue portée dans les scènes | tenue_officielle · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Comparer le costume de base pour éviter doublon. |
| C-0033 | MGS1 · `core__liquid` | Torse nu — combat final | etat_narratif · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — État de combat final; garder l’âge, coiffure et blessures PS1. |
| C-0034 | MGS1 · `core__mantis` | Sans masque | etat_narratif · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Visage attesté; ne pas substituer un visage TTS. |
| C-0035 | MGS1 · `core__fox` | Ninja endommagé / visage découvert | etat_narratif · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — États cinématiques; membres endommagés ne sont pas un nouveau combattant. |
| C-0036 | The Twin Snakes · `archive__snake_tts` | Tuxedo GameCube | tenue_officielle · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Édition GameCube distincte du tuxedo PS1. |
| C-0037 | The Twin Snakes · `roster51__meryl_tts` | Uniforme Genome / tenue bonus | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Relever modèle GameCube et règles exactes du bonus. |
| C-0038 | The Twin Snakes · `roster51__liquid_tts` | Torse nu — final TTS | etat_narratif · non_repertorie_comme_option_distincte | [MGS1](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) — Graphisme et chorégraphie du remake; pas une extension automatique du corps PS1. |
| C-0039 | MGS2 · `core__snake_mgs2` | Sneaking Suit Tanker/Plant | tenue_officielle · present_comme_original_declare | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Base présente. |
| C-0040 | MGS2 · `core__snake_mgs2` | Tenue de plongeur / imperméable du Tanker | etat_narratif · non_repertorie_comme_option_distincte | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Étapes de scène, à référencer séparément si toutes visibles. |
| C-0041 | MGS2 · `core__raiden_mgs2` | Sneaking Suit / équipement HF | tenue_officielle · present_comme_original_declare | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Base présente; le katana est un équipement. |
| C-0042 | MGS2 · `core__raiden_mgs2` | Uniforme ennemi Shell 1 | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Visage et corps de Raiden humain sous l’uniforme Gurlukovich. |
| C-0043 | MGS2 · `core__raiden_mgs2` | État captif Arsenal Gear | etat_narratif · non_repertorie_comme_option_distincte | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — État narratif sans équipement; à traiter comme dossier/scène si nécessaire, aucune tenue imaginaire. |
| C-0044 | MGS2 Substance VR · `archive__raiden_vr` | Raiden X | bonus_edition · non_repertorie_comme_option_distincte | [MGS2VR](https://metalgear.neoseeker.com/wiki/Metal_Gear_Solid_2%3A_Substance) — Catégorie VR spécifique avec ses restrictions; distincte de Ninja Raiden. |
| C-0045 | MGS2 Substance VR · `archive__raiden_vr` | Ninja Raiden | bonus_edition · non_repertorie_comme_option_distincte | [MGS2VR](https://metalgear.neoseeker.com/wiki/Metal_Gear_Solid_2%3A_Substance) — Corps de bonus VR distinct de R00, MGS4 et MGR. |
| C-0046 | MGS2 Substance VR · `core__snake_mgs2` | Snake Tuxedo | bonus_edition · non_repertorie_comme_option_distincte | [MGS2VR](https://metalgear.neoseeker.com/wiki/Metal_Gear_Solid_2%3A_Substance); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Corps bonus Substance; ne pas lier au Snake VR PS1 par erreur. |
| C-0047 | MGS2 Substance VR · `core__snake_mgs2` | MGS1 Snake | bonus_edition · non_repertorie_comme_option_distincte | [MGS2VR](https://metalgear.neoseeker.com/wiki/Metal_Gear_Solid_2%3A_Substance) — Modèle bonus Substance; édition et animations VR à relever. |
| C-0048 | MGS2 · `core__solidus` | Armure — bras mécaniques attachés / retirés | etat_narratif · non_repertorie_comme_option_distincte | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Deux phases d’un corps, pas deux personnes; conserver les connecteurs et la cape si attestée dans la séquence. |
| C-0049 | MGS2 · `core__olga_mgs2` | Cheveux / équipement Tanker | tenue_officielle · non_repertorie_comme_option_distincte | [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Olga Ninja dispose déjà de son UID séparé; pas une nouvelle identité. |
| C-0050 | MGS1 Integral PS1 · `core__meryl_mgs1` | Meryl Sneaking Suit | bonus_edition · non_repertorie_comme_option_distincte | [INTEGRAL](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Integral) — Bonus publié à vérifier dans l’édition ciblée; la présence dans Integral PS1 ne garantit pas le port PC ou un autre port. |
| C-0051 | The Twin Snakes · `roster51__meryl_tts` | Meryl Sneaking Suit — GameCube | bonus_edition · non_repertorie_comme_option_distincte | [INTEGRAL](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Integral) — Bonus publié à vérifier dans l’édition ciblée; la présence dans Integral PS1 ne garantit pas le port PC ou un autre port. |
| C-0052 | MGS1 · `core__fox` | Palette alternative rouge / grise | bonus_edition · non_repertorie_comme_option_distincte | [MGS1BONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_secrets) — Bonus publié à vérifier dans l’édition ciblée; la présence dans Integral PS1 ne garantit pas le port PC ou un autre port. |
| C-0053 | MGS2 Substance · `core__snake_mgs2` | Lunettes de soleil — bonus | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS2SUB](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_2%3A_Substance) — Bonus publié à vérifier dans l’édition ciblée; la présence dans Integral PS1 ne garantit pas le port PC ou un autre port. |
| C-0054 | MGS2 Substance · `core__raiden_mgs2` | Lunettes de soleil — bonus | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS2SUB](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_2%3A_Substance) — Bonus publié à vérifier dans l’édition ciblée; la présence dans Integral PS1 ne garantit pas le port PC ou un autre port. |
| C-0055 | MGS2 · `core__snake_mgs2` | Pliskin · MGS2 | deguisement_narratif · present_option_chargee | [APPEARANCES](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-canonical-appearances.js); [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Liaison vers un corps déjà présent, pas un nouveau dessin ajouté au total physique. |
| C-0056 | MGS2 · `roster51__pliskin_mgs2` | Philanthropy · MGS2 | deguisement_narratif · present_option_chargee | [APPEARANCES](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-canonical-appearances.js); [MGS2](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) — Liaison vers un corps déjà présent, pas un nouveau dessin ajouté au total physique. |
| C-0057 | MGS3 PS2 · `core__eva_mgs3` | Tatyana · uniforme soviétique | deguisement_narratif · present_option_chargee | [APPEARANCES](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-canonical-appearances.js); [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html) — Liaison vers un corps déjà présent, pas un nouveau dessin ajouté au total physique. |
| C-0058 | MGS3 PS2 · `npc53__tatyana_mgs3` | EVA · tenue de motarde PS2 | deguisement_narratif · present_option_chargee | [APPEARANCES](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-canonical-appearances.js); [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html) — Liaison vers un corps déjà présent, pas un nouveau dessin ajouté au total physique. |
| C-0059 | MGS3 PS2 · `core__snake` | Naked | tenue_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0060 | MGS3 PS2 · `core__snake` | Olive Drab | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0061 | MGS3 PS2 · `core__snake` | Tiger Stripe | palette_officielle · present_comme_original_declare | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0062 | MGS3 PS2 · `core__snake` | Leaf | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0063 | MGS3 PS2 · `core__snake` | Tree Bark | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0064 | MGS3 PS2 · `core__snake` | Choco Chip | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0065 | MGS3 PS2 · `core__snake` | Splitter | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0066 | MGS3 PS2 · `core__snake` | Raindrop | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0067 | MGS3 PS2 · `core__snake` | Squares | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0068 | MGS3 PS2 · `core__snake` | Water | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0069 | MGS3 PS2 · `core__snake` | Black | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0070 | MGS3 PS2 · `core__snake` | Snow | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0071 | MGS3 PS2 · `core__snake` | Hornet Stripe | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0072 | MGS3 PS2 · `core__snake` | Spider | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0073 | MGS3 PS2 · `core__snake` | Moss | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0074 | MGS3 PS2 · `core__snake` | Fire | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0075 | MGS3 PS2 · `core__snake` | Spirit | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0076 | MGS3 PS2 · `core__snake` | Cold War | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0077 | MGS3 PS2 · `core__snake` | Snake | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0078 | MGS3 PS2 · `core__snake` | GA-KO | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0079 | MGS3 PS2 · `core__snake` | Desert Tiger | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0080 | MGS3 PS2 · `core__snake` | Flecktarn | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0081 | MGS3 PS2 · `core__snake` | Desert Auscam | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0082 | MGS3 PS2 · `core__snake` | Scientist | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0083 | MGS3 PS2 · `core__snake` | Officer | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0084 | MGS3 PS2 · `core__snake` | Maintenance | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0085 | MGS3 PS2 · `core__snake` | Sneaking Suit | tenue_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0086 | MGS3 PS2 · `core__snake` | Tuxedo | tenue_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0087 | MGS3 PS2 · `core__snake` | Barracuda | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0088 | MGS3 PS2 · `core__snake` | Soviet Woodland | palette_officielle · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAMO](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) |
| C-0089 | MGS3 — bonus régionaux / archives · `core__snake` | Yodobashi | bonus_edition · non_repertorie_comme_option_distincte | [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Existence/distribution/édition et statut publié ou inutilisé à vérifier sur capture primaire; ne pas déclarer ces variantes universelles. |
| C-0090 | MGS3 — bonus régionaux / archives · `core__snake` | WonderGOO | bonus_edition · non_repertorie_comme_option_distincte | [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Existence/distribution/édition et statut publié ou inutilisé à vérifier sur capture primaire; ne pas déclarer ces variantes universelles. |
| C-0091 | MGS3 — bonus régionaux / archives · `core__snake` | E-DEN | bonus_edition · non_repertorie_comme_option_distincte | [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Existence/distribution/édition et statut publié ou inutilisé à vérifier sur capture primaire; ne pas déclarer ces variantes universelles. |
| C-0092 | MGS3 — bonus régionaux / archives · `core__snake` | Bonsai | bonus_edition · non_repertorie_comme_option_distincte | [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Existence/distribution/édition et statut publié ou inutilisé à vérifier sur capture primaire; ne pas déclarer ces variantes universelles. |
| C-0093 | MGS3 — bonus régionaux / archives · `core__snake` | USMX | bonus_edition · non_repertorie_comme_option_distincte | [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Existence/distribution/édition et statut publié ou inutilisé à vérifier sur capture primaire; ne pas déclarer ces variantes universelles. |
| C-0094 | MGS3 — bonus régionaux / archives · `core__snake` | M81 Woodland — statut à vérifier | bonus_edition · non_repertorie_comme_option_distincte | [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Existence/distribution/édition et statut publié ou inutilisé à vérifier sur capture primaire; ne pas déclarer ces variantes universelles. |
| C-0095 | MGS3 PS2 · `core__snake` | No Paint — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0096 | MGS3 PS2 · `core__snake` | Woodland — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0097 | MGS3 PS2 · `core__snake` | Black — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0098 | MGS3 PS2 · `core__snake` | Water — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0099 | MGS3 PS2 · `core__snake` | Desert — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0100 | MGS3 PS2 · `core__snake` | Splitter — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0101 | MGS3 PS2 · `core__snake` | Snow — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0102 | MGS3 PS2 · `core__snake` | Kabuki — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0103 | MGS3 PS2 · `core__snake` | Zombie — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0104 | MGS3 PS2 · `core__snake` | Oyama — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0105 | MGS3 PS2 · `core__snake` | Infinity — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0106 | MGS3 PS2 · `core__snake` | Green — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0107 | MGS3 PS2 · `core__snake` | Brown — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0108 | MGS3 PS2 · `core__snake` | Drapeaux nationaux — neuf entrées à localiser — Face Paint | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3CAML](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage); [MGS3CAME](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) — Disponibilité variable selon édition; la table des drapeaux est une tâche d’énumération restante et non neuf variantes certifiées ici. |
| C-0109 | MGS3 PS2 · `core__snake` | Masque Raikov | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [CROCODILE](https://metalgear.fandom.com/wiki/Crocodile_Cap) — Crocodile Cap est une tête/accessoire; ne pas l’assimiler au Crocodile Suit Delta. |
| C-0110 | MGS3 PS2 · `core__snake` | Crocodile Cap | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [CROCODILE](https://metalgear.fandom.com/wiki/Crocodile_Cap) — Crocodile Cap est une tête/accessoire; ne pas l’assimiler au Crocodile Suit Delta. |
| C-0111 | MGS3 PS2 · `core__snake` | Cache-œil et blessures — après torture | etat_narratif · non_repertorie_comme_option_distincte | [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [CROCODILE](https://metalgear.fandom.com/wiki/Crocodile_Cap) — Crocodile Cap est une tête/accessoire; ne pas l’assimiler au Crocodile Suit Delta. |
| C-0112 | MGS3 PS2 · `core__snake` | Uniforme de cérémonie final | etat_narratif · non_repertorie_comme_option_distincte | [MGS3](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html); [CROCODILE](https://metalgear.fandom.com/wiki/Crocodile_Cap) — Crocodile Cap est une tête/accessoire; ne pas l’assimiler au Crocodile Suit Delta. |
| C-0113 | MGS Δ: Snake Eater · `archive__naked_delta` | Naked | tenue_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0114 | MGS Δ: Snake Eater · `archive__naked_delta` | Olive Drab | palette_officielle · present_comme_original_declare | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0115 | MGS Δ: Snake Eater · `archive__naked_delta` | Tiger Stripe | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0116 | MGS Δ: Snake Eater · `archive__naked_delta` | Leaf | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0117 | MGS Δ: Snake Eater · `archive__naked_delta` | Tree Bark | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0118 | MGS Δ: Snake Eater · `archive__naked_delta` | Choco Chip | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0119 | MGS Δ: Snake Eater · `archive__naked_delta` | Splitter | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0120 | MGS Δ: Snake Eater · `archive__naked_delta` | Raindrop | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0121 | MGS Δ: Snake Eater · `archive__naked_delta` | Squares | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0122 | MGS Δ: Snake Eater · `archive__naked_delta` | Water | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0123 | MGS Δ: Snake Eater · `archive__naked_delta` | Black | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0124 | MGS Δ: Snake Eater · `archive__naked_delta` | Snow | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0125 | MGS Δ: Snake Eater · `archive__naked_delta` | Animals | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0126 | MGS Δ: Snake Eater · `archive__naked_delta` | Hornet Stripe | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0127 | MGS Δ: Snake Eater · `archive__naked_delta` | Spider | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0128 | MGS Δ: Snake Eater · `archive__naked_delta` | Moss | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0129 | MGS Δ: Snake Eater · `archive__naked_delta` | Fire | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0130 | MGS Δ: Snake Eater · `archive__naked_delta` | Spirit | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0131 | MGS Δ: Snake Eater · `archive__naked_delta` | Cold War | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0132 | MGS Δ: Snake Eater · `archive__naked_delta` | Snake | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0133 | MGS Δ: Snake Eater · `archive__naked_delta` | GA-KO | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0134 | MGS Δ: Snake Eater · `archive__naked_delta` | Fly | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0135 | MGS Δ: Snake Eater · `archive__naked_delta` | Desert Tiger | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0136 | MGS Δ: Snake Eater · `archive__naked_delta` | DPM | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0137 | MGS Δ: Snake Eater · `archive__naked_delta` | Flecktarn | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0138 | MGS Δ: Snake Eater · `archive__naked_delta` | Auscam | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0139 | MGS Δ: Snake Eater · `archive__naked_delta` | Banana | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0140 | MGS Δ: Snake Eater · `archive__naked_delta` | Grenade | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0141 | MGS Δ: Snake Eater · `archive__naked_delta` | Mummy | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0142 | MGS Δ: Snake Eater · `archive__naked_delta` | Santa Claus | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0143 | MGS Δ: Snake Eater · `archive__naked_delta` | St. Valentine | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0144 | MGS Δ: Snake Eater · `archive__naked_delta` | Former East Germany | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0145 | MGS Δ: Snake Eater · `archive__naked_delta` | Former West Germany | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0146 | MGS Δ: Snake Eater · `archive__naked_delta` | Soviet Woodland | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0147 | MGS Δ: Snake Eater · `archive__naked_delta` | Urban Tiger | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0148 | MGS Δ: Snake Eater · `archive__naked_delta` | KLMK | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0149 | MGS Δ: Snake Eater · `archive__naked_delta` | Rainbow | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0150 | MGS Δ: Snake Eater · `archive__naked_delta` | Chameleon | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0151 | MGS Δ: Snake Eater · `archive__naked_delta` | Barracuda | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0152 | MGS Δ: Snake Eater · `archive__naked_delta` | Festival | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0153 | MGS Δ: Snake Eater · `archive__naked_delta` | DODODO | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0154 | MGS Δ: Snake Eater · `archive__naked_delta` | Rock | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0155 | MGS Δ: Snake Eater · `archive__naked_delta` | Watersnake | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0156 | MGS Δ: Snake Eater · `archive__naked_delta` | Night Desert | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0157 | MGS Δ: Snake Eater · `archive__naked_delta` | Swamp | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0158 | MGS Δ: Snake Eater · `archive__naked_delta` | Flower | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0159 | MGS Δ: Snake Eater · `archive__naked_delta` | Anubis | palette_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0160 | MGS Δ: Snake Eater · `archive__naked_delta` | Scientist | deguisement_narratif · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0161 | MGS Δ: Snake Eater · `archive__naked_delta` | Officer | deguisement_narratif · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0162 | MGS Δ: Snake Eater · `archive__naked_delta` | Maintenance | deguisement_narratif · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0163 | MGS Δ: Snake Eater · `archive__naked_delta` | Sneaking Suit | tenue_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0164 | MGS Δ: Snake Eater · `archive__naked_delta` | Sneaking Suit (PW Ver.) | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0165 | MGS Δ: Snake Eater · `archive__naked_delta` | Battle Dress (PW Ver.) | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0166 | MGS Δ: Snake Eater · `archive__naked_delta` | Tuxedo | tenue_officielle · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Référence modèle Delta à capturer; la version PS2 reste une référence comparative seulement. |
| C-0167 | MGS Δ: Snake Eater · `archive__naked_delta` | White Tuxedo | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0168 | MGS Δ: Snake Eater · `archive__naked_delta` | Crocodile Suit | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0169 | MGS Δ: Snake Eater · `archive__naked_delta` | Naked Woodland | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0170 | MGS Δ: Snake Eater · `archive__naked_delta` | Naked Ammunition Belt | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0171 | MGS Δ: Snake Eater · `archive__naked_delta` | Gold | tenue_officielle · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) — DLC/bonus officiel, non original CQC. |
| C-0172 | MGS Δ: Snake Eater · `archive__naked_delta` | Glasses | accessoire_officiel · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) |
| C-0173 | MGS Δ: Snake Eater · `archive__naked_delta` | Sunglasses | accessoire_officiel · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) |
| C-0174 | MGS Δ: Snake Eater · `archive__naked_delta` | Kerotan Mask | accessoire_officiel · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) |
| C-0175 | MGS Δ: Snake Eater · `archive__naked_delta` | GA-KO Mask | accessoire_officiel · non_repertorie_comme_option_distincte | [DELTA](https://www.konami.com/games/eu/fr/topics/18806/) |
| C-0176 | MGS Δ: Snake Eater · `archive__naked_delta` | Face Paint — catalogue propre à Delta | catalogue_modulaire · non_repertorie_comme_option_distincte | [DELTALIST](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) — Décliner chaque maquillage confirmé dans le menu Delta; aucune importation automatique de tout le catalogue PS2. |
| C-0177 | Snake Eater 3D · `core__snake` | Photo Camouflage | bonus_edition · non_repertorie_comme_option_distincte | [3DS](https://www.konami.com/mg/archive/mgs_se/jp/guide/index.html) — Créer un profil de rendu 3DS, pas transformer Delta en 3DS par un filtre. |
| C-0178 | Peace Walker · `core__snake_pw` | Jungle Fatigues — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0179 | Peace Walker · `core__snake_pw` | Jungle Fatigues — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0180 | Peace Walker · `core__snake_pw` | Leaf — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0181 | Peace Walker · `core__snake_pw` | Leaf — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0182 | Peace Walker · `core__snake_pw` | Tiger Stripe — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0183 | Peace Walker · `core__snake_pw` | Tiger Stripe — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0184 | Peace Walker · `core__snake_pw` | Choco-Chip — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0185 | Peace Walker · `core__snake_pw` | Choco-Chip — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0186 | Peace Walker · `core__snake_pw` | Desert Auscam — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0187 | Peace Walker · `core__snake_pw` | Desert Auscam — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0188 | Peace Walker · `core__snake_pw` | Squares — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0189 | Peace Walker · `core__snake_pw` | Squares — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0190 | Peace Walker · `core__snake_pw` | Splitter — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0191 | Peace Walker · `core__snake_pw` | Splitter — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0192 | Peace Walker · `core__snake_pw` | Snake — standard | palette_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0193 | Peace Walker · `core__snake_pw` | Snake — Naked | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) |
| C-0194 | Peace Walker · `core__snake_pw` | Sneaking Suit | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0195 | Peace Walker · `core__snake_pw` | Battle Dress | tenue_officielle · present_comme_original_declare | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0196 | Peace Walker · `core__snake_pw` | Battle Dress avec casque / rang évolué | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0197 | Peace Walker · `core__snake_pw` | Tuxedo | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0198 | Peace Walker · `core__snake_pw` | T-shirt | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0199 | Peace Walker · `core__snake_pw` | Miller uniform | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0200 | Peace Walker · `completion44__msf_soldier_44` | Amanda uniform | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0201 | Peace Walker · `core__snake_pw` | Swim Trunks | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0202 | Peace Walker · `completion44__msf_soldier_44` | Bikini Top | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0203 | Peace Walker · `core__snake_pw` | Neo Moss | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0204 | Peace Walker · `core__snake_pw` | Tigrex | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29); [PWCOLLAB](https://www.konami.com/mg/archive/mgs_pw/en/) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0205 | Peace Walker · `core__snake_pw` | Rathalos | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29); [PWCOLLAB](https://www.konami.com/mg/archive/mgs_pw/en/) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0206 | Peace Walker · `core__snake_pw` | Gear REX | tenue_officielle · non_repertorie_comme_option_distincte | [PWCAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29); [PWCOLLAB](https://www.konami.com/mg/archive/mgs_pw/en/) — Battle Dress original de Big Boss est déjà le corps de base; vérifier les variantes de casque et les restrictions de porteur. Tenues Amanda et bikini : avatars féminins appropriés, pas transformation de Snake. |
| C-0207 | Peace Walker — DLC · `core__snake_pw` | Water | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0208 | Peace Walker — DLC · `core__snake_pw` | DPM | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0209 | Peace Walker — DLC · `core__snake_pw` | Treebark | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0210 | Peace Walker — DLC · `core__snake_pw` | Khaki | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0211 | Peace Walker — DLC · `core__snake_pw` | Navy Blue | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0212 | Peace Walker — DLC · `core__snake_pw` | Pink | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0213 | Peace Walker — DLC · `core__snake_pw` | White | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0214 | Peace Walker — DLC · `core__snake_pw` | Black | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0215 | Peace Walker — DLC · `core__snake_pw` | Red | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0216 | Peace Walker — DLC · `core__snake_pw` | Green | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0217 | Peace Walker — DLC · `core__snake_pw` | Yellow | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0218 | Peace Walker — DLC · `core__snake_pw` | Comrade | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0219 | Peace Walker — DLC · `core__snake_pw` | Guns & Jungle | palette_officielle · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) — Relever édition/région et existence de version Naked; ne pas créer cette dernière pour les motifs qui n’en ont pas. |
| C-0220 | Peace Walker — collaborations · `completion44__msf_soldier_44` | T-shirts promotionnels et recrues associées | catalogue_modulaire · non_repertorie_comme_option_distincte | [PWDLC](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content); [PWCOLLAB](https://www.konami.com/mg/archive/mgs_pw/en/) — L’inventaire régional exact reste ouvert; le nombre de combinaisons ne compte pas comme des corps distincts. |
| C-0221 | The Phantom Pain · `core__venom` | Olive Drab — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0222 | The Phantom Pain · `core__venom` | Splitter — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0223 | The Phantom Pain · `core__venom` | Square — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0224 | The Phantom Pain · `core__venom` | Tiger Stripe — fatigues standard / Naked / scarf | palette_officielle · present_comme_original_declare_variantes_non_ventilees | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0225 | The Phantom Pain · `core__venom` | Golden Tiger — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0226 | The Phantom Pain · `core__venom` | Desert Fox — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0227 | The Phantom Pain · `core__venom` | Woodland — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0228 | The Phantom Pain · `core__venom` | Wetwork — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0229 | The Phantom Pain · `core__venom` | Sandstorm — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0230 | The Phantom Pain · `core__venom` | Animals — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0231 | The Phantom Pain · `core__venom` | APD / All-Purpose Dryland — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPBONUS](https://www.konami.com/games/eu/de/topics/280/) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0232 | The Phantom Pain · `core__venom` | Black Ocelot — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPBONUS](https://www.konami.com/games/eu/de/topics/280/) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0233 | The Phantom Pain · `core__venom` | Gray Urban — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPBONUS](https://www.konami.com/games/eu/de/topics/280/) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0234 | The Phantom Pain · `core__venom` | Blue Urban — fatigues standard / Naked / scarf | palette_officielle · non_repertorie_comme_option_distincte | [TPPBONUS](https://www.konami.com/games/eu/de/topics/280/) — Le nom et la disponibilité exacte des camouflages doivent être vérifiés sur le menu de l’édition/grade choisi. |
| C-0235 | The Phantom Pain · `core__venom` | Sneaking Suit | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0236 | The Phantom Pain · `core__venom` | Sneaking Suit (GZ) | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0237 | The Phantom Pain · `core__venom` | Battle Dress | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0238 | The Phantom Pain · `core__venom` | Parasite Suit | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0239 | The Phantom Pain · `core__venom` | Naked Silver | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0240 | The Phantom Pain · `core__venom` | Naked Gold | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0241 | The Phantom Pain · `core__venom` | Leather Jacket | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0242 | The Phantom Pain · `core__venom` | Tuxedo | tenue_officielle · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0243 | The Phantom Pain · `core__venom` | Fatigues (Naked Snake) | tenue_officielle · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0244 | The Phantom Pain · `core__venom` | Sneaking Suit (Naked Snake) | tenue_officielle · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Les effets du costume dans TPP peuvent être documentés, mais leur transfert au versus reste une adaptation. |
| C-0245 | The Phantom Pain — DLC · `completion44__diamond_dogs_scout_44` | The Boss Sneaking Suit | tenue_officielle · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Même vêtement de référence ≠ identité du personnage qui l’inspire. |
| C-0246 | The Phantom Pain — DLC · `completion44__diamond_dogs_scout_44` | EVA Jumpsuit — zip ouvert / fermé | tenue_officielle · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Même vêtement de référence ≠ identité du personnage qui l’inspire. |
| C-0247 | The Phantom Pain · `core__venom` | Bandana | accessoire_officiel · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0248 | The Phantom Pain · `core__venom` | Infinity Bandana | accessoire_officiel · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0249 | The Phantom Pain · `core__venom` | Chicken Hat | accessoire_officiel · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0250 | The Phantom Pain · `core__venom` | Lil’ Chicken Hat | accessoire_officiel · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0251 | The Phantom Pain · `core__venom` | Bras bioniques — standard / Stun / Rocket / Blast / Jehuty | accessoire_officiel · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0252 | The Phantom Pain · `core__venom` | États de corne et sang / Demon Snake | etat_narratif · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0253 | The Phantom Pain · `core__venom` | Avatar du médecin / homme du miroir | etat_narratif · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Les prothèses changent éventuellement le kit : les traiter comme équipement, pas simple couleur. Définir compatibilités d’édition et de missions. |
| C-0254 | The Phantom Pain · `core__quiet` | Blood | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment); [TPP](https://www.konami.com/mg/mgs5/tpp/jp/story/) — Costumes à référencer sur Quiet; aucun usage automatique des DLC de recrues féminines. |
| C-0255 | The Phantom Pain · `core__quiet` | Silver | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment); [TPP](https://www.konami.com/mg/mgs5/tpp/jp/story/) — Costumes à référencer sur Quiet; aucun usage automatique des DLC de recrues féminines. |
| C-0256 | The Phantom Pain · `core__quiet` | Gold | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment); [TPP](https://www.konami.com/mg/mgs5/tpp/jp/story/) — Costumes à référencer sur Quiet; aucun usage automatique des DLC de recrues féminines. |
| C-0257 | The Phantom Pain · `core__quiet` | Sniper Wolf costume | tenue_officielle · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment); [TPP](https://www.konami.com/mg/mgs5/tpp/jp/story/) — Costumes à référencer sur Quiet; aucun usage automatique des DLC de recrues féminines. |
| C-0258 | The Phantom Pain · `core__quiet` | Tenue d’hôpital — assassine | etat_narratif · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment); [TPP](https://www.konami.com/mg/mgs5/tpp/jp/story/) — Costumes à référencer sur Quiet; aucun usage automatique des DLC de recrues féminines. |
| C-0259 | The Phantom Pain · `archive__ddog` | Tenues de D-Dog — Sneaking / Battle / Fulton selon équipement | catalogue_modulaire · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Créer le catalogue par porteur exact; les selles appartiennent au cheval, les tenues FOB uniquement aux recrues autorisées. |
| C-0260 | The Phantom Pain · `archive__dhorse` | Western Tack | catalogue_modulaire · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Créer le catalogue par porteur exact; les selles appartiennent au cheval, les tenues FOB uniquement aux recrues autorisées. |
| C-0261 | The Phantom Pain · `archive__dhorse` | Parade Tack | catalogue_modulaire · non_repertorie_comme_option_distincte | [TPPDLC](https://store.steampowered.com/app/406600.php?l=english) — Créer le catalogue par porteur exact; les selles appartiennent au cheval, les tenues FOB uniquement aux recrues autorisées. |
| C-0262 | The Phantom Pain · `archive__dwalker` | Équipement et couleurs D-Walker | catalogue_modulaire · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Créer le catalogue par porteur exact; les selles appartiennent au cheval, les tenues FOB uniquement aux recrues autorisées. |
| C-0263 | The Phantom Pain · `completion44__diamond_dogs_scout_44` | Swimsuits, Goblin, Megalodon et vêtements FOB | catalogue_modulaire · non_repertorie_comme_option_distincte | [TPPCAMO](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) — Créer le catalogue par porteur exact; les selles appartiennent au cheval, les tenues FOB uniquement aux recrues autorisées. |
| C-0264 | MGS4 · `core__old_snake` | OctoCamo gris de base | palette_officielle · present_comme_original_declare | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0265 | MGS4 · `core__old_snake` | Olive Drab | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0266 | MGS4 · `core__old_snake` | Woodland | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0267 | MGS4 · `core__old_snake` | MARPAT Urban | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0268 | MGS4 · `core__old_snake` | Tigerstripe | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0269 | MGS4 · `core__old_snake` | 3-Color Desert | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0270 | MGS4 · `core__old_snake` | Laughing | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0271 | MGS4 · `core__old_snake` | Raging | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0272 | MGS4 · `core__old_snake` | Crying | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0273 | MGS4 · `core__old_snake` | Screaming | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0274 | MGS4 · `core__old_snake` | Snake | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0275 | MGS4 · `core__old_snake` | Beauty | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0276 | MGS4 · `core__old_snake` | Metal | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0277 | MGS4 · `core__old_snake` | Gear | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0278 | MGS4 · `core__old_snake` | Fly | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0279 | MGS4 · `core__old_snake` | Haven | palette_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) |
| C-0280 | MGS4 · `core__old_snake` | Déguisement rebelle — Moyen-Orient | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Gala CQC reste une invention tant que cette tenue officielle précise n’est pas reproduite et référencée. |
| C-0281 | MGS4 · `core__old_snake` | Déguisement rebelle — Amérique du Sud | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Gala CQC reste une invention tant que cette tenue officielle précise n’est pas reproduite et référencée. |
| C-0282 | MGS4 · `core__old_snake` | Civilian Disguise | deguisement_narratif · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Gala CQC reste une invention tant que cette tenue officielle précise n’est pas reproduite et référencée. |
| C-0283 | MGS4 · `core__old_snake` | Altaïr | tenue_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Gala CQC reste une invention tant que cette tenue officielle précise n’est pas reproduite et référencée. |
| C-0284 | MGS4 · `core__old_snake` | Suit — épilogue | tenue_officielle · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29); [TUXEDO](https://metalgear.fandom.com/wiki/Tuxedo) — Gala CQC reste une invention tant que cette tenue officielle précise n’est pas reproduite et référencée. |
| C-0285 | MGS4 · `core__old_snake` | FaceCamo de base | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0286 | MGS4 · `core__old_snake` | Young Snake / Young Snake avec bandana | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0287 | MGS4 · `core__old_snake` | MGS1 Snake — visage bonus | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0288 | MGS4 · `core__old_snake` | Otacon / Raiden / Drebin | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0289 | MGS4 · `core__old_snake` | Quatre Beauty FaceCamo | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0290 | MGS4 · `core__old_snake` | Big Boss FaceCamo | accessoire_officiel · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0291 | MGS4 · `core__old_snake` | OctoCamo capturé depuis l’environnement | catalogue_modulaire · non_repertorie_comme_option_distincte | [MGS4CAMO](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) — Les textures échantillonnées sont un espace de variations ouvert, pas une liste finie de costumes corporels. |
| C-0292 | MGS4 · `core__meryl_mgs4` | Tenue de mariage | etat_narratif · non_repertorie_comme_option_distincte | [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html) — Référence de la scène finale, silhouette civile distincte du Rat Patrol; Kit de combat éventuel clairement adapté. |
| C-0293 | MGS4 · `core__johnny_mgs4` | Tenue de mariage | etat_narratif · non_repertorie_comme_option_distincte | [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html) — Visage Akiba/Johnny adulte, tenue de cérémonie et posture de scène documentées. |
| C-0294 | MGS4 · `core__liquid_ocelot` | Tenues et états du duel final | etat_narratif · non_repertorie_comme_option_distincte | [MGS4](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html) — Retrait de vêtements et blessures = états du même duel. Ne pas utiliser un Ocelot jeune pour représenter une phase psychologique. |
| C-0295 | Revengeance · `core__raiden` | Custom Cyborg Body noir | corps_officiel · present_comme_original_declare | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0296 | Revengeance · `pass40__raiden_r00` | Standard Body — R-00 | corps_officiel · present_comme_original_declare | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0297 | Revengeance · `core__raiden` | Standard Body — costume déverrouillé hors R-00 | corps_officiel · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0298 | Revengeance · `core__raiden` | Custom Body Desperado | corps_officiel · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0299 | Revengeance · `core__raiden` | Custom Body Red | palette_officielle · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0300 | Revengeance · `core__raiden` | Custom Body Blue | palette_officielle · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0301 | Revengeance · `core__raiden` | Custom Body Yellow | palette_officielle · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0302 | Revengeance · `core__raiden` | Mariachi Uniform | corps_officiel · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0303 | Revengeance · `core__raiden` | Suit | corps_officiel · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0304 | Revengeance · `core__raiden` | Original Cyborg Body — MGS4 DLC | corps_officiel · non_repertorie_comme_option_distincte | [MGRDLC](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0305 | Revengeance · `core__raiden` | Wig A / Wig B / Infinite Wig | accessoire_officiel · non_repertorie_comme_option_distincte | [MGRBODY](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6); [MGRBONUS](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) — Red/Blue/Yellow ≠ Inferno/White/Commando. R00 jouable existe depuis P40; ce n’est pas un manque de personnage. Sa version costume sur le corps de gameplay amélioré est une autre question. |
| C-0306 | MGO1 · `archive__genome_mgo1` | Uniformes GRU / KGB / Ocelot Unit | catalogue_modulaire · non_repertorie_comme_option_distincte | [MGO](https://metalgear.fandom.com/wiki/Metal_Gear_Online_equipment) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0307 | MGO2 · `archive__pmc_mgo2` | Catalogue hommes/femmes : tête, haut, bas, gants, gilet, accessoires | catalogue_modulaire · non_repertorie_comme_option_distincte | [MGO](https://metalgear.fandom.com/wiki/Metal_Gear_Online_equipment) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0308 | MGO3 · `archive__dd_mgo3` | Classes Scout/Enforcer/Infiltrator + variantes d’équipement | catalogue_modulaire · non_repertorie_comme_option_distincte | [MGO3](https://www.konami.com/games/eu/fr/topics/2377/); [TPPBONUS](https://www.konami.com/games/eu/de/topics/280/) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0309 | MGO3 · `archive__dd_mgo3` | REX Helmet et armes dorées | catalogue_modulaire · non_repertorie_comme_option_distincte | [TPPBONUS](https://www.konami.com/games/eu/de/topics/280/) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0310 | Delta FOX HUNT · `archive__naked_delta` | Avatars et combinaisons propres au mode | catalogue_modulaire · non_repertorie_comme_option_distincte | [FOXHUNT](https://konami-fr.prezly.com/?category=6622) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0311 | Survive · `archive__captain` | Avatar, vêtements, blindages et pièces de survie | catalogue_modulaire · non_repertorie_comme_option_distincte | [SURVIVE](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Survive_Characters) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0312 | AC!D / AC!D 2 · `core__teliko` | Palettes multijoueur et variantes d’arène | catalogue_modulaire · non_repertorie_comme_option_distincte | [ACID](https://www.konami.com/mg/archive/mga/english/introduction.html); [ACIDEX](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_Characters); [ACID2EX](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_2_Characters) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0313 | MG MSX / NES / MG2 · `core__snake_mg1` | Modèles d’édition, sprites originaux et portraits révisés | catalogue_modulaire · non_repertorie_comme_option_distincte | [MGMAN](https://metalgear.konami.net/manual/mc1/en/index.html); [MG1EX](https://metalgear.fandom.com/wiki/Shotmaker); [MG2EX](https://metalgear.fandom.com/wiki/Category%3AMG2_Characters) — Cette ligne est une tâche d’énumération complète à ouvrir; elle ne certifie pas que toutes les pièces possibles ont déjà été identifiées. |
| C-0314 | MGS4 — Master Collection Vol.2 (2026) · `core__old_snake` | Gold Camouflage | palette_officielle · non_repertorie_comme_option_distincte | [MC2GOLD](https://www.nintendo.com/au/news-and-articles/the-classic-stealth-action-series-returns-with-metal-gear-solid-master-collection-vol-2/) — Bonus lié à des données de sauvegarde Vol.1 selon les conditions de compte/console publiées; ne pas le confondre avec un Gala CQC ni ajouter une personne. |
| C-0315 | Peace Walker HD — Master Collection Vol.2 (2026) · `core__snake_pw` | Uniform: GOLD | palette_officielle · non_repertorie_comme_option_distincte | [MC2GOLD](https://www.nintendo.com/au/news-and-articles/the-classic-stealth-action-series-returns-with-metal-gear-solid-master-collection-vol-2/) — Bonus lié aux sauvegardes Vol.1; capture propre à MC2 requise, aucun nouveau personnage par portage. |


## 6. Concepts originaux : reprendre le travail existant

Les exemples déjà réalisés constituent une direction de projet. Les options actuelles comprennent quatre cyborgs (Solid, Meryl MGS1, Psycho Mantis TTS, Quiet), trois Survive (Solid, Otacon MGS4, Meryl MGS1), trois Metal Gear (Solid, Ocelot MGS1, The Boss), 88 Gala et le manteau alternatif du Double Tripod MGR. Plusieurs proviennent d’index plus récents que le fichier des sept premiers concepts. Les sept premières créations sont donc un jalon historique, pas le total actuel.

Chaque proposition ci-dessous conserve l’identité de l’incarnation et précise la dynamique du vêtement. Elle doit recevoir sa planche concept approuvée, ses deux orientations, ses poses et sa fiche de provenance avant de devenir une option. La fidélité future vise cette fiche de création CQC. **Aucune proposition originale ne peut être présentée comme une tenue canonique officielle 1:1.**


### OC-001 — Veille arctique

**Porteur :** `core__wolf` · **Famille :** survive · **État :** proposition non produite.

Sniper Wolf MGS1 conserve cheveux, visage, yeux et silhouette; surcouche thermique vert olive, coutures réparées, sac de rations et masque respiratoire porté au cou. La lunette et le fusil restent de son époque.

**Animation du costume :** Idle : respiration visible, col bouge. Marche : sac reste haut sans flotter. Crouch/guard : pan arrière se plie. Tir : appui épaule et recul contenus. Reload : main contourne le gilet. Hit/KO : sac retarde légèrement la chute puis se pose; masque suit la gravité.

**Contrainte d’identité :** Aucun passage implicite à Survive canon; pas d’œil robotique ou de fusil futuriste gratuit.


### OC-002 — Expédition polaire

**Porteur :** `core__raven` · **Famille :** survive · **État :** proposition non produite.

Vulcan Raven MGS1 en gilet isolant ouvert sur les tatouages documentés, pantalon renforcé, harnais de portage lourd et réserves fixées au dos.

**Animation du costume :** Respiration lente; marche avec transfert du poids, lourd posé des bottes; sac/munitions décalés d’une phase. Garde et tir maintiennent les attaches. Accroupissement écarte le chargement. Chute pose d’abord le corps puis le paquetage.

**Contrainte d’identité :** Préserver les tatouages et la latéralité des accessoires; ne pas prétendre que l’isolation était portée à Shadow Moses.


### OC-003 — Atelier mobile

**Porteur :** `roster50__otacon_mgs1` · **Famille :** survive · **État :** proposition non produite.

Cibler le vrai UID roster50__otacon_mgs1 : blouse raccourcie, pantalon utilitaire, lunettes et outils de réparation accessibles, sac compact de composants.

**Animation du costume :** Idle : ajuste lunettes puis vérifie instrument. Marche : outils contenus; crouch : genou d’appui et sac éloigné du sol. Soutien : sort outil, tient la pièce, range. Hit/KO : protège le visage, outils attachés ne deviennent pas projectiles.

**Contrainte d’identité :** Personnage de soutien; aucun super de soldat inventé sous le seul prétexte d’un costume.


### OC-004 — Station portable

**Porteur :** `roster50__mei_mgs1` · **Famille :** survive · **État :** proposition non produite.

Mei Ling MGS1 avec gilet de transmission léger et boîtier déployable; identité et coiffure inchangées, accents bleu nuit, câbles courts.

**Animation du costume :** Déploiement en trois temps : s’accroupit, pose le module, ouvre l’écran. Idle : consultation discrète. Marche/guard : module fermé. Reprise : replie l’antenne avant de se relever. Hit/KO : module désactivé, pas d’électricité offensive sans règle séparée.

**Contrainte d’identité :** L’appareil est une invention CQC documentée; pas un équipement canonique en 2005.


### OC-005 — Gala de commandement

**Porteur :** `core__boss` · **Famille :** tuxedo · **État :** proposition non produite.

The Boss MGS3 en tenue habillée fonctionnelle ivoire et noire, col sobre, coupe adaptée aux épaules, cheveux et cicatrice conservés; aucun effacement d’âge.

**Animation du costume :** Idle verticale mesurée; garde ouvre la veste aux épaules; CQC tend la manche sans la faire disparaître. Pans suivent la rotation puis retombent. Chute garde les couches et la chaussure cohérentes.

**Contrainte d’identité :** Original Gala; ne pas confondre avec tenue d’espionnage blanche officielle ni tenue de mariage.


### OC-006 — Soirée sans armure

**Porteur :** `core__sam` · **Famille :** tuxedo · **État :** proposition non produite.

Jetstream Sam MGR conserve sa prothèse de bras et ses proportions; veste rouge sombre ajustée au bras, pantalon noir, fourreau Murasama avec attache conçue.

**Animation du costume :** Main touche le fourreau avant le dégainé; veste s’écarte; coupe produit un retard du pan, rengainé s’aligne au fourreau. Course maintient le sabre latéral, saut et chute conservent le poids de la prothèse.

**Contrainte d’identité :** Ne jamais transformer le bras prothétique en bras humain par esthétique Gala; armes et cinématique restent distinctes du costume.


### OC-007 — Tenue de cérémonie d’expédition

**Porteur :** `archive__reeve` · **Famille :** tuxedo · **État :** proposition non produite.

Reeve Survive conserve cicatrices, âge et gabarit; veste sombre renforcée discrètement, veste ouverte au mouvement, outils rangés dans une trousse formelle.

**Animation du costume :** Idle vérifie sa montre; marche sobre, garde protège le torse. Saisie tire la manche, roulade garde pans et trousse attachés. Impact froisse le vêtement sans changement arbitraire de couleur.

**Contrainte d’identité :** Tenue inventée, pas DLC de Survive.


### OC-008 — Conductrice blindée

**Porteur :** `core__fortune` · **Famille :** cyborg · **État :** proposition non produite.

Fortune MGS2 reste identifiable au visage, cheveux, peau et posture; châssis graphite à conducteurs jaune pâle, bras dimensionnés pour le railgun, aucune copie du corps de Raiden.

**Animation du costume :** Idle : micro-compensation du poids; marche : verrouillage léger du genou; charge : indicateurs s’allument sans modifier le visage; tir : contrepoids et recul; garde/KO : joints se replient dans leurs limites.

**Contrainte d’identité :** Reconstruction spéculative explicitement originale; la fortune électromagnétique du personnage n’autorise pas n’importe quel nouveau pouvoir.


### OC-009 — Plateforme d’interrogation

**Porteur :** `core__cunningham` · **Famille :** metalgear · **État :** proposition non produite.

Cunningham MPO dans une petite plateforme originale de terrain : siège visible, jambes de support et bras d’outil; sa prothèse et sa tenue restent lisibles.

**Animation du costume :** Idle stabilise les pieds. Marche alterne points d’appui sans glissement; virage fait pivoter plateforme puis siège. Attaque prépare l’outil, déploie, agit, replie. KO immobilise la plateforme puis montre le pilote protégé.

**Contrainte d’identité :** Ni machine canonique ni vraie taille officielle; séparer pilote, structure, collisions et animation.


### OC-010 — Ruche mécanisée

**Porteur :** `core__pain` · **Famille :** metalgear · **État :** proposition non produite.

Exosquelette original en plaques alvéolaires porté par The Pain; visière distincte du masque source, réservoirs mécaniques lisibles, insectes associés explicitement au personnage.

**Animation du costume :** Idle : plaques vibrent peu; garde ferme une protection; marche conserve lourdeur. Déploiement ouvre des évents, sortie des insectes, fermeture. Retour et KO gèrent les évents et la retombée des pièces.

**Contrainte d’identité :** Pas le Metal Gear d’un opus; aucune taille canonique ni transformation implicite en vrai nid biologique.


### OC-011 — Arpenteur forestier

**Porteur :** `core__fear` · **Famille :** survive · **État :** proposition non produite.

The Fear MGS3 conserve articulations, langue et tatouages attestés; harnais léger, cordages courts, housses de carreaux, textile vert gris.

**Animation du costume :** Idle bas et instable; marche utilise ses appuis particuliers. Saut compresse les jambes puis étend le corps; cordages suivent les trajectoires sans traverser les membres. Tir d’arbalète garde les mains et la recharge explicites.

**Contrainte d’identité :** Ne pas remplacer son anatomie par un soldat standard ou lui ajouter un camouflage optique inédit.


### OC-012 — Commandement en zone contaminée

**Porteur :** `core__meryl_mgs4` · **Famille :** survive · **État :** proposition non produite.

Meryl Rat Patrol conserve âge, muscles, tatouage et cheveux MGS4; surcouche respiratoire, filtres asymétriques mais source CQC définie, étui et chargeurs accessibles.

**Animation du costume :** Masque ouvert/fermé comme états d’accessoire. Guard et reload gardent la main libre; genoux dégagent les sangles en crouch. Course fait suivre filtre/tuyau avec retard court. KO évite tout tuyau traversant le visage.

**Contrainte d’identité :** Autre incarnation que la Meryl MGS1 Survive déjà produite; aucun transfert automatique de l’ancien corps.


### OC-013 — Soutien cybernétique MSF

**Porteur :** `core__kaz_pw` · **Famille :** cyborg · **État :** proposition non produite.

Kaz 1974, deux bras et deux jambes biologiques dans l’identité de départ; combinaison augmentée externe conçue, lunettes et posture de PW conservées.

**Animation du costume :** Marche souple; mécanismes extérieurs suivent sans remplacer les membres. Déploiement d’assistance s’ouvre puis s’arrête sur butée; attaque et garde gardent le corps humain. Chute coupe l’alimentation avant stabilisation.

**Contrainte d’identité :** Ne pas lui imposer les amputations de Kaz TPP; préciser qu’il s’agit d’un exosquelette original et non d’un corps canonique.


### OC-014 — Cérémonie Diamond Dogs

**Porteur :** `roster50__kaz_mgsv` · **Famille :** tuxedo · **État :** proposition non produite.

Kaz TPP avec ses amputations, béquille et lunettes exactes, veste structurée adaptée aux moignons; palette noire et ocre.

**Animation du costume :** Déplacement respecte béquille et équilibre; tournant en appui visible. Geste de soutien avec bras disponible seulement. Chute et relevé adaptés à sa mobilité; ne pas recopier un cycle à quatre membres intacts.

**Contrainte d’identité :** Préserver handicap et âge; aucune restauration de membres par changement de costume.


### OC-015 — Reconnaissance Dité

**Porteur :** `core__blade_wolf` · **Famille :** survive · **État :** proposition non produite.

LQ-84i conserve silhouette quadrupède; capots étanches de terrain, sacoches basses et protection optique; mécanique de queue accessible.

**Animation du costume :** Walk : quatre appuis; sacoches suivent le roulis sans heurter les pattes. Crouch et saut conservent l’amplitude. Queue se déploie avec dégagement, recharge/maintenance devient procédure propre à la machine, KO garde articulations mécaniques.

**Contrainte d’identité :** Pas de visage humain ni de tenue Gala humanoïde; mode survie demeure une invention CQC.


### OC-016 — Habit de présentation

**Porteur :** `archive__virgil_at9` · **Famille :** tuxedo · **État :** proposition non produite.

Virgil AT-9 conserve ses deux unités et sa construction; panneaux noirs/ivoire et détails de cérémonie comme habillage de machine, pas un corps humain ajouté.

**Animation du costume :** Idle conserve les deux personnalités/units si présentes; ouverture des panneaux, déplacement et rotations respectent les modules. Hit/KO se résolvent par inclinaison/arrêt, sans anatomie organique.

**Contrainte d’identité :** Un vêtement de machine exige son concept propre; catégorie Gala originale seulement.


### OC-017 — Agent monochrome

**Porteur :** `core__snake_gb` · **Famille :** retro · **État :** proposition non produite.

Snake Ghost Babel avec pixels et palette GBC spécifiés dans une nouvelle fiche; silhouettes propres au jeu et rendu latéral CQC créé indépendamment.

**Animation du costume :** Chaque pose redessinée par amas de pixels, pas filtre appliqué au HD. Garder la lisibilité de l’œil/bandana et du Five-seveN. Walk et crouch ont volumes stables; effets d’alerte restent UI distincte.

**Contrainte d’identité :** Réinterprétation de style CQC; ne pas promettre une palette matérielle exacte sans étude GBC et ne pas appeler cela costume canonique neuf.


### OC-018 — Équipement d’infiltration contemporain

**Porteur :** `core__venus` · **Famille :** nextgen · **État :** proposition non produite.

Venus AC!D2, mêmes âge, proportions, coiffure et tenue officielle réinterprétée avec matières détaillées; aucune conversion en Quiet.

**Animation du costume :** Conserver les particularités de poses AC!D2 lors de la transposition; tissu et accessoires animés selon le nouveau dessin; combat 2D explicitement adapté car les cartes ne fournissent pas les phases du versus.

**Contrainte d’identité :** Style NextGen, pas un nouveau costume officiel et pas un saut chronologique du personnage.


### OC-019 — Héritage du projet — terrain

**Porteur :** `archive__carter_survive` · **Famille :** survive · **État :** proposition non produite.

Développer le design historique Carter CQC à partir de sa fiche déjà corrigée; surcouche et équipement propres au projet, étiquetage original toujours visible.

**Animation du costume :** Décrire silhouette de base, marche, garde, interaction et chute à partir du design retenu; ne jamais prendre un acteur réel ou le Captain comme substitut tacite.

**Contrainte d’identité :** Carter reste original non attesté dans Survive; la continuité de projet prévaut sur une fausse canonisation.


### OC-020 — Turtle Armor — proposition à définir

**Porteur :** `core__solid` · **Famille :** metalgear · **État :** proposition non produite.

Terme sans référence Metal Gear vérifiée dans cette recherche. Réserver une fiche vide ou proposer séparément une armure CQC à carapace segmentée, après définition explicite du concept.

**Animation du costume :** Aucune animation canonique à annoncer. Pour un futur concept : documenter plaques, collision, genou/hanche, rotation et entrée/sortie avant dessin des poses.

**Contrainte d’identité :** Ne pas assimiler à Battle Dress PW, à un boss de Snake’s Revenge ou à un autre jeu par supposition; statut référence à identifier.



## 7. Cahier de fidélité pour chaque tenue et chaque sprite

Le fichier principal d’animations de cet audit décrit les actions des combattants. La garde-robe ajoute un niveau obligatoire : un costume doit rester cohérent dans chaque pose, et un changement de corps exige davantage qu’un remplacement de texture.

### Fiche de référence par variante

- Identité : UID stable, nom réel, alias, âge/époque, opus, plateforme et état du récit.
- Provenance : jeu publié, bonus, DLC, collaboration, prototype ou création CQC; URL, page/timecode et empreinte du fichier de référence quand disponible.
- Géométrie : face, dos, profil gauche et profil droit; proportions sans prétendre à une taille officielle non sourcée.
- Équipement : œil couvert, prothèse, fourreau, holster, arme, coutures, poches, insignes, bijoux, sangles et main d’utilisation.
- Matières : peau/textile/cuir/métal/plastique/cheveux, palette locale par pièce et variations de lumière; aucun recoloriage global qui teinte les yeux, armes ou cicatrices.
- Compatibilité : corps et équipement autorisés, accessoires exclusifs, masques, états de blessure, différences de porteur et de version.
- Validation : comparatif des images réelles, choix motivés lorsque la source ne montre pas un angle, liste de poses inédites interprétées pour CQC.

### Description requise pour chaque action d’une variante

| Action | Description complète à consigner pour le vêtement / corps |
| --- | --- |
| Entrée / idle | Pose de départ, respiration, centre de gravité, tenue des mains, orientation du visage, retard du tissu et boucle sans saut |
| Marche avant/arrière / course | Contacts des pieds ou pattes, ordre des appuis, balancement des bras, déplacement vertical, poches et fourreau, freinage et reprise |
| Garde haute / basse | Partie du corps protégée, orientation des coudes, plis d’épaule et de genou, maintien de l’arme, transition vers neutre |
| Accroupissement / relevé | Descente du bassin, articulation anatomique ou mécanique, compression du tissu, dégagement des pans et accessoires, remontée sans glissement |
| Saut / retombée / roulade | Anticipation, poussée, sommet, suspension, impact, compression puis stabilisation; queue, cape, long manteau et sangles suivent des trajectoires définies |
| Attaques légères / lourdes / basses | Préparation, point de contact, extension maximale et retour; déformation du vêtement; membre actif, pièce mécanique et accessoire qui masquent ou découvrent la silhouette |
| Saisie / projection / déchope | Positions de prise, mains de chaque côté, zones de tissu comprimées, centre de masse et lâcher; aucune traversée du costume de l’adversaire |
| Tir / recharge / visée | Alignement œil-arme, épaulé, support, recul, culasse/chargeur si visibles, trajectoire des mains et stockage des éléments; pas de pistolet qui apparaît sans transition |
| Lame / dégainé / rengainé | Contact main-poignée, sortie du fourreau, orientation du tranchant, fin de coupe, retour; séparation des armes courtes, HF et Murasama |
| Déploiement / utilitaire | Main libre, extraction depuis poche/harnais, ouverture, activation, effet séparé, arrêt et rangement; ordre des pièces lisible |
| Impact / stun / chute / KO | Direction du choc, retard du vêtement, collisions avec le sol, arme lâchée ou retenue, stabilisation finale; anatomie et nombre de membres inchangés |
| Victoire / défaite | Geste propre à l’identité, tenue des accessoires et état des vêtements; pas de gag emprunté à une autre incarnation sans étiquette bonus |

Les deux orientations sont vérifiées séparément. Les cas Venom (bras gauche, œil droit), Old Snake (Solid Eye gauche), Raiden, Sam et les personnages amputés rendent une simple symétrie particulièrement risquée. Un motif textuel, un insigne, la face Cold War, un masque ou un fourreau ne peut pas être inversé sans examen. Un changement de tenue ne crée pas à lui seul des pouvoirs; une nouvelle armure peut justifier une silhouette différente, avec une règle de collision explicitement décidée pour le versus.

### Critères de clôture d’une ligne

Une référence trouvée ne ferme pas une tâche d’art. Une tâche est complète lorsque l’apparence précise est sourcée, le porteur correct identifié, les dessins réels de toutes les actions nécessaires sont présents, leurs deux orientations respectent les asymétries, les chargements et sélections fonctionnent, puis les comparatifs visuels sont archivés. Si une face arrière ou un mouvement n’existe pas dans les sources, la fiche porte « interprétation CQC » sur cette partie. La certification 1:1 doit être découpée : identité, silhouette, tenue, couleurs, accessoires, animation et comportement n’ont pas le même niveau de preuve.

## 8. Extensions officielles hors cœur de la saga

Ces pistes sont optionnelles et exclues du total obligatoire des lacunes Metal Gear. Elles évitent de confondre un invité officiel avec une invention du projet. Snake dans Smash Bros. possède ses propres proportions/costumes; Fortnite publie des styles Solid Snake, lunettes et Old Snake; Bomberman publie des versions Bomber de personnages Metal Gear. Ces modèles sont des références à leur crossover précis, pas des corrections à imposer aux corps MGS1/MGS2. Chaque extension future reçoit son groupe « crossover officiel » et son propre catalogue de mouvements.



Références : [SMASH](https://www.smashbros.com/en_US/fighter/31.html); [FORTNITE](https://www.fortnite.com/news/solid-snake-is-unboxed-in-fortnite-battle-royale-v28-10?lang=en-US); [BOMBERMAN](https://www.konami.com/games/bomberman/r/us/en/character/).



## 9. Ordre de production conseillé

1. **Fiabiliser le catalogue** : réconcilier 380/375/381, appliquer les relations d’alias déjà présentes, documenter les sept options héritées et ouvrir une vraie liste de vêtements officiels au lieu de la seule case `canonical` par personnage.
2. **Terminer les manques identifiés de la version livrée** : corps Hideo, variantes manquantes du dernier lot et transitions de corps déjà produits. Les dossiers machine sont traités dans le volet dédié.
3. **Compléter les tenues à forte valeur de fidélité** : déguisements et costumes de scénario, MGS3 standard/boss/visage, MGS4 déguisements/FaceCamo, garde-robe PW/TPP, tenues MGR restantes, puis Delta sur son propre corps.
4. **Ajouter les silhouettes d’ennemis absentes** : Genome différenciés, Hi-Tech, gardes des bases, Peace Sentinel, cyborgs de MGR; conserver les UIDs et preuves distincts par jeu.
5. **Compléter les dossiers secondaires/tertiaires** : personnes évoquées, pilotes, civils et figures de scène, sans imposer des kits fictifs de combat à des sources purement textuelles.
6. **Poursuivre les créations originales** : partir des concepts existants, garder toutes les catégories et la provenance visibles, valider un concept par incarnation avant de multiplier les styles.
7. **Fermer l’exhaustivité régionale et Online** : captures des menus, récompenses et pièces par version; présenter le résultat comme catalogue modulaire, pas comme une inflation de personnages.

L’audit établit un registre de travail fini et révisable. Il conserve explicitement les zones encore ouvertes : objets de récompense Online, variantes régionales anciennes, archives de personnages seulement évoqués et angles graphiques non visibles. Ces zones empêchent de promettre aujourd’hui « absolument tout est identifié et fidèle 1:1 ». Elles possèdent désormais un emplacement, un statut et une action de fermeture.

## 10. Fichiers de travail et sources

- [02_roster_costumes.json](02_roster_costumes.json) : toutes les données, les descriptions visuelles et les exigences d’animation par variante.
- [02_roster_present.csv](02_roster_present.csv) : 380 entrées actives, noms legacy/éditoriaux, alias et nombre d’options retrouvées.
- [02_roster_lacunes.csv](02_roster_lacunes.csv) : tâches de personnages par niveau, usage, preuve et état.
- [02_costumes_presents.csv](02_costumes_presents.csv) : 217 alternatives déclarées, provenance et distinction index/option chargée.
- [02_costumes_cibles.csv](02_costumes_cibles.csv) : catalogue de références, présence, spécifications visuelles et d’animation, restrictions.
- [02_costumes_originaux_proposes.csv](02_costumes_originaux_proposes.csv) : concepts originaux avec silhouette et mouvements du vêtement.
- [02_sources_roster_costumes.json](02_sources_roster_costumes.json) : provenance des références, niveau primaire/secondaire et portée exacte.

Les références secondaires sont des outils de découverte, pas des certificats 1:1. La production doit les remplacer ou les compléter par le jeu, le manuel, la planche de l’éditeur ou le scénario publié. Les liens de dépôt sont figés sur le commit audité; les pages externes ont été consultées à la date de cet audit.


| ID | Référence | Nature / portée |
| --- | --- | --- |
| RUNTIME | [Registre versus et extensions P41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html) | depot_audite — État effectivement chargé : 380 entrées fighters; ne pas utiliser uniquement le tableau initial de 354. |
| INDEX | [Index natif du lot P41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass41-native-batch-index-v1.js) | depot_audite — Dernier index cumulatif chargé avec les index antérieurs; snapshot chargé et non revue visuelle. |
| POLICY | [Politique source-aware du wardrobe](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass21-wardrobe-policy.js) | depot_audite — Identité originale, réinterprétation de style, couverture des familles, absence de certification absolue. |
| ORIGINALS | [Premiers concepts originaux CQC](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-original-costumes.js) | depot_audite — Concepts cyborg, Survive et Metal Gear existants; leur canon est explicitement faux. |
| APPEARANCES | [Liaisons d’apparences canoniques](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/src/cqc-pass19-canonical-appearances.js) | depot_audite — Les seules liaisons actives observées sont Snake/Pliskin et EVA/Tatyana, dans les deux sens. |
| RELEASE41 | [Notes de livraison P41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md) | depot_audite — Dernier lot, tenue Gala originale, portraits Hideo, blocages encore ouverts. |
| MGMAN | [Manuels officiels Master Collection](https://metalgear.konami.net/manual/mc1/en/index.html) | primaire_Konami — Périmètre MG, MG NES, MG2, Snake’s Revenge, MGS1, MGS2, MGS3; recueils et scénarios à exploiter pour les références individuelles. |
| MGS1 | [MGS1 — personnages du manuel français](https://metalgear.konami.net/manual/mc1/mgs1/ps4/fr/page18.html) | primaire_Konami — Distribution principale et secondaire; quatre catégories de soldats Genome. |
| MGS2 | [MGS2 — personnages du manuel](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html) | primaire_Konami — Identités du Tanker et de la Big Shell. |
| MGS3 | [MGS3 — personnages du manuel](https://metalgear.konami.net/manual/mc1/mgs3/pc/en/page24.html) | primaire_Konami — Snake, EVA, Ocelot, Volgin, The Boss et Cobra Unit. |
| MGS3CAMO | [Archive officielle des camouflages MGS3](https://www.konami.com/mg/archive/mgs3/uk/camouflage_main.html) | primaire_Konami — Téléchargements et concours officiellement intégrés. Une origine concours de fans ne rend pas Animals/Banana/Fly/Mummy originaux CQC. |
| MGS3CAML | [Liste de collecte MGS3](https://strategywiki.org/wiki/Metal_Gear_Solid_3%3A_Snake_Eater/Camouflage) | secondaire_guide — Inventaire d’orientation des tenues et maquillages; les captures du jeu/édition restent la preuve graphique à collecter. |
| MGS3CAME | [Variantes de camouflage MGS3](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_3%29) | secondaire_encyclopedie — Variantes régionales, bonus et costumes boss; vérifier chaque disponibilité par édition. |
| DELTA | [Delta — lancement et bonus officiels](https://www.konami.com/games/eu/fr/topics/18806/) | primaire_Konami — Sneaking DLC Pack : 6 tenues, 4 accessoires; White Tuxedo bonus de précommande. |
| DELTALIST | [Delta — inventaire des camouflages](https://www.powerpyx.com/metal-gear-solid-3-delta-all-camo-face-paint-locations/) | secondaire_guide — Liste de contrôle des 59 entrées de vêtements; labels et images du jeu nécessaires avant production. |
| 3DS | [Snake Eater 3D — guide officiel](https://www.konami.com/mg/archive/mgs_se/jp/guide/index.html) | primaire_Konami — Photo Camouflage, déplacement accroupi et présentation 3DS; photographie personnelle = contenu utilisateur, pas costume officiel déterminé. |
| FOXHUNT | [Delta — actualités officielles FOX HUNT](https://konami-fr.prezly.com/?category=6622) | primaire_Konami — Mode FOX HUNT disponible depuis le 30 octobre 2025; uniformes/avatar à inventorier séparément. |
| PW | [Peace Walker — personnages officiels](https://www.konami.com/mg/archive/mgs_pw/us/character/index.html) | primaire_Konami — Distribution centrale de Peace Walker. |
| PWCAMO | [Peace Walker — catégories d’uniformes](https://metalgear.fandom.com/wiki/Camouflage_%28Peace_Walker%29) | secondaire_encyclopedie — Uniformes, variantes Naked, tenues spéciales; sexe/type de porteur et version à vérifier. |
| PWDLC | [Peace Walker — contenu téléchargeable](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Peace_Walker/Downloadable_Content) | secondaire_encyclopedie — Variantes régionales, vêtements promotionnels et bonus; aucune disponibilité actuelle promise. |
| PWCOLLAB | [Peace Walker — site officiel et collaborations](https://www.konami.com/mg/archive/mgs_pw/en/) | primaire_Konami — Monster Hunter, Assassin’s Creed, Walkman : bonus publiés, distincts de l’histoire principale. |
| TPP | [The Phantom Pain — personnages officiels](https://www.konami.com/mg/mgs5/tpp/jp/story/) | primaire_Konami — Identités centrales et apparences TPP. |
| TPPCAMO | [The Phantom Pain — équipements et tenues](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_V%3A_The_Phantom_Pain/Weapons_and_Equipment) | secondaire_encyclopedie — Naked/standard/scarf; limites d’équipement propres à Venom ou aux soldats Diamond Dogs. |
| TPPDLC | [The Phantom Pain — Costume and Tack Pack](https://store.steampowered.com/app/406600.php?l=english) | primaire_boutique_editeur — Fatigues NS, Sneaking NS, Tuxedo, The Boss, EVA, Western Tack, Parade Tack. Tenue EVA destinée aux recrues féminines DD, pas à Quiet. |
| TPPBONUS | [The Phantom Pain / MGO — contenu bonus officiel](https://www.konami.com/games/eu/de/topics/280/) | primaire_Konami — Fatigues Black Ocelot, Gray Urban, Blue Urban, All-Purpose Dryland; bonus MGO REX Helmet et armes dorées. |
| MGS4 | [MGS4 — manuel Master Book](https://metalgear.konami.net/manual/mc2/mgs4/xbox/fr/page19.html) | primaire_Konami — Master Book et Screenplay pour validation des personnages et éléments de production. |
| MGS4CAMO | [MGS4 / MGO — camouflage](https://metalgear.fandom.com/wiki/Camouflage_%28Metal_Gear_Solid_4_and_Metal_Gear_Online%29) | secondaire_encyclopedie — OctoCamo, déguisements, FaceCamo et motifs bonus; une texture copiée n’est pas une nouvelle identité. |
| MGR | [Revengeance — personnages officiels](https://www.konami.com/mg/archive/mgr/jp/characters/) | primaire_Konami — Raiden, Sam, Winds of Destruction, Maverick et personnages secondaires. |
| MGRDLC | [Revengeance — corps DLC officiels](https://www.konami.com/mg/archive/mgr/jp/lineup/detail.html) | primaire_Konami — White, Inferno, Commando, Cyborg Ninja et corps MGS4; ne pas confondre armures et palettes Blue/Red/Yellow. |
| MGRBODY | [Revengeance — customisation](https://www.trueachievements.com/game/Metal-Gear-Rising-Revengeance/walkthrough/6) | secondaire_guide — Standard Body R00, Custom, Desperado, Red/Blue/Yellow, Suit, Mariachi; le corps R00 déverrouillé hors prologue conserve les améliorations du jeu source. |
| MGRBONUS | [Revengeance — secrets et accessoires](https://metalgear.fandom.com/wiki/Metal_Gear_Rising%3A_Revengeance_secrets) | secondaire_encyclopedie — Corps MGS4, accessoires de customisation et perruques; table de contrôle secondaire. |
| GB | [Ghost Babel — personnages du manuel](https://metalgear.konami.net/manual/mc2/mggb/ps5/fr/page17.html) | primaire_Konami — Identités Ghost Babel; Ronard Lensenbrink est Weasel et non un personnage supplémentaire. |
| GBEX | [Ghost Babel — personnages complémentaires](https://metalgear.fandom.com/wiki/Category%3AGhost_Babel_Characters) | secondaire_index — Index nominatif seulement : comprend des personnes évoquées et des rapprochements, pas une liste automatique de corps visibles. |
| ACID | [AC!D — présentation officielle](https://www.konami.com/mg/archive/mga/english/introduction.html) | primaire_Konami — Distribution et système originaux; les cartes ne sont pas un roster de personnages présents en chair et en os. |
| ACIDEX | [AC!D — index de personnages](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_Characters) | secondaire_index — Pistes nominatives complémentaires à vérifier dans le scénario. |
| ACID2EX | [AC!D 2 — index de personnages](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Acid_2_Characters) | secondaire_index — Pistes nominatives complémentaires; noms de couverture et identités réelles à rapprocher. |
| MPOPLUS | [Portable Ops Plus — contenu et soldats](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Portable_Ops_Plus) | secondaire_encyclopedie — Types de recrues, invités et variantes régionales; palettes et drapeaux ne créent pas des personnes distinctes. |
| MGO | [MGO — équipement](https://metalgear.fandom.com/wiki/Metal_Gear_Online_equipment) | secondaire_encyclopedie — Catalogue modulaire d’équipement MGO2; séparer catégories, ajustements de corps et récompenses. |
| MGO3 | [MGO3 — Quiet et DLC officiel](https://www.konami.com/games/eu/fr/topics/2377/) | primaire_Konami — Quiet unique, nouveaux contenus et actions; profil Online différent des règles TPP. |
| SURVIVE | [Survive — index de personnages](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Survive_Characters) | secondaire_index — Personnages de l’histoire et des archives; noms ne prouvent pas une apparence corporelle complète. |
| MOBILE | [Mobile — index de personnages](https://metalgear.fandom.com/wiki/Category%3AMetal_Gear_Solid_Mobile_Characters) | secondaire_index — Snake, Otacon, Commander, Victoria; les mentions de Raiden ne prouvent pas un corps Mobile. |
| MG1EX | [MG — Shotmaker et index associé](https://metalgear.fandom.com/wiki/Shotmaker) | secondaire_encyclopedie — Noms alternatifs, différences MSX/NES et pistes du personnel d’Outer Heaven. |
| MG2EX | [MG2 — index de personnages](https://metalgear.fandom.com/wiki/Category%3AMG2_Characters) | secondaire_index — Personnages de Zanzibar; vérifier l’apparition plutôt que convertir toutes les mentions en combattants. |
| MGS2EX | [MGS2 — index de personnages](https://metalgear.fandom.com/wiki/Category%3AMGS2_Characters) | secondaire_index — Tertiaires, soldats, personnes évoquées et concepts coupés à distinguer. |
| HITECH | [Hi-Tech Soldiers](https://metalgear.fandom.com/wiki/Hi-Tech_Soldiers) | secondaire_encyclopedie — Silhouette blindée différente des Gurlukovich; apparition MGS2 et recrue MPO+. |
| GZEX | [Ground Zeroes — index de personnages](https://metalgear.fandom.com/wiki/Category%3AGround_Zeroes_Characters) | secondaire_index — Cibles des missions annexes, prisonniers, bonus et personnages évoqués. |
| TPPEX | [The Phantom Pain — index de personnages](https://metalgear.fandom.com/wiki/Category%3AThe_Phantom_Pain_Characters) | secondaire_index — Cibles, civils, opérateurs; toutes les mentions ne disposent pas de modèle. |
| PEQUOD | [Pequod](https://metalgear.fandom.com/wiki/Pequod) | secondaire_encyclopedie — Indicatif de pilotes Diamond Dogs; distinguer pilote, hélicoptère et remplacement de personnel. |
| QUEEQUEG | [Queequeg](https://metalgear.fandom.com/wiki/Queequeg) | secondaire_encyclopedie — Pilote de soutien nommé pendant la mission Skull Face. |
| TUXEDO | [Tenues habillées de la série](https://metalgear.fandom.com/wiki/Tuxedo) | secondaire_encyclopedie — Tuxedo MGS1/TTS/MGS2 VR/MGS3/PW/TPP; Suit MGS4/MGR n’est pas automatiquement le même vêtement. |
| CROCODILE | [Crocodile Cap](https://metalgear.fandom.com/wiki/Crocodile_Cap) | secondaire_encyclopedie — Accessoire MGS3 et réemplois; différent du costume entier Crocodile Suit de Delta. |
| SMASH | [Snake — Super Smash Bros. Ultimate](https://www.smashbros.com/en_US/fighter/31.html) | primaire_Nintendo — Invité officiel, hors obligation cœur Metal Gear; ses costumes ne certifient pas un modèle MGS2. |
| FORTNITE | [Solid Snake — Fortnite](https://www.fortnite.com/news/solid-snake-is-unboxed-in-fortnite-battle-royale-v28-10?lang=en-US) | primaire_Epic — Invité officiel, styles avec lunettes et Old Snake, accessoires; hors obligation cœur saga. |
| BOMBERMAN | [Bomberman R — personnages](https://www.konami.com/games/bomberman/r/us/en/character/) | primaire_Konami — Naked Snake, Solid Snake et Raiden Bomber; silhouettes crossover officielles, pas corps réalistes de la saga. |
| MC2 | [Master Collection Vol.2 — lancement officiel](https://www.konami.com/games/eu/en/topics/19257/) | primaire_Konami — Sortie le 27 août 2026 : MGS4, Peace Walker HD et Ghost Babel; pas de nouvelles identités par simple portage. |
| MC2GOLD | [Master Collection Vol.2 — bonus de sauvegarde](https://www.nintendo.com/au/news-and-articles/the-classic-stealth-action-series-returns-with-metal-gear-solid-master-collection-vol-2/) | primaire_Nintendo — Gold Camouflage MGS4 et Uniform GOLD Peace Walker, avec sauvegarde Vol.1 selon conditions de compte/console annoncées. |
| INTEGRAL | [Integral — différences d’édition](https://metalgear.fandom.com/wiki/Metal_Gear_Solid%3A_Integral) | secondaire_encyclopedie — Meryl Sneaking Suit PS1/Integral; retrait de cette tenue dans le port PC; tenue TTS distincte. |
| MGS1BONUS | [MGS1 — secrets et variantes](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_secrets) | secondaire_encyclopedie — Tuxedo, palette alternative Gray Fox et Meryl Sneaking Suit; références de jeu à relever. |
| MGS2VR | [MGS2 Substance — catégories de missions](https://metalgear.neoseeker.com/wiki/Metal_Gear_Solid_2%3A_Substance) | secondaire_guide — Raiden, Ninja Raiden, Raiden X, Snake, Pliskin, Tuxedo Snake et MGS1 Snake : catégories distinctes. |
| MGS2SUB | [MGS2 Substance — différences et bonus](https://metalgear.fandom.com/wiki/Metal_Gear_Solid_2%3A_Substance) | secondaire_encyclopedie — Lunettes bonus de Snake/Raiden et skateboard PS2; à distinguer des ports HD/Master Collection. |
| LUCY | [Lucy — identité et EGO](https://metalgear.fandom.com/wiki/Lucy) | secondaire_encyclopedie — Lucy est un sujet enfant avec un ego propre et les souvenirs de Lucinda; ne pas réduire la relation à un alias. |
| LUCINDA | [Lucinda Koppelthorn — personnage évoqué](https://metalgear.fandom.com/wiki/Lucinda_Koppelthorn) | secondaire_encyclopedie — Scientifique défunte dont les souvenirs sont implantés chez Lucy; son corps adulte ne se déduit pas du modèle enfant. |
| FLEMMING | [Flemming — identité et imposteur](https://metalgear.fandom.com/wiki/William_L._Flemming) | secondaire_encyclopedie — Gary Murray est un alias du scientifique; un faux Flemming réutilise un modèle avec un sac sur la tête. |
