# CQC — lot natif Pass27, 11 octobre 2026

Le jeu séparé et les fichiers CQC intégrés à Shadow Codec Ops reçoivent exactement les mêmes modifications de gameplay visuel. Ce lot termine trois tenues préparées, ajoute deux scènes de leurs éditions propres et remplace les silhouettes restantes du Soutien et de l’Arsenal avec les corps natifs déjà admis. Il ne crée pas de nouvelle incarnation par simple renommage.

## Tenues et scènes

- **Sunny MGS4 — Rétro** : dessin indépendant conservé en cinq PNG originaux, deux directions natives, profil et temporisations inchangés. La marche ne mélange plus deux échelles de planche. Aperçus d’origine/Rétro/Gala alignés en hauteur, bassin, sol et position horizontale. Le libellé visible reste « Rétro » ; l’identifiant historique de sauvegarde reste intact.
- **Teliko AC!D — Rétro** : 46 figures exploitées dans 19 actions et deux directions, avec vrais dessins de roulade, parade et lancer de grenade. Six sockets de projectile correspondent aux poses. Les essais V1/V2 et les calibrations supplémentaires restent conservés.
- **Screaming Mantis MGS4 — Gala** : 30 poses natives, hauteur de jeu 245 conservée, rig et poupées distinctes. Aucun projectile ajouté à son profil de mobilité/reconnaissance. Les adaptations Gala et Rétro restent qualifiées comme créations du projet, sans prétention de tenue officielle.
- **Entrepôt — Mobile** et **Installation industrielle — Portable Ops Plus** : quatre plans indépendants par scène, rectangles natifs, parallaxe et poussière animée. Deux PNG originaux et quatre captures de référence conservés. Les 122 anciennes scènes gardent leurs définitions ; le registre en compte désormais 124.

Le chargement tardif des catalogues reconfigure maintenant le renderer réellement utilisé. Les limites de premier plan sont respectées sans modifier les PNG ; météo et premier plan sont traités séparément. Les combattants restent visibles aux bords. Les deux éditions disposent de leurs propres scènes dans Versus, Académie et Soutien. Les routes, intros et conclusions des Chroniques Mobile/MPO+ reçoivent ces scènes, sans remplacer leurs textes, adversaires, identités ou progression. AC!D Mobile reste distinct.

## Soutien, Arsenal et effets

Le Soutien référence les 375 corps admis, lit la tenue mémorisée sans réécrire les préférences et attend le décodage des acteurs et du décor. Onze opérations utilisent leurs unités natives de l’édition ; cinq oppositions restent des cibles de simulation explicites. BOX-TANK utilise une hauteur de présentation correcte ; Gekko et Cunningham restent natifs.

Les 32 rencontres de l’Arsenal utilisent 13 pilotes de leurs éditions exactes. Leur catalogue minimal reprend intégralement les sources admises ; un opérateur ne devient jamais celui d’un autre âge. Les scènes natives existantes remplacent les fonds procéduraux ; les lieux sont explicitement étiquetés comme simulations. Ce raccord n’affirme pas que chacune des rencontres historiques a eu lieu dans cette salle. Le sol du moteur reste 598, par translation de 30 pixels du sol natif 568 ; collisions, HP, objectifs et records restent inchangés. Les petites vignettes ne déclenchent pas le décodage de tout le catalogue de scènes. Les attentes annulées ne relancent pas un ancien choix.

Huit rigs et les masques de 31 morceaux sont raccordés à leurs véritables cibles. La destruction du rotor du Hind conserve le cockpit, les canons du D-Walker ne masquent plus son capteur et les missiles de ZEKE ne détachent plus les boosters. Onze familles d’armes/VFX utilisent leurs ressources natives ; le RAY MGS2 reçoit l’eau tandis que le RAY Revengeance conserve son effet chaleur/plasma. Chrysalis affiche trois rotors et son radar distinct. Le texte canvas de l’Arsenal reçoit un contour sombre discret pour rester lisible sur un sol clair.

## Vérification et conservation

- Validateur de directions natives partagées : contrat explicite, UID/SHA/rectangles/faces, régions croisant les deux directions refusées ; les options historiques sans contrat gardent leurs règles. Métadonnées et PNG altérés sont refusés. Le comptage paresseux accepte les mêmes 1 à 48 assets que la bibliothèque.
- Contrôles locaux des tenues, sources, profils, phases, ancrages et cas négatifs ; dessins raster vérifiés dans Chromium.
- Parcours normaux : trois tenues équipées et jouées, sélection de stage séparée, combat, pause/techniques, deux Chroniques réellement lancées et deux choix Académie ; 17 captures et aucune erreur navigateur.
- Soutien : seize opérations, corps natifs, rig/carton/tenue réellement observés et journaux de sauvegarde inchangés.
- Arsenal : douze contrats indépendants, cinq parcours normaux de cinq éditions et deux régressions de contraste ; aucun nouveau dessin en attente pendant les combats après décodage, aucune erreur navigateur, records intacts. Les essais Hind/RAXA/RAY vérifient aussi les destructions et effets.
- Graphe runtime normal : **2 611 fichiers, 3 084 449 821 octets**, tous les fichiers publics égaux aux sources et aucune référence runtime manquante. SHA-256 du manifeste : `2d06d0690113d2e11f993515c9834eca9701068249b14e78a4252e141bc66010`.
- Build TypeScript/Vite, contrôle PWA et 18 régressions de navigation de contenu vérifiés avant publication. La PWA conserve le chargement CQC à la demande, sans précacher tout son catalogue globalement.

Les sources, anciens essais, HOLD, sauvegardes et références historiques sont conservés. La publication ciblée conserve les 12 245 chemins du parent et les références protégées ; le snapshot de build est dérivé des quinze mêmes racines. L’état Vercel est contrôlé séparément après publication GitHub : ce document ne prétend pas que ces fichiers sont déjà en production.

## Reprises restantes

[Le prochain lot documenté](NEXT_LOT.md) et [ses sources/pins détaillés](NEXT_NATIVE_ART_LOT.json) distinguent les vraies reprises des variantes déjà raccordées. Ocelot MGS3 Gala, Solid Snake Gala, Fatman Gala, EVA Cyborg et la reprise artistique de Liquid nécessitent encore des poses corrigées. Onze autres candidats machines n’ont pas de planches natives complètes et ne sont pas artificiellement déclarés jouables. Certaines poses de saut/recharge/parade des anciens pilotes restent absentes ; leur corps natif reste utilisé. La tenue tardive MGS3 avec cache-œil et l’attestation de l’ancien Bulldozer restent ouverts.

La fidélité la plus proche des références reste l’objectif. Les scènes sont des adaptations de caméra latérale, leurs noms de salles restent descriptifs lorsqu’ils ne sont pas attestés, et aucune certification absolue 1:1 ni achèvement de tous les costumes de la franchise n’est revendiqué.
