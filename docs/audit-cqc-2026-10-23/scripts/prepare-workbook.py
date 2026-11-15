#!/usr/bin/env python3
"""Prépare les tableaux lisibles du classeur ; les CSV/JSON gardent les données brutes."""
import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SHA = 'ba4e30a09e9e95727b75a665e7b6ab07d9941aea'
BASE = f'https://github.com/darknigthmare/shadow-codec-ops/blob/{SHA}/'
AUDIT = 'https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-audit-complet-2026-10-23/docs/audit-cqc-2026-10-23/'


def csvread(name):
    with (ROOT / name).open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def jsread(name):
    return json.loads((ROOT / name).read_text())


def nice(value):
    if value is None:
        return ''
    if isinstance(value, bool):
        return 'Oui' if value else 'Non'
    if isinstance(value, list):
        return '\n'.join(nice(x) for x in value)
    if isinstance(value, dict):
        return '; '.join(f'{k} : {nice(v)}' for k, v in value.items())
    if isinstance(value, str) and value[:1] in '[{':
        try:
            return nice(json.loads(value))
        except ValueError:
            pass
    return value


sources02 = jsread('02_sources_roster_costumes.json')
sources03 = jsread('03_sources.json')
urls = {x['id']: x['url'] for x in sources02 + sources03}


def sources_for(row):
    if row.get('sources'):
        return nice(row['sources'])
    ids = row.get('source_ids', [])
    if isinstance(ids, str):
        try:
            ids = json.loads(ids)
        except ValueError:
            ids = [ids]
    return '\n'.join(urls.get(x, x) for x in ids)


tabs = []


def tab(name, title, subtitle, source, rows, columns):
    """columns = (clé ou fonction, titre, largeur Excel, numérique facultatif)."""
    matrix = []
    for row in rows:
        out = []
        for spec in columns:
            value = spec[0](row) if callable(spec[0]) else row.get(spec[0], '')
            if len(spec) > 3 and spec[3] == 'number' and value not in ('', None):
                value = float(value)
                if value.is_integer():
                    value = int(value)
            out.append(nice(value))
        matrix.append(out)
    tabs.append(dict(name=name, title=title, subtitle=subtitle, source=source,
                     headers=[x[1] for x in columns], widths=[x[2] for x in columns],
                     numeric=[i for i, x in enumerate(columns) if len(x) > 3 and x[3] == 'number'], rows=matrix))


tab('Priorités', 'Lots de production', '42 lots de coordination ; ils ne s’ajoutent pas aux quantités des inventaires. P1 à P4 : ordre proposé ; OPTION : décision produit.',
    '06_PRIORITES_ET_LOTS.md', jsread('data/priorites.json'), [
        ('id', 'Lot', 13), ('priorite', 'Priorité globale', 17), ('domaine', 'Domaine', 30), ('perimetre', 'Périmètre', 44),
        ('nature', 'Nature du constat', 27), ('constat', 'Constat', 66), ('livraison', 'Livraison attendue', 76),
        ('critere_reception', 'Critère de réception', 76), ('preuves', 'Détail dans le dossier', 52), ('statut', 'Suivi', 16)])

fighters = jsread('data/animation_fighters.json')['fighters']
af = {x['uid']: x for x in fighters}
roster = csvread('02_roster_present.csv')
for row in roster:
    row.update({f'anim_{k}': v for k, v in af[row['uid']].items()})
tab('Roster', '380 profils actifs', 'Une ligne est un profil jouable ; les incarnations, alias, équipements et machines ne sont pas des personnes uniques.',
    '02_roster_present.csv', roster, [
        ('uid', 'UID', 33), ('nom_audit', 'Identité de référence', 42), ('opus_runtime', 'Opus / groupe', 30),
        ('type_compte', 'Type de profil', 25), ('alias_de', 'Relation / alias', 32), ('incarnation_declaree', 'Incarnation déclarée', 72),
        ('costumes_alternatifs_declares', 'Alternatives déclarées', 18, 'number'), ('anim_archetype', 'Archétype animation', 24),
        ('anim_groupes_partages', 'Groupes d’images partagés', 55), ('anim_actions_absentes_du_catalogue', 'Groupes absents du catalogue standard', 35),
        ('anim_regions_natives_distinctes', 'Régions natives distinctes', 20, 'number'), ('anim_route_machine', 'Route machine', 18),
        ('anim_statut', 'Limite de preuve', 57), ('source', 'Source', 65)])
tab('Roster à compléter', 'Personnages et variantes à traiter', '87 tâches : absences, variantes, archétypes, PNJ et dossiers ; ce total n’est pas un nombre de nouveaux personnages.',
    '02_roster_lacunes.csv', csvread('02_roster_lacunes.csv'), [
        ('id', 'Référence', 17), ('nom', 'Personnage / groupe', 42), ('jeu', 'Jeu', 28), ('niveau', 'Importance', 16),
        ('usage_recommande', 'Usage proposé', 30), ('priorite', 'Priorité du domaine', 21), ('statut', 'État constaté', 48),
        ('description_reference', 'Référence et distinctions', 78), ('travail_restant', 'Travail restant', 90),
        ('uid_lie', 'UID déjà lié', 33), (sources_for, 'Sources', 74)])
tab('Costumes présents', '217 alternatives enregistrées', 'Union dédupliquée des options chargées et de l’index différé ; hors original. Les liens entre apparences ne sont pas des corps neufs.',
    '02_costumes_presents.csv', csvread('02_costumes_presents.csv'), [
        ('uid', 'UID', 33), ('id', 'ID de costume', 26), ('label', 'Présentation', 36), ('famille', 'Famille', 20),
        ('nature', 'Nature', 28), ('origine_registre', 'Registre d’origine', 26), ('canon_atteste', 'Canon attesté dans la donnée', 23),
        ('original_cqc', 'Original CQC', 20), ('asset_paths', 'Ressources déclarées', 85), ('validation', 'Limite de validation', 62),
        ('sources', 'Sources', 105)])
tab('Références costumes', 'Costumes officiels et références', '315 lignes de référence : tenues, corps, accessoires, états et lots modulaires. Filtrer le statut avant de planifier une production.',
    '02_costumes_cibles.csv', csvread('02_costumes_cibles.csv'), [
        ('id', 'Référence', 15), ('nom', 'Tenue / état / accessoire', 42), ('jeu', 'Jeu / édition', 28), ('uid_cible', 'UID cible', 33),
        ('type', 'Type', 29), ('priorite', 'Priorité du domaine', 21), ('statut', 'État constaté', 48),
        ('costume_id_present', 'Option déjà présente', 28), ('specification_visuelle', 'Spécification visuelle', 88),
        ('specification_animation', 'Spécification des mouvements', 90), ('conditions', 'Conditions et réserves', 74),
        (sources_for, 'Sources', 72)])
tab('Créations CQC', '20 concepts originaux proposés', 'Propositions à produire ; fidélité future à la fiche concept, sans prétention d’apparition officielle dans un jeu Metal Gear.',
    '02_costumes_originaux_proposes.csv', csvread('02_costumes_originaux_proposes.csv'), [
        ('id', 'Concept', 15), ('nom', 'Nom proposé', 35), ('uid', 'UID', 33), ('famille', 'Famille', 22),
        ('statut', 'Statut', 28), ('design', 'Design complet', 88), ('animation_complete_delta', 'Changements d’animation', 96),
        ('contraintes', 'Contraintes d’identité', 78), ('reference_des_exemples', 'Exemples existants', 72), ('certification', 'Critère de fidélité', 65)])
tab('Stages', '124 stages du catalogue partagé', 'Présence et métadonnées observées ; géométrie CQC et validation artistique sont distinctes. Port Area dédié figure dans Modules dédiés.',
    '03_stages_existants.csv', csvread('03_stages_existants.csv'), [
        ('id', 'ID de stage', 40), ('nom', 'Stage', 43), ('opus_groupe', 'Opus', 25), ('incarnation', 'Édition / moment', 70),
        ('review_status', 'Revue héritée', 24), ('geometrie_existante', 'Géométrie CQC déclarée', 65), ('aliases', 'Alias', 50),
        ('description_cible_specifique', 'Géométrie et repères à respecter', 95), ('animation_cible_specifique', 'Animation de ce stage', 95),
        ('spec_animation_ambiante', 'Ambiance et éléments mobiles', 85), ('travail_restant', 'Travail et vérification', 95),
        ('danger_optionnel', 'Dangers et mode fidèle', 80), ('urls_sources_existantes', 'Sources déjà déclarées', 75)])
tab('Stages à compléter', 'Lieux et éditions complémentaires', '113 lots : scènes dédiées, ensembles à ventiler et références à confirmer ; pas 113 absences simples et certifiées.',
    '03_stages_a_completer.csv', csvread('03_stages_a_completer.csv'), [
        ('id', 'Lot', 37), ('nom', 'Lieu / groupe', 47), ('opus', 'Opus', 27), ('priorite', 'Priorité du domaine', 21), ('statut', 'État constaté', 52),
        ('categorie', 'Nature', 43), ('plan_de_duel_a_etablir', 'Plan de duel', 75), ('plans_et_reperes_a_relever', 'Plans et repères', 85),
        ('animation_a_specifier', 'Animation à spécifier', 85), ('regles', 'Règles et adaptation', 90),
        ('preuve_absence', 'Portée du constat', 78), (sources_for, 'Sources', 70)])
tab('Boss et rencontres', '33 dossiers Arsenal', 'Les règles, HP et durées sont ceux de CQC. Chaque fiche distingue adaptation actuelle et rencontre de référence.',
    '03_boss_fiches.csv', csvread('03_boss_fiches.csv'), [
        ('id', 'ID', 23), ('nom', 'Machine / rencontre', 40), ('opus', 'Opus', 29), ('classification', 'Nature', 34),
        ('scene_native_actuelle', 'Scène actuelle', 43), ('regle_code_actuelle', 'Règle CQC actuelle', 64),
        ('silhouette_et_decoupe', 'Silhouette et pièces', 90), ('locomotion_et_appuis', 'Locomotion et appuis', 90),
        ('attaques_a_animer', 'Attaques', 100), ('phases_et_destruction', 'Phases et destruction', 95),
        ('ecart_specifique', 'Écart de fidélité', 95), ('collision_echelle', 'Échelle et collision', 90), (sources_for, 'Sources', 72)])
tab('Machines à compléter', 'Machines, variantes et modules à compléter', '54 lots distincts : absence de dossier, rig, adaptation, variante ou concept. Lire le statut de chaque ligne.',
    '03_machines_a_completer.csv', csvread('03_machines_a_completer.csv'), [
        ('id', 'Lot', 35), ('nom', 'Machine / groupe', 45), ('opus', 'Opus', 31), ('priorite', 'Priorité du domaine', 21), ('statut', 'État constaté', 55),
        ('silhouette_a_relever', 'Silhouette de référence', 85), ('animations_a_produire', 'Animations à produire', 100),
        ('ecart_ou_limite', 'Écart et limite', 90), (sources_for, 'Sources', 72)])
tab('Rigs', '64 définitions techniques partagées', 'Un rig n’est pas un boss unique. Les pièces, pivots, rectangles et canaux complets restent dans le JSON et le CSV liés.',
    '03_rigs_existants.json', csvread('03_rigs_existants.csv'), [
        ('id', 'ID du rig', 42), ('edition', 'Édition / usage', 82), ('nombre_pieces', 'Pièces', 13, 'number'),
        ('rencontres_arsenal', 'Dossiers Arsenal liés', 32), ('combattants_lies', 'Profils liés', 45),
        ('canaux_animation_declares', 'Canaux déclarés', 72), ('qualifications_existantes', 'Limites déjà documentées', 105),
        ('travail_restant', 'Travail de réception', 95), ('preuve_code_origine', 'Sources du code', 80),
        (lambda r: AUDIT + '03_rigs_existants.json', 'Pièces et données complètes', 75)])
tab('Modules dédiés', 'Cinq modules spécialisés', 'Les modules privés complètent les registres partagés ; ne pas les annoncer absents à partir des seuls comptes 124/64.',
    '03_modules_separes.csv', csvread('03_modules_separes.csv'), [
        ('id', 'ID', 39), ('nom', 'Module', 42), ('statut', 'État', 46), ('edition', 'Édition', 60),
        ('existant', 'Déjà présent', 95), ('animation_cible', 'Animation cible', 100), ('ecart', 'Écarts documentés', 100),
        ('preuve_code', 'Source du code', 85)])

states = []
for row in fighters:
    for state in row['etats_a_produire']:
        states.append(dict(uid=row['uid'], personnage=row['personnage'], opus=row['opus'],
                           etat=state['state'], description=state['description'], incarnation=row['incarnation_native'],
                           statut='Spécification de production CQC ; comparaison avec la source requise.',
                           source=BASE + 'public/cqc/modules/unified-versus-v055.html'))
tab('Poses et transitions', '3 420 fiches d’états et transitions', 'Neuf groupes d’états pour chacun des 380 profils. Le contrat détaillé du chapitre 04 décompose les poses à livrer.',
    'data/animation_fighters.json', states, [
        ('uid', 'UID', 33), ('personnage', 'Profil', 38), ('opus', 'Opus / groupe', 30), ('etat', 'Groupe d’états', 27),
        ('description', 'Description de production', 110), ('incarnation', 'Incarnation déclarée', 80),
        ('statut', 'Portée', 60), ('source', 'Source moteur', 68)])
tab('Techniques', '3 800 techniques décrites', '10 techniques par profil. Les ticks sont des paramètres CQC ; les groupes d’images partagés et la preuve du mapping sont explicités.',
    'data/animation_moves.csv', csvread('data/animation_moves.csv'), [
        ('uid', 'UID', 33), ('personnage', 'Profil', 38), ('opus', 'Opus / groupe', 30), ('slot', 'Commande', 19),
        ('technique', 'Technique', 38), ('type', 'Type', 20), ('tag', 'Famille', 19),
        ('anticipation_ticks_cqc', 'Anticipation (ticks CQC)', 20, 'number'), ('actif_ticks_cqc', 'Actif (ticks CQC)', 18, 'number'),
        ('recuperation_ticks_cqc', 'Récupération (ticks CQC)', 22, 'number'), ('groupe_declare', 'Groupe d’images', 22),
        ('regions_direction_principale', 'Régions face principale', 20, 'number'), ('regions_direction_opposee', 'Régions face opposée', 20, 'number'),
        ('preparation_proposee', 'Anticipation proposée', 85), ('action_proposee', 'Action proposée', 90),
        ('retour_propose', 'Récupération proposée', 75), ('critere_acceptation', 'Critère de réception et contre-jeu', 105),
        ('preuve_mapping', 'Preuve du mapping', 27), ('source_code', 'Source moteur', 70)])
finishers = csvread('data/animation_finishers.csv')
for row in finishers:
    fragments = re.split(r'Plan [1-5]\s*:', row['storyboard_propose'])[1:]
    assert len(fragments) == 5, row['finisher_id']
    for i, fragment in enumerate(fragments, 1):
        row[f'plan_{i}'] = fragment.strip()
tab('Finishers', '1 520 storyboards de finishers', 'Quatre fiches par profil ; les séquences en cinq plans sont des propositions de production, pas 1 520 films uniques déjà dessinés.',
    'data/animation_finishers.csv', finishers, [
        ('uid', 'UID', 33), ('personnage', 'Profil', 38), ('finisher_id', 'ID', 43), ('titre_existant', 'Titre existant', 45),
        ('famille', 'Famille', 22), ('ton', 'Ton', 19), ('duree_ticks_cqc', 'Durée (ticks CQC)', 19, 'number'),
        ('phases_existantes', 'Phases du moteur', 48), ('plan_1', 'Plan 1 — préparation', 83), ('plan_2', 'Plan 2 — engagement', 83),
        ('plan_3', 'Plan 3 — action', 92), ('plan_4', 'Plan 4 — retombée', 83), ('plan_5', 'Plan 5 — signature', 83),
        ('manque', 'Travail restant', 75), ('source', 'Source moteur', 70)])
variants = csvread('data/animation_variants.csv')
# Les champs de ce tableau sont volontairement conservés tels que publiés par l’inventaire.
varcols = [(k, k.replace('_', ' ').capitalize(), 34 if k in ('uid', 'costume_id') else 65) for k in variants[0]]
tab('Variantes', '597 couples acteur et tenue', '380 originaux et 217 alternatives ; contrôler les silhouettes et les accessoires à chaque action, dans les deux directions.',
    'data/animation_variants.csv', variants, varcols)
tab('Histoires', 'Couverture des Chroniques', '380 profils rapprochés de 354 histoires. Peinture déclarée et inspection visuelle sont des preuves différentes.',
    'data/narration_profils.csv', csvread('data/narration_profils.csv'), [
        ('uid', 'UID', 33), ('personnage', 'Profil', 38), ('opus', 'Opus', 33), ('statut', 'État', 43),
        ('histoire', 'Histoire', 46), ('intro_scenes', 'Scènes intro', 16, 'number'), ('outro_scenes', 'Scènes épilogue', 18, 'number'),
        ('scenes_peintes', 'Peintures déclarées', 19, 'number'), ('compositions', 'Compositions', 18, 'number'),
        ('duels', 'Duels', 12, 'number'), ('nature_recit', 'Nature du récit', 28), ('action', 'Travail de réception', 85),
        ('preuve', 'Source', 72)])
tab('Illustrations', '2 124 scènes narratives existantes', '486 peintures complètes déclarées et 1 638 compositions. Les 156 scènes à créer pour 26 nouvelles histoires ne sont pas incluses ici.',
    'data/narration_scenes.csv', csvread('data/narration_scenes.csv'), [
        ('scene_id', 'ID scène', 46), ('personnage', 'Profil', 38), ('opus', 'Opus', 32), ('phase', 'Phase', 17),
        ('scene', 'Scène', 12, 'number'), ('titre', 'Titre', 45), ('lieu', 'Lieu', 44), ('camera', 'Caméra', 18),
        ('accessoire', 'Accessoire', 25), ('cle_image', 'Clé image', 45), ('image_complete_declaree', 'Peinture déclarée', 20),
        ('action', 'Travail à effectuer', 92), ('preuve', 'Source', 68)])
tab('Politique styles', 'Politique Rétro / Nextgen / Gala', '1 125 décisions sur 375 UID. La couverture nextgen réutilise surtout le style original ; cinq UID actifs restent hors de cette politique.',
    'data/politique_costumes_375.json', jsread('data/politique_costumes_375.json'), [
        ('jobID', 'Décision', 43), ('uid', 'UID', 33), ('family', 'Famille', 18), ('status', 'Statut', 26),
        ('costumeID', 'Option cible', 27), ('sourceCover', 'Nature de couverture', 43), ('newArtRequired', 'Nouvel art demandé', 23),
        (lambda r: BASE + 'public/cqc/src/cqc-pass21-source-aware-wardrobe-policy.js', 'Source', 78)])
source_rows = []
for prefix, data in [('RC', sources02), ('SM', sources03)]:
    for r in data:
        source_rows.append(dict(id=prefix + '/' + r['id'], titre=r['titre'], type=r.get('nature', r.get('type', '')),
                                portee=r['portee'], url=r['url'], date=r.get('consulte_le', r.get('date_consultation', ''))))
tab('Sources', 'Sources et portée de chaque référence', '109 fiches de provenance, certaines URL réutilisées pour plusieurs domaines. Une source d’existence ne certifie pas toutes les poses cachées.',
    '02_sources_roster_costumes.json; 03_sources.json', source_rows, [
        ('id', 'Référence', 26), ('titre', 'Titre', 65), ('type', 'Nature', 27), ('portee', 'Ce que la source établit', 100),
        ('url', 'URL', 100), ('date', 'Consultation', 20)])

result = dict(source_commit=SHA, audit_url=AUDIT, generated_from='CSV et JSON de cet audit, aucune extraction de sprite effectuée', tabs=tabs)
path = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/cqc-workbook-input.json')
path.write_text(json.dumps(result, ensure_ascii=False))
print(json.dumps({'output': str(path), 'tabs': len(tabs), 'rows': sum(len(x['rows']) for x in tabs),
                  'counts': {x['name']: len(x['rows']) for x in tabs}}, ensure_ascii=False))
