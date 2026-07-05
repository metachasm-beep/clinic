import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'F:\\Get Well Clinic\\assets\\heroscroll3';
const outputDir = 'public/assets/heroscroll3';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  // Sort files by name so they stay in sequence
  files.sort();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    // 1-indexed to match heroscroll2
    const outputName = `scene-${String(i + 1).padStart(3, '0')}.jpg`;
    const outputPath = path.join(outputDir, outputName);

    console.log(`Processing ${file} -> ${outputName}`);
    await sharp(inputPath)
      .resize({ width: 1280 }) // 720p width
      .jpeg({ quality: 70 })
      .toFile(outputPath);
  }
  console.log(`Successfully processed ${files.length} images.`);
}

processImages().catch(console.error);
