export type Mg1SideOpsAssetCategory = 'npc' | 'enemy' | 'boss' | 'machine' | 'projectile' | 'vfx';

export type Mg1SideOpsFallbackShape =
  | 'humanoid'
  | 'animal'
  | 'sensor'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mg1SideOpsAssetBase {
  id: string;
  category: Mg1SideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mg1SideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mg1SideOpsImageAsset extends Mg1SideOpsAssetBase {
  loader: 'image';
}

export interface Mg1SideOpsSpriteSheetAsset extends Mg1SideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mg1SideOpsAsset = Mg1SideOpsImageAsset | Mg1SideOpsSpriteSheetAsset;

/**
 * MG1 people met in person. They intentionally stay separate from the Codec
 * contact registry because POWs, Grey Fox and the Pettrovich family are
 * rescued face-to-face during Operation Intrude N313.
 */
export const MG1_SIDEOPS_NPC_ASSETS = [
  { id: 'mg1_outer_heaven_pow', category: 'npc', textureKey: 'mg1OuterHeavenPow', path: '/sideops/mg1/npcs/outer-heaven-pow.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xc6b47a, fallbackAccentColor: 0x52645d },
  { id: 'mg1_grey_fox', category: 'npc', textureKey: 'mg1GreyFox', path: '/sideops/mg1/npcs/grey-fox-mg1.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x82957d, fallbackAccentColor: 0xd5d8bd },
  { id: 'mg1_dr_pettrovich', category: 'npc', textureKey: 'mg1Pettrovich', path: '/sideops/mg1/npcs/dr-pettrovich-mg1.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xb4b7a6, fallbackAccentColor: 0x6f806b },
  { id: 'mg1_elen_pettrovich', category: 'npc', textureKey: 'mg1Elen', path: '/sideops/mg1/npcs/elen-pettrovich-mg1.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xc8a978, fallbackAccentColor: 0xf0dfbc },
  { id: 'mg1_schneider', category: 'npc', textureKey: 'mg1Schneider', path: '/sideops/mg1/npcs/schneider-mg1.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x657c63, fallbackAccentColor: 0xc9d4ad },
  { id: 'mg1_diane', category: 'npc', textureKey: 'mg1Diane', path: '/sideops/mg1/npcs/diane-mg1.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xa16e7a, fallbackAccentColor: 0xe7c8a5 },
  { id: 'mg1_jennifer', category: 'npc', textureKey: 'mg1Jennifer', path: '/sideops/mg1/npcs/jennifer-mg1.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x8fa6a0, fallbackAccentColor: 0xe2d5b7 }
] as const satisfies readonly Mg1SideOpsImageAsset[];

/** Red and blue guard ranks reuse the soldier silhouette with palette tints. */
export const MG1_SIDEOPS_ENEMY_ASSETS = [
  { id: 'mg1_outer_heaven_soldier', category: 'enemy', textureKey: 'mg1Guard', path: '/sideops/mg1/enemies/outer-heaven-soldier.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x8f7e55, fallbackAccentColor: 0xd5c28f },
  { id: 'mg1_air_trooper', category: 'enemy', textureKey: 'mg1AirTrooper', path: '/sideops/mg1/enemies/air-trooper.png', width: 40, height: 56, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xc7a943, fallbackAccentColor: 0xf0df8d },
  { id: 'mg1_attack_dog', category: 'enemy', textureKey: 'mg1AttackDog', path: '/sideops/mg1/enemies/attack-dog.png', width: 40, height: 24, loader: 'image', fallbackShape: 'animal', fallbackPrimaryColor: 0x725b3e, fallbackAccentColor: 0xc7a56d },
  { id: 'mg1_scorpion', category: 'enemy', textureKey: 'mg1Scorpion', path: '/sideops/mg1/enemies/scorpion.png', width: 16, height: 12, loader: 'image', fallbackShape: 'animal', fallbackPrimaryColor: 0x8f6a42, fallbackAccentColor: 0xf0c46b },
  { id: 'mg1_gun_camera', category: 'enemy', textureKey: 'mg1GunCamera', path: '/sideops/mg1/enemies/gun-camera.png', width: 30, height: 20, loader: 'image', fallbackShape: 'sensor', fallbackPrimaryColor: 0x60716b, fallbackAccentColor: 0xff6b5e }
] as const satisfies readonly Mg1SideOpsImageAsset[];

export const MG1_SIDEOPS_BOSS_ASSETS = [
  { id: 'mg1_shotmaker', category: 'boss', textureKey: 'mg1Shotmaker', path: '/sideops/mg1/bosses/shotmaker.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x786849, fallbackAccentColor: 0xe4bd6b },
  { id: 'mg1_machinegun_kid', category: 'boss', textureKey: 'mg1MachinegunKid', path: '/sideops/mg1/bosses/machinegun-kid.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x596957, fallbackAccentColor: 0xd1b873 },
  { id: 'mg1_fire_trooper', category: 'boss', textureKey: 'mg1FireTrooper', path: '/sideops/mg1/bosses/fire-trooper.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x704d39, fallbackAccentColor: 0xff7a39 },
  { id: 'mg1_bloody_brad', category: 'boss', textureKey: 'mg1BloodyBrad', path: '/sideops/mg1/bosses/bloody-brad.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x6e7773, fallbackAccentColor: 0xe25959 },
  { id: 'mg1_dirty_duck', category: 'boss', textureKey: 'mg1DirtyDuck', path: '/sideops/mg1/bosses/dirty-duck.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x5f6845, fallbackAccentColor: 0xe0c16a },
  { id: 'mg1_big_boss', category: 'boss', textureKey: 'mg1BigBoss', path: '/sideops/mg1/bosses/big-boss-mg1.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x59634f, fallbackAccentColor: 0xd3bd82 }
] as const satisfies readonly Mg1SideOpsImageAsset[];

export const MG1_SIDEOPS_MACHINE_ASSETS = [
  { id: 'mg1_hind_d', category: 'machine', textureKey: 'mg1HindD', path: '/sideops/mg1/vehicles/hind-d.png', width: 128, height: 64, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x58634e, fallbackAccentColor: 0xc8b968 },
  { id: 'mg1_outer_heaven_tank', category: 'machine', textureKey: 'mg1Tank', path: '/sideops/mg1/vehicles/outer-heaven-tank.png', width: 96, height: 56, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x596547, fallbackAccentColor: 0xb8a967 },
  { id: 'mg1_bulldozer', category: 'machine', textureKey: 'mg1Bulldozer', path: '/sideops/mg1/vehicles/bulldozer.png', width: 96, height: 56, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x62685b, fallbackAccentColor: 0xd19d52 },
  { id: 'mg1_transport_truck', category: 'machine', textureKey: 'mg1TransportTruck', path: '/sideops/mg1/vehicles/transport-truck.png', width: 96, height: 56, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x4f5d45, fallbackAccentColor: 0xb79b58 },
  { id: 'mg1_tx55_metal_gear', category: 'machine', textureKey: 'mg1Tx55', path: '/sideops/mg1/vehicles/tx-55-metal-gear.png', width: 96, height: 112, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x66726b, fallbackAccentColor: 0xd46058 }
] as const satisfies readonly Mg1SideOpsImageAsset[];

export const MG1_SIDEOPS_PROJECTILE_ASSETS = [
  { id: 'mg1_handgun_bullet', category: 'projectile', textureKey: 'mg1HandgunBullet', path: '/sideops/mg1/projectiles/handgun-bullet.png', width: 8, height: 3, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xe7d88a, fallbackAccentColor: 0xfff1b0 },
  { id: 'mg1_enemy_tracer', category: 'projectile', textureKey: 'mg1EnemyTracer', path: '/sideops/mg1/projectiles/enemy-tracer.png', width: 10, height: 3, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xffb85e, fallbackAccentColor: 0xffe09a },
  { id: 'mg1_gun_camera_laser', category: 'projectile', textureKey: 'mg1GunCameraLaser', path: '/sideops/mg1/projectiles/gun-camera-laser.png', width: 24, height: 5, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x48cda4, fallbackAccentColor: 0xa1ffd5 },
  { id: 'mg1_shotgun_pellet', category: 'projectile', textureKey: 'mg1ShotgunPellet', path: '/sideops/mg1/projectiles/shotgun-pellet.png', width: 6, height: 3, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xf2d9a2, fallbackAccentColor: 0xffffff },
  { id: 'mg1_grenade_round', category: 'projectile', textureKey: 'mg1Grenade', path: '/sideops/mg1/projectiles/grenade-round.png', width: 10, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x4f6248, fallbackAccentColor: 0xb2bf76 },
  { id: 'mg1_remote_missile', category: 'projectile', textureKey: 'mg1RemoteMissile', path: '/sideops/mg1/projectiles/remote-missile.png', width: 20, height: 8, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x8a948b, fallbackAccentColor: 0xe85d4f },
  { id: 'mg1_rocket', category: 'projectile', textureKey: 'mg1Rocket', path: '/sideops/mg1/projectiles/rocket.png', width: 20, height: 8, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x657267, fallbackAccentColor: 0xff9b45 },
  { id: 'mg1_boomerang', category: 'projectile', textureKey: 'mg1Boomerang', path: '/sideops/mg1/projectiles/boomerang.png', width: 18, height: 12, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xc48b4f, fallbackAccentColor: 0xf1d48a },
  { id: 'mg1_flame_projectile', category: 'projectile', textureKey: 'mg1Flame', path: '/sideops/mg1/projectiles/flame-projectile.png', width: 24, height: 16, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xff6d33, fallbackAccentColor: 0xffd052 },
  { id: 'mg1_landmine', category: 'projectile', textureKey: 'mg1Mine', path: '/sideops/mg1/projectiles/landmine.png', width: 14, height: 8, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x4e5d4d, fallbackAccentColor: 0xd0b55d },
  { id: 'mg1_plastic_explosive', category: 'projectile', textureKey: 'mg1PlasticExplosive', path: '/sideops/mg1/projectiles/plastic-explosive.png', width: 14, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xc8b18b, fallbackAccentColor: 0xe85d50 },
  { id: 'mg1_tank_shell', category: 'projectile', textureKey: 'mg1TankShell', path: '/sideops/mg1/projectiles/tank-shell.png', width: 16, height: 8, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x6e7468, fallbackAccentColor: 0xffa540 }
] as const satisfies readonly Mg1SideOpsImageAsset[];

export const MG1_SIDEOPS_VFX_ASSETS = [
  { id: 'mg1_muzzle_flash_vfx', category: 'vfx', textureKey: 'mg1MuzzleFlashVfx', path: '/sideops/mg1/vfx/muzzle-flash.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xffd44f, fallbackAccentColor: 0xffffff },
  { id: 'mg1_bullet_impact_vfx', category: 'vfx', textureKey: 'mg1BulletImpactVfx', path: '/sideops/mg1/vfx/bullet-impact.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xc7ad76, fallbackAccentColor: 0xf6e2af },
  { id: 'mg1_metal_sparks_vfx', category: 'vfx', textureKey: 'mg1MetalSparksVfx', path: '/sideops/mg1/vfx/metal-sparks.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xffb84d, fallbackAccentColor: 0xe9f3e8 },
  { id: 'mg1_laser_impact_vfx', category: 'vfx', textureKey: 'mg1LaserImpactVfx', path: '/sideops/mg1/vfx/laser-impact.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0x48cda4, fallbackAccentColor: 0xa1ffd5 },
  { id: 'mg1_flame_impact_vfx', category: 'vfx', textureKey: 'mg1FlameImpactVfx', path: '/sideops/mg1/vfx/flame-impact.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0xff642f, fallbackAccentColor: 0xffd44f },
  { id: 'mg1_explosion_small_vfx', category: 'vfx', textureKey: 'mg1ExplosionSmallVfx', path: '/sideops/mg1/vfx/explosion-small.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0xff9138, fallbackAccentColor: 0xffe479 },
  { id: 'mg1_explosion_large_vfx', category: 'vfx', textureKey: 'mg1ExplosionLargeVfx', path: '/sideops/mg1/vfx/explosion-large.png', width: 512, height: 64, loader: 'spritesheet', frameWidth: 64, frameHeight: 64, frameCount: 8, fallbackShape: 'effect', fallbackPrimaryColor: 0xff7137, fallbackAccentColor: 0xffd85a },
  { id: 'mg1_smoke_plume_vfx', category: 'vfx', textureKey: 'mg1SmokePlumeVfx', path: '/sideops/mg1/vfx/smoke-plume.png', width: 288, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0x68706b, fallbackAccentColor: 0xaeb5a8 },
  { id: 'mg1_dust_puff_vfx', category: 'vfx', textureKey: 'mg1DustPuffVfx', path: '/sideops/mg1/vfx/dust-puff.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0x9b875f, fallbackAccentColor: 0xd5c596 }
] as const satisfies readonly Mg1SideOpsSpriteSheetAsset[];

export const MG1_SIDEOPS_ALL_ASSETS = [
  ...MG1_SIDEOPS_NPC_ASSETS,
  ...MG1_SIDEOPS_ENEMY_ASSETS,
  ...MG1_SIDEOPS_BOSS_ASSETS,
  ...MG1_SIDEOPS_MACHINE_ASSETS,
  ...MG1_SIDEOPS_PROJECTILE_ASSETS,
  ...MG1_SIDEOPS_VFX_ASSETS
] as const satisfies readonly Mg1SideOpsAsset[];

/**
 * The first canonical named mercenary is the safest generic Builder boss.
 * Big Boss and TX-55 remain reserved for explicit finale/sabotage profiles.
 */
export const MG1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: 'mg1Guard',
  reinforcementTexture: 'mg1Guard',
  bossTexture: 'mg1Shotmaker'
} as const;
