import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return 429 when we get to request number 6 within 1 minute', () => {
    for (let i = 0; i < 6; i++) {
      if (i <= 5) {
        request(app.getHttpServer()).get('/').expect(200);
      } else {
        request(app.getHttpServer()).get('/').expect(429);
      }
    }
  });
});
