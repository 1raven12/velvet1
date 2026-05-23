import { useState, useEffect } from 'react';
import type { BuilderQuestion } from '../../types/module';

type Props = {
  question: BuilderQuestion;
  initialValue: string | number | undefined;
  onAnswer: (value: string | number) => void;
  error: string | null;
};

export function QuestionCard({ question, initialValue, onAnswer, error }: Props) {
  // Local state for the input. Committed up via onAnswer when valid.
  const [selected, setSelected] = useState<string | undefined>(
    question.kind === 'mc' && typeof initialValue === 'string' ? initialValue : undefined
  );
  const [customText, setCustomText] = useState<string>('');
  const [numberValue, setNumberValue] = useState<string>(
    question.kind === 'number' && typeof initialValue === 'number' ? String(initialValue) : ''
  );

  // If initialValue exists and isn't in the options, treat it as custom text.
  useEffect(() => {
    if (question.kind === 'mc' && typeof initialValue === 'string') {
      if (!question.options.includes(initialValue) && question.allowCustom) {
        setCustomText(initialValue);
        setSelected(undefined);
      }
    }
  }, [initialValue, question]);

  function commitMC(option: string) {
    setSelected(option);
    setCustomText('');
    onAnswer(option);
  }

  function commitCustom(text: string) {
    setCustomText(text);
    setSelected(undefined);
    if (text.trim().length > 0) {
      onAnswer(text.trim());
    }
  }

  function commitNumber(raw: string) {
    setNumberValue(raw);
    const parsed = parseInt(raw, 10);
    if (!Number.isNaN(parsed)) {
      onAnswer(parsed);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="font-serif text-3xl text-stone-100 leading-tight">{question.prompt}</h2>

      {question.kind === 'mc' && (
        <div className="flex flex-col gap-2">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => commitMC(option)}
              className={`text-left px-4 py-3 rounded-md border transition-colors ${
                selected === option
                  ? 'border-stone-100 bg-stone-100/10 text-stone-50'
                  : 'border-stone-700 bg-stone-900/40 text-stone-200 hover:border-stone-500 hover:bg-stone-800/40'
              }`}
            >
              {option}
            </button>
          ))}

          {question.allowCustom && (
            <div className="mt-2">
              <label className="text-sm text-stone-400 mb-1 block">Or write your own:</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => commitCustom(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-900/40 text-stone-100 focus:outline-none focus:border-stone-400"
                placeholder="Type here"
              />
            </div>
          )}
        </div>
      )}

      {question.kind === 'number' && (
        <div className="flex flex-col gap-2">
          <input
            type="number"
            inputMode="numeric"
            value={numberValue}
            onChange={(e) => commitNumber(e.target.value)}
            min={question.min}
            max={question.max}
            className="w-full px-4 py-3 rounded-md border border-stone-700 bg-stone-900/40 text-stone-100 text-lg focus:outline-none focus:border-stone-400"
            placeholder={question.min !== undefined ? `Minimum ${question.min}` : 'Enter a number'}
          />
          {question.min !== undefined && question.max !== undefined && (
            <p className="text-xs text-stone-500">Between {question.min} and {question.max}.</p>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
