# CQC — Lot de 20 personnages et 10 machines

Ce lot ajoute 20 personnages avec deux atlas natifs distincts, à droite et à gauche, dans le Versus élargi et le Core. Les 40 atlas contiennent 640 poses physiques. Les animations réemploient certaines poses ; il ne s’agit pas de 640 animations complètes. Le catalogue élargi passe de 53 à 73 personnages natifs.

Personnages : Snake MGS2, Olga MGS2, Olga Ninja, Ocelot MGS2, Meryl MGS4, Johnny MGS4, Vamp MGS4, Liquid Ocelot, Snake Ghost Babel, Chris Jenner, Campbell Portable Ops, Cunningham, Null, Python, Gene, Snake Ac!d, Teliko, Leone, Clown et Ocelot MGSV.

Les 10 machines ajoutées sont Gander, ZEKE, Shagohod, Sahelanthropus, KODOQUE, Pupa, Chrysalis, Cocoon, Peace Walker et Chaioth. Le catalogue possède désormais 16 machines natives articulées : 14 rencontres Core et 2 rencontres Ac!d. Chaque pièce utilise les pixels PNG originaux, des pivots, des clips et une échelle uniforme. Les six anciens modèles restent inchangés. Les moteurs et les conditions de dégâts existants sont conservés.

La sélection présente des dossiers d’opération, des noms d’univers et des groupes diégétiques. Les catégories internes de production sont masquées. Recherche, filtres, progression et choix sauvegardés sont conservés. Le menu Ac!d permet de changer de machine et de difficulté puis de reprendre sans état de combat invalide.

## Fidélité et limites

Les éditions originales, captures et références officielles ont guidé les revues. Pupa a été remplacée après consultation du rendu officiel complet ; Chrysalis utilise ses trois disques fermés, et le pod de Cocoon occupe son emplacement canonique. Clown correspond au déguisement canonique de Teliko, avec ses propres atlas. Cunningham conserve sa plateforme du moteur et son nouveau corps natif, sans l’arme flottante inventée du candidat rejeté.

L’objectif reste la fidélité maximale. Aucune certification absolue 1:1 n’est donnée : les vues 2D, certaines transitions, les ports de Gander et plusieurs coordonnées de visée sont des adaptations du jeu. Un trait de visée relie le pod visuel de Cocoon à sa cible de simulation conservée. Les versions rejetées et les notes de revue restent dans la restauration sans perte.

## Vérifications

Les 20 personnages ont été vus dans de vrais combats dans les deux directions, dans le Versus élargi et le Core, avec contrôles physiques et sans échec de rendu. Les 705 tests passent ; le runtime contient 1 228 fichiers et aucun ancien chemin n’a été supprimé. Les preuves de vérification des machines sont rattachées au paquet final ; les tests de scripts et les vues documentaires ne sont pas présentés comme des victoires en combat.

## Sources et restauration

Le dossier `lossless/` contient les fragments ZIP, le manifeste de restauration, les outils et leurs vérifications. Les PNG utilisés par le jeu sont référencés par leur chemin Git exact dans `public/cqc/` et leur SHA-256 pour éviter une seconde copie. Les autres sources, PNG rejetés, références, candidats, rapports et preuves de cette passe sont conservés dans les fragments. L’artbook original Portable Ops est inclus en entier, fragmenté sans modification.

L’inventaire `inventory/` conserve les 282 personnages restant sans atlas natif, les 113 stages et les suites proposées. Les 25 stages natifs, les campagnes et les autres menus n’ont pas été déclarés terminés par ce lot. Les candidats Snake MGS3 blessé et les plans de stage Gander sont conservés pour la suite.

Les liens de production restent : https://shadow-codec-ops.vercel.app/cqc/index.html et https://shadow-codec-ops.vercel.app/?module=cqc. Le commit et les preuves de déploiement seront consignés après la publication exacte du lot.
