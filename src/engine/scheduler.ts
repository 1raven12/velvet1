// The dead-time solver. Picks the next beat from the library given state.
// Enforces variety so the player never sits in a flat stretch.

import type { GameState } from '../types/state';
import type { BeatIntent, BeatKind } from '../types/beat';

// Is this beat off cooldown?
function offCooldown(state: GameState, beat: BeatIntent): boolean {
  const lastPlayed = state.beatCooldowns[beat.id];
  if (lastPlayed === undefined) return true;
  return state.totalBeatsPlayed - lastPlayed >= beat.cooldown;
}

// Has this beat already been completed and is not repeatable?
function notAlreadyDone(state: GameState, beat: BeatIntent): boolean {
  // A beat with cooldown 0 fires once. Higher cooldown beats may repeat.
  if (beat.cooldown === 0) return !state.beatsCompleted.includes(beat.id);
  return true;
}

// Proactive trigger check. If a beat declares triggerWhen and it matches, it jumps the queue.
function isForceTriggered(state: GameState, beat: BeatIntent): boolean {
  const t = beat.triggerWhen;
  if (!t) return false;
  if (t.beatsSinceLastLI !== undefined && state.beatsSinceLastLI < t.beatsSinceLastLI) return false;
  if (t.beatsSinceLastOrbit !== undefined && state.beatsSinceLastOrbit < t.beatsSinceLastOrbit) return false;
  if (t.minActProgress !== undefined && state.actProgress < t.minActProgress) return false;
  if (t.flagsRequired && !t.flagsRequired.every((f) => state.flags[f])) return false;
  return true;
}

// Variety rules. Each takes the candidate list and the state, returns a filtered list.
// If a rule would empty the list, it is skipped (variety is a preference, not a hard fail).
type VarietyRule = (candidates: BeatIntent[], state: GameState) => BeatIntent[];

const avoidThirdConsecutiveLI: VarietyRule = (candidates, state) => {
  if (state.lastBeatKind === 'li' && state.consecutiveSameKind >= 2) {
    const filtered = candidates.filter((b) => b.kind !== 'li');
    return filtered.length > 0 ? filtered : candidates;
  }
  return candidates;
};

const avoidFourthConsecutiveOrbit: VarietyRule = (candidates, state) => {
  if (state.lastBeatKind === 'orbit' && state.consecutiveSameKind >= 3) {
    const filtered = candidates.filter((b) => b.kind !== 'orbit');
    return filtered.length > 0 ? filtered : candidates;
  }
  return candidates;
};

const noImmediateRepeatKind: VarietyRule = (candidates, state) => {
  // Soft preference against repeating the exact last kind when alternatives exist.
  if (state.lastBeatKind) {
    const filtered = candidates.filter((b) => b.kind !== state.lastBeatKind);
    return filtered.length > 0 ? filtered : candidates;
  }
  return candidates;
};

const VARIETY_RULES: VarietyRule[] = [
  avoidThirdConsecutiveLI,
  avoidFourthConsecutiveOrbit,
];

// Weighted random pick.
function weightedPick(candidates: BeatIntent[]): BeatIntent {
  const total = candidates.reduce((sum, b) => sum + Math.max(1, b.weight), 0);
  let roll = Math.random() * total;
  for (const b of candidates) {
    roll -= Math.max(1, b.weight);
    if (roll <= 0) return b;
  }
  return candidates[candidates.length - 1];
}

export function pickNextBeat(state: GameState, library: BeatIntent[]): BeatIntent | null {
  // 1. Base eligibility: qualifies, off cooldown, not already consumed.
  const eligible = library.filter(
    (b) => b.qualifies(state) && offCooldown(state, b) && notAlreadyDone(state, b)
  );
  if (eligible.length === 0) return null; // engine signals route exhaustion / ending

  // 2. Force-triggered beats jump the queue. Highest weight among them wins.
  const forced = eligible.filter((b) => isForceTriggered(state, b));
  if (forced.length > 0) {
    return forced.sort((a, b) => b.weight - a.weight)[0];
  }

  // 3. Apply variety rules.
  let candidates = eligible;
  for (const rule of VARIETY_RULES) {
    candidates = rule(candidates, state);
  }

  // 4. Apply the soft no-immediate-repeat preference last.
  candidates = noImmediateRepeatKind(candidates, state);

  // 5. Weighted pick.
  return weightedPick(candidates);
}

// Convenience: kind distribution of remaining eligible beats. Useful for debugging pacing.
export function eligibleKindCounts(
  state: GameState,
  library: BeatIntent[]
): Record<BeatKind, number> {
  const counts: Record<BeatKind, number> = { li: 0, orbit: 0, pressure: 0, texture: 0 };
  for (const b of library) {
    if (b.qualifies(state) && offCooldown(state, b) && notAlreadyDone(state, b)) {
      counts[b.kind] += 1;
    }
  }
  return counts;
}
