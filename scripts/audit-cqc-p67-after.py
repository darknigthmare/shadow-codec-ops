#!/usr/bin/env python3
"""Report edition-specific coverage after the verified P67 Atlas extension.

Reads frozen delivery/bible/coverage-before plus verification evidence.
Never edits the delivery, bible, historical inventory or runtime.
"""
import collections
import datetime
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PASS = "docs/cqc-reprise/pass67/"
BASE = "5d7c6c5187f3906ad1ead53706e83674750f1c34"
INPUTS = [
    PASS + "coverage-before.json",
    PASS + "delivery-manifest.json",
    "docs/cqc-bible/asset-associations-p67.json",
    "public/cqc/data/cqc-p63-source-atlas.json",
    PASS + "p67-local-verification.json",
    PASS + "browser/verification.json",
]

# Remaining scopes come from the pinned inventory/qualifications and the
# reviewed asset reservations. These are work directions, not invented bodies.
REMAINING = {
    "mg_msx": "Autres gardes, palettes, poses et chiens d’Outer Heaven restent à inventorier. Le frère de Jennifer nécessite sprite, salle et dialogue identifiants ; le faux Dr Madnar exige une preuve de l’imposteur, sans réutiliser le vrai Madnar. Les Hind et Tank MSX déjà présents ne sont pas remplacés.",
    "mg_nes": "Le garde NES ajouté ne ferme pas le groupe partagé gardes/chiens et ne couvre pas les variantes MSX. Commander South / Vermon CaTaffy reste une identité de manuel localisé sans corps de jeu établi. Supercomputer et sa salle ont déjà des sources.",
    "mg2": "Une silhouette partagée des Four Horsemen ne prouve pas quatre identités visuelles différentes. Les enfants de Zanzibar restent un groupe à qualifier. Hind D existe comme candidat ; Metal Gear G / Gustav reste un concept abandonné dont le périmètre doit être défini.",
    "snakes_revenge": "La machine Metal Gear 2 et sa chambre ont déjà des sources. Aucun corps manquant supplémentaire n’est établi par les deux lignes P61 ; les profils compilés ne démontrent pas un inventaire complet de cette édition. Revue des sources et qualification individuelle restent nécessaires.",
    "mgs1": "Les deux Genome ajoutés représentent des vues d’infanterie légère et de troupe lourdement armée. Autres variantes, équipements et poses restent à vérifier ; NBC et arctique ont déjà des sources et sont conservés. Le profil Gray Fox Integral / VR se rapproche séparément. Le concept original Vulcan Raven reste sous blocage historique.",
    "twin_snakes": "Baker assis est un candidat de la scène du remake ; la référence laisse une partie des bras/attaches occultée. Campbell, Naomi, Mei Ling, Nastasha, Miller/Liquid, Donald Anderson/Decoy et Jim Houseman nécessitent toujours un rapprochement propre à TTS. Les secteurs restent à décomposer ; REX TTS demeure refusé, sans relance.",
    "vr_missions": "Gray Fox des missions Ninja reste une qualification Integral / VR, distincte de Revengeance. Les portées Genola/Gurlugon/Mech Genola sont partagées avec Substance : seul le candidat réellement attribué à cette édition compte ici. Les arènes et variantes natives restent à qualifier, sans transfert automatique de modèles MGS2.",
    "mgs2": "Un otage gris de Shell 1 ne représente pas tous les otages. Marine Tanker déjà candidat. Rose réelle/interface IA et Meryl Snake Tales exigent preuve d’identité et d’apparition ; l’IA ne devient pas un nouveau corps. Les arènes VR Substance et états de scène restent à décomposer.",
    "mgs3": "Le portrait GRU P67 appartient à Delta et n’ajoute aucun corps PS2. KGB, GRU et scientifiques PS2 restent partiels. Guy Savage PS2 doit être séparé de Delta ; Khrouchtchev reste documentation/voix sans corps natif établi. Les costumes EVA/Fear/Tatyana sous blocage historique sont conservés. Les sources PS2 déjà sélectionnées restent en revue.",
    "delta": "Le GRU à cagoule est strictement un portrait du haut du torse ; le corps inférieur n’est pas livré. Autres GRU, KGB, scientifiques et opérateurs FOX HUNT restent ouverts. Scènes propres à Delta, Snake vs Monkey et Snake vs Bomberman à décomposer. Les blocages EVA/Fear cybernétiques et Metal Gear End restent inchangés.",
    "snake_eater_3d": "Le profil Naked Snake 3DS demeure à rapprocher de captures et de son modèle propres à cette édition. Un corps PS2 ou Delta ne le qualifie pas automatiquement. Aucun nouveau fichier P67 ne ferme cette ligne.",
    "mpo": "Les cinq recrues P67 proviennent de Portable Ops Plus ; elles ne sont pas comptées comme corps MPO. Les groupes soviétiques, Ocelot Unit, personnel médical/scientifique et variantes régionales doivent être séparés par jeu, sexe et équipement. Les décors MPO déjà sélectionnés ne prouvent pas ces recrues.",
    "mpo_plus": "USSR Female A, USSR Male A, Ocelot Female A, Male Scientist A et Female Officer A donnent cinq variantes bornées. Les autres variantes, classes, soldats régionaux/promotionnels et invités restent à inventorier ; les previews extraites et leur build ne certifient pas tous les paramètres du jeu. Aucun groupe partagé MPO/Plus n’est clos.",
    "pw": "Un guérillero sandiniste est ajouté ; les autres membres FSLN et les classes Peace Sentinel restent ouverts. Sentinel Vest a été refusé par l’outil : aucun PNG, aucun nouvel essai. Hideo reste portrait sans corps complet établi ; configurations ZEKE et corps physiques des projectiles Box Tank sont à qualifier. Les costumes sous blocage historique restent inchangés.",
    "gz": "Le garde au poncho saluant est un portrait, avec poncho partiellement occulté et reconstruit. Le garde, le JCS, le prisonnier et Hideo existants restent conservés. Agent DoD et bonus Jamais Vu nécessitent une qualification d’identité/édition. Aucune fusion des XOF 1975 et de l’hôpital TPP 1984.",
    "tpp": "Le médecin Evangelos Constantinou est une vue de corps candidate ; l’infirmière est seulement un portrait. Autres patients/personnels, interprètes, cibles de missions, enfants, forces privées et Diamond Dogs restent des groupes ouverts. Queequeg demeure documentaire sans corps montré. Les petites références ne certifient ni les détails cachés ni tous les équipements.",
    "mgs4": "Deux rebelles du Moyen-Orient distincts sont représentés : manches courtes et tunique claire. Les autres rebelles de cette région, ceux d’Amérique du Sud, la résistance est-européenne, les PMC et Little John restent à qualifier. Les vues et costumes déjà présents d’Old Snake ne closent pas ces groupes.",
    "mgr": "Aucun nouvel ajout P67 ; les sources P61–P66 sont conservées avec leurs réserves. Soldats humains R-00, variantes, arènes VR DLC et pièces/équipements restent à qualifier. Le cyborg blindé P61 ainsi que Fragmentation Grenade, EM Grenade et Rocket Launcher P64 restent refusés. Les décors et accessoires ne prouvent pas un roster ou un kit complet.",
    "rising_proto": "Le projet initial MGS Rising reste un périmètre de concept/projet annulé à définir depuis des références propres. Il n’est pas assimilé à Revengeance. Aucun nouveau corps de jeu publié ni nouvelle complétude ne sont revendiqués.",
    "ghost_babel": "No. 4, Lieutenant Smith, John Parker, Steve Gardner, William Weah et le frère de Weasel restent six identités documentaires sans corps individuel établi. La portée partagée de contrôle d’édition Master Collection n’est pas une preuve de scènes manquantes ou complètes. Aucun corps n’est inventé à partir de ces noms.",
    "acid": "Aucun ajout P67. Harold Burton reste documentaire ; les gardes/mercenaires et Faux Flemming déjà ajoutés restent des candidats bornés. Ruins et les fragments FAR B3F/B4F/B5F ne constituent pas le plan complet des niveaux. Les gardes PSP AC!D ne couvrent pas SaintLogic AC!D 2.",
    "acid2": "Aucun ajout P67. Le personnel SaintLogic du groupe partagé reste sans candidat sélectionné propre à AC!D 2. Prototype KODOQUE, Test Subjects et fragments Research Block / Control Section / Communications Tower / Terminal / Residential Area restent à compléter. Conserver les réserves fortes de P66 sur Communications Tower et Terminal ; aucune salle ne ferme une mission entière.",
    "acid_mobile": "Les vignettes natives consultées confirment le jeu 2D mais les sprites sont trop petits pour qualifier palette, frame et équipement exacts. La version Java 3D nécessite une qualification distincte. Snake Mobile existe déjà ; aucun garde PSP n’est réétiqueté. Un candidat Mobile N-Gage ou Touch ne couvre pas cette branche.",
    "acid2_mobile": "Un profil compilé et des sprites historiques de Venus AC!D 2 Mobile existent. Aucune ligne P61 directement qualifiée ne fournit ici une liste de corps manquants : l’inventaire propre à cette édition reste à établir. L’absence de nouvelle sélection P67 ne signifie ni absence totale de sources ni univers complet.",
    "survive": "Aucun ajout P67. Les candidats Captain TGS 2017 ne couvrent pas tous les avatars finaux ; Harley Warren et Joel Marton restent documentaires. Les missions coopératives, variantes et rig de machines restent à compléter. Le Mortar physique, son projectile et l’alias historique crystal-grenade restent distincts. Les pièges/accessoires P64–P66 ne constituent pas des systèmes jouables complets.",
    "mobile": "Un garde olive N-Gage est ajouté, dans son édition précise. Le groupe des ennemis/variantes reste incomplet et la source de finale/VR antérieure est conservée. Il n’est pas transféré à AC!D Mobile Java, Touch ou Social Ops.",
    "touch": "Un Gekko de la mission 07 est ajouté en pose aérienne. Petits modules, raccords et dessous du pied fléchi sont reconstruits depuis une image de presse servie en 500 × 375. Old Snake Touch reste conservé ; autres cibles, variantes, boss et planches par acte restent à qualifier. Le groupe transversal n’est pas fermé.",
    "social_ops": "Le gameplay consulté montre des modèles militaires, mais les vignettes 160 × 90 contiennent un écran téléphone étroit et ne qualifient pas une variante corporelle précise. Les cartes et portraits ne sont pas convertis en corps. Une frame de meilleure définition avec unité/équipement identifiés reste requise.",
    "mgo1": "Rowdy Reiko est une vue candidate propre à MGO1. Les autres avatars, classes et personnages uniques restent ouverts ; un personnage ne représente pas toute la famille. Les douze décors sélectionnés ne constituent pas une preuve de corps.",
    "mgo2": "Un preset à béret blanc et uniforme noir est ajouté ; il ne définit pas un uniforme universel de classe. Autres équipements, avatars et personnages uniques restent à inventorier. Les quinze cartes sélectionnées ne ferment pas la ligne de personnages.",
    "mgo3": "Trois portraits de presets (NVG/mantle, visière, cagoule) et trois vues de corps (casquette, respirateur, visage crâne) sont sélectionnés. Les détails proviennent de presets observés séparés, sans fusion d’un uniforme fictif de classe. Le Scout v1 coupé en haut reste archivé ; v2 retenue. Autres personnalisations, classes et uniques demeurent ouverts.",
    "arcade": "La galerie native 2010 montre une cible blindée, mais taille et identité/variante ne suffisent pas à qualifier précisément son armure. Les opérateurs partiellement masqués ne justifient pas un corps inventé. Arcade Operator et décors Desert Duel/Lethal Leviathan déjà présents restent conservés ; une référence corporelle mieux définie est requise.",
}


def main():
    blobs = {p: (ROOT / p).read_bytes() for p in INPUTS}
    before, delivery, bible, atlas, verification, browser = [json.loads(blobs[p]) for p in INPUTS]
    assert before["baseCommit"] == delivery["parentCommit"] == BASE
    assert before["counts"]["historicalRows"] == 277
    assert before["counts"]["byBaselinePresence"]["unresolved"] == 97
    assert delivery["counts"] == bible["counts"]
    assert verification["status"] == "passed"
    assert len(delivery["assets"]) == 29 and len(delivery["archives"]) == len(delivery["blockedRequests"]) == 1
    assert len(atlas["assets"]) == 77
    assert verification["counts"]["totalSelected"] == 254
    new = delivery["assets"]
    assert all(a["scopeClosed"] is False and a["runtimeIntegrated"] is False and a["atlasIntegrated"] is True for a in new)
    assert len({a["episodeKey"] for a in new}) == 17
    assert collections.Counter(a["bodyCoverage"] for a in new) == {"full_body": 23, "portrait": 6}
    ids = {r["id"] for r in before["rows"]}
    existing_by_id = {a["assetId"]: a for a in before["selectedSources"]}
    new_by_work = collections.defaultdict(list)
    for a in new:
        for work_id in a["workIds"]:
            new_by_work[work_id].append(a)
    rows = []
    for old in before["rows"]:
        additions = new_by_work[old["id"]]
        current_by_edition = {}
        before_by_edition = {}
        for episode in old["episodeKeys"]:
            previous = [aid for aid in old["selectedAssetIds"] if episode in existing_by_id[aid]["episodeKeys"]]
            added = [a["assetId"] for a in additions if a["episodeKey"] == episode]
            before_by_edition[episode] = previous
            current_by_edition[episode] = previous + added
        rows.append({
            "id": old["id"], "label": old["label"], "category": old["category"],
            "episodeKeys": old["episodeKeys"], "baselinePresence": old["baselinePresence"],
            "baselineStatus": old["baselineStatus"], "baselineDisplayStatus": old["baselineDisplayStatus"],
            "beforeP67SelectedAssetIds": old["selectedAssetIds"],
            "p67SelectedAssetIds": [a["assetId"] for a in additions],
            "currentSelectedAssetIds": old["selectedAssetIds"] + [a["assetId"] for a in additions],
            "beforeP67SelectedAssetIdsByEdition": before_by_edition,
            "currentSelectedAssetIdsByEdition": current_by_edition,
            "p67Representations": [{"assetId": a["assetId"], "episodeKey": a["episodeKey"], "bodyCoverage": a["bodyCoverage"], "kind": a["kind"]} for a in additions],
            "partialGroupBeforeP67": old["partialGroup"],
            "documentaryIdentityWithoutBodyBeforeP67": old["documentaryIdentityWithoutBody"],
            "historicalHoldPreserved": old["historicalHoldPreserved"],
            "generationRefusalPreserved": old["generationRefusalPreserved"],
            "statusOfP67Addition": "candidate_added_scope_still_open" if additions else "no_p67_candidate_for_this_row",
            "scopeClosed": False, "fullBodyValidatedByP67": False,
            "runtimeAdmissionByP67": False, "absolute1to1CertifiedByP67": False,
        })
    affected = [r for r in rows if r["p67SelectedAssetIds"]]
    gained = [r for r in affected if not r["beforeP67SelectedAssetIds"]]
    unmatched_before = sum(r["baselinePresence"] == "unresolved" and not r["beforeP67SelectedAssetIds"] for r in rows)
    unmatched_after = sum(r["baselinePresence"] == "unresolved" and not r["currentSelectedAssetIds"] for r in rows)
    editions = []
    for old_title in before["byEpisode"]:
        key = old_title["episodeKey"]
        if key == "shared":
            continue
        assert key in REMAINING
        title_rows = [r for r in rows if key in r["episodeKeys"]]
        additions = [a for a in new if a["episodeKey"] == key]
        portraits = [a for a in additions if a["bodyCoverage"] == "portrait"]
        before_ids = [r["id"] for r in title_rows if r["baselinePresence"] == "unresolved" and not r["beforeP67SelectedAssetIdsByEdition"][key]]
        after_ids = [r["id"] for r in title_rows if r["baselinePresence"] == "unresolved" and not r["currentSelectedAssetIdsByEdition"][key]]
        editions.append({
            "episodeKey": key, "label": old_title["label"],
            "historicalP61Rows": len(title_rows),
            "historicalP61UnresolvedRows": sum(r["baselinePresence"] == "unresolved" for r in title_rows),
            "selectedSourcesBeforeP67": old_title["counts"]["selectedSources"],
            "p67SelectedSources": len(additions), "p67Portraits": len(portraits),
            "p67BodyViews": len(additions) - len(portraits),
            "selectedSourcesAfterP67": old_title["counts"]["selectedSources"] + len(additions),
            "atlasEntriesAfterP67": sum(a["episodeKey"] == key for a in atlas["assets"]),
            "unresolvedP61RowsWithoutEditionCandidateBeforeP67": before_ids,
            "unresolvedP61RowsWithoutEditionCandidateAfterP67": after_ids,
            "p67AssetIds": [a["assetId"] for a in additions],
            "p67HistoricalRowIds": [r["id"] for r in title_rows if any(a["episodeKey"] == key for a in r["p67Representations"])],
            "remaining": REMAINING[key], "scopeClosed": False,
            "completeEditionInventoryClaimed": False,
        })
    assert len(editions) == 32 and sum(e["p67SelectedSources"] for e in editions) == 29
    after = {
        "schema": "cqc.p67.coverage-after.v1",
        "checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "baseCommit": BASE, "stage": "post_generation_and_verified_atlas_integration",
        "sourceInputs": [{"path": p, "bytes": len(b), "sha256": hashlib.sha256(b).hexdigest()} for p, b in blobs.items()],
        "historicalP61": {
            "rows": 277, "unresolvedAtP61": 97,
            "byCategory": before["counts"]["byCategory"],
            "presenceClasses": before["counts"]["byBaselinePresence"],
            "interpretation": "Historical inventory unchanged; these counts are not rewritten by later associations.",
        },
        "deliveryCounts": delivery["counts"],
        "currentAssociationCounts": {
            "historicalRowsAffectedByP67": len(affected),
            "historicalRowsGainingFirstSelectedCandidate": len(gained),
            "historicalRowsWithSelectedCandidateBeforeP67": sum(bool(r["beforeP67SelectedAssetIds"]) for r in rows),
            "historicalRowsWithSelectedCandidateAfterP67": sum(bool(r["currentSelectedAssetIds"]) for r in rows),
            "initiallyUnresolvedRowsWithoutCandidateBeforeP67": unmatched_before,
            "initiallyUnresolvedRowsWithoutCandidateAfterP67": unmatched_after,
            "editionSpecificMatching": True, "automaticScopeClosures": 0,
            "fullBodyCertifications": 0, "combatAdmissions": 0,
        },
        "newRepresentations": {"characterBodyViews": 22, "machineBodyViews": 1, "portraits": 6,
                               "meaning": "Visible source framing only; no rig, animation or full canonical-body certification."},
        "byEpisode": editions, "historicalRows": rows,
        "newSources": [{k: a[k] for k in ["id", "assetId", "label", "episodeKey", "episode", "kind", "bodyCoverage", "path", "sha256", "gitBlobSha", "workIds", "scope", "qaNotes", "bibleURL"]} for a in new],
        "newExtensionScopes": [{"id": k, "assetIds": [a["assetId"] for a in v], "scopeClosed": False} for k, v in new_by_work.items() if k not in ids],
        "preservedRefusals": {"p61": 2, "p64": 3, "p67": delivery["blockedRequests"]},
        "preservedHistoricalHolds": 12,
        "integration": {"atlasEntries": 77, "historicalAtlasEntriesPreserved": 48,
                        "selectedSources": 254, "historicalSelectedSourcesPreserved": 225,
                        "archivedAttempts": 19, "runtime": verification["runtime"],
                        "browserStatus": browser["status"], "browserSuccessClaimed": False},
        "limitations": [
            "32 named editions are audited from existing project evidence; this is not an exhaustive universe inventory.",
            "Shared historical rows are counted separately by each explicit edition; title totals are not additive.",
            "MPO+ candidates do not cover MPO; the Delta portrait does not cover PS2 MGS3.",
            "Mobile N-Gage and Touch additions do not cover Arcade, Social Ops or AC!D Mobile.",
            "The six portraits do not establish full bodies. All 29 sources remain candidates pending external fidelity review.",
            "The decrease in rows without selected candidates is an association update, never automatic scope closure.",
            "Absence of a registry record does not prove absence from every hash-named legacy image.",
            "Browser launch was blocked by the absent Chromium executable; Node host tests and static graph checks are not browser rendering.",
        ],
        "scopeClosed": False, "combatRuntimeIntegrated": False, "absolute1to1Certified": False,
    }
    (ROOT / (PASS + "coverage-after.json")).write_text(json.dumps(after, ensure_ascii=False, indent=2) + "\n")
    write_markdown(after)
    print(json.dumps({"status": "passed", "associationCounts": after["currentAssociationCounts"],
                      "editionsWithP67Sources": sum(e["p67SelectedSources"] > 0 for e in editions),
                      "editionsWithAtlasSources": sum(e["atlasEntriesAfterP67"] > 0 for e in editions)}, ensure_ascii=False, indent=2))


def write_markdown(report):
    c = report["currentAssociationCounts"]
    lines = [
        "# P67 — manquants et limites par édition", "",
        "**29 nouvelles sources sur 17 éditions sont consultables dans l’Atlas : 22 vues de personnages, une vue de machine et six portraits.** Le cumul atteint 254 sources sélectionnées, 77 dossiers Atlas et 19 archives. Une tentative P67, Peace Sentinel Vest, a été refusée sans PNG ni nouvel essai.", "",
        "Les **277 lignes historiques, dont 97 non résolues en P61**, restent inchangées. Ce document suit leurs associations après P67 et les limites de chaque ajout ; aucun groupe n’est fermé par l’existence d’un PNG. Les 32 éditions ci-dessous viennent de l’inventaire et du roster du projet, sans revendication d’un inventaire exhaustif de l’univers.", "",
        "Données vérifiables : [audit avant](AUDIT_OPUS.md), [coverage-before.json](coverage-before.json), [coverage-after.json](coverage-after.json), [livraison P67](delivery-manifest.json), [contrôle d’intégration](p67-local-verification.json).", "",
        "## Effet mesuré des ajouts", "",
        f"P67 touche **{c['historicalRowsAffectedByP67']} lignes historiques** et apporte un premier candidat sélectionné à **{c['historicalRowsGainingFirstSelectedCandidate']} d’entre elles**. Les lignes reliées à au moins un candidat passent de {c['historicalRowsWithSelectedCandidateBeforeP67']} à {c['historicalRowsWithSelectedCandidateAfterP67']}. Parmi les 97 anciennes lignes non résolues, celles sans aucun candidat sélectionné passent de {c['initiallyUnresolvedRowsWithoutCandidateBeforeP67']} à {c['initiallyUnresolvedRowsWithoutCandidateAfterP67']}. Ces changements décrivent une présence de source ; ils ne reclassent pas les statuts P61 et ne certifient pas des corps complets.", "",
        "Une source ne compte que pour son édition effective. MPO+ ne couvre pas MPO ; le portrait GRU Delta ne couvre pas MGS3 PS2. Le garde Mobile N-Gage et le Gekko Touch ne remplissent pas les branches Arcade, Social Ops ou AC!D Mobile de la ligne partagée R-SIDE-CATALOG.", "",
        "## Tableau des 32 éditions", "",
        "« Sans candidat » désigne les lignes non résolues en P61 sans candidat sélectionné **de cette édition**. Ces portées peuvent être des familles, des profils, des concepts ou des identités documentaires ; ce ne sont pas des nombres de corps à générer. Les lignes partagées rendent les totaux par édition non additifs.", "",
        "| Édition | Sources avant | Ajouts P67 | Dont portraits | Sources après | Lignes sans candidat de cette édition, avant → après |",
        "|---|---:|---:|---:|---:|---:|",
    ]
    for e in report["byEpisode"]:
        lines.append(f"| {e['label']} | {e['selectedSourcesBeforeP67']} | {e['p67SelectedSources']} | {e['p67Portraits']} | {e['selectedSourcesAfterP67']} | {len(e['unresolvedP61RowsWithoutEditionCandidateBeforeP67'])} → {len(e['unresolvedP61RowsWithoutEditionCandidateAfterP67'])} |")
    lines += [
        "", "Les sources avant/après couvrent les cinq registres antérieurs et P67, pas tous les anciens sprites du dépôt. La source de fumée transversale est comprise dans le cumul de 254 et reste hors des 32 lignes d’édition.", "",
        "## Détail des ajouts et du travail restant", "",
    ]
    for e in report["byEpisode"]:
        lines += ["### " + e["label"], ""]
        additions = [a for a in report["newSources"] if a["episodeKey"] == e["episodeKey"]]
        if additions:
            labels = []
            for a in additions:
                framing = "portrait" if a["bodyCoverage"] == "portrait" else "vue de machine" if a["kind"] == "machine" else "vue de personnage"
                labels.append("[" + a["label"] + "](../../../" + a["path"] + ") — " + framing)
            lines += ["**Ajouts P67 :** " + " ; ".join(labels) + ".", ""]
        else:
            lines += ["**Ajout P67 :** aucun nouveau PNG sélectionné pour cette édition.", ""]
        lines += [e["remaining"], ""]
    lines += [
        "## Refus, archives et travail commun encore ouvert", "",
        "Les deux refus P61 (REX TTS et cyborg blindé Revengeance), les trois refus P64 (Fragmentation Grenade, EM Grenade, Rocket Launcher) et les douze blocages historiques de costumes sont préservés. Le refus P67 de Peace Sentinel Vest reste sans fichier, sans renommage et sans tentative alternative. L’archive Scout NVG v1 est exclue du runtime ; sa v2, avec marge haute vérifiée, est la source retenue.", "",
        "Les six portraits demeurent des portraits. Les 23 vues de corps n’apportent ni vue opposée, ni dos, ni rig, ni animation, ni hitbox, ni séquence narrative complète. Les détails occultés ou peu lisibles et les différences de build restent signalés dans chaque fiche. Aucune admission au combat, aucun classement UHD native et aucune fidélité absolue 1:1 ne sont certifiés.", "",
        "Les 225 sources sélectionnées et les 18 archives antérieures sont conservées par identité Git ; les 48 anciens dossiers Atlas restent identiques. Le contrôleur et le sélecteur d’opérations ont été étendus aux clés d’édition canoniques. La route, le shell principal et les styles sont préservés. Les contrôles Node et de graphe statique passent ; la [vérification navigateur](browser/verification.json) est bloquée avant ouverture de page faute de Chromium.", "",
        "Pour poursuivre une portée, établir d’abord l’identité native, l’édition/build, le cadrage et l’équipement exacts ; comparer les sources déjà présentes ; puis documenter le manque restant. Une identité sans corps montré, un concept annulé ou une référence trop petite demeure une demande de preuve, sans conversion automatique en nouveau personnage.", "",
        "Ce document est généré par scripts/audit-cqc-p67-after.py à partir des manifestes figés et du contrôle passé. Les liens d’édition, les IDs affectés et les réserves détaillées sont conservés dans coverage-after.json.", "",
    ]
    (ROOT / (PASS + "MANQUANTS.md")).write_text("\n".join(lines))


if __name__ == "__main__":
    main()
