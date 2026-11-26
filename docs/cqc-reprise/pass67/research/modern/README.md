# P67 — personnages modernes

Neuf sources statiques candidates : huit corps dans la pose visible de leur référence et un portrait limité au haut du torse. Aucun groupe historique n’est fermé ; aucune certification 1:1 ni admission au combat.

| Candidat | Édition | Dimensions | Couverture |
|---|---|---:|---|
| Portable Ops Plus — USSR Female Soldier (A) | mpo_plus | 1347 × 1167 | Corps entier, une pose |
| Portable Ops Plus — Ocelot Unit Female Soldier (A) | mpo_plus | 1347 × 1167 | Corps entier, une pose |
| Portable Ops Plus — Male Scientist (A) | mpo_plus | 1244 × 1264 | Corps entier, une pose |
| Peace Walker — guérillero Sandinista, modèle PSP | pw | 1347 × 1167 | Corps entier, une pose |
| Portable Ops Plus — USSR Male Soldier (A) | mpo_plus | 1347 × 1167 | Corps entier, une pose |
| Portable Ops Plus — Female Officer (A) | mpo_plus | 1239 × 1270 | Corps entier, une pose |
| Delta — GRU à cagoule, portrait du haut du torse | delta | 1492 × 1054 | Portrait haut du torse |
| MGS4 — rebelle du Moyen-Orient, manches courtes | mgs4 | 1094 × 1438 | Corps entier, une pose |
| MGS4 — rebelle du Moyen-Orient, tunique claire | mgs4 | 1079 × 1458 | Corps entier, une pose |

## Livrables

- [Handoff et prompts exacts](handoff.json)
- [Provenance, URLs et empreintes des références](sources.json)
- [Audit de dédoublonnage P61–P66](dedup-audit.json)
- [Revue visuelle](visual-qa.json) — auto-revue ; revue indépendante encore attendue.
- [Mesures alpha et empreintes des PNG](pixel-qa.json)
- [Validation des chemins, métadonnées et hashes](handoff-validation.json)
- [Priorités restant ouvertes](remaining-priorities.json)
- [Composite clair](qa/modern-candidates-light.jpg) et [composite sombre](qa/modern-candidates-dark.jpg)

## Provenance et limites

Les cinq recrues MPO+ et le Sandinista PW sont établis par des previews publics de modèles PSP attribués à ces jeux sur The Models Resource. Ils ne sont pas des illustrations officielles ni des extractions binaires vérifiées du disque : aucun ZIP/OBJ n’a été téléchargé. Les identités de modèle, vêtements, couleurs et poses observés sont conservés comme cibles. Les visages, microtextures, lettres des patchs et petits accessoires restent reconstruits.

Le GRU Delta suit une capture de cutscene PC archivée sur IMFDB, publiée le 31 août 2025. La référence coupe le bas du corps : seul le portrait tête/épaules/haut du torse est sélectionné. Il ne couvre ni le GRU PS2 ni FOX HUNT.

Les deux rebelles MGS4 correspondent à deux sujets distincts visibles en entier dans une même capture attribuée au jeu PS3 par IGDB/Backloggd. La capture est agrandie et douce ; sa date et sa build ne sont pas établies. Une origine promotionnelle est possible. Les PNG reproduisent la source observée sans certifier le modèle retail final.

Les neuf PNG sont des sorties natives du générateur, sauvegardées byte-exact. Aucun nettoyage scripté, redessin, modification de pixels ni upscaling du livrable. Les crops de références et composites JPEG servent uniquement à la lecture et à la QA.

## Génération et transparence

10 requêtes : 9 sorties sélectionnées, 0 archive, 1 refus. La variante Peace Walker Sentinel Vest a été refusée à la sortie, requête `56300066-bee6-4ef8-be70-974a9dc6c460`, code `moderation_blocked`. Aucun réessai, alias ou générateur alternatif. Voir [le refus conservé](pw-sentinel-vest-refusal.json).

Les neuf fichiers sont RGBA et atteignent alpha 0 et 255. Les composites clair et sombre ont été inspectés sans fond opaque ni halo coloré visible. De faibles pixels alpha résiduels et du RGB sous alpha nul existent dans les sorties brutes ; ils sont conservés. Les contours alpha >16 restent dans le cadre. La tunique claire de MGS4 a une marge inférieure serrée d’un pixel, sans semelle manquante observée.

## Reste à traiter

MGS3 PS2, Snake Eater 3D et MPO original demandent des références d’édition propres. Delta KGB/GRU/scientifiques restent à documenter en corps entier ; FOX HUNT demande un inventaire distinct des choix réels d’avatar et de tenue. Les autres variantes MPO+, les FSLN et les groupes MGS4 restent incomplets. Les refus historiques, costumes cyborg/Metal Gear et maillots PW bloqués ne sont pas relancés.

Les registres centraux, l’arbre/commit/référence Git et GitHub ne sont pas modifiés par ce lot de préparation.
