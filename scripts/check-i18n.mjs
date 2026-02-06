#!/usr/bin/env node
/**
 * Reports translation keys missing in each locale compared to the default (en).
 * Run: node ./scripts/check-i18n.mjs
 * Exit code 1 if any locale has missing keys (for CI).
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const DEFAULT_LANG = 'en';

/** Flatten nested { a: { b: "value" } } to { "a.b": "value" } for comparison. */
function flattenKeys(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      out[key] = v;
    } else if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenKeys(v, key));
    }
  }
  return out;
}

async function loadLocale(lang) {
  const filePath = path.join(LOCALES_DIR, `${lang}.yml`);
  const raw = await readFile(filePath, 'utf8');
  const data = yaml.load(raw);
  const nested =
    data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  return flattenKeys(nested);
}

function getMissingKeys(baseKeys, localeKeys) {
  const set = new Set(Object.keys(localeKeys));
  return baseKeys.filter((k) => !set.has(k));
}

async function main() {
  const files = await readdir(LOCALES_DIR);
  const locales = files
    .filter((f) => f.endsWith('.yml'))
    .map((f) => path.basename(f, '.yml'));

  if (locales.length === 0) {
    console.error('No locale YAML files found in', LOCALES_DIR);
    process.exit(1);
  }

  if (!locales.includes(DEFAULT_LANG)) {
    console.error(`Default locale "${DEFAULT_LANG}.yml" not found.`);
    process.exit(1);
  }

  const all = {};
  for (const lang of locales) {
    all[lang] = await loadLocale(lang);
  }

  const baseKeys = Object.keys(all[DEFAULT_LANG]);
  let hasMissing = false;

  for (const lang of locales) {
    if (lang === DEFAULT_LANG) continue;
    const missing = getMissingKeys(baseKeys, all[lang]);
    if (missing.length > 0) {
      hasMissing = true;
      console.log(`\n[${lang}] Missing ${missing.length} key(s):`);
      missing.forEach((k) => console.log(`  - ${k}`));
    }
  }

  if (!hasMissing) {
    console.log('All locales have the same keys as', DEFAULT_LANG + '.');
  }

  process.exit(hasMissing ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
