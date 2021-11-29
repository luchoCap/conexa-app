import * as Joi from 'joi';

export const userSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().required().min(3),
});
