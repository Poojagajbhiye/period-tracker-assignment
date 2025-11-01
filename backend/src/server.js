import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import { ENV } from './config/env.js';

const env = process.env.NODE_ENV || ENV.DEVELOPMENT;

let envFile = '.env.dev';
if (env === ENV.PRODUCTION) {
    envFile = '.env.prod';
} else if (env === ENV.STAGING) {
    envFile = '.env.stage';
}

dotenv.config({ path: envFile });

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server running in ${env} mode on port ${PORT}`));

export default app;
