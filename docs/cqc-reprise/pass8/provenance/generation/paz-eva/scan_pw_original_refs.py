from pathlib import Path
import subprocess,json,concurrent.futures
p=Path('/workspace/cqc-pass8-generation/paz-eva/paz-pw/references')
base='https://archive.org/download/PS3_Longplay_039_Metal_Gear_Solid_Peace_Walker_HD/PS3_Longplay_039_Metal_Gear_Solid_Peace_Walker_HD_'
jobs=[('Story',t) for t in range(40000,75001,3000)]+[('Bonus',t) for t in [16000,22000,28000,34000,40000]]
def cap(j):
 part,t=j;a=['ffmpeg','-hide_banner','-loglevel','error','-ss',str(t),'-i',base+part+'.mp4','-frames:v','1',str(p/f'scan-{part.lower()}-{t}s.png')]
 try:r=subprocess.run(a,capture_output=True,timeout=60);d={'args':a,'exit':r.returncode,'stderr':r.stderr.decode(errors='replace')}
 except subprocess.TimeoutExpired:d={'args':a,'timedout':True}
 (p/f'scan-{part.lower()}-{t}-args.json').write_text(json.dumps(d,indent=2));return part,t,d.get('exit','timeout')
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as e:
 for r in e.map(cap,jobs):print(*r,flush=True)
