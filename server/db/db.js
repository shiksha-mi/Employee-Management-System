import mongoose from "mongoose";

const connectToDatabase = async () => {
  console.log("🚀 connectToDatabase() called");
  console.log("MONGODB_URL =", process.env.MONGODB_URL);

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");
    console.log(error);
  }
};

export default connectToDatabase;