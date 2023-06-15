import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

describe('Update Game Controller suit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Invalid Update Game Controller', () => {
    it('should not update a game with invalid property', async () => {
      const id = '645dad38c9ad67eb96cf3d15';
      const gameData = {
        name: faker.datatype.number(),
      };
      const response = await request(app.getHttpServer())
        .put(`/games/${id}`)
        .send(gameData);

      expect(response.status).toBe(422);
    });

    it('should not update a game with invalid id', async () => {
      const id = mongoose.Types.ObjectId;
      const gameData = {
        name: faker.lorem.words(),
      };
      const response = await request(app.getHttpServer())
        .put(`/games/${id}`)
        .send(gameData);
      expect(response.status).toBe(500);
    });
  });

  describe('Valid Update Game Controller', () => {
    it('should update a game', async () => {
      const id = '645dad38c9ad67eb96cf3d15';
      const gameData = {
        name: faker.lorem.words(),
        image: faker.lorem.words(),
        url: faker.lorem.words(),
      };
      const response = await request(app.getHttpServer())
        .put(`/games/${id}`)
        .send(gameData)
        .expect(200);

      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.updateGame.name).toEqual(expect.any(String));
      expect(response.body.updateGame.url).toEqual(expect.any(String));
      expect(response.body.updateGame.image).toEqual(expect.any(String));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
