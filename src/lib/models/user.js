import mongoose from "mongoose";
import slugify from "slugify";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  normalizedUserName: { // userName slugifié
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
