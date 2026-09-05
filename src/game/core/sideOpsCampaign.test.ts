import { describe, expect, it } from 'vitest';
import contacts from '../../data/contacts.json';
import conversations from '../../data/conversations.json';
import { SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES } from './sideOpsVisualPackRuntime';
import { createDefaultCampaignProgress, getCampaignDefinitions, loadCampaignProgress, saveCampaignProgress } from '../../systems/campaignStorage';
import { evaluateSideOpsCampaignChallenges, getSideOpsCampaignExtractionBlocker, getSideOpsCampaignMission, getSideOpsCampaignSector, resolveSideOpsCampaignProfile, SIDEOPS_CAMPAIGN_CONVERSATIONS, SIDEOPS_CAMPAIGN_DEFINITION, SIDEOPS_CAMPAIGN_MISSIONS, SIDEOPS_CAMPAIGN_OPERATIONS, type SideOpsCampaignRunSnapshot } from './sideOpsCampaign';

const clearSnapshot: SideOpsCampaignRunSnapshot = { hasKeycard: true, bossDefeated: true, secretsFound: 3, alerts: 0, kills: 0, damageTaken: 0, timeSeconds: 100 };

describe('Tactical Anthology content', () => {
  it('provides two different playable operations for every visual pack', () => {
    expect(SIDEOPS_CAMPAIGN_MISSIONS).toHaveLength(24);
    expect(new Set(SIDEOPS_CAMPAIGN_MISSIONS.map((mission) => mission.id)).size).toBe(24);
    for (const pack of Object.keys(SIDEOPS_VISUAL_PACK_RUNTIME_TEXTURES)) {
      const operations = SIDEOPS_CAMPAIGN_OPERATIONS.filter((mission) => mission.profile.visualPackId === pack);
      expect(operations).toHaveLength(2);
      expect(operations[0].profile.platforms).not.toEqual(operations[1].profile.platforms);
      expect(operations[0].rules.bossRequired).toBe(false);
      expect(operations[1].rules.bossRequired).toBe(true);
    }
  });

  it('places credentials before locked gates and collectibles on reachable routes', () => {
    for (const { profile, rules } of SIDEOPS_CAMPAIGN_OPERATIONS) {
      expect(profile.start.x).toBeLessThan(profile.keycard.x);
      expect(profile.keycard.x).toBeLessThan(profile.door.x - 35);
      expect(profile.completionX.openDoor).toBeGreaterThan(profile.door.x);
      expect(profile.completionX.crossYard).toBeLessThan(profile.completionX.bossArena);
      expect(profile.completionX.bossArena).toBeLessThan(profile.boss.x);
      expect(profile.boss.x).toBeLessThan(profile.elevator.x);
      for (const object of [profile.keycard, ...profile.secrets, ...profile.pickups]) {
        expect(object.x, profile.id).toBeGreaterThan(0);
        expect(object.x, profile.id).toBeLessThan(profile.worldWidth);
        expect(profile.platforms.some((p) => object.x >= p.x - p.scaleX * 32 && object.x <= p.x + p.scaleX * 32 && p.y > object.y)).toBe(true);
      }
      const floor = profile.platforms.find((p) => p.y === 520)!;
      expect(floor.x - floor.scaleX * 32).toBe(0);
      expect(floor.x + floor.scaleX * 32).toBe(profile.worldWidth);
      // First steps rise 85px; maximum jump height is approximately 103px.
      expect(profile.platforms.filter((p) => p.y === 435).length).toBeGreaterThanOrEqual(5);
      expect(profile.guards.length).toBeGreaterThanOrEqual(5);
      for (const guard of profile.guards) {
        expect(guard.patrolMin).toBeLessThanOrEqual(guard.x);
        expect(guard.x).toBeLessThanOrEqual(guard.patrolMax);
        expect(guard.patrolMin).toBeGreaterThan(0);
        expect(guard.patrolMax).toBeLessThan(profile.worldWidth);
      }
      expect(rules.minimumSecrets).toBeLessThanOrEqual(profile.secrets.length);
      expect(profile.totalObjectives).toBe(profile.initialObjectives.length + Object.keys(profile.stageLabels).length - (rules.bossRequired ? 0 : 1));
    }
  });

  it('connects reconnaissance clears to combat unlocks and persistent campaign rewards', () => {
    const campaign = SIDEOPS_CAMPAIGN_DEFINITION;
    expect(campaign.chapters).toHaveLength(12);
    expect(campaign.initialUnlocks.missionIds).toHaveLength(12);
    for (const chapter of campaign.chapters) {
      const [recon, assault] = chapter.nodes;
      expect(recon.prerequisites).toEqual([]);
      expect(assault.prerequisites).toEqual([recon.id]);
      expect(recon.reward.unlockMissionIds).toContain(assault.targetId);
      expect(assault.reward.badges).toHaveLength(1);
      for (const node of chapter.nodes) {
        expect(node.condition).toEqual({ type: 'sideops_clear', missionId: node.targetId });
        expect(getSideOpsCampaignMission(node.targetId)).toBeDefined();
      }
    }
  });

  it('routes support to existing contacts and conversations of the correct era', () => {
    for (const { profile } of SIDEOPS_CAMPAIGN_OPERATIONS) {
      for (const call of Object.values(profile.codec)) {
        expect(contacts.find((c) => c.id === call.contactId), call.contactId).toBeDefined();
        const conversation = [...conversations, ...SIDEOPS_CAMPAIGN_CONVERSATIONS].find((c) => c.id === call.conversationId);
        expect(conversation, call.conversationId).toBeDefined();
        expect(conversation?.era).toBe(profile.era);
        expect(conversation?.contactId).toBe(call.contactId);
      }
    }
  });

  it('gives Ground Zeroes its own operation dialogue with no 1984 narrative leakage', () => {
    const gzCalls = SIDEOPS_CAMPAIGN_CONVERSATIONS.filter((c) => c.subjectId?.startsWith('sideops_mgsv_ground_zeroes_'));
    expect(gzCalls.length).toBeGreaterThan(0);
    expect(gzCalls.every((c) => c.id.startsWith('sideops_mgsv_ground_zeroes_'))).toBe(true);
    expect(gzCalls.flatMap((c) => c.lines.map((line) => line.text)).join(' ')).not.toMatch(/Venom|Diamond Dogs|1984|Sahelanthropus|Ocelot/i);
  });
});

describe('Tactical Anthology objective rules', () => {
  it('persists a reconnaissance clear, unlocks combat and does not duplicate its reward', () => {
    window.localStorage.clear();
    expect(getCampaignDefinitions().some((c) => c.id === SIDEOPS_CAMPAIGN_DEFINITION.id)).toBe(true);
    const initial = createDefaultCampaignProgress([SIDEOPS_CAMPAIGN_DEFINITION]);
    const progress = saveCampaignProgress({ ...initial, evidence: { ...initial.evidence, sideOps: [{ missionId: 'sideops_mg1_recon', rank: 'HOUND', score: 840, timeSeconds: 200, completedAt: new Date().toISOString() }] } });
    expect(progress.activeCampaignId).toBe(SIDEOPS_CAMPAIGN_DEFINITION.id);
    expect(progress.completedNodeIds).toContain('node_sideops_mg1_recon');
    expect(progress.unlockedMissionIds).toContain('sideops_mg1_assault');
    expect(progress.xp).toBe(240);
    const reloaded = loadCampaignProgress();
    expect(reloaded.xp).toBe(240);
    expect(reloaded.claimedRewardIds.filter((id) => id === 'node_sideops_mg1_recon')).toHaveLength(1);
    window.localStorage.clear();
  });

  it('allows reconnaissance extraction without a boss and requires intelligence recovery', () => {
    expect(getSideOpsCampaignExtractionBlocker('sideops_mg2_recon', { ...clearSnapshot, bossDefeated: false })).toBeNull();
    expect(getSideOpsCampaignExtractionBlocker('sideops_mg2_recon', { ...clearSnapshot, secretsFound: 1 })).toContain('1 more');
    expect(getSideOpsCampaignExtractionBlocker('sideops_mg2_recon', { ...clearSnapshot, hasKeycard: false })).toContain('credentials');
  });

  it('requires boss completion in combat and three data nodes in VR', () => {
    expect(getSideOpsCampaignExtractionBlocker('sideops_mg2_assault', { ...clearSnapshot, bossDefeated: false })).toContain('Metal Gear D');
    expect(getSideOpsCampaignExtractionBlocker('sideops_mg2_assault', { ...clearSnapshot, secretsFound: 1 })).toBeNull();
    expect(getSideOpsCampaignExtractionBlocker('sideops_vr_simulation_recon', { ...clearSnapshot, secretsFound: 2 })).toContain('1 more');
  });

  it('keeps mastery challenges optional so a poor run never soft-locks extraction', () => {
    const badRun = { ...clearSnapshot, alerts: 2, kills: 3, damageTaken: 40, timeSeconds: 600, secretsFound: 2 };
    expect(evaluateSideOpsCampaignChallenges('sideops_mg1_recon', clearSnapshot).every((c) => c.completed)).toBe(true);
    expect(evaluateSideOpsCampaignChallenges('sideops_mg1_recon', badRun).every((c) => !c.completed)).toBe(true);
    expect(getSideOpsCampaignExtractionBlocker('sideops_mg1_recon', badRun)).toBeNull();
  });

  it('resolves exact sector boundaries and handles unknown missions safely', () => {
    const operation = SIDEOPS_CAMPAIGN_OPERATIONS[0];
    expect(getSideOpsCampaignSector(operation.id, 0)?.id).toBe(operation.sectors[0].id);
    expect(getSideOpsCampaignSector(operation.id, operation.sectors[0].toX)?.id).toBe(operation.sectors[1].id);
    expect(getSideOpsCampaignSector(operation.id, operation.profile.worldWidth)?.id).toBe(operation.sectors[4].id);
    expect(resolveSideOpsCampaignProfile(operation.id)).toBe(operation.profile);
    expect(resolveSideOpsCampaignProfile('unknown')).toBeNull();
    expect(getSideOpsCampaignExtractionBlocker('unknown', clearSnapshot)).toBeNull();
    expect(evaluateSideOpsCampaignChallenges('unknown', clearSnapshot)).toEqual([]);
  });
});
