#!/usr/bin/env python3
"""Produit les lots de travail transversaux de l'audit, sans modifier le jeu."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'ba4e30a09e9e95727b75a665e7b6ab07d9941aea'
rows = []


def add(code, priority, category, scope, finding, deliverable, acceptance, evidence, nature='production_et_verification'):
    rows.append(dict(id=code, priorite=priority, domaine=category, perimetre=scope,
                     constat=finding, livraison=deliverable, critere_reception=acceptance,
                     preuves=evidence, nature=nature, statut='a_planifier', commit_reference=SOURCE))


add('LOT-01', 'P1', 'Cohérence des registres', '375 UID de politique / 380 profils actifs',
    'Fenrir, Raptor, Hammerhead, Rescue Box et Raiden R-00 sont actifs mais hors politique de costumes.',
    'Décider pour chacun original/rétro/nextgen/Gala, puis étendre le périmètre et recalculer les compteurs.',
    'Même ensemble de UID entre politique applicable et roster ; les exclusions intentionnelles sont nommées.',
    '02_ROSTER_COSTUMES.md', 'ecart_mesure')
add('LOT-02', 'P1', 'Cohérence des registres', '191 descriptors / 217 alternatives effectives',
    'Les registres différés, options déjà chargées et files historiques pending-art ont des périmètres différents.',
    'Vue dédupliquée par UID et ID de costume, avec provenance, famille, statut et liens aux assets livrés.',
    'Conserver les 217 alternatives constatées ; ne pas recompter les alias comme des corps neufs.',
    '02_costumes_presents.csv', 'ecart_mesure')
add('LOT-03', 'P1', 'Cohérence des registres', '1 520 finishers / 380 profils',
    'toneCounts conserve 354 profils alors que les entrées actuelles en couvrent 380.',
    'Recalculer les tonalités à partir des fiches finales : stylized 246, simulation 122, nonlethal 12.',
    'Somme des catégories égale à 380 ; aucun finisher ni réglage de tonalité perdu.',
    '04_ANIMATIONS_SPRITES.md', 'ecart_mesure')
add('LOT-04', 'P1', 'Lot P41 en attente', 'Campbell MGS1 — Rétro',
    'Entrée explicitement encore en attente dans le lot P41.',
    'Planche native avec silhouette, uniforme, accessoires et directions propres à cette incarnation.',
    'Toutes les poses du contrat 04, lisibilité à taille réelle, source attachée, chargement du costume validé.',
    '01_METHODE_ET_INVENTAIRE.md', 'attente_explicite_source')
for code, game in [('LOT-05', 'Peace Walker'), ('LOT-06', 'Ground Zeroes'), ('LOT-07', 'The Phantom Pain')]:
    add(code, 'P1', 'Lot P41 en attente', f'Hideo — {game}',
        'Le portrait est présent ; le corps de combat de cette version reste dans les attentes P41.',
        'Corps complet de cette apparition, références de tenue, deux directions et transitions ; ne pas réutiliser le portrait comme corps.',
        'Identité, vêtements, proportions et accessoires vérifiés contre la bonne apparition ; actions CQC signalées comme adaptation.',
        '01_METHODE_ET_INVENTAIRE.md', 'attente_explicite_source')
for code, machine in [('LOT-08', 'TT77 Nosorog'), ('LOT-09', 'UTH-66 Blackfoot')]:
    add(code, 'P1', 'Lot P41 en attente', machine,
        'Machine explicitement encore en attente dans le lot P41 ; des préparations ne constituent pas une livraison complète.',
        'Pièces articulées, vues opposées, armes, points d’émission, déplacements, impacts et destruction propres au véhicule.',
        'Mouvements mécaniques cohérents, perspective stable, collisions et altitude adaptées ; reçus de rendu et de combat.',
        '03_STAGES_MACHINES.md', 'attente_explicite_source')
add('LOT-10', 'P1', 'Animation fondamentale', '380 profils + OC optionnel séparé',
    'Les routes visuelles sont présentes ; plusieurs états fonctionnels ne disposent pas de groupes dédiés.',
    'Départ/arrêt, marche arrière, demi-tour, dash, recul, réception, chute et relevé selon morphologie.',
    'Aucune glissade d’appui, transition ou équipement inversé ; alternative explicite pour un corps incapable de sauter.',
    '04_ANIMATIONS_SPRITES.md; animations/README.md')
add('LOT-11', 'P1', 'Animation des techniques', '3 800 techniques CQC',
    'Plusieurs techniques différentes partagent un groupe d’images ; un nom et un timing ne prouvent pas une animation distincte.',
    'Anticipation, action et récupération de chaque ligne ; contact placé dans les ticks actifs du moteur.',
    'Les dix techniques de chaque profil restent reconnaissables ; arme, direction, impact et contre-jeu conservés.',
    'data/animation_moves.csv')
add('LOT-12', 'P1', 'Directions et costumes', '597 couples acteur / tenue',
    '380 originaux et 217 alternatives exposés ; les directions séparées sont déclarées mais la ressemblance de chaque image reste à contrôler.',
    'Comparer toutes les poses avec visage, œil/bras, étui, fourreau, tissu, casque, accessoires et proportions propres à chaque tenue.',
    'Aucune inversion anatomique ou disparition d’accessoire ; validation individuelle du couple acteur/tenue.',
    'data/animation_variants.csv')
add('LOT-13', 'P1', 'Contacts et victimes', 'Prises, coups, impacts et réactions',
    'Humanoïdes, enfants, quadrupèdes, machines, objets et unités volantes n’autorisent pas les mêmes prises.',
    'Points d’accroche et réactions adaptés aux tailles/morphologies ; variantes sans prise quand le contact est impossible.',
    'Aucune main dans le vide ni cible suspendue sans support ; collisions indépendantes du cadre transparent.',
    '04_ANIMATIONS_SPRITES.md')
add('LOT-14', 'P1', 'Grandes machines', '64 rigs techniques et profils raccordés',
    'Les définitions de rigs ne correspondent pas à 64 boss uniques ; la vérification articulation/échelle reste par machine.',
    'Revoir rotation, appuis, recul, chenilles/roues/pattes, rotor, altitude, ouvertures et points d’émission.',
    'Armes et jambes suivent leur articulation ; tirs quittent le bon canon ; aucune déformation par la caméra.',
    '03_STAGES_MACHINES.md')
add('LOT-15', 'P2', 'Narration', '26 profils actifs sans histoire',
    'Les Chroniques contiennent 354 histoires pour 380 profils ; les 26 UID absents sont listés.',
    'Écrire et intégrer chaque parcours, trois scènes d’introduction et trois d’épilogue, puis duels et conditions.',
    '156 scènes nouvelles reliées aux bons UID ; inventions CQC identifiées ; progression conservée.',
    '05_NARRATION_AUDIO_SYSTEMES.md; data/narration_profils.csv', 'absence_mesuree')
add('LOT-16', 'P2', 'Illustrations narratives', '1 638 scènes en composition / 273 histoires',
    '486 scènes sont déclarées peintes ; les autres utilisent encore des compositions.',
    'Illustrer les scènes par opus, avec lieu, action, caméra, costume et accessoires de chaque ligne.',
    'Six scènes propres par histoire lorsque l’objectif peinture complète est retenu ; source et preuve de rendu par scène.',
    'data/narration_scenes.csv', 'production_identifiee')
add('LOT-17', 'P2', 'Narration existante', '81 histoires avec six peintures déclarées',
    'Le mapping distingue déjà ouverture et épilogue ; aucune même clé partagée dans une histoire.',
    'Contrôler le contenu réel des 486 peintures et la progression dramatique, sans annoncer un doublon de clé inexistant.',
    'Images observées, raccords de tenue/époque/lieu validés ; défauts éventuels documentés par capture.',
    'data/narration_scenes.csv', 'verification_necessaire')
add('LOT-18', 'P2', 'Présentation de combat', 'Introduction, fin de manche et conclusion',
    'Les poses de sélection et épilogues illustrés ne suffisent pas à couvrir toutes les transitions du duel.',
    'Entrée en scène, pose de début, victoire/défaite de manche et sortie finale distinctes, décrites dans chaque fiche.',
    'Transitions raccordées sans décès narratif imposé par une manche ; costume conservé ; rythme compatible avec la revanche.',
    'animations/README.md')
add('LOT-19', 'P2', 'Finishers', '1 520 fiches existantes',
    'Les descriptions et familles ne prouvent pas 1 520 séquences dessinées uniques.',
    'Réaliser les storyboards en cinq plans de chaque fiche, avec variante de victime et réglages du mode.',
    'Anticipation, action, impacts, retombée et pose finale lisibles ; temps CQC documenté séparément de la source officielle.',
    'data/animation_finishers.csv')
add('LOT-20', 'P2', 'Stages existants', '124 définitions de stage',
    'La présence dans le catalogue ne clôture pas la géométrie, les plans, les accessoires ni la fidélité d’édition.',
    'Appliquer la fiche propre à chaque stage : plan jouable, arrière-plan, premiers plans, profondeur, météo et lumière.',
    'Comparaison à la même édition, appuis au sol, limites lisibles, aucun masquage involontaire des combattants.',
    '03_STAGES_MACHINES.md')
add('LOT-21', 'P2', 'Arènes de boss', '33 dossiers d’affrontement',
    'Une machine ou un boss jouable n’implique pas une reconstitution de sa rencontre originale.',
    'Créer ou compléter lieu exact, échelle, phases, points faibles, armes, événements et conclusion propres à la rencontre.',
    'Arène de versus et reconstitution de boss distinguées ; scènes spécialisées RAY MGS4 et Port Area préservées.',
    '03_STAGES_MACHINES.md')
add('LOT-22', 'P2', 'Audio', 'Voix et réactions',
    'Le manifeste inspecté ne déclare pas de fichiers audio ; le code fournit des sons synthétisés.',
    'Réactions d’effort, coups reçus, garde, chute, reprise, victoire et répliques contextualisées selon personnages.',
    'Points de déclenchement synchronisés, variantes, volumes voix séparés et absence de répétition excessive.',
    '05_NARRATION_AUDIO_SYSTEMES.md')
add('LOT-23', 'P2', 'Audio', 'Armes, impacts et machines',
    'La synthèse sonore ne constitue pas une bibliothèque complète de références par arme et matériau.',
    'Départs, mécanismes, rechargements, douilles, impacts, moteurs, servos, rotors et destructions adaptés aux sources.',
    'Événements synchronisés aux contacts/armes ; variations propres aux matériaux et distances.',
    '05_NARRATION_AUDIO_SYSTEMES.md')
add('LOT-24', 'P2', 'Audio', 'Stages, musique et interface',
    'Les ambiances et transitions doivent être définies par scène et état de combat.',
    'Ambiances bouclées, événements ponctuels, changements de tension, menus, compte à rebours et fin de manche.',
    'Pas de couture audible ni d’empilement après pause/revanche ; réglages musique/effets/voix cohérents.',
    '05_NARRATION_AUDIO_SYSTEMES.md')
add('LOT-25', 'P3', 'Personnages officiels', 'Catalogue de lacunes par opus et importance',
    'Le cast majeur est déjà largement représenté ; plusieurs secondaires, tertiaires, archétypes et variantes restent à traiter.',
    'Prendre chaque ligne du catalogue roster : vérifier la source, choisir jouable/PNJ/dossier puis produire les vues et actions requises.',
    'Aucun alias compté comme nouvelle personne, aucun corps inventé déclaré officiel, niveau de preuve explicite.',
    '02_roster_lacunes.csv')
add('LOT-26', 'P3', 'Costumes officiels', 'Catalogue des tenues, états et accessoires',
    'Les lignes mélangent éléments présents, manquants, accessoires et lots modulaires ; le total n’est pas un nombre de tenues absentes.',
    'Rapprocher les options non répertoriées de la tenue Original, vérifier images et références, puis confirmer les variantes réellement à produire ; préparer vues et contraintes d’animation.',
    'Édition, conditions de déblocage, accessoire et modèle compatibles ; réemploi des poses évalué costume par costume.',
    '02_costumes_cibles.csv')
add('LOT-27', 'P3', 'Éditions et bonus officiels', 'MGS3 / 3DS / Delta / MC1 / MC2',
    'Les éditions et bonus officiellement intégrés ne doivent pas être assimilés à des créations CQC ou à la version originale.',
    'Contrôler les écarts d’édition, Photo Camo et bonus ; MC2 Gold Camouflage et Uniform GOLD ont leur propre référence.',
    'Source officielle et édition inscrites ; aucune nouvelle carte ou personne déduite du seul portage.',
    '02_ROSTER_COSTUMES.md; 03_STAGES_MACHINES.md')
add('LOT-28', 'P3', 'Stages supplémentaires', 'Catalogue par opus, Online, Arcade et FOX HUNT',
    'Un stage générique de forêt, base ou hangar ne couvre pas tous les lieux nommés.',
    'Confirmer chaque lieu priorisé, ses plans et événements ; produire des arènes distinctes lorsque la géométrie le justifie.',
    'Les noms de préversion non confirmés restent à référencer ; cartes Online séparées selon leur épisode.',
    '03_STAGES_MACHINES.md')
add('LOT-29', 'P3', 'Identités et provenance', 'Alias, mineurs, designs CQC et corps non documentés',
    'Les libellés historiques et les corrections natives actives peuvent diverger.',
    'Préserver les correctifs Chris/Goodluck, opérateur MGO1, Carter, Weasel ; distinguer Lucy et Lucinda avec leur relation.',
    'Métadonnées de présentation, UID de sauvegarde et références concordants ; pas d’effacement d’un original CQC.',
    '02_ROSTER_COSTUMES.md')
add('LOT-30', 'P3', 'Références à résoudre', 'Turtle Armor et libellés ambigus',
    'Le nom ne permet pas d’identifier une tenue officielle précise avec les preuves disponibles.',
    'Rassembler image ou séquence source, jeu/édition et nom exact avant de choisir silhouette et matériaux.',
    'Aucune substitution automatique par Power Armor ou Battle Dress ; statut non certifié tant que référence absente.',
    '01_METHODE_ET_INVENTAIRE.md', 'reference_a_confirmer')
add('LOT-31', 'P4', 'Créations CQC', '20 concepts détaillés proposés',
    'Les exemples commencés établissent des familles Gala, cyborg, Dité/Survive et Metal Gear personnalisés.',
    'Sélectionner puis réaliser les concepts du catalogue avec design, matières, accessoires et changements d’animation décrits.',
    'Fidélité à une fiche concept approuvée ; origine CQC explicite ; visage et incarnation conservés.',
    '02_costumes_originaux_proposes.csv', 'proposition_cqc')
add('LOT-32', 'P4', 'Série Rétro', '291 UID non couverts dans la politique de 375',
    '84 UID sont déjà couverts ; le compteur est celui d’un style, pas celui des personnages absents.',
    'Produire une réinterprétation pixel propre par UID, après réconciliation de périmètre du LOT-01.',
    'Silhouette reconnaissable, asymétries, poses et lisibilité contrôlées ; aucun faux statut officiel MSX.',
    'data/politique_costumes_375.json', 'demande_projet')
add('LOT-33', 'P4', 'Série Gala', '287 UID non couverts dans la politique de 375',
    '88 UID sont déjà couverts ; une tenue habillée doit s’adapter au corps et aux accessoires.',
    'Créer les tenues par groupes cohérents, avec variante mécanique ou présentation adaptée quand un smoking humain ne convient pas.',
    'Morphologie conservée, tissus et équipement animés, provenance CQC, pas de remplacement du costume officiel.',
    'data/politique_costumes_375.json', 'demande_projet')
add('LOT-34', 'P2', 'Sauvegarde', 'Chroniques, roster et nouveaux UID',
    'Validation, double emplacement et export/import existent déjà.',
    'Recette des migrations, reprise d’anciens exports, favoris et records après ajout des histoires/costumes.',
    'Progression conservée entre module autonome et hôte ; référence retirée gérée proprement.',
    '05_NARRATION_AUDIO_SYSTEMES.md', 'verification_necessaire')
add('LOT-35', 'P2', 'Commandes et écran', 'Clavier, manette, tactile et petits écrans',
    'Bindings, gamepad et interface tactile existent ; la sonde de registres ne les certifie pas.',
    'Recette sur appareils réels : clavier français, deux joueurs locaux, reconnexion manette, safe areas et grandes machines.',
    'Actions simultanées fiables, focus récupéré, HUD et contact lisibles sans masquer les commandes.',
    '05_NARRATION_AUDIO_SYSTEMES.md', 'verification_necessaire')
add('LOT-36', 'P2', 'Accessibilité', 'Tous modes et effets',
    'Des options de mouvement réduit, flash et texte existent, sans validation exhaustive de leur propagation.',
    'Contrôler menus, dialogues, tirs, météo, tremblements et transitions ; navigation clavier et contraste.',
    'Réglages appliqués sur tout le parcours, états compréhensibles sans couleur seule.',
    '05_NARRATION_AUDIO_SYSTEMES.md', 'verification_necessaire')
add('LOT-37', 'P2', 'Chargement et performance', '2 736 fichiers / 3 187 473 639 octets déclarés',
    'Le volume cumulé n’est pas le poids initial ni une mesure de fluidité.',
    'Mesurer par combat/costume/scène : réseau réellement transféré, décodage, mémoire, cadence et réutilisation.',
    'Budgets par appareil fondés sur mesures ; optimisation conservant les originaux et la comparaison visuelle.',
    'data/etat_mesure.json', 'verification_necessaire')
add('LOT-38', 'P3', 'Hors ligne', 'Cache CQC à la demande',
    'Le préchargement global exclut CQC ; une scène non visitée n’est pas automatiquement disponible hors ligne.',
    'Définir des packs explicites et un état de disponibilité, puis contrôler interruption/reprise si le mode hors ligne complet est retenu.',
    'Aucun écran bloqué sur ressource inconnue ; taille et disponibilité du pack compréhensibles.',
    '05_NARRATION_AUDIO_SYSTEMES.md', 'option_produit')
add('LOT-39', 'P3', 'Version et preuves', 'Documentation et inventaires anciens',
    'Les anciens nombres et pending-art ne représentent pas tous P41.',
    'Générer la synthèse depuis le registre chargé, afficher la release et dater chaque preuve de validation.',
    'Commit, famille, UID, ressources et reçus cohérents ; anciens rapports conservés comme historiques.',
    '01_METHODE_ET_INVENTAIRE.md', 'ecart_documentaire')
add('LOT-40', 'OPTION', 'Réseau', 'Versus en ligne',
    'Aucun système complet de combat réseau identifié dans les modules inspectés ; CPU/local existent.',
    'Décision produit séparée avant conception de synchronisation, rollback, salons et reconnexion.',
    'Ne bloque pas la complétude artistique ou canonique ; spécification distincte si retenu.',
    '05_NARRATION_AUDIO_SYSTEMES.md', 'option_produit')
add('LOT-41', 'OPTION', 'Crossovers', 'Apparitions dans des jeux extérieurs : Smash, Fortnite, Bomberman…',
    'Apparitions officielles dans des jeux extérieurs, hors cœur Metal Gear. Les collaborations intégrées à un jeu Metal Gear restent dans les lignes de cet opus.',
    'Conserver en annexe optionnelle et identifier la source/édition pour toute tenue retenue.',
    'Aucun ajout automatique au décompte des manques obligatoires CQC.',
    '02_ROSTER_COSTUMES.md', 'bonus_hors_coeur')
add('LOT-42', 'P1', 'Recette de fidélité', 'Chaque livraison officielle ou originale',
    'Les flags approved/verified et routes présentes ne certifient pas une comparaison visuelle 1:1.',
    'Dossier de référence, vues nécessaires, captures du rendu, séquence chronométrée, différences acceptées et décision de réception.',
    'Séparer preuve d’existence, fidélité de dessin, adaptation des timings et validation du combat ; aucune certification implicite.',
    '01_METHODE_ET_INVENTAIRE.md', 'contrat_reception')


out = ROOT / 'data'
out.mkdir(exist_ok=True)
(out / 'priorites.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n')
with (out / 'priorites.csv').open('w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0]), lineterminator='\n')
    writer.writeheader()
    writer.writerows(rows)

lines = ['# 06 — Priorités et lots de production', '',
         '**42 lots de coordination** relient les inventaires détaillés. Ils ne s’ajoutent pas aux personnages, stages, costumes ou animations comptés ailleurs. Aucun délai ni charge artificielle n’est inventé : la volumétrie de dessins dépend des références retenues et des séquences validées.', '',
         '## Ordre conseillé', '',
         '- **P1 : rendre les preuves et le contenu existant cohérents.** Registres, six attentes explicites P41, gestes, contacts, grandes machines et recette 1:1.',
         '- **P2 : achever les parcours.** Histoires, illustrations, présentation de combat, lieux exacts, audio, contrôles et mesures sur appareils.',
         '- **P3 : étendre la couverture officielle.** Personnages secondaires/tertiaires, costumes, éditions et stages supplémentaires, après confirmation des sources.',
         '- **P4 : poursuivre les familles originales CQC.** Concepts proposés et couverture Rétro/Gala, avec critères propres.',
         '- **OPTION : décision produit distincte.** Réseau et crossovers périphériques ne bloquent pas le cœur de l’audit.', '',
         'Les numéros de ce chapitre expriment l’ordre GLOBAL de production proposé, pas une gravité de panne. Les P1/P2 des catalogues thématiques sont des priorités À L’INTÉRIEUR DU DOMAINE : une tenue P1 de son catalogue peut être réalisée dans la vague globale P3. Ces deux axes ne s’additionnent pas. Un élément « à vérifier » n’est pas un bogue reproduit. Les tableaux thématiques restent la référence pour les détails et les exceptions.', '',
         '| Lot | Priorité | Domaine et périmètre | Livrable attendu |',
         '|---|---|---|---|']
for r in rows:
    lines.append(f"| [{r['id']}](#{r['id'].lower()}) | {r['priorite']} | {r['domaine']} — {r['perimetre']} | {r['livraison']} |")
lines += ['', '## Fiches de réception', '']
for r in rows:
    lines += [f"<a id=\"{r['id'].lower()}\"></a>", f"### {r['id']} — {r['domaine']}", '',
              f"**{r['priorite']} · {r['perimetre']} · {r['nature']}**", '',
              f"**Constat.** {r['constat']}", '', f"**Livraison.** {r['livraison']}", '',
              f"**Réception.** {r['critere_reception']}", '',
              '**Détail.** ' + ' · '.join(f'[{x}]({x})' for x in r['preuves'].split('; ')), '']
(ROOT / '06_PRIORITES_ET_LOTS.md').write_text('\n'.join(lines).rstrip() + '\n')
print(json.dumps({'lots': len(rows), 'output': str(out / 'priorites.csv')}, ensure_ascii=False))
