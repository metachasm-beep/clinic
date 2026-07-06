const fs = require('fs');
let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Add Imports
code = code.replace(/import React, \{.*\} from 'react';/, "import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';");
if (!code.includes("import ContactModal")) {
  code = code.replace("import GlassIcons from './react-bits/GlassIcons';", "import ContactModal from './ContactModal';\nimport ServicesModal from './ServicesModal';");
}

// 2. Add New States for Blur and Velocity
code = code.replace("const [expandedFolds, setExpandedFolds] = useState({});", 
`const [expandedFolds, setExpandedFolds] = useState({});
  const [canvasBlur, setCanvasBlur] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);`);

// 3. Update GSAP onUpdate for canvasBlur and scrollOpacity
const onUpdateReplace = `setTextFold(prev => {
                    if (typeof navigator !== 'undefined' && navigator.vibrate && newTextFold !== null && prev !== newTextFold) {
                      navigator.vibrate(50);
                    }
                    return prev !== newTextFold ? newTextFold : prev;
                  });
                  
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
                  }`;
code = code.replace(/setTextFold\(prev => prev !== newTextFold \? newTextFold : prev\);/g, onUpdateReplace);

// 4. Update Canvas style for Blur
code = code.replace(/<canvas\s*ref=\{canvasRef\}\s*className="absolute inset-0 w-full h-full pointer-events-none z-0"\s*\/>/g, 
`<canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-all duration-700 ease-out" 
        style={{ filter: \`blur(\${canvasBlur}px)\` }}
      />`);

// 5. Delete Inline Modals
const modalStart = code.indexOf("{/* Contact Modal */}");
if (modalStart !== -1) {
  const sectionEnd = code.indexOf("</section>");
  code = code.substring(0, modalStart) + 
`      {/* Extracted Modals for Aggressive Memoization */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
      <ServicesModal isOpen={isServicesModalOpen} onClose={() => setServicesModalOpen(false)} scrollToFold={scrollToFold} />
    ` + code.substring(sectionEnd);
}

// 6. Refactor Mobile Fold Container alignments (Thumb Zone, Perspective)
code = code.replace(/bg-dom border border-acc\/20 p-4 md:p-14 rounded-sm shadow-2xl/g, 'bg-[#1A1A1B]/30 backdrop-blur-2xl border border-white/20 p-6 md:p-14 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform translate-z-[20px] will-change-transform');

code = code.replace(/bg-dom border border-acc\/30 p-4 md:p-14 rounded-sm shadow-2xl/g, 'bg-[#1A1A1B]/30 backdrop-blur-2xl border border-white/20 p-6 md:p-14 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform translate-z-[20px] will-change-transform');

code = code.replace(/bg-dom border border-\[\#D4AF37\]\/30 p-4 md:p-14 rounded-sm shadow-2xl/g, 'bg-[#1A1A1B]/30 backdrop-blur-2xl border border-white/20 p-6 md:p-14 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform translate-z-[20px] will-change-transform');

code = code.replace(/bg-\[\#1A1A1B\] border border-\[\#D4AF37\]\/30 p-5 md:p-8 rounded-sm shadow-2xl/g, 'bg-[#1A1A1B]/30 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform translate-z-[20px] will-change-transform');

code = code.replace(/bg-dom border border-white\/20 p-4 md:p-14 rounded-sm shadow-2xl/g, 'bg-[#1A1A1B]/30 backdrop-blur-2xl border border-white/20 p-6 md:p-14 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform translate-z-[20px] will-change-transform');

// Update text contrast and staggers
code = code.replace(/text-\[\#CBD5E1\] text-xs md:text-lg font-normal leading-relaxed/g, 'text-white text-sm md:text-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200');
code = code.replace(/text-2xl md:text-5xl font-light text-\[\#F8FAFC\] leading-tight mb-10 tracking-tight/g, 'text-2xl md:text-5xl font-light text-white leading-tight mb-10 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100');
code = code.replace(/text-2xl md:text-6xl font-light text-\[\#F8FAFC\] leading-tight mb-6 tracking-tight/g, 'text-2xl md:text-6xl font-light text-white leading-tight mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100');
code = code.replace(/text-\[oklch\(88%_0_0\)\]/g, 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-200');

// Mask gradients and thumb zones for main fold containers
code = code.replace(/w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-8 items-center/g, 'w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-8 max-md:items-end max-md:pb-[15vh]');
code = code.replace(/w-full h-full flex items-center justify-start px-4/g, 'w-full h-full flex items-center justify-start px-4 max-md:justify-center max-md:items-end max-md:pb-[15vh]');
code = code.replace(/w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4/g, 'w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-end max-md:pb-[15vh]');
code = code.replace(/w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4/g, 'w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-4 max-md:justify-end max-md:pb-[15vh]');

// Expanded touch targets & Read More
code = code.replace(/md:hidden text-\[10px\] font-bold uppercase tracking-wider mt-4 mb-2/g, 'md:hidden text-[12px] font-bold uppercase tracking-wider mt-4 mb-2 min-h-[48px] min-w-[48px] px-4 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]');

// Button touch targets
code = code.replace(/px-6 py-3 md:px-8 md:py-4/g, 'px-6 py-4 md:px-8 md:py-4 min-h-[48px] min-w-[48px]');
code = code.replace(/px-6 py-3 bg-\[\#D4AF37\]/g, 'px-6 py-4 min-h-[48px] min-w-[48px] bg-[#D4AF37]');
code = code.replace(/py-3 px-8 rounded-sm/g, 'py-4 px-8 min-h-[48px] min-w-[48px] rounded-sm');

// Add style props to the Folds for mask image
code = code.replace(/className="bg-\[\#1A1A1B\]\/30 backdrop-blur-2xl/g, 'style={{ WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)", transformStyle: "preserve-3d" }} className="bg-[#1A1A1B]/30 backdrop-blur-2xl');

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Applied mobile UX changes safely!');
