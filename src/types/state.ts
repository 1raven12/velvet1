// Core state for the entire game session.
// Mutated by player choices, read by beat engine and prompt assembler.

export type Gender = 'male' | 'female' | 'nonbinary';

// Species applies to both player and love interest.
// Setting modules declare which of these are valid in a given world.
export type Species =
  | 'human'
  | 'vampire'
  | 'fairy'
  | 'fae'
  | 'werewolf'
  | 'witch'
  | 'shifter'
  | 'demon'
  | 'angel'
  | 'merperson'
  | 'ghost'
  | 'other';

export type PhysicalAttributes = {
  hairColor: string;
  hairLength: string;
  eyeColor: string;
  heightRange: string;
  bodyType: string;
  facialHair?: string;
  tattoos: 'none' | 'some' | 'heavy';
  piercings: 'none' | 'minimal' | 'significant';
  styleAesthetic: string;
};

export type PlayerProfile = {
  name: string;
  age: number;
  gender: Gender;
  profession: string;
  physical: PhysicalAttributes;
  personalityTraits: string[];
  species: Species;
  // Open list. Player picks from setting-permitted powers in the builder.
  // Examples: 'glamour', 'super speed', 'mind reading', 'shadow walking', 'fire summoning'.
  powers: string[];
  // Free-form backstory answers for narrative context.
  // The player never writes prose, only picks from options.
  backstoryAnswers: Record<string, string>;
};

export type LIProfile = {
  gender: Gender;
  name: string;
  physical: PhysicalAttributes;
  personalityTraits: string[];
  species: Species;
  powers: string[];
  // Which modules this LI is constructed from.
  archetypeId: string;
  tropeId: string;
  settingId: string;
  // Answers to the question flows, keyed by question id.
  universalAnswers: Record<string, string>;
  archetypeAnswers: Record<string, string>;
  tropeAnswers: Record<string, string>;
};

// All relationship variables are 0 to 10.
export type StateVariable = number;

export type GameState = {
  // Profiles. Null until builder completes.
  player: PlayerProfile | null;
  loveInterest: LIProfile | null;

  // Narrative position.
  currentBeatId: string | null;
  beatsCompleted: string[];

  // Relationship variables.
  intimacy: StateVariable;
  trust: StateVariable;
  obsession: StateVariable;
  fracture: StateVariable;
  composure: StateVariable;

  // Story flags. e.g. { 'gala_kiss': true }
  flags: Record<string, boolean>;

  // Knowledge tracking. What each character has learned about the other.
  playerKnowsAboutLI: string[];
  liKnowsAboutPlayer: string[];

  // Supernatural reveal flags. Default false. Set true when species is revealed in the story.
  playerSpeciesKnownToLI: boolean;
  liSpeciesKnownToPlayer: boolean;

  // Most recent player choice. Passed to next prompt for continuity.
  lastChoice: string | null;

  // Running summary of recent beats. Replaces full chapter history in prompts.
  // Keeps the context window manageable.
  recentBeatsSummary: string;

  // Which ending has been triggered. Null until end of playthrough.
  endingTriggered: string | null;
};

export const initialGameState: GameState = {
  player: null,
  loveInterest: null,
  currentBeatId: null,
  beatsCompleted: [],
  intimacy: 0,
  trust: 0,
  obsession: 0,
  fracture: 0,
  composure: 5,
  flags: {},
  playerKnowsAboutLI: [],
  liKnowsAboutPlayer: [],
  playerSpeciesKnownToLI: false,
  liSpeciesKnownToPlayer: false,
  lastChoice: null,
  recentBeatsSummary: '',
  endingTriggered: null,
};
