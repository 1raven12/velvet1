import { useMemo, useState } from 'react';
import type { PlayerProfile, LIProfile } from '../../types/state';
import type { BuilderScreen, BuilderAnswers } from '../../types/builder';
import {
  buildScreenSequence,
  recordAnswer,
  validateAnswer,
  emptyAnswers,
  getCurrentAnswer,
  assembleProfiles,
} from './utils';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { ModulePicker } from './ModulePicker';
import { Summary } from './Summary';

type Props = {
  onComplete: (player: PlayerProfile, li: LIProfile) => void;
};

export function BuilderShell({ onComplete }: Props) {
  const screens = useMemo(buildScreenSequence, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<BuilderAnswers>(emptyAnswers);
  const [error, setError] = useState<string | null>(null);

  const screen = screens[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === screens.length - 1;

  // Determine if the user can advance.
  function canAdvance(): boolean {
    if (
      screen.type === 'player-question' ||
      screen.type === 'setting-question' ||
      screen.type === 'universal-question' ||
      screen.type === 'archetype-question' ||
      screen.type === 'trope-question'
    ) {
      const value = getCurrentAnswer(screen, answers);
      const err = validateAnswer(screen.question, value);
      return err === null;
    }
    return true;
  }

  function handleAnswer(value: string | number) {
    setAnswers((prev) => recordAnswer(prev, screen, value));
    setError(null);
  }

  function next() {
    if (!canAdvance()) {
      setError('Please answer to continue.');
      return;
    }
    setError(null);
    if (isLast) {
      const { player, li } = assembleProfiles(answers);
      onComplete(player, li);
      return;
    }
    setCurrentIndex((i) => i + 1);
  }

  function prev() {
    if (isFirst) return;
    setError(null);
    setCurrentIndex((i) => i - 1);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 max-w-2xl mx-auto">
      <div className="w-full mb-8">
        <ProgressBar current={currentIndex + 1} total={screens.length} />
      </div>

      <div className="w-full flex-1 flex flex-col justify-center min-h-[60vh]">
        {screen.type === 'welcome' && (
          <div className="flex flex-col gap-4 w-full">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">VELVET</p>
            <h1 className="font-serif text-5xl text-stone-50 leading-tight">
              Begin.
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed max-w-md">
              You're about to choose the world, the trope, and the person at the centre of your story.
              Take your time. Every answer shapes what happens.
            </p>
          </div>
        )}

        {(screen.type === 'setting-picker' ||
          screen.type === 'archetype-picker' ||
          screen.type === 'trope-picker') && (
          <ModulePicker kind={screen.type.replace('-picker', '') as 'setting' | 'archetype' | 'trope'} />
        )}

        {(screen.type === 'player-question' ||
          screen.type === 'setting-question' ||
          screen.type === 'universal-question' ||
          screen.type === 'archetype-question' ||
          screen.type === 'trope-question') && (
          <QuestionCard
            question={screen.question}
            initialValue={getCurrentAnswer(screen, answers)}
            onAnswer={handleAnswer}
            error={error}
          />
        )}

        {screen.type === 'summary' && <Summary answers={answers} />}
      </div>

      <div className="w-full mt-10 flex justify-between items-center">
        <button
          type="button"
          onClick={prev}
          disabled={isFirst}
          className="text-sm text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={next}
          className="font-serif text-lg px-6 py-3 rounded-md border border-stone-200 text-stone-100 hover:bg-stone-100 hover:text-stone-950 transition-colors"
        >
          {isLast ? 'Begin Story' : screen.type === 'welcome' ? 'Start' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
