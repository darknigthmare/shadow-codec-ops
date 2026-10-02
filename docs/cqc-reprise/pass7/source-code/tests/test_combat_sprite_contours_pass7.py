"""Inspect PASS7 native alpha/crop geometry read-only, with no image editing.

Opaque body means the original inspector's connected alpha >80 component.
Near-transparent fringes and subjective identity are separate browser/artist reviews.
"""
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest

os.environ.setdefault('MPLCONFIGDIR', str(Path(tempfile.gettempdir())/'cqc-pass7-matplotlib'))
import numpy as np
from matplotlib.path import Path as Polygon
from PIL import Image
from scipy import ndimage

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('pass7_sheet_inspector',ROOT/'tools/inspect_combat_sprite_sheet.py')
inspector=importlib.util.module_from_spec(spec);spec.loader.exec_module(inspector)
UIDS=['core__raven','core__old_snake','core__quiet','archive__skull_face']
PINNED={
 'src/cqc-sprite-renderer.js':'bf08ed6aa762f9eef16cb2de268005bbd57d1fc2d60f8d70556f145e2f4cec25',
 'tools/prepare_combat_sprite.py':'343923c7ff334b6f57d68cb1d159d9085191e5819f15d11f4aa0c735abddda52',
 'tools/inspect_combat_sprite_sheet.py':'15a0bb6cbd271afa8a902ef63a656dc8a3f6251c320c3507234e2f7883310999',
}

class NativePass7ContourTests(unittest.TestCase):
    def test_all_288_opaque_native_bodies_are_complete_without_neighboring_pose_fragments(self):
        catalog=json.loads((ROOT/'data/combat-sprite-catalog-v1.json').read_text());total=0;files=0
        for uid in UIDS:
            e=catalog['entries'][uid];self.assertIs(e['mirror'],False)
            frames={(f['file'],tuple(f['rect'])):f for a in [*e['actions'].values(),*e['oppositeActions'].values()] for f in a['frames']}
            self.assertEqual(len(frames),72,uid)
            for file in sorted({file for file,_ in frames}):
                source=ROOT/file;before=hashlib.sha256(source.read_bytes()).hexdigest();files+=1
                layout=inspector.inspect_components(source,4,3,file)
                with Image.open(source) as image:
                    self.assertEqual(image.format,'PNG');self.assertIn('A',image.getbands());alpha=np.array(image.getchannel('A'));self.assertEqual(int(alpha.min()),0)
                labels,_=ndimage.label(alpha>80);body_ids={cell['component'] for cell in layout['cells']}
                self.assertEqual(len(body_ids),12,file)
                for cell in layout['cells']:
                    frame=frames.get((file,tuple(cell['frame']['rect'])));self.assertIsNotNone(frame,f'{uid} pose {cell["index"]}')
                    self.assertEqual(frame['sha256'],before)
                    x,y,width,height=frame['rect'];own_y,own_x=np.where(labels==cell['component'])
                    self.assertTrue(((own_x>=x)&(own_x<x+width)&(own_y>=y)&(own_y<y+height)).all(),f'{uid} complete native body crop')
                    if frame.get('clipPolygon'):
                        polygon=Polygon(np.array(frame['clipPolygon'])*[width,height])
                        self.assertTrue(polygon.contains_points(np.c_[own_x-x+.5,own_y-y+.5]).all(),f'{uid} {file} pose {cell["index"]}: own opaque body/equipment clipped')
                        foreign=np.isin(labels[y:y+height,x:x+width],list(body_ids-{cell['component']}));foreign_y,foreign_x=np.where(foreign)
                        self.assertFalse(polygon.contains_points(np.c_[foreign_x+.5,foreign_y+.5]).any(),f'{uid} neighboring body included')
                    else:self.assertEqual(cell['foreign_body_opaque_pixels_in_rect'],0,f'{uid} neighboring body included')
                    total+=1
                self.assertEqual(hashlib.sha256(source.read_bytes()).hexdigest(),before)
        self.assertEqual(files,24);self.assertEqual(total,288)

    def test_sixteen_first_active_launch_marks_reference_the_actual_unchanged_native_alpha_pixels(self):
        origins=json.loads((ROOT/'preparation/combat-sprites-pass7/SOURCE_COMBAT_ORIGINS.json').read_text());total=0
        for uid in UIDS:
            for action,pair in origins['entries'].get(uid,{}).items():
                for side,mark in pair.items():
                    source=ROOT/mark['file'];self.assertEqual(hashlib.sha256(source.read_bytes()).hexdigest(),mark['sha256'])
                    with Image.open(source) as image:self.assertEqual(image.getpixel(tuple(mark['point']))[3],mark['sourcePixelAlpha']);self.assertGreater(mark['sourcePixelAlpha'],0)
                    total+=1
        self.assertEqual(total,16);self.assertEqual(origins['entries'].get('archive__skull_face',{}),{})

    def test_historical_renderer_inspector_and_importer_are_byte_exact(self):
        for file,digest in PINNED.items():self.assertEqual(hashlib.sha256((ROOT/file).read_bytes()).hexdigest(),digest,file)

if __name__=='__main__':unittest.main()
