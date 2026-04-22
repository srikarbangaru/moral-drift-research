import Ticker from './components/Ticker';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ModelExplorer from './components/ModelExplorer';
import CompareModels from './components/CompareModels';
import StabilizersSection from './components/StabilizersSection';
import DarkDivider from './components/DarkDivider';
import Findings from './components/Findings';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#f5f5f7' }}>
      <Ticker />
      <Header />
      <main>
        <HeroSection />
        <ModelExplorer />
        <CompareModels />
        <StabilizersSection />
        <DarkDivider />
        <Findings />
      </main>
      <Footer />
    </div>
  );
}
