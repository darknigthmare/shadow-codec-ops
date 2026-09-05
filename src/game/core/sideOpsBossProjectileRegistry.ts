import definitions from '../../data/sideopsBossProjectileVisuals.json';

export interface SideOpsBossProjectileVisual {
  readonly id: string;
  readonly sourceTextureKey: string;
  readonly label: string;
  readonly weaponKind: 'railgun' | 'water-cutter' | 'autocannon' | 'electric-shock';
  readonly palette: string;
  readonly row: number;
  readonly textureKey: string;
  readonly path: string;
  readonly frameWidth: 192;
  readonly frameHeight: 64;
  readonly frameCount: 4;
  /** Display and collision dimensions are WORLD pixels, not source pixels. */
  readonly width: number;
  readonly height: number;
  readonly hitbox: { readonly width: number; readonly height: number };
  /** Fractions of the live collision body, measured from its center; +x is forward. */
  readonly muzzle: { readonly x: number; readonly y: number };
  readonly sourceFacing: 'right';
  readonly provenance: 'openai-authored-phases';
  readonly gameplayAdaptation: string;
}

export interface SideOpsBossProjectileClip {
  readonly key: string;
  readonly textureKey: string;
  readonly start: 0;
  readonly end: 3;
  readonly frameRate: 12;
  readonly repeat: -1;
}

export const SIDEOPS_BOSS_PROJECTILE_VISUALS = definitions as readonly SideOpsBossProjectileVisual[];
export const SIDEOPS_BOSS_PROJECTILE_CLIPS: readonly SideOpsBossProjectileClip[] =
  SIDEOPS_BOSS_PROJECTILE_VISUALS.map((visual) => ({
    key: `${visual.textureKey}:flight`, textureKey: visual.textureKey,
    start: 0, end: 3, frameRate: 12, repeat: -1
  }));

export function resolveSideOpsBossProjectileVisual(sourceTextureKey: string): (SideOpsBossProjectileVisual & { clip: SideOpsBossProjectileClip }) | undefined {
  const visual = SIDEOPS_BOSS_PROJECTILE_VISUALS.find((entry) => entry.sourceTextureKey === sourceTextureKey);
  const clip = visual && SIDEOPS_BOSS_PROJECTILE_CLIPS.find((entry) => entry.textureKey === visual.textureKey);
  return visual && clip ? { ...visual, clip } : undefined;
}

/** Pure world-space muzzle calculation: never use the padded animation canvas. */
export function resolveSideOpsBossProjectileMuzzle(
  sourceTextureKey: string,
  body: { readonly center: { readonly x: number; readonly y: number }; readonly width: number; readonly height: number },
  direction: -1 | 1
): { x: number; y: number } | undefined {
  const visual = resolveSideOpsBossProjectileVisual(sourceTextureKey);
  if (!visual || ![body.center.x, body.center.y, body.width, body.height].every(Number.isFinite)
    || body.width <= 0 || body.height <= 0) return undefined;
  return {
    x: body.center.x + direction * body.width * visual.muzzle.x,
    y: body.center.y + body.height * visual.muzzle.y
  };
}

/** Rotate an existing salve around its locked aim line without changing speed or spread. */
export function resolveSideOpsBossProjectileVelocity<T extends { readonly velocityX: number; readonly velocityY: number }>(
  shot: T,
  originalOrigin: { readonly x: number; readonly y: number },
  muzzle: { readonly x: number; readonly y: number },
  target: { readonly x: number; readonly y: number }
): T {
  if (![shot.velocityX, shot.velocityY, originalOrigin.x, originalOrigin.y, muzzle.x, muzzle.y, target.x, target.y].every(Number.isFinite)) return shot;
  const oldX = target.x - originalOrigin.x;
  const oldY = target.y - originalOrigin.y;
  const newX = target.x - muzzle.x;
  const newY = target.y - muzzle.y;
  const speed = Math.hypot(shot.velocityX, shot.velocityY);
  if (![oldX, oldY, newX, newY, speed].every(Number.isFinite)
    || speed === 0 || (oldX === 0 && oldY === 0) || (newX === 0 && newY === 0)) return shot;
  const rotation = Math.atan2(newY, newX) - Math.atan2(oldY, oldX);
  const angle = Math.atan2(shot.velocityY, shot.velocityX) + rotation;
  return { ...shot, velocityX: Math.cos(angle) * speed, velocityY: Math.sin(angle) * speed };
}
