import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ModelExplorer from './components/ModelExplorer';
import CompareModels from './components/CompareModels';
import Findings from './components/Findings';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <HeroSection />
        <ModelExplorer />
        <CompareModels />
        <Findings />
      </main>
      <Footer />
    </div>
  );
}
