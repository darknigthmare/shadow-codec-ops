import type { SideOpsVisualPackId } from '../../types/missionBuilder.types';

export type SideOpsActorRole = 'player' | 'guard' | 'reinforcement';
export type SideOpsActorAnimationState = 'idle' | 'move' | 'crouch' | 'jump' | 'attack' | 'melee' | 'hit' | 'death';
export type SideOpsActorAnimationBoard = 'mobility' | 'combat';

export interface SideOpsActorAnimationSheet {
  readonly packId: SideOpsVisualPackId;
  readonly role: SideOpsActorRole;
  readonly board: SideOpsActorAnimationBoard;
  readonly textureKey: string;
  readonly path: string;
  readonly frameWidth: 128;
  readonly frameHeight: 128;
  readonly frameCount: 16;
  readonly columns: 4;
  readonly rows: 4;
  /** Authored poses extracted from a generated board; never a rigged still. */
  readonly provenance: 'openai-authored-poses';
}

export interface SideOpsActorAnimationClip {
  readonly key: string;
  readonly textureKey: string;
  readonly start: number;
  readonly end: number;
  readonly frameRate: number;
  readonly repeat: -1 | 0;
}

export const SIDEOPS_ACTOR_ANIMATION_PACKS = [
  'mg1', 'mg2', 'mgs1', 'mgs2_tanker', 'mgs2_plant', 'mgs3',
  'mgs4', 'peace_walker', 'mgsv_ground_zeroes', 'mgsv_phantom_pain',
  'vr_simulation', 'patriots_ai'
] as const satisfies readonly SideOpsVisualPackId[];

export const SIDEOPS_ACTOR_ANIMATION_ROLES = ['player', 'guard', 'reinforcement'] as const;

const BOARD_STATES = {
  mobility: ['idle', 'move', 'crouch', 'jump'],
  combat: ['attack', 'melee', 'hit', 'death']
} as const satisfies Record<SideOpsActorAnimationBoard, readonly SideOpsActorAnimationState[]>;

const STATE_TIMING: Record<SideOpsActorAnimationState, { frameRate: number; repeat: -1 | 0 }> = {
  idle: { frameRate: 4, repeat: -1 },
  move: { frameRate: 9, repeat: -1 },
  crouch: { frameRate: 5, repeat: -1 },
  jump: { frameRate: 7, repeat: 0 },
  attack: { frameRate: 12, repeat: 0 },
  melee: { frameRate: 12, repeat: 0 },
  hit: { frameRate: 12, repeat: 0 },
  death: { frameRate: 7, repeat: 0 }
};

export function getSideOpsActorAnimationKey(
  packId: SideOpsVisualPackId,
  role: SideOpsActorRole,
  state: SideOpsActorAnimationState
): string {
  return `sideops-actor:${packId}:${role}:${state}`;
}

export const SIDEOPS_ACTOR_ANIMATION_SHEETS: readonly SideOpsActorAnimationSheet[] =
  SIDEOPS_ACTOR_ANIMATION_PACKS.flatMap((packId) =>
    SIDEOPS_ACTOR_ANIMATION_ROLES.flatMap((role) =>
      (['mobility', 'combat'] as const).map((board) => ({
        packId, role, board,
        textureKey: `sideops-actor:${packId}:${role}:${board}`,
        path: `/sideops/actor-animations/${packId}/${role}-${board}.png`,
        frameWidth: 128 as const,
        frameHeight: 128 as const,
        frameCount: 16 as const,
        columns: 4 as const,
        rows: 4 as const,
        provenance: 'openai-authored-poses' as const
      }))
    )
  );

const clipsByKey = new Map<string, SideOpsActorAnimationClip>();
for (const sheet of SIDEOPS_ACTOR_ANIMATION_SHEETS) {
  BOARD_STATES[sheet.board].forEach((state, row) => {
    const key = getSideOpsActorAnimationKey(sheet.packId, sheet.role, state);
    clipsByKey.set(key, {
      key,
      textureKey: sheet.textureKey,
      start: row * 4,
      end: row * 4 + 3,
      ...STATE_TIMING[state]
    });
  });
}

/** Pack + role are both required: shared legacy textures cannot identify an era. */
export function getSideOpsActorAnimation(
  packId: SideOpsVisualPackId,
  role: SideOpsActorRole,
  state: SideOpsActorAnimationState
): SideOpsActorAnimationClip {
  return clipsByKey.get(getSideOpsActorAnimationKey(packId, role, state))!;
}

export const SIDEOPS_ACTOR_ANIMATION_CLIPS: readonly SideOpsActorAnimationClip[] = [...clipsByKey.values()];
