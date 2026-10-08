from pathlib import Path
import importlib.util,json
base=Path('/tmp/cqc-pass19-survive-generation')
source=(base/'build-native-layouts-v1.py').read_text()
source=source.replace('assert len(components)==16,','assert len(components)==1,').replace('col=min(3,int(cx/(w/4)));row=min(3,int(cy/(h/4)));idx=row*4+col','idx=0').replace('assert set(poses)==set(range(16))','assert set(poses)=={0}').replace("'physicalPoseCount':16","'physicalPoseCount':1").replace("[poses[i]for i in range(16)]","[poses[0]]")
namespace={'__name__':'frostbite_single_helper'}
exec(compile(source,'read-only-alpha-contour-single-native','exec'),namespace)
namespace['ROOT']=base
print(namespace['analyse']('pass19__frostbite_survive','right','single-right-windup-v4.png','single-right-windup-layout-v1.json'))
