# MG1 Complete Codec and Side Ops Pack

Mission 003 recreates the 1987 MSX2 Operation Intrude N313 as an original fan-made side-scrolling simulation. It does not copy game sprites or dialogue verbatim.

## Included visual assets

- 30 lossless 512 x 512 Codec portraits: Solid Snake, Big Boss, Schneider, Diane and Jennifer, each with six expressions.
- 23 transparent 2D actor sprites plus Solid Snake, all preserved as static fallback identities.
- 24 dedicated animated spritesheets / 387 hand-rigged frames: idle, movement, role-correct action, impact and death/destruction cycles, plus Snake's C4 and remote-missile poses.
- 12 projectile textures and 9 animated VFX sheets, including the gun-camera laser and its impact effect.
- Typed preload/animation registry, exact-dimension and binary-alpha tests, fixed original-size hitboxes and automatic static fallbacks.

## Playable Mission 003

- Full ordered encounter route: Shotmaker, Machinegun Kid, Hind D, Tank, Bulldozer, Fire Trooper, both Bloody Brad TX-11 units, Dirty Duck, TX-55 and Big Boss.
- Dirty Duck's three POWs can be hit and apply the original-style rank penalty; the clean objective is only credited when all survive unharmed.
- TX-55 remains stationary and non-firing, with the sixteen-charge ordered left/right leg sequence.
- Remote missiles freeze Snake while being steered.
- Original MSX display limits are represented: four player shots, three mines and one plastic explosive on screen.
- Chaff, Twin Shot and the NES Supercomputer replacement are intentionally excluded from MG1.

## Art production

The character art was created with OpenAI built-in image generation using two constrained prompt families:

1. monochrome green MSX Codec head-and-shoulder portraits with expression-specific variants;
2. isolated late-1980s MSX2 pixel sprites on a chroma-magenta field, with canon-safe per-character clothing, silhouette and equipment anchors.

Chroma backgrounds were removed, sprites were normalized with nearest-neighbour scaling, and projectile/VFX textures were produced deterministically in project code.

The animation pass keeps those OpenAI-authored identity anchors intact and uses a deterministic nearest-neighbour rig for limbs, weapons, treads, rotors, doors, warning lights and destruction pieces. It is wired both into Mission 003 and MG1 missions launched from the Mission Builder. Canon-specific sheets deliberately omit invented actions: the gun camera has no locomotion clip, the TX-55 has no movement or firing clip, the Hind D stays fixed, and the Bulldozer only advances/crushes.

## Canon references

- [Konami MG1 character archive](https://www.konami.com/mg/archive/mg/chara.html)
- [Konami 25th anniversary MG1 dossier](https://www.konami.com/mg/archive/mg25th/truth/mg.html)
- [Official MG1 MSX manual](https://metalgear.konami.net/manual/mc1/mg1_msx/pc/en/index.html)
- [Official weapons page](https://metalgear.konami.net/manual/mc1/mg1_msx/pc/en/page10.html)
- [Official equipment page](https://metalgear.konami.net/manual/mc1/mg1_msx/pc/en/page11.html)
- [MSX2 sprite silhouette cross-check](https://www.spriters-resource.com/msx2/metalgear/)
- [MSX boss mechanics reference](https://gamefaqs.gamespot.com/msx/578853-metal-gear/faqs/35361)
- [MSX walkthrough cross-check](https://thesnakesoup.org/metal-gear-msx-walkthrough/)

## Verification gates

- TypeScript lint/typecheck
- complete Vitest suite
- production Vite/PWA build
- PWA manifest/service-worker check
- local browser launch, Mission 003 selection, Phaser canvas render and console/page-error inspection
