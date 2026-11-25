#!/usr/bin/env node
/** Check the integrity of the P62 bible and associations. No gameplay admission. */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bible = resolve(root, 'docs/cqc-bible');
const read = path => JSON.parse(readFileSync(resolve(bible, path), 'utf8'));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const unique = values => new Set(values).size === values.length;
const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const gitSha = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
const EXPECTED_GUIDE_SHA = '4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7';

const guide = read('guide-map.json');
const guideBytes = readFileSync(resolve(root, guide.guide.path));
check(sha256(guideBytes) === EXPECTED_GUIDE_SHA, 'The original user guide was modified.');
check(guide.guide.sha256 === EXPECTED_GUIDE_SHA, 'Guide metadata digest mismatch.');
check(guide.guide.bytes === guideBytes.length, 'Guide byte count mismatch.');
check(sameSet(guide.sections.map(s => s.id), Array.from({ length: 30 }, (_, i) => String(i).padStart(2, '0'))), 'Guide sections must cover 00–29 exactly.');
check(guide.requirements.length === 90 && unique(guide.requirements.map(x => x.id)), 'Requirement count/uniqueness mismatch.');
const requirementIds = new Set(guide.requirements.map(x => x.id));
const evidence = read('runtime-evidence.json');
const evidenceIds = new Set(evidence.evidence.map(x => x.id));
for (const section of guide.sections) {
  check(existsSync(resolve(bible, section.document)), `Missing bible section document: ${section.document}`);
  check(section.requirementIds.every(id => requirementIds.has(id)), `Unknown requirement in section ${section.id}`);
}
for (const requirement of guide.requirements) {
  check(requirement.acceptanceCriterion?.length > 25, `Missing acceptance criterion: ${requirement.id}`);
  check(['retenue', 'differee', 'a_decider', 'non_applicable'].includes(requirement.decision), `Invalid decision: ${requirement.id}`);
  for (const finding of requirement.runtimeFindings ?? []) {
    check(finding.evidenceIds.every(id => evidenceIds.has(id)), `Unknown runtime evidence: ${requirement.id}`);
  }
}
check(evidence.evidence.every(e => e.functionalTested === false), 'Code inspection must not become a claimed functional test.');
for (const finding of evidence.findings) {
  check(finding.evidenceIds.every(id => evidenceIds.has(id)), `Unknown evidence in finding ${finding.id}`);
}

const associations = read('asset-associations.json');
const delivery = JSON.parse(readFileSync(resolve(root, 'docs/cqc-reprise/pass62/delivery-manifest.json'), 'utf8'));
const assets = associations.assets;
const archives = associations.archives;
const scopes = associations.scopeRecords;
const auxiliary = associations.auxiliaryScopes;
const assetIds = new Set(assets.map(x => x.assetId));
const scopeIds = new Set([...scopes, ...auxiliary].map(x => x.id));
check(unique(assets.map(x => x.assetId)) && unique(assets.map(x => x.path)), 'Duplicate selected asset.');
check(unique(archives.map(x => x.path)), 'Duplicate archive.');
check(archives.every(x => x.selected === false && !assets.some(a => a.path === x.path)), 'An archive is selected.');
check(scopes.length === 277 && unique(scopes.map(x => x.id)), 'Historical scope count changed without qualification.');
check(auxiliary.length === 2, 'The two retained P60 costume scopes must stay separate.');
check(associations.counts.selectedSources === assets.length, 'Selected source count mismatch.');
check(associations.counts.archivedTrialsExcluded === archives.length, 'Archive count mismatch.');
check(associations.counts.historicalScopesWithoutDemonstratedSource === scopes.filter(x => x.presenceClass === 'unresolved').length, 'Open scope count mismatch.');
check(associations.counts.historicalScopesExtendedByP62 === scopes.filter(x => x.p62AssetIds.length).length, 'Extended scope count mismatch.');
for (const asset of assets) {
  check(asset.workIds.length > 0 && asset.workIds.every(id => scopeIds.has(id)), `Unresolved source-to-scope association: ${asset.path}`);
  check(asset.guideSections.every(id => guide.sections.some(s => s.id === id)), `Unknown guide section on ${asset.path}`);
  check(/^[a-f0-9]{40}$/.test(asset.gitBlobSha), `Invalid Git digest: ${asset.path}`);
  check(asset.absolute1to1Certified === false && asset.runtimeIntegrated === false && asset.combatReady === false, `Unexpected automatic admission: ${asset.path}`);
  check(asset.tracking && ['lore', 'design', 'assets', 'integration', 'validation', 'publication'].every(k => typeof asset.tracking[k] === 'string'), `Missing lifecycle field: ${asset.path}`);
  for (const document of asset.bibleDocuments) check(existsSync(resolve(bible, document)), `Missing association document: ${document}`);
}
for (const scope of scopes) {
  check(scope.selectedAssetIds.every(id => assetIds.has(id)), `Unknown asset in scope ${scope.id}`);
  for (const id of scope.selectedAssetIds) check(assets.find(a => a.assetId === id).workIds.includes(scope.id), `Non-reciprocal association: ${scope.id}/${id}`);
}
const p62 = assets.filter(a => a.pass === 62);
check(sameSet(p62.map(x => x.path), delivery.assets.map(x => x.path)), 'P62 delivery and bible select different sources.');
check(delivery.counts.selectedP62 === p62.length, 'P62 count mismatch.');
for (const image of [...delivery.assets, ...delivery.archives]) {
  const file = resolve(root, image.path);
  check(existsSync(file), `Missing new image: ${image.path}`);
  if (!existsSync(file)) continue;
  const bytes = readFileSync(file);
  check(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `Invalid PNG signature: ${image.path}`);
  check(bytes.readUInt32BE(16) === 1672 && bytes.readUInt32BE(20) === 941, `Unexpected P62 dimensions: ${image.path}`);
  check(gitSha(bytes) === image.gitBlobSha && sha256(bytes) === image.sha256, `P62 byte identity mismatch: ${image.path}`);
}

const roster = read('roster-coverage.json');
const pilots = read('combat-pilots.json');
check(roster.fighters.length === 354 && unique(roster.fighters.map(x => x.uid)), 'Compiled roster count/UID mismatch.');
check(pilots.pilots.length === 8 && unique(pilots.pilots.map(x => x.uid)), 'Pilot count/UID mismatch.');
check(roster.fighters.reduce((n, x) => n + x.compiledMoveSlots.length, 0) === 3540, 'Compiled move-slot count mismatch.');
for (const pilot of pilots.pilots) {
  check(roster.fighters.some(x => x.uid === pilot.uid && x.pilotP62), `Pilot not linked to compiled roster: ${pilot.uid}`);
  check(Object.keys(pilot.baseCompiledProfile.moves).length === 10, `Pilot compiled slots incomplete: ${pilot.uid}`);
  check(pilot.newFinisherDesign.nameStatus === 'created_for_project', `Finisher name falsely classified: ${pilot.uid}`);
  check(pilot.newFinisherDesign.runtimeIntegrated === false && pilot.newFinisherDesign.animationProduced === false, `Finisher falsely admitted: ${pilot.uid}`);
}
for (const path of ['NARRATION.md', 'narrative-registry.json', 'ARENES_ET_BOSS.md']) check(existsSync(resolve(bible, path)), `Missing authored bible file: ${path}`);

const narrative = read('narrative-registry.json');
const narrativeSources = read(narrative.sourcesFile);
const routes = narrative.routes;
const scenes = narrative.scenes;
const chapters = narrative.campaign.chapters;
const shots = scenes.flatMap(scene => scene.shots);
const encounters = routes.flatMap(route => route.encounters);
const documentedUids = new Set(narrative.rosterCoverage.map(x => x.uid));
const sceneIds = new Set(scenes.map(x => x.id));
const routeIds = new Set(routes.map(x => x.id));
const sourceIds = new Set(narrativeSources.sources.map(x => x.id));
const narrativeRefs = new Map(narrative.sourceAssetReferences.map(x => [x.id, x]));
const n = narrative.counts;
check(narrative.rosterCoverage.length === 380 && documentedUids.size === 380, 'Documented narrative UID count/uniqueness mismatch.');
check(sameSet(routes.map(x => x.uid), pilots.pilots.map(x => x.uid)), 'Combat and narrative use different pilot UIDs.');
check(routes.length === 8 && unique(routes.map(x => x.id)), 'Narrative route count/uniqueness mismatch.');
check(chapters.length === 10 && unique(chapters.map(x => x.id)), 'Campaign chapter count/uniqueness mismatch.');
check(scenes.length === 36 && unique(scenes.map(x => x.id)), 'Scene count/uniqueness mismatch.');
check(shots.length === 108 && unique(shots.map(x => x.id)) && unique(shots.map(x => x.requiredAssetId)), 'Narrative shot count/uniqueness mismatch.');
check(encounters.length === 64 && unique(encounters.map(x => x.id)), 'Encounter count/uniqueness mismatch.');
check(narrativeRefs.size === 24 && narrativeRefs.size === narrative.sourceAssetReferences.length, 'Narrative source count/uniqueness mismatch.');
check(n.documentedHistoricalUids === documentedUids.size && n.pilotRoutesEnriched === routes.length && n.individualEncountersSpecified === encounters.length, 'Narrative counters disagree with records.');
check(n.campaignChapters === chapters.length && n.totalSequences === scenes.length && n.totalShotBriefs === shots.length, 'Narrative campaign/scene/shot counters disagree.');
const routeScenes = scenes.filter(scene => routeIds.has(scene.owner));
const campaignScenes = scenes.filter(scene => scene.owner === narrative.campaign.id);
check(n.routeSequences === routeScenes.length && n.campaignSequences === campaignScenes.length, 'Route/campaign scene counters disagree.');
check(n.routeShotBriefs === routeScenes.flatMap(x => x.shots).length && n.campaignShotBriefs === campaignScenes.flatMap(x => x.shots).length, 'Route/campaign shot counters disagree.');
check(n.currentChroniclesStoriesObserved === narrative.rosterCoverage.filter(x => x.currentChroniclesStoryObserved).length, 'Observed Chronicles count mismatch.');
check(n.historicalUidsWithoutChroniclesStory === narrative.rosterCoverage.filter(x => !x.currentChroniclesStoryObserved).length, 'Historical missing-story count mismatch.');
check(n.remainingUidsNotRewrittenThisPass === documentedUids.size - routes.length, 'Remaining narrative UID count mismatch.');
check(n.newSceneImagesGenerated === 0 && n.certified1to1 === 0 && n.runtimeFilesModifiedByThisWork === 0 && n.runtimeActiveCountCertified === null, 'Narrative preproduction must not be certified as production or runtime admission.');
for (const route of routes) {
  check(documentedUids.has(route.uid) && route.encounters.length === 8, `Invalid route UID or encounter count: ${route.id}`);
  check(Object.values(route.sceneIds).every(id => sceneIds.has(id)), `Unknown route scene: ${route.id}`);
  check(route.sources.every(id => sourceIds.has(id)), `Unknown route source: ${route.id}`);
  check(route.sourceAssetIds.every(id => narrativeRefs.has(id)), `Unknown route asset reference: ${route.id}`);
  const pilot = pilots.pilots.find(x => x.uid === route.uid);
  check(route.combatPilotReference?.uid === pilot?.uid && route.combatPilotReference?.finisherId === pilot?.newFinisherDesign.id && route.combatPilotReference?.finisherName === pilot?.newFinisherDesign.name, `Combat/narrative pilot association mismatch: ${route.id}`);
  for (const [index, encounter] of route.encounters.entries()) {
    check(encounter.playerUid === route.uid && documentedUids.has(encounter.opponentUid), `Unknown encounter actor: ${encounter.id}`);
    check(encounter.index === index + 1, `Encounter order mismatch: ${encounter.id}`);
    check(encounter.stageBinding.sourceAssetIds.every(id => narrativeRefs.has(id)), `Unknown encounter asset reference: ${encounter.id}`);
    if (index < 7) check(encounter.next === route.encounters[index + 1].id, `Broken encounter progression: ${encounter.id}`);
  }
}
check(narrative.rivalries.length === 8 && unique(narrative.rivalries.map(x => x.id)), 'Rivalry count/uniqueness mismatch.');
for (const rivalry of narrative.rivalries) check(documentedUids.has(rivalry.playerUid) && documentedUids.has(rivalry.opponentUid) && sceneIds.has(rivalry.sceneId), `Unknown rivalry actor/scene: ${rivalry.id}`);
for (const chapter of chapters) {
  check(documentedUids.has(chapter.uid) && chapter.opponents.every(uid => documentedUids.has(uid)), `Unknown campaign actor: ${chapter.id}`);
  check(chapter.sceneIds.every(id => sceneIds.has(id)) && chapter.sources.every(id => sourceIds.has(id)), `Unknown campaign scene/source: ${chapter.id}`);
  check(chapter.sourceAssetIds.every(id => narrativeRefs.has(id)), `Unknown campaign asset reference: ${chapter.id}`);
}
check(sceneIds.has(narrative.campaign.prologueSceneId) && sceneIds.has(narrative.campaign.epilogueSceneId), 'Missing campaign framing scenes.');
for (const scene of scenes) {
  check(routeIds.has(scene.owner) || scene.owner === narrative.campaign.id, `Unknown scene owner: ${scene.id}`);
  check(scene.castUids.every(uid => documentedUids.has(uid)), `Unknown scene actor: ${scene.id}`);
  check(scene.sourceIds.every(id => sourceIds.has(id)), `Unknown scene source: ${scene.id}`);
  check(scene.runtimeStatus === 'not_integrated' && scene.visualStatus === 'brief_written_image_not_generated', `Scene falsely produced/admitted: ${scene.id}`);
  for (const shot of scene.shots) {
    check(shot.imagePath === null && shot.imageStatus === 'brief_written_image_not_generated', `Shot falsely produced: ${shot.id}`);
    check(shot.stageReferenceAssetIds.every(id => narrativeRefs.has(id)), `Unknown shot asset reference: ${shot.id}`);
    for (const dialogue of shot.dialogue) check(dialogue.authorship === 'project_creation' && dialogue.officialQuotation === false, `Original dialogue misclassified: ${shot.id}`);
  }
}
for (const ref of narrativeRefs.values()) {
  const asset = assets.find(x => x.path === ref.path);
  check(asset && asset.gitBlobSha === ref.gitBlobSha && asset.pass === ref.pass, `Narrative asset byte identity mismatch: ${ref.id}`);
  check(ref.fullNarrativeShot === false && ref.certified1to1 === false && ref.runtimeAdmissionByBible === false, `Narrative reference incorrectly admitted: ${ref.id}`);
  const use = asset?.narrativeUses?.find(x => x.referenceId === ref.id);
  check(use && use.assetId === asset.assetId && use.fullNarrativeShot === false && use.runtimeAdmissionByThisAssociation === false, `Missing reciprocal narrative use: ${ref.id}`);
  if (!use) continue;
  check(sameSet(use.routeIds, routes.filter(x => x.sourceAssetIds.includes(ref.id)).map(x => x.id)), `Narrative route association mismatch: ${ref.id}`);
  check(sameSet(use.pilotUids, routes.filter(x => x.sourceAssetIds.includes(ref.id)).map(x => x.uid)), `Narrative pilot association mismatch: ${ref.id}`);
  check(sameSet(use.encounterIds, encounters.filter(x => x.stageBinding.sourceAssetIds.includes(ref.id)).map(x => x.id)), `Narrative encounter association mismatch: ${ref.id}`);
  check(sameSet(use.chapterIds, chapters.filter(x => x.sourceAssetIds.includes(ref.id)).map(x => x.id)), `Narrative chapter association mismatch: ${ref.id}`);
  check(sameSet(use.sceneIds, scenes.filter(x => x.shots.some(shot => shot.stageReferenceAssetIds.includes(ref.id))).map(x => x.id)), `Narrative scene association mismatch: ${ref.id}`);
  check(sameSet(use.shotIds, shots.filter(x => x.stageReferenceAssetIds.includes(ref.id)).map(x => x.id)), `Narrative shot association mismatch: ${ref.id}`);
}
check(associations.narrativeAssociations.sourcesLinked === narrativeRefs.size && associations.narrativeAssociations.shotBriefs === shots.length, 'Narrative association summary mismatch.');

const report = {
  validation: errors.length ? 'failed' : 'passed',
  guideSections: guide.sections.length, requirements: guide.requirements.length,
  sourceImages: assets.length, newP62Images: p62.length, archivesExcluded: archives.length,
  historicalScopes: scopes.length, auxiliaryScopes: auxiliary.length,
  rosterBaseProfiles: roster.fighters.length, pilotProfiles: pilots.pilots.length,
  narrativeDocumentedUids: documentedUids.size, narrativeRoutes: routes.length,
  narrativeEncounters: encounters.length, campaignChapters: chapters.length,
  narrativeSequences: scenes.length, narrativeShotBriefs: shots.length,
  narrativeSourceReferences: narrativeRefs.size, newNarrativeImages: n.newSceneImagesGenerated,
  scope: 'Document integrity, identity, counters and associations; no functional gameplay or fidelity certification.',
  errors,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
