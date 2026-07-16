export type Mgs1VrEnvironmentAssetCategory = 'tile' | 'prop' | 'structure' | 'target' | 'hazard';

export type Mgs1VrEnvironmentFallbackShape =
  | 'surface'
  | 'block'
  | 'sensor'
  | 'marker'
  | 'target'
  | 'hazard'
  | 'pickup';

export interface Mgs1VrEnvironmentAsset {
  id: string;
  category: Mgs1VrEnvironmentAssetCategory;
  textureKey: string;
  path: string;
  width: number;
  height: number;
  loader: 'image';
  fallbackShape: Mgs1VrEnvironmentFallbackShape;
  fallbackPrimaryColor: number;
  fallbackAccentColor: number;
}

/** Seamless surfaces used by the late-1990s VR simulation backdrops. */
export const MGS1_VR_TILE_ASSETS = [
  { id: 'mgs1_vr_env_tile_grid_cyan', category: 'tile', textureKey: 'mgs1VrEnvTileGridCyan', path: '/vr/mgs1/environment/tiles/grid-cyan.png', width: 128, height: 128, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x061721, fallbackAccentColor: 0x39dff2 },
  { id: 'mgs1_vr_env_tile_grid_green', category: 'tile', textureKey: 'mgs1VrEnvTileGridGreen', path: '/vr/mgs1/environment/tiles/grid-green.png', width: 128, height: 128, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x06170d, fallbackAccentColor: 0x35e77c },
  { id: 'mgs1_vr_env_tile_grid_amber', category: 'tile', textureKey: 'mgs1VrEnvTileGridAmber', path: '/vr/mgs1/environment/tiles/grid-amber.png', width: 128, height: 128, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x1a1105, fallbackAccentColor: 0xffba45 },
  { id: 'mgs1_vr_env_tile_matrix_void', category: 'tile', textureKey: 'mgs1VrEnvTileMatrixVoid', path: '/vr/mgs1/environment/tiles/matrix-void.png', width: 256, height: 256, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x010506, fallbackAccentColor: 0x12363a },
  { id: 'mgs1_vr_env_tile_water', category: 'tile', textureKey: 'mgs1VrEnvTileWater', path: '/vr/mgs1/environment/tiles/water.png', width: 128, height: 64, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x062433, fallbackAccentColor: 0x3ccfe1 },
  { id: 'mgs1_vr_env_tile_lava', category: 'tile', textureKey: 'mgs1VrEnvTileLava', path: '/vr/mgs1/environment/tiles/lava.png', width: 128, height: 64, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x3a0a06, fallbackAccentColor: 0xff7238 },
  { id: 'mgs1_vr_env_tile_hazard_red', category: 'tile', textureKey: 'mgs1VrEnvTileHazardRed', path: '/vr/mgs1/environment/tiles/hazard-red.png', width: 128, height: 128, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x250509, fallbackAccentColor: 0xff4a57 },
  { id: 'mgs1_vr_env_tile_glass_data', category: 'tile', textureKey: 'mgs1VrEnvTileGlassData', path: '/vr/mgs1/environment/tiles/glass-data.png', width: 128, height: 128, loader: 'image', fallbackShape: 'surface', fallbackPrimaryColor: 0x09232b, fallbackAccentColor: 0x78f3e3 }
] as const satisfies readonly Mgs1VrEnvironmentAsset[];

/** Small reusable objects. They are decoration-only in the additive layouts. */
export const MGS1_VR_PROP_ASSETS = [
  { id: 'mgs1_vr_env_prop_platform_tile', category: 'prop', textureKey: 'mgs1VrEnvPropPlatformTile', path: '/vr/mgs1/environment/props/platform-tile.png', width: 64, height: 16, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x174d45, fallbackAccentColor: 0x5df6c8 },
  { id: 'mgs1_vr_env_prop_checkpoint_frame', category: 'prop', textureKey: 'mgs1VrEnvPropCheckpointFrame', path: '/vr/mgs1/environment/props/checkpoint-frame.png', width: 42, height: 68, loader: 'image', fallbackShape: 'marker', fallbackPrimaryColor: 0x15585b, fallbackAccentColor: 0x65f2e2 },
  { id: 'mgs1_vr_env_prop_camera_node', category: 'prop', textureKey: 'mgs1VrEnvPropCameraNode', path: '/vr/mgs1/environment/props/camera-node.png', width: 30, height: 20, loader: 'image', fallbackShape: 'sensor', fallbackPrimaryColor: 0x536462, fallbackAccentColor: 0xff5858 },
  { id: 'mgs1_vr_env_prop_secret_node', category: 'prop', textureKey: 'mgs1VrEnvPropSecretNode', path: '/vr/mgs1/environment/props/secret-node.png', width: 16, height: 16, loader: 'image', fallbackShape: 'pickup', fallbackPrimaryColor: 0x43d6c1, fallbackAccentColor: 0xeaffff },
  { id: 'mgs1_vr_env_prop_route_marker', category: 'prop', textureKey: 'mgs1VrEnvPropRouteMarker', path: '/vr/mgs1/environment/props/route-marker.png', width: 28, height: 56, loader: 'image', fallbackShape: 'marker', fallbackPrimaryColor: 0x195949, fallbackAccentColor: 0x75ffc2 },
  { id: 'mgs1_vr_env_prop_wall_block', category: 'prop', textureKey: 'mgs1VrEnvPropWallBlock', path: '/vr/mgs1/environment/props/wall-block.png', width: 64, height: 64, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x153c39, fallbackAccentColor: 0x4de7c6 },
  { id: 'mgs1_vr_env_prop_data_crate', category: 'prop', textureKey: 'mgs1VrEnvPropDataCrate', path: '/vr/mgs1/environment/props/data-crate.png', width: 40, height: 40, loader: 'image', fallbackShape: 'pickup', fallbackPrimaryColor: 0x315357, fallbackAccentColor: 0x75e7d8 },
  { id: 'mgs1_vr_env_prop_boundary_pillar', category: 'prop', textureKey: 'mgs1VrEnvPropBoundaryPillar', path: '/vr/mgs1/environment/props/boundary-pillar.png', width: 24, height: 92, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x16423d, fallbackAccentColor: 0x52dcb8 },
  { id: 'mgs1_vr_env_prop_target_pedestal', category: 'prop', textureKey: 'mgs1VrEnvPropTargetPedestal', path: '/vr/mgs1/environment/props/target-pedestal.png', width: 48, height: 16, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x25504e, fallbackAccentColor: 0x5bd9d2 },
  { id: 'mgs1_vr_env_prop_hazard_strip', category: 'prop', textureKey: 'mgs1VrEnvPropHazardStrip', path: '/vr/mgs1/environment/props/hazard-strip.png', width: 64, height: 8, loader: 'image', fallbackShape: 'hazard', fallbackPrimaryColor: 0x56191c, fallbackAccentColor: 0xff6464 },
  { id: 'mgs1_vr_env_prop_glass_cover', category: 'prop', textureKey: 'mgs1VrEnvPropGlassCover', path: '/vr/mgs1/environment/props/glass-cover.png', width: 64, height: 64, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x183c45, fallbackAccentColor: 0x8ae9e0 },
  { id: 'mgs1_vr_env_prop_laser_beacon', category: 'prop', textureKey: 'mgs1VrEnvPropLaserBeacon', path: '/vr/mgs1/environment/props/laser-beacon.png', width: 24, height: 48, loader: 'image', fallbackShape: 'marker', fallbackPrimaryColor: 0x582027, fallbackAccentColor: 0xff535f }
] as const satisfies readonly Mgs1VrEnvironmentAsset[];

/** Side-view adaptations of the modular walls and platforms seen in VR stages. */
export const MGS1_VR_STRUCTURE_ASSETS = [
  { id: 'mgs1_vr_env_structure_raised_platform', category: 'structure', textureKey: 'mgs1VrEnvStructureRaisedPlatform', path: '/vr/mgs1/environment/structures/raised-platform.png', width: 96, height: 64, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x17443f, fallbackAccentColor: 0x55d8b7 },
  { id: 'mgs1_vr_env_structure_low_wall', category: 'structure', textureKey: 'mgs1VrEnvStructureLowWall', path: '/vr/mgs1/environment/structures/low-wall.png', width: 96, height: 32, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x173d3b, fallbackAccentColor: 0x50c9bb },
  { id: 'mgs1_vr_env_structure_stairs', category: 'structure', textureKey: 'mgs1VrEnvStructureStairs', path: '/vr/mgs1/environment/structures/stairs.png', width: 96, height: 48, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x19453f, fallbackAccentColor: 0x64e3b8 },
  { id: 'mgs1_vr_env_structure_ramp', category: 'structure', textureKey: 'mgs1VrEnvStructureRamp', path: '/vr/mgs1/environment/structures/ramp.png', width: 96, height: 48, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x194641, fallbackAccentColor: 0x57d7b2 },
  { id: 'mgs1_vr_env_structure_bridge', category: 'structure', textureKey: 'mgs1VrEnvStructureBridge', path: '/vr/mgs1/environment/structures/bridge.png', width: 128, height: 32, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x183f3b, fallbackAccentColor: 0x58dec2 },
  { id: 'mgs1_vr_env_structure_air_duct', category: 'structure', textureKey: 'mgs1VrEnvStructureAirDuct', path: '/vr/mgs1/environment/structures/air-duct.png', width: 96, height: 48, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x3c4d4b, fallbackAccentColor: 0x83b7ad },
  { id: 'mgs1_vr_env_structure_suspended_slab', category: 'structure', textureKey: 'mgs1VrEnvStructureSuspendedSlab', path: '/vr/mgs1/environment/structures/suspended-slab.png', width: 96, height: 16, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x173f3d, fallbackAccentColor: 0x56d4c2 },
  { id: 'mgs1_vr_env_structure_pit_edge', category: 'structure', textureKey: 'mgs1VrEnvStructurePitEdge', path: '/vr/mgs1/environment/structures/pit-edge.png', width: 128, height: 48, loader: 'image', fallbackShape: 'hazard', fallbackPrimaryColor: 0x39181b, fallbackAccentColor: 0xff5a5f },
  { id: 'mgs1_vr_env_structure_glass_panel', category: 'structure', textureKey: 'mgs1VrEnvStructureGlassPanel', path: '/vr/mgs1/environment/structures/glass-panel.png', width: 64, height: 64, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x163d46, fallbackAccentColor: 0x84e7df },
  { id: 'mgs1_vr_env_structure_glass_broken', category: 'structure', textureKey: 'mgs1VrEnvStructureGlassBroken', path: '/vr/mgs1/environment/structures/glass-broken.png', width: 64, height: 64, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x243f46, fallbackAccentColor: 0x89d8d3 },
  { id: 'mgs1_vr_env_structure_wall_cracked', category: 'structure', textureKey: 'mgs1VrEnvStructureWallCracked', path: '/vr/mgs1/environment/structures/wall-cracked.png', width: 64, height: 48, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x304443, fallbackAccentColor: 0x77a9a2 },
  { id: 'mgs1_vr_env_structure_wall_rubble', category: 'structure', textureKey: 'mgs1VrEnvStructureWallRubble', path: '/vr/mgs1/environment/structures/wall-rubble.png', width: 64, height: 32, loader: 'image', fallbackShape: 'block', fallbackPrimaryColor: 0x364746, fallbackAccentColor: 0x73958f }
] as const satisfies readonly Mgs1VrEnvironmentAsset[];

/** Canon target nomenclature from the original VR Missions target stages. */
export const MGS1_VR_TARGET_ASSETS = [
  { id: 'mgs1_vr_env_target_cube_b', category: 'target', textureKey: 'mgs1VrEnvTargetCubeBlue', path: '/vr/mgs1/environment/targets/cube-b.png', width: 32, height: 32, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x1a4f8d, fallbackAccentColor: 0x55cfff },
  { id: 'mgs1_vr_env_target_cube_r', category: 'target', textureKey: 'mgs1VrEnvTargetCubeRed', path: '/vr/mgs1/environment/targets/cube-r.png', width: 32, height: 32, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x8f2632, fallbackAccentColor: 0xff6a70 },
  { id: 'mgs1_vr_env_target_kokeshi_b', category: 'target', textureKey: 'mgs1VrEnvTargetKokeshiBlue', path: '/vr/mgs1/environment/targets/kokeshi-b.png', width: 24, height: 36, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x24548c, fallbackAccentColor: 0x77d5ff },
  { id: 'mgs1_vr_env_target_kokeshi_g', category: 'target', textureKey: 'mgs1VrEnvTargetKokeshiGreen', path: '/vr/mgs1/environment/targets/kokeshi-g.png', width: 24, height: 36, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x237348, fallbackAccentColor: 0x72f0a3 },
  { id: 'mgs1_vr_env_target_move_b', category: 'target', textureKey: 'mgs1VrEnvTargetMoveBlue', path: '/vr/mgs1/environment/targets/move-b.png', width: 32, height: 40, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x264f85, fallbackAccentColor: 0x63c9ff },
  { id: 'mgs1_vr_env_target_move_r', category: 'target', textureKey: 'mgs1VrEnvTargetMoveRed', path: '/vr/mgs1/environment/targets/move-r.png', width: 32, height: 40, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x862632, fallbackAccentColor: 0xff6873 },
  { id: 'mgs1_vr_env_target_wall', category: 'target', textureKey: 'mgs1VrEnvTargetWall', path: '/vr/mgs1/environment/targets/wall.png', width: 40, height: 32, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x164e68, fallbackAccentColor: 0x40dfff },
  { id: 'mgs1_vr_env_target_ufo', category: 'target', textureKey: 'mgs1VrEnvTargetUfo', path: '/vr/mgs1/environment/targets/ufo.png', width: 48, height: 28, loader: 'image', fallbackShape: 'target', fallbackPrimaryColor: 0x7a2d14, fallbackAccentColor: 0xff6c20 }
] as const satisfies readonly Mgs1VrEnvironmentAsset[];

/** Goal, surveillance, pickup and trap vocabulary shared by advanced stages. */
export const MGS1_VR_HAZARD_ASSETS = [
  { id: 'mgs1_vr_env_hazard_goal_beacon', category: 'hazard', textureKey: 'mgs1VrEnvHazardGoalBeacon', path: '/vr/mgs1/environment/hazards/goal-beacon.png', width: 32, height: 64, loader: 'image', fallbackShape: 'marker', fallbackPrimaryColor: 0x1e6d55, fallbackAccentColor: 0x75ffad },
  { id: 'mgs1_vr_env_hazard_gun_camera', category: 'hazard', textureKey: 'mgs1VrEnvHazardGunCamera', path: '/vr/mgs1/environment/hazards/gun-camera.png', width: 30, height: 20, loader: 'image', fallbackShape: 'sensor', fallbackPrimaryColor: 0x596865, fallbackAccentColor: 0xff5757 },
  { id: 'mgs1_vr_env_hazard_spotlight', category: 'hazard', textureKey: 'mgs1VrEnvHazardSpotlight', path: '/vr/mgs1/environment/hazards/spotlight.png', width: 32, height: 24, loader: 'image', fallbackShape: 'sensor', fallbackPrimaryColor: 0x586765, fallbackAccentColor: 0xf7ef8f },
  { id: 'mgs1_vr_env_hazard_laser_emitter', category: 'hazard', textureKey: 'mgs1VrEnvHazardLaserEmitter', path: '/vr/mgs1/environment/hazards/laser-emitter.png', width: 24, height: 56, loader: 'image', fallbackShape: 'hazard', fallbackPrimaryColor: 0x562027, fallbackAccentColor: 0xff555e },
  { id: 'mgs1_vr_env_hazard_laser_beam', category: 'hazard', textureKey: 'mgs1VrEnvHazardLaserBeam', path: '/vr/mgs1/environment/hazards/laser-beam.png', width: 64, height: 8, loader: 'image', fallbackShape: 'hazard', fallbackPrimaryColor: 0xc22639, fallbackAccentColor: 0xff8189 },
  { id: 'mgs1_vr_env_hazard_claymore', category: 'hazard', textureKey: 'mgs1VrEnvHazardClaymore', path: '/vr/mgs1/environment/hazards/claymore.png', width: 24, height: 18, loader: 'image', fallbackShape: 'hazard', fallbackPrimaryColor: 0x47564c, fallbackAccentColor: 0xd2b965 },
  { id: 'mgs1_vr_env_hazard_ammo_package', category: 'hazard', textureKey: 'mgs1VrEnvHazardAmmoPackage', path: '/vr/mgs1/environment/hazards/ammo-package.png', width: 28, height: 20, loader: 'image', fallbackShape: 'pickup', fallbackPrimaryColor: 0x65705f, fallbackAccentColor: 0xd0bd74 },
  { id: 'mgs1_vr_env_hazard_mystery_package', category: 'hazard', textureKey: 'mgs1VrEnvHazardMysteryPackage', path: '/vr/mgs1/environment/hazards/mystery-package.png', width: 24, height: 28, loader: 'image', fallbackShape: 'pickup', fallbackPrimaryColor: 0x4b486f, fallbackAccentColor: 0xc29cff }
] as const satisfies readonly Mgs1VrEnvironmentAsset[];

export const MGS1_VR_ALL_ASSETS = [
  ...MGS1_VR_TILE_ASSETS,
  ...MGS1_VR_PROP_ASSETS,
  ...MGS1_VR_STRUCTURE_ASSETS,
  ...MGS1_VR_TARGET_ASSETS,
  ...MGS1_VR_HAZARD_ASSETS
] as const satisfies readonly Mgs1VrEnvironmentAsset[];

export type Mgs1VrEnvironmentAssetId = (typeof MGS1_VR_ALL_ASSETS)[number]['id'];

export type Mgs1VrMapVariant =
  | 'dock_infiltration_short'
  | 'dock_infiltration_stealth'
  | 'weapon_range_linear'
  | 'cqc_corridor'
  | 'surveillance_yard'
  | 'boss_arena_vr';

export interface Mgs1VrEnvironmentPlacement {
  assetId: Mgs1VrEnvironmentAssetId;
  x: number;
  y: number;
  depth: number;
  scale: number;
  alpha: number;
  flipX?: boolean;
  /** Layout decorations never create colliders or alter mission geometry. */
  physical: false;
}

export interface Mgs1VrEnvironmentLayout {
  mapVariant: Mgs1VrMapVariant;
  voidColor: number;
  gridColor: number;
  accentColor: number;
  voidTextureKey: (typeof MGS1_VR_TILE_ASSETS)[number]['textureKey'];
  gridTextureKey: (typeof MGS1_VR_TILE_ASSETS)[number]['textureKey'];
  accentTextureKey: (typeof MGS1_VR_TILE_ASSETS)[number]['textureKey'];
  placements: readonly Mgs1VrEnvironmentPlacement[];
}

const decoration = (
  assetId: Mgs1VrEnvironmentAssetId,
  x: number,
  y: number,
  depth = -10,
  scale = 1,
  alpha = 0.9,
  flipX?: boolean
): Mgs1VrEnvironmentPlacement => ({ assetId, x, y, depth, scale, alpha, flipX, physical: false });

/**
 * Six additive visual layouts matching the six mission-data map variants.
 * Coordinates stay inside the fixed 1900 x 540 VR world and deliberately do
 * not replace the scene's existing Arcade Physics platforms.
 */
export const MGS1_VR_ENVIRONMENT_LAYOUTS: Readonly<Record<Mgs1VrMapVariant, Mgs1VrEnvironmentLayout>> = {
  dock_infiltration_short: {
    mapVariant: 'dock_infiltration_short',
    voidColor: 0x02080d,
    gridColor: 0x20d9dc,
    accentColor: 0x5bf0c0,
    voidTextureKey: 'mgs1VrEnvTileMatrixVoid',
    gridTextureKey: 'mgs1VrEnvTileGridCyan',
    accentTextureKey: 'mgs1VrEnvTileWater',
    placements: [
      decoration('mgs1_vr_env_structure_bridge', 210, 432, -10, 1, 0.82),
      decoration('mgs1_vr_env_structure_raised_platform', 480, 448, -9, 1, 0.86),
      decoration('mgs1_vr_env_structure_stairs', 690, 458, -9, 1, 0.82),
      decoration('mgs1_vr_env_prop_boundary_pillar', 860, 418, -10, 1, 0.8),
      decoration('mgs1_vr_env_structure_suspended_slab', 1050, 300, -10, 1, 0.72),
      decoration('mgs1_vr_env_prop_data_crate', 1230, 466, -8, 1, 0.86),
      decoration('mgs1_vr_env_structure_air_duct', 1450, 452, -9, 1, 0.78),
      decoration('mgs1_vr_env_prop_boundary_pillar', 1690, 418, -10, 1, 0.76)
    ]
  },
  dock_infiltration_stealth: {
    mapVariant: 'dock_infiltration_stealth',
    voidColor: 0x010904,
    gridColor: 0x27e06a,
    accentColor: 0x89ffce,
    voidTextureKey: 'mgs1VrEnvTileMatrixVoid',
    gridTextureKey: 'mgs1VrEnvTileGridGreen',
    accentTextureKey: 'mgs1VrEnvTileGlassData',
    placements: [
      decoration('mgs1_vr_env_structure_low_wall', 180, 474, -9, 1, 0.8),
      decoration('mgs1_vr_env_prop_wall_block', 385, 446, -10, 1, 0.72),
      decoration('mgs1_vr_env_structure_air_duct', 575, 270, -10, 1, 0.72, true),
      decoration('mgs1_vr_env_prop_glass_cover', 760, 446, -9, 1, 0.78),
      decoration('mgs1_vr_env_structure_suspended_slab', 970, 290, -10, 1, 0.76),
      decoration('mgs1_vr_env_prop_boundary_pillar', 1110, 418, -10, 1, 0.74),
      decoration('mgs1_vr_env_structure_glass_panel', 1290, 446, -9, 1, 0.76),
      decoration('mgs1_vr_env_prop_data_crate', 1450, 466, -8, 1, 0.76),
      decoration('mgs1_vr_env_structure_ramp', 1620, 458, -9, 1, 0.82),
      decoration('mgs1_vr_env_structure_low_wall', 1770, 474, -9, 0.8, 0.68)
    ]
  },
  weapon_range_linear: {
    mapVariant: 'weapon_range_linear',
    voidColor: 0x080601,
    gridColor: 0xffc047,
    accentColor: 0xff4a4a,
    voidTextureKey: 'mgs1VrEnvTileMatrixVoid',
    gridTextureKey: 'mgs1VrEnvTileGridAmber',
    accentTextureKey: 'mgs1VrEnvTileHazardRed',
    placements: [
      decoration('mgs1_vr_env_structure_low_wall', 285, 474, -10, 0.9, 0.72),
      decoration('mgs1_vr_env_prop_target_pedestal', 470, 478, -8, 1, 0.9),
      decoration('mgs1_vr_env_prop_target_pedestal', 710, 326, -8, 1, 0.9),
      decoration('mgs1_vr_env_prop_target_pedestal', 965, 478, -8, 1, 0.9),
      decoration('mgs1_vr_env_prop_target_pedestal', 1180, 398, -8, 1, 0.9),
      decoration('mgs1_vr_env_prop_target_pedestal', 1510, 478, -8, 1, 0.9),
      decoration('mgs1_vr_env_structure_glass_panel', 1665, 446, -10, 1, 0.62),
      decoration('mgs1_vr_env_prop_hazard_strip', 1780, 500, -8, 1.4, 0.72)
    ]
  },
  cqc_corridor: {
    mapVariant: 'cqc_corridor',
    voidColor: 0x030807,
    gridColor: 0x5be68e,
    accentColor: 0xffd166,
    voidTextureKey: 'mgs1VrEnvTileMatrixVoid',
    gridTextureKey: 'mgs1VrEnvTileGridGreen',
    accentTextureKey: 'mgs1VrEnvTileGridAmber',
    placements: [
      decoration('mgs1_vr_env_structure_wall_cracked', 160, 456, -9, 1, 0.8),
      decoration('mgs1_vr_env_structure_wall_rubble', 330, 472, -8, 1, 0.86),
      decoration('mgs1_vr_env_structure_low_wall', 520, 474, -9, 1, 0.82),
      decoration('mgs1_vr_env_prop_hazard_strip', 705, 492, -7, 1, 0.9),
      decoration('mgs1_vr_env_structure_glass_broken', 875, 446, -9, 1, 0.8),
      decoration('mgs1_vr_env_structure_stairs', 1080, 458, -9, 1, 0.82, true),
      decoration('mgs1_vr_env_structure_ramp', 1300, 458, -9, 1, 0.82),
      decoration('mgs1_vr_env_structure_air_duct', 1510, 452, -9, 1, 0.76),
      decoration('mgs1_vr_env_structure_wall_rubble', 1665, 472, -8, 1, 0.84, true),
      decoration('mgs1_vr_env_prop_boundary_pillar', 1800, 418, -10, 1, 0.72)
    ]
  },
  surveillance_yard: {
    mapVariant: 'surveillance_yard',
    voidColor: 0x02060b,
    gridColor: 0x48d9ff,
    accentColor: 0xb266ff,
    voidTextureKey: 'mgs1VrEnvTileMatrixVoid',
    gridTextureKey: 'mgs1VrEnvTileGridCyan',
    accentTextureKey: 'mgs1VrEnvTileGlassData',
    placements: [
      decoration('mgs1_vr_env_prop_boundary_pillar', 480, 418, -10, 1, 0.74),
      decoration('mgs1_vr_env_prop_boundary_pillar', 880, 418, -10, 1, 0.74),
      decoration('mgs1_vr_env_prop_boundary_pillar', 1280, 418, -10, 1, 0.74),
      decoration('mgs1_vr_env_hazard_laser_emitter', 590, 300, -10, 0.8, 0.42),
      decoration('mgs1_vr_env_hazard_laser_beam', 710, 300, -10, 1.5, 0.36),
      decoration('mgs1_vr_env_hazard_spotlight', 1080, 205, -10, 1, 0.52, true),
      decoration('mgs1_vr_env_structure_glass_panel', 1450, 446, -9, 1, 0.78),
      decoration('mgs1_vr_env_structure_glass_broken', 1620, 446, -9, 1, 0.68),
      decoration('mgs1_vr_env_structure_low_wall', 1780, 474, -9, 0.8, 0.64)
    ]
  },
  boss_arena_vr: {
    mapVariant: 'boss_arena_vr',
    voidColor: 0x0b0204,
    gridColor: 0xff3f58,
    accentColor: 0xffb02e,
    voidTextureKey: 'mgs1VrEnvTileMatrixVoid',
    gridTextureKey: 'mgs1VrEnvTileHazardRed',
    accentTextureKey: 'mgs1VrEnvTileLava',
    placements: [
      decoration('mgs1_vr_env_structure_pit_edge', 170, 456, -9, 1, 0.88),
      decoration('mgs1_vr_env_prop_boundary_pillar', 365, 418, -9, 1, 0.86),
      decoration('mgs1_vr_env_structure_wall_cracked', 550, 448, -9, 1, 0.82),
      decoration('mgs1_vr_env_structure_raised_platform', 760, 448, -9, 1, 0.88),
      decoration('mgs1_vr_env_prop_hazard_strip', 950, 500, -8, 1.5, 0.84),
      decoration('mgs1_vr_env_structure_raised_platform', 1140, 448, -9, 1, 0.88, true),
      decoration('mgs1_vr_env_prop_platform_tile', 1320, 472, -8, 1, 0.9),
      decoration('mgs1_vr_env_structure_bridge', 1500, 458, -9, 1, 0.86),
      decoration('mgs1_vr_env_prop_laser_beacon', 1670, 456, -7, 1, 0.94),
      decoration('mgs1_vr_env_prop_boundary_pillar', 1800, 418, -9, 1, 0.78)
    ]
  }
};

const FALLBACK_MGS1_VR_VARIANT: Mgs1VrMapVariant = 'dock_infiltration_short';

export const isMgs1VrMapVariant = (value: string): value is Mgs1VrMapVariant =>
  Object.prototype.hasOwnProperty.call(MGS1_VR_ENVIRONMENT_LAYOUTS, value);

/** Resolves mission JSON's string variant while keeping a deterministic fallback. */
export const resolveMgs1VrEnvironment = (mapVariant: string | null | undefined): Mgs1VrEnvironmentLayout =>
  MGS1_VR_ENVIRONMENT_LAYOUTS[
    mapVariant && isMgs1VrMapVariant(mapVariant) ? mapVariant : FALLBACK_MGS1_VR_VARIANT
  ];

/** Returns one preload entry per Phaser texture key, preserving source order. */
export const collectMgs1VrEnvironmentAssets = (
  assets: readonly Mgs1VrEnvironmentAsset[] = MGS1_VR_ALL_ASSETS
): Mgs1VrEnvironmentAsset[] => {
  const byTextureKey = new Map<string, Mgs1VrEnvironmentAsset>();
  assets.forEach((asset) => {
    if (!byTextureKey.has(asset.textureKey)) byTextureKey.set(asset.textureKey, asset);
  });
  return [...byTextureKey.values()];
};
