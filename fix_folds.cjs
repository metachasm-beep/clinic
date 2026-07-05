const fs = require('fs');
let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// Folds 1 to 7
for (let i = 1; i <= 7; i++) {
  if (i === 1) {
    const regex1 = new RegExp(`\\$\\{activeFold === 1 \\? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:-translate-y-8'\\}`, 'g');
    code = code.replace(regex1, `\${activeFold === 1 ? 'opacity-100 translate-y-0 md:translate-y-0' : 'opacity-0 -translate-y-8 md:translate-y-0'}`);
  } else {
    const regex = new RegExp(`\\$\\{activeFold === ${i} \\? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:translate-y-8'\\}`, 'g');
    code = code.replace(regex, `\${activeFold === ${i} ? 'opacity-100 translate-y-0 md:translate-y-0' : 'opacity-0 translate-y-8 md:translate-y-0'}`);
  }
}

// Ensure Folds 3-7 have md:opacity-0 instead of opacity-0 (otherwise it conflicts)
for (let i = 3; i <= 7; i++) {
  const foldRegex = new RegExp(`(ref=\\{fold${i}Ref\\}\\s+className=\`[^\`]*?)opacity-0(.*?)\``, 'g');
  code = code.replace(foldRegex, (match, p1, p2) => {
    // Only replace if it doesn't already have md:opacity-0 right there
    if (!match.includes('md:opacity-0 transition-all')) {
      return `${p1}md:opacity-0${p2}\``;
    }
    return match;
  });
}

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Fixed folds!');
