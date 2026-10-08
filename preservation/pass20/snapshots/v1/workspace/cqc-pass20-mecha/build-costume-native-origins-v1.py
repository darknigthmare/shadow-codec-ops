import json
from pathlib import Path

OUT=Path('/workspace/cqc-pass20-mecha')
anchors=json.loads((OUT/'MECHANICAL_NATIVE_ATTACHMENT_SOCKETS_ACTUAL_V1.json').read_text())['anchors']
text='''/* Exact selected native costume sockets; source display space, world scale once. */
(function(root){'use strict';
 const anchors=ANCHORS;
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function projectile(p,m,options={}){
  if(!p?.f||p.f.costume!=='metalgear'||!m)return null;
  const sprites=root.CQC_COMBAT_SPRITES,entry=sprites?.getEntry(p.f.uid,p.f);
  if(entry?.pass20Revision!=='native-mechanical-v1'||entry.costumeConcept?.family!=='metalgear')return null;
  const face=p.face===-1?-1:1,side=face===-1?'left':'right',actions=face===entry.facing?entry.actions:entry.oppositeActions;
  if(!actions)return null;
  const live=root.CQC_PASS19_VERSUS_SPATIAL?.poseFor?.(p,Number.isFinite(options.frame)?options.frame:0)||{};
  const pose={...live,moveSlot:p.attack?.name||m.slot||'special',moveKind:m.kind,moveTag:m.tag,animationActive:true,attack:true,
   attackPhase:live.attackPhase||'active',phaseProgress:Number.isFinite(live.phaseProgress)?live.phaseProgress:0};
  const selected=sprites.selectFrame({...entry,actions},pose),frame=selected?.frame;if(!frame)return null;
  const anchor=anchors.find(a=>a.uid===p.f.uid&&a.costume===p.f.costume&&a.side===side&&a.file===frame.file&&a.sourceSHA256===frame.sha256&&same(a.rect,frame.rect)&&same(a.pivot,frame.pivot));
  if(!anchor)return null;
  const k=entry.displayHeight/(entry.sourceFrameHeights?.[frame.file]||entry.baseFrameHeight||frame.rect[3]),fraction=anchor.frameFraction;
  if(!Number.isFinite(k)||k<=0||!Array.isArray(fraction)||fraction.length!==2||fraction.some(v=>!Number.isFinite(v)||v<0||v>1))return null;
  const forward=(fraction[0]-frame.pivot[0])*frame.rect[2]*k*face,height=(frame.pivot[1]-fraction[1])*frame.rect[3]*k;
  if(!Number.isFinite(forward)||!Number.isFinite(height)||Math.abs(forward)>1000||height<=0||height>1000)return null;
  return{forward,height,sourceFile:frame.file,sourceSHA256:frame.sha256,sourceRect:[...frame.rect],sourcePivot:[...frame.pivot],sourceNativeXY:[...anchor.nativeXY],sourceSocket:anchor.socket,
   selectedAction:selected.action,selectedFrameIndex:selected.index,reviewKind:'guarded-selected-native-costume-socket',evidence:'source-pixel-mounted-mechanical-weapon',worldScaleApplied:false,
   qualification:'Read native image coordinates; original game weapon timing/damage and noncostume source hooks remain unchanged.'};
 }
 function install(){const old=root.CQC_PASS19_NATIVE_ORIGINS;if(!old||typeof old.projectile!=='function')return false;if(old.projectile.pass20MechanicalSockets===true)return true;const prior=old.projectile;const wrapped=function(p,m,options={}){return projectile(p,m,options)||prior.call(old,p,m,options);};wrapped.pass20MechanicalSockets=true;old.projectile=wrapped;return true;}
 root.CQC_PASS20_COSTUME_NATIVE_ORIGINS={version:'pass20-costume-native-origins/1',anchors,projectile,install};install();
})(globalThis);
'''.replace('ANCHORS',json.dumps(anchors,separators=(',',':')))
path=Path('/tmp/cqc-pass19-application/public/cqc/src/cqc-pass20-costume-native-origins.js')
path.write_text(text)
print(json.dumps({'module':str(path),'bytes':len(text.encode()),'anchors':len(anchors)}))
