import * as Joi from 'joi';

export const paginateUsersSchema = Joi.object({
  token: Joi.string().required(),
  path: Joi.string().required(),
  search: Joi.string(),
  pageLimit: Joi.number().required(),
  pageNumber: Joi.number().required(),
});
