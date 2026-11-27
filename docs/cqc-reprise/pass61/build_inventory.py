#!/usr/bin/env python3
"""Join all 277 audit scopes to actual selected sources, without certifying fidelity."""
from collections import Counter, defaultdict
from pathlib import Path
import json
from reconcile import HERE, ROOT, BRANCH, REPOSITORY, read, write

LABELS = {'characters': 'Personnages et profils', 'costumes': 'Costumes ciblés',
          'stages': 'Stages', 'machines': 'Machines', 'projectiles': 'Projectiles et VFX'}
KIND_LABELS = {'character': 'Personnages', 'costume': 'Costumes', 'stage': 'Stages',
               'machine': 'Machines', 'vfx': 'Effets visuels'}

# Missing subscopes and reference qualifications, kept separate from source presence.
SCOPE_NOTES = {
    'stage:mgs3_zaozyorje_wig': 'Zaozyorje West / ravin seulement. Lac, embarquement et intérieur du WIG restent distincts.',
    'stage:pw_pw_hangar': 'Approche et galeries cargo. La baie centrale d’assemblage et la sortie de confrontation ne sont pas établies par une référence complète.',
    'stage:acid_ruins': 'Ruins Lower 3A seulement. Ruines hautes et forêt restent sans sources dédiées dans ce lot.',
    'stage:acid_far': 'Chambre KODOQUE seulement. Entrée/extérieurs FAR et segment intérieur Teliko non couverts.',
    'stage:acid2_prototype': 'Un étage représentatif du prototype ; les quatre étages du périmètre ne sont pas tous produits.',
    'stage:acid2_tests': 'Trois sources distinctes : Harab Serap, Golab et Chaigidiel. La géométrie est adaptée au cadrage latéral.',
    'stage:mpo_airport': 'Zone cargo du terminal ; piste et ensemble des bâtiments non couverts.',
    'stage:mpo_guesthouse': 'Façade et passage extérieur ; intérieur non couvert.',
    'stage:mpo_hospital': 'Deux sources : salle de soins Hospital et salle de commande Research Lab. Le complexe complet n’est pas relevé.',
    'stage:mgs4_park': 'Millennium Park seulement ; Crescent Meridian reste distinct et non couvert.',
    'stage:mgs4_powerstation': 'Centrale seulement ; Cove Valley Village n’est pas couvert.',
    'stage:mgs4_marketplace': 'Allée du marché ; poursuite Stryker complète non reconstituée.',
    'stage:mgs4_nomad': 'Intérieur Nomad d’après des vues partielles. Proportions et raccords nécessitent un contrôle supplémentaire.',
    'stage:mgs4_gw_server': 'Référence visuelle complète non récupérée : interprétation de descriptions sourcées. Contrôle visuel prioritaire.',
    'stage:tpp_mission00_route': 'Segment forestier de la fuite seulement ; cimetière et parcours complet non représentés.',
    'stage:tpp_lamar': 'Cour et façade extérieure ; circulations et étages intérieurs non couverts.',
    'stage:tpp_fob': 'Une configuration de plateforme seulement ; les niveaux, couleurs et configurations restent distincts.',
    'stage:tpp_quarantine': 'Une salle industrielle ; ensemble de l’installation non relevé.',
    'stage:mgr_wm_interior': 'Secteur des bureaux du 20e étage. Hall, ascenseurs et jardin japonais ne sont pas couverts par cette image.',
    'stage:mgr_guadalajara': 'Deux sources : égouts et atelier du laboratoire. Chambre biologique, arène GRAD et transitions restent distinctes.',
    'stage:mgr_pakistan_base': 'Hangar de la base, architecture vide ; aéronefs omis. Extérieurs et arène EXCELSUS distincts.',
    'stage:survive_final_defense': 'Périmètre représentatif d’une partie. Placement des défenses variable selon la construction.',
    'stage:mobile_vr_final': 'Combat final du Commander sur le REX virtuel ; les exercices VR après le générique constituent un autre ensemble.',
    'vfx:smoke-cloud': 'Une image de fumée grise avec alpha. Aucune animation, durée ni frame canonique 1:1 n’est certifiée.',
}

def ids(entry):
    value = entry.get('workIds', entry.get('workId', []))
    return value if isinstance(value, list) else [value]

def existing_sources(entry):
    values = []
    if isinstance(entry.get('source'), dict):
        values.append(entry['source'])
    values += [x for x in entry.get('sources', []) if isinstance(x, dict) and x.get('path')]
    return values

def clean(value):
    return str(value or '').replace('|', '\\|').replace('\n', ' ')

def source_links(row):
    links = [f"[{clean(x['label'])}](../../../{x['path']})" for x in row['candidates']]
    if not links:
        links = [f"[Source {i+1}](../../../{x['path']})" for i, x in enumerate(row['existingSources'])]
    return '<br>'.join(links) or ('Incarnation existante séparée' if row['presenceClass'] == 'existing_alias' else '—')

def build():
    baseline = read(HERE / 'audit/baseline-reconciled.json')
    delivery = read(HERE / 'delivery-manifest.json')
    roster = {x['id']: x for x in read(HERE / 'audit/roster-qualification.json')['rows']}
    selected = [x for x in delivery['assets'] if x['pass'] == 61]
    candidates = defaultdict(list)
    known = {x['id'] for rows in baseline['categories'].values() for x in rows}
    assert not set(SCOPE_NOTES) - known, 'Unknown work ID in scope notes'
    for asset in selected:
        for work_id in asset['workIds']:
            assert work_id in known, f'Unknown work ID: {work_id}'
            candidates[work_id].append(asset)
    reviews = {}
    for name in ['projectiles-reference-review.json', 'machines-blocked.json', 'costumes.json', 'personnages-extra.json']:
        data = read(HERE / 'batches' / name)
        entries = data.get('entries', []) if name not in ('costumes.json', 'personnages-extra.json') else data.get('unresolved', [])
        for entry in entries:
            for work_id in ids(entry):
                reviews[work_id] = entry
    rows, category_counts = [], {}
    for category, entries in baseline['categories'].items():
        for entry in entries:
            work_id, before = entry['id'], entry['status']
            sources = candidates.get(work_id, [])
            reason = entry.get('note', entry.get('scopeWarning', ''))
            next_evidence = entry.get('nextWork', entry.get('requiredEvidence', entry.get('requiredScene', '')))
            if sources:
                status, presence = 'Source candidate P61 — revue requise', 'p61_candidate'
                reason = 'Source statique dédiée produite ; identité détaillée, proportions, surfaces cachées et fidélité 1:1 restent à valider.'
                next_evidence = 'Comparer aux captures/modèles natifs ; compléter les portions du périmètre manquantes avant toute admission au jeu.'
            elif before == 'era_alias_to_separate_existing_original':
                status, presence = 'Alias corrigé vers une incarnation existante', 'existing_alias'
                reason = entry['note']
            elif before.startswith('source_present') or before in ('existing_body_source_rig_or_variant_work_remains', 'source_exists_in_sideops_cqc_reuse_needs_review'):
                status, presence = 'Source antérieure présente — non recertifiée', 'existing_source'
            elif before == 'historical_generation_hold':
                status, presence = 'Blocage historique conservé', 'unresolved'
                reason = 'Refus de génération antérieur documenté. Aucune nouvelle tentative sous alias. ' + entry.get('note', '')
            elif entry.get('workScope') == 'edition_or_mode_batch_needs_breakdown':
                status, presence = 'Lot de scènes ou contrôle d’édition à décomposer', 'unresolved'
                reason = 'Cette ligne n’est pas une carte unique. Il faut établir une liste finie de scènes/missions et leurs références propres.'
            elif before == 'concept_or_cancelled_project_scope_requires_definition':
                status, presence = 'Concept/projet annulé — périmètre à définir', 'unresolved'
                reason = entry.get('scopeLimit', entry.get('note', 'Aucun boss finalisé correspondant dans le jeu commercialisé.'))
            else:
                status, presence = 'Référence ou périmètre non établi', 'unresolved'
            if category == 'characters':
                qualified = roster[work_id]
                reason = qualified.get('reason', reason)
                next_evidence = qualified.get('requiredNextEvidence', next_evidence)
                if not sources and presence == 'unresolved':
                    translations = {
                        'actual_service_refusal': 'Génération refusée — aucun PNG',
                        'reference_insufficient': 'Référence individuelle insuffisante',
                        'identity_and_reference_insufficient': 'Identité et référence insuffisantes',
                        'documentary_body_not_shown': 'Identité documentaire — corps de jeu non établi',
                        'group_not_one_body': 'Groupe/variantes à inventorier',
                        'portrait_not_full_body': 'Portrait établi — corps complet non établi',
                        'identity_and_edition_conflict': 'Conflit d’identité ou d’édition',
                        'group_and_reference_insufficient': 'Groupes à séparer et vues complètes requises',
                    }
                    status = translations.get(qualified.get('reasonClass'), {
                        'group_or_variant_inventory_incomplete': 'Groupe/variantes à inventorier',
                        'documentary_identity_visual_body_not_established': 'Identité documentaire — corps non établi',
                        'edition_or_identity_profile_needs_review': 'Profil d’édition ou d’identité à rapprocher',
                    }.get(before, status))
            if work_id in reviews and not sources:
                review = reviews[work_id]
                reason = review.get('finding', review.get('reason', review.get('generationDecision', reason)))
                next_evidence = review.get('neededEvidence', review.get('requiredNextEvidence', next_evidence))
                if category == 'projectiles':
                    status = 'Corps de projectile : référence géométrique insuffisante'
                if work_id == 'machine:rex_tts':
                    status = 'Génération refusée — aucun PNG'
                    reason = 'Refus effectif du contrôle automatique de génération, catégorie other. Aucun PNG retourné ; aucune relance après le refus.'
            if work_id == 'machine:zeke_configurations':
                status = 'Configurations ZEKE à décomposer'
                reason = 'Ensemble de configurations sans matrice finie validée. Une image générique de ZEKE ne clôt pas toutes les configurations.'
            if work_id == 'costume:core__amanda_pw:official--injured-recovery':
                status = 'Tenue exacte non établie par les références'
            scope_note = SCOPE_NOTES.get(work_id, '')
            if sources and any('shagohod' in x['id'] for x in sources):
                scope_note = 'Module avant détaché du Shagohod Delta seulement ; ensemble arrière / véhicule complet non couvert.'
            rows.append({
                'id': work_id, 'category': category, 'label': entry['label'], 'episode': entry.get('episode', entry.get('incarnation', '')),
                'baselineStatus': before, 'status': status, 'presenceClass': presence,
                'candidates': [{k: x[k] for k in ['id', 'label', 'path', 'manifest', 'gitBlobSha', 'referenceURLs']} for x in sources],
                'existingSources': existing_sources(entry), 'scopeNote': scope_note,
                'reason': reason, 'nextEvidenceOrWork': next_evidence,
                'absolute1to1CertifiedByP61': False, 'runtimeIntegratedByP61': False,
                'baselineEvidence': 'audit/baseline-reconciled.json',
                'qualificationEvidence': 'audit/roster-qualification.json' if category == 'characters' else None,
            })
        chosen = [x for x in rows if x['category'] == category]
        count = Counter(x['presenceClass'] for x in chosen)
        category_counts[category] = {'total': len(chosen), 'existing': count['existing_source'],
                                     'existingAlias': count['existing_alias'], 'p61Candidate': count['p61_candidate'],
                                     'unresolved': count['unresolved']}
    assert len(rows) == 277 and len({x['id'] for x in rows}) == 277
    result = {'schema': 'cqc.p61.reconciled-inventory.v1', 'asOf': '2026-11-25',
              'baselineCommit': baseline['pinnedCommit'], 'repository': REPOSITORY, 'branch': BRANCH,
              'interpretation': 'Counts are historical scopes, not a whole-franchise completion percentage or a number of individual missing bodies.',
              'counts': category_counts, 'sourceFileCounts': delivery['counts'], 'rows': rows}
    write(HERE / 'inventory.json', result)
    lines = ['# Inventaire complet des sources et des manques — P61', '',
             '**277 lignes rapprochées des fichiers effectivement présents ou produits.** Une source candidate ne certifie pas la fidélité 1:1, la couverture intégrale d’un niveau, l’animation ou l’intégration au combat.', '',
             'La liste des 172 images sélectionnées est dans [la galerie](GALERIE.md). Le [manifeste de livraison](delivery-manifest.json) conserve les SHA et les références de chaque PNG. [Baseline figée](audit/baseline-reconciled.json) · [qualification des personnages](audit/roster-qualification.md).', '',
             '| Catégorie | Lignes | Sources antérieures | Alias résolu | Avec candidat P61 | Sans correspondance dédiée |',
             '|---|---:|---:|---:|---:|---:|']
    for cat, count in category_counts.items():
        lines.append(f"| {LABELS[cat]} | {count['total']} | {count['existing']} | {count['existingAlias']} | {count['p61Candidate']} | {count['unresolved']} |")
    lines += ['', 'Le total inclut une retenue historique de concept Raven hors des catalogues sélectionnés. Les nombres de groupes, profils d’édition et identités documentaires ne sont pas des nombres de corps individuels à dessiner.', '']
    for cat in LABELS:
        lines += ['## ' + LABELS[cat], '', '| ID et élément | État | Source(s) | Portée réelle / motif / suite |', '|---|---|---|---|']
        for row in rows:
            if row['category'] != cat:
                continue
            detail = ' '.join(x for x in [row['scopeNote'], row['reason'], ('Suite : ' + row['nextEvidenceOrWork']) if row['presenceClass'] == 'unresolved' else ''] if x)
            lines.append(f"| `{row['id']}`<br>{clean(row['label'])} | {clean(row['status'])} | {source_links(row)} | {clean(detail)} |")
        lines.append('')
    (HERE / 'INVENTAIRE.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    return result

if __name__ == '__main__':
    result = build()
    print(json.dumps(result['counts'], ensure_ascii=False))
