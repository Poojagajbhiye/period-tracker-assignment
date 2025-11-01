import express from 'express';
import { logPeriod } from './period.controller.js';

const router = express.Router();

router.post('/log', logPeriod);

export default router;
