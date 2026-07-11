# Codec Radio Scan & Signal Intelligence Report — v2.6.0

## Scope

Passe Codec 4 adds a persistent radio-intelligence layer on top of the existing manual frequency and CALL systems. It does not replace normal contact routing: it lets the operator discover, track, intercept and decode carriers that may not yet be visible in MEMORY.

## Spectrum runtime

- interactive SVG spectrum;
- era-wide band and local ±0.8 MHz view;
- click-to-tune;
- previous/next peak acquisition;
- automatic sweep that stops on a lockable carrier;
- Gaussian signal falloff based on distance from the active carrier;
- 72 percent stable-lock threshold;
- time-phase simulation for intermittent carriers;
- time-based drift around a signal's documented center frequency.

## Signal library

The integrated library contains 24 original, lore-grounded simulation signals across MSX, MGS1, MGS2, MGS3, MGS4, Peace Walker, MGSV, VR and Patriots contexts. Signal families include:

- known contact carriers;
- classified/secret contacts;
- enemy or security interceptions;
- numbers stations;
- encrypted packets;
- AI or Patriots anomalies;
- decoys and false carriers.

All authored transmissions are marked as simulation content. Documented contact frequencies remain governed by the Canon Data registry and are never relabeled as invented official frequencies.

## Decryption

Four puzzle families are supported:

- codeword;
- frequency sequence;
- checksum;
- context key.

Puzzles support localized prompts/hints, normalized answers and optional attempt limits. Successful decoding can award Intel, badges, contacts or conversations.

## Persistent intelligence dossier

The `radio-intelligence-state` store records:

- discovered/intercepted/decoded status;
- first and last detection timestamps;
- context and frequency;
- decryption attempts;
- operator notes;
- total scans and total Intel;
- unlocked rewards.

The dossier can be exported as JSON. Save migration schema 12 initializes and normalizes this state for existing users.

## Cross-module behavior

A decoded or intercepted signal can:

- route the correct Codec contact;
- add a contact to MEMORY;
- launch an existing conversation;
- award Intel or a badge;
- appear in Lore as the Signal Intelligence system.

## Validation

- 98/98 tests pass across 24 files;
- TypeScript/lint passes;
- production build passes;
- PWA validation passes;
- Phaser remains lazy-loaded.
