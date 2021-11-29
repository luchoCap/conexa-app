import * as Joi from 'joi';

export const envSchema = Joi.object({
  ENVIRONMENT: Joi.string()
    .valid('local', 'development', 'production', 'test')
    .default('local'),
  PORT: Joi.number().default(1236),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_LOGIN_EXPIRED_IN: Joi.string().required(),
  LOGIN_ENDPOINT: Joi.string().required(),
});
