const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// Use a robust regex to replace the snap object
const snapRegex = /snap:\s*isMobile\s*\?\s*\{[\s\S]*?\}\s*:\s*false/g;
code = code.replace(snapRegex, 'snap: false /* Mobile snap disabled */');

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Mobile snap successfully disabled.');
