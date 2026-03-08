# Theme Redesign: "Stripped Back" Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the LLM-aesthetic blog theme with a brutalist, light-default, system-font design that looks handmade.

**Architecture:** Rewrite all 6 SCSS partials, 4 HTML templates, 1 markdown page, and 1 JS file. The SCSS goes from ~1200 lines to ~300. HTML templates are simplified to remove SVG icons and decorative wrappers. The about page is rewritten as cleaner markdown with minimal HTML.

**Tech Stack:** Jekyll, SCSS, vanilla JS, system fonts only.

---

### Task 1: Rewrite _sass/_variables.scss

**Files:**
- Modify: `_sass/_variables.scss` (full rewrite, currently lines 1-107)

**Step 1: Replace the entire file**

```scss
// Variables - Light default, dark toggle
:root {
  --bg: #fff;
  --text: #111;
  --text-secondary: #666;
  --link: #0066cc;
  --link-hover: #004499;
  --border: #ddd;
  --code-bg: #f5f5f5;
  --code-text: #333;
  --code-border: #e0e0e0;
  --inline-code-bg: #f0f0f0;

  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace;

  --content-width: 720px;
  --header-height: 56px;
}

[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #e0e0e0;
  --text-secondary: #999;
  --link: #6cacf0;
  --link-hover: #8fc4ff;
  --border: #333;
  --code-bg: #252525;
  --code-text: #d4d4d4;
  --code-border: #333;
  --inline-code-bg: #2a2a2a;
}
```

**Step 2: Verify the build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds (site will look broken until other files updated - that's fine)

**Step 3: Commit**

```bash
git add _sass/_variables.scss
git commit -m "refactor: replace variable system with minimal light-default palette"
```

---

### Task 2: Rewrite _sass/_base.scss

**Files:**
- Modify: `_sass/_base.scss` (full rewrite, currently lines 1-215)

**Step 1: Replace the entire file**

```scss
// Base - Reset and element styles

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background-color: var(--bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.3;
  color: var(--text);
  margin-bottom: 0.5rem;
}

h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; margin-top: 2.5rem; }
h3 { font-size: 1.25rem; margin-top: 2rem; }
h4 { font-size: 1.1rem; margin-top: 1.5rem; }

p {
  margin-bottom: 1rem;
}

a {
  color: var(--link);
  text-decoration: none;

  &:hover {
    color: var(--link-hover);
    text-decoration: underline;
  }
}

ul, ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.25rem;
}

blockquote {
  border-left: 3px solid var(--border);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  font-style: italic;

  p:last-child {
    margin-bottom: 0;
  }
}

hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background-color: var(--inline-code-bg);
  padding: 0.15em 0.35em;
  border-radius: 3px;
}

pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;

  code {
    background: none;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
}

th, td {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  text-align: left;
}

th {
  font-weight: 600;
}

strong, b { font-weight: 600; }
em, i { font-style: italic; }

::selection {
  background-color: var(--link);
  color: #fff;
}

:focus-visible {
  outline: 2px solid var(--link);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

**Step 2: Verify the build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add _sass/_base.scss
git commit -m "refactor: simplify base styles to minimal reset and typography"
```

---

### Task 3: Rewrite _sass/_layout.scss

**Files:**
- Modify: `_sass/_layout.scss` (full rewrite, currently lines 1-438)

**Step 1: Replace the entire file**

```scss
// Layout - Header, footer, content structure

.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-content {
  flex: 1;
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-top: calc(var(--header-height) + 3rem);
}

// Header
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.header-inner {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-logo {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;

  &:hover {
    color: var(--text);
    text-decoration: none;
  }
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;

  &:hover {
    color: var(--text);
    text-decoration: none;
  }

  &.active {
    color: var(--text);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  cursor: pointer;

  &:hover {
    color: var(--text);
    border-color: var(--text-secondary);
  }
}

// Mobile menu
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    color: var(--text);
  }
}

.nav-mobile {
  display: none;
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--bg);
  border-top: 1px solid var(--border);
  z-index: 99;
}

// Footer
.site-footer {
  border-top: 1px solid var(--border);
  padding: 2rem 1.5rem;
  margin-top: 3rem;
}

.footer-inner {
  max-width: var(--content-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-secondary);

  a {
    color: var(--text-secondary);

    &:hover {
      color: var(--text);
    }
  }
}

// Responsive
@media (max-width: 640px) {
  .nav-desktop {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .site-header.menu-open .nav-mobile {
    display: flex;
  }

  .site-content {
    padding: 1rem;
    padding-top: calc(var(--header-height) + 2rem);
  }

  h1 {
    font-size: 1.5rem;
  }
}
```

**Step 2: Verify the build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add _sass/_layout.scss
git commit -m "refactor: simplify layout to minimal header, footer, and content"
```

---

### Task 4: Rewrite _sass/_components.scss

**Files:**
- Modify: `_sass/_components.scss` (full rewrite, currently lines 1-1228)

**Step 1: Replace the entire file**

```scss
// Components - Minimal styles for pages

// Homepage intro
.site-intro {
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-size: 1rem;
}

// Post list (used on homepage and archive)
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-list-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.4rem 0;
  gap: 1rem;

  &:hover .post-list-title a {
    color: var(--link);
  }
}

.post-list-title {
  font-size: 1rem;
  font-weight: 400;
  margin: 0;

  a {
    color: var(--text);
    text-decoration: none;

    &:hover {
      color: var(--link);
    }
  }
}

.post-list-date {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
}

.view-all {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.875rem;
}

// Post article
.post-article {
  max-width: var(--content-width);
  margin: 0 auto;
}

.post-back-link {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;

  &:hover {
    color: var(--link);
  }
}

.post-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.post-meta {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.post-tags {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.post-content {
  > h2 { margin-top: 2.5rem; }
  > h3 { margin-top: 2rem; }

  img + em {
    display: block;
    text-align: center;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;
    font-style: normal;
  }
}

// Post footer nav
.post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.post-footer-nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.875rem;
}

.post-nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  max-width: 50%;

  &:hover {
    color: var(--link);
    text-decoration: none;
  }
}

.post-nav-label {
  display: block;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.post-nav-title {
  font-weight: 600;
  color: var(--text);

  .post-nav-link:hover & {
    color: var(--link);
  }
}

.post-nav-next {
  text-align: right;
  margin-left: auto;
}

// Archive page
.archive-header {
  margin-bottom: 1.5rem;
}

.archive-title {
  font-size: 2rem;
  font-weight: 700;
}

.archive-controls {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: var(--font-body);
  color: var(--text);
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  margin-bottom: 1rem;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--link);
  }
}

.tag-cloud {
  margin-bottom: 1rem;
}

.tag-cloud-header {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-filter {
  padding: 0.15rem 0.5rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  background: none;
  border: 1px solid var(--border);
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: var(--text);
    border-color: var(--text-secondary);
  }

  &.active {
    color: var(--link);
    border-color: var(--link);
  }
}

.tag-filter-clear {
  padding: 0.15rem 0.5rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--text);
  }
}

// No results
.no-results {
  padding: 3rem 0;
  text-align: center;
  color: var(--text-secondary);
}

.no-results-reset {
  font-size: 0.875rem;
  color: var(--link);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

// About page
.about-section {
  margin-bottom: 3rem;
}

.about-section h2 {
  margin-bottom: 1rem;
}

.about-item {
  margin-bottom: 1.5rem;
}

.about-item h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  margin-top: 0;
}

.about-item-meta {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.about-item p {
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.connect-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 0.9375rem;
  }
}
```

**Step 2: Verify the build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add _sass/_components.scss
git commit -m "refactor: replace all components with minimal post-list and article styles"
```

---

### Task 5: Simplify _sass/_syntax.scss

**Files:**
- Modify: `_sass/_syntax.scss` (currently lines 1-290)

**Step 1: Replace the entire file**

Keep the syntax highlighting colors (they're fine) but remove the decorative wrapper styles. Replace `var(--accent)` references with `var(--link)`.

```scss
// Syntax Highlighting

.highlight {
  position: relative;
  margin: 1.5rem 0;
  border-radius: 4px;
  overflow-x: auto;
  background-color: var(--code-bg);

  pre {
    margin: 0;
    border: none;
    border-radius: 4px;
  }
}

// Copy button
.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.7rem;
  font-family: var(--font-mono);
  opacity: 0;

  &:hover {
    color: var(--text);
  }

  &.copied {
    color: var(--link);
  }

  .highlight:hover & {
    opacity: 1;
  }
}

// Dark mode syntax (default for [data-theme="dark"])
[data-theme="dark"] .highlight {
  .c, .c1, .cm, .cs { color: #6A737D; font-style: italic; }
  .cp { color: #6A737D; }
  .k, .kc, .kd, .kn, .kp, .kr, .kt { color: #FF7B72; }
  .o, .ow { color: #FF7B72; }
  .p { color: #C9D1D9; }
  .n, .na, .nb, .nc, .nd, .ne, .nf, .ni, .nl, .nn, .no, .nt, .nv, .nx { color: #C9D1D9; }
  .nc, .nf { color: #D2A8FF; }
  .na { color: #79C0FF; }
  .nb { color: #FFA657; }
  .s, .s1, .s2, .sb, .sc, .sd, .se, .sh, .si, .sr, .ss, .sx { color: #A5D6FF; }
  .m, .mf, .mh, .mi, .mo, .mb, .mx, .il { color: #79C0FF; }
  .bp { color: #79C0FF; }
  .vc, .vg, .vi { color: #FFA657; }
  .gd { color: #FFA198; background-color: rgba(255, 161, 152, 0.1); }
  .gi { color: #7EE787; background-color: rgba(126, 231, 135, 0.1); }
  .ge { font-style: italic; }
  .gs { font-weight: bold; }
  .err { color: #F85149; }
  .lineno { color: #484F58; padding-right: 1rem; user-select: none; }
}

// Light mode syntax (default)
.highlight {
  .c, .c1, .cm, .cs { color: #6A737D; font-style: italic; }
  .cp { color: #6A737D; }
  .k, .kc, .kd, .kn, .kp, .kr, .kt { color: #D73A49; }
  .o, .ow { color: #D73A49; }
  .p { color: #24292E; }
  .n, .na, .nb, .nc, .nd, .ne, .nf, .ni, .nl, .nn, .no, .nt, .nv, .nx { color: #24292E; }
  .nc, .nf { color: #6F42C1; }
  .na { color: #005CC5; }
  .nb { color: #E36209; }
  .s, .s1, .s2, .sb, .sc, .sd, .se, .sh, .si, .sr, .ss, .sx { color: #032F62; }
  .m, .mf, .mh, .mi, .mo, .mb, .mx, .il { color: #005CC5; }
  .bp { color: #005CC5; }
  .vc, .vg, .vi { color: #E36209; }
  .gd { color: #B31D28; background-color: rgba(179, 29, 40, 0.1); }
  .gi { color: #22863A; background-color: rgba(34, 134, 58, 0.1); }
  .ge { font-style: italic; }
  .gs { font-weight: bold; }
  .err { color: #B31D28; }
  .lineno { color: #959DA5; padding-right: 1rem; user-select: none; }
}
```

**Step 2: Verify the build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add _sass/_syntax.scss
git commit -m "refactor: simplify syntax highlighting, remove decorative wrappers"
```

---

### Task 6: Simplify _sass/_utilities.scss

**Files:**
- Modify: `_sass/_utilities.scss` (currently lines 1-205)

**Step 1: Replace the entire file**

Only keep what's actually needed:

```scss
// Utilities

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Step 2: Verify the build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add _sass/_utilities.scss
git commit -m "refactor: strip utilities to sr-only"
```

---

### Task 7: Rewrite _includes/header.html

**Files:**
- Modify: `_includes/header.html` (full rewrite, currently lines 1-57)

**Step 1: Replace the entire file**

```html
<header class="site-header">
  <div class="header-inner">
    <a href="{{ '/' | relative_url }}" class="site-logo">Jeff.dev</a>

    <nav class="nav-desktop">
      <a href="{{ '/' | relative_url }}" class="nav-link{% if page.url == '/' %} active{% endif %}">Home</a>
      <a href="{{ '/archive/' | relative_url }}" class="nav-link{% if page.url == '/archive/' %} active{% endif %}">Archive</a>
      <a href="{{ '/about/' | relative_url }}" class="nav-link{% if page.url == '/about/' %} active{% endif %}">About</a>
    </nav>

    <div class="header-actions">
      <button class="theme-toggle" aria-label="Toggle dark mode" id="theme-toggle">dark</button>

      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
        &#9776;
      </button>
    </div>
  </div>

  <nav class="nav-mobile">
    <a href="{{ '/' | relative_url }}" class="nav-link{% if page.url == '/' %} active{% endif %}">Home</a>
    <a href="{{ '/archive/' | relative_url }}" class="nav-link{% if page.url == '/archive/' %} active{% endif %}">Archive</a>
    <a href="{{ '/about/' | relative_url }}" class="nav-link{% if page.url == '/about/' %} active{% endif %}">About</a>
  </nav>
</header>
```

**Step 2: Commit**

```bash
git add _includes/header.html
git commit -m "refactor: simplify header to plain text, remove SVG icons"
```

---

### Task 8: Rewrite _includes/footer.html

**Files:**
- Modify: `_includes/footer.html` (full rewrite, currently lines 1-67)

**Step 1: Replace the entire file**

```html
<footer class="site-footer">
  <div class="footer-inner">
    <span>&copy; {{ site.time | date: '%Y' }} {{ site.title }}</span>
    {% if site.social.github %}
    <a href="https://github.com/{{ site.social.github }}">GitHub</a>
    {% endif %}
  </div>
</footer>
```

**Step 2: Commit**

```bash
git add _includes/footer.html
git commit -m "refactor: reduce footer to single line with copyright and GitHub link"
```

---

### Task 9: Rewrite _layouts/default.html

**Files:**
- Modify: `_layouts/default.html` (currently lines 1-58)

**Step 1: Replace the entire file**

Remove Google Fonts, remove MathJax (can re-add if needed), simplify theme init script.

```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en-US' }}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
    <meta name="description" content="{{ page.description | default: site.description | strip_html | truncatewords: 50 }}">

    <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">

    <script>
      (function() {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      })();
    </script>

    <!-- MathJax for mathematical equations -->
    <script>
      MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true
        }
      };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  </head>

  <body>
    <div class="site-wrapper">
      {% include header.html %}

      <main class="site-content">
        {{ content }}
      </main>

      {% include footer.html %}
    </div>

    <script src="{{ '/assets/js/main.js' | relative_url }}"></script>
  </body>
</html>
```

**Step 2: Commit**

```bash
git add _layouts/default.html
git commit -m "refactor: remove Google Fonts, flip to light-default theme init"
```

---

### Task 10: Rewrite _layouts/post.html

**Files:**
- Modify: `_layouts/post.html` (full rewrite, currently lines 1-93)

**Step 1: Replace the entire file**

```html
---
layout: default
---

<article class="post-article">
  <header class="post-header">
    <a href="{{ '/' | relative_url }}" class="post-back-link">&larr; Back to posts</a>

    <h1 class="post-title">{{ page.title }}</h1>

    <div class="post-meta">
      <time datetime="{{ page.date | date_to_xmlschema }}">
        {{ page.date | date: "%B %d, %Y" }}
      </time>
    </div>

    {% if page.tags.size > 0 %}
    <div class="post-tags">
      {{ page.tags | join: ", " }}
    </div>
    {% endif %}
  </header>

  <div class="post-content">
    {{ content }}
  </div>

  <footer class="post-footer">
    <div class="post-footer-nav">
      {% if page.previous.url %}
      <a href="{{ page.previous.url | relative_url }}" class="post-nav-link">
        <span class="post-nav-label">&larr; Previous</span>
        <span class="post-nav-title">{{ page.previous.title | truncatewords: 8 }}</span>
      </a>
      {% endif %}

      {% if page.next.url %}
      <a href="{{ page.next.url | relative_url }}" class="post-nav-link post-nav-next">
        <span class="post-nav-label">Next &rarr;</span>
        <span class="post-nav-title">{{ page.next.title | truncatewords: 8 }}</span>
      </a>
      {% endif %}
    </div>
  </footer>
</article>
```

**Step 2: Commit**

```bash
git add _layouts/post.html
git commit -m "refactor: simplify post layout, remove reading time and human-written badge"
```

---

### Task 11: Rewrite index.html (Homepage)

**Files:**
- Modify: `index.html` (full rewrite, currently lines 1-77)

**Step 1: Replace the entire file**

```html
---
layout: default
title: Jeff Bradley
description: Engineering, AI, and life - a blog by Jeff Bradley
---

<p class="site-intro">I'm Jeff. I write about engineering, AI, and life.</p>

<ul class="post-list">
  {% for post in site.posts limit:15 %}
  <li class="post-list-item">
    <span class="post-list-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </span>
    <span class="post-list-date">{{ post.date | date: "%b %d, %Y" }}</span>
  </li>
  {% endfor %}
</ul>

{% if site.posts.size > 15 %}
<a href="{{ '/archive/' | relative_url }}" class="view-all">View all posts &rarr;</a>
{% endif %}
```

**Step 2: Verify the build and preview**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add index.html
git commit -m "refactor: replace homepage hero and card grid with simple post list"
```

---

### Task 12: Rewrite archive.md

**Files:**
- Modify: `archive.md` (currently lines 1-169)

**Step 1: Replace the entire file**

Keep the search/filter JS (it works), but simplify the HTML structure.

```markdown
---
layout: default
title: Archive
description: Complete archive of all blog posts.
permalink: /archive/
---

<div class="archive-header">
  <h1 class="archive-title">Archive</h1>
</div>

<div class="archive-controls">
  <input type="text" id="search-input" class="search-input" placeholder="Search by title..." aria-label="Search posts">

  <div class="tag-cloud">
    <div class="tag-cloud-header">Filter by tags</div>
    <div class="tag-filters" id="tag-filters">
      {% assign all_tags = "" | split: "" %}
      {% for post in site.posts %}
        {% for tag in post.tags %}
          {% unless all_tags contains tag %}
            {% assign all_tags = all_tags | push: tag %}
          {% endunless %}
        {% endfor %}
      {% endfor %}
      {% assign sorted_tags = all_tags | sort %}
      {% for tag in sorted_tags %}
      <button class="tag-filter" data-tag="{{ tag }}">{{ tag }}</button>
      {% endfor %}
      <button class="tag-filter-clear" id="clear-filters" style="display: none;">Clear</button>
    </div>
  </div>
</div>

<ul class="post-list" id="posts-list">
  {% for post in site.posts %}
  <li class="post-list-item" data-title="{{ post.title | downcase }}" data-tags="{{ post.tags | join: ' ' | downcase }}">
    <span class="post-list-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </span>
    <span class="post-list-date">{{ post.date | date: "%b %d, %Y" }}</span>
  </li>
  {% endfor %}
</ul>

<div id="no-results" class="no-results" style="display: none;">
  <p>No posts found.</p>
  <button class="no-results-reset" id="reset-filters">Reset filters</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search-input');
  var postsList = document.getElementById('posts-list');
  var posts = postsList.querySelectorAll('.post-list-item');
  var noResults = document.getElementById('no-results');
  var tagFilters = document.querySelectorAll('.tag-filter');
  var clearButton = document.getElementById('clear-filters');
  var resetButton = document.getElementById('reset-filters');

  var selectedTags = [];

  function filterPosts() {
    var query = searchInput.value.toLowerCase().trim();
    var visibleCount = 0;

    posts.forEach(function(post) {
      var title = post.getAttribute('data-title');
      var tags = post.getAttribute('data-tags');

      var matchesSearch = query === '' || title.includes(query);
      var matchesTags = selectedTags.length === 0 || selectedTags.every(function(tag) {
        return tags.includes(tag.toLowerCase());
      });

      var matches = matchesSearch && matchesTags;
      post.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    postsList.style.display = visibleCount === 0 ? 'none' : 'block';
    clearButton.style.display = selectedTags.length > 0 ? 'inline-block' : 'none';
  }

  searchInput.addEventListener('input', filterPosts);

  tagFilters.forEach(function(button) {
    button.addEventListener('click', function() {
      var tag = this.getAttribute('data-tag');
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        selectedTags = selectedTags.filter(function(t) { return t !== tag; });
      } else {
        this.classList.add('active');
        selectedTags.push(tag);
      }
      filterPosts();
    });
  });

  clearButton.addEventListener('click', function() {
    selectedTags = [];
    tagFilters.forEach(function(btn) { btn.classList.remove('active'); });
    filterPosts();
  });

  resetButton.addEventListener('click', function() {
    selectedTags = [];
    searchInput.value = '';
    tagFilters.forEach(function(btn) { btn.classList.remove('active'); });
    filterPosts();
  });
});
</script>
```

**Step 2: Commit**

```bash
git add archive.md
git commit -m "refactor: simplify archive to flat post list, keep search and tag filter"
```

---

### Task 13: Rewrite about.md

**Files:**
- Modify: `about.md` (full rewrite, currently lines 1-221)

**Step 1: Replace the entire file**

Strip all the custom HTML components. Keep the content, render it simply.

```markdown
---
layout: default
title: About
description: Principal AI Engineer and founder of MetaReason.
permalink: /about/
---

# Hello, World.

I'm Jeff, but my friends call me Field. I'm a Principal AI Engineer with over 15 years of software engineering experience, now focused exclusively on AI/ML. I build AI systems and frameworks, lead AI strategy, and I'm deeply interested in the evaluation and development of responsible, trustworthy AI systems.

I'm also the founder of [MetaReason](https://github.com/metareason-ai), where I'm working to quantify AI confidence through rigorous statistical methods and modern NLP techniques.

## At Work

<div class="about-item">
<h3>AI for Logistics Operations</h3>
<div class="about-item-meta">Principal AI Engineer</div>
<p>I've been in logistics software for 17 years. These days I build AI systems that automate the repetitive stuff logistics professionals deal with: shipment tracking, rate sheet updates, carrier lookups. The industry still runs on spreadsheets and phone calls. We're changing that with agents that work alongside humans.</p>
</div>

<div class="about-item">
<h3>Agentic AI Systems</h3>
<div class="about-item-meta">LangGraph, MCP, Multi-Agent</div>
<p>I design and build agentic workflows that handle complex, multi-step processes on their own. These agent swarms integrate with existing business processes: reading emails, updating spreadsheets, querying carrier systems. No need to overhaul how things work.</p>
</div>

<div class="about-item">
<h3>AI Governance & ISO 42001</h3>
<div class="about-item-meta">AIMS Implementation</div>
<p>I built our AI Management System from scratch. No expensive compliance platforms, just Jira, Confluence, and git. I lead internal audits, risk assessments, and impact assessments. I push back on compliance theater in favor of governance that actually adds value.</p>
</div>

## At Play

<div class="about-item">
<h3>MetaReason</h3>
<div class="about-item-meta">Founder</div>
<p>After years of evaluating LLMs and building evaluation frameworks in enterprise settings, I've seen firsthand how hard it is to create consistently trustworthy AI systems. <a href="https://github.com/metareason-ai">MetaReason</a> is my attempt to bring classical probability and statistics to bear on this problem. Open Source, Open Governance, and hopefully beyond the qualitative hand-waving.</p>
</div>

<div class="about-item">
<h3>Self-Improvement</h3>
<div class="about-item-meta">Lifelong Learner</div>
<p>I'm a lifelong learner, addicted to technical books. My hobbies are reading, studying, and more reading. When I'm not building AI systems or reading research papers, you'll find me with a book in hand. Usually something about software engineering, AI/ML, or philosophy.</p>
</div>

<div class="about-item">
<h3>Family & Friends</h3>
<div class="about-item-meta">Greenville, SC</div>
<p>I live in Greenville, SC with my wife and our dog Jones. Family and close friendships keep me grounded and remind me there's more to life than work and code.</p>
</div>

## Technical Stack

**AI/ML & Data Science:** Python, PyTorch, scikit-learn, pandas, numpy

**Cloud & MLOps:** Google Cloud, Vertex AI, BigQuery, Kubernetes

**Backend:** Java, Spring Boot, PostgreSQL, MongoDB

**Frontend:** TypeScript, Node.js, Vue.js

## Editorial Standard

All articles on this blog are conceived, researched, and written by me. I do not use AI to generate content from scratch.

I use LLMs as a conversational editor: catching grammatical errors, critiquing logical flow, and suggesting structural improvements.

## Connect

[GitHub](https://github.com/metareason-ai) &middot; [LinkedIn](https://www.linkedin.com/in/jeff-bradley-b66266275) &middot; [Email](mailto:jeff@metareason.ai)
```

**Step 2: Commit**

```bash
git add about.md
git commit -m "refactor: rewrite about page as simple markdown with minimal HTML"
```

---

### Task 14: Rewrite assets/js/main.js

**Files:**
- Modify: `assets/js/main.js` (full rewrite, currently lines 1-220)

**Step 1: Replace the entire file**

Remove reading progress, back-to-top, simplify theme toggle. Keep copy buttons and mobile menu.

```javascript
(function() {
  'use strict';

  // Theme toggle
  function toggleTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      updateToggleLabel('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateToggleLabel('light');
    }
  }

  function updateToggleLabel(label) {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = label;
  }

  // Set initial toggle label
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  updateToggleLabel(isDark ? 'light' : 'dark');

  // Mobile menu
  function toggleMobileMenu() {
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    if (header && toggle) {
      var isOpen = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', isOpen);
    }
  }

  // Copy code buttons
  function addCopyButtons() {
    var codeBlocks = document.querySelectorAll('.highlight pre');
    codeBlocks.forEach(function(pre) {
      var wrapper = pre.closest('.highlight');
      if (!wrapper || wrapper.querySelector('.copy-button')) return;

      var button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'copy';
      button.setAttribute('aria-label', 'Copy code');

      button.addEventListener('click', function() {
        navigator.clipboard.writeText(pre.textContent).then(function() {
          button.textContent = 'copied';
          button.classList.add('copied');
          setTimeout(function() {
            button.textContent = 'copy';
            button.classList.remove('copied');
          }, 2000);
        });
      });

      wrapper.appendChild(button);
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', function() {
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    var menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);

    addCopyButtons();
  });

  // Close mobile menu on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 640) {
      var header = document.querySelector('.site-header');
      if (header) header.classList.remove('menu-open');
    }
  });
})();
```

**Step 2: Verify the full build**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll build 2>&1 | tail -5`
Expected: Build succeeds with no errors

**Step 3: Commit**

```bash
git add assets/js/main.js
git commit -m "refactor: simplify JS to theme toggle, mobile menu, and copy buttons"
```

---

### Task 15: Visual verification and polish

**Step 1: Start local server**

Run: `cd /Users/fieldbradley/Projects/jeffgbradley2.github.io && bundle exec jekyll serve`

**Step 2: Check all pages in browser**

Verify these pages visually:
- Homepage: intro line + post list with dates
- A post: back link, title, date, tags, content, prev/next
- Archive: search works, tag filter works, post list renders
- About: sections render, links work
- Dark mode toggle works on all pages

**Step 3: Fix any issues found**

Address visual bugs (spacing, alignment, etc.)

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: polish theme after visual review"
```
