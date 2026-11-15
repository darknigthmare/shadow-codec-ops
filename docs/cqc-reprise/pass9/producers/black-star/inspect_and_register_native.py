"""Read-only raster inspection and exact native registration. Never edits pixels."""
from pathlib import Path
import hashlib, json, os, shutil
from collections import deque
import numpy as np
from PIL import Image

ROOT=Path('/workspace/cqc-pass9-black-star-generation')
NATIVE=Path('/workspace/generated_images/exec-8e3f2840-1d64-4c38-9671-3d150d7bccda.png')
EXPECTED='29722b7fd8fe23d6c2929e9c54c4b9e8a35c48d451ab955b8325ae8cd8d3e0dc'

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def save(name,data):
    p=ROOT/name
    p.parent.mkdir(parents=True,exist_ok=True)
    if p.exists(): raise RuntimeError('No overwrite: '+str(p))
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

assert sha(NATIVE)==EXPECTED
original_stat=NATIVE.stat()
with Image.open(NATIVE) as image:
    assert image.mode=='RGBA'
    rgba=np.array(image)
height,width=rgba.shape[:2]
assert (width,height)==(1774,887)
alpha=rgba[:,:,3]
frames=[]; checks=[]
# Physical review saw the dark central hub in each native cell. These nominal
# centers are refined against the local dark-gray hub pixels, never rewritten.
approx=[(222,245),(671,243),(1109,244),(1557,243),(222,675),(667,675),(1109,676),(1557,675)]
for index in range(8):
    row,col=divmod(index,4)
    x0=col*width//4; x1=(col+1)*width//4
    y0=row*height//2; y1=(row+1)*height//2
    cell_alpha=alpha[y0:y1,x0:x1]
    yy,xx=np.where(cell_alpha>8)
    bbox=[int(xx.min()+x0),int(yy.min()+y0),int(xx.max()+x0+1),int(yy.max()+y0+1)]
    left,top,right,bottom=bbox
    rect=[left-4,top-4,right-left+8,bottom-top+8]
    assert rect[0]>=x0 and rect[1]>=y0
    assert rect[0]+rect[2]<=x1 and rect[1]+rect[3]<=y1
    # The narrow opaque near-gray center is distinct from black blade outlines.
    ax,ay=approx[index]
    patch=rgba[ay-24:ay+25,ax-24:ax+25]
    rgb=patch[:,:,:3]
    hub=(patch[:,:,3]>200)&(rgb.min(axis=2)>25)&(rgb.max(axis=2)<96)
    hy,hx=np.where(hub)
    assert len(hx)>100
    hub_center=[float(hx.mean()+ax-24),float(hy.mean()+ay-24)]
    pivot=[(hub_center[0]-rect[0])/rect[2],(hub_center[1]-rect[1])/rect[3]]
    assert all(.25<p<.75 for p in pivot)
    frame={
      'index':index,'row':row,'column':col,
      'nominalRequestedClockwiseDegrees':index*22.5,
      'exactRotationCertified':False,
      'slotRect':[x0,y0,x1-x0,y1-y0],
      'observedAlphaGreaterThan8BoundsExclusive':bbox,
      'rect':rect,'pivot':pivot,'sourceHubCenter':hub_center,
      'pivotBasis':'Mean coordinates of observed central gray hub pixels in a 49x49 physically located patch; alpha>200 and RGB range (25,96). Not an image edit.',
      'alphaGreaterThan8Pixels':int((cell_alpha>8).sum()),
      'alphaGreaterThan80Pixels':int((cell_alpha>80).sum()),
      'zeroAlphaPixelsInSlot':int((cell_alpha==0).sum()),
      'lowAlphaResidueOutsideRenderRectPreserved':True,
      'file':'assets/combat-projectiles/core__ninja_mg2/black-star-rotation-v1.png',
      'sha256':EXPECTED
    }
    frames.append(frame)
    checks.extend([
      {'name':f'cell-{index}-contains-visible-native-body','passed':len(xx)>10000},
      {'name':f'cell-{index}-rect-contained-in-own-slot','passed':True},
      {'name':f'cell-{index}-complete-alpha-over8-body-captured','passed':True},
      {'name':f'cell-{index}-center-hub-measured','passed':len(hx)>100},
      {'name':f'cell-{index}-central-pivot-valid','passed':all(.25<p<.75 for p in pivot)},
    ])

# Connected components on native alpha>80: reader only, no pixel output.
mask=alpha>80
seen=np.zeros_like(mask,dtype=bool)
components=[]
for sy,sx in zip(*np.where(mask)):
    if seen[sy,sx]: continue
    seen[sy,sx]=True; q=deque([(int(sy),int(sx))]); count=0
    lx=rx=int(sx);ty=by=int(sy)
    while q:
      py,px=q.popleft();count+=1
      lx=min(lx,px);rx=max(rx,px);ty=min(ty,py);by=max(by,py)
      for dy in (-1,0,1):
       for dx in (-1,0,1):
        ny=py+dy; nx=px+dx
        if 0<=ny<height and 0<=nx<width and mask[ny,nx] and not seen[ny,nx]:
         seen[ny,nx]=True;q.append((ny,nx))
    components.append({'pixels':count,'boundsExclusive':[lx,ty,rx+1,by+1]})
large=[c for c in components if c['pixels']>1000]
assert len(large)==8
checks.extend([
 {'name':'native-is-rgba','passed':True},
 {'name':'true-zero-alpha-space-present','passed':int((alpha==0).sum())>1000000},
 {'name':'exactly-eight-separated-large-alpha-components','passed':len(large)==8},
 {'name':'native-hash-unchanged-after-read-only-analysis','passed':sha(NATIVE)==EXPECTED},
])
assert all(c['passed'] for c in checks)
attempt=ROOT/'native-attempts/BLACK_STAR_ROTATION_01.png'
selected=ROOT/'sources/black-star-rotation-v1.png'
attempt.parent.mkdir(parents=True,exist_ok=True);selected.parent.mkdir(parents=True,exist_ok=True)
assert not attempt.exists() and not selected.exists()
shutil.copy2(NATIVE,attempt)
assert sha(attempt)==EXPECTED
os.chmod(attempt,0o444)
os.link(attempt,selected)
assert sha(selected)==EXPECTED
assert NATIVE.stat().st_mtime_ns==original_stat.st_mtime_ns
references=[
 '/workspace/cqc-pass9-generation/black-color/sources/C_RIGHT_FULL_03.png',
 '/workspace/cqc-pass9-generation/black-color/sources/C_LEFT_FULL_03.png',
 '/workspace/cqc-pass8-reference-selection/core__ninja_mg2/mirror-Black_Ninja.webp',
 '/workspace/cqc-pass8-reference-selection/core__ninja_mg2/manual-original1990-page42.png',
 '/workspace/cqc-pass9-generation/black-color/FINAL_DELIVERY.json',
 '/workspace/cqc-pass9-importer-preparation/candidates/core__ninja_mg2.json',
]
ref_pins=[{'path':p,'sha256':sha(Path(p)),'bytes':Path(p).stat().st_size,
 'physicallyViewed':p.lower().endswith(('.png','.webp'))} for p in references]
layout={'schema':'cqc.native-projectile-layout/1','uid':'core__ninja_mg2',
 'nativeOriginal':str(NATIVE),'selectedSource':str(selected),'sha256':EXPECTED,
 'width':width,'height':height,'columns':4,'rows':2,'poseCount':8,
 'animation':{'fps':16,'loop':True,'frames':frames},
 'sourcePixelRadiusRecommendation':107,
 'renderSizing':'Use one fixed source-pixel scale for every frame; preserve rect aspect ratio. Do not stretch every tight crop to the same width. Center each frame using its measured pivot.',
 'coordinateConvention':'rect=[x,y,width,height], no software flip; pivot normalized within that rect',
 'transparencyQualification':'Native true zero-alpha background exists. Very faint alpha<=8 residues outside the measured visible bodies remain untouched. Renderer crops exclude distant residue; no PNG pixel cleaning occurred.',
 'fidelityStatus':'closest_supported','absolute1to1Certified':False,
 'runtimeIntegrationStatus':'not-integrated-by-this-delivery'}
save('layouts/black-star-rotation-v1.json',layout)
save('NATIVE_ALPHA_REVIEW.json',{'schema':'cqc.pass9.native-projectile-readonly-inspection/1',
 'status':'passed','checks':checks,'assertions':len(checks),'failures':0,
 'alphaThresholdForBodyBounds':8,'alphaThresholdForComponents':80,
 'nativeAlphaMin':int(alpha.min()),'nativeAlphaMax':int(alpha.max()),
 'zeroAlphaPixels':int((alpha==0).sum()),'largeComponents':large,
 'minorComponentCount':len(components)-len(large),'noRasterPixelsWritten':True,
 'inspectionLibrary':'Pillow decoded the source read-only; NumPy and a queue inspected geometry. No crop, scale, flip, drawing, saving or transparency edit was performed.'})
save('NATIVE_PRESERVATION.json',{'schema':'cqc.pass9.native-projectile-preservation/1',
 'attemptCount':1,'selectedAttemptCount':1,'rejectedAttemptCount':0,
 'records':[{'nativeOriginal':str(NATIVE),'preservedAttempt':str(attempt),
 'selectedSource':str(selected),'sha256':EXPECTED,'bytes':NATIVE.stat().st_size,
 'width':width,'height':height,'mode':'RGBA','unchangedOriginal':True,
 'selectedAndAttemptReadOnlyHardlinked':True}],
 'referencePins':ref_pins,'generatedPixelsUnmodified':True})
save('metadata/BLACK_STAR_ROTATION_01.tool-response-summary.json',{
 'schema':'cqc.pass9.imagegen-tool-response/1','attempt':'BLACK_STAR_ROTATION_01',
 'imagegenCompleted':True,'nativeOriginal':str(NATIVE),
 'requestedCanvas':[1024,512],'actualNativeCanvas':[width,height],
 'nativeResolutionSelectedByTool':True,'imageBase64NotRepeated':True,
 'nativeOriginalPreserved':True})
save('PHYSICAL_REVIEW.json',{'schema':'cqc.pass9.native-projectile-physical-review/1',
 'status':'approved-qualified','reviewer':'/root/pass9_black_star_native',
 'physicallyViewed':[p['path'] for p in ref_pins if p['physicallyViewed']]+[str(NATIVE)],
 'basis':'Generated image was directly viewed in ImageGen output, native original was opened by view_image, and both complete C sheets, tiny Black Color mirror and original manual page42 were viewed.',
 'observations':['Eight isolated complete four-point gray/cyan throwing stars with dark outline and restrained dark-gray center.',
 'The restrained star shape matches the held star in the already reviewed authored Black Color C0 source; the original MSX2 references do not certify this precise hardware detail.',
 'No character, text, grid, firearm bullet, katana, trail or magical effect appears.',
 'Nominal in-plane spin orientations are visually suitable for a small projectile. Exact mathematical angular increments, constant blade microgeometry and canonical rotational animation are not certified.',
 'The generation chose a 1774x887 canvas. Low-alpha residue remains unchanged; native alpha inspection qualifies it explicitly.'],
 'fidelityStatus':'closest_supported','absolute1to1Certified':False,
 'runtimeIntegrationStatus':'not-integrated-by-this-delivery'})
save('FINAL_DELIVERY.json',{'schema':'cqc.native-projectile-delivery/1','uid':'core__ninja_mg2',
 'kind':'hand-thrown-four-point-star','name':'Black Color / Kyle Schneider projectile',
 'game':'Metal Gear 2: Solid Snake (1990, MSX2)',
 'source':str(selected),'nativeOriginal':str(NATIVE),'sha256':EXPECTED,
 'bytes':NATIVE.stat().st_size,'width':width,'height':height,
 'layout':str(ROOT/'layouts/black-star-rotation-v1.json'),'frameCount':8,
 'nativeGenerationAttempts':1,'rejectedNativeAttempts':0,
 'transparentBackground':True,'generatedPixelsUnmodified':True,
 'fidelityStatus':'closest_supported','absolute1to1Certified':False,
 'qualification':'Restrained interpretation of the held plain four-point star in the new Black Color sheets. Exact original hardware and rotational poses are unresolved; this is an authored versus-game adaptation.',
 'runtimeIntegrationStatus':'not-integrated-by-this-delivery',
 'scope':'Only isolated sprite, preservation, source pins, eight measured render rectangles and center pivots. No R/S source, Git, application or runtime was edited.',
 'proofs':['PHYSICAL_REVIEW.json','NATIVE_ALPHA_REVIEW.json','NATIVE_PRESERVATION.json'],
 'rendererRecommendation':{'sourcePixelScale':0.10,'approxMaxDiameterPixels':21.4,
 'scaleIsGameplayAdaptationNotCanonical':True,'animationFps':16,
 'keepFrameAspectRatio':True,'useMeasuredPivot':True}})
save('FILE_SHA256_MANIFEST.json',{'schema':'cqc.pass9.native-projectile-file-manifest/1',
 'files':[{'path':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,'sha256':sha(p)}
 for p in sorted(ROOT.rglob('*')) if p.is_file() and p.name!='FILE_SHA256_MANIFEST.json']})
print(json.dumps({'status':'passed','source':str(selected),'layout':str(ROOT/'layouts/black-star-rotation-v1.json'),
 'sha256':EXPECTED,'frameCount':8,'assertions':len(checks),'failures':0,
 'originalUnchanged':sha(NATIVE)==EXPECTED},ensure_ascii=False))
