import Joi from "joi";

const carValidationSchema = Joi.object({
  // i want to get data
  
  name: Joi.string().required().messages({
    "string.empty": "Car name is required.",
    "any.required": "The 'name' field is required.",
  }),
  brand: Joi.string().required().messages({
    "string.empty": "Brand is required.",
    "any.required": "The 'brand' field is required.",
  }),
  model: Joi.string().required().messages({
    "string.empty": "Model is required.",
    "any.required": "The 'model' field is required.",
  }),
  year: Joi.number()
    .integer()
    .min(1886) // Cars were invented in 1886
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Year must be a number.",
      "number.min": "Year cannot be before 1886.",
      "number.max": `Year cannot be after ${new Date().getFullYear()}.`,
      "any.required": "The 'year' field is required.",
    }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive number.",
    "any.required": "The 'price' field is required.",
  }),
  fuelType: Joi.string()
    .valid("Petrol", "Diesel", "Electric", "Hybrid")
    .required()
    .messages({
      "any.only":
        "Fuel type must be one of 'Petrol', 'Diesel', 'Electric', or 'Hybrid'.",
      "any.required": "The 'fuelType' field is required.",
    }),
  mileage: Joi.number().positive().messages({
    "number.base": "Mileage must be a number.",
    "number.positive": "Mileage must be a positive number.",
  }),
  seats: Joi.number().integer().positive().min(1).messages({
    "number.base": "Seats must be a number.",
    "number.min": "A car must have at least one seat.",
  }),
  transmission: Joi.string().valid("Automatic", "Manual").messages({
    "any.only": "Transmission must be either 'Automatic' or 'Manual'.",
  }),
  color: Joi.string().messages({
    "string.base": "Color must be a string.",
  }),
  description: Joi.string().max(500).messages({
    "string.base": "Description must be a string.",
    "string.max": "Description cannot exceed 500 characters.",
  }),
  images: Joi.array().items(Joi.string()).messages({
    "array.base": "Images must be an array of strings.",
  }),
  features: Joi.array().items(Joi.string()).messages({
    "array.base": "Features must be an array of strings.",
  }),
  isAvailable: Joi.boolean().messages({
    "boolean.base": "isAvailable must be a boolean value.",
  }),
  rentedBy: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().required().messages({
          "string.base": "User ID must be a string.",
          "any.required": "Each rental must have a user ID.",
        }),
        rentedAt: Joi.date().required().messages({
          "date.base": "Rented at must be a valid date.",
          "any.required": "Each rental must have a rentedAt date.",
        }),
        returnedAt: Joi.date().optional().messages({
          "date.base": "Returned at must be a valid date.",
        }),
      })
    )
    .messages({
      "array.base": "RentedBy must be an array of rental records.",
    }),
});

export default carValidationSchema;