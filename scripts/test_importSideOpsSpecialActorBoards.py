"""Geometry/identity regression tests, using synthetic fixtures, not runtime art."""
from pathlib import Path
import tempfile
import unittest

from PIL import Image, ImageDraw

from importSideOpsSpecialActorBoards import actor_definitions, extract_special_board, normalize_special_actor


def pose_frames(width=100, height=120):
    frames = []
    for index in range(16):
        frame = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(frame)
        x, y = width // 2, height - 75
        draw.rectangle((x - 9, y, x + 9, height - 12), fill=(35, 48, 60, 255))
        draw.rectangle((x + 5, y + 10, x + 14 + (index % 4) * 3, y + 16), fill=(35, 48, 60, 255))
        frames.append(frame)
    return frames


class SpecialActorImportTests(unittest.TestCase):
    def test_manifest_keeps_otacon_unarmed_and_rex_weapon_actions_separate(self):
        actors = actor_definitions()
        self.assertEqual(set(actors), {
            'mgs1-revolver-ocelot', 'mgs1-otacon', 'mgs1-metal-gear-rex',
            'mgsv-sahelanthropus', 'mgs2-metal-gear-ray', 'mg2-metal-gear-d',
            'mgs3-shagohod', 'peace-walker-pupa', 'mgs2-olga-gurlukovich', 'mgs4-gekko',
            'peace-walker-zeke', 'peace-walker-basilisk', 'peace-walker-chrysalis', 'peace-walker-cocoon'
        })
        otacon = actors['mgs1-otacon']
        self.assertNotIn('attack', otacon['states']['core'] + otacon['states']['special'])
        self.assertEqual(actors['mgs1-metal-gear-rex']['states']['core'], ['idle', 'move', 'missile', 'laser'])
        self.assertEqual(otacon['sourceFacing'], 'right')
        self.assertEqual(actors['mgs1-revolver-ocelot']['sourceFacing'], 'right')
        self.assertEqual(actors['mgs1-metal-gear-rex']['sourceFacing'], 'left')

    def test_source_boards_share_scale_and_ground_baseline(self):
        actor = actor_definitions()['mgs1-revolver-ocelot']
        output, report = normalize_special_actor({'core': pose_frames(100, 120), 'special': pose_frames(120, 140)}, actor)
        self.assertEqual(output['core'].size, (512, 512))
        self.assertEqual(output['core'].crop((0, 0, 128, 128)).tobytes(), output['special'].crop((0, 0, 128, 128)).tobytes())
        self.assertEqual(report['commonSourceCanvas'], [120, 140])

    def test_machine_cells_keep_sixteen_pixel_guard_margin(self):
        actor = actor_definitions()['mgs1-metal-gear-rex']
        output, _ = normalize_special_actor({'core': pose_frames(), 'special': pose_frames()}, actor)
        self.assertEqual(output['core'].size, (1024, 1024))
        for sheet in output.values():
            for index in range(16):
                frame = sheet.crop((index % 4 * 256, index // 4 * 256, (index % 4 + 1) * 256, (index // 4 + 1) * 256))
                box = frame.getchannel('A').getbbox()
                self.assertTrue(box[0] >= 16 and box[1] >= 16 and box[2] <= 240 and box[3] <= 240)

    def test_rejects_cloned_action_phases(self):
        actor = actor_definitions()['mgs1-otacon']
        frames = pose_frames()
        frames[1] = frames[0].copy()
        with self.assertRaisesRegex(ValueError, 'duplicate pose'):
            normalize_special_actor({'core': frames, 'special': pose_frames()}, actor)

    def test_uniform_board_calibration_aligns_standing_anchors_without_enlarging_fallen_poses(self):
        actor = actor_definitions()['mgs1-metal-gear-rex']
        core = pose_frames()
        full_special = pose_frames()
        for index in range(8, 12):
            frame = Image.new('RGBA', (100, 120), (0, 0, 0, 0))
            draw = ImageDraw.Draw(frame)
            draw.rectangle((28, 100, 74, 108), fill=(35, 48, 60, 255))
            draw.rectangle((32 + index % 4 * 5, 90, 40 + index % 4 * 5, 102), fill=(35, 48, 60, 255))
            full_special[index] = frame
        special = [frame.resize((50, 60), Image.Resampling.NEAREST) for frame in full_special]
        output, report = normalize_special_actor({'core': core, 'special': special}, actor, special_scale=2)
        standing_core = output['core'].crop((0, 0, 256, 256)).getchannel('A').getbbox()
        standing_special = output['special'].crop((0, 768, 256, 1024)).getchannel('A').getbbox()
        fallen = output['special'].crop((0, 512, 256, 768)).getchannel('A').getbbox()
        self.assertEqual(standing_core[3], standing_special[3])
        self.assertLessEqual(abs((standing_core[3] - standing_core[1]) - (standing_special[3] - standing_special[1])), 3)
        self.assertLess(fallen[3] - fallen[1], (standing_special[3] - standing_special[1]) / 2)
        self.assertFalse(report['boardCalibration']['perPoseScaling'])
        self.assertEqual(report['boardCalibration']['specialScale'], 2)

    def test_extracts_four_by_four_and_rejects_missing_pose(self):
        board = Image.new('RGBA', (520, 520), (255, 0, 255, 255))
        draw = ImageDraw.Draw(board)
        for p in [0, 130, 260, 390, 519]:
            draw.line((p, 0, p, 519), fill=(0, 255, 255, 255))
            draw.line((0, p, 519, p), fill=(0, 255, 255, 255))
        for row in range(4):
            for column in range(4):
                x, y = column * 130 + 55, row * 130 + 30
                draw.rectangle((x, y, x + 17 + column, y + 70), fill=(30, 45, 50, 255))
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'fixture.png'
            board.save(path)
            report = {}
            self.assertEqual(len(extract_special_board(path, 'magenta', 3, report)), 16)
            self.assertEqual(report['mode'], 'detected-cyan-guides')
            draw.rectangle((391, 391, 518, 518), fill=(255, 0, 255, 255))
            board.save(path)
            with self.assertRaisesRegex(ValueError, 'empty cell'):
                extract_special_board(path, 'magenta', 3)


if __name__ == '__main__':
    unittest.main()
