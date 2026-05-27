// Hard rule: no character is ever under 21 in present-day story time.
export const MIN_PRESENT_DAY_AGE = 21;
export const MAX_PRESENT_DAY_AGE = 100;

export function isValidPresentDayAge(input: number): boolean {
  return Number.isInteger(input) && input >= MIN_PRESENT_DAY_AGE && input <= MAX_PRESENT_DAY_AGE;
}
