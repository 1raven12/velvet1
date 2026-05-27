import type { BuilderQuestion } from '../types/module';
import { MIN_PRESENT_DAY_AGE, MAX_PRESENT_DAY_AGE } from './ageGuard';
import {
  PERSONALITY_CORE,
  PERSONALITY_TEXTURE,
  PERSONALITY_DRIVE,
  PERSONALITY_VULNERABILITY,
} from './personality';

// Universal LI questions. Applied to every LI build regardless of archetype/trope/setting.
// Personality is four axes. See personality.ts.
export const UNIVERSAL_QUESTIONS: BuilderQuestion[] = [
  {
    kind: 'mc',
    id: 'gender',
    prompt: 'Gender of your love interest',
    options: ['Male', 'Female', 'Nonbinary'],
    required: true,
  },
  {
    kind: 'number',
    id: 'age',
    prompt: 'How old is he/she/they?',
    min: MIN_PRESENT_DAY_AGE,
    max: MAX_PRESENT_DAY_AGE,
    required: true,
  },
  {
    kind: 'mc',
    id: 'hairColor',
    prompt: 'Hair color',
    options: ['Black', 'Dark brown', 'Brown', 'Light brown', 'Blonde', 'Platinum', 'Red', 'Auburn', 'White / Silver', 'Dyed'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'hairLength',
    prompt: 'Hair length',
    options: ['Buzzed', 'Short', 'Medium', 'Long', 'Very long'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'eyeColor',
    prompt: 'Eye color',
    options: ['Blue', 'Gray', 'Green', 'Hazel', 'Brown', 'Black', 'Amber', 'Heterochromia'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'height',
    prompt: 'Height',
    options: ['Short', 'Average', 'Tall', 'Very tall'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'bodyType',
    prompt: 'Body type',
    options: ['Lean', 'Athletic', 'Muscular', 'Built', 'Lanky', 'Broad'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'facialHair',
    prompt: 'Facial hair (or skip)',
    options: ['Clean shaven', 'Stubble', 'Beard', 'Full beard', 'Goatee', 'Not applicable'],
    required: false,
  },
  {
    kind: 'mc',
    id: 'tattoos',
    prompt: 'Tattoos',
    options: ['None', 'Some', 'Heavy'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'piercings',
    prompt: 'Piercings',
    options: ['None', 'Minimal', 'Significant'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'styleAesthetic',
    prompt: 'Style aesthetic',
    options: ['Gothic', 'Hard rock', 'Street', 'Vintage', 'Military', 'Refined', 'Grunge', 'Artsy', 'Minimalist'],
    required: true,
  },
  {
    kind: 'mc',
    id: 'personalityCore',
    prompt: 'How does he hold himself?',
    options: [...PERSONALITY_CORE],
    required: true,
  },
  {
    kind: 'mc',
    id: 'personalityTexture',
    prompt: 'How does he show what he feels?',
    options: [...PERSONALITY_TEXTURE],
    required: true,
  },
  {
    kind: 'mc',
    id: 'personalityDrive',
    prompt: 'What makes him dangerous?',
    options: [...PERSONALITY_DRIVE],
    required: true,
  },
  {
    kind: 'mc',
    id: 'personalityVulnerability',
    prompt: 'What cracks him?',
    options: [...PERSONALITY_VULNERABILITY],
    required: true,
  },
  {
    kind: 'mc',
    id: 'privateLife',
    prompt: 'How does he handle himself in private?',
    options: [
      'Sober and disciplined',
      'Social drinker',
      'Struggling with substances',
      'In recovery',
      'Spiritual practice',
      'In therapy',
      'None of the above',
    ],
    required: true,
  },
];
