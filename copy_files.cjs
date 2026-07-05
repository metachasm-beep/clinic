const fs = require('fs');
const path = require('path');

const srcBase = 'F:/Get Well Clinic/react-bits-main/src/content';
const destBase = 'F:/Get Well Clinic/GetWellClinic-3D/src/components/react-bits';

if (!fs.existsSync(destBase)) {
  fs.mkdirSync(destBase, { recursive: true });
}

const filesToCopy = [
  'Components/SpotlightCard/SpotlightCard.jsx',
  'Components/SpotlightCard/SpotlightCard.css',
  'TextAnimations/TextPressure/TextPressure.jsx',
  'TextAnimations/ScrollVelocity/ScrollVelocity.jsx',
  'TextAnimations/ScrollVelocity/ScrollVelocity.css',
  'Components/GlassIcons/GlassIcons.jsx',
  'Components/GlassIcons/GlassIcons.css',
  'Animations/Magnet/Magnet.jsx',
  'Animations/StarBorder/StarBorder.jsx',
  'Animations/StarBorder/StarBorder.css',
  'Backgrounds/Threads/Threads.jsx',
  'Backgrounds/Threads/Threads.css',
  'Components/TiltedCard/TiltedCard.jsx',
  'Components/TiltedCard/TiltedCard.css'
];

filesToCopy.forEach(file => {
  const src = path.join(srcBase, file);
  const dest = path.join(destBase, path.basename(file));
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${path.basename(file)}`);
  } catch(e) {
    console.error(`Failed to copy ${file}: ${e.message}`);
  }
});
