import { beforeEach, describe, expect, it } from 'vitest';
import { BUILT_IN_CONTENT_LINK_CATALOG, BUILT_IN_SIDE_OPS_MISSIONS, getSideOpsLinksForRecord, prepareContentLinkTarget, resolveContentLink } from './contentLinks';
import { SIDEOPS_CAMPAIGN_MISSIONS } from '../game/core/sideOpsCampaign';
import { getStorageKey, loadJson, saveJson } from './saveEngine';
import { loadVrProgress } from './vrStorage';
import { consumeCampaignLaunchDirective } from './campaignStorage';

beforeEach(() => window.localStorage.clear());

describe('existing content links', () => {
  it('makes every authored Side Ops operation addressable by its exact ID', () => {
    expect(SIDEOPS_CAMPAIGN_MISSIONS.length).toBeGreaterThan(20);
    for (const mission of BUILT_IN_SIDE_OPS_MISSIONS) {
      expect(resolveContentLink({ type: 'mission', id: mission.id })).toEqual({ route: 'sideops', targetId: mission.id, era: mission.era });
    }
  });

  it('selects the requested operation rather than the last played mission', () => {
    saveJson('sideops-active-mission-id', 'shadow_dock_001');
    const target = resolveContentLink({ type: 'mission', id: 'tanker_hold_002' })!;
    expect(prepareContentLinkTarget(target)).toBe('sideops');
    expect(loadJson('sideops-active-mission-id', '')).toBe('tanker_hold_002');
    expect(Object.keys(window.localStorage)).toEqual([getStorageKey('sideops-active-mission-id')]);
  });

  it('prepares the exact conversation and its own contact incarnation', () => {
    const target = resolveContentLink({ type: 'conversation', id: 'mgs1_campbell_default' })!;
    expect(target).toEqual({ route: 'codec', targetId: 'campbell_mgs1', era: 'mgs1', conversationId: 'mgs1_campbell_default' });
    expect(prepareContentLinkTarget(target)).toBe('codec');
    expect(consumeCampaignLaunchDirective('codec')).toMatchObject({ module: 'codec', targetId: target.targetId, era: target.era, conversationId: target.conversationId });
    expect(loadJson('call-history', [])).toEqual([]);
    expect(loadJson('codec-memory', [])).toEqual([]);
  });

  it('keeps the contact identity on shared frequencies', () => {
    expect(resolveContentLink({ type: 'frequency', id: 'frequency_campbell_mgs1' })?.targetId).toBe('campbell_mgs1');
    expect(resolveContentLink({ type: 'contact', id: 'campbell_mgs4' })?.targetId).toBe('campbell_mgs4');
    expect(BUILT_IN_CONTENT_LINK_CATALOG.contacts.find(contact => contact.id === 'campbell_mgs4')?.manualCallAllowed).toBe(false);
  });

  it('rejects unknown targets without inventing a fallback mission or conversation', () => {
    for (const type of ['mission', 'vr', 'tape', 'contact', 'frequency', 'conversation', 'boss', 'enemy', 'item'] as const) {
      expect(resolveContentLink({ type, id: 'not_an_admitted_identity' })).toBeUndefined();
    }
    expect(window.localStorage.length).toBe(0);
  });

  it('routes Olga to her Tanker encounter and keeps boss records as dossiers', () => {
    const links = getSideOpsLinksForRecord('boss', 'olga_gurlukovich_tanker');
    expect(links.map(link => link.id)).toContain('tanker_hold_002');
    expect(links.map(link => link.id)).not.toContain('shadow_dock_001');
    expect(resolveContentLink({ type: 'boss', id: 'olga_gurlukovich_tanker' })).toEqual({ route: 'lore', targetId: 'boss_olga_gurlukovich_tanker' });
    expect(getSideOpsLinksForRecord('boss', 'big_boss_mg1').map(link => link.id)).toContain('outer_heaven_intrude_n313');
  });

  it('keeps existing VR records, unlocks and legacy unlock storage byte-for-byte', () => {
    const progress = { records: [], unlockedTapeIds: ['already_earned_tape'], unlockedBadges: ['earned_badge'], activeMissionId: 'old_mission' };
    saveJson('vr-mission-progress', progress);
    saveJson('vr-unlocked-tapes', ['legacy_earned_tape']);
    saveJson('campaign-progress', { protected: 'untouched' });
    const legacy = window.localStorage.getItem(getStorageKey('vr-unlocked-tapes'));
    const campaign = window.localStorage.getItem(getStorageKey('campaign-progress'));
    const mission = BUILT_IN_CONTENT_LINK_CATALOG.vrMissions[BUILT_IN_CONTENT_LINK_CATALOG.vrMissions.length - 1];
    prepareContentLinkTarget(resolveContentLink({ type: 'vr', id: mission.id })!);
    expect(loadVrProgress()).toEqual({ ...progress, activeMissionId: mission.id });
    expect(window.localStorage.getItem(getStorageKey('vr-unlocked-tapes'))).toBe(legacy);
    expect(window.localStorage.getItem(getStorageKey('campaign-progress'))).toBe(campaign);
  });

  it('recognizes existing VR IDs in cassette relatedMission fields', () => {
    expect(resolveContentLink({ type: 'mission', id: 'vr_dock_sprint_001' })).toMatchObject({ route: 'vr', targetId: 'vr_dock_sprint_001' });
    expect(resolveContentLink({ type: 'mission', id: 'vr_not_in_the_catalog' })).toBeUndefined();
  });

  it('opens existing modules from their exact authored system-link identities', () => {
    const routes = {
      lore_system_tape_archive: 'tapes', tape_archive: 'tapes',
      lore_system_conversation_studio: 'studio', conversation_studio: 'studio',
      lore_codec_system: 'codec', codec_simulator: 'codec',
      lore_campaign_ops_progression: 'campaign',
      lore_mission_builder_pipeline: 'builder',
      lore_campaign_builder_system: 'campaignBuilder'
    };
    for (const [id, route] of Object.entries(routes)) {
      expect(resolveContentLink({ type: 'system', id })).toEqual({ route });
    }
    for (const id of ['lore_system_save_engine', 'lore_system_rank_engine', 'lore_system_theme_engine', 'vrStorage']) {
      expect(resolveContentLink({ type: 'system', id })).toEqual({ route: 'settings' });
    }
    expect(resolveContentLink({ type: 'system', id: 'constructor' })).toEqual({ route: 'settings' });
    expect(window.localStorage.length).toBe(0);
  });

  it('selects a locked tape without awarding it or marking it listened', () => {
    const locked = BUILT_IN_CONTENT_LINK_CATALOG.tapes.find(tape => tape.unlockState !== 'unlocked')!;
    expect(locked).toBeDefined();
    prepareContentLinkTarget(resolveContentLink({ type: 'tape', id: locked.id })!);
    expect(consumeCampaignLaunchDirective('tapes')?.targetId).toBe(locked.id);
    expect(loadJson('tape-archive-state', null)).toBeNull();
    expect(loadJson('vr-unlocked-tapes', [])).toEqual([]);
    expect(locked.unlockState).not.toBe('unlocked');
  });
});
