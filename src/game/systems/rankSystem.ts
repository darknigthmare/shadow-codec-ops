export interface SideOpsRankInput {
  alerts: number;
  kills: number;
  damageTaken: number;
  rationsUsed: number;
  timeSeconds: number;
  shotsFired: number;
  stealthScore?: number;
  reinforcementCount?: number;
}

export function calculateSideOpsRank(input: SideOpsRankInput): string {
  const score = input.stealthScore ?? calculateRawScore(input);

  if (input.alerts === 0 && input.kills === 0 && input.damageTaken === 0 && input.timeSeconds <= 180) return 'BIG BOSS';
  if (score >= 900 && input.alerts === 0) return 'FOXHOUND';
  if (score >= 820) return 'FOX';
  if (score >= 650) return 'HOUND';
  if (score >= 500) return 'DOBERMAN';
  if (score >= 330) return 'RAT';
  return 'ROOKIE';
}

function calculateRawScore(input: SideOpsRankInput): number {
  let score = 1000;
  score -= input.alerts * 180;
  score -= input.kills * 90;
  score -= input.damageTaken * 2;
  score -= input.rationsUsed * 80;
  score -= Math.max(0, input.timeSeconds - 90) * 3;
  score -= Math.max(0, input.shotsFired - 12) * 8;
  score -= (input.reinforcementCount ?? 0) * 65;
  return Math.max(0, Math.round(score));
}
