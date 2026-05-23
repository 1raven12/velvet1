import type { BuilderQuestion } from '../../types/module';
import type { PlayerProfile, LIProfile, Gender, Species } from '../../types/state';
import type { AnswerMap, BuilderAnswers, BuilderScreen } from '../../types/builder';
import {
  PLAYER_QUESTIONS,
  UNIVERSAL_QUESTIONS,
  modernSetting,
  rockstarArchetype,
  childhoodBullyTrope,
  isValidPresentDayAge,
} from '../../modules';

// Build the screen sequence for the vertical slice.
// Order matches the player's natural flow: welcome, choose what they're playing,
// build self, world details, build LI.
export function buildScreenSequence(): BuilderScreen[] {
  const screens: BuilderScreen[] = [];

  screens.push({ type: 'welcome' });
  screens.push({ type: 'setting-picker' });
  screens.push({ type: 'archetype-picker' });
  screens.push({ type: 'trope-picker' });

  for (const q of PLAYER_QUESTIONS) {
    screens.push({ type: 'player-question', question: q });
  }
  for (const q of modernSetting.questions) {
    screens.push({ type: 'setting-question', question: q });
  }
  for (const q of UNIVERSAL_QUESTIONS) {
    screens.push({ type: 'universal-question', question: q });
  }
  for (const q of rockstarArchetype.questions) {
    screens.push({ type: 'archetype-question', question: q });
  }
  for (const q of childhoodBullyTrope.questions) {
    screens.push({ type: 'trope-question', question: q });
  }

  screens.push({ type: 'summary' });

  return screens;
}

// Map a question's id and section to the right slot in BuilderAnswers.
export function recordAnswer(
  current: BuilderAnswers,
  screen: BuilderScreen,
  value: string | number
): BuilderAnswers {
  if (screen.type === 'player-question') {
    return { ...current, player: { ...current.player, [screen.question.id]: value } };
  }
  if (screen.type === 'setting-question') {
    return { ...current, setting: { ...current.setting, [screen.question.id]: value } };
  }
  if (screen.type === 'universal-question') {
    return { ...current, universal: { ...current.universal, [screen.question.id]: value } };
  }
  if (screen.type === 'archetype-question') {
    return { ...current, archetype: { ...current.archetype, [screen.question.id]: value } };
  }
  if (screen.type === 'trope-question') {
    return { ...current, trope: { ...current.trope, [screen.question.id]: value } };
  }
  return current;
}

// Validate a value against a question's constraints.
// Returns null if valid, or an error string if not.
export function validateAnswer(question: BuilderQuestion, value: string | number | undefined): string | null {
  if (!question.required && (value === undefined || value === '')) return null;
  if (value === undefined || value === '') return 'Please answer.';

  if (question.kind === 'number') {
    if (typeof value !== 'number' || !Number.isInteger(value)) return 'Enter a whole number.';
    if (question.id === 'age' && !isValidPresentDayAge(value)) {
      return `Age must be between 20 and 100.`;
    }
    if (question.min !== undefined && value < question.min) return `Minimum ${question.min}.`;
    if (question.max !== undefined && value > question.max) return `Maximum ${question.max}.`;
  }
  if (question.kind === 'mc') {
    if (typeof value !== 'string') return 'Pick one.';
    // Custom input is allowed; we don't restrict to the option list.
  }
  return null;
}

// Lower-case helper for gender normalisation.
function toGender(input: string): Gender {
  const v = input.toLowerCase();
  if (v.startsWith('m')) return 'male';
  if (v.startsWith('f')) return 'female';
  return 'nonbinary';
}

// Assemble final profiles from the gathered answers.
export function assembleProfiles(answers: BuilderAnswers): { player: PlayerProfile; li: LIProfile } {
  const p = answers.player;
  const u = answers.universal;

  // All values default to safe placeholders so missing optional fields don't crash type checking.
  const player: PlayerProfile = {
    name: String(p.name ?? 'Player'),
    age: Number(p.age ?? 25),
    gender: toGender(String(p.gender ?? 'female')),
    profession: String(p.profession ?? 'Journalist'),
    physical: {
      hairColor: String(p.hairColor ?? 'Brown'),
      hairLength: String(p.hairLength ?? 'Medium'),
      eyeColor: String(p.eyeColor ?? 'Brown'),
      heightRange: String(p.height ?? 'Average'),
      bodyType: String(p.bodyType ?? 'Athletic'),
      tattoos: (String(p.tattoos ?? 'None').toLowerCase() as 'none' | 'some' | 'heavy'),
      piercings: (String(p.piercings ?? 'None').toLowerCase() as 'none' | 'minimal' | 'significant'),
      styleAesthetic: String(p.styleAesthetic ?? 'Minimalist'),
    },
    personalityTraits: [
      String(p.personalityPrimary ?? 'Quietly observant'),
      String(p.personalitySecondary ?? 'Guarded'),
    ],
    species: 'human' satisfies Species,
    powers: [],
    backstoryAnswers: {},
  };

  const li: LIProfile = {
    gender: toGender(String(u.gender ?? 'male')),
    name: String(answers.archetype.name ?? 'Roman Vail'),
    physical: {
      hairColor: String(u.hairColor ?? 'Black'),
      hairLength: String(u.hairLength ?? 'Medium'),
      eyeColor: String(u.eyeColor ?? 'Green'),
      heightRange: String(u.height ?? 'Tall'),
      bodyType: String(u.bodyType ?? 'Lean'),
      facialHair: u.facialHair ? String(u.facialHair) : undefined,
      tattoos: (String(u.tattoos ?? 'Some').toLowerCase() as 'none' | 'some' | 'heavy'),
      piercings: (String(u.piercings ?? 'Minimal').toLowerCase() as 'none' | 'minimal' | 'significant'),
      styleAesthetic: String(u.styleAesthetic ?? 'Hard rock'),
    },
    personalityTraits: [
      String(u.personalityPrimary ?? 'Emotionally repressed'),
      String(u.personalitySecondary ?? 'Morally gray'),
    ],
    species: 'human' satisfies Species,
    powers: [],
    archetypeId: rockstarArchetype.id,
    tropeId: childhoodBullyTrope.id,
    settingId: modernSetting.id,
    universalAnswers: Object.fromEntries(Object.entries(answers.universal).map(([k, v]) => [k, String(v)])),
    archetypeAnswers: Object.fromEntries(Object.entries(answers.archetype).map(([k, v]) => [k, String(v)])),
    tropeAnswers: Object.fromEntries(Object.entries(answers.trope).map(([k, v]) => [k, String(v)])),
  };

  return { player, li };
}

// Empty initial state.
export const emptyAnswers: BuilderAnswers = {
  player: {},
  setting: {},
  universal: {},
  archetype: {},
  trope: {},
};

// Lookup a question's existing answer for the current section.
export function getCurrentAnswer(
  screen: BuilderScreen,
  answers: BuilderAnswers
): string | number | undefined {
  if (screen.type === 'player-question') return answers.player[screen.question.id];
  if (screen.type === 'setting-question') return answers.setting[screen.question.id];
  if (screen.type === 'universal-question') return answers.universal[screen.question.id];
  if (screen.type === 'archetype-question') return answers.archetype[screen.question.id];
  if (screen.type === 'trope-question') return answers.trope[screen.question.id];
  return undefined;
}
