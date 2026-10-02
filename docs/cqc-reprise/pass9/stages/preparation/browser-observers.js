(async function () {
  'use strict';
  const sourceRoot = '/cqc-game-working/cqc-versus-v056/';
  const original = await (await fetch(sourceRoot + 'data/stage-layer-catalog-reprise.json')).json();
  const overlay = await (await fetch('THREE_STAGE_OVERLAY.json')).json();
  const catalog = structuredClone(original);
  for (const row of overlay.rows) catalog.stages[catalog.stages.findIndex(s => s.id === row.id)] = row.afterStage;
  const targetIDs = overlay.rows.map(s => s.id);
  const base = window.BASELINE_STAGE_ENGINE;
  const next = window.CQC_STAGE_LAYER_ENGINE;
  let maskAllocations = 0;
  const allocatedMasks = [];
  const createCanvas = () => {const c = document.createElement('canvas'); allocatedMasks.push(c); maskAllocations++; return c;};
  const baseline = base.createRenderer(original, {baseURL: sourceRoot, reducedMotion: () => false, maxReadyStages: 6});
  const proposed = next.createRenderer(catalog, {baseURL: sourceRoot, reducedMotion: () => false, createCanvas, maxReadyStages: 6});
  const ready = await Promise.all(targetIDs.flatMap(id => [baseline.preload(id), proposed.preload(id)]));
  if (ready.some(x => !x)) throw Error('Original stage planes failed to load');
  const out = document.querySelector('#stageCanvas');
  const surface = () => {const c=document.createElement('canvas');c.width=1280;c.height=720;return c;};
  function render(renderer,id,options) {
    const canvas=surface(),ctx=canvas.getContext('2d',{willReadFrequently:true}),calls=[];
    const draw=ctx.drawImage.bind(ctx);
    ctx.drawImage=(image,...args)=>{calls.push({kind:image instanceof HTMLImageElement?'plane':'mask',source:image.src||null,args,alpha:ctx.globalAlpha,smoothing:ctx.imageSmoothingEnabled});draw(image,...args);};
    if (!renderer.drawBackground(ctx,id,options) || !renderer.drawForeground(ctx,id,options)) throw Error('Stage frame rejected '+id);
    return {canvas,pixels:ctx.getImageData(0,0,1280,720).data,calls};
  }
  const canonicalCalls = calls => calls.filter(x=>x.kind==='plane');
  function regionsFor(id,options) {
    const layer=catalog.stages.find(s=>s.id===id).layers.find(l=>l.id==='architecture');
    const t=next.layerTransform(layer,options);
    return (layer.localLuminance?.sourcePixelRegions||[]).map(r=>({
      x:(layer.rect.x+r.x*layer.rect.width/layer.width)*t.scale+t.x,
      y:(layer.rect.y+r.y*layer.rect.height/layer.height)*t.scale+t.y,
      w:r.width*layer.rect.width/layer.width*t.scale,h:r.height*layer.rect.height/layer.height*t.scale}));
  }
  function compare(before,after,id,options,expectEqual) {
    const layer=catalog.stages.find(s=>s.id===id).layers.find(l=>l.id==='architecture');
    const cap=layer.localLuminance?.maximumDimmingFraction||0,regions=regionsFor(id,options);
    let changed=0,maxDecrease=0;
    if(JSON.stringify(canonicalCalls(before.calls))!==JSON.stringify(canonicalCalls(after.calls))) throw Error('Four-plane drawing geometry changed '+id);
    for(let i=0;i<before.pixels.length;i+=4) {
      const a=before.pixels,b=after.pixels;
      if(a[i+3]!==b[i+3])throw Error('Composite alpha changed '+id);
      if(a[i]===b[i]&&a[i+1]===b[i+1]&&a[i+2]===b[i+2])continue;
      changed++;const x=(i/4)%1280,y=Math.floor(i/4/1280);
      if(!regions.some(r=>x>=Math.floor(r.x)-1&&x<=Math.ceil(r.x+r.w)+1&&y>=Math.floor(r.y)-1&&y<=Math.ceil(r.y+r.h)+1))throw Error('Dimming escaped reviewed native region '+id+' '+x+','+y);
      for(let c=0;c<3;c++){if(b[i+c]>a[i+c])throw Error('New light was introduced');if(b[i+c]<a[i+c]*(1-cap-1/255)-1.01)throw Error('Dimming cap exceeded quantization tolerance '+JSON.stringify({id,options,x,y,c,cap,before:a[i+c],after:b[i+c],calls:after.calls.filter(c=>c.kind==='mask')}));maxDecrease=Math.max(maxDecrease,a[i+c]-b[i+c]);}
    }
    if(expectEqual&&changed)throw Error('Disabled or static rendering differed '+id);
    return {id,options,changedPixels:changed,maxChannelDecrease:maxDecrease,quantizationBound:'controlOpacityCap +1/255 alpha quantization, then1 RGB unit rounding',basePlaneDraws:canonicalCalls(before.calls).length,maskDraws:after.calls.filter(c=>c.kind==='mask').length};
  }
  async function rasterChecks() {
    const results=[],allStages=catalog.stages.map(s=>({id:s.id,errors:next.validateStage(s)}));
    if(allStages.some(s=>s.errors.length))throw Error('Catalog validation failed');
    for(const id of targetIDs) {
      for(const camera of [-220,0,220])for(const zoom of [.78,1,1.08]) {
        const options={time:4,camera,zoom};
        results.push(compare(render(baseline,id,options),render(proposed,id,options),id,options,id==='zanzibar'));
      }
      for(const time of [0,2,9]) {
        const options={time,camera:0,zoom:.78};
        results.push(compare(render(baseline,id,options),render(proposed,id,options),id,options,id==='zanzibar'||time===0));
      }
      for(const disabled of [{motion:false},{animate:false},{allowAmbientLuminance:false},{ambient:false}]) {
        const options={time:4,camera:220,zoom:.78,...disabled};
        results.push(compare(render(baseline,id,{...options,motion:false}),render(proposed,id,options),id,options,true));
      }
    }
    for(const id of ['outer_heaven','arsenal_corridor']) {
      const layer=catalog.stages.find(s=>s.id===id).layers.find(l=>l.id==='architecture');
      for(const period of layer.localLuminance.authoredPeriodSeconds) {
        const options={time:period/2,camera:0,zoom:.78};
        const row=compare(render(baseline,id,options),render(proposed,id,options),id,options,false);
        if(!row.changedPixels)throw Error('No visible authored dimming at wide-view cycle midpoint');
        results.push(row);
      }
    }
    const rootPins=await(await fetch('SOURCE_PINS.json')).json(), hashes=[];
    for(const pin of rootPins.files.filter(p=>p.path.includes('/assets/stages-reprise/'))) {
      const response=await fetch('/'+pin.path.slice('/workspace/'.length),{cache:'force-cache'});
      const bytes=await response.arrayBuffer();
      const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
      if(digest!==pin.sha256||bytes.byteLength!==pin.bytes)throw Error('Actual loaded native PNG bytes changed '+pin.path);
      hashes.push({path:pin.path,sha256:digest,bytes:bytes.byteLength});
    }
    return {status:'passed',rasterComparisons:results.length,allStagesValidated:allStages.length,results,actualNativePNGHashes:hashes,maskAllocations,
      fidelity:'Authored cycles only; final composed pixels darken locally, including the tiny underlying contribution at original alpha249–254. Native source RGB files untouched.'};
  }
  async function coldAndEvictionChecks() {
    const rows=[];
    for(const gate of [{motion:false},{animate:false},{allowAmbientLuminance:false},{ambient:false},{reducedMotion:true}]) {
      let allocated=0;
      const renderer=next.createRenderer(catalog,{baseURL:sourceRoot,reducedMotion:()=>Boolean(gate.reducedMotion),createCanvas:()=>{allocated++;return surface();}});
      await renderer.preload('outer_heaven');
      const result=render(renderer,'outer_heaven',{time:4,camera:0,zoom:.78,...gate});
      if(allocated||result.calls.some(c=>c.kind==='mask'))throw Error('Cold disabled path allocated or painted masks');
      rows.push({gate,allocated,overlayCalls:0});
    }
    const owned=[];
    const renderer=next.createRenderer(catalog,{baseURL:sourceRoot,reducedMotion:()=>false,maxReadyStages:1,createCanvas:()=>{const c=surface();owned.push(c);return c;}});
    await renderer.preload('outer_heaven');render(renderer,'outer_heaven',{time:4,camera:0,zoom:.78});
    if(owned.length!==4)throw Error('Four masks were not allocated');
    await renderer.preload('arsenal_corridor');
    if(!owned.every(c=>c.width===0&&c.height===0))throw Error('Evicted mask buffers retained');
    if(renderer.status('outer_heaven').state!=='unloaded')throw Error('Native image cache eviction failed');
    await renderer.preload('outer_heaven');render(renderer,'outer_heaven',{time:4,camera:0,zoom:.78});
    if(owned.length!==8||renderer.cacheInfo().luminanceMaskCanvases!==4)throw Error('Reload masks failed');
    return {status:'passed',coldCases:rows,evictedMaskCanvasesFreed:4,reloadedMaskCanvases:4,cacheInfo:renderer.cacheInfo()};
  }
  async function actualMaskChecks() {
    const checks=[];let maskIndex=0;
    for(const id of ['outer_heaven','arsenal_corridor']) {
      const layer=catalog.stages.find(s=>s.id===id).layers.find(l=>l.id==='architecture'),glow=layer.localLuminance;
      const image=new Image();image.src=sourceRoot+layer.file;await image.decode();
      for(let index=0;index<4;index++) {
        const region=glow.sourcePixelRegions[index],source=document.createElement('canvas');source.width=region.width;source.height=region.height;
        const ctx=source.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,region.x,region.y,region.width,region.height,0,0,region.width,region.height);
        const a=ctx.getImageData(0,0,region.width,region.height).data;
        const mask=allocatedMasks[maskIndex++],b=mask.getContext('2d',{willReadFrequently:true}).getImageData(0,0,region.width,region.height).data;
        let selected=0,excluded=0;
        for(let i=0;i<a.length;i+=4) {
          const chosen=a[i+3]>=128&&(glow.maskColor==='red'?a[i]>=a[i+1]+25&&a[i]>=a[i+2]+20:a[i+1]>=a[i]+18&&a[i+2]>=a[i]+18);
          if(chosen)selected++;else excluded++;
          if(b[i]||b[i+1]||b[i+2]||b[i+3]!== (chosen?a[i+3]:0))throw Error('Mask changed excluded structure pixels or source alpha '+id+' region '+index);
        }
        checks.push({id,index,region,selectedSourcePixels:selected,excludedStructurePixels:excluded,sourceAlphaPreserved:true});
      }
    }
    return{status:'passed',nativeMaskRegions:checks.length,checks,totalSelectedSourcePixels:checks.reduce((n,x)=>n+x.selectedSourcePixels,0)};
  }
  function display(id='outer_heaven',time=4,camera=0,zoom=.78) {
    const result=render(proposed,id,{time,camera,zoom});
    out.getContext('2d').drawImage(result.canvas,0,0);
    document.querySelector('#stage').value=id;
    document.querySelector('#state').textContent=id+' — quatre plans natifs, caméra '+camera+', zoom '+zoom+', temps '+time+' s. '+(id==='zanzibar'?'Marques ocre statiques.':'Cadence qualifiée comme adaptation d’auteur.');
    return {id,time,camera,zoom};
  }
  window.PASS9_STAGE_REVIEW={rasterChecks,coldAndEvictionChecks,actualMaskChecks,display,catalog,original,baseline,proposed,regionsFor};
  document.querySelector('#view').onclick=()=>display(document.querySelector('#stage').value);
  display();
  window.__stageReviewReady=true;
})().catch(error=>{window.__consoleErrors.push(error.stack||String(error));document.querySelector('#state').textContent=String(error);});
