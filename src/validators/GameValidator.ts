import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class GameValidator {
  createGameValidator(): Joi.ObjectSchema {
    return Joi.object({
      name: Joi.string().required(),
      image: Joi.string().required(),
      url: Joi.string().required(),
      backgroundImage: Joi.string().required(),
      header: Joi.string().required(),
      ad: Joi.string().required(),
      startButton: Joi.string().required(),
      termsAndConditions: Joi.string().required(),
    });
  }

  updateGameValidator(): Joi.ObjectSchema {
    return Joi.object({
      name: Joi.string(),
      image: Joi.string(),
      url: Joi.string(),
      backgroundImage: Joi.string(),
      header: Joi.string(),
      ad: Joi.string(),
      startButton: Joi.string(),
      termsAndConditions: Joi.string(),
    });
  }
}
