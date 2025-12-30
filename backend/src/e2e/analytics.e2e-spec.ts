import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../../src/app.module';

describe('Analytics (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/analytics/track and GET /api/analytics/stats', async () => {
    const res1 = await request(app.getHttpServer())
      .post('/api/analytics/track')
      .send({ eventType: 'PAGE_VIEW' })
      .expect(201);

    expect(res1.body).toEqual({ success: true });

    const res2 = await request(app.getHttpServer())
      .get('/api/analytics/stats')
      .expect(200);

    expect(res2.body.totalViews).toBeGreaterThanOrEqual(1);
  });
});
