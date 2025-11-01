import express from 'express';
import { logPeriod } from './period.controller';

const router = express.Router();

router.post('/log', logPeriod);

export default router;
