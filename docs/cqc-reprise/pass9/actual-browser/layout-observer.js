/* Browser-only PASS8 publication observer. It reads real draws and original PNG alpha.
 * No pose/engine assignment, synthetic fighter draw, production source or image edit.
 * Inject into the actual versus iframe; call await __pub9Layout(actualDraw,{feet:true}).
 * A failed assertion also leaves the compact measurement in __pub9LastLayout.
 */
(() => {
  'use strict';
  const alphaCache = new Map(), ALPHA = 16, CSS_TOL = 1;
  const need = (ok, message) => { if (!ok) throw Error('PASS8 layout: ' + message); };
  const finite = a => Array.isArray(a) && a.every(Number.isFinite);
  const r = x => ({left:x.left, top:x.top, right:x.right, bottom:x.bottom});
  const pack = x => x ? [x.left,x.top,x.right,x.bottom].map(v=>Math.round(v*1000)/1000) : null;
  const emptyBounds = () => ({left:Infinity,top:Infinity,right:-Infinity,bottom:-Infinity});
  const extend = (q,x,y) => {q.left=Math.min(q.left,x);q.top=Math.min(q.top,y);q.right=Math.max(q.right,x);q.bottom=Math.max(q.bottom,y);};
  const valid = q => q && [q.left,q.top,q.right,q.bottom].every(Number.isFinite) && q.right>q.left && q.bottom>q.top;
  const inside = (q,b,t=CSS_TOL) => valid(q)&&valid(b)&&q.left>=b.left-t&&q.top>=b.top-t&&q.right<=b.right+t&&q.bottom<=b.bottom+t;
  const cut = (q,b,x=true,y=true) => ({left:x?Math.max(q.left,b.left):q.left,top:y?Math.max(q.top,b.top):q.top,right:x?Math.min(q.right,b.right):q.right,bottom:y?Math.min(q.bottom,b.bottom):q.bottom});
  const mapRect = (q,sx,sy,ox,oy) => ({left:ox+q.left*sx,top:oy+q.top*sy,right:ox+q.right*sx,bottom:oy+q.bottom*sy});
  const visible = e => !!e && e.getClientRects().length>0 && getComputedStyle(e).display!=='none' && getComputedStyle(e).visibility!=='hidden';
  const num = v => parseFloat(v)||0;
  const tag = e => e.id ? '#'+e.id : e.tagName.toLowerCase()+(e.classList.length?'.'+[...e.classList].slice(0,2).join('.'): '');
  function axisAligned(style,label) {
    if(style.transform==='none')return;
    const m=new DOMMatrixReadOnly(style.transform);
    need(Math.abs(m.b)<1e-7&&Math.abs(m.c)<1e-7&&m.a>0&&m.d>0,label+' has unsupported rotated/flipped CSS transform');
  }
  function clientBox(e) {
    const b=e.getBoundingClientRect(),sx=e.offsetWidth?b.width/e.offsetWidth:1,sy=e.offsetHeight?b.height/e.offsetHeight:1;
    return {left:b.left+e.clientLeft*sx,top:b.top+e.clientTop*sy,right:b.left+(e.clientLeft+e.clientWidth)*sx,bottom:b.top+(e.clientTop+e.clientHeight)*sy};
  }
  function contentBox(e) {
    const b=clientBox(e),s=e.ownerDocument.defaultView.getComputedStyle(e),br=e.getBoundingClientRect();
    const sx=e.offsetWidth?br.width/e.offsetWidth:1,sy=e.offsetHeight?br.height/e.offsetHeight:1;
    return {left:b.left+num(s.paddingLeft)*sx,top:b.top+num(s.paddingTop)*sy,right:b.right-num(s.paddingRight)*sx,bottom:b.bottom-num(s.paddingBottom)*sy};
  }
  function objectOffset(position,free,axis) {
    const tokens=position.trim().split(/\s+/),edges=axis==='x'?['left','right']:['top','bottom'];
    // Normal computed style is two percentages; also support four-value edge offsets.
    if(tokens.length>2){const i=tokens.findIndex(x=>edges.includes(x));if(i>=0){const n=tokens[i+1];const v=n?.endsWith('%')?free*parseFloat(n)/100:num(n);return tokens[i]===edges[1]?free-v:v;}}
    let v=tokens[axis==='x'?0:1]||'50%';
    if(v==='center')return free/2;if(v===edges[0])return 0;if(v===edges[1])return free;
    if(v.endsWith('%'))return free*parseFloat(v)/100;
    need(/^[-+]?\d*\.?\d+px$/.test(v),'unsupported canvas object-position '+position);
    return parseFloat(v);
  }
  function bitmapPlane(game) {
    const s=getComputedStyle(game);axisAligned(s,'canvas');const b=contentBox(game),cw=b.right-b.left,ch=b.bottom-b.top;
    need(cw>0&&ch>0,'empty canvas content box');let w=cw,h=ch;
    if(s.objectFit!=='fill'){
      const fit=s.objectFit==='cover'?Math.max(cw/game.width,ch/game.height):s.objectFit==='none'?1:Math.min(cw/game.width,ch/game.height);
      const scale=s.objectFit==='scale-down'?Math.min(1,fit):fit;w=game.width*scale;h=game.height*scale;
    }
    const x=objectOffset(s.objectPosition,cw-w,'x'),y=objectOffset(s.objectPosition,ch-h,'y');
    return {content:b,image:{left:b.left+x,top:b.top+y,right:b.left+x+w,bottom:b.top+y+h},fit:s.objectFit,position:s.objectPosition};
  }
  function inPolygon(x,y,polygon) {
    if(!polygon)return true;let yes=false;
    for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
      const [a,b]=polygon[i],[c,d]=polygon[j];
      if(((b>y)!==(d>y))&&x<(c-a)*(y-b)/(d-b)+a)yes=!yes;
    }
    return yes;
  }
  async function nativeAlpha(url,sha) {
    const key=url+'#'+sha;
    if(alphaCache.has(key)){const p=alphaCache.get(key);alphaCache.delete(key);alphaCache.set(key,p);return p;}
    const pending=(async()=>{
      const response=await fetch(url,{credentials:'same-origin',cache:'force-cache'});
      need(response.ok,'native image HTTP '+response.status+' '+url);
      const bytes=await response.arrayBuffer(),actual=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
      need(actual===sha,'native image SHA differs from exact observed catalog frame');
      need(typeof OffscreenCanvas==='function','OffscreenCanvas alpha read is unavailable');
      const bitmap=await createImageBitmap(new Blob([bytes],{type:'image/png'}),{premultiplyAlpha:'none',colorSpaceConversion:'none'});
      try {
        const c=new OffscreenCanvas(bitmap.width,bitmap.height),ctx=c.getContext('2d',{willReadFrequently:true});
        ctx.drawImage(bitmap,0,0);const rgba=ctx.getImageData(0,0,bitmap.width,bitmap.height).data,alpha=new Uint8Array(bitmap.width*bitmap.height);
        for(let i=0;i<alpha.length;i++)alpha[i]=rgba[i*4+3];
        return {width:bitmap.width,height:bitmap.height,alpha,sha256:actual};
      } finally {bitmap.close();}
    })();
    alphaCache.set(key,pending);while(alphaCache.size>4)alphaCache.delete(alphaCache.keys().next().value);
    try{return await pending;}catch(e){alphaCache.delete(key);throw e;}
  }
  function alphaBounds(data,frame,destination,matrix,feet) {
    const [sx,sy,sw,sh]=frame.rect,[dx,dy,dw,dh]=destination,[a,b,c,d,e,f]=matrix;
    need([sx,sy,sw,sh].every(Number.isInteger),'native alpha crop is not an integer source rectangle');
    need(sx>=0&&sy>=0&&sx+sw<=data.width&&sy+sh<=data.height,'source crop exceeds decoded PNG');
    const source=emptyBounds(),buffer=emptyBounds();let count=0;
    const qualifies=(x,y)=>data.alpha[(sy+y)*data.width+sx+x]>=ALPHA&&inPolygon((x+.5)/sw,(y+.5)/sh,frame.clipPolygon);
    const pixel=(out,x,y)=>{for(const [u,v] of [[x,y],[x+1,y],[x,y+1],[x+1,y+1]]){const lx=dx+u*dw/sw,ly=dy+v*dh/sh;extend(out,a*lx+c*ly+e,b*lx+d*ly+f);}};
    for(let y=0;y<sh;y++)for(let x=0;x<sw;x++)if(qualifies(x,y)){count++;extend(source,sx+x,sy+y);extend(source,sx+x+1,sy+y+1);pixel(buffer,x,y);}
    need(count>0&&valid(source)&&valid(buffer),'observed native crop has no alpha >=16 inside its contour');
    let foot=null;
    if(feet){
      // Use source body alpha, not stage/composited Canvas pixels or transparent RGB.
      // Old Snake idle's last 8% contains the complete real boot soles in both atlases.
      const start=source.bottom-Math.max(1,Math.ceil((source.bottom-source.top)*.08)),fs=emptyBounds(),fb=emptyBounds();let fc=0;
      for(let y=Math.max(0,Math.floor(start-sy));y<sh;y++)for(let x=0;x<sw;x++)if(sy+y>=start&&qualifies(x,y)){fc++;extend(fs,sx+x,sy+y);extend(fs,sx+x+1,sy+y+1);pixel(fb,x,y);}
      need(fc>0&&valid(fb),'source boot/ground alpha band is empty');foot={source:fs,buffer:fb,pixels:fc,fromSourceY:start};
    }
    const px=dx+frame.pivot[0]*dw,py=dy+frame.pivot[1]*dh;
    return {source,buffer,pixels:count,foot,pivotBuffer:[a*px+c*py+e,b*px+d*py+f]};
  }
  function clippingChain(game,body,foot) {
    let w=window,node=game,wholeBody=r(body),seenBody=cut(body,contentBox(game)),wholeFoot=foot?r(foot):null,seenFoot=foot?cut(foot,contentBox(game)):null;const levels=[];
    for(let depth=0;depth<8;depth++){
      const vp=w.visualViewport,viewport={left:vp?.offsetLeft||0,top:vp?.offsetTop||0,right:(vp?.offsetLeft||0)+(vp?.width||w.innerWidth),bottom:(vp?.offsetTop||0)+(vp?.height||w.innerHeight)},clips=[];
      seenBody=cut(seenBody,viewport);if(seenFoot)seenFoot=cut(seenFoot,viewport);
      for(let el=node.parentElement;el;el=el.parentElement){
        const style=w.getComputedStyle(el),cx=/^(hidden|clip|auto|scroll)$/.test(style.overflowX),cy=/^(hidden|clip|auto|scroll)$/.test(style.overflowY);
        if(cx||cy){const box=clientBox(el);seenBody=cut(seenBody,box,cx,cy);if(seenFoot)seenFoot=cut(seenFoot,box,cx,cy);clips.push({node:tag(el),axes:(cx?'x':'')+(cy?'y':''),rect:pack(box)});}
      }
      levels.push({path:w.location.pathname,viewport:[w.innerWidth,w.innerHeight],visualViewport:pack(viewport),scrollWidth:w.document.documentElement.scrollWidth,horizontalOverflow:w.document.documentElement.scrollWidth>w.innerWidth+CSS_TOL,clips,bodyFullyVisible:inside(wholeBody,seenBody),feetFullyVisible:wholeFoot?inside(wholeFoot,seenFoot):null});
      if(w===w.parent)return {levels,body:wholeBody,bodyVisible:seenBody,foot:wholeFoot,footVisible:seenFoot};
      const frame=w.frameElement;need(frame&&frame.ownerDocument,'same-origin iframe chain unavailable');
      const pw=frame.ownerDocument.defaultView;axisAligned(pw.getComputedStyle(frame),'iframe');const box=contentBox(frame),sx=(box.right-box.left)/w.innerWidth,sy=(box.bottom-box.top)/w.innerHeight;
      need(sx>0&&sy>0,'iframe has no positive visible content dimensions');
      wholeBody=mapRect(wholeBody,sx,sy,box.left,box.top);seenBody=mapRect(seenBody,sx,sy,box.left,box.top);
      if(wholeFoot){wholeFoot=mapRect(wholeFoot,sx,sy,box.left,box.top);seenFoot=mapRect(seenFoot,sx,sy,box.left,box.top);}
      w=pw;node=frame;
    }
    throw Error('PASS8 layout: iframe chain exceeded eight documents');
  }
  window.__pub9Layout=async function(draw,{feet=false,requireTopPageVisibility=true}={}) {
    need(draw&&typeof draw.uid==='string'&&[1,-1].includes(draw.face),'missing actual native draw UID/facing');
    need(finite(draw.rect)&&draw.rect.length===4&&finite(draw.destination)&&draw.destination.length===4&&finite(draw.matrix)&&draw.matrix.length===6,'invalid actual draw geometry');
    need(finite(draw.canvas)&&draw.canvas.length===2&&finite(draw.actorCanvas)&&draw.actorCanvas.length===2,'missing actual canvas dimensions/body anchor');
    const game=document.querySelector('#game'),wrap=document.querySelector('.canvas-wrap'),screen=document.querySelector('#fightScreen'),head=document.querySelector('.game-head'),help=document.querySelector('.game-help'),touch=document.querySelector('#touch45'),hud=document.querySelector('#responsiveFightHUD');
    need(game&&wrap&&screen&&head&&help&&touch&&hud,'ordinary versus layout nodes missing');
    need(!document.body.classList.contains('story55'),'story55 needs its separately scoped layout observer');
    need(game.width===draw.canvas[0]&&game.height===draw.canvas[1]&&game.width===1280&&game.height===720,'actual drawing buffer mismatch');
    const entry=window.CQC_COMBAT_SPRITE_CATALOG?.entries?.[draw.uid];need(entry,'observed fighter missing native catalog entry');
    const action=window.CQC_COMBAT_SPRITES.actionName(draw.pose||{},entry),groups=draw.face===entry.facing?entry.actions:entry.oppositeActions;
    need(groups&&entry.mirror===false&&draw.matrix[0]>0&&draw.matrix[3]>0,'independent native facing unavailable');
    const file=String(draw.file||'').replace(/^.*?(?=assets\/)/,'');
    const frame=groups[action]?.frames?.find(x=>x.file===file&&JSON.stringify(x.rect)===JSON.stringify(draw.rect));
    need(frame,'actual native crop is absent from its directional source action');
    const script=[...document.scripts].find(x=>/\/cqc-sprite-renderer\.js$/.test(new URL(x.src||location.href,location.href).pathname));
    need(script,'loaded sprite-renderer root is absent');const base=new URL('../',script.src),url=new URL(frame.file,base);
    need(url.origin===location.origin&&url.pathname.startsWith(base.pathname+'assets/'),'native PNG is outside the real mounted CQC root');
    const observedURL=draw.url||draw.URL;
    if(observedURL)need(new URL(observedURL,location.href).href===url.href,'observed PNG URL differs from its exact mounted source');
    if(draw.sourceSHA)need(draw.sourceSHA===frame.sha256,'observed source SHA differs from directional catalog frame');
    if(draw.pivot)need(JSON.stringify(draw.pivot)===JSON.stringify(frame.pivot),'observed native pivot differs from directional catalog frame');
    const decoded=await nativeAlpha(url.href,frame.sha256),alpha=alphaBounds(decoded,frame,draw.destination,draw.matrix,feet),plane=bitmapPlane(game),sx=(plane.image.right-plane.image.left)/game.width,sy=(plane.image.bottom-plane.image.top)/game.height;
    const bodyCSS=mapRect(alpha.buffer,sx,sy,plane.image.left,plane.image.top),footCSS=alpha.foot?mapRect(alpha.foot.buffer,sx,sy,plane.image.left,plane.image.top):null,chain=clippingChain(game,bodyCSS,footCSS);
    const rects={canvas:r(game.getBoundingClientRect()),content:plane.content,image:plane.image,wrap:r(wrap.getBoundingClientRect()),screen:r(screen.getBoundingClientRect()),head:r(head.getBoundingClientRect()),help:visible(help)?r(help.getBoundingClientRect()):null,touch:visible(touch)?r(touch.getBoundingClientRect()):null,hud:visible(hud)?r(hud.getBoundingClientRect()):null};
    const mobile=matchMedia('(max-width:760px)').matches,strip=mobile?rects.touch:rects.help,failures=[],checks=[];
    const check=(ok,name)=>{checks.push(name);if(!ok)failures.push(name);};
    check(visible(game)&&visible(screen)&&valid(rects.canvas),'visible combat canvas');
    check(inside(rects.canvas,rects.wrap),'complete canvas fits its wrapper');
    check(inside(rects.wrap,rects.screen)&&rects.wrap.top>=rects.head.bottom-CSS_TOL,'wrapper fits fight screen below header');
    check(Math.abs(sx-sy)*Math.max(game.width,game.height)<=CSS_TOL,'bitmap has no aspect distortion');
    check(inside(alpha.buffer,{left:0,top:0,right:game.width,bottom:game.height},.01),'complete opaque native body inside drawing buffer');
    check(inside(bodyCSS,rects.content)&&inside(bodyCSS,rects.wrap),'native body inside actual canvas content and wrapper');
    check(strip&&rects.canvas.bottom<=strip.top+CSS_TOL&&rects.wrap.bottom<=strip.top+CSS_TOL,'canvas and wrapper stop before active control strip');
    check(strip&&bodyCSS.bottom<=strip.top+CSS_TOL,'opaque body stays above active control strip');
    check(document.documentElement.scrollWidth<=innerWidth+CSS_TOL,'versus has no horizontal overflow');
    check(chain.levels.every(x=>!x.horizontalOverflow),'front and Shadow have no horizontal overflow');
    check(Math.hypot(alpha.pivotBuffer[0]-draw.actorCanvas[0],alpha.pivotBuffer[1]-draw.actorCanvas[1])<=.01,'actual source pivot matches observed actor anchor');
    const layoutLink=[...document.querySelectorAll('link[rel=stylesheet]')].find(x=>/\/cqc-pass8-layout\.css$/.test(new URL(x.href,location.href).pathname));
    check(!!layoutLink?.sheet,'PASS8 layout stylesheet loaded');
    if(mobile){
      check(!visible(help)&&visible(touch)&&visible(hud),'mobile HUD and touch strip replace desktop help');
      const names=[...hud.querySelectorAll('[data-hud=name]')],health=[...hud.querySelectorAll('[data-hud=healthTrack]')];
      check(names.length===2&&names.every(x=>parseFloat(getComputedStyle(x).fontSize)>=14)&&health.length===2&&health.every(x=>x.hasAttribute('aria-valuenow')),'mobile HUD names and current health ARIA readable');
      check(rects.hud&&rects.wrap.top>=rects.hud.bottom-CSS_TOL,'mobile canvas wrapper begins below HUD');
      const buttons=[...touch.querySelectorAll('button')];check(buttons.length===12&&buttons.every(x=>inside(r(x.getBoundingClientRect()),rects.touch)&&r(x.getBoundingClientRect()).left>=-CSS_TOL&&r(x.getBoundingClientRect()).right<=innerWidth+CSS_TOL),'all twelve touch controls fit strip and viewport width');
    }else check(visible(help)&&!visible(touch),'desktop help visible and touch strip hidden');
    if(feet){
      check(inside(alpha.foot.buffer,{left:0,top:0,right:game.width,bottom:game.height},.01),'source boot band inside drawing buffer');
      check(inside(footCSS,rects.content)&&inside(footCSS,rects.wrap)&&strip&&footCSS.bottom<=strip.top+CSS_TOL,'opaque source boot band fully above controls');
    }
    if(requireTopPageVisibility){check(inside(chain.body,chain.bodyVisible),'whole opaque body survives iframe and top-page clipping');if(feet)check(inside(chain.foot,chain.footVisible),'whole opaque boot band survives iframe and top-page clipping');}
    const proof={uid:draw.uid,face:draw.face,action,passed:!failures.length,failures,viewport:[innerWidth,innerHeight],mobile,source:{file:frame.file,sha256:decoded.sha256,rect:frame.rect,pivot:frame.pivot,alphaThreshold:ALPHA,opaquePixels:alpha.pixels,contour:!!frame.clipPolygon},objectFit:plane.fit,objectPosition:plane.position,bodyBounds:{source:pack(alpha.source),buffer:pack(alpha.buffer),css:pack(bodyCSS),topPage:pack(chain.body),visibleTopPage:pack(chain.bodyVisible)},footBand:feet?{fraction:.08,pixels:alpha.foot.pixels,fromSourceY:alpha.foot.fromSourceY,source:pack(alpha.foot.source),buffer:pack(alpha.foot.buffer),css:pack(footCSS),topPage:pack(chain.foot),visibleTopPage:pack(chain.footVisible)}:null,layout:Object.fromEntries(Object.entries(rects).map(([k,v])=>[k,pack(v)])),iframeClipping:chain.levels,checkCount:checks.length};
    window.__pub9LastLayout=proof;
    if(failures.length){const error=Error('PASS8 layout assertions: '+failures.join('; ')+' '+JSON.stringify(proof));error.layoutProof=proof;throw error;}
    return proof;
  };
})();
