import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ShinyText from './ShinyText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AcupunctureHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const actionRef = useRef(null);

  const [images, setImages] = useState([]);
  const frameCount = 54; // heroscroll4 frames

  // Preload Images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    // Load heroscroll4 (frames 0-53)
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll4/pan_camera_to_right_rapidly_to_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
      loadedImages[i] = img;
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
          end: "+=200%", // 2 scrolls for 54 frames
          scrub: 1, // slightly snappier scrub than 1.5
          pin: true,
        }
      });

      // 1. Animate canvas playhead
      tl.to(playhead, {
        frame: frameCount - 1,
        ease: "none",
        duration: 1,
        onUpdate: () => {
          const currentFrame = Math.round(playhead.frame);
          if (images[currentFrame]) {
            drawImageCover(ctx, images[currentFrame], canvas, currentFrame);
          }
        }
      }, 0);

      // --- TEXT OVERLAY ANIMATIONS (Impeccable Style) ---
      
      const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
      const descSplit = new SplitText(descRef.current, { type: "words" });

      // Keep it hidden for the first 20% of the scroll to allow video to play a bit
      // Bring in the Container
      tl.fromTo(textRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, ease: "power2.out", duration: 0.1 }, 0.2);

      // Reveal the Title
      tl.fromTo(titleSplit.chars, 
        { filter: 'blur(8px)', opacity: 0, y: 20 }, 
        { filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.002, ease: "power3.out", duration: 0.1 }, 
        0.25
      );

      // Reveal the Description
      tl.fromTo(descSplit.words, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, stagger: 0.002, ease: "power2.out", duration: 0.08 }, 
        0.3
      );

      // Pop in the buttons
      tl.fromTo(actionRef.current, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.05 }, 
        0.35
      );

    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050B14] overflow-hidden z-10 flex items-center justify-end px-8 md:px-24">
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Fold 3 Overlay (Acupuncture Therapy) */}
      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-end px-8 md:px-24 pointer-events-none">
        <div ref={textRef} className="bg-dom border border-[#D4AF37]/30 p-10 md:p-14 rounded-sm shadow-2xl max-w-xl pointer-events-auto relative overflow-hidden opacity-0">
          
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

          <h2 ref={titleRef} className="text-4xl md:text-5xl font-light text-[#F8FAFC] leading-tight mb-6 tracking-tight">
            Acupuncture Therapy
          </h2>
          
          <p ref={descRef} className="text-[#CBD5E1] text-base md:text-lg font-normal leading-relaxed mb-10">
            Advanced holistic treatment by Dr. Swarajit Ghosh. Effective for chronic pain management, stress relief, and restoring bodily balance using traditional and modern techniques.
          </p>
          
          <div ref={actionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="px-8 py-4 bg-[#D4AF37] text-[#04090F] font-semibold rounded-sm transition-colors hover:bg-[#F3E5AB] border-none text-sm tracking-wide">
              Consult Specialist
            </button>
            <a href="#acupuncture" className="text-[#D4AF37] text-sm font-medium hover:text-[#F3E5AB] transition-colors border-b border-[#D4AF37]/30 hover:border-[#F3E5AB] pb-1">
              View Benefits
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
