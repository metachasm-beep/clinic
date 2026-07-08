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

export default function FoldReviews({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
  const fold8Ref = useRef(null);
  const fold8Box1Ref = useRef(null);
  const fold8TitleRef = useRef(null);



  return (
    <>
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
            {currentTextFold === 8 ? <BlurText text="What Our Patients Say" delay={60} /> : "What Our Patients Say"}
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
    </>
  );
}
