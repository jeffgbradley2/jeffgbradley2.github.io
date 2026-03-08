# Blog Theme Redesign: "Stripped Back"

## Problem

The current theme has an LLM-generated aesthetic: indigo/purple accents, Inter + JetBrains Mono fonts, card grids with hover animations, frosted glass header, glow effects. It looks like every other AI-generated site.

## Goals

- Look like a person made it, not a template
- Brutalist-leaning, inspired by Gwern.net but simpler
- Light default with dark toggle
- System fonts only, no external font loading
- Classic blue links
- Content-first, minimal decoration

## Color System

### Light (default)
- Background: `#fff`
- Text: `#111`
- Secondary text: `#666`
- Links: `#0066cc`
- Borders: `#ddd`
- Code bg: `#f5f5f5`, code text: `#333`

### Dark mode
- Background: `#1a1a1a`
- Text: `#e0e0e0`
- Links: `#6cacf0`
- Borders: `#333`
- Code bg: `#252525`

## Typography

- Body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`
- Code: `ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace`
- Base: 16px, line-height 1.6
- Headings: bolder weight of system font, no letter-spacing tricks
- No Google Fonts

## Header

- Plain text logo: "Jeff.dev" as a link
- Nav: Home, Archive, About as plain text links
- Simplified theme toggle
- Fixed top, solid background (no frosted glass)
- Bottom border

## Footer

- Single line: copyright + optional GitHub link
- No logo repeat, no tagline, no nav duplication

## Homepage

- One sentence intro (not a hero section)
- Flat list of 10-15 recent posts: title (link) + date
- No excerpts, no tags, no reading time, no cards
- "View all posts" link to archive

## Post Page

- Plain text "Back to posts" with arrow character
- Title, date, tags as comma-separated plain text
- No reading time, no "Human Written" badge
- Same readable 720px content width
- Prev/next as simple text links

## Archive Page

- Plain search input (no icon SVG)
- Tag filters as plain text buttons
- Same flat post list format as homepage
- No post count, no reading time per entry

## About Page

- Keep sections (At Work, At Play, etc.) as h2 + paragraphs
- Strip all HTML wrapper divs, timeline dots, skill grids, principle cards
- Contact links as plain text, not styled buttons

## What Gets Deleted

- All `--accent-subtle`, `--accent-glow`, `--shadow-glow` variables
- Google Fonts link tags (Inter, JetBrains Mono)
- `.logo-icon` component
- `.post-card` component and grid
- `.hero` section styling
- `.experience-timeline` and `.experience-dot`
- `.principle-card` and `.principles-grid`
- `.skills-grid` and `.skill-tag`
- `.terminal-window` component
- `.human-written-badge` / `.human-written-tag`
- `.back-to-top` button
- `.reading-progress` bar
- All `backdrop-filter` / frosted glass
- All `translateY`, `box-shadow: glow`, hover transform animations
- Footer brand/nav/links sections
