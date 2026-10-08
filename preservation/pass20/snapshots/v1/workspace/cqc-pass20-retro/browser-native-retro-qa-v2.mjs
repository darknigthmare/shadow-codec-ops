import {readFile,writeFile}from'node:fs/promises';
import {connect}from'./cdp9272.mjs';
const ROOT='/workspace/cqc-pass20-retro';
const client=await connect(),page=await client.page('http://127.0.0.1:8029/cqc/modules/unified-versus-v055.html');
await page.send('Emulation.setDeviceMetricsOverride',{width:850,height:1320,deviceScaleFactor:1,mobile:false});
try{
 for(let i=0;i<60;i++){const ready=await page.evaluate('!!globalThis.CQC_PASS20_NATIVE_RETRO_REGISTRATION');if(ready)break;await new Promise(resolve=>setTimeout(resolve,250));}
 const prelim=await page.evaluate(`JSON.stringify({registration:globalThis.CQC_PASS20_NATIVE_RETRO_REGISTRATION,entries:['core__meryl_mgs1','core__solid','core__raiden_mgs4','core__venom'].map(uid=>({uid,option:CQC_PASS19_COSTUMES.optionFor(uid,'retro-msx')?.id}))})`);
 if(JSON.parse(prelim).registration?.accepted!==4)throw Error('Integrated native retro registration missing '+prelim);
 const report=await page.evaluate(`(async()=>{
  const uids=['core__meryl_mgs1','core__solid','core__raiden_mgs4','core__venom'];
  const load=await Promise.all(uids.map(uid=>CQC_PASS19_COSTUMES.whenReady({uid,costume:'retro-msx'})));
  if(!load.every(Boolean))throw Error('Native decode not ready');
  const records=[];
  for(const uid of uids){
   const fighter={uid,costume:'retro-msx'},entry=CQC_COMBAT_SPRITES.getEntry(uid,fighter),unique=new Map();
   const canvas=document.createElement('canvas');canvas.width=800;canvas.height=1280;canvas.id='native-review-'+uid;
   const context=canvas.getContext('2d');context.fillStyle='#1b292d';context.fillRect(0,0,800,1280);
   const draws=[],selected=[];let cell=0;
   const originalMap=entry.actionMap;
   // Review invokes the real renderer with exact registered art and source
   // contours. A transient, explicitly qualified selector visits every native
   // action; it does not claim that gameplay has every action as a separate move.
   try{
    entry.actionMap={...originalMap};
    for(const face of [1,-1]){
     const actions=face===1?entry.actions:entry.oppositeActions;
     const physical=new Map();
     for(const[name,action]of Object.entries(actions))for(let index=0;index<action.frames.length;index++){
      const frame=action.frames[index],key=frame.file+'#'+frame.rect.join(',');
      if(!physical.has(key))physical.set(key,{name,index,action,frame});
     }
     for(const{ name,index,action,frame }of physical.values()){
      const cx=cell%4,cy=Math.floor(cell/4),x=cx*200,y=cy*160;
      context.fillStyle=(cx+cy)%2?'#25373a':'#304449';context.fillRect(x+1,y+1,198,158);
      entry.actionMap.nativePoseReview=name;
      const pose={moveSlot:'nativePoseReview',animationActive:true,actionTime:action.fps?index/action.fps+.001:0,entityKey:'native-review:'+uid+':'+face+':'+cell};
      const directional=face===1?entry:{...entry,actions:entry.oppositeActions};
      const choice=CQC_COMBAT_SPRITES.selectFrame(directional,pose);
      if(choice.frame!==frame)throw Error('Wrong source pose '+uid+':'+name+':'+index);
      const nativeDraw=context.drawImage.bind(context),capture=[];
      context.drawImage=(...args)=>{capture.push({source:args[0].src,rect:args.slice(1,5),smoothing:context.imageSmoothingEnabled});return nativeDraw(...args)};
      const drawn=CQC_COMBAT_SPRITES.draw(context,fighter,x+100,y+145,face,.45,pose);
      context.drawImage=nativeDraw;
      if(!drawn||capture.length!==1||capture[0].smoothing!==false)throw Error('Missing native pixel draw '+uid+':'+cell);
      context.fillStyle='#d8e5dc';context.font='11px monospace';context.fillText((face===1?'R':'L')+' '+name+' '+index,x+6,y+14);
      const pixels=context.getImageData(x+2,y+20,196,134).data;
      const rgbaAlphaCount=Array.from(pixels).filter((_,i)=>i%4===3&&pixels[i]>0).length;
      selected.push({face,name,index,file:frame.file,rect:frame.rect,pivot:frame.pivot,sourceStandingHeight:entry.sourceFrameHeights[frame.file],nativeDraw:drawn,imageSmoothingEnabled:capture[0].smoothing,physicalPixelReadCount:rgbaAlphaCount});
      unique.set(frame.file+'#'+frame.rect.join(','),true);cell++;
     }
    }
   }finally{entry.actionMap=originalMap;}
   const prev={};for(const face of [1,-1])prev[face]=CQC_COMBAT_SPRITES.previewGeometry(fighter,{x:0,y:0,width:250,height:390},face);
   records.push({uid,nativePNGReady:true,renderStyle:entry.renderStyle,displayHeight:entry.displayHeight,physicalMappedFrames:unique.size,nativeDraws:selected.length,selected,previewGeometry:prev,png:canvas.toDataURL('image/png')});
  }
  return{schema:'cqc.pass20.native-retro-actual-renderer-browser/1',status:'passed-native-draws; root-game-match-check-separate',registration:CQC_PASS20_NATIVE_RETRO_REGISTRATION,retainedUserCostumeSelectionChanged:false,allNativePNGReady:load.every(Boolean),physicalMappedFrames:records.reduce((n,r)=>n+r.physicalMappedFrames,0),nativeDraws:records.reduce((n,r)=>n+r.nativeDraws,0),qualification:'Every mapped native pose passed the actual browser renderer with registered immutable PNGs, actual source contours and smoothing disabled. A temporary in-memory review action selector was restored; this check is not a claim that every action is reachable as an independent gameplay move. Full match check is separate.',records};
 })()`);
 for(const r of report.records){const filename=ROOT+'/'+r.uid+'-retro-msx-all-mapped-poses-v2.png';await writeFile(filename,Buffer.from(r.png.split(',')[1],'base64'));delete r.png;r.contactSheet=filename;}
 report.exceptions=client.events.filter(event=>event.method==='Runtime.exceptionThrown');
 report.failedRequests=client.events.filter(event=>event.method==='Network.loadingFailed');
 const out=ROOT+'/NATIVE_RETRO_ACTUAL_RENDERER_BROWSER_QA_V2.json';await writeFile(out,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({status:report.status,physicalMappedFrames:report.physicalMappedFrames,nativeDraws:report.nativeDraws,exceptions:report.exceptions.length,failedRequests:report.failedRequests.length,path:out}));
}finally{await page.close();await client.send('Browser.close');client.close();}
