"""Build the MGS1 VR gameplay art pack from OpenAI-authored source atlases.

The source boards are identity/style anchors.  This builder extracts their
magenta-keyed cells, turns the four active actors into deterministic animation
sheets, and emits exact-size Phaser assets for weapons, projectiles, VFX and
the Mystery, Photoshoot and Ninja special modes.
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from pathlib import Path

from PIL import Image, ImageDraw

import build_mgs1_vr_environment_assets as env
import generate_mg1_actor_animations as rig
import generate_mgs1_actor_animations as mgs1_anim


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "art_sources" / "mgs1-vr"
OUTPUT = ROOT / "public" / "vr" / "mgs1" / "gameplay"


@dataclass(frozen=True)
class StaticSpec:
    atlas: str
    columns: int
    rows: int
    index: int
    output: str
    size: tuple[int, int]


@dataclass(frozen=True)
class ActorSpec:
    index: int
    output: str
    frame_size: tuple[int, int]
    profile: str
    expected_frames: int


@dataclass(frozen=True)
class EffectSpec:
    atlas: str
    columns: int
    rows: int
    index: int
    output: str
    frame_size: tuple[int, int]
    frame_count: int
    motion: str


CHARACTER_ATLAS = "vr-special-characters-openai-atlas.png"
WEAPON_ATLAS = "vr-weapons-openai-atlas.png"
PROJECTILE_VFX_ATLAS = "vr-projectiles-vfx-openai-atlas.png"
SPECIAL_VFX_ATLAS = "vr-special-vfx-openai-atlas.png"
MYSTERY_ATLAS = "vr-mystery-evidence-openai-atlas.png"
PHOTOSHOOT_ATLAS = "vr-photoshoot-openai-atlas.png"
MODULAR_PROPS_ATLAS = "vr-modular-props-openai-atlas.png"


ACTORS = (
    ActorSpec(0, "characters/solid-snake-vr-sheet.png", (48, 48), "snake", 23),
    ActorSpec(1, "characters/genome-soldier-vr-sheet.png", (48, 48), "genome", 18),
    ActorSpec(2, "characters/cyborg-ninja-vr-sheet.png", (64, 64), "ninja", 23),
    ActorSpec(3, "characters/genola-vr-sheet.png", (96, 96), "genola", 17),
)


STATIC_CHARACTERS = (
    StaticSpec(CHARACTER_ATLAS, 3, 3, 4, "characters/meryl-protected-vr.png", (64, 40)),
    StaticSpec(CHARACTER_ATLAS, 3, 3, 5, "characters/snake-disguise-vr.png", (40, 56)),
    StaticSpec(CHARACTER_ATLAS, 3, 3, 6, "characters/mystery-soldier-vr.png", (40, 56)),
    StaticSpec(CHARACTER_ATLAS, 3, 3, 7, "characters/naomi-photoshoot-vr.png", (40, 64)),
    StaticSpec(CHARACTER_ATLAS, 3, 3, 8, "characters/mei-ling-photoshoot-vr.png", (40, 64)),
)


WEAPONS = tuple(
    StaticSpec(WEAPON_ATLAS, 4, 2, index, f"weapons/{slug}.png", (48, 28))
    for index, slug in enumerate(("socom", "famas", "psg1", "grenade", "c4", "claymore", "stinger", "nikita"))
)


PROJECTILES = tuple(
    StaticSpec(PROJECTILE_VFX_ATLAS, 4, 4, index, f"projectiles/{slug}.png", size)
    for index, (slug, size) in enumerate(
        (
            ("socom-round", (10, 4)),
            ("famas-tracer", (16, 4)),
            ("psg1-round", (16, 4)),
            ("grenade", (12, 12)),
            ("c4-charge", (16, 12)),
            ("claymore-mine", (18, 14)),
            ("stinger-missile", (28, 10)),
            ("nikita-missile", (28, 10)),
        )
    )
)


MYSTERY_PROPS = tuple(
    StaticSpec(MYSTERY_ATLAS, 4, 4, index, f"special/mystery/{slug}.png", size)
    for index, (slug, size) in enumerate(
        (
            ("broken-camera", (52, 36)),
            ("black-balaclava", (32, 36)),
            ("pink-sock", (28, 36)),
            ("blue-popsicle", (18, 36)),
            ("round-glasses", (48, 24)),
            ("blond-wig", (44, 36)),
            ("security-panel", (56, 32)),
            ("footprints", (56, 40)),
            ("broken-vase", (48, 40)),
            ("broken-chair", (48, 48)),
            ("rifle", (56, 32)),
            ("grandfather-clock", (36, 64)),
            ("broken-monitor", (48, 40)),
            ("ketchup-bottle", (20, 40)),
            ("key", (40, 24)),
            ("portrait-mask", (48, 40)),
        )
    )
)


PHOTOSHOOT_PROPS = tuple(
    StaticSpec(PHOTOSHOOT_ATLAS, 4, 2, index, f"special/photoshoot/{slug}.png", size)
    for index, (slug, size) in enumerate(
        (
            ("camera", (56, 48)),
            ("viewfinder", (128, 80)),
            ("shutter-flash", (64, 64)),
            ("photo-album", (48, 56)),
            ("backdrop", (96, 72)),
            ("spotlight", (48, 56)),
            ("film-cartridge", (48, 32)),
            ("pose-marker", (64, 64)),
        )
    )
)


NINJA_PROP_OUTPUTS = (
    ("special/ninja/pole-intact.png", (32, 96)),
    ("special/ninja/pole-cut.png", (48, 96)),
    ("special/ninja/pole-debris.png", (56, 24)),
)


EFFECTS = (
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 8, "vfx/muzzle-flash.png", (16, 16), 4, "burst"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 9, "vfx/bullet-impact.png", (16, 16), 4, "burst"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 10, "vfx/target-shatter-blue.png", (24, 24), 6, "burst"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 11, "vfx/target-chain-explosion.png", (40, 40), 6, "burst"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 12, "vfx/chaff-burst.png", (32, 32), 6, "pulse"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 13, "vfx/missile-trail.png", (24, 12), 4, "trail"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 14, "vfx/missile-explosion.png", (48, 48), 6, "burst"),
    EffectSpec(PROJECTILE_VFX_ATLAS, 4, 4, 15, "vfx/goal-materialize.png", (32, 64), 6, "materialize"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 0, "vfx/ninja-slash.png", (48, 32), 5, "slash"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 1, "vfx/bullet-ricochet.png", (32, 24), 4, "burst"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 2, "vfx/electrical-disruption.png", (40, 56), 6, "pulse"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 3, "vfx/stealth-shimmer.png", (40, 56), 6, "shimmer"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 4, "vfx/claymore-blast.png", (48, 32), 6, "directional"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 5, "vfx/glass-shatter.png", (40, 40), 6, "burst"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 6, "vfx/wall-crumble.png", (40, 40), 6, "directional"),
    EffectSpec(SPECIAL_VFX_ATLAS, 4, 2, 7, "vfx/ufo-explosion.png", (56, 48), 6, "burst"),
)


def save(image: Image.Image, relative_path: str) -> None:
    destination = OUTPUT / relative_path
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "PNG", optimize=True)


def extract_cell(atlas_name: str, columns: int, rows: int, index: int) -> Image.Image:
    atlas = Image.open(SOURCE / atlas_name).convert("RGBA")
    cell = env.grid_cell(atlas, atlas_name, columns, rows, index, inset=7)
    return env.trim_alpha(env.chroma_to_alpha(cell))


def build_static(spec: StaticSpec) -> None:
    anchor = extract_cell(spec.atlas, spec.columns, spec.rows, spec.index)
    save(env.fit_sprite(anchor, spec.size), spec.output)


def actor_definition(spec: ActorSpec) -> mgs1_anim.ActorSpec:
    if spec.profile == "snake":
        states = mgs1_anim.SNAKE
    elif spec.profile == "genome":
        states = mgs1_anim.GENOME
    elif spec.profile == "ninja":
        states = mgs1_anim.NINJA
    elif spec.profile == "genola":
        states = mgs1_anim.HEAVY
    else:
        raise ValueError(f"Unknown actor profile: {spec.profile}")
    return mgs1_anim.ActorSpec(
        slug=Path(spec.output).stem,
        source=SOURCE / CHARACTER_ATLAS,
        category="characters",
        source_size=spec.frame_size,
        frame_size=spec.frame_size,
        profile=spec.profile,
        states=states,
    )


def build_actor(spec: ActorSpec) -> None:
    anchor = extract_cell(CHARACTER_ATLAS, 3, 3, spec.index)
    base = env.fit_sprite(anchor, spec.frame_size)
    definition = actor_definition(spec)
    if spec.profile == "snake":
        frames, _ranges = mgs1_anim.build_snake(definition, base)
    elif spec.profile == "genome":
        frames, _ranges = mgs1_anim.build_genome(definition, base)
    elif spec.profile == "ninja":
        frames, _ranges = mgs1_anim.build_ninja(definition, base)
    else:
        frames, _ranges = mgs1_anim.build_heavy(definition, base)
    if len(frames) != spec.expected_frames:
        raise RuntimeError(f"{spec.output}: expected {spec.expected_frames} frames, built {len(frames)}")
    save(rig.make_sheet(frames, spec.frame_size), spec.output)


def alpha_scaled(image: Image.Image, factor: float) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A").point(lambda value: round(value * max(0.0, min(1.0, factor))))
    rgba.putalpha(alpha)
    return rgba


def transformed_effect(anchor: Image.Image, size: tuple[int, int], progress: float, motion: str) -> Image.Image:
    canvas = env.fit_sprite(anchor, size)
    if motion in {"pulse", "shimmer"}:
        scale = 0.91 + 0.08 * math.sin(progress * math.tau)
        opacity = 0.58 + 0.4 * (0.5 + 0.5 * math.sin(progress * math.tau))
    elif motion == "materialize":
        scale = 0.82 + progress * 0.18
        opacity = 0.28 + progress * 0.72
    elif motion == "trail":
        scale = 0.82 + 0.15 * math.sin(progress * math.pi)
        opacity = 0.92 - progress * 0.38
    elif motion in {"directional", "slash"}:
        scale = 0.68 + progress * 0.34
        opacity = 1.0 - progress * 0.55
    else:
        scale = 0.56 + progress * 0.52
        opacity = 1.0 - progress * 0.68

    visible = canvas.getchannel("A").getbbox()
    if visible is None:
        raise RuntimeError("Effect anchor became transparent")
    cropped = canvas.crop(visible)
    resized = cropped.resize(
        (max(1, round(cropped.width * scale)), max(1, round(cropped.height * scale))),
        Image.Resampling.NEAREST,
    )
    resized = alpha_scaled(resized, opacity)
    result = Image.new("RGBA", size, (0, 0, 0, 0))
    x = (size[0] - resized.width) // 2
    y = (size[1] - resized.height) // 2
    if motion == "materialize":
        y += round((1.0 - progress) * size[1] * 0.08)
    elif motion == "directional":
        x += round(progress * size[0] * 0.05)
    result.alpha_composite(resized, (x, y))
    return env.quantize_rgba(result, colours=48)


def build_effect(spec: EffectSpec) -> None:
    anchor = extract_cell(spec.atlas, spec.columns, spec.rows, spec.index)
    frames = [
        transformed_effect(anchor, spec.frame_size, index / max(1, spec.frame_count - 1), spec.motion)
        for index in range(spec.frame_count)
    ]
    save(rig.make_sheet(frames, spec.frame_size), spec.output)


def build_ninja_props() -> None:
    """Derive the Ninja pole states from the existing VR boundary pillar.

    The intact state keeps the environment silhouette and palette.  The cut
    state separates and tilts its upper half, while the debris sprite uses the
    same navy/cyan ramp so slash fragments remain visually coherent.
    """

    anchor = extract_cell(MODULAR_PROPS_ATLAS, 4, 3, 7)
    intact = env.fit_sprite(anchor, NINJA_PROP_OUTPUTS[0][1])
    save(intact, NINJA_PROP_OUTPUTS[0][0])

    upper = intact.crop((0, 0, intact.width, intact.height // 2 + 2))
    lower = intact.crop((0, intact.height // 2 - 2, intact.width, intact.height))
    upper = upper.rotate(-12, resample=Image.Resampling.NEAREST, expand=True)
    cut = Image.new("RGBA", NINJA_PROP_OUTPUTS[1][1], (0, 0, 0, 0))
    cut.alpha_composite(lower, (4, 47))
    cut.alpha_composite(upper, (12, 1))
    cut_draw = ImageDraw.Draw(cut)
    cut_draw.line(((13, 49), (28, 47)), fill=(98, 255, 250, 255), width=2)
    save(env.quantize_rgba(cut, colours=32), NINJA_PROP_OUTPUTS[1][0])

    debris = Image.new("RGBA", NINJA_PROP_OUTPUTS[2][1], (0, 0, 0, 0))
    debris_draw = ImageDraw.Draw(debris)
    shard_colours = (
        ((4, 13), (15, 5), (21, 10), (13, 18)),
        ((22, 15), (31, 7), (37, 12), (30, 19)),
        ((36, 17), (45, 10), (51, 14), (44, 21)),
        ((16, 20), (23, 16), (28, 21), (21, 23)),
    )
    for points in shard_colours:
        debris_draw.polygon(points, fill=(7, 38, 53, 255))
        debris_draw.line((*points, points[0]), fill=(59, 239, 233, 255), width=1)
    debris_draw.point(((12, 8), (33, 20), (52, 18)), fill=(149, 255, 249, 255))
    save(env.quantize_rgba(debris, colours=16), NINJA_PROP_OUTPUTS[2][0])


def all_outputs() -> tuple[tuple[str, tuple[int, int]], ...]:
    outputs: list[tuple[str, tuple[int, int]]] = []
    outputs.extend((spec.output, (spec.frame_size[0] * spec.expected_frames, spec.frame_size[1])) for spec in ACTORS)
    outputs.extend((spec.output, spec.size) for spec in STATIC_CHARACTERS)
    outputs.extend((spec.output, spec.size) for spec in WEAPONS)
    outputs.extend((spec.output, spec.size) for spec in PROJECTILES)
    outputs.extend((spec.output, (spec.frame_size[0] * spec.frame_count, spec.frame_size[1])) for spec in EFFECTS)
    outputs.extend((spec.output, spec.size) for spec in MYSTERY_PROPS)
    outputs.extend((spec.output, spec.size) for spec in PHOTOSHOOT_PROPS)
    outputs.extend(NINJA_PROP_OUTPUTS)
    return tuple(outputs)


def validate() -> None:
    outputs = all_outputs()
    if len(outputs) != 68:
        raise RuntimeError(f"Expected 68 runtime assets, declared {len(outputs)}")
    if len({path for path, _size in outputs}) != len(outputs):
        raise RuntimeError("Duplicate runtime output path")
    for relative_path, expected_size in outputs:
        image = Image.open(OUTPUT / relative_path).convert("RGBA")
        if image.size != expected_size:
            raise RuntimeError(f"{relative_path}: expected {expected_size}, got {image.size}")
        if image.getchannel("A").getbbox() is None:
            raise RuntimeError(f"Empty runtime image: {relative_path}")
        leaked = env.count_hot_magenta_pixels(image)
        if leaked:
            raise RuntimeError(f"Leaked chroma-key pixels: {relative_path} ({leaked})")


def main() -> None:
    for spec in ACTORS:
        build_actor(spec)
    for spec in (*STATIC_CHARACTERS, *WEAPONS, *PROJECTILES, *MYSTERY_PROPS, *PHOTOSHOOT_PROPS):
        build_static(spec)
    for spec in EFFECTS:
        build_effect(spec)
    build_ninja_props()
    validate()
    print(f"Built 68 MGS1 VR gameplay assets in {OUTPUT}")


if __name__ == "__main__":
    main()
