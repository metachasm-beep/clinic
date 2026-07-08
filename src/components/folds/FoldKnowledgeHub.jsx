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

export default function FoldKnowledgeHub({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
  const fold10Ref = useRef(null);
  const fold10Box1Ref = useRef(null);
  const fold10TitleRef = useRef(null);



  return (
    <>
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
            {currentTextFold === 10 ? <BlurText text="Patient Knowledge Hub" delay={50} /> : "Patient Knowledge Hub"}
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
    </>
  );
}
