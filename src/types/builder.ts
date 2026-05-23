import type { BuilderQuestion } from './module';

// A single screen in the builder flow.
export type BuilderScreen =
  | { type: 'welcome' }
  | { type: 'setting-picker' }
  | { type: 'archetype-picker' }
  | { type: 'trope-picker' }
  | { type: 'player-question'; question: BuilderQuestion }
  | { type: 'setting-question'; question: BuilderQuestion }
  | { type: 'universal-question'; question: BuilderQuestion }
  | { type: 'archetype-question'; question: BuilderQuestion }
  | { type: 'trope-question'; question: BuilderQuestion }
  | { type: 'summary' };

// Answer storage. Keys are question ids, values are user input (string or number).
export type AnswerMap = Record<string, string | number>;

// The full set of builder answers, partitioned by section.
export type BuilderAnswers = {
  player: AnswerMap;
  setting: AnswerMap;
  universal: AnswerMap;
  archetype: AnswerMap;
  trope: AnswerMap;
};
