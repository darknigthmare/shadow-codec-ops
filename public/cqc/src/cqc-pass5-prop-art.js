/* Original MGS2 knife/C4 images. Rendering never alters projectile or trap state. */
(function(root){'use strict';
  function createRenderer(options={}){
    const catalog=options.catalog||root.CQC_PASS5_PROP_CATALOG||{},ImageType=options.Image||root.Image,
      scriptURL=options.scriptURL||root.document?.currentScript?.src,images={},counts={projectile:0,trap:0};
    for(const [id,atlas]of Object.entries(catalog)){
      const item={atlas,image:null,status:'unavailable',url:scriptURL?new URL('../'+atlas.file,scriptURL).href:atlas.file};
      if(typeof ImageType==='function'){
        item.image=new ImageType();item.status='loading';
        item.image.onload=()=>{item.status=item.image.naturalWidth===atlas.width&&item.image.naturalHeight===atlas.height?'ready':'invalid-dimensions';};
        item.image.onerror=()=>{item.status='failed';};item.image.src=item.url;
      }
      images[id]=item;
    }
    function source(object,kind){
      if(!object||object.dead||object.delay>0)return null;
      const d=object.def;
      if(kind==='projectile'&&d?.tag==='knife'&&['core__vamp::special','core__vamp::specialDown'].includes(d.id))return images['vamp-knives'];
      if(kind==='projectile'&&d?.id==='core__fatman::super'&&d.tag==='explosive'&&d.projectileOverride==='c4')return images['fatman-c4'];
      if(kind==='trap'&&d?.id==='core__fatman::specialDown'&&d.kind==='trap'&&d.tag==='explosive')return images['fatman-c4'];
      return null;
    }
    function draw(ctx,object,zoom,kind){
      const item=source(object,kind);
      if(!item||item.status!=='ready'||!Number.isFinite(zoom)||zoom<=0)return false;
      const props=item.atlas.props,index=kind==='trap'?0:Number.isFinite(object.id)?Math.abs(Math.trunc(object.id))%props.length:0,
        prop=props[index],rect=prop?.rect;
      if(!Array.isArray(rect)||rect.length!==4||!rect.every(Number.isFinite))return false;
      const [x,y,w,h]=rect,dw=(kind==='trap'?prop.trapWidth:prop.displayWidth)*zoom,dh=h/w*dw;
      if(x<0||y<0||w<=0||h<=0||x+w>item.atlas.width||y+h>item.atlas.height||!Number.isFinite(dw)||dw<=0)return false;
      ctx.save();
      if(kind==='projectile'&&item===images['fatman-c4'])ctx.rotate((Number.isFinite(object.age)?object.age:0)*.035);
      ctx.drawImage(item.image,x,y,w,h,-dw/2,kind==='trap'?-dh:-dh/2,dw,dh);ctx.restore();
      counts[kind]++;return true;
    }
    return {drawProjectile:(c,q,z=1)=>draw(c,q,z,'projectile'),drawTrap:(c,t,z=1)=>draw(c,t,z,'trap'),
      diagnostics:()=>({counts:{...counts},atlases:Object.fromEntries(Object.entries(images).map(([id,item])=>
        [id,{status:item.status,url:item.url,sha256:item.atlas.sha256,props:item.atlas.props.map(p=>p.id)}]))})};
  }
  const api=createRenderer();api.createRenderer=createRenderer;root.CQC_PASS5_PROP_ART=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
