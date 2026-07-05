import React, { useEffect, useState } from 'react';
import BlurText from './BlurText';
import MagicRings from './react-bits/MagicRings';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const totalFrames = 52 + 51 + 54 + 52 + 45 + 50 + 52; // heroscroll2 (52), heroscroll3 (51), heroscroll4 (54), heroscroll5 (52), heroscroll6 (45), heroscroll7 (50), heroscroll8 (52)

  useEffect(() => {
    let loadedCount = 0;
    
    // Mathematically track caching of all 103 high-res frames
    for (let i = 1; i <= 52; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll2/scene-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 1; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll3/scene-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 53; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll4/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll5/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 44; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll6/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 49; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll7/rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = checkLoad;
      img.onerror = checkLoad;
    }

    for (let i = 0; i <= 51; i++) {
      const img = new Image();
      img.src = `/assets/heroscroll8/two-stylized-line-drawn-characters-one-helping-an-ezremove_${i.toString().padStart(3, '0')}.jpg`;
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

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0c] overflow-hidden pointer-events-none">
      
      {/* Medical Scanner Rings Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-auto">
        <MagicRings 
          color="#d4af37" 
          colorTwo="#00e5ff" 
          speed={0.8}
          ringCount={8}
          baseRadius={0.2}
          attenuation={15}
          followMouse={true}
          mouseInfluence={0.2}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Simple Cyan Medical Cross */}
        <svg className="w-12 h-12 mb-6 text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10h-5V5c0-1.1-.9-2-2-2h-0c-1.1 0-2 .9-2 2v5H5c-1.1 0-2 .9-2 2v0c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h0c1.1 0 2-.9 2-2v-5h5c1.1 0 2-.9 2-2v-0c0-1.1-.9-2-2-2z"/>
        </svg>

        <BlurText 
          text="GET WELL CLINIC" 
          delay={50} 
          animateBy="words"
          direction="top"
          className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#d4af37]"
        />
      </div>
      
      {/* Neo Kinpaku Progress Bar */}
      <div className="relative z-10 w-64 md:w-96 h-[2px] bg-white/5 overflow-hidden mt-12 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#d4af37] to-[#00e5ff] transition-all duration-300 ease-out shadow-[0_0_10px_#d4af37]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="relative z-10 mt-4 text-[#d4af37]/70 font-mono tracking-widest text-xs uppercase">
        {progress < 100 ? `INITIALIZING CINEMATIC EXPERIENCE — ${progress}%` : 'READY'}
      </div>
    </div>
  );
}
