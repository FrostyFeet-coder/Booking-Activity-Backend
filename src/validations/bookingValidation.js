const Joi = require('joi');

const bookingValidation = (data) => {
  const schema = Joi.object({
    activityId: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = bookingValidation;
