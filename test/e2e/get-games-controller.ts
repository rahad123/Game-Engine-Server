import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Get Games Controller suit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Valid Get Games Controller', () => {
    it('should return an array of games', async () => {
      const response = await request(app.getHttpServer())
        .get('/games')
        .expect(200);

      expect(response.body.games).toBeInstanceOf(Array);
      expect(response.body).toBeInstanceOf(Object);
    });

    it('should return the games with exact property validation', async () => {
      const response = await request(app.getHttpServer())
        .get('/games')
        .expect(200);

      expect(response.body.games).toBeInstanceOf(Array);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.games[0]).toBeInstanceOf(Object);
      expect(response.body.games[0].name).toEqual(expect.any(String));
      expect(response.body.games[0].image).toEqual(expect.any(String));
      expect(response.body.games[0].url).toEqual(expect.any(String));
      expect(response.body.games[0].backgroundImage).toEqual(
        expect.any(String),
      );
      expect(response.body.games[0].header).toEqual(expect.any(String));
      expect(response.body.games[0].ad).toEqual(expect.any(String));
      expect(response.body.games[0].startButton).toEqual(expect.any(String));
      expect(response.body.games[0].termsAndConditions).toEqual(
        expect.any(String),
      );
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
