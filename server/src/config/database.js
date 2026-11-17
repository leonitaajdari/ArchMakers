import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { env } from './env.js';

let db;

/**
 * Opens the SQLite database. The data folder and the .db file
 * are created automatically if they don't exist yet.
 */
export function connectDatabase() {
  if (db) return db;

  fs.mkdirSync(path.dirname(env.databasePath), { recursive: true });
  db = new Database(env.databasePath);

  // Enforce relationships between tables once we add them
  db.pragma('foreign_keys = ON');

  const { version } = db.prepare('SELECT sqlite_version() AS version').get();
  console.log(`SQLite ${version} connected: ${env.databasePath}`);
  return db;
}

/** Returns true if the database answers a simple query. */
export function isDatabaseHealthy() {
  try {
    return db?.prepare('SELECT 1 AS ok').get().ok === 1;
  } catch {
    return false;
  }
}

export function closeDatabase() {
  db?.close();
  db = undefined;
}
