import Period from './period.model.js';

export const createPeriod = async (data) => {
  try {
    const period = new Period(data);
    await period.save();
    return period;
  } catch (error) {
    throw new Error(`Failed to create period: ${error.message}`);
  }
};