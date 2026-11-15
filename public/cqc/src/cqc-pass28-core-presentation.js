/* Core machine geometry shared by presentation, targets and projectile bounds.
 * Source alpha and published dimensions are independent of decode timing/camera.
 * This pure adapter never writes the match, HP, locks, saves or simulation clocks.
 */
(function (root) {
  'use strict';
  const HERO = Object.freeze({heightM: 1.8, heightWorld: 222,
    qualification: 'Existing Core standing human presentation reference, not a new canonical character height'});
  const TARGETS = Object.freeze({
    mgd: {near: {part: 'near_foot'}, far: {part: 'far_foot'}},
    pupa: {pod: {part: 'ai_pod'}, hull: {part: 'front_hood'}},
    chrysalis: {pod: {part: 'ai_pod'}, hull: {part: 'hull'}, radar: {part: 'radar_dish'}},
    cocoon: {pod: {part: 'ai_pod'}, hull: {part: 'main_hull'}, radar: {part: 'main_cannon_turret'}},
    peace_walker: {pod: {part: 'mammal_head'}, hull: {part: 'hull'}, radar: {part: 'front_near_shin'}}
  });
  const WEAPONS = Object.freeze({
    mgd: {gun: {part: 'three_tube_barrels_native', sourceNativeXY: [649,453]}},
    cocoon: {cannon: {part: 'main_cannon_barrel', sourceNativeXY: [1216,397]}}
  });
  const neutralCache = new WeakMap();
  const encounterCameras = new WeakMap();
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  function geometry(state, machine, parts, options={}) {
    if (!state?.boss || !machine || !parts?.corePose || !root.CQC_PASS28_MACHINE_GEOMETRY) return null;
    let neutral = neutralCache.get(machine);
    if (!neutral) {
      neutral = root.CQC_PASS28_MACHINE_GEOMETRY.bounds(machine, parts,
        {origin: [0,0], channels: {}, flags: {}, reducedMotion: true});
      if (!neutral) return null;
      neutralCache.set(machine, neutral);
    }
    const boss = state.boss, dimension = root.CQC_PASS28_RIG_SETUP?.dimension(machine.id);
    const scale = finite(dimension?.heightM) && dimension.heightM > 0
      ? dimension.heightM * HERO.heightWorld / HERO.heightM / neutral.height : 1;
    // D keeps its admitted stance origin: both source feet remain reachable with
    // the original timed ground grenades. AI fortresses keep their front edge
    // outside the fighting lane instead of expanding a hull through the hero.
    const frontAligned = Object.hasOwn(TARGETS, boss.id) && boss.id !== 'mgd';
    const x = finite(boss.x) ? boss.x : 1120, y = finite(boss.y) ? boss.y : 0;
    const tx = frontAligned ? x - 228 - neutral.left * scale : x;
    const ty = -y - neutral.bottom * scale;
    let raw = parts.corePose(state, {id: machine.id, origin: [0,0], reducedMotion: options.reducedMotion===true});
    if (!raw) return null;
    const motion=boss.nativeMotion,dead=boss.defeated===true||boss.health<=0;
    if(motion&&motion.frame===state.frame&&[motion.worldX,motion.worldY,motion.deltaX,motion.deltaY].every(finite)
      &&Math.abs(motion.worldX-x)<1e-8&&Math.abs(motion.worldY-y)<1e-8){
      const moving=!dead&&Math.abs(motion.deltaX)>1e-8;
      raw={...raw,action:dead?'dead':moving?'walk':boss.attack?'attack':'idle',walk:moving,defeated:dead,
        machineMotion:{travelX:tx/scale,direction:1,velocityX:motion.deltaX/scale,
          worldX:tx,nativeWorldScale:scale,source:'engine-core-pw-world-basis'}};
    }
    const attack=boss.attack,hero=state.fighters?.[0],gun=boss.id==='mgd'&&attack?.kind==='gun',cannon=boss.id==='cocoon'&&attack?.kind==='cannon';
    const aimEvent=hero&&(gun||cannon)?{kind:gun?'gun':'beam',sources:[],age:attack.t,warn:attack.windup,active:attack.active,recovery:attack.recovery,aimTarget:cannon&&attack.aim?[attack.aim.x,-attack.aim.y]:[hero.x,-(gun?174:hero.y+(hero.crouch?65:150))]}:null;
    const pose=aimEvent&&root.CQC_PASS18_MACHINES?.mechanicalAimPose
      ? root.CQC_PASS18_MACHINES.mechanicalAimPose(machine.id,raw,state,[scale,0,0,scale,tx,ty],aimEvent)
      : root.CQC_PASS28_RIG_SETUP?.presentationPose(machine.id,raw,state)||raw;
    const left = tx + neutral.left * scale, right = tx + neutral.right * scale;
    const top = ty + neutral.top * scale, bottom = ty + neutral.bottom * scale;
    return {schema: 'cqc.pass28.core-world-geometry/1', id: machine.id, encounter: boss.id,
      scale, tx, ty, basis: [scale,0,0,scale,tx,ty], nativePose: pose,
      neutralBounds: {...neutral}, worldBounds: {left, right, top, bottom,
        width: right-left, height: bottom-top},
      dimension: dimension ? {...dimension} : null, humanReference: {...HERO},
      qualification: dimension?.evidence || 'Source projection retained; canonical metric size unknown',
      heightWorld: neutral.height * scale, absolute1to1Certified: false};
  }
  function target(state, machine, parts, key, prepared = null) {
    const descriptor = TARGETS[state?.boss?.id]?.[key];
    if (!descriptor) return null;
    const value = prepared || geometry(state, machine, parts);
    if (!value) return null;
    const native = root.CQC_PASS28_MACHINE_GEOMETRY.sourcePoint(machine, parts,
      value.nativePose, descriptor);
    if (!native) return null;
    return {key, x: value.tx + native.x * value.scale,
      y: -(value.ty + native.y * value.scale), r: Math.max(12, native.localRadius * value.scale),
      part: native.part, sourceNativeXY: native.nativeXY.slice(),
      alphaMeasured: native.alphaMeasured, nativeGeometry: true};
  }
  function weapon(state, machine, parts, key, prepared=null) {
    const descriptor = WEAPONS[state?.boss?.id]?.[key], value = prepared||geometry(state,machine,parts);
    if (!descriptor || !value) return null;
    const vector=root.CQC_PASS18_MACHINES?.mechanicalWeaponVector?.(machine.id,value.nativePose,value.basis,{kind:key==='gun'?'gun':'beam'});
    if(vector)return {...vector,y:-vector.y,base:{x:vector.base.x,y:-vector.base.y},tip:{x:vector.tip.x,y:-vector.tip.y},angle:-vector.angle,sourceNativeXY:vector.axisNative.tipNativeXY.slice(),nativeGeometry:true,qualification:'Admitted native weapon axis shared with rendered mechanical pose'};
    const native = root.CQC_PASS28_MACHINE_GEOMETRY.sourcePoint(machine,parts,value.nativePose,descriptor);
    return native ? {x: value.tx+native.x*value.scale, y: -(value.ty+native.y*value.scale),
      part: native.part, sourceNativeXY: native.nativeXY.slice(),
      qualification: 'Physically inspected muzzle in unchanged native part source'} : null;
  }
  function camera(state, prepared, options = {}) {
    if (!prepared) return null;
    const groundY = finite(options.groundY) ? options.groundY : 598;
    const topY = finite(options.topY) ? options.topY : 195;
    const width = finite(options.width) ? options.width : 1280;
    // Capture the full playable lane and neutral machine once per encounter.
    // Player travel/jumps, recoil and real machine motion never pan or zoom it.
    // ARENA min/max are 90/1510; the retained human envelope adds 90 per side.
    const key = [groundY, topY, width].join('/');
    let owner = encounterCameras.get(state);
    if (!owner || owner.boss !== state.boss || owner.encounter !== prepared.encounter) {
      owner = {boss: state.boss, encounter: prepared.encounter, views: new Map()};
      encounterCameras.set(state, owner);
    }
    let view = owner.views.get(key);
    if (!view) {
      const b = prepared.worldBounds;
      const left = Math.min(0, b.left - 55), right = Math.max(1600, b.right + 55);
      const high = Math.max(-b.top + 45, 700);
      const zoom = Math.min(1, (width - 90) / (right-left), (groundY-topY) / high);
      view = Object.freeze({x: (left+right)/2, zoom, screenX: width/2, groundY,
        worldFrame: Object.freeze({left, right, high}), cameraPolicy: 'fixed-encounter-world',
        qualification: prepared.qualification});
      owner.views.set(key, view);
    }
    return {...view, worldFrame: {...view.worldFrame}};
  }
  function flightBounds(state, prepared) {
    if (!prepared) return {left: -70, right: 1650, top: 830, bottom: 0};
    // Remove the former low render-sized ceiling, preserving rocket speed, fuse,
    // lifetime and lock rules. A 24.3m fortress has native targets above 830px.
    return {left: Math.min(-70, prepared.worldBounds.left - 100),
      right: Math.max(1650, prepared.worldBounds.right + 100),
      top: Math.max(830, -prepared.worldBounds.top + 100), bottom: 0};
  }
  function travelScale(from, to, legacyFrom) {
    // Keep the authored flight duration and lifetime when the source point is
    // moved to its full-size machine: distance scales velocity, never its clock.
    const oldDistance = Math.hypot(to.x-legacyFrom.x, to.y-legacyFrom.y);
    const distance = Math.hypot(to.x-from.x, to.y-from.y);
    return oldDistance > .001 && finite(distance) ? distance/oldDistance : 1;
  }
  function drawHuman(context, actor, time, state, hooks = {}) {
    const heroID = state?.boss?.id === 'mgd' ? 'snake_mg2'
      : Object.hasOwn(TARGETS, state?.boss?.id || '') ? 'snake_pw' : null;
    if (!heroID || actor?.id !== heroID || hooks.manualImported?.(actor.id)) return false;
    const loader = root.CQC_COMBAT_SPRITES, fighter = {uid: 'core__'+actor.id,
      costume: actor.costume || 'original'}, entry = loader?.getEntry?.(fighter.uid, fighter);
    if (!entry || !loader?.previewGeometry || !loader?.draw) return false;
    const face = actor.facing === -1 ? -1 : 1;
    const g = loader.previewGeometry(fighter, {x:0,y:0,width:500,height:500,padding:0}, face);
    if (!g || !finite(g.standingHeight) || g.standingHeight <= 0) return false;
    const record = root.CQC_PASS19_WORLD_SCALE?.height?.(fighter);
    const metres = finite(record?.metres) && record.evidence !== 'estimated-from-preserved-display-framing'
      ? record.metres : HERO.heightM;
    const targetHeight = metres * HERO.heightWorld / HERO.heightM;
    const scale = targetHeight * g.scale / g.standingHeight, relative = scale/g.scale;
    const pose = {...(root.CQC_PASS16_CORE_SPRITES?.poseFor?.(actor,time,state,hooks) || {time})};
    pose.worldScaleApplied = true;
    context.save();
    try {
      if (actor.cloak > 0) context.globalAlpha *= .42;
      return loader.draw(context, fighter, (g.x-g.bodyX)*relative,
        (g.y-g.floor)*relative, face, scale, pose);
    } finally { context.restore(); }
  }
  root.CQC_PASS28_CORE_PRESENTATION = Object.freeze({geometry, target, weapon, camera, flightBounds,
    travelScale, drawHuman, targets: TARGETS, weapons: WEAPONS, humanReference: HERO, stateMutation: false});
})(globalThis);
