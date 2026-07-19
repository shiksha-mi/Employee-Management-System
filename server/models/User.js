import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
  type: String,
  required: true,
  unique: true,
  match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address",
  ],
},

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["employee", "admin"],
    required: true,
  },

  profileImage: {
    type: String,
     default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;