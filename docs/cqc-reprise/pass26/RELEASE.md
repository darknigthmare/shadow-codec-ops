# Raccordements des modes — 11 octobre 2026

Les personnages et scènes déjà admis dans Versus sont désormais disponibles dans les autres modes CQC. Les liens des dossiers et cassettes de Shadow Codec Ops ouvrent leur destination précise.

## Changements

- Roster partagé de 375 combattants : les 21 identités natives déjà jouables rejoignent Arcade, Chroniques, Dossiers, Opérations de combat et Académie ; le Réseau de soutien ajoute aussi ces chefs d’équipe et conserve ses 64 contacts et ses 16 opérations. Les anciennes 354 histoires, progressions et identités restent conservées. Dossiers conserve en outre son personnage original historique `oc__parallaxe`, identifié comme non canonique : 376 fiches distinctes pour 375 combattants du roster commun.
- Catalogue partagé de 122 scènes. Les autres moteurs classiques gardent leurs missions et mécaniques propres ; aucune route incompatible n’est créée en leur injectant le roster général. Le sélecteur de l’Académie attend la disponibilité du catalogue complet et conserve le choix valide. Les circuits utilisent les scènes admises de leur édition ; 45 destinations de campagne ont été corrigées. Les éditions sans leur propre scène conservent leur destination VR.
- Le Réseau de soutien raccorde les scènes existantes de la bonne édition à ses opérations, avec les plans avant/arrière appariés. 14 opérations utilisent les scènes admises de leur propre édition. Mobile et Portable Ops+ restent signalés comme simulations VR, sans emprunter de décor à un opus voisin. Le départ attend le décodage des images ; sol, physique, contacts, opérations et sauvegardes restent identiques.
- L’archive actuelle des Finishers consulte les profils natifs existants du moteur : 375 profils et 1 500 techniques. Le raccourci Entraînement et le lancement du duel pointent vers les modules actuels. Les anciennes archives restent conservées.
- Chroniques accepte le roster courant du moteur, ce qui supprime l’attente de 12 secondes provoquée par l’ancien total figé de 354. Les moteurs intégrés des autres modes utilisent la version courante de Versus.
- Les nouveaux parcours sans histoire officielle écrite sont signalés comme simulations/adaptations de combat. Les aperçus natifs attendent leur décodage et respectent les références de dimensions existantes.
- L’ancien dossier `lore_tanker_hold_sabotage` ouvre aussi sa propre mission. Ses trois anciens liens, son identifiant et son texte sont conservés ; les 33 dossiers de base restent présents.
- Lore référence les opérations Side Ops existantes et résout les missions, entraînements VR, contacts, cassettes et conversations par identifiant réel. Le dossier d’Olga ouvre le Tanker ; un dossier ancien qui faisait planter la page est rendu compatible.
- Les références aux modules du Codex ouvrent leur module exact (campagnes, éditeurs, studio, cassettes ou Codec), au lieu d’ouvrir systématiquement les Réglages. Les références aux quatre systèmes internes conservent leur destination de documentation.
- Tape Archive prépare le contact et le dialogue exacts. L’appel commence après le clic du joueur. Les accès verrouillés restent soumis à leur progression.

## Vérification

- 18 tests ciblés du résolveur et des interactions React réussis ; TypeScript valide.
- 16 parcours réels vérifiés au navigateur : combats séparés et intégrés, Chroniques, Arcade, Académie, Survie, Dossiers, circuit MGS4, Soutien, Finishers, missions du Codex, cassettes et campagne. Les captures montrent les rendus natifs ; aucune exception JavaScript observée sur ces parcours.
- Dernière correction éditoriale après ces parcours : remplacement du total statique périmé dans Finishers par « TECHNIQUES DÉCISIVES ». Les scripts et les comportements testés sont identiques.
- Vérifications ciblées des identités, sauvegardes et circuits ; 250 PNG de scènes inchangés et 122 références natives validées.
- Build Vite et contrôle PWA réussis avec la configuration existante. CQC reste exclu du précache global.
- Manifeste runtime reconstruit depuis le standalone : 2 580 fichiers ; SHA256 `aa91967a2fc94acf1ffc03a05742ae7fdf26f2b2b50746c08d368a04d3b4085f`.

## Conservation et limites

Les sources historiques, images, archives et incarnations distinctes sont conservées. Les préparations artistiques privées incomplètes ne sont pas promues dans le jeu. Les adversaires procéduraux propres au Réseau de soutien restent ceux de son gameplay existant ; leur nouvel habillage natif constitue un chantier distinct. Cette livraison raccorde les contenus existants ; elle ne certifie pas une nouvelle fidélité canonique absolue de toutes les illustrations ni une nouvelle histoire officielle pour les simulations.
