# Dedicated MG1 / MGS1 environment production

Three original fan-made atlases were produced with the built-in OpenAI image generator.
All twelve source panels and all twelve normalized runtime WebPs were displayed and
visually inspected. No official screenshot, texture, character, vehicle or machine is
embedded in these backgrounds. These are side-view adaptations for the condensed game
route, not claims of pixel-exact official level reconstruction.

## Delivered interiors

| Atlas | Four runtime panels |
| --- | --- |
| MG1 | prison, industrial corridor, empty TX-55 hangar, underground command room |
| MGS1 | underground dock, armory, laboratory, empty REX hangar |
| MGS1 additional | holding cells, Mantis study, rocky wolfdog cave, refrigerated storage |

Sources are `*-interiors-openai.png`; exact prompts are in `prompts.json`.
Each `*-manifest.json` records the original source SHA-256, dimensions, reference URLs,
crop rectangles, normalization and individual runtime hashes. Outputs are under
`public/sideops/backdrops/dedicated/`, each960x540WebP.

The import script detects the2x2cyan guides, excludes them and normalizes each authored
panel with LANCZOS. It does not synthesize architecture, move props or alter painted content.

## Runtime integration

- `Mg1OuterHeavenScene` and `Mgs1ShadowMosesScene` preload their own dedicated interiors.
- Each scene selects one viewport-anchored background from its art-only sector registry.
  This does not change boss activation, gates, triggers, combat or route progression.
- Existing outdoor paintings are reused only for open yards, rooftops, canyon and snowfield.
  Every enclosed sector has an interior painting; failed loads retain opaque fallback art.
- Old geometric skyline blocks are omitted where an authored background replaces them.
- Static platform/crate bodies retain their original positions, texture dimensions, scale,
  enabled state and collision groups. Separate TileSprite/Image coatings hide only their
  old visual texture once replacement art is available.
- MGS1 floor coatings split at sector boundaries without splitting the physics body.
  Snow stays outside; the study and cave retain the natural floor in their painting.
- Three separately authorized MGS1 pickup approach supports were added after QA proved
  CARD1 and the REX archive were beyond jump reach: center740/top430, center9460/top438,
  center9530/top366, all128x16. No existing platform moved.

## Verification

`dedicatedSceneArtwork.test.ts` has ten tests covering sector continuity, indoor identity,
preload caching, exact legacy geometry, the three new supports, body-bound coatings,
snow boundary clipping, painted study/cave floors, missing-texture fallback and all
twelve asset hashes. Together with MG1/MGS1 mission contracts,30targeted tests pass.
TypeScript lint passes. Browser gameplay QA and release verification are handled by
the main task and the dedicated gameplay QA agent.
