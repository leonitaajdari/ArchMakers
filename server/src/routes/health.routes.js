import { Router } from 'express';
import { isDatabaseHealthy } from '../config/database.js';

const router = Router();

// GET /health — is the server running and can it reach the database?
router.get('/', (req, res) => {
  if (!isDatabaseHealthy()) {
    return res.status(503).json({ status: 'error', database: 'disconnected' });
  }
  res.status(200).json({ status: 'ok', database: 'connected' });
});

export default router;
