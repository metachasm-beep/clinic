const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Update scrollEnd to 2400%
code = code.replace(
  'const scrollEnd = isMobile ? "+=1600%" : "+=2100%";',
  'const scrollEnd = isMobile ? "+=2400%" : "+=2100%";'
);

// 2. Update snapPoints for mobile
const oldSnapPoints = `const snapPoints = isMobile ? [
          0, 
          p1E/totalDuration, 
          p2E/totalDuration, 
          p3E/totalDuration, 
          p4E/totalDuration, 
          p5E/totalDuration, 
          p6E/totalDuration, 
          p7E/totalDuration
        ] : false;`;

const newSnapPoints = `// Center of the "reading" steps based on our 24-weight system
        const snapPoints = isMobile ? [
          0, 
          4/24, 
          7/24, 
          10/24, 
          13/24, 
          16/24, 
          19/24, 
          22/24
        ] : false;`;

code = code.replace(oldSnapPoints, newSnapPoints);

// 3. Update the onUpdate logic to use the weighted step calculation
const oldOnUpdateRegex = /onUpdate: \(self\) => \{\s*if \(isMobile\) \{[\s\S]*?\}\s*\},/;
const newOnUpdate = `onUpdate: (self) => {
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

code = code.replace(oldOnUpdateRegex, newOnUpdate);

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Mobile scroll weights and snaps updated!');
