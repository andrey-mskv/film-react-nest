import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  DATABASE_DRIVER: Joi.string().valid('mongodb', 'postgres').required(),

  // Mongo
  DATABASE_URL: Joi.when('DATABASE_DRIVER', {
    is: 'mongodb',
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),

  // Postgres
  DATABASE_HOST: Joi.when('DATABASE_DRIVER', {
    is: 'postgres',
    then: Joi.string().required(),
  }),

  DATABASE_PORT: Joi.when('DATABASE_DRIVER', {
    is: 'postgres',
    then: Joi.number().required(),
  }),

  DATABASE_NAME: Joi.when('DATABASE_DRIVER', {
    is: 'postgres',
    then: Joi.string().required(),
  }),

  DATABASE_USERNAME: Joi.when('DATABASE_DRIVER', {
    is: 'postgres',
    then: Joi.string().required(),
  }),

  DATABASE_PASSWORD: Joi.when('DATABASE_DRIVER', {
    is: 'postgres',
    then: Joi.string().required(),
  }),
});
