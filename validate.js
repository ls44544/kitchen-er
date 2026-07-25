#!/usr/bin/env node
/* Kitchen ER — data checker.
   Run:  node validate.js
   Catches syntax errors, missing fields, duplicates and weak entries
   before you publish. Errors block; warnings are advice.          */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data.js');
const CATEGORIES = ['Sauces', 'Eggs', 'Meat', 'Rice & grains', 'Baking', 'Technique'];
const REQUIRED = ['symptom', 'category', 'tags', 'verdict', 'rescue', 'why', 'prevent'];

const errors = [];
const warnings = [];
const bad = (i, s, m) => errors.push(`#${i + 1} "${s}" — ${m}`);
const warn = (i, s, m) => warnings.push(`#${i + 1} "${s}" — ${m}`);

// ---- load -------------------------------------------------------
let FIXES;
try {
  const src = fs.readFileSync(FILE, 'utf8');
  const sandbox = { window: {} };
  new Function('window', src)(sandbox.window);
  FIXES = sandbox.window.FIXES;
} catch (e) {
  console.error('\n\x1b[31m✖ data.js will not parse.\x1b[0m');
  console.error('  ' + e.message);
  console.error('\n  Usually a missing comma between entries, or an unescaped');
  console.error('  double quote inside a string. Use \' inside "..." text.\n');
  process.exit(1);
}

if (!Array.isArray(FIXES)) {
  console.error('\n\x1b[31m✖ window.FIXES is not an array.\x1b[0m\n');
  process.exit(1);
}

// ---- per-entry checks -------------------------------------------
const seenSymptom = new Map();

FIXES.forEach((f, i) => {
  const name = f.symptom || '(no symptom)';

  REQUIRED.forEach(k => {
    if (!(k in f)) bad(i, name, `missing field "${k}"`);
  });

  ['symptom', 'category', 'verdict', 'why', 'prevent'].forEach(k => {
    if (k in f && typeof f[k] !== 'string') bad(i, name, `"${k}" must be text`);
    else if (k in f && !f[k].trim()) bad(i, name, `"${k}" is empty`);
  });

  ['tags', 'rescue'].forEach(k => {
    if (k in f && !Array.isArray(f[k])) bad(i, name, `"${k}" must be a list [ ... ]`);
    else if (k in f && f[k].length === 0) bad(i, name, `"${k}" is an empty list`);
    else if (k in f && f[k].some(x => typeof x !== 'string' || !x.trim()))
      bad(i, name, `"${k}" contains a blank or non-text item`);
  });

  if (f.category && !CATEGORIES.includes(f.category))
    bad(i, name, `unknown category "${f.category}" — use one of: ${CATEGORIES.join(', ')}`);

  // duplicates
  if (f.symptom) {
    const key = f.symptom.toLowerCase().trim();
    if (seenSymptom.has(key)) bad(i, name, `duplicate of entry #${seenSymptom.get(key) + 1}`);
    else seenSymptom.set(key, i);
  }

  // ---- quality warnings ----
  if (f.symptom && !/^(my|the|there|it)\b/i.test(f.symptom.trim()))
    warn(i, name, 'symptom should read like a search: start with "My ..." or "The ..."');

  if (f.tags && f.tags.length < 3)
    warn(i, name, `only ${f.tags.length} tag(s) — add synonyms so search finds it`);

  if (f.tags && f.tags.some(t => t !== t.toLowerCase()))
    warn(i, name, 'tags should be lowercase (search lowercases the query)');

  if (f.rescue && f.rescue.length < 2)
    warn(i, name, 'only one rescue step — is there a fallback or a "if that fails"?');

  if (f.why && f.why.split(/\s+/).length < 15)
    warn(i, name, 'the "why" is thin — the mechanism is the part people remember');

  if (f.why && f.why.split(/\s+/).length > 70)
    warn(i, name, 'the "why" is long — trim toward 30-50 words');

  if (f.prevent && f.prevent.split(/\s+/).length > 45)
    warn(i, name, '"prevent" is long — it should be one actionable sentence');
});

// ---- collisions across entries ----------------------------------
const tagOwners = new Map();
FIXES.forEach((f, i) => {
  (f.tags || []).forEach(t => {
    const k = String(t).toLowerCase();
    if (!tagOwners.has(k)) tagOwners.set(k, []);
    tagOwners.get(k).push(i);
  });
});

// ---- report -----------------------------------------------------
const C = { r: '\x1b[31m', y: '\x1b[33m', g: '\x1b[32m', d: '\x1b[2m', x: '\x1b[0m' };
console.log(`\n${C.d}Kitchen ER — checking ${FIXES.length} entries${C.x}\n`);

if (errors.length) {
  console.log(`${C.r}✖ ${errors.length} error${errors.length > 1 ? 's' : ''} — the app may break${C.x}`);
  errors.forEach(e => console.log(`  ${C.r}·${C.x} ${e}`));
  console.log('');
}

if (warnings.length) {
  console.log(`${C.y}⚠ ${warnings.length} suggestion${warnings.length > 1 ? 's' : ''}${C.x}`);
  warnings.forEach(w => console.log(`  ${C.y}·${C.x} ${w}`));
  console.log('');
}

// stats
const byCat = {};
FIXES.forEach(f => (byCat[f.category] = (byCat[f.category] || 0) + 1));
const words = FIXES.reduce((n, f) => n + (f.why || '').split(/\s+/).length, 0);

console.log(`${C.d}Coverage${C.x}`);
CATEGORIES.forEach(c => {
  const n = byCat[c] || 0;
  const bar = '█'.repeat(n) + `${C.d}${'·'.repeat(Math.max(0, 12 - n))}${C.x}`;
  console.log(`  ${c.padEnd(14)} ${bar} ${n}`);
});
console.log(`\n${C.d}  ${tagOwners.size} unique search tags · ~${Math.round(words / FIXES.length)} words per explanation${C.x}`);

const thin = CATEGORIES.filter(c => (byCat[c] || 0) < 5);
if (thin.length) console.log(`${C.d}  thinnest: ${thin.join(', ')}${C.x}`);

if (!errors.length) {
  console.log(`\n${C.g}✔ data.js is valid — safe to publish${C.x}\n`);
  process.exit(0);
} else {
  process.exit(1);
}
