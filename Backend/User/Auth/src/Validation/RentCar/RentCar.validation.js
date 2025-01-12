import Joi from "joi";

export const rentCarValidation = (data) => {
  const schema = Joi.object({
    carId: Joi.string().required().messages({
      "any.required": "Car id is required",
      "string.base": "Car id must be a string",
    }),
    userId: Joi.string().required().messages({
      "any.required": "User id is required",
      "string.base": "User id must be a string",
    }),
    date: Joi.date().required().messages({
      "any.required": "Date is required",
      "date.base": "Date must be a date",
    }),
    time: Joi.string().required().messages({
      "any.required": "Time is required",
      "string.base": "Time must be a string",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};
