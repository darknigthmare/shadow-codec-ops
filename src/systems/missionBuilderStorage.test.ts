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
    expect(profile.era).toBe('mgs1');
    expect(profile.visualPackId).toBe('mgs1');
    expect(profile.playerTexture).toBe('player');
  });

  it('derives and persists an MG2 visual pack for legacy documents without the new field', () => {
    const legacyDocument = {
      ...createBlankMissionBuilderDocument(),
      era: 'msx' as const,
      environment: 'facility' as const,
      location: 'Zanzibar Land',
      mainCharacter: 'solid_snake_mg2'
    };
    Reflect.deleteProperty(legacyDocument, 'visualPackId');

    const sanitized = sanitizeMissionBuilderDocument(legacyDocument);
    expect(sanitized?.visualPackId).toBe('mg2');

    const profile = convertBuilderDocumentToSideOpsProfile(sanitized!);
    expect(profile.era).toBe('msx');
    expect(profile.visualPackId).toBe('mg2');
    expect(profile.playerTexture).toBe('playerSolidSnakeMg2');
    expect(profile.guardTexture).toBe('mg2ZanzibarSoldier');
    expect(profile.reinforcementTexture).toBe('mg2ZanzibarEliteReinforcement');
    expect(profile.boss.texture).toBe('mg2MetalGearD');
  });

  it('keeps Ground Zeroes and The Phantom Pain as distinct MGSV visual packs', () => {
    const groundZeroes = sanitizeMissionBuilderDocument({
      ...createBlankMissionBuilderDocument(),
      era: 'mgsv',
      environment: 'facility',
      location: 'Camp Omega',
      mainCharacter: 'big_boss_gz',
      visualPackId: undefined
    });
    const phantomPain = sanitizeMissionBuilderDocument({
      ...createBlankMissionBuilderDocument(),
      era: 'mgsv',
      environment: 'facility',
      location: 'Afghanistan',
      mainCharacter: 'venom_snake',
      visualPackId: undefined
    });

    expect(groundZeroes?.visualPackId).toBe('mgsv_ground_zeroes');
    expect(phantomPain?.visualPackId).toBe('mgsv_phantom_pain');
    const groundZeroesProfile = convertBuilderDocumentToSideOpsProfile(groundZeroes!);
    expect(groundZeroesProfile.playerTexture).toBe('playerBigBossGroundZeroes');
    expect(groundZeroesProfile.guardTexture).toBe('mgsvGzXofGuard');
    expect(groundZeroesProfile.reinforcementTexture).toBe('mgsvGzXofHeavyReinforcement');
    expect(groundZeroesProfile.boss.texture).toBe('mgsvGzStoutIfvSc');
    const phantomPainProfile = convertBuilderDocumentToSideOpsProfile(phantomPain!);
    expect(phantomPainProfile.playerTexture).toBe('playerVenomSnakeMgsv');
    expect(phantomPainProfile.guardTexture).toBe('mgsvTppSovietAfghanistanSoldier');
    expect(phantomPainProfile.reinforcementTexture).toBe('mgsvTppSkullHeavyReinforcement');
    expect(phantomPainProfile.boss.texture).toBe('mgsvTppSahelanthropus');
  });

  it('propagates a compatible explicit visual pack to the runtime profile', () => {
    const profile = convertBuilderDocumentToSideOpsProfile({
      ...createBlankMissionBuilderDocument(),
      era: 'msx',
      environment: 'facility',
      location: 'Zanzibar Land',
      mainCharacter: 'Unknown operative',
      visualPackId: 'mg2'
    });

    expect(profile.era).toBe('msx');
    expect(profile.visualPackId).toBe('mg2');
    expect(profile.playerTexture).toBe('playerSolidSnakeMg2');
  });

  it('converts an MGS4 Builder mission to the dedicated PMC and Gekko runtime textures', () => {
    const profile = convertBuilderDocumentToSideOpsProfile({
      ...createBlankMissionBuilderDocument(),
      era: 'mgs4',
      environment: 'facility',
      location: 'Middle East war zone',
      mainCharacter: 'old_snake',
      visualPackId: 'mgs4'
    });

    expect(profile.visualPackId).toBe('mgs4');
    expect(profile.playerTexture).toBe('playerOldSnakeMgs4');
    expect(profile.guardTexture).toBe('mgs4PmcSoldier');
    expect(profile.reinforcementTexture).toBe('mgs4PmcHeavyReinforcement');
    expect(profile.boss.texture).toBe('mgs4Gekko');
  });

  it('converts an MGS2 Plant mission to the dedicated Big Shell runtime textures', () => {
    const profile = convertBuilderDocumentToSideOpsProfile({
      ...createBlankMissionBuilderDocument(),
      era: 'mgs2',
      environment: 'facility',
      location: 'Big Shell',
      mainCharacter: 'raiden_mgs2',
      visualPackId: 'mgs2_plant'
    });

    expect(profile.visualPackId).toBe('mgs2_plant');
    expect(profile.playerTexture).toBe('playerRaidenMgs2');
    expect(profile.guardTexture).toBe('mgs2PlantGurlukovichGuard');
    expect(profile.reinforcementTexture).toBe('mgs2PlantTenguReinforcement');
    expect(profile.boss.texture).toBe('mgs2PlantMetalGearRay');
  });

  it('converts an MGS2 Tanker mission to Gurlukovich forces and Olga', () => {
    const profile = convertBuilderDocumentToSideOpsProfile({
      ...createBlankMissionBuilderDocument(),
      era: 'mgs2',
      environment: 'tanker',
      location: 'Hudson River tanker',
      mainCharacter: 'solid_snake_mgs2',
      visualPackId: 'mgs2_tanker'
    });

    expect(profile.visualPackId).toBe('mgs2_tanker');
    expect(profile.playerTexture).toBe('playerTanker');
    expect(profile.guardTexture).toBe('mgs2TankerGurlukovichGuard');
    expect(profile.reinforcementTexture).toBe('mgs2TankerGurlukovichHeavyReinforcement');
    expect(profile.boss.texture).toBe('mgs2TankerOlgaGurlukovich');
  });

  it('converts an MGS3 Builder mission to the dedicated 1964 runtime textures', () => {
    const document = {
      ...createBlankMissionBuilderDocument(),
      era: 'mgs3' as const,
      environment: 'jungle' as const,
      mainCharacter: 'naked_snake_mgs3'
    };
    const profile = convertBuilderDocumentToSideOpsProfile(document);
    expect(profile.visualPackId).toBe('mgs3');
    expect(profile.playerTexture).toBe('playerNakedSnakeMgs3');
    expect(profile.guardTexture).toBe('mgs3OcelotUnitSoldier');
    expect(profile.reinforcementTexture).toBe('mgs3GruHeavyReinforcement');
    expect(profile.boss.texture).toBe('mgs3Shagohod');
  });

  it('converts a Peace Walker Builder mission to Peace Sentinels and PUPA', () => {
    const profile = convertBuilderDocumentToSideOpsProfile({
      ...createBlankMissionBuilderDocument(),
      era: 'peace_walker',
      environment: 'jungle',
      location: 'Costa Rica',
      mainCharacter: 'big_boss_pw',
      visualPackId: 'peace_walker'
    });

    expect(profile.visualPackId).toBe('peace_walker');
    expect(profile.playerTexture).toBe('playerBigBossPeaceWalker');
    expect(profile.guardTexture).toBe('peaceWalkerPeaceSentinelSoldier');
    expect(profile.reinforcementTexture).toBe('peaceWalkerPeaceSentinelHeavyReinforcement');
    expect(profile.boss.texture).toBe('peaceWalkerPupa');
  });

  it('converts a Patriots AI Builder mission to corrupted Arsenal and GW assets', () => {
    const profile = convertBuilderDocumentToSideOpsProfile({
      ...createBlankMissionBuilderDocument(),
      era: 'patriots_ai',
      environment: 'facility',
      location: 'Arsenal Gear',
      mainCharacter: 'raiden_corrupted',
      visualPackId: 'patriots_ai'
    });

    expect(profile.visualPackId).toBe('patriots_ai');
    expect(profile.playerTexture).toBe('playerRaidenMgs2');
    expect(profile.guardTexture).toBe('patriotsAiCorruptedArsenalGuard');
    expect(profile.reinforcementTexture).toBe('patriotsAiCorruptedTenguReinforcement');
    expect(profile.boss.texture).toBe('patriotsAiGwColonelAiCore');
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
