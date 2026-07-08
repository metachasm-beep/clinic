import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { useScrollSequence } from '../hooks/useScrollSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import BlurText from './BlurText';
import ShinyText from './ShinyText';

// React-Bits Components
import TextPressure from './react-bits/TextPressure';
import SpotlightCard from './react-bits/SpotlightCard';
import ReactBitsSplitText from './react-bits/SplitText';
import DecryptedText from './react-bits/DecryptedText';
import FuzzyText from './react-bits/FuzzyText';
import Magnet from './react-bits/Magnet';
import ContactModal from './ContactModal';
import ServicesModal from './ServicesModal';
import StarBorder from './react-bits/StarBorder';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import reviewsData from '../data/reviews.json';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FlipbookHero({ isLoading, images }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fold1Ref = useRef(null);
  const fold2Ref = useRef(null);
  
  // Refs for Fold 1 Text Animation
  const fold1TitleRef = useRef(null);
  const fold1PanelRef = useRef(null);
  const fold1IconRef = useRef(null);
  const fold1Card1Ref = useRef(null);
  const fold1Card2Ref = useRef(null);

  // Refs for Fold 2 Text Animation
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const actionRef = useRef(null);
  const fold2Box1Ref = useRef(null);

  // Refs for Fold 3 Text Animation
  const fold3Ref = useRef(null);
  const fold3TitleRef = useRef(null);
  const fold3DescRef = useRef(null);
  const fold3ActionRef = useRef(null);
  const fold3Box1Ref = useRef(null);
  const fold3Box2Ref = useRef(null);

  // Refs for Fold 4 Text Animation
  const fold4Ref = useRef(null);
  const fold4TitleRef = useRef(null);
  const fold4DescRef = useRef(null);
  const fold4ActionRef = useRef(null);
  const fold4Box1Ref = useRef(null);
  const fold4Box2Ref = useRef(null);

  // Refs for Fold 5 Text Animation
  const fold5Ref = useRef(null);
  const fold5TitleRef = useRef(null);
  const fold5DescRef = useRef(null);
  const fold5ActionRef = useRef(null);
  const fold5Box1Ref = useRef(null);
  const fold5Box2Ref = useRef(null);

  // Refs for Fold 6 Text Animation
  const fold6Ref = useRef(null);
  const fold6TitleRef = useRef(null);
  const fold6DescRef = useRef(null);
  const fold6ActionRef = useRef(null);
  const fold6Box1Ref = useRef(null);
  const fold6Box2Ref = useRef(null);

  // Refs for Fold 7 Text Animation
  const fold7Ref = useRef(null);
  const fold7TitleRef = useRef(null);
  const fold7DescRef = useRef(null);
  const fold7ActionRef = useRef(null);
  const fold7Box1Ref = useRef(null);
  const fold7Box2Ref = useRef(null);

  // Refs for Fold 8 Text Animation (Reviews)
  const fold8Ref = useRef(null);
  const fold8TitleRef = useRef(null);
  const fold8Box1Ref = useRef(null);

  // Refs for Fold 9 Text Animation (Facilities)
  const fold9Ref = useRef(null);
  const fold9TitleRef = useRef(null);
  const fold9Box1Ref = useRef(null);

  // Refs for Fold 10 Text Animation (Patient Knowledge Hub)
  const fold10Ref = useRef(null);
  const fold10TitleRef = useRef(null);
  const fold10Box1Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFolds, setExpandedFolds] = useState({});
      const scrollToFoldIndex = (foldIndex) => {
    if (containerRef.current) {
      const startY = containerRef.current.offsetTop;
      const isMobile = window.innerWidth < 768;
      
      const totalScrollDistance = (isMobile ? 45 : 30) * window.innerHeight;
      
      let progress = 0;
      if (isMobile) {
        progress = ((foldIndex * 2) + 0.5) / 22;
      } else {
         progress = (((foldIndex - 1) * 3) + 2.5) / 30;
      }
      
      const targetY = startY + (progress * totalScrollDistance);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Fold 1 Entrance Animation
  useEffect(() => {
    if (!isLoading && fold1TitleRef.current) {
      const splitTitle = new SplitText(fold1TitleRef.current, { type: 'words,chars' });
      
      // Mask setup: wrapper words hide overflow
      gsap.set(splitTitle.words, { overflow: 'hidden' });
      
      // Clear Option 5 panel styles
      gsap.set(fold1PanelRef.current, { clearProps: "all" });

      // Initially, title characters are invisible, icon is scaled down
      gsap.set(splitTitle.chars, { autoAlpha: 0 });
      gsap.set(fold1IconRef.current, { scale: 0, autoAlpha: 0, rotation: -90 });
      
      const tl = gsap.timeline({ delay: 1.0 }); // Wait for 1000ms transition-opacity
      
      // 1. Icon snaps in
      tl.to(fold1IconRef.current, {
        duration: 0.6,
        scale: 1,
        autoAlpha: 1,
        rotation: 0,
        ease: "back.out(1.5)"
      })
      // 2. Title chars type out (no bounce)
      .to(splitTitle.chars, {
        duration: 0.1,
        autoAlpha: 1,
        stagger: 0.05,
        ease: "none"
      }, "-=0.2");
    }
  }, [isLoading]);

  const { bgFold, textFold } = useScrollSequence({ images, canvasRef, containerRef, scrollIndicatorRef });
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-dom overflow-hidden z-10 flex items-center justify-between px-8 md:px-24">

      {/* Global Fixed Header */}
      <div className="fixed top-0 left-0 w-full p-4 md:px-8 z-[60] flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
         <div className="pointer-events-auto">
             {/* Replace with actual logo if needed */}
         </div>
         <div className="flex gap-4 items-center pointer-events-auto">
            <button onClick={() => setContactModalOpen(true)} className="bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] px-5 py-2 md:py-2.5 rounded-sm font-bold text-xs md:text-sm transition-all">
               Contact Us
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] w-10 h-10 md:w-11 md:h-11 rounded-sm flex flex-col justify-center items-center transition-all gap-1">
               <span className="w-4 h-[2px] bg-[oklch(4%_0.004_95)] rounded-[1px]"></span>
               <span className="w-4 h-[2px] bg-[oklch(4%_0.004_95)] rounded-[1px]"></span>
               <span className="w-4 h-[2px] bg-[oklch(4%_0.004_95)] rounded-[1px]"></span>
            </button>
         </div>
      </div>

      {/* Accordion Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[70] transition-all duration-500 flex flex-col pt-24 px-6 md:px-24 overflow-y-auto ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}>
         <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
         </button>
         
         <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pb-20">
            <h3 className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] font-bold mb-4">Navigate to Chapter</h3>
            {[
               { id: 1, title: "Welcome to Get Well Clinic" },
               { id: 2, title: "Dr. Ankur Gupta" },
               { id: 3, title: "Acupuncture Therapy" },
               { id: 4, title: "Preventive Healthcare" },
               { id: 5, title: "Advanced ENT Care" },
               { id: 6, title: "The Legacy of Care" },
               { id: 7, title: "Chronic Care Management" },
               { id: 8, title: "Patient Reviews" },
               { id: 9, title: "Clinic Facilities" },
               { id: 10, title: "Patient Knowledge Hub" }
            ].map(f => (
               <button 
                 key={f.id} 
                 onClick={() => scrollToFoldIndex(f.id)} 
                 className="text-white text-2xl md:text-4xl font-light hover:text-[#D4AF37] transition-colors text-left flex items-center gap-4 group"
               >
                 <span className="text-sm text-white/30 w-8 group-hover:text-[#D4AF37]/50">{f.id.toString().padStart(2, '0')}</span>
                 {f.title}
               </button>
            ))}
         </div>
      </div>

      <div className={`absolute inset-0 z-[5] bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent pointer-events-none md:hidden transition-opacity duration-700 ease-in-out ${textFold > 0 ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Wayfinding Dots (Mobile Only) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[40] flex-col gap-3 md:hidden flex">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(f => (
          <button 
            key={f} 
            onClick={() => scrollToFoldIndex(f)}
            data-fold={f}
            className={`mobile-nav-dot w-1.5 h-1.5 rounded-full transition-all duration-300 ${f === 1 ? 'bg-white scale-150 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`}
          />
        ))}
      </div>
      
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-all duration-700 ease-out" 
        
      />

      {/* Fold 0: Mobile Hero Header */}
      <div className={`mobile-hero-overlay md:hidden absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 translate-y-4 will-change-[transform,opacity] `}>
        <div className="pointer-events-auto w-full px-4 text-center flex flex-col items-center">
            <h1
                className="m-0 text-center drop-shadow-2xl"
                style={{
                  color: "oklch(91% 0 0)", // champagne
                  fontFamily: "'Alumni Sans', sans-serif",
                  fontSize: "clamp(5rem, 18vw, 8rem)",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase"
                }}
            >
              <ReactBitsSplitText text="Get Well Clinic" splitType="chars" delay={40} />
            </h1>
        </div>
      </div>
      
      {/* Fold 1 Overlays */}
      <div ref={fold1Ref} className={`absolute inset-0 z-10 w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 max-md:items-center transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Panel */}
        <div className="flex flex-col justify-start pt-[5vh] md:pt-[15vh] pointer-events-auto h-full space-y-4 md:space-y-[4vh]">
          
          <div ref={fold1PanelRef} className="max-w-3xl backdrop-blur-md w-full max-md:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full justify-center sm:justify-start">
              <div ref={fold1IconRef} className="w-12 h-12 bg-[#D4AF37] shrink-0 hidden sm:block"></div>
              <h1
                ref={fold1TitleRef}
                className="m-0 text-center sm:text-left w-full sm:w-auto"
                style={{
                  color: "oklch(91% 0 0)", // champagne
                  fontFamily: "'Alumni Sans', sans-serif",
                  fontSize: "clamp(2.5rem, 7.5vw, 6.8rem)",
                  fontWeight: 400, // wordmark weight
                  lineHeight: 1.02,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase"
                }}
              >
                Get Well Clinic
              </h1>
            </div>
          </div>

          {/* Location & Booking Info */}
          <div ref={fold1Card1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-md relative max-h-[85vh] overflow-y-auto scrollbar-hide group text-left flex flex-col items-start">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/80 to-transparent"></div>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
              <ShinyText 
                text="D-696, Opp. Market No. 2, C.R. Park"
                speed={3} 
                className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]" 
                color="#D4AF37"
                shineColor="#ffffff"
              />
            </div>

            <BlurText
              text="Visit Get Well Clinic"
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-2xl md:text-3xl font-light text-[oklch(91%_0_0)]  leading-tight mb-4 tracking-tight"
            />
            
            <BlurText
              text="Your premier destination for healthcare in South Delhi. Call ahead to book an appointment with our specialists and avoid long queues."
              delay={50}
              animateBy="words"
              direction="top"
              className="text-[oklch(88%_0_0)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-sm font-normal leading-relaxed mb-6"
            />

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="https://maps.google.com/?q=D-696,+Opp.+Market+No.+2,+C.R.+Park,+New+Delhi,+110019" target="_blank" rel="noreferrer" className="px-6 py-4 min-h-[48px] min-w-[48px] bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-semibold rounded-[2px] transition-colors text-xs tracking-wide text-center">
                Get Directions
              </a>
              <button onClick={() => setContactModalOpen(true)} className="text-[#D4AF37] text-xs font-medium hover:text-[#F3E5AB] transition-colors border-b border-[#D4AF37]/30 hover:border-[#F3E5AB] pb-1 cursor-pointer">
                Contact Desk
              </button>
            </div>
          </div>
          
        </div>

        {/* Center Panel */}
        <div className="hidden lg:block h-full"></div>

        {/* Right Panel */}
        <div className="flex flex-col justify-start pt-8 md:pt-[45vh] items-end pointer-events-auto h-full">
          <div ref={fold1Card2Ref} className="max-w-sm text-right bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform">
            <ShinyText 
              text="Book Your Consultation"
              disabled={false} 
              speed={3} 
              className="text-xl font-semibold uppercase tracking-widest mb-4 text-[oklch(91%_0_0)] " 
              color="oklch(91% 0 0)"
              shineColor="#D4AF37"
            />
            <p className="text-[oklch(88%_0_0)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 mb-6 font-normal text-sm leading-relaxed">
              Schedule an appointment with our expert general physicians or experience holistic acupuncture therapy.
            </p>
            <button onClick={() => setServicesModalOpen(true)} className="inline-block bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-bold rounded-[2px] py-4 px-8 min-h-[48px] min-w-[48px] transition-colors text-xs md:text-sm tracking-wide cursor-pointer">
              Discover Services
            </button>
          </div>
        </div>

      </div>

      {/* Fold 2 Overlays (Dr. Ankur Gupta) */}
      <div ref={fold2Ref} className={`absolute inset-0 z-20 w-full h-full flex items-center justify-center px-4 max-md:items-center md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold2Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[90vw] md:max-w-4xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-acc to-transparent"></div>
          
          <div className="w-full md:w-1/2 flex flex-col text-left">
            <div className="flex items-center space-x-4 mb-6">
              <span className="w-8 h-[1px] bg-acc/40"></span>
              <ShinyText 
                text="Master Practitioner"
                speed={3} 
                className="text-xs font-medium uppercase tracking-[0.2em] text-acc" 
                color="#00E5FF"
                shineColor="#ffffff"
              />
            </div>

            <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-light text-[oklch(88%_0_0)] leading-tight mb-2 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
              {textFold === 2 ? <BlurText text="Dr. Ankur Gupta" delay={50} /> : "Dr. Ankur Gupta"}
            </h2>
            <p className="text-acc/80 text-sm md:text-base font-medium tracking-wide uppercase mb-8">Senior ENT Specialist & General Physician</p>

            <div className="pl-6 border-l-2 border-acc/30 mb-8 relative">
              <div className="absolute -left-[2px] top-0 h-1/3 w-[2px] bg-acc"></div>
              <p ref={descRef} className="text-[oklch(88%_0_0)]/90 text-lg md:text-xl font-light leading-relaxed italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200">
                "Healing begins with precision and compassion. Proactive health monitoring is the cornerstone of a vibrant life."
              </p>
            </div>
            
            <div ref={actionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 hidden md:flex">
              <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-semibold rounded-[2px] transition-colors text-xs md:text-sm tracking-wide text-center">
                Schedule Appointment
              </button>
              <button onClick={() => setServicesModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
                Read Full Profile
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-4 md:pl-8 md:border-l border-white/10">
            <div className="bg-[oklch(15%_0.008_95)] p-6 rounded-[2px] border border-[oklch(78%_0_0/0.16)] hover:border-[oklch(70%_0.12_188)] transition-colors">
              <h4 className="text-acc text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acc"></span> 15+ Years Clinical Excellence
              </h4>
              <p className="text-[oklch(88%_0_0)]/70 text-sm font-light leading-relaxed">Delivering expert general medical care and specializing in proactive health screening for the modern patient.</p>
            </div>
            <div className="bg-[oklch(15%_0.008_95)] p-6 rounded-[2px] border border-[oklch(78%_0_0/0.16)] hover:border-[oklch(70%_0.12_188)] transition-colors">
              <h4 className="text-acc text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acc"></span> Advanced ENT Care
              </h4>
              <p className="text-[oklch(88%_0_0)]/70 text-sm font-light leading-relaxed">Fellowship trained in advanced endoscopic surgery, acute infections, and complex fever management.</p>
            </div>
            <div className="bg-[oklch(15%_0.008_95)] p-6 rounded-[2px] border border-[oklch(78%_0_0/0.16)] hover:border-[oklch(70%_0.12_188)] transition-colors">
              <h4 className="text-acc text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acc"></span> Core Philosophy
              </h4>
              <p className="text-[oklch(88%_0_0)]/70 text-sm font-light leading-relaxed">Emphasizing preventative healthcare to keep you at your best, catching potential issues before they escalate.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 md:hidden">
              <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-semibold rounded-[2px] transition-colors text-xs md:text-sm tracking-wide text-center">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fold 3 Overlay (Acupuncture Therapy) */}
      <div ref={fold3Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Title and CTAs */}
        <div ref={fold3Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group">
          {/* Kinpaku Gold Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
            <ShinyText 
              text="Holistic Treatment"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]" 
              color="#D4AF37"
              shineColor="#ffffff"
            />
          </div>

          <h2 ref={fold3TitleRef} className="text-2xl md:text-5xl font-light text-[oklch(88%_0_0)] leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
            {textFold === 3 ? <DecryptedText text="Acupuncture Therapy" animateOn="view" speed={80} /> : "Acupuncture Therapy"}
          </h2>
          
          <div ref={fold3ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[#D4AF37] text-[#04090F] font-semibold rounded-sm transition-colors hover:bg-[#F3E5AB] border-none text-xs md:text-sm tracking-wide text-center">
              Consult Specialist
            </button>
            <button onClick={() => setServicesModalOpen(true)} className="text-[#D4AF37] text-xs md:text-sm font-medium hover:text-[#F3E5AB] transition-colors border-b border-[#D4AF37]/30 hover:border-[#F3E5AB] pb-1">
              View Benefits
            </button>
          </div>
        </div>

        {/* Right Side: Description */}
        <div ref={fold3Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group md:ml-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
           <p ref={fold3DescRef} className={`text-[oklch(88%_0_0)] text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-left ${!expandedFolds[3] ? 'max-md:line-clamp-2' : ''}`}>
            Advanced holistic treatment by Dr. Swarajit Ghosh. Effective for chronic pain management, stress relief, and restoring bodily balance using traditional and modern techniques.
          </p>
          <button 
            className={`md:hidden text-[12px] font-bold uppercase tracking-wider mt-4 mb-2 min-h-[48px] min-w-[48px] px-4 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${!expandedFolds[3] ? 'block' : 'hidden'} text-[#D4AF37]`}
            onClick={() => setExpandedFolds(prev => ({...prev, [3]: true}))}
            style={{ pointerEvents: 'auto' }}
          >
            Read More +
          </button>
        </div>

      </div>

      {/* Fold 4 Overlay (Preventive Healthcare) */}
      <div ref={fold4Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Description */}
        <div ref={fold4Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group md:mr-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-acc/80"></div>
           <p ref={fold4DescRef} className={`text-[oklch(88%_0_0)] text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-right ${!expandedFolds[4] ? 'max-md:line-clamp-2' : ''}`}>
            Routine health check-ups and baseline health monitoring designed to catch potential medical issues before they become serious.
          </p>
          <button 
            className={`md:hidden text-[12px] font-bold uppercase tracking-wider mt-4 mb-2 min-h-[48px] min-w-[48px] px-4 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${!expandedFolds[4] ? 'block' : 'hidden'} text-[#D4AF37]`}
            onClick={() => setExpandedFolds(prev => ({...prev, [4]: true}))}
            style={{ pointerEvents: 'auto' }}
          >
            Read More +
          </button>
        </div>

        {/* Right Side: Title and CTAs */}
        <div ref={fold4Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group">
          {/* Cyan Hairline */}
          <div className="absolute top-0 right-0 w-full h-[1px] bg-acc/80"></div>
          
          <div className="flex items-center justify-end space-x-4 mb-8">
            <ShinyText 
              text="Proactive Care"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-acc" 
              color="#00E5FF"
              shineColor="#ffffff"
            />
            <span className="w-8 h-[1px] bg-acc/50"></span>
          </div>

          <h2 ref={fold4TitleRef} className="text-2xl md:text-5xl font-light text-[oklch(88%_0_0)] leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100 text-right">
            {textFold === 4 ? <ReactBitsSplitText text="Preventive Healthcare" splitType="chars" delay={30} /> : "Preventive Healthcare"}
          </h2>
          
          <div ref={fold4ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View Benefits
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-semibold rounded-[2px] transition-colors text-xs md:text-sm tracking-wide text-center">
              Book Check-up
            </button>
          </div>
        </div>

      </div>

      {/* Fold 5 Overlay (Advanced ENT Care) */}
      <div ref={fold5Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Description */}
        <div ref={fold5Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group md:mr-8 text-left w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-white/60"></div>
           <p ref={fold5DescRef} className={`text-[oklch(88%_0_0)] text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-left ${!expandedFolds[5] ? 'max-md:line-clamp-2' : ''}`}>
            Dedicated medical care for complex ear, nose, and throat conditions. We provide accurate diagnoses and personalized treatment plans using advanced diagnostic techniques.
          </p>
          <button 
            className={`md:hidden text-[12px] font-bold uppercase tracking-wider mt-4 mb-2 min-h-[48px] min-w-[48px] px-4 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${!expandedFolds[5] ? 'block' : 'hidden'} text-[#D4AF37]`}
            onClick={() => setExpandedFolds(prev => ({...prev, [5]: true}))}
            style={{ pointerEvents: 'auto' }}
          >
            Read More +
          </button>
        </div>

        {/* Right Side: Title and CTAs */}
        <div ref={fold5Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group md:ml-8 md:text-right flex flex-col md:items-end w-full md:w-auto">
          {/* White Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/60"></div>
          
          <div className="flex items-center justify-end space-x-4 mb-8">
            <ShinyText 
              text="Diagnostic Precision"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-[oklch(88%_0_0)]" 
              color="#ffffff"
              shineColor="#00E5FF"
            />
            <span className="w-8 h-[1px] bg-white/40"></span>
          </div>

          <h2 ref={fold5TitleRef} className="text-2xl md:text-6xl font-light text-[oklch(88%_0_0)] leading-tight mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
            ENT Specialists
          </h2>
          
          <div ref={fold5ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View ENT Services
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-semibold rounded-[2px] transition-colors text-xs md:text-sm tracking-wide text-center">
              Consult Specialist
            </button>
          </div>
        </div>

      </div>

      {/* Fold 6 Overlay (The Legacy of Care - Dr. Ashok K. Gulati) */}
      <div ref={fold6Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center px-4 max-md:justify-center max-md:items-center md:px-24 pointer-events-none opacity-0 gap-6 md:gap-12 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Medical Philosophy & Title */}
        <div ref={fold6Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[90vw] md:max-w-xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group">
          
          {/* Gold Hairline */}
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
          
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-4 mb-6">
              <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
              <ShinyText 
                text="The Legacy of Care"
                speed={3} 
                className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]" 
                color="#D4AF37"
                shineColor="#ffffff"
              />
            </div>

            <h2 ref={fold6TitleRef} className="text-3xl md:text-5xl lg:text-6xl font-light text-[oklch(88%_0_0)] leading-tight mb-2 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
              {textFold === 6 ? <ReactBitsSplitText text="Dr. Ashok K. Gulati" splitType="words" delay={40} /> : "Dr. Ashok K. Gulati"}
            </h2>
            <p className="text-[#D4AF37]/80 text-sm md:text-base font-medium tracking-wide uppercase mb-8">Senior Consultant Physician</p>

            <div className="pl-6 border-l-2 border-[#D4AF37]/30 mb-8 relative">
              <div className="absolute -left-[2px] top-0 h-1/3 w-[2px] bg-[#D4AF37]"></div>
              <p ref={fold6DescRef} className="text-[oklch(88%_0_0)]/90 text-lg md:text-xl font-light leading-relaxed italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200">
                "Treating the person, not just the symptom. True healthcare is built on decades of trust, listening, and comprehensive family care."
              </p>
            </div>
            
            <div ref={fold6ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
              <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[#D4AF37] text-[#04090F] font-semibold rounded-sm transition-colors hover:bg-[#F3E5AB] border-none text-xs md:text-sm tracking-wide text-center w-full sm:w-auto">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Expertise Timeline */}
        <div ref={fold6Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[90vw] md:max-w-md pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group flex flex-col space-y-4">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
          
          <div className="bg-[oklch(15%_0.008_95)] p-5 rounded-[2px] border border-[oklch(78%_0_0/0.16)] hover:border-[#D4AF37]/30 transition-colors">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 40+ Years Legacy
            </h4>
            <p className="text-[oklch(88%_0_0)]/70 text-sm font-light leading-relaxed">Dedicated community practice serving generations of families in South Delhi with unmatched diagnostic acumen.</p>
          </div>
          <div className="bg-[oklch(15%_0.008_95)] p-5 rounded-[2px] border border-[oklch(78%_0_0/0.16)] hover:border-[#D4AF37]/30 transition-colors">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Internal Medicine
            </h4>
            <p className="text-[oklch(88%_0_0)]/70 text-sm font-light leading-relaxed">Specialized in managing complex chronic conditions including severe diabetes, hypertension, and multi-system disorders.</p>
          </div>
          <div className="bg-[oklch(15%_0.008_95)] p-5 rounded-[2px] border border-[oklch(78%_0_0/0.16)] hover:border-[#D4AF37]/30 transition-colors">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Fellowship & Academia
            </h4>
            <p className="text-[oklch(88%_0_0)]/70 text-sm font-light leading-relaxed">MBBS, MD (Internal Medicine). Member of the esteemed Physicians Association and regular contributor to medical symposia.</p>
          </div>
        </div>

      </div>

      {/* Fold 7 Overlay (Chronic Care Management) */}
      <div ref={fold7Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Title and CTAs */}
        <div ref={fold7Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group">
          {/* Cyan Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-acc/80"></div>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="w-8 h-[1px] bg-acc/50"></span>
            <ShinyText 
              text="Long-Term Support"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-acc" 
              color="#00E5FF"
              shineColor="#ffffff"
            />
          </div>

          <h2 ref={fold7TitleRef} className="text-2xl md:text-5xl font-light text-[oklch(88%_0_0)] leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
            {textFold === 7 ? <BlurText text="Chronic Care Management" delay={60} /> : "Chronic Care Management"}
          </h2>
          
          <div ref={fold7ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-[oklch(84%_0.19_80.46)] hover:bg-[oklch(86%_0.07_84)] text-[oklch(4%_0.004_95)] font-semibold rounded-[2px] transition-colors text-xs md:text-sm tracking-wide text-center">
              Care Programs
            </button>
            <button onClick={() => setContactModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              Talk to a Doctor
            </button>
          </div>
        </div>

        {/* Right Side: Description */}
        <div ref={fold7Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide group md:ml-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-acc/80"></div>
           <p ref={fold7DescRef} className={`text-[oklch(88%_0_0)] text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-left ${!expandedFolds[7] ? 'max-md:line-clamp-2' : ''}`}>
            Dedicated lifestyle support and meticulous medical care for long-term conditions like diabetes, hypertension, thyroid disorders, and asthma. We walk the journey with you.
          </p>
          <button 
            className={`md:hidden text-[12px] font-bold uppercase tracking-wider mt-4 mb-2 min-h-[48px] min-w-[48px] px-4 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${!expandedFolds[7] ? 'block' : 'hidden'} text-[#D4AF37]`}
            onClick={() => setExpandedFolds(prev => ({...prev, [7]: true}))}
            style={{ pointerEvents: 'auto' }}
          >
            Read More +
          </button>
        </div>

      </div>

      {/* Fold 8 Overlay (Patient Reviews) */}
      <div ref={fold8Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold8Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[95vw] md:max-w-6xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide flex flex-col items-center">
          {/* Gold Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
            <ShinyText 
              text="Patient Experiences"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]" 
              color="#D4AF37"
              shineColor="#ffffff"
            />
            <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
          </div>

          <h2 ref={fold8TitleRef} className="text-2xl md:text-5xl font-light text-[oklch(88%_0_0)] leading-tight mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
            {textFold === 8 ? <BlurText text="What Our Patients Say" delay={60} /> : "What Our Patients Say"}
          </h2>
          
          {/* Horizontal Scrolling Carousel */}
          <div className="w-full overflow-x-auto snap-x snap-mandatory flex space-x-4 pb-6 pt-2 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {reviewsData.map((review) => (
              <div key={review.id} className="snap-center shrink-0 w-[85vw] md:w-[350px] bg-[#0A0A0A]/60 border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(review.rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[oklch(88%_0_0)]/20 fill-transparent"} />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[oklch(88%_0_0)]/40">{review.source}</span>
                  </div>
                  <p className="text-sm md:text-base text-[oklch(88%_0_0)]/90 leading-relaxed font-light mb-6 italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <span className="text-[#D4AF37] font-medium text-sm">{review.author}</span>
                  <span className="text-[oklch(88%_0_0)]/30 text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* Fold 9 Overlay (Clinic Facilities - Option C) */}
      <div ref={fold9Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold9Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[95vw] md:max-w-6xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide flex flex-col items-center">
          {/* Gold Hairline */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
            <ShinyText 
              text="Our Excellence"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]" 
              color="#D4AF37"
              shineColor="#ffffff"
            />
            <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
          </div>

          <h2 ref={fold9TitleRef} className="text-3xl md:text-5xl font-light text-[oklch(88%_0_0)] leading-tight mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
            {textFold === 9 ? <BlurText text="Comprehensive Care Facilities" delay={50} /> : "Comprehensive Care Facilities"}
          </h2>
          
          {/* Maven-style High-Contrast Carousel */}
          <div className="w-full overflow-x-auto snap-x snap-mandatory flex space-x-6 pb-6 pt-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Card 1 */}
            <div className="snap-center shrink-0 w-[80vw] md:w-[380px] bg-[oklch(15%_0.008_95)] border border-[oklch(78%_0_0/0.16)] rounded-sm p-8 flex flex-col hover:scale-[1.02] transition-transform duration-500 shadow-xl group">
              <div className="bg-[#1A1A1B] w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500">
                <span className="text-[#D4AF37] group-hover:text-[oklch(88%_0_0)] transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
                </span>
              </div>
              <h3 className="text-2xl text-[#0A0A0A] font-semibold mb-3 tracking-tight">Specialized ENT Care</h3>
              <p className="text-[#4A4A4A] font-light leading-relaxed mb-6">
                Advanced diagnostics and treatment for ear, nose, and throat conditions by renowned specialist Dr. Ankur Gupta.
              </p>
              <div className="mt-auto border-t border-black/10 pt-4">
                <span className="text-[#0A0A0A] font-medium text-sm">Consultation: ₹350 - ₹500</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="snap-center shrink-0 w-[80vw] md:w-[380px] bg-[oklch(15%_0.008_95)] border border-[oklch(78%_0_0/0.16)] rounded-sm p-8 flex flex-col hover:scale-[1.02] transition-transform duration-500 shadow-xl group">
              <div className="bg-[#1A1A1B] w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500">
                <span className="text-[#D4AF37] group-hover:text-[oklch(88%_0_0)] transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </span>
              </div>
              <h3 className="text-2xl text-[#0A0A0A] font-semibold mb-3 tracking-tight">General & Chronic Care</h3>
              <p className="text-[#4A4A4A] font-light leading-relaxed mb-6">
                Expert management of diabetes, hypertension, and family health under the guidance of Dr. Ashok K. Gulati.
              </p>
              <div className="mt-auto border-t border-black/10 pt-4">
                <span className="text-[#0A0A0A] font-medium text-sm">Comprehensive Diagnostics</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="snap-center shrink-0 w-[80vw] md:w-[380px] bg-[oklch(15%_0.008_95)] border border-[oklch(78%_0_0/0.16)] rounded-sm p-8 flex flex-col hover:scale-[1.02] transition-transform duration-500 shadow-xl group">
              <div className="bg-[#1A1A1B] w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500">
                <span className="text-[#D4AF37] group-hover:text-[oklch(88%_0_0)] transition-colors duration-500">
                  <MapPin size={24} />
                </span>
              </div>
              <h3 className="text-2xl text-[#0A0A0A] font-semibold mb-3 tracking-tight">Prime Accessibility</h3>
              <p className="text-[#4A4A4A] font-light leading-relaxed mb-6">
                Located in the heart of South Delhi at D-696, Chittaranjan Park (Opposite Market No. 2). Easy parking and access.
              </p>
              <div className="mt-auto border-t border-black/10 pt-4">
                <span className="text-[#0A0A0A] font-medium text-sm">Walk-in & Appointments</span>
              </div>
            </div>

          </div>
          
        </div>
      </div>

      {/* Fold 10 Overlay (Patient Knowledge Hub - Athenahealth style) */}
      <div ref={fold10Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold10Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-4 md:p-10 rounded-sm transform translate-z-[20px] will-change-transform w-full max-w-[95vw] md:max-w-6xl pointer-events-auto relative max-h-[85vh] overflow-y-auto scrollbar-hide flex flex-col items-start text-left">
          {/* Accent Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-acc via-acc to-transparent"></div>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="w-8 h-[1px] bg-acc/50"></span>
            <ShinyText 
              text="Explore Our Resources"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-acc" 
              color="#00E5FF"
              shineColor="#ffffff"
            />
          </div>

          <h2 ref={fold10TitleRef} className="text-2xl md:text-5xl font-light text-[oklch(88%_0_0)] leading-tight mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {textFold === 10 ? <BlurText text="Patient Knowledge Hub" delay={50} /> : "Patient Knowledge Hub"}
          </h2>
          
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 pb-6">
            
            {/* Filter Section (Left Sidebar style) */}
            <div className="flex flex-col space-y-6 w-full lg:w-1/4 shrink-0">
              <div>
                <h3 className="text-[oklch(88%_0_0)]/80 uppercase tracking-widest text-xs font-bold mb-4">Top Challenges</h3>
                <ul className="space-y-3">
                  <li><button className="text-[oklch(88%_0_0)] hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">Chronic Care Routines</button></li>
                  <li><button className="text-[oklch(88%_0_0)] hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">Managing Seasonal Allergies</button></li>
                  <li><button className="text-[oklch(88%_0_0)] hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">ENT Infection Prevention</button></li>
                  <li><button className="text-[oklch(88%_0_0)] hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">Pediatric Immunity</button></li>
                </ul>
              </div>
            </div>

            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Card 1 */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col hover:border-acc/50 transition-colors group cursor-pointer relative max-h-[85vh] overflow-y-auto scrollbar-hide">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <span className="text-acc text-xs uppercase tracking-widest font-semibold mb-3 z-10">Guide</span>
                <h4 className="text-xl text-[oklch(88%_0_0)] font-medium mb-3 z-10">The Ultimate Guide to ENT Hygiene</h4>
                <p className="text-[oklch(88%_0_0)]/60 text-sm leading-relaxed mb-6 z-10 line-clamp-2 md:line-clamp-none">Learn the best practices to maintain ear, nose, and throat health during the heavily polluted winter months in Delhi.</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between z-10">
                  <span className="text-[oklch(88%_0_0)]/40 text-xs">5 min read</span>
                  <span className="text-acc group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col hover:border-acc/50 transition-colors group cursor-pointer relative max-h-[85vh] overflow-y-auto scrollbar-hide">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
                </div>
                <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-3 z-10">Webinar</span>
                <h4 className="text-xl text-[oklch(88%_0_0)] font-medium mb-3 z-10">Demystifying Acupuncture</h4>
                <p className="text-[oklch(88%_0_0)]/60 text-sm leading-relaxed mb-6 z-10 line-clamp-2 md:line-clamp-none">Watch Dr. Swarajit Ghosh explain the modern clinical applications of acupuncture therapy for severe chronic pain management.</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between z-10">
                  <span className="text-[oklch(88%_0_0)]/40 text-xs">45 min watch</span>
                  <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col hover:border-acc/50 transition-colors group cursor-pointer relative max-h-[85vh] overflow-y-auto scrollbar-hide md:col-span-2">
                 <span className="text-[oklch(88%_0_0)]/50 text-xs uppercase tracking-widest font-semibold mb-3 z-10">Success Story</span>
                 <div className="flex flex-col md:flex-row gap-6 items-start md:items-center z-10">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A1B] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                       <Star className="text-[#D4AF37] fill-[#D4AF37]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl text-[oklch(88%_0_0)] font-medium mb-2">Overcoming 10 Years of Migraines</h4>
                      <p className="text-[oklch(88%_0_0)]/70 text-sm leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">Read how a tailored approach combining general medicine and targeted acupuncture helped one of our long-term patients achieve a pain-free life.</p>
                    </div>
                    <div className="md:ml-auto mt-4 md:mt-0">
                      <button className="px-6 py-2 border border-white/20 max-md:border-[#e2e8f0] text-[oklch(88%_0_0)] rounded hover:bg-white hover:text-black transition-colors text-sm font-medium shrink-0">Read Case Study</button>
                    </div>
                 </div>
              </div>
              
            </div>

          </div>
          
        </div>
      </div>

      {/* Extracted Modals for Aggressive Memoization */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
      <ServicesModal isOpen={isServicesModalOpen} onClose={() => setServicesModalOpen(false)} scrollToFold={scrollToFoldIndex} />
      
      {/* Hide scrollbar for carousel style */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
