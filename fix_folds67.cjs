const fs = require('fs');

let code = fs.readFileSync('src/components/FlipbookHero.jsx', 'utf8');

// Fold 6: Dr. Ashok K. Gulati
const fold6TitleRegex = /<h2 ref=\{fold6TitleRef\}(.*?)>\s*Dr\. Ashok K\. Gulati\s*<\/h2>/;
const fold6TitleNew = `<h2 ref={fold6TitleRef}$1>
            {textFold === 6 ? <ReactBitsSplitText text="Dr. Ashok K. Gulati" splitType="words" delay={40} /> : "Dr. Ashok K. Gulati"}
          </h2>`;
code = code.replace(fold6TitleRegex, fold6TitleNew);

// Fold 7: Chronic Care Management
const fold7TitleRegex = /<h2 ref=\{fold7TitleRef\}(.*?)>\s*Chronic Care Management\s*<\/h2>/;
const fold7TitleNew = `<h2 ref={fold7TitleRef}$1>
            {textFold === 7 ? <BlurText text="Chronic Care Management" delay={60} /> : "Chronic Care Management"}
          </h2>`;
code = code.replace(fold7TitleRegex, fold7TitleNew);

fs.writeFileSync('src/components/FlipbookHero.jsx', code);
console.log('Fold 6 and 7 updated');
