export type Mgs1SideOpsAssetCategory = 'npc' | 'enemy' | 'boss' | 'machine' | 'projectile' | 'vfx';

export type Mgs1SideOpsFallbackShape =
  | 'humanoid'
  | 'animal'
  | 'sensor'
  | 'machine'
  | 'projectile'
  | 'effect';

interface Mgs1SideOpsAssetBase {
  id: string;
  category: Mgs1SideOpsAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  fallbackShape: Mgs1SideOpsFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

export interface Mgs1SideOpsImageAsset extends Mgs1SideOpsAssetBase {
  loader: 'image';
}

export interface Mgs1SideOpsSpriteSheetAsset extends Mgs1SideOpsAssetBase {
  loader: 'spritesheet';
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export type Mgs1SideOpsAsset = Mgs1SideOpsImageAsset | Mgs1SideOpsSpriteSheetAsset;

/** People encountered physically during the Shadow Moses infiltration. */
export const MGS1_SIDEOPS_NPC_ASSETS = [
  { id: 'mgs1_meryl_silverburgh', category: 'npc', textureKey: 'mgs1MerylSilverburgh', path: '/sideops/mgs1/npcs/meryl-silverburgh.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x7b5746, fallbackAccentColor: 0xb7b89e },
  { id: 'mgs1_otacon', category: 'npc', textureKey: 'mgs1Otacon', path: '/sideops/mgs1/npcs/otacon.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xb5a788, fallbackAccentColor: 0xd7d0b7 },
  { id: 'mgs1_donald_anderson', category: 'npc', textureKey: 'mgs1DonaldAnderson', path: '/sideops/mgs1/npcs/donald-anderson.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x6e7a67, fallbackAccentColor: 0xc3b791 },
  { id: 'mgs1_kenneth_baker', category: 'npc', textureKey: 'mgs1KennethBaker', path: '/sideops/mgs1/npcs/kenneth-baker.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x70675c, fallbackAccentColor: 0xcfb98e },
  { id: 'mgs1_johnny_sasaki', category: 'npc', textureKey: 'mgs1JohnnySasaki', path: '/sideops/mgs1/npcs/johnny-sasaki.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x6c765f, fallbackAccentColor: 0xc4b989 }
] as const satisfies readonly Mgs1SideOpsImageAsset[];

/** Genome Army equipment variants remain separate assets, not palette aliases. */
export const MGS1_SIDEOPS_ENEMY_ASSETS = [
  { id: 'mgs1_genome_light_infantry', category: 'enemy', textureKey: 'mgs1GenomeLightInfantry', path: '/sideops/mgs1/enemies/genome-light-infantry.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x61715e, fallbackAccentColor: 0xc4b986 },
  { id: 'mgs1_genome_arctic_trooper', category: 'enemy', textureKey: 'mgs1GenomeArcticTrooper', path: '/sideops/mgs1/enemies/genome-arctic-trooper.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xd1d7d3, fallbackAccentColor: 0x707d78 },
  { id: 'mgs1_genome_nbc_trooper', category: 'enemy', textureKey: 'mgs1GenomeNbcTrooper', path: '/sideops/mgs1/enemies/genome-nbc-trooper.png', width: 32, height: 48, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xb7a758, fallbackAccentColor: 0x4b584b },
  { id: 'mgs1_genome_heavy_trooper', category: 'enemy', textureKey: 'mgs1GenomeHeavyTrooper', path: '/sideops/mgs1/enemies/genome-heavy-trooper.png', width: 40, height: 56, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x525d56, fallbackAccentColor: 0xb29b63 },
  { id: 'mgs1_wolf_dog', category: 'enemy', textureKey: 'mgs1WolfDog', path: '/sideops/mgs1/enemies/wolf-dog.png', width: 40, height: 24, loader: 'image', fallbackShape: 'animal', fallbackPrimaryColor: 0x676763, fallbackAccentColor: 0xc4c2af },
  { id: 'mgs1_gun_camera', category: 'enemy', textureKey: 'mgs1GunCamera', path: '/sideops/mgs1/enemies/gun-camera.png', width: 30, height: 20, loader: 'image', fallbackShape: 'sensor', fallbackPrimaryColor: 0x65706d, fallbackAccentColor: 0xe05252 }
] as const satisfies readonly Mgs1SideOpsImageAsset[];

export const MGS1_SIDEOPS_BOSS_ASSETS = [
  { id: 'mgs1_revolver_ocelot', category: 'boss', textureKey: 'mgs1RevolverOcelot', path: '/sideops/mgs1/bosses/revolver-ocelot.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x806a4b, fallbackAccentColor: 0xd9bd79 },
  { id: 'mgs1_decoy_octopus', category: 'boss', textureKey: 'mgs1DecoyOctopus', path: '/sideops/mgs1/bosses/decoy-octopus.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x6a7468, fallbackAccentColor: 0xc7b98b },
  { id: 'mgs1_cyborg_ninja', category: 'boss', textureKey: 'mgs1CyborgNinja', path: '/sideops/mgs1/bosses/cyborg-ninja.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x8b9790, fallbackAccentColor: 0xd9f2d1 },
  { id: 'mgs1_psycho_mantis', category: 'boss', textureKey: 'mgs1PsychoMantis', path: '/sideops/mgs1/bosses/psycho-mantis.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x76576e, fallbackAccentColor: 0xb888c0 },
  { id: 'mgs1_sniper_wolf', category: 'boss', textureKey: 'mgs1SniperWolf', path: '/sideops/mgs1/bosses/sniper-wolf.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0xd2d0c5, fallbackAccentColor: 0x63736b },
  { id: 'mgs1_vulcan_raven', category: 'boss', textureKey: 'mgs1VulcanRaven', path: '/sideops/mgs1/bosses/vulcan-raven.png', width: 56, height: 72, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x5a625a, fallbackAccentColor: 0x93785c },
  { id: 'mgs1_liquid_snake', category: 'boss', textureKey: 'mgs1LiquidSnake', path: '/sideops/mgs1/bosses/liquid-snake.png', width: 48, height: 64, loader: 'image', fallbackShape: 'humanoid', fallbackPrimaryColor: 0x263b45, fallbackAccentColor: 0xd9c59c }
] as const satisfies readonly Mgs1SideOpsImageAsset[];

export const MGS1_SIDEOPS_MACHINE_ASSETS = [
  { id: 'mgs1_m1_tank', category: 'machine', textureKey: 'mgs1M1Tank', path: '/sideops/mgs1/vehicles/m1-tank.png', width: 112, height: 64, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x596452, fallbackAccentColor: 0xb6a36d },
  { id: 'mgs1_hind_d', category: 'machine', textureKey: 'mgs1HindD', path: '/sideops/mgs1/vehicles/hind-d.png', width: 144, height: 72, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x4e5e52, fallbackAccentColor: 0xb5a567 },
  { id: 'mgs1_metal_gear_rex', category: 'machine', textureKey: 'mgs1MetalGearRex', path: '/sideops/mgs1/vehicles/metal-gear-rex.png', width: 128, height: 144, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x59635d, fallbackAccentColor: 0xd05a4e },
  { id: 'mgs1_escape_jeep', category: 'machine', textureKey: 'mgs1EscapeJeep', path: '/sideops/mgs1/vehicles/escape-jeep.png', width: 112, height: 56, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0x515e4b, fallbackAccentColor: 0xa9905c },
  { id: 'mgs1_snowmobile', category: 'machine', textureKey: 'mgs1Snowmobile', path: '/sideops/mgs1/vehicles/snowmobile.png', width: 96, height: 48, loader: 'image', fallbackShape: 'machine', fallbackPrimaryColor: 0xc5cbc8, fallbackAccentColor: 0x556864 }
] as const satisfies readonly Mgs1SideOpsImageAsset[];

export const MGS1_SIDEOPS_PROJECTILE_ASSETS = [
  { id: 'mgs1_socom_bullet', category: 'projectile', textureKey: 'mgs1SocomBullet', path: '/sideops/mgs1/projectiles/socom-bullet.png', width: 8, height: 3, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xe9d792, fallbackAccentColor: 0xfff3b9 },
  { id: 'mgs1_famas_tracer', category: 'projectile', textureKey: 'mgs1FamasTracer', path: '/sideops/mgs1/projectiles/famas-tracer.png', width: 12, height: 3, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xffb64d, fallbackAccentColor: 0xffe197 },
  { id: 'mgs1_psg1_round', category: 'projectile', textureKey: 'mgs1Psg1Round', path: '/sideops/mgs1/projectiles/psg1-round.png', width: 12, height: 3, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xf3dba0, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_ocelot_round', category: 'projectile', textureKey: 'mgs1OcelotRound', path: '/sideops/mgs1/projectiles/ocelot-round.png', width: 10, height: 4, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xf0cf79, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_vulcan_tracer', category: 'projectile', textureKey: 'mgs1VulcanTracer', path: '/sideops/mgs1/projectiles/vulcan-tracer.png', width: 14, height: 4, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xff9946, fallbackAccentColor: 0xffd17a },
  { id: 'mgs1_tank_shell', category: 'projectile', textureKey: 'mgs1TankShell', path: '/sideops/mgs1/projectiles/tank-shell.png', width: 18, height: 8, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x747b70, fallbackAccentColor: 0xff9f45 },
  { id: 'mgs1_grenade', category: 'projectile', textureKey: 'mgs1Grenade', path: '/sideops/mgs1/projectiles/grenade.png', width: 10, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x4e5e4b, fallbackAccentColor: 0xa8b77a },
  { id: 'mgs1_chaff_grenade', category: 'projectile', textureKey: 'mgs1ChaffGrenade', path: '/sideops/mgs1/projectiles/chaff-grenade.png', width: 10, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x737975, fallbackAccentColor: 0x8be1db },
  { id: 'mgs1_stun_grenade', category: 'projectile', textureKey: 'mgs1StunGrenade', path: '/sideops/mgs1/projectiles/stun-grenade.png', width: 10, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xbabeb3, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_c4_charge', category: 'projectile', textureKey: 'mgs1C4Charge', path: '/sideops/mgs1/projectiles/c4-charge.png', width: 14, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xb6a885, fallbackAccentColor: 0xe5534c },
  { id: 'mgs1_claymore', category: 'projectile', textureKey: 'mgs1Claymore', path: '/sideops/mgs1/projectiles/claymore.png', width: 16, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x596354, fallbackAccentColor: 0xc8b06c },
  { id: 'mgs1_nikita_missile', category: 'projectile', textureKey: 'mgs1NikitaMissile', path: '/sideops/mgs1/projectiles/nikita-missile.png', width: 24, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x8c938c, fallbackAccentColor: 0xe95e4f },
  { id: 'mgs1_stinger_missile', category: 'projectile', textureKey: 'mgs1StingerMissile', path: '/sideops/mgs1/projectiles/stinger-missile.png', width: 28, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x778075, fallbackAccentColor: 0xe7b95a },
  { id: 'mgs1_hind_rocket', category: 'projectile', textureKey: 'mgs1HindRocket', path: '/sideops/mgs1/projectiles/hind-rocket.png', width: 24, height: 10, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x69746a, fallbackAccentColor: 0xff8e40 },
  { id: 'mgs1_rex_missile', category: 'projectile', textureKey: 'mgs1RexMissile', path: '/sideops/mgs1/projectiles/rex-missile.png', width: 30, height: 12, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x707a75, fallbackAccentColor: 0xd9564c },
  { id: 'mgs1_rex_laser', category: 'projectile', textureKey: 'mgs1RexLaser', path: '/sideops/mgs1/projectiles/rex-laser.png', width: 32, height: 6, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xf04f4f, fallbackAccentColor: 0xffc3a8 },
  { id: 'mgs1_rex_railgun_slug', category: 'projectile', textureKey: 'mgs1RexRailgunSlug', path: '/sideops/mgs1/projectiles/rex-railgun-slug.png', width: 22, height: 8, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xc4c9bf, fallbackAccentColor: 0x9ee9dc },
  { id: 'mgs1_mantis_psychic_orb', category: 'projectile', textureKey: 'mgs1MantisPsychicOrb', path: '/sideops/mgs1/projectiles/mantis-psychic-orb.png', width: 18, height: 18, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0x9a5ec4, fallbackAccentColor: 0xe0b5ff },
  { id: 'mgs1_ninja_slash', category: 'projectile', textureKey: 'mgs1NinjaSlash', path: '/sideops/mgs1/projectiles/ninja-slash.png', width: 24, height: 24, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xb8ffe5, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_wolf_round', category: 'projectile', textureKey: 'mgs1WolfRound', path: '/sideops/mgs1/projectiles/wolf-round.png', width: 14, height: 4, loader: 'image', fallbackShape: 'projectile', fallbackPrimaryColor: 0xe6d5a1, fallbackAccentColor: 0xffffff }
] as const satisfies readonly Mgs1SideOpsImageAsset[];

export const MGS1_SIDEOPS_VFX_ASSETS = [
  { id: 'mgs1_muzzle_flash_vfx', category: 'vfx', textureKey: 'mgs1MuzzleFlashVfx', path: '/sideops/mgs1/vfx/muzzle-flash.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xffd35a, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_bullet_impact_vfx', category: 'vfx', textureKey: 'mgs1BulletImpactVfx', path: '/sideops/mgs1/vfx/bullet-impact.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xd2bd87, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_metal_ricochet_vfx', category: 'vfx', textureKey: 'mgs1MetalRicochetVfx', path: '/sideops/mgs1/vfx/metal-ricochet.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xffb54c, fallbackAccentColor: 0xeaffff },
  { id: 'mgs1_blood_hit_vfx', category: 'vfx', textureKey: 'mgs1BloodHitVfx', path: '/sideops/mgs1/vfx/blood-hit.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0x9d2f34, fallbackAccentColor: 0xe26761 },
  { id: 'mgs1_grenade_explosion_vfx', category: 'vfx', textureKey: 'mgs1GrenadeExplosionVfx', path: '/sideops/mgs1/vfx/grenade-explosion.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0xff8c38, fallbackAccentColor: 0xffdf70 },
  { id: 'mgs1_c4_explosion_vfx', category: 'vfx', textureKey: 'mgs1C4ExplosionVfx', path: '/sideops/mgs1/vfx/c4-explosion.png', width: 384, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 8, fallbackShape: 'effect', fallbackPrimaryColor: 0xff7134, fallbackAccentColor: 0xffd25c },
  { id: 'mgs1_missile_explosion_vfx', category: 'vfx', textureKey: 'mgs1MissileExplosionVfx', path: '/sideops/mgs1/vfx/missile-explosion.png', width: 384, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 8, fallbackShape: 'effect', fallbackPrimaryColor: 0xff7838, fallbackAccentColor: 0xffdb67 },
  { id: 'mgs1_rex_explosion_vfx', category: 'vfx', textureKey: 'mgs1RexExplosionVfx', path: '/sideops/mgs1/vfx/rex-explosion.png', width: 640, height: 64, loader: 'spritesheet', frameWidth: 64, frameHeight: 64, frameCount: 10, fallbackShape: 'effect', fallbackPrimaryColor: 0xff6434, fallbackAccentColor: 0xffd056 },
  { id: 'mgs1_smoke_plume_vfx', category: 'vfx', textureKey: 'mgs1SmokePlumeVfx', path: '/sideops/mgs1/vfx/smoke-plume.png', width: 288, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0x68706f, fallbackAccentColor: 0xaeb7b3 },
  { id: 'mgs1_fire_plume_vfx', category: 'vfx', textureKey: 'mgs1FirePlumeVfx', path: '/sideops/mgs1/vfx/fire-plume.png', width: 288, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0xff7031, fallbackAccentColor: 0xffd556 },
  { id: 'mgs1_chaff_burst_vfx', category: 'vfx', textureKey: 'mgs1ChaffBurstVfx', path: '/sideops/mgs1/vfx/chaff-burst.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0x80d9d2, fallbackAccentColor: 0xeaffff },
  { id: 'mgs1_stun_flash_vfx', category: 'vfx', textureKey: 'mgs1StunFlashVfx', path: '/sideops/mgs1/vfx/stun-flash.png', width: 160, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 5, fallbackShape: 'effect', fallbackPrimaryColor: 0xf4f4dc, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_snow_puff_vfx', category: 'vfx', textureKey: 'mgs1SnowPuffVfx', path: '/sideops/mgs1/vfx/snow-puff.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0xdde5e4, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_rotor_wash_vfx', category: 'vfx', textureKey: 'mgs1RotorWashVfx', path: '/sideops/mgs1/vfx/rotor-wash.png', width: 288, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0xb7c5c3, fallbackAccentColor: 0xe7efef },
  { id: 'mgs1_ninja_electric_vfx', category: 'vfx', textureKey: 'mgs1NinjaElectricVfx', path: '/sideops/mgs1/vfx/ninja-electric.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0x7cf4d2, fallbackAccentColor: 0xffffff },
  { id: 'mgs1_mantis_psychic_wave_vfx', category: 'vfx', textureKey: 'mgs1MantisPsychicWaveVfx', path: '/sideops/mgs1/vfx/mantis-psychic-wave.png', width: 384, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 8, fallbackShape: 'effect', fallbackPrimaryColor: 0x9c62c7, fallbackAccentColor: 0xe2bbff },
  { id: 'mgs1_rex_laser_impact_vfx', category: 'vfx', textureKey: 'mgs1RexLaserImpactVfx', path: '/sideops/mgs1/vfx/rex-laser-impact.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, fallbackShape: 'effect', fallbackPrimaryColor: 0xf44f4f, fallbackAccentColor: 0xffd2ba },
  { id: 'mgs1_missile_trail_vfx', category: 'vfx', textureKey: 'mgs1MissileTrailVfx', path: '/sideops/mgs1/vfx/missile-trail.png', width: 96, height: 24, loader: 'spritesheet', frameWidth: 24, frameHeight: 24, frameCount: 4, fallbackShape: 'effect', fallbackPrimaryColor: 0x9ca39e, fallbackAccentColor: 0xe5ebe7 }
] as const satisfies readonly Mgs1SideOpsSpriteSheetAsset[];

export const MGS1_SIDEOPS_ALL_ASSETS = [
  ...MGS1_SIDEOPS_NPC_ASSETS,
  ...MGS1_SIDEOPS_ENEMY_ASSETS,
  ...MGS1_SIDEOPS_BOSS_ASSETS,
  ...MGS1_SIDEOPS_MACHINE_ASSETS,
  ...MGS1_SIDEOPS_PROJECTILE_ASSETS,
  ...MGS1_SIDEOPS_VFX_ASSETS
] as const satisfies readonly Mgs1SideOpsAsset[];

/** Stable defaults for generic Shadow Moses Builder encounters. */
export const MGS1_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: 'mgs1GenomeLightInfantry',
  reinforcementTexture: 'mgs1GenomeArcticTrooper',
  bossTexture: 'mgs1RevolverOcelot'
} as const;
