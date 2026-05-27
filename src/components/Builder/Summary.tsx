import type { BuilderAnswers } from '../../types/builder';
import { assembleProfiles } from './utils';

type Props = {
  answers: BuilderAnswers;
};

export function Summary({ answers }: Props) {
  const { player, li } = assembleProfiles(answers);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h2 className="font-serif text-3xl text-stone-100 leading-tight mb-2">Ready</h2>
        <p className="text-sm text-stone-400">
          The story will start the moment you press begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-stone-700 rounded-md p-5">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">You</p>
          <p className="font-serif text-2xl text-stone-50 mb-3">{player.name}</p>
          <ul className="text-sm text-stone-300 space-y-1">
            <li>{player.age}, {player.gender}</li>
            <li>{player.profession}</li>
            <li>{player.physical.hairLength.toLowerCase()} {player.physical.hairColor.toLowerCase()} hair, {player.physical.eyeColor.toLowerCase()} eyes</li>
            <li>{player.physical.bodyType}, {player.physical.heightRange.toLowerCase()}</li>
            <li>{player.personality.core} · {player.personality.texture}</li>
            <li>{player.personality.drive} · {player.personality.vulnerability}</li>
          </ul>
        </div>

        <div className="border border-stone-700 rounded-md p-5">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Him</p>
          <p className="font-serif text-2xl text-stone-50 mb-3">{li.name}</p>
          <ul className="text-sm text-stone-300 space-y-1">
            <li>{li.gender}</li>
            <li>{li.physical.hairLength.toLowerCase()} {li.physical.hairColor.toLowerCase()} hair, {li.physical.eyeColor.toLowerCase()} eyes</li>
            <li>{li.physical.bodyType}, {li.physical.heightRange.toLowerCase()}</li>
            <li>{li.personality.core} · {li.personality.texture}</li>
            <li>{li.personality.drive} · {li.personality.vulnerability}</li>
            <li className="text-stone-400 italic">{li.archetypeAnswers.bandName || ''}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
