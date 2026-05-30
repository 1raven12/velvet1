import { useState } from 'react';
import type { PlayerProfile, LIProfile } from './types/state';
import { BuilderShell } from './components/Builder';

function App() {
  const [profiles, setProfiles] = useState<{ player: PlayerProfile; li: LIProfile } | null>(null);

  if (profiles === null) {
    return (
      <BuilderShell
        onComplete={(player, li) => {
          // PART 3 ends here. PART 4 will wire this into the engine.
          console.log('Assembled profiles:', { player, li });
          setProfiles({ player, li });
        }}
      />
    );
  }

  // Placeholder until the game loop arrives in PART 6.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-4">VELVET</p>
        <h1 className="font-serif text-4xl text-stone-50 leading-tight mb-6">
          Ready.
        </h1>
        <p className="text-stone-300 text-lg mb-8 leading-relaxed">
          You built <span className="text-stone-50">{profiles.player.name}</span> and{' '}
          <span className="text-stone-50">{profiles.li.name}</span>. The story engine arrives in PART 4. Check the console for the assembled profiles.
        </p>
        <button
          type="button"
          onClick={() => setProfiles(null)}
          className="text-sm text-stone-400 hover:text-stone-200 px-3 py-2"
        >
          Build again
        </button>
      </div>
    </div>
  );
}

export default App;
