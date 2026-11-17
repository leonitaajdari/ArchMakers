import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/landing/Hero.jsx';
import MakerTypes from '../components/landing/MakerTypes.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import ForMakers from '../components/landing/ForMakers.jsx';

// The ArchMakers landing page — the only page in Weekend 2.
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <MakerTypes />
        <HowItWorks />
        <ForMakers />
      </main>
      <Footer />
    </>
  );
}
