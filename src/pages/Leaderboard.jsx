import { Trophy, Medal } from 'lucide-react';

const Leaderboard = () => {
  const players = [
    { rank: 1, name: 'NullPointer', wpm: 142, lang: 'C++' },
    { rank: 2, name: 'AsyncAwait', wpm: 128, lang: 'JavaScript' },
    { rank: 3, name: 'PythonicWay', wpm: 115, lang: 'Python' },
    { rank: 4, name: 'ReactWizard', wpm: 98, lang: 'React' },
  ];

  return (
    <div className="w-full max-w-4xl p-8">
      <div className="text-center mb-12">
        <Trophy className="text-primary mx-auto mb-4" size={48} />
        <h2 className="text-4xl font-extrabold tracking-tight">Global Rankings</h2>
        <p className="text-muted mt-2">The fastest coders in the world.</p>
      </div>

      <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        {players.map((player) => (
          <div key={player.rank} className="flex items-center justify-between p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-6">
              <span className={`text-2xl font-black w-8 ${
                player.rank === 1 ? 'text-yellow-400' : player.rank === 2 ? 'text-gray-400' : player.rank === 3 ? 'text-orange-400' : 'text-muted'
              }`}>
                {player.rank === 1 ? <Medal size={28}/> : player.rank}
              </span>
              <span className="text-xl font-bold">{player.name}</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-muted font-mono bg-background px-3 py-1 rounded-lg text-sm">{player.lang}</span>
              <span className="text-3xl font-mono font-bold text-primary">{player.wpm} <span className="text-xs text-muted">WPM</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;