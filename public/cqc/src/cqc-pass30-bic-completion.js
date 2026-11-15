/* BIC Portable Ops: separate the two real rings from the admitted crown cage.
 * This is source-preserving rigid hardware separation, not three canonical clamps.
 * No source PNG, old part ID, health pool, animation clock or save field changes.
 */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const ID = 'icbmg_mpo_psp2006';
  const SHA = 'a5157543dc7d2af0abdae16f208ed86a53fbf8000f15334821a446488a237aef';
  const limits = Object.freeze([
    'The three inherited CQC launch-clamp targets are a gameplay adaptation. Consulted original-edition sources do not attest three articulated grasping clamps.',
    'The two crown rings and cage stay rigidly coupled to the original guidance anchor. No invented opening, support damage or new detachment clock is supplied.',
    'This uses the admitted generated 2D source. Exact original PSP/TGS launch hardware motion and absolute 1:1 fidelity are not certified.',
    'Source-native masks preserve the entire crown region; Canvas clipping may introduce subpixel antialias differences at shared seams.'
  ]);
  const cut = (top, bottom) => [[419, top], [649, top], [649, bottom], [419, bottom]];
  function apply(catalog) {
    if (catalog?.schema !== 'cqc.machine-parts/1' || !Array.isArray(catalog.machines))
      throw Error('BIC source catalogue unavailable');
    const adapted = clone(catalog), changes = [], partitions = [];
    const machine = adapted.machines.find(value => value.id === ID);
    if (!machine || machine.pass30BicCrownSeparated) return {catalog: adapted, changes, partitions, limits: limits.slice()};
    const source = machine.sources.find(value => value.id === 'native_master');
    const cage = machine.parts.find(value => value.id === 'guidance_crown_composite');
    if (source?.sha256 !== SHA || source.width !== 1060 || source.height !== 1484 || !cage
      || cage.rect.join(',') !== '419,19,230,267' || cage.pivot.join(',') !== '114,136'
      || cage.imageScale !== .38 || cage.variants?.length || cage.sourceClipPolygonNativeXY)
      throw Error('BIC admitted crown source differs from reviewed native camera');
    const before = clone(cage), oldIDs = machine.parts.map(value => value.id), sourcePins = clone(machine.sources);
    cage.sourceClipPolygonNativeXY = cut(75, 260);
    for (const spec of [
      {id:'crown_upper_ring', top:19, bottom:75, nativePivot:[534,49], z:20.001},
      {id:'crown_lower_ring', top:260, bottom:286, nativePivot:[534,271], z:20.002}
    ]) {
      const pivot = [spec.nativePivot[0]-before.rect[0], spec.nativePivot[1]-before.rect[1]];
      const ring = {...clone(before), id:spec.id, parent:before.id, pivot,
        offset:[(pivot[0]-before.pivot[0])*before.imageScale, -(pivot[1]-before.pivot[1])*before.imageScale],
        z:spec.z, rotation:0, channels:{}, sourceClipPolygonNativeXY:cut(spec.top,spec.bottom)};
      delete ring.detachment;
      machine.parts.push(ring);
      partitions.push({machine:ID, parent:before.id, part:spec.id, source:'native_master',
        sourceRect:clone(before.rect), sourceClipPolygonNativeXY:clone(ring.sourceClipPolygonNativeXY),
        sourceNativePivot:clone(spec.nativePivot), rigid:true, sourcePixelsChanged:false});
    }
    machine.pass30BicCrownSeparated = true;
    machine.sourceQualification = {...(machine.sourceQualification || {}),
      launchClamps:'Three legacy CQC clamp targets remain logical gameplay adaptations. No original three-clamp hardware, opening or silhouette is attested by consulted sources.',
      pass30Crown:'Two source-native crown rings are independent pieces parented to the original cage/guide anchor. All remain rigid and follow its ballistic translation and tilt. Original source camera, nozzles, body and all old IDs remain unchanged.'};
    changes.push({id:ID, kind:'native-rigid-crown-rings-and-cage', beforeParts:oldIDs.length,
      afterParts:machine.parts.length, preservedPartIDs:oldIDs, addedPartIDs:['crown_upper_ring','crown_lower_ring'],
      sourcePins, sourcePixelsChanged:false, simulationMutation:false, addedDetachmentDefinitions:0,
      absolute1to1Certified:false});
    root.CQC_MACHINE_PARTS?.normalizeCatalog(adapted);
    return {catalog: adapted, changes, partitions, limits:limits.slice()};
  }
  function presentationPose(id, pose) {
    if (id !== ID || !pose) return pose;
    // Copy caller-owned values without inventing opening or separate relative motion.
    return {...pose, channels:{...(pose.channels || {})}, flags:{...(pose.flags || {})}};
  }
  root.CQC_PASS30_BIC_COMPLETION = Object.freeze({apply,presentationPose,ids:Object.freeze([ID]),limits,
    audit:Object.freeze({schema:'cqc.pass30.bic-native-crown-separation/1',sourcePixelsChanged:false,
      simulationMutation:false,canonicalClampsAttested:false,absolute1to1Certified:false})});
})(globalThis);
