# Codec 6 — Export, Replay & Final QA

Version: 2.8.0

## Delivered

- PNG capture of the active Codec composition using an in-browser DOM-to-canvas renderer.
- WebM recording through Canvas `captureStream` and `MediaRecorder` when the browser supports it.
- Complete Codec archive JSON export including context, memory, history and replay library.
- Persistent autonomous replay records containing contact, theme, context and a full conversation snapshot.
- Replay play, delete, single export, library export and JSON import.
- Automatic replay archiving preference.
- Stream overlay mode with transparent application background and reduced chrome.
- Direct overlay launch with `?module=codec&overlay=1`.
- Final QA matrix covering every era with context, contact, conversation, visual identity, asset pack and signal intelligence.

## Browser notes

PNG and WebM depend on browser support for SVG `foreignObject`, Canvas and `MediaRecorder`. Unsupported browsers show a clear status message rather than failing silently. WebM recording intentionally captures the Codec visual surface only; microphone/system audio capture is not requested.

## Persistence

- `codec-replay-library`
- `codec-stream-overlay`
- save schema 14
