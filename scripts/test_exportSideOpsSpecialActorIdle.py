"""Regression tests for deterministic special-actor idle extraction."""

from hashlib import sha256
import json
from pathlib import Path
import tempfile
import unittest

from PIL import Image, ImageDraw

from exportSideOpsSpecialActorIdle import export_actor_idle, fit_bottom_center


ACTOR = {
    "id": "test-machine",
    "sourceTextureKey": "testMachine",
    "sourcePath": "/sideops/test/bosses/test-machine.png",
    "frameSize": 32,
    "bodyWidth": 20,
    "bodyHeight": 30,
}


def project_fixture(root: Path) -> tuple[Path, Path]:
    runtime = root / "public/sideops/special-animations/test-machine"
    sources = root / "scripts/art_sources/special-animations"
    runtime.mkdir(parents=True)
    sources.mkdir(parents=True)

    sheet = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
    draw = ImageDraw.Draw(sheet)
    draw.rectangle((9, 6, 18, 25), fill=(20, 80, 140, 255))
    draw.rectangle((41, 4, 59, 27), fill=(220, 30, 20, 255))
    core = runtime / "core.png"
    sheet.save(core, "PNG")

    authored = sources / "test-machine-core-openai.png"
    Image.new("RGB", (8, 8), (255, 0, 255)).save(authored, "PNG")
    provenance = {
        "actorId": "test-machine",
        "sources": {
            "core": {
                "file": authored.name,
                "sha256": sha256(authored.read_bytes()).hexdigest(),
            }
        },
    }
    (runtime / "provenance.json").write_text(json.dumps(provenance), encoding="utf-8")
    return core, authored


class SpecialActorIdleExportTests(unittest.TestCase):
    def test_isolates_only_core_frame_zero_and_records_all_hashes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            core, authored = project_fixture(root)
            report = export_actor_idle(ACTOR, root)
            output = root / "public/sideops/test/bosses/test-machine.png"
            image = Image.open(output).convert("RGBA")
            opaque_colors = {pixel[:3] for pixel in image.get_flattened_data() if pixel[3]}
            self.assertEqual(opaque_colors, {(20, 80, 140)})
            self.assertEqual(report["runtimeCore"]["sha256"], sha256(core.read_bytes()).hexdigest())
            self.assertEqual(report["authoredSourceBoard"]["sha256"], sha256(authored.read_bytes()).hexdigest())
            self.assertEqual(report["staticOutput"]["sha256"], sha256(output.read_bytes()).hexdigest())

    def test_uniform_nearest_fitting_centers_horizontally_and_anchors_bottom(self):
        source = Image.new("RGBA", (20, 10), (0, 0, 0, 0))
        ImageDraw.Draw(source).rectangle((0, 0, 19, 9), fill=(10, 20, 30, 255))
        output, report = fit_bottom_center(source, 30, 30)
        self.assertEqual(output.getchannel("A").getbbox(), (0, 15, 30, 30))
        self.assertEqual(report["uniformScale"], 1.5)
        self.assertEqual(report["fittedSize"], [30, 15])
        self.assertEqual(report["offset"], [0, 15])

        narrow = Image.new("RGBA", (10, 20), (10, 20, 30, 255))
        centered, _ = fit_bottom_center(narrow, 30, 30)
        self.assertEqual(centered.getchannel("A").getbbox(), (7, 0, 22, 30))

    def test_output_is_exact_transparent_rgba_with_zeroed_hidden_rgb(self):
        source = Image.new("RGBA", (4, 4), (200, 100, 50, 0))
        for y in range(4):
            source.putpixel((1, y), (11, 22, 33, 255))
        output, _ = fit_bottom_center(source, 8, 8)
        self.assertEqual(output.mode, "RGBA")
        self.assertEqual(output.size, (8, 8))
        hidden = [pixel for pixel in output.get_flattened_data() if pixel[3] == 0]
        self.assertTrue(hidden)
        self.assertTrue(all(pixel == (0, 0, 0, 0) for pixel in hidden))

    def test_refuses_existing_output_without_explicit_overwrite(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            project_fixture(root)
            output = root / "public/sideops/test/bosses/test-machine.png"
            output.parent.mkdir(parents=True)
            output.write_bytes(b"sentinel")
            with self.assertRaisesRegex(FileExistsError, "--overwrite"):
                export_actor_idle(ACTOR, root)
            self.assertEqual(output.read_bytes(), b"sentinel")
            self.assertFalse(output.with_suffix(".provenance.json").exists())

            report = export_actor_idle(ACTOR, root, overwrite=True)
            self.assertEqual(report["staticOutput"]["path"], "public/sideops/test/bosses/test-machine.png")
            with Image.open(output) as image:
                self.assertEqual(image.size, (20, 30))

    def test_rejects_source_path_escape_before_writing(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            project_fixture(root)
            unsafe = {**ACTOR, "sourcePath": "/../escape.png"}
            with self.assertRaisesRegex(ValueError, "Unsafe sourcePath"):
                export_actor_idle(unsafe, root)
            self.assertFalse((root.parent / "escape.png").exists())


if __name__ == "__main__":
    unittest.main()
