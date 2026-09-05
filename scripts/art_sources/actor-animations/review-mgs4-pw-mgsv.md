# Actor animation art review: MGS4 / Peace Walker / MGSV

Original fan-made pixel sprites generated with the built-in OpenAI image generator. Official reference pages informed silhouettes, era-specific equipment and colors; no official art was copied into the runtime sheets. These are faithful adaptations for the side-view game, not a claim of pixel-exact official artwork.

## References checked

- MGS4: https://www.konami.com/mg/archive/mgs4/jp/ and https://www.konami.com/mg/history/jp/ja/mgs4
- Peace Walker: https://www.konami.com/mg/archive/mgs_pw/en/character/index.html and https://www.konami.com/mg/history/jp/ja/mgspw
- Ground Zeroes: https://www.konami.com/games/us/en/topics/10/
- The Phantom Pain: https://www.konami.com/mg/mgs5/tpp/jp/story/ and https://www.konami.com/mg/mgs5/tpp/jp/goods/item_venomsnake_statue.html

## Source contract

Every pack has independently authored mobility and combat source PNGs. Each source has 8 columns and 6 rows: player, guard and reinforcement each occupy two rows, four actions and four authored phases per action. Source magenta is a deliberate transparency key; cyan guides are not game content. Runtime output is six 512x512 transparent sheets per pack, 16 cells of 128x128 per sheet: 96 authored poses per pack.

Generation prompts use `prompts.json`, with repeated identity constraints on both rows for each actor. Later accepted variants add compact-pose margins, forbid muzzle flashes and detached effects (the game renders those separately), and repeat the correct headwear/trousers on jumping poses.

## Corrections before acceptance

- MGS4: rejected PMC helmet transfer to FROG gear and Old Snake trousers changing tan. Rejected a rifle crossing the cell border, then a FROG jump boot touching the left guide. Regenerated the mobility board with compact tucked-knee jumps. Both final boards retain compact weapons and stable blue-gray OctoCamo, tan PMC fatigues and black-gray FROG armor/red visor.
- Peace Walker: rejected a helmet appearing on Big Boss during a jump. Rejected a firing flash that crossed a neighboring cell. Final mobility/combat boards share compact actor scale, olive MSF fatigues, exposed brown hair/bandana, organic arms and period-appropriate soldiers.
- Ground Zeroes: retained the 1975 Big Boss identity, dark sneaking suit and organic arms; XOF uniforms and masks remain consistent. No Venom prosthetic arm or forehead horn.
- The Phantom Pain: corrected four jump cells which incorrectly borrowed the Soviet soldier's cap and khaki equipment. Final Venom uses olive-brown fatigues, the red left prosthetic arm, right eyepatch, brown hair/bandana and small horn; Soviet soldiers and pale mineral-armored Skulls remain separate actors.

## Import guarantees

`importSideOpsActorBoards.py` detects complete cyan grids (including irregular spacing), excludes guides and their edge color fringe, keys magenta including enclosed gaps, aligns source cells at bottom center, then applies one uniform nearest-neighbor scale across both boards of an actor. It does not draw, generate, interpolate or shift individual body parts. It rejects missing cells, incomplete grids, exact duplicated phases and foreground touching the cell edge. Source SHA-256, detected guides, cell rectangles, inset and all output frame hashes are recorded in each pack's `provenance.json`.

Six regression tests cover irregular grids, missing columns, key color preservation, cross-board baseline alignment, guide fringe removal while retaining a real boot touching an edge, and preservation of blue sprite-interior pixels.

## Accepted output review

All 24 runtime PNGs for these four packs were displayed individually after export and inspected across all16cells: costumes, character separation, full limbs/weapons, action variety, magenta removal and guide removal. All four imports passed with inset3. Total accepted content:8source PNGs,24runtime PNGs,384authored poses. The MGS3 pair was additionally exported successfully with inset0 using the guide-fringe key; its final art review is owned by the main task.
