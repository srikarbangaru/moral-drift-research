import { keyStats } from '../data/researchData';

export default function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-4 animate-fade-in">
        Amber Team · 2026
      </p>

      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 animate-slide-up"
        style={{ animationDelay: '60ms' }}
      >
        When Models Change<br className="hidden sm:block" /> Their Minds
      </h1>

      <p
        className="text-lg text-gray-500 max-w-xl leading-relaxed mb-10 animate-slide-up"
        style={{ animationDelay: '120ms' }}
      >
        We prompted four AI models with the same 15 moral questions, then applied different 
        pressure strategies to see if - and how much - their answers changed.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {keyStats.map((s, i) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm animate-slide-up"
            style={{ animationDelay: `${180 + i * 60}ms` }}
          >
            <p className="text-3xl font-bold text-gray-900 mb-1">{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mb-0.5">{s.label}</p>
            <p className="text-xs text-gray-400">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div
        className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 animate-slide-up"
        style={{ animationDelay: '420ms' }}
      >
        <p className="text-sm text-amber-800">
          <span className="font-semibold">The twist:</span>{' '}
          Even the strategies designed to <em>stabilize</em> the models (like ethical reminders) 
          ended up causing drift. No strategy kept the baseline intact.
        </p>
      </div>
    </section>
  );
}
