const fs = require('fs');
let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// Remove the hardcoded 'opacity-0' or 'md:opacity-0' from the base class string for all folds 2-7
for (let i = 2; i <= 7; i++) {
  // Just simple string replace
  const foldRef = `ref={fold${i}Ref}`;
  const idx = code.indexOf(foldRef);
  if (idx !== -1) {
    const endIdx = code.indexOf('>', idx);
    let divTag = code.slice(idx, endIdx);
    
    // Remove "opacity-0" or "md:opacity-0" that is standalone in the class list
    // Make sure we don't accidentally remove from opacity-100 (which is in the conditional)
    divTag = divTag.replace(/ md:opacity-0 /g, ' ');
    divTag = divTag.replace(/ opacity-0 /g, ' ');
    
    code = code.slice(0, idx) + divTag + code.slice(endIdx);
  }
}

// Write it back
fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Removed base opacity-0!');
