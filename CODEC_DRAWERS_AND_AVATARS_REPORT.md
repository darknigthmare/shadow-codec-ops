# Codec Drawers, MGS1 Avatar Library and Side Ops Character Art

## Navigation

- The application menu is now a left overlay drawer.
- Selecting a module closes the drawer automatically.
- A fixed compact handle reopens it without reducing the module viewport.
- Clicking the backdrop or pressing Escape closes it.
- Mobile placement respects safe-area insets.

## Codec tools

- Memory, history, replay, frequency routing, Signal Intelligence, save slots and personnel dossiers now share a right overlay drawer.
- The previous permanent Context & Channel Status column is available from the closed drawer handle.
- The active Codec layout uses the full available width while the drawer is closed.

## MGS1 character portraits

The built-in image generation workflow produced original fan-made CRT portrait sheets for nine MGS1 characters:

- Solid Snake
- Roy Campbell
- Mei Ling
- Naomi Hunter
- Otacon
- Nastasha Romanenko
- Master Miller
- Meryl Silverburgh
- Deepthroat

Each sheet was split into six optimized WebP avatars:

- neutral
- serious
- warning
- calm
- humor
- glitch

The seven new contact packs contain 42 portraits and join the original 12 Solid Snake/Roy Campbell portraits, bringing the MGS1 library to 54 portraits. They are original fan-made creations inspired by official reference material, not extractions from the games. The portraits contain no text, labels, logos or surrounding UI. The Codec runtime selects the image from the current speaker and portrait expression. Local Voice Packs keep priority over these built-in assets.

Final asset locations:

```text
public/portraits/mgs1/solid_snake/
public/portraits/mgs1/campbell/
public/portraits/mgs1/mei_ling/
public/portraits/mgs1/naomi/
public/portraits/mgs1/otacon/
public/portraits/mgs1/nastasha/
public/portraits/mgs1/miller/
public/portraits/mgs1/meryl/
public/portraits/mgs1/deepthroat/
```

## Side Ops 2D character sprites

Side Ops now loads eight dedicated character sprites from `public/sideops/characters/`:

- `solid-snake-mgs1.png`
- `solid-snake-mgs2.png`
- `genome-guard.png`
- `genome-reinforcement.png`
- `tanker-guard.png`
- `tanker-reinforcement.png`
- `armored-guard-captain.png`
- `shielded-deck-commander.png`

The set covers two Solid Snake mission variants, four guard/reinforcement roles and two mission bosses. Like the Codec portraits, these sprites are original fan-made creations inspired by official reference material and are not extracted game assets.

## Completed Playable Operatives Pack 02

Playable Operatives Pack 02 adds eight player-specific sprites to `public/sideops/characters/`. Every delivered file is a transparent 32 x 48 pixel RGBA PNG with a right-facing base pose compatible with the existing Side Ops flip logic:

| Era | File | Accepted `mainCharacter` aliases |
| --- | --- | --- |
| MG1 / MSX | `solid-snake-mg1.png` | `solid_snake_msx`, `solid_snake_mg1`, `solid_snake_outer_heaven`, `solid snake mg1` |
| MG2 / MSX | `solid-snake-mg2.png` | `solid_snake_mg2`, `solid_snake_zanzibar`, `solid snake mg2` |
| MGS2 / Patriots AI | `raiden-mgs2.png` | `raiden_mgs2`, `raiden_corrupted`, `raiden` |
| MGS3 | `naked-snake-mgs3.png` | `naked_snake`, `naked_snake_mgs3`, `naked snake`, `big_boss_mgs3` |
| MGS4 | `old-snake-mgs4.png` | `old_snake`, `old_snake_mgs4`, `old snake`, `solid_snake_mgs4` |
| Peace Walker | `big-boss-peace-walker.png` | `big_boss_pw`, `big_boss_peace_walker`, `big boss`, `snake_pw` |
| Ground Zeroes / MGSV | `big-boss-ground-zeroes.png` | `big_boss_gz`, `big_boss_ground_zeroes`, `big boss`, `snake_ground_zeroes` |
| The Phantom Pain / MGSV | `venom-snake-mgsv.png` | `venom_snake`, `venom_snake_mgsv`, `venom snake`, `punished_snake` |

Aliases are normalized case-insensitively: spaces, hyphens and underscores resolve to the same identifier. Existing art remains authoritative for the legacy MGS1 aliases `solid_snake`, `solid_snake_mgs1` and `snake`, and for the MGS2 Tanker aliases `solid_snake`, `solid_snake_mgs2`, `iroquois_pliskin` and `pliskin`. The VR aliases `vr_operative` and `vr_operator` resolve to `vrPlayer`.

### Mission Builder resolution

The Mission Builder now resolves its player texture from both `era` and `mainCharacter`. When an alias is absent or unknown, the era supplies a stable default:

| `era` | Default player art |
| --- | --- |
| `msx` | Solid Snake MG1 |
| `mgs1` | existing Solid Snake MGS1 sprite |
| `mgs2` | Raiden MGS2, except an unknown Tanker identity keeps the existing Tanker Snake sprite |
| `mgs3` | Naked Snake MGS3 |
| `mgs4` | Old Snake MGS4 |
| `peace_walker` | Big Boss Peace Walker |
| `mgsv` | Venom Snake MGSV |
| `vr_simulation` | `vrPlayer` |
| `patriots_ai` | Raiden MGS2 |

Selecting the Builder environment `vr` takes priority over era and identity. It reuses VR Character Pack 01 as `vrPlayer` for the operative, `vrGuard` for guards and reinforcements, and `vrBoss` for the boss. The target-drone texture is intentionally not used for a hostile humanoid role. Non-VR guards, reinforcements and bosses continue to use the existing general or Tanker environment packs until dedicated hostile-era packs are added.

All eight assets also have a 32 x 48 procedural fallback generated at runtime if an image cannot be loaded.

### Official visual reference pages

The eight sprites were generated by OpenAI as original fan-made pixel art using these official Konami pages as character references. No official texture or image is shipped in the application:

- Metal Gear character archive: https://www.konami.com/mg/archive/mg/chara.html
- Metal Gear 2 character archive: https://www.konami.com/mg/archive/mg2/chara.html
- Metal Gear Solid 2 history page: https://www.konami.com/mg/history/jp/ja/mgs2
- Metal Gear Solid 3 history page: https://www.konami.com/mg/history/jp/ja/mgs3
- Metal Gear Solid 4 history page: https://www.konami.com/mg/history/jp/ja/mgs4
- Metal Gear Solid: Peace Walker history page: https://www.konami.com/mg/history/jp/ja/mgspw
- Metal Gear Solid V: Ground Zeroes official site: https://www.konami.com/mg/mgs5/gz/en/introduction/index.php
- Metal Gear Solid V: The Phantom Pain story page: https://www.konami.com/mg/mgs5/tpp/jp/story/index.php

## Delivery status

The character-specific production pass is complete: 94 portraits across MGS2 and MGS3, VR Character Pack 01 and Playable Operatives Pack 02.

## Completed MGS2/MGS3 portrait expansion

The delivered and verified portrait lot contains:

- 55 optimized MGS2 portraits for the player identities and seven support contacts;
- 39 optimized MGS3 portraits for Naked Snake and the five distinct support characters.

Each era keeps its data-driven expression catalogue and adds runtime-only states that are already requested by conversations. The plan also preserves story identities without duplicating routing logic:

- MGS2 links Solid Snake with Pliskin and Mr. X with Olga while retaining their disguise/reveal expressions;
- MGS3 routes `naked_snake` and `naked_snake_mgs3` to the same character pack;
- MGS3 routes `para_medic_save_mgs3` and `para_medic_mgs3` to the same Para-Medic pack while preserving the `cinema` and `medical` states;
- SIGINT and EVA include the additional `urgent` state already used by active conversations.

Final asset roots:

```text
public/portraits/mgs2/
public/portraits/mgs3/
```

The portrait resolution contract is:

1. enabled local Voice Pack override;
2. requested built-in character expression;
3. `neutral` portrait for the same character;
4. existing player/contact system silhouette for the selected era.

This layered fallback keeps the Codec usable when an alias, special expression or individual file is unavailable. All 94 portraits are original fan-made creations inspired by official reference material, not extracted game assets.

## Completed VR Character Pack 01

VR Character Pack 01 delivers four original sprites under `public/vr/characters/` matching the preferred runtime texture roles:

- `vrPlayer`;
- `vrTarget`;
- `vrGuard`;
- `vrBoss`.

The previous Side Ops/procedural gameplay textures remain available as a runtime fallback. The four delivered sprites follow the same original fan-made, non-extracted asset policy as the Codec portraits and Side Ops character pack.
