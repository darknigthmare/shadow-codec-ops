/* ZEKE's conventional dorsal POWER UNIT missile bank.
 * Reference-led new sprite adaptation of the original standard machine;
 * the two-tube nuclear concept configuration is deliberately not installed.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const ID = 'zeke_pw_psp2010';
  const SOURCE = {"id":"pass30_zeke_conventional_power_unit","file":"assets/machines-pass30/zeke/conventional-power-unit-v2.png","sha256":"81b85ee774efca9352ed739559fdb373260fc4756db3a6196c31b367d8c37a20","bytes":1402734,"width":1672,"height":941};
  const PART = 'conventional_power_unit';
  const ports = [[581,423],[770,351],[949,292],[735,518],[915,451],[1115,379]];
  const refs = Object.freeze([
    {url: 'https://metalgear.cl/art/p103-zeke-poses.jpg', kind: 'published original pose sheet, printed page 105: overhead rear power-unit view, six circular ports'},
    {url: 'https://outerheaven.nekoweb.org/mgdb/pw/zeke_guide.html', kind: 'secondary component guide: standard ZEKE Power Unit / Attack / Missile'},
    {url: 'https://metalgear.cl/art/p102-metal-gear-zeke.jpg', kind: 'published original standard ZEKE finished model, printed page 104: material and source camera'},
    {url: 'https://mgcvt.com/word/w79', kind: 'secondary distinction between standard battle loadout and the nuclear concept launcher'}
  ]);
  const limits = Object.freeze([
    'New source-led 2D reconstruction of the standard dorsal power-unit missile bank; original extracted geometry or absolute 1:1 is not certified.',
    'Six launch caps follow the visible original pose-sheet count. Closed-source art has no separately admitted open-cap interior, hinge, missile-ejection phase or axial reversed camera.',
    'The bank is rigidly attached to the existing torso support. No independent cap opening, weapon recoil, new HP pool, detached wreckage or nuclear launcher is invented.',
    'The two-tube nuclear launcher of the separate design study is an alternate configuration replacing the railgun bay; it is not installed on the PSP standard boss.',
    'The sprite palette follows the standard machine. Hidden underside mounting projection is interpreted; launch-point descriptors identify admitted surface pixels, not an extracted missile animation.'
  ]);
  function apply(catalog) {
    if (!Array.isArray(catalog?.machines)) throw Error('ZEKE completion needs a machine catalog');
    const next = clone(catalog), machine = next.machines.find(value => value.id === ID);
    if (!machine) return {catalog: next, changes: [], limits: limits.slice()};
    if (machine.pass30ZekeConventionalCompletion) {
      const source = machine.sources.find(value => value.id === SOURCE.id), part = machine.parts.find(value => value.id === PART);
      if (JSON.stringify(source) !== JSON.stringify(SOURCE) || !part) throw Error('ZEKE admitted power-unit source changed');
      return {catalog: next, changes: [], limits: limits.slice()};
    }
    if (!machine.parts.some(value => value.id === 'anchor') || !machine.parts.some(value => value.id === 'torso') ||
        !machine.parts.some(value => value.id === 'railgun_cradle') || machine.sources.some(value => value.id === SOURCE.id) ||
        machine.parts.some(value => value.id === PART)) throw Error('ZEKE source assembly differs from reviewed standard camera');
    const before = machine.parts.length;
    machine.sources.push(clone(SOURCE));
    machine.parts.push({id: PART, source: SOURCE.id, rect: [0,0,1672,941], pivot: [980,790],
      offset: [136,47], imageScale: .085, parent: 'torso', z: 25,
      documentaryQualification: 'Rigid standard dorsal missile Power Unit. Six closed circular launch surfaces, no new motion or health simulation.'});
    machine.pass30ZekeConventionalCompletion = true;
    machine.documentaryQualifications = (machine.documentaryQualifications || []).concat(limits.slice());
    root.CQC_MACHINE_PARTS?.normalizeCatalog(next);
    return {catalog: next, changes: [{id: ID, beforeParts: before, afterParts: machine.parts.length,
      addedParts: [PART], addedSource: clone(SOURCE), nativePortCenters: clone(ports),
      existingSourcesAndPartGeometryChanged: false, simulationMutation: false, absolute1to1Certified: false}],
      limits: limits.slice()};
  }
  function presentationPose(id, pose) { return pose; }
  // The generic muzzle remains the railgun; missile slots are explicit so a
  // consumer must not move every ZEKE projectile to the dorsal missile bank.
  const rail = Object.freeze({part: 'railgun_barrel', sourceNativeXY: [665,535]});
  const missile = Object.freeze({part: PART, sourceNativeXY: ports[0].slice()});
  const missileLower = Object.freeze({part: PART, sourceNativeXY: ports[3].slice()});
  const weapon = Object.freeze({...rail, missile, missileLower,
    byAttackKind: Object.freeze({beam: rail, shot: missile, volley: missileLower})});
  const weaponPoints = Object.freeze({zeke: weapon, [ID]: weapon});
  // Existing Arsenal groups remain RAILGUN, MISSILES, CORE AI with their old HP.
  // The Core encounter's rail/jet/core group names are intentionally not mapped.
  const targetParts = Object.freeze({zeke: Object.freeze([
    Object.freeze({part: 'railgun_receiver'}),
    Object.freeze({part: PART, sourceNativeXY: ports[4].slice()}),
    Object.freeze({part: 'ai_head'})
  ])});
  const sourcePoints = Object.freeze({[ID]: Object.freeze({
    missile: Object.freeze({part: PART, nativeXY: ports[0].slice(), kind: 'standard dorsal power-unit near launch-cap surface'}),
    missileLower: Object.freeze({part: PART, nativeXY: ports[3].slice(), kind: 'standard dorsal power-unit far launch-cap surface'})
  })});
  root.CQC_PASS30_ZEKE_COMPLETION = Object.freeze({schema: 'cqc.pass30.zeke-standard-completion/1',
    ids: Object.freeze([ID]), apply, presentationPose, weaponPoints, sourcePoints, targetParts, limits, refs,
    nativePortCenters: Object.freeze(ports.map(point => Object.freeze(point.slice())))});
  if (typeof module === 'object' && module.exports) module.exports = root.CQC_PASS30_ZEKE_COMPLETION;
})(globalThis);
