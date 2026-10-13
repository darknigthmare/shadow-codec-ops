import { describe, expect, it } from 'vitest';
import campaignsJson from '../data/campaigns.json';
import type { CampaignDefinition, CampaignNodeDefinition, CampaignProgress } from '../types/campaign.types';
import { createDefaultCampaignProgress } from './campaignStorage';
import {
  acknowledgeCampaignPresentation,
  applyCampaignVariableMutations,
  calculateCampaignStatistics,
  collectPendingCampaignPresentations,
  isNarrativeConditionMet
} from './campaignNarrative';

const campaign = (campaignsJson as CampaignDefinition[])[0];

describe('campaign narrative presentation layer', () => {
  it('queues the campaign and first chapter briefings for a fresh slot', () => {
    const progress = createDefaultCampaignProgress([campaign]);
    const queue = collectPendingCampaignPresentations(campaign, progress);
    expect(queue.some((item) => item.presentation.id === 'legacy_signal_campaign_briefing')).toBe(true);
    expect(queue.some((item) => item.presentation.id === 'chapter_shadow_moses_briefing')).toBe(true);
  });

  it('acknowledges a presentation, records history and applies variables once', () => {
    const progress = createDefaultCampaignProgress([campaign]);
    const item = {
      queueId: 'test:event:card',
      campaignId: campaign.id,
      sourceType: 'event' as const,
      sourceId: 'test_event',
      presentation: { id: 'test_card', title: 'Test Card', tone: 'system' as const, body: 'Test.' },
      variableEffects: [{ variable: 'network.integrity', operation: 'decrement' as const, value: 10 }]
    };
    const next = acknowledgeCampaignPresentation(progress, item);
    expect(next.seenPresentationIds).toContain(item.queueId);
    expect(next.presentationHistory[0].presentationId).toBe('test_card');
    expect(next.variables['network.integrity']).toBe(90);
    const queue = collectPendingCampaignPresentations(campaign, next);
    expect(queue.some((entry) => entry.queueId === item.queueId)).toBe(false);
  });

  it('evaluates persistent variable conditions', () => {
    const progress = createDefaultCampaignProgress([campaign]);
    expect(isNarrativeConditionMet({ type: 'variable_compare', variable: 'network.integrity', operator: 'gte', value: 90 }, undefined, progress)).toBe(true);
    expect(isNarrativeConditionMet({ type: 'variable_compare', variable: 'network.integrity', operator: 'lt', value: 50 }, undefined, progress)).toBe(false);
  });

  it('applies set, increment, decrement and toggle mutations', () => {
    const result = applyCampaignVariableMutations({ score: 10, flag: false }, [
      { variable: 'score', operation: 'increment', value: 5 },
      { variable: 'score', operation: 'decrement', value: 3 },
      { variable: 'flag', operation: 'toggle' },
      { variable: 'route', operation: 'set', value: 'ghost' }
    ]);
    expect(result).toMatchObject({ score: 12, flag: true, route: 'ghost' });
  });

  it('queues node completion and ending epilogue cards without applying node mutations twice', () => {
    const progress = {
      ...createDefaultCampaignProgress([campaign]),
      completedNodeIds: ['legacy_shadow_dock_clear', 'legacy_ending_silent_signal'],
      achievedEndingIds: ['legacy_silent_signal']
    };
    const queue = collectPendingCampaignPresentations(campaign, progress);
    const nodeCard = queue.find((item) => item.presentation.id === 'legacy_shadow_dock_complete');
    expect(nodeCard).toBeTruthy();
    expect(nodeCard?.variableEffects).toBeUndefined();
    expect(queue.some((item) => item.presentation.id === 'legacy_silent_signal_epilogue')).toBe(true);
  });

  it('calculates complete cross-module campaign statistics', () => {
    const base = createDefaultCampaignProgress([campaign]);
    const progress: CampaignProgress = {
      ...base,
      completedNodeIds: ['legacy_campbell_briefing'],
      claimedRewardIds: ['legacy_campbell_briefing'],
      branchChoices: { legacy_final_doctrine: 'ghost' },
      achievedEndingIds: ['legacy_silent_signal'],
      presentationHistory: [{
        id: 'history_1',
        presentationId: 'briefing',
        campaignId: campaign.id,
        sourceType: 'campaign' as const,
        sourceId: campaign.id,
        title: 'Briefing',
        tone: 'briefing' as const,
        viewedAt: new Date().toISOString()
      }],
      evidence: {
        ...base.evidence,
        sideOps: [{ missionId: 'shadow_dock_001', rank: 'FOX', score: 900, timeSeconds: 100, completedAt: new Date().toISOString() }],
        vr: [{ missionId: 'vr_dock_sprint_001', rank: 'HOUND', score: 700, timeSeconds: 80, completedAt: new Date().toISOString() }],
        codecContactIds: ['campbell_mgs1'],
        listenedTapeIds: ['tape_side_ops_design_log_001'],
        viewedLoreIds: ['lore_shadow_moses']
      }
    };
    const stats = calculateCampaignStatistics(campaign, progress);
    expect(stats.nodesCompleted).toBe(1);
    expect(stats.branchesCommitted).toBe(1);
    expect(stats.endingsUnlocked).toBe(1);
    expect(stats.bestSideOpsRank).toBe('FOX');
    expect(stats.sideOpsScoreTotal).toBe(900);
    expect(stats.vrTimeSeconds).toBe(80);
  });

  it('supports variable conditions on campaign nodes', () => {
    const base = createDefaultCampaignProgress([campaign]);
    const node: CampaignNodeDefinition = {
      id: 'variable_gate',
      title: 'Variable Gate',
      description: 'Test variable gate.',
      module: 'campaign',
      prerequisites: [],
      condition: { type: 'variable_compare', variable: 'doctrine.selected', operator: 'eq', value: 'uncommitted' },
      reward: {}
    };
    expect(isNarrativeConditionMet(node.condition, node, base)).toBe(true);
  });
});
