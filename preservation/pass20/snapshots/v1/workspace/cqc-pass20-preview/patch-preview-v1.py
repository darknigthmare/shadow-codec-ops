from pathlib import Path
import hashlib,json,os
p=Path('/tmp/cqc-pass19-application/public/cqc/src/cqc-sprite-renderer.js')
before=p.read_bytes(); prior=Path('/workspace/cqc-pass20-preview/cqc-sprite-renderer.prior-pass19.js');prior.write_bytes(before)
s=before.decode()
s=s.replace('  const retainedFiles = new Set();','  const retainedFiles = new Set();\n  const previewMeasurements = new WeakMap();')
start=s.index('  function drawFitted(c, fighter, box, face = -1, pose = {}) {')
end=s.index('  function draw(c, fighter, x, y, face = 1, scale = 1, pose = {}) {',start)
s=s[:start]+'''  function sourceStandingHeight(entry, frame) {
    return entry.sourceFrameHeights?.[frame.file] || entry.baseFrameHeight || frame.rect[3];
  }
  function previewStature(fighter, entry) {
    const physical = root.CQC_PASS19_WORLD_SCALE?.height?.(fighter);
    const pixels = finite(physical?.pixels) && physical.pixels > 0 ? physical.pixels : entry.displayHeight;
    // A mechanical reinterpretation is a separately sized body, not an enlarged coat.
    const transformed = entry.costumeConcept?.family === 'metalgear';
    return { pixels, statureUID: transformed ? `${entry.uid}:${fighter?.costume || 'metalgear'}` : entry.uid,
      evidence: physical?.evidence || 'preserved-display-height' };
  }
  function previewBody(entry, face) {
    const directional = face !== entry.facing && entry.oppositeActions ? entry.oppositeActions : entry.actions;
    const frame = directional?.idle?.frames?.[0];
    if (!frame) return null;
    const stored = previewMeasurements.get(entry)?.get(face);
    if (stored) return stored;
    const fallback = { frame, height: sourceStandingHeight(entry, frame),
      bottom: frame.rect[3] * frame.pivot[1], measurement: 'source-standing-height' };
    const loaded = images.get(frame.file);
    if (loaded?.state !== 'ready' || !root.document?.createElement) return fallback;
    const [sx, sy, sw, sh] = frame.rect;
    if (!Number.isInteger(sw) || !Number.isInteger(sh) || sw * sh > 2097152) return fallback;
    // Read the approved idle silhouette only. No atlas is cropped, edited or re-encoded.
    const canvas = root.document.createElement('canvas'); canvas.width = sw; canvas.height = sh;
    let measured = fallback;
    try {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return fallback;
      if (frame.clipPolygon) {
        context.beginPath(); frame.clipPolygon.forEach((point, i) => {
          if (i) context.lineTo(point[0] * sw, point[1] * sh);
          else context.moveTo(point[0] * sw, point[1] * sh);
        }); context.closePath(); context.clip();
      }
      context.drawImage(loaded.image, sx, sy, sw, sh, 0, 0, sw, sh);
      const data = context.getImageData(0, 0, sw, sh).data;
      let top = sh, bottom = -1;
      for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
        if (data[(y * sw + x) * 4 + 3] < 16) continue;
        top = Math.min(top, y); bottom = Math.max(bottom, y);
      }
      if (bottom >= top) measured = { frame, height: bottom + 1 - top, bottom: bottom + 1,
        top, measurement: 'native-alpha-idle' };
    } catch (_) { /* Restricted canvas readback retains explicit standing-height metadata. */ }
    finally { canvas.width = canvas.height = 1; }
    if (measured.measurement === 'native-alpha-idle') {
      let directions = previewMeasurements.get(entry);
      if (!directions) { directions = new Map(); previewMeasurements.set(entry, directions); }
      directions.set(face, measured);
    }
    return measured;
  }
  function previewGeometry(fighter, box, face = -1) {
    const entry = entryFor(fighter?.uid, fighter || {});
    if (!entry || !box || ![box.x, box.y, box.width, box.height].every(finite) || box.width <= 0 || box.height <= 0 || ![1, -1].includes(face)) return null;
    const opposite = face !== entry.facing && entry.oppositeActions;
    if (face !== entry.facing && !opposite && entry.mirror !== true) return null;
    const padding = finite(box.padding) ? Math.max(0, box.padding) : 0;
    const innerWidth = box.width - padding * 2, innerHeight = box.height - padding * 2;
    if (innerWidth <= 0 || innerHeight <= 0) return null;
    const stature = previewStature(fighter, entry), body = previewBody(entry, face);
    if (!body) return null;
    const variants = [entries.get(entry.uid), ...(costumeEntries.get(entry.uid)?.values() || [])].filter(Boolean);
    // Share a conservative native envelope across the same incarnation and stature.
    // Thus a wider jacket changes neither crown height nor ground line. No image load
    // and no fit-to-current-rectangle can change that frame when another slot loads.
    let radius = .4, above = 1.04, below = .015;
    for (const variant of variants) {
      const costume = variant === entries.get(entry.uid) ? 'original'
        : [...(costumeEntries.get(entry.uid)?.entries() || [])].find(([, value]) => value === variant)?.[0];
      const candidate = previewStature({ uid: entry.uid, costume }, variant);
      if (candidate.statureUID !== stature.statureUID || Math.abs(candidate.pixels / stature.pixels - 1) > .01) continue;
      for (const actions of [variant.actions, variant.oppositeActions]) for (const frame of actions?.idle?.frames || []) {
        const standing = sourceStandingHeight(variant, frame), [,, width, height] = frame.rect;
        radius = Math.max(radius, width * Math.max(frame.pivot[0], 1 - frame.pivot[0]) / standing * 1.12);
        above = Math.max(above, height * frame.pivot[1] / standing * 1.06);
        below = Math.max(below, height * (1 - frame.pivot[1]) / standing * 1.06);
      }
    }
    const fit = Math.min(innerWidth / (radius * 2 * stature.pixels), innerHeight / ((above + below) * stature.pixels));
    const referenceFactor = entry.displayHeight / sourceStandingHeight(entry, body.frame);
    const scale = fit * stature.pixels / (body.height * referenceFactor);
    const floor = box.y + box.height - padding - below * stature.pixels * fit;
    return { uid: entry.uid, costume: fighter?.costume || 'original', face, statureUID: stature.statureUID,
      staturePixels: stature.pixels, statureEvidence: stature.evidence, measurement: body.measurement,
      x: box.x + box.width / 2, y: floor - (body.bottom - body.frame.rect[3] * body.frame.pivot[1]) * referenceFactor * scale,
      floor, scale, standingHeight: stature.pixels * fit,
      envelope: { radius, above, below }, previewOnly: true };
  }
  function drawFitted(c, fighter, box, face = -1, pose = {}) {
    const geometry = previewGeometry(fighter, box, face);
    if (!geometry) return false;
    return draw(c, fighter, geometry.x, geometry.y, face, geometry.scale,
      { ...pose, actionTime: finite(pose.actionTime) ? pose.actionTime : 0,
        entityKey: pose.entityKey || `portrait:${fighter.uid}:${face}` });
  }
''' +s[end:]
s=s.replace('getEntry: entryFor, draw, drawFitted, has','getEntry: entryFor, draw, drawFitted, previewGeometry, has')
assert s.count('function drawFitted(')==1
# Strictly preserve the combat drawing function and source action routing.
assert s[s.index('  function draw(c, fighter,'):s.index('  return { configure,')]==before.decode()[before.decode().index('  function draw(c, fighter,'):before.decode().index('  return { configure,')]
tmp=p.with_name(p.name+'.pass20-preview.tmp');tmp.write_text(s);os.replace(tmp,p)
r={'schema':'cqc.pass20.preview-atomic-edit/1','path':str(p),'priorSource':str(prior),'beforeSHA256':hashlib.sha256(before).hexdigest(),'afterSHA256':hashlib.sha256(p.read_bytes()).hexdigest(),'combatDrawAndActionRoutingByteIdentical':True,'sourceImagesEdited':False,'noWorldScaleMutation':True}
Path('/workspace/cqc-pass20-preview/PREVIEW_ATOMIC_EDIT_ACTUAL_V1.json').write_text(json.dumps(r,indent=2))
print(json.dumps(r))
