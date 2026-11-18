import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function extractPalette() {
  const logoPath = path.resolve('public/images/pay-logo.jpg');
  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found at:', logoPath);
    process.exit(1);
  }

  const { data, info } = await sharp(logoPath)
    .resize(100, 100, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const colorCounts = new Map();

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Filter out near-white background
    if (r > 240 && g > 240 && b > 240) continue;

    // Quantize color to 16-step buckets to group near shades
    const qr = Math.round(r / 8) * 8;
    const qg = Math.round(g / 8) * 8;
    const qb = Math.round(b / 8) * 8;

    const key = `${qr},${qg},${qb}`;
    colorCounts.set(key, (colorCounts.get(key) || 0) + 1);
  }

  const sorted = Array.from(colorCounts.entries()).sort((a, b) => b[1] - a[1]);

  console.log('Dominant Palette Candidates:');
  sorted.slice(0, 5).forEach(([rgb, count]) => {
    const [r, g, b] = rgb.split(',').map(Number);
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    console.log(`  HEX: ${hex} | RGB: (${r}, ${g}, ${b}) | Pixels: ${count}`);
  });
}

extractPalette().catch(console.error);
