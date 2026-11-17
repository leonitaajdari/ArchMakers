import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase, closeDatabase } from './config/database.js';

// Connect to SQLite first; if that fails, don't start the server
connectDatabase();

const server = app.listen(env.port, () => {
  console.log(`ArchMakers API running on http://localhost:${env.port} (${env.nodeEnv})`);
});

// Close the database cleanly when the server stops (Ctrl+C)
function shutdown() {
  server.close(() => {
    closeDatabase();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
