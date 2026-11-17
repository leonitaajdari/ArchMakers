# CLAUDE.md — ArchMakers

## Project overview

ArchMakers is a website where architects find 3D printing, laser-cutting and model-making companies that do architecture work, and request quotes from up to five of them with one form. Architects use it for free. Makers list themselves for free and can upgrade to Pro. ArchMakers never handles money between architects and makers.

Current state (Weekend 2): one landing page, an Express API with `GET /health`, and the first SQLite migration. There are no other pages, no login and no other endpoints yet.

## Technology stack

| Part | Technology |
|---|---|
| Front end | React 19 + Vite 6 (`client/`) |
| Back end | Node.js (22.9+) + Express 5 (`server/`) |
| Database | SQLite via `better-sqlite3`, plain SQL migrations |
| Dev tooling | npm, `concurrently` (runs both servers) |

Details and reasons: `docs/stack.md`.

## Folder structure

```
ArchMakers/
├── CLAUDE.md, README.md
├── package.json            # root scripts: install, migrate, dev
├── docs/                   # source of truth: business, brand book, rules, stack, data model
│   └── brand/              # official logo and Archie files
├── client/                 # front end (React + Vite)
│   └── src/
│       ├── pages/          # HomePage.jsx = the landing page
│       ├── components/     # layout/, landing/, ui/ (+ empty folders for later)
│       ├── content/        # tagline and pitch, word for word from docs
│       ├── styles/         # tokens.css (brand colours, fonts), global.css
│       └── assets/         # logo and Archie SVGs copied from docs/brand
└── server/                 # back end (Express)
    ├── data/               # archmakers.db, created automatically, never committed
    └── src/
        ├── index.js, app.js
        ├── config/         # env.js (settings), database.js (SQLite connection)
        ├── routes/         # health.routes.js
        └── db/             # migrate.js + migrations/001_initial_schema.sql
```

Empty folders with `.gitkeep` (controllers, services, middleware, …) are reserved for later parts.

## Commands

Run these from the repository root:

```bash
npm install        # installs root, client and server dependencies
npm run migrate    # creates server/data/archmakers.db and runs the migrations
npm run dev        # front end http://localhost:5173 + API http://localhost:3001/health
```

Other commands:
- `npm run build` builds the front end.
- `npm run dev --prefix client` or `npm run dev --prefix server` runs one side only.

No `.env` files are needed: the defaults are in `server/.env.example` and `client/.env.example`.

A schema change is a new file, `server/src/db/migrations/002_….sql`. Never edit `001`, then update `docs/data-model.md`, `docs/data-model.dbml` and `docs/data-model.png`.

## Rules for Claude

- **Read docs/ before you change anything.**
- Follow the existing architecture and brand book (`docs/brand-book.md`; colours and fonts live in `client/src/styles/tokens.css`).
- Do not introduce undocumented features. Check `docs/rules-and-flows.md`, including "What version 1 will NOT do".
- Keep the code simple and maintainable.
- Do not modify unrelated files.
- Never commit database files, environment secrets, or `node_modules`.
- Keep the documentation consistent with the implementation.
