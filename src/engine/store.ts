import { create } from 'zustand';
import type { GameState, PlayerProfile, LIProfile } from '../types/state';
import type { BeatIntent, Choice } from '../types/beat';
import { initialGameState } from '../types/state';
import { applyChoiceEffect, recordBeatPlayed } from './mutations';
import { pickNextBeat } from './scheduler';
import { deriveBehavior, type BehavioralMode } from './behavior';
import { checkEnding, type Ending } from './endings';

type GameStore = {
  state: GameState;
  // Set the built profiles and reset run state.
  startRun: (player: PlayerProfile, li: LIProfile) => void;
  // Advance: pick and record the next beat. Returns it, or null if exhausted.
  advanceToNextBeat: (library: BeatIntent[]) => BeatIntent | null;
  // Apply a player's chosen option.
  chooseOption: (choice: Choice, beat: BeatIntent) => void;
  // Derived reads.
  currentBehavior: () => BehavioralMode;
  currentEnding: () => Ending | null;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  state: { ...initialGameState },

  startRun: (player, li) =>
    set(() => ({
      state: { ...initialGameState, player, loveInterest: li },
    })),

  advanceToNextBeat: (library) => {
    const beat = pickNextBeat(get().state, library);
    if (beat) {
      set((s) => ({ state: recordBeatPlayed(s.state, beat.id, beat.kind) }));
    }
    return beat;
  },

  chooseOption: (choice, _beat) =>
    set((s) => ({
      state: { ...applyChoiceEffect(s.state, choice.effect), lastChoice: choice.label },
    })),

  currentBehavior: () => deriveBehavior(get().state),
  currentEnding: () => checkEnding(get().state),
  reset: () => set(() => ({ state: { ...initialGameState } })),
}));
