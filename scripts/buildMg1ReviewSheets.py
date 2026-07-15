#!/usr/bin/env python3
"""Build local contact sheets for reviewing the MG1 image pack."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tmp" / "mg1-output-reviews"


def contain(image: Image.Image, width: int, height: int) -> Image.Image:
    ratio = min(width / image.width, height / image.height)
    return image.resize(
        (max(1, round(image.width * ratio)), max(1, round(image.height * ratio))),
        Image.Resampling.NEAREST,
    )


def build_portraits() -> None:
    people = ["solid_snake", "big_boss", "schneider", "diane", "jennifer"]
    states = ["neutral", "serious", "warning", "calm", "glitch", "humor"]
    cell = 132
    label_height = 16
    sheet = Image.new("RGB", (cell * len(states), (cell + label_height) * len(people)), "#071108")
    draw = ImageDraw.Draw(sheet)
    for row, person in enumerate(people):
        for column, state in enumerate(states):
            path = ROOT / "public" / "portraits" / "msx" / "mg1" / person / f"{state}.webp"
            image = Image.open(path).convert("RGB").resize((cell, cell), Image.Resampling.NEAREST)
            x = column * cell
            y = row * (cell + label_height)
            sheet.paste(image, (x, y))
            draw.text((x + 3, y + cell + 2), f"{person}:{state}", fill="#8cff7a")
    sheet.save(OUT / "codec-portraits.webp", "WEBP", lossless=True, quality=100)


def build_sprites() -> None:
    categories = ["npcs", "enemies", "bosses", "vehicles"]
    assets: list[tuple[str, Path]] = []
    for category in categories:
        folder = ROOT / "public" / "sideops" / "mg1" / category
        assets.extend((category, path) for path in sorted(folder.glob("*.png")))

    columns = 5
    cell_width, cell_height = 180, 130
    rows = (len(assets) + columns - 1) // columns
    sheet = Image.new("RGBA", (columns * cell_width, rows * cell_height), (8, 15, 10, 255))
    draw = ImageDraw.Draw(sheet)
    for index, (category, path) in enumerate(assets):
        row, column = divmod(index, columns)
        x, y = column * cell_width, row * cell_height
        image = contain(Image.open(path).convert("RGBA"), cell_width - 16, cell_height - 30)
        sheet.alpha_composite(image, (x + (cell_width - image.width) // 2, y + 4))
        draw.text((x + 4, y + cell_height - 20), f"{category}/{path.stem}", fill="#d6e3c8")
    sheet.convert("RGB").save(OUT / "sideops-sprites.webp", "WEBP", lossless=True, quality=100)


def build_projectiles_vfx() -> None:
    paths = [
        *sorted((ROOT / "public" / "sideops" / "mg1" / "projectiles").glob("*.png")),
        *sorted((ROOT / "public" / "sideops" / "mg1" / "vfx").glob("*.png")),
    ]
    columns = 4
    cell_width, cell_height = 240, 110
    rows = (len(paths) + columns - 1) // columns
    sheet = Image.new("RGBA", (columns * cell_width, rows * cell_height), (8, 15, 10, 255))
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(paths):
        row, column = divmod(index, columns)
        x, y = column * cell_width, row * cell_height
        image = contain(Image.open(path).convert("RGBA"), cell_width - 16, cell_height - 32)
        sheet.alpha_composite(image, (x + (cell_width - image.width) // 2, y + 4))
        draw.text((x + 4, y + cell_height - 20), path.stem, fill="#d6e3c8")
    sheet.convert("RGB").save(OUT / "projectiles-vfx.webp", "WEBP", lossless=True, quality=100)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    build_portraits()
    build_sprites()
    build_projectiles_vfx()
    print(OUT)


if __name__ == "__main__":
    main()
