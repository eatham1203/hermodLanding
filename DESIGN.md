# Design

Monochrome, Notion-like, calm. Reads like a printed clinic handout.

## Tokens (src/index.css `@theme`)
- Colour: `page` #f7f6f2 (ground), `surface` #fff (How section), `subtle`, `border`, `border-strong`, `ink` #1c1c1a, `ink-soft`, `muted` #66635d (≥5.5:1 on page). No accent colour.
- Type: `font-serif` Source Serif 4 (wordmark, headings, questions, step titles); `font-sans` Inter (body, UI). Body 17/28 (`text-body`), max ~60ch.
- Radius: 6px max (`rounded-md`) on content, 1px borders, no shadows on content.
- Liquid glass (`glass` utility in index.css): frosted pane, specular rim, soft depth. Used only for the nav pills and buttons, always `rounded-full`. Falls back to near-solid white without backdrop-filter or with reduced transparency.
- Focus: 2px ink outline, 3px offset. Selection: ink on page.

## Patterns
- Numbered lists are editorial rows split by 1px rules, never cards.
- Hero halftone shader: warm-gray inks (`HALFTONE_PALETTE` in `components/ui/halftone-cmyk-newspaper.tsx`) behind a radial paper wash. Drifts slowly (timeScale 0.35); still under reduced motion.
- Product video sits in the Magic UI Safari frame (`components/ui/safari.tsx`), with macOS traffic-light colours as the only colour on the page.
- Smooth scrolling: Lenis (`ReactLenis root` in App.tsx), off under reduced motion.
- How it works (lg+): section pins for a 380svh scroll track (four steps); Safari video left (plays only in view), steps crossfade on the right. Opacity, drift and bar fill are written from scroll position each frame (no timed transitions). Below lg it stacks, all steps visible.
- Closing: the serif line sits above the Skiper UI Crowd Canvas (Open Peeps sprite in public/illustrations), lazy-loaded near the viewport, paused off screen and under reduced motion.
- Any demo material must be labelled "fictional patient".

## Banned
Gradients as decoration, glass outside nav/buttons, glow, icon-in-circle feature cards, eyebrow labels, invented stats, logos or testimonials.
