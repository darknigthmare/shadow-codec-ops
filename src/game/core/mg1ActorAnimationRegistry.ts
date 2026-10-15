export type Mg1ActorAnimationState =
  | 'idle'
  | 'move'
  | 'attack'
  | 'interact'
  | 'plant'
  | 'remote'
  | 'hit'
  | 'death'
  | 'chargeLeft'
  | 'chargeRight';

export type Mg1ActorAnimationProfile =
  | 'snake'
  | 'npc'
  | 'guard'
  | 'air'
  | 'dog'
  | 'scorpion'
  | 'camera'
  | 'humanBoss'
  | 'hind'
  | 'tank'
  | 'bulldozer'
  | 'truck'
  | 'tx55';

export interface Mg1ActorAnimationClip {
  readonly start: number;
  readonly end: number;
  readonly frameRate: number;
  readonly repeat: number;
}

export interface Mg1ActorAnimationAsset {
  /** Texture already used by MG1 gameplay and kept as the static fallback. */
  readonly sourceTextureKey: string;
  /** Dedicated Phaser spritesheet texture. */
  readonly textureKey: string;
  readonly path: string;
  readonly sourceWidth: number;
  readonly sourceHeight: number;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly frameCount: number;
  readonly profile: Mg1ActorAnimationProfile;
  readonly clips: Readonly<Partial<Record<Mg1ActorAnimationState, Mg1ActorAnimationClip>>>;
}

const snakeClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  plant: { start: 11, end: 13, frameRate: 8, repeat: 0 },
  remote: { start: 14, end: 15, frameRate: 5, repeat: -1 },
  hit: { start: 16, end: 17, frameRate: 10, repeat: 0 },
  death: { start: 18, end: 22, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const npcClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 8, repeat: -1 },
  interact: { start: 6, end: 7, frameRate: 5, repeat: 0 },
  hit: { start: 8, end: 9, frameRate: 10, repeat: 0 },
  death: { start: 10, end: 13, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const guardClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 17, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const airClips = {
  idle: { start: 0, end: 3, frameRate: 6, repeat: -1 },
  move: { start: 4, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 17, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const dogClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 10, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 12, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 16, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const scorpionClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 8, repeat: -1 },
  attack: { start: 6, end: 8, frameRate: 10, repeat: 0 },
  hit: { start: 9, end: 9, frameRate: 10, repeat: 0 },
  death: { start: 10, end: 12, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const cameraClips = {
  idle: { start: 0, end: 3, frameRate: 5, repeat: -1 },
  attack: { start: 4, end: 6, frameRate: 10, repeat: 0 },
  hit: { start: 7, end: 8, frameRate: 10, repeat: 0 },
  death: { start: 9, end: 12, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const tankClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 6, repeat: -1 },
  attack: { start: 6, end: 8, frameRate: 8, repeat: 0 },
  hit: { start: 9, end: 10, frameRate: 10, repeat: 0 },
  death: { start: 11, end: 15, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const constructionVehicleClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 5, frameRate: 6, repeat: -1 },
  attack: { start: 6, end: 7, frameRate: 8, repeat: 0 },
  hit: { start: 8, end: 9, frameRate: 10, repeat: 0 },
  death: { start: 10, end: 14, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

const tx55Clips = {
  idle: { start: 0, end: 3, frameRate: 4, repeat: -1 },
  chargeLeft: { start: 4, end: 5, frameRate: 6, repeat: 0 },
  chargeRight: { start: 6, end: 7, frameRate: 6, repeat: 0 },
  hit: { start: 8, end: 9, frameRate: 10, repeat: 0 },
  death: { start: 10, end: 14, frameRate: 7, repeat: 0 }
} as const satisfies Mg1ActorAnimationAsset['clips'];

export const MG1_ACTOR_ANIMATION_ASSETS = [
  { sourceTextureKey: 'playerSolidSnakeMg1', textureKey: 'playerSolidSnakeMg1Anim', path: '/sideops/mg1/animations/characters/solid-snake-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 23, profile: 'snake', clips: snakeClips },

  { sourceTextureKey: 'mg1OuterHeavenPow', textureKey: 'mg1OuterHeavenPowAnim', path: '/sideops/mg1/animations/npcs/outer-heaven-pow-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mg1GreyFox', textureKey: 'mg1GreyFoxAnim', path: '/sideops/mg1/animations/npcs/grey-fox-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mg1Pettrovich', textureKey: 'mg1PettrovichAnim', path: '/sideops/mg1/animations/npcs/dr-pettrovich-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mg1Elen', textureKey: 'mg1ElenAnim', path: '/sideops/mg1/animations/npcs/elen-pettrovich-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mg1Schneider', textureKey: 'mg1SchneiderAnim', path: '/sideops/mg1/animations/npcs/schneider-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mg1Diane', textureKey: 'mg1DianeAnim', path: '/sideops/mg1/animations/npcs/diane-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },
  { sourceTextureKey: 'mg1Jennifer', textureKey: 'mg1JenniferAnim', path: '/sideops/mg1/animations/npcs/jennifer-mg1-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 14, profile: 'npc', clips: npcClips },

  { sourceTextureKey: 'mg1Guard', textureKey: 'mg1GuardAnim', path: '/sideops/mg1/animations/enemies/outer-heaven-soldier-sheet.png', sourceWidth: 32, sourceHeight: 48, frameWidth: 48, frameHeight: 48, frameCount: 18, profile: 'guard', clips: guardClips },
  { sourceTextureKey: 'mg1AirTrooper', textureKey: 'mg1AirTrooperAnim', path: '/sideops/mg1/animations/enemies/air-trooper-sheet.png', sourceWidth: 40, sourceHeight: 56, frameWidth: 64, frameHeight: 56, frameCount: 18, profile: 'air', clips: airClips },
  { sourceTextureKey: 'mg1AttackDog', textureKey: 'mg1AttackDogAnim', path: '/sideops/mg1/animations/enemies/attack-dog-sheet.png', sourceWidth: 40, sourceHeight: 24, frameWidth: 48, frameHeight: 24, frameCount: 17, profile: 'dog', clips: dogClips },
  { sourceTextureKey: 'mg1Scorpion', textureKey: 'mg1ScorpionAnim', path: '/sideops/mg1/animations/enemies/scorpion-sheet.png', sourceWidth: 16, sourceHeight: 12, frameWidth: 24, frameHeight: 12, frameCount: 13, profile: 'scorpion', clips: scorpionClips },
  { sourceTextureKey: 'mg1GunCamera', textureKey: 'mg1GunCameraAnim', path: '/sideops/mg1/animations/enemies/gun-camera-sheet.png', sourceWidth: 30, sourceHeight: 20, frameWidth: 40, frameHeight: 20, frameCount: 13, profile: 'camera', clips: cameraClips },

  { sourceTextureKey: 'mg1Shotmaker', textureKey: 'mg1ShotmakerAnim', path: '/sideops/mg1/animations/bosses/shotmaker-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: guardClips },
  { sourceTextureKey: 'mg1MachinegunKid', textureKey: 'mg1MachinegunKidAnim', path: '/sideops/mg1/animations/bosses/machinegun-kid-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: guardClips },
  { sourceTextureKey: 'mg1FireTrooper', textureKey: 'mg1FireTrooperAnim', path: '/sideops/mg1/animations/bosses/fire-trooper-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: guardClips },
  { sourceTextureKey: 'mg1BloodyBrad', textureKey: 'mg1BloodyBradAnim', path: '/sideops/mg1/animations/bosses/bloody-brad-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: guardClips },
  { sourceTextureKey: 'mg1DirtyDuck', textureKey: 'mg1DirtyDuckAnim', path: '/sideops/mg1/animations/bosses/dirty-duck-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: guardClips },
  { sourceTextureKey: 'mg1BigBoss', textureKey: 'mg1BigBossAnim', path: '/sideops/mg1/animations/bosses/big-boss-mg1-sheet.png', sourceWidth: 48, sourceHeight: 64, frameWidth: 64, frameHeight: 64, frameCount: 18, profile: 'humanBoss', clips: guardClips },

  { sourceTextureKey: 'mg1HindD', textureKey: 'mg1HindDAnim', path: '/sideops/mg1/animations/vehicles/hind-d-sheet.png', sourceWidth: 128, sourceHeight: 64, frameWidth: 144, frameHeight: 64, frameCount: 18, profile: 'hind', clips: airClips },
  { sourceTextureKey: 'mg1Tank', textureKey: 'mg1TankAnim', path: '/sideops/mg1/animations/vehicles/outer-heaven-tank-sheet.png', sourceWidth: 96, sourceHeight: 56, frameWidth: 112, frameHeight: 56, frameCount: 16, profile: 'tank', clips: tankClips },
  { sourceTextureKey: 'mg1Bulldozer', textureKey: 'mg1BulldozerAnim', path: '/sideops/mg1/animations/vehicles/bulldozer-sheet.png', sourceWidth: 96, sourceHeight: 56, frameWidth: 112, frameHeight: 56, frameCount: 15, profile: 'bulldozer', clips: constructionVehicleClips },
  { sourceTextureKey: 'mg1TransportTruck', textureKey: 'mg1TransportTruckAnim', path: '/sideops/mg1/animations/vehicles/transport-truck-sheet.png', sourceWidth: 96, sourceHeight: 56, frameWidth: 112, frameHeight: 56, frameCount: 15, profile: 'truck', clips: constructionVehicleClips },
  { sourceTextureKey: 'mg1Tx55', textureKey: 'mg1Tx55Anim', path: '/sideops/mg1/animations/vehicles/tx-55-metal-gear-sheet.png', sourceWidth: 96, sourceHeight: 112, frameWidth: 112, frameHeight: 112, frameCount: 15, profile: 'tx55', clips: tx55Clips }
] as const satisfies readonly Mg1ActorAnimationAsset[];

const animationAssetBySourceTexture = new Map<string, Mg1ActorAnimationAsset>(
  MG1_ACTOR_ANIMATION_ASSETS.map((asset) => [asset.sourceTextureKey, asset])
);

const animationAssetByTexture = new Map<string, Mg1ActorAnimationAsset>(
  MG1_ACTOR_ANIMATION_ASSETS.map((asset) => [asset.textureKey, asset])
);

export function getMg1ActorAnimationAssetBySourceTexture(sourceTextureKey: string): Mg1ActorAnimationAsset | undefined {
  return animationAssetBySourceTexture.get(sourceTextureKey);
}

export function getMg1ActorAnimationAssetByTexture(textureKey: string): Mg1ActorAnimationAsset | undefined {
  return animationAssetByTexture.get(textureKey);
}

/** Global Phaser animation keys must be deterministic and collision-free. */
export function getMg1ActorAnimationKey(textureKey: string, state: Mg1ActorAnimationState): string {
  return `mg1:${textureKey}:${state}`;
}
