import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../server.js';
import Period from '../models/period.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Period.deleteMany();
});

describe('POST /api/periods/log', () => {
  it('should log a new period and return 201', async () => {
    const periodData = {
      startDate: '2025-11-01',
      cycleLength: 28,
    };

    const res = await request(app)
      .post('/api/periods/log')
      .send(periodData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.startDate).toBe(periodData.startDate);

    const periodInDb = await Period.findById(res.body._id);
    expect(periodInDb).not.toBeNull();
    expect(periodInDb.startDate.toISOString().split('T')[0]).toBe(periodData.startDate);
  });
});
