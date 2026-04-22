import { keyStats } from '../data/researchData';

const STAT_COLORS = ['#6366f1', '#3b82f6', '#f59e0b', '#ef4444'];

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4 animate-fade-in">
        Amber Team · 2026
      </p>

      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-bold leading-tight mb-2 animate-slide-up"
        style={{ animationDelay: '60ms', color: '#111827' }}
      >
        When Models Change
        <br className="hidden sm:block" />
        <span
          className="relative inline-block"
          style={{ color: '#6366f1' }}
        >
          Their Minds
          <span
            className="absolute left-0 bottom-0 w-full h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #3b82f6)', opacity: 0.4 }}
          />
        </span>
      </h1>

      <p className="text-lg text-gray-400 font-medium mb-4 animate-slide-up" style={{ animationDelay: '80ms' }}>
        Moral Shift in AI Reasoning
      </p>

      <p className="text-base text-gray-500 max-w-xl leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '120ms' }}>
        We prompted four AI models with the same 15 moral questions, then applied different
        pressure strategies to see if - and how much - their answers changed.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {keyStats.map((s, i) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border p-5 shadow-sm animate-slide-up relative overflow-hidden"
            style={{
              animationDelay: `${180 + i * 60}ms`,
              borderColor: STAT_COLORS[i] + '30',
            }}
          >
            {/* Colored top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: STAT_COLORS[i] }} />
            <p className="text-3xl font-bold mb-1 mt-1" style={{ color: STAT_COLORS[i] }}>{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mb-0.5">{s.label}</p>
            <p className="text-xs text-gray-400">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div
        className="mt-6 rounded-2xl px-5 py-4 animate-slide-up flex items-start gap-3"
        style={{ animationDelay: '420ms', background: '#fffbeb', border: '1px solid #fde68a' }}
      >
        <span className="text-xl mt-0.5">⚡</span>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">The twist:</span>{' '}
          Even the strategies designed to <em>stabilize</em> the models ended up causing shift.
          No strategy kept the baseline intact.
        </p>
      </div>
    </section>
  );
}
