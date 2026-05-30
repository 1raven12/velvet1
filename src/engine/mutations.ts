// Apply a choice's effect to game state. Pure function, returns new state.

import type { GameState } from '../types/state';
import type { ChoiceEffect } from '../types/beat';
import { clamp, EMOTIONAL_VARS } from './variables';

export function applyChoiceEffect(state: GameState, effect: ChoiceEffect): GameState {
  let next: GameState = { ...state };

  // Apply numeric mutations with clamping.
  for (const v of EMOTIONAL_VARS) {
    const delta = effect.stateMutations[v];
    if (typeof delta === 'number') {
      next[v] = clamp(next[v] + delta);
    }
  }

  // Set flags.
  if (effect.flagsToSet) {
    next.flags = { ...next.flags, ...effect.flagsToSet };
  }

  // Add knowledge.
  if (effect.knowledgeAdded?.player) {
    next.playerKnowsAboutLI = [...next.playerKnowsAboutLI, ...effect.knowledgeAdded.player];
  }
  if (effect.knowledgeAdded?.li) {
    next.liKnowsAboutPlayer = [...next.liKnowsAboutPlayer, ...effect.knowledgeAdded.li];
  }

  // Species reveals.
  if (effect.speciesReveals?.playerToLI) next.playerSpeciesKnownToLI = true;
  if (effect.speciesReveals?.liToPlayer) next.liSpeciesKnownToPlayer = true;

  return next;
}

// Record that a beat played. Updates scheduling counters.
export function recordBeatPlayed(
  state: GameState,
  beatId: string,
  kind: GameState['lastBeatKind']
): GameState {
  const next: GameState = { ...state };
  next.totalBeatsPlayed = state.totalBeatsPlayed + 1;
  next.beatCooldowns = { ...state.beatCooldowns, [beatId]: next.totalBeatsPlayed };
  next.beatsCompleted = [...state.beatsCompleted, beatId];
  next.currentBeatId = beatId;

  // Same-kind streak.
  if (kind === state.lastBeatKind) {
    next.consecutiveSameKind = state.consecutiveSameKind + 1;
  } else {
    next.consecutiveSameKind = 1;
  }
  next.lastBeatKind = kind;

  // Since-counters.
  next.beatsSinceLastLI = kind === 'li' ? 0 : state.beatsSinceLastLI + 1;
  next.beatsSinceLastOrbit = kind === 'orbit' ? 0 : state.beatsSinceLastOrbit + 1;

  // Advance act progress slightly each beat. Routes target ~50 beats.
  next.actProgress = Math.min(1, state.actProgress + 0.02);

  return next;
}
