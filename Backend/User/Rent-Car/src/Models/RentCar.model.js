import mongoose, { Schema } from "mongoose";

const rentCarSchema = new Schema(
  {
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalAmount: { type: Number },
    carAck: { type: Boolean, default: false },
    userAck: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "active",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const RentCar = mongoose.model("RentCar", rentCarSchema);

export default RentCar;
