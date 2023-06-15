import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';

describe('Create Game Controller suit', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Invalid Create Game Controller', () => {
    it('should not create a game with invalid property', async () => {
      const gameData = {
        name: faker.datatype.number(),
        image: faker.lorem.words(),
        url: faker.lorem.words(),
        backgroundImage: faker.lorem.words(),
        header: faker.lorem.words(),
        ad: faker.lorem.words(),
        startButton: faker.lorem.words(),
        termsAndConditions: faker.lorem.words(),
      };
      const response = await request(app.getHttpServer())
        .post('/games')
        .send(gameData);

      expect(response.status).toBe(422);
    });

    it('should not create a game without required filed', async () => {
      const gameData = {
        image: faker.lorem.words(),
        url: faker.lorem.words(),
        backgroundImage: faker.lorem.words(),
        header: faker.lorem.words(),
        ad: faker.lorem.words(),
        startButton: faker.lorem.words(),
        termsAndConditions: faker.lorem.words(),
      };
      const response = await request(app.getHttpServer())
        .post('/games')
        .send(gameData);

      expect(response.status).toBe(422);
    });
  });

  describe('Valid Create Game Controller', () => {
    it('should create a game', async () => {
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
      const response = await request(app.getHttpServer())
        .post('/games')
        .send(gameData);

      expect(response.body).toBeInstanceOf(Object);
      expect(response.status).toBe(201);
      expect(response.body.name).toEqual(expect.any(String));
      expect(response.body.url).toEqual(expect.any(String));
      expect(response.body.ad).toEqual(expect.any(String));
      expect(response.body.image).toEqual(expect.any(String));
      expect(response.body.backgroundImage).toEqual(expect.any(String));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
