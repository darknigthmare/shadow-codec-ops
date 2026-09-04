from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Normalize an OpenAI Side Ops environment painting into a 16:9 runtime WebP."
    )
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--width", type=int, default=960)
    parser.add_argument("--height", type=int, default=540)
    parser.add_argument("--quality", type=int, default=86)
    parser.add_argument(
        "--centering-y",
        type=float,
        default=0.48,
        help="Vertical focal point used by ImageOps.fit, from 0 (top) to 1 (bottom).",
    )
    args = parser.parse_args()

    if args.width <= 0 or args.height <= 0:
        raise ValueError("Backdrop dimensions must be positive.")
    if not 0 <= args.centering_y <= 1:
        raise ValueError("--centering-y must be between 0 and 1.")

    source = Image.open(args.input).convert("RGB")
    backdrop = ImageOps.fit(
        source,
        (args.width, args.height),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, args.centering_y),
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    backdrop.save(args.output, "WEBP", quality=args.quality, method=6)
    print(f"Saved {args.output.resolve()} ({args.width}x{args.height})")


if __name__ == "__main__":
    main()
