"""Read-only regression checks for the isolated roster-board normalizer."""
import unittest
from pathlib import Path
from PIL import Image
from importRosterActorBoard import extract, normalize, portable_repository_path
from importSideOpsActorBoards import extract_foreground

HERE = Path(__file__).resolve().parent

class RosterImportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.frames, cls.grid = extract(HERE / "peace-walker/miller-v2-openai.png", "magenta")

    def test_public_provenance_paths_are_portable(self):
        value = portable_repository_path(HERE / "peace-walker/miller-v2-openai.png")
        self.assertEqual(value, "scripts/art_sources/pw-tpp-roster/peace-walker/miller-v2-openai.png")
        self.assertNotIn("\\", value)

    def test_public_provenance_rejects_external_paths(self):
        with self.assertRaisesRegex(ValueError, "Copy source"):
            portable_repository_path(Path(Path(__file__).resolve().anchor) / "outside-roster-source.png")

    def test_complete_authored_grid(self):
        self.assertEqual(len(self.frames), 16)
        self.assertEqual(len(self.grid["xGuides"]), 5)
        self.assertEqual(len(self.grid["yGuides"]), 5)

    def test_fixed_runtime_contract_and_bounds(self):
        sheet, idle, report = normalize(self.frames)
        self.assertEqual(sheet.size, (512, 512))
        self.assertEqual(idle.size, (128, 128))
        self.assertEqual(report["uniqueCanonicalPoseCount"], 16)
        self.assertEqual(report["uniqueFrameCount"], 16)
        for bound in report["frameAlphaBounds"]:
            self.assertGreaterEqual(min(bound[0], bound[1]), 8)
            self.assertLessEqual(max(bound[2], bound[3]), 120)
        self.assertEqual(sheet.crop((0, 0, 128, 128)).tobytes(), idle.tobytes())

    def test_custom_actions_and_frame_size(self):
        _, _, report = normalize(self.frames, ("idle", "scan", "interact", "react"), 96, 6)
        self.assertEqual(report["frameSize"], 96)
        self.assertEqual([a["id"] for a in report["states"]], ["idle", "scan", "interact", "react"])

    def test_rejects_duplicate_poses(self):
        with self.assertRaisesRegex(ValueError, "Duplicate authored"):
            normalize([self.frames[0]] * 16)

    def test_rejects_empty_pose(self):
        frames = list(self.frames)
        frames[3] = Image.new("RGBA", frames[3].size)
        with self.assertRaisesRegex(ValueError, "Empty pose"):
            normalize(frames)

    def test_rejects_incomplete_or_duplicate_action_names(self):
        for states in (("idle", "move", "react"), ("idle", "idle", "interact", "react")):
            with self.assertRaises(ValueError):
                normalize(self.frames, states)

    def test_rejects_invalid_padding(self):
        with self.assertRaises(ValueError):
            normalize(self.frames, frame_size=128, padding=60)

    def test_transparent_mode_preserves_generated_alpha(self):
        existing = self.frames[0]
        result = extract_foreground(existing, "transparent")
        self.assertEqual(result.getchannel("A").tobytes(), existing.getchannel("A").tobytes())

    def test_portrait_sheet_cannot_be_guessed_as_pose_grid(self):
        with self.assertRaises(ValueError):
            extract(HERE / "peace-walker/coldman-portraits-openai.png", "magenta")

if __name__ == "__main__":
    unittest.main()
