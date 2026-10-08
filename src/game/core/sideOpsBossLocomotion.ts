export interface SideOpsBossHoverContract {
  readonly altitude: number;
  readonly allowGravity: false;
  readonly velocityY: 0;
}

/**
 * Minimal side-view adaptation: Chrysalis holds its authored spawn altitude.
 * This is not a helicopter flight model. All other identities keep the existing
 * grounded Arcade behavior; never classify flight from a pack or sheet name.
 */
export function resolveSideOpsBossHoverContract(sourceTextureKey: string, spawnY: number): SideOpsBossHoverContract | undefined {
  if (sourceTextureKey !== 'peaceWalkerChrysalis' || !Number.isFinite(spawnY) || spawnY < 0) return undefined;
  return { altitude: spawnY, allowGravity: false, velocityY: 0 };
}
