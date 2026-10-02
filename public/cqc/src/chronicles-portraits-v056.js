/* Illustrated portrait atlases, loaded on demand; roster IDs remain unchanged. */
(() => {
  'use strict';
  const mapping=window.CQC56_PORTRAIT_MAP||{}, cache=new Map(), failed=new Set(), requests=new WeakMap();
  const original=window.CQC55_ART.drawPortrait;
  function finish(entry,ok){
    if(entry.status!=='loading')return;
    entry.status=ok&&entry.img.naturalWidth&&entry.img.naturalHeight?'loaded':'failed';
    if(entry.status==='loaded')failed.delete(entry.atlas);else failed.add(entry.atlas);
    const redraws=[...entry.redraws.values()];entry.redraws.clear();
    for(const redraw of redraws)redraw();
  }
  function get(uid){
    const item=mapping[uid];if(!item)return null;
    let entry=cache.get(item.atlas);
    if(!entry){
      const img=new Image();entry={img,atlas:item.atlas,status:'loading',redraws:new Map()};cache.set(item.atlas,entry);
      // Keep decoded image memory bounded while paging through all 354 profiles.
      while(cache.size>8)cache.delete(cache.keys().next().value);
      let decoding=false;const loaded=()=>{if(decoding||entry.status!=='loading')return;decoding=true;if(typeof img.decode!=='function'){finish(entry,true);return;}try{Promise.resolve(img.decode()).then(()=>finish(entry,true),()=>finish(entry,false));}catch(_){finish(entry,false);}};img.decoding='async';img.onload=loaded;
      img.onerror=()=>finish(entry,false);
      img.src=window.CQC56_PORTRAIT_DATA?.[item.atlas]||'../assets/portraits-v056/'+item.atlas;
      if(img.complete&&img.naturalWidth&&img.naturalHeight&&entry.status==='loading')loaded();
    } else {cache.delete(item.atlas);cache.set(item.atlas,entry);}
    return {item,entry};
  }
  function cancel(canvas){
    const previous=requests.get(canvas);if(!previous)return;
    for(const entry of previous.entries)entry.redraws.delete(canvas);
    requests.delete(canvas);
  }
  function whenReady(canvas,uids,redraw){
    // Replace the previous frame's subscription; one callback per canvas and atlas.
    // A battle canvas may need two different atlases, which can finish in either order.
    cancel(canvas);
    const entries=new Set(uids.map(uid=>get(uid)?.entry).filter(entry=>entry?.status==='loading'));
    if(!entries.size)return;
    const request={entries};requests.set(canvas,request);
    for(const entry of entries)entry.redraws.set(canvas,()=>{
      if(requests.get(canvas)!==request)return;
      if(canvas.isConnected===false){cancel(canvas);return;}
      redraw();
    });
  }
  function draw(c,uid,x,y,w,h,options={}){
    const e=get(uid);if(!e||e.entry.status!=='loaded'||!e.entry.img.complete||!e.entry.img.naturalWidth)return false;
    const {item,entry:{img}}=e,sw=img.naturalWidth/item.cols,sh=img.naturalHeight/item.rows;
    c.save();
    c.shadowColor='#0009';c.shadowBlur=options.small?0:30;
    c.fillStyle='#0a1620';c.beginPath();c.roundRect(x,y,w,h,options.small?0:8);c.fill();
    c.shadowBlur=0;c.clip();
    // The atlas cell is square. Crop only within that cell, never into a neighbour.
    const srcRatio=sw/sh,dstRatio=w/h;
    let cw=sw,ch=sh;if(dstRatio>srcRatio)ch=sw/dstRatio;else cw=sh*dstRatio;
    c.drawImage(img,item.col*sw+(sw-cw)/2,item.row*sh+(sh-ch)/2,cw,ch,x,y,w,h);
    if(!options.small){const g=c.createLinearGradient(0,y+h*.78,0,y+h);g.addColorStop(0,'#08121c00');g.addColorStop(1,'#07121ac9');c.fillStyle=g;c.fillRect(x,y,w,h);}
    c.restore();
    if(!options.small){c.strokeStyle=options.ending?'#d2bb8677':'#8faeb766';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);}
    return true;
  }
  function portrait(canvas,f){
    cancel(canvas);
    const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);canvas.setAttribute?.('aria-label',f.name);canvas.setAttribute?.('aria-busy',status(f.uid).state==='loading'?'true':'false');
    if(draw(c,f.uid,0,0,canvas.width,canvas.height,{small:true})){canvas.dataset.painted='true';canvas.dataset.artState='ready';canvas.setAttribute?.('aria-busy','false');return;}
    if(mapping[f.uid]){c.fillStyle='#07110d';c.fillRect(0,0,canvas.width,canvas.height);const unavailable=failed.has(mapping[f.uid].atlas);canvas.dataset.painted='false';canvas.dataset.artState=unavailable?'failed':'loading';canvas.setAttribute?.('aria-busy',unavailable?'false':'true');}
    else original(canvas,f);
    whenReady(canvas,[f.uid],()=>portrait(canvas,f));
  }
  window.CQC55_ART.drawPortrait=portrait;
  function status(uid){const item=mapping[uid];return {mapped:!!item,state:item?(cache.get(item.atlas)?.status||'not-requested'):'unmapped'};}
  window.CQC56_PORTRAITS={draw,portrait,whenReady,cancel,status,diagnostics:()=>({mapped:Object.keys(mapping).length,loaded:[...cache].filter(([,e])=>e.status==='loaded').map(([k])=>k),failed:[...failed]})};
})();
