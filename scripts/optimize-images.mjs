import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'public/images';
const outputDir = 'public/images/optimized';
const images = [
  { name: 'hero', widths: [480, 848, 1280, 1920] },
  { name: 'residencial', widths: [400, 800] },
  { name: 'comercial', widths: [400, 800] },
  { name: 'industrial', widths: [400, 800] },
  { name: 'rural', widths: [400, 800] },
  { name: 'paineis', widths: [400, 800] },
  { name: 'inversor', widths: [400, 800] },
  { name: 'logo-word', widths: [200, 400] },
  { name: 'logo-sym', widths: [200, 400] },
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const img of images) {
  const inputPathJpg = path.join(inputDir, `${img.name}.jpg`);
  const inputPathPng = path.join(inputDir, `${img.name}.png`);
  const exists = fs.existsSync(inputPathJpg) ? inputPathJpg : (fs.existsSync(inputPathPng) ? inputPathPng : null);
  
  if (!exists) {
    console.log(`Skipping ${img.name} - not found`);
    continue;
  }

  for (const w of img.widths) {
    const avifPath = path.join(outputDir, `${img.name}-${w}.avif`);
    const webpPath = path.join(outputDir, `${img.name}-${w}.webp`);
    const jpgPath = path.join(outputDir, `${img.name}-${w}.jpg`);

    await sharp(exists)
      .resize(w)
      .avif({ quality: 50, effort: 6 })
      .toFile(avifPath);

    await sharp(exists)
      .resize(w)
      .webp({ quality: 75, effort: 6 })
      .toFile(webpPath);

    await sharp(exists)
      .resize(w)
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgPath);

    console.log(`Generated ${img.name}-${w}: AVIF, WebP, JPEG`);
  }
}
console.log('All images optimized!');