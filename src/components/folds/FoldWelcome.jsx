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

export default function FoldWelcome({ currentTextFold, setContactModalOpen, setServicesModalOpen, isLoading }) {
 const fold1Ref = useRef(null);
 const fold1PanelRef = useRef(null);
 const fold1IconRef = useRef(null);
 const fold1TitleRef = useRef(null);
 const fold1Card1Ref = useRef(null);
 const fold1Card2Ref = useRef(null);

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

 return (
 <>
 {/* Fold 1 Overlays */}
 <div ref={fold1Ref} className={`absolute inset-0 z-10 w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 max-md:items-center transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:scale-[0.92] will-change-[transform,opacity] ${currentTextFold === 1 ? 'max-md:duration-300 !opacity-100 max-md:!opacity-100 max-md:!translate-y-0 max-md:!scale-100 !pointer-events-auto' : 'max-md:duration-75 !opacity-0 max-md:!opacity-0 !pointer-events-none max-md:! max-md:!scale-[0.92]'}`}>
 
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
 className="text-2xl md:text-3xl font-light text-[oklch(91%_0_0)] leading-tight mb-4 tracking-tight"
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
 </>
 );
}
