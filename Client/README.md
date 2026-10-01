# Vjeera HR — Academy Website

A 3-page frontend-only React site (Vite + React Router + Bootstrap 5) built from the
Vjeera HR web development project brief.

## Pages
- **Home** (`/`) — hero, our story, vision & values, 5 focus areas, testimonial
- **Courses** (`/courses`) — programme objectives, learning path, HR Generalist tracks,
  HR Analytics tracks, admissions/batches
- **Contact** (`/contact`) — contact form (frontend-only, no backend) + address/phone

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Notes
- Bootstrap 5 is loaded via CDN in `index.html` (CSS + JS bundle) — no extra install needed.
- No backend: the contact form just shows a confirmation message on submit; wire it up
  to your own API or a form service (e.g. Formspree) when you're ready to receive
  submissions for real.
- Routing is handled by `react-router-dom` in `src/App.jsx`.
