import { useState, useMemo } from 'react';
import Plot from '../PlotlyComponent';
import { weightedScores } from '../data/researchData';

const FINDING_CARDS = [
  {
    emoji: '🎯',
    title: 'Persuasion is the most powerful lever',
    body: 'Direct rhetorical pressure ("Are you sure? Many ethicists disagree") was the most effective strategy. DeepSeek changed its answer on 100% of questions under persuasion alone.',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    emoji: '⚠️',
    title: "Stabilizers didn't stabilize",
    body: 'Ethical reminders and self-consistency prompts were designed to keep models grounded. Instead, they caused shift in every model - some by as much as 47% of questions.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    emoji: '🛡️',
    title: 'Liberty questions held firm',
    body: 'Questions about personal freedom and coercion showed 0% shift for ChatGPT across all five strategies. It was the only moral foundation that stayed completely stable.',
    color: '#10b981',
    bg: '#f0fdf4',
  },
  {
    emoji: '💔',
    title: 'Harm questions shifted every single time',
    body: 'For ChatGPT, all three Harm questions changed from B to A under every single strategy tested - persuasion, role prompting, emotional framing, ethical reminder, AND self-consistency. No strategy protected this dimension.',
    color: '#ef4444',
    bg: '#fef2f2',
  },
];

const MIN_SCORE = 17.0;

export default function Findings() {
  const [zoom, setZoom] = useState(30);

  const xStart = useMemo(() => 17.0 + (zoom / 100) * 1.4, [zoom]);

  const sorted = useMemo(() =>
    [...weightedScores].sort((a, b) => b.value - a.value), []);

  const scoreData = [{
    type: 'bar',
    orientation: 'h',
    x: sorted.map(s => s.value),
    y: sorted.map(s => s.label),
    marker: {
      color: sorted.map(s =>
        s.type === 'baseline'   ? '#6366f1' :
        s.type === 'stabilizer' ? '#4ade80' :
        '#f87171'
      ),
    },
    text: sorted.map(s => `${s.value}`),
    textposition: 'outside',
    textfont: { size: 11, family: 'JetBrains Mono', color: '#9ca3af' },
    cliponaxis: false,
    hovertemplate: '<b>%{y}</b><br>Score: <b>%{x} / 22.28</b><extra></extra>',
  }];

  const scoreLayout = useMemo(() => ({
    paper_bgcolor: 'transparent',
    plot_bgcolor:  'transparent',
    font: { family: 'Inter, sans-serif', size: 12, color: '#6b7280' },
    xaxis: {
      range: [xStart, 19.1],
      tickfont: { size: 10, family: 'JetBrains Mono', color: '#9ca3af' },
      gridcolor: '#f3f4f6',
      linecolor: 'transparent',
      zerolinecolor: 'transparent',
      fixedrange: true,
    },
    yaxis: {
      tickfont: { size: 12, color: '#374151' },
      linecolor: 'transparent',
      gridcolor: 'transparent',
      automargin: true,
      fixedrange: true,
    },
    margin: { l: 20, r: 60, t: 10, b: 30 },
    height: 260,
    bargap: 0.4,
    transition: { duration: 400, easing: 'cubic-in-out' },
    hoverlabel: { bgcolor: '#1f2937', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
    shapes: [{ type: 'line', x0: 18.52, x1: 18.52, y0: -0.5, y1: 5.5, line: { color: '#6366f1', width: 1.5, dash: 'dot' } }],
    annotations: [{ x: 18.52, y: 5.5, text: 'Baseline 18.52', showarrow: false, font: { size: 10, color: '#6366f1' }, xanchor: 'left', xshift: 6 }],
  }), [xStart]);

  const zoomLabel =
    zoom < 25 ? 'Zoomed out - differences look small' :
    zoom < 60 ? 'Medium zoom - gaps becoming visible' :
    'Zoomed in - small differences are now clear';

  return (
    <section id="findings" className="max-w-5xl mx-auto px-6 py-10">
      <div className="border-t border-gray-200 pt-10 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Key findings</p>
        <h2 className="text-2xl font-bold text-gray-900">What we learned</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {FINDING_CARDS.map(f => (
          <div key={f.title} className="rounded-2xl border p-5" style={{ background: f.bg, borderColor: f.color + '30' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{f.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{f.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Did any strategy keep ChatGPT's moral score intact?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Every bar falls below the baseline. Zoom in to see how much each strategy lowered the score.
        </p>
        <div className="flex gap-4 text-xs text-gray-400 mb-4 flex-wrap">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-500 inline-block" /> Baseline</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400 inline-block" /> Drift-inducing</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-400 inline-block" /> Stabilizing</span>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3 mb-4">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <label className="text-sm font-semibold text-gray-700">Chart Zoom</label>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">{zoomLabel}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-400 whitespace-nowrap">Zoomed out</span>
            <input
              type="range" min={0} max={100} step={5} value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: '#6366f1', background: `linear-gradient(to right, #6366f1 ${zoom}%, #e5e7eb ${zoom}%)` }}
            />
            <span className="text-xs font-mono text-gray-400 whitespace-nowrap">Zoomed in</span>
          </div>
        </div>

        <Plot data={scoreData} layout={scoreLayout} config={{ responsive: true, displayModeBar: false }} style={{ width: '100%' }} useResizeHandler />
        <p className="text-xs text-gray-400 mt-2 text-center font-mono">x-axis starts at {xStart.toFixed(2)} · Baseline is 18.52 / 22.28</p>
      </div>
    </section>
  );
}
