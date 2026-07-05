import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = 'public/assets';

const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.endsWith('.jpg')) {
      const outputPath = fullPath.replace('.jpg', '.webp');
      try {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
        console.log(`Converted: ${outputPath}`);
      } catch (err) {
        console.error(`Error converting ${fullPath}:`, err);
      }
    }
  }
};

processDirectory(directoryPath).then(() => console.log('Done!')).catch(console.error);
