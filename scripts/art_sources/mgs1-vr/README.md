# MGS1 VR art sources

These nine atlases were generated with OpenAI Image Gen. The five environment
boards become the 48 PNGs under `public/vr/mgs1/environment/`; the four gameplay
boards become the 41 actors, weapons, projectiles and VFX under
`public/vr/mgs1/gameplay/`.

## Visual references

- Konami VR Training manual and target list:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/page09.html
- Konami wall/air-duct reference:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/img/03_02.png
- Konami camera and virtual-stage references:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/img/07_01.png
  through `07_07.png`
- Konami MGS1 Integral character reference sheet (Snake, Meryl, Genome Soldier,
  Cyborg Ninja):
  https://metalgear.konami.net/manual/mc1/mgs1_integral/pc/en/page19.html
- Konami Genola / Variety 13 reference:
  https://www.konami.com/mg/archive/integral/vr/pic2/variety_13.jpg
- Konami official eight-weapon list and icons:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/page12.html
- Konami historical Ninja VR reference:
  https://www.konami.com/mg/archive/integral/vr/nja.html
- Supplemental gameplay gallery:
  https://www.mobygames.com/game/3783/metal-gear-solid-vr-missions/screenshots/

## Prompt set

- `vr-targets-openai-atlas.png`: the eight official target silhouettes in manual
  order: CUBE-B, CUBE-R, KOKESHI-B, KOKESHI-G, MOVE-B, MOVE-R, WALL and UFO.
- `vr-modular-props-openai-atlas.png`: platform, checkpoint frame, camera, data
  node, route marker, wall block, crate, pillar, pedestal, hazard strip, glass
  cover and laser beacon.
- `vr-structures-openai-atlas.png`: raised/low walls, stairs, ramp, bridge,
  air-duct, slab, pit edge, glass states and destructible WALL states.
- `vr-surfaces-openai-atlas.png`: cyan/green/amber grids, matrix void, water,
  lava, red hazard grid and glass-data surface.
- `vr-objectives-hazards-openai-atlas.png`: GOAL beacon, gun camera, spotlight,
  laser emitter/beam, Claymore, ammunition package and Mystery package.
- `vr-special-characters-openai-atlas.png`: Solid Snake, Genome Soldier,
  Cyborg Ninja, Genola, protected Meryl, Snake disguise, Mystery Soldier, Naomi
  and Mei Ling, in a fixed 3x3 side-view sprite board.
- `vr-weapons-openai-atlas.png`: the official eight weapons in manual order:
  SOCOM, FA-MAS, PSG1, grenade, C4, Claymore, Stinger and Nikita.
- `vr-projectiles-vfx-openai-atlas.png`: eight matching projectiles/charges plus
  muzzle flash, impact, target fragments, chain blast, chaff, missile trail,
  missile explosion and GOAL materialization.
- `vr-special-vfx-openai-atlas.png`: Ninja slash/ricochet/electrical effects,
  stealth shimmer, Claymore blast, glass shatter, WALL crumble and UFO blast.

Transparent boards use a solid `#ff00ff` chroma background. Final runtime art
uses binary alpha, exact registered dimensions and a limited pixel-art palette.

Rebuild with:

```powershell
python scripts/build_mgs1_vr_environment_assets.py
python scripts/build_mgs1_vr_gameplay_assets.py
```
