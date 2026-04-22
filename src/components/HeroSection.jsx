import { keyStats } from '../data/researchData';

const STAT_COLORS = [
  { text: '#a5b4fc', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)' },
  { text: '#93c5fd', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
  { text: '#fcd34d', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
  { text: '#fca5a5', bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.3)'  },
];

export default function HeroSection() {
  return (
    <>
      {/* ── Dark hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #09090f 0%, #12103a 55%, #0f172a 100%)' }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Purple glow blob */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5 animate-fade-in" style={{ color: '#818cf8' }}>
            Amber Team · CS 4501 · 2026
          </p>

          <h1 className="font-bold leading-tight mb-3 animate-slide-up" style={{ animationDelay: '60ms', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#f9fafb' }}>
            When Models<br />
            <span style={{ color: '#a5b4fc' }}>Change Their Minds</span>
          </h1>

          <p className="text-xl font-light mb-5 animate-slide-up" style={{ animationDelay: '80ms', color: '#c7d2fe' }}>
            Moral Shift in AI Reasoning
          </p>

          <p className="text-base max-w-2xl leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '120ms', color: '#9ca3af' }}>
            We prompted four leading AI models with the same 15 moral questions,
            then applied five different pressure strategies (three designed to induce
            moral shift, two designed to prevent it) to measure how consistently
            each model holds its ethical stance.
          </p>

          {/* Stat pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {keyStats.map((s, i) => {
              const c = STAT_COLORS[i];
              return (
                <div
                  key={s.label}
                  className="rounded-2xl p-5 animate-slide-up"
                  style={{ animationDelay: `${180 + i * 60}ms`, background: c.bg, border: `1px solid ${c.border}` }}
                >
                  <p className="text-3xl font-bold mb-1" style={{ color: c.text }}>{s.value}</p>
                  <p className="text-sm font-medium mb-0.5" style={{ color: '#e5e7eb' }}>{s.label}</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>{s.note}</p>
                </div>
              );
            })}
          </div>

          {/* Callout */}
          <div
            className="rounded-2xl px-5 py-4 flex items-start gap-3 max-w-2xl animate-slide-up"
            style={{ animationDelay: '420ms', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}
          >
            <span className="text-xl mt-0.5" style={{ color: '#fbbf24' }}>⚡</span>
            <p className="text-sm leading-relaxed" style={{ color: '#fde68a' }}>
              <span className="font-semibold">The key finding: </span>
              Even the strategies designed to <em>stabilize</em> the models ended up causing shift.
              No strategy kept the baseline fully intact.
            </p>
          </div>

          {/* Scroll cue */}
          <div className="mt-10 flex items-center gap-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: '#374151' }}>
              <div className="w-1 h-1.5 rounded-full animate-bounce" style={{ background: '#818cf8' }} />
            </div>
            <span className="text-xs" style={{ color: '#4b5563' }}>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* ── Methodology strip ── */}
      <div className="border-b" style={{ background: '#f8f8fb', borderColor: '#e5e7eb' }}>
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #6366f1, #a855f7)' }} />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Methodology</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Each model answered 15 questions from the Moral Foundations Questionnaire (MFQ).
              Then, using 5 prompt strategies, we re-asked the same questions to see if answers changed.
              <span className="text-gray-400"> Strategies: Persuasion · Role Prompting · Emotional Framing · Ethical Reminder · Self-Consistency.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
