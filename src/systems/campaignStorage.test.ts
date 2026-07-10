import { beforeEach, describe, expect, it } from 'vitest';
import campaignsJson from '../data/campaigns.json';
import type { CampaignDefinition, CampaignProgress } from '../types/campaign.types';
import {
  campaignUpgrades,
  chooseCampaignBranch,
  createDefaultCampaignProgress,
  exportCampaignSlot,
  getCampaignLoadoutBonuses,
  getCampaignNodeStatus,
  importCampaignSlot,
  loadCampaignProgress,
  purchaseCampaignUpgrade,
  reconcileCampaignProgress,
  saveCampaignProgress,
  startCampaignNewGamePlus,
  isCampaignNodeConditionMet
} from './campaignStorage';

const campaigns = campaignsJson as CampaignDefinition[];

beforeEach(() => {
  window.localStorage.clear();

});

describe('campaign progression', () => {
  it('completes connected nodes and grants rewards only once', () => {
    const base = createDefaultCampaignProgress(campaigns);
    const withCall: CampaignProgress = {
      ...base,
      evidence: {
        ...base.evidence,
        codecContactIds: ['campbell_mgs1']
      }
    };

    const first = reconcileCampaignProgress(withCall, campaigns);
    expect(first.completedNodeIds).toContain('legacy_campbell_briefing');
    expect(first.unlockedMissionIds).toContain('shadow_dock_001');
    expect(first.xp).toBe(75);
    expect(first.resources.credits).toBe(100);

    const second = reconcileCampaignProgress(first, campaigns);
    expect(second.xp).toBe(first.xp);
    expect(second.claimedRewardIds.filter((id) => id === 'legacy_campbell_briefing')).toHaveLength(1);
  });

  it('enforces minimum ranks for Side Ops and VR nodes', () => {
    const base = createDefaultCampaignProgress(campaigns);
    const precompleted: CampaignProgress = {
      ...base,
      completedNodeIds: ['legacy_campbell_briefing'],
      claimedRewardIds: ['legacy_campbell_briefing'],
      evidence: {
        ...base.evidence,
        sideOps: [{ missionId: 'shadow_dock_001', rank: 'DOBERMAN', score: 700, timeSeconds: 180, completedAt: new Date().toISOString() }]
      }
    };
    const blocked = reconcileCampaignProgress(precompleted, campaigns);
    expect(blocked.completedNodeIds).not.toContain('legacy_shadow_dock_clear');

    const qualified = reconcileCampaignProgress({
      ...blocked,
      evidence: {
        ...blocked.evidence,
        sideOps: [{ missionId: 'shadow_dock_001', rank: 'HOUND', score: 760, timeSeconds: 160, completedAt: new Date().toISOString() }]
      }
    }, campaigns);
    expect(qualified.completedNodeIds).toContain('legacy_shadow_dock_clear');
    expect(qualified.unlockedVrMissionIds).toContain('vr_dock_sprint_001');
  });

  it('purchases permanent loadout upgrades with campaign resources', () => {
    const base = createDefaultCampaignProgress(campaigns);
    saveCampaignProgress({
      ...base,
      resources: { commandPoints: 5, intel: 200, supplies: 200, credits: 2000 }
    });

    const upgrade = campaignUpgrades[0];
    const result = purchaseCampaignUpgrade(upgrade.id);
    expect(result.success).toBe(true);
    expect(result.progress.purchasedUpgradeIds).toContain(upgrade.id);
    expect(getCampaignLoadoutBonuses().ammo).toBe(upgrade.bonuses.ammo);
  });

  it('keeps campaign slots isolated and supports portable save import/export', () => {
    saveCampaignProgress({
      ...createDefaultCampaignProgress(campaigns),
      xp: 900,
      level: 2,
      badges: ['slot-one-badge']
    }, 'slot_1');

    const payload = exportCampaignSlot('slot_1');
    const imported = importCampaignSlot(payload, 'slot_2');

    expect(imported.xp).toBe(900);
    expect(imported.badges).toContain('slot-one-badge');
    expect(loadCampaignProgress('slot_1').xp).toBe(900);

    saveCampaignProgress({ ...imported, xp: 1400, level: 3 }, 'slot_2');
    expect(loadCampaignProgress('slot_2').xp).toBe(1400);
    expect(loadCampaignProgress('slot_1').xp).toBe(900);
  });

  it('commits an exclusive branch, blocks the opposite route and records an ending', () => {
    const base = createDefaultCampaignProgress(campaigns);
    const ready = saveCampaignProgress({
      ...base,
      completedNodeIds: ['legacy_campaign_complete'],
      claimedRewardIds: ['legacy_campaign_complete']
    });
    expect(ready.branchChoices).toEqual({});

    const nodes = campaigns.flatMap((campaign) => campaign.chapters.flatMap((chapter) => chapter.nodes));
    const ghostChoice = nodes.find((node) => node.id === 'legacy_doctrine_ghost');
    const assaultChoice = nodes.find((node) => node.id === 'legacy_doctrine_assault');
    expect(ghostChoice).toBeTruthy();
    expect(assaultChoice).toBeTruthy();

    const chosen = chooseCampaignBranch(ghostChoice!);
    expect(chosen.success).toBe(true);
    expect(chosen.progress.branchChoices.legacy_final_doctrine).toBe('ghost');
    expect(chosen.progress.completedNodeIds).toContain('legacy_doctrine_ghost');
    expect(getCampaignNodeStatus(assaultChoice!, chosen.progress)).toBe('blocked');

    const withEndingEvidence = reconcileCampaignProgress({
      ...chosen.progress,
      evidence: {
        ...chosen.progress.evidence,
        vr: [{ missionId: 'vr_ghost_dock_002', rank: 'FOXHOUND', score: 9999, timeSeconds: 60, completedAt: new Date().toISOString() }]
      }
    }, campaigns);
    expect(withEndingEvidence.completedNodeIds).toContain('legacy_ending_silent_signal');
    expect(withEndingEvidence.achievedEndingIds).toContain('legacy_silent_signal');
    expect(withEndingEvidence.achievedEndingIds).not.toContain('legacy_open_signal');
  });


  it('evaluates multiple conditions with AND and OR logic', () => {
    const base = createDefaultCampaignProgress(campaigns);
    const node = {
      id: 'multi_condition_node',
      title: 'Multi Condition',
      description: 'Test node',
      module: 'campaign' as const,
      prerequisites: [],
      condition: { type: 'badge_owned' as const, badge: 'ALPHA' },
      additionalConditions: [{ type: 'resource_minimum' as const, resource: 'intel' as const, amount: 10 }],
      conditionLogic: 'all' as const,
      reward: {}
    };
    expect(isCampaignNodeConditionMet(node, { ...base, badges: ['ALPHA'], resources: { ...base.resources, intel: 5 } })).toBe(false);
    expect(isCampaignNodeConditionMet({ ...node, conditionLogic: 'any' }, { ...base, badges: ['ALPHA'], resources: { ...base.resources, intel: 5 } })).toBe(true);
  });

  it('starts New Game+ while preserving upgrades and discovered endings', () => {
    const base = createDefaultCampaignProgress(campaigns);
    saveCampaignProgress({
      ...base,
      xp: 1800,
      resources: { commandPoints: 4, intel: 100, supplies: 80, credits: 900 },
      achievedEndingIds: ['legacy_silent_signal'],
      purchasedUpgradeIds: ['campaign_socom_reserve'],
      completedNodeIds: ['legacy_ending_silent_signal'],
      claimedRewardIds: ['legacy_ending_silent_signal']
    });
    const result = startCampaignNewGamePlus();
    expect(result.success).toBe(true);
    expect(result.progress.newGamePlusCycle).toBe(1);
    expect(result.progress.completedNodeIds).toHaveLength(0);
    expect(result.progress.achievedEndingIds).toContain('legacy_silent_signal');
    expect(result.progress.purchasedUpgradeIds).toContain('campaign_socom_reserve');
    expect(result.progress.xp).toBe(1800);
  });

});
