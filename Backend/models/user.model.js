import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    preferredLanguage: {
      type: String,
      default: "en", // English by default
    },
  },
  { timestamps: true }
); // createdAt & updatedAt

const User = mongoose.model("User", userSchema);
export default User;
