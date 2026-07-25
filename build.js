#!/usr/bin/env node
/* Kitchen ER — static page generator.
 *
 *   node build.js                       (uses default site URL)
 *   node build.js https://ls44544.github.io/kitchen-er
 *
 * Reads data.js and writes one standalone, SEO-ready page per symptom into
 * ./p/<slug>/index.html, plus sitemap.xml, robots.txt and an index of all
 * symptoms at ./all/index.html.
 *
 * The app itself (index.html) is never touched.
 */

const fs = require('fs');
const path = require('path');

// ---- config -----------------------------------------------------
const SITE = (process.argv[2] || 'https://ls44544.github.io/kitchen-er').replace(/\/+$/, '');
const ROOT = __dirname;
const OUT = path.join(ROOT, 'p');
const BRAND = 'Kitchen ER';

// ---- load content ----------------------------------------------
const sandbox = { window: {} };
new Function('window', fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'))(sandbox.window);
const FIXES = sandbox.window.FIXES;
if (!Array.isArray(FIXES) || !FIXES.length) {
  console.error('✖ data.js produced no entries. Run `node validate.js` first.');
  process.exit(1);
}

// ---- helpers ----------------------------------------------------
const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// "My hollandaise split" -> "my-hollandaise-split"
function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 70);
}

// unique slugs even if two symptoms collide
const used = new Set();
const entries = FIXES.map(f => {
  let slug = slugify(f.symptom), n = 2;
  while (used.has(slug)) slug = `${slugify(f.symptom)}-${n++}`;
  used.add(slug);
  return { ...f, slug, url: `${SITE}/p/${slug}/` };
});

const verdictClass = v => {
  const l = v.toLowerCase();
  if (/not rescuable|cosmetic|harmless|use a real/.test(l)) return 'no';
  if (/partly|depends|act fast|next batch|repurposable|wait it out/.test(l)) return 'mid';
  return 'yes';
};
const VMARK = { yes: '&#10003;', mid: '&#126;', no: '&#10007;' };

// meta description: <=155 chars, leads with the action
function metaDesc(f) {
  const first = f.rescue[0].replace(/\s+/g, ' ').trim();
  let d = `${f.verdict}. ${first}`;
  if (d.length > 155) d = d.slice(0, 152).replace(/\s+\S*$/, '') + '…';
  return d;
}

// Page title. Google shows ~60 chars, so fall back progressively:
// full -> no brand -> symptom + short tail -> symptom alone.
function pageTitle(f) {
  const cands = [
    `${f.symptom} — why, and how to fix it | ${BRAND}`,
    `${f.symptom} — why, and how to fix it`,
    `${f.symptom} — and how to fix it`,
    `${f.symptom} — the fix`,
    f.symptom
  ];
  return cands.find(t => t.length <= 60) || cands[cands.length - 1];
}

// ---- shared CSS (inlined; these pages must stand alone) ---------
const CSS = `
:root{--bg:#faf7f2;--card:#fff;--line:#e6ded2;--ink:#1f1b17;--dim:#6f6459;
 --red:#c0392b;--green:#2f7a4f;--amber:#b8791f;--tint:#f2ece2}
@media (prefers-color-scheme:dark){:root{--bg:#14120f;--card:#1c1916;--line:#2e2924;--ink:#f0eae2;--dim:#9c9086;--tint:#232019}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);line-height:1.55;
 font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:660px;margin:0 auto;padding:0 18px 60px}
.bar{padding:16px 0;border-bottom:1px solid var(--line);margin-bottom:22px}
.bar a{font-weight:800;font-size:15px;color:var(--ink);text-decoration:none;letter-spacing:-.2px}
.bar a span{color:var(--red)}
.crumb{font-size:12px;color:var(--dim);margin-bottom:10px}
.crumb a{color:var(--dim)}
h1{font-size:27px;line-height:1.2;margin:0 0 14px;letter-spacing:-.5px}
.verdict{display:inline-flex;align-items:center;gap:8px;font-size:16px;font-weight:800;
 padding:11px 17px;border-radius:24px;margin-bottom:22px;
 background:rgba(47,122,79,.15);color:var(--green);box-shadow:inset 0 0 0 1.5px rgba(47,122,79,.3)}
.verdict.no{background:rgba(192,57,43,.13);color:var(--red);box-shadow:inset 0 0 0 1.5px rgba(192,57,43,.28)}
.verdict.mid{background:rgba(184,121,31,.16);color:var(--amber);box-shadow:inset 0 0 0 1.5px rgba(184,121,31,.32)}
h2{font-size:11px;font-weight:800;letter-spacing:1.4px;color:var(--dim);margin:26px 0 8px;text-transform:uppercase}
h2.now{color:var(--red)}
.rescue{background:var(--tint);border-radius:11px;padding:16px 18px}
.rescue ol{margin:0;padding-left:20px}
.rescue li{font-size:16px;margin-bottom:9px}
.rescue li:last-child{margin:0}
p{font-size:16px;margin:0}
.next p{padding-left:12px;border-left:2px solid var(--green)}
.rel{margin-top:34px;border-top:1px solid var(--line);padding-top:18px}
.rel h2{margin-top:0}
.rel ul{list-style:none;margin:0;padding:0}
.rel li{margin-bottom:2px}
.rel a{display:block;padding:11px 13px;background:var(--card);border:1px solid var(--line);
 border-radius:9px;margin-bottom:7px;color:var(--ink);text-decoration:none;font-size:15px;font-weight:600}
.rel a:hover{border-color:var(--red);color:var(--red)}
.cta{display:block;margin-top:26px;padding:16px;text-align:center;background:var(--ink);color:var(--bg);
 border-radius:11px;text-decoration:none;font-weight:700;font-size:15px}
.cta small{display:block;font-weight:400;opacity:.75;margin-top:3px;font-size:12.5px}
footer{margin-top:34px;padding-top:16px;border-top:1px solid var(--line);font-size:12px;color:var(--dim)}
footer a{color:var(--dim)}
.grid{list-style:none;margin:0;padding:0}
.grid h3{font-size:12px;letter-spacing:1.3px;text-transform:uppercase;color:var(--dim);margin:22px 0 8px}
`;

// ---- one symptom page -------------------------------------------
function symptomPage(f, related) {
  const vc = verdictClass(f.verdict);

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: f.symptom,
    description: `${f.verdict}. ${f.why}`,
    totalTime: 'PT2M',
    step: f.rescue.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Step ${i + 1}`,
      text: s
    }))
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Why did this happen? ${f.symptom}`,
        acceptedAnswer: { '@type': 'Answer', text: f.why }
      },
      {
        '@type': 'Question',
        name: `Can I still save it?`,
        acceptedAnswer: { '@type': 'Answer', text: `${f.verdict}. ${f.rescue.join(' ')}` }
      },
      {
        '@type': 'Question',
        name: `How do I stop it happening again?`,
        acceptedAnswer: { '@type': 'Answer', text: f.prevent }
      }
    ]
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BRAND, item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: f.category, item: `${SITE}/all/` },
      { '@type': 'ListItem', position: 3, name: f.symptom, item: f.url }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(pageTitle(f))}</title>
<meta name="description" content="${esc(metaDesc(f))}">
<link rel="canonical" href="${f.url}">
<meta name="theme-color" content="#faf7f2" media="(prefers-color-scheme:light)">
<meta name="theme-color" content="#14120f" media="(prefers-color-scheme:dark)">
<link rel="icon" href="${SITE}/icon-192.png">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(f.symptom)} — why, and how to fix it">
<meta property="og:description" content="${esc(metaDesc(f))}">
<meta property="og:url" content="${f.url}">
<meta property="og:image" content="${SITE}/icon-512.png">
<meta property="og:site_name" content="${BRAND}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(f.symptom)} — why, and how to fix it">
<meta name="twitter:description" content="${esc(metaDesc(f))}">
<script type="application/ld+json">${JSON.stringify(howTo)}</script>
<script type="application/ld+json">${JSON.stringify(faq)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <div class="bar"><a href="${SITE}/">Kitchen <span>ER</span></a></div>

  <nav class="crumb"><a href="${SITE}/">Home</a> &rsaquo; <a href="${SITE}/all/">${esc(f.category)}</a></nav>

  <h1>${esc(f.symptom)}</h1>

  <div class="verdict ${vc === 'yes' ? '' : vc}"><span aria-hidden="true">${VMARK[vc]}</span>${esc(f.verdict)}</div>

  <h2 class="now">Right now</h2>
  <div class="rescue"><ol>${f.rescue.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>

  <h2>Why it happened</h2>
  <p>${esc(f.why)}</p>

  <div class="next">
    <h2>Next time</h2>
    <p>${esc(f.prevent)}</p>
  </div>

  <a class="cta" href="${SITE}/">Search 50 more kitchen disasters
    <small>Free, no signup, works offline</small></a>

  ${related.length ? `<div class="rel">
    <h2>Related problems in ${esc(f.category)}</h2>
    <ul>${related.map(r => `<li><a href="${r.url}">${esc(r.symptom)}</a></li>`).join('')}</ul>
  </div>` : ''}

  <footer>
    <a href="${SITE}/">${BRAND}</a> &middot; <a href="${SITE}/all/">All symptoms</a><br>
    Content CC BY 4.0. Corrections welcome.
  </footer>
</div>
</body>
</html>`;
}

// ---- index of every symptom -------------------------------------
function allPage(byCat) {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: entries.map((f, i) => ({
      '@type': 'ListItem', position: i + 1, name: f.symptom, url: f.url
    }))
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>All ${entries.length} cooking problems, by category | ${BRAND}</title>
<meta name="description" content="Every cooking disaster covered: split sauces, mushy rice, sunken cakes, tough meat. What to do right now, why it happened, and how to prevent it.">
<link rel="canonical" href="${SITE}/all/">
<link rel="icon" href="${SITE}/icon-192.png">
<script type="application/ld+json">${JSON.stringify(list)}</script>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <div class="bar"><a href="${SITE}/">Kitchen <span>ER</span></a></div>
  <h1>Every symptom</h1>
  <p style="color:var(--dim);margin-bottom:8px">${entries.length} things that go wrong, and what to do about each.</p>
  ${Object.keys(byCat).map(c => `
  <h3 style="font-size:12px;letter-spacing:1.3px;text-transform:uppercase;color:var(--dim);margin:26px 0 8px">${esc(c)}</h3>
  <ul class="grid">${byCat[c].map(f => `<li><a href="${f.url}" style="display:block;padding:11px 13px;background:var(--card);border:1px solid var(--line);border-radius:9px;margin-bottom:7px;color:var(--ink);text-decoration:none;font-size:15px;font-weight:600">${esc(f.symptom)}</a></li>`).join('')}</ul>`).join('')}
  <a class="cta" href="${SITE}/">Open the search app</a>
  <footer><a href="${SITE}/">${BRAND}</a> &middot; Content CC BY 4.0.</footer>
</div>
</body>
</html>`;
}

// ---- write ------------------------------------------------------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const byCat = {};
entries.forEach(f => (byCat[f.category] = byCat[f.category] || []).push(f));

entries.forEach(f => {
  const pool = byCat[f.category].filter(x => x.slug !== f.slug);
  // rotate so every page links somewhere different
  const start = entries.indexOf(f) % Math.max(1, pool.length);
  const related = [...pool.slice(start), ...pool.slice(0, start)].slice(0, 4);
  const dir = path.join(OUT, f.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), symptomPage(f, related));
});

fs.mkdirSync(path.join(ROOT, 'all'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'all', 'index.html'), allPage(byCat));

// sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, pri: '1.0' },
  { loc: `${SITE}/all/`, pri: '0.8' },
  ...entries.map(f => ({ loc: f.url, pri: '0.7' }))
];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>
`);

fs.writeFileSync(path.join(ROOT, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

// ---- report -----------------------------------------------------
const C = { g: '\x1b[32m', d: '\x1b[2m', y: '\x1b[33m', x: '\x1b[0m' };
console.log(`\n${C.d}Kitchen ER — static build${C.x}`);
console.log(`${C.d}site: ${SITE}${C.x}\n`);
console.log(`  ${entries.length} symptom pages  ${C.d}-> p/<slug>/index.html${C.x}`);
console.log(`  1 index page      ${C.d}-> all/index.html${C.x}`);
console.log(`  sitemap.xml       ${C.d}${urls.length} urls${C.x}`);
console.log(`  robots.txt`);
if (SITE.includes('YOURNAME') || SITE.includes('example')) {
  console.log(`\n${C.y}⚠ Using a placeholder URL. Pass the real one:${C.x}`);
  console.log(`${C.d}  node build.js https://ls44544.github.io/kitchen-er${C.x}`);
}
console.log(`\n${C.g}✔ done${C.x}\n`);
