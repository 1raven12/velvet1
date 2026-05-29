// Ending detection. Endings are gated by state thresholds, not by a single final choice.
// An ending fires when its condition holds AND the route is far enough along.

import type { GameState } from '../types/state';

export type EndingId =
  | 'devotion'      // the earned good ending
  | 'power_couple'  // high intimacy + high obsession + survived fracture
  | 'quiet_repair'  // moderate everything, chose healing over heat
  | 'toxic_spiral'  // obsession high, trust gone
  | 'clean_break'   // she kept her composure and walked
  | 'mutual_ruin';  // fracture maxed, both destroyed

export type Ending = {
  id: EndingId;
  label: string;
  tone: string;
  condition: (s: GameState) => boolean;
};

// Order matters: most specific / most extreme first.
export const ENDINGS: Ending[] = [
  {
    id: 'mutual_ruin',
    label: 'Mutual Ruin',
    tone: 'Tragedy. Both of them unmade. Nobody walks away whole.',
    condition: (s) => s.fracture >= 8 && s.obsession >= 7,
  },
  {
    id: 'toxic_spiral',
    label: 'Toxic Spiral',
    tone: 'He has her and it is killing them both. Love as a closed fist.',
    condition: (s) => s.obsession >= 8 && s.trust <= 3,
  },
  {
    id: 'clean_break',
    label: 'Clean Break',
    tone: 'She held her composure and chose herself. He watches her go.',
    condition: (s) => s.composure >= 7 && s.intimacy <= 4,
  },
  {
    id: 'power_couple',
    label: 'Power Couple',
    tone: 'Two formidable people who chose each other and the danger.',
    condition: (s) => s.intimacy >= 7 && s.obsession >= 6 && s.trust >= 5,
  },
  {
    id: 'devotion',
    label: 'Devotion',
    tone: 'The dismantling completed. He is undone and safe in it. The earned ending.',
    condition: (s) => s.intimacy >= 8 && s.trust >= 7 && s.fracture < 4,
  },
  {
    id: 'quiet_repair',
    label: 'Quiet Repair',
    tone: 'Not fireworks. Something real and survivable. They chose to heal.',
    condition: (s) => s.intimacy >= 5 && s.trust >= 6 && s.fracture <= 4,
  },
];

// Returns an ending if the route is far enough along and a condition holds.
export function checkEnding(state: GameState): Ending | null {
  if (state.actProgress < 0.85) return null; // endings only available near the end
  for (const ending of ENDINGS) {
    if (ending.condition(state)) return ending;
  }
  return null;
}
