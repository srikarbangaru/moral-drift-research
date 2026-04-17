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
    <footer className="border-t border-gray-200 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {/* Left: project info */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Moral Drift in AI Reasoning</p>
            <p className="text-xs text-gray-400">AI & Humanity· 2026</p>
            <p className="text-xs text-gray-400 mt-1">ChatGPT · Claude · DeepSeek · Gemini</p>
          </div>

          {/* Right: team */}
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">The Amber Team</p>
            <ul className="space-y-1">
              {team.map(name => (
                <li key={name} className="text-sm text-gray-600 font-medium">{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
