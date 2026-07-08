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

export default function FoldDrGupta({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
  const fold2Ref = useRef(null);
  const fold2Box1Ref = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const actionRef = useRef(null);



  return (
    <>
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
              {currentTextFold === 2 ? <BlurText text="Dr. Ankur Gupta" delay={50} /> : "Dr. Ankur Gupta"}
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
    </>
  );
}
