import { beforeEach, describe, expect, it } from 'vitest';
import { getStorageKey } from './saveEngine';
import { CURRENT_SAVE_SCHEMA, runSaveMigrations } from './saveMigrations';

describe('save migrations', () => {
  beforeEach(() => window.localStorage.clear());

  it('moves legacy unprefixed data into the application namespace', () => {
    window.localStorage.setItem('sideops-active-mission-id', JSON.stringify('tanker_hold_002'));
    const report = runSaveMigrations();
    expect(window.localStorage.getItem('sideops-active-mission-id')).toBeNull();
    expect(window.localStorage.getItem(getStorageKey('sideops-active-mission-id'))).toBe(JSON.stringify('tanker_hold_002'));
    expect(report.migratedKeys).toContain('sideops-active-mission-id');
  });

  it('upgrades legacy settings with controls and accessibility defaults', () => {
    window.localStorage.setItem(getStorageKey('settings'), JSON.stringify({ selectedTheme: 'msx_terminal' }));
    const report = runSaveMigrations();
    const settings = JSON.parse(window.localStorage.getItem(getStorageKey('settings')) ?? '{}') as Record<string, unknown>;
    expect(report.toVersion).toBe(CURRENT_SAVE_SCHEMA);
    expect(settings.selectedTheme).toBe('msx_terminal');
    expect(settings.keyboardBindings).toBeTruthy();
    expect(settings.gamepadEnabled).toBe(true);
  });

  it('adds branching, ending and narrative fields to legacy campaign saves', () => {
    window.localStorage.setItem(getStorageKey('save-schema-version'), JSON.stringify(5));
    window.localStorage.setItem(getStorageKey('campaign-progress-slot_1'), JSON.stringify({ completedNodeIds: [], schemaVersion: 1 }));
    const report = runSaveMigrations();
    const progress = JSON.parse(window.localStorage.getItem(getStorageKey('campaign-progress-slot_1')) ?? '{}') as Record<string, unknown>;
    expect(report.toVersion).toBe(14);
    expect(progress.schemaVersion).toBe(3);
    expect(progress.branchChoices).toEqual({});
    expect(progress.achievedEndingIds).toEqual([]);
    expect(progress.newGamePlusCycle).toBe(0);
    expect(progress.variables).toEqual({});
    expect(progress.seenPresentationIds).toEqual([]);
    expect(progress.presentationHistory).toEqual([]);
  });


  it('normalizes legacy Codec call history for Core Fidelity', () => {
    window.localStorage.setItem(getStorageKey('save-schema-version'), JSON.stringify(10));
    window.localStorage.setItem(getStorageKey('call-history'), JSON.stringify([{ callId: 'old', completed: false }]));
    const report = runSaveMigrations();
    const history = JSON.parse(window.localStorage.getItem(getStorageKey('call-history')) ?? '[]') as Array<Record<string, unknown>>;
    expect(report.toVersion).toBe(14);
    expect(history[0].disposition).toBe('aborted');
  });


  it('initializes persistent radio intelligence state', () => {
    window.localStorage.setItem(getStorageKey('save-schema-version'), JSON.stringify(11));
    const report = runSaveMigrations();
    const radioState = JSON.parse(window.localStorage.getItem(getStorageKey('radio-intelligence-state')) ?? '{}') as Record<string, unknown>;
    expect(report.toVersion).toBe(14);
    expect(radioState.schemaVersion).toBe(1);
    expect(radioState.discoveries).toEqual({});
    expect(radioState.scanCount).toBe(0);
  });


  it('initializes replay library and stream overlay migration', () => {
    const report = runSaveMigrations();
    const replayLibrary = JSON.parse(window.localStorage.getItem(getStorageKey('codec-replay-library')) ?? 'null');
    expect(report.toVersion).toBe(14);
    expect(replayLibrary).toEqual({ schemaVersion: 1, records: [], autoArchive: true });
  });

});
