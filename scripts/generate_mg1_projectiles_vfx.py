"""Generate the deterministic Metal Gear (MSX2) projectile and VFX pack.

The artwork deliberately uses hard-edged pixels and a small, shared military
palette.  Every output has binary alpha so Phaser can scale it with nearest
neighbour filtering without translucent fringes.
"""

from __future__ import annotations

from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
PROJECTILE_DIR = ROOT / "public" / "sideops" / "mg1" / "projectiles"
VFX_DIR = ROOT / "public" / "sideops" / "mg1" / "vfx"

RGBA = tuple[int, int, int, int]

TRANSPARENT: RGBA = (0, 0, 0, 0)
INK: RGBA = (19, 25, 22, 255)
DEEP: RGBA = (43, 51, 44, 255)
OLIVE: RGBA = (74, 89, 67, 255)
OLIVE_LIGHT: RGBA = (126, 139, 97, 255)
STEEL: RGBA = (105, 118, 111, 255)
STEEL_LIGHT: RGBA = (180, 190, 174, 255)
BRASS: RGBA = (216, 184, 92, 255)
CREAM: RGBA = (255, 232, 143, 255)
WHITE: RGBA = (255, 249, 217, 255)
RED: RGBA = (207, 71, 55, 255)
ORANGE: RGBA = (244, 119, 45, 255)
GOLD: RGBA = (255, 184, 55, 255)
YELLOW: RGBA = (255, 222, 89, 255)
DUST_DARK: RGBA = (103, 88, 62, 255)
DUST: RGBA = (157, 132, 85, 255)
DUST_LIGHT: RGBA = (207, 183, 124, 255)
SMOKE_DARK: RGBA = (55, 63, 59, 255)
SMOKE: RGBA = (91, 102, 95, 255)
SMOKE_LIGHT: RGBA = (143, 151, 137, 255)
LASER_DARK: RGBA = (40, 103, 91, 255)
LASER: RGBA = (72, 205, 164, 255)
LASER_LIGHT: RGBA = (161, 255, 213, 255)


def canvas(width: int, height: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    image = Image.new("RGBA", (width, height), TRANSPARENT)
    return image, ImageDraw.Draw(image)


def save(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)


def draw_handgun_bullet() -> Image.Image:
    image, d = canvas(8, 3)
    d.rectangle((0, 1, 2, 1), fill=(167, 139, 73, 255))
    d.rectangle((2, 0, 6, 2), fill=BRASS)
    d.point((3, 0), fill=CREAM)
    d.point((7, 1), fill=CREAM)
    d.point((2, 2), fill=INK)
    return image


def draw_enemy_tracer() -> Image.Image:
    image, d = canvas(10, 3)
    d.rectangle((0, 1, 4, 1), fill=RED)
    d.rectangle((3, 0, 8, 2), fill=ORANGE)
    d.rectangle((5, 1, 9, 1), fill=CREAM)
    d.point((4, 0), fill=GOLD)
    return image


def draw_gun_camera_laser() -> Image.Image:
    """Draw the electronic beam fired by Outer Heaven gun cameras."""
    image, d = canvas(24, 5)
    d.rectangle((3, 1, 22, 3), fill=LASER_DARK)
    d.rectangle((6, 1, 22, 2), fill=LASER)
    d.rectangle((9, 2, 23, 2), fill=LASER_LIGHT)
    d.rectangle((14, 2, 23, 2), fill=WHITE)
    d.point((0, 2), fill=LASER_DARK)
    d.point((2, 1), fill=LASER)
    d.point((2, 3), fill=LASER)
    d.point((5, 0), fill=LASER_LIGHT)
    d.point((5, 4), fill=LASER_DARK)
    return image


def draw_shotgun_pellet() -> Image.Image:
    image, d = canvas(6, 3)
    d.rectangle((0, 1, 2, 1), fill=STEEL)
    d.rectangle((2, 0, 4, 2), fill=CREAM)
    d.point((5, 1), fill=WHITE)
    return image


def draw_grenade_round() -> Image.Image:
    image, d = canvas(10, 10)
    d.rectangle((4, 0, 6, 1), fill=BRASS)
    d.point((7, 1), fill=CREAM)
    d.rectangle((2, 2, 7, 7), fill=INK)
    d.rectangle((1, 4, 8, 6), fill=INK)
    d.rectangle((2, 3, 7, 7), fill=OLIVE)
    d.rectangle((3, 2, 6, 8), fill=OLIVE)
    d.rectangle((3, 3, 6, 5), fill=OLIVE_LIGHT)
    d.rectangle((4, 3, 6, 3), fill=STEEL_LIGHT)
    d.rectangle((3, 8, 6, 8), fill=DEEP)
    return image


def draw_remote_missile() -> Image.Image:
    image, d = canvas(20, 8)
    d.polygon([(1, 3), (4, 1), (15, 1), (19, 3), (19, 4), (15, 6), (4, 6), (1, 4)], fill=INK)
    d.rectangle((4, 2, 15, 5), fill=STEEL)
    d.rectangle((7, 2, 13, 2), fill=STEEL_LIGHT)
    d.polygon([(16, 2), (19, 3), (19, 4), (16, 5)], fill=RED)
    d.polygon([(4, 1), (8, 0), (8, 2)], fill=OLIVE_LIGHT)
    d.polygon([(4, 6), (8, 7), (8, 5)], fill=OLIVE)
    d.rectangle((1, 3, 3, 4), fill=GOLD)
    d.point((0, 3), fill=RED)
    return image


def draw_rocket() -> Image.Image:
    image, d = canvas(20, 8)
    d.rectangle((4, 1, 14, 6), fill=INK)
    d.polygon([(14, 1), (19, 3), (19, 4), (14, 6)], fill=INK)
    d.rectangle((5, 2, 14, 5), fill=OLIVE)
    d.polygon([(14, 2), (18, 3), (18, 4), (14, 5)], fill=OLIVE_LIGHT)
    d.polygon([(5, 1), (9, 0), (9, 2)], fill=STEEL)
    d.polygon([(5, 6), (9, 7), (9, 5)], fill=DEEP)
    d.rectangle((2, 2, 4, 5), fill=RED)
    d.rectangle((0, 3, 2, 4), fill=GOLD)
    d.point((0, 2), fill=ORANGE)
    d.point((0, 5), fill=ORANGE)
    return image


def draw_boomerang() -> Image.Image:
    image, d = canvas(18, 12)
    d.polygon([(1, 2), (5, 1), (9, 5), (13, 1), (17, 2), (11, 10), (8, 10)], fill=INK)
    d.polygon([(2, 3), (5, 2), (9, 7), (13, 2), (16, 3), (11, 9), (8, 9)], fill=(159, 107, 53, 255))
    d.line([(3, 3), (5, 3), (9, 8)], fill=BRASS, width=1)
    d.line([(10, 7), (13, 3), (15, 3)], fill=CREAM, width=1)
    return image


def draw_flame_projectile() -> Image.Image:
    image, d = canvas(24, 16)
    d.polygon([(1, 8), (5, 3), (7, 5), (10, 1), (13, 5), (17, 3), (22, 7), (23, 9), (18, 13), (13, 12), (9, 15), (7, 11), (3, 12)], fill=RED)
    d.polygon([(5, 8), (8, 4), (11, 7), (14, 4), (18, 7), (21, 8), (17, 11), (13, 10), (10, 13), (8, 10)], fill=ORANGE)
    d.polygon([(9, 8), (12, 5), (14, 8), (18, 8), (14, 10), (11, 11)], fill=YELLOW)
    d.rectangle((0, 7, 3, 9), fill=ORANGE)
    d.point((0, 6), fill=RED)
    d.point((1, 11), fill=RED)
    return image


def draw_landmine() -> Image.Image:
    image, d = canvas(14, 8)
    d.rectangle((3, 1, 10, 1), fill=INK)
    d.rectangle((1, 3, 12, 6), fill=INK)
    d.rectangle((3, 2, 10, 5), fill=OLIVE)
    d.rectangle((1, 4, 12, 5), fill=DEEP)
    d.rectangle((4, 2, 9, 3), fill=OLIVE_LIGHT)
    d.rectangle((6, 0, 7, 2), fill=BRASS)
    d.point((6, 2), fill=RED)
    d.rectangle((3, 6, 10, 7), fill=INK)
    return image


def draw_plastic_explosive() -> Image.Image:
    image, d = canvas(14, 10)
    d.rectangle((1, 2, 11, 9), fill=INK)
    d.rectangle((2, 3, 10, 8), fill=(184, 163, 126, 255))
    d.rectangle((3, 4, 9, 7), fill=(218, 199, 157, 255))
    d.rectangle((10, 3, 12, 6), fill=STEEL)
    d.point((11, 4), fill=RED)
    d.line([(11, 2), (12, 1), (13, 1), (13, 0)], fill=RED, width=1)
    d.line([(10, 2), (10, 1), (9, 0)], fill=YELLOW, width=1)
    d.rectangle((4, 3, 4, 8), fill=DUST_DARK)
    return image


def draw_tank_shell() -> Image.Image:
    image, d = canvas(16, 8)
    d.rectangle((4, 2, 11, 5), fill=INK)
    d.polygon([(11, 2), (15, 3), (15, 4), (11, 5)], fill=INK)
    d.rectangle((5, 3, 11, 4), fill=STEEL_LIGHT)
    d.polygon([(11, 3), (14, 3), (15, 4), (11, 4)], fill=BRASS)
    d.rectangle((2, 2, 4, 5), fill=RED)
    d.rectangle((0, 3, 2, 4), fill=GOLD)
    d.point((1, 2), fill=ORANGE)
    d.point((1, 5), fill=ORANGE)
    return image


def sheet(frame_width: int, frame_height: int, frames: int, painter: Callable[[ImageDraw.ImageDraw, int, int, int], None]) -> Image.Image:
    image, d = canvas(frame_width * frames, frame_height)
    for frame in range(frames):
        painter(d, frame * frame_width, frame, frame_width)
    return image


def paint_muzzle_flash(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    if frame == 0:
        d.rectangle((x + 7, 6, x + 10, 9), fill=ORANGE)
        d.rectangle((x + 8, 5, x + 9, 10), fill=YELLOW)
        d.rectangle((x + 6, 7, x + 11, 8), fill=WHITE)
    elif frame == 1:
        d.polygon([(x + 1, 7), (x + 5, 5), (x + 4, 2), (x + 8, 5), (x + 11, 1), (x + 11, 5), (x + 15, 7), (x + 11, 9), (x + 12, 14), (x + 8, 10), (x + 4, 13), (x + 5, 9)], fill=ORANGE)
        d.polygon([(x + 4, 7), (x + 8, 4), (x + 12, 7), (x + 8, 10)], fill=YELLOW)
        d.rectangle((x + 7, 6, x + 10, 8), fill=WHITE)
    elif frame == 2:
        d.polygon([(x + 1, 6), (x + 7, 6), (x + 10, 3), (x + 9, 6), (x + 15, 7), (x + 9, 9), (x + 11, 12), (x + 7, 9), (x + 1, 9)], fill=ORANGE)
        d.polygon([(x + 3, 7), (x + 10, 6), (x + 13, 7), (x + 9, 8), (x + 3, 8)], fill=YELLOW)
        d.rectangle((x + 2, 7, x + 6, 8), fill=WHITE)
    else:
        d.rectangle((x + 6, 7, x + 10, 8), fill=GOLD)
        d.point((x + 13, 5), fill=ORANGE)
        d.point((x + 13, 10), fill=ORANGE)
        d.point((x + 4, 4), fill=RED)


def paint_bullet_impact(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    if frame == 0:
        d.rectangle((x + 7, 7, x + 9, 9), fill=WHITE)
        d.point((x + 6, 8), fill=BRASS)
    elif frame == 1:
        d.line((x + 8, 1, x + 8, 14), fill=DUST_LIGHT)
        d.line((x + 2, 4, x + 13, 12), fill=BRASS)
        d.line((x + 3, 12, x + 13, 3), fill=CREAM)
        d.rectangle((x + 6, 6, x + 10, 10), fill=WHITE)
    elif frame == 2:
        for px, py in [(2, 4), (5, 2), (12, 3), (14, 8), (11, 13), (4, 12)]:
            d.rectangle((x + px, py, x + px + 1, py + 1), fill=BRASS)
        d.rectangle((x + 6, 7, x + 9, 9), fill=DUST_LIGHT)
    else:
        for px, py in [(3, 5), (12, 5), (10, 12), (5, 11)]:
            d.point((x + px, py), fill=DUST)


def paint_metal_sparks(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    if frame == 0:
        d.rectangle((x + 7, 6, x + 9, 9), fill=WHITE)
        d.rectangle((x + 6, 7, x + 10, 8), fill=YELLOW)
    elif frame == 1:
        rays = [((8, 1), (8, 5)), ((2, 3), (6, 6)), ((14, 3), (10, 6)), ((1, 10), (6, 9)), ((14, 12), (10, 9)), ((6, 14), (7, 10))]
        for (x1, y1), (x2, y2) in rays:
            d.line((x + x1, y1, x + x2, y2), fill=GOLD)
        d.rectangle((x + 6, 6, x + 10, 9), fill=WHITE)
    elif frame == 2:
        for px, py, color in [(1, 3, CREAM), (5, 1, GOLD), (13, 2, YELLOW), (15, 8, GOLD), (12, 14, CREAM), (4, 12, GOLD), (1, 9, YELLOW)]:
            d.rectangle((x + px, py, x + px + 1, py + 1), fill=color)
        d.rectangle((x + 7, 7, x + 9, 9), fill=YELLOW)
    else:
        for px, py in [(3, 3), (13, 5), (11, 13), (4, 11)]:
            d.point((x + px, py), fill=GOLD)


def paint_laser_impact(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    """Paint a compact electronic impact distinct from ballistic sparks."""
    if frame == 0:
        d.rectangle((x + 7, 7, x + 9, 9), fill=LASER)
        d.rectangle((x + 8, 6, x + 8, 10), fill=LASER_LIGHT)
        d.rectangle((x + 6, 8, x + 10, 8), fill=WHITE)
    elif frame == 1:
        rays = [((8, 0), (8, 5)), ((1, 8), (5, 8)), ((15, 8), (11, 8)), ((3, 3), (6, 6)), ((13, 3), (10, 6)), ((3, 13), (6, 10)), ((13, 13), (10, 10))]
        for (x1, y1), (x2, y2) in rays:
            d.line((x + x1, y1, x + x2, y2), fill=LASER)
        d.rectangle((x + 6, 6, x + 10, 10), fill=LASER_LIGHT)
        d.rectangle((x + 7, 7, x + 9, 9), fill=WHITE)
    elif frame == 2:
        for px, py, color in [(2, 5, LASER), (5, 2, LASER_LIGHT), (12, 2, LASER), (14, 6, LASER_LIGHT), (13, 12, LASER), (8, 14, LASER_LIGHT), (3, 11, LASER)]:
            d.rectangle((x + px, py, x + px + 1, py + 1), fill=color)
        d.rectangle((x + 7, 7, x + 9, 9), fill=LASER_LIGHT)
        d.point((x + 8, 8), fill=WHITE)
    else:
        for px, py in [(3, 5), (7, 2), (13, 5), (12, 12), (5, 13)]:
            d.point((x + px, py), fill=LASER_DARK)


def paint_flame_impact(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    base = 27
    widths = [5, 10, 17, 23, 19, 11]
    heights = [7, 13, 22, 28, 24, 16]
    width, height = widths[frame], heights[frame]
    cx = x + 16
    left, right, top = cx - width // 2, cx + width // 2, base - height
    if frame < 4:
        d.polygon([(left, base), (left + 2, top + 5), (cx - 3, top + 9), (cx, top), (cx + 3, top + 9), (right - 2, top + 4), (right, base)], fill=RED)
        d.polygon([(left + 3, base), (cx - 2, top + 9), (cx, top + 5), (cx + 2, top + 12), (right - 3, base)], fill=ORANGE)
        d.polygon([(cx - 3, base), (cx, top + 11), (cx + 3, base)], fill=YELLOW)
        d.rectangle((cx - 2, base - 3, cx + 2, base), fill=WHITE)
    else:
        d.ellipse((left, top + 5, right, base), fill=SMOKE_DARK)
        d.ellipse((left + 3, top + 2, right - 4, base - 6), fill=SMOKE)
        d.rectangle((cx - 2, base - 4, cx + 2, base - 1), fill=ORANGE)
        if frame == 5:
            d.point((left - 1, base - 5), fill=ORANGE)
            d.point((right + 1, base - 8), fill=GOLD)


def paint_explosion_small(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    cx, cy = x + 16, 16
    radii = [3, 7, 12, 15, 13, 9]
    r = radii[frame]
    if frame <= 3:
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=RED)
        d.ellipse((cx - max(1, r - 3), cy - max(1, r - 3), cx + max(1, r - 3), cy + max(1, r - 3)), fill=ORANGE)
        d.ellipse((cx - max(1, r // 2), cy - max(1, r // 2), cx + max(1, r // 2), cy + max(1, r // 2)), fill=YELLOW)
        if frame < 2:
            d.rectangle((cx - 2, cy - 2, cx + 2, cy + 2), fill=WHITE)
        if frame >= 2:
            d.rectangle((cx - r - 2, cy - 1, cx + r + 2, cy + 1), fill=GOLD)
            d.rectangle((cx - 1, cy - r - 2, cx + 1, cy + r + 2), fill=GOLD)
    else:
        d.ellipse((cx - r, cy - r + 2, cx + r, cy + r), fill=SMOKE_DARK)
        d.ellipse((cx - r + 3, cy - r, cx + 2, cy + 2), fill=SMOKE)
        d.ellipse((cx - 1, cy - r + 2, cx + r - 2, cy + 4), fill=SMOKE_LIGHT)
        if frame == 4:
            d.rectangle((cx - 4, cy + 4, cx + 4, cy + 7), fill=ORANGE)


def paint_explosion_large(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    cx, cy = x + 32, 33
    radii = [5, 11, 19, 27, 31, 29, 23, 15]
    r = radii[frame]
    if frame <= 4:
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=RED)
        inner = max(2, r - 5)
        d.ellipse((cx - inner, cy - inner, cx + inner, cy + inner), fill=ORANGE)
        core = max(1, r // 2)
        d.ellipse((cx - core, cy - core, cx + core, cy + core), fill=YELLOW)
        if frame <= 2:
            d.rectangle((cx - 3, cy - 3, cx + 3, cy + 3), fill=WHITE)
        if frame >= 2:
            d.polygon([(cx - r - 3, cy), (cx - r // 2, cy - 4), (cx, cy), (cx - r // 2, cy + 4)], fill=GOLD)
            d.polygon([(cx + r + 3, cy), (cx + r // 2, cy - 4), (cx, cy), (cx + r // 2, cy + 4)], fill=GOLD)
            d.polygon([(cx, cy - r - 3), (cx - 4, cy - r // 2), (cx, cy), (cx + 4, cy - r // 2)], fill=GOLD)
    else:
        d.ellipse((cx - r, cy - r + 4, cx + r, cy + r), fill=SMOKE_DARK)
        d.ellipse((cx - r + 4, cy - r, cx + 2, cy + 6), fill=SMOKE)
        d.ellipse((cx - 3, cy - r + 2, cx + r - 3, cy + 5), fill=SMOKE_LIGHT)
        d.ellipse((cx - r + 8, cy + 1, cx + r - 6, cy + r - 3), fill=SMOKE)
        if frame == 5:
            d.ellipse((cx - 9, cy + 5, cx + 10, cy + 17), fill=ORANGE)
    if frame in (2, 3, 4):
        for dx, dy in [(-29, -17), (28, -13), (-25, 20), (24, 18)]:
            d.rectangle((cx + dx - 1, cy + dy - 1, cx + dx + 1, cy + dy + 1), fill=GOLD)


def paint_smoke_plume(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    base = 44
    cx = x + 24
    rise = frame * 3
    spread = 5 + frame * 2
    d.ellipse((cx - 6, base - 10, cx + 6, base), fill=SMOKE_DARK)
    d.ellipse((cx - spread, base - 20 - rise, cx + 3, base - 6 - rise), fill=SMOKE)
    d.ellipse((cx - 2, base - 26 - rise, cx + spread, base - 11 - rise), fill=SMOKE_LIGHT)
    d.ellipse((cx - spread - 2, base - 34 - rise, cx + spread - 1, base - 17 - rise), fill=SMOKE_DARK if frame > 3 else SMOKE)
    d.ellipse((cx - 5, base - 39 - rise, cx + spread + 4, base - 25 - rise), fill=SMOKE_LIGHT)
    if frame > 2:
        d.point((cx - spread - 5, base - 28 - rise), fill=SMOKE)
        d.point((cx + spread + 5, base - 21 - rise), fill=SMOKE_LIGHT)


def paint_dust_puff(d: ImageDraw.ImageDraw, x: int, frame: int, _: int) -> None:
    cx, base = x + 8, 13
    if frame == 0:
        d.rectangle((cx - 2, base - 3, cx + 2, base), fill=DUST)
        d.point((cx, base - 5), fill=DUST_LIGHT)
    elif frame == 1:
        d.ellipse((cx - 6, base - 8, cx + 1, base), fill=DUST_DARK)
        d.ellipse((cx - 1, base - 10, cx + 6, base), fill=DUST)
        d.ellipse((cx - 3, base - 11, cx + 3, base - 4), fill=DUST_LIGHT)
    elif frame == 2:
        d.ellipse((cx - 7, base - 9, cx, base - 2), fill=DUST)
        d.ellipse((cx, base - 11, cx + 7, base - 3), fill=DUST_DARK)
        d.point((cx - 7, base - 12), fill=DUST_LIGHT)
        d.point((cx + 6, base - 13), fill=DUST)
    else:
        for px, py in [(-7, -8), (-3, -11), (2, -10), (7, -6), (-5, -3), (4, -2)]:
            d.rectangle((cx + px, base + py, cx + px + 1, base + py + 1), fill=DUST)


PROJECTILES: dict[str, tuple[tuple[int, int], Callable[[], Image.Image]]] = {
    "handgun-bullet.png": ((8, 3), draw_handgun_bullet),
    "enemy-tracer.png": ((10, 3), draw_enemy_tracer),
    "gun-camera-laser.png": ((24, 5), draw_gun_camera_laser),
    "shotgun-pellet.png": ((6, 3), draw_shotgun_pellet),
    "grenade-round.png": ((10, 10), draw_grenade_round),
    "remote-missile.png": ((20, 8), draw_remote_missile),
    "rocket.png": ((20, 8), draw_rocket),
    "boomerang.png": ((18, 12), draw_boomerang),
    "flame-projectile.png": ((24, 16), draw_flame_projectile),
    "landmine.png": ((14, 8), draw_landmine),
    "plastic-explosive.png": ((14, 10), draw_plastic_explosive),
    "tank-shell.png": ((16, 8), draw_tank_shell),
}

VFX: dict[str, tuple[tuple[int, int], int, Callable[[ImageDraw.ImageDraw, int, int, int], None]]] = {
    "muzzle-flash.png": ((16, 16), 4, paint_muzzle_flash),
    "bullet-impact.png": ((16, 16), 4, paint_bullet_impact),
    "metal-sparks.png": ((16, 16), 4, paint_metal_sparks),
    "laser-impact.png": ((16, 16), 4, paint_laser_impact),
    "flame-impact.png": ((32, 32), 6, paint_flame_impact),
    "explosion-small.png": ((32, 32), 6, paint_explosion_small),
    "explosion-large.png": ((64, 64), 8, paint_explosion_large),
    "smoke-plume.png": ((48, 48), 6, paint_smoke_plume),
    "dust-puff.png": ((16, 16), 4, paint_dust_puff),
}


def assert_asset(image: Image.Image, expected_size: tuple[int, int], label: str, frames: int = 1) -> None:
    assert image.mode == "RGBA", f"{label}: expected RGBA, got {image.mode}"
    assert image.size == expected_size, f"{label}: expected {expected_size}, got {image.size}"
    alpha = image.getchannel("A")
    extrema = alpha.getextrema()
    assert extrema == (0, 255), f"{label}: expected transparent and opaque pixels, got alpha {extrema}"
    assert set(alpha.get_flattened_data()).issubset({0, 255}), f"{label}: alpha must be binary"
    if frames > 1:
        frame_width = expected_size[0] // frames
        for frame in range(frames):
            crop = alpha.crop((frame * frame_width, 0, (frame + 1) * frame_width, expected_size[1]))
            assert crop.getbbox() is not None, f"{label}: frame {frame} is empty"


def generate() -> None:
    for filename, (size, painter) in PROJECTILES.items():
        image = painter()
        assert_asset(image, size, filename)
        save(image, PROJECTILE_DIR / filename)

    for filename, ((frame_width, frame_height), frames, painter) in VFX.items():
        image = sheet(frame_width, frame_height, frames, painter)
        expected_size = (frame_width * frames, frame_height)
        assert_asset(image, expected_size, filename, frames)
        save(image, VFX_DIR / filename)

    print(f"Generated {len(PROJECTILES)} projectiles and {len(VFX)} VFX sheets.")


if __name__ == "__main__":
    generate()
