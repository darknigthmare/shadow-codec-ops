"""Regression checks for sprite extraction geometry, independent of art content."""
import unittest
from PIL import Image, ImageDraw
from importSideOpsActorBoards import detect_grid_bands, extract_foreground, normalize_actor


class ActorBoardImportTests(unittest.TestCase):
    def test_detects_irregular_full_grid_without_assuming_equal_cells(self):
        board = Image.new('RGBA', (800, 600), (255, 0, 255, 255))
        draw = ImageDraw.Draw(board)
        xs = [0, 94, 204, 293, 408, 501, 598, 704, 799]
        ys = [0, 105, 193, 302, 397, 511, 599]
        for x in xs:
            draw.line((x, 0, x, 599), fill=(0, 255, 255, 255))
        for y in ys:
            draw.line((0, y, 799, y), fill=(0, 255, 255, 255))
        self.assertEqual(detect_grid_bands(board, 'x', 8), [(x, x) for x in xs])
        self.assertEqual(detect_grid_bands(board, 'y', 6), [(y, y) for y in ys])

    def test_rejects_missing_column_instead_of_slicing_a_merged_pose(self):
        board = Image.new('RGBA', (800, 600), (255, 0, 255, 255))
        draw = ImageDraw.Draw(board)
        for x in [0, 100, 200, 300, 400, 500, 600, 799]:
            draw.line((x, 0, x, 599), fill=(0, 255, 255, 255))
        with self.assertRaisesRegex(ValueError, 'expected 7 internal'):
            detect_grid_bands(board, 'x', 8)

    def test_removes_enclosed_key_color_without_erasing_red_prosthetic_color(self):
        cell = Image.new('RGBA', (40, 40), (255, 0, 255, 255))
        draw = ImageDraw.Draw(cell)
        draw.rectangle((8, 8, 30, 30), fill=(20, 20, 20, 255))
        draw.rectangle((12, 12, 18, 18), fill=(225, 0, 230, 255))
        draw.rectangle((20, 12, 25, 18), fill=(180, 25, 20, 255))
        extracted = extract_foreground(cell, 'magenta')
        self.assertEqual(extracted.getpixel((14, 14))[3], 0)
        self.assertEqual(extracted.getpixel((23, 14)), (180, 25, 20, 255))

    def test_aligns_ground_baseline_between_boards_with_different_cell_sizes(self):
        def frames(width, height):
            result = []
            for index in range(16):
                frame = Image.new('RGBA', (width, height), (0, 0, 0, 0))
                draw = ImageDraw.Draw(frame)
                x, y = width // 2, height - 70
                draw.rectangle((x - 10, y, x + 6, height - 12), fill=(30, 40, 50, 255))
                draw.rectangle((x + 6, y + 12, x + 12 + index % 4 * 3, y + 17), fill=(30, 40, 50, 255))
                result.append(frame)
            return result
        sheets, _ = normalize_actor({'mobility': frames(80, 100), 'combat': frames(100, 120)})
        mobility = sheets['mobility'].crop((0, 0, 128, 128))
        combat = sheets['combat'].crop((0, 0, 128, 128))
        self.assertEqual(mobility.tobytes(), combat.tobytes())

    def test_cyan_guide_fringe_key_preserves_real_boot_at_cell_edge(self):
        cell = Image.new('RGBA', (40, 40), (255, 0, 255, 255))
        cell.putpixel((0, 7), (48, 84, 187, 255))
        cell.putpixel((39, 8), (113, 169, 254, 255))
        cell.putpixel((20, 39), (12, 18, 9, 255))
        cell.putpixel((0, 21), (60, 80, 110, 255))
        extracted = extract_foreground(cell, 'magenta', cyan_guides=True)
        self.assertEqual(extracted.getpixel((0, 7))[3], 0)
        self.assertEqual(extracted.getpixel((39, 8))[3], 0)
        self.assertEqual(extracted.getpixel((20, 39)), (12, 18, 9, 255))
        self.assertEqual(extracted.getpixel((0, 21)), (60, 80, 110, 255))
        self.assertEqual(extracted.getchannel('A').getbbox(), (0, 21, 21, 40))

    def test_guide_color_in_sprite_interior_is_never_removed(self):
        cell = Image.new('RGBA', (40, 40), (255, 0, 255, 255))
        cell.putpixel((20, 20), (48, 84, 187, 255))
        extracted = extract_foreground(cell, 'magenta', cyan_guides=True)
        self.assertEqual(extracted.getpixel((20, 20)), (48, 84, 187, 255))


if __name__ == '__main__':
    unittest.main()
