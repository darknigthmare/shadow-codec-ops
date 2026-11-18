"""Check the exported MSF layers and keyframe bounds. Requires Pillow."""
import json
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
pack = json.loads((HERE / "assets.json").read_text(encoding="utf-8"))
for costume in pack["costumes"]:
    with Image.open(HERE / costume["reference"]) as source:
        reference = source.convert("RGBA")
    layers = costume["layers"]
    with Image.open(HERE / layers[0]["file"]) as body:
        assembled = body.convert("RGBA")
    assert assembled.size == reference.size
    for layer in layers[1:]:
        with Image.open(HERE / layer["file"]) as source:
            part = source.convert("RGBA")
        assert part.size == (layer["width"], layer["height"])
        occupied = part.getchannel("A").point(lambda a: 255 if a else 0)
        assembled.paste(part, (layer["x"], layer["y"]), occupied)
    assert assembled.tobytes() == reference.tobytes(), costume["name"]
    for pose in costume["keyframes"]:
        with Image.open(HERE / pose["file"]) as sprite:
            assert sprite.mode == "RGBA"
            assert sprite.size == (pose["width"], pose["height"])
            box = sprite.getchannel("A").point(lambda a: 255 if a >= 32 else 0).getbbox()
            x, y, w, h = pose["alphaBounds"]
            assert box == (x, y, x + w, y + h)
    print(f'{costume["name"]} · {len(layers)-1} pièces · {len(costume["keyframes"])} poses vérifiées')
