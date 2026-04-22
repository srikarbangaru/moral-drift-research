const ITEMS = [
  '4 AI models tested',
  'DeepSeek shifted on 100% of questions under persuasion',
  'Gemini averaged 56% shift rate across all strategies',
  'Stabilizing strategies still caused shift in every model',
  '15 moral questions · 6 foundations · 5 strategies',
  'Ethical Reminder caused 47% shift in Claude',
  'No single strategy kept the baseline fully intact',
  'ChatGPT most stable: 8% average shift rate',
  'Liberty questions held firm for ChatGPT across all strategies',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden border-b py-2.5"
      style={{ background: '#0a0a0f', borderColor: '#1f2937' }}
    >
      <div className="animate-ticker inline-flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-10 text-xs" style={{ color: '#9ca3af' }}>
            <span className="font-bold mr-2" style={{ color: '#818cf8' }}>//</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
