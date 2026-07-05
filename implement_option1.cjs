const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Adjust scrollEnd
code = code.replace(
  'const scrollEnd = isMobile ? "+=1400%" : "+=2100%";',
  'const scrollEnd = isMobile ? "+=700%" : "+=2100%";'
);

// 2. Wrap Camera Pan Sequence in !isMobile safely
const panSeqStart = code.indexOf('// --- 1. CAMERA PAN SEQUENCE ---');
const textAnimStart = code.indexOf('// --- 2. TEXT ANIMATION SEQUENCE (DESKTOP ONLY) ---');
if (panSeqStart !== -1 && textAnimStart !== -1) {
  let panSeqCode = code.slice(panSeqStart, textAnimStart);
  let newPanSeqCode = panSeqCode.replace('tl.to(playhead', 'if (!isMobile) {\n          tl.to(playhead');
  // Need to close the brace before the text anim start
  newPanSeqCode = newPanSeqCode.trimEnd() + '\n        }\n\n        ';
  code = code.slice(0, panSeqStart) + newPanSeqCode + code.slice(textAnimStart);
}

// 3. Inject Mobile Background Divs and hide Canvas on mobile safely
const canvasRegex = /\{\/\* Background Canvas \*\/\}\s*<canvas[\s\S]*?\/>/;
const backgroundInjection = `{/* Background Divs (Mobile Only) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 md:hidden bg-dom">
        {[
          '/assets/heroscroll2/scene-001.webp',
          '/assets/heroscroll3/scene-001.webp',
          '/assets/heroscroll4/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_000.webp',
          '/assets/heroscroll5/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_000.webp',
          '/assets/heroscroll6/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_000.webp',
          '/assets/heroscroll7/rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_000.webp',
          '/assets/heroscroll8/two-stylized-line-drawn-characters-one-helping-an-ezremove_000.webp'
        ].map((src, idx) => (
          <div 
            key={idx}
            className={\`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out origin-center \${activeFold === (idx + 1) ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}\`}
            style={{ backgroundImage: \`url('\${src}')\` }}
          />
        ))}
      </div>

      {/* Background Canvas (Desktop Only) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" 
      />`;
code = code.replace(canvasRegex, backgroundInjection);

// 4. Update the Preloader safely
const preloadStart = code.indexOf('// Load heroscroll2 (frames 1-52)');
const checkLoadStart = code.indexOf('function checkLoad()');
if (preloadStart !== -1 && checkLoadStart !== -1) {
  const originalPreload = code.slice(preloadStart, checkLoadStart);
  
  const replacementPreload = `if (isMobileDevice) {
      const mobileKeyframes = [
        '/assets/heroscroll2/scene-001.webp',
        '/assets/heroscroll3/scene-001.webp',
        '/assets/heroscroll4/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_000.webp',
        '/assets/heroscroll5/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_000.webp',
        '/assets/heroscroll6/a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_000.webp',
        '/assets/heroscroll7/rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_000.webp',
        '/assets/heroscroll8/two-stylized-line-drawn-characters-one-helping-an-ezremove_000.webp'
      ];
      expectedCount = mobileKeyframes.length;
      mobileKeyframes.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => { loadedImages.push(img); checkLoad(); };
        img.onerror = () => { loadedImages.push(img); checkLoad(); };
      });
    } else {
      ${originalPreload}
    }

    `;
  
  code = code.slice(0, preloadStart) + replacementPreload + code.slice(checkLoadStart);
}

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Option 1 Implemented safely!');
