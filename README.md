# Make a Difference (MAD)

A volunteer management platform that connects everyday people with local
causes — clean-ups, food drives, mentoring programs, and more. Organizers
post what they need, volunteers find opportunities that fit their time, and
the two sides connect directly.

**Live site:** https://make-a-difference-90f54.web.app
**API:** https://make-a-difference-peach.vercel.app

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18, React Router 6, Vite, Tailwind CSS, daisyUI |
| Auth | Firebase Authentication (email/password, Google, GitHub) |
| Backend | Node.js, Express, JWT, cookie-parser |
| Database | MongoDB (Atlas) |
| Hosting | Firebase Hosting (client) / Vercel (server) |

---

## Features

- **Volunteer feed** — Browse open opportunities with search, category filter,
  and grid / list view toggle. Each card shows a deadline countdown, open
  spots, and the organizer.
- **Post a need** — Organizers create posts in a clean, basic form. New posts
  appear immediately in the feed.
- **Apply in one click** — Logged-in users can request to volunteer; the
  request shows up under "My Requests" with a status chip.
- **Manage your posts** — Update, delete, or change the number of volunteers
  for any post you created.
- **Feedback wall** — Users leave site-wide feedback that everyone can read.
- **Authentication** — Email/password, Google, and GitHub sign-in via
  Firebase. Server issues a JWT cookie on login for protected endpoints.
- **Dark mode** — Persisted across sessions.
- **Responsive design** — Works on mobile, tablet, and desktop.

---

## Project structure

```
Make-a-Difference/
├── Make_a_Difference_Client/   # React + Vite frontend
│   ├── src/
│   │   ├── api.js              # Centralized fetch helpers
│   │   ├── components/         # Shared UI (Thumbnail, etc.)
│   │   ├── Firebase/           # Firebase auth config
│   │   ├── Layout/             # Root layout (Navbar + Outlet + Footer)
│   │   ├── Pages/              # Route-level pages
│   │   ├── Provider/           # Auth context
│   │   ├── Routes/             # React Router definitions
│   │   └── utils/              # Pure helpers
│   ├── vite.config.js          # Vite + dev /api proxy
│   └── firebase.json           # Hosting config
└── Make_a_Difference_Server/   # Express API
    ├── index.js                # Routes, JWT, CORS, Mongo
    └── vercel.json
```

---

## Local development

### Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string
- A Firebase project (for client auth)

### Run the server

```bash
cd Make_a_Difference_Server
npm install
# create .env with:
#   DB_USER=...
#   DB_PASSWORD=...
#   ACCESS_TOKEN_SECRET=...
node index.js
```

Server runs on `http://localhost:5000`.

### Run the client

```bash
cd Make_a_Difference_Client
npm install
# create .env.local with your Firebase config:
#   VITE_APIKEY=...
#   VITE_AUTHDOMAIN=...
#   VITE_PROJECTID=...
#   VITE_STORAGEBUCKET=...
#   VITE_MESSAGINGSENDERID=...
#   VITE_APPID=...
#   VITE_API_BASE=https://make-a-difference-peach.vercel.app
npm run dev
```

Client runs on `http://localhost:5173`. In dev, all `/api/*` requests are
proxied to the Vercel server by Vite — no CORS configuration needed locally.

---

## Deployment

### Frontend (Firebase Hosting)

```bash
cd Make_a_Difference_Client
npm run build
firebase deploy --only hosting
```

### Backend (Vercel)

The server auto-deploys when changes are pushed to the connected branch on
Vercel. To deploy manually:

```bash
cd Make_a_Difference_Server
vercel --prod
```

---

## API reference

| Method | Path | Description |
|---|---|---|
| `GET` | `/volunteer` | First 6 posts sorted by deadline |
| `GET` | `/volunteerall` | All volunteer posts |
| `POST` | `/volunteer` | Create a new post |
| `GET` | `/volunteer/:email` | Posts created by a user |
| `GET` | `/vol/:id` | Single post by id |
| `PUT` | `/updatevol/:id` | Update a post |
| `DELETE` | `/deletevol/:id` | Delete a post |
| `GET` | `/search/:title` | Search posts by exact title |
| `POST` | `/request` | Apply to volunteer |
| `GET` | `/myreq/:email` | Requests submitted by a user |
| `DELETE` | `/deletereq/:id` | Cancel a request |
| `POST` | `/feedback` | Submit site feedback |
| `GET` | `/feeds` | All feedback entries |
| `POST` | `/jwt` | Issue auth cookie |
| `POST` | `/logout` | Clear auth cookie |

---

## Contact

**Niaz Morshed** — niazmorshedrafi@gmail.com
[GitHub: niiazmorshed/Make-a-Difference](https://github.com/niiazmorshed/Make-a-Difference)
