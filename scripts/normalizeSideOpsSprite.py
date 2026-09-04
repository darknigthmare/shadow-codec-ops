from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser(description="Normalize an OpenAI Side Ops sprite onto a transparent runtime canvas.")
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--width", type=int, default=32)
    parser.add_argument("--height", type=int, default=48)
    parser.add_argument("--padding", type=int, default=1)
    parser.add_argument("--tolerance", type=int, default=48)
    args = parser.parse_args()

    image = Image.open(args.input).convert("RGBA")
    pixels = image.load()
    background = pixels[0, 0][:3]
    queue = deque()
    visited: set[tuple[int, int]] = set()

    for x in range(image.width):
        queue.append((x, 0))
        queue.append((x, image.height - 1))
    for y in range(image.height):
        queue.append((0, y))
        queue.append((image.width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        red, green, blue, alpha = pixels[x, y]
        if alpha == 0 or max(abs(red - background[0]), abs(green - background[1]), abs(blue - background[2])) <= args.tolerance:
            pixels[x, y] = (red, green, blue, 0)
            if x > 0:
                queue.append((x - 1, y))
            if x + 1 < image.width:
                queue.append((x + 1, y))
            if y > 0:
                queue.append((x, y - 1))
            if y + 1 < image.height:
                queue.append((x, y + 1))

    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError(f"No foreground subject found in {args.input}.")

    subject = image.crop(bbox)
    usable_width = max(1, args.width - args.padding * 2)
    usable_height = max(1, args.height - args.padding * 2)
    scale = min(usable_width / subject.width, usable_height / subject.height)
    resized = subject.resize(
        (max(1, round(subject.width * scale)), max(1, round(subject.height * scale))),
        Image.Resampling.LANCZOS,
    )

    canvas = Image.new("RGBA", (args.width, args.height), (0, 0, 0, 0))
    x = (args.width - resized.width) // 2
    y = args.height - args.padding - resized.height
    canvas.alpha_composite(resized, (x, y))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(args.output, optimize=True)
    print(f"Saved {args.output.resolve()} ({args.width}x{args.height})")


if __name__ == "__main__":
    main()
