# MGS1 VR environment art sources

These five atlases were generated with OpenAI Image Gen, then converted into the
48 runtime PNGs under `public/vr/mgs1/environment/` by
`scripts/build_mgs1_vr_environment_assets.py`.

## Visual references

- Konami VR Training manual and target list:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/page09.html
- Konami wall/air-duct reference:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/img/03_02.png
- Konami camera and virtual-stage references:
  https://metalgear.konami.net/manual/mc1/mgs1_vr_missions/pc/en/img/07_01.png
  through `07_07.png`
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

Transparent boards use a solid `#ff00ff` chroma background. Final runtime art
uses binary alpha, exact registered dimensions and a limited pixel-art palette.

Rebuild with:

```powershell
python scripts/build_mgs1_vr_environment_assets.py
```
