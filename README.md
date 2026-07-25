# Kitchen ER

**It broke. Here's why — and can you still save it.**

A fast, symptom-first reference for cooking disasters. Search what went wrong,
get the rescue you can act on right now, the reason it happened, and how to
avoid it next time.

No account, no ads, no tracking, no build step. One HTML file and a data file.

👉 **[Try it](https://ls44544.github.io/kitchen-er/)**

---

## Why this exists

Search *"why did my hollandaise split"* and you get a twelve-minute video with a
four-minute intro, or a blog post with 900 words of childhood anecdote above the
answer. That's fine when you're browsing. It's useless at 7pm when the sauce is
separating in front of you.

Every entry here answers three questions in that order:

| Section | Answers |
|---|---|
| **Right now** | What do I do in the next 60 seconds? |
| **Why it happened** | What actually went wrong, mechanically? |
| **Next time** | One sentence to stop it recurring. |

Each entry also carries an honest verdict — **savable**, **partly**, or
**not savable**. Most cooking content pretends everything can be fixed. When it
can't, this says so and tells you what to make instead.

## Current coverage

50 symptoms across Sauces, Eggs, Meat, Rice & grains, Baking and Technique.

## Running it

Open `index.html`. That's it — it works from the filesystem.

To test on a phone on your network:

```bash
python3 -m http.server 8000
# then visit http://YOUR-LAN-IP:8000 from the phone
```

Serving over http (rather than opening the file directly) also enables the
service worker, so the app installs to the home screen and works fully offline.

## Adding a symptom

All content lives in [`data.js`](data.js). Copy any block and edit it:

```js
{
  symptom: "My custard scrambled",
  category: "Eggs",
  tags: ["custard", "scrambled", "curdled", "crème anglaise", "split"],
  verdict: "Often rescuable",
  rescue: [
    "Off the heat immediately, then blitz with a stick blender.",
    "Caught early, it comes back almost perfectly."
  ],
  why: "Egg proteins set around 80°C and custard is cooked to about 82°C — a very narrow window.",
  prevent: "Temper: add hot milk to the yolks in a thin stream while whisking."
}
```

Then check it:

```bash
node validate.js
```

The validator blocks real errors (bad syntax, missing fields, unknown category,
duplicate symptoms) and warns about weak entries (too few tags, a single rescue
step, a thin explanation). It also prints coverage per category so you can see
what's underserved.

### House style

- **Phrase the symptom the way someone would type it into Google.** "My rice is
  mushy", not "Overcooked rice".
- **Rescue steps are ordered by usefulness**, most actionable first.
- **The "why" is the part people remember.** Explain the mechanism, not the rule.
  Aim for 30–50 words.
- **Never dead-end.** If it can't be fixed, say what to make with it instead.
- **Tags are for search** — synonyms, related dishes, common misspellings.

## Contributing

Corrections especially welcome. If something here is wrong, open an issue with a
source and it'll be fixed. Kitchen lore is full of confidently repeated myths —
see the entry on the potato trick for salty soup.

## Publishing (SEO pages)

The app is one page, which means one URL for search engines. `build.js`
generates a standalone page per symptom so each can rank for its own query.

```bash
node build.js https://ls44544.github.io/kitchen-er
```

That writes:

- `p/<slug>/index.html` — one page per symptom, with its own title, meta
  description, canonical URL, Open Graph tags and HowTo + FAQ structured data
- `all/index.html` — an index of every symptom, grouped by category
- `sitemap.xml` and `robots.txt`

Re-run it after editing `data.js`. Pass your real site URL or the generated
links will point at a placeholder.

## Tech

Plain HTML, CSS and JavaScript. No framework, no dependencies, no build.

- `index.html` — the whole app
- `data.js` — all content
- `validate.js` — content checker (Node)
- `sw.js` + `manifest.json` — offline / installable
- `build.js` — static page generator for search engines

Accessibility: keyboard navigable, screen-reader labelled, respects
`prefers-reduced-motion` and `prefers-color-scheme`. Sound is off by default.

## Licence

MIT for the code. Content is CC BY 4.0 — use it, just credit it.
