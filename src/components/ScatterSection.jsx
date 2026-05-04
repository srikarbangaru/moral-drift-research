import { useState } from 'react';
import Plot from '../PlotlyComponent';
import { MODELS, STRATEGIES, STRATEGY_TYPE, questions, answersData, modelInfo } from '../data/researchData';

const FOUNDATION_COLORS = {
  Authority: '#f59e0b',
  Fairness:  '#3b82f6',
  Harm:      '#ef4444',
  Loyalty:   '#10b981',
  Purity:    '#8b5cf6',
  Liberty:   '#06b6d4',
};

export default function ScatterSection() {
  const [activeModel, setActiveModel] = useState('ChatGPT');
  const [selected,    setSelected]    = useState(null); // { q, strategy }

  const info = modelInfo[activeModel];
  const modelAnswers = answersData[activeModel];

  // Build scatter points
  const shiftedX = [], shiftedY = [], shiftedText = [];
  const stableX  = [], stableY  = [], stableText  = [];

  STRATEGIES.forEach(strat => {
    const stratData = modelAnswers[strat] || [];
    stratData.forEach(({ q, shifted, base, prompted }) => {
      const qInfo = questions[q - 1];
      const tip = `<b>Q${q}: ${qInfo.short}</b><br>Foundation: ${qInfo.foundation}<br>Before: <b>${base}</b> → After: <b>${prompted}</b><br><i>Click for full question</i>`;
      if (shifted) {
        shiftedX.push(strat); shiftedY.push(q); shiftedText.push(tip);
      } else {
        stableX.push(strat);  stableY.push(q);  stableText.push(tip);
      }
    });
  });

  const plotData = [
    {
      type: 'scatter', mode: 'markers',
      name: 'Reversed position',
      x: shiftedX, y: shiftedY,
      marker: { color: info.color, size: 18, symbol: 'circle', line: { color: 'white', width: 2 } },
      text: shiftedText, hoverinfo: 'text',
      customdata: shiftedX.map((strat, i) => ({ strat, q: shiftedY[i] })),
    },
    {
      type: 'scatter', mode: 'markers',
      name: 'Held position',
      x: stableX, y: stableY,
      marker: { color: 'rgba(156,163,175,0.3)', size: 14, symbol: 'circle', line: { color: 'rgba(156,163,175,0.5)', width: 1 } },
      text: stableText, hoverinfo: 'text',
      customdata: stableX.map((strat, i) => ({ strat, q: stableY[i] })),
    },
  ];

  const layout = {
    paper_bgcolor: 'transparent',
    plot_bgcolor:  'transparent',
    font: { family: 'Inter, sans-serif', size: 12, color: '#9ca3af' },
    xaxis: {
      categoryorder: 'array',
      categoryarray: STRATEGIES,
      tickfont: { size: 12, color: '#e5e7eb' },
      linecolor: '#374151',
      gridcolor: '#1f2937',
      fixedrange: true,
      tickangle: -15,
    },
    yaxis: {
      range: [0.2, 15.8],
      tickmode: 'array',
      tickvals: questions.map(q => q.id),
      ticktext: questions.map(q => `Q${q.id} · ${q.foundation}`),
      tickfont: { size: 10, color: '#9ca3af' },
      linecolor: '#374151',
      gridcolor: '#1f2937',
      fixedrange: true,
    },
    legend: {
      x: 0.5, xanchor: 'center', y: -0.12,
      orientation: 'h',
      font: { size: 12, color: '#9ca3af' },
      bgcolor: 'transparent',
    },
    margin: { l: 130, r: 20, t: 20, b: 60 },
    height: 540,
    hoverlabel: { bgcolor: '#111827', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
    // Vertical lines separating stabilizers
    shapes: [
      {
        type: 'line', x0: 2.5, x1: 2.5, y0: 0, y1: 16,
        xref: 'x', yref: 'y',
        line: { color: '#4b5563', width: 1, dash: 'dot' },
      },
    ],
    annotations: [
      { x: 1, y: 16.4, text: '← Pressure strategies', showarrow: false, font: { size: 10, color: '#9ca3af' }, xref: 'x', yref: 'y', xanchor: 'center' },
      { x: 3.5, y: 16.4, text: 'Stabilizers →', showarrow: false, font: { size: 10, color: '#4ade80' }, xref: 'x', yref: 'y', xanchor: 'center' },
    ],
  };

  const handleClick = (e) => {
    if (!e.points || !e.points[0]) return;
    const pt = e.points[0];
    const strat = pt.x;
    const q = pt.y;
    setSelected({ strat, q });
  };

  const selectedQ   = selected ? questions[selected.q - 1] : null;
  const selectedAns = selected ? (modelAnswers[selected.strat] || []).find(r => r.q === selected.q) : null;

  return (
    <section id="scatter" className="py-0">
      {/* Dark header */}
      <div style={{ background: '#0a0a12', borderTop: '1px solid #1f2937' }}>
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6366f1' }}>
            Question-level data
          </p>
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#f9fafb' }}>
            Which questions did the model reverse?
          </h2>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: '#9ca3af' }}>
            Each dot represents one question under one strategy.
            <span style={{ color: info.color, fontWeight: 600 }}> Filled colored dots</span> = model reversed its position.
            <span style={{ color: '#6b7280' }}> Gray dots</span> = model held firm.
            <strong style={{ color: '#f9fafb' }}> Click any dot</strong> to see the actual question and what changed.
          </p>
        </div>
      </div>

      <div style={{ background: '#0d0d18', borderBottom: '1px solid #1f2937' }}>
        <div className="max-w-6xl mx-auto px-6 pb-12">
          {/* Model selector */}
          <div className="flex flex-wrap gap-3 mb-8 pt-6">
            {MODELS.map(m => {
              const mi = modelInfo[m];
              const isActive = m === activeModel;
              const total = STRATEGIES.reduce((acc, s) =>
                acc + (answersData[m][s] || []).filter(r => r.shifted).length, 0);
              return (
                <button
                  key={m}
                  onClick={() => { setActiveModel(m); setSelected(null); }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold border transition-all duration-200"
                  style={{
                    background:  isActive ? mi.color + '22' : 'rgba(255,255,255,0.04)',
                    borderColor: isActive ? mi.color        : '#1f2937',
                    color:       isActive ? mi.color        : '#6b7280',
                    boxShadow:   isActive ? `0 0 20px ${mi.color}33` : 'none',
                  }}
                >
                  <span className="font-mono text-lg font-bold" style={{ color: isActive ? mi.color : '#6b7280' }}>
                    {total}
                  </span>
                  <span>reversals</span>
                  <span style={{ color: isActive ? mi.color + 'aa' : '#9ca3af', fontSize: '0.7rem' }}>— {m}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1f2937' }}>
              <Plot
                data={plotData}
                layout={layout}
                config={{ responsive: true, displayModeBar: false }}
                style={{ width: '100%' }}
                useResizeHandler
                onClick={handleClick}
              />
            </div>

            {/* Detail panel */}
            <div
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${selected ? info.color + '44' : '#1f2937'}`, minHeight: 400 }}
            >
              {!selected ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <p className="font-semibold mb-2" style={{ color: '#e5e7eb' }}>Click a dot to inspect</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                    Select any point to see the full question text and what the model answered before and after.
                  </p>
                </div>
              ) : (
                <>
                  {/* Foundation badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                      style={{ background: FOUNDATION_COLORS[selectedQ.foundation] + '22', color: FOUNDATION_COLORS[selectedQ.foundation] }}
                    >
                      {selectedQ.foundation}
                    </span>
                    <span className="text-xs font-mono" style={{ color: '#6b7280' }}>Question {selectedQ.id} of 15</span>
                  </div>

                  {/* Strategy */}
                  <div
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl mb-4 inline-block w-fit"
                    style={{
                      background: STRATEGY_TYPE[selected.strat] === 'stabilizer' ? '#16a34a22' : '#f8717122',
                      color:      STRATEGY_TYPE[selected.strat] === 'stabilizer' ? '#4ade80'   : '#f87171',
                    }}
                  >
                    {STRATEGY_TYPE[selected.strat] === 'stabilizer' ? 'Stabilizer' : 'Pressure'} · {selected.strat}
                  </div>

                  {/* Question text */}
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#6b7280' }}>Question</p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#d1d5db', whiteSpace: 'pre-line' }}>
                    {selectedQ.text}
                  </p>

                  {/* Before / After */}
                  <div className="space-y-3 mt-auto">
                    <div className="rounded-xl p-3.5" style={{ background: '#1f2937' }}>
                      <p className="text-xs font-bold mb-1" style={{ color: '#6b7280' }}>ORIGINAL ANSWER</p>
                      <p className="font-bold text-base mb-1" style={{ color: '#e5e7eb' }}>Option {selectedAns.base}</p>
                      <p className="text-xs leading-snug" style={{ color: '#9ca3af' }}>
                        {selectedAns.base === 'A' ? selectedQ.answerA : selectedQ.answerB}
                      </p>
                    </div>

                    {selectedAns.shifted ? (
                      <div className="rounded-xl p-3.5" style={{ background: info.color + '18', border: `1px solid ${info.color}44` }}>
                        <p className="text-xs font-bold mb-1" style={{ color: info.color }}>AFTER STRATEGY — REVERSED</p>
                        <p className="font-bold text-base mb-1" style={{ color: info.color }}>Option {selectedAns.prompted}</p>
                        <p className="text-xs leading-snug" style={{ color: '#9ca3af' }}>
                          {selectedAns.prompted === 'A' ? selectedQ.answerA : selectedQ.answerB}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl p-3.5" style={{ background: '#16a34a18', border: '1px solid #16a34a44' }}>
                        <p className="text-xs font-bold mb-1" style={{ color: '#4ade80' }}>AFTER STRATEGY — HELD FIRM</p>
                        <p className="font-bold text-base mb-1" style={{ color: '#4ade80' }}>Option {selectedAns.prompted}</p>
                        <p className="text-xs" style={{ color: '#9ca3af' }}>Same answer as baseline — no reversal.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
