const fs = require('fs');

const files = [
  'F:/Get Well Clinic/react-bits-main/src/content/Components/SpotlightCard/SpotlightCard.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/TextAnimations/TextPressure/TextPressure.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/TextAnimations/ScrollVelocity/ScrollVelocity.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/Components/GlassIcons/GlassIcons.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/Animations/Magnet/Magnet.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/Animations/StarBorder/StarBorder.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/Backgrounds/Threads/Threads.jsx',
  'F:/Get Well Clinic/react-bits-main/src/content/Components/TiltedCard/TiltedCard.jsx'
];

files.forEach(file => {
  console.log('=== ' + file + ' ===');
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach(line => {
      if (line.startsWith('import ')) {
        console.log(line);
      }
    });
  } catch(e) {
    console.log('Error reading file');
  }
});
