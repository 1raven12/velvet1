import type { GameState, LIProfile, PlayerProfile } from './state';

// Effect of a single player choice on game state.
export type ChoiceEffect = {
  // Numeric mutations to relationship variables. Positive or negative.
  stateMutations: Partial<{
    intimacy: number;
    trust: number;
    obsession: number;
    fracture: number;
    composure: number;
  }>;
  // Flags to set true after this choice.
  flagsToSet?: Record<string, boolean>;
  // Knowledge to add for either character.
  knowledgeAdded?: {
    player?: string[];
    li?: string[];
  };
  // Reveal species. Set either flag true if this choice reveals it.
  speciesReveals?: {
    playerToLI?: boolean;
    liToPlayer?: boolean;
  };
};

// A single choice option presented to the player.
export type Choice = {
  id: string;
  label: string;
  effect: ChoiceEffect;
};

// Beat intent declares what a scene needs to accomplish.
// It contains no prose. Prose is generated at runtime.
export type BeatIntent = {
  id: string;
  // Narrative purpose. e.g. "First reunion after years apart."
  purpose: string;
  // Plot events that must happen in this beat.
  requiredEvents: string[];
  // Where each character starts emotionally going into this beat.
  playerEmotionalPosition: string;
  liEmotionalPosition: string;
  // Sensory or location anchors for the generator.
  sceneAnchors: string[];
  // Whether this beat qualifies as the next one given current state.
  qualifies: (state: GameState) => boolean;
  // Priority for choosing among multiple qualifying beats.
  priority: number;
};

// Everything the prompt assembler needs to generate a beat.
export type BeatGenerationContext = {
  beat: BeatIntent;
  state: GameState;
  player: PlayerProfile;
  loveInterest: LIProfile;
  recentSummary: string;
  voiceAnchors: string[];
};

// What comes back from the model after a beat is generated.
export type GeneratedBeat = {
  prose: string;
  suggestedChoices: Choice[];
  // Short summary of this beat to be appended to state.recentBeatsSummary.
  proposedSummary: string;
};
