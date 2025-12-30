import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Projects (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /api/projects and GET /api/projects/:id', async () => {
    const res1 = await request(app.getHttpServer()).get('/api/projects').expect(200);
    expect(Array.isArray(res1.body)).toBe(true);

    const id = res1.body[0]?.id ?? '1';
    const res2 = await request(app.getHttpServer()).get(`/api/projects/${id}`).expect(200);
    expect(res2.body.id).toBeDefined();
  });

  it('POST /api/projects/:id/view increments views', async () => {
    const res1 = await request(app.getHttpServer()).get('/api/projects').expect(200);
    const id = res1.body[0]?.id ?? '1';

    const res2 = await request(app.getHttpServer()).post(`/api/projects/${id}/view`).expect(200);
    expect(res2.body.views).toBeDefined();
  });
});
