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

## Next avatar priority

The next character-specific portrait production pass targets MGS2 and MGS3.
