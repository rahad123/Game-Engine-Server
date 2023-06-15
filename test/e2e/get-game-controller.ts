import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import mongoose from 'mongoose';

describe('Get Game Controller suit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Invalid Get Game Controller', () => {
    it('should not return a game with invalid game id', async () => {
      const id = mongoose.Types.ObjectId;
      const response = await request(app.getHttpServer()).get(`/games/${id}`);

      expect(response.status).toBe(500);
    });
  });

  describe('Valid Get Game Controller', () => {
    it('should return a game', async () => {
      const id = '645d263a624296fe95e2ec30';
      const response = await request(app.getHttpServer())
        .get(`/games/${id}`)
        .expect(200);

      expect(response.body.game).toBeInstanceOf(Object);
    });

    it('should return a game with exact property validation', async () => {
      const id = '645d263a624296fe95e2ec30';
      const response = await request(app.getHttpServer())
        .get(`/games/${id}`)
        .expect(200);

      expect(response.body.game).toBeInstanceOf(Object);
      expect(response.body.game.name).toEqual(expect.any(String));
      expect(response.body.game.image).toEqual(expect.any(String));
      expect(response.body.game.url).toEqual(expect.any(String));
      expect(response.body.game.backgroundImage).toEqual(expect.any(String));
      expect(response.body.game.header).toEqual(expect.any(String));
      expect(response.body.game.ad).toEqual(expect.any(String));
      expect(response.body.game.startButton).toEqual(expect.any(String));
      expect(response.body.game.termsAndConditions).toEqual(expect.any(String));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
