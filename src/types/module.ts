// Modules are content data. They define what the player can build.
// Each module is independent and combines freely with others.

import type { Species } from './state';

export type BuilderQuestion = {
  id: string;
  prompt: string;
  options: string[];
  allowCustom?: boolean; // For name fields and similar.
  required: boolean;
};

export type SettingModule = {
  id: string;
  label: string;
  era: string;
  technologyLevel: string;
  socialRules: string;
  violenceFunction: string;
  vocabularyAnchors: string[];
  // Setting controls which species are available in the builder.
  // Modern realist: ['human']. Modern urban fantasy: full list. Medieval fae court: ['human', 'fae'].
  validSpecies: Species[];
  questions: BuilderQuestion[];
};

export type ArchetypeModule = {
  id: string;
  label: string;
  defaultDayToDay: string;
  defaultStakes: string;
  defaultEnemies: string;
  powerBaseline: string;
  questions: BuilderQuestion[];
};

export type TropeModule = {
  id: string;
  label: string;
  relationalEntry: string;
  conflictSource: string;
  emotionalRhythm: string;
  questions: BuilderQuestion[];
};

// Universal questions apply to every LI regardless of module choice.
// Populated in Part 2.
export const UNIVERSAL_QUESTIONS: BuilderQuestion[] = [];
