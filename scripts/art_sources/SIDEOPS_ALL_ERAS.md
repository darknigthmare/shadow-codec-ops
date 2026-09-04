# Side Ops all-era visual source contract

The PNG files in the adjacent `*-sideops` directories are uncropped
OpenAI-generated sources. They are original fan-made game assets, not extracted
Konami artwork or screenshots.

## Fidelity gate

- Start from an official Konami character, story, vehicle, or mission page.
- Match the correct game era, costume, equipment, silhouette, palette, and age.
- Keep the whole sprite readable from a 2D gameplay camera with no cropped limb,
  weapon, wheel, rotor, antenna, or machine section.
- Reject cross-era drift (for example Revengeance Raiden in MGS2, MGSV gear in
  MGS3, or MGS4 PMC equipment in Peace Walker).
- Regenerate an asset whenever one of those checks fails.
- Do not include logos, labels, UI, watermarks, copied key art, or backgrounds in
  runtime sprites.

## Official reference set

- Metal Gear / Outer Heaven: https://www.konami.com/mg/archive/mg25th/truth/mg.html
- Metal Gear Solid / Shadow Moses: https://www.konami.com/mg/archive/mgs/about_mgs/index.html
- Metal Gear 2: https://www.konami.com/mg/history/jp/ja/mg2
- MGS2: https://www.konami.com/mg/history/jp/ja/mgs2
- MGS2 Plant chapter: https://www.konami.com/mg/archive/mgs2/english/story/story_plant.html
- MGS3: https://www.konami.com/mg/history/jp/ja/mgs3
- MGS4: https://www.konami.com/mg/history/jp/ja/mgs4
- Peace Walker: https://www.konami.com/mg/history/jp/ja/mgspw
- Peace Walker characters: https://www.konami.com/mg/archive/mgs_pw/en/character/index.html
- Ground Zeroes: https://www.konami.com/mg/mgs5/gz/jp/introduction/index.php
- The Phantom Pain: https://www.konami.com/mg/mgs5/tpp/jp/story/
- Sahelanthropus official model reference: https://www.konami.com/mg/mgs5/tpp/jp/goods/item_pla_sahelanthropus.html
- MGS Integral VR Missions: https://www.konami.com/mg/archive/integral/vr/index.html

## Corrective regeneration — 2026-09-04

- `mgs3-sideops/mgs3-shagohod-openai.png` was regenerated with OpenAI
  ImageGen after a fidelity review. The accepted source restores two dominant
  front screw drives, the raised Cold War cockpit, rear rocket stage, and the
  complete nuclear-launch silhouette in a gameplay-readable three-quarter view.
- `mgsv-tpp-sideops/mgsv-sahelanthropus-openai.png` was regenerated with OpenAI
  ImageGen after a fidelity review. The accepted source keeps the ST-84's
  REX-derived mass, mechanical skull-marked head armor, railgun, dedicated
  shield, Archaea Blade, and full reverse-jointed legs in an elevated
  three-quarter gameplay view.
- Both files are original fan-made illustrations. Their generated checkerboard
  backdrops were converted to genuine PNG alpha before runtime normalization;
  neither source contains copied Konami artwork, text, logos, or UI.

## MG1 and MGS1 Builder props - 2026-09-04

- `mg1-sideops/mg1-outer-heaven-supply-crate-openai.png` is an original
  OpenAI ImageGen source created for the 1987 Outer Heaven pack: a compact
  late-Cold-War olive wooden/steel field crate in a readable three-quarter
  top-down gameplay view. The accepted generation contains no text, logo, UI,
  character, or copied official artwork.
- `mgs1-sideops/mgs1-shadow-moses-supply-container-openai.png` is the approved
  original OpenAI ImageGen source for the Shadow Moses Builder pack.
- Both sources are normalized to transparent 48x40 RGBA runtime sprites under
  `public/sideops/{mg1,mgs1}/props/`. Generated checkerboard pixels are removed
  during normalization and the uncropped originals remain here for provenance.

Each runtime pack is kept under `public/sideops/<visual-pack>/` and is covered
by a physical-file registry test. The final runtime routing test locks each
`visualPackId` to its own guard, reinforcement, boss, projectile, impact VFX,
and representative environment prop.
