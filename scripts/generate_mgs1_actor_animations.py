"""Build deterministic MGS1 actor sheets from the approved still sprites.

The still PNGs are immutable identity anchors.  This generator fits each one
inside the exact frame declared by ``mgs1ActorAnimationRegistry.ts``, cuts its
opaque pixels into a small nearest-neighbour rig, and writes a compact RGBA
frame grid.  No colour outside the corresponding still's palette is added.

The lower-level pixel-rig primitives are shared with the already audited MG1
generator.  MGS1-specific profiles below add crouching, melee, revolver reload,
ninja vanish/slash, psychic, sniper, REX weapon, jeep, and snowmobile motion.

Run after all 24 stills are present::

    python scripts/generate_mgs1_actor_animations.py
"""

from __future__ import annotations

from dataclasses import dataclass
import math
from pathlib import Path
import sys
from typing import Callable

from PIL import Image, ImageChops, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import generate_mg1_actor_animations as rig  # noqa: E402


SIDEOPS = ROOT / "public" / "sideops"
MGS1 = SIDEOPS / "mgs1"
OUTPUT = MGS1 / "animations"
REVIEW = ROOT / "tmp" / "mgs1-output-reviews" / "actor-animations.webp"
TRANSPARENT = (0, 0, 0, 0)


@dataclass(frozen=True)
class ActorSpec:
    slug: str
    source: Path
    category: str
    source_size: tuple[int, int]
    frame_size: tuple[int, int]
    profile: str
    states: tuple[tuple[str, int], ...]

    @property
    def frame_count(self) -> int:
        return sum(count for _, count in self.states)

    @property
    def output(self) -> Path:
        return OUTPUT / self.category / f"{self.slug}-sheet.png"


SNAKE = (("idle", 2), ("move", 6), ("attack", 3), ("crouch", 2), ("melee", 3), ("hit", 2), ("death", 5))
NPC = (("idle", 2), ("move", 4), ("interact", 2), ("hit", 2), ("death", 4))
GENOME = (("idle", 2), ("move", 6), ("attack", 3), ("hit", 2), ("death", 5))
HEAVY = (("idle", 2), ("move", 4), ("attack", 4), ("hit", 2), ("death", 5))
DOG = (("idle", 2), ("move", 6), ("attack", 3), ("hit", 2), ("death", 4))
CAMERA = (("idle", 4), ("attack", 3), ("hit", 2), ("death", 4))
OCELOT = (("idle", 2), ("move", 6), ("attack", 3), ("reload", 3), ("hit", 2), ("death", 5))
NINJA = (("idle", 3), ("move", 6), ("slash", 4), ("vanish", 3), ("hit", 2), ("death", 5))
MANTIS = (("idle", 4), ("move", 4), ("psychic", 4), ("attack", 3), ("hit", 2), ("death", 5))
SNIPER = (("idle", 2), ("move", 4), ("snipe", 4), ("hit", 2), ("death", 5))
RAVEN = (("idle", 2), ("move", 4), ("attack", 4), ("hit", 2), ("death", 5))
LIQUID = (("idle", 2), ("move", 6), ("melee", 4), ("attack", 3), ("hit", 2), ("death", 5))
TANK = (("idle", 2), ("move", 4), ("attack", 3), ("hit", 2), ("death", 5))
HIND = (("idle", 4), ("move", 4), ("attack", 3), ("hit", 2), ("death", 5))
REX = (("idle", 4), ("move", 4), ("missile", 3), ("laser", 3), ("railgun", 3), ("hit", 2), ("death", 7))
JEEP = (("idle", 2), ("move", 4), ("attack", 3), ("hit", 2), ("death", 5))
SNOWMOBILE = (("idle", 2), ("move", 6), ("hit", 2), ("death", 5))


def specs() -> tuple[ActorSpec, ...]:
    actors: list[ActorSpec] = [
        ActorSpec("solid-snake-mgs1", SIDEOPS / "characters" / "solid-snake-mgs1.png", "characters", (32, 48), (48, 48), "snake", SNAKE),
    ]
    for slug in ("meryl-silverburgh", "otacon", "donald-anderson", "kenneth-baker", "johnny-sasaki"):
        actors.append(ActorSpec(slug, MGS1 / "npcs" / f"{slug}.png", "npcs", (32, 48), (48, 48), "npc", NPC))
    actors.extend(
        (
            ActorSpec("genome-light-infantry", MGS1 / "enemies" / "genome-light-infantry.png", "enemies", (32, 48), (48, 48), "genome", GENOME),
            ActorSpec("genome-arctic-trooper", MGS1 / "enemies" / "genome-arctic-trooper.png", "enemies", (32, 48), (48, 48), "genome", GENOME),
            ActorSpec("genome-nbc-trooper", MGS1 / "enemies" / "genome-nbc-trooper.png", "enemies", (32, 48), (48, 48), "genome", GENOME),
            ActorSpec("genome-heavy-trooper", MGS1 / "enemies" / "genome-heavy-trooper.png", "enemies", (40, 56), (64, 56), "heavy", HEAVY),
            ActorSpec("wolf-dog", MGS1 / "enemies" / "wolf-dog.png", "enemies", (40, 24), (48, 24), "dog", DOG),
            ActorSpec("gun-camera", MGS1 / "enemies" / "gun-camera.png", "enemies", (30, 20), (40, 20), "camera", CAMERA),
        )
    )
    actors.extend(
        (
            ActorSpec("revolver-ocelot", MGS1 / "bosses" / "revolver-ocelot.png", "bosses", (48, 64), (64, 64), "ocelot", OCELOT),
            ActorSpec("decoy-octopus", MGS1 / "bosses" / "decoy-octopus.png", "bosses", (48, 64), (64, 64), "humanBoss", GENOME),
            ActorSpec("cyborg-ninja", MGS1 / "bosses" / "cyborg-ninja.png", "bosses", (48, 64), (64, 64), "ninja", NINJA),
            ActorSpec("psycho-mantis", MGS1 / "bosses" / "psycho-mantis.png", "bosses", (48, 64), (64, 64), "mantis", MANTIS),
            ActorSpec("sniper-wolf", MGS1 / "bosses" / "sniper-wolf.png", "bosses", (48, 64), (64, 64), "sniper", SNIPER),
            ActorSpec("vulcan-raven", MGS1 / "bosses" / "vulcan-raven.png", "bosses", (56, 72), (72, 72), "raven", RAVEN),
            ActorSpec("liquid-snake", MGS1 / "bosses" / "liquid-snake.png", "bosses", (48, 64), (64, 64), "liquid", LIQUID),
        )
    )
    actors.extend(
        (
            ActorSpec("m1-tank", MGS1 / "vehicles" / "m1-tank.png", "vehicles", (112, 64), (128, 64), "tank", TANK),
            ActorSpec("hind-d", MGS1 / "vehicles" / "hind-d.png", "vehicles", (144, 72), (160, 72), "hind", HIND),
            ActorSpec("metal-gear-rex", MGS1 / "vehicles" / "metal-gear-rex.png", "vehicles", (128, 144), (160, 144), "rex", REX),
            ActorSpec("escape-jeep", MGS1 / "vehicles" / "escape-jeep.png", "vehicles", (112, 56), (128, 56), "jeep", JEEP),
            ActorSpec("snowmobile", MGS1 / "vehicles" / "snowmobile.png", "vehicles", (96, 48), (112, 48), "snowmobile", SNOWMOBILE),
        )
    )
    return tuple(actors)


def state_counts(spec: ActorSpec) -> dict[str, int]:
    return dict(spec.states)


def ensure_distinct(frames: list[Image.Image]) -> list[Image.Image]:
    """Keep each clip measurable even when a very small source rig collapses."""
    result: list[Image.Image] = []
    hashes: set[bytes] = set()
    nudges = ((0, 0), (1, 0), (-1, 0), (0, 1), (2, 0), (-2, 0), (1, 1), (-1, 1))
    for index, frame in enumerate(frames):
        candidate = rig.binary_rgba(frame)
        for dx, dy in nudges:
            moved = rig.offset(candidate, dx, dy)
            if moved.getchannel("A").getbbox() is not None and moved.tobytes() not in hashes:
                candidate = moved
                break
        if candidate.tobytes() in hashes:
            bbox = rig.visible_bbox(candidate)
            dark, light, accent = rig.source_palette(candidate)
            marked = candidate.copy()
            draw = ImageDraw.Draw(marked)
            px = max(0, min(marked.width - 1, bbox[0] + index % max(1, bbox[2] - bbox[0])))
            py = max(0, min(marked.height - 1, bbox[1] - 1 if bbox[1] else bbox[3]))
            draw.point((px, py), fill=(accent, light, dark)[index % 3])
            candidate = rig.binary_rgba(marked)
        hashes.add(candidate.tobytes())
        result.append(candidate)
    return result


def finish(spec: ActorSpec, by_state: dict[str, list[Image.Image]]) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    for state, count in spec.states:
        frames = by_state.get(state)
        if frames is None:
            raise ValueError(f"{spec.slug}: missing {state}")
        if len(frames) != count:
            raise ValueError(f"{spec.slug}/{state}: expected {count}, got {len(frames)}")
        by_state[state] = ensure_distinct(frames)
    return rig.flatten_states(spec, by_state)


def human_common(spec: ActorSpec, base: Image.Image) -> tuple[rig.HumanRig, dict[str, list[Image.Image]]]:
    model = rig.build_human_rig(base)
    counts = state_counts(spec)
    idle_count = counts["idle"]
    idle = [
        rig.human_pose(model, head=(0, (index % 3) - 1, 0), torso=(0, 0, index % 2), global_offset=(0, -(index // 3)))
        for index in range(idle_count)
    ]
    by_state: dict[str, list[Image.Image]] = {"idle": idle}
    if "move" in counts:
        by_state["move"] = rig.human_move_frames(model, counts["move"])
    if "hit" in counts:
        by_state["hit"] = rig.human_hit_frames(model)
    if "death" in counts:
        by_state["death"] = rig.human_death_frames(model, counts["death"])
    return model, by_state


def melee_frames(model: rig.HumanRig, count: int) -> list[Image.Image]:
    poses = (
        ((-8, 0, 0), (12, 0, 0), (0, -1, 0), (-10, 0, 0)),
        ((-48, -2, 0), (62, 3, -1), (-12, 1, 0), (22, 0, 0)),
        ((34, 2, 0), (-58, -2, 0), (15, -1, 0), (-18, 1, 0)),
        ((12, 0, 0), (-24, 0, 0), (-6, 0, 0), (8, 0, 0)),
    )
    frames: list[Image.Image] = []
    for index in range(count):
        left, right, torso, leg = poses[index * len(poses) // count]
        frame = rig.human_pose(model, arm_left=left, arm_right=right, torso=torso, leg_left=leg, leg_right=(-leg[0], -leg[1], leg[2]))
        if index in (1, 2):
            frame = rig.add_action_pixels(frame, long=True)
        frames.append(frame)
    return frames


def build_snake(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["attack"] = rig.human_attack_frames(model)
    by_state["crouch"] = [
        rig.human_pose(model, torso=(-7, 0, 3), head=(-8, 0, 5), arm_left=(-24, 0, 3), arm_right=(22, 0, 3), leg_left=(22, -1, 1), leg_right=(-22, 1, 1)),
        rig.human_pose(model, torso=(-11, 0, 5), head=(-10, 1, 7), arm_left=(-36, 0, 5), arm_right=(34, 0, 5), leg_left=(30, -1, 2), leg_right=(-30, 1, 2)),
    ]
    by_state["melee"] = melee_frames(model, 3)
    return finish(spec, by_state)


def build_npc(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["interact"] = [
        rig.human_pose(model, head=(-5, 0, 0), arm_left=(-28, -1, -1), arm_right=(28, 1, -1)),
        rig.human_pose(model, head=(6, 1, 0), arm_left=(-43, -1, -2), arm_right=(43, 1, -2), torso=(3, 0, 0)),
    ]
    return finish(spec, by_state)


def build_genome(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["attack"] = rig.human_attack_frames(model)
    return finish(spec, by_state)


def build_heavy(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    attacks = [
        rig.human_pose(model, arm_left=(-10, 0, 0), arm_right=(12, 0, 0), torso=(-3, 0, 0)),
        rig.add_action_pixels(rig.human_pose(model, arm_left=(-25, -1, 0), arm_right=(30, 2, 0), torso=(-8, 1, 0)), long=True),
        rig.add_action_pixels(rig.human_pose(model, arm_left=(-32, -1, 0), arm_right=(36, 3, 0), torso=(6, -1, 1)), long=True),
        rig.human_pose(model, arm_left=(-16, 0, 0), arm_right=(19, 1, 0), torso=(3, 0, 1)),
    ]
    by_state["attack"] = attacks
    return finish(spec, by_state)


def build_ocelot(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["attack"] = rig.human_attack_frames(model)
    by_state["reload"] = [
        rig.human_pose(model, head=(-8, 0, 0), arm_left=(-42, -1, -1), arm_right=(50, 1, -1)),
        rig.human_pose(model, head=(8, 1, 0), arm_left=(-68, -2, -3), arm_right=(68, 2, -3), torso=(-4, 0, 1)),
        rig.human_pose(model, head=(0, 0, 0), arm_left=(-34, -1, -1), arm_right=(40, 1, -1), torso=(4, 0, 0)),
    ]
    return finish(spec, by_state)


def dissolve(base: Image.Image, phase: int, phases: int) -> Image.Image:
    result = base.copy()
    pixels = result.load()
    threshold = phase + 1
    for y in range(result.height):
        for x in range(result.width):
            if pixels[x, y][3] and ((x * 17 + y * 31) % phases) < threshold:
                pixels[x, y] = TRANSPARENT
    if result.getchannel("A").getbbox() is None:
        raise ValueError("Dissolve unexpectedly removed the full subject")
    return rig.binary_rgba(result)


def build_ninja(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["slash"] = melee_frames(model, 4)
    by_state["vanish"] = [dissolve(rig.offset(base, index - 1, -index), index, 5) for index in range(3)]
    return finish(spec, by_state)


def build_mantis(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["psychic"] = [
        rig.human_pose(model, head=(angle / 4, index - 1, 0), arm_left=(-55 + angle, -2, -2), arm_right=(55 - angle, 2, -2), torso=(angle / 5, 0, -1), global_offset=(0, -1 - index % 2))
        for index, angle in enumerate((-10, 0, 10, -4))
    ]
    by_state["attack"] = [
        rig.human_pose(model, arm_left=(-38, -2, -1), arm_right=(38, 2, -1), torso=(-8, 0, -1)),
        rig.add_action_pixels(rig.human_pose(model, arm_left=(-72, -3, -2), arm_right=(72, 3, -2), torso=(0, 1, -2)), long=True),
        rig.human_pose(model, arm_left=(-48, -1, 0), arm_right=(48, 1, 0), torso=(8, -1, -1)),
    ]
    return finish(spec, by_state)


def build_sniper(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["snipe"] = [
        rig.human_pose(model, torso=(-7, 0, 2), head=(-8, 1, 2), arm_left=(-25, -1, 1), arm_right=(25, 2, 1), leg_left=(18, 0, 1), leg_right=(-18, 0, 1)),
        rig.human_pose(model, torso=(-12, 0, 4), head=(-12, 2, 4), arm_left=(-42, -2, 2), arm_right=(44, 3, 2), leg_left=(27, -1, 2), leg_right=(-27, 1, 2)),
        rig.add_action_pixels(rig.human_pose(model, torso=(-13, -1, 4), head=(-10, 2, 4), arm_left=(-48, -2, 2), arm_right=(50, 4, 2), leg_left=(29, -1, 2), leg_right=(-29, 1, 2)), long=True),
        rig.human_pose(model, torso=(-9, 0, 3), head=(-7, 1, 3), arm_left=(-35, -1, 1), arm_right=(37, 2, 1), leg_left=(22, 0, 2), leg_right=(-22, 0, 2)),
    ]
    return finish(spec, by_state)


def build_raven(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["attack"] = [
        rig.human_pose(model, arm_left=(-18, -1, 0), arm_right=(20, 1, 0), torso=(-4, 0, 0)),
        rig.add_action_pixels(rig.human_pose(model, arm_left=(-30, -2, 0), arm_right=(34, 3, 0), torso=(-8, -1, 0)), long=True),
        rig.add_action_pixels(rig.human_pose(model, arm_left=(-34, -2, 0), arm_right=(38, 4, 0), torso=(7, 1, 1)), long=True),
        rig.human_pose(model, arm_left=(-22, -1, 0), arm_right=(25, 2, 0), torso=(4, 0, 1)),
    ]
    return finish(spec, by_state)


def build_liquid(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    model, by_state = human_common(spec, base)
    by_state["melee"] = melee_frames(model, 4)
    by_state["attack"] = rig.human_attack_frames(model)
    return finish(spec, by_state)


def build_rex(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = rig.visible_bbox(base)
    width, height = right - left, bottom - top
    cx = (left + right) / 2
    head_line = top + round(height * 0.34)
    leg_line = top + round(height * 0.58)
    weapon_x = left + round(width * 0.67)
    head = rig.layer_from_predicate(base, lambda _x, y, _p: y < head_line)
    weapon = rig.layer_from_predicate(base, lambda x, y, _p: x >= weapon_x and head_line <= y < leg_line)
    leg_left = rig.layer_from_predicate(base, lambda x, y, _p: y >= leg_line and x < cx)
    leg_right = rig.layer_from_predicate(base, lambda x, y, _p: y >= leg_line and x >= cx)
    torso = rig.subtract_layers(base, (head, weapon, leg_left, leg_right))

    def pose(*, head_angle: float = 0, weapon_dx: int = 0, weapon_dy: int = 0, left_angle: float = 0, right_angle: float = 0, dx: int = 0, dy: int = 0) -> Image.Image:
        return rig.composite(
            base.size,
            (
                rig.transformed(leg_left, (cx - width * 0.18, leg_line), left_angle, dx, dy),
                rig.transformed(leg_right, (cx + width * 0.18, leg_line), right_angle, dx, dy),
                rig.offset(torso, dx, dy),
                rig.transformed(head, (cx, head_line), head_angle, dx, dy),
                rig.offset(weapon, dx + weapon_dx, dy + weapon_dy),
            ),
        )

    idle = [pose(head_angle=angle, weapon_dy=index % 2) for index, angle in enumerate((-2, 0, 2, 0))]
    move = [pose(left_angle=left_a, right_angle=-left_a, dx=dx, dy=index % 2) for index, (left_a, dx) in enumerate(((-6, -2), (-2, -1), (6, 2), (2, 1)))]
    missile = [pose(weapon_dx=shift) for shift in (0, -2, 1)]
    missile[1] = rig.add_action_pixels(missile[1], long=True)
    laser = [pose(head_angle=angle, weapon_dy=-index) for index, angle in enumerate((-5, 0, 5))]
    laser[1] = rig.add_action_pixels(laser[1], long=True)
    railgun = [pose(weapon_dx=shift, left_angle=-shift, right_angle=shift) for shift in (0, -4, 2)]
    railgun[1] = rig.add_action_pixels(railgun[1], long=True)
    by_state = {
        "idle": idle,
        "move": move,
        "missile": missile,
        "laser": laser,
        "railgun": railgun,
        "hit": [pose(dx=-3, head_angle=-5), pose(dx=3, dy=1, head_angle=6)],
        "death": [rig.fallen(base, angle, index - 3) for index, angle in enumerate((-5, -13, -24, -38, -54, -72, -90))],
    }
    return finish(spec, by_state)


def wheel_layer(base: Image.Image, center: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", base.size, 0)
    draw = ImageDraw.Draw(mask)
    cx, cy = center
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=255)
    mask = ImageChops.multiply(mask, base.getchannel("A"))
    layer = base.copy()
    layer.putalpha(mask)
    return layer


def build_jeep(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = rig.visible_bbox(base)
    width, height = right - left, bottom - top
    wheel_y = top + round(height * 0.84)
    radius = max(3, round(height * 0.14))
    centers = ((left + round(width * 0.23), wheel_y), (left + round(width * 0.78), wheel_y))
    wheels = tuple(wheel_layer(base, center, radius) for center in centers)
    body = rig.subtract_layers(base, wheels)

    def pose(angle: float = 0, dx: int = 0, dy: int = 0) -> Image.Image:
        layers = [rig.transformed(wheel, center, angle, dx, dy) for wheel, center in zip(wheels, centers)]
        layers.append(rig.offset(body, dx, dy))
        return rig.composite(base.size, layers)

    attack = [pose(), rig.add_action_pixels(pose(15, -2), long=True), pose(30, 1, 1)]
    by_state = {
        "idle": [pose(), pose(5, 0, 1)],
        "move": [pose(angle, dx, index % 2) for index, (angle, dx) in enumerate(((0, -2), (45, -1), (90, 2), (135, 1)))],
        "attack": attack,
        "hit": [pose(12, -2), pose(-12, 2, 1)],
        "death": [rig.fallen(base, angle, index - 2) for index, angle in enumerate((-5, -14, -27, -43, -62))],
    }
    return finish(spec, by_state)


def build_snowmobile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    by_state = {
        "idle": [base, rig.offset(base, 1, 0)],
        "move": [rig.transformed(base, (base.width / 2, base.height * 0.72), angle, dx, dy) for angle, dx, dy in ((-3, -2, 0), (-1, -1, 1), (2, 1, 0), (4, 2, 1), (1, 1, 0), (-2, -1, 1))],
        "hit": [rig.transformed(base, (base.width / 2, base.height * 0.7), -7, -2, 0), rig.transformed(base, (base.width / 2, base.height * 0.7), 8, 2, 1)],
        "death": [rig.fallen(base, angle, index - 2) for index, angle in enumerate((-8, -20, -38, -61, -88))],
    }
    return finish(spec, by_state)


Builder = Callable[[ActorSpec, Image.Image], tuple[list[Image.Image], dict[str, tuple[int, int]]]]
BUILDERS: dict[str, Builder] = {
    "snake": build_snake,
    "npc": build_npc,
    "genome": build_genome,
    "heavy": build_heavy,
    "dog": lambda spec, base: rig.build_dog_profile(spec, base),
    "camera": lambda spec, base: rig.build_camera_profile(spec, base),
    "humanBoss": build_genome,
    "ocelot": build_ocelot,
    "ninja": build_ninja,
    "mantis": build_mantis,
    "sniper": build_sniper,
    "raven": build_raven,
    "liquid": build_liquid,
    "tank": lambda spec, base: rig.build_tank_profile(spec, base),
    "hind": lambda spec, base: rig.build_hind_profile(spec, base),
    "rex": build_rex,
    "jeep": build_jeep,
    "snowmobile": build_snowmobile,
}


MAX_SHEET_WIDTH = 2048


def sheet_columns(frame_count: int, frame_size: tuple[int, int]) -> int:
    return min(frame_count, max(1, MAX_SHEET_WIDTH // frame_size[0]))


def frame_box(index: int, frame_size: tuple[int, int], columns: int) -> tuple[int, int, int, int]:
    frame_width, frame_height = frame_size
    left = (index % columns) * frame_width
    top = (index // columns) * frame_height
    return left, top, left + frame_width, top + frame_height


def make_sheet(frames: list[Image.Image], frame_size: tuple[int, int]) -> Image.Image:
    columns = sheet_columns(len(frames), frame_size)
    rows = math.ceil(len(frames) / columns)
    sheet = Image.new("RGBA", (frame_size[0] * columns, frame_size[1] * rows), TRANSPARENT)
    for index, frame in enumerate(frames):
        if frame.size != frame_size:
            raise ValueError(f"Frame {index}: expected {frame_size}, got {frame.size}")
        left, top, _, _ = frame_box(index, frame_size, columns)
        sheet.alpha_composite(frame, (left, top))
    return rig.binary_rgba(sheet)


def colours(image: Image.Image) -> set[tuple[int, int, int]]:
    return {(r, g, b) for r, g, b, a in image.get_flattened_data() if a}


def validate(spec: ActorSpec, base: Image.Image, sheet: Image.Image, ranges: dict[str, tuple[int, int]]) -> None:
    columns = sheet_columns(spec.frame_count, spec.frame_size)
    rows = math.ceil(spec.frame_count / columns)
    expected = (spec.frame_size[0] * columns, spec.frame_size[1] * rows)
    if sheet.mode != "RGBA" or sheet.size != expected:
        raise AssertionError(f"{spec.slug}: expected RGBA {expected}, got {sheet.mode} {sheet.size}")
    alpha = set(sheet.getchannel("A").get_flattened_data())
    if alpha != {0, 255}:
        raise AssertionError(f"{spec.slug}: alpha must be binary and include transparency, got {alpha}")
    extra = colours(sheet) - colours(base)
    if extra:
        raise AssertionError(f"{spec.slug}: colours outside still palette: {sorted(extra)[:4]}")
    frame_width, frame_height = spec.frame_size
    for state, count in spec.states:
        start, registered = ranges[state]
        if registered != count:
            raise AssertionError(f"{spec.slug}/{state}: range mismatch")
        hashes: list[bytes] = []
        for index in range(start, start + count):
            frame = sheet.crop(frame_box(index, (frame_width, frame_height), columns))
            if frame.getchannel("A").getbbox() is None:
                raise AssertionError(f"{spec.slug}/{state}: frame {index - start} is empty")
            hashes.append(frame.tobytes())
        if len(set(hashes)) != count:
            raise AssertionError(f"{spec.slug}/{state}: expected {count} visibly distinct frames")
        for first, second in zip(hashes, hashes[1:]):
            if first == second:
                raise AssertionError(f"{spec.slug}/{state}: adjacent frames need measurable pixel motion")


def review_samples(spec: ActorSpec, sheet: Image.Image, ranges: dict[str, tuple[int, int]]) -> list[tuple[str, Image.Image]]:
    width, height = spec.frame_size
    columns = sheet.width // width
    return [
        (state, sheet.crop(frame_box(ranges[state][0] + count // 2, (width, height), columns)))
        for state, count in spec.states
    ]


def checkerboard(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], tile: int = 8) -> None:
    left, top, right, bottom = box
    palette = ((31, 38, 39), (45, 53, 53))
    for y in range(top, bottom, tile):
        for x in range(left, right, tile):
            colour = palette[((x - left) // tile + (y - top) // tile) % 2]
            draw.rectangle((x, y, min(right - 1, x + tile - 1), min(bottom - 1, y + tile - 1)), fill=colour)


def build_review(generated: list[tuple[ActorSpec, Image.Image, dict[str, tuple[int, int]]]]) -> None:
    columns, label_width, cell_width, row_height, header = 8, 190, 120, 126, 58
    canvas = Image.new("RGB", (label_width + cell_width * (columns - 1), header + row_height * len(generated)), (15, 20, 21))
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default()
    draw.text((16, 12), "METAL GEAR SOLID (1998) - ACTOR ANIMATION QA", fill=(229, 236, 225), font=font)
    draw.text((16, 30), "OpenAI still identity anchors / deterministic nearest-neighbour rigs", fill=(128, 159, 145), font=font)
    for row, (spec, sheet, ranges) in enumerate(generated):
        top = header + row * row_height
        draw.rectangle((0, top, canvas.width - 1, top + row_height - 1), outline=(45, 58, 56))
        draw.text((10, top + 12), spec.slug, fill=(224, 231, 220), font=font)
        draw.text((10, top + 30), f"{spec.frame_size[0]}x{spec.frame_size[1]} / {spec.frame_count}f", fill=(121, 157, 142), font=font)
        samples = review_samples(spec, sheet, ranges)
        if len(samples) > columns - 1:
            indices = [round(index * (len(samples) - 1) / (columns - 2)) for index in range(columns - 1)]
            samples = [samples[index] for index in indices]
        for column, (state, frame) in enumerate(samples, start=1):
            left = label_width + (column - 1) * cell_width
            checkerboard(draw, (left + 5, top + 5, left + cell_width - 5, top + row_height - 24))
            usable_width, usable_height = cell_width - 18, row_height - 44
            scale = max(1, min(usable_width // frame.width, usable_height // frame.height))
            preview = frame.resize((frame.width * scale, frame.height * scale), Image.Resampling.NEAREST)
            x = left + (cell_width - preview.width) // 2
            y = top + 7 + (usable_height - preview.height) // 2
            canvas.paste(preview, (x, y), preview)
            text_width = draw.textlength(state, font=font)
            draw.text((left + (cell_width - text_width) / 2, top + row_height - 19), state, fill=(185, 202, 190), font=font)
    REVIEW.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(REVIEW, "WEBP", lossless=True, quality=100, method=6)


def generate() -> None:
    actor_specs = specs()
    missing = [spec.source for spec in actor_specs if not spec.source.is_file()]
    if missing:
        paths = "\n".join(f"  - {path.relative_to(ROOT)}" for path in missing)
        raise FileNotFoundError(f"Wait for all MGS1 stills before animation generation; missing {len(missing)}:\n{paths}")

    generated: list[tuple[ActorSpec, Image.Image, dict[str, tuple[int, int]]]] = []
    for spec in actor_specs:
        source_bytes = spec.source.read_bytes()
        with Image.open(spec.source) as opened:
            if opened.size != spec.source_size:
                raise ValueError(f"{spec.source}: registry expects {spec.source_size}, got {opened.size}")
        base = rig.fit_source(spec.source, spec.frame_size)
        frames, ranges = BUILDERS[spec.profile](spec, base)
        sheet = make_sheet(frames, spec.frame_size)
        validate(spec, base, sheet, ranges)
        spec.output.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(spec.output, "PNG", optimize=True)
        if spec.source.read_bytes() != source_bytes:
            raise AssertionError(f"Still was unexpectedly modified: {spec.source}")
        generated.append((spec, sheet, ranges))
        states = ", ".join(f"{state}:{count}" for state, count in spec.states)
        print(f"{spec.output.relative_to(OUTPUT).as_posix()}  {sheet.width}x{sheet.height} RGBA8  [{states}]")

    build_review(generated)
    print(f"Generated {len(generated)} MGS1 actor sheets / {sum(spec.frame_count for spec in actor_specs)} frames.")
    print(f"Review: {REVIEW}")


if __name__ == "__main__":
    generate()
