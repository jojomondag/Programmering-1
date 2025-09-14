# Programmering 1 — Java Course Materials

Lightweight course pages for Java basics: variables, input/output and small assignments.

Quick start

1. Open `index.html` in your browser or run a local server:

```bash
npm install
npm start
```

Project layout

- `index.html`, `variabler.html`, `utskrifter.html`, `berattelse.html` — main pages
- `content/` — Markdown source files
- `js/markdown-loader.js` — client-side markdown renderer and utilities
- `Images/` — course illustrations

Notes

- Prism.js and Tailwind are loaded from CDNs in the HTML files.
- React-based components were removed to simplify the project. Markdown fences starting with `react:` are rendered as static code examples and highlighted as Java by default.

If you want, I can:
- Start the local server and verify the pages load.
- Convert `react:` fences in `content/*.md` into normal code fences.