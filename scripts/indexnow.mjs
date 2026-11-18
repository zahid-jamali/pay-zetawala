/**
 * IndexNow Batch URL Submission Script
 * Submits all static site URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 * Usage: node scripts/indexnow.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'pay.zetawala.com';
const KEY = 'a3f89b1c720448e8b6d85918731e842f';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read pages from src/config/pages.ts via regex
const pagesFile = path.resolve(__dirname, '../src/config/pages.ts');
const content = fs.readFileSync(pagesFile, 'utf8');

const pathMatches = [...content.matchAll(/path:\s*'([^']+)'/g)];
const urls = [...new Set(pathMatches.map(m => `https://${HOST}${m[1]}`))];

console.log(`Found ${urls.length} URLs to submit to IndexNow.`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

async function submitIndexNow() {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow API Response Status: ${response.status} (${response.statusText})`);
    if (response.status === 200 || response.status === 202) {
      console.log('Successfully submitted all URLs to IndexNow!');
    } else {
      const text = await response.text();
      console.warn('IndexNow returned unexpected response:', text);
    }
  } catch (err) {
    console.error('Error submitting to IndexNow:', err.message);
  }
}

submitIndexNow();
