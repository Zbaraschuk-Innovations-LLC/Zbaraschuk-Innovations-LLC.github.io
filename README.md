# Zbaraschuk Innovations — Website

Static marketing site for **Zbaraschuk Innovations LLC**, served via GitHub Pages at [zbarinnovation.com](https://zbarinnovation.com).

No build step. No framework. Just HTML, CSS, and a tiny vanilla-JS file.

## Project structure

```
.
├── index.html        # Home — editorial hero + principles + CTA
├── about.html        # About the studio — long-form article
├── mission.html      # Mission statement + three pillars
├── contact.html      # Contact form (mailto-based)
├── styles.css        # Shared stylesheet — design tokens, components, layouts
├── site.js           # Reveal-on-scroll observer + active nav link
├── assets/
│   ├── logo-mark.png
│   └── logo-wordmark.png
├── CNAME             # Custom domain for GitHub Pages
└── .nojekyll         # Disables Jekyll processing on GitHub Pages
```

## Running locally

The site is fully static — any HTTP server will do.

### Option A — Python (no install needed on macOS)

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000**.

### Option B — Node

```bash
npx serve
```

Picks a port automatically and prints the URL.

### Option C — VS Code Live Server

Install the *Live Server* extension, right-click `index.html` → **Open with Live Server**. Bonus: auto-reloads on save.

## Editing the design

### Color, type, and spacing tokens

All design tokens live as CSS custom properties at the top of [`styles.css`](styles.css):

- `--bg-0` … `--bg-3` — background tones
- `--fg-0` … `--fg-3` — foreground / text inks
- `--silver-1` … `--silver-3` — accent palette
- `--font-display` (Cormorant Garamond), `--font-sans` (Manrope), `--font-mono` (JetBrains Mono)
- `--shell-max`, `--gutter` — layout container

Tokens swap based on `<html data-bg="..." data-accent="...">`. The site ships with `data-bg="light"` (inverted off-white) and `data-accent="pure"` (silver). The CSS also supports `data-bg="true"` (true black), `data-bg="charcoal"`, `data-accent="platinum"`, `data-accent="steel"` if you want to flip the look — change the attributes on the `<html>` element of each page.

### Page-specific styles

Each page is built from shared component classes in `styles.css`:

- `.nav`, `.footer` — chrome (every page)
- `.hero` + `.hero-editorial` — home page
- `.principles`, `.cta-strip` — home sections
- `.page-header`, `.article` — about page
- `.mission-statement`, `.mission-pillars` — mission page
- `.contact-grid`, `.form`, `.mini-map` — contact page

### Reveal-on-scroll

Add `class="reveal"` to any element. Stagger by setting `style="--delay:120ms"` on later elements. Logic lives in [`site.js`](site.js).

## Contact form

The contact form on [`contact.html`](contact.html) builds a `mailto:` URL on submit with the user's subject and message prefilled, opening the visitor's default mail client. The destination address is assembled from two halves in JS at submit time so it isn't a contiguous string in the page source.

To change the destination, edit the `TO` constant in the inline `<script>` near the bottom of [`contact.html`](contact.html).

If you'd rather use a real backend (Formspree, a Cloudflare Worker, etc.), replace the form's submit handler with a `fetch()` to your endpoint and remove the mailto assembly.

## Deployment

This repo is named `Zbaraschuk-Innovations-LLC.github.io`, so **pushing to `main` automatically deploys** via GitHub Pages. There is no build step.

```bash
git add -A
git commit -m "your message"
git push
```

GitHub Pages will serve the updated site within a minute or so.

### Custom domain

The [`CNAME`](CNAME) file points the site at `zbarinnovation.com`. For DNS, set either:

- `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, **or**
- `CNAME` → `zbaraschuk-innovations-llc.github.io`

Then enable HTTPS in the repo's **Settings → Pages**.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `color-mix()`, `clamp()`, `aspect-ratio`, and `IntersectionObserver` — all widely supported as of 2024+. Reduces motion automatically when `prefers-reduced-motion: reduce` is set.

## License

© Zbaraschuk Innovations LLC. All rights reserved.
