/**
 * Side Ops reuses the complete OpenAI-authored MGS1 VR library instead of
 * inventing a second visual language for the same simulation era.
 */
export const VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES = {
  playerTexture: 'vrPlayer',
  guardTexture: 'vrGuard',
  reinforcementTexture: 'vrGuard',
  bossTexture: 'vrBoss',
  enemyProjectileTexture: 'mgs1VrProjectileFamasTracer',
  impactVfxTexture: 'mgs1VrVfxBulletImpact',
  battlefieldPropTexture: 'mgs1VrEnvPropDataCrate'
} as const;

export const VR_SIMULATION_SIDEOPS_DEFAULT_HOSTILE_TEXTURES = {
  guardTexture: VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES.guardTexture,
  reinforcementTexture: VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES.reinforcementTexture,
  bossTexture: VR_SIMULATION_SIDEOPS_RUNTIME_TEXTURES.bossTexture
} as const;
