// Runs every migration in src/db/migrations that hasn't run yet, in order.
// Usage: npm run migrate
//
// Each applied file is recorded in the schema_migrations table, so running
// this again is safe: nothing is recreated and no data is deleted.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDatabase, closeDatabase } from '../config/database.js';

const migrationsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');

export function runMigrations(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version    TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    ) STRICT;
  `);

  const applied = new Set(
    db.prepare('SELECT version FROM schema_migrations').all().map((row) => row.version),
  );

  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => /^\d{3}_.+\.sql$/.test(file))
    .sort();

  const pending = files.filter((file) => !applied.has(file));

  for (const file of pending) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    // All of a migration runs, or none of it does
    db.transaction(() => {
      db.exec(sql);
      db.prepare('INSERT INTO schema_migrations (version) VALUES (?)').run(file);
    })();
    console.log(`Applied ${file}`);
  }

  if (pending.length === 0) {
    console.log('Database is up to date. No migrations to run.');
  }

  // Make sure no foreign key points to a missing row
  const problems = db.pragma('foreign_key_check');
  if (problems.length > 0) {
    throw new Error(`Foreign key check failed: ${JSON.stringify(problems)}`);
  }

  return pending;
}

// Run directly from the command line
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    runMigrations(connectDatabase());
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exitCode = 1;
  } finally {
    closeDatabase();
  }
}
