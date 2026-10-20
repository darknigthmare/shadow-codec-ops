# Solid Snake MGS1 — Gala : reprise préparée, HOLD

UID `core__solid`, famille `tuxedo`. Création Gala du projet ; ne pas la présenter comme une reproduction attestée du costume officiel débloquable de MGS1 sans une comparaison officielle propre. Le jeune Solid PS1 1998 reste distinct de Solid MGS2, Old Snake et Big Boss.

## Sources exactes

Les deux PNG suivants ont été vus physiquement pendant cet audit :

- DROITE V3 : `/workspace/generated_images/exec-4de22b50-0e95-4111-b636-040783e79061.png`, 1254×1254, 1 358 425 octets, SHA256 `083c626fdac44f5ab286816aded9578fbcbb2ba4ecc2f82c8413af72277663b6`.
- GAUCHE V1 : `/workspace/generated_images/exec-f76f1e2d-3ac8-4bb0-8f5c-a237fbe1c998.png`, 1254×1254, 1 404 636 octets, SHA256 `62e6db023a4ca0e26385611bf263dbe499b75c42ae344f971af3b48bf489e978`.
- Référence d'identité locale : `/workspace/cqc-game-working/cqc-versus-v056/preparation/combat-sprites-reprise/solid-mgs1-generation/references/mgs_art_g_0031.jpg`, SHA256 `1adc0309e7f0de3a832f3c8a32d36660060b492f5a577216ca82040dceaa0306`.
- Référence SOCOM : même dossier, `socom.jpg`, SHA256 `b2e7339d46e88146dcfb7fb895c08c005d74aeddb7e5d083565c5a6089487a25`.
- Revue source : `/workspace/cqc-pass21-tuxedo/provenance/core__solid_SOURCE_REVIEW_ACTUAL_V1.json`.

Constat visible : le corps DROITE index 7 (deuxième ligne, quatrième cellule) regarde à droite mais donne son coup de pied vers la gauche. La GAUCHE index 7 frappe bien à gauche. Le poing DROITE index 6 est orienté à droite dans la version actuelle. Les deux pages montrent le même jeune homme brun imberbe, bandeau bleu nuit, smoking court noir, chemise blanche opaque, gilet noir, nœud bleu sombre, gants et chaussures noirs, étui de cuisse.

## Reprise ciblée proposée

Nouvelle page indépendante 3 colonnes × 2 lignes, 1536×1024, cinq corps entiers et une case vide. Index 0 : neutre droit debout pour calibration. Index 1 : amorce basse 0. Index 2 : amorce basse 1. Index 3 : impact bas droit. Index 4 : récupération basse. Index 5 vide. Le corps entier doit être redessiné à chaque phase ; ne pas retoucher seulement un pied. Anciennes pages conservées ; aucun frame actif ne doit continuer à pointer vers le mauvais index 7.

Profil à conserver : `displayHeight: 220`. `low` = 4 frames à 12 FPS, startup `[0,1]`, active `[2]`, recovery `[3]`. Les autres actions restent idle4@4, walk4@10, guard4@6, crouch2@4, punch4@12, hit2@10, ko2@3, throw4@12, deploy4@10, shoot2@12, reload2@6, attack4@12. Total temporel 42 frames par face ; les pages existantes contiennent 16 corps physiques par face, il ne faut pas prétendre que 42 corps uniques ont été dessinés.

Le nouveau neutre fournit la stature source et la position du bassin ; tous les corps du complément emploient ce même facteur uniforme. Les pivots restent au contact sol, y compris lors de l'extension du coup. La preview du costume doit rester alignée sur le pelvis des autres costumes. Mesurer les sockets SOCOM sur les corps de tir réels, pas sur ce complément sans arme en main.

## Prompt imagegen prêt, non exécuté

Use the supplied RIGHT and LEFT Gala sprite sheets as exact costume, face, linework and scale references, plus the original 1998 PS1 Solid Snake identity reference. Create ONE new, independently redrawn transparent-RGBA sprite supplement, 1536 by 1024, a precise 3-column by 2-row atlas. No words, labels, numbers, frame borders, background, cast shadow, halo or glow. Five separate complete bodies; the last cell is completely empty transparent space. Every visible body must be the same young clean-shaven Solid Snake from original MGS1, short swept brown hair, dark navy bandanna with tails, black short tuxedo jacket and waistcoat, opaque white dress shirt, small dark navy bow tie, black straight tuxedo trousers, black gloves and black boots, same right-thigh holster. Preserve the reference drawing style and anatomy; do not use a different age, beard, Old Snake, Big Boss, or MGS2 outfit. All five bodies face SCREEN RIGHT, with distinct native perspective and correct anatomical equipment. Row-major cells: 0 upright neutral standing calibration pose; 1 low-kick startup with weight shifting onto the supporting leg; 2 low-kick windup with the attacking knee loaded forward; 3 a genuine forward low kick extending the boot toward SCREEN RIGHT below waist height, facing and striking in the SAME rightward direction, supporting foot anatomically grounded; 4 coherent recovery retracting that same leg into the guard; 5 blank. Redraw the WHOLE body for each phase with torso and pelvis balance, never paste or mirror a leg. Match head/body proportions and the neutral stature scale across every cell. Keep every head, boot, bandanna tail, holster and finger inside its own cell with at least 32 pixels of clear transparent margin. No weapon discharge and no extra limbs. Do not repeat the known error where a right-facing body kicks backward toward screen left.

Avant appel réel : visualiser également la référence d'identité locale si elle n'a pas encore été vue par l'opérateur imagegen. Après génération : inspecter l'impact droit et la transition, alpha, silhouette entière, pieds/sol/bassin, puis compiler et prouver l'ensemble des deux faces. HOLD tant que le nouveau PNG et le descriptor exact ne sont pas validés.
