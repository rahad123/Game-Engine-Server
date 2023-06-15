import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { GameService } from '../services/GameService';
import { Game } from '../game/GameSchema';
import { GameValidator } from '../validators/GameValidator';
import { Response } from 'express';

@Controller()
export class GameController {
  constructor(
    private readonly appService: GameService,
    private gameValidator: GameValidator,
  ) {}
  @Get('/games')
  async getGames(@Res() res: Response) {
    try {
      const games = await this.appService.getGames();
      res.json({
        games: games,
      });
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/games')
  async createGame(@Body() payload, @Res() res: Response) {
    try {
      console.log('payload', payload);
      const validateSiteRequest = this.gameValidator
        .createGameValidator()
        .validate(payload);
      if (validateSiteRequest.error) {
        return res.status(422).send('UNPROCESSABLE_ENTITY');
      }
      const createGame = await this.appService.createGame(payload);
      console.log('createGame', createGame);
      res.status(201).json(createGame);
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/games/:id')
  async getGame(@Param('id') id: string, @Res() res: Response) {
    try {
      console.log('is');
      const game = await this.appService.getGame(id);
      res.json({
        game: game,
      });
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: string,
    @Body() update: Partial<Game>,
    @Res() res: Response,
  ) {
    try {
      const validateSiteRequest = this.gameValidator
        .updateGameValidator()
        .validate(update);
      if (validateSiteRequest.error) {
        return res.status(422).send('UNPROCESSABLE_ENTITY');
      }
      const updateGame = await this.appService.updateGame(id, update);
      res.json({
        updateGame: updateGame,
      });
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/games/:id')
  async deleteGame(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<boolean> {
    try {
      const deletegame = await this.appService.deleteGame(id);
      if (!deletegame) return false;
      res.json({
        deletegame: true,
      });
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
