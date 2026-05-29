export { useGameStore } from './store';
export { deriveBehavior, MODE_BEHAVIOR, type BehavioralMode } from './behavior';
export { pickNextBeat, eligibleKindCounts } from './scheduler';
export { checkEnding, ENDINGS, type Ending, type EndingId } from './endings';
export { applyChoiceEffect, recordBeatPlayed } from './mutations';
export {
  EMOTIONAL_VARS,
  VAR_MEANINGS,
  VAR_MIN,
  VAR_MAX,
  clamp,
  type EmotionalVar,
} from './variables';
