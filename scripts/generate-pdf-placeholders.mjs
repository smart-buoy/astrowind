#!/usr/bin/env node
/**
 * Generates minimal valid PDF placeholder files in public/downloads/.
 * Run: node scripts/generate-pdf-placeholders.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'downloads');

function buildMinimalPdf() {
  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 =
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\n';

  const body = '%PDF-1.4\n\n' + obj1 + obj2 + obj3;
  const bodyLen = Buffer.byteLength(body, 'utf8');

  const o1Start = body.indexOf('1 0 obj');
  const o2Start = body.indexOf('2 0 obj');
  const o3Start = body.indexOf('3 0 obj');

  const xrefEntries = [
    '0000000000 65535 f ',
    `${String(o1Start).padStart(10)} 00000 n `,
    `${String(o2Start).padStart(10)} 00000 n `,
    `${String(o3Start).padStart(10)} 00000 n `,
  ];
  const xref = `xref\n0 4\n${xrefEntries.join('\n')}\n`;
  const trailer = `trailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n${bodyLen}\n%%EOF\n`;

  return body + xref + trailer;
}

const files = [
  'smartbuoy-user-guide.pdf',
  'smartbuoy-installation-maintenance.pdf',
  'smartbuoy-certificate-of-conformity.pdf',
];

async function main() {
  await mkdir(outDir, { recursive: true });
  const pdf = buildMinimalPdf();
  for (const name of files) {
    const outPath = path.join(outDir, name);
    await writeFile(outPath, pdf, 'utf8');
    console.log('Wrote', outPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
