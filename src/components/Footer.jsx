export default function Footer() {
  const team = [
    'Srikar Bangaru',
    'Shriya Ramaka',
    'Pranav Goteti',
    'Lara Mahajan',
    'Pallavi Mamillapalli',
    'Shreeja Tangutur',
  ];

  return (
    <footer style={{ background: '#09090f', borderTop: '1px solid #1f2937' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <p className="text-sm font-semibold" style={{ color: '#e5e7eb' }}>Moral Shift in AI Reasoning</p>
            </div>
            <p className="text-xs mb-1" style={{ color: '#6b7280' }}>AI & Humanity · CS 4501 · 2026</p>
            <p className="text-xs" style={{ color: '#6b7280' }}>ChatGPT · Claude · DeepSeek · Gemini</p>
          </div>

          {/* Right: team */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6366f1' }}>
              The Amber Team
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {team.map(name => (
                <li key={name} className="text-sm font-medium" style={{ color: '#9ca3af' }}>{name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 text-center" style={{ borderColor: '#1f2937' }}>
          <p className="text-xs" style={{ color: '#6b7280' }}>© 2026 The Amber Team · University of Virginia</p>
        </div>
      </div>
    </footer>
  );
}
