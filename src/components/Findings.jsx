import Plot from '../PlotlyComponent';
import { weightedScores } from '../data/researchData';

const RESULT_CARDS = [
  {
    number: '01',
    title: 'Persuasion was the most effective strategy',
    body: 'Telling a model that many ethicists disagreed with its answer caused the highest reversal rates across all models. DeepSeek reversed all 15 answers under persuasion. Models treat rhetorical pressure as new evidence, even when no facts are added.',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    number: '02',
    title: 'Stabilizing strategies did not reliably stabilize',
    body: 'The Ethical Reminder introduced new normative cues (the UDHR) instead of anchoring prior reasoning. Claude treated this as a trigger for reconsideration rather than reinforcement, reversing 7 of 15 answers.',
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  {
    number: '03',
    title: 'Stability correlates with training philosophy',
    body: 'ChatGPT (8%) and Claude (25%) are safety-aligned, trained to resist over-updating on user pressure. DeepSeek (32%) and Gemini (56%) are more helpfulness-optimized and adapt to every prompt context.',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    number: '04',
    title: 'Some questions are structurally vulnerable',
    body: 'Questions 5, 7, and 11 triggered reversals in 6 of 20 model-strategy pairs. Questions 14 and 15 (Liberty) barely shifted at all. Certain moral dilemmas are inherently more susceptible to reframing than others.',
    color: '#a78bfa',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
  },
];

const IMPLICATIONS = [
  {
    sector: 'Legal and Compliance',
    body: 'AI tools used for legal analysis or compliance review may reach different normative conclusions depending on how a question is phrased. A user with knowledge of these pressure points could reliably shift the model toward a preferred legal interpretation.',
    severity: 'high',
  },
  {
    sector: 'Healthcare and Bioethics',
    body: 'Emotional reframing consistently pushed models toward protective conclusions, which may or may not align with established clinical ethics. Models advising on care prioritization showed high sensitivity to Harm-category framing.',
    severity: 'high',
  },
  {
    sector: 'HR and Workplace Tools',
    body: 'Authority-category questions showed elevated drift toward pro-authority answers under persuasion. AI tools advising on HR disputes or management decisions may be nudged toward favoring institutional authority under subtle framing pressure.',
    severity: 'medium',
  },
  {
    sector: 'Content Moderation',
    body: "DeepSeek's 100% reversal rate under persuasion means a determined user can, through persistence alone, flip every moral position the model holds. This has direct implications for adversarial jailbreaking and policy enforcement.",
    severity: 'high',
  },
  {
    sector: 'Financial Advisory',
    body: 'Fairness-category questions drifted away from counterintuitive correct answers when emotional cues were applied. AI financial tools may be steered toward emotionally resonant but analytically weaker recommendations under reframing.',
    severity: 'medium',
  },
  {
    sector: 'Education and Tutoring',
    body: 'Self-Consistency was the most effective stabilizing strategy for ChatGPT and DeepSeek. AI tutors that encourage students to challenge AI answers may inadvertently trigger more drift, depending on the model.',
    severity: 'low',
  },
];

const WHY_CARDS = [
  {
    label: 'MIRROR',
    title: 'Agreement Bias',
    body: 'Models are rewarded for agreeableness during training. When a user pushes back, the model accommodates rather than reconsidering. The direction of change is driven by social pressure, not logic.',
    color: '#f97316',
  },
  {
    label: 'MEMORY',
    title: 'No Persistent Beliefs',
    body: 'Each response is stateless. Models have no fixed stance they are defending. A differently framed prompt is a different context, and the model reasons freshly from it each time.',
    color: '#60a5fa',
  },
  {
    label: 'CONTEXT',
    title: 'Context-Sensitivity by Design',
    body: 'Adaptability is a feature, not a bug. Role prompts and emotional framing are exactly what these models are built to respond to. The problem is not that they adapt - it is that they adapt even on questions that should have stable answers.',
    color: '#34d399',
  },
];

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
  hovertemplate: '<b>%{y}</b><br>Weighted score: <b>%{x}</b><extra></extra>',
}];

const scoreLayout = {
  paper_bgcolor: 'transparent',
  plot_bgcolor:  'transparent',
  font: { family: 'Inter, sans-serif', size: 12, color: '#9ca3af' },
  xaxis: {
    range: [17.5, 19.0],
    tickfont: { size: 10, family: 'JetBrains Mono', color: '#9ca3af' },
    gridcolor: '#1f2937',
    linecolor: 'transparent',
    zerolinecolor: 'transparent',
    fixedrange: true,
  },
  yaxis: {
    tickfont: { size: 12, color: '#e5e7eb' },
    linecolor: 'transparent',
    gridcolor: 'transparent',
    automargin: true,
    fixedrange: true,
  },
  margin: { l: 20, r: 70, t: 10, b: 30 },
  height: 240,
  bargap: 0.4,
  hoverlabel: { bgcolor: '#1f2937', bordercolor: '#374151', font: { color: '#f9fafb', size: 12 } },
  shapes: [{ type: 'line', x0: 18.52, x1: 18.52, y0: -0.5, y1: 5.5, line: { color: '#6366f1', width: 1.5, dash: 'dot' } }],
  annotations: [{ x: 18.52, y: 5.5, text: 'Baseline', showarrow: false, font: { size: 10, color: '#6366f1' }, xanchor: 'left', xshift: 6 }],
};

export default function Findings() {
  return (
    <section id="findings" style={{ background: '#0d0d18' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── Key Results ── */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>Analysis</p>
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#f9fafb' }}>Key results</h2>
          <p className="text-sm max-w-2xl" style={{ color: '#9ca3af' }}>
            300 trials across 4 models, 15 questions, and 5 strategies. Four patterns held consistently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {RESULT_CARDS.map(f => (
            <div key={f.number} className="rounded-2xl border p-5" style={{ background: f.bg, borderColor: f.border }}>
              <p className="text-3xl font-bold mb-2 font-mono" style={{ color: f.color + '80' }}>{f.number}</p>
              <p className="text-sm font-semibold mb-2" style={{ color: '#f9fafb' }}>{f.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{f.body}</p>
            </div>
          ))}
        </div>

        {/* ── Industry Implications ── */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>Real-world implications</p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#f9fafb' }}>What this means for deployed AI</h3>
          <p className="text-sm mb-6 max-w-2xl" style={{ color: '#9ca3af' }}>
            AI systems in high-stakes advisory roles may give different moral or normative guidance depending on how a question is phrased, not just what is asked.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPLICATIONS.map(im => (
              <div
                key={im.sector}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${
                    im.severity === 'high'   ? 'rgba(248,113,113,0.3)' :
                    im.severity === 'medium' ? 'rgba(251,191,36,0.2)'  :
                                              'rgba(74,222,128,0.2)'
                  }`,
                }}
              >
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded inline-block mb-3"
                  style={{
                    background: im.severity === 'high'   ? 'rgba(248,113,113,0.15)' :
                                im.severity === 'medium' ? 'rgba(251,191,36,0.15)'  :
                                                          'rgba(74,222,128,0.15)',
                    color:      im.severity === 'high'   ? '#f87171' :
                                im.severity === 'medium' ? '#fbbf24' : '#4ade80',
                  }}
                >
                  {im.severity.toUpperCase()} RISK
                </span>
                <p className="text-sm font-semibold mb-2" style={{ color: '#f9fafb' }}>{im.sector}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{im.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why models shift ── */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>Mechanisms</p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#f9fafb' }}>Why models shift</h3>
          <p className="text-sm mb-6" style={{ color: '#9ca3af' }}>
            Low shift does not mean trustworthy. The key question is whether a model changed due to better reasoning or social pressure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHY_CARDS.map(c => (
              <div key={c.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.color}33` }}>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3" style={{ background: c.color + '20', color: c.color }}>
                  {c.label}
                </span>
                <p className="text-sm font-semibold mb-2" style={{ color: '#f9fafb' }}>{c.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Drift Direction ── */}
        <div className="rounded-2xl p-6 mb-14" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.08) 100%)', border: '1px solid rgba(99,102,241,0.3)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#818cf8' }}>Drift direction</p>
          <h3 className="text-lg font-bold mb-2" style={{ color: '#f9fafb' }}>When models reverse, they overwhelmingly switch from B to A</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#9ca3af' }}>
            Reversal direction is not random. Claude switched from B to A in 100% of its reversals and never went A to B under any strategy.
            ChatGPT showed the same bias in 75% of its reversals. DeepSeek and Gemini drifted both ways but still leaned B to A in roughly 65% of cases.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { model: 'ChatGPT', pct: '75', color: '#d1d5db' },
              { model: 'Claude',   pct: '100', color: '#f97316' },
              { model: 'DeepSeek', pct: '65',  color: '#4d6bfe' },
              { model: 'Gemini',   pct: '65',  color: '#34a853' },
            ].map(m => (
              <div key={m.model} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${m.color}33` }}>
                <p className="text-2xl font-bold font-mono mb-0.5" style={{ color: m.color }}>{m.pct}%</p>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#e5e7eb' }}>{m.model}</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>of reversals B to A</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Score chart ── */}
        <div className="rounded-2xl border border-[#1f2937] p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#6366f1' }}>ChatGPT weighted score</p>
          <h3 className="text-base font-semibold mb-1" style={{ color: '#f9fafb' }}>Every strategy lowered the moral consistency score</h3>
          <p className="text-xs mb-3" style={{ color: '#6b7280' }}>
            Score out of 22.28. Dotted line is the baseline. No strategy produced an upward shift.
          </p>
          <div className="flex gap-4 text-xs mb-3 flex-wrap" style={{ color: '#9ca3af' }}>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" /> Baseline</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" /> Shifter</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" /> Stabilizer</span>
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
