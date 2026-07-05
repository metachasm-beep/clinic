const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// Replace the react-bits SplitText import
code = code.replace(
  "import SplitText from './react-bits/SplitText';",
  "import ReactBitsSplitText from './react-bits/SplitText';"
);

// Replace the usage of <SplitText in fold 4
code = code.replace(
  /<SplitText text="Preventive Healthcare"/g,
  '<ReactBitsSplitText text="Preventive Healthcare"'
);

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Fixed SplitText conflict');
