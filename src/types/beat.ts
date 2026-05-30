import type { GameState, LIProfile, PlayerProfile } from './state';

// Effect of a single player choice on game state.
export type ChoiceEffect = {
  stateMutations: Partial<{
    intimacy: number;
    trust: number;
    obsession: number;
    fracture: number;
    composure: number;
  }>;
  flagsToSet?: Record<string, boolean>;
  knowledgeAdded?: {
    player?: string[];
    li?: string[];
  };
  speciesReveals?: {
    playerToLI?: boolean;
    liToPlayer?: boolean;
  };
};

export type Choice = {
  id: string;
  label: string;
  effect: ChoiceEffect;
};

// Beats come in four kinds. The scheduler uses kind to force variety.
export type BeatKind = 'li' | 'orbit' | 'pressure' | 'texture';

export type BeatIntent = {
  id: string;
  kind: BeatKind;
  purpose: string;
  requiredEvents: string[];
  playerEmotionalPosition: string;
  liEmotionalPosition: string;
  sceneAnchors: string[];
  // Which orbit character owns this beat, if kind === 'orbit'.
  orbitCharacterId?: string;
  // True for door/kiss/fight/morning-after type beats that need full state-aware variants.
  highVariation: boolean;
  // Scheduling metadata.
  cooldown: number;       // beats that must pass before this can fire again
  maxConsecutive: number; // cap on same-kind beats in a row (engine-enforced too)
  weight: number;         // priority among qualifying beats (higher wins more often)
  // Conditions under which this beat qualifies. All present conditions must hold.
  qualifies: (state: GameState) => boolean;
  // Optional proactive trigger. If set and matched, this beat is force-pulled.
  triggerWhen?: {
    beatsSinceLastLI?: number;
    beatsSinceLastOrbit?: number;
    minActProgress?: number;
    flagsRequired?: string[];
  };
};

export type BeatGenerationContext = {
  beat: BeatIntent;
  state: GameState;
  player: PlayerProfile;
  loveInterest: LIProfile;
  recentSummary: string;
  voiceAnchors: string[];
};

export type GeneratedBeat = {
  prose: string;
  suggestedChoices: Choice[];
  proposedSummary: string;
};
