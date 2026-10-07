export type Mgs1VrGameplayAssetCategory = 'actor' | 'static-character' | 'weapon' | 'projectile' | 'special-prop' | 'vfx';

export type Mgs1VrActorAnimationProfile = 'snake' | 'genome' | 'ninja' | 'genola';

export type Mgs1VrActorAnimationState =
  | 'idle'
  | 'move'
  | 'attack'
  | 'crouch'
  | 'melee'
  | 'slash'
  | 'vanish'
  | 'hit'
  | 'death';

export interface Mgs1VrAnimationClip {
  readonly start: number;
  readonly end: number;
  readonly frameRate: number;
  readonly repeat: number;
}

interface Mgs1VrGameplayAssetBase {
  readonly id: string;
  readonly category: Mgs1VrGameplayAssetCategory;
  readonly textureKey: string;
  readonly path: string;
  /** Packed PNG width. Spritesheets use one horizontal row. */
  readonly width: number;
  readonly height: number;
}

export interface Mgs1VrImageAsset extends Mgs1VrGameplayAssetBase {
  readonly loader: 'image';
}

export interface Mgs1VrSpriteSheetAsset extends Mgs1VrGameplayAssetBase {
  readonly loader: 'spritesheet';
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly frameCount: number;
}

export interface Mgs1VrActorAsset extends Mgs1VrSpriteSheetAsset {
  readonly category: 'actor';
  readonly profile: Mgs1VrActorAnimationProfile;
  readonly clips: Readonly<Partial<Record<Mgs1VrActorAnimationState, Mgs1VrAnimationClip>>>;
}

export interface Mgs1VrVfxAsset extends Mgs1VrSpriteSheetAsset {
  readonly category: 'vfx';
  readonly clip: Mgs1VrAnimationClip;
}

export type Mgs1VrGameplayAsset = Mgs1VrImageAsset | Mgs1VrActorAsset | Mgs1VrVfxAsset;

const snakeClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 9, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 11, repeat: 0 },
  crouch: { start: 11, end: 12, frameRate: 5, repeat: -1 },
  melee: { start: 13, end: 15, frameRate: 12, repeat: 0 },
  hit: { start: 16, end: 17, frameRate: 10, repeat: 0 },
  death: { start: 18, end: 22, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1VrActorAsset['clips'];

const genomeClips = {
  idle: { start: 0, end: 1, frameRate: 3, repeat: -1 },
  move: { start: 2, end: 7, frameRate: 8, repeat: -1 },
  attack: { start: 8, end: 10, frameRate: 10, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 10, repeat: 0 },
  death: { start: 13, end: 17, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1VrActorAsset['clips'];

const ninjaClips = {
  idle: { start: 0, end: 2, frameRate: 5, repeat: -1 },
  move: { start: 3, end: 8, frameRate: 11, repeat: -1 },
  slash: { start: 9, end: 12, frameRate: 14, repeat: 0 },
  vanish: { start: 13, end: 15, frameRate: 12, repeat: 0 },
  hit: { start: 16, end: 17, frameRate: 11, repeat: 0 },
  death: { start: 18, end: 22, frameRate: 8, repeat: 0 }
} as const satisfies Mgs1VrActorAsset['clips'];

const genolaClips = {
  idle: { start: 0, end: 2, frameRate: 4, repeat: -1 },
  move: { start: 3, end: 6, frameRate: 7, repeat: -1 },
  attack: { start: 7, end: 10, frameRate: 11, repeat: 0 },
  hit: { start: 11, end: 12, frameRate: 9, repeat: 0 },
  death: { start: 13, end: 16, frameRate: 7, repeat: 0 }
} as const satisfies Mgs1VrActorAsset['clips'];

/** Playable and hostile VR avatars, packed as single-row spritesheets. */
export const MGS1_VR_ACTOR_ASSETS = [
  { id: 'mgs1_vr_actor_solid_snake', category: 'actor', textureKey: 'mgs1VrSolidSnake', path: '/vr/mgs1/gameplay/characters/solid-snake-vr-sheet.png', width: 1104, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 23, profile: 'snake', clips: snakeClips },
  { id: 'mgs1_vr_actor_genome_soldier', category: 'actor', textureKey: 'mgs1VrGenomeSoldier', path: '/vr/mgs1/gameplay/characters/genome-soldier-vr-sheet.png', width: 864, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 18, profile: 'genome', clips: genomeClips },
  { id: 'mgs1_vr_actor_cyborg_ninja', category: 'actor', textureKey: 'mgs1VrCyborgNinja', path: '/vr/mgs1/gameplay/characters/cyborg-ninja-vr-sheet.png', width: 1472, height: 64, loader: 'spritesheet', frameWidth: 64, frameHeight: 64, frameCount: 23, profile: 'ninja', clips: ninjaClips },
  { id: 'mgs1_vr_actor_genola', category: 'actor', textureKey: 'mgs1VrGenola', path: '/vr/mgs1/gameplay/characters/genola-vr-sheet.png', width: 1632, height: 96, loader: 'spritesheet', frameWidth: 96, frameHeight: 96, frameCount: 17, profile: 'genola', clips: genolaClips }
] as const satisfies readonly Mgs1VrActorAsset[];

/** Special mission characters that only require a single gameplay pose. */
export const MGS1_VR_STATIC_CHARACTER_ASSETS = [
  { id: 'mgs1_vr_character_meryl_protected', category: 'static-character', textureKey: 'mgs1VrMerylProtected', path: '/vr/mgs1/gameplay/characters/meryl-protected-vr.png', width: 64, height: 40, loader: 'image' },
  { id: 'mgs1_vr_character_snake_disguise', category: 'static-character', textureKey: 'mgs1VrSnakeDisguise', path: '/vr/mgs1/gameplay/characters/snake-disguise-vr.png', width: 40, height: 56, loader: 'image' },
  { id: 'mgs1_vr_character_mystery_soldier', category: 'static-character', textureKey: 'mgs1VrMysterySoldier', path: '/vr/mgs1/gameplay/characters/mystery-soldier-vr.png', width: 40, height: 56, loader: 'image' },
  { id: 'mgs1_vr_character_naomi_photoshoot', category: 'static-character', textureKey: 'mgs1VrNaomiPhotoshoot', path: '/vr/mgs1/gameplay/characters/naomi-photoshoot-vr.png', width: 40, height: 64, loader: 'image' },
  { id: 'mgs1_vr_character_mei_ling_photoshoot', category: 'static-character', textureKey: 'mgs1VrMeiLingPhotoshoot', path: '/vr/mgs1/gameplay/characters/mei-ling-photoshoot-vr.png', width: 40, height: 64, loader: 'image' }
] as const satisfies readonly Mgs1VrImageAsset[];

export const MGS1_VR_WEAPON_ASSETS = [
  { id: 'mgs1_vr_weapon_socom', category: 'weapon', textureKey: 'mgs1VrWeaponSocom', path: '/vr/mgs1/gameplay/weapons/socom.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_famas', category: 'weapon', textureKey: 'mgs1VrWeaponFamas', path: '/vr/mgs1/gameplay/weapons/famas.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_psg1', category: 'weapon', textureKey: 'mgs1VrWeaponPsg1', path: '/vr/mgs1/gameplay/weapons/psg1.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_grenade', category: 'weapon', textureKey: 'mgs1VrWeaponGrenade', path: '/vr/mgs1/gameplay/weapons/grenade.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_c4', category: 'weapon', textureKey: 'mgs1VrWeaponC4', path: '/vr/mgs1/gameplay/weapons/c4.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_claymore', category: 'weapon', textureKey: 'mgs1VrWeaponClaymore', path: '/vr/mgs1/gameplay/weapons/claymore.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_stinger', category: 'weapon', textureKey: 'mgs1VrWeaponStinger', path: '/vr/mgs1/gameplay/weapons/stinger.png', width: 48, height: 28, loader: 'image' },
  { id: 'mgs1_vr_weapon_nikita', category: 'weapon', textureKey: 'mgs1VrWeaponNikita', path: '/vr/mgs1/gameplay/weapons/nikita.png', width: 48, height: 28, loader: 'image' }
] as const satisfies readonly Mgs1VrImageAsset[];

export const MGS1_VR_PROJECTILE_ASSETS = [
  { id: 'mgs1_vr_projectile_socom_round', category: 'projectile', textureKey: 'mgs1VrProjectileSocomRound', path: '/vr/mgs1/gameplay/projectiles/socom-round.png', width: 10, height: 4, loader: 'image' },
  { id: 'mgs1_vr_projectile_famas_tracer', category: 'projectile', textureKey: 'mgs1VrProjectileFamasTracer', path: '/vr/mgs1/gameplay/projectiles/famas-tracer.png', width: 16, height: 4, loader: 'image' },
  { id: 'mgs1_vr_projectile_psg1_round', category: 'projectile', textureKey: 'mgs1VrProjectilePsg1Round', path: '/vr/mgs1/gameplay/projectiles/psg1-round.png', width: 16, height: 4, loader: 'image' },
  { id: 'mgs1_vr_projectile_grenade', category: 'projectile', textureKey: 'mgs1VrProjectileGrenade', path: '/vr/mgs1/gameplay/projectiles/grenade.png', width: 12, height: 12, loader: 'image' },
  { id: 'mgs1_vr_projectile_c4_charge', category: 'projectile', textureKey: 'mgs1VrProjectileC4Charge', path: '/vr/mgs1/gameplay/projectiles/c4-charge.png', width: 16, height: 12, loader: 'image' },
  { id: 'mgs1_vr_projectile_claymore_mine', category: 'projectile', textureKey: 'mgs1VrProjectileClaymoreMine', path: '/vr/mgs1/gameplay/projectiles/claymore-mine.png', width: 18, height: 14, loader: 'image' },
  { id: 'mgs1_vr_projectile_stinger_missile', category: 'projectile', textureKey: 'mgs1VrProjectileStingerMissile', path: '/vr/mgs1/gameplay/projectiles/stinger-missile.png', width: 28, height: 10, loader: 'image' },
  { id: 'mgs1_vr_projectile_nikita_missile', category: 'projectile', textureKey: 'mgs1VrProjectileNikitaMissile', path: '/vr/mgs1/gameplay/projectiles/nikita-missile.png', width: 28, height: 10, loader: 'image' }
] as const satisfies readonly Mgs1VrImageAsset[];

/** Evidence and identity clues used across the ten Mystery investigations. */
export const MGS1_VR_MYSTERY_PROP_ASSETS = [
  { id: 'mgs1_vr_mystery_broken_camera', category: 'special-prop', textureKey: 'mgs1VrMysteryBrokenCamera', path: '/vr/mgs1/gameplay/special/mystery/broken-camera.png', width: 52, height: 36, loader: 'image' },
  { id: 'mgs1_vr_mystery_black_balaclava', category: 'special-prop', textureKey: 'mgs1VrMysteryBlackBalaclava', path: '/vr/mgs1/gameplay/special/mystery/black-balaclava.png', width: 32, height: 36, loader: 'image' },
  { id: 'mgs1_vr_mystery_pink_sock', category: 'special-prop', textureKey: 'mgs1VrMysteryPinkSock', path: '/vr/mgs1/gameplay/special/mystery/pink-sock.png', width: 28, height: 36, loader: 'image' },
  { id: 'mgs1_vr_mystery_blue_popsicle', category: 'special-prop', textureKey: 'mgs1VrMysteryBluePopsicle', path: '/vr/mgs1/gameplay/special/mystery/blue-popsicle.png', width: 18, height: 36, loader: 'image' },
  { id: 'mgs1_vr_mystery_round_glasses', category: 'special-prop', textureKey: 'mgs1VrMysteryRoundGlasses', path: '/vr/mgs1/gameplay/special/mystery/round-glasses.png', width: 48, height: 24, loader: 'image' },
  { id: 'mgs1_vr_mystery_blond_wig', category: 'special-prop', textureKey: 'mgs1VrMysteryBlondWig', path: '/vr/mgs1/gameplay/special/mystery/blond-wig.png', width: 44, height: 36, loader: 'image' },
  { id: 'mgs1_vr_mystery_security_panel', category: 'special-prop', textureKey: 'mgs1VrMysterySecurityPanel', path: '/vr/mgs1/gameplay/special/mystery/security-panel.png', width: 56, height: 32, loader: 'image' },
  { id: 'mgs1_vr_mystery_footprints', category: 'special-prop', textureKey: 'mgs1VrMysteryFootprints', path: '/vr/mgs1/gameplay/special/mystery/footprints.png', width: 56, height: 40, loader: 'image' },
  { id: 'mgs1_vr_mystery_broken_vase', category: 'special-prop', textureKey: 'mgs1VrMysteryBrokenVase', path: '/vr/mgs1/gameplay/special/mystery/broken-vase.png', width: 48, height: 40, loader: 'image' },
  { id: 'mgs1_vr_mystery_broken_chair', category: 'special-prop', textureKey: 'mgs1VrMysteryBrokenChair', path: '/vr/mgs1/gameplay/special/mystery/broken-chair.png', width: 48, height: 48, loader: 'image' },
  { id: 'mgs1_vr_mystery_rifle', category: 'special-prop', textureKey: 'mgs1VrMysteryRifle', path: '/vr/mgs1/gameplay/special/mystery/rifle.png', width: 56, height: 32, loader: 'image' },
  { id: 'mgs1_vr_mystery_grandfather_clock', category: 'special-prop', textureKey: 'mgs1VrMysteryGrandfatherClock', path: '/vr/mgs1/gameplay/special/mystery/grandfather-clock.png', width: 36, height: 64, loader: 'image' },
  { id: 'mgs1_vr_mystery_broken_monitor', category: 'special-prop', textureKey: 'mgs1VrMysteryBrokenMonitor', path: '/vr/mgs1/gameplay/special/mystery/broken-monitor.png', width: 48, height: 40, loader: 'image' },
  { id: 'mgs1_vr_mystery_ketchup_bottle', category: 'special-prop', textureKey: 'mgs1VrMysteryKetchupBottle', path: '/vr/mgs1/gameplay/special/mystery/ketchup-bottle.png', width: 20, height: 40, loader: 'image' },
  { id: 'mgs1_vr_mystery_key', category: 'special-prop', textureKey: 'mgs1VrMysteryKey', path: '/vr/mgs1/gameplay/special/mystery/key.png', width: 40, height: 24, loader: 'image' },
  { id: 'mgs1_vr_mystery_portrait_mask', category: 'special-prop', textureKey: 'mgs1VrMysteryPortraitMask', path: '/vr/mgs1/gameplay/special/mystery/portrait-mask.png', width: 48, height: 40, loader: 'image' }
] as const satisfies readonly Mgs1VrImageAsset[];

/** Camera, framing and studio props for Naomi and Mei Ling Photoshoot stages. */
export const MGS1_VR_PHOTOSHOOT_PROP_ASSETS = [
  { id: 'mgs1_vr_photoshoot_camera', category: 'special-prop', textureKey: 'mgs1VrPhotoshootCamera', path: '/vr/mgs1/gameplay/special/photoshoot/camera.png', width: 56, height: 48, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_viewfinder', category: 'special-prop', textureKey: 'mgs1VrPhotoshootViewfinder', path: '/vr/mgs1/gameplay/special/photoshoot/viewfinder.png', width: 128, height: 80, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_shutter_flash', category: 'special-prop', textureKey: 'mgs1VrPhotoshootShutterFlash', path: '/vr/mgs1/gameplay/special/photoshoot/shutter-flash.png', width: 64, height: 64, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_photo_album', category: 'special-prop', textureKey: 'mgs1VrPhotoshootPhotoAlbum', path: '/vr/mgs1/gameplay/special/photoshoot/photo-album.png', width: 48, height: 56, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_backdrop', category: 'special-prop', textureKey: 'mgs1VrPhotoshootBackdrop', path: '/vr/mgs1/gameplay/special/photoshoot/backdrop.png', width: 96, height: 72, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_spotlight', category: 'special-prop', textureKey: 'mgs1VrPhotoshootSpotlight', path: '/vr/mgs1/gameplay/special/photoshoot/spotlight.png', width: 48, height: 56, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_film_cartridge', category: 'special-prop', textureKey: 'mgs1VrPhotoshootFilmCartridge', path: '/vr/mgs1/gameplay/special/photoshoot/film-cartridge.png', width: 48, height: 32, loader: 'image' },
  { id: 'mgs1_vr_photoshoot_pose_marker', category: 'special-prop', textureKey: 'mgs1VrPhotoshootPoseMarker', path: '/vr/mgs1/gameplay/special/photoshoot/pose-marker.png', width: 64, height: 64, loader: 'image' }
] as const satisfies readonly Mgs1VrImageAsset[];

/** Intact, severed and fragment states for the Ninja sword-cut challenge. */
export const MGS1_VR_NINJA_PROP_ASSETS = [
  { id: 'mgs1_vr_ninja_pole_intact', category: 'special-prop', textureKey: 'mgs1VrNinjaPoleIntact', path: '/vr/mgs1/gameplay/special/ninja/pole-intact.png', width: 32, height: 96, loader: 'image' },
  { id: 'mgs1_vr_ninja_pole_cut', category: 'special-prop', textureKey: 'mgs1VrNinjaPoleCut', path: '/vr/mgs1/gameplay/special/ninja/pole-cut.png', width: 48, height: 96, loader: 'image' },
  { id: 'mgs1_vr_ninja_pole_debris', category: 'special-prop', textureKey: 'mgs1VrNinjaPoleDebris', path: '/vr/mgs1/gameplay/special/ninja/pole-debris.png', width: 56, height: 24, loader: 'image' }
] as const satisfies readonly Mgs1VrImageAsset[];

export const MGS1_VR_SPECIAL_PROP_ASSETS = [
  ...MGS1_VR_MYSTERY_PROP_ASSETS,
  ...MGS1_VR_PHOTOSHOOT_PROP_ASSETS,
  ...MGS1_VR_NINJA_PROP_ASSETS
] as const satisfies readonly Mgs1VrImageAsset[];

export const MGS1_VR_VFX_ASSETS = [
  { id: 'mgs1_vr_vfx_muzzle_flash', category: 'vfx', textureKey: 'mgs1VrVfxMuzzleFlash', path: '/vr/mgs1/gameplay/vfx/muzzle-flash.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, clip: { start: 0, end: 3, frameRate: 16, repeat: 0 } },
  { id: 'mgs1_vr_vfx_bullet_impact', category: 'vfx', textureKey: 'mgs1VrVfxBulletImpact', path: '/vr/mgs1/gameplay/vfx/bullet-impact.png', width: 64, height: 16, loader: 'spritesheet', frameWidth: 16, frameHeight: 16, frameCount: 4, clip: { start: 0, end: 3, frameRate: 14, repeat: 0 } },
  { id: 'mgs1_vr_vfx_target_shatter_blue', category: 'vfx', textureKey: 'mgs1VrVfxTargetShatterBlue', path: '/vr/mgs1/gameplay/vfx/target-shatter-blue.png', width: 144, height: 24, loader: 'spritesheet', frameWidth: 24, frameHeight: 24, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: 0 } },
  { id: 'mgs1_vr_vfx_target_chain_explosion', category: 'vfx', textureKey: 'mgs1VrVfxTargetChainExplosion', path: '/vr/mgs1/gameplay/vfx/target-chain-explosion.png', width: 240, height: 40, loader: 'spritesheet', frameWidth: 40, frameHeight: 40, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: 0 } },
  { id: 'mgs1_vr_vfx_chaff_burst', category: 'vfx', textureKey: 'mgs1VrVfxChaffBurst', path: '/vr/mgs1/gameplay/vfx/chaff-burst.png', width: 192, height: 32, loader: 'spritesheet', frameWidth: 32, frameHeight: 32, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: 0 } },
  { id: 'mgs1_vr_vfx_missile_trail', category: 'vfx', textureKey: 'mgs1VrVfxMissileTrail', path: '/vr/mgs1/gameplay/vfx/missile-trail.png', width: 96, height: 12, loader: 'spritesheet', frameWidth: 24, frameHeight: 12, frameCount: 4, clip: { start: 0, end: 3, frameRate: 14, repeat: -1 } },
  { id: 'mgs1_vr_vfx_missile_explosion', category: 'vfx', textureKey: 'mgs1VrVfxMissileExplosion', path: '/vr/mgs1/gameplay/vfx/missile-explosion.png', width: 288, height: 48, loader: 'spritesheet', frameWidth: 48, frameHeight: 48, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: 0 } },
  { id: 'mgs1_vr_vfx_goal_materialize', category: 'vfx', textureKey: 'mgs1VrVfxGoalMaterialize', path: '/vr/mgs1/gameplay/vfx/goal-materialize.png', width: 192, height: 64, loader: 'spritesheet', frameWidth: 32, frameHeight: 64, frameCount: 6, clip: { start: 0, end: 5, frameRate: 10, repeat: 0 } },
  { id: 'mgs1_vr_vfx_ninja_slash', category: 'vfx', textureKey: 'mgs1VrVfxNinjaSlash', path: '/vr/mgs1/gameplay/vfx/ninja-slash.png', width: 240, height: 32, loader: 'spritesheet', frameWidth: 48, frameHeight: 32, frameCount: 5, clip: { start: 0, end: 4, frameRate: 14, repeat: 0 } },
  { id: 'mgs1_vr_vfx_bullet_ricochet', category: 'vfx', textureKey: 'mgs1VrVfxBulletRicochet', path: '/vr/mgs1/gameplay/vfx/bullet-ricochet.png', width: 128, height: 24, loader: 'spritesheet', frameWidth: 32, frameHeight: 24, frameCount: 4, clip: { start: 0, end: 3, frameRate: 16, repeat: 0 } },
  { id: 'mgs1_vr_vfx_electrical_disruption', category: 'vfx', textureKey: 'mgs1VrVfxElectricalDisruption', path: '/vr/mgs1/gameplay/vfx/electrical-disruption.png', width: 240, height: 56, loader: 'spritesheet', frameWidth: 40, frameHeight: 56, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: -1 } },
  { id: 'mgs1_vr_vfx_stealth_shimmer', category: 'vfx', textureKey: 'mgs1VrVfxStealthShimmer', path: '/vr/mgs1/gameplay/vfx/stealth-shimmer.png', width: 240, height: 56, loader: 'spritesheet', frameWidth: 40, frameHeight: 56, frameCount: 6, clip: { start: 0, end: 5, frameRate: 10, repeat: -1 } },
  { id: 'mgs1_vr_vfx_claymore_blast', category: 'vfx', textureKey: 'mgs1VrVfxClaymoreBlast', path: '/vr/mgs1/gameplay/vfx/claymore-blast.png', width: 288, height: 32, loader: 'spritesheet', frameWidth: 48, frameHeight: 32, frameCount: 6, clip: { start: 0, end: 5, frameRate: 14, repeat: 0 } },
  { id: 'mgs1_vr_vfx_glass_shatter', category: 'vfx', textureKey: 'mgs1VrVfxGlassShatter', path: '/vr/mgs1/gameplay/vfx/glass-shatter.png', width: 240, height: 40, loader: 'spritesheet', frameWidth: 40, frameHeight: 40, frameCount: 6, clip: { start: 0, end: 5, frameRate: 14, repeat: 0 } },
  { id: 'mgs1_vr_vfx_wall_crumble', category: 'vfx', textureKey: 'mgs1VrVfxWallCrumble', path: '/vr/mgs1/gameplay/vfx/wall-crumble.png', width: 240, height: 40, loader: 'spritesheet', frameWidth: 40, frameHeight: 40, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: 0 } },
  { id: 'mgs1_vr_vfx_ufo_explosion', category: 'vfx', textureKey: 'mgs1VrVfxUfoExplosion', path: '/vr/mgs1/gameplay/vfx/ufo-explosion.png', width: 336, height: 48, loader: 'spritesheet', frameWidth: 56, frameHeight: 48, frameCount: 6, clip: { start: 0, end: 5, frameRate: 12, repeat: 0 } }
] as const satisfies readonly Mgs1VrVfxAsset[];

export const MGS1_VR_GAMEPLAY_ALL_ASSETS = [
  ...MGS1_VR_ACTOR_ASSETS,
  ...MGS1_VR_STATIC_CHARACTER_ASSETS,
  ...MGS1_VR_WEAPON_ASSETS,
  ...MGS1_VR_PROJECTILE_ASSETS,
  ...MGS1_VR_SPECIAL_PROP_ASSETS,
  ...MGS1_VR_VFX_ASSETS
] as const satisfies readonly Mgs1VrGameplayAsset[];

/** Readable alias for consumers that put `ALL` before the pack name. */
export const MGS1_VR_ALL_GAMEPLAY_ASSETS = MGS1_VR_GAMEPLAY_ALL_ASSETS;

export type Mgs1VrGameplayAssetId = (typeof MGS1_VR_GAMEPLAY_ALL_ASSETS)[number]['id'];

const assetById = new Map<string, Mgs1VrGameplayAsset>(
  MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => [asset.id, asset])
);

const assetByTexture = new Map<string, Mgs1VrGameplayAsset>(
  MGS1_VR_GAMEPLAY_ALL_ASSETS.map((asset) => [asset.textureKey, asset])
);

const actorByTexture = new Map<string, Mgs1VrActorAsset>(
  MGS1_VR_ACTOR_ASSETS.map((asset) => [asset.textureKey, asset])
);

const vfxByTexture = new Map<string, Mgs1VrVfxAsset>(
  MGS1_VR_VFX_ASSETS.map((asset) => [asset.textureKey, asset])
);

export function getMgs1VrGameplayAssetById(id: string): Mgs1VrGameplayAsset | undefined {
  return assetById.get(id);
}

export function getMgs1VrGameplayAssetByTexture(textureKey: string): Mgs1VrGameplayAsset | undefined {
  return assetByTexture.get(textureKey);
}

/** Returns one preload entry per Phaser texture key, preserving source order. */
export function collectMgs1VrGameplayAssets(
  assets: readonly Mgs1VrGameplayAsset[] = MGS1_VR_GAMEPLAY_ALL_ASSETS
): Mgs1VrGameplayAsset[] {
  const byTextureKey = new Map<string, Mgs1VrGameplayAsset>();
  assets.forEach((asset) => {
    if (!byTextureKey.has(asset.textureKey)) byTextureKey.set(asset.textureKey, asset);
  });
  return [...byTextureKey.values()];
}

export function getMgs1VrActorAnimationKey(textureKey: string, state: Mgs1VrActorAnimationState): string {
  return `mgs1-vr:${textureKey}:${state}`;
}

export function getMgs1VrActorAnimationClip(
  textureKey: string,
  state: Mgs1VrActorAnimationState
): Mgs1VrAnimationClip | undefined {
  return actorByTexture.get(textureKey)?.clips[state];
}

export function getMgs1VrVfxAnimationKey(textureKey: string): string {
  return `mgs1-vr:${textureKey}:play`;
}

export function getMgs1VrVfxAnimationClip(textureKey: string): Mgs1VrAnimationClip | undefined {
  return vfxByTexture.get(textureKey)?.clip;
}
