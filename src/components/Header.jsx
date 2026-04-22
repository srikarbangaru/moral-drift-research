export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">Moral Shift Research</span>
        </div>
        <nav className="hidden sm:flex gap-6 text-sm text-gray-500">
          <a href="#explore"  className="hover:text-indigo-600 transition-colors">Explore</a>
          <a href="#compare"  className="hover:text-indigo-600 transition-colors">Compare</a>
          <a href="#findings" className="hover:text-indigo-600 transition-colors">Findings</a>
        </nav>
      </div>
    </header>
  );
}
