import { Test } from '@nestjs/testing';
import { GameController } from '../../src/controllers/GameController';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Gamecontroller Suit', () => {
  let controller: GameController;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    controller = moduleRef.get<GameController>(GameController);
  });

  describe('GameController', () => {
    it('game controller test', () => {
      expect(controller).toBeDefined();
    });

    it('game create controller test', () => {
      expect(controller.createGame).toBeDefined();
    });

    it('game gets controller test', () => {
      expect(controller.getGames).toBeDefined();
    });

    it('game get controller test', () => {
      expect(controller.getGame).toBeDefined();
    });

    it('game update controller test', () => {
      expect(controller.updateGame).toBeDefined();
    });

    it('game delete controller test', () => {
      expect(controller.deleteGame).toBeDefined();
    });
  });
});
