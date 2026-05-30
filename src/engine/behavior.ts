// Derive the LI's current behavioral mode from emotional state.
// The scene renderer (PART 5) uses behavioralMode to pick the right variant.

import type { GameState } from '../types/state';

export type BehavioralMode =
  | 'guarded'    // default early state
  | 'thawing'    // trust climbing, walls lowering
  | 'devoted'    // high intimacy + high trust, the good timeline
  | 'possessive' // high obsession, moderate trust
  | 'toxic'      // high obsession + low trust, the dangerous timeline
  | 'volatile'   // high fracture, unstable
  | 'withdrawn'; // high fracture + low trust, pulling away

// Returns the dominant behavioral mode for the current state.
// Order matters: most dangerous/specific conditions checked first.
export function deriveBehavior(state: GameState): BehavioralMode {
  const { intimacy, trust, obsession, fracture } = state;

  if (fracture >= 6 && trust < 3) return 'withdrawn';
  if (fracture >= 6) return 'volatile';
  if (obsession >= 7 && trust < 4) return 'toxic';
  if (obsession >= 7) return 'possessive';
  if (intimacy >= 6 && trust >= 6 && fracture < 4) return 'devoted';
  if (trust >= 4 && intimacy >= 3) return 'thawing';
  return 'guarded';
}

// Human-readable description of what the mode does to his behavior.
export const MODE_BEHAVIOR: Record<BehavioralMode, string> = {
  guarded:    'Contained. Gives little. Watches more than he speaks. Armor fully on.',
  thawing:    'Cracks showing. Softer in unguarded moments, then catches himself. Reaches, then pulls back.',
  devoted:    'Undone in private, still formidable in public. Tender in ways he would deny. The walls are gone.',
  possessive: 'Intense, claiming, attentive to the edge of too much. Tracks where she is. Warns off others.',
  toxic:      'Possessive without the safety of trust. Controlling, suspicious, sharp. Love curdled into damage.',
  volatile:   'Unpredictable. Wounds reopening mid-scene. Warmth and cruelty in the same breath.',
  withdrawn:  'Pulling away. Cold not as armor but as exit. The relationship bleeding out quietly.',
};
