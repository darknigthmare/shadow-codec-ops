import json
from pathlib import Path
import unittest
from PIL import Image, ImageDraw
from importSideOpsCommonProps import extract_objects, validate_definitions


class CommonPropsTests(unittest.TestCase):
    def setUp(self):
        self.definitions = json.loads((Path(__file__).resolve().parents[1] / 'src/data/sideopsCommonProps.json').read_text())
        # Fixtures exercise acceptance of all eight authoring slots, including
        # the two deliberately deferred production structures.
        for item in self.definitions:
            item.pop('runtimeStatus', None)

    def test_runtime_contracts_are_unique(self):
        validate_definitions(self.definitions)
        self.assertEqual({d['textureKey'] for d in self.definitions}, {'keycard', 'door', 'elevator', 'cameraNode', 'ration', 'ammoBox', 'chaffPickup', 'secretItem'})

    def test_reject_duplicate_cells(self):
        self.definitions[-1]['column'] = 2
        with self.assertRaises(ValueError):
            validate_definitions(self.definitions)

    def test_reject_unsafe_path(self):
        self.definitions[0]['path'] = '/sideops/common-props/../../outside.png'
        with self.assertRaises(ValueError):
            validate_definitions(self.definitions)

    def test_reject_missing_real_dividers(self):
        with self.assertRaises(ValueError):
            extract_objects(Image.new('RGBA', (800, 400), '#ff00ff'), self.definitions)

    def fixture_board(self):
        board = Image.new('RGBA', (801, 401), '#ff00ff')
        draw = ImageDraw.Draw(board)
        for x in range(0, 801, 200):
            draw.line((x, 0, x, 400), fill='#00ffff', width=3)
        for y in range(0, 401, 200):
            draw.line((0, y, 800, y), fill='#00ffff', width=3)
        for index, item in enumerate(self.definitions):
            x, y = item['column'] * 200, item['row'] * 200
            width = 52 if item['id'] == 'door' else 87 if item['id'] == 'elevator' else 100
            draw.rectangle((x + 40, y + 30, x + 40 + width, y + 170), fill=(30 + index * 20, 90, 50, 255))
        return board

    def test_mechanical_extraction_preserves_dimensions_and_unique_objects(self):
        board = self.fixture_board()
        prepared, grid = extract_objects(board, self.definitions)
        self.assertEqual(len(prepared), 8)
        self.assertEqual(len(grid['xGuides']), 5)
        for item, _, metadata in prepared:
            self.assertLessEqual(metadata['fittedSize'][0], item['width'])
            self.assertLessEqual(metadata['fittedSize'][1], item['height'])

    def test_structural_source_overrides_only_two_objects_without_touching_the_other_six(self):
        board = self.fixture_board()
        original, _ = extract_objects(board, self.definitions)
        structures = Image.new('RGBA', (801, 401), '#ff00ff')
        draw = ImageDraw.Draw(structures)
        for x in (0, 400, 800):
            draw.line((x, 0, x, 400), fill='#00ffff', width=3)
        for y in (0, 400):
            draw.line((0, y, 800, y), fill='#00ffff', width=3)
        draw.rectangle((135, 26, 263, 372), fill=(80, 90, 100, 255))
        draw.rectangle((500, 26, 714, 372), fill=(90, 100, 110, 255))
        # A bad door in the original board must not be used when the dedicated
        # authored source was explicitly selected.
        ImageDraw.Draw(board).rectangle((215, 15, 380, 180), fill=(80, 90, 100, 255))
        with self.assertRaisesRegex(ValueError, 'invisible interaction boundary'):
            extract_objects(board, self.definitions)
        replaced, grid = extract_objects(board, self.definitions, structures)
        self.assertEqual(len(grid['structures']['xGuides']), 3)
        for before, after in zip(original, replaced):
            if after[0]['id'] in ('door', 'elevator'):
                self.assertEqual(after[2]['sourceId'], 'structures')
            else:
                self.assertEqual(after[1], before[1])
                self.assertEqual(after[2]['sourceId'], 'main')

    def test_rejects_structural_source_without_real_grid(self):
        with self.assertRaises(ValueError):
            extract_objects(self.fixture_board(), self.definitions, Image.new('RGBA', (801, 401), '#ff00ff'))

    def test_deferred_assets_are_not_exported_or_counted_as_runtime_coverage(self):
        for item in self.definitions:
            if item['id'] in ('door', 'elevator'):
                item['runtimeStatus'] = 'deferred'
        prepared, _ = extract_objects(self.fixture_board(), self.definitions)
        self.assertEqual(len(prepared), 6)
        self.assertNotIn('door', [item['id'] for item, _, _ in prepared])


if __name__ == '__main__':
    unittest.main()
