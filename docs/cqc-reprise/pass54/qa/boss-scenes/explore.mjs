import {openPage,until,pause} from '../../browser/cdp.mjs';
const p=await openPage('http://127.0.0.1:8154/cqc/modules/arsenal-files-v044.html');
await until(p,`!!window.__CQC044Arsenal && document.querySelectorAll('[data-machine]').length>20`);
console.log(JSON.stringify(await p.ev(`({bridge:!!window.CQC_P54_BOSS_SCENES,apis:{machines:Object.keys(window.CQC_PASS18_MACHINES||{}),vfx:Object.keys(window.CQC_PASS18_VFX||{}),player:Object.keys(window.CQC_PASS27_ARSENAL_NATIVE_PLAYER||{})},preview:document.querySelector('#preview').width,bindings:window.CQC_P54_BOSS_SCENES?.bindings().filter(x=>['m1tank','hind_d','ray_mgR'].includes(x.id)),caption:document.querySelector('#previewEp').textContent})`),null,2));
console.log(JSON.stringify({exceptions:p.exceptions,failed:p.failed,errors:p.responses.filter(x=>x.status>=400)}));
await p.close();
