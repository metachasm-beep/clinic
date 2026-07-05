const fs = require('fs');
let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// Replace opacity: 0 with autoAlpha: 0 for fold refs
code = code.replace(/tl\.to\(fold1Ref\.current, \{ opacity: 0/g, 'tl.to(fold1Ref.current, { autoAlpha: 0');

for (let i = 2; i <= 7; i++) {
  const foldRef = 'fold' + i + 'Ref.current';
  code = code.replace(
    new RegExp('tl\\\\.fromTo\\\\(' + foldRef + ', \\\\{ opacity: 0, (x: -?20) \\\\}, \\\\{ opacity: 1', 'g'),
    'tl.fromTo(' + foldRef + ', { autoAlpha: 0, $1 }, { autoAlpha: 1'
  );
  code = code.replace(
    new RegExp('tl\\\\.to\\\\(' + foldRef + ', \\\\{ opacity: 0', 'g'),
    'tl.to(' + foldRef + ', { autoAlpha: 0'
  );
}

// Replace opacity-0 with invisible for the initial render of Folds 2-7
for (let i = 2; i <= 7; i++) {
  code = code.replace(
    new RegExp('ref=\\{fold' + i + 'Ref\\} className=\"absolute inset-0 z-20 w-full h-full(.*?)(opacity-0)', 'g'),
    'ref={fold' + i + 'Ref} className=\"absolute inset-0 z-20 w-full h-full$1invisible'
  );
}

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Update complete.');
