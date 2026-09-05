import manifest from '../../data/sideopsSpecialActorAnimations.json';

export type SideOpsSpecialActorId = 'mgs1-revolver-ocelot' | 'mgs1-otacon' | 'mgs1-metal-gear-rex';
export type SideOpsSpecialActorBoard = 'core' | 'special';
export type SideOpsSpecialActorState =
  | 'idle' | 'move' | 'attack' | 'reload' | 'melee' | 'hit' | 'death' | 'interact'
  | 'crouch' | 'radio' | 'fear' | 'missile' | 'laser' | 'railgun' | 'scan';

export interface SideOpsSpecialActorDefinition {
  readonly id: SideOpsSpecialActorId;
  readonly name: string;
  readonly era: 'mgs1';
  readonly kind: 'boss' | 'npc' | 'machine';
  /** Original texture identifies the actor, never its current animation frame. */
  readonly sourceTextureKey: string;
  readonly sourcePath: string;
  /** Authored orientation is explicit; never mirror source pixels to guess it. */
  readonly sourceFacing: 'right' | 'left';
  readonly frameSize: 128 | 256;
  readonly padding: 8 | 16;
  /** Existing world-space collision contract, independent of authored art. */
  readonly bodyWidth: number;
  readonly bodyHeight: number;
  readonly states: Readonly<Record<SideOpsSpecialActorBoard, readonly SideOpsSpecialActorState[]>>;
}

export interface SideOpsSpecialActorAnimationSheet {
  readonly actorId: SideOpsSpecialActorId;
  readonly sourceTextureKey: string;
  readonly board: SideOpsSpecialActorBoard;
  readonly textureKey: string;
  readonly path: string;
  readonly frameWidth: 128 | 256;
  readonly frameHeight: 128 | 256;
  readonly frameCount: 16;
  readonly columns: 4;
  readonly rows: 4;
  readonly provenance: 'openai-authored-poses';
}

export interface SideOpsSpecialActorAnimationClip {
  readonly actorId: SideOpsSpecialActorId;
  readonly state: SideOpsSpecialActorState;
  readonly key: string;
  readonly textureKey: string;
  readonly start: number;
  readonly end: number;
  readonly frameRate: number;
  readonly repeat: -1 | 0;
}

/** Shared JSON is also consumed by the bitmap importer to prevent row drift. */
export const SIDEOPS_SPECIAL_ACTORS = manifest as readonly SideOpsSpecialActorDefinition[];
export const SIDEOPS_SPECIAL_ACTOR_BOARDS = ['core', 'special'] as const;

const timing: Record<SideOpsSpecialActorState, { frameRate: number; repeat: -1 | 0 }> = {
  idle: { frameRate: 4, repeat: -1 }, move: { frameRate: 8, repeat: -1 },
  attack: { frameRate: 12, repeat: 0 }, reload: { frameRate: 8, repeat: 0 },
  melee: { frameRate: 12, repeat: 0 }, hit: { frameRate: 12, repeat: 0 },
  death: { frameRate: 7, repeat: 0 }, interact: { frameRate: 7, repeat: 0 },
  crouch: { frameRate: 5, repeat: -1 }, radio: { frameRate: 6, repeat: 0 },
  fear: { frameRate: 8, repeat: 0 }, missile: { frameRate: 8, repeat: 0 },
  laser: { frameRate: 8, repeat: 0 }, railgun: { frameRate: 8, repeat: 0 },
  scan: { frameRate: 4, repeat: -1 }
};

const actorsBySource = new Map<string, SideOpsSpecialActorDefinition>(
  SIDEOPS_SPECIAL_ACTORS.map((actor) => [actor.sourceTextureKey, actor])
);

export function getSideOpsSpecialActorDefinition(sourceTextureKey: string): SideOpsSpecialActorDefinition | undefined {
  return actorsBySource.get(sourceTextureKey);
}

export const SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS: readonly SideOpsSpecialActorAnimationSheet[] =
  SIDEOPS_SPECIAL_ACTORS.flatMap((actor) => SIDEOPS_SPECIAL_ACTOR_BOARDS.map((board) => ({
    actorId: actor.id, sourceTextureKey: actor.sourceTextureKey, board,
    textureKey: `sideops-special:${actor.id}:${board}`,
    path: `/sideops/special-animations/${actor.id}/${board}.png`,
    frameWidth: actor.frameSize, frameHeight: actor.frameSize,
    frameCount: 16 as const, columns: 4 as const, rows: 4 as const,
    provenance: 'openai-authored-poses' as const
  })));

export const SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS: readonly SideOpsSpecialActorAnimationClip[] =
  SIDEOPS_SPECIAL_ACTOR_ANIMATION_SHEETS.flatMap((sheet) => {
    const actor = actorsBySource.get(sheet.sourceTextureKey)!;
    return actor.states[sheet.board].map((state, row) => ({
      actorId: actor.id, state, key: `sideops-special:${actor.id}:${state}`,
      textureKey: sheet.textureKey, start: row * 4, end: row * 4 + 3, ...timing[state]
    }));
  });

const clipsByKey = new Map(SIDEOPS_SPECIAL_ACTOR_ANIMATION_CLIPS.map((clip) => [clip.key, clip]));

/** No silent alias: Otacon has no weapon attack; REX has no human reload. */
export function getSideOpsSpecialActorAnimation(
  sourceTextureKey: string,
  state: string
): SideOpsSpecialActorAnimationClip | undefined {
  const actor = actorsBySource.get(sourceTextureKey);
  return actor ? clipsByKey.get(`sideops-special:${actor.id}:${state}`) : undefined;
}

/** Centered legacy bodies keep both size and bottom Y when the frame changes. */
export function getSideOpsSpecialActorGeometry(
  actor: SideOpsSpecialActorDefinition,
  worldWidth = actor.bodyWidth,
  worldHeight = actor.bodyHeight
) {
  const scale = worldHeight / (actor.frameSize - 2 * actor.padding);
  const width = worldWidth / scale;
  const height = worldHeight / scale;
  return {
    scale, width, height,
    offsetX: (actor.frameSize - width) / 2,
    offsetY: actor.frameSize - actor.padding - height
  };
}
