import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import FlipbookHero from './components/FlipbookHero';
import LoadingScreen from './components/LoadingScreen';
import ComprehensiveServices from './components/ComprehensiveServices';
import PrivacyBanner from './components/PrivacyBanner';
import { useImagePreloader } from './hooks/useImagePreloader';

function App() {
  const { images, progress, isComplete } = useImagePreloader();
  const isLoading = !isComplete;

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen progress={progress} />}
      
      <div className={`bg-dom text-white transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navbar Overlay - Hidden for Fold 1 */}
        {/* <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
          <div className="font-bold text-2xl tracking-tight pointer-events-auto">Get&nbsp;Well Clinic</div>
          <div className="hidden md:flex gap-8 font-medium pointer-events-auto">
            <a href="#hero" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="#services" className="hover:text-gray-300 transition-colors">Services</a>
          </div>
        </nav> */}

        <div id="hero">
          <FlipbookHero isLoading={isLoading} images={images} />
        </div>

        <ComprehensiveServices />
        
        <section className="min-h-screen bg-black flex flex-col items-center justify-center pb-24 px-6 md:px-0 relative z-20">
           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Visit Us Today</h2>
           <p className="text-lg md:text-xl mb-8 font-medium text-gray-300 text-center max-w-2xl">D-696, Opposite Market No. 2, Chittaranjan Park, New Delhi, 110019</p>
           <a href="tel:+91" className="inline-block bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform">
             Call Now
           </a>
        </section>
        
        <PrivacyBanner />
      </div>
    </>
  );
}

export default App;
