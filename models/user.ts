import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  phoneNumber: string;
  name: string;
  points: number;
}

const UserSchema: Schema = new Schema<IUser>({
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

UserSchema.post("save", (error, res, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("A User already registered with that number."));
  } else {
    next();
  }
});

export default models.User || model<IUser>("User", UserSchema);
