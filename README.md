## Spotify Wrapped Clone

A personal "Spotify Wrapped" clone. Sign in with your own Spotify account, then view your top artists, tracks, genres, and listening trends. This project uses **OAuth 2.0 + PKCE** and calls the **Spotify Web API** directly from the client. No server is required.

> **Why this README?**
> Spotify restricts production apps to approved users.
> The work around is simple: anyone can **create their own Spotify Developer app**, plug their credentials in, and run this project locally.

---

## Features

- Secure login via **OAuth 2.0 with PKCE** (no secret on the client).
- Pulls personal listening data (e.g. top artists, tracks, genres, etc.).
- Time range is long term
- Responsive, fast UI (React/Next.js)

---

## Prerequisites

- **Node.js** >= 18 and **npm** (or pnpm/yarn)
- A **Spotify** account
- A **Spotify Developer** account (free) → [developer.spotify.com](https://developer.spotify.com/)

---

## 1) Create a Spotify Developer App

1. Go to **[Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)** → **Create an app**.  
2. Give it any name/description (e.g., `Local Wrapped`).  
3. In **Settings**:
   - Copy your **Client ID** (you won’t need a client secret for PKCE).
   - Under **Redirect URIs**, add the URL your app will use locally. Common choices (pick one your code expects):
     - `http://localhost:3000/callback`
     - `http://localhost:3000/auth/callback`
   - Click **Save**.

> The redirect URI here must **exactly** match what you put in your `.env.local` and what your app’s callback route expects.

---

## 2) Clone & Install

```bash
git clone <YOUR_FORK_OR_THIS_REPO_URL>
cd <project-folder>
npm install
# or: pnpm install / yarn
```

---

## 3) Configure Environment Variables

Create a file named `.env.local` in the project root:

```bash
# Required
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID_HERE
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback

# Space-delimited list of scopes (min needed for top artists/tracks)
NEXT_PUBLIC_SPOTIFY_SCOPES=user-top-read

# Optional scopes depending on features you use:
# user-read-recently-played (for recent tracks)
# user-read-email user-read-private (for profile metadata)
# playlist-modify-private playlist-modify-public (if you add playlist creation later)
# Example:
# NEXT_PUBLIC_SPOTIFY_SCOPES="user-top-read user-read-recently-played user-read-email user-read-private"
```
> **Do not add any client secret** to this file. PKCE doesn't require it, and secrets must never be exposed in a client-only app.

---

## 4) Start the App
```bash
npm run dev
# or: pnpm dev / yarn dev
```
Open [developer.spotify.com](https://developer.spotify.com/). <br>
Click **Log in with Spotify**. You'll be redirected to Spotify, asked to approve the scopes, then sent back to your local callback route.

---

## 5) Build (Optional)
To testa production build locally:
```bash
npm run build
npm run start
# App runs on http://localhost:3000
```

---

## How PKCE Auth Works (Quick)

- Your app creates a **code_verifier** and derived **code_challenge**, then redirects you to Spotify's auth page.
- After consent, Spotify redirects back to your **Redirect URI** with an **authorization code**.
- Your client exchanges that code + **code_verifier** for **access** and **refresh** tokens (no client secred needed).
- The app uses the **access token** to call Spotify's Web API; it **refreshed** it with the **refresh token** when needed.

---

## General Project Structure
```text
src/
├─ app/
│  ├─ callback/            ← OAuth redirect handler (Spotify PKCE callback)
│  |  ├─ page.tsx
│  ├─ dashboard/
│  |  ├─ page.tsx
│  ├─ icon.png
│  ├─ layout.tsx
│  ├─ page.tsx             ← Landing page (login/start)
├─ components/
│  ├─ Button.tsx
│  ├─ Tag.tsx
├─ context/
│  ├─ AuthContext.tsx      ← Provides auth state across app
├─ lib/
│  ├─ cookies.tsx          ← Helpers for storing tokens in cookies
│  ├─ fetch.tsx            ← Generic fetch wrapper
│  ├─ pkce.tsx             ← PKCE helpers (code verifier, challenge)
│  ├─ spotify.tsx          ← Spotify Web API calls
│  ├─ util.tsx
├─ styles/
│  ├─ globals.css
├─ types/
|  ├─ dataTypes.tsx        ← TypeScript types for Spotify responses
├─ .env.local              ← Local environment variables (not commited)
└─ ...
```
> Ensure your callback route path matches the `NEXT_PUBLIC_REDIRECT_URI` you configured.
