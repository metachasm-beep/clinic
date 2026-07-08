const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Update timeline variables to include initial pause for Hero
const oldTimings = `      const pan = 2; // Duration of camera pan
      const pause = isMobile ? 3 : 1; // 3x longer reading pause on mobile
      
      const p1S = 0;           const p1E = p1S + pan;
      const p2S = p1E + pause; const p2E = p2S + pan;
      const p3S = p2E + pause; const p3E = p3S + pan;
      const p4S = p3E + pause; const p4E = p4S + pan;
      const p5S = p4E + pause; const p5E = p5S + pan;
      const p6S = p5E + pause; const p6E = p6S + pan;
      const p7S = p6E + pause; const p7E = p7S + pan;
      const totalDuration = p7E + pause;`;

const newTimings = `      const pan = 2; // Duration of camera pan
      const pause = isMobile ? 3 : 1; // 3x longer reading pause on mobile
      
      const p1S = pause;       const p1E = p1S + pan;
      const p2S = p1E + pause; const p2E = p2S + pan;
      const p3S = p2E + pause; const p3E = p3S + pan;
      const p4S = p3E + pause; const p4E = p4S + pan;
      const p5S = p4E + pause; const p5E = p5S + pan;
      const p6S = p5E + pause; const p6E = p6S + pan;
      const p7S = p6E + pause; const p7E = p7S + pan;
      const totalDuration = p7E + pause;`;

code = code.replace(oldTimings, newTimings);

// 2. Rewrite onUpdate for mobile
const oldOnUpdate = `            onUpdate: (self) => {
              if (isMobile) {
                 const p = self.progress;
                 // We use a weighted system: 2 parts for reading text, 1 part for panning background.
                 // Total parts = 8 folds * 3 parts = 24.
                 const weights = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];
                 const currentWeight = p * 24;
                 
                 let step = 0;
                 let acc = 0;
                 for (let i = 0; i < 16; i++) {
                   acc += weights[i];
                   if (currentWeight <= acc || i === 15) {
                     step = i;
                     break;
                   }
                 }
                 
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

const newOnUpdate = `            onUpdate: (self) => {
              if (isMobile) {
                 const t = self.progress * totalDuration;
                 let newTextFold = null;
                 
                 if (t < p1S) newTextFold = 0;
                 else if (t >= p1E && t < p2S) newTextFold = 1;
                 else if (t >= p2E && t < p3S) newTextFold = 2;
                 else if (t >= p3E && t < p4S) newTextFold = 3;
                 else if (t >= p4E && t < p5S) newTextFold = 4;
                 else if (t >= p5E && t < p6S) newTextFold = 5;
                 else if (t >= p6E && t < p7S) newTextFold = 6;
                 else if (t >= p7E) newTextFold = 7;
                 
                 setTextFold(prev => prev !== newTextFold ? newTextFold : prev);
              }
            },`;

code = code.replace(oldOnUpdate, newOnUpdate);

// 3. Remove `if (!isMobile)` from CAMERA PAN SEQUENCE
const oldPanSeq = `        // --- 1. CAMERA PAN SEQUENCE ---
        if (!isMobile) {
          tl.to(playhead, { frame: 51, ease: "none", duration: pan, onUpdate: renderFrame }, p1S);
          tl.to(playhead, { frame: 102, ease: "none", duration: pan, onUpdate: renderFrame }, p2S);
          tl.to(playhead, { frame: 156, ease: "none", duration: pan, onUpdate: renderFrame }, p3S);
          tl.to(playhead, { frame: 208, ease: "none", duration: pan, onUpdate: renderFrame }, p4S);
          tl.to(playhead, { frame: 253, ease: "none", duration: pan, onUpdate: renderFrame }, p5S);
          tl.to(playhead, { frame: 303, ease: "none", duration: pan, onUpdate: renderFrame }, p6S);
          tl.to(playhead, { frame: 355, ease: "none", duration: pan, onUpdate: renderFrame }, p7S);
        }`;

const newPanSeq = `        // --- 1. CAMERA PAN SEQUENCE ---
        tl.to(playhead, { frame: 51, ease: "none", duration: pan, onUpdate: renderFrame }, p1S);
        tl.to(playhead, { frame: 102, ease: "none", duration: pan, onUpdate: renderFrame }, p2S);
        tl.to(playhead, { frame: 156, ease: "none", duration: pan, onUpdate: renderFrame }, p3S);
        tl.to(playhead, { frame: 208, ease: "none", duration: pan, onUpdate: renderFrame }, p4S);
        tl.to(playhead, { frame: 253, ease: "none", duration: pan, onUpdate: renderFrame }, p5S);
        tl.to(playhead, { frame: 303, ease: "none", duration: pan, onUpdate: renderFrame }, p6S);
        tl.to(playhead, { frame: 355, ease: "none", duration: pan, onUpdate: renderFrame }, p7S);`;

code = code.replace(oldPanSeq, newPanSeq);

// 4. Update the Hero Header (Fold 0) HTML to animate
const oldHeroHTML = `              Get Well Clinic
            </h1>`;

const newHeroHTML = `              {textFold === 0 ? <ReactBitsSplitText text="Get Well Clinic" splitType="words,chars" delay={40} /> : "Get Well Clinic"}
            </h1>`;

code = code.replace(oldHeroHTML, newHeroHTML);

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Mobile timeline architecture synced and Hero header animated!');
