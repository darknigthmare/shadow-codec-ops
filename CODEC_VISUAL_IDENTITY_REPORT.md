# Codec Visual Identity Report — v2.4.0

## Objective

Replace the former shared twin-portrait composition with actual era-specific presentation shells while preserving the same Codec Core Fidelity runtime: contact availability, shared frequencies, call subjects, incoming calls, saves, localization, voice packs and Director sequences.

## Implemented layouts

1. **MSX Military Radio** — hard-pixel text terminal, square portrait cells, compact transceiver controls and text buffer.
2. **MGS1 Shadow Moses Codec** — classic green CRT twin portraits, central tuner, signal rail and memory command strip.
3. **MGS2 Digital Codec** — blue tactical grid, bracketed feeds, priority route metadata and digital transmission panel.
4. **MGS3 Survival Radio** — physical field-radio casing, green LCD portrait windows, analog tuner needle, knobs, battery and signal telemetry.
5. **MGS4 Modern Codec** — widescreen secure video feeds, SOP sidebar, channel strip and cinematic lower-third dialogue.
6. **Peace Walker MSF Files** — dedicated paper dossier, MSF tabs, staff photo cards, file metadata and briefing transcript sheet.
7. **MGSV iDroid** — holographic communications deck, navigation rail, waveform, Intel card and transcript dock.
8. **VR Grid** — synthetic grid communication cell.
9. **Patriots Corruption** — broken panels, false readouts and unstable visual state.

## Runtime-specific presentation

- Per-era CALL, MEMORY, HISTORY and DATA labels.
- Per-era incoming-call cards.
- Per-era side panels for memory, routing, history and save data.
- Per-state incoming/connected animations.
- Reduced-motion fallback and responsive stacking.
- Theme status panel now reports layout ID, portrait mode and feature labels.

## Data changes

- Added `peace_walker_msf` theme pack.
- Peace Walker no longer reuses the MGSV theme.
- Peace Walker now exposes the Codec Simulator presentation in its available modes.
- Added `codecVisualIdentity.ts` as the single visual profile registry.

## Validation

- TypeScript / lint: PASS
- Tests: 79/79 PASS across 21 files
- Production build: PASS
- PWA validation: PASS
- Vite modules: 143
- Codec JS chunk: approximately 53.53 kB
- Codec CSS chunk: approximately 35.68 kB
- PWA precache: 68 entries / approximately 2530.87 KiB
