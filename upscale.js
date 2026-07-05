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
  console.log(`Starting 4K upscale of ${files.length} frames...`);
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    await sharp(inputPath)
      .resize({
        width: 3840,
        height: 2160,
        fit: 'inside',
        kernel: sharp.kernel.lanczos3
      })
      .sharpen({
        sigma: 2,
        m1: 0.5,
        m2: 3,
        x1: 2,
        y2: 10,
        y3: 20
      })
      .jpeg({ quality: 95 })
      .toFile(outputPath);
      
    // process.stdout.write(`.`);
  }
  console.log(`\nSuccessfully upscaled all frames to 4K!`);
}

processImages();
