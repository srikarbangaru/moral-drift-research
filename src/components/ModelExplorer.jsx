import { useState, useMemo } from 'react';
import Plot from '../PlotlyComponent';
import { MODELS, STRATEGIES, STRATEGY_TYPE, driftRates, modelInfo } from '../data/researchData';
import ModelLogo from './ModelLogo';

export default function ModelExplorer() {
  const [active,    setActive]    = useState('ChatGPT');
  const [chartKey,  setChartKey]  = useState(0);
  const [threshold, setThreshold] = useState(40); // drift alert threshold %

  const selectModel = (m) => {
    setActive(m);
    setChartKey(k => k + 1);
  };

  const info  = modelInfo[active];
  const rates = driftRates[active].map(v => Math.round(v * 100));

  // Color each bar: over threshold → red, stabilizer → green, normal → model color
  const barColors = useMemo(() =>
    STRATEGIES.map((s, i) => {
      if (rates[i] >= threshold) return '#ef4444';
      if (STRATEGY_TYPE[s] === 'stabilizer') return '#a3e635';
      return info.color;
    }),
    [active, threshold]
  );

  const breachCount = rates.filter(r => r >= threshold).length;

  const data = [{
    type: 'bar',
    x: STRATEGIES,
    y: rates,
    marker: { color: barColors, line: { width: 0 } },
    text: rates.map(v => `${v}%`),
    textposition: 'outside',
    textfont: { size: 12, color: '#6b7280', family: 'JetBrains Mono' },
    cliponaxis: false,
    hovertemplate: '<b>%{x}</b><br>Drift rate: <b>%{y}%</b><br><i>%{customdata}</i><extra></extra>',
    customdata: STRATEGIES.map((s, i) => {
      const over = rates[i] >= threshold;
      const type = STRATEGY_TYPE[s] === 'stabilizer' ? 'stabilizing' : 'drift-inducing';
      return over ? `⚠️ Exceeds your ${threshold}% alert threshold` : `${type} strategy`;
    }),
  }];

  const layout = useMemo(() => ({
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
      ticksuffix: '%',
      tickfont: { size: 11, family: 'JetBrains Mono', color: '#9ca3af' },
      gridcolor: '#f3f4f6',
      linecolor: 'transparent',
      zerolinecolor: '#e5e7eb',
      fixedrange: true,
    },
    margin: { l: 44, r: 24, t: 16, b: 48 },
    height: 300,
    bargap: 0.38,
    transition: { duration: 400, easing: 'cubic-in-out' },
    hoverlabel: {
      bgcolor: '#1f2937',
      bordercolor: '#374151',
      font: { color: '#f9fafb', size: 12 },
    },
    // Threshold line
    shapes: threshold > 0 ? [{
      type: 'line',
      x0: -0.5, x1: STRATEGIES.length - 0.5,
      y0: threshold, y1: threshold,
      xref: 'x', yref: 'y',
      line: { color: '#ef4444', width: 1.5, dash: 'dash' },
    }] : [],
    annotations: [
      {
        x: STRATEGIES.length - 0.5,
        y: threshold,
        text: `${threshold}% limit`,
        showarrow: false,
        font: { size: 10, color: '#ef4444', family: 'JetBrains Mono' },
        xanchor: 'right',
        yanchor: 'bottom',
        yshift: 4,
      },
      {
        x: STRATEGIES.length - 1,
        y: 112,
        text: '🟢 green = stabilizer',
        showarrow: false,
        font: { size: 10, color: '#9ca3af' },
        xref: 'x', yref: 'y',
      },
    ],
  }), [active, threshold]);

  return (
    <section id="explore" className="max-w-5xl mx-auto px-6 py-10">
      <div className="border-t border-gray-200 pt-10 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Explore by model</p>
        <h2 className="text-2xl font-bold text-gray-900">How did each model perform?</h2>
        <p className="text-sm text-gray-500 mt-1">Pick a model, then drag the slider to set your own drift alert level.</p>
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
                background:  isActive ? mi.bg     : 'white',
                borderColor: isActive ? mi.border : '#e5e7eb',
                color:       isActive ? mi.color  : '#6b7280',
                boxShadow:   isActive ? `0 0 0 2px ${mi.border}` : 'none',
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
        className="bg-white rounded-2xl border shadow-sm overflow-hidden animate-slide-up"
        style={{ borderColor: info.border }}
      >
        {/* Model header */}
        <div className="px-6 pt-5 pb-4" style={{ background: info.bg }}>
          <div className="flex items-center gap-4 mb-2">
            <ModelLogo model={active} size={28} />
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: info.color + '20', color: info.color }}
            >
              {info.tagline}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-2xl">
            {info.summary}
          </p>
        </div>

        {/* ── Drift Alert Slider ── */}
        <div className="px-6 pt-5 pb-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Drift Alert Threshold
              </label>
              <p className="text-xs text-gray-400 mt-0.5">
                Bars above this line are flagged red - you decide what's "too much."
              </p>
            </div>

            {/* Live badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-300"
              style={{
                background: breachCount > 0 ? '#fef2f2' : '#f0fdf4',
                color:      breachCount > 0 ? '#ef4444' : '#16a34a',
                border: `1px solid ${breachCount > 0 ? '#fecaca' : '#bbf7d0'}`,
              }}
            >
              {breachCount > 0
                ? `⚠️ ${breachCount} of 5 exceeded`
                : '✓ All within limit'}
            </div>
          </div>

          {/* Slider row */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-400 w-6">0%</span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={threshold}
              onChange={e => setThreshold(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
              style={{
                accentColor: '#ef4444',
                background: `linear-gradient(to right, #ef4444 ${threshold}%, #e5e7eb ${threshold}%)`,
              }}
            />
            <span className="text-xs font-mono text-gray-400 w-10 text-right">100%</span>
            <span
              className="text-lg font-bold w-14 text-right font-mono"
              style={{ color: '#ef4444' }}
            >
              {threshold}%
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 pb-4 pt-1">
          <Plot
            key={chartKey}
            data={data}
            layout={layout}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </div>

        <div className="mx-6 mb-5 rounded-xl p-3 text-xs text-gray-500 bg-gray-50 border border-gray-100">
          <span className="font-medium text-gray-700">Reading this chart: </span>
          Each bar shows how often the model changed its answer. Drag the slider above to mark your own
          acceptable threshold - anything in red is above it. Green bars are the <em>stabilizing</em> strategies.
        </div>
      </div>
    </section>
  );
}
