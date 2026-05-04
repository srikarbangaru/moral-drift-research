import Plot from '../PlotlyComponent';
import { weightedScores } from '../data/researchData';

const FINDING_CARDS = [
  {
    number: '01',
    title: 'Persuasion was the most effective strategy overall',
    body: 'Informing the model that experts disagreed with its answer produced the highest reversal rate across models. DeepSeek reversed all 15 answers under persuasion. ChatGPT reversed 4. No model was unaffected.',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    number: '02',
    title: 'The stabilizing strategies did not reliably stabilize',
    body: 'The Ethical Reminder caused Claude to reverse 7 of 15 answers, more than persuasion did for the same model. Both stabilizing strategies produced reversal rates above 50% for Gemini. Strategy type did not predict outcome.',
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  {
    number: '03',
    title: 'Liberty questions showed the most resistance to pressure',
    body: 'Questions covering personal freedom and autonomy produced 0 reversals for ChatGPT across all five strategies. This was the only moral foundation where consistent stability was observed.',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    number: '04',
    title: 'Reversals came with confident, well-reasoned justifications',
    body: 'When a model changed its answer, it did not hedge or qualify its response. It provided a full rationale for the new position using the same confident tone as the original answer. The reasoning appeared to follow the answer, not lead it.',
    color: '#a78bfa',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
  },
];

// Fixed scale that shows differences clearly without a slider
const sorted = [...weightedScores].sort((a, b) => b.value - a.value);

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
  text: sorted.map(s => s.value.toFixed(2)),
  textposition: 'outside',
  textfont: { size: 11, family: 'JetBrains Mono', color: '#9ca3af' },
  cliponaxis: false,
  hovertemplate: '<b>%{y}</b><br>Moral score: <b>%{x} / 22.28</b><extra></extra>',
}];

const scoreLayout = {
  paper_bgcolor: 'transparent',
  plot_bgcolor:  'transparent',
  font: { family: 'Inter, sans-serif', size: 12, color: '#6b7280' },
  xaxis: {
    range: [17.5, 19.0],
    tickfont: { size: 10, family: 'JetBrains Mono', color: '#9ca3af' },
    gridcolor: '#1f2937',
    linecolor: 'transparent',
    zerolinecolor: 'transparent',
    fixedrange: true,
    title: { text: 'Weighted moral consistency score (out of 22.28)', font: { size: 11, color: '#9ca3af' } },
  },
  yaxis: {
    tickfont: { size: 12, color: '#e5e7eb' },
    linecolor: 'transparent',
    gridcolor: 'transparent',
    automargin: true,
    fixedrange: true,
  },
  margin: { l: 20, r: 70, t: 10, b: 50 },
  height: 260,
  bargap: 0.4,
  hoverlabel: { bgcolor: '#1f2937', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
  shapes: [{ type: 'line', x0: 18.52, x1: 18.52, y0: -0.5, y1: 5.5, line: { color: '#6366f1', width: 1.5, dash: 'dot' } }],
  annotations: [{ x: 18.52, y: 5.5, text: 'Baseline', showarrow: false, font: { size: 10, color: '#6366f1' }, xanchor: 'left', xshift: 6 }],
};

export default function Findings() {
  return (
    <section id="findings" style={{ background: "#0d0d18", borderTop: "1px solid #1f2937", borderBottom: "1px solid #1f2937" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="pt-10 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>Key findings</p>
        <h2 className="text-2xl font-bold text-[#f9fafb]">Key results</h2>
        <p className="text-sm mt-1" style={{ color: '#9ca3af' }}>
          Four patterns observed consistently across models and strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {FINDING_CARDS.map(f => (
          <div key={f.number} className="rounded-2xl border p-5" style={{ background: f.bg, borderColor: f.border }}>
            <p className="text-3xl font-bold mb-2 font-mono" style={{ color: f.color + '80' }}>{f.number}</p>
            <p className="text-sm font-semibold mb-2" style={{ color: '#f9fafb' }}>{f.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{f.body}</p>
          </div>
        ))}
      </div>

      {/* Score impact chart */}
      <div className="rounded-2xl border border-[#1f2937] bg-[rgba(255,255,255,0.03)] p-5">
        <h3 className="text-base font-semibold text-[#f9fafb] mb-1">
          ChatGPT weighted moral consistency score by strategy
        </h3>
        <p className="text-sm mb-3" style={{ color: '#9ca3af' }}>
          Dotted line is the baseline score. Every strategy reduced it.
        </p>
        <div className="flex gap-4 text-xs mb-4 flex-wrap" style={{ color: '#9ca3af' }}>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-500 inline-block" /> Baseline (original score)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400 inline-block" /> Pressure strategies</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-400 inline-block" /> Stabilizing strategies</span>
        </div>

        <Plot
          data={scoreData}
          layout={scoreLayout}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%' }}
          useResizeHandler
        />
      </div>
    </div>
    </section>
  );
}
