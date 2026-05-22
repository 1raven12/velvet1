import type { TropeModule } from '../../types/module';

// IMPORTANT: All school-age references in this trope refer to PAST events (backstory).
// Present-day characters are always 20+ per ageGuard.ts. The trope's reconnection
// always happens with both characters at adult ages.
export const childhoodBullyTrope: TropeModule = {
  id: 'childhood-bully',
  label: 'Childhood Bully Turned Famous',
  relationalEntry:
    'Shared past with unresolved harm. He bullied her in school, then disappeared. Years later he is famous and she is an adult with a life of her own. Reconnection is forced or accidental.',
  conflictSource:
    'He has not earned her forgiveness. She has not asked for it. The past is a closed door she did not open.',
  emotionalRhythm:
    'Initial confrontation. Slow recognition that the boy he was is not exactly the man he is. Neither of them knows what to do with that.',
  questions: [
    {
      kind: 'mc',
      id: 'bullyingNature',
      prompt: 'What was the nature of the bullying (back when you were both in school)?',
      options: [
        'Physical (fights, pranks that caused injury)',
        'Social (humiliation, isolation, rumors spread to the whole school)',
        'Verbal (relentless mockery, targeted cruelty in front of others)',
        'A mix of all of the above',
      ],
      required: true,
    },
    {
      kind: 'mc',
      id: 'definingIncident',
      prompt: 'Was there a defining incident that ended contact?',
      options: [
        'Yes, one event that crossed a line',
        'No, it just trailed off when he left town',
      ],
      required: true,
    },
    {
      kind: 'mc',
      id: 'ageWhenItHappened',
      prompt: 'How old were you both when the bullying happened? (Backstory only — present-day characters are both 20+)',
      options: [
        'Middle school',
        'Early high school',
        'Late high school',
        'It started in middle school and continued through high school',
      ],
      required: true,
    },
    {
      kind: 'mc',
      id: 'timeSinceLastSeen',
      prompt: 'How long since you last saw each other? (Long enough that both of you are now adults, 20+)',
      options: ['5 to 10 years', '10 to 15 years', 'More than 15 years'],
      required: true,
    },
    {
      kind: 'mc',
      id: 'reconnection',
      prompt: 'How do you reconnect (as adults, present day)?',
      options: [
        'You are assigned to cover him as a journalist',
        'You catch him at a tiny venue by accident',
        'He tracks you down deliberately',
        "You meet at a mutual friend's event",
        'You run into each other in a city you both happened to move to',
        'He requested you specifically for an interview',
      ],
      required: true,
    },
    {
      kind: 'mc',
      id: 'hisAcknowledgment',
      prompt: 'Has he ever publicly or privately acknowledged what he did to you?',
      options: [
        'Never (no contact, no public mention)',
        'Vague public references to regretting his teenage years',
        'Direct public statement (apology in an interview or song)',
        "Private apology before now (you didn't accept)",
        "You've had no contact, so no opportunity",
      ],
      required: true,
    },
  ],
};
