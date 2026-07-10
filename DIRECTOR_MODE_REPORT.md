# Codec Director Mode Report — v2.2

## Scope

Passe 23 introduces a reusable narrative sequencing layer shared by Codec, Campaign Ops and Side Ops.

## Runtime model

A sequence is a versioned JSON document with an entry node, contexts, initial variables and a node collection. The runtime stores current node, variables, choice history, timeline history, status and outcome.

Supported node kinds:

- `line`
- `choice`
- `interrupt`
- `event`
- `delay`
- `jump`
- `end`

## Branching and effects

Choices can require variable conditions and apply effects:

- `set`
- `increment`
- `decrement`
- `toggle`
- `emit`

Comparison operators include equality, inequality, numeric comparisons and truthy/falsy checks.

## Interruption stack

An interrupt can push another sequence on top of the current one. `resume` returns to the parent after the child outcome. `replace` terminates the parent and transfers control to the interrupt sequence.

## Camera cues

Line nodes support `static`, `push_in`, `pull_back`, `shake`, `focus_left`, `focus_right` and `glitch_cut`. Reduced-motion settings disable these animations.

## Cross-module events

The lightweight Director bus can launch a sequence globally and dispatch runtime events. Campaign events are persisted as campaign variables and narrative log entries. Side Ops support events modify the active loadout through the Phaser event bridge.

## Authoring

The Codec Director workstation provides sequence metadata, contexts, timeline ordering, node inspectors, editable node/option condition and effect JSON, validation, playtest, JSON import/export, event monitoring and outcome history. Imported sequences preserve conditional logic and effects. Conversation Studio can convert any conversation into a linear Director sequence.

## Storage

- `director-custom-sequences`
- `director-event-log`
- `director-outcomes`

Global save schema: 10.

## Validation

- TypeScript: PASS
- 59/59 tests: PASS
- Production build: PASS
- PWA check: PASS
