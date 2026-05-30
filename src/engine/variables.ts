// The five emotional variables and what their numbers mean.
// This file is the single reference for ranges and clamping.

import type { GameState } from '../types/state';

export const VAR_MIN = 0;
export const VAR_MAX = 10;

export type EmotionalVar = 'intimacy' | 'trust' | 'obsession' | 'fracture' | 'composure';

export const EMOTIONAL_VARS: EmotionalVar[] = [
  'intimacy',
  'trust',
  'obsession',
  'fracture',
  'composure',
];

// What each variable means, for reference and for prompt/scene authoring.
export const VAR_MEANINGS: Record<EmotionalVar, string> = {
  intimacy: 'Closeness earned. How far the relationship has actually progressed, emotionally and physically.',
  trust: 'Whether she believes he will not hurt her. Rises slowly, falls fast. Gates vulnerability scenes.',
  obsession: 'How fixated he is on her. Drives possessiveness and intensity. Too high without trust is toxic.',
  fracture: 'Accumulated damage in the relationship. Unaddressed wounds, betrayals, cruelties. Hard to repair.',
  composure: 'Her own self-possession. How much ground she is holding versus losing. Starts mid (5).',
};

export function clamp(value: number): number {
  return Math.max(VAR_MIN, Math.min(VAR_MAX, value));
}

// Read a single emotional variable from state.
export function readVar(state: GameState, v: EmotionalVar): number {
  return state[v];
}
