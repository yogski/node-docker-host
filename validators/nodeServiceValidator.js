const Joi = require('joi');

const nodeServiceSchema = Joi.object({
  project_name: Joi.string().required(),
  github_url: Joi.string().uri().required(),
  entrypoint: Joi.string().required(),
});

module.exports = nodeServiceSchema;
