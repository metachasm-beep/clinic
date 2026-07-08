import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
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

export default function FlipbookHero({ isLoading }) {
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

  const [images, setImages] = useState([]);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);
  const [bgFold, setBgFold] = useState(1);
  const [textFold, setTextFold] = useState(1);
  const [expandedFolds, setExpandedFolds] = useState({});
  const [canvasBlur, setCanvasBlur] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);
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
    let expectedCount = 0;
    const isMobileDevice = window.innerWidth < 768;
    const step = isMobileDevice ? 2 : 1;
    
    // Load heroscroll2 (frames 1-52)
    for (let i = 1; i <= 52; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll2/scene-${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[i - 1] = img;
      if (isMobileDevice && i < 52) loadedImages[i] = img;
    }

    // Load heroscroll3 (frames 1-51)
    for (let i = 1; i <= 51; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll3/scene-${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[52 + i - 1] = img;
      if (isMobileDevice && i < 51) loadedImages[52 + i] = img;
    }

    // Load heroscroll4 (frames 0-53)
    for (let i = 0; i <= 53; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll4/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[103 + i] = img;
      if (isMobileDevice && i < 53) loadedImages[103 + i + 1] = img;
    }

    // Load heroscroll5 (frames 0-51)
    for (let i = 0; i <= 51; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll5/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[157 + i] = img;
      if (isMobileDevice && i < 51) loadedImages[157 + i + 1] = img;
    }

    // Load heroscroll6 (frames 0-44)
    for (let i = 0; i <= 44; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll6/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[209 + i] = img;
      if (isMobileDevice && i < 44) loadedImages[209 + i + 1] = img;
    }

    // Load heroscroll7 (frames 0-49)
    for (let i = 0; i <= 49; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll7/rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[254 + i] = img;
      if (isMobileDevice && i < 49) loadedImages[254 + i + 1] = img;
    }

    // Load heroscroll8 (frames 0-51)
    for (let i = 0; i <= 51; i += step) {
      expectedCount++;
      const img = new Image();
      img.src = `/assets/heroscroll8/two-stylized-line-drawn-characters-one-helping-an-ezremove_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[304 + i] = img;
      if (isMobileDevice && i < 51) loadedImages[304 + i + 1] = img;
    }

    function checkLoad() {
      loadedCount++;
      if (loadedCount === expectedCount) {
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
      const isMobileCanvas = window.innerWidth < 768;
      // On mobile, cap the height ratio to 75% to prevent excessive zoom (cinematic letterboxing)
      const heightRatio = isMobileCanvas ? (canvas.height * 0.75) / img.height : canvas.height / img.height;
      const ratio = Math.max(canvas.width / img.width, heightRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    const handleResize = () => {
      const isMobileForDpr = window.innerWidth < 768;
      const dpr = isMobileForDpr ? 1 : (window.devicePixelRatio || 1);
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

    const isMobileForPlayhead = window.innerWidth < 768;
    const playhead = { frame: isMobileForPlayhead ? 51 : 0 };
    window.addEventListener('resize', handleResize);
    handleResize(); 

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      let { isMobile, reduceMotion } = context.conditions;

      // --- DYNAMIC TIMELINE CALCULATIONS ---
      const pan = 2; // Duration of camera pan
      const pause = isMobile ? 3 : 1; // 3x longer reading pause on mobile
      
      const p1S = 0;           const p1E = p1S + pan;
      const p2S = p1E + pause; const p2E = p2S + pan;
      const p3S = p2E + pause; const p3E = p3S + pan;
      const p4S = p3E + pause; const p4E = p4S + pan;
      const p5S = p4E + pause; const p5E = p5S + pan;
      const p6S = p5E + pause; const p6E = p6S + pan;
      const p7S = p6E + pause; const p7E = p7S + pan;
      const p8S = p7E + pause; const p8E = p8S + pan;
      const p9S = p8E + pause; const p9E = p9S + pan;
      const p10S = p9E + pause; const p10E = p10S + pan;
      const totalDuration = p10E + pause;

      // Make scroll perfectly match the number of folds
      // Increased mobile scroll distance to slow down the animation by 50%
      const scrollEnd = isMobile ? "+=4500%" : "+=3000%";
      const scrubValue = isMobile ? 0.5 : 1.5;
      const xOffsetLarge = reduceMotion ? 0 : (isMobile ? 10 : 20);
      const yOffsetLarge = reduceMotion ? 0 : (isMobile ? 10 : 20);
      const yOffsetSmall = reduceMotion ? 0 : (isMobile ? 5 : 10);

      // Defer GSAP timeline creation to allow the browser to paint the LCP frame first
      let tl;
      let currentMobileFold = 1;
      const buildTimelineTimer = setTimeout(() => {
        // Snap points for each fold's reading pause so one swipe perfectly aligns to the next text card
        const snapPoints = isMobile ? [
          0, 
          p1E/totalDuration, 
          p2E/totalDuration, 
          p3E/totalDuration, 
          p4E/totalDuration, 
          p5E/totalDuration, 
          p6E/totalDuration, 
          p7E/totalDuration
        ] : false;

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: scrollEnd,
            scrub: scrubValue,
            pin: true,
            onUpdate: (self) => {
              if (isMobile) {
                 const p = self.progress;
                 let step = Math.min(21, Math.max(0, Math.floor(p * 22)));
                 
                 let newBgFold = Math.ceil(step / 2);
                 if (newBgFold > 8) newBgFold = 8; // Max BG is still 8
                 
                 let newTextFold = (step % 2 === 0) ? (step / 2) : null;
                 if (step >= 20) newTextFold = 10;

                 // We completely bypass manual gsap.to(playhead) here!
                 // Mobile background is natively driven by the timeline via scrub below.
                 
                 setBgFold(prev => prev !== newBgFold ? newBgFold : prev);
                 // setTextFold removed for buttery smooth scroll performance!
                 if (typeof navigator !== 'undefined' && navigator.vibrate && newTextFold !== null && textFold !== newTextFold) {
                      // We can't vibrate here easily without tracking state, so let's just skip haptics on scroll 
                      // or rely on GSAP onStart callbacks if really needed.
                 }
                  
                  // Blur canvas on text pauses (even steps)
                  setCanvasBlur(step % 2 === 0 ? 8 : 0);
                  
                  // Velocity reactive UI
                  if (self && typeof self.getVelocity === 'function') {
                    const velocity = Math.abs(self.getVelocity());
                    if (velocity > 1500) {
                      setScrollOpacity(0.3);
                    } else if (velocity > 500) {
                      setScrollOpacity(0.6);
                    } else {
                      setScrollOpacity(1);
                    }
                  }
              }
            },
            snap: false // Snapping was forcing jumps that bypassed odd steps (text folds)
          }
        });

        function renderFrame() {
          const currentFrame = Math.round(playhead.frame);
          if (images[currentFrame]) {
            drawImageCover(ctx, images[currentFrame], canvas, currentFrame);
          }
        };

        // --- 1. CAMERA PAN SEQUENCE ---
        if (!isMobile) {
          tl.to(playhead, { frame: 51, ease: "none", duration: pan, onUpdate: renderFrame }, p1S);
          tl.to(playhead, { frame: 102, ease: "none", duration: pan, onUpdate: renderFrame }, p2S);
          tl.to(playhead, { frame: 156, ease: "none", duration: pan, onUpdate: renderFrame }, p3S);
          tl.to(playhead, { frame: 208, ease: "none", duration: pan, onUpdate: renderFrame }, p4S);
          tl.to(playhead, { frame: 253, ease: "none", duration: pan, onUpdate: renderFrame }, p5S);
          tl.to(playhead, { frame: 303, ease: "none", duration: pan, onUpdate: renderFrame }, p6S);
          tl.to(playhead, { frame: 355, ease: "none", duration: pan, onUpdate: renderFrame }, p7S);
          tl.to(playhead, { frame: 355, ease: "none", duration: pan, onUpdate: renderFrame }, p8S);
          tl.to(playhead, { frame: 355, ease: "none", duration: pan, onUpdate: renderFrame }, p9S);
          tl.to(playhead, { frame: 355, ease: "none", duration: pan, onUpdate: renderFrame }, p10S);
        } else {
          // Mobile native scrub timeline: 
          // Instead of discrete jumps, we map the camera directly to the GSAP timeline scroll proportion (totalDuration).
          // Mobile has 22 logic steps. Total scroll is divided into 22 chunks.
          // Panning occurs strictly on odd steps.
          const stepDur = totalDuration / 22;
          tl.to(playhead, { frame: 102, ease: "none", duration: stepDur, onUpdate: renderFrame }, 3 * stepDur);
          tl.to(playhead, { frame: 156, ease: "none", duration: stepDur, onUpdate: renderFrame }, 5 * stepDur);
          tl.to(playhead, { frame: 208, ease: "none", duration: stepDur, onUpdate: renderFrame }, 7 * stepDur);
          tl.to(playhead, { frame: 253, ease: "none", duration: stepDur, onUpdate: renderFrame }, 9 * stepDur);
          tl.to(playhead, { frame: 303, ease: "none", duration: stepDur, onUpdate: renderFrame }, 11 * stepDur);
          tl.to(playhead, { frame: 355, ease: "none", duration: stepDur, onUpdate: renderFrame }, 13 * stepDur);
        }

        // --- 3. MOBILE TEXT ANIMATION SEQUENCE (GSAP NATIVE) ---
        if (isMobile) {
          const stepDur = totalDuration / 22;
          
          // Fold 0 (Hero)
          const heroOverlay = document.querySelector('.mobile-hero-overlay');
          if (heroOverlay) {
            tl.fromTo(heroOverlay, 
              { autoAlpha: 0, y: 20 }, 
              { autoAlpha: 1, y: 0, duration: 0.5 * stepDur, ease: "power2.out" }, 
              0
            );
            tl.to(heroOverlay, 
              { autoAlpha: 0, y: -20, duration: 0.5 * stepDur, ease: "power2.in" }, 
              1 * stepDur - 0.1
            );
          }

          // Folds 1 to 10
          const foldRefs = [fold1Ref, fold2Ref, fold3Ref, fold4Ref, fold5Ref, fold6Ref, fold7Ref, fold8Ref, fold9Ref, fold10Ref];
          
          foldRefs.forEach((ref, index) => {
            const n = index + 1; // 1 to 10
            const startT = (n * 2) * stepDur;
            const endT = (n * 2 + 1) * stepDur;
            
            if (ref.current) {
                // Fade In
                tl.to(ref.current, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8 * stepDur,
                    ease: "power2.out"
                }, startT);
                
                // Fade Out
                tl.to(ref.current, {
                    autoAlpha: 0,
                    y: -20,
                    scale: 0.95,
                    duration: 0.6 * stepDur,
                    ease: "power2.in"
                }, endT - (0.4 * stepDur));
            }
          });
        }


        // --- 2. TEXT ANIMATION SEQUENCE (DESKTOP ONLY) ---
        if (!isMobile) {
          // On desktop, fade in starts 75% into the pan (p_S + 1.5).
          const t2 = p2S + 1.5;
          const t3 = p3S + 1.5;
          const t4 = p4S + 1.5;
          const t5 = p5S + 1.5;
          const t6 = p6S + 1.5;
          const t7 = p7S + 1.5;

          // Fold 1: Get Well Clinic
          tl.fromTo([fold1Card1Ref.current, fold1Card2Ref.current], 
            { autoAlpha: 0, y: yOffsetSmall }, 
            { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 
            p1E
          );
          tl.to(fold1Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p2S - 0.1);

          // Fold 2: Dr. Ankur Gupta
          const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
          const descSplit = new SplitText(descRef.current, { type: "words" });
          tl.to(fold2Ref.current, { autoAlpha: 1, duration: 0.1 }, t2);
          tl.fromTo(fold2Box1Ref.current, { autoAlpha: 0, x: -xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t2);
          tl.fromTo(titleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t2 + 0.1);
          tl.fromTo(descSplit.words, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, t2 + 0.3);
          tl.fromTo(actionRef.current, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, t2 + 0.5);
          tl.to(fold2Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p3S - 0.1);

          // Fold 3: Acupuncture Therapy
          const fold3TitleSplit = new SplitText(fold3TitleRef.current, { type: "chars,words" });
          const fold3DescSplit = new SplitText(fold3DescRef.current, { type: "words" });
          tl.to(fold3Ref.current, { autoAlpha: 1, duration: 0.1 }, t3);
          tl.fromTo(fold3Box1Ref.current, { autoAlpha: 0, x: -xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t3);
          tl.fromTo(fold3Box2Ref.current, { autoAlpha: 0, x: xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t3);
          tl.fromTo(fold3TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t3 + 0.1);
          tl.fromTo(fold3ActionRef.current, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, t3 + 0.3);
          tl.fromTo(fold3DescSplit.words, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, t3 + 0.5);
          tl.to(fold3Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p4S - 0.1);

          // Fold 4: Preventive Healthcare
          const fold4TitleSplit = new SplitText(fold4TitleRef.current, { type: "chars,words" });
          const fold4DescSplit = new SplitText(fold4DescRef.current, { type: "words" });
          tl.to(fold4Ref.current, { autoAlpha: 1, duration: 0.1 }, t4);
          tl.fromTo(fold4Box1Ref.current, { autoAlpha: 0, x: -xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t4);
          tl.fromTo(fold4Box2Ref.current, { autoAlpha: 0, x: xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t4);
          tl.fromTo(fold4TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t4 + 0.1);
          tl.fromTo(fold4ActionRef.current, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, t4 + 0.3);
          tl.fromTo(fold4DescSplit.words, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, t4 + 0.5);
          tl.to(fold4Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p5S - 0.1);

          // Fold 5: Advanced ENT Care
          const fold5TitleSplit = new SplitText(fold5TitleRef.current, { type: "chars,words" });
          const fold5DescSplit = new SplitText(fold5DescRef.current, { type: "words" });
          tl.to(fold5Ref.current, { autoAlpha: 1, duration: 0.1 }, t5);
          tl.fromTo(fold5Box1Ref.current, { autoAlpha: 0, x: -xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t5);
          tl.fromTo(fold5Box2Ref.current, { autoAlpha: 0, x: xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t5);
          tl.fromTo(fold5TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t5 + 0.1);
          tl.fromTo(fold5ActionRef.current, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, t5 + 0.3);
          tl.fromTo(fold5DescSplit.words, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, t5 + 0.5);
          tl.to(fold5Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p6S - 0.1);

          // Fold 6: The Legacy of Care (Dr. Ashok K. Gulati)
          const fold6TitleSplit = new SplitText(fold6TitleRef.current, { type: "chars,words" });
          const fold6DescSplit = new SplitText(fold6DescRef.current, { type: "words" });
          tl.to(fold6Ref.current, { autoAlpha: 1, duration: 0.1 }, t6);
          tl.fromTo(fold6Box1Ref.current, { autoAlpha: 0, x: -xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t6);
          tl.fromTo(fold6Box2Ref.current, { autoAlpha: 0, x: xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t6);
          tl.fromTo(fold6TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t6 + 0.1);
          tl.fromTo(fold6ActionRef.current, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, t6 + 0.3);
          tl.fromTo(fold6DescSplit.words, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, t6 + 0.5);
          tl.to(fold6Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p7S - 0.1);

          // Fold 7: Chronic Care Management
          const fold7TitleSplit = new SplitText(fold7TitleRef.current, { type: "chars,words" });
          const fold7DescSplit = new SplitText(fold7DescRef.current, { type: "words" });
          tl.to(fold7Ref.current, { autoAlpha: 1, duration: 0.1 }, t7);
          tl.fromTo(fold7Box1Ref.current, { autoAlpha: 0, x: -xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t7);
          tl.fromTo(fold7Box2Ref.current, { autoAlpha: 0, x: xOffsetLarge }, { autoAlpha: 1, x: 0, ease: "power2.out", duration: 0.1 }, t7);
          tl.fromTo(fold7TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t7 + 0.1);
          tl.fromTo(fold7ActionRef.current, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.1 }, t7 + 0.3);
          tl.fromTo(fold7DescSplit.words, { opacity: 0, y: yOffsetSmall }, { opacity: 1, y: 0, stagger: 0.01, ease: "power2.out", duration: 0.2 }, t7 + 0.5);
          tl.to(fold7Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p8S - 0.1);

          // Fold 8: Patient Reviews
          const t8 = p8S + 1.5;
          const fold8TitleSplit = new SplitText(fold8TitleRef.current, { type: "chars,words" });
          tl.to(fold8Ref.current, { autoAlpha: 1, duration: 0.1 }, t8);
          tl.fromTo(fold8Box1Ref.current, { autoAlpha: 0, y: yOffsetLarge }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.2 }, t8);
          tl.fromTo(fold8TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t8 + 0.1);
          tl.to(fold8Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p9S - 0.1);

          // Fold 9: Clinic Facilities (Maven Option C)
          const t9 = p9S + 1.5;
          const fold9TitleSplit = new SplitText(fold9TitleRef.current, { type: "chars,words" });
          tl.to(fold9Ref.current, { autoAlpha: 1, duration: 0.1 }, t9);
          tl.fromTo(fold9Box1Ref.current, { autoAlpha: 0, y: yOffsetLarge }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.2 }, t9);
          tl.fromTo(fold9TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t9 + 0.1);
          tl.to(fold9Ref.current, { autoAlpha: 0, ease: "none", duration: 0.1 }, p10S - 0.1);

          // Fold 10: Patient Knowledge Hub
          const t10 = p10S + 1.5;
          const fold10TitleSplit = new SplitText(fold10TitleRef.current, { type: "chars,words" });
          tl.to(fold10Ref.current, { autoAlpha: 1, duration: 0.1 }, t10);
          tl.fromTo(fold10Box1Ref.current, { autoAlpha: 0, y: yOffsetLarge }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.2 }, t10);
          tl.fromTo(fold10TitleSplit.chars, { opacity: 0, y: yOffsetLarge }, { opacity: 1, y: 0, stagger: 0.01, ease: "power3.out", duration: 0.2 }, t10 + 0.1);
        }

        // Pad timeline to exact total duration
        tl.set({}, {}, totalDuration);
      }, 50);

    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-dom overflow-hidden z-10 flex items-center justify-between px-8 md:px-24">
      <div className={`absolute inset-0 z-[5] bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent pointer-events-none md:hidden transition-opacity duration-700 ease-in-out ${textFold > 0 ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Wayfinding Dots (Mobile Only) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 md:hidden flex">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(f => (
          <div key={f} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${textFold === f ? 'bg-white scale-150 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`} />
        ))}
      </div>
      
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-all duration-700 ease-out" 
        style={{ filter: `blur(${canvasBlur}px)` }}
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
      <div ref={fold1Ref} className={`absolute inset-0 z-10 w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 max-md:items-end max-md:pb-[15vh] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
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
          <div ref={fold1Card1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-8 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-md relative overflow-hidden group text-left flex flex-col items-start">
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
              className="text-2xl md:text-3xl font-light text-[oklch(91%_0_0)] max-md:text-[#0f4c75] leading-tight mb-4 tracking-tight"
            />
            
            <BlurText
              text="Your premier destination for healthcare in South Delhi. Call ahead to book an appointment with our specialists and avoid long queues."
              delay={50}
              animateBy="words"
              direction="top"
              className="text-white max-md:text-slate-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-sm font-normal leading-relaxed mb-6"
            />

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="https://maps.google.com/?q=D-696,+Opp.+Market+No.+2,+C.R.+Park,+New+Delhi,+110019" target="_blank" rel="noreferrer" className="px-6 py-4 min-h-[48px] min-w-[48px] bg-[#D4AF37] text-[#0A0A0A] font-semibold rounded-sm transition-colors hover:bg-[#F3E5AB] border-none text-xs tracking-wide text-center">
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
          <div ref={fold1Card2Ref} className="max-w-sm text-right bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-6 md:p-8 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform">
            <ShinyText 
              text="Book Your Consultation"
              disabled={false} 
              speed={3} 
              className="text-xl font-semibold uppercase tracking-widest mb-4 text-[oklch(91%_0_0)] max-md:text-[#0f4c75]" 
              color="oklch(91% 0 0)"
              shineColor="#D4AF37"
            />
            <p className="text-white max-md:text-slate-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 mb-6 font-normal text-sm leading-relaxed">
              Schedule an appointment with our expert general physicians or experience holistic acupuncture therapy.
            </p>
            <button onClick={() => setServicesModalOpen(true)} className="inline-block bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors duration-300 text-[#0A0A0A] font-bold py-4 px-8 min-h-[48px] min-w-[48px] rounded-sm text-xs md:text-sm tracking-wide cursor-pointer">
              Discover Services
            </button>
          </div>
        </div>

      </div>

      {/* Fold 2 Overlays (Dr. Ankur Gupta) */}
      <div ref={fold2Ref} className={`absolute inset-0 z-20 w-full h-full flex items-center justify-center px-4 max-md:items-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold2Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/40 max-md:bg-white/95 backdrop-blur-3xl border border-white/20 max-md:border-[#e2e8f0] p-6 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[90vw] md:max-w-4xl pointer-events-auto relative overflow-hidden group flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          
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

            <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-light text-white max-md:text-slate-900 leading-tight mb-2 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
              {textFold === 2 ? <BlurText text="Dr. Ankur Gupta" delay={50} /> : "Dr. Ankur Gupta"}
            </h2>
            <p className="text-acc/80 text-sm md:text-base font-medium tracking-wide uppercase mb-8">Senior ENT Specialist & General Physician</p>

            <div className="pl-6 border-l-2 border-acc/30 mb-8 relative">
              <div className="absolute -left-[2px] top-0 h-1/3 w-[2px] bg-acc"></div>
              <p ref={descRef} className="text-white max-md:text-slate-900/90 text-lg md:text-xl font-light leading-relaxed italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200">
                "Healing begins with precision and compassion. Proactive health monitoring is the cornerstone of a vibrant life."
              </p>
            </div>
            
            <div ref={actionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 hidden md:flex">
              <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-xs md:text-sm tracking-wide text-center">
                Schedule Appointment
              </button>
              <button onClick={() => setServicesModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
                Read Full Profile
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-4 md:pl-8 md:border-l border-white/10">
            <div className="bg-black/40 max-md:bg-slate-50 p-6 rounded-xl border border-white/5 max-md:border-slate-200 hover:border-acc/30 transition-colors">
              <h4 className="text-acc text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acc"></span> 15+ Years Clinical Excellence
              </h4>
              <p className="text-white max-md:text-slate-900/70 text-sm font-light leading-relaxed">Delivering expert general medical care and specializing in proactive health screening for the modern patient.</p>
            </div>
            <div className="bg-black/40 max-md:bg-slate-50 p-6 rounded-xl border border-white/5 max-md:border-slate-200 hover:border-acc/30 transition-colors">
              <h4 className="text-acc text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acc"></span> Advanced ENT Care
              </h4>
              <p className="text-white max-md:text-slate-900/70 text-sm font-light leading-relaxed">Fellowship trained in advanced endoscopic surgery, acute infections, and complex fever management.</p>
            </div>
            <div className="bg-black/40 max-md:bg-slate-50 p-6 rounded-xl border border-white/5 max-md:border-slate-200 hover:border-acc/30 transition-colors">
              <h4 className="text-acc text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acc"></span> Core Philosophy
              </h4>
              <p className="text-white max-md:text-slate-900/70 text-sm font-light leading-relaxed">Emphasizing preventative healthcare to keep you at your best, catching potential issues before they escalate.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 md:hidden">
              <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-xs md:text-sm tracking-wide text-center">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fold 3 Overlay (Acupuncture Therapy) */}
      <div ref={fold3Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Title and CTAs */}
        <div ref={fold3Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative overflow-hidden group">
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

          <h2 ref={fold3TitleRef} className="text-2xl md:text-5xl font-light text-white max-md:text-slate-900 leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
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
        <div ref={fold3Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative overflow-hidden group md:ml-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/80"></div>
           <p ref={fold3DescRef} className={`text-white max-md:text-slate-900 text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-left ${!expandedFolds[3] ? 'max-md:line-clamp-2' : ''}`}>
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
      <div ref={fold4Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Description */}
        <div ref={fold4Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative overflow-hidden group md:mr-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-acc/80"></div>
           <p ref={fold4DescRef} className={`text-white max-md:text-slate-900 text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-right ${!expandedFolds[4] ? 'max-md:line-clamp-2' : ''}`}>
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
        <div ref={fold4Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative overflow-hidden group">
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

          <h2 ref={fold4TitleRef} className="text-2xl md:text-5xl font-light text-white max-md:text-slate-900 leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100 text-right">
            {textFold === 4 ? <ReactBitsSplitText text="Preventive Healthcare" splitType="chars" delay={30} /> : "Preventive Healthcare"}
          </h2>
          
          <div ref={fold4ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View Benefits
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-xs md:text-sm tracking-wide text-center">
              Book Check-up
            </button>
          </div>
        </div>

      </div>

      {/* Fold 5 Overlay (Advanced ENT Care) */}
      <div ref={fold5Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Description */}
        <div ref={fold5Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative overflow-hidden group md:mr-8 text-left w-full md:w-auto">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-white/60"></div>
           <p ref={fold5DescRef} className={`text-white max-md:text-slate-900 text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-left ${!expandedFolds[5] ? 'max-md:line-clamp-2' : ''}`}>
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
        <div ref={fold5Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative overflow-hidden group md:ml-8 md:text-right flex flex-col md:items-end w-full md:w-auto">
          {/* White Hairline */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/60"></div>
          
          <div className="flex items-center justify-end space-x-4 mb-8">
            <ShinyText 
              text="Diagnostic Precision"
              speed={3} 
              className="text-xs font-medium uppercase tracking-[0.2em] text-white max-md:text-slate-900" 
              color="#ffffff"
              shineColor="#00E5FF"
            />
            <span className="w-8 h-[1px] bg-white/40"></span>
          </div>

          <h2 ref={fold5TitleRef} className="text-2xl md:text-6xl font-light text-white max-md:text-slate-900 leading-tight mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
            ENT Specialists
          </h2>
          
          <div ref={fold5ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View ENT Services
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-xs md:text-sm tracking-wide text-center">
              Consult Specialist
            </button>
          </div>
        </div>

      </div>

      {/* Fold 6 Overlay (The Legacy of Care - Dr. Ashok K. Gulati) */}
      <div ref={fold6Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center px-4 max-md:justify-center max-md:items-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 gap-6 md:gap-12 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Medical Philosophy & Title */}
        <div ref={fold6Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/40 max-md:bg-white/95 backdrop-blur-3xl border border-white/20 max-md:border-[#e2e8f0] p-6 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[90vw] md:max-w-xl pointer-events-auto relative overflow-hidden group">
          
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

            <h2 ref={fold6TitleRef} className="text-3xl md:text-5xl lg:text-6xl font-light text-white max-md:text-slate-900 leading-tight mb-2 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
              {textFold === 6 ? <ReactBitsSplitText text="Dr. Ashok K. Gulati" splitType="words" delay={40} /> : "Dr. Ashok K. Gulati"}
            </h2>
            <p className="text-[#D4AF37]/80 text-sm md:text-base font-medium tracking-wide uppercase mb-8">Senior Consultant Physician</p>

            <div className="pl-6 border-l-2 border-[#D4AF37]/30 mb-8 relative">
              <div className="absolute -left-[2px] top-0 h-1/3 w-[2px] bg-[#D4AF37]"></div>
              <p ref={fold6DescRef} className="text-white max-md:text-slate-900/90 text-lg md:text-xl font-light leading-relaxed italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200">
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
        <div ref={fold6Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/40 max-md:bg-white/95 backdrop-blur-3xl border border-white/20 max-md:border-[#e2e8f0] p-6 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[90vw] md:max-w-md pointer-events-auto relative overflow-hidden group flex flex-col space-y-4">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
          
          <div className="bg-black/40 max-md:bg-slate-50 p-5 rounded-xl border border-white/5 max-md:border-slate-200 hover:border-[#D4AF37]/30 transition-colors">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 40+ Years Legacy
            </h4>
            <p className="text-white max-md:text-slate-900/70 text-sm font-light leading-relaxed">Dedicated community practice serving generations of families in South Delhi with unmatched diagnostic acumen.</p>
          </div>
          <div className="bg-black/40 max-md:bg-slate-50 p-5 rounded-xl border border-white/5 max-md:border-slate-200 hover:border-[#D4AF37]/30 transition-colors">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Internal Medicine
            </h4>
            <p className="text-white max-md:text-slate-900/70 text-sm font-light leading-relaxed">Specialized in managing complex chronic conditions including severe diabetes, hypertension, and multi-system disorders.</p>
          </div>
          <div className="bg-black/40 max-md:bg-slate-50 p-5 rounded-xl border border-white/5 max-md:border-slate-200 hover:border-[#D4AF37]/30 transition-colors">
            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Fellowship & Academia
            </h4>
            <p className="text-white max-md:text-slate-900/70 text-sm font-light leading-relaxed">MBBS, MD (Internal Medicine). Member of the esteemed Physicians Association and regular contributor to medical symposia.</p>
          </div>
        </div>

      </div>

      {/* Fold 7 Overlay (Chronic Care Management) */}
      <div ref={fold7Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 gap-3 md:gap-0 mt-8 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        {/* Left Side: Title and CTAs */}
        <div ref={fold7Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[85vw] md:max-w-xl pointer-events-auto relative overflow-hidden group">
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

          <h2 ref={fold7TitleRef} className="text-2xl md:text-5xl font-light text-white max-md:text-slate-900 leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100">
            {textFold === 7 ? <BlurText text="Chronic Care Management" delay={60} /> : "Chronic Care Management"}
          </h2>
          
          <div ref={fold7ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px] bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-xs md:text-sm tracking-wide text-center">
              Care Programs
            </button>
            <button onClick={() => setContactModalOpen(true)} className="text-acc text-xs md:text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              Talk to a Doctor
            </button>
          </div>
        </div>

        {/* Right Side: Description */}
        <div ref={fold7Box2Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform max-w-[85vw] md:max-w-md pointer-events-auto relative overflow-hidden group md:ml-8 text-left md:text-right w-full md:w-auto">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-acc/80"></div>
           <p ref={fold7DescRef} className={`text-white max-md:text-slate-900 text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200 text-left ${!expandedFolds[7] ? 'max-md:line-clamp-2' : ''}`}>
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
      <div ref={fold8Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold8Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 max-md:bg-white/95 backdrop-blur-2xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-z-[20px] will-change-transform w-full max-w-[95vw] md:max-w-6xl pointer-events-auto relative overflow-hidden flex flex-col items-center">
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

          <h2 ref={fold8TitleRef} className="text-2xl md:text-5xl font-light text-white max-md:text-slate-900 leading-tight mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
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
                        <Star key={i} size={14} className={i < Math.floor(review.rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-white max-md:text-slate-900/20 fill-transparent"} />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-white max-md:text-slate-900/40">{review.source}</span>
                  </div>
                  <p className="text-sm md:text-base text-white max-md:text-slate-900/90 leading-relaxed font-light mb-6 italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <span className="text-[#D4AF37] font-medium text-sm">{review.author}</span>
                  <span className="text-white max-md:text-slate-900/30 text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* Fold 9 Overlay (Clinic Facilities - Option C) */}
      <div ref={fold9Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold9Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform translate-z-[20px] will-change-transform w-full max-w-[95vw] md:max-w-6xl pointer-events-auto relative overflow-hidden flex flex-col items-center">
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

          <h2 ref={fold9TitleRef} className="text-3xl md:text-5xl font-light text-white max-md:text-slate-900 leading-tight mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
            {textFold === 9 ? <BlurText text="Comprehensive Care Facilities" delay={50} /> : "Comprehensive Care Facilities"}
          </h2>
          
          {/* Maven-style High-Contrast Carousel */}
          <div className="w-full overflow-x-auto snap-x snap-mandatory flex space-x-6 pb-6 pt-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Card 1 */}
            <div className="snap-center shrink-0 w-[80vw] md:w-[380px] bg-white border border-white/10 rounded-2xl max-md:rounded-[24px] p-8 flex flex-col hover:scale-[1.02] transition-transform duration-500 shadow-xl group">
              <div className="bg-[#1A1A1B] w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500">
                <span className="text-[#D4AF37] group-hover:text-white max-md:text-slate-900 transition-colors duration-500">
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
            <div className="snap-center shrink-0 w-[80vw] md:w-[380px] bg-white border border-white/10 rounded-2xl max-md:rounded-[24px] p-8 flex flex-col hover:scale-[1.02] transition-transform duration-500 shadow-xl group">
              <div className="bg-[#1A1A1B] w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500">
                <span className="text-[#D4AF37] group-hover:text-white max-md:text-slate-900 transition-colors duration-500">
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
            <div className="snap-center shrink-0 w-[80vw] md:w-[380px] bg-white border border-white/10 rounded-2xl max-md:rounded-[24px] p-8 flex flex-col hover:scale-[1.02] transition-transform duration-500 shadow-xl group">
              <div className="bg-[#1A1A1B] w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-500">
                <span className="text-[#D4AF37] group-hover:text-white max-md:text-slate-900 transition-colors duration-500">
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
      <div ref={fold10Ref} className={`absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 max-md:justify-end max-md:pb-[15vh] md:px-24 pointer-events-none opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:opacity-0 max-md:translate-y-12 max-md:scale-95 will-change-[transform,opacity]`}>
        
        <div ref={fold10Box1Ref} style={{ WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/60 max-md:bg-white/95 backdrop-blur-3xl border border-white/20 max-md:border-[#e2e8f0] p-4 md:p-14 rounded-2xl max-md:rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform translate-z-[20px] will-change-transform w-full max-w-[95vw] md:max-w-6xl pointer-events-auto relative overflow-hidden flex flex-col items-start text-left">
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

          <h2 ref={fold10TitleRef} className="text-2xl md:text-5xl font-light text-white max-md:text-slate-900 leading-tight mb-8 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {textFold === 10 ? <BlurText text="Patient Knowledge Hub" delay={50} /> : "Patient Knowledge Hub"}
          </h2>
          
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 pb-6">
            
            {/* Filter Section (Left Sidebar style) */}
            <div className="flex flex-col space-y-6 w-full lg:w-1/4 shrink-0">
              <div>
                <h3 className="text-white max-md:text-slate-900/80 uppercase tracking-widest text-xs font-bold mb-4">Top Challenges</h3>
                <ul className="space-y-3">
                  <li><button className="text-white max-md:text-slate-900 hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">Chronic Care Routines</button></li>
                  <li><button className="text-white max-md:text-slate-900 hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">Managing Seasonal Allergies</button></li>
                  <li><button className="text-white max-md:text-slate-900 hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">ENT Infection Prevention</button></li>
                  <li><button className="text-white max-md:text-slate-900 hover:text-acc transition-colors text-sm font-medium w-full text-left bg-white/5 px-4 py-2 rounded border-l-2 border-transparent hover:border-acc">Pediatric Immunity</button></li>
                </ul>
              </div>
            </div>

            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Card 1 */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col hover:border-acc/50 transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                </div>
                <span className="text-acc text-xs uppercase tracking-widest font-semibold mb-3 z-10">Guide</span>
                <h4 className="text-xl text-white max-md:text-slate-900 font-medium mb-3 z-10">The Ultimate Guide to ENT Hygiene</h4>
                <p className="text-white max-md:text-slate-900/60 text-sm leading-relaxed mb-6 z-10 line-clamp-2 md:line-clamp-none">Learn the best practices to maintain ear, nose, and throat health during the heavily polluted winter months in Delhi.</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between z-10">
                  <span className="text-white max-md:text-slate-900/40 text-xs">5 min read</span>
                  <span className="text-acc group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col hover:border-acc/50 transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
                </div>
                <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-3 z-10">Webinar</span>
                <h4 className="text-xl text-white max-md:text-slate-900 font-medium mb-3 z-10">Demystifying Acupuncture</h4>
                <p className="text-white max-md:text-slate-900/60 text-sm leading-relaxed mb-6 z-10 line-clamp-2 md:line-clamp-none">Watch Dr. Swarajit Ghosh explain the modern clinical applications of acupuncture therapy for severe chronic pain management.</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between z-10">
                  <span className="text-white max-md:text-slate-900/40 text-xs">45 min watch</span>
                  <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col hover:border-acc/50 transition-colors group cursor-pointer relative overflow-hidden md:col-span-2">
                 <span className="text-white max-md:text-slate-900/50 text-xs uppercase tracking-widest font-semibold mb-3 z-10">Success Story</span>
                 <div className="flex flex-col md:flex-row gap-6 items-start md:items-center z-10">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A1B] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                       <Star className="text-[#D4AF37] fill-[#D4AF37]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl text-white max-md:text-slate-900 font-medium mb-2">Overcoming 10 Years of Migraines</h4>
                      <p className="text-white max-md:text-slate-900/70 text-sm leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">Read how a tailored approach combining general medicine and targeted acupuncture helped one of our long-term patients achieve a pain-free life.</p>
                    </div>
                    <div className="md:ml-auto mt-4 md:mt-0">
                      <button className="px-6 py-2 border border-white/20 max-md:border-[#e2e8f0] text-white max-md:text-slate-900 rounded hover:bg-white hover:text-black transition-colors text-sm font-medium shrink-0">Read Case Study</button>
                    </div>
                 </div>
              </div>
              
            </div>

          </div>
          
        </div>
      </div>

            {/* Extracted Modals for Aggressive Memoization */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
      <ServicesModal isOpen={isServicesModalOpen} onClose={() => setServicesModalOpen(false)} scrollToFold={scrollToFold} />
      
      {/* Hide scrollbar for carousel style */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
