const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Update scrollEnd from 1400% to 1600%
code = code.replace(
  'const scrollEnd = isMobile ? "+=1400%" : "+=2100%";',
  'const scrollEnd = isMobile ? "+=1600%" : "+=2100%";'
);

// 2. Update onUpdate logic for 16 steps
const oldOnUpdateRegex = /onUpdate: \(self\) => \{\s*if \(isMobile\) \{[\s\S]*?\}\s*\},/;
const newOnUpdate = `onUpdate: (self) => {
              if (isMobile) {
                 const p = self.progress;
                 let step = Math.min(15, Math.max(0, Math.floor(p * 16)));
                 
                 let newBgFold = Math.ceil(step / 2);
                 if (newBgFold > 7) newBgFold = 7;
                 
                 let newTextFold = (step % 2 === 0) ? (step / 2) : null;
                 if (step >= 14) newTextFold = 7;

                 if (newBgFold !== currentMobileFold) {
                   currentMobileFold = newBgFold;
                   const targetFrames = [0, 51, 102, 156, 208, 253, 303, 355];
                   const targetFrame = targetFrames[newBgFold];
                   
                   gsap.to(playhead, {
                      frame: targetFrame,
                      duration: 2.4, // 200% slower
                      ease: "power2.inOut",
                      overwrite: "auto",
                      onUpdate: renderFrame
                   });
                 }
                 
                 setBgFold(prev => prev !== newBgFold ? newBgFold : prev);
                 setTextFold(prev => prev !== newTextFold ? newTextFold : prev);
              }
            },`;
code = code.replace(oldOnUpdateRegex, newOnUpdate);


// 3. Hide the desktop Title on mobile by adding max-md:hidden to fold1PanelRef
code = code.replace(
  '<div ref={fold1PanelRef} className="max-w-3xl backdrop-blur-md w-full">',
  '<div ref={fold1PanelRef} className="max-w-3xl backdrop-blur-md w-full max-md:hidden">'
);

// 4. Inject the Mobile Fold 0 right before Fold 1 Overlays
const mobileFold0 = `{/* Fold 0: Mobile Hero Header */}
      <div className={\`md:hidden absolute inset-0 z-30 flex items-center justify-center transition-all duration-700 ease-out pointer-events-none \${textFold === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}\`}>
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
              Get Well Clinic
            </h1>
        </div>
      </div>
      
      `;
code = code.replace('{/* Fold 1 Overlays */}', mobileFold0 + '{/* Fold 1 Overlays */}');

// 5. Update Fold 1 Overlay logic: Currently textFold === 1 ? max-md:opacity-100 max-md:translate-y-0 : ...
// Wait! I shouldn't mess with fold1Ref's logic because on mobile, textFold === 1 will correctly show the cards!
// Yes! If textFold === 0, the cards (inside fold1Ref) will be max-md:opacity-0 and hidden. This is EXACTLY what we want!
// When textFold === 1, the cards fade in. The Desktop Title is hidden on mobile, so only the cards fade in! Perfect!

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Mobile Fold 0 Sync Fixed!');
