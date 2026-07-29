# Notion Integration Guide

Quiz submissions log directly to a Notion database — name, email, all four answers, the resulting archetype, and a timestamp — one row per completion.

The database already exists: **[Quiz QnA](https://app.notion.com/p/3accc540df09804a81f3d7021c187a59)**, nested under your "Databases" page, with this schema:

`Name (title) | Email | Q1 | Q2 | Q3 | Q4 | Archetype Code | Archetype Name (select) | Submitted At (auto)`

You don't need to touch the schema — this guide is just about getting the **live app** permission to write to it. (A separate Claude/MCP connection can read/write it interactively in chat, but that has nothing to do with what the deployed website can access — the website needs its own credential, set up below.)

---

## Step 1: Create a Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations).
2. **New integration** → give it a name (e.g. "While You Wait Quiz") → select the **Quarterspace** workspace → **Submit**.
3. On the integration's page, under **Capabilities**, make sure **Insert content** is checked (it's on by default).
4. Copy the **Internal Integration Secret** — it starts with `ntn_...`. This is `NOTION_API_KEY`.

---

## Step 2: Share the database with the integration

An integration can't see anything until you explicitly connect it to a page — same idea as inviting a person.

1. Open the [Quiz QnA](https://app.notion.com/p/3accc540df09804a81f3d7021c187a59) database in Notion.
2. Click the **"•••"** menu (top right) → **Connections** → search for the integration you just created → add it.

---

## Step 3: Get the Database ID

It's the string right after `notion.so/` (before any `?v=`) in the database's URL:

`https://app.notion.com/p/`**`3accc540df09804a81f3d7021c187a59`**

That's `NOTION_DATABASE_ID` — already `3accc540df09804a81f3d7021c187a59` for this database.

---

## Step 4: Add the credentials to Vercel

**Settings → Environment Variables**:

| Key | Value |
|---|---|
| `NOTION_API_KEY` | the `ntn_...` secret from Step 1 |
| `NOTION_DATABASE_ID` | `3accc540df09804a81f3d7021c187a59` |

Redeploy after saving — Vercel only picks up new env vars on the next deploy.

---

## Step 5: Test it

Submit the quiz once for real and check the database for a new row. If nothing shows up, check the Vercel deployment's function logs (Vercel dashboard → project → Deployments → latest → Functions → `api/submit`) — errors there will say exactly what's wrong (almost always a database not yet shared with the integration, from Step 2).

For local testing, run `vercel dev` with a `.env.local` file (copy `.env.example`, fill in your real values) instead of deploying every time.
