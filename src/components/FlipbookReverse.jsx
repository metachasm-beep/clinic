import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlipbookReverse() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 65; // Same sequence length

  // Preload Images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Using the same sequence
      img.src = `/assets/heroscroll_new/scene-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useLayoutEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const drawImageTiled = (ctx, img, canvas) => {
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const tileWidth = canvas.width / 4;
      const tileHeight = img.height * (tileWidth / img.width);
      
      const yOffset = (canvas.height - tileHeight) / 2;

      for (let i = 0; i < 4; i++) {
        const xOffset = i * tileWidth;
        ctx.drawImage(img, 0, 0, img.width, img.height, xOffset, yOffset, tileWidth, tileHeight);
      }
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
        drawImageTiled(ctx, images[Math.round(playhead.frame)], canvas);
      }
    };

    // Start at the LAST frame
    const playhead = { frame: frameCount - 1 };
    window.addEventListener('resize', handleResize);
    handleResize(); 

    const ctxGsap = gsap.context(() => {
      // Animate BACK to frame 0
      gsap.to(playhead, {
        frame: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // complete in 2 scrolls
          scrub: 1.5, // buttery smooth scrub
          pin: true,
        },
        onUpdate: () => {
          if (images[Math.round(playhead.frame)]) {
            drawImageTiled(ctx, images[Math.round(playhead.frame)], canvas);
          }
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden z-10">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none" 
      />
    </section>
  );
}
