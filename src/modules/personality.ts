// Personality option sets. Shared between player and LI builders.
// Each axis has 10 options. Player picks one per axis.

export const PERSONALITY_CORE = [
  'Possessive',
  'Cold',
  'Dominant',
  'Submissive',
  'Golden retriever',
  'Morally gray',
  'Stoic',
  'Sarcastic',
  'Charming',
  'Volatile',
] as const;

export const PERSONALITY_TEXTURE = [
  'Emotionally unavailable',
  'Emotionally repressed',
  'Worshipping',
  'Affectionate',
  'Soft only for you',
  'Nurturing',
  'Protective',
  'Tender',
  'Cruel',
  'Distant',
] as const;

export const PERSONALITY_DRIVE = [
  'Obsessive',
  'Jealous',
  'Manipulative',
  'Ambitious',
  'Cunning',
  'Strategic',
  'Reckless',
  'Vengeful',
  'Honor-bound',
  'Lawless',
] as const;

export const PERSONALITY_VULNERABILITY = [
  'Touch-starved',
  'Trust-wounded',
  'Shame-haunted',
  'Mother-wounded',
  'Father-wounded',
  'Loss carrier',
  'Self-destructive',
  'Loyalty-broken',
  'Faith-broken',
  'Worth-questioning',
] as const;
