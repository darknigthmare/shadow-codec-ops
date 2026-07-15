#!/usr/bin/env python3
"""Normalize a chroma-keyed generated image into a tiny MG1 RGBA sprite."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("width", type=int)
    parser.add_argument("height", type=int)
    parser.add_argument("--padding", type=int, default=1)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source = Image.open(args.input).convert("RGBA")
    alpha = source.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        raise SystemExit(f"No visible pixels found in {args.input}")

    subject = source.crop(bbox)
    usable_width = max(1, args.width - (args.padding * 2))
    usable_height = max(1, args.height - (args.padding * 2))
    ratio = min(usable_width / subject.width, usable_height / subject.height)
    resized = subject.resize(
        (max(1, round(subject.width * ratio)), max(1, round(subject.height * ratio))),
        Image.Resampling.NEAREST,
    )

    canvas = Image.new("RGBA", (args.width, args.height), (0, 0, 0, 0))
    x = (args.width - resized.width) // 2
    y = args.height - args.padding - resized.height
    canvas.alpha_composite(resized, (x, y))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(args.output, optimize=True)


if __name__ == "__main__":
    main()
