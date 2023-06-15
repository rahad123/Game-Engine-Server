import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../game/GameSchema';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  async getGames(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }
  async getGame(id: string): Promise<Game> {
    return this.gameModel.findById(id).exec();
  }
  async updateGame(id: string, update: Partial<Game>): Promise<Game> {
    return this.gameModel.findByIdAndUpdate(id, update, { new: true });
  }
  async createGame(game: Game): Promise<Game> {
    const createdGame = new this.gameModel(game);
    return createdGame.save();
  }
  async deleteGame(id: string): Promise<Game> {
    return this.gameModel.findByIdAndDelete(id).exec();
  }
}
