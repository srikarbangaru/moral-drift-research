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
    <footer className="border-t border-gray-100 mt-10" style={{ background: '#f9fafb' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                <span className="text-white text-[10px] font-bold">M</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Moral Shift in AI Reasoning</p>
            </div>
            <p className="text-xs text-gray-400">AI & Humanity · 2026</p>
            <p className="text-xs text-gray-400 mt-1">ChatGPT · Claude · DeepSeek · Gemini</p>
            <p className="text-xs text-gray-300 mt-4">Built with React, Vite &amp; Plotly.js</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">The Amber Team</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {team.map(name => (
                <li key={name} className="text-sm text-gray-600 font-medium">{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-8 text-center">© 2026 The Amber Team</p>
      </div>
    </footer>
  );
}
