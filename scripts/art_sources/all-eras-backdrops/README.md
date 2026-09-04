# Side Ops all-era backdrop sources

These eleven source paintings are original fan-made assets generated with
OpenAI ImageGen. Official Konami pages were used only as visual and narrative
reference; no official game texture, screenshot, logo or key art is shipped in
the runtime files.

The shared Side Ops runtime needs a readable side-scrolling playfield, so every
painting follows the same contract:

- wide environmental establishing shot with no people, vehicles, text or UI;
- gameplay-safe lower band with subdued contrast behind actors and pickups;
- strong era-specific architecture, weather, terrain and palette;
- no baked HUD, labels, logos, emblems, watermarks or borders;
- normalized to a 960 x 540 WebP with `normalizeSideOpsBackdrop.py`.

| Visual pack | OpenAI source | Runtime | Official reference |
| --- | --- | --- | --- |
| MG1 | `mg1-outer-heaven-openai.png` | `/sideops/backdrops/mg1-outer-heaven.webp` | [Konami MG history](https://www.konami.com/mg/archive/mg25th/truth/mg.html) |
| MG2 | `mg2-zanzibar-land-openai.png` | `/sideops/backdrops/mg2-zanzibar-land.webp` | [Konami MG2 history](https://www.konami.com/mg/archive/mg25th/truth/mg2.html) |
| MGS1 | `mgs1-shadow-moses-openai.png` | `/sideops/backdrops/mgs1-shadow-moses.webp` | [Konami MGS legacy archive](https://www.konami.com/mg/archive/mgs_tlc/) |
| MGS2 Tanker | `mgs2-tanker-openai.png` | `/sideops/backdrops/mgs2-tanker.webp` | [Konami Tanker chapter](https://www.konami.com/mg/archive/mgs2/english/story/story_tanker.html) |
| MGS2 Plant | `mgs2-plant-openai.png` | `/sideops/backdrops/mgs2-plant.webp` | [Konami Plant chapter](https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html) |
| MGS3 | `mgs3-groznyj-grad-openai.png` | `/sideops/backdrops/mgs3-groznyj-grad.webp` | [Konami MGS3 history](https://www.konami.com/mg/archive/mg25th/truth/mgs3.html) |
| MGS4 | `mgs4-middle-east-openai.png` | `/sideops/backdrops/mgs4-middle-east.webp` | [Konami MGS4 history](https://www.konami.com/mg/archive/mg25th/truth/mgs4.html) |
| Peace Walker | `peace-walker-mother-base-openai.png` | `/sideops/backdrops/peace-walker-mother-base.webp` | [Konami Mother Base](https://www.konami.com/mg/archive/mgs_pw/jp/base/base.html) |
| Ground Zeroes | `mgsv-ground-zeroes-camp-omega-openai.png` | `/sideops/backdrops/mgsv-ground-zeroes-camp-omega.webp` | [Konami GZ introduction](https://www.konami.com/mg/mgs5/gz/jp/introduction/index.php) |
| The Phantom Pain | `mgsv-phantom-pain-afghanistan-openai.png` | `/sideops/backdrops/mgsv-phantom-pain-afghanistan.webp` | [Konami TPP story](https://www.konami.com/mg/mgs5/tpp/jp/story/) |
| Patriots AI | `patriots-ai-gw-openai.png` | `/sideops/backdrops/patriots-ai-gw.webp` | [Konami MGS2 history](https://www.konami.com/mg/archive/mg25th/truth/mgs2.html) |

VR Simulation deliberately reuses the already generated
`mgs1VrEnvTileMatrixVoid` surface from the exhaustive MGS1 VR environment
pack instead of adding a twelfth redundant backdrop.
