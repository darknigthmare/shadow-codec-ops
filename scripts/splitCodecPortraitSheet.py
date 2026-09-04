from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


EXPRESSIONS = ("neutral", "serious", "warning", "calm", "humor", "glitch")


def main() -> None:
    parser = argparse.ArgumentParser(description="Split a 3x2 OpenAI Codec portrait sheet into six 512px WebP assets.")
    parser.add_argument("sheet", type=Path)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("--quality", type=int, default=88)
    args = parser.parse_args()

    with Image.open(args.sheet) as source:
        image = source.convert("RGB")
        if image.width % 3 or image.height % 2:
            raise ValueError(f"Expected a 3x2 sheet, received {image.width}x{image.height}.")

        cell_width = image.width // 3
        cell_height = image.height // 2
        args.output_dir.mkdir(parents=True, exist_ok=True)
        for index, expression in enumerate(EXPRESSIONS):
            column = index % 3
            row = index // 3
            cell = image.crop((
                column * cell_width,
                row * cell_height,
                (column + 1) * cell_width,
                (row + 1) * cell_height,
            ))
            if cell_width != cell_height:
                square_size = min(cell_width, cell_height)
                left = max(0, (cell_width - square_size) // 2)
                # Portrait sheets favor head-and-shoulders framing, so tall cells
                # are cropped from the top instead of losing hair/forehead detail.
                top = 0 if cell_height > cell_width else max(0, (cell_height - square_size) // 2)
                cell = cell.crop((left, top, left + square_size, top + square_size))
            crop = cell.resize((512, 512), Image.Resampling.LANCZOS)
            crop.save(args.output_dir / f"{expression}.webp", "WEBP", quality=args.quality, method=6)

    print(f"Saved {len(EXPRESSIONS)} portraits to {args.output_dir.resolve()}")


if __name__ == "__main__":
    main()
