import { Calendar, Code2, Zap, Target } from 'lucide-react';

const History = () => {
  const mockHistory = [
    { id: 1, lang: 'JavaScript', wpm: 84, acc: 98, date: '2023-10-24' },
    { id: 2, lang: 'Python', wpm: 72, acc: 95, date: '2023-10-23' },
    { id: 3, lang: 'React', wpm: 65, acc: 92, date: '2023-10-22' },
  ];

  return (
    <div className="w-full max-w-5xl p-8">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Zap className="text-primary" /> Performance History
      </h2>
      <div className="grid gap-4">
        {mockHistory.map((test) => (
          <div key={test.id} className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-6">
              <div className="p-3 bg-background rounded-xl text-primary group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{test.lang}</h3>
                <p className="text-muted text-sm flex items-center gap-1">
                  <Calendar size={14} /> {test.date}
                </p>
              </div>
            </div>
            <div className="flex gap-12">
              <div className="text-center">
                <p className="text-muted text-xs uppercase tracking-widest mb-1">WPM</p>
                <p className="text-2xl font-mono font-bold text-primary">{test.wpm}</p>
              </div>
              <div className="text-center">
                <p className="text-muted text-xs uppercase tracking-widest mb-1">ACC</p>
                <p className="text-2xl font-mono font-bold text-accent">{test.acc}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;