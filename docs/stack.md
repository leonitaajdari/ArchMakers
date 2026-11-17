# Tech stack — ArchMakers v1

Weekend 2, part 1. These choices are based on [`business.md`](business.md) and [`rules-and-flows.md`](rules-and-flows.md): a directory of makers, quote requests sent to up to 5 makers, an inbox, claimed listings, Pro plans and an admin. There are no payments between architects and makers in v1.

## Main stack

| Layer | Technology | Why |
|---|---|---|
| **Front end** | **React + Vite** | React lets the repeated parts of the site (maker cards, filters, the quote form, Archie messages) be built once as components and reused on every page. Vite makes it quick to start and run during development. |
| **Back end** | **Node.js + Express** | Express is a small, well-known way to build the API that enforces the business rules (max 5 makers, 3-working-day deadline, 10 requests per day, Free vs Pro limits). It uses JavaScript, the same language as the front end. |
| **Database** | **SQLite** (with `better-sqlite3`) | A relational database stored in one local file (`server/data/archmakers.db`), so it handles the connected data (makers, quote requests, replies) with no database server to install. |

### Change: PostgreSQL → SQLite (Weekend 2, part 3)

Part 1 planned PostgreSQL. The Weekend 2 assignment asks for a local SQLite database, so v1 uses SQLite. Both are relational and use SQL, so the data model stays the same. If ArchMakers later needs many users writing at the same time or hosted backups, the data can move to PostgreSQL (e.g. Supabase). Prisma is dropped for now: `better-sqlite3` with plain SQL is enough for this stage.

## Supporting tools (proposed, to confirm)

| Need | Tool | Why |
|---|---|---|
| Sending emails (login links, new requests, replies, follow-ups) | **Resend** | Already planned in `business.md`, and its free plan covers launch. |
| Uploaded 3D files (STL, OBJ, 3MF) | Local `uploads/` folder in development, then file storage (e.g. Supabase Storage) | Files must stay private and be deleted after 60 days (rule 10). |

## Not in v1

No payment between architects and makers, no AI assistant, no mobile app and no SMS (see `rules-and-flows.md`, section 4). The payment provider for Pro plans gets decided later.
