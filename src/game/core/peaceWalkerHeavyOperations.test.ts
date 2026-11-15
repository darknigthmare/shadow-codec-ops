import { describe, expect, it } from 'vitest';
import { createDefaultCampaignProgress, getCampaignNodeStatus, reconcileCampaignProgress } from '../../systems/campaignStorage';
import { getSideOpsCampaignExtractionBlocker, getSideOpsCampaignMission, SIDEOPS_CAMPAIGN_CONVERSATIONS, SIDEOPS_CAMPAIGN_DEFINITION } from './sideOpsCampaign';
import { resolveSideOpsRuntimeScene } from '../../systems/sideOpsRuntimeResolver';

const ids = ['sideops_peace_walker_basilisk', 'sideops_peace_walker_zeke'] as const;
const supplementalIds = ['sideops_peace_walker_chrysalis', 'sideops_peace_walker_cocoon'] as const;
const allHeavyIds = [...supplementalIds, ...ids];
const campaign = SIDEOPS_CAMPAIGN_DEFINITION;

describe('Peace Walker heavy-operation expansion', () => {
  it('adds distinct accessible operations without replacing Pupa or mixing machine identities', () => {
    const pupa = getSideOpsCampaignMission('sideops_peace_walker_assault')!;
    expect(pupa.profile.boss.texture).toBe('peaceWalkerPupa');
    const heavy = allHeavyIds.map((id) => getSideOpsCampaignMission(id)!);
    expect(heavy.map((op) => op.profile.boss.texture)).toEqual(['peaceWalkerChrysalis', 'peaceWalkerCocoon', 'peaceWalkerBasilisk', 'peaceWalkerZeke']);
    expect(new Set([pupa, ...heavy].map((op) => JSON.stringify(op.profile.platforms))).size).toBe(5);
    for (const op of heavy) {
      expect(op.definition.enemies).toContain(op.profile.boss.texture);
      expect(op.profile.playerTexture).toBe(pupa.profile.playerTexture);
      expect(op.profile.era).toBe('peace_walker');
      expect(op.profile.visualPackId).toBe('peace_walker');
      expect(op.designNotes).toContain('Not a canonical');
      expect(resolveSideOpsRuntimeScene(op.id)).toBe('SideOpsScene');
    }
  });

  it('keeps wide unobstructed ranges, grounded chassis and a reachable airborne target', () => {
    for (const id of allHeavyIds) {
      const { profile, sectors } = getSideOpsCampaignMission(id)!;
      const [width, height] = id.endsWith('zeke') ? [128, 144] : id.endsWith('chrysalis') ? [176, 112] : id.endsWith('cocoon') ? [208, 144] : [176, 128];
      if (id.endsWith('chrysalis')) {
        expect(profile.boss.y).toBe(374);
        expect(profile.boss.y + height / 2).toBe(430);
        // At the apex of the existing jump, a horizontal shot crosses the body.
        // No new aiming mode or invisible ground-only hitbox is required.
        const jumpShotY = 488 - 430 ** 2 / (2 * 900) - 10;
        expect(jumpShotY).toBeGreaterThan(profile.boss.y - height / 2);
        expect(jumpShotY).toBeLessThan(profile.boss.y + height / 2);
      } else expect(profile.boss.y + height / 2).toBe(512);
      expect(sectors[3].toX - sectors[3].fromX).toBeGreaterThanOrEqual(1600);
      const corridorMin = profile.completionX.bossArena + 180;
      const corridorMax = sectors[3].toX - 180;
      for (const p of profile.platforms.filter((p) => p.y < 520)) {
        expect(p.x + p.scaleX * 32 <= corridorMin || p.x - p.scaleX * 32 >= corridorMax).toBe(true);
      }
      for (const crate of profile.crates) {
        expect(crate.x < corridorMin || crate.x > corridorMax).toBe(true);
      }
      expect(profile.boss.x - width / 2).toBeGreaterThan(corridorMin);
      expect(profile.boss.x + width / 2).toBeLessThan(corridorMax);
      expect(profile.pickups.filter((p) => p.kind === 'ammo').length).toBeGreaterThanOrEqual(3);
      expect(profile.pickups.some((p) => p.kind === 'ammo' && p.x < profile.completionX.bossArena && p.x > profile.completionX.bossArena - 300)).toBe(true);
      expect(profile.secrets).toHaveLength(3);
      expect(profile.keycard.x).toBeLessThan(profile.door.x - 35);
    }
  });

  it('preserves Pupa to Basilisk to ZEKE and adds an optional Chrysalis to Cocoon branch', () => {
    const chapter = campaign.chapters.find((item) => item.id === 'sideops_chapter_peace_walker')!;
    expect(chapter.nodes.map((n) => n.targetId)).toEqual(['sideops_peace_walker_recon', 'sideops_peace_walker_assault', ...allHeavyIds]);
    expect(new Set(chapter.nodes.map((n) => n.layout?.x)).size).toBe(6);
    const parentByMission = {
      sideops_peace_walker_assault: 'sideops_peace_walker_recon',
      sideops_peace_walker_chrysalis: 'sideops_peace_walker_assault',
      sideops_peace_walker_cocoon: 'sideops_peace_walker_chrysalis',
      sideops_peace_walker_basilisk: 'sideops_peace_walker_assault',
      sideops_peace_walker_zeke: 'sideops_peace_walker_basilisk'
    };
    for (const [missionId, parentId] of Object.entries(parentByMission)) {
      const node = chapter.nodes.find(n => n.targetId === missionId)!;
      const parent = chapter.nodes.find(n => n.targetId === parentId)!;
      expect(node.prerequisites).toEqual([parent.id]);
      expect(parent.reward.unlockMissionIds).toContain(node.targetId);
    }
    for (const id of supplementalIds) {
      const node = chapter.nodes.find(n => n.targetId === id)!;
      expect(node.optional).toBe(true);
      expect(node.layout?.y).toBe(140);
    }
    expect(chapter.nodes.find(n => n.targetId === ids[0])!.optional).toBeUndefined();
    expect(chapter.nodes.find(n => n.targetId === ids[1])!.reward.unlockMissionIds).toEqual([]);
    expect(chapter.nodes.find(n => n.targetId === supplementalIds[1])!.reward.unlockMissionIds).toEqual([]);
  });

  it('migrates old Pupa clears into the new unlock without duplicating old rewards', () => {
    const base = createDefaultCampaignProgress([campaign]);
    const oldIds = ['node_sideops_peace_walker_recon', 'node_sideops_peace_walker_assault'];
    const old = { ...base, xp: 660, completedNodeIds: oldIds, claimedRewardIds: oldIds, resources: { ...base.resources, intel: 5, supplies: 6, commandPoints: 6 }, unlockedMissionIds: [...base.unlockedMissionIds, 'sideops_peace_walker_assault'] };
    const migrated = reconcileCampaignProgress(old, [campaign]);
    expect(migrated.unlockedMissionIds).toContain(ids[0]);
    expect(migrated.unlockedMissionIds).not.toContain(ids[1]);
    expect(migrated.xp).toBe(660);
    expect(migrated.resources).toEqual(old.resources);
    expect(migrated.claimedRewardIds).toEqual(oldIds);
    const chapter = campaign.chapters.find((c) => c.id === 'sideops_chapter_peace_walker')!;
    expect(migrated.unlockedMissionIds).toContain(supplementalIds[0]);
    expect(migrated.unlockedMissionIds).not.toContain(supplementalIds[1]);
    expect(getCampaignNodeStatus(chapter.nodes.find(n => n.targetId === ids[0])!, migrated)).toBe('active');
    expect(getCampaignNodeStatus(chapter.nodes.find(n => n.targetId === ids[1])!, migrated)).toBe('locked');
    const clear = reconcileCampaignProgress({ ...migrated, evidence: { ...migrated.evidence, sideOps: [{ missionId: ids[0], rank: 'HOUND', score: 900, timeSeconds: 250, completedAt: '2026-09-05T12:00:00Z' }] } }, [campaign]);
    expect(clear.unlockedMissionIds).toContain(ids[1]);
    expect(clear.xp).toBe(1080);
    expect(reconcileCampaignProgress(clear, [campaign]).xp).toBe(clear.xp);
  });

  it('requires credentials, telemetry and the correct boss before extraction', () => {
    for (const id of allHeavyIds) {
      const op = getSideOpsCampaignMission(id)!;
      expect(getSideOpsCampaignExtractionBlocker(id, { hasKeycard: false, secretsFound: 3, bossDefeated: true })).toContain('credentials');
      expect(getSideOpsCampaignExtractionBlocker(id, { hasKeycard: true, secretsFound: 0, bossDefeated: true })).toContain('intelligence');
      expect(getSideOpsCampaignExtractionBlocker(id, { hasKeycard: true, secretsFound: 1, bossDefeated: false })).toContain(op.profile.boss.name);
      expect(getSideOpsCampaignExtractionBlocker(id, { hasKeycard: true, secretsFound: 1, bossDefeated: true })).toBeNull();
    }
  });

  it('ships eighty original Miller support calls tied to the correct operation', () => {
    const calls = SIDEOPS_CAMPAIGN_CONVERSATIONS.filter((c) => allHeavyIds.some((id) => c.subjectId === id));
    expect(calls).toHaveLength(80);
    expect(new Set(calls.map((c) => c.id)).size).toBe(80);
    for (const call of calls) {
      expect(call.contactId).toBe('miller_pw');
      expect(call.era).toBe('peace_walker');
      expect(call.canonStatus).toBe('simulation');
      expect(call.lines.map((l) => l.text).join(' ')).not.toMatch(/Pupa|Diamond Dogs|Venom|1984|Sahelanthropus/i);
    }
  });
});

describe('additive Peace Walker trial save compatibility', () => {
  const chapter = campaign.chapters.find(c => c.id === 'sideops_chapter_peace_walker')!;
  const node = (missionId: string) => chapter.nodes.find(n => n.targetId === missionId)!;
  const pupaClear = () => {
    const base = createDefaultCampaignProgress([campaign]);
    const completed = ['node_sideops_peace_walker_recon', 'node_sideops_peace_walker_assault'];
    return { ...base, xp: 660, completedNodeIds: completed, claimedRewardIds: completed,
      unlockedMissionIds: [...base.unlockedMissionIds, 'sideops_peace_walker_assault', ids[0]] };
  };

  it('never relocks Basilisk already unlocked by an older Pupa reward', () => {
    const old = pupaClear();
    const migrated = reconcileCampaignProgress(old, [campaign]);
    expect(getCampaignNodeStatus(node(ids[0]), migrated)).toBe('active');
    expect(getCampaignNodeStatus(node(supplementalIds[0]), migrated)).toBe('active');
    expect(getCampaignNodeStatus(node(supplementalIds[1]), migrated)).toBe('locked');
    expect(migrated.completedNodeIds).toEqual(old.completedNodeIds);
    expect(migrated.xp).toBe(old.xp);
    expect(migrated.claimedRewardIds).toEqual(old.claimedRewardIds);
  });

  it('keeps an existing Basilisk clear and ZEKE access without auto-clearing either optional trial', () => {
    const base = pupaClear();
    const old = { ...base, xp: 1080, completedNodeIds: [...base.completedNodeIds, node(ids[0]).id],
      claimedRewardIds: [...base.claimedRewardIds, node(ids[0]).id], unlockedMissionIds: [...base.unlockedMissionIds, ids[1]] };
    const migrated = reconcileCampaignProgress(old, [campaign]);
    expect(getCampaignNodeStatus(node(ids[0]), migrated)).toBe('complete');
    expect(getCampaignNodeStatus(node(ids[1]), migrated)).toBe('active');
    expect(getCampaignNodeStatus(node(supplementalIds[0]), migrated)).toBe('active');
    expect(getCampaignNodeStatus(node(supplementalIds[1]), migrated)).toBe('locked');
    expect(migrated.completedNodeIds).toEqual(old.completedNodeIds);
    expect(migrated.xp).toBe(1080);
    expect(migrated.resources).toEqual(old.resources);
    expect(migrated.claimedRewardIds).toEqual(old.claimedRewardIds);
  });

  it('unlocks Cocoon only from a real Chrysalis clear and awards each optional node once', () => {
    let progress = reconcileCampaignProgress(pupaClear(), [campaign]);
    for (let i = 0; i < supplementalIds.length; i++) {
      const missionId = supplementalIds[i];
      expect(getCampaignNodeStatus(node(missionId), progress)).toBe('active');
      progress = reconcileCampaignProgress({ ...progress, evidence: { ...progress.evidence,
        sideOps: [...progress.evidence.sideOps, { missionId, rank: 'HOUND', score: 900, timeSeconds: 250, completedAt: '2026-09-08T12:00:00Z' }] } }, [campaign]);
      expect(progress.completedNodeIds).toContain(node(missionId).id);
      expect(progress.xp).toBe(660 + (i + 1) * 420);
      expect(getCampaignNodeStatus(node(ids[0]), progress)).toBe('active');
      expect(getCampaignNodeStatus(node(ids[1]), progress)).toBe('locked');
      const repeated = reconcileCampaignProgress(progress, [campaign]);
      expect(repeated.xp).toBe(progress.xp);
      expect(repeated.resources).toEqual(progress.resources);
      expect(repeated.claimedRewardIds).toEqual(progress.claimedRewardIds);
    }
  });
});
