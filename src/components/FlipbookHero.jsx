import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { useScrollSequence } from '../hooks/useScrollSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import BlurText from './BlurText';
import ShinyText from './ShinyText';
import FoldWelcome from './folds/FoldWelcome';
import FoldDrGupta from './folds/FoldDrGupta';
import FoldAcupuncture from './folds/FoldAcupuncture';
import FoldPreventive from './folds/FoldPreventive';
import FoldENT from './folds/FoldENT';
import FoldLegacyCare from './folds/FoldLegacyCare';
import FoldChronicCare from './folds/FoldChronicCare';
import FoldReviews from './folds/FoldReviews';
import FoldFacilities from './folds/FoldFacilities';
import FoldKnowledgeHub from './folds/FoldKnowledgeHub';

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
      <div className={`fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[70] transition-all duration-500 flex flex-col pt-24 px-6 md:px-24 overflow-y-auto ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'max-md:duration-75 opacity-0 pointer-events-none -translate-y-full'}`}>
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

      <div className={`absolute inset-0 z-[5] bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent pointer-events-none md:hidden transition-opacity duration-700 ease-in-out ${textFold > 0 ? 'opacity-100' : 'max-md:duration-75 opacity-0'}`} />
      
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
      <div className={`mobile-hero-overlay md:hidden absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-all md:duration-[800ms] will-change-[transform,opacity] ${textFold === 0 ? 'max-md:duration-300 opacity-100 translate-y-0 scale-100' : 'max-md:duration-75 opacity-0 translate-y-8 scale-95'}`}>
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
      
            <FoldWelcome currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />
<FoldDrGupta currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />

<FoldAcupuncture currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} expandedFolds={expandedFolds} setExpandedFolds={setExpandedFolds} />

<FoldPreventive currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} expandedFolds={expandedFolds} setExpandedFolds={setExpandedFolds} />

            <FoldENT currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />
<FoldLegacyCare currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />

<FoldChronicCare currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} expandedFolds={expandedFolds} setExpandedFolds={setExpandedFolds} />

<FoldReviews currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />

<FoldFacilities currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />

<FoldKnowledgeHub currentTextFold={textFold} setContactModalOpen={setContactModalOpen} setServicesModalOpen={setServicesModalOpen} isLoading={isLoading} />

      
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
