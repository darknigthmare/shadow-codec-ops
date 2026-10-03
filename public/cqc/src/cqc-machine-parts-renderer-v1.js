/* Native PNG articulated machines. Source bytes stay intact; damage remains in the game engine. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CQC_MACHINE_PARTS = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const SCHEMA = 'cqc.machine-parts/1', DEG = Math.PI / 180;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const finite = (n) => typeof n === 'number' && Number.isFinite(n);
  const fail = (message) => { throw new Error('Machine parts: ' + message); };
  const pair = (value, name) => {
    if (!Array.isArray(value) || value.length !== 2 || !value.every(finite)) fail(name + ' must be a finite pixel pair');
    return value.slice();
  };
  const number = (value, fallback, name) => {
    if (value === undefined) return fallback;
    if (!finite(value)) fail(name + ' must be finite');
    return value;
  };
  const name = (value, context) => {
    if (typeof value !== 'string' || !/^[A-Za-z0-9_:-]{1,96}$/.test(value)) fail(context + ' invalid identifier');
    return value;
  };
  const flags = (value, context) => {
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.length > 24) fail(context + ' invalid flag list');
    return value.map((v) => name(v, context));
  };
  const rectangle = (value, context) => {
    if (value === undefined) return null;
    if (!Array.isArray(value) || value.length !== 4 || !value.every(Number.isInteger) || value[0] < 0 || value[1] < 0 || value[2] < 1 || value[3] < 1) fail(context + ' invalid native rect');
    return value.slice();
  };
  function bindings(value, context) {
    if (value === undefined) return {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(context + ' invalid channels');
    const result = {};
    for (const [property, rows] of Object.entries(value)) {
      if (!['x', 'y', 'rotation', 'opacity'].includes(property) || !Array.isArray(rows) || rows.length > 16) fail(context + ' invalid channel property');
      result[property] = rows.map((row) => {
        if (!row || typeof row !== 'object') fail(context + ' invalid binding');
        return {channel:name(row.channel, context),factor:number(row.factor, 1, context),cosmetic:row.cosmetic === true};
      });
    }
    return result;
  }
  function normalizeCatalog(catalog) {
    if (!catalog || catalog.schema !== SCHEMA || !Array.isArray(catalog.machines) || !catalog.machines.length || catalog.machines.length > 64) fail('invalid catalogue schema');
    const machines = new Map();
    for (const machine of catalog.machines) {
      const id = name(machine.id, 'machine');
      if (machines.has(id)) fail('duplicate machine ' + id);
      if (!Array.isArray(machine.sources) || !machine.sources.length || machine.sources.length > 96 || !Array.isArray(machine.parts) || !machine.parts.length || machine.parts.length > 128) fail(id + ' invalid source/part count');
      const sources = new Map();
      for (const raw of machine.sources) {
        const sourceID = name(raw.id, id + ' source');
        if (sources.has(sourceID) || typeof raw.file !== 'string' || !raw.file.endsWith('.png') || raw.file.length > 800 || /^(?:data|blob|javascript):/i.test(raw.file)) fail(id + ' invalid PNG source');
        if (raw.sha256 !== undefined && !/^[a-f0-9]{64}$/.test(raw.sha256)) fail(id + ' invalid source SHA256');
        for (const dimension of ['width', 'height']) if (raw[dimension] !== undefined && (!Number.isInteger(raw[dimension]) || raw[dimension] < 1 || raw[dimension] > 16384)) fail(id + ' invalid dimensions');
        if (raw.bytes !== undefined && (!Number.isInteger(raw.bytes) || raw.bytes < 8 || raw.bytes > 32 * 1024 * 1024)) fail(id + ' invalid source size');
        sources.set(sourceID, {id:sourceID,file:raw.file,sha256:raw.sha256,width:raw.width,height:raw.height,bytes:raw.bytes});
      }
      const parts = [], byID = new Map();
      for (const raw of machine.parts) {
        const partID = name(raw.id, id + ' part');
        if (byID.has(partID) || !sources.has(raw.source)) fail(id + ' duplicate part or missing source');
        const textureScale=pair(raw.scale || [1,1], partID + ' texture scale');
        const part = {id:partID,source:raw.source,rect:rectangle(raw.rect, partID),pivot:pair(raw.pivot, partID + ' pivot'),offset:pair(raw.offset || [0,0], partID + ' offset'),parent:raw.parent === undefined ? null : name(raw.parent, partID + ' parent'),z:number(raw.z, parts.length, partID),rotation:number(raw.rotation, 0, partID),imageScale:number(raw.imageScale,textureScale[0],partID + ' imageScale'),opacity:number(raw.opacity, 1, partID),channels:bindings(raw.channels, partID),showWhen:flags(raw.showWhen, partID),hideWhen:flags(raw.hideWhen, partID),variants:[],detachment:null,index:parts.length};
        if (textureScale.some((n) => n <= 0 || n > 32) || textureScale[0]!==textureScale[1] || part.imageScale<=0 || part.imageScale>32 || part.opacity < 0 || part.opacity > 1) fail(partID + ' distortion/mirroring/invalid opacity is not allowed');
        if (raw.scale!==undefined && raw.imageScale!==undefined && textureScale[0]!==part.imageScale) fail(partID + ' conflicting texture scales');
        if (raw.variants !== undefined) {
          if (!Array.isArray(raw.variants) || raw.variants.length > 16) fail(partID + ' invalid variants');
          part.variants = raw.variants.map((variant) => {
            const result = {when:name(variant.when, partID + ' variant'),hide:variant.hide === true,source:variant.source || part.source,rect:variant.rect === undefined ? part.rect : rectangle(variant.rect, partID),pivot:variant.pivot === undefined ? part.pivot : pair(variant.pivot, partID + ' variant pivot'),imageScale:number(variant.imageScale,part.imageScale,partID + ' variant imageScale')};
            if (!sources.has(result.source)) fail(partID + ' missing variant source');
            if (result.imageScale<=0 || result.imageScale>32) fail(partID + ' invalid variant imageScale');
            return result;
          });
        }
        if (raw.detachment !== undefined) {
          const d = raw.detachment;
          part.detachment = {when:name(d.when, partID + ' detachment'),clock:name(d.clock, partID + ' detachment clock'),anchor:d.anchor===undefined ? null : pair(d.anchor, partID + ' root detachment anchor'),duration:number(d.duration, 90, partID),vx:number(d.vx, 0, partID),vy:number(d.vy, 0, partID),gravity:number(d.gravity, .12, partID),spin:number(d.spin, 0, partID),fade:number(d.fade, 18, partID)};
          if (part.detachment.duration <= 0 || part.detachment.duration > 600 || part.detachment.gravity < 0 || part.detachment.fade <= 0 || part.detachment.fade > part.detachment.duration) fail(partID + ' invalid detachment limits');
          if (part.parent && !part.detachment.anchor) fail(partID + ' needs root anchor when detached from parent');
        }
        parts.push(part); byID.set(partID, part);
      }
      const order = [], visited = new Set(), visiting = new Set();
      function visit(part) {
        if (visited.has(part.id)) return;
        if (visiting.has(part.id)) fail(id + ' cyclic joints');
        visiting.add(part.id);
        if (part.parent !== null) {
          if (!byID.has(part.parent)) fail(id + ' missing parent ' + part.parent);
          visit(byID.get(part.parent));
        }
        visiting.delete(part.id); visited.add(part.id); order.push(part);
      }
      parts.forEach(visit);
      const scale=pair(machine.scale || [1,1], id + ' uniform scale');
      if (scale[0]<=0 || scale[0]>32 || scale[0]!==scale[1]) fail(id + ' uniform positive scale required');
      machines.set(id, {id,edition:typeof machine.edition === 'string' ? machine.edition : '',origin:pair(machine.origin || [0,0], id + ' origin'),scale,sources,parts,order,paintOrder:parts.slice().sort((a,b) => a.z-b.z || a.index-b.index)});
    }
    return machines;
  }
  const identity = () => [1,0,0,1,0,0];
  function multiply(a, b) {
    return [a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
  }
  function channelValue(channels, key) { return finite(channels[key]) ? channels[key] : 0; }
  function pose(machine, state = {}) {
    const channels = state.channels || {}, active = state.flags || {}, transforms = new Map();
    const origin = state.origin ? pair(state.origin, 'draw origin') : machine.origin;
    const base = [machine.scale[0],0,0,machine.scale[1],origin[0],-origin[1]];
    for (const part of machine.order) {
      const variant = part.variants.find((v) => active[v.when] === true);
      let parent = part.parent ? transforms.get(part.parent) : {matrix:base,visible:true,opacity:1};
      let x=part.offset[0], y=part.offset[1], rotation=part.rotation, opacity=part.opacity;
      for (const [property, rows] of Object.entries(part.channels)) {
        const v = rows.reduce((sum,b) => sum + (b.cosmetic && state.reducedMotion ? 0 : channelValue(channels,b.channel)*b.factor), 0);
        if (property==='x') x+=v; else if (property==='y') y+=v; else if (property==='rotation') rotation+=v; else opacity+=v;
      }
      let visible = parent.visible && !variant?.hide && part.showWhen.every((key) => active[key] === true) && !part.hideWhen.some((key) => active[key] === true);
      const d=part.detachment;
      if (d && active[d.when] === true) {
        const t=Math.max(0, channelValue(channels,d.clock));
        parent={matrix:base,visible:true,opacity:1};
        visible=!variant?.hide && part.showWhen.every((key) => active[key]===true) && !part.hideWhen.some((key) => active[key]===true);
        x=(d.anchor || part.offset)[0]; y=(d.anchor || part.offset)[1]; rotation=part.rotation;
        x+=d.vx*t; y+=d.vy*t-.5*d.gravity*t*t; rotation+=d.spin*t;
        opacity*=clamp((d.duration-t)/d.fade,0,1);
        if (t>=d.duration) visible=false;
      }
      const angle=-rotation*DEG, cos=Math.cos(angle), sin=Math.sin(angle);
      const local=[cos,sin,-sin,cos,x,-y];
      transforms.set(part.id,{matrix:multiply(parent.matrix,local),visible,opacity:parent.opacity*clamp(opacity,0,1),source:variant?.source || part.source,rect:variant?.rect || part.rect,pivot:variant?.pivot || part.pivot,imageScale:variant?.imageScale || part.imageScale});
    }
    return transforms;
  }
  function corePose(state, options = {}) {
    const r=state?.boss;
    if (!r || !['rex','ray','mgd','tx55'].includes(r.id)) return null;
    const frame=finite(state.frame) ? state.frame : finite(state.tick) ? state.tick : 0, a=r.attack;
    if (r.id==='rex') {
      const duration=number(options.rexTransitionFrames,150,'REX transition'), phase=r.phase || 1;
      return {id:options.id || 'rex_mgs1_ps1',reducedMotion:options.reducedMotion === true,origin:options.origin,frame,
        flags:{radomeDestroyed:r.radome<=0,cockpitOpened:phase>=2,rexDefeated:phase>=3,stomping:a?.kind==='stomp',...(options.flags || {})},
        channels:{cockpitOpen:phase>=2 ? clamp(1-(r.transition || 0)/duration,0,1) : 0,stompLift:a?.kind==='stomp' && a.windup>0 ? Math.sin(clamp(a.t/a.windup,0,1)*Math.PI)*24 : 0,radomeDetachFrames:phase>=2 ? Math.max(0,duration-(r.transition || 0)) : 0,rexCollapse:phase>=3 ? 27 : 0,idleBreath:options.reducedMotion ? 0 : Math.sin(frame*.06),...(options.channels || {})}};
    }
    if (r.id==='tx55') {
      // The original sabotage machine is stationary and its weapons remain inactive.
      // Read the existing 125-frame destruction clock; do not invent detachable wreckage.
      const defeated=r.defeated===true, remaining=finite(r.collapse) ? clamp(r.collapse,0,125) : 0;
      return {id:options.id || 'tx55_mg1_msx1987',reducedMotion:options.reducedMotion === true,origin:options.origin,frame,
        flags:{tx55Defeated:defeated,tx55Absent:defeated && remaining<=0,...(options.flags || {})},
        channels:{tx55DestructionFrames:defeated ? 125-remaining : 0,tx55ValidatedSteps:clamp(finite(r.progress) ? r.progress : 0,0,16),...(options.channels || {})}};
    }
    if (r.id==='mgd') {
      // Read the existing encounter clocks and HP only. No presentation state enters replays.
      const destroyed=r.destroyed===true, collapseFrames=destroyed ? clamp(110-(finite(r.collapse) ? r.collapse : 0),0,110) : 0;
      const stride=a?.kind==='stride' && a.t>=a.windup && a.t<a.windup+a.active && a.active>0;
      const strideLift=stride ? Math.sin((a.t-a.windup)/a.active*Math.PI)*95 : 0;
      const nearHP=finite(r.legs?.near) ? r.legs.near : 4800, farHP=finite(r.legs?.far) ? r.legs.far : 4800;
      const drop=Math.min(95,collapseFrames*.86), tilt=collapseFrames/110*-8, fold={};
      if (collapseFrames>0) {
        // Presentation IK holds the measured intact ankle locations while the existing collapse clock lowers the hull.
        // These vectors are catalogue metadata in world units, not combat targets or new state.
        const rotate=(v,d) => {const q=d*DEG,c=Math.cos(q),s=Math.sin(q);return[c*v[0]-s*v[1],s*v[0]+c*v[1]];};
        for (const leg of [
          {key:'Near',hip:[-40,235],u:[-24.44,-81.545],l:[45.57,-110.98],ur:0,lr:-46,fr:46,du:12,dl:-22,df:12,dx:-7,dy:-9,disabled:nearHP<=0},
          {key:'Far',hip:[84,231],u:[-19.975,-77.785],l:[42.3,-111.6],ur:28,lr:-46,fr:18,du:-15,dl:24,df:-8,dx:7,dy:-9,disabled:farHP<=0}
        ]) {
          const first=rotate(leg.u,leg.ur),second=rotate(leg.l,leg.ur+leg.lr),ankle=[leg.hip[0]+first[0]+second[0],leg.hip[1]+first[1]+second[1]];
          const local=rotate([ankle[0],ankle[1]+drop],-tilt),target=[local[0]-leg.hip[0],local[1]-leg.hip[1]];
          const aLen=Math.hypot(...leg.u),bLen=Math.hypot(...leg.l),distance=Math.max(.001,Math.hypot(...target));
          const aAngle=Math.atan2(target[1],target[0])+Math.acos(clamp((aLen*aLen+distance*distance-bLen*bLen)/(2*aLen*distance),-1,1));
          const bAngle=Math.atan2(target[1]-aLen*Math.sin(aAngle),target[0]-aLen*Math.cos(aAngle));
          const upper=(aAngle-Math.atan2(leg.u[1],leg.u[0]))/DEG,lower=(bAngle-Math.atan2(leg.l[1],leg.l[0]))/DEG-upper;
          const disabled=leg.disabled ? 1 : 0;
          fold['mgd'+leg.key+'FoldUpper']=upper-leg.ur-disabled*leg.du;
          fold['mgd'+leg.key+'FoldLower']=lower-leg.lr-disabled*leg.dl;
          fold['mgd'+leg.key+'FootLevel']=-tilt-upper-lower-leg.fr-disabled*leg.df;
          fold['mgd'+leg.key+'FoldX']=-disabled*leg.dx;fold['mgd'+leg.key+'FoldY']=-disabled*leg.dy;
        }
      }
      return {id:options.id || 'mgd_mg2_msx2',reducedMotion:options.reducedMotion === true,origin:options.origin || [finite(r.x) ? r.x : 1120,0],frame,
        flags:{nearLegDisabled:nearHP<=0,farLegDisabled:farHP<=0,mgdDestroyed:destroyed,mgdEscapeActive:!!r.escape,...(options.flags || {})},
        channels:{strideLift,nearLegDamage:clamp(1-nearHP/4800,0,1),farLegDamage:clamp(1-farHP/4800,0,1),nearLegDisabled:nearHP<=0 ? 1 : 0,farLegDisabled:farHP<=0 ? 1 : 0,mgdCollapseFrames:collapseFrames,mgdCollapseProgress:collapseFrames/110,mgdCollapseDrop:drop,mgdCollapseTilt:tilt,...fold,mgdGunRecoil:a?.kind==='gun' && a.t>=a.windup && a.t<a.windup+a.active ? Math.sin(frame*.8) : 0,idleBreath:options.reducedMotion ? 0 : Math.sin(frame*.06),...(options.channels || {})}};
    }
    const jaw = typeof options.jawOpen === 'boolean' ? options.jawOpen : !r.defeated && !r.transition && (r.stagger>0 || !!(a?.kind==='water' && a.t>=a.windup-18 && a.t<a.windup+a.active+24));
    return {id:options.id || 'ray_mgs2_arsenal',reducedMotion:options.reducedMotion === true,origin:options.origin,frame,
      flags:{jawOpen:jaw,nearKneeStagger:r.stagger>0 && r.lastKnee==='nearKnee',farKneeStagger:r.stagger>0 && r.lastKnee==='farKnee',rayUnitNeutralized:!!r.defeated || r.transition>0,rayDefeated:!!r.defeated,...(options.flags || {})},
      channels:{jawOpen:jaw ? 1 : 0,jawDrop:jaw ? -90 : 0,nearKneeStagger:r.stagger>0 && r.lastKnee==='nearKnee' ? 1 : 0,farKneeStagger:r.stagger>0 && r.lastKnee==='farKnee' ? 1 : 0,unit:r.unit || 0,unitCollapse:r.defeated || r.transition>0 ? 46 : 0,idleBreath:options.reducedMotion ? 0 : Math.sin(frame*.06),...(options.channels || {})}};
  }
  async function defaultDecode(bytes) {
    const blob = new Blob([bytes], {type:'image/png'});
    if (typeof createImageBitmap==='function') return createImageBitmap(blob);
    const url=URL.createObjectURL(blob), image=new Image();
    try { image.src=url; await image.decode(); return image; }
    finally { URL.revokeObjectURL(url); }
  }
  async function digest(bytes) {
    if (!globalThis.crypto?.subtle) fail('SHA256 verification unavailable');
    return Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256',bytes)),(b) => b.toString(16).padStart(2,'0')).join('');
  }
  const release = (image) => { try { image?.close?.(); } catch (_) {} };
  function create(catalog, options = {}) {
    const machines=normalizeCatalog(catalog), entries=new Map(), attempts=new Map(), versions=new Map();
    if (options.requirePins!==false) for (const machine of machines.values()) for (const source of machine.sources.values()) if (!source.sha256 || source.bytes===undefined || source.width===undefined || source.height===undefined) fail(machine.id + ' native sources require SHA256, bytes and dimensions');
    const fetcher=options.fetch || globalThis.fetch?.bind(globalThis), decoder=options.decode || defaultDecode, hasher=options.sha256 || digest;
    if (!fetcher) fail('fetch unavailable');
    const resolve=options.resolveURL || ((file) => new URL(file,options.baseURL || new URL('../',document.baseURI)).href);
    function ready(id) { return entries.has(id); }
    function status(id) {
      const entry=entries.get(id), attempt=attempts.get(id);
      return {id,state:entry ? 'ready' : attempt?.state || 'missing',attemptState:attempt?.state || null,error:attempt?.error || null,pins:entry ? entry.pins.map((p) => ({...p})) : []};
    }
    async function load(id, request = {}) {
      const machine=machines.get(id);
      if (!machine) fail('unknown machine ' + id);
      if (entries.has(id) && !request.reload) return status(id);
      const version=(versions.get(id) || 0)+1; versions.set(id,version); attempts.set(id,{state:'loading',error:null});
      const images=new Map(), pins=[];
      const stillCurrent=() => versions.get(id)===version && !request.signal?.aborted;
      try {
        for (const source of machine.sources.values()) {
          if (!stillCurrent()) fail('load superseded or aborted');
          const response=await fetcher(resolve(source.file,machine),{signal:request.signal,cache:'force-cache'});
          if (!response.ok) fail('source HTTP ' + response.status + ': ' + source.file);
          const bytes=await response.arrayBuffer(), header=new Uint8Array(bytes,0,Math.min(8,bytes.byteLength));
          if (bytes.byteLength>32*1024*1024 || ![137,80,78,71,13,10,26,10].every((v,i) => header[i]===v)) fail('source is not bounded native PNG');
          if (source.bytes!==undefined && source.bytes!==bytes.byteLength) fail('source byte size differs: ' + source.file);
          const sha256=source.sha256 ? await hasher(bytes) : null;
          if (source.sha256 && sha256!==source.sha256) fail('source SHA256 differs: ' + source.file);
          if (!stillCurrent()) fail('load superseded or aborted');
          const image=await decoder(bytes,source); images.set(source.id,image);
          const width=image.width || image.naturalWidth, height=image.height || image.naturalHeight;
          if (!Number.isInteger(width) || !Number.isInteger(height) || width<1 || height<1 || source.width!==undefined && source.width!==width || source.height!==undefined && source.height!==height) fail('decoded dimensions differ: ' + source.file);
          pins.push({id:source.id,file:source.file,bytes:bytes.byteLength,sha256,width,height});
        }
        for (const part of machine.parts) for (const v of [part,...part.variants]) {
          const image=images.get(v.source), width=image.width || image.naturalWidth, height=image.height || image.naturalHeight;
          if (v.rect && (v.rect[0]+v.rect[2]>width || v.rect[1]+v.rect[3]>height)) fail(part.id + ' native rectangle leaves source');
        }
        if (!stillCurrent()) fail('load superseded or aborted');
        const previous=entries.get(id); entries.set(id,{machine,images,pins}); attempts.set(id,{state:'ready',error:null});
        previous?.images.forEach(release);
        return status(id);
      } catch (error) {
        images.forEach(release);
        if (versions.get(id)===version) attempts.set(id,{state:'error',error:String(error?.message || error)});
        throw error;
      }
    }
    function draw(context, id, state = {}) {
      const entry=entries.get(id); if (!entry) return false;
      const transforms=pose(entry.machine,state);
      for (const part of entry.machine.paintOrder) {
        const p=transforms.get(part.id); if (!p.visible || p.opacity<=0) continue;
        const image=entry.images.get(p.source), r=p.rect || [0,0,image.width || image.naturalWidth,image.height || image.naturalHeight];
        context.save();
        try { context.transform(...p.matrix); context.globalAlpha*=p.opacity; context.drawImage(image,...r,-p.pivot[0]*p.imageScale,-p.pivot[1]*p.imageScale,r[2]*p.imageScale,r[3]*p.imageScale); }
        finally { context.restore(); }
      }
      return true;
    }
    function drawCore(context, state, drawOptions = {}) {
      const adapter=corePose(state,drawOptions); return adapter ? draw(context,adapter.id,adapter) : false;
    }
    function dispose(id) {
      const ids=id===undefined ? [...machines.keys()] : [id];
      for (const key of ids) { versions.set(key,(versions.get(key) || 0)+1); entries.get(key)?.images.forEach(release); entries.delete(key); attempts.delete(key); }
    }
    return {load,ready,status,draw,drawCore,dispose,ids:() => [...machines.keys()]};
  }
  return {schema:SCHEMA,version:'1.0.0',create,normalizeCatalog,pose,corePose};
});
