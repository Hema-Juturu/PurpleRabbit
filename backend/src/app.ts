import express, { Application } from 'express';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app: Application = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);

export default app;