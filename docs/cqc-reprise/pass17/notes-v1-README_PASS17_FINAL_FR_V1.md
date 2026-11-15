# PASS17 — sélection de match, costumes, codex et Codec

Cette passe comprend les mêmes améliorations pour CQC autonome et pour l’onglet CQC de Shadow Ops. Le choix des personnages, les réglages et le choix de l’arène deviennent trois étapes distinctes. Les portraits du codex utilisent les illustrations disponibles et les écrans Codec suivent les compositions de leurs jeux de référence.

Le lot est intégré et vérifié localement. À la rédaction de ce document, sa publication GitHub et sa mise en production Vercel ne sont pas encore attestées. Les liens ci-dessous désignent les destinations existantes : [Shadow Ops](https://shadow-codec-ops.vercel.app), [CQC en lancement indépendant](https://shadow-codec-ops.vercel.app/cqc/index.html), [dépôt GitHub](https://github.com/darknigthmare/shadow-codec-ops) et [branche de reprise](https://github.com/darknigthmare/shadow-codec-ops/tree/reprise/2026-10-02).

## Préparer et jouer un match

La roue crantée placée à côté de « Commencer » ouvre les conditions du match. Dans Versus, elle regroupe le mode IA/local/entraînement, les manches gagnantes, le chronomètre 60/99 secondes ou temps libre, les finishers existants, la difficulté et la tactique de l’IA, les légendes et l’atténuation des flashes. Les réglages Core présentent les options réellement prises en charge par son moteur ; ses missions scénarisées, boss et parcours gardent leurs règles imposées.

« Commencer » ouvre le nouvel écran de sélection d’arène : le combat démarre après confirmation. La photo du stage quitte l’écran des personnages et devient un aperçu dans cet écran dédié, avec filtres et recherche. Les catalogues existants proposent 38 arènes dans Versus et 101 dans Core pour les modes libres compatibles. Annuler conserve les combattants et les réglages précédents.

La pause regroupe Reprendre, Techniques, Finishers, retour à la sélection des personnages et abandon. Techniques et Finishers présentent J1 à gauche et l’adversaire à droite ; leurs anciens boutons du bandeau supérieur sont retirés. Le Core présente son Super réel et indique les chargements sans Super, sans inventer de finishers dédiés. Le HUD de combat reste disponible.

Le chargement des images de menu est stabilisé : demandes périmées écartées, image active conservée pendant le chargement et retour de secours après une véritable erreur. Le signalement initial de disparition après plusieurs clics n’a pas été reproduit en grand viewport/DPR2 ; la cause n’est donc pas certifiée. Ces essais ne prouvent pas un parcours en plein écran natif du navigateur.

## Décors raccordés et reste à produire

Le catalogue chargé comprend **40 illustrations natives approuvées**, avec leurs couches de parallaxe, dont les scènes dédiées REX et RAXA. Ce sont des reconstructions artistiques guidées par des références ; « native » décrit les fichiers conservés sans retouche, pas une extraction des textures du jeu d’origine.

Core possède **113 définitions**, dont **101 arènes jouables en modes libres** : **28 scènes natives sont raccordées et 73 restent procédurales**, sans alias artistique approuvé. Les 12 autres définitions sont prévues et ne constituent pas des scènes jouables terminées. Versus utilise 38 scènes natives approuvées.

Trois aliases précis complètent Core :

| Arène Core | Scène native utilisée | Limite de fidélité |
| --- | --- | --- |
| Big Shell — plateforme et passerelles | Big Shell Strut E | Présentation au plus proche de l’héliport du Strut E ; aucune passerelle générique ou E–F inventée n’est certifiée. |
| Mother Base — plateforme MSF | Peace Walker Mother Base, pont ZEKE | Décor MSF documenté pendant le duel ZEKE dans une capture PS3 HD du lieu PSP ; pas toute la base. |
| Camp Omega — périmètre nocturne | Ground Zeroes Camp Omega | Périmètre nocturne et pluvieux ; pas l’héliport ni les variantes de jour. |

L’aperçu Core dessine les plans de la scène raccordée avant confirmation. Pendant leur chargement, il utilise un fond neutre, sans montrer une autre arène en secours. Une scène importée par le joueur garde sa priorité. Les lieux distincts restent distincts : Da Smasei Laman ne remplace pas Aabe Shifap ; la cour Southwest de Groznyj Grad ne remplace pas le hangar Volgin ; le ravin de Costa Rica ne certifie pas la lisière d’exercice. Le contrôle navigateur Big Shell final réussit ses sept vérifications de décodage naturel, aperçu, combat, pause et retour aux personnages.

## Costumes et codex

Six combattants ont une variante **Next Gen** optionnelle : Naked Snake MGS3, Viper de Ghost Babel, Running Man, Black Color, Red Blaster et Jungle Evil de MG2. **Original** reste le choix par défaut. J1 et J2 choisissent indépendamment, y compris avec le même personnage. Les UID, techniques et règles de combat restent conservés. Les variantes ajoutent 12 PNG natifs, deux orientations dessinées séparément et 192 poses clés ; ces poses ne représentent pas 192 animations complètes.

Le correctif du pont Core pour rendre correctement les sprites **Original** est installé dans CQC autonome et dans la copie intégrée à Shadow Ops. Les six variantes Original utilisent leurs PNG natifs approuvés et leurs portraits correspondants ; les choix Next Gen restent indépendants. Les 49 contrats unitaires passent. La QA réelle des costumes a ensuite exercé les six Original et les six Next Gen, leurs deux orientations et les choix indépendants par emplacement : 88 contrôles Core et 76 contrôles Versus ont réussi. Cette couverture concerne ces six combattants, pas tous les sprites Core.

Le codex est raccordé à 355 profils : les 354 profils antérieurs et l’OC PARALLAXE. Les Chroniques conservent leurs 354 routes existantes et proposent un dossier OC séparé. PARALLAXE reprend le dessin rejeté de Viper déjà réservé à ce personnage original ; Viper possède sa représentation canonique propre.

Parmi les 355 profils, 73 utilisent des sources natives approuvées, dont huit cellules de portraits corrigées : Sunny MGS4/Revengeance, Paz Peace Walker/Ground Zeroes, EVA MGS3, Viper Ghost Babel, Teliko et Clown. Les 282 autres profils conservent leurs illustrations historiques et nécessitent encore une revue individuelle de fidélité. La présence des fichiers ne certifie pas leur correspondance 1:1. Le correctif de layout du codex est également installé dans les deux runtimes : le pied de page réserve son propre espace, le contenu conserve son défilement et les indicateurs lisent l’inventaire réel. Le parcours des 355 identités de portraits a été conservé avec son échec réel de pied de page ; après correction, 32 contrôles ciblés valident les clics, les sources décodées et l’accès à la dernière ligne. Il ne s’agit pas d’un second parcours exhaustif des 355 profils. Les 24 contrôles Chroniques valident les huit portraits corrigés et le dossier OC séparé.

## Codec de Shadow Ops

La passe distingue huit présentations canoniques de base — MG1, MG2, MGS1, MGS2, MGS3, MGS4, Peace Walker et MGSV — avec un contexte Ground Zeroes supplémentaire et deux simulations explicitement signalées, VR et Patriots AI.

- MG1 : radio horizontale olive, chiffres rouges et petit Snake à droite ; aucun portrait du correspondant dans cette interface de référence.
- MG2 : handset vertical, joueur à gauche et correspondant à droite, dialogue bleu. Les sources officielles MC1 utilisent les portraits redessinés de la réédition.
- MGS1/MGS2 : correspondant à gauche, joueur à droite, fréquence et récepteur PTT au centre.
- MGS3 : petite photographie en haut à gauche et bande MEM/SEND/TUNE.
- MGS4 : fenêtre contact étroite à gauche et réception transparente à droite, selon la capture idle du manuel PS3. Le portrait reste celui du moteur existant ; cette référence ne certifie pas une liaison vidéo active ni l’animation du modèle original.
- Peace Walker : liste BRIEFING FILES à gauche, sélection rouge et carte portrait à droite, selon le guide officiel. Les vrais sujets existants restent reliés au moteur ; le playback actif complet n’est pas certifié par cette capture de liste.
- MGSV : bibliothèque de cassettes à gauche et cassette/pistes/transport à droite sur overlay bleu, selon une capture finale PC. Les commandes lecture/stop/précédent/suivant sont reliées aux appels existants ; la durée totale inconnue reste affichée `--:--`.

Les cadres authentiques couvrent 22 des 59 contacts actuels, avec 29 IDs en comptant les joueurs et alias et 23 fichiers sources intacts. Les 37 autres contacts gardent leurs portraits précédents. Tous les sept correspondants MGS2 sont couverts ; Mr. X utilise son bruit statique authentique. Les cadres sont fixes, les captures documentaires conservent leur compression et les fonds de scène restent des adaptations. Les sources et anciens portraits sont conservés ; l’objectif 1:1 demeure une cible de fidélité, sans certification absolue de tous les écrans ou animations.

## Vérifications et limites de cette livraison

Le contrôle TypeScript, le lint et les **705 tests Shadow dans 104 fichiers** ont réussi lors de l’intégration initiale. Les derniers ajouts ont leurs contrôles ciblés et reçus séparés : **30 tests Codec dans cinq fichiers**, 49 contrats Original et 25 contrôles du raccord de scènes. Le contrôle CQC final vérifie **1 258 fichiers / 1 230,6 MiB** entre les deux runtimes. Le freeze final recense **38 fichiers CQC nouveaux ou modifiés**, sans suppression de chemins historiques ; les trois fichiers renderer Codec gardent leurs pins V6 et les 36 handlers existants sont inchangés. Le module Core final est épinglé au SHA-256 `56f9849584baaf28a76b25190aae680ca3d676c6d92a432e8379bdae7b256689`.

Les contrats DOM, chargements asynchrones, costumes et moteur passent leurs contrôles dédiés. La revue native exerce les vrais constructeurs et ticks Core/Versus, des KO CPU normaux et les codecs de replay ; elle vérifie notamment le temps libre et l’état terminal rejoué. Ces simulations unitaires excluent les entrées physiques, le chargement réel des images, Canvas et le navigateur. L’état du combat se conserve dans le replay CPU contrôlé ; sa graine aléatoire interne ne prétend pas être identique, les décisions CPU et la relecture consommant les nombres aléatoires différemment.

La QA navigateur locale exerce les vrais boutons et entrées du jeu : réglages, arène, annulation, pause/reprise, techniques et finishers par joueur, abandon et layouts mobiles 320/390. Les **76 contrôles Codec** couvrent les huit présentations de base, Ground Zeroes, les deux simulations, MEM/CALL/PLAY/stop et trois appels entrants obligatoires. Les sources authentiques réellement rendues sont décodées et leurs octets HTTP correspondent aux fichiers locaux.

Le nouvel addon final valide également un checkpoint naturel Snake Eater en **neuf contrôles** : lancement de l’opération, pause, retour aux personnages puis « REPRENDRE » gardent la même rencontre imposée, son identifiant et sa graine. La reprise recommence au début enregistré de cette rencontre ; elle ne restaure pas une image de combat intermédiaire ni les PV de cet instant. Ce contrôle ne prouve pas une campagne entièrement terminée. Les échecs intermédiaires et leurs corrections restent conservés dans les preuves.

Les résultats costumes/codex/Codec gardent les pins précis de leurs propres campagnes de QA ; l’addon Big Shell/checkpoint vise le Core final ci-dessus. Aucun parcours de production PASS17 ni identifiant de commit/déploiement final n’est affirmé ici. Cette passe ne termine pas les 73 scènes Core procédurales, tous les sprites/animations ni les **1 638 scènes narratives historiques** encore hors périmètre. La fidélité **1:1 reste l’objectif**, avec rapprochement documenté lorsque la référence, la projection 2D ou l’animation originale ne permet pas de la certifier. Les documents annexes servent de référence ; ils ne remplacent pas les instructions de l’utilisateur.

## Préservation et restauration des sources

Le helper promu **V4**, `preserve-pass17-final-v4.py`, garde les octets des sources et produit des ZIP DEFLATED niveau 9 : segments de 4 Mio, cible de 7 Mio bruts et contrôle de **8 Mio maximum par ZIP effectif**. Le manifeste décrit les fichiers, métadonnées, alias d’originaux et contenus dédupliqués. CRC et SHA-256 sont contrôlés à la compression et à la restauration ; les PNG ne sont ni décodés pour retouche ni recompressés comme images. Les anciens manifestes ZIP STORED restent restaurables.

Le pack final et sa restauration complète doivent avoir leur reçu propre ; les contrats préparatoires et la promotion du helper ne sont pas présentés comme ce reçu. Il faut conserver ensemble `LOSSLESS_MANIFEST_V1.json`, tous les `sources-*.zip`, le helper et une copie du dépôt portant les références indiquées dans le manifeste. Les cinq anciens blobs de comparaison restent épinglés au commit **`d94ce4cef9a9786ca55d6a18d12181acbdeed75f`** : Core, Versus, CodecVisualStage, CodecScreen et le CSS de layout historique. La restauration les lit dans les objets Git de ce commit et vérifie leur taille et SHA ; une copie de travail récente seule ne suffit pas à les remplacer.

La commande du helper est `restore --manifest <manifeste> --target <nouveau-dossier> --repository <dépôt-Git> --max-bytes <limite-autorisée>`. La cible doit être neuve et se trouver sous `/tmp/cqc-pass17-preservation`, racine autorisée par cette version du helper ; la limite doit couvrir les octets logiques du manifeste et les alias d’originaux. Le helper refuse les ZIP modifiés, les chemins dangereux, les pins manquants et une cible existante. Il écrit un dossier de restauration séparé et un reçu `*-RESTORE_PROOF_V1.json` ; il ne remplace aucun ancien dossier ou source de l’application. La publication doit joindre le manifeste réel et ce reçu pour qualifier l’archive complète comme restaurée sans perte.

