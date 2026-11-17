import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Folder of the server project (server/), so relative paths work from anywhere
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// All settings come from environment variables (server/.env), with safe defaults.
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  databasePath: path.resolve(serverRoot, process.env.DATABASE_PATH ?? 'data/archmakers.db'),
};
