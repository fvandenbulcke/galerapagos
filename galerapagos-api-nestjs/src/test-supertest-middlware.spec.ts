import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MiddleWareModule } from './app/middleware.module';

describe('supertest middleware', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [MiddleWareModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should not patch field review when id is invalid', () => {
    return request(app.getHttpServer())
      .get('/candidature/reviews')
      .set('Content-Type', 'application/json')
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Review field with id wrong-id is not founds',
      });
  });
});
