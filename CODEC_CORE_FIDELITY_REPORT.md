# Codec Core Fidelity Report — v2.3.0

## Scope

This pass focuses exclusively on the Codec Simulator core. It does not add another major application module.

## Runtime context

The Codec now runs inside a selected game/chapter/mission context. Each context defines:

- era;
- chapter and optional mission ID;
- playable character profiles;
- mission flags;
- contacts unlocked in that context;
- contacts explicitly blocked in that context.

The current release includes 17 context definitions.

## Contact availability

`contactAvailabilityEngine.ts` evaluates every contact against:

- static availability;
- current era;
- context allow/exclude lists;
- required and forbidden flags;
- Codec memory;
- manual-call restrictions;
- incoming-call restrictions.

Possible runtime access states are:

- available;
- locked;
- incoming-only;
- jammed;
- dead;
- unknown.

## Shared frequencies

`frequencyEngine.ts` no longer silently returns the first contact on a duplicated channel. It returns all exact candidates and marks the signal as ambiguous.

The Codec UI displays a channel router. The user must choose the intended operator before calling. MGS1 frequency 140.85 demonstrates this with Campbell and Naomi.

## Call subjects

Conversations can define:

- `subjectId`;
- `topicLabel`;
- `topicDescription`;
- `contextIds`;
- priority.

The Codec builds a subject menu per contact and selects the least-heard compatible conversation in that subject.

Conversation Studio can author and import these fields.

## Incoming call lifecycle

Incoming calls support:

- routine, priority and urgent levels;
- required or optional response;
- expiry timer;
- Accept;
- Ignore;
- automatic missed-call logging;
- automatic acceptance for expired required calls;
- queueing while another call is active;
- persistent inbox while the Codec screen is closed;
- live browser event dispatch for other modules.

## History and recall

History entries now store:

- completed;
- aborted;
- ignored;
- missed;
- failed.

The history panel can prepare a contact recall, switch era/context when necessary, restore the frequency and preselect the contact route.

## Codec save data

Three local Codec slots preserve:

- era;
- context;
- player profile;
- frequency;
- selected visual theme;
- Codec memory;
- recent call history.

Save-contact conversations automatically open the save panel when completed.

## Compatibility

- old call history is migrated to the new disposition field;
- old custom conversations receive role-based subject defaults;
- imported Studio conversations retain localization, timecodes, portraits and audio paths;
- save schema is version 11.

## Automated validation

- TypeScript/lint: PASS
- test files: 20
- tests: 75/75 PASS
- production build: PASS
- PWA validation: PASS
