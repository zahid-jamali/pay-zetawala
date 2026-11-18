/**
 * Comprehensive SEO & Quality Assurance Site Audit Script
 * Audits all static HTML exports in out/ directory.
 * Usage: node scripts/check-site.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '../out');

if (!fs.existsSync(OUT_DIR)) {
  console.error(`ERROR: Build output directory "${OUT_DIR}" does not exist. Run "npm run build" first.`);
  process.exit(1);
}

const BANNED_AI_PHRASES = [
  /in today'?s fast-paced world/i,
  /\bdelve\b/i,
  /navigate the complexities/i,
  /\bunlock\b/i,
  /comprehensive guide/i,
];

// Helper to recursively find all .html files
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== '_next') {
        getHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allHtmlFiles = getHtmlFiles(OUT_DIR);
console.log(`Auditing ${allHtmlFiles.length} HTML files in out/ ...\n`);

let totalErrors = 0;
let totalWarnings = 0;

for (const filePath of allHtmlFiles) {
  const relPath = path.relative(OUT_DIR, filePath).replace(/\\/g, '/');
  // Skip 404 and design preview
  if (relPath === '404.html' || relPath === '404/index.html' || relPath.startsWith('design-preview/')) {
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const warnings = [];

  // 1. Check <title>
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    issues.push('Missing or empty <title> tag');
  } else {
    const titleText = titleMatch[1].trim();
    if (titleText.length > 70) {
      warnings.push(`Title length ${titleText.length} > 70 chars: "${titleText}"`);
    }
  }

  // 2. Check meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    issues.push('Missing or empty <meta name="description">');
  } else {
    const descText = descMatch[1].trim();
    if (descText.length > 175) {
      warnings.push(`Description length ${descText.length} > 175 chars: "${descText.slice(0, 40)}..."`);
    }
  }

  // 3. Check <h1> count
  const h1Matches = html.match(/<h1(\s+[^>]*)?>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    issues.push('Missing <h1> heading');
  } else if (h1Matches.length > 1) {
    issues.push(`Multiple <h1> headings found (${h1Matches.length})`);
  }

  // 4. Check Canonical Tag
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  if (!canonicalMatch) {
    issues.push('Missing <link rel="canonical"> tag');
  } else {
    const canonicalUrl = canonicalMatch[1];
    if (!canonicalUrl.startsWith('https://pay.zetawala.com')) {
      issues.push(`Canonical does not start with https://pay.zetawala.com: ${canonicalUrl}`);
    }
    if (!canonicalUrl.endsWith('/')) {
      issues.push(`Canonical URL missing trailing slash: ${canonicalUrl}`);
    }
  }

  // 5. Check JSON-LD Structured Data
  const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  if (jsonLdMatches.length === 0) {
    warnings.push('No JSON-LD structured data script found on page');
  } else {
    for (const tag of jsonLdMatches) {
      const jsonContent = tag.replace(/<script\s+type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '').trim();
      try {
        JSON.parse(jsonContent);
      } catch (err) {
        issues.push(`Invalid JSON-LD syntax: ${err.message}`);
      }
    }
  }

  // 6. Check internal link targets and trailing slashes
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"'#?]+)["'][^>]*>/gi)];
  for (const match of linkMatches) {
    const href = match[1];
    // Check if it's an internal relative/absolute link
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/images/') && !href.startsWith('/og/') && !href.startsWith('/_next/')) {
      if (!href.endsWith('/')) {
        issues.push(`Internal link missing trailing slash: "${href}"`);
      } else {
        // Verify target file exists in out/
        const targetRelative = href.slice(1); // remove leading slash
        const targetPathDir = path.join(OUT_DIR, targetRelative, 'index.html');
        const targetPathDirect = path.join(OUT_DIR, targetRelative.replace(/\/$/, '.html'));
        if (!fs.existsSync(targetPathDir) && !fs.existsSync(targetPathDirect)) {
          issues.push(`Broken internal link: "${href}" (file not found in out/)`);
        }
      }
    }
  }

  // 7. Check images for alt attribute
  const imgMatches = [...html.matchAll(/<img\s+([^>]*)\/?>/gi)];
  for (const match of imgMatches) {
    const imgAttrs = match[1];
    if (!/alt=["'][^"']*["']/i.test(imgAttrs)) {
      issues.push(`Image missing alt attribute: <img ${imgAttrs}>`);
    }
  }

  // 8. Check for banned AI buzzwords
  for (const phraseRegex of BANNED_AI_PHRASES) {
    if (phraseRegex.test(html)) {
      issues.push(`Detected banned AI phrase matching ${phraseRegex}`);
    }
  }

  // Report results for this file
  if (issues.length > 0 || warnings.length > 0) {
    console.log(`[${relPath}]`);
    for (const issue of issues) {
      console.log(`  ❌ ERROR: ${issue}`);
      totalErrors++;
    }
    for (const warning of warnings) {
      console.log(`  ⚠️ WARN:  ${warning}`);
      totalWarnings++;
    }
  }
}

console.log('\n========================================');
console.log(`Audit Complete: Checked ${allHtmlFiles.length} pages.`);
console.log(`Total Errors: ${totalErrors}`);
console.log(`Total Warnings: ${totalWarnings}`);
console.log('========================================\n');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL QA AND SEO AUDIT CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
}
