import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const O = path.dirname(fileURLToPath(import.meta.url));
const R = '/workspace/cqc-game-working/cqc-versus-v056';
const S = '/workspace/shadow-codec-recovered/public/cqc';
const engine = require(path.join(R,'src/cqc-stage-layers.js'));
const study = require(path.join(O,'luminance-study.js'));
const read = p => JSON.parse(fs.readFileSync(p,'utf8'));
const catalog = read(path.join(R,'data/stage-layer-catalog-reprise.json'));
const configs = read(path.join(O,'PROTOTYPE_CONFIG.json')).stages;
const checks = [];
function check(name, passed, evidence) { checks.push({name,passed:!!passed,evidence}); }
function digest(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
for (const stage of catalog.stages) check('current_stage_validator/'+stage.id,engine.validateStage(stage).length===0,engine.validateStage(stage));
for (const [label, file] of [['R',path.join(R,'src/cqc-stage-layer-data.js')],['S',path.join(S,'src/cqc-stage-layer-data.js')]]) {
  const context = {window:{}}; vm.runInNewContext(fs.readFileSync(file,'utf8'),context);
  check('runtime_catalog_matches_authoring/'+label,JSON.stringify(context.window.CQC_STAGE_LAYER_DATA)===JSON.stringify(catalog),{source:file});
}
let sourceImageLoads = 0;
class FakeImage {
  set src(value) {
    this.source = value;
    if (!value) return;
    const bytes = fs.readFileSync(value); sourceImageLoads++;
    this.naturalWidth = bytes.readUInt32BE(16); this.naturalHeight = bytes.readUInt32BE(20);
    queueMicrotask(()=>this.onload?.());
  }
  get src() { return this.source; }
}
function context() {
  const trace = [], states = [];
  const ctx = {trace,save(){states.push({globalAlpha:this.globalAlpha,globalCompositeOperation:this.globalCompositeOperation});trace.push(['save']);},
    restore(){Object.assign(this,states.pop());trace.push(['restore']);},
    translate(x,y){trace.push(['translate',x,y]);},scale(x,y){trace.push(['scale',x,y]);},
    fillRect(...args){trace.push(['fillRect',...args]);},
    drawImage(image,...args){trace.push(['drawImage',image.src||image.id||'mask',...args,this.globalAlpha]);},
    globalAlpha:1,globalCompositeOperation:'source-over'};
  return ctx;
}
const renderer = engine.createRenderer(catalog,{Image:FakeImage,baseURL:R+'/',reducedMotion:()=>false});
const viewpoints = [
  {label:'central',camera:0,zoom:1,viewport:[1280,720]},
  {label:'left_wide',camera:-220,zoom:.78,viewport:[1280,720]},
  {label:'right_wide',camera:220,zoom:.78,viewport:[1280,720]},
  {label:'left_close',camera:-220,zoom:1.08,viewport:[1280,720]},
  {label:'right_close',camera:220,zoom:1.08,viewport:[1280,720]},
  {label:'desktop_logical_canvas',camera:0,zoom:1,viewport:[1024,768]},
  {label:'mobile_logical_canvas',camera:0,zoom:1,viewport:[390,844]}
];
const projections=[];
for (const config of configs) {
  await renderer.preload(config.id);
  check('renderer_ready/'+config.id,renderer.status(config.id).state==='ready',renderer.status(config.id));
  for (const view of viewpoints) {
    const traces=[];
    for (const time of [0,2,9]) {
      const ctx=context(),opts={...view,time,motion:true,preview:false};
      const bg=renderer.drawBackground(ctx,config.id,opts),fg=renderer.drawForeground(ctx,config.id,opts);
      if (!bg||!fg) throw Error('Actual renderer phase rejected for '+config.id);
      traces.push(JSON.stringify(ctx.trace));
    }
    check('actual_camera_only_fixed_time_trace/'+config.id+'/'+view.label,
      traces.every(x=>x===traces[0]),{times:[0,2,9],traceSha256:digest(traces[0]),camera:view.camera,zoom:view.zoom,
        method:'Actual renderer + actual PNG dimensions; drawing-command comparison, not a browser raster observation.'});
    const transform=engine.layerTransform({parallax:config.parallax},view);
    projections.push({id:config.id,...view,regions:config.sourcePixelRegions.map((region,index)=>{
      const world=study.nativeToWorld(config,region);
      const screen={x:transform.x+world.x*transform.scale,y:transform.y+world.y*transform.scale,
        width:world.width*transform.scale,height:world.height*transform.scale};
      return {index,native:region,world,screen,intersectsLogicalCanvas:screen.x+screen.width>0&&screen.x<1280&&screen.y+screen.height>0&&screen.y<720};
    })});
  }
  for (let index=0;index<config.sourcePixelRegions.length;index++) {
    const period=config.authoredPeriodSeconds[index];
    const values=Array.from({length:801},(_,i)=>study.dimming(config,index,period*i/400));
    check('bounded_authored_dimming/'+config.id+'/'+index,
      values.every(v=>v>=0&&v<=config.maximumDimmingFraction+1e-12)&&values[0]===0,
      {min:Math.min(...values),max:Math.max(...values),periodSeconds:period,canonicalTiming:false});
  }
  const masks=config.sourcePixelRegions.map((region,index)=>({canvas:{id:'mask'+index},world:study.nativeToWorld(config,region)}));
  for(const [label,options] of [['disabled',{enabled:false}],['normalized_animate_off',{enabled:true,animate:false}],['motion_off',{enabled:true,motion:false}],['reduced_motion',{enabled:true,reducedMotion:true}]]){
    const ctx=context();const result=study.paint(ctx,config,masks,engine.layerTransform,{...options,time:2,camera:220,zoom:1.08});
    check('prototype_zero_draw/'+config.id+'/'+label,result===0&&ctx.trace.length===0,{returnedDraws:result,traceLength:ctx.trace.length});
  }
  const ctx=context();
  const drawn=study.paint(ctx,config,masks,engine.layerTransform,{enabled:true,reducedMotion:false,time:2,camera:-220,zoom:.78});
  check('prototype_local_draws/'+config.id,drawn===4&&ctx.trace.filter(x=>x[0]==='drawImage').length===4,
    {draws:drawn,restoredAlpha:ctx.globalAlpha,restoredCompositeOperation:ctx.globalCompositeOperation});
}
for(const patch of read(path.join(O,'NATIVE_PATCH_PIXEL_SAMPLES.json')).patches){
  const config=configs.find(x=>x.id===patch.id);
  const count=patch.rgba.filter(pixel=>study.selected(...pixel,config.maskColor)).length;
  check('js_mask_matches_native_read/'+patch.id+'/'+patch.index,
    count===config.nativeMaskAnalysis[patch.index].selectedColoredPixels&&count>0,
    {selectedPixels:count,rectanglePixels:patch.rgba.length,sourceSha256:patch.sourceSha256});
}
const before=read(path.join(O,'SOURCE_INPUTS_BEFORE.json'));
const after=before.inputs.map(row=>({...row,actualBytes:fs.statSync(row.path).size,actualSha256:digest(fs.readFileSync(row.path))}));
for(const row of after)check('input_stable/'+row.role,row.bytes===row.actualBytes&&row.sha256===row.actualSha256,{path:row.path,sha256:row.actualSha256});
const failed=checks.filter(x=>!x.passed);
const report={schema:'cqc.isolated-stage-study-verification/1',createdAt:new Date().toISOString(),
  status:failed.length?'failed':'passed',assertions:checks.length,failed:failed.length,
  scope:'Read-only original renderer trace + native mask samples + analytical geometry. No browser raster verification.',
  productionWrites:false,pngRasterFilesWritten:0,sourceImageLoads,browserVerified:false,
  checks,projections,inputPinsBeforeAfter:after};
const out=path.join(O,process.argv[2]||'ANALYTICAL_VERIFICATION.json');
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({status:report.status,assertions:report.assertions,failed:report.failed,sourceImageLoads,output:out}));
if(failed.length)process.exitCode=1;
