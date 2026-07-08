import { useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A deep module for managing the cinematic 3D scroll sequence.
 * This extracts all GSAP Timeline logic, ScrollTrigger calculations, and Canvas WebGL/2D rendering
 * out of the UI layer.
 */
export function useScrollSequence({ images, canvasRef, containerRef, scrollIndicatorRef }) {
  const [bgFold, setBgFold] = useState(1);
  const [textFold, setTextFold] = useState(1);

  useLayoutEffect(() => {
    if (!images || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    
    const drawImageCover = (ctx, img, canvas, frameIndex) => {
      if (!img) return;
      const isMobileCanvas = window.innerWidth < 768;
      // On mobile, cap the height ratio to 75% to prevent excessive zoom
      const heightRatio = isMobileCanvas ? (canvas.height * 0.75) / img.height : canvas.height / img.height;
      const ratio = Math.max(canvas.width / img.width, heightRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    const isMobileForDpr = window.innerWidth < 768;
    const handleResize = () => {
      const dpr = isMobileForDpr ? 1 : (window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.imageSmoothingEnabled = !isMobileForDpr;
      ctx.imageSmoothingQuality = 'high';

      if (images[Math.round(playhead.frame)]) {
        drawImageCover(ctx, images[Math.round(playhead.frame)], canvas, Math.round(playhead.frame));
      }
    };

    const playhead = { frame: isMobileForDpr ? 51 : 0 };
    window.addEventListener('resize', handleResize);
    handleResize(); 

    let mm = gsap.matchMedia();
    let tl;

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

      const scrollEnd = isMobile ? "+=4500%" : "+=3000%";
      const scrubValue = isMobile ? 1.2 : 1.5;

      const buildTimelineTimer = setTimeout(() => {
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
                 if (newBgFold > 8) newBgFold = 8; 
                 
                 let newTextFold = (step % 2 === 0) ? (step / 2) : null;
                 if (step >= 20) newTextFold = 10;
                 
                 setBgFold(prev => prev !== newBgFold ? newBgFold : prev);
                 
                 if (newTextFold !== null) {
                   setTextFold(prev => prev !== newTextFold ? newTextFold : prev);
                   const dots = document.querySelectorAll('.mobile-nav-dot');
                   dots.forEach(dot => {
                     if (parseInt(dot.getAttribute('data-fold')) === newTextFold) {
                       dot.classList.add('bg-white', 'scale-150', 'shadow-[0_0_8px_rgba(255,255,255,0.8)]');
                       dot.classList.remove('bg-white/20');
                     } else {
                       dot.classList.remove('bg-white', 'scale-150', 'shadow-[0_0_8px_rgba(255,255,255,0.8)]');
                       dot.classList.add('bg-white/20');
                     }
                   });
                 }
                  
                 // DOM modifications directly for performance
                 if (canvasRef.current) canvasRef.current.style.filter = step % 2 === 0 ? 'blur(8px)' : 'none';
                  
                 if (self && typeof self.getVelocity === 'function' && scrollIndicatorRef?.current) {
                    const velocity = Math.abs(self.getVelocity());
                    const indicator = scrollIndicatorRef.current;
                    if (velocity > 1500) indicator.style.opacity = '0.3';
                    else if (velocity > 500) indicator.style.opacity = '0.6';
                    else indicator.style.opacity = '1';
                 }
              }
            },
            snap: false
          }
        });

        function renderFrame() {
          const currentFrame = Math.round(playhead.frame);
          if (images[currentFrame]) {
            drawImageCover(ctx, images[currentFrame], canvas, currentFrame);
          }
        };

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
          const stepDur = totalDuration / 22;
          tl.to(playhead, { frame: 102, ease: "none", duration: stepDur, onUpdate: renderFrame }, 3 * stepDur);
          tl.to(playhead, { frame: 156, ease: "none", duration: stepDur, onUpdate: renderFrame }, 5 * stepDur);
          tl.to(playhead, { frame: 208, ease: "none", duration: stepDur, onUpdate: renderFrame }, 7 * stepDur);
          tl.to(playhead, { frame: 253, ease: "none", duration: stepDur, onUpdate: renderFrame }, 9 * stepDur);
          tl.to(playhead, { frame: 303, ease: "none", duration: stepDur, onUpdate: renderFrame }, 11 * stepDur);
          tl.to(playhead, { frame: 355, ease: "none", duration: stepDur, onUpdate: renderFrame }, 13 * stepDur);
        }
      }, 50); 
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
      if (tl) tl.kill();
    };
  }, [images, canvasRef, containerRef, scrollIndicatorRef]);

  return { bgFold, textFold };
}
