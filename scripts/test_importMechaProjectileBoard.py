"""Importer regression fixtures, not production art or synthesized deliverables."""
import tempfile
import unittest
from pathlib import Path
from PIL import Image, ImageDraw
from importMechaProjectileBoard import extract_rows, normalize_row

class MechaProjectileImportTests(unittest.TestCase):
    def board(self):
        image = Image.new("RGBA", (576, 288), (255, 0, 255, 255))
        draw = ImageDraw.Draw(image)
        xs, ys = [0, 143, 292, 435, 575], [0, 66, 142, 218, 287]
        for x in xs:
            draw.line((x, 0, x, 287), fill=(0, 255, 255, 255), width=2)
        for y in ys:
            draw.line((0, y, 575, y), fill=(0, 255, 255, 255), width=2)
        for row in range(4):
            for column in range(4):
                left, top = xs[column], ys[row]
                draw.rectangle((left + 24, top + 24, left + 92 + column, top + 34 + column), fill=(240, 200, 60, 255))
        return image

    def extract(self, board):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "fixture.png"
            board.save(path)
            return extract_rows(path)

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

if __name__ == "__main__":
    unittest.main()
