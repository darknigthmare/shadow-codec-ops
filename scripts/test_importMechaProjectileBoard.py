"""Importer regression fixtures, not production art or synthesized deliverables."""
import tempfile
import unittest
import io
import json
from contextlib import redirect_stdout
from hashlib import sha256
from pathlib import Path
from unittest.mock import patch
from PIL import Image, ImageDraw
import importMechaProjectileBoard as importer
from importMechaProjectileBoard import extract_rows, normalize_row, select_definitions

class MechaProjectileImportTests(unittest.TestCase):
    def board(self, rows=4):
        image = Image.new("RGBA", (576, 288), (255, 0, 255, 255))
        draw = ImageDraw.Draw(image)
        xs = [0, 143, 292, 435, 575]
        ys = [0, 66, 142, 218, 287] if rows == 4 else [0, 142, 287]
        for x in xs:
            draw.line((x, 0, x, 287), fill=(0, 255, 255, 255), width=2)
        for y in ys:
            draw.line((0, y, 575, y), fill=(0, 255, 255, 255), width=2)
        for row in range(rows):
            for column in range(4):
                left, top = xs[column], ys[row]
                draw.rectangle((left + 24, top + 24, left + 92 + column, top + 34 + column), fill=(240, 200, 60, 255))
        return image

    def extract(self, board, row_count=4):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "fixture.png"
            board.save(path)
            return extract_rows(path, row_count)

    def test_irregular_guides_preserve_four_unique_phases_and_padding(self):
        rows, grid = self.extract(self.board())
        self.assertEqual(len(grid["cellRects"]), 16)
        self.assertEqual(len(rows), 4)
        for frames in rows:
            sheet, report = normalize_row(frames)
            self.assertEqual(sheet.size, (768, 64))
            self.assertEqual(len(set(report["frameRgbaSha256"])), 4)
            for frame in range(4):
                bbox = sheet.crop((frame * 192, 0, (frame + 1) * 192, 64)).getbbox()
                self.assertTrue(bbox[0] > 0 and bbox[1] > 0 and bbox[2] < 192 and bbox[3] < 64)

    def test_rejects_duplicate_phases(self):
        frame = Image.new("RGBA", (64, 32))
        ImageDraw.Draw(frame).rectangle((8, 8, 40, 20), fill=(255, 255, 255, 255))
        with self.assertRaisesRegex(ValueError, "Duplicate"):
            normalize_row([frame] * 4)

    def test_rejects_empty_or_incomplete_boards(self):
        with self.assertRaises(ValueError):
            self.extract(Image.new("RGBA", (576, 288), (255, 0, 255, 255)))
        board = self.board()
        ImageDraw.Draw(board).rectangle((4, 4, 139, 62), fill=(255, 0, 255, 255))
        with self.assertRaisesRegex(ValueError, "Empty"):
            self.extract(board)

    def test_rejects_true_foreground_crossing_crop_border(self):
        board = self.board()
        ImageDraw.Draw(board).rectangle((3, 22, 60, 35), fill=(255, 240, 200, 255))
        with self.assertRaisesRegex(ValueError, "Clipped"):
            self.extract(board)

    def definitions(self):
        rows = []
        for group, count in (("mecha", 4), ("peace-walker", 2)):
            for row in range(count):
                key = f"{group}-{row}"
                item = {"id": key, "sourceTextureKey": key, "textureKey": key,
                        "path": f"/sideops/boss-projectiles/{key}.png", "row": row,
                        "frameWidth": 192, "frameHeight": 64}
                if group != "mecha":
                    item["sheetId"] = group
                rows.append(item)
        return rows

    def test_two_row_board_has_eight_distinct_authored_phases(self):
        rows, grid = self.extract(self.board(2), 2)
        self.assertEqual(len(rows), 2)
        self.assertEqual(len(grid["cellRects"]), 8)
        self.assertEqual(len(grid["yGuides"]), 3)
        for frames in rows:
            sheet, metadata = normalize_row(frames)
            self.assertEqual(sheet.size, (768, 64))
            self.assertEqual(len(set(metadata["frameRgbaSha256"])), 4)

    def test_complete_slightly_inset_outer_guides_are_not_extra_internal_cells(self):
        board = Image.new("RGBA", (596, 300), (255, 0, 255, 255))
        board.alpha_composite(self.board(2), (10, 6))
        rows, grid = self.extract(board, 2)
        self.assertEqual(len(rows), 2)
        self.assertEqual(len(grid["xGuides"]), 5)
        self.assertEqual(len(grid["yGuides"]), 3)
        self.assertEqual(grid["xGuides"][0][0], 10)
        # Removing a real divider must still fail, not infer a replacement.
        ImageDraw.Draw(board).rectangle((151, 6, 155, 293), fill=(255, 0, 255, 255))
        with self.assertRaises(ValueError):
            self.extract(board, 2)

    def test_selects_legacy_and_new_groups_without_mutating_definitions(self):
        definitions = self.definitions()
        original = json.dumps(definitions)
        self.assertEqual(len(select_definitions(definitions, "mecha")), 4)
        self.assertEqual(len(select_definitions(definitions, "peace-walker")), 2)
        self.assertEqual(json.dumps(definitions), original)
        with self.assertRaisesRegex(ValueError, "Unknown"):
            select_definitions(definitions, "missing")

    def test_rejects_missing_duplicate_or_unsupported_rows_and_cross_group_collisions(self):
        definitions = self.definitions()
        for broken in (definitions[:-1], definitions + [{**definitions[-1], "row": 2}],
                       definitions[:-1] + [{**definitions[-1], "row": 0}]):
            with self.assertRaisesRegex(ValueError, "two or four"):
                select_definitions(broken, "peace-walker")
        for key in ("id", "path", "textureKey", "sourceTextureKey"):
            broken = self.definitions()
            broken[-1][key] = broken[0][key]
            with self.assertRaisesRegex(ValueError, "Duplicate"):
                select_definitions(broken, "peace-walker")
        with self.assertRaisesRegex(ValueError, "two or four"):
            self.extract(self.board(), 3)

    def test_new_group_requires_its_own_prompt(self):
        for group in ("peace-walker", "peace-walker-support"):
            with patch("sys.argv", ["importer", "--source", "unused.png", "--sheet-id", group]):
                with redirect_stdout(io.StringIO()), self.assertRaises(SystemExit) as caught:
                    importer.main()
            self.assertEqual(caught.exception.code, 2)

    def test_support_group_has_distinct_paths_and_two_authored_rows(self):
        definitions = json.loads(importer.DEFINITIONS.read_text(encoding="utf-8"))
        selected = select_definitions(definitions, "peace-walker-support")
        self.assertEqual([item["sourceTextureKey"] for item in selected], ["peaceWalkerChrysalis", "peaceWalkerCocoon"])
        self.assertEqual([item["row"] for item in selected], [0, 1])
        self.assertEqual(importer.SHEET_FILES["peace-walker-support"], ("peace-walker-support-projectiles-openai.png", "peace-walker-support-manifest.json"))

    def test_legacy_new_group_requires_its_own_prompt(self):
        with patch("sys.argv", ["importer", "--source", "unused.png", "--sheet-id", "peace-walker"]):
            with redirect_stdout(io.StringIO()), self.assertRaises(SystemExit) as caught:
                importer.main()
        self.assertEqual(caught.exception.code, 2)

    def test_group_import_preserves_other_group_assets_sources_and_provenance(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            output = root / "output"
            definitions = self.definitions()
            definitions_path = root / "definitions.json"
            definitions_path.write_text(json.dumps(definitions), encoding="utf-8")
            prompt = root / "prompt.json"
            prompt.write_text(json.dumps({"prompt": "authored fixture, not production art"}), encoding="utf-8")
            protected = [output / "public" / item["path"].lstrip("/") for item in definitions[:4]]
            protected += [output / "scripts/art_sources/mecha-projectiles" / name
                          for name in ("mecha-projectiles-openai.png", "manifest.json")]
            for path in protected:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(b"original group sentinel")
            source = root / "two-row.png"
            self.board(2).save(source)
            argv = ["importer", "--source", str(source), "--sheet-id", "peace-walker",
                    "--prompt-file", str(prompt), "--output-root", str(output)]
            with patch.object(importer, "DEFINITIONS", definitions_path), patch("sys.argv", argv), redirect_stdout(io.StringIO()):
                importer.main()
            for path in protected:
                self.assertEqual(path.read_bytes(), b"original group sentinel")
            manifest_path = output / "scripts/art_sources/mecha-projectiles/peace-walker-manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            self.assertEqual(manifest["sheetId"], "peace-walker")
            self.assertEqual(manifest["authoredPhases"], 8)
            self.assertEqual(manifest["synthesizedPhases"], 0)
            self.assertEqual(manifest["source"], "scripts/art_sources/mecha-projectiles/peace-walker-projectiles-openai.png")
            self.assertEqual(manifest["sourceSha256"], sha256(source.read_bytes()).hexdigest())
            self.assertEqual([item["id"] for item in manifest["outputs"]], [item["id"] for item in definitions[4:]])
            new_paths = [output / "public" / item["path"].lstrip("/") for item in definitions[4:]]
            new_paths += [manifest_path, output / manifest["source"]]
            new_hashes = {path: sha256(path.read_bytes()).hexdigest() for path in new_paths}
            # The omitted --sheet-id still imports the historical four-row group only.
            self.board().save(source)
            argv = ["importer", "--source", str(source), "--prompt-file", str(prompt), "--output-root", str(output)]
            with patch.object(importer, "DEFINITIONS", definitions_path), patch("sys.argv", argv), redirect_stdout(io.StringIO()):
                importer.main()
            for path, digest in new_hashes.items():
                self.assertEqual(sha256(path.read_bytes()).hexdigest(), digest)
            old_manifest = json.loads((output / "scripts/art_sources/mecha-projectiles/manifest.json").read_text(encoding="utf-8"))
            self.assertEqual(old_manifest["authoredPhases"], 16)
            self.assertNotIn("sheetId", old_manifest)

if __name__ == "__main__":
    unittest.main()
