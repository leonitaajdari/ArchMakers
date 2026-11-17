# ArchMakers

**A website where architects find 3D printing, laser-cutting and model-making companies that do architecture work, and request quotes from up to five of them with one form.**

Project by **Leonita Ajdari**, Rapid AI Development course.
- **Weekend 1:** idea, business and brand, before any code.
- **Weekend 2:** landing page, back end, data model.

## Run it (three commands)

You need [Node.js](https://nodejs.org) 22.9 or newer. After cloning, run these from the repository folder:

```bash
npm install
npm run migrate
npm run dev
```

1. **`npm install`** installs the dependencies for the root, `client/` and `server/`.
2. **`npm run migrate`** creates the SQLite database `server/data/archmakers.db` and its tables.
3. **`npm run dev`** starts both servers:
   - Landing page: http://localhost:5173
   - API health check: http://localhost:3001/health, which returns `{"status":"ok","database":"connected"}`

Stop both with `Ctrl+C`. No `.env` file is needed.

## Docs

| File | Contents |
|---|---|
| [`docs/business.md`](docs/business.md) | Parts 1–4: problem, big picture, market, business model and price |
| [`docs/brand-book.md`](docs/brand-book.md) | Part 5: name, tagline, logo, colours, fonts, tone of voice, Archie the mascot |
| [`docs/brand/`](docs/brand/) | Logo files, Archie, one-page brand sheet |
| [`docs/rules-and-flows.md`](docs/rules-and-flows.md) | Part 6: users and roles, main flows, business rules, what v1 will not do |
| [`docs/stack.md`](docs/stack.md) | Weekend 2: tech stack (React + Vite, Express, SQLite) and why |
| [`docs/data-model.md`](docs/data-model.md) | Weekend 2: tables, relationships, ER diagram, first migration |
| [`CLAUDE.md`](CLAUDE.md) | Project rules and commands for working with Claude |

![Brand sheet](docs/brand/brand-sheet.png)

## Credits

The idea came from conversations with my cousin, an architect in Germany. The business decisions are mine. The docs, logo and brand sheet were drafted with help from Claude (AI) and then reviewed and edited by me.
