/* Native original-game projectile artwork; drawing leaves combat state intact. */
(function(root){'use strict';
  const rules={
    'pain-hornets':{uid:'core__pain',tag:'swarm',slots:['special','specialForward','super']},
    'fear-bolts':{uid:'core__fear',tag:'bolt',slots:['special','super']},
    'fury-flames':{uid:'core__fury',tag:'fire',slots:['special','super']},
    'redblaster-grenades':{uid:'core__redblaster_mg2',tag:'explosive',slots:['special','specialForward','super']}
  };
  function createRenderer(options={}){
    const catalog=options.catalog||root.CQC_PASS6_PROP_CATALOG||{},ImageType=options.Image||root.Image,
      scriptURL=options.scriptURL||root.document?.currentScript?.src,images={},counts={projectile:0,trap:0,barrier:0,finisher:0};
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
      if(kind==='trap')return d?.id==='core__fury::specialDown'&&d.kind==='trap'&&d.tag==='fire'?images['fury-flames']:null;
      for(const [key,rule]of Object.entries(rules)){
        if(d?.tag===rule.tag&&rule.slots.some(slot=>d.id===rule.uid+'::'+slot))return images[key];
      }
      return null;
    }
    function paint(ctx,item,object,zoom,kind,index){
      if(!item||item.status!=='ready'||!Number.isFinite(zoom)||zoom<=0)return false;
      const props=item.atlas.props,animated=item===images['pain-hornets']||item===images['fury-flames'],base=Number.isFinite(object.id)?Math.abs(Math.trunc(object.id)):0,step=animated&&Number.isFinite(object.age)?Math.floor(object.age/4):0,prop=props[index??((base+step)%props.length)],rect=prop?.rect;
      if(!Array.isArray(rect)||rect.length!==4||!rect.every(Number.isFinite))return false;
      const [x,y,w,h]=rect,dw=(kind==='trap'?prop.trapWidth:prop.displayWidth)*zoom,dh=h/w*dw;
      if(x<0||y<0||w<=0||h<=0||x+w>item.atlas.width||y+h>item.atlas.height||!Number.isFinite(dw)||dw<=0)return false;
      ctx.save();
      if(kind==='projectile'&&item===images['redblaster-grenades'])ctx.rotate((Number.isFinite(object.age)?object.age:0)*.035);
      ctx.drawImage(item.image,x,y,w,h,-dw/2,kind==='trap'?-dh:-dh/2,dw,dh);ctx.restore();
      counts[kind]++;return true;
    }
    function drawBarrier(ctx,actor,zoom=1){
      if(actor?.f?.uid!=='core__pain'||!actor.buffs?.barrier)return false;
      const item=images['pain-hornets'];if(item?.status!=='ready')return false;
      let ok=true;
      for(const [x,y,index]of [[-45,-85,0],[42,-130,1],[-25,-195,2],[28,-235,0]]){
        ctx.save();ctx.translate(x*zoom,y*zoom);ok=paint(ctx,item,actor,zoom,'barrier',index)&&ok;ctx.restore();
      }
      return ok;
    }
    // Authored conclusions after victory. These drawings do not resolve hits or alter combat state.
    function drawFinisher(ctx,scene){
      if(!scene||!['core__pain','core__redblaster_mg2'].includes(scene.uid))return false;
      const {uid,fin,phase,ax,vx,vy,dir}=scene;
      if(!fin?.phases?.includes(phase)||![ax,vx,vy,dir,scene.t].every(Number.isFinite)||![-1,1].includes(dir))return false;
      const t=Math.max(0,Math.min(1,scene.t)),local=Math.max(0,Math.min(1,t*fin.phases.length-fin.phases.indexOf(phase)));
      if(uid==='core__pain'){
        const item=images['pain-hornets'];if(item?.status!=='ready')return false;
        if(fin.slot==='back')return true;
        const positions=fin.slot==='down'?[[ax-55,440],[ax+50,385],[ax-30,310],[ax+25,260]]:
          ['volley','impact'].includes(phase)?Array.from({length:4},(_,i)=>[ax+(vx-ax)*Math.min(1,local+.12*i),350+Math.sin(t*14+i)*28]):[];
        for(let i=0;i<positions.length;i++){
          ctx.save();ctx.translate(...positions[i]);paint(ctx,item,{id:i,age:t*120},1.65,'finisher');ctx.restore();
        }
        return true;
      }
      if(fin.slot==='down'){
        if(['lock','confirm'].includes(phase)){
          ctx.save();ctx.strokeStyle='#d8ddd1';ctx.lineWidth=2;
          for(const height of [425,455]){ctx.beginPath();ctx.moveTo(ax+dir*55,height);ctx.lineTo(vx+dir*45,height+24);ctx.stroke();}
          ctx.restore();counts.finisher++;
        }
        return true;
      }
      if(phase==='arc'){
        const x=ax+dir*65+(vx-ax-dir*65)*local,y=370-105*Math.sin(local*Math.PI)+25*local;
        ctx.save();ctx.translate(x,y);ctx.rotate(local*Math.PI*2*dir);ctx.fillStyle='#7b8260';ctx.fillRect(-7,-9,14,18);ctx.strokeStyle='#d9d8ad';ctx.lineWidth=2;ctx.strokeRect(-7,-9,14,18);ctx.fillStyle='#dadbc9';ctx.fillRect(-3,-13,6,5);ctx.restore();counts.finisher++;
      }else if(phase==='blast'){
        ctx.save();ctx.globalAlpha=.5*(1-local);ctx.fillStyle='#e9a65d';ctx.beginPath();ctx.arc(vx,395,25+local*65,0,Math.PI*2);ctx.fill();ctx.restore();counts.finisher++;
      }
      return true;
    }
    return {drawProjectile:(c,q,z=1)=>paint(c,source(q,'projectile'),q,z,'projectile'),
      drawTrap:(c,t,z=1)=>paint(c,source(t,'trap'),t,z,'trap'),drawBarrier,drawFinisher,
      diagnostics:()=>({counts:{...counts},atlases:Object.fromEntries(Object.entries(images).map(([id,item])=>
        [id,{status:item.status,url:item.url,sha256:item.atlas.sha256,props:item.atlas.props.map(p=>p.id)}]))})};
  }
  const api=createRenderer();api.createRenderer=createRenderer;root.CQC_PASS6_PROP_ART=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
