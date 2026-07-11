# Franchise Codec Fidelity Audit

## Scope

This pass compares the simulator's presentation and interaction model with official manuals, official Konami archive pages and contemporaneous gameplay documentation. The application remains a private fan-made simulation and does not embed extracted UI textures, voices or sound files from the games.

## Corrections

### Metal Gear / Metal Gear 2

- Retains paused manual tuning, memory contacts and incoming CALL behavior.
- Distinguishes Outer Heaven's green transceiver from Zanzibar Land's blue-gray Codec.
- Adds the MG2 numeric keypad treatment and dual-portrait composition.

### Metal Gear Solid

- Preserves the black/phosphor-green twin portrait layout, central frequency and CRT transmission behavior.
- Character emotional portraits remain compatible with local Voice Pack overrides.

### Metal Gear Solid 2

- Removes the inaccurate blue-glass direction.
- Restores green monochrome illustrated portraits, central frequency routing and restrained digital framing.
- Records camera movement and positive/negative response behavior in the fidelity profile.

### Metal Gear Solid 3

- Replaces the invented physical radio casing with a muted grayscale/olive radio overlay.
- Uses MEM, SEND and TUNE labels, a frequency readout and page index.
- Keeps manual frequencies and special radio uses such as healing, fire support and alert cancellation.

### Metal Gear Solid 4

- Treats communication as a secure contextual video link using modeled spaces.
- Removes classic numeric frequency tuning from the interface.

### Peace Walker

- Separates the non-pausing Real-Time Codec state from the pre-mission Briefing Files library.
- Keeps the MSF mission-file hierarchy and cassette-oriented briefing presentation.

### Metal Gear Solid V

- Treats iDroid, radio chatter and cassette playback as the communication system.
- Removes classic frequency controls and retains the module rail, waveform and intel cards.

## Audio

Every generation now uses a procedural multi-tone signature instead of a single generic beep. Profiles differ in waveform, pitch, duration and cadence. No original game audio is distributed.

## Runtime isolation and responsive QA

- Switching era or mission context now terminates the active call, clears pending calls from the previous context and stops its ambience.
- Desktop screenshots were verified for MGS2, MGS3, MGS4 and MGSV at 1440x900.
- Mobile MGS1 was verified at 390x844 with both drawers closed and no horizontal overflow.
- MGS4 and MGSV were browser-checked to contain no classic frequency input.

## Principal references

- MG2 online manual: https://metalgear.konami.net/manual/mc1/mg2/pc/en/page05.html
- MGS2 official archive: https://www.konami.com/mg/archive/mgs2/english/mr/secret_en.html
- MGS2 official Codec background: https://www.konami.com/mg/archive/mgs2_sub/english/alldogtags/codec_1024t.html
- MGS3 support guide: https://www.konami.com/mg/archive/ssg/advice_3/advice_mgs3_10.html
- Peace Walker official mission/briefing page: https://www.konami.com/mg/archive/mgs_pw/jp/mission/select.html
- MGS4 contemporary hands-on description of the 3D Codec: https://www.gamespot.com/articles/tgs-07-metal-gear-solid-4-hands-on/1100-6179194/
