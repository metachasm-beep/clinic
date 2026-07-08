import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import BlurText from '../BlurText';
import ShinyText from '../ShinyText';
import TextPressure from '../react-bits/TextPressure';
import SpotlightCard from '../react-bits/SpotlightCard';
import ReactBitsSplitText from '../react-bits/SplitText';
import DecryptedText from '../react-bits/DecryptedText';
import FuzzyText from '../react-bits/FuzzyText';
import StarBorder from '../react-bits/StarBorder';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import reviewsData from '../../data/reviews.json';

export default function FoldLegacyCare({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
  const fold6Ref = useRef(null);
  const fold6Box1Ref = useRef(null);
  const fold6TitleRef = useRef(null);
  const fold6DescRef = useRef(null);
  const fold6ActionRef = useRef(null);
  const fold6Box2Ref = useRef(null);



  return (
    <>
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
              {currentTextFold === 6 ? <ReactBitsSplitText text="Dr. Ashok K. Gulati" splitType="words" delay={40} /> : "Dr. Ashok K. Gulati"}
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
    </>
  );
}
