# PalmAI Backend — Database-Free Build

This is a zero-setup version of the PalmAI backend. There's no MongoDB, no Cloudinary account,
and no OpenAI key required to get the full app running end-to-end.

- **Database** → a local JSON file at `data/db.json` (created automatically on first run)
- **Image storage** → saved to `uploads/` on disk and served by this same server, unless
  Cloudinary credentials are provided, in which case it uses Cloudinary instead
- **AI analysis** → returns a realistic mock palm reading instantly, unless an `OPENAI_API_KEY`
  is provided, in which case it calls the real OpenAI Vision API

This has been tested end-to-end: signup, login, profile, image upload, AI analyze, history
listing, single-report fetch, and delete all work correctly with zero configuration.

## Run it (3 steps)

```bash
npm install
cp .env.example .env
```

Open `.env` and set just one value — everything else can stay blank:

```env
JWT_SECRET=any_long_random_string_you_want
```

Then:

```bash
npm run dev
```

You should see:

```
PalmAI backend (database-free build) listening on port 5000 [development]
Data persisted to: .../backend-nodb/data/db.json
Image storage: local disk (backend-nodb/uploads)
AI engine: mock demo reading (set OPENAI_API_KEY for real analysis)
```

Point the frontend at it as usual (`NEXT_PUBLIC_API_URL=http://localhost:5000/api` in
`frontend/.env.local`) and the whole app — signup, upload, analyze, premium report, history,
PDF export — works immediately.

## Upgrading pieces individually

You don't have to go all-or-nothing. Fill in only the env vars you want to make real:

- Add `OPENAI_API_KEY` (+ `OPENAI_MODEL`) → real AI readings instead of the mock one, images
  still stored locally.
- Add `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` → images go to
  Cloudinary instead of local disk, AI can stay mocked or real independently.
- Add `GOOGLE_CLIENT_ID` → enables the "Sign in with Google" button (frontend needs the matching
  `NEXT_PUBLIC_GOOGLE_CLIENT_ID` too).

## Limitations vs. the MongoDB build (`../backend/`)

- **Not meant for production traffic.** The JSON file is read fully into memory and rewritten on
  every change — fine for a single developer or a small demo, not for concurrent users at scale.
- **No concurrent-write safety.** Two simultaneous requests that both mutate data could race each
  other (last write wins). MongoDB in the main `backend/` build handles this properly.
- **Single-file, single-server.** Won't work across multiple server instances/replicas, since each
  would have its own local `data/db.json` and `uploads/` folder.

When you're ready to actually deploy this for real users, switch to `../backend/` with a real
MongoDB Atlas cluster — the API surface is identical, so the frontend needs zero changes.
