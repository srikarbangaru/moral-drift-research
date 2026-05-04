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
    name: 'Pressure strategies (avg)',
    x: MODELS,
    y: MODELS.map(m => Math.round(inducerAvg(m) * 100)),
    marker: { color: '#f87171', line: { color: '#ef4444', width: 1 } },
    hovertemplate: '<b>%{x}</b><br>Avg inducer shift: <b>%{y}%</b><extra></extra>',
  },
  {
    type: 'bar',
    name: 'Stabilizing strategies (avg)',
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
  xaxis: { tickfont: { size: 13, color: '#e5e7eb' }, linecolor: '#374151', gridcolor: 'transparent', fixedrange: true },
  yaxis: {
    range: [0, 115],
    tickfont: { size: 11, family: 'JetBrains Mono', color: '#9ca3af' },
    gridcolor: '#1f2937', linecolor: 'transparent', zerolinecolor: '#374151', fixedrange: true,
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
    <section id="stabilizers" style={{ background: "#0d0d18", borderTop: "1px solid #1f2937", borderBottom: "1px solid #1f2937" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="pt-10 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>The paradox</p>
        <h2 className="text-2xl font-bold text-[#f9fafb]">Do stabilizers actually work?</h2>
        <p className="text-sm mt-1 max-w-2xl" style={{ color: '#9ca3af' }}>
          Pressure strategies were expected to cause reversals; stabilizing strategies were designed to prevent them. Neither worked as cleanly as expected.
        </p>
      </div>

      {/* Key insight callout */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#f59e0b' }}>Key result</p>
        <p className="text-sm leading-relaxed" style={{ color: '#fcd34d' }}>
          Every model reversed answers even under stabilizing strategies. For Gemini, the average reversal rate under
          stabilizers was <strong>57%</strong>, nearly identical to its inducer average.
          The green bars in the chart below should ideally be near zero.
        </p>
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-[#1f2937] bg-[rgba(255,255,255,0.03)] p-5 mb-6">
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
            <div key={m} className="rounded-2xl border p-4" style={{ background: 'rgba(255,255,255,0.04)', borderColor: mi.color + '44' }}>
              <div className="flex items-center justify-between mb-3">
                <ModelLogo model={m} size={20} />
                {mi.logoType === 'icon' && <span className="text-xs font-semibold" style={{ color: '#9ca3af' }}>{m}</span>}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#9ca3af' }}>Inducers avg</p>
                  <p className="text-xl font-bold" style={{ color: '#f87171' }}>{indPct}%</p>
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#9ca3af' }}>Stabilizers avg</p>
                  <p className="text-xl font-bold" style={{ color: '#4ade80' }}>{stbPct}%</p>
                </div>
                <div
                  className="text-xs font-semibold px-2 py-1 rounded-full text-center"
                  style={{
                    background: delta <= -10 ? 'rgba(74,222,128,0.15)' : delta <= 0 ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
                    color:      delta <= -10 ? '#4ade80'               : delta <= 0 ? '#fbbf24'               : '#f87171',
                  }}
                >
                  {delta > 0 ? `+${delta}%` : `${delta}%`} vs inducers
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}
