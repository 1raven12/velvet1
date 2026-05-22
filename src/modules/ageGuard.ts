// Hard rule: no character (player or LI) is ever under 20 in present-day story time.
// Past-tense references (school years, etc.) are allowed as backstory only.
// This module is the single source of truth for the floor.

export const MIN_PRESENT_DAY_AGE = 20;
export const MAX_PRESENT_DAY_AGE = 100;

// Defensive helper. UI and engine call this to refuse out-of-range input.
export function isValidPresentDayAge(input: number): boolean {
  return Number.isInteger(input) && input >= MIN_PRESENT_DAY_AGE && input <= MAX_PRESENT_DAY_AGE;
}
