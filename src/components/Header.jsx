export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">Moral Drift Research</span>
        <nav className="hidden sm:flex gap-6 text-sm text-gray-500">
          <a href="#explore"  className="hover:text-gray-900 transition-colors">Explore</a>
          <a href="#compare"  className="hover:text-gray-900 transition-colors">Compare</a>
          <a href="#findings" className="hover:text-gray-900 transition-colors">Findings</a>
        </nav>
      </div>
    </header>
  );
}
