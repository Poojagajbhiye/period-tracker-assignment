import * as periodService from './period.services';
import logger from '../../utils/logger';

export const logPeriod = async (req, res) => {
  try {
    if (!req?.body) {
      logger.info(`Request body is missing in logPeriod request`);
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { startDate, cycleLength } = req.body;

    if (!startDate || !cycleLength) {
      logger.info(`startDate or cycleLength not in logPeriod request`);
      return res.status(400).json({ message: 'startDate or cycleLength are required' });
    }

    const period = await periodService.createPeriod({ startDate, cycleLength });

    res.status(201).json(period);
    logger.info(`✅ Period logged successfully: ${period}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`❌ Period not logged: ${error.message}`);
  }
};
