import mongoose from "mongoose";
import validator from "validator";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("refresh", UserSchema);
