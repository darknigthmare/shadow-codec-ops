"""Crop four authored interior paintings from each OpenAI 2x2 atlas."""
import argparse
from hashlib import sha256
import json
from pathlib import Path
from PIL import Image, ImageOps
from importSideOpsActorBoards import detect_grid_bands

ROOT = Path(__file__).resolve().parents[1]
PANELS = {
    "mg1": ("prison", "corridor", "tx55-hangar", "command"),
    "mgs1": ("dock", "armory", "laboratory", "rex-hangar"),
    "mgs1-extra": ("holding-cells", "mantis-study", "wolfdog-cave", "cold-storage"),
}
REFERENCES = {
    "mg1": ["https://www.konami.com/mg/archive/mg25th/truth/mg.html"],
    "mgs1": ["https://www.konami.com/mg/archive/mgs_tlc/"],
    "mgs1-extra": ["https://www.konami.com/mg/history/jp/ja/mgs", "https://www.konami.com/mg/archive/mg25th/truth/mgs.html", "https://www.mobygames.com/game/3635/metal-gear-solid/screenshots/windows/36803/", "https://www.mobygames.com/game/windows/metal-gear-solid__/screenshots/gameShotId%2C36807/"],
}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pack", choices=PANELS, required=True)
    args = parser.parse_args()
    source = ROOT / "scripts/art_sources/dedicated-interiors" / f"{args.pack}-interiors-openai.png"
    board = Image.open(source).convert("RGBA")
    xs = detect_grid_bands(board, "x", 2)
    ys = detect_grid_bands(board, "y", 2)
    if not xs or not ys:
        raise ValueError("Atlas requires one complete cyan guide on each axis.")
    out = ROOT / "public/sideops/backdrops/dedicated"
    out.mkdir(parents=True, exist_ok=True)
    panels = []
    for i, name in enumerate(PANELS[args.pack]):
        x, y = i % 2, i // 2
        rect = (xs[x][1] + 4, ys[y][1] + 4, xs[x + 1][0] - 3, ys[y + 1][0] - 3)
        if rect[2] - rect[0] < 640 or rect[3] - rect[1] < 360:
            raise ValueError("Interior source panel is too small.")
        painting = ImageOps.fit(board.crop(rect).convert("RGB"), (960, 540),
                                method=Image.Resampling.LANCZOS, centering=(0.5, 0.48))
        pack = "mgs1" if args.pack == "mgs1-extra" else args.pack
        path = out / f"{pack}-{name}.webp"
        painting.save(path, "WEBP", quality=88, method=6)
        panels.append({"id": name, "crop": rect, "width": 960, "height": 540,
                       "path": "/" + path.relative_to(ROOT / "public").as_posix(),
                       "sha256": sha256(path.read_bytes()).hexdigest()})
        print(f"Saved {path} (960x540)")
    prompts = json.loads((source.parent / "prompts.json").read_text(encoding="utf-8"))
    report = {
        "schemaVersion": 1, "provider": "OpenAI", "mode": "built-in-imagegen",
        "packId": args.pack, "grid": [2, 2], "source": source.relative_to(ROOT).as_posix(),
        "sourceSize": list(board.size), "sourceSha256": sha256(source.read_bytes()).hexdigest(),
        "prompt": prompts[args.pack], "references": REFERENCES[args.pack],
        "provenance": "Original fan-made side-view adaptations, no copied official textures.",
        "processing": "Detected cyan guides excluded; four crops normalized with LANCZOS. No content synthesis or retouch.",
        "panels": panels,
    }
    (source.parent / f"{args.pack}-manifest.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

if __name__ == "__main__":
    main()
