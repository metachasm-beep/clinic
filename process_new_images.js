import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'F:/Get Well Clinic/assets/heroscroll';
const outputDir = 'F:/Get Well Clinic/GetWellClinic-3D/public/assets/heroscroll_new';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.startsWith('scene') && f.endsWith('.png'));
files.sort();

async function processImages() {
  console.log(`Processing ${files.length} new PNG frames...`);
  for (let i = 0; i < files.length; i++) {
    const inputPath = path.join(inputDir, files[i]);
    const outputPath = path.join(outputDir, `scene-${(i+1).toString().padStart(3, '0')}.jpg`);
    
    await sharp(inputPath)
      .jpeg({ quality: 95 }) 
      .toFile(outputPath);
  }
  console.log('Successfully converted and optimized new sequence!');
}

processImages();
