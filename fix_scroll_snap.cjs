const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Update scrollEnd from +=2400% to +=3200%
code = code.replace(
  'const scrollEnd = isMobile ? "+=2400%" : "+=2100%";',
  'const scrollEnd = isMobile ? "+=3200%" : "+=2100%";'
);

// 2. Fix snapPoints (just set them both to false or revert to desktop logic, we don't need them for mobile)
const oldSnapPoints = `        // Center of the "reading" steps based on our 24-weight system
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

const newSnapPoints = `        // Snap points (disabled on mobile to allow fluid reading)
        const snapPoints = isDesktop ? [
          0, 
          p1E/totalDuration, 
          p2E/totalDuration, 
          p3E/totalDuration, 
          p4E/totalDuration, 
          p5E/totalDuration, 
          p6E/totalDuration, 
          p7E/totalDuration
        ] : false;`;

code = code.replace(oldSnapPoints, newSnapPoints);

// 3. Disable snapping in ScrollTrigger
const oldSnapConfig = `snap: isMobile ? {
              snapTo: snapPoints,
              duration: { min: 0.4, max: 0.8 },
              delay: 0.15,
              ease: "sine.inOut"
            } : false`;

const newSnapConfig = `snap: snapPoints ? {
              snapTo: snapPoints,
              duration: { min: 0.4, max: 0.8 },
              delay: 0.15,
              ease: "sine.inOut"
            } : false`;

code = code.replace(oldSnapConfig, newSnapConfig);

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Mobile snap disabled and scroll height increased to 3200%');
