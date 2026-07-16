"""Build the OpenAI-authored MGS1 static sprite and Codec portrait pack.

The high-resolution source renders are intentionally kept outside Git under
``tmp/mgs1-ai``.  This script performs only deterministic production work:
chroma-key removal, atlas slicing, pixel-sized framing and Codec story-state
variants.  It never invents a replacement identity.
"""

from __future__ import annotations

import argparse
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
EXPRESSIONS = ("neutral", "serious", "warning", "calm", "humor", "glitch")


def open_rgba(path: Path) -> Image.Image:
    with Image.open(path) as image:
        return image.convert("RGBA")


def remove_magenta(image: Image.Image) -> Image.Image:
    """Turn the generated flat #ff00ff plate into true alpha."""
    result = image.convert("RGBA")
    pixels = result.load()
    for y in range(result.height):
        for x in range(result.width):
            r, g, b, _ = pixels[x, y]
            if r >= 185 and b >= 150 and g <= 145 and abs(r - b) <= 105:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                pixels[x, y] = (r, g, b, 255)
    return result


def crop_alpha(image: Image.Image, pad: int = 0) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        raise ValueError("No opaque pixels remain after chroma-key removal")
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(image.width, right + pad)
    bottom = min(image.height, bottom + pad)
    return image.crop((left, top, right, bottom))


def atlas_cell(source: Image.Image, index: int, count: int) -> Image.Image:
    left = round(source.width * index / count)
    right = round(source.width * (index + 1) / count)
    return source.crop((left, 0, right, source.height))


def fit_sprite(source: Image.Image, size: tuple[int, int], margin: int = 1) -> Image.Image:
    source = crop_alpha(source)
    target_w, target_h = size
    available_w = max(1, target_w - margin * 2)
    available_h = max(1, target_h - margin * 2)
    scale = min(available_w / source.width, available_h / source.height)
    width = max(1, round(source.width * scale))
    height = max(1, round(source.height * scale))
    resized = source.resize((width, height), Image.Resampling.LANCZOS)
    # Tiny assets need hard alpha edges to stay legible in Phaser pixelArt mode.
    alpha = resized.getchannel("A").point(lambda value: 0 if value < 88 else 255)
    resized.putalpha(alpha)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    canvas.alpha_composite(resized, ((target_w - width) // 2, target_h - margin - height))
    return canvas


def save_sprite(source: Image.Image, destination: Path, size: tuple[int, int]) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    fit_sprite(remove_magenta(source), size).save(destination, optimize=True)


def square_codec(source: Image.Image) -> Image.Image:
    source = source.convert("RGB")
    side = min(source.size)
    left = (source.width - side) // 2
    top = (source.height - side) // 2
    return source.crop((left, top, left + side, top + side)).resize((512, 512), Image.Resampling.LANCZOS)


def codec_expression(source: Image.Image, expression: str, seed: int) -> Image.Image:
    image = square_codec(source)
    if expression == "serious":
        image = ImageEnhance.Contrast(image).enhance(1.12)
        image = ImageEnhance.Brightness(image).enhance(0.92)
        image = image.filter(ImageFilter.UnsharpMask(radius=1.0, percent=110, threshold=3))
    elif expression == "warning":
        image = ImageEnhance.Contrast(image).enhance(1.18)
        image = ImageEnhance.Brightness(image).enhance(1.05)
        overlay = Image.new("RGB", image.size, (21, 72, 24))
        image = Image.blend(image, overlay, 0.08)
    elif expression == "calm":
        image = ImageEnhance.Contrast(image).enhance(0.94)
        image = ImageEnhance.Brightness(image).enhance(1.01)
    elif expression == "humor":
        image = ImageEnhance.Brightness(image).enhance(1.06)
        image = ImageEnhance.Color(image).enhance(1.08)
    elif expression == "glitch":
        image = glitch_codec(image, seed)
    return image


def glitch_codec(source: Image.Image, seed: int) -> Image.Image:
    rng = random.Random(seed)
    image = source.copy()
    draw = ImageDraw.Draw(image, "RGBA")
    for _ in range(18):
        y = rng.randrange(8, image.height - 8)
        h = rng.randrange(1, 7)
        shift = rng.randrange(-18, 19)
        band = source.crop((0, y, source.width, min(source.height, y + h)))
        image.paste(band, (shift, y))
        draw.rectangle((0, y, image.width, y + 1), fill=(120, 255, 132, rng.randrange(24, 80)))
    for y in range(0, image.height, 4):
        draw.line((0, y, image.width, y), fill=(0, 0, 0, 42))
    return image


def save_codec_set(source: Image.Image, destination: Path, seed: int) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for index, expression in enumerate(EXPRESSIONS):
        image = codec_expression(source, expression, seed + index * 97)
        image.save(destination / f"{expression}.webp", "WEBP", quality=91, method=6)


def unknown_signal(expression: str, seed: int) -> Image.Image:
    rng = random.Random(seed)
    image = Image.new("RGB", (512, 512), (1, 10, 5))
    draw = ImageDraw.Draw(image, "RGBA")
    # An intentionally generic head-and-shoulders carrier shadow: no helmet reveal.
    draw.ellipse((160, 70, 352, 294), fill=(8, 31, 16, 220))
    draw.polygon(((88, 512), (143, 323), (369, 323), (424, 512)), fill=(7, 27, 14, 225))
    for y in range(0, 512, 3):
        alpha = 40 if y % 6 else 72
        draw.line((0, y, 512, y), fill=(48, 132, 62, alpha))
    for _ in range(90):
        y = rng.randrange(10, 502)
        x = rng.randrange(0, 450)
        length = rng.randrange(8, 90)
        draw.rectangle((x, y, min(511, x + length), y + rng.randrange(1, 4)), fill=(65, 190, 83, rng.randrange(20, 90)))
    draw.rectangle((21, 21, 490, 490), outline=(46, 111, 55, 150), width=3)
    if expression == "glitch":
        return glitch_codec(image, seed + 701)
    return codec_expression(image, expression, seed)


def obscured_codec(source: Image.Image, mode: str, expression: str, seed: int) -> Image.Image:
    image = codec_expression(source, expression, seed)
    if mode == "deepthroat":
        image = ImageEnhance.Brightness(image).enhance(0.42)
        image = image.resize((128, 128), Image.Resampling.BILINEAR).resize((512, 512), Image.Resampling.NEAREST)
        draw = ImageDraw.Draw(image, "RGBA")
        for y in range(18, 500, 31):
            draw.rectangle((0, y, 512, y + 3), fill=(54, 187, 75, 55))
    elif mode == "restricted":
        image = ImageEnhance.Brightness(image).enhance(0.72)
        draw = ImageDraw.Draw(image, "RGBA")
        for y, height in ((146, 30), (306, 19), (391, 12)):
            draw.rectangle((24, y, 488, y + height), fill=(0, 7, 3, 205))
            draw.line((24, y, 488, y), fill=(91, 221, 106, 95), width=2)
    return image


def save_obscured_set(source_dir: Path, destination: Path, mode: str, seed: int) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for index, expression in enumerate(EXPRESSIONS):
        source = open_rgba(source_dir / f"{expression}.webp").convert("RGB")
        image = obscured_codec(source, mode, expression, seed + index * 101)
        image.save(destination / f"{expression}.webp", "WEBP", quality=90, method=6)


def build_static_sprites(source_dir: Path) -> int:
    output = ROOT / "public" / "sideops" / "mgs1"

    singles = [
        ("sprite-meryl.png", "npcs/meryl-silverburgh.png", (32, 48)),
        ("sprite-otacon.png", "npcs/otacon.png", (32, 48)),
        ("sprite-ocelot.png", "bosses/revolver-ocelot.png", (48, 64)),
    ]
    for source_name, relative, size in singles:
        save_sprite(open_rgba(source_dir / source_name), output / relative, size)

    atlases = [
        ("atlas-npcs.png", 3, [
            (0, "npcs/donald-anderson.png", (32, 48)),
            (1, "npcs/kenneth-baker.png", (32, 48)),
            (2, "npcs/johnny-sasaki.png", (32, 48)),
        ]),
        ("atlas-bosses-a.png", 3, [
            (0, "bosses/liquid-snake.png", (48, 64)),
            (1, "bosses/cyborg-ninja.png", (48, 64)),
            (2, "bosses/psycho-mantis.png", (48, 64)),
        ]),
        ("atlas-bosses-b.png", 3, [
            (0, "bosses/sniper-wolf.png", (48, 64)),
            (1, "bosses/vulcan-raven.png", (56, 72)),
            (2, "bosses/decoy-octopus.png", (48, 64)),
        ]),
        ("atlas-enemies.png", 4, [
            (0, "enemies/genome-nbc-trooper.png", (32, 48)),
            (1, "enemies/genome-light-infantry.png", (32, 48)),
            (2, "enemies/genome-arctic-trooper.png", (32, 48)),
            (3, "enemies/genome-heavy-trooper.png", (40, 56)),
        ]),
        ("atlas-machines.png", 3, [
            (0, "vehicles/m1-tank.png", (112, 64)),
            (1, "vehicles/hind-d.png", (144, 72)),
            (2, "vehicles/metal-gear-rex.png", (128, 144)),
        ]),
        ("atlas-vehicles.png", 2, [
            (0, "vehicles/escape-jeep.png", (112, 56)),
            (1, "vehicles/snowmobile.png", (96, 48)),
        ]),
        ("atlas-dog-camera.png", 2, [
            (0, "enemies/wolf-dog.png", (40, 24)),
            (1, "enemies/gun-camera.png", (30, 20)),
        ]),
    ]
    count = len(singles)
    for source_name, cell_count, specs in atlases:
        atlas = open_rgba(source_dir / source_name)
        for index, relative, size in specs:
            save_sprite(atlas_cell(atlas, index, cell_count), output / relative, size)
            count += 1
    return count


def build_codec_portraits(source_dir: Path) -> int:
    portraits = ROOT / "public" / "portraits" / "mgs1"
    save_codec_set(open_rgba(source_dir / "portrait-houseman.png"), portraits / "houseman", 1101)
    save_codec_set(open_rgba(source_dir / "portrait-sniper-wolf.png"), portraits / "sniper_wolf", 1201)

    variants = portraits / "variants"
    save_codec_set(open_rgba(source_dir / "variant-liquid.png"), variants / "miller" / "liquid_revealed", 2101)
    save_codec_set(open_rgba(source_dir / "variant-meryl-injured.png"), variants / "meryl" / "injured", 2201)
    save_codec_set(open_rgba(source_dir / "variant-meryl-escape.png"), variants / "meryl" / "escape", 2301)

    naomi = portraits / "naomi"
    deepthroat = portraits / "deepthroat"
    save_obscured_set(naomi, variants / "naomi" / "restricted", "restricted", 3101)
    save_obscured_set(deepthroat, variants / "deepthroat" / "deepthroat", "deepthroat", 3201)

    unknown_dir = variants / "deepthroat" / "unknown_signal"
    unknown_dir.mkdir(parents=True, exist_ok=True)
    for index, expression in enumerate(EXPRESSIONS):
        unknown_signal(expression, 3301 + index * 103).save(
            unknown_dir / f"{expression}.webp", "WEBP", quality=90, method=6
        )

    gray_fox_dir = variants / "deepthroat" / "gray_fox"
    gray_fox_dir.mkdir(parents=True, exist_ok=True)
    for expression in EXPRESSIONS:
        image = open_rgba(deepthroat / f"{expression}.webp").convert("RGB")
        image.save(gray_fox_dir / f"{expression}.webp", "WEBP", quality=92, method=6)
    return 54


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, default=ROOT / "tmp" / "mgs1-ai")
    args = parser.parse_args()
    source_dir = args.source_dir.resolve()
    if not source_dir.exists():
        raise SystemExit(f"OpenAI source directory not found: {source_dir}")
    sprite_count = build_static_sprites(source_dir)
    portrait_count = build_codec_portraits(source_dir)
    print(f"Generated {sprite_count} MGS1 static sprites and {portrait_count} Codec portrait files.")


if __name__ == "__main__":
    main()
