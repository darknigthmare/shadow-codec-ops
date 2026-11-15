/* Reviewed visual flame attachment; collision, projectiles and source artwork are unchanged. */
(function(root) {
  'use strict';
  const points = {"roster51__fury_delta":{"1":{"file":"assets/combat-sprites-pass18/roster51__fury_delta/right-v1.png","sha256":"771b83f4dccf9a0fa1cc56b50293a80bf79a29f4594a5762d0558cd49c02939a","rect":[667,370,315,267],"sourcePoint":[979,448],"action":"shoot","forward":140.24380426829268,"height":131.12798076219514},"-1":{"file":"assets/combat-sprites-pass18/roster51__fury_delta/left-v1.png","sha256":"e2e8b894b847f7778c001c6af3c02e93bebc079a22f3448fb32ea7acaa81e06b","rect":[621,379,306,253],"sourcePoint":[623,450],"action":"shoot","forward":135.80950482539683,"height":131.42859698412698}},"core__pyro":{"1":{"file":"assets/combat-sprites-pass18/core__pyro/right-v1.png","sha256":"6ed4209f525cc32dfd2f074464ffa1afcd222748e4acc357e1fcee73464ef029","rect":[963,674,280,268],"sourcePoint":[1235,767],"action":"shoot","forward":111.24186013071896,"height":130.03261660130718},"-1":{"file":"assets/combat-sprites-pass18/core__pyro/left-v1.png","sha256":"b693e52340a94159329927b085e8d798e54327eeb30b782f4300e7d62c340190","rect":[937,699,303,226],"sourcePoint":[945,771],"action":"shoot","forward":131.42862832752613,"height":121.81176655052266}}};
  const api = root.CQC_PASS18_VFX, sprites = root.CQC_COMBAT_SPRITES;
  if (!api || !sprites) return;
  const original = api.drawMuzzle;
  api.drawMuzzle = function(c, actor, move, age, zoom = 1, options = {}) {
    const uid = actor?.f?.uid || actor?.uid;
    if (!points[uid] || move?.kind !== 'projectile' || move.tag !== 'fire') return original.call(api, c, actor, move, age, zoom, options);
    const face = actor?.face || actor?.facing || 1, point = points[uid][face], position = options.position;
    if (!point || !c?.drawImage || !Number.isFinite(zoom) || zoom <= 0 || zoom > 6 || !Number.isFinite(age) || age < 0 || !position || ![position.x, position.y].every(Number.isFinite)) return false;
    const entry = sprites.getEntry(uid, actor?.f || actor), attack = actor.attack;
    if (!entry || !attack || !Number.isFinite(attack.t) || !Number.isFinite(move.startup) || !Number.isFinite(move.active) || move.active <= 0) return false;
    if (attack.t < move.startup || attack.t >= move.startup + move.active || actor.hit > 0 || actor.life <= 0) return true;
    const directional = face === entry.facing ? entry : {...entry, actions: entry.oppositeActions || entry.actions};
    const selected = sprites.selectFrame(directional, { animationActive: true, moveSlot: attack.name, moveKind: move.kind, moveTag: move.tag, attackPhase: 'active', phaseProgress: (attack.t - move.startup) / move.active, attackTime: attack.t / 60 });
    if (selected.frame.file !== point.file || selected.frame.sha256 !== point.sha256 || JSON.stringify(selected.frame.rect) !== JSON.stringify(point.rect)) return true;
    const scale = Number.isFinite(options.spriteScale) && options.spriteScale > 0 ? options.spriteScale : 1;
    const effect = root.CQC_PASS18_VFX_CATALOG?.effects?.['fire-projectile'];
    if (!effect?.frames?.length) return false;
    const index = options.reducedMotion ? 1 : Math.floor(Math.max(0, age) / 4) % 4, frame = effect.frames[index];
    const size = .42 * zoom, width = frame.rect[2] * effect.displayWidth / effect.sourceScaleReferenceWidth * size;
    const x = position.x + face * point.forward * scale * zoom, y = position.y - point.height * scale * zoom;
    return api.drawAt(c, 'fire-projectile', x + face * width * frame.pivot[0], y, age, size, {...options, angle: face === 1 ? 0 : Math.PI});
  };
  root.CQC_PASS18_FLAME_NOZZLES = { points, simulationMutation: false, sourcePixelsTransformed: false, absolute1to1Certified: false };
})(globalThis);
