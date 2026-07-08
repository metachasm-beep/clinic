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

export default function FoldFacilities({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
  const fold9Ref = useRef(null);
  const fold9Box1Ref = useRef(null);
  const fold9TitleRef = useRef(null);



  return (
    <>
      {/* Fold 9 Overlay (Clinic Facilities - Option C) */}
      <div ref={fold9Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-center md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity] ${currentTextFold === 9 ? 'max-md:duration-300 !opacity-100 max-md:!opacity-100 max-md:!translate-y-0 max-md:!scale-100 !pointer-events-auto' : 'max-md:duration-75 !opacity-0 max-md:!opacity-0 !pointer-events-none max-md:!translate-y-12 max-md:!scale-95'}`}>
        
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
            {currentTextFold === 9 ? <BlurText text="Comprehensive Care Facilities" delay={50} /> : "Comprehensive Care Facilities"}
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
    </>
  );
}
