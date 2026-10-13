/* Original PS1 office debris. This renderer never changes projectile physics. */
(function(root){'use strict';
  const atlas={file:'assets/combat-props/core__mantis/office-debris-native-pass4.png',
    sha256:'0b11d9814274dae1dc94d5816722405320c0e12ccfd236e59367c35b2309716c',width:2048,height:768,
    props:[{id:'stone-bust',rect:[140,92,423,616],displayHeight:72},
      {id:'portrait-frame-front',rect:[809,140,429,519],displayHeight:64},
      {id:'portrait-frame-back',rect:[1574,112,338,571],displayHeight:64}],
    scope:'Original MGS1 PS1 airborne bust and picture frames. Details are closest interpretations of compressed original captures; display size, rotation and existing collision geometry are Versus adaptations.'};
  function createRenderer(options={}){
    const ImageType=options.Image||root.Image,scriptURL=options.scriptURL||root.document?.currentScript?.src,
      url=scriptURL?new URL('../'+atlas.file,scriptURL).href:atlas.file;
    let img=null,status='unavailable',drawCount=0,lastProp=null;
    if(typeof ImageType==='function'){
      img=new ImageType();status='loading';
      img.onload=()=>{status=img.naturalWidth===atlas.width&&img.naturalHeight===atlas.height?'ready':'invalid-dimensions';};
      img.onerror=()=>{status='failed';};img.src=url;
    }
    function eligible(q){return typeof q?.def?.id==='string'&&q.def.id.startsWith('core__mantis::')&&
      ['psychic','bind'].includes(q.def.tag)&&!q.dead&&!(q.delay>0);}
    function draw(ctx,q,zoom=1){
      if(!eligible(q)||status!=='ready'||!Number.isFinite(zoom)||zoom<=0)return false;
      const index=Number.isFinite(q.id)?Math.abs(Math.trunc(q.id))%atlas.props.length:0,
        prop=atlas.props[index],[x,y,w,h]=prop.rect,dh=prop.displayHeight*zoom,dw=w/h*dh;
      ctx.save();ctx.rotate((Number.isFinite(q.age)?q.age:0)*.035);
      ctx.drawImage(img,x,y,w,h,-dw/2,-dh/2,dw,dh);ctx.restore();
      drawCount++;lastProp=prop.id;return true;
    }
    return {draw,eligible,diagnostics:()=>({status,url,drawCount,lastProp,sha256:atlas.sha256,
      props:atlas.props.map(p=>p.id)})};
  }
  const api=createRenderer();api.createRenderer=createRenderer;api.atlas=atlas;
  root.CQC_PASS4_PROJECTILE_ART=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
