import { Test } from '@nestjs/testing';
import { GameService } from '../../src/services/GameService';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('GameService Suit', () => {
  let service: GameService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    service = moduleRef.get<GameService>(GameService);
  });

  describe('GameService', () => {
    it('game service test', () => {
      expect(service).toBeDefined();
    });

    it('game create service test', () => {
      expect(service.createGame).toBeDefined();
    });

    it('game gets service test', () => {
      expect(service.getGames).toBeDefined();
    });

    it('game get service test', () => {
      expect(service.getGame).toBeDefined();
    });

    it('game update service test', () => {
      expect(service.updateGame).toBeDefined();
    });

    it('game delete service test', () => {
      expect(service.deleteGame).toBeDefined();
    });
  });
});
