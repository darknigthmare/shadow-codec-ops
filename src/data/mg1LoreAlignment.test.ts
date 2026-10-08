import { describe, expect, it } from 'vitest';
import { bossToLoreEntry, type BossRecord } from '../components/lore/LoreDatabase';
import { MG1_ENCOUNTER_SEQUENCE } from '../game/core/mg1OuterHeavenMission';
import { getSpeakerLabel } from '../systems/conversationEngine';
import bossesJson from './bosses.json';
import contactsJson from './contacts.json';

describe('MG1 Lore and runtime metadata alignment', () => {
  it('uses the original MG1 Schneider label everywhere', () => {
    const schneider = contactsJson.find((contact) => contact.id === 'schneider_mg1');

    expect(schneider?.name).toBe('Schneider');
    expect(getSpeakerLabel('schneider')).toBe('Schneider');
  });

  it('keeps dedicated Mission 003 boss health aligned with its encounter units', () => {
    const bosses = bossesJson as BossRecord[];

    for (const encounter of MG1_ENCOUNTER_SEQUENCE) {
      const boss = bosses.find((entry) => entry.id === encounter.bossDataId);
      expect(boss, encounter.bossDataId).toBeDefined();
      expect(boss?.runtimeStatus, encounter.bossDataId).toBe('dedicated_mission_003');
      expect(boss?.health, encounter.bossDataId).toBe(encounter.hpPerUnit * encounter.unitCount);
    }
  });

  it('routes dedicated MG1 boss Lore entries to Operation Intrude N313', () => {
    const bosses = (bossesJson as BossRecord[]).filter((boss) => boss.runtimeStatus === 'dedicated_mission_003');

    expect(bosses).toHaveLength(MG1_ENCOUNTER_SEQUENCE.length);
    for (const boss of bosses) {
      const entry = bossToLoreEntry(boss);
      expect(entry.details).toContain('Playable in the dedicated Operation Intrude N313 Mission 003 runtime.');
      expect(entry.related).toContainEqual({
        type: 'mission',
        id: 'outer_heaven_intrude_n313',
        label: 'Operation Intrude N313'
      });
      expect(entry.related).not.toContainEqual(expect.objectContaining({ id: 'shadow_dock_001' }));
    }
  });
});
