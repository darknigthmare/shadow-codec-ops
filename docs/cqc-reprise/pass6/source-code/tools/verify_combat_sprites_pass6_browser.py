"""Exercise native PASS6 sprites in actual engine phases and both viewport sizes.

Creates fresh evidence only; source sprites and prior-wave reports are untouched.
"""
import argparse
import functools
import http.server
import json
import os
from pathlib import Path
import subprocess
import threading

parser = argparse.ArgumentParser()
parser.add_argument('--uids', nargs='+', default=['core__pain', 'core__fear', 'core__end', 'core__fury'])
parser.add_argument('--label', default='pass6')
parser.add_argument('--port', type=int, default=0)
parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent.parent)
parser.add_argument('--prefix', default='/', help='Mount root, e.g. / or /cqc/')
parser.add_argument('--out', type=Path, default=Path('/tmp/cqc-sprite-browser-qa'))
parser.add_argument('--agent-browser', default=os.environ.get('CQC_AGENT_BROWSER', 'agent-browser'))
parser.add_argument('--chromium', default=os.environ.get('CQC_CHROMIUM', '/usr/bin/chromium'))
opts = parser.parse_args()
ROOT = opts.root.resolve()
PREFIX = '/' + opts.prefix.strip('/') + '/' if opts.prefix.strip('/') else '/'
mount_label = PREFIX.strip('/').replace('/', '-') or 'standalone'
catalog = json.loads((ROOT / 'data/combat-sprite-catalog-v1.json').read_text())
OUT = opts.out / opts.label / mount_label
if OUT.exists() and any(OUT.iterdir()):
    raise ValueError('Choose a fresh evidence label; existing browser reports are preserved: ' + str(OUT))
OUT.mkdir(exist_ok=True, parents=True)


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if PREFIX != '/' and path.startswith(PREFIX):
            path = '/' + path[len(PREFIX):]
        return super().translate_path(path)

    def log_message(self, *_):
        pass

    def do_GET(self):
        if self.path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return
        super().do_GET()


server = http.server.ThreadingHTTPServer(('127.0.0.1', opts.port), functools.partial(Handler, directory=str(ROOT)))
opts.port=server.server_address[1]
threading.Thread(target=server.serve_forever, daemon=True).start()
env = dict(os.environ, AGENT_BROWSER_SOCKET_DIR='/tmp/cqc-browser-sockets', AGENT_BROWSER_STATE_DIR='/tmp/cqc-browser-state')
base = [opts.agent_browser,
        '--session', 'cqc-sprites-' + opts.label + '-' + mount_label, '--executable-path', opts.chromium, '--args', '--no-sandbox', '--json']
rows = []


def run(args):
    p = subprocess.run(base + args, env=env, text=True, capture_output=True, timeout=50)
    try:
        result = json.loads(p.stdout)
    except ValueError:
        result = {'output': p.stdout, 'error': p.stderr}
    rows.append({'command': args[0], 'arguments': args[1:], 'exit': p.returncode, 'result': result})
    if p.returncode or result.get('success') is False:
        raise RuntimeError(p.stdout + p.stderr)
    if args[0] == 'errors' and result.get('data', {}).get('errors'):
        raise RuntimeError('Browser errors: ' + p.stdout)
    return result


instrument = """(()=>{const api=window.CQC_COMBAT_SPRITES,subjects=SUBJECTS;
window.__spritePass6Log=[];const original=api.draw;
api.draw=(...args)=>{let crop=null,ok,localScale=null;const c=args[0],oldDraw=c.drawImage,oldScale=c.scale;
c.drawImage=function(image,...a){crop={url:image.src,file:image.src.slice(image.src.indexOf('assets/')),rect:a.slice(0,4),destination:a.slice(4)};return oldDraw.call(this,image,...a)};
c.scale=function(...a){localScale=a;return oldScale.apply(this,a)};
try{ok=original(...args)}finally{c.drawImage=oldDraw;c.scale=oldScale}
if(subjects.includes(args[1]?.uid)){const p=args[6]||{},e=window.CQC_COMBAT_SPRITE_CATALOG.entries[args[1].uid],actions=args[4]===e.facing?e.actions:e.oppositeActions,action=api.actionName(p,e),frames=actions[action]?.frames||[],index=frames.findIndex(f=>f.file===crop?.file&&JSON.stringify(f.rect)===JSON.stringify(crop.rect));
window.__spritePass6Log.push({uid:args[1].uid,face:args[4],ok,action,index,phase:p.attackPhase,progress:p.phaseProgress,file:crop?.file,url:crop?.url,rect:crop?.rect,pivot:frames[index]?.pivot,destination:crop?.destination,localScale,clipPolygon:frames[index]?.clipPolygon||null});if(window.__spritePass6Log.length>200)window.__spritePass6Log.shift()}return ok};
window.__pass6Assert=(uid,face,phase=null,state=null)=>{const row=window.__spritePass6Log.filter(x=>x.uid===uid).at(-1),entry=window.CQC_COMBAT_SPRITE_CATALOG.entries[uid];
if(!row?.ok||row.face!==face||row.index<0||row.localScale?.[0]<0)throw Error('Actual native PNG/facing failed '+JSON.stringify(row));
if(!row.url?.startsWith(location.origin+MOUNT+'assets/'))throw Error('Native PNG resolved outside its mounted CQC root '+row.url);
if(phase&&row.phase!==phase)throw Error('Engine phase mismatch '+JSON.stringify(row));if(state&&row.action!==state)throw Error('State mismatch '+JSON.stringify(row));
const indices=entry.phaseMap?.[row.action]?.[phase];if(indices&&!indices.includes(row.index))throw Error('Phase frame mismatch '+JSON.stringify(row));
if(!row.destination?.every(Number.isFinite))throw Error('Nonfinite destination');
const sourceH=entry.sourceFrameHeights?.[row.file]||entry.baseFrameHeight||row.rect[3],expectedH=row.rect[3]*entry.displayHeight/sourceH;
if(Math.abs(row.destination[3]-expectedH)>0.0001)throw Error('Low pose stretched or source scale wrong');
return row;};
window.__pass6Position=(s,face)=>{s.a.x=face===1?300:980;s.b.x=face===1?980:300;s.a.face=face;s.b.face=-face;const r=s.a.f.combat.resource;s.a.r=['heat','cost'].includes(r.kind)?0:r.max;s.a.meter=100;s.a.cool=0;s.a.cooldowns={};s.b.still=120;};
return true})()"""
slots = ['light', 'heavy', 'low', 'throw', 'special', 'specialDown', 'specialForward', 'specialBack', 'super', 'utility']
states = {'idle': '', 'walk': 's.a.vx=s.a.face*2;', 'guard': 's.a.block=true;',
          'crouch': 's.a.crouch=true;', 'hit': 's.a.hit=15;s.a.lastHit=s.frame;', 'ko': 's.a.life=0;'}
try:
    run(['set', 'viewport', '1280', '800'])
    run(['open', f'http://127.0.0.1:{opts.port}{PREFIX}modules/unified-versus-v055.html'])
    run(['wait', '--load', 'networkidle'])
    run(['screenshot', str(OUT / 'initial-roster.png')])
    run(['snapshot', '-i'])
    run(['errors'])
    run(['eval', f"(()=>{{const expected={json.dumps(PREFIX)},s=[...document.scripts].find(s=>s.src.includes('cqc-sprite-renderer.js'));if(!s||!new URL(s.src).pathname.startsWith(expected+'src/'))throw Error('Sprite script mount incorrect');return{{prefix:expected,spriteScript:s.src}}}})()"])
    run(['eval', "(()=>{const a=window.__CQC055Versus;if(a?.fighters.length!==354||document.body.innerText.trim().length<1000||document.querySelector('[data-nextjs-dialog],.vite-error-overlay,#webpack-dev-server-client-overlay'))throw Error('Roster page blank/invalid/overlay');return{fighters:a.fighters.length,pageLoaded:true}})()"])
    print('Dev server verified at ' + PREFIX + ': 354-fighter roster loaded, controls visible, no browser error or overlay.', flush=True)
    run(['eval', instrument.replace('SUBJECTS', json.dumps(opts.uids)).replace('MOUNT', json.dumps(PREFIX))])
    run(['eval', f"(async()=>{{const results=await Promise.all({json.dumps(opts.uids + ['core__snake'])}.map(uid=>window.CQC_COMBAT_SPRITES.whenReady(uid)));if(results.some(x=>!x))throw Error('Native PNG preload failed');return results}})()"])
    for width, height in [(1280, 800), (390, 844)]:
        run(['set', 'viewport', str(width), str(height)])
        for uid in opts.uids:
            run(['eval', f"(()=>{{const api=window.CQC_COMBAT_SPRITES,r=api.status({json.dumps(uid)});if(!r.ready)throw Error('PNG not ready '+JSON.stringify(r));const a=window.__CQC055Versus;a.startExternal({{p1:{json.dumps(uid)},p2:'core__snake',stage:'shadow_heliport',mode:'training',dummy:'idle',autoheal:false,freeResource:false,rounds:1,seconds:99,finishers:'off',source:'pass6-native-browser-qa'}});a.pause(true);document.querySelector('#pause43').classList.add('hidden');return{{uid:{json.dumps(uid)},status:r}}}})()"])
            for face in [1, -1]:
                direction = 'right' if face == 1 else 'left'
                for slot in slots:
                    # Three fresh engine starts observe startup/recovery and finish at active.
                    # No attack-time assignment, synthetic sprite draw or engine mutation.
                    code = """(()=>{const a=window.__CQC055Versus,uid=UID,face=FACE,slot=SLOT,samples=[];
for(const phase of ['startup','recovery','active']){a.resetDojo();const s=a.getState();window.__pass6Position(s,face);const m=s.a.f.combat.moves[slot];
if(!a.engine.start(s,s.a,slot))throw Error('Move failed '+slot);const ticks=phase==='startup'?0:phase==='active'?m.startup:m.startup+m.active;
for(let i=0;i<ticks;i++)a.engine.step(s,[a.engine.empty(),a.engine.empty()]);window.__spritePass6Log=[];a.draw();const actual=window.__pass6Assert(uid,face,phase);samples.push({phase,move:m.name,kind:m.kind,tag:m.tag,actual});
if(m.lowProfile&&a.engine.box(s.a).h>=230)throw Error('Low-profile hurtbox unreduced');}
return{uid,face,slot,viewport:innerWidth,samples}})()"""
                    code = code.replace('UID', json.dumps(uid)).replace('FACE', str(face)).replace('SLOT', json.dumps(slot))
                    run(['eval', code])
                    if width==1280 and slot in ['special','super']:
                        run(['screenshot', str(OUT / f'{width}-{uid}-{direction}-{slot}-active.png')])
                fighter_states = dict(states)
                if 'jump' in catalog['entries'].get(uid, {}).get('actions', {}):
                    fighter_states['jump'] = "const jumpInput=a.engine.empty();jumpInput.jump=true;a.engine.step(s,[jumpInput,a.engine.empty()]);if(s.a.onGround)throw Error('Actual jump failed');"
                for state, mutation in fighter_states.items():
                    run(['eval', f"(()=>{{const a=window.__CQC055Versus;a.resetDojo();const s=a.getState();window.__pass6Position(s,{face});{mutation}window.__spritePass6Log=[];a.draw();return{{uid:{json.dumps(uid)},state:{json.dumps(state)},viewport:innerWidth,actual:window.__pass6Assert({json.dumps(uid)},{face},null,{json.dumps(state)})}}}})()"])
                    if state in ['idle','ko']:
                        run(['screenshot', str(OUT / f'{width}-{uid}-{direction}-{state}.png')])
            run(['eval', "(()=>{const hud=document.querySelector('#responsiveFightHUD'),name=hud.querySelector('[data-hud=name]'),life=hud.querySelector('[data-hud=healthTrack]');if(document.documentElement.scrollWidth>innerWidth)throw Error('Viewport overflow');if(innerWidth===390&&(getComputedStyle(hud).display==='none'||parseFloat(getComputedStyle(name).fontSize)<14||!life.hasAttribute('aria-valuenow')))throw Error('Mobile readable HUD failed');return{width:innerWidth,overflow:false,nameSize:getComputedStyle(name).fontSize,hudDisplay:getComputedStyle(hud).display}})()"])
            print(f'{width}px {uid}: 20 techniques / 60 phases, {len(fighter_states)*2} states, native PNG both directions verified', flush=True)
    # A separate review page renders every distinct source pose, including intermediate
    # walk/guard/jump frames that a single engine-state screenshot cannot enumerate.
    run(['set', 'viewport', '1280', '1200'])
    run(['open', f'http://127.0.0.1:{opts.port}{PREFIX}preparation/combat-sprites-pass6/frame-review.html'])
    run(['wait', '--load', 'networkidle'])
    run(['snapshot', '-i'])
    for uid in opts.uids:
        for key in ['a-right', 'a-left', 'b-right', 'b-left', 'c-right', 'c-left']:
            result=run(['eval', f"(async()=>await reviewNativeSheet({json.dumps(uid)},{json.dumps(key)}))()"])
            poses=result['data']['result']
            if len(poses)!=12 or not all(pose['frameFullyInsideCell'] and pose['nativeFacingWithoutMirror'] for pose in poses):
                raise AssertionError('All twelve observed native crop rectangles must fit inside their review cell')
            run(['screenshot', str(OUT / f'native-frames-{uid}-{key}.png')])
        print(f'{PREFIX} {uid}: all 72 native pose crops, pivots, source scales and contours captured', flush=True)
    run(['errors'])
finally:
    try:
        run(['close'])
    finally:
        (OUT / 'verification.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n')
        server.shutdown()
