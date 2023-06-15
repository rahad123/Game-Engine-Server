import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Game {
  @Prop({ index: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  url: string;

  @Prop()
  backgroundImage: string;

  @Prop()
  header: string;

  @Prop()
  ad: string;

  @Prop()
  startButton: string;

  @Prop()
  termsAndConditions: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
