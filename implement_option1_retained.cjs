const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Force dpr = 1 on mobile in handleResize
const resizeRegex = /const handleResize = \(\) => \{\s*const dpr = window\.devicePixelRatio \|\| 1;/;
code = code.replace(resizeRegex, `const handleResize = () => {
      const isMobileForDpr = window.innerWidth < 768;
      const dpr = isMobileForDpr ? 1 : (window.devicePixelRatio || 1);`);

// 2. Adjust scrollEnd
code = code.replace(
  'const scrollEnd = isMobile ? "+=1400%" : "+=2100%";',
  'const scrollEnd = isMobile ? "+=700%" : "+=2100%";'
);

// 3. Inject currentMobileFold and modify onUpdate
const scrollTriggerBlock = code.indexOf('tl = gsap.timeline({');
if (scrollTriggerBlock !== -1) {
  // Insert let currentMobileFold = 1; before tl = gsap.timeline
  code = code.slice(0, scrollTriggerBlock) + 'let currentMobileFold = 1;\n        ' + code.slice(scrollTriggerBlock);
}

const onUpdateRegex = /onUpdate: \(self\) => \{\s*if \(isMobile\) \{\s*const p = self\.progress;\s*\/\/ Calculate which fold we are in \(1 to 7\) based on scroll progress\s*let fold = Math\.min\(7, Math\.max\(1, Math\.ceil\(p \* 7\)\)\);\s*if \(p === 0\) fold = 1;\s*setActiveFold\(prev => prev !== fold \? fold : prev\);\s*\}\s*\}/;

const newOnUpdate = `onUpdate: (self) => {
              if (isMobile) {
                 const p = self.progress;
                 let fold = Math.min(7, Math.max(1, Math.ceil(p * 7)));
                 if (p === 0) fold = 1;
                 
                 if (fold !== currentMobileFold) {
                   currentMobileFold = fold;
                   // Fold 1: Frame 0. Fold 2: Frame 51. Fold 3: Frame 102.
                   const targetFrames = [0, 0, 51, 102, 156, 208, 253, 303];
                   const targetFrame = targetFrames[fold];
                   
                   gsap.to(playhead, {
                      frame: targetFrame,
                      duration: 0.8,
                      ease: "power2.inOut",
                      overwrite: "auto",
                      onUpdate: renderFrame
                   });
                 }
                 setActiveFold(prev => prev !== fold ? fold : prev);
              }
            }`;
code = code.replace(onUpdateRegex, newOnUpdate);

// 4. Wrap Camera Pan Sequence in !isMobile safely
const panSeqStart = code.indexOf('// --- 1. CAMERA PAN SEQUENCE ---');
const textAnimStart = code.indexOf('// --- 2. TEXT ANIMATION SEQUENCE (DESKTOP ONLY) ---');
if (panSeqStart !== -1 && textAnimStart !== -1) {
  let panSeqCode = code.slice(panSeqStart, textAnimStart);
  let newPanSeqCode = panSeqCode.replace('tl.to(playhead', 'if (!isMobile) {\n          tl.to(playhead');
  newPanSeqCode = newPanSeqCode.trimEnd() + '\n        }\n\n        ';
  code = code.slice(0, panSeqStart) + newPanSeqCode + code.slice(textAnimStart);
}

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Option 1 Retained Scrubbing Implemented!');
