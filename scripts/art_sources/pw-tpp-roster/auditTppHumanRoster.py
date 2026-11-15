"""Audit the twelve authored TPP human sheets and two portrait sets, read-only art."""
from __future__ import annotations
import argparse
from hashlib import sha256
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
ACTORS = ("miller", "ocelot", "huey", "code-talker", "quiet", "pequod",
          "skull-face", "eli", "tretij-rebenok", "man-on-fire", "ishmael", "paz-1984")
EXPRESSIONS = ("neutral", "serious", "warning", "calm", "humor", "glitch")


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def audit():
    reports = []
    preview = Image.new("RGB", (768, 576), "#242832")
    drawing = ImageDraw.Draw(preview)
    for actor_index, slug in enumerate(ACTORS):
        path = ROOT / "public/sideops/roster/phantom-pain" / f"{slug}.png"
        provenance_path = path.with_suffix(".provenance.json")
        provenance = json.loads(provenance_path.read_text(encoding="utf-8"))
        sheet = Image.open(path)
        assert sheet.mode == "RGBA" and sheet.size == (512, 512), (slug, sheet.mode, sheet.size)
        assert digest(path) == provenance["outputs"]["sheet"]["sha256"], (slug, "sheet hash")
        source = ROOT / "scripts/art_sources/pw-tpp-roster" / f"tpp-{slug}-core.png"
        assert digest(source) == provenance["source"]["sha256"], (slug, "source hash")
        frames, bounds, hashes = [], [], []
        key_pixels = hidden_rgb = 0
        approved_turquoise = 0
        # These interior pixels are the canon turquoise bolo stone, visually
        # checked against source and runtime; they are not background fringe.
        pendant_pixels = {(1, 64, 40), (1, 65, 40), (5, 63, 41), (11, 57, 41)}
        for index in range(16):
            x, y = index % 4 * 128, index // 4 * 128
            frame = sheet.crop((x, y, x+128, y+128))
            bound = frame.getchannel("A").getbbox()
            assert bound and min(bound[:2]) >= 8 and max(bound[2:]) <= 120, (slug, index, bound)
            bounds.append(bound)
            hashes.append(sha256(frame.tobytes()).hexdigest())
            for pixel_index, (r, g, b, a) in enumerate(frame.getdata()):
                if a and ((r >= 180 and b >= 180 and g <= 90) or (g >= 180 and b >= 180 and r <= 90)):
                    if slug == "code-talker" and (index, pixel_index % 128, pixel_index // 128) in pendant_pixels and g >= 180 and b >= 180 and r <= 90:
                        approved_turquoise += 1
                    else:
                        key_pixels += 1
                if not a and (r or g or b):
                    hidden_rgb += 1
            frames.append(frame)
        assert not key_pixels, (slug, "residual key-color pixels", key_pixels)
        assert not hidden_rgb, (slug, "nonzero hidden RGB", hidden_rgb)
        assert len(set(hashes)) == 16, (slug, "duplicate frames")
        assert hashes == provenance["runtime"]["frameRgbaSha256"], (slug, "frame hashes")
        idle_path = path.with_name(slug + "-idle.png")
        assert Image.open(idle_path).convert("RGBA").tobytes() == frames[0].tobytes(), (slug, "idle mismatch")
        assert digest(idle_path) == provenance["outputs"]["idle"]["sha256"], (slug, "idle hash")
        px, py = actor_index % 4 * 192, actor_index // 4 * 192
        preview.paste(frames[0], (px+32, py+16), frames[0])
        drawing.text((px+6, py+152), slug, fill="white")
        reports.append({"id": slug, "frames": 16, "uniqueFrames": len(set(hashes)), "padding": 8,
                        "residualKeyColorPixels": key_pixels, "approvedTurquoisePendantPixels": approved_turquoise,
                        "hiddenRgbPixels": hidden_rgb,
                        "idleBounds": provenance["runtime"]["idleBounds"],
                        "states": [state["id"] for state in provenance["runtime"]["states"]],
                        "sha256": digest(path)})
    portraits = []
    for slug, folder in (("man-on-fire", "man_on_fire"), ("paz-1984", "paz_1984")):
        source = ROOT / "scripts/art_sources/pw-tpp-roster" / f"tpp-{slug}-portraits.png"
        size = Image.open(source).size
        assert size == (1536, 1024), (slug, size)
        outputs = []
        for expression in EXPRESSIONS:
            path = ROOT / "public/portraits/mgsv" / folder / f"{expression}.webp"
            assert Image.open(path).size == (512, 512), (slug, expression)
            outputs.append({"expression": expression, "file": path.relative_to(ROOT).as_posix(), "sha256": digest(path)})
        assert len({output["sha256"] for output in outputs}) == 6, (slug, "duplicate portraits")
        portraits.append({"id": slug, "source": {"file": source.relative_to(ROOT).as_posix(), "sha256": digest(source)}, "outputs": outputs})
    return {"schemaVersion": 1, "actors": reports, "portraits": portraits,
            "summary": {"actorSheets": 12, "authoredFrames": 192, "portraitSets": 2, "portraits": 12,
                        "residualKeyPixels": 0, "nonzeroHiddenRgbPixels": 0},
            "scope": "Mechanical audit of authored archive assets, not proof of smooth animation, 1:1 canon likeness or new boss gameplay."}, preview


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path)
    parser.add_argument("--contact-sheet", type=Path)
    args = parser.parse_args()
    report, preview = audit()
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, indent=2)+"\n", encoding="utf-8")
    if args.contact_sheet:
        args.contact_sheet.parent.mkdir(parents=True, exist_ok=True)
        preview.save(args.contact_sheet)
    print(json.dumps(report["summary"]))


if __name__ == "__main__":
    main()
