import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PAGES } from '../src/config/pages';

const OG_DIR = path.resolve('public/og');

if (!fs.existsSync(OG_DIR)) {
  fs.mkdirSync(OG_DIR, { recursive: true });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxCharsPerLine = 38): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3); // Max 3 lines
}

const countryLabels: Record<string, string> = {
  ph: 'Philippines 🇵🇭',
  ke: 'Kenya 🇰🇪',
  ug: 'Uganda 🇺🇬',
  ng: 'Nigeria 🇳🇬',
  global: 'Official Calculator 🌐',
};

async function generateOgImages() {
  console.log(`Generating OG images for ${PAGES.length} pages...`);

  // Read logo if exists as base64
  const logoPath = path.resolve('public/images/pay-logo.png');
  let logoBase64 = '';
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  }

  for (const page of PAGES) {
    const titleLines = wrapText(page.title.replace(/ \| Pay$/, ''));
    const countryLabel = countryLabels[page.country] || 'Official 2026';
    const escapedDesc = escapeXml(page.description);

    const titleSpans = titleLines
      .map(
        (line, idx) =>
          `<tspan x="80" dy="${idx === 0 ? 0 : 54}" font-size="44" font-weight="700" fill="#ffffff">${escapeXml(
            line
          )}</tspan>`
      )
      .join('');

    const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a1914" />
          <stop offset="50%" stop-color="#0f261e" />
          <stop offset="100%" stop-color="#05120e" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#109068" />
          <stop offset="100%" stop-color="#34d399" />
        </linearGradient>
        <radialGradient id="glow" cx="80%" cy="20%" r="50%">
          <stop offset="0%" stop-color="#109068" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#109068" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect width="1200" height="630" fill="url(#glow)" />

      <!-- Top Accent Bar -->
      <rect x="0" y="0" width="1200" height="8" fill="url(#accent)" />

      <!-- Outer Frame Border -->
      <rect x="30" y="30" width="1140" height="570" rx="16" fill="none" stroke="#1f4035" stroke-width="2" />

      <!-- Brand Logo / Badge -->
      <g transform="translate(80, 80)">
        ${
          logoBase64
            ? `<image href="${logoBase64}" width="48" height="48" rx="8" />`
            : `<rect width="48" height="48" rx="8" fill="#109068" />`
        }
        <text x="64" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#ffffff" letter-spacing="-0.5px">Pay</text>
        <text x="120" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#9ca3af">pay.zetawala.com</text>
      </g>

      <!-- Country / Category Badge -->
      <g transform="translate(900, 85)">
        <rect width="220" height="38" rx="19" fill="#109068" fill-opacity="0.2" stroke="#109068" stroke-width="1.5" />
        <text x="110" y="24" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#34d399">${escapeXml(
          countryLabel
        )}</text>
      </g>

      <!-- Title -->
      <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.5px">
        ${titleSpans}
      </text>

      <!-- Description / Tagline -->
      <text x="80" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94a3b8" width="900">
        ${escapedDesc.length > 95 ? escapedDesc.slice(0, 92) + '...' : escapedDesc}
      </text>

      <!-- Footer Badges -->
      <g transform="translate(80, 520)">
        <rect width="280" height="36" rx="8" fill="#143126" stroke="#1f4035" stroke-width="1" />
        <circle cx="20" cy="18" r="5" fill="#34d399" />
        <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#d1fae5">100% Free &amp; Client-Side</text>
      </g>

      <g transform="translate(380, 520)">
        <rect width="280" height="36" rx="8" fill="#143126" stroke="#1f4035" stroke-width="1" />
        <circle cx="20" cy="18" r="5" fill="#34d399" />
        <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#d1fae5">Official 2026 Legal Rates</text>
      </g>
    </svg>
    `;

    const outPath = path.join(OG_DIR, `${page.id}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outPath);

    // Also write a default.png for home
    if (page.id === 'home') {
      const defaultPath = path.join(OG_DIR, 'default.png');
      await sharp(Buffer.from(svg)).png().toFile(defaultPath);
    }
  }

  console.log(`Successfully generated ${PAGES.length} OG images in public/og/`);
}

generateOgImages().catch((err) => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
