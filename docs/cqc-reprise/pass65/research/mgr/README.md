# P65 — objets Rising et références restantes

Trois objets distincts sont sélectionnés : le coffre orange normal, le coffre métallique verrouillé et le terminal de données VR en valise. Les références proviennent du [manuel officiel PC](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/235460/manuals/MGR_PC_manual_English.pdf?t=1718869136), pages 11 et 14. Le PDF de 16 pages a été réellement ouvert ; les trois images intégrées sont conservées à leurs dimensions natives après conversion CMYK vers RGB. Aucun manuel entier n’est republié ici.

| Objet | Référence locale | Dimensions de référence | Version retenue |
|---|---|---:|---|
| Coffre normal | [Capture du manuel](mgr-item-box-normal-reference.png) | 662 × 373 | v1 |
| Coffre verrouillé | [Capture du manuel](mgr-item-box-locked-reference.png) | 662 × 373 | v2 |
| Terminal VR | [Capture du manuel](mgr-vr-data-terminal-reference.png) | 315 × 178 | v1 |

Les trois sources générées sont des PNG RGBA de 1254 × 1254. Les [prompts initiaux](prompts.json), le [prompt de correction du coffre verrouillé](prompt-locked-v2.json), les [métadonnées de transmission](handoff.json) et la [revue indépendante](independent-visual-qa.json) identifient chaque version.

## Correction et fidélité

Le coffre verrouillé v1 présentait des excroissances blanches sur les arêtes supérieures. Une correction imagegen a supprimé ces défauts visibles en conservant le corps, le verrou cyan, les accents jaune/noir et la poignée. La v1 est [archivée](../../rejected/mgr-item-box-locked-v1.png), hors Atlas. La v2 change légèrement le grain métallique : elle n’est pas présentée comme une modification limitée strictement au canal alpha.

Les coffres conservent la géométrie et les attributs principaux des captures, avec un éclairage plus uniforme et des matières détaillées reconstruites. Le terminal conserve la valise olive ouverte, le clavier et l’organisation générale de l’écran ; son interface et ses microdétails ne sont pas certifiés exacts. De fins résidus de contour restent documentés. Aucun objet n’est une extraction du modèle natif, une image UHD, une animation ou une implémentation interactive.

## Pistes ouvertes

Le [journal de recherche](research-log.json) distingue la mission DL-VR005 du Dwarf Gekko de la VR005 standard. Aucune frame assez exploitable n’a été obtenue pour produire ce décor. Le [montage EXCELSUS](mgr-excelsus-vandal-collage.jpg), réellement inspecté, masque trop de terrain pour établir une arène vide fidèle. Les canisters GRAD et les soldats humains restent également ouverts.

Les icônes [Cardboard Box](mgr-cardboard-box-reference.png) et [Drum Can](mgr-drum-can-reference.png) du [guide Piggyback](https://www.piggyback.com/en/wp-content/uploads/sites/7/2020/04/MGR_U_SamplePages.pdf) ont été inspectées, sans nouvelle génération à partir de ces seuls dessins. Les refus antérieurs de Fragmentation Grenade, EM Grenade, Rocket Launcher, du cyborg blindé et de REX TTS n’ont pas été relancés.

**Comptabilité MGR P65 : 4 appels, 4 PNG, 3 retenus, 1 archive, aucun refus nouveau.** Les trois objets n’ajoutent aucune admission au combat ni certification absolue 1:1.
