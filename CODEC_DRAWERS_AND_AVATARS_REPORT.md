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

## Delivery status

The character-specific production pass is complete: 94 portraits across MGS2 and MGS3, plus VR Character Pack 01.

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
