/* Native source aliases only; append before bridge captures the catalog. No new source PNG or invented extraction. */
(function(root){'use strict';const old=root.CQC_PASS18_VFX_CATALOG;if(!old?.effects?.['chaff-cloud']||!old.effects['launcher-grenade']||!old.effects['detached-debris'])throw Error('Native PASS18 VFX sources absent');const aliases={
 'smoke-cloud':['chaff-cloud','Cloud opacity/smoke cover presentation adapted from reviewed native haze; not exact source-game smoke animation.'],
 'smoke-shell':['launcher-grenade','PW smoke ammunition represented by reviewed launcher-shell geometry; exact ammunition paint/rotation is not certified.'],
 'stun-shell':['launcher-grenade','PW nonlethal ammunition uses the reviewed launcher-shell family; drowsy mechanics are authored CQC rules.'],
 'crystal-grenade':['detached-debris','Survive crystal mortar fragment is represented by reviewed shard/debris geometry; exact crystal projectile artwork remains unsupported.']
 };const effects={...old.effects};for(const[id,[source,scope]]of Object.entries(aliases))effects[id]={...old.effects[source],id,sourceEffectID:source,scope,absolute1to1Certified:false};root.CQC_PASS18_VFX_CATALOG={...old,effects,fxTags:{...old.fxTags,smoke:'smoke-cloud'},counts:{...old.counts,effects:Object.keys(effects).length,nativeSourceFrames:old.counts.nativeSourceFrames,nativeAtlases:old.counts.nativeAtlases},pass19NativeAliases:{schema:'cqc.native-vfx-aliases/1',sourcePixelsChanged:false,newPNGCount:0,aliases}};
})(globalThis);
