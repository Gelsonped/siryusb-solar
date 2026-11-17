import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'public/images/logo-completo.png';
const outputDir = 'public/images/optimized';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Gerar versão grande (800px largura) para logo dobrado
const widths = [800];

for (const w of widths) {
  const avifPath = path.join(outputDir, `logo-completo-${w}.avif`);
  const webpPath = path.join(outputDir, `logo-completo-${w}.webp`);
  const pngPath = path.join(outputDir, `logo-completo-${w}.png`);

  await sharp(inputPath)
    .resize(w)
    .avif({ quality: 60, effort: 6 })
    .toFile(avifPath);

  await sharp(inputPath)
    .resize(w)
    .webp({ quality: 75, effort: 6 })
    .toFile(webpPath);

  await sharp(inputPath)
    .resize(w)
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(pngPath);

  console.log(`Generated logo-completo-${w}: AVIF, WebP, PNG`);
}
console.log('Large logo optimized!');