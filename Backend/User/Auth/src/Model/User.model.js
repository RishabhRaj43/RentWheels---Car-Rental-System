import mongoose,{Types} from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    licenseNumber: {
      type: String,
      required: [true, "Please add a license number"],
      unique: true,
      index: true,
    },
    Rentals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rental" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
