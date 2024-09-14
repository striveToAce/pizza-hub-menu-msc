import express from 'express';
import menuRoutes from './routes/menuRoutes'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Register routes
app.use('/api/menu', menuRoutes);

export default app;
