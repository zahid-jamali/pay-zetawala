/**
 * IndexNow Batch & Direct Submission Script
 * Submits static URLs directly to both Bing and IndexNow endpoints.
 * Usage:
 *   node scripts/indexnow.mjs                  (submits all site URLs)
 *   node scripts/indexnow.mjs <custom-url>     (submits specific URL)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'pay.zetawala.com';
const KEY = 'a3f89b1c720448e8b6d85918731e842f';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Determine URLs to submit
let targetUrls = [];
const cliArg = process.argv[2];

if (cliArg && cliArg.startsWith('http')) {
  targetUrls = [cliArg];
  console.log(`Submitting single URL: ${cliArg}`);
} else {
  const pagesFile = path.resolve(__dirname, '../src/config/pages.ts');
  const content = fs.readFileSync(pagesFile, 'utf8');
  const pathMatches = [...content.matchAll(/path:\s*'([^']+)'/g)];
  targetUrls = [...new Set(pathMatches.map(m => `https://${HOST}${m[1]}`))];
  console.log(`Preparing ${targetUrls.length} URLs for IndexNow & Bing submission.`);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: targetUrls,
};

const ENDPOINTS = [
  { name: 'Bing Direct', url: 'https://www.bing.com/indexnow' },
  { name: 'IndexNow Global (Yandex/Seznam/Naver)', url: 'https://api.indexnow.org/indexnow' },
];

async function submitToEndpoints() {
  for (const endpoint of ENDPOINTS) {
    try {
      console.log(`\nSubmitting to ${endpoint.name} (${endpoint.url})...`);
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      console.log(`  -> Status: ${response.status} ${response.statusText}`);
      if (response.status === 200 || response.status === 202) {
        console.log(`  -> Success! ${targetUrls.length} URLs queued for indexing.`);
      } else {
        const text = await response.text();
        console.warn(`  -> Notice: ${text}`);
      }
    } catch (err) {
      console.error(`  -> Network error for ${endpoint.name}:`, err.message);
    }
  }
  console.log('\n======================================================');
  console.log('IndexNow submission finished.');
  console.log(`Active Key File: https://${HOST}/${KEY}.txt`);
  console.log('======================================================\n');
}

submitToEndpoints();
