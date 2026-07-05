import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/assets/heroscroll';
const outputDir = './public/assets/heroscroll_4k';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));

async function processImages() {
  console.log(`Starting 4K upscale of ${files.length} frames (smoothing out artifacts)...`);
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    await sharp(inputPath)
      .resize({
        width: 3840,
        height: 2160,
        fit: 'inside',
        kernel: sharp.kernel.mitchell // Mitchell is smoother and prevents ringing/pixelation on highly compressed JPEGs
      })
      .blur(0.5) // Slight blur to hide JPEG compression artifacting
      .jpeg({ quality: 100 })
      .toFile(outputPath);
  }
  console.log(`\nSuccessfully upscaled all frames smoothly to 4K!`);
}

processImages();
