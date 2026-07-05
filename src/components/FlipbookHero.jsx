import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import BlurText from './BlurText';
import ShinyText from './ShinyText';

// React-Bits Components
import TextPressure from './react-bits/TextPressure';
import SpotlightCard from './react-bits/SpotlightCard';
import Magnet from './react-bits/Magnet';
import GlassIcons from './react-bits/GlassIcons';
import StarBorder from './react-bits/StarBorder';
import { Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FlipbookHero({ isLoading }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fold1Ref = useRef(null);
  const fold2Ref = useRef(null);
  
  // Refs for Fold 1 Text Animation
  const fold1TitleRef = useRef(null);
  const fold1PanelRef = useRef(null);
  const fold1IconRef = useRef(null);

  // Refs for Fold 2 Text Animation
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const actionRef = useRef(null);

  // Refs for Fold 3 Text Animation
  const fold3Ref = useRef(null);
  const fold3TitleRef = useRef(null);
  const fold3DescRef = useRef(null);
  const fold3ActionRef = useRef(null);

  // Refs for Fold 4 Text Animation
  const fold4Ref = useRef(null);
  const fold4TitleRef = useRef(null);
  const fold4DescRef = useRef(null);
  const fold4ActionRef = useRef(null);

  // Refs for Fold 5 Text Animation
  const fold5Ref = useRef(null);
  const fold5TitleRef = useRef(null);
  const fold5DescRef = useRef(null);
  const fold5ActionRef = useRef(null);

  // Refs for Fold 6 Text Animation
  const fold6Ref = useRef(null);
  const fold6TitleRef = useRef(null);
  const fold6DescRef = useRef(null);
  const fold6ActionRef = useRef(null);

  // Refs for Fold 7 Text Animation
  const fold7Ref = useRef(null);
  const fold7TitleRef = useRef(null);
  const fold7DescRef = useRef(null);
  const fold7ActionRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);
  const frameCount = 356; // 52(heroscroll2) + 51(heroscroll3) + 54(heroscroll4) + 52(heroscroll5) + 45(heroscroll6) + 50(heroscroll7) + 52(heroscroll8)

  const scrollToFold = (units) => {
    if (containerRef.current) {
      const startY = containerRef.current.offsetTop;
      const targetScroll = startY + (units * window.innerHeight);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setServicesModalOpen(false);
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

  // Preload Images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    // Load heroscroll2 (frames 1-52)
    for (let i = 1; i <= 52; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll2/scene-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[i - 1] = img;
    }

    // Load heroscroll3 (frames 1-51, mapped to 53-103)
    for (let i = 1; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll3/scene-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[52 + i - 1] = img;
    }

    // Load heroscroll4 (frames 0-53, mapped to 104-157)
    for (let i = 0; i <= 53; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll4/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[103 + i] = img;
    }

    // Load heroscroll5 (frames 0-51, mapped to 158-209)
    for (let i = 0; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll5/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[157 + i] = img;
    }

    // Load heroscroll6 (frames 0-44, mapped to 210-254)
    for (let i = 0; i <= 44; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll6/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[209 + i] = img;
    }

    // Load heroscroll7 (frames 0-49, mapped to 255-304)
    for (let i = 0; i <= 49; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll7/rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[254 + i] = img;
    }

    // Load heroscroll8 (frames 0-51, mapped to 305-356)
    for (let i = 0; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll8/two-stylized-line-drawn-characters-one-helping-an-ezremove_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[304 + i] = img;
    }

    function checkLoad() {
      loadedCount++;
      if (loadedCount === frameCount) {
        setImages(loadedImages);
      }
    }
  }, []);

  useLayoutEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const drawImageCover = (ctx, img, canvas, frameIndex) => {
      if (!img) return;
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (images[Math.round(playhead.frame)]) {
        drawImageCover(ctx, images[Math.round(playhead.frame)], canvas, Math.round(playhead.frame));
      }
    };

    const playhead = { frame: 0 };
    window.addEventListener('resize', handleResize);
    handleResize(); 

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2100%", // 21 scrolls (3 scrolls per fold)
          scrub: 1.5,
          pin: true,
        }
      });

      const renderFrame = () => {
        const currentFrame = Math.round(playhead.frame);
        if (images[currentFrame]) {
          drawImageCover(ctx, images[currentFrame], canvas, currentFrame);
        }
      };

      // --- 1. CAMERA PAN SEQUENCE ---
      // Each camera pan takes 2 units of time (2 scrolls). 
      // The timeline gaps (e.g. 2 to 3) represent the reading pause (1 scroll).
      tl.to(playhead, { frame: 51, ease: "none", duration: 2, onUpdate: renderFrame }, 0);
      tl.to(playhead, { frame: 102, ease: "none", duration: 2, onUpdate: renderFrame }, 3);
      tl.to(playhead, { frame: 156, ease: "none", duration: 2, onUpdate: renderFrame }, 6);
      tl.to(playhead, { frame: 208, ease: "none", duration: 2, onUpdate: renderFrame }, 9);
      tl.to(playhead, { frame: 253, ease: "none", duration: 2, onUpdate: renderFrame }, 12);
      tl.to(playhead, { frame: 303, ease: "none", duration: 2, onUpdate: renderFrame }, 15);
      tl.to(playhead, { frame: 355, ease: "none", duration: 2, onUpdate: renderFrame }, 18);

      // --- 2. TEXT ANIMATION SEQUENCE ---

      // Fold 1: Get Well Clinic
      // Text is visible initially. Fades out at the very end of Fold 1's segment.
      tl.to(fold1Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 2.9);

      // Fold 2: Dr. Ankur Gupta
      const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
      const descSplit = new SplitText(descRef.current, { type: "words" });

      tl.fromTo(fold2Ref.current, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, 4.5);
      tl.fromTo(titleSplit.chars, { filter: 'blur(8px)', opacity: 0, y: 20 }, { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, 4.6);
      tl.fromTo(descSplit.words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, 4.8);
      tl.fromTo(actionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, 5.0);
      tl.to(fold2Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 5.9);

      // Fold 3: Acupuncture Therapy
      const fold3TitleSplit = new SplitText(fold3TitleRef.current, { type: "chars,words" });
      const fold3DescSplit = new SplitText(fold3DescRef.current, { type: "words" });

      tl.fromTo(fold3Ref.current, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, 7.5);
      tl.fromTo(fold3TitleSplit.chars, { filter: 'blur(8px)', opacity: 0, y: 20 }, { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, 7.6);
      tl.fromTo(fold3ActionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, 7.8);
      tl.fromTo(fold3DescSplit.words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, 8.0);
      tl.to(fold3Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 8.9);

      // Fold 4: Preventive Healthcare
      const fold4TitleSplit = new SplitText(fold4TitleRef.current, { type: "chars,words" });
      const fold4DescSplit = new SplitText(fold4DescRef.current, { type: "words" });

      tl.fromTo(fold4Ref.current, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, 10.5);
      tl.fromTo(fold4TitleSplit.chars, { filter: 'blur(8px)', opacity: 0, y: 20 }, { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, 10.6);
      tl.fromTo(fold4ActionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, 10.8);
      tl.fromTo(fold4DescSplit.words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, 11.0);
      tl.to(fold4Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 11.9);

      // Fold 5: Advanced ENT Care
      const fold5TitleSplit = new SplitText(fold5TitleRef.current, { type: "chars,words" });
      const fold5DescSplit = new SplitText(fold5DescRef.current, { type: "words" });

      tl.fromTo(fold5Ref.current, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, 13.5);
      tl.fromTo(fold5TitleSplit.chars, { filter: 'blur(8px)', opacity: 0, y: 20 }, { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, 13.6);
      tl.fromTo(fold5ActionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, 13.8);
      tl.fromTo(fold5DescSplit.words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, 14.0);
      tl.to(fold5Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 14.9);

      // Fold 6: The Legacy of Care (Dr. Ashok K. Gulati)
      const fold6TitleSplit = new SplitText(fold6TitleRef.current, { type: "chars,words" });
      const fold6DescSplit = new SplitText(fold6DescRef.current, { type: "words" });

      tl.fromTo(fold6Ref.current, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, 16.5);
      tl.fromTo(fold6TitleSplit.chars, { filter: 'blur(8px)', opacity: 0, y: 20 }, { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, 16.6);
      tl.fromTo(fold6ActionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, 16.8);
      tl.fromTo(fold6DescSplit.words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, 17.0);
      tl.to(fold6Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, 17.9);

      // Fold 7: Chronic Care Management
      const fold7TitleSplit = new SplitText(fold7TitleRef.current, { type: "chars,words" });
      const fold7DescSplit = new SplitText(fold7DescRef.current, { type: "words" });

      tl.fromTo(fold7Ref.current, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, 19.5);
      tl.fromTo(fold7TitleSplit.chars, { filter: 'blur(8px)', opacity: 0, y: 20 }, { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, 19.6);
      tl.fromTo(fold7ActionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, 19.8);
      tl.fromTo(fold7DescSplit.words, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, 20.0);

      // Pad timeline to exactly 21 duration so scrub aligns perfectly
      tl.set({}, {}, 21);

    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-dom overflow-hidden z-10 flex items-center justify-between px-8 md:px-24">
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Fold 1 Overlays */}
      <div ref={fold1Ref} className="absolute inset-0 z-10 w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Left Panel */}
        <div className="flex flex-col justify-start pt-[10vh] md:pt-[15vh] pointer-events-auto h-full space-y-[4vh]">
          
          <div ref={fold1PanelRef} className="max-w-3xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div ref={fold1IconRef} className="w-12 h-12 bg-[#d4af37] shrink-0 hidden sm:block"></div>
              <h1
                ref={fold1TitleRef}
                className="m-0"
                style={{
                  color: "#e2e8f0", // ks-champagne approx
                  fontFamily: "'Alumni Sans', sans-serif",
                  fontSize: "clamp(4.2rem, 7.5vw, 6.8rem)",
                  fontWeight: 500,
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
          <div className="bg-dom/90 border border-acc/30 p-6 md:p-8 rounded-sm shadow-2xl w-full max-w-md relative overflow-hidden group text-left flex flex-col items-start">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-acc/80 to-transparent"></div>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="w-8 h-[1px] bg-acc/50"></span>
              <ShinyText 
                text="D-696, Opp. Market No. 2, C.R. Park"
                speed={3} 
                className="text-xs font-medium uppercase tracking-[0.2em] text-acc" 
                color="#00E5FF"
                shineColor="#ffffff"
              />
            </div>

            <BlurText
              text="Visit Get Well Clinic"
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-3xl font-light text-[#F8FAFC] leading-tight mb-4 tracking-tight"
            />
            
            <BlurText
              text="Your premier destination for healthcare in South Delhi. Call ahead to book an appointment with our specialists and avoid long queues."
              delay={50}
              animateBy="words"
              direction="top"
              className="text-[#CBD5E1] text-sm font-normal leading-relaxed mb-6"
            />

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="https://maps.google.com/?q=D-696,+Opp.+Market+No.+2,+C.R.+Park,+New+Delhi,+110019" target="_blank" rel="noreferrer" className="px-6 py-3 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-xs tracking-wide text-center">
                Get Directions
              </a>
              <button onClick={() => setContactModalOpen(true)} className="text-acc text-xs font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1 cursor-pointer">
                Contact Desk
              </button>
            </div>
          </div>
          
        </div>

        {/* Center Panel */}
        <div className="hidden lg:block h-full"></div>

        {/* Right Panel */}
        <div className="flex flex-col justify-start pt-8 md:pt-[45vh] items-end pointer-events-auto h-full">
          <div className="max-w-sm text-right bg-dom border border-white/5 p-6 md:p-8 rounded-sm shadow-2xl">
            <ShinyText 
              text="Book Your Consultation"
              disabled={false} 
              speed={3} 
              className="text-xl font-semibold uppercase tracking-widest mb-4 text-[#F8FAFC]" 
              color="#E2E8F0"
              shineColor="#00E5FF"
            />
            <p className="text-[#94A3B8] mb-6 font-medium text-sm leading-relaxed">
              Schedule an appointment with our expert general physicians or experience holistic acupuncture therapy.
            </p>
            <button onClick={() => setServicesModalOpen(true)} className="inline-block bg-acc hover:bg-[#00B3CC] transition-colors duration-300 text-dom font-bold py-3 px-8 rounded-sm text-sm tracking-wide cursor-pointer">
              Discover Services
            </button>
          </div>
        </div>

      </div>

      {/* Fold 2 Overlays (Initially hidden, animated by GSAP) */}
      <div ref={fold2Ref} className="absolute inset-0 z-20 w-full h-full flex items-center justify-start px-4 md:px-24 pointer-events-none opacity-0">
        <div className="bg-dom border border-acc/20 p-8 md:p-14 rounded-sm shadow-2xl max-w-2xl pointer-events-auto relative overflow-hidden group">
          {/* Impeccable Hairline accent instead of glowing glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-acc/60"></div>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="w-8 h-[1px] bg-acc/40"></span>
            <ShinyText 
              text="Expert Care"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-acc" 
              color="#00E5FF"
              shineColor="#ffffff"
            />
          </div>

          <h2 ref={titleRef} className="text-4xl md:text-6xl font-light text-[#F8FAFC] leading-tight mb-6 tracking-tight">
            Dr. Ankur Gupta
          </h2>
          
          <p ref={descRef} className="text-[#CBD5E1] text-base md:text-lg font-normal leading-relaxed max-w-xl mb-10">
            Consult with Dr. Ankur Gupta for expert general medical care. Specializing in acute infections, fevers, and comprehensive proactive health monitoring to keep you at your best.
          </p>
          
          <div ref={actionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-sm tracking-wide">
              Schedule Appointment
            </button>
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              Read Full Profile
            </button>
          </div>
        </div>
      </div>

      {/* Fold 3 Overlay (Acupuncture Therapy) */}
      <div ref={fold3Ref} className="absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-24 pointer-events-none opacity-0 gap-6 md:gap-0 mt-12 md:mt-0">
        
        {/* Left Side: Title and CTAs */}
        <div className="bg-dom border border-[#D4AF37]/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-xl pointer-events-auto relative overflow-hidden group">
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

          <h2 ref={fold3TitleRef} className="text-4xl md:text-5xl font-light text-[#F8FAFC] leading-tight mb-10 tracking-tight">
            Acupuncture Therapy
          </h2>
          
          <div ref={fold3ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-[#D4AF37] text-[#04090F] font-semibold rounded-sm transition-colors hover:bg-[#F3E5AB] border-none text-sm tracking-wide text-center">
              Consult Specialist
            </button>
            <button onClick={() => setServicesModalOpen(true)} className="text-[#D4AF37] text-sm font-medium hover:text-[#F3E5AB] transition-colors border-b border-[#D4AF37]/30 hover:border-[#F3E5AB] pb-1">
              View Benefits
            </button>
          </div>
        </div>

        {/* Right Side: Description */}
        <div className="bg-dom border border-[#D4AF37]/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-md pointer-events-auto relative overflow-hidden group md:ml-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
           <p ref={fold3DescRef} className="text-[#CBD5E1] text-lg font-normal leading-relaxed text-left">
            Advanced holistic treatment by Dr. Swarajit Ghosh. Effective for chronic pain management, stress relief, and restoring bodily balance using traditional and modern techniques.
          </p>
        </div>

      </div>

      {/* Fold 4 Overlay (Preventive Healthcare) */}
      <div ref={fold4Ref} className="absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 md:px-24 pointer-events-none opacity-0 gap-6 md:gap-0 mt-12 md:mt-0">
        
        {/* Left Side: Description */}
        <div className="bg-dom border border-acc/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-md pointer-events-auto relative overflow-hidden group md:mr-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-acc/80"></div>
           <p ref={fold4DescRef} className="text-[#CBD5E1] text-lg font-normal leading-relaxed text-right">
            Routine health check-ups and baseline health monitoring designed to catch potential medical issues before they become serious.
          </p>
        </div>

        {/* Right Side: Title and CTAs */}
        <div className="bg-dom border border-acc/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-xl pointer-events-auto relative overflow-hidden group">
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

          <h2 ref={fold4TitleRef} className="text-4xl md:text-5xl font-light text-[#F8FAFC] leading-tight mb-10 tracking-tight text-right">
            Preventive Healthcare
          </h2>
          
          <div ref={fold4ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View Benefits
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-sm tracking-wide text-center">
              Book Check-up
            </button>
          </div>
        </div>

      </div>

      {/* Fold 5 Overlay (Advanced ENT Care) */}
      <div ref={fold5Ref} className="absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 md:px-24 pointer-events-none opacity-0 gap-6 md:gap-0 mt-12 md:mt-0">
        
        {/* Left Side: Description */}
        <div className="bg-dom border border-white/20 p-8 md:p-14 rounded-sm shadow-2xl max-w-md pointer-events-auto relative overflow-hidden group md:mr-8 text-left w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-white/60"></div>
           <p ref={fold5DescRef} className="text-[#CBD5E1] text-lg font-normal leading-relaxed text-left">
            Dedicated medical care for complex ear, nose, and throat conditions. We provide accurate diagnoses and personalized treatment plans using advanced diagnostic techniques.
          </p>
        </div>

        {/* Right Side: Title and CTAs */}
        <div className="bg-dom border border-white/20 p-8 md:p-14 rounded-sm shadow-2xl max-w-xl pointer-events-auto relative overflow-hidden group md:ml-8 md:text-right flex flex-col md:items-end w-full md:w-auto">
          {/* White Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/60"></div>
          
          <div className="flex items-center justify-end space-x-4 mb-8">
            <ShinyText 
              text="Diagnostic Precision"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-white" 
              color="#ffffff"
              shineColor="#00E5FF"
            />
            <span className="w-8 h-[1px] bg-white/40"></span>
          </div>

          <h2 ref={fold5TitleRef} className="text-4xl md:text-6xl font-light text-[#F8FAFC] leading-tight mb-6 tracking-tight">
            ENT Specialists
          </h2>
          
          <div ref={fold5ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View ENT Services
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-sm tracking-wide text-center">
              Consult Specialist
            </button>
          </div>
        </div>

      </div>

      {/* Fold 6 Overlay (The Legacy of Care) */}
      <div ref={fold6Ref} className="absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 md:px-24 pointer-events-none opacity-0 gap-6 md:gap-0 mt-12 md:mt-0">
        
        {/* Left Side: Description */}
        <div className="bg-dom border border-[#D4AF37]/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-md pointer-events-auto relative overflow-hidden group md:mr-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
           <p ref={fold6DescRef} className="text-[#CBD5E1] text-lg font-normal leading-relaxed text-right">
            Experience proactive, patient-centric healthcare with Dr. Gulati. Offering decades of clinical excellence in general medicine, internal medicine, and family health for the CR Park community.
          </p>
        </div>

        {/* Right Side: Title and CTAs */}
        <div className="bg-dom border border-[#D4AF37]/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-xl pointer-events-auto relative overflow-hidden group w-full md:w-auto">
          {/* Gold Hairline */}
          <div className="absolute top-0 right-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
          
          <div className="flex items-center justify-end space-x-4 mb-8">
            <ShinyText 
              text="Senior Physician"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]" 
              color="#D4AF37"
              shineColor="#ffffff"
            />
            <span className="w-8 h-[1px] bg-[#D4AF37]/50"></span>
          </div>

          <h2 ref={fold6TitleRef} className="text-4xl md:text-5xl font-light text-[#F8FAFC] leading-tight mb-10 tracking-tight text-right">
            Dr. Ashok K. Gulati
          </h2>
          
          <div ref={fold6ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-10">
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-[#D4AF37] text-[#04090F] font-semibold rounded-sm transition-colors hover:bg-[#F3E5AB] border-none text-sm tracking-wide text-center">
              Schedule Consultation
            </button>
            <button onClick={() => setServicesModalOpen(true)} className="text-[#D4AF37] text-sm font-medium hover:text-[#F3E5AB] transition-colors border-b border-[#D4AF37]/30 hover:border-[#F3E5AB] pb-1">
              Read Full Profile
            </button>
          </div>
        </div>

      </div>

      {/* Fold 7 Overlay (Chronic Care Management) */}
      <div ref={fold7Ref} className="absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-24 pointer-events-none opacity-0 gap-6 md:gap-0 mt-12 md:mt-0">
        
        {/* Left Side: Title and CTAs */}
        <div className="bg-dom border border-acc/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-xl pointer-events-auto relative overflow-hidden group w-full md:w-auto">
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

          <h2 ref={fold7TitleRef} className="text-4xl md:text-5xl font-light text-[#F8FAFC] leading-tight mb-10 tracking-tight">
            Chronic Care Management
          </h2>
          
          <div ref={fold7ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-sm tracking-wide text-center">
              Care Programs
            </button>
            <button onClick={() => setContactModalOpen(true)} className="text-acc text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              Talk to a Doctor
            </button>
          </div>
        </div>

        {/* Right Side: Description */}
        <div className="bg-dom border border-acc/30 p-8 md:p-14 rounded-sm shadow-2xl max-w-md pointer-events-auto relative overflow-hidden group md:ml-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-acc/80"></div>
           <p ref={fold7DescRef} className="text-[#CBD5E1] text-lg font-normal leading-relaxed text-left">
            Dedicated lifestyle support and meticulous medical care for long-term conditions like diabetes, hypertension, thyroid disorders, and asthma. We walk the journey with you.
          </p>
        </div>

      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
          <div className="bg-dom border border-acc/30 p-8 rounded-sm max-w-md w-full relative shadow-2xl">
            <Magnet padding={10} disabled={false} magnetStrength={3}>
              <button onClick={() => setContactModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 text-xl cursor-pointer">✕</button>
            </Magnet>
            <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Contact Desk</h3>
            <GlassIcons 
              items={[
                { icon: <MapPin size={24} />, color: 'blue', label: 'D-696, C.R. Park, ND 110019', customClass: 'mb-4 text-left flex gap-4 w-full' },
                { icon: <Phone size={24} />, color: 'purple', label: '+91 11 2627 0000', customClass: 'mb-4 text-left flex gap-4 w-full' },
                { icon: <Mail size={24} />, color: 'green', label: 'info@getwellclinic.in', customClass: 'mb-4 text-left flex gap-4 w-full' }
              ]} 
              className="flex-col items-start gap-4"
            />
            <div className="mt-6 text-[#CBD5E1] text-sm">
              <p><strong className="text-[#F8FAFC]">Hours:</strong><br />Mon - Sat: 9:00 AM - 8:00 PM<br />Sun: Closed</p>
            </div>
          </div>
        </div>
      )}

      {/* Services Modal */}
      {isServicesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
          <div className="bg-dom border border-acc/30 p-8 rounded-sm max-w-4xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <Magnet padding={10} disabled={false} magnetStrength={3}>
              <button onClick={() => setServicesModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 text-xl z-50 cursor-pointer">✕</button>
            </Magnet>
            <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Discover Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SpotlightCard className="p-6 cursor-pointer" spotlightColor="rgba(0, 229, 255, 0.2)" onClick={() => { scrollToFold(3); setServicesModalOpen(false); }}>
                <h4 className="text-acc font-medium mb-2">General Physician</h4>
                <p className="text-[#CBD5E1] text-sm">Dr. Ankur Gupta - Expert care, fevers, & monitoring.</p>
              </SpotlightCard>
              <SpotlightCard className="p-6 cursor-pointer" spotlightColor="rgba(212, 175, 55, 0.2)" onClick={() => { scrollToFold(6); setServicesModalOpen(false); }}>
                <h4 className="text-[#D4AF37] font-medium mb-2">Acupuncture Therapy</h4>
                <p className="text-[#CBD5E1] text-sm">Holistic treatment for pain and wellness.</p>
              </SpotlightCard>
              <SpotlightCard className="p-6 cursor-pointer" spotlightColor="rgba(0, 229, 255, 0.2)" onClick={() => { scrollToFold(9); setServicesModalOpen(false); }}>
                <h4 className="text-acc font-medium mb-2">Preventive Healthcare</h4>
                <p className="text-[#CBD5E1] text-sm">Proactive check-ups and health plans.</p>
              </SpotlightCard>
              <SpotlightCard className="p-6 cursor-pointer" spotlightColor="rgba(255, 255, 255, 0.2)" onClick={() => { scrollToFold(12); setServicesModalOpen(false); }}>
                <h4 className="text-white font-medium mb-2">ENT Specialists</h4>
                <p className="text-[#CBD5E1] text-sm">Diagnostic precision for ear, nose, throat.</p>
              </SpotlightCard>
              <SpotlightCard className="p-6 cursor-pointer" spotlightColor="rgba(212, 175, 55, 0.2)" onClick={() => { scrollToFold(15); setServicesModalOpen(false); }}>
                <h4 className="text-[#D4AF37] font-medium mb-2">Senior Physician</h4>
                <p className="text-[#CBD5E1] text-sm">Dr. Ashok K. Gulati - Decades of legacy care.</p>
              </SpotlightCard>
              <SpotlightCard className="p-6 cursor-pointer" spotlightColor="rgba(0, 229, 255, 0.2)" onClick={() => { scrollToFold(18); setServicesModalOpen(false); }}>
                <h4 className="text-acc font-medium mb-2">Chronic Care</h4>
                <p className="text-[#CBD5E1] text-sm">Management for long-term conditions.</p>
              </SpotlightCard>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
