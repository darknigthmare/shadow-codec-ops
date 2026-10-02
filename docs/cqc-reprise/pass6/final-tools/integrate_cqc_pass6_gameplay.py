"""Connect reviewed PASS6 artwork and profiles without changing the combat engine."""
from pathlib import Path
import re, hashlib, json, shutil
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056'
p=R/'modules/unified-versus-v055.html';old=p.read_text()
snapshot=R/'recovery/pass6-before-gameplay-integration/modules/unified-versus-v055.html'
assert snapshot.read_bytes()==p.read_bytes()
def replace(needle,value):
 global new
 assert new.count(needle)==1,needle[:100]
 new=new.replace(needle,value,1)
new=old
for name in ['combat-fidelity','prop-art']:
 source=W/('cqc-pass6-'+name+'.draft.js');target=R/'src'/('cqc-pass6-'+name+'.js')
 assert not target.exists();shutil.copyfile(source,target)
assert (R/'src/cqc-pass6-native-origins.js').exists()
replace('<script src="../src/cqc-pass5-prop-art.js"></script>', '<script src="../src/cqc-pass5-prop-art.js"></script>\n<script src="../src/cqc-pass6-native-origins.js"></script>\n<script src="../src/cqc-pass6-combat-fidelity.js"></script>\n<script src="../src/cqc-pass6-prop-data.js"></script>\n<script src="../src/cqc-pass6-prop-art.js"></script>')
replace('window.CQC_PASS5_COMBAT_FIDELITY?.apply(FIGHTERS);','window.CQC_PASS5_COMBAT_FIDELITY?.apply(FIGHTERS);\nwindow.CQC_PASS6_COMBAT_FIDELITY?.apply(FIGHTERS);')
replace('window.CQC_CANONICAL_COMBAT_REPRISE?.applyFinishers(FIN46);','window.CQC_CANONICAL_COMBAT_REPRISE?.applyFinishers(FIN46);window.CQC_PASS6_COMBAT_FIDELITY?.applyFinishers(FIN46,FIGHTERS);')
replace('const nativeTrap=window.CQC_PASS5_PROP_ART?.drawTrap(c,tr,zoom);','const nativeTrap=window.CQC_PASS5_PROP_ART?.drawTrap(c,tr,zoom)||window.CQC_PASS6_PROP_ART?.drawTrap(c,tr,zoom);')
needle='if(window.CQC_PASS5_PROP_ART?.drawProjectile(c,q,zoom)){c.restore();continue;}'
replace(needle,needle+'\n  if(window.CQC_PASS6_PROP_ART?.drawProjectile(c,q,zoom)){c.restore();continue;}')
needle="if(p.buffs.armor||p.buffs.reactive||p.buffs.barrier){c.save();c.strokeStyle=p.buffs.reactive?'#e9b16f':p.buffs.armor?'#b7bccb':'#86dfd2';c.lineWidth=3;c.globalAlpha=.65;c.beginPath();c.ellipse(px,py-125*zoom,70*zoom,129*zoom,0,0,Math.PI*2);c.stroke();c.restore();}"
replace(needle,"if(p.buffs.armor||p.buffs.reactive||p.buffs.barrier){c.save();c.translate(px,py);const nativeBarrier=window.CQC_PASS6_PROP_ART?.drawBarrier(c,p,zoom);c.restore();if(!nativeBarrier){c.save();c.strokeStyle=p.buffs.reactive?'#e9b16f':p.buffs.armor?'#b7bccb':'#86dfd2';c.lineWidth=3;c.globalAlpha=.65;c.beginPath();c.ellipse(px,py-125*zoom,70*zoom,129*zoom,0,0,Math.PI*2);c.stroke();c.restore();}}")
needle='drawFighter(c,winner.f,ax,568,dir,1.23,{...aPose});'
replace(needle,"aPose=window.CQC_PASS6_COMBAT_FIDELITY?.finisherPose(winner.f.uid,sc.fin,phase,aPose,t)||aPose;"+needle)
needle="c.strokeStyle=col;c.fillStyle=col;c.lineWidth=5;if(['crosscut','shot','volley','arc','barrage','trigger','crush','takedown','fracture','confirm'].includes(phase))"
replace(needle,"const nativeFinish=window.CQC_PASS6_PROP_ART?.drawFinisher(c,{uid:winner.f.uid,fin:sc.fin,phase,t,ax,vx,vy,dir});c.strokeStyle=col;c.fillStyle=col;c.lineWidth=5;if(!nativeFinish&&['crosscut','shot','volley','arc','barrage','trigger','crush','takedown','fracture','confirm'].includes(phase))")
replace("if(['blast','inferno','overload','core','shatter'].includes(phase))","if(!nativeFinish&&['blast','inferno','overload','core','shatter'].includes(phase))")
replace("if(['orbit','psychic','deal','chain','costlock'].includes(phase))","if(!nativeFinish&&['orbit','psychic','deal','chain','costlock'].includes(phase))")
scripts=lambda s: re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>',s)
eng=lambda s:next(x for x in scripts(s)if 'function spawn('in x and 'function destroyObjects('in x)
assert eng(old)==eng(new)
assert hashlib.sha256(eng(old).encode()).hexdigest()=='197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51'
p.write_text(new)
report={'schema':'cqc.pass6.gameplay-integration/1','status':'passed','engineByteIdentical':True,'engineSha256':hashlib.sha256(eng(old).encode()).hexdigest(),'previousHtmlSha256':hashlib.sha256(old.encode()).hexdigest(),'currentHtmlSha256':hashlib.sha256(new.encode()).hexdigest(),'changes':['Four new helper scripts','Four original Cobra native action origins, six exact-UID source corrections','Native hornet/bolt/fire projectiles and Fury ground-fire zone','Native Pain hornet barrier','Pain first-phase swarm and Red grenade/wire finishers, without telekinesis or remote C4']}
(W/'cqc-pass6-gameplay-integration.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
