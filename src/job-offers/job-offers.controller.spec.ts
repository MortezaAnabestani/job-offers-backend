import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JobOffersModule } from '../../src/job-offers/job-offers.module';

describe('JobOffersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JobOffersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/job-offers (GET) should return data', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/job-offers')
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('meta');
  });

  it('/api/job-offers?page=0 should return 400', async () => {
    return request(app.getHttpServer())
      .get('/api/job-offers?page=0')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
