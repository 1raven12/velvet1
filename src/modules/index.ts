// Central registry for all module content.
// PART 3 (Builder UI) imports from here.

export { PLAYER_QUESTIONS } from './player';
export { UNIVERSAL_QUESTIONS } from './universal';
export { MIN_PRESENT_DAY_AGE, MAX_PRESENT_DAY_AGE, isValidPresentDayAge } from './ageGuard';
export { SETTINGS, modernSetting } from './settings';
export { ARCHETYPES, rockstarArchetype } from './archetypes';
export { TROPES, childhoodBullyTrope } from './tropes';

// Convenient lookup for the UI.
export const SLICE = {
  setting: 'modern',
  archetype: 'rockstar',
  trope: 'childhood-bully',
} as const;
