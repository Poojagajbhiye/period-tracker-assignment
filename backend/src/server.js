import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import { ENV } from './config/env.js';
import periodRoutes from '../src/features/period/period.routes.js';
import cors from 'cors';

const env = process.env.NODE_ENV || ENV.DEVELOPMENT;

let envFile = '.env.dev';
if (env === ENV.PRODUCTION) {
    envFile = '.env.prod';
} else if (env === ENV.STAGING) {
    envFile = '.env.stage';
}

dotenv.config({ path: envFile });

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use('/api/periods', periodRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`Server running in ${env} mode on port ${PORT}`));
}

export default app;
