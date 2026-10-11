# Hermod landing page

Standalone promo site for Hermod. Vite + React 19 + TypeScript + Tailwind v4, using the same conventions as the dashboard in `../hermod/frontend`.

```sh
npm install
npm run dev     # http://localhost:5173
npm run build
```

- Sections: `src/components/landing/` (Nav, Hero, Why, HowItWorks, Footer).
- Hero copy: `HERO_COPY` in `Hero.tsx`.
- Product video: `public/demo.mp4`, set by `VIDEO_SRC` in `HowItWorks.tsx` (muted loop inside the Safari frame, plays only while visible). "Watch full screen" opens `VideoDialog.tsx`: a full-page player with sound and native controls. The address bar text is `SAFARI_URL`.
- Closing line: `CLOSING_LINE` in `Footer.tsx`. Crowd: `src/components/ui/skiper39.tsx` (Skiper UI, Open Peeps illustration).
- Smooth scrolling: Lenis, set up in `App.tsx`.
- Shader colours: `HALFTONE_PALETTE` in `src/components/ui/halftone-cmyk-newspaper.tsx`.
# hermodLanding
