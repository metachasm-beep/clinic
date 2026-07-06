import React, { useEffect, useState } from 'react';
import MagicRings from './react-bits/MagicRings';
import StarBorder from './react-bits/StarBorder';
import DecryptedText from './react-bits/DecryptedText';
import TextPressure from './react-bits/TextPressure';
import Magnet from './react-bits/Magnet';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const totalFrames = 52 + 51 + 54 + 52 + 45 + 50 + 52; // heroscroll2 (52), heroscroll3 (51), heroscroll4 (54), heroscroll5 (52), heroscroll6 (45), heroscroll7 (50), heroscroll8 (52)

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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0c] overflow-hidden pointer-events-auto" style={{ perspective: 1000 }}>
      
      {/* Medical Scanner Rings Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
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

      {/* Glassmorphic Central Hub */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform translate-z-[20px] will-change-transform"
      >
        <div className="w-64 h-24 mb-10 flex items-center justify-center pointer-events-auto">
          <TextPressure 
            text="GET WELL" 
            flex={true} 
            alpha={false} 
            stroke={false} 
            width={true} 
            weight={true} 
            italic={true} 
            textColor="#ffffff"
            minFontSize={36}
          />
        </div>

        <Magnet padding={20} disabled={false} magnetStrength={5}>
          <div className="flex flex-col items-center justify-center cursor-pointer pointer-events-auto">
            {/* Simple Cyan Medical Cross */}
            <svg className="w-16 h-16 mb-8 text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10h-5V5c0-1.1-.9-2-2-2h-0c-1.1 0-2 .9-2 2v5H5c-1.1 0-2 .9-2 2v0c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h0c1.1 0 2-.9 2-2v-5h5c1.1 0 2-.9 2-2v-0c0-1.1-.9-2-2-2z"/>
            </svg>

            {/* Neo Kinpaku Progress Bar wrapped in StarBorder */}
            <StarBorder color="#00e5ff" speed="4s" className="w-64 md:w-80 rounded-full p-1" thickness={2}>
              <div className="relative w-full h-[6px] bg-black/40 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#00e5ff] transition-all duration-300 ease-out shadow-[0_0_10px_#d4af37]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </StarBorder>

            <div className="mt-8 h-6 text-[#00e5ff] font-mono tracking-widest text-xs flex items-center justify-center pointer-events-none">
              <div key={loadingPhrase} className="uppercase">
                <DecryptedText 
                  text={loadingPhrase} 
                  animateOn="view" 
                  revealDirection="center"
                  speed={80}
                  maxIterations={15}
                  characters="⚕✚⚡01"
                />
              </div>
              <span className="ml-3 text-[#d4af37] font-bold">{progress}%</span>
            </div>
          </div>
        </Magnet>
      </div>
    </div>
  );
}
