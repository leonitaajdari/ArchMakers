import express from 'express';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);

// Anything else: 404 as JSON
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
