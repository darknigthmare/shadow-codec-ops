# Codec Drawers and Avatar Pack 01

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

The built-in image generator produced original fan-made CRT portrait sheets for:

- Solid Snake
- Roy Campbell

Each sheet was split into six optimized WebP avatars:

- neutral
- serious
- warning
- calm
- humor
- glitch

The portraits contain no text, labels, logos or surrounding UI. The Codec runtime selects the image from the current speaker and portrait expression. Local Voice Packs keep priority over these built-in assets.

Final asset locations:

```text
public/portraits/mgs1/solid_snake/
public/portraits/mgs1/campbell/
```
