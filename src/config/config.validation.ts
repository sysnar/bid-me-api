import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
