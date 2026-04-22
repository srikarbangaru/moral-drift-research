import { useState } from 'react';
import Plot from '../PlotlyComponent';
import { MODELS, STRATEGIES, driftRates, overallDrift, modelInfo } from '../data/researchData';
import ModelLogo from './ModelLogo';

const VIEW_OPTIONS = [
  { id: 'byStrategy', label: 'By Strategy' },
  { id: 'overall',    label: 'Overall Shift' },
];


export default function CompareModels() {
  const [view,     setView]     = useState('byStrategy');
  const [chartKey, setChartKey] = useState(0);

  const switchView = (v) => { setView(v); setChartKey(k => k + 1); };

  // ── By strategy: grouped bar ────────────────────────────────────────────────
  const byStrategyData = MODELS.map(m => ({
    type: 'bar',
    name: m,
    x: STRATEGIES,
    y: driftRates[m].map(v => Math.round(v * 100)),
    marker: { color: modelInfo[m].color },
    hovertemplate: `<b>${m}</b><br>%{x}: <b>%{y}%</b><extra></extra>`,
  }));

  // ── Overall: horizontal bar sorted (no emoji) ───────────────────────────────
  const sorted = [...MODELS].sort((a, b) => overallDrift[b] - overallDrift[a]);
  const overallData = [{
    type: 'bar',
    orientation: 'h',
    x: sorted.map(m => Math.round(overallDrift[m] * 100)),
    y: sorted.map(m => m),
    marker: { color: sorted.map(m => modelInfo[m].color) },
    text: sorted.map(m => `${Math.round(overallDrift[m] * 100)}%`),
    textposition: 'outside',
    textfont: { size: 13, family: 'JetBrains Mono', color: '#6b7280' },
    cliponaxis: false,
    hovertemplate: '<b>%{y}</b><br>Avg shift rate: <b>%{x}%</b><extra></extra>',
  }];

  const sharedLayout = {
    paper_bgcolor: 'transparent',
    plot_bgcolor:  'transparent',
    font: { family: 'Inter, sans-serif', size: 12, color: '#6b7280' },
    hoverlabel: { bgcolor: '#1f2937', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
    transition: { duration: 500, easing: 'cubic-in-out' },
  };

  const byStratLayout = {
    ...sharedLayout,
    barmode: 'group', bargap: 0.25, bargroupgap: 0.08,
    xaxis: { tickfont: { size: 11, color: '#374151' }, linecolor: '#e5e7eb', gridcolor: 'transparent', fixedrange: true },
    yaxis: { range: [0, 115], ticksuffix: '%', tickfont: { size: 10, family: 'JetBrains Mono', color: '#9ca3af' }, gridcolor: '#f3f4f6', linecolor: 'transparent', zerolinecolor: '#e5e7eb', fixedrange: true },
    legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2, font: { size: 12 }, bgcolor: 'transparent' },
    margin: { l: 44, r: 20, t: 10, b: 80 },
    height: 340,
  };

  const overallLayout = {
    ...sharedLayout,
    xaxis: { range: [0, 110], ticksuffix: '%', tickfont: { size: 10, family: 'JetBrains Mono', color: '#9ca3af' }, gridcolor: '#f3f4f6', linecolor: 'transparent', zerolinecolor: '#e5e7eb', fixedrange: true },
    yaxis: { tickfont: { size: 13, color: '#374151' }, linecolor: 'transparent', gridcolor: 'transparent', fixedrange: true, automargin: true },
    margin: { l: 20, r: 70, t: 10, b: 40 },
    height: 260,
  };

  return (
    <section id="compare" className="max-w-5xl mx-auto px-6 py-10">
      <div className="border-t border-gray-200 pt-10 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Compare all models</p>
        <h2 className="text-2xl font-bold text-gray-900">Which model shifted the most?</h2>
        <p className="text-sm text-gray-500 mt-1">Compare shift rates across all four models and see whether stabilizing strategies actually helped.</p>
      </div>

      {/* View toggle */}
      <div className="flex flex-wrap gap-2 mb-6">
        {VIEW_OPTIONS.map(o => (
          <button
            key={o.id}
            onClick={() => switchView(o.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
            style={{
              background:  view === o.id ? '#1f2937' : 'white',
              borderColor: view === o.id ? '#1f2937' : '#e5e7eb',
              color:       view === o.id ? 'white'   : '#6b7280',
            }}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div key={chartKey} className="animate-fade-in">
          {view === 'byStrategy' && (
            <Plot data={byStrategyData} layout={byStratLayout} config={{ responsive: true, displayModeBar: false }} style={{ width: '100%' }} useResizeHandler />
          )}
          {view === 'overall' && (
            <>
              <p className="text-xs text-gray-400 mb-2 font-mono">Average shift rate across all 5 strategies</p>
              <Plot data={overallData} layout={overallLayout} config={{ responsive: true, displayModeBar: false }} style={{ width: '100%' }} useResizeHandler />
            </>
          )}
        </div>
      </div>

      {/* Model chips */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {MODELS.map(m => {
          const mi   = modelInfo[m];
          const pct  = Math.round(overallDrift[m] * 100);
          const rank = [...MODELS].sort((a, b) => overallDrift[b] - overallDrift[a]).indexOf(m) + 1;
          return (
            <div key={m} className="rounded-xl border p-4 flex flex-col items-center justify-center text-center" style={{ background: mi.bg, borderColor: mi.border }}>
              <div className="flex items-center justify-center h-8 w-full mb-1">
                <ModelLogo model={m} size={22} />
              </div>
              {mi.logoType === 'icon' && <p className="text-sm font-semibold text-gray-700 mt-1">{m}</p>}
              <p className="text-2xl font-bold mt-2" style={{ color: mi.color }}>{pct}%</p>
              <p className="text-xs text-gray-400 mt-0.5">avg shift · #{rank}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
