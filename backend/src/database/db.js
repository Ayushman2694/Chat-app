import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`MONGODB connected ${connect.connection.host}`);
  } catch (err) {
    console.log("database connection error", err);
  }
};
