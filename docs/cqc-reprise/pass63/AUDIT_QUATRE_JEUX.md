# CQC P63 — audit ciblé des quatre jeux

**Observation du 26 novembre 2026.** Dépôt : `darknigthmare/shadow-codec-ops`. Branche : `codex/cqc-p61-missing-static-sources-20261125`. [PR #25](https://github.com/darknigthmare/shadow-codec-ops/pull/25), head effectivement lu : `dd6338087538d9a00e6e0241cd9cd38a24c87393`.

Ce rapport prépare la continuation **Metal Gear Survive, Metal Gear AC!D, Metal Gear AC!D 2 et Metal Gear Rising: Revengeance**. Il ne produit lui-même aucune image ni admission au combat. Il ne remplace pas les inventaires historiques.

## 1. Résultat vérifiable

Le filtre exact `/acid|survive|mgr|revengeance/i` appliqué à `row.id + ' ' + row.episode` dans [l’inventaire P61](../pass61/inventory.json) sélectionne **33 lignes historiques** :

| État historique | Lignes | Interprétation |
|---|---:|---|
| `p61_candidate` | 19 | Une ou plusieurs sources statiques candidates existent ; le groupe peut rester partiellement couvert. |
| `existing_source` | 4 | Sources antérieures établies dans le rapprochement ; pas de nouvelle certification dans cet audit. |
| `unresolved` | 10 | Identités, groupes, références ou refus non résolus ; ce ne sont pas dix corps à inventer. |
| **Total** | **33** | Unité : périmètre historique, pas combattant individuel ni pourcentage de franchise. |

Les 33 identifiants et leurs états, sources, raisons et tâches sont conservés dans [scopes.json](scopes.json). Le filtre exclut la ligne mixte AC!D Mobile/autres dérivés et le projet Rising annulé avant Platinum. Ces éléments restent dans leurs inventaires ; ils ne sont pas supprimés du projet.

**Complément P62 déjà présent :** `acid-ruins-upper`, associé à `stage:acid_ruins`, couvre **Ruins Upper 03B**. La forêt reste distincte. Ne pas régénérer Upper au motif que le fichier historique P61 mentionne encore son absence.

## 2. Dix lignes historiques non résolues

| Identifiant | Situation à préserver | Suite concrète |
|---|---|---|
| `character:R-ACID-HAROLD` | Harold Burton : identité documentaire, corps non établi. | Recouper le script/portrait ; aucune apparence inventée comptée comme officielle. |
| `character:R-ACID-DECOY` | Faux Flemming : profil d’identité à rapprocher. | Vérifier la scène du scientifique avec sac sur la tête et le lien avec `completion__flemming_acid`. Distinguer l’imposteur du véritable alias Gary Murray. |
| `character:R-ACID-GUARDS` | Groupe Genetics / mercenaires de Leone / SaintLogic incomplet. | Séparer modèles PSP, palettes et armes. SaintLogic Guard est déjà lié à `completion44__saintlogic_guard_44`. |
| `character:R-SURVIVE-harley-warren` | Identité d’archives, corps non établi. | Rechercher une représentation vérifiable avant toute production corporelle. |
| `character:R-SURVIVE-joel-marton` | Identité d’archives, corps non établi. | Même exigence ; une mention n’établit pas une tenue visible. |
| `character:R-SURVIVE-AVATAR` | Captain existe sous `archive__captain` ; variantes non ventilées. | Décrire les options modulaires réellement sélectionnables. |
| `character:R-MGR-armored` | Refus effectif de génération enregistré, aucun PNG. | Conserver le statut ; aucun nouvel essai sous alias. |
| `character:R-MGR-soldier` | Soldats R-00 : affiliations et vues corporelles incomplètes. | Distinguer Maverick en polo bleu et militaires locaux en camouflage/béret ; obtenir les vues des jambes et chaussures. |
| `stage:mgr_vr_dlc` | Groupe de missions, sans liste finie établie. | Identifier chaque mission/carte retenue et sa géométrie. |
| `projectile:crystal-grenade` | Projectile du Mortar : contour précis insuffisamment référencé. | Frame nette ou modèle/texture. Ne pas remplacer par le leurre Kuban du joueur. |

Le refus **REX — The Twin Snakes**, hors de ces quatre jeux, reste également conservé. Cet audit ne demande ni nouvelle tentative ni changement d’identité pour le contourner.

## 3. Secteurs partiels à compléter

Les identifiants de la première colonne sont des **propositions de sources**, pas des PNG déjà produits. Chaque ligne représente une image autonome. Les `workIds` historiques sont conservés comme rattachement.

| Source proposée | Rattachement | Portion effectivement manquante ou à vérifier |
|---|---|---|
| `acid-lobito-forest` | `stage:acid_ruins` | Lobito — forêt. Ruins Lower P61 et Upper 03B P62 existent ; la forêt est explicitement absente. |
| `acid-far-exterior` | `stage:acid_far` | FAR — approche extérieure. Seule la chambre KODOQUE a une source P61 dans ce groupe. |
| `acid-far-teliko-interior` | `stage:acid_far` | FAR — intérieur du segment Teliko. Segment Teliko explicitement non couvert P61. |
| `mgr-guadalajara-brain-chamber` | `stage:mgr_guadalajara` | R-02 — chambre biologique. Égouts et atelier de service existent ; la chambre biologique est explicitement distincte. |
| `mgr-guadalajara-grad-arena` | `stage:mgr_guadalajara` | R-02 — arène GRAD. Arène GRAD explicitement non couverte par l'atelier du laboratoire. |
| `mgr-wm-lobby` | `stage:mgr_wm_interior` | World Marshal — hall. P61 couvre les bureaux du 20e étage uniquement. |
| `mgr-wm-freight-elevator` | `stage:mgr_wm_interior` | World Marshal — ascenseur de fret. Les ascenseurs sont explicitement exclus du secteur bureau P61. |
| `mgr-wm-japanese-garden` | `stage:mgr_wm_interior` | World Marshal — jardin japonais. Jardin explicitement absent du secteur bureau P61. |
| `mgr-pakistan-exterior` | `stage:mgr_pakistan_base` | Pakistan — extérieur de la base R-07. P61 ne couvre que le hangar vide. |
| `mgr-pakistan-excelsus-apron` | `stage:mgr_pakistan_base` | Pakistan — emprise de l'arène EXCELSUS. La base P61 distingue l'arène EXCELSUS ; le runtime utilise déjà pakistan_wreck pour Armstrong. |
| `mgr-vr-dlc-005` | `stage:mgr_vr_dlc` | DL-VR 005 — secteur à identifier. Le groupe DLC VR reste non décomposé. Le numéro 005 apparaît dans le contexte de la livraison précédente mais aucun fichier n'a été récupéré. |

Pour **AC!D 2 / Prototype KODOQUE**, une seule source d’étage existe sous `acid2-prototype`. Il faut identifier l’étage représenté puis les trois autres avant de leur attribuer des IDs ou des captures. Le marquage « 02 » d’une plateforme dans l’image ne suffit pas à prouver qu’elle représente le deuxième étage.

Pour **Survive**, les sources de camp de base, zone de poussière et trois scènes de boss existent déjà dans les catalogues lus. Les cartes coop de Salvage et le Wormhole Digger sont une piste de continuation annoncée précédemment, mais leur inventaire canonique et leurs fichiers n’ont pas été retrouvés ici. Vérifier les noms et l’absence de doublons dans les catalogues complets avant d’ajouter des périmètres. Ne pas déduire un nombre de nouveaux PNG du souvenir d’une conversation.

## 4. Sources existantes à préserver

Le [catalogue P18](../../../public/cqc/src/cqc-pass18-stage-catalog.js) contient notamment :

| Jeu | Scènes déjà associées |
|---|---|
| AC!D | Entrepôt BRC-026, pont-levis de Lobito, salle de l’usine Ebro Tower. |
| AC!D 2 | Installation d’entraînement SaintLogic et passerelle de sécurité. |
| Rising | Cour Desperado, raffinerie Mistral, aire urbaine Khamsin, Badlands / Sam, avenue Denver et esplanade World Marshal / Monsoon. |
| Survive | Camp de base de Dite et ruines industrielles dans la poussière. |

L’ID historique Khamsin contient « carrière », mais le catalogue identifie une **rue d’Abkhazie**. Préserver l’ID de compatibilité et le titre corrigé ; ne pas inventer une carrière pour correspondre à l’ancien nom.

Les sources P61 ajoutent déjà les ruines basses AC!D, chambre KODOQUE, trois salles de Test Subjects AC!D2, un étage Prototype, égouts et atelier R-02, bureaux World Marshal, hangar pakistanais, héliport Sam/Armstrong et les trois scènes de boss Survive. Le [manifeste P62](../pass62/delivery-manifest.json) ajoute Upper 03B.

Les corps de **Big Mouth et Frostbite** sont déjà établis via des sources P52. **Lord of Dust et Devastator** ont des sources P61. Le groupe **Raptor / Mastiff / Slider / Hammerhead / Fenrir** possède également des sources antérieures. Un ancien besoin de rig ou d’animation ne rend pas ces corps statiques absents.

Cyborg Desperado standard, Berserker au marteau, police de Denver masquée et scientifique R-02 ont des PNG P61. Les palettes, armes ou personnages individualisés supplémentaires doivent rester des sous-périmètres documentés.

## 5. Récupération de la dernière continuation

Aucun octet des images annoncées dans la continuation du **25 novembre après P62** n’a été récupéré pendant cet audit. La consultation récente de l’inventaire accessible après le 25 novembre et la recherche CQC / Survive / Acid / Rising après le 24 novembre n’ont retourné aucun fichier correspondant. La recherche simplifiée retrouve des fichiers CQC plus anciens ; les plus récents visibles dans le dossier du projet datent du 22 septembre.

Ce constat signifie **« non récupéré dans les vues inspectées »**, sans établir une perte définitive. Les cartes coop, secteurs SaintLogic et compléments Rising mentionnés dans un ancien message ne sont donc pas comptés comme nouveaux fichiers présents au head `dd633808`.

## 6. Passage d’une image candidate à une scène jouable

Le [registre de stages](../../../public/cqc/src/cqc-pass26-stage-registry.js) conserve les identifiants de titre `acid`, `acid2`, `mgr` et `survive`. Son admission demande notamment `approved === true`, `review.status === 'accepted_closest'`, un ID non ambigu, une définition de la bonne édition et des couches valides.

Une nouvelle image candidate doit d’abord être reliée à son sous-secteur, à ses références et au guide. Un atlas ou contrat de couches et un binding effectif sont ensuite nécessaires pour l’admettre. Vérifier le chargement, les points d’appui, l’échelle, les changements de côté et le composite réel avant d’annoncer une intégration jouable. Un PNG plat ne prouve pas une parallaxe complète ni une fidélité absolue.

**Compteurs de ce rapport : 0 PNG produit, 0 admission runtime, 0 certification 1:1.** Les futurs manifests de production doivent publier leurs propres comptes et ne pas modifier rétroactivement les 33 lignes historiques.

## Sources du constat

- [Inventaire P61](../pass61/inventory.json) et [manifeste P61](../pass61/delivery-manifest.json).
- [Qualification des identités et groupes](../pass61/audit/roster-qualification.json).
- [Manifeste P62](../pass62/delivery-manifest.json).
- [Bible centrale](../../cqc-bible/README.md) et [fiches/critères de validation](../../cqc-bible/FICHES_ET_VALIDATION.md).
- [Catalogue des stages P18](../../../public/cqc/src/cqc-pass18-stage-catalog.js) et [registre partagé](../../../public/cqc/src/cqc-pass26-stage-registry.js).

Toutes ces lectures sont rattachées au même head GitHub observé. Les qualités visuelles des anciens PNG ne sont pas recertifiées par une lecture de leurs manifests.

