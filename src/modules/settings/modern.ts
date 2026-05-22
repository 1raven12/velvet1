import type { SettingModule } from '../../types/module';

export const modernSetting: SettingModule = {
  id: 'modern',
  label: 'Modern (Present Day)',
  era: 'Present day, late 2020s',
  technologyLevel:
    'Smartphones, social media, streaming services, gig economy, AI tools entering everyday life.',
  socialRules:
    'Secular and individualist. Class and wealth gaps are visible. Public and private life leak into each other via social media. Fame is accessible and fragile.',
  violenceFunction:
    'Generally illegal and consequential. Confined to specific underworlds (organized crime, touring industry dark sides). State violence present but not the primary engine.',
  vocabularyAnchors: [
    'contemporary slang',
    'tech and social media references',
    'streaming culture',
    'climate and political awareness',
    'gig economy texture',
  ],
  validSpecies: ['human'],
  questions: [
    {
      kind: 'mc',
      id: 'city',
      prompt: 'Where is the story set?',
      options: [
        'New York',
        'Los Angeles',
        'London',
        'Berlin',
        'Paris',
        'Tokyo',
        'Toronto',
        'Sydney',
        'A small town',
      ],
      required: true,
      allowCustom: true,
    },
  ],
};
