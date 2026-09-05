# Side Ops terrain: original OpenAI materials

Generated with the built-in OpenAI ImageGen tool on 2026-09-05. These are original fan-made material interpretations for the project's side-scrolling tactical simulations. No official game texture or screenshot is shipped.

## Deliverables

- `ground-atlas-openai.png`: twelve materials, strict 4 x 3 grid.
- `structure-atlas-openai.png`: twelve elevated-platform materials, same grid.
- `repetition-review.png`: each normalized material repeated six times for visual inspection.
- Runtime files: `public/sideops/terrain/{pack}-ground.png` (128 x 64) and `{pack}-structure.png` (128 x 32).
- `public/sideops/terrain/provenance.json` records source and output SHA-256 hashes, crops, dimensions, and edge measurements.
- Full generation specifications are in `PROMPTS.md`.

Normalization uses `scripts/splitSideOpsTerrainAtlas.py`: crop atlas boundaries, remove the empty band above the second atlas's walking lip, and downsample. No material painting, recoloring, mirroring, or algorithmic seam blending was used. The six-repeat contact sheet was visually inspected. These are visually repeating textures, not a claim that every left/right edge pixel is identical.

## Runtime contract

The existing `platform` physics texture remains 64 x 16 pixels and uses the original scaleX. The invisible collision body is unchanged. A TileSprite repeats the era's native 128-pixel material horizontally without stretching it, aligned to the physical upper surface. The extra side face is decorative underside only. Terrain positions align to world X so overlapping ground sections keep the same pattern phase.

Generic cover keeps its existing 28 x 40 collider. Rendering uses the existing OpenAI supply crate, storage container, drum, VR data crate or simulation terminal with preserved image aspect ratio. The special prop assigned to each authored level retains its original collider and art.

## Material order and references

| Grid index | Pack | Ground / structure vocabulary | Reference |
| --- | --- | --- | --- |
| 1 | mg1 | Olive bunker concrete / reinforced walkway | [Konami MG](https://www.konami.com/mg/archive/mg25th/truth/mg.html) |
| 2 | mg2 | Mossy olive masonry / laboratory walkway | [Konami MG2](https://www.konami.com/mg/archive/mg25th/truth/mg2.html) |
| 3 | mgs1 | Snow and cold steel / frosted maintenance catwalk | [Konami Legacy Collection](https://www.konami.com/mg/archive/mgs_tlc/) |
| 4 | mgs2_tanker | Rain-wet naval steel / ship structural beam | [Konami Tanker](https://www.konami.com/mg/archive/mgs2/english/story/story_tanker.html) |
| 5 | mgs2_plant | Orange offshore steel / rusted support beams | [Konami Plant](https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html) |
| 6 | mgs3 | Mud and roots / 1964 timber depot walkway | [Konami MGS3](https://www.konami.com/mg/archive/mg25th/truth/mgs3.html) |
| 7 | mgs4 | Dusty masonry / damaged rooftop cornice | [Konami MGS4](https://www.konami.com/mg/archive/mg25th/truth/mgs4.html) |
| 8 | peace_walker | Damp jungle soil / wood and olive supply gantry | [Konami Peace Walker](https://www.konami.com/mg/archive/mgs_pw/jp/base/base.html) |
| 9 | mgsv_ground_zeroes | Wet tarmac and concrete / military service beam | [Konami Ground Zeroes](https://www.konami.com/mg/mgs5/gz/jp/introduction/index.php) |
| 10 | mgsv_phantom_pain | Sandy stratified rock / dusty outpost supports | [Konami The Phantom Pain](https://www.konami.com/mg/mgs5/tpp/jp/story/) |
| 11 | vr_simulation | Cyan grid lip / dark synthetic structure | [Konami Legacy Collection](https://www.konami.com/mg/archive/mgs_tlc/) |
| 12 | patriots_ai | Violet simulation material / reconstructed dark panels | [Konami MGS2](https://www.konami.com/mg/archive/mg25th/truth/mgs2.html) |

The exact materials and 2D construction are original gameplay adaptations. References establish each environment's palette, historical setting and material language; they do not imply an official 1:1 terrain asset exists.
