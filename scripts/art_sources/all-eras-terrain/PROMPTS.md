# OpenAI terrain generation prompts

## Ground atlas

Use case: stylized-concept.
Asset type: production sprite terrain texture atlas for a side-scrolling tactical stealth video game.
Primary request: Create ONE original game texture atlas containing EXACTLY 12 full-bleed surface texture panels in a strict 4-column by 3-row grid. All panels equal size, grid fills the entire image edge to edge. No gaps, margins, borders, labels or text.
Each cell: orthographic SIDE VIEW of a walkable ground cross-section, absolutely straight level top edge at the cell's top, thin surface cap in upper 12 percent, dense detailed material side-face filling remaining 88 percent to all edges. NOT a perspective block or isolated island. Each cell is horizontally seamless: its left and right edge material/color must join when repeated. No top/bottom tiling requirement.
Visual style: polished hand-painted pixel art with crisp controlled edges and material grain, detailed believable tactical military environments, atmospheric but readable. Neutral even illumination with no focal light spots. Original fan art, visually informed by Konami Metal Gear environment references, no copied official asset.
CELL ORDER LEFT TO RIGHT, TOP TO BOTTOM:
Row1 col1 MG1 Outer Heaven: dusty olive military concrete surface over weathered dark green-gray bunker concrete with tiny pebbles; col2 MG2 Zanzibar Land: mossy olive stone paving over rugged gray-brown masonry; col3 MGS1 Shadow Moses: thin level pale snow and ice crust over dark cold blue steel/concrete; col4 MGS2 Tanker: wet dark navy blue-gray steel deck cap over riveted ship steel face, subtle rain sheen.
Row2 col1 MGS2 Big Shell: orange-rust industrial walkway cap over oxidized orange steel panels and gray seams; col2 MGS3 Groznyj Grad forest/depot: flat muddy olive grass lip over compact dark brown earth and subtle roots; col3 MGS4 Middle East: dusty warm beige concrete paving over damaged pale sandstone masonry; col4 Peace Walker Costa Rica: damp jungle soil with restrained green grass at top over rich brown earth with roots and stones.
Row3 col1 MGSV Ground Zeroes Camp Omega: rain-soaked muted green-gray tarmac over weathered concrete with subtle moss; col2 MGSV Phantom Pain Afghanistan: dry sandy tan rock surface over stratified golden-brown sandstone; col3 VR Simulation: flat thin cyan luminous grid floor lip over dark navy blue segmented synthetic material with small cyan line detail, no text; col4 Patriots AI reconstruction: flat violet illuminated edge over near-black purple segmented simulation panels, subdued purple data-like line detail, no text.
Composition invariants: exactly 4 columns and 3 rows, twelve DIFFERENT cells; materials touch all four edges of each cell; all top surfaces flat and aligned to cell top; no protruding grass above cell boundary; no floating objects, platforms in perspective, characters, weapons, machines, logos, emblems, words, letters, numbers, UI, watermark or decorative frame. Keep grounded natural textures for historical cells, neon only in last two.

## Structure atlas

Use case: stylized-concept.
Asset type: production platform/catwalk texture atlas for a side-scrolling tactical stealth game.
Primary request: ONE original atlas of EXACTLY 12 full-bleed material panels in a strict 4 columns x 3 rows grid, equal square cells, perfectly fills whole image without gaps or labels. Each cell is a FRONT ORTHOGRAPHIC side elevation of an elevated walkable structure cross-section. A straight narrow top walking lip at the very top of each cell (about12% height), then continuous structural side-face down to the bottom. Every texture tile must repeat seamlessly LEFT TO RIGHT at all heights. Treat as actual surface texture maps, not isolated blocks, not concept backgrounds.
Style: polished hand-painted pixel game textures, crisp deliberate material detail, realistic military industrial construction, restrained palette, readable with small characters above. Even lighting, no baked cast shadow outside material.
Grid order row-major:
1 MG1 Outer Heaven: old olive-drab reinforced bunker walkway, stone/concrete slab edge and utilitarian green iron reinforcement below.
2 MG2 Zanzibar Land: dark olive-gray military laboratory walkway, weathered concrete cap with heavy riveted olive steel beams underneath.
3 MGS1 Shadow Moses: cold blue-gray grated maintenance catwalk rim with thin frost at top, dark steel beams and compact vents below.
4 MGS2 Tanker: rain-wet dark navy ship walkway with scuffed nonslip tread lip, steel I-beam structural face with rivets and restrained corrosion.
5 MGS2 Big Shell: rust-orange offshore maintenance walkway edge, orange-painted thick beams with gray horizontal reinforcement and dark bolts.
6 MGS3 Groznyj Grad: 1964 utilitarian timber depot catwalk, worn dark wooden plank lip and horizontal brown lumber support beneath with simple iron brackets, no modern electronics.
7 MGS4 Middle East: damaged sand-beige rooftop cornice and masonry with horizontal reinforcing slabs, subtle cracks and dust.
8 Peace Walker Costa Rica: 1974 jungle supply gantry, damp greenish brown timber planks and utilitarian dark olive metal supports, moss in crevices.
9 MGSV Ground Zeroes: Camp Omega wet gray-green military service walkway, concrete cap over dark galvanized modular beam face, rain staining.
10 MGSV Phantom Pain Afghanistan: Soviet outpost sunbleached sandy concrete platform edge with dusty rust-brown metal reinforcements.
11 VR Simulation: precise dark navy synthetic platform cap with one thin cyan emissive edge; blue-black solid segmented geometric beam face.
12 Patriots AI: dark near-black purple reconstruction platform cap with thin violet light strip, angular dark structural panels and subtle purple segmented circuit lines.
Constraints: all12cells fully opaque materials from edge to edge, exactly4x3grid. Allwalkableupperedges must be FLAT horizontal and flush with top of each cell. No railings or posts or items protruding above top edge, no stairs, no gaps/holes exposing background, no scenery, no cast shadow onto background, no perspective endcaps, no separate object cutouts. Leftandrightmaterialedges match for horizontal repetition. No people, objects, vehicles, weapons, machines, labels, letters, numbers, logos, emblems, UI, watermark, border. Only last2cells neon. Original fan-made textures referencing the games' material vocabulary, do not copy official textures.
