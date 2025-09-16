# Programmering 1 — Java Course Materials

Lightweight course pages for Java basics: variables, input/output and small assignments.

Quick start

1. Open `index.html` in your browser or run a local server:

```bash
npm install
npm start
```

Project layout

- `index.html`, `variabler.html`, `utskrifter.html`, `ifsatser.html`, `loopar.html`, `arrays.html` — main pages
- `content/` — Markdown source files
- `js/markdown-loader.js` — client-side markdown renderer and utilities
- `Images/` — course illustrations

Notes

- Prism.js and Tailwind are loaded from CDNs in the HTML files.
- React-based components were removed to simplify the project. Markdown fences starting with `react:` are rendered as static code examples and highlighted as Java by default.

Cleanup summary (Sep 2025)

- Removed the unused React stubs `js/react-markdown-loader.js` and `js/syntax-components.js`
- Removed the unused Berättelse page and moved the content under `content/variabler.md` (still filtered from the page view by default)
- Added Arrays section: `arrays.html` and `content/arrays.md`
- Fixed navigation emoji for If-satser and simplified the Utskrifter header (no external image dependency)
- Standardized dev script: `npm start` now serves on port 3001

Content filtering

- The page `variabler.html` intentionally hides the section starting at the H2 heading "Inlämningsuppgift: Berättelse" from `content/variabler.md`. This is done in `js/markdown-loader.js` (method `filterSections`) before rendering. Remove or adjust that filter if you want the Berättelse assignment to appear again.

If you want, I can:
- Start the local server and verify the pages load.
- Convert `react:` fences in `content/*.md` into normal code fences.