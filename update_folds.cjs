const fs = require('fs');
let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// 1. Add Wayfinding and Gradient Scrim before the canvas
const beforeCanvas = `<div className="absolute inset-0 z-[5] bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent pointer-events-none md:hidden" />
      
      {/* Wayfinding Dots (Mobile Only) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 md:hidden flex">
        {[1, 2, 3, 4, 5, 6, 7].map(f => (
          <div key={f} className={\`w-1.5 h-1.5 rounded-full transition-all duration-300 \${activeFold === f ? 'bg-white scale-150 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}\`} />
        ))}
      </div>
      
      {/* Background Canvas */}`;
code = code.replace('{/* Background Canvas */}', beforeCanvas);

// Fold 1 also needs to transition out on mobile if we scroll past it!
code = code.replace(
  `<div ref={fold1Ref} className="absolute inset-0 z-10 w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">`,
  `<div ref={fold1Ref} className={\`absolute inset-0 z-10 w-full h-full p-4 md:p-12 lg:px-24 pointer-events-none grid grid-cols-1 lg:grid-cols-3 gap-8 items-center transition-all duration-700 ease-out \${activeFold === 1 ? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:-translate-y-8'}\`}>`
);

// We need to change `className="..."` to `className={\`...\`}` for folds 2-7
for (let i = 2; i <= 7; i++) {
  // Wait, some folds have flex-col md:flex-row etc.
  // I will just do a standard replace for the exact fold div.
  const foldRegex = new RegExp(`(ref=\\{fold${i}Ref\\}\\s+)className="([^"]+)"`, 'g');
  code = code.replace(foldRegex, (match, p1, p2) => {
    // Add the activeFold check
    return `${p1}className={\`${p2} transition-all duration-700 ease-out \${activeFold === ${i} ? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:translate-y-8'}\`}`;
  });
}

// And for the paragraphs:
for (let i = 2; i <= 7; i++) {
  const descRefName = i === 2 ? 'descRef' : `fold${i}DescRef`;
  const descRegex = new RegExp(`(<p ref=\\{${descRefName}\\}\\s+)className="([^"]+)"(\\s*>)([\\s\\S]*?)(</p>)`, 'g');
  
  code = code.replace(descRegex, (match, p1, classes, p3, text, p5) => {
    const isDarkText = classes.includes('text-[#04090F]') || classes.includes('text-dom');
    const btnColor = isDarkText ? 'text-[#04090F]' : (classes.includes('text-acc') ? 'text-acc' : 'text-[#D4AF37]');
    
    return `${p1}className={\`${classes} \${!expandedFolds[${i}] ? 'max-md:line-clamp-2' : ''}\`}${p3}${text}${p5}
          <button 
            className={\`md:hidden text-[10px] font-bold uppercase tracking-wider mt-4 mb-2 \${!expandedFolds[${i}] ? 'block' : 'hidden'} ${btnColor}\`}
            onClick={() => setExpandedFolds(prev => ({...prev, [${i}]: true}))}
            style={{ pointerEvents: 'auto' }}
          >
            Read More +
          </button>`;
  });
}

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Folds updated successfully.');
