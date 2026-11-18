"""Vérifier les découpes et les canaux RGBA des planches P53 avec Pillow."""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image


def verify(root):
    manifest = json.loads((root / "walk-cycles.json").read_text(encoding="utf-8"))
    count = 0
    for cycle in manifest["cycles"]:
        with Image.open(root / cycle["atlas"]) as source:
            atlas = source.convert("RGBA")
        for frame in cycle["frames"] + cycle["archivedFrames"]:
            path = root / frame["file"]
            content = path.read_bytes()
            if hashlib.sha256(content).hexdigest() != frame["sha256"]:
                raise ValueError(f"Empreinte PNG différente pour {path.name}")
            x, y, width, height = frame["sourceRect"]
            if x < 0 or y < 0 or x + width > atlas.width or y + height > atlas.height:
                raise ValueError(f"Rectangle hors planche pour {path}")
            expected = atlas.crop((x, y, x + width, y + height))
            with Image.open(path) as img:
                actual = img.convert("RGBA")
            if actual.size != expected.size or actual.tobytes() != expected.tobytes():
                raise ValueError(f"Découpe différente de sa planche pour {path}")
            if hashlib.sha256(actual.tobytes()).hexdigest() != frame["rgbaSha256"]:
                raise ValueError(f"Empreinte RGBA différente pour {path}")
            count += 1
    return count


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--verify", action="store_true", help="Vérifier tous les PNG du manifeste")
    parser.parse_args()
    print(f"{verify(Path(__file__).resolve().parent)} découpes conformes.")
