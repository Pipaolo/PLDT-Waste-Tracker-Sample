import mongoose, { Mongoose } from "mongoose";

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection.db;
  }
  return mongoose
    .connect(process.env.mongodbURL, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    })
    .then((c) => c.connection.db);
};
