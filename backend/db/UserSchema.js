import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [
      true,
      "Every User must have a unique Email. Please provide Email",
    ],
    unique: [true, "Email already in use"],
    validate: [validator.isEmail, "Invalid Email"],
    lowercase: true,
  },
  image: String
});

export default mongoose.model('user', UserSchema)