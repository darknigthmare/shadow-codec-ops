"""Build deterministic MG1 actor animation sheets from the approved still art.

The source PNG files are the OpenAI-authored identity anchors used by Side Ops.
This generator never modifies them.  It cuts their opaque pixels into small,
purpose-built rigs, poses those pieces with nearest-neighbour transforms, and
writes one horizontal RGBA8 sheet per actor.  Every colour comes from the
corresponding source image and every output uses binary alpha.

Run from anywhere with::

    python scripts/generate_mg1_actor_animations.py

The contact sheet is intentionally written below ``tmp/`` so it can be used as
a visual QA artefact without becoming a runtime dependency.
"""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Iterable

from PIL import Image, ImageChops, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SIDEOPS = ROOT / "public" / "sideops"
MG1 = SIDEOPS / "mg1"
OUTPUT = MG1 / "animations"
REVIEW = ROOT / "tmp" / "mg1-output-reviews" / "actor-animations.webp"

RGBA = tuple[int, int, int, int]
TRANSPARENT: RGBA = (0, 0, 0, 0)


@dataclass(frozen=True)
class ActorSpec:
    slug: str
    source: Path
    category: str
    frame_size: tuple[int, int]
    profile: str
    states: tuple[tuple[str, int], ...]

    @property
    def frame_count(self) -> int:
        return sum(count for _, count in self.states)

    @property
    def output(self) -> Path:
        return OUTPUT / self.category / f"{self.slug}-sheet.png"

    @property
    def legacy_output(self) -> Path:
        """Unsuffixed path emitted by the pre-registry draft of this script."""
        return OUTPUT / self.category / f"{self.slug}.png"


SNAKE_STATES = (
    ("idle", 2),
    ("move", 6),
    ("attack", 3),
    ("plant", 3),
    ("remote", 2),
    ("hit", 2),
    ("death", 5),
)
NPC_STATES = (("idle", 2), ("move", 4), ("interact", 2), ("hit", 2), ("death", 4))
HUMANOID_STATES = (("idle", 2), ("move", 6), ("attack", 3), ("hit", 2), ("death", 5))
AIR_STATES = (("idle", 4), ("move", 4), ("attack", 3), ("hit", 2), ("death", 5))
DOG_STATES = (("idle", 2), ("move", 6), ("attack", 3), ("hit", 2), ("death", 4))
SCORPION_STATES = (("idle", 2), ("move", 4), ("attack", 3), ("hit", 1), ("death", 3))
CAMERA_STATES = (("idle", 4), ("attack", 3), ("hit", 2), ("death", 4))
HIND_STATES = (("idle", 4), ("move", 4), ("attack", 3), ("hit", 2), ("death", 5))
TANK_STATES = (("idle", 2), ("move", 4), ("attack", 3), ("hit", 2), ("death", 5))
UTILITY_STATES = (("idle", 2), ("move", 4), ("attack", 2), ("hit", 2), ("death", 5))
TX55_STATES = (("idle", 4), ("chargeLeft", 2), ("chargeRight", 2), ("hit", 2), ("death", 5))


def specs() -> tuple[ActorSpec, ...]:
    actors: list[ActorSpec] = [
        ActorSpec(
            "solid-snake-mg1",
            SIDEOPS / "characters" / "solid-snake-mg1.png",
            "characters",
            (48, 48),
            "snake",
            SNAKE_STATES,
        )
    ]
    for slug in (
        "outer-heaven-pow",
        "grey-fox-mg1",
        "dr-pettrovich-mg1",
        "elen-pettrovich-mg1",
        "schneider-mg1",
        "diane-mg1",
        "jennifer-mg1",
    ):
        actors.append(ActorSpec(slug, MG1 / "npcs" / f"{slug}.png", "npcs", (48, 48), "npc", NPC_STATES))

    actors.extend(
        (
            ActorSpec("outer-heaven-soldier", MG1 / "enemies" / "outer-heaven-soldier.png", "enemies", (48, 48), "guard", HUMANOID_STATES),
            ActorSpec("air-trooper", MG1 / "enemies" / "air-trooper.png", "enemies", (64, 56), "air", AIR_STATES),
            ActorSpec("attack-dog", MG1 / "enemies" / "attack-dog.png", "enemies", (48, 24), "dog", DOG_STATES),
            ActorSpec("scorpion", MG1 / "enemies" / "scorpion.png", "enemies", (24, 12), "scorpion", SCORPION_STATES),
            ActorSpec("gun-camera", MG1 / "enemies" / "gun-camera.png", "enemies", (40, 20), "camera", CAMERA_STATES),
        )
    )

    for slug in ("shotmaker", "machinegun-kid", "fire-trooper", "bloody-brad", "dirty-duck", "big-boss-mg1"):
        actors.append(ActorSpec(slug, MG1 / "bosses" / f"{slug}.png", "bosses", (64, 64), "boss", HUMANOID_STATES))

    actors.extend(
        (
            ActorSpec("hind-d", MG1 / "vehicles" / "hind-d.png", "vehicles", (144, 64), "hind", HIND_STATES),
            ActorSpec("outer-heaven-tank", MG1 / "vehicles" / "outer-heaven-tank.png", "vehicles", (112, 56), "tank", TANK_STATES),
            ActorSpec("bulldozer", MG1 / "vehicles" / "bulldozer.png", "vehicles", (112, 56), "bulldozer", UTILITY_STATES),
            ActorSpec("transport-truck", MG1 / "vehicles" / "transport-truck.png", "vehicles", (112, 56), "truck", UTILITY_STATES),
            ActorSpec("tx-55-metal-gear", MG1 / "vehicles" / "tx-55-metal-gear.png", "vehicles", (112, 112), "tx55", TX55_STATES),
        )
    )
    return tuple(actors)


def binary_rgba(image: Image.Image) -> Image.Image:
    result = image.convert("RGBA")
    result.putalpha(result.getchannel("A").point(lambda value: 255 if value >= 128 else 0))
    return result


def fit_source(path: Path, frame_size: tuple[int, int]) -> Image.Image:
    source = binary_rgba(Image.open(path))
    if source.width > frame_size[0] or source.height > frame_size[1]:
        raise ValueError(f"{path}: source {source.size} does not fit frame {frame_size}")
    frame = Image.new("RGBA", frame_size, TRANSPARENT)
    x = (frame.width - source.width) // 2
    y = frame.height - source.height
    frame.alpha_composite(source, (x, y))
    return frame


def visible_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError("Expected a visible subject")
    return bbox


def offset(image: Image.Image, dx: int = 0, dy: int = 0) -> Image.Image:
    result = Image.new("RGBA", image.size, TRANSPARENT)
    result.alpha_composite(image, (dx, dy))
    return result


def transformed(
    layer: Image.Image,
    pivot: tuple[float, float],
    angle: float = 0,
    dx: int = 0,
    dy: int = 0,
) -> Image.Image:
    return layer.rotate(
        angle,
        resample=Image.Resampling.NEAREST,
        center=pivot,
        translate=(dx, dy),
        fillcolor=TRANSPARENT,
    )


def layer_from_predicate(
    base: Image.Image,
    predicate: Callable[[int, int, RGBA], bool],
) -> Image.Image:
    source = base.load()
    layer = Image.new("RGBA", base.size, TRANSPARENT)
    target = layer.load()
    for y in range(base.height):
        for x in range(base.width):
            pixel = source[x, y]
            if pixel[3] and predicate(x, y, pixel):
                target[x, y] = pixel
    return layer


def subtract_layers(base: Image.Image, layers: Iterable[Image.Image]) -> Image.Image:
    occupied = Image.new("L", base.size, 0)
    for layer in layers:
        occupied = ImageChops.lighter(occupied, layer.getchannel("A"))
    remainder = base.copy()
    remainder.putalpha(ImageChops.subtract(base.getchannel("A"), occupied))
    return remainder


def composite(size: tuple[int, int], layers: Iterable[Image.Image]) -> Image.Image:
    result = Image.new("RGBA", size, TRANSPARENT)
    for layer in layers:
        result.alpha_composite(layer)
    return binary_rgba(result)


def source_palette(base: Image.Image) -> tuple[RGBA, RGBA, RGBA]:
    counts: Counter[RGBA] = Counter(pixel for pixel in base.get_flattened_data() if pixel[3])
    colours = list(counts)
    if not colours:
        raise ValueError("Source palette is empty")

    def luminance(colour: RGBA) -> float:
        r, g, b, _ = colour
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    def saturation(colour: RGBA) -> float:
        r, g, b, _ = colour
        return max(r, g, b) - min(r, g, b)

    dark = min(colours, key=luminance)
    light = max(colours, key=luminance)
    accent = max(colours, key=lambda colour: saturation(colour) * 2 + luminance(colour))
    return dark, light, accent


def add_action_pixels(frame: Image.Image, direction: str = "right", long: bool = False) -> Image.Image:
    result = frame.copy()
    bbox = visible_bbox(frame)
    _, light, accent = source_palette(frame)
    d = ImageDraw.Draw(result)
    cy = max(1, min(frame.height - 2, bbox[1] + (bbox[3] - bbox[1]) * 2 // 5))
    if direction == "down":
        cx = (bbox[0] + bbox[2]) // 2
        start = min(frame.height - 2, bbox[3])
        d.point((cx, start), fill=light)
        if start + 1 < frame.height:
            d.point((cx, start + 1), fill=accent)
        if long and start + 2 < frame.height:
            d.point((cx, start + 2), fill=light)
    else:
        start = min(frame.width - 2, bbox[2])
        d.point((start, cy), fill=light)
        if start + 1 < frame.width:
            d.point((start + 1, cy), fill=accent)
        if long and start + 2 < frame.width:
            d.point((start + 2, cy), fill=light)
    return binary_rgba(result)


def fallen(base: Image.Image, angle: float, dx: int = 0) -> Image.Image:
    bbox = visible_bbox(base)
    subject = base.crop(bbox)
    rotated = subject.rotate(angle, resample=Image.Resampling.NEAREST, expand=True, fillcolor=TRANSPARENT)
    max_width = base.width - 2
    max_height = base.height - 1
    if rotated.width > max_width or rotated.height > max_height:
        ratio = min(max_width / rotated.width, max_height / rotated.height)
        rotated = rotated.resize(
            (max(1, round(rotated.width * ratio)), max(1, round(rotated.height * ratio))),
            Image.Resampling.NEAREST,
        )
    result = Image.new("RGBA", base.size, TRANSPARENT)
    x = (base.width - rotated.width) // 2 + dx
    y = base.height - rotated.height
    result.alpha_composite(rotated, (x, y))
    return binary_rgba(result)


@dataclass
class HumanRig:
    base: Image.Image
    layers: dict[str, Image.Image]
    pivots: dict[str, tuple[float, float]]
    bbox: tuple[int, int, int, int]


def build_human_rig(base: Image.Image) -> HumanRig:
    left, top, right, bottom = visible_bbox(base)
    width = right - left
    height = bottom - top
    cx = (left + right) / 2
    head_line = top + max(5, round(height * 0.24))
    leg_line = top + max(12, round(height * 0.61))
    torso_half = max(2, round(width * 0.18))

    def segment(name: str) -> Image.Image:
        def belongs(x: int, y: int, _: RGBA) -> bool:
            if y < head_line:
                current = "head"
            elif y >= leg_line:
                current = "leg_left" if x < cx else "leg_right"
            elif x < cx - torso_half:
                current = "arm_left"
            elif x > cx + torso_half:
                current = "arm_right"
            else:
                current = "torso"
            return current == name

        return layer_from_predicate(base, belongs)

    names = ("head", "torso", "arm_left", "arm_right", "leg_left", "leg_right")
    layers = {name: segment(name) for name in names}
    pivots = {
        "head": (cx, head_line),
        "torso": (cx, head_line + 2),
        "arm_left": (cx - torso_half, head_line + 3),
        "arm_right": (cx + torso_half, head_line + 3),
        "leg_left": (cx - 2, leg_line),
        "leg_right": (cx + 2, leg_line),
    }
    return HumanRig(base, layers, pivots, (left, top, right, bottom))


Pose = tuple[float, int, int]


def human_pose(
    rig: HumanRig,
    *,
    head: Pose = (0, 0, 0),
    torso: Pose = (0, 0, 0),
    arm_left: Pose = (0, 0, 0),
    arm_right: Pose = (0, 0, 0),
    leg_left: Pose = (0, 0, 0),
    leg_right: Pose = (0, 0, 0),
    global_offset: tuple[int, int] = (0, 0),
) -> Image.Image:
    poses = {
        "head": head,
        "torso": torso,
        "arm_left": arm_left,
        "arm_right": arm_right,
        "leg_left": leg_left,
        "leg_right": leg_right,
    }
    order = ("leg_left", "leg_right", "arm_left", "arm_right", "torso", "head")
    layers: list[Image.Image] = []
    for name in order:
        angle, dx, dy = poses[name]
        layers.append(
            transformed(
                rig.layers[name],
                rig.pivots[name],
                angle,
                dx + global_offset[0],
                dy + global_offset[1],
            )
        )
    return composite(rig.base.size, layers)


def human_move_frames(rig: HumanRig, count: int) -> list[Image.Image]:
    strides = (-18, -8, 8, 18, 8, -8)
    head_turns = (-3, -1, 2, 3, -2, 1)
    head_shifts = (-1, 0, 1, 1, -1, 1)
    frames: list[Image.Image] = []
    for index in range(count):
        stride = strides[index % len(strides)]
        bob = (0, 1, 1, 0, 1, 1)[index % 6]
        frames.append(
            human_pose(
                rig,
                head=(head_turns[index % len(head_turns)], head_shifts[index % len(head_shifts)], 0),
                arm_left=(-stride * 0.55, 0, 0),
                arm_right=(stride * 0.55, 0, 0),
                leg_left=(stride, -1 if stride < 0 else 1, 0),
                leg_right=(-stride, 1 if stride < 0 else -1, 0),
                global_offset=(0, bob),
            )
        )
    return frames


def human_attack_frames(rig: HumanRig) -> list[Image.Image]:
    poses = (
        ((-8, 0, 0), (10, 0, 0), (0, 0, 0)),
        ((-32, 1, 0), (30, 2, 0), (-5, 1, 0)),
        ((-16, 0, 0), (18, 1, 0), (3, -1, 0)),
    )
    frames: list[Image.Image] = []
    for index, (left_arm, right_arm, torso) in enumerate(poses):
        frame = human_pose(rig, arm_left=left_arm, arm_right=right_arm, torso=torso)
        if index == 1:
            frame = add_action_pixels(frame, long=True)
        frames.append(frame)
    return frames


def human_hit_frames(rig: HumanRig) -> list[Image.Image]:
    return [
        human_pose(rig, head=(12, -1, 0), torso=(8, -2, 0), arm_left=(18, -2, 0), global_offset=(-1, 0)),
        human_pose(rig, head=(-12, 1, 0), torso=(-8, 2, 0), arm_right=(-18, 2, 0), global_offset=(1, 1)),
    ]


def human_death_frames(rig: HumanRig, count: int) -> list[Image.Image]:
    angles = (-12, -30, -52, -72, -90)
    return [fallen(rig.base, angles[index * len(angles) // count], index // 2) for index in range(count)]


def build_human_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    rig = build_human_rig(base)
    by_state: dict[str, list[Image.Image]] = {}
    by_state["idle"] = [
        human_pose(rig),
        human_pose(rig, head=(0, 1, 0), torso=(0, 0, 1)),
    ]

    move_count = dict(spec.states).get("move", 0)
    if move_count:
        by_state["move"] = human_move_frames(rig, move_count)
    if "attack" in dict(spec.states):
        by_state["attack"] = human_attack_frames(rig)
    if "interact" in dict(spec.states):
        by_state["interact"] = [
            human_pose(rig, head=(-5, 0, 0), arm_left=(-28, -1, -1), arm_right=(28, 1, -1)),
            human_pose(rig, head=(5, 0, 0), arm_left=(-42, -1, -2), arm_right=(42, 1, -2)),
        ]
    if "plant" in dict(spec.states):
        by_state["plant"] = [
            human_pose(rig, torso=(-4, 0, 1), head=(-5, 0, 1), arm_left=(-20, 0, 2), arm_right=(22, 0, 2)),
            human_pose(rig, torso=(-9, 0, 3), head=(-10, 0, 4), arm_left=(-35, 0, 5), arm_right=(35, 0, 5), leg_left=(12, 0, 1), leg_right=(-12, 0, 1)),
            human_pose(rig, torso=(-5, 0, 2), head=(-5, 0, 3), arm_left=(-45, -1, 6), arm_right=(45, 1, 6), leg_left=(18, 0, 1), leg_right=(-18, 0, 1)),
        ]
    if "remote" in dict(spec.states):
        remote_a = human_pose(rig, head=(0, 1, 0), arm_left=(-52, -1, -2), arm_right=(18, 0, 0))
        remote_b = human_pose(rig, head=(0, -1, 0), arm_left=(-68, -1, -3), arm_right=(28, 0, 0))
        by_state["remote"] = [add_action_pixels(remote_a), add_action_pixels(remote_b, long=True)]
    by_state["hit"] = human_hit_frames(rig)
    by_state["death"] = human_death_frames(rig, dict(spec.states)["death"])

    if spec.profile == "air":
        idle: list[Image.Image] = []
        for index, bob in enumerate((-1, 0, -1, 0)):
            frame = human_pose(rig, head=(0, index % 2, 0), arm_left=(-6 + index * 3, 0, 0), arm_right=(6 - index * 3, 0, 0), global_offset=(0, bob))
            idle.append(add_thruster(frame, index))
        by_state["idle"] = idle
        by_state["move"] = [
            add_thruster(human_pose(rig, torso=(angle, dx, 0), leg_left=(-angle, 0, 0), leg_right=(angle, 0, 0), global_offset=(dx, -1)), index)
            for index, (angle, dx) in enumerate(((-7, -2), (-3, -1), (7, 2), (3, 1)))
        ]

    return flatten_states(spec, by_state)


def add_thruster(frame: Image.Image, phase: int) -> Image.Image:
    result = frame.copy()
    _, light, accent = source_palette(frame)
    bbox = visible_bbox(frame)
    d = ImageDraw.Draw(result)
    cx = (bbox[0] + bbox[2]) // 2
    y = min(frame.height - 1, bbox[3])
    for dx in (-3, 3):
        py = min(frame.height - 1, y + (phase % 2))
        d.point((max(0, min(frame.width - 1, cx + dx)), py), fill=light if phase % 2 else accent)
    return binary_rgba(result)


@dataclass
class DogRig:
    base: Image.Image
    layers: dict[str, Image.Image]
    pivots: dict[str, tuple[float, float]]


def build_dog_rig(base: Image.Image) -> DogRig:
    left, top, right, bottom = visible_bbox(base)
    width, height = right - left, bottom - top
    head_x = left + round(width * 0.28)
    tail_x = left + round(width * 0.80)
    leg_y = top + round(height * 0.58)
    middle = (left + right) / 2

    def classify(x: int, y: int, _: RGBA) -> str:
        if x < head_x:
            return "head"
        if x >= tail_x and y < leg_y:
            return "tail"
        if y >= leg_y:
            return "legs_front" if x < middle else "legs_rear"
        return "torso"

    names = ("head", "tail", "legs_front", "legs_rear", "torso")
    layers = {name: layer_from_predicate(base, lambda x, y, pixel, n=name: classify(x, y, pixel) == n) for name in names}
    pivots = {
        "head": (head_x, top + height * 0.45),
        "tail": (tail_x, top + height * 0.42),
        "legs_front": (head_x + 2, leg_y),
        "legs_rear": (tail_x - 2, leg_y),
        "torso": ((head_x + tail_x) / 2, leg_y),
    }
    return DogRig(base, layers, pivots)


def dog_pose(
    rig: DogRig,
    *,
    head: Pose = (0, 0, 0),
    tail: Pose = (0, 0, 0),
    legs_front: Pose = (0, 0, 0),
    legs_rear: Pose = (0, 0, 0),
    torso: Pose = (0, 0, 0),
    global_offset: tuple[int, int] = (0, 0),
) -> Image.Image:
    poses = {"head": head, "tail": tail, "legs_front": legs_front, "legs_rear": legs_rear, "torso": torso}
    layers = []
    for name in ("legs_front", "legs_rear", "tail", "torso", "head"):
        angle, dx, dy = poses[name]
        layers.append(transformed(rig.layers[name], rig.pivots[name], angle, dx + global_offset[0], dy + global_offset[1]))
    return composite(rig.base.size, layers)


def build_dog_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    rig = build_dog_rig(base)
    by_state: dict[str, list[Image.Image]] = {
        "idle": [dog_pose(rig), dog_pose(rig, head=(0, -1, 1), tail=(18, 0, 0))],
        "move": [],
        "attack": [
            dog_pose(rig, head=(8, -1, 0), tail=(-12, 0, 0), torso=(0, 1, 0)),
            dog_pose(rig, head=(-16, -3, 0), tail=(20, 0, 0), torso=(-4, -1, 0), legs_front=(20, -1, 0), legs_rear=(-20, 1, 0)),
            dog_pose(rig, head=(-8, -1, 1), tail=(-18, 0, 0), torso=(2, 0, 0)),
        ],
        "hit": [fallen(base, 12, -1), fallen(base, -12, 1)],
        "death": [fallen(base, angle) for angle in (-18, -42, -68, -90)],
    }
    strides = (-24, -12, 12, 24, 12, -12)
    for index, stride in enumerate(strides):
        by_state["move"].append(
            dog_pose(
                rig,
                head=(-stride * 0.15, -1 if index in (1, 4) else 0, 0),
                tail=(stride * 0.6, 0, 0),
                legs_front=(stride, -1 if stride < 0 else 1, 0),
                legs_rear=(-stride, 1 if stride < 0 else -1, 0),
                global_offset=(0, index % 2),
            )
        )
    return flatten_states(spec, by_state)


def scaled_subject(base: Image.Image, height: int, dx: int = 0) -> Image.Image:
    bbox = visible_bbox(base)
    subject = base.crop(bbox)
    resized = subject.resize((subject.width, max(1, height)), Image.Resampling.NEAREST)
    result = Image.new("RGBA", base.size, TRANSPARENT)
    result.alpha_composite(resized, ((base.width - resized.width) // 2 + dx, base.height - resized.height))
    return binary_rgba(result)


def build_scorpion_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = visible_bbox(base)
    cx = (left + right) // 2
    tail = layer_from_predicate(base, lambda _x, y, _pixel: y < top + max(2, (bottom - top) // 3))
    body = subtract_layers(base, (tail,))

    def pose(tail_dx: int = 0, tail_dy: int = 0, body_dx: int = 0, body_dy: int = 0) -> Image.Image:
        return composite(base.size, (offset(body, body_dx, body_dy), offset(tail, tail_dx, tail_dy)))

    by_state = {
        "idle": [pose(), pose(1, 0, 0, 1)],
        "move": [pose(-1, 0, -2, 0), pose(0, 1, -1, 1), pose(1, 0, 1, 0), pose(0, -1, 2, 1)],
        "attack": [pose(0, -1), pose(1, -2, 0, -1), pose(-1, 0, 0, 1)],
        "hit": [fallen(base, 28)],
        "death": [scaled_subject(base, max(1, bottom - top - 2)), scaled_subject(base, 5, -1), scaled_subject(base, 2, 1)],
    }
    return flatten_states(spec, by_state)


def build_camera_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = visible_bbox(base)
    split = left + round((right - left) * 0.58)
    pivot = (left + (right - left) * 0.48, top + (bottom - top) * 0.55)
    barrel = layer_from_predicate(base, lambda x, _y, _pixel: x >= split)
    body = subtract_layers(base, (barrel,))

    def pose(angle: float = 0, barrel_dx: int = 0, dx: int = 0, dy: int = 0) -> Image.Image:
        layers = (
            transformed(body, pivot, angle, dx, dy),
            transformed(barrel, (split, pivot[1]), angle, dx + barrel_dx, dy),
        )
        return composite(base.size, layers)

    attack = [pose(0, 1), add_action_pixels(pose(0, 3), long=True), pose(0, -1)]
    by_state = {
        "idle": [pose(angle, barrel_dx) for angle, barrel_dx in ((-7, -1), (-2, 0), (7, 1), (2, 2))],
        "attack": attack,
        "hit": [pose(-14, -1, -1, 0), pose(14, 1, 1, 1)],
        "death": [fallen(base, angle) for angle in (-20, -45, -70, -90)],
    }
    return flatten_states(spec, by_state)


def roll_region(layer: Image.Image, box: tuple[int, int, int, int], dx: int = 0, dy: int = 0) -> Image.Image:
    crop = layer.crop(box)
    shifted = ImageChops.offset(crop, dx, dy)
    result = Image.new("RGBA", layer.size, TRANSPARENT)
    result.alpha_composite(shifted, (box[0], box[1]))
    return result


def build_hind_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = visible_bbox(base)
    cx = (left + right) / 2
    cy = top + (bottom - top) * 0.51

    def is_rotor(x: int, y: int, _pixel: RGBA) -> bool:
        dx, dy = x - cx, y - cy
        return abs(dx) + abs(dy) > 17 and abs(abs(dx) - abs(dy)) <= 5

    rotor = layer_from_predicate(base, is_rotor)
    body = subtract_layers(base, (rotor,))

    def pose(rotor_angle: float, dx: int = 0, dy: int = 0, body_angle: float = 0) -> Image.Image:
        return composite(
            base.size,
            (
                transformed(rotor, (cx, cy), rotor_angle + body_angle, dx, dy),
                transformed(body, (cx, cy), body_angle, dx, dy),
            ),
        )

    by_state = {
        "idle": [pose(angle) for angle in (0, 15, 30, 45)],
        "move": [pose(angle, dx, dy, lean) for angle, dx, dy, lean in ((60, -2, 0, -2), (75, -1, -1, -1), (90, 2, 0, 2), (105, 1, -1, 1))],
        "attack": [pose(120), add_action_pixels(pose(135, 0, 1), direction="down", long=True), pose(150, 0, -1)],
        "hit": [pose(165, -2, 0, -6), pose(180, 2, 1, 6)],
        "death": [fallen(base, angle, index - 2) for index, angle in enumerate((-8, -18, -30, -44, -60))],
    }
    return flatten_states(spec, by_state)


def build_tank_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = visible_bbox(base)
    cx = (left + right) / 2
    width, height = right - left, bottom - top
    side = max(6, round(width * 0.24))
    barrel_top = top + round(height * 0.52)
    barrel_half = max(3, round(width * 0.10))
    tread_left = layer_from_predicate(base, lambda x, _y, _pixel: x < left + side)
    tread_right = layer_from_predicate(base, lambda x, _y, _pixel: x >= right - side)
    barrel = layer_from_predicate(base, lambda x, y, _pixel: abs(x - cx) <= barrel_half and y >= barrel_top)
    body = subtract_layers(base, (tread_left, tread_right, barrel))
    left_box = (left, top, left + side, bottom)
    right_box = (right - side, top, right, bottom)

    def pose(track_phase: int = 0, barrel_dy: int = 0, dx: int = 0, dy: int = 0) -> Image.Image:
        layers = (
            offset(roll_region(tread_left, left_box, dy=track_phase), dx, dy),
            offset(roll_region(tread_right, right_box, dy=-track_phase), dx, dy),
            offset(body, dx, dy),
            offset(barrel, dx, dy + barrel_dy),
        )
        return composite(base.size, layers)

    by_state = {
        "idle": [pose(), pose(barrel_dy=-1)],
        "move": [pose(phase, dy=index % 2) for index, phase in enumerate((0, 2, 4, 6))],
        "attack": [pose(0, -1), add_action_pixels(pose(0, 2), direction="down", long=True), pose(0, -2)],
        "hit": [pose(dx=-2), pose(dx=2, dy=1)],
        "death": [fallen(base, angle, index - 2) for index, angle in enumerate((-8, -18, -34, -55, -78))],
    }
    return flatten_states(spec, by_state)


def build_bulldozer_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = visible_bbox(base)
    width, height = right - left, bottom - top
    blade_x = left + round(width * 0.78)
    upper_y = top + round(height * 0.27)
    lower_y = top + round(height * 0.72)
    blade = layer_from_predicate(base, lambda x, _y, _pixel: x >= blade_x)
    treads = layer_from_predicate(base, lambda x, y, _pixel: x < blade_x and (y <= upper_y or y >= lower_y))
    body = subtract_layers(base, (blade, treads))
    tread_box = (left, top, blade_x, bottom)

    def pose(track_phase: int = 0, blade_dx: int = 0, dx: int = 0, dy: int = 0) -> Image.Image:
        return composite(
            base.size,
            (
                offset(roll_region(treads, tread_box, dx=track_phase), dx, dy),
                offset(body, dx, dy),
                offset(blade, dx + blade_dx, dy),
            ),
        )

    by_state = {
        "idle": [pose(), pose(blade_dx=1)],
        "move": [pose(phase, dy=index % 2) for index, phase in enumerate((0, 2, 4, 6))],
        "attack": [pose(0, 3), pose(0, -2, dx=1)],
        "hit": [pose(dx=-2), pose(dx=2, dy=1)],
        "death": [fallen(base, angle, index - 2) for index, angle in enumerate((-5, -14, -28, -44, -62))],
    }
    return flatten_states(spec, by_state)


def ellipse_layer(base: Image.Image, center: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", base.size, 0)
    d = ImageDraw.Draw(mask)
    cx, cy = center
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=255)
    mask = ImageChops.multiply(mask, base.getchannel("A"))
    layer = base.copy()
    layer.putalpha(mask)
    return layer


def build_truck_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    left, top, right, bottom = visible_bbox(base)
    width, height = right - left, bottom - top
    wheel_y = top + round(height * 0.88)
    radius = max(4, round(height * 0.15))
    centers = tuple((left + round(width * fraction), wheel_y) for fraction in (0.14, 0.33, 0.82))
    wheels = tuple(ellipse_layer(base, center, radius) for center in centers)
    door_left = left + round(width * 0.67)
    door_right = left + round(width * 0.83)
    door_top = top + round(height * 0.25)
    door_bottom = top + round(height * 0.72)
    door = layer_from_predicate(base, lambda x, y, _pixel: door_left <= x < door_right and door_top <= y < door_bottom)
    body = subtract_layers(base, (*wheels, door))

    def pose(wheel_angle: float = 0, door_angle: float = 0, door_dx: int = 0, dx: int = 0, dy: int = 0) -> Image.Image:
        layers = [transformed(wheel, center, wheel_angle, dx, dy) for wheel, center in zip(wheels, centers)]
        layers.append(offset(body, dx, dy))
        layers.append(transformed(door, (door_right, door_top), door_angle, dx + door_dx, dy))
        return composite(base.size, layers)

    by_state = {
        "idle": [pose(), pose(door_angle=-2)],
        "move": [pose(angle, dx=0, dy=index % 2) for index, angle in enumerate((0, 45, 90, 135))],
        "attack": [pose(0, -8, 1), pose(0, -18, 3)],
        "hit": [pose(15, dx=-2), pose(-15, dx=2, dy=1)],
        "death": [fallen(base, angle, index - 2) for index, angle in enumerate((-5, -13, -24, -38, -55))],
    }
    return flatten_states(spec, by_state)


def red_pixel(pixel: RGBA) -> bool:
    r, g, b, a = pixel
    return bool(a and r >= 65 and r > g * 1.25 and r > b * 1.18)


def mute_tx_lights(base: Image.Image, mode: str, phase: int = 0) -> Image.Image:
    result = base.copy()
    dark, _, _ = source_palette(base)
    pixels = result.load()
    cx = result.width // 2
    for y in range(result.height):
        for x in range(result.width):
            if not red_pixel(pixels[x, y]):
                continue
            side = "left" if x < cx else "right"
            should_mute = mode == "all" or mode == side or (mode == "alternate" and (x + y + phase) % 2 == 0)
            if should_mute:
                pixels[x, y] = dark
    return result


def tx_destroyed(base: Image.Image, progress: int) -> Image.Image:
    left, top, right, bottom = visible_bbox(base)
    cx = (left + right) / 2
    head_line = top + round((bottom - top) * 0.34)
    leg_line = top + round((bottom - top) * 0.69)
    parts = {
        "head": layer_from_predicate(base, lambda _x, y, _pixel: y < head_line),
        "left": layer_from_predicate(base, lambda x, y, _pixel: head_line <= y < leg_line and x < cx),
        "right": layer_from_predicate(base, lambda x, y, _pixel: head_line <= y < leg_line and x >= cx),
        "leg_left": layer_from_predicate(base, lambda x, y, _pixel: y >= leg_line and x < cx),
        "leg_right": layer_from_predicate(base, lambda x, y, _pixel: y >= leg_line and x >= cx),
    }
    return composite(
        base.size,
        (
            transformed(parts["leg_left"], (cx - 8, leg_line), -progress * 5, -progress, progress),
            transformed(parts["leg_right"], (cx + 8, leg_line), progress * 5, progress, progress),
            transformed(parts["left"], (cx - 5, head_line), -progress * 7, -progress * 2, progress),
            transformed(parts["right"], (cx + 5, head_line), progress * 7, progress * 2, progress),
            transformed(parts["head"], (cx, head_line), -progress * 5, progress - 2, progress * 2),
        ),
    )


def build_tx55_profile(spec: ActorSpec, base: Image.Image) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    by_state = {
        # TX-55 remains rooted: only its warning lamps pulse before sabotage.
        "idle": [base, mute_tx_lights(base, "alternate", 0), mute_tx_lights(base, "alternate", 1), mute_tx_lights(base, "all")],
        "chargeLeft": [mute_tx_lights(base, "right"), mute_tx_lights(mute_tx_lights(base, "right"), "alternate", 0)],
        "chargeRight": [mute_tx_lights(base, "left"), mute_tx_lights(mute_tx_lights(base, "left"), "alternate", 1)],
        "hit": [mute_tx_lights(base, "all"), base],
        "death": [tx_destroyed(base, progress) for progress in range(1, 6)],
    }
    return flatten_states(spec, by_state)


def flatten_states(
    spec: ActorSpec,
    by_state: dict[str, list[Image.Image]],
) -> tuple[list[Image.Image], dict[str, tuple[int, int]]]:
    frames: list[Image.Image] = []
    ranges: dict[str, tuple[int, int]] = {}
    for state, expected_count in spec.states:
        state_frames = by_state.get(state)
        if state_frames is None:
            raise ValueError(f"{spec.slug}: missing state {state}")
        if len(state_frames) != expected_count:
            raise ValueError(f"{spec.slug}/{state}: expected {expected_count} frames, got {len(state_frames)}")
        start = len(frames)
        frames.extend(binary_rgba(frame) for frame in state_frames)
        ranges[state] = (start, expected_count)
    return frames, ranges


BUILDERS: dict[str, Callable[[ActorSpec, Image.Image], tuple[list[Image.Image], dict[str, tuple[int, int]]]]] = {
    "snake": build_human_profile,
    "npc": build_human_profile,
    "guard": build_human_profile,
    "boss": build_human_profile,
    "air": build_human_profile,
    "dog": build_dog_profile,
    "scorpion": build_scorpion_profile,
    "camera": build_camera_profile,
    "hind": build_hind_profile,
    "tank": build_tank_profile,
    "bulldozer": build_bulldozer_profile,
    "truck": build_truck_profile,
    "tx55": build_tx55_profile,
}


def make_sheet(frames: list[Image.Image], frame_size: tuple[int, int]) -> Image.Image:
    sheet = Image.new("RGBA", (frame_size[0] * len(frames), frame_size[1]), TRANSPARENT)
    for index, frame in enumerate(frames):
        if frame.size != frame_size:
            raise ValueError(f"Frame {index}: expected {frame_size}, got {frame.size}")
        sheet.alpha_composite(frame, (index * frame_size[0], 0))
    return binary_rgba(sheet)


def opaque_rgb(image: Image.Image) -> set[tuple[int, int, int]]:
    return {(r, g, b) for r, g, b, a in image.get_flattened_data() if a}


def validate_asset(spec: ActorSpec, source: Image.Image, sheet: Image.Image, ranges: dict[str, tuple[int, int]]) -> None:
    expected_size = (spec.frame_size[0] * spec.frame_count, spec.frame_size[1])
    if sheet.mode != "RGBA":
        raise AssertionError(f"{spec.slug}: expected RGBA, got {sheet.mode}")
    if sheet.size != expected_size:
        raise AssertionError(f"{spec.slug}: expected {expected_size}, got {sheet.size}")
    alpha_values = set(sheet.getchannel("A").get_flattened_data())
    if alpha_values != {0, 255}:
        raise AssertionError(f"{spec.slug}: alpha must contain only transparent and opaque pixels, got {alpha_values}")
    extra_colours = opaque_rgb(sheet) - opaque_rgb(source)
    if extra_colours:
        raise AssertionError(f"{spec.slug}: generated colours outside source palette: {sorted(extra_colours)[:4]}")

    width, height = spec.frame_size
    for state, count in spec.states:
        start, registered_count = ranges[state]
        if registered_count != count:
            raise AssertionError(f"{spec.slug}/{state}: state range mismatch")
        hashes: list[bytes] = []
        for index in range(start, start + count):
            frame = sheet.crop((index * width, 0, (index + 1) * width, height))
            if frame.getchannel("A").getbbox() is None:
                raise AssertionError(f"{spec.slug}/{state}: frame {index - start} is empty")
            hashes.append(frame.tobytes())
        if len(set(hashes)) != count:
            raise AssertionError(f"{spec.slug}/{state}: expected {count} visibly distinct frames")


def checkerboard(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], tile: int = 8) -> None:
    left, top, right, bottom = box
    colours = ((34, 39, 36), (46, 52, 48))
    for y in range(top, bottom, tile):
        for x in range(left, right, tile):
            colour = colours[((x - left) // tile + (y - top) // tile) % 2]
            draw.rectangle((x, y, min(right - 1, x + tile - 1), min(bottom - 1, y + tile - 1)), fill=colour)


def review_samples(spec: ActorSpec, sheet: Image.Image, ranges: dict[str, tuple[int, int]]) -> list[tuple[str, Image.Image]]:
    samples: list[tuple[str, Image.Image]] = []
    width, height = spec.frame_size
    for state, count in spec.states:
        index = ranges[state][0] + (count // 2)
        frame = sheet.crop((index * width, 0, (index + 1) * width, height))
        samples.append((state, frame))
    return samples


def build_review(generated: list[tuple[ActorSpec, Image.Image, dict[str, tuple[int, int]]]]) -> None:
    columns = 7
    label_width = 180
    cell_width = 124
    row_height = 116
    header_height = 58
    canvas = Image.new("RGB", (label_width + cell_width * (columns - 1), header_height + row_height * len(generated)), (18, 22, 20))
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default()
    draw.text((16, 12), "METAL GEAR (MSX2) - ACTOR ANIMATION QA", fill=(230, 237, 220), font=font)
    draw.text((16, 30), "OpenAI still-art identity anchors / deterministic nearest-neighbour rigs", fill=(133, 161, 130), font=font)

    for row, (spec, sheet, ranges) in enumerate(generated):
        top = header_height + row * row_height
        draw.rectangle((0, top, canvas.width, top + row_height - 1), outline=(48, 60, 53))
        draw.text((10, top + 12), spec.slug, fill=(224, 231, 214), font=font)
        draw.text((10, top + 30), f"{spec.frame_size[0]}x{spec.frame_size[1]} / {spec.frame_count}f", fill=(121, 157, 126), font=font)
        draw.text((10, top + 48), " | ".join(name for name, _ in spec.states), fill=(110, 122, 113), font=font)
        samples = review_samples(spec, sheet, ranges)
        if len(samples) > columns - 1:
            indices = [round(i * (len(samples) - 1) / (columns - 2)) for i in range(columns - 1)]
            samples = [samples[index] for index in indices]
        for column, (state, frame) in enumerate(samples, start=1):
            left = label_width + (column - 1) * cell_width
            checkerboard(draw, (left + 5, top + 5, left + cell_width - 5, top + row_height - 22))
            usable_w = cell_width - 18
            usable_h = row_height - 40
            scale = max(1, min(usable_w // frame.width, usable_h // frame.height))
            preview = frame.resize((frame.width * scale, frame.height * scale), Image.Resampling.NEAREST)
            x = left + (cell_width - preview.width) // 2
            y = top + 7 + (usable_h - preview.height) // 2
            canvas.paste(preview, (x, y), preview)
            label_width_px = draw.textlength(state, font=font)
            draw.text((left + (cell_width - label_width_px) / 2, top + row_height - 17), state, fill=(185, 202, 181), font=font)

    REVIEW.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(REVIEW, "WEBP", lossless=True, quality=100, method=6)


def generate() -> None:
    generated: list[tuple[ActorSpec, Image.Image, dict[str, tuple[int, int]]]] = []
    source_hashes: dict[Path, bytes] = {}
    for spec in specs():
        source_bytes = spec.source.read_bytes()
        source_hashes[spec.source] = source_bytes
        base = fit_source(spec.source, spec.frame_size)
        frames, ranges = BUILDERS[spec.profile](spec, base)
        sheet = make_sheet(frames, spec.frame_size)
        validate_asset(spec, base, sheet, ranges)
        spec.output.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(spec.output, "PNG", optimize=True)
        # The runtime registry deliberately uses the explicit ``-sheet`` suffix.
        # Remove only the known draft output for this exact actor, never a source.
        spec.legacy_output.unlink(missing_ok=True)
        if spec.source.read_bytes() != source_hashes[spec.source]:
            raise AssertionError(f"Source was unexpectedly modified: {spec.source}")
        generated.append((spec, sheet, ranges))
        state_text = ", ".join(f"{name}:{count}" for name, count in spec.states)
        print(f"{spec.output.relative_to(OUTPUT).as_posix()}  {sheet.width}x{sheet.height} RGBA8  [{state_text}]")

    build_review(generated)
    total_frames = sum(spec.frame_count for spec, _, _ in generated)
    print(f"Generated {len(generated)} MG1 actor sheets / {total_frames} frames.")
    print(f"Review: {REVIEW}")


if __name__ == "__main__":
    generate()
