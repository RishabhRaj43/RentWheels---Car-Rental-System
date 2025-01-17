import Joi from "joi";

export const registerAdminSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Name is required" }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  }),
});

export const loginAdminSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  }),
});
