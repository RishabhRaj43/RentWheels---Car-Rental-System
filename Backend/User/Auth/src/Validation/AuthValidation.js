import joi from "joi";

export const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(20).messages({
      "any.required": "Please add a name",
      "string.empty": "Please add a name",
      "string.min": "Name should have at least 3 characters",
      "string.base": "Name should be a string",
      "string.max": "Name should not exceed 20 characters",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Please add an email",
      "string.empty": "Please add an email",
      "string.email": "Invalid email format",
    }),
    password: joi.string().required().min(6).max(20).messages({
      "any.required": "Please add a password",
      "string.empty": "Please add a password",
      "string.min": "Password should have at least 6 characters",
      "string.max": "Password should not exceed 20 characters",
    }),
    phone: joi.string().required().min(10).messages({
      "any.required": "Please add a phone number",
      "string.empty": "Please add a phone number",
      "string.min": "Phone number should have at least 10 characters",
    }),
    avatar: joi.string().messages({
      "string.base": "Avatar should be a string",
    }),
    address: joi.string().required().min(5).messages({
      "any.required": "Please add an address",
      "string.empty": "Please add an address",
      "string.min": "Address should have at least 5 characters",
    }),
    licenseNumber: joi.string().required().min(5).messages({
      "any.required": "Please add a license number",
      "string.empty": "Please add a license number",
      "string.min": "License number should have at least 5 characters",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

export const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "any.required": "Please add an email",
      "string.empty": "Please add an email",
      "string.email": "Invalid email format",
    }),
    password: joi.string().required().min(6).messages({
      "any.required": "Please add a password",
      "string.empty": "Please add a password",
      "string.min": "Password should have at least 6 characters",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

export const updateValidation = (data) => {
  if (!data || Object.keys(data).length === 0 ) {
    throw new Error("Data is required");
  }
  const schema = joi.object({
    name: joi.string().min(3).messages({
      "string.min": "Name should have at least 3 characters",
      "string.base": "Name should be a string",
    }),
    email: joi.string().email().messages({
      "string.email": "Invalid email format",
    }),
    password: joi.string().min(6).messages({
      "string.min": "Password should have at least 6 characters",
    }),
    phone: joi.string().min(10).messages({
      "string.min": "Phone number should have at least 10 characters",
    }),
    avatar: joi.string().messages({
      "string.base": "Avatar should be a string",
    }),
    address: joi.string().min(5).messages({
      "string.min": "Address should have at least 5 characters",
    }),
    licenseNumber: joi.string().min(5).messages({
      "string.min": "License number should have at least 5 characters",
    }),
  });

  console.log(data);

  return schema.validate(data, { abortEarly: false });
};
