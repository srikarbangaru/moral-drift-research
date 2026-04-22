export default function DarkDivider() {
  const stats = [
    { value: '100%', label: 'DeepSeek shift rate under persuasion', color: '#f87171' },
    { value: '47%',  label: 'Claude shifted when given an ethical reminder', color: '#fbbf24' },
    { value: '0',    label: 'strategies that fully preserved the baseline', color: '#a5b4fc' },
    { value: '56%',  label: 'Gemini average shift across all 5 strategies', color: '#c4b5fd' },
  ];

  return (
    <div
      className="relative overflow-hidden py-14"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-8" style={{ color: '#4b5563' }}>
          Key numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold mb-2" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
