"""Inspect PASS6 alpha geometry without editing or rewriting any native art."""
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest

os.environ.setdefault('MPLCONFIGDIR',str(Path(tempfile.gettempdir())/'cqc-pass6-matplotlib'))
import numpy as np
from matplotlib.path import Path as Polygon
from PIL import Image
from scipy import ndimage

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('pass6_sheet_inspector',ROOT/'tools/inspect_combat_sprite_sheet.py')
inspector=importlib.util.module_from_spec(spec);spec.loader.exec_module(inspector)
UIDS=['core__pain','core__fear','core__end','core__fury']

class NativePass6ContourTests(unittest.TestCase):
    def test_all_288_new_authored_bodies_are_complete_without_neighboring_pose_fragments(self):
        catalog=json.loads((ROOT/'data/combat-sprite-catalog-v1.json').read_text());total=0
        for uid in UIDS:
            e=catalog['entries'][uid];self.assertIs(e['mirror'],False)
            frames={(f['file'],tuple(f['rect'])):f for a in [*e['actions'].values(),*e['oppositeActions'].values()] for f in a['frames']}
            self.assertEqual(len(frames),72,uid)
            for file in sorted({file for file,_ in frames}):
                source=ROOT/file;before=hashlib.sha256(source.read_bytes()).hexdigest()
                layout=inspector.inspect_components(source,4,3,file)
                with Image.open(source) as image:
                    self.assertEqual(image.format,'PNG');self.assertIn('A',image.getbands());alpha=np.array(image.getchannel('A'));self.assertEqual(int(alpha.min()),0)
                labels,_=ndimage.label(alpha>80);body_ids={cell['component'] for cell in layout['cells']}
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
        self.assertEqual(total,288)

    def test_renderer_and_native_inspection_importer_retain_frozen_pass5_bytes(self):
        frozen=json.loads((ROOT/'recovery/pass6-before-native-sprite-integration/FROZEN_PASS5_SPRITES.json').read_text())
        for row in frozen['files']:
            if row['path'].startswith('data/') or row['path']=='src/cqc-sprite-catalog.js':continue
            raw=(ROOT/row['path']).read_bytes();self.assertEqual(len(raw),row['bytes']);self.assertEqual(hashlib.sha256(raw).hexdigest(),row['sha256'],row['path'])

if __name__=='__main__':unittest.main()
