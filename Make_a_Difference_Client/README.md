# Make a Difference — Client

React + Vite frontend for **Make a Difference (MAD)**, a volunteer
opportunities platform.

**Live site:** https://make-a-difference-90f54.web.app

> See the [repo root README](../README.md) for full project info, API
> reference, and feature list.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production bundle into dist/
npm run preview      # serve the built bundle locally
firebase deploy --only hosting
```

## Environment

Create `.env.local`:

```
VITE_APIKEY=...
VITE_AUTHDOMAIN=...
VITE_PROJECTID=...
VITE_STORAGEBUCKET=...
VITE_MESSAGINGSENDERID=...
VITE_APPID=...
VITE_API_BASE=https://make-a-difference-peach.vercel.app
```

In dev, all `/api/*` requests are proxied to `VITE_API_BASE` by Vite — see
`vite.config.js`. This sidesteps CORS for local development.

## Tech

React 18 · React Router 6 · Tailwind CSS · daisyUI · Firebase Auth · AOS ·
SweetAlert2 · Swiper · Lottie · react-hot-toast
