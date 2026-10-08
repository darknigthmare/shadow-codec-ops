/* Verified combat PNGs, decoded readiness and uniformly fitted native previews. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CQC_COMBAT_SPRITES = api;
  if (root.CQC_COMBAT_SPRITE_CATALOG) api.configure(root.CQC_COMBAT_SPRITE_CATALOG);
  if (root.CQC_COMBAT_COSTUME_CATALOG) api.configureCostumes(root.CQC_COMBAT_COSTUME_CATALOG);
})(globalThis, function (root) {
  'use strict';
  const entries = new Map(), images = new Map(), clocks = new Map(), entryFiles = new Map();
  const costumeEntries = new Map(), costumeFiles = new WeakMap();
  const retainedFiles = new Set();
  const decodedByteLimit = 256 * 1024 * 1024, readyImageLimit = 40, clockLimit = 512;
  let imageUse = 0, activeImageLoads = 0;
  const imageLoadLimit = 4, imageQueue = [];
  // Capture while this script executes: later album/iframe configuration has no currentScript.
  const ownScriptURL = root.document?.currentScript?.src || null;
  const checks = ['identity', 'costume', 'equipment', 'anatomicalSides', 'singleFigure', 'transparentBackground'];
  const actions = ['idle', 'guard', 'walk', 'crouch', 'attack', 'hit', 'ko', 'punch', 'low', 'throw', 'deploy', 'shoot', 'reload', 'optic', 'recover', 'blade', 'roll', 'heavy', 'charge', 'parry', 'jump'];
  let baseURL = null;
  const knownRosterUIDs = new Set(["archive__arcade_operator","archive__big_mama","archive__captain","archive__carter_survive","archive__chaigidiel","archive__chico_pw","archive__chris_survive","archive__coldman","archive__crying_beauty","archive__dan_survive","archive__dd_mgo3","archive__ddog","archive__decoy","archive__dhorse","archive__drebin","archive__dwalker","archive__eli","archive__elisa","archive__fox_plus","archive__genome_mgo1","archive__golab","archive__goodluck","archive__gray_fox_mg1","archive__gustava_heffner","archive__harab","archive__haven_trooper","archive__holly_white","archive__ishmael","archive__jennifer_sr","archive__johnny_mgs1","archive__koppelthorn","archive__laughing_beauty","archive__lucy_acid2","archive__man_on_fire","archive__miranda_survive","archive__naked_delta","archive__nicholas_survive","archive__old_snake_touch","archive__paz","archive__pmc_mgo2","archive__raging_beauty","archive__raiden_rising_proto","archive__raiden_vr","archive__reeve","archive__scott_dolph","archive__screaming_beauty","archive__sergei_gurlukovich","archive__seth","archive__skowronski_mpo","archive__skull_face","archive__snake_acid_mobile","archive__snake_mobile","archive__snake_nes","archive__snake_tts","archive__snake_vr","archive__social_agent","archive__tretij","archive__venus_acid2_mobile","archive__vince","archive__virgil_at9","archive__walker_gear","archive__weasel_gb","archive__zadornov","completion44__armored_wanderer_44","completion44__black_chamber_soldier_44","completion44__diamond_dogs_scout_44","completion44__fox_trooper_mpo_44","completion44__genome_soldier_44","completion44__gru_heavy_44","completion44__gurlukovich_merc_44","completion44__msf_soldier_44","completion44__navy_seal_44","completion44__ocelot_unit_soldier_44","completion44__parasite_camo_44","completion44__pieuvre_armement_pmc_44","completion44__praying_mantis_pmc_44","completion44__raven_sword_pmc_44","completion44__saintlogic_guard_44","completion44__tengu_soldier_44","completion44__wanderer_bomber_44","completion44__werewolf_pmc_44","completion44__xof_trooper_44","completion44__zanzibar_mercenary_44","completion__augustine_eguabon","completion__big_boss_epilogue","completion__dalton_acid2","completion__dwarf_gekko_mgs4","completion__eva_mpo","completion__flemming_acid","completion__gary_murray","completion__gekko_mgs4","completion__little_gray_mgs4","completion__mk2_mgs4","completion__mk3_mgs4","completion__ocelot_mpo","completion__raikov_mpo","completion__ronald_lensen","completion__sophie_ndram","completion__wiseman_acid2","core__amanda_pw","core__armstrong","core__bigboss_mg1","core__bigboss_mg2","core__bigboss_sr","core__blade_wolf","core__bloody_brad","core__boss","core__campbell_mpo","core__chris_jenner","core__clown","core__crying_wolf","core__cunningham","core__dirtyduck","core__ed_mgs4","core__end","core__eva_mgs3","core__fatman","core__fear","core__firetrooper","core__fortune","core__fox","core__fox_mg2","core__fury","core__gene","core__hawk","core__john_sr","core__johnny_mgs4","core__jonathan_mgs4","core__jonathan_mpo","core__jungle_evil","core__kaz_pw","core__khamsin","core__laughing_octopus","core__leone","core__liquid","core__liquid_ocelot","core__machinegun_kid","core__mantis","core__meryl_mgs1","core__meryl_mgs4","core__mistral","core__monsoon","core__nick_sr","core__night_fright","core__ninja_mg2","core__null_mpo","core__ocelot","core__ocelot_mgs1","core__ocelot_mgs2","core__ocelot_mgsv","core__old_snake","core__olga_mgs2","core__olga_ninja","core__owl","core__pain","core__pyro","core__python_mpo","core__quiet","core__raging_raven","core__raiden","core__raiden_mgs2","core__raiden_mgs4","core__raikov_mgs3","core__raven","core__redblaster_mg2","core__runner_mg2","core__sam","core__screaming_mantis","core__shotmaker","core__skull_armor","core__skull_mist","core__skull_sniper","core__snake","core__snake_acid","core__snake_acid2","core__snake_gb","core__snake_gz","core__snake_mg1","core__snake_mg2","core__snake_mgs2","core__snake_mpo","core__snake_pw","core__snake_sr","core__solid","core__solidus","core__sundowner","core__teliko","core__vamp","core__vamp_mgs4","core__venom","core__venus","core__viper","core__volgin","core__wolf","npc53__adam_mgs3","npc53__adam_prototype_mgs4","npc53__al_ai_mgs4","npc53__arthropod_pod_pw","npc53__avian_pod_pw","npc53__bb_acid2","npc53__boss_horse_mgs3","npc53__carlos_esmeralda_mgs1","npc53__chico_gz","npc53__chloe_dubois_survive","npc53__consuela_acid2","npc53__daniel_quinn_mgs2","npc53__dave_copeland_acid2","npc53__dead_cell_mystic_mgs2","npc53__delgado_acid2","npc53__doc_wilson_mgs2","npc53__dr_clark_mgs1","npc53__elsie_frances_acid","npc53__end_parrot_mgs3","npc53__enrique_survive","npc53__escobar_acid2","npc53__glaz_gz","npc53__gw_ai_mgs4","npc53__hans_davis_acid","npc53__jd_ai_mgs4","npc53__jeff_jones_acid","npc53__joseph_gruen_survive","npc53__kaz_gz","npc53__lena_arrow_acid","npc53__lucinda_acid2","npc53__malak_tpp","npc53__mammal_pod_pw","npc53__max_wark_mgs2","npc53__minette_acid","npc53__morpho_gz","npc53__mosquito_tpp","npc53__msf_medic_gz","npc53__old_boy_mgs2","npc53__old_snake_mpo_plus","npc53__palitz_gz","npc53__paramedic_mpo","npc53__paz_gz","npc53__paz_phantom_tpp","npc53__raiden_mpo_plus","npc53__reptile_pod_pw","npc53__roddy_louiz_acid2","npc53__rodzinski_acid2","npc53__schmeiser_acid","npc53__shabani_tpp","npc53__sigint_mpo","npc53__skull_face_gz","npc53__sokolov_mpo","npc53__tatyana_mgs3","npc53__teliko_mpo","npc53__tj_ai_mgs4","npc53__tr_ai_mgs4","npc53__venus_mpo","npc53__victoria_reed_mobile","npc53__viggo_hach_acid","npc53__viscount_tpp","npc53__vr_otacon_mobile","npc53__zero_2014_mgs4","npc53__zero_cipher_tpp","npc53__zero_mpo","oc__parallaxe","roster50__alice_acid","roster50__ames_mgs2","roster50__anderson_mgs1","roster50__baker_mgs1","roster50__boris_mgr","roster50__campbell_gb","roster50__campbell_mg2","roster50__campbell_mgs1","roster50__campbell_mgs4","roster50__cecile_pw","roster50__codetalker_mgsv","roster50__colonel_ai_mgs2","roster50__commander_mobile","roster50__courtney_mgr","roster50__diane_mg1","roster50__doktor_mgr","roster50__ellen_mg1","roster50__emma_mgs2","roster50__four_horsemen_mg2","roster50__george_mgr","roster50__granin_mgs3","roster50__harks_gb","roster50__houseman_mgs1","roster50__huey_mgsv","roster50__huey_pw","roster50__jacobsen_mg2","roster50__jennifer_mg1","roster50__johnny_sr_mgs3","roster50__johnson_mgs2","roster50__kasler_mg2","roster50__kaz_mgsv","roster50__kevin_mgr","roster50__madnar_mg1","roster50__madnar_mg2","roster50__marv_mg2","roster50__mcbride_gb","roster50__mccoy_acid","roster50__mei_mgs1","roster50__meiling_gb","roster50__meiling_mgs4","roster50__miller_mg2","roster50__naomi_mgs1","roster50__naomi_mgs4","roster50__nastasha_mgs1","roster50__nmani_mgr","roster50__otacon_mgs1","roster50__otacon_mgs2","roster50__otacon_mgs4","roster50__otacon_mobile","roster50__paramedic_mgs3","roster50__rose_mgs2","roster50__rose_mgs4","roster50__schneider_mg1","roster50__sigint_mgs3","roster50__sokolov_mgs3","roster50__steve_mg1","roster50__stillman_mgs2","roster50__strangelove_pw","roster50__sunny_mgr","roster50__sunny_mgs4","roster50__takiyama_acid2","roster50__zero_mgs3","roster51__boss_delta","roster51__decoy_tts","roster51__dolzaev_mgr","roster51__end_delta","roster51__eva_delta","roster51__fear_delta","roster51__fury_delta","roster51__galvez_pw","roster51__general_gb","roster51__ghost_mpo","roster51__granin_delta","roster51__grayfox_tts","roster51__guy_savage_delta","roster51__johnny_delta","roster51__johnny_tts","roster51__liquid_tts","roster51__mantis_tts","roster51__meryl_tts","roster51__miller_mgs1","roster51__ocelot_delta","roster51__ocelot_tts","roster51__otacon_tts","roster51__pain_delta","roster51__paramedic_delta","roster51__pliskin_mgs2","roster51__raikov_delta","roster51__raven_tts","roster51__sigint_delta","roster51__sokolov_delta","roster51__sorrow_delta","roster51__sorrow_mgs3","roster51__volgin_delta","roster51__wolf_tts","roster51__zero_delta"]);
  const finite = (v) => Number.isFinite(v);
  const safeFile = (f) => typeof f === 'string' && /^[a-zA-Z0-9_./-]+\.png$/.test(f) && !f.split('/').some(p => p === '..' || p === '.') && !f.startsWith('/');
  function validateEntry(uid, entry, options = {}) {
    // These two authored groups belong only to the original MG1 android incarnation.
    const allowedActions = uid === 'core__bloody_brad' ? actions.concat(['brace', 'stomp']) : actions;
    if (!entry || entry.uid !== uid || typeof entry.name !== 'string' || typeof entry.game !== 'string' || typeof entry.incarnation !== 'string' || !entry.incarnation.trim()) return false;
    const review = entry.review;
    if (!review || review.status !== 'approved' || !review.reviewer || !review.reviewedAt || !Array.isArray(review.limits)) return false;
    if (!checks.every(k => review.checks && review.checks[k] === true)) return false;
    if (!['official-game-reference', 'original-game-capture', 'original-game-model', 'official-art-reference', 'original-character'].includes(review.sourceKind)) return false;
    if (review.sourceKind !== 'original-character' && (!Array.isArray(review.sources) || !review.sources.length || !review.sources.every(s => /^https:\/\//.test(s.url || '')))) return false;
    const concept=entry.costumeConcept;
    const originalCostume=options.costume===true && concept?.schema==='cqc.costume-design/1'
      && concept.sourceUID===uid && ['retro','nextgen','cyborg','survive','metalgear','tuxedo'].includes(concept.family)
      && concept.originalDesign===true && concept.canonicalAppearanceAttested===false;
    if (review.sourceKind === 'original-character' && !uid.startsWith('oc__') && !originalCostume) {
      const historicalOriginal=uid==='archive__carter_survive'
        && entry.referenceStatus==='historical-project-design-unattested-canon'
        && entry.historicalProjectSourceSHA256==='acaa14d4f52449727feef99bd14036fc2bb5da1306cae7d5410f2d3310b8f81d'
        && Array.isArray(review.sources) && review.sources.length>0
        && review.sources.every(source=>/^https:\/\//.test(source.url||''))
        && review.sources.some(source=>(source.url||'').startsWith('https://github.com/darknigthmare/shadow-codec-ops/'));
      const qualifiedReconstruction=uid!=='archive__carter_survive' && knownRosterUIDs.has(uid)
        && entry.referenceStatus==='unattested-body-presentation-reconstruction'
        && entry.presentationReconstruction===true
        && entry.canonicalBodyAppearanceAttested===false
        && Array.isArray(review.sources) && review.sources.length>0
        && review.sources.every(source=>/^https:\/\//.test(source.url||''));
      if(!historicalOriginal && !qualifiedReconstruction)return false;
    }
    if (!['static-pose', 'action-frames'].includes(entry.coverage) || !finite(entry.displayHeight) || entry.displayHeight <= 0 || ![1, -1].includes(entry.facing)) return false;
    if (entry.baseFrameHeight !== undefined && (!finite(entry.baseFrameHeight) || entry.baseFrameHeight <= 0)) return false;
    if (entry.sourceFrameHeights && (typeof entry.sourceFrameHeights !== 'object' || Object.entries(entry.sourceFrameHeights).some(([file, height]) => !safeFile(file) || !finite(height) || height <= 0))) return false;
    if (!entry.actions || !entry.actions.idle || Object.keys(entry.actions).some(k => !allowedActions.includes(k))) return false;
    if (entry.actionMap && (typeof entry.actionMap !== 'object' || Object.values(entry.actionMap).some(k => !allowedActions.includes(k)))) return false;
    if (entry.phaseMap && (typeof entry.phaseMap !== 'object' || Object.entries(entry.phaseMap).some(([name, phases]) => !allowedActions.includes(name) || !phases || Object.entries(phases).some(([phase, indices]) => !['startup', 'active', 'recovery'].includes(phase) || !Array.isArray(indices) || !indices.length || indices.some(i => !Number.isInteger(i) || i < 0 || i >= (entry.actions[name]?.frames.length || 0) || entry.oppositeActions && i >= (entry.oppositeActions[name]?.frames.length || 0)))))) return false;
    if (entry.oppositeActions && (!entry.oppositeActions.idle || Object.keys(entry.oppositeActions).some(k => !allowedActions.includes(k)))) return false;
    for (const action of [...Object.values(entry.actions), ...Object.values(entry.oppositeActions || {})]) {
      if (!Array.isArray(action.frames) || !action.frames.length || !finite(action.fps) || action.fps < 0 || typeof action.loop !== 'boolean') return false;
      if (action.frames.length > 1 && action.fps === 0) return false;
      for (const frame of action.frames) {
        if (!safeFile(frame.file) || !/^[a-f0-9]{64}$/.test(frame.sha256 || '') || !Array.isArray(frame.rect) || frame.rect.length !== 4 || !frame.rect.every(finite) || frame.rect[0] < 0 || frame.rect[1] < 0 || frame.rect[2] <= 0 || frame.rect[3] <= 0) return false;
        if (!Array.isArray(frame.pivot) || frame.pivot.length !== 2 || !frame.pivot.every(v => finite(v) && v >= 0 && v <= 1)) return false;
        if (frame.clipPolygon && (!Array.isArray(frame.clipPolygon) || frame.clipPolygon.length < 3 || !frame.clipPolygon.every(p => Array.isArray(p) && p.length === 2 && p.every(v => finite(v) && v >= 0 && v <= 1)))) return false;
      }
    }
    return true;
  }
  // Original costume concepts are user-authorized adaptations, separate from canonical base bodies.
  function validateCostumeEntry(uid,entry) {
    if(!validateEntry(uid,entry,{costume:true}))return false;
    if(entry.costumeParts && (!root.CQC_PASS19_COSTUME_PARTS?.validate || !root.CQC_PASS19_COSTUME_PARTS.validate(entry)))return false;
    if(entry.pixelArt && (!root.CQC_PASS19_PIXEL_STYLE?.validate || !root.CQC_PASS19_PIXEL_STYLE.validate(entry)))return false;
    return true;
  }
  function resolveBase(options) {
    if (options.baseURL) return options.baseURL;
    if (ownScriptURL) return new URL('../', ownScriptURL).href;
    if (root.document && root.document.baseURI) return new URL('../', root.document.baseURI).href;
    return 'http://localhost/';
  }
  function configure(catalog, options = {}) {
    entries.clear(); images.clear(); clocks.clear(); entryFiles.clear(); retainedFiles.clear(); baseURL = resolveBase(options);
    if (!catalog || catalog.schema !== 'cqc.combat-sprites/1' || !catalog.entries || typeof catalog.entries !== 'object') return { accepted: 0, rejected: [] };
    const rejected = [];
    for (const [uid, entry] of Object.entries(catalog.entries)) {
      if (validateEntry(uid, entry)) {
        entries.set(uid, entry);
        const files = new Map();
        for (const action of [...Object.values(entry.actions), ...Object.values(entry.oppositeActions || {})])
          for (const frame of action.frames) files.set(frame.file, frame);
        entryFiles.set(uid, [...files.values()]);
      } else rejected.push(uid);
    }
    return { accepted: entries.size, rejected };
  }
  // Costumes stay private to the renderer. Original catalogue entries and UIDs never change.
  function entryFor(uid, options = {}) {
    const costume = typeof options.costume === 'string' ? options.costume : 'original';
    return costume !== 'original' ? costumeEntries.get(uid)?.get(costume) || null : entries.get(uid);
  }
  function configureCostumes(catalog) {
    costumeEntries.clear();
    if (!catalog || catalog.schema !== 'cqc.combat-costumes/1' || !catalog.entries) return { accepted: 0, rejected: [] };
    let accepted = 0; const rejected = [];
    for (const [uid, record] of Object.entries(catalog.entries)) {
      if (!record || record.default !== 'original' || !Array.isArray(record.options)) { rejected.push(uid); continue; }
      const variants = new Map();
      for (const option of record.options) {
        if (option?.id === 'original') continue;
        if(option?.machinePresentation){if(!root.CQC_PASS19_MACHINE_PIXEL_STYLE?.validate(uid,option))rejected.push(uid+':'+option.id);continue;}
        if (!option || !/^[a-z0-9_-]+$/.test(option.id || '') || !validateCostumeEntry(uid, option.sprite) || !option.sprite.oppositeActions || option.sprite.mirror === true || variants.has(option.id)) { rejected.push(uid + ':' + (option?.id || '?')); continue; }
        const entry = option.sprite, files = new Map();
        for (const action of [...Object.values(entry.actions), ...Object.values(entry.oppositeActions)])
          for (const frame of action.frames) files.set(frame.file, frame);
        for(const source of root.CQC_PASS19_COSTUME_PARTS?.sources?.(entry)||[])files.set(source.file,source);
        costumeFiles.set(entry, [...files.values()]); variants.set(option.id, entry); accepted++;
      }
      if (variants.size) costumeEntries.set(uid, variants);
    }
    return { accepted, rejected };
  }
  function cacheInfo() {
    const ready = [...images.values()].filter(record => record.state === 'ready');
    const bytes = ready.reduce((sum, record) => sum + record.bytes, 0);
    return {readyImages:ready.length, decodedBytes:bytes, decodedByteLimit, readyImageLimit,
      retainedFiles:retainedFiles.size, animationClocks:clocks.size,
      activeImageLoads, queuedImages:imageQueue.length, imageLoadLimit,
      estimate:'Native decoded width × height × 4; active fighters may exceed the soft limit.'};
  }
  function trimImages(protectedRecord) {
    const ready = [...images.entries()].filter(([,record]) => record.state === 'ready');
    let bytes = ready.reduce((sum, [,record]) => sum + record.bytes, 0), count = ready.length;
    const victims = ready.filter(([file,record]) => !retainedFiles.has(file) && record !== protectedRecord)
      .sort((a,b) => a[1].lastUse - b[1].lastUse);
    for (const [file,record] of victims) {
      if (bytes <= decodedByteLimit && count <= readyImageLimit) break;
      images.delete(file); bytes -= record.bytes; count--;
      record.image.onload = record.image.onerror = null;
      try { record.image.src = ''; } catch (_) { /* Host cancellation may be unavailable. */ }
    }
  }
  function retainFighters(fighters) {
    retainedFiles.clear();
    for (const fighter of fighters || []) {
      const value = typeof fighter === 'string' ? {uid:fighter} : fighter;
      const entry = entryFor(value?.uid, value || {});
      if (entry) for (const frame of framesFor(entry)) retainedFiles.add(frame.file);
    }
    trimImages();
    return retainedFiles.size;
  }
  function pumpImageQueue() {
    while (activeImageLoads < imageLoadLimit && imageQueue.length) {
      const priority = imageQueue.findIndex(job => retainedFiles.has(job.frame.file));
      const job = imageQueue.splice(priority < 0 ? 0 : priority, 1)[0];
      activeImageLoads++; job.start();
    }
  }
  function getImage(frame) {
    const key = frame.file;
    if (images.has(key)) { const record=images.get(key);record.lastUse=++imageUse;return record; }
    const record = { image: null, state: 'loading', promise: null, bytes:0, lastUse:++imageUse };
    let settle;
    record.promise = new Promise(resolve => { settle = resolve; });
    images.set(key, record);
    if (typeof root.Image !== 'function') { record.state = 'unavailable'; settle(false); return record; }
    imageQueue.push({frame, start() {
      let image, settled = false;
      const finish = (ready) => {
        if (settled) return;
        settled = true; record.state = ready ? 'ready' : 'failed';
        record.bytes = ready ? image.naturalWidth * image.naturalHeight * 4 : 0;
        record.lastUse = ++imageUse; activeImageLoads--; settle(ready);
        if (ready) trimImages(record);
        pumpImageQueue();
      };
      try {
        image = new root.Image(); record.image = image; image.decoding = 'async';
        image.onload = () => {
          if (!(image.naturalWidth > 0 && image.naturalHeight > 0)) { finish(false); return; }
          // Publish readiness after decoding, with bounded simultaneous allocations.
          if (typeof image.decode !== 'function') { finish(true); return; }
          try { Promise.resolve(image.decode()).then(() => finish(true), () => finish(false)); }
          catch (_) { finish(false); }
        };
        image.onerror = () => finish(false);
        image.src = new URL(frame.file, baseURL).href;
      } catch (_) { finish(false); }
    }});
    pumpImageQueue();
    return record;
  }
  function actionName(pose = {}, entry = null) {
    if (pose.ko) return 'ko';
    if (pose.hit) return 'hit';
    if (pose.getup && entry?.actions?.roll && entry.actions.idle.frames[0].file.startsWith('assets/combat-sprites-pass18/')) return 'roll';
    if (pose.moveSlot && (pose.animationActive || pose.attack) && entry?.actionMap?.[pose.moveSlot]) {
      const mapped=entry.actionMap[pose.moveSlot];
      // New native sheets expose physical action groups. Match the actual VS
      // move type instead of treating every special as a firearm animation.
      const native=entry.actions.idle.frames[0].file.startsWith('assets/combat-sprites-pass18/');
      if(native && typeof pose.moveKind==='string') {
        const kind=pose.moveKind,tag=pose.moveTag||'',slot=pose.moveSlot;let action;
        if(kind==='projectile') action=['ballistic','precision','tranq','fire'].includes(tag)?'shoot':['blade','knife','boomerang'].includes(tag)?'blade':'deploy';
        else if(kind==='melee') action=tag==='grapple'||slot==='throw'?'throw':['blade','knife','machete','spear','tentacle'].includes(tag)?'blade':slot==='low'?'low':slot==='heavy'?'heavy':'punch';
        else if(kind==='reload') action='reload';
        else if(kind==='recover') action='recover';
        else if(kind==='parry') action='parry';
        if(action && entry.actions[action])return action;
      }
      return mapped;
    }
    if (pose.jump && entry?.actions?.jump) return 'jump';
    return pose.attack ? 'attack' : pose.crouch ? 'crouch' : pose.walk ? 'walk' : pose.guard ? 'guard' : 'idle';
  }
  function selectFrame(entry, pose = {}) {
    const requested = actionName(pose, entry), action = entry.actions[requested] || entry.actions.idle;
    const mapped = entry.phaseMap?.[requested]?.[pose.attackPhase];
    if (mapped) {
      const progress = Math.max(0, Math.min(1, finite(pose.phaseProgress) ? pose.phaseProgress : 0));
      const index = mapped[Math.min(mapped.length - 1, Math.floor(progress * mapped.length))];
      return { frame: action.frames[index], requested, action: requested, index, phase: pose.attackPhase };
    }
    const time = Math.max(0, finite(pose.actionTime) ? pose.actionTime : pose.animationActive && finite(pose.attackTime) ? pose.attackTime : pose.hit && finite(pose.hitTime) ? pose.hitTime : finite(pose.time) ? pose.time : 0);
    const raw = Math.floor(time * action.fps);
    const index = action.loop ? raw % action.frames.length : Math.min(raw, action.frames.length - 1);
    return { frame: action.frames[index], requested, action: entry.actions[requested] ? requested : 'idle', index };
  }
  function has(uid, options = {}) { return !!entryFor(uid, options); }
  function framesFor(entry, options = {}) {
    if (!options.action) return costumeFiles.get(entry) || entryFiles.get(entry.uid) || [];
    const face = options.face === -1 || options.face === 1 ? options.face : entry.facing;
    const directional = face !== entry.facing && entry.oppositeActions ? entry.oppositeActions : entry.actions;
    return [...(directional[options.action]?.frames || []),...(root.CQC_PASS19_COSTUME_PARTS?.sources?.(entry)||[])];
  }
  function recordsFor(entry, options = {}) {
    const frames = framesFor(entry, options), records = new Set();
    if (options.retry === true) {
      for (const frame of frames) {
        const state = images.get(frame.file)?.state;
        if (state === 'failed' || state === 'unavailable') images.delete(frame.file);
      }
    }
    for (const frame of frames) records.add(getImage(frame));
    return [...records];
  }
  function preload(uid, options = {}) {
    const entry = entryFor(uid, options); if (!entry) return false;
    return recordsFor(entry, options).length > 0;
  }
  function whenReady(uid, options = {}) {
    const entry = entryFor(uid, options);
    if (!entry) return Promise.resolve(false);
    const records = recordsFor(entry, options);
    return Promise.all(records.map(record => record.promise)).then(results => results.length > 0 && results.every(Boolean));
  }
  function status(uid, options = {}) {
    const entry = entryFor(uid, options);
    if (!entry) return { uid, renderer: 'procedural-canvas', coverage: 'pending-art-review', ready: false };
    const states = [...new Set(framesFor(entry, options).map(f => images.get(f.file)?.state || 'not-requested'))];
    return { uid, renderer: 'png', coverage: entry.coverage, actions: Object.keys(entry.actions), oppositeActions: Object.keys(entry.oppositeActions || {}), states, ready: states.length === 1 && states[0] === 'ready', limits: entry.review.limits };
  }
  function drawFitted(c, fighter, box, face = -1, pose = {}) {
    const entry = entryFor(fighter?.uid, fighter || {});
    if (!entry || !box || ![box.x, box.y, box.width, box.height].every(finite) || box.width <= 0 || box.height <= 0 || ![1, -1].includes(face)) return false;
    const opposite = face !== entry.facing && entry.oppositeActions;
    if (face !== entry.facing && !opposite && entry.mirror !== true) return false;
    const directional = opposite ? { ...entry, actions: entry.oppositeActions } : entry;
    const selected = selectFrame(directional, { ...pose, actionTime: finite(pose.actionTime) ? pose.actionTime : 0 });
    const frame = selected.frame;
    const padding = finite(box.padding) ? Math.max(0, box.padding) : 0;
    const innerWidth = box.width - padding * 2, innerHeight = box.height - padding * 2;
    if (innerWidth <= 0 || innerHeight <= 0) return false;
    const factor = entry.displayHeight / (entry.sourceFrameHeights?.[frame.file] || entry.baseFrameHeight || frame.rect[3]);
    const nativeWidth = frame.rect[2] * factor, nativeHeight = frame.rect[3] * factor;
    const fit = Math.min(innerWidth / nativeWidth, innerHeight / nativeHeight);
    const width = nativeWidth * fit, height = nativeHeight * fit;
    const pivotX = face !== entry.facing && !opposite ? 1 - frame.pivot[0] : frame.pivot[0];
    const x = box.x + padding + (innerWidth - width) / 2 + width * pivotX;
    const y = box.y + padding + (innerHeight - height) / 2 + height * frame.pivot[1];
    // Preview scale is separate from combat geometry; include the complete equipment rectangle.
    return draw(c, fighter, x, y, face, fit, { ...pose, actionTime: finite(pose.actionTime) ? pose.actionTime : 0, entityKey: pose.entityKey || `portrait:${entry.uid}:${face}` });
  }
  function draw(c, fighter, x, y, face = 1, scale = 1, pose = {}) {
    const entry = entryFor(fighter && fighter.uid, fighter || {});
    if (!entry || !c || ![x, y, scale].every(finite) || scale <= 0 || ![1, -1].includes(face)) return false;
    const opposite = face !== entry.facing && entry.oppositeActions;
    if (face !== entry.facing && !opposite && entry.mirror !== true) return false;
    const directionalEntry = opposite ? { ...entry, actions: entry.oppositeActions } : entry;
    if (entry.fallbackMissingActions === true && !directionalEntry.actions[actionName(pose, entry)]) return false;
    const requested = actionName(pose, entry), time = Math.max(0, finite(pose.time) ? pose.time : 0);
    const clockKey = pose.entityKey || `${entry.uid}:${face}`;
    let clock = clocks.get(clockKey);
    if (!clock || clock.action !== requested || time < clock.lastTime) {
      clock = { action: requested, start: time, lastTime: time }; clocks.set(clockKey, clock);
    }
    clocks.delete(clockKey); clocks.set(clockKey, clock);
    while (clocks.size > clockLimit) clocks.delete(clocks.keys().next().value);
    clock.lastTime = time;
    const relative = finite(pose.actionTime) ? pose.actionTime : requested === 'hit' && finite(pose.hitTime) ? pose.hitTime : requested !== 'ko' && pose.animationActive && finite(pose.attackTime) ? pose.attackTime : time - clock.start;
    const selected = selectFrame(directionalEntry, { ...pose, actionTime: relative }), frame = selected.frame, loaded = getImage(frame);
    if (loaded.state !== 'ready') return false;
    if(entry.costumeParts && (root.CQC_PASS19_COSTUME_PARTS?.sources?.(entry)||[]).some(source=>{const loadedSource=getImage(source);return loadedSource.state!=='ready'||loadedSource.image.naturalWidth!==source.width||loadedSource.image.naturalHeight!==source.height;}))return false;
    const image = loaded.image, [sx, sy, sw, sh] = frame.rect;
    if (sx + sw > image.naturalWidth || sy + sh > image.naturalHeight) return false;
    // Independently authored sheets can use different native pixel scales. Keep every pose
    // in one source at its observed upright scale; crouch/roll/KO never stretch to full height.
    const factor = entry.displayHeight / (entry.sourceFrameHeights?.[frame.file] || entry.baseFrameHeight || sh), w = sw * factor, h = sh * factor;
    c.save();
    try {
      c.translate(x, y); c.scale(scale * (face === entry.facing || opposite ? 1 : -1), scale);
      c.imageSmoothingEnabled = entry.renderStyle === 'painted';
      if (frame.clipPolygon) {
        c.beginPath();
        frame.clipPolygon.forEach((p, i) => {
          const dx = (p[0] - frame.pivot[0]) * w, dy = (p[1] - frame.pivot[1]) * h;
          if (i) c.lineTo(dx, dy); else c.moveTo(dx, dy);
        });
        c.closePath(); c.clip();
      }
      const sourceArgs={entry,frame,image,factor,pose,face,requested,resolveSource:getImage};
      if(!root.CQC_PASS19_PIXEL_STYLE?.drawSource(c,sourceArgs) && !root.CQC_PASS19_COSTUME_PARTS?.drawSourceParts(c,sourceArgs) && !root.CQC_PASS18_ARTICULATED_IDLES?.drawSourceParts(c,sourceArgs))c.drawImage(image, sx, sy, sw, sh, -w * frame.pivot[0], -h * frame.pivot[1], w, h);
    } finally { c.restore(); }
    return true;
  }
  return { configure, configureCostumes, getEntry: entryFor, draw, drawFitted, has, preload, whenReady, status, validateEntry, validateCostumeEntry, actionName, selectFrame, retainFighters, cacheInfo };
});
