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

export default function FoldPreventive({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
  const fold4Ref = useRef(null);
  const fold4Box1Ref = useRef(null);
  const fold4DescRef = useRef(null);
  const fold4Box2Ref = useRef(null);
  const fold4TitleRef = useRef(null);
  const fold4ActionRef = useRef(null);
  const [expandedFolds, setExpandedFolds] = useState({});



  return (
    <>
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
            {currentTextFold === 4 ? <ReactBitsSplitText text="Preventive Healthcare" splitType="chars" delay={30} /> : "Preventive Healthcare"}
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
    </>
  );
}
