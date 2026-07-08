const fs = require('fs');
let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Remove the buggy gsap.to(playhead) from onUpdate
const onUpdateRegex = /if\s*\(newBgFold\s*!==\s*currentMobileFold\)\s*\{[\s\S]*?\}\s*setBgFold/g;
code = code.replace(onUpdateRegex, 'setBgFold');

// 2. Disable mobile snapping
const snapRegex = /snap:\s*isMobile\s*\?\s*\{[\s\S]*?\}\s*:\s*false/g;
code = code.replace(snapRegex, 'snap: false');

// 3. Add the native mobile GSAP scrub timeline alongside Desktop
const desktopPanRegex = /\/\/\s*---\s*1\.\s*CAMERA\s*PAN\s*SEQUENCE\s*---\s*\n\s*if\s*\(!isMobile\)\s*\{([\s\S]*?)\}/g;
const newPanSequence = `// --- 1. CAMERA PAN SEQUENCE ---
        if (!isMobile) {
$1
        } else {
          // Mobile native scrub timeline mapped mathematically to the 16 steps
          const stepDur = totalDuration / 16;
          tl.fromTo(playhead, {frame: 0}, { frame: 51, ease: "none", duration: stepDur, onUpdate: renderFrame }, 1 * stepDur);
          tl.fromTo(playhead, {frame: 51}, { frame: 102, ease: "none", duration: stepDur, onUpdate: renderFrame }, 3 * stepDur);
          tl.fromTo(playhead, {frame: 102}, { frame: 156, ease: "none", duration: stepDur, onUpdate: renderFrame }, 5 * stepDur);
          tl.fromTo(playhead, {frame: 156}, { frame: 208, ease: "none", duration: stepDur, onUpdate: renderFrame }, 7 * stepDur);
          tl.fromTo(playhead, {frame: 208}, { frame: 253, ease: "none", duration: stepDur, onUpdate: renderFrame }, 9 * stepDur);
          tl.fromTo(playhead, {frame: 253}, { frame: 303, ease: "none", duration: stepDur, onUpdate: renderFrame }, 11 * stepDur);
          tl.fromTo(playhead, {frame: 303}, { frame: 355, ease: "none", duration: stepDur, onUpdate: renderFrame }, 13 * stepDur);
        }`;
code = code.replace(desktopPanRegex, newPanSequence);

// 4. Animate Hero Header in Mobile Fold 0
const oldHeroHTML = /<h1[\s\S]*?Get Well Clinic\s*<\/h1>/g;
const newHeroHTML = `<h1
                className="m-0 text-center drop-shadow-2xl"
                style={{
                  color: "oklch(91% 0 0)",
                  fontFamily: "'Alumni Sans', sans-serif",
                  fontSize: "clamp(5rem, 18vw, 8rem)",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase"
                }}
            >
              {textFold === 0 ? <ReactBitsSplitText text="Get Well Clinic" splitType="chars" delay={40} /> : "Get Well Clinic"}
            </h1>`;
code = code.replace(oldHeroHTML, newHeroHTML);

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Mobile scroll fix applied safely!');
