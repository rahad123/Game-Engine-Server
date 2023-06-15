import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';

describe('Delete Game Controller suit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Invalid Delete Game Controller', () => {
    it('should not delete a game with invalid game id', async () => {
      const id = '645ba0408558cd692c6ef5we';
      const response = await request(app.getHttpServer()).delete(
        `/games/${id}`,
      );

      expect(response.status).toBe(500);
    });
  });

  describe('Valid Delete Game Controller', () => {
    it('should delete a game', async () => {
      const gameData = {
        name: faker.lorem.words(),
        image: faker.lorem.words(),
        url: faker.lorem.words(),
        backgroundImage: faker.lorem.words(),
        header: faker.lorem.words(),
        ad: faker.lorem.words(),
        startButton: faker.lorem.words(),
        termsAndConditions: faker.lorem.words(),
      };
      const createGame = await request(app.getHttpServer())
        .post('/games')
        .send(gameData);
      const response = await request(app.getHttpServer()).delete(
        `/games/${createGame.body._id}`,
      );

      expect(response.body.deletegame).toBe(true);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
