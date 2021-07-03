import { Schema, Document, model, models } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  password: string;
  phoneNumber: string;
  name: string;
  points: number;
}

const UserSchema: Schema = new Schema<IUser>(
  {
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
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Handle password Hashing
UserSchema.pre("save", function (this: IUser, next) {
  let user = this;

  // We only need to hash the password if the document
  // has been modified or new
  if (!user.isModified("password")) return next();

  // Start salt generation
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Start hashing the password using the generated salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;

      return next();
    });
  });
});

// This method will be used for password comparison in the mongoDB Database
UserSchema.methods.comparePassword = function (
  this: IUser,
  passwordToCompare,
  callback
) {
  bcrypt.compare(passwordToCompare, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UserSchema.post("save", function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    console.log(error);
    next(new Error("A User already registered with that number."));
  } else {
    next();
  }
});

export default models.User || model<IUser>("User", UserSchema);
