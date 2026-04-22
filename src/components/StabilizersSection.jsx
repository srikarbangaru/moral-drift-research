import Plot from '../PlotlyComponent';
import { MODELS, STRATEGIES, STRATEGY_TYPE, driftRates, modelInfo } from '../data/researchData';
import ModelLogo from './ModelLogo';

const inducerAvg = (m) => {
  const vals = STRATEGIES.map((s, i) => STRATEGY_TYPE[s] === 'inducer' ? driftRates[m][i] : null).filter(v => v !== null);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
};
const stabilizerAvg = (m) => {
  const vals = STRATEGIES.map((s, i) => STRATEGY_TYPE[s] === 'stabilizer' ? driftRates[m][i] : null).filter(v => v !== null);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
};

const chartData = [
  {
    type: 'bar',
    name: 'Inducers avg (Persuasion, Role, Emotional)',
    x: MODELS,
    y: MODELS.map(m => Math.round(inducerAvg(m) * 100)),
    marker: { color: '#f87171', line: { color: '#ef4444', width: 1 } },
    hovertemplate: '<b>%{x}</b><br>Avg inducer shift: <b>%{y}%</b><extra></extra>',
  },
  {
    type: 'bar',
    name: 'Stabilizers avg (Ethical Reminder, Self-Consistency)',
    x: MODELS,
    y: MODELS.map(m => Math.round(stabilizerAvg(m) * 100)),
    marker: { color: '#4ade80', line: { color: '#16a34a', width: 1 } },
    hovertemplate: '<b>%{x}</b><br>Avg stabilizer shift: <b>%{y}%</b><extra></extra>',
  },
];

const layout = {
  paper_bgcolor: 'transparent',
  plot_bgcolor:  'transparent',
  barmode: 'group',
  bargap: 0.28,
  bargroupgap: 0.08,
  font: { family: 'Inter, sans-serif', size: 12, color: '#6b7280' },
  xaxis: { tickfont: { size: 13, color: '#374151' }, linecolor: '#e5e7eb', gridcolor: 'transparent', fixedrange: true },
  yaxis: {
    range: [0, 115], ticksuffix: '%',
    tickfont: { size: 11, family: 'JetBrains Mono', color: '#9ca3af' },
    gridcolor: '#e5e7eb', linecolor: 'transparent', zerolinecolor: '#e5e7eb', fixedrange: true,
    title: { text: 'Avg shift rate', font: { size: 11, color: '#9ca3af' } },
  },
  legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.22, font: { size: 11 }, bgcolor: 'transparent' },
  margin: { l: 54, r: 20, t: 16, b: 80 },
  height: 340,
  transition: { duration: 500, easing: 'cubic-in-out' },
  hoverlabel: { bgcolor: '#1f2937', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
};

export default function StabilizersSection() {
  return (
    <section id="stabilizers" className="max-w-5xl mx-auto px-6 py-10">
      <div className="border-t border-gray-200 pt-10 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">The paradox</p>
        <h2 className="text-2xl font-bold text-gray-900">Do stabilizers actually work?</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl">
          We expected inducer strategies to cause shift and stabilizer strategies to prevent it.
          The data tells a different story.
        </p>
      </div>

      {/* Key insight callout */}
      <div
        className="rounded-2xl p-5 mb-6 flex items-start gap-4"
        style={{ background: 'linear-gradient(135deg, #fffbeb, #fef9c3)', border: '1px solid #fde68a' }}
      >
        <span className="text-2xl shrink-0">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-amber-900 mb-1">
            Models changed their moral stance even with stabilizing strategies
          </p>
          <p className="text-sm text-amber-700 leading-relaxed">
            The green bars below should ideally be near zero. They represent strategies specifically
            designed to keep models consistent. Instead, every model shows meaningful shift under
            stabilizers too. For Gemini, the stabilizer average was <strong>57%</strong>, barely
            lower than its inducer average.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <Plot
          data={chartData}
          layout={layout}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%' }}
          useResizeHandler
        />
      </div>

      {/* Per-model breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MODELS.map(m => {
          const mi     = modelInfo[m];
          const indPct = Math.round(inducerAvg(m) * 100);
          const stbPct = Math.round(stabilizerAvg(m) * 100);
          const delta  = stbPct - indPct;
          return (
            <div key={m} className="rounded-2xl border p-4" style={{ background: mi.bg, borderColor: mi.border }}>
              <div className="flex items-center justify-between mb-3">
                <ModelLogo model={m} size={20} />
                {mi.logoType === 'icon' && <span className="text-xs font-semibold text-gray-600">{m}</span>}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Inducers avg</p>
                  <p className="text-xl font-bold text-red-500">{indPct}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Stabilizers avg</p>
                  <p className="text-xl font-bold text-green-600">{stbPct}%</p>
                </div>
                <div
                  className="text-xs font-semibold px-2 py-1 rounded-full text-center"
                  style={{
                    background: delta <= -10 ? '#dcfce7' : delta <= 0 ? '#fef9c3' : '#fef2f2',
                    color:      delta <= -10 ? '#15803d' : delta <= 0 ? '#92400e' : '#b91c1c',
                  }}
                >
                  {delta > 0 ? `+${delta}%` : `${delta}%`} vs inducers
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
