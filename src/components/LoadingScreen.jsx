import React, { useEffect, useState } from 'react';
import DecryptedText from './react-bits/DecryptedText';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const totalFrames = 52 + 51 + 54 + 52 + 45 + 50 + 52; 

  useEffect(() => {
    let loadedCount = 0;
    
    // Mathematically track caching of all 103 high-res frames
    for (let i = 1; i <= 52; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll2/scene-${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 1; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll3/scene-${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 53; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll4/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll5/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 44; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll6/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 49; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll7/rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll8/two-stylized-line-drawn-characters-one-helping-an-ezremove_${i.toString().padStart(3, '0')}.webp`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    function checkLoad() {
      loadedCount++;
      setProgress(Math.round((loadedCount / totalFrames) * 100));
      
      if (loadedCount === totalFrames) {
        setTimeout(() => {
          onLoaded();
        }, 800);
      }
    }
  }, [onLoaded]);

  // Loading phase logic
  let loadingPhrase = "INITIALIZING HEALTH PROTOCOLS";
  if (progress > 25) loadingPhrase = "CALIBRATING DIAGNOSTIC TOOLS";
  if (progress > 50) loadingPhrase = "PREPARING WELLNESS JOURNEY";
  if (progress > 85) loadingPhrase = "READY FOR CONSULTATION";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[oklch(7%_0.006_95)] overflow-hidden pointer-events-auto">
      
      {/* Impeccable Geometry Layout */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg px-8">
        
        {/* Carved-tile Mark */}
        <div className="relative w-12 h-12 mb-6">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" fill="oklch(84% 0.19 80.46)" />
            <path d="M0 40L40 0" stroke="oklch(7% 0.006 95)" strokeWidth="4" />
          </svg>
        </div>

        {/* Wordmark */}
        <h1 
          className="text-[oklch(84%_0.19_80.46)] uppercase tracking-[0.15em] font-medium text-lg mb-12"
          style={{ fontFamily: "'Alumni Sans', sans-serif" }}
        >
          GET WELL CLINIC
        </h1>

        {/* 1px Gold Hairline Progress Track */}
        <div className="w-full h-[1px] bg-[oklch(78%_0_0_/_0.16)] mb-6 overflow-hidden">
          <div 
            className="h-full bg-[oklch(84%_0.19_80.46)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tiny Mono Typography & Decrypted Text */}
        <div className="w-full flex justify-between items-center text-[oklch(91%_0_0)] font-mono text-[0.72rem] tracking-[0.22em] uppercase">
          <div key={loadingPhrase} className="opacity-80">
            <DecryptedText 
              text={loadingPhrase} 
              animateOn="view" 
              revealDirection="start"
              speed={50}
              maxIterations={10}
              characters="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-"
            />
          </div>
          <div className="opacity-80 tabular-nums">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>
        
      </div>
    </div>
  );
}
