# Voice Pack & Animated Portrait Report — v2.1

## Delivered

- Local voice-pack manifest import, enable/disable and removal.
- Strict local asset policy for `/audio/` and `/portraits/` paths.
- Per-conversation/per-line voice replacement resolution.
- Per-character/per-expression portrait replacement resolution.
- Animated Codec portrait runtime with speaking pulse, scan, warning and glitch states.
- Accessibility support through reduced-motion media queries and a dedicated setting.
- Example manifest generator in Settings.
- Save schema 9 migration and automated coverage.

## Manifest schema

```json
{
  "schemaVersion": 1,
  "id": "my_local_voice_pack",
  "name": "My Local Voice Pack",
  "version": "1.0.0",
  "locale": "fr",
  "era": "mgs1",
  "assets": [
    {
      "id": "intro-0",
      "conversationId": "mgs1_campbell_default",
      "lineIndex": 0,
      "source": "/audio/custom/campbell_intro.ogg"
    }
  ],
  "portraits": [
    {
      "characterId": "campbell_mgs1",
      "expression": "serious",
      "image": "/portraits/custom/campbell_serious.png"
    }
  ]
}
```

No copyrighted voice or portrait assets are bundled.
