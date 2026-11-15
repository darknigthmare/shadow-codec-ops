# Authored mecha projectiles

One OpenAI built-in imagegen source board, 4 rows × 4 distinct in-flight phases. Original fan-made bitmap interpretations, not copied official game assets.

Rows: Sahelanthropus railgun (white/orange), MGS2 RAY water cutter (white/blue fluid), MG2 Metal Gear D autocannon tracer (copper/yellow), Peace Walker Pupa shock-unit impulse (branched white/blue electricity).

Source: `mecha-projectiles-openai.png`. Exact prompt and online references: `prompts.json`. Source/output hashes and per-frame crop/scale/bounds: `manifest.json`.

Importer: `scripts/importMechaProjectileBoard.py --source <board> [--output-root <staging-root>]`.
Only grid crop, magenta alpha extraction (including pink key spill), one uniform transform per row and RGBA assembly are performed. No painted repairs, generated missing frames, sprite mirroring or pose interpolation.

Four runtime sheets are 768×64 RGBA PNG, each 4 frames of192×64. All four output sheets were inspected individually at export resolution; all16phases are complete and separated.

The registry returns authored clips and world-space presentation/hitbox/muzzle values. Display sizes differ per weapon; the existing24×8 ballistic hitbox is retained. The muzzle offset is relative to the live physics-body center, not the padded sprite canvas. This remains a travelling-ballistic gameplay adaptation: the RAY water visual does not create a fluid/continuous-beam simulation, and Pupa does not gain a railgun.

Production staging used G:\CodexBuild\shadowcodecops\asset-staging to avoid a full C drive. The selected source and four runtime sheets were subsequently imported into the project after space was restored. Temporary base64 was deleted only after PNG signature validation.
