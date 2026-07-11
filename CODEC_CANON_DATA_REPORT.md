# Codec Canon Data Expansion Report — v2.5.0

## Scope

Passe Codec 3 expands the data layer without pretending that every game uses the same manually dialed radio model.

The simulator now distinguishes:

- canon characters and roles;
- official/manual frequencies;
- in-game contact references;
- modern network, briefing and iDroid channels;
- synthetic simulator routing IDs;
- original lore-grounded dialogue versus verbatim canon dialogue.

## Coverage snapshot

- 55 contacts
- 32 game/chapter/mission contexts
- 55 contact-availability rules
- 102 built-in bilingual conversations
- 13 registered source records
- 56 channel variants
- 30 canon numeric channel variants
- 26 non-canon simulator/network/briefing variants
- 9 era coverage records

## Era expansion

### Metal Gear / Metal Gear 2

- Outer Heaven support team: Big Boss, Schneider, Diane and Jennifer.
- Zanzibar Land support team: Campbell, Miller, Kasler, Holly and Jacobsen.
- Separate mission contexts avoid merging the two support networks.
- Frequency metadata can carry chapter/context restrictions.

### Metal Gear Solid

- Full core support roster retained.
- Shared 140.85 routing remains explicit for Campbell and Naomi.
- Specialist, field, save and secret topics are differentiated.

### Metal Gear Solid 2

- Tanker and Plant support/save routes are separated.
- Pliskin, Stillman, Mr. X and Emma are chapter-scoped.
- Otacon can expose a context/topic-specific save channel variant.

### Metal Gear Solid 3

- Major Zero, Para-Medic, The Boss, SIGINT and EVA are represented.
- The Boss is blocked after the defection context.
- Save, medical, weapons, technology and field topics are separated.

### Metal Gear Solid 4

- Otacon, Drebin, Rose, Campbell, Naomi, Meryl and Raiden are represented.
- Contacts are canon, while numeric route values are explicitly marked as synthetic network IDs.

### Peace Walker

- Miller, Paz, Huey, Amanda, Chico, Cécile, Strangelove, Gálvez and the Mammal Pod AI are represented.
- The simulator uses MSF briefing/intel labels instead of claiming classic numeric frequencies.

### Metal Gear Solid V

- Miller, Ocelot, Code Talker, Huey, Quiet, Pequod and Skull Face are represented.
- iDroid/radio routes are explicitly marked as synthetic routing identifiers.

## Canon Data Dossier

The Codec status panel now exposes, for the selected contact:

- canon or simulation status;
- game and timeline year;
- role and aliases;
- contact specialties;
- channel type and variants;
- context availability notes;
- source registry entries.

## Canon Coverage Matrix

Every era now has a visible matrix containing:

- contact/context/conversation counts;
- channel policy;
- what is currently covered;
- remaining known gaps.

The matrix is integrity-tested against the live JSON files so its counts cannot silently drift.

## Conversation policy

All 102 built-in dialogue records are tagged as original lore-grounded simulation dialogue. They are not represented as verbatim game transcripts.

## Frequency engine

The engine now:

- scans all contact channel variants;
- resolves alternate save/topic channels;
- reports the matched variant;
- routes modern synthetic channels without displaying them as official frequencies;
- uses context and subject when selecting the preferred contact channel.

## Validation

- TypeScript / lint: PASS
- Automated tests: 86/86 PASS
- Test files: 22
- Production build: PASS
- PWA validation: PASS
- Vite modules transformed: 146
- PWA precache: 67 entries / approximately 2645.23 KiB
