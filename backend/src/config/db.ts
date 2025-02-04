import mongoose from "mongoose";

export const connectDb = () => {
  return mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
};
