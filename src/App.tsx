import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './sections/Header';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Journey from './sections/Journey';
import Services from './sections/Services';
import About from './sections/About';
import Courses from './sections/Courses';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Journey />
        <Services />
        <About />
        <Courses />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
