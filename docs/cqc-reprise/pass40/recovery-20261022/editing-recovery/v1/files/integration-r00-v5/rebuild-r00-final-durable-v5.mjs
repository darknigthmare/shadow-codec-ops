import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import zlib from 'node:zlib';

const root = '@PROJECT_ROOT@';
const app = '@APP_ROOT@/public/cqc';
const out = path.join(root,'integration-r00-v5/approved-runtime');
const art = path.join(root, 'art/roster/pass40__raiden_r00');
const uid = 'pass40__raiden_r00';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const load = file => fs.readFileSync(file);
const parse = file => JSON.parse(load(file));
const pinned = (file, expected) => {
  const bytes = load(file);
  if (sha(bytes) !== expected) throw Error('Pinned input changed: ' + file);
  return bytes;
};
const baseFile = path.join(app, 'src/cqc-pass31-raiden-r00.js');
const baseBytes = pinned(baseFile, 'ab7a0173e3dcd1de945dbb1226871f4914f46a3b50db3c36f122a0beb0199150');
const geometryFile = path.join(art, 'NATIVE_GEOMETRY_CANDIDATE_V2.json.gz');
const geometryBytes = pinned(geometryFile, '05dd11bd55bc0f8e905c25ea84731158b38f09e8e8ef0d2aa408a01d4eb6b8ec');
const geometry = JSON.parse(zlib.gunzipSync(geometryBytes));
const ownershipFile = path.join(art, 'ROLEBOOK_NATIVE_CANDIDATE_V2.json');
const ownershipBytes = pinned(ownershipFile, 'fae9e76b111e10b30863fb123e0b8d12aafbfe453386bd48571ea31e22ae362f');
if (geometry.ownershipBookSHA256 !== sha(ownershipBytes) || geometry.approved !== false) throw Error('Unexpected geometry authority');

const context = {module: {exports: {}}};
vm.createContext(context);
vm.runInContext(baseBytes.toString(), context, {timeout: 1000});
const base = JSON.parse(JSON.stringify(context.CQC_PASS31_RAIDEN_R00.option.sprite));
const byOld = actions => [actions.idle.frames[0], actions.guard.frames[0], ...actions.walk.frames,
  actions.crouch.frames[0], actions.blade.frames[0], actions.blade.frames[1], actions.ko.frames[0]];
const legacy = {right: byOld(base.actions), left: byOld(base.oppositeActions)};
const frames = {}, sources = [];
const sourceFrameHeights = {...base.sourceFrameHeights};
const legacyRoles = {1: 1, 4: 4, 5: 6, 6: 11, 7: 14};
const bodyFile = path.join(art, "BODY_CALIBRATION_CANDIDATE_V2.json");
const bodyBytes = pinned(bodyFile,"6ae36dad0264e8efd726f445da0630a52a91a138ff3fbd6f857d3b4d612a5fb2");
const body = JSON.parse(bodyBytes);
if (body.approved !== false) throw Error("Unexpected body authority");
for (const [side, oldFrames] of Object.entries(legacy)) {
  frames[side] = [];
  for (const [index, frame] of oldFrames.entries()) {
    const original = {...frame};
    const semantic = legacyRoles[index];
    if (semantic === undefined) continue;
    frames[side][semantic] = {...original, nativePoseIndex: semantic, physicalSource: 'unchanged-pass31-native-keypose'};
  }
  const oldPath = path.join(app, oldFrames[0].file);
  const oldBytes = pinned(oldPath, oldFrames[0].sha256);
  sources.push({file: oldFrames[0].file, path: oldPath, bytes: oldBytes.length, sha256: sha(oldBytes),
    sourceFrameHeight: side === 'right' ? 514 : 529, provenance: 'Existing P31 PNG and vector frame geometry reused intact; never replaces old RAY selection.'});
  const source = geometry.sources.find(item => item.path.endsWith('/' + side + '-supplement-v1.png'));
  if (!source || source.allOpaqueComponentsExplicitlyAssigned !== true) throw Error('Missing measured supplement');
  const native = pinned(source.path, source.sha256);
  if (native.length !== source.bytes) throw Error('Native source size changed');
  const file = 'assets/combat-sprites-pass40/raiden-r00/' + side + '-supplement-v1.png';
  const height = side === 'right' ? 428 : 445;
  sourceFrameHeights[file] = height;
  sources.push({file, path: source.path, bytes: native.length, sha256: source.sha256, sourceFrameHeight: height,
    provenance: 'New independent native facing; Root anatomy and source-density review pending.'});
  for (const pose of source.poses) {
    if (pose.semanticPoseIndex === null) continue;
    if (pose.ownPixelsLost || pose.foreignPixelsKept || pose.opaqueCanvasEdgePixels || pose.holdReasons.length) throw Error('Held or lossy pose');
    frames[side][pose.semanticPoseIndex] = {file, sha256: source.sha256, rect: pose.rect, pivot: pose.candidatePivot,
      clipPolygon: pose.clipPolygon, nativePoseIndex: pose.semanticPoseIndex, physicalSource: 'new-pass40-native-keypose'};
  }
  // Four locomotion roles are replaced only in this new UID. Historical P31 is never mutated.
  for (const source of geometry.sources.filter(item => !item.path.endsWith('-supplement-v1.png'))) {
    const active = source.poses.filter(pose => pose.side === side && pose.semanticPoseIndex !== null);
    if (!active.length) continue;
    if (source.allOpaqueComponentsExplicitlyAssigned !== true) throw Error('Unowned native components');
    const native = pinned(source.path, source.sha256);
    if (native.length !== source.bytes) throw Error('Native source size changed');
    const twoFacings = source.path.endsWith('/locomotion-held-katana-v1.png');
    const suffix = twoFacings ? (side === 'right' ? 'right-locomotion-v1.png' : 'left-walkb-locomotion-v1.png') : 'left-held-katana-complete-v1.png';
    const file = 'assets/combat-sprites-pass40/raiden-r00/' + suffix;
    const height = twoFacings ? (side === 'right' ? 474 : 458) : 670;
    sourceFrameHeights[file] = height;
    sources.push({file,path:source.path,bytes:native.length,sha256:source.sha256,sourceFrameHeight:height,
      sourceAlias:twoFacings ? {reason:'Same untouched two-facing native PNG; distinct logical aliases permit same-page facing-specific heights.',side,disjointSemanticRoles:active.map(p=>p.semanticPoseIndex)} : null,
      provenance:'Independent native held-katana locomotion. Root anatomy, near/far gait and calibration review pending.'});
    for (const pose of active) {
      if (pose.ownPixelsLost || pose.foreignPixelsKept || pose.opaqueCanvasEdgePixels || pose.holdReasons.length) throw Error('Held or lossy locomotion pose');
      const datum = body.poses.find(p => p.file === path.basename(source.path) && p.poseName === pose.name);
      if (!datum) throw Error('Explicit body axis missing');
      const [x,y,w,h] = pose.rect;
      const pivot = [(datum.candidateBodyAxisX-x)/w,(datum.candidateSoleY-y)/h];
      const extra = datum.previewStatureSourceXYXY ? {previewDatumX:datum.candidateBodyAxisX-x,
        previewStatureBounds:{left:datum.previewStatureSourceXYXY[0]-x,top:datum.previewStatureSourceXYXY[1]-y,
          right:datum.previewStatureSourceXYXY[2]-x,bottom:datum.previewStatureSourceXYXY[3]-y}} : {};
      if (frames[side][pose.semanticPoseIndex]) throw Error('Overlapping semantic ownership');
      frames[side][pose.semanticPoseIndex] = {file,sha256:source.sha256,rect:pose.rect,pivot,
        clipPolygon:pose.clipPolygon,nativePoseIndex:pose.semanticPoseIndex,physicalSource:'new-pass40-native-held-katana-locomotion',...extra};
    }
  }
  if (frames[side].length !== 16 || !Array.from({length:16}, (_, i) => frames[side][i]).every(Boolean)) throw Error('Incomplete sixteen physical roles');
}

const profileModuleBytes = load(path.join(out, 'cqc-pass40-r00-native.js'));
const auditBinding = {uid, inputs: {baseModuleSHA256: sha(baseBytes), profileModuleSHA256: sha(profileModuleBytes), supportModuleSHA256: sha(load(path.join(out,'cqc-pass40-r00-support.js'))), geometrySHA256: sha(geometryBytes),
  ownershipBookSHA256: sha(ownershipBytes), bodyCalibrationSHA256: sha(bodyBytes)}, sources: sources.map(({file, bytes, sha256}) => ({file, bytes, sha256})),
  sourceFrameHeights, physicalFrames: frames};
const auditBindingSHA256 = sha(Buffer.from(JSON.stringify(auditBinding)));
let review = {status: 'pending', reviewer: '', reviewedAt: '', sourceKind: 'original-game-capture',
  checks: Object.fromEntries(['identity','costume','equipment','anatomicalSides','singleFigure','transparentBackground'].map(key => [key, false])),
  sources: base.review.sources,
  limits: [
    'Distinct original R-00 Standard Cyborg Body. Existing MGS4 and post-prologue black Custom Body UIDs, abilities and RAY encounters stay unchanged.',
    'Sixteen physical source keyposes per facing: five existing P31, seven retained P40 supplement actions and four new held-katana locomotion drawings. Logical calibration aliases and action phases create no new drawings.',
    'Original P31 idle/walks and sheathed jump are superseded only for this new UID. Near-leg-leading and near-leg-trailing back-angle gait drawings are candidates pending Root physical review; gaitCertification stays false.',
    'Silver/gold prologue appearance and conventional HF katana are reference-led2D interpretations, not extracted meshes, UVs or original animation.',
    'Same-page heights P40 supplements428/445px, right locomotion474px, left back-stride458px and corrected left locomotion670px require Root review. Explicit pelvis axes and boot soles exclude blade tips. Native PNG bytes remain intact; held drawings stay unmapped.',
    'Stamina, gray-health nanopaste recovery, move timing, damage and CQC finishers are authored adaptations. No FC, Ripper, Zandatsu, Blade Mode, ocular visor, mechanical jaw or firearm behavior is imported.'
  ]};
const reviewIndex = process.argv.indexOf('--review');
if (reviewIndex >= 0) {
  const approval = parse(process.argv[reviewIndex + 1]);
  if (approval.schema !== 'cqc.p40.r00-root-art-review/1' || approval.approved !== true ||
      approval.uid !== uid || approval.auditBindingSHA256 !== auditBindingSHA256 ||
      !approval.reviewer || !approval.reviewedAt || !approval.checks ||
      Object.values(review.checks).length !== 6 || Object.keys(review.checks).some(key => approval.checks[key] !== true)) {
    throw Error('Exact Root review for this packet required');
  }
  review = {...review, status: 'approved', reviewer: approval.reviewer, reviewedAt: approval.reviewedAt,
    checks: approval.checks, rootReviewSHA256: sha(load(process.argv[reviewIndex + 1]))};
}

const packed = {};
for (const [side, values] of Object.entries(frames)) {
  packed[side] = values.map(frame => {
    const {clipPolygon, ...rest} = frame;
    const points = clipPolygon.map(([x, y]) => [Math.round(x * frame.rect[2]), Math.round(y * frame.rect[3])]);
    let previous = points[0];
    const outlineDelta = [...previous];
    for (const point of points.slice(1)) {outlineDelta.push(point[0] - previous[0], point[1] - previous[1]); previous = point;}
    return {...rest, outlineDelta};
  });
}
const meta = {uid, name: 'RAIDEN · R-00', game: 'Metal Gear Rising Revengeance',
  incarnation: 'Original Standard Cyborg Body, intact natural face, prologue File R-00 Guard Duty; separate playable identity.',
  coverage: 'action-frames', displayHeight: 222, baseFrameHeight: 514, sourceFrameHeights,
  facing: 1, mirror: false, fallbackMissingActions: false, renderStyle: 'painted',
  visualWeaponPresent: true, visualWeaponKind: 'prologue-high-frequency-katana', visualFirearmPresent: false,
  visualBallisticMuzzlePresent: false, absolute1to1Certified: false,
  actionMap: {light:'blade', heavy:'heavy', low:'low', throw:'throw', special:'blade', specialDown:'parry',
    specialForward:'walk', specialBack:'roll', super:'heavy', utility:'recover'},
  phaseMap: Object.fromEntries(['attack','blade','punch','heavy','low','throw'].map(name => [name,
    {startup:[0], active:[1], recovery:[2]}])),
  gaitCertification: false, auditBindingSHA256, review};
const header = `/* R00 candidate packet: ${auditBindingSHA256}. Pending review must remain rejected by the unchanged renderer. */\n`;
const code = header + `(function(root){'use strict';\nconst UID=${JSON.stringify(uid)},meta=${JSON.stringify(meta)},packed=${JSON.stringify(packed)};\n` +
`function unpack(frame){const value={...frame},data=value.outlineDelta;delete value.outlineDelta;let x=data[0],y=data[1];value.clipPolygon=[[x/value.rect[2],y/value.rect[3]]];for(let i=2;i<data.length;i+=2){x+=data[i];y+=data[i+1];value.clipPolygon.push([x/value.rect[2],y/value.rect[3]]);}return value;}\n` +
`function actions(f){const g=(ids,fps=0,loop=false)=>({frames:ids.map(i=>f[i]),fps,loop});return{idle:g([0]),guard:g([1]),parry:g([1]),walk:g([2,3],7,true),crouch:g([4]),jump:g([5]),attack:g([6,10,1],9),blade:g([6,10,1],9),punch:g([6,10,1],9),heavy:g([6,11,1],9),low:g([4,7,1],9),throw:g([8,9,1],9),hit:g([13]),recover:g([12]),ko:g([14]),roll:g([15])};}\n` +
`const physical={right:packed.right.map(unpack),left:packed.left.map(unpack)},entry={...meta,actions:actions(physical.right),oppositeActions:actions(physical.left)};\n` +
`const base=root.CQC_COMBAT_SPRITE_CATALOG||{schema:'cqc.combat-sprites/1',entries:{}};if(base.schema!=='cqc.combat-sprites/1'||!base.entries||Object.hasOwn(base.entries,UID))throw Error('Invalid or duplicate R00 native catalog');root.CQC_COMBAT_SPRITE_CATALOG={...base,entries:{...base.entries,[UID]:entry}};root.CQC_PASS40_R00_SOURCE={uid:UID,entry,physical,auditBindingSHA256:${JSON.stringify(auditBindingSHA256)},approved:entry.review.status==='approved'};\n})(globalThis);\n`;

fs.mkdirSync(out, {recursive:true});
function write(name, bytes) {const file=path.join(out,name);fs.writeFileSync(file,bytes);return{path:file,bytes:Buffer.byteLength(bytes),sha256:sha(Buffer.from(bytes))};}
const result = [write('cqc-pass40-r00-sprite-catalog.js', code),
  write('AUDIT_BINDING_CANDIDATE_V2.json.gz', zlib.gzipSync(Buffer.from(JSON.stringify(auditBinding)), {mtime:0})),
  write('SOURCE_FILES_V2.json', JSON.stringify({schema:'cqc.p40.r00-source-files/1',uid,sources},null,2)+'\n'),
  write('ROOT_REVIEW_REQUIRED_V2.json', JSON.stringify({schema:'cqc.p40.r00-root-art-review/1',approved:false,uid,
    auditBindingSHA256,reviewer:'',reviewedAt:'',checks:review.checks,
    limits:'Candidate calibration, every source action/equipment and P31 compound geometry require physical Root review; do not mark this draft approved automatically.'},null,2)+'\n')];
console.log(JSON.stringify({uid,approved:review.status==='approved',auditBindingSHA256,files:result}));
