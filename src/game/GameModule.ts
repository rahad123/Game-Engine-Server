import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './GameSchema';
import { GameService } from '../services/GameService';
import { GameController } from '../controllers/GameController';
import { GameValidator } from '../validators/GameValidator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  controllers: [GameController],
  providers: [GameService, GameValidator],
})
export class GameModule {}
