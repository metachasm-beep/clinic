const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Add new imports
const importSpotlight = "import SpotlightCard from './react-bits/SpotlightCard';";
const newImports = `import SpotlightCard from './react-bits/SpotlightCard';
import SplitText from './react-bits/SplitText';
import DecryptedText from './react-bits/DecryptedText';
import FuzzyText from './react-bits/FuzzyText';`;
code = code.replace(importSpotlight, newImports);

// 2. Adjust state and scrollEnd for 14-step timeline
// Find: const [activeFold, setActiveFold] = useState(1);
code = code.replace(
  'const [activeFold, setActiveFold] = useState(1);',
  'const [bgFold, setBgFold] = useState(1);\n  const [textFold, setTextFold] = useState(1);'
);

// scrollEnd: 1400%
code = code.replace(
  'const scrollEnd = isMobile ? "+=700%" : "+=2100%";',
  'const scrollEnd = isMobile ? "+=1400%" : "+=2100%";'
);

// 3. onUpdate Logic for Mobile
const onUpdateRegex = /onUpdate: \(self\) => \{\s*if \(isMobile\) \{[\s\S]*?\}\s*\},/;
const newOnUpdate = `onUpdate: (self) => {
              if (isMobile) {
                 const p = self.progress;
                 // 14 steps for 7 folds:
                 // Step 0: Bg 1, Text 1
                 // Step 1: Bg 2, Text null
                 // Step 2: Bg 2, Text 2
                 // ...
                 let step = Math.min(13, Math.max(0, Math.floor(p * 14)));
                 
                 let newBgFold = Math.floor((step + 1) / 2) + 1;
                 if (step >= 12) newBgFold = 7;
                 
                 let newTextFold = (step % 2 === 0) ? newBgFold : null;
                 if (step >= 12) newTextFold = 7;

                 if (newBgFold !== currentMobileFold) {
                   currentMobileFold = newBgFold;
                   const targetFrames = [0, 0, 51, 102, 156, 208, 253, 303];
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
code = code.replace(onUpdateRegex, newOnUpdate);

// Wait, the previous `onUpdate` inside the tl.to might have used an inline renderFrame or called the function.
// Let's make sure renderFrame is accessible. It was defined after scrollTrigger!
// Ah! In the current code, `const renderFrame = () => { ... }` is defined AFTER `scrollTrigger`.
// BUT I previously moved `onUpdate: renderFrame` into `onUpdate` which was defined before `renderFrame`!
// JavaScript hoists `function renderFrame()`, but since it's `const renderFrame = () => {}`, it is NOT hoisted!
// Wait! If `const renderFrame` is defined after `ScrollTrigger.create`, calling `renderFrame` inside `onUpdate` is fine because `onUpdate` fires LATER.
// BUT `gsap.to` evaluates the object immediately. So `onUpdate: renderFrame` is undefined when `gsap.to` is called? No, it's inside `onUpdate: (self) => { gsap.to(..., { onUpdate: renderFrame }) }`.
// The scroll event happens AFTER `renderFrame` is defined! So `renderFrame` is fully defined by the time `self.progress` changes!
// So `onUpdate: renderFrame` is perfectly safe!

// 4. Update the renderFrame definition just in case to be a hoisted function to be absolutely safe:
code = code.replace(
  'const renderFrame = () => {',
  'function renderFrame() {'
);

// 5. Update Folds 1-7 CSS active classes from `activeFold` to `textFold`
code = code.replace(/activeFold === /g, 'textFold === ');

// 6. Update Fold Texts with React-Bits
// Fold 2: Dr. Ankur Gupta
const fold2TitleRegex = /<h2 ref=\{titleRef\}(.*?)>\s*Dr\. Ankur Gupta\s*<\/h2>/;
const fold2TitleNew = `<h2 ref={titleRef}$1>
            {textFold === 2 ? <BlurText text="Dr. Ankur Gupta" delay={50} /> : "Dr. Ankur Gupta"}
          </h2>`;
code = code.replace(fold2TitleRegex, fold2TitleNew);

// Fold 3: Acupuncture Therapy
const fold3TitleRegex = /<h2 ref=\{fold3TitleRef\}(.*?)>\s*Acupuncture Therapy\s*<\/h2>/;
const fold3TitleNew = `<h2 ref={fold3TitleRef}$1>
            {textFold === 3 ? <DecryptedText text="Acupuncture Therapy" animateOn="view" speed={80} /> : "Acupuncture Therapy"}
          </h2>`;
code = code.replace(fold3TitleRegex, fold3TitleNew);

// Fold 4: Preventive Healthcare
const fold4TitleRegex = /<h2 ref=\{fold4TitleRef\}(.*?)>\s*Preventive Healthcare\s*<\/h2>/;
const fold4TitleNew = `<h2 ref={fold4TitleRef}$1>
            {textFold === 4 ? <SplitText text="Preventive Healthcare" splitType="chars" delay={30} /> : "Preventive Healthcare"}
          </h2>`;
code = code.replace(fold4TitleRegex, fold4TitleNew);

// Fold 5: Child Health
const fold5TitleRegex = /<h2 ref=\{fold5TitleRef\}(.*?)>\s*Child Health Care\s*<\/h2>/;
const fold5TitleNew = `<h2 ref={fold5TitleRef}$1>
            {textFold === 5 ? <FuzzyText fontSize="2rem" fontWeight={300} color="#F8FAFC" hoverIntensity={0.5}>Child Health Care</FuzzyText> : "Child Health Care"}
          </h2>`;
code = code.replace(fold5TitleRegex, fold5TitleNew);


fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('2-step mobile scroll & react-bits applied successfully!');
