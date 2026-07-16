"""Generate the deterministic MGS1 projectile and combat-VFX pack.

The registry in ``src/game/core/mgs1SideOpsAssetRegistry.ts`` is the size and
frame-count authority.  This script paints hard-edged RGBA pixel art at those
exact dimensions.  It deliberately avoids interpolation and partial alpha so
Phaser can use nearest-neighbour scaling without halos.

Run from anywhere with::

    python scripts/generate_mgs1_projectiles_vfx.py
"""

from __future__ import annotations

from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
PROJECTILE_DIR = ROOT / "public" / "sideops" / "mgs1" / "projectiles"
VFX_DIR = ROOT / "public" / "sideops" / "mgs1" / "vfx"

RGBA = tuple[int, int, int, int]
TRANSPARENT: RGBA = (0, 0, 0, 0)
INK: RGBA = (17, 22, 23, 255)
SHADOW: RGBA = (38, 45, 44, 255)
OLIVE: RGBA = (74, 88, 72, 255)
OLIVE_LIGHT: RGBA = (126, 137, 103, 255)
STEEL: RGBA = (101, 111, 108, 255)
STEEL_LIGHT: RGBA = (184, 192, 183, 255)
BRASS: RGBA = (199, 163, 77, 255)
CREAM: RGBA = (242, 218, 151, 255)
WHITE: RGBA = (255, 251, 224, 255)
RED_DARK: RGBA = (104, 31, 35, 255)
RED: RGBA = (207, 62, 53, 255)
ORANGE: RGBA = (245, 112, 42, 255)
GOLD: RGBA = (255, 176, 48, 255)
YELLOW: RGBA = (255, 225, 94, 255)
SMOKE_DARK: RGBA = (49, 56, 57, 255)
SMOKE: RGBA = (89, 98, 98, 255)
SMOKE_LIGHT: RGBA = (145, 154, 151, 255)
SNOW: RGBA = (214, 226, 225, 255)
CYAN_DARK: RGBA = (35, 100, 105, 255)
CYAN: RGBA = (89, 218, 205, 255)
CYAN_LIGHT: RGBA = (191, 255, 241, 255)
VIOLET_DARK: RGBA = (76, 45, 104, 255)
VIOLET: RGBA = (149, 85, 190, 255)
VIOLET_LIGHT: RGBA = (223, 181, 255, 255)
BLOOD: RGBA = (142, 38, 43, 255)
BLOOD_LIGHT: RGBA = (212, 81, 76, 255)


def canvas(width: int, height: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGBA", (width, height), TRANSPARENT)
    return image, ImageDraw.Draw(image)


def save(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)


def bullet(size: tuple[int, int], body: RGBA, flare: RGBA, *, tail: int = 2) -> Image.Image:
    width, height = size
    image, draw = canvas(width, height)
    cy = height // 2
    draw.line((0, cy, min(width - 1, tail + 2), cy), fill=flare)
    draw.rectangle((tail, max(0, cy - 1), width - 3, min(height - 1, cy + 1)), fill=INK)
    draw.rectangle((tail + 1, cy, width - 2, cy), fill=body)
    draw.point((min(width - 2, tail + 2), max(0, cy - 1)), fill=CREAM)
    draw.point((width - 1, cy), fill=WHITE)
    return image


def grenade(kind: str) -> Image.Image:
    image, draw = canvas(10, 10)
    body, band = {
        "frag": (OLIVE, OLIVE_LIGHT),
        "chaff": (STEEL, CYAN),
        "stun": (STEEL_LIGHT, WHITE),
    }[kind]
    draw.rectangle((4, 0, 6, 1), fill=BRASS)
    draw.point((7, 1), fill=CREAM)
    draw.rectangle((2, 2, 7, 8), fill=INK)
    draw.rectangle((1, 4, 8, 7), fill=INK)
    draw.rectangle((2, 3, 7, 7), fill=body)
    draw.rectangle((3, 2, 6, 8), fill=body)
    draw.rectangle((2, 5, 7, 6), fill=band)
    draw.rectangle((3, 3, 5, 3), fill=WHITE if kind == "stun" else STEEL_LIGHT)
    draw.point((4, 8), fill=SHADOW)
    return image


def planted_charge(kind: str) -> Image.Image:
    size = (14, 10) if kind == "c4" else (16, 10)
    image, draw = canvas(*size)
    if kind == "c4":
        draw.rectangle((1, 2, 11, 9), fill=INK)
        draw.rectangle((2, 3, 10, 8), fill=(184, 164, 125, 255))
        draw.rectangle((3, 4, 9, 7), fill=(218, 200, 161, 255))
        draw.rectangle((10, 3, 12, 6), fill=STEEL)
        draw.point((11, 4), fill=RED)
        draw.line((11, 2, 12, 1, 13, 1, 13, 0), fill=RED)
        draw.line((10, 2, 10, 1, 9, 0), fill=YELLOW)
        draw.rectangle((4, 3, 4, 8), fill=SHADOW)
    else:
        draw.polygon([(1, 8), (3, 2), (12, 2), (14, 8)], fill=INK)
        draw.polygon([(2, 7), (4, 3), (11, 3), (13, 7)], fill=OLIVE)
        draw.rectangle((4, 4, 11, 5), fill=OLIVE_LIGHT)
        draw.rectangle((7, 1, 8, 3), fill=BRASS)
        draw.point((8, 2), fill=RED)
        draw.line((4, 6, 11, 6), fill=SHADOW)
        draw.rectangle((3, 8, 13, 9), fill=INK)
    return image


def missile(size: tuple[int, int], *, nose: RGBA, fins: RGBA, flame: bool = True) -> Image.Image:
    width, height = size
    image, draw = canvas(width, height)
    cy = height // 2
    body_left, body_right = 5, width - 6
    draw.polygon([(body_left, cy - 3), (body_right, cy - 3), (width - 1, cy), (body_right, cy + 3), (body_left, cy + 3)], fill=INK)
    draw.rectangle((body_left + 1, cy - 2, body_right, cy + 2), fill=STEEL)
    draw.line((body_left + 3, cy - 2, body_right - 1, cy - 2), fill=STEEL_LIGHT)
    draw.polygon([(body_right, cy - 2), (width - 2, cy), (body_right, cy + 2)], fill=nose)
    draw.polygon([(body_left + 1, cy - 2), (body_left + 5, max(0, cy - 5)), (body_left + 6, cy - 2)], fill=fins)
    draw.polygon([(body_left + 1, cy + 2), (body_left + 5, min(height - 1, cy + 5)), (body_left + 6, cy + 2)], fill=SHADOW)
    if flame:
        draw.rectangle((2, cy - 1, body_left, cy + 1), fill=RED)
        draw.rectangle((0, cy, 3, cy), fill=GOLD)
        draw.point((1, max(0, cy - 2)), fill=ORANGE)
        draw.point((1, min(height - 1, cy + 2)), fill=ORANGE)
    return image


def tank_shell() -> Image.Image:
    image, draw = canvas(18, 8)
    draw.rectangle((4, 2, 12, 5), fill=INK)
    draw.polygon([(12, 2), (17, 3), (17, 4), (12, 5)], fill=INK)
    draw.rectangle((5, 3, 12, 4), fill=STEEL_LIGHT)
    draw.polygon([(12, 3), (16, 3), (17, 4), (12, 4)], fill=BRASS)
    draw.rectangle((2, 2, 4, 5), fill=RED)
    draw.rectangle((0, 3, 2, 4), fill=GOLD)
    draw.point((1, 1), fill=ORANGE)
    draw.point((1, 6), fill=ORANGE)
    return image


def rex_laser() -> Image.Image:
    image, draw = canvas(32, 6)
    draw.rectangle((2, 1, 30, 4), fill=RED_DARK)
    draw.rectangle((5, 1, 31, 3), fill=RED)
    draw.rectangle((8, 2, 31, 3), fill=ORANGE)
    draw.line((11, 2, 31, 2), fill=WHITE)
    draw.point((0, 2), fill=RED_DARK)
    draw.point((2, 0), fill=RED)
    draw.point((2, 5), fill=RED)
    return image


def railgun_slug() -> Image.Image:
    image, draw = canvas(22, 8)
    draw.polygon([(1, 3), (5, 1), (17, 1), (21, 3), (21, 4), (17, 6), (5, 6), (1, 4)], fill=CYAN_DARK)
    draw.rectangle((5, 2, 18, 5), fill=STEEL)
    draw.rectangle((8, 2, 19, 3), fill=CYAN)
    draw.rectangle((11, 3, 20, 4), fill=CYAN_LIGHT)
    draw.point((0, 3), fill=CYAN)
    draw.point((3, 0), fill=CYAN_LIGHT)
    draw.point((3, 7), fill=CYAN)
    return image


def psychic_orb() -> Image.Image:
    image, draw = canvas(18, 18)
    draw.ellipse((1, 1, 16, 16), fill=VIOLET_DARK)
    draw.ellipse((3, 2, 15, 14), fill=VIOLET)
    draw.ellipse((6, 4, 13, 11), fill=VIOLET_LIGHT)
    draw.rectangle((8, 6, 11, 9), fill=WHITE)
    for point in ((0, 8), (17, 9), (8, 0), (10, 17), (3, 3), (15, 4), (3, 14), (14, 15)):
        draw.point(point, fill=VIOLET_LIGHT)
    return image


def ninja_slash() -> Image.Image:
    image, draw = canvas(24, 24)
    draw.arc((1, 1, 22, 22), 205, 344, fill=CYAN_DARK, width=5)
    draw.arc((2, 2, 21, 21), 205, 344, fill=CYAN, width=3)
    draw.arc((4, 4, 19, 19), 208, 340, fill=WHITE, width=1)
    draw.line((4, 18, 17, 4), fill=CYAN_LIGHT, width=2)
    draw.point((20, 3), fill=WHITE)
    draw.point((2, 20), fill=CYAN)
    return image


PROJECTILES: dict[str, tuple[tuple[int, int], Callable[[], Image.Image]]] = {
    "socom-bullet.png": ((8, 3), lambda: bullet((8, 3), BRASS, CREAM, tail=1)),
    "famas-tracer.png": ((12, 3), lambda: bullet((12, 3), ORANGE, RED, tail=3)),
    "psg1-round.png": ((12, 3), lambda: bullet((12, 3), CREAM, STEEL_LIGHT, tail=2)),
    "ocelot-round.png": ((10, 4), lambda: bullet((10, 4), BRASS, GOLD, tail=2)),
    "vulcan-tracer.png": ((14, 4), lambda: bullet((14, 4), ORANGE, RED, tail=4)),
    "tank-shell.png": ((18, 8), tank_shell),
    "grenade.png": ((10, 10), lambda: grenade("frag")),
    "chaff-grenade.png": ((10, 10), lambda: grenade("chaff")),
    "stun-grenade.png": ((10, 10), lambda: grenade("stun")),
    "c4-charge.png": ((14, 10), lambda: planted_charge("c4")),
    "claymore.png": ((16, 10), lambda: planted_charge("claymore")),
    "nikita-missile.png": ((24, 10), lambda: missile((24, 10), nose=RED, fins=OLIVE_LIGHT)),
    "stinger-missile.png": ((28, 10), lambda: missile((28, 10), nose=BRASS, fins=OLIVE_LIGHT)),
    "hind-rocket.png": ((24, 10), lambda: missile((24, 10), nose=OLIVE_LIGHT, fins=STEEL)),
    "rex-missile.png": ((30, 12), lambda: missile((30, 12), nose=RED, fins=SHADOW)),
    "rex-laser.png": ((32, 6), rex_laser),
    "rex-railgun-slug.png": ((22, 8), railgun_slug),
    "mantis-psychic-orb.png": ((18, 18), psychic_orb),
    "ninja-slash.png": ((24, 24), ninja_slash),
    "wolf-round.png": ((14, 4), lambda: bullet((14, 4), CREAM, WHITE, tail=3)),
}


Painter = Callable[[ImageDraw.ImageDraw, int, int, int, int], None]


def sprite_sheet(frame_width: int, frame_height: int, frames: int, painter: Painter) -> Image.Image:
    image, draw = canvas(frame_width * frames, frame_height)
    for frame in range(frames):
        painter(draw, frame * frame_width, frame, frame_width, frame_height)
    return image


def star(draw: ImageDraw.ImageDraw, x: int, y: int, radius: int, colour: RGBA, core: RGBA = WHITE) -> None:
    radius = max(1, radius)
    draw.line((x - radius, y, x + radius, y), fill=colour, width=1)
    draw.line((x, y - radius, x, y + radius), fill=colour, width=1)
    diagonal = max(1, radius // 2)
    draw.line((x - diagonal, y - diagonal, x + diagonal, y + diagonal), fill=colour)
    draw.line((x - diagonal, y + diagonal, x + diagonal, y - diagonal), fill=colour)
    draw.rectangle((x - 1, y - 1, x + 1, y + 1), fill=core)


def paint_muzzle(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    radii = (2, 7, 5, 1)
    star(draw, cx + (frame == 2), cy, radii[frame], ORANGE if frame != 3 else GOLD, YELLOW if frame else WHITE)
    if frame in (1, 2):
        draw.point((cx + radii[frame], max(0, cy - 3)), fill=RED)
        draw.point((cx - radii[frame], min(height - 1, cy + 3)), fill=GOLD)


def paint_impact(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    if frame == 0:
        star(draw, cx, cy, 2, BRASS)
    elif frame == 1:
        star(draw, cx, cy, 7, CREAM)
    else:
        spread = 4 + frame * 2
        points = ((-spread, -2), (-spread // 2, -spread), (spread, -3), (spread - 2, spread), (-spread + 2, spread - 1))
        for index, (dx, dy) in enumerate(points):
            draw.rectangle((cx + dx, cy + dy, cx + dx + (frame == 2), cy + dy + (frame == 2)), fill=BRASS if index % 2 else CREAM)
        if frame == 2:
            draw.rectangle((cx - 2, cy - 1, cx + 2, cy + 1), fill=STEEL_LIGHT)


def paint_ricochet(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    if frame < 2:
        star(draw, cx + frame, cy, 3 + frame * 4, GOLD, WHITE)
    else:
        for index, (dx, dy) in enumerate(((-7, -5), (-3, -7), (4, -6), (7, -1), (5, 6), (-5, 7))):
            scale = 1 if frame == 2 else 2
            px, py = cx + dx * scale // 2, cy + dy * scale // 2
            draw.point((px, py), fill=CYAN_LIGHT if index % 2 else GOLD)
        draw.point((cx, cy), fill=STEEL_LIGHT)


def paint_blood(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    if frame == 0:
        draw.rectangle((cx - 1, cy - 1, cx + 2, cy + 2), fill=BLOOD_LIGHT)
    else:
        spread = frame * 3
        draw.polygon([(cx - spread, cy), (cx - 1, cy - frame), (cx + spread, cy - 2), (cx + 1, cy + frame + 1)], fill=BLOOD)
        draw.rectangle((cx - 2, cy - 1, cx + 2, cy + 1), fill=BLOOD_LIGHT)
        for dx, dy in ((-spread, -spread), (spread, -spread // 2), (-spread + 1, spread), (spread - 1, spread)):
            draw.point((cx + dx, cy + dy), fill=BLOOD_LIGHT if frame == 1 else BLOOD)


def paint_explosion(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int, *, variant: int) -> None:
    cx, cy = ox + width // 2, height // 2 + height // 12
    count = {32: 6, 48: 8, 64: 10}[width]
    peak = max(1, count // 2)
    progress = frame if frame <= peak else max(1, count - frame)
    radius = max(2, round((min(width, height) // 2 - 2) * progress / peak))
    if frame <= peak:
        draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=RED)
        draw.ellipse((cx - max(1, radius - 4), cy - max(1, radius - 4), cx + max(1, radius - 4), cy + max(1, radius - 4)), fill=ORANGE)
        draw.ellipse((cx - max(1, radius // 2), cy - max(1, radius // 2), cx + max(1, radius // 2), cy + max(1, radius // 2)), fill=YELLOW)
        if frame < peak:
            draw.rectangle((cx - 2, cy - 2, cx + 2, cy + 2), fill=WHITE)
        arms = radius + 1 + variant
        draw.line((cx - arms, cy, cx + arms, cy), fill=GOLD)
        if frame % 2:
            draw.line((cx, cy - arms, cx, cy + arms), fill=GOLD)
    else:
        rise = (frame - peak) * 2
        draw.ellipse((cx - radius, cy - radius - rise, cx + radius, cy + radius), fill=SMOKE_DARK)
        draw.ellipse((cx - radius + 3, cy - radius - rise - 2, cx + 2, cy + 2), fill=SMOKE)
        draw.ellipse((cx - 1, cy - radius - rise, cx + radius - 2, cy + 3), fill=SMOKE_LIGHT)
        if frame == peak + 1:
            draw.rectangle((cx - radius // 2, cy + 1, cx + radius // 2, cy + 4), fill=ORANGE)
    for index, (dx, dy) in enumerate(((-1, -1), (1, -1), (-1, 1), (1, 1))):
        distance = min(width // 2 - 2, radius + frame + variant)
        draw.point((cx + dx * distance, cy + dy * max(1, distance // 2)), fill=GOLD if index % 2 else RED)


def explosion_painter(variant: int) -> Painter:
    return lambda draw, ox, frame, width, height: paint_explosion(draw, ox, frame, width, height, variant=variant)


def paint_smoke(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, base = ox + width // 2, height - 4
    rise, spread = frame * 4, 5 + frame * 2
    draw.ellipse((cx - 5, base - 9, cx + 5, base), fill=SMOKE_DARK)
    draw.ellipse((cx - spread, base - 20 - rise, cx + 2, base - 5 - rise), fill=SMOKE)
    draw.ellipse((cx - 2, base - 27 - rise, cx + spread, base - 11 - rise), fill=SMOKE_LIGHT)
    draw.ellipse((cx - spread - 2, base - 34 - rise, cx + spread - 1, base - 18 - rise), fill=SMOKE_DARK)
    draw.point((cx + spread + 2, max(0, base - 25 - rise)), fill=SMOKE_LIGHT)


def paint_fire(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, base = ox + width // 2, height - 3
    sway = (-3, 1, 3, -1, -4, 2)[frame]
    flame_height = 20 + (frame % 3) * 6
    draw.polygon([(cx - 10, base), (cx - 7, base - 14), (cx - 2, base - 9), (cx + sway, base - flame_height), (cx + 4, base - 12), (cx + 9, base - 18), (cx + 11, base)], fill=RED)
    draw.polygon([(cx - 6, base), (cx - 3, base - 13), (cx + sway, base - flame_height + 8), (cx + 3, base - 9), (cx + 7, base)], fill=ORANGE)
    draw.polygon([(cx - 2, base), (cx, base - 12), (cx + 3, base)], fill=YELLOW)
    draw.rectangle((cx - 1, base - 3, cx + 1, base), fill=WHITE)
    draw.point((cx + 13 + sway, base - 22), fill=ORANGE)


def paint_chaff(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    radius = 2 + frame * 2
    points = ((-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (1, -1), (-1, 1), (1, 1))
    for index, (dx, dy) in enumerate(points):
        px, py = cx + dx * radius, cy + dy * radius
        draw.rectangle((px, py, px + (index + frame) % 2, py + (index // 2 + frame) % 2), fill=CYAN_LIGHT if index % 3 == 0 else CYAN)
    if frame < 3:
        star(draw, cx, cy, 2 + frame, CYAN, WHITE)


def paint_stun(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    radii = (2, 7, 14, 9, 3)
    radius = radii[frame]
    star(draw, cx, cy, radius, WHITE, WHITE)
    if frame in (1, 2, 3):
        draw.rectangle((ox + 1, cy - 1, ox + width - 2, cy + 1), fill=CREAM)
        draw.rectangle((cx - 1, 1, cx + 1, height - 2), fill=WHITE)


def paint_snow(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, base = ox + width // 2, height - 3
    if frame == 0:
        draw.rectangle((cx - 2, base - 2, cx + 2, base), fill=SNOW)
    else:
        spread = 3 + frame * 2
        draw.ellipse((cx - spread, base - 4 - frame, cx, base), fill=SMOKE_LIGHT)
        draw.ellipse((cx, base - 6 - frame, cx + spread, base), fill=SNOW)
        for dx, dy in ((-spread, -spread), (spread, -spread + 1), (-spread + 2, -2), (spread - 2, -3)):
            draw.point((cx + dx, max(0, base + dy)), fill=WHITE)


def paint_rotor_wash(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2 + 6
    spread = 8 + frame * 3
    thickness = 1 + frame % 2
    draw.ellipse((cx - spread, cy - 5, cx + spread, cy + 5), outline=SMOKE_LIGHT, width=thickness)
    draw.arc((cx - spread - 5, cy - 10, cx + spread + 5, cy + 10), 15 + frame * 25, 165 + frame * 25, fill=SNOW, width=1)
    draw.line((cx - spread, cy + 7, cx + spread, cy + 7), fill=SMOKE)
    for dx in (-spread, -spread // 2, spread // 2, spread):
        draw.point((cx + dx, cy + 10 - frame % 3), fill=SNOW)


def paint_electric(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    radius = 6 + frame * 2
    points = []
    for step in range(-radius, radius + 1, 3):
        jitter = ((step + frame * 3) % 5) - 2
        points.append((cx + step, cy + jitter))
    draw.line(points, fill=CYAN, width=2)
    vertical = [(cx + (py - cy), cy + (px - cx)) for px, py in points]
    draw.line(vertical, fill=CYAN_DARK)
    star(draw, cx, cy, 2 + frame % 3, CYAN_LIGHT, WHITE)
    draw.point((cx - radius, cy - radius // 2), fill=WHITE)
    draw.point((cx + radius, cy + radius // 2), fill=CYAN_LIGHT)


def paint_psychic_wave(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    radius = 3 + frame * 3
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), outline=VIOLET, width=2)
    if radius > 7:
        draw.ellipse((cx - radius + 5, cy - radius + 5, cx + radius - 5, cy + radius - 5), outline=VIOLET_LIGHT)
    angle_points = ((-radius, 0), (radius, 0), (0, -radius), (0, radius))
    for index, (dx, dy) in enumerate(angle_points):
        draw.rectangle((cx + dx, cy + dy, cx + dx + (index % 2), cy + dy + ((index + 1) % 2)), fill=VIOLET_LIGHT)
    if frame < 4:
        star(draw, cx, cy, 2 + frame, VIOLET_LIGHT, WHITE)


def paint_laser_impact(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cx, cy = ox + width // 2, height // 2
    radius = (2, 8, 14, 11, 6, 2)[frame]
    star(draw, cx, cy, radius, RED, WHITE if frame < 3 else ORANGE)
    draw.ellipse((cx - radius // 2, cy - radius // 2, cx + radius // 2, cy + radius // 2), outline=ORANGE)
    if frame in (2, 3):
        draw.line((ox + 1, cy, ox + width - 2, cy), fill=RED_DARK)


def paint_missile_trail(draw: ImageDraw.ImageDraw, ox: int, frame: int, width: int, height: int) -> None:
    cy = height // 2
    flame = 6 - frame
    draw.polygon([(ox + width - 2, cy), (ox + width - 7, cy - flame), (ox + width - 12, cy), (ox + width - 7, cy + flame)], fill=RED)
    draw.polygon([(ox + width - 2, cy), (ox + width - 6, cy - max(1, flame - 2)), (ox + width - 10, cy), (ox + width - 6, cy + max(1, flame - 2))], fill=GOLD)
    for blob in range(frame + 2):
        radius = 2 + blob
        cx = ox + width - 13 - blob * 4
        draw.ellipse((cx - radius, cy - radius + blob % 2, cx + radius, cy + radius), fill=SMOKE_LIGHT if blob % 2 else SMOKE)
    draw.point((ox + 1 + frame, cy - 5), fill=SMOKE_DARK)


VFX: dict[str, tuple[tuple[int, int], int, Painter]] = {
    "muzzle-flash.png": ((16, 16), 4, paint_muzzle),
    "bullet-impact.png": ((16, 16), 4, paint_impact),
    "metal-ricochet.png": ((16, 16), 4, paint_ricochet),
    "blood-hit.png": ((16, 16), 4, paint_blood),
    "grenade-explosion.png": ((32, 32), 6, explosion_painter(0)),
    "c4-explosion.png": ((48, 48), 8, explosion_painter(2)),
    "missile-explosion.png": ((48, 48), 8, explosion_painter(4)),
    "rex-explosion.png": ((64, 64), 10, explosion_painter(7)),
    "smoke-plume.png": ((48, 48), 6, paint_smoke),
    "fire-plume.png": ((48, 48), 6, paint_fire),
    "chaff-burst.png": ((32, 32), 6, paint_chaff),
    "stun-flash.png": ((32, 32), 5, paint_stun),
    "snow-puff.png": ((16, 16), 4, paint_snow),
    "rotor-wash.png": ((48, 48), 6, paint_rotor_wash),
    "ninja-electric.png": ((32, 32), 6, paint_electric),
    "mantis-psychic-wave.png": ((48, 48), 8, paint_psychic_wave),
    "rex-laser-impact.png": ((32, 32), 6, paint_laser_impact),
    "missile-trail.png": ((24, 24), 4, paint_missile_trail),
}


def assert_asset(image: Image.Image, expected_size: tuple[int, int], label: str, frames: int = 1) -> None:
    if image.mode != "RGBA":
        raise AssertionError(f"{label}: expected RGBA, got {image.mode}")
    if image.size != expected_size:
        raise AssertionError(f"{label}: expected {expected_size}, got {image.size}")
    alpha = image.getchannel("A")
    values = set(alpha.get_flattened_data())
    if not values.issubset({0, 255}) or values != {0, 255}:
        raise AssertionError(f"{label}: expected binary transparent/opaque pixels, got {values}")
    if frames <= 1:
        return
    frame_width = expected_size[0] // frames
    hashes: list[bytes] = []
    for frame in range(frames):
        crop = image.crop((frame * frame_width, 0, (frame + 1) * frame_width, expected_size[1]))
        if crop.getchannel("A").getbbox() is None:
            raise AssertionError(f"{label}: frame {frame} is empty")
        hashes.append(crop.tobytes())
    if len(set(hashes)) != frames:
        raise AssertionError(f"{label}: every VFX frame must be visually distinct")


def generate() -> None:
    for filename, (size, painter) in PROJECTILES.items():
        image = painter()
        assert_asset(image, size, filename)
        save(image, PROJECTILE_DIR / filename)
        print(f"projectiles/{filename}  {size[0]}x{size[1]} RGBA8")

    for filename, ((frame_width, frame_height), frames, painter) in VFX.items():
        image = sprite_sheet(frame_width, frame_height, frames, painter)
        size = (frame_width * frames, frame_height)
        assert_asset(image, size, filename, frames)
        save(image, VFX_DIR / filename)
        print(f"vfx/{filename}  {size[0]}x{size[1]} RGBA8  [{frames}x {frame_width}x{frame_height}]")

    print(f"Generated {len(PROJECTILES)} MGS1 projectiles and {len(VFX)} animated VFX sheets.")


if __name__ == "__main__":
    generate()
