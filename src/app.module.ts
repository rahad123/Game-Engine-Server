import { Module } from '@nestjs/common';
import { GameModule } from './game/GameModule';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';

@Module({
  imports: [MongooseModule.forRoot(config.db.uri), GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
