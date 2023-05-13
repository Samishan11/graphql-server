import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
// database connection
const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    // error
    console.log(error.message);
  }
};

export default connectDB;
