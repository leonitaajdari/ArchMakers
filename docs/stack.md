# Tech stack — ArchMakers v1

Weekend 2, part 1. These choices are based on [`business.md`](business.md) and [`rules-and-flows.md`](rules-and-flows.md): a directory of makers, quote requests sent to up to 5 makers, an inbox, claimed listings, Pro plans and an admin. There are no payments between architects and makers in v1.

## Main stack

| Layer | Technology | Why |
|---|---|---|
| **Front end** | **React + Vite** | React lets the repeated parts of the site (maker cards, filters, the quote form, Archie messages) be built once as components and reused on every page. Vite makes it quick to start and run during development. |
| **Back end** | **Node.js + Express** | Express is a small, well-known way to build the API that enforces the business rules (max 5 makers, 3-working-day deadline, 10 requests per day, Free vs Pro limits). It uses JavaScript, the same language as the front end. |
| **Database** | **PostgreSQL** | The data is strongly connected: architects, makers, quote requests, the makers each request went to, replies, photos, plans and complaints. A relational database with foreign keys and constraints fits that well. It's also what Supabase uses, which matches the hosting costs in `business.md`. |

## Supporting tools (proposed, to confirm)

| Need | Tool | Why |
|---|---|---|
| Talking to the database | **Prisma** (ORM) | All models and their relationships live in one readable `schema.prisma` file, with migrations and seed data. |
| Sending emails (login links, new requests, replies, follow-ups) | **Resend** | Already planned in `business.md`, and its free plan covers launch. |
| Uploaded 3D files (STL, OBJ, 3MF) | Local `uploads/` folder in development, then file storage (e.g. Supabase Storage) | Files must stay private and be deleted after 60 days (rule 10). |

## Not in v1

No payment between architects and makers, no AI assistant, no mobile app and no SMS (see `rules-and-flows.md`, section 4). The payment provider for Pro plans gets decided later.
