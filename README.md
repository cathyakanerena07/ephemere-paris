# ÉPHÉMÈRE PARIS

Landing page demo for a fictional Parisian eyewear brand.

## Sections

**Hero** — a monochrome portrait with a rounded "lens" window that reveals the
colour exposure underneath. The window parks on the sunglasses by default and
follows the cursor on hover, its geometry derived from image-space coordinates
so it stays locked to the frames across every crop. On scroll the hero pins and
shrinks into a rounded card.

**Collection** — five frames, each paired with a film of the model wearing them.
Switching products floods the page with a whisper of that frame's own tint,
resolves the product out of a blur, and flips the image/film order left to right
so consecutive products mirror each other.

The films were shot on a flat studio backdrop, so each one is lifted to pure
white by a per-clip brightness value and composited with `mix-blend-multiply` —
the model sits directly on the page with no visible frame edge.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build:check  # verification build, writes to .next-build
```

`build:check` exists because a production build sharing `.next` with a running
dev server will clobber its CSS chunks.
