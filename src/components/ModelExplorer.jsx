import { useState } from 'react';
import Plot from '../PlotlyComponent';
import { MODELS, STRATEGIES, STRATEGY_TYPE, driftRates, modelInfo } from '../data/researchData';
import ModelLogo from './ModelLogo';

// Which questions each model reversed on, per strategy (out of 15)
const questionCount = (rate) => Math.round(rate * 15);

export default function ModelExplorer() {
  const [active,   setActive]   = useState('ChatGPT');
  const [chartKey, setChartKey] = useState(0);

  const selectModel = (m) => { setActive(m); setChartKey(k => k + 1); };

  const info  = modelInfo[active];
  const rates = driftRates[active].map(v => Math.round(v * 100));

  const inducerIdx    = STRATEGIES.map((s, i) => STRATEGY_TYPE[s] === 'inducer'    ? i : null).filter(i => i !== null);
  const stabilizerIdx = STRATEGIES.map((s, i) => STRATEGY_TYPE[s] === 'stabilizer' ? i : null).filter(i => i !== null);

  const data = [
    {
      type: 'bar',
      name: 'Pressure strategies',
      x: inducerIdx.map(i => STRATEGIES[i]),
      y: inducerIdx.map(i => rates[i]),
      width: inducerIdx.map(() => 0.5),
      marker: { color: info.color + 'cc', line: { color: info.color, width: 1.5 } },
      text: inducerIdx.map(i => `${questionCount(driftRates[active][i])} of 15 questions reversed`),
      textposition: 'outside',
      textfont: { size: 10, color: '#9ca3af', family: 'Inter' },
      cliponaxis: false,
      showlegend: true,
      hovertemplate: '<b>%{x}</b><br>Reversed on <b>%{y}%</b> of questions<br>(%{text})<extra></extra>',
    },
    {
      type: 'bar',
      name: 'Stabilizing strategies',
      x: stabilizerIdx.map(i => STRATEGIES[i]),
      y: stabilizerIdx.map(i => rates[i]),
      width: stabilizerIdx.map(() => 0.5),
      marker: { color: '#16a34acc', line: { color: '#15803d', width: 2 } },
      text: stabilizerIdx.map(i => `${questionCount(driftRates[active][i])} of 15 questions reversed`),
      textposition: 'outside',
      textfont: { size: 10, color: '#4ade80', family: 'Inter' },
      cliponaxis: false,
      showlegend: true,
      hovertemplate: '<b>%{x}</b><br>Reversed on <b>%{y}%</b> of questions<br>(%{text})<extra></extra>',
    },
  ];

  const layout = {
    paper_bgcolor: 'transparent',
    plot_bgcolor:  'transparent',
    font: { family: 'Inter, sans-serif', size: 12, color: '#6b7280' },
    xaxis: {
      tickfont: { size: 12, color: '#374151' },
      linecolor: '#e5e7eb',
      gridcolor: 'transparent',
      fixedrange: true,
    },
    yaxis: {
      range: [0, 118],
      tickfont: { size: 11, family: 'JetBrains Mono', color: '#9ca3af' },
      gridcolor: '#f3f4f6',
      linecolor: 'transparent',
      zerolinecolor: '#e5e7eb',
      fixedrange: true,
    },
    legend: {
      orientation: 'h',
      x: 0.5, xanchor: 'center',
      y: -0.28,
      font: { size: 11 },
      bgcolor: 'transparent',
    },
    margin: { l: 60, r: 24, t: 16, b: 90 },
    height: 340,
    bargap: 0.4,
    transition: { duration: 400, easing: 'cubic-in-out' },
    hoverlabel: { bgcolor: '#1f2937', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
    annotations: [
      { x: STRATEGIES[3], y: -16, text: 'STABILIZER', showarrow: false, font: { size: 9, color: '#4ade80', family: 'JetBrains Mono' }, xref: 'x', yref: 'y' },
      { x: STRATEGIES[4], y: -16, text: 'STABILIZER', showarrow: false, font: { size: 9, color: '#4ade80', family: 'JetBrains Mono' }, xref: 'x', yref: 'y' },
    ],
  };

  return (
    <section id="explore" style={{ background: '#0d0d18', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>Explore by model</p>
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#f9fafb' }}>Reversal rate by strategy</h2>
        <p className="text-sm mt-1 max-w-2xl" style={{ color: '#9ca3af' }}>
          How many of the 15 questions each model answered differently after each strategy was applied.
        </p>
      </div>

      {/* Model picker */}
      <div className="flex flex-wrap gap-3 mb-6">
        {MODELS.map(m => {
          const mi = modelInfo[m];
          const isActive = m === active;
          return (
            <button
              key={m}
              onClick={() => selectModel(m)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200"
              style={{
                background:  isActive ? mi.color + '18' : 'rgba(255,255,255,0.04)',
                borderColor: isActive ? mi.color        : '#1f2937',
                color:       isActive ? mi.color        : '#6b7280',
                boxShadow:   isActive ? `0 0 16px ${mi.color}33` : 'none',
              }}
            >
              <ModelLogo model={m} size={18} />
              {mi.logoType === 'icon' ? m : null}
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div
        key={active}
        className="rounded-2xl overflow-hidden animate-slide-up"
        style={{ border: `1px solid ${info.color}33`, background: 'rgba(255,255,255,0.03)' }}
      >
        {/* Model header */}
        <div className="px-6 pt-5 pb-4" style={{ background: info.color + '12', borderBottom: `1px solid ${info.color}22` }}>
          <div className="flex items-center gap-4 mb-2">
            <ModelLogo model={active} size={28} />
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: info.color + '22', color: info.color }}>
              {info.tagline}
            </span>
          </div>
          <p className="text-sm mt-2 leading-relaxed max-w-2xl" style={{ color: '#9ca3af' }}>{info.summary}</p>
        </div>

        {/* Chart */}
        <div className="px-4 pb-2 pt-4">
          <Plot
            key={chartKey}
            data={data}
            layout={{ ...layout,
              font: { ...layout.font, color: '#9ca3af' },
              xaxis: { ...layout.xaxis, tickfont: { size: 12, color: '#e5e7eb' }, linecolor: '#374151', gridcolor: 'transparent' },
              yaxis: { ...layout.yaxis, tickfont: { size: 11, family: 'JetBrains Mono', color: '#6b7280' }, gridcolor: '#1f2937', zerolinecolor: '#374151' },
              legend: { ...layout.legend, font: { size: 11, color: '#9ca3af' } },
              hoverlabel: { bgcolor: '#111827', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
              annotations: layout.annotations,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </div>

        <p className="mx-6 mb-5 text-xs" style={{ color: '#6b7280' }}>
          Y-axis: reversals out of 15 questions. Green bars are stabilizing strategies.
        </p>
      </div>
    </div>
    </section>
  );
}
