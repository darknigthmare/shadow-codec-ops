import { describe, expect, it } from 'vitest';
import {
  convertBuilderDocumentToMissionDefinition,
  convertBuilderDocumentToSideOpsProfile,
  createBlankMissionBuilderDocument,
  createMissionContentPack,
  parseMissionBuilderImport,
  sanitizeMissionBuilderDocument,
  validateMissionBuilderDocument
} from './missionBuilderStorage';

describe('mission builder content pipeline', () => {
  it('creates a playable default document without validation errors', () => {
    const document = createBlankMissionBuilderDocument();
    const errors = validateMissionBuilderDocument(document).filter((issue) => issue.severity === 'error');
    expect(errors).toEqual([]);
  });

  it('converts a builder document into a Side Ops mission definition', () => {
    const document = createBlankMissionBuilderDocument();
    const mission = convertBuilderDocumentToMissionDefinition(document);
    expect(mission.source).toBe('builder');
    expect(mission.mode).toBe('side_scroller');
    expect(mission.objectives.length).toBeGreaterThanOrEqual(5);
  });

  it('converts placed entities into a runtime mission profile', () => {
    const document = createBlankMissionBuilderDocument();
    const profile = convertBuilderDocumentToSideOpsProfile(document);
    expect(profile.worldWidth).toBe(document.worldWidth);
    expect(profile.platforms.length).toBeGreaterThan(0);
    expect(profile.guards.length).toBeGreaterThan(0);
    expect(profile.boss.hp).toBe(10);
    expect(profile.codec.missionStart.contactId).toBe('campbell_mgs1');
    expect(profile.playerTexture).toBe('player');
  });

  it('resolves Builder player art from era and main character aliases', () => {
    const document = {
      ...createBlankMissionBuilderDocument(),
      era: 'mgs3' as const,
      environment: 'jungle' as const,
      mainCharacter: 'naked_snake_mgs3'
    };
    const profile = convertBuilderDocumentToSideOpsProfile(document);
    expect(profile.playerTexture).toBe('playerNakedSnakeMgs3');
    expect(profile.guardTexture).toBe('guard');
    expect(profile.reinforcementTexture).toBe('reinforcementGuard');
    expect(profile.boss.texture).toBe('bossCaptain');
  });

  it('uses the VR Side Ops role pack for VR Builder environments', () => {
    const document = {
      ...createBlankMissionBuilderDocument(),
      era: 'vr_simulation' as const,
      environment: 'vr' as const,
      mainCharacter: 'vr_operative'
    };
    const profile = convertBuilderDocumentToSideOpsProfile(document);
    expect(profile.playerTexture).toBe('vrPlayer');
    expect(profile.guardTexture).toBe('vrGuard');
    expect(profile.reinforcementTexture).toBe('vrGuard');
    expect(profile.boss.texture).toBe('vrBoss');
  });

  it('sanitizes imported positions and numeric limits', () => {
    const source = createBlankMissionBuilderDocument();
    const imported = sanitizeMissionBuilderDocument({
      ...source,
      worldWidth: 500,
      difficulty: 99,
      environment: 'invalid_environment',
      entities: source.entities.map((entity, index) => ({ ...entity, x: index === 0 ? 99999 : entity.x }))
    });
    expect(imported?.worldWidth).toBe(1600);
    expect(imported?.difficulty).toBe(5);
    expect(imported?.entities[0].x).toBe(1600);
    expect(imported?.environment).toBe('facility');
  });

  it('exports and imports a versioned mission content pack', () => {
    const document = createBlankMissionBuilderDocument();
    const pack = createMissionContentPack([document], { name: 'QA Pack' });
    const imported = parseMissionBuilderImport(pack);
    expect(pack.schemaVersion).toBe(1);
    expect(pack.dependencies.contacts).toContain('campbell_mgs1');
    expect(imported).toHaveLength(1);
    expect(imported[0].id).toBe(document.id);
  });
});
