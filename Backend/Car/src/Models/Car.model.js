import { Schema, model } from "mongoose";

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      default: 5,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    features: {
      type: [String],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rentedBy: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        rentedAt: {
          type: Date,
          default: Date.now,
        },
        returnedAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Car = model("Car", carSchema);

export default Car;
