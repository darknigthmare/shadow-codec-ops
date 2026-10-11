export type Mgs1ActorAnimationState =
  | 'idle'
  | 'move'
  | 'attack'
  | 'interact'
  | 'crouch'
  | 'melee'
  | 'reload'
  | 'slash'
  | 'vanish'
  | 'psychic'
  | 'snipe'
  | 'missile'
  | 'laser'
  | 'railgun'
  | 'hit'
  | 'death';

export type Mgs1ActorAnimationProfile =
  | 'snake'
  | 'npc'
  | 'genome'
  | 'heavy'
  | 'dog'
  | 'camera'
  | 'humanBoss'
  | 'ocelot'
  | 'ninja'
  | 'mantis'
  | 'sniper'
  | 'raven'
  | 'liquid'
  | 'tank'
  | 'hind'
  | 'rex'
  | 'jeep'
  | 'snowmobile';

export interface Mgs1ActorAnimationClip {
  readonly start: number;
  readonly end: number;
  readonly frameRate: number;
  readonly repeat: number;
}

export interface Mgs1ActorAnimationAsset {
  /** Texture used by the static MGS1 asset registry (or legacy `player`). */
  readonly sourceTextureKey: string;
  /** Dedicated Phaser spritesheet texture. */
  readonly textureKey: string;
  readonly path: string;
  readonly sourceWidth: number;
  readonly sourceHeight: number;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly frameCount: number;
  readonly profile: Mgs1ActorAnimationProfile;
  readonly clips: Readonly<Partial<Record<Mgs1ActorAnimationState, Mgs1ActorAnimationClip>>>;
}

const snakeClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  crouch: { start: 11, end: 12, frameRate: 5, repeat: -1 },
  melee: { start: 13, end: 15, frameRate: 11, repeat: 0 },
  hit: { start: 16, end: 17, frameRate: 10, repeat: 0 },
  death: { start: 18, end: 22, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const npcClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 8, repeat: -1 },
  interact: { start: 6, end: 7, frameRate: 5, repeat: 0 },
  hit: { start: 8, end: 9, frameRate: 10, repeat: 0 },
  death: { start: 10, end: 13, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const genomeClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 17, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const heavyClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 7, repeat: -1 },
  attack: { start: 6, end: 9, frameRate: 11, repeat: 0 },
  hit: { start: 10, end: 11, frameRate: 10, repeat: 0 },
  death: { start: 12, end: 16, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const dogClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 10, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 12, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 16, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const cameraClips = {
  idle: { start: 0, end: 3, frameRate: 5, repeat: -1 },
  attack: { start: 4, end: 6, frameRate: 10, repeat: 0 },
  hit: { start: 7, end: 8, frameRate: 10, repeat: 0 },
  death: { start: 9, end: 12, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const humanBossClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 17, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const ocelotClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 11, repeat: 0 },
  reload: { start: 11, end: 13, frameRate: 8, repeat: 0 },
  hit: { start: 14, end: 15, frameRate: 10, repeat: 0 },
  death: { start: 16, end: 20, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const ninjaClips = {
  idle: { start: 0, end: 2, frameRate: 5, repeat: -1 },
  move: { start: 3, end: 8, frameRate: 11, repeat: -1 },
  slash: { start: 9, end: 12, frameRate: 13, repeat: 0 },
  vanish: { start: 13, end: 15, frameRate: 12, repeat: 0 },
  hit: { start: 16, end: 17, frameRate: 11, repeat: 0 },
  death: { start: 18, end: 22, frameRate: 8, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const mantisClips = {
  idle: { start: 0, end: 3, frameRate: 5, repeat: -1 },
  move: { start: 4, end: 7, frameRate: 7, repeat: -1 },
  psychic: { start: 8, end: 11, frameRate: 9, repeat: -1 },
  attack: { start: 12, end: 14, frameRate: 10, repeat: 0 },
  hit: { start: 15, end: 16, frameRate: 10, repeat: 0 },
  death: { start: 17, end: 21, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const sniperClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 7, repeat: -1 },
  snipe: { start: 6, end: 9, frameRate: 8, repeat: 0 },
  hit: { start: 10, end: 11, frameRate: 10, repeat: 0 },
  death: { start: 12, end: 16, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const ravenClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 7, repeat: -1 },
  attack: { start: 6, end: 9, frameRate: 12, repeat: 0 },
  hit: { start: 10, end: 11, frameRate: 10, repeat: 0 },
  death: { start: 12, end: 16, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const liquidClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 9, repeat: -1 },
  melee: { start: 8, end: 11, frameRate: 12, repeat: 0 },
  attack: { start: 12, end: 14, frameRate: 10, repeat: 0 },
  hit: { start: 15, end: 16, frameRate: 10, repeat: 0 },
  death: { start: 17, end: 21, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const tankClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 6, repeat: -1 },
  attack: { start: 6, end: 8, frameRate: 8, repeat: 0 },
  hit: { start: 9, end: 10, frameRate: 10, repeat: 0 },
  death: { start: 11, end: 15, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const hindClips = {
  idle: { start: 0, end: 3, frameRate: 8, repeat: -1 },
  move: { start: 4, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 17, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const rexClips = {
  idle: { start: 0, end: 3, frameRate: 4, repeat: -1 },
  move: { start: 4, end: 7, frameRate: 6, repeat: -1 },
  missile: { start: 8, end: 10, frameRate: 8, repeat: 0 },
  laser: { start: 11, end: 13, frameRate: 9, repeat: 0 },
  railgun: { start: 14, end: 16, frameRate: 8, repeat: 0 },
  hit: { start: 17, end: 18, frameRate: 10, repeat: 0 },
  death: { start: 19, end: 25, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const jeepClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 8, repeat: -1 },
  attack: { start: 6, end: 8, frameRate: 10, repeat: 0 },
  hit: { start: 9, end: 10, frameRate: 10, repeat: 0 },
  death: { start: 11, end: 15, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

const snowmobileClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 9, repeat: -1 },
  hit: { start: 8, end: 9, frameRate: 10, repeat: 0 },
  death: { start: 10, end: 14, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1ActorAnimationAsset['clips'];

export const MGS1_ACTOR_ANIMATION_ASSETS = [
  { sourceTextureKey: 'player', textureKey: 'playerMgs1Anim', path: '/sideops/mgs1/animations/characters/solid-snake-mgs1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 23, profile: 'snake', clips: snakeClips },

  { sourceTextureKey: 'mgs1MerylSilverburgh', textureKey: 'mgs1MerylSilverburghAnim', path: '/sideops/mgs1/animations/npcs/meryl-silverburgh-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mgs1Otacon', textureKey: 'mgs1OtaconAnim', path: '/sideops/mgs1/animations/npcs/otacon-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mgs1DonaldAnderson', textureKey: 'mgs1DonaldAndersonAnim', path: '/sideops/mgs1/animations/npcs/donald-anderson-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mgs1KennethBaker', textureKey: 'mgs1KennethBakerAnim', path: '/sideops/mgs1/animations/npcs/kenneth-baker-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mgs1JohnnySasaki', textureKey: 'mgs1JohnnySasakiAnim', path: '/sideops/mgs1/animations/npcs/johnny-sasaki-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },

  { sourceTextureKey: 'mgs1GenomeLightInfantry', textureKey: 'mgs1GenomeLightInfantryAnim', path: '/sideops/mgs1/animations/enemies/genome-light-infantry-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 18, profile: 'genome', clips: genomeClips },
  { sourceTextureKey: 'mgs1GenomeArcticTrooper', textureKey: 'mgs1GenomeArcticTrooperAnim', path: '/sideops/mgs1/animations/enemies/genome-arctic-trooper-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 18, profile: 'genome', clips: genomeClips },
  { sourceTextureKey: 'mgs1GenomeNbcTrooper', textureKey: 'mgs1GenomeNbcTrooperAnim', path: '/sideops/mgs1/animations/enemies/genome-nbc-trooper-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 18, profile: 'genome', clips: genomeClips },
  { sourceTextureKey: 'mgs1GenomeHeavyTrooper', textureKey: 'mgs1GenomeHeavyTrooperAnim', path: '/sideops/mgs1/animations/enemies/genome-heavy-trooper-sheet.png', sourceWidth: 40, sourceHeight: 56, frameWidth: 64, frameHeight: 56, frameCount: 17, profile: 'heavy', clips: heavyClips },
  { sourceTextureKey: 'mgs1WolfDog', textureKey: 'mgs1WolfDogAnim', path: '/sideops/mgs1/animations/enemies/wolf-dog-sheet.png', sourceWidth: 40, sourceHeight: 24, frameWidth: 48, frameHeight: 24, frameCount: 17, profile: 'dog', clips: dogClips },
  { sourceTextureKey: 'mgs1GunCamera', textureKey: 'mgs1GunCameraAnim', path: '/sideops/mgs1/animations/enemies/gun-camera-sheet.png', sourceWidth: 30, sourceHeight: 20, frameWidth: 40, frameHeight: 20, frameCount: 13, profile: 'camera', clips: cameraClips },

  { sourceTextureKey: 'mgs1RevolverOcelot', textureKey: 'mgs1RevolverOcelotAnim', path: '/sideops/mgs1/animations/bosses/revolver-ocelot-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 21, profile: 'ocelot', clips: ocelotClips },
  { sourceTextureKey: 'mgs1DecoyOctopus', textureKey: 'mgs1DecoyOctopusAnim', path: '/sideops/mgs1/animations/bosses/decoy-octopus-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: humanBossClips },
  { sourceTextureKey: 'mgs1CyborgNinja', textureKey: 'mgs1CyborgNinjaAnim', path: '/sideops/mgs1/animations/bosses/cyborg-ninja-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 23, profile: 'ninja', clips: ninjaClips },
  { sourceTextureKey: 'mgs1PsychoMantis', textureKey: 'mgs1PsychoMantisAnim', path: '/sideops/mgs1/animations/bosses/psycho-mantis-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 22, profile: 'mantis', clips: mantisClips },
  { sourceTextureKey: 'mgs1SniperWolf', textureKey: 'mgs1SniperWolfAnim', path: '/sideops/mgs1/animations/bosses/sniper-wolf-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 17, profile: 'sniper', clips: sniperClips },
  { sourceTextureKey: 'mgs1VulcanRaven', textureKey: 'mgs1VulcanRavenAnim', path: '/sideops/mgs1/animations/bosses/vulcan-raven-sheet.png', sourceWidth: 56, sourceHeight: 72, frameWidth: 72, frameHeight: 72, frameCount: 17, profile: 'raven', clips: ravenClips },
  { sourceTextureKey: 'mgs1LiquidSnake', textureKey: 'mgs1LiquidSnakeAnim', path: '/sideops/mgs1/animations/bosses/liquid-snake-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 22, profile: 'liquid', clips: liquidClips },

  { sourceTextureKey: 'mgs1M1Tank', textureKey: 'mgs1M1TankAnim', path: '/sideops/mgs1/animations/vehicles/m1-tank-sheet.png', sourceWidth: 112, sourceHeight: 64, frameWidth: 128, frameHeight: 64, frameCount: 16, profile: 'tank', clips: tankClips },
  { sourceTextureKey: 'mgs1HindD', textureKey: 'mgs1HindDAnim', path: '/sideops/mgs1/animations/vehicles/hind-d-sheet.png', sourceWidth: 144, sourceHeight: 72, frameWidth: 160, frameHeight: 72, frameCount: 18, profile: 'hind', clips: hindClips },
  { sourceTextureKey: 'mgs1MetalGearRex', textureKey: 'mgs1MetalGearRexAnim', path: '/sideops/mgs1/animations/vehicles/metal-gear-rex-sheet.png', sourceWidth: 128, sourceHeight: 144, frameWidth: 160, frameHeight: 144, frameCount: 26, profile: 'rex', clips: rexClips },
  { sourceTextureKey: 'mgs1EscapeJeep', textureKey: 'mgs1EscapeJeepAnim', path: '/sideops/mgs1/animations/vehicles/escape-jeep-sheet.png', sourceWidth: 112, sourceHeight: 56, frameWidth: 128, frameHeight: 56, frameCount: 16, profile: 'jeep', clips: jeepClips },
  { sourceTextureKey: 'mgs1Snowmobile', textureKey: 'mgs1SnowmobileAnim', path: '/sideops/mgs1/animations/vehicles/snowmobile-sheet.png', sourceWidth: 96, sourceHeight: 48, frameWidth: 112, frameHeight: 48, frameCount: 15, profile: 'snowmobile', clips: snowmobileClips }
] as const satisfies readonly Mgs1ActorAnimationAsset[];

const animationAssetBySourceTexture = new Map<string, Mgs1ActorAnimationAsset>(
  MGS1_ACTOR_ANIMATION_ASSETS.map((asset) => [asset.sourceTextureKey, asset])
);

const animationAssetByTexture = new Map<string, Mgs1ActorAnimationAsset>(
  MGS1_ACTOR_ANIMATION_ASSETS.map((asset) => [asset.textureKey, asset])
);

export function getMgs1ActorAnimationAssetBySourceTexture(sourceTextureKey: string): Mgs1ActorAnimationAsset | undefined {
  return animationAssetBySourceTexture.get(sourceTextureKey);
}

export function getMgs1ActorAnimationAssetByTexture(textureKey: string): Mgs1ActorAnimationAsset | undefined {
  return animationAssetByTexture.get(textureKey);
}

/** Global Phaser animation keys remain deterministic and MGS1-scoped. */
export function getMgs1ActorAnimationKey(textureKey: string, state: Mgs1ActorAnimationState): string {
  return `mgs1:${textureKey}:${state}`;
}
