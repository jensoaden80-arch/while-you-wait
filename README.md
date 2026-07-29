# While You Wait

A traveler-archetype quiz for Closequarters Club, built with React, Vite, Tailwind CSS, and Motion.

---

## Local Development

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` (or the next free port). Quiz results post to `/api/submit`, which only exists once deployed to Vercel (or run locally via `vercel dev`) — see below.

## Notion Setup

Follow [NOTION_SETUP.md](./NOTION_SETUP.md) to connect quiz submissions to a Notion database.

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/while-you-wait.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com/new) and import the repository.
2. Framework Preset: **Vite**
3. Under **Environment Variables**, add:
   - `NOTION_API_KEY`, `NOTION_DATABASE_ID` — see [NOTION_SETUP.md](./NOTION_SETUP.md)
4. Click **Deploy**.
