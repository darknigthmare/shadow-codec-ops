import type { VrMissionRecord, VrRank } from '../../types/vr.types';

export interface Mgs1VrPhotoshootTier {
  readonly rank: VrRank;
  readonly maxZoom: number;
  readonly sessionSeconds: number;
  readonly label: string;
}

export interface Mgs1VrPhotoFrameInput {
  reticleX: number;
  reticleY: number;
  modelX: number;
  modelY: number;
  zoom: number;
  maxZoom: number;
  poseBonus?: number;
}

const RANK_VALUE: Readonly<Record<VrRank, number>> = {
  ROOKIE: 0,
  RAT: 1,
  HOUND: 2,
  FOX: 3,
  FOXHOUND: 4,
  'BIG BOSS': 5
};

const TIER_BY_RANK: Readonly<Record<VrRank, Mgs1VrPhotoshootTier>> = {
  ROOKIE: { rank: 'ROOKIE', maxZoom: 1.65, sessionSeconds: 75, label: 'DISTANCE C' },
  RAT: { rank: 'RAT', maxZoom: 1.85, sessionSeconds: 85, label: 'DISTANCE C+' },
  HOUND: { rank: 'HOUND', maxZoom: 2.1, sessionSeconds: 100, label: 'DISTANCE B' },
  FOX: { rank: 'FOX', maxZoom: 2.45, sessionSeconds: 120, label: 'DISTANCE A' },
  FOXHOUND: { rank: 'FOXHOUND', maxZoom: 2.8, sessionSeconds: 150, label: 'DISTANCE S' },
  'BIG BOSS': { rank: 'BIG BOSS', maxZoom: 3.2, sessionSeconds: 180, label: 'DISTANCE S+' }
};

export function getMgs1VrPhotoshootTier(rank: VrRank): Mgs1VrPhotoshootTier {
  return TIER_BY_RANK[rank];
}

export function getBestMgs1VrPhotoshootRank(records: readonly VrMissionRecord[]): VrRank {
  return records
    .filter((record) => record.success)
    .reduce<VrRank>((best, record) => RANK_VALUE[record.rank] > RANK_VALUE[best] ? record.rank : best, 'ROOKIE');
}

export function scoreMgs1VrPhotoFrame(input: Mgs1VrPhotoFrameInput): number {
  const distance = Math.hypot(input.reticleX - input.modelX, input.reticleY - input.modelY);
  const framingScore = Math.max(0, 720 - distance * 5.2);
  const safeMaxZoom = Math.max(1, input.maxZoom);
  const idealZoom = Math.max(1, safeMaxZoom * 0.88);
  const zoomDifference = Math.abs(input.zoom - idealZoom);
  const zoomScore = Math.max(0, 230 - zoomDifference * 155);
  const poseScore = Math.max(0, Math.min(50, input.poseBonus ?? 0));
  return Math.max(0, Math.min(1000, Math.round(framingScore + zoomScore + poseScore)));
}

export function labelMgs1VrPhotoScore(score: number): 'PERFECT' | 'GREAT' | 'GOOD' | 'OFF-CENTER' {
  if (score >= 930) return 'PERFECT';
  if (score >= 790) return 'GREAT';
  if (score >= 600) return 'GOOD';
  return 'OFF-CENTER';
}
